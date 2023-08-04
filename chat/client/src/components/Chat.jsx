import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";

const Chat = () => {
  const { state } = useLocation();
  console.log(state);
  const [userlist, setUserlist] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [arr, setArr] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("welcome", (users) => {
      // console.log(users, "connect");
      setUserlist(users);
    });
    socket.on("message", (data) => {
      // console.log(data);
      setArr((prev) => [...prev, data.message]);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(arr);
    setArr((prev) => [...prev, msg]);
    socket.emit("send_message", {
      sender: state,
      receiver: selectedUser,
      message: msg,
    });
    setMsg("");
  };
  // console.log(arr);
  return (
    <>
      <div className="flex">
        <div>
          {userlist?.map((ele) => {
            return (
              <p key={crypto.randomUUID()} onClick={() => setSelectedUser(ele)}>
                {ele.username}
              </p>
            );
          })}
        </div>
        <div className="m-2">
          <p>{state}</p>
          <div className="border border-black h-[500px]">
            {arr?.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="border border-black mx-2 py-1 px-2"
              id="mssge"
              placeholder="Enter mssge..."
              name="mssge"
              onChange={(e) => setMsg(e.target.value)}
              value={msg || ""}
            />
            <button
              type="submit"
              className="py-1 px-2 bg-blue-600 text-white font-bold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
