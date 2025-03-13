import React from 'react';

interface TeamNameInputProps {
  teamName: string;
  setTeamName: (name: string) => void;
}

export default function TeamNameInput({ teamName, setTeamName }: TeamNameInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Team Name
      </label>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Enter your team name"
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
    </div>
  );
}