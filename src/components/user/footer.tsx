// import { Trophy, Facebook, Twitter, Instagram } from 'lucide-react';

// export default function UserFooter() {
//   return (
//     <footer className="bg-white shadow-sm mt-auto">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="py-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="col-span-1">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Trophy className="h-6 w-6 text-black" />
//                 <span className="text-lg font-semibold text-gray-900">Cricket Fantasy</span>
//               </div>
//               <p className="text-gray-500 text-sm">
//                 Join the ultimate cricket fantasy experience. Create your dream team and compete with players worldwide.
//               </p>
//             </div>
            
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
//               <ul className="space-y-3">
//                 <li><a href="/" className="text-gray-500 hover:text-black transition-colors">Home</a></li>
//                 <li><a href="/my-teams" className="text-gray-500 hover:text-black transition-colors">My Teams</a></li>
//                 <li><a href="/leaderboard" className="text-gray-500 hover:text-black transition-colors">Leaderboard</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-gray-500 hover:text-black transition-colors">FAQ</a></li>
//                 <li><a href="#" className="text-gray-500 hover:text-black transition-colors">Contact Us</a></li>
//                 <li><a href="#" className="text-gray-500 hover:text-black transition-colors">Help Center</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-4">Follow Us</h3>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-500 hover:text-black transition-colors">
//                   <Facebook className="h-5 w-5" />
//                 </a>
//                 <a href="#" className="text-gray-500 hover:text-black transition-colors">
//                   <Twitter className="h-5 w-5" />
//                 </a>
//                 <a href="#" className="text-gray-500 hover:text-black transition-colors">
//                   <Instagram className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-200 mt-8 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-gray-500 text-sm">© 2025 Cricket Fantasy. All rights reserved.</p>
//               <div className="flex space-x-6 mt-4 md:mt-0">
//                 <a href="#" className="text-gray-500 hover:text-black transition-colors text-sm">
//                   Privacy Policy
//                 </a>
//                 <a href="#" className="text-gray-500 hover:text-black transition-colors text-sm">
//                   Terms of Service
//                 </a>
//                 <a href="#" className="text-gray-500 hover:text-black transition-colors text-sm">
//                   Cookie Policy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
import { Trophy, Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function UserFooter() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-6 w-6 text-blue-700" />
              <span className="text-lg font-bold text-blue-700">Cricket Panga</span>
              <span className="text-sm text-orange-500 font-semibold">India Edition</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Join the ultimate cricket fantasy experience. Build your dream team and compete with players across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-blue-700 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-blue-700 transition-colors">Home</Link></li>
              <li><Link href="/my-teams" className="text-gray-600 hover:text-blue-700 transition-colors">My Teams</Link></li>
              <li><Link href="/leaderboard" className="text-gray-600 hover:text-blue-700 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-blue-700 mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#faq" className="text-gray-600 hover:text-blue-700 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-700 transition-colors">Contact Us</Link></li>
              <li><Link href="/help" className="text-gray-600 hover:text-blue-700 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-blue-700 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 Cricket Panga. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-700 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-700 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
