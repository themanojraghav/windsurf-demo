'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleAuthAction = () => {
    if (isAuthenticated) {
      signOut()
    } else {
      router.push('/auth/signin')
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ShopMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-blue-600">
              Deals
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button 
              onClick={handleAuthAction} 
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
            >
              <User size={24} />
              <span className="text-sm">{isAuthenticated ? 'Sign Out' : 'Sign In'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-gray-600 hover:text-blue-600 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-blue-600 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-600 hover:text-blue-600 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center justify-between py-2">
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-blue-600 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <button
                  className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleAuthAction()
                  }}
                >
                  <User size={24} />
                  <span className="text-sm">{isAuthenticated ? 'Sign Out' : 'Sign In'}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
