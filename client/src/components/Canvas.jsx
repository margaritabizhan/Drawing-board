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

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  //Modal to login
  const [modal, setModal] = useState(true);
  //Get the id from the url
  const params = useParams();

  //Initialize the canvas and brush as default tool
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current))
  }, []);
  
  useEffect(() => {
    if(canvasState.username) {
      const socket = new WebSocket('ws://localhost:3001');
      canvasState.setSocket(socket);
      canvasState.setUserID(params.id);
      
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
        console.log(msg);
        switch(msg.method) {
          case 'new-connection':
            console.log(`User ${msg.username} connected`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      };
    };
  }, [canvasState.username]);
  
  const handleNewConnection = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  const drawHandler = (msg) => {
    
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
