import { Shield } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import TrustSignals from '@/components/TrustSignals'
import Testimonials from '@/components/Testimonials'
import LeadForm from '@/components/LeadForm'

export default function Home() {
  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm px-4 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight text-slate-900">
            <Shield className="w-5 h-5 text-blue-700" aria-hidden="true" />
            ShieldDrive <span className="text-blue-700">Insurance</span>
          </a>
          <nav aria-label="Main navigation">
            <a
              href="#get-quote"
              className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Get a Quote
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — contains the only <h1> on the page */}
        <HeroSection />

        {/* Trust signals */}
        <TrustSignals />

        {/* Lead capture form */}
        <section id="get-quote" aria-labelledby="quote-heading" className="bg-gradient-to-b from-white to-slate-50 px-4 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 id="quote-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-center mb-2">
              Get Your Free Quote
            </h2>
            <p className="text-base leading-relaxed text-slate-600 text-center mb-8">
              Fill out the form below and we'll match you with the best rates.
            </p>
            <LeadForm />
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      <footer className="bg-gradient-to-br from-slate-950 to-slate-800 border-t-2 border-blue-700 px-4 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p className="flex items-center gap-1.5 font-semibold text-slate-300">
            <Shield className="w-4 h-4 text-blue-500" aria-hidden="true" />
            ShieldDrive Insurance
          </p>
          <p>© {new Date().getFullYear()} ShieldDrive Insurance. All rights reserved.</p>
          <p>Licensed in all 50 states · Not affiliated with any specific carrier</p>
        </div>
      </footer>
    </>
  )
}
