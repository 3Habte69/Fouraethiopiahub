import Header from '@/components/Header'
import { useEffect, useState } from 'react'

export default function Tasks(){
  const [tasks, setTasks] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(()=>{
    load()
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const payload = JSON.parse(atob(token.split('.')[1]))
      setIsAdmin(payload.role === 'admin')
    } catch {}
  }, [])

  async function load(){
    const r = await fetch('/api/tasks')
    const x = await r.json()
    setTasks(x.tasks || [])
  }

  async function add(){
    const r = await fetch('/api/tasks', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, description: desc }) })
    const x = await r.json()
    if(r.ok){ setOpen(false); setTitle(''); setDesc(''); load() } else alert(x.error || 'Failed')
  }

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="header">
          <h2>Tasks & Feature Requests</h2>
          {isAdmin && <button className="btn" onClick={()=>setOpen(true)}>+ Add Task / Feature</button>}
        </div>
        <div className="list">
          {tasks.map(t => (
            <div className="card" key={t._id}>
              <div><b>{t.title}</b></div>
              {t.description && <div>{t.description}</div>}
              <div className="badge">{t.status}</div>
            </div>
          ))}
          {tasks.length === 0 && <div>No tasks yet.</div>}
        </div>

        {open && (
          <div className="card" style={{marginTop:16}}>
            <input className="input" placeholder="Short title" value={title} onChange={e=>setTitle(e.target.value)} />
            <div style={{height:8}}/>
            <textarea className="input" placeholder="Describe it" value={desc} onChange={e=>setDesc(e.target.value)} />
            <div style={{height:8}}/>
            <button className="btn" onClick={add}>Submit</button>
          </div>
        )}
      </div>
    </div>
  )
}
