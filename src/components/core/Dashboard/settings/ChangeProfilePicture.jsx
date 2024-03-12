import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi"
import {updateDisplayPicture} from "../../../../services/operation/SettingsAPI"


export const ChangeProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);
  

  const handleClick = () => {
    fileInputRef.current.click();
    // console.log(fileInputRef.current);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {

    // It is object that asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File 
    const reader = new FileReader()

    // Starts reading the contents of the specified Buffer, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file)

    // Fired when a read has completed, successfully or not.
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    setLoading(true)
    try {
      console.log("uploading...")
      const formData = new FormData();
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
    setLoading(false)
  }

  useEffect( () => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile]);

  return (
    <div className="flex items-center sm:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 sm:p-8 px-4 sm:px-12 text-richblack-5">
        <div className="flex flex-col sm:flex-row items-center mx-auto sm:mx-0 gap-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-center sm:text-start">Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>

              <button
                className="yellow-btn"
                onClick={handleFileUpload}
              >
                {loading ? "Uploading..." : "Upload"}
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};
