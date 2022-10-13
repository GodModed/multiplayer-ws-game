const express = require('express');
const app = express(); // Create an express app
const port = 3000; // Set the port to listen on
var generateName = require('sillyname'); // Import the random-name package

// set views to public folder

app.use(express.static('public'));

// require socket.io and pass the express app
const io = require('socket.io')(
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
);

let players = [];

io.on("connection", (socket) => {

    const player = {
        id: socket.id,
        x: 0,
        y: 0,
        name: generateName(),
        color: "0x" + Math.floor(Math.random() * 16777215).toString(16),
    };

    players.push(player);

    socket.on("update", (data) => {
        player.x = data.x;
        player.y = data.y;
    })

    console.log("CONNECT", socket.id);
    socket.on("disconnect", () => {
        players = players.filter((player) => player.id !== socket.id);
        console.log("DISCONNECT", socket.id);
        io.emit("playerDisconnected", socket.id);
    });

    socket.on("draw", (data) => {
        io.emit("draw", data);
    })

})

setInterval(() => {
    io.emit("players", players);
}, 1000 / 144);