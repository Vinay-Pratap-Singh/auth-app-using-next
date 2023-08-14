"use client";

import Image from "next/image";
import React from "react";
import resetImage from "@/assets/reset.svg";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type IformData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ params }: any) => {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<IformData>();

  // function handle the form submit
  const handleFormSubmit: SubmitHandler<IformData> = async (data) => {
    try {
      const res = await axios.post("/api/user/forget", {
        token: decodeURIComponent(params.token),
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        router.push("/login");
      } else {
        toast.error(res?.data?.message);
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
      <Image src={resetImage} className="px-5 lg:px-0" alt="verify account" />

      {/* adding the login form */}
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-[90%] lg:w-96 flex flex-col shadow-md rounded-md p-5"
      >
        <h1 className="text-center font-semibold text-xl mb-5">
          Reset your password
        </h1>

        {/* for password */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="password" className="text-sm font-semibold">
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Test@12345"
            className={`px-2 py-1 border-2 w-full font-normal rounded-md ${
              errors.password
                ? "focus:outline-red-500"
                : "focus:outline-primaryColor"
            }`}
            {...register("password", {
              required: {
                value: true,
                message: "Please choose a password",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors?.password?.message}</p>
          )}
        </div>

        {/* for confirm password */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="confirmpassword" className="text-sm font-semibold">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Test@12345"
            className={`px-2 py-1 border-2 w-full font-normal rounded-md ${
              errors.password
                ? "focus:outline-red-500"
                : "focus:outline-primaryColor"
            }`}
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Please confirm your password",
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors?.confirmPassword?.message}
            </p>
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
          {isSubmitting ? "Reseting the password ..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
