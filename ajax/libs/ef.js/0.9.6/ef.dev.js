(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ef = {}));
}(this, function (exports) { 'use strict';

	// Set the escape character
	var char = '&';
	var doubleChar = char + char;

	// Initlize RegExp
	var oct = new RegExp(("\\" + char + "[0-7]{1,3}"), 'g');
	var ucp = new RegExp(("\\" + char + "u\\[.*?\\]"), 'g');
	var uni = new RegExp(("\\" + char + "u.{0,4}"), 'g');
	var hex = new RegExp(("\\" + char + "x.{0,2}"), 'g');
	var esc = new RegExp(("\\" + char), 'g');
	var b = new RegExp(("\\" + char + "b"), 'g');
	var t = new RegExp(("\\" + char + "t"), 'g');
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

	var efEscape = function (string) {
		// Split strings
		var splitArr = string.split(doubleChar);
		var escaped = [];

		// Escape all known escape characters
		for (var i$1 = 0, list = splitArr; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			var escapedStr = i
				.replace(oct, O2C)
				.replace(ucp, UC2C)
				.replace(uni, U2C)
				.replace(hex, X2C)
				.replace(b, '\b')
				.replace(t, '\t')
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

	var checkEscape = function (string) { return string[string.length - 1] === char; };

	var splitWith = function (string, char) {
		var splitArr = string.split(char);
		var escapedSplit = [];
		var escaped = false;
		for (var i$1 = 0, list = splitArr; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (escaped) { escapedSplit[escapedSplit.length - 1] += "" + char + i; }
			else { escapedSplit.push(i); }
			escaped = checkEscape(i);
		}
		return escapedSplit
	};

	var splitBy = function (string, char) {
		var splitArr = string.split(doubleChar);
		var escaped = splitWith(splitArr.shift(), char);
		for (var i$1 = 0, list = splitArr; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			var escapedSplit = splitWith(i, char);
			escaped[escaped.length - 1] += "" + doubleChar + (escapedSplit.shift());
			escaped.push.apply(escaped, escapedSplit);
		}
		return escaped
	};

	var typeSymbols = '>#%@.-+';
	var reserved = [
		'$ctx', '$data', '$refs', '$methods', '$mount', '$umount',
		'$subscribe', '$unsubscribe', '$update', '$destroy', '__DIRECTMOUNT__'
	];
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
			if (['number', 'boolean'].indexOf(typeof parsed) === -1) { return [efEscape(string), true] }
			return [parsed, false]
		} catch (e) {
			return [efEscape(string), true]
		}
	};

	var getOffset = function (string, parsingInfo) {
		if (parsingInfo.offset !== null) { return }
		parsingInfo.offset = string.match(/\s*/)[0];
		if (parsingInfo.offset) { parsingInfo.offsetReg = parsingInfo.offset; }
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
		if ((/^\s/).test(content)) { throw new SyntaxError(getErrorMsg('Bad indent', i)) }
		return { depth: depth, content: content }
	};

	var resolveDepth = function (ast, depth) {
		var currentNode = ast;
		for (var i = 0; i < depth; i++) { currentNode = currentNode[currentNode.length - 1]; }
		return currentNode
	};

	var splitDefault = function (string) {
		string = string.slice(2, string.length - 2);
		var ref = splitBy(string, '=');
		var _path = ref[0];
		var _default = ref.slice(1);
		var pathArr = splitBy(_path.trim(), '.').map(efEscape);
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
		else { tmpl.push(strs.map(efEscape)); }
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
		var ref = splitBy(string.replace(hashref, function (val) {
			tagInfo.ref = val.slice(1);
			return ''
		}), '.');
		var tag = ref[0];
		var content = ref.slice(1);
		tagInfo.tag = efEscape(tag);
		tagInfo.class = splitLiterals(content.join('.'));
		if (typeof tagInfo.class === 'string') { tagInfo.class = dotToSpace(tagInfo.class).trim(); }
		else if (tagInfo.class[0]) { tagInfo.class[0] = tagInfo.class[0].map(dotToSpace); }
		return tagInfo
	};

	var parseNodeProps = function (string) {
		var splited = splitBy(string, '=');
		return {
			name: efEscape(splited.shift().trim()),
			value: splitLiterals(splited.join('=').trim())
		}
	};

	var parseEvent = function (string) {
		var splited = splitBy(string, '=');
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
				console.warn(("Abandoned unsupported eft event option '" + option + "'."));
			}
		}
	};

	var getOption = function (options, keys, option) {
		var keyCode = parseInt(option, 10);
		if (isNaN(keyCode)) { return setOption(options, efEscape(option)) }
		keys.push(keyCode);
	};

	var getEventOptions = function (name) {
		var options = {};
		var keys = [];
		var ref = splitBy(name, '.');
		var listener = ref[0];
		var ops = ref.slice(1);
		options.l = efEscape(listener);
		for (var i$1 = 0, list = ops; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			getOption(options, keys, i);
		}
		if (keys.length > 0) { options.k = keys; }
		return options
	};

	var splitEvents = function (string) {
		var ref = splitBy(string, ':');
		var name = ref[0];
		var value = ref.slice(1);
		var content = value.join(':');
		var escapedName = efEscape(name.trim());
		if (content) { return [escapedName, splitLiterals(content)] }
		return [escapedName]
	};

	var parseLine = function (ref) {
		var ref$6, ref$7;

		var line = ref.line;
		var ast = ref.ast;
		var parsingInfo = ref.parsingInfo;
		var i = ref.i;
		if (isEmpty(line)) { return }
		getOffset(line, parsingInfo);

		var trimmedLine = removeOffset(line, parsingInfo, i);
		getIndent(trimmedLine, parsingInfo);

		var ref$1 = getDepth(trimmedLine, parsingInfo, i);
		var depth = ref$1.depth;
		var content = ref$1.content;

		if (content) {
			if (depth < 0 || depth - parsingInfo.prevDepth > 1 || (depth - parsingInfo.prevDepth === 1 && ['comment', 'tag'].indexOf(parsingInfo.prevType) === -1) || (parsingInfo.prevType !== 'comment' && depth === 0 && parsingInfo.topExists)) { throw new SyntaxError(getErrorMsg(("Expected indent to be grater than 0 and less than " + (parsingInfo.prevDepth + 1) + ", but got " + depth), i)) }
			var type = content[0];
			content = content.slice(1);
			if (!content && typeSymbols.indexOf(type) >= 0) { throw new SyntaxError(getErrorMsg('Empty content', i)) }
			// Jump back to upper level
			if (depth < parsingInfo.prevDepth || (depth === parsingInfo.prevDepth && parsingInfo.prevType === 'tag')) { parsingInfo.currentNode = resolveDepth(ast, depth); }
			parsingInfo.prevDepth = depth;

			switch (type) {
				case '>': {
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
				case '|': {
					if (parsingInfo.currentNode.length > 1) { content = "\n" + content; }
					(ref$7 = parsingInfo.currentNode).push.apply(ref$7, parseText(content));
					parsingInfo.prevType = 'multiline-text';
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
	};

	var parseEft = function (template) {
		if (!template) { throw new TypeError(getErrorMsg('Template required, but nothing given')) }
		var tplType = typeof template;
		if (tplType !== 'string') { throw new TypeError(getErrorMsg(("Expected a string, but got a(n) " + tplType))) }
		var lines = template.split(/\r?\n/);
		var ast = [{t: 0}];
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

		if (ast.length <= 1) { throw new SyntaxError(getErrorMsg('Nothing to be parsed', lines.length - 1)) }
		if (ast.length === 2 && Array.isArray(ast[1]) && Object.hasOwnProperty.call(ast[1][0], 't')) { return ast[1] }
		return ast
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
		for (var i = 0; i < exprs.length; i++) {
			if (typeof exprs[i] === 'undefined') { string += strs[i]; }
			else { string += (strs[i] + exprs[i]); }
		}
		return string + strs[strs.length - 1]
	};

	var getVal = function (ref) {
		var dataNode = ref.dataNode;
		var _key = ref._key;

		var data = dataNode[_key];
		if (typeof data === 'undefined') { return '' }
		return data
	};

	var mixVal = function (strs) {
		var exprs = [], len = arguments.length - 1;
		while ( len-- > 0 ) exprs[ len ] = arguments[ len + 1 ];

		if (!strs) { return getVal(exprs[0]) }
		var template = [strs];
		template.push.apply(template, exprs.map(getVal));
		return mixStr.apply(void 0, template)
	};

	var version = "0.9.6";

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
			for (var i = 0, l = left.length; i < l; i++) {
				if (left[i] !== right[i]) { return false }
			}
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

	// Wrap console functions for `[EF]` perfix
	var strTpl = '[EF] %s';
	var dbg = {
		log: console.log.bind(console, strTpl),
		info: console.info.bind(console, strTpl),
		warn: console.warn.bind(console, strTpl),
		error: console.error.bind(console, strTpl)
	};

	var modificationQueue = [];
	var domQueue = [];
	var userQueue = [];
	var count = 0;

	var queue = function (handlers) { return modificationQueue.push.apply(modificationQueue, handlers); };
	var queueDom = function (handler) { return domQueue.push(handler); };
	var onNextRender = function (handler) { return userQueue.push(handler); };

	var isPaused = function () { return count > 0; };

	var inform = function () {
		count += 1;
		return count
	};

	var execModifications = function () {
		if (modificationQueue.length === 0) { return }
		var renderQueue = ARR.unique(modificationQueue);
		ARR.empty(modificationQueue);
		for (var i$1 = 0, list = renderQueue; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i();
		}
	};

	var execDomModifications = function () {
		if (domQueue.length === 0) { return }
		var domRenderQueue = ARR.rightUnique(domQueue);
		ARR.empty(domQueue);
		for (var i$1 = 0, list = domRenderQueue; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i();
		}
	};

	var execUserQueue = function () {
		if (userQueue.length === 0) { return }
		var userFnQueue = ARR.unique(userQueue);
		ARR.empty(userQueue);
		for (var i$1 = 0, list = userFnQueue; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i();
		}
	};

	var exec = function (immediate) {
		if (!immediate && (count -= 1) > 0) { return count }
		count = 0;

		if (modificationQueue.length > 0) { execModifications(); }

		if (domQueue.length > 0) { execDomModifications(); }

		// Execute user queue after DOM update
		if (userQueue.length > 0) { setTimeout(execUserQueue, 0); }

		return count
	};

	var bundle = function (cb) {
		inform();
		try {
			return exec(cb(inform, exec))
		} catch (e) {
			dbg.error('Error caught when executing bundle:\n', e);
			return exec()
		}
	};

	// Enough for ef's usage, so no need for a full polyfill
	var legacyAssign = function (ee, er) {
		for (var i in er) { ee[i] = er[i]; }
		return ee
	};

	var assign = Object.assign || legacyAssign;

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

	// Workaround for the third bug of buble:
	// https://github.com/bublejs/buble/issues/106
	var defineNode = function (key, obj) {
		var node = {};
		Object.defineProperty(obj, key, {
			get: function get() {
				return node
			},
			set: function set(data) {
				inform();
				assign(node, data);
				exec();
			},
			configurable: false,
			enumerable: true
		});
		return node
	};

	var resolveReactivePath = function (_path, obj) {
		for (var i$1 = 0, list = _path; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (obj[i]) { obj = obj[i]; }
			else { obj = defineNode(i, obj); }
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

		var parentNode = resolveReactivePath(_path, data);
		var ref$1 = resolveAllPath({_path: _path, handlers: handlers, subscribers: subscribers, innerData: innerData});
		var handlerNode = ref$1.handlerNode;
		var subscriberNode = ref$1.subscriberNode;
		var dataNode = ref$1.dataNode;
		if (!handlerNode[_key]) { handlerNode[_key] = []; }
		if (!subscriberNode[_key]) { subscriberNode[_key] = []; }
		/* eslint no-undefined: "off" */
		if (!Object.prototype.hasOwnProperty.call(dataNode, _key)) { dataNode[_key] = undefined; }
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

	var subscriberCallStack = [];

	var pushStack = function (subscriberNode) { return subscriberCallStack.push(subscriberNode); };

	var popStack = function (subscriberNode) { return ARR.remove(subscriberCallStack, subscriberNode); };

	var execSubscribers = function (subscriberNode, data) {
		// Stop chain reaction when being called again in the context
		// There is no way for the caller to know it shouldn't update the node again
		// So this is the only method to avoid recursion
		// Push the current subscriberNode to stack as an identifier
		pushStack(subscriberNode);
		// Execute the subscriber function
		inform();
		try {
			for (var i = 0, list = subscriberNode; i < list.length; i += 1) {
				var subscriber = list[i];

				subscriber(data);
			}
		} catch (e) {
			dbg.error('Error caught when executing subscribers:\n', e);
		}
		exec();
		// Remove the subscriberNode from the stack so it could be called again
		popStack(subscriberNode);
	};

	/* eslint-disable no-self-compare */
	var isnan = function (obj) { return obj !== obj; };

	var initDataNode = function (ref) {
		var parentNode = ref.parentNode;
		var dataNode = ref.dataNode;
		var handlerNode = ref.handlerNode;
		var subscriberNode = ref.subscriberNode;
		var ctx = ref.ctx;
		var _key = ref._key;

		Object.defineProperty(parentNode, _key, {
			get: function get() {
				return dataNode[_key]
			},
			set: function set(value) {
				// Comparing NaN is like eating a cake and suddenly encounter a grain of sand
				if (dataNode[_key] === value || (isnan(dataNode[_key]) && isnan(value))) { return }
				dataNode[_key] = value;
				inform();
				queue(handlerNode);
				exec();
				if (subscriberNode.length > 0) { execSubscribers(subscriberNode, {state: ctx.state, value: value}); }
			},
			enumerable: true
		});
	};

	var initBinding = function (ref) {
		var bind = ref.bind;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;

		var _path = ARR.copy(bind[0]);
		var _key = _path.pop();
		var ref$1 = resolve({
			_path: _path,
			_key: _key,
			data: ctx.data,
			handlers: handlers,
			subscribers: subscribers,
			innerData: innerData
		});
		var parentNode = ref$1.parentNode;
		var handlerNode = ref$1.handlerNode;
		var subscriberNode = ref$1.subscriberNode;
		var dataNode = ref$1.dataNode;

		// Initlize data binding node if not exist
		if (!Object.prototype.hasOwnProperty.call(parentNode, _key)) { initDataNode({parentNode: parentNode, dataNode: dataNode, handlerNode: handlerNode, subscriberNode: subscriberNode, ctx: ctx, _key: _key}); }
		// Update default value
		// bind[1] is the default value for this node
		if (bind.length > 1) { parentNode[_key] = bind[1]; }

		return {dataNode: dataNode, parentNode: parentNode, handlerNode: handlerNode, subscriberNode: subscriberNode, _key: _key}
	};

	var isInstance = function (er, ee) { return er.constructor === ee; };

	// https://github.com/bublejs/buble/issues/197
	var enumerableFalse = function (classObj, keys) {
		for (var i$1 = 0, list = keys; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			Object.defineProperty(classObj.prototype, i, {enumerable: false});
		}
		return classObj
	};

	// https://github.com/bublejs/buble/issues/131
	var prepareArgs = function (self, node) {
		var args = ARR.copy(self);
		ARR.unshift(args, node);
		return args
	};

	var proto$1 = Node.prototype;

	// Will require a weakmap polyfill for IE10 and below
	var mountingPointStore = new WeakMap();

	var DOM = {};

	var EFFragment = /*@__PURE__*/(function (Array) {
		function EFFragment () {
			Array.apply(this, arguments);
		}

		if ( Array ) EFFragment.__proto__ = Array;
		EFFragment.prototype = Object.create( Array && Array.prototype );
		EFFragment.prototype.constructor = EFFragment;

		EFFragment.prototype.appendTo = function appendTo (node) {
			DOM.append.apply(null, prepareArgs(this, node));
		};
		EFFragment.prototype.insertBeforeTo = function insertBeforeTo (node) {
			var args = ARR.copy(this);
			ARR.unshift(args, node);
			DOM.before.apply(null, prepareArgs(this, node));
		};
		EFFragment.prototype.insertAfterTo = function insertAfterTo (node) {
			var args = ARR.copy(this);
			ARR.unshift(args, node);
			DOM.after.apply(null, prepareArgs(this, node));
		};
		EFFragment.prototype.remove = function remove () {
			for (var i$1 = 0, list = this; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				DOM.remove(i);
			}
		};

		return EFFragment;
	}(Array));

	var MountingList = /*@__PURE__*/(function (Array) {
		function MountingList(info) {
			var args = [], len = arguments.length - 1;
			while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

			Array.apply(this, args);
			Object.defineProperty(this, '__info__', {value: info});
		}

		if ( Array ) MountingList.__proto__ = Array;
		MountingList.prototype = Object.create( Array && Array.prototype );
		MountingList.prototype.constructor = MountingList;
		MountingList.prototype.empty = function empty () {
			inform();
			for (var i$1 = 0, list = ARR.copy(this); i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$destroy();
			}
			exec();
			ARR.empty(this);
		};
		MountingList.prototype.clear = function clear () {
			inform();
			for (var i$1 = 0, list = ARR.copy(this); i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
			}
			exec();
			ARR.empty(this);
		};
		MountingList.prototype.pop = function pop () {
			if (this.length === 0) { return }
			var poped = Array.prototype.pop.call(this);
			poped.$umount();
			return poped
		};
		MountingList.prototype.push = function push () {
			var items = [], len = arguments.length;
			while ( len-- ) items[ len ] = arguments[ len ];

			var ref = this.__info__;
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			var elements = [];
			inform();
			for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			if (this.length === 0) { DOM.after.apply(DOM, [ anchor ].concat( elements )); }
			else { DOM.after.apply(DOM, [ this[this.length - 1].$ctx.nodeInfo.placeholder ].concat( elements )); }
			exec();
			return Array.prototype.push.apply(this, items)
		};
		MountingList.prototype.remove = function remove (item) {
			if (this.indexOf(item) === -1) { return }
			item.$umount();
			return item
		};
		MountingList.prototype.reverse = function reverse () {
			var ref = this.__info__;
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			if (this.length === 0) { return this }
			var tempArr = ARR.copy(this);
			var elements = [];
			inform();
			for (var i = tempArr.length - 1; i >= 0; i--) {
				tempArr[i].$umount();
				ARR.push(elements, tempArr[i].$mount({parent: ctx.state, key: key}));
			}
			Array.prototype.push.apply(this, ARR.reverse(tempArr));
			DOM.after.apply(DOM, [ anchor ].concat( elements ));
			exec();
			return this
		};
		MountingList.prototype.shift = function shift () {
			if (this.length === 0) { return }
			var shifted = Array.prototype.shift.call(this);
			shifted.$umount();
			return shifted
		};
		MountingList.prototype.sort = function sort (fn) {
			var ref = this.__info__;
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			if (this.length === 0) { return this }
			var sorted = ARR.copy(Array.prototype.sort.call(this, fn));
			var elements = [];
			inform();
			for (var i$1 = 0, list = sorted; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			Array.prototype.push.apply(this, sorted);
			DOM.after.apply(DOM, [ anchor ].concat( elements ));
			exec();
			return this
		};
		MountingList.prototype.splice = function splice () {
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
		};
		MountingList.prototype.unshift = function unshift () {
			var ref$1;

			var items = [], len = arguments.length;
			while ( len-- ) items[ len ] = arguments[ len ];
			var ref = this.__info__;
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			if (this.length === 0) { return (ref$1 = this).push.apply(ref$1, items).length }
			var elements = [];
			inform();
			for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			DOM.after.apply(DOM, [ anchor ].concat( elements ));
			exec();
			return Array.prototype.unshift.apply(this, items)
		};

		return MountingList;
	}(Array));

	DOM.before = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var tempFragment = document.createDocumentFragment();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (isInstance(i, EFFragment)) { i.appendTo(tempFragment); }
			else { proto$1.appendChild.call(tempFragment, i); }
		}
		proto$1.insertBefore.call(node.parentNode, tempFragment, node);
	};

	DOM.after = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var tempFragment = document.createDocumentFragment();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (isInstance(i, EFFragment)) { i.appendTo(tempFragment); }
			else { proto$1.appendChild.call(tempFragment, i); }
		}
		if (node.nextSibling) { proto$1.insertBefore.call(node.parentNode, tempFragment, node.nextSibling); }
		else { proto$1.appendChild.call(node.parentNode, tempFragment); }
	};

	var handleMountingPoint = function (mountingPoint, tempFragment) {
		var node = mountingPoint.node;
		if (!node) { return }
		if (isInstance(node, MountingList)) {
			for (var i = 0, list = node; i < list.length; i += 1) {
				var j = list[i];

				var ref = j.$ctx.nodeInfo;
				var element = ref.element;
				var placeholder = ref.placeholder;
				DOM.append(tempFragment, element, placeholder);
			}
		} else {
			var ref$1 = node.$ctx.nodeInfo;
			var element$1 = ref$1.element;
			var placeholder$1 = ref$1.placeholder;
			DOM.append(tempFragment, element$1, placeholder$1);
		}
	};

	DOM.append = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		if (isInstance(node, EFFragment)) { return node.push.apply(node, nodes) }
		if ([1,9,11].indexOf(node.nodeType) === -1) { return }
		var tempFragment = document.createDocumentFragment();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (isInstance(i, EFFragment)) { i.appendTo(tempFragment); }
			else {
				proto$1.appendChild.call(tempFragment, i);
				var mountingPoint = mountingPointStore.get(i);
				if (mountingPoint) { handleMountingPoint(mountingPoint, tempFragment); }
			}
		}
		proto$1.appendChild.call(node, tempFragment);
	};

	DOM.remove = function (node) {
		if (isInstance(node, EFFragment)) { node.remove(); }
		else { proto$1.removeChild.call(node.parentNode, node); }
	};

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

	enumerableFalse(MountingList, ['constructor', 'empty', 'clear', 'pop', 'push', 'remove', 'reverse', 'shift', 'sort', 'splice', 'unshift']);

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

	// SVG/MathML tags w/ xlink attributes require specific namespace to work properly
	var svgNS = 'http://www.w3.org/2000/svg';
	var mathNS = 'http://www.w3.org/1998/Math/MathML';
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var createByTag = function (tag, svg) {
		// SVG is always the most prioritized
		if (svg) { return document.createElementNS(svgNS, tag) }
		// Then MathML
		if (tag.toLowerCase() === 'math') { return document.createElementNS(mathNS, tag) }
		// Then HTML
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
		var ctx = ref.ctx;
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
				var ref = initBinding({bind: item, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
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
		var parentNode = ref.parentNode;
		var handlerNode = ref.handlerNode;
		var _handler = ref._handler;
		var _key = ref._key;
		var value = ref.value;

		// Remove handler for this element temporarily
		ARR.remove(handlerNode, _handler);
		inform();
		parentNode[_key] = value;
		exec();
		// Add back the handler
		ARR.push(handlerNode, _handler);
	};

	var addValListener = function (ref) {
		var _handler = ref._handler;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;
		var element = ref.element;
		var key = ref.key;
		var expr = ref.expr;

		var ref$1 = initBinding({bind: expr, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
		var parentNode = ref$1.parentNode;
		var handlerNode = ref$1.handlerNode;
		var _key = ref$1._key;
		var _update = function () { return updateOthers({parentNode: parentNode, handlerNode: handlerNode, _handler: _handler, _key: _key, value: element.value}); };
		if (key === 'value') {
			// Listen to input, keyup and change events in order to work in most browsers.
			element.addEventListener('input', _update, true);
			element.addEventListener('keyup', _update, true);
			element.addEventListener('change', _update, true);
			// // Remove keyup and change listener if browser supports input event correctly
			// const removeListener = () => {
			// 	element.removeEventListener('input', removeListener, true)
			// 	element.removeEventListener('keyup', _update, true)
			// 	element.removeEventListener('change', _update, true)
			// }
			// element.addEventListener('input', removeListener, true)
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
			element.addEventListener('ef-change-event', function () { return updateOthers({parentNode: parentNode, handlerNode: handlerNode, _handler: _handler, _key: _key, value: element.checked}); });
		}
	};

	var getAttrHandler = function (element, key) {
		if (key === 'class') { return function (val) {
			val = ("" + val).replace(/\s+/g, ' ').trim();
			// Remove attribute when value is empty
			if (!val) { return element.removeAttribute(key) }
			element.setAttribute(key, val);
		} }

		// Handle xlink namespace
		if (key.indexOf('xlink:') === 0) { return function (val) {
			// Remove attribute when value is empty
			if (val === '') { return element.removeAttributeNS(xlinkNS, key) }
			element.setAttributeNS(xlinkNS, key, val);
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
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;

		if (checkValidType$1(attr)) {
			// Handle xlink namespace
			if (key.indexOf('xlink:') === 0) { return element.setAttributeNS(xlinkNS, key, attr) }
			return element.setAttribute(key, attr)
		}

		var handler = getAttrHandler(element, key);
		queue([regTmpl({val: attr, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: handler})]);
	};

	var addProp = function (ref) {
		var element = ref.element;
		var prop = ref.prop;
		var key = ref.key;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;

		if (checkValidType$1(prop)) { element[key] = prop; }
		else {
			var handler = function (val) {
				element[key] = val;
			};
			var _handler = regTmpl({val: prop, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: handler});
			if ((key === 'value' ||
				key === 'checked') &&
				!prop[0]) { addValListener({_handler: _handler, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, element: element, key: key, expr: prop[1]}); }
			queue([_handler]);
		}
	};


	var rawHandler = function (val) { return val; };

	var addEvent = function (ref) {
		var element = ref.element;
		var event = ref.event;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;


		/**
		 *  l: listener                 : string
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
		var _handler = regTmpl({val: v, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: rawHandler});
		element.addEventListener(l, function (e) {
			if (!!h !== !!e.shiftKey ||
				!!a !== !!e.altKey ||
				!!c !== !!e.ctrlKey ||
				!!t !== !!e.metaKey ||
				(k && k.indexOf(e.which) === -1)) { return }
			if (s) { e.stopPropagation(); }
			if (i) { e.stopImmediatePropagation(); }
			if (p) { e.preventDefault(); }
			if (ctx.methods[m]) { ctx.methods[m]({e: e, value: _handler(), state: ctx.state}); }
			else { dbg.warn(("Method named '" + m + "' not found! Value been passed is:"), _handler()); }
		}, !!u);
	};

	var createElement = function (ref) {
		var info = ref.info;
		var ctx = ref.ctx;
		var innerData = ref.innerData;
		var refs = ref.refs;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var svg = ref.svg;


		/**
		 *  t: tag       : string | int, 0 means fragment
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
		if (t === 0) { return new EFFragment() }
		var element = getElement({tag: t, ref: r, refs: refs, svg: svg});
		for (var i in a) { addAttr({element: element, attr: a[i], key: i, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData}); }
		for (var i$1 in p) { addProp({element: element, prop: p[i$1], key: i$1, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData}); }
		for (var i$2 in e) { addEvent({element: element, event: e[i$2], ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData}); }
		return element
	};

	var mountOptions = {
		BEFORE: 'before',
		AFTER: 'after',
		APPEND: 'append',
		REPLACE: 'replace'
	};

	var nullComponent = Object.create(null);

	var checkDestroyed = function (state) {
		if (!state.$ctx) { throw new Error('[EF] This component has been destroyed!') }
	};

	var bindTextNode = function (ref) {
		var node = ref.node;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;
		var element = ref.element;

		// Data binding text node
		var textNode = document.createTextNode('');
		var ref$1 = initBinding({bind: node, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
		var dataNode = ref$1.dataNode;
		var handlerNode = ref$1.handlerNode;
		var _key = ref$1._key;
		var handler = function () {
			var value = dataNode[_key];
			if (typeof value === 'undefined') {
				textNode.textContent = '';
				return
			}
			textNode.textContent = dataNode[_key];
		};
		handlerNode.push(handler);
		queue([handler]);

		// Append element to the component
		DOM.append(element, textNode);
	};

	var updateMountingNode = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var value = ref.value;

		var children = ctx.children;
		var child = children[key];
		var anchor = child.anchor;
		var node = child.node;
		if (node === value) { return }

		inform();
		// Update component
		if (node) {
			if (value === nullComponent) { value = null; }
			else { node.$umount(); }
		}
		// Update stored value
		child.node = value;
		if (value) { value.$mount({target: anchor, parent: ctx.state, option: mountOptions.BEFORE, key: key}); }
		exec();
	};

	var updateMountingList = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var value = ref.value;

		var children = ctx.children;
		var ref$1 = children[key];
		var anchor = ref$1.anchor;
		var node = ref$1.node;
		if (ARR.equals(node, value)) { return }
		if (value) { value = ARR.copy(value); }
		else { value = []; }
		var fragment = document.createDocumentFragment();
		// Update components
		inform();
		if (node) {
			node.clear();
			for (var i = 0, list = value; i < list.length; i += 1) {
				var item = list[i];

				if (item.$ctx.nodeInfo.parent) { item.$umount(); }
				DOM.append(fragment, item.$mount({parent: ctx.state, key: key}));
			}
		} else { for (var i$1 = 0, list$1 = value; i$1 < list$1.length; i$1 += 1) {
			var item$1 = list$1[i$1];

			DOM.append(fragment, item$1.$mount({parent: ctx.state, key: key}));
		} }
		// Update stored value
		node.length = 0;
		ARR.push.apply(ARR, [ node ].concat( value ));
		// Append to current component
		DOM.after(anchor, fragment);
		exec();
	};

	var mountingPointUpdaters = [
		updateMountingNode,
		updateMountingList
	];

	var applyMountingPoint = function (type, key, tpl) {
		Object.defineProperty(tpl.prototype, key, {
			get: function get() {
				{ checkDestroyed(this); }
				return this.$ctx.children[key].node
			},
			set: function set(value) {
				{ checkDestroyed(this); }
				var ctx = this.$ctx;
				mountingPointUpdaters[type]({ctx: ctx, key: key, value: value});
			},
			enumerable: true
		});
	};

	var bindMountingNode = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var anchor = ref.anchor;

		var children = ctx.children;
		var isFragment = ctx.isFragment;
		children[key] = {anchor: anchor};
		if (isFragment) {
			DOM.append(ctx.safeZone, anchor);
			mountingPointStore.set(anchor, children[key]);
		}
	};

	var bindMountingList = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var anchor = ref.anchor;

		var children = ctx.children;
		var isFragment = ctx.isFragment;
		children[key] = {
			node: new MountingList({ctx: ctx, key: key, anchor: anchor}),
			anchor: anchor
		};
		if (isFragment) {
			DOM.append(ctx.safeZone, anchor);
			mountingPointStore.set(anchor, children[key]);
		}
	};

	// Walk through the AST to perform proper actions
	var resolveAST = function (ref) {
		var node = ref.node;
		var nodeType = ref.nodeType;
		var element = ref.element;
		var ctx = ref.ctx;
		var innerData = ref.innerData;
		var refs = ref.refs;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var svg = ref.svg;
		var create = ref.create;
		var EFBaseComponent = ref.EFBaseComponent;

		switch (nodeType) {
			// Static text node
			case 'string': {
				DOM.append(element, document.createTextNode(node));
				break
			}
			// Child element or a dynamic text node
			case 'array': {
				// Recursive call for child element
				if (typeOf(node[0]) === 'object') { DOM.append(element, create({node: node, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, svg: svg, create: create, EFBaseComponent: EFBaseComponent})); }
				// Dynamic text node
				else { bindTextNode({node: node, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, element: element}); }
				break
			}
			// Mounting points
			case 'object': {
				var anchor = document.createTextNode('');
				// Single node mounting point
				if (node.t === 0) { bindMountingNode({ctx: ctx, key: node.n, anchor: anchor}); }
				// Multi node mounting point
				else { bindMountingList({ctx: ctx, key: node.n, anchor: anchor}); }
				// Append anchor
				{ DOM.append(element, document.createComment(("EF MOUNTING POINT '" + (node.n) + "' START"))); }
				DOM.append(element, anchor);
				{ DOM.append(element, document.createComment(("EF MOUNTING POINT '" + (node.n) + "' END"))); }
				break
			}
			default:
		}
	};

	// Create elements based on description from AST
	var create = function (ref) {
		var node = ref.node;
		var ctx = ref.ctx;
		var innerData = ref.innerData;
		var refs = ref.refs;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var svg = ref.svg;
		var create = ref.create;
		var EFBaseComponent = ref.EFBaseComponent;

		var info = node[0];
		var childNodes = node.slice(1);
		var fragment = info.t === 0;
		// Enter SVG mode
		if (!fragment && !svg && info.t.toLowerCase() === 'svg') { svg = true; }
		// First create an element according to the description
		var element = createElement({info: info, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, svg: svg});
		if (fragment && 'development' !== 'production') { element.push(document.createComment('EF FRAGMENT START')); }

		// Leave SVG mode if tag is `foreignObject`
		if (svg && info.t.toLowerCase() === 'foreignobject') { svg = false; }

		// Append child nodes
		for (var i$1 = 0, list = childNodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (i instanceof EFBaseComponent) { i.$mount({target: element}); }
			else { resolveAST({node: i, nodeType: typeOf(i), element: element, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, svg: svg, create: create, EFBaseComponent: EFBaseComponent}); }
		}
		if (fragment && 'development' !== 'production') { element.push(document.createComment('EF FRAGMENT END')); }

		return element
	};

	var unsubscribe = function (pathStr, fn, subscribers) {
		var subscriberNode = resolveSubscriber(pathStr, subscribers);
		ARR.remove(subscriberNode, fn);
	};

	var EFBaseComponent = /*@__PURE__*/(function () {
		function EFBaseComponent(ast) {
			var children = {};
			var refs = {};
			var data = {};
			var innerData = {};
			var methods = {};
			var handlers = {};
			var subscribers = {};
			var nodeInfo = {
				placeholder: null,
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

			var ctx = {
				mount: mount, refs: refs, data: data, innerData: innerData, methods: methods,
				handlers: handlers, subscribers: subscribers, nodeInfo: nodeInfo, safeZone: safeZone,
				children: children, state: this, isFragment: ast[0].t === 0
			};

			Object.defineProperty(this, '$ctx', {
				value: ctx,
				enumerable: false,
				configurable: true
			});

			inform();

			nodeInfo.element = create({node: ast, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, svg: false, create: create, EFBaseComponent: EFBaseComponent});
			DOM.append(safeZone, nodeInfo.placeholder);
			queueDom(mount);
			exec();
		}

		var prototypeAccessors = { $data: { configurable: true },$methods: { configurable: true },$refs: { configurable: true } };

		prototypeAccessors.$data.get = function () {
			{ checkDestroyed(this); }
			return this.$ctx.data
		};

		prototypeAccessors.$data.set = function (newData) {
			{ checkDestroyed(this); }
			inform();
			assign(this.$ctx.data, newData);
			exec();
		};

		prototypeAccessors.$methods.get = function () {
			{ checkDestroyed(this); }
			return this.$ctx.methods
		};

		prototypeAccessors.$methods.set = function (newMethods) {
			{ checkDestroyed(this); }
			this.$ctx.methods = newMethods;
		};

		prototypeAccessors.$refs.get = function () {
			{ checkDestroyed(this); }
			return this.$ctx.refs
		};

		EFBaseComponent.prototype.$mount = function $mount (ref) {
			var target = ref.target;
			var option = ref.option;
			var parent = ref.parent;
			var key = ref.key;

			{ checkDestroyed(this); }
			var ref$1 = this.$ctx;
			var nodeInfo = ref$1.nodeInfo;
			var mount = ref$1.mount;
			if (typeof target === 'string') { target = document.querySelector(target); }

			inform();
			if (nodeInfo.parent) {
				this.$umount();
				{ dbg.warn('Component detached from previous mounting point.'); }
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
				case mountOptions.BEFORE: {
					DOM.before(target, nodeInfo.placeholder);
					break
				}
				case mountOptions.AFTER: {
					DOM.after(target, nodeInfo.placeholder);
					break
				}
				case mountOptions.REPLACE: {
					DOM.before(target, nodeInfo.placeholder);
					nodeInfo.replace.push(target);
					break
				}
				case mountOptions.APPEND:
				default: {
					// Parent is EFFragment should only happen when using jsx
					if (isInstance(parent, EFFragment)) { DOM.append(target, nodeInfo.element); }
					else { DOM.append(target, nodeInfo.placeholder); }
				}
			}
			return exec()
		};

		EFBaseComponent.prototype.$umount = function $umount () {
			{ checkDestroyed(this); }
			var ref = this.$ctx;
			var nodeInfo = ref.nodeInfo;
			var safeZone = ref.safeZone;
			var mount = ref.mount;
			var parent = nodeInfo.parent;
			var key = nodeInfo.key;
			nodeInfo.parent = null;
			nodeInfo.key = null;

			inform();
			if (parent) {
				if (key !== '__DIRECTMOUNT__') {
					if (parent[key]) {
						if (Array.isArray(parent[key])) {
							// Remove self from parent list mounting point
							ARR.remove(parent[key], this);
						} else { parent[key] = nullComponent; }
					}
				// Else Remove elements from fragment parent
				} else if (isInstance(parent, EFFragment)) { ARR.remove(parent.$ctx.nodeInfo.element, nodeInfo.element); }
			}
			DOM.append(safeZone, nodeInfo.placeholder);
			queueDom(mount);
			return exec()
		};

		EFBaseComponent.prototype.$subscribe = function $subscribe (pathStr, subscriber) {
			{ checkDestroyed(this); }
			var ctx = this.$ctx;
			var handlers = ctx.handlers;
			var subscribers = ctx.subscribers;
			var innerData = ctx.innerData;
			var _path = pathStr.split('.');
			var ref = initBinding({bind: [_path], ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
			var dataNode = ref.dataNode;
			var subscriberNode = ref.subscriberNode;
			var _key = ref._key;
			inform();
			// Execute the subscriber function immediately
			try {
				subscriber({state: this, value: dataNode[_key]});
				// Put the subscriber inside the subscriberNode
				subscriberNode.push(subscriber);
			} catch (e) {
				dbg.error('Error caught when registering subscriber:\n', e);
			}
			exec();
		};

		EFBaseComponent.prototype.$unsubscribe = function $unsubscribe (pathStr, fn) {
			{ checkDestroyed(this); }
			var ref = this.$ctx;
			var subscribers = ref.subscribers;
			unsubscribe(pathStr, fn, subscribers);
		};

		EFBaseComponent.prototype.$update = function $update (newState) {
			{ checkDestroyed(this); }
			inform();
			legacyAssign(this, newState);
			exec();
		};

		EFBaseComponent.prototype.$destroy = function $destroy () {
			{ checkDestroyed(this); }
			var ref = this.$ctx;
			var nodeInfo = ref.nodeInfo;
			var isFragment = ref.isFragment;
			var children = ref.children;
			inform();
			this.$umount();
			if (isFragment) { for (var i in children) { mountingPointStore.delete(children[i].anchor); } }
			// Detatch all mounted components
			for (var i$1 in this) {
				if (typeOf(this[i$1]) === 'array') { this[i$1].clear(); }
				else { this[i$1] = null; }
			}
			// Remove context
			delete this.$ctx;
			// Push DOM removement operation to query
			queueDom(function () {
				DOM.remove(nodeInfo.element);
				DOM.remove(nodeInfo.placeholder);
			});
			// Render
			return exec()
		};

		Object.defineProperties( EFBaseComponent.prototype, prototypeAccessors );

		return EFBaseComponent;
	}());

	enumerableFalse(EFBaseComponent, ['$mount', '$umount', '$subscribe', '$unsubscribe', '$update', '$destroy']);

	var getGetter = function (ref, ref$1) {
		var base = ref.base;
		var key = ref.key;
		var checkTrue = ref$1.checkTrue;
		var get = ref$1.get;
		var set = ref$1.set;

		if (get) {
			if (!set) { throw new Error('Setter must be defined when getter exists') }
			return get
		}

		if (checkTrue) { return function() {
			return checkTrue(base(this)[key], this)
		} }

		return function() {
			return base(this)[key]
		}
	};

	var getSetter = function (ref, ref$1) {
		var base = ref.base;
		var key = ref.key;
		var checkTrue = ref$1.checkTrue;
		var trueVal = ref$1.trueVal;
		var falseVal = ref$1.falseVal;
		var get = ref$1.get;
		var set = ref$1.set;

		if (set) {
			if (!get) { throw new Error('Getter must be defined when setter exists') }
			return set
		}

		if (checkTrue) { return function(val) {
			var baseNode = base(this);
			var _trueVal = trueVal;
			var _falseVal = falseVal;

			if (typeof trueVal !== 'function') { trueVal = function () { return _trueVal; }; }
			if (typeof falseVal !== 'function') { falseVal = function () { return _falseVal; }; }

			if (val) { baseNode[key] = trueVal(this); }
			else { baseNode[key] = falseVal(this); }
		} }

		return function(val) {
			base(this)[key] = val;
		}
	};

	var defaultRoot = function (state) { return state.$data; };
	var getBase = function (root) {
		if (!root) { return defaultRoot }
		if (typeof root === 'function') { return root }
		if (typeof root === 'string') { root = root.split('.'); }
		return function (base) {
			for (var i = 0, list = root; i < list.length; i += 1) {
				var key = list[i];

				base = base[key];
			}
			return base
		}
	};

	var registerProps = function (tpl, propMap) {
		for (var prop in propMap) {

			/* Options:
			 * key: key on root, default to prop
			 * base: a function that returns the base of the key, default returns $data
			 * trueVal: value when true, only used when checkTrue is set
			 * falseVal: value when false, only used when checkTrue is set
			 * checkTrue: a function returns true or false based on input value
			 * get: getter, will ignore all other settings except set
			 * set: setter, will ignore all other settings except get
			 */
			var options = propMap[prop];

			var base = getBase(options.base);
			var key = options.key || prop;

			var basicProperty = {base: base, key: key};

			var get = getGetter(basicProperty, options);
			var set = getSetter(basicProperty, options);

			Object.defineProperty(tpl.prototype, prop, {
				get: get,
				set: set,
				enumerable: true,
				configurable: false
			});
		}

		return tpl
	};

	var Fragment = /*@__PURE__*/(function (EFBaseComponent) {
		function Fragment() {
			var children = [], len = arguments.length;
			while ( len-- ) children[ len ] = arguments[ len ];

			EFBaseComponent.call(this, [{t: 0} ].concat( children));
		}

		if ( EFBaseComponent ) Fragment.__proto__ = EFBaseComponent;
		Fragment.prototype = Object.create( EFBaseComponent && EFBaseComponent.prototype );
		Fragment.prototype.constructor = Fragment;

		return Fragment;
	}(EFBaseComponent));

	// Make a helper component for text fragments
	var textFragmentAst = [{t: 0},[['text']]];
	var TextFragment = /*@__PURE__*/(function (EFBaseComponent) {
		function TextFragment(text) {
			inform();
			EFBaseComponent.call(this, textFragmentAst);
			this.text = text;
			exec();
		}

		if ( EFBaseComponent ) TextFragment.__proto__ = EFBaseComponent;
		TextFragment.prototype = Object.create( EFBaseComponent && EFBaseComponent.prototype );
		TextFragment.prototype.constructor = TextFragment;

		return TextFragment;
	}(EFBaseComponent));
	registerProps(TextFragment, {text: {}});

	var textToFragment = function (value) {
		if (typeof value === 'string') { return new TextFragment(value) }
		return value
	};

	var createElement$1 = function (tag, attrs) {
		var children = [], len = arguments.length - 2;
		while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

		// Create special component for fragment
		if (tag === Fragment) { return new (Function.prototype.bind.apply( Fragment, [ null ].concat( children) )) }

		// Create an instance if tag is an ef class
		if (Object.isPrototypeOf.call(EFBaseComponent, tag)) {
			if (children.length <= 0) { return new tag(attrs) }
			return new tag(assign({children: children.map(textToFragment)}, attrs || {}))
		}

		// Else return the generated basic component
		// Transform all label only attributes to ef-supported style
		var transformedAttrs = assign({}, attrs);
		for (var i in transformedAttrs) {
			if (transformedAttrs[i] === true) { transformedAttrs[i] = ''; }
		}

		return new EFBaseComponent([
			{
				t: tag,
				a: transformedAttrs
			} ].concat( children
		))
	};

	var version$1 = "0.9.6";

	// Import everything

	// Apply mounting point properties for classes
	var applyMountingPoints = function (node, tpl) {
		var nodeType = typeOf(node);
		switch (nodeType) {
			case 'array': {
				var info = node[0];
				var childNodes = node.slice(1);
				if (typeOf(info) === 'object') { for (var i$1 = 0, list = childNodes; i$1 < list.length; i$1 += 1) {
						var i = list[i$1];

						applyMountingPoints(i, tpl);
					} }
				break
			}
			case 'object': {
				if (node.t > 1) { throw new TypeError(("[EF] Not a standard ef.js AST: Unknown mounting point type '" + (node.t) + "'")) }
				applyMountingPoint(node.t, node.n, tpl);
				break
			}
			case 'string': {
				break
			}
			default: {
				throw new TypeError(("[EF] Not a standard ef.js AST: Unknown node type '" + nodeType + "'"))
			}
		}
	};

	// Return a brand new class for the new component
	var create$1 = function (value) {
		var ast = value;
		var EFComponent = /*@__PURE__*/(function (EFBaseComponent) {
			function EFComponent(newState) {
				inform();
				EFBaseComponent.call(this, ast);
				if (newState) { this.$update(newState); }
				exec();
			}

			if ( EFBaseComponent ) EFComponent.__proto__ = EFBaseComponent;
			EFComponent.prototype = Object.create( EFBaseComponent && EFBaseComponent.prototype );
			EFComponent.prototype.constructor = EFComponent;

			return EFComponent;
		}(EFBaseComponent));
		applyMountingPoints(ast, EFComponent);

		// Workaround for a bug of buble
		// https://github.com/bublejs/buble/issues/197
		Object.defineProperty(EFComponent.prototype, 'constructor', {enumerable: false});
		return EFComponent
	};

	{ dbg.info(("ef-core v" + version$1 + " initialized!")); }

	// Import everything

	// Set parser
	var parser = parseEft;

	var create$2 = function (value) {
		var valType = typeOf(value);
		if (valType === 'string') { value = parse(value, parser); }
		else if (valType !== 'array') { throw new TypeError('Cannot create new component without proper template or AST!') }

		return create$1(value)
	};

	// Change parser
	var setParser = function (newParser) {
		parser = newParser;
	};

	var t$1 = function () {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		return create$2(mixStr.apply(void 0, args));
	};

	{ console.info(("[EF] ef.js v" + version + " initialized!")); }

	exports.Fragment = Fragment;
	exports.TextFragment = TextFragment;
	exports.bundle = bundle;
	exports.create = create$2;
	exports.createElement = createElement$1;
	exports.exec = exec;
	exports.inform = inform;
	exports.isPaused = isPaused;
	exports.mountOptions = mountOptions;
	exports.onNextRender = onNextRender;
	exports.parseEft = parseEft;
	exports.registerProps = registerProps;
	exports.setParser = setParser;
	exports.t = t$1;
	exports.version = version;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ef.dev.js.map
