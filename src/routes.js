const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const path = require('path');

const routes = express.Router();

const boxController = require('./controllers/BoxController');
const fileController = require('./controllers/FileController');

routes.post('/boxes', boxController.store);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), fileController.store);
routes.get('/boxes/:id', boxController.show);
routes.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

module.exports = routes;