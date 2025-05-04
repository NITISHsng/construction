import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building, Menu, X, LogIn, ShieldUser } from "lucide-react";
import { auth } from "../firebase/firebase"; // Ensure correct path

const Navbar = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1200);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

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
      <div className="container-custom flex items-center justify-between px-4 md:px-8 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Building className="text-primary" size={40}/>
          <span className=" lg:text-4xl md:text-5xl sm:text-3xl font-bold text-primary">Singha<span className="text-blue-900">infra</span></span>
        </a>

        {/* Navigation & Buttons */}
        {isDesktop ? (
          <div className="flex items-center gap-8 w-[100%]">
            <nav className="flex items-center gap-6 justify-center font-semibold text-2xl w-[100%]">
              {["Home", "Services", "Projects", "About", "Comments", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`hover:scale-105 transition ${
                    isScrolled ? "hover:text-black" : "hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex gap-3">
     
              {user ? (
                <button
                  onClick={() => {
                    auth.signOut().then(() => console.log("User logged out successfully!"));
                  }}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-500"
                >
                  <Link to="/login" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Logout
                  </Link>
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-500">
                    <div className="flex items-center gap-1">
                      <LogIn className="h-4 w-4" />
                      Login
                    </div>
                  </button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          // Mobile Menu Toggle
          <button
            className="text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={38} /> : <Menu size={38} />}
          </button>
        )}
      </div>

      {/* Mobile Sidebar */}
      {!isDesktop && (
        <div
          className={`fixed inset-0  bg-opacity-50 backdrop-blur-md transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } `}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 h-full w-2/3 sm:w-2/5 bg-white shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={38} className="text-gray-600" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col gap-5 mt-6">
                {["Home", "Services", "Projects", "About", "Comments", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className=" text-4xl p-2 bg-gray-100 rounded-2xl px-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-auto flex flex-col gap-3">

                {user ? (
                  <button
                    onClick={() => {
                      auth.signOut().then(() => console.log("User logged out successfully!"));
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
                  <Link to="/login">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-500"
                    >
                      <div className="flex items-center gap-1">
                        <LogIn className="h-4 w-4" />
                        Login
                      </div>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
