const Author = require('../models/author.model');
const Category = require('../models/category.model');

const express = require('express');
const Book = require('../models/book.model');

const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const books = await Book.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('author')
      .populate('category');

    const count = await Book.count();
  
    res.status(200).json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
    
  }
  catch(err) {
    res.status(400).json({ "Error": "Error happened, please try again" });
  }

});


bookRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id).populate('author').populate('category');
  
    if(!book) {
      return res.status(404).json({ Error: "There is no such book" });
    }
  
    res.status(200).json(book);
  }
  catch (err) {
    return res.status(404).json({ Error: "There is no such book" });
  }

});

bookRouter.post('/', async (req, res) => {
  if(!req.body.name || 
    !req.body.ISBN || 
    !req.body.language || 
    !req.body.publicationYear || 
    !req.body.category || 
    !req.body.author){
    return res.status(404).json({ Error: "Missing some data" });
  }

  const author = await Author.findById(req.body.author);
  const category = await Category.findById(req.body.category);

  if(!author || !category){
    return res.status(404).json({ Error: "Author or category don't exist" });
  }

  const newBook = await new Book({
    name: req.body.name,
    ISBN: req.body.ISBN,
    language: req.body.language,
    publicationYear: req.body.publicationYear,
    description: req.body.description,
    author: req.body.author,
    category: req.body.category
  })

  await newBook.save().then(() => res.status(201).json(newBook));
});

bookRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try{
    const book = await Book.findByIdAndDelete(id);

    res.status(201).send('The book has been deleted');
  }
  catch(err){
    return res.status(404).json({ Error: "There is no such book" })
  }
});

bookRouter.put('/:id', async (req, res) => {
  try {
    const editedBook = await Book.findById(req.params.id);
    console.log(req.params.id, editedBook);
  
    editedBook.name = req.body.name || editedBook.name;
    editedBook.ISBN = req.body.ISBN || editedBook.ISBN;
    editedBook.language = req.body.language || editedBook.language;
    editedBook.publicationYear = req.body.publicationYear || editedBook.publicationYear;
    editedBook.description = req.body.description || editedBook.description;
  
    await editedBook.save().then(() => res.status(200).json(editedBook));
  }
  catch(err) {
    return res.status(404).json({ Error: "There is no such book" });
  }
});

module.exports = bookRouter;