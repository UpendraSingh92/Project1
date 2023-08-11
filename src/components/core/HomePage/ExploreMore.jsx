import React, { useState } from "react";
import { HighlightText } from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";

export const ExploreMore = () => {
  const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  const [tab, setTab] = useState(tabName[0]);
  const [allCard, setAllCard] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(1);

  // console.log(tab);

  function changeTab(currTab) {
    setTab(currTab);
    const newCard = HomePageExplore.filter((course) => {
      return course.tag === currTab;
    });
    console.log(newCard[0].courses);
    setAllCard(newCard[0].courses);
  }

  function changeCard(cardId) {
    // console.log(cardId);
    setCurrentCard(cardId);
  }

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold">
        Unlock the
        <HighlightText texts={" Power of Code "}></HighlightText>
      </h2>

      <p className="text-lg font-medium text-richblack-400 mt-3 text-center mx-auto">
        Learn to Build Anything You Can Imagine.
      </p>

      {/* tab tag bar */}
      <div className="mx-auto w-max hidden md:flex gap-5 bg-richblack-600 rounded-full items-center py-2 my-10 px-3">
        {tabName.map((tabname, index) => {
          return (
            <button
              key={index}
              className={`${
                tab === tabname ? "bg-richblack-900" : "bg-richblack-600"
              } transition-all duration-300 px-5 py-2 rounded-full`}
              onClick={() => {
                changeTab(tabname);
              }}
            >
              {tabname}
            </button>
          );
        })}
      </div>

      {/* cards section */}
      <div className="flex md:flex-wrap md:flex-row flex-col gap-10 mx-auto mt-20 -mb-20 font-inter md:justify-center items-center">
        {allCard.map((card, index) => {
          return (
            <div key={index}
              onClick={ () => changeCard(index+1)}
              className={`w-[300px] justify-between flex transition-all duration-[400ms] text-black flex-col gap-12 ${currentCard === index + 1 ? "bg-white shadow-[20px_20px_0px_0px_rgba(255,214,10,1)]" : "bg-richblack-800" }`}
            >
              <div className="flex flex-col p-5 gap-5">
                <h2 className= {`${index+1 === currentCard ? "text-richblack-800" : "text-richblack-25"} font-semibold text-lg `}> {card.heading}</h2>
                <p className="text-richblack-400">{card.description}</p>
              </div>
              <div className= {`flex border-richblack-400 border-t-[1px] border-dashed justify-between text-base font-medium py-2 px-5 ${index+1 === currentCard ? "text-[#2d8ac8]" : "text-richblack-400"} `}>
                <div >{card.level}</div>
                <div>{card.lessionNumber}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
