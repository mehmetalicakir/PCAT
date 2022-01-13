const express = require('express');
const { path } = require('express/lib/application');
const app = express();

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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portundan başlatıldı.`);
});
