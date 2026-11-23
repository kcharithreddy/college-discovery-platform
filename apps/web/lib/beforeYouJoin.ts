import { College, formatFees, formatLpa } from '@/lib/api';

export type Faq = { question: string; answer: string };

/**
 * Answers to the questions students most often ask before joining a college.
 * Built only from the college's stored data plus general, well-established rules,
 * so nothing here is invented per college.
 */
export function buildBeforeYouJoin(college: College): Faq[] {
  const isCentral = college.type === 'IIT' || college.type === 'NIT' || college.type === 'IIIT';
  const faqs: Faq[] = [];

  faqs.push({
    question: 'Which exam and rank do I need?',
    answer: [
      admissionRoute(college),
      college.minRank != null && college.maxRank != null
        ? `In our data, students admitted here had ${college.exam} ranks roughly between ${college.minRank.toLocaleString('en-IN')} and ${college.maxRank.toLocaleString('en-IN')}. Cutoffs change every year and differ by branch, category and quota.`
        : 'We do not have cutoff ranks for this college yet.',
      isCentral ? 'Check the previous rounds\' opening and closing ranks on the official JoSAA website.' : 'Check last year\'s cutoffs on the official counselling or admissions website.'
    ].join(' ')
  });

  const total = college.fees != null && college.hostelFees != null ? college.fees + college.hostelFees : null;
  faqs.push({
    question: 'How much will it cost per year?',
    answer: college.fees == null
      ? 'Fee details are not available yet. Ask for the full fee structure, including one-time admission and caution deposits.'
      : `Tuition is about ${formatFees(college.fees)} a year${college.hostelFees != null ? ` and hostel + mess about ${formatFees(college.hostelFees)}` : ''}${total ? `, so roughly ${formatFees(total)} a year in total` : ''}. Budget extra for books, a laptop, travel and one-time admission charges.`
  });

  faqs.push({
    question: 'Are scholarships or fee waivers available?',
    answer: isCentral
      ? 'Centrally funded institutes offer tuition fee waivers based on category and family income, and students can also apply for central and state scholarships through the National Scholarship Portal. Check the institute\'s fee page for the current income limits.'
      : college.ownership === 'Private'
        ? 'Private institutes usually offer merit scholarships based on entrance rank or board marks. Ask how the scholarship is renewed each year. Many need a minimum CGPA.'
        : 'Government colleges have low fees, and you can apply for central and state scholarships through the National Scholarship Portal and your state portal.'
  });

  faqs.push({
    question: 'Will I get a hostel room?',
    answer: college.hostelAvailable
      ? 'Yes, hostel accommodation is available on campus. Ask whether it is guaranteed for all four years, how rooms are shared in the first year, and what the mess food is like.'
      : 'This college does not list on-campus hostels. Budget for nearby PG or rental accommodation.'
  });

  faqs.push({
    question: 'How good are the placements, really?',
    answer: college.placementRate == null && college.averagePackage == null
      ? 'Placement data is not available yet. Ask the placement cell for a branch-wise report with the median package, not just the highest package.'
      : `About ${college.placementRate ?? '—'}% of students are placed, with an average package of ${formatLpa(college.averagePackage)}${college.medianPackage != null ? ` and a median of ${formatLpa(college.medianPackage)}` : ''}. Highest-package headlines are misleading. Ask for branch-wise median salaries and the number of students who sat for placements.`
  });

  faqs.push({
    question: 'Is ragging a problem? What can I do if it happens?',
    answer: 'Ragging is a punishable offence, and every college must have an anti-ragging committee and squad. If it happens, report it to the college authorities or the national anti-ragging helpline: 1800-180-5522 (toll-free, 24×7) or helpline@antiragging.in.'
  });

  return faqs;
}

function admissionRoute(college: College) {
  if (college.type === 'IIT') return 'Admission to IITs is through JEE Advanced, followed by JoSAA counselling.';
  if (college.type === 'NIT' || college.type === 'IIIT') return 'Admission is through JEE Main, followed by JoSAA/CSAB counselling.';
  return `Admission is through ${college.exam}.`;
}

export const JOINING_CHECKLIST = [
  'Confirm the college and course are approved by AICTE/UGC (check the official AICTE portal).',
  'Look up its current NIRF rank and how it has moved over the last few years.',
  'Talk to 2–3 current students or recent alumni of your branch, not just the admissions office.',
  'Ask for the full fee breakdown, including hostel, mess, exams and refund policy.',
  'Ask for branch-wise placement numbers with median salary.',
  'Visit the campus or take a virtual tour: hostels, labs, library and mess.',
  'Check attendance rules and how strict internal exams are.',
  'Find out how far the campus is from the nearest city, railway station and hospital.'
];
