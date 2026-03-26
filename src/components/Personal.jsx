import { useEffect } from 'react';
import My_10th_Pic from '../assets/My_10th_Pic.jpg'
import My_College_Pic from '../assets/My_College_Pic.png'

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

  const calculateAge = () => {
    const dateOfBirth = 24, monthOfBirth = 4, yearOfBirth = 2005;
    const today = new Date();
    let age = today.getFullYear() - yearOfBirth;
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    if (currentMonth < monthOfBirth || (currentMonth === monthOfBirth && currentDate < dateOfBirth)) age--;
    return age;
  }

  return (
  <section className="flex flex-col mx-5 py-6 md:px-6 gap-2 justify-center items-center">
    <h1 className="md:mt-5 text-xl md:text-3xl text-center md:mx-15 font-great font-bold">Beyond the Code: A Glimpse Into the Person Behind the Screen</h1>
    <span className="text-sm text-muted text-justify md:text-center">While the rest of this portfolio showcases my technical journey, this space is reserved for something more personal. Here, you’ll discover the interests, curiosities, and little quirks that shape who I am outside the world of code. Together, they offer a glimpse of me and the experiences that quietly influence how I think and work.</span>
    <section className='card bg-card border shadow-md border-card-border rounded-2xl py-4 px-6 flex flex-col justify-center items-center relative w-full'>
      <p>I’m <strong>Khajan Bhatt</strong>, though most people close to me have always called me <strong>Tanuj</strong>. I am {calculateAge()} years old and grew up in Haldwani, Uttarakhand, where I continue to draw many of my values from family, friendships, and the environment around me.</p>
      <p>I currently study Computer Science and Engineering at Graphic Era Hill University, Bhimtal (2023–2027), but my journey into technology didn’t begin with formal education alone. It began with curiosity — the kind that makes you wonder how things work, why systems behave the way they do, and how ideas can be turned into something real and useful.

From early school years I found myself drawn to subjects that required logic and reasoning rather than memorization. Mathematics, puzzles, and problem-solving always felt engaging rather than intimidating. That curiosity eventually led me toward programming. During my school years, when our coursework introduced Python, I discovered that programming felt like a natural extension of the way I already enjoyed thinking.

One of the moments that strengthened that interest was building a console-based Railway Reservation System project during school. Although it was initially a team assignment, I became so interested in developing it that I started working on it independently even before the coursework required it. The project later received appreciation among our class projects, and that experience quietly reinforced the idea that creating things through code was something I genuinely enjoyed.

Outside academics, I tend to be somewhere between introverted and extroverted. I can interact easily with people when needed, though meaningful friendships usually develop gradually through conversations and shared experiences. Once that connection forms, however, those relationships become very important to me. Many of my happiest moments come from spending time with friends, sharing laughter, playing games, or simply having long conversations.

In quieter moments, I enjoy listening to music, taking walks, thinking through ideas, and exploring new concepts. Music—especially Hindi tracks and lo-fi instrumentals—often becomes a background companion while studying or reflecting. I also enjoy strategy games, puzzles, and discussions that challenge the way we think about problems.

When I work on something that genuinely interests me, I tend to become deeply focused. Starting a task can sometimes be the hardest part, but once I’m engaged, I often continue exploring it until I reach a point that feels satisfying. For me, learning is most meaningful when I can connect concepts together and see how they apply in the real world.

At the core of everything I value curiosity, meaningful relationships, and the pursuit of understanding. Whether it is through learning, building projects, or simply sharing ideas with others, I find the greatest satisfaction in moments where knowledge, creativity, and human connection come together.</p>
    </section>
    
    <img src={My_10th_Pic} alt="My_10th_Pic" className='h-50 w-auto rounded-[100%] shadow-xl'/>
    <img src={My_College_Pic} alt="My_College_Pic" className='bg-[#c9cdd0] bg-blend-hard-light h-50 w-auto rounded-[100%] shadow-xl'/>
  </section>)
}
export default Personal;
// Beyond the Code
// About Me
// Academic Foundations
// Interests & Passions
// Currently Exploring
// Interactive Match Quiz
// Curious Facts
// Let's Connect
// Anonymous Message Box