import BlogPostOverview from "./BlogPost/blogPostOverview";
import type { blogPost } from "../../types/blogPosts";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

type OutletContextType = {
  blogPosts: blogPost[];
  loginStatus: boolean;
};

function Homepage() {
  const { blogPosts, loginStatus } = useOutletContext<OutletContextType>();

  if (loginStatus) {
    return (
      <div className="hpMain">
        <Link to="/new-post">New Blog Post</Link>
        <h1>Blog Posts:</h1>
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
      <h3>Please log in or sign up to access editor</h3>
    </div>
  )
  
}

export default Homepage;
