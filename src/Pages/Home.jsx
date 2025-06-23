import React, { FormEvent, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"

export default function HomePage() {
  const { token } = useParams({ token: string })
  const navigate = useNavigate()

  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [weatherData, setWeatherData] = useState < any > null
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      console.warn("No token found. Redirecting to login...")
      navigate("/login")
    } else {
      //console.log("Token received:", token);
    }
  }, [token, navigate])

  const handleSubmit = async () => {
    e.preventDefault()

    setError("")
    setWeatherData(null)
    setLoading(true)

    if (!lat || !lon) {
      setError("Please enter both latitude and longitude.")
      setLoading(false)
      return
    }

    if (isNaN(Number(lat)) || isNaN(Number(lon))) {
      setError("Latitude and Longitude must be valid numbers.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://weather-api-k5we.onrender.com/weather?lat=${lat}&lon=${lon}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const data = await response.json()

      setWeatherData(data)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Failed to fetch weather data. Please check the api.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">🌤️ Weather Info</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="e.g., 24.71"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="e.g., 46.68"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            Get Weather
          </button>
        </form>

        {loading && (
          <p className="mt-4 text-center text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
        )}

        {weatherData && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Weather Details
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Source:</strong>{" "}
                {weatherData.source === "cache"
                  ? "Cached"
                  : "Live (OpenWeather)"}
              </li>
              <li>
                <strong>Coordinates:</strong> {weatherData.coordinates?.lat},{" "}
                {weatherData.coordinates?.lon}
              </li>
              <li>
                <strong>Temperature:</strong> {weatherData.tempC}°C
              </li>
              <li>
                <strong>Humidity:</strong> {weatherData.humidity}%
              </li>
              <li>
                <strong>Description:</strong> {weatherData.description}
              </li>
              <li>
                <strong>Fetched At:</strong>{" "}
                {new Date(weatherData.fetchedAt).toLocaleString()}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
