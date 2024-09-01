const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      <div>
        {/* Additional user info or logout button can go here */}
        <button className="text-blue-600 hover:underline">Logout</button>
      </div>
    </header>
  );
};

export default Header;
