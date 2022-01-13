const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const photo = {
        id: 1,
        name: "photo",
        description: "Photo description"
    }
  res.send('İstek Alındı.');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portundan başlatıldı.`);
});
