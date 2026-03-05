import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { blogPost } from "../../../types/blogPosts";
import type { comment } from "../../../types/commentType";
import Comment from "./Comments/comments";
import { useOutletContext } from "react-router-dom";
import AddCommentForm from "./Comments/addCommentForm";
import "./blogPost.css"

type OutletContextType = {
  loginStatus: boolean;
};

function BlogPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<blogPost | null>(null);
  const [comments, setComments] = useState<comment[]>([]);
  const { loginStatus } = useOutletContext<OutletContextType>();

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

    if (comments.length > 0) {
      return (
        <div className="blogPost">
          <div className="blogPostTitle">
            <h1>{post.title}</h1>
            <p>
              {time} - {date}
            </p>
          </div>
          <div className="blogPostContent">
            <h2>{post.author}</h2>
            <div dangerouslySetInnerHTML={{__html:post.text}}></div>
          </div>
          
          <div className="commentsSection">
            <h2>Comments:</h2>
            {comments?.map((comment: comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <AddCommentForm post={post} onCommentAdd={fetchComments} />
        </div>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      );
    }

    return (
      <div className="blogPost">
        <div className="blogPostTitle">
          <h1>{post.title}</h1>
          <p>
            {time} - {date}
          </p>
        </div>
        <div className="blogPostContent">
          <h2>{post.author}</h2>
          <div dangerouslySetInnerHTML={{__html:post.text}}></div>
        </div>

        <div className="commentsSection">
          <h2>No Comments</h2>
          <AddCommentForm post={post} onCommentAdd={fetchComments} />
        </div>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    );
  }

  if (comments.length > 0) {
      return (
        <div className="blogPost">
          <div className="blogPostTitle">
            <h1>{post.title}</h1>
            <p>
              {time} - {date}
            </p>
          </div>
          <div className="blogPostContent">
            <h2>{post.author}</h2>
            <div dangerouslySetInnerHTML={{__html:post.text}}></div>
          </div>
          
          <div className="commentsSection">
            <h2>Comments:</h2>
            {comments?.map((comment: comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </div>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      );
    }

    return (
      <div className="blogPost">
        <div className="blogPostTitle">
          <h1>{post.title}</h1>
          <p>
            {time} - {date}
          </p>
        </div>
        <div className="blogPostContent">
          <h2>{post.author}</h2>
          <div dangerouslySetInnerHTML={{__html:post.text}}></div>
        </div>

        <div className="commentsSection">
          <h2>No Comments</h2>
        </div>

        <button onClick={() => navigate('/')}>Back</button>
      </div>
    );
  }




export default BlogPost;
