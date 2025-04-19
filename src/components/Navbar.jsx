import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building, Menu, X, LogIn ,ShieldUser} from "lucide-react";
import { auth } from "../firebase/firebase"; // Ensure correct path

const Navbar = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Building className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">WowInfra</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {["Home", "Services", "Projects", "About", "Comments","Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`hover:scale-105 transition ${
                  isScrolled ? "hover:text-black" : "hover:text-white"
                }`}
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Desktop Contact & Auth Buttons */}
        <div className="hidden md:flex gap-3">
        <a
            href="/admin"
            className="flex items-center gap-1 bg-blue-900 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-800"
          >
           <ShieldUser className="h-5"/> Admin
          </a>
          {user ? (
            <button
              onClick={() => {
                auth.signOut().then(() => {
                  console.log("User logged out successfully!");
                });
              }}
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-500"
            >
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Logout
              </Link>
            </button>
          ) : (
            <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-500">
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Right-Side Panel) */}
      <div
        className={`fixed inset-0  bg-opacity-50 backdrop-blur-md transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="w-2/3 h-full bg-white p-6 shadow-lg flex flex-col gap-6 ml-auto">
          {/* Close Button (Right-Aligned) */}
          <button
            className="self-end text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={28} />
          </button>

          {/* Mobile Links (Right-Aligned) */}
          <nav className="flex flex-col gap-4">
            {["Home", "Services", "Projects", "About", "Comments","contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Contact & Auth Buttons (Right-Aligned) */}
          <div className="flex flex-col gap-3 mt-auto">
           <a
            href="/admin"
            className="flex items-center gap-1 bg-blue-900 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-800"
          >
           <ShieldUser className="h-5"/> Admin
          </a>
            {user ? (
              <button
                onClick={() => {
                  auth.signOut().then(() => {
                    console.log("User logged out successfully!");
                  });
                  setIsMenuOpen(false);
                }}
                className="bg-red-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-red-500"
              >
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  Logout
                </Link>
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-500"
              >
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
