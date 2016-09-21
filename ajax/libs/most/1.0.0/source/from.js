/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var fromArray = require('./fromArray').fromArray;
var isIterable = require('../iterable').isIterable;
var fromIterable = require('./fromIterable').fromIterable;
var getObservable = require('../observable/getObservable');
var fromObservable = require('../observable/fromObservable').fromObservable;
var isArrayLike = require('@most/prelude').isArrayLike;

exports.from = from;

function from(a) { // eslint-disable-line complexity
	if(a instanceof Stream) {
		return a;
	}

	var observable = getObservable(a);
	if(observable != null) {
		return fromObservable(observable);
	}

	if(Array.isArray(a) || isArrayLike(a)) {
		return fromArray(a);
	}

	if(isIterable(a)) {
		return fromIterable(a);
	}

	throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a);
}
