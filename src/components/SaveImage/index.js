import React from 'react';

function SaveImage(props) {
    const {canvas} = props
    const downloadPhoto = (e) => {
        if (e.target.id === "jpeg") {
          const jpeg = canvas.toDataURL("image/jpeg");
          e.target.href = jpeg;
        } else if (e.target.id === "webp") {
          const webp = canvas.toDataURL("image/webp");
          e.target.href = webp;
        } else if (e.target.id === "svg") {
          const svg = canvas.toDataURL("image/svg");
          e.target.href = svg;
        } else {
          const png = canvas.toDataURL();
          e.target.href = png;
        }
      };
    return (
        <div className="dropdown">
        <button className="dropbtn">Save As</button>
        <div className="dropdown-content">
          <a
            className="btn btn-primary"
            id="png"
            href="#1"
            onClick={downloadPhoto}
            download="myImage.png"
          >
            .PNG
          </a>
          <a
            className="btn btn-primary"
            id="jpeg"
            href="#2"
            onClick={downloadPhoto}
            download="myImage.jpeg"
          >
            .JPEG
          </a>
          <a
            className="btn btn-primary"
            id="webp"
            href="#3"
            onClick={downloadPhoto}
            download="myImage.webp"
          >
            .WEBP
          </a>
          <a
            className="btn btn-primary"
            id="svg"
            href="#4"
            onClick={downloadPhoto}
            download="myImage.svg"
          >
            .SVG
          </a>
        </div>
      </div>
    );
}

export default SaveImage;