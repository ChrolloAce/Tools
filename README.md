# Professional Revenue Calculator

A modern, professional Next.js application for calculating user payouts and determining revenue goals with comprehensive subscription breakdowns.

## Features

### 💰 Payout Calculator
- Calculate payouts based on user counts across different subscription types
- Real-time annual revenue calculation
- Support for yearly, monthly, and weekly subscriptions
- Professional UI with color-coded metrics

### 🎯 Revenue Goal Calculator
- Input target annual revenue and get user requirements
- Intelligent optimization recommendations
- Compare efficiency across subscription types
- Visual breakdown of revenue per user

### ⚙️ Plan Settings Manager
- Configure subscription pricing for all tiers
- Real-time annual value comparison
- Pricing insights and recommendations
- Discount and premium calculations

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom blue theme
- **Architecture**: Object-oriented with single responsibility principle
- **State Management**: React hooks with class-based business logic

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd revenue-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
revenue-calculator/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main page component
├── components/                   # React components
│   ├── PayoutCalculator.tsx     # User payout calculations
│   ├── RevenueGoalCalculator.tsx # Revenue goal planning
│   └── SubscriptionPlanManager.tsx # Plan configuration
├── lib/                         # Business logic
│   └── CalculatorManager.ts     # Core calculation engine
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## Architecture Principles

This project follows strict coding standards:

- **File Size**: Max 500 lines per file (400 line warning)
- **OOP First**: Every functionality in dedicated classes
- **Single Responsibility**: Each component has one clear purpose
- **Modular Design**: Lego-block approach for reusability
- **Manager Pattern**: Clear separation of UI and business logic

## Usage Examples

### Basic Payout Calculation
1. Navigate to "Payout Calculator" tab
2. Enter user counts for each subscription type
3. Click "Calculate Payouts" to see breakdown
4. View total annual revenue at bottom

### Revenue Goal Planning
1. Switch to "Revenue Goals" tab
2. Enter your target annual revenue goal
3. Get user requirements for each subscription type
4. Review optimization recommendations

### Plan Configuration
1. Go to "Plan Settings" tab
2. Adjust pricing for yearly/monthly/weekly plans
3. Review annual value comparison
4. Get pricing insights and recommendations

## Color Scheme

The application uses a professional blue theme:
- **Primary**: Blue shades (#3b82f6 to #1e3a8a)
- **Secondary**: Slate grays (#f8fafc to #0f172a)
- **Accents**: Green (success), Purple (weekly), Yellow (warnings)

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Professional desktop experience

## Contributing

1. Follow the established coding standards
2. Keep files under 500 lines
3. Use object-oriented patterns
4. Maintain single responsibility principle
5. Add TypeScript types for all interfaces

## License

This project is licensed under the MIT License.

## Support

For questions or support, please create an issue in the repository. 