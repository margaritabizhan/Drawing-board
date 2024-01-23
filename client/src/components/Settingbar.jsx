import React from "react";
import '../styles/toolbar.scss';
import toolState from "../store/toolState";

const SettingBar = () => {
  return (
    <div className="setting-bar">
      <label for="line-thk" style={{'margin-left': '5px'}}>Line Thickness</label>
      <input 
        onChange={(e) => toolState.setLineThickness(e.target.value)}
        type="number"  min={1} max={50} defaultValue={1} 
        name="line-thk" 
        style={{margin: '0 5px'}}></input>

      <label for="border-color">Border Color</label>
      <input 
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        type="color" style={{margin: '0 5px'}}
        name="border-color"></input>
    </div>
  );
}

export default SettingBar;