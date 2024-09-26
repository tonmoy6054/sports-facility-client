import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center relative">
      <div className="text-2xl font-bold">ReserveArena</div>

      <nav className="hidden md:flex space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/sign" className="hover:underline">
          Login
        </a>
        <a href="/facilities" className="hover:underline">
          Facilities
        </a>
        <a href="/dashboard" className="hover:underline">
          Dashboard
        </a>
      </nav>

      <div className="md:hidden">
        <button
          type="button"
          className="focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-blue-500 flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/sign" className="hover:underline">
            Login
          </a>
          <a href="/facilities" className="hover:underline">
            Facilities
          </a>
          <a href="/dashboard" className="hover:underline">
            Dashboard
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
