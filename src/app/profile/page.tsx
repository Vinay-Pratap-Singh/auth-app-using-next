"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import profileImage from "@/assets/profile.jpg";
import axios from "axios";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: 0,
    isVerified: false,
    isAdmin: false,
  });

  // fetching the user details
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/user/me");
      setUserDetails(res.data?.user);
    })();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center gap-20">
      {/* adding the image */}
      <Image className="w-[450px]" src={profileImage} alt="profile" />

      {/* creating the profile card */}
      <div className="shadow-md rounded-md p-5">
        <h1 className="text-center font-semibold text-xl mb-5">
          Welcome to your <span className="text-primaryColor">profile</span>
        </h1>

        {/* creating the user details grid */}
        <div className="grid grid-cols-2 gap-2 w-80 font-medium text-sm">
          <p>Full Name</p>
          <p>{userDetails.fullName}</p>
          <p>Email</p>
          <p>{userDetails.email}</p>
          <p>Phone Number</p>
          <p>{userDetails.phoneNumber}</p>
          <p>Verification</p>
          <p>{userDetails.isVerified ? "Complete" : "Incomplete"}</p>
          <p>Role</p>
          <p>{userDetails.isAdmin ? "Admin" : "User"}</p>

          {/* button to delete account */}
          <button className="font-bold text-white bg-red-500 hover:bg-red-600 py-2 col-span-2 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
