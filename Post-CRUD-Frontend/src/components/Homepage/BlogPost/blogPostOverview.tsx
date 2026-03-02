import type { blogPost } from "../../../types/blogPosts";
import "./blogPost.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


type BlogPostOverviewProps = {
  post: blogPost;
};

// change strings to cut off text
function BlogPostOverview({ post }: BlogPostOverviewProps) {
  
    const postDate = new Date(post.timeposted);
    const date = postDate.toLocaleDateString();
    const time = postDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <a href={`view-post/${post.id}`}>
      <div className="blogPostOverview">
        <div>
          <h1>{post.title}</h1>
          <FontAwesomeIcon icon={faPen} />
        </div>
        
        <p>
          {time} - {date}
        </p>
      </div>
    </a>
  );
  
}
export default BlogPostOverview;
