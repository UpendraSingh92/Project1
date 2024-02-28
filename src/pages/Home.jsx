import React, { lazy } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import HomeButton from "../components/core/HomePage/HomeButton";
import banner from "../assets/Images/banner.mp4";
import instructor from "../assets/Images/Instructor.png";
import { CodeBlock } from "../components/core/HomePage/CodeBlock";
import { TimeLineSection } from "../components/core/HomePage/TimeLineSection";
import { LanguageSection } from "../components/core/HomePage/LanguageSection";
import { Fotter } from "../components/common/Fotter";
import { ReviewSlider } from "../components/common/ReviewSlider"
import { ExploreMore } from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="w-11/12 flex flex-col gap-10 relative mx-auto items-center justify-center text-white py-5">
        <Link to={"/signup"}>
          <div className="mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 border-b-[1px] group hover:text-richblack-25">
            <div className="flex justify-between rounded-full items-center gap-3 px-4 py-3 group-hover:bg-richblack-700">
              <p>Become an Instructor</p>
              <FaArrowRight></FaArrowRight>
            </div>
          </div>
        </Link>

        <div className="mx-auto w-full flex flex-col gap-4">
          <h2 className="text-4xl text-center font-semibold">
            Empower Your Future with{" "}
            <HighlightText texts={"Coding Skills"}></HighlightText>
          </h2>
          <p className="text-lg text-richblack-300 font-medium text-center md:w-[70%] mx-auto">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>

        <div className="mx-auto mt-6 flex gap-5">
          <HomeButton
            color={"yellow"}
            texts={"Learn More"}
            arrow={false}
            linkto={"/signup"}
          ></HomeButton>
          <HomeButton
            color={"black"}
            texts={"Book a Demo"}
            arrow={false}
            linkto={"/signup"}
          ></HomeButton>
        </div>

        <div className="h-full w-full my-8">
          <div className="w-11/12 md:w-[75%] mx-auto m-5 shadow-[0px_0px_20px_1px_#00CEFF]">
            <video
              muted
              autoPlay
              loop 
              onLoad={lazy}
              src={banner}
              className=" shadow-[35px_35px_0px_-15px_rgba(255,255,255,1)]"
            />
          </div>
        </div>

        {/* code section 1 */}

        <CodeBlock
          heading={
            <h2 className="text-4xl text-start font-semibold">
              Unlock your{" "}
              <HighlightText texts={"coding potential"}></HighlightText> with
              our online courses.
            </h2>
          }
          para={
            <p className="text-base text-richblack-300 text-start  mx-auto">
              Our courses are designed and taught by industry experts who have
              years of experience in coding and are passionate about sharing
              their knowledge with you.
            </p>
          }
          buttons={
            <div className="justify-start mr-auto flex sm:flex-row flex-col mt-10 gap-5">
              <HomeButton
                color={"yellow"}
                texts={"Try it Yourself "}
                arrow={true}
                linkto={"/signup"}
              ></HomeButton>
              <HomeButton
                color={"black"}
                texts={"Learn More"}
                arrow={false}
                linkto={"/signup"}
              ></HomeButton>
            </div>
          }
          direction={"flex-row"}
          color={"yellow"}
        ></CodeBlock>

        {/* code section 2 */}
        <CodeBlock
          heading={
            <h2 className="text-4xl text-start font-semibold">
              Start <HighlightText texts={"coding in seconds"}></HighlightText>
            </h2>
          }
          para={
            <p className="text-base text-richblack-300 text-start  mx-auto">
              Go ahead, give it a try. Our hands-on learning environment means
              you'll be writing real code from your very first lesson.
            </p>
          }
          buttons={
            <div className="justify-start mr-auto flex sm:flex-row flex-col mt-10 gap-5">
              <HomeButton
                color={"yellow"}
                texts={"Continue Lesson "}
                arrow={true}
                linkto={"/login"}
              ></HomeButton>
              <HomeButton
                color={"black"}
                texts={"Learn More"}
                arrow={false}
                linkto={"/signup"}
              ></HomeButton>
            </div>
          }
          direction={"flex-row-reverse"}
          color={"blue"}
        ></CodeBlock>

        <ExploreMore/>
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 font-inter">
        {/* background XXXXXX image */}
        <div className="h-[325px] homepage-bg">
          {/* wrapper class */}
          <div className="max-w-maxContent w-11/12 mx-auto flex flex-col justify-center items-center gap-5">
            {/* button sections */}
            <div className="h-36"></div>
            <div className="sm:justify-start items-center mx-auto flex sm:flex-row flex-col gap-5">
              <HomeButton
                color={"yellow"}
                texts={"Explore Full Catalog "}
                arrow={true}
                linkto={"/signup"}
              ></HomeButton>
              <HomeButton
                color={"black"}
                texts={"Learn More"}
                arrow={false}
                linkto={"/signup"}
              ></HomeButton>
            </div>
            <div className="h-36"></div>
          </div>
        </div>

        {/* text and heading section */}
        <div className=" max-w-maxContent w-11/12 mx-auto flex lg:flex-row flex-col mt-10 gap-10">
          <h2 className="text-4xl text-start font-semibold">
            Get the skills you need for a{" "}
            <HighlightText texts={"job that is in demand "}></HighlightText>
          </h2>

          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-lg font-medium text-richblack-700 text-start  mx-auto">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>

            <HomeButton
              color={"yellow"}
              texts={"Learn More"}
              arrow={false}
              linkto={"/signup"}
            />
          </div>
        </div>

        <TimeLineSection></TimeLineSection>
        <LanguageSection></LanguageSection>
      </div>

      {/* section 3 */}
      <div className="w-11/12 flex lg:flex-row flex-col gap-10 relative mx-auto items-center lg:justify-center text-white py-10 p-2 mt-10">
        <div className="lg:w-1/2 shadow-[0px_0px_20px_5px_#00CEFF]">
          <img
            src={instructor}
            alt="instructor"
            className="w-full shadow-[-20px_-20px_0px_0px_rgba(255,255,255,1)]"
          />
        </div>

        <div className="lg:w-[40%] flex flex-col gap-5">
          <h2 className="text-4xl text-start font-semibold">
            Become an <br />
            <HighlightText texts={"Instructor "}></HighlightText>
          </h2>

          <p className="text-lg font-medium mb-10 text-richblack-300 text-start  mx-auto">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-max">
          <HomeButton
            color={"yellow"}
            texts={"Start Teaching Today"}
            arrow={true}
            linkto={"/signup"}
          />
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="w-11/12 flex flex-col gap-10 relative mx-auto items-center justify-center text-white py-10 mt-10">
        <h2 className="text-4xl text-start font-semibold">Reviews from other learners</h2>

        <ReviewSlider/>
      </div>

      {/* fotter */}
      <Fotter/>
    </div>
  );
};

export default Home;
