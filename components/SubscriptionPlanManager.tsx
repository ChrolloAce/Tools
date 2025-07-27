'use client'

import React, { useState } from 'react'
import { SubscriptionPlan } from '@/lib/CalculatorManager'

interface SubscriptionPlanManagerProps {
  subscriptionPlan: SubscriptionPlan
  onPlanUpdate: (plan: SubscriptionPlan) => void
}

export class SubscriptionPlanManagerComponent {
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  static render({ subscriptionPlan, onPlanUpdate }: SubscriptionPlanManagerProps): JSX.Element {
    const [planName, setPlanName] = useState<string>(subscriptionPlan.name)
    const [yearlyPrice, setYearlyPrice] = useState<number>(subscriptionPlan.yearlyPrice)
    const [monthlyPrice, setMonthlyPrice] = useState<number>(subscriptionPlan.monthlyPrice)
    const [weeklyPrice, setWeeklyPrice] = useState<number>(subscriptionPlan.weeklyPrice)

    const handleUpdatePlan = (): void => {
      const updatedPlan: SubscriptionPlan = {
        name: planName,
        yearlyPrice,
        monthlyPrice,
        weeklyPrice,
      }
      onPlanUpdate(updatedPlan)
    }

    const calculateAnnualValues = () => {
      const monthlyAnnual = monthlyPrice * 12
      const weeklyAnnual = weeklyPrice * 52
      
      return {
        yearly: yearlyPrice,
        monthlyAnnual,
        weeklyAnnual,
        yearlyDiscount: monthlyAnnual > 0 ? ((monthlyAnnual - yearlyPrice) / monthlyAnnual * 100) : 0,
        weeklyPremium: weeklyAnnual > 0 ? ((weeklyAnnual - yearlyPrice) / yearlyPrice * 100) : 0,
      }
    }

    const annualValues = calculateAnnualValues()

    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-800 mb-6">
          Subscription Plan Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Plan Name
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="input-field"
                placeholder="Premium Plan"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Yearly Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-secondary-500">$</span>
                  <input
                    type="number"
                    value={yearlyPrice}
                    onChange={(e) => setYearlyPrice(Number(e.target.value) || 0)}
                    className="input-field pl-8"
                    placeholder="99.99"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Monthly Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-secondary-500">$</span>
                  <input
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(Number(e.target.value) || 0)}
                    className="input-field pl-8"
                    placeholder="9.99"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Weekly Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-secondary-500">$</span>
                  <input
                    type="number"
                    value={weeklyPrice}
                    onChange={(e) => setWeeklyPrice(Number(e.target.value) || 0)}
                    className="input-field pl-8"
                    placeholder="2.99"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpdatePlan}
                className="btn-primary"
              >
                Update Plan
              </button>
            </div>
          </div>

          <div className="bg-secondary-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">
              Annual Value Comparison
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-700">Yearly Plan:</span>
                <span className="font-semibold text-primary-600">
                  {SubscriptionPlanManagerComponent.formatCurrency(annualValues.yearly)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-700">Monthly Plan (×12):</span>
                <span className="font-semibold text-blue-600">
                  {SubscriptionPlanManagerComponent.formatCurrency(annualValues.monthlyAnnual)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary-700">Weekly Plan (×52):</span>
                <span className="font-semibold text-purple-600">
                  {SubscriptionPlanManagerComponent.formatCurrency(annualValues.weeklyAnnual)}
                </span>
              </div>
            </div>

            <div className="border-t border-secondary-200 mt-4 pt-4">
              <h4 className="font-medium text-secondary-800 mb-2">Pricing Insights</h4>
              
              {annualValues.yearlyDiscount > 0 && (
                <p className="text-sm text-green-600 mb-1">
                  ✅ Yearly plan offers {annualValues.yearlyDiscount.toFixed(1)}% discount
                </p>
              )}
              
              {annualValues.weeklyPremium > 0 && (
                <p className="text-sm text-orange-600 mb-1">
                  ⚠️ Weekly plan costs {annualValues.weeklyPremium.toFixed(1)}% more annually
                </p>
              )}

              {annualValues.yearlyDiscount <= 0 && annualValues.weeklyPremium <= 0 && (
                <p className="text-sm text-secondary-600">
                  Consider adjusting prices for better value perception
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function SubscriptionPlanManager(props: SubscriptionPlanManagerProps) {
  return SubscriptionPlanManagerComponent.render(props)
} 