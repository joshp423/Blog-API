import { useState, useEffect } from "react";
import Nav from "./components/Nav/nav";
import Login from "./components/Login/login";
import { type blogPost } from "./types/blogPosts";

import "./App.css";

function App() {
  const [blogPosts, setBlogPosts] = useState<blogPost[]>([]);
  const [loginStatus, setLoginStatus] = useState<boolean>(() =>
    Boolean(sessionStorage.getItem("loggedUser")),
  );

  useEffect(() => {
    fetch("http://localhost:3000/blogPosts/view")
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data.blogPosts);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Nav
        loginStatus={loginStatus}
        setDisplay={setDisplay}
        display={display}
        setLoginStatus={setLoginStatus}
      />
      <Login
        setLoginStatus={setLoginStatus}
        display={display}
        setDisplay={setDisplay}
      />
      <Outlet context={{ blogPosts: blogPosts, loginStatus: loginStatus }} />
    </>
  );
}
export default App;
