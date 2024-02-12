import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import '../styles/canvas.scss';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  //Modal to login
  const [modal, setModal] = useState(true);
  //Get the id from the url
  const params = useParams();

  //Initialize the canvas
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);
  
  useEffect(() => {
    if(canvasState.username) {
      const socket = new WebSocket('ws://localhost:3001');
      canvasState.setSocket(socket);
      canvasState.setUserID(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      
      //Connect to the server with id and username
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'new-connection'
        }));
      };
      //Receive the data from the server
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch(msg.method) {
          case 'new-connection':
            console.log(`User ${msg.username} connected`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
          
          case 'clearAll':
            const ctx = canvasState.canvas.getContext('2d');
            ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height);
            break;
        }
      };
    };
  }, [canvasState.username]);
  
  const handleNewConnection = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  //Draw the shapes received from the server
  const drawHandler = (msg) => {
    const shape = msg.shape;
    const ctx = canvasRef.current.getContext('2d');
    
    switch(shape.type) {
      case 'brush':
        Brush.draw(ctx, shape.x, shape.y, shape.color, shape.thickness);
        break;

        case 'finish-brush':
          ctx.beginPath();
          break;

        case 'rect':
          Rect.staticDraw(ctx, shape.x, shape.y, shape.width, shape.height, shape.color, shape.outlineColor, shape.thickness);
          break;

        case 'circle':
          Circle.staticDraw(ctx, shape.x, shape.y, shape.radius, shape.color, shape.outlineColor, shape.thickness);
          break;

        case 'line':
          Line.staticDraw(ctx, shape.x, shape.y, shape.x2, shape.y2, shape.color, shape.thickness);
          break;

        case 'eraser':
          Eraser.draw(ctx, shape.x, shape.y, shape.thickness);
          break;

        case 'finish-eraser':
          ctx.beginPath();
          break;
    };
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  };

  return (
    <div className="canvas">
      <style type="text/css">
        {`
          .btn-custom {
            background-color: purple;
            color: white;
          }
        `}
      </style>
       <Modal show={modal} onHide={() => {}}>
        <Modal.Header >
          <Modal.Title>Welcome, please log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter username" ref={usernameRef} />  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="custom" onClick={handleNewConnection}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

      <canvas 
        onMouseDown={() => mouseDownHandler()}
        width={600} height={400} ref={canvasRef}></canvas>
    </div>
  );
});

export default Canvas;
