import React, { useEffect, useState } from "react";

export const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [reqList, setReqList] = useState([]);

  const handleList = () => {
    if (requirement) {
      setReqList([...reqList, requirement]);
      // setRequirement("");
    }
    console.log(reqList);
  };

  function handleRemove(index) {
    const lists = [...reqList];
    lists.splice(index, 1);
    setReqList(lists);
  }

  useEffect( ()=> {
   register(name,{
    required:true,
   }) 
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
          (reqList.length > 0) && (
            reqList.map( (requ,index) => {
              return (<div key={index}>
                <span>{requ} </span>
                <button type="button" onClick={()=> handleRemove(index)}> clear</button>
              </div>) 
            })
          )
        }
      </div>
    </div>
  );
};
