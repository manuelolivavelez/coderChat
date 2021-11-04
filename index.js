const express = require('express')
const app = express()
const router = require('./routes/index')

let msn = [
    {
        nombre:'Manuel',
        msn:'Hola'
    },
    {
        nombre:'Jimena',
        msn:'Hola'
    },
    {
        nombre:'Carlos',
        msn:'Hola'
    }
]

app.use(express.static(__dirname + '/public'))


const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 3003


const { Server } = require('socket.io')
const io = new Server(server)


io.on('connection', (socket) => {

    console.log('Cliente conectado');

    socket.on('message_client', (data) => {
        console.log(data);
    })

    socket.on('dataMsn', (data) => {
        msn.push(data);
        console.log(msn);
        io.sockets.emit('message_back', msn)
    })

});

app.use('/api', router);

server.listen(3003, () => {
    console.log('Server run on port' + port);
})