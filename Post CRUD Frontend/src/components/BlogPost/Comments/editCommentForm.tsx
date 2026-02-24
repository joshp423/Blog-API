import { useState, type SyntheticEvent } from "react";
import type { blogPost } from "../../../types/blogPosts";

type AddCommentFormProps = {
  post: blogPost;
};

function AddCommentForm({ post }: AddCommentFormProps) {
  async function deleteCommentAPI() {
    const rsp = await fetch("http://localhost:3000/comments/new", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        text: newCommentText,
        username: localStorage.getItem("username"),
        postid: post.id,
      }),
    });
    if (rsp.status != 201) {
      return console.log(rsp.body);
    }
    await onCommentAdd();
  }
  return (
    <div className="addCommentForm">
      <button onClick={deleteCommentAPI}>Remove Comment</button>
    </div>
  );
}

export default AddCommentForm;
