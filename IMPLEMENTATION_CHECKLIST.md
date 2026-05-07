# Seanagh Fannin — Implementation Checklist

## Status Overview
- **Current Phase**: Integration of reference design with interactive tools system
- **Last Updated**: 2026-05-07
- **Total Tasks**: 87
- **Completed**: 12
- **In Progress**: 8
- **Blocked**: 0

---

## Phase 1: Content & Design System (10 tasks)

### Color Palette & Variables
- [ ] Define all CSS variables in tokens.css (gold, ink, cream, etc.)
- [ ] Test color contrast ratios (WCAG AA compliance)
- [ ] Create color swatches documentation
- [ ] Update global.css with variable references
- [ ] Test print styles (PDF export colors)

### Typography & Fonts
- [ ] Import Georgia and Roboto from Google Fonts
- [ ] Set up font stack with fallbacks
- [ ] Define heading hierarchy (h1–h6 sizes and weights)
- [ ] Test font rendering across browsers
- [ ] Create typography guide document

### Brand Elements
- [ ] Implement Carrick CI accent triangle (fixed, top-right)
- [ ] Create logo component (Seanagh Fannin + Carrick)
- [ ] Add botanical watermark to card elements
- [ ] Test CI accent line opacity and positioning

### Spacing & Layout
- [ ] Establish base spacing unit system (0.5rem = 8px)
- [ ] Update grid layouts to match reference design
- [ ] Test responsive spacing at breakpoints
- [ ] Create layout component for consistent page structure

---

## Phase 2: Page Content Alignment (24 tasks)

### Landing Page
- [ ] **Audit current vs. reference design**
  - [ ] Verify hero section structure (2-column layout)
  - [ ] Check passport card content and styling
  - [ ] Verify "eight words" callout styling
  - [ ] Confirm brand position section copy
  - [ ] Validate three pillars layout and content

- [ ] **Implement missing elements**
  - [ ] Add animated fade-up entrance animations
  - [ ] Implement smooth scroll transitions
  - [ ] Add overline/kicker styling
  - [ ] Style CTA buttons (primary + ghost variants)
  - [ ] Add footer bar with booking link

- [ ] **Test responsive design**
  - [ ] Verify mobile layout (1-column hero)
  - [ ] Test tablet layout transitions
  - [ ] Check button sizing on mobile

### How It Works Page
- [ ] **Preamble section**
  - [ ] Implement 2×2 grid layout (for her, for him, bridge, resolution)
  - [ ] Style dark ink bridge section
  - [ ] Verify copy and formatting

- [ ] **Timeline stages**
  - [ ] Create stage component with number, title, body, details grid
  - [ ] Implement detail chips styling
  - [ ] Add hover states for stage rows
  - [ ] Verify all 4 stage content

- [ ] **Promise strip**
  - [ ] Implement 3-column dark ink section
  - [ ] Verify text styling and alignment
  - [ ] Test responsive stacking

- [ ] **CTA and navigation**
  - [ ] Add bottom CTA button
  - [ ] Verify page navigation flow

### For Families Page
- [ ] **Hero section**
  - [ ] Implement 2-column hero layout
  - [ ] Verify "eight words" styling
  - [ ] Check responsive behavior

- [ ] **Three audiences**
  - [ ] Create audience card component
  - [ ] Implement tag/heading/emotion/body structure
  - [ ] Verify 3-column grid layout
  - [ ] Test mobile stacking

- [ ] **Adviser gap section**
  - [ ] Implement dark ink background section
  - [ ] Style quote and body text
  - [ ] Verify text emphasis

- [ ] **Bottom CTA**
  - [ ] Add call-to-action button and text

### Property & Estate Page
- [ ] **Hero section**
  - [ ] Verify title and intro copy
  - [ ] Style position statement (italicized, bordered)

- [ ] **Four services**
  - [ ] Create service card component
  - [ ] Implement 2×2 grid layout
  - [ ] Verify service details chips
  - [ ] Test responsive behavior

- [ ] **Property nod section**
  - [ ] Implement light gold background
  - [ ] Verify quote styling

- [ ] **Bottom CTA**
  - [ ] Add call-to-action

### Letters Page
- [ ] **Hero section**
  - [ ] Verify title and intro

- [ ] **Two letter cards**
  - [ ] Create letter card component (dark + light variants)
  - [ ] Implement 2-column grid
  - [ ] Verify letter content (8 paragraphs in each)
  - [ ] Style salutation, body, close, signature
  - [ ] Add button styling

- [ ] **Test responsive**
  - [ ] Mobile: stack letters vertically
  - [ ] Verify footer positioning

### Booking Page
- [ ] **Form layout structure**
  - [ ] ✅ Implement 2-column layout (sidebar + form)
  - [ ] Fix sidebar sticky positioning on mobile
  - [ ] Verify responsive column stacking

- [ ] **Sidebar styling**
  - [ ] ✅ Style heading, eight-words, assurance bullets
  - [ ] Verify colors and typography

- [ ] **Form progress bar**
  - [ ] ✅ Implement 4-step indicator
  - [ ] Test state transitions (pending, current, done)
  - [ ] Verify styling

- [ ] **Step 1 — About You**
  - [ ] ✅ Verify form fields (name, email, phone, country, source)
  - [ ] Test 2-column field layout
  - [ ] Implement dropdown selects

- [ ] **Step 2 — Your Situation**
  - [ ] ✅ Implement 9-checkbox group
  - [ ] Add selected state styling
  - [ ] Implement asset value dropdown
  - [ ] Test responsive checkbox layout

- [ ] **Step 3 — Your Priorities**
  - [ ] ✅ Implement 8-checkbox group
  - [ ] Add textarea for context
  - [ ] Test checkbox selection state

- [ ] **Step 4 — Meeting Preferences**
  - [ ] ✅ Implement dropdowns (format, time, timezone)
  - [ ] Add date picker input
  - [ ] Implement textarea for scheduling notes

- [ ] **Confirmation step**
  - [ ] ✅ Create confirmation card with checkmark icon
  - [ ] Add return home button
  - [ ] Style success message

---

## Phase 3: Interactive Tools — Stage 1 (18 tasks)

### Tool Architecture
- [ ] ✅ Create clientProfile.ts with types and helpers
- [ ] ✅ Create ToolWorkspace.tsx main component
- [ ] Implement tool selection and routing
- [ ] Add tool state management (form vs. result view)

### Cash-flow Dashboard Tool
- [ ] Create form component with inputs:
  - [ ] Monthly income (currency input)
  - [ ] Income type (dropdown)
  - [ ] Fixed costs (currency input)
  - [ ] Variable costs (currency input)
  - [ ] Debt repayments (currency input)

- [ ] Implement computation (cashflowCalc):
  - [ ] Calculate surplus = income - (fixed + variable + debtRep)
  - [ ] Calculate rate = (surplus / income) * 100
  - [ ] Determine health status (critical/developing/healthy)

- [ ] Create result display:
  - [ ] Display metrics grid (income, expenses, surplus, rate)
  - [ ] Show health badge with appropriate color
  - [ ] Add personalized insight text based on health
  - [ ] Implement "Save to advisor profile" button

- [ ] Test form validation and edge cases

### Emergency Fund Planner Tool
- [ ] Create form component:
  - [ ] Current balance (currency input)
  - [ ] Target months (radio buttons: 3, 4, 6)
  - [ ] Essential expenses (currency input, optional)

- [ ] Implement computation (emergencyCalc):
  - [ ] Calculate essential as 65% of fixed if not provided
  - [ ] Calculate target = essential × months
  - [ ] Calculate gap = max(0, target - balance)
  - [ ] Calculate monthsToReach = gap / surplus (if surplus > 100)

- [ ] Create result display:
  - [ ] Metrics grid (current balance, essential monthly, target, gap)
  - [ ] Progress bar showing current vs. target
  - [ ] Timeline text: "X months to reach target"
  - [ ] Status: funded (green) or gap amount

- [ ] Test calculations with various inputs

### Debt Payoff Strategy Tool
- [ ] Create form component:
  - [ ] Multi-select checkboxes for debt types
  - [ ] Dynamic inputs appear for each selected type:
    - [ ] Balance input (currency)
    - [ ] Interest rate input (number, with default)

- [ ] Implement computation (debtCalc):
  - [ ] Build items array with all debt entries
  - [ ] Calculate total debt
  - [ ] Sort by interest rate (highest first — avalanche)

- [ ] Create result display:
  - [ ] Total debt metric
  - [ ] Priority list (ranked, rate descending):
    - [ ] Index badge (1, 2, 3...)
    - [ ] Debt type and balance
    - [ ] Interest rate
  - [ ] Interest savings callout

- [ ] Test with multiple debt types

### Starter Portfolio Briefing Tool
- [ ] Create form component:
  - [ ] Experience level (radio: never, some, moderate, experienced)
  - [ ] Time horizon (radio: short, medium, long)
  - [ ] Risk tolerance (slider 1–5)
  - [ ] Monthly investment amount (currency)

- [ ] Implement decision logic (investingRec):
  - [ ] Short horizon → TFSA + money market
  - [ ] Never experienced → TFSA + balanced unit trust
  - [ ] Risk ≤ 2 → TFSA + Retirement Annuity
  - [ ] Else → TFSA + RA + offshore brokerage

- [ ] Create result display:
  - [ ] Primary recommendation (account type)
  - [ ] Secondary recommendation
  - [ ] Rationale box explaining the recommendation
  - [ ] Insight about tax-free allowances

- [ ] Test decision logic with various input combinations

### Advisor Brief Integration
- [ ] Create component to aggregate Stage 1 data
- [ ] Format answers for advisor review
- [ ] Add "View brief" button in tool workspace
- [ ] Test data aggregation from multiple tools

---

## Phase 4: Interactive Tools — Stages 2–4 (16 tasks)

### Advisory Tool System
- [ ] ✅ Create generic advisory form component
- [ ] Create config structure and define all 16 tools
- [ ] Implement form rendering from config
- [ ] Add form submission and data persistence

### Tool Configurations
**Build Stage (4 tools):**
- [ ] Define "Goal-based investment plan" config + 3 questions
- [ ] Define "Tax efficiency review" config + 3 questions
- [ ] Define "Career progression planning" config + 3 questions
- [ ] Define "Insurance and risk checklist" config + 3 questions

**Pivot Stage (4 tools):**
- [ ] Define "Transition scenario modeller" config + 3 questions
- [ ] Define "Estate and beneficiary review" config + 3 questions
- [ ] Define "Liquidity stress test" config + 3 questions
- [ ] Define "Decision support sessions" config + 3 questions

**Legacy Stage (4 tools):**
- [ ] Define "Retirement income model" config + 3 questions
- [ ] Define "Legacy and gifting strategy" config + 3 questions
- [ ] Define "Philanthropy planning" config + 3 questions
- [ ] Define "Annual wealth review cadence" config + 3 questions

---

## Phase 5: Advisor Brief & Data Export (8 tasks)

### Advisor Brief Component
- [ ] Create AdvisorBrief component
- [ ] Implement sections:
  - [ ] Client profile summary
  - [ ] Financial snapshot (from Stage 1 tools)
  - [ ] Life stage and priorities (from advisory tools)
  - [ ] Action items and recommendations

- [ ] Add data aggregation from all completed tools
- [ ] Implement print-friendly styling
- [ ] Add PDF export button

### Email & Delivery
- [ ] Set up email notification template
- [ ] Implement brief email delivery to advisor
- [ ] Add follow-up email template for client
- [ ] Test email integration

---

## Phase 6: Testing (12 tasks)

### Unit Tests
- [ ] Test all financial computation functions (cash flow, emergency, debt, investing)
- [ ] Test form validation logic
- [ ] Test data persistence and aggregation

### Integration Tests
- [ ] Test full tool workflow (form → submission → brief)
- [ ] Test form multi-step flow
- [ ] Test page navigation

### Cross-browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Mobile Testing
- [ ] iPhone 14/15 (375px width)
- [ ] iPad (768px width)
- [ ] Android (various sizes)

### Responsive Design
- [ ] Test all breakpoints (920px, 768px, 480px)
- [ ] Verify layout stacking and reflow
- [ ] Check button/form sizing on mobile

### Accessibility
- [ ] WCAG 2.1 Level AA audit
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast verification

---

## Phase 7: Performance & Optimization (6 tasks)

### Performance Optimization
- [ ] Optimize image sizes (lazy load, WebP format)
- [ ] Minimize CSS/JS bundles
- [ ] Implement code splitting for tools
- [ ] Run Lighthouse audit

### SEO
- [ ] Meta tags for all pages
- [ ] Open Graph tags for sharing
- [ ] Structured data (schema.org)

### Analytics
- [ ] Set up Google Analytics
- [ ] Track form submissions
- [ ] Track tool usage

---

## Phase 8: Deployment (7 tasks)

### Firebase Setup
- [ ] Configure Firebase project
- [ ] Set up Firestore for form submissions and tool data
- [ ] Configure Firebase hosting
- [ ] Set up authentication (if needed)

### Domain & SSL
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up DNS records

### Email Integration
- [ ] Configure email service (SendGrid, Mailgun, Firebase Email)
- [ ] Test email delivery
- [ ] Set up email templates

### Admin Dashboard
- [ ] Create admin view for form submissions
- [ ] Implement data export (CSV, PDF)
- [ ] Add user filtering and search

### Monitoring
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring

### Go-live
- [ ] Final QA pass
- [ ] Deploy to production
- [ ] Monitor for errors
- [ ] Collect initial user feedback

---

## Priority Roadmap

### Week 1 (Immediate)
**Goal: Get tools working end-to-end**

Priority order:
1. ✅ Set up tool architecture and state management
2. **Cash-flow Dashboard** (high value, moderate complexity)
3. **Emergency Fund Planner** (high value, low complexity)
4. **Debt Payoff Strategy** (high value, moderate complexity)
5. **Starter Portfolio Briefing** (high value, moderate complexity)

Tasks this week:
- Finalize all 4 Stage 1 tools
- Test form inputs and computations
- Display results in clean UI
- Connect to advisor brief

### Week 2–3 (Short-term)
**Goal: Complete advisory tools and brief system**

Tasks:
- Create generic advisory form component
- Define all 16 tool configurations
- Build Advisor Brief aggregator
- Test data persistence
- Implement email notifications

### Week 4–5 (Medium-term)
**Goal: Refine, test, optimize**

Tasks:
- Comprehensive testing (cross-browser, mobile, accessibility)
- Performance optimization
- Refine UI/UX based on testing
- Create admin dashboard

### Week 6+ (Deployment)
**Goal: Go live**

Tasks:
- Firebase setup and deployment
- Domain configuration
- Email integration
- Final QA
- Launch and monitoring

---

## Known Issues & Blockers

### None currently identified
- All prerequisites in place
- Dependencies available
- No external blockers

### Questions for Stakeholder
1. Should tool data be persisted across sessions (localStorage vs. cloud)?
2. What email service should be used (Firebase, SendGrid, etc.)?
3. Should there be an admin approval step before sending brief to advisor?
4. Are there specific financial calculations or thresholds to adjust?
5. Should users be able to edit answers after saving?

---

## Metrics & Success Criteria

### Completion
- All 87 tasks completed
- Zero critical bugs
- 100% test coverage for computation functions

### Performance
- Lighthouse score > 90 (desktop and mobile)
- Page load time < 3 seconds
- Form submission < 1 second

### User Experience
- Form completion rate > 75%
- Tool usage on journey page > 40%
- Zero 404 errors on deployment

### Business
- All user data captured
- Advisors receiving briefs with required information
- Email delivery rate > 98%

---

## Notes

- **Styling**: All form and result UI already added to global.css (Phases 3–4)
- **Tools**: Two of three major pieces already implemented (clientProfile.ts, ToolWorkspace.tsx)
- **Content**: Reference design complete in context folder
- **Deployment**: Firebase ready; just needs configuration

**Next step**: Begin Phase 1 color/design audit and Phase 3 Stage 1 tool completion.
