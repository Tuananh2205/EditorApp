import React, { useRef, useState } from "react";
import "./index.css";
import FlipImage from "../FlipImage/index"
import GreyScale from "../GreyScale/index"
import Rotate from "../Rotate/index"
import CropImage from "../CropImage/index";
import ControlText from "../ControlText";
import SaveImage from "../SaveImage";
import Reset from "../Reset/index"
function UseCanvasImage(props) {
  const { imgsrc } = props;
  const canvasRef = useRef(null);
  const [text, setText] = useState({ content: "", x: 0, y: 0 });
  const [src, setSrc] = useState(undefined);
  const [des, setDes] = useState({});
  const [isFirstPoint, setIsFirstPoint] = useState(true);
  // const [rotateAngle, setRotateAngle] = useState(0);
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = imgsrc;
  image.onload = () => {
    // drawText();
    //Resize Image befor upload <Lack of>
  };

  const flipHorizontal = (array, width) => {
    // console.log(array);
    function splitArray(array, part) {
      let tmp = [];
      for (let i = 0; i < array.length; i += part) {
        const sliced = array.slice(i, i + part);
        tmp.push(sliced);
      }
      return tmp;
    }
    let newArr = [];
    const output = splitArray(array, 4 * width);
    const newOutput = output.map((row) => {
      const pixel = splitArray(row, 4);
      return pixel.reverse();
    });
    for (let item of newOutput) {
      for (let i = 0; i < item.length; i++) {
        for (let element of item[i]) {
          newArr.push(element);
        }
      }
    }

    // console.log(newArr);

    return newArr;
  };

  const flipVerticle = (array, width) => {
    const output = [];
    const channel = 4;
    let row = [];
    let counter = 0;
    let max = width * channel;

    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      row.push(item);
      if (counter + 1 === max) {
        output.push(row);
        row = [];
        counter = -1;
      }
      counter++;
    }
    // console.log(output.reverse());
    let newArr = [];
    // console.log("output", output.reverse());
    for (let item of output.reverse()) {
      for (let element of item) {
        newArr.push(element);
      }
    }
    // console.log(newArr);
    return newArr;
  };

  const convertToGreyscale = (array) => {
    const output = [];
    const channel = 4;
    let row = [];
    let counter = 0;
    let max = channel;

    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      row.push(item);
      if (counter + 1 === max) {
        output.push(row);
        row = [];
        counter = -1;
      }
      counter++;
    }
    for (let item of output) {
      const gray = 0.2126 * item[0] + 0.7152 * item[1] + 0.0722 * item[2];
      item[0] = gray;
      item[1] = gray;
      item[2] = gray;
    }
    let newArr = [];
    for (let item of output) {
      for (let element of item) {
        newArr.push(element);
      }
    }
    return newArr;
  };

  async function drawText() {
    const canvas = canvasRef.current;
    const ctx = await canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.font = "30px 'Montserrat'";
    ctx.fillText(text.content, text.x, text.y);
    console.log(text.content, text.x, text.y);
  }

  const showXYCoords = (evt) => {
    const canvas = canvasRef.current;
    console.log(canvas);
    const mousePos = getMousePos(canvas, evt);
    alert(`Mouse Position at X: ${mousePos.x} and at Y: ${mousePos.y}`);
    if (isFirstPoint === true) {
      console.log(mousePos.x + "," + mousePos.y);
      setSrc({ sx: mousePos.x, sy: mousePos.y });
      setIsFirstPoint(false);
      console.log("isfp after set: ", isFirstPoint);
    } else {
      setDes({ dx: mousePos.x, dy: mousePos.y });
      setIsFirstPoint(true);
      console.log("src", src);
      console.log("des", des);
    }
    function getMousePos(canvas, evt) {
      // var modelX = Math.round( evt.screenX * (canvas.width / canvas.offsetWidth) );
      // var modelY = Math.round( evt.screenY * (canvas.height / canvas.offsetHeight) );
      // console.log("model X: ", modelX, " " , "model Y: ", modelY)
      // var displayX = Math.round( modelX * (canvas.offsetWidth / canvas.width) );
      // var displayY = Math.round( modelY * (canvas.offsetHeight / canvas.height) );
      // console.log("display X: ", displayX, " " , "display Y: ", displayY)
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }
  };

  async function drawImage(e) {
    const canvas = canvasRef.current;
    if (e === "initial") {
      const canvas = canvasRef.current;
      let ctx = await canvas.getContext("2d");
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      ctx.save();
      
    } else {
      if (!canvas) {
        console.log("Canvas not found");
      } else {
        e.preventDefault();
        let ctx = canvas.getContext("2d");
        console.log("ctx saved");
        if (image) {
          if (e.target.id === "reset") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            console.log(canvas.width, canvas.height);
            ctx.drawImage(
              image,
              0,
              0,
              image.width,
              image.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
          }

          let imgData = await ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          //---------filter--------------
          let pixelArr = imgData.data;
          let filter = e.target.id;
          let dataChange;
          switch (filter) {
            case "flipH":
              dataChange = flipHorizontal(pixelArr, canvas.width);
              imgData.data.set(dataChange);
              ctx.putImageData(imgData, 0, 0);
              break;
            case "flipV":
              dataChange = flipVerticle(pixelArr, canvas.width);
              imgData.data.set(dataChange);
              ctx.putImageData(imgData, 0, 0);
              break;
            case "greyScale":
              dataChange = convertToGreyscale(pixelArr);
              imgData.data.set(dataChange);
              ctx.putImageData(imgData, 0, 0);
              break;
            case "crop":
              e.preventDefault();
              doCrop(e);
              break;
            case "rotate":
              console.log("ctx restored");
              e.preventDefault();
              // doRotate(rotateAngle);
              doRotate(e.target.inputRotate.value);
              break;
            default:
              break;
          }
        }
      }
    }
  }


  const changeText = (e) => {
    console.log(e.target.name)
    setText((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    console.log(text);
    // console.log("🚀 ~ file: index.js ~ line 282 ~ changeText ~ e.target.value", e.target.value)
  };
  const showOnImage = (e) => {
    e.preventDefault();
    drawText();
    
  };
  // const showOnImage = (e) => {
  //   e.preventDefault();
  //   console.log('fsafsdf');
  //   console.log(e.target.txt_color.value);
  //   drawText();
  // };

  if (imgsrc != null) {
    drawImage("initial");
  }

  const doCrop = async (e) => {
    const canvas = canvasRef.current;
    console.log("width vs height: ", canvas.width, canvas.height);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sourceX = e.target[0].value;
    const sourceY = e.target[1].value;
    const sourceWidth = image.width;
    const sourceHeight = image.height;
    const destWidth = canvas.width;
    const destHeight = canvas.height;
    const destX = e.target[2].value;
    const destY = e.target[3].value;
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      destWidth,
      destHeight
    );
  };

  let currentAngle = 0;
  let isFirstRun = true;
  const doRotate = (angle) => {
    if (isFirstRun) {
      isFirstRun = false;
      currentAngle = parseInt(angle);
    }
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    console.log(ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const x = 0;
    const y = 0;
    const radians = (Math.PI / 180) * currentAngle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    ctx.rotate((currentAngle * Math.PI) / 180);
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      -nx,
      -ny,
      canvas.width,
      canvas.height
    );
    currentAngle = currentAngle + parseInt(angle);
  };

  // const changeAngle = e => {
  //   setRotateAngle(e.target.value)
  // }

  return (
    <div className="present-container">
      <Reset drawImage={drawImage} />
      {/* --------------------------------------------------------- */}
      <br />
      <canvas id="my_canvas" ref={canvasRef} width={600} height={400} style={{ border: "1px solid black" }} onClick={showXYCoords}/>
      {/* --------------------------------------------------------- */}
      <SaveImage canvas={canvasRef.current} />
      {/* --------------------------------------------------------- */}
      <FlipImage drawImage={drawImage}/>
      {/* --------------------------------------------------------- */}
      <GreyScale drawImage={drawImage}/>
      {/* --------------------------------------------------------- */}
      <Rotate drawImage={drawImage}/>
      {/* --------------------------------------------------------- */}
      <CropImage drawImage={drawImage} />
      {/* --------------------------------------------------------- */}
      <ControlText changeText={changeText} showOnImage={showOnImage} />
    </div>
  );
}

export default UseCanvasImage;
