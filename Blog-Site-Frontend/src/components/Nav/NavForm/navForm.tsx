import { type Dispatch, type SetStateAction } from "react";
import Login from "./Login/login";
import Signup from "./Signup/signUp";
import "./navForm.css"

type NavProps = {
  setLoginStatus: (status: boolean) => void;
  setDisplay: Dispatch<SetStateAction<string>>; // function that updates state of useState hook with a string
    formType: string;
};

function NavForm({setDisplay, setLoginStatus, formType}:NavProps){
    if (formType === "Login") {
    
        return (
            <Login
            setLoginStatus={setLoginStatus}
            setDisplay={setDisplay}
            />
        )
    }
    return (
        <Signup 
          setDisplay={setDisplay}
        />
    )
}

export default NavForm