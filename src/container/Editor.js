import React, {useState} from 'react';
import '../styles/Editor.css'
import '../components/UploadFille/index'
import UploadFile from '../components/UploadFille/index';
import UseCanvasImage from '../components/UseCanvasImage/index';
// import GetCropImage from '../components/GetCropImage/index'
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';


function Editor() {
    const [image, setImage] = useState()

    
    return (
        <>
            <UploadFile setFile={setImage} /> 
            <h1>IMAGE FIELD</h1>
            <div className="file-container container mt-3">
            {/* <img className="pic" src={image} alt="pic" /> */}
            {/* {image ? <UseCanvasImage imgsrc={image}/> : null } */}
                {/* <button onClick={displayImage}>Display</button> */}
                <UseCanvasImage imgsrc={image} />
            </div>    
        </>
    );
}

export default Editor;