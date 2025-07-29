"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EmailTest } from "@/components/email-test"

export default function TestEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Email System Test</h1>
            <p className="text-xl text-gray-600">Test the email functionality for orders and contact forms</p>
          </div>

          <EmailTest />
        </div>
      </section>

      <Footer />
    </div>
  )
}
