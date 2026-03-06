import { useState, useEffect} from "react";
import axios from "axios";
import { InfoIcon, MarqueeCard } from "./Commons";
import { QuestionTally, ContestTally, RankTally } from "./Technical_Profiles_Components";
import { MySheet } from "./DSA_Mode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import CodeTheKonami from "./CodeTheKonami";
import CatchTheKonami from "./CatchTheKonami";
import Konami1 from "../assets/Konami1.png";
import Konami2 from "../assets/Konami2.gif";
const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL;

const Technical_Profiles = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usernames, setUsernames] = useState({});
  const [links, setLinks] = useState({});
  const [idvStats, setIdvStats] = useState([]);
  const [globalStats, setGlobalStats] = useState({});
  const [codeSuccessful, setCodeSuccessful] = useState(false);
  const [konamiInput, setKonamiInput] = useState("");
  const [game, setGame] = useState(0);
  const platformIcons = {
    "leetcode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg",
    "codestudio": "https://abhishektungala.github.io/Official_website/img/cn.png", 
    "codeforces": "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000", 
    "codechef": "https://img.icons8.com/?size=100&id=LnZMjt9rZC3d&format=png&color=000000", 
    "atcoder": "https://img.atcoder.jp/logo/atcoder/logo_transparent.png", 
    "GFG": "https://images.yourstory.com/cs/images/companies/119169043101580097794440231905187057223611079n-1617083628661.png?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=256&q=85",
    "geeksforgeeks": "https://images.yourstory.com/cs/images/companies/119169043101580097794440231905187057223611079n-1617083628661.png?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=256&q=85", 
    "interviewbit": "https://img.icons8.com/?size=100&id=iCILS55mWgkT&format=png&color=000000", 
    "hackerrank": "https://img.icons8.com/?size=100&id=bcdiBt8pFXfZ&format=png&color=000000", 
    "codolio": "https://codolio.com/codolio_assets/codolio.svg"
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlatforms = async () => {
      try {
        const res = await axios.get(`${BASE_URI}/cp/platforms`, {signal: controller.signal});
        setUsernames(res.data.usernames);
        setLinks(res.data.links);
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        console.error(err); setError("Failed to fetch statistics. Please try again later.");
      }
    };
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASE_URI}/cp`, {signal: controller.signal});
        const globalData = res.data.data.global;
        const difficultyData = Object.entries(globalData?.difficulty || {}).map(([key, value]) => ({name: key, value: value}));
        const cpDifficultyData = Object.entries(globalData?.cp_difficulty || {}).map(([key, value]) => ({name: key, value: value}));
        globalData.difficulty = difficultyData;
        globalData.cp_difficulty = cpDifficultyData;
        setIdvStats(res.data.data.platforms);
        setGlobalStats(globalData);
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        console.error(err); setError("Failed to fetch statistics.");
      }
    };
    const loadAll = async () => {
      try{ await Promise.all([fetchPlatforms(), fetchStats()]) }
      finally{ setLoading(false);}
    }; loadAll();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const code = konamiInput.trim().split(" ").join("");
    const konami = "↑↑↓↓←→←→BA";
    if (code === konami){setCodeSuccessful(true); setGame(0);}
  }, [konamiInput]);

  if(loading) return <>
    <div className="toast-overlay" />
    <div className="toast-message processing">Loading the Data...</div>
  </>;
  if(error) return <>
    <div className="toast-overlay" onClick={() => { setError(null); }} />
    <div className="toast-message error" onClick={() => { setError(null); }}>{error}</div>
  </>

  return (
  <div className="w-full overflow-x-hidden p-0 m-0 flex flex-col justify-start items-center relative">
    <div className="flex flex-col md:flex-row h-full flex-1">
      <aside className="hidden md:flex flex-col gap-2 py-6 px-2 h-full justify-center items-center">
        {Object.entries(links).map(([platform, url], index) => (
          <button key={index} onClick={() => window.open(url, '_blank')} className="bg-accent hover:bg-accent-strong w-40 pl-4 py-1.5 rounded-lg inline-flex items-center justify-start gap-2" target="_blank" rel="noopener noreferrer"><img src={platformIcons[platform]} alt={platform} className="w-5 h-5" /><span className="capitalize">{platform}</span></button>
        ))}
      </aside>
      <aside className="md:hidden flex flex-wrap gap-2 px-2 py-4 justify-center align-center text-center">
        {Object.entries(links).map(([platform, url], index) => (
          <button key={index} onClick={() => window.open(url, '_blank')} className="bg-accent hover:bg-accent-strong px-3 py-1.5 rounded-lg inline-flex items-center justify-start gap-2 text-sm" target="_blank" rel="noopener noreferrer"><img src={platformIcons[platform]} alt={platform} className="w-5 h-5" /><span className="capitalize">{platform}</span></button>
        ))}
      </aside>

      <div className="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <section className="flex flex-col gap-5 w-full">
          <div className="flex justify-center gap-6 md:justify-between md:gap-0 w-full p-0">
            <section className="bg-card border shadow-md border-card-border rounded-lg p-4 text-center relative">
              <InfoIcon text="Total Questions are calculated from LeetCode, Codeforces, CodeChef, and GFG. Note: No data available for AtCoder." />
              <h2 className="text-base md:text-lg text-muted font-semibold mb-2 px-2">Total Questions</h2>
              <p className="text-xl md:text-2xl font-bold">{globalStats.total_solved}</p>
            </section>
            <section className="bg-card border shadow-md border-card-border rounded-lg p-4 text-center relative">
              <InfoIcon text="Total Submissions are calculated from LeetCode. Note: No data available for AtCoder." />
              <h2 className="text-base md:text-lg text-muted font-semibold mb-2 px-2">Submissions</h2>
              <p className="text-xl md:text-2xl font-bold">{globalStats.total_submissions}</p>
            </section>
            <section className="hidden md:block bg-card border shadow-md border-card-border rounded-lg p-4 text-center relative">
              <InfoIcon text="Badges are taken from LeetCode." />
              <h2 className="text-base md:text-lg text-muted font-semibold mb-2 px-2">Badges</h2>
              <p className="text-xl md:text-2xl font-bold">{globalStats.badges?.length}</p>
            </section>
          </div>
          <ContestTally idvStats={idvStats} platformIcons={platformIcons} total_contests={globalStats.total_contests}/>
          <section className="bg-card border shadow-md border-card-border rounded-lg p-4 text-center relative">
            <h2 className="text-base md:text-lg font-semibold mb-2 text-muted font-merriweather">Badges Earned</h2>
            <hr className="text-muted w-full h-1.5"/>
            <div className="mt-4 flex flex-wrap gap-4 justify-center align-center">
            {globalStats.badges?.map((badge, index) => (
              <div key={index} className="flex flex-col items-center justify-center w-20 h-auto flex-start wrap-break-word">
                <img src={badge.icon} alt={badge.name} className="w-15 h-15 md:w-20 md:h-20" />
                <span className="text-xs mt-1">{badge.name}</span>
              </div>
            ))}</div>
          </section>
        </section>

        <section className="flex flex-col gap-4">
          <QuestionTally globalStats={globalStats} />
          <RankTally idvStats={idvStats} links={links} />
        </section>
      </div>
    </div>
    <section className="flex flex-col items-center justify-center bg-[#B1C0CB] bg-cover bg-center gap-4 p-6 pb-12 w-full mx-auto relative border-0">
      {window.innerWidth > 768 && <>
        <img src={Konami1} alt="Konami Code" className="w-100 h-auto absolute top-10 right-0" />
        <img src={Konami2} alt="Konami Code" className="w-100 h-auto absolute top-3 -left-5" />
      </>}
      <header className="text-center font-bold text-lg md:text-xl z-1">Want to discover more about how I think in algorithms?</header>
      <span className="text-center text-muted text-xs md:text-sm mb-2">Enter the Konami Code below and find out!</span>
      <form className="w-full flex flex-col items-center gap-2" onSubmit={(e) => e.preventDefault()}>
        <span name="konami_code" className="text-sm md:text-base cursor-not-allowed w-full md:w-100 p-2 border rounded-lg">{konamiInput || "Enter the Konami Code..."}</span>
        <div className="text-sm md:text-base flex gap-2 mt-2 justify-center items-center">
          <button type="button" onClick={() => setKonamiInput((prev) => prev + "A")}>A</button>
          <button type="button" onClick={() => setKonamiInput((prev) => prev + "B")}>B</button>
          <button type="button" onClick={() => setKonamiInput((prev) => prev + "↑")}>↑</button>
          <button type="button" onClick={() => setKonamiInput((prev) => prev + "↓")}>↓</button>
          <button type="button" onClick={() => setKonamiInput((prev) => prev + "←")}>←</button>
          <button type="button" onClick={() => setKonamiInput((prev) => prev + "→")}>→</button>
          <button type="button" onClick={() => setKonamiInput((prev) => prev.slice(0, -1))}><FontAwesomeIcon icon={faDeleteLeft} /></button>
        </div>
      </form>
      <div className="flex gap-5">
        <button className="bg-primary hover:bg-primary-strong text-surface-light-text px-4 py-2 rounded-lg z-1" onClick={() => {setKonamiInput("↑↑↓↓←→←→BA"); setGame(0);}}>Auto-Fill Konami Code</button>
        <button className="bg-secondary hover:bg-secondary-strong text-surface-light-text px-4 py-2 rounded-lg" onClick={() => {setGame(1); setCodeSuccessful(false); setKonamiInput("");}}>Code The Konami</button>
        <button className="bg-secondary hover:bg-secondary-strong text-surface-light-text px-4 py-2 rounded-lg" onClick={() => {setGame(2); setCodeSuccessful(false); setKonamiInput("");}}>Catch the Konami</button>
      </div>
    </section>
    {game === 1 && <CodeTheKonami setCodeSuccessful={setCodeSuccessful} setGame={setGame} />}
    {game === 2 && <CatchTheKonami setCodeSuccessful={setCodeSuccessful} setGame={setGame} />}
    <MySheet codeSuccessful={codeSuccessful} setCodeSuccesful={setCodeSuccessful} setKonamiInput={setKonamiInput} platformIcons={platformIcons}/>
    <MarqueeCard links={links} usernames={usernames}/>
  </div>)
}

export default Technical_Profiles;