import { ArrowUp, Facebook, Instagram, Youtube } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { brand, contact, navLinks } from '../data/site.js'
import { categories } from '../data/products.js'
import './Footer.css'

/* Demo profiles — replace the href values with real URLs. */
const socials = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'Facebook', Icon: Facebook },
  { label: 'YouTube', Icon: Youtube },
]

export default function Footer({ onBrowse }) {
  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p className="footer__tagline">{brand.tagline}</p>
            <p className="footer__about">{brand.description}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer__heading">Navigate</h2>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Shop</h2>
            <ul className="footer__list">
              {categories
                .filter((c) => c !== 'All')
                .map((c) => (
                  <li key={c}>
                    <button type="button" onClick={() => onBrowse(c)}>
                      {c}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Contact</h2>
            <address className="footer__list footer__address">
              <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.hours}</span>
            </address>
            <ul className="footer__social">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <a href="#home" aria-label={`${label} (demo link)`} title={label}>
                    <Icon size={18} strokeWidth={1.6} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer__wordmark" aria-hidden="true">
          MAYURA
        </p>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {brand.name} {brand.descriptor}. All rights reserved.
          </p>
          <p className="footer__disclaimer">
            Design demonstration. The brand, products, prices, offers and reviews shown are fictional sample content.
          </p>
          <a href="#home" className="footer__top-link">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
