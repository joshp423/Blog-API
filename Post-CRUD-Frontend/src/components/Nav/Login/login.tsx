import { useState, type SyntheticEvent } from "react";
import { type Dispatch, type SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./login.css"

type LoginProps = {
  setLoginStatus: (status: boolean) => void; //function that takes a boolean and doesnt return anything
  setDisplay: Dispatch<SetStateAction<string>>;
  display: string;
};

function Login({ setLoginStatus, setDisplay, display }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function logInAPI(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const rsp = await fetch("https://blog-api-backend-jfv8.onrender.com/log-in/viewer", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
      const data = await rsp.json();
        if (data.message === "Successfully logged in") {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("loggedUser", data.username);
          setLoginStatus(true);
          console.log(data.message, data.username);
          setDisplay("none");
        } else {
          console.log(data.status, data.message);
        }
  }

  return (
    <div className={`loginForm ${display !== "none" ? "active" : ""}`}>
      <form onSubmit={logInAPI}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <a onClick={() => setDisplay("none")}>
        <FontAwesomeIcon icon={faX} />
      </a>
    </div>
  );
}

export default Login;
