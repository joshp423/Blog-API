import { useState, type SyntheticEvent } from "react";
import type { blogPost } from "../../../../types/blogPosts";
import { useNavigate } from "react-router-dom";


type AddCommentFormProps = {
    post: blogPost
}

function AddCommentForm({ post }: AddCommentFormProps) {
    const navigate = useNavigate();
    const [newCommentText, setNewCommentText] = useState('');

    async function newCommentAPI(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const rsp = await fetch('http://localhost:3000/comments/new', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "POST",
            body:
                JSON.stringify({
                    text: newCommentText,
                    userid: localStorage.getItem("userId"),
                    postid: post.id
                })
        })
        if (rsp.status != 201) {
            return console.log(rsp.body)
        }
        navigate(-1)


    }
    return (
        <div className="addCommentForm">
            <form onSubmit={newCommentAPI}>
                <label htmlFor="commentText">New Comment</label>
                <textarea name="commentText" id="commentText" onChange={e => setNewCommentText(e.target.value)}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
    
}

export default AddCommentForm