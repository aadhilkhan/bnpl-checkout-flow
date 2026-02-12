export function formatCurrency(amount) {
  return `AED ${amount.toFixed(2)}`;
}

export function calculatePlanDetails(cartTotal, plan) {
  const feeAmount = cartTotal * (plan.feePercent / 100);
  const totalWithFees = cartTotal + feeAmount;
  const monthlyPayment = totalWithFees / plan.months;

  return {
    planId: plan.id,
    months: plan.months,
    feePercent: plan.feePercent,
    feeAmount,
    totalWithFees,
    monthlyPayment,
    badge: plan.badge,
  };
}

export function generatePaymentSchedule(planDetails) {
  const schedule = [];
  const today = new Date();

  for (let i = 0; i < planDetails.months; i++) {
    const date = new Date(today);
    date.setMonth(date.getMonth() + i);

    schedule.push({
      installment: i + 1,
      date: date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      amount: planDetails.monthlyPayment,
      isDueToday: i === 0,
    });
  }

  return schedule;
}

export function generateOrderId() {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `#ORD-2026-${rand}`;
}
