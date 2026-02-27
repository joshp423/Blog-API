import { useState, type SyntheticEvent } from "react";
import { type Dispatch, type SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type LoginProps = {
  setLoginStatus: (status: boolean) => void; //function that takes a boolean and doesnt return anything
  setDisplay: Dispatch<SetStateAction<string>>;
  display: string;
};

function Login({ setLoginStatus, setDisplay, display }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function logInAPI(e: SyntheticEvent<HTMLFormElement>) {
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
          console.log(data.message);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="loginForm" style={{ display: display }}>
      <form onSubmit={logInAPI}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
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
