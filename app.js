const express = require('express');
const ejs = require('ejs');

const { path } = require('express/lib/application');
const app = express();

// Template Engine
app.set('view engine', 'ejs');

const myLogger = (req, res, next) => {
  console.log('Middleware log 1');
  next();
};
const myLogger2 = (req, res, next) => {
  console.log('Middleware log 2');
  next();
};

// Middlewares
app.use(express.static('public'));
app.use(myLogger);
app.use(myLogger2);
const port = 3000;

//Toures
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portundan başlatıldı.`);
});
