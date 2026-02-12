export const cartItems = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Wireless noise-cancelling over-ear headphones',
    price: 349.99,
    quantity: 1,
    image: '🎧',
  },
  {
    id: 2,
    name: 'Apple AirPods Pro (2nd Gen)',
    description: 'Active noise cancellation with adaptive audio',
    price: 249.99,
    quantity: 1,
    image: '🎵',
  },
  {
    id: 3,
    name: 'Anker 65W USB-C Charger',
    description: 'GaN fast charger with 3 ports',
    price: 90.99,
    quantity: 1,
    image: '🔌',
  },
];

export const installmentPlans = [
  { id: 4, months: 4, feePercent: 0, badge: 'Interest-free' },
  { id: 6, months: 6, feePercent: 2.5, badge: null },
  { id: 8, months: 8, feePercent: 4.0, badge: null },
  { id: 12, months: 12, feePercent: 6.0, badge: 'Lowest monthly' },
];

export const savedCards = [
  {
    id: 'card-1',
    brand: 'visa',
    last4: '4242',
    expiry: '12/27',
    holderName: 'Ahmed Al Maktoum',
    isDefault: true,
  },
  {
    id: 'card-2',
    brand: 'mastercard',
    last4: '8888',
    expiry: '08/26',
    holderName: 'Ahmed Al Maktoum',
    isDefault: false,
  },
];

export const CORRECT_OTP = '8888';
export const OTP_LENGTH = 4;
export const OTP_RESEND_SECONDS = 30;
export const DEFAULT_PHONE = '+971 50 123 4567';
export const MERCHANT_NAME = 'TechStore';
