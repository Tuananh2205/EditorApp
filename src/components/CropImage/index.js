import React from 'react';

function CropImage(props) {
    const {drawImage} = props
    return (
        <div>
            <form id="crop" className="crop-filter" onSubmit={drawImage}>
        <label>Start position:</label>

        <div className="form-row">
          <div className="col">
            <input className="form-control" type="text" placeholder="Input x" />
          </div>
          <div className="col">
            <input className="form-control" type="text" placeholder="Input y" />
          </div>
        </div>
        <br></br>
        <label>End position:</label>
        <div className="form-row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              placeholder="Input x'"
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              type="text"
              placeholder="Input y'"
            />
          </div>
        </div>
        <button className="btn btn-light">Crop</button>
      </form>
        </div>
    );
}

export default CropImage;