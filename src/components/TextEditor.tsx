import { EditorState } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    return (
        <div className="editor">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                localization={{
                    locale: "ja",
                }}
            />
        </div>
    );
};

export default TextEditor;