const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
});
const User = mongoose.model('User', schema);

exports.User = User;