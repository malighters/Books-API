const express = require('express');
const Author = require('../models/author.model');

const authorRouter = express.Router();

authorRouter.get('/', async (req, res) => {
  const authors = await Author.find();

  res.status(200).json(authors);
});


authorRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findById(id);
    if(!author) {
      return res.status(404).json({ Error: "There is no such author" });      
    }
    res.json(author);
  }
  catch (err) {
    return res.status(404).json({ Error: "There is no such author" });
  }

});

authorRouter.post('/', async (req, res) => {
  if(!req.body.fullName || !req.body.birthYear){
    return res.status(404).json({ Error: "Missing some data" });
  }

  const newAuthor = new Author({
    fullName: req.body.fullName,
    birthYear: req.body.birthYear,
    description: req.body.description || ''
  });

  await newAuthor.save().then(() => res.status(201).json(newAuthor));
});

authorRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try{ 
    const author = await Author.findByIdAndDelete(id);
    res.status(201).send('The author has been deleted');
  }
  catch(err) {
    res.status(404).json({ Error: "There is no such author" });
  }
});

authorRouter.put('/:id', async (req, res) => {
  try{
    const editedAuthor = await Author.findById(req.params.id);

    editedAuthor.fullName = req.body.fullName || editedAuthor.fullName;
    editedAuthor.birthYear = req.body.birthYear || editedAuthor.birthYear;
    editedAuthor.description = req.body.description || editedAuthor.description;
    
    await editedAuthor.save().then(() => res.status(200).json(editedAuthor));
  }
  catch(err) {
    return res.status(404).json({ Error: "There is no such author" });
  }
    
});

module.exports = authorRouter;