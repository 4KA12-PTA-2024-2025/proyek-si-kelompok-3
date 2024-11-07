import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SidebarComponent from "./components/Sidebar.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RiwayatPage from "./pages/HistoryPage.jsx";
import AddProductPage from "./pages/crud/AddProductPage.jsx";
import EditProductPage from "./pages/crud/EditPage.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import LoginCoba from "./pages/LoginPage.jsx";
import HistoryDetails from "./pages/HistoryDetailsPage.jsx";
import TransaksiPage from "./pages/TransaksiPage.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/transaksi",
        element: <TransaksiPage />,
      },
      {
        path: "/riwayat",
        element: <RiwayatPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginCoba />,
  },
  {
    path: "/products/add",
    element: <AddProductPage />,
  },
  {
    path: "/products/edit/:id",
    element: <EditProductPage />,
  },
  {
    path: "/transaksi/:id",
    element: <HistoryDetails />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
