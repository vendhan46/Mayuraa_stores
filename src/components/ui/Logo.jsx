import './Logo.css'

/* Wordmark with a small "M" monogram drawn as a peacock crest. */
export default function Logo({ onClick, className = '' }) {
  return (
    <a href="#home" className={`logo ${className}`} aria-label="MAYURA Department Store — back to top" onClick={onClick}>
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="currentColor" />
        <path
          d="M14 46V18l10 16 8-12 8 12 10-16v28"
          fill="none"
          stroke="#f2a93b"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__text">
        <span className="logo__name">MAYURA</span>
        <span className="logo__sub">Department Store</span>
      </span>
    </a>
  )
}

/* WhatsApp is not part of Lucide's icon set, so a small matching outline glyph lives here. */
export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.4 20.6l1.3-4.7a8.6 8.6 0 1 1 3.4 3.4z" />
      <path d="M9.3 8.2c-.4 0-.7.2-.9.6-.5.9-.3 2.3.9 3.8 1.3 1.6 2.8 2.5 4 2.6.6 0 1.2-.3 1.5-.8l.2-.6-1.7-.9-.7.7c-.8-.3-1.7-1.1-2.2-2l.6-.8z" />
    </svg>
  )
}
