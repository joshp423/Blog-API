import type { blogPost } from "../../../types/blogPosts";
import { useNavigate } from "react-router-dom";

type BlogPostOverviewProps = {
  post: blogPost;
};

// change strings to cut off text
function BlogPostOverview({ post }: BlogPostOverviewProps) {
  function goToPost() {
    navigate(`edit-post/${post.id}`, {
      state: { post },
    });
  }
  console.log(post.published)

  const navigate = useNavigate();
    const postDate = new Date(post.timeposted);
    const date = postDate.toLocaleDateString();
    const time = postDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  return (
    <div className="blogPostOverview">
      <h1>{post.title}</h1>
      <p>
        {time} - {date}
      </p>
      <button onClick={goToPost}>View and Edit Blog Post</button>
    </div>
  );
  
}
export default BlogPostOverview;
