import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ShopMart - Home',
  description: 'Welcome to ShopMart - Your one-stop shopping destination',
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopMart</h1>
          <p className="text-xl mb-6">
            Discover amazing products at unbeatable prices. Shop now and enjoy free shipping on orders over $50!
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['T-shirts', 'Jeans', 'Shoes'].map((category) => (
            <Link 
              key={category} 
              href={`/categories/${category.toLowerCase()}`}
              className="group"
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition duration-300">{category}</h3>
                  <p className="text-gray-600">Explore our {category.toLowerCase()} collection</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">Short description of the product goes here</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">$99.99</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Spring Sale!</h3>
              <p className="text-yellow-700 mb-2">Get up to 40% off on selected items</p>
              <p className="text-sm text-yellow-600">Use code: SPRING40 at checkout</p>
            </div>
            <Link 
              href="/deals" 
              className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section>
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with our latest products and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
