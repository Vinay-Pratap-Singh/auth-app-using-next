"use client";

import Image from "next/image";
import loginImage from "@/assets/login.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/helper/axiosInstance";

type IformData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<IformData>();

  // function handle the form submit
  const handleFormSubmit: SubmitHandler<IformData> = async (data) => {
    try {
      const res = await axiosInstance.post("/api/user/login", data);
      if (res?.data?.success) {
        localStorage.setItem("token", res?.data?.token);
        toast.success(res?.data?.message);
        router.push("/profile");
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
      <Image src={loginImage} className="px-5 lg:px-0" alt="signup" />

      {/* adding the login form */}
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-[90%] lg:w-96 flex flex-col shadow-md rounded-md p-5"
      >
        <h1 className="text-center font-semibold text-xl mb-5">
          Login to your account
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
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors?.password?.message}</p>
          )}
        </div>

        {/* for create account */}
        <p className="text-sm font-medium mb-2">
          Don&#39;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-primaryColor font-semibold hover:underline"
          >
            Create account
          </Link>
        </p>

        {/* for forget password */}
        <Link href={"/forget"}>
          <p className="text-primaryColor font-semibold hover:underline mb-2 text-sm text-center">
            Forget Password ?
          </p>
        </Link>

        {/* for submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primaryColor text-white font-bold py-2 rounded-md mt-2"
        >
          {isSubmitting ? "Logging to the account ..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
