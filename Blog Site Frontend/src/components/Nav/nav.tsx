import { type Dispatch, type SetStateAction } from "react";
import { Link } from 'react-router-dom';

type NavProps = {
    setLoginStatus: (status: boolean) => void,
    display: string,
    setDisplay: Dispatch<SetStateAction<string>>, // function that updates state of useState hook with a string
    loginStatus: boolean
}
function Nav({display, setDisplay, loginStatus, setLoginStatus}: NavProps) {
   
    const showLoginForm = () => {
        setDisplay(prev => (prev === "none" ? "flex" : "none"));
    }

    const logOut = () => {
        setLoginStatus(false);
        localStorage.clear();
    }

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
                    <button onClick={showLoginForm} style={{display: display === "none" ? "flex" : "none"}}>Log In</button>
                </h3>
                <h3>
                    <Link to='sign-up'>Sign Up</Link>
                </h3>
            </div>
        </div>
    );
}

export default Nav;
