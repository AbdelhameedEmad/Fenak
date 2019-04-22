const express = require('express');
const py = require('python-shell');
// const { spawn } = require('child_process');

const recommendations = express.Router();
const cors = require('cors');

recommendations.use(cors());

recommendations.post('/recommend', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body.test);
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: [req.body.test],
  };
  py.PythonShell.run(process.env.PYTHON_PATH, options, (err, results) => {
  console.log(req.body.books);
  const options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    args: [req.body.books, req.body.crafts, req.body.culture, req.body.food, req.body.outdoor],
  };
  py.PythonShell.run(process.env.PYTHON_CODE_PATH, options, (err, results) => {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    // eslint-disable-next-line no-console
    console.log('results: ', results);
    res.send(results);
  });
});
});

module.exports = recommendations;
