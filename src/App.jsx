import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Departments from './components/Departments.jsx'
import Picks from './components/Picks.jsx'
import Offers from './components/Offers.jsx'
import FloorGuide from './components/FloorGuide.jsx'
import Story from './components/Story.jsx'
import Services from './components/Services.jsx'
import Reviews from './components/Reviews.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'
import QuickView from './components/QuickView.jsx'
import Bag from './components/Bag.jsx'
import Toast from './components/Toast.jsx'
import useBag from './lib/useBag.js'
import { scrollToSection } from './lib/format.js'

export default function App() {
  const bag = useBag()
  const [category, setCategory] = useState('All')
  const [quick, setQuick] = useState(null)

  const browse = (next) => {
    setCategory(next)
    scrollToSection('picks')
  }

  const closeQuick = useCallback(() => setQuick(null), [])

  const addFromQuick = (product, variant) => {
    bag.add(product, variant)
    setQuick(null)
  }

  return (
    <MotionConfig reducedMotion="user">
      <a href="#departments" className="skip-link">
        Skip to departments
      </a>
      <Navbar bagCount={bag.count} onOpenBag={() => bag.setOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        <Departments onBrowse={browse} />
        <Picks category={category} onCategory={setCategory} onQuickView={setQuick} onAdd={bag.add} />
        <Offers />
        <FloorGuide />
        <Story />
        <Services />
        <Reviews />
        <Visit />
      </main>
      <Footer onBrowse={browse} />
      <QuickView product={quick} onClose={closeQuick} onAdd={addFromQuick} />
      <Bag bag={bag} />
      <Toast event={bag.lastAdded} onView={() => bag.setOpen(true)} />
    </MotionConfig>
  )
}
