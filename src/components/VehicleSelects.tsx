'use client'

import { useEffect, useState } from 'react'

interface Props {
  onYearChange:  (year: number) => void
  onMakeChange:  (make: string) => void
  onModelChange: (model: string) => void
  errors?: {
    carYear?:  string[]
    carMake?:  string[]
    carModel?: string[]
  }
}

const selectBase =
  'h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50'

function selectClass(hasError?: boolean) {
  return `${selectBase} ${hasError ? 'border-red-400 bg-red-50/30' : 'border-slate-300'}`
}

export default function VehicleSelects({ onYearChange, onMakeChange, onModelChange, errors }: Props) {
  const [years,  setYears]  = useState<number[]>([])
  const [makes,  setMakes]  = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])

  const [selectedYear, setSelectedYear] = useState<string>('')
  const [selectedMake, setSelectedMake] = useState<string>('')

  const [loadingYears,  setLoadingYears]  = useState(true)
  const [loadingMakes,  setLoadingMakes]  = useState(false)
  const [loadingModels, setLoadingModels] = useState(false)

  useEffect(() => {
    fetch('/api/vehicles/years')
      .then((r) => r.json())
      .then((data: number[]) => setYears(data))
      .finally(() => setLoadingYears(false))
  }, [])

  function handleYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setSelectedYear(value)
    setSelectedMake('')
    setMakes([])
    setModels([])
    onYearChange(Number(value))
    onMakeChange('')
    onModelChange('')

    setLoadingMakes(true)
    fetch(`/api/vehicles/makes?year=${value}`)
      .then((r) => r.json())
      .then((data: string[]) => setMakes(data))
      .finally(() => setLoadingMakes(false))
  }

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setSelectedMake(value)
    setModels([])
    onMakeChange(value)
    onModelChange('')

    setLoadingModels(true)
    fetch(`/api/vehicles/models?year=${selectedYear}&make=${encodeURIComponent(value)}`)
      .then((r) => r.json())
      .then((data: string[]) => setModels(data))
      .finally(() => setLoadingModels(false))
  }

  function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onModelChange(e.target.value)
  }

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-sm font-medium text-slate-700 mb-3">Your Vehicle</legend>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="car-year">
          Car Year
        </label>
        <div className="min-h-[44px] h-10">
          <select
            id="car-year"
            className={selectClass(errors?.carYear && errors.carYear.length > 0)}
            value={selectedYear}
            onChange={handleYearChange}
            disabled={loadingYears}
            aria-describedby="car-year-error"
          >
            <option value="">{loadingYears ? 'Loading...' : 'Select year'}</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>
        </div>
        <p id="car-year-error" className="text-red-600 text-xs min-h-[16px]" role="alert">
          {errors?.carYear?.[0] ?? ''}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="car-make">
          Car Make
        </label>
        <div className="min-h-[44px] h-10">
          <select
            id="car-make"
            className={selectClass(errors?.carMake && errors.carMake.length > 0)}
            value={selectedMake}
            onChange={handleMakeChange}
            disabled={!selectedYear || loadingMakes}
            aria-describedby="car-make-error"
          >
            <option value="">{loadingMakes ? 'Loading...' : 'Select make'}</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <p id="car-make-error" className="text-red-600 text-xs min-h-[16px]" role="alert">
          {errors?.carMake?.[0] ?? ''}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="car-model">
          Car Model
        </label>
        <div className="min-h-[44px] h-10">
          <select
            id="car-model"
            className={selectClass(errors?.carModel && errors.carModel.length > 0)}
            onChange={handleModelChange}
            disabled={!selectedMake || loadingModels}
            defaultValue=""
            aria-describedby="car-model-error"
          >
            <option value="">{loadingModels ? 'Loading...' : 'Select model'}</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <p id="car-model-error" className="text-red-600 text-xs min-h-[16px]" role="alert">
          {errors?.carModel?.[0] ?? ''}
        </p>
      </div>

    </div>
    </fieldset>
  )
}
