import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="mt-1">
      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 font-medium text-lg m-auto" />
    </div>
  );
};

export default Loading;
