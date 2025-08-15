import { dbConnect } from '@/lib/db'
import Task from '@/models/Task'
import { verifyToken } from '@/lib/jwt'

export default async function handler(req, res){
  await dbConnect()
  if(req.method === 'GET'){
    const tasks = await Task.find().sort({ createdAt: -1 })
    return res.json({ tasks })
  }
  if(req.method === 'POST'){
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
    const clientToken = req.body?.token || null
    const t = verifyToken(token || clientToken || (req.cookies?.token))
    if(!t || t.role !== 'admin') return res.status(401).json({ error: 'Admin only' })
    const { title, description } = req.body || {}
    if(!title) return res.status(400).json({ error: 'Title required' })
    const doc = await Task.create({ title, description, status: 'open', createdBy: t.email })
    return res.status(201).json({ task: doc })
  }
  return res.status(405).json({ error: 'Method not allowed' })
}
