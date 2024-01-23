import { makeAutoObservable } from 'mobx';

class ToolState {
  tool = null;
  constructor() {
    makeAutoObservable(this)
  };

  setTool(tool) {
    this.tool = tool;
  };

  setFillColor(color) {
    this.tool.fillColor = color;
  };

  setLineThickness(thickness) {
    this.tool.lineThickness = thickness;
  };

  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }

};

export default new ToolState();