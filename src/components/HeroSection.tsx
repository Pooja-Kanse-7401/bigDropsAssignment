import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="relative">

      <Image
        src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80"
        alt="Car driving on an open highway"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <section className="relative z-10 text-white px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl flex flex-col gap-6 animate-fade-up">

            <span className="self-start bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full">
              Trusted by 500,000+ drivers
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none drop-shadow-lg">
              Stop Overpaying for Auto Insurance
            </h1>

            <p className="text-base leading-relaxed text-slate-200 max-w-md">
              Get your free personalized quote in under 2 minutes. No spam, no obligation.
            </p>

            <a
              href="#get-quote"
              className="self-start mt-2 inline-block bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-[0.98]"
            >
              Get My Free Quote →
            </a>

          </div>
        </div>
      </section>
    </div>
  )
}
