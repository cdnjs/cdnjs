(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ef = {}));
})(this, (function (exports) { 'use strict';

	// Set the escape character
	var escapeChar = '&';
	var doubleEscapeChar = escapeChar + escapeChar;

	// Initlize RegExp
	var oct = new RegExp(("\\" + escapeChar + "[0-7]{1,3}"), 'g');
	var ucp = new RegExp(("\\" + escapeChar + "u\\[.*?\\]"), 'g');
	var uni = new RegExp(("\\" + escapeChar + "u.{0,4}"), 'g');
	var hex = new RegExp(("\\" + escapeChar + "x.{0,2}"), 'g');
	var esc = new RegExp(("\\" + escapeChar), 'g');
	var b = new RegExp(("\\" + escapeChar + "b"), 'g');
	var t$1 = new RegExp(("\\" + escapeChar + "t"), 'g');
	var n = new RegExp(("\\" + escapeChar + "n"), 'g');
	var v = new RegExp(("\\" + escapeChar + "v"), 'g');
	var f = new RegExp(("\\" + escapeChar + "f"), 'g');
	var r = new RegExp(("\\" + escapeChar + "r"), 'g');

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
		var splitArr = string.split(doubleEscapeChar);
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
		return escaped.join(escapeChar)
	};

	var checkEscape = function (string) { return string[string.length - 1] === escapeChar; };

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
		var splitArr = string.split(doubleEscapeChar);
		var escaped = splitWith(splitArr.shift(), char);
		for (var i$1 = 0, list = splitArr; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			var escapedSplit = splitWith(i, char);
			escaped[escaped.length - 1] += "" + doubleEscapeChar + (escapedSplit.shift());
			escaped.push.apply(escaped, escapedSplit);
		}
		return escaped
	};

	var typeSymbols = '>#%@.-+';
	var reserved = [
		'$ctx', '$refs', '$data', '$methods', '$mount', '$umount', '$subscribe', '$unsubscribe', '$update',
		'$dispatch', '$emit', '$on', '$off', '$destroy', '__DIRECTMOUNT__'
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

	var parseEvent = function (string) {
		var splitted = splitBy(string, '=');
		return {
			name: splitted.shift().trim(),
			value: splitted.join('=').trim()
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
			case 'passive': {
				options.e = 1;
				delete options.p;
				break
			}
			case '!passive': {
				options.e = 0;
				break
			}
			case 'once': {
				options.o = 1;
				break
			}
			default: {
				console.warn(("Unsupported event option '" + option + "' will be dropped."));
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

	var parseNodeProps = function (string) {
		var splitted = splitBy(string, '=');
		var propDef = splitted.shift().trim();
		var ref = splitBy(propDef, '@');
		var propPathStrRaw = ref[0];
		var syncTriggerStr = ref[1];
		var ref$1 = splitBy(propPathStrRaw, '!');
		var propPathStr = ref$1[0];
		var updateOnly = ref$1[1];
		var syncTrigger = syncTriggerStr && getEventOptions(syncTriggerStr);
		return {
			propPath: splitBy(propPathStr, '.').map(efEscape),
			value: splitLiterals(splitted.join('=').trim()),
			updateOnly: updateOnly,
			syncTrigger: syncTrigger
		}
	};

	var parseNodeAttrs = function (string) {
		var splitted = splitBy(string, '=');
		return {
			name: efEscape(splitted.shift().trim()),
			value: splitLiterals(splitted.join('=').trim())
		}
	};

	var parseLine = function (ref, commentHandler) {
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
			var type = content[0];
			var typeValid = typeSymbols.indexOf(type) >= 0;

			if (!typeValid) {
				if (commentHandler) { return commentHandler({
					ast: ast,
					depth: depth,
					content: content,
					parsingInfo: parsingInfo
				}) }

				return
			}

			if (
				depth < 0 ||
				depth - parsingInfo.prevDepth > 1 ||
				(depth - parsingInfo.prevDepth === 1 && parsingInfo.prevType !== 'tag')
			) { throw new SyntaxError(getErrorMsg(("Expected indent to be grater than 0 and less than " + (parsingInfo.prevDepth + 1) + ", but got " + depth), i)) }

			content = content.slice(1);
			if (!content && typeValid) { throw new SyntaxError(getErrorMsg('Empty content', i)) }
			// Jump back to upper level
			if (depth < parsingInfo.prevDepth || (depth === parsingInfo.prevDepth && parsingInfo.prevType === 'tag')) { parsingInfo.currentNode = resolveDepth(ast, depth); }

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
					var ref$2 = parseNodeAttrs(content);
					var name = ref$2.name;
					var value = ref$2.value;
					if (!parsingInfo.currentNode[0].a) { parsingInfo.currentNode[0].a = {}; }
					parsingInfo.currentNode[0].a[name] = value;
					parsingInfo.prevType = 'attr';
					break
				}
				case '%': {
					var ref$3 = parseNodeProps(content);
					var propPath = ref$3.propPath;
					var value$1 = ref$3.value;
					var updateOnly = ref$3.updateOnly;
					var syncTrigger = ref$3.syncTrigger;
					var propInfo = [propPath, value$1];
					if (syncTrigger) {
						propInfo.push(syncTrigger);
						if (updateOnly === '') {
							propInfo.push(1);
						}
					} else if (updateOnly === '') {
						propInfo.push(0, 1);
					}
					if (!parsingInfo.currentNode[0].p) { parsingInfo.currentNode[0].p = []; }
					parsingInfo.currentNode[0].p.push(propInfo);
					parsingInfo.prevType = 'prop';
					break
				}
				case '@': {
					var ref$4 = parseEvent(content);
					var name$1 = ref$4.name;
					var value$2 = ref$4.value;
					if (!parsingInfo.currentNode[0].e) { parsingInfo.currentNode[0].e = []; }
					var options = getEventOptions(name$1);
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
					return
				}
			}

			parsingInfo.prevDepth = depth;
		}
	};

	var parseEft = function (template, commentHandler) {
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
			currentNode: ast
		};
		for (var i = 0; i < lines.length; i++) { parseLine({line: lines[i], ast: ast, parsingInfo: parsingInfo, i: i}, commentHandler); }

		if (ast.length <= 1) { throw new SyntaxError(getErrorMsg('Nothing to be parsed', lines.length - 1)) }
		if (ast.length === 2 && Array.isArray(ast[1]) && Object.hasOwnProperty.call(ast[1][0], 't')) { return ast[1] }
		return ast
	};

	var parse = function (template, parser) {
		if (!parser) { parser = parseEft; }
		return parser(template)
	};

	var SavedArray = Array;
	var proto = SavedArray.prototype;

	var ARR = {
		copy: function copy(arr) {
			return proto.slice.call(arr, 0)
		},
		empty: function empty(arr) {
			arr.length = 0;
			return arr
		},
		equals: function equals(left, right) {
			if (!SavedArray.isArray(right)) { return false }
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
		},
		isArray: function isArray(arr) {
			return SavedArray.isArray(arr)
		}
	};

	var typeOf = function (obj) {
		if (ARR.isArray(obj)) { return 'array' }
		return typeof obj
	};

	var userQueue = [];
	var count = 0;

	var modificationQueue = {
		first: null,
		last: null
	};

	var domQueue = {
		first: null,
		last: null
	};

	// const queue = handlers => modificationQueue.push(...handlers)
	var onNextRender = function (handler) { return userQueue.push(handler); };

	var addQueue = function (ctx, handler) {
		if (handler === ctx.last) { return }

		if (handler.__next) { handler.__next.__prev = handler.__prev; }
		if (handler.__prev) { handler.__prev.__next = handler.__next; }

		if (ctx.first) {
			if (handler === ctx.first) { ctx.first = handler.__next; }
		} else { ctx.first = handler; }

		if (ctx.last) {
			ctx.last.__next = handler;
			handler.__prev = ctx.last;
		}

		ctx.last = handler;
		ctx.first.__prev = null;
		ctx.last.__next = null;
	};

	var runQueue = function (ctx) {
		var currentFn = ctx.first;
		if (!currentFn) { return }

		var queueArr = [];
		while (currentFn) {
			var nextFn = currentFn.__next;
			currentFn.__prev = null;
			currentFn.__next = null;
			queueArr.push(currentFn);
			currentFn = nextFn;
		}

		ctx.first = null;
		ctx.last = null;

		for (var i$1 = 0, list = queueArr; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i();
		}
	};

	var queue = function () {
		var handlers = [], len = arguments.length;
		while ( len-- ) handlers[ len ] = arguments[ len ];

		for (var i$1 = 0, list = handlers; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			addQueue(modificationQueue, i);
		}
	};

	var queueDom = function (handler) {
		addQueue(domQueue, handler);
	};

	/**
	 * @returns {boolean} - Is render paused
	 */
	var isPaused = function () { return count > 0; };

	/**
	 * Add 1 to render count down.
	 * When countdown becomes 0, render will be triggered.
	 * @returns {number} - Render count down
	 */
	var inform = function () {
		count += 1;
		return count
	};

	var execUserQueue = function () {
		var _userQueue = ARR.copy(userQueue);
		ARR.empty(userQueue);
		for (var i$1 = 0, list = _userQueue; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			i();
		}
	};

	/**
	 * Minus 1 to render count down.
	 * When countdown becomes 0, render will be triggered.
	 * @param {boolean} immediate - Render immediately, will force countdown become 0
	 * @returns {number} - Render count down
	 */
	var exec = function (immediate) {
		if (!immediate && (count -= 1) > 0) { return count }
		count = 0;

		runQueue(modificationQueue);
		runQueue(domQueue);

		// Execute user queue after DOM update
		if (userQueue.length > 0) { setTimeout(execUserQueue, 0); }

		return count
	};

	/**
	 * Run callback in a safe way, without worrying about unhandled errors may break rendering.
	 * @param {Function} cb - Callback function to be executed safly
	 * @returns {(void|Error)} - Error that happens when executing callback
	 */
	var bundle = function (cb) {
		inform();
		try {
			// eslint-disable-next-line callback-return
			exec(cb(inform, exec));
		} catch (e) {
			exec();
			return e
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

	var reactivePathReducer = function (obj, key) { return obj[key] || defineNode(key, obj); };

	var resolveReactivePath = function (_path, obj) { return _path.reduce(reactivePathReducer, obj); };

	var resolvePath = function (_path, obj) {
		for (var i$1 = 0, list = _path; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (!obj[i]) { obj[i] = {}; }
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

		var parentNode = resolveReactivePath(_path, data);
		var ref$1 = resolveAllPath({_path: _path, handlers: handlers, subscribers: subscribers, innerData: innerData});
		var handlerNode = ref$1.handlerNode;
		var subscriberNode = ref$1.subscriberNode;
		var dataNode = ref$1.dataNode;
		if (!handlerNode[_key]) { handlerNode[_key] = []; }
		if (!subscriberNode[_key]) { subscriberNode[_key] = []; }
		if (!Object.prototype.hasOwnProperty.call(dataNode, _key)) { dataNode[_key] = parentNode[_key]; }
		return {parentNode: parentNode, handlerNode: handlerNode[_key], subscriberNode: subscriberNode[_key], dataNode: dataNode}
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

	/* eslint-disable no-self-compare */
	var isnan = function (obj) { return obj !== obj; };

	// eslint-disable-next-line no-empty-function
	function noop () {}

	var getDbg = function () {
		if (typeof console === 'undefined') {
			if (typeof print === 'undefined') {
				return {
					log: noop,
					info: noop,
					warn: noop,
					error: noop
				}
			}

			var assemblePrintContent = function (type, args) { return ("[EF][" + type + "] " + (args.join(' '))); };

			return {
				log: function () {
					var args = [], len = arguments.length;
					while ( len-- ) args[ len ] = arguments[ len ];

					return print(assemblePrintContent('LOG ', args));
			},
				info: function () {
					var args = [], len = arguments.length;
					while ( len-- ) args[ len ] = arguments[ len ];

					return print(assemblePrintContent('INFO', args));
			},
				warn: function () {
					var args = [], len = arguments.length;
					while ( len-- ) args[ len ] = arguments[ len ];

					return print(assemblePrintContent('WARN', args));
			},
				error: function () {
					var args = [], len = arguments.length;
					while ( len-- ) args[ len ] = arguments[ len ];

					return print(assemblePrintContent('ERROR', args));
			}
			}
		}

		// Wrap console functions for `[EF]` prefix
		var strTpl = '[EF] %s';
		return {
			log: console.log && console.log.bind(console, strTpl) || noop,
			info: console.info && console.info.bind(console, strTpl) || noop,
			warn: console.warn && console.warn.bind(console, strTpl) || noop,
			error: console.error && console.error.bind(console, strTpl) || noop
		}
	};

	var dbg = getDbg();

	var initDataNode = function (ctx, ref) {
		var parentNode = ref.parentNode;
		var dataNode = ref.dataNode;
		var handlerNode = ref.handlerNode;
		var subscriberNode = ref.subscriberNode;
		var _key = ref._key;

		var state = ctx.state;
		var updateInProgress = false;
		Object.defineProperty(parentNode, _key, {
			get: function get() {
				return dataNode[_key]
			},
			set: function set(value) {
				var oldValue = dataNode[_key];
				// Comparing NaN is like eating a cake and suddenly encounter a grain of sand
				if (updateInProgress || oldValue === value || (isnan(oldValue) && isnan(value))) { return }

				updateInProgress = true;

				dataNode[_key] = value;

				inform();

				queue.apply(void 0, handlerNode);

				if (subscriberNode.length > 0) {
					try {
						for (var i = 0, list = subscriberNode; i < list.length; i += 1) {
							var subscriber = list[i];

							subscriber({state: state, value: value, oldValue: oldValue});
						}
					} catch (e) {
						dbg.error('Error caught when executing subscribers:\n', e);
					}
				}

				exec();

				updateInProgress = false;
			},
			enumerable: true
		});
	};

	var initBinding = function (ctx, ref) {
		var bind = ref.bind;

		var _path = ARR.copy(bind[0]);
		var _key = _path.pop();

		var data = ctx.data;
		var handlers = ctx.handlers;
		var subscribers = ctx.subscribers;
		var innerData = ctx.innerData;

		var ref$1 = resolve({
			_path: _path,
			_key: _key,
			data: data,
			handlers: handlers,
			subscribers: subscribers,
			innerData: innerData
		});
		var parentNode = ref$1.parentNode;
		var handlerNode = ref$1.handlerNode;
		var subscriberNode = ref$1.subscriberNode;
		var dataNode = ref$1.dataNode;

		// Initlize data binding node if not initialized
		var keyStatus = Object.getOwnPropertyDescriptor(parentNode, _key);
		if (!keyStatus || !(keyStatus.get || keyStatus.set)) { initDataNode(ctx, {parentNode: parentNode, dataNode: dataNode, handlerNode: handlerNode, subscriberNode: subscriberNode, _key: _key}); }
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
	var prepareArgs = function (self) {
		var args = ARR.copy(self);
		return args
	};

	var isBrowser = typeof document !== 'undefined' && typeof Node !== 'undefined';

	{
		if (isBrowser) { dbg.info('Running in browser mode.'); }
		else { dbg.info('Running in non-browser mode, please be sure to set a DOM simulation using `setDOMImpl`. See https://github.com/TheNeuronProject/ef.js#server-side-rendering for detail.'); }
	}

	/**
	 * @typedef {string} EFMountOption
	 * @typedef {{BEFORE: EFMountOption, AFTER: EFMountOption, APPEND: EFMountOption, REPLACE: EFMountOption}} EFMountConfig
	 */

	/**
	 * @type {EFMountConfig}
	 */
	var mountOptions = {
		BEFORE: 'before',
		AFTER: 'after',
		APPEND: 'append',
		REPLACE: 'replace'
	};

	var shared = {};

	// import ARR from './array-helper.js'

	var EFMountPoint = '__ef_mount_point__';

	var DOM = {};

	var DocumentFragmentCache = [];
	var AnchorCache = [];

	var useFragment = function (cb) {
		var fragment = DocumentFragmentCache.pop() || DOM.document.createDocumentFragment();
		var recycle = function () {
			DocumentFragmentCache.push(fragment);
		};
		return cb(fragment, recycle)
	};

	var useAnchor = function (cb) {
		var anchor = AnchorCache.pop() || DOM.document.createTextNode('');
		var recycle = function () {
			AnchorCache.push(anchor);
		};
		return cb(anchor, recycle)
	};

	var EFFragment = /*@__PURE__*/(function () {
		function EFFragment() {
			this.$children = [];
			this.$safeZone = DOM.document.createDocumentFragment();
		}

		EFFragment.prototype.append = function append () {
			var ref;

			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];
			DOM.append.apply(DOM, [ this.$safeZone ].concat( prepareArgs(args) ));
			return (ref = this.$children).push.apply(ref, args)
		};

		EFFragment.prototype.appendTo = function appendTo (node) {
			DOM.append.apply(DOM, [ node ].concat( prepareArgs(this.$children) ));
		};

		EFFragment.prototype.addBefore = function addBefore (node) {
			DOM.before.apply(DOM, [ node ].concat( prepareArgs(this.$children) ));
		};

		EFFragment.prototype.removeChild = function removeChild (node) {
			DOM.remove(node);
			ARR.remove(this.$children, node);
		};

		EFFragment.prototype.remove = function remove () {
			for (var i$1 = 0, list = this.$children; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				DOM.append(this.$safeZone, i);
			}
		};

		return EFFragment;
	}());

	var appendNode = function (node, target) {
		var ref = node.$ctx.nodeInfo;
		var element = ref.element;
		var placeholder = ref.placeholder;
		DOM.append(target, element, placeholder);
	};

	var handleMountPoint = function (element, target) {
		if (element.nodeType !== 3) { return }

		var mountPoint = element[EFMountPoint];
		if (!mountPoint) { return }

		var node = mountPoint.node;
		if (!node) { return }

		inform();
		if (ARR.isArray(node)) {
			for (var i$1 = 0, list = node; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				appendNode(i, target);
			}
		} else { appendNode(node, target); }
		exec();
	};

	var appendToTarget = function (target, nodes) {
		inform();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (DOM.isNodeInstance(i)) {
				target.appendChild(i);
				handleMountPoint(i, target);
			} else if (isInstance(i, EFFragment)) { i.appendTo(target); }
			else if (i instanceof shared.EFBaseComponent) {
				i.$mount({target: target});
			}
		}
		exec();
	};

	var addBeforeTarget = function (target, nodes) {
		var parentNode = target.parentNode;
		inform();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (DOM.isNodeInstance(i)) {
				parentNode.insertBefore(i, target);
				handleMountPoint(i, parentNode);
			} else if (isInstance(i, EFFragment)) { i.addBefore(target); }
			else if (i instanceof shared.EFBaseComponent) {
				i.$mount({target: target, option: mountOptions.BEFORE});
			}
		}
		exec();
	};

	DOM.isNodeInstance = function (node) {
		if (DOM.isNode) { return DOM.isNode(node) }
		return !!(node && node.nodeType)
	};

	DOM.before = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var parent = node.parentNode;
		var firstNode = nodes[0];
		// eslint-disable-next-line multiline-ternary, no-ternary
		if (nodes.length === 1 && DOM.isNodeInstance(firstNode) && (firstNode.nodeType === 3 ? !firstNode[EFMountPoint] : true)) {
			parent.insertBefore(nodes[0], node);
		} else if (parent.nodeType === 11) {
			addBeforeTarget(node, nodes);
		} else {
			useFragment(function (tempFragment, recycleFragment) {
				inform();
				appendToTarget(tempFragment, nodes);
				useAnchor(function (tempAnchor, recycleAnchor) {
					parent.insertBefore(tempAnchor, node);
					queueDom(function () {
						parent.insertBefore(tempFragment, tempAnchor);
						parent.removeChild(tempAnchor);
						recycleAnchor();
						recycleFragment();
					});
				});
				exec();
			});
		}
	};

	DOM.after = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		if (node.nextSibling) { return DOM.before.apply(DOM, [ node.nextSibling ].concat( nodes )) }
		return DOM.append.apply(DOM, [ node.parentNode ].concat( nodes ))
	};

	DOM.append = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		if (DOM.isNodeInstance(node)) {
			if (nodes.length === 1 && DOM.isNodeInstance(nodes[0])) {
				node.appendChild(nodes[0]);
				handleMountPoint(nodes[0], node);
			} else if (node.nodeType === 11) { appendToTarget(node, nodes); }
			else if (node.nodeType === 1 || node.nodeType === 9) {
				useFragment(function (tempFragment, recycle) {
					inform();
					appendToTarget(tempFragment, nodes);
					queueDom(function () {
						node.appendChild(tempFragment);
						recycle();
					});
					exec();
				});
			}

			return
		}

		// Handle EFComponent
		if (node instanceof shared.EFBaseComponent) {
			if (!(ARR.isArray(node.children))) {
				{ dbg.warn(node, 'has no `children` list mount point! Child nodes are all ignored!'); }
				return
			}

			inform();
			for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i = shared.toEFComponent(i);
				node.children.push(i);
			}
			exec();

			return
		}

		// Handle fragment
		if (isInstance(node, EFFragment)) { return node.append.apply(node, nodes) }
	};

	DOM.remove = function (node) {
		if (DOM.isNodeInstance(node)) {
			if (node.parentNode) { node.parentNode.removeChild(node); }
		} else if (node instanceof shared.EFBaseComponent) { node.$umount(); }
		else if (isInstance(node, EFFragment)) { node.remove(); }
	};

	var setDOMImpl = function (impl) {
		assign(DOM, impl);

		var dummyText = DOM.document.createTextNode('');

		DOM.textNodeSupportsEvent = !!dummyText.addEventListener;
		DOM.passiveSupported = false;
		DOM.onceSupported = false;

		try {
			var options = Object.create({}, {
				passive: {
					get: function () {
						DOM.passiveSupported = true;
					}
				},
				once: {
					get: function () {
						DOM.onceSupported = true;
					}
				}
			});
			DOM.document.addEventListener('__ef_event_option_test__', noop, options);
			DOM.document.removeEventListener('__ef_event_option_test__', noop, options);
		} catch (e) {

			/* do nothing */
		}
	};

	if (isBrowser) { setDOMImpl({document: document, Node: Node}); }

	/**
	 * @typedef {{bubbles: boolean, cancelable: boolean, composed: boolean}} EFEventOptions
	 */

	/* Get new events that works in all target browsers
	 * though a little bit old-fashioned
	 */
	var getEvent = function (name, options) {
		if ( options === void 0 ) options = {};

		var event = DOM.document.createEvent && DOM.document.createEvent('CustomEvent') || new Event(name, options);
		if (event.initEvent) { event.initEvent(name, options.bubbles, options.cancelable); }
		return event
	};

	var namespaces = {
		xml: 'http://www.w3.org/XML/1998/namespace',
		html: 'http://www.w3.org/1999/xhtml',
		svg: 'http://www.w3.org/2000/svg',
		math: 'http://www.w3.org/1998/Math/MathML',
		xlink: 'http://www.w3.org/1999/xlink'
	};

	/**
	 * Get declared namespaceURI using it's prefix
	 * @param {string} prefix - Perfix for the namespaceURI
	 * @returns {string} NamespaceURI defined by the prefix
	 */
	var getNamespace = function (prefix) {
		if (namespaces[prefix]) { return namespaces[prefix] }

		throw new Error(("[EF] Namespace \"" + prefix + "\" has not been declared."))
	};

	/**
	 * Declare namespaceURI with a prefix
	 * @param {string} prefix - Perfix for the namespaceURI
	 * @param {string} namespaceURI - NamespaceURI associated with the prefix
	 * @returns {void}
	 */
	var declareNamespace = function (prefix, namespaceURI) {
		if (namespaces[prefix]) {
			throw new Error(("[EF] Namespace \"" + prefix + "\" has already been declared as \"" + (namespaces[prefix]) + "\"."))
		}

		namespaces[prefix] = namespaceURI;
	};

	var createCache = function (cb) {
		var cache = {};
		return function (input) { return cache[input] || (cache[input] = cb(input)); }
	};

	var hasColon = createCache(function (str) { return str.indexOf(':') >= 0; });

	var splitByColon = createCache(function (str) { return str.split(':'); });

	var isSVGEscape = createCache(function (tagName) { return ['foreignobject', 'desc', 'title'].indexOf(tagName.toLowerCase()) > -1; });

	var typeValid = function (obj) { return ['number', 'boolean', 'string'].indexOf(typeof obj) > -1; };

	var createByTag = function (ref) {
		var tagName = ref.tagName;
		var tagContent = ref.tagContent;
		var attrs = ref.attrs;
		var namespace = ref.namespace;

		var tagType = typeof tagContent;

		switch (tagType) {
			case 'string': {
				if (tagName === tagContent && attrs && attrs.is && typeof attrs.is === 'string') {
					var is = attrs.is;
					if (namespace) { return DOM.document.createElementNS(namespace, tagContent, {is: is}) }
					return DOM.document.createElement(tagContent, {is: is})
				}

				// Namespaced
				if (namespace) { return DOM.document.createElementNS(namespace, tagContent) }
				// Then basic HTMLElements
				return DOM.document.createElement(tagContent)
			}
			case 'function': {
				// Then custom component or class based custom component
				return new tagContent()
			}
			default: {
				// Then overriden basic element
				if (tagContent.tag) { tagName = tagContent.tag; }

				if (tagContent.is) {
					var is$1 = tagContent.is;
					if (namespace) { return DOM.document.createElementNS(namespace, tagName, {is: is$1}) }
					return DOM.document.createElement(tagName, {is: is$1})
				}

				if (namespace) { return DOM.document.createElementNS(namespace, tagName) }
				return DOM.document.createElement(tagName)
			}
		}
	};

	var getElement = function (ref$1) {
		var tagName = ref$1.tagName;
		var tagContent = ref$1.tagContent;
		var attrs = ref$1.attrs;
		var ref = ref$1.ref;
		var refs = ref$1.refs;
		var namespace = ref$1.namespace;

		var element = createByTag({tagName: tagName, tagContent: tagContent, attrs: attrs, namespace: namespace});
		if (ref) { Object.defineProperty(refs, ref, {
			value: element,
			enumerable: true
		}); }
		return element
	};

	var getVal = function (dataNode, key) {
		var data = dataNode[key];
		if (typeof data === 'undefined') { return '' }
		return data
	};

	var regTmpl = function (ctx, ref) {
		var val = ref.val;
		var handler = ref.handler;

		if (ARR.isArray(val)) {
			var strs = val[0];
			var exprs = val.slice(1);

			if (!strs) {
				var ref$1 = initBinding(ctx, {bind: exprs[0]});
				var dataNode = ref$1.dataNode;
				var handlerNode = ref$1.handlerNode;
				var _key = ref$1._key;
				var _handler = function () { return handler(getVal(dataNode, _key)); };
				handlerNode.push(_handler);

				return _handler
			}

			var tmpl = new Array(strs.length + exprs.length);
			var evalList = [];

			for (var i in strs) {
				tmpl[i * 2] = strs[i];
			}

			var _handler$1 = function () {
				var ref;

				for (var i$1 = 0, list = evalList; i$1 < list.length; i$1 += 1) {
					var i = list[i$1];

					i();
				}
				return handler((ref = '').concat.apply(ref, tmpl))
			};

			evalList.push.apply(evalList, exprs.map(function (item, index) {
				var ref = initBinding(ctx, {bind: item});
				var dataNode = ref.dataNode;
				var handlerNode = ref.handlerNode;
				var _key = ref._key;
				handlerNode.push(_handler$1);

				index = index * 2 + 1;

				return function () {
					tmpl[index] = getVal(dataNode, _key);
				}
			}));

			return _handler$1
		}
		return function () { return val; }
	};

	var applyEventListener = function (ref) {
		var element = ref.element;
		var custom = ref.custom;
		var handler = ref.handler;
		var ref_trigger = ref.trigger;
		var l = ref_trigger.l;
		var s = ref_trigger.s;
		var i = ref_trigger.i;
		var p = ref_trigger.p;
		var h = ref_trigger.h;
		var a = ref_trigger.a;
		var c = ref_trigger.c;
		var t = ref_trigger.t;
		var u = ref_trigger.u;
		var e = ref_trigger.e;
		var o = ref_trigger.o;
		var k = ref_trigger.k;


		/*
		 *  l: listener                 : string
		 *  s: stopPropagation          : number/undefined
		 *  i: stopImmediatePropagation : number/undefined
		 *  p: preventDefault           : number/undefined
		 *  h: shiftKey                 : number/undefined
		 *  a: altKey                   : number/undefined
		 *  c: ctrlKey                  : number/undefined
		 *  t: metaKey                  : number/undefined
		 *  u: capture                  : number/undefined
		 *  e: passive                  : number/undefined
		 *  o: once                     : number/undefined
		 *  k: keyCodes                 : array<number>/undefined
		 */

		var checkEventProps = function (event) {
			if (!!h !== !!event.shiftKey ||
				!!a !== !!event.altKey ||
				!!c !== !!event.ctrlKey ||
				!!t !== !!event.metaKey ||
				(k && k.indexOf(event.which) === -1)) { return false }
			return true
		};

		var handleStopOptions = function (event) {
			if (s) { event.stopPropagation(); }
			if (i) { event.stopImmediatePropagation(); }
		};

		var eventOptions = {
			capture: !!u
		};

		var baseEventHandler = function (event) {
			handleStopOptions(event);
			if (p && !e) { event.preventDefault(); }
			handler(event);
		};

		var eventHandler = function (event) {
			if (!checkEventProps(event)) { return }
			baseEventHandler(event);
		};

		if (e || o) {
			var makePassiveEventHandler = function () {
				baseEventHandler = function (event) {
					handleStopOptions(event);
					setTimeout(function () { return handler(event); }, 0);
				};
				eventHandler = function (event) {
					if (!checkEventProps(event)) { return }
					baseEventHandler(event);
				};
			};

			var makeOnceEventHandler = function () {
				var removeListener = custom && '$off' || 'removeEventListener';
				eventHandler = function (event) {
					if (!checkEventProps(event)) { return }
					element[removeListener](l, eventHandler, eventOptions);
					baseEventHandler(event);
				};
			};

			if (DOM.passiveSupported || DOM.onceSupported) {
				if (e === 0 && DOM.passiveSupported) {
					eventOptions.passive = false;
				} else if (e) {
					if (DOM.passiveSupported) { eventOptions.passive = true; }
					else { makePassiveEventHandler(); }
				}

				if (o) {
					if (DOM.onceSupported) { eventOptions.once = true; }
					else { makeOnceEventHandler(); }
				}

			} else {
				if (e) { makePassiveEventHandler(); }
				if (o) { makeOnceEventHandler(); }
			}
		}

		var addListener = custom && '$on' || 'addEventListener';
		element[addListener](l, eventHandler, eventOptions);
	};

	var addValListener = function (ctx, ref) {
		var trigger = ref.trigger;
		var updateLock = ref.updateLock;
		var element = ref.element;
		var lastNode = ref.lastNode;
		var key = ref.key;
		var expr = ref.expr;
		var custom = ref.custom;

		var addListener = custom && '$on' || 'addEventListener';
		var ref$1 = initBinding(ctx, {bind: expr});
		var parentNode = ref$1.parentNode;
		var _key = ref$1._key;

		var handler = function () {
			updateLock.locked = true;
			inform();
			parentNode[_key] = lastNode[key];
			exec();
			updateLock.locked = false;
		};

		var eventOptions = {
			capture: true
		};

		if (trigger) {
			applyEventListener({element: element, custom: custom, handler: handler, trigger: trigger});
		} else if (key === 'value') {
			// Listen to input, keyup and change events in order to work in most browsers.
			element[addListener]('input', handler, eventOptions);
			element[addListener]('keyup', handler, eventOptions);
			element[addListener]('change', handler, eventOptions);
		} else {
			var dispatch = custom && '$dispatch' || 'dispatchEvent';
			element[addListener]('change', function () {
				// Trigger change to the element it-self
				element[dispatch](getEvent('__ef_change_event__'), {bubbles: false, cancelable: false});
				if (element.tagName === 'INPUT' && element.type === 'radio' && element.name !== '') {
					// Trigger change to the the same named radios
					var radios = DOM.document.querySelectorAll(("input[name=" + (element.name) + "][type=radio]"));
					if (radios) {
						var selected = ARR.copy(radios);
						ARR.remove(selected, element);

						/* Event triggering could cause unwanted render triggers
						 * no better ways came up at the moment
						 */
						for (var i$1 = 0, list = selected; i$1 < list.length; i$1 += 1) {
							var i = list[i$1];

							i.dispatchEvent(getEvent('__ef_change_event__'));
						}
					}
				}
			}, eventOptions);
			// Use custom event to avoid loops and conflicts
			element[addListener]('__ef_change_event__', handler);
		}
	};

	var getAttrHandler = function (ctx, ref) {
		var element = ref.element;
		var key = ref.key;
		var custom = ref.custom;

		// Pass directly to custom component
		if (custom) { return function (val) {
			element[key] = val;
		} }

		// Beautify class name
		if (key === 'class') { return function (val) {
			val = ("" + val).replace(/\s+/g, ' ').trim();
			// Remove attribute when value is empty
			if (!val) { return element.removeAttribute(key) }
			element.setAttribute(key, val);
		} }

		// Handle namespace
		if (hasColon(key)) {
			var ref$1 = splitByColon(key);
			var prefix = ref$1[0];
			var namespace = ctx.localNamespaces[prefix] || getNamespace(prefix);
			return function (val) {
				// Remove attribute when value is empty
				if (val === '') { return element.removeAttributeNS(namespace, key) }
				element.setAttributeNS(namespace, key, val);
			}
		}

		return function (val) {
			// Remove attribute when value is empty
			if (val === '') { return element.removeAttribute(key) }
			element.setAttribute(key, val);
		}
	};

	var addAttr = function (ctx, ref) {
		var element = ref.element;
		var attr = ref.attr;
		var key = ref.key;
		var custom = ref.custom;

		if (typeValid(attr)) {
			if (custom) {
				if (attr === '') {
					element[key] = true;
				} else {
					element[key] = attr;
				}

				return
			}
			// Do not set or update `is` again
			if (key === 'is') { return }
			// Handle namespaces
			if (hasColon(key)) {
				var ref$1 = splitByColon(key);
				var prefix = ref$1[0];
				if (prefix !== 'xmlns') {
					var ns = ctx.localNamespaces[prefix] || getNamespace(prefix);
					return element.setAttributeNS(ns, key, attr)
				}
			}
			return element.setAttribute(key, attr)
		}

		var handler = getAttrHandler(ctx, {element: element, key: key, custom: custom});
		queue(regTmpl(ctx, {val: attr, handler: handler}));
	};

	var addProp = function (ctx, ref) {
		var element = ref.element;
		var propPath = ref.propPath;
		var value = ref.value;
		var trigger = ref.trigger;
		var updateOnly = ref.updateOnly;
		var custom = ref.custom;

		var keyPath = ARR.copy(propPath);
		var lastKey = keyPath.pop();
		if (custom) { keyPath.unshift('$data'); }
		var lastNode = resolvePath(keyPath, element);
		if (typeValid(value)) { lastNode[lastKey] = value; }
		else {
			var updateLock = {locked: false};
			var handler = function (val) {
				if (!updateLock.locked && lastNode[lastKey] !== val) {
					lastNode[lastKey] = val;
				}
				updateLock.locked = false;
			};

			if (updateOnly) { handler = function () {
				updateLock.locked = false;
			}; }
			var _handler = regTmpl(ctx, {val: value, handler: handler});
			if (trigger ||
				(propPath.length === 1 && (lastKey === 'value' || lastKey === 'checked')) &&
				!value[0]) { addValListener(ctx, {trigger: trigger, updateLock: updateLock, element: element, lastNode: lastNode, key: lastKey, expr: value[1], custom: custom}); }
			queue(_handler);
		}
	};

	var rawHandler = function (val) { return val; };

	var addEvent = function (ctx, ref) {
		var element = ref.element;
		var trigger = ref.trigger;
		var custom = ref.custom;


		/*
		 *  m: method                   : string
		 *  v: value                    : string/array/undefined
		 */
		var m = trigger.m;
		var v = trigger.v;
		var _handler = regTmpl(ctx, {val: v, ctx: ctx, handler: rawHandler});

		var callEventHandler = function (event) {
			if (ctx.methods[m]) { ctx.methods[m]({e: event, event: event, value: _handler(), state: ctx.state}); }
			else { ctx.state.$emit(m); }
		};

		applyEventListener({element: element, custom: custom, handler: callEventHandler, trigger: trigger});
	};

	var createElement$1 = function (ctx, ref) {
		var info = ref.info;
		var namespace = ref.namespace;
		var fragment = ref.fragment;
		var custom = ref.custom;

		if (fragment) { return new EFFragment() }

		/*
		 *  t: tag           : class | string | int, 0 means fragment
		 *  a: attr          : object
		 *  p: prop          : object
		 *  e: event trigger : array
		 *  r: reference     : string
		 */
		var t = info.t;
		var a = info.a;
		var p = info.p;
		var e = info.e;
		var r = info.r;
		var tagName = t;
		var tagContent = ctx.scope[t] || t;
		var element = getElement({tagName: tagName, tagContent: tagContent, attrs: a, ref: r, refs: ctx.refs, namespace: namespace});
		if (a) { for (var key in a) { addAttr(ctx, {element: element, custom: custom, attr: a[key], key: key}); } }
		if (p) { for (var i = 0, list = p; i < list.length; i += 1) {
				var ref$1 = list[i];
				var propPath = ref$1[0];
				var value = ref$1[1];
				var trigger = ref$1[2];
				var updateOnly = ref$1[3];

				addProp(ctx, {element: element, custom: custom, value: value, propPath: propPath, trigger: trigger, updateOnly: updateOnly});
			} }
		if (e) { for (var i$1 = 0, list$1 = e; i$1 < list$1.length; i$1 += 1) {
				var trigger$1 = list$1[i$1];

				addEvent(ctx, {element: element, custom: custom, trigger: trigger$1});
			} }

		return element
	};

	var DOMARR = {
		empty: function empty() {
			inform();
			for (var i$1 = 0, list = ARR.copy(this); i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$destroy();
			}
			exec();
			ARR.empty(this);
		},
		clear: function clear() {
			inform();
			for (var i$1 = 0, list = ARR.copy(this); i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
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
			var this$1$1 = this;
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			var items = [], len = arguments.length - 1;
			while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];

			if (!items.length) { return }
			items = items.map(shared.toEFComponent);
			inform();
			useFragment(function (tempFragment, recycleFragment) {
				DOM.append.apply(DOM, [ tempFragment ].concat( items.map(function (i) { return i.$mount({parent: ctx.state, key: key}); }) ));
				useAnchor(function (tempAnchor, recycleAnchor) {
					if (this$1$1.length === 0) { DOM.after(anchor, tempAnchor); }
					else { DOM.after(this$1$1[this$1$1.length - 1].$ctx.nodeInfo.placeholder, tempAnchor); }
					queueDom(function () {
						DOM.after(tempAnchor, tempFragment);
						recycleAnchor();
						recycleFragment();
					});
				});
			});
			exec();
			return ARR.push.apply(ARR, [ this ].concat( items ))
		},
		remove: function remove(item) {
			if (this.indexOf(item) === -1) { return }
			item.$umount();
			return item
		},
		reverse: function reverse(ref) {
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;

			if (this.length === 0) { return this }
			var tempArr = ARR.copy(this);
			var elements = [];
			inform();
			queueDom(function () { return DOM.after.apply(DOM, [ anchor ].concat( ARR.reverse(elements) )); });
			for (var i$1 = 0, list = tempArr; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			ARR.push.apply(ARR, [ this ].concat( ARR.reverse(tempArr) ));
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
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;

			if (this.length === 0) { return this }
			var sorted = ARR.copy(ARR.sort(this, fn));
			var elements = [];
			inform();
			queueDom(function () { return DOM.after.apply(DOM, [ anchor ].concat( elements )); });
			for (var i$1 = 0, list = sorted; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			ARR.push.apply(ARR, [ this ].concat( sorted ));
			exec();
			return this
		},
		splice: function splice(ref) {
			var this$1$1 = this;
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			var args = [], len = arguments.length - 1;
			while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

			if (this.length === 0) { return this }
			var idx = args[0];
			var length = args[1];
			var inserts = args.slice(2);
			// const copiedArr = ARR.copy(this)
			var spliced = ARR.splice(this, idx, length);
			inform();
			for (var i$1 = 0, list = spliced; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
			}
			if (inserts.length) {
				if (inserts.length > 1) {
					useAnchor(function (tempAnchor, recycleAnchor) {
						if (idx > 0 && this$1$1[idx - 1]) { DOM.after(this$1$1[idx - 1].$ctx.nodeInfo.placeholder, tempAnchor); }
						else { DOM.after(anchor, tempAnchor); }
						useFragment(function (fragment, recycleFragment) {
							var insertItems = inserts.map(function (i) { return shared.toEFComponent(i); });
							DOM.append.apply(DOM, [ fragment ].concat( insertItems.map(function (i) { return i.$mount({parent: ctx.state, key: key}); }) ));
							ARR.splice.apply(ARR, [ this$1$1, idx, 0 ].concat( insertItems ));
							queueDom(function () {
								DOM.before(tempAnchor, fragment);
								DOM.remove(tempAnchor);
								recycleAnchor();
								recycleFragment();
							});
						});
					});
				} else {
					var item = shared.toEFComponent(inserts[0]);
					item.$mount({parent: ctx.state, key: key});
					if (idx > 0 && this[idx - 1]) { DOM.after(this[idx - 1].$ctx.nodeInfo.placeholder, item.$ctx.nodeInfo.placeholder); }
					ARR.splice(this, idx, 0, item);
				}
			}
			exec();
			return spliced
		},
		unshift: function unshift(ref) {
			var ref$1;

			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			var items = [], len = arguments.length - 1;
			while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];
			if (this.length === 0) { return (ref$1 = this).push.apply(ref$1, items).length }
			items = items.map(shared.toEFComponent);
			var elements = [];
			inform();
			queueDom(function () { return DOM.after.apply(DOM, [ anchor ].concat( elements )); });
			for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			exec();
			return ARR.unshift.apply(ARR, [ this ].concat( items ))
		}
	};

	var defineArr = function (arr, info) {
		Object.defineProperties(arr, {
			empty: {value: DOMARR.empty},
			clear: {value: DOMARR.clear},
			pop: {value: DOMARR.pop},
			push: {value: DOMARR.push.bind(arr, info)},
			remove: {value: DOMARR.remove},
			reverse: {value: DOMARR.reverse.bind(arr, info)},
			shift: {value: DOMARR.shift},
			sort: {value: DOMARR.sort.bind(arr, info)},
			splice: {value: DOMARR.splice.bind(arr, info)},
			unshift: {value: DOMARR.unshift.bind(arr, info)}
		});
		return arr
	};

	var svgNS = getNamespace('svg');
	var mathNS = getNamespace('math');
	var htmlNS = getNamespace('html');

	var nullComponent = Object.create(null);

	var checkDestroyed = function (state) {
		if (!state.$ctx) { throw new Error('[EF] This component has been destroyed!') }
	};

	var bindTextNode = function (ctx, ref) {
		var node = ref.node;
		var element = ref.element;

		// Data binding text node
		var textNode = DOM.document.createTextNode('');
		var ref$1 = initBinding(ctx, {bind: node});
		var dataNode = ref$1.dataNode;
		var handlerNode = ref$1.handlerNode;
		var _key = ref$1._key;
		var handler = function () {
			var value = dataNode[_key];
			if (typeof value === 'undefined') {
				textNode.textContent = '';
				return
			}
			textNode.textContent = value;
		};
		handlerNode.push(handler);
		queue(handler);

		// Append element to the component
		DOM.append(element, textNode);
	};

	var updateMountNode = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var value = ref.value;

		var children = ctx.children;
		var child = children[key];
		var anchor = child.anchor;
		var node = child.node;
		if (node === value) { return }

		value = shared.toEFComponent(value);

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

	var updateMountList = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var value = ref.value;

		var children = ctx.children;
		var ref$1 = children[key];
		var anchor = ref$1.anchor;
		var node = ref$1.node;
		if (ARR.equals(node, value)) { return }
		inform();
		if (node.length) { node.clear(); }
		if (value) {
			value = ARR.copy(value);
			useFragment(function (fragment, putBack) {
				// Update components
				for (var i = 0, list = value; i < list.length; i += 1) {
					var item = list[i];

					DOM.append(fragment, shared.toEFComponent(item).$mount({parent: ctx.state, key: key}));
				}
				// Update stored value
				ARR.push.apply(ARR, [ node ].concat( value ));
				// Append to current component
				queueDom(function () {
					DOM.after(anchor, fragment);
					putBack();
				});
			});
		}
		exec();
	};

	var mountPointUpdaters = [
		updateMountNode,
		updateMountList
	];

	var applyMountPoint = function (type, key, tpl) {
		Object.defineProperty(tpl.prototype, key, {
			get: function get() {
				{ checkDestroyed(this); }
				return this.$ctx.children[key].node
			},
			set: function set(value) {
				{ checkDestroyed(this); }
				var ctx = this.$ctx;
				mountPointUpdaters[type]({ctx: ctx, key: key, value: value});
			},
			enumerable: true
		});
	};

	var bindMountNode = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var anchor = ref.anchor;

		var children = ctx.children;
		var isFragment = ctx.isFragment;
		children[key] = {anchor: anchor};
		anchor[EFMountPoint] = children[key];
		if (isFragment) { DOM.append(ctx.safeZone, anchor); }
	};

	var bindMountList = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var anchor = ref.anchor;

		var children = ctx.children;
		var isFragment = ctx.isFragment;
		children[key] = {
			node: defineArr([], {ctx: ctx, key: key, anchor: anchor}),
			anchor: anchor
		};
		anchor[EFMountPoint] = children[key];
		if (isFragment) { DOM.append(ctx.safeZone, anchor); }
	};

	// Walk through the AST to perform proper actions
	var resolveAST = function (ctx, ref) {
		var node = ref.node;
		var nodeType = ref.nodeType;
		var element = ref.element;
		var namespace = ref.namespace;
		var create = ref.create;

		if (DOM.isNodeInstance(node)) {
			DOM.append(element, node);
			return
		}

		switch (nodeType) {
			// Static text node
			case 'string': {
				DOM.append(element, DOM.document.createTextNode(node));
				break
			}
			// Child element or a dynamic text node
			case 'array': {
				// Recursive call for child element
				if (typeOf(node[0]) === 'object') { DOM.append(element, create(ctx, {node: node, namespace: namespace})); }
				// Dynamic text node
				else { bindTextNode(ctx, {node: node, element: element}); }
				break
			}
			// Mount points
			case 'object': {
				var anchor = DOM.document.createTextNode('');
				// Single node mount point
				if (node.t === 0) { bindMountNode({ctx: ctx, key: node.n, anchor: anchor}); }
				// Multi node mount point
				else { bindMountList({ctx: ctx, key: node.n, anchor: anchor}); }
				// Append anchor
				{ DOM.append(element, DOM.document.createComment(("<MountPoint name=\"" + (node.n) + "\"" + (node.t && ' type="list"' || '') + ">"))); }
				DOM.append(element, anchor);
				{ DOM.append(element, DOM.document.createComment('</MountPoint>')); }
				break
			}
		}
	};

	// Create elements based on description from AST
	/* eslint {"complexity": "off"} */
	var create$2 = function (ctx, ref) {
		var node = ref.node;
		var namespace = ref.namespace;

		var info = node[0];
		var childNodes = node.slice(1);
		var previousNamespace = namespace;

		var tagName = info.t;
		var isLocalPrefix = false;

		var fragment = tagName === 0;
		var custom = Object.isPrototypeOf.call(shared.EFBaseComponent, ctx.scope[tagName] || tagName);

		// Check if element needs a namespace
		if (!fragment && !custom) {
			if (ctx.scope[tagName]) {
				var scoped = ctx.scope[tagName];
				if (typeof scoped === 'string') { tagName = scoped; }
				else if (scoped.tag) {
					tagName = scoped.tag;
					if (scoped.namespaceURI) { namespace = scoped.namespaceURI; }
				}
			}
			if (hasColon(tagName)) {
				var ref$1 = splitByColon(tagName);
				var prefix = ref$1[0];
				var unprefixedTagName = ref$1[1];
				if (ctx.localNamespaces[prefix]) {
					namespace = ctx.localNamespaces[prefix];
					isLocalPrefix = true;
				} else {
					namespace = getNamespace(prefix);
				}
				tagName = unprefixedTagName;
			} else if (info.a && info.a.xmlns && typeValid(info.a.xmlns)) {
				namespace = info.a.xmlns;
			} else if (!namespace) {
				tagName = tagName.toLowerCase();
				switch (tagName) {
					case 'svg': {
						namespace = svgNS;
						break
					}
					case 'math': {
						namespace = mathNS;
						break
					}
				}
			}
		}

		if (namespace === htmlNS) { namespace = ''; }

		// First create an element according to the description
		var element = createElement$1(ctx, {info: info, namespace: namespace, fragment: fragment, custom: custom});
		if (fragment && 'development' !== 'production') { DOM.append(element, DOM.document.createComment('<Fragment>')); }

		// Leave SVG mode if tag is `foreignObject`
		if (namespace && namespace === svgNS && isSVGEscape(tagName)) { namespace = ''; }

		// restore previous namespace if namespace is defined locally
		if (isLocalPrefix) { namespace = previousNamespace; }

		// Append child nodes
		for (var i = 0, list = childNodes; i < list.length; i += 1) {
			var node$1 = list[i];

			if (node$1 instanceof shared.EFBaseComponent) { node$1.$mount({target: element}); }
			else { resolveAST(ctx, {node: node$1, nodeType: typeOf(node$1), element: element, namespace: namespace, create: create$2}); }
		}
		if (fragment && 'development' !== 'production') { DOM.append(element, DOM.document.createComment('</Fragment>')); }

		return element
	};

	var getGetter = function (ref, ref$1) {
		var base = ref.base;
		var key = ref.key;
		var checkTrue = ref$1.checkTrue;
		var get = ref$1.get;
		var set = ref$1.set;

		if (get) {
			if (!set) { throw new Error('[EF] Setter must be defined when getter exists') }
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
			if (!get) { throw new Error('[EF] Getter must be defined when setter exists') }
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

	/**
	 * @typedef {import('./renderer.js').EFBaseClass} EFBaseClass
	 */

	/**
	 * Definition of an attribute mapping
	 * @typedef {Object} AttrDef
	 * @property {string=} key - key to be accessed on base, default to `attr`
	 * @property {Function=} base - a function that returns the base of the key, default returns $data
	 * @property {bool=} checkTrue - a function returns true or false based on input value
	 * @property {*=} trueVal - value when true, only used when checkTrue is set
	 * @property {*=} falseVal - value when false, only used when checkTrue is set
	 * @property {Function=} get - getter, will ignore all other settings except set
	 * @property {Function=} set - setter, will ignore all other settings except get
	 */

	/**
	 * Data to attribute mapping helper
	 * @template {EFBaseClass} T
	 * @param {T} tpl - Component class to be mapped
	 * @param {Object.<string,AttrDef>} attrMap - Attributes to be mapped
	 * @returns {T} - Mapped component class
	 */
	var mapAttrs = function (tpl, attrMap) {
		for (var attr in attrMap) {
			var options = attrMap[attr];

			var base = getBase(options.base);
			var key = options.key || attr;

			var basicProperty = {base: base, key: key};

			var get = getGetter(basicProperty, options);
			var set = getSetter(basicProperty, options);

			Object.defineProperty(tpl.prototype, attr, {
				get: get,
				set: set,
				enumerable: true,
				configurable: false
			});
		}

		return tpl
	};

	var unsubscribe = function (pathStr, fn, subscribers) {
		var subscriberNode = resolveSubscriber(pathStr, subscribers);
		ARR.remove(subscriberNode, fn);
	};

	/**
	 * @typedef {Array} EFAST
	 * @typedef {Object.<string,EFBaseComponent>} EFTemplateScope
	 */

	/**
	 * @typedef {Object} EFSubscriberHandlerArg
	 * @property {EFBaseComponent} ctx - The component who calls the handler
	 * @property {*} value - Value been subscribed
	 */

	/**
	 * @event Event
	 */

	/**
	 * @typedef {Object} EFEventHandlerArg
	 * @property {EFBaseComponent} ctx - The component who calls the handler
	 * @property {*} value - Value been passed to the event handler
	 * @property {Event} event - Event object that has been triggered
	 */

	/**
	 * @typedef {Function} EFSubscriberHandlerMethod
	 * @param {EFSubscriberHandlerArg} arg
	 * @returns {void}
	 */

	/**
	 * @typedef {Function} EFEventHandlerMethod
	 * @param {EFEventHandlerArg} arg
	 * @returns {void}
	 */

	/**
	 * The very basic ef component
	 * @class EFBaseComponent
	 * @param {EFAST} ast - ast for the component
	 * @param {EFTemplateScope} scope - scope which contains custom components
	 * @private {Object} $ctx - Inner component data, DO NOT TOUCH
	 * @property {Object} $data - Data on component
	 * @property {Object.<string,EFEventHandlerMethod>} $methods - Methods on component
	 * @property {Object.<string,(EFBaseComponent|Node)>} $refs - References on component
	 */
	var EFBaseComponent = /*@__PURE__*/(function () {
		function EFBaseComponent(ast, scope) {
		if ( scope === void 0 ) scope = {};

			var children = {};
			var refs = {};
			var data = {};
			var innerData = {};
			var methods = {};
			var handlers = {};
			var subscribers = {};
			var nodeInfo = {
				placeholder: null,
				eventBus: null,
				replace: [],
				parent: null,
				key: null
			};

			var isFragment = ast[0].t === 0;

			var safeZone = DOM.document.createDocumentFragment();

			{ nodeInfo.placeholder = DOM.document.createComment(("<" + (this.constructor.name) + "/>")); }

			if (DOM.textNodeSupportsEvent) { nodeInfo.eventBus = nodeInfo.placeholder; }
			else { nodeInfo.eventBus = document.createElement('i'); }

			var mount = function () {
				if (nodeInfo.replace.length) {
					for (var i$1 = 0, list = nodeInfo.replace; i$1 < list.length; i$1 += 1) {
					var i = list[i$1];

					DOM.remove(i);
				}
					ARR.empty(nodeInfo.replace);
				}
				DOM.before(nodeInfo.placeholder, nodeInfo.element);
			};

			var ctx = {
				ast: ast, scope: scope, mount: mount, refs: refs, data: data, innerData: innerData, methods: methods,
				handlers: handlers, subscribers: subscribers, nodeInfo: nodeInfo, safeZone: safeZone,
				children: children, state: this, isFragment: isFragment,
				localNamespaces: this.constructor.__local_namespaces,
				self: this, constructor: this.constructor
			};

			Object.defineProperty(this, '$ctx', {
				value: ctx,
				enumerable: false,
				configurable: true
			});

			inform();

			nodeInfo.element = create$2(ctx, {node: ast, namespace: ''});
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

		/**
		 * @typedef {import('../mount-options.js').EFMountConfig} EFMountConfig
		 */

		/**
		 * Mount component to a specitic position
		 * @param {EFMountConfig} config - Mount contigurations
		 * @returns {number} - Render count down
		 */
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
				{ dbg.warn('Component detached from previous mount point.'); }
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

		/**
		 * @param {boolean} destroy - Set true to skip DOM operations
		 * @returns {number} - Render count down
		 */
		EFBaseComponent.prototype.$umount = function $umount (destroy) {
			{ checkDestroyed(this); }
			var ref = this.$ctx;
			var nodeInfo = ref.nodeInfo;
			var mount = ref.mount;
			var safeZone = ref.safeZone;
			var parent = nodeInfo.parent;
			var key = nodeInfo.key;
			nodeInfo.parent = null;
			nodeInfo.key = null;

			inform();
			if (parent) {
				if (key !== '__DIRECTMOUNT__') {
					if (parent[key]) {
						if (ARR.isArray(parent[key])) {
							// Remove self from parent list mount point
							ARR.remove(parent[key], this);
						} else { parent[key] = nullComponent; }
					}
				// Else Remove elements from fragment parent
				} else if (isInstance(parent, EFFragment)) { parent.$ctx.nodeInfo.element.removeChild(nodeInfo.element); }
			}
			if (!destroy) {
				DOM.append(safeZone, nodeInfo.placeholder);
				queueDom(mount);
			}
			return exec()
		};

		/**
		 * Subscribe a value's changing
		 * @param {string} pathStr - Path string to the subribed value based on `$data`, splitted by `.`
		 * @param {EFSubscriberHandlerMethod} subscriber - Subscription event handler to be added
		 * @returns {void}
		 */
		EFBaseComponent.prototype.$subscribe = function $subscribe (pathStr, subscriber) {
			{ checkDestroyed(this); }
			var ctx = this.$ctx;
			var _path = pathStr.split('.');
			var ref = initBinding(ctx, {bind: [_path]});
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

		/**
		 * Unsubscribe a value's changing
		 * @param {string} pathStr - Path string to the subribed value based on `$data`, splitted by `.`
		 * @param {EFSubscriberHandlerMethod} subscriber - Subscription event handler to be removed
		 * @returns {void}
		 */
		EFBaseComponent.prototype.$unsubscribe = function $unsubscribe (pathStr, subscriber) {
			{ checkDestroyed(this); }
			var ref = this.$ctx;
			var subscribers = ref.subscribers;
			unsubscribe(pathStr, subscriber, subscribers);
		};

		/**
		 * Update the component's state with a new state
		 * @param {Object} newState - New state to be set on this component
		 * @returns {void}
		 */
		EFBaseComponent.prototype.$update = function $update (newState) {
			{ checkDestroyed(this); }
			inform();
			legacyAssign(this, newState);
			exec();
		};

		/**
		 * Fire a custom event using an Event object on this component
		 * @param {Event} event - Event object to be dispatched on this component
		 * @returns {*} - Same as the return of Node.dispatchEvent
		 */
		EFBaseComponent.prototype.$dispatch = function $dispatch (event) {
			{ checkDestroyed(this); }
			return this.$ctx.nodeInfo.eventBus.dispatchEvent(event)
		};

		/**
		 * @typedef {import('./utils/event-helper.js').EFEventOptions} EFEventOptions
		 */

		/**
		 * Fire a custom event using event name on this component
		 * @param {string} eventName - Name of the custom event
		 * @param {EFEventOptions} options - Event Options
		 * @returns {*} - Same as the return of Node.dispatchEvent
		 */
		EFBaseComponent.prototype.$emit = function $emit (eventName, options) {
			{ checkDestroyed(this); }
			return this.$dispatch(getEvent(eventName, options))
		};

		/**
		 * Add custom event listener on this component
		 * @param {string} eventName - Name of the event
		 * @param {function} handler - Handler for the event
		 * @param {object|boolean} options - Event listener options or useCapture
		 * @returns {function} - Event Handler disposal method
		 */
		EFBaseComponent.prototype.$on = function $on (eventName, handler, options) {
			var this$1$1 = this;
			if ( options === void 0 ) options = {};

			{ checkDestroyed(this); }
			this.$ctx.nodeInfo.eventBus.addEventListener(eventName, handler, options);
			return function () { return this$1$1.$off(eventName, handler, options); }
		};

		/**
		 * Remove custom event listener on this component
		 * @param {string} eventName - Name of the event
		 * @param {function} handler - Handler for the event
		 * @param {object|boolean} options - Event listener options or useCapture
		 * @returns {*} - Same as the return of Node.removeEventListener
		 */
		EFBaseComponent.prototype.$off = function $off (eventName, handler, options) {
			{ checkDestroyed(this); }
			return this.$ctx.nodeInfo.eventBus.removeEventListener(eventName, handler, options)
		};

		/**
		 * Destroy this component
		 * @returns {number} - Render count down
		 */
		EFBaseComponent.prototype.$destroy = function $destroy () {
			{ checkDestroyed(this); }
			var ref = this.$ctx;
			var nodeInfo = ref.nodeInfo;
			var children = ref.children;
			inform();
			this.$umount();
			for (var i in children) { children[i].anchor[EFMountPoint] = null; }
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

	/**
	 * @typedef {typeof EFBaseComponent} EFBaseClass
	 */

	var fragmentAST = [{t: 0}];

	/**
	 * ef component node wrapper
	 * Better using this than Fragments if wrapping only HTML elements.
	 * @class EFNodeWrapper
	 * @extends EFBaseComponent
	 * @param {...Node} nodes - Nodes to be wrapped
	 * @property {Array<Node>} - Nodes that are wrapped
	 */
	var EFNodeWrapper = /*@__PURE__*/(function (EFBaseComponent) {
		function EFNodeWrapper() {
			var nodes = [], len = arguments.length;
			while ( len-- ) nodes[ len ] = arguments[ len ];

			EFBaseComponent.call(this, fragmentAST);

			var element = this.$ctx.nodeInfo.element;
			element.append.apply(element, nodes);

			{
				var childrenArr = element.$children;
				element.append(ARR.remove(childrenArr, childrenArr[1]));
			}

			this.$ctx.elements = nodes;
		}

		if ( EFBaseComponent ) EFNodeWrapper.__proto__ = EFBaseComponent;
		EFNodeWrapper.prototype = Object.create( EFBaseComponent && EFBaseComponent.prototype );
		EFNodeWrapper.prototype.constructor = EFNodeWrapper;

		var prototypeAccessors$1 = { $el: { configurable: true } };

		prototypeAccessors$1.$el.get = function () {
			return this.$ctx.elements
		};

		Object.defineProperties( EFNodeWrapper.prototype, prototypeAccessors$1 );

		return EFNodeWrapper;
	}(EFBaseComponent));

	/**
	 * Component fragment wrapper
	 * @class Fragment
	 * @extends EFBaseComponent
	 * @param {...*} children - Things to be wrapped into an ef component
	 */
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

	var textFragmentAst = [{t: 0},[['t']]];

	/**
	 * ef component text wrapper
	 * @class EFTextFragment
	 * @extends EFBaseComponent
	 * @param {string} text - String to be wrapped
	 * @property {string} text - Text on the fragment component
	 */
	var EFTextFragment = /*@__PURE__*/(function (EFBaseComponent) {
		function EFTextFragment(text) {
			inform();
			EFBaseComponent.call(this, textFragmentAst);
			this.t = text;
			exec();
		}

		if ( EFBaseComponent ) EFTextFragment.__proto__ = EFBaseComponent;
		EFTextFragment.prototype = Object.create( EFBaseComponent && EFBaseComponent.prototype );
		EFTextFragment.prototype.constructor = EFTextFragment;

		return EFTextFragment;
	}(EFBaseComponent));
	mapAttrs(EFTextFragment, {text: {}});

	enumerableFalse(EFBaseComponent, ['$mount', '$umount', '$subscribe', '$unsubscribe', '$update', '$dispatch', '$emit', '$on', '$off', '$destroy']);
	enumerableFalse(EFNodeWrapper, ['$el']);

	/**
	 * Transform almost anyting into ef component
	 * @template {value} T
	 * @param {T} value - Things to be transformed into ef component
	 * @returns {(EFNodeWrapper|EFTextFragment|T)} - Wrapped component or value it self if not supports converting
	 */
	var toEFComponent = function (value) {
		if (value === null || typeof value === 'undefined' || value instanceof EFBaseComponent) { return value }

		if (value !== nullComponent) {
			if (DOM.isNodeInstance(value)) { return new EFNodeWrapper(value) }
			else if (typeof value === 'string') { return new EFTextFragment(value) }
			else { return new EFTextFragment(JSON.stringify(value)) }
		}
	};

	shared.EFBaseComponent = EFBaseComponent;
	shared.toEFComponent = toEFComponent;

	var flatten = function (prev, item) {
		if (ARR.isArray(item)) { prev.push.apply(prev, item.map(toEFComponent)); }
		else { prev.push(toEFComponent(item)); }

		return prev
	};

	/**
	 * @typedef {import('./renderer.js').EFBaseComponent} EFBaseComponent
	 * @typedef {import('./renderer.js').EFBaseClass} EFBaseClass
	 */

	// eslint-disable-next-line valid-jsdoc
	/**
	 * Create ef component from JSX
	 * @template {EFBaseClass} T
	 * @param {(string|T)} tag - JSX tag
	 * @param {Object.<string,*>} attrs - JSX attributes
	 * @param  {...*} children - JSX children
	 * @returns {(EFBaseComponent|T extends {new (...args: any): infer R} ? R : never)} ef component created from JSX
	 */
	var createElement = function (tag, attrs) {
		var children = [], len = arguments.length - 2;
		while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

		// Create special component for fragment
		if (tag === Fragment) { return new (Function.prototype.bind.apply( Fragment, [ null ].concat( children) )) }

		// Create an instance if tag is an ef class
		if (Object.isPrototypeOf.call(EFBaseComponent, tag)) {
			if (children.length <= 0) { return new tag(attrs) }
			return new tag(assign({children: children.reduce(flatten, [])}, attrs || {}))
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

	/**
	 * @typedef {import('../renderer.js').EFBaseClass} EFBaseClass
	 * @typedef {import('../renderer.js').EFTemplateScope} EFTemplateScope
	 */

	/**
	 * Attach a default scope to the component class
	 * @template {component} T
	 * @param {EFBaseClass} component - Component class to be scoped
	 * @param {EFTemplateScope} initScope - Scope to be bond on the component class
	 * @returns {T} - Scoped component class
	 */
	var scoped = function (component, initScope) {
		var _scope = assign({}, initScope);
		return /*@__PURE__*/(function (component) {
			function Scoped(state, scope) {
				if ( scope === void 0 ) scope = {};

				component.call(this, state, assign(_scope, scope));
			}

			if ( component ) Scoped.__proto__ = component;
			Scoped.prototype = Object.create( component && component.prototype );
			Scoped.prototype.constructor = Scoped;

			return Scoped;
		}(component))
	};

	// Import everything

	var registerNS = function (attrs, component) {
		for (var i in attrs) {
			if (i.indexOf('xmlns:') === 0) {
				var ref = i.split(':');
				var prefix = ref[1];
				component.__local_namespaces[prefix] = attrs[i];
			}
		}
	};

	// Intialize components
	var initComponent = function (component, node) {
		var nodeType = typeOf(node);
		switch (nodeType) {
			case 'array': {
				var info = node[0];
				var childNodes = node.slice(1);
				if (typeOf(info) === 'object') {
					if (info.a) { registerNS(info.a, component); }
					for (var i$1 = 0, list = childNodes; i$1 < list.length; i$1 += 1) {
						var i = list[i$1];

						initComponent(component, i);
					}
				}
				break
			}
			case 'object': {
				if (node.t > 1) { throw new TypeError(("[EF] Not a standard ef.js AST: Unknown mount point type '" + (node.t) + "'")) }
				applyMountPoint(node.t, node.n, component);
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

	/**
	 * @typedef {import('./mount-options.js').EFMountOption} EFMountOption
	 * @typedef {import('./mount-options.js').EFMountConfig} EFMountConfig
	 * @typedef {import('./lib/renderer.js').EFAST} EFAST
	 * @typedef {import('./lib/renderer.js').EFBaseClass} EFBaseClass
	 * @typedef {import('./lib/renderer.js').EFEventHandlerArg} EFEventHandlerArg
	 * @typedef {import('./lib/renderer.js').EFEventHandlerMethod} EFEventHandlerMethod
	 * @typedef {import('./lib/renderer.js').EFSubscriberHandlerArg} EFSubscriberHandlerArg
	 * @typedef {import('./lib/renderer.js').EFSubscriberHandlerMethod} EFSubscriberHandlerMethod
	 * @typedef {import('./lib/renderer.js').EFTemplateScope} EFTemplateScope
	 * @typedef {import('./lib/renderer.js').Fragment} Fragment
	 * @typedef {import('./lib/renderer.js').EFNodeWrapper} EFNodeWrapper
	 * @typedef {import('./lib/renderer.js').EFTextFragment} EFTextFragment
	 * @typedef {import('./lib/utils/event-helper.js').EFEventOptions} EFEventOptions
	 */

	// eslint-disable-next-line valid-jsdoc
	/**
	 * Create a brand new component class for the new component
	 * @param {EFAST} ast - AST for the component
	 * @param {string=} name - Name of the component
	 */
	var create$1 = function (ast, name) {

		/**
		 * The very basic component which users can use
		 * @class EFComponent
		 * @param {Object=} initState - Initial state for the component to create with
		 * @param {EFTemplateScope=} scope - Scope for the component to render template with
		 */
		var EFComponent = /*@__PURE__*/(function (EFBaseComponent) {
			function EFComponent(initState, scope) {
				inform();
				EFBaseComponent.call(this, ast, scope);
				if (initState) { this.$update(initState); }
				exec();
			}

			if ( EFBaseComponent ) EFComponent.__proto__ = EFBaseComponent;
			EFComponent.prototype = Object.create( EFBaseComponent && EFBaseComponent.prototype );
			EFComponent.prototype.constructor = EFComponent;

			return EFComponent;
		}(EFBaseComponent));

		if (name) {
			Object.defineProperty(EFComponent, 'name', {value: name});
		}

		// Workaround for a bug of buble
		// https://github.com/bublejs/buble/issues/197
		Object.defineProperty(EFComponent.prototype, 'constructor', {enumerable: false});

		Object.defineProperty(EFComponent, '__local_namespaces', {enumerable: false, value: {}});
		initComponent(EFComponent, ast);
		return EFComponent
	};

	var coreVersion = '0.16.2';

	{
		coreVersion = coreVersion + "+debug";

		dbg.info(("ef-core v" + coreVersion + " initialized!"));

		if (typeof globalThis !== 'undefined') {
			if (!globalThis.devtoolsFormatters) { globalThis.devtoolsFormatters = []; }

			var shallowCloneObj = function (obj, deletes) {
				var cloned = Object.create(null);
				var descriptors = Object.getOwnPropertyDescriptors(obj);
				if (deletes) {
					for (var i$1 = 0, list = deletes; i$1 < list.length; i$1 += 1) {
						var i = list[i$1];

						delete descriptors[i];
					}
				}
				Object.defineProperties(cloned, descriptors);
				return cloned
			};

			var formatter = {
				header: function header(obj, config) {
					if (config && config.__raw) { return null }
					if (obj instanceof EFBaseComponent) { return ['div', {style: 'font-weight: bold; color: #5ccccc'}, (">" + (obj.constructor.name || '[Anonymous]'))] }
					return null
				},
				hasBody: function hasBody() {
					return true
				},
				body: function body(obj) {
					var mountPoints = Object.create(null);
					for (var i in obj.$ctx.children) {
						mountPoints[i] = obj.$ctx.children[i].node;
					}

					var elements = [
						['div', {style: 'color: #4bcb5b'}, '$data:           ', ['object', {object: Object.assign(Object.create(null), obj.$ctx.data)}]],
						['div', {style: 'color: #4bcb5b'}, '$refs:           ', ['object', {object: shallowCloneObj(obj.$ctx.refs)}]],
						['div', {style: 'color: #4bcb5b'}, '$methods:        ', ['object', {object: shallowCloneObj(obj.$ctx.methods)}]],
						['div', {style: 'color: #4bcb5b'}, '[[mountpoints]]: ', ['object', {object: mountPoints}]],
						['div', {style: 'color: #cc22bb'}, '[[props]]:       ', ['object', {object: shallowCloneObj(obj, ['$ctx'])}]],
						['div', {style: 'color: #4bcb5b88'}, '[[element]]:     ', ['object', {object: obj.$ctx.nodeInfo.element}]],
						['div', {style: 'color: #4bcb5b88'}, '[[parent]]:      ', ['object', {object: obj.$ctx.nodeInfo.parent}]],
						['div', {style: 'color: #4bcb5b88'}, '[[slot]]:        ', ['object', {object: obj.$ctx.nodeInfo.key}]]
					];
					return ['div', {} ].concat( elements)
				}
			};

			globalThis.devtoolsFormatters.push(formatter);
		}
	}

	// Import everything

	// Set parser
	var parser = parseEft;

	/**
	 * @typedef {import('ef-core/src/ef-core.js').EFMountOption} EFMountOption
	 * @typedef {import('ef-core/src/ef-core.js').EFMountConfig} EFMountConfig
	 * @typedef {import('ef-core/src/ef-core.js').EFAST} EFAST
	 * @typedef {import('ef-core/src/ef-core.js').EFBaseClass} EFBaseClass
	 * @typedef {import('ef-core/src/ef-core.js').EFEventHandlerArg} EFEventHandlerArg
	 * @typedef {import('ef-core/src/ef-core.js').EFEventHandlerMethod} EFEventHandlerMethod
	 * @typedef {import('ef-core/src/ef-core.js').EFSubscriberHandlerArg} EFSubscriberHandlerArg
	 * @typedef {import('ef-core/src/ef-core.js').EFSubscriberHandlerMethod} EFSubscriberHandlerMethod
	 * @typedef {import('ef-core/src/ef-core.js').EFTemplateScope} EFTemplateScope
	 * @typedef {import('ef-core/src/ef-core.js').Fragment} Fragment
	 * @typedef {import('ef-core/src/ef-core.js').EFNodeWrapper} EFNodeWrapper
	 * @typedef {import('ef-core/src/ef-core.js').EFTextFragment} EFTextFragment
	 * @typedef {import('ef-core/src/ef-core.js').EFEventOptions} EFEventOptions
	 */

	// eslint-disable-next-line valid-jsdoc
	/**
	 * Return a brand new class for the new component
	 * @param {string|EFAST} value - Template or AST for the component
	 */
	var create = function (value) {
		var valType = typeOf(value);
		if (valType === 'string') { value = parse(value, parser); }
		else if (valType !== 'array') { throw new TypeError('Cannot create new component without proper template or AST!') }

		return create$1(value)
	};

	/**
	 * Change parser
	 * @param {Function} newParser - Parser you want to change with
	 * @returns {void}
	 */
	var setParser = function (newParser) {
		parser = newParser;
	};

	var mixStr = function (strs) {
		var ref;

		var vars = [], len = arguments.length - 1;
		while ( len-- > 0 ) vars[ len ] = arguments[ len + 1 ];
		var strArr = new Array(strs.length + vars.length);
		for (var i in strs) { strArr[i * 2] = strs[i]; }
		for (var i$1 in vars) { strArr[i$1 * 2 + 1] = vars[i$1]; }
		return (ref = '').concat.apply(ref, strArr)
	};

	// eslint-disable-next-line valid-jsdoc
	/**
	 * Tagged template to quickly create an inline ef component class
	 * @param {...*} args - String literal
	 */
	var t = function () {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		return create(mixStr.apply(void 0, args));
	};

	exports.version = '0.16.2';

	{
		exports.version = exports.version + "+debug";
	}

	{ console.info(("[EF] ef.js v" + exports.version + " initialized!")); }

	exports.EFNodeWrapper = EFNodeWrapper;
	exports.EFTextFragment = EFTextFragment;
	exports.Fragment = Fragment;
	exports.bundle = bundle;
	exports.create = create;
	exports.createElement = createElement;
	exports.declareNamespace = declareNamespace;
	exports.exec = exec;
	exports.inform = inform;
	exports.isPaused = isPaused;
	exports.mapAttrs = mapAttrs;
	exports.mountOptions = mountOptions;
	exports.onNextRender = onNextRender;
	exports.parseEft = parseEft;
	exports.scoped = scoped;
	exports.setDOMImpl = setDOMImpl;
	exports.setParser = setParser;
	exports.t = t;
	exports.toEFComponent = toEFComponent;

}));
//# sourceMappingURL=ef.dev.js.map
