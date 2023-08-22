import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import { useRef } from "react";

export const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  editData,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(editData ? editData : "");
  const inputRef = useRef(null);

  const onDrop = (inputfile) => {
    const file = inputfile[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },onDrop
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  useEffect(() => {
    register(name, { require: true });
  }, []);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile]);
  return (
    <div>
      <label htmlFor={name} className="label-style">
        {label} <sup className="text-pink-200 ">*</sup>
      </label>
      <div className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
        {preview ? (
          <div className="flex w-full flex-col items-center p-6">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setPreview("");
                setSelectedFile(null);
                setValue(name, null);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div {...getRootProps()} 
            className="flex w-full flex-col items-center p-6">
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an Thumbnail, or click to <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
      </div>
    </div>
  );
};
