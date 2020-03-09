const express = require('express');
const _ = require('lodash');

const { Subscribtion } = require('../models/Subscribtion');
const { User } = require('../models/User');
const { Topic } = require('../models/Topic');

const router = express.Router();


router.get('/', async (req, res, next) => {
  subList = await Subscribtion.find();
  res.json(subList);
});

router.post('/', async (req, res, next) => {
  const user = await User.findOne({ name: req.body.username });
  const topic = await Topic.findOne({ name: req.body.topic });
  if (!user || !topic) {
    return res.json({
      message: 'Please send a username and an topic name correctly!',
    });
  }
  sub = await Subscribtion.create(req.body);
  res.json(sub);
});

module.exports = router;