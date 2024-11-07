import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import GuestComponent from "../components/GuestComponent";
import DefaultComponent from "../components/DefaultComponent";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar Section */}
      <NavbarComponent />
      {/* End of Navbar Section */}
      {/* Hero Section */}
      {isAuthenticated ? <DefaultComponent /> : <GuestComponent />}
      {/* End of Hero Section */}
    </>
  );
};

export default HomePage;
