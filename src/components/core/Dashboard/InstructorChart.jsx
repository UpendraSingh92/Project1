import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"
Chart.register(...registerables);

export const InstructorChart = ({courses}) => {

  const [currChart,setCurrChart] = useState("students");

  // generate random color
    const generateColor = (numOfColor) => {
        const colors = []
        for(let i=0; i<numOfColor; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            colors.push(color);
        }
        return colors;
    }

    // create formatted data for student 
    const studentChartData = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalStudent),
                backgroundColor : generateColor(courses.length),
            }
        ],
    }

    // create formatted data for income 
    const incomeChartData = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalamount),
                backgroundColor : generateColor(courses.length),
            }
        ],
    }

    // options
    const options = {

    }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative w-full sm:w-[70%] md:w-[60%] aspect-square mx-auto">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? studentChartData : incomeChartData}
          options={options}
        />
      </div>
    </div>
  )
}
