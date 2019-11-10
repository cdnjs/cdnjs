(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ef = {})));
}(this, (function (exports) { 'use strict';

// Set the escape character
var char = '&';

// Initlize RegExp
var oct = new RegExp(("\\" + char + "[0-7]{1,3}"), 'g');
var ucp = new RegExp(("\\" + char + "u\\[.*?\\]"), 'g');
var uni = new RegExp(("\\" + char + "u.{0,4}"), 'g');
var hex = new RegExp(("\\" + char + "x.{0,2}"), 'g');
var esc = new RegExp(("\\" + char), 'g');
var b = new RegExp(("\\" + char + "b"), 'g');
var t$1 = new RegExp(("\\" + char + "t"), 'g');
var n = new RegExp(("\\" + char + "n"), 'g');
var v = new RegExp(("\\" + char + "v"), 'g');
var f = new RegExp(("\\" + char + "f"), 'g');
var r = new RegExp(("\\" + char + "r"), 'g');

// Escape octonary sequence
var O2C = function () {
	throw new SyntaxError('Octal escape sequences are not allowed in EFML.')
};

// Escape unicode code point sequence
var UC2C = function (val) {
	val = val.substr(3, val.length - 4);
	val = parseInt(val, 16);
	if (!val) { throw new SyntaxError('Invalid Unicode escape sequence') }
	try {
		return String.fromCodePoint(val)
	} catch (err) {
		throw new SyntaxError('Undefined Unicode code-point')
	}
};

// Escape unicode sequence
var U2C = function (val) {
	val = val.substring(2);
	val = parseInt(val, 16);
	if (!val) { throw new SyntaxError('Invalid Unicode escape sequence') }
	return String.fromCharCode(val)
};

// Escape hexadecimal sequence
var X2C = function (val) {
	val = "00" + (val.substring(2));
	val = parseInt(val, 16);
	if (!val) { throw new SyntaxError('Invalid hexadecimal escape sequence') }
	return String.fromCharCode(val)
};

var ESCAPE$1 = function (string) {
	// Split strings
	var splited = string.split(char + char);
	var escaped = [];

	// Escape all known escape characters
	for (var i$1 = 0, list = splited; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		var escapedStr = i
			.replace(oct, O2C)
			.replace(ucp, UC2C)
			.replace(uni, U2C)
			.replace(hex, X2C)
			.replace(b, '\b')
			.replace(t$1, '\t')
			.replace(n, '\n')
			.replace(v, '\v')
			.replace(f, '\f')
			.replace(r, '\r')
			// Remove all useless escape characters
			.replace(esc, '');
		escaped.push(escapedStr);
	}
	// Return escaped string
	return escaped.join(char)
};

var typeSymbols = '>#%@.-+'.split('');
var reserved = '__EFPLACEHOLDER__ $parent $key $data $element $refs $methods $mount $umount $subscribe $unsubscribe $update $destroy __DIRECTMOUNT__'.split(' ');
var mustache = /\{\{.+?\}\}/g;
var spaceIndent = /^(\t*)( *).*/;
var hashref = /#([^}]|}[^}])*$/;

var getErrorMsg = function (msg, line) {
	if ( line === void 0 ) line = -2;

	return ("Failed to parse eft template: " + msg + ". at line " + (line + 1));
};

var isEmpty = function (string) { return !string.replace(/\s/, ''); };

var checkValidType = function (obj) { return ['number', 'boolean', 'string'].indexOf(typeof obj) > -1; };

var ESCAPE = function (string) {
	if (!string) { return [string, false] }
	try {
		var parsed = JSON.parse(string);
		if (['number', 'boolean'].indexOf(typeof parsed) === -1) { return [ESCAPE$1(string), true] }
		return [parsed, false]
	} catch (e) {
		return [ESCAPE$1(string), true]
	}
};

var getOffset = function (string, parsingInfo) {
	if (parsingInfo.offset !== null) { return }
	parsingInfo.offset = string.match(/\s*/)[0];
	if (parsingInfo.offset) { parsingInfo.offsetReg = new RegExp(("^" + (parsingInfo.offset))); }
};

var removeOffset = function (string, parsingInfo, i) {
	if (parsingInfo.offsetReg) {
		var removed = false;
		string = string.replace(parsingInfo.offsetReg, function () {
			removed = true;
			return ''
		});
		if (!removed) { throw new SyntaxError(getErrorMsg(("Expected indent to be grater than 0 and less than " + (parsingInfo.prevDepth + 1) + ", but got -1"), i)) }
	}
	return string
};

var getIndent = function (string, parsingInfo) {
	if (parsingInfo.indentReg) { return }
	var spaces = string.match(spaceIndent)[2];
	if (spaces) {
		parsingInfo.indentReg = new RegExp(spaces, 'g');
	}
};

var getDepth = function (string, parsingInfo, i) {
	var depth = 0;
	if (parsingInfo.indentReg) { string = string.replace(/^\s*/, function (str) { return str.replace(parsingInfo.indentReg, '\t'); }); }
	var content = string.replace(/^\t*/, function (str) {
		depth = str.length;
		return ''
	});
	if (/^\s/.test(content)) { throw new SyntaxError(getErrorMsg('Bad indent', i)) }
	return { depth: depth, content: content }
};

var resolveDepth = function (ast, depth) {
	var currentNode = ast;
	for (var i = 0; i < depth; i++) { currentNode = currentNode[currentNode.length - 1]; }
	return currentNode
};

var splitDefault = function (string) {
	string = string.slice(2, string.length - 2);
	var ref = string.split('=');
	var _path = ref[0];
	var _default = ref.slice(1);
	var pathArr = _path.trim().split('.');
	var ref$1 = ESCAPE(_default.join('=').trim());
	var defaultVal = ref$1[0];
	var escaped = ref$1[1];
	if (checkValidType(defaultVal) && (escaped || (!escaped && defaultVal !== ''))) { return [pathArr, defaultVal] }
	return [pathArr]
};

var splitLiterals = function (string) {
	var strs = string.split(mustache);
	if (strs.length === 1) { return ESCAPE(string)[0] }
	var tmpl = [];
	if (strs.length === 2 && !strs[0] && !strs[1]) { tmpl.push(0); }
	else { tmpl.push(strs.map(ESCAPE$1)); }
	var mustaches = string.match(mustache);
	if (mustaches) { tmpl.push.apply(tmpl, mustaches.map(splitDefault)); }
	return tmpl
};

var pushStr = function (textArr, str) {
	if (str) { textArr.push(str); }
};

var parseText = function (string) {
	var result = splitLiterals(string);
	if (checkValidType(result)) { return [("" + result)] }
	var strs = result[0];
	var exprs = result.slice(1);
	var textArr = [];
	for (var i = 0; i < exprs.length; i++) {
		pushStr(textArr, strs[i]);
		textArr.push(exprs[i]);
	}
	pushStr(textArr, strs[strs.length - 1]);
	return textArr
};

var dotToSpace = function (val) { return val.replace(/\./g, ' '); };

var parseTag = function (string) {
	var tagInfo = {};
	var ref = string.replace(hashref, function (val) {
		tagInfo.ref = val.slice(1);
		return ''
	}).split('.');
	var tag = ref[0];
	var content = ref.slice(1);
	tagInfo.tag = tag;
	tagInfo.class = splitLiterals(content.join('.'));
	if (typeof tagInfo.class === 'string') { tagInfo.class = dotToSpace(tagInfo.class).trim(); }
	else if (tagInfo.class[0]) { tagInfo.class[0] = tagInfo.class[0].map(dotToSpace); }
	return tagInfo
};

var parseNodeProps = function (string) {
	var splited = string.split('=');
	return {
		name: splited.shift().trim(),
		value: splitLiterals(splited.join('=').trim())
	}
};

var parseEvent = function (string) {
	var splited = string.split('=');
	return {
		name: splited.shift().trim(),
		value: splited.join('=').trim()
	}
};

var setOption = function (options, option) {
	switch (option) {
		case 'stop': {
			options.s = 1;
			break
		}
		case 'stopImmediate': {
			options.i = 1;
			break
		}
		case 'prevent': {
			options.p = 1;
			break
		}
		case 'shift': {
			options.h = 1;
			break
		}
		case 'alt': {
			options.a = 1;
			break
		}
		case 'ctrl': {
			options.c = 1;
			break
		}
		case 'meta': {
			options.t = 1;
			break
		}
		case 'capture': {
			options.u = 1;
			break
		}
		default: {
			console.warn(("Abandoned unsupported event option '" + option + "'."));
		}
	}
};

var getOption = function (options, keys, option) {
	var keyCode = parseInt(option, 10);
	if (isNaN(keyCode)) { return setOption(options, option) }
	keys.push(keyCode);
};

var getEventOptions = function (name) {
	var options = {};
	var keys = [];
	var ref = name.split('.');
	var listener = ref[0];
	var ops = ref.slice(1);
	options.l = listener;
	for (var i$1 = 0, list = ops; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		getOption(options, keys, i);
	}
	if (keys.length > 0) { options.k = keys; }
	return options
};

var splitEvents = function (string) {
	var ref = string.split(':');
	var name = ref[0];
	var value = ref.slice(1);
	var content = value.join(':');
	if (content) { return [name.trim(), splitLiterals(content)] }
	return [name.trim()]
};

var parseLine = function (ref) {
	var line = ref.line;
	var ast = ref.ast;
	var parsingInfo = ref.parsingInfo;
	var i = ref.i;

	if (isEmpty(line)) { return }
	getIndent(line, parsingInfo);
	getOffset(line, parsingInfo);

	var ref$1 = getDepth(removeOffset(line, parsingInfo, i), parsingInfo, i);
	var depth = ref$1.depth;
	var content = ref$1.content;

	if (content) {
		if (depth < 0 || depth - parsingInfo.prevDepth > 1 || (depth - parsingInfo.prevDepth === 1 && ['comment', 'tag'].indexOf(parsingInfo.prevType) === -1) || (parsingInfo.prevType !== 'comment' && depth === 0 && parsingInfo.topExists)) { throw new SyntaxError(getErrorMsg(("Expected indent to be grater than 0 and less than " + (parsingInfo.prevDepth + 1) + ", but got " + depth), i)) }
		var type = content[0];
		content = content.slice(1);
		if (!parsingInfo.topExists && typeSymbols.indexOf(type) >= 0 && type !== '>') { throw new SyntaxError(getErrorMsg('No top level entry', i)) }
		if (!content && typeSymbols.indexOf(type) >= 0) { throw new SyntaxError(getErrorMsg('Empty content', i)) }
		// Jump back to upper level
		if (depth < parsingInfo.prevDepth || (depth === parsingInfo.prevDepth && parsingInfo.prevType === 'tag')) { parsingInfo.currentNode = resolveDepth(ast, depth); }
		parsingInfo.prevDepth = depth;

		switch (type) {
			case '>': {
				if (!parsingInfo.topExists) {
					parsingInfo.topExists = true;
					parsingInfo.minDepth = depth;
				}
				var info = parseTag(content);
				var newNode = [{
					t: info.tag
				}];
				if (info.class) {
					newNode[0].a = {};
					newNode[0].a.class = info.class;
				}
				if (info.ref) { newNode[0].r = info.ref; }
				parsingInfo.currentNode.push(newNode);
				parsingInfo.currentNode = newNode;
				parsingInfo.prevType = 'tag';
				break
			}
			case '#': {
				var ref$2 = parseNodeProps(content);
				var name = ref$2.name;
				var value = ref$2.value;
				if (!parsingInfo.currentNode[0].a) { parsingInfo.currentNode[0].a = {}; }
				parsingInfo.currentNode[0].a[name] = value;
				parsingInfo.prevType = 'attr';
				break
			}
			case '%': {
				var ref$3 = parseNodeProps(content);
				var name$1 = ref$3.name;
				var value$1 = ref$3.value;
				if (!parsingInfo.currentNode[0].p) { parsingInfo.currentNode[0].p = {}; }
				parsingInfo.currentNode[0].p[name$1] = value$1;
				parsingInfo.prevType = 'prop';
				break
			}
			case '@': {
				var ref$4 = parseEvent(content);
				var name$2 = ref$4.name;
				var value$2 = ref$4.value;
				if (!parsingInfo.currentNode[0].e) { parsingInfo.currentNode[0].e = []; }
				var options = getEventOptions(name$2);
				var ref$5 = splitEvents(value$2);
				var method = ref$5[0];
				var _value = ref$5[1];
				options.m = method;
				if (_value) { options.v = _value; }
				parsingInfo.currentNode[0].e.push(options);
				parsingInfo.prevType = 'event';
				break
			}
			case '.': {
				(ref$6 = parsingInfo.currentNode).push.apply(ref$6, parseText(content));
				parsingInfo.prevType = 'text';
				break
			}
			case '-': {
				if (reserved.indexOf(content) !== -1) { throw new SyntaxError(getErrorMsg(("Reserved name '" + content + "' should not be used"), i)) }
				parsingInfo.currentNode.push({
					n: content,
					t: 0
				});
				parsingInfo.prevType = 'node';
				break
			}
			case '+': {
				parsingInfo.currentNode.push({
					n: content,
					t: 1
				});
				parsingInfo.prevType = 'list';
				break
			}
			default: {
				parsingInfo.prevType = 'comment';
			}
		}
	}
	var ref$6;
};

var parseEft = function (template) {
	if (!template) { throw new TypeError(getErrorMsg('Template required, but nothing given')) }
	var tplType = typeof template;
	if (tplType !== 'string') { throw new TypeError(getErrorMsg(("Expected a string, but got a(n) " + tplType))) }
	var lines = template.split(/\r?\n/);
	var ast = [];
	var parsingInfo = {
		indentReg: null,
		prevDepth: 0,
		offset: null,
		offsetReg: null,
		prevType: 'comment',
		currentNode: ast,
		topExists: false,
	};
	for (var i = 0; i < lines.length; i++) { parseLine({line: lines[i], ast: ast, parsingInfo: parsingInfo, i: i}); }

	if (ast[0]) { return ast[0] }
	throw new SyntaxError(getErrorMsg('Nothing to be parsed', lines.length - 1))
};

var parse = function (template, parser) {
	if (!parser) { parser = parseEft; }
	return parser(template)
};

var typeOf = function (obj) {
	if (Array.isArray(obj)) { return 'array' }
	return typeof obj
};

var mixStr = function (strs) {
	var exprs = [], len = arguments.length - 1;
	while ( len-- > 0 ) exprs[ len ] = arguments[ len + 1 ];

	var string = '';
	for (var i = 0; i < exprs.length; i++) { string += (strs[i] + exprs[i]); }
	return string + strs[strs.length - 1]
};

var getVal = function (ref) {
	var dataNode = ref.dataNode;
	var _key = ref._key;

	return dataNode[_key];
};

var mixVal = function (strs) {
	var exprs = [], len = arguments.length - 1;
	while ( len-- > 0 ) exprs[ len ] = arguments[ len + 1 ];

	if (!strs) { return getVal(exprs[0]) }
	var template = [strs];
	template.push.apply(template, exprs.map(getVal));
	return mixStr.apply(void 0, template)
};

var version = "0.6.2";

var proto = Array.prototype;

var ARR = {
	copy: function copy(arr) {
		return proto.slice.call(arr, 0)
	},
	empty: function empty(arr) {
		arr.length = 0;
		return arr
	},
	equals: function equals(left, right) {
		if (!Array.isArray(right)) { return false }
		if (left === right) { return true }
		if (left.length !== right.length) { return false }
		for (var i in left) { if (left[i] !== right[i]) { return false } }
		return true
	},
	pop: function pop(arr) {
		return proto.pop.call(arr)
	},
	push: function push(arr) {
		var items = [], len = arguments.length - 1;
		while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];

		return proto.push.apply(arr, items)
	},
	remove: function remove(arr, item) {
		var index = proto.indexOf.call(arr, item);
		if (index > -1) {
			proto.splice.call(arr, index, 1);
			return item
		}
	},
	reverse: function reverse(arr) {
		return proto.reverse.call(arr)
	},
	rightUnique: function rightUnique(arr) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			for (var j = i + 1; j < arr.length; j++) { if (arr[i] === arr[j]) { j = i += 1; } }
			newArr.push(arr[i]);
		}
		return newArr
	},
	shift: function shift(arr) {
		return proto.shift.call(arr)
	},
	slice: function slice(arr, index, length) {
		return proto.slice.call(arr, index, length)
	},
	sort: function sort(arr, fn) {
		return proto.sort.call(arr, fn)
	},
	splice: function splice(arr) {
		var args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		return proto.splice.apply(arr, args)
	},
	unshift: function unshift(arr) {
		var items = [], len = arguments.length - 1;
		while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];

		return proto.unshift.apply(arr, items)
	}
};

if (window.Set && Array.from) { ARR.unique = function (arr) { return Array.from(new Set(arr)); }; }
else { ARR.unique = ARR.rightUnique; }

// Enough for ef's usage, so no need for a full polyfill
var _assign = function (ee, er) {
	for (var i in er) { ee[i] = er[i]; }
	return ee
};

var assign = Object.assign || _assign;

var query = [];
var domQuery = [];
var userQuery = [];
var count = 0;

var queue = function (handlers) { return query.push.apply(query, handlers); };
var queueDom = function (handler) { return domQuery.push(handler); };
var onNextRender = function (handler) { return userQuery.push(handler); };

var inform = function () {
	count += 1;
	return count
};

var execModifications = function () {
	var renderQuery = ARR.unique(query);
	for (var i$1 = 0, list = renderQuery; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		i();
	}
	{ console.info('[EF]', ((query.length) + " modification operation(s) cached, " + (renderQuery.length) + " executed.")); }
	ARR.empty(query);
};

var execDomModifications = function () {
	var domRenderQuery = ARR.rightUnique(domQuery);
	for (var i$1 = 0, list = domRenderQuery; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		i();
	}
	{ console.info('[EF]', ((domQuery.length) + " DOM operation(s) cached, " + (domRenderQuery.length) + " executed.")); }
	ARR.empty(domQuery);
};

var execUserQuery = function () {
	if (userQuery.length === 0) { return }
	var userFnQuery = ARR.unique(userQuery);
	for (var i$1 = 0, list = userFnQuery; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		i();
	}
	{ console.info('[EF]', ((userQuery.length) + " user operation(s) cached, " + (userFnQuery.length) + " executed.")); }
	ARR.empty(userQuery);
};

var exec = function (immediate) {
	if (!immediate && (count -= 1) > 0) { return count }
	count = 0;

	if (query.length > 0) { execModifications(); }

	if (domQuery.length > 0) { execDomModifications(); }

	// Execute user query after DOM update
	if (userQuery.length > 0) { setTimeout(execUserQuery, 0); }

	return count
};

var bundle = function (cb) {
	inform();
	return exec(cb(inform, exec))
};

var resolveAllPath = function (ref) {
	var _path = ref._path;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;

	for (var i$1 = 0, list = _path; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		if (!handlers[i]) { handlers[i] = {}; }
		if (!subscribers[i]) { subscribers[i] = {}; }
		if (!innerData[i]) { innerData[i] = {}; }
		handlers = handlers[i];
		subscribers = subscribers[i];
		innerData = innerData[i];
	}
	return {
		handlerNode: handlers,
		subscriberNode: subscribers,
		dataNode: innerData
	}
};

var resolveReactivePath = function (_path, obj, enume) {
	for (var i$1 = 0, list = _path; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		if (!obj[i]) {
			var node = {};
			Object.defineProperty(obj, i, {
				get: function get() {
					return node
				},
				set: function set(data) {
					inform();
					assign(node, data);
					exec();
				},
				configurable: !enume,
				enumerable: enume
			});
		}
		obj = obj[i];
	}
	return obj
};

var resolve = function (ref) {
	var _path = ref._path;
	var _key = ref._key;
	var data = ref.data;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;

	var parentNode = resolveReactivePath(_path, data, true);
	var ref$1 = resolveAllPath({_path: _path, handlers: handlers, subscribers: subscribers, innerData: innerData});
	var handlerNode = ref$1.handlerNode;
	var subscriberNode = ref$1.subscriberNode;
	var dataNode = ref$1.dataNode;
	if (!handlerNode[_key]) { handlerNode[_key] = []; }
	if (!subscriberNode[_key]) { subscriberNode[_key] = []; }
	if (!Object.prototype.hasOwnProperty.call(dataNode, _key)) { dataNode[_key] = ''; }
	return { parentNode: parentNode, handlerNode: handlerNode[_key], subscriberNode: subscriberNode[_key], dataNode: dataNode }
};

var resolveSubscriber = function (_path, subscribers) {
	var pathArr = _path.split('.');
	var key = pathArr.pop();
	for (var i$1 = 0, list = pathArr; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		if (!subscribers[i]) { subscribers[i] = {}; }
		subscribers = subscribers[i];
	}
	return subscribers[key]
};

var initDataNode = function (ref) {
	var parentNode = ref.parentNode;
	var dataNode = ref.dataNode;
	var handlerNode = ref.handlerNode;
	var subscriberNode = ref.subscriberNode;
	var state = ref.state;
	var _key = ref._key;

	Object.defineProperty(parentNode, _key, {
		get: function get() {
			return dataNode[_key]
		},
		set: function set(value) {
			if (dataNode[_key] === value) { return }
			dataNode[_key] = value;
			queue(handlerNode);
			inform();
			for (var i = 0, list = subscriberNode; i < list.length; i += 1) {
				var j = list[i];

				j({state: state, value: value});
			}
			exec();
		},
		enumerable: true
	});
};

var initBinding = function (ref) {
	var bind = ref.bind;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;

	var _path = ARR.copy(bind[0]);
	var _key = _path.pop();
	var ref$1 = resolve({
		_path: _path,
		_key: _key,
		data: state.$data,
		handlers: handlers,
		subscribers: subscribers,
		innerData: innerData
	});
	var parentNode = ref$1.parentNode;
	var handlerNode = ref$1.handlerNode;
	var subscriberNode = ref$1.subscriberNode;
	var dataNode = ref$1.dataNode;

	// Initlize data binding node if not exist
	if (!Object.prototype.hasOwnProperty.call(parentNode, _key)) { initDataNode({parentNode: parentNode, dataNode: dataNode, handlerNode: handlerNode, subscriberNode: subscriberNode, state: state, _key: _key}); }
	// Update default value
	// bind[1] is the default value for this node
	if (bind.length > 1) { parentNode[_key] = bind[1]; }

	return {dataNode: dataNode, handlerNode: handlerNode, subscriberNode: subscriberNode, _key: _key}
};

/* Get new events that works in all target browsers
 * though a little bit old-fashioned
 */
var getEvent = function (name, props) {
	if ( props === void 0 ) props = {
	bubbles: false,
	cancelable: false
};

	var event = document.createEvent('Event');
	event.initEvent(name, props.bubbles, props.cancelable);
	return event
};

var checkValidType$1 = function (obj) { return ['number', 'boolean', 'string'].indexOf(typeof obj) > -1; };

// SVG tags require namespace to work properly
var createByTag = function (tag, svg) {
	if (svg) { return document.createElementNS('http://www.w3.org/2000/svg', tag) }
	return document.createElement(tag)
};

var getElement = function (ref$1) {
	var tag = ref$1.tag;
	var ref = ref$1.ref;
	var refs = ref$1.refs;
	var svg = ref$1.svg;

	var element = createByTag(tag, svg);
	if (ref) { Object.defineProperty(refs, ref, {
		value: element,
		enumerable: true
	}); }
	return element
};

var regTmpl = function (ref) {
	var val = ref.val;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;
	var handler = ref.handler;

	if (Array.isArray(val)) {
		var strs = val[0];
		var exprs = val.slice(1);
		var tmpl = [strs];
		var _handler = function () { return handler(mixVal.apply(void 0, tmpl)); };
		tmpl.push.apply(tmpl, exprs.map(function (item) {
			var ref = initBinding({bind: item, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData});
			var dataNode = ref.dataNode;
			var handlerNode = ref.handlerNode;
			var _key = ref._key;
			handlerNode.push(_handler);
			return {dataNode: dataNode, _key: _key}
		}));
		return _handler
	}
	return function () { return val; }
};

var updateOthers = function (ref) {
	var dataNode = ref.dataNode;
	var handlerNode = ref.handlerNode;
	var subscriberNode = ref.subscriberNode;
	var _handler = ref._handler;
	var state = ref.state;
	var _key = ref._key;
	var value = ref.value;

	if (dataNode[_key] === value) { return }
	dataNode[_key] = value;
	var query = ARR.copy(handlerNode);
	ARR.remove(query, _handler);
	queue(query);
	inform();
	for (var i$1 = 0, list = subscriberNode; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		i({state: state, value: value});
	}
	exec();
};

var addValListener = function (ref) {
	var _handler = ref._handler;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;
	var element = ref.element;
	var key = ref.key;
	var expr = ref.expr;

	var ref$1 = initBinding({bind: expr, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData});
	var dataNode = ref$1.dataNode;
	var handlerNode = ref$1.handlerNode;
	var subscriberNode = ref$1.subscriberNode;
	var _key = ref$1._key;
	var _update = function () { return updateOthers({dataNode: dataNode, handlerNode: handlerNode, subscriberNode: subscriberNode, _handler: _handler, state: state, _key: _key, value: element.value}); };
	if (key === 'value') {
		// Listen to input, keyup and change events in order to work in most browsers.
		element.addEventListener('input', _update, true);
		element.addEventListener('keyup', _update, true);
		element.addEventListener('change', _update, true);
	} else {
		element.addEventListener('change', function () {
			// Trigger change to the element it-self
			element.dispatchEvent(getEvent('ef-change-event'));
			if (element.tagName === 'INPUT' && element.type === 'radio' && element.name !== '') {
				// Trigger change to the the same named radios
				var radios = document.querySelectorAll(("input[name=" + (element.name) + "]"));
				if (radios) {
					var selected = ARR.copy(radios);
					ARR.remove(selected, element);

					/* Event triggering could cause unwanted render triggers
					 * no better ways came up at the moment
					 */
					for (var i$1 = 0, list = selected; i$1 < list.length; i$1 += 1) {
						var i = list[i$1];

						i.dispatchEvent(getEvent('ef-change-event'));
					}
				}
			}
		}, true);
		// Use custom event to avoid loops and conflicts
		element.addEventListener('ef-change-event', function () { return updateOthers({dataNode: dataNode, handlerNode: handlerNode, subscriberNode: subscriberNode, _handler: _handler, state: state, _key: _key, value: element.checked}); });
	}
};

var getAttrHandler = function (element, key) {
	if (key === 'class') { return function (val) {
		val = ("" + val).replace(/\s+/g, ' ').trim();
		// Remove attribute when value is empty
		if (!val) { return element.removeAttribute(key) }
		element.setAttribute(key, val);
	} }
	return function (val) {
		// Remove attribute when value is empty
		if (val === '') { return element.removeAttribute(key) }
		element.setAttribute(key, val);
	}
};

var addAttr = function (ref) {
	var element = ref.element;
	var attr = ref.attr;
	var key = ref.key;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;

	if (checkValidType$1(attr)) { element.setAttribute(key, attr); }
	else {
		var handler = getAttrHandler(element, key);
		queue([regTmpl({val: attr, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: handler})]);
	}
};

var addProp = function (ref) {
	var element = ref.element;
	var prop = ref.prop;
	var key = ref.key;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;

	if (checkValidType$1(prop)) { element[key] = prop; }
	else {
		var handler = function (val) {
			element[key] = val;
		};
		var _handler = regTmpl({val: prop, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: handler});
		if ((key === 'value' ||
			key === 'checked') &&
			!prop[0]) { addValListener({_handler: _handler, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData, element: element, key: key, expr: prop[1]}); }
		queue([_handler]);
	}
};


var rawHandler = function (val) { return val; };

var addEvent = function (ref) {
	var element = ref.element;
	var event = ref.event;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;


	/**
	 *  l: listener									: string
	 *  m: method                   : string
	 *  s: stopPropagation          : number/undefined
	 *  i: stopImmediatePropagation : number/undefined
	 *  p: preventDefault           : number/undefined
	 *  h: shiftKey                 : number/undefined
	 *  a: altKey                   : number/undefined
	 *  c: ctrlKey                  : number/undefined
	 *  t: metaKey                  : number/undefined
	 *  u: capture                  : number/undefined
	 *  k: keyCodes                 : array/undefined
	 *  v: value                    : string/array/undefined
	 */
	var l = event.l;
	var m = event.m;
	var s = event.s;
	var i = event.i;
	var p = event.p;
	var h = event.h;
	var a = event.a;
	var c = event.c;
	var t = event.t;
	var u = event.u;
	var k = event.k;
	var v = event.v;
	var _handler = regTmpl({val: v, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: rawHandler});
	element.addEventListener(l, function (e) {
		if (!!h !== !!e.shiftKey ||
			!!a !== !!e.altKey ||
			!!c !== !!e.ctrlKey ||
			!!t !== !!e.metaKey ||
			(k && k.indexOf(e.which) === -1)) { return }
		if (s) { e.stopPropagation(); }
		if (i) { e.stopImmediatePropagation(); }
		if (p) { e.preventDefault(); }
		if (state.$methods[m]) { state.$methods[m]({e: e, value: _handler(), state: state}); }
		else { console.warn('[EF]', ("Method named '" + m + "' not found! Value been passed is:"), _handler()); }
	}, !!u);
};

var createElement = function (ref) {
	var info = ref.info;
	var state = ref.state;
	var innerData = ref.innerData;
	var refs = ref.refs;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var svg = ref.svg;


	/**
	 *  t: tag       : string
	 *  a: attr      : object
	 *  p: prop      : object
	 *  e: event     : array
	 *  r: reference : string
	 */
	var t = info.t;
	var a = info.a;
	var p = info.p;
	var e = info.e;
	var r = info.r;
	var element = getElement({tag: t, ref: r, refs: refs, svg: svg});
	for (var i in a) { addAttr({element: element, attr: a[i], key: i, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData}); }
	for (var i$1 in p) { addProp({element: element, prop: p[i$1], key: i$1, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData}); }
	for (var i$2 in e) { addEvent({element: element, event: e[i$2], state: state, handlers: handlers, subscribers: subscribers, innerData: innerData}); }
	return element
};

var proto$1 = Node.prototype;
// const safeZone = document.createDocumentFragment()

var DOM = {
	// addClass(node, className) {
	// 	const classes = className.split(' ')
	// 	node.classList.add(...classes)
	// },

	// removeClass(node, className) {
	// 	const classes = className.split(' ')
	// 	node.classList.remove(...classes)
	// },

	// toggleClass(node, className) {
	// 	const classes = className.split(' ')
	// 	const classArr = node.className.split(' ')
	// 	for (let i of classes) {
	// 		const classIndex = classArr.indexOf(i)
	// 		if (classIndex > -1) {
	// 			classArr.splice(classIndex, 1)
	// 		} else {
	// 			classArr.push(i)
	// 		}
	// 	}
	// 	node.className = classArr.join(' ').trim()
	// },

	// replaceWith(node, newNode) {
	// 	const parent = node.parentNode
	// 	if (parent) proto.replaceChild.call(parent, newNode, node)
	// },

	// swap(node, newNode) {
	// 	const nodeParent = node.parentNode
	// 	const newNodeParent = newNode.parentNode
	// 	const nodeSibling = node.nextSibling
	// 	const newNodeSibling = newNode.nextSibling
	// 	if (nodeParent && newNodeParent) {
	// 		proto.insertBefore.call(nodeParent, newNode, nodeSibling)
	// 		proto.insertBefore.call(newNodeParent, node, newNodeSibling)
	// 	}
	// },

	before: function before(node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var tempFragment = document.createDocumentFragment();
		nodes.reverse();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			proto$1.appendChild.call(tempFragment, i);
		}
		proto$1.insertBefore.call(node.parentNode, tempFragment, node);
	},

	after: function after(node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var tempFragment = document.createDocumentFragment();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			proto$1.appendChild.call(tempFragment, i);
		}
		if (node.nextSibling) { proto$1.insertBefore.call(node.parentNode, tempFragment, node.nextSibling); }
		else { proto$1.appendChild.call(node.parentNode, tempFragment); }
	},

	append: function append(node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		if ([1,9,11].indexOf(node.nodeType) === -1) { return }
		var tempFragment = document.createDocumentFragment();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			proto$1.appendChild.call(tempFragment, i);
		}
		proto$1.appendChild.call(node, tempFragment);
	},

	// prepend(node, ...nodes) {
	// 	if ([1,9,11].indexOf(node.nodeType) === -1) {
	// 		return
	// 	}
	// 	const tempFragment = document.createDocumentFragment()
	// 	nodes.reverse()
	// 	for (let i of nodes) {
	// 		proto.appendChild.call(tempFragment, i)
	// 	}
	// 	if (node.firstChild) {
	// 		proto.insertBefore.call(node, tempFragment, node.firstChild)
	// 	} else {
	// 		proto.appendChild.call(node, tempFragment)
	// 	}
	// },

	// appendTo(node, newNode) {
	// 	proto.appendChild.call(newNode, node)
	// },

	// prependTo(node, newNode) {
	// 	if (newNode.firstChild) {
	// 		proto.insertBefore.call(newNode, node, node.firstChild)
	// 	} else {
	// 		proto.appendChild.call(newNode, node)
	// 	}
	// },

	// empty(node) {
	// 	node.innerHTML = ''
	// },

	remove: function remove(node) {
		proto$1.removeChild.call(node.parentNode, node);
	},

	// safeRemove(node) {
	// 	proto.appendChild.call(safeZone, node)
	// }
};

var DOMARR = {
	empty: function empty() {
		var this$1 = this;

		inform();
		for (var i$1 = 0, list = ARR.copy(this$1); i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i.$destroy();
		}
		exec();
		ARR.empty(this);
	},
	pop: function pop() {
		if (this.length === 0) { return }
		var poped = ARR.pop(this);
		poped.$umount();
		return poped
	},
	push: function push(ref) {
		var state = ref.state;
		var key = ref.key;
		var anchor = ref.anchor;
		var items = [], len = arguments.length - 1;
		while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];

		var elements = [];
		inform();
		for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			ARR.push(elements, i.$mount({parent: state, key: key}));
		}
		if (this.length === 0) { DOM.after.apply(DOM, [ anchor ].concat( elements )); }
		else { DOM.after.apply(DOM, [ this[this.length - 1].__EFPLACEHOLDER__ ].concat( elements )); }
		exec();
		return ARR.push.apply(ARR, [ this ].concat( items ))
	},
	remove: function remove(item) {
		if (this.indexOf(item) === -1) { return }
		item.$umount();
		return item
	},
	reverse: function reverse(ref) {
		var state = ref.state;
		var key = ref.key;
		var anchor = ref.anchor;

		if (this.length === 0) { return this }
		var tempArr = ARR.copy(this);
		var elements = [];
		inform();
		for (var i = tempArr.length - 1; i >= 0; i--) {
			tempArr[i].$umount();
			ARR.push(elements, tempArr[i].$mount({parent: state, key: key}));
		}
		ARR.push.apply(ARR, [ this ].concat( ARR.reverse(tempArr) ));
		DOM.after.apply(DOM, [ anchor ].concat( elements ));
		exec();
		return this
	},
	shift: function shift() {
		if (this.length === 0) { return }
		var shifted = ARR.shift(this);
		shifted.$umount();
		return shifted
	},
	sort: function sort(ref, fn) {
		var state = ref.state;
		var key = ref.key;
		var anchor = ref.anchor;

		if (this.length === 0) { return this }
		var sorted = ARR.copy(ARR.sort(this, fn));
		var elements = [];
		inform();
		for (var i$1 = 0, list = sorted; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i.$umount();
			ARR.push(elements, i.$mount({parent: state, key: key}));
		}
		ARR.push.apply(ARR, [ this ].concat( sorted ));
		DOM.after.apply(DOM, [ anchor ].concat( elements ));
		exec();
		return this
	},
	splice: function splice() {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		if (this.length === 0) { return this }
		var spliced = ARR.splice.apply(ARR, [ ARR.copy(this) ].concat( args ));
		inform();
		for (var i$1 = 0, list = spliced; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i.$umount();
		}
		exec();
		return spliced
	},
	unshift: function unshift(ref) {
		var state = ref.state;
		var key = ref.key;
		var anchor = ref.anchor;
		var items = [], len = arguments.length - 1;
		while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];

		if (this.length === 0) { return (ref$1 = this).push.apply(ref$1, items).length }
		var elements = [];
		inform();
		for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			ARR.push(elements, i.$mount({parent: state, key: key}));
		}
		DOM.after.apply(DOM, [ anchor ].concat( elements ));
		exec();
		return ARR.unshift.apply(ARR, [ this ].concat( items ))
		var ref$1;
	}
};

var defineArr = function (arr, info) {
	Object.defineProperties(arr, {
		empty: {value: DOMARR.empty},
		pop: {value: DOMARR.pop},
		push: {value: DOMARR.push.bind(arr, info)},
		remove: {value: DOMARR.remove},
		reverse: {value: DOMARR.reverse.bind(arr, info)},
		shift: {value: DOMARR.shift},
		sort: {value: DOMARR.sort.bind(arr, info)},
		splice: {value: DOMARR.splice},
		unshift: {value: DOMARR.unshift.bind(arr, info)}
	});
	return arr
};

var bindTextNode = function (ref) {
	var node = ref.node;
	var state = ref.state;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var innerData = ref.innerData;
	var element = ref.element;

	// Data binding text node
	var textNode = document.createTextNode('');
	var ref$1 = initBinding({bind: node, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData});
	var dataNode = ref$1.dataNode;
	var handlerNode = ref$1.handlerNode;
	var _key = ref$1._key;
	var handler = function () {
		textNode.textContent = dataNode[_key];
	};
	handlerNode.push(handler);
	queue([handler]);

	// Append element to the component
	DOM.append(element, textNode);
};

var updateMountingNode = function (ref) {
	var state = ref.state;
	var children = ref.children;
	var key = ref.key;
	var anchor = ref.anchor;
	var value = ref.value;

	if (children[key] === value) { return }
	if (value) {
		if (value.$parent && 'development' !== 'production') { console.warn('[EF]', 'Better detach the component before attaching it to a new component!'); }
		if (value.$element.contains(state.$element)) {
			{ console.warn('[EF]', 'Cannot mount a component to it\'s child component!'); }
			return
		}
	}

	inform();
	// Update component
	if (children[key]) { children[key].$umount(); }
	// Update stored value
	children[key] = value;
	if (value) { value.$mount({target: anchor, parent: state, option: 'before', key: key}); }
	exec();
};

var bindMountingNode = function (ref) {
	var state = ref.state;
	var key = ref.key;
	var children = ref.children;
	var anchor = ref.anchor;

	Object.defineProperty(state, key, {
		get: function get() {
			return children[key]
		},
		set: function set(value) {
			updateMountingNode({state: state, children: children, key: key, anchor: anchor, value: value});
		},
		enumerable: true,
		configurable: true
	});
};

var updateMountingList = function (ref) {
	var state = ref.state;
	var children = ref.children;
	var key = ref.key;
	var anchor = ref.anchor;
	var value = ref.value;

	if (value) { value = ARR.copy(value); }
	else { value = []; }
	var fragment = document.createDocumentFragment();
	// Update components
	inform();
	if (children[key]) {
		for (var i = 0, list = value; i < list.length; i += 1) {
			var j = list[i];

			if (j.$element.contains(state.$element)) {
				{ console.warn('[EF]', 'Cannot mount a component to it\'s child component!'); }
				return
			}
			j.$umount();
			DOM.append(fragment, j.$mount({parent: state, key: key}));
		}
		for (var i$1 = 0, list$1 = ARR.copy(children[key]); i$1 < list$1.length; i$1 += 1) {
			var j$1 = list$1[i$1];

			j$1.$umount();
		}
	} else { for (var i$2 = 0, list$2 = value; i$2 < list$2.length; i$2 += 1) {
		var j$2 = list$2[i$2];

		DOM.append(fragment, j$2.$mount({parent: state, key: key}));
	} }
	// Update stored value
	children[key].length = 0;
	ARR.push.apply(ARR, [ children[key] ].concat( value ));
	// Append to current component
	DOM.after(anchor, fragment);
	exec();
};

var bindMountingList = function (ref) {
	var state = ref.state;
	var key = ref.key;
	var children = ref.children;
	var anchor = ref.anchor;

	children[key] = defineArr([], {state: state, key: key, anchor: anchor});
	Object.defineProperty(state, key, {
		get: function get() {
			return children[key]
		},
		set: function set(value) {
			if (children[key] && ARR.equals(children[key], value)) { return }
			updateMountingList({state: state, children: children, key: key, anchor: anchor, value: value});
		},
		enumerable: true,
		configurable: true
	});
};

var resolveAST = function (ref) {
	var node = ref.node;
	var nodeType = ref.nodeType;
	var element = ref.element;
	var state = ref.state;
	var innerData = ref.innerData;
	var refs = ref.refs;
	var children = ref.children;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var svg = ref.svg;
	var create = ref.create;

	switch (nodeType) {
		case 'string': {
			// Static text node
			DOM.append(element, document.createTextNode(node));
			break
		}
		case 'array': {
			if (typeOf(node[0]) === 'object') { DOM.append(element, create({node: node, state: state, innerData: innerData, refs: refs, children: children, handlers: handlers, subscribers: subscribers, svg: svg, create: create})); }
			else { bindTextNode({node: node, state: state, handlers: handlers, subscribers: subscribers, innerData: innerData, element: element}); }
			break
		}
		case 'object': {
			var anchor = document.createTextNode('');
			if (node.t === 0) { bindMountingNode({state: state, key: node.n, children: children, anchor: anchor}); }
			else if (node.t === 1) { bindMountingList({state: state, key: node.n, children: children, anchor: anchor}); }
			else { throw new TypeError(("Not a standard ef.js AST: Unknown mounting point type '" + (node.t) + "'")) }
			// Append anchor
			DOM.append(element, anchor);
			// Display anchor indicator in development mode
			{
				DOM.before(anchor, document.createComment(("Start of mounting point '" + (node.n) + "'")));
				DOM.after(anchor, document.createComment(("End of mounting point '" + (node.n) + "'")));
			}
			break
		}
		default: {
			throw new TypeError(("Not a standard ef.js AST: Unknown node type '" + nodeType + "'"))
		}
	}
};

var create$2 = function (ref) {
	var node = ref.node;
	var state = ref.state;
	var innerData = ref.innerData;
	var refs = ref.refs;
	var children = ref.children;
	var handlers = ref.handlers;
	var subscribers = ref.subscribers;
	var svg = ref.svg;
	var create = ref.create;

	var info = node[0];
	var childNodes = node.slice(1);
	if (!svg && info.t === 'svg') { svg = true; }
	// First create an element according to the description
	var element = createElement({info: info, state: state, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, svg: svg});

	// Append child nodes
	for (var i$1 = 0, list = childNodes; i$1 < list.length; i$1 += 1) {
		var i = list[i$1];

		resolveAST({node: i, nodeType: typeOf(i), element: element, state: state, innerData: innerData, refs: refs, children: children, handlers: handlers, subscribers: subscribers, svg: svg, create: create});
	}

	return element
};

var unsubscribe = function (_path, fn, subscribers) {
	var subscriberNode = resolveSubscriber(_path, subscribers);
	ARR.remove(subscriberNode, fn);
};

var update = function(newState) {
	inform();
	var tmpState = assign({}, newState);
	if (tmpState.$data) {
		assign(this.$data, tmpState.$data);
		delete(tmpState.$data);
	}
	if (tmpState.$methods) {
		assign(this.$methods, tmpState.$methods);
		delete(tmpState.$methods);
	}
	assign(this, tmpState);
	exec();
};

var destroy = function() {
	var this$1 = this;

	var ref = this;
	var $element = ref.$element;
	var __EFPLACEHOLDER__ = ref.__EFPLACEHOLDER__;
	inform();
	this.$umount();
	for (var i in this$1) {
		this$1[i] = null;
		delete this$1[i];
	}
	// Push DOM removement operation to query
	queueDom(function () {
		DOM.remove($element);
		DOM.remove(__EFPLACEHOLDER__);
	});

	// Remove all references for memory recycling
	delete this.$element;
	delete this.__EFPLACEHOLDER__;
	delete this.$parent;
	delete this.$key;
	delete this.$data;
	delete this.$methods;
	delete this.$refs;
	delete this.$mount;
	delete this.$umount;
	delete this.$subscribe;
	delete this.$unsubscribe;
	// Render
	return exec()
};

var state = (function () {
	function state (ast) {
	var this$1 = this;

		var children = {};
		var refs = {};
		var innerData = {};
		var methods = {};
		var handlers = {};
		var subscribers = {};
		var nodeInfo = {
			placeholder: document.createTextNode(''),
			replace: [],
			parent: null,
			key: null
		};

		/* Detatched components will be put in the safe zone.
		 * Split safe zone to each component in order to make
		 * the component memory recycleable when lost reference
		 */
		var safeZone = document.createDocumentFragment();

		{ nodeInfo.placeholder = document.createComment('EF COMPONENT PLACEHOLDER'); }

		var mount = function () {
			if (nodeInfo.replace.length > 0) {
				for (var i$1 = 0, list = nodeInfo.replace; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				DOM.remove(i);
			}
				ARR.empty(nodeInfo.replace);
			}
			DOM.before(nodeInfo.placeholder, nodeInfo.element);
		};

		inform();
		Object.defineProperties(this, {
			$element: {
				get: function get() {
					return nodeInfo.element
				},
				configurable: true
			},
			__EFPLACEHOLDER__: {
				get: function get() {
					return nodeInfo.placeholder
				},
				configurable: true
			},
			$parent: {
				get: function get() {
					return nodeInfo.parent
				},
				configurable: true
			},
			$key: {
				get: function get() {
					return nodeInfo.key
				},
				configurable: true
			},
			$methods: {
				get: function get() {
					return methods
				},
				set: function set(newMethods) {
					assign(methods, newMethods);
				},
				configurable: true
			},
			$refs: {
				value: refs,
				configurable: true
			},
			$mount: {
				value: function(ref) {
				var target = ref.target;
				var option = ref.option;
				var parent = ref.parent;
				var key = ref.key;

					if (typeof target === 'string') { target = document.querySelector(target); }

					inform();
					if (nodeInfo.parent) {
						this.$umount();
						{ console.warn('[EF]', 'Component detached from previous mounting point.'); }
					}

					if (!parent) { parent = target; }
					if (!key) { key = '__DIRECTMOUNT__'; }
					nodeInfo.parent = parent;
					nodeInfo.key = key;
					queueDom(mount);

					if (!target) {
						exec();
						return nodeInfo.placeholder
					}

					switch (option) {
						case 'before': {
							DOM.before(target, nodeInfo.placeholder);
							break
						}
						case 'after': {
							DOM.after(target, nodeInfo.placeholder);
							break
						}
						case 'replace': {
							DOM.before(target, nodeInfo.placeholder);
							nodeInfo.replace.push(target);
							break
						}
						default: {
							DOM.append(target, nodeInfo.placeholder);
						}
					}
					return exec()
				},
				configurable: true
			},
			$umount: {
				value: function() {
					var parent = nodeInfo.parent;
				var key = nodeInfo.key;
					nodeInfo.parent = null;
					nodeInfo.key = null;

					inform();
					if (parent && key !== '__DIRECTMOUNT__' && parent[key]) {
						if (Array.isArray(parent[key])) { ARR.remove(parent[key], this); }
						else {
							parent[key] = null;
							return exec()
						}
					}
					DOM.append(safeZone, nodeInfo.placeholder);
					queueDom(mount);
					return exec()
				},
				configurable: true
			},
			$subscribe: {
				value: function (pathStr, subscriber) {
					var _path = pathStr.split('.');
					var ref = initBinding({bind: [_path], state: this$1, handlers: handlers, subscribers: subscribers, innerData: innerData});
				var dataNode = ref.dataNode;
				var subscriberNode = ref.subscriberNode;
				var _key = ref._key;
					// Execute subscriber immediately
					subscriber({state: this$1, value: dataNode[_key]});
					subscriberNode.push(subscriber);
				},
				configurable: true
			},
			$unsubscribe: {
				value: function (_path, fn) {
					unsubscribe(_path, fn, subscribers);
				},
				configurable: true
			}
		});
		// Init root data node
		resolveReactivePath(['$data'], this, false);

		nodeInfo.element = create$2({node: ast, state: this, innerData: innerData, refs: refs, children: children, handlers: handlers, subscribers: subscribers, svg: false, create: create$2});
		DOM.append(safeZone, nodeInfo.placeholder);
		queueDom(mount);
		exec();
	}

	return state;
}());

// Add $update and $destroy method
Object.defineProperties(state.prototype, {
	$update: {value: update},
	$destroy: {value: destroy}
});

var version$1 = "0.6.2";

// Import everything
var create$1 = function (value) {
	var ast = value;
	var ef = (function (state$$1) {
		function ef(newState) {
			inform();
			state$$1.call(this, ast);
			if (newState) { this.$update(newState); }
			exec();
		}

		if ( state$$1 ) ef.__proto__ = state$$1;
		ef.prototype = Object.create( state$$1 && state$$1.prototype );
		ef.prototype.constructor = ef;

		return ef;
	}(state));
	return ef
};

{ console.info('[EF]', ("ef-core v" + version$1 + " initialized!")); }

// Import everything
// Import core components
// Set parser
var parser = parseEft;

var create$$1 = function (value) {
	var valType = typeOf(value);
	if (valType === 'string') { value = parse(value, parser); }
	else if (valType !== 'array') { throw new TypeError('Cannot create new component without proper template or AST!') }

	return create$1(value)
};

// Change parser
var setParser = function (newParser) {
	parser = newParser;
};

var t = function () {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	return create$$1(mixStr.apply(void 0, args));
};

{ console.info('[EF]', ("ef.js v" + version + " initialized!")); }

exports.create = create$$1;
exports.onNextRender = onNextRender;
exports.inform = inform;
exports.exec = exec;
exports.bundle = bundle;
exports.setParser = setParser;
exports.parseEft = parseEft;
exports.t = t;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ef.dev.js.map
