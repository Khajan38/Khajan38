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
      <p>I currently study Computer Science and Engineering at Graphic Era Hill University, Bhimtal (2023–2027)</p>
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