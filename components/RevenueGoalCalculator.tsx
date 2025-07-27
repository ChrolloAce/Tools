'use client'

import React, { useState } from 'react'
import { CalculatorManager, RevenueBreakdown, SubscriptionPlan } from '@/lib/CalculatorManager'

interface RevenueGoalCalculatorProps {
  subscriptionPlan: SubscriptionPlan
  calculatorManager: CalculatorManager
}

export class RevenueGoalCalculatorComponent {
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

  static render({ subscriptionPlan, calculatorManager }: RevenueGoalCalculatorProps): JSX.Element {
    const [revenueGoal, setRevenueGoal] = useState<number>(0)
    const [breakdown, setBreakdown] = useState<RevenueBreakdown | null>(null)
    const [optimization, setOptimization] = useState<any>(null)

    const handleCalculate = (): void => {
      const result = calculatorManager.calculateRevenueBreakdown(revenueGoal)
      const optimalMix = calculatorManager.getOptimalSubscriptionMix(revenueGoal)
      setBreakdown(result)
      setOptimization(optimalMix)
    }

    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-800 mb-6">
          Revenue Goal Calculator
        </h2>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Annual Revenue Goal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-secondary-500">$</span>
            <input
              type="number"
              value={revenueGoal}
              onChange={(e) => setRevenueGoal(Number(e.target.value) || 0)}
              className="input-field pl-8"
              placeholder="100000"
              min="0"
              step="1000"
            />
          </div>
          <p className="text-xs text-secondary-500 mt-1">
            Enter your target annual revenue
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleCalculate}
            className="btn-primary"
            disabled={revenueGoal <= 0}
          >
            Calculate Users Needed
          </button>
        </div>

        {breakdown && (
          <div className="space-y-6">
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">
                Users Needed by Subscription Type
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 border border-primary-100">
                  <h4 className="font-semibold text-green-700 mb-2">Yearly Subscriptions</h4>
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    {RevenueGoalCalculatorComponent.formatNumber(breakdown.yearly.usersNeeded)}
                    <span className="text-sm font-normal text-secondary-500 ml-1">users</span>
                  </p>
                  <p className="text-sm text-secondary-600">
                    Revenue: {RevenueGoalCalculatorComponent.formatCurrency(breakdown.yearly.totalRevenue)}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {RevenueGoalCalculatorComponent.formatCurrency(breakdown.yearly.revenuePerUser)} per user/year
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-primary-100">
                  <h4 className="font-semibold text-blue-700 mb-2">Monthly Subscriptions</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {RevenueGoalCalculatorComponent.formatNumber(breakdown.monthly.usersNeeded)}
                    <span className="text-sm font-normal text-secondary-500 ml-1">users</span>
                  </p>
                  <p className="text-sm text-secondary-600">
                    Revenue: {RevenueGoalCalculatorComponent.formatCurrency(breakdown.monthly.totalRevenue)}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {RevenueGoalCalculatorComponent.formatCurrency(breakdown.monthly.revenuePerUser)} per user/year
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-primary-100">
                  <h4 className="font-semibold text-purple-700 mb-2">Weekly Subscriptions</h4>
                  <p className="text-2xl font-bold text-purple-600 mb-1">
                    {RevenueGoalCalculatorComponent.formatNumber(breakdown.weekly.usersNeeded)}
                    <span className="text-sm font-normal text-secondary-500 ml-1">users</span>
                  </p>
                  <p className="text-sm text-secondary-600">
                    Revenue: {RevenueGoalCalculatorComponent.formatCurrency(breakdown.weekly.totalRevenue)}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {RevenueGoalCalculatorComponent.formatCurrency(breakdown.weekly.revenuePerUser)} per user/year
                  </p>
                </div>
              </div>
            </div>

            {optimization && (
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  💡 Optimization Recommendation
                </h3>
                <p className="text-yellow-700 mb-4">
                  {optimization.recommendation}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">
                      {RevenueGoalCalculatorComponent.formatCurrency(optimization.efficiency.yearly)}
                    </p>
                    <p className="text-sm text-secondary-600">Yearly Revenue/User</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {RevenueGoalCalculatorComponent.formatCurrency(optimization.efficiency.monthly)}
                    </p>
                    <p className="text-sm text-secondary-600">Monthly Revenue/User</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">
                      {RevenueGoalCalculatorComponent.formatCurrency(optimization.efficiency.weekly)}
                    </p>
                    <p className="text-sm text-secondary-600">Weekly Revenue/User</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default function RevenueGoalCalculator(props: RevenueGoalCalculatorProps) {
  return RevenueGoalCalculatorComponent.render(props)
} 