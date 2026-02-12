import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function PageShell({ children, currentStep, showProgress = true }) {
  const [showExitModal, setShowExitModal] = useState(false);
  const navigate = useNavigate();

  const handleExitCheckout = () => {
    setShowExitModal(false);
    navigate('/');
  };

  const handleStepClick = (stepNum) => {
    const routes = {
      1: '/',
      2: '/verify',
      3: '/plans',
      4: '/payment'
    };
    navigate(routes[stepNum]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Single row: Pay with Tabby + Progress bar + Close button */}
          <div className="flex items-center justify-between gap-4">
            {/* Tabby logo */}
            <div className="shrink-0">
              <img src="/tabby-logo.png" alt="Pay with Tabby" className="h-8" />
            </div>

            {/* Progress bar — centered */}
            {showProgress && (
              <div className="hidden sm:flex flex-1 justify-center">
                <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setShowExitModal(true)}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close checkout"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar — mobile on its own row */}
          {showProgress && (
            <div className="sm:hidden mt-3 w-screen -ml-[50vw] left-1/2 relative px-4">
              <ProgressBar currentStep={currentStep} />
            </div>
          )}
        </div>
      </header>

      {/* Exit confirmation modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Exit checkout?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to exit? Your progress will not be saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExitCheckout}
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-3 text-center text-xs text-gray-400">
          Protected by 256-bit SSL encryption &middot; Tabby &copy; 2026
        </div>
      </footer>
    </div>
  );
}
