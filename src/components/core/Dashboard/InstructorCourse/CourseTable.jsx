import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { ConfirmModal } from "../../../common/ConfirmModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operation/courseDetailsAPI";
import {formattedDate} from "../../../../utils/dateFormatter"
import { FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"

export const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const SCLICE_LENGTH = 30;
  console.log(courses);

  async function handleCourseDelete(courseId) {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
      // console.log(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  }
  return (
    <>
      <Table className="rounded-xl border border-richblack-600">
        <Thead className="border-none sm:border-b border-richblack-300 px-6 py-2 space-y-3">
          <Tr className="text-richblack-100 space-y-8">
            <Th className="table-h text-white"><span className="text-richblack-100">Courses</span></Th>
            <Th className="table-h ">Duration</Th>
            <Th className="table-h ">Prices</Th>
            <Th className="table-h">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!courses || courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center mx-auto text-2xl font-medium text-richblack-100">
                <p className="w-full">No Course Found</p>
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className=" border-b space-y-3 border-richblack-800"
              >
                <Td>
                  <div className="flex md:flex-row flex-col">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />

                    <span className="flex flex-col gap-1 items-center sm:items-start md:gap-0 md:justify-between">
                      <p className="text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                      {course.description.split(" ").length >
                        SCLICE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, SCLICE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-[12px] text-white">
                        Created: {formattedDate(course.createdAt)}
                      </p>
                      {course.status === "Draft" ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          Drafted
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </span>
                          Published
                        </p>)}
                    </span>
                  </div>
                </Td>
                <Td className="table-d ">2hr 30min</Td>
                <Td className="table-d ">₹{course.price}</Td>

                <Td className="table-d">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                  >
                    <FiEdit2 size={18}/>
                  </button>
                  <button
                    className="ml-3"
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1: !loading ? "Delete" : "Loading...  ",
                        btn2: "Cancel",
                        handler1: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        handler2: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    <RiDeleteBin6Line size={18}/>
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
};
