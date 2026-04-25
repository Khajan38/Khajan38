import { useEffect, useState } from "react";
import '../CSS/loading_screen.css'

const Loading_Screen = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
  <div id="loading-screen" className={!loading ? "hidden" : ""}>
    <div className="loading-content">
      <p id="typewriter">Welcome to the Portfolio of</p>
    </div>
    <h1 className="real" aria-label="Khajan Bhatt"> 
      <div className="h1-text text-1" aria-hidden="true">
        <div className="char">K</div>
        <div className="char">H</div>
        <div className="char">A</div>
        <div className="char">J</div>
        <div className="char">A</div>
        <div className="char">N</div>
      </div> 
      <div className="h1-text text-2" aria-hidden="true">
        <div className="char">B</div>
        <div className="char">H</div>
        <div className="char">A</div>
        <div className="char">T</div>
        <div className="char">T</div>
      </div> 
    </h1>
  </div>
  )
}

export default Loading_Screen;
