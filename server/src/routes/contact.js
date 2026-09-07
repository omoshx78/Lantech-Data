import { Router } from 'express'
import { nanoid } from 'nanoid'
import nodemailer from 'nodemailer'
import { db } from '../lib/db.js'

const router = Router()

let transporter = null
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }

  const entry = { id: nanoid(), name, email, phone: phone || '', message, createdAt: new Date().toISOString() }
  db.data.contacts.push(entry)
  await db.write()

  if (transporter && process.env.CONTACT_TO_EMAIL) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `New enquiry from ${name} — LanTech website`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'n/a'}\n\n${message}`,
      })
    } catch (err) {
      // Don't fail the request just because email delivery failed — the enquiry
      // is already saved and can be viewed/exported from the database.
      console.error('contact email delivery failed:', err.message)
    }
  }

  res.status(201).json({ ok: true })
})

export default router
