"use client"

import { useState } from "react"
import LoadingButton from "../../common/LoadingButton"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form submitted:", formData)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })

      alert("Thank you! Your message has been sent successfully.")
    } catch (error) {
      console.error("Form submission failed:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="FIRST NAME"
                required
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="LAST NAME"
                required
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL ADDRESS"
              required
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Subject Field */}
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="SUBJECT"
              required
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Message Field */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="YOUR MESSAGE"
              required
              rows={6}
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingText="SUBMITTING..."
              className="bg-red-500 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              SUBMIT FORM
            </LoadingButton>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
