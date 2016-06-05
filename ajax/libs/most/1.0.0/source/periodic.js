/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var dispose = require('../disposable/dispose');
var PropagateTask = require('../scheduler/PropagateTask');

exports.periodic = periodic;

/**
 * Create a stream that emits the current time periodically
 * @param {Number} period periodicity of events in millis
 * @param {*} value value to emit each period
 * @returns {Stream} new stream that emits the current time every period
 */
function periodic(period, value) {
	return new Stream(new Periodic(period, value));
}

function Periodic(period, value) {
	this.period = period;
	this.value = value;
}

Periodic.prototype.run = function(sink, scheduler) {
	return scheduler.periodic(this.period, PropagateTask.event(this.value, sink));
};
