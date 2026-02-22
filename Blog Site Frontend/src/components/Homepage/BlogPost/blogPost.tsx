import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { blogPost } from "../../../types/blogPosts";

function BlogPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<blogPost | null>(null);

    useEffect(() => {
        async function fetchPost() {
            const response = await fetch('http://localhost:3000/blogPosts/view/', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body:
                JSON.stringify({ blogpostId: Number(postId) })
        })
            const data = await response.json();
            console.log(data)
            setPost(data.blogPost);
        }

        fetchPost();
    }, [postId]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="blogPostOverview">
            <h1>{post.title}</h1>
            <h1>{post.text}</h1>
            <p>Posted at {String(post.timeposted)}</p>
            <p>comment amount</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}

export default BlogPost;