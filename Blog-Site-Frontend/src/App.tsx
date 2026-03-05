import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/nav";
import "./App.css";
import { type blogPost } from "./types/blogPosts";

const App = () => {
  const [blogPosts, setBlogPosts] = useState<blogPost[]>([]);
  const [loginStatus, setLoginStatus] = useState<boolean>(() =>
    Boolean(sessionStorage.getItem("loggedUser")),
  );
  const [display, setDisplay] = useState<string>("none");

  useEffect(() => {
    fetch("https://blog-api-backend-jfv8.onrender.com/blogPosts/view")
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
      <Outlet context={{ blogPosts: blogPosts, loginStatus: loginStatus }} />
    </>
  );
};

export default App;
