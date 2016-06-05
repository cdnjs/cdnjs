/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var transform = require('./transform');
var core = require('../source/core');
var Sink = require('../sink/Pipe');
var IndexSink = require('../sink/IndexSink');
var dispose = require('../disposable/dispose');
var base = require('@most/prelude');
var invoke = require('../invoke');
var Queue = require('../Queue');

var map = base.map;
var tail = base.tail;

exports.zip = zip;
exports.zipArray = zipArray;

/**
 * Combine streams pairwise (or tuple-wise) by index by applying f to values
 * at corresponding indices.  The returned stream ends when any of the input
 * streams ends.
 * @param {function} f function to combine values
 * @returns {Stream} new stream with items at corresponding indices combined
 *  using f
 */
function zip(f /*,...streams */) {
	return zipArray(f, tail(arguments));
}

/**
 * Combine streams pairwise (or tuple-wise) by index by applying f to values
 * at corresponding indices.  The returned stream ends when any of the input
 * streams ends.
 * @param {function} f function to combine values
 * @param {[Stream]} streams streams to zip using f
 * @returns {Stream} new stream with items at corresponding indices combined
 *  using f
 */
function zipArray(f, streams) {
	return streams.length === 0 ? core.empty()
		 : streams.length === 1 ? transform.map(f, streams[0])
		 : new Stream(new Zip(f, map(getSource, streams)));
}

function getSource(stream) {
	return stream.source;
}

function Zip(f, sources) {
	this.f = f;
	this.sources = sources;
}

Zip.prototype.run = function(sink, scheduler) {
	var l = this.sources.length;
	var disposables = new Array(l);
	var sinks = new Array(l);
	var buffers = new Array(l);

	var zipSink = new ZipSink(this.f, buffers, sinks, sink);

	for(var indexSink, i=0; i<l; ++i) {
		buffers[i] = new Queue();
		indexSink = sinks[i] = new IndexSink(i, zipSink);
		disposables[i] = this.sources[i].run(indexSink, scheduler);
	}

	return dispose.all(disposables);
};

function ZipSink(f, buffers, sinks, sink) {
	this.f = f;
	this.sinks = sinks;
	this.sink = sink;
	this.buffers = buffers;
}

ZipSink.prototype.event = function(t, indexedValue) {
	var buffers = this.buffers;
	var buffer = buffers[indexedValue.index];

	buffer.push(indexedValue.value);

	if(buffer.length() === 1) {
		if(!ready(this.buffers)) {
			return;
		}

		emitZipped(this.f, t, buffers, this.sink);

		if (ended(this.buffers, this.sinks)) {
			this.sink.end(t, void 0);
		}
	}
};

ZipSink.prototype.end = function(t, indexedValue) {
	var buffer = this.buffers[indexedValue.index];
	if(buffer.isEmpty()) {
		this.sink.end(t, indexedValue.value);
	}
};

ZipSink.prototype.error = Sink.prototype.error;

function emitZipped (f, t, buffers, sink) {
	sink.event(t, invoke(f, map(head, buffers)));
}

function head(buffer) {
	return buffer.shift();
}

function ended(buffers, sinks) {
	for(var i=0, l=buffers.length; i<l; ++i) {
		if(buffers[i].isEmpty() && !sinks[i].active) {
			return true;
		}
	}
	return false;
}

function ready(buffers) {
	for(var i=0, l=buffers.length; i<l; ++i) {
		if(buffers[i].isEmpty()) {
			return false;
		}
	}
	return true;
}
