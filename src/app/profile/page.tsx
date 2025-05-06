//  "use client"

// import { useEffect, useState } from 'react';
// import { Edit3, Wallet } from 'lucide-react';
// import Image from 'next/image';
// import Cookies from 'js-cookie';

// type ProfileData = {
//   firstName: string;
//   lastName: string;
//   profilePicture: string;
//   education: string;
//   gender: string;
//   stateOfResidence: string;
//   email: string;
//   dateOfBirth: string;
// };

// type WalletData = {
//   withdrawable?: number;
//   nonWithdrawable?: number;
// };

// export default function ProfilePage() {
//   const [profileData, setProfileData] = useState<ProfileData | null>(null);
//   const [wallet, setWallet] = useState<WalletData>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [showEdit, setShowEdit] = useState(false);
//   const [formData, setFormData] = useState<ProfileData | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [authToken, setAuthToken] = useState<string | null>(null);


//   useEffect(() => {
//       const token = Cookies.get("authToken");
//       if (token) {
//         setAuthToken(token);
//       }
//     }, []);

//   useEffect(() => {
//     if (!authToken) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await fetch('https://cricket-web-app-backend.vercel.app/api/user/profile', {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });

//         if (!res.ok) throw new Error('Failed to fetch profile');

//         const data = await res.json();

//         const profileWithDefaults: ProfileData = {
//           ...data.profilePage,
//           profilePicture: data.profilePage.profilePicture || '', // if added later
//           email: data.profilePage.email || '',
//         };

//         setProfileData(profileWithDefaults);
//         setFormData(profileWithDefaults);
//         setWallet(data.wallet || {});
//       } catch (err: any) {
//         setError(err.message || 'Error loading profile');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [authToken]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     if (!formData) return;
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     if (!formData) return;

//     setIsSubmitting(true);
//     try {
//       const res = await fetch('https://cricket-web-app-backend.vercel.app/api/user/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error('Failed to update profile');

//       setProfileData(formData);
//       setShowEdit(false);
//     } catch (err: any) {
//       setError(err.message || 'Failed to update');
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const totalAmount = (wallet.withdrawable || 0) + (wallet.nonWithdrawable || 0);

//   if (isLoading) return <div className="text-center py-20">Loading...</div>;
//   if (!profileData) return <div className="text-center text-red-500">{error || 'Profile not found'}</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-blue-700">Profile</h2>
//         <button
//           onClick={() => setShowEdit(true)}
//           className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
//         >
//           <Edit3 className="h-4 w-4" />
//           <span>Edit Profile</span>
//         </button>
//       </div>

//       <div className="bg-white shadow rounded-lg p-6 space-y-6 border border-gray-100">
//         <div className="flex items-center space-x-4">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">
//               {profileData.firstName} {profileData.lastName}
//             </h3>
//             <p className="text-sm text-gray-500">{profileData.email}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
//           <div><span className="font-medium">Gender:</span> {profileData.gender}</div>
//           <div><span className="font-medium">DOB:</span> {new Date(profileData.dateOfBirth).toLocaleDateString()}</div>
//           <div><span className="font-medium">Education:</span> {profileData.education}</div>
//           <div><span className="font-medium">State:</span> {profileData.stateOfResidence}</div>
//         </div>
//       </div>

//       <div className="mt-8 bg-white shadow rounded-lg p-6 border border-gray-100">
//         <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//           <Wallet className="h-5 w-5 text-green-600" /> Wallet Balance
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//           <div className="p-4 bg-blue-50 rounded-lg">
//             <p className="text-sm text-gray-600">Withdrawable</p>
//             <p className="text-lg font-bold text-blue-700">₹{wallet.withdrawable ?? 0}</p>
//           </div>
//           <div className="p-4 bg-orange-50 rounded-lg">
//             <p className="text-sm text-gray-600">Bonus</p>
//             <p className="text-lg font-bold text-orange-600">₹{wallet.nonWithdrawable ?? 0}</p>
//           </div>
//           <div className="p-4 bg-green-50 rounded-lg">
//             <p className="text-sm text-gray-600">Total</p>
//             <p className="text-lg font-bold text-green-600">₹{totalAmount}</p>
//           </div>
//         </div>
//       </div>

//   {showEdit && formData && (
//   <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
//     <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-xl space-y-6">
//       <div className="border-b pb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
//         <p className="text-sm text-gray-500">Update your personal details below</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//             First Name
//           </label>
//           <input
//             type="text"
//             name="firstName"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//             Last Name
//           </label>
//           <input
//             type="text"
//             name="lastName"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
//             Education
//           </label>
//           <input
//             type="text"
//             name="education"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={formData.education}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="stateOfResidence" className="block text-sm font-medium text-gray-700 mb-1">
//             State of Residence
//           </label>
//           <input
//             type="text"
//             name="stateOfResidence"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={formData.stateOfResidence}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//             Gender
//           </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="flex justify-end pt-4 space-x-4">
//         <button
//           onClick={() => setShowEdit(false)}
//           className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleUpdate}
//           disabled={isSubmitting}
//           className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
//         >
//           {isSubmitting ? 'Saving...' : 'Save Changes'}
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }


"use client"

import { useEffect, useState } from 'react';
import { Edit3, Wallet } from 'lucide-react';
import Cookies from 'js-cookie';

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

type WalletData = {
  withdrawable?: number;
  nonWithdrawable?: number;
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [wallet, setWallet] = useState<WalletData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Debug log for component mounting
  console.log("ProfilePage component mounted");

  useEffect(() => {
    console.log("Checking for auth token in cookies");
    const token = Cookies.get("authToken");
    if (token) {
      console.log("Auth token found");
      setAuthToken(token);
    } else {
      console.log("No auth token found in cookies");
      setError("Authentication token not found. Please log in again.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authToken) {
      console.log("No auth token available, skipping profile fetch");
      return;
    }

    const fetchProfile = async () => {
      console.log("Fetching profile data");
      try {
        const res = await fetch('https://cricket-web-app-backend.vercel.app/api/user/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Profile API response status:", res.status);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error("API error response:", errorText);
          throw new Error(`Failed to fetch profile: ${res.status}`);
        }

        const data = await res.json();
        console.log("Profile data received:", data);

        if (!data || !data.profilePage) {
          console.error("Invalid profile data structure:", data);
          throw new Error("Invalid profile data received");
        }

        const profileWithDefaults: ProfileData = {
          firstName: data.profilePage.firstName || '',
          lastName: data.profilePage.lastName || '',
          profilePicture: data.profilePage.profilePicture || '',
          education: data.profilePage.education || '',
          gender: data.profilePage.gender || '',
          stateOfResidence: data.profilePage.stateOfResidence || '',
          email: data.profilePage.email || '',
          dateOfBirth: data.profilePage.dateOfBirth || '',
        };

        console.log("Processed profile data:", profileWithDefaults);
        
        setProfileData(profileWithDefaults);
        setFormData(profileWithDefaults);
        setWallet(data.wallet || {});
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.message || 'Error loading profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    const updatedForm = { ...formData, [e.target.name]: e.target.value };
    console.log(`Form field "${e.target.name}" updated:`, e.target.value);
    setFormData(updatedForm);
  };

  const handleUpdate = async () => {
    if (!formData) return;

    console.log("Submitting profile update:", formData);
    setIsSubmitting(true);
    
    try {
      const res = await fetch('https://cricket-web-app-backend.vercel.app/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("Update API response status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API error response:", errorText);
        throw new Error(`Failed to update profile: ${res.status}`);
      }

      const data = await res.json();
      console.log("Update response:", data);
      
      setProfileData(formData);
      setShowEdit(false);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = (wallet.withdrawable || 0) + (wallet.nonWithdrawable || 0);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-2">⚠️ {error}</p>
          <p className="text-gray-600">Please try refreshing the page or logging in again.</p>
        </div>
      </div>
    );
  }

  // Render empty state if no profile
  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600 mb-2">Profile not found</p>
          <p className="text-gray-600">Unable to load your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Profile</h2>
        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center space-x-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg transition-colors"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-600 font-bold text-xl">
            {profileData.firstName?.[0]?.toUpperCase() || ''}
            {profileData.lastName?.[0]?.toUpperCase() || ''}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="p-3 bg-gray-50 rounded-md"><span className="font-medium">Gender:</span> {profileData.gender || 'Not specified'}</div>
          <div className="p-3 bg-gray-50 rounded-md"><span className="font-medium">DOB:</span> {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not specified'}</div>
          <div className="p-3 bg-gray-50 rounded-md"><span className="font-medium">Education:</span> {profileData.education || 'Not specified'}</div>
          <div className="p-3 bg-gray-50 rounded-md"><span className="font-medium">State:</span> {profileData.stateOfResidence || 'Not specified'}</div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5 text-green-600" /> Wallet Balance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Withdrawable</p>
            <p className="text-lg font-bold text-blue-700">₹{wallet.withdrawable?.toFixed(2) ?? '0.00'}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Bonus</p>
            <p className="text-lg font-bold text-orange-600">₹{wallet.nonWithdrawable?.toFixed(2) ?? '0.00'}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-lg font-bold text-green-600">₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {showEdit && formData && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <p className="text-sm text-gray-500">Update your personal details below</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="stateOfResidence" className="block text-sm font-medium text-gray-700 mb-1">
                  State of Residence
                </label>
                <input
                  type="text"
                  id="stateOfResidence"
                  name="stateOfResidence"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.stateOfResidence}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-4 space-x-4">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}