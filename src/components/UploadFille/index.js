import React, { useState } from 'react';
import './index.css';
// import '../CropImage/index'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// import CropImage from '../CropImage/index';
import ConvertPhoto from '../ConvertPhoto/index';

function UploadFile(props) {
	const [file, setFile] = useState(null);
	const [crop, setCrop] = useState({ aspect: 16 / 9 });
	const changeImage = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]));
	};

	const displayImage = (e) => {
		e.preventDefault();
		const image = e.target;
		if (image === file) return image;
	};

	const handleOnCropChange = (crop) => {
		console.log(crop);
		setCrop(crop);
	};

	const handlePhotoLoaded = (image) => {
		console.log(image);
	};

	const handleOnCropComplete = (crop, pixelCrop) => {
		console.log(crop, pixelCrop);
	};

	return (
		<div className="preview-container">
			<form className="file-select-frm" onSubmit={displayImage}>
				<input className="file_input" type="file" onChange={changeImage}></input>
			</form>
			<h1>IMAGE FIELD</h1>
			<div className="file-container">
				{/* <img className="pic" src={file} alt="pic" /> */}
				{/* <br /> */}
				{/* <ConvertPhoto image={file} /> */}
				<ReactCrop
					className="pic"
					src={file}
					crop={crop}
					onChange={handleOnCropChange}
					onImageLoaded={handlePhotoLoaded}
					onComplete={handleOnCropComplete}
				/>
			</div>
		</div>
	);
}

export default UploadFile;
