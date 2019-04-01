const express = require('express');

const businesses = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Business = require('../models/Business');

businesses.use(cors());

businesses.post('/register', (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    latitude: req.body.latitude,
    longitudes: req.body.longitudes,
    category: req.body.category,
    phone: req.body.phone,
    description: req.body.description,
    governorate: req.body.governorate,
  };

  Business.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash;
        Business.create(userData)
          .then((user2) => {
            res.json({ status: `${user2.email} registered` });
          })
          .catch((err2) => {
            res.send(`error: ${err2}`);
          });
      });
    } else {
      res.json({ error: 'User already exists' });
    }
  })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

businesses.post('/login', (req, res) => {
  Business.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user != null) {
      bcrypt.compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.json({ token });
          } else {
            res.json({ error: 'Invalid email/password' });
          }
        })
        .catch(err => res.status(400).json({ error: err.message }));
    } else {
      res.json({ error: 'Invalid email/password' });
    }
  })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});
module.exports = businesses;
