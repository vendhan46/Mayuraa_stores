import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Info } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import { floors } from '../data/departments.js'
import './FloorGuide.css'

const EASE = [0.22, 1, 0.36, 1]

/* Interactive store directory: pick a floor on the left, see what is there on the right. */
export default function FloorGuide() {
  const [index, setIndex] = useState(2)
  const floor = floors[index]

  const onKey = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      setIndex((i) => (i + 1) % floors.length)
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      setIndex((i) => (i - 1 + floors.length) % floors.length)
    }
  }

  return (
    <section id="floors" className="section guide">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow">Store guide</p>
            <h2 className="h2">
              Know where you&rsquo;re going <em>before you park.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              The Cross-Cut Road flagship, floor by floor. Lifts and escalators sit at the centre of every floor;
              prams and wheelchairs are available at the ground-floor desk.
            </p>
          </Reveal>
        </div>

        <Reveal className="guide__panel">
          <div className="guide__floors" role="tablist" aria-label="Floors" aria-orientation="vertical" onKeyDown={onKey}>
            {[...floors].reverse().map((f) => {
              const i = floors.indexOf(f)
              const selected = i === index
              return (
                <button
                  key={f.level}
                  type="button"
                  role="tab"
                  id={`floor-tab-${f.level}`}
                  aria-selected={selected}
                  aria-controls="floor-panel"
                  tabIndex={selected ? 0 : -1}
                  className="guide__floor"
                  onClick={() => setIndex(i)}
                >
                  <span className="guide__level">{f.level}</span>
                  <span className="guide__name">
                    <span>{f.name}</span>
                    <span className="guide__headline">{f.headline}</span>
                  </span>
                  {selected && (
                    <motion.i className="guide__marker" layoutId="floor-marker" transition={{ duration: 0.5, ease: EASE }} aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>

          <div id="floor-panel" role="tabpanel" aria-labelledby={`floor-tab-${floor.level}`} className="guide__detail">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={floor.level}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="guide__big" aria-hidden="true">
                  {floor.level}
                </p>
                <p className="eyebrow">{floor.name}</p>
                <h3 className="h3 guide__title">{floor.headline}</h3>
                <ul className="guide__sections">
                  {floor.sections.map((s, i) => (
                    <li key={s}>
                      <span className="guide__index">{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="guide__note">
                  <Info size={16} strokeWidth={1.8} aria-hidden="true" />
                  {floor.note}
                </p>
                <a href="#picks" className="link-arrow">
                  See what&rsquo;s new on this floor <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
