const {Project, validate} = require('../models/projects'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const projects = Project.find()

router.get('/:owner', async (req, res) => {
    let select = await getProjByOwner(req.params.owner);

    await res.send(select)
    console.log(select + ' get request log')
});

router.post('/', async (req, res) => {
    const insert = {
        name: req.body.name,
        owner: req.body.owner,
        deadline: req.body.deadline
    }

    const result = await putProj(insert.name, insert.owner, insert. deadline) //zawsze undefined
    console.log(result + ' post request') // zwraca undefined post request w konsoli

    await res.send(result + ' post result') // zwraca undefined post request w postman
});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

// router.get('/:id', async (req, res) => {
  
// });

async function getProjByOwner(o){
    const select = Project.find({owner: o});

    return select;
}

async function getProjById(id){

}

async function putProj(n, o, d){
    const insert = new Project({
        name: n,
        owner: o,
        deadline: d
    })

    console.log(insert + ' before save putProj') //nie wywołuje się

    await insert.save();

    console.log(insert + ' after save putProj') //nie wywołuje się

    return insert //undefined
}

async function putProj(id){

}

async function deleteProj(id){

}

module.exports = router;