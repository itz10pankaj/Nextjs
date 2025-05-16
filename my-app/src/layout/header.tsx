import React from 'react'
import Link from 'next/link'


const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link href="/">MyApp</Link>
        </div>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
