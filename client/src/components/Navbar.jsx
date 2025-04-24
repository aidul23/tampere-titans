import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import icons
import logo from "/assets/team_logo.png"; // Replace with actual logo

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-primary"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Team Logo */}
        <Link to="/">
          <img src={logo} alt="Tampere Titans" className="h-12 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/tournaments">Tournaments</NavLink>
          <NavLink to="/activities">Activity</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-primary text-white py-4 space-y-4"
        >
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/players" onClick={() => setIsOpen(false)}>Players</NavLink>
          <NavLink to="/matches" onClick={() => setIsOpen(false)}>Matches</NavLink>
        </motion.div>
      )}
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative text-light font-medium text-lg after:block after:h-0.5 after:bg-secondary after:w-0 after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </Link>
);

export default Navbar;
