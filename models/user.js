const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => ((this.minlength < value) && (this.maxlength > value)),
      message: 'name should be 2 to 30 charachters long',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => ((this.minlength < value) && (this.maxlength > value)),
      message: 'about should be 2 to 30 charachters long',
    },
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
