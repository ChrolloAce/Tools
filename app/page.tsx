'use client'

import React, { useState, useEffect } from 'react'

interface CalculationResults {
  yearlyUsers: number
  monthlyUsers: number
  weeklyUsers: number
  yearlyRevenue: number
  monthlyRevenue: number
  weeklyRevenue: number
}

export default function SimpleCalculator() {
  const [revenueGoal, setRevenueGoal] = useState<number>(100000)
  const [revenueGoalDisplay, setRevenueGoalDisplay] = useState<string>('100,000')
  const [yearlyPrice, setYearlyPrice] = useState<number>(99)
  const [monthlyPrice, setMonthlyPrice] = useState<number>(12)
  const [weeklyPrice, setWeeklyPrice] = useState<number>(3)
  const [conversionRate, setConversionRate] = useState<number>(5)
  const [results, setResults] = useState<CalculationResults | null>(null)

  const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleRevenueGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '')
    const numValue = Number(value) || 0
    setRevenueGoal(numValue)
    setRevenueGoalDisplay(formatNumberWithCommas(numValue))
  }

  const calculateUsers = () => {
    // Calculate base users needed for each subscription type
    const yearlyUsers = Math.ceil(revenueGoal / yearlyPrice)
    const monthlyUsers = Math.ceil(revenueGoal / (monthlyPrice * 12))
    const weeklyUsers = Math.ceil(revenueGoal / (weeklyPrice * 52))

    // Adjust for conversion rate (if conversion rate is 5%, you need 20x more visitors)
    const conversionMultiplier = 100 / conversionRate

    setResults({
      yearlyUsers: Math.ceil(yearlyUsers * conversionMultiplier),
      monthlyUsers: Math.ceil(monthlyUsers * conversionMultiplier),
      weeklyUsers: Math.ceil(weeklyUsers * conversionMultiplier),
      yearlyRevenue: yearlyUsers * yearlyPrice,
      monthlyRevenue: monthlyUsers * monthlyPrice * 12,
      weeklyRevenue: weeklyUsers * weeklyPrice * 52,
    })
  }

  useEffect(() => {
    calculateUsers()
  }, [revenueGoal, yearlyPrice, monthlyPrice, weeklyPrice, conversionRate])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Revenue Calculator
          </h1>
          <p className="text-slate-600 text-lg">
            Calculate user requirements for your revenue goals
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          {/* Revenue Goal */}
          <div className="mb-10">
            <label className="block text-lg font-semibold text-slate-700 mb-4">
              Annual Revenue Goal
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-500 text-xl font-medium">$</span>
              <input
                type="text"
                value={revenueGoalDisplay}
                onChange={handleRevenueGoalChange}
                className="w-full pl-12 pr-6 py-4 text-3xl font-bold border-2 border-slate-200 rounded-lg focus:border-slate-600 focus:outline-none bg-white text-slate-800 transition-colors"
                placeholder="100,000"
              />
            </div>
          </div>

          {/* Subscription Prices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
              <label className="block font-semibold text-slate-700 mb-3">
                Yearly Subscription
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                <input
                  type="number"
                  value={yearlyPrice}
                  onChange={(e) => setYearlyPrice(Number(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-600 focus:outline-none bg-white text-slate-800 font-medium transition-colors"
                  placeholder="99"
                />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-slate-500">Annual payment</p>
                <p className="text-sm text-emerald-600 font-medium">
                  ≈ {formatCurrency(yearlyPrice / 12)}/month
                </p>
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-slate-700 mb-3">
                Monthly Subscription
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                <input
                  type="number"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-600 focus:outline-none bg-white text-slate-800 font-medium transition-colors"
                  placeholder="12"
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">Monthly payment</p>
            </div>
            
            <div>
              <label className="block font-semibold text-slate-700 mb-3">
                Weekly Subscription
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                <input
                  type="number"
                  value={weeklyPrice}
                  onChange={(e) => setWeeklyPrice(Number(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-600 focus:outline-none bg-white text-slate-800 font-medium transition-colors"
                  placeholder="3"
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">Weekly payment</p>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="mb-8">
            <label className="block font-semibold text-slate-700 mb-3">
              Conversion Rate
            </label>
            <div className="flex items-center space-x-6">
              <input
                type="range"
                min="1"
                max="100"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg font-bold text-slate-800 min-w-[80px] text-center">
                {conversionRate}%
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Percentage of visitors who become paying customers
            </p>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Yearly Subscription */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-emerald-700">Yearly Plan</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-slate-800">
                    {formatNumber(results.yearlyUsers)}
                  </p>
                  <p className="text-slate-600 font-medium">Users needed</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Total Revenue:</span>
                    <span className="font-bold text-slate-800">{formatCurrency(results.yearlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Revenue per user:</span>
                    <span className="text-slate-600 text-sm">{formatCurrency(yearlyPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Subscription */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-blue-700">Monthly Plan</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-slate-800">
                    {formatNumber(results.monthlyUsers)}
                  </p>
                  <p className="text-slate-600 font-medium">Users needed</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Total Revenue:</span>
                    <span className="font-bold text-slate-800">{formatCurrency(results.monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Revenue per user:</span>
                    <span className="text-slate-600 text-sm">{formatCurrency(monthlyPrice * 12)}/year</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Subscription */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-700">Weekly Plan</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-slate-800">
                    {formatNumber(results.weeklyUsers)}
                  </p>
                  <p className="text-slate-600 font-medium">Users needed</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Total Revenue:</span>
                    <span className="font-bold text-slate-800">{formatCurrency(results.weeklyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Revenue per user:</span>
                    <span className="text-slate-600 text-sm">{formatCurrency(weeklyPrice * 52)}/year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Insights */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-slate-600">Higher conversion rates significantly reduce user acquisition requirements</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-slate-600">Annual subscriptions typically provide better customer lifetime value</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-slate-600">Weekly plans may require more users but improve cash flow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 