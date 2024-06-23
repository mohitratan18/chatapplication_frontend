/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import ChatList from "../ChatList/ChatList";
import SearchBar from "../SearchBar/SearchBar";
import ChatBox from "../ChatBox/ChatBox";
// import { socket } from "../../Socket";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { useRef } from "react";
import OnlineUsers from "../OnlineUsers/OnlineUsers";

const Home = () => {
  // const {state} = useLocation();
  let state = {};
  const [msg, setmsg] = useState("");
  const [roomData, setroomData] = useState({
    room: null,
  });
  const [AllMsg, setAllMsg] = useState([])
  const [onlineUsers, setonlineUsers] = useState([]);
  const [isConnected, setisConnected] = useState(true);
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const socketref = useRef();



  useEffect(() => {
    if (!sessionStorage.getItem("auth-token")) {
      navigate("/login");
    }
    // console.log(state);
    setuser(jwtDecode(sessionStorage.getItem("auth-token")));
    state = jwtDecode(sessionStorage.getItem("auth-token"));
    const socket = io.connect(import.meta.env.VITE_backend_url);
    socketref.current = socket;
    socket.on("connect", () => setisConnected(true));
    socket.off("disconnect", () => setList(false));
    // console.log(socket);
  }, []);

  useEffect(() => {
    if (isConnected) {
      socketref.current.emit("ADD_USER", state);
      socketref.current.on("USERS_ADDED", (data) => {
        setonlineUsers(data);
      });
    }
    socketref.current.on("RECEIVE_MSG",(data)=>{
      // console.log(data);
      // setAllMsg((prevdata)=>[...prevdata,data]);
      setAllMsg((prevdata)=>{
        // console.log(prevdata);
        return [...prevdata,data]
      })
    })

    return () => socketref.current.disconnect();
  }, [isConnected]);



  const sendmessage = (e) => {
    // e.prevent.default();
    e.preventDefault();
    // console.log(socketref.current);
    if (socketref.current.connected) {
      if (msg) {
        let USER = user;
        USER.socketId = socketref.current.id;
        const data = {
          msg,
          receiver: roomData.receiver,
          sender: USER,
        };
        // console.log(data);
        socketref.current.emit("SEND_MESSAGE", data);
      }
    }
    // console.log(AllMsg);
    setmsg("");
  };


  const setMsg = (data)=>{
    setAllMsg(data);
  }
  // const [List, setList] = useState([]);
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-2 h-[100vh] p-8 bg-[#f5f7fb] overflow-y-scroll shadow-xl">
        <div className="bg-white p-2 pl-6 pr-6 rounded-3xl flex justify-between mb-5">
          <div>
            <p className="font-sans font-bold text-lg">{user.name}</p>
            <p>{user.email}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
        <SearchBar />

        <div role="tablist" className="tabs tabs-lifted mt-8">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="CHATS"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex flex-col gap-14 bg-white p-5 rounded-3xl">
              {/* {List.map((data, key) => {
                return <ChatList {...data} key={key} />;
              })} */}
              {onlineUsers
                .filter((ele) => ele._id !== user._id)
                .map((data, index) => {
                  // console.log(data);
                  return (
                    <OnlineUsers
                      {...data}
                      key={index}
                      roomData={roomData}
                      setroomData={setroomData}
                      setMsg={setMsg}
                    />
                  );
                })}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Online "
            checked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-10"
          >
            {onlineUsers
              .filter((ele) => ele._id !== user._id)
              .map((data, index) => {
                return (
                  <OnlineUsers
                    {...data}
                    key={index}
                    roomData={roomData}
                    setroomData={setroomData}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div className="col-span-6 bg-[#f5f7fb] p-8 pb-0">
        <ChatBox
          roomData={roomData}
          setmsg={setmsg}
          sendmessage={sendmessage}
          msg={msg}
          AllMsg={AllMsg}
          user={user}
        />
      </div>
    </div>
  );
};

export default Home;
