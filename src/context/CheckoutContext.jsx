import { createContext, useContext, useReducer } from 'react';
import { cartItems, DEFAULT_PHONE } from '../data/mockData';

const CheckoutContext = createContext(null);

const initialState = {
  currentStep: 1,
  cartItems: cartItems,
  cartTotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  phoneNumber: DEFAULT_PHONE,
  isAuthenticated: false,
  selectedPlan: null,
  planDetails: null,
  selectedCardId: 'card-1',
  newCardData: null,
  orderConfirmation: null,
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case 'INIT_CART':
      return { ...state, currentStep: 1 };
    case 'OTP_VERIFIED':
      return { ...state, currentStep: 3, isAuthenticated: true };
    case 'SELECT_PLAN':
      return {
        ...state,
        selectedPlan: action.payload.planId,
        planDetails: action.payload.planDetails,
      };
    case 'SELECT_CARD':
      return {
        ...state,
        selectedCardId: action.payload,
        newCardData: null,
      };
    case 'SET_NEW_CARD':
      return {
        ...state,
        selectedCardId: null,
        newCardData: action.payload,
      };
    case 'PAYMENT_CONFIRMED':
      return {
        ...state,
        currentStep: 5,
        orderConfirmation: action.payload,
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}
