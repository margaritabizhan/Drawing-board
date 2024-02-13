import React from "react";
import '../styles/toolbar.scss';
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Button from 'react-bootstrap/Button';

const Toolbar = () => {

  const changeFillColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  };

  const downloadImage = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    console.log(dataUrl);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.userID + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clearCanvas = () => {
    const ctx = canvasState.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height);
  };

  return (
    <div className="toolbar">
      <style type="text/css">
        {`
          .btn-custom {
            background-color: purple;
            color: white;
          }
        `}
      </style>
      <button className="toolbar-btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
      <button className="toolbar-btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
      <button className="toolbar-btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
      <button className="toolbar-btn eraser"onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
      <button className="toolbar-btn line"onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>
      <input type="color" style={{marginLeft:10}} onChange={changeFillColor}/>
      <Button variant="custom" size="sm" className="clearall" onClick={() => clearCanvas()}>Erase All</Button>
      <button className="toolbar-btn undo" onClick={() => canvasState.undo()}></button>
      <button className="toolbar-btn redo" onClick={() => canvasState.redo()}></button>
      <button className="toolbar-btn save" onClick={() => downloadImage()}></button>
    </div>
  );
}

export default Toolbar;