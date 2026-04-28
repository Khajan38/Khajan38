import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const INSTAGRAM_CLIENT_ID = import.meta.env.VITE_APP_INSTAGRAM_CLIENT_ID;
const TWITTER_CLIENT_ID = import.meta.env.VITE_APP_TWITTER_CLIENT_ID;
const GITHUB_USERNAME = import.meta.env.VITE_APP_GITHUB_USERNAME;
const LINKEDIN_USERNAME = import.meta.env.VITE_APP_LINKEDIN_USERNAME;
const EMAIL_ADDRESS = import.meta.env.VITE_APP_EMAIL_ADDRESS;
const RESUME_URL = import.meta.env.VITE_APP_RESUME_URL;

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (windowWidth >= 768) setDropdownVisible(true);
  }, [windowWidth]);
  return (
  <header className="flex justify-between items-center py-3 px-4 bg-surface-dark text-surface-dark-text h-auto" aria-label="Header">
    <section onClick={() => window.location.href = "https://khajan38.vercel.app/"} className="flex justify-start items-center gap-3" aria-label="Site Title">
      <img src="/portfolio.jpg" className="w-10 h-10 rounded-full bg-transparent hover:scale-110 transition-transform duration-300 cursor-pointer" aria-hidden="true" />
      <span className="text-xl font-great font-extrabold tracking-wide cursor-pointer" aria-label="Khajan Bhatt">Khajan Bhatt</span>
    </section>
    {(windowWidth < 768) && ((!dropdownVisible)? <button className="md:hidden" onClick={() => setDropdownVisible(!dropdownVisible)} aria-label="Toggle Navigation Menu"> ☰ </button> : <button className="md:hidden" onClick={() => setDropdownVisible(!dropdownVisible)} aria-label="Toggle Navigation Menu"> ✕ </button>)}
    {dropdownVisible && <NavbarSupplement windowWidth={windowWidth} dropdownVisible={dropdownVisible} setDropdownVisible={setDropdownVisible}/>}
  </header>);
};

const NavbarSupplement = ({ windowWidth, dropdownVisible=null, setDropdownVisible=null}) => {
  return (
  <nav className="text-base absolute top-18 right-5 flex flex-col gap-2 bg-transparent md:top-auto md:right-auto md:relative md:flex-row md:gap-6" aria-label="Primary Navigation">
    <NavLink onClick={() => dropdownVisible && windowWidth < 768 && setDropdownVisible(false)} to="/" className={({ isActive }) => `md:p-0 px-4 py-2 rounded-2xl z-10 ${isActive ? "md:underline" : ""}`} style={({ isActive }) => ({color: windowWidth < 768? "var(--color-accent-text)" : isActive ? "var(--color-accent-text-strong)" : "var(--color-accent-text)", fontWeight: isActive ? "bold" : "", backgroundColor: windowWidth >= 768? "transparent" : isActive ? "var(--color-accent-strong)" : "var(--color-accent)"})}> Home </NavLink>
    <a onClick={() => dropdownVisible && windowWidth < 768 && setDropdownVisible(false)} href={`${RESUME_URL}`} target="_blank" rel="noopener noreferrer" className="md:p-0 px-4 py-2 rounded-2xl z-10" style={{color: windowWidth < 768? "var(--color-accent-text)" : "var(--color-accent-text)", backgroundColor: windowWidth >= 768? "transparent" : "var(--color-accent)"}} aria-label="Download Resume"> Resume </a>
    <NavLink onClick={() => dropdownVisible && windowWidth < 768 && setDropdownVisible(false)} to="/profiles" className={({ isActive }) => `md:p-0 px-4 py-2 rounded-2xl z-10 ${isActive ? "md:underline" : ""}`} style={({ isActive }) => ({color: windowWidth < 768? "var(--color-accent-text)" : isActive ? "var(--color-accent-text-strong)" : "var(--color-accent-text)", fontWeight: isActive ? "bold" : "", backgroundColor: windowWidth >= 768? "transparent" : isActive ? "var(--color-accent-strong)" : "var(--color-accent)"})}> Technical Profiles </NavLink>
    {/* <NavLink onClick={() => dropdownVisible && windowWidth < 768 && setDropdownVisible(false)} to="/projects" className={({ isActive }) => `md:p-0 px-4 py-2 rounded-2xl z-10 ${isActive ? "md:underline" : ""}`} style={({ isActive }) => ({color: windowWidth < 768? "var(--color-accent-text)" : isActive ? "var(--color-accent-text-strong)" : "var(--color-accent-text)", fontWeight: isActive ? "bold" : "", backgroundColor: windowWidth >= 768? "transparent" : isActive ? "var(--color-accent-strong)" : "var(--color-accent)"})}>Projects </NavLink>*/}
    <NavLink onClick={() => dropdownVisible && windowWidth < 768 && setDropdownVisible(false)} to="/personal" className={({ isActive }) => `md:p-0 px-4 py-2 rounded-2xl z-10 ${isActive ? "md:underline" : ""}`} style={({ isActive }) => ({color: windowWidth < 768? "var(--color-accent-text)" : isActive ? "var(--color-accent-text-strong)" : "var(--color-accent-text)", fontWeight: isActive ? "bold" : "", backgroundColor: windowWidth >= 768? "transparent" : isActive ? "var(--color-accent-strong)" : "var(--color-accent)"})}> Personal</NavLink>
  </nav>
  );
}

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 justify-center items-center m-0 px-auto py-4 bg-surface-dark text-surface-dark-text w-full mt-auto" aria-label="Footer">

      <section className="flex gap-5 text-2xl" aria-label="Social Media Links">
        <a href={`https://www.linkedin.com/in/${LINKEDIN_USERNAME}/`} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" title="LinkedIn"> <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" /></a>
        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" aria-label="GitHub Profile" title="GitHub"> <FontAwesomeIcon icon={faGithub} aria-hidden="true" /></a>
        <a href={`https://www.instagram.com/${INSTAGRAM_CLIENT_ID}/`} target="_blank" rel="noreferrer" aria-label="Instagram Profile" title="Instagram"> <FontAwesomeIcon icon={faInstagram} aria-hidden="true" /></a>
        <a href={`https://x.com/${TWITTER_CLIENT_ID}`} target="_blank" rel="noreferrer" aria-label="Twitter Profile" title="Twitter"> <FontAwesomeIcon icon={faXTwitter} aria-hidden="true" /></a>
        <a href={`mailto:${EMAIL_ADDRESS}`} target="_blank" rel="noreferrer" aria-label="Email" title="E-Mail"><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /></a>
      </section>

      <p>© 2025 Khajan Bhatt | All rights reserved</p>
    </footer>
  );
};

export { Header, Footer };