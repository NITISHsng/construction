import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building, Menu, X, LogIn } from "lucide-react";
import { auth } from "../firebase/firebase"; // Adjust path as needed
import gsap from "gsap";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const ulRef = useRef(null);
  const modelOption = useRef(null);
  const location = useLocation();

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation on mount
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(navRef.current, {
      y: 60,
      opacity: 1,
      duration: 0.2,
      ease: "elastic.out(1,0.1)",
    });

    tl.to(ulRef.current.querySelectorAll("li"), {
      y: 50,
      opacity: 1,
      stagger: 0.1,
      duration: 0.2,
      ease: "elastic.out(1,0.1)",
    });
  }, []);

  // Mobile menu GSAP timeline
  const modelTl = useRef(null);

  useEffect(() => {
    modelTl.current = gsap.timeline({ paused: true });

    modelTl.current.to(modelOption.current, {
      x: "-100%",
      opacity: 1,
      duration: 0.4,
    });
    modelTl.current.to(modelOption.current.querySelectorAll("#options"), {
      x: "-100%",
      opacity: 1,
      duration: 0.1,
    });
    modelTl.current.to(modelOption.current.querySelectorAll("#options li"), {
      x: "-100%",
      opacity: 1,
      duration: 0.1,
      stagger: 0.1,
      ease: "expoScale(0.5,7,none)",
    });
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      modelTl.current && modelTl.current.reverse();
    }
  }, [location]);

  const handlePlay = () => {
    modelTl.current && modelTl.current.play();
  };

  const handleReverse = () => {
    modelTl.current && modelTl.current.reverse();
    setIsOpen(false);
  };

  const navLinks = [
    "Home",
    "Services",
    "Projects",
    "About",
    "Testimonials",
    "Contact",
  ];

  const buttonStyles =
    "text-white font-semibold py-2 px-4 rounded-md shadow-md";

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 top-[-60px] w-full px-4 sm:px-8 lg:px-[3%] transition-all duration-300 flex justify-between items-center z-50 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      {/* Logo */}
      <div>
        <a href="#" className="flex items-center gap-2">
          <Building className="text-primary" size={40} />
          <span className="text-3xl font-bold text-primary">
            Singha<span className="text-blue-900">infra</span>
          </span>
        </a>
      </div>

      {/* Desktop Menu */}
      <ul ref={ulRef} className="hidden lg:flex gap-6 font-semibold text-2xl">
        {navLinks.map((item) => (
          <li
            key={item}
            className="relative group px-3 py-1 opacity-0 rounded-md transition-transform duration-300 hover:scale-105"
          >
            <a
              href={`#${item.toLowerCase()}`}
              className="text-black no-underline transition-colors duration-300 relative top-[-50px]"
            >
              {item}
            </a>
            <span className="absolute left-0 bottom-[50px] w-0 h-[2px] bg-[#081104] transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Desktop Login/Logout */}
      <div className="gap-3 hidden lg:flex">
        {user ? (
          <Link to="/login">
            <button
              onClick={() => {
                auth
                  .signOut()
                  .then(() => console.log("User logged out successfully!"));
              }}
              className={`${buttonStyles} bg-red-600 hover:bg-red-500`}
            >
              <div className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Logout
              </div>
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className={`${buttonStyles} bg-green-600 hover:bg-green-500`}>
              <div className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </div>
            </button>
          </Link>
        )}
      </div>

      {/* Hamburger Icon */}
      <div
        className={`flex lg:hidden text-3xl cursor-pointer ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        <button
          className="text-foreground"
          onClick={() => {
            setIsOpen(!isOpen);
            handlePlay();
          }}
        >
          <Menu size={38} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        onClick={handleReverse}
        ref={modelOption}
        className="lg:hidden fixed top-0 left-[100%] h-screen w-screen bg-black/40 backdrop-blur-md z-40 flex"
      >
        <div
          id="options"
          className="absolute top-0 left-[100%] h-full w-2/3 bg-white px-6 py-6 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out transform"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <button
              className="absolute top-5 right-6 text-black"
              onClick={handleReverse}
            >
              <X size={38} />
            </button>

            <ul className="mt-16 flex flex-col gap-6 font-semibold text-black text-2xl">
              {navLinks.map((item) => (
                <li
                  onClick={handleReverse}
                  key={item}
                  className="relative top-0 left-[100%] p-3 opacity-0 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block no-underline transition-colors duration-200 hover:scale-105"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="gap-3 flex">
            {user ? (
              <Link to="/login" className="w-full">
                <button
                  onClick={() => {
                    auth
                      .signOut()
                      .then(() => console.log("User logged out successfully!"));
                  }}
                  className={`${buttonStyles} bg-red-600 hover:bg-red-500 w-full`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Logout
                  </div>
                </button>
              </Link>
            ) : (
              <Link to="/login" className="w-full">
                <button
                  className={`${buttonStyles} bg-green-600 hover:bg-green-500 w-full`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Login
                  </div>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
