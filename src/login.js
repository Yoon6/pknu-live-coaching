import React, { useContext, useState } from "react";
import { User } from "./User";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserStore";
// import { useHistory } from "react-router-dom";
import "./tailwindcss.css";

function Login() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [id, setId] = useState("");

  const onChange = (e) => {
    setId(e.target.value);
  };

  const onClick = () => {
    let user = new User(id, "");
    context.setUsername(id);
    console.log(user);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
      navigate("/workspace");
    }
  };

  return (
    <div>
      <div className="flex m-40">
        <h1
          className="
                m-auto
                text-6xl
                text-blue-600
                font-semibold
            "
        >
          PKNU LIVE COACHING
        </h1>
      </div>
      <div className="m-10"></div>
      <input
        className="
                  form-control
                  block 
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-auto
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
        onChange={onChange}
        value={id}
        placeholder="Username"
        onKeyPress={onKeyPress}
      />
      <div className="m-10"></div>
      <Link to="/workspace">
        <button
          className="py-2 px-4 block rounded-lg shadow-md text-white bg-blue-600 m-auto hover:bg-blue-800"
          onClick={onClick}
          onKeyPress={onKeyPress}
        >
          Login
        </button>
      </Link>
    </div>
  );
}

export default Login;
