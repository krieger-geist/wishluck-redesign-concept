# Site audit notes (14 November 2026)

Raw notes from one visit to the public WishLuck website (wishluck.in), using a desktop browser and a 375 x 812 phone
viewport. Observations only; the live site may change. Numbers are what my browser measured on my connection.

## The business

- Online store for children's educational toys and books, focused on screen-free learning. Based in Noida.
- Runs on Shopify with GoKwik checkout. Main users: parents (often mothers of 0 to 6 year olds) and gift buyers.
- Information structure: Best Seller, All Products, Toys by Age (0-1, 1-3, 3-4, 4-5, 5-6, 6+), Gifting, New Arrivals,
  Bundles, Blog; footer has policies, order tracking and social links.

## What already works

- Shop by age, and "Toys or Books" as two clear paths.
- Product pages are detailed: modes, how to use, what is in the box, safety notes, FAQ.
- Clear promises: pan-India delivery, 7-day replacement, prepaid discount.

## Issues noticed

| Area | Observation |
| --- | --- |
| Order tracking | `/pages/order-tracking` says to enter tracking details, but no form appeared during my visit. |
| Replacements | 7-day replacement is promised, but I found no way to start a request on the site. |
| Age navigation | Home "Shop by Age" shows 4 bands (0-1, 3-4, 5-6, 6+); the menu has 6. "Toys By Age" menu item links to `#`. |
| Catalogue filters | Only availability and price. No filter for age, skill, type or occasion. |
| Gifting | One flat list; the same product appeared twice; page title mentions budgets that cannot be filtered. |
| Pricing | Main price plus a lower "online" price plus a separate prepaid banner discount. |
| Contact | Footer links to a WhatsApp channel (broadcast). No contact page, email or phone found in header or footer. |
| Sold out | "Out of stock" filter exists; no back-in-stock alert. |
| Performance | Home: about 467 requests, about 2.6 MB transferred, 168 script tags, about 12 third-party script hosts, load event about 8.6 s. |
| Accessibility | About 24 links or buttons without an accessible name; the only H1 on the home page is the logo text; continuously scrolling trust strip; an autoplay element. Skip link is present (good). |
| Mobile | Catalogue H1 takes about half the first screen; a floating button overlaps product card corners. |
| Consistency | "2 lakh+" parents in a public profile versus "3 lakh+" on a product page; one product page title calls a physical sound book a "PDF". |

## Automation opportunities (built as demos)

Self-serve tracking with proactive WhatsApp updates; replacement wizard with rule-based approval; FAQ assistant with
ticket handoff; COD confirmation before dispatch; back-in-stock alerts; abandoned-cart reminder; review request after
delivery; low-stock reorder flag; support inbox auto-tagging; review tone sorting; bulk enquiry routing.
