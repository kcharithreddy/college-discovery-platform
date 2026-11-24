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
    type: "Private University", ownership: "Private", established: 2005, website: "https://www.amity.edu",
    overview: "Private university with large campus, multidisciplinary programs and industry exposure.",
    course: "B.Tech IT", exam: "JEE", minRank: 5000, maxRank: 50000,
    fees: 320000, placementRate: 62, averagePackage: 5.5,
    courses: [{ name: "B.Tech IT", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "COEP Technological University", slug: "coep-pune", city: "Pune", state: "Maharashtra",
    type: "State University", ownership: "Government", established: 1854, website: "https://www.coeptech.ac.in",
    overview: "Historic public engineering college with strong technical culture and alumni network.",
    course: "B.Tech Civil", exam: "MHTCET", minRank: 1, maxRank: 3000,
    fees: 120000, placementRate: 80, averagePackage: 10.2,
    courses: [{ name: "B.Tech Civil", duration: '4 years' }],
    sourceNote: UNVERIFIED
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
    overview: "NIT located in the serene northeast.",
    course: "B.Tech ECE", exam: "JEE", minRank: 20000, maxRank: 45000,
    fees: 135000, placementRate: 70, averagePackage: 7.5,
    courses: [{ name: "B.Tech ECE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Guwahati", slug: "iit-guwahati", city: "Guwahati", state: "Assam",
    type: "IIT", ownership: "Government", established: 1994, website: "https://www.iitg.ac.in",
    overview: "One of the top IITs with a beautiful campus.",
    course: "B.Tech CSE", exam: "JEE", minRank: 500, maxRank: 2000,
    fees: 210000, placementRate: 90, averagePackage: 21.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Patna", slug: "iit-patna", city: "Patna", state: "Bihar",
    type: "IIT", ownership: "Government", established: 2008, website: "https://www.iitp.ac.in",
    overview: "Fast growing new generation IIT.",
    course: "B.Tech CSE", exam: "JEE", minRank: 2000, maxRank: 5000,
    fees: 205000, placementRate: 85, averagePackage: 16.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
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
    type: "NIT", ownership: "Government", established: 1963, website: "https://nitkkr.ac.in",
    overview: "One of the oldest and most reputed NITs.",
    course: "B.Tech CSE", exam: "JEE", minRank: 5000, maxRank: 15000,
    fees: 155000, placementRate: 85, averagePackage: 12.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Mandi", slug: "iit-mandi", city: "Mandi", state: "Himachal Pradesh",
    type: "IIT", ownership: "Government", established: 2009, website: "https://www.iitmandi.ac.in",
    overview: "IIT set in the Himalayas with a unique curriculum.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4000, maxRank: 8000,
    fees: 215000, placementRate: 82, averagePackage: 14.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT (ISM) Dhanbad", slug: "iit-dhanbad", city: "Dhanbad", state: "Jharkhand",
    type: "IIT", ownership: "Government", established: 1926, website: "https://www.iitism.ac.in",
    overview: "Formerly ISM, premier institute for earth sciences and engineering.",
    course: "B.Tech Mining", exam: "JEE", minRank: 3000, maxRank: 10000,
    fees: 200000, placementRate: 88, averagePackage: 15.0,
    courses: [{ name: "B.Tech Mining", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NITK Surathkal", slug: "nitk-surathkal", city: "Mangaluru", state: "Karnataka",
    type: "NIT", ownership: "Government", established: 1960, website: "https://www.nitk.ac.in",
    overview: "Top NIT with a private beach and stellar placements.",
    course: "B.Tech CSE", exam: "JEE", minRank: 1000, maxRank: 4000,
    fees: 160000, placementRate: 92, averagePackage: 19.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Calicut", slug: "nit-calicut", city: "Kozhikode", state: "Kerala",
    type: "NIT", ownership: "Government", established: 1961, website: "https://nitc.ac.in",
    overview: "Reputed NIT with strong architecture and engineering programs.",
    course: "B.Tech ECE", exam: "JEE", minRank: 3000, maxRank: 10000,
    fees: 150000, placementRate: 86, averagePackage: 13.5,
    courses: [{ name: "B.Tech ECE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Indore", slug: "iit-indore", city: "Indore", state: "Madhya Pradesh",
    type: "IIT", ownership: "Government", established: 2009, website: "https://www.iiti.ac.in",
    overview: "Top-ranking newer IIT with excellent research output.",
    course: "B.Tech CSE", exam: "JEE", minRank: 1500, maxRank: 4500,
    fees: 220000, placementRate: 85, averagePackage: 18.0,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "VNIT Nagpur", slug: "vnit-nagpur", city: "Nagpur", state: "Maharashtra",
    type: "NIT", ownership: "Government", established: 1960, website: "https://vnit.ac.in",
    overview: "Highly sought-after NIT in central India.",
    course: "B.Tech CSE", exam: "JEE", minRank: 4000, maxRank: 12000,
    fees: 155000, placementRate: 84, averagePackage: 11.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
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
    name: "NIT Meghalaya", slug: "nit-meghalaya", city: "Shillong", state: "Meghalaya",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitm.ac.in",
    overview: "Known for its scenic location and growing academics.",
    course: "B.Tech ECE", exam: "JEE", minRank: 20000, maxRank: 45000,
    fees: 140000, placementRate: 72, averagePackage: 8.0,
    courses: [{ name: "B.Tech ECE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Mizoram", slug: "nit-mizoram", city: "Aizawl", state: "Mizoram",
    type: "NIT", ownership: "Government", established: 2010, website: "https://www.nitmz.ac.in",
    overview: "Emerging institute in the northeastern region.",
    course: "B.Tech Civil", exam: "JEE", minRank: 30000, maxRank: 55000,
    fees: 135000, placementRate: 65, averagePackage: 6.5,
    courses: [{ name: "B.Tech Civil", duration: '4 years' }],
    sourceNote: UNVERIFIED
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
