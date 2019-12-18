const {Project, validate} = require('../models/projects'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cors = require('cors');

// SELECT
router.get('/:owner', cors(), async (req, res) => {
    const selectOne = await Project.find({ owner: req.params.owner }).sort({ deadline: 1 });
    if(!selectOne) return res.status(400).send('Invalid request.')

    console.log(selectOne)
    res.status(200).send(selectOne);
});

router.get('/:owner/:id', cors(), async (req, res) => {
    const select = await Project.find({ _id: req.params.id, owner: req.params.owner})
    if(!select) return res.status(400).send('Invalid request.');

    res.status(200).send(select);
});

// INSERT
router.post('/', cors(), async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body);
    console.log(error)
    if (error) return res.status(400).send(error.details[0].message);

    const insert = new Project({
        name: req.body.name,
        owner: req.body.owner,
        deadline: req.body.deadline
    });

    const result = await insert.save();
    console.log('RESULT -----------', result)
    
    if(result) return res.status(200).send(result);
});

// UPDATE
router.put('/:id', cors(), async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, {
        $set: {
            // name: req.body.name,
            // id_task: req.body.id_task,
            // owner: req.body.owner,
            stage: req.body.stage,
            // deadline: req.body.deadline,
            isActive: req.body.isActive
        }
    }, { new: true });

    const result = await project.save();

    res.status(200).send(project);

    console.log(project);
});

// DELETE
router.delete('/:id', async (req, res) => {
    res.status(501).send('Delete request is not implemented. Use Put instead. - 501')
});

module.exports = router;