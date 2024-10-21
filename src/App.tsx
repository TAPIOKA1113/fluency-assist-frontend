import React from "react";
import "./App.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import TextEditor from "./components/TextEditor";


function App() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <TextEditor />
    </div>
  )
}


export default App;
