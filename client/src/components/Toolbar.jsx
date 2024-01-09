import React from "react";
import '../styles/toolbar.scss';
import Brush from "../tools/Brush";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button className="toolbar-btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
      <button className="toolbar-btn rect"></button>
      <button className="toolbar-btn circle"></button>
      <button className="toolbar-btn eraser"></button>
      <button className="toolbar-btn line"></button>
      <input type="color" style={{marginLeft:10}} />
      <button className="toolbar-btn undo"></button>
      <button className="toolbar-btn redo"></button>
      <button className="toolbar-btn save"></button>
    </div>
  );
}

export default Toolbar;