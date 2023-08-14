"use client";

import Image from "next/image";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import forgetImage from "@/assets/forget.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

type IformData = {
  email: string;
};

const Forget = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<IformData>();

  // function handle the form submit
  const handleFormSubmit: SubmitHandler<IformData> = async (data) => {
    try {
      const res = await axios.post("/api/user/mail", {
        email: data?.email,
        emailType: "RESET",
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 py-5 lg:py-0">
      {/* adding the toaster for toast message */}
      <Toaster />

      {/* adding the image */}
      <Image src={forgetImage} className="px-5 lg:px-0" alt="signup" />

      {/* adding the login form */}
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-[90%] lg:w-96 flex flex-col shadow-md rounded-md p-5"
      >
        <h1 className="text-center font-semibold text-xl mb-5">
          Forget password
        </h1>

        {/* for email */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="test@gmail.com"
            className={`px-2 py-1 border-2 w-full font-normal rounded-md ${
              errors.email
                ? "focus:outline-red-500"
                : "focus:outline-primaryColor"
            }`}
            {...register("email", {
              required: { value: true, message: "Please enter your email" },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors?.email?.message}</p>
          )}
        </div>

        {/* for login */}
        <p className="text-sm font-medium mb-2">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-primaryColor font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* for submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primaryColor text-white font-bold py-2 rounded-md mt-2"
        >
          {isSubmitting ? "Sending reset mail ..." : "Get reset mail"}
        </button>
      </form>
    </div>
  );
};

export default Forget;
