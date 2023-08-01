import React from "react";
import "../App.css"
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import HomeButton from "../components/core/HomePage/HomeButton";
import banner from "../assets/Images/banner.mp4"
import { CodeBlock } from "../components/core/HomePage/CodeBlock";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="w-11/12 flex flex-col gap-10 relative mx-auto items-center justify-center text-white py-5">

        <Link to={"/signup"}>

          <div className="mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 border-b-[1px] group">

            <div className="flex justify-between items-center gap-3 px-4 py-3 group-hover:bg-richblue-900">
              <p>Become an Instructor</p>
              <FaArrowRight></FaArrowRight>
            </div>

          </div>
        </Link>

        <div className="mx-auto w-full flex flex-col gap-4">
          <h2 className="text-4xl text-center font-semibold">Empower Your Future with <HighlightText texts={"Coding Skills"}></HighlightText></h2>
          <p className="text-sm text-richblack-300 text-center w-[60%] mx-auto">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>

        <div className="mx-auto flex gap-5">
            <HomeButton color={"yellow"} texts={"Learn More"} arrow={false} linkto={"/"}></HomeButton>
            <HomeButton color={"black"} texts={"Book a Demo"} arrow={false} linkto={"/"}></HomeButton>
        </div>

        <div className="h-full w-full my-8">
          <div className="w-[75%] mx-auto m-5 ">
            <video muted autoPlay loop src={banner} className=" shadow-[35px_35px_0px_-15px_rgba(255,255,255,1)]" />
          </div>
        </div>

        {/* code section 1 */}

        
          <CodeBlock  
            heading={
              <h2 className="text-4xl text-start font-semibold">Unlock your <HighlightText texts={"coding potential"}></HighlightText> with our online courses.</h2>
            }
            para={
                <p className="text-base text-richblack-300 text-start  mx-auto">Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
            }
            buttons={
              <div className="justify-start mr-auto flex mt-10 gap-5">
              <HomeButton color={"yellow"} texts={"Try it Yourself "} arrow={true} linkto={"/"}></HomeButton>
              <HomeButton color={"black"} texts={"Learn More"} arrow={false} linkto={"/"}></HomeButton>
            </div>
            } direction={"flex-row"} color={"yellow"}>  
          </CodeBlock>

        {/* code section 2 */}
        <CodeBlock  
            heading={
              <h2 className="text-4xl text-start font-semibold">Start <HighlightText texts={"coding in seconds"}></HighlightText></h2>
            }
            para={
                <p className="text-base text-richblack-300 text-start  mx-auto">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</p>
            }
            buttons={
              <div className="justify-start mr-auto flex mt-10 gap-5">
              <HomeButton color={"yellow"} texts={"Continue Lesson "} arrow={true} linkto={"/"}></HomeButton>
              <HomeButton color={"black"} texts={"Learn More"} arrow={false} linkto={"/"}></HomeButton>
            </div>
            } direction={"flex-row-reverse"} color={"yellow"}>  
          </CodeBlock>
        

      </div>

      {/* section 2 */}

      {/* section 3 */}

      {/* fotter */}
    </div>
  );
};

export default Home;
