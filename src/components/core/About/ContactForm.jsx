import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";
import countrycode from "../../../data/countrycode.json";

export const ContactForm = () => {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  async function submitForm(data) {
    console.log(data);
    setloading(true);
    try {
      // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
      // console.log("response ", response);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="text-white flex flex-col items-center p-4">
      <h2 className="text-4xl font-bold text-center">Get in Touch</h2>
      <p className="text-sm text-richblack-300 text-center mt-4 font-normal">
        We'd love to here for you, Please fill out this form.
      </p>
      <form onSubmit={handleSubmit(submitForm)} className="flex my-10 flex-col gap-5 min-w-[35%]">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-1 sm:w-[48%]">
            <label className="label-style" htmlFor="firstName">
              First Name
            </label>
            <input
              className="form-style"
              name="firstName"
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <span>Please Enter Your First Name</span>}
          </div>

          <div className="flex flex-col gap-1 sm:w-[48%]">
            <label className="label-style" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="form-style"
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <span>Please Enter Your Last Name</span>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="label-style" htmlFor="email">
            Email
          </label>
          <input
            className="form-style"
            name="email"
            id="email"
            type="text"
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please Enter Your Email</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="label-style" htmlFor="dropdown">
            Phone Number
          </label>
          <div className="flex gap-5">
            <select
              className="form-style w-[16%]"
              name="dropdown"
              id="dropdown"
              {...register("countryCode", { required: true })}
            >
              {countrycode.map((code, index) => (
                <option key={index} value={code.code}>
                  {code.code} - {code.country}
                </option>
              ))}
            </select>

            <input
              className="form-style w-[83%]"
              name="phonenumber"
              id="phonenumber"
              type="number"
              placeholder="01234 56789"
              {...register("phonenumber", {
                required: { value: 8, message: "Invalid number" },
                maxLength: { value: 10, message: "Invalid number" },
                minLength: { value: 8, message: "Invalid number" },
              })}
            />

            {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="label-style" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            className="form-style"
            id="message"
            type="text"
            placeholder="Enter Message"
            cols={30}
            rows={7}
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please Enter Your Message</span>}
        </div>

        <button type="submit" className="yellow-btn">Send Message</button>
      </form>
    </div>
  );
};
