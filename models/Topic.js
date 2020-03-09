const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
});
const Topic = mongoose.model('Topic', schema);

exports.Topic = Topic;