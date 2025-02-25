import {
  createBrowserRouter,

} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import MyTasks from "./MyTasks";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/myTasks",
        element: <MyTasks></MyTasks>
      }]
  },
]);

export default router;