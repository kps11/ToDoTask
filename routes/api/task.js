const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')

//import models

const Task = require('../../models/task')


//@route   GET api/task/test
//@desc    tests users route
//@access  Public

router.get('/test',(req,res) => res.json({msg:'for testing'}))

//@route   POST api/task
//@desc    add task to taskList
//@access  Public

router.post('/',(req,res) => {

    const new_task = new Task({
        title:req.body.title,
        description:req.body.description
    })
     // Task.tasks.unshift({new_task})

    new_task.save()
        .then(task => {res.json(task)})
        .catch(err => console.log(err))


})

//@route   GET api/task
//@desc    get all  task
//@access  Public
router.get('/',(req,res) => {
    Task.find()
        .then(tasks=> res.json(tasks))
        .catch(err => res.status(404).json({notaskfound:"no task found"}))
})


//@route   GET api/task
//@desc    get task by id
//@access  Public
router.get('/:id',(req,res) => {
    Task.findById({_id:req.params.id})
        .then(tasks=> res.json(tasks))
        .catch(err => res.status(404).json({notaskfound:"no task found"}))
})

//@route   PATCH api/task
//@desc    update a task by
//@access  Public
router.patch('/:id',(req,res) => {
    Task.findById({_id:req.params.id})
        .then(task =>{
            task.title = req.body.title
            task.description = req.body.description
            task.save().then(task=>res.json(task))
        })
})


//@route   DELETE api/task
//@desc    delete task from  taskList
//@access  Public

router.delete('/:id',(req,res) =>{

    Task.findById({_id:req.params.id})
        .then(task => {
            task.remove()
                .then(() => res.json({sucess:true}))
                .catch(err => res.json(err))

        })
        .catch(err => res.status(400).json({tasknotfound:'task not found'}))

})




module.exports = router