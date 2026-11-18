import { Eye, Plus } from 'lucide-react'
import SmartImage from './ui/SmartImage.jsx'
import { discountPct, formatINR } from '../lib/format.js'
import './ProductCard.css'

export default function ProductCard({ product, onQuickView, onAdd }) {
  const { name, category, price, mrp, badge, image, position, options, sizes } = product
  const off = discountPct(mrp, price)
  const needsChoice = Boolean(options || sizes)

  return (
    <article className="prod">
      <div className="prod__media-wrap">
        <button type="button" className="prod__media-btn" onClick={() => onQuickView(product)} aria-label={`Quick view: ${name}`}>
          <SmartImage id={image} alt={name} sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw" position={position} className="prod__media" />
        </button>
        {badge && <span className="tag tag--marigold prod__badge">{badge}</span>}
        {off > 0 && <span className="prod__off">-{off}%</span>}
        <div className="prod__hover">
          <button type="button" className="prod__quick" onClick={() => onQuickView(product)}>
            <Eye size={15} strokeWidth={1.8} aria-hidden="true" /> Quick view
          </button>
        </div>
      </div>

      <div className="prod__body">
        <p className="prod__cat">{category}</p>
        <h3 className="prod__name">
          <button type="button" onClick={() => onQuickView(product)}>
            {name}
          </button>
        </h3>
        <div className="prod__row">
          <p className="prod__price">
            <span>{formatINR(price)}</span>
            {mrp > price && <s aria-label={`MRP ${formatINR(mrp)}`}>{formatINR(mrp)}</s>}
          </p>
          <button
            type="button"
            className="prod__add"
            onClick={() => (needsChoice ? onQuickView(product) : onAdd(product))}
            aria-label={needsChoice ? `Choose options for ${name}` : `Add ${name} to bag`}
          >
            <Plus size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
