import { Routes, Route } from 'react-router-dom';
import CartPage from './components/cart/CartPage';
import OtpPage from './components/otp/OtpPage';
import PlanSelectionPage from './components/plans/PlanSelectionPage';
import PaymentPage from './components/payment/PaymentPage';
import SuccessPage from './components/success/SuccessPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CartPage />} />
      <Route path="/verify" element={<OtpPage />} />
      <Route path="/plans" element={<PlanSelectionPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}
