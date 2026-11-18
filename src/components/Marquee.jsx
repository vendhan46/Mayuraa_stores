import { departments } from '../data/departments.js'
import './Marquee.css'

/* A slow-moving strip of department names between the hero and the grid. */
export default function Marquee() {
  const items = [...departments.map((d) => d.name), 'Beauty & Fragrance', 'Footwear', 'MAYURA Café']
  const track = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <i />
          </span>
        ))}
      </div>
    </div>
  )
}
