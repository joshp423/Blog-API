import BlogPostOverview from "./BlogPost/blogPostOverview";
import type { blogPost } from "../../types/blogPosts";
import { useOutletContext } from "react-router-dom";
import Signup from "../Signup/signUp";

type OutletContextType = {
  blogPosts: blogPost[];
  loginStatus: boolean;
};

function Homepage() {
  const { blogPosts, loginStatus } = useOutletContext<OutletContextType>();

  if (loginStatus) {
    return (
      <div className="hpMain">
        <div className="blogContent">
          {blogPosts?.map((post) => (
            <BlogPostOverview key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="hpMainNLI">
      <h1>Blog Post Editor</h1>
      <Signup />
    </div>
  )
  
}

export default Homepage;
