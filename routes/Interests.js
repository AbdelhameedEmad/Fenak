const express = require('express');

const interests = express.Router();
const cors = require('cors');
const Interest = require('../models/Interest');
const User = require('../models/User');

interests.use(cors());

interests.post('/post_interest', (req, res) => {
  const interestData = {
    interest_id: req.body.interest_id,
    books: req.body.books,
    crafts: req.body.crafts,
    culture: req.body.culture,
    food: req.body.food,
    outdoor: req.body.outdoor,
    user_id: 0,
  };
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user != null) {
      interestData.user_id = user.user_id;
      Interest.create(interestData)
        .then(() => {
          res.json({ status: 'your interests have been uploaded' });
        })
        .catch((err) => {
          res.send(`error: ${err}`);
        });
    } else {
      res.json({ error: 'you are not a registered user' });
    }
  })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});
module.exports = interests;
