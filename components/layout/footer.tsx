import Link from "next/link";
import { 
  FaDiscord, 
  FaTiktok, 
  FaInstagram, 
  FaXTwitter, 
  FaYoutube, 
  FaStore,
  FaSignal
} from "react-icons/fa6";
import type { Route } from "next";

export function Footer() {
  return (
    <footer className="glass-footer">
      <div className="footer-container">
        <div className="footer-brand animate__animated animate__fadeIn">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div className="brand-info">
            <h3>MemeMC</h3>
            <p>Craft. Laugh. Repeat.</p>
          </div>
        </div>
        
        <div className="footer-social animate__animated animate__fadeIn">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a 
              href="https://dsc.gg/mememc" 
              target="_blank" 
              className="social-link discord"
              aria-label="Discord"
            >
              <FaDiscord />
            </a>
            <a 
              href="https://tiktok.com/@mememcclub" 
              target="_blank" 
              className="social-link tiktok"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            <a 
              href="https://instagram.com/mememcclub" 
              target="_blank" 
              className="social-link instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://x.com/mememcclub" 
              target="_blank" 
              className="social-link twitter"
              aria-label="X"
            >
              <FaXTwitter />
            </a>
            <a 
              href="https://youtube.com/@mememcclub" 
              target="_blank" 
              className="social-link youtube"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a 
              href="https://store.mememc.club" 
              target="_blank" 
              className="social-link store"
              aria-label="Store"
            >
              <FaStore />
            </a>
          </div>
        </div>
        
        <div className="footer-links animate__animated animate__fadeIn animate__delay-0.5s">
          <div className="link-group">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/" as={Route<"/">}>
                  <span>›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/rules" as={Route<"/rules">}>
                  <span>›</span> Rules
                </Link>
              </li>
              <li>
                <Link href="/partners" as={Route<"/partners">}>
                  <span>›</span> Partners
                </Link>
              </li>
              <li>
                <Link href="/staff" as={Route<"/staff">}>
                  <span>›</span> Staff
                </Link>
              </li>
              <li>
                <Link href="/punishments" as={Route<"/punishments">}>
                  <span>›</span> Punishments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          <a 
            href="status" 
            target="_blank" 
            title="MemeMC Status Page"
            style={{ color: '#eaeaea' }}
          >
            <FaSignal style={{ color: '#eaeaea' }} /> MemeMC Status
          </a>
        </p>
        <p>© 2025 MemeMC. All rights reserved.</p>
        <p>Minecraft is a trademark of Mojang Studios. Not affiliated with Mojang or Microsoft.</p>
      </div>
    </footer>
  );
}
