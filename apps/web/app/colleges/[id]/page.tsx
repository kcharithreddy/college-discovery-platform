import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CollegeLogo } from '@/components/CollegeLogo';
import { ReviewSection } from '@/components/ReviewSection';
import { API_URL, College, NOT_AVAILABLE, formatFees, formatLpa, formatPercent } from '@/lib/api';
import { buildBeforeYouJoin, JOINING_CHECKLIST } from '@/lib/beforeYouJoin';

async function getCollege(id: string): Promise<College | null> {
  const res = await fetch(`${API_URL}/colleges/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load college');
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const college = await getCollege(params.id);
  return { title: college ? `${college.name} — fees, placements, campus life | CollegeFinder` : 'College not found' };
}

const SECTIONS = [
  ['overview', 'Overview'],
  ['courses', 'Courses & fees'],
  ['placements', 'Placements'],
  ['infrastructure', 'Infrastructure'],
  ['campus-life', 'Campus life'],
  ['sports', 'Sports'],
  ['before-you-join', 'Before you join'],
  ['reviews', 'Student reviews']
] as const;

const card = 'rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900';

export default async function CollegeDetail({ params }: { params: { id: string } }) {
  const college = await getCollege(params.id);
  if (!college) notFound();

  const faqs = buildBeforeYouJoin(college);
  const showCourseFees = college.courses?.some(c => c.fees > 0) ?? false;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/" className="text-sm font-semibold text-blue-700 dark:text-blue-400">← Back to colleges</Link>

      {/* Header */}
      <section className={`mt-4 ${card} md:p-8`}>
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <div className="mb-4"><CollegeLogo college={college} size="lg" /></div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">{college.type}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">{college.ownership}</span>
              {college.established && <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">Est. {college.established}</span>}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl dark:text-slate-100">{college.name}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">📍 {college.city}, {college.state}</p>
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400">
                Official website ↗
              </a>
            )}
          </div>
          <div className="flex gap-3 self-start">
            <HeaderStat
              tone="amber"
              label={college.nirfYear ? `NIRF ${college.nirfYear}` : 'NIRF rank'}
              value={college.nirfRank ? `#${college.nirfRank}` : '—'}
              hint={college.nirfScore ? `Score ${college.nirfScore}` : college.nirfRank ? undefined : 'Not ranked / not added'}
            />
            <HeaderStat
              tone="green"
              label="Student rating"
              value={college.rating != null ? `⭐ ${college.rating}` : '—'}
              hint={`${college.reviewCount} review${college.reviewCount === 1 ? '' : 's'}`}
            />
          </div>
        </div>
      </section>

      {/* Section navigation */}
      <nav aria-label="Sections" className="z-[5] md:sticky md:top-[73px] -mx-4 mt-6 overflow-x-auto bg-slate-50/95 px-4 py-2 backdrop-blur dark:bg-slate-950/95">
        <ul className="flex gap-2 whitespace-nowrap text-sm font-semibold">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="inline-block rounded-full border bg-white px-3 py-1.5 hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="overview" title="Overview">
        <p className="leading-7 text-slate-700 dark:text-slate-300">{college.overview}</p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Fact label="Entrance exam" value={college.exam} />
          <Fact label="Flagship course" value={college.course} />
          <Fact label="Campus size" value={college.campusAcres ? `${college.campusAcres} acres` : NOT_AVAILABLE} />
          <Fact label="Established" value={college.established ? String(college.established) : NOT_AVAILABLE} />
        </dl>
      </Section>

      <Section id="courses" title="Courses & fees">
        <dl className="grid gap-3 sm:grid-cols-3">
          <Fact label="Tuition / year (approx.)" value={formatFees(college.fees)} />
          <Fact label="Hostel + mess / year (approx.)" value={formatFees(college.hostelFees)} />
          <Fact label="Rank range" value={college.minRank != null && college.maxRank != null ? `${college.minRank.toLocaleString('en-IN')} – ${college.maxRank.toLocaleString('en-IN')}` : NOT_AVAILABLE} />
        </dl>
        {college.courses && college.courses.length > 0 && (
          <div className="mt-5 overflow-x-auto rounded-xl border dark:border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800"><tr><th className="p-3">Course</th><th className="p-3">Duration</th>{showCourseFees && <th className="p-3">Fees / year</th>}</tr></thead>
              <tbody>
                {college.courses.map(c => (
                  <tr key={c.id} className="border-t dark:border-slate-800">
                    <td className="p-3 font-semibold">{c.name}</td><td className="p-3">{c.duration}</td>{showCourseFees && <td className="p-3">{c.fees ? formatFees(c.fees) : NOT_AVAILABLE}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section id="placements" title="Placements">
        <dl className="grid gap-3 sm:grid-cols-3">
          <Fact label="Students placed" value={formatPercent(college.placementRate)} />
          <Fact label="Average package" value={formatLpa(college.averagePackage)} />
          <Fact label="Median package" value={formatLpa(college.medianPackage)} />
        </dl>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Placement numbers vary a lot by branch. Median salary is usually more honest than average — ask for the branch-wise report.
        </p>
      </Section>

      <Section id="infrastructure" title="Infrastructure">
        <dl className="mb-5 grid gap-3 sm:grid-cols-2">
          <Fact label="Hostel" value={college.hostelAvailable ? 'Available' : 'Not available'} />
          <Fact label="Campus size" value={college.campusAcres ? `${college.campusAcres} acres` : NOT_AVAILABLE} />
        </dl>
        <BulletList items={college.facilities} empty="Facility details have not been added for this college yet." />
      </Section>

      <Section id="campus-life" title="Campus life">
        {college.fests.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {college.fests.map(fest => <span key={fest} className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700 dark:bg-purple-950 dark:text-purple-300">🎉 {fest}</span>)}
          </div>
        )}
        <BulletList items={college.campusLife} empty="Campus life details have not been added yet. Student reviews below are the best guide." />
      </Section>

      <Section id="sports" title="Sports">
        <BulletList items={college.sports} empty="Sports facilities have not been added for this college yet." />
      </Section>

      <Section id="before-you-join" title="Before you join">
        <p className="text-slate-600 dark:text-slate-400">The questions students ask most before taking admission, answered from this college&apos;s data.</p>

        {(college.pros.length > 0 || college.cons.length > 0) && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ProsCons title="👍 Why students choose it" items={college.pros} tone="green" />
            <ProsCons title="⚠️ Things to consider" items={college.cons} tone="amber" />
          </div>
        )}

        <div className="mt-5 divide-y rounded-2xl border dark:divide-slate-800 dark:border-slate-800">
          {faqs.map(faq => (
            <details key={faq.question} className="group p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                {faq.question}
                <span className="text-slate-400 transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>

        <h3 className="mt-6 font-bold">Checklist before you pay the admission fee</h3>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {JOINING_CHECKLIST.map(item => (
            <li key={item} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/50"><span>✅</span><span>{item}</span></li>
          ))}
        </ul>
      </Section>

      <Section id="reviews" title="Student reviews">
        <ReviewSection collegeId={college.id} reviews={college.reviews ?? []} />
      </Section>

      <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
        {college.sourceNote ? `Data note: ${college.sourceNote} ` : ''}
        Last updated {new Date(college.updatedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}. Always confirm fees and cutoffs on the official website before applying.
      </p>
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`mt-6 scroll-mt-32 ${card}`}>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
      <dt className="text-sm text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className={`mt-1 font-bold ${value === NOT_AVAILABLE ? 'text-slate-400 dark:text-slate-500' : ''}`}>{value}</dd>
    </div>
  );
}

function HeaderStat({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone: 'amber' | 'green' }) {
  const colors = tone === 'amber'
    ? 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
    : 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300';
  return (
    <div className={`min-w-32 rounded-2xl p-4 ${colors}`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {hint && <p className="text-xs opacity-80">{hint}</p>}
    </div>
  );
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) return <p className="text-slate-500 dark:text-slate-400">{empty}</p>;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map(item => <li key={item} className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/50">{item}</li>)}
    </ul>
  );
}

function ProsCons({ title, items, tone }: { title: string; items: string[]; tone: 'green' | 'amber' }) {
  const colors = tone === 'green' ? 'bg-green-50 dark:bg-green-950/40' : 'bg-amber-50 dark:bg-amber-950/40';
  return (
    <div className={`rounded-2xl p-4 ${colors}`}>
      <h3 className="font-bold">{title}</h3>
      {items.length === 0
        ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Not added yet.</p>
        : <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{items.map(item => <li key={item}>{item}</li>)}</ul>}
    </div>
  );
}
