
import { useParams } from 'react-router';
import { useEffect, useState, useRef, type SyntheticEvent } from 'react';
import BundledEditor from '../../../../BundledEditor.tsx'
import type { Editor as TinyMCEEditor } from 'tinymce';
import { useNavigate } from "react-router-dom";


function EditBlogPostPage() {

    const { postId } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState<string>("");
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
          setText(data.blogPost.text);
          setTitle(data.blogPost.title);
          return;
        }
        fetchPost();
    }, [postId])

    const editorRef = useRef<TinyMCEEditor | null>(null);

    const updatePostAPI = async(e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editorRef.current) return;

        const rsp = await fetch(`http://localhost:3000/blogposts/edit`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            method: "PUT",
            body: JSON.stringify({
                id: Number(postId),
                text,
                title,
            }),
        });
        if (rsp.status != 201) {
            const data = await rsp.json();
            return console.log(data);
        }
        navigate(`/view-post/${postId}`)
        
    };

    return (
        <div className='blogPostEditor'>
            <form onSubmit={updatePostAPI}>
                <label htmlFor="title">Title: </label>
                <input type="text" value={title} id='title'onChange={(e) => setTitle(e.target.value)}/>
                <BundledEditor
                    onInit={(_: unknown, editor:TinyMCEEditor) => editorRef.current = editor}
                    value={text}
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
                    onEditorChange={(content) => setText(content)}
                />
                <button type="submit" >Update Post</button>
            </form>
        </div>
    );
}

export default EditBlogPostPage