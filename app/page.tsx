import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Star, Shield, Truck, CreditCard } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Banner Image */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <Image
                src="/images/banner.jpg"
                alt="Reagan Midyear 80% Discount Electronics Auction"
                width={600}
                height={800}
                className="max-w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-4 bg-red-500 hover:bg-red-600 text-lg px-4 py-2">
                🔥 MIDYEAR MEGA SALE - 80% OFF
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Reagan Electronics Auction</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl">
                Premium electronics at unbeatable prices! Get authentic iPhones starting from $280, AirPods from $30, VR
                devices from $70, and iPads from $399.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/shop">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">100% genuine electronics from trusted sources</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and secure delivery worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and flexible payment options</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">5-Star Service</h3>
              <p className="text-gray-600">Exceptional customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular electronics with incredible discounts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link href="/shop?category=iPhone" className="group">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">iPhones</h3>
                <p className="text-gray-600">iPhone 11 to iPhone 16 Pro Max</p>
              </div>
            </Link>

            <Link href="/shop?category=AirPods" className="group">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold mb-2">AirPods</h3>
                <p className="text-gray-600">AirPods 2nd Gen, Pro, and 4</p>
              </div>
            </Link>

            <Link href="/shop?category=VR" className="group">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🥽</div>
                <h3 className="text-xl font-semibold mb-2">VR Devices</h3>
                <p className="text-gray-600">Elecom VR and more</p>
              </div>
            </Link>

            <Link href="/shop?category=iPad" className="group">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">iPads</h3>
                <p className="text-gray-600">iPad mini 5th and 6th Gen</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Miss Out on These Amazing Deals!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Limited time offer - Get up to 80% off on premium electronics. Shop now before stocks run out!
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
