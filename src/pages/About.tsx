import { Link } from 'react-router-dom'
import { CONCEPT_AUTHOR, COMPANY } from '../config'
import { usePageTitle } from '../usePageTitle'

export default function About() {
  usePageTitle('About this concept')
  return (
    <section className="container section narrow-text">
      <h1 className="page-title">About this concept</h1>
      <p className="lead">
        This is an unofficial redesign concept made by {CONCEPT_AUTHOR} to explore how an online store for children's learning toys could
        be easier for parents and lighter on the team that runs it.
      </p>
      <h2 className="h3">What it is not</h2>
      <ul>
        <li>It is not the {COMPANY} website and is not affiliated with, endorsed by, or connected to {COMPANY}.</li>
        <li>It does not sell anything. There are no logins, no payments, and no form sends data anywhere.</li>
        <li>Products, prices, reviews, order IDs and dashboard numbers are invented placeholders.</li>
        <li>It does not use {COMPANY}'s logo, photos or website text.</li>
        <li>It asks search engines not to index it.</li>
      </ul>
      <h2 className="h3">What is stored</h2>
      <p>The demo cart and "notify me" choices are saved only in your own browser's local storage so they survive a refresh. Clearing site data removes them.</p>
      <h2 className="h3">Credits</h2>
      <ul>
        <li>Product visuals: system emoji and CSS shapes, no stock photos.</li>
        <li>Built with React, React Router, TypeScript and Vite (all MIT licensed).</li>
        <li>Font: your device's system font, so nothing is downloaded.</li>
      </ul>
      <p><Link to="/changes">Read what I changed and why →</Link></p>
    </section>
  )
}
