import { Trophy } from 'lucide-react';

export default function AdminFooter() {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Trophy className="h-6 w-6 text-black" />
              <span className="text-lg font-semibold text-gray-900">Cricket Fantasy Admin</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-gray-500 text-sm">© 2025 Cricket Fantasy. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}