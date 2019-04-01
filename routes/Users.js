const express = require('express');

const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

users.use(cors());

users.post('/register', (req, res) => {
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    country: req.body.country,
    gender: req.body.gender,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash;
        User.create(userData)
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

users.post('/login', (req, res) => {
  User.findOne({
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

module.exports = users;
