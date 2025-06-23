import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router";


export default function Login() {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://weather-api-k5we.onrender.com/auth/signin",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل تسجيل الدخول");
      }

      const data = await response.json();

      if (data && data.status === "success") {
        const { token, user } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("تم تسجيل الدخول بنجاح");

        navigate(`/home/${token}`);
      } else {
        throw new Error("فشل تسجيل الدخول. تحقق من بياناتك.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
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
            <SlArrowLeft className="ml-1" />
            Back
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl mb-6">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@email.comx "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <Link
                to="/Signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}