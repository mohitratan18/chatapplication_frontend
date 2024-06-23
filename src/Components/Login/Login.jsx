/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; 

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async()=>{
    console.log("kaise ho");
    const url = `${import.meta.env.VITE_backend_url}/api/auth/login`;
    console.log(url);
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password}),
    });
    const res = await response.json();
    // console.log(await response.json());
    if(res.status == true){
      sessionStorage.setItem('auth-token',res.authtoken);
      const user = jwtDecode(sessionStorage.getItem("auth-token"));
      // console.log(user);
      navigate('/',{state : user});
    }
    else{
      alert(res.message);
    }
  }
  return (
    <div className=" md:bg-[#f6f9fb] flex items-center justify-center h-[100vh] w-[100vw] ">
      <div
        className="bg-[#ffffff] flex flex-col gap-20 h-full w-full
        rounded-2xl p-12 md:p-20  md:h-[80%] md:w-[500px] drop-shadow-md"
      >
        <h1 className="text-center font-san text-3xl">CHAT APPLICATION</h1>
        <div className="text-center font-sans text-xl">
          Connect with your Family
        </div>
        <div className="flex flex-col gap-5">
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <button className="btn btn-primary btn-wide" onClick={handleLogin}>Login</button>
          <p className="p-5">
            Not a member yet?{" "}
            <Link to="/signup" className="text-blue-400">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
