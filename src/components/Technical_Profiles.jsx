import { useState, useEffect} from "react";
import axios from "axios";
import { InfoIcon } from "./Commons";
import { QuestionTally, ContestTally, RankTally } from "./Technical_Profiles_Components";
const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL;

const Technical_Profiles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usernames, setUsernames] = useState({});
  const [links, setLinks] = useState({});
  const [idvStats, setIdvStats] = useState([]);
  const [globalStats, setGlobalStats] = useState({});
  const platformIcons = {
    "leetcode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg",
    "codestudio": "https://abhishektungala.github.io/Official_website/img/cn.png", 
    "codeforces": "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000", 
    "codechef": "https://img.icons8.com/?size=100&id=LnZMjt9rZC3d&format=png&color=000000", 
    "atcoder": "https://img.atcoder.jp/logo/atcoder/logo_transparent.png", 
    "GFG": "https://images.yourstory.com/cs/images/companies/119169043101580097794440231905187057223611079n-1617083628661.png?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=256&q=85", 
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
        console.error(err); setError("Failed to fetch statistics. Please try again later.");
      }
    };
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchPlatforms(), fetchStats()]);
      setLoading(false);
    }; loadAll();
    return () => controller.abort();
  }, []);

  if(loading) return <>
    <div className="toast-overlay" />
    <div className="toast-message processing">Loading the Data...</div>
  </>;
  if(error) return <>
    <div className="toast-overlay" onClick={() => { setError(null); }} />
    <div className="toast-message error" onClick={() => { setError(null); }}>{error}</div>
  </>

  return (<div className="flex flex-col md:flex-row h-full flex-1">
    {console.log(idvStats)} {console.log(globalStats)}
    <aside className="hidden md:flex flex-col gap-2 py-6 px-2 h-full justify-center items-center">
      {Object.entries(links).map(([platform, url], index) => (
        <button key={index} onClick={() => window.open(url, '_blank')} className="bg-accent hover:bg-accent-strong w-40 pl-4 py-1.5 rounded-lg inline-flex items-center justify-start gap-2" target="_blank" rel="noopener noreferrer"><img src={platformIcons[platform]} alt={platform} className="w-5 h-5" /><span className="capitalize">{platform}</span></button>
      ))}
    </aside>
    <aside className="md:hidden flex flex-wrap gap-2 px-2 py-4 justify-center align-center text-center">
      {Object.entries(links).map(([platform, url], index) => (
        <button key={index} onClick={() => window.open(url, '_blank')} className="bg-accent hover:bg-accent-strong px-3 py-1.5 rounded-lg inline-flex items-center justify-start gap-2" target="_blank" rel="noopener noreferrer"><img src={platformIcons[platform]} alt={platform} className="w-5 h-5" /><span className="capitalize">{platform}</span></button>
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
          <h2 className="font-semibold mb-2 text-muted uppercase">Badges Earned</h2>
          <hr className="text-muted w-full h-1.5"/>
          <div className="mt-4 flex flex-wrap gap-4 justify-center align-center">
          {globalStats.badges?.map((badge, index) => (
            <div className="flex flex-col items-center justify-center w-20 h-auto flex-start wrap-break-word">
              <img key={index} src={badge.icon} alt={badge.name} className="w-15 h-15 md:w-20 md:h-20" />
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
  </div>)
}

export default Technical_Profiles;