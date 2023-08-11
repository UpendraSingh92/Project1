import React from "react";
import { TypeAnimation } from "react-type-animation";

export const CodeBlock = ({ heading, para, buttons, direction, color }) => {
  let code = `<!DOCTYPE html>\n<html>\n<head><title>Example</title>
</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`;

  return (
    <div
      className={`flex ${direction === "flex-row" ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col" } my-10 items-center font-inter w-10/12 mx-auto gap-10 lg:gap-32`}
    >
      {/* left sectionn */}
      <div className="text-white mx-auto flex flex-col gap-6 md:w-[45%]">
        {heading}
        {para}
        {buttons}
      </div>

      {/* rigt section */}

      <div className="relative h-fit w-full md:w-[45%] lg:w-[40%] flex gap-[1px] px-2 py-4 border border-pure-greys-400 rounded-md bg-[#ffffff0d]">

        <div className={`w-0 h-0 bg-${color}-50 absolute rounded-full top-[50%] left-[50%] ${color === "yellow" ? "shadow-[0px_0px_200px_70px_#ffff99]" : "shadow-[0px_0px_200px_70px_#00CEFF] "}  `}></div>

        <div className="flex select-none flex-col w-8 text-center text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`w-[90%] select-none text-${color}-100`}>
          <TypeAnimation
            sequence={[code, 3000, ""]}
            repeat={Infinity}
            speed={40}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre",
            }}
          ></TypeAnimation>
        </div>
      </div>
    </div>
  );
};
