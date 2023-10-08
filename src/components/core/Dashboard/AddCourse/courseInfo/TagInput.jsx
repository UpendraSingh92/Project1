import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

export const TagInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [tags, setTags] = useState([]);

  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const tagValue = event.target.value.trim();
      // Check if the input value exists and is not already in the tags array
      if (tagValue && !tags.includes(tagValue)) {
        // Add the tag to the array and clear the input
        const newtags = [...tags, tagValue];
        setTags(newtags);
        // console.log(tags);
        // console.log(event.target.value);
        event.target.value = "";
      }
    }
  };

  function handleRemovetag(index) {
    const newtags = [...tags];
    newtags.splice(index, 1);
    setTags(newtags);
  }

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      let temp = course.tag[0].split(",");
      setTags(temp);
      // console.log(temp);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, tags);
  }, [tags]);

  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div>
        {/* show tags */}
        <div className="flex gap-2">
          {tags.map((tag, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full w-max bg-yellow-200 px-2 py-1 text-sm text-richblack-5"
          >
            {tag}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleRemovetag(index)}
            >
              <MdClose className="text-sm" />
            </button> 
          </div>
        ))}
        </div>
        <input
              id={name}
              name={name}
              type="text"
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              className="form-style w-full mt-2"
            />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};
