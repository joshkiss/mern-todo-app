const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

require('dotenv').config();

let Todo = require('./todo.model');
const todoRoutes = express.Router();

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) console.log(err);
        else {
            res.json(todos);
        }

    });
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) console.log(err);
        else res.json(todo);
    });
});


todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => res.status(200).json({'todo':'todo added successfully'}))
        .catch(err => res.status(400).send('adding new todo failed'));
});


todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) res.status(404).send('data not found');
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});


todoRoutes.route('/delete/:id').delete((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) res.status(404).send('data not found, cannot delete');
        else {

            Todo.deleteOne({"_id": req.params.id}).then(todo => {
                res.json('Todo deleted!');
            })
            .catch(err => {
                res.status(400).send("Delete not possible");
            });
        }
    });
/*
    Todo.findOneAndDelete({"_id": req.params.id})
      .then(data => res.json(data))
      .catch(err => res.status(400).send('Could not delete'))
      */
});


app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function(){ console.log('MongoDB database connection established successfully!')});

app.listen(PORT, () => console.log('Server is running at port: ' + PORT));