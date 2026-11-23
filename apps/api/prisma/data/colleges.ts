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
    type: "IIT", ownership: "Government", established: 1961, website: "https://home.iitd.ac.in",
    overview: "Premier engineering institute known for research, placements, entrepreneurship and strong alumni network.",
    course: "B.Tech CSE", exam: "JEE", minRank: 1, maxRank: 500,
    fees: 220000, placementRate: 92, averagePackage: 22.5,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "IIT Bombay", slug: "iit-bombay", city: "Mumbai", state: "Maharashtra",
    type: "IIT", ownership: "Government", established: 1958, website: "https://www.iitb.ac.in",
    overview: "Top-ranked institute with excellent placements, startup culture and technical clubs.",
    course: "B.Tech CSE", exam: "JEE", minRank: 1, maxRank: 450,
    fees: 230000, placementRate: 94, averagePackage: 24.1,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "NIT Tiruchirappalli", slug: "nit-trichy", city: "Tiruchirappalli", state: "Tamil Nadu",
    type: "NIT", ownership: "Government", established: 1964, website: "https://www.nitt.edu",
    overview: "Highly reputed NIT with strong academics, campus life and placement outcomes.",
    course: "B.Tech ECE", exam: "JEE", minRank: 500, maxRank: 5000,
    fees: 165000, placementRate: 88, averagePackage: 16.2,
    courses: [{ name: "B.Tech ECE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "BITS Pilani", slug: "bits-pilani", city: "Pilani", state: "Rajasthan",
    type: "Deemed University", ownership: "Private", established: 1964, website: "https://www.bits-pilani.ac.in",
    overview: "Private institute popular for flexible curriculum, innovation and strong placements.",
    course: "B.Tech CSE", exam: "BITSAT", minRank: 1, maxRank: 2500,
    fees: 520000, placementRate: 90, averagePackage: 20.4,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "VIT Vellore", slug: "vit-vellore", city: "Vellore", state: "Tamil Nadu",
    type: "Deemed University", ownership: "Private", established: 1984, website: "https://vit.ac.in",
    overview: "Large private university offering wide course options, active campus life and decent placements.",
    course: "B.Tech IT", exam: "VITEEE", minRank: 1, maxRank: 15000,
    fees: 198000, placementRate: 78, averagePackage: 8.5,
    courses: [{ name: "B.Tech IT", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "SRM Institute of Science and Technology", slug: "srm-institute", city: "Chennai", state: "Tamil Nadu",
    type: "Deemed University", ownership: "Private", established: 1985, website: "https://www.srmist.edu.in",
    overview: "Private university with broad engineering programs and industry-oriented training.",
    course: "B.Tech CSE", exam: "SRMJEEE", minRank: 1, maxRank: 20000,
    fees: 250000, placementRate: 70, averagePackage: 7.2,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "Manipal Institute of Technology", slug: "mit-manipal", city: "Manipal", state: "Karnataka",
    type: "Deemed University", ownership: "Private", established: 1957, website: "https://manipal.edu",
    overview: "Known for student life, labs, industry connections and diverse courses.",
    course: "B.Tech Data Science", exam: "MET", minRank: 1, maxRank: 12000,
    fees: 390000, placementRate: 76, averagePackage: 9.8,
    courses: [{ name: "B.Tech Data Science", duration: '4 years' }],
    sourceNote: UNVERIFIED
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
    type: "State University", ownership: "Government", established: 1978, website: "https://www.annauniv.edu",
    overview: "Affordable public university with strong regional reputation and wide alumni network.",
    course: "B.Tech ECE", exam: "TNEA", minRank: 1, maxRank: 8000,
    fees: 55000, placementRate: 68, averagePackage: 6.5,
    courses: [{ name: "B.Tech ECE", duration: '4 years' }],
    sourceNote: UNVERIFIED
  },
  {
    name: "PES University", slug: "pes-university", city: "Bengaluru", state: "Karnataka",
    type: "Private University", ownership: "Private", established: 1972, website: "https://pes.edu",
    overview: "Bengaluru-based university with focus on tech skills and product-oriented learning.",
    course: "B.Tech CSE", exam: "PESSAT", minRank: 1, maxRank: 6000,
    fees: 360000, placementRate: 74, averagePackage: 8.8,
    courses: [{ name: "B.Tech CSE", duration: '4 years' }],
    sourceNote: UNVERIFIED
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
    campusAcres: 630,
    overview: "Set up in 1959 with technical assistance from the West German government and declared an Institute of National Importance in 1961, IIT Madras is a fully residential institute in South Chennai. It has 16 academic departments, nearly 100 laboratories and about 550 faculty, and has been named an Institute of Eminence. Undergraduate entry is through JEE (Main) and JEE (Advanced).",
    course: "B.Tech Computer Science and Engineering", exam: "JEE",
    placementRate: 81, medianPackage: 17.78,
    hostelAvailable: true,
    facilities: [
      "20 hostels named after Indian rivers (15 for men, 5 for women), with internet/LAN in every room",
      "Central Library: five-storey, air-conditioned and Wi-Fi enabled, with 2 million+ books and 1,000+ journal subscriptions",
      "Institute hospital with visiting specialists (including a psychiatrist), lab tests, X-ray, in-patient wards and an ambulance; pharmacy run by Apollo",
      "Olympic-standard swimming pool, athletics stadium, gymnasium, floodlit hockey and football fields, squash and tennis courts",
      "Nearly 100 laboratories across 16 academic departments",
      "Campus buses and battery vehicles; students cycle or walk (powered vehicles are not allowed for students)",
      "SBI and Canara Bank branches with ATMs, a post office and two shopping centres on campus",
      "Lifts/ramps and accessible toilets in more than 80% of buildings"
    ],
    campusLife: [
      "Sangam cultural clubs: Quiz, Music, Thespian, Choreo, Fine Arts, Comedy, Film Appreciation, E-Sports and more",
      "Regional clubs such as Telugu Samskrita Samiti, Kannada Sangha, Kerala Kala Samiti and SADINER help freshers settle in",
      "Lit Soc: a year-long inter-hostel cultural competition",
      "12 sports clubs, inter-hostel sports (Schroeter, Dean's Trophy) and the Inter IIT Sports Meet",
      "Hostel nights and festival celebrations including Holi, Pongal, Onam and Diwali",
      "Department fests such as Exebit (CSE), Mechanica (Mechanical) and Amalgam (Metallurgy)",
      "Weekend movies at the Open Air Theatre; the campus is also a reserve forest"
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
    sourceNote: "From the official IIT Madras website (About, Campus Life, Hostels, Scholarships, UG Admission 2026) and its NIRF 2026 Engineering data submission. Placement % = students placed ÷ students graduating. Fees and NIRF rank were not published on these pages."
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
