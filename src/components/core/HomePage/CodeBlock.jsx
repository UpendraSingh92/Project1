import React from "react";
import { TypeAnimation } from "react-type-animation";

export const CodeBlock = ({ heading, para, buttons, direction, color }) => {
  let code = 
`<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css">
</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`;
  return (
    <div className={`${direction} my-10 items-center flex w-10/12 mx-auto gap-14`}>
      {/* left sectionn */}
      <div className="text-white mx-auto flex flex-col gap-6 w-[45%]">
        {heading}
        {para}
        {buttons}
      </div>

      {/* rigt section */}

      <div className="relative h-fit w-[540px] flex gap-[1px] px-2 py-4 border border-pure-greys-400 rounded-md bg-[#ffffff0d]">
        <div className="flex flex-col w-8 text-center text-richblack-400 font-inter font-bold">
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

        <div className="w[90%]">
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
