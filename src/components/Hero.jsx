import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useData } from "../pages/DataContext"; // ✅ Import context hook
import { Helmet } from "react-helmet-async";
const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setMessage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [service, setservice] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [queryId, setuserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setQueries } = useData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserName(currentUser.displayName);
        setEmail(currentUser.email);
        setuserId(currentUser.uid);
      } else {
        console.log("No user logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleQueryClick = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to submit a query.");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const userPhoneNumber = userSnap.exists() ? userSnap.data().phoneNumber : null;
    setPhoneNumber(userPhoneNumber);
    setShowPopup(true);
  };

  const querySubmit = async () => {
    setLoading(true);
    if (!message || !service || !phoneNumber) {
      alert("Please fill in all fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, "users", queryId);
      await updateDoc(userDocRef, { phoneNumber });

      const docRef = await addDoc(collection(db, "queries"), {
        status: true,
        service,
        name: userName,
        email,
        message,
        phoneNumber,
        timestamp: new Date(),
      });

      await updateDoc(docRef, { id: docRef.id });

      // ✅ Update context with new query
      setQueries((prev) => [
        ...prev,
        {
          id: docRef.id,
          status: true,
          service,
          name: userName,
          email,
          message,
          phoneNumber,
          timestamp: new Date(),
        },
      ]);

      setLoading(false);
      alert("Query submitted successfully!");
      setShowPopup(false);
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center p-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6) 70%, rgba(255, 255, 255,.3) 100%), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
          <Helmet>
              <title> home page | Singhinfra | Leading Construction & Infrastructure Company in Siliguri & Islampur</title>
              <meta
                name="description"
                content="SinghInfra is a premier construction and infrastructure company offering high-quality services in Siliguri, Islampur, and surrounding areas. Specializing in residential, commercial, and industrial projects."
              />
              <meta name="keywords" content="SinghInfra, construction company, infrastructure, Siliguri, Islampur, residential construction, commercial construction, infrastructure projects, building services , best construction company in siliguri ,commercial construction, infrastructure projects, building services , best construction company in islampur" />
              <meta name="author" content="SinghInfra" />
                    <meta property="og:url" content="https://www.singhainfra.in" />
            </Helmet>
      <div className="container text-white w-[100%]">
        <div className=" animate-fade-in">
          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-[rgba(10,10,10,0.6)] backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center text-black">
                <h2 className="text-2xl font-semibold mb-6 text-red-500">
                  Submit Your Query
                </h2>
                <div className="space-y-4 text-left">
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      {!phoneNumber || phoneNumber.length < 10 ? (
                        <input
                          type="number"
                          placeholder="Enter your phone number..."
                          value={phoneNumber || ""}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border border-gray-300 focus:border-blue-500 focus:outline-none p-3 rounded-md w-full"
                        />
                      ) : null}

                      <select
                        onChange={(e) => setservice(e.target.value)}
                        className="border border-gray-300 focus:border-blue-500 focus:outline-none p-3 rounded-md w-full"
                      >
                        <option value="">What type of query?</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Remodeling">Remodeling</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Flooring">Flooring</option>
                        <option value="New Construction">New Construction</option>
                        <option value="Electrical">Electrical</option>
                        <option value="other">Other</option>
                        
                      </select>

                      <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your query..."
                        className="border border-gray-300 focus:border-blue-500 focus:outline-none p-3 rounded-md w-full h-32 resize-none"
                      />
                    </>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={querySubmit}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white font-medium rounded-md"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Text */}
          <h1 className="text-4xl md:text-4xl sm:text-3xl font-bold mb-6">
            Building <span className="text-yellow-500">Excellence</span>,
            Crafting Futures
          </h1>
          <p className="text-3xl md:text-3xl mb-8 opacity-90">
            With 3+ years of experience in the construction industry, we deliver
            quality craftsmanship and innovative solutions for residential and
            commercial projects.
          </p>
          <div className="flex w-[100%] md:text-2xl lg:text-3xl flex-col sm:flex-row gap-4">
            <button
              onClick={handleQueryClick}
              className="bg-[rgb(25,25,140)] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[rgb(25,25,160)] focus:outline-none focus:ring-2 focus:ring-opacity-50 mt-2"
            >
              Queries
            </button>
            <button className="bg-[rgb(25,25,140)] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[rgb(25,25,160)] focus:outline-none focus:ring-2 focus:ring-opacity-50 mt-2">
              <a href="tel:+917679526642">+91 76795 26642</a>
            </button>

            <button className="bg-[rgb(25,25,140)] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[rgb(25,25,160)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2">
            <a href="#projects" className="flex items-center gap-2 justify-center">
                View Our Projects <ArrowRight size={16} />
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent" />
    </section>
  );
};

export default Hero;
