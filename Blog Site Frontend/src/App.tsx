import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/nav';
import Login from './components/Login/login';
import './App.css'
import { type blogPost } from './types/blogPosts';

const App = () => {
  const [blogPosts, setBlogPosts] = useState<blogPost[]>([]);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>("none");

  useEffect(() => {
    fetch('http://localhost:3000/blogPosts/view')
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data.blogPosts);
        console.log(data);
      })
    .catch((error) => console.error(error))
  }, []);

  return (
    <>
      <Nav loginStatus={loginStatus} setDisplay={setDisplay} display={display} setLoginStatus={setLoginStatus} />
      <Login setLoginStatus={setLoginStatus} display={display} setDisplay={setDisplay}/>
      <Outlet context={{ blogPosts: blogPosts }}  />
    </>
  );
};

export default App
