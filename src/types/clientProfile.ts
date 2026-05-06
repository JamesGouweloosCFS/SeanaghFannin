export type ToolAnswers = Record<string, string | number | string[]>;

export type ClientProfile = {
  completedTools: string[];
  answers: Record<string, ToolAnswers>;
};

export function emptyProfile(): ClientProfile {
  return { completedTools: [], answers: {} };
}

export function toolKey(stageId: string, toolIndex: number): string {
  return `${stageId}:${toolIndex}`;
}

// ── Stage 1 compute helpers ────────────────────────────────────

export type CashflowHealth = "critical" | "developing" | "healthy";

export function cashflowCalc(a: ToolAnswers) {
  const income = +a.income || 0;
  const fixed = +a.fixed || 0;
  const variable = +a.variable || 0;
  const debtRep = +a.debt_rep || 0;
  const expenses = fixed + variable + debtRep;
  const surplus = income - expenses;
  const rate = income > 0 ? Math.round((surplus / income) * 1000) / 10 : 0;
  const health: CashflowHealth =
    rate < 5 ? "critical" : rate < 15 ? "developing" : "healthy";
  return { income, fixed, variable, debtRep, expenses, surplus, rate, health };
}

export function emergencyCalc(a: ToolAnswers, cf?: ToolAnswers) {
  const balance = +a.balance || 0;
  const months = +a.months || 3;
  const essential =
    +a.essential ||
    (cf ? (+cf.fixed || 0) * 0.65 : 0); // ~65% of fixed costs are essential
  const target = essential * months;
  const gap = Math.max(0, target - balance);
  const surplus = cf ? cashflowCalc(cf).surplus : 0;
  const monthsToReach = surplus > 100 ? Math.ceil(gap / surplus) : null;
  return { balance, essential, target, gap, monthsToReach, funded: gap <= 0 };
}

export const DEBT_DEFAULTS: Record<string, { label: string; defaultRate: number }> = {
  credit_card: { label: "Credit card", defaultRate: 20 },
  personal:    { label: "Personal loan", defaultRate: 16 },
  vehicle:     { label: "Vehicle finance", defaultRate: 12 },
  student:     { label: "Student loan", defaultRate: 10 },
  home:        { label: "Home loan", defaultRate: 11 },
};

export function debtCalc(a: ToolAnswers) {
  const types = (a.types as string[]) ?? [];
  const items = types.map((t) => ({
    key: t,
    label: DEBT_DEFAULTS[t]?.label ?? t,
    balance: +a[`b_${t}`] || 0,
    rate: +a[`r_${t}`] || DEBT_DEFAULTS[t]?.defaultRate || 15,
  }));
  const total = items.reduce((s, d) => s + d.balance, 0);
  const priority = [...items].sort((x, y) => y.rate - x.rate);
  return { items, total, priority };
}

export function investingRec(a: ToolAnswers): {
  primary: string;
  secondary: string;
  rationale: string;
} {
  const horizon = a.horizon as string;
  const risk = +a.risk || 3;
  const exp = a.experience as string;

  if (horizon === "short") {
    return {
      primary: "Tax-Free Savings Account (TFSA)",
      secondary: "Cash / money market fund",
      rationale:
        "With a short timeline, capital preservation matters most. A TFSA in a money market fund keeps your money accessible and tax-free.",
    };
  }
  if (exp === "never") {
    return {
      primary: "Tax-Free Savings Account (TFSA)",
      secondary: "Balanced unit trust fund",
      rationale:
        "Start with your R36,000 annual TFSA allowance in a balanced fund. It's flexible, tax-free on growth and withdrawals, and easy to start.",
    };
  }
  if (risk <= 2) {
    return {
      primary: "Tax-Free Savings Account (TFSA)",
      secondary: "Retirement Annuity (RA)",
      rationale:
        "TFSA first for flexibility, then an RA for the tax deduction on contributions — well suited to a conservative, long-term approach.",
    };
  }
  return {
    primary: "Tax-Free Savings Account (TFSA)",
    secondary: "Retirement Annuity (RA) + offshore exposure",
    rationale:
      "Maximise your TFSA and RA allowances, then add offshore equity exposure through a brokerage account for long-term growth.",
  };
}

// ── Formatting ─────────────────────────────────────────────────

export function rFmt(n: number): string {
  if (n >= 1_000_000) return `R ${(n / 1_000_000).toFixed(1)}m`;
  return `R ${Math.round(n).toLocaleString("en-ZA")}`;
}
