import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { sendVerificationEmail } from '@/services/firebaseAuth';
import { awardEmailVerification, redeemCouponCode, recordPuttingResult } from '@/services/firestoreService';
import { SiteHeader } from '@/components/SiteHeader';
import { BrandLogo } from '@/components/BrandLogo';
import '@/styles/dashboard.css';

const MILESTONE_POINTS = {
  boarded: 50,
  checkedIn: 75,
  onPlane: 200,
  onMap: 250,
} as const;

type MilestoneStatus = 'complete' | 'current' | 'locked';

function getMilestoneStatus(
  key: keyof typeof MILESTONE_POINTS,
  milestones: { boarded: boolean; checkedIn: boolean; onPlane: boolean; onMap: boolean },
): MilestoneStatus {
  if (milestones[key]) return 'complete';

  // Determine if this is the "current" milestone (the first incomplete one in order)
  const order: Array<keyof typeof MILESTONE_POINTS> = ['boarded', 'checkedIn', 'onMap', 'onPlane'];
  const firstIncomplete = order.find((k) => !milestones[k]);
  if (firstIncomplete === key) return 'current';

  return 'locked';
}

function formatRegisteredDate(ts: unknown): string {
  if (!ts || typeof ts !== 'object') return '';
  const fireTs = ts as { seconds?: number };
  if (!fireTs.seconds) return '';
  return new Date(fireTs.seconds * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function completedMilestonesCount(milestones: { boarded: boolean; checkedIn: boolean; onPlane: boolean; onMap: boolean }): number {
  return [milestones.boarded, milestones.checkedIn, milestones.onPlane, milestones.onMap].filter(Boolean).length;
}

type TierResult = {
  tier: number;       // 0 = not eligible, 1–4 = tier
  entries: number;
  eligible: boolean;
  pointsTotal: number;
  pointsToNext: number;
};

function computeTier(profile: import('@/contexts/AuthContext').UserProfile): TierResult {
  const points = profile.pointsTotal ?? 0;
  if (points >= 1000) return { tier: 4, entries: 5, eligible: true,  pointsTotal: points, pointsToNext: 0 };
  if (points >= 900)  return { tier: 3, entries: 3, eligible: true,  pointsTotal: points, pointsToNext: 1000 - points };
  if (points >= 700)  return { tier: 2, entries: 2, eligible: true,  pointsTotal: points, pointsToNext: 900  - points };
  if (points >= 600)  return { tier: 1, entries: 1, eligible: true,  pointsTotal: points, pointsToNext: 700  - points };
  return                     { tier: 0, entries: 0, eligible: false, pointsTotal: points, pointsToNext: 600  - points };
}

export function DashboardPage() {
  const { user, profile, isAdvisor, loading, refreshProfile } = useAuth();

  if (!loading && isAdvisor) return <Navigate to="/admin" replace />;

  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [couponError, setCouponError] = useState('');

  const [puttingResult, setPuttingResult] = useState('');
  const [puttingStatus, setPuttingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [puttingError, setPuttingError] = useState('');

  const [emailCheckStatus, setEmailCheckStatus] = useState<'idle' | 'checking' | 'notVerified'>('idle');
  const [emailResent, setEmailResent] = useState(false);
  const [emailResendError, setEmailResendError] = useState('');

  useEffect(() => {
    if (!user || profile?.emailVerified) return;
    (async () => {
      try {
        await user.reload();
        if (user.emailVerified) {
          await awardEmailVerification(user.uid);
          await refreshProfile();
        }
      } catch { /* ignore */ }
    })();
  }, [user?.uid]);

  const handleCheckEmailVerified = async () => {
    if (!user) return;
    setEmailCheckStatus('checking');
    try {
      await user.reload();
      if (user.emailVerified) {
        await awardEmailVerification(user.uid);
        await refreshProfile();
      } else {
        setEmailCheckStatus('notVerified');
      }
    } catch {
      setEmailCheckStatus('notVerified');
    }
  };

  const handleResendEmail = async () => {
    if (!user || !profile) return;
    setEmailResendError('');
    try {
      await sendVerificationEmail(user, profile.firstName);
      setEmailResent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? '';
      setEmailResendError(
        code === 'auth/too-many-requests'
          ? 'Too many requests — please wait a few minutes and try again.'
          : 'Could not resend. Please try again shortly.'
      );
    }
  };

  const handleRedeemCoupon = async () => {
    if (!user || !couponCode.trim()) return;
    setCouponStatus('submitting');
    setCouponError('');
    const result = await redeemCouponCode(user.uid, couponCode.trim());
    if (result === 'success') {
      await refreshProfile();
      setCouponCode('');
      setCouponStatus('success');
    } else if (result === 'already_redeemed') {
      setCouponError('This code has already been redeemed on your account.');
      setCouponStatus('error');
    } else {
      setCouponError('That code is not valid. Please check and try again.');
      setCouponStatus('error');
    }
  };

  const handleRecordPutting = async () => {
    const value = Number(puttingResult);
    if (!user || puttingResult.trim() === '' || Number.isNaN(value)) return;
    setPuttingStatus('submitting');
    setPuttingError('');
    const result = await recordPuttingResult(user.uid, value);
    if (result === 'success') {
      await refreshProfile();
      setPuttingResult('');
      setPuttingStatus('success');
    } else {
      setPuttingError('You have already recorded your putting result.');
      setPuttingStatus('error');
    }
  };

  if (loading || !profile) {
    return <div className="portal-loading">Loading your dashboard...</div>;
  }

  const { milestones, firstName, lastName, province, pointsTotal } = profile;
  const fullName = `${firstName} ${lastName}`;
  const completedCount = completedMilestonesCount(milestones);
  const registeredDate = formatRegisteredDate((profile as unknown as Record<string, unknown>).createdAt);
  const tierResult = computeTier(profile);

  const journeyComplete = milestones.boarded && milestones.checkedIn && milestones.onMap && milestones.onPlane;

  // Next action (only used when journey is not complete)
  let nextActionText = '';
  let nextActionSub = '';
  let nextActionLabel = '';
  let nextActionHref = '';

  if (!milestones.checkedIn) {
    nextActionText = 'Complete the Clarity Check — Milestone 2 · Boarded earns 75 points';
    nextActionSub = 'Answer a short set of questions to help Seanagh understand your situation.';
    nextActionLabel = 'Start the Clarity Check →';
    nextActionHref = '/dashboard/clarity-check';
  } else if (!milestones.onMap) {
    nextActionText = 'Complete the Wealth Clarity Assessment — Milestone 3 · In the Air earns 250 points';
    nextActionSub = 'The final step before booking your session with Seanagh.';
    nextActionLabel = 'Complete the assessment →';
    nextActionHref = '/dashboard/assessment';
  } else if (!milestones.onPlane) {
    nextActionText = 'Book a conversation with Seanagh — Milestone 4 · Touching Down earns 200 points';
    nextActionSub = 'Schedule your Wealth Clarity session and take the final step toward Zambia.';
    nextActionLabel = 'Book a conversation →';
    nextActionHref = '/dashboard/book-session';
  }

  // Points remaining items
  const remainingItems: Array<{ name: string; pts: number }> = [];
  if (!milestones.checkedIn) remainingItems.push({ name: 'Boarded', pts: MILESTONE_POINTS.checkedIn });
  if (!milestones.onMap) remainingItems.push({ name: 'In the Air', pts: MILESTONE_POINTS.onMap });
  if (!milestones.onPlane) remainingItems.push({ name: 'Touching Down', pts: MILESTONE_POINTS.onPlane });

  const totalRemaining = remainingItems.reduce((acc, i) => acc + i.pts, 0);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: "'Roboto', sans-serif" }}>
      <SiteHeader />

      {/* Hero Band */}
      <div className="dash-hero">
        <div className="dh-inner">
          <div>
            <div className="dh-greeting">Welcome back,</div>
            <div className="dh-name">{fullName}</div>
            <div className="dh-subline">
              {province}
              {registeredDate ? ` · Registered ${registeredDate}` : ''}
            </div>
          </div>
          <div className="dh-points">
            <div className="dh-pts-label">Points earned</div>
            <div className="dh-pts-val">{pointsTotal}</div>
            <div className="dh-pts-sub">Milestone {completedCount} of 4 complete</div>
          </div>
        </div>
      </div>

      {/* Next Action Banner */}
      <div className="next-action">
        {journeyComplete ? (
          <>
            <div>
              <div className="na-label">Journey complete</div>
              <div className="na-text">You have qualified for Zambia.</div>
              <div className="na-sub">Boost your draw entries — refer a friend or redeem a coupon code.</div>
            </div>
            <div className="na-actions">
              <a href="#coupon-section" className="na-btn">Redeem a coupon →</a>
              <button
                className="na-btn na-btn--outline"
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/register?ref=${profile.uid}`)}
              >
                Copy referral link
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="na-label">Your next step</div>
              <div className="na-text">{nextActionText}</div>
              {nextActionSub && <div className="na-sub">{nextActionSub}</div>}
            </div>
            {nextActionLabel && nextActionHref && (
              <Link to={nextActionHref} className="na-btn">
                {nextActionLabel}
              </Link>
            )}
          </>
        )}
      </div>


      {/* Digital Boarding Pass */}
      <div className="pass-section">
        <p className="sec-kicker">Your boarding pass</p>
        <div className="digi-pass">
          <div className="dp-main">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <BrandLogo variant="blue" size="header" style={{ maxHeight: '28px', width: 'auto' }} />
              <div style={{ textAlign: 'right' }}>
                <div className="dp-pax-l">Passenger</div>
                <div className="dp-pax">{fullName}</div>
              </div>
            </div>
            <div className="dp-route">
              <div>
                <div className="dp-iata">RSA</div>
                <div className="dp-city">South Africa</div>
              </div>
              <div className="dp-aw">
                <div className="dp-al"></div>
                <div className="dp-wc-label">Wealth Clarity</div>
              </div>
              <div>
                <div className="dp-iata">LUN</div>
                <div className="dp-city">Lusaka, Zambia</div>
              </div>
            </div>
            <div className="dp-stamps">
              <div className="dp-stamps-label">Milestones</div>
              <div className="stamps-row">
                <div className={`stamp ${milestones.boarded ? 'done' : 'pending'}`}>
                  <div className="stamp-circle">{milestones.boarded ? '✓' : '○'}</div>
                  <span className="stamp-name">Checked-In</span>
                </div>
                <div className={`stamp ${milestones.checkedIn ? 'done' : 'pending'}`}>
                  <div className="stamp-circle">{milestones.checkedIn ? '✓' : '○'}</div>
                  <span className="stamp-name">Boarded</span>
                </div>
                <div className={`stamp ${milestones.onPlane ? 'done' : 'pending'}`}>
                  <div className="stamp-circle">{milestones.onPlane ? '✓' : '○'}</div>
                  <span className="stamp-name">In the Air</span>
                </div>
                <div className={`stamp ${milestones.onMap ? 'done' : 'pending'}`}>
                  <div className="stamp-circle">{milestones.onMap ? '✓' : '○'}</div>
                  <span className="stamp-name">Touching Down</span>
                </div>
              </div>
            </div>
            <div className="dp-det" style={{ marginTop: '10px' }}>
              <div>
                <div className="ddl">Class</div>
                <div className="ddv">Clarity First</div>
              </div>
              <div>
                <div className="ddl">Points</div>
                <div className="ddv">{pointsTotal}</div>
              </div>
              <div>
                <div className="ddl">Qualifying</div>
                <div className="ddv">31 Oct 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="milestones-section">
        <p className="sec-kicker">Your journey milestones</p>
        <div className="milestones">
          {/* Milestone 1: Checked-In */}
          {(() => {
            const status = getMilestoneStatus('boarded', milestones);
            return (
              <div className={`milestone ${status}`}>
                <span className="ms-status">
                  {status === 'complete' ? 'Complete' : status === 'current' ? 'Up next' : 'Locked'}
                </span>
                <div className="ms-num">01</div>
                <div className="ms-name">Checked-In</div>
                <div className="ms-action">Register your boarding pass</div>
                <div className="ms-pts">
                  {status === 'complete' ? '+50 points earned' : '+50 points on completion'}
                </div>
                {status === 'complete' && <button className="ms-btn done-btn">✓ Complete</button>}
                {status === 'locked' && <button className="ms-btn locked-btn">Locked</button>}
              </div>
            );
          })()}

          {/* Milestone 2: Boarded */}
          {(() => {
            const status = getMilestoneStatus('checkedIn', milestones);
            return (
              <div className={`milestone ${status}`}>
                <span className="ms-status">
                  {status === 'complete' ? 'Complete' : status === 'current' ? 'Up next' : 'Locked'}
                </span>
                <div className="ms-num">02</div>
                <div className="ms-name">Boarded</div>
                <div className="ms-action">Complete the Clarity Check</div>
                <div className="ms-pts">
                  {status === 'complete' ? '+75 points earned' : '+75 points on completion'}
                </div>
                {status === 'complete' && (
                  <>
                    <button className="ms-btn done-btn">✓ Complete</button>
                    <Link to="/dashboard/clarity-check?edit=true" className="ms-edit-link">Edit submission →</Link>
                  </>
                )}
                {status === 'current' && (
                  <Link to="/dashboard/clarity-check" className="ms-btn primary">
                    Start now →
                  </Link>
                )}
                {status === 'locked' && (
                  <button className="ms-btn locked-btn">Complete Milestone 1 first</button>
                )}
              </div>
            );
          })()}

          {/* Milestone 3: In the Air */}
          {(() => {
            const status = getMilestoneStatus('onMap', milestones);
            return (
              <div className={`milestone ${status}`}>
                <span className="ms-status">
                  {status === 'complete' ? 'Complete' : status === 'current' ? 'Up next' : 'Locked'}
                </span>
                <div className="ms-num">03</div>
                <div className="ms-name">In the Air</div>
                <div className="ms-action">Complete the Wealth Clarity Assessment</div>
                <div className="ms-pts">
                  {status === 'complete' ? '+250 points earned' : '+250 points on completion'}
                </div>
                {status === 'complete' && (
                  <>
                    <button className="ms-btn done-btn">✓ Complete</button>
                    <Link to="/dashboard/assessment?edit=true" className="ms-edit-link">Edit submission →</Link>
                  </>
                )}
                {status === 'current' && (
                  <Link to="/dashboard/assessment" className="ms-btn primary">
                    Begin assessment →
                  </Link>
                )}
                {status === 'locked' && (
                  <button className="ms-btn locked-btn">Complete Milestone 2 first</button>
                )}
              </div>
            );
          })()}

          {/* Milestone 4: Touching Down */}
          {(() => {
            const status = getMilestoneStatus('onPlane', milestones);
            return (
              <div className={`milestone ${status}`}>
                <span className="ms-status">
                  {status === 'complete' ? 'Complete' : status === 'current' ? 'Up next' : 'Locked'}
                </span>
                <div className="ms-num">04</div>
                <div className="ms-name">Touching Down</div>
                <div className="ms-action">Book and attend a clarity session with Seanagh</div>
                <div className="ms-pts">
                  {status === 'complete' ? '+200 points earned · Zambia qualified' : '+200 points · Zambia qualified'}
                </div>
                {status === 'complete' && (
                  <>
                    <button className="ms-btn done-btn">✓ Complete</button>
                    <Link to="/dashboard/book-session?edit=true" className="ms-edit-link">Edit submission →</Link>
                  </>
                )}
                {status === 'current' && (
                  <Link to="/dashboard/book-session" className="ms-btn primary">
                    Book now →
                  </Link>
                )}
                {status === 'locked' && (
                  <button className="ms-btn locked-btn">Complete Milestone 3 first</button>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Current Standing / Tier */}
      <div className="tier-section">
        <p className="sec-kicker">Current standing</p>
        <div className="tier-card">
          {!tierResult.eligible ? (
            <div className="tier-locked">
              <div className="tier-locked-title">No draw entry yet</div>
              <div className="tier-locked-sub">
                You need <strong>{tierResult.pointsToNext} more {tierResult.pointsToNext === 1 ? 'point' : 'points'}</strong> to earn your first draw entry into the Zambia competition.
              </div>
            </div>
          ) : (
            <>
              <div className="tier-card-inner">
                <div>
                  <div className="tier-name">Tier {tierResult.tier}</div>
                  <div className="tier-entries-text">
                    {tierResult.entries} {tierResult.entries === 1 ? 'entry' : 'entries'} into the Zambia draw
                  </div>
                </div>
                <div className="tier-badge">
                  <div className="tier-badge-label">Entries</div>
                  <div className="tier-badge-num">{tierResult.entries}</div>
                </div>
              </div>

              {/* Tier track */}
              <div className="tier-track">
                {[1, 2, 3, 4].map((t, i) => {
                  const past = t < tierResult.tier;
                  const active = t === tierResult.tier;
                  const entries = [1, 2, 3, 5][i];
                  return (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', flex: t < 4 ? 1 : 'none' }}>
                      <div className="tier-node">
                        <div className={`tier-node-dot${past ? ' filled' : active ? ' active' : ''}`}>
                          {past ? '✓' : t}
                        </div>
                        <div className={`tier-node-label${active ? ' active' : past ? ' past' : ''}`}>
                          {entries} {entries === 1 ? 'entry' : 'entries'}
                        </div>
                      </div>
                      {t < 4 && (
                        <div className={`tier-connector${past || active ? ' filled' : ''}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Next tier hint */}
              {tierResult.tier < 4 && (
                <div className="tier-next">
                  <span className="tier-next-label">Next:</span>{' '}
                  Earn <strong>{tierResult.pointsToNext} more {tierResult.pointsToNext === 1 ? 'point' : 'points'}</strong>{' '}
                  to reach <strong>Tier {tierResult.tier + 1} — {[2, 3, 5][tierResult.tier - 1]} draw {[2, 3, 5][tierResult.tier - 1] === 2 ? 'entries' : 'entries'}</strong>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Points Remaining */}
      <div className="points-remaining">
        {remainingItems.length > 0 ? (
          <>
            <div className="pr-title">Points remaining — {totalRemaining} to complete your journey</div>
            <div className="pr-list">
              {remainingItems.map((item) => (
                <div key={item.name} className="pr-item">
                  <span className="pr-item-name">{item.name}</span>
                  <span className="pr-item-pts">+{item.pts} points</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="pr-all-done">
            Congratulations — you have completed all milestones and qualified for the Zambia trip.
          </div>
        )}
      </div>

      {/* Referral & Coupon */}
      <div className="referral-section" id="referral-section">
        <p className="sec-kicker">Refer a friend</p>
        <div className="referral-card">
          <div className="referral-card__info">
            <div className="referral-card__title">Earn 100 bonus points per referral</div>
            <div className="referral-card__sub">
              Share your unique link. When someone registers and completes all 4 milestones, you earn 100 points automatically.
            </div>
            {(profile.referralBonusTotal ?? 0) > 0 && (
              <div className="referral-card__earned">
                +{profile.referralBonusTotal} referral bonus points earned
              </div>
            )}
          </div>
          <div className="referral-card__link-row">
            <input
              className="referral-card__input"
              readOnly
              value={`${window.location.origin}/register?ref=${profile.uid}`}
            />
            <button
              className="referral-card__copy"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/register?ref=${profile.uid}`);
              }}
            >
              Copy link
            </button>
          </div>
          <div className="referral-card__count">
            {(() => {
              const count = profile.referralCount ?? 0;
              const remaining = 3 - count;
              if (count >= 3) return 'Maximum referrals reached — 3 of 3 completed';
              return `${count} of 3 referrals completed · ${remaining} remaining`;
            })()}
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="coupon-section" id="coupon-section">
        <p className="sec-kicker">Redeem a coupon code</p>
        <div className="coupon-card">
          <div className="coupon-card__title">Have a coupon code?</div>
          <div className="coupon-card__sub">
            Enter your code below to boost your entry tier. Each valid code counts as one additional source toward a higher tier.
          </div>
          <div className="coupon-card__row">
            <input
              className="coupon-card__input"
              type="text"
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponStatus('idle'); setCouponError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleRedeemCoupon()}
              disabled={couponStatus === 'submitting'}
            />
            <button
              className="coupon-card__submit"
              onClick={handleRedeemCoupon}
              disabled={!couponCode.trim() || couponStatus === 'submitting'}
            >
              {couponStatus === 'submitting' ? 'Checking…' : 'Redeem'}
            </button>
          </div>
          {couponStatus === 'success' && (
            <div className="coupon-card__success">Code redeemed — your tier has been updated.</div>
          )}
          {couponStatus === 'error' && (
            <div className="coupon-card__error">{couponError}</div>
          )}
          {(profile.redeemedCodes ?? []).length > 0 && (
            <div className="coupon-card__redeemed">
              {(profile.redeemedCodes ?? []).length} coupon {(profile.redeemedCodes ?? []).length === 1 ? 'code' : 'codes'} redeemed
            </div>
          )}
        </div>
      </div>

      {/* Putting Result */}
      <div className="putting-section" id="putting-section">
        <p className="sec-kicker">Record a putting result</p>
        <div className="coupon-card">
          <div className="coupon-card__title">Been out on the green?</div>
          <div className="coupon-card__sub">
            Enter your putting result to earn 100 points. You can record your result once.
          </div>
          {profile.puttingRecorded ? (
            <div className="coupon-card__redeemed">
              Putting result recorded{typeof profile.puttingResult === 'number' ? `: ${profile.puttingResult}` : ''} — 100 points awarded.
            </div>
          ) : (
            <>
              <div className="coupon-card__row">
                <input
                  className="coupon-card__input"
                  type="number"
                  inputMode="numeric"
                  placeholder="Your result"
                  value={puttingResult}
                  onChange={(e) => { setPuttingResult(e.target.value); setPuttingStatus('idle'); setPuttingError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleRecordPutting()}
                  disabled={puttingStatus === 'submitting'}
                />
                <button
                  className="coupon-card__submit"
                  onClick={handleRecordPutting}
                  disabled={puttingResult.trim() === '' || puttingStatus === 'submitting'}
                >
                  {puttingStatus === 'submitting' ? 'Saving…' : 'Record'}
                </button>
              </div>
              {puttingStatus === 'success' && (
                <div className="coupon-card__success">Result recorded — 100 points added.</div>
              )}
              {puttingStatus === 'error' && (
                <div className="coupon-card__error">{puttingError}</div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Email Verification */}
      {!user?.emailVerified && profile?.emailVerified !== true && (
        <div className="verif-section">
          <p className="sec-kicker">Verify your email</p>
          <div className="verif-card">
            <div className="verif-card__title">Email address not yet verified</div>
            <div className="verif-card__sub">
              A verification link was sent to <strong>{profile.email}</strong>. Click it to confirm your email and earn 25 points.
            </div>
            <div className="verif-card__row">
              <button
                className="verif-card__btn"
                onClick={handleCheckEmailVerified}
                disabled={emailCheckStatus === 'checking'}
              >
                {emailCheckStatus === 'checking' ? 'Checking…' : "I've clicked the link — verify now"}
              </button>
              {!emailResent && (
                <button className="verif-card__resend" onClick={handleResendEmail}>
                  Resend email
                </button>
              )}
            </div>
            {emailCheckStatus === 'notVerified' && (
              <div className="verif-card__error">Not yet verified. Check your inbox or spam folder.</div>
            )}
            {emailResent && (
              <div className="verif-card__success">Email resent — check your inbox.</div>
            )}
            {emailResendError && (
              <div className="verif-card__error">{emailResendError}</div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

