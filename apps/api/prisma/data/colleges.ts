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
    // Source: official IIT Delhi website (home.iitd.ac.in: About, Why IIT Delhi, Facilities). Checked 24 Nov 2026.
    type: "IIT", ownership: "Government", established: 1961, website: "https://home.iitd.ac.in",
    logo: "/logos/iit-delhi.png",
    overview: "IIT Delhi began in 1961 as a College of Engineering set up with the help of the UK government. It was declared an Institution of National Importance under the Institutes of Technology (Amendment) Act, 1963, renamed Indian Institute of Technology Delhi, and made a deemed university that sets its own academic policy and awards its own degrees. More than 15,700 students have graduated from it with a B.Tech, and nearly 5,070 with a PhD.",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    hostelAvailable: true,
    facilities: [
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
      "More than 15,700 B.Tech graduates and nearly 5,070 PhDs since it started",
      "Research facilities for nanoscale work and high-performance computing on campus",
      "Located in the national capital"
    ],
    cons: [
      "Fees, placement figures and hostel details are on separate IIT Delhi sites, so check them during admission"
    ],
    courses: [{ name: "B.Tech Computer Science and Engineering", duration: "4 years" }],
    sourceNote: "From the official IIT Delhi website (About, Why IIT Delhi, Facilities). Fees, placements, NIRF rank, hostel and sports details were not on these pages."
  },
  {
    // Source: official IIT Bombay website (iitb.ac.in) + IIT Bombay NIRF 2026 Engineering data submission. Checked 24 Nov 2026.
    name: "IIT Bombay", slug: "iit-bombay", city: "Mumbai", state: "Maharashtra",
    type: "IIT", ownership: "Government", established: 1958, website: "https://www.iitb.ac.in",
    logo: "/logos/iit-bombay.png", campusAcres: 494,
    overview: "Established in 1958 with support from UNESCO and the government of the USSR, IIT Bombay was declared an Institution of National Importance by an Act of Parliament in 1961. It is a fully residential campus of 200 hectares in Powai, Mumbai, with 17 academic departments plus schools of design, management and entrepreneurship. Undergraduate entry is through JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 72, medianPackage: 20.21,
    hostelAvailable: true,
    facilities: [
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
    sourceNote: "From the official IIT Bombay website (About, Why IITB, Sports, Academic units) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees, NIRF rank and the full programme list were not on these pages."
  },
  {
    name: "NIT Tiruchirappalli", slug: "nit-trichy", city: "Tiruchirappalli", state: "Tamil Nadu",
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
    sourceNote: "From the official NIT Trichy website (About, At a Glance, Programmes, Hostels, Hospital, Library) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "BITS Pilani", slug: "bits-pilani", city: "Pilani", state: "Rajasthan",
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
    sourceNote: "From the official BITS Pilani website (About, Legacy) and its NIRF 2025 Engineering data submission, which covers all BITS campuses. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "VIT Vellore", slug: "vit-vellore", city: "Vellore", state: "Tamil Nadu",
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
    sourceNote: "From the official VIT website (About, Infrastructure) and its NIRF 2026 Engineering data submission for the Vellore campus. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "SRM Institute of Science and Technology", slug: "srm-institute", city: "Chennai", state: "Tamil Nadu",
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
    sourceNote: "From the official SRMIST website (Life at SRM, Sports, Clubs, Facilities & Operations). SRM's NIRF data, fees and placement figures are on a separate file site that wasn't checked, so they're shown as not available."
  },
  {
    name: "Manipal Institute of Technology", slug: "mit-manipal", city: "Manipal", state: "Karnataka",
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
    sourceNote: "From the official MAHE website (MIT Manipal page). The logo shown is MAHE's. NIRF data, fees and placement figures weren't available on the pages checked."
  },
  {
    name: "Delhi Technological University", slug: "dtu-delhi", city: "New Delhi", state: "Delhi",
    type: "State University", ownership: "Government", established: 1941, website: "https://dtu.ac.in",
    overview: "Strong government university with good placements and NCR industry exposure.",
    course: "B.Tech Mechanical", exam: "JEE", minRank: 1000, maxRank: 12000,
    fees: 190000, placementRate: 84, averagePackage: 14.6,
    courses: [{ name: "B.Tech Mechanical", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "Anna University", slug: "anna-university", city: "Chennai", state: "Tamil Nadu",
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
    sourceNote: "From the official Anna University website (University Profile, Sports Board, CEG B.E./B.Tech fee structure 2025-26) and its NIRF 2026 Engineering data submission. Fees = semester fees × 2 for the CEG regular programme, general category, excluding about ₹16,800 of one-time fees and deposits. Placement % = students placed ÷ students graduating."
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
    sourceNote: "From the official PES University website (About, History, Campus Life, Hostel, Sports) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "Amity University", slug: "amity-university", city: "Noida", state: "Uttar Pradesh",
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
    sourceNote: "From the official Amity University website (About, Hostel, Sports facilities, Library). NIRF data, fees and placement figures weren't on the pages checked."
  },
  {
    name: "COEP Technological University", slug: "coep-pune", city: "Pune", state: "Maharashtra",
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
    sourceNote: "From the official COEP Technological University website (About the University). NIRF data, fees, placements and hostel details weren't on the pages checked."
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
    sourceNote: "From the official IIT Guwahati website (About, Campus Life) and its NIRF 2026 Engineering data submission. Campus size converted from 285 hectares. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    // Source: official IIT Patna website (iitp.ac.in: About, History, Campus Life, Hostels). Checked 24 Nov 2026.
    name: "IIT Patna", slug: "iit-patna", city: "Bihta", state: "Bihar",
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
    sourceNote: "From the official IIT Patna website (About, History, Campus Life, Hostels). NIRF data, fees and placement figures weren't on the pages checked."
  },
  {
    name: "NIT Raipur", slug: "nit-raipur", city: "Raipur", state: "Chhattisgarh",
    type: "NIT", ownership: "Government", established: 1956, website: "https://nitrr.ac.in",
    overview: "Established institute with strong regional presence.",
    course: "B.Tech IT", exam: "JEE", minRank: 15000, maxRank: 35000,
    fees: 145000, placementRate: 78, averagePackage: 9.5,
    courses: [{ name: "B.Tech IT", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Goa", slug: "nit-goa", city: "Ponda", state: "Goa",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitgoa.ac.in",
    overview: "Rapidly improving NIT in a prime location.",
    course: "B.Tech CSE", exam: "JEE", minRank: 8000, maxRank: 20000,
    fees: 150000, placementRate: 82, averagePackage: 11.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Gandhinagar", slug: "iit-gandhinagar", city: "Gandhinagar", state: "Gujarat",
    type: "IIT", ownership: "Government", established: 2008, website: "https://iitgn.ac.in",
    overview: "Innovative curriculum and excellent facilities.",
    course: "B.Tech Mechanical", exam: "JEE", minRank: 3000, maxRank: 7000,
    fees: 225000, placementRate: 84, averagePackage: 15.5,
    courses: [{ name: "B.Tech Mechanical", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Kurukshetra", slug: "nit-kurukshetra", city: "Kurukshetra", state: "Haryana",
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
    sourceNote: "From the official NIT Kurukshetra website (Campus & Infrastructure, Sports Section, Computer Engineering department) and its NIRF 2025 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "IIT Mandi", slug: "iit-mandi", city: "Mandi", state: "Himachal Pradesh",
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
    sourceNote: "From the official IIT Mandi website (About, Sports Facilities) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "IIT (ISM) Dhanbad", slug: "iit-dhanbad", city: "Dhanbad", state: "Jharkhand",
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
    sourceNote: "From the official IIT (ISM) Dhanbad website (History) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "NITK Surathkal", slug: "nitk-surathkal", city: "Mangaluru", state: "Karnataka",
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
    sourceNote: "From the official NITK website (About Us) and its NIRF 2023 Engineering data submission, the latest on its site (covers students graduating in 2021-22). Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "NIT Calicut", slug: "nit-calicut", city: "Kozhikode", state: "Kerala",
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
    sourceNote: "From the official NIT Calicut website (About, Hostels, Tathva, campus news) and its NIRF 2026 Engineering data submission. Campus size converted from about 120 hectares. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "IIT Indore", slug: "iit-indore", city: "Indore", state: "Madhya Pradesh",
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
    sourceNote: "From the official IIT Indore website (About). NIRF data, fees, placements and hostel details are on separate sites that weren't checked."
  },
  {
    name: "VNIT Nagpur", slug: "vnit-nagpur", city: "Nagpur", state: "Maharashtra",
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
    sourceNote: "From the official VNIT Nagpur website (History, Hostel, Sports). NIRF data, fees and placement figures weren't on the pages checked."
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
    sourceNote: "From the official NIT Meghalaya website (About NIT). Recent NIRF data, fees and placement figures weren't on the pages checked."
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
    sourceNote: "From the official NIT Mizoram website (Hostels, Transportation, Health) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not on these pages."
  },
  {
    name: "NIT Nagaland", slug: "nit-nagaland", city: "Chumukedima", state: "Nagaland",
    type: "NIT", ownership: "Government", established: 2009, website: "https://www.nitnagaland.ac.in",
    overview: "Provides quality technical education in Nagaland.",
    course: "B.Tech EIE", exam: "JEE", minRank: 28000, maxRank: 52000,
    fees: 135000, placementRate: 66, averagePackage: 6.8,
    courses: [{ name: "B.Tech EIE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Bhubaneswar", slug: "iit-bhubaneswar", city: "Bhubaneswar", state: "Odisha",
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitbbs.ac.in",
    overview: "Well-established newer IIT with a massive campus.",
    course: "B.Tech CSE", exam: "JEE", minRank: 3000, maxRank: 8000,
    fees: 215000, placementRate: 83, averagePackage: 15.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Jalandhar", slug: "nit-jalandhar", city: "Jalandhar", state: "Punjab",
    type: "NIT", ownership: "Government", established: 1987, website: "https://www.nitj.ac.in",
    overview: "Good infrastructure and placement records.",
    course: "B.Tech CSE", exam: "JEE", minRank: 8000, maxRank: 20000,
    fees: 150000, placementRate: 82, averagePackage: 10.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "MNIT Jaipur", slug: "mnit-jaipur", city: "Jaipur", state: "Rajasthan",
    type: "NIT", ownership: "Government", established: 1963, website: "https://www.mnit.ac.in",
    overview: "Top-tier NIT located in the pink city.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4000, maxRank: 12000,
    fees: 155000, placementRate: 86, averagePackage: 12.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Sikkim", slug: "nit-sikkim", city: "Ravangla", state: "Sikkim",
    type: "NIT", ownership: "Government", established: 2010, website: "https://nitsikkim.ac.in",
    overview: "Beautiful campus setting with a growing academic profile.",
    course: "B.Tech CSE", exam: "JEE", minRank: 22000, maxRank: 48000,
    fees: 140000, placementRate: 70, averagePackage: 7.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    // Source: official IIT Madras website (iitm.ac.in) + IIT Madras NIRF 2026 Engineering data submission.
    // Checked 24 Nov 2026. Fee amounts and the NIRF rank are not published on those pages, so they are left empty.
    name: "IIT Madras", slug: "iit-madras", city: "Chennai", state: "Tamil Nadu",
    type: "IIT", ownership: "Government", established: 1959, website: "https://www.iitm.ac.in",
    logo: "/logos/iit-madras.png", campusAcres: 630,
    overview: "Set up in 1959 with technical assistance from the West German government and declared an Institute of National Importance in 1961, IIT Madras is a fully residential institute in South Chennai. It has 16 academic departments, nearly 100 laboratories and about 550 faculty, and has been named an Institute of Eminence. Undergraduate entry is through JEE (Main) and JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 81, medianPackage: 17.78,
    hostelAvailable: true,
    facilities: [
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
    sourceNote: "From the official IIT Madras website (About, Campus Life, Hostels, Sports, Scholarships, UG Admission 2026) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not published on these pages."
  },
  {
    name: "IIT Hyderabad", slug: "iit-hyderabad", city: "Sangareddy", state: "Telangana",
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iith.ac.in",
    overview: "Highly innovative and rapidly growing IIT.",
    course: "B.Tech CSE", exam: "JEE", minRank: 500, maxRank: 1500,
    fees: 230000, placementRate: 90, averagePackage: 22.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Agartala", slug: "nit-agartala", city: "Agartala", state: "Tripura",
    type: "NIT", ownership: "Government", established: 1965, website: "https://www.nita.ac.in",
    overview: "Large campus with improved connectivity and placements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 15000, maxRank: 35000,
    fees: 145000, placementRate: 75, averagePackage: 8.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Kanpur", slug: "iit-kanpur", city: "Kanpur", state: "Uttar Pradesh",
    type: "IIT", ownership: "Government", established: 1959, website: "https://www.iitk.ac.in",
    overview: "Pioneer in computer science education in India.",
    course: "B.Tech CSE", exam: "JEE", minRank: 100, maxRank: 1000,
    fees: 220000, placementRate: 94, averagePackage: 24.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Roorkee", slug: "iit-roorkee", city: "Roorkee", state: "Uttarakhand",
    type: "IIT", ownership: "Government", established: 1847, website: "https://www.iitr.ac.in",
    overview: "Oldest engineering college with a glorious legacy.",
    course: "B.Tech CSE", exam: "JEE", minRank: 200, maxRank: 1500,
    fees: 215000, placementRate: 92, averagePackage: 23.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Kharagpur", slug: "iit-kharagpur", city: "Kharagpur", state: "West Bengal",
    type: "IIT", ownership: "Government", established: 1951, website: "https://www.iitkgp.ac.in",
    overview: "Largest and oldest IIT campus with diverse courses.",
    course: "B.Tech CSE", exam: "JEE", minRank: 200, maxRank: 1800,
    fees: 210000, placementRate: 91, averagePackage: 22.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Ropar", slug: "iit-ropar", city: "Rupnagar", state: "Punjab",
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitrpr.ac.in",
    overview: "Established IIT with strong research focus and good placements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 2000, maxRank: 5000,
    fees: 210000, placementRate: 85, averagePackage: 16.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Jodhpur", slug: "iit-jodhpur", city: "Jodhpur", state: "Rajasthan",
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitj.ac.in",
    overview: "Known for multidisciplinary programs and AI advancements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 2500, maxRank: 6000,
    fees: 215000, placementRate: 83, averagePackage: 14.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT (BHU) Varanasi", slug: "iit-bhu", city: "Varanasi", state: "Uttar Pradesh",
    type: "IIT", ownership: "Government", established: 1919, website: "https://www.iitbhu.ac.in",
    overview: "Historic institute located within the Banaras Hindu University campus.",
    course: "B.Tech CSE", exam: "JEE", minRank: 800, maxRank: 3000,
    fees: 205000, placementRate: 88, averagePackage: 19.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Palakkad", slug: "iit-palakkad", city: "Palakkad", state: "Kerala",
    type: "IIT", ownership: "Government", established: 2015, website: "https://iitpkd.ac.in",
    overview: "Rapidly growing new IIT with modern infrastructure.",
    course: "B.Tech CSE", exam: "JEE", minRank: 3500, maxRank: 8000,
    fees: 200000, placementRate: 80, averagePackage: 12.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Tirupati", slug: "iit-tirupati", city: "Tirupati", state: "Andhra Pradesh",
    type: "IIT", ownership: "Government", established: 2015, website: "https://www.iittp.ac.in",
    overview: "Fastest growing among the newer IITs.",
    course: "B.Tech CSE", exam: "JEE", minRank: 3000, maxRank: 7500,
    fees: 210000, placementRate: 81, averagePackage: 12.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Bhilai", slug: "iit-bhilai", city: "Durg", state: "Chhattisgarh",
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
    type: "IIT", ownership: "Government", established: 2016, website: "https://www.iitjammu.ac.in",
    overview: "Scenic campus with rapidly developing academic programs.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4500, maxRank: 10000,
    fees: 200000, placementRate: 75, averagePackage: 10.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Dharwad", slug: "iit-dharwad", city: "Dharwad", state: "Karnataka",
    type: "IIT", ownership: "Government", established: 2016, website: "https://www.iitdh.ac.in",
    overview: "New IIT mentored by IIT Bombay with promising growth.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4000, maxRank: 9500,
    fees: 200000, placementRate: 77, averagePackage: 10.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  }
];
