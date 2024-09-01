/* eslint-disable react/prop-types */
const PaymentButton = ({ amount, bookingId }) => {
  const handlePayment = () => {
    // Example API call to initiate payment
    window.location.href = `https://securepay.sslcommerz.com/gwprocess/v4/api.php?booking_id=${bookingId}&amount=${amount}`;
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
