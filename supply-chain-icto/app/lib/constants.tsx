export const products = [
  {
    id: "demand-iq",
    name: "DemandIQ",
    tagline: "Anticipate market shifts with surgical precision.",
    cta: "Launch DemandIQ",
    href: "https://invisblecto-supply-chain.vercel.app/",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconBorder: "border-blue-200 dark:border-blue-800/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeCls: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
    ctaCls: "text-blue-600 dark:text-blue-400",
    orbCls: "bg-blue-400/10 dark:bg-blue-500/10",
    features: ["Predictive Analytics", "Market Trend Sensing", "Accurate Forecasting", "Real-time alerts"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    id: "sheet-sense",
    name: "SheetSense",
    tagline: "Transform raw data into strategic foresight.",
    cta: "Launch SheetSense",
    href: "https://invisiblecto-sheet-analyzer.vercel.app/",
    iconBg: "bg-transparent",
    iconBorder: "border-transparent",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeCls: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
    ctaCls: "text-blue-600 dark:text-blue-400",
    orbCls: "bg-blue-400/10 dark:bg-blue-500/10",
    features: ["Deep Data Extraction", "Instant Data Insights", "Automated Reports", "Deep Analytics and Visualizations",],
    icon: (
      <img src="/sheet.png" alt="SheetSense" className="w-full h-full object-cover rounded-xl" />
    ),
  },
  {
    id: "chain-os",
    name: "ChainOS",
    tagline: "Unified orchestration for supply chain operations.",
    cta: "Launch ChainOS",
    href: "https://remix-of-supply-vision-66c648f6.vercel.app/",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconBorder: "border-blue-200 dark:border-blue-800/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeCls: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
    ctaCls: "text-blue-600 dark:text-blue-400",
    orbCls: "bg-blue-400/10 dark:bg-blue-500/10",
    features: ["Real-Time Visibility", "End-to-End Tracking", "Inventory Optimization", "Logistics Control"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="6" height="10" rx="1" />
        <rect x="9" y="4" width="6" height="16" rx="1" />
        <rect x="16" y="9" width="6" height="8" rx="1" />
        <line x1="8" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
];