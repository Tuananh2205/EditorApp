import React from 'react';
import './index.css';
function CropImage(props) {
	return (
		<div>
			<h3>CropImage Editor</h3>
			<form>
				<label>Width:</label>
				<input placeholder="Input here"></input>
				<label>Width:</label>
				<input placeholder="Input here"></input>
				<button>Set Crop</button>
			</form>
		</div>
	);
}

export default CropImage;
