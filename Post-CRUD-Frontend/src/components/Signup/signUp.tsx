import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signupAPI(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // const apiUrl = import.meta.env.VITE_API_URL;
    console.log(import.meta.env);
    const rsp = await fetch(`https://blog-api-backend-jfv8.onrender.com/sign-up`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (rsp.status != 201) {
      return console.log("invalid sign-up");
    }
    navigate("/");
  }

  return (
    <div className="signupForm">
      <form onSubmit={signupAPI}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
