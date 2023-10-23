const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  birthYear: {
    type: Number,
  },
  descripton: {
    type: String,
  },
});

authorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;