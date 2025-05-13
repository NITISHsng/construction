import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building, LogIn, LogOut, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Helmet } from 'react-helmet-async'; // Import Helmet

const Login = () => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for sign in/up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      let userCredential;
  
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
  
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        let userName = user.displayName;
        if (!userName) {
          userName = prompt("Please enter your name:");
        }
  
        await setDoc(userRef, {
          email: user.email,
          name: userName || "Not set Name",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        await setDoc(
          userRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      }
  
      navigate("/");
    } catch (error) {
      alert(`${isSignUp ? "Sign Up" : "Login"} failed: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      } else {
        await setDoc(userRef, {
          lastLogin: new Date(),
        }, { merge: true });
      }

      navigate("/");
    } catch (error) {
      alert("Google Sign-In failed: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isSignUp ? "Create a New Account" : "Login to Your Account"} | SinghInfra</title>
        <meta
          name="description"
          content={`${
            isSignUp ? "Create" : "Login"
          } to your SinghInfra account to access construction and infrastructure services.`}
        />
              <meta property="og:url" content="https://www.singhainfra.in/login" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg space-y-8">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">
              {isSignUp ? "Create a New Account" : "Sign In to Your Account"}
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleEmailAuth}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : isSignUp ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </button>

          <div className="text-center text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-blue-600 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
