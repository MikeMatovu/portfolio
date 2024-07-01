import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className={`w-full flex flex-row items-center justify-center`}>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
            About Me
          </h2>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
        </div>
        <p
          className="text-lg leading-relaxed max-w-3xl mx-auto"
          data-aos="zoom-in"
        >
          {
            "I'm a passionate software engineer with a focus on creating innovative solutions to modern challenges. With experience in various technologies, I enjoy turning complex problems into simple, beautiful, and intuitive designs. My goal is to build products that not only function flawlessly but also provide a great user experience."
          }
        </p>
      </div>
    </section>
  );
};

export default About;
