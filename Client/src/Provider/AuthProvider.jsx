import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import auth from "../Firebase/Firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the current authenticated user
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [forgetEmail, setForgetEmail] = useState(null);
  const [watchList, setWatchList] = useState(null);
  const [dark, setDark] = useState(false);

  // function to create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // function to logIn with the help of google account
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // update user profile
  const updatePfp = (updateUserProfile) => {
    return updateProfile(auth.currentUser, updateUserProfile);
  };

  // function to sign in user
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        // const { data } = await axios.post(
        //   `${import.meta.env.VITE_API_CALL}jwt`,
        //   { email: currentUser?.email },
        //   { withCredentials: true }
        // );
      } else {
        setUser(currentUser);
        // const { data } = await axios.get(
        //   `${import.meta.env.VITE_API_CALL}logout`,
        //   { withCredentials: true }
        // );
      }
      setLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // function to log out user
  const signOutUser = () => {
    return signOut(auth);
  };

  // forget password
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    createUser,
    signOutUser,
    updatePfp,
    logIn,
    signInWithGoogle,
    setUser,
    setForgetEmail,
    forgetEmail,
    forgetPassword,
    user,
    loader,
    setWatchList,
    watchList,
    dark,
    setDark,
    setLoader,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
