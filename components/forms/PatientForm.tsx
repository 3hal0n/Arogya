"use client"   //The "use client" directive is a Next.js 13+ feature that tells the framework that a component should run on the client-side (in the browser) rather than on the server-side.

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Loader } from 'lucide-react'
import { createUser } from '@/lib/actions/patient.actions'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

interface FormData {
  fullname: string
  email: string
  phone: string
}

interface FormErrors {
  fullname?: string
  email?: string
  phone?: string
}

export const PatientFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number."),
});

const PatientForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Username validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'fullname is required'
    } else if (formData.fullname.length < 2) {
      newErrors.fullname = 'fullname must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Separate handler for PhoneInput component
  // PhoneInput from react-phone-number-input passes a string value directly, not an event object
  // This is different from regular HTML inputs which pass an event with e.target.name and e.target.value
  const handlePhoneChange = (value: string | undefined) => {
    // PhoneInput can return undefined, so we handle that case
    const phoneValue = value || ''
    
    setFormData(prev => ({
      ...prev,
      phone: phoneValue
    }))
    
    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)

    try {
      const user = {
        name: formData.fullname,
        email: formData.email,
        phone: formData.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex-1 space-y-6">
      <section className="mb-12 space-y-5">
        <h1 className="text-2xl font-bold text-white-900 mb-2">
          Welcome to Arogya!
        </h1>
        <p className="text-gray-700">Schedule your first appointment</p>
        </section>
       
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image
                src="/assets/icons/user.svg"
                alt="User icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your fullname"
            />
          </div>
          {errors.fullname && (
            <p className="mt-1 text-sm text-red-700">{errors.fullname}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image
                src="/assets/icons/email.svg"
                alt="Email icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
       />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-700">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <PhoneInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="LK"
              international
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-700">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`shadow-lg w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 text-white ${
            isSubmitting ? "bg-green-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 hover:shadow-xl"
          }`}
        >
          {isSubmitting ? (
            <>
              <Image
                src="/assets/icons/loader.svg"
                alt="Loading..."
                width={24}
                height={24}
                className="animate-spin"
              />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  )
}

export default PatientForm
