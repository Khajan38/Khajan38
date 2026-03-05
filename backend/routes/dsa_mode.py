import httpx, subprocess, os
from dataclasses import asdict
from fastapi import APIRouter, FastAPI, UploadFile, File
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

GRID = [
['↑','→','↓','←','A'],
['↑','↓','→','B','↓'],
['←','→','↓','↑','←'],
['←','→','B','A','→']
]

KONAMI = ['↑','↑','↓','↓','←','→','←','→','B','A']

def parse_output(output):
    lines = output.split("\n")
    path = []
    for line in lines:
        r,c = map(int,line.split())
        path.append((r,c))
    return path

def validate_path(path):
    if len(path) != 10: return False
    visited = set()
    sequence = []
    for r,c in path:
        if (r,c) in visited: return False
        visited.add((r,c))
        if r<0 or r>=len(GRID) or c<0 or c>=len(GRID[0]): return False
        sequence.append(GRID[r][c])
    if sequence != KONAMI: return False
    for i in range(1,len(path)):
        r1,c1 = path[i-1]
        r2,c2 = path[i]
        if abs(r1-r2) + abs(c1-c2) != 1: return False
    return True

@dsa_mode_router.post("/api/konami/submit")
async def submit_code(file: UploadFile = File(...)):
    filename = f"temp_{file.filename}"
    with open(filename,"wb") as f: f.write(await file.read())
    try:
        if filename.endswith(".cpp"):
            exe = "solution.out"
            subprocess.run(["g++", filename, "-o", exe], check=True)
            result = subprocess.run(["./"+exe], capture_output=True, text=True)
        elif filename.endswith(".py"): result = subprocess.run(["python", filename], capture_output=True, text=True)
        else: return {"success": False, "error": "Unsupported language"}
        output = result.stdout.strip()
        path = parse_output(output)
        if validate_path(path): return {"success": True}
        else: return {"success": False}
    finally: os.remove(filename)