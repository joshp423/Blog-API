import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/nav";
import Login from "./components/Login/login";
import { type blogPost } from "./types/blogPosts";
import "./App.css";

function App() {
  const [blogPosts, setBlogPosts] = useState<blogPost[]>([]);
  const [loginStatus, setLoginStatus] = useState<boolean>(() =>
    Boolean(sessionStorage.getItem("loggedUser")),
  );

  const [display, setDisplay] = useState<string>("none");


  useEffect(() => {
    async function getBlogPosts() {
      const rsp = await fetch("https://blog-api-backend-jfv8.onrender.com/blogPosts/view", {
         headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          });
          const data = await rsp.json();
          setBlogPosts(data.blogPosts);
      }
      getBlogPosts()
  });

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
