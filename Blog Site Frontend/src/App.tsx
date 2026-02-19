import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css'

const App = () => {
  const [blogPosts, setBlogPosts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/blogPosts/view')
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data);
        console.log(data);
      })
    .catch((error) => console.error(error))

  }, []);

  return (
    <>
      <Outlet context={{ blogPosts } }  />
    </>
  );
};

export default App
