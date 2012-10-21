QUnit.module('node-queue');

QUnit.test('node-queue', function () {
	nodeq.addTask({datetime: new Date(), type: "test_email", taskData: {message: "Hello, world!"}}, function(err, response, result) {
		ok(!err, 'addTask()');
		nodeq.addWorker('test_email', function(task) {
			ok((task.message === 'Hello, world!'), 'addWorker()');
		});
	});
});