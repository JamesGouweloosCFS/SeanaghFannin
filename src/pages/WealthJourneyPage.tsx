import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ToolWorkspace } from "@/components/journey/ToolWorkspace";
import { ClientProfile, emptyProfile, ToolAnswers } from "@/types/clientProfile";
import stageImageBuild from "@assets/shutterstock_30275155 (1).png";
import stageImageLaunch from "@assets/shutterstock_30275155 1 (1).jpg";
import stageImagePivot from "@assets/shutterstock_690816172 3 (1).jpg";

type JourneyStage = {
  id: string;
  title: string;
  city: string;
  focus: string;
  image: string;
  imageAlt: string;
  tools: JourneyTool[];
};

type JourneyTool = {
  name: string;
  format: string;
  timeline: string;
  benefit: string;
};

const journeyStages: JourneyStage[] = [
  {
    id: "launch",
    title: "Launch & Financial Identity",
    city: "Clarity Bay",
    focus:
      "Create financial clarity early in your career, set healthy money rhythms, and establish confidence around income, debt, and first investments.",
    image: stageImageLaunch,
    imageAlt: "Woman reviewing her finances in a calm workspace.",
    tools: [
      {
        name: "Cash-flow dashboard",
        format: "Interactive tracker",
        timeline: "Week 1",
        benefit: "See exactly where money goes and free up monthly capacity.",
      },
      {
        name: "Emergency fund planner",
        format: "Savings sprint",
        timeline: "Weeks 2-4",
        benefit: "Build a realistic safety net target with automated milestones.",
      },
      {
        name: "Debt payoff strategy",
        format: "Advisor worksheet",
        timeline: "Month 2",
        benefit: "Prioritize repayments to reduce interest drag and stress.",
      },
      {
        name: "Starter portfolio briefing",
        format: "Video + guide",
        timeline: "Month 2",
        benefit: "Understand first investing principles before committing capital.",
      },
    ],
  },
  {
    id: "build",
    title: "Build & Accelerate",
    city: "Growth District",
    focus:
      "As earnings grow, align your wealth plan with leadership ambitions, family goals, and tax-smart decisions that protect momentum.",
    image: stageImageBuild,
    imageAlt: "Professional woman planning her next wealth goals.",
    tools: [
      {
        name: "Goal-based investment plan",
        format: "Portfolio blueprint",
        timeline: "Quarter 1",
        benefit: "Map portfolio sleeves to near, mid, and long-term goals.",
      },
      {
        name: "Tax efficiency review",
        format: "Advisor review",
        timeline: "Quarter 1",
        benefit: "Identify allowances and structures that improve net outcomes.",
      },
      {
        name: "Career progression planning",
        format: "Decision framework",
        timeline: "Quarter 2",
        benefit: "Translate career moves into compensation and savings strategy.",
      },
      {
        name: "Insurance and risk checklist",
        format: "Coverage audit",
        timeline: "Quarter 2",
        benefit: "Close critical protection gaps as responsibilities increase.",
      },
    ],
  },
  {
    id: "pivot",
    title: "Pivot Through Life Transitions",
    city: "Transition Junction",
    focus:
      "Navigate pivotal moments such as marriage, divorce, caregiving, inheritance, or entrepreneurship with a plan that protects optionality.",
    image: stageImagePivot,
    imageAlt: "Woman walking through a new life chapter with confidence.",
    tools: [
      {
        name: "Transition scenario modeller",
        format: "What-if simulator",
        timeline: "Decision week",
        benefit: "Compare outcomes before choosing a major life direction.",
      },
      {
        name: "Estate and beneficiary review",
        format: "Document audit",
        timeline: "Week 2",
        benefit: "Keep legal intentions aligned with your current reality.",
      },
      {
        name: "Liquidity stress test",
        format: "Cash runway model",
        timeline: "Week 2",
        benefit: "Check resilience through uncertain income or one-off costs.",
      },
      {
        name: "Decision support sessions",
        format: "Advisor coaching",
        timeline: "Monthly",
        benefit: "Access structured support for high-stakes financial choices.",
      },
    ],
  },
  {
    id: "legacy",
    title: "Legacy, Freedom & Impact",
    city: "Legacy Coast",
    focus:
      "Convert accumulated wealth into long-term freedom, retirement confidence, intergenerational support, and the legacy you want to leave.",
    image: stageImageLaunch,
    imageAlt: "Confident woman reflecting on long-term goals and legacy.",
    tools: [
      {
        name: "Retirement income model",
        format: "Income map",
        timeline: "Annual update",
        benefit: "Project income sustainability across multiple life scenarios.",
      },
      {
        name: "Legacy and gifting strategy",
        format: "Family plan",
        timeline: "Semi-annual",
        benefit: "Transfer wealth intentionally while preserving flexibility.",
      },
      {
        name: "Philanthropy planning",
        format: "Impact portfolio",
        timeline: "Annual update",
        benefit: "Align giving with personal values and measurable outcomes.",
      },
      {
        name: "Annual wealth review cadence",
        format: "Advisor rhythm",
        timeline: "Quarterly check-ins",
        benefit: "Keep strategy current as markets, tax, and family needs shift.",
      },
    ],
  },
];

export function WealthJourneyPage() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [stageEngaged, setStageEngaged] = useState(false);
  const [clientProfile, setClientProfile] = useState<ClientProfile>(emptyProfile());

  const updateProfile = (key: string, answers: ToolAnswers) => {
    setClientProfile((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: answers },
      completedTools: prev.completedTools.includes(key)
        ? prev.completedTools
        : [...prev.completedTools, key],
    }));
  };

  const activeStage = journeyStages[activeStageIndex];
  const activeTool = activeStage.tools[activeToolIndex];
  const totalTools = activeStage.tools.length;
  const isLastStage = activeStageIndex === journeyStages.length - 1;
  const nextStage = !isLastStage ? journeyStages[activeStageIndex + 1] : null;

  const selectStage = (i: number) => {
    setDirection(i > activeStageIndex ? "forward" : "back");
    setActiveStageIndex(i);
    setActiveToolIndex(0);
    setWorkspaceOpen(false);
    setStageEngaged(false);
  };

  const moveStage = (dir: -1 | 1) => {
    const next = (activeStageIndex + dir + journeyStages.length) % journeyStages.length;
    selectStage(next);
  };

  const selectTool = (i: number) => {
    setActiveToolIndex(i);
    setWorkspaceOpen(false);
    setStageEngaged(true);
  };

  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <section className="services section wealth-journey-section">
          <div className="container">
            <div className="journey-track" role="tablist" aria-label="Journey stages">
              {journeyStages.map((stage, i) => (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeStageIndex}
                  className={`journey-track__node${i === activeStageIndex ? " is-active" : ""}${i < activeStageIndex ? " is-visited" : ""}`}
                  onClick={() => selectStage(i)}
                >
                  <span className="journey-track__dot">
                    <span className="journey-track__num">{i + 1}</span>
                  </span>
                  <span className="journey-track__label">{stage.title}</span>
                </button>
              ))}
            </div>

            <div className="journey-card">
              <div className="journey-card__grid">

                <article
                  key={activeStage.id}
                  className="journey-destination journey-anim-stage"
                  data-direction={direction}
                >
                  <div
                    key={`bg-${activeStage.id}`}
                    className="journey-destination__bg"
                    style={{ backgroundImage: `url("${activeStage.image}")` }}
                    aria-hidden="true"
                  />
                  <div className="journey-destination__top">
                    <span className="journey-destination__pin">
                      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
                        <path d="M4.5 0C2.015 0 0 2.015 0 4.5c0 3.375 4.5 7.5 4.5 7.5S9 7.875 9 4.5C9 2.015 6.985 0 4.5 0zm0 6.125A1.625 1.625 0 1 1 4.5 2.875a1.625 1.625 0 0 1 0 3.25z" fill="currentColor"/>
                      </svg>
                      {activeStage.city}
                    </span>
                    <span className="journey-destination__counter">{activeStageIndex + 1}/{journeyStages.length}</span>
                  </div>
                  <div className="journey-destination__body">
                    <h2 className="journey-destination__title">{activeStage.title}</h2>
                    <p className="journey-destination__focus">{activeStage.focus}</p>
                  </div>
                  <div className="journey-destination__bottom">
                    <div className="journey-destination__metrics">
                      <div className="journey-destination__metric">
                        <span>{activeTool.timeline}</span>
                        <small>Timeline</small>
                      </div>
                      <div className="journey-destination__metric">
                        <span>{activeToolIndex + 1}/{totalTools}</span>
                        <small>Stop</small>
                      </div>
                      <div className="journey-destination__metric">
                        <span>Live</span>
                        <small>Status</small>
                      </div>
                    </div>
                    <div className="journey-destination__actions">
                      <Link className="btn btn-primary" to="/booking?source=carrick">Book consultation</Link>
                      <Link className="text-link journey-destination__link" to="/resources">View resources</Link>
                    </div>
                  </div>
                </article>

                <div className="journey-itinerary">
                  <div className="journey-itinerary__header">
                    <p className="journey-itinerary__label">Itinerary</p>
                    <span className="journey-itinerary__count">{activeToolIndex + 1} of {totalTools} stops</span>
                  </div>

                  <div className="journey-stops" role="list" aria-label={`${activeStage.title} tools`}>
                    {activeStage.tools.map((tool, i) => (
                      <button
                        key={tool.name}
                        type="button"
                        className={`journey-stop${i === activeToolIndex ? " is-active" : ""}`}
                        onClick={() => selectTool(i)}
                      >
                        <span className="journey-stop__number">{i + 1}</span>
                        <div className="journey-stop__content">
                          <span className="journey-stop__name">{tool.name}</span>
                          <span className="journey-stop__format">{tool.format}</span>
                          {i === activeToolIndex && (
                            <span className="journey-stop__benefit">{tool.benefit}</span>
                          )}
                        </div>
                        <span className="journey-stop__timeline">{tool.timeline}</span>
                      </button>
                    ))}
                  </div>

                  <article
                    key={`detail-${activeStage.id}-${activeTool.name}`}
                    className="journey-tool-detail journey-anim-tool"
                    role="region"
                    aria-label="Selected tool details"
                  >
                    <div className="journey-tool-detail__chips">
                      <span>{activeTool.format}</span>
                      <span>{activeTool.timeline}</span>
                    </div>
                    <p className="journey-tool-detail__benefit">{activeTool.benefit}</p>
                    <button
                      type="button"
                      className="btn btn-primary journey-tool-detail__explore"
                      onClick={() => setWorkspaceOpen(true)}
                    >
                      Explore workspace →
                    </button>
                  </article>

                  <div className="journey-itinerary__footer">
                    {stageEngaged && !isLastStage && nextStage && (
                      <button
                        type="button"
                        className="btn journey-nav-btn journey-nav-btn--primary"
                        onClick={() => moveStage(1)}
                      >
                        Continue to {nextStage.title} →
                      </button>
                    )}
                    {stageEngaged && isLastStage && (
                      <Link className="btn btn-primary" to="/booking?source=carrick">
                        Book your consultation →
                      </Link>
                    )}
                    {!stageEngaged && activeStageIndex > 0 && (
                      <button
                        type="button"
                        className="btn journey-nav-btn"
                        onClick={() => moveStage(-1)}
                      >
                        ← Previous stage
                      </button>
                    )}
                  </div>

                  <div
                    className={`journey-workspace-panel${workspaceOpen ? " is-open" : ""}`}
                    role="region"
                    aria-label="Tool workspace"
                    aria-live="polite"
                  >
                    <div className="journey-workspace-panel__header">
                      <button
                        type="button"
                        className="journey-workspace-back"
                        onClick={() => setWorkspaceOpen(false)}
                        aria-label="Back to stop list"
                      >
                        ← Back to stops
                      </button>
                    </div>
                    <ToolWorkspace
                      key={`workspace-${activeStage.id}-${activeTool.name}`}
                      stageId={activeStage.id}
                      toolIndex={activeToolIndex}
                      toolName={activeTool.name}
                      profile={clientProfile}
                      onUpdate={updateProfile}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
