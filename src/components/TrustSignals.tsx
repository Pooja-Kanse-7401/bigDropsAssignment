import { ShieldCheck, PiggyBank, Clock, BadgeCheck } from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: 'Licensed in All 50 States',
    description: 'Fully licensed and regulated in every US state.',
  },
  {
    icon: PiggyBank,
    title: 'Average Savings of $847/yr',
    description: 'Our customers save big by comparing top carriers.',
  },
  {
    icon: Clock,
    title: '2-Minute Application',
    description: 'Fill out one simple form and get your quote instantly.',
  },
  {
    icon: BadgeCheck,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with no surprises at checkout.',
  },
]

export default function TrustSignals() {
  return (
    <section className="bg-slate-50 px-4 py-20 md:py-28" aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="sr-only">Why Choose ShieldDrive</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl">
              <item.icon size={28} aria-hidden="true" />
            </div>
            <p className="text-slate-900 font-semibold text-base">{item.title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
