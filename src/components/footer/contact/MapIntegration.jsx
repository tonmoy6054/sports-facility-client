const MapIntegration = () => {
  return (
    <div className="max-w-lg mx-auto mb-10">
      <h2 className="text-2xl font-bold text-center mb-4">Our Location</h2>
      <div className="w-full h-64">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091447!2d144.95373531531583!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f2b6f6b9%3A0x50b43a6f4d6b17a8!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1614074295024!5m2!1sen!2sus"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>
  );
};

export default MapIntegration;
