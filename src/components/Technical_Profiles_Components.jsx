import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid} from "recharts";
import { InfoIcon, CustomTooltip } from "./Commons";
import { useEffect, useState } from "react";

const QuestionTally = ({globalStats}) => {
  const COLORS = ["#2563EB", "#16A34A", "#DC2626", "#EAB308"];
  return (
    <section className="card bg-card border shadow-md border-card-border rounded-lg px-4 pt-4 flex flex-col justify-center items-center text-center">
      <h2 className="text-base md:text-lg font-semibold mb-2 text-muted font-merriweather">Problems Solved</h2>
      <hr className="text-sm md:text-base text-muted w-full h-1.5 mb-1"/>
      <h2 className="text-sm md:text-base font-semibold text-muted">Data Structures and Algorithms</h2>
      <section className="w-full flex justify-between items-center">
        <div className="w-[300px] relative">
          <ResponsiveContainer width="100%" aspect={1}>
            <PieChart>
              <Pie data={globalStats.difficulty || []} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3}> {globalStats.difficulty?.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index]} /> ))}</Pie> <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold">{globalStats.total_dsa_solved}</span></div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {globalStats.difficulty?.map((item, index) => (
            <div key={index} className="w-full flex justify-between items-center font-bold rounded-xl bg-bg px-4 py-1 text-sm md:text-base"><span style={{"color": COLORS[index]}}> {item.name}</span><span>{item.value}</span></div>
          ))}
        </div>
      </section>
      <hr className="text-muted w-full h-1.5 mb-2"/>
      <h2 className="text-sm md:text-base font-semibold text-muted">Competitive Programming</h2>
      <section className="w-full flex justify-between items-center">
        <div className="w-[300px] relative">
          <ResponsiveContainer width="100%" aspect={1}>
            <PieChart>
              <Pie data={globalStats.cp_difficulty || []} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3}> {globalStats.cp_difficulty?.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index]} /> ))}</Pie> <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold">{globalStats.total_cp_solved}</span></div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          {globalStats.cp_difficulty?.map((item, index) => (
            <div key={index} className="w-full flex justify-between items-center font-bold rounded-xl bg-bg px-4 py-1"><span className="text-sm md:text-base" style={{"color": COLORS[index]}}> {item.name}</span><span>{item.value}</span></div>
          ))}
        </div>
      </section>
    </section>
  );
};

const ContestTally = ({idvStats, platformIcons, total_contests}) => {
  const [curPlatform, setCurPlatform] = useState(0);
  const [formattedData, setFormattedData] = useState([]);
  useEffect(() => {
    if (idvStats?.length === 0) return;
    const data = idvStats[curPlatform]?.["history"]?.map(item => ({...item,
      rating: Math.round(item.rating || 0),
      date: new Date(item.timestamp * 1000).toLocaleDateString()
    })) || [];
    setFormattedData(data);
  }, [curPlatform, idvStats]);
  
  return(<>
    <section className="card bg-card border shadow-md border-card-border rounded-lg p-4 grid grid-cols-[1fr_2fr] justify-center items-center text-center gap-2">
      <div className="relative h-full w-full items-center justify-center flex flex-col gap-2">
        <InfoIcon text="Total Contests are calculated from LeetCode, Codeforces, CodeChef, and Atcoder. Note: No data available for GFG." />
        <h2 className="text-base md:text-lg text-muted font-semibold mb-2 px-2">Contests</h2>
        <p className="text-xl md:text-2xl font-bold">{total_contests}</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-1">
        {idvStats?.map((item, index) => (item.contests > 0 && (
        <button key={index} className={`w-full flex justify-between items-center font-bold ${curPlatform === index ? 'border' : 'opacity-90'}`} style={{backgroundColor: 'var(--color-bg)', color: 'var(--color-text)'}} onClick={() => setCurPlatform(index)}>
          <span className="text-base flex justify-center items-center gap-4">
            <img src={platformIcons[item.platform]} alt={item.platform} className="w-5 h-5" />
            <span className="capitalize">{item.platform}</span>
          </span> <span className="text-base">{item.contests}</span>
        </button>)))}
      </div>
    </section>
    <section className="w-full bg-card border shadow-md border-card-border rounded-lg py-4 pr-8 flex flex-col justify-center items-center text-center gap-2 overflow-x-hidden">
      <div className="w-full ml-8 mb-2 font-semibold text-muted flex flex-row justify-between items-center gap-1">
        <p>Current Rating: <span>{Math.round(idvStats?.[curPlatform]?.current_rating || 0)}</span></p>
        <p>{idvStats?.[curPlatform]?.platform.toUpperCase()}</p>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.6}/>
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }}/>
            <YAxis domain={["dataMin - 50", "dataMax + 50"]}/>
            <Tooltip content={CustomTooltip}/>
            <Area type="monotone" dataKey="rating" stroke="#2563EB" strokeWidth={3} fill="url(#ratingGradient)" dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  </>);
}

const RankTally = ({idvStats, links}) => {
  const rankImg = {
    "leetcode": {
      "Unrated": "https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=000000",
      "Knight": "https://assets.leetcode.com/static_assets/public/images/badges/knight.png",
      "Guardian": "https://assets.leetcode.com/static_assets/public/images/badges/guardian.png",
    }, 
    "codeforces": {"newbie": "#808080","pupil": "#008000", "specialist": "#03A89E", "expert": "#0000FF", "candidate master": "#AA00AA", "master": "#FF8C00", "international master": "#FF8C00", "grandmaster": "#FF0000", "international grandmaster": "#FF0000", "legendary grandmaster": "#FF0000"},
    "codechef": {"1★": "#808080", "2★": "#1E7D22", "3★": "#3366CC", "4★": "#684273", "5★": "#FFB800", "6★": "#FF7F00", "7★": "#FF0000"}
  }
  return(
  <section className="card bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col justify-center items-center text-center">
    <h2 className="text-base md:text-lg font-semibold mb-2 text-muted font-merriweather">Contest Rankings</h2>

    <hr className="text-muted w-full h-1.5 mb-2"/>
    <h2 className="text-sm md:text-base font-semibold text-muted uppercase">{idvStats?.[0]?.platform}</h2>
    <section className="w-full grid grid-cols-[1fr_2fr] md:grid-cols-2 items-center font-bold rounded-xl px-3 md:px-10 py-1 mb-3 gap-5 md:gap-0">
      <img src={rankImg[idvStats?.[0]?.platform]?.[idvStats?.[0]?.rank_title]} alt={idvStats?.[0]?.platform} className="w-20 h-20 md:w-25 md:h-25" />
      <div className="flex flex-col justify-start text-start gap-1 text-sm md:text-base">
        <p className="flex gap-2"><span className="font-semibold">Username: </span><a href={links[idvStats?.[0]?.platform]} target="_blank" rel="noopener noreferrer" style={{color: "blue", textDecoration: "underline"}}>{idvStats?.[0]?.username}</a></p>
        <p><span className="font-semibold">Rating: </span>{Math.round(idvStats?.[0]?.current_rating || 0)}</p>
        <p><span className="font-semibold">Max Rating: </span>{Math.round(idvStats?.[0]?.max_rating || 0)}</p>
      </div>
    </section>

    <hr className="text-muted w-full h-1.5 mb-2"/>
    <h2 className="font-semibold text-muted uppercase mb-1">{idvStats?.[1]?.platform}</h2>
    <section className="w-full grid grid-cols-[1fr_2fr] md:grid-cols-2 justify-between items-center font-bold rounded-xl px-3 md:px-10 py-1 mb-3 gap-5 md:gap-0">
      <p className='w-full capitalize text-2xl md:text-3xl text-start' style={{ color: rankImg[idvStats?.[1]?.platform]?.[idvStats?.[1]?.rank_title] }}>{idvStats?.[1]?.rank_title}</p>
      <div className="flex flex-col justify-start text-start gap-1 text-sm md:text-base">
        <p className="flex gap-2"><span className="font-semibold">Username: </span><a href={links[idvStats?.[1]?.platform]} target="_blank" rel="noopener noreferrer" style={{color: "blue", textDecoration: "underline"}}>{idvStats?.[1]?.username}</a></p>
        <p><span className="font-semibold">Rating: </span>{Math.round(idvStats?.[1]?.current_rating || 0)}</p>
        <p><span className="font-semibold">Max Rating: </span>{Math.round(idvStats?.[1]?.max_rating || 0)}</p>
      </div>
    </section>

    <hr className="text-muted w-full h-1.5 mb-2"/>
    <h2 className="font-semibold text-muted uppercase mb-1">{idvStats?.[2]?.platform}</h2>
    <section className="w-full grid grid-cols-[1fr_2fr] md:grid-cols-2 justify-between items-center font-bold rounded-xl px-3 md:px-10 py-1 mb-3 gap-5 md:gap-0">
      <p className="flex gap-1">
        {Array.from({length: parseInt(idvStats?.[2]?.rank_title) || 0}).map((_, index) => (
          <span key={index} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white text-lg md:text-xl rounded" style={{backgroundColor: rankImg[idvStats?.[2]?.platform]?.[idvStats?.[2]?.rank_title]}}>{idvStats?.[2]?.rank_title?.[1]}</span>
        ))}
      </p>
      <div className="flex flex-col justify-start text-start gap-1 text-sm md:text-base">
        <p className="flex gap-2"><span className="font-semibold">Username: </span><a href={links[idvStats?.[2]?.platform]} target="_blank" rel="noopener noreferrer" style={{color: "blue", textDecoration: "underline"}}>{idvStats?.[2]?.username}</a></p>
        <p><span className="font-semibold">Rating: </span>{Math.round(idvStats?.[2]?.current_rating || 0)}</p>
        <p><span className="font-semibold">Max Rating: </span>{Math.round(idvStats?.[2]?.max_rating || 0)}</p>
      </div>
    </section>

    <hr className="text-muted w-full h-1.5 mb-2"/>
    <h2 className="font-semibold text-muted uppercase mb-1">{idvStats?.[3]?.platform}</h2>
    <section className="w-full grid grid-cols-[1fr_2fr] md:grid-cols-2 justify-between items-center font-bold rounded-xl px-3 md:px-10 py-1 mb-3 gap-5 md:gap-0">
      <p className='w-full uppercase text-xl md:text-3xl md:pr-19' style={{ color: idvStats?.[3]?.rank_title }}>{idvStats?.[3]?.current_rating}</p>
      <div className="flex flex-col justify-start text-start gap-1 text-sm md:text-base">
        <p className="flex gap-2"><span className="font-semibold">Username: </span><a href={links[idvStats?.[3]?.platform]} target="_blank" rel="noopener noreferrer" style={{color: "blue", textDecoration: "underline"}}>{idvStats?.[3]?.username}</a></p>
        <p><span className="font-semibold">Rating: </span>{Math.round(idvStats?.[3]?.current_rating || 0)}</p>
        <p><span className="font-semibold">Max Rating: </span>{Math.round(idvStats?.[3]?.max_rating || 0)}</p>
      </div>
    </section>
  </section>
  );
}

export { QuestionTally, ContestTally, RankTally };