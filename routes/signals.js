const express = require('express');

const router = express.Router();

const { validate } = require('../middelwares/validator');
const signalSchema = require('../requestschema/signalSchema.json');

const { Subscribtion } = require('../models/Subscribtion');
const { processMatch } = require('../services/alert');


router.post('/', validate(signalSchema), async (req, res, next) => {

  const { topic } = req.body;
  const matches = await Subscribtion.find({ topic });
  if (!matches.length) {
    res.status(404).json({ message: `This topic ${topic} is not found to issue a notification!`});
  }
  matches.forEach(sub => processMatch(sub, topic));
  res.json(matches);
});

module.exports = router;