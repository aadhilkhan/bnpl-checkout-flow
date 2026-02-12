import { useState } from 'react';

const initialForm = { number: '', expiry: '', cvv: '', name: '' };

export default function AddCardForm({ onCardData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleChange = (field, value) => {
    let formatted = value;
    if (field === 'number') formatted = formatCardNumber(value);
    if (field === 'expiry') formatted = formatExpiry(value);
    if (field === 'cvv') formatted = value.replace(/\D/g, '').slice(0, 3);

    setForm((prev) => ({ ...prev, [field]: formatted }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateField = (field) => {
    const val = form[field];
    let error = '';

    switch (field) {
      case 'number':
        if (val.replace(/\s/g, '').length < 16) error = 'Enter a valid 16-digit card number';
        break;
      case 'expiry':
        if (!/^\d{2}\/\d{2}$/.test(val)) error = 'Use MM/YY format';
        break;
      case 'cvv':
        if (val.length < 3) error = 'Enter 3-digit CVV';
        break;
      case 'name':
        if (val.trim().length < 2) error = 'Enter cardholder name';
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleSubmit = () => {
    const fields = ['number', 'expiry', 'cvv', 'name'];
    const valid = fields.map(validateField).every(Boolean);
    if (valid) {
      onCardData(form);
    }
  };

  const inputClass = (field) =>
    `w-full h-11 rounded-lg border px-3 text-sm outline-none transition-all duration-200 ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-300 focus:border-[#3A7DCF] focus:ring-2 focus:ring-[#3A7DCF]/15'
    }`;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-[#3A7DCF] hover:text-[#2d6ab5] cursor-pointer"
      >
        <span className="w-5 h-5 rounded-full border-2 border-[#3A7DCF] flex items-center justify-center text-xs">
          {isOpen ? '−' : '+'}
        </span>
        Add a new card
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
          {/* Card number */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={form.number}
              onChange={(e) => handleChange('number', e.target.value)}
              onBlur={() => validateField('number')}
              className={inputClass('number')}
            />
            {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={(e) => handleChange('expiry', e.target.value)}
                onBlur={() => validateField('expiry')}
                className={inputClass('expiry')}
              />
              {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
              <input
                type="password"
                placeholder="•••"
                value={form.cvv}
                onChange={(e) => handleChange('cvv', e.target.value)}
                onBlur={() => validateField('cvv')}
                className={inputClass('cvv')}
              />
              {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
            </div>
          </div>

          {/* Cardholder name */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Cardholder Name</label>
            <input
              type="text"
              placeholder="Ahmed Al Maktoum"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => validateField('name')}
              className={inputClass('name')}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-gray-900 border-2 border-gray-900 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Use this card
          </button>
        </div>
      )}
    </div>
  );
}
