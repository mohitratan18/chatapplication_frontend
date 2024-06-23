/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className=" md:bg-[#f6f9fb] flex items-center justify-center h-[100vh] w-[100vw] shadow-2xl">
      <div
        className="bg-[#ffffff] flex flex-col gap-20 h-full w-full
        rounded-2xl p-10 md:p-20  md:h-[80%] md:w-[500px] "
      >
        <h1 className="text-center font-san text-3xl">CHAT APPLICATION</h1>
        <div className="text-center font-sans text-xl">Lets get started</div>
        <div className="flex flex-col gap-5">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />
           <TextField
            id="outlined-basic"
            label="Phoneno"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <div className="flex flex-col items-center">
          <button className="btn btn-primary btn-wide">Signup</button>
          <p className="p-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
