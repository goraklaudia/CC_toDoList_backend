const {Project, validate} = require('../models/projects'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const projects = Project.find()

// SELECT
router.get('/:owner', async (req, res) => {

});

router.get('/:id', async (req, res) => {
  
});

// INSERT
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const insert = new Project({
        name: req.body.name,
        owner: req.body.owner,
        deadline: req.body.deadline
    });

    const result = await insert.save();

    result.validate(err => {
        if(err) res.status(500).send('Internal Server Error - 500')
        else res.status(200).send('Saved successfully. - 200')
    })

    console.log(result)
});

// UPDATE
router.put('/:id', async (req, res) => {

});

// DELETE
router.delete('/:id', async (req, res) => {

});

module.exports = router;