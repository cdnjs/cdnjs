/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var getIterator = require('../iterable').getIterator;
var PropagateTask = require('../scheduler/PropagateTask');

exports.fromIterable = fromIterable;

function fromIterable(iterable) {
	return new Stream(new IterableSource(iterable));
}

function IterableSource(iterable) {
	this.iterable = iterable;
}

IterableSource.prototype.run = function(sink, scheduler) {
	return new IteratorProducer(getIterator(this.iterable), sink, scheduler);
};

function IteratorProducer(iterator, sink, scheduler) {
	this.scheduler = scheduler;
	this.iterator = iterator;
	this.task = new PropagateTask(runProducer, this, sink);
	scheduler.asap(this.task);
}

IteratorProducer.prototype.dispose = function() {
	return this.task.dispose();
};

function runProducer(t, producer, sink) {
	var x = producer.iterator.next();
	if(x.done) {
		sink.end(t, x.value);
	} else {
		sink.event(t, x.value);
	}

	producer.scheduler.asap(producer.task);
}
