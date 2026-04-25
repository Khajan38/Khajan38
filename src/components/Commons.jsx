import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const InfoIcon = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleClick = () => {
    if (!visible) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({top: rect.bottom + 8, left: rect.left,});
    } setVisible(!visible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setVisible(false);
    }; document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="absolute inline-block top-1 right-1" onMouseLeave={() => setVisible(false)}>
      <FontAwesomeIcon icon={faCircleInfo} className="cursor-pointer text-muted" onClick={handleClick} />
      {visible && createPortal(
        <div className="absolute z-100 mt-2 w-38 md:w-64 p-3 text-xs md:text-sm bg-info text-surface-dark-text rounded shadow-lg" style={{top: coords.top, left: coords.left}}>{text}</div>, document.body
      )}
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-info text-surface-dark-text p-3 rounded shadow-lg text-xs md:text-sm">
      <p className="font-semibold mb-1">{data.contest}</p>
      <p>Rating: {Math.round(data.rating)}</p>
      <p className="text-xs opacity-80">{data.date}</p>
    </div>
  );
};

const MarqueeCard = ({ links, usernames, direction = "left", baseSpeed = 80 }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState("20s");
  useEffect(() => {
    const textWidth = textRef.current?.scrollWidth || 0;
    setDistance(textWidth);
    const time = textWidth / baseSpeed;
    setDuration(`${time}s`);
  }, [links, usernames,baseSpeed]);

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;700&display=swap');
      .marquee-content {
        animation: scroll linear infinite;
      } .marquee-container:hover .marquee-content {
        animation-play-state: paused;
      } @keyframes scroll {
        from { transform: translateX(0); }
        to { transform: translateX(var(--scroll-distance)); }
      }
    `}</style>

    <div ref={containerRef} className="marquee-container w-[109%] scrolling-text-container relative overflow-hidden bg-surface-dark backdrop-blur-sm transition-all duration-300" style={{margin:"0", padding: "0"}}>
      <div ref={textRef} className="marquee-content inline-flex whitespace-nowrap text-sm md:text-base font-semibold" style={{"--scroll-distance": direction === "left" ? `-${distance}px` : `${distance}px`, animationDuration: duration, padding: "8px 0"}}>
        {Object.entries(links).map(([platform, url], i) => (
          <p key={platform} className="flex gap-1"><span className="uppercase font-bold">{platform}</span> : <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ padding: "0 30px", fontFamily: "'Bricolage Grotesque', sans-serif"}}> {usernames[platform]} </a></p>
        ))}
      </div>
    </div>
  </>);
};

export { InfoIcon, CustomTooltip, MarqueeCard };