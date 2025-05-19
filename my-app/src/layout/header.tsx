'use client'
import React from 'react'
import Link from 'next/link'
import { useHeader } from '@/context/HeaderContext'
const Header = () => {
  const links = useHeader();
  if (!links) return <div>Loading header...</div>;
  
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link href="/">MyApp</Link>
        </div>
        <nav>
          {links.headerLinks.map((link, idx) => (
            <Link key={idx} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
