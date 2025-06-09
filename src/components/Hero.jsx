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
import { toast } from "react-toastify";
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
      toast.warning("Please log in to submit a query.");
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
      toast.warning("Please fill in all fields before submitting.");
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
      toast.success("Query submitted successfully!");
      setShowPopup(false);
    } catch (error) {
      console.error("Error submitting query:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
<section
  id="home"
  className="relative min-h-screen flex items-center p-10"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(255, 255, 255, 0) 80%), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="container text-white w-full">
    <div className="animate-fade-in">

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(10,10,10,0.6)] backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center text-black">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Submit Your Query
            </h2>
            <div className="space-y-4 text-left">
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  {!phoneNumber || phoneNumber.length < 10 ? (
                    <input
                      type="tel"
                      placeholder="Enter your phone number..."
                      value={phoneNumber || ""}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border border-gray-300 focus:border-blue-500 focus:outline-none p-3 rounded-md w-full"
                      aria-label="Phone number"
                    />
                  ) : null}

                  <select
                    onChange={(e) => setservice(e.target.value)}
                    className="border border-gray-300 focus:border-blue-500 focus:outline-none p-3 rounded-md w-full"
                    aria-label="Select query type"
                  >
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
                    aria-label="Type your query"
                  />
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={querySubmit}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white font-medium rounded-md"
                aria-label="Submit Query"
              >
                Submit
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 transition text-white font-medium rounded-md"
                aria-label="Close Query Popup"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Text */}
      <h1 className="text-3xl md:text-3xl sm:text-3xl font-bold mb-6 text-black">
        Building <span className="text-blue-900">Excellence</span>,
        Crafting Futures
      </h1>
      <p className="text-xl md:text-xl mb-8 opacity-90 text-black">
        With 3+ years of experience in the construction industry, we deliver
        quality craftsmanship and innovative solutions for residential and
        commercial projects.
      </p>

      {/* CTA Buttons */}
      <div className="flex w-full md:text-2xl lg:text-2xl flex-col sm:flex-row gap-4">
        <button
          onClick={handleQueryClick}
          className="bg-[#1a1a8c] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#2a2aaa] focus:outline-none focus:ring-2 focus:ring-opacity-50 mt-2"
          aria-label="Open Query Form"
        >
          Queries
        </button>

        <a
          href="tel:+917679526642"
          className="bg-[#1a1a8c] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#2a2aaa] focus:outline-none focus:ring-2 focus:ring-opacity-50 mt-2 text-center"
          aria-label="Call +91 76795 26642"
        >
          ( +91 ) 76795 26642
        </a>

        <a
          href="#projects"
          className="bg-[#1a1a8c] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#2a2aaa] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2 flex items-center gap-2 justify-center"
          aria-label="View Our Projects"
        >
          View Our Projects <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </div>

  {/* Gradient Overlay */}
  <div className="absolute bottom-0 left-0 right-0 h-90 bg-gradient-to-t from-gray-500 to-transparent" />
</section>

  );
};

export default Hero;
