import Tool from './Tool';

export default class Line extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen()
  };

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  };

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      shape: {
        type: 'line',
        x: this.startX,
        y: this.startY,
        x2: this.currentX,
        y2: this.currentY,
        color: this.ctx.fillStyle,
        thickness: this.ctx.lineWidth,
      }
    }));
  };

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.currentX = e.pageX - e.target.offsetLeft;
      this.currentY = e.pageY - e.target.offsetTop;
      this.draw(this.startX, this.startY, this.currentX, this.currentY);
    };
  };

  draw(xStart, yStart, xEnd, yEnd) {
    const img = new Image();
    img.src = this.saved;

    img.onload = () => {
      this.ctx.strokeStyle = this.ctx.fillStyle;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(xStart, yStart);
      this.ctx.lineTo(xEnd, yEnd);
      this.ctx.fill();
      this.ctx.stroke();
      console.log('drawing a line');
    };
  };

  static staticDraw(ctx, xStart, yStart, xEnd, yEnd, color, thickness) {
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.fill();
    ctx.stroke();
  };

};
