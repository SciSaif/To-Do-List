import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

function About() {
  return (
    <main className="flex flex-col items-center rounded-3xl shadow-lg w-fit min-w-[350px] md:w-[500px] m-auto    mt-10 aboutCard text-black/75">
      <div className="bg-white/50 w-full h-full rounded-3xl p-10">
        <p className="text-3xl">Made With ❤</p>
        <p className="text-xl mt-2">By Saifullah Rahman</p>
        <p>a.k.a SciSaif</p>
        <div className="underline mb-2">
          <a
            href="https://github.com/SciSaif"
            className="flex flex-row items-center mt-4"
          >
            <FaGithub />
            <p className="pl-2">Github</p>
          </a>
          <a
            href="https://www.linkedin.com/in/saifullah-rahman-096a68177/"
            className="flex flex-row items-center mt-2"
          >
            <FaLinkedinIn />
            <p className="pl-2">LinkedIn</p>
          </a>
        </div>
        <p>
          <b>Contact me:</b> <span>saiflll284@gmail.com</span>
        </p>

        <p className="mt-4">
          <a href="https://github.com/SciSaif/To-Do-List" className="underline">
            Source Code
          </a>
        </p>
      </div>
    </main>
  );
}

export default About;
