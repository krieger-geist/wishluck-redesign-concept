import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CONCEPT_AUTHOR, CONCEPT_AUTHOR_LINK, COMPANY } from '../config'
import { useStore } from '../store'
import CartDrawer from './CartDrawer'
import Assistant from './Assistant'

const NAV = [
  { to: '/shop', label: 'Shop' },
  { to: '/gift-finder', label: 'Gift finder' },
  { to: '/help', label: 'Help and tracking' },
  { to: '/dashboard', label: 'Automation dashboard' },
  { to: '/changes', label: 'What I changed' },
]

export function DisclaimerBanner() {
  return (
    <div className="disclaimer" role="note" aria-label="Disclaimer">
      <strong>Unofficial redesign concept</strong> by{' '}
      {CONCEPT_AUTHOR_LINK ? <a href={CONCEPT_AUTHOR_LINK} rel="noopener noreferrer" target="_blank">{CONCEPT_AUTHOR}</a> : CONCEPT_AUTHOR}
      , not affiliated with or endorsed by {COMPANY}.<span className="hide-sm"> All products, prices and data are demo placeholders.</span>{' '}
      <Link to="/about">About this concept</Link>
    </div>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart, toast } = useStore()
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)
  const count = cart.reduce((s, l) => s + l.qty, 0)

  // Close menus and move focus to the page on route change, so keyboard and screen reader users land in the new content.
  useEffect(() => {
    setMenuOpen(false)
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) { el.scrollIntoView({ block: 'start' }); return }
    }
    window.scrollTo(0, 0)
    // On first load, leave focus at the top so the skip link is the first Tab stop.
    if (firstRender.current) { firstRender.current = false; return }
    mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname, location.hash])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="top-bar">
      <DisclaimerBanner />
      <header className="site-header">
        <div className="container header-row">
          <Link to="/" className="brand" aria-label={`${COMPANY} concept home`}>
            <span className="brand-mark" aria-hidden="true">✦</span>
            <span className="brand-text">{COMPANY}<small>support and shopping ideas</small></span>
          </Link>
          <nav aria-label="Main" className={`main-nav ${menuOpen ? 'open' : ''}`} id="main-nav">
            <ul>
              {NAV.map((n) => (
                <li key={n.to}><NavLink to={n.to}>{n.label}</NavLink></li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <button className="icon-btn help-btn" onClick={() => window.dispatchEvent(new Event('toggle-assistant'))} aria-label="Open or close quick help">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h16v11H9l-5 4z" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.4" /><circle cx="12" cy="14.6" r=".6" fill="currentColor" /></svg>
            </button>
            <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label={`Open demo cart, ${count} item${count === 1 ? '' : 's'}`}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>
              {count > 0 && <span className="badge" aria-hidden="true">{count}</span>}
            </button>
            <button className="icon-btn menu-btn" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((o) => !o)}>
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </header>
      </div>

      <main id="main" ref={mainRef} tabIndex={-1}>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="footer-title">About this page</p>
            <p>
              This is an unofficial, non-commercial redesign concept made by {CONCEPT_AUTHOR} as a portfolio piece.
              It is not the {COMPANY} website, is not affiliated with or endorsed by {COMPANY}, and does not sell anything.
              No form on this site sends data anywhere.
            </p>
          </div>
          <div>
            <p className="footer-title">Explore the concept</p>
            <ul className="plain">
              {NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
              <li><Link to="/about">About and credits</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-title">Credits</p>
            <p>Product visuals are original SVG drawings, not photos. Product names, prices, reviews and orders are invented placeholders.</p>
          </div>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Assistant />
      <div className="toast" role="status" aria-live="polite">{toast}</div>
    </>
  )
}
