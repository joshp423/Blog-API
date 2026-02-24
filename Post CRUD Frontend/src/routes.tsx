import App from './App';
import BlogPost from './components/Homepage/BlogPost/blogPost';
import Homepage from './components/Homepage/homepage';
import Signup from './components/Signup/signUp';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'sign-up', element: <Signup /> },
      { path: 'edit-post/:postId', element: <BlogPost />}
    ],
  },
];

export default routes;
