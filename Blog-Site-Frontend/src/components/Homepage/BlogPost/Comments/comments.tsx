import type { comment } from "../../../../types/commentType";
import "./comments.css";
type CommentProps = {
  comment: comment;
};

function Comment({ comment }: CommentProps) {
  const commentDate = new Date(comment.timeposted);
  const date = commentDate.toLocaleDateString();
  const time = commentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="comment">
      <h3>{comment.username}</h3>
      <h2>{comment.text}</h2>
      <p>
        {time} - {date}
      </p>
    </div>
  );
}

export default Comment;
