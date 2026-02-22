import type { blogPost } from "../../../types/blogPosts"
import { useNavigate } from "react-router-dom";

type BlogPostOverviewProps = {
    post: blogPost;
}


// change strings to cut off text
function BlogPostOverview({ post }: BlogPostOverviewProps) {

    

    function goToPost() {
        navigate(`posts/${post.id}`, {
            state: {post}
        })
    }

    const navigate = useNavigate();
    if (post.published === true) {
        return(
        <div className="blogPostOverview">
            <h1>{post.title}</h1>
            <p>Posted at {String(post.timeposted)}</p>
            <p>comment amount</p>
            <button onClick={goToPost}>See Post</button>
        </div>
        )
    }
    return
    
}

export default BlogPostOverview