import React from 'react';
import { Filter } from 'lucide-react';

interface PlayerFiltersProps {
  teamFilter: string;
  roleFilter: string;
  setTeamFilter: (team: string) => void;
  setRoleFilter: (role: string) => void;
  teams: string[];
  roles: string[];
}

export default function PlayerFilters({
  teamFilter,
  roleFilter,
  setTeamFilter,
  setRoleFilter,
  teams,
  roles,
}: PlayerFiltersProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Filter className="w-4 h-4 inline-block mr-2" />
          Filter by Team
        </label>
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          {teams.map(team => (
            <option key={team} value={team}>
              {team === 'all' ? 'All Teams' : team}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Filter className="w-4 h-4 inline-block mr-2" />
          Filter by Role
        </label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}