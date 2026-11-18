import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './ui/Reveal.jsx'
import ProductCard from './ProductCard.jsx'
import { categories, products } from '../data/products.js'
import './Picks.css'

const EASE = [0.22, 1, 0.36, 1]

export default function Picks({ category, onCategory, onQuickView, onAdd }) {
  const list = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [category],
  )

  return (
    <section id="picks" className="section picks">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow">New in this week</p>
            <h2 className="h2">
              Fresh on the floor, <em>picked by our buyers.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              A small, changing edit from every department. Reserve online and collect in store, or add to your bag
              for home delivery.
            </p>
          </Reveal>
        </div>

        <div className="picks__filters" role="group" aria-label="Filter by department">
          {categories.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => onCategory(c)}>
              {c}
              {c !== 'All' && <span className="picks__count">{products.filter((p) => p.category === c).length}</span>}
            </button>
          ))}
        </div>

        <p className="picks__result" aria-live="polite">
          Showing {list.length} {list.length === 1 ? 'item' : 'items'}
          {category !== 'All' ? ` in ${category}` : ''}
        </p>

        <motion.ul className="picks__grid" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((product, index) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE, delay: Math.min(index * 0.04, 0.3) }}
              >
                <ProductCard product={product} onQuickView={onQuickView} onAdd={onAdd} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
