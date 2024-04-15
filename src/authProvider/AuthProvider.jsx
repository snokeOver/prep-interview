import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../services/firebaseConfig.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [currTheme, setCurrTheme] = useState("");

  //   Register Using email-password
  const registerUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  //   Sign in using email-password
  const signIn = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  //   logOut from the firebase authentication system
  const logOut = () => {
    return signOut(auth);
  };

  //   Manage state change in user inside firebase
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
      return () => unSubscribe;
    });
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    registerUser,
    logOut,
    signIn,
    pageLoading,
    setPageLoading,
    currTheme,
    setCurrTheme,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
