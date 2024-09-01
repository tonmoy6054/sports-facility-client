import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import MapIntegration from "./MapIntegration";

const ContactUs = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
      <ContactForm />
      <MapIntegration />
      <ContactDetails />
    </div>
  );
};

export default ContactUs;
