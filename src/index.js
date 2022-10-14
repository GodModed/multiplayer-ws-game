const express = require('express');
const app = express(); // Create an express app
const port = 3000; // Set the port to listen on
var generateName = require('sillyname'); // Import the random-name package
const readline = require('readline'); // Import the readline package

// set views to public folder

app.use(express.static('public'));

// require socket.io and pass the express app
const io = require('socket.io')(
    app.listen(port)
);

let players = [];
let circles = [];
const logs = [];

io.on("connection", (socket) => {

    logs.push("PLAYER CONNECTED: " + socket.id);

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

    socket.on("disconnect", () => {
        players = players.filter((player) => player.id !== socket.id);
        io.emit("playerDisconnected", socket.id);
        circles = circles.filter((circle) => circle.id !== socket.id);
        logs.push("PLAYER DISCONNECTED: " + socket.id);
    });

    socket.on("draw", (data) => {
        circles.push(data);
        io.emit("draw", data);
    })

    socket.emit("players", players);
    socket.emit("circles", circles);

})

setInterval(() => {
    io.emit("players", players);
}, 1000 / 144);

// create a console interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startConsole() {
    rl.question('> ', (commandString) => {
        const command = commandString.split(' ')[0];
        const args = commandString.split(' ').slice(1);

        if (command === 'reload') {
            console.log("Forcinng all online players to reload the page...");
            io.emit('command', 'reload', null);
        }

        if (command === 'clear') {
            console.log("Clearing the drawing board...");
            io.emit('command', 'clear', null);
            circles = [];
        }

        if (command === 'js') {
            console.log("Executing JavaScript code for all online players...");
            io.emit('command', 'js', args);
        }
        
        if (command === 'logs') {
            console.log(logs.join("\n"));
        }

        startConsole();
    })
}

startConsole();