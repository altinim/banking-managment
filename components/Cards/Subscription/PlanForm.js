import React, { useState, useContext } from "react";
import Auth from "layouts/Auth.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { multiStepContext } from "pages/step_context";
import ProductList from "../ProductList";

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
    amount: yup.string().required("Some text is required."),
  })
  .required();
export default function PlanForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { setStep, subscribtionData, setSubscribtionData } =
    useContext(multiStepContext);

  const REQUEST_API_BASE_URL = "http://localhost:8080/api/v1/product";

  const [isOpen, setIsOpen] = useState(false);

  const [request, setRequest] = useState({
    planName: "",
    planDesc: "",
  });
  const [responseRequest, setResponseRequest] = useState({
    planName: "",
    planDesc: "",
  });
  const saveRequest = async (e) => {
    //e.preventDefault();
    const response = await fetch(REQUEST_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _reqeuest = await response.json();
    setResponseRequest(_reqeuest);
    window.location.reload();
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setRequest({ ...request, [event.target.name]: value });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex content-center items-center justify-center h-full w-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Set a plan
                </h6>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(saveRequest)}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="planName"
                    defaultValue={subscribtionData["planName"]}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Plan Name"
                    onChange={(e) =>
                      setSubscribtionData({
                        ...subscribtionData,
                        planName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Plan Descrption
                  </label>
                  <input
                    type="text"
                    name="planDesc"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter the email you are requesting money from"
                    onChange={(e) =>
                      setSubscribtionData({
                        ...subscribtionData,
                        planDesc: e.target.value,
                      })
                    }
                    defaultValue={subscribtionData["planDesc"]}
                  />
                </div>

                <div className="text-center mt-6 flex">
                  <input
                    className="bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    value="Back"
                    onClick={() => setStep(1)}
                  />
                  <input
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    value="Create plan"
                    onClick={() => setStep(3)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <ProductList />
      </div>
    </div>
  );
}
PlanForm.layout = Auth;