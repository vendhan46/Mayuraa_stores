import { useCallback, useMemo, useState } from 'react'

/*
  A tiny in-memory shopping bag for the demo.
  Nothing is persisted or sent anywhere.
*/
export default function useBag() {
  const [lines, setLines] = useState([])
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  const add = useCallback((product, variant = {}) => {
    const key = [product.id, variant.option, variant.size].filter(Boolean).join('|')
    setLines((prev) => {
      const found = prev.find((line) => line.key === key)
      if (found) return prev.map((line) => (line.key === key ? { ...line, qty: line.qty + 1 } : line))
      return [...prev, { key, product, variant, qty: 1 }]
    })
    setLastAdded({ product, at: Date.now() })
  }, [])

  const setQty = useCallback((key, qty) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))))
  }, [])

  const remove = useCallback((key) => setLines((prev) => prev.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines])
  const subtotal = useMemo(() => lines.reduce((n, l) => n + l.qty * l.product.price, 0), [lines])
  const savings = useMemo(() => lines.reduce((n, l) => n + l.qty * (l.product.mrp - l.product.price), 0), [lines])

  return { lines, count, subtotal, savings, add, setQty, remove, clear, open, setOpen, lastAdded }
}
