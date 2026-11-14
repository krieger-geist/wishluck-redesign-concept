import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { OCCASIONS, SKILLS, products, type Occasion, type Product, type Skill } from '../data/products'
import { usePageTitle } from '../usePageTitle'

const AGES = [
  { label: 'Under 1', v: 0.5 }, { label: '1 year', v: 1 }, { label: '2 years', v: 2 }, { label: '3 years', v: 3 },
  { label: '4 years', v: 4 }, { label: '5 years', v: 5 }, { label: '6 years', v: 6 }, { label: '7 to 9', v: 8 }, { label: '10+', v: 10 },
]
const BUDGETS = [{ label: 'Up to ₹500', v: 500 }, { label: 'Up to ₹1,000', v: 1000 }, { label: 'Up to ₹2,000', v: 2000 }, { label: 'Any budget', v: 99999 }]

interface Scored { p: Product; score: number; why: string[] }

function recommend(age: number, occasion: Occasion | '', budget: number, interest: Skill | ''): Scored[] {
  return products
    .filter((p) => p.minAge <= age && p.maxAge >= Math.floor(age) && p.price <= budget)
    .map((p) => {
      let score = p.rating * 2 + Math.log10(p.reviews + 1)
      const why: string[] = ['Right for the age']
      if (occasion && p.occasions.includes(occasion)) { score += 3; why.push(`Popular for ${occasion.toLowerCase()}`) }
      if (interest && p.skills.includes(interest)) { score += 4; why.push(`Builds ${interest.toLowerCase()}`) }
      if (p.stock === 0) score -= 5
      if (p.price <= budget * 0.6) why.push('Leaves room in the budget')
      return { p, score, why }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
}

export default function GiftFinder() {
  usePageTitle('Gift finder')
  const [params] = useSearchParams()
  const initialOcc = (OCCASIONS as string[]).includes(params.get('occasion') ?? '') ? (params.get('occasion') as Occasion) : ''
  const [step, setStep] = useState(0)
  const [age, setAge] = useState<number | null>(null)
  const [occasion, setOccasion] = useState<Occasion | ''>(initialOcc)
  const [budget, setBudget] = useState<number | null>(null)
  const [interest, setInterest] = useState<Skill | ''>('')
  const [message, setMessage] = useState('')

  const results = age !== null && budget !== null ? recommend(age, occasion, budget, interest) : []
  const steps = ['Age', 'Occasion', 'Budget', 'Interest']

  return (
    <section className="container section narrow-wide">
      <h1 className="page-title">Gift finder</h1>
      <p className="muted">Four quick taps, then a short list of toys that fit. Replaces scrolling through every product to guess what suits a child you may not know well.</p>

      <ol className="stepper" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? 'current' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
            <span className="step-num">{i < step ? '✓' : i + 1}</span> {s}
          </li>
        ))}
      </ol>

      {step < 4 && (
        <div className="card quiz-card">
          {step === 0 && (
            <fieldset>
              <legend className="quiz-q">How old is the child?</legend>
              <div className="choice-grid">
                {AGES.map((a) => (
                  <button type="button" key={a.label} className={`choice ${age === a.v ? 'selected' : ''}`} aria-pressed={age === a.v} onClick={() => { setAge(a.v); setStep(1) }}>{a.label}</button>
                ))}
              </div>
            </fieldset>
          )}
          {step === 1 && (
            <fieldset>
              <legend className="quiz-q">What is the occasion?</legend>
              <div className="choice-grid">
                {OCCASIONS.map((o) => (
                  <button type="button" key={o} className={`choice ${occasion === o ? 'selected' : ''}`} aria-pressed={occasion === o} onClick={() => { setOccasion(o); setStep(2) }}>{o}</button>
                ))}
              </div>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <legend className="quiz-q">What budget do you have in mind?</legend>
              <div className="choice-grid">
                {BUDGETS.map((b) => (
                  <button type="button" key={b.label} className={`choice ${budget === b.v ? 'selected' : ''}`} aria-pressed={budget === b.v} onClick={() => { setBudget(b.v); setStep(3) }}>{b.label}</button>
                ))}
              </div>
            </fieldset>
          )}
          {step === 3 && (
            <fieldset>
              <legend className="quiz-q">Anything they enjoy? (optional)</legend>
              <div className="choice-grid">
                {SKILLS.map((s) => (
                  <button type="button" key={s} className={`choice ${interest === s ? 'selected' : ''}`} aria-pressed={interest === s} onClick={() => { setInterest(s); setStep(4) }}>{s}</button>
                ))}
                <button type="button" className="choice" onClick={() => { setInterest(''); setStep(4) }}>Not sure, surprise me</button>
              </div>
            </fieldset>
          )}
          <div className="quiz-nav">
            {step > 0 && <button className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="stack">
          <div className="results-bar">
            <p role="status"><strong>{results.length}</strong> suggestions</p>
            <button className="btn btn-outline" onClick={() => { setStep(0); setAge(null); setBudget(null); setInterest('') }}>Start again</button>
          </div>
          {results.length === 0 ? (
            <div className="empty"><p>Nothing fits that budget and age in the demo catalogue. Try a higher budget.</p><button className="btn btn-outline" onClick={() => setStep(2)}>Change budget</button></div>
          ) : (
            <div className="product-grid">{results.map((r) => <ProductCard key={r.p.id} p={r.p} reason={r.why.join(' · ')} />)}</div>
          )}
          <div className="card stack">
            <h2 className="h3">Add a gift note (demo)</h2>
            <label htmlFor="gift-msg">Message for the card</label>
            <textarea id="gift-msg" rows={3} maxLength={160} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Happy birthday, Aarav! Love, Meera aunty" aria-describedby="gift-count" />
            <p id="gift-count" className="hint">{160 - message.length} characters left. In a live version, the note prints on the card and the invoice hides the price.</p>
          </div>
        </div>
      )}
    </section>
  )
}
