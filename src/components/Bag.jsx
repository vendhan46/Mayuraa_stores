import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import SmartImage from './ui/SmartImage.jsx'
import { formatINR } from '../lib/format.js'
import './Bag.css'

const EASE = [0.22, 1, 0.36, 1]
const FREE_DELIVERY_AT = 2999

/* Slide-over shopping bag with quantities, savings and a free-delivery meter. */
export default function Bag({ bag }) {
  const { lines, count, subtotal, savings, setQty, remove, clear, open, setOpen } = bag
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    document.body.classList.add('is-locked')
    closeRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
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
  }, [open, setOpen])

  const remaining = Math.max(0, FREE_DELIVERY_AT - subtotal)
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="bag__backdrop" onClick={() => setOpen(false)} />
          <motion.aside
            ref={panelRef}
            className="bag__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <header className="bag__head">
              <h2 id="bag-title" className="bag__title">
                <ShoppingBag size={20} strokeWidth={1.6} aria-hidden="true" />
                Your bag <span>({count})</span>
              </h2>
              <button ref={closeRef} type="button" className="bag__close" onClick={() => setOpen(false)} aria-label="Close bag">
                <X size={22} strokeWidth={1.6} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="bag__empty">
                <ShoppingBag size={40} strokeWidth={1.2} aria-hidden="true" />
                <p className="h3">Your bag is empty.</p>
                <p>Add a few things from this week&rsquo;s picks and they&rsquo;ll appear here.</p>
                <a href="#picks" className="btn btn--primary" onClick={() => setOpen(false)}>
                  Browse new arrivals <ArrowRight size={16} />
                </a>
              </div>
            ) : (
              <>
                <div className="bag__meter" aria-live="polite">
                  <p>
                    {remaining > 0 ? (
                      <>
                        Add <b>{formatINR(remaining)}</b> more for free home delivery.
                      </>
                    ) : (
                      <>
                        <b>You&rsquo;ve unlocked free home delivery.</b>
                      </>
                    )}
                  </p>
                  <div className="bag__bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                    <motion.i initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: EASE }} />
                  </div>
                </div>

                <ul className="bag__lines">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        className="line"
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <SmartImage id={line.product.image} alt="" sizes="88px" position={line.product.position} className="line__media" />
                        <div className="line__body">
                          <p className="line__name">{line.product.name}</p>
                          {(line.variant.option || line.variant.size) && (
                            <p className="line__variant">
                              {[line.variant.option, line.variant.size && `Size ${line.variant.size}`].filter(Boolean).join(' · ')}
                            </p>
                          )}
                          <p className="line__price">{formatINR(line.product.price * line.qty)}</p>
                          <div className="line__row">
                            <div className="qty" role="group" aria-label={`Quantity of ${line.product.name}`}>
                              <button type="button" onClick={() => setQty(line.key, line.qty - 1)} aria-label="Decrease quantity">
                                <Minus size={14} strokeWidth={2.2} />
                              </button>
                              <span aria-live="polite">{line.qty}</span>
                              <button type="button" onClick={() => setQty(line.key, line.qty + 1)} aria-label="Increase quantity">
                                <Plus size={14} strokeWidth={2.2} />
                              </button>
                            </div>
                            <button type="button" className="line__remove" onClick={() => remove(line.key)} aria-label={`Remove ${line.product.name}`}>
                              <Trash2 size={15} strokeWidth={1.8} aria-hidden="true" /> Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="bag__foot">
                  <dl className="bag__totals">
                    <div>
                      <dt>Subtotal</dt>
                      <dd>{formatINR(subtotal)}</dd>
                    </div>
                    {savings > 0 && (
                      <div className="bag__savings">
                        <dt>You save</dt>
                        <dd>{formatINR(savings)}</dd>
                      </div>
                    )}
                    <div>
                      <dt>Delivery</dt>
                      <dd>{remaining > 0 ? '₹149' : 'Free'}</dd>
                    </div>
                  </dl>
                  <button type="button" className="btn btn--marigold bag__checkout">
                    Proceed to checkout <ArrowRight size={16} />
                  </button>
                  <div className="bag__secondary">
                    <a href="#visit" className="link-arrow" onClick={() => setOpen(false)}>
                      Or reserve and collect in store
                    </a>
                    <button type="button" className="bag__clear" onClick={clear}>
                      Clear bag
                    </button>
                  </div>
                  <p className="bag__note">Demonstration bag. Checkout is not connected to a payment gateway.</p>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
