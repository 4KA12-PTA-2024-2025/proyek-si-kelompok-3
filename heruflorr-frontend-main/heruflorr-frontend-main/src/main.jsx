import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TentangPage from "./pages/TentangPage.jsx";
// import TanamanPage from "./pages/TanamanPage.jsx";
import "animate.css";
// import LoginCoba from "./pages/LoginCoba.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/cart.jsx";

import HistoryPage from "./pages/TransaksiPage.jsx";
import TransaksiDetails from "./pages/transaksiDetails.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ForgotPassword from "./pages/ForgetPassword.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tentang",
    element: <TentangPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/transaksi",
    element: <HistoryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/transaksi/:id",
    element: <TransaksiDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profil",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
