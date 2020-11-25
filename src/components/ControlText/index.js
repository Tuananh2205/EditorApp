import React from 'react';

function ControlText(props) {
    const {changeText, showOnImage} = props
    return (
        <div>
            <form className="comment-filter" onSubmit={showOnImage}>
        <label>Text</label>
        <div className="form-row">
          <div className="col">
            <input
              className="form-control"
              name="content"
              type="text"
              placeholder="Fill content"
              onChange={changeText}
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              name="x"
              type="number"
              placeholder="Text Position (X)"
              onChange={changeText}
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              name="y"
              type="number"
              placeholder="Text Position (Y)"
              onChange={changeText}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
        </div>
    );
}

export default ControlText;