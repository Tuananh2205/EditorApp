import React from 'react';
import '../styles/Editor.css'
import '../components/UploadFille/index'
import UploadFile from '../components/UploadFille/index';
function Editor(props) {
    return (
        <div className="Preview-component">
            <UploadFile /> 
        </div>
    );
}

export default Editor;