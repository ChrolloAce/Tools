export interface SubscriptionPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  weeklyPrice: number;
}

export interface RevenueBreakdown {
  yearly: {
    usersNeeded: number;
    totalRevenue: number;
    revenuePerUser: number;
  };
  monthly: {
    usersNeeded: number;
    totalRevenue: number;
    revenuePerUser: number;
  };
  weekly: {
    usersNeeded: number;
    totalRevenue: number;
    revenuePerUser: number;
  };
}

export interface PayoutCalculation {
  totalUsers: number;
  yearlyPayout: number;
  monthlyPayout: number;
  weeklyPayout: number;
  yearlyUsers: number;
  monthlyUsers: number;
  weeklyUsers: number;
}

export class CalculatorManager {
  private subscriptionPlan: SubscriptionPlan;

  constructor(subscriptionPlan: SubscriptionPlan) {
    this.subscriptionPlan = subscriptionPlan;
  }

  public updateSubscriptionPlan(plan: SubscriptionPlan): void {
    this.subscriptionPlan = plan;
  }

  public calculateRevenueBreakdown(revenueGoal: number): RevenueBreakdown {
    const yearlyUsersNeeded = Math.ceil(revenueGoal / this.subscriptionPlan.yearlyPrice);
    const monthlyUsersNeeded = Math.ceil(revenueGoal / (this.subscriptionPlan.monthlyPrice * 12));
    const weeklyUsersNeeded = Math.ceil(revenueGoal / (this.subscriptionPlan.weeklyPrice * 52));

    return {
      yearly: {
        usersNeeded: yearlyUsersNeeded,
        totalRevenue: yearlyUsersNeeded * this.subscriptionPlan.yearlyPrice,
        revenuePerUser: this.subscriptionPlan.yearlyPrice,
      },
      monthly: {
        usersNeeded: monthlyUsersNeeded,
        totalRevenue: monthlyUsersNeeded * this.subscriptionPlan.monthlyPrice * 12,
        revenuePerUser: this.subscriptionPlan.monthlyPrice * 12,
      },
      weekly: {
        usersNeeded: weeklyUsersNeeded,
        totalRevenue: weeklyUsersNeeded * this.subscriptionPlan.weeklyPrice * 52,
        revenuePerUser: this.subscriptionPlan.weeklyPrice * 52,
      },
    };
  }

  public calculatePayoutBreakdown(
    yearlyUsers: number,
    monthlyUsers: number,
    weeklyUsers: number
  ): PayoutCalculation {
    const yearlyPayout = yearlyUsers * this.subscriptionPlan.yearlyPrice;
    const monthlyPayout = monthlyUsers * this.subscriptionPlan.monthlyPrice;
    const weeklyPayout = weeklyUsers * this.subscriptionPlan.weeklyPrice;
    const totalUsers = yearlyUsers + monthlyUsers + weeklyUsers;

    return {
      totalUsers,
      yearlyPayout,
      monthlyPayout,
      weeklyPayout,
      yearlyUsers,
      monthlyUsers,
      weeklyUsers,
    };
  }

  public calculateAnnualRevenue(
    yearlyUsers: number,
    monthlyUsers: number,
    weeklyUsers: number
  ): number {
    const yearlyRevenue = yearlyUsers * this.subscriptionPlan.yearlyPrice;
    const monthlyRevenue = monthlyUsers * this.subscriptionPlan.monthlyPrice * 12;
    const weeklyRevenue = weeklyUsers * this.subscriptionPlan.weeklyPrice * 52;
    
    return yearlyRevenue + monthlyRevenue + weeklyRevenue;
  }

  public getOptimalSubscriptionMix(revenueGoal: number): {
    recommendation: string;
    breakdown: RevenueBreakdown;
    efficiency: { yearly: number; monthly: number; weekly: number };
  } {
    const breakdown = this.calculateRevenueBreakdown(revenueGoal);
    
    const yearlyEfficiency = this.subscriptionPlan.yearlyPrice;
    const monthlyEfficiency = this.subscriptionPlan.monthlyPrice * 12;
    const weeklyEfficiency = this.subscriptionPlan.weeklyPrice * 52;

    let recommendation = '';
    if (yearlyEfficiency >= monthlyEfficiency && yearlyEfficiency >= weeklyEfficiency) {
      recommendation = 'Focus on yearly subscriptions for maximum revenue per user';
    } else if (monthlyEfficiency >= weeklyEfficiency) {
      recommendation = 'Focus on monthly subscriptions for balanced growth';
    } else {
      recommendation = 'Focus on weekly subscriptions for quick user acquisition';
    }

    return {
      recommendation,
      breakdown,
      efficiency: {
        yearly: yearlyEfficiency,
        monthly: monthlyEfficiency,
        weekly: weeklyEfficiency,
      },
    };
  }
} 