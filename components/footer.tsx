import Link from "next/link"
import { Facebook, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Reagan Electronics Auction</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for premium electronics at unbeatable prices. We offer authentic products with up to
              80% discount through our exclusive auction system.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://fb.me/wesprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:rdiscountelectronic@gmail.com" className="text-gray-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:214-317-4964" className="text-gray-300 hover:text-white">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>Phone: 214-317-4964</p>
              <p>Email: rdiscountelectronic@gmail.com</p>
              <p>WhatsApp: +1 (909) 261‑9453</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Reagan Electronics Auction. All rights reserved.</p>
          <p className="mt-2 text-sm">Secure payments • Authentic products • Fast shipping</p>
        </div>
      </div>
    </footer>
  )
}
