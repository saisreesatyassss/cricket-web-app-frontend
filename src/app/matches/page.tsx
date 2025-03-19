"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Trophy, Search, RefreshCw } from 'lucide-react';
import { Match } from '@/types/match';
import MatchCard from '@/components/matches/MatchCard';
import UserHeader from '@/components/user/header';
import UserFooter from '@/components/user/footer';
import { useAuthCheck } from '@/utils/client-auth';

function App() {
  useAuthCheck();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const authToken = Cookies.get('authToken');
      const response = await axios.get('https://cricket-web-app-backend.vercel.app/api/team/matches', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      setMatches(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const filteredMatches = matches.filter(match =>
    match.matchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.teams.some(team => team.toLowerCase().includes(searchTerm.toLowerCase())) ||
    match.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchMatches}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <UserHeader/>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-6">
            <Trophy className="w-10 h-10 text-black mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Cricket Fantasy Matches</h1>
          </div>
          
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search matches, teams, or venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredMatches.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-xl">
              {searchTerm ? 'No matches found for your search.' : 'No matches available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
    <UserFooter/>
    </>
  );
}

export default App;