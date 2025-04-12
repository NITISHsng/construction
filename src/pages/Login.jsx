import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Building, LogIn , LogOut, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Login = () => {
      const [user, setUser] = useState(null);
     useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            console.log("User is logged in:", currentUser.displayName);
            setUser(currentUser);
            navigate("/"); 
          } else {
            console.log("No user logged in. Redirecting...");
          }
        });
    
        return () => unsubscribe();
      },[]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle Email & Password Login
// ...

const handleEmailSignIn = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save to Firestore (if not already saved)
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName || "", // Email sign-in may not have a name
        createdAt: new Date(),
        lastLogin: new Date(),
      });
    } else {
      // Update last login time
      await setDoc(userRef, {
        lastLogin: new Date(),
      }, { merge: true });
    }

    navigate("/");
  } catch (error) {
    alert("Login failed: " + error.message);
  }

  setIsLoading(false);
};

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save to Firestore
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
      // Update last login time
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Building className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">Sign in to your account</h2>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
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

            {/* Password Input */}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
