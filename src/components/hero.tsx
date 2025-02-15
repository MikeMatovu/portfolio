"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center mb-16 mx-auto">
      <div className="relative w-40 h-40 mb-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full h-full"
        >
          <Image
            src="/avator.jpg"
            alt="Your Name"
            data-aos="slide-up"
            className="w-full h-full rounded-full object-cover border-8 border-white"
            width={160} // Match the parent container size
            height={160} // Match the parent container size
            style={{ objectPosition: "top" }} // Adjust this value based on where the face is in the image
          />
        </motion.div>
      </div>

      <h1 className="text-4xl font-bold mb-4" data-aos="zoom-out-down">
        <p>Hello, I&apos;m Mike</p>
      </h1>
      <p className="text-lg mb-8" data-aos="slide-right">
        I&apos;m a Software Engineer specialized in building exceptional digital
        experiences.
      </p>
      <div
        className="flex flex-wrap justify-center gap-4"
        data-aos="slide-left"
      >
        <Link
          href="#contact"
          className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-700 transition-colors"
        >
          <div className="flex flex-row justify-between items-center">
            <span>Contact Me</span>
            <FaArrowRight className="text-xl ml-2" />
          </div>
        </Link>
        <a
          href="/matovu_mike_resume.pdf"
          className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-colors"
          download
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
