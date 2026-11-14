import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ORDER_STEPS, demoOrders, faqs, matchFaq, type FaqItem } from '../data/support'

interface Msg { from: 'bot' | 'me'; text: string; faq?: FaqItem; handoff?: boolean }

const STARTERS = ['track', 'replace', 'age', 'cod'].map((id) => faqs.find((f) => f.id === id)!)

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [misses, setMisses] = useState(0)
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hi! Besides shopping help, I can track an order or start a replacement for you. Try one below or type your own. (Demo: answers come from a fixed FAQ, nothing is sent anywhere.)' },
  ])
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { logRef.current?.scrollTo(0, logRef.current.scrollHeight) }, [msgs])
  useEffect(() => { if (open) inputRef.current?.focus() }, [open])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onOpen = () => setOpen((o) => !o)
    window.addEventListener('keydown', onKey)
    window.addEventListener('toggle-assistant', onOpen)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('toggle-assistant', onOpen) }
  }, [])
  // Lets other parts of the page open the assistant with a question already asked (used by "Start here").
  useEffect(() => {
    const onAsk = (e: Event) => { setOpen(true); askRef.current((e as CustomEvent<string>).detail) }
    window.addEventListener('assistant-ask', onAsk)
    return () => window.removeEventListener('assistant-ask', onAsk)
  }, [])

  function ask(text: string) {
    const clean = text.trim()
    if (!clean) return
    const next: Msg[] = [{ from: 'me', text: clean }]
    // Order lookup right in the chat: "DEMO1001 1234" (order number plus last 4 phone digits).
    const orderId = clean.match(/\bDEMO\d{4}\b/i)?.[0].toUpperCase()
    if (orderId) {
      const last4 = clean.replace(/DEMO\d{4}/i, '').match(/\b\d{4}\b/)?.[0]
      const o = demoOrders.find((x) => x.id === orderId)
      let reply: string
      if (!o) reply = `I could not find ${orderId}. Demo orders are DEMO1001 to DEMO1004.`
      else if (!last4) reply = `Found ${orderId}. To keep it private, please send it again with the last 4 digits of your phone, like "${orderId} 0000". (Demo digits are listed on the Help page.)`
      else if (last4 !== o.phoneLast4) reply = 'Those phone digits do not match this order. Please check and try again.'
      else reply = o.step === 5
        ? `${o.item} was delivered ${o.deliveredDaysAgo} days ago in ${o.city}. ${(o.deliveredDaysAgo ?? 99) <= 7 ? 'If anything is wrong, you can still request a replacement.' : 'The 7-day replacement window has closed, but a person can still help.'}`
        : `${o.item} is ${ORDER_STEPS[o.step].toLowerCase()} and expected ${o.eta.toLowerCase()} in ${o.city}.`
      next.push({ from: 'bot', text: reply, faq: o && last4 === o.phoneLast4 && o.step === 5 ? faqs.find((f) => f.id === 'replace') : undefined })
      setMsgs((m) => [...m, ...next])
      setInput('')
      setMisses(0)
      return
    }
    const hit = matchFaq(clean)
    if (hit) {
      next.push({ from: 'bot', text: hit.a, faq: hit })
      setMisses(0)
    } else if (misses >= 1) {
      next.push({ from: 'bot', handoff: true, text: 'I could not find that one. I have written a summary of your question so a person can pick it up without asking you to repeat it:' })
    } else {
      next.push({ from: 'bot', text: 'I am not sure I understood. Could you try different words, like "where is my order" or "toy for a 3 year old"?' })
      setMisses((m) => m + 1)
    }
    setMsgs((m) => [...m, ...next])
    setInput('')
  }

  const askRef = useRef(ask)
  useEffect(() => { askRef.current = ask })

  const lastQuestion = [...msgs].reverse().find((m) => m.from === 'me')?.text ?? ''

  return (
    <div className="assistant">
      {open && (
        <section className="assistant-panel" aria-label="Help assistant (demo)">
          <div className="assistant-head">
            <p className="assistant-title">Quick help <span className="pill">demo</span></p>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close help assistant">✕</button>
          </div>
          <div className="assistant-log" ref={logRef} role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                <p>{m.text}</p>
                {m.faq?.action && <Link className="bubble-link" to={m.faq.action.to} onClick={() => setOpen(false)}>{m.faq.action.label} →</Link>}
                {m.handoff && (
                  <div className="ticket-preview">
                    <p><strong>Draft ticket (not sent)</strong></p>
                    <p>Question: "{lastQuestion}"</p>
                    <p>Auto tag: General enquiry. Priority: Normal. Page: {typeof window !== 'undefined' ? window.location.pathname : '/'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chips" aria-label="Suggested questions">
            {STARTERS.map((f) => (
              <button key={f.id} className="chip" onClick={() => ask(f.q)}>{f.q}</button>
            ))}
          </div>
          <form className="assistant-form" onSubmit={(e: FormEvent) => { e.preventDefault(); ask(input) }}>
            <label htmlFor="assistant-input" className="sr-only">Type your question</label>
            <input id="assistant-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question" autoComplete="off" />
            <button className="btn btn-primary" type="submit">Ask</button>
          </form>
        </section>
      )}
      <button className="assistant-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close help assistant' : 'Open help assistant'}>
        <span aria-hidden="true">{open ? '✕' : '💬'}</span>
        {!open && <span className="fab-label">Help</span>}
      </button>
    </div>
  )
}
