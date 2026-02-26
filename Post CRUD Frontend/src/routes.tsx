import App from "./App";
import BlogPost from "./components/Homepage/BlogPost/blogPost";
import EditBlogPostPage from "./components/Homepage/BlogPost/editBlogPost";
import Homepage from "./components/Homepage/homepage";
import Signup from "./components/Signup/signUp";
import NewBlogPostPage from "./components/Homepage/BlogPost/newBlogPost";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "sign-up", element: <Signup /> },
      { path: "view-post/:postId", element: <BlogPost /> },
      { path: "view-post/:postId/edit", element: <EditBlogPostPage/> },
      { path: "new-post", element: <NewBlogPostPage/> },
    ],
  },
];

export default routes;
