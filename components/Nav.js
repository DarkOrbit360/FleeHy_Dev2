import Link from 'next/link'

export default function Nav(){
  return (
    <nav className="bg-white shadow-sm py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/"><a className="font-bold text-xl">Fleehy</a></Link>
        <div className="space-x-4">
          <Link href="/register"><a>Become a Planner</a></Link>
          <Link href="/planner/dashboard"><a>Dashboard</a></Link>
        </div>
      </div>
    </nav>
  )
}
