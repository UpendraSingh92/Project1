import React from "react";
import BannerImg1 from "../assets/Images/aboutus1.webp";
import BannerImg2 from "../assets/Images/aboutus2.webp";
import BannerImg3 from "../assets/Images/aboutus3.webp";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import { OrangeText } from "../components/core/HomePage/OrangeText";
import { ContactForm } from "../components/core/About/ContactForm";
import { Fotter } from "../components/common/Fotter";
import { Story } from "../components/core/About/Story";
import Stats from "../components/core/About/Stats";
import LearnGrid from "../components/core/About/LearnGrid";

export const About = () => {
  return (
    <div className="bg-richblack-700 -mt-10 ">
      {/* section 1 */}
      <div className="w-11/12 flex flex-col gap-10 relative mx-auto items-center justify-center text-white">
        <div className="mt-16">
          <div className="mx-auto w-full flex justify-center mb-10 flex-col gap-4">
            <h2 className="text-4xl text-center font-semibold mx-auto md:w-[70%]">
              Driving Innovation in Online Education for a
              <HighlightText texts={" Brighter Future"}></HighlightText>
            </h2>
            <p className="text-base text-richblack-300 font-medium text-center md:w-[69%] mx-auto">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="flex gap-8 -mb-40">
            <img src={BannerImg1} alt="banner1" className="w-[30%]" />
            <img src={BannerImg2} alt="banner2" className="w-[30%]" />
            <img src={BannerImg3} alt="banner3" className="w-[30%]" />
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="mt-20 bg-richblack-900 pt-40">
        <div className="w-11/12 mx-auto ">
          <h2 className="text-2xl text-white text-center font-semibold mx-auto md:w-[75%]">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform
            <HighlightText texts={" combines technology"} />,
            <OrangeText texts={" expertise"} />, and community to create an
            <OrangeText texts={" unparalleled educational experience."} />
          </h2>
        </div>

        <hr className="bg-richblack-100 h-[0.5px] my-20 border-richblack-500" />

        {/* story section */}
        <Story></Story>

        {/* stats section */}
        <Stats />

        {/* LearningGrid */}
        <div className="w-[90%] mx-auto">
          <LearnGrid />
        </div>

        {/* form */}
        <ContactForm />
      </div>
      <div className="-mt-10">
      <Fotter/>
      </div>
    </div>
  );
};
