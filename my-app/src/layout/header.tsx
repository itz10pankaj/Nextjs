'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useHeader } from '@/context/HeaderContext'
import Modal from '@/components/Modals/ConsentModal'
const Header = () => {
  const [open, setOpen] = useState(false);
  const links = useHeader();
  if (!links) return <div>Loading header...</div>;

  const handleYes = () => {
    alert('You clicked Yes!');
    setOpen(false);
  };

  const handleNo = () => {
    alert('You clicked No!');
    setOpen(false);
  };
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
        <div>
          <button className="bg-green-500 p-2 rounded-lg text-white text-lg hover:bg-green-700" onClick={() => setOpen(true)}>Logout</button>
          <Modal
            isOpen={open}
            message="
            Are you sure you want to logout?"
            onYes={handleYes}
            onNo={handleNo}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
