# Seanagh Fannin Website — Comprehensive Implementation Guide

## Executive Summary

The Seanagh Fannin website is being redesigned to serve as a premium financial advisory platform with custom interactive tools for wealth analysis and client onboarding. The current implementation focuses on page structure and basic styling. This guide outlines the complete requirements to align the site with the Carrick CI guidelines and implement the interactive tools system.

---

## Part 1: Design & Visual System

### 1.1 Color Palette (Carrick CI)
**Primary Colors:**
- **Ink (Dark Blue)**: `#122741` — Primary text, headings, navigation
- **Gold (Accent)**: `#bf965c` — Highlights, CTAs, interactive elements
- **Carrick Red**: `#881534` — Secondary accent (for CI corner element)

**Secondary Colors:**
- **Gold Light**: `#e5dbce` — Light backgrounds, subtle highlights
- **Gold Pale**: `#f5f0e6` — Light background blocks
- **Ink Mid**: `#1e3a5f` — Secondary text
- **Ink Soft**: `#5a6e8a` — Muted text
- **Ink Faint**: `#a0b0c8` — Very light text
- **Cream**: `#F8F9FB` — Page background
- **Line**: `rgba(191,150,92,0.2)` — Borders and dividers
- **Good**: `#2C6E49` — Success state

### 1.2 Typography
**Font Stack:**
- **Serif (Headlines, Elegant)**: Georgia, Caecilia LT Std (licensed for InDesign)
- **Sans-Serif (Body, UI)**: Roboto
- **Monospace (Technical/Data)**: Share Tech Mono (for reference numbers, codes)

**Font Weights:**
- 300: Light (headlines, elegant text)
- 400: Regular (body copy, navigation)
- 500: Medium (emphasis, labels)
- 600: Semibold (strong emphasis)
- 700: Bold (CTAs, important labels)

### 1.3 Visual Elements
**Carrick CI Accent:**
- Fixed position triangle in top-right corner: `80px × 80px`, Carrick Red at `rgba(136,21,52,0.25)` opacity
- Appears on all pages as brand consistency marker

**Borders & Lines:**
- Primary divider: `0.5px solid rgba(191,150,92,0.2)`
- Accent dividers: `0.5px solid var(--gold)`
- Dashed dividers: `2px dashed rgba(191,150,92,0.3)` (boarding pass stub separation)

**Spacing System:**
- Base unit: 0.5rem (8px)
- Common spacing: 0.75rem, 1rem, 1.2rem, 1.5rem, 2rem, 2.5rem, 3rem
- Padding clusters: 2rem × 2.5rem, 2.5rem × 3rem (content sections)

**Animations:**
- Fade-up entrance: `fadeUp 0.7s ease both` with staggered delays (0.05s, 0.15s, 0.25s, 0.35s, 0.45s)
- Smooth scroll: `scroll-behavior: smooth` on html
- Hover transitions: `transition: all 0.2s ease` (default for interactive elements)
- Color/border transitions: `transition: color 0.2s`, `transition: border-color 0.2s`

---

## Part 2: Page Structure & Content Alignment

### Current Status
The website has been refactored from a static design into a React SPA with:
- ✅ Navigation structure
- ✅ Page routing (landing, how-it-works, families, property, letters, booking)
- ✅ Basic form flow (4-step booking form)
- ✅ Journey page for wealth tools

### 2.1 Landing Page (`/`)

**Hero Section:**
- **Left Column** (Two-column grid, equal width):
  - Overline: "Seanagh Fannin"
  - Headline: "Wealth understood on your own terms"
  - Subheading: "Financial clarity for women — and men — ready to see the full picture..."
  - "Eight words": "She deserves to know. So does he."
  - CTAs: "Request your passport" (primary) + "How it works" (ghost button)

- **Right Column**:
  - Passport card (dark ink background)
  - Quote: "Every financial partnership eventually falls to one. Clarity is not a luxury. It is a right."
  - Card stamp in bottom-right corner with "Seanagh Fannin" text

**Brand Position Section:**
- "Why people come to Seanagh" header
- Body copy: "Most people with significant wealth have *nodded through conversations*... Seanagh is the person you call when you're ready to *start knowing.*"

**Three Pillars:**
- 01 — Understand what you hold
- 02 — Know how it generates income
- 03 — Decide with confidence

**Footer Bar:**
- Copyright/attribution text
- "Book a private conversation →" link

### 2.2 How It Works (`/how-it-works`)

**Preamble Section (2×2 Grid):**
- **For her**: Question about managing alone, context of exclusion
- **For him**: Question about understanding obligation, context of silent gaps
- **Bridge (full width, dark ink)**: "Nobody asks. Not because the question is wrong..."
- **Resolution**: Explanation of the Wealth Passport journey

**Four Stages (Sequential Timeline):**
1. **The first conversation** — 45–60 min, listen before lead, no obligation
2. **The passport audit** — 2–3 weeks, complete financial map
3. **The clarity session** — 90 min walkthrough, plain language
4. **Ongoing partnership** — Quarterly reviews, relationship-based

Each stage includes:
- Stage number (01–04 in large Georgia serif)
- Tag/category label
- Heading
- Body text
- Detail chips (2-column grid): Format/Duration/Delivered/Includes

**Promise Strip (Dark ink, 3 columns):**
- "No question is too basic. No situation is too complicated."
- "We translate complexity into decisions you can make with confidence."
- "Your clarity is not a by-product of our work — it is the work."

**CTA Footer:**
- "Ready to begin your journey with Seanagh?"
- "Book your first conversation" button

### 2.3 For Families (`/for-families`)

**Hero (2-column):**
- Title: "The conversation your family hasn't had yet"
- Intro paragraph
- "Eight words" callout (right column)

**Three Audiences (3-column grid):**
1. **For her** — Woman who needs to understand what she holds
   - Emotion: "I've always trusted... wouldn't know where to begin"
   - Benefits copy

2. **For him** — Man who wants certainty, not reassurance
   - Emotion: "My adviser tells me everything is in order..."
   - Benefits copy

3. **For both** — Couples who want to plan together
   - Emotion: "We have an adviser... I'm not sure we've ever really sat down..."
   - Benefits copy

**Adviser Gap Section (Dark ink):**
- Label: "The door most advisers forget to open"
- Quote: "Most advisers manage wealth. *Few explain it.*"
- Body: Context about HNW families in Southern Africa

**CTA Footer:**
- "Ready to have the conversation your family needs?"

### 2.4 Property & Estate (`/property`)

**Hero Section:**
- Kicker: "Property & estate structuring"
- Title: "You built it. Does your structure *reflect that?*"
- Intro: Context about structures and intentions
- Position statement (italicized): "You have sat in enough meetings... the most valuable thing anyone can offer you is not another recommendation — *it is clarity.*"

**Four Services (2×2 Grid):**
1. **Property structuring** — Ownership, transfer implications, income optimization
2. **Estate planning** — Wills, trusts, transfers as intended
3. **Trust structures** — Reviews, beneficiary planning, asset protection
4. **Succession planning** — Business, generational transfer, spousal preparedness

Each service includes:
- Number (01–04 in Georgia serif)
- Title
- Body description
- Detail chips: Covers / Who / Outcome

**Property Nod Section (Light gold background):**
- Label: "A note on certainty"
- Quote: "There is a difference between being told your affairs are in order — and *knowing* they are."

**CTA Footer:**
- "Ready to look at your structure together?"

### 2.5 Letters (`/letters`)

**Hero Section:**
- Kicker: "Two letters"
- Title: "The conversations most people never quite have"
- Intro: "These are not documents. They are starting points..."

**Two Letter Cards (2-column grid):**

**Dark Card (To her husband):**
- Label: "A letter to her husband"
- Salutation: "To the man who has built something worth protecting —"
- Body: 8 paragraphs addressing fear, confusion, communication
- Key phrases emphasized: "She is asking you to talk about what you've built." / "It is a conversation about love — expressed practically."
- Close: "With respect for what you've built, and care for who you're building it for —"
- Signature: "Seanagh Fannin"
- CTA: "Book a conversation →"

**Light Card (To him):**
- Label: "A letter to his family"
- Salutation: "To the man who built something — and quietly suspects..."
- Body: 5 paragraphs addressing silent expectations, reassurance vs. certainty
- Key phrase: "Asking is not admitting something. It is the beginning of knowing."
- Close: "With no judgment, and a great deal of respect —"
- Signature: "Seanagh Fannin"
- CTA: "Book a conversation →"

**Letters Footer:**
- "Both letters are yours to keep — and to share."
- "Book a conversation with Seanagh" button

### 2.6 Booking (`/booking`)

**Form Wrapper (2-column: sidebar + form):**

**Sidebar (Dark ink, sticky on desktop, sticky-height adjusted for mobile):**
- Name: "Seanagh Fannin"
- Tag: "Financial clarity"
- Kicker: "Book a private conversation"
- Title: "Your first conversation starts here"
- Eight words callout
- Body: "Everything you share is strictly confidential..."
- Assurance bullets (5):
  - Strictly confidential
  - No obligation
  - Response within one business day
  - In-person or virtual
  - Direct contact with Seanagh

**Form Main (4-step flow with progress bar):**

**Step 1 — About You:**
- First name + Last name (2-column)
- Email + Phone (2-column)
- Country of residence + How did you hear about us (2-column)

**Step 2 — Your Situation:**
- "Which best describes your situation? Select all that apply."
- 9 checkboxes (multi-select):
  - Managing wealth independently for first time
  - Going through/completed divorce
  - Widowed or significant loss
  - Understand estate, ensure family prepared
  - Inherited significant asset
  - Expat or planning relocation
  - Run business, align personal/business
  - Want to understand position more clearly
  - Want to come with partner
- Asset value selector (dropdown with 6 ranges)

**Step 3 — Your Priorities:**
- "What matters most to you right now?"
- 8 checkboxes:
  - Understanding ownership and structure
  - Liquidity and income day-to-day
  - Tax planning
  - Estate and succession
  - Property structuring
  - Investment growth
  - Expatriate planning
  - Uncertain, need guidance
- Text area: "Anything you would like Seanagh to know?"

**Step 4 — Meeting Preferences:**
- Preferred format (video/in-person JNB/in-person CT/phone)
- Preferred time of day (morning/midday/afternoon/flexible)
- Earliest available date (date picker)
- Time zone (SAST/GMT/BST/EST/GST/AEST)
- Scheduling considerations (text area)

**Confirmation Step:**
- Icon: Checkmark in circle
- Title: "Your request has been received"
- Body: "Thank you... Seanagh will be in touch within one business day..."
- Button: "Return to home"

**Progress Indicator:**
- 4-step progress bar at top of form
- Steps: "About you" / "Your situation" / "Your priorities" / "Your meeting"
- States: `current` (active), `done` (completed), default (pending)

---

## Part 3: Interactive Tools System

### 3.1 Architecture

**Data Layer (`src/types/clientProfile.ts`):**
```typescript
type ToolAnswers = Record<string, string | number | string[]>
type ClientProfile = {
  completedTools: string[]
  answers: Record<string, ToolAnswers>
}

// Key in answers: "stageId:toolIndex" e.g., "launch:0"
```

**Component Layer (`src/components/journey/ToolWorkspace.tsx`):**
- Main export: `<ToolWorkspace stageId toolIndex toolName profile onUpdate />`
- Orchestrates tool selection and rendering
- Manages form → result two-step UX

### 3.2 Stage 1 Tools (Launch & Financial Identity)

#### Tool 0: Cash-flow Dashboard
**Form Inputs:**
- `income`: Monthly income (currency)
- `income_type`: Employment / Self-employed / Passive / Mixed
- `fixed`: Fixed monthly costs (currency)
- `variable`: Variable monthly costs (currency)
- `debt_rep`: Debt repayments (currency)

**Computed Results:**
```javascript
{
  income, fixed, variable, debtRep, expenses, surplus, rate (%), health
}
```

**Health Status:**
- `critical` (rate < 5%) — Red badge, "Needs attention"
- `developing` (5% ≤ rate < 15%) — Orange badge, "Building momentum"
- `healthy` (rate ≥ 15%) — Green badge, "Strong position"

**Display:**
- Metrics grid: Total Income | Total Expenses | Monthly Surplus | Savings Rate
- Health status badge
- Insight: Personalized narrative based on health status
- Actionable: "Your primary focus should be..." / "You have good momentum..."

#### Tool 1: Emergency Fund Planner
**Form Inputs:**
- `balance`: Current emergency savings (currency)
- `months`: Target emergency fund duration (3, 4, or 6 months)
- `essential`: Monthly essential expenses (currency, optional — defaults to 65% of fixed costs)

**Computed Results:**
```javascript
{
  balance, essential, target, gap, monthsToReach, funded
}
```

**Display:**
- Metrics: Current Balance | Essential Monthly | Target Amount | Gap
- Progress indicator: Visual bar showing current vs. target
- Timeline: "You'll reach your target in X months at your current savings rate"
- Status: "Funded" (green) or "Gap of R X to close"

#### Tool 2: Debt Payoff Strategy
**Form Inputs:**
- `types`: Array of debt types selected (checkboxes)
  - credit_card, personal, vehicle, student, home
- For each type: `b_{type}` (balance) and `r_{type}` (interest rate)

**Debt Defaults:**
```javascript
{
  credit_card: { label: "Credit card", defaultRate: 20 },
  personal: { label: "Personal loan", defaultRate: 16 },
  vehicle: { label: "Vehicle finance", defaultRate: 12 },
  student: { label: "Student loan", defaultRate: 10 },
  home: { label: "Home loan", defaultRate: 11 },
}
```

**Computed Results:**
```javascript
{
  items: [{ key, label, balance, rate }],
  total,
  priority: [sorted by rate descending]
}
```

**Display:**
- Total debt metric
- Priority list (avalanche method — highest rate first):
  - Ranked with index (1, 2, 3...)
  - Debt type, current balance, interest rate
  - Interest savings callout: "Paying off [highest rate] first saves ~R X in interest"

#### Tool 3: Starter Portfolio Briefing
**Form Inputs:**
- `experience`: Investment experience level (never, some, moderate, experienced)
- `horizon`: Investment timeline (short, medium, long)
- `risk`: Risk tolerance slider (1–5)
- `monthly`: Monthly investment amount (currency)

**Computed Recommendation:**
```javascript
{
  primary: "TFSA / RA / Brokerage",
  secondary: "Money market fund / Balanced fund / Offshore equity",
  rationale: "With a short timeline... / Start with your R36,000 annual TFSA..."
}
```

**Decision Logic:**
1. If `horizon === "short"` → TFSA + money market
2. Else if `experience === "never"` → TFSA + balanced unit trust
3. Else if `risk <= 2` → TFSA + Retirement Annuity
4. Else → TFSA + RA + offshore brokerage

**Display:**
- Account type recommendations (primary + secondary)
- Rationale box explaining why this path
- Insight: "This structure gives you R X annual tax-free room..."

### 3.3 Stage 2–4 Tools (Advisory Questionnaires)

Generic advisory form pattern with configurable questions.

**Config Structure:**
```javascript
{
  stageId: "build",
  toolIndex: 0,
  toolName: "Goal-based investment plan",
  questions: [
    { label: "What are your primary wealth goals?", type: "select", options: [...] },
    { label: "Time horizon for these goals?", type: "radio", options: [...] },
    { label: "Additional context?", type: "textarea" }
  ]
}
```

**Available Tool Configs (16 total):**

**Build Stage (4 tools):**
1. Goal-based investment plan
2. Tax efficiency review
3. Career progression planning
4. Insurance and risk checklist

**Pivot Stage (4 tools):**
1. Transition scenario modeller
2. Estate and beneficiary review
3. Liquidity stress test
4. Decision support sessions

**Legacy Stage (4 tools):**
1. Retirement income model
2. Legacy and gifting strategy
3. Philanthropy planning
4. Annual wealth review cadence

### 3.4 Advisor Brief Component

**Display:**
- Aggregates all collected answers from completed tools
- Organized by stage
- Shows key data points per tool
- Advisor-friendly format (print-optimized)

**Content Sections:**
- Client profile summary
- Financial snapshot (cash flow, assets, debt if from launch tools)
- Life stage and priorities (from advisory tools)
- Action items and next steps

---

## Part 4: Implementation Tasks

### Phase 1: Content & Styling Refinement
- [ ] Update all page content to match the `seanagh_fannin_website_v5_ci.html` specifications
- [ ] Refine the color palette and ensure consistent use of CSS variables
- [ ] Implement responsive design breakpoints (@media max-width: 920px)
- [ ] Add animations: fade-up entrance, hover states, smooth scrolling
- [ ] Test typography hierarchy across all pages

### Phase 2: Form & Booking System
- [ ] Implement 4-step booking form with progress indicator
- [ ] Add form validation and error states
- [ ] Connect form to backend (Firebase/Firestore for submissions)
- [ ] Implement form data persistence (localStorage or state management)
- [ ] Create confirmation email template

### Phase 3: Interactive Tools (Stage 1)
- [ ] Build Cash-flow Dashboard tool with form inputs and computed results display
- [ ] Build Emergency Fund Planner with target calculation and progress visualization
- [ ] Build Debt Payoff Strategy tool with avalanche prioritization
- [ ] Build Starter Portfolio Briefing with decision logic
- [ ] Add result-to-advisor-brief data aggregation
- [ ] Implement "Save to advisor profile" workflow

### Phase 4: Advisory Tools (Stages 2–4)
- [ ] Create generic advisory form component
- [ ] Define all 12 question configs for stages 2–4
- [ ] Implement form rendering from config
- [ ] Add data persistence for advisory answers
- [ ] Connect to advisor brief aggregation

### Phase 5: Advisor Brief & Export
- [ ] Build Advisor Brief component with all collected data
- [ ] Implement print-friendly styling
- [ ] Add PDF export capability
- [ ] Create admin panel for reviewing submitted briefs
- [ ] Implement email delivery of brief to advisor

### Phase 6: Testing & Refinement
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness testing (all breakpoints)
- [ ] Form submission end-to-end testing
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (Lighthouse scores)
- [ ] User testing with sample users

### Phase 7: Deployment
- [ ] Set up Firebase hosting
- [ ] Configure custom domain
- [ ] Set up email notifications
- [ ] Create admin dashboard
- [ ] Implement analytics
- [ ] Deploy to production

---

## Part 5: Specific UI Components

### Buttons

**Primary CTA:**
```css
.btn-primary {
  background: var(--ink);
  color: var(--gold-lt);
  padding: 14px 32px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: all 0.2s;
}
.btn-primary:hover {
  background: var(--gold);
  color: var(--ink);
}
```

**Ghost Button:**
```css
.btn-ghost {
  background: none;
  border: none;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}
.btn-ghost:hover {
  color: var(--gold);
}
```

**Dark Button:**
```css
.btn-dark {
  background: var(--ink);
  color: var(--gold-lt);
  padding: 14px 28px;
  transition: all 0.2s;
}
.btn-dark:hover {
  background: var(--gold);
  color: var(--ink);
}
```

### Form Elements

**Input Fields:**
```css
input, select, textarea {
  width: 100%;
  border: 0.5px solid rgba(191, 150, 92, 0.28);
  background: #fff;
  padding: 11px 14px;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  color: var(--ink);
  transition: border-color 0.2s;
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--gold);
}
```

**Checkboxes (Custom):**
```css
.check-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border: 0.5px solid rgba(191, 150, 92, 0.18);
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.check-item:hover {
  border-color: var(--gold);
}
.check-item.selected {
  border-color: var(--gold);
  background: var(--gold-pale);
}
```

**Progress Indicator:**
```css
.prog-step {
  flex: 1;
  padding: 11px 10px;
  font-size: 10px;
  text-transform: uppercase;
  color: var(--ink-faint);
  background: var(--cream);
  border-right: 0.5px solid var(--line);
  transition: all 0.2s;
}
.prog-step.done {
  color: var(--gold);
  background: var(--gold-pale);
}
.prog-step.current {
  color: var(--ink);
  background: #fff;
  font-weight: 500;
}
```

---

## Part 6: Asset & Resource Links

**Reference Documents (in `/context/`):**
- `seanagh_fannin_website_v5_ci.html` — Full reference design (HTML)
- `ci_boarding_pass.html` — Digital boarding pass (reference for card styling)
- `ci_register_journey.html` — Registration/journey flow reference
- `property_structuring_guide_v2.pdf` — Content for property page
- `wealth_succession_questionnaire.html` — Content for advisory questions
- `seanagh_fannin_developer_spec_v2_ci.docx` — Detailed developer specs

**Images (in `/assets/`):**
- `shutterstock_30275155 (1).png` — Stage 1 (Launch) hero image
- `shutterstock_30275155 1 (1).jpg` — Stage 1 alternative
- `shutterstock_690816172 3 (1).jpg` — Stage 3 (Pivot) hero image
- Carrick logo files for footer/branding

---

## Part 7: Next Steps & Priorities

### Immediate (Week 1)
1. **Audit current implementation against reference design**
   - Compare page structure, content, styling
   - Identify gaps in visual treatment

2. **Implement Stage 1 tools (Cash-flow, Emergency Fund, Debt, Investing)**
   - Create form/result components
   - Add CSS styling for tool UI
   - Connect to client profile state

3. **Refine booking form**
   - Fix validation and flow
   - Add email notifications
   - Test end-to-end

### Short-term (Weeks 2–3)
4. **Build advisory tool system**
   - Generic form component
   - Config-driven rendering
   - Data persistence

5. **Create Advisor Brief aggregator**
   - Pull data from all completed tools
   - Format for advisor review
   - Add print/export

### Medium-term (Weeks 4–6)
6. **Testing & refinement**
   - Cross-browser, mobile
   - Accessibility audit
   - Performance optimization

7. **Deployment setup**
   - Firebase hosting
   - Email integration
   - Analytics

---

## Part 8: Responsive Breakpoints

**Primary Breakpoint: 920px and below**

**Changes at @media (max-width: 920px):**
- Navigation: Hide nav links (keep logo, use mobile hamburger if added)
- Hero: Single column instead of 2-column grid
- Hero-right: Hidden (passport card moves to mobile view or is hidden)
- Pillars, audiences, services: 1-column instead of multi-column grids
- Form: Single column for form wrapper (sidebar + main stack vertically)
- Stage details, promise strip: 1-column from multi-column
- Buttons: Full width or adjusted sizing
- Padding/margins: Reduced from 3rem to 1.5rem gutters

---

## Summary

The Seanagh Fannin website is transitioning from a static design reference to a fully functional React SPA with:
1. **Content-aligned pages** matching the reference design
2. **Interactive financial tools** for data collection and analysis
3. **Professional form system** for client onboarding
4. **Advisor brief generation** for personalized financial consultation
5. **Carrick CI branding** throughout all pages and components

This guide provides the complete specification for each component, page, tool, and interaction pattern. Use it as the source of truth for implementation decisions and design reviews.
