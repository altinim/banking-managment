import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TokenCheck from "components/TokenCheck";
import * as yup from "yup";
import Swal from "sweetalert2";
import User from "layouts/User.js";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useRouter } from "next/router";
const schema = yup
  .object()
  .shape({
    requestedEmail: yup
      .string()
      .email("Please enter a valid e-mail")
      .required("Email is required."),
    payeeEmail: yup
      .string()
      .email("Please enter a valid e-mail")
      .required("Email is required."),
  })
  .required();
export default function requestMoney() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);
  const REQUEST_API_BASE_URL = "http://localhost:8080/api/v1/auth/requestmoney";
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(schema) });
  const [requestMoney, setRequestMoney] = useState({
    requestedEmail: "",
    payeeEmail: "",
    amount: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setDecoded(decodedToken);
  }, []);

  useEffect(() => {
    if (decoded) {
      requestMoney.requestedEmail = decoded.sub;
    } else console.log("decoding failed.");
  }, [decoded]);

  const successfulAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Succesfully registered!",
      showConfirmButton: false,
      timer: 800,
    });
  };
  const saveRequestMoney = async (e) => {
    //e.preventDefault();
    const response = await fetch(REQUEST_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestMoney),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _requestMoney = await response.json();
    setRequestMoney(_requestMoney);
    successfulAlert();
    await router.push("admin/dashboard");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setRequestMoney({ ...requestMoney, [event.target.name]: value });
  };
  return (
    <TokenCheck>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Request Money
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={saveRequestMoney}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Payee Email
                    </label>
                    <input
                      // {...register("payeeEmail")}
                      type="email"
                      name="payeeEmail"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter the email you are requesting money from"
                      onChange={(e) => handleChange(e)}
                      value={requestMoney.payeeEmail}
                    />
                    {/* <small role="alert" className="text-red-500 ">
                      {errors.payeeEmail?.message}
                    </small> */}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Amount
                    </label>
                    <input
                      // {...register("amount")}
                      type="number"
                      name="amount"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter the amount"
                      value={requestMoney.amount}
                    />
                    {/* <small role="alert" className="text-red-500 ">
                      {errors["amount"]?.message}
                    </small> */}
                    <div className="text-center mt-6">
                      <input
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        value="Request Money"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenCheck>
  );
}
requestMoney.layout = User;
