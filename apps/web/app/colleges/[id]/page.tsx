import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen, Briefcase, Building, CalendarDays, ChevronRight, CircleHelp, ExternalLink, GraduationCap,
  Home, Info, Landmark, MapPin, MessageSquareText, PartyPopper, Ruler, Sparkles, Star, ThumbsDown, ThumbsUp, Trophy, Volleyball
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CollegeActions } from '@/components/CollegeActions';
import { CollegeLogo } from '@/components/CollegeLogo';
import { ReviewSection } from '@/components/ReviewSection';
import { API_URL, College, NOT_AVAILABLE, formatFees, formatLakh, formatLpa, formatPercent } from '@/lib/api';
import { buildBeforeYouJoin, JOINING_CHECKLIST } from '@/lib/beforeYouJoin';

async function getCollege(id: string): Promise<College | null> {
  const res = await fetch(`${API_URL}/colleges/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load college');
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const college = await getCollege(params.id);
  if (!college) return { title: 'College not found | CollegeFinder' };
  return {
    title: `${college.name}: fees, placements, campus life | CollegeFinder`,
    description: `${college.name}, ${college.city}: NIRF rank, fees, placements, hostels, campus life and student reviews.`
  };
}

const SECTIONS: [string, string][] = [
  ['overview', 'Overview'],
  ['courses', 'Courses & fees'],
  ['placements', 'Placements'],
  ['infrastructure', 'Infrastructure'],
  ['campus-life', 'Campus life'],
  ['sports', 'Sports'],
  ['before-you-join', 'Before you join'],
  ['reviews', 'Reviews']
];

export default async function CollegeDetail({ params }: { params: { id: string } }) {
  const college = await getCollege(params.id);
  if (!college) notFound();

  const faqs = buildBeforeYouJoin(college);
  const showCourseFees = college.courses?.some(c => c.fees > 0) ?? false;
  const pay = college.medianPackage ?? college.averagePackage;

  return (
    <main>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line bg-surface">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_20rem_at_0%_0%,theme(colors.brand.100),transparent)] dark:bg-[radial-gradient(50rem_20rem_at_0%_0%,theme(colors.brand.950),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-sub">
            <Link href="/" className="hover:text-ink">Colleges</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/?state=${encodeURIComponent(college.state)}`} className="hover:text-ink">{college.state}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-ink">{college.name}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <CollegeLogo college={college} size="lg" />
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-200">{college.type}</span>
                <span className="chip bg-muted text-sub">{college.ownership}</span>
                {college.established && <span className="chip bg-muted text-sub">Est. {college.established}</span>}
              </div>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{college.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sub">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {college.city}, {college.state}</span>
                {college.website && (
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-semibold text-brand-600 hover:underline dark:text-brand-300">
                    Official website <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </p>
            </div>
            <CollegeActions college={college} />
          </div>

          {/* Key numbers */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            <KeyStat icon={Trophy} label={college.nirfYear ? `NIRF ${college.nirfYear}` : 'NIRF rank'} value={college.nirfRank ? `#${college.nirfRank}` : NOT_AVAILABLE} accent />
            <KeyStat icon={Briefcase} label={college.medianPackage != null ? 'Median pay' : 'Average pay'} value={formatLpa(pay)} />
            <KeyStat icon={GraduationCap} label="Students placed" value={formatPercent(college.placementRate)} />
            <KeyStat icon={Landmark} label="Tuition / year" value={formatLakh(college.fees)} />
            <KeyStat icon={Star} label="Student rating" value={college.rating != null ? `${college.rating} / 5` : 'No reviews yet'} soft={college.rating == null} wide />
          </dl>
        </div>
      </header>

      {/* Section tabs */}
      <nav aria-label="Sections" className="sticky top-16 z-10 border-b border-line bg-page/85 backdrop-blur-xl max-md:top-[109px]">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm font-semibold">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block whitespace-nowrap rounded-lg px-3 py-1.5 text-sub transition hover:bg-muted hover:text-ink">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-6">
          <Section id="overview" icon={BookOpen} title="Overview">
            <p className="text-[17px] leading-8 text-sub">{college.overview}</p>
          </Section>

          <Section id="courses" icon={GraduationCap} title="Courses & fees">
            <dl className="grid gap-3 sm:grid-cols-3">
              <Fact label="Tuition / year" value={formatFees(college.fees)} />
              <Fact label="Hostel + mess / year" value={formatFees(college.hostelFees)} />
              <Fact label="Rank range" value={college.minRank != null && college.maxRank != null ? `${college.minRank.toLocaleString('en-IN')} – ${college.maxRank.toLocaleString('en-IN')}` : NOT_AVAILABLE} />
            </dl>
            {college.courses && college.courses.length > 0 && (
              <div className="mt-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-xs uppercase tracking-wide text-faint">
                    <tr><th className="px-4 py-3">Programme</th><th className="px-4 py-3">Duration</th>{showCourseFees && <th className="px-4 py-3">Fees / year</th>}</tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {college.courses.map(c => (
                      <tr key={c.id} className="transition hover:bg-muted/60">
                        <td className="px-4 py-3 font-semibold">{c.name}</td>
                        <td className="px-4 py-3 text-sub">{c.duration}</td>
                        {showCourseFees && <td className="px-4 py-3">{c.fees ? formatFees(c.fees) : NOT_AVAILABLE}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Section>

          <Section id="placements" icon={Briefcase} title="Placements">
            <dl className="grid gap-3 sm:grid-cols-3">
              <Fact label="Students placed" value={formatPercent(college.placementRate)} big />
              <Fact label="Median package" value={formatLpa(college.medianPackage)} big />
              <Fact label="Average package" value={formatLpa(college.averagePackage)} big />
            </dl>
            {college.placementRate != null && (
              <div className="mt-5">
                <div className="flex justify-between text-xs font-semibold text-faint"><span>Placement rate</span><span>{college.placementRate}%</span></div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: `${Math.min(college.placementRate, 100)}%` }} />
                </div>
              </div>
            )}
            <Callout>Placement numbers vary a lot by branch. The median salary is more honest than the average or the &ldquo;highest package&rdquo;, so ask for the branch-wise report.</Callout>
          </Section>

          <Section id="infrastructure" icon={Building} title="Infrastructure">
            <dl className="mb-5 grid gap-3 sm:grid-cols-2">
              <Fact label="Hostel" value={college.hostelAvailable ? 'Available on campus' : 'Not available'} />
              <Fact label="Campus size" value={college.campusAcres ? `${college.campusAcres} acres` : NOT_AVAILABLE} />
            </dl>
            <FeatureList items={college.facilities} empty="Facility details haven't been added for this college yet." />
          </Section>

          <Section id="campus-life" icon={Sparkles} title="Campus life">
            {college.fests.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {college.fests.map(fest => (
                  <span key={fest} className="chip bg-violet-50 px-3 py-1.5 text-sm text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">
                    <PartyPopper className="h-4 w-4" /> {fest}
                  </span>
                ))}
              </div>
            )}
            <FeatureList items={college.campusLife} empty="Campus life details haven't been added yet. Student reviews below are the best guide." />
          </Section>

          <Section id="sports" icon={Volleyball} title="Sports">
            <FeatureList items={college.sports} empty="Sports facilities haven't been added for this college yet." />
          </Section>

          <Section id="before-you-join" icon={CircleHelp} title="Before you join">
            <p className="text-sub">The questions students ask most before taking admission, answered from this college&apos;s data.</p>

            {(college.pros.length > 0 || college.cons.length > 0) && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <ProsCons title="Why students choose it" icon={ThumbsUp} items={college.pros} tone="good" />
                <ProsCons title="Things to consider" icon={ThumbsDown} items={college.cons} tone="warn" />
              </div>
            )}

            <div className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
              {faqs.map(faq => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 font-semibold transition hover:bg-muted/60">
                    {faq.question}
                    <ChevronRight className="h-4 w-4 shrink-0 text-faint transition group-open:rotate-90" />
                  </summary>
                  <p className="px-4 pb-4 leading-7 text-sub">{faq.answer}</p>
                </details>
              ))}
            </div>

            <h3 className="mt-8 text-lg font-bold">Checklist before you pay the admission fee</h3>
            <ol className="mt-3 grid gap-2 md:grid-cols-2">
              {JOINING_CHECKLIST.map((item, i) => (
                <li key={item} className="flex gap-3 rounded-xl bg-muted p-3 text-sm leading-6">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="reviews" icon={MessageSquareText} title="Student reviews">
            <ReviewSection collegeId={college.id} reviews={college.reviews ?? []} />
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-[7.5rem] lg:self-start">
          <div className="card p-5">
            <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-faint">Quick facts</h2>
            <dl className="mt-3 divide-y divide-line text-sm">
              <SideFact icon={Landmark} label="Type" value={`${college.type} · ${college.ownership}`} />
              <SideFact icon={CalendarDays} label="Established" value={college.established ? String(college.established) : '—'} />
              <SideFact icon={GraduationCap} label="Entrance exam" value={college.exam} />
              <SideFact icon={Home} label="Hostel" value={college.hostelAvailable ? 'Yes' : 'No'} />
              <SideFact icon={Ruler} label="Campus" value={college.campusAcres ? `${college.campusAcres} acres` : '—'} />
              <SideFact icon={BookOpen} label="Programmes" value={String(college.courses?.length ?? 0)} />
            </dl>
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4 w-full">
                Visit official website <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="flex items-center gap-2 font-bold"><Info className="h-4 w-4" /> About this data</p>
            <p className="mt-2">{college.sourceNote ?? 'Figures come from public sources.'}</p>
            <p className="mt-2 text-xs opacity-80">Updated {new Date(college.updatedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}. Always confirm fees and cutoffs on the official website.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Section({ id, icon: Icon, title, children }: { id: string; icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="card scroll-mt-32 p-6 md:p-7">
      <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"><Icon className="h-5 w-5" /></span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function KeyStat({ icon: Icon, label, value, accent, soft, wide }: { icon: LucideIcon; label: string; value: string; accent?: boolean; soft?: boolean; wide?: boolean }) {
  const missing = value === NOT_AVAILABLE || soft;
  return (
    <div className={`bg-surface p-4 ${wide ? 'col-span-2 sm:col-span-1' : ''}`}>
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-faint">
        <Icon className={`h-3.5 w-3.5 ${accent ? 'text-amber-500' : ''}`} /> {label}
      </dt>
      <dd className={`mt-1.5 font-display text-2xl font-extrabold ${missing ? 'text-base font-semibold text-faint' : ''}`}>{value}</dd>
    </div>
  );
}

function Fact({ label, value, big }: { label: string; value: string; big?: boolean }) {
  const missing = value === NOT_AVAILABLE;
  return (
    <div className="rounded-xl bg-muted p-4">
      <dt className="text-sm text-sub">{label}</dt>
      <dd className={`mt-1 font-bold ${big && !missing ? 'font-display text-2xl' : ''} ${missing ? 'font-medium text-faint' : ''}`}>{value}</dd>
    </div>
  );
}

function SideFact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="flex items-center gap-2 text-sub"><Icon className="h-4 w-4 text-faint" /> {label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

function FeatureList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) return <p className="rounded-xl border border-dashed border-line p-4 text-sm text-faint">{empty}</p>;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(item => (
        <li key={item} className="flex gap-3 rounded-xl border border-line p-3.5 text-sm leading-6">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProsCons({ title, icon: Icon, items, tone }: { title: string; icon: LucideIcon; items: string[]; tone: 'good' | 'warn' }) {
  const colors = tone === 'good'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100'
    : 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100';
  return (
    <div className={`rounded-xl border p-5 ${colors}`}>
      <h3 className="flex items-center gap-2 font-sans font-bold"><Icon className="h-4 w-4" /> {title}</h3>
      {items.length === 0
        ? <p className="mt-2 text-sm opacity-70">Not added yet.</p>
        : <ul className="mt-3 space-y-2 text-sm leading-6">{items.map(item => <li key={item} className="flex gap-2"><span aria-hidden>•</span>{item}</li>)}</ul>}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 flex gap-2 rounded-xl bg-muted p-4 text-sm leading-6 text-sub"><Info className="mt-0.5 h-4 w-4 shrink-0" />{children}</p>;
}
