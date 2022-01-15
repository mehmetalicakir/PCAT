const express = require('express');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const { path } = require('express/lib/application');
const dotenv = require('dotenv');
dotenv.config();
const DBURL=process.env.DBURL

const app = express();
const port = 3000;
mongoose.connect(DBURL);



// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index',{
    photos
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
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.get('/photo-page/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.render('video-page');
  const photo = await Photo.findById(req.params.id)
  res.render('photo-page', {
    photo
  })
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portundan başlatıldı.`);
});
