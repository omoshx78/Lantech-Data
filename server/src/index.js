import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDb } from './lib/db.js'
import contactRouter from './routes/contact.js'
import ordersRouter from './routes/orders.js'
import mpesaRouter from './routes/mpesa.js'

const app = express()

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/', (_req, res) => res.json({ ok: true, service: 'lantechdata-server' }))
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/contact', contactRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/mpesa', mpesaRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 4000

initDb().then(() => {
  app.listen(PORT, () => console.log(`LanTech server listening on :${PORT}`))
})
