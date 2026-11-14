import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { faqs, matchFaq, type FaqItem } from '../data/support'

interface Msg { from: 'bot' | 'me'; text: string; faq?: FaqItem; handoff?: boolean }

const STARTERS = ['track', 'replace', 'age', 'cod'].map((id) => faqs.find((f) => f.id === id)!)

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [misses, setMisses] = useState(0)
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hi! I answer common questions instantly. Try one below or type your own. (Demo: answers come from a fixed FAQ, nothing is sent anywhere.)' },
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

  function ask(text: string) {
    const clean = text.trim()
    if (!clean) return
    const hit = matchFaq(clean)
    const next: Msg[] = [{ from: 'me', text: clean }]
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
