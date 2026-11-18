import { useEffect, useState } from 'react'
import { ArrowRight, Check, Copy } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SmartImage from './ui/SmartImage.jsx'
import { campaign, photos } from '../data/site.js'
import { pad } from '../lib/format.js'
import './Offers.css'

/* Time left until the campaign ends, refreshed every second. */
function useCountdown(iso) {
  const compute = () => {
    const diff = Math.max(0, new Date(iso).getTime() - Date.now())
    const s = Math.floor(diff / 1000)
    return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60, over: diff === 0 }
  }
  const [left, setLeft] = useState(compute)
  useEffect(() => {
    const t = window.setInterval(() => setLeft(compute()), 1000)
    return () => window.clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iso])
  return left
}

function Coupon({ code, detail }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(code)
    } catch {
      /* Clipboard may be unavailable; the visual confirmation still helps the demo. */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <li className="coupon">
      <div>
        <p className="coupon__code">{code}</p>
        <p className="coupon__detail">{detail}</p>
      </div>
      <button type="button" className="coupon__copy" onClick={copy} aria-live="polite">
        {copied ? <Check size={15} strokeWidth={2.2} aria-hidden="true" /> : <Copy size={15} strokeWidth={1.8} aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </li>
  )
}

export default function Offers() {
  const left = useCountdown(campaign.endsAt)
  const units = [
    ['Days', left.days],
    ['Hours', left.hours],
    ['Min', left.mins],
    ['Sec', left.secs],
  ]

  return (
    <section id="offers" className="offers on-dark">
      <div className="container offers__inner">
        <div className="offers__visual">
          <SmartImage id={photos.offers} alt="A rail of marigold and coral kurtas and dresses" sizes="(max-width: 980px) 100vw, 46vw" />
          <div className="offers__stamp" aria-hidden="true">
            <span>Ends</span>
            <strong>30 Nov</strong>
          </div>
        </div>

        <Reveal className="offers__copy">
          <p className="eyebrow eyebrow--light">{campaign.eyebrow}</p>
          <h2 className="h2 offers__title">
            Up to <em>40% off</em> silk sarees, 20% off gold making charges.
          </h2>
          <p className="lead offers__text">{campaign.text}</p>

          <div className="offers__timer" role="timer" aria-label="Time left in the Wedding Season Edit">
            {left.over ? (
              <p className="offers__over">This edit has ended. The next one is being stitched.</p>
            ) : (
              units.map(([label, value]) => (
                <div key={label} className="offers__unit">
                  <span className="offers__num">{pad(value)}</span>
                  <span className="offers__label">{label}</span>
                </div>
              ))
            )}
          </div>

          <ul className="offers__coupons">
            {campaign.coupons.map((c) => (
              <Coupon key={c.code} {...c} />
            ))}
          </ul>

          <a href="#picks" className="btn btn--marigold">
            Shop the edit <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
