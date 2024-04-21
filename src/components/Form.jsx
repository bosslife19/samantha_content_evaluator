import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Result from "./Result";
import { Oval } from "react-loader-spinner";
import { ModalContext } from "../App";
import data from "../SamantaContentEvaluator_2.json";

function Form() {
  const [title, setTitle] = useState("Topic Name");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [numofTimes, setNumOfTimes] = useState(0);
  const [showContribute, setShowContribute] = useState(false);
  const [result, setResult] = useState(null);
  const [experience, setExperience] = useState(true);
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(true);
  
  const { globalState, setGlobalState } = useContext(ModalContext);

  const scaleData = data.urls;

  useEffect(() => {
    // show check button if coupon is valid
    if (globalState.couponSuccess) {
      setExperience(false);
      setShowContribute(false);
      setGlobalState({ ...globalState, couponError: "" });
      setCheck(true);
    }
  }, [globalState.couponSuccess]);

  const handleExperience = async (e) => {
    e.preventDefault();

    setError("");
    // check if email is inputted
    if (!email) {
      setLoading(false);
      setError("The email field is required");
      return;
    }

    // make email accessible to all components

    setGlobalState({
      ...globalState,
      globalEmail: email,
    });

    try {
      // get user details and number of times they have used the application
      setLoading(true);
      const response = await axios.post(
        "https://100105.pythonanywhere.com/api/v3/experience_database_services/?type=experienced_service_user_details",
        {
          email,
          product_number: "UXLIVINGLAB001",
          occurrences: 1,
        }
      );

      if (response.data.success) {
        setLoading(false);

        const numberUsed = response.data.response[0].used_time;
        setNumOfTimes(numberUsed);

        // if they have used more than four times, show contribute button
        if (numberUsed > 4) {
          // show contribute button
          setShowContribute(true);
          setExperience(false);
          setCheck(false);

          return;
        } else {
          // else show check button
          setExperience(false);
          setCheck(true);
        }
      } else {
        // if user does not exist, register user
        try {
          await axios.post(
            "https://100105.pythonanywhere.com/api/v3/experience_database_services/?type=register_user",
            {
              product_number: "UXLIVINGLAB001",
              email,
            }
          );
          setLoading(false);
          setCheck(true);
          setExperience(false);
          setNumOfTimes(1);
        } catch (error) {
          setLoading(false);
          setError(error.response.data.message);
        }
      }
    } catch (error) {
      setLoading(false);

      setError(error.response.data.message);
    }
  };
  const handleCheck = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);
    setResult(null)
    setLoading(true);

    if (!content) {
      setLoading(false);
      setError("The content field is required");
      return;
    }

    if (!email) {
      setLoading(false);
      setError("The email field is required");
      return;
    }
    
    const numOfWords = content.trim().split(/\s+/);

    // check if content is less than 50
    if (numOfWords.length < 60) {
      setLoading(false);
      setError("Content must have at least 60 words.");
      return;
    }

    try {

      // make request to the evaluator api
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_API_KEY}/`,
        {
          title,
          content,
        }
      );

      setLoading(false);
      
      // remove errors in UI if they exist
      setError('');
      setGlobalState({
        ...globalState,
        couponError: "",
        couponSuccess: "",
      });
      setResult(response.data);
      
    } catch (error) {
      setLoading(false);
      setError("Something went wrong..");
    }
  };

  const handleContribute = (e) => {
    e.preventDefault();
    // redirect to payment page
    window.location.href =
      "https://dowellpay.online/contribute-payment/?product_number=UXLIVINGLAB001";
  };

  const openCouponModal = (e) => {
    e.preventDefault();
    // open modal by accessing the global state 
    globalState.setOpenModal(true);
  };


const handleScale = async (item)=>{
  
  try {
    const res = await axios.get(item);
    if(res.data.success){
      setSuccess('Thank you for using our application. We really appreciate your feedback')
    }

    
    
  } catch (error) {
    console.log(error.message)
    // setError(error.message);
   
  }
 
}
const handleTryAgain = ()=>{
  setContent('');
 
  setResult(null);

 
 
  
}


  return (
    <div>
      <form className="flex flex-col gap-10">
        <input
          type="text"
          placeholder="Topic Name"
          className="border border-gray-300 block w-full rounded-lg py-2 lg:py-3 px-1"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="16"
          placeholder="Content"
          required
          className="border border-gray-300 block w-full rounded-lg px-1"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Enter your email address"
          required
          className="border border-gray-300 block  w-full rounded-lg py-2 lg:py-3 px-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        {check && (
          <div className="bg-gray-300 text-lg p-3">
            <p>You have used samanta content evaluator {numofTimes} times</p>
          </div>
        )}

        {showContribute && (
          <div className="bg-gray-300 text-lg p-3">
            <p>You have used samanta content evaluator {numofTimes} times</p>
          </div>
        )}

        <div className="buttons flex justify-center items-center gap-2 lg:gap-3 ">
          <button className="bg-[#FF0000] text-white text-sm lg:text-lg px-4 py-2 rounded-md flex items-center justify-center font-semibold">
            Close
          </button>
          <button className="bg-[#D6BB41] text-white py-2 text-sm lg:text-lg px-3 sm:px-8 rounded-md flex items-center justify-center font-semibold">
            Reset
          </button>

          {check && (
            <button
              onClick={handleCheck}
              className="bg-[#005734] text-white py-2  px-3 text-sm lg:text-lg sm:px-10 rounded-md flex gap-3 items-center justify-center font-semibold"
            >
              {loading && (
                <Oval
                  visible={true}
                  height="15"
                  width="15"
                  color="white"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}

              <i className="fas fa-search text-white w-3 h-3"></i>
              <span className>check</span>
            </button>
          )}
          {experience && (
            <button
              onClick={handleExperience}
              className="bg-[#005734] text-white py-2  px-3 text-sm lg:text-lg sm:px-10 rounded-md flex gap-3 items-center font-semibold justify-center"
            >
              {loading && (
                <Oval
                  visible={true}
                  height="15"
                  width="15"
                  color="white"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              <i className="fa-solid fa-paper-plane w-2 h-2 mb-2"></i>
              <span>Experience</span>
            </button>
          )}

          {showContribute && (
            <button
              className="bg-[#005734] text-white py-2  px-3 sm:px-10 text-sm lg:text-lg rounded-md flex gap-3 items-center font-semibold"
              onClick={handleContribute}
            >
              Contribute
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-lg font-bold">{error}</p>}
        {success && <p className="text-green-500 text-lg font-bold">{success}</p>}
        {globalState.couponError && (
          <p className="text-red-500 text-lg font-bold">
            {globalState.couponError}
          </p>
        )}
        {globalState.couponSuccess && (
          <p
            className={
              showSuccess ? "text-green-500 text-lg font-bold" : "hidden"
            }
          >
            {globalState.couponSuccess}
          </p>
        )}
        {showContribute && (
          <div className="flex gap-3 mt-10 justify-center items-center">
            <p className="text-lg font-normal">Do you have a coupon?</p>
            <button
              className="p-3 text-white bg-green-500 rounded-lg"
              onClick={openCouponModal}
            >
              Yes
            </button>
          </div>
        )}
      </form>
      {result && <Result result={result} email={email} />}

      {result && (
        <div className="scale my-8">
          <p className="text-gray-800 sm:text-lg text-center">
            On a scale of 0-10, how likely are you to recommend the product to a
            friend or colleague?
          </p>
          <div className="scaleButtons flex flex-wrap gap-1">
            {scaleData.map((item, index) => (
              <button
                key={index}
                className="py-1 px-6 text-white bg-green-500 rounded-lg mt-2"
                onClick={()=>handleScale(item.item[0])}
              >
                {index}
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <button className="bg-[#005734] text-white py-2  px-3 sm:px-10 text-sm lg:text-lg rounded-sm flex gap-3 items-center font-semibold mx-auto mt-4" onClick={handleTryAgain}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default Form;
