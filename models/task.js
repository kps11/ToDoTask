const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Create a task schema

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})

module.exports =Task = mongoose.model('task',TaskSchema)