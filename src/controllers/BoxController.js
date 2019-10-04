const Box = require('../models/box');

class boxController {
    async store(req, res) {
        const box = await Box.create({ title: req.body.title });

        return res.json(box);
    }

    async show(req, res){
        const show = await Box.findById(req.params.id).populate({
            path: 'files',
            options:  { sort: {createdAt: -1} }
        });
        return res.json(show);
    }
}

module.exports = new boxController;