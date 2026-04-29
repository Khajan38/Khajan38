import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faUserGroup, faMountainSun, faYinYang } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Carousel, Experience, Achievements, Interests, AnonymousMessageBox } from './Personal_components';

import Initial_Quiz from '../assets/personal-extras/Initial-Quiz.gif';
import Correct_Answer_Quiz from '../assets/personal-extras/Correct-Answer-Quiz.gif';
import Wrong_Answer_Quiz from '../assets/personal-extras/Wrong-Answer-Quiz.gif';

const GITHUB_USERNAME = import.meta.env.VITE_APP_GITHUB_USERNAME;
const LINKEDIN_USERNAME = import.meta.env.VITE_APP_LINKEDIN_USERNAME;

const Personal = () => {
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

  return (<>
  <section className="relative grid grid-cols-1 md:grid-cols-[3fr_2fr] justify-center items-center gap-5 bg-surface-dark text-surface-dark-text p-6 overflow-hidden">
    <div className="absolute -top-10 -right-20 w-64 h-64 bg-white/10 back rounded-full" />
    <div className="absolute -bottom-10 -left-20 w-72 h-72 bg-white/10 rounded-full" />
    <div className="absolute bottom-10 right-80 w-40 h-40 bg-white/10 rounded-full" />
    <div className="absolute -bottom-10 left-150 w-52 h-52 bg-white/10 rounded-full" />
    <div className="absolute -bottom-20 left-180 w-55 h-55 bg-white/10 rounded-full" />
    <section className="relative flex flex-col gap-4 justify-center items-center md:items-start text-center md:text-left">
      <span className="text-xs md:text-sm border rounded-full py-0.5 px-4 bg-white/20">BEYOND THE CODE</span>
      <span className="flex flex-col text-2xl md:text-4xl font-great gap-2"><h1>The Person</h1><h1>behind the Commits</h1></span>
      <span className='text-sm md:text-base wrap-break-word max-w-130'>Not just what I build — but how I think, what drives me, and the curious paths I wander beyond the terminal.</span>
      <div className="flex gap-4 mt-4">
        <button><a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" aria-label="GitHub Profile" title="GitHub">Learn More <FontAwesomeIcon icon={faGithub} /></a></button>
        <button><a href={`https://www.linkedin.com/in/${LINKEDIN_USERNAME}/`} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" title="LinkedIn">Connect <FontAwesomeIcon icon={faLinkedin} /></a></button>
      </div>
    </section>
    <Carousel />
  </section>
  <nav className="flex flex-wrap md:flex-row gap-4 justify-center items-center py-6 bg-info text-surface-dark-text">
    {Object.entries({"About Me": "#about", "Academic": "#academic", "Experience": "#experience", "Achievements": "#achievements", "Interests": "#interests", "Match Quiz": "#quiz", "Facts About Me": "#facts", "Message": "#message"}).map(([label, link], index) => (
      <button key={index} className='z-10 border-2 border-card-border'><a key={index} href={link} className="hover:underline">{label}</a></button>
    ))}
  </nav>
  <main className="w-full flex flex-col py-8 px-10 gap-8 items-center">

    <section id="about" className='w-full flex flex-col gap-2'>
      <div><span className='text-sm md:text-base text-muted'>01 • About Me</span> <br />
      <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> A brief Introduction </span></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className='card card bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col gap-2'>
          <h1 className='text-xs md:text-sm font-bold text-muted'> IN A NUTSHELL <FontAwesomeIcon icon={faSeedling} /></h1>
          <p>A developer driven by curiosity — I ask “why?” before “how?”. For me, code isn’t just logic, it’s a way to understand and shape ideas.</p>
        </div>
        <div className='card card bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col gap-2'>
          <h1 className='text-xs md:text-sm font-bold text-muted'> OUTSIDE THE SCREEN <FontAwesomeIcon icon={faMountainSun} /></h1>
          <p>Music, long walks with favourites, and quiet thinking. Most of my best ideas don’t come at the desk — they arrive somewhere in between.</p>
        </div>
        <div className='card card bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col gap-2'>
          <h1 className='text-xs md:text-sm font-bold text-muted'> PEOPLE AND CONNECTIONS <FontAwesomeIcon icon={faUserGroup} /></h1>
          <p>I’m somewhere between introvert and extrovert — conversations build slowly, but the connections that form tend to matter deeply.</p>
        </div>
        <div className='card card bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col gap-2'>
          <h1 className='text-xs md:text-sm font-bold text-muted'> A FUN CONTRADICTION <FontAwesomeIcon icon={faYinYang} /></h1>
          <p>I love clean, minimal interfaces — yet my personal notes look like a detective's conspiracy board. Chaos in private, clarity in public.</p>
        </div>
      </div>
    </section>

    <section id="academic" className='w-full flex flex-col gap-0'>
      <div><span className='text-sm md:text-base text-muted'>02 • Academic Foundations</span> <br />
      <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> Where it all began </span></div>
      <div className="relative pl-8 border-l-2 border-accent-strong mt-2 grid grid-cols-1 md:grid-cols-[1fr_9fr] gap-4">
        <div className="absolute -left-2 -top-1.5 w-3.5 h-3.5 rounded-[100%] bg-accent border border-bg" />
        <img src="/Institutions/GEHU-Education.webp" alt="College Pic" className="w-auto h-full object-cover rounded-xl border shadow-md" />
        <div><div className="text-xs text-muted">2023 – 2027</div>
        <div className="text-sm md:text-base font-bold">B.Tech in Computer Science & Engineering</div>
        <div className="text-xs md:text-sm text-accent">Graphic Era Hill University · Bhimtal · GPA: 9.5</div>
        <div className="text-xs text-muted">Core curriculum: Data Structures, Algorithms, OOPS, OS, DBMS, Computer Networks, Machine learning, System Design, Software Engineering</div></div>
      </div>
      <div className="relative pl-8 py-2 border-l-2 border-accent-strong grid grid-cols-1 md:grid-cols-[1fr_9fr] gap-4">
        <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 rounded-[100%] bg-accent border border-bg" />
        <img src="/Institutions/Saraswati_Academy-Education-1.png" alt="School Pic" className="w-auto h-full object-cover rounded-xl border shadow-md  " />
        <div><div className="text-xs text-muted">2021 – 2022</div>
        <div className="text-sm md:text-base font-bold">Intermediate - Class XII</div>
        <div className="text-xs md:text-sm text-accent">Saraswati Academy · Haldwani · Grade: 95.6%</div>
        <div className="text-xs text-muted">Core curriculum: Phy, Chem, Mathematics, CS, Eng. Developed first programs in Python. Discovered that debugging at 2am is both painful and weirdly meditative.</div></div>
      </div>
      <div className="relative pl-8 py-2 border-l-2 border-accent-strong grid grid-cols-1 md:grid-cols-[1fr_9fr] gap-4">
        <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 rounded-[100%] bg-accent border border-bg" />
        <img src="/Institutions/Saraswati_Academy-Education-2.png" alt="School Pic" className="w-auto h-full object-cover rounded-xl border shadow-md  " />
        <div><div className="text-xs text-muted">2019 – 2020</div>
        <div className="text-sm md:text-base font-bold">Matriculation - Class X</div>
        <div className="text-xs md:text-sm text-accent">Saraswati Academy · Haldwani · Grade: 96%</div>
        <div className="text-xs text-muted">Core curriculum: Mathematics, Science, Social Science, Information Technology, English, Hindi.</div></div>
      </div>
    </section>

    <Experience id="experience" />
    <Achievements id="achievements" />
    <Interests id="interests" />

    <section id="facts" className='w-full flex flex-col gap-2'>
      <div><span className='text-sm md:text-base text-muted'>06 • Interactive Match Quiz</span> <br />
      <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> How well do our worlds align? </span></div>
      <MatchGame />
    </section>

    <section id="facts" className='w-full flex flex-col gap-2'>
      <div><span className='text-sm md:text-base text-muted'>07 • Curious Facts</span> <br />
      <span className='text-lg md:text-xl text-accent' style={{ fontFamily: "var(--font-great)" }}> Getting to know me, one little thing at a time </span></div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2.5 mt-2 items-center justify-center">
        {facts.slice(0, window.innerWidth < 768 ? 3 : facts.length).map((str, index) => (
          <div key={index} className='card card h-full bg-card border shadow-md border-card-border rounded-lg p-4 flex flex-col gap-2'>
            <h1 className='text-xs md:text-sm font-bold text-muted'> FACT #{index + 1} </h1> <p>{str}</p>
          </div>
        ))}
      </div>
    </section>

    <AnonymousMessageBox id="message" />
    
  </main>
  </>)
}
export default Personal;

const facts = [
  "I’m somewhere between introvert and extrovert — I can talk to anyone, but real connections take time.",
  "Most of my best conversations happen randomly — during walks, late nights, or while doing nothing important.",
  "I like ideas that connect — when different concepts suddenly make sense together, it feels satisfying.",
  "Some of my favorite moments are simple — laughing with friends, playing games, or just talking for hours.",
  "I enjoy solving problems not just to get answers, but to understand *why* they work.",
  "Starting something is often the hardest part for me — but once I begin, I rarely stop halfway.",
  "I tend to think deeply about things, even small ones — sometimes more than necessary.",
  "For me, learning feels meaningful only when it connects to real life or something I can build."
]

const MatchGame = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const questions = [{
      question: "If you had a free, slow morning with nothing urgent, what would you naturally do first?", 
      options: ["Sit with a drink and ease into the day, no rush", "Open your laptop and get a head start on something", "Scroll or casually catch up on things", "Go back to sleep for 'just 10 more minutes'"]
    }, {
      question: "When your thoughts start getting messy or overwhelming, what do you instinctively do?",
      options: ["Call or text someone to talk it through", "Put on music and let it pass", "Pull back and sit with it quietly for a bit", "Step out for a walk or change surroundings"]
    }, {
      question: "When you really need to focus, what kind of background helps you settle in best?",
      options: ["Soft music that fades into the background", "Absolute silence, no distractions", "Energetic music to stay pumped", "Go to a café or talk with people around"]
    }, {
      question: "Which of these gives you the most genuine satisfaction?",
      options: ["Finishing things quickly and efficiently", "Working with others and sharing ideas", "Figuring something out after struggling with it", "Creating something expressive or aesthetic"]
    }, {
      question: "When you're around new people or unfamiliar groups, how do you usually ease in?",
      options: ["I get comfortable first and connections build gradually", "I jump in and start interacting right away", "I keep it to a small circle and stay where I feel familiar", "I mostly observe and speak when needed"]
  }];
  const answers = [0, 3, 1, 2, 0];
  const [answer, setAnswer] = useState(Array(answers.length).fill(null));
  const handleClick = (qIndex, optionIndex) => {
    if (answer[qIndex] !== null) return;
    setAnswer(prev => {const updated = [...prev]; updated[qIndex] = optionIndex; return updated;});
    if (answers[qIndex] === optionIndex) {setScore(prev => prev + 1);}
  };
  if (index === questions.length){
    return (
      <section className="w-full mx-auto rounded-2xl border border-card-border bg-card flex flex-col items-center justify-center p-8 gap-6 shadow-md">
        <h1 className="text-2xl font-bold text-accent">Quiz Completed 🎉</h1>
        <div className="w-32 h-32 rounded-full border-8 border-accent/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-accent">{Math.round((score / answers.length) * 100)}%</span>
        </div>
        <p className="text-base text-muted text-center">You scored <span className="text-accent font-semibold">{score}</span> out of {questions.length}</p>
        <button onClick={() => {setIndex(0); setScore(0); setAnswer(Array(answers.length).fill(null));}} className="px-6 py-2 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition">Retry Quiz</button>
      </section>
    );
  }
  return(
    <section className="w-full h-auto rounded-lg border border-card-border bg-card grid grid-cols-1 md:grid-cols-[1fr_auto] md:pl-8 p-6 md:p-4 gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xs md:text-sm font-bold text-muted"> QUESTION {index + 1} OF {questions.length} </h1>
        <p className="md:text-base">{questions[index].question}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {questions[index].options.map((option, i) => (
          <button key={i} className="rounded-lg py-1 px-2 text-left" style={{fontSize: 'var(--text-xs)', backgroundColor: answer[index] !== null && answer[index] === i? "var(--color-accent-strong)" : "var(--color-accent)"}} onClick={() => handleClick(index, i)}>{option}</button>
        ))}
        </div>
        <div className='flex flex-row justify-between items-center mt-2'>
          <div className="flex flex-row gap-1 items-center justify-center">
            {[...Array(answers.length)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < index ? (answer[i] === answers[i] ? "bg-green-500" : "bg-red-500") : "bg-card-border"}`} />
            ))}
          </div>
          {window.innerWidth > 768 && answer[index] !== null && <p className={`text-sm ${answers[index] === answer[index] ? "text-green-500" : "text-red-500"}`}>{answers[index] === answer[index] ? "Same wavelength! ⚡" : "Different frequency! 🌊"}</p>}
          {answer[index] !== null && <button onClick={() => {setIndex(index + 1);}} style={{fontSize: 'var(--text-xs)'}} >{index === questions.length - 1 ? "See Results" : "Next Question"}</button>}
        </div>
      </div>
      <center><img src={answer[index] == null? Initial_Quiz : (answer[index] === answers[index] ? Correct_Answer_Quiz : Wrong_Answer_Quiz)} alt="Avatar" className="w-auto md:w-60 h-auto bg-transparent md:ml-10 md:mr-5" /></center>
    </section>
  );
};