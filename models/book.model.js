const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  language: {
    type: String,
  },
  publicationYear: {
    type: Number,
  },
  descripton: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }, 
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
});

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;