const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    const messageObject = JSON.parse(msg);

    switch(messageObject.method) {
      case 'new-connection':
        connectionHandler(ws, messageObject);
        break;

      case 'draw':
        broadcastMessage(ws, messageObject);
        break
      
      case 'clearAll':
        console.log(messageObject);
        broadcastMessage(ws, messageObject);
        break;
    };
  });
});

// app.post('/image', (req, res) => {
//   try {
    
//   }catch (e) {
//     console.log(e);
//     return res.status(500).json({message: 'Server error'});
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const connectionHandler = (ws, msg) => {
  console.log('New user ', msg.username, ' joined with user ID: ', msg.id);
  ws.id = msg.id;
  broadcastMessage(ws, msg);
};

const broadcastMessage = (ws, msg) => {
  expressWs.getWss().clients.forEach(client => {
    if(client.id === msg.id) {
      console.log(msg);
      client.send(JSON.stringify(msg));
    };
  });
};