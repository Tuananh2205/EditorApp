import React from 'react';

function Rotate(props) {
    const {drawImage} = props
    return (
        <div className="rotate-filter ">
        <form onSubmit={drawImage} id="rotate" className="form-group">
          <input
            type="number"
            placeholder="Rotate angle"
            id="inputRotate"
            className="form-control"
          />
          <button type="submit" className="btn btn-light">
            Rotate
          </button>
        </form>
      </div>
    );
}

export default Rotate;