import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { blogPost } from "../../../types/blogPosts";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';



function EditBlogPostPage() {
    const [post, setPost] = useState<blogPost | null>(null);
    const { postId } = useParams();
    useEffect(() => {
        async function fetchPost() {
          const response = await fetch("http://localhost:3000/blogPosts/view/", {
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
    }, [postId])
    const editorRef = useRef(null);
    const log = () => {
    };
    return (
        <>

        <Editor
            apiKey='your-api-key'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={post?.text}
            init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
        <button onClick={log}>Log editor content</button>
        </>
    );
}

export default EditBlogPostPage