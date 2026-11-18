import { Star } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import { reviews } from '../data/site.js'
import './Reviews.css'

function Stars({ count }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={15} strokeWidth={1.6} fill={i < count ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </span>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow">Customer stories</p>
            <h2 className="h2">
              Families who&rsquo;ve shopped here <em>for three generations.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              <b>4.8</b> average across 2,300+ reviews. These three are typical of what people tell us at the billing counter.
            </p>
          </Reveal>
        </div>

        <ul className="reviews__grid">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.name} className="review" delay={i * 0.08}>
              <Stars count={r.rating} />
              <blockquote className="review__quote">{r.quote}</blockquote>
              <footer className="review__by">
                <span className="review__avatar" aria-hidden="true">
                  {r.name[0]}
                </span>
                <div>
                  <p className="review__name">{r.name}</p>
                  <p className="review__detail">{r.detail}</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
