import random
from copy import deepcopy
import httpx, subprocess, os
from dataclasses import asdict
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from routes.cp_structures import Question

dsa_mode_router = APIRouter()

def serialize_dsa_data(data: dict) -> dict:
    return {
        "topics": data["topics"],
        "questions": [
            [asdict(question) for question in topic_questions]
            for topic_questions in data["questions"]
        ]
    }
@dsa_mode_router.get("/cp/sheet")
async def get_cp_data():
    async with httpx.AsyncClient(timeout=25) as client:
        response = await client.get("https://node.codolio.com/api/question-tracker/v2/sheet/get-sheet-data-by-slug/khajanbhatt")
    data = response.json()["data"]
    topics = data["sheet"]["config"]["topicOrder"]
    questions = data["mappings"]
    questions_mapped = []
    topic_index = {}
    for topic in topics:
        topic_index[topic] = len(questions_mapped)
        questions_mapped.append([])
    for q in questions:
        raw_question = q["questionId"]
        question = Question(
            name=raw_question["name"],
            platform=raw_question["platform"],
            difficulty=raw_question["difficulty"],
            problemUrl=raw_question["problemUrl"],
            topics=raw_question["topics"],
        )
        my_topic = q["topic"]
        questions_mapped[topic_index[my_topic]].append(question)
    result = {"topics": topics, "questions": questions_mapped}
    return JSONResponse(status_code=200, content=serialize_dsa_data(result))

TESTCASE = """6 5
U U D B A
R A D L B
B L B R L
A B A R R
R L R A B
B A B B A
"""
EXPECTED_PATH = [(0,0), (0,1), (0,2), (1,2), (1,3), (2,3), (2,4), (3,4), (4,4), (5,4)]

def parse_output(output):
    lines = output.strip().split("\n")
    if len(lines) == 1 and lines[0].strip() == "-1": return None
    path = []
    for line in lines:
        parts = line.strip().split()
        if len(parts) != 2: raise ValueError("Invalid output format")
        r, c = map(int, parts)
        path.append((r, c))
    return path

def validate_path(path):
    if path is None: return False
    if len(path) != len(EXPECTED_PATH): return False
    for i in range(len(path)):
        if path[i] != EXPECTED_PATH[i]: return False
    return True

@dsa_mode_router.post("/cp/konami/submit")
async def submit_code(file: UploadFile = File(...)):
    filename = f"temp_{file.filename}"
    with open(filename, "wb") as f: f.write(await file.read())
    exe = "solution.out"
    classname = filename.replace(".java", "")
    try:
        if filename.endswith(".cpp"):
            compile_process = subprocess.run(["g++", filename, "-o", exe], capture_output=True, text=True)
            if compile_process.returncode != 0: return {"success": False, "content": "Compilation Error", "error": compile_process.stderr}
            result = subprocess.run(["./" + exe],input=TESTCASE, capture_output=True, text=True, timeout=3)
        elif filename.endswith(".py"):
            result = subprocess.run(["python", filename], input=TESTCASE, capture_output=True, text=True, timeout=3)
        elif filename.endswith(".java"):
            compile_process = subprocess.run(["javac", filename], capture_output=True, text=True)
            if compile_process.returncode != 0:
                return {"success": False, "content": "Compilation Error", "error": compile_process.stderr}
            result = subprocess.run(["java", classname], input=TESTCASE, capture_output=True, text=True, timeout=3)
        else: return {"success": False, "content": "Unsupported language"}
        output = result.stdout.strip()
        path = parse_output(output)
        if validate_path(path): return {"success": True, "content": output}
        return {"success": False, "content": output}
    except subprocess.TimeoutExpired:
        return {"success": False, "content": "Time Limit Exceeded"}
    except Exception as e:
        return {"success": False, "content": "Runtime Error", "error": str(e)}
    finally:
        if os.path.exists(filename): os.remove(filename)
        if os.path.exists(exe): os.remove(exe)
        class_file = classname + ".class"
        if os.path.exists(class_file): os.remove(class_file)

ORIGINAL_KONAMI = ['↑','↑','↓','↓','←','→','←','→','B','A','Enter','Blank']

@dsa_mode_router.get("/cp/konami/puzzle")
def randomizeKonami():
    cols, size, blank = 4, 12, 11
    grid = deepcopy(ORIGINAL_KONAMI)
    for _ in range(200):
        row = blank // cols
        col = blank % cols
        possible_moves = []
        if row + 1 < 3: possible_moves.append(blank + cols)
        if row - 1 >= 0: possible_moves.append(blank - cols)
        if col + 1 < cols: possible_moves.append(blank + 1)
        if col - 1 >= 0: possible_moves.append(blank - 1)
        swap_index = random.choice(possible_moves)
        grid[blank], grid[swap_index] = grid[swap_index], grid[blank]
        blank = swap_index
    return {"rearranged_konami": grid, "original_konami": ORIGINAL_KONAMI}