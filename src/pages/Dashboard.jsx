import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import About from "../components/About";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // console.log(currentUser.displayName);
      } else {
        console.log("No user logged in. Redirecting...");
        // Optionally redirect:
        // navigate("/login");
      }
      setLoading(false); // Done loading
    });

    return () => unsubscribe();
  }, [navigate]);
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-white relative overflow-hidden">
        <style>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0.3; }
          50% { top: 90%; opacity: 0.6; }
          100% { top: 0%; opacity: 0.3; }
        }
        .animate-scan-line {
          animation: scanLine 0.8s infinite linear;
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: #22c55e; 
        }
      `}</style>

        <div className="relative w-32 h-32 mb-6 border border-gray-300 rounded-md overflow-hidden">
          <img
            src="singhainfra-logo.png"
            alt="logo"
            className="w-full h-full object-contain p-2"
          />
          <div className="animate-scan-line"></div>
        </div>

        <div className="text-center text-gray-700 font-medium space-y-1 mt-2">
          <h2 className="text-xl font-bold whitespace-nowrap">
            Building Excellence, Crafting Futures
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Home SinghInfra | Trusted Construction Company in Siliguri & Islampur
        </title>
        <meta
          name="description"
          content="Based in Fulbari, Siliguri, SinghInfra delivers reliable construction services across West Bengal, focusing on durable and innovative infrastructure solutions."
        />
        <meta name="author" content="SinghaInfra" />
        <meta
          name="keywords"
          content="SinghInfra, construction company, infrastructure, islampur construction company ,siliguri construction company ,Siliguri, Islampur, residential construction, commercial construction, infrastructure projects, building services"
        />
        <meta name="author" content="SinghInfra" />
        <meta property="og:url" content="https://www.singhainfra.in/home" />
      </Helmet>

      <Navbar user={user} setUser={setUser} />
      <Hero user={user} />
      <Services />
      <Projects />
      <About />
      <Testimonials user={user} setUser={setUser} />
      <Contact />
      <Footer />
    </>
  );
}

export default Dashboard;
