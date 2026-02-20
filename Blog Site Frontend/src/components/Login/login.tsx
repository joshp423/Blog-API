
function Login() {
    function logInAPI()
     {

    }

    return (
        <div className="loginForm">
            <form onSubmit={logInAPI}>
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default Login;