const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const task = require('./routes/api/task')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()


app.use(cors())

//Add middleware for body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/' ,function (req,res,next) {
    //handle the get request from the source
})

app.post('/',function (req,res,next) {
    //handle the post request from the source
})

//db config
const db = require('./config/keys').mongoURI

//connect to mongoDB
mongoose.connect(db,{useNewUrlParser:true})
    .then(() => console.log('Coonected to mongoDB'))
    .catch(res => console.log(res))


//use routes
app.use('/api/task',task)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//port no
const port = process.env.port || 5000

app.listen(port, ()=> console.log(`the server is running on the port no ${port}`))


