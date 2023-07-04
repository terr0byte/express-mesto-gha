const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(value) {
        return ((value.length <= 30) && (value.length >= 2));
      },
      message: 'name should be 2 to 30 characters long',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(value) {
        return ((value.length <= 30) && (value.length >= 2));
      },
      message: 'about should be 2 to 30 characters long',
    },
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
