/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { BiPencil, BiRightArrowCircle } from "react-icons/bi";

type HeroProps = {};

const Hero: React.FC<HeroProps> = () => {
  return (
    <section className=" w-full flex justify-center md:h-[100vh] max-sm:pt-[8rem] !overflow-x-hidden">
      <div className=" pt-[7rem]  items-center lg:w-[80%] w-[90%] pb-[4rem]  border-b flex md:flex-row flex-col-reverse">
        <div className="flex flex-col gap-4 flex-1">
          <h1 className=" bg-clip-text text-transparent text-center sm:text-left bg-gradient-to-l to-black  from-[#232424]  lg:text-[4rem] md:text-[3rem] text-[2.5rem] font-semibold lg:leading-[5rem] md:leading-[4rem] leading-[3rem] pb-2 tracking-tight ">
            Uncover fresh perspectives, ideas, and knowledge.
          </h1>
          <p>
            <span
              style={{
                textDecoration: "underline #b98e65",
              }}
            >
              MYMIND
            </span>{" "}
            is an open platform where readers find dynamic thinking, and where{" "}
            <br className=" max-md:hidden" /> expert and undiscovered voices can
            share their writing on any topic
          </p>

          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href={"/blogs"}
              className=" bg-theme-primary text-theme-light  rounded px-3 sm:w-fit w-full flex items-center justify-center sm:justify-between gap-2 h-[2.4rem]  "
            >
              <span className="text-center">Start Reading</span>
              <BiRightArrowCircle className="text-white text-[1.3rem]" />
            </Link>
            <Link
              href={"/create"}
              className=" bg-theme-secondary text-white  rounded px-3 sm:w-fit flex w-full items-center justify-center sm:justify-between gap-2 h-[2.4rem]  "
            >
              Start Writing <BiPencil className="text-white text-[1.3rem]" />
            </Link>
          </div>
        </div>

        <div className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] flex-1">
          <img
            src={"/Problem solving-amico.svg"}
            alt=""
            className="w-full h-full "
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
