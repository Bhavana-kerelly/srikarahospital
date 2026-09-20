const fs = require('fs');

const userBranches = [
  {
    branch: 'RTC X Roads',
    doctors: [
      { name: 'Dr. Akhil Dadi', specialty: 'Orthopedics', image: 'public/doctors/akhil-dadi.png' },
      { name: 'Dr. RAMAKANTH', specialty: 'Physiotherapy', image: 'public/doctors/ramakanth.png' },
      { name: 'Dr. SUSHMITHA AKULA', specialty: 'Neuro Physician', image: 'public/doctors/sushmitha-akula.png' },
      { name: 'Dr. Pankaj Kumar', specialty: 'General & Laparoscopic Surgery', image: 'public/doctors/pankaj-kumar.png' },
      { name: 'Dr. Naveen', specialty: 'Anesthesia', image: 'public/doctors/naveen.png' },
      { name: 'Dr. PLN PATEL', specialty: 'Cardiology', image: 'public/doctors/p-l-n-patel.png' },
      { name: 'Dr. VILASINI PATEL', specialty: 'Anesthesia', image: 'public/doctors/vilasini-patel.png' },
      { name: 'Dr. Vaishnavi. P', specialty: 'Nephrology', image: 'public/doctors/vaishnavi-pochineni.png' },
      { name: 'Dr. Abhinav Damera', specialty: 'Orthopedics', image: 'public/doctors/abhinav-damera.png' },
      { name: 'Dr. Sharol Ashma Menezes', specialty: 'Cardiology', image: 'public/doctors/sharol.png' },
      { name: 'Dr. Anvesh Goud CH', specialty: 'Orthopedics', image: 'public/doctors/anvesh.png' },
      { name: 'Dr. Vineel Kolloju', specialty: 'Plastic Surgery', image: 'public/doctors/vineel-kolloju.png' },
      { name: 'Dr. THANUJA PEDDIREDDLA', specialty: 'Pulmonology', image: 'public/doctors/thanuja.png' },
      { name: 'Dr. Sravan Reddy P', specialty: 'Urology', image: 'public/doctors/sravan-reddy-p.png' },
      { name: 'Dr. Bhargav Reddy', specialty: 'Radiology', image: 'public/doctors/bhargav-reddy.png' },
      { name: 'Dr. Gopinath', specialty: 'General Medicine', image: 'public/doctors/gpoinath.png' },
      { name: 'Dr. Sundeep', specialty: 'Neuro Surgeon', image: 'public/doctors/sundeep.png' },
    ]
  },
  {
    branch: 'Lakdikapul',
    doctors: [
      { name: 'Dr. Jagadeesh Mavilla', specialty: 'Orthopedics', image: 'public/doctors/jagadeesh-mavilla.png' },
      { name: 'Dr. RAMESHWARI VISHWAKARMA', specialty: 'Cardiology', image: 'public/doctors/rameshwari-vishwakarma.png' },
      { name: 'Dr. NIKHIL VELUDANDI', specialty: 'Neurosurgery', image: 'public/doctors/nikhil-veludandi.png' },
      { name: 'Dr. (Maj) Garapati Raja Bhagat Chandra Chowdary', specialty: 'Oncology', image: 'public/doctors/maj-garapati-raja-bhagat-chandra-chowdary.png' },
      { name: 'Dr. GARATH GANESH', specialty: 'General Medicine', image: 'public/doctors/ganesh.png' },
      { name: 'Dr. P Sravan Reddy', specialty: 'Urology', image: 'public/doctors/p-sravan-reddy.png' },
      { name: 'Dr. JUNAID', specialty: 'Physiotherapy', image: 'public/doctors/junaid.png' },
      { name: 'Dr. SRI SABYA KARANAM', specialty: 'Anesthesia', image: 'public/doctors/sri-sabya-karanam.png' },
      { name: 'Dr. DALE REGO', specialty: 'Anesthesia', image: 'public/doctors/dale-rego.png' },
      { name: 'Dr. JASTI SHIVANI', specialty: 'Neurology', image: 'public/doctors/jasti-shivani.png' },
      { name: 'Dr. K. Venkata Vijay', specialty: 'Cardiology', image: 'public/doctors/k-venkata-vijay.png' },
      { name: 'Dr. Sridhar Reddy Baddam', specialty: 'Radiology', image: 'public/doctors/sridhar-reddy-baddam.png' },
      { name: 'Dr. Tejaswini Penugondla', specialty: 'Gynecology', image: 'public/doctors/tejaswini-penugondla.png' },
    ]
  },
  {
    branch: 'L.B. Nagar',
    doctors: [
      { name: 'Dr. Bharath Reddy Katta', specialty: 'Orthopedics', image: 'public/doctors/bharath-reddy-katta.png' },
      { name: 'Dr. Kota Ravi Chandra', specialty: 'Neuro Surgery', image: 'public/doctors/kota-ravi-chandra.png' },
      { name: 'Dr. Karunakar', specialty: 'General Medicine', image: 'public/doctors/karunakar.png' },
      { name: 'Dr. Sameer Hanu Maharshi', specialty: 'Orthopedics', image: 'public/doctors/sameer-hanu-maharshi.png' },
      { name: 'Dr. Hemanth Kumar', specialty: 'General Surgery', image: 'public/doctors/hemanth-kumar.png' },
      { name: 'Dr. Raja Sekhar Satharala', specialty: 'Cardiology', image: 'public/doctors/rajashekar.png' },
      { name: 'Dr. CH. Manohar', specialty: 'Cardiology', image: 'public/doctors/ch-manohar.png' },
      { name: 'Dr. Sharath Chandra', specialty: 'Anesthesia', image: 'public/doctors/sharath-chander-reddy.png' },
      { name: 'Dr. SABBU LIKHITHA', specialty: 'Gynecology', image: 'public/doctors/sabbu-likhitha.png' },
    ]
  },
  {
    branch: 'ECIL',
    doctors: [
      { name: 'Dr. MURALI MOHAN RAO', specialty: 'General Medicine', image: 'public/doctors/murali-mohan-rao.png' },
      { name: 'Dr. VENKATESH KUMAR', specialty: 'Cardiology', image: 'public/doctors/venkatesh-kumar.png' },
      { name: 'Dr. KAMALESH LOKHANDE', specialty: 'Anesthesia', image: 'public/doctors/kamalesh-lokhande.png' },
      { name: 'Dr. Anand.D', specialty: 'Anesthesia', image: 'public/doctors/anand-d.png' },
      { name: 'Dr. K. NARESH BABU', specialty: 'Neurology Surgery', image: 'public/doctors/k-naresh-babu.png' },
      { name: 'Dr. Siva Kumar L', specialty: 'Orthopedics', image: 'public/doctors/siva-kumar-kotra.png' },
      { name: 'Dr. Pranay Kumar', specialty: 'Orthopedics', image: 'public/doctors/n-pranay-kumar-n.png' },
      { name: 'Dr. SANDEEP', specialty: 'Neurology Physician', image: 'public/doctors/sandeep-raja.png' },
      { name: 'Dr. P. RAGHUNATH', specialty: 'Physiotherapy', image: 'public/doctors/p-raghunath.png' },
      { name: 'Dr. Sai Kiran', specialty: 'Orthopedics', image: 'public/doctors/sai-kiran.png' },
      { name: 'Dr. VINAYAK INGALALLI', specialty: 'Urology', image: 'public/doctors/vinayak-ingalalli.png' },
      { name: 'Dr. Siva Gautham', specialty: 'General Medicine', image: 'public/doctors/siva-gautham.png' },
    ]
  },
  {
    branch: 'Peerzadiguda',
    doctors: [
      { name: 'Dr. Raghu Prasad', specialty: 'General Physician', image: 'public/doctors/raghu-prasad.png' },
      { name: 'Dr. Banda Karunakar Reddy', specialty: 'Orthopedics', image: 'public/doctors/karunakar-reddy.png' },
      { name: 'Dr. M.Bala Krishna', specialty: 'Orthopedics', image: 'public/doctors/martha-balakrishna.png' },
      { name: 'Dr. Nagendra Babu Dade', specialty: 'Neurology', image: 'public/doctors/d-nagendra-babu.png' },
      { name: 'Dr. Sachin Bhatkar', specialty: 'Cardiology', image: 'public/doctors/sachin-bhatkar.png' },
      { name: 'Dr. Naveen Kumar A.', specialty: 'General Surgery', image: 'public/doctors/naveen-kumar.png' },
      { name: 'Dr. Vinayak Ingalalli', specialty: 'Urology', image: 'public/doctors/vinayak-ingalalli.png' },
      { name: 'Dr. Pathipaka Rahul', specialty: 'Anesthesia', image: 'public/doctors/rahul.png' },
      { name: 'Dr. Bitla Sriharsha', specialty: 'Anesthesia', image: 'public/doctors/harsha.png' },
      { name: 'Dr. Cheripelli Kishan', specialty: 'Anesthesia', image: 'public/doctors/ch-kishan.png' },
    ]
  },
  {
    branch: 'Rajahmundry',
    doctors: [
      { name: 'Dr. P. Naveen Kishore', specialty: 'Anesthesia', image: 'public/doctors/naveen-rajahmundry.png' },
      { name: 'Dr. Rohith', specialty: 'Orthopedics', image: 'public/doctors/rohith.png' },
      { name: 'Dr. Prudhvi Krishna', specialty: 'General Medicine', image: 'public/doctors/prudvi.png' },
      { name: 'Dr. Chandrakanth Varma', specialty: 'Neuro Surgery', image: 'public/doctors/chandrakanth-varma.png' },
      { name: 'Dr. Anush Kaki', specialty: 'General Surgery', image: 'public/doctors/anusha-kaki.png' },
      { name: 'Dr. Lakshman Rao N', specialty: 'Anesthesia', image: 'public/doctors/lakshman.png' },
      { name: 'Dr. Akhil Varma', specialty: 'Orthopedics', image: 'public/doctors/akhil-varma.png' },
    ]
  },
  {
    branch: 'Kompally',
    doctors: [
      { name: 'Dr. TV Suresh', specialty: 'Orthopedics', image: 'public/doctors/t-v-suresh.png' },
      { name: 'Dr. Kushal S', specialty: 'Cardiology', image: 'public/doctors/khushal-sharnagat.png' },
      { name: 'Dr. Sandeep Raja', specialty: 'Neuro Surgery', image: 'public/doctors/sandeep-raja.png' },
      { name: 'Dr. Sharath Chandra', specialty: 'General Medicine', image: 'public/doctors/sharath-chander-reddy.png' },
      { name: 'Dr. Sridhar Reddy', specialty: 'Urology', image: 'public/doctors/shridhar-reddy.png' },
      { name: 'Dr. Kiran Kumar', specialty: 'Orthopedics', image: 'public/doctors/k-kiran-kumar.png' },
      { name: 'Dr. Vaddi Sarath Chandra', specialty: 'General Surgery', image: 'public/doctors/vaddi-sarath-chandra.png' },
      { name: 'Dr. Neelima', specialty: 'Plastic Surgery', image: 'public/doctors/neelima-m.png' },
      { name: 'Dr. Ramesh.T', specialty: 'Physiotherapy', image: 'public/doctors/ramesh-tekula.png' },
      { name: 'Dr. Sandeep', specialty: 'Radiology', image: 'public/doctors/sandeep.png' },
      { name: 'Dr. Mahanteesh Patil', specialty: 'Orthopedics', image: 'public/doctors/mahantesh-patil.png' },
    ]
  },
  {
    branch: 'Madeenaguda',
    doctors: [
      { name: 'Dr. Akhil Dadi', specialty: 'Orthopedics', image: 'public/doctors/akhil-dadi.png' },
      { name: 'Dr. Jyotheswara Reddy', specialty: 'Orthopedics', image: 'public/doctors/jyotheswara-reddy.png' },
      { name: 'Dr. Harsha Vardhan Singh', specialty: 'General Medicine', image: 'public/doctors/harsha-vardhan-singh.png' },
      { name: 'Dr. Ch.Brahmananda Reddy', specialty: 'General & Laparoscopic Surgery', image: 'public/doctors/ch-brahmananda-reddy.png' },
      { name: 'Dr. Y. Murali', specialty: 'Pulmonology', image: 'public/doctors/y-murali.png' },
      { name: 'Dr. Naga Murali', specialty: 'Cardiology', image: 'public/doctors/naga-murali.png' },
      { name: 'Dr. V. Meena Kumari', specialty: 'Plastic Surgery', image: 'public/doctors/v-meena-kumari.png' },
      { name: 'Dr. Ravindar (PSN)', specialty: 'Cardiology', image: 'public/doctors/ravindar-psn.png' },
      { name: 'Dr. Venkata Sai Rajkumar', specialty: 'Radiology', image: 'public/doctors/venkata-sai-rajkumar.png' },
      { name: 'Dr. Steve Richards', specialty: 'Urology', image: 'public/doctors/steve-richards.png' },
      { name: 'Dr. Ramesh Babu', specialty: 'CT Surgery', image: 'public/doctors/ramesh-babu.png' },
      { name: 'Dr. Venkata Harin Reddy', specialty: 'Neurology', image: 'public/doctors/venkata-harin-reddy.png' },
      { name: 'Dr. Somesh Manjunath RV', specialty: 'Orthopedics', image: 'public/doctors/somesh-manjunath-rv.png' },
      { name: 'Dr. Krishna Chaitanya', specialty: 'Orthopedics', image: 'public/doctors/krishna-chaitanya.png' },
      { name: 'Dr. Sowmya Pedagoni', specialty: 'Gynecology', image: 'public/doctors/sowmya-pedagoni.png' },
      { name: 'Dr. V. Nagaraju', specialty: 'Neurosurgery', image: 'public/doctors/v-nagaraju.png' },
      { name: 'Dr. Kalyan', specialty: 'General Medicine', image: 'public/doctors/kalyan.png' },
      { name: 'Dr. Teja', specialty: 'Nephrology', image: 'public/doctors/teja.png' },
      { name: 'Dr. Madhu Thumu', specialty: 'Orthopedics', image: 'public/doctors/madhu-thumu.png' },
      { name: 'Dr. Arun Reddy Vontela', specialty: 'Orthopedics', image: 'public/doctors/arun-reddy-vontela.png' },
      { name: 'Dr. Santhosh Kumar', specialty: 'General & Laparoscopic Surgery', image: 'public/doctors/santhosh-kumar.png' },
      { name: 'Dr. P. Padma', specialty: 'ENT', image: 'public/doctors/p-padma.png' },
      { name: 'Dr. A. Jagadeeshwar Reddy', specialty: 'Pediatrics', image: 'public/doctors/a-jagadeeshwar-reddy.png' },
      { name: 'Dr. Kiran', specialty: 'Physiotherapy', image: 'public/doctors/kiran.png' },
      { name: 'Dr. Ramya Mamidipalli', specialty: 'Gastroenterology', image: 'public/doctors/ramya-mamidipalli.png' },
    ]
  },
  {
    branch: 'Vijayawada',
    doctors: [
      { name: 'Dr. K.HARISH', specialty: 'Orthopedics', image: 'public/doctors/harish.png' },
      { name: 'Dr. MANOJ KUMAR JAGARLAMUDI', specialty: 'Orthopedics', image: 'public/doctors/manoj.png' },
      { name: 'Dr. Vamshivardhan. P', specialty: 'General Surgery', image: 'public/doctors/vamshivardhan-p.png' },
      { name: 'Dr. M.V.SOMAKRISHNA', specialty: 'General Medicine', image: 'public/doctors/m-v-somakrishna.png' },
      { name: 'Dr. Indra Mohan', specialty: 'Neuro Surgery', image: 'public/doctors/indra-mohan.png' },
      { name: 'Dr. Venkateswarulu', specialty: 'Physiotherapy', image: 'public/doctors/venkateswarulu.png' },
      { name: 'Dr. Sandeep', specialty: 'Anesthesia', image: 'public/doctors/sandeep.png' },
    ]
  },
  {
    branch: 'Miyapur',
    doctors: [
      { name: 'Dr. Sandhya Raikode', specialty: 'General Medicine', image: 'public/doctors/sandhya-raikode.png' },
      { name: 'Dr. Swetha Deepthi Vajrala', specialty: 'Gynecology', image: 'public/doctors/swetha-deepthi-vajrala.png' },
      { name: 'Dr. Kota Adarsh', specialty: 'Orthopedics', image: 'public/doctors/kota-adarsh.png' },
      { name: 'Dr. Ramya Allaparthi', specialty: 'Orthopedics', image: 'public/doctors/ramya-allaparthi.png' },
      { name: 'Dr. Santhosh Kumar', specialty: 'General & Laparoscopic Surgery', image: 'public/doctors/santhosh-kumar.png' },
      { name: 'Dr. Sridhar Reddy Baddam', specialty: 'Vascular & Interventional', image: 'public/doctors/sridhar-reddy-baddam.png' },
      { name: 'Dr. Sai Krishna', specialty: 'Physiotherapy', image: 'public/doctors/sai-krishna.png' },
      { name: 'Dr. Prudhvi Kilaru', specialty: 'General Medicine', image: 'public/doctors/prudhvi-kilaru.png' },
      { name: 'Dr. Mrudula Tallapragada', specialty: 'Pediatrics', image: 'public/doctors/mrudula-tallapragada.png' },
      { name: 'Dr. S Arjun', specialty: 'Surgical Oncology', image: 'public/doctors/s-arjun.png' },
      { name: 'Dr. Ch Mounty Raj', specialty: 'Neurosurgery', image: 'public/doctors/ch-mounty-raj.png' },
    ]
  }
];

// Read existing doctors
const content = fs.readFileSync('./src/data/doctors.js', 'utf8');
const docBlocks = content.split(/\{\s*id:\s*/).slice(1);
const map = {};
docBlocks.forEach(b => {
  const getField = (name) => {
    const m = b.match(new RegExp(name + ':\\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]'));
    return m ? m[1] : '';
  };
  const getArray = (name) => {
    const m = b.match(new RegExp(name + ':\\s*\\[([^\\]]+)\\]'));
    return m ? m[1].split(',').map(s => s.trim().replace(/^[\x27\x22]|[\x27\x22]$/g, '')) : [];
  };
  const name = getField('name');
  if (name) {
    const norm = name.toLowerCase().replace(/dr\.\s*/i, '').replace(/[^a-z0-9]/g, '');
    map[norm] = {
      label: getField('label'),
      sub: getField('sub'),
      rating: getField('rating') || '4.9',
      exp: getField('exp') || '10+ Years',
      tagline: getField('tagline'),
      about: getField('about'),
      expertise: getArray('expertise'),
      education: getArray('education'),
      languages: getArray('languages'),
      availability: getField('availability') || 'Mon – Sat: 9:00 AM – 5:00 PM',
      phone: getField('phone') || '92479 58308',
      whatsapp: getField('whatsapp') || '919247958308'
    };
  }
});

function getSpecialtyId(spec) {
  const s = spec.toLowerCase();
  if (s.includes('vascular')) return 'vascular';
  if (s.includes('gastro')) return 'gastro';
  if (s.includes('ortho')) return 'ortho';
  if (s.includes('physio')) return 'physio';
  if (s.includes('neuro') && (s.includes('physician') || (s.includes('neurology') && !s.includes('surg')))) return 'neuro-physician';
  if (s.includes('neuro') && (s.includes('surg') || s.includes('neurosurg'))) return 'neuro-surgeon';
  if (s.includes('laparoscopic') || s === 'general surgery') return 'gen-laparoscopic';
  if (s.includes('anesthesia')) return 'anesthesia';
  if (s.includes('cardio')) return 'cardio';
  if (s.includes('nephro')) return 'nephro';
  if (s.includes('plastic')) return 'plastic';
  if (s.includes('pulmo')) return 'pulmo';
  if (s.includes('uro')) return 'urology';
  if (s.includes('radio')) return 'radio';
  if (s.includes('medicine') || s.includes('physician')) return 'physician';
  if (s.includes('onco')) return 'onco';
  if (s.includes('gyn')) return 'gyn';
  if (s.includes('ct surg')) return 'ct-surgery';
  if (s === 'ent' || s.includes(' ent') || s.includes('ent ')) return 'ent';
  if (s.includes('ped')) return 'peds';
  return 'general';
}

function cleanTitleName(name) {
  return name.trim();
}

const slugUsed = new Set();
function makeSlug(name, branch) {
  let s = name.toLowerCase()
    .replace(/^dr\.\s*/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (slugUsed.has(s)) {
    s = s + '-' + branch.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  slugUsed.add(s);
  return s;
}

let currentId = 101;
const doctorObjects = [];

userBranches.forEach(ub => {
  ub.doctors.forEach(doc => {
    const norm = doc.name.toLowerCase().replace(/dr\.\s*/i, '').replace(/[^a-z0-9]/g, '');
    const existing = map[norm] || {};
    const specialtyId = getSpecialtyId(doc.specialty);
    const docSlug = makeSlug(doc.name, ub.branch);
    const imgFilename = doc.image.replace('public/', '');

    const label = existing.label || (doc.specialty + ' Specialist');
    const sub = existing.sub || 'MBBS, Specialization';
    const rating = existing.rating || '4.9';
    const exp = existing.exp || '10+ Years';
    const tagline = existing.tagline || (doc.specialty + ' Excellence & Patient-Centric Care.');
    const about = existing.about || (doc.name + ' is a leading specialist in ' + doc.specialty + ' at Srikara Hospitals, ' + ub.branch + ', dedicated to compassionate care and clinical excellence.');
    const expertise = (existing.expertise && existing.expertise.length > 0) ? existing.expertise : [doc.specialty, 'Patient Care', 'Clinical Consultation'];
    const education = (existing.education && existing.education.length > 0) ? existing.education : ['MBBS', doc.specialty];
    const languages = (existing.languages && existing.languages.length > 0) ? existing.languages : ['Telugu', 'Hindi', 'English'];
    const availability = existing.availability || 'Mon – Sat: 9:00 AM – 5:00 PM';
    const phone = existing.phone || '92479 58308';
    const whatsapp = existing.whatsapp || '919247958308';

    doctorObjects.push({
      id: currentId++,
      branch: ub.branch,
      specialty: doc.specialty,
      specialtyId,
      name: doc.name,
      slug: docSlug,
      label,
      sub,
      rating,
      exp,
      imageFile: imgFilename,
      tagline,
      about,
      expertise,
      education,
      languages,
      availability,
      phone,
      whatsapp
    });
  });
});

console.log('Total generated doctors:', doctorObjects.length);

let output = `import { assetUrl } from '@/lib/assetUrl'

// Specialty → filter id mapping
export const SPECIALTY_MAP = {
  'Orthopedics': 'ortho',
  'Cardiology': 'cardio',
  'Nephrology': 'nephro',
  'Neurosurgery': 'neuro-surgeon',
  'Neuro Surgery': 'neuro-surgeon',
  'Neurology Surgery': 'neuro-surgeon',
  'Neuro Surgeon': 'neuro-surgeon',
  'Neurology': 'neuro-physician',
  'Neuro Physician': 'neuro-physician',
  'Neurology Physician': 'neuro-physician',
  'Oncology': 'onco',
  'Surgical Oncology': 'onco',
  'General Medicine': 'physician',
  'General Physician': 'physician',
  'Urology': 'urology',
  'Pediatrics': 'peds',
  'Pulmonology': 'pulmo',
  'Plastic Surgery': 'plastic',
  'ENT': 'ent',
  'Physiotherapy': 'physio',
  'Anesthesia': 'anesthesia',
  'General Surgery': 'gen-laparoscopic',
  'General & Laparoscopic Surgery': 'gen-laparoscopic',
  'Gynecology': 'gyn',
  'CT Surgery': 'ct-surgery',
  'Gastroenterology': 'gastro',
  'Vascular & Interventional': 'vascular',
  'Vascular': 'vascular',
  'Radiology': 'radio',
}

// Accent colors per specialty
export const ACCENT_MAP = {
  ortho:             { accent: '#1a56db', accentLight: '#eff6ff' },
  cardio:            { accent: '#dc2626', accentLight: '#fef2f2' },
  nephro:            { accent: '#0891b2', accentLight: '#ecfeff' },
  'neuro-surgeon':   { accent: '#7c3aed', accentLight: '#f5f3ff' },
  'neuro-physician': { accent: '#7c3aed', accentLight: '#f5f3ff' },
  onco:              { accent: '#9333ea', accentLight: '#faf5ff' },
  physician:         { accent: '#2563eb', accentLight: '#eff6ff' },
  urology:           { accent: '#d97706', accentLight: '#fffbeb' },
  peds:              { accent: '#ec4899', accentLight: '#fdf2f8' },
  pulmo:             { accent: '#0d9488', accentLight: '#f0fdfa' },
  plastic:           { accent: '#f59e0b', accentLight: '#fffbeb' },
  ent:               { accent: '#0d9488', accentLight: '#f0fdfa' },
  physio:            { accent: '#16a34a', accentLight: '#f0fdf4' },
  anesthesia:        { accent: '#475569', accentLight: '#f8fafc' },
  'gen-laparoscopic':{ accent: '#16a34a', accentLight: '#f0fdf4' },
  gyn:               { accent: '#db2777', accentLight: '#fdf2f8' },
  'ct-surgery':      { accent: '#dc2626', accentLight: '#fef2f2' },
  gastro:            { accent: '#0284c7', accentLight: '#f0f9ff' },
  vascular:          { accent: '#0d9488', accentLight: '#f0fdfa' },
  radio:             { accent: '#475569', accentLight: '#f8fafc' },
  general:           { accent: '#16a34a', accentLight: '#f0fdf4' },
}

const dummy = (seed) => assetUrl('placeholder-doctor.png')

export const ALL_DOCTORS = [\n`;

let lastBranch = '';
doctorObjects.forEach(d => {
  if (d.branch !== lastBranch) {
    output += `  // ── ${d.branch.toUpperCase()} (${userBranches.find(b => b.branch === d.branch).doctors.length} DOCTORS) ──\n`;
    lastBranch = d.branch;
  }
  output += `  {
    id: ${d.id}, branch: ${JSON.stringify(d.branch)}, specialty: ${JSON.stringify(d.specialty)}, specialtyId: ${JSON.stringify(d.specialtyId)},
    name: ${JSON.stringify(d.name)}, slug: ${JSON.stringify(d.slug)},
    label: ${JSON.stringify(d.label)},
    sub: ${JSON.stringify(d.sub)},
    rating: ${JSON.stringify(d.rating)}, exp: ${JSON.stringify(d.exp)},
    image: assetUrl(${JSON.stringify(d.imageFile)}),
    fallback: dummy(${JSON.stringify(d.slug)}),
    tagline: ${JSON.stringify(d.tagline)},
    about: ${JSON.stringify(d.about)},
    expertise: ${JSON.stringify(d.expertise)},
    education: ${JSON.stringify(d.education)},
    languages: ${JSON.stringify(d.languages)},
    availability: ${JSON.stringify(d.availability)},
    phone: ${JSON.stringify(d.phone)}, whatsapp: ${JSON.stringify(d.whatsapp)},
  },\n`;
});

output += `]

// Get unique specialties for filter tabs
export const getSpecialties = (branchFilter = null) => {
  const docs = branchFilter
    ? ALL_DOCTORS.filter(d => d.branch === branchFilter)
    : ALL_DOCTORS
  const seen = new Set()
  return [
    { id: 'all', name: 'All' },
    ...docs
      .filter(d => { if (seen.has(d.specialtyId)) return false; seen.add(d.specialtyId); return true })
      .map(d => ({ id: d.specialtyId, name: d.specialty }))
  ]
}
`;

fs.writeFileSync('./src/data/doctors.js', output, 'utf8');
console.log('Successfully written to src/data/doctors.js');
