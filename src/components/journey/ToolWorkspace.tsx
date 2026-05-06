import { useState } from "react";
import { Link } from "react-router-dom";
import {
  type ToolAnswers,
  type ClientProfile,
  type CashflowHealth,
  toolKey,
  cashflowCalc,
  emergencyCalc,
  debtCalc,
  investingRec,
  DEBT_DEFAULTS,
  rFmt,
} from "@/types/clientProfile";

// ── Public API ─────────────────────────────────────────────────

type WorkspaceProps = {
  stageId: string;
  toolIndex: number;
  toolName: string;
  profile: ClientProfile;
  onUpdate: (key: string, answers: ToolAnswers) => void;
};

export function ToolWorkspace({
  stageId,
  toolIndex,
  toolName,
  profile,
  onUpdate,
}: WorkspaceProps) {
  const key = toolKey(stageId, toolIndex);
  const saved = profile.answers[key] ?? {};
  const isDone = profile.completedTools.includes(key);

  const [answers, setAnswers] = useState<ToolAnswers>(saved);
  const [step, setStep] = useState<"form" | "result">(isDone ? "result" : "form");

  const set = (k: string, v: ToolAnswers[string]) =>
    setAnswers((prev) => ({ ...prev, [k]: v }));

  const submit = () => {
    onUpdate(key, answers);
    setStep("result");
  };

  const reset = () => setStep("form");

  const cfKey = toolKey("launch", 0);
  const cfAnswers = profile.answers[cfKey];

  if (stageId === "launch") {
    if (toolIndex === 0)
      return <CashflowTool answers={answers} set={set} step={step} onSubmit={submit} onReset={reset} />;
    if (toolIndex === 1)
      return <EmergencyTool answers={answers} set={set} step={step} onSubmit={submit} onReset={reset} cfAnswers={cfAnswers} />;
    if (toolIndex === 2)
      return <DebtTool answers={answers} set={set} step={step} onSubmit={submit} onReset={reset} />;
    if (toolIndex === 3)
      return <InvestingTool answers={answers} set={set} step={step} onSubmit={submit} onReset={reset} cfAnswers={cfAnswers} />;
  }

  const config = ADVISORY_CONFIGS[`${stageId}:${toolIndex}`];
  if (config) {
    return (
      <AdvisoryTool
        config={config}
        answers={answers}
        set={set}
        step={step}
        onSubmit={submit}
        onReset={reset}
      />
    );
  }

  return (
    <div className="tool-form">
      <p className="tool-form__intro">This tool is coming soon.</p>
    </div>
  );
}

// ── Shared primitives ──────────────────────────────────────────

type SetFn = (k: string, v: ToolAnswers[string]) => void;

function CurrencyInput({
  id,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  placeholder?: string;
  value: string | number;
  onChange: (v: string) => void;
}) {
  return (
    <div className="tool-form__currency">
      <span>R</span>
      <input
        id={id}
        type="number"
        min="0"
        placeholder={placeholder ?? "0"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Chips({
  options,
  selected,
  multi,
  onChange,
}: {
  options: { value: string; label: string }[];
  selected: string | string[];
  multi?: boolean;
  onChange: (v: string | string[]) => void;
}) {
  const sel = Array.isArray(selected) ? selected : [selected];
  const toggle = (v: string) => {
    if (multi) {
      const next = sel.includes(v) ? sel.filter((x) => x !== v) : [...sel, v];
      onChange(next);
    } else {
      onChange(v);
    }
  };
  return (
    <div className="tool-form__chips">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`tool-form__chip${sel.includes(o.value) ? " is-selected" : ""}`}
          onClick={() => toggle(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ResultBadge({ health }: { health: CashflowHealth }) {
  const map = {
    critical:   { label: "Needs attention", cls: "health--critical" },
    developing: { label: "Building momentum", cls: "health--developing" },
    healthy:    { label: "Strong position", cls: "health--healthy" },
  };
  const { label, cls } = map[health];
  return (
    <span className={`tool-result__badge ${cls}`}>{label}</span>
  );
}

function SavedNote() {
  return <p className="tool-result__saved">✓ Saved to your advisor profile</p>;
}

function ResetBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="tool-result__reset" onClick={onClick}>
      Update my answers
    </button>
  );
}

// ── Tool 1: Cash-flow Dashboard ────────────────────────────────

function CashflowTool({
  answers,
  set,
  step,
  onSubmit,
  onReset,
}: {
  answers: ToolAnswers;
  set: SetFn;
  step: "form" | "result";
  onSubmit: () => void;
  onReset: () => void;
}) {
  if (step === "result") {
    const c = cashflowCalc(answers);
    return (
      <div className="tool-result">
        <p className="tool-workspace__eyebrow">Cash-flow snapshot</p>
        <h3>Your monthly picture</h3>
        <div className="tool-result__metrics">
          <div className="tool-result__metric">
            <span className="tool-result__value">{rFmt(c.income)}</span>
            <span className="tool-result__label">Monthly income</span>
          </div>
          <div className="tool-result__metric">
            <span className="tool-result__value">{rFmt(c.expenses)}</span>
            <span className="tool-result__label">Total expenses</span>
          </div>
          <div className={`tool-result__metric tool-result__metric--accent ${c.surplus < 0 ? "is-negative" : ""}`}>
            <span className="tool-result__value">{rFmt(Math.abs(c.surplus))}</span>
            <span className="tool-result__label">
              {c.surplus >= 0 ? "Monthly surplus" : "Monthly shortfall"}
            </span>
          </div>
        </div>
        <div className="tool-result__health-row">
          <ResultBadge health={c.health} />
          <span className="tool-result__rate">{c.rate}% savings rate</span>
        </div>
        <p className="tool-result__insight">
          {c.surplus >= 0
            ? `You have ${rFmt(c.surplus)} available each month. A 20% savings target means setting aside ${rFmt(c.income * 0.2)} — your advisor can show you the fastest route there.`
            : `Your expenses exceed your income by ${rFmt(Math.abs(c.surplus))} per month. An advisor can help identify where to restructure.`}
        </p>
        <SavedNote />
        <ResetBtn onClick={onReset} />
      </div>
    );
  }

  return (
    <div className="tool-form">
      <p className="tool-workspace__eyebrow">Cash-flow dashboard</p>
      <h3>Your monthly numbers</h3>
      <p className="tool-form__intro">
        Help your advisor understand your income and spending pattern before your first meeting.
      </p>

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="cf-income">
          Monthly take-home income
        </label>
        <CurrencyInput
          id="cf-income"
          placeholder="45 000"
          value={answers.income ?? ""}
          onChange={(v) => set("income", v)}
        />
        <Chips
          options={[
            { value: "salary", label: "Fixed salary" },
            { value: "mixed", label: "Salary + variable" },
            { value: "freelance", label: "Freelance / contract" },
          ]}
          selected={(answers.income_type as string) ?? ""}
          onChange={(v) => set("income_type", v)}
        />
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="cf-fixed">
          Fixed monthly obligations
        </label>
        <p className="tool-form__hint">
          Rent or bond repayment, vehicle finance, medical aid, insurance premiums
        </p>
        <CurrencyInput
          id="cf-fixed"
          placeholder="22 000"
          value={answers.fixed ?? ""}
          onChange={(v) => set("fixed", v)}
        />
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="cf-variable">
          Variable monthly spend
        </label>
        <p className="tool-form__hint">
          Food, fuel, lifestyle, entertainment, subscriptions
        </p>
        <CurrencyInput
          id="cf-variable"
          placeholder="8 000"
          value={answers.variable ?? ""}
          onChange={(v) => set("variable", v)}
        />
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="cf-debt">
          Monthly debt repayments
        </label>
        <p className="tool-form__hint">
          Credit card minimum payments, personal loans, student debt (exclude bond / vehicle above)
        </p>
        <CurrencyInput
          id="cf-debt"
          placeholder="3 500"
          value={answers.debt_rep ?? ""}
          onChange={(v) => set("debt_rep", v)}
        />
      </div>

      <button
        className="btn btn-primary tool-form__submit"
        onClick={onSubmit}
        disabled={!answers.income}
      >
        Calculate my cash flow →
      </button>
    </div>
  );
}

// ── Tool 2: Emergency Fund Planner ─────────────────────────────

function EmergencyTool({
  answers,
  set,
  step,
  onSubmit,
  onReset,
  cfAnswers,
}: {
  answers: ToolAnswers;
  set: SetFn;
  step: "form" | "result";
  onSubmit: () => void;
  onReset: () => void;
  cfAnswers?: ToolAnswers;
}) {
  if (step === "result") {
    const e = emergencyCalc(answers, cfAnswers);
    return (
      <div className="tool-result">
        <p className="tool-workspace__eyebrow">Emergency fund planner</p>
        <h3>Your safety net</h3>
        <div className="tool-result__metrics">
          <div className="tool-result__metric">
            <span className="tool-result__value">{rFmt(e.balance)}</span>
            <span className="tool-result__label">Current balance</span>
          </div>
          <div className="tool-result__metric">
            <span className="tool-result__value">{rFmt(e.target)}</span>
            <span className="tool-result__label">
              Target ({answers.months ?? 3}-month fund)
            </span>
          </div>
          <div className={`tool-result__metric tool-result__metric--accent ${e.gap > 0 ? "is-negative" : ""}`}>
            <span className="tool-result__value">{e.funded ? "Fully funded" : rFmt(e.gap)}</span>
            <span className="tool-result__label">{e.funded ? "Status" : "Remaining gap"}</span>
          </div>
        </div>
        {!e.funded && (
          <p className="tool-result__insight">
            {e.monthsToReach !== null
              ? `At your current surplus, you can close this gap in approximately ${e.monthsToReach} months. Your advisor can help you automate this with a dedicated savings pocket.`
              : `You have a ${rFmt(e.gap)} gap to your emergency fund target. An advisor can help you build a realistic savings sprint to close it.`}
          </p>
        )}
        {e.funded && (
          <p className="tool-result__insight">
            Your emergency fund is fully funded. Your advisor can confirm the right account type (interest-bearing, accessible) and discuss what to do with additional surplus.
          </p>
        )}
        <SavedNote />
        <ResetBtn onClick={onReset} />
      </div>
    );
  }

  const hasCfData = cfAnswers && (+cfAnswers.fixed || 0) > 0;

  return (
    <div className="tool-form">
      <p className="tool-workspace__eyebrow">Emergency fund planner</p>
      <h3>Building your safety net</h3>
      <p className="tool-form__intro">
        A funded emergency buffer is the foundation of every financial plan. Let's see where you stand.
      </p>

      {!hasCfData && (
        <div className="tool-form__field">
          <label className="tool-form__label" htmlFor="ef-essential">
            Monthly essential expenses
          </label>
          <p className="tool-form__hint">
            Housing, food, transport, insurance — the costs you cannot stop if income paused
          </p>
          <CurrencyInput
            id="ef-essential"
            placeholder="18 000"
            value={answers.essential ?? ""}
            onChange={(v) => set("essential", v)}
          />
        </div>
      )}

      {hasCfData && (
        <div className="tool-form__info-box">
          Essential expenses estimated from your cash-flow data. You can adjust below if needed.
          <CurrencyInput
            id="ef-essential-override"
            placeholder=""
            value={answers.essential ?? ""}
            onChange={(v) => set("essential", v)}
          />
        </div>
      )}

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="ef-balance">
          Current emergency savings balance
        </label>
        <CurrencyInput
          id="ef-balance"
          placeholder="0"
          value={answers.balance ?? ""}
          onChange={(v) => set("balance", v)}
        />
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label">How many months of cover do you want to build?</label>
        <p className="tool-form__hint">
          3 months for dual-income households; 6 months for single income or variable earnings
        </p>
        <Chips
          options={[
            { value: "3", label: "3 months" },
            { value: "4", label: "4 months" },
            { value: "6", label: "6 months" },
          ]}
          selected={(answers.months as string) ?? "3"}
          onChange={(v) => set("months", v)}
        />
      </div>

      <button
        className="btn btn-primary tool-form__submit"
        onClick={onSubmit}
        disabled={!answers.balance && answers.balance !== 0}
      >
        See my emergency fund position →
      </button>
    </div>
  );
}

// ── Tool 3: Debt Payoff Strategy ───────────────────────────────

function DebtTool({
  answers,
  set,
  step,
  onSubmit,
  onReset,
}: {
  answers: ToolAnswers;
  set: SetFn;
  step: "form" | "result";
  onSubmit: () => void;
  onReset: () => void;
}) {
  const selectedTypes = (answers.types as string[]) ?? [];

  if (step === "result") {
    const d = debtCalc(answers);
    return (
      <div className="tool-result">
        <p className="tool-workspace__eyebrow">Debt payoff strategy</p>
        <h3>Your debt picture</h3>
        {d.total > 0 ? (
          <>
            <div className="tool-result__metrics">
              <div className="tool-result__metric tool-result__metric--accent">
                <span className="tool-result__value">{rFmt(d.total)}</span>
                <span className="tool-result__label">Total debt</span>
              </div>
              <div className="tool-result__metric">
                <span className="tool-result__value">{d.priority.length}</span>
                <span className="tool-result__label">Debt types</span>
              </div>
              <div className="tool-result__metric">
                <span className="tool-result__value">
                  {d.priority[0] ? `${d.priority[0].rate}%` : "—"}
                </span>
                <span className="tool-result__label">Highest rate</span>
              </div>
            </div>
            <div className="tool-result__priority-list">
              <p className="tool-result__priority-label">
                Recommended payoff order (avalanche method — highest rate first):
              </p>
              {d.priority.map((item, i) => (
                <div key={item.key} className="tool-result__priority-item">
                  <span className="tool-result__priority-num">{i + 1}</span>
                  <span className="tool-result__priority-name">{item.label}</span>
                  <span className="tool-result__priority-meta">
                    {rFmt(item.balance)} · {item.rate}% p.a.
                  </span>
                </div>
              ))}
            </div>
            <p className="tool-result__insight">
              Tackling your {d.priority[0]?.label.toLowerCase() ?? "highest-rate"} debt first minimises total interest paid. Your advisor can model a payoff timeline and identify any consolidation opportunities.
            </p>
          </>
        ) : (
          <p className="tool-result__insight">
            No debt balances entered. If you have debt, your advisor can help you structure a tax-efficient payoff plan.
          </p>
        )}
        <SavedNote />
        <ResetBtn onClick={onReset} />
      </div>
    );
  }

  return (
    <div className="tool-form">
      <p className="tool-workspace__eyebrow">Debt payoff strategy</p>
      <h3>Map your debt landscape</h3>
      <p className="tool-form__intro">
        Approximate figures are fine — the goal is to understand the shape of your obligations, not exact numbers.
      </p>

      <div className="tool-form__field">
        <label className="tool-form__label">Which types of debt do you currently have?</label>
        <Chips
          options={Object.entries(DEBT_DEFAULTS).map(([k, v]) => ({
            value: k,
            label: v.label,
          }))}
          selected={selectedTypes}
          multi
          onChange={(v) => set("types", v as string[])}
        />
      </div>

      {selectedTypes.length > 0 && (
        <div className="tool-form__debt-items">
          {selectedTypes.map((t) => (
            <div key={t} className="tool-form__debt-item">
              <p className="tool-form__debt-item-name">{DEBT_DEFAULTS[t]?.label ?? t}</p>
              <div className="tool-form__debt-item-fields">
                <div className="tool-form__debt-sub">
                  <label className="tool-form__label" htmlFor={`b-${t}`}>
                    Approximate balance
                  </label>
                  <CurrencyInput
                    id={`b-${t}`}
                    placeholder="50 000"
                    value={answers[`b_${t}`] ?? ""}
                    onChange={(v) => set(`b_${t}`, v)}
                  />
                </div>
                <div className="tool-form__debt-sub">
                  <label className="tool-form__label" htmlFor={`r-${t}`}>
                    Interest rate (% p.a.)
                  </label>
                  <input
                    id={`r-${t}`}
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    className="tool-form__rate-input"
                    placeholder={String(DEBT_DEFAULTS[t]?.defaultRate ?? 15)}
                    value={answers[`r_${t}`] ?? ""}
                    onChange={(e) => set(`r_${t}`, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary tool-form__submit"
        onClick={onSubmit}
      >
        Build my payoff strategy →
      </button>
    </div>
  );
}

// ── Tool 4: Starter Portfolio Briefing ────────────────────────

function InvestingTool({
  answers,
  set,
  step,
  onSubmit,
  onReset,
  cfAnswers,
}: {
  answers: ToolAnswers;
  set: SetFn;
  step: "form" | "result";
  onSubmit: () => void;
  onReset: () => void;
  cfAnswers?: ToolAnswers;
}) {
  if (step === "result") {
    const rec = investingRec(answers);
    const surplus = cfAnswers ? cashflowCalc(cfAnswers).surplus : 0;
    const monthly = +answers.monthly || surplus;
    const tfsa36 = 36000;
    const monthsToMax = monthly > 0 ? Math.ceil(tfsa36 / monthly) : null;

    return (
      <div className="tool-result">
        <p className="tool-workspace__eyebrow">Starter portfolio briefing</p>
        <h3>Your investment starting point</h3>
        <div className="tool-result__rec-card">
          <div className="tool-result__rec-primary">
            <span className="tool-result__rec-label">Start here</span>
            <span className="tool-result__rec-name">{rec.primary}</span>
          </div>
          <div className="tool-result__rec-secondary">
            <span className="tool-result__rec-label">Then add</span>
            <span className="tool-result__rec-name">{rec.secondary}</span>
          </div>
        </div>
        <p className="tool-result__insight">{rec.rationale}</p>
        {monthly > 0 && monthsToMax !== null && (
          <p className="tool-result__insight">
            Investing {rFmt(monthly)} per month, you'll max your R36,000 annual TFSA allowance in{" "}
            {monthsToMax} month{monthsToMax !== 1 ? "s" : ""}.
          </p>
        )}
        <SavedNote />
        <ResetBtn onClick={onReset} />
      </div>
    );
  }

  return (
    <div className="tool-form">
      <p className="tool-workspace__eyebrow">Starter portfolio briefing</p>
      <h3>Your investment profile</h3>
      <p className="tool-form__intro">
        Three questions that help your advisor recommend the right starting structure for you.
      </p>

      <div className="tool-form__field">
        <label className="tool-form__label">Where are you with investing?</label>
        <Chips
          options={[
            { value: "never", label: "Haven't started yet" },
            { value: "explored", label: "Explored options" },
            { value: "started", label: "Have some investments" },
          ]}
          selected={(answers.experience as string) ?? ""}
          onChange={(v) => set("experience", v)}
        />
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label">When might you need this money?</label>
        <Chips
          options={[
            { value: "short", label: "Within 2 years" },
            { value: "medium", label: "3 – 5 years" },
            { value: "long", label: "5+ years" },
          ]}
          selected={(answers.horizon as string) ?? ""}
          onChange={(v) => set("horizon", v)}
        />
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="risk-slider">
          How do you feel about investment risk?
        </label>
        <p className="tool-form__hint">
          1 = preserve my capital at all costs · 5 = I want maximum growth
        </p>
        <div className="tool-form__slider-wrap">
          <input
            id="risk-slider"
            type="range"
            min="1"
            max="5"
            step="1"
            className="tool-form__slider"
            value={(answers.risk as number) ?? 3}
            onChange={(e) => set("risk", +e.target.value)}
          />
          <div className="tool-form__slider-labels">
            <span>Conservative</span>
            <span className="tool-form__slider-val">{(answers.risk as number) ?? 3}</span>
            <span>Growth</span>
          </div>
        </div>
      </div>

      <div className="tool-form__field">
        <label className="tool-form__label" htmlFor="inv-monthly">
          Monthly amount you could invest
        </label>
        <p className="tool-form__hint">
          {cfAnswers && cashflowCalc(cfAnswers).surplus > 0
            ? `Based on your cash flow, you have ${rFmt(cashflowCalc(cfAnswers).surplus)} available.`
            : "Approximate is fine — this helps your advisor calibrate recommendations."}
        </p>
        <CurrencyInput
          id="inv-monthly"
          placeholder="3 000"
          value={answers.monthly ?? ""}
          onChange={(v) => set("monthly", v)}
        />
      </div>

      <button
        className="btn btn-primary tool-form__submit"
        onClick={onSubmit}
        disabled={!answers.experience || !answers.horizon}
      >
        See my investment starting point →
      </button>
    </div>
  );
}

// ── Generic advisory tool (Stages 2–4) ────────────────────────

type AdvisoryOption = { value: string; label: string };
type AdvisoryQuestion = {
  id: string;
  label: string;
  hint?: string;
  type: "radio" | "checkbox";
  options: AdvisoryOption[];
};
type AdvisoryConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  questions: AdvisoryQuestion[];
};

function AdvisoryTool({
  config,
  answers,
  set,
  step,
  onSubmit,
  onReset,
}: {
  config: AdvisoryConfig;
  answers: ToolAnswers;
  set: SetFn;
  step: "form" | "result";
  onSubmit: () => void;
  onReset: () => void;
}) {
  if (step === "result") {
    return (
      <div className="tool-result">
        <p className="tool-workspace__eyebrow">{config.eyebrow}</p>
        <h3>Profile captured</h3>
        <p className="tool-result__insight">
          Your advisor will have this information before your meeting, allowing them to prepare
          targeted recommendations rather than starting from scratch.
        </p>
        <div className="tool-result__advisory-summary">
          {config.questions.map((q) => {
            const raw = answers[q.id];
            if (!raw) return null;
            const val = Array.isArray(raw) ? raw : [raw as string];
            const labels = val
              .map((v) => q.options.find((o) => o.value === v)?.label ?? v)
              .join(", ");
            return (
              <div key={q.id} className="tool-result__advisory-row">
                <span className="tool-result__advisory-q">{q.label}</span>
                <span className="tool-result__advisory-a">{labels}</span>
              </div>
            );
          })}
        </div>
        <SavedNote />
        <ResetBtn onClick={onReset} />
      </div>
    );
  }

  return (
    <div className="tool-form">
      <p className="tool-workspace__eyebrow">{config.eyebrow}</p>
      <h3>{config.title}</h3>
      <p className="tool-form__intro">{config.intro}</p>

      {config.questions.map((q) => (
        <div key={q.id} className="tool-form__field">
          <label className="tool-form__label">{q.label}</label>
          {q.hint && <p className="tool-form__hint">{q.hint}</p>}
          <Chips
            options={q.options}
            selected={
              q.type === "checkbox"
                ? ((answers[q.id] as string[]) ?? [])
                : ((answers[q.id] as string) ?? "")
            }
            multi={q.type === "checkbox"}
            onChange={(v) => set(q.id, v)}
          />
        </div>
      ))}

      <button className="btn btn-primary tool-form__submit" onClick={onSubmit}>
        Save to my advisor profile →
      </button>
    </div>
  );
}

// ── Advisor Brief ──────────────────────────────────────────────

type BriefProps = {
  profile: ClientProfile;
  onClose: () => void;
};

export function AdvisorBrief({ profile, onClose }: BriefProps) {
  const count = profile.completedTools.length;
  if (count === 0) return null;

  const cfKey = toolKey("launch", 0);
  const efKey = toolKey("launch", 1);
  const dbKey = toolKey("launch", 2);
  const invKey = toolKey("launch", 3);

  const cf = profile.answers[cfKey];
  const ef = profile.answers[efKey];
  const db = profile.answers[dbKey];
  const inv = profile.answers[invKey];

  const cfResult = cf ? cashflowCalc(cf) : null;
  const efResult = ef ? emergencyCalc(ef, cf) : null;
  const dbResult = db ? debtCalc(db) : null;
  const invResult = inv ? investingRec(inv) : null;

  return (
    <div className="advisor-brief">
      <div className="advisor-brief__header">
        <div>
          <p className="advisor-brief__eyebrow">Advisor brief</p>
          <h2 className="advisor-brief__title">Your financial profile</h2>
          <p className="advisor-brief__sub">
            {count} tool{count !== 1 ? "s" : ""} completed · This brief will be shared with your advisor before your consultation
          </p>
        </div>
        <button type="button" className="advisor-brief__close" onClick={onClose} aria-label="Close brief">
          ✕
        </button>
      </div>

      <div className="advisor-brief__body">
        {cfResult && (
          <div className="advisor-brief__section">
            <p className="advisor-brief__section-label">Cash flow</p>
            <div className="advisor-brief__row">
              <span>Monthly income</span><strong>{rFmt(cfResult.income)}</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Total expenses</span><strong>{rFmt(cfResult.expenses)}</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Monthly surplus</span>
              <strong className={cfResult.surplus < 0 ? "is-negative" : "is-positive"}>
                {rFmt(cfResult.surplus)}
              </strong>
            </div>
            <div className="advisor-brief__row">
              <span>Savings rate</span><strong>{cfResult.rate}%</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Income type</span><strong>{(cf?.income_type as string) ?? "Not specified"}</strong>
            </div>
          </div>
        )}

        {efResult && (
          <div className="advisor-brief__section">
            <p className="advisor-brief__section-label">Emergency fund</p>
            <div className="advisor-brief__row">
              <span>Current balance</span><strong>{rFmt(efResult.balance)}</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Target ({ef?.months ?? 3}-month fund)</span><strong>{rFmt(efResult.target)}</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Gap</span>
              <strong className={efResult.gap > 0 ? "is-negative" : "is-positive"}>
                {efResult.funded ? "Fully funded" : rFmt(efResult.gap)}
              </strong>
            </div>
          </div>
        )}

        {dbResult && dbResult.total > 0 && (
          <div className="advisor-brief__section">
            <p className="advisor-brief__section-label">Debt profile</p>
            <div className="advisor-brief__row">
              <span>Total debt</span><strong>{rFmt(dbResult.total)}</strong>
            </div>
            {dbResult.priority.map((item) => (
              <div key={item.key} className="advisor-brief__row">
                <span>{item.label}</span>
                <strong>{rFmt(item.balance)} @ {item.rate}%</strong>
              </div>
            ))}
          </div>
        )}

        {invResult && (
          <div className="advisor-brief__section">
            <p className="advisor-brief__section-label">Investment profile</p>
            <div className="advisor-brief__row">
              <span>Experience</span><strong>{(inv?.experience as string) ?? "—"}</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Risk tolerance</span><strong>{(inv?.risk as number) ?? "—"} / 5</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Horizon</span><strong>{(inv?.horizon as string) ?? "—"}</strong>
            </div>
            <div className="advisor-brief__row">
              <span>Recommended start</span><strong>{invResult.primary}</strong>
            </div>
          </div>
        )}

        {/* Advisory answers from stages 2–4 */}
        {Object.entries(profile.answers)
          .filter(([k]) => !k.startsWith("launch:"))
          .map(([k, a]) => {
            const config = ADVISORY_CONFIGS[k];
            if (!config) return null;
            return (
              <div key={k} className="advisor-brief__section">
                <p className="advisor-brief__section-label">{config.eyebrow}</p>
                {config.questions.map((q) => {
                  const raw = a[q.id];
                  if (!raw) return null;
                  const val = Array.isArray(raw) ? raw : [raw as string];
                  const labels = val
                    .map((v) => q.options.find((o) => o.value === v)?.label ?? v)
                    .join(", ");
                  return (
                    <div key={q.id} className="advisor-brief__row">
                      <span>{q.label}</span>
                      <strong>{labels}</strong>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>

      <div className="advisor-brief__footer">
        <Link className="btn btn-primary" to="/booking">
          Book my consultation
        </Link>
        <p className="advisor-brief__note">
          Your advisor receives this brief before your meeting so time is spent on strategy, not intake.
        </p>
      </div>
    </div>
  );
}

// ── Advisory question configs (Stages 2–4) ────────────────────

const ADVISORY_CONFIGS: Record<string, AdvisoryConfig> = {
  "build:0": {
    eyebrow: "Goal-based investment plan",
    title: "Your financial goals",
    intro:
      "Knowing what you're building toward lets your advisor align your portfolio to real outcomes.",
    questions: [
      {
        id: "goals",
        label: "What are your primary financial goals?",
        type: "checkbox",
        options: [
          { value: "property", label: "Buy or upgrade property" },
          { value: "education", label: "Children's education" },
          { value: "retirement", label: "Retirement security" },
          { value: "business", label: "Start or grow a business" },
          { value: "fi", label: "Financial independence" },
          { value: "wealth", label: "Build long-term wealth" },
        ],
      },
      {
        id: "first_goal_timeline",
        label: "When is your first major financial goal?",
        type: "radio",
        options: [
          { value: "2y", label: "Within 2 years" },
          { value: "5y", label: "3 – 5 years" },
          { value: "10y", label: "5 – 10 years" },
          { value: "10yplus", label: "10+ years" },
        ],
      },
      {
        id: "current_investments",
        label: "Do you currently have any investments in place?",
        type: "radio",
        options: [
          { value: "none", label: "Not yet" },
          { value: "tfsa", label: "Yes — TFSA" },
          { value: "ra", label: "Yes — Retirement Annuity (RA)" },
          { value: "multiple", label: "Yes — multiple accounts" },
        ],
      },
    ],
  },
  "build:1": {
    eyebrow: "Tax efficiency review",
    title: "Your tax position",
    intro:
      "Understanding your current tax structures helps your advisor identify gaps and savings opportunities.",
    questions: [
      {
        id: "tfsa_usage",
        label: "Are you using your R36,000 annual TFSA allowance?",
        type: "radio",
        options: [
          { value: "yes_max", label: "Yes — maximising it" },
          { value: "yes_partial", label: "Yes — partially" },
          { value: "no", label: "No" },
          { value: "unsure", label: "Not sure" },
        ],
      },
      {
        id: "ra_usage",
        label: "Do you contribute to a Retirement Annuity (RA)?",
        type: "radio",
        options: [
          { value: "yes_self", label: "Yes — self-funded contributions" },
          { value: "yes_employer", label: "Through employer only" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "tax_advice",
        label: "Do you currently receive professional tax advice?",
        type: "radio",
        options: [
          { value: "yes_advisor", label: "Yes — dedicated tax advisor" },
          { value: "yes_efiling", label: "I manage my own e-filing" },
          { value: "no", label: "No formal tax advice" },
        ],
      },
    ],
  },
  "build:2": {
    eyebrow: "Career progression planning",
    title: "Your career and income",
    intro:
      "Career decisions have direct financial implications. This helps your advisor align your plan to your trajectory.",
    questions: [
      {
        id: "career_stage",
        label: "How would you describe your current career stage?",
        type: "radio",
        options: [
          { value: "early", label: "Early career (0–5 years)" },
          { value: "mid", label: "Mid-career — growing responsibility" },
          { value: "senior", label: "Senior or leadership role" },
          { value: "owner", label: "Business owner / entrepreneur" },
          { value: "portfolio", label: "Multiple income streams" },
        ],
      },
      {
        id: "variable_comp",
        label: "Does your compensation include equity, bonuses, or commission?",
        type: "radio",
        options: [
          { value: "yes_significant", label: "Yes — significant portion" },
          { value: "yes_minor", label: "Yes — minor component" },
          { value: "no", label: "No — fixed salary only" },
        ],
      },
      {
        id: "career_change",
        label: "Are you planning a major career move in the next 12 months?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "exploring", label: "Exploring options" },
          { value: "no", label: "No — stable for now" },
        ],
      },
    ],
  },
  "build:3": {
    eyebrow: "Insurance and risk checklist",
    title: "Your protection gaps",
    intro:
      "Insurance gaps are often the single biggest financial risk for women in the growth phase of their careers.",
    questions: [
      {
        id: "cover_types",
        label: "Which of the following cover do you currently have?",
        hint: "Select all that apply.",
        type: "checkbox",
        options: [
          { value: "life", label: "Life cover" },
          { value: "disability", label: "Disability income cover" },
          { value: "critical", label: "Critical illness / dread disease" },
          { value: "medical", label: "Medical aid" },
          { value: "short_term", label: "Short-term / asset insurance" },
          { value: "none", label: "None of the above" },
        ],
      },
      {
        id: "cover_review",
        label: "When was your insurance last reviewed by an advisor?",
        type: "radio",
        options: [
          { value: "recent", label: "Within the last year" },
          { value: "some", label: "1 – 3 years ago" },
          { value: "old", label: "More than 3 years ago" },
          { value: "never", label: "Never reviewed" },
        ],
      },
      {
        id: "income_dependants",
        label: "Are others financially dependent on your income?",
        type: "radio",
        options: [
          { value: "yes_full", label: "Yes — fully dependent" },
          { value: "yes_partial", label: "Yes — partially" },
          { value: "no", label: "No dependants" },
        ],
      },
    ],
  },
  "pivot:0": {
    eyebrow: "Transition scenario modeller",
    title: "Your current transition",
    intro:
      "Major life events redefine your financial priorities. Capturing the context helps your advisor respond with precision.",
    questions: [
      {
        id: "transition_type",
        label: "Which best describes your current situation?",
        type: "radio",
        options: [
          { value: "marriage", label: "Getting married / partnered" },
          { value: "divorce", label: "Separation or divorce" },
          { value: "children", label: "Having or adopting children" },
          { value: "career_change", label: "Major career change" },
          { value: "emigration", label: "Emigrating or relocating" },
          { value: "business", label: "Starting or exiting a business" },
          { value: "inheritance", label: "Receiving an inheritance" },
          { value: "caregiving", label: "Caring for aging parents" },
        ],
      },
      {
        id: "income_impact",
        label: "How has this changed your income or financial obligations?",
        type: "radio",
        options: [
          { value: "increase", label: "Significant increase" },
          { value: "stable", label: "No material change" },
          { value: "decrease", label: "Significant decrease or uncertainty" },
        ],
      },
      {
        id: "preparedness",
        label: "How financially prepared do you feel for this transition?",
        type: "radio",
        options: [
          { value: "well", label: "Well prepared" },
          { value: "some", label: "Somewhat prepared" },
          { value: "not", label: "Not prepared" },
          { value: "overwhelmed", label: "It feels overwhelming" },
        ],
      },
    ],
  },
  "pivot:1": {
    eyebrow: "Estate and beneficiary review",
    title: "Your estate position",
    intro:
      "Life transitions are the most common trigger for estate plans becoming outdated. This helps identify where to focus.",
    questions: [
      {
        id: "will_status",
        label: "Do you have a current, valid will?",
        type: "radio",
        options: [
          { value: "yes_recent", label: "Yes — reviewed within 2 years" },
          { value: "yes_old", label: "Yes — but not recently reviewed" },
          { value: "no", label: "No will in place" },
          { value: "unsure", label: "Unsure of current status" },
        ],
      },
      {
        id: "beneficiaries",
        label: "Have you recently reviewed beneficiary nominations on your life policies and retirement funds?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes — up to date" },
          { value: "no", label: "No — not recently reviewed" },
          { value: "unsure", label: "Not sure what I have nominated" },
        ],
      },
      {
        id: "poa",
        label: "Do you have a power of attorney or living will in place?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "Not sure what this involves" },
        ],
      },
    ],
  },
  "pivot:2": {
    eyebrow: "Liquidity stress test",
    title: "Your financial resilience",
    intro:
      "Understanding your cash runway gives your advisor a clear picture of how much risk your situation can absorb.",
    questions: [
      {
        id: "cash_runway",
        label: "If your income stopped today, how long could you cover all expenses?",
        type: "radio",
        options: [
          { value: "lt1", label: "Less than 1 month" },
          { value: "1_3", label: "1 – 3 months" },
          { value: "3_6", label: "3 – 6 months" },
          { value: "6_12", label: "6 – 12 months" },
          { value: "gt12", label: "12+ months" },
        ],
      },
      {
        id: "liquidity_sources",
        label: "Do you have access to additional liquidity if needed?",
        hint: "Select all that apply.",
        type: "checkbox",
        options: [
          { value: "credit", label: "Credit facility or overdraft" },
          { value: "investments", label: "Accessible investments" },
          { value: "property", label: "Property equity" },
          { value: "family", label: "Family support" },
          { value: "none", label: "No additional liquidity" },
        ],
      },
      {
        id: "dependants_income",
        label: "Is anyone financially dependent on your income?",
        type: "radio",
        options: [
          { value: "yes_full", label: "Yes — fully dependent" },
          { value: "yes_partial", label: "Yes — partially" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  "pivot:3": {
    eyebrow: "Decision support sessions",
    title: "The decision you're facing",
    intro:
      "Your advisor's time is most valuable when focused on the specific decision in front of you.",
    questions: [
      {
        id: "decision_type",
        label: "What financial decision are you currently navigating?",
        type: "radio",
        options: [
          { value: "purchase", label: "Large purchase or property" },
          { value: "career", label: "Career or income transition" },
          { value: "relationship", label: "Relationship or family change" },
          { value: "business", label: "Business decision" },
          { value: "investment", label: "Investment or portfolio choice" },
          { value: "estate", label: "Estate or succession planning" },
          { value: "none", label: "No specific decision — exploring" },
        ],
      },
      {
        id: "urgency",
        label: "How urgent is this?",
        type: "radio",
        options: [
          { value: "this_month", label: "This month" },
          { value: "this_quarter", label: "This quarter" },
          { value: "this_year", label: "This year" },
          { value: "exploratory", label: "Just exploring options" },
        ],
      },
      {
        id: "advisor_need",
        label: "What would be most helpful from an advisor right now?",
        type: "radio",
        options: [
          { value: "second_opinion", label: "A second opinion" },
          { value: "modelling", label: "Financial modelling / projections" },
          { value: "tax", label: "Tax implications" },
          { value: "structures", label: "Legal structures advice" },
          { value: "all", label: "A comprehensive view of everything" },
        ],
      },
    ],
  },
  "legacy:0": {
    eyebrow: "Retirement income model",
    title: "Your retirement picture",
    intro:
      "Retirement planning starts with a clear target. This gives your advisor the inputs to build a credible model.",
    questions: [
      {
        id: "retirement_age",
        label: "What is your target retirement age?",
        type: "radio",
        options: [
          { value: "50", label: "Before 55" },
          { value: "55", label: "55 – 60" },
          { value: "65", label: "60 – 65" },
          { value: "65plus", label: "65+" },
          { value: "flexible", label: "Flexible — not yet defined" },
        ],
      },
      {
        id: "retirement_income",
        label: "What monthly lifestyle income would you need in retirement?",
        type: "radio",
        options: [
          { value: "lt30", label: "Less than R30,000/month" },
          { value: "30_60", label: "R30,000 – R60,000/month" },
          { value: "60_100", label: "R60,000 – R100,000/month" },
          { value: "gt100", label: "More than R100,000/month" },
        ],
      },
      {
        id: "retirement_structures",
        label: "Which retirement structures do you currently have?",
        hint: "Select all that apply.",
        type: "checkbox",
        options: [
          { value: "ra", label: "Retirement Annuity (RA)" },
          { value: "preservation", label: "Preservation fund" },
          { value: "living_annuity", label: "Living annuity" },
          { value: "pension", label: "Company pension / provident" },
          { value: "none", label: "None yet" },
        ],
      },
    ],
  },
  "legacy:1": {
    eyebrow: "Legacy and gifting strategy",
    title: "Your legacy intent",
    intro:
      "Defining what you want your wealth to do after you is the foundation of a meaningful estate plan.",
    questions: [
      {
        id: "legacy_intent",
        label: "What do you most want your wealth to achieve?",
        type: "radio",
        options: [
          { value: "family", label: "Provide for my family and dependants" },
          { value: "generational", label: "Build intergenerational wealth" },
          { value: "philanthropy", label: "Leave a philanthropic legacy" },
          { value: "business", label: "Business succession" },
          { value: "undefined", label: "I haven't defined this yet" },
        ],
      },
      {
        id: "estate_plan",
        label: "Do you have a structured estate plan in place?",
        type: "radio",
        options: [
          { value: "yes_current", label: "Yes — up to date" },
          { value: "yes_outdated", label: "Yes — but not recently reviewed" },
          { value: "no", label: "No formal estate plan" },
          { value: "partial", label: "Partly in place" },
        ],
      },
      {
        id: "family_conversation",
        label: "Have you discussed your estate intentions with your family?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes — fully discussed" },
          { value: "partial", label: "Partially — some awareness" },
          { value: "no", label: "No — not yet discussed" },
          { value: "deliberate_no", label: "No — intentionally private" },
        ],
      },
    ],
  },
  "legacy:2": {
    eyebrow: "Philanthropy planning",
    title: "Your giving intent",
    intro:
      "Purposeful giving can be structured tax-efficiently. Your advisor can show you how to give more while paying less.",
    questions: [
      {
        id: "giving_current",
        label: "Do you currently give to causes or charities?",
        type: "radio",
        options: [
          { value: "yes_regular", label: "Yes — regularly and intentionally" },
          { value: "yes_ad_hoc", label: "Yes — occasionally" },
          { value: "no_interested", label: "Not yet, but interested" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "causes",
        label: "Which causes resonate most with you?",
        hint: "Select all that apply.",
        type: "checkbox",
        options: [
          { value: "education", label: "Education" },
          { value: "health", label: "Healthcare" },
          { value: "environment", label: "Environment" },
          { value: "poverty", label: "Poverty alleviation" },
          { value: "women", label: "Women and children" },
          { value: "arts", label: "Arts and culture" },
        ],
      },
      {
        id: "structured_giving",
        label: "Are you interested in tax-efficient structured giving?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes — tell me more" },
          { value: "open", label: "Open to exploring it" },
          { value: "informal", label: "I prefer informal giving" },
        ],
      },
    ],
  },
  "legacy:3": {
    eyebrow: "Annual wealth review cadence",
    title: "Your review rhythm",
    intro:
      "Wealth grows and plans decay. Knowing your current review habits helps your advisor build the right cadence.",
    questions: [
      {
        id: "review_frequency",
        label: "How often do you currently review your overall financial plan?",
        type: "radio",
        options: [
          { value: "quarterly", label: "Quarterly" },
          { value: "biannual", label: "Twice a year" },
          { value: "annual", label: "Once a year" },
          { value: "rarely", label: "Rarely" },
          { value: "never", label: "Never formally reviewed" },
        ],
      },
      {
        id: "review_concerns",
        label: "Which areas concern you most?",
        hint: "Select all that apply.",
        type: "checkbox",
        options: [
          { value: "performance", label: "Investment performance" },
          { value: "tax", label: "Tax efficiency" },
          { value: "insurance", label: "Insurance gaps" },
          { value: "estate", label: "Estate and succession" },
          { value: "retirement", label: "Retirement readiness" },
          { value: "cashflow", label: "Cash flow and debt" },
        ],
      },
      {
        id: "advisor_relationship",
        label: "Would you benefit from a dedicated annual review meeting?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes — I don't currently have one" },
          { value: "have_one", label: "I already have a review cadence" },
          { value: "unsure", label: "Open to discussing it" },
        ],
      },
    ],
  },
};
