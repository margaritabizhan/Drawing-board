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
  return (
    <div className="toolbar">
      <button className="toolbar-btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
      <button className="toolbar-btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
      <button className="toolbar-btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
      <button className="toolbar-btn eraser"onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
      <button className="toolbar-btn line"onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>
      <input type="color" style={{marginLeft:10}} />
      <button className="toolbar-btn undo"></button>
      <button className="toolbar-btn redo"></button>
      <button className="toolbar-btn save"></button>
    </div>
  );
}

export default Toolbar;