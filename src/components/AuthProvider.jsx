import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ( {children}) => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        
        })

        return () => unSubscribe();
    }, [auth])

    const googleSignIn=()=>{
        return signInWithPopup(auth, provider)
    // .then((result) => {

    //   const user = result.user;
   
    // }).catch((error) => {
   
    //   const errorCode = error.code;
    //   const errorMessage = error.message;

    // });
    }

    const logOut = () => {
        setLoading(true);
        setUser(null);
        return signOut(auth)
    }

    const authInfo = { loading, setLoading, user, setUser, logOut, googleSignIn, auth, }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;