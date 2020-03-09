const express = require('express');
const router = express.Router();

const { validate } = require('../middelwares/validator');
const addUserSchema = require('../requestschema/addUserSchema.json');
const { User } = require('../models/User');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const userList = await User.find();
  res.json(userList);
});

router.post('/', validate(addUserSchema), async (req, res, next) => {
  const user = await User.create({ username: req.body.username });
  res.json(user);
})

module.exports = router;
