import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RxDropdownMenu} from "react-icons/rx"
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiSolidDownArrow } from 'react-icons/bi';
import { SubsectionModal } from './SubsectionModal';
import {ConfirmModal} from "../../../../common/ConfirmModal";
import { deleteSection, deleteSubSection } from '../../../../../services/operation/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

export const NestedView = ({handleChangeEdit}) => {

  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [addSubSection ,setAddSubSection] = useState(null);
  const [viewSubSection ,setViewSubSection] = useState(null);
  const [editSubSection ,setEditSubSection] = useState(null);
  const [conformModal,setconformModal] = useState(null);
  console.log(course);

  const handleDeleteSection = async(sectionID)=> {
    const result = await deleteSection({
        sectionID,
        courseID:course._id,
        token
    })

    if(result){
        console.log(result);
        dispatch(setCourse(result));
    }
    setconformModal(null);

  }
  const handleDeleteSubSection = async(subSectionId,sectionId)=> {
    
    const result = await deleteSubSection({
        sectionId,
        subSectionId,
        token
    })

    if(result){
        const updatedCourseContent = course.courseContent.map( (section) => section._id === sectionId ? result : section);
        const updatedCourse = {...course, courseContent:updatedCourseContent};
        dispatch(setCourse(updatedCourse));
    }
    setconformModal(null);

  }

  return (
    <div>
        <div className='bg-richblack-700 p-6 rounded-xl mb-5 mt-8'>
            {
                course.courseContent.map( (section) => (
                    <details key={section._id} open>
                        <summary className='flex justify-between items-center text-lg text-richblack-50 border-b-2 px-5 border-richblack-500 pb-2 my-2'>
                            <div className='flex gap-4'>
                                <RxDropdownMenu size={26}/>
                                <p>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <button
                                    onClick={ () => handleChangeEdit(section._id,section.sectionName)}
                                    ><MdEdit/>
                                </button>

                                <button
                                    onClick={() => {setconformModal({
                                        text1: "Delete this Section",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1: "Delete",
                                        btn2: "Cancel",
                                        handler1: () => handleDeleteSection(section._id),
                                        handler2: () => setconformModal(null),
                                    })}}
                                > <RiDeleteBin6Line/> </button>

                                
                            </div>
                        </summary>

                        <div className='p-2 px-4 flex flex-col gap-2 text-richblack-50'>{
                                section.subSections.map( (data) => (
                                    <div key={data._id}
                                        onClick={()=> {setViewSubSection(data); console.log(data)}}
                                        className='flex justify-between text-xl items-center border-b-2 border-richblack-500 p-2'>
                                        <div className='flex items-center gap-2'>
                                            <RxDropdownMenu/>
                                            <p>{data.title}</p>
                                        </div>
                                        <div className='flex gap-3 items-center'
                                            onClick={ (e)=> e.stopPropagation()}>
                                            <button 
                                                onClick={()=> {setEditSubSection({...data,sectionId:section._id})}}>
                                                <MdEdit/>
                                            </button>
                                            <button
                                            onClick={() => {setconformModal({
                                                text1: "Delete this SubSection",
                                                text2: "All the lectures in this Subsection wil be deleted",
                                                btn1: "Delete",
                                                btn2: "Cancel",
                                                handler1: () => handleDeleteSubSection(data._id,section._id),
                                                handler2: () => setconformModal(null),
                                            })}}
                                            > <RiDeleteBin6Line/> </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button
                                className='flex ml-5 mb-3 items-center gap-2 text-yellow-50'
                                onClick={ () => setAddSubSection(section._id)} >
                                <MdEdit/> Add Lectures
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>

        {
            addSubSection ? <SubsectionModal 
                modalData={addSubSection} add={true}
                setModal={setAddSubSection}/> :
             viewSubSection ? <SubsectionModal 
                modalData={viewSubSection} view={true}
                setModal={setViewSubSection}/> 
             : editSubSection ? <SubsectionModal
                modalData={editSubSection} edit={true}
                setModal={setEditSubSection}/> 
             : (<></>)
        }
        {
            conformModal && <ConfirmModal modalData={conformModal}/>
        }
    </div>
  )
}
