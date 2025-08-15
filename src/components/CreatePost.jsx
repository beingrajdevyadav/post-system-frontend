import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill-new';
import { useDispatch } from 'react-redux'

import 'react-quill-new/dist/quill.snow.css';

import "../css/editor.css"

const CreatePost = () => {
    const dispatch = useDispatch();
    const [mode, setMode] = useState("text"); // text | image | video | article

    const [text, setText] = useState('');
    const [articleHtml, setArticleHtml] = useState("");
    const fileRef = useRef();


    // on submit
    const submit = (e)=>{
        e.preventDefault();
        const fd = new FormData();

        fd.append("type", mode=== "article" ? "article": mode);
        fd.append("text", text);
        fd.append("articleHtml", articleHtml);

        if(fileRef.current?.files?.[0]) fd.append("media", fileRef.current.files[0]);
        dispatch(CreatePost(fd));

        setArticleHtml('');
        setText('');
        if(fileRef.current) fileRef.current.value = "";
    };

  return (
    <form action="" onSubmit={submit}>
        <div>
            <select value={mode} onChange={e=>setMode(e.target.value)} name="" id="">

                <option value="text">Text</option>
                <option value="image">Text + Image</option>
                <option value="video">Text + Video</option>
                <option value="article">Article</option>
            </select>
        </div>


        {
            mode === "article" ? (
                <ReactQuill 
                value={articleHtml} onChange={setArticleHtml} 
                placeholder='Write your article...'
                className='my-quill-editor'
                 />
            ):(
                <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} placeholder="What's on your mind?"></textarea>
            )
        }
    </form>
  )
}

export default CreatePost