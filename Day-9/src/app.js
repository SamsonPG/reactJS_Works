import React ,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
// import Home from "./components/home/Home";
import AboutUs from "./components/aboutUs/AboutUs";
import AboutClass from "./components/aboutUs/ClassAboutUs";
import Profile from "./components/aboutUs/Profile";
import ContactUs from "./components/contact/ContactUs";
import ErrorPage from "./components/errorPage/ErrorPage";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Shimmer from "./components/home/Shimmerui";
// import RestaurantMenu from "./components/restaurantMenu/restaurantMenu";

const Home = lazy(()=> import("./components/home/Home"))
const RestaurantMenu = lazy(()=> import("./components/restaurantMenu/RestaurantMenu"))



const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Suspense fallback={<h1>Loading...</h1>}><Home /></Suspense> },
      { path: "/aboutus", element: <AboutUs />, children:[{path :"profile",element: <Profile/>}]},
      { path: "/aboutclass", element: <AboutClass /> },
      { path: "/contactus", element: <ContactUs /> },
      { path: "/restaurant/:resID", element: <Suspense fallback={<Shimmer/>}><RestaurantMenu/></Suspense>}
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
