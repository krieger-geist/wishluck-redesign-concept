// Original flat SVG drawings for the demo products. Drawn for this concept; no photos or third-party art.
const NAVY = '#1f2a6b'
const SUN = '#ffd166'
const CORAL = '#ef6f6c'
const TEAL = '#3bb3a6'
const SKY = '#5b8def'
const LILAC = '#a78bfa'
const GREEN = '#59b36b'
const WHITE = '#ffffff'

const shadow = <ellipse cx="60" cy="82" rx="34" ry="4" fill="#000" opacity=".08" />

const drawings: Record<string, React.ReactNode> = {
  'talking-word-book': (
    <>
      {shadow}
      <path d="M20 24 Q40 16 60 26 Q80 16 100 24 V72 Q80 64 60 74 Q40 64 20 72 Z" fill={SKY} />
      <path d="M24 26 Q42 20 58 29 V70 Q42 62 24 68 Z" fill={WHITE} />
      <path d="M62 29 Q78 20 96 26 V68 Q78 62 62 70 Z" fill={WHITE} />
      <circle cx="40" cy="44" r="8" fill={SUN} />
      <rect x="70" y="38" width="18" height="12" rx="3" fill={CORAL} />
      <path d="M104 34 q6 8 0 16 M110 30 q10 12 0 24" stroke={NAVY} strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  'phonics-tap-board': (
    <>
      {shadow}
      <rect x="18" y="16" width="84" height="62" rx="10" fill={TEAL} />
      {['A', 'B', 'C', 'D', 'E', 'F'].map((l, i) => (
        <g key={l} transform={`translate(${26 + (i % 3) * 24} ${24 + Math.floor(i / 3) * 26})`}>
          <rect width="20" height="20" rx="5" fill={[SUN, CORAL, WHITE][i % 3]} />
          <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="800" fill={NAVY} fontFamily="system-ui, sans-serif">{l}</text>
        </g>
      ))}
    </>
  ),
  'pretend-phone': (
    <>
      {shadow}
      <rect x="40" y="8" width="40" height="72" rx="9" fill={LILAC} />
      <rect x="45" y="15" width="30" height="22" rx="4" fill={WHITE} />
      <circle cx="60" cy="26" r="6" fill={SUN} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <circle key={i} cx={50 + (i % 3) * 10} cy={46 + Math.floor(i / 3) * 9} r="3.4" fill={[CORAL, SUN, TEAL][i % 3]} />
      ))}
    </>
  ),
  'stacking-rainbow': (
    <>
      {shadow}
      {[CORAL, SUN, GREEN, SKY, LILAC].map((c, i) => (
        <path key={c} d={`M${16 + i * 8} 78 A${44 - i * 8} ${44 - i * 8} 0 0 1 ${104 - i * 8} 78`} stroke={c} strokeWidth="8" fill="none" />
      ))}
    </>
  ),
  'sensory-rattle-set': (
    <>
      {shadow}
      <rect x="34" y="44" width="8" height="30" rx="4" fill={SUN} />
      <circle cx="38" cy="34" r="16" fill={CORAL} />
      <circle cx="38" cy="34" r="8" fill={WHITE} />
      <rect x="76" y="46" width="8" height="28" rx="4" fill={TEAL} />
      <rect x="66" y="22" width="28" height="26" rx="8" fill={NAVY} />
      <path d="M70 28 h20 M70 35 h20 M70 42 h20" stroke={WHITE} strokeWidth="3" />
    </>
  ),
  'touch-feel-book': (
    <>
      {shadow}
      <rect x="28" y="14" width="64" height="64" rx="8" fill={SUN} />
      <rect x="28" y="14" width="10" height="64" rx="4" fill="#e9b640" />
      <circle cx="66" cy="46" r="18" fill="#9aa3b8" />
      <circle cx="58" cy="42" r="3" fill={NAVY} />
      <path d="M78 52 q8 6 4 16" stroke="#9aa3b8" strokeWidth="6" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={56 + i * 5} cy={56} r="1.6" fill="#7b849a" />)}
    </>
  ),
  'duck-stair-track': (
    <>
      {shadow}
      <path d="M20 78 V62 H38 V48 H56 V34 H74 V20 H92" stroke={SKY} strokeWidth="7" fill="none" strokeLinejoin="round" />
      <path d="M92 20 Q110 50 70 78" stroke={TEAL} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="40" r="7" fill={SUN} />
      <ellipse cx="44" cy="48" rx="9" ry="6" fill={SUN} />
      <path d="M50 39 l6 2 -6 2z" fill={CORAL} />
      <circle cx="45" cy="38" r="1.4" fill={NAVY} />
    </>
  ),
  'shape-puzzle': (
    <>
      {shadow}
      <rect x="22" y="36" width="76" height="42" rx="8" fill={NAVY} />
      <rect x="22" y="30" width="76" height="12" rx="5" fill={SKY} />
      <circle cx="42" cy="22" r="10" fill={CORAL} />
      <rect x="54" y="12" width="18" height="18" rx="3" fill={SUN} />
      <path d="M84 12 l11 18 h-22z" fill={GREEN} />
      <circle cx="42" cy="58" r="7" fill="#11185a" />
      <rect x="54" y="51" width="13" height="13" fill="#11185a" />
      <path d="M84 50 l8 14 h-16z" fill="#11185a" />
    </>
  ),
  'learning-laptop': (
    <>
      {shadow}
      <rect x="28" y="14" width="64" height="42" rx="6" fill={CORAL} />
      <rect x="34" y="20" width="52" height="30" rx="3" fill={WHITE} />
      <text x="60" y="41" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY} fontFamily="system-ui, sans-serif">ABC</text>
      <path d="M18 60 H102 L96 76 H24 Z" fill={SUN} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={30 + i * 10} y="64" width="7" height="4" rx="1" fill={NAVY} opacity=".5" />)}
    </>
  ),
  'stem-circuit-kit': (
    <>
      {shadow}
      <rect x="16" y="56" width="88" height="22" rx="6" fill={NAVY} />
      <circle cx="60" cy="30" r="16" fill={SUN} />
      <rect x="54" y="44" width="12" height="10" rx="2" fill="#9aa3b8" />
      <path d="M54 30 l6 -6 6 6" stroke={CORAL} strokeWidth="2.5" fill="none" />
      <path d="M30 66 H48 M72 66 H90" stroke={GREEN} strokeWidth="4" strokeLinecap="round" />
      <circle cx="30" cy="66" r="4" fill={CORAL} />
      <circle cx="90" cy="66" r="4" fill={CORAL} />
      <path d="M86 18 l6 -6 M34 18 l-6 -6 M60 8 v-6" stroke={SUN} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  'magnetic-tiles': (
    <>
      {shadow}
      <path d="M60 14 L92 40 H28 Z" fill={CORAL} opacity=".85" />
      <rect x="32" y="40" width="26" height="36" fill={SKY} opacity=".85" />
      <rect x="62" y="40" width="26" height="36" fill={GREEN} opacity=".85" />
      <rect x="52" y="56" width="16" height="20" fill={SUN} />
      <path d="M32 40 H88 M58 40 V76" stroke={WHITE} strokeWidth="2" />
    </>
  ),
  'story-box-set': (
    <>
      {shadow}
      {[[CORAL, 64], [SKY, 54], [GREEN, 44], [LILAC, 34], [SUN, 24]].map(([c, y], i) => (
        <rect key={i} x={26 + (i % 2) * 4} y={y as number} width="64" height="10" rx="3" fill={c as string} />
      ))}
      <path d="M86 16 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill={SUN} />
    </>
  ),
  'pop-up-space': (
    <>
      {shadow}
      <circle cx="30" cy="22" r="2" fill={SUN} />
      <circle cx="94" cy="30" r="2.5" fill={SUN} />
      <circle cx="84" cy="12" r="1.8" fill={SUN} />
      <path d="M60 8 C76 20 76 44 70 60 H50 C44 44 44 20 60 8 Z" fill={WHITE} stroke={NAVY} strokeWidth="2.5" />
      <circle cx="60" cy="32" r="7" fill={SKY} stroke={NAVY} strokeWidth="2.5" />
      <path d="M50 50 L38 66 L50 62 Z M70 50 L82 66 L70 62 Z" fill={CORAL} />
      <path d="M54 62 Q60 82 66 62 Z" fill={SUN} />
    </>
  ),
  'number-abacus': (
    <>
      {shadow}
      <rect x="20" y="14" width="6" height="66" rx="3" fill="#b9814b" />
      <rect x="94" y="14" width="6" height="66" rx="3" fill="#b9814b" />
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <path d={`M26 ${24 + r * 12} H94`} stroke="#9aa3b8" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((b) => (
            <circle key={b} cx={34 + b * 9 + (r % 2) * 18} cy={24 + r * 12} r="4.5" fill={[CORAL, SUN, TEAL, SKY, LILAC][r]} />
          ))}
        </g>
      ))}
    </>
  ),
  'art-easel': (
    <>
      {shadow}
      <path d="M40 80 L58 10 M80 80 L62 10" stroke="#b9814b" strokeWidth="5" strokeLinecap="round" />
      <rect x="30" y="20" width="60" height="42" rx="4" fill={WHITE} stroke={NAVY} strokeWidth="2.5" />
      <circle cx="48" cy="38" r="8" fill={SUN} />
      <path d="M36 56 Q52 40 64 52 T86 48" stroke={SKY} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="32" r="5" fill={CORAL} />
    </>
  ),
  'strategy-board-game': (
    <>
      {shadow}
      <rect x="22" y="18" width="76" height="58" rx="6" fill={NAVY} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={28 + (i % 4) * 17} y={24 + Math.floor(i / 4) * 16} width="15" height="14" rx="2" fill={(i + Math.floor(i / 4)) % 2 ? '#2f3d8f' : WHITE} opacity=".9" />
      ))}
      <circle cx="44" cy="47" r="5" fill={CORAL} />
      <circle cx="78" cy="31" r="5" fill={SUN} />
      <circle cx="61" cy="63" r="5" fill={TEAL} />
    </>
  ),
}

export default function ProductArt({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 90" role="presentation" aria-hidden="true" focusable="false">
      {drawings[id] ?? <circle cx="60" cy="45" r="24" fill={SUN} />}
    </svg>
  )
}
