"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { User, MapPin, Calendar, School, Mail, Edit, Camera, Save, X, LogOut } from "lucide-react"
import { useState, memo, useEffect } from "react"
import Cookies from "js-cookie"
import { useAuthCheck } from "@/utils/client-auth"
import { useRouter } from "next/navigation"
type ProfileData = {
  firstName: string
  lastName: string
  profilePicture: string
  education: string
  gender: string
  stateOfResidence: string
  email: string
  dateOfBirth: string
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

const FormInput = memo(
  ({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = true,
  }: {
    label: string
    name: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
  }) => (
    <motion.div variants={itemVariants}>
      <label className="block text-sm font-medium text-black mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:ring-2 focus:ring-black focus:border-black"
        required={required}
      />
    </motion.div>
  ),
)

FormInput.displayName = "FormInput"

const FormSelect = memo(
  ({
    label,
    name,
    value,
    onChange,
    options,
  }: {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; label: string }[]
  }) => (
    <motion.div variants={itemVariants}>
      <label className="block text-sm font-medium text-black mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:ring-2 focus:ring-black focus:border-black"
        required
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  ),
)

FormSelect.displayName = "FormSelect"

const ProfilePicture = memo(
  ({
    src,
    isHovered,
    onHoverChange,
  }: {
    src: string
    isHovered: boolean
    onHoverChange: (isHovered: boolean) => void
  }) => (
    <div
      className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-black"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <img src={src || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
        >
          <Camera className="text-white w-8 h-8" />
        </motion.div>
      )}
    </div>
  ),
)

ProfilePicture.displayName = "ProfilePicture"

const ProfileForm = memo(
  ({
    formData,
    onSubmit,
    onChange,
    onCancel,
    isEditing,
    profileData,
    isSubmitting,
  }: {
    formData: ProfileData
    onSubmit: (e: React.FormEvent) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onCancel: () => void
    isEditing: boolean
    profileData: ProfileData | null
    isSubmitting: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">{isEditing ? "Edit Profile" : "Create Your Profile"}</h2>
            <ProfilePicture src={formData.profilePicture} isHovered={isHovered} onHoverChange={setIsHovered} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={onChange} />
            <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={onChange} />
            <FormInput label="Email" name="email" type="email" value={formData.email} onChange={onChange} />
            <FormInput
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={onChange}
            />
            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={onChange}
              options={[
                { value: "", label: "Select Gender" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
            <FormInput
              label="State of Residence"
              name="stateOfResidence"
              value={formData.stateOfResidence}
              onChange={onChange}
            />
            <motion.div variants={itemVariants} className="md:col-span-2">
              <FormInput label="Education" name="education" value={formData.education} onChange={onChange} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-end space-x-4">
            {isEditing && profileData && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center space-x-2 px-6 py-2 border-2 border-black rounded-md text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? "Saving..." : "Save Profile"}</span>
            </button>
          </motion.div>
        </div>
      </motion.form>
    )
  },
)

ProfileForm.displayName = "ProfileForm"

const ProfileView = memo(
  ({
    profileData,
    onEdit,
    onLogout,
  }: {
    profileData: ProfileData
    onEdit: () => void
    onLogout: () => void
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="relative" variants={itemVariants}>
          <ProfilePicture src={profileData.profilePicture} isHovered={isHovered} onHoverChange={setIsHovered} />
          <motion.h1 className="mt-4 text-3xl font-bold text-center text-black" variants={itemVariants}>
            {profileData.firstName} {profileData.lastName}
          </motion.h1>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-black" />
                <h2 className="text-xl font-semibold text-black">Personal Information</h2>
              </div>
              <div className="space-y-4">
                <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                  <Calendar className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">
                    Born {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </span>
                </motion.div>
                <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                  <MapPin className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">{profileData.stateOfResidence}</span>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <School className="w-5 h-5 text-black" />
                <h2 className="text-xl font-semibold text-black">Education</h2>
              </div>
              <motion.p className="text-sm text-black" whileHover={{ x: 5 }}>
                {profileData.education}
              </motion.p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden md:col-span-2">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="w-5 h-5 text-black" />
                <h2 className="text-xl font-semibold text-black">Contact Information</h2>
              </div>
              <motion.p className="text-sm text-black" whileHover={{ x: 5 }}>
                {profileData.email}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </motion.div>
      </motion.div>
    )
  },
)

ProfileView.displayName = "ProfileView"

export default function ProfilePage() {
  useAuthCheck()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false) // Changed initial value
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
    education: "",
    gender: "",
    stateOfResidence: "",
    email: "",
    dateOfBirth: "",
  })

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      setError(null)
      const authToken = Cookies.get("authToken")

      if (!authToken) {
        setError("Authentication token not found. Please log in again.")
        setIsLoading(false)
        setIsEditing(true)
        return
      }

      try {
        const response = await fetch("https://cricket-web-app-backend.vercel.app/api/user/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch profile")
        }

        const data = await response.json()

        if (data.profile) {
          // Add default profile picture and email since they're not in the API response
          const profileWithDefaults = {
            ...data.profile,
            profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
            email: "", // You might want to get this from somewhere else
          }

          setProfileData(profileWithDefaults)
          setFormData(profileWithDefaults)
          setIsEditing(false)
        } else {
          // No profile exists, show the form
          setIsEditing(true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error("Error fetching profile:", err)
        setIsEditing(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const authToken = Cookies.get("authToken")

    if (!authToken) {
      throw new Error("Authentication token not found. Please log in again.")
    }
    try {
      const response = await fetch("https://cricket-web-app-backend.vercel.app/api/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          education: formData.education,
          stateOfResidence: formData.stateOfResidence,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      // Update local state with the form data
      setProfileData(formData)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error updating profile:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const router = useRouter()

  const handleLogout = () => {
    // Delete auth token and role from cookies
    Cookies.remove("authToken")
    Cookies.remove("role")

    // Redirect to login page
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {isEditing ? (
            <ProfileForm
              key="form"
              formData={formData}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
              onCancel={() => {
                if (profileData) {
                  setIsEditing(false)
                }
              }}
              isEditing={isEditing}
              profileData={profileData}
              isSubmitting={isSubmitting}
            />
          ) : (
            profileData && (
              <ProfileView
                key="view"
                profileData={profileData}
                onEdit={() => {
                  setFormData(profileData)
                  setIsEditing(true)
                }}
                onLogout={handleLogout}
              />
            )
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

