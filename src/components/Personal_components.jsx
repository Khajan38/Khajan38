import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import My_10th_Pic from '../assets/My-Images/My_10th_Pic.jpg'
import My_12th_Pic from '../assets/My-Images/My_College_Pic.png'
import My_College_Pic from '../assets/My-Images/my-pic.png'
import Khajan_Bhatt from '../assets/My-Images/Khajan-Bhatt.jpg'
import Tution from '../assets/My-Images/Tution.jpg'
import Mail from '../assets/personal-extras/postal-envelope.gif';

const CODOLIO_USERNAME = import.meta.env.VITE_APP_CODOLIO_USERNAME;
const FORMSPREE_ID = import.meta.env.VITE_APP_FORMSPREE_ID;

const Carousel = () => {
  const [index, setIndex] = useState(2);
  const images = [My_10th_Pic, Tution, My_College_Pic, My_12th_Pic, Khajan_Bhatt];
  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;

  return (
    <section className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div className="flex items-center justify-center gap-0">
        <div className="w-24 h-72 overflow-hidden rounded-xl opacity-50 scale-90 transition-all duration-500"><img src={images[prevIndex]} className="w-full h-full object-cover object-left"/></div>
        <div className="w-72 h-80 transition-all duration-500"><img src={images[index]} className="w-full h-full object-cover rounded-xl shadow-2xl scale-100 opacity-100 transition-all duration-500"/></div>
        <div className="w-24 h-72 overflow-hidden rounded-xl opacity-50 scale-90 transition-all duration-500"><img src={images[nextIndex]} className="w-full h-full object-cover object-right" /></div>
      </div>

      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full"><FontAwesomeIcon icon={faChevronLeft} /></button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full"><FontAwesomeIcon icon={faChevronRight} /></button>
    </section>
  );
};

const Experience = ( {id} ) => {
  const experiences = [
    { title: "Technology Apprentice", company: "Morgan Stanley, Banglore", start: "Jun 2026", end: "Present", tags: ["Software Engineering", "Distibuted Systems", "REST APIs"], img: "/src/assets/Institutions/Morgan_Stanley.webp" },
    { title: "Freelancer", company: "Haldwani, Remote", start: "2023", end: "Present", tags: ["Full Stack Software Development", "REST APIs", "React", "Tailwind", "FastAPI", "Flask", "MongoDB", "MySQL"], img: "/src/assets/personal-extras/Freelancing.webp" }
  ];
  return (
  <section id={id} className='w-full flex flex-col gap-2'>
    <style>{`
      .tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:0.6rem; }
      .tag { font-size:0.72rem; padding:3px 10px; border-radius:12px; background: var(--color-surface-dark); border:1px solid var(--color-card-border); color:var(--color-surface-dark-text); }
    `}</style>
    <div><span className='text-sm md:text-base text-muted'>03 • Experience & Reflections</span> <br />
    <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> Chapters of Growth </span></div>
    {experiences.map((exp, index) => (
      <div className="card bg-card border shadow-md border-card-border rounded-lg p-4 grid grid-cols-[auto_1fr] gap-4" key={index}>
        <img src={exp.img} alt="Experience Pic" className="w-24 h-24 object-cover rounded-lg shadow-md" />
        <div>
          <div className="font-bold text-sm md:text-base">{exp.title}</div>
          <div className="text-xs md:text-sm text-accent">{exp.company}</div>
          <div className="text-xs text-muted">{exp.start} - {exp.end}</div>
          <div className="tags">{exp.tags.map((tag, tagIndex) => (<span className="tag" key={tagIndex}>{tag}</span>))}</div>
        </div>
      </div>
    ))}
  </section>
)};

const Achievements = ( {id} ) => {
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop((window.innerWidth > 768));
    const handleResize = () => setIsDesktop((window.innerWidth > 768));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);
  const achievements = [
    {icon: "/src//assets/personal-extras/Programming.webp", title: "Competitive Programming Ratings", desc: "LeetCode Knight (2075), CodeChef 3★ (1653), Codeforces Pupil (1320) with strong algorithm design.", link: `https://codolio.com/profile/${CODOLIO_USERNAME}`},
    {icon: "/src//assets/personal-extras/Programming.webp", title: "DSA Problem Solving", desc: "Solved 750+ problems across major platforms with consistent performance in medium–hard sets.", link: `https://codolio.com/profile/${CODOLIO_USERNAME}`},
    {icon: "/src/assets/Institutions/gate-logo.png", title: "GATE 2026", desc: "Qualified GATE 2026 (CS) with AIR 1625, demonstrating strong core CS fundamentals.", link: "https://photos.google.com/share/AF1QipMWST7GfgeUN-OPdvqATad0Cqdvv6roStkPNTbiNjL9W24p4mqunO97nDW3oi_wtQ/photo/AF1QipOpsU2rZ-HH7GBBMLaSoCDqtzPvWKWqmc6zZL-5?key=XzFsXzZ6djdFbnpKOGdlbmVvWE9OMzdjaTI0WnZR"},
    {icon: "/src/assets/Institutions/GEHU-Logo.png", title: "Student Achiever Award", desc: "Awarded Student Achiever 2026 for highest CGPA campus-wide in Vth Semester.", link: "https://photos.google.com/share/AF1QipMWST7GfgeUN-OPdvqATad0Cqdvv6roStkPNTbiNjL9W24p4mqunO97nDW3oi_wtQ/photo/AF1QipMi9Cz0l28rZGJbte0GmW7b85vMhSkQokP4n6jH?key=XzFsXzZ6djdFbnpKOGdlbmVvWE9OMzdjaTI0WnZR"},
    {icon: "/src/assets/Institutions/GEHU-Logo.png", title: "Academic Rank", desc: "Secured 1st Rank in 1st year at GEHU Bhimtal (CGPA: 9.66).", link: "https://khajan38.github.io/Resume/Khajan-Bhatt-Marksheets.pdf"},
    {icon: "/src/assets/Institutions/nptel-logo.png", title: "NPTEL DSA", desc: "Ranked in Top 1% (All India) in NPTEL’s Data Structures and Algorithms Design course.", link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs81/Course/NPTEL25CS81S45780045610927233.pdf"},
    {icon: "/src/assets/Institutions/nptel-logo.png", title: "NPTEL AI", desc: "Ranked in Top 5% (All India) in NPTEL’s AI: Knowledge Representation and Reasoning course.", link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs07/Course/NPTEL25CS07S104660024904207522.pdf"},
    {icon: "/src/assets/Institutions/School_logo.png", title: "Academic Excellence", desc: "Received Shri B.S. Adhikari Memorial Scholarship for scoring 95.8% in Class 12th (97% in PCM).", link: "https://photos.google.com/share/AF1QipMWST7GfgeUN-OPdvqATad0Cqdvv6roStkPNTbiNjL9W24p4mqunO97nDW3oi_wtQ/photo/AF1QipNPwOlxlgVfQ-CUFpfKbkM_DUD061nyhHNLHNkH?key=XzFsXzZ6djdFbnpKOGdlbmVvWE9OMzdjaTI0WnZR"}
  ];
  return (
  <section id={id} className='w-full flex flex-col gap-2'>
    <div><span className='text-sm md:text-base text-muted'>04 • Achievements</span> <br />
    <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> Milestones and things I’ve earned </span></div>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 mt-2">
      {achievements.slice(0, showAll ? achievements.length : isDesktop ? 3 : 2).map((item, index) => (
        <a href={item.link} target="_blank" rel="noopener noreferrer" key={index} className="card-visible bg-card border border-card-border shadow-md rounded-lg p-4 flex flex-col justify-center items-center gap-1 min-w-0 hover:-translate-y-1 transition-all duration-200">
          <div className='flex flex-row overflow-x-clip gap-2 items-center justify-start w-full'>
            <img src={item.icon} alt="Achievement Pic" className="w-10 h-10 object-cover rounded-full shadow-md" />
            <span className="text-sm md:text-base font-semibold text-accent wrap-break-word">{item.title}</span>
          </div>
          <span className="text-xs md:text-sm text-muted wrap-break-word">{item.desc}</span> <br />
          <span className="text-[10px] text-accent hover:text-accent-strong font-bold mt-1"> View proof →</span>
        </a>))}
      </div>
    <center><button className="text-sm md:text-base cursor-pointer text-center w-35 mt-4" onClick={() => setShowAll(prev => !prev)}>
      {showAll ? "Show Less" : "Show More"} <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}/>
    </button></center>
  </section>);
};

const Interests = ( {id} ) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const interests = [
    { icon: "🎵", label: "Music", sub: "Lo-fi while coding or calm playlists that help me stay focused and in flow" },
    { icon: "🚶", label: "Long walks", sub: "Long walks with my favorites, a great way to clear my mind and think deeply" },
    { icon: "📖", label: "Reading", sub: "Philosophy and sci-fi books that challenge how I think and see world" },
    { icon: "🍫", label: "Chocolates", sub: "Enjoying good chocolates as small moments of comfort and simple happiness" },
    { icon: "☕", label: "Coffee", sub: "Pour-over coffee rituals that make mornings slower and calmer" },
    { icon: "🧭", label: "Explore", sub: "Exploring new ideas and concepts that expand my understanding" },
    { icon: "🧩", label: "Puzzles", sub: "Solving logic and lateral puzzles that sharpen thinking and problem-solving skills" }
  ];
  const displayInterests = (!isDesktop && (interests.length % 2))? interests.slice(0, interests.length - 1) : interests;
  useEffect(() => {
    setIsDesktop((window.innerWidth > 768));
    const handleResize = () => setIsDesktop((window.innerWidth > 768));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);
  return(
  <section id={id} className='w-full flex flex-col gap-2'>
    <div><span className='text-sm md:text-base text-muted'>05 • Interests and Passions</span> <br />
    <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> Things that light me up </span></div>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 mt-2 items-center justify-center">
      {displayInterests.map((interest, index) => (
        <div key={index} className="card-visible bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col items-center justify-center min-w-0">
          <span className="text-2xl">{interest.icon}</span>
          <span className="text-sm md:text-base font-great text-accent uppercase wrap-break-words">{interest.label}</span>
          <span className="text-xs text-muted wrap-break-word text-center">{interest.sub}</span>
        </div>
      ))}
    </div>
  </section>);
};

const AnonymousMessageBox = ({ id }) => {
  const [anonymousMessage, setAnonymousMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => {setIsSent(false);}, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSending(true);
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {method: "POST", headers: {"Content-Type": "application/json", "Accept": "application/json"}, body: JSON.stringify({ message: anonymousMessage })});
      if (res.ok) {setIsSent(true); setAnonymousMessage("");}
      else alert("Failed to send message.");
    } catch (err) {console.error(err); alert("Network error.");}
    finally{setIsSending(false);}
  };

  if (isSent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#85a1b7]">
        <img src="/src/assets/personal-extras/Mail_sending.gif" className="w-72 rounded-lg" />
      </div>
    );
  }

  return (
    <section id={id} className='relative w-full flex flex-col gap-2'>
      <style>
        {`.clip-triangle {
          clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
        }`}
      </style>
      <div className='absolute z-10 w-full bg-transparent top-24 flex items-center justify-center'><img className="w-40 h-40 md:w-45 md:h-45" src={Mail} alt="Mail Here"/></div>
      <div><span className='text-sm md:text-base text-muted'>08 • Anonymous Message Box</span> <br />
      <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> Say anything — no strings attached </span></div>
      <div className="hidden md:block relative w-full h-45 -mb-2">
        <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/013/109/681/large_2x/pastel-blue-aesthetic-background-can-use-for-print-template-fabric-presentation-textile-banner-poster-wallpaper-digital-paper-free-photo.jpg')] bg-repeat bg-center clip-triangle" />
      </div>
      <form className="z-11 card-visible bg-card border shadow-md border-card-border rounded-lg px-6 p-4 flex flex-col gap-4" onSubmit={handleSubmit} method="POST">
        <span className="text-xs text-muted">Got feedback on my portfolio? A question? A random shower thought you feel like sharing? Drop it here — completely anonymous. I read all messages.</span>
        <textarea maxLength="500" className="border border-card-border rounded-xl p-3 text-sm md:text-base h-30" name="message" value={anonymousMessage} onChange={(e) => setAnonymousMessage(e.target.value)} required placeholder="Drop your thoughts here... Don't worry, it's completely anonymous and I won't know who you are." />
        <div className='flex w-full justify-between text-muted text-xs items-center'>
          <span className="text-xs text-muted">🔒Fully anonymous — nothing is tracked or stored with your identity.</span>
          <div className='flex gap-5 items-center justify-center'><span>{anonymousMessage.length}/500</span><button disabled={isSending}>{isSending ? "Sending..." : "Send"}</button></div>
        </div>
      </form>
    </section>
  );
};

export { Carousel, Experience, Achievements, Interests, AnonymousMessageBox };