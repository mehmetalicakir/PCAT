const express = require('express');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const { path } = require('express/lib/application');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
const DBURL = process.env.DBURL;

const app = express();
const port = 3000;
mongoose.connect(DBURL);

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

//Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos,
    });
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.get('/video-page', (req, res) => {
    res.render('video-page');
});

const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.post('/photos', async (req, res) => {
    let uploadedImage = req.files.image;
    let UploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

    uploadedImage.mv(UploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
});

app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', {
        photo,
    });
});

app.get('/photo-page/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo-page', {
        photo,
    });
});

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photo-page/${req.params.id}`);
});

app.delete('/photo-page/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage =  __dirname + '/public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove({ _id: req.params.id });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portundan başlatıldı.`);
});
