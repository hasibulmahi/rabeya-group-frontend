import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { meterialPdf, getMeterialPdf } from "../../../redux/actions/pdfAction";
import Loader from "../../../components/Loading";
import { toast } from "react-toastify";

export const MeteralGenerator = ({ setShowMExpenses, id }) => {
  // const [ait, setAit] = useState(0);
  // const [vat, setVat] = useState(0);
  const dispatch = useDispatch();
  const { success, loading, filename } = useSelector((state) => state.pdf);
  // const { filename } = useSelector((state) => state.pdf);
  const [period, setPeriod] = useState();
  const genratePdf = () => {
    let data = {
      // ait: ait,
      // vat: vat,
      date: period,
    };
    dispatch(meterialPdf(data, id));
  };

  const savePdf = () => {
    let pdfBlob = new Blob([filename], { type: "application/pdf" });
    var reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
    };
    // console.log(pdfBlob);
  };

  useEffect(() => {
    if (success) {
      toast(success);
    }
    dispatch(getMeterialPdf());
  }, [success]);
  return (
    <div className="text-white w-5/12 px-5 py-5 bg-blue-500">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-2">Meterial Expenses List</h2>
        <p
          className="cursor-pointer font-semibold"
          onClick={() => setShowMExpenses(false)}
        >
          Close
        </p>
      </div>
      <div>
        <p>Select a time period (Selected - Now Date)</p>
        <input
          type="date"
          className="w-full py-2 text-black rounded-md px-5"
          onChange={(e) => setPeriod(e.target.value)}
        />
      </div>
      {/* <div className="mt-3">
              <p className="font-poppins font-light">
                AIT [NB: Dont enter '%' charachter]
              </p>
              <input
                type="enter ait percentage"
                className="w-full h-10 mt-1 rounded-md text-black px-2"
                onChange={(e) => setAit(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <p>VAT [NB: Dont enter '%' charachter]</p>
              <input
                type="enter vat percentage"
                className="w-full h-10 mt-1 rounded-md text-black px-2"
                onChange={(e) => setVat(e.target.value)}
              />
            </div> */}
      {success && success ? (
        <button
          onClick={savePdf}
          className="w-full block text-center bg-slate-300 text-black font-medium font-poppins text-sm py-2 mt-5"
        >
          Download
        </button>
      ) : (
        <button
          onClick={genratePdf}
          className="w-full text-center bg-slate-300 text-black font-medium font-poppins text-sm py-2 mt-5"
        >
          {loading ? <Loader /> : "Generate PDF"}
        </button>
      )}
    </div>
  );
};
