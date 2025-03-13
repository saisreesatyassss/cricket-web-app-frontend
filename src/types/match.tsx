export interface Match {
    _id: string;
    matchName: string;
    teams: string[];
    venue: string;
    matchDate: string;
    status: 'live' | 'upcoming' | 'completed';
    entryFee: number;
    prizePool: number;
  }