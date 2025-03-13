import React from 'react';
import { Calendar, MapPin, Trophy, Coins, Users, Timer } from 'lucide-react';
import { Match } from '@/types/match';
import { useRouter } from "next/navigation";

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const formattedDate = new Date(match.matchDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
const router=useRouter()
  const timeUntilMatch = () => {
    const now = new Date();
    const matchDate = new Date(match.matchDate);
    const diff = matchDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Match Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group max-w-[340px] w-full mx-auto">
      {/* Status Badge */}
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className={`absolute transform rotate-45 translate-y-[-50%] translate-x-[50%] w-[141%] py-1 text-center text-xs font-bold text-white ${
          match.status === 'live' 
            ? 'bg-green-500'
            : match.status === 'upcoming'
            ? 'bg-black'
            : 'bg-gray-500'
        }`}>
          {match.status.toUpperCase()}
        </div>
      </div>

      {/* Match Title and Timer */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-black transition-colors line-clamp-1">{match.matchName}</h3>
        <div className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
          <Timer className="w-3 h-3 mr-1" />
          <span>{timeUntilMatch()}</span>
        </div>
      </div>

      {/* Teams Section */}
      <div className="flex justify-center items-center mb-4 bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-1 shadow-sm group-hover:shadow-md transition-shadow">
              <Users className="w-6 h-6 text-black" />
            </div>
            <p className="font-semibold text-sm text-gray-800">{match.teams[0]}</p>
          </div>
          <div className="text-xl font-bold text-black px-2">VS</div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-1 shadow-sm group-hover:shadow-md transition-shadow">
              <Users className="w-6 h-6 text-black" />
            </div>
            <p className="font-semibold text-sm text-gray-800">{match.teams[1]}</p>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
          <MapPin className="w-4 h-4 mr-2 text-black flex-shrink-0" />
          <span className="font-medium text-sm truncate">{match.venue}</span>
        </div>
        <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
          <Calendar className="w-4 h-4 mr-2 text-black flex-shrink-0" />
          <span className="font-medium text-sm">{formattedDate}</span>
        </div>
      </div>

      {/* Prize and Entry Fee */}
      <div className="flex justify-between gap-2 mb-4">
        <div className="flex-1 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-black" />
            <div>
              <p className="text-xs text-gray-500">Entry Fee</p>
              <p className="font-semibold text-sm">₹{match.entryFee}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-black" />
            <div>
              <p className="text-xs text-gray-500">Prize Pool</p>
              <p className="font-semibold text-sm">₹{match.prizePool}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Button */}
      <button 
        className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 transform group-hover:translate-y-[-2px]"
        onClick={() =>router.push(`/matches/${match._id}`)}
      >
        <Trophy className="w-5 h-5" />
        <span className="font-semibold">Join Contest</span>
      </button>
    </div>
  );
};

export default MatchCard;