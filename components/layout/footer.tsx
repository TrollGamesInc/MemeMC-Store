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
                <a href="/">
                  <span>›</span> Home
                </a>
              </li>
              <li>
                <a href="/rules">
                  <span>›</span> Rules
                </a>
              </li>
              <li>
                <a href="/partners">
                  <span>›</span> Partners
                </a>
              </li>
              <li>
                <a href="/staff">
                  <span>›</span> Staff
                </a>
              </li>
              <li>
                <a href="/punishments">
                  <span>›</span> Punishments
                </a>
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
