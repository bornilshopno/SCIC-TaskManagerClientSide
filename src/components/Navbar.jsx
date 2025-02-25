import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    const { user, logOut, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutHandler = () => {
        logOut();
        setLoading(false);
        navigate("/")

    }
    return (
        <div className="py-4 bg-green-500 flex flex-col sm:flex-row gap-5 justify-between items-center px-5">
            <h2 className="text-4xl text-center font-bold px-auto  text-gray-700">Task Manager</h2>
            <div>
                {user ?
                    <div className="flex gap-4 items-center">
                        <div className="tooltip tooltip-bottom lg:tooltip-left" data-tip={user.displayName}>
                        <img src={user?.photoURL} className="h-10 w-10 rounded-full" alt="" />
                        </div>
                        
                        <Link to={"/"}> <button className="btn btn-sm" >Home</button></Link>
                        <Link to={"/myTasks"}> <button className="btn btn-sm" >ManageTasks</button></Link>
                        <button className="btn btn-sm" onClick={logoutHandler}>LogOut</button>

                    </div>
                    : <div><h2>Welcome Visitor</h2></div>}
            </div>

        </div>
    );
};

export default Navbar;