import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

export default function Pricing() {
  const { user } = useAuth();

  const plans = [
    {
      name: "Basic",
      price: "$0",
      description: "Great for students and personal use",
      features: [
        "1 Profile Template",
        "Basic Customization",
        "5 Project Showcases",
        "Basic Analytics"
      ],
      cta: user ? "Your Current Plan" : "Get Started"
    },
    {
      name: "Advanced",
      price: "$19.99",
      description: "Ideal for professionals and freelancers",
      features: [
        "All Templates",
        "Advanced Customization",
        "Unlimited Projects",
        "Enhanced Analytics",
        "Custom Domain"
      ],
      popular: true,
      cta: "Upgrade Now"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Simple Pricing
          </h1>
          <p className="text-xl text-text/80 dark:text-text-dark/80 max-w-3xl mx-auto">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl shadow-md border ${
                plan.popular
                  ? 'border-accent ring-2 ring-accent/30'
                  : 'border-accent/20'
              } bg-white dark:bg-base-dark overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Great deal!
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-accent mb-4">
                  {plan.price}
                </div>
                <p className="text-accent/80 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-accent">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.cta === "Upgrade Now" ? "/upgrade" : user ? "/dashboard" : "/signup"}
                  className={`block w-full py-3 px-4 rounded-md text-center font-medium transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                      : 'border border-accent text-accent hover:bg-accent/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-base-dark p-6 rounded-xl shadow-md border border-accent/20 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-accent mb-2">
              Need something custom?
            </h3>
            <p className="text-text/80 dark:text-text-dark/80 mb-4">
              We offer enterprise solutions and custom development for large teams.
            </p>
            <Link
              to="/inquiry"
              className="inline-block px-6 py-2 rounded-md border border-accent text-accent font-medium hover:bg-accent/10 transition"
            >
              Contact Our Sales Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
