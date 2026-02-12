import ProgressBar from './ProgressBar';

export default function PageShell({ children, currentStep, showProgress = true }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - single row */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#3A7DCF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-gray-900">SplitPay</span>
          </div>
          {showProgress && (
            <div className="flex-1 flex justify-center">
              <ProgressBar currentStep={currentStep} />
            </div>
          )}
          <div className="text-xs text-gray-400 shrink-0">Secure Checkout</div>
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
