import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const colleges = [
  ['IIT Delhi','iit-delhi','Delhi',220000,'B.Tech CSE',4.9,92,22.5,'JEE',1,500,'Premier engineering institute known for research, placements, entrepreneurship and strong alumni network.'],
  ['IIT Bombay','iit-bombay','Mumbai',230000,'B.Tech CSE',4.9,94,24.1,'JEE',1,450,'Top-ranked institute with excellent placements, startup culture and technical clubs.'],
  ['NIT Trichy','nit-trichy','Tiruchirappalli',165000,'B.Tech ECE',4.7,88,16.2,'JEE',500,5000,'Highly reputed NIT with strong academics, campus life and placement outcomes.'],
  ['BITS Pilani','bits-pilani','Pilani',520000,'B.Tech CSE',4.8,90,20.4,'BITSAT',1,2500,'Private institute popular for flexible curriculum, innovation and strong placements.'],
  ['VIT Vellore','vit-vellore','Vellore',198000,'B.Tech IT',4.3,78,8.5,'VITEEE',1,15000,'Large private university offering wide course options, active campus life and decent placements.'],
  ['SRM Institute','srm-institute','Chennai',250000,'B.Tech CSE',4.1,70,7.2,'SRMJEEE',1,20000,'Private university with broad engineering programs and industry-oriented training.'],
  ['Manipal Institute of Technology','mit-manipal','Manipal',390000,'B.Tech Data Science',4.4,76,9.8,'MET',1,12000,'Known for student life, labs, industry connections and diverse courses.'],
  ['Delhi Technological University','dtu-delhi','Delhi',190000,'B.Tech Mechanical',4.6,84,14.6,'JEE',1000,12000,'Strong government university with good placements and NCR industry exposure.'],
  ['Anna University','anna-university','Chennai',55000,'B.Tech ECE',4.2,68,6.5,'TNEA',1,8000,'Affordable public university with strong regional reputation and wide alumni network.'],
  ['PES University','pes-university','Bengaluru',360000,'B.Tech CSE',4.2,74,8.8,'PESSAT',1,6000,'Bengaluru-based university with focus on tech skills and product-oriented learning.'],
  ['Amity University','amity-university','Noida',320000,'B.Tech IT',4.0,62,5.5,'JEE',5000,50000,'Private university with large campus, multidisciplinary programs and industry exposure.'],
  ['COEP Technological University','coep-pune','Pune',120000,'B.Tech Civil',4.5,80,10.2,'MHTCET',1,3000,'Historic public engineering college with strong technical culture and alumni network.'],
  ['NIT Andhra Pradesh', 'nit-andhra', 'Andhra Pradesh', 140000, 'B.Tech CSE', 4.1, 75, 8.5, 'JEE', 10000, 30000, 'Growing NIT with good academics.'],
  ['NIT Arunachal Pradesh', 'nit-arunachal', 'Arunachal Pradesh', 135000, 'B.Tech ECE', 3.9, 70, 7.5, 'JEE', 20000, 45000, 'NIT located in the serene northeast.'],
  ['IIT Guwahati', 'iit-guwahati', 'Assam', 210000, 'B.Tech CSE', 4.8, 90, 21.5, 'JEE', 500, 2000, 'One of the top IITs with a beautiful campus.'],
  ['IIT Patna', 'iit-patna', 'Bihar', 205000, 'B.Tech CSE', 4.5, 85, 16.0, 'JEE', 2000, 5000, 'Fast growing new generation IIT.'],
  ['NIT Raipur', 'nit-raipur', 'Chhattisgarh', 145000, 'B.Tech IT', 4.2, 78, 9.5, 'JEE', 15000, 35000, 'Established institute with strong regional presence.'],
  ['NIT Goa', 'nit-goa', 'Goa', 150000, 'B.Tech CSE', 4.3, 82, 11.0, 'JEE', 8000, 20000, 'Rapidly improving NIT in a prime location.'],
  ['IIT Gandhinagar', 'iit-gandhinagar', 'Gujarat', 225000, 'B.Tech Mechanical', 4.6, 84, 15.5, 'JEE', 3000, 7000, 'Innovative curriculum and excellent facilities.'],
  ['NIT Kurukshetra', 'nit-kurukshetra', 'Haryana', 155000, 'B.Tech CSE', 4.5, 85, 12.5, 'JEE', 5000, 15000, 'One of the oldest and most reputed NITs.'],
  ['IIT Mandi', 'iit-mandi', 'Himachal Pradesh', 215000, 'B.Tech CSE', 4.4, 82, 14.5, 'JEE', 4000, 8000, 'IIT set in the Himalayas with a unique curriculum.'],
  ['IIT Dhanbad', 'iit-dhanbad', 'Jharkhand', 200000, 'B.Tech Mining', 4.5, 88, 15.0, 'JEE', 3000, 10000, 'Formerly ISM, premier institute for earth sciences and engineering.'],
  ['NITK Surathkal', 'nitk-surathkal', 'Karnataka', 160000, 'B.Tech CSE', 4.8, 92, 19.5, 'JEE', 1000, 4000, 'Top NIT with a private beach and stellar placements.'],
  ['NIT Calicut', 'nit-calicut', 'Kerala', 150000, 'B.Tech ECE', 4.6, 86, 13.5, 'JEE', 3000, 10000, 'Reputed NIT with strong architecture and engineering programs.'],
  ['IIT Indore', 'iit-indore', 'Madhya Pradesh', 220000, 'B.Tech CSE', 4.6, 85, 18.0, 'JEE', 1500, 4500, 'Top-ranking newer IIT with excellent research output.'],
  ['VNIT Nagpur', 'vnit-nagpur', 'Maharashtra', 155000, 'B.Tech CSE', 4.5, 84, 11.5, 'JEE', 4000, 12000, 'Highly sought-after NIT in central India.'],
  ['NIT Manipur', 'nit-manipur', 'Manipur', 135000, 'B.Tech CSE', 3.8, 68, 7.0, 'JEE', 25000, 50000, 'Developing NIT in the northeast.'],
  ['NIT Meghalaya', 'nit-meghalaya', 'Meghalaya', 140000, 'B.Tech ECE', 4.0, 72, 8.0, 'JEE', 20000, 45000, 'Known for its scenic location and growing academics.'],
  ['NIT Mizoram', 'nit-mizoram', 'Mizoram', 135000, 'B.Tech Civil', 3.7, 65, 6.5, 'JEE', 30000, 55000, 'Emerging institute in the northeastern region.'],
  ['NIT Nagaland', 'nit-nagaland', 'Nagaland', 135000, 'B.Tech EIE', 3.8, 66, 6.8, 'JEE', 28000, 52000, 'Provides quality technical education in Nagaland.'],
  ['IIT Bhubaneswar', 'iit-bhubaneswar', 'Odisha', 215000, 'B.Tech CSE', 4.4, 83, 15.5, 'JEE', 3000, 8000, 'Well-established newer IIT with a massive campus.'],
  ['NIT Jalandhar', 'nit-jalandhar', 'Punjab', 150000, 'B.Tech CSE', 4.4, 82, 10.5, 'JEE', 8000, 20000, 'Good infrastructure and placement records.'],
  ['MNIT Jaipur', 'mnit-jaipur', 'Rajasthan', 155000, 'B.Tech CSE', 4.6, 86, 12.0, 'JEE', 4000, 12000, 'Top-tier NIT located in the pink city.'],
  ['NIT Sikkim', 'nit-sikkim', 'Sikkim', 140000, 'B.Tech CSE', 3.9, 70, 7.5, 'JEE', 22000, 48000, 'Beautiful campus setting with a growing academic profile.'],
  ['IIT Madras', 'iit-madras', 'Tamil Nadu', 225000, 'B.Tech CSE', 4.9, 95, 25.0, 'JEE', 1, 300, 'The #1 ranked engineering institute in India.'],
  ['IIT Hyderabad', 'iit-hyderabad', 'Telangana', 230000, 'B.Tech CSE', 4.8, 90, 22.0, 'JEE', 500, 1500, 'Highly innovative and rapidly growing IIT.'],
  ['NIT Agartala', 'nit-agartala', 'Tripura', 145000, 'B.Tech CSE', 4.1, 75, 8.5, 'JEE', 15000, 35000, 'Large campus with improved connectivity and placements.'],
  ['IIT Kanpur', 'iit-kanpur', 'Uttar Pradesh', 220000, 'B.Tech CSE', 4.9, 94, 24.5, 'JEE', 100, 1000, 'Pioneer in computer science education in India.'],
  ['IIT Roorkee', 'iit-roorkee', 'Uttarakhand', 215000, 'B.Tech CSE', 4.8, 92, 23.0, 'JEE', 200, 1500, 'Oldest engineering college with a glorious legacy.'],
  ['IIT Kharagpur', 'iit-kharagpur', 'West Bengal', 210000, 'B.Tech CSE', 4.8, 91, 22.5, 'JEE', 200, 1800, 'Largest and oldest IIT campus with diverse courses.'],
  ['IIT Ropar', 'iit-ropar', 'Punjab', 210000, 'B.Tech CSE', 4.5, 85, 16.0, 'JEE', 2000, 5000, 'Established IIT with strong research focus and good placements.'],
  ['IIT Jodhpur', 'iit-jodhpur', 'Rajasthan', 215000, 'B.Tech CSE', 4.4, 83, 14.5, 'JEE', 2500, 6000, 'Known for multidisciplinary programs and AI advancements.'],
  ['IIT (BHU) Varanasi', 'iit-bhu', 'Uttar Pradesh', 205000, 'B.Tech CSE', 4.7, 88, 19.5, 'JEE', 800, 3000, 'Historic institute located within the Banaras Hindu University campus.'],
  ['IIT Palakkad', 'iit-palakkad', 'Kerala', 200000, 'B.Tech CSE', 4.3, 80, 12.0, 'JEE', 3500, 8000, 'Rapidly growing new IIT with modern infrastructure.'],
  ['IIT Tirupati', 'iit-tirupati', 'Andhra Pradesh', 210000, 'B.Tech CSE', 4.3, 81, 12.5, 'JEE', 3000, 7500, 'Fastest growing among the newer IITs.'],
  ['IIT Bhilai', 'iit-bhilai', 'Chhattisgarh', 200000, 'B.Tech CSE', 4.2, 78, 11.5, 'JEE', 4000, 9000, 'Emerging IIT with strong focus on core engineering.'],
  ['IIT Goa', 'iit-goa-new', 'Goa', 205000, 'B.Tech CSE', 4.2, 79, 11.0, 'JEE', 3500, 8500, 'New IIT situated in a vibrant location with growing industry ties.'],
  ['IIT Jammu', 'iit-jammu', 'Jammu and Kashmir', 200000, 'B.Tech CSE', 4.1, 75, 10.0, 'JEE', 4500, 10000, 'Scenic campus with rapidly developing academic programs.'],
  ['IIT Dharwad', 'iit-dharwad', 'Karnataka', 200000, 'B.Tech CSE', 4.2, 77, 10.5, 'JEE', 4000, 9500, 'New IIT mentored by IIT Bombay with promising growth.']
];

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Demo Student',
      email: 'demo@student.com',
      password: await bcrypt.hash('password123', 10)
    }
  });

  for (const [name, slug, location, fees, course, rating, placementRate, averagePackage, exam, minRank, maxRank, overview] of colleges) {
    await prisma.college.create({
      data: {
        name: String(name), slug: String(slug), location: String(location), fees: Number(fees), course: String(course),
        rating: Number(rating), placementRate: Number(placementRate), averagePackage: Number(averagePackage),
        exam: String(exam), minRank: Number(minRank), maxRank: Number(maxRank), overview: String(overview),
        courses: { create: [
          { name: String(course), duration: '4 years', fees: Number(fees) },
          { name: 'B.Tech AI & ML', duration: '4 years', fees: Math.round(Number(fees) * 1.08) },
          { name: 'M.Tech', duration: '2 years', fees: Math.round(Number(fees) * 0.75) }
        ]},
        reviews: { create: [
          { student: 'Aarav', rating: Math.min(Number(rating), 5), comment: 'Good faculty, active clubs, and helpful placement support.' },
          { student: 'Meera', rating: Math.max(Number(rating) - 0.3, 3), comment: 'Campus experience is strong, but workload can be high during exams.' }
        ]}
      }
    });
  }

  console.log('Seed completed');
}

main().finally(() => prisma.$disconnect());
