import { useEffect, useRef, useState } from 'react'

const WIDTHS = [480, 800, 1200, 1600, 2200]

/* Photography is served from Unsplash's image CDN (free to use under the Unsplash License). */
export function photoUrl(id, width, quality = 72) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/**
 * Responsive, lazy-loaded photograph with a soft fade once decoded.
 * `sizes` should describe the rendered width so the browser picks the smallest adequate file.
 */
export default function SmartImage({ id, alt, sizes = '100vw', priority = false, className = '', position }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <div className={`media ${className}`}>
      <img
        ref={ref}
        src={photoUrl(id, 1200)}
        srcSet={WIDTHS.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
        className={loaded ? 'is-loaded' : ''}
        style={position ? { objectPosition: position } : undefined}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
