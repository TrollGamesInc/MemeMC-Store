import Link from "next/link";
import { 
  FaDiscord, 
  FaTiktok, 
  FaInstagram, 
  FaXTwitter, 
  FaYoutube, 
  FaStore 
} from "react-icons/fa6";
import { FaSignal } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div>
                <h3 className="text-2xl font-bold">MemeMC</h3>
                <p className="text-gray-400">Craft. Laugh. Repeat.</p>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="animate-fadeIn">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://dsc.gg/mememc" 
                target="_blank" 
                className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
              <a 
                href="https://tiktok.com/@mememcclub" 
                target="_blank" 
                className="bg-black hover:bg-gray-900 p-3 rounded-full transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/mememcclub" 
                target="_blank" 
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/mememcclub" 
                target="_blank" 
                className="bg-gray-900 hover:bg-black p-3 rounded-full transition-colors"
                aria-label="X"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@mememcclub" 
                target="_blank" 
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a 
                href="https://store.mememc.club" 
                target="_blank" 
                className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors"
                aria-label="Store"
              >
                <FaStore className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-fadeIn delay-150">
            <div className="link-group">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <span className="mr-2">›</span> Home
                  </Link>
                </li>
                <li>
                  <Link href="/rules" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <span className="mr-2">›</span> Rules
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <span className="mr-2">›</span> Partners
                  </Link>
                </li>
                <li>
                  <Link href="/staff" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <span className="mr-2">›</span> Staff
                  </Link>
                </li>
                <li>
                  <Link href="/punishments" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <span className="mr-2">›</span> Punishments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p className="mb-2">
            <a 
              href="status" 
              target="_blank" 
              className="inline-flex items-center hover:text-white transition-colors"
            >
              <FaSignal className="mr-2" /> MemeMC Status
            </a>
          </p>
          <p className="mb-2">© 2025 MemeMC. All rights reserved.</p>
          <p>Minecraft is a trademark of Mojang Studios. Not affiliated with Mojang or Microsoft.</p>
        </div>
      </div>
    </footer>
