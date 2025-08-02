"use client"

import { useState } from "react"
import LoadingButton from "../../common/LoadingButton"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate subscription API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Newsletter subscription:", email)
      setEmail("")
      alert("Thank you for subscribing to our newsletter!")
    } catch (error) {
      console.error("Newsletter subscription failed:", error)
      alert("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-cream-50 py-20 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Newsletter Title */}
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            <span className="text-red-500">SUBSCRIBE</span> OUR NEWSLETTER
          </h2>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              required
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingText="Subscribing..."
              className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              Subscribe
            </LoadingButton>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
