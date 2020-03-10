const express = require('express');
const _ = require('lodash');

const { validate } = require('../middelwares/validator');
const addSubscriptionSchema = require('../requestschema/addSubscriptionSchema.json');
const findSubsSchema = require('../requestschema/findSubsSchema.json');

const { Subscribtion } = require('../models/Subscribtion');
const { User } = require('../models/User');
const { Topic } = require('../models/Topic');

const router = express.Router();


router.get('/', async (req, res, next) => {
  subList = await Subscribtion.find();
  res.json(subList);
});

router.get('/find', validate(findSubsSchema), async (req, res, next) => {
  if (!Object.entries(req.query).length) {
    return res.status(400).json({
      message: `Please provide me with topic or username in the query params!`
    });
  }
  if (req.query && req.query.username && !req.query.topic) {
    const subscribtionFound = await Subscribtion.find({
      username: req.query.username,
    });
    if (!subscribtionFound) {
      return res.status(404).json({
        message: `There is no subscribtion for username ${req.query.username}`
      });
    }
    return res.json(subscribtionFound);
  }

  if (req.query && req.query.topic && !req.query.username) {
    const subscribtionFound = await Subscribtion.find({
      topic: req.query.topic,
    });
    if (!subscribtionFound) {
      return res.status(404).json({
        message: `There is no subscribtion for topic ${req.query.topic}`
      })
    }
    return res.json(subscribtionFound);
  }

  if (req.query && req.query.topic && req.query.username) {
    const subscribtionFound = await Subscribtion.findOne({
      topic: req.query.topic,
      username: req.query.username,
    });
    if (!subscribtionFound) {
      return res.status(404).json({
        message: `There is no subscribtion for topic ${req.query.topic} for this username ${req.query.topic}`,
      });
    }
    return res.json(subscribtionFound);
  }
});

router.post('/', validate(addSubscriptionSchema), async (req, res, next) => {
  const subscribtionFound = await Subscribtion.findOne({
    username: req.body.username,
    topic: req.body.topic
  });
  if (subscribtionFound) {
    return res.status(409).json({
      message: `This username ${req.body.username} already subscribed to topic ${req.body.topic}`,
    });
  }

  const user = await User.findOne({ username: req.body.username });
  const topic = await Topic.findOne({ name: req.body.topic });
  if (!user) {
    return res.status(404).json({
      message: 'This username is not found!',
    });
  }
  if (!topic) {
    return res.status(404).json({
      message: 'This topic name is not found!',
    });
  }

  sub = await Subscribtion.create(req.body);
  res.json(sub);
});

/**
 * to be implemented if needed
 */
// router.put('/change', validate(findSubsSchema), async (req, res, next) => {
//   if (!Object.entries(req.query).length) {
//     return res.status(400).json({
//       message: `Please provide me with topic or username in the query params!`
//     });
//   }


// })

router

module.exports = router;