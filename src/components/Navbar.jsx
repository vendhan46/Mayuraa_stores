import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { announcements, brand, contact, navLinks } from '../data/site.js'
import { pad } from '../lib/format.js'
import './Navbar.css'

const EASE = [0.22, 1, 0.36, 1]

/* Tracks scroll position: whether we have left the top, and which section is in view. */
function useScrollState(ids) {
  const [state, setState] = useState({ scrolled: false, active: ids[0] })

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let active = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) active = id
      }
      const scrolled = window.scrollY > 24
      setState((prev) => (prev.active === active && prev.scrolled === scrolled ? prev : { scrolled, active }))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ids])

  return state
}

/* Rotating announcement line above the navigation. */
function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % announcements.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="bar" role="status" aria-live="polite">
      <div className="container bar__inner">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
        <a href="#offers" className="bar__link">
          See offers
        </a>
      </div>
    </div>
  )
}

const SECTION_IDS = navLinks.map((link) => link.id)

export default function Navbar({ bagCount, onOpenBag }) {
  const { scrolled, active } = useScrollState(SECTION_IDS)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 980 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`top ${scrolled ? 'top--scrolled' : ''} ${open ? 'top--open' : ''}`}>
      <AnnouncementBar />

      <div className="nav">
        <div className="container nav__inner">
          <Logo onClick={close} />

          <nav className="nav__desktop" aria-label="Primary">
            <ul className="nav__links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="nav__link" aria-current={active === link.id ? 'true' : undefined}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <a href="#visit" className="btn btn--sm btn--outline nav__cta">
              Store hours
            </a>
            <button type="button" className="nav__bag" onClick={onOpenBag} aria-label={`Open shopping bag, ${bagCount} items`}>
              <ShoppingBag size={22} strokeWidth={1.6} aria-hidden="true" />
              {bagCount > 0 && (
                <motion.span
                  key={bagCount}
                  className="nav__count"
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                >
                  {bagCount}
                </motion.span>
              )}
            </button>
            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={24} strokeWidth={1.6} /> : <Menu size={24} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav className="container menu__inner" aria-label="Mobile">
              <ul className="menu__links">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.08 + index * 0.05 }}
                  >
                    <a href={`#${link.id}`} className="menu__link" onClick={close}>
                      <span className="menu__index">{pad(index + 1)}</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a href="#picks" className="btn btn--marigold" onClick={close}>
                  Shop new arrivals <ArrowRight size={16} />
                </a>
                <p className="menu__tagline">{brand.tagline}</p>
                <a href={`tel:${contact.phoneHref}`} className="menu__phone">
                  {contact.phoneDisplay}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
