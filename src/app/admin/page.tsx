'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Trophy, Users, Plus, Edit, RefreshCw } from 'lucide-react';
import { Match } from '@/types/match';

export default function AdminDashboard() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const authToken = Cookies.get('authToken');
      const response = await axios.get('https://cricket-web-app-backend.vercel.app/api/team/matches', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      alert('Failed to fetch matches. Please try again.');
      setLoading(false);
    }
  };

  const handleStatusChange = async (matchId: string, status: string) => {
    try {
      setUpdatingStatus(matchId);
      const authToken = Cookies.get('authToken');
      
      await axios.patch(
        `https://cricket-web-app-backend.vercel.app/api/team/matches/${matchId}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      
      fetchMatches();
    } catch (error) {
      alert('Failed to update match status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-10 h-10 text-black mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <button
            onClick={() => router.push('/admin/create-match')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4 border border-gray-100"
          >
            <div className="bg-black rounded-full p-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900">Create Match</h2>
              <p className="text-gray-600">Set up a new cricket match</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/admin/add-players')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4 border border-gray-100"
          >
            <div className="bg-black rounded-full p-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900">Add Players</h2>
              <p className="text-gray-600">Manage players for matches</p>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Matches</h2>
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{match.matchName}</h3>
                    <p className="text-sm text-gray-600">{match.teams.join(' vs ')}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={match.status}
                      onChange={(e) => handleStatusChange(match._id, e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      disabled={updatingStatus === match._id}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>
                    
                    <button
                      onClick={() => router.push(`/admin/matches/${match._id}/points`)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Points</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}