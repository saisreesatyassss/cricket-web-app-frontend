"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  Calendar,
  School,
  Mail,
  Edit,
  Camera,
  Save,
  X
} from "lucide-react";
import { useState, memo } from "react";

type ProfileData = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  education: string;
  gender: string;
  stateOfResidence: string;
  email: string;
  dateOfBirth: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

const FormInput = memo(({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = true 
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <motion.div variants={itemVariants}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      required={required}
    />
  </motion.div>
));

FormInput.displayName = 'FormInput';

const FormSelect = memo(({ 
  label, 
  name, 
  value, 
  onChange, 
  options 
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string; }[];
}) => (
  <motion.div variants={itemVariants}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      required
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </motion.div>
));

FormSelect.displayName = 'FormSelect';

const ProfilePicture = memo(({ 
  src, 
  isHovered, 
  onHoverChange 
}: {
  src: string;
  isHovered: boolean;
  onHoverChange: (isHovered: boolean) => void;
}) => (
  <div 
    className="relative w-32 h-32 mx-auto rounded-full overflow-hidden"
    onMouseEnter={() => onHoverChange(true)}
    onMouseLeave={() => onHoverChange(false)}
  >
    <img 
      src={src} 
      alt="Profile"
      className="w-full h-full object-cover"
    />
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
));

ProfilePicture.displayName = 'ProfilePicture';

const ProfileForm = memo(({ 
  formData, 
  onSubmit, 
  onChange, 
  onCancel, 
  isEditing, 
  profileData 
}: {
  formData: ProfileData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel: () => void;
  isEditing: boolean;
  profileData: ProfileData | null;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isEditing ? 'Edit Profile' : 'Create Your Profile'}
          </h2>
          <ProfilePicture
            src={formData.profilePicture}
            isHovered={isHovered}
            onHoverChange={setIsHovered}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />
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
              { value: "Other", label: "Other" }
            ]}
          />
          <FormInput
            label="State of Residence"
            name="stateOfResidence"
            value={formData.stateOfResidence}
            onChange={onChange}
          />
          <motion.div variants={itemVariants} className="md:col-span-2">
            <FormInput
              label="Education"
              name="education"
              value={formData.education}
              onChange={onChange}
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex justify-end space-x-4">
          {isEditing && profileData && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </motion.div>
      </div>
    </motion.form>
  );
});

ProfileForm.displayName = 'ProfileForm';

const ProfileView = memo(({ 
  profileData, 
  onEdit 
}: {
  profileData: ProfileData;
  onEdit: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="relative" variants={itemVariants}>
        <ProfilePicture
          src={profileData.profilePicture}
          isHovered={isHovered}
          onHoverChange={setIsHovered}
        />
        <motion.h1 
          className="mt-4 text-3xl font-bold text-center text-gray-900 dark:text-white"
          variants={itemVariants}
        >
          {profileData.firstName} {profileData.lastName}
        </motion.h1>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
            </div>
            <div className="space-y-4">
              <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Born {new Date(profileData.dateOfBirth).toLocaleDateString()}
                </span>
              </motion.div>
              <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{profileData.stateOfResidence}</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <School className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h2>
            </div>
            <motion.p className="text-sm text-gray-600 dark:text-gray-300" whileHover={{ x: 5 }}>
              {profileData.education}
            </motion.p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden md:col-span-2">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
            </div>
            <motion.p className="text-sm text-gray-600 dark:text-gray-300" whileHover={{ x: 5 }}>
              {profileData.email}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div className="flex justify-center" variants={itemVariants}>
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </motion.div>
    </motion.div>
  );
});

ProfileView.displayName = 'ProfileView';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(!profileData);
  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
    education: "",
    gender: "",
    stateOfResidence: "",
    email: "",
    dateOfBirth: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <ProfileForm
            key="form"
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleInputChange}
            onCancel={() => setIsEditing(false)}
            isEditing={isEditing}
            profileData={profileData}
          />
        ) : (
          profileData && (
            <ProfileView
              key="view"
              profileData={profileData}
              onEdit={() => {
                setFormData(profileData);
                setIsEditing(true);
              }}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}