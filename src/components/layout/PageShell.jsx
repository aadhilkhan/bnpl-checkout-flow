import ProgressBar from './ProgressBar';

export default function PageShell({ children, currentStep, showProgress = true }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Top row: logo + secure checkout */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[#3A7DCF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-gray-900">SplitPay</span>
            </div>

            {/* Progress bar — desktop inline */}
            {showProgress && (
              <div className="hidden sm:flex flex-1 justify-center mx-4">
                <ProgressBar currentStep={currentStep} />
              </div>
            )}

            <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>

          {/* Progress bar — mobile on its own row */}
          {showProgress && (
            <div className="sm:hidden mt-3 flex justify-center">
              <ProgressBar currentStep={currentStep} />
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-3 text-center text-xs text-gray-400">
          Protected by 256-bit SSL encryption &middot; SplitPay &copy; 2026
        </div>
      </footer>
    </div>
  );
}
