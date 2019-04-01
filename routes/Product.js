const express = require('express');

const products = express.Router();
const cors = require('cors');
const Product = require('../models/Product');
const Business = require('../models/Business');

products.use(cors());
process.env.SECRET_KEY = 'secret';

products.post('/post_product', (req, res) => {
  const productData = {
    product_name: req.body.product_name,
    price: req.body.price,
    business_id: 0,
  };
  Business.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user != null) {
      productData.business_id = user.business_id;
      Product.create(productData)
        .then(() => {
          res.json({ status: `${productData.product_name} is uploaded` });
        })
        .catch((err) => {
          res.send(`error: ${err}`);
        });
    } else {
      res.json({ error: 'you are not a registered business' });
    }
  })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

module.exports = products;
