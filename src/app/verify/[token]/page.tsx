"use client";

import Image from "next/image";
import React from "react";
import verify from "@/assets/verify.svg";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const VerifyAccount = ({ params }: any) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  // for verifying the user
  useEffect(() => {
    const token = decodeURIComponent(params.token);
    if (!token.length) {
      toast.error("Invalid token");
      router.push("/login");
    }

    try {
      (async () => {
        const res = await axios.post("/api/user/verify", {
          token: params.token,
        });

        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setIsVerified(true);
          router.push("/profile");
        } else {
          toast.error(res?.data?.message);
          setIsError(true);
        }
      })();
    } catch (error: any) {
      setIsError(true);
      toast.error(error?.response?.data?.message);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* adding the toaster for toast message */}
      <Toaster />

      {/* displaying the message to the user */}
      {!isError ? (
        <h1 className="font-bold text-xl mx-5 lg:mx-0 text-center">
          {!isVerified
            ? "Wait account verification is in progress ..."
            : "Account verification successfull"}
        </h1>
      ) : (
        <h1 className="font-bold text-xl text-red-500 mx-5 lg:mx-0 text-center">
          User verification failed ...
        </h1>
      )}

      {/* adding the image */}
      <Image src={verify} alt="verify account" className="px-5 lg:px-0" />
    </div>
  );
};

export default VerifyAccount;
