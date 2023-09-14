import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import NotificationDropdown from "components/Dropdowns/TableDropdown";
import Contact from "pages/ContactForm";
import ContactDropdown from "components/Dropdowns/ContactDropdown";
import PagesDropdown from "components/Dropdowns/PagesDropdown";
import UserDropdown from "components/Dropdowns/UserDropdown";
import ServiceDropdown from "components/Dropdowns/ServiceDropdown";
import PaymentDropdown from "components/Dropdowns/PaymentDropdown";


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-costum-dark text-xl font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Futur
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-none lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none align-center mr-auto">
              {/* <li className="flex items-center">
                {" "}
                <Link
                  href="/auth/register"
                  className="text-costum-dark  text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                >
                  Individual
                </Link>{" "}
              </li> */}

              <li>
                <ServiceDropdown />
              </li>
              <li><PaymentDropdown/></li>
              <li>
                <IndexDropdown />
              </li>
              <li className="flex items-center"> </li>
              <li className="flex items-center"></li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                {" "}
                <Link
                  href="/auth/login"
                  className="text-costum-dark  hover:text-blueGray-00 text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  className="text-costum-dark  hover:text-blueGray-00 text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                >
                  {/* Welcome {profile.firstName} */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
