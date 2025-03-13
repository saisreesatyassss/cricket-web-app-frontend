import React from 'react';
import { Users, Crown, Star } from 'lucide-react';
import { Player } from '@/types/players';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  isCaptain: boolean;
  isViceCaptain: boolean;
  onSelect: () => void;
  onToggleCaptain: () => void;
  onToggleViceCaptain: () => void;
}

export default function PlayerCard({
  player,
  isSelected,
  isCaptain,
  isViceCaptain,
  onSelect,
  onToggleCaptain,
  onToggleViceCaptain,
}: PlayerCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-4 border-2 transition-all duration-300 ${
        isSelected
          ? 'border-black shadow-lg transform -translate-y-1'
          : 'border-gray-100 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{player.name}</h3>
          <p className="text-sm text-gray-500">{player.team}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
          {player.role}
        </span>
        <span className="text-sm font-semibold">{player.points} pts</span>
      </div>

      {isSelected && (
        <div className="mt-3 flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCaptain();
            }}
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              isCaptain
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Crown className="w-3 h-3" />
            <span>Captain</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleViceCaptain();
            }}
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              isViceCaptain
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Star className="w-3 h-3" />
            <span>Vice Captain</span>
          </button>
        </div>
      )}

      <button
        onClick={onSelect}
        className={`mt-3 w-full py-2 rounded-lg text-sm font-medium ${
          isSelected
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isSelected ? 'Remove' : 'Select'}
      </button>
    </div>
  );
}