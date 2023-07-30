
var express = require('express');
var task_route = express();

const tasksController = require('../controllers/tasksController');

const bodyParser = require('body-parser');
task_route.use(bodyParser.json());
task_route.use(bodyParser.urlencoded({ extended: true }));



/* Route To Fetch Tasks From Database */

task_route.get('/api/tasks',tasksController.displaytasks);



/* Route To Insert Tasks From Database */

task_route.post('/api/tasks',tasksController.inserttasks);



/* Route To Update Task From Database */

task_route.patch('/api/tasks/:id',tasksController.updatetasks);



/* Route To Delete Task From Database */

task_route.delete('/api/tasks/:id',tasksController.deletetasks);


module.exports = task_route;