import React from 'react';

function FlipImage(props) {
    const {drawImage} = props
    return (
        <div className="flip-filter">
        <button className="btn btn-light" id="flipH" onClick={drawImage}>
          Flip Horizontal
        </button>
        <button className="btn btn-light" id="flipV" onClick={drawImage}>
          Flip Vertical
        </button>
      </div>
    );
}

export default FlipImage;