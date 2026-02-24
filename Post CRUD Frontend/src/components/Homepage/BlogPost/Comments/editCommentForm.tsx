import type { blogPost } from "../../../../types/blogPosts";

type EditCommentFormProps = {
  post: blogPost;
};
//delete comment route needed
function EditCommentForm({ post }: EditCommentFormProps) {
  async function deleteCommentAPI() {
    // const rsp = await fetch("http://localhost:3000/comments/new", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     text: newCommentText,
    //     username: localStorage.getItem("username"),
    //     postid: post.id,
    //   }),
    // });
    // if (rsp.status != 201) {
    //   return console.log(rsp.body);
    // }
    
  }
  return (
    <div className="addCommentForm">
      <button onClick={deleteCommentAPI}>Delete Comment</button>
    </div> 
  );
}

export default EditCommentForm;
