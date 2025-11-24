import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { InternalNavbar } from "../components/InternalNavbar";
import ScrollToTop from "../components/ScrollToTop";
import { Footer } from "../components/Footer";

export const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Choose navbar based on login status
  const renderNavbar = () => {
    return isLoggedIn
      ? <InternalNavbar setIsLoggedIn={setIsLoggedIn} />
      : <Navbar />;
  };

  return (
    <>
      <ScrollToTop />

      {renderNavbar()}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
