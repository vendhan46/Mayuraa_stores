import { ArrowRight, Check, Gift, RefreshCcw, Scissors, Sparkles, Truck } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import { loyalty, services } from '../data/site.js'
import './Services.css'

const ICONS = { Scissors, Truck, Gift, RefreshCcw }

/* Store services on the left, loyalty club card on the right. */
export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container services__inner">
        <div>
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2 className="h2">
              The small things <em>we do on the floor.</em>
            </h2>
          </Reveal>
          <ul className="services__list">
            {services.map((s, i) => {
              const Icon = ICONS[s.icon]
              return (
                <Reveal as="li" key={s.title} className="service" delay={0.05 + i * 0.06}>
                  <span className="service__icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="service__title">{s.title}</h3>
                    <p className="service__detail">{s.detail}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal className="club on-dark" delay={0.15}>
          <div className="club__glow" aria-hidden="true" />
          <p className="eyebrow eyebrow--light">
            <Sparkles size={14} strokeWidth={2} aria-hidden="true" /> Loyalty
          </p>
          <h3 className="h2 club__title">
            Join <em>{loyalty.name}.</em>
          </h3>
          <p className="club__text">Free to join at any billing counter, or sign up below and show the SMS on your next visit.</p>
          <ul className="club__perks">
            {loyalty.perks.map((p) => (
              <li key={p}>
                <Check size={15} strokeWidth={2.4} aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
          <a href="#visit" className="btn btn--marigold">
            Become a member <ArrowRight size={16} />
          </a>
          <div className="club__card" aria-hidden="true">
            <span>MAYURA CIRCLE</span>
            <b>•••• 0186</b>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
