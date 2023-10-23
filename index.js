const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRouter = require('./routers/book.router');
const authorRouter = require('./routers/author.router');
const categoryRouter = require('./routers/category.router');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('Pong!')
})

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/categories', categoryRouter);


mongoose.connect(MONGODB_URI).then( () => {
  console.log('The server has been connected a database');
  app.listen(PORT, () => {
    console.log(`The server has been started on http://localhost:${PORT}`);
  })
})
.catch(() => console.log(`The server can't connect a database`))
