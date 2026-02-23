import type { comment } from "../../../../types/commentType";

type CommentProps = {
    comment: comment
}


function Comment({comment}:CommentProps) {
    return (
        <div>
            <h2>{comment.text}</h2>
        </div>
    )
}

export default Comment