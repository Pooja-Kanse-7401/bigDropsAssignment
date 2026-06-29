'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import VehicleSelects from '@/components/VehicleSelects'
import SuccessMessage from '@/components/SuccessMessage'
import { leadSchema, type LeadFormData } from '@/lib/validations'

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function LeadForm() {
  const [submitted, setSubmitted]     = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [apiError, setApiError]       = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  async function onSubmit(data: LeadFormData) {
    setApiError('')
    try {
      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        setApiError(json.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSubmittedName(data.firstName)
      setSubmitted(true)
    } catch {
      setApiError('Network error. Please check your connection and try again.')
    }
  }

  if (submitted) {
    return (
      <SuccessMessage
        firstName={submittedName}
        onReset={() => { setSubmitted(false); setSubmittedName('') }}
      />
    )
  }

  return (
    <Card className="shadow-xl border-0 rounded-2xl overflow-hidden animate-fade-up">
      <div className="h-1.5 bg-gradient-to-r from-blue-700 to-blue-500" />
      <CardContent className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Get Your Free Quote</h3>

        {apiError && (
          <div role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <input type="hidden" {...register('carYear', { valueAsNumber: true })} />
          <input type="hidden" {...register('carMake')} />
          <input type="hidden" {...register('carModel')} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Jane"
                aria-describedby="firstName-error"
                className={errors.firstName ? 'border-red-400 bg-red-50/30' : ''}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-red-600 text-xs">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Smith"
                aria-describedby="lastName-error"
                className={errors.lastName ? 'border-red-400 bg-red-50/30' : ''}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-red-600 text-xs">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              aria-describedby="email-error"
              className={errors.email ? 'border-red-400 bg-red-50/30' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                aria-describedby="phone-error"
                className={errors.phone ? 'border-red-400 bg-red-50/30' : ''}
                {...register('phone', {
                  onChange: (e) => {
                    e.target.value = formatPhone(e.target.value)
                  },
                })}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-600 text-xs">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="78701"
                maxLength={5}
                aria-describedby="zipCode-error"
                className={errors.zipCode ? 'border-red-400 bg-red-50/30' : ''}
                {...register('zipCode')}
              />
              {errors.zipCode && (
                <p id="zipCode-error" className="text-red-600 text-xs">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <VehicleSelects
            onYearChange={(year) => setValue('carYear', year, { shouldValidate: !!getValues('carYear') })}
            onMakeChange={(make) => setValue('carMake', make, { shouldValidate: !!getValues('carMake') })}
            onModelChange={(model) => setValue('carModel', model, { shouldValidate: !!getValues('carModel') })}
            errors={{
              carYear:  errors.carYear?.message  ? [errors.carYear.message]  : undefined,
              carMake:  errors.carMake?.message  ? [errors.carMake.message]  : undefined,
              carModel: errors.carModel?.message ? [errors.carModel.message] : undefined,
            }}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="group w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold py-3.5 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] mt-2"
          >
            {isSubmitting ? 'Submitting…' : (
              <>
                Get My Free Quote{' '}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </>
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}
