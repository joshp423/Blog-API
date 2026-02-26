import { useState, type SyntheticEvent } from "react";
import type { blogPost } from "../../../../types/blogPosts";

type AddCommentFormProps = {
  post: blogPost;
  onCommentAdd: () => Promise<void>; // returns promise that resolves to nothing
};

function AddCommentForm({ post, onCommentAdd }: AddCommentFormProps) {
  const [newCommentText, setNewCommentText] = useState("");

  async function newCommentAPI(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(newCommentText, sessionStorage.getItem("username"), post.id);
    const rsp = await fetch("https://blog-api-backend-jfv8.onrender.com/comments/new", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        text: newCommentText,
        username: sessionStorage.getItem("username"),
        postid: post.id,
      }),
    });
    if (rsp.status != 201) {
      return console.log(rsp.body);
    }
    await onCommentAdd();
    setNewCommentText("");
  }
  return (
    <div className="addCommentForm">
      <form onSubmit={newCommentAPI}>
        <label htmlFor="commentText">New Comment</label>
        <textarea
          name="commentText"
          id="commentText"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCommentForm;
