import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

interface BottomBarProps {
  selectedCount: number;
  hasCaptain: boolean;
  hasViceCaptain: boolean;
  hasTeamName: boolean;
  submitting: boolean;
  onSubmit: () => void;
}

export default function BottomBar({
  selectedCount,
  hasCaptain,
  hasViceCaptain,
  hasTeamName,
  submitting,
  onSubmit,
}: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-gray-600">
          <span className="font-semibold">{selectedCount}</span> of 11 players selected
          {hasCaptain && ' • Captain ✓'}
          {hasViceCaptain && ' • Vice Captain ✓'}
        </div>
        <button
          onClick={onSubmit}
          disabled={selectedCount !== 11 || submitting || !hasTeamName}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
            selectedCount !== 11 || submitting || !hasTeamName
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {submitting ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Trophy className="w-5 h-5" />
          )}
          <span>Create Team</span>
        </button>
      </div>
    </div>
  );
}