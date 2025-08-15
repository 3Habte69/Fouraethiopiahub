import { dbConnect } from '@/lib/db'
import Category from '@/models/Category'
import Task from '@/models/Task'
import User from '@/models/User'

export default async function handler(req, res){
  try {
    const key = req.query.key || ''
    const expected = process.env.SEED_KEY || 'SEED123'
    if (key !== expected) return res.status(401).json({ error: 'Unauthorized seed key' })
    await dbConnect()

    // Upsert admin
    const adminEmail = (process.env.ADMIN_EMAILS || '').split(',')[0] || 'habtamuayele369t@gmail.com'
    await User.updateOne({ email: adminEmail }, { $set: { role: 'admin' } }, { upsert: true })

    // Seed categories
    const categories = [
      { name: 'Mathematics', description: 'Algebra, calculus, geometry' },
      { name: 'Physics', description: 'Mechanics, electricity, optics' },
      { name: 'Computer Science', description: 'Programming and algorithms' },
    ]
    for (const c of categories){
      await Category.updateOne({ name: c.name }, { $set: c }, { upsert: true })
    }

    // Seed tasks
    const tasks = [
      { title: 'Build exam viewer', description: 'PDF viewer with search and pagination', status: 'open', createdBy: adminEmail },
      { title: 'Add Amharic localization', description: 'Switch languages EN/AM', status: 'open', createdBy: adminEmail },
    ]
    for (const t of tasks){
      await Task.updateOne({ title: t.title }, { $set: t }, { upsert: true })
    }

    res.json({ message: 'Seeded successfully' })
  } catch (e){
    res.status(500).json({ error: e.message || 'Seed failed' })
  }
}
