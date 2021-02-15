(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ef = {}));
}(this, (function (exports) { 'use strict';

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
	var t = new RegExp(("\\" + escapeChar + "t"), 'g');
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
			default: {
				console.warn(("Dropped unsupported eft event option '" + option + "'."));
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
							propInfo.push(true);
						}
					} else if (updateOnly === '') {
						propInfo.push(null);
						propInfo.push(true);
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
		},
		isArray: function isArray(arr) {
			return SavedArray.isArray(arr)
		}
	};

	if (typeof Set !== 'undefined' && SavedArray.from) { ARR.unique = function (arr) { return SavedArray.from(new Set(arr)); }; }
	else { ARR.unique = ARR.rightUnique; }

	var typeOf = function (obj) {
		if (ARR.isArray(obj)) { return 'array' }
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

	var version = "0.13.4";

	var modificationQueue = [];
	var domQueue = [];
	var userQueue = [];
	var count = 0;

	var queue = function (handlers) { return modificationQueue.push.apply(modificationQueue, handlers); };
	var queueDom = function (handler) { return domQueue.push(handler); };
	var onNextRender = function (handler) { return userQueue.push(handler); };

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

	/**
	 * Minus 1 to render count down.
	 * When countdown becomes 0, render will be triggered.
	 * @param {boolean} immediate - Render immediately, will force countdown become 0
	 * @returns {number} - Render count down
	 */
	var exec = function (immediate) {
		if (!immediate && (count -= 1) > 0) { return count }
		count = 0;

		if (modificationQueue.length > 0) { execModifications(); }

		if (domQueue.length > 0) { execDomModifications(); }

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

	var resolveReactivePath = function (_path, obj) {
		for (var i$1 = 0, list = _path; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (obj[i]) { obj = obj[i]; }
			else { obj = defineNode(i, obj); }
		}
		return obj
	};

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
		/* eslint no-undefined: "off" */
		if (!Object.prototype.hasOwnProperty.call(dataNode, _key)) { dataNode[_key] = undefined; }
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

	// Wrap console functions for `[EF]` prefix
	var strTpl = '[EF] %s';
	var dbg = {
		log: console.log.bind(console, strTpl),
		info: console.info.bind(console, strTpl),
		warn: console.warn.bind(console, strTpl),
		error: console.error.bind(console, strTpl)
	};

	var initDataNode = function (ref) {
		var parentNode = ref.parentNode;
		var dataNode = ref.dataNode;
		var handlerNode = ref.handlerNode;
		var subscriberNode = ref.subscriberNode;
		var ctx = ref.ctx;
		var _key = ref._key;

		var updatingInProgress = false;
		Object.defineProperty(parentNode, _key, {
			get: function get() {
				return dataNode[_key]
			},
			set: function set(value) {
				if (updatingInProgress) { return }
				updatingInProgress = true;
				// Comparing NaN is like eating a cake and suddenly encounter a grain of sand
				if (dataNode[_key] === value || (isnan(dataNode[_key]) && isnan(value))) {
					updatingInProgress = false;
					return
				}
				dataNode[_key] = value;
				inform();
				queue(handlerNode);
				exec();
				if (subscriberNode.length > 0) {
					inform();
					try {
						for (var i = 0, list = subscriberNode; i < list.length; i += 1) {
							var subscriber = list[i];

							subscriber({state: ctx.state, value: value});
						}
					} catch (e) {
						dbg.error('Error caught when executing subscribers:\n', e);
					}
					exec();
				}
				updatingInProgress = false;
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

	var isBrowser = typeof document !== 'undefined' && typeof Node !== 'undefined';

	{
		if (isBrowser) { dbg.info('Running in browser mode.'); }
		else { dbg.info('Running in non-browser mode, please be sure to set a DOM simulation using `setDOMImpl`. See https://github.com/TheNeuronProject/ef.js#server-side-rendering for detail.'); }
	}

	var shared = {};

	// import ARR from './array-helper.js'

	// Will require a weakmap polyfill for IE10 and below
	var mountingPointStore = new WeakMap();

	var DOM = {};

	var EFFragment = /*@__PURE__*/(function () {
		function EFFragment() {
			this.$children = [];
			this.$safeZone = DOM.document.createDocumentFragment();
		}

		EFFragment.prototype.append = function append () {
			var ref;

			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];
			DOM.append.apply(null, prepareArgs(args, this.$safeZone));
			return (ref = this.$children).push.apply(ref, args)
		};

		EFFragment.prototype.appendTo = function appendTo (node) {
			DOM.append.apply(null, prepareArgs(this.$children, node));
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

	var appendNode = function (node, tempFragment) {
		var ref = node.$ctx.nodeInfo;
		var element = ref.element;
		var placeholder = ref.placeholder;
		DOM.append(tempFragment, element, placeholder);
	};

	var handleMountingPoint = function (element, tempFragment) {
		if (element.nodeType !== 3) { return }

		var mountingPoint = mountingPointStore.get(element);
		if (!mountingPoint) { return }

		var node = mountingPoint.node;
		if (!node) { return }
		if (ARR.isArray(node)) {
			for (var i$1 = 0, list = node; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				appendNode(i, tempFragment);
			}
		} else { appendNode(node, tempFragment); }
	};

	DOM.before = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var tempFragment = DOM.document.createDocumentFragment();
		inform();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (i instanceof shared.EFBaseComponent) {
				i.$mount({target: tempFragment});
			} else if (isInstance(i, EFFragment)) { i.appendTo(tempFragment); }
			else {
				DOM.Node.prototype.appendChild.call(tempFragment, i);
				handleMountingPoint(i, tempFragment);
			}
		}
		DOM.Node.prototype.insertBefore.call(node.parentNode, tempFragment, node);
		exec();
	};

	DOM.after = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		var tempFragment = DOM.document.createDocumentFragment();
		inform();
		for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
			var i = list[i$1];

			if (i instanceof shared.EFBaseComponent) {
				i.$mount({target: tempFragment});
			} else if (isInstance(i, EFFragment)) { i.appendTo(tempFragment); }
			else { DOM.Node.prototype.appendChild.call(tempFragment, i); }
		}
		if (node.nextSibling) { DOM.Node.prototype.insertBefore.call(node.parentNode, tempFragment, node.nextSibling); }
		else { DOM.Node.prototype.appendChild.call(node.parentNode, tempFragment); }
		exec();
	};

	DOM.append = function (node) {
		var nodes = [], len = arguments.length - 1;
		while ( len-- > 0 ) nodes[ len ] = arguments[ len + 1 ];

		// Handle fragment
		if (isInstance(node, EFFragment)) { return node.append.apply(node, nodes) }
		// Handle EFComponent
		if (node instanceof shared.EFBaseComponent) {
			if (!(ARR.isArray(node.children))) {
				{ dbg.warn(node, 'has no `children` list mount point! Child nodes are all ignored!'); }
				return
			}

			inform();
			for (var i$2 = 0, list = nodes; i$2 < list.length; i$2 += 1) {
				var i = list[i$2];

				i = new shared.toEFComponent(i);
				node.children.push(i);
			}
			exec();

			return
		}

		if ([1,9,11].indexOf(node.nodeType) === -1) { return }
		var tempFragment = DOM.document.createDocumentFragment();
		for (var i$3 = 0, list$1 = nodes; i$3 < list$1.length; i$3 += 1) {
			var i$1 = list$1[i$3];

			if (isInstance(i$1, EFFragment)) { i$1.appendTo(tempFragment); }
			else if (i$1 instanceof DOM.Node) {
				DOM.Node.prototype.appendChild.call(tempFragment, i$1);
				handleMountingPoint(i$1, tempFragment);
			} else if (i$1 instanceof shared.EFBaseComponent) {
				i$1.$mount({target: tempFragment});
			}
		}
		DOM.Node.prototype.appendChild.call(node, tempFragment);
	};

	DOM.remove = function (node) {
		if (isInstance(node, EFFragment)) { node.remove(); }
		else if (node instanceof shared.EFBaseComponent) { node.$umount(); }
		else { DOM.Node.prototype.removeChild.call(node.parentNode, node); }
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
	// 	if (parent) DOM.Node.prototype.replaceChild.call(parent, newNode, node)
	// },

	// swap(node, newNode) {
	// 	const nodeParent = node.parentNode
	// 	const newNodeParent = newNode.parentNode
	// 	const nodeSibling = node.nextSibling
	// 	const newNodeSibling = newNode.nextSibling
	// 	if (nodeParent && newNodeParent) {
	// 		DOM.Node.prototype.insertBefore.call(nodeParent, newNode, nodeSibling)
	// 		DOM.Node.prototype.insertBefore.call(newNodeParent, node, newNodeSibling)
	// 	}
	// },

	// prepend(node, ...nodes) {
	// 	if ([1,9,11].indexOf(node.nodeType) === -1) {
	// 		return
	// 	}
	// 	const tempFragment = DOM.document.createDocumentFragment()
	// 	nodes.reverse()
	// 	for (let i of nodes) {
	// 		DOM.Node.prototype.appendChild.call(tempFragment, i)
	// 	}
	// 	if (node.firstChild) {
	// 		DOM.Node.prototype.insertBefore.call(node, tempFragment, node.firstChild)
	// 	} else {
	// 		DOM.Node.prototype.appendChild.call(node, tempFragment)
	// 	}
	// },

	// appendTo(node, newNode) {
	// 	DOM.Node.prototype.appendChild.call(newNode, node)
	// },

	// prependTo(node, newNode) {
	// 	if (newNode.firstChild) {
	// 		DOM.Node.prototype.insertBefore.call(newNode, node, node.firstChild)
	// 	} else {
	// 		DOM.Node.prototype.appendChild.call(newNode, node)
	// 	}
	// },

	// empty(node) {
	// 	node.innerHTML = ''
	// },

	var setDOMImpl = function (sim) { return assign(DOM, sim); };

	if (isBrowser) { setDOMImpl({Node: Node, document: document}); }

	/**
	 * @typedef {{bubbles: boolean, cancelable: boolean}} EFEventOptions
	 */

	/* Get new events that works in all target browsers
	 * though a little bit old-fashioned
	 */
	var getEvent = function (name, ref) {
		if ( ref === void 0 ) ref = {
		bubbles: false,
		cancelable: false
	};
		var bubbles = ref.bubbles;
		var cancelable = ref.cancelable;

		var event = DOM.document.createEvent('CustomEvent');
		event.initEvent(name, bubbles, cancelable);
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

	var typeValid = function (obj) { return ['number', 'boolean', 'string'].indexOf(typeof obj) > -1; };

	var createByTag = function (ref) {
		var tagName = ref.tagName;
		var tagContent = ref.tagContent;
		var attrs = ref.attrs;
		var namespace = ref.namespace;

		var tagType = typeof tagContent;

		switch (tagType) {
			case 'string': {
				var creationOption = {};
				if (tagName === tagContent && attrs && attrs.is && typeof attrs.is === 'string') { creationOption.is = attrs.is; }
				// if (tagContent.indexOf(':') > -1) [, tagContent] = tagContent.split(':')
				// Namespaced
				if (namespace) { return DOM.document.createElementNS(namespace, tagContent, creationOption) }
				// Then basic HTMLElements
				return DOM.document.createElement(tagContent, creationOption)
			}
			case 'function': {
				// Then custom component or class based custom component
				return new tagContent()
			}
			default: {
				// Then overriden basic element
				if (tagContent.tag) { tagName = tagContent.tag; }
				// if (tagName.indexOf(':') > -1) [, tagName] = tagName.split(':')
				if (namespace) {
					return DOM.document.createElementNS(namespace, tagName, {is: tagContent.is})
				}

				return DOM.document.createElement(tagName, {is: tagContent.is})
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

	var regTmpl = function (ref) {
		var val = ref.val;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;
		var handler = ref.handler;

		if (ARR.isArray(val)) {
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

	var addValListener = function (ref) {
		var ctx = ref.ctx;
		var syncTrigger = ref.syncTrigger;
		var updateLock = ref.updateLock;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;
		var element = ref.element;
		var lastNode = ref.lastNode;
		var key = ref.key;
		var expr = ref.expr;
		var custom = ref.custom;

		var addListener = custom && '$on' || 'addEventListener';
		var ref$1 = initBinding({bind: expr, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
		var parentNode = ref$1.parentNode;
		var _key = ref$1._key;

		var _update = function () {
			updateLock.locked = true;
			inform();
			if (custom) { parentNode[_key] = lastNode[key]; }
			else { parentNode[_key] = lastNode[key]; }
			exec();
		};

		if (syncTrigger) {

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
			 *  k: keyCodes                 : array<number>/undefined
			 */
			var l = syncTrigger.l;
			var s = syncTrigger.s;
			var i = syncTrigger.i;
			var p = syncTrigger.p;
			var h = syncTrigger.h;
			var a = syncTrigger.a;
			var c = syncTrigger.c;
			var t = syncTrigger.t;
			var u = syncTrigger.u;
			var k = syncTrigger.k;
			element[addListener](l, function (e) {
				if (!!h !== !!e.shiftKey ||
					!!a !== !!e.altKey ||
					!!c !== !!e.ctrlKey ||
					!!t !== !!e.metaKey ||
					(k && k.indexOf(e.which) === -1)) { return }
				if (s) { e.stopPropagation(); }
				if (i) { e.stopImmediatePropagation(); }
				if (p) { e.preventDefault(); }
				_update();
			}, !!u);
		} else if (key === 'value') {
			// Listen to input, keyup and change events in order to work in most browsers.
			element[addListener]('input', _update, true);
			element[addListener]('keyup', _update, true);
			element[addListener]('change', _update, true);
		} else {
			var dispatch = custom && '$dispatch' || 'dispatchEvent';
			element[addListener]('change', function () {
				// Trigger change to the element it-self
				element[dispatch](getEvent('--ef-change-event--'), {bubbles: true, canceoable: false});
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

							i.dispatchEvent(getEvent('--ef-change-event--'));
						}
					}
				}
			}, true);
			// Use custom event to avoid loops and conflicts
			element[addListener]('--ef-change-event--', _update);
		}
	};

	var getAttrHandler = function (ref) {
		var element = ref.element;
		var key = ref.key;
		var custom = ref.custom;
		var ctx = ref.ctx;

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
		if (key.indexOf(':') > -1) {
			var ref$1 = key.split(':');
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

	var addAttr = function (ref) {
		var element = ref.element;
		var attr = ref.attr;
		var key = ref.key;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;
		var custom = ref.custom;

		if (typeValid(attr)) {
			if (custom) {
				if (attr === '') { element[key] = true; }
				else { element[key] = attr; }
				return
			}
			// Do not set or update `is` again
			if (key === 'is') { return }
			// Handle namespaces
			if (key.indexOf(':') > -1) {
				var ref$1 = key.split(':');
				var prefix = ref$1[0];
				if (prefix !== 'xmlns') { return element.setAttributeNS(ctx.localNamespaces[prefix] || getNamespace(prefix), key, attr) }
			}
			return element.setAttribute(key, attr)
		}

		var handler = getAttrHandler({element: element, key: key, custom: custom, ctx: ctx});
		queue([regTmpl({val: attr, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: handler})]);
	};

	var addProp = function (ref) {
		var element = ref.element;
		var propPath = ref.propPath;
		var value = ref.value;
		var syncTrigger = ref.syncTrigger;
		var updateOnly = ref.updateOnly;
		var ctx = ref.ctx;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
		var innerData = ref.innerData;
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
			var _handler = regTmpl({val: value, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, handler: handler});
			if (syncTrigger ||
				(propPath.length === 1 && (lastKey === 'value' || lastKey === 'checked')) &&
				!value[0]) { addValListener({ctx: ctx, syncTrigger: syncTrigger, updateLock: updateLock, handlers: handlers, subscribers: subscribers, innerData: innerData, element: element, lastNode: lastNode, key: lastKey, expr: value[1], custom: custom}); }
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
		var custom = ref.custom;

		var addListener = custom && '$on' || 'addEventListener';

		/*
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
		 *  k: keyCodes                 : array<number>/undefined
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

		element[addListener](l, function (e) {
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
		var namespace = ref.namespace;
		var fragment = ref.fragment;
		var custom = ref.custom;

		if (fragment) { return new EFFragment() }

		/*
		 *  t: tag       : class | string | int, 0 means fragment
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
		var tagName = t;
		var tagContent = ctx.scope[t] || t;
		var element = getElement({tagName: tagName, tagContent: tagContent, attrs: a, ref: r, refs: refs, namespace: namespace});
		if (a) { for (var key in a) { addAttr({element: element, custom: custom, attr: a[key], key: key, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData}); } }
		if (p) { for (var i = 0, list = p; i < list.length; i += 1) {
				var ref$1 = list[i];
				var propPath = ref$1[0];
				var value = ref$1[1];
				var syncTrigger = ref$1[2];
				var updateOnly = ref$1[3];

				addProp({element: element, custom: custom, value: value, propPath: propPath, syncTrigger: syncTrigger, updateOnly: updateOnly, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
			} }
		if (e) { for (var i$1 = 0, list$1 = e; i$1 < list$1.length; i$1 += 1) {
				var event = list$1[i$1];

				addEvent({element: element, custom: custom, event: event, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData});
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
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;
			var items = [], len = arguments.length - 1;
			while ( len-- > 0 ) items[ len ] = arguments[ len + 1 ];

			items = items.map(shared.toEFComponent);
			var elements = [];
			inform();
			for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			if (this.length === 0) { DOM.after.apply(DOM, [ anchor ].concat( elements )); }
			else { DOM.after.apply(DOM, [ this[this.length - 1].$ctx.nodeInfo.placeholder ].concat( elements )); }
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
			for (var i = tempArr.length - 1; i >= 0; i--) {
				tempArr[i].$umount();
				ARR.push(elements, tempArr[i].$mount({parent: ctx.state, key: key}));
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
			var ctx = ref.ctx;
			var key = ref.key;
			var anchor = ref.anchor;

			if (this.length === 0) { return this }
			var sorted = ARR.copy(ARR.sort(this, fn));
			var elements = [];
			inform();
			for (var i$1 = 0, list = sorted; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				i.$umount();
				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
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
			for (var i$1 = 0, list = items; i$1 < list.length; i$1 += 1) {
				var i = list[i$1];

				ARR.push(elements, i.$mount({parent: ctx.state, key: key}));
			}
			DOM.after.apply(DOM, [ anchor ].concat( elements ));
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
			splice: {value: DOMARR.splice},
			unshift: {value: DOMARR.unshift.bind(arr, info)}
		});
		return arr
	};

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

	var svgNS = getNamespace('svg');
	var mathNS = getNamespace('math');
	var htmlNS = getNamespace('html');

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
		var textNode = DOM.document.createTextNode('');
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
			textNode.textContent = value;
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
		var fragment = DOM.document.createDocumentFragment();
		// Update components
		inform();
		if (node) {
			node.clear();
			for (var i = 0, list = value; i < list.length; i += 1) {
				var item = list[i];

				item = shared.toEFComponent(item);

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
		mountingPointStore.set(anchor, children[key]);
		if (isFragment) { DOM.append(ctx.safeZone, anchor); }
	};

	var bindMountingList = function (ref) {
		var ctx = ref.ctx;
		var key = ref.key;
		var anchor = ref.anchor;

		var children = ctx.children;
		var isFragment = ctx.isFragment;
		children[key] = {
			node: defineArr([], {ctx: ctx, key: key, anchor: anchor}),
			anchor: anchor
		};
		mountingPointStore.set(anchor, children[key]);
		if (isFragment) { DOM.append(ctx.safeZone, anchor); }
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
		var namespace = ref.namespace;
		var create = ref.create;

		if (node instanceof DOM.Node) {
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
				if (typeOf(node[0]) === 'object') { DOM.append(element, create({node: node, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, namespace: namespace})); }
				// Dynamic text node
				else { bindTextNode({node: node, ctx: ctx, handlers: handlers, subscribers: subscribers, innerData: innerData, element: element}); }
				break
			}
			// Mounting points
			case 'object': {
				var anchor = DOM.document.createTextNode('');
				// Single node mounting point
				if (node.t === 0) { bindMountingNode({ctx: ctx, key: node.n, anchor: anchor}); }
				// Multi node mounting point
				else { bindMountingList({ctx: ctx, key: node.n, anchor: anchor}); }
				// Append anchor
				{ DOM.append(element, DOM.document.createComment(("EF MOUNTING POINT '" + (node.n) + "' START"))); }
				DOM.append(element, anchor);
				{ DOM.append(element, DOM.document.createComment(("EF MOUNTING POINT '" + (node.n) + "' END"))); }
				break
			}
		}
	};

	// Create elements based on description from AST
	/* eslint {"complexity": "off"} */
	var create = function (ref) {
		var node = ref.node;
		var ctx = ref.ctx;
		var innerData = ref.innerData;
		var refs = ref.refs;
		var handlers = ref.handlers;
		var subscribers = ref.subscribers;
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
			if (tagName.indexOf(':') > -1) {
				var ref$1 = tagName.split(':');
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
		var element = createElement({info: info, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, namespace: namespace, fragment: fragment, custom: custom});
		if (fragment && 'development' !== 'production') { element.append(DOM.document.createComment('EF FRAGMENT START')); }

		// Leave SVG mode if tag is `foreignObject`
		if (namespace && namespace === svgNS && ['foreignobject', 'desc', 'title'].indexOf(tagName.toLowerCase()) > -1) { namespace = ''; }

		// restore previous namespace if namespace is defined locally
		if (isLocalPrefix) { namespace = previousNamespace; }

		// Append child nodes
		for (var i = 0, list = childNodes; i < list.length; i += 1) {
			var node$1 = list[i];

			if (node$1 instanceof shared.EFBaseComponent) { node$1.$mount({target: element}); }
			else { resolveAST({node: node$1, nodeType: typeOf(node$1), element: element, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, namespace: namespace, create: create}); }
		}
		if (fragment && 'development' !== 'production') { element.append(DOM.document.createComment('EF FRAGMENT END')); }

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
				replace: [],
				parent: null,
				key: null
			};

			/* Detatched components will be put in the safe zone.
			 * Split safe zone to each component in order to make
			 * the component memory recycleable when lost reference
			 */
			var safeZone = DOM.document.createDocumentFragment();

			{ nodeInfo.placeholder = DOM.document.createComment('EF COMPONENT PLACEHOLDER'); }

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
				scope: scope, mount: mount, refs: refs, data: data, innerData: innerData, methods: methods,
				handlers: handlers, subscribers: subscribers, nodeInfo: nodeInfo, safeZone: safeZone,
				children: children, state: this, isFragment: ast[0].t === 0,
				localNamespaces: this.constructor.__local_namespaces
			};

			Object.defineProperty(this, '$ctx', {
				value: ctx,
				enumerable: false,
				configurable: true
			});

			inform();

			nodeInfo.element = create({node: ast, ctx: ctx, innerData: innerData, refs: refs, handlers: handlers, subscribers: subscribers, namespace: ''});
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

		/**
		 * @returns {number} - Render count down
		 */
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
						if (ARR.isArray(parent[key])) {
							// Remove self from parent list mounting point
							ARR.remove(parent[key], this);
						} else { parent[key] = nullComponent; }
					}
				// Else Remove elements from fragment parent
				} else if (isInstance(parent, EFFragment)) { parent.$ctx.nodeInfo.element.removeChild(nodeInfo.element); }
			}
			DOM.append(safeZone, nodeInfo.placeholder);
			queueDom(mount);
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
			return this.$ctx.nodeInfo.placeholder.dispatchEvent(event)
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
		 * @param {...*} args - Same as Node.addEventListener
		 * @returns {*} - Same as the return of Node.addEventListener
		 */
		EFBaseComponent.prototype.$on = function $on () {
			var ref;

			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];
			{ checkDestroyed(this); }
			return (ref = this.$ctx.nodeInfo.placeholder).addEventListener.apply(ref, args)
		};

		/**
		 * Remove custom event listener on this component
		 * @param {...*} args - Same as Node.removeEventListener
		 * @returns {*} - Same as the return of Node.removeEventListener
		 */
		EFBaseComponent.prototype.$off = function $off () {
			var ref;

			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];
			{ checkDestroyed(this); }
			return (ref = this.$ctx.nodeInfo.placeholder).removeEventListener.apply(ref, args)
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
			for (var i in children) { mountingPointStore.delete(children[i].anchor); }
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
			var childrenArr = element.$children;
			element.append.apply(element, nodes);

			{ element.append(ARR.remove(childrenArr, childrenArr[1])); }

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

	var textFragmentAst = [{t: 0},[['text']]];

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
			this.text = text;
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
			if (value instanceof Node) { return new EFNodeWrapper(value) }
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
	var createElement$1 = function (tag, attrs) {
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
	var scoped = function (component, initScope) { return /*@__PURE__*/(function (component) {
			function anonymous(state, scope) {
			if ( scope === void 0 ) scope = {};

			var _scope = assign({}, initScope);
			component.call(this, state, assign(_scope, scope));
		}

			if ( component ) anonymous.__proto__ = component;
			anonymous.prototype = Object.create( component && component.prototype );
			anonymous.prototype.constructor = anonymous;

			return anonymous;
		}(component)); };

	var version$1 = "0.13.4";

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

	// Iintialize components
	var initComponent = function (node, component) {
		var nodeType = typeOf(node);
		switch (nodeType) {
			case 'array': {
				var info = node[0];
				var childNodes = node.slice(1);
				if (typeOf(info) === 'object') {
					if (info.a) { registerNS(info.a, component); }
					for (var i$1 = 0, list = childNodes; i$1 < list.length; i$1 += 1) {
						var i = list[i$1];

						initComponent(i, component);
					}
				}
				break
			}
			case 'object': {
				if (node.t > 1) { throw new TypeError(("[EF] Not a standard ef.js AST: Unknown mounting point type '" + (node.t) + "'")) }
				applyMountingPoint(node.t, node.n, component);
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
	 */
	var create$1 = function (ast) {

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

		// Workaround for a bug of buble
		// https://github.com/bublejs/buble/issues/197
		Object.defineProperty(EFComponent.prototype, 'constructor', {enumerable: false});

		Object.defineProperty(EFComponent, '__local_namespaces', {enumerable: false, value: {}});
		initComponent(ast, EFComponent);
		return EFComponent
	};

	var coreVersion = version$1;

	{
		coreVersion = version$1 + "+debug";
	}

	{ dbg.info(("ef-core v" + coreVersion + " initialized!")); }

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
	var create$2 = function (value) {
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

	// eslint-disable-next-line valid-jsdoc
	/**
	 * Tagged template to quickly create an inline ef component class
	 * @param {...*} args - String literal
	 */
	var t$1 = function () {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		return create$2(mixStr.apply(void 0, args));
	};

	exports.version = version;

	{
		exports.version = version + "+debug";
	}

	{ console.info(("[EF] ef.js v" + exports.version + " initialized!")); }

	exports.EFNodeWrapper = EFNodeWrapper;
	exports.EFTextFragment = EFTextFragment;
	exports.Fragment = Fragment;
	exports.bundle = bundle;
	exports.create = create$2;
	exports.createElement = createElement$1;
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
	exports.t = t$1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ef.dev.js.map
