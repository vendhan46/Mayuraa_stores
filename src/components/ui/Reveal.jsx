import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/* Quiet fade-and-rise used for blocks as they enter the viewport. */
export default function Reveal({ as = 'div', delay = 0, y = 22, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
