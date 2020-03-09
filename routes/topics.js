const express = require('express');
const router = express.Router();

const { Topic } = require('../models/Topic');

/* GET events listing. */
router.get('/', async(req, res, next) => {
  const TopicList = await Topic.find();
  res.json(TopicList);
});

router.get('/:id', async (req, res, next) => {
  const topic = await Topic.findOne({ _id: req.params.id });
  res.json(topic);
});

router.post('/', async (req, res, next) => {
  const topic = await Topic.create({ name: req.body.name });
  res.json(topic);
});

router.delete('/:id', async (req, res, next) => {
  await Topic.deleteOne({ _id: req.params.id });
  res.json({ message: 'success' });
});

module.exports = router;
