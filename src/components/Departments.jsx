import { ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SmartImage from './ui/SmartImage.jsx'
import { departments } from '../data/departments.js'
import './Departments.css'

const FLOOR_LABEL = (n) => (n === 0 ? 'Ground floor' : `Floor ${n}`)

/* Maps a department to the "New In" category filter. */
const CATEGORY_OF = {
  sarees: 'Sarees',
  men: 'Menswear',
  kids: 'Kids',
  jewellery: 'Jewellery',
  home: 'Home',
  electronics: 'Electronics',
}

export default function Departments({ onBrowse }) {
  return (
    <section id="departments" className="section depts">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow">Departments</p>
            <h2 className="h2">
              Six floors. <em>One trip.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Start on the ground floor with jewellery and work your way up to the café on the fifth. Or jump straight
              to the department you came for.
            </p>
          </Reveal>
        </div>

        <ul className="depts__grid">
          {departments.map((dept, index) => (
            <Reveal as="li" key={dept.id} className={`dept dept--${dept.size}`} delay={(index % 3) * 0.08}>
              <button
                type="button"
                className="dept__card"
                onClick={() => onBrowse(CATEGORY_OF[dept.id] ?? 'All')}
                aria-label={`${dept.name}, ${FLOOR_LABEL(dept.floor)}. Browse new arrivals`}
              >
                <SmartImage
                  id={dept.image}
                  alt=""
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="dept__media"
                />
                <span className="dept__shade" aria-hidden="true" />
                <span className="dept__floor tag">{FLOOR_LABEL(dept.floor)}</span>
                <span className="dept__body">
                  <span className="dept__name h3">{dept.name}</span>
                  <span className="dept__blurb">{dept.blurb}</span>
                  <span className="dept__go">
                    Browse <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
