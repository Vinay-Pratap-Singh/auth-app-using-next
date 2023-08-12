"use client";

import Image from "next/image";
import signupImage from "@/assets/signup.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type IformData = {
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
};

const page = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<IformData>();

  // function handle the form submit
  const handleFormSubmit: SubmitHandler<IformData> = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex items-center justify-center gap-20">
      {/* adding the image */}
      <Image src={signupImage} alt="signup" />

      {/* adding the signup form */}
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-96 flex flex-col shadow-md rounded-md p-5"
      >
        <h1 className="text-center font-semibold text-xl mb-5">
          Create a new account
        </h1>
        {/* for full name */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="name" className="text-sm font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Vinay Pratap Singh"
            className={`px-2 py-1 border-2 w-full font-normal rounded-md ${
              errors.fullName
                ? "focus:outline-red-500"
                : "focus:outline-primaryColor"
            }`}
            {...register("fullName", {
              required: {
                value: true,
                message: "Please enter your full name",
              },
              minLength: {
                value: 5,
                message: "Please enter a valid full name",
              },
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors?.fullName?.message}</p>
          )}
        </div>

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

        {/* for phone number */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="phoneNumber" className="text-sm font-semibold">
            Phone Number
          </label>
          <input
            type="number"
            id="phoneNumber"
            placeholder="9874563210"
            className={`px-2 py-1 border-2 w-full font-normal rounded-md ${
              errors.phoneNumber
                ? "focus:outline-red-500"
                : "focus:outline-primaryColor"
            }`}
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "Please enter your phone number",
              },
              minLength: {
                value: 10,
                message: "Number should contain 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Number should contain 10 digits",
              },
              pattern: {
                value: /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
                message: "Please enter a valid phone number",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">
              {errors?.phoneNumber?.message}
            </p>
          )}
        </div>

        {/* for password */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Your Password
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
              minLength: {
                value: 8,
                message: "Password should contain atleast 8 character",
              },

              pattern: {
                value: /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
                message: "Please choose a strong password",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors?.password?.message}</p>
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
        <button className="w-full bg-primaryColor text-white font-bold py-2 rounded-md mt-2">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default page;
