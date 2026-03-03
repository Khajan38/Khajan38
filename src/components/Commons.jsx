import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const InfoIcon = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setVisible(false);
    }; document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={containerRef} className="absolute inline-block top-1 right-1" onMouseLeave={() => setVisible(false)}>
      <FontAwesomeIcon icon={faCircleInfo} className="cursor-pointer text-muted" onClick={() => setVisible(!visible)} />
      {visible && (<div className="absolute z-10 mt-2 w-64 p-3 text-sm bg-info text-surface-dark-text rounded shadow-lg">{text}</div>)}
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-info text-surface-dark-text p-3 rounded shadow-lg text-sm">
      <p className="font-semibold mb-1">{data.contest}</p>
      <p>Rating: {Math.round(data.rating)}</p>
      <p className="text-xs opacity-80">{data.date}</p>
    </div>
  );
};

export { InfoIcon, CustomTooltip };