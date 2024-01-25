import Brush from './Brush';

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas);
  };

  draw(x, y) {
    this.ctx.save();
    this.ctx.strokeStyle = 'white';
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.restore();
    console.log('drawing with eraser');
  };
};