import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import PasswordChecklist from "react-password-checklist";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const response = await fetch("https://weather-api-k5we.onrender.com/auth/signin",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        toast.success("Account created successfully!");
        navigate("/home"); 
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <section className="bg-gray-50 min-h-screen px-4 py-6 md:py-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:underline"
          >
            <SlArrowRight />
            Back
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center text-left">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl mb-4">
              Create an account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center border rounded-lg overflow-hidden">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5 text-left"
                    placeholder="name@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 text-left"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trimStart())}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordCheck"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswordCheck ? "text" : "password"}
                    name="passwordCheck"
                    id="passwordCheck"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 text-left"
                    required
                    value={passwordCheck}
                    onChange={(e) =>
                      setPasswordCheck(e.target.value.trimStart())
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showPasswordCheck ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordCheck}
                className="text-xs"
                messages={{
                  minLength: "Password has more than 8 characters",
                  specialChar: "Password includes special characters",
                  number: "Password contains a number",
                  capital: "Password has an uppercase letter",
                  match: "Passwords match",
                }}
              />

              <button
                type="submit"
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 ${
                  password === passwordCheck && password.length >= 8
                    ? "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={password !== passwordCheck || password.length < 8}
              >
                Create Account
              </button>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="hover:underline text-blue-500 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;