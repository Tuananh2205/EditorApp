import React from "react";

function Reset(props) {
    const {drawImage} = props
    return (
    <div>
      <button className="btn btn-primary" id="reset" onClick={drawImage}>
        Reset
      </button>
    </div>
  );
}

export default Reset;
