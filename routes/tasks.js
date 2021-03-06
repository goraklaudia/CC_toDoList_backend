const { Task, validate } = require('../models/tasks');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../middleware/auth');

/****** Assistive functions ******/
const handleError = (err, res) => {
  res
    .status(500)
    .send(`<h3>Error 500: Internal server Error</h3><h2>${err.message}</h2>`);
};

const handleSuccess = res => {
  res.status(200).send(`Document saved!`);
};

/****** ROUTES HANDLERS ******/
router.get('/:creator', auth, async (req, res) => {
  try {
    const creator = req.params.creator;
    const tasks = await Task.find({ creator: creator });
    res
      .status(200)
      .set('Access-Control-Allow-Origin', '*')
      .send(JSON.stringify(tasks));
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }

  res.status(200).end('<h1>dupa</h1>');
});

router.post('/', cors(), auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const {
    descrShort,
    descrLong,
    dateStart,
    dateEnd,
    category,
    weight,
    status,
    project,
    creator
  } = req.body;

  let task = new Task({
    descrShort,
    descrLong,
    dateStart,
    dateEnd,
    category,
    weight,
    status,
    project,
    creator
  });

  task = await task.save();

  task.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });
});

router.put('/:id', cors(), async (req, res) => {
  try {
    const id = req.params.id;
    const element = await Task.findById(id);
    if (!element) return;
    element.set({ status: req.body.status });
    const result = await element.save();
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', cors(), async (req, res) => {
  try {
    const id = req.params.id;
    const element = await Task.findByIdAndRemove({ _id: id });
    if (!element) return;
    res.status(200).send(JSON.stringify(element));
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
