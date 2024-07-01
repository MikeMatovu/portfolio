"use client";

import React from "react";
import { talks } from "../app/data/data";

const Talks = () => {
  return (
    <section id="talks" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className={`w-full flex flex-row items-center justify-center`}>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
            Talks
          </h2>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}
          ></span>
        </div>
        <div className="space-y-8">
          {talks.map((talk, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg"
              data-aos="zoom-in"
            >
              <h3 className="text-2xl font-bold mb-2">{talk.title}</h3>
              <p className=" mb-1">
                {talk.event} - {talk.date}
              </p>
              <p className="">{talk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Talks;
