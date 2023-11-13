import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../../redux/actions/hrAction";
import Imag from "../../assets/Avatar/Profile2.png";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import MetaData from "../../components/MetaData";

const AllClient = () => {
  const dispatch = useDispatch();
  const { client, loading } = useSelector((state) => state.client);
  const [keyword, setKeyword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getClient(keyword));
  };
  console.log(keyword);
  useEffect(() => {
    dispatch(getClient(keyword));
  }, []);
  return (
    <div className="px-3 sm:px-12 md:px-12 pt-14 md:py-20">
      <MetaData title={"All Client"} />
      <div className="mt-5 bg-blue2 rounded-lg px-5 py-2 text-white flex justify-between items-center relative">
        <h3 className=" text-xl font-poppins font-bold">All Client</h3>
        <form onSubmit={handleClick} className="w-6/12 md:w-3/12">
          <input
            type="text"
            placeholder="search a client"
            className="w-full px-3 py-1 rounded-md text-black"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
        <p className="absolute right-6 text-black text-lg">
          <BiSearchAlt2 />
        </p>
      </div>
      {loading === true ? (
        <p className="text-md font-bold text-black font-poppins mt-5">
          Wait................
        </p>
      ) : (
        <div className="flex  flex-col md:flex-row mt-10">
          {client && client.length <= 0 ? (
            <p className="mt-5">No Client Found</p>
          ) : null}
          {client &&
            client.map((val, ind) => {
              return (
                <Link
                  to={`/client/${val._id}`}
                  key={ind}
                  className="flex  w-full md:w-3/12"
                >
                  <div className="w-full mr-2 bg-blue3 rounded-2xl">
                    <div>
                      {val.avatar ? (
                        <img
                          src={val.avatar.url}
                          alt="client image"
                          className="w-full h-56 rounded-t-2xl"
                        />
                      ) : (
                        <img
                          src={Imag}
                          alt="client image"
                          className="w-full h-56 rounded-t-2xl"
                        />
                      )}
                    </div>
                    <div className="p-3 text-white font-poppins text-sm">
                      <div className="flex justify-between">
                        <p className="font-bold">Name</p>
                        <p>{val.name}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold">Work Type</p>
                        <p>{val.work}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-bold">Mobile No.</p>
                        <p>{val.mobile}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AllClient;
