define([
	'../string',
	'./util'
], function (dstring, util) {
	var source;
	var parseState;
	var stack;
	var pos;
	var line;
	var column;
	var token;
	var key;
	var root;

	function parse(text, reviver) {
		source = String(text);
		parseState = 'start';
		stack = [];
		pos = 0;
		line = 1;
		column = 0;
		token = undefined;
		key = undefined;
		root = undefined;
		do {
			token = lex();
			parseStates[parseState]();
		} while (token.type !== 'eof');
		if (typeof reviver === 'function') {
			return internalize({ '': root }, '', reviver);
		}
		return root;
	}
	function internalize(holder, name, reviver) {
		var value = holder[name];
		if (value != null && typeof value === 'object') {
			for (var key_1 in value) {
				var replacement = internalize(value, key_1, reviver);
				if (replacement === undefined) {
					delete value[key_1];
				}
				else {
					value[key_1] = replacement;
				}
			}
		}
		return reviver.call(holder, name, value);
	}
	var lexState;
	var buffer;
	var doubleQuote;
	var sign;
	var c;
	function lex() {
		lexState = 'default';
		buffer = '';
		doubleQuote = false;
		sign = 1;
		for (;;) {
			c = peek();
			var token_1 = lexStates[lexState]();
			if (token_1) {
				return token_1;
			}
		}
	}
	function peek() {
		if (source[pos]) {
			return dstring.fromCodePoint(dstring.codePointAt(source, pos));
		}
	}
	function read() {
		var c = peek();
		if (c === '\n') {
			line++;
			column = 0;
		}
		else if (c) {
			column += c.length;
		}
		else {
			column++;
		}
		if (c) {
			pos += c.length;
		}
		return c;
	}
	var lexStates = {
		'default': function () {
			switch (c) {
				case '\t':
				case '\v':
				case '\f':
				case ' ':
				case '\u00A0':
				case '\uFEFF':
				case '\n':
				case '\r':
				case '\u2028':
				case '\u2029':
					read();
					return;
				case '/':
					read();
					lexState = 'comment';
					return;
				case undefined:
					read();
					return newToken('eof');
			}
			if (util.isSpaceSeparator(c)) {
				read();
				return;
			}
			return lexStates[parseState]();
		},
		comment: function () {
			switch (c) {
				case '*':
					read();
					lexState = 'multiLineComment';
					return;
				case '/':
					read();
					lexState = 'singleLineComment';
					return;
			}
			throw invalidChar(read());
		},
		multiLineComment: function () {
			switch (c) {
				case '*':
					read();
					lexState = 'multiLineCommentAsterisk';
					return;
				case undefined:
					throw invalidChar(read());
			}
			read();
		},
		multiLineCommentAsterisk: function () {
			switch (c) {
				case '*':
					read();
					return;
				case '/':
					read();
					lexState = 'default';
					return;
				case undefined:
					throw invalidChar(read());
			}
			read();
			lexState = 'multiLineComment';
		},
		singleLineComment: function () {
			switch (c) {
				case '\n':
				case '\r':
				case '\u2028':
				case '\u2029':
					read();
					lexState = 'default';
					return;
				case undefined:
					read();
					return newToken('eof');
			}
			read();
		},
		value: function () {
			switch (c) {
				case '{':
				case '[':
					return newToken('punctuator', read());
				case 'n':
					read();
					literal('ull');
					return newToken('null', null);
				case 't':
					read();
					literal('rue');
					return newToken('boolean', true);
				case 'f':
					read();
					literal('alse');
					return newToken('boolean', false);
				case '-':
				case '+':
					if (read() === '-') {
						sign = -1;
					}
					lexState = 'sign';
					return;
				case '.':
					buffer = read();
					lexState = 'decimalPointLeading';
					return;
				case '0':
					buffer = read();
					lexState = 'zero';
					return;
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					buffer = read();
					lexState = 'decimalInteger';
					return;
				case 'I':
					read();
					literal('nfinity');
					return newToken('numeric', Infinity);
				case 'N':
					read();
					literal('aN');
					return newToken('numeric', NaN);
				case '"':
				case "'":
					doubleQuote = (read() === '"');
					buffer = '';
					lexState = 'string';
					return;
			}
			throw invalidChar(read());
		},
		identifierNameStartEscape: function () {
			if (c !== 'u') {
				throw invalidChar(read());
			}
			read();
			var u = unicodeEscape();
			switch (u) {
				case '$':
				case '_':
					break;
				default:
					if (!util.isIdStartChar(u)) {
						throw invalidIdentifier();
					}
					break;
			}
			buffer += u;
			lexState = 'identifierName';
		},
		identifierName: function () {
			switch (c) {
				case '$':
				case '_':
				case '\u200C':
				case '\u200D':
					buffer += read();
					return;
				case '\\':
					read();
					lexState = 'identifierNameEscape';
					return;
			}
			if (util.isIdContinueChar(c)) {
				buffer += read();
				return;
			}
			return newToken('identifier', buffer);
		},
		identifierNameEscape: function () {
			if (c !== 'u') {
				throw invalidChar(read());
			}
			read();
			var u = unicodeEscape();
			switch (u) {
				case '$':
				case '_':
				case '\u200C':
				case '\u200D':
					break;
				default:
					if (!util.isIdContinueChar(u)) {
						throw invalidIdentifier();
					}
					break;
			}
			buffer += u;
			lexState = 'identifierName';
		},
		sign: function () {
			switch (c) {
				case '.':
					buffer = read();
					lexState = 'decimalPointLeading';
					return;
				case '0':
					buffer = read();
					lexState = 'zero';
					return;
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					buffer = read();
					lexState = 'decimalInteger';
					return;
				case 'I':
					read();
					literal('nfinity');
					return newToken('numeric', sign * Infinity);
				case 'N':
					read();
					literal('aN');
					return newToken('numeric', NaN);
			}
			throw invalidChar(read());
		},
		zero: function () {
			switch (c) {
				case '.':
					buffer += read();
					lexState = 'decimalPoint';
					return;
				case 'e':
				case 'E':
					buffer += read();
					lexState = 'decimalExponent';
					return;
				case 'x':
				case 'X':
					buffer += read();
					lexState = 'hexadecimal';
					return;
			}
			return newToken('numeric', sign * 0);
		},
		decimalInteger: function () {
			switch (c) {
				case '.':
					buffer += read();
					lexState = 'decimalPoint';
					return;
				case 'e':
				case 'E':
					buffer += read();
					lexState = 'decimalExponent';
					return;
			}
			if (util.isDigit(c)) {
				buffer += read();
				return;
			}
			return newToken('numeric', sign * Number(buffer));
		},
		decimalPointLeading: function () {
			if (util.isDigit(c)) {
				buffer += read();
				lexState = 'decimalFraction';
				return;
			}
			throw invalidChar(read());
		},
		decimalPoint: function () {
			switch (c) {
				case 'e':
				case 'E':
					buffer += read();
					lexState = 'decimalExponent';
					return;
			}
			if (util.isDigit(c)) {
				buffer += read();
				lexState = 'decimalFraction';
				return;
			}
			return newToken('numeric', sign * Number(buffer));
		},
		decimalFraction: function () {
			switch (c) {
				case 'e':
				case 'E':
					buffer += read();
					lexState = 'decimalExponent';
					return;
			}
			if (util.isDigit(c)) {
				buffer += read();
				return;
			}
			return newToken('numeric', sign * Number(buffer));
		},
		decimalExponent: function () {
			switch (c) {
				case '+':
				case '-':
					buffer += read();
					lexState = 'decimalExponentSign';
					return;
			}
			if (util.isDigit(c)) {
				buffer += read();
				lexState = 'decimalExponentInteger';
				return;
			}
			throw invalidChar(read());
		},
		decimalExponentSign: function () {
			if (util.isDigit(c)) {
				buffer += read();
				lexState = 'decimalExponentInteger';
				return;
			}
			throw invalidChar(read());
		},
		decimalExponentInteger: function () {
			if (util.isDigit(c)) {
				buffer += read();
				return;
			}
			return newToken('numeric', sign * Number(buffer));
		},
		hexadecimal: function () {
			if (util.isHexDigit(c)) {
				buffer += read();
				lexState = 'hexadecimalInteger';
				return;
			}
			throw invalidChar(read());
		},
		hexadecimalInteger: function () {
			if (util.isHexDigit(c)) {
				buffer += read();
				return;
			}
			return newToken('numeric', sign * Number(buffer));
		},
		string: function () {
			switch (c) {
				case '\\':
					read();
					buffer += escape();
					return;
				case '"':
					if (doubleQuote) {
						read();
						return newToken('string', buffer);
					}
					buffer += read();
					return;
				case "'":
					if (!doubleQuote) {
						read();
						return newToken('string', buffer);
					}
					buffer += read();
					return;
				case '\n':
				case '\r':
					throw invalidChar(read());
				case '\u2028':
				case '\u2029':
					separatorChar(c);
					break;
				case undefined:
					throw invalidChar(read());
			}
			buffer += read();
		},
		start: function () {
			switch (c) {
				case '{':
				case '[':
					return newToken('punctuator', read());
			}
			lexState = 'value';
		},
		beforePropertyName: function () {
			switch (c) {
				case '$':
				case '_':
					buffer = read();
					lexState = 'identifierName';
					return;
				case '\\':
					read();
					lexState = 'identifierNameStartEscape';
					return;
				case '}':
					return newToken('punctuator', read());
				case '"':
				case "'":
					doubleQuote = (read() === '"');
					lexState = 'string';
					return;
			}
			if (util.isIdStartChar(c)) {
				buffer += read();
				lexState = 'identifierName';
				return;
			}
			throw invalidChar(read());
		},
		afterPropertyName: function () {
			if (c === ':') {
				return newToken('punctuator', read());
			}
			throw invalidChar(read());
		},
		beforePropertyValue: function () {
			lexState = 'value';
		},
		afterPropertyValue: function () {
			switch (c) {
				case ',':
				case '}':
					return newToken('punctuator', read());
			}
			throw invalidChar(read());
		},
		beforeArrayValue: function () {
			if (c === ']') {
				return newToken('punctuator', read());
			}
			lexState = 'value';
		},
		afterArrayValue: function () {
			switch (c) {
				case ',':
				case ']':
					return newToken('punctuator', read());
			}
			throw invalidChar(read());
		},
		end: function () {
			throw invalidChar(read());
		}
	};
	function newToken(type, value) {
		return {
			type: type,
			value: value,
			line: line,
			column: column
		};
	}
	function literal(s) {
		for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
			var c_1 = s_1[_i];
			var p = peek();
			if (p !== c_1) {
				throw invalidChar(read());
			}
			read();
		}
	}
	function escape() {
		var c = peek();
		switch (c) {
			case 'b':
				read();
				return '\b';
			case 'f':
				read();
				return '\f';
			case 'n':
				read();
				return '\n';
			case 'r':
				read();
				return '\r';
			case 't':
				read();
				return '\t';
			case 'v':
				read();
				return '\v';
			case '0':
				read();
				if (util.isDigit(peek())) {
					throw invalidChar(read());
				}
				return '\0';
			case 'x':
				read();
				return hexEscape();
			case 'u':
				read();
				return unicodeEscape();
			case '\n':
			case '\u2028':
			case '\u2029':
				read();
				return '';
			case '\r':
				read();
				if (peek() === '\n') {
					read();
				}
				return '';
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				throw invalidChar(read());
			case undefined:
				throw invalidChar(read());
		}
		return read();
	}
	function hexEscape() {
		var buffer = '';
		var c = peek();
		if (!util.isHexDigit(c)) {
			throw invalidChar(read());
		}
		buffer += read();
		c = peek();
		if (!util.isHexDigit(c)) {
			throw invalidChar(read());
		}
		buffer += read();
		return dstring.fromCodePoint(parseInt(buffer, 16));
	}
	function unicodeEscape() {
		var buffer = '';
		var count = 4;
		while (count-- > 0) {
			var c_2 = peek();
			if (!util.isHexDigit(c_2)) {
				throw invalidChar(read());
			}
			buffer += read();
		}
		return dstring.fromCodePoint(parseInt(buffer, 16));
	}
	var parseStates = {
		start: function () {
			if (token.type === 'eof') {
				throw invalidEOF();
			}
			push();
		},
		beforePropertyName: function () {
			switch (token.type) {
				case 'identifier':
				case 'string':
					key = token.value;
					parseState = 'afterPropertyName';
					return;
				case 'punctuator':
					pop();
					return;
				case 'eof':
					throw invalidEOF();
			}
		},
		afterPropertyName: function () {
			if (token.type === 'eof') {
				throw invalidEOF();
			}
			parseState = 'beforePropertyValue';
		},
		beforePropertyValue: function () {
			if (token.type === 'eof') {
				throw invalidEOF();
			}
			push();
		},
		beforeArrayValue: function () {
			if (token.type === 'eof') {
				throw invalidEOF();
			}
			if (token.type === 'punctuator' && token.value === ']') {
				pop();
				return;
			}
			push();
		},
		afterPropertyValue: function () {
			if (token.type === 'eof') {
				throw invalidEOF();
			}
			switch (token.value) {
				case ',':
					parseState = 'beforePropertyName';
					return;
				case '}':
					pop();
			}
		},
		afterArrayValue: function () {
			if (token.type === 'eof') {
				throw invalidEOF();
			}
			switch (token.value) {
				case ',':
					parseState = 'beforeArrayValue';
					return;
				case ']':
					pop();
			}
		},
		end: function () {
		}
	};
	function push() {
		var value;
		switch (token.type) {
			case 'punctuator':
				switch (token.value) {
					case '{':
						value = {};
						break;
					case '[':
						value = [];
						break;
				}
				break;
			case 'null':
			case 'boolean':
			case 'numeric':
			case 'string':
				value = token.value;
				break;
		}
		if (root === undefined) {
			root = value;
		}
		else {
			var parent_1 = stack[stack.length - 1];
			if (Array.isArray(parent_1)) {
				parent_1.push(value);
			}
			else {
				parent_1[key] = value;
			}
		}
		if (value !== null && typeof value === 'object') {
			stack.push(value);
			if (Array.isArray(value)) {
				parseState = 'beforeArrayValue';
			}
			else {
				parseState = 'beforePropertyName';
			}
		}
		else {
			var current = stack[stack.length - 1];
			if (current == null) {
				parseState = 'end';
			}
			else if (Array.isArray(current)) {
				parseState = 'afterArrayValue';
			}
			else {
				parseState = 'afterPropertyValue';
			}
		}
	}
	function pop() {
		stack.pop();
		var current = stack[stack.length - 1];
		if (current == null) {
			parseState = 'end';
		}
		else if (Array.isArray(current)) {
			parseState = 'afterArrayValue';
		}
		else {
			parseState = 'afterPropertyValue';
		}
	}
	function invalidChar(c) {
		if (c === undefined) {
			return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
		}
		return syntaxError("JSON5: invalid character '" + formatChar(c) + "' at " + line + ":" + column);
	}
	function invalidEOF() {
		return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
	}
	function invalidIdentifier() {
		column -= 5;
		return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
	}
	function separatorChar(c) {
		console.warn("JSON5: '" + formatChar(c) + "' in strings is not valid ECMAScript; consider escaping");
	}
	function formatChar(c) {
		var replacements = {
			"'": "\\'",
			'"': '\\"',
			'\\': '\\\\',
			'\b': '\\b',
			'\f': '\\f',
			'\n': '\\n',
			'\r': '\\r',
			'\t': '\\t',
			'\v': '\\v',
			'\0': '\\0',
			'\u2028': '\\u2028',
			'\u2029': '\\u2029'
		};
		if (replacements[c]) {
			return replacements[c];
		}
		if (c < ' ') {
			var hexString = c.charCodeAt(0).toString(16);
			return '\\x' + ('00' + hexString).substring(hexString.length);
		}
		return c;
	}
	function syntaxError(message) {
		var err = new SyntaxError(message);
		err.lineNumber = line;
		err.columnNumber = column;
		return err;
	}

	return parse;
});
