import { useRef } from "react";
import axios from "axios";

const CodeTheKonami = ({ setCodeSuccessful }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("code", file);
    try {
      const res = await axios.post("/api/konami/submit", formData);
      const data = await res.data;
      if (data.success) setCodeSuccessful(true);
      else alert("Incorrect Solution ❌");
    } catch (err) {console.error(err); alert("Submission Failed");}
  };

  return (
    <section className="w-full p-4 rounded-xl flex flex-col items-start gap-5">
      <h2 className="text-lg md:text-xl font-bold underline font-great self-center">Code The Konami!</h2>
      <div className="text-sm md:text-base flex flex-col gap-3">
        <p><strong className="underline">Problem Statement:</strong>{" "} The <strong>Konami Code</strong> is a famous sequence used in many games: <span className="font-semibold"> ↑ ↑ ↓ ↓ ← → ← → B A</span>. Your task is to discover this sequence inside a grid.</p>
        <p>You are given a <strong>2-D matrix (0-indexed)</strong> where each cell contains one of the following symbols:<span className="font-semibold"> ↑ ↓ ← → A B</span>. Your goal is to find a path through the grid that generates the Konami Code in order.</p>
        <div>
          <strong className="underline">Movement Rules:</strong>
          <ul className="list-disc ml-5">
            <li>Move only <strong>Up, Down, Left, Right</strong>.</li>
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

        <div>
          <strong className="underline">Constraints:</strong>
          <ul className="list-disc ml-5">
            <li>1 ≤ N, M ≤ 20</li>
            <li>Each cell contains one of: ↑ ↓ ← → A B</li>
            <li>Exactly <strong>one valid path</strong> exists.</li>
          </ul>
        </div>

        <div>
          <strong className="underline">Sample Grid:</strong>
          <pre className="bg-black/20 p-3 rounded mt-2 text-sm overflow-x-auto">
{`↑  →  ↓  ←  A
↑  ↓  →  B  ↓
←  →  ↓  ↑  ←
←  →  B  A  →`}
          </pre>
        </div>
        <div>
          <strong className="underline">Sample Output:</strong>
          <pre className="bg-black/20 p-3 rounded mt-2 text-sm overflow-x-auto">{`0, 0
1, 0
1, 1
2, 1
2, 0
2, 1
2, 2
2, 3
3, 2
3, 3`}</pre>
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
        <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"> Submit File</button>
        <input type="file" accept=".cpp,.py,.java,.js" ref={fileInputRef} className="hidden" onChange={handleFileUpload}/>
        <span className="text-xs opacity-70"> Accepted formats: .cpp .py .java .js</span>
      </div>

    </section>
  );
};

export default CodeTheKonami;