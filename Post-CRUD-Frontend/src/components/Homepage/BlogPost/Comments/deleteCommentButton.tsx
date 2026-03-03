import type { comment } from "../../../../types/commentType";
import {useNavigate} from 'react-router-dom'

type deleteCommentButtonProps = {
  comment: comment;
};
//delete comment route needed
function DeleteCommentButton({ comment }: deleteCommentButtonProps) {

  const navigate = useNavigate()

  async function deleteCommentAPI() {
    const rsp = await fetch("https://blog-api-backend-jfv8.onrender.com/comments/delete", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      method: "DELETE",
      body: JSON.stringify({
        commentId: comment.id,
      }),
    });
    const data = await rsp.json()
    if (rsp.status != 200) {
      return console.log(data.message);
    }
    navigate(0);
    return;
    
  }
  return (
    <div className="deleteCommentButton">
      <button onClick={deleteCommentAPI}>Delete Comment</button>
    </div> 
  );
}

export default DeleteCommentButton;
