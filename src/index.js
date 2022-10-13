const express = require('express');
const app = express(); // Create an express app
const port = 3000; // Set the port to listen on

// set views to public folder

app.use(express.static('public'));

// require socket.io and pass the express app
const io = require('socket.io')(
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
);