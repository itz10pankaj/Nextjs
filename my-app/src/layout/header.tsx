import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-xl font-bold text-blue-600">
          <Link href="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
