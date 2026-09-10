# 2026-08-29 — Website Rebrand: Funnel-First / Operator Positioning

## Decision (user approved)
Option B: Funnel-First / Productized Offer. All 3 tiers with prices shown on /services. Portfolio section rebuilt as proof/gallery inside services. Home rebuilt as a landing page, not a site homepage.

## Design

### 1. Home Page — Full landing rebuild (6 sections)
- Hero: "Get more clients from content without burning out" / "I help coaches, authors, and founders turn content into clients through YouTube and LinkedIn. Strategy, production, and growth, handled."
- CTA 1: "Book a 20-min strategy call" (primary) / "Try a free tool" (secondary)
- Trust bar: clients logos (Victor Chan, Harjeet Dhillon, Dr. Maurice Maurer, Blake Reddy)
- What I run for you: 3 cards (Content Engine, LinkedIn Funnel System, Production Pod)
- Proof: 3 hero case studies inline (+38% signup rate, 1,200+ listens, 6 hrs/wk saved)
- Free tools block: "Try before you buy" — 3 tool cards linking out
- How it works: 3 steps (Strategy call → We build and run it → You grow) — icon-driven
- Final CTA: Book a call

No AI mention in the hero. No "AI augmented" phrase anywhere on the home page. AI is a supporting mechanism, not the headline.

### 2. Services — 3 productized tiers with prices visible
- **LinkedIn Funnel System: $800/mo** (featured, promoted hard — this is the funnel offer)
- **Content Engine: $1,500/mo** (YouTube + LinkedIn full operation)
- **Production Pod: $600/mo** (for clients who already have editors; AI production workflow)
Each card: who it's for (2-3 lines), what's included (bullet list of deliverables), sample deliverable (example), and a CTA ("Start this" links to contact).
FAQ at bottom: 4 questions about how we work, delivery timelines, what's not included, and how to cancel/change scope.

### 3. Portfolio rebuilt as "Proof" — gallery + case studies
- Section 1: Long-form Video Edits (4 YouTube embeds with thumbnails)
- Section 2: Creative Shorts (4 embeds)
- Section 3: Thumbnails & Graphics (4 images)
- Section 4: Channel Before/After (4 cards: Victor Chan, Harjeet Dhillon, Dr. Maurice Maurer, Blake Reddy — hard results shown)
- CTA: "Want results like these?" → /contact
No AI Pipeline block. No Growth Philosophy grid (already removed in previous step).

### 4. New landing: /linkedin-funnel-system
Dedicated sales page promoting the funnel offer. Sections: Problem (content but no clients) → Solution (LinkedIn Funnel System) → What's included (bullets) → How it works (3 steps) → Proof (testimonial) → Pricing ($800/mo) → FAQ (4 items) → CTA (Book call / Try tool). This URL will be shared externally.

### 5. /free-tools page
Aggregates the 3 free tools: LinkedIn Funnel, Reel Hooks, YouTube Audit. Each card: what it does, what you get back (e.g. "a 3-step LinkedIn funnel plan"), link to the tool, and a small "Want me to run this for you?" CTA linking to /contact.

### 6. About page cleanup (already started, needs final polish)
- Hero: no "AI production system" (done). Tags: "Video Editing, YouTube Growth, Content Systems, Paid Ads" (done).
- Timeline: 3-4 concise milestones (already trimmed). No AI Pipeline block (already removed).
- Status: finished.

### 7. Contact page (done)
- Hero: "Let's work together" (done). WhatsApp + Email quick CTAs (done). "What I can help with" sidebar (done). Project dropdown (done). Iconified social links (done).

## Implementation order
1. Write this spec + user approval
2. Write design doc (this file) → commit
3. Full landing page /app/page.tsx rebuild
4. /services page rebuild with 3 tiers + FAQ + How We Work
5. /portfolio rebuilt as Proof
6. /linkedin-funnel-system new page
7. /free-tools new page
8. Final verification (all 11 pages 200, TypeScript passes, screenshots match)

No new dependencies added. All changes within Next.js + existing components.
