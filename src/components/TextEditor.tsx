import { EditorState, convertToRaw, Modifier, SelectionState } from "draft-js";
import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";

// モックAPI関数
const mockAPI = async (): Promise<string[]> => {
    // APIレスポンスをシミュレート
    await new Promise(resolve => setTimeout(resolve, 500));
    return ["ハイライト", "テスト", "API"];
};

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

    // 指定された文字列をハイライトする関数
    const highlightWords = (words: string[]) => {
        let contentState = editorState.getCurrentContent();
        const blockMap = contentState.getBlockMap();

        blockMap.forEach((block) => {
            if (block) {
                const text = block.getText();
                words.forEach((word) => {
                    let start = 0;
                    let index;
                    while ((index = text.indexOf(word, start)) > -1) {
                        start = index + word.length;
                        const selection = SelectionState.createEmpty(block.getKey())
                            .merge({
                                anchorOffset: index,
                                focusOffset: start,
                            });

                        contentState = Modifier.applyInlineStyle(
                            contentState,
                            selection,
                            'HIGHLIGHT'
                        );
                    }
                });
            }
        });

        const newEditorState = EditorState.push(
            editorState,
            contentState,
            'change-inline-style'
        );

        setEditorState(newEditorState);
    };

    // APIを呼び出してハイライトを適用する関数
    const applyHighlight = async () => {
        try {
            const wordsToHighlight = await mockAPI();
            highlightWords(wordsToHighlight);
        } catch (error) {
            console.error("APIエラー:", error);
        }
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