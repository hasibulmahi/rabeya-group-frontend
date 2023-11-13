import React, { useState } from "react";

export const MeteralGenerator = ({ setShowMExpenses }) => {
  const [ait, setAit] = useState(0);
  const [vat, setVat] = useState(0);
  const [period, setPeriod] = useState("1D");
  const genratePdf = () => {
    let data = {
      ait: ait,
      vat: vat,
      period: period,
    };
  };
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
      <select
        onChange={(e) => setPeriod(e.target.value)}
        className="text-black w-full h-10 rounded-md text-center font-poppins font-medium mt-5"
      >
        <option value={"1D"}>1 Days</option>
        <option value={"7D"}>1 Weeks</option>
        <option value={"1M"}>4 Weeks</option>
        <option value={"3M"}>12 Weeks</option>
      </select>
      <div className="mt-3">
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
      </div>
      <button
        onClick={genratePdf}
        className="w-full text-center bg-slate-300 text-black font-medium font-poppins text-sm py-2 mt-5"
      >
        Generate PDF
      </button>
    </div>
  );
};
