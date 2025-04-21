export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopMart</h3>
            <p className="text-gray-300">Your one-stop destination for quality products at affordable prices.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-300 hover:text-white">All Products</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-white">Categories</a></li>
              <li><a href="/deals" className="text-gray-300 hover:text-white">Deals & Offers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-white">Returns & Refunds</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white">Our Story</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
