import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  deleteEmployee,
  getSingleEmployee,
} from "../../redux/actions/hrAction";
import MetaData from "../../components/MetaData";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const SingleEmployee = () => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { singleEmployee, dsuccess, derror, dloading } = useSelector(
    (state) => state.employee
  );

  let time = new Date(singleEmployee && singleEmployee.createdAt);
  let date = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();
  const finalTime = `${date}-${month}-${year}`;
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    dispatch(getSingleEmployee(id));
    if (dsuccess) {
      toast(dsuccess);
      dispatch(clearSuccess());
      history("/all/employee");
    }
    if (derror) {
      toast(derror);
      dispatch(clearError());
    }
  }, [id, dsuccess, derror]);
  return (
    <>
      <div className="flex justify-center pt-20 mb-5">
        <MetaData title={`${singleEmployee && singleEmployee.name}`} />

        <div className=" bg-white shadow-btn rounded-xl w-10/12 md:w-4/12">
          <div className="rounded-md  py-5 px-5">
            <div className="flex justify-center">
              <label className="cursor-pointer">
                {singleEmployee && singleEmployee.avatar ? (
                  <img
                    src={singleEmployee.avatar.url}
                    className="m-auto block  h-52 mb-3"
                  />
                ) : (
                  <img src={Profile} className="m-auto block  h-52 mb-3" />
                )}
              </label>
            </div>

            <div className="flex justify-center">
              <label className="cursor-pointer bg-blue-900 text-white px-6 font-bold py-1 rounded-md">
                Download CV
              </label>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Name</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.name}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Username</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.userName}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Email</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.email}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Mobile</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.mobile}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">ID</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.id}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Role</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.role}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Address</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.address}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">Salary</label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.salary}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">
                Salary Aproved
              </label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {singleEmployee && singleEmployee.salaryAproved}
              </p>
            </div>
            <div className="my-2">
              <label className="font-poppins font-bold text-sm">
                Issue Date
              </label>
              <p className="border-2 border-slate-300 px-5 py-2 font-poppins font-medium text-sm  rounded-xl mt-2">
                {finalTime}
              </p>
            </div>
            <div className="  mt-5">
              <Link
                to={`/update/employee/${id}`}
                className="block w-full bg-blue2 text-center px-3 py-2 rounded-md text-white "
              >
                Update
              </Link>
              <button
                className="w-full mt-2 bg-red-600 px-3 py-2 rounded-md text-white"
                onClick={() => setShowDelete(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDelete && (
        <div className="fixed z-50 w-full h-screen top-0 left-0 bg-box1 flex justify-center items-center">
          <div className="w-10/12 md:w-3/12 bg-blue1 px-5 py-6 rounded-xl">
            <p className="text-white font-poppins text-lg">Are You Sure?</p>
            <div className="flex ">
              <button
                className="w-full mt-2 bg-red-600 px-3 py-2 rounded-md text-white"
                onClick={handleDelete}
              >
                {dloading ? <Loading /> : "Confirm"}
              </button>
              <button
                className="w-full mt-2 ml-2 bg-green-600 px-3 py-2 rounded-md text-white"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleEmployee;
