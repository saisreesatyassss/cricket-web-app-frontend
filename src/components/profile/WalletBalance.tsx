// components/profile/WalletBalance.tsx

'use client';

import { Wallet } from 'lucide-react';

type WalletBalanceProps = {
  withdrawable: number;
  nonWithdrawable: number;
};

export default function WalletBalance({ withdrawable, nonWithdrawable }: WalletBalanceProps) {
  const totalAmount = withdrawable + nonWithdrawable;

  return (
    <div className="mt-8 bg-white shadow rounded-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <Wallet className="h-5 w-5 text-green-600" /> Wallet Balance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Withdrawable</p>
          <p className="text-lg font-bold text-blue-700">₹{withdrawable.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Bonus</p>
          <p className="text-lg font-bold text-orange-600">₹{nonWithdrawable.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-lg font-bold text-green-600">₹{totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
