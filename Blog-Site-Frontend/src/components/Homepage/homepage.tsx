import BlogPostOverview from "./BlogPost/blogPostOverview";
import type { blogPost } from "../../types/blogPosts";
import { useOutletContext } from "react-router-dom";
import "./homepage.css"

type OutletContextType = {
  blogPosts: blogPost[];
};

function Homepage() {
  const { blogPosts } = useOutletContext<OutletContextType>();

  return (
    <div className="hpMain">
      <h1>All Blog Posts</h1>
      <div className="blogContent">
        {blogPosts?.map((post) => (
          <BlogPostOverview key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
