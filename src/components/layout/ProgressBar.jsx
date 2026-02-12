const steps = ['Cart', 'Verify', 'Plan', 'Pay'];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="flex items-center justify-between sm:justify-center gap-0.5 sm:gap-1">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 sm:flex-none gap-0.5 sm:gap-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#3A7DCF] text-white'
                    : isActive
                      ? 'bg-[#3A7DCF] text-white ring-4 ring-[#3A7DCF]/15'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span className={`text-[11px] mt-0.5 font-medium ${isActive ? 'text-[#3A7DCF]' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 sm:flex-none sm:w-6 h-0.5 mb-3 transition-colors duration-300 ${
                  stepNum < currentStep ? 'bg-[#3A7DCF]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
