import { useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import NavForm from "./NavForm/navForm";

type NavProps = {
  setLoginStatus: (status: boolean) => void;
  Display: string;
  setDisplay: Dispatch<SetStateAction<string>>; // function that updates state of useState hook with a string
  loginStatus: boolean;
};

function Nav({ Display, setDisplay, loginStatus, setLoginStatus }: NavProps) {
  const [formType, setFormType] = useState("");

  const showLoginForm = () => {
    setFormType("Login");
    setDisplay((prev) => (prev === "none" ? "flex" : "none"));
  };

  const showSignUpForm = () => {
    setFormType("Signup");
    setDisplay((prev) => (prev === "none" ? "flex" : "none"));
  };

  const logOut = () => {
    setLoginStatus(false);
    sessionStorage.clear();
  };

  if (loginStatus) {
    return (
      <div className="navBar">
        <h1>
          <Link to="/">Blog Site</Link>
        </h1>
        <div className="navLinks">
          <h3>
            <Link to="/">Home</Link>
          </h3>
          <h3>
            <button onClick={logOut}>LogOut</button>
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="navBar">
      <h1>
        <Link to="/">Blog Site</Link>
      </h1>
      <div className="navLinks">
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <h3>
          <button
            onClick={showLoginForm}
            style={{ display: Display === "none" ? "flex" : "none" }}
          >
            Log In
          </button>
        </h3>
        <h3>
          <button
            onClick={showSignUpForm}
            style={{ display: Display === "none" ? "flex" : "none" }}
          >
            Sign Up
          </button>
        </h3>
      </div>
      <div className={`navForm ${Display !== "none" ? "active" : ""}`}>
        <NavForm
          setDisplay={setDisplay}
          setLoginStatus={setLoginStatus}
          formType={formType}
        />
      </div>
    </div>
  );
}

export default Nav;
