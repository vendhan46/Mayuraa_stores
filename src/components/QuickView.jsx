import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ShoppingBag, Store, X } from 'lucide-react'
import SmartImage from './ui/SmartImage.jsx'
import { discountPct, formatINR } from '../lib/format.js'
import './QuickView.css'

const EASE = [0.22, 1, 0.36, 1]

/* Product quick view: a centred dialog with option and size choices. */
export default function QuickView({ product, onClose, onAdd }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const [option, setOption] = useState(null)
  const [size, setSize] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!product) return
    setOption(product.options?.[0] ?? null)
    setSize(null)
    setError('')
    const previouslyFocused = document.activeElement
    document.body.classList.add('is-locked')
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll('button:not([disabled]), a[href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
      previouslyFocused?.focus?.()
    }
  }, [product, onClose])

  const submit = () => {
    if (product.sizes && !size) {
      setError('Please choose a size.')
      return
    }
    onAdd(product, { option, size })
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="qv"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="qv__backdrop" onClick={onClose} />
          <motion.div
            ref={panelRef}
            className="qv__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qv-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button ref={closeRef} type="button" className="qv__close" onClick={onClose} aria-label="Close quick view">
              <X size={22} strokeWidth={1.6} />
            </button>

            <SmartImage
              id={product.image}
              alt={product.name}
              sizes="(max-width: 760px) 100vw, 440px"
              position={product.position}
              className="qv__media"
              priority
            />

            <div className="qv__body">
              <p className="eyebrow">{product.category}</p>
              <h2 id="qv-title" className="h3 qv__title">
                {product.name}
              </h2>
              <p className="qv__price">
                <span>{formatINR(product.price)}</span>
                {product.mrp > product.price && (
                  <>
                    <s>{formatINR(product.mrp)}</s>
                    <em>{discountPct(product.mrp, product.price)}% off</em>
                  </>
                )}
              </p>
              <p className="qv__summary">{product.summary}</p>

              {product.options && (
                <fieldset className="qv__choice">
                  <legend>
                    Colour: <b>{option}</b>
                  </legend>
                  <div className="qv__chips">
                    {product.options.map((o) => (
                      <button key={o} type="button" className="chip" aria-pressed={option === o} onClick={() => setOption(o)}>
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {product.sizes && (
                <fieldset className={`qv__choice ${error ? 'qv__choice--error' : ''}`}>
                  <legend>
                    Size{size ? ': ' : ''}
                    <b>{size}</b>
                  </legend>
                  <div className="qv__chips qv__chips--sizes">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="chip"
                        aria-pressed={size === s}
                        onClick={() => {
                          setSize(s)
                          setError('')
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {error && (
                    <p className="qv__error" role="alert">
                      {error}
                    </p>
                  )}
                </fieldset>
              )}

              <ul className="qv__details">
                {product.details.map((d) => (
                  <li key={d}>
                    <Check size={14} strokeWidth={2.2} aria-hidden="true" /> {d}
                  </li>
                ))}
              </ul>

              <div className="qv__actions">
                <button type="button" className="btn btn--primary" onClick={submit}>
                  <ShoppingBag size={16} /> Add to bag
                </button>
                <a href="#visit" className="btn btn--outline" onClick={onClose}>
                  <Store size={16} /> Reserve in store
                </a>
              </div>
              <p className="qv__note">Demonstration product. Details and pricing are illustrative only.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
