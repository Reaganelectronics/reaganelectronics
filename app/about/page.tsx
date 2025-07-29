import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { Shield, Award, Users, Clock } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Reagan Electronics</h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Your trusted partner for premium electronics at unbeatable prices through our exclusive auction system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Reagan Electronics Auction was founded with a simple mission: to make premium electronics accessible to
                everyone through our innovative auction system. We believe that everyone deserves access to the latest
                technology without breaking the bank.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our midyear 80% discount electronics auction has become a trusted destination for tech enthusiasts,
                offering authentic products from leading brands like Apple at unprecedented prices.
              </p>
              <p className="text-lg text-gray-600">
                With years of experience in the electronics industry, we've built strong relationships with suppliers
                and manufacturers, allowing us to offer genuine products at prices that seem too good to be true – but
                they are!
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-gray-600">Products Sold</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Auction Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Auction System Works</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and designed to save you money</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Browse & Select</h3>
              <p className="text-gray-600">
                Browse our extensive catalog of premium electronics and select the products you want. All items are
                authentic and come with detailed specifications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Place Your Order</h3>
              <p className="text-gray-600">
                Add items to your cart and submit your order. We'll send you the complete order details via email for
                confirmation and payment processing.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Payment & Delivery</h3>
              <p className="text-gray-600">
                Complete your payment through our secure process and receive your authentic electronics with fast,
                tracked shipping worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Reagan Electronics?</h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best value and service in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% Authentic</h3>
              <p className="text-gray-600">
                All our products are genuine and sourced directly from authorized distributors.
              </p>
            </div>

            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Our auction system ensures you get the best possible prices on premium electronics.
              </p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our knowledgeable team is here to help you make the right choice for your needs.
              </p>
            </div>

            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick processing and shipping to get your electronics to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're not just selling electronics – we're building relationships. Every purchase comes with our promise of
            authenticity, quality, and exceptional customer service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p>Every product is thoroughly tested and verified before shipping.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p>Your satisfaction is our top priority, and we're here to help every step of the way.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Transparent Process</h3>
              <p>No hidden fees, no surprises – just honest pricing and clear communication.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
