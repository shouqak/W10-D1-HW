import React from 'react'
import { Link } from "react-router";

function Landing() {
  return (
     <section className="bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 text-white py-20 h-screen px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Check the Weather Anywhere, Anytime
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Get accurate, real-time weather updates at your fingertips. Whether it's sunny, rainy, or snowy — be prepared!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/auth/signup"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition text-center"
          >
            Sign Up
          </Link>
          <Link
            to="/auth/login"
            className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Landing