'use client'

import React, { useState } from 'react'
import { CalculatorManager, PayoutCalculation, SubscriptionPlan } from '@/lib/CalculatorManager'

interface PayoutCalculatorProps {
  subscriptionPlan: SubscriptionPlan
  calculatorManager: CalculatorManager
}

export class PayoutCalculatorComponent {
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  private static formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num)
  }

  static render({ subscriptionPlan, calculatorManager }: PayoutCalculatorProps): JSX.Element {
    const [yearlyUsers, setYearlyUsers] = useState<number>(0)
    const [monthlyUsers, setMonthlyUsers] = useState<number>(0)
    const [weeklyUsers, setWeeklyUsers] = useState<number>(0)
    const [calculation, setCalculation] = useState<PayoutCalculation | null>(null)

    const handleCalculate = (): void => {
      const result = calculatorManager.calculatePayoutBreakdown(
        yearlyUsers,
        monthlyUsers,
        weeklyUsers
      )
      setCalculation(result)
    }

    const totalAnnualRevenue = calculatorManager.calculateAnnualRevenue(
      yearlyUsers,
      monthlyUsers,
      weeklyUsers
    )

    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-800 mb-6">
          User Payout Calculator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Yearly Subscribers
            </label>
            <input
              type="number"
              value={yearlyUsers}
              onChange={(e) => setYearlyUsers(Number(e.target.value) || 0)}
              className="input-field"
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-secondary-500 mt-1">
              {PayoutCalculatorComponent.formatCurrency(subscriptionPlan.yearlyPrice)} per user/year
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Monthly Subscribers
            </label>
            <input
              type="number"
              value={monthlyUsers}
              onChange={(e) => setMonthlyUsers(Number(e.target.value) || 0)}
              className="input-field"
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-secondary-500 mt-1">
              {PayoutCalculatorComponent.formatCurrency(subscriptionPlan.monthlyPrice)} per user/month
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Weekly Subscribers
            </label>
            <input
              type="number"
              value={weeklyUsers}
              onChange={(e) => setWeeklyUsers(Number(e.target.value) || 0)}
              className="input-field"
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-secondary-500 mt-1">
              {PayoutCalculatorComponent.formatCurrency(subscriptionPlan.weeklyPrice)} per user/week
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleCalculate}
            className="btn-primary"
          >
            Calculate Payouts
          </button>
        </div>

        {calculation && (
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-lg font-semibold text-primary-800 mb-4">
              Payout Breakdown
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">
                  {PayoutCalculatorComponent.formatNumber(calculation.totalUsers)}
                </p>
                <p className="text-sm text-secondary-600">Total Users</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {PayoutCalculatorComponent.formatCurrency(calculation.yearlyPayout)}
                </p>
                <p className="text-sm text-secondary-600">Yearly Payouts</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {PayoutCalculatorComponent.formatCurrency(calculation.monthlyPayout)}
                </p>
                <p className="text-sm text-secondary-600">Monthly Payouts</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {PayoutCalculatorComponent.formatCurrency(calculation.weeklyPayout)}
                </p>
                <p className="text-sm text-secondary-600">Weekly Payouts</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-primary-100">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-secondary-700">
                  Total Annual Revenue:
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  {PayoutCalculatorComponent.formatCurrency(totalAnnualRevenue)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default function PayoutCalculator(props: PayoutCalculatorProps) {
  return PayoutCalculatorComponent.render(props)
} 