import type { comment } from "../../../../types/commentType";
type deleteCommentButtonProps = {
  comment: comment;
};
//delete comment route needed
function DeleteCommentButton({ comment }: deleteCommentButtonProps) {
  async function deleteCommentAPI() {
    const rsp = await fetch("http://localhost:3000/comments/delete", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      method: "GET",
      body: JSON.stringify({
        commentId: comment.id,
      }),
    });
    if (rsp.status != 201) {
      return console.log(rsp.body);
    }
    
  }
  return (
    <div className="addCommentForm">
      <button onClick={deleteCommentAPI}>Delete Comment</button>
    </div> 
  );
}

export default DeleteCommentButton;
