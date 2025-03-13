'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ArrowLeft, Trophy, RefreshCw } from 'lucide-react';
import { Player } from '@/types/players';
import TeamNameInput from '@/components/player-selection/TeamNameInput';
import PlayerFilters from '@/components/player-selection/PlayerFilters';
import PlayerCard from '@/components/player-selection/PlayerCard';
import BottomBar from '@/components/player-selection/BottomBar';
import UserHeader from '@/components/user/header';

interface SelectedPlayerDetails {
  playerId: string;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export default function PlayerSelection() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayerDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [teamName, setTeamName] = useState('');
  const params = useParams(); // ✅ Use useParams() to get params
  const matchId = params?.id;

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const authToken = Cookies.get('authToken');
      const response = await axios.get(`https://cricket-web-app-backend.vercel.app/api/team/matches/${params.id}/players`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      setPlayers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch players. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayers(prev => {
      const isSelected = prev.some(p => p.playerId === playerId);
      if (isSelected) {
        return prev.filter(p => p.playerId !== playerId);
      }
      if (prev.length >= 11) {
        alert('You can only select 11 players');
        return prev;
      }
      return [...prev, { playerId, isCaptain: false, isViceCaptain: false }];
    });
  };

  const toggleCaptain = (playerId: string) => {
    setSelectedPlayers(prev => {
      return prev.map(p => {
        if (p.playerId === playerId) {
          if (p.isCaptain) {
            return { ...p, isCaptain: false };
          }
          return { ...p, isCaptain: true, isViceCaptain: false };
        }
        if (p.isCaptain) {
          return { ...p, isCaptain: false };
        }
        return p;
      });
    });
  };

  const toggleViceCaptain = (playerId: string) => {
    setSelectedPlayers(prev => {
      return prev.map(p => {
        if (p.playerId === playerId) {
          if (p.isViceCaptain) {
            return { ...p, isViceCaptain: false };
          }
          return { ...p, isViceCaptain: true, isCaptain: false };
        }
        if (p.isViceCaptain) {
          return { ...p, isViceCaptain: false };
        }
        return p;
      });
    });
  };

  const handleSubmit = async () => {
    if (selectedPlayers.length !== 11) {
      alert('Please select exactly 11 players');
      return;
    }

    if (!selectedPlayers.some(p => p.isCaptain)) {
      alert('Please select a captain');
      return;
    }

    if (!selectedPlayers.some(p => p.isViceCaptain)) {
      alert('Please select a vice captain');
      return;
    }

    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }

    try {
      setSubmitting(true);
      const authToken = Cookies.get('authToken');
      
      await axios.post(
        'https://cricket-web-app-backend.vercel.app/api/teams/create',
        {
          matchId: params.id,
          teamName,
          players: selectedPlayers
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      alert('Team created successfully!');
      router.push('/my-teams');
    } catch (err) {
      alert('Failed to create team. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const teams = ['all', ...Array.from(new Set(players.map(player => player.team)))];
  const roles = ['all', 'batsman', 'bowler', 'all-rounder', 'wicket-keeper'];

  const filteredPlayers = players.filter(player => {
    const matchesTeam = teamFilter === 'all' || player.team === teamFilter;
    const matchesRole = roleFilter === 'all' || player.role === roleFilter;
    return matchesTeam && matchesRole;
  });

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
            onClick={fetchPlayers}
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
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Matches
          </button>
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-black mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Select Your Players</h1>
          </div>
          <div className="w-24"></div>
        </div>

        <TeamNameInput teamName={teamName} setTeamName={setTeamName} />

        <PlayerFilters
          teamFilter={teamFilter}
          roleFilter={roleFilter}
          setTeamFilter={setTeamFilter}
          setRoleFilter={setRoleFilter}
          teams={teams}
          roles={roles}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 mb-[48px] lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPlayers.map((player) => {
            const selectedPlayer = selectedPlayers.find(p => p.playerId === player._id);
            return (
              <PlayerCard
                key={player._id}
                player={player}
                isSelected={!!selectedPlayer}
                isCaptain={selectedPlayer?.isCaptain || false}
                isViceCaptain={selectedPlayer?.isViceCaptain || false}
                onSelect={() => handlePlayerSelect(player._id)}
                onToggleCaptain={() => toggleCaptain(player._id)}
                onToggleViceCaptain={() => toggleViceCaptain(player._id)}
              />
            );
          })}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-xl">No players found with the selected filters.</p>
          </div>
        )}

        <BottomBar
          selectedCount={selectedPlayers.length}
          hasCaptain={selectedPlayers.some(p => p.isCaptain)}
          hasViceCaptain={selectedPlayers.some(p => p.isViceCaptain)}
          hasTeamName={!!teamName.trim()}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
    </>
  );
}