/* eslint-disable react/prop-types */
const BookingSummary = ({ bookingDetails }) => {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold">Booking Summary</h2>
      <p>
        <strong>Facility:</strong> {bookingDetails.facilityName}
      </p>
      <p>
        <strong>Date:</strong> {bookingDetails.date}
      </p>
      <p>
        <strong>Start Time:</strong> {bookingDetails.startTime}
      </p>
      <p>
        <strong>End Time:</strong> {bookingDetails.endTime}
      </p>
      <p>
        <strong>Amount:</strong> ${bookingDetails.payableAmount}
      </p>
    </div>
  );
};

export default BookingSummary;
