'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Trophy, ArrowLeft, Users, Plus, Trash2, RefreshCw } from 'lucide-react';
import { Match } from '@/types/match';

interface PlayerForm {
  name: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
}

export default function AddPlayers() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [players, setPlayers] = useState<PlayerForm[]>([
    { name: '', team: '', role: 'batsman' }
  ]);

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

  const handleAddPlayer = () => {
    setPlayers([...players, { name: '', team: '', role: 'batsman' }]);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handlePlayerChange = (index: number, field: keyof PlayerForm, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) {
      alert('Please select a match');
      return;
    }

    try {
      setSubmitting(true);
      const authToken = Cookies.get('authToken');
      
      await axios.post(
        `https://cricket-web-app-backend.vercel.app/api/team/matches/${selectedMatch}/players`,
        { players },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      
      alert('Players added successfully!');
    //   router.push('/admin');
    } catch (error) {
      alert('Failed to add players. Please try again.');
    } finally {
      setSubmitting(false);
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center">
            <Users className="w-8 h-8 text-black mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Add Players</h1>
          </div>
          <div className="w-24"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Trophy className="w-4 h-4 inline-block mr-2" />
              Select Match
            </label>
            <select
              required
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Select a match</option>
              {matches.map((match) => (
                <option key={match._id} value={match._id}>
                  {match.matchName} ({match.teams.join(' vs ')})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Player Name
                    </label>
                    <input
                      type="text"
                      required
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter player name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team
                    </label>
                    <select
                      required
                      value={player.team}
                      onChange={(e) => handlePlayerChange(index, 'team', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select team</option>
                      {selectedMatch && matches.find(m => m._id === selectedMatch)?.teams.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      required
                      value={player.role}
                      onChange={(e) => handlePlayerChange(index, 'role', e.target.value as PlayerForm['role'])}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="batsman">Batsman</option>
                      <option value="bowler">Bowler</option>
                      <option value="all-rounder">All-rounder</option>
                      <option value="wicket-keeper">Wicket-keeper</option>
                    </select>
                  </div>
                </div>

                {players.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddPlayer}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Player</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
              submitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {submitting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Users className="w-5 h-5" />
                <span>Add Players</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}