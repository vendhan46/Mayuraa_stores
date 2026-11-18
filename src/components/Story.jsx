import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import Reveal from './ui/Reveal.jsx'
import SmartImage from './ui/SmartImage.jsx'
import { brand, photos, stats } from '../data/site.js'
import './Story.css'

function Counter({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setCurrent(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return <span ref={ref}>{current}</span>
}

/* The family story, with figures that count up as they enter the viewport. */
export default function Story() {
  return (
    <section id="story" className="section story">
      <div className="container story__inner">
        <div className="story__media">
          <Reveal className="story__main">
            <SmartImage id={photos.story} alt="A menswear floor with shirts and jackets on open shelves" sizes="(max-width: 980px) 100vw, 44vw" />
          </Reveal>
          <Reveal className="story__detail" delay={0.15}>
            <SmartImage id={photos.storyDetail} alt="An OPEN sign hanging in a shop window" sizes="220px" />
          </Reveal>
        </div>

        <div className="story__copy">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="h2">
              Started with one counter of sarees <em>in {brand.founded}.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead story__text">
              Mayura began as a 600 sq ft textile shop on Cross-Cut Road, run by a husband and wife who measured
              every yard themselves. Three generations later the family still walks the floors every morning, and
              the rule is unchanged: nobody leaves without being looked after.
            </p>
          </Reveal>

          <dl className="story__stats">
            {stats.map((stat, i) => (
              <Reveal as="div" key={stat.label} className="story__stat" delay={0.1 + i * 0.06}>
                <dd aria-label={`${stat.value}${stat.suffix}`}>
                  <Counter value={stat.value} />
                  <sup aria-hidden="true">{stat.suffix}</sup>
                </dd>
                <dt>{stat.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
