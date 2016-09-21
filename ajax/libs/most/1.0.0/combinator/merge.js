/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Pipe = require('../sink/Pipe');
var IndexSink = require('../sink/IndexSink');
var empty = require('../source/core').empty;
var dispose = require('../disposable/dispose');
var base = require('@most/prelude');

var copy = base.copy;
var reduce = base.reduce;

exports.merge = merge;
exports.mergeArray = mergeArray;

/**
 * @returns {Stream} stream containing events from all streams in the argument
 * list in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function merge(/*...streams*/) {
	return mergeArray(copy(arguments));
}

/**
 * @param {Array} streams array of stream to merge
 * @returns {Stream} stream containing events from all input observables
 * in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function mergeArray(streams) {
    var l = streams.length;
    return l === 0 ? empty()
		 : l === 1 ? streams[0]
		 : new Stream(mergeSources(streams));
}

/**
 * This implements fusion/flattening for merge.  It will
 * fuse adjacent merge operations.  For example:
 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
 * It does this by concatenating the sources arrays of
 * any nested Merge sources, in effect "flattening" nested
 * merge operations into a single merge.
 */
function mergeSources(streams) {
	return new Merge(reduce(appendSources, [], streams))
}

function appendSources(sources, stream) {
	var source = stream.source;
	return source instanceof Merge
		? sources.concat(source.sources)
		: sources.concat(source)
}

function Merge(sources) {
	this.sources = sources;
}

Merge.prototype.run = function(sink, scheduler) {
	var l = this.sources.length;
	var disposables = new Array(l);
	var sinks = new Array(l);

	var mergeSink = new MergeSink(disposables, sinks, sink);

	for(var indexSink, i=0; i<l; ++i) {
		indexSink = sinks[i] = new IndexSink(i, mergeSink);
		disposables[i] = this.sources[i].run(indexSink, scheduler);
	}

	return dispose.all(disposables);
};

function MergeSink(disposables, sinks, sink) {
	this.sink = sink;
	this.disposables = disposables;
	this.activeCount = sinks.length;
}

MergeSink.prototype.error = Pipe.prototype.error;

MergeSink.prototype.event = function(t, indexValue) {
	this.sink.event(t, indexValue.value);
};

MergeSink.prototype.end = function(t, indexedValue) {
	dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
	if(--this.activeCount === 0) {
		this.sink.end(t, indexedValue.value);
	}
};
