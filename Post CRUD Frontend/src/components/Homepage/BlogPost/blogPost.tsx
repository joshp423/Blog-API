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

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch("http://localhost:3000/blogPosts/view/", {
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
    const response = await fetch("http://localhost:3000/comments/view/", {
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
        <h1>{post.text}</h1>
        <p>
          {time} - {date}
        </p>
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
