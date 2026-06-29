import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    quote: "I was paying $180 a month before ShieldDrive. After comparing quotes it dropped to $94. Took me less than 2 minutes and I couldn't believe the difference.",
    name: 'Sarah M.',
    city: 'Austin, TX',
  },
  {
    quote: "Switched my policy after years with the same provider. ShieldDrive found me a better plan with more coverage for $600 less per year. Wish I had done this sooner.",
    name: 'James R.',
    city: 'Phoenix, AZ',
  },
  {
    quote: "Super easy process. Entered my car info, got matched instantly, and my new rate was almost half of what I was paying. Highly recommend to anyone shopping for insurance.",
    name: 'Maria L.',
    city: 'Orlando, FL',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-slate-50 px-4 py-20 md:py-28" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-center mb-10">
          What Our Customers Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <span className="text-5xl font-serif text-blue-100 leading-none select-none -mb-2" aria-hidden="true">&ldquo;</span>
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-slate-600">{t.quote}</p>
                <p className="text-slate-900 font-semibold text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2 shrink-0" aria-hidden="true" />
                  {t.name} <span className="text-slate-500 font-normal ml-1">— {t.city}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
