// https://www.davisryan.tech/
// https://www.dalyabaron.com/
import webDevGIF from "../assets/web-dev.gif";
import myPic from "../assets/my-pic.jfif";
import male from "../assets/male.jpg";
const Home = () => {
  return (
    <div className="m-0 p-0 h-full w-full relative overflow-hidden">
    <img src={webDevGIF} className="absolute w-40 h-40 hidden md:block md:top-80 md:right-140" controls />
    <img src={male} className="absolute md:h-[75%] top-10 -right-40 md:top-32 md:-right-50" controls />
    <main className="flex flex-col relative items-center justify-center gap-8 z-1 mx-4 my-4 overflow-hidden">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 w-[90%] my-6">
        <figure className="w-[80%] h-full flex justify-center items-center">
          <img src={myPic} className="w-full h-full rounded-[50px] shadow-lg" alt="My Picture" />
        </figure>
        <section className="flex flex-col gap-1 md:gap-2 justify-center items-center text-center">
          <span className="font-great text-2xl md:text-4xl font-bold text-accent-text-strong"> Hi, I'm Khajan Bhatt</span>
          <span className="font-merriweather text-xl md:text-2xl text-muted font-bold">a Software Developer</span>
          <span className="text-sm md:text-base my-2 md:mr-10">I am interested in the design and implementation of software systems that are both efficient and resilient. My work spans <strong>Full-Stack Development, Backend Engineering,</strong> and <strong> Secure Application Design</strong>, with a strong emphasis on algorithmic thinking and problem solving.</span>
          <span className="text-sm md:text-base md:mx-20">I am particularly drawn to challenges involving performance optimization, architecture design, and translating theoretical computer science concepts into practical solutions.</span>
        </section>
      </section>
    </main></div>
  );
};

export default Home;
