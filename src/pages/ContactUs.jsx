import React from "react";
import { ContactInfo } from "../components/core/ContactUs/ContactInfo";
import { ContactForm } from "../components/core/About/ContactForm";
import { Fotter } from "../components/common/Fotter";

export const ContactUs = () => {
  return (
    <div>
      <div className="w-[85%] mt-10 mx-auto text-white">
        <div className="mx-auto w-full flex flex-col lg:flex-row mb-10 lg:justify-between gap-10">
          <ContactInfo />
          <div className="border mx-auto p-4 pb-0 md:w-max border-richblack-400 flex flex-col items-center rounded-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
      <Fotter />
    </div>
  );
};
