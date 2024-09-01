import Facilities from "./components/Facilities";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ScrollToTopButton from "./components/ScrollToTopButton";
import TestimonialsSlider from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Facilities />
      <HowItWorks />
      <TestimonialsSlider />
      <WhyChooseUs />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
