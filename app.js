const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const { path } = require('express/lib/application');
const dotenv = require('dotenv');
dotenv.config();
const DBURL = process.env.DBURL;
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers.js');
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
app.use(methodOverride('_method', {methods: ['POST', 'GET'],}));

//

//Routes
app.get('/', photoControllers.getAllPhotos);
app.get('/about', pageControllers.aboutPage);
app.get('/add', pageControllers.addPage);
app.get('/video-page', pageControllers.videoPage);
app.post('/photos', photoControllers.createPhoto);
app.get('/photos/edit/:id', pageControllers.editPage);
app.get('/photo-page/:id', photoControllers.getPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photo-page/:id', photoControllers.deletePhoto);

app.listen(port, () => {
    console.log(`Sunucu ${port} portundan başlatıldı.`);
});
