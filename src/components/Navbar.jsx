import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";


const Navbar = () => {
    const { user, logOut, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutHandler = () => {
        logOut();
        setLoading(false);
        navigate("/")

    }
    return (
        <div className="bg-green-500 fixed w-full">
            <div className="py-4 bg-green-500 flex flex-col sm:flex-row gap-2 justify-between items-center w-10/12 mx-auto ">
                <h2 className="text-2xl lg:text-4xl text-center font-bold px-auto  text-gray-700">Task Manager</h2>
                <div>
                    {user ?
                        <div className="flex gap-4 items-center">
                            <div className="tooltip tooltip-bottom lg:tooltip-left" data-tip={user.displayName}>
                                <img src={user?.photoURL} className="h-10 w-10 rounded-full" alt="" />
                            </div>

                            <NavLink to={"/"}> <button className="btn btn-sm bg-blue-500 text-base-200" >Home</button></NavLink>
                            <NavLink to={"/myTasks"} > <button className="btn btn-sm bg-blue-500  text-base-200 active:bg-green-800" >ManageTasks</button></NavLink>
                            <button className="btn btn-sm bg-blue-500 text-base-200" onClick={logoutHandler}>LogOut</button>

                        </div>
                        : <div><h2>Welcome Visitor</h2></div>}
                </div>

            </div>
           
        </div>
    );
};

export default Navbar;