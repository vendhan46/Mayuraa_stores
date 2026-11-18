import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import './Toast.css'

const EASE = [0.22, 1, 0.36, 1]

/* Brief "added to bag" confirmation, bottom-left. */
export default function Toast({ event, onView }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!event) return
    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), 3200)
    return () => window.clearTimeout(timer)
  }, [event])

  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {visible && event && (
          <motion.div
            key={event.at}
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="toast__icon">
              <Check size={16} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <p>
              <b>{event.product.name}</b> added to your bag.
            </p>
            <button
              type="button"
              onClick={() => {
                setVisible(false)
                onView()
              }}
            >
              View bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
