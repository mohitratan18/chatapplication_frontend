/* eslint-disable no-unused-vars */
import React from "react";
import { CiUser } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
const OnlineUsers = ({ _id, name, email, roomData, setroomData, socketId ,setMsg}) => {
  const user = {
    _id,
    name,
    email,
    socketId,
  };
  const handleroomdata = async () => {
    console.log(socketId);
    setroomData({
      ...roomData,
      room: "test",
      receiver: user,
    });
    const url = `${import.meta.env.VITE_backend_url}/api/message/${_id}`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(await response.json()); 
    const res = await response.json();
    // console.log(setAllMsg);
    setMsg(res.messages.messages);
  };
  return (
    <div className="flex gap-4 cursor-pointer">
      <CiUser size={59} />
      <div
        className="flex flex-col border-b-[#dad6d6] border-b w-full"
        onClick={handleroomdata}
      >
        <p className="font-bold text-lg">{name}</p>
        <p className="font-thin text-md">{email}</p>
      </div>
    </div>
  );
};

export default OnlineUsers;
