import React from 'react';

function GreyScale(props) {
    const {drawImage} = props
    return (
        <div className="grey-scale-filter">
        <button className="btn btn-light" id="greyScale" onClick={drawImage}>
          Change Greyscale
        </button>
      </div>
    );
}

export default GreyScale;