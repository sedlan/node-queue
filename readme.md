[![Build Status](https://secure.travis-ci.org/sedlan/node-queue.png?branch=master)](http://travis-ci.org/sedlan/node-queue)

#node-queue

---

node-queue processes tasks in order or at some point in the future. The library does not guarantee execution at a specified time, it merely allows delayed execution, i.e. execution will happen AFTER the specified time. The delay in execution can be influenced by two things:

- interval at which the queue is being checked
- complexity of tasks that are already queued

Future versions of the library may or may not deal with execution at a specified time.

node-queue is flexible - you can put any task in the queue and create a worker that "knows" how to deal with the task.

All tasks are JavaScript objects and are defined this way:

    var mytask = {
        id: "id_goes_here",
        datetime: "datetime",
        type: "task_type", // you must create a worker that handles this task type
        taskData: {
            // define an object that the worker will know how to handle
            message: "Hello, world!",
            anotherMessage: "Again!"
        }
    }

You can define 'id' field, but if you omit it, one will be created automatically. If 'datetime' field is missing or empty, the task will be executed as soon as possible. All tasks are persisted using MongoDB collection called 'queue'.

You can add a task to the task queue:

    var nodeq = require('node-queue');
    nodeq.addTask(mytask);

Creating a worker is fairly simple:

    nodeq.addWorker('task_type', function(task) {
        console.log('Task id: ' + task.id);
        console.log('and its message: ' + task.taskData.message);
    });

If a task is created, and node-queue cannot find a handling worker, it will stay in the queue until a valid worker is created.
