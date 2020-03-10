const express = require('express');
const router = express.Router();

const { validate } = require('../middelwares/validator');
const addUserSchema = require('../requestschema/addUserSchema.json');
const { User } = require('../models/User');
const { Subscribtion } = require('../models/Subscribtion');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const userList = await User.find();
  res.json(userList);
});

router.get('/username/:username', async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    res.status(404).json({ message: 'The username is not found!'});
  }
  res.json(user);
});

router.post('/', validate(addUserSchema), async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(409).json({ message: 'The username is already exists!' });
  }
  const createdUser = await User.create({ username: req.body.username });
  res.json(createdUser);

});

router.put('/username/:username', validate(addUserSchema), async (req, res, next) => {
  const userFound = await User.findOne({ name: req.body.username });
  if (userFound) {
    return res.status(409).json({ message: 'this user is already exists please use new  username!'});
  }
  const user = await User.findOneAndUpdate({ username: req.params.username }, { username: req.body.username }, { new: true });
  if(!user) {
    return res.status(404).json({ message: 'user is not found!' });
  }
  const udpatedSub = await Subscribtion.updateMany({ username: req.params.username }, { username: req.body.username });
  res.json({ message: 'done', user, numberOfUpdatedSubscribtions: udpatedSub.nModified } );
});

router.delete('/username/:username', async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if(!user) {
    return res.status(404).json({ message: 'user is not found' });
  }
  const numberOfSub = await Subscribtion.deleteMany({ username: req.params.username });
  await User.deleteOne({ username: req.params.username });
   res.json({ message: 'Deleted!', data: { deletedUser: user, numberOfSubscribtionsDeleted: numberOfSub.deletedCount } });
});

module.exports = router;
