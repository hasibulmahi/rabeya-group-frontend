import React, { useEffect } from "react";
import ReactTimeAgos from "../../components/ReactTimeAgos";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  deleteDeposit,
} from "../../redux/actions/adminAction";
import FullLoading from "../../components/FullLoading";
import { toast } from "react-toastify";

const SingleDeposit = ({ val }) => {
  const dispatch = useDispatch();
  const { success, error, dpdloading } = useSelector(
    (state) => state.deletepayment
  );
  const {
    success: dpdSuccess,
    error: dpdError,
    dpdloading: ddLoading,
    isLoaded,
  } = useSelector((state) => state.dpDeposite);
  //To Local String
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    if (success) {
      toast(success);
      dispatch(clearSuccess());
    }
    if (error) {
      toast(error);
      dispatch(clearError());
    }
  }, [success, error]);

  return (
    <div className="flex justify-between text-white py-1 w-full">
      <p className="border-2 border-slate-100  text-center py-2 rounded-lg w-6/12 md:w-4/12">
        <ReactTimeAgos date={val.createdAt} />
      </p>
      <div className="flex items-center w-6/12  ml-1">
        <p className="border-2 border-slate-100  py-2 rounded-lg w-full text-center ">
          {numberWithCommas(val.amount)}
        </p>
        <p className="ml-3 cursor-pointer">
          {dpdloading ? (
            <p></p>
          ) : (
            <AiOutlineMinusCircle
              onClick={() => {
                dispatch(deleteDeposit(val._id));
              }}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default SingleDeposit;
