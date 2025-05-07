import { Share2, Copy, Send } from 'lucide-react';
import { useState } from 'react';
import { Wallet } from 'lucide-react';

const ReferralSection = ({ referralId }: { referralId: string }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://cricketpanga.com/signup/${referralId}`;
  const message = `Join Cricket Panga & earn rewards!\n\nSign up using my referral link & load ₹49 to get started. You’ll get bonus cash, and I’ll earn ₹5 too!\n\n ${referralLink}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleGenericShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Cricket Panga Referral',
        text: message,
        url: referralLink
      });
    } else {
      alert('Sharing not supported on this device');
    }
  };

  return (
    <div className="mt-8 bg-white shadow rounded-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <Wallet className="h-5 w-5 text-green-600" /> Your Referral Info
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Your Referral ID</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-blue-700">{referralId}</p>
            <button
              onClick={handleCopy}
              className="ml-2 text-blue-500 hover:text-blue-700"
              title="Copy Referral Link"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {copied && <p className="text-xs text-green-600 mt-1">Link copied!</p>}
        </div>

        <div className="p-4 bg-green-50 rounded-lg shadow-sm space-y-2">
          <p className="text-sm text-gray-600">Share Your Link</p>
          <div className="flex gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
            >
              <Send className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={handleGenericShare}
              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-gray-700 space-y-3">
        <p className="font-semibold text-orange-800">Referral Program Rules:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Invite friends to Cricket Panga and earn ₹5 bonus for each successful referral.</li>
          <li>The bonus is credited when your friend loads ₹49 into their wallet.</li>
          <li>Referral bonuses are credited as non-withdrawable wallet balance.</li>
          <li>If your referred friend wins the ₹1 Lakh grand prize, you’ll get ₹5,000 extra!</li>
          <li>🚫 Self-referrals are strictly prohibited and may result in account suspension.</li>
        </ul>
        <p className="mt-2 font-medium text-green-700">Start referring and earn rewards now!</p>
      </div>
    </div>
  );
};

export default ReferralSection;
