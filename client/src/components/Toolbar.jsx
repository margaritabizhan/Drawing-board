import React from "react";
import '../styles/toolbar.scss';
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

const Toolbar = () => {

  const changeFillColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  };

  return (
    <div className="toolbar">
      <button className="toolbar-btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.userID))}></button>
      <button className="toolbar-btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.userID))}></button>
      <button className="toolbar-btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.userID))}></button>
      <button className="toolbar-btn eraser"onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
      <button className="toolbar-btn line"onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.userID))}></button>
      <input type="color" style={{marginLeft:10}} onChange={changeFillColor}/>
      <button className="toolbar-btn undo" onClick={() => canvasState.undo()}></button>
      <button className="toolbar-btn redo" onClick={() => canvasState.redo()}></button>
      <button className="toolbar-btn save"></button>
    </div>
  );
}

export default Toolbar;