import {
  FaUserPlus,
  FaSearch,
  FaCheckCircle,
  FaCreditCard,
  FaEnvelope,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-indigo-600 w-8 h-8" />,
    title: "Sign Up / Log In",
    description:
      "Create an account or log in to your existing account to get started with booking facilities.",
  },
  {
    icon: <FaSearch className="text-indigo-600 w-8 h-8" />,
    title: "Browse Facilities",
    description:
      "Explore our wide range of sports facilities to find the one that suits you best.",
  },
  {
    icon: <FaCheckCircle className="text-indigo-600 w-8 h-8" />,
    title: "Check Availability",
    description:
      "Select your preferred date and time to see if the facility is available for booking.",
  },
  {
    icon: <FaCreditCard className="text-indigo-600 w-8 h-8" />,
    title: "Make a Booking",
    description:
      "Choose your time slot and confirm your booking with a secure payment.",
  },
  {
    icon: <FaEnvelope className="text-indigo-600 w-8 h-8" />,
    title: "Receive Confirmation",
    description:
      "Get a confirmation email with all the details of your booking.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
