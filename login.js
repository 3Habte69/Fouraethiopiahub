import { signToken } from '@/lib/jwt'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email } = req.body || {}
  if(!email) return res.status(400).json({ error: 'Email required' })
  const admins = (process.env.ADMIN_EMAILS || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean)
  const isAdmin = admins.includes(email.toLowerCase())
  if(!isAdmin) return res.status(401).json({ error: 'Not an admin email' })
  const token = signToken({ email, role:'admin' })
  res.json({ token })
}
