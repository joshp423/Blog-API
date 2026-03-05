import { useState, type SyntheticEvent, type SetStateAction, type Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import LoginSubmitLoading from ".././Login/loginSubmitLoading";

type SignUpProps = {
  setDisplay: Dispatch<SetStateAction<string>>;
};

function Signup({setDisplay}:SignUpProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signupAPI(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const rsp = await fetch(`https://blog-api-backend-jfv8.onrender.com/sign-up`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (rsp.status != 201) {
      setLoading(false);
      return console.log("invalid sign-up");
    }
    setLoading(false);
    navigate(0);
  }
  
  return (
    <div>
      <form onSubmit={signupAPI}>
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

export default Signup;
