const HeroSection = () => {
  return (
    <section className="relative bg-blue-600 text-white h-screen flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQv5Tl4lD4A13cnkzjxQ4T5eZzZDr6AbzojA&s"
          alt="Hero Background"
          className="object-cover w-full h-full absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Welcome to ReserveArena
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 max-w-2xl mx-auto">
          Your go-to platform for booking top-notch sports facilities. Discover,
          book, and enjoy your favorite spots with ease.
        </p>
        <a
          href="/book-now"
          className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 text-black font-bold text-base sm:text-lg rounded-full hover:bg-yellow-400 transition duration-300"
        >
          Book Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
