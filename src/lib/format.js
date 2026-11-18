/* 2499 → "₹2,499" */
export function formatINR(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

export function discountPct(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100)
}

export function pad(n) {
  return String(n).padStart(2, '0')
}

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

export function whatsappLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
