import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [reqList, setReqList] = useState([]);
  const { course, editCourse} = useSelector((state) => state.course);

  const handleList = () => {
    if (requirement) {
      setReqList([...reqList,requirement]);
      setRequirement("");
    }
    console.log(reqList);
  };

  function handleRemove(index) {
    const lists = [...reqList];
    lists.splice(index, 1);
    setReqList(lists);
    console.log(reqList);
  }

  useEffect( ()=> {
   register(name,{});
   if(editCourse){
    // console.log(course.instructions);
    // setReqList(course?.instructions);
    setReqList(course.instructions);
   }
  },[])

  useEffect( () => {
   setValue(name,reqList); 
  },[reqList]);

  return (
    <div className="flex flex-col gap-2">
        <label className="label-style" htmlFor={name}>{label} <sup className="text-pink-200 ">*</sup></label>
      <div >
          <input
          type="text"
          name={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />

        <button type="button" onClick={handleList} className="text-yellow-200 font-medium mt-3 text-xl">
          Add
        </button>
        {
          errors[name] && <span>{label} is required</span>
        }
      </div>

      <div>
        {
          (reqList && reqList.length > 0) && (
            reqList.map( (requ,index) => {
              return (<div key={index} className='flex items-center gap-4 text-richblack-5'>
                <span>{requ} </span>
                <button type="button" onClick={()=> handleRemove(index)} className="'text-xs text-pure-greys-300 py-[2px] px-[8px] rounded-md box-border grid place-content-center'"> clear</button>
              </div>) 
            })
          )
        }
      </div>
    </div>
  );
};
