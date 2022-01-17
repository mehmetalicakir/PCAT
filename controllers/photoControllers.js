const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1;
    const photosPerPage = 2;
    const totalPhotos = await Photo.find().countDocuments();
    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photosPerPage)
    .limit(photosPerPage);


    //console.log(req.query);
    //const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos: photos,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerPage)
    });
}

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photo-page/${req.params.id}`);
}

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo-page', {
        photo,
    });
}

exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    let uploadedImage = req.files.image;
    let UploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

    uploadedImage.mv(UploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
}

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage =  __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove({ _id: req.params.id });
    res.redirect('/');
}