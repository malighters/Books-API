const express = require('express');
const Category = require('../models/category.model');

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});


categoryRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if(!category) {
      return res.status(404).json({ Error: "There is no such category" });
    }

    res.json(category);
  }
  catch (err) {
    return res.status(404).json({ Error: "There is no such category" });
  }
});

categoryRouter.post('/', async (req, res) => {
  if(!req.body.name){
    return res.status(404).json({ Error: "Missing some data" });
  }

  const newCategory = new Category({
    name: req.body.name,
  });

  await newCategory.save().then(() => res.status(201).json(newCategory));
});

categoryRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try{
    const category = await Category.findByIdAndDelete(id);
    res.status(201).send('The category has been deleted');
  }
  catch(err) {
    res.status(404).json({ Error: "There is no such category" })
  }
});

categoryRouter.put('/:id', async (req, res) => {
  try{
    const editedCategory = await Category.findById(req.params.id);
  
    editedCategory.name = req.body.name || editedCategory.name;
  
    await editedCategory.save().then(() => res.status(200).json(editedCategory));
  }
  catch(err) {
    return res.status(404).json({ Error: "There is no such category" });
  }
});

module.exports =  categoryRouter;