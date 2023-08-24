import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { toastErrorNot, toastSuccessNot } from "../helpers/TostNotify";
// https://firebase.google.com/docs/auth/web/start

export const AuthContex = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userTakip();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      //? kullanıcı profilini güncellemek için kullanılan firebase metodu, login logout da userTakip sayesinde güncelleniyor ama register da isim güncellemesi yok, o da bu şekilde oluyor, register dan girilen firt ve lastname burada currentUser A ekleniyor
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      toastSuccessNot("register başarılı");
      navigate("/");
    } catch (error) {
      toastErrorNot(error.message);
    }
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toastSuccessNot("login başarılı");
      navigate("/");
    } catch (error) {
      toastErrorNot(error.message);
    }
  };

  //? firebase nin loginden çıkış metodu
  const logOut = () => {
    signOut(auth);
    toastSuccessNot("loginden çıkış başarılı");
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle

const signUpGoogle=()=>{
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
   toastSuccessNot("google ile giriş başarılı")
   navigate("/")
  })
  .catch((error) => {
   toastErrorNot(error.message)
  });
}



  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu. bir kere çalıştır login logout takip eder
  const userTakip = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false);
      }
    });
  };

 
  return (
    <AuthContex.Provider value={{ createUser, signIn, currentUser, logOut,signUpGoogle }}>
      {children}
    </AuthContex.Provider>
  );
};

export default AuthContextProvider;
