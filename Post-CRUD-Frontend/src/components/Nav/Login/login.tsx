import { useState, type SyntheticEvent } from "react";
import { type Dispatch, type SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./login.css"
import { jwtDecode } from "jwt-decode";
import LoginSubmitLoading from "./loginSubmitLoading";

type JwtPayload = {
  id: number;
  username: string;
  iat: number;
  exp: number;
}
type LoginProps = {
  setLoginStatus: (status: boolean) => void; //function that takes a boolean and doesnt return anything
  setDisplay: Dispatch<SetStateAction<string>>;
  display: string;
};

function Login({ setLoginStatus, setDisplay, display }: LoginProps) {

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function logInAPI(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    try {
      const rsp = await fetch("https://blog-api-backend-jfv8.onrender.com/log-in/editor", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!rsp.ok) {
        const text = await rsp.text();
        console.error(text)
        setLoading(false);
        return;
      }
      const data = await rsp.json();
        if (data.message === "Successfully logged in") {
          const decoded = jwtDecode<JwtPayload>(data.token);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("username", decoded.username);
          sessionStorage.setItem("loggedUser", decoded.username);
          setLoginStatus(true);
          setDisplay("none");
        } else {
          console.log(data.message);
        }
    } catch (err) {
      console.error(err);
  } finally {
    setLoading(false)
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
        <LoginSubmitLoading 
          loading={loading}
        />
      </form>
      <a onClick={() => setDisplay("none")}>
        <FontAwesomeIcon icon={faX} />
      </a>
    </div>
  );
}

export default Login;
