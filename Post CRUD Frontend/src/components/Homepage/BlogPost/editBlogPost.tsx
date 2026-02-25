import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { blogPost } from "../../../types/blogPosts";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {Editor as TinyMCEEditor} from "tinymce"; 


function EditBlogPostPage() {

    
    const [post, setPost] = useState<blogPost | null>(null);
    const { postId } = useParams();
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
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
          setContent(data.blogPost.text);
          setTitle(data.blogPost.title);
          return;
        }
        fetchPost();
    }, [postId])
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };
    return (
        <div className='blogPostEditor'>
            <form action="">
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    value={post?.text || ""}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <button onClick={log}>Log editor content</button>
            </form>
        </div>
    );
}

export default EditBlogPostPage