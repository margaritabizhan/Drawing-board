import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  username = '';
  socket = null;
  userID = null;

  constructor() {
    makeAutoObservable(this)
  };

  setUsername(username) {
    this.username = username;
  };

  setSocket(socket) {
    this.socket = socket;
  };
  
  setUserID(id) {
    this.userID = id;
  };

  setCanvas(canvas) {
    this.canvas = canvas;
  };

  pushToUndo(action) {
    this.undoList.push(action);
  };

  pushToRedo(action) {
    this.redoList.push(action);
  };

  undo(){
    let ctx = this.canvas.getContext('2d');
    if(this.undoList.length !== 0) {
      const dataUrl = this.undoList.pop();
      let img = new Image();
      img.src = dataUrl;

        img.onload = () => {
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
      this.redoList.push(this.canvas.toDataURL());
    };
  };

  redo(){
    let ctx = this.canvas.getContext('2d');
    if(this.redoList.length !== 0) {
      const dataUrl = this.redoList.pop();
      let img = new Image();
      img.src = dataUrl;

        img.onload = () => {
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
      this.undoList.push(this.canvas.toDataURL());
    };
  };
};

export default new CanvasState();