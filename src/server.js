const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.io('connectRoom', box =>{
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@rocketbox-n21ym.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

server.listen(3333);