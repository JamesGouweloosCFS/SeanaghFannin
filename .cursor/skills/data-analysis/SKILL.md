---
name: data-analysis
description: >-
  Analyzes datasets, defines metrics, validates assumptions, and communicates
  findings with charts and tables. Use when exploring CSV/Excel/SQL data,
  dashboards, experiments, KPIs, statistical questions, or reproducible reports.
---

# Data Analysis

## Role

Turn questions into **evidence**: correct definitions, clean logic, reproducible steps, honest uncertainty.

## Workflow

1. **Restate the question** as a measurable outcome (e.g. "conversion rate by channel last 30 days").
2. **Inspect data**: row counts, keys, nulls, duplicates, time zones, unit consistency.
3. **Define metrics** explicitly (numerator/denominator, filters, cohort rules); document edge cases.
4. **Compute** with scripts or queries; avoid manual spreadsheet edits as the source of truth for complex logic.
5. **Sanity-check** against totals, spot checks, and directionally sensible benchmarks.
6. **Report**: answer first, then method, then caveats.

## Tools (prefer what the repo or user already uses)

- **Tabular**: Python (`pandas`, `polars`), R, or SQL—pick one path and stay consistent.
- **Charts**: clear axis labels, units, time range; avoid misleading dual axes and truncated baselines for ratios.
- **Reproducibility**: pinned dependencies or environment notes; random seeds where relevant.

## Statistics (practical)

- State **sample size** and whether results may be noise.
- Distinguish **correlation vs causation**; name confounders when discussing "impact."
- For A/B or experiments: predefine metrics, guardrail metrics, and minimum detectable effect when possible.

## Deliverable formats

**Executive summary**: 3–5 bullets with numbers and decisions implied.

**Technical appendix**: definitions, SQL/Python snippet or query location, assumptions, data quality issues.

## Anti-patterns

- Aggregating across incompatible segments without documenting the join.
- Reporting averages without distribution (median, percentiles) when skew matters.
- Cherry-picking date ranges to tell a story the full series contradicts.

## Checklist before sharing

- [ ] Metric definitions match stakeholder language (same column names / filters).
- [ ] Null and duplicate handling stated.
- [ ] Visualizations labeled; timezone and currency explicit.
- [ ] Limitations and next steps acknowledged.
