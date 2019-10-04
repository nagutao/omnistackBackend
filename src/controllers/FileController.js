const File = require('../models/file');
const Box = require('../models/box');

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

        // return res.redirect('..');
        return res.json(file);
    }
}

module.exports = new fileController;