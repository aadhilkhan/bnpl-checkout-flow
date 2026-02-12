import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { OTP_LENGTH, OTP_RESEND_SECONDS } from '../../data/mockData';
import { useCountdown } from '../../hooks/useCountdown';
import PageShell from '../layout/PageShell';
import OtpInput from './OtpInput';

export default function OtpPage() {
  const { state, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { seconds, isActive, restart } = useCountdown(OTP_RESEND_SECONDS);

  const maskedPhone = state.phoneNumber.replace(/(\d{2})\s(\d{2}).*(\d{4})/, '$1 $2 *** $3');

  const handleOtpChange = (value) => {
    setOtp(value);
    if (error) setError('');
  };

  const handleVerify = async () => {
    if (otp.length < OTP_LENGTH) return;

    setIsVerifying(true);

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Accept any OTP code
    setIsSuccess(true);
    setTimeout(() => {
      dispatch({ type: 'OTP_VERIFIED' });
      navigate('/plans');
    }, 600);
  };

  const handleResend = () => {
    setOtp('');
    setError('');
    restart();
  };

  return (
    <PageShell currentStep={2}>
      <div className="flex justify-center">
        <div className="w-full max-w-[420px]">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            {/* Logo */}
            <div className="w-14 h-14 bg-[#3A7DCF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">S</span>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-1">Verify your number</h1>
            <p className="text-sm text-gray-500 mb-1">
              We sent a code to <span className="font-medium text-gray-700">{maskedPhone}</span>
            </p>
            <Link to="/" className="text-xs text-[#3A7DCF] hover:text-[#2d6ab5] font-medium">
              Edit number
            </Link>

            {/* OTP Input */}
            <div className="mt-6 mb-6">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                hasError={!!error}
                disabled={isVerifying || isSuccess}
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
            )}

            {/* Success indicator */}
            {isSuccess && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-green-600 font-medium">Verified!</span>
              </div>
            )}

            {/* Verify button */}
            <button
              onClick={handleVerify}
              disabled={otp.length < OTP_LENGTH || isVerifying || isSuccess}
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 cursor-pointer"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify & Continue'
              )}
            </button>

            {/* Resend */}
            <div className="mt-4 text-sm text-gray-500">
              {isActive ? (
                <span>Resend code in <span className="font-medium text-gray-700">{seconds}s</span></span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-[#3A7DCF] hover:text-[#2d6ab5] font-medium cursor-pointer"
                >
                  Resend code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
