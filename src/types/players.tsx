export interface Player {
    _id: string;
    name: string;
    team: string;
    role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
    points: number;
  }