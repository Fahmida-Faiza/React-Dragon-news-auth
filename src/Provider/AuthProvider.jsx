import { createContext, useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
// import { FaAppStore } from "react-icons/fa";
import app from '../firebase/firebase.config'
export const AuthContext = createContext(null)

const auth = getAuth(app);
const AuthProvider = ({children}) => {

const [user, setUser] = useState(null);

const createUser = (email, password) =>{
    return createUserWithEmailAndPassword(auth,email, password) 

    
}

//sign in
const signIn = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}
// logout

const logOut = () =>{
    return signOut(auth)
}

// user information set hpy aikhaney
useEffect( () => {
  const unSubscribe =  onAuthStateChanged(auth,  currentUser => {
        console.log('user in the auth state changed', currentUser);
        setUser(currentUser);

    });
    return () =>{
        unSubscribe();
    }
}, [])


const authInfo ={user,
    createUser,
    signIn,
    logOut



}



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;