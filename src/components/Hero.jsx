import { motion } from 'framer-motion'
import { ArrowRight, Clock, Star } from 'lucide-react'
import SmartImage from './ui/SmartImage.jsx'
import { brand, contact, photos } from '../data/site.js'
import './Hero.css'

const EASE = [0.22, 1, 0.36, 1]

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.p className="eyebrow" {...rise(0.15)}>
            Coimbatore · Since {brand.founded}
          </motion.p>
          <motion.h1 className="display hero__title" {...rise(0.28)}>
            Everything your family needs, <em>under one roof.</em>
          </motion.h1>
          <motion.p className="lead hero__text" {...rise(0.42)}>
            Six floors of sarees, menswear, kids, jewellery, home and electronics — with the same
            shop-floor service we started with in 1986.
          </motion.p>
          <motion.div className="hero__actions" {...rise(0.54)}>
            <a href="#picks" className="btn btn--primary">
              Shop new arrivals <ArrowRight size={16} />
            </a>
            <a href="#floors" className="btn btn--outline">
              Explore the store
            </a>
          </motion.div>

          <motion.ul className="hero__proof" {...rise(0.68)} aria-label="Quick facts">
            <li>
              <Star size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>
                <b>4.8</b> rating · 2,300+ reviews
              </span>
            </li>
            <li>
              <Clock size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>{contact.hours}</span>
            </li>
          </motion.ul>
        </div>

        <div className="hero__visual">
          <motion.div
            className="hero__main"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
          >
            <SmartImage
              id={photos.hero}
              alt="A woman in a plum and gold Kanchipuram silk saree against a red backdrop"
              sizes="(max-width: 980px) 100vw, 48vw"
              position="50% 18%"
              priority
            />
            <span className="tag tag--marigold hero__tag">Wedding Season Edit</span>
          </motion.div>

          <motion.figure
            className="hero__card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            <SmartImage
              id={photos.heroSmall}
              alt="A strand of white pearls in a red presentation box"
              sizes="220px"
            />
            <figcaption>
              <span className="hero__card-label">Ground floor</span>
              <span className="hero__card-title">Jewellery, hallmarked & buy-back guaranteed</span>
            </figcaption>
          </motion.figure>

          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            aria-hidden="true"
          >
            <span>Up to</span>
            <strong>40%</strong>
            <span>off silks</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
