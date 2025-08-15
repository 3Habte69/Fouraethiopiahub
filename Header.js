import Link from 'next/link'

export default function Header(){
  return (
    <div className="header container">
      <div><b>Foura Ethiopia</b></div>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/login">Login</Link>
      </nav>
    </div>
  )
}
