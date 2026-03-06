import axios from "axios";
import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL;

const RearrangeTheKonami = ({ setCodeSuccessful }) => {
  const [tiles, setTiles] = useState([]);
  const [original, setOriginal] = useState([]);
  const [activeTile, setActiveTile] = useState(null);
  const [direction, setDirection] = useState('');
  const [disable, setDisable] = useState(false);
  const COLS = 4;
  useEffect(() => {
    const fetchPuzzle = async () => {
      try{
        const res = await axios.get(`${BASE_URI}/cp/konami/puzzle`);
        setTiles(res.data.rearranged_konami);
        setOriginal(res.data.original_konami);
      } catch(err){console.error("Puzzle fetch error" + err);}
    }; fetchPuzzle();
  }, []);

  const handleClick = (index) => {
    if (disable) return;
    const blank = tiles.indexOf("Blank");
    const r1 = Math.floor(index / COLS);
    const c1 = index % COLS;
    const r2 = Math.floor(blank / COLS);
    const c2 = blank % COLS;
    const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
    if (!isAdjacent) return; setDisable(true);
    if (r1 < r2) setDirection('U');
    else if (r1 > r2) setDirection('D');
    else if (c1 < c2) setDirection('L');
    else if (c1 > c2) setDirection('R');
    setActiveTile(index);
    const newTiles = [...tiles];
    [newTiles[index], newTiles[blank]] =
    [newTiles[blank], newTiles[index]];
    setTimeout(() => {
      setTiles(newTiles); setActiveTile(null); setDisable(false);
      if (JSON.stringify(newTiles) === JSON.stringify(original)) setCodeSuccessful(true); setDirection('');
    }, 1000);
  };

  return (
    <section className="w-full pt-4 pb-10 px-10 rounded-xl flex flex-col items-center gap-5">
      <h2 className="text-lg md:text-xl font-bold underline"> Rearrange The Konami! </h2>
      <section className="flex flex-col md:flex-row gap-20">

        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-lg mb-5 underline">REARRANGE</h1>
          <Motion.div layout className="grid grid-cols-4 gap-3">
            {tiles.map((tile, index) => (
              <Motion.button key={`${tile}-${index}`} layout transition={{layout: {type: "spring", stiffness: 420, damping: 28, duration: 2 }}} animate={(
                activeTile === index || tile === "Blank")? {
                  scale: 1.15, 
                  boxShadow: "0px 12px 20px rgba(0,0,0,0.25)", 
                  zIndex: 10,
                  y: (direction === 'D')? (activeTile === index? -64 : 64) : (direction === 'U')? (activeTile === index? 64 : -64) : 0,
                  x: (direction === 'R')? (activeTile === index? -64 : 64) : (direction === 'L')? (activeTile === index? 64 : -64) : 0
                } : {scale: 1, y: 0, boxShadow: "0px 3px 6px rgba(0,0,0,0.15)", zIndex: 1}} 
                onClick={() => handleClick(index)} className="w-16 h-16 text-lg font-bold flex items-center justify-center rounded-md" style={{backgroundColor: tile === "Blank"? "#1f2937" : tile === original[index]? "var(--color-accent)" : "#2F1F52"}}>
                {tile !== "Blank" ? tile : ""}
              </Motion.button>
            ))}
          </Motion.div>
        </div>
        
        {window.innerWidth > 768 && 
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-lg mb-2 underline">ORIGINAL</h1>
          <Motion.div layout className="grid grid-cols-4 gap-3">
            {original.map((tile, index) => (
              <button key={index} className="w-16 h-16 text-lg font-bold flex items-center justify-center shadow-md" style={{backgroundColor: tile === "Blank"? "#1f2937" : "var(--color-accent)"}}> {tile !== "Blank" ? tile : ""}</button>
            ))}
          </Motion.div>
        </div>}
      </section>
    </section>
  );
};

export default RearrangeTheKonami;