"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const adminId = localStorage.getItem("adminId");
      const body = {
        id: adminId,
      };
      try {
        const response = await axios.post(
          "https://backend-three-eta-83.vercel.app/api/admin",
          body
        );
        console.log(
          response,
          "https://backend-three-eta-83.vercel.app/api/admin"
        );
        const data = response.data;
        console.log(data, "data.data");
        if (data.status === 200 && data.data) {
          setUserData({
            name: data.data.name,
            email: data.data.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="text-white flex items-center justify-center">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl mb-4">Profile</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            readOnly // Makes the input field read-only
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            readOnly // Makes the input field read-only
          />
        </div>
        {/* Add other fields like bio here if necessary */}
      </form>
    </div>
  );
};

export default Page;
