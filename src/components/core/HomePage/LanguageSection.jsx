import React from "react";
import { HighlightText } from "./HighlightText";
import HomeButton from "./HomeButton";
import image1 from "../../../assets/Images/Know_your_progress.png";
import image2 from "../../../assets/Images/Compare_with_others.png";
import image3 from "../../../assets/Images/Plan_your_lessons.png";

export const LanguageSection = () => {
  return (
    <div className="flex mx-auto mt-36 flex-col pb-20 justify-center items-center max-w-maxContent w-11/12 gap-10">
      <h2 className="text-4xl text-center font-semibold">
        Your swiss knife for
        <HighlightText texts={" learning any language "}></HighlightText>
      </h2>

      <p className="text-lg font-medium text-richblack-700 md:w-[55%] text-center mx-auto">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.
      </p>

      {/* images section */}
      <div className="flex lg:flex-row flex-col items-center justify-center">
        <img src={image1} alt="cards" className="w-fit" />

        <img src={image2} alt="cards" className="w-fit mt-[-20%] mb-[-25%] lg:ml-[-10%] lg:mr-[-10%]" />

        <img src={image3} alt="cards" className="w-fit" />
      </div>

      <HomeButton
        color={"yellow"}
        texts={"Learn More"}
        arrow={false}
        linkto={"/"}
      ></HomeButton>
    </div>
  );
};
