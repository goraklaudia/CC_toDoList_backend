const Joi = require('joi');
const mongoose = require('mongoose');

const Project = mongoose.model('Project', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    id_task: { 
        type: [Number], 
        // required: true,
        minlength: 1,
    },
    owner: { 
        type: Number, 
        required: true,
        minlength: 1,
    },
    stage: { 
        type: String,
        enum: ['In progress','Finished'],
        default: 'In progress',
        // required: true
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}));

function validateProject(project) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    id_task: Joi.array().items(Joi.number().min(1)),  //.required()),
    owner: Joi.number().min(1).required(),
    stage: Joi.string().valid('In progress','Finished'), //.required(),
    deadline: Joi.date()
  };

  return Joi.validate(project, schema);
}

exports.Project = Project; 
exports.validate = validateProject;