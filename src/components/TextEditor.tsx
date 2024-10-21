import { EditorState, convertToRaw, RichUtils } from "draft-js";
import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";

const TextEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    // カスタムスタイルマップを定義
    const customStyleMap = {
        'HIGHLIGHT': {
            background: 'yellow',
        },
    };

    // ハイライトを適用する関数
    const applyHighlight = () => {
        const newEditorState = RichUtils.toggleInlineStyle(
            editorState,
            'HIGHLIGHT'
        );
        setEditorState(newEditorState);

    };

    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        console.log('エディターの内容:', JSON.stringify(rawContentState, null, 2));
    }, [editorState]);




    return (
        <>
            <div className="editor">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleEditorStateChange}
                    customStyleMap={customStyleMap}
                    localization={{
                        locale: "ja",
                    }}
                />
                <button onClick={applyHighlight}>ハイライト</button>
            </div>


        </>
    );
};

export default TextEditor;