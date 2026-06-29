'use client'

import { Card, CardContent } from '@/components/ui/card'

interface Props {
  firstName: string
  onReset: () => void
}

export default function SuccessMessage({ firstName, onReset }: Props) {
  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardContent className="p-8 flex flex-col items-center text-center gap-4">

        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
          You're all set, {firstName}!
        </h3>

        <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
          We've received your information and will contact you within 24 hours with your personalized quote.
        </p>

        <button
          onClick={onReset}
          className="mt-2 text-sm text-blue-600 underline underline-offset-4 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          Get Another Quote
        </button>

      </CardContent>
    </Card>
  )
}
