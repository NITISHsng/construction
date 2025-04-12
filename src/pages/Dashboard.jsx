import React, { useEffect, useState } from 'react'; 
import { auth } from '../firebase/firebase';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import About from '../components/About';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; 
function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser.displayName);
      } else {
        console.log("No user logged in. Redirecting...");
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, [navigate]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Hero user={user}/>
      <Services/>
      <Projects/>
      <About/>
      <Testimonials user={user} setUser={setUser}/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default Dashboard;
