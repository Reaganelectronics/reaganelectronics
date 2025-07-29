import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "I couldn't believe the prices! Got an iPhone 15 Pro for 80% off and it's completely authentic. The whole process was smooth and professional. Highly recommend Reagan Electronics!",
    product: "iPhone 15 Pro",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "California, USA",
    rating: 5,
    text: "Amazing service! I was skeptical about the discounts at first, but everything checked out perfectly. My AirPods Pro arrived quickly and work flawlessly. Will definitely shop here again.",
    product: "AirPods Pro",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Texas, USA",
    rating: 5,
    text: "The customer service is outstanding. They answered all my questions promptly and helped me choose the right iPad. The 80% discount saved me hundreds of dollars!",
    product: "iPad mini 6th Gen",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Florida, USA",
    rating: 5,
    text: "I've bought three iPhones from Reagan Electronics for my family. Each time, the experience has been excellent. Authentic products, great prices, and fast shipping.",
    product: "iPhone 14 Pro Max",
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "Washington, USA",
    rating: 5,
    text: "The VR headset I ordered exceeded my expectations. Quality is top-notch and the price was unbeatable. The WhatsApp support was very helpful throughout the process.",
    product: "Elecom VR Headset",
  },
  {
    id: 6,
    name: "James Miller",
    location: "Illinois, USA",
    rating: 5,
    text: "Fantastic experience from start to finish. The iPhone 16 I received is brand new and works perfectly. The auction system really does provide incredible savings!",
    product: "iPhone 16",
  },
  {
    id: 7,
    name: "Maria Garcia",
    location: "Arizona, USA",
    rating: 5,
    text: "I was hesitant to buy electronics online, but Reagan Electronics proved me wrong. Professional service, authentic products, and amazing discounts. Couldn't be happier!",
    product: "iPhone 13 Pro",
  },
  {
    id: 8,
    name: "Robert Kim",
    location: "Oregon, USA",
    rating: 5,
    text: "The best electronics deal I've ever found! My AirPods 4 arrived in perfect condition and the price was incredible. The team was very responsive to my questions.",
    product: "AirPods 4",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Testimonials</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            See what our satisfied customers have to say about their experience with Reagan Electronics
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">Products Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">
              Real reviews from real customers who saved big on authentic electronics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>

                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-sm text-blue-600 font-medium mt-1">Purchased: {testimonial.product}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Customers Trust Us</h2>
            <p className="text-xl text-gray-600">
              Building trust through transparency, quality, and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Authentic</h3>
              <p className="text-gray-600">
                Every product is verified for authenticity before shipping. No counterfeits, ever.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Your personal and payment information is protected with industry-standard security.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer support team is available around the clock to help with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Thousands of Satisfied Customers</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the Reagan Electronics difference for yourself. Shop authentic electronics at unbeatable prices
            with our exclusive auction system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
