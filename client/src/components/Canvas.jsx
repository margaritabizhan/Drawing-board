import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import '../styles/canvas.scss';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';

const Canvas = observer(() => {
  const canvasRef = useRef()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current))
  }, []);

  return (
    <div className="canvas">
      <canvas width={600} height={400} ref={canvasRef}></canvas>
    </div>
  );
});

export default Canvas;
