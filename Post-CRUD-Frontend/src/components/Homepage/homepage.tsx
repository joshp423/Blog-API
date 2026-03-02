import BlogPostOverview from "./BlogPost/blogPostOverview";
import type { blogPost } from "../../types/blogPosts";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "./homepage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type OutletContextType = {
  blogPosts: blogPost[];
  loginStatus: boolean;
};

function Homepage() {
  const { blogPosts, loginStatus } = useOutletContext<OutletContextType>();

  if (loginStatus) {
    return (
      <div className="hpMain">
        <div className="titleNavHp">
          <div>
            <Link to="/new-post">New Blog Post</Link>
            <Link id="icon" to="/new-post"><FontAwesomeIcon icon={faPen} /></Link>
            
          </div>
          <h1>Blog Posts</h1>
        </div>
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
      <h3>Please log in to access editor.</h3>
    </div>
  )
  
}

export default Homepage;
