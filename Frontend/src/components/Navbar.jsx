import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">SmartFarm</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/fields" className="hover:underline">Fields</Link>
        <Link to="/crops" className="hover:underline">Crops</Link>
        <Link to="/tasks" className="hover:underline">Tasks</Link>
      </div>
    </nav>
  );
};

export default Navbar;
