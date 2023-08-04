import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("new_user", name);
    navigate("/chat", { state: name });
  };
  return (
    <div>
      <form
        className="flex flex-col w-[30%] mx-auto border border-black p-2 mt-10 "
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl text-center">
          Enter the username you want to use in chat room:
        </h1>
        <input
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          className="border border-black px-2 py-1 rounded-md mx-2"
          placeholder="enter your name"
          name="name"
          id="name"
        />
        <button
          type="submit"
          className="bg-blue-600 w-28 mx-auto my-2 text-white font-semibold py-1 px-2 rounded-md"
        >
          enter room
        </button>
      </form>
    </div>
  );
};

export default Home;
