import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";

const PaymentDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();

  // Function to open the dropdown
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  // Function to close the dropdown
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Add a click event listener to the document body to close the dropdown
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        btnDropdownRef.current &&
        !btnDropdownRef.current.contains(e.target) &&
        popoverDropdownRef.current &&
        !popoverDropdownRef.current.contains(e.target)
      ) {
        closeDropdownPopover();
      }
    };

    if (dropdownPopoverShow) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownPopoverShow]);

  return (
    <>
      <a
        className="text-costum-dark text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        send payments
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-600"
          }
        >
          Payments
        </span>
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-800"
          }
        ></span>
        
        <Link
          href="/paymentTypes/InstitutionPayments"
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Institution Payment
        </Link>
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-800"
          }
        ></span>
        <Link
          href="/paymentTypes/CollectorPayments"
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Collector Payment
        </Link>
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-800"
          }
        ></span>
        <Link
          href="/paymentTypes/MobilePayments"
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Mobile Payment 
        </Link>
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-800"
          }
        ></span>
        <Link
          href="/paymentTypes/PrePaidServices"
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Pre Paid Payment
        </Link>
       
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      </div>
    </>
  );
};

export default PaymentDropdown;
