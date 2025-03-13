'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ArrowLeft, Users, Trophy, RefreshCw, Save } from 'lucide-react';
import { Player } from '@/types/players';
import {  Match } from '@/types/match';

export default function EditPlayerPoints({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [points, setPoints] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchMatchAndPlayers();
  }, [params.id]);

  const fetchMatchAndPlayers = async () => {
    try {
      setLoading(true);
      const authToken = Cookies.get('authToken');
      
      const [matchResponse, playersResponse] = await Promise.all([
        axios.get(`https://cricket-web-app-backend.vercel.app/api/team/matches/${params.id}`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
        }),
        axios.get(`https://cricket-web-app-backend.vercel.app/api/team/matches/${params.id}/players`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
        })
      ]);

      setMatch(matchResponse.data);
      setPlayers(playersResponse.data);
      
      // Initialize points from existing player data
      const initialPoints: Record<string, number> = {};
      playersResponse.data.forEach((player: Player) => {
        initialPoints[player._id] = player.points;
      });
      setPoints(initialPoints);
    } catch (error) {
      alert('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePointsChange = (playerId: string, newPoints: number) => {
    setPoints(prev => ({ ...prev, [playerId]: newPoints }));
  };

  const handleSaveAllPoints = async () => {
    try {
      setSaving(true);
      const authToken = Cookies.get('authToken');
      
      const playerPoints = Object.entries(points).map(([playerId, points]) => ({
        playerId,
        points
      }));

      await axios.patch(
        `https://cricket-web-app-backend.vercel.app/api/team/matches/${params.id}/player-points`,
        { playerPoints },
        {
          headers: { 'Authorization': `Bearer ${authToken}` },
        }
      );
      
      alert('Points updated successfully!');
      fetchMatchAndPlayers(); // Refresh data
    } catch (error) {
      alert('Failed to update points. Please try again.');
    } finally {
      setSaving(false);
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
            <Trophy className="w-8 h-8 text-black mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Edit Player Points</h1>
          </div>
          <div className="w-24"></div>
        </div>

        {match && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900">{match.matchName}</h2>
            <p className="text-gray-600">{match.teams.join(' vs ')}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            {players.map((player) => (
              <div key={player._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{player.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{player.team}</span>
                        <span>•</span>
                        <span className="capitalize">{player.role}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={points[player._id]}
                      onChange={(e) => handlePointsChange(player._id, Number(e.target.value))}
                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      disabled={saving}
                    />
                    <span className="text-sm font-medium text-gray-600">points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveAllPoints}
              disabled={saving}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
                saving
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {saving ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>Save All Points</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}