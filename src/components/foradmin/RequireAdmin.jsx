// components/foradmin/RequireAdmin.jsx

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function RequireAdmin({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User ID:", currentUser.uid);
        console.log("Display Name:", currentUser.displayName);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setIsAdmin(userData.isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      } else {
        console.log("No user logged in.");
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAdmin === null)
    return (
      <div className="p-6 h-full flex justify-center items-center">
        <p className="text-[20px] font-bold">Loading...</p>
      </div>
    );
  

  return isAdmin ? children : <Navigate to="/login" />;
}
