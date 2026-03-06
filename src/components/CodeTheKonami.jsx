import { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL;

const CodeTheKonami = ({ setCodeSuccessful, setGame }) => {
  const fileInputRef = useRef(null);
  const [fileStage, setFileStage] = useState("Submit File");
  const [output, setOutput] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = null;
    setFileStage("Judging...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${BASE_URI}/cp/konami/submit`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const data = res.data;
      if (data.success) {setFileStage("Accepted 🎉"); setOutput(data.content); alert("Submission Accepted 🎉"); setCodeSuccessful(true); setGame(0); return;}
      setFileStage("Submit File");
      switch (data.content) {
        case "Compilation Error \n\n": 
          setOutput(data.error || ""); break;
        case "Runtime Error":
          setOutput("Runtime Error ⚠️\n\nYour program terminated unexpectedly during execution.")
          setOutput((prev) => prev + (data.error || "")); break;
        case "Time Limit Exceeded":
          setOutput(`Time Limit Exceeded ⏱️\n\nYour program took too long to finish execution.`); break;
        default:
          setOutput("Wrong Answer ❌\n\n")
          setOutput((prev) => prev + (data.content || ""));
      }
    } catch (err) {
      setFileStage("Submit File");
      alert("Submission Failed ⚠️\n\nUnable to reach the judging server. Please check your network connection and try again."); console.error(err);
    }
  };

  const downloadSolution = () =>{
    const link = document.createElement("a");
    link.href = "src/assets/Konami_Solution.txt";
    link.download = "Konami_Solution.txt";
    link.click();
  }

  return (
    <section className="w-full py-4 px-10 rounded-xl flex flex-col items-start gap-5">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">  
        <h2 className="text-lg md:text-xl font-bold underline font-great self-center">Code The Konami!</h2>
        <button onClick={downloadSolution} className="text-sm border font-bold" style={{backgroundColor: "var(--color-card)", color: "var(--color-muted)", padding: "3px 10px"}}><FontAwesomeIcon icon={faDownload} /> View Solution</button>
      </div>
      <div className="text-sm md:text-base flex flex-col gap-3">
        <p><strong className="underline">Problem Statement:</strong>{" "} The <strong>Konami Code</strong> is a famous sequence used in many games: <span className="font-semibold"> ↑ ↑ ↓ ↓ ← → ← → B A</span>. Your task is to discover this sequence inside a grid.</p>
        <p>You are given a <strong>2-D matrix (0-indexed)</strong> where each cell contains one of the following symbols:<span className="font-semibold"> ↑ ↓ ← → A B</span>. Your goal is to find a path through the grid that generates the Konami Code in order.</p>
        <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <section className="flex flex-col gap-2">
            <div>
              <strong className="underline">Movement Rules:</strong>
              <ul className="list-disc ml-5">
                <li>Move only <strong>Down, Right</strong>.</li>
                <li>Diagonal movement is <strong>not allowed</strong>.</li>
                <li>Moves must go to <strong>adjacent cells</strong>.</li>
              </ul>
            </div>

            <div>
              <strong className="underline">Path Rules:</strong>
              <ul className="list-disc ml-5">
                <li>The path must produce <strong>↑ ↑ ↓ ↓ ← → ← → B A</strong>.</li>
                <li>The path must contain <strong>exactly 10 cells</strong>.</li>
                <li>A cell <strong>cannot be visited more than once</strong>.</li>
                <li>The first symbol must be <strong>↑</strong> and the last must be <strong>A</strong>.</li>
              </ul>
            </div>

            <div className="flex gap-2 items-center">
              <strong className="underline">Topic Tags:</strong>
              <span className="border bg-card text-muted text-xs md:text-sm rounded-md px-2">Graphs</span>
              <span className="border bg-card text-muted text-xs md:text-sm rounded-md px-2">DFS</span>
              <span className="border bg-card text-muted text-xs md:text-sm rounded-md px-2">Backtracking</span>
            </div>
          </section>
          <table>
            <caption className="font-bold mb-2 underline mt-3 md:mt-0">SAMPLE GRID</caption>
            <tbody>
              <tr><td>↑</td><td>↑</td><td>↓</td><td>B</td><td>A</td></tr>
              <tr><td>→</td><td>A</td><td>↓</td><td>←</td><td>B</td></tr>
              <tr><td>B</td><td>←</td><td>B</td><td>→</td><td>←</td></tr>
              <tr><td>A</td><td>B</td><td>A</td><td>→</td><td>→</td></tr>
              <tr><td>→</td><td>←</td><td>→</td><td>A</td><td>B</td></tr>
              <tr><td>B</td><td>A</td><td>B</td><td>B</td><td>A</td></tr>
            </tbody>
          </table>
        </section>

        <div>
          <strong className="underline">Input Format:</strong>
          <p className="mt-2">The first line contains two integers <strong>N</strong> and <strong>M</strong> — the number of rows and columns in the grid.</p>
          <p>The next <strong>N</strong> lines each contain <strong>M</strong> space-separated symbols. Each symbol is one of: <span className="font-semibold">↑ ↓ ← → A B</span>. Note that these symbols in programming don't come under ASCII letters, so we the input presents ↑ as U, ↓ as D, ← as L and → as R. </p>
          <p className="mt-2">It is guaranteed that <strong>1 ≤ N, M ≤ 100</strong>.</p>
          <pre className="bg-black/20 p-3 rounded mt-2 text-sm overflow-x-auto">
{`6 5
U U D B A
R A D L B
B L B R L
A B A R R
R L R A B
B A B B A`}
          </pre>
        </div>

        <div>
          <strong className="underline">Output Format:</strong>
          <p className="mt-2">If a valid path exists, print <strong>10 lines</strong>, each containing two integers, <strong>r c</strong> — the row and column of the cells in the order they are visited.</p>
          <p>The coordinates must be <strong>0-indexed</strong>.</p>
          <p>If multiple valid paths exist, print <strong>any one of them</strong>.</p>
          <p>If no such path exists, print:</p>
          <pre className="bg-black/20 p-3 rounded mt-2 text-sm">{`-1`}</pre>
          <p className="mt-2">Example Output:</p>
          <pre className="bg-black/20 p-3 rounded mt-2 text-sm overflow-x-auto">
{`0 0
0 1
0 2
1 2
1 3
2 3
2 4
3 4
4 4
5 4`}
          </pre>
        </div>

        <div>
          <strong className="underline">Explanation:</strong>
          <p>Following the coordinates produces the sequence:</p>
          <pre className="bg-black/20 p-3 rounded mt-2 text-sm">↑ ↑ ↓ ↓ ← → ← → B A</pre>
          <p>This matches the Konami Code exactly.</p>
        </div>

      </div>

      <div className="flex flex-col gap-2 items-start">
        <strong className="underline">Submit Your Solution:</strong>
        <button onClick={() => {if (fileStage === "Submit File") fileInputRef.current.click()}} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm">{fileStage}</button>
        <input type="file" accept=".cpp,.py,.java" ref={fileInputRef} className="hidden" onChange={handleFileUpload}/>
        <span className="text-xs opacity-70"> Accepted formats: .cpp .py .java</span>
      </div>

      <div className="w-full flex flex-col gap-0 rounded-xl h-100 mb-7 overflow-hidden">
        <div className="bg-muted text-white px-4 py-1 text-sm md:text-base">OUTPUT</div>
        <div className="bg-gray-800 text-white h-full px-4 py-2 text-xs md:text-sm">
          <span>YOUR OUTPUT WILL BE LOGGED HERE</span> <br/> <br />
          <pre>{output}</pre>
        </div>
      </div>

    </section>
  );
};

export default CodeTheKonami;