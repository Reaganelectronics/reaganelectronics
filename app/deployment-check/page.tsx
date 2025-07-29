"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DeploymentCheck } from "@/components/deployment-check"

export default function DeploymentCheckPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Deployment Readiness Check</h1>
            <p className="text-xl text-gray-600">Comprehensive testing of all website components before going live</p>
          </div>

          <DeploymentCheck />
        </div>
      </section>

      <Footer />
    </div>
  )
}
