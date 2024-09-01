import { useState } from "react";

const testimonials = [
  {
    name: "Luckas Zarayara",
    feedback:
      "Great facilities! Booking was seamless and the staff was friendly.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzR2xqOgvJVAbIZCgDf6CyoXrdCLyOxzkrCA&s",
  },
  {
    name: "Hawlad Pakels",
    feedback:
      "Loved the experience. The facility was clean and well-maintained.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZXV8Rt5eypm6J7mPHDlDRAogdoP_L7VZsw&s",
  },
  {
    name: "Michael Johnson",
    feedback: "Booking was easy and quick. Will definitely use it again!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTdowyX_ZaJC40rtpJx0EdEMuygHU4DzV0Q&s",
  },
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Customer Testimonials
      </h2>
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center">
          <img
            src={testimonials[current].image}
            alt={testimonials[current].name}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-semibold">{testimonials[current].name}</p>
          <p className="text-gray-700 mt-4">{testimonials[current].feedback}</p>
        </div>

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          onClick={handlePrev}
        >
          &lt;
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
