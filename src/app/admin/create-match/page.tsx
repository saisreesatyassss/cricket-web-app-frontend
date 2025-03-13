'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Trophy, ArrowLeft, Calendar, MapPin, Users, Coins } from 'lucide-react';

export default function CreateMatch() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    matchName: '',
    teams: ['', ''],
    venue: '',
    matchDate: '',
    entryFee: '',
    prizePool: '',
    maxTeamsPerUser: '1'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const authToken = Cookies.get('authToken');
      
      await axios.post(
        'https://cricket-web-app-backend.vercel.app/api/team/matches/create',
        {
          ...formData,
          entryFee: Number(formData.entryFee),
          prizePool: Number(formData.prizePool),
          maxTeamsPerUser: Number(formData.maxTeamsPerUser)
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      
      alert('Match created successfully!');
    //   router.push('/admin');
    } catch (error) {
      alert('Failed to create match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamChange = (index: number, value: string) => {
    const newTeams = [...formData.teams];
    newTeams[index] = value;
    setFormData({ ...formData, teams: newTeams });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-black mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Create New Match</h1>
          </div>
          <div className="w-24"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Trophy className="w-4 h-4 inline-block mr-2" />
              Match Name
            </label>
            <input
              type="text"
              required
              value={formData.matchName}
              onChange={(e) => setFormData({ ...formData, matchName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter match name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.teams.map((team, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline-block mr-2" />
                  Team {index + 1}
                </label>
                <input
                  type="text"
                  required
                  value={team}
                  onChange={(e) => handleTeamChange(index, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder={`Enter team ${index + 1} name`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline-block mr-2" />
              Venue
            </label>
            <input
              type="text"
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter venue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Match Date & Time
            </label>
            <input
              type="datetime-local"
              required
              value={formData.matchDate}
              onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Coins className="w-4 h-4 inline-block mr-2" />
                Entry Fee (₹)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.entryFee}
                onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter entry fee"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Trophy className="w-4 h-4 inline-block mr-2" />
                Prize Pool (₹)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter prize pool"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
              loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Trophy className="w-5 h-5" />
                <span>Create Match</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}