import { useContext } from "react";
import AuthContext from "./AuthContext";


const Navbar = () => {
    const { user, logOut, setLoading } = useContext(AuthContext)
    console.log(user)
    const logoutHandler=()=>{
        logOut();
        setLoading(false)
       
    }
    return (
        <div className="py-4 bg-green-500 flex justify-between items-center px-5">
            <h2 className="text-4xl text-center font-bold px-auto  text-gray-700">Task Manager</h2>
            <div>
                {user ?
                    <div className="flex gap-4"><h2>{user.displayName}</h2> <button className="btn btn-sm" onClick={logoutHandler}>LogOut</button></div>
                    : <div><h2>Welcome Visitor</h2></div>}
            </div>

        </div>
    );
};

export default Navbar;