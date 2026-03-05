import { type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import Login from "./Login/login";
import "./nav.css"

type NavProps = {
  setLoginStatus: (status: boolean) => void;
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>; // function that updates state of useState hook with a string
  loginStatus: boolean;
};
function Nav({ display, setDisplay, loginStatus, setLoginStatus }: NavProps) {
  const showLoginForm = () => {
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
          <Link to="/">Blog Post Editor</Link>
        </h1>
        <div className="navLinks">
          <h3>
            <Link to="/">Home</Link>
          </h3>
          <h3>
            <button onClick={logOut}>Log Out</button>
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
            style={{ display: display === "none" ? "flex" : "none" }}
          >
            Log In
          </button>
        </h3>
      </div>
      <Login
          setLoginStatus={setLoginStatus}
          display={display}
          setDisplay={setDisplay}
      />
    </div>
  );
}

export default Nav;
