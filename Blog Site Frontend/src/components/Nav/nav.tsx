import { type Dispatch, type SetStateAction } from "react";
import { Link } from 'react-router-dom';

type NavProps = {
    display: string,
    setDisplay: Dispatch<SetStateAction<string>>, // function that updates state of useState hook with a string
    loginStatus: boolean
}
function Nav({display, setDisplay, loginStatus}: NavProps) {
   
    const showLoginForm = () => {
        setDisplay(prev => (prev === "none" ? "flex" : "none"));
    }

    if  (loginStatus) {
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
                        <button  >LogOut</button>
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
            </div>
        </div>
    );
}

export default Nav;
