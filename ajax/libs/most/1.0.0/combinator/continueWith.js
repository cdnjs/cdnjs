/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');
var dispose = require('../disposable/dispose');
var isPromise = require('../Promise').isPromise;

exports.continueWith = continueWith;

function continueWith(f, stream) {
	return new Stream(new ContinueWith(f, stream.source));
}

function ContinueWith(f, source) {
	this.f = f;
	this.source = source;
}

ContinueWith.prototype.run = function(sink, scheduler) {
	return new ContinueWithSink(this.f, this.source, sink, scheduler);
};

function ContinueWithSink(f, source, sink, scheduler) {
	this.f = f;
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;
	this.disposable = dispose.once(source.run(this, scheduler));
}

ContinueWithSink.prototype.error = Sink.prototype.error;

ContinueWithSink.prototype.event = function(t, x) {
	if(!this.active) {
		return;
	}
	this.sink.event(t, x);
};

ContinueWithSink.prototype.end = function(t, x) {
	if(!this.active) {
		return;
	}

	dispose.tryDispose(t, this.disposable, this.sink);
	this._startNext(t, x, this.sink);
};

ContinueWithSink.prototype._startNext = function(t, x, sink) {
	try {
		this.disposable = this._continue(this.f, x, sink);
	} catch(e) {
		sink.error(t, e);
	}
};

ContinueWithSink.prototype._continue = function(f, x, sink) {
	return f(x).source.run(sink, this.scheduler);
};

ContinueWithSink.prototype.dispose = function() {
	this.active = false;
	return this.disposable.dispose();
};
