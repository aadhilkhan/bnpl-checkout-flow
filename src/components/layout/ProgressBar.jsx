import { ShoppingCart, ShieldCheck, CalendarDays, CreditCard, Check, ChevronRight } from 'lucide-react';

const steps = [
  { label: 'Cart', icon: ShoppingCart },
  { label: 'Verify', icon: ShieldCheck },
  { label: 'Plan', icon: CalendarDays },
  { label: 'Pay', icon: CreditCard },
];

export default function ProgressBar({ currentStep, onStepClick }) {
  return (
    <>
      {/* Desktop: inline pill navigation */}
      <nav className="hidden sm:flex items-center gap-0.5" aria-label="Checkout progress">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isClickable = isCompleted && onStepClick;
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick(stepNum)}
                disabled={!isClickable}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3A7DCF] text-white shadow-sm'
                    : isCompleted
                      ? 'text-[#3A7DCF] hover:bg-[#3A7DCF]/10 cursor-pointer'
                      : 'text-gray-400 cursor-default'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
                {step.label}
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className={`w-3.5 h-3.5 mx-0.5 ${
                  stepNum < currentStep ? 'text-[#3A7DCF]' : 'text-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile: full-width tab bar */}
      <nav className="sm:hidden flex w-full" aria-label="Checkout progress">
        {steps.map((step) => {
          const stepNum = steps.indexOf(step) + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isClickable = isCompleted && onStepClick;
          const Icon = step.icon;

          return (
            <button
              key={step.label}
              onClick={() => isClickable && onStepClick(stepNum)}
              disabled={!isClickable}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 relative transition-all duration-200 ${
                isActive
                  ? 'text-[#3A7DCF]'
                  : isCompleted
                    ? 'text-[#3A7DCF]/70'
                    : 'text-gray-400'
              } ${isClickable ? 'cursor-pointer active:bg-gray-50' : 'cursor-default'}`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" strokeWidth={2.5} />
              ) : (
                <Icon className="w-4 h-4" />
              )}
              <span className="text-[10px] font-semibold tracking-wide">{step.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#3A7DCF] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
