// Real catalog scraped from the live shop at https://lantechdata.co.ke/shop/
// (WooCommerce export had no usable product data — see README).
export const CATEGORIES = ['Automotive', 'HVAC']

const AUTOMOTIVE_COURSES = [
  'Basic Engine Fundamentals',
  'Automotive Electrical and Electronic Systems',
  'Petrol Fuel Systems',
  'Diesel Fuel Systems',
  'Engine Management Systems',
  'Manual Transmissions',
  'Automatic Transmissions and Transaxles',
  'Wheel Drive Systems',
  'Propeller Shafts and Differential Gear',
  'Brakes Systems',
  'Steering and Suspension Systems',
  'Air Conditioning and Heating Systems',
  'Hybrid Systems',
]

const HVAC_COURSES = [
  'HVAC Fundamentals',
  'Electric Circuit and Controls',
  'Electric Motors',
  'Refrigeration and Air Conditioning Compressors',
  'Refrigeration System Components',
  'Refrigeration Systems',
  'Air Conditioning Systems',
  'Automotive Air Conditioning',
]

export const SERVICES = [
  {
    id: 'automotive-3-months',
    category: 'Automotive',
    name: 'Automotive (Single User) 3 Months',
    tagline: 'Virtual TVET (ODeL) — 3 months access, single user.',
    price: 9950,
    unit: '3 months access',
    poweredBy: 'Labtech Academy International',
    image: '/images/products/automotive.jpg',
    courses: AUTOMOTIVE_COURSES,
  },
  {
    id: 'automotive-6-months',
    category: 'Automotive',
    name: 'Automotive (Single User) 6 Months',
    tagline: 'Virtual TVET (ODeL) — 6 months access, single user.',
    price: 16550,
    unit: '6 months access',
    poweredBy: 'Labtech Academy International',
    image: '/images/products/automotive.jpg',
    courses: AUTOMOTIVE_COURSES,
  },
  {
    id: 'automotive-12-months',
    category: 'Automotive',
    name: 'Automotive (Single User) 12 Months',
    tagline: 'Virtual TVET (ODeL) — 12 months access, single user.',
    price: 23250,
    unit: '12 months access',
    poweredBy: 'Labtech Academy International',
    image: '/images/products/automotive.jpg',
    courses: AUTOMOTIVE_COURSES,
  },
  {
    id: 'hvac-3-months',
    category: 'HVAC',
    name: 'HVAC (Air Conditioning and Refrigeration) 3 Months',
    tagline: 'Virtual TVET (ODeL) — 3 months access, single user.',
    price: 7250,
    unit: '3 months access',
    poweredBy: 'Labtech Academy International',
    image: '/images/products/hvac.jpg',
    courses: HVAC_COURSES,
  },
  {
    id: 'hvac-6-months',
    category: 'HVAC',
    name: 'HVAC (Air Conditioning and Refrigeration) 6 Months',
    tagline: 'Virtual TVET (ODeL) — 6 months access, single user.',
    price: 13950,
    unit: '6 months access',
    poweredBy: 'Labtech Academy International',
    image: '/images/products/hvac.jpg',
    courses: HVAC_COURSES,
  },
  {
    id: 'hvac-12-months',
    category: 'HVAC',
    name: 'HVAC (Air Conditioning and Refrigeration) 12 Months',
    tagline: 'Virtual TVET (ODeL) — 12 months access, single user.',
    price: 19550,
    unit: '12 months access',
    poweredBy: 'Labtech Academy International',
    image: '/images/products/hvac.jpg',
    courses: HVAC_COURSES,
  },
]

export const findService = (id) => SERVICES.find((s) => s.id === id)

export const formatKES = (amount) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount)
