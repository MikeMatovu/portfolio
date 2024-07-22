"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "React Native",
  "Tailwind CSS",
  "Kotlin",
  "Jetpack compose",
  "AWS",
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:w-[80%] mx-auto">
      <div className="container mx-auto px-4 text-center">
        <div className={`w-full flex flex-row items-center justify-center`}>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
            My Skills
          </h2>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              className=" shadow-lg rounded-full px-6 py-3 text-lg font-semibold"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
