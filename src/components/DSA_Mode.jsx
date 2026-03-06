import { useState, useEffect } from "react";
import axios from "axios";
import { InfoIcon } from "./Commons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL;

const MySheet = ({codeSuccessful, setCodeSuccesful, setKonamiInput, platformIcons}) => {
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [visible, setVisible] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!codeSuccessful) return;
    const abortController = new AbortController();
    const fetchSheet = async () => {
      try{
        setLoading(true);
        const response = await axios.get(`${BASE_URI}/cp/sheet`, { signal: abortController.signal });
        setTopics(response?.data?.topics);
        setQuestions(response?.data?.questions);
        setVisible(new Array(response?.data?.topics?.length).fill(false));
      } catch(err){
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        console.error("Error fetching sheet data:");
        setError("Failed to fetch sheet data. Please try again later.");
        setKonamiInput(""); setCodeSuccesful(false);
      } finally {setLoading(false);}
    }; fetchSheet();
    return () => abortController.abort();
  }, [codeSuccessful]);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("card-visible");
        });
      }, { threshold: 0.2 }
    ); cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  });
  
  if (!codeSuccessful) return;
  if(loading) return <>
    <div className="toast-overlay" />
    <div className="toast-message processing">Loading the Data...</div>
  </>;
  if(error) return <>
    <div className="toast-overlay" onClick={() => { setError(null); }} />
    <div className="toast-message error" onClick={() => { setError(null); }}>{error}</div>
  </>
  return (
  <>
    <section className="card bg-card border shadow-md border-card-border rounded-2xl py-4 px-6 flex flex-col justify-center items-center text-center relative w-[90%] m-10">
      <InfoIcon text="A curated list of your favourite DSA questions. Sheet may be updated periodically." />
      <h2 className="text-lg md:text-xl font-bold font-merriweather mb-1">My Favourite Questions</h2>
      <hr className="w-full border-card-border mb-4" />
      {topics.map((topic, i) => (
      <section key={i} className="w-full">
        <div className="w-full mb-4 flex justify-between items-center border rounded-xl py-0.5 px-4 bg-bg" onClick={() => setVisible(prev => prev.map((v, idx) => idx === i ? !v : v))}>
          <div><span className="text-base md:text-lg font-semibold mb-2">{topic} - {questions[i]?.length || 0}</span></div>
          <button className="text-xs md:text-base text-primary" style={{backgroundColor: "transparent", color: "var(--color-accent-text-strong)"}} ><FontAwesomeIcon icon={visible[i] ? faChevronUp : faChevronDown} /></button>
        </div>
        <div className={`w-full ml-10 mb-4 ${visible[i] ? "block" : "hidden"}`}>
          {questions[i] && questions[i].map((q, j) => (
            <a key={j} href={q.problemUrl} target="_blank" rel="noopener noreferrer" className="w-[calc(100%-2.5rem)] text-xs md:text-base gap-1 p-3 rounded-xl border bg-bg text-start mb-2" style={{display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "3fr 0.25fr" : "1fr 0.25fr 0.25fr 1fr", color: "var(--color-accent-text-strong)"}}>
              <span>{q.name}</span>
              <img src={platformIcons[q.platform]} alt={q.platform} className="w-5 h-5" />
              {window.innerWidth > 768 && <span>{q.difficulty}</span>}
              {window.innerWidth > 768 && q.topics && <div className="flex gap-1 mt-1 overflow-x-hidden">
                {q.topics.map((tag, k) => (
                  <span key={k} className="border rounded-md text-xs px-2 py-0.5 whitespace-nowrap" style={{backgroundColor: "var(--color-bg)", color: "var(--color-muted)"}}>{tag}</span>
                ))}
              </div>}
            </a>
          ))}
        </div>
      </section>))}
    </section>
  </>);
}

export {MySheet};