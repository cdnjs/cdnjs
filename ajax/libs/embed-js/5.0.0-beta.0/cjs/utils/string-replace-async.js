"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matchAll(str, re) {
	var matches = [];
	var res = re.exec(str);

	while (res) {
		matches.push(res);

		if (!re.global) {
			break;
		}

		res = re.exec(str);
	}
	return matches;
}

function replaceAll(str, matches) {
	return matches.reverse().reduce(function (res, match) {
		var prefix = res.slice(0, match.index);
		var postfix = res.slice(match.index + match[0].length);

		return prefix + match.replacement + postfix;
	}, str);
}

function assignReplacement(match, replacer) {
	var args = match.concat([match.index, match.input]);

	return replacer.apply(null, args).then(function (res) {
		return (0, _justExtend2.default)({}, match, { replacement: res });
	});
}

function concurrency(matches, replacer) {
	var promises = matches.map(function (match) {
		return assignReplacement(match, replacer);
	});

	return Promise.all(promises);
}

function processString(str, re, replacer) {
	var matches = matchAll(str, re);
	var processor = concurrency;

	return processor(matches, replacer).then(function (matches) {
		return replaceAll(str, matches);
	});
}

function stringReplaceAsync(str, re, replacer) {
	re.lastIndex = 0;
	try {
		return Promise.resolve(processString(str, re, replacer));
	} catch (e) {
		return Promise.reject(e);
	}
}

exports.default = stringReplaceAsync;