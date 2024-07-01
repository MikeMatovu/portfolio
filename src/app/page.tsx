"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Talks from "@/components/talks";
import { Quote } from "@/components/component/quote";
import { CircleIndicator } from "@/components/circle-indicator";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <CircleIndicator />
      <Hero />
      <div className="h-20"></div>
      <About />
      <Skills />
      <Projects />
      <Talks />
      <Quote />
      <Contact />
    </>
  );
}
