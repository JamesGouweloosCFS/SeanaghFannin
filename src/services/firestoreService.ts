import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  runTransaction,
  serverTimestamp,
  writeBatch,
  arrayUnion,
  query,
  orderBy,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions, isFirebaseConfigured } from '@/config/firebase';

export interface RegistrationRecord {
  uid: string;
  boardingPassNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  club: string;
  province: string;
  referralSource: string;
  pointsTotal: number;
  milestones: {
    boarded: boolean;
    checkedIn: boolean;
    onPlane: boolean;
    onMap: boolean;
  };
  referredBy?: string;
  referralRewarded?: boolean;
  referralBonusTotal?: number;
  referralCount?: number;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  redeemedCodes?: string[];
  puttingResult?: number;
  puttingRecorded?: boolean;
  privacyConsent?: boolean;
  marketingConsent?: boolean;
  isAdmin?: boolean;
}

export type MilestoneKey = 'checkedIn' | 'onPlane' | 'onMap';

export const MILESTONE_POINTS: Record<MilestoneKey, number> = {
  checkedIn: 75,
  onPlane: 200,
  onMap: 250,
};

export const VERIFICATION_POINTS = { email: 25, phone: 25 } as const;

export async function awardEmailVerification(uid: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  const ref = doc(db, 'registrations', uid);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists() || snap.data().emailVerified === true) return;
    tx.update(ref, {
      emailVerified: true,
      pointsTotal: increment(VERIFICATION_POINTS.email),
      emailVerifiedAt: serverTimestamp(),
    });
  });
}

export async function awardPhoneVerification(uid: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  const ref = doc(db, 'registrations', uid);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists() || snap.data().phoneVerified === true) return;
    tx.update(ref, {
      phoneVerified: true,
      pointsTotal: increment(VERIFICATION_POINTS.phone),
      phoneVerifiedAt: serverTimestamp(),
    });
  });
}

export interface BookingRecord {
  uid: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  hearAbout: string;
  situations: string[];
  assetValue: string;
  priorities: string[];
  priorityNote: string;
  marketingConsent?: boolean;
}

export async function writeRegistration(data: RegistrationRecord): Promise<string | null> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — registration write skipped');
    return null;
  }
  const { uid, ...rest } = data;
  await setDoc(doc(db, 'registrations', uid), {
    ...rest,
    uid,
    createdAt: serverTimestamp(),
  });
  return uid;
}

export async function updateUserMilestone(
  uid: string,
  milestone: MilestoneKey,
): Promise<void> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — milestone update skipped');
    return;
  }
  await updateDoc(doc(db, 'registrations', uid), {
    [`milestones.${milestone}`]: true,
    pointsTotal: increment(MILESTONE_POINTS[milestone]),
    [`${milestone}CompletedAt`]: serverTimestamp(),
  });
}

export async function writeBookingRequest(data: BookingRecord): Promise<string | null> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — booking write skipped');
    return null;
  }
  const ref = await addDoc(collection(db, 'bookingRequests'), {
    ...data,
    submittedAt: serverTimestamp(),
    status: 'new',
  });
  return ref.id;
}

export interface SessionRequestRecord {
  uid: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  format: string;
  timeSlots: { date: string; time: string }[];
  timezone: string;
}

export async function getBookedSlots(): Promise<Map<string, string>> {
  if (!isFirebaseConfigured) return new Map();
  const snap = await getDocs(collection(db, 'bookedSlots'));
  return new Map(snap.docs.map(d => [d.id, (d.data() as { uid: string }).uid]));
}

async function markSlotsBooked(slots: { date: string; time: string }[], uid: string | null): Promise<void> {
  if (!isFirebaseConfigured) return;
  const batch = writeBatch(db);
  for (const slot of slots) {
    batch.set(doc(db, 'bookedSlots', `${slot.date}_${slot.time}`), {
      date: slot.date,
      time: slot.time,
      uid,
      bookedAt: serverTimestamp(),
    });
  }
  await batch.commit();
}

export async function writeSessionRequest(data: SessionRequestRecord): Promise<string | null> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — session request write skipped');
    return null;
  }
  const ref = await addDoc(collection(db, 'sessionRequests'), {
    ...data,
    submittedAt: serverTimestamp(),
    status: 'new',
  });
  await markSlotsBooked(data.timeSlots, data.uid);
  return ref.id;
}

export interface AssessmentRecord {
  uid: string | null;
  firstName: string;
  lastName: string;
  email: string;
  primaryGoal: string;
  lifeStage: string;
  assetBase: string;
  investmentExperience: string;
  riskAttitude: string;
  wealthGoal: string;
  concerns: string[];
  hasAdvisor: string;
  hasFinancialPlan: string;
  readyToAct: string;
  notes: string;
}

const REFERRAL_CAP = 3;

export async function awardReferralBonus(
  referrerId: string,
  referredUid: string,
): Promise<void> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — referral bonus skipped');
    return;
  }
  const referrerRef = doc(db, 'registrations', referrerId);
  const referredRef = doc(db, 'registrations', referredUid);
  await runTransaction(db, async (tx) => {
    const referrerSnap = await tx.get(referrerRef);
    // Always mark this referral as processed to prevent re-attempts
    tx.update(referredRef, { referralRewarded: true });
    if (!referrerSnap.exists()) return;
    const count = (referrerSnap.data().referralCount ?? 0) as number;
    if (count >= REFERRAL_CAP) return;
    tx.update(referrerRef, {
      pointsTotal: increment(100),
      referralBonusTotal: increment(100),
      referralCount: increment(1),
    });
  });
}

export interface ContactSubmissionRecord {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  hearAbout: string;
  situations: string[];
  assetValue: string;
  priorities: string[];
  priorityNote: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

export async function writeContactSubmission(data: ContactSubmissionRecord): Promise<string | null> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — contact submission write skipped');
    return null;
  }
  const ref = await addDoc(collection(db, 'contactSubmissions'), {
    ...data,
    submittedAt: serverTimestamp(),
    status: 'new',
    source: 'contact_page',
  });
  return ref.id;
}

export async function saveDraft(
  uid: string,
  formKey: string,
  draft: { step: number; data: Record<string, unknown> },
): Promise<void> {
  if (!isFirebaseConfigured) return;
  await setDoc(doc(db, 'drafts', `${uid}_${formKey}`), {
    ...draft,
    uid,
    updatedAt: serverTimestamp(),
  });
}

export async function loadDraft(
  uid: string,
  formKey: string,
): Promise<{ step: number; data: Record<string, unknown> } | null> {
  if (!isFirebaseConfigured) return null;
  const snap = await getDoc(doc(db, 'drafts', `${uid}_${formKey}`));
  if (!snap.exists()) return null;
  const d = snap.data();
  return { step: d.step as number, data: d.data as Record<string, unknown> };
}

export async function clearDraft(uid: string, formKey: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  await deleteDoc(doc(db, 'drafts', `${uid}_${formKey}`));
}

export const PUTTING_POINTS = 100;

export type PuttingResult = 'success' | 'already_recorded';

export async function recordPuttingResult(uid: string, result: number): Promise<PuttingResult> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — putting result skipped');
    return 'success';
  }
  const ref = doc(db, 'registrations', uid);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (snap.exists() && snap.data().puttingRecorded === true) return 'already_recorded';
    tx.update(ref, {
      puttingResult: result,
      puttingRecorded: true,
      pointsTotal: increment(PUTTING_POINTS),
      puttingRecordedAt: serverTimestamp(),
    });
    return 'success';
  });
}

export type CouponResult = 'success' | 'invalid' | 'already_redeemed';

export async function redeemCouponCode(uid: string, code: string): Promise<CouponResult> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — coupon redemption skipped');
    return 'success';
  }
  const normalised = code.trim().toUpperCase();
  const codeRef = doc(db, 'promoCodes', normalised);
  const userRef = doc(db, 'registrations', uid);
  return runTransaction(db, async (tx) => {
    const [codeSnap, userSnap] = await Promise.all([tx.get(codeRef), tx.get(userRef)]);
    if (!codeSnap.exists() || codeSnap.data().active === false) return 'invalid';
    const redeemed = (userSnap.data()?.redeemedCodes ?? []) as string[];
    if (redeemed.includes(normalised)) return 'already_redeemed';
    const points = (codeSnap.data().points as number | undefined) ?? 0;
    tx.update(userRef, {
      redeemedCodes: arrayUnion(normalised),
      pointsTotal: increment(points),
    });
    return 'success';
  });
}

export async function writeAssessment(data: AssessmentRecord): Promise<string | null> {
  if (!isFirebaseConfigured) {
    console.warn('[dev] Firebase not configured — assessment write skipped');
    return null;
  }
  const ref = await addDoc(collection(db, 'assessments'), {
    ...data,
    submittedAt: serverTimestamp(),
    status: 'new',
  });
  return ref.id;
}

// ---------------------------------------------------------------------------
// Admin data types
// ---------------------------------------------------------------------------

type FsTimestamp = { toDate(): Date };

export interface AdminSessionRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  format: string;
  timeSlots: { date: string; time: string }[];
  timezone: string;
  status: string;
  submittedAt: FsTimestamp | null;
  confirmedSlot?: { date: string; time: string };
  confirmedAt?: FsTimestamp | null;
}

export interface AdminRegistration extends RegistrationRecord {
  id: string;
  createdAt?: FsTimestamp | null;
}

export interface AdminContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  assetValue: string;
  situations: string[];
  priorities: string[];
  priorityNote: string;
  submittedAt: FsTimestamp | null;
  status: string;
}

export interface AdminAssessment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryGoal: string;
  lifeStage: string;
  assetBase: string;
  readyToAct: string;
  submittedAt: FsTimestamp | null;
  status: string;
}

export interface AdminBooking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  assetValue: string;
  situations: string[];
  priorities: string[];
  submittedAt: FsTimestamp | null;
  status: string;
}

export interface AdminLeads {
  registrations: AdminRegistration[];
  sessionRequests: AdminSessionRequest[];
  contacts: AdminContact[];
  assessments: AdminAssessment[];
  bookings: AdminBooking[];
}

export async function fetchAdminLeads(): Promise<AdminLeads> {
  if (!isFirebaseConfigured) {
    return { registrations: [], sessionRequests: [], contacts: [], assessments: [], bookings: [] };
  }

  const [regsSnap, sessSnap, contactsSnap, assessSnap, bookSnap] = await Promise.all([
    getDocs(query(collection(db, 'registrations'),   orderBy('createdAt',   'desc'))),
    getDocs(query(collection(db, 'sessionRequests'), orderBy('submittedAt', 'desc'))),
    getDocs(query(collection(db, 'contactSubmissions'), orderBy('submittedAt', 'desc'))),
    getDocs(query(collection(db, 'assessments'),     orderBy('submittedAt', 'desc'))),
    getDocs(query(collection(db, 'bookingRequests'), orderBy('submittedAt', 'desc'))),
  ]);

  const registrations: AdminRegistration[] = regsSnap.docs.map(d => ({
    id: d.id,
    ...(d.data() as RegistrationRecord),
    createdAt: (d.data().createdAt ?? null) as FsTimestamp | null,
  }));

  const sessionRequests: AdminSessionRequest[] = sessSnap.docs.map(d => {
    const r = d.data() as Record<string, unknown>;
    return {
      id: d.id,
      firstName:    String(r['firstName'] ?? ''),
      lastName:     String(r['lastName'] ?? ''),
      email:        String(r['email'] ?? ''),
      phone:        String(r['phone'] ?? ''),
      format:       String(r['format'] ?? ''),
      timeSlots:    (r['timeSlots'] ?? []) as { date: string; time: string }[],
      timezone:     String(r['timezone'] ?? ''),
      status:       String(r['status'] ?? 'new'),
      submittedAt:  (r['submittedAt'] ?? null) as FsTimestamp | null,
      confirmedSlot: r['confirmedSlot'] as { date: string; time: string } | undefined,
      confirmedAt:  (r['confirmedAt'] ?? null) as FsTimestamp | null,
    };
  });

  const contacts: AdminContact[] = contactsSnap.docs.map(d => {
    const r = d.data() as Record<string, unknown>;
    return {
      id: d.id,
      firstName:    String(r['firstName'] ?? ''),
      lastName:     String(r['lastName'] ?? ''),
      email:        String(r['email'] ?? ''),
      phone:        String(r['phone'] ?? ''),
      assetValue:   String(r['assetValue'] ?? ''),
      situations:   (r['situations'] ?? []) as string[],
      priorities:   (r['priorities'] ?? []) as string[],
      priorityNote: String(r['priorityNote'] ?? ''),
      submittedAt:  (r['submittedAt'] ?? null) as FsTimestamp | null,
      status:       String(r['status'] ?? 'new'),
    };
  });

  const assessments: AdminAssessment[] = assessSnap.docs.map(d => {
    const r = d.data() as Record<string, unknown>;
    return {
      id: d.id,
      firstName:    String(r['firstName'] ?? ''),
      lastName:     String(r['lastName'] ?? ''),
      email:        String(r['email'] ?? ''),
      primaryGoal:  String(r['primaryGoal'] ?? ''),
      lifeStage:    String(r['lifeStage'] ?? ''),
      assetBase:    String(r['assetBase'] ?? ''),
      readyToAct:   String(r['readyToAct'] ?? ''),
      submittedAt:  (r['submittedAt'] ?? null) as FsTimestamp | null,
      status:       String(r['status'] ?? 'new'),
    };
  });

  const bookings: AdminBooking[] = bookSnap.docs.map(d => {
    const r = d.data() as Record<string, unknown>;
    return {
      id: d.id,
      firstName:  String(r['firstName'] ?? ''),
      lastName:   String(r['lastName'] ?? ''),
      email:      String(r['email'] ?? ''),
      phone:      String(r['phone'] ?? ''),
      assetValue: String(r['assetValue'] ?? ''),
      situations: (r['situations'] ?? []) as string[],
      priorities: (r['priorities'] ?? []) as string[],
      submittedAt:(r['submittedAt'] ?? null) as FsTimestamp | null,
      status:     String(r['status'] ?? 'new'),
    };
  });

  return { registrations, sessionRequests, contacts, assessments, bookings };
}

export async function callConfirmSession(
  requestId: string,
  confirmedSlot: { date: string; time: string },
): Promise<void> {
  if (!isFirebaseConfigured) throw new Error('Firebase not configured');
  const fn = httpsCallable(functions, 'confirmSession');
  await fn({ requestId, confirmedSlot });
}

export async function rejectSessionRequest(requestId: string, rejectedBy: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error('Firebase not configured');
  await updateDoc(doc(db, 'sessionRequests', requestId), {
    status: 'rejected',
    rejectedAt: serverTimestamp(),
    rejectedBy,
  });
}
