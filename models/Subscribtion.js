const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  username: String,
  topic: String,
});

const Subscribtion = mongoose.model('Subscribtion', schema);

exports.Subscribtion = Subscribtion;