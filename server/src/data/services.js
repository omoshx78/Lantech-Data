// Server-side source of truth for pricing. Keep in sync with client/src/data/services.js.
// Real catalog scraped from https://lantechdata.co.ke/shop/ (all prices VAT inclusive, KES).
export const SERVICES = [
  { id: 'automotive-3-months', name: 'Automotive (Single User) 3 Months', price: 9950 },
  { id: 'automotive-6-months', name: 'Automotive (Single User) 6 Months', price: 16550 },
  { id: 'automotive-12-months', name: 'Automotive (Single User) 12 Months', price: 23250 },
  { id: 'hvac-3-months', name: 'HVAC (Air Conditioning and Refrigeration) 3 Months', price: 7250 },
  { id: 'hvac-6-months', name: 'HVAC (Air Conditioning and Refrigeration) 6 Months', price: 13950 },
  { id: 'hvac-12-months', name: 'HVAC (Air Conditioning and Refrigeration) 12 Months', price: 19550 },
]

export const findService = (id) => SERVICES.find((s) => s.id === id)
