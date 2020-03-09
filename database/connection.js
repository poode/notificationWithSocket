const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notifications', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('database is connected'))
  .catch(e => console.log('Error ===> ', e));