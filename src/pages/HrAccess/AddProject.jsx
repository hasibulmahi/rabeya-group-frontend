import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  createProject,
  getProjectClient,
  getProjectManager,
} from "../../redux/actions/hrAction";
import Loader from "../../components/Loading";
import MetaData from "../../components/MetaData";

const AddProject = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.hrProject);
  const { client, manager } = useSelector((state) => state.projectUser);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [payable, setPayable] = useState("");

  const [cost, setCost] = useState();
  const [deadLine, setDeadLine] = useState();
  const [managerId, setManagerId] = useState();
  const [clientId, setClientId] = useState();
  const handleAddProject = (e) => {
    e.preventDefault();

    let userData = {
      name: name,
      code: code,
      description: desc,
      payable: parseInt(payable),
      actualCost: parseInt(cost),
      deadline: deadLine,
      managerId: managerId,
      clientId: clientId,
    };
    console.log(userData);
    dispatch(createProject(userData));
  };
  useEffect(() => {
    dispatch(getProjectManager());
    dispatch(getProjectClient());

    if (success) {
      toast(success);
      dispatch(clearSuccess);
    }
    if (error) {
      toast(error);
      dispatch(clearError());
    }
  }, [success, error]);
  return (
    <div className="flex justify-center pt-20 mb-5">
      <MetaData title={"Create Project"} />
      <form
        onSubmit={handleAddProject}
        className=" bg-white shadow-btn rounded-xl w-10/12 md:w-4/12"
      >
        <p className="mt-5 text-center text-lg font-poppins font-medium">
          Create Project
        </p>
        <div className=" px-5 py-4">
          <div className="my-2">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="my-2">
            <label>Project ID</label>
            <input
              type="text"
              placeholder="Enter project code"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
          <div className="my-2">
            <label>Project Description</label>
            <textarea
              className="h-64 w-full px-2 py-2 border-2 border-slate-900 rounded-xl"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="my-2">
            <label>Project Deal Money</label>
            <input
              type="text"
              placeholder="Enter project money"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setPayable(e.target.value);
              }}
              required
            />
          </div>
          <div className="my-2">
            <label>Planned Cost</label>
            <input
              type="text"
              placeholder="Enter project planed cost"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setCost(e.target.value);
              }}
              required
            />
            <div className="my-2">
              <label>Project Deadline</label>
              <input
                type="date"
                placeholder="Enter project deadline"
                className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
                onChange={(e) => {
                  setDeadLine(e.target.value);
                }}
                required
              />
            </div>
            <div className="my-2">
              <label>Project Manager</label>
              <select
                onChange={(e) => setManagerId(e.target.value)}
                className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              >
                <option>Select a Manager</option>
                {manager &&
                  manager.map((val, ind) => {
                    return (
                      <option key={ind} value={val._id}>
                        {val.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="my-2">
              <label>Project Client</label>
              <select
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              >
                <option>Select a Client</option>
                {client &&
                  client.map((val, ind) => {
                    return (
                      <option key={ind} value={val._id}>
                        {val.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          {/* <div className="my-2">
            <input type="checkbox" name="Choose For Manager" value="Manager" />
            <span className="ml-1">Choose For Manager</span>
          </div> */}
          <div className="flex justify-center mt-5">
            <button className="bg-blue1 px-3 py-2 rounded-md text-white">
              {loading ? <Loader /> : "Create Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
