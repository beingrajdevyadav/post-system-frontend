import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

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
    <div>CreatePost</div>
  )
}

export default CreatePost