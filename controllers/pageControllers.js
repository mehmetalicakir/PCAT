const Photo = require('../models/Photo');

exports.aboutPage = (req, res) => {
    res.render('about');
}

exports.addPage = (req, res) => {
    res.render('add');
}

exports.videoPage = (req, res) => {
    res.render('video-page');
}
exports.editPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', {
        photo,
    });
}