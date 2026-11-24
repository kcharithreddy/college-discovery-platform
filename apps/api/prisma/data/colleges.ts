/**
 * College seed data.
 *
 * Optional fields can be left out: the UI shows "Not available" instead of guessing.
 * When adding or updating a college, say where the figures came from in `sourceNote`
 * (for example "NIRF 2025 data submission + official website, checked Nov 2026").
 */

export type CollegeSeed = {
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  ownership: 'Government' | 'Private';
  established?: number;
  campusAcres?: number;
  website?: string;
  /** Logo file in apps/web/public/logos, e.g. '/logos/iit-madras.png' (from the college's official website). */
  logo?: string;
  overview: string;
  nirfRank?: number;
  nirfScore?: number;
  nirfYear?: number;
  course: string;
  exam: string;
  minRank?: number;
  maxRank?: number;
  fees?: number;
  hostelFees?: number;
  placementRate?: number;
  averagePackage?: number;
  medianPackage?: number;
  hostelAvailable?: boolean;
  facilities?: string[];
  campusLife?: string[];
  sports?: string[];
  fests?: string[];
  pros?: string[];
  cons?: string[];
  courses: { name: string; duration: string; fees?: number }[];
  sourceNote?: string;
};

const UNVERIFIED = 'Fees, placement and cutoff figures are sample values and have not been verified yet.';

export const colleges: CollegeSeed[] = [
  {
    name: "IIT Delhi", slug: "iit-delhi", city: "New Delhi", state: "Delhi",
    nirfRank: 2, nirfScore: 85.74, nirfYear: 2025,
    // Source: official IIT Delhi website (home.iitd.ac.in: About, Why IIT Delhi, Facilities). Checked 24 Nov 2026.
    type: "IIT", ownership: "Government", established: 1961, website: "https://home.iitd.ac.in",
    logo: "/logos/iit-delhi.png",
    overview: "IIT Delhi began in 1961 as a College of Engineering set up with the help of the UK government. It was declared an Institution of National Importance under the Institutes of Technology (Amendment) Act, 1963, renamed Indian Institute of Technology Delhi, and made a deemed university that sets its own academic policy and awards its own degrees. More than 15,700 students have graduated from it with a B.Tech, and nearly 5,070 with a PhD.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 75, medianPackage: 19.08,
    hostelAvailable: true,
    facilities: [
      "677 faculty members and 2,866 full-time PhD scholars (NIRF 2025 data)",
      "₹367 crore of sponsored research across 1,006 projects in 2023-24",
      "Central Research Facility and Nanoscale Research Facility",
      "Central Workshop and DAILAB",
      "High Performance Computing facility",
      "Campus child care services"
    ],
    campusLife: [
      "Student clubs such as the Robotics Club and the Automobile Club",
      "Board for Student Welfare with student counselling services"
    ],
    pros: [
      "Of 946 B.Tech students graduating in 2023-24, 711 were placed and 49 went on to higher studies",
      "Median B.Tech salary of ₹19.08 lakh (2023-24 graduates)",
      "More than 15,700 B.Tech graduates and nearly 5,070 PhDs since it started",
      "Research facilities for nanoscale work and high-performance computing on campus",
      "Located in the national capital"
    ],
    cons: [
      "Fees and hostel details are on separate IIT Delhi sites, so check them during admission"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Delhi website (About, Why IIT Delhi, Facilities) and its NIRF 2025 Engineering data submission (students graduating in 2023-24). Placement % = students placed ÷ students graduating. Fees, hostel and sports details were not in these sources. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    // Source: official IIT Bombay website (iitb.ac.in) + IIT Bombay NIRF 2026 Engineering data submission. Checked 24 Nov 2026.
    name: "IIT Bombay", slug: "iit-bombay", city: "Mumbai", state: "Maharashtra",
    nirfRank: 3, nirfScore: 83.65, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1958, website: "https://www.iitb.ac.in",
    logo: "/logos/iit-bombay.png", campusAcres: 494,
    overview: "Established in 1958 with support from UNESCO and the government of the USSR, IIT Bombay was declared an Institution of National Importance by an Act of Parliament in 1961. It is a fully residential campus of 200 hectares in Powai, Mumbai, with 17 academic departments plus schools of design, management and entrepreneurship. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 72, medianPackage: 20.21,
    hostelAvailable: true,
    facilities: [
      "792 faculty members and 3,523 full-time PhD scholars (NIRF 2025 data)",
      "₹592 crore of sponsored research across 1,572 projects in 2023-24",
      "Fully residential campus with hostels, dining, sports and recreational facilities",
      "On-campus hospital, cafeterias and e-buggies for getting around",
      "Central Library and a Student Wellness Centre",
      "SINE incubator and the Desai Sethi School of Entrepreneurship for student startups",
      "IDC School of Design and Shailesh J. Mehta School of Management on campus",
      "17 academic departments and research centres including Machine Intelligence & Data Science and Semiconductor Technologies",
      "Schools and a day-care facility on campus for residents"
    ],
    campusLife: [
      "Mood Indigo, one of India's best-known college cultural festivals",
      "Student teams such as IIT Bombay Racing, double champions at Formula Student Portugal 2026",
      "Green campus in Powai, away from the busier parts of Mumbai",
      "Women Students' cell and a Student Wellness Centre for support"
    ],
    sports: [
      "Internal sports: badminton, table tennis, chess and yoga",
      "External sports: basketball, football, hockey, volleyball and more",
      "Sports facilities are run by students and also open to faculty and staff",
      "Institute events such as National Sports Day"
    ],
    fests: ["Mood Indigo (cultural)"],
    pros: [
      "Of 1,017 B.Tech students graduating in 2024-25, 730 were placed and 287 went on to higher studies",
      "Median B.Tech salary of ₹20.21 lakh (2024-25 graduates)",
      "Design, management and entrepreneurship schools on the same campus",
      "Large green campus in Powai, Mumbai"
    ],
    cons: [
      "72% of graduates took jobs; most of the rest went for higher studies, so check your branch's numbers",
      "Fee amounts are published on the academic website, so confirm them during admission"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Bombay website (About, Why IITB, Sports, Academic units) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and the full programme list were not on these pages. Faculty and research figures are from its NIRF 2025 data submission. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Tiruchirappalli", slug: "nit-trichy", city: "Tiruchirappalli", state: "Tamil Nadu",
    nirfRank: 9, nirfScore: 68.14, nirfYear: 2025,
    // Source: official NIT Trichy website (nitt.edu) + NIT Trichy NIRF 2026 Engineering data submission. Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1964, website: "https://www.nitt.edu",
    logo: "/logos/nit-trichy.jpg",
    overview: "Started on 13 July 1964 as Regional Engineering College Tiruchirappalli, a joint venture of the Government of India and the Government of Tamil Nadu, it became a deemed university and was renamed NIT in 2003, and was made an Institution of National Importance by an Act of Parliament in 2007. The campus is at Thuvakudi on the Trichy–Tanjore highway, 17 km from Trichy Railway Junction, near the river Cauvery. Undergraduate admission is through JEE (Main) and JoSAA/CSAB counselling.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 75, medianPackage: 14.01,
    hostelAvailable: true,
    facilities: [
      "On-campus hospital with 24×7 casualty, ambulance and pharmacy, in-house X-ray, ultrasound and Doppler scans, physiotherapy and a dental chair",
      "Central Library with 2.5 lakh+ documents, 13,000+ e-journals, a 30-seat Digital Knowledge Centre and Wi-Fi throughout",
      "Hostels and messes for students, with a hostel rule book and fees published each semester",
      "Lecture Hall Complex (Orion), Central Workshop and Computer Support Group",
      "Shopping centre, transport, guest house and campus security"
    ],
    campusLife: [
      "Office of the First Year Coordinator to help new students settle in",
      "18 departments offering B.Tech, B.Arch, B.Sc. B.Ed., M.Tech, MBA, MCA and PhD programmes",
      "Training and Placement office for internships and jobs"
    ],
    sports: ["Physical Education department and Sports Center on campus"],
    pros: [
      "Of 981 B.Tech students graduating in 2024-25, 738 were placed and 159 went on to higher studies",
      "Median B.Tech salary of ₹14.01 lakh (2024-25 graduates)",
      "Round-the-clock hospital on campus with imaging funded by the alumni association",
      "Nine B.Tech branches plus B.Arch to choose from"
    ],
    cons: [
      "The campus is about 17 km from Trichy Railway Junction",
      "Fee amounts are published as semester circulars, so confirm the latest during admission"
    ],
    courses: [
      { name: "B.Tech Chemical Engineering", duration: "4 years" },
      { name: "B.Tech Civil Engineering", duration: "4 years" },
      { name: "B.Tech Computer Science and Engineering", duration: "4 years" },
      { name: "B.Tech Electrical and Electronics Engineering", duration: "4 years" },
      { name: "B.Tech Electronics and Communication Engineering", duration: "4 years" },
      { name: "B.Tech Instrumentation and Control Engineering", duration: "4 years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 years" },
      { name: "B.Tech Metallurgical and Materials Engineering", duration: "4 years" },
      { name: "B.Tech Production Engineering", duration: "4 years" },
      { name: "B.Arch", duration: "5 years" }
    ],
    sourceNote: "From the official NIT Trichy website (About, At a Glance, Programmes, Hostels, Hospital, Library) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "BITS Pilani", slug: "bits-pilani", city: "Pilani", state: "Rajasthan",
    nirfRank: 11, nirfScore: 67.02, nirfYear: 2025,
    // Source: official BITS Pilani website (bits-pilani.ac.in) + BITS NIRF 2025 Engineering data submission. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1964, website: "https://www.bits-pilani.ac.in",
    logo: "/logos/bits-pilani.webp", campusAcres: 328,
    overview: "BITS Pilani grew from a small school started in the early 1900s by industrialist G.D. Birla into a group of colleges that merged in 1964 to form the Birla Institute of Technology and Science. Its flagship Vidya Vihar campus near Pilani, Rajasthan, is a self-contained, wooded 328-acre campus. BITS admits undergraduates only on merit through its own online exam, BITSAT, and every student does a structured semester-long industry engagement.",
    course: "B.E. Computer Science", exam: "BITSAT",
    placementRate: 89, medianPackage: 18.0,
    hostelAvailable: true,
    facilities: [
      "Self-contained 328-acre wooded campus at Vidya Vihar, Pilani",
      "Library complex of 65,000 sq ft with more than 2,30,000 books and manuscripts",
      "Departments of Computer Science, Electrical & Electronics, Chemical, Civil, Mechanical and more, plus sciences, economics and management"
    ],
    campusLife: [
      "Semester-long structured industry engagement for every student",
      "Strong entrepreneurship culture: many students start and fund companies while still studying",
      "Students from all over India admitted on merit"
    ],
    pros: [
      "Of 2,759 graduates in 2023-24 (all campuses), 2,458 were placed and 283 went on to higher studies",
      "Median salary of ₹18 lakh for 2023-24 graduates",
      "Describes its admission policy as 'Merit Only', through the online BITSAT exam",
      "Campuses in Pilani, Goa, Hyderabad, Dubai and Mumbai"
    ],
    cons: [
      "Pilani is a small town in Rajasthan, far from a big city",
      "Private university fees, so check the current fee structure before applying",
      "Placement figures cover all BITS campuses together, not Pilani alone"
    ],
    courses: [{ name: "B.E. Computer Science", duration: "4 years" }],
    sourceNote: "From the official BITS Pilani website (About, Legacy) and its NIRF 2025 Engineering data submission, which covers all BITS campuses. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "VIT Vellore", slug: "vit-vellore", city: "Vellore", state: "Tamil Nadu",
    nirfRank: 16, nirfScore: 65.25, nirfYear: 2025,
    // Source: official VIT website (vit.ac.in) + VIT NIRF 2026 Engineering data submission. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1984, website: "https://vit.ac.in",
    logo: "/logos/vit-vellore-on-dark.webp", campusAcres: 372,
    overview: "VIT was founded in 1984 as a self-financing institution called Vellore Engineering College and was given university status by the Union Ministry of Human Resource Development in 2001, under Section 3 of the UGC Act, 1956. Its 372-acre Vellore campus has students from across India and abroad, and it has exchange agreements with international universities. Admission is through VITEEE.",
    course: "B.Tech Computer Science and Engineering", exam: "VITEEE",
    placementRate: 59, medianPackage: 6.0,
    hostelAvailable: true,
    facilities: [
      "372-acre campus with specialised academic blocks including MB, GDN, CDMM, SMV, CBMR, TT, SJT and Gandhi Block",
      "Anna Auditorium seating 1,800, plus the Channa Reddy, Ambedkar, Kamaraj and Era Sezhiyan auditoriums",
      "Fully furnished labs in every building and conference facilities for national and international events",
      "Campus network covering the library, computer labs, hostels and guest houses"
    ],
    campusLife: [
      "Cosmopolitan campus with students from across India and other countries",
      "Exchange programmes and joint research with international partner universities",
      "Regular national and international conferences, symposia and workshops on campus"
    ],
    sports: ["Volleyball and basketball courts next to Anna Auditorium"],
    pros: [
      "Of 11,913 B.Tech students graduating in 2024-25, 7,023 were placed and 1,660 went on to higher studies",
      "Large 372-acre campus with many auditoriums and specialised academic blocks",
      "International exchange agreements with foreign universities"
    ],
    cons: [
      "Median B.Tech salary was ₹6 lakh for 2024-25 graduates, so check your branch's numbers",
      "Very large batches: almost 12,000 B.Tech students graduated in 2024-25",
      "Private university fees, so confirm the fee category you'll be placed in"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official VIT website (About, Infrastructure) and its NIRF 2026 Engineering data submission for the Vellore campus. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "SRM Institute of Science and Technology", slug: "srm-institute", city: "Chennai", state: "Tamil Nadu",
    nirfRank: 14, nirfScore: 65.83, nirfYear: 2025,
    // Source: official SRMIST website (srmist.edu.in: Life at SRM, Sports, Clubs, Facilities). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1985, website: "https://www.srmist.edu.in",
    overview: "SRM Institute of Science and Technology is a private university in Chennai that describes itself as a green campus built for research and learning, with students and faculty from across India and abroad. Life on campus covers cultural activities, sports, fine arts and entrepreneurship, and the university has a Directorate of Sports with sports-quota admissions. Admission to B.Tech is through SRMJEEE.",
    course: "B.Tech Computer Science and Engineering", exam: "SRMJEEE",
    hostelAvailable: true,
    facilities: [
      "Green campus with state-of-the-art security and 24-hour emergency services",
      "Campus shuttle service; walking and cycling are popular ways to get around",
      "Facilities & Operations team for maintenance, housekeeping, lifts, air-conditioning and event support",
      "Student counselling services and an anti-discrimination cell"
    ],
    campusLife: [
      "Dozens of student clubs: music, dance, drama, literary, astronomy, fashion, fine arts, women's empowerment, self-defence and social service",
      "A festival club that celebrates festivals from many cultures and religions",
      "Seniors welcome freshers, and the university says it strictly condemns ragging",
      "Community centres and a strong emphasis on diversity"
    ],
    sports: [
      "Dr. T. R. Paarivendhar Aquatic Complex",
      "Spacious playgrounds, indoor stadiums and fitness centres",
      "Professional coaching through the Directorate of Sports",
      "Sports-quota admissions and scholarships for talented athletes",
      "Courses from the Department of Physical Education & Sports Sciences and the Department of Yoga",
      "Its athletes include India's first woman sailor to qualify for the Olympics (Tokyo 2020)"
    ],
    pros: [
      "Unusually strong sports support: aquatic complex, coaching, sports quota and scholarships",
      "Large range of student clubs for every interest",
      "24-hour emergency services and campus security"
    ],
    cons: [
      "Placement and fee figures are published on a separate SRM file site, so check them before applying",
      "Private university fees"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official SRMIST website (Life at SRM, Sports, Clubs, Facilities & Operations). SRM's Fees and placement figures are on a separate file site that wasn't checked, so they're shown as not available. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Manipal Institute of Technology", slug: "mit-manipal", city: "Manipal", state: "Karnataka",
    nirfRank: 59, nirfScore: 52.55, nirfYear: 2025,
    // Source: official MAHE website (manipal.edu/mit-manipal). Checked 24 Nov 2026.
    // Logo: the parent university's (MAHE) logo, as shown in the site header.
    type: "Deemed University", ownership: "Private", established: 1957, website: "https://www.manipal.edu/mit-manipal",
    logo: "/logos/mit-manipal.png",
    overview: "Manipal Institute of Technology was established in 1957 as one of India's first self-financing engineering colleges and is a constituent unit of the Manipal Academy of Higher Education (MAHE). It offers 18 undergraduate and 26 postgraduate programmes plus doctoral research, with 15,700+ research outputs in fields such as computing, AI, robotics, sustainable technology and advanced materials. Admission is through MET.",
    course: "B.Tech", exam: "MET",
    hostelAvailable: true,
    facilities: [
      "18 undergraduate and 26 postgraduate programmes, plus doctoral research",
      "Sponsored research funded by DBT, DST, CSIR and AICTE",
      "MAHE partnerships with more than 250 universities worldwide for exchange and joint research"
    ],
    campusLife: [
      "Numerous technical, cultural and sports clubs",
      "Student-run technical teams, innovation clubs and research groups",
      "Merit scholarships through MAHE"
    ],
    sports: ["Sports clubs and inter-college sports at Revels"],
    fests: ["TechTatva (technical)", "Revels (cultural and sports)"],
    pros: [
      "Nearly seven decades of engineering education",
      "TechTatva and Revels draw participants from across India and abroad",
      "Student exchange through MAHE's 250+ partner universities"
    ],
    cons: [
      "Private university fees, so check MAHE's current fee structure",
      "Placement figures weren't available on the pages checked"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official MAHE website (MIT Manipal page). The logo shown is MAHE's. Fees and placement figures weren't available on the pages checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Delhi Technological University", slug: "dtu-delhi", city: "New Delhi", state: "Delhi",
    nirfRank: 30, nirfScore: 60.85, nirfYear: 2025,
    type: "State University", ownership: "Government", established: 1941, website: "https://dtu.ac.in",
    overview: "Strong government university with good placements and NCR industry exposure.",
    course: "B.Tech Mechanical", exam: "JEE", minRank: 1000, maxRank: 12000,
    fees: 190000, placementRate: 84, averagePackage: 14.6,
    courses: [{ name: "B.Tech Mechanical", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "Anna University", slug: "anna-university", city: "Chennai", state: "Tamil Nadu",
    nirfRank: 20, nirfScore: 63.51, nirfYear: 2025,
    // Source: official Anna University website (annauniv.edu: University Profile, Sports Board, CEG fee structure 2025-26)
    // + Anna University NIRF 2026 Engineering data submission. Checked 24 Nov 2026.
    type: "State University", ownership: "Government", established: 1978, website: "https://www.annauniv.edu",
    logo: "/logos/anna-university.png", campusAcres: 189,
    overview: "Anna University was established on 4 September 1978, named after former Tamil Nadu Chief Minister Dr. C.N. Annadurai, by bringing together four well-known Chennai institutions: College of Engineering Guindy (founded 1794), Alagappa College of Technology (1944), Madras Institute of Technology (1949) and the School of Architecture & Planning (1957). Its 189-acre main campus lies beside the Adyar River, 3 km from Guindy railway station and 10 km from Chennai airport. Today it also has 13 constituent colleges, 3 regional campuses and 593 affiliated colleges. Admission is through TNEA counselling.",
    course: "B.E. / B.Tech", exam: "TNEA",
    fees: 30400, placementRate: 64, medianPackage: 7.5,
    hostelAvailable: true,
    facilities: [
      "189-acre main campus in Guindy by the Adyar River, plus the 52-acre MIT campus at Chrompet and a campus at Taramani",
      "Hostels for College of Engineering Guindy students",
      "University health centre",
      "Placement & training centre for students across campuses"
    ],
    campusLife: [
      "Four historic campuses: CEG (since 1794), ACT, MIT and the School of Architecture & Planning",
      "University cultural and professional societies, and an entrepreneurship development programme",
      "Personality and character development programme for new students"
    ],
    sports: [
      "Anna University Sports Board runs zonal and inter-zonal tournaments and selection trials",
      "Placed 13th of 210 universities, with 7 gold, 4 silver and 4 bronze medals, at Khelo India University Games 2021",
      "University swimming team finished overall 2nd runner-up at the Khelo India Games 2023",
      "Teams in weightlifting, aquatics, shooting, table tennis, tennis, athletics, karate, fencing and ball badminton"
    ],
    pros: [
      "Very low fees: about ₹30,400 a year in semester fees on the regular programme at CEG (2025-26)",
      "Of 2,000 graduates in 2024-25, 1,289 were placed and 116 went on to higher studies",
      "CEG, its oldest college, dates back to 1794"
    ],
    cons: [
      "Median salary was ₹7.5 lakh for 2024-25 graduates",
      "Fees are higher on the self-supporting programme (about ₹50,000 a year at CEG), so check which seat you're allotted",
      "Hostel admission is handled separately through the CEG hostel portal"
    ],
    courses: [{ name: "B.E. / B.Tech (Regular & Self Supporting)", duration: "4 years", fees: 30400 }],
    sourceNote: "From the official Anna University website (University Profile, Sports Board, CEG B.E./B.Tech fee structure 2025-26) and its NIRF 2026 Engineering data submission. Fees = semester fees × 2 for the CEG regular programme, general category, excluding about ₹16,800 of one-time fees and deposits. Placement % = students placed ÷ students graduating. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "PES University", slug: "pes-university", city: "Bengaluru", state: "Karnataka",
    // Source: official PES University website (pes.edu) + PES NIRF 2026 Engineering data submission. Checked 24 Nov 2026.
    type: "Private University", ownership: "Private", established: 1973, website: "https://pes.edu",
    logo: "/logos/pes-university.png",
    overview: "PES began in 1973 as the People's Education Society, founded by Prof. M.R. Doreswamy with a school for underprivileged children in Thyagarajanagar, Bengaluru. It later set up engineering and management institutions, and PES Institute of Technology (PESIT) gained university status to become PES University. Its values are Perseverance, Excellence and Service, and it has campuses on Ring Road and in Electronic City, Bengaluru.",
    course: "B.Tech Computer Science and Engineering", exam: "PESSAT",
    placementRate: 70, medianPackage: 13.05,
    hostelAvailable: true,
    facilities: [
      "Hostels at both campuses, including a girls' hostel at Ring Road and boys' and girls' hostels at Electronic City",
      "Tech labs where students build projects and keep up with new technology",
      "Sports facilities with trained coaches",
      "PESU Academy digital learning platform"
    ],
    campusLife: [
      "Wide range of art and cultural activities",
      "Many clubs and social-impact initiatives",
      "FYI, a monthly student-written newsletter",
      "Jago, the PES mascot, cheers on the university's teams"
    ],
    sports: [
      "State-of-the-art sports facilities with trained coaches",
      "Students compete at different levels, guided by a Sports Director who has represented Karnataka in cricket"
    ],
    pros: [
      "Of 1,526 B.Tech students graduating in 2024-25, 1,068 were placed and 258 went on to higher studies",
      "Median B.Tech salary of ₹13.05 lakh (2024-25 graduates)",
      "Two campuses in Bengaluru, India's tech hub"
    ],
    cons: [
      "Hostel arrangements differ between the Ring Road and Electronic City campuses, so check which applies to you",
      "Private university fees, so confirm the current fee structure"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official PES University website (About, History, Campus Life, Hostel, Sports) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages, and it is not in the NIRF 2025 Engineering top 100."
  },
  {
    name: "Amity University", slug: "amity-university", city: "Noida", state: "Uttar Pradesh",
    nirfRank: 37, nirfScore: 58.53, nirfYear: 2025,
    // Source: official Amity University website (amity.edu: About, Hostel, Sports, Library). Checked 24 Nov 2026.
    type: "Private University", ownership: "Private", established: 2005, website: "https://www.amity.edu",
    logo: "/logos/amity-university.png",
    overview: "Amity University is a private university with its main campus in Noida, Uttar Pradesh. It describes its academic system as industry-aligned, built to give students practical skills, global exposure and career readiness, and runs programmes across engineering, management, fashion and many other fields.",
    course: "B.Tech", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Separate on-campus hostels for boys and girls, with wardens and security",
      "Air-conditioned apartment suites of 4 single rooms with attached bathrooms and a lounge with TV and fridge; non-AC rooms also available",
      "Central Library run as an integrated knowledge resource centre with study spaces for individuals and groups"
    ],
    campusLife: [
      "Programmes across engineering, management, fashion and other faculties on the same campus",
      "Hostel life designed to help students who are living away from home for the first time"
    ],
    sports: [
      "15-acre sports complex on campus",
      "All-weather, 8-layer cushioned synthetic tennis courts"
    ],
    pros: [
      "Choice of AC apartment suites with single rooms",
      "Large 15-acre sports complex",
      "Many programmes and faculties on one campus"
    ],
    cons: [
      "Private university fees, and AC hostel rooms cost more",
      "Fees and placement figures weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official Amity University website (About, Hostel, Sports facilities, Library). Fees and placement figures weren't on the pages checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "COEP Technological University", slug: "coep-pune", city: "Pune", state: "Maharashtra",
    nirfRank: 90, nirfScore: 47.31, nirfYear: 2025,
    // Source: official COEP Tech website (coeptech.ac.in: About the University). Checked 24 Nov 2026.
    type: "State University", ownership: "Government", established: 1854, website: "https://www.coeptech.ac.in",
    logo: "/logos/coep-pune.svg",
    overview: "Founded in July 1854 as the Poona Engineering Class and Mechanical School, College of Engineering Pune, now COEP Technological University, is the third-oldest engineering college in Asia, after College of Engineering Guindy and IIT Roorkee. It is a unitary public university of the Government of Maharashtra on Wellesley Road, Shivajinagar, Pune, and has been fully autonomous since 2003-04. It set up India's first Department of Electronics and Telecommunication.",
    course: "B.Tech", exam: "MHTCET",
    hostelAvailable: true,
    facilities: [
      "Central campus in Shivajinagar, Pune",
      "Hostels and general campus services for students",
      "Facilities for differently-abled students",
      "Internships and placements office"
    ],
    campusLife: [
      "More than 170 years of history; alumni include Bharat Ratna Sir M. Visvesvaraya, in whose honour Engineers' Day is celebrated",
      "Started PG and PhD programmes in the early 1950s, before the IITs were established",
      "Alumni include Padma awardees such as Prof. Thomas Kailath and Dr. Vijay Kelkar"
    ],
    pros: [
      "One of the oldest engineering colleges in Asia, with a famous alumni network",
      "Government university in the middle of Pune",
      "Fully autonomous since 2003-04"
    ],
    cons: [
      "Fees, placement figures and hostel details weren't on the pages checked, so confirm them during admission"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official COEP Technological University website (About the University). Fees, placements and hostel details weren't on the pages checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Andhra Pradesh", slug: "nit-andhra", city: "Tadepalligudem", state: "Andhra Pradesh",
    type: "NIT", ownership: "Government", established: 2015, website: "https://www.nitandhra.ac.in",
    overview: "Growing NIT with good academics.",
    course: "B.Tech CSE", exam: "JEE", minRank: 10000, maxRank: 30000,
    fees: 140000, placementRate: 75, averagePackage: 8.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Arunachal Pradesh", slug: "nit-arunachal", city: "Jote", state: "Arunachal Pradesh",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitap.ac.in",
    logo: "/logos/nit-arunachal.png",
    overview: "NIT located in the serene northeast.",
    course: "B.Tech ECE", exam: "JEE", minRank: 20000, maxRank: 45000,
    fees: 135000, placementRate: 70, averagePackage: 7.5,
    courses: [{ name: "B.Tech ECE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Guwahati", slug: "iit-guwahati", city: "Guwahati", state: "Assam",
    nirfRank: 8, nirfScore: 72.24, nirfYear: 2025,
    // Source: official IIT Guwahati website (iitg.ac.in: About, Campus Life) + IIT Guwahati NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "IIT", ownership: "Government", established: 1994, website: "https://www.iitg.ac.in",
    logo: "/logos/iit-guwahati.jpg", campusAcres: 704,
    overview: "IIT Guwahati, the sixth IIT, was established in 1994 and began teaching in 1995. Its 285-hectare campus sits on the north bank of the Brahmaputra, about 20 km from the centre of Guwahati, with hills and lakes around it. It has eleven departments, seven interdisciplinary centres and five schools covering engineering, science, healthcare, management and humanities. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 74, medianPackage: 17.0,
    hostelAvailable: true,
    facilities: [
      "Eleven men's and two women's hostels, all with single-occupancy rooms",
      "Each hostel has its own mess, canteen, gym, music room, library, TV room, laundry and indoor games",
      "30-bed hospital, a commercial complex with shops and a restaurant, and a multi-cuisine food court",
      "Lakshminath Bezbaroa Central Library and a Computer & Communication Centre open almost round the clock",
      "74,000 m² academic complex, a lecture hall complex and a 1,500-seat auditorium",
      "Campus-wide gigabit network with access points in every hostel room",
      "Guest houses where visiting parents can stay, and flats for married students"
    ],
    campusLife: [
      "Counted among India's most scenic campuses, between the Brahmaputra, hills and lakes",
      "Diverse student community from across India",
      "Students Gymkhana runs student activities"
    ],
    sports: [
      "Indoor stadium with synthetic badminton, table tennis and squash courts",
      "8-lane, 50 m swimming pool",
      "Flood-lit playing fields for all major outdoor games",
      "Gymnasium, plus a gym in every hostel"
    ],
    pros: [
      "Every student gets a single room",
      "Of 902 B.Tech students graduating in 2024-25, 663 were placed and 209 went on to higher studies",
      "Median B.Tech salary of ₹17 lakh (2024-25 graduates)",
      "Large 285-hectare riverside campus with a 30-bed hospital"
    ],
    cons: [
      "The campus is about 20 km from the centre of Guwahati",
      "Fee amounts weren't on the pages checked, so confirm them during admission"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Guwahati website (About, Campus Life) and its NIRF 2026 Engineering data submission. Campus size converted from 285 hectares. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    // Source: official IIT Patna website (iitp.ac.in: About, History, Campus Life, Hostels). Checked 24 Nov 2026.
    name: "IIT Patna", slug: "iit-patna", city: "Bihta", state: "Bihar",
    nirfRank: 19, nirfScore: 64.52, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitp.ac.in",
    logo: "/logos/iit-patna.png",
    overview: "IIT Patna is one of the newer IITs, established by an Act of Parliament on 6 August 2008. Its campus is at Bihta on the banks of the Ganges, about 40 km from Patna. It has ten departments, including Computer Science & Engineering, Electrical, Mechanical, Chemical & Biochemical, Civil & Environmental and Materials Science & Engineering, and offers B.Tech, M.Tech and PhD programmes. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "8-storey boys' hostel with 912 rooms, each with a balcony, plus common rooms, a gym, 6 lifts and two mess halls",
      "5-storey girls' hostel with 108 spacious rooms, lifts, washing machines and its own mess",
      "Hostels are close to the academic area; apartments for married PhD and Master's scholars",
      "Ten departments, with interdisciplinary M.Tech programmes in mechatronics, nanoscience and VLSI"
    ],
    campusLife: [
      "Small, close-knit campus on the banks of the Ganges",
      "Six student-run festivals a year: cultural nights, tech expos, a TEDx stage and an inter-hostel league",
      "Students elect a Gymkhana body every April, and a mess secretary to look after food",
      "Mess menus change every month"
    ],
    sports: [
      "Infinito, the annual student-run sports meet",
      "Inter-hostel league and football on campus",
      "Gymnasium with free weights and machines in the boys' hostel"
    ],
    fests: ["Anwesha (cultural)", "Celesta (technical)", "Infinito (sports)", "Reverberance (music)", "Nebula (literary & arts)", "TEDx IIT Patna"],
    pros: [
      "Six student-run festivals a year for a small campus",
      "Modern hostels with lifts and attached gym",
      "Ten departments with interdisciplinary programmes"
    ],
    cons: [
      "The campus is at Bihta, about 40 km from Patna city",
      "A newer IIT that is still growing; more hostels are planned",
      "Placement figures and fees weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Patna website (About, History, Campus Life, Hostels). Fees and placement figures weren't on the pages checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Raipur", slug: "nit-raipur", city: "Raipur", state: "Chhattisgarh",
    nirfRank: 86, nirfScore: 47.59, nirfYear: 2025,
    type: "NIT", ownership: "Government", established: 1956, website: "https://nitrr.ac.in",
    overview: "Established institute with strong regional presence.",
    course: "B.Tech IT", exam: "JEE", minRank: 15000, maxRank: 35000,
    fees: 145000, placementRate: 78, averagePackage: 9.5,
    courses: [{ name: "B.Tech IT", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Goa", slug: "nit-goa", city: "Cuncolim", state: "Goa",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitgoa.ac.in",
    // Source: official NIT Goa website (nitgoa.ac.in: About). Checked 24 Nov 2026.
    overview: "NIT Goa was established in 2010 under the NIT Act, 2007 and NIT (Amendment) Act, 2012, and is an autonomous Institute of National Importance under the Ministry of Education. Its campus is on Kottamoll Plateau in the Cuncolim municipal area of South Goa, about 15 km from Margao. It offers B.Tech in five branches with a small intake of 42–44 students per branch, admitted through JEE (Main) with JoSAA/CSAB, plus DASA for students from abroad.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Laboratories, workshops and a library with print and electronic resources",
      "Training and Placement Cell, with companies from R&D, engineering, IT and other sectors visiting regularly",
      "Sports facilities for students"
    ],
    campusLife: [
      "Student clubs and study circles such as SPECTRA, TESLA, QUANTA, CESCO and META",
      "SPIE and IEEE student chapters running science and research events",
      "Students celebrate cultural festivals from different states"
    ],
    sports: ["Sports facilities for students; organised the All India Inter-NIT Faculty and Staff Tournament in 2018"],
    fests: ["SAAVYAS (techno-cultural)"],
    pros: [
      "Very small batches: 42–44 students per B.Tech branch",
      "Campus in South Goa, 15 km from Margao and reachable from Dabolim airport"
    ],
    cons: [
      "Only five B.Tech branches",
      "Placement figures and fees weren't on the pages checked"
    ],
    courses: [
      { name: "B.Tech Computer Science and Engineering", duration: "4 years" },
      { name: "B.Tech Electronics and Communication Engineering", duration: "4 years" },
      { name: "B.Tech Electrical and Electronics Engineering", duration: "4 years" },
      { name: "B.Tech Civil Engineering", duration: "4 years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 years" }
    ],
    sourceNote: "From the official NIT Goa website (About). NIRF data, fees, placement figures and the logo weren't available when checked."
  },
  {
    name: "IIT Gandhinagar", slug: "iit-gandhinagar", city: "Gandhinagar", state: "Gujarat",
    nirfRank: 25, nirfScore: 62.31, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2008, website: "https://iitgn.ac.in",
    overview: "Innovative curriculum and excellent facilities.",
    course: "B.Tech Mechanical", exam: "JEE", minRank: 3000, maxRank: 7000,
    fees: 225000, placementRate: 84, averagePackage: 15.5,
    courses: [{ name: "B.Tech Mechanical", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Kurukshetra", slug: "nit-kurukshetra", city: "Kurukshetra", state: "Haryana",
    nirfRank: 85, nirfScore: 47.98, nirfYear: 2025,
    // Source: official NIT Kurukshetra website (nitkkr.ac.in: Campus & Infrastructure, Sports, Computer Engg)
    // + NIT Kurukshetra NIRF 2025 Engineering data submission. Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1963, website: "https://nitkkr.ac.in",
    logo: "/logos/nit-kurukshetra.png", campusAcres: 292,
    overview: "NIT Kurukshetra is a National Institute of Technology on a 292-acre campus in Kurukshetra, Haryana. Its Computer Engineering department has offered B.Tech since 1987 (now with an intake of 210), added Information Technology in 2006 and a B.Tech in Artificial Intelligence & Machine Learning from 2023-24. Physical education, sports or yoga is part of the curriculum for every engineering student. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Engineering", exam: "JEE",
    placementRate: 54, medianPackage: 9.0,
    hostelAvailable: true,
    facilities: [
      "Visvesvaraya Hostel: a 1,000-capacity single-seater mega hostel",
      "Girls' hostels with 200 and 300 single-seater rooms",
      "Older boys' hostels with three-seater and single rooms",
      "Health centre on campus",
      "292-acre campus with materials characterisation and other central laboratories"
    ],
    campusLife: [
      "Physical education, sports or yoga counts for 1 credit in the curriculum",
      "Campus events for National Sports Day, International Yoga Day, Anti-Ragging Day and Run for Unity"
    ],
    sports: [
      "Standard 400 m track and field",
      "International-standard swimming pool with 3, 5 and 7 m diving boards (open March to October)",
      "Sports complex of about 20 acres",
      "Floodlit badminton, tennis, basketball and volleyball courts, plus cricket pitch, hockey and football grounds and kabaddi",
      "Indoor badminton hall and a modern gymnasium",
      "Sports Committee of faculty and student captains plans games and tournaments"
    ],
    pros: [
      "Most first-year and girls' hostel rooms are single-seater",
      "Swimming pool with diving boards and a 400 m track",
      "B.Tech in Computer Engineering, IT and AI & ML"
    ],
    cons: [
      "Of 1,100 B.Tech students graduating in 2023-24, 590 were placed and 266 went on to higher studies",
      "Median B.Tech salary was ₹9 lakh for 2023-24 graduates",
      "Some older boys' hostels have three students per room"
    ],
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 years" },
      { name: "B.Tech Information Technology", duration: "4 years" },
      { name: "B.Tech Artificial Intelligence & Machine Learning", duration: "4 years" }
    ],
    sourceNote: "From the official NIT Kurukshetra website (Campus & Infrastructure, Sports Section, Computer Engineering department) and its NIRF 2025 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Mandi", slug: "iit-mandi", city: "Mandi", state: "Himachal Pradesh",
    nirfRank: 26, nirfScore: 62.08, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2009, website: "https://www.iitmandi.ac.in",
    // Source: official IIT Mandi website (iitmandi.ac.in: About, Sports) + IIT Mandi NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-mandi.png",
    overview: "IIT Mandi is one of the second-generation IITs and describes itself as a research university. Its campus is in the Kamand Valley, on the left bank of the Uhl River at Kamand and Salgi villages, about 14 km from Mandi town in Himachal Pradesh. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 78, medianPackage: 17.0,
    hostelAvailable: true,
    facilities: [
      "Residential campus in the Kamand Valley in the Himalayan foothills",
      "Indoor and outdoor sports facilities with experienced coaches for most games"
    ],
    campusLife: [
      "Mountain setting in Himachal Pradesh, with weather that varies a lot through the year",
      "National Sports Organisation (NSO) programme for students"
    ],
    sports: [
      "Diverse indoor and outdoor facilities with coaches for most games",
      "NSO (National Sports Organisation) programme",
      "Inter-IIT medals: silver in cricket and women's table tennis (2022), bronze in cricket (2019), athletics medals (2018, 2019)"
    ],
    pros: [
      "Of 272 B.Tech students graduating in 2024-25, 211 were placed and 61 went on to higher studies",
      "Median B.Tech salary of ₹17 lakh (2024-25 graduates)",
      "Scenic Himalayan campus with a strong sports culture for a young IIT"
    ],
    cons: [
      "The campus is about 14 km from Mandi town, in a remote mountain valley",
      "Fee amounts weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Mandi website (About, Sports Facilities) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT (ISM) Dhanbad", slug: "iit-dhanbad", city: "Dhanbad", state: "Jharkhand",
    nirfRank: 15, nirfScore: 65.37, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1926, website: "https://www.iitism.ac.in",
    // Source: official IIT (ISM) Dhanbad website (iitism.ac.in: History) + IIT (ISM) NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-dhanbad-on-dark.png",
    overview: "IIT (ISM) Dhanbad was founded on 9 December 1926 by Viceroy Lord Irwin as the Indian School of Mines & Applied Geology, following the McPherson Committee's recommendation for an institution teaching mining and geology. It later added petroleum engineering and applied geophysics, was renamed Indian School of Mines, began admitting students through IIT-JEE and introduced Computer Science and Engineering. It became an Indian Institute of Technology on 6 September 2016. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 79, medianPackage: 15.0,
    hostelAvailable: true,
    facilities: [
      "Central Library, with roots going back to the 1920s",
      "Career Development Centre for internships and placements",
      "Students' Welfare office"
    ],
    campusLife: [
      "Nearly a century of history in mining, geology and earth sciences",
      "Programmes from B.Tech and BS-MS to MBA and PhD"
    ],
    pros: [
      "Of 910 B.Tech students graduating in 2024-25, 715 were placed and 160 went on to higher studies",
      "Median B.Tech salary of ₹15 lakh (2024-25 graduates)",
      "One of India's oldest technical institutions, with a unique strength in mining and earth sciences"
    ],
    cons: [
      "Fee amounts weren't on the pages checked, so confirm them during admission"
    ],
    courses: [
      { name: "B.Tech Computer Science and Engineering", duration: "4 years" },
      { name: "B.Tech Mining Engineering", duration: "4 years" }
    ],
    sourceNote: "From the official IIT (ISM) Dhanbad website (History) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NITK Surathkal", slug: "nitk-surathkal", city: "Mangaluru", state: "Karnataka",
    nirfRank: 17, nirfScore: 64.59, nirfYear: 2025,
    // Source: official NITK website (nitk.ac.in: About Us) + NITK NIRF 2023 Engineering data (latest on its site). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1960, website: "https://www.nitk.ac.in",
    logo: "/logos/nitk-surathkal.png",
    overview: "NIT Karnataka, Surathkal, began as Karnataka Regional Engineering College (KREC) in 1960 and was upgraded to a National Institute of Technology in 2002. It is in Surathkal, Mangaluru, the headquarters of the coastal Dakshina Kannada district. Undergraduate admission is through JEE (Main) and JoSAA/CSAB counselling.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 88, medianPackage: 12.84,
    hostelAvailable: true,
    facilities: [
      "Central Library, Central Research Facility and Central Computer Centre",
      "Health Care Centre and Guest House",
      "Career Development Centre for internships and placements",
      "STEP incubation centre and Centre for System Design"
    ],
    campusLife: [
      "Students' Council and student activities",
      "NSS and NCC units",
      "Anti-ragging committee and contacts published on the website"
    ],
    sports: ["Sports and games section for students", "Takes part in the All India Inter-NIT Sports Meet (athletics and chess, 2025-26)"],
    pros: [
      "Of 837 B.Tech students graduating in 2021-22, 734 were placed and 32 went on to higher studies (latest NIRF data on its site)",
      "Median B.Tech salary of ₹12.84 lakh in 2021-22",
      "Coastal campus in Mangaluru"
    ],
    cons: [
      "The newest placement data on its website is for the 2021-22 batch, so ask for recent figures",
      "Fee amounts weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NITK website (About Us) and its NIRF 2023 Engineering data submission, the latest on its site (covers students graduating in 2021-22). Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Calicut", slug: "nit-calicut", city: "Kozhikode", state: "Kerala",
    nirfRank: 21, nirfScore: 63.05, nirfYear: 2025,
    // Source: official NIT Calicut website (nitc.ac.in: About, Hostels, Tathva, news) + NITC NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1961, website: "https://nitc.ac.in",
    logo: "/logos/nit-calicut.svg", campusAcres: 297,
    overview: "NIT Calicut is an Institution of National Importance under the National Institutes of Technology Act, 2007, fully funded by the Government of India. Its fully residential campus lies at the foothills of the Western Ghats, about 22 km north-east of Kozhikode, stretching 1.5 km along the Calicut–Mukkam road over about 120 hectares. It offers 11 UG and 29 PG programmes including an MBA. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 88, medianPackage: 12.16,
    hostelAvailable: true,
    facilities: [
      "Eleven boys' and three girls' hostels housing about 6,800 students",
      "Seven of the boys' hostels have single or double rooms; four have triple or quadruple rooms",
      "Every hostel has common rooms, indoor games, guest rooms for families, 24/7 water, power and internet, and CCTV",
      "Girls' hostels also have a gym",
      "Health centre, guest house and research centres such as Biomaterials, Tissue Engineering & Medical Devices"
    ],
    campusLife: [
      "Hostel councils of wardens and student representatives run each hostel",
      "Inter-hostel and intra-hostel sports and cultural events every year",
      "Clubs such as Club Mathematica and the Enquire Quiz club; Club AeroUnwired won All India Rank 3 at SAE Aerothon 2026"
    ],
    sports: [
      "Major Dhyan Chand Sports Complex and a new basketball court",
      "Jwala, the annual sports meet",
      "Inter-hostel tournaments every year"
    ],
    fests: ["Tathva (techno-management, since 2000)"],
    pros: [
      "Of 915 B.Tech students graduating in 2024-25, 803 were placed and 106 went on to higher studies",
      "Median B.Tech salary of ₹12.16 lakh (2024-25 graduates)",
      "Tathva, which it describes as South India's largest techno-management fest",
      "Green 120-hectare campus at the foot of the Western Ghats"
    ],
    cons: [
      "The campus is about 22 km from Kozhikode city",
      "Some boys' hostels have three or four students per room"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NIT Calicut website (About, Hostels, Tathva, campus news) and its NIRF 2026 Engineering data submission. Campus size converted from about 120 hectares. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Indore", slug: "iit-indore", city: "Indore", state: "Madhya Pradesh",
    nirfRank: 12, nirfScore: 66.65, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2009, website: "https://www.iiti.ac.in",
    // Source: official IIT Indore website (iiti.ac.in: About). Checked 24 Nov 2026.
    logo: "/logos/iit-indore.png", campusAcres: 501,
    overview: "IIT Indore was established by the Government of India in 2009 as one of the new-generation IITs. Mentored at first by IIT Bombay and starting from a temporary campus in the city, it moved in 2016 to its permanent 501-acre residential campus at Simrol, near Indore. Its research areas include artificial intelligence, advanced materials, communications, renewable energy, healthcare technology and environmental sustainability. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "501-acre residential campus at Simrol, in use since 2016",
      "Advanced research labs, modern lecture halls and student residences",
      "Facilities for startup incubation, technology development and industry engagement",
      "Separate websites for hostels, placements and sports"
    ],
    campusLife: [
      "Undergraduate, postgraduate and doctoral programmes across science, engineering and humanities",
      "Strong focus on innovation and entrepreneurship"
    ],
    pros: [
      "Large 501-acre permanent campus",
      "Mentored by IIT Bombay in its early years",
      "Startup incubation support on campus"
    ],
    cons: [
      "Simrol is outside Indore city",
      "Placement figures and fees are on separate IIT Indore sites that weren't checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Indore website (About). Fees, placements and hostel details are on separate sites that weren't checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "VNIT Nagpur", slug: "vnit-nagpur", city: "Nagpur", state: "Maharashtra",
    nirfRank: 44, nirfScore: 56.58, nirfYear: 2025,
    // Source: official VNIT website (vnit.ac.in: History, Hostel, Sports). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1960, website: "https://vnit.ac.in",
    logo: "/logos/vnit-nagpur.png", campusAcres: 214,
    overview: "VNIT began in June 1960 as Visvesvaraya Regional College of Engineering (VRCE), set up by the Government of India and the Government of Maharashtra by merging the state engineering college that had run in Nagpur since 1956. It became a deemed university in June 2002 and an Institution of National Importance under the National Institutes of Technology Act, 2007. Its campus of about 214 acres is in Nagpur. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Ten boys' hostels and two girls' hostels for more than 4,000 students",
      "Hostels have TV, sports equipment, water coolers, water heaters, kettles and a smart laundry service",
      "Separate gyms for boys and girls",
      "About 214-acre campus in Nagpur"
    ],
    campusLife: [
      "Admitted 100 international undergraduate students in 2026-27",
      "Internships and placements office (Training & Placement)"
    ],
    sports: [
      "Physical education programme promoting fitness and healthy competition",
      "Takes part in All India Inter-NIT tournaments, including badminton, table tennis and yoga"
    ],
    pros: [
      "Hostel places for more than 4,000 students with separate gyms",
      "Long history: started in 1960 as a Regional Engineering College",
      "Growing international student community"
    ],
    cons: [
      "Placement figures and fees weren't published on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official VNIT Nagpur website (History, Hostel, Sports). Fees and placement figures weren't on the pages checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Manipur", slug: "nit-manipur", city: "Imphal", state: "Manipur",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitmanipur.ac.in",
    overview: "Developing NIT in the northeast.",
    course: "B.Tech CSE", exam: "JEE", minRank: 25000, maxRank: 50000,
    fees: 135000, placementRate: 68, averagePackage: 7.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Meghalaya", slug: "nit-meghalaya", city: "Sohra", state: "Meghalaya",
    nirfRank: 83, nirfScore: 48.21, nirfYear: 2025,
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitm.ac.in",
    // Source: official NIT Meghalaya website (nitm.ac.in: About NIT). Checked 24 Nov 2026.
    logo: "/logos/nit-meghalaya.png",
    overview: "NIT Meghalaya is one of the 31 NITs established under the NIT Act 2007 (amended 2012) as an Institute of National Importance, fully funded by the Ministry of Education. Its permanent campus in the hills of Sohra is now fully functional, with academic buildings, student hostels, administrative blocks and faculty residences. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "New permanent campus at Sohra with modern academic buildings",
      "Student hostels on campus with published rules and a hostel patrolling committee",
      "Health facilities and campus bus service"
    ],
    campusLife: ["Ecologically rich hill setting at Sohra, Meghalaya"],
    pros: [
      "Brand-new, fully functional permanent campus",
      "Institute of National Importance, fully funded by the central government"
    ],
    cons: [
      "Placement figures and fees weren't on the pages checked",
      "Sohra is a small hill town, so check travel connections"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official NIT Meghalaya website (About NIT). Recent Fees and placement figures weren't on the pages checked. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Mizoram", slug: "nit-mizoram", city: "Aizawl", state: "Mizoram",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitmz.ac.in",
    // Source: official NIT Mizoram website (nitmz.ac.in: Hostels) + NIT Mizoram NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/nit-mizoram.png",
    overview: "NIT Mizoram is a National Institute of Technology in Aizawl, Mizoram. It is fully residential, with separate hostels for boys and girls, a mess in every hostel and institute buses between the hostels and the academic blocks. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech", exam: "JEE",
    placementRate: 92, medianPackage: 8.4,
    hostelAvailable: true,
    facilities: [
      "Four hostels: two for girls and two for boys",
      "A mess in every hostel serving breakfast, lunch, evening tea and dinner",
      "Institute buses between the hostels and the academic blocks",
      "Health facility on campus"
    ],
    campusLife: ["Training and placement cell for internships and jobs"],
    pros: [
      "Of 137 B.Tech students graduating in 2024-25, 126 were placed and 7 went on to higher studies",
      "Placement rate has stayed above 85% for the last three batches (NIRF 2026 data)"
    ],
    cons: [
      "Median B.Tech salary was ₹8.4 lakh for 2024-25 graduates",
      "Hostels and academic blocks are apart, so you depend on institute buses"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official NIT Mizoram website (Hostels, Transportation, Health) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages, and it is not in the NIRF 2025 Engineering top 100."
  },
  {
    name: "NIT Nagaland", slug: "nit-nagaland", city: "Chumukedima", state: "Nagaland",
    type: "NIT", ownership: "Government", established: 2009, website: "https://www.nitnagaland.ac.in",
    // Source: official NIT Nagaland website (nitnagaland.ac.in: Hostels, Medical). Checked 25 Nov 2026.
    logo: "/logos/nit-nagaland.png",
    overview: "NIT Nagaland is a National Institute of Technology at Chumukedima, Nagaland. It is a small, residential campus whose hostels are named after the mountains of the region, with separate hostels for first-year students. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Six hostels on campus: four 64-seat boys' hostels, a 56-seat girls' hostel and a new 32-seat PG boys' hostel",
      "Patkai A, B and C hostels are only for first-year students",
      "Medical centre with doctors on rotation, equipped like a district primary health centre",
      "Library, data centre, bank & ATM and post office on campus"
    ],
    campusLife: [
      "Hostels named after local peaks: Saramati (Nagaland's highest), Patkai, Japfu, Dzukou and Zanibu",
      "First, second and third, and final-year students live in separate hostels",
      "Student sports activities and a placement cell"
    ],
    pros: [
      "Dedicated hostels for first-year students",
      "Small hostels of 32–64 students each"
    ],
    cons: [
      "Very small campus with limited hostel capacity",
      "Placement figures, fees and NIRF data weren't readable (the website was intermittently unavailable)"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official NIT Nagaland website (Hostels, Medical). Its website was intermittently unavailable, so placement figures, fees and NIRF data weren't checked."
  },
  {
    name: "IIT Bhubaneswar", slug: "iit-bhubaneswar", city: "Bhubaneswar", state: "Odisha",
    nirfRank: 39, nirfScore: 58.22, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitbbs.ac.in",
    // Source: official IIT Bhubaneswar website (iitbbs.ac.in: About, About Campus) + IIT Bhubaneswar NIRF 2026 Engineering data. Checked 25 Nov 2026.
    logo: "/logos/iit-bhubaneswar.png", campusAcres: 936,
    overview: "IIT Bhubaneswar came into existence on 22 July 2008. After starting in two transit campuses in Bhubaneswar, it moved to its permanent 936-acre campus at the foot of the historic Barunei Hill, which has academic and residential areas plus space for training centres and a research park. Its vision is to be globally recognised for outstanding graduates and new knowledge. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 77, medianPackage: 13.3,
    hostelAvailable: true,
    facilities: [
      "936-acre permanent campus with academic, residential, training-centre and research-park areas",
      "Central Research Instrumentation Facility (CRIF)",
      "Career Development Centre for placements and internships",
      "Campus transport service"
    ],
    campusLife: [
      "Green, pollution-free campus with a planting programme since 2015 (fruit, flower, medicinal and pine trees)",
      "Focus on cross-discipline work, innovation, design and entrepreneurship"
    ],
    pros: [
      "Of 315 B.Tech students graduating in 2024-25, 243 were placed and 50 went on to higher studies",
      "Median B.Tech salary of ₹13.3 lakh (2024-25 graduates)",
      "Very large 936-acre campus"
    ],
    cons: [
      "Median salary has fallen over the last three batches (₹15.98 lakh → ₹14 lakh → ₹13.3 lakh)",
      "Fee amounts and hostel details weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Bhubaneswar website (About, About Campus) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not in these sources. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Jalandhar", slug: "nit-jalandhar", city: "Jalandhar", state: "Punjab",
    nirfRank: 55, nirfScore: 53.38, nirfYear: 2025,
    type: "NIT", ownership: "Government", established: 1987, website: "https://www.nitj.ac.in",
    logo: "/logos/nit-jalandhar.png",
    overview: "Good infrastructure and placement records.",
    course: "B.Tech CSE", exam: "JEE", minRank: 8000, maxRank: 20000,
    fees: 150000, placementRate: 82, averagePackage: 10.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "MNIT Jaipur", slug: "mnit-jaipur", city: "Jaipur", state: "Rajasthan",
    nirfRank: 42, nirfScore: 57.45, nirfYear: 2025,
    type: "NIT", ownership: "Government", established: 1963, website: "https://www.mnit.ac.in",
    // Source: official MNIT Jaipur website (mnit.ac.in: About MNIT, Sports) + MNIT NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/mnit-jaipur.png", campusAcres: 317,
    overview: "MNIT Jaipur was set up in 1963 as Malaviya Regional Engineering College by the Government of India and the Government of Rajasthan. It became a National Institute of Technology on 26 June 2002 and an Institution of National Importance by an Act of Parliament on 15 August 2007, and is fully funded by the Ministry of Education. Its 317-acre campus is in the heart of Jaipur, close to the airport, railway station, hospitals and shopping malls. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 77, medianPackage: 10.0,
    hostelAvailable: true,
    facilities: [
      "317-acre landscaped campus in the middle of Jaipur",
      "Hostels and on-campus housing for faculty and staff",
      "Close to Jaipur airport, the railway station and major hospitals"
    ],
    campusLife: [
      "Campus life in Jaipur, Rajasthan's capital and a major cultural city",
      "Physical Education & Sports office supporting students with coaches and programmes"
    ],
    sports: [
      "More than 1,000 students regularly take part in sports and conditioning",
      "Basketball, volleyball, tennis, badminton, table tennis and chess",
      "Playfields for football, cricket, kabaddi and track & field",
      "Gymnasium and yoga",
      "Coaches and athlete support from the Physical Education & Sports office"
    ],
    pros: [
      "Of 732 B.Tech students graduating in 2024-25, 564 were placed and 24 went on to higher studies",
      "Large 317-acre campus inside the city, close to the airport and railway station",
      "Strong sports participation"
    ],
    cons: [
      "Median B.Tech salary was ₹10 lakh for 2024-25 graduates",
      "Fee amounts weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official MNIT Jaipur website (About MNIT, Sports) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Sikkim", slug: "nit-sikkim", city: "Ravangla", state: "Sikkim",
    type: "NIT", ownership: "Government", established: 2010, website: "https://nitsikkim.ac.in",
    // Source: official NIT Sikkim website (nitsikkim.ac.in: Campus, Information). Checked 25 Nov 2026.
    logo: "/logos/nit-sikkim.png",
    overview: "NIT Sikkim is an Institute of National Importance under the Ministry of Education. It currently runs from a temporary campus at Ravangla, South Sikkim, next to the Jawahar Navodaya Vidyalaya campus, while its permanent campus at Khamdong is under construction. Undergraduate admission is through JEE (Main) and JoSAA.",
    course: "B.Tech", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Temporary campus at Ravangla: 16 three-storey blocks of furnished 2-bedroom apartments used as boys' and girls' hostels and staff housing",
      "Academic building with classrooms and computer rooms, and an administrative building",
      "SBI branch, post office and an army hospital within 2.5 km",
      "Permanent campus at Khamdong under construction"
    ],
    campusLife: [
      "Small hill-town campus in the Himalayas",
      "Departments include Electrical & Electronics and Electronics & Communication Engineering"
    ],
    sports: ["Common playground for outdoor games"],
    pros: [
      "Institute of National Importance",
      "Students live in furnished apartments rather than large dormitories"
    ],
    cons: [
      "Still on a temporary campus with limited facilities; the permanent campus isn't finished",
      "Remote location in Ravangla",
      "Placement figures, fees and NIRF data weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech", duration: "4 years" }],
    sourceNote: "From the official NIT Sikkim website (Campus, Information). Parts of the campus description may be out of date. Placement figures, fees and NIRF data weren't on the pages checked."
  },
  {
    // Source: official IIT Madras website (iitm.ac.in) + IIT Madras NIRF 2026 Engineering data submission.
    // Checked 24 Nov 2026. Fee amounts are not published on those pages, so they are left empty. NIRF rank: official NIRF 2025 Engineering ranking.
    name: "IIT Madras", slug: "iit-madras", city: "Chennai", state: "Tamil Nadu",
    nirfRank: 1, nirfScore: 88.72, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1959, website: "https://www.iitm.ac.in",
    logo: "/logos/iit-madras.png", campusAcres: 630,
    overview: "Set up in 1959 with technical assistance from the West German government and declared an Institute of National Importance in 1961, IIT Madras is a fully residential institute in South Chennai. It has 16 academic departments, nearly 100 laboratories and about 550 faculty, and has been named an Institute of Eminence. Undergraduate entry is through JEE (Main) and JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 81, medianPackage: 17.78,
    hostelAvailable: true,
    facilities: [
      "686 faculty members and 1,798 full-time PhD scholars (NIRF 2025 data)",
      "₹956 crore of sponsored research across 794 projects in 2023-24",
      "20 hostels named after Indian rivers (15 for men, 5 for women), with internet/LAN in every room",
      "Central Library: five-storey, air-conditioned and Wi-Fi enabled, with 2 million+ books and 1,000+ journal subscriptions",
      "Institute hospital with visiting specialists (including a psychiatrist), lab tests, X-ray, in-patient wards and an ambulance; pharmacy run by Apollo",
      "Nearly 100 laboratories across 16 academic departments",
      "Campus buses and battery vehicles; students cycle or walk (powered vehicles are not allowed for students)",
      "SBI and Canara Bank branches with ATMs, a post office and two shopping centres on campus",
      "Lifts/ramps and accessible toilets in more than 80% of buildings"
    ],
    campusLife: [
      "Sangam cultural clubs: Quiz, Music, Thespian, Choreo, Fine Arts, Comedy, Film Appreciation, E-Sports and more",
      "Regional clubs such as Telugu Samskrita Samiti, Kannada Sangha, Kerala Kala Samiti and SADINER help freshers settle in",
      "Lit Soc: a year-long inter-hostel cultural competition",
      "Hostel nights and festival celebrations including Holi, Pongal, Onam and Diwali",
      "Department fests such as Exebit (CSE), Mechanica (Mechanical) and Amalgam (Metallurgy)",
      "Weekend movies at the Open Air Theatre; the campus is also a reserve forest"
    ],
    sports: [
      "Olympic-standard swimming pool",
      "Athletics stadium",
      "K.S. Narayanan Centre for Cricketing Excellence and the IIT-Chemplast cricket ground",
      "Floodlit hockey and football fields",
      "Wood-floored multipurpose indoor stadium and badminton courts",
      "Four synthetic tennis courts, two basketball and two volleyball courts",
      "Two squash courts, a table tennis facility and a weightlifting arena",
      "Gymnasium with professional instructors",
      "Skating rink around Sangam ground",
      "Sports clubs: aquatics, athletics, badminton, bridge, cricket, football, hockey, squash, table tennis, tennis, volleyball and weightlifting",
      "Inter-hostel competitions: Schroeter and the Dean's Trophy, ending with Gymkhana Day",
      "Hosts an intercollegiate Sports Fest every September, plus the GF&KR basketball, Jimmy George volleyball and Sanmar cricket tournaments",
      "Competes in the Inter IIT Sports Meet: IIT Madras has won it 19 times in 51 meets, including 11 in a row"
    ],
    fests: ["Shaastra (technical, January)", "Saarang (cultural, January)"],
    pros: [
      "Of 781 B.Tech students graduating in 2024-25, 631 were placed and 147 went on to higher studies",
      "Median B.Tech salary of ₹17.78 lakh (2024-25 graduates)",
      "Merit-cum-means scholarship: 67% tuition fee exemption for family income up to ₹4.5 lakh",
      "Large, green 630-acre residential campus inside Chennai city"
    ],
    cons: [
      "First-year undergraduates live in shared rooms",
      "Large campus and no powered vehicles for students, so expect to cycle or walk a lot",
      "The institute describes its academic schedule as very tight",
      "Fee amounts are only shown on the student fee portal, so confirm them during admission"
    ],
    courses: [
      { name: "B.Tech Aerospace Engineering", duration: "4 years" },
      { name: "B.Tech + M.Tech Aerospace Engineering (Dual Degree)", duration: "5 years" },
      { name: "B.Tech Artificial Intelligence and Data Analytics", duration: "4 years" },
      { name: "B.Tech Chemical Engineering", duration: "4 years" },
      { name: "B.Tech Computational Engineering & Mechanics", duration: "4 years" },
      { name: "B.Tech Instrumentation & Biomedical Engineering", duration: "4 years" },
      { name: "B.Tech Naval Architecture and Ocean Engineering", duration: "4 years" },
      { name: "B.Tech Metallurgical and Materials Engineering", duration: "4 years" },
      { name: "B.Tech Biological Engineering", duration: "4 years" },
      { name: "B.Tech Civil Engineering", duration: "4 years" },
      { name: "B.Tech Computer Science and Engineering", duration: "4 years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 years" },
      { name: "B.Tech + M.Tech Engineering Design (Dual Degree)", duration: "5 years" },
      { name: "B.Tech Electrical Engineering", duration: "4 years" },
      { name: "B.Tech Engineering Physics", duration: "4 years" },
      { name: "B.S. Biological Science", duration: "4 years" },
      { name: "B.S. Physics", duration: "4 years" },
      { name: "B.S. Chemistry", duration: "4 years" },
      { name: "B.S. Mathematics", duration: "4 years" },
      { name: "B.S. Medical Sciences & Engineering", duration: "4 years" },
      { name: "Bachelor of Cyber Security", duration: "4 years" }
    ],
    sourceNote: "From the official IIT Madras website (About, Campus Life, Hostels, Sports, Scholarships, UG Admission 2026) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not published on these pages. Faculty and research figures are from its NIRF 2025 data submission. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Hyderabad", slug: "iit-hyderabad", city: "Sangareddy", state: "Telangana",
    nirfRank: 7, nirfScore: 72.31, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iith.ac.in",
    // Source: official IIT Hyderabad website (iith.ac.in: About IITH, Campus Services). Checked 24 Nov 2026.
    logo: "/logos/iit-hyderabad.png",
    overview: "IIT Hyderabad was established in 2008 and says it has consistently ranked among India's top 10 engineering institutes in NIRF. It offers undergraduate programmes in classical engineering, applied sciences, design and interdisciplinary areas, with a strong focus on research, innovation and entrepreneurship, and has a special relationship with Japanese universities and industry. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 77, medianPackage: 21.0,
    hostelAvailable: true,
    facilities: [
      "282 faculty members and 711 full-time PhD scholars (NIRF 2025 data)",
      "₹129 crore of sponsored research in 2023-24",
      "Every student gets a single room, in hostels with radiant cooling",
      "More than 100 research labs, with new equipment added every year",
      "Library with more than 20,000 books and 10,000 periodicals",
      "Common dining hall serving north and south Indian food, inspected by student representatives",
      "Shiru Cafe, the first outside Japan, run by Japanese student interns with free drinks",
      "Campus transport, including a regular service from Lingampally railway station",
      "On-campus hospital"
    ],
    campusLife: [
      "Close links with Japanese universities and companies",
      "Support for innovation and entrepreneurship at every stage",
      "Programmes in design and interdisciplinary areas alongside engineering"
    ],
    pros: [
      "Of 399 B.Tech students graduating in 2023-24, 306 were placed and 37 went on to higher studies",
      "Median B.Tech salary of ₹21 lakh (2023-24 graduates)",
      "Single rooms for every student",
      "Says it has consistently ranked in NIRF's top 10 for engineering",
      "Strong research culture with 100+ labs"
    ],
    cons: [
      "Limited campus transport; the campus is outside Hyderabad city, near Lingampally",
      "Fee amounts weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Hyderabad website (About IITH, Campus Services) and its NIRF 2025 Engineering data submission (students graduating in 2023-24). Placement % = students placed ÷ students graduating. Fees weren't available. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Agartala", slug: "nit-agartala", city: "Agartala", state: "Tripura",
    type: "NIT", ownership: "Government", established: 1965, website: "https://www.nita.ac.in",
    logo: "/logos/nit-agartala.png",
    overview: "Large campus with improved connectivity and placements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 15000, maxRank: 35000,
    fees: 145000, placementRate: 75, averagePackage: 8.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Kanpur", slug: "iit-kanpur", city: "Kanpur", state: "Uttar Pradesh",
    nirfRank: 4, nirfScore: 81.82, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1959, website: "https://www.iitk.ac.in",
    // Source: official IIT Kanpur website (iitk.ac.in: Students) + IIT Kanpur NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-kanpur.png",
    overview: "IIT Kanpur describes itself as known worldwide for a student-centred approach to nurturing future leaders and innovators. Undergraduates can do research through the SURGE summer programme, start companies through the SIDBI Innovation & Incubation Centre, and get confidential support from the Center for Mental Health and Wellbeing. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 71, medianPackage: 21.7,
    hostelAvailable: true,
    facilities: [
      "579 faculty members and 2,068 full-time PhD scholars (NIRF 2025 data)",
      "₹225 crore of sponsored research across 1,155 projects in 2023-24",
      "SIDBI Innovation & Incubation Centre (SIIC) for technology startups",
      "Center for Mental Health and Wellbeing offering confidential support",
      "Students' Placement Office run by staff and students"
    ],
    campusLife: [
      "SURGE (Students Undergraduate Research Graduate Excellence) summer research programme",
      "Scholarships, prizes and medals for academics and extra-curricular activities",
      "Cultural activities and a strong student community"
    ],
    pros: [
      "Of 1,205 B.Tech students graduating in 2024-25, 855 were placed and 257 went on to higher studies",
      "Median B.Tech salary of ₹21.7 lakh (2024-25 graduates)",
      "Undergraduate research through SURGE and startup support through SIIC"
    ],
    cons: [
      "Fee amounts and hostel details weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Kanpur website (Students) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. Faculty and research figures are from its NIRF 2025 data submission. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Roorkee", slug: "iit-roorkee", city: "Roorkee", state: "Uttarakhand",
    nirfRank: 6, nirfScore: 75.44, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1847, website: "https://www.iitr.ac.in",
    // Source: official IIT Roorkee website (iitr.ac.in: Institute, History). Checked 24 Nov 2026.
    overview: "IIT Roorkee traces its roots to Thomason College, which it describes as the oldest engineering college in India. The college was proposed around 1846 by Colonel Cautley, who was building the Ganges Canal, to James Thomason, Lieutenant-Governor of the North-West Provinces, to train civil engineers for canals, roads and irrigation works across northern India. Today it is an IIT administered through the IIT Council, and undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 70, medianPackage: 17.0,
    hostelAvailable: true,
    facilities: [
      "601 faculty members and 2,806 full-time PhD scholars (NIRF 2025 data)",
      "1,054 consultancy projects for 832 client organisations in 2023-24",
      "Historic campus in Roorkee, Uttarakhand, beside the Ganges Canal"
    ],
    campusLife: [
      "Nearly two centuries of engineering tradition",
      "International partnerships and exchange initiatives"
    ],
    pros: [
      "Of 1,102 B.Tech students graduating in 2023-24, 769 were placed and 333 went on to higher studies",
      "Median B.Tech salary of ₹17 lakh (2023-24 graduates)",
      "Merit-cum-means scholarship for 25% of undergraduate students",
      "One of the oldest engineering institutions in Asia"
    ],
    cons: [
      "Fees and hostel details weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Roorkee website (Institute, History) and its NIRF 2025 Engineering data submission (students graduating in 2023-24). Placement % = students placed ÷ students graduating. Fees and the logo weren't available. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Kharagpur", slug: "iit-kharagpur", city: "Kharagpur", state: "West Bengal",
    nirfRank: 5, nirfScore: 78.69, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1951, website: "https://www.iitkgp.ac.in",
    // Source: official IIT Kharagpur website (iitkgp.ac.in: About) + IIT Kharagpur NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-kharagpur.png",
    overview: "IIT Kharagpur, in West Bengal, has the motto 'Yogah Karmasu Kaushalam' (excellence in action is yoga), from the Bhagavad Gita. It aims to give broad-based education, build a spirit of entrepreneurship and innovation, and bring together expertise in science, technology, management and law, with programmes including architecture, management and law alongside engineering. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 50, medianPackage: 20.74,
    hostelAvailable: true,
    facilities: [
      "868 faculty members and 3,409 full-time PhD scholars (NIRF 2025 data)",
      "₹160 crore of sponsored research across 892 projects in 2023-24",
      "Schools and programmes in engineering, architecture, management and law on one campus",
      "Sponsored research and consultancy across industrial and social areas"
    ],
    campusLife: [
      "Strong push for entrepreneurship and innovation among students",
      "Programmes across science, technology, management and law"
    ],
    pros: [
      "Of 882 four-year B.Tech students graduating in 2024-25, 438 took jobs and 367 went on to higher studies",
      "Median B.Tech salary of ₹20.74 lakh (2024-25 graduates)",
      "Unusually wide range of programmes, including law and architecture"
    ],
    cons: [
      "Placement figures cover 4-year B.Tech only, not the 5-year dual degrees, so check your programme",
      "Fee amounts and hostel details weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Kharagpur website (About) and its NIRF 2026 Engineering data submission (4-year UG programmes). Placement % = students placed ÷ students graduating. Fees were not on these pages. Faculty and research figures are from its NIRF 2025 data submission. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Ropar", slug: "iit-ropar", city: "Rupnagar", state: "Punjab",
    nirfRank: 32, nirfScore: 59.66, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitrpr.ac.in",
    logo: "/logos/iit-ropar.png",
    overview: "Established IIT with strong research focus and good placements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 2000, maxRank: 5000,
    fees: 210000, placementRate: 85, averagePackage: 16.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Jodhpur", slug: "iit-jodhpur", city: "Jodhpur", state: "Rajasthan",
    nirfRank: 27, nirfScore: 61.31, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitj.ac.in",
    overview: "Known for multidisciplinary programs and AI advancements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 2500, maxRank: 6000,
    fees: 215000, placementRate: 83, averagePackage: 14.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT (BHU) Varanasi", slug: "iit-bhu", city: "Varanasi", state: "Uttar Pradesh",
    nirfRank: 10, nirfScore: 67.24, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 1919, website: "https://www.iitbhu.ac.in",
    // Source: official IIT (BHU) website (iitbhu.ac.in: Hostels) + IIT (BHU) NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-bhu.png",
    overview: "IIT (BHU) Varanasi is an Indian Institute of Technology located on the Banaras Hindu University campus in Varanasi, Uttar Pradesh. It is fully residential, with hostels ranging from some of the oldest, such as Dr. C. V. Raman and Dhanarajgiri, to the Satish Dhawan Hostel opened in May 2022. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 97, medianPackage: 18.0,
    hostelAvailable: true,
    facilities: [
      "Hostels named after great Indian scientists and leaders, including Aryabhatta, Dr. C. V. Raman and Satish Dhawan",
      "Satish Dhawan Hostel, the newest boys' hostel, opened in May 2022",
      "Girls' hostels including the newer Nivedita Girls Hostel",
      "Central Instrument Facility for research",
      "Training & Placement Cell"
    ],
    campusLife: [
      "Life on the historic Banaras Hindu University campus in Varanasi",
      "Hostel communities with long traditions in the older hostels"
    ],
    pros: [
      "Of 1,090 B.Tech students graduating in 2024-25, 1,061 were placed and 26 went on to higher studies",
      "Median B.Tech salary of ₹18 lakh (2024-25 graduates)",
      "Placement rate above 90% for each of the last three batches (NIRF 2026 data)"
    ],
    cons: [
      "Fee amounts weren't on the pages checked, so confirm them during admission"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT (BHU) Varanasi website (Hostels) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Palakkad", slug: "iit-palakkad", city: "Palakkad", state: "Kerala",
    nirfRank: 64, nirfScore: 51.2, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2015, website: "https://iitpkd.ac.in",
    // Source: official IIT Palakkad website (iitpkd.ac.in: About, Hostels) + IIT Palakkad NIRF 2025 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-palakkad-on-dark.png", campusAcres: 504,
    overview: "IIT Palakkad was established in 2015, starting with 120 students in July 2015 and growing to about 1,700. It sits at the Palakkad Gap in the Western Ghats, the northern gateway to Kerala, near the Silent Valley rainforests. It completed its move to its permanent Nila and Sahyadri campuses at the foothills of the Sahyadri range in 2023; the Sahyadri campus alone covers 504 acres. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 67, medianPackage: 12.0,
    hostelAvailable: true,
    facilities: [
      "Six hostels: four on the Nila campus and two on the Sahyadri campus",
      "Rooms are double, triple or quadruple sharing on Nila; single, triple or quadruple on Sahyadri",
      "Hostels have water heaters, RO drinking water, washing machines, Wi-Fi and LAN, a dining hall, games area and fitness centre",
      "Saraswati academic block with a 2,000-seat classroom complex, Central Fabrication Facility and research complex",
      "Institute clinic, amenity centre, Csquare innovation lab and eateries including Kaapi and an Amul outlet",
      "Shuttle between the two campuses"
    ],
    campusLife: [
      "Green campus at the foot of the Western Ghats, near the Silent Valley rainforests",
      "Separate messes on both campuses plus campus cafés",
      "Guest rooms for visiting family"
    ],
    sports: [
      "On-campus football, volleyball, basketball and table tennis",
      "Professional coaches for athletics, football, volleyball and cricket",
      "Badminton at the 4GB Badminton Academy in Palakkad"
    ],
    pros: [
      "Of 156 B.Tech students graduating in 2023-24, 105 were placed and 16 went on to higher studies",
      "Median B.Tech salary of ₹12 lakh (2023-24 graduates)",
      "Brand-new permanent campus with modern labs and coaching for several sports"
    ],
    cons: [
      "Most rooms are shared, often by three or four students",
      "Two separate campuses connected by shuttle",
      "Fee amounts weren't on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Palakkad website (About, Hostels) and its NIRF 2025 Engineering data submission (students graduating in 2023-24). Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIT Tirupati", slug: "iit-tirupati", city: "Tirupati", state: "Andhra Pradesh",
    nirfRank: 57, nirfScore: 52.73, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2015, website: "https://www.iittp.ac.in",
    overview: "Fastest growing among the newer IITs.",
    course: "B.Tech CSE", exam: "JEE", minRank: 3000, maxRank: 7500,
    fees: 210000, placementRate: 81, averagePackage: 12.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Bhilai", slug: "iit-bhilai", city: "Durg", state: "Chhattisgarh",
    nirfRank: 72, nirfScore: 50.37, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2016, website: "https://www.iitbhilai.ac.in",
    overview: "Emerging IIT with strong focus on core engineering.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4000, maxRank: 9000,
    fees: 200000, placementRate: 78, averagePackage: 11.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Goa", slug: "iit-goa-new", city: "Ponda", state: "Goa",
    type: "IIT", ownership: "Government", established: 2016, website: "https://www.iitgoa.ac.in",
    overview: "New IIT situated in a vibrant location with growing industry ties.",
    course: "B.Tech CSE", exam: "JEE", minRank: 3500, maxRank: 8500,
    fees: 205000, placementRate: 79, averagePackage: 11.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Jammu", slug: "iit-jammu", city: "Jammu", state: "Jammu and Kashmir",
    nirfRank: 56, nirfScore: 53.08, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2016, website: "https://www.iitjammu.ac.in",
    overview: "Scenic campus with rapidly developing academic programs.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4500, maxRank: 10000,
    fees: 200000, placementRate: 75, averagePackage: 10.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Dharwad", slug: "iit-dharwad", city: "Dharwad", state: "Karnataka",
    nirfRank: 77, nirfScore: 48.61, nirfYear: 2025,
    type: "IIT", ownership: "Government", established: 2016, website: "https://www.iitdh.ac.in",
    // Source: official IIT Dharwad website (iitdh.ac.in: About, Programmes) + IIT Dharwad NIRF 2026 Engineering data. Checked 24 Nov 2026.
    logo: "/logos/iit-dharwad.png",
    overview: "IIT Dharwad is one of the newer IITs, in Dharwad, Karnataka. It offers B.Tech programmes in Computer Science & Engineering, Electrical Engineering, Chemical & Biochemical Engineering, Civil & Infrastructure Engineering and more, plus interdisciplinary BS degrees in mathematics and physics, M.Sc., M.Tech and PhD. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 69, medianPackage: 13.25,
    hostelAvailable: true,
    facilities: [
      "Departments of Computer Science & Engineering, Electrical, Electronics & Communication, Mechanical, Materials & Aerospace, Chemical, and Civil & Infrastructure Engineering",
      "Hostels with resident wardens",
      "Crèche facility on campus"
    ],
    campusLife: [
      "Orientation programmes on sports, physical fitness and holistic development",
      "Interdisciplinary BS programmes alongside B.Tech"
    ],
    pros: [
      "Of 159 B.Tech students graduating in 2024-25, 110 were placed and 31 went on to higher studies",
      "Median B.Tech salary of ₹13.25 lakh (2024-25 graduates)",
      "Small batches at a newer IIT"
    ],
    cons: [
      "Placement rate was 62%–69% over the last three batches, so check the numbers for your branch",
      "Fee amounts weren't on the pages checked"
    ],
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years" },
      { name: "B.Tech Electrical Engineering", duration: "4 years" },
      { name: "B.Tech Chemical & Biochemical Engineering", duration: "4 years" },
      { name: "B.Tech Civil & Infrastructure Engineering", duration: "4 years" },
      { name: "BS Interdisciplinary Sciences (Mathematics / Physics major)", duration: "4 years" }
    ],
    sourceNote: "From the official IIT Dharwad website (About, Programmes) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    // Source: official IIITDM Kurnool website (iiitk.ac.in: About, Sports Facilities). Checked 25 Nov 2026.
    name: "IIITDM Kurnool", slug: "iiitdm-kurnool", city: "Kurnool", state: "Andhra Pradesh",
    type: "IIIT", ownership: "Government", established: 2015, website: "https://iiitk.ac.in",
    logo: "/logos/iiitdm-kurnool.png", campusAcres: 151,
    overview: "The Indian Institute of Information Technology, Design & Manufacturing, Kurnool was announced in 2014 under the IIIT Act, 2014, to meet the Government of India's commitment under the Andhra Pradesh Reorganisation Act. It is fully funded by the Ministry of Education and began teaching in August 2015 at its mentor institute, IIITDM Kancheepuram. It became an Institute of National Importance in August 2017. Its 151-acre permanent campus sits on a hill overlooking Kurnool, with strong winds from the Tungabhadra river.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "151-acre hilltop campus in the Rayalaseema region, overlooking Kurnool city",
      "Institute Fitness Centre with modern gym equipment and a trainer, plus open-air gym",
      "Training and Placement Cell and Internship & Placement Cell"
    ],
    campusLife: [
      "Faculty and staff regularly play sports with students",
      "Quiet campus away from city life, described by the institute as like a hill station"
    ],
    sports: [
      "Sardar Vallabhbhai Patel Indoor Stadium with badminton courts and a seating gallery",
      "Basketball, volleyball, tennis, throwball, kabaddi and kho kho courts",
      "Table tennis, carrom and chess facilities",
      "Shri Krishnadevaraya ground for outdoor games"
    ],
    pros: [
      "Institute of National Importance, fully funded by the Ministry of Education",
      "Wide range of sports facilities and a supervised fitness centre",
      "Peaceful hilltop campus"
    ],
    cons: [
      "Campus is far from a metro city",
      "Placement figures and fees weren't readable on the pages checked"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIITDM Kurnool website (About, Sports Facilities). Its NIRF data is on a separate file site that wasn't checked; fees and placement figures weren't readable."
  },
  {
    // Source: official IIIT Sri City website (iiits.ac.in: About, Hostels & Dining, Sports, Placements). Checked 25 Nov 2026.
    name: "IIIT Sri City", slug: "iiit-sri-city", city: "Sri City", state: "Andhra Pradesh",
    type: "IIIT (PPP)", ownership: "Government", established: 2013, website: "https://iiits.ac.in",
    logo: "/logos/iiit-sri-city.png",
    overview: "IIIT Sri City was established in 2013 by the Ministry of Education as an Institute of National Importance. It was set up as a public-private partnership between the Government of India, the Government of Andhra Pradesh and industry partners represented by the Sri City Foundation. It is in Sri City, about 60 km from Chennai on the Nellore highway, with Chennai and Tirupati airports each about 70 km away. It offers B.Tech, M.Tech, MS and PhD programmes and is known for undergraduate-led research.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Two hostel blocks with a large dining hall; two more blocks are being built",
      "Leased apartments in and around Sri City while new hostels are completed",
      "Buses between hostels and the institute during academic hours and for meals",
      "Multi-gym with modern equipment"
    ],
    campusLife: [
      "Undergraduates take part in research from early on",
      "Internships encouraged from the first year",
      "CSE students follow a full-stack development stream from the second year",
      "Students can move around campus until 10 pm; some study areas stay open later"
    ],
    sports: [
      "Sports facilities and a physical education programme",
      "General Championship sports competition among students",
      "Multi-gym for aerobic training"
    ],
    pros: [
      "Strong focus on undergraduate research and practical programming",
      "About an hour from Chennai",
      "Internships from the first year"
    ],
    cons: [
      "Some students live in leased apartments until new hostels are ready",
      "Mess is compulsory for all students",
      "Fees and placement figures weren't on the pages checked"
    ],
    courses: [
      { name: "B.Tech Computer Science and Engineering", duration: "4 years" },
      { name: "B.Tech Electronics and Communication Engineering", duration: "4 years" }
    ],
    sourceNote: "From the official IIIT Sri City website (About, Hostels & Dining, Sports, Campus Placement). NIRF data, fees and placement figures weren't on the pages checked."
  },
  {
    // Source: official IIPE website (iipe.ac.in: Sports, Student Life). Checked 25 Nov 2026.
    name: "Indian Institute of Petroleum & Energy (IIPE)", slug: "iipe-visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh",
    type: "National Institute", ownership: "Government", website: "https://iipe.ac.in",
    overview: "The Indian Institute of Petroleum and Energy (IIPE) in Visakhapatnam focuses on petroleum, energy and earth sciences, with a Department of Petroleum Engineering & Earth Sciences. It offers two B.Tech branches with a common first year, plus M.Tech and PhD programmes. Undergraduate admission is through JEE (Main).",
    course: "B.Tech Petroleum Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Separate boys' and girls' hostels",
      "Career Development Centre"
    ],
    campusLife: [
      "Students' Council with elected President, Vice President, Secretary and executives",
      "Common first year for both B.Tech branches",
      "Online certification courses in data science and machine learning"
    ],
    sports: ["Sports and Games Committee that runs sports activities and competitions"],
    pros: [
      "Specialised in petroleum and energy, a niche few colleges offer",
      "Located in Visakhapatnam, a major port and industrial city"
    ],
    cons: [
      "Only two B.Tech branches",
      "Logo, fees, placement figures and NIRF data couldn't be read from its website"
    ],
    courses: [{ name: "B.Tech Petroleum Engineering", duration: "4 years" }],
    sourceNote: "From the official IIPE website (Sports, Student Life, hostel pages). Its NIRF report and admission flyer refused automated downloads, so fees and placement figures aren't available."
  },
  {
    name: "NIT Rourkela", slug: "nit-rourkela", city: "Rourkela", state: "Odisha",
    nirfRank: 13, nirfScore: 66.62, nirfYear: 2025,
    // Source: official NIT Rourkela website (nitrkl.ac.in: home, Campus Facility) + NITR NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1961, website: "https://www.nitrkl.ac.in",
    logo: "/logos/nit-rourkela.png",
    overview: "NIT Rourkela began as the Regional Engineering College, Rourkela in 1961 and was raised to a National Institute of Technology with university status by the Government of India, which funds it. It is run by the Board of Governors of the NIT Rourkela Society and trains engineers and scientists at undergraduate and postgraduate levels. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 81, medianPackage: 18.38,
    hostelAvailable: true,
    facilities: [
      "Biju Patnaik Central Library, running since 1965, with print and electronic collections",
      "Residential halls where students live in single or shared study bedrooms",
      "Central Research Facility for advanced instruments"
    ],
    pros: [
      "Of 1,021 B.Tech students graduating in 2024-25, 829 were placed and 155 went on to higher studies",
      "Median B.Tech salary of ₹18.38 lakh (2024-25 graduates)",
      "NIRF 2025 Engineering rank 13"
    ],
    cons: [
      "Rourkela is a smaller industrial city, far from big metro job hubs"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NIT Rourkela website (home page, Campus Facility) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Siksha 'O' Anusandhan (ITER)", slug: "siksha-o-anusandhan", city: "Bhubaneswar", state: "Odisha",
    nirfRank: 22, nirfScore: 62.58, nirfYear: 2025,
    // Source: official Siksha 'O' Anusandhan website (soa.ac.in: home). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", website: "https://www.soa.ac.in",
    overview: "Siksha 'O' Anusandhan is a deemed-to-be university in Bhubaneswar, Odisha. Its engineering faculty is the Institute of Technical Education and Research (ITER). Admission is through the university's own entrance test, SAAT.",
    course: "B.Tech Computer Science and Engineering", exam: "SAAT",
    hostelAvailable: true,
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official SOA website. Its NIRF data files are hosted on an outside file-sharing site we could not open, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Amrita Vishwa Vidyapeetham", slug: "amrita-coimbatore", city: "Coimbatore", state: "Tamil Nadu",
    nirfRank: 23, nirfScore: 62.46, nirfYear: 2025,
    // Source: official Amrita website (amrita.edu: About). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", website: "https://www.amrita.edu",
    overview: "Amrita Vishwa Vidyapeetham is a multi-disciplinary, research-intensive private deemed university with over 31,000 students and more than 2,150 faculty members, accredited A++ by NAAC. It has ten campuses: Amaravati, Amritapuri, Bengaluru, Chennai, Coimbatore, Kochi, Mysuru, Nagercoil, NCR Delhi (Faridabad) and Haridwar, together spanning over 1,200 acres. Its engineering school is headquartered in Coimbatore. B.Tech admission is through the Amrita Engineering Entrance Exam (AEEE).",
    course: "B.Tech Computer Science and Engineering", exam: "AEEE",
    hostelAvailable: true,
    pros: [
      "NAAC A++ accreditation",
      "More than 300 UG, PG and doctoral programmes across ten campuses",
      "Ranked 8th in NIRF 2025 Overall"
    ],
    cons: [
      "Branches and fees differ by campus; check the campus you are applying to"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Amrita website (About). Its NIRF data file is on a separate server we could not open, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Jamia Millia Islamia", slug: "jamia-millia-islamia", city: "New Delhi", state: "Delhi",
    nirfRank: 24, nirfScore: 62.42, nirfYear: 2025,
    // Source: official Jamia Millia Islamia website (jmi.ac.in: History). Checked 24 Nov 2026.
    type: "Central University", ownership: "Government", established: 1920, website: "https://www.jmi.ac.in",
    logo: "/logos/jamia-millia-islamia.svg",
    overview: "Jamia Millia Islamia was founded at Aligarh in 1920, when nationalist teachers and students answered Mahatma Gandhi's call to boycott colonial-supported institutions. It moved to New Delhi and became a Central University by an Act of Parliament in 1988. In Urdu, Jamia means 'university' and Millia means 'national'. Its Faculty of Engineering and Technology offers B.Tech programmes, with admission through JEE (Main).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "Central university in New Delhi with low government fees",
      "Sports facilities run by its Games & Sports department"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Jamia Millia Islamia website (History). Placement and fee figures were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Warangal", slug: "nit-warangal", city: "Warangal", state: "Telangana",
    nirfRank: 28, nirfScore: 61.05, nirfYear: 2025,
    // Source: official NIT Warangal website (nitw.ac.in: home). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1959, website: "https://www.nitw.ac.in",
    logo: "/logos/nit-warangal.png",
    overview: "NIT Warangal was the first of the Regional Engineering Colleges, set up in 1959, and is now an Institution of National Importance under the NIT Act, funded by the Government of India. Its campus is in Warangal, Telangana. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "First of India's Regional Engineering Colleges (now NITs)",
      "NIRF 2025 Engineering rank 28"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "The NIT Warangal website only loads with JavaScript, so we could only confirm its logo and basic facts. Placement and fee figures are not shown yet. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Thapar Institute of Engineering and Technology", slug: "thapar", city: "Patiala", state: "Punjab",
    nirfRank: 29, nirfScore: 60.97, nirfYear: 2025,
    // Source: official Thapar Institute website (thapar.edu: About us) + Thapar NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1956, website: "https://www.thapar.edu",
    logo: "/logos/thapar.png", campusAcres: 250,
    overview: "Thapar Institute of Engineering and Technology (TIET), founded in 1956, is one of India's oldest private engineering institutions. Its 250-acre campus is in Patiala, Punjab, and it is a deemed-to-be university accredited A++ by NAAC. B.Tech admission is mainly through JEE (Main) scores.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 86, medianPackage: 10,
    hostelAvailable: true,
    pros: [
      "Of 2,205 B.Tech students graduating in 2024-25, 1,900 were placed and 140 went on to higher studies",
      "Median B.Tech salary of ₹10 lakh (2024-25 graduates)",
      "NAAC A++ accreditation and a 250-acre campus"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Thapar website (About us) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Chandigarh University", slug: "chandigarh-university", city: "Mohali", state: "Punjab",
    nirfRank: 31, nirfScore: 60.46, nirfYear: 2025,
    // Source: official Chandigarh University website (cuchd.in: About) + CU NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Private University", ownership: "Private", established: 2012, website: "https://www.cuchd.in",
    logo: "/logos/chandigarh-university.png",
    overview: "Chandigarh University is a private university set up by the Punjab State Legislature and recognised by the UGC. Its campus is at Gharuan, Mohali, near Chandigarh. It is accredited A+ by NAAC and says it was the youngest private university in India to get an A+ in its first accreditation cycle. Admission is through its own test, CUCET.",
    course: "B.Tech Computer Science and Engineering", exam: "CUCET",
    placementRate: 75, medianPackage: 8,
    hostelAvailable: true,
    pros: [
      "Of 3,011 B.Tech students graduating in 2024-25, 2,258 were placed and 703 went on to higher studies",
      "Median B.Tech salary of ₹8 lakh (2024-25 graduates)",
      "NAAC A+ accreditation"
    ],
    cons: [
      "Very large batches (about 3,000 B.Tech graduates a year), so ask about class sizes and branch-wise placement"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Chandigarh University website (About) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Founding year from its establishment by the Punjab State Legislature. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Kalasalingam Academy of Research and Education", slug: "kalasalingam", city: "Krishnan Koil", state: "Tamil Nadu",
    nirfRank: 33, nirfScore: 59.03, nirfYear: 2025,
    // Source: official Kalasalingam website (kalasalingam.ac.in: About us, Campus life, Hostel & mess, Admissions) + KARE NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1984, website: "https://www.kalasalingam.ac.in",
    logo: "/logos/kalasalingam.png",
    overview: "Kalasalingam Academy of Research and Education (KARE), formerly Arulmigu Kalasalingam College of Engineering, was founded in 1984 by freedom fighter and philanthropist T. Kalasalingam. It is a deemed-to-be university at the foothills of the Western Ghats in southern Tamil Nadu, near Krishnankoil. B.Tech applicants are shortlisted on their marks in KUEE, the university's entrance exam, and must have at least 50% in Physics, Chemistry and Mathematics in Class 12.",
    course: "B.Tech Computer Science and Engineering", exam: "KUEE",
    placementRate: 94, medianPackage: 6.35,
    hostelAvailable: true,
    facilities: [
      "Separate furnished hostel buildings for boys and girls inside the main campus",
      "Hostels close to academic buildings and sports facilities"
    ],
    campusLife: [
      "Green campus where peacocks, deer and bison from the Western Ghats are often seen",
      "Cultural, recreational and educational programmes run by the hostel directorate",
      "International students on campus"
    ],
    pros: [
      "Of 1,610 B.Tech students graduating in 2024-25, 1,507 were placed",
      "Median B.Tech salary of ₹6.35 lakh (2024-25 graduates)",
      "Fully residential campus with on-campus hostels"
    ],
    cons: [
      "Rural location, far from big cities"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Kalasalingam website (About us, Campus life, Hostel & mess, Admissions) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "SASTRA Deemed University", slug: "sastra", city: "Thanjavur", state: "Tamil Nadu",
    nirfRank: 40, nirfScore: 58.02, nirfYear: 2025,
    // Source: official SASTRA website (sastra.edu: About us, Accreditation & Ranking). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1984, website: "https://www.sastra.edu",
    logo: "/logos/sastra.png",
    overview: "SASTRA (Shanmugha Arts, Science, Technology & Research Academy) is a deemed-to-be university in Thanjavur, Tamil Nadu, teaching engineering, management, law, sciences and humanities. It was re-accredited in its fourth NAAC cycle with the top A++ grade and a score of 3.76, which it says makes it the top university of its kind in Tamil Nadu. B.Tech admission uses JEE (Main) scores together with Class 12 marks.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "NAAC A++ grade with a score of 3.76 (fourth cycle)",
      "Consistently ranked in the NIRF Engineering top 50"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official SASTRA website (About us, Accreditation & Ranking). Its NIRF data is shown in a page-flip viewer we could not read, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "UPES", slug: "upes", city: "Dehradun", state: "Uttarakhand",
    nirfRank: 43, nirfScore: 56.99, nirfYear: 2025,
    // Source: official UPES website (upes.ac.in: About us) + UPES NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Private University", ownership: "Private", established: 2003, website: "https://www.upes.ac.in",
    logo: "/logos/upes.svg",
    overview: "UPES is a UGC-recognised private university in Dehradun, Uttarakhand, set up under the UPES Act, 2003 of the Uttarakhand State Legislature. It teaches through seven schools, including the School of Advanced Engineering and the School of Computer Science, and has about 19,100 students and 1,500 faculty and staff. In NIRF 2025 it ranked 43 in Engineering and 45 among universities. Admission is through its own test, UPESEAT, or other accepted scores.",
    course: "B.Tech Computer Science and Engineering", exam: "UPESEAT",
    placementRate: 94, medianPackage: 6.75,
    hostelAvailable: true,
    pros: [
      "Of 1,133 B.Tech students graduating in 2024-25, 1,070 were placed",
      "Median B.Tech salary of ₹6.75 lakh (2024-25 graduates)",
      "NIRF 2025: Engineering 43, Universities 45, Law 18, Management 36",
      "Over 50 faculty members on Stanford's list of the world's top 2% researchers, according to UPES"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official UPES website (About us) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Saveetha Institute of Medical and Technical Sciences (SIMATS)", slug: "saveetha", city: "Chennai", state: "Tamil Nadu",
    nirfRank: 45, nirfScore: 56.55, nirfYear: 2025,
    // Source: official SIMATS website (saveetha.com: About us). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", website: "https://www.saveetha.com",
    campusAcres: 245,
    overview: "Saveetha Institute of Medical and Technical Sciences (SIMATS) is a deemed-to-be university in Chennai, accredited A++ by NAAC. Its campus covers more than 245 acres with 14 institutions, about 17,000 students and 5,500 staff. Engineering is taught at the Saveetha School of Engineering.",
    course: "B.Tech Computer Science and Engineering", exam: "See official website",
    hostelAvailable: true,
    pros: [
      "NAAC A++ accreditation",
      "Large campus of more than 245 acres"
    ],
    cons: [
      "Best known for medicine and dentistry; check engineering-specific placement figures before joining"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official SIMATS website (About us). Its NIRF data and logo are on outside servers we could not open, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Symbiosis International University (SIT Pune)", slug: "symbiosis", city: "Pune", state: "Maharashtra",
    nirfRank: 46, nirfScore: 56.22, nirfYear: 2025,
    // Source: official Symbiosis International University website (siu.edu.in: home, About us, Faculty of Engineering). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 2002, website: "https://www.siu.edu.in",
    logo: "/logos/symbiosis.webp",
    overview: "Symbiosis International (Deemed University) in Pune has Category-I status from the UGC and an A++ grade from NAAC. Its Faculty of Engineering, mainly the Symbiosis Institute of Technology, offers B.Tech programmes such as Computer Science, Artificial Intelligence and Machine Learning, and Electronics & Telecommunication. Admission is through the Symbiosis Institute of Technology Engineering Entrance Exam (SITEEE) or JEE (Main) scores.",
    course: "B.Tech Computer Science and Engineering", exam: "SITEEE",
    hostelAvailable: true,
    pros: [
      "NAAC A++ and UGC Category-I status",
      "Research centres in nanoscience and applied artificial intelligence"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }, { name: "B.Tech Artificial Intelligence and Machine Learning", duration: "4 years" }, { name: "B.Tech Electronics & Tele-Communication Engineering", duration: "4 years" }],
    sourceNote: "From the official Symbiosis International University website (home, About us, Faculty of Engineering). Placement and fee figures were not on these pages. Founding year is when it became a deemed university. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Sri Sivasubramaniya Nadar (SSN) College of Engineering", slug: "ssn-college", city: "Kalavakkam", state: "Tamil Nadu",
    nirfRank: 47, nirfScore: 56.08, nirfYear: 2025,
    // Source: official SSN website (ssn.edu.in: home). Checked 24 Nov 2026.
    type: "Private College", ownership: "Private", established: 1996, website: "https://www.ssn.edu.in",
    logo: "/logos/ssn-college.png",
    overview: "Sri Sivasubramaniya Nadar (SSN) College of Engineering in Kalavakkam, near Chennai, was founded by Shiv Nadar. Important: its website now says SSN College of Engineering is no longer accepting applications, and asks students to apply to similar programmes at the SSN School of Engineering, Shiv Nadar University Chennai (SNUC). The campus also houses the SSN Research Centre.",
    course: "B.Tech Computer Science and Engineering", exam: "See official website",
    hostelAvailable: true,
    pros: [
      "NIRF 2025 Engineering rank 47",
      "SSN Research Centre with multidisciplinary research labs"
    ],
    cons: [
      "No longer accepting applications: new students apply to the SSN School of Engineering at Shiv Nadar University Chennai instead"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official SSN website (home page). The NIRF rank belongs to SSN College of Engineering; check the separate Shiv Nadar University Chennai programme before applying. Placement and fee figures were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Durgapur", slug: "nit-durgapur", city: "Durgapur", state: "West Bengal",
    nirfRank: 49, nirfScore: 55.94, nirfYear: 2025,
    // Source: official NIT Durgapur website (nitdgp.ac.in: home). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1960, website: "https://www.nitdgp.ac.in",
    logo: "/logos/nit-durgapur.png",
    overview: "NIT Durgapur in West Bengal started as a Regional Engineering College in 1960 and is now an Institution of National Importance under the NIT Act, funded by the Government of India. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "NIRF 2025 Engineering rank 49",
      "Government-funded research projects, such as next-generation nano-dielectrics for high-speed devices"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NIT Durgapur website (home page). Its NIRF data page did not load for us, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Silchar", slug: "nit-silchar", city: "Silchar", state: "Assam",
    nirfRank: 50, nirfScore: 55.91, nirfYear: 2025,
    // Source: official NIT Silchar website (nits.ac.in: History, Hostels). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1967, website: "https://www.nits.ac.in",
    logo: "/logos/nit-silchar.png", campusAcres: 540,
    overview: "NIT Silchar began in 1967 as a Regional Engineering College, working first from a camp office in Shillong, and admitted its first 60 B.E. students in 1977. It became a National Institute of Technology with deemed university status on 28 June 2002. Its campus of about 540 acres is 8 km south of Silchar town, Assam, on the Silchar–Hailakandi road. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Eight boys' hostels and three girls' hostels, each with its own mess committee",
      "A 1,000-bed boys' hostel, a 300-bed PG hostel and a married scholars' hostel have been built"
    ],
    pros: [
      "Large 540-acre campus",
      "NIRF 2025 Engineering rank 50"
    ],
    cons: [
      "Silchar is far from major cities; travel to and from home takes longer"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NIT Silchar website (History, Hostels). Placement and fee figures were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Patna", slug: "nit-patna", city: "Patna", state: "Bihar",
    nirfRank: 53, nirfScore: 53.89, nirfYear: 2025,
    // Source: official NIT Patna website (nitp.ac.in: home). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1886, website: "https://www.nitp.ac.in",
    logo: "/logos/nit-patna.png",
    overview: "NIT Patna is an Institution of National Importance under the Ministry of Education, on the banks of the Ganga in Patna, Bihar. It traces its history to 1886 and was the Bihar College of Engineering before it became an NIT in 2004. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    fests: [
      "Tatva (techno-management fest)"
    ],
    pros: [
      "One of India's oldest engineering institutions",
      "NIRF 2025 Engineering rank 53"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NIT Patna website (home page). Placement and fee figures were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIEST Shibpur", slug: "iiest-shibpur", city: "Howrah", state: "West Bengal",
    nirfRank: 54, nirfScore: 53.63, nirfYear: 2025,
    // Source: official IIEST Shibpur website (iiests.ac.in: home). Checked 24 Nov 2026.
    type: "Institute of National Importance", ownership: "Government", established: 1856, website: "https://www.iiests.ac.in",
    logo: "/logos/iiest-shibpur.png",
    overview: "The Indian Institute of Engineering Science and Technology (IIEST), Shibpur, in Howrah near Kolkata, is an Institution of National Importance. It traces its roots to 1856 and was long known as Bengal Engineering College, one of India's oldest engineering colleges. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "One of India's oldest engineering colleges, on the banks of the Hooghly",
      "NIRF 2025 Engineering rank 54"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIEST Shibpur website (home page). Its NIRF data page did not load for us, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Manipal University Jaipur", slug: "manipal-jaipur", city: "Jaipur", state: "Rajasthan",
    nirfRank: 58, nirfScore: 52.69, nirfYear: 2025,
    // Source: official Manipal University Jaipur website (jaipur.manipal.edu: About, NIRF). Checked 24 Nov 2026.
    type: "Private University", ownership: "Private", established: 2011, website: "https://www.jaipur.manipal.edu",
    logo: "/logos/manipal-jaipur.svg",
    overview: "Manipal University Jaipur (MUJ) is a private university in Jaipur, Rajasthan, run by the Manipal group. Its engineering faculty offers B.Tech programmes in Computer Science, Data Science, Computer & Communication, Civil and other branches, including dual-degree options with partner universities in Australia. Admission is through the Manipal Entrance Test (MET).",
    course: "B.Tech Computer Science and Engineering", exam: "MET",
    hostelAvailable: true,
    pros: [
      "Dual-degree options with universities such as Melbourne and Deakin",
      "NIRF 2025 Engineering rank 58"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Manipal University Jaipur website (About, NIRF). Its NIRF data file is a scanned image we could not read, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Madan Mohan Malaviya University of Technology", slug: "mmmut", city: "Gorakhpur", state: "Uttar Pradesh",
    nirfRank: 60, nirfScore: 52.45, nirfYear: 2025,
    // Source: official MMMUT website (mmmut.ac.in: About) + MMMUT NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "State University", ownership: "Government", established: 1962, website: "https://www.mmmut.ac.in",
    logo: "/logos/mmmut.jpg",
    overview: "Madan Mohan Malaviya University of Technology (MMMUT) is a state government university in Gorakhpur, Uttar Pradesh, with a NAAC 'A' grade. It started as an engineering college in 1962 and now teaches engineering, applied sciences, management and other subjects. B.Tech admission is based on JEE (Main) scores.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 88, medianPackage: 13.75,
    hostelAvailable: true,
    pros: [
      "Of 858 B.Tech students graduating in 2024-25, 756 were placed and 102 went on to higher studies",
      "Median B.Tech salary of ₹13.75 lakh (2024-25 graduates), as submitted to NIRF",
      "Low state-government fees"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official MMMUT website (About) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Birla Institute of Technology, Mesra", slug: "bit-mesra", city: "Ranchi", state: "Jharkhand",
    nirfRank: 51, nirfScore: 55.28, nirfYear: 2025,
    // Source: official BIT Mesra website (bitmesra.ac.in: home). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1955, website: "https://bitmesra.ac.in",
    logo: "/logos/bit-mesra.png",
    overview: "Birla Institute of Technology (BIT) Mesra, founded in 1955 by industrialist and philanthropist B.M. Birla, is one of the oldest institutes of technology in independent India. It is a deemed-to-be university in Mesra, Ranchi, the capital of Jharkhand, set among forests and hills. B.Tech admission is based on JEE (Main) scores.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "One of the oldest technology institutes in independent India",
      "GP Birla scholarships and BIT financial assistantships for students, awarded on semester results"
    ],
    cons: [
      "Campus is outside Ranchi city"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official BIT Mesra website (home page). Its NIRF data files are on a separate server we could not open, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Graphic Era (Deemed to be University)", slug: "graphic-era", city: "Dehradun", state: "Uttarakhand",
    nirfRank: 52, nirfScore: 55.26, nirfYear: 2025,
    // Source: official Graphic Era website (geu.ac.in: About overview) + GEU NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1993, website: "https://geu.ac.in",
    logo: "/logos/graphic-era.webp",
    overview: "Graphic Era began in 1993 as a small computer centre founded by Prof. (Dr.) Kamal Ghanshala and was granted deemed-to-be university status in 2008. It is in Dehradun, Uttarakhand, and was placed among India's top 50 universities in NIRF 2025.",
    course: "B.Tech Computer Science and Engineering", exam: "See official website",
    placementRate: 81, medianPackage: 6.75,
    hostelAvailable: true,
    pros: [
      "Of 974 B.Tech students graduating in 2024-25, 786 were placed and 68 went on to higher studies",
      "Median B.Tech salary of ₹6.75 lakh (2024-25 graduates)"
    ],
    cons: [
      "Placement % was much lower in earlier years (452 of 916 graduates placed in 2023-24)"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Graphic Era website (About overview) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Indian Institute of Space Science and Technology (IIST)", slug: "iist", city: "Thiruvananthapuram", state: "Kerala",
    nirfRank: 61, nirfScore: 52.44, nirfYear: 2025,
    // Source: official IIST website (iist.ac.in: About IIST) + IIST NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Government", established: 2007, website: "https://www.iist.ac.in",
    logo: "/logos/iist.png",
    overview: "The Indian Institute of Space Science and Technology (IIST) was set up in 2007 at Valiamala, Thiruvananthapuram, Kerala, under the Department of Space, to promote education and research in space science and technology. It offers B.Tech in Aerospace Engineering and Electronics & Communication Engineering, and a dual degree with a B.Tech in Engineering Physics. B.Tech admission is based on JEE (Advanced) ranks.",
    course: "B.Tech Aerospace Engineering", exam: "JEE",
    placementRate: 67, medianPackage: 11.98,
    hostelAvailable: true,
    pros: [
      "Of 119 B.Tech students graduating in 2024-25, 80 were placed and 21 went on to higher studies",
      "Median B.Tech salary of ₹11.98 lakh (2024-25 graduates)",
      "Small batches and a focus on space science, under the Department of Space"
    ],
    cons: [
      "Only a few B.Tech branches, all space-related"
    ],
    courses: [{ name: "B.Tech Aerospace Engineering", duration: "4 years" }, { name: "B.Tech Electronics and Communication Engineering", duration: "4 years" }],
    sourceNote: "From the official IIST website (About IIST) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "MNNIT Allahabad", slug: "mnnit-allahabad", city: "Prayagraj", state: "Uttar Pradesh",
    nirfRank: 62, nirfScore: 52.15, nirfYear: 2025,
    // Source: official MNNIT Allahabad website (mnnit.ac.in: home) + MNNIT NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1961, website: "https://www.mnnit.ac.in",
    logo: "/logos/mnnit-allahabad.png",
    overview: "Motilal Nehru National Institute of Technology (MNNIT) Allahabad in Prayagraj, Uttar Pradesh, is an Institution of National Importance under the NIT Act. It began as a Regional Engineering College in 1961. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 94, medianPackage: 12.6,
    hostelAvailable: true,
    pros: [
      "Of 1,032 B.Tech students graduating in 2024-25, 966 were placed",
      "Median B.Tech salary of ₹12.6 lakh (2024-25 graduates)",
      "Four-star rating from the Ministry of Education's Institutions' Innovation Council"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official MNNIT Allahabad website (home page) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "NIT Delhi", slug: "nit-delhi", city: "Delhi", state: "Delhi",
    nirfRank: 65, nirfScore: 50.79, nirfYear: 2025,
    // Source: official NIT Delhi website (nitdelhi.ac.in: home, campus pages). Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 2010, website: "https://nitdelhi.ac.in",
    logo: "/logos/nit-delhi.svg",
    overview: "NIT Delhi is one of the newer National Institutes of Technology, set up in 2010, and is an Institution of National Importance under the NIT Act. Its campus is at Narela, Delhi. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
      "Hostels such as Dhauladhar on campus",
      "Campus transport service"
    ],
    sports: [
      "Sports club for students"
    ],
    pros: [
      "Located in the national capital",
      "NIRF 2025 Engineering rank 65"
    ],
    cons: [
      "A young institute that is still building out its campus"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official NIT Delhi website (home and campus pages). Placement and fee figures were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "SVNIT Surat", slug: "svnit-surat", city: "Surat", state: "Gujarat",
    nirfRank: 66, nirfScore: 50.77, nirfYear: 2025,
    // Source: official SVNIT website (svnit.ac.in: home, NIRF) + SVNIT NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "NIT", ownership: "Government", established: 1961, website: "https://www.svnit.ac.in",
    logo: "/logos/svnit-surat.png",
    overview: "Sardar Vallabhbhai National Institute of Technology (SVNIT) in Surat, Gujarat, is an Institution of National Importance under the NIT Act. It began as a Regional Engineering College in 1961. B.Tech admission is through JEE (Main) and JoSAA.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 74, medianPackage: 10,
    hostelAvailable: true,
    pros: [
      "Of 801 B.Tech students graduating in 2024-25, 591 were placed and 144 went on to higher studies",
      "Median B.Tech salary of ₹10 lakh (2024-25 graduates)",
      "Anti-ragging helpline publicised on the home page"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official SVNIT website (home, NIRF) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Hostel fee notices are on the website; tuition fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "Sathyabama Institute of Science and Technology", slug: "sathyabama", city: "Chennai", state: "Tamil Nadu",
    nirfRank: 67, nirfScore: 50.64, nirfYear: 2025,
    // Source: official Sathyabama website (sathyabama.ac.in: home, About us). Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1987, website: "https://www.sathyabama.ac.in",
    logo: "/logos/sathyabama.png",
    overview: "Sathyabama Institute of Science and Technology is a deemed-to-be university in Chennai, Tamil Nadu, with Category-I status from the UGC and a NAAC A++ grade. It is celebrating 39 years since its founding. Admission to engineering is through its own entrance exam, SAEEE.",
    course: "B.Tech Computer Science and Engineering", exam: "SAEEE",
    hostelAvailable: true,
    pros: [
      "NAAC A++ and UGC Category-I status",
      "Ranked 53 among universities in NIRF"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official Sathyabama website (home, About us). Its NIRF data is in a page-flip viewer on a separate server we could not open, so placement and fee figures are not shown. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
  {
    name: "IIIT Bangalore", slug: "iiit-bangalore", city: "Bengaluru", state: "Karnataka",
    nirfRank: 69, nirfScore: 50.46, nirfYear: 2025,
    // Source: official IIIT Bangalore website (iiitb.ac.in: home, About) + IIITB NIRF 2026 Engineering data. Checked 24 Nov 2026.
    type: "Deemed University", ownership: "Private", established: 1999, website: "https://www.iiitb.ac.in",
    logo: "/logos/iiit-bangalore.png",
    overview: "The International Institute of Information Technology Bangalore (IIITB) is a deemed-to-be university in Electronic City, Bengaluru, focused on IT, data science, electronics and digital society. It is best known for its Integrated M.Tech and postgraduate programmes, and started a 4-year B.Tech in 2024 with 210 seats. Admission is based on JEE (Main) ranks.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    pros: [
      "Strong postgraduate and research focus in IT and data science",
      "Located in Electronic City, a major IT hub"
    ],
    cons: [
      "The B.Tech only started in 2024, so there are no B.Tech placement results yet"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }, { name: "Integrated M.Tech", duration: "5 years" }],
    sourceNote: "From the official IIIT Bangalore website (home, About) and its NIRF 2026 Engineering data submission, which shows 210 B.Tech seats from 2024-25 and no B.Tech graduates yet. Fees were not on these pages. NIRF 2025 rank and score are from the official NIRF Engineering ranking."
  },
];
