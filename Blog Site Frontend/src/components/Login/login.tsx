import { useState, type SyntheticEvent } from "react";

type LoginProps = {
    setLoginStatus: (status: boolean) => void, //function that takes a boolean and doesnt return anything
    display: string
}

function Login({setLoginStatus, display}: LoginProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function logInAPI(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch('http://localhost:3000/log-in/viewer', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body:
                JSON.stringify(({ username, password}))
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "succesfully logged in") {
                localStorage.setItem("token", data.token);
                console.log(data.userCheck);
                setLoginStatus(true);
            } else {
                console.log("Login failed:", data.message);
            }
        })
        .catch((error) => console.error(error))
    }


    return (
        <div className="loginForm" style={{display: display}}>
            <form onSubmit={logInAPI}>
                <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                <button type="submit" ></button>
            </form>
        </div>
    )
}

export default Login;