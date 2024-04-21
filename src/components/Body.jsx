import React from "react";
import Form from "./Form";
import Result from "./Result";

function Body() {
  return (
    <div className="mt-10 px-2">
      <h1 className="text-2xl lg:text-5xl text-[#005734] font-bold text-center">
        Samantha Content Evaluator
      </h1>
      <div className=" flex  flex-col-reverse lg:flex-row mt-5">
        <p className="lg:max-w-[80%] mt-4 text-sm w-full lg:text-lg font-[450] mb-10">
          Samanta Content Evaluator will assess the content, is it generated by
          AI or Humans, measures the confidence level of the content, detect
          plagiarism, and analyze various aspects like character count, sentence
          count, and paragraph count…. Try it now
        </p>

        <img
          src="/images/samantha.png"
          alt=""
          className="m-auto w-[200px] lg:w-[20%] h-[200px] object-contain lg:object-cover"
        />
      </div>

      <Form />
    </div>
  );
}

export default Body;
