 "use client"

import { useEffect, useState } from 'react';
import { Edit3, Wallet } from 'lucide-react';
import Image from 'next/image';
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


  useEffect(() => {
      const token = Cookies.get("authToken");
      if (token) {
        setAuthToken(token);
      }
    }, []);



  useEffect(() => {
    if (!authToken) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch('https://cricket-web-app-backend.vercel.app/api/user/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();

        const profileWithDefaults = {
          ...data.profile,
          profilePicture: data.profile.profilePicture || '',
          email: data.profile.email || '',
        };

        setProfileData(profileWithDefaults);
        setFormData(profileWithDefaults);
        setWallet(data.wallet || {});
      } catch (err: any) {
        setError(err.message || 'Error loading profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken) {
      fetchProfile();
    }
  }, [authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData) return;

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

      if (!res.ok) throw new Error('Failed to update profile');

      setProfileData(formData);
      setShowEdit(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = (wallet.withdrawable || 0) + (wallet.nonWithdrawable || 0);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!profileData) return <div className="text-center text-red-500">{error || 'Profile not found'}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Profile</h2>
        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          {/* <div className="h-20 w-20 rounded-full bg-gray-100 overflow-hidden">
            <Image
              src={profileData.profilePicture}
              alt="Profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div> */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div><span className="font-medium">Gender:</span> {profileData.gender}</div>
          <div><span className="font-medium">DOB:</span> {new Date(profileData.dateOfBirth).toLocaleDateString()}</div>
          <div><span className="font-medium">Education:</span> {profileData.education}</div>
          <div><span className="font-medium">State:</span> {profileData.stateOfResidence}</div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5 text-green-600" /> Wallet Balance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Withdrawable</p>
            <p className="text-lg font-bold text-blue-700">₹{wallet.withdrawable ?? 0}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Bonus</p>
            <p className="text-lg font-bold text-orange-600">₹{wallet.nonWithdrawable ?? 0}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-lg font-bold text-green-600">₹{totalAmount}</p>
          </div>
        </div>
      </div>

      {showEdit && formData && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg space-y-4">
            <h3 className="text-lg font-bold">Edit Profile</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="education"
              placeholder="Education"
              className="input"
              value={formData.education}
              onChange={handleChange}
            />
            <input
              type="text"
              name="stateOfResidence"
              placeholder="State"
              className="input"
              value={formData.stateOfResidence}
              onChange={handleChange}
            />
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="date"
              name="dateOfBirth"
              className="input"
              value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
              onChange={handleChange}
            />
            <div className="flex justify-end space-x-2">
              <button className="text-sm text-gray-600" onClick={() => setShowEdit(false)}>Cancel</button>
              <button
                className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                onClick={handleUpdate}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
