import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { blogPost } from "../../../types/blogPosts";
import type { comment } from "../../../types/commentType";
import Comment from "./Comments/comments";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  loginStatus: boolean;
};

function BlogPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<blogPost | null>(null);
  const [comments, setComments] = useState<comment[]>([]);
  const { loginStatus } = useOutletContext<OutletContextType>();

  function editPost() {
    navigate(`edit`);
  }

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch("https://blog-api-backend-jfv8.onrender.com/blogPosts/view/", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ blogpostId: Number(postId) }),
      });
      const data = await response.json();
      console.log(data);
      setPost(data.blogPost);
      return;
    }
    async function fetchComments() {
    const response = await fetch("https://blog-api-backend-jfv8.onrender.com/comments/view/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ postId: Number(postId) }),
    });
    const data = await response.json();
    console.log(data);
    setComments(data.comments);
    return;
  }

    fetchPost();
    fetchComments();
  }, [postId]); // dependency array

  if (!post) return <div>Loading...</div>;

  const postDate = new Date(post.timeposted);
  const date = postDate.toLocaleDateString();
  const time = postDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (loginStatus) {
    return (
      <div className="blogPostOverview">
        <h1>{post.title}</h1>
        <h2 dangerouslySetInnerHTML={{__html:post.text}}></h2>
        <p>
          {time} - {date}
        </p>
      <div className="blogPostEditDelete">
        <button onClick={editPost}>Edit Post</button>
      </div>
        <div className="commentsSection">
          <h2>Comments:</h2>
          {comments?.map((comment: comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }
}
    

export default BlogPost
