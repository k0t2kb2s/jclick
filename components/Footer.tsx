import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <span className="footer-brand">
          <Logo compact />
          <span>© {new Date().getFullYear()}</span>
        </span>
        <nav className="footer-links" aria-label="Контакты">
          <a
            href="https://justcl1ck.t.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram @justcl1ck
          </a>
          <a
            href="https://instagram.com/jcl1ck"
            target="_blank"
            rel="noopener noreferrer"
          >
            @jcl1ck в Instagram
          </a>
          <a
            href="https://wa.me/77067010125?text=Здравствуйте!%20Хочу%20попробовать%20карту%20jclick%20для%20отзывов."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +7 706 701 01 25
          </a>
        </nav>
      </div>
    </footer>
  );
}
