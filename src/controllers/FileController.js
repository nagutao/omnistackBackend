const File = require('../models/file');
const Box = require('../models/box');
const showBox = require('./BoxController');

class fileController {
    async store(req, res){
        const box = await Box.findById(req.params.id);
        if (req.file == undefined) return res.send('undefined');
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit("file", file);

        return res.redirect('..');
    }
}

module.exports = new fileController;