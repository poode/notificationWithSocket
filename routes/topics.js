const express = require('express');
const router = express.Router();

const { validate } = require('../middelwares/validator');
const addTopicSchema = require('../requestschema/addTopicSchema.json');

const { Topic } = require('../models/Topic');
const { Subscribtion } = require('../models/Subscribtion');

/* GET events listing. */
router.get('/', async(req, res, next) => {
  const TopicList = await Topic.find();
  res.json(TopicList);
});

router.get('/name/:name', async (req, res, next) => {
  const topic = await Topic.findOne({ name: req.params.name });
  if(!topic) {
    res.status(404).json({ message: 'This topic is not found!'});
  }
  res.json(topic);
});

router.post('/', validate(addTopicSchema), async (req, res, next) => {
  const topic = await Topic.findOne({ name: req.body.name });
  if (topic) {
    return res.status(409).json({ message: 'Topic is already exists' });
  }
  const createdTopic = await Topic.create({ name: req.body.name });
  res.json(createdTopic);
});

router.put('/name/:name', validate(addTopicSchema), async (req, res, next) => {
  const topicFound = await Topic.findOne({ name: req.body.name });
  if (topicFound) {
    return res.status(409).json({ message: 'this topic is already exists please use new topic name!'});
  }
  const topic = await Topic.findOneAndUpdate({ name: req.params.name }, { name: req.body.name }, { new: true });
  if(!topic) {
    return res.status(404).json({ message: 'Topic is not found!' });
  }
  const udpatedSub = await Subscribtion.updateMany({ topic: req.params.name }, { topic: req.body.name });
  res.json({ message: 'done', topic, numberOfUpdatedSubscribtions: udpatedSub.nModified } );
});


router.delete('/name/:name', async (req, res, next) => {
  const topic = await Topic.findOne({ name: req.params.name });
  if (!topic) {
    return res.status(404).json({ message: 'topic is not found' });
  }
  const numberOfSub = await Subscribtion.deleteMany({ topic: req.params.name });
  await Topic.deleteOne({ name: req.params.name });
   res.json({ message: 'Deleted!', data: { deletedTopic: topic, numberOfSubscribtionsDeleted: numberOfSub.deletedCount } });
});

module.exports = router;
