const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));

const users = require('./routes/Users');
const businesses = require('./routes/Businesses');
const products = require('./routes/Product');
const interests = require('./routes/Interests');

app.use('/business', businesses);
app.use('/users', users);
app.use('/product', products);
app.use('/interest', interests);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
