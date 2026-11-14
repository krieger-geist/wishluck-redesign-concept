// All products below are invented sample data for the concept.
// Names, prices, ratings and stock are placeholders, not WishLuck's real catalogue.

export type Skill = 'Language' | 'Motor skills' | 'Logic' | 'Creativity' | 'Sensory' | 'STEM' | 'Numbers'
export type Occasion = 'Birthday' | 'Festival' | 'New baby' | 'School reward' | 'Everyday'

export interface Product {
  id: string
  name: string
  category: 'Toys' | 'Books'
  type: string
  minAge: number // years
  maxAge: number // years
  skills: Skill[]
  occasions: Occasion[]
  price: number // rupees
  mrp: number
  rating: number
  reviews: number
  stock: number
  emoji: string
  tint: string // card background tint
  blurb: string
  highlights: string[]
  inBox: string[]
  addedDaysAgo: number
}

export const AGE_BANDS = [
  { id: '0-1', label: '0 to 1 years', short: '0-1', min: 0, max: 1, note: 'Senses and first grasps' },
  { id: '1-3', label: '1 to 3 years', short: '1-3', min: 1, max: 3, note: 'Words, stacking, cause and effect' },
  { id: '3-4', label: '3 to 4 years', short: '3-4', min: 3, max: 4, note: 'Curiosity and fine motor' },
  { id: '4-5', label: '4 to 5 years', short: '4-5', min: 4, max: 5, note: 'Phonics and early numbers' },
  { id: '5-6', label: '5 to 6 years', short: '5-6', min: 5, max: 6, note: 'Logic and creativity' },
  { id: '6+', label: '6 years and up', short: '6+', min: 6, max: 12, note: 'STEM and strategy' },
] as const

export const SKILLS: Skill[] = ['Language', 'Motor skills', 'Logic', 'Creativity', 'Sensory', 'STEM', 'Numbers']
export const OCCASIONS: Occasion[] = ['Birthday', 'Festival', 'New baby', 'School reward', 'Everyday']

export const products: Product[] = [
  {
    id: 'talking-word-book', name: 'Talking Picture Word Book', category: 'Books', type: 'Sound book',
    minAge: 2, maxAge: 5, skills: ['Language'], occasions: ['Birthday', 'Everyday', 'Festival'],
    price: 1299, mrp: 1899, rating: 4.6, reviews: 412, stock: 38, emoji: '📖', tint: '#e7f0ff',
    blurb: 'Tap a picture and hear the word spoken clearly. Builds everyday vocabulary without a screen.',
    highlights: ['Hundreds of everyday words in themed spreads', 'Learn, find and quiz modes', 'Chunky board pages for small hands'],
    inBox: ['1 sound book', 'Batteries (pre-installed)', 'Parent guide card'], addedDaysAgo: 120,
  },
  {
    id: 'phonics-tap-board', name: 'Tap and Learn Phonics Board', category: 'Toys', type: 'Sound toy',
    minAge: 3, maxAge: 6, skills: ['Language'], occasions: ['Birthday', 'School reward'],
    price: 999, mrp: 1499, rating: 4.5, reviews: 268, stock: 4, emoji: '🔤', tint: '#fff1d6',
    blurb: 'Letter sounds, blending and simple words, with a gentle voice that repeats as often as needed.',
    highlights: ['Letter sounds and blends', 'Volume control and auto off', 'Wipe-clean surface'],
    inBox: ['1 phonics board', 'USB-C cable'], addedDaysAgo: 30,
  },
  {
    id: 'pretend-phone', name: 'Pretend Play Learning Phone', category: 'Toys', type: 'Pretend play',
    minAge: 1, maxAge: 4, skills: ['Language', 'Numbers'], occasions: ['Birthday', 'Everyday'],
    price: 549, mrp: 999, rating: 4.3, reviews: 905, stock: 120, emoji: '📱', tint: '#ffe4ec',
    blurb: 'A toy phone that teaches numbers, animal sounds and songs, so the real phone can stay put.',
    highlights: ['Numbers, animals and songs', 'Soft-touch buttons', 'No app or Wi-Fi'],
    inBox: ['1 toy phone', 'Batteries'], addedDaysAgo: 300,
  },
  {
    id: 'stacking-rainbow', name: 'Wooden Rainbow Stacker', category: 'Toys', type: 'Wooden',
    minAge: 1, maxAge: 3, skills: ['Motor skills', 'Creativity'], occasions: ['New baby', 'Birthday'],
    price: 799, mrp: 1199, rating: 4.7, reviews: 188, stock: 25, emoji: '🌈', tint: '#e8f7ee',
    blurb: 'Seven arcs of smooth wood to stack, balance and build into tunnels, bridges and stories.',
    highlights: ['Rounded edges', 'Water-based paint', 'Open-ended play for years'],
    inBox: ['7 wooden arcs', 'Cotton storage bag'], addedDaysAgo: 200,
  },
  {
    id: 'sensory-rattle-set', name: 'First Senses Rattle Set', category: 'Toys', type: 'Sensory',
    minAge: 0, maxAge: 1, skills: ['Sensory', 'Motor skills'], occasions: ['New baby'],
    price: 649, mrp: 999, rating: 4.6, reviews: 143, stock: 0, emoji: '🪇', tint: '#f3e8ff',
    blurb: 'Four textured rattles with soft sounds and high-contrast patterns for the first months.',
    highlights: ['High-contrast patterns', 'Easy-grip shapes', 'Food-grade silicone'],
    inBox: ['4 rattles', 'Mesh wash bag'], addedDaysAgo: 90,
  },
  {
    id: 'touch-feel-book', name: 'Touch and Feel Animal Book', category: 'Books', type: 'Board book',
    minAge: 0, maxAge: 2, skills: ['Sensory', 'Language'], occasions: ['New baby', 'Everyday'],
    price: 399, mrp: 599, rating: 4.4, reviews: 321, stock: 60, emoji: '🐘', tint: '#fff4e0',
    blurb: 'Fuzzy, bumpy and smooth patches on every page, with one simple word to say together.',
    highlights: ['Textures on every page', 'Tear-resistant board', 'Read-aloud prompts for parents'],
    inBox: ['1 board book'], addedDaysAgo: 400,
  },
  {
    id: 'duck-stair-track', name: 'Musical Duck Stair Track', category: 'Toys', type: 'Cause and effect',
    minAge: 2, maxAge: 5, skills: ['Sensory', 'Logic'], occasions: ['Birthday', 'Festival'],
    price: 599, mrp: 1099, rating: 4.2, reviews: 512, stock: 18, emoji: '🦆', tint: '#fffbd6',
    blurb: 'Little ducks climb the stairs and slide down the track to music. Great for counting along.',
    highlights: ['Music on and off switch', 'Counting game for parents', 'Sturdy base'],
    inBox: ['1 track set', '3 ducks'], addedDaysAgo: 60,
  },
  {
    id: 'shape-puzzle', name: 'Shape Sorter Puzzle Box', category: 'Toys', type: 'Puzzle',
    minAge: 1, maxAge: 3, skills: ['Logic', 'Motor skills'], occasions: ['Birthday', 'Everyday'],
    price: 699, mrp: 999, rating: 4.5, reviews: 233, stock: 42, emoji: '🔷', tint: '#e3f6fb',
    blurb: 'Twelve chunky shapes, one box, lots of "it fits!" moments. Teaches shapes and colours.',
    highlights: ['12 shapes in 6 colours', 'Lid opens for easy tidy-up', 'Solid wood'],
    inBox: ['1 sorter box', '12 shapes'], addedDaysAgo: 150,
  },
  {
    id: 'learning-laptop', name: 'Kids Learning Laptop', category: 'Toys', type: 'Sound toy',
    minAge: 3, maxAge: 7, skills: ['Language', 'Numbers', 'Logic'], occasions: ['Birthday', 'School reward', 'Festival'],
    price: 1399, mrp: 1999, rating: 4.4, reviews: 377, stock: 9, emoji: '💻', tint: '#e7f0ff',
    blurb: 'Letters, numbers, spelling and logic games on a keyboard that feels like a grown-up one.',
    highlights: ['Activities across letters, numbers and logic', 'Headphone jack', 'Progress levels'],
    inBox: ['1 learning laptop', 'Batteries', 'Activity guide'], addedDaysAgo: 220,
  },
  {
    id: 'stem-circuit-kit', name: 'Snap Circuit Starter Kit', category: 'Toys', type: 'STEM',
    minAge: 6, maxAge: 12, skills: ['STEM', 'Logic'], occasions: ['Birthday', 'School reward'],
    price: 1599, mrp: 2299, rating: 4.7, reviews: 96, stock: 14, emoji: '🔌', tint: '#e9f5e9',
    blurb: 'Snap parts together to light a bulb, spin a fan and ring a buzzer. Real circuits, no soldering.',
    highlights: ['Dozens of guided projects', 'Low-voltage parts', 'Picture instructions'],
    inBox: ['Snap parts kit', 'Project booklet', 'Storage tray'], addedDaysAgo: 20,
  },
  {
    id: 'magnetic-tiles', name: 'Magnetic Building Tiles (60 pcs)', category: 'Toys', type: 'Building',
    minAge: 3, maxAge: 8, skills: ['STEM', 'Creativity', 'Logic'], occasions: ['Birthday', 'Festival'],
    price: 1899, mrp: 2799, rating: 4.8, reviews: 154, stock: 22, emoji: '🧲', tint: '#fdeaea',
    blurb: 'Clear coloured tiles that click together into towers, houses and rockets.',
    highlights: ['Strong, fully enclosed magnets', 'Rounded corners', 'Idea cards included'],
    inBox: ['60 tiles', 'Idea cards', 'Storage box'], addedDaysAgo: 45,
  },
  {
    id: 'story-box-set', name: 'Bedtime Story Box (10 books)', category: 'Books', type: 'Story books',
    minAge: 3, maxAge: 6, skills: ['Language', 'Creativity'], occasions: ['Festival', 'Everyday', 'School reward'],
    price: 899, mrp: 1499, rating: 4.5, reviews: 289, stock: 33, emoji: '📚', tint: '#f3e8ff',
    blurb: 'Ten short illustrated stories about sharing, courage and kindness. One for every night.',
    highlights: ['Short stories for bedtime', 'Big clear text', 'Talk-about questions at the end'],
    inBox: ['10 paperback books', 'Gift box'], addedDaysAgo: 75,
  },
  {
    id: 'pop-up-space', name: 'Pop-Up Space Adventure', category: 'Books', type: 'Pop-up book',
    minAge: 4, maxAge: 8, skills: ['STEM', 'Language'], occasions: ['Birthday', 'School reward'],
    price: 749, mrp: 1099, rating: 4.6, reviews: 118, stock: 27, emoji: '🚀', tint: '#e3eaff',
    blurb: 'Planets, rockets and moons that rise off the page, with simple facts to read together.',
    highlights: ['Pop-up scenes', 'Simple space facts', 'Lift-the-flap quiz'],
    inBox: ['1 hardcover pop-up book'], addedDaysAgo: 15,
  },
  {
    id: 'number-abacus', name: 'Counting Bead Abacus', category: 'Toys', type: 'Wooden',
    minAge: 3, maxAge: 6, skills: ['Numbers', 'Motor skills'], occasions: ['School reward', 'Everyday'],
    price: 499, mrp: 799, rating: 4.3, reviews: 207, stock: 51, emoji: '🧮', tint: '#fff1d6',
    blurb: 'Ten rows of bright beads for counting, adding and spotting patterns.',
    highlights: ['100 beads in 10 colours', 'Wooden frame', 'Counting activity sheet'],
    inBox: ['1 abacus', 'Activity sheet'], addedDaysAgo: 260,
  },
  {
    id: 'art-easel', name: 'Two-Sided Art Easel', category: 'Toys', type: 'Arts and crafts',
    minAge: 3, maxAge: 8, skills: ['Creativity', 'Motor skills'], occasions: ['Birthday', 'Festival'],
    price: 2199, mrp: 2999, rating: 4.6, reviews: 74, stock: 6, emoji: '🎨', tint: '#e8f7ee',
    blurb: 'Chalkboard on one side, whiteboard on the other, paper roll on top. Folds flat.',
    highlights: ['Adjustable height', 'Paper roll holder', 'Folds flat for storage'],
    inBox: ['1 easel', 'Chalk and markers', 'Paper roll'], addedDaysAgo: 10,
  },
  {
    id: 'strategy-board-game', name: 'Junior Strategy Board Game', category: 'Toys', type: 'Board game',
    minAge: 6, maxAge: 12, skills: ['Logic', 'Numbers'], occasions: ['Festival', 'Birthday'],
    price: 849, mrp: 1199, rating: 4.4, reviews: 88, stock: 19, emoji: '♟️', tint: '#e3f6fb',
    blurb: 'A family game of planning ahead, with short rounds that keep younger players in the game.',
    highlights: ['2 to 4 players', '20 minute rounds', 'Easy and advanced rules'],
    inBox: ['Game board', 'Pieces', 'Rule book'], addedDaysAgo: 35,
  },
]

export const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN')
export const discountPct = (p: Product) => Math.round((1 - p.price / p.mrp) * 100)
export const ageLabel = (p: Product) => (p.maxAge >= 12 ? `${p.minAge}+ years` : `${p.minAge} to ${p.maxAge} years`)
export const findProduct = (id: string) => products.find((p) => p.id === id)
export const fitsAge = (p: Product, min: number, max: number) => p.minAge <= max && p.maxAge >= min
