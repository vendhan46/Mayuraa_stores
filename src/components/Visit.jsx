import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Car, Check, Clock, MapPin, Phone } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SmartImage from './ui/SmartImage.jsx'
import { WhatsAppIcon } from './ui/Logo.jsx'
import { contact, photos, stores } from '../data/site.js'
import { whatsappLink } from '../lib/format.js'
import './Visit.css'

const EMPTY = { name: '', phone: '', store: stores[0].id, interest: 'Join MAYURA Circle' }
const INTERESTS = ['Join MAYURA Circle', 'Book a saree viewing', 'Gift registry', 'Bulk or corporate order', 'Something else']

const validators = {
  name: (v) => (v.trim().length < 2 ? 'Please tell us your name.' : ''),
  phone: (v) => {
    const digits = v.replace(/\D/g, '')
    return digits.length >= 10 && digits.length <= 13 ? '' : 'Enter a phone number with at least 10 digits.'
  },
}

/* Store locations with a short sign-up form. */
export default function Visit() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  const bind = (name) => ({
    id: `visit-${name}`,
    name,
    value: values[name],
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `visit-${name}-error` : undefined,
    onChange: (event) => {
      const value = event.target.value
      setValues((prev) => ({ ...prev, [name]: value }))
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validators[name]?.(value) ?? '' }))
    },
    onBlur: (event) => {
      if (!validators[name]) return
      setErrors((prev) => ({ ...prev, [name]: validators[name](event.target.value) }))
    },
  })

  const submit = (event) => {
    event.preventDefault()
    const found = {}
    for (const key of Object.keys(validators)) {
      const message = validators[key](values[key])
      if (message) found[key] = message
    }
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector(`#visit-${first}`)?.focus()
      return
    }
    /* Front-end demo: simulate a network round-trip. Nothing is sent or stored. */
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 1000)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const chosenStore = stores.find((s) => s.id === values.store)
  const firstName = values.name.trim().split(/\s+/)[0]

  return (
    <section id="visit" className="section visit">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow">Visit us</p>
            <h2 className="h2">
              Three stores, <em>one city.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              {contact.hours}. Call ahead and we&rsquo;ll keep a saree viewing seat or a parking slot for you.
            </p>
          </Reveal>
        </div>

        <div className="visit__grid">
          <ul className="visit__stores">
            {stores.map((s, i) => (
              <Reveal as="li" key={s.id} className="store" delay={i * 0.07}>
                <div className="store__head">
                  <h3 className="h3">{s.name}</h3>
                  <span className="tag">{s.tag}</span>
                </div>
                <ul className="store__facts">
                  <li>
                    <MapPin size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>
                      {s.address[0]}
                      <br />
                      {s.address[1]}
                    </span>
                  </li>
                  <li>
                    <Clock size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>{s.hours}</span>
                  </li>
                  <li>
                    <Car size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>{s.parking}</span>
                  </li>
                  <li>
                    <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
                    <a href={`tel:${s.phone.replace(/\s/g, '')}`}>{s.phone}</a>
                  </li>
                </ul>
                <a href="#visit" className="link-arrow store__map" onClick={(e) => e.preventDefault()}>
                  Get directions (demo) <ArrowRight size={14} aria-hidden="true" />
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal className="visit__panel" delay={0.1}>
            <SmartImage id={photos.visit} alt="" sizes="(max-width: 980px) 100vw, 40vw" className="visit__photo" />
            <div className="visit__form-wrap">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  ref={successRef}
                  tabIndex={-1}
                  className="visit__success"
                  role="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="visit__check">
                    <Check size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="h3">Thank you{firstName ? `, ${firstName}` : ''}.</h3>
                  <p>
                    We&rsquo;ve noted <strong>{values.interest.toLowerCase()}</strong> at our {chosenStore?.name} store. Someone
                    from the floor would normally call you back within the day.
                  </p>
                  <p className="visit__demo">This is a demonstration form. Nothing was sent or stored.</p>
                  <button type="button" className="btn btn--outline btn--sm" onClick={reset}>
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} className="visit__form" onSubmit={submit} noValidate>
                  <p className="visit__form-title">Tell us how we can help</p>

                  <div className={`field ${errors.name ? 'field--error' : ''}`}>
                    <label htmlFor="visit-name">Your name</label>
                    <input type="text" autoComplete="name" placeholder="Full name" required {...bind('name')} />
                    {errors.name && (
                      <p id="visit-name-error" className="field__error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={`field ${errors.phone ? 'field--error' : ''}`}>
                    <label htmlFor="visit-phone">Phone number</label>
                    <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required {...bind('phone')} />
                    {errors.phone && (
                      <p id="visit-phone-error" className="field__error" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="visit-store">Nearest store</label>
                    <div className="field__select">
                      <select {...bind('store')}>
                        {stores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="visit-interest">I&rsquo;d like to</label>
                    <div className="field__select">
                      <select {...bind('interest')}>
                        {INTERESTS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="visit__actions">
                    <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send request'}
                      {status !== 'sending' && <ArrowRight size={16} />}
                    </button>
                    <a
                      className="btn btn--outline"
                      href={whatsappLink(contact.whatsappNumber, contact.whatsappMessage)}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <WhatsAppIcon size={18} /> WhatsApp us
                    </a>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
