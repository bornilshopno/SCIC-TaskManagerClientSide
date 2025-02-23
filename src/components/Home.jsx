import { useContext } from "react";
import AuthContext from "./AuthContext";


const Home = () => {
    const {loading, setLoading, user, setUser, logOut, googleSignIn, auth,}=useContext(AuthContext);
    const LoginHandler=()=>{
        googleSignIn()
        .then((result) => {
            const user = result.user;
            setUser(user);
            setLoading(false);
           
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
           

        

        });

    }
    return (
        <div className="min-h-[90vh] bg-sky-300 flex flex-col justify-center items-center">
            <h2 className="text-3xl text-center max-w-lg">Welcome to Task Manager! Pls login to continue</h2>

            <div className="mx-auto my-20"><button className="btn text-center " onClick={LoginHandler}>Login with Google</button></div>





            
        </div>
    );
};

export default Home;