import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const Layout = () => {
    return (
        <div>
            <Navbar/>
             <div className="h-28 md:h-12 lg:h-16">

            </div>
          <div className="bg-green-100 py-10 ">
          <Outlet/>
          </div>
            
        </div>
    );
};

export default Layout;