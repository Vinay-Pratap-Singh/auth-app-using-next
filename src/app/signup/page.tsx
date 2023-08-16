"use client";

import Image from "next/image";
import signupImage from "@/assets/signup.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type IformData = {
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
};

const Signup = () => {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<IformData>();

  // function handle the form submit
  const handleFormSubmit: SubmitHandler<IformData> = async (data) => {
    try {
      const res = await axios.post("/api/user/signup", data, {
        withCredentials: true,
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
      <Image src={signupImage} className="px-5 lg:px-0" alt="signup" />

      {/* adding the signup form */}
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-[90%] lg:w-96 flex flex-col shadow-md rounded-md p-5"
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
              pattern: {
                value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
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
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primaryColor text-white font-bold py-2 rounded-md mt-2"
        >
          {isSubmitting ? "Creating the account ..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
