import {
  FaCheckCircle,
  FaClock,
  FaUserShield,
  FaMoneyBillWave,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Effortlessly book your favorite facilities with just a few clicks.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaClock className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-600">
              Book at any time, our platform is available around the clock.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaUserShield className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-600">
              Your payments are safe with our secure transaction process.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaMoneyBillWave className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affordable Rates</h3>
            <p className="text-gray-600">
              We offer the best prices for the best facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
