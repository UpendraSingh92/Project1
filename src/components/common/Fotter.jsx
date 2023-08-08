import React from "react";
import studylogo from "../../assets/Logo/Logo-Full-Light.png";
import { FooterLink2 } from "../../data/footer-links";

export const Fotter = () => {
  return (
    <div className="bg-richblack-800">
      <div className="w-11/12 flex gap-10 relative mx-auto items-start justify-between text-white py-10 mt-10">
        {/* left part */}
        <div className="flex gap-16 w-1/2">
          {/* row1 */}
          <div className="flex flex-col gap-7">
            <a className="text-richblack-200 text-base font-medium" href="/">
              <img src={studylogo} alt="logo"/>
            </a>
            <div className="flex flex-col gap-2">
              <h3 className="ring-richblack-100 font-bold text-lg">Company</h3>
              <a href="/" className="text-richblack-200 text-base font-medium">About</a>

              <a href="/" className="text-richblack-200 text-base font-medium">
                Careers
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Affiliates
              </a>
            </div>
            <div></div>
          </div>

          {/* row 2 */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <h3 className="ring-richblack-100 font-bold text-lg">
                Resources
              </h3>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Articles
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">Blog</a>
              <a href="/" className="text-richblack-200 text-base font-medium">Chart</a>
              <a href="/" className="text-richblack-200 text-base font-medium">Sheet</a>
              <a href="/" className="text-richblack-200 text-base font-medium">Code</a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                challenges
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">Docs</a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Projects
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">Videos</a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Workspaces
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="ring-richblack-100 font-bold text-lg">Support</h3>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Help Center
              </a>
            </div>
          </div>

          {/* row 3 */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <h3 className="ring-richblack-100 font-bold text-lg">Plans</h3>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Paid memberships
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                For students
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Business solutions{" "}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="ring-richblack-100 font-bold text-lg">
                Conmunity
              </h3>
              <a href="/" className="text-richblack-200 text-base font-medium">Forums</a>
              <a href="/" className="text-richblack-200 text-base font-medium">
                Chapters
              </a>
              <a href="/" className="text-richblack-200 text-base font-medium">Events</a>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="flex justify-between gap-16">
          {FooterLink2.map((section, Index) => {
            return (
              <div key={Index} className="flex flex-col gap-2">
                <h3 className="ring-richblack-100 font-bold text-lg">
                  {section.title}
                </h3>
                {section.links.map((value, index) => {
                  return (
                    <a
                      className="text-richblack-200 text-base font-medium"
                      href={value.link}
                      key={index}
                    >
                      {value.title}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-richblack-200 h-[0.5px] w-11/12 mx-auto mt-10"></div>

      <div className="w-11/12 mx-auto flex py-12 justify-between text-richblack-300">
        <div className="flex gap-2">
          <p>Privacy Policy</p>
          <p className="border-r-[1px] border-l-[1px] px-3">Cookie Policy</p>
          <p>Terms</p>
        </div>
        <div>
          Made with <span className="text-pink-400 text-lg">♥</span> CodeHelp © 2023
          Studynotion
        </div>
      </div>
    </div>
  );
};
