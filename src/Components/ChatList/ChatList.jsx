/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ChatList = ({ name, photo, lastmessage, time }) => {
  return (
    <div className="flex gap-5 cursor-pointer">
      <div>{photo}</div>
      <div className="flex flex-col justify-center items-start gap-1 border-b-[#dad6d6] border-b w-full">
        <div className="flex justify-between w-full">
          <div className="font-bold text-xl">{name}</div>
          <div className="font-bold ">{time}</div>
        </div>
        <div className="font-thin text-s">{lastmessage}</div>
      </div>
    </div>
  );
};

export default ChatList;
