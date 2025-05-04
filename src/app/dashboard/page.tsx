"use client"
import { useState } from 'react';
import { 
  Trophy, 
  Home, 
  Users, 
  Calendar, 
  Star, 
  Bell, 
  Settings, 
  LogOut,
  Search,
  Wallet,
  User,
  Menu,
  X,
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/sidebar';

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showNotifications, setShowNotifications] = useState(false);

  const upcomingMatches = [
    {
      id: 1,
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      team1Logo: '/api/placeholder/40/40',
      team2Logo: '/api/placeholder/40/40',
      date: 'Today, 7:30 PM',
      odds: { team1: '2.10', team2: '1.70' }
    },
    {
      id: 2,
      team1: 'Royal Challengers',
      team2: 'Kolkata Knight Riders',
      team1Logo: '/api/placeholder/40/40',
      team2Logo: '/api/placeholder/40/40',
      date: 'Tomorrow, 3:30 PM',
      odds: { team1: '1.85', team2: '1.95' }
    },
    {
      id: 3,
      team1: 'Delhi Capitals',
      team2: 'Rajasthan Royals',
      team1Logo: '/api/placeholder/40/40',
      team2Logo: '/api/placeholder/40/40',
      date: 'May 6, 7:30 PM',
      odds: { team1: '2.25', team2: '1.65' }
    }
  ];

  const liveMatches = [
    {
      id: 4,
      team1: 'Punjab Kings',
      team2: 'Gujarat Titans',
      team1Logo: '/api/placeholder/40/40',
      team2Logo: '/api/placeholder/40/40',
      score: { team1: '156/4 (15.2)', team2: '- (-)' },
      status: 'Punjab Kings batting',
      odds: { team1: '1.45', team2: '2.70' }
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Top Batsman',
      description: 'Virat Kohli to score 50+ runs',
      odds: '1.95'
    },
    {
      id: 2,
      title: 'Total Sixes',
      description: 'Over 12.5 sixes in the match',
      odds: '1.85'
    },
    {
      id: 3,
      title: 'Winning Margin',
      description: 'Mumbai to win by 20+ runs',
      odds: '2.35'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Match Starting Soon',
      message: 'Mumbai Indians vs Chennai Super Kings starts in 30 minutes',
      time: '30 min ago'
    },
    {
      id: 2,
      title: 'Bet Won!',
      message: 'You won ₹500 on your Delhi Capitals prediction',
      time: '2 hours ago'
    },
    {
      id: 3,
      title: 'Deposit Bonus',
      message: 'Use code CRICKET50 for 50% bonus on your next deposit',
      time: 'Today, 10:30 AM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-blue-700" />
              <span className="text-lg font-bold text-blue-700">Cricket Panga</span>
              <span className="text-sm text-orange-500 font-semibold">India Edition</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Search matches, teams..."
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-700">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 text-center border-t border-gray-200">
                      <a href="#" className="text-xs text-blue-700 hover:text-blue-800 font-medium">
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-700" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">Rohit Sharma</p>
                  <p className="text-gray-500">₹5,000</p>
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? 
                  <X className="h-6 w-6" /> : 
                  <Menu className="h-6 w-6" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-2">
          <div className="px-4 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 bg-blue-50">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              My Bets
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              Wallet
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              Profile
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700">Rohit Sharma</p>
                  <p className="text-sm text-gray-500">₹5,000</p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                  Settings
                </a>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex">
        <Sidebar/>
        {/* Sidebar */}
       
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-10">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Wallet className="h-6 w-6 text-blue-700" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Available Balance
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            ₹5,000
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <div className="text-sm">
                    <Link href="/wallet" className="font-medium text-blue-700 hover:text-blue-900">
                      Add funds
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Winnings
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            ₹12,500
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <div className="text-sm">
                    <Link href="/history" className="font-medium text-blue-700 hover:text-blue-900">
                      View history
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Bets
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            7
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <div className="text-sm">
                    <Link href="/my-bets" className="font-medium text-blue-700 hover:text-blue-900">
                      View active bets
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <Trophy className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Leaderboard Rank
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            #42
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <div className="text-sm">
                    <Link href="/leaderboard" className="font-medium text-blue-700 hover:text-blue-900">
                      View leaderboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Match Tabs */}
            <div className="mt-8">
              <div className="sm:hidden">
                <select
                  className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  <option value="live">Live Matches</option>
                  <option value="upcoming">Upcoming Matches</option>
                  <option value="recommendations">Recommendations</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab('live')}
                      className={`${
                        activeTab === 'live'
                          ? 'border-blue-700 text-blue-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                    >
                      <Clock className="mr-2 h-5 w-5" />
                      Live Matches
                      <span className="bg-red-100 text-red-800 ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium">
                        {liveMatches.length}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('upcoming')}
                      className={`${
                        activeTab === 'upcoming'
                          ? 'border-blue-700 text-blue-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Upcoming Matches
                    </button>
                    <button
                      onClick={() => setActiveTab('recommendations')}
                      className={`${
                        activeTab === 'recommendations'
                          ? 'border-blue-700 text-blue-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                    >
                      <Star className="mr-2 h-5 w-5" />
                      Recommendations
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mt-6">
              {/* Live Matches */}
              {activeTab === 'live' && (
                <div className="space-y-4">
                  {liveMatches.map(match => (
                    <div key={match.id} className="bg-white shadow overflow-hidden sm:rounded-lg border-l-4 border-red-500">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
                            {/* Team 1 */}
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 mb-2">
                                <img src={match.team1Logo} alt={match.team1} className="w-full h-full object-contain" />
                              </div>
                              <span className="font-medium text-gray-900">{match.team1}</span>
                            </div>
                            
                            {/* VS */}
                            <div className="my-4 sm:my-0 flex flex-col items-center">
                              <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                                LIVE
                              </div>
                              <span className="text-xl font-bold text-gray-400">VS</span>
                            </div>
                            
                            {/* Team 2 */}
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 mb-2">
                                <img src={match.team2Logo} alt={match.team2} className="w-full h-full object-contain" />
                              </div>
                              <span className="font-medium text-gray-900">{match.team2}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 text-center sm:text-right">
                            <div className="text-sm text-red-600 font-medium mb-2">{match.status}</div>
                            <div className="text-lg font-bold">{match.score.team1}</div>
                            <div className="text-lg font-bold text-gray-400">{match.score.team2}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="space-y-2 w-full sm:w-auto mb-4 sm:mb-0">
                            <h4 className="text-sm font-medium text-gray-500">Place your bet</h4>
                            <div className="flex space-x-3">
                              <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {match.team1} ({match.odds.team1})
                              </button>
                              <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {match.team2} ({match.odds.team2})
                              </button>
                            </div>
                          </div>
                          <Link 
                            href={`/matches/${match.id}`}
                            className="text-blue-700 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            View more bets
                            <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  {liveMatches.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No live matches at the moment.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Upcoming Matches */}
              {activeTab === 'upcoming' && (
                <div className="space-y-4">
                  {upcomingMatches.map(match => (
                    <div key={match.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
                            {/* Team 1 */}
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 mb-2">
                                <img src={match.team1Logo} alt={match.team1} className="w-full h-full object-contain" />
                              </div>
                              <span className="font-medium text-gray-900">{match.team1}</span>
                            </div>
                            
                            {/* VS */}
                            <div className="my-4 sm:my-0 flex flex-col items-center">
                              <div className="text-gray-500 text-sm mb-2">{match.date}</div>
                              <span className="text-xl font-bold text-gray-400">VS</span>
                            </div>
                            
                            {/* Team 2 */}
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 mb-2">
                                <img src={match.team2Logo} alt={match.team2} className="w-full h-full object-contain" />
                              </div>
                              <span className="font-medium text-gray-900">{match.team2}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="space-y-2 w-full sm:w-auto mb-4 sm:mb-0">
                            <h4 className="text-sm font-medium text-gray-500">Place your bet</h4>
                            <div className="flex space-x-3">
                              <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {match.team1} ({match.odds.team1})
                              </button>
                              <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {match.team2} ({match.odds.team2})
                              </button>
                            </div>
                          </div>
                          <Link 
                            href={`/matches/${match.id}`}
                            className="text-blue-700 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            View more bets
                            <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Recommendations */}
              {activeTab === 'recommendations' && (
                <div className="space-y-4">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="bg-white shadow overflow-hidden sm:rounded-lg border-l-4 border-blue-500">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{rec.title}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{rec.description}</p>
                          </div>
                          <div className="bg-blue-50 px-3 py-1 rounded-full">
                            <span className="text-blue-700 text-lg font-semibold">{rec.odds}</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-2">
                            <input 
                              type="number" 
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-32 sm:text-sm border-gray-300 rounded-md" 
                              placeholder="Amount" 
                              min="10"
                            />
                          </div>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Place Bet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Promotions Section */}
            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-900">Promotions</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-blue-600">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <p className="text-sm font-medium text-gray-900">
                        Welcome Bonus
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Get 100% bonus on first deposit
                      </p>
                    </a>
                  </div>
                </div>
                
                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-blue-600">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <p className="text-sm font-medium text-gray-900">
                        Refer & Earn
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Get ₹200 for every friend you refer
                      </p>
                    </a>
                  </div>
                </div>
                
                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-blue-600">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" /> 
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <p className="text-sm font-medium text-gray-900">
                        Risk-Free First Bet
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Get refund if your first bet loses
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Bet Won</p>
                          <p className="text-sm text-gray-500">Delhi Capitals vs Rajasthan Royals</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 font-medium">+₹500</span>
                        <span className="ml-2 text-sm text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Wallet className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Deposit</p>
                          <p className="text-sm text-gray-500">Via UPI</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium">+₹1,000</span>
                        <span className="ml-2 text-sm text-gray-500">Yesterday</span>
                      </div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Star className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Bet Placed</p>
                          <p className="text-sm text-gray-500">Chennai Super Kings to win</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-600 font-medium">-₹200</span>
                        <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="border-t border-gray-200 px-6 py-3">
                  <div className="text-sm">
                    <Link href="/activity" className="font-medium text-blue-700 hover:text-blue-900">
                      View all activity
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}