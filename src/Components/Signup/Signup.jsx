/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    const data = {
      name,
      email,
      phoneno,
      password,
    };
    const url = import.meta.env.VITE_backend_url + "/api/auth/signup"
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(await response.json());
    const res = await response.json();
    if(res.status){
      alert("ACCOUNT CREATE PLEASE LOGIN");
      navigate('/login');
    }
  };
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
            onChange={(e) => setname(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Phoneno"
            variant="outlined"
            onChange={(e) => setphoneno(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <button className="btn btn-primary btn-wide" onClick={handleSignup}>
            Signup
          </button>
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
