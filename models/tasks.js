const Joi = require('joi');
const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
    id_proj: {
        type: Number,
        required: true,
        minlength: 1
    },  
    id_parent: { //wstawiam. jak coś, to się usunie
        type: Number,
        required: true,
        minlength: 1
    },  
    id_user: { 
        type: [Number], 
        required: true,
        minlength: 1,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    stage: {
        type: String,
        enum: ['In progress','Finished'],
        default: 'In progress',
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now
    }
}));

function validateTask(task) {
  const schema = {
    id_proj: Joi.number().min(1).required(),
    id_parent: Joi.number().min(1).required(),
    id_user: Joi.array().items(Joi.number().min(1).required()),
    name: Joi.string().min(3).max(255).required(),
    stage: Joi.string().valid('In progress','Finished').required(),
    deadline: Joi.date()
  };

  return Joi.validate(task, schema);
}

exports.Task = Task; 
exports.validate = validateTask;