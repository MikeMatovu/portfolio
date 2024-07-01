"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../app/data/data";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className={`w-full flex flex-row items-center justify-center`}>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
            Contact me
          </h2>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
        </div>
        <form className="max-w-lg mx-auto mb-8" data-aos="slide-up">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              data-aos="slide-up"
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <FontAwesomeIcon icon={link.icon} className="text-xl" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
