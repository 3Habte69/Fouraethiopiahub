import Header from '@/components/Header'
import { useEffect, useState } from 'react'

export default function Admin(){
  const [isAdmin, setIsAdmin] = useState(false)
  const [note, setNote] = useState('')

  useEffect(()=>{
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const payload = JSON.parse(atob(token.split('.')[1]))
      setIsAdmin(payload.role === 'admin')
    } catch {}
  }, [])

  async function seed(){
    setNote('Seeding...')
    const r = await fetch('/api/dev/seed?key=SEED123')
    const x = await r.json()
    if(r.ok) setNote('Seeded ✅')
    else setNote(x.error || 'Failed')
  }

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="card">
          <h2>Admin Panel</h2>
          {isAdmin ? (
            <>
              <button className="btn" onClick={seed}>Seed Database</button>
              {note && <div style={{marginTop:8}}>{note}</div>}
              <p style={{marginTop:12}}>Use the Tasks page to add tasks.</p>
            </>
          ) : (
            <div className="toast">Admin only. Please login with your admin email at /login.</div>
          )}
        </div>
      </div>
    </div>
  )
}
