///=========================================================================
/// This module provides the core runtime and grammar for hyperscript
///=========================================================================

import {getOrInitObject, mergeObjects, parseJSON, varargConstructor} from "./utils.js";


/**
 * @type {HyperscriptObject}
 */
let _hyperscript

var globalScope = globalThis;

//====================================================================
// Standard library
//====================================================================

class ElementCollection {
	constructor(css, relativeToElement, escape) {
		this._css = css;
		this.relativeToElement = relativeToElement;
		this.escape = escape;
	}

	get css() {
		if (this.escape) {
			return _runtime.escapeSelector(this._css);
		} else {
			return this._css;
		}
	}

	get className() {
		return this._css.substr(1);
	}

	get id() {
		return this.className();
	}

	contains(elt) {
		for (let element of this) {
			if (element.contains(elt)) {
				return true;
			}
		}
		return false;
	}

	get length() {
		return this.selectMatches().length;
	}

	[Symbol.iterator]() {
		let query = this.selectMatches();
		return query [Symbol.iterator]();
	}

	selectMatches() {
		let query = _runtime.getRootNode(this.relativeToElement).querySelectorAll(this.css);
		return query;
	}
}

//====================================================================
// Lexer
//====================================================================

/** @type LexerObject */
var _lexer = (function () {
	var OP_TABLE = {
		"+": "PLUS",
		"-": "MINUS",
		"*": "MULTIPLY",
		"/": "DIVIDE",
		".": "PERIOD",
		"..": "ELLIPSIS",
		"\\": "BACKSLASH",
		":": "COLON",
		"%": "PERCENT",
		"|": "PIPE",
		"!": "EXCLAMATION",
		"?": "QUESTION",
		"#": "POUND",
		"&": "AMPERSAND",
		$: "DOLLAR",
		";": "SEMI",
		",": "COMMA",
		"(": "L_PAREN",
		")": "R_PAREN",
		"<": "L_ANG",
		">": "R_ANG",
		"<=": "LTE_ANG",
		">=": "GTE_ANG",
		"==": "EQ",
		"===": "EQQ",
		"!=": "NEQ",
		"!==": "NEQQ",
		"{": "L_BRACE",
		"}": "R_BRACE",
		"[": "L_BRACKET",
		"]": "R_BRACKET",
		"=": "EQUALS",
	};

	/**
	 * isValidCSSClassChar returns `true` if the provided character is valid in a CSS class.
	 * @param {string} c
	 * @returns boolean
	 */
	function isValidCSSClassChar(c) {
		return isAlpha(c) || isNumeric(c) || c === "-" || c === "_" || c === ":";
	}

	/**
	 * isValidCSSIDChar returns `true` if the provided character is valid in a CSS ID
	 * @param {string} c
	 * @returns boolean
	 */
	function isValidCSSIDChar(c) {
		return isAlpha(c) || isNumeric(c) || c === "-" || c === "_" || c === ":";
	}

	/**
	 * isWhitespace returns `true` if the provided character is whitespace.
	 * @param {string} c
	 * @returns boolean
	 */
	function isWhitespace(c) {
		return c === " " || c === "\t" || isNewline(c);
	}

	/**
	 * positionString returns a string representation of a Token's line and column details.
	 * @param {Token} token
	 * @returns string
	 */
	function positionString(token) {
		return "[Line: " + token.line + ", Column: " + token.column + "]";
	}

	/**
	 * isNewline returns `true` if the provided character is a carrage return or newline
	 * @param {string} c
	 * @returns boolean
	 */
	function isNewline(c) {
		return c === "\r" || c === "\n";
	}

	/**
	 * isNumeric returns `true` if the provided character is a number (0-9)
	 * @param {string} c
	 * @returns boolean
	 */
	function isNumeric(c) {
		return c >= "0" && c <= "9";
	}

	/**
	 * isAlpha returns `true` if the provided character is a letter in the alphabet
	 * @param {string} c
	 * @returns boolean
	 */
	function isAlpha(c) {
		return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
	}

	/**
	 * @param {string} c
	 * @param {boolean} [dollarIsOp]
	 * @returns boolean
	 */
	function isIdentifierChar(c, dollarIsOp) {
		return c === "_" || c === "$";
	}

	/**
	 * @param {string} c
	 * @returns boolean
	 */
	function isReservedChar(c) {
		return c === "`" || c === "^";
	}

	/**
	 * @param {Token[]} tokens
	 * @param {Token[]} consumed
	 * @param {string} source
	 * @returns {TokensObject}
	 */
	function makeTokensObject(tokens, consumed, source) {
		consumeWhitespace(); // consume initial whitespace

		/** @type Token | null */
		var _lastConsumed = null;

		function consumeWhitespace() {
			while (token(0, true).type === "WHITESPACE") {
				consumed.push(tokens.shift());
			}
		}

		/**
		 * @param {TokensObject} tokens
		 * @param {*} error
		 */
		function raiseError(tokens, error) {
			_parser.raiseParseError(tokens, error);
		}

		/**
		 * @param {string} value
		 * @returns {Token}
		 */
		function requireOpToken(value) {
			var token = matchOpToken(value);
			if (token) {
				return token;
			} else {
				raiseError(this, "Expected '" + value + "' but found '" + currentToken().value + "'");
			}
		}

		/**
		 * @param {string} op1
		 * @param {string} [op2]
		 * @param {string} [op3]
		 * @returns {Token | void}
		 */
		function matchAnyOpToken(op1, op2, op3) {
			for (var i = 0; i < arguments.length; i++) {
				var opToken = arguments[i];
				var match = matchOpToken(opToken);
				if (match) {
					return match;
				}
			}
		}

		/**
		 * @param {string} op1
		 * @param {string} [op2]
		 * @param {string} [op3]
		 * @returns {Token | void}
		 */
		function matchAnyToken(op1, op2, op3) {
			for (var i = 0; i < arguments.length; i++) {
				var opToken = arguments[i];
				var match = matchToken(opToken);
				if (match) {
					return match;
				}
			}
		}

		/**
		 * @param {string} value
		 * @returns {Token | void}
		 */
		function matchOpToken(value) {
			if (currentToken() && currentToken().op && currentToken().value === value) {
				return consumeToken();
			}
		}

		/**
		 * @param {string} type1
		 * @param {string} [type2]
		 * @param {string} [type3]
		 * @param {string} [type4]
		 * @returns {Token}
		 */
		function requireTokenType(type1, type2, type3, type4) {
			var token = matchTokenType(type1, type2, type3, type4);
			if (token) {
				return token;
			} else {
				raiseError(this, "Expected one of " + JSON.stringify([type1, type2, type3]));
			}
		}

		/**
		 * @param {string} type1
		 * @param {string} [type2]
		 * @param {string} [type3]
		 * @param {string} [type4]
		 * @returns {Token | void}
		 */
		function matchTokenType(type1, type2, type3, type4) {
			if (
				currentToken() &&
				currentToken().type &&
				[type1, type2, type3, type4].indexOf(currentToken().type) >= 0
			) {
				return consumeToken();
			}
		}

		/**
		 * @param {string} value
		 * @param {string} [type]
		 * @returns {Token}
		 */
		function requireToken(value, type) {
			var token = matchToken(value, type);
			if (token) {
				return token;
			} else {
				raiseError(this, "Expected '" + value + "' but found '" + currentToken().value + "'");
			}
		}

		function peekToken(value, peek, type) {
			return tokens[peek] && tokens[peek].value === value && tokens[peek].type === type
		}

		/**
		 * @param {string} value
		 * @param {string} [type]
		 * @returns {Token | void}
		 */
		function matchToken(value, type) {
			if (follows.indexOf(value) !== -1) {
				return; // disallowed token here
			}
			var type = type || "IDENTIFIER";
			if (currentToken() && currentToken().value === value && currentToken().type === type) {
				return consumeToken();
			}
		}

		/**
		 * @returns {Token}
		 */
		function consumeToken() {
			var match = tokens.shift();
			consumed.push(match);
			_lastConsumed = match;
			consumeWhitespace(); // consume any whitespace
			return match;
		}

		/**
		 * @param {string} value
		 * @param {string} [type]
		 * @returns {Token[]}
		 */
		function consumeUntil(value, type) {
			/** @type Token[] */
			var tokenList = [];
			var currentToken = token(0, true);

			while (
				(type == null || currentToken.type !== type) &&
				(value == null || currentToken.value !== value) &&
				currentToken.type !== "EOF"
			) {
				var match = tokens.shift();
				consumed.push(match);
				tokenList.push(currentToken);
				currentToken = token(0, true);
			}
			consumeWhitespace(); // consume any whitespace
			return tokenList;
		}

		/**
		 * @returns {string}
		 */
		function lastWhitespace() {
			if (consumed[consumed.length - 1] && consumed[consumed.length - 1].type === "WHITESPACE") {
				return consumed[consumed.length - 1].value;
			} else {
				return "";
			}
		}

		function consumeUntilWhitespace() {
			return consumeUntil(null, "WHITESPACE");
		}

		/**
		 * @returns {boolean}
		 */
		function hasMore() {
			return tokens.length > 0;
		}

		/**
		 * @param {number} n
		 * @param {boolean} [dontIgnoreWhitespace]
		 * @returns {Token}
		 */
		function token(n, dontIgnoreWhitespace) {
			var /**@type {Token}*/ token;
			var i = 0;
			do {
				if (!dontIgnoreWhitespace) {
					while (tokens[i] && tokens[i].type === "WHITESPACE") {
						i++;
					}
				}
				token = tokens[i];
				n--;
				i++;
			} while (n > -1);
			if (token) {
				return token;
			} else {
				return {
					type: "EOF",
					value: "<<<EOF>>>",
				};
			}
		}

		/**
		 * @returns {Token}
		 */
		function currentToken() {
			return token(0);
		}

		/**
		 * @returns {Token | null}
		 */
		function lastMatch() {
			return _lastConsumed;
		}

		/**
		 * @returns {string}
		 */
		function sourceFor() {
			return source.substring(this.startToken.start, this.endToken.end);
		}

		/**
		 * @returns {string}
		 */
		function lineFor() {
			return source.split("\n")[this.startToken.line - 1];
		}

		var follows = [];

		function pushFollow(str) {
			follows.push(str);
		}

		function popFollow() {
			follows.pop();
		}

		function clearFollows() {
			var tmp = follows;
			follows = [];
			return tmp;
		}

		function restoreFollows(f) {
			follows = f;
		}

		/** @type {TokensObject} */
		return {
			pushFollow: pushFollow,
			popFollow: popFollow,
			clearFollow: clearFollows,
			restoreFollow: restoreFollows,
			matchAnyToken: matchAnyToken,
			matchAnyOpToken: matchAnyOpToken,
			matchOpToken: matchOpToken,
			requireOpToken: requireOpToken,
			matchTokenType: matchTokenType,
			requireTokenType: requireTokenType,
			consumeToken: consumeToken,
			peekToken: peekToken,
			matchToken: matchToken,
			requireToken: requireToken,
			list: tokens,
			consumed: consumed,
			source: source,
			hasMore: hasMore,
			currentToken: currentToken,
			lastMatch: lastMatch,
			token: token,
			consumeUntil: consumeUntil,
			consumeUntilWhitespace: consumeUntilWhitespace,
			lastWhitespace: lastWhitespace,
			sourceFor: sourceFor,
			lineFor: lineFor,
		};
	}

	/**
	 * @param {Token[]} tokens
	 * @returns {boolean}
	 */
	function isValidSingleQuoteStringStart(tokens) {
		if (tokens.length > 0) {
			var previousToken = tokens[tokens.length - 1];
			if (
				previousToken.type === "IDENTIFIER" ||
				previousToken.type === "CLASS_REF" ||
				previousToken.type === "ID_REF"
			) {
				return false;
			}
			if (previousToken.op && (previousToken.value === ">" || previousToken.value === ")")) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @param {string} string
	 * @param {boolean} [template]
	 * @returns {TokensObject}
	 */
	function tokenize(string, template) {
		var tokens = /** @type {Token[]}*/ [];
		var source = string;
		var position = 0;
		var column = 0;
		var line = 1;
		var lastToken = "<START>";
		var templateBraceCount = 0;

		function inTemplate() {
			return template && templateBraceCount === 0;
		}

		while (position < source.length) {
			if (currentChar() === "-" && nextChar() === "-" && (isWhitespace(charAfterThat()) || charAfterThat() === "")) {
				consumeComment();
			} else {
				if (isWhitespace(currentChar())) {
					tokens.push(consumeWhitespace());
				} else if (
					!possiblePrecedingSymbol() &&
					currentChar() === "." &&
					(isAlpha(nextChar()) || nextChar() === "{")
				) {
					tokens.push(consumeClassReference());
				} else if (
					!possiblePrecedingSymbol() &&
					currentChar() === "#" &&
					(isAlpha(nextChar()) || nextChar() === "{")
				) {
					tokens.push(consumeIdReference());
				} else if (currentChar() === "[" && nextChar() === "@") {
					tokens.push(consumeAttributeReference());
				} else if (currentChar() === "@") {
					tokens.push(consumeShortAttributeReference());
				} else if (currentChar() === "*" && isAlpha(nextChar())) {
					tokens.push(consumeStyleReference());
				} else if (isAlpha(currentChar()) || (!inTemplate() && isIdentifierChar(currentChar()))) {
					tokens.push(consumeIdentifier());
				} else if (isNumeric(currentChar())) {
					tokens.push(consumeNumber());
				} else if (!inTemplate() && (currentChar() === '"' || currentChar() === "`")) {
					tokens.push(consumeString());
				} else if (!inTemplate() && currentChar() === "'") {
					if (isValidSingleQuoteStringStart(tokens)) {
						tokens.push(consumeString());
					} else {
						tokens.push(consumeOp());
					}
				} else if (OP_TABLE[currentChar()]) {
					if (lastToken === "$" && currentChar() === "{") {
						templateBraceCount++;
					}
					if (currentChar() === "}") {
						templateBraceCount--;
					}
					tokens.push(consumeOp());
				} else if (inTemplate() || isReservedChar(currentChar())) {
					tokens.push(makeToken("RESERVED", consumeChar()));
				} else {
					if (position < source.length) {
						throw Error("Unknown token: " + currentChar() + " ");
					}
				}
			}
		}

		return makeTokensObject(tokens, [], source);

		/**
		 * @param {string} [type]
		 * @param {string} [value]
		 * @returns {Token}
		 */
		function makeOpToken(type, value) {
			var token = makeToken(type, value);
			token.op = true;
			return token;
		}

		/**
		 * @param {string} [type]
		 * @param {string} [value]
		 * @returns {Token}
		 */
		function makeToken(type, value) {
			return {
				type: type,
				value: value,
				start: position,
				end: position + 1,
				column: column,
				line: line,
			};
		}

		function consumeComment() {
			while (currentChar() && !isNewline(currentChar())) {
				consumeChar();
			}
			consumeChar();
		}

		/**
		 * @returns Token
		 */
		function consumeClassReference() {
			var classRef = makeToken("CLASS_REF");
			var value = consumeChar();
			if (currentChar() === "{") {
				classRef.template = true;
				value += consumeChar();
				while (currentChar() && currentChar() !== "}") {
					value += consumeChar();
				}
				if (currentChar() !== "}") {
					throw Error("Unterminated class reference");
				} else {
					value += consumeChar(); // consume final curly
				}
			} else {
				while (isValidCSSClassChar(currentChar())) {
					value += consumeChar();
				}
			}
			classRef.value = value;
			classRef.end = position;
			return classRef;
		}

		/**
		 * @returns Token
		 */
		function consumeAttributeReference() {
			var attributeRef = makeToken("ATTRIBUTE_REF");
			var value = consumeChar();
			while (position < source.length && currentChar() !== "]") {
				value += consumeChar();
			}
			if (currentChar() === "]") {
				value += consumeChar();
			}
			attributeRef.value = value;
			attributeRef.end = position;
			return attributeRef;
		}

		function consumeShortAttributeReference() {
			var attributeRef = makeToken("ATTRIBUTE_REF");
			var value = consumeChar();
			while (isValidCSSIDChar(currentChar())) {
				value += consumeChar();
			}
			attributeRef.value = value;
			attributeRef.end = position;
			return attributeRef;
		}

		function consumeStyleReference() {
			var styleRef = makeToken("STYLE_REF");
			var value = consumeChar();
			while (isAlpha(currentChar()) || currentChar() === "-") {
				value += consumeChar();
			}
			styleRef.value = value;
			styleRef.end = position;
			return styleRef;
		}

		/**
		 * @returns Token
		 */
		function consumeIdReference() {
			var idRef = makeToken("ID_REF");
			var value = consumeChar();
			if (currentChar() === "{") {
				idRef.template = true;
				value += consumeChar();
				while (currentChar() && currentChar() !== "}") {
					value += consumeChar();
				}
				if (currentChar() !== "}") {
					throw Error("Unterminated id reference");
				} else {
					consumeChar(); // consume final quote
				}
			} else {
				while (isValidCSSIDChar(currentChar())) {
					value += consumeChar();
				}
			}
			idRef.value = value;
			idRef.end = position;
			return idRef;
		}

		/**
		 * @returns Token
		 */
		function consumeIdentifier() {
			var identifier = makeToken("IDENTIFIER");
			var value = consumeChar();
			while (isAlpha(currentChar()) ||
			       isNumeric(currentChar()) ||
			       isIdentifierChar(currentChar())) {
				value += consumeChar();
			}
			identifier.value = value;
			identifier.end = position;
			return identifier;
		}

		/**
		 * @returns Token
		 */
		function consumeNumber() {
			var number = makeToken("NUMBER");
			var value = consumeChar();
			while (isNumeric(currentChar())) {
				value += consumeChar();
			}
			if (currentChar() === "." && isNumeric(nextChar())) {
				value += consumeChar();
			}
			while (isNumeric(currentChar())) {
				value += consumeChar();
			}
			number.value = value;
			number.end = position;
			return number;
		}

		/**
		 * @returns Token
		 */
		function consumeOp() {
			var op = makeOpToken();
			var value = consumeChar(); // consume leading char
			while (currentChar() && OP_TABLE[value + currentChar()]) {
				value += consumeChar();
			}
			op.type = OP_TABLE[value];
			op.value = value;
			op.end = position;
			return op;
		}

		/**
		 * @returns Token
		 */
		function consumeString() {
			var string = makeToken("STRING");
			var startChar = consumeChar(); // consume leading quote
			var value = "";
			while (currentChar() && currentChar() !== startChar) {
				if (currentChar() === "\\") {
					consumeChar(); // consume escape char and get the next one
					let nextChar = consumeChar();
					if (nextChar === "b") {
						value += "\b";
					} else if (nextChar === "f") {
						value += "\f";
					} else if (nextChar === "n") {
						value += "\n";
					} else if (nextChar === "r") {
						value += "\r";
					} else if (nextChar === "t") {
						value += "\t";
					} else if (nextChar === "v") {
						value += "\v";
					} else {
						value += nextChar;
					}
				} else {
					value += consumeChar();
				}
			}
			if (currentChar() !== startChar) {
				throw Error("Unterminated string at " + positionString(string));
			} else {
				consumeChar(); // consume final quote
			}
			string.value = value;
			string.end = position;
			string.template = startChar === "`";
			return string;
		}

		/**
		 * @returns string
		 */
		function currentChar() {
			return source.charAt(position);
		}

		/**
		 * @returns string
		 */
		function nextChar() {
			return source.charAt(position + 1);
		}

		function charAfterThat() {
			return source.charAt(position + 2);
		}

		/**
		 * @returns string
		 */
		function consumeChar() {
			lastToken = currentChar();
			position++;
			column++;
			return lastToken;
		}

		/**
		 * @returns boolean
		 */
		function possiblePrecedingSymbol() {
			return (
				isAlpha(lastToken) ||
				isNumeric(lastToken) ||
				lastToken === ")" ||
				lastToken === "\"" ||
				lastToken === "'" ||
				lastToken === "`" ||
				lastToken === "}" ||
				lastToken === "]"
			);
		}

		/**
		 * @returns Token
		 */
		function consumeWhitespace() {
			var whitespace = makeToken("WHITESPACE");
			var value = "";
			while (currentChar() && isWhitespace(currentChar())) {
				if (isNewline(currentChar())) {
					column = 0;
					line++;
				}
				value += consumeChar();
			}
			whitespace.value = value;
			whitespace.end = position;
			return whitespace;
		}
	}

	return {
		tokenize: tokenize,
		makeTokensObject: makeTokensObject,
	};
})();

//====================================================================
// Parser
//====================================================================

/** @type ParserObject */
var _parser = (function () {
	/** @type {Object<string,GrammarDefinition>} */
	var GRAMMAR = {};

	/** @type {Object<string,GrammarDefinition>} */
	var COMMANDS = {};

	/** @type {Object<string,GrammarDefinition>} */
	var FEATURES = {};

	var LEAF_EXPRESSIONS = [];
	var INDIRECT_EXPRESSIONS = [];

	/**
	 * @param {*} parseElement
	 * @param {*} start
	 * @param {TokensObject} tokens
	 */
	function initElt(parseElement, start, tokens) {
		parseElement.startToken = start;
		parseElement.sourceFor = tokens.sourceFor;
		parseElement.lineFor = tokens.lineFor;
		parseElement.programSource = tokens.source;
	}

	/**
	 * @param {string} type
	 * @param {TokensObject} tokens
	 * @param {GrammarElement?} root
	 * @returns GrammarElement
	 */
	function parseElement(type, tokens, root = undefined) {
		var elementDefinition = GRAMMAR[type];
		if (elementDefinition) {
			var start = tokens.currentToken();
			var parseElement = elementDefinition(_parser, _runtime, tokens, root);
			if (parseElement) {
				initElt(parseElement, start, tokens);
				parseElement.endToken = parseElement.endToken || tokens.lastMatch();
				var root = parseElement.root;
				while (root != null) {
					initElt(root, start, tokens);
					root = root.root;
				}
			}
			return parseElement;
		}
	}

	/**
	 * @param {string} type
	 * @param {TokensObject} tokens
	 * @param {string} [message]
	 * @param {*} [root]
	 * @returns {GrammarElement}
	 */
	function requireElement(type, tokens, message, root) {
		var result = parseElement(type, tokens, root);
		if (!result) raiseParseError(tokens, message || "Expected " + type);
		// @ts-ignore
		return result;
	}

	/**
	 * @param {string[]} types
	 * @param {TokensObject} tokens
	 * @returns {GrammarElement}
	 */
	function parseAnyOf(types, tokens) {
		for (var i = 0; i < types.length; i++) {
			var type = types[i];
			var expression = parseElement(type, tokens);
			if (expression) {
				return expression;
			}
		}
	}

	/**
	 * @param {string} name
	 * @param {GrammarDefinition} definition
	 */
	function addGrammarElement(name, definition) {
		GRAMMAR[name] = definition;
	}

	/**
	 * @param {string} keyword
	 * @param {GrammarDefinition} definition
	 */
	function addCommand(keyword, definition) {
		var commandGrammarType = keyword + "Command";
		var commandDefinitionWrapper = function (parser, runtime, tokens) {
			const commandElement = definition(parser, runtime, tokens);
			if (commandElement) {
				commandElement.type = commandGrammarType;
				commandElement.execute = function (context) {
					context.meta.command = commandElement;
					return runtime.unifiedExec(this, context);
				};
				return commandElement;
			}
		};
		GRAMMAR[commandGrammarType] = commandDefinitionWrapper;
		COMMANDS[keyword] = commandDefinitionWrapper;
	}

	/**
	 * @param {string} keyword
	 * @param {GrammarDefinition} definition
	 */
	function addFeature(keyword, definition) {
		var featureGrammarType = keyword + "Feature";

		/** @type {GrammarDefinition} */
		var featureDefinitionWrapper = function (parser, runtime, tokens) {
			var featureElement = definition(parser, runtime, tokens);
			if (featureElement) {
				featureElement.isFeature = true;
				featureElement.keyword = keyword;
				featureElement.type = featureGrammarType;
				return featureElement;
			}
		};
		GRAMMAR[featureGrammarType] = featureDefinitionWrapper;
		FEATURES[keyword] = featureDefinitionWrapper;
	}

	/**
	 * @param {string} name
	 * @param {GrammarDefinition} definition
	 */
	function addLeafExpression(name, definition) {
		LEAF_EXPRESSIONS.push(name);
		addGrammarElement(name, definition);
	}

	/**
	 * @param {string} name
	 * @param {GrammarDefinition} definition
	 */
	function addIndirectExpression(name, definition) {
		INDIRECT_EXPRESSIONS.push(name);
		addGrammarElement(name, definition);
	}

	/* ============================================================================================ */
	/* Core hyperscript Grammar Elements                                                            */
	/* ============================================================================================ */
	addGrammarElement("feature", function (parser, runtime, tokens) {
		if (tokens.matchOpToken("(")) {
			var featureElement = parser.requireElement("feature", tokens);
			tokens.requireOpToken(")");
			return featureElement;
		}

		var featureDefinition = FEATURES[tokens.currentToken().value];
		if (featureDefinition) {
			return featureDefinition(parser, runtime, tokens);
		}
	});

	addGrammarElement("command", function (parser, runtime, tokens) {
		if (tokens.matchOpToken("(")) {
			const commandElement = parser.requireElement("command", tokens);
			tokens.requireOpToken(")");
			return commandElement;
		}

		var commandDefinition = COMMANDS[tokens.currentToken().value];
		let commandElement;
		if (commandDefinition) {
			commandElement = commandDefinition(parser, runtime, tokens);
		} else if (tokens.currentToken().type === "IDENTIFIER") {
			commandElement = parser.parseElement("pseudoCommand", tokens);
		}
		if (commandElement) {
			return parser.parseElement("indirectStatement", tokens, commandElement);
		}

		return commandElement;
	});

	addGrammarElement("commandList", function (parser, runtime, tokens) {
		var cmd = parser.parseElement("command", tokens);
		if (cmd) {
			tokens.matchToken("then");
			const next = parser.parseElement("commandList", tokens);
			if (next) cmd.next = next;
			return cmd;
		}
	});

	addGrammarElement("leaf", function (parser, runtime, tokens) {
		var result = parseAnyOf(LEAF_EXPRESSIONS, tokens);
		// symbol is last so it doesn't consume any constants
		if (result == null) {
			return parseElement("symbol", tokens);
		}

		return result;
	});

	addGrammarElement("indirectExpression", function (parser, runtime, tokens, root) {
		for (var i = 0; i < INDIRECT_EXPRESSIONS.length; i++) {
			var indirect = INDIRECT_EXPRESSIONS[i];
			root.endToken = tokens.lastMatch();
			var result = parser.parseElement(indirect, tokens, root);
			if (result) {
				return result;
			}
		}
		return root;
	});

	addGrammarElement("indirectStatement", function (parser, runtime, tokens, root) {
		if (tokens.matchToken("unless")) {
			root.endToken = tokens.lastMatch();
			var conditional = parser.requireElement("expression", tokens);
			var unless = {
				type: "unlessStatementModifier",
				args: [conditional],
				op: function (context, conditional) {
					if (conditional) {
						return this.next;
					} else {
						return root;
					}
				},
				execute: function (context) {
					return runtime.unifiedExec(this, context);
				},
			};
			root.parent = unless;
			return unless;
		}
		return root;
	});

	addGrammarElement("primaryExpression", function (parser, runtime, tokens) {
		var leaf = parser.parseElement("leaf", tokens);
		if (leaf) {
			return parser.parseElement("indirectExpression", tokens, leaf);
		}
		parser.raiseParseError(tokens, "Unexpected value: " + tokens.currentToken().value);
	});

	/* ============================================================================================ */
	/* END Core hyperscript Grammar Elements                                                        */

	/* ============================================================================================ */

	/**
	 *
	 * @param {TokensObject} tokens
	 * @returns string
	 */
	function createParserContext(tokens) {
		var currentToken = tokens.currentToken();
		var source = tokens.source;
		var lines = source.split("\n");
		var line = currentToken && currentToken.line ? currentToken.line - 1 : lines.length - 1;
		var contextLine = lines[line];
		var offset = currentToken && currentToken.line ? currentToken.column : contextLine.length - 1;
		return contextLine + "\n" + " ".repeat(offset) + "^^\n\n";
	}

	/**
	 * @param {TokensObject} tokens
	 * @param {string} [message]
	 */
	function raiseParseError(tokens, message) {
		message =
			(message || "Unexpected Token : " + tokens.currentToken().value) + "\n\n" + createParserContext(tokens);
		var error = new Error(message);
		error["tokens"] = tokens;
		throw error;
	}

	/**
	 * @param {TokensObject} tokens
	 * @returns {GrammarElement}
	 */
	function parseHyperScript(tokens) {
		var result = parseElement("hyperscript", tokens);
		if (tokens.hasMore()) raiseParseError(tokens);
		if (result) return result;
	}

	/**
	 * @param {GrammarElement} elt
	 * @param {GrammarElement} parent
	 */
	function setParent(elt, parent) {
		if (typeof elt === 'object') {
			elt.parent = parent;
			if (typeof parent === 'object') {
				parent.children = (parent.children || new Set());
				parent.children.add(elt)
			}
			setParent(elt.next, parent);
		}
	}

	/**
	 * @param {Token} token
	 * @returns {GrammarDefinition}
	 */
	function commandStart(token) {
		return COMMANDS[token.value];
	}

	/**
	 * @param {Token} token
	 * @returns {GrammarDefinition}
	 */
	function featureStart(token) {
		return FEATURES[token.value];
	}

	/**
	 * @param {Token} token
	 * @returns {boolean}
	 */
	function commandBoundary(token) {
		if (
			token.value == "end" ||
			token.value == "then" ||
			token.value == "else" ||
			token.value == "otherwise" ||
			token.value == ")" ||
			commandStart(token) ||
			featureStart(token) ||
			token.type == "EOF"
		) {
			return true;
		}
		return false;
	}

	/**
	 * @param {TokensObject} tokens
	 * @returns {(string | GrammarElement)[]}
	 */
	function parseStringTemplate(tokens) {
		/** @type {(string | GrammarElement)[]} */
		var returnArr = [""];
		do {
			returnArr.push(tokens.lastWhitespace());
			if (tokens.currentToken().value === "$") {
				tokens.consumeToken();
				var startingBrace = tokens.matchOpToken("{");
				returnArr.push(requireElement("expression", tokens));
				if (startingBrace) {
					tokens.requireOpToken("}");
				}
				returnArr.push("");
			} else if (tokens.currentToken().value === "\\") {
				tokens.consumeToken(); // skip next
				tokens.consumeToken();
			} else {
				var token = tokens.consumeToken();
				returnArr[returnArr.length - 1] += token ? token.value : "";
			}
		} while (tokens.hasMore());
		returnArr.push(tokens.lastWhitespace());
		return returnArr;
	}

	/**
	 * @param {GrammarElement} commandList
	 */
	function ensureTerminated(commandList) {
		var implicitReturn = {
			type: "implicitReturn",
			op: function (context) {
				context.meta.returned = true;
				if (context.meta.resolve) {
					context.meta.resolve();
				}
				return _runtime.HALT;
			},
			execute: function (ctx) {
				// do nothing
			},
		};

		var end = commandList;
		while (end.next) {
			end = end.next;
		}
		end.next = implicitReturn;
	}


	// parser API
	return {
		setParent,
		requireElement,
		parseElement,
		featureStart,
		commandStart,
		commandBoundary,
		parseAnyOf,
		parseHyperScript,
		raiseParseError,
		addGrammarElement,
		addCommand,
		addFeature,
		addLeafExpression,
		addIndirectExpression,
		parseStringTemplate,
		ensureTerminated,
	};
})();

//====================================================================
// Runtime
//====================================================================

var CONVERSIONS = {
	dynamicResolvers: /** @type DynamicConversionFunction[] */ [
		function(str, value){
			if (str === "Fixed") {
				return Number(value).toFixed();
			} else if (str.indexOf("Fixed:") === 0) {
				let num = str.split(":")[1];
				return Number(value).toFixed(parseInt(num));
			}
		}
	],
	String: function (val) {
		if (val.toString) {
			return val.toString();
		} else {
			return "" + val;
		}
	},
	Int: function (val) {
		return parseInt(val);
	},
	Float: function (val) {
		return parseFloat(val);
	},
	Number: function (val) {
		return Number(val);
	},
	Date: function (val) {
		return new Date(val);
	},
	Array: function (val) {
		return Array.from(val);
	},
	JSON: function (val) {
		return JSON.stringify(val);
	},
	Object: function (val) {
		if (val instanceof String) {
			val = val.toString();
		}
		if (typeof val === "string") {
			return JSON.parse(val);
		} else {
			return mergeObjects({}, val);
		}
	},
};

/********************************************
 * RUNTIME OBJECT
 ********************************************/

/** @type {RuntimeObject} */
var _runtime = (function () {
	/**
	 * @param {HTMLElement} elt
	 * @param {string} selector
	 * @returns boolean
	 */
	function matchesSelector(elt, selector) {
		// noinspection JSUnresolvedVariable
		var matchesFunction =
			// @ts-ignore
			elt.matches || elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector || elt.webkitMatchesSelector || elt.oMatchesSelector;
		return matchesFunction && matchesFunction.call(elt, selector);
	}

	/**
	 * @param {string} eventName
	 * @param {Object} [detail]
	 * @returns {Event}
	 */
	function makeEvent(eventName, detail) {
		var evt;
		if (globalScope.Event && typeof globalScope.Event === "function") {
			evt = new Event(eventName, {
				bubbles: true,
				cancelable: true,
			});
			evt['detail'] = detail;
		} else {
			evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(eventName, true, true, detail);
		}
		return evt;
	}

	/**
	 * @param {Element} elt
	 * @param {string} eventName
	 * @param {Object} [detail]
	 * @param {Element} sender
	 * @returns {boolean}
	 */
	function triggerEvent(elt, eventName, detail, sender) {
		detail = detail || {};
		detail["sender"] = sender;
		var event = makeEvent(eventName, detail);
		var eventResult = elt.dispatchEvent(event);
		return eventResult;
	}

	/**
	 * isArrayLike returns `true` if the provided value is an array or
	 * a NodeList (which is close enough to being an array for our purposes).
	 *
	 * @param {any} value
	 * @returns {value is Array | NodeList}
	 */
	function isArrayLike(value) {
		return Array.isArray(value) ||
			(typeof NodeList !== 'undefined' && (value instanceof NodeList || value instanceof HTMLCollection));
	}

	/**
	 * isIterable returns `true` if the provided value supports the
	 * iterator protocol.
	 *
	 * @param {any} value
	 * @returns {value is Iterable}
	 */
	function isIterable(value) {
		return typeof value === 'object'
			&& Symbol.iterator in value
			&& typeof value[Symbol.iterator] === 'function';
	}

	/**
	 * shouldAutoIterate returns `true` if the provided value
	 * should be implicitly iterated over when accessing properties,
	 * and as the target of some commands.
	 *
	 * Currently, this is when the value is an {ElementCollection}
	 * or {isArrayLike} returns true.
	 *
	 * @param {any} value
	 * @returns {value is any[] | NodeList | ElementCollection}
	 */
	function shouldAutoIterate(value) {
		return  value instanceof ElementCollection ||
			   isArrayLike(value);
	}

	/**
	 * forEach executes the provided `func` on every item in the `value` array.
	 * if `value` is a single item (and not an array) then `func` is simply called
	 * once.  If `value` is null, then no further actions are taken.
	 *
	 * @template T
	 * @param {T | Iterable<T>} value
	 * @param {(item: T) => void} func
	 */
	function forEach(value, func) {
		if (value == null) {
			// do nothing
		} else if (isIterable(value)) {
			for (const nth of value) {
				func(nth);
			}
		} else if (isArrayLike(value)) {
			for (var i = 0; i < value.length; i++) {
				func(value[i]);
			}
		} else {
			func(value);
		}
	}

	/**
	 * implicitLoop executes the provided `func` on:
	 * - every item of {value}, if {value} should be auto-iterated
	 *   (see {shouldAutoIterate})
	 * - {value} otherwise
	 *
	 * @template T
	 * @param {NodeList | T | T[]} value
	 * @param {(item:Node | T) => void} func
	 */
	function implicitLoop(value, func) {
		if (shouldAutoIterate(value)) {
			for (const x of value) func(x);
		} else {
			func(value);
		}
	}

	function wrapArrays(args) {
		var arr = [];
		for (var i = 0; i < args.length; i++) {
			var arg = args[i];
			if (Array.isArray(arg)) {
				arr.push(Promise.all(arg));
			} else {
				arr.push(arg);
			}
		}
		return arr;
	}

	function unwrapAsyncs(values) {
		for (var i = 0; i < values.length; i++) {
			var value = values[i];
			if (value.asyncWrapper) {
				values[i] = value.value;
			}
			if (Array.isArray(value)) {
				for (var j = 0; j < value.length; j++) {
					var valueElement = value[j];
					if (valueElement.asyncWrapper) {
						value[j] = valueElement.value;
					}
				}
			}
		}
	}

	var HALT = {};

	/**
	 * @param {GrammarElement} command
	 * @param {Context} ctx
	 */
	function unifiedExec(command, ctx) {
		while (true) {
			try {
				var next = unifiedEval(command, ctx);
			} catch (e) {
				if (ctx.meta.handlingFinally) {
					console.error(" Exception in finally block: ", e);
					next = HALT;
				} else {
					_runtime.registerHyperTrace(ctx, e);
					if (ctx.meta.errorHandler && !ctx.meta.handlingError) {
						ctx.meta.handlingError = true;
						ctx[ctx.meta.errorSymbol] = e;
						command = ctx.meta.errorHandler;
						continue;
					} else  {
						ctx.meta.currentException = e;
						next = HALT;
					}
				}
			}
			if (next == null) {
				console.error(command, " did not return a next element to execute! context: ", ctx);
				return;
			} else if (next.then) {
				next.then(function (resolvedNext) {
					unifiedExec(resolvedNext, ctx);
				}).catch(function (reason) {
					unifiedExec({ // Anonymous command to simply throw the exception
						op: function(){
							throw reason;
						}
					}, ctx);
				});
				return;
			} else if (next === HALT) {
				if (ctx.meta.finallyHandler && !ctx.meta.handlingFinally) {
					ctx.meta.handlingFinally = true;
					command = ctx.meta.finallyHandler;
				} else {
					if (ctx.meta.onHalt) {
						ctx.meta.onHalt();
					}
					if (ctx.meta.currentException) {
						if (ctx.meta.reject) {
							ctx.meta.reject(ctx.meta.currentException);
							return;
						} else {
							throw ctx.meta.currentException;
						}
					} else {
						return;
					}
				}
			} else {
				command = next; // move to the next command
			}
		}
	}

	/**
	* @param {*} parseElement
	* @param {Context} ctx
	* @returns {*}
	*/
	function unifiedEval(parseElement, ctx) {
		/** @type any[] */
		var args = [ctx];
		var async = false;
		var wrappedAsyncs = false;

		if (parseElement.args) {
			for (var i = 0; i < parseElement.args.length; i++) {
				var argument = parseElement.args[i];
				if (argument == null) {
					args.push(null);
				} else if (Array.isArray(argument)) {
					var arr = [];
					for (var j = 0; j < argument.length; j++) {
						var element = argument[j];
						var value = element ? element.evaluate(ctx) : null; // OK
						if (value) {
							if (value.then) {
								async = true;
							} else if (value.asyncWrapper) {
								wrappedAsyncs = true;
							}
						}
						arr.push(value);
					}
					args.push(arr);
				} else if (argument.evaluate) {
					var value = argument.evaluate(ctx); // OK
					if (value) {
						if (value.then) {
							async = true;
						} else if (value.asyncWrapper) {
							wrappedAsyncs = true;
						}
					}
					args.push(value);
				} else {
					args.push(argument);
				}
			}
		}
		if (async) {
			return new Promise(function (resolve, reject) {
				args = wrapArrays(args);
				Promise.all(args)
					.then(function (values) {
						if (wrappedAsyncs) {
							unwrapAsyncs(values);
						}
						try {
							var apply = parseElement.op.apply(parseElement, values);
							resolve(apply);
						} catch (e) {
							reject(e);
						}
					})
					.catch(function (reason) {
						reject(reason);
					});
			});
		} else {
			if (wrappedAsyncs) {
				unwrapAsyncs(args);
			}
			return parseElement.op.apply(parseElement, args);
		}
	}

	let _scriptAttrs = null;

	/**
	* getAttributes returns the attribute name(s) to use when
	* locating hyperscript scripts in a DOM element.  If no value
	* has been configured, it defaults to _hyperscript.config.attributes
	* @returns string[]
	*/
	function getScriptAttributes() {
		if (_scriptAttrs == null) {
			_scriptAttrs = _hyperscript.config.attributes.replace(/ /g, "").split(",");
		}
		return _scriptAttrs;
	}

	/**
	* @param {Element} elt
	* @returns {string | null}
	*/
	function getScript(elt) {
		for (var i = 0; i < getScriptAttributes().length; i++) {
			var scriptAttribute = getScriptAttributes()[i];
			if (elt.hasAttribute && elt.hasAttribute(scriptAttribute)) {
				return elt.getAttribute(scriptAttribute);
			}
		}
		if (elt instanceof HTMLScriptElement && elt.type === "text/hyperscript") {
			return elt.innerText;
		}
		return null;
	}

	var hyperscriptFeaturesMap = new WeakMap

	/**
	* @param {*} elt
	* @returns {Object}
	*/
	function getHyperscriptFeatures(elt) {
		var hyperscriptFeatures = hyperscriptFeaturesMap.get(elt);
		if (typeof hyperscriptFeatures === 'undefined') {
			hyperscriptFeaturesMap.set(elt, hyperscriptFeatures = {});
		}
		return hyperscriptFeatures;
	}

	/**
	* @param {Object} owner
	* @param {Context} ctx
	*/
	function addFeatures(owner, ctx) {
		if (owner) {
			mergeObjects(ctx, getHyperscriptFeatures(owner));
			addFeatures(owner.parentElement, ctx);
		}
	}

	/**
	* @param {*} owner
	* @param {*} feature
	* @param {*} hyperscriptTarget
	* @param {*} event
	* @returns {Context}
	*/
	function makeContext(owner, feature, hyperscriptTarget, event) {
		/** @type {Context} */
		var ctx = {
			meta: {
				parser: _parser,
				lexer: _lexer,
				runtime: _runtime,
				owner: owner,
				feature: feature,
				iterators: {},
			},
			me: hyperscriptTarget,
			event: event,
			target: event ? event.target : null,
			detail: event ? event.detail : null,
			sender: event ? event.detail ? event.detail.sender : null : null,
			body: "document" in globalScope ? document.body : null,
		};
		ctx.meta.ctx = ctx;
		addFeatures(owner, ctx);
		return ctx;
	}

	/**
	* @returns string
	*/
	function getScriptSelector() {
		return getScriptAttributes()
			.map(function (attribute) {
				return "[" + attribute + "]";
			})
			.join(", ");
	}

	/**
	* @param {any} value
	* @param {string} type
	* @returns {any}
	*/
	function convertValue(value, type) {
		var dynamicResolvers = CONVERSIONS.dynamicResolvers;
		for (var i = 0; i < dynamicResolvers.length; i++) {
			var dynamicResolver = dynamicResolvers[i];
			var converted = dynamicResolver(type, value);
			if (converted !== undefined) {
				return converted;
			}
		}

		if (value == null) {
			return null;
		}
		var converter = CONVERSIONS[type];
		if (converter) {
			return converter(value);
		}

		throw "Unknown conversion : " + type;
	}

	// TODO: There do not seem to be any references to this function.
	// Is it still in use, or can it be removed?
	function isType(o, type) {
		return Object.prototype.toString.call(o) === "[object " + type + "]";
	}

	/**
	* @param {string} src
	* @returns {GrammarElement}
	*/
	function parse(src) {
		var tokens = _lexer.tokenize(src);
		if (_parser.commandStart(tokens.currentToken())) {
			var commandList = _parser.requireElement("commandList", tokens);
			if (tokens.hasMore()) _parser.raiseParseError(tokens);
			_parser.ensureTerminated(commandList);
			return commandList;
		} else if (_parser.featureStart(tokens.currentToken())) {
			var hyperscript = _parser.requireElement("hyperscript", tokens);
			if (tokens.hasMore()) _parser.raiseParseError(tokens);
			return hyperscript;
		} else {
			var expression = _parser.requireElement("expression", tokens);
			if (tokens.hasMore()) _parser.raiseParseError(tokens);
			return expression;
		}
	}

	/**
	 *
	 * @param {GrammarElement} elt
	 * @param {Context} ctx
	 * @returns {any}
	 */
	function evaluateNoPromise(elt, ctx) {
		let result = elt.evaluate(ctx);
		if (result.next) {
			throw new Error(elt.sourceFor() + " returned a Promise in a context that they are not allowed.");
		}
		return result;
	}

	/**
	* @param {string} src
	* @param {Context} [ctx]
	* @param {Object} [args]
	* @returns {any}
	*/
	function evaluate(src, ctx, args) {
		class HyperscriptModule extends EventTarget {
			constructor(mod) {
				super();
				this.module = mod;
			}
			toString() {
				return this.module.id;
			}
		}

		var body = 'document' in globalScope
			? globalScope.document.body
			: new HyperscriptModule(args && args.module);
		ctx = mergeObjects(makeContext(body, null, body, null), ctx || {});
		var element = parse(src);
		if (element.execute) {
			element.execute(ctx);
			return ctx.result;
		} else if (element.apply) {
			element.apply(body, body, args);
			return getHyperscriptFeatures(body);
		} else {
			return element.evaluate(ctx);
		}

		function makeModule() {
			return {}
		}
	}

	/**
	* @param {HTMLElement} elt
	*/
	function processNode(elt) {
		var selector = _runtime.getScriptSelector();
		if (matchesSelector(elt, selector)) {
			initElement(elt, elt);
		}
		if (elt instanceof HTMLScriptElement && elt.type === "text/hyperscript") {
			initElement(elt, document.body);
		}
		if (elt.querySelectorAll) {
			forEach(elt.querySelectorAll(selector + ", [type='text/hyperscript']"), function (elt) {
				initElement(elt, elt instanceof HTMLScriptElement && elt.type === "text/hyperscript" ? document.body : elt);
			});
		}
	}

	/**
	* @param {Element} elt
	* @param {Element} [target]
	*/
	function initElement(elt, target) {
		if (elt.closest && elt.closest(_hyperscript.config.disableSelector)) {
			return;
		}
		var internalData = getInternalData(elt);
		if (!internalData.initialized) {
			var src = getScript(elt);
			if (src) {
				try {
					internalData.initialized = true;
					internalData.script = src;
					var tokens = _lexer.tokenize(src);
					var hyperScript = _parser.parseHyperScript(tokens);
					if (!hyperScript) return;
					hyperScript.apply(target || elt, elt);
					setTimeout(function () {
						triggerEvent(target || elt, "load", {
							hyperscript: true,
						});
					}, 1);
				} catch (e) {
					_runtime.triggerEvent(elt, "exception", {
						error: e,
					});
					console.error(
						"hyperscript errors were found on the following element:",
						elt,
						"\n\n",
						e.message,
						e.stack
					);
				}
			}
		}
	}

	var internalDataMap = new WeakMap

	/**
	* @param {Element} elt
	* @returns {Object}
	*/
	function getInternalData(elt) {
		var internalData = internalDataMap.get(elt);
		if (typeof internalData === 'undefined') {
			internalDataMap.set(elt, internalData = {});
		}
		return internalData;
	}

	/**
	* @param {any} value
	* @param {string} typeString
	* @param {boolean} [nullOk]
	* @returns {boolean}
	*/
	function typeCheck(value, typeString, nullOk) {
		if (value == null && nullOk) {
			return true;
		}
		var typeName = Object.prototype.toString.call(value).slice(8, -1);
		return typeName === typeString;
	}

	function getElementScope(context) {
		var elt = context.meta && context.meta.owner;
		if (elt) {
			var internalData = getInternalData(elt);
			var scopeName = "elementScope";
			if (context.meta.feature && context.meta.feature.behavior) {
				scopeName = context.meta.feature.behavior + "Scope";
			}
			var elementScope = getOrInitObject(internalData, scopeName);
			return elementScope;
		} else {
			return {}; // no element, return empty scope
		}
	}

	/**
	* @param {string} str
	* @param {Context} context
	* @returns {any}
	*/
	function resolveSymbol(str, context, type) {
		if (str === "me" || str === "my" || str === "I") {
			return context["me"];
		}
		if (str === "it" || str === "its") {
			return context["result"];
		}
		if (str === "you" || str === "your" || str === "yourself") {
			return context["beingTold"];
		} else {
			if (type === "global") {
				return globalScope[str];
			} else if (type === "element") {
				var elementScope = getElementScope(context);
				return elementScope[str];
			} else if (type === "local") {
				return context[str];
			} else {
				// meta scope (used for event conditionals)
				if (context.meta && context.meta.context) {
					var fromMetaContext = context.meta.context[str];
					if (typeof fromMetaContext !== "undefined") {
						return fromMetaContext;
					}
				}
				// local scope
				var fromContext = context[str];
				if (typeof fromContext !== "undefined") {
					return fromContext;
				} else {
					// element scope
					var elementScope = getElementScope(context);
					fromContext = elementScope[str];
					if (typeof fromContext !== "undefined") {
						return fromContext;
					} else {
						// global scope
						return globalScope[str];
					}
				}
			}
		}
	}

	function setSymbol(str, context, type, value) {
		if (type === "global") {
			globalScope[str] = value;
		} else if (type === "element") {
			var elementScope = getElementScope(context);
			elementScope[str] = value;
		} else if (type === "local") {
			context[str] = value;
		} else {
			// local scope
			var fromContext = context[str];
			if (typeof fromContext !== "undefined") {
				context[str] = value;
			} else {
				// element scope
				var elementScope = getElementScope(context);
				fromContext = elementScope[str];
				if (typeof fromContext !== "undefined") {
					elementScope[str] = value;
				} else {
					context[str] = value;
				}
			}
		}
	}

	/**
	* @param {GrammarElement} command
	* @param {Context} context
	* @returns {undefined | GrammarElement}
	*/
	function findNext(command, context) {
		if (command) {
			if (command.resolveNext) {
				return command.resolveNext(context);
			} else if (command.next) {
				return command.next;
			} else {
				return findNext(command.parent, context);
			}
		}
	}

	/**
	* @param {Object<string,any>} root
	* @param {string} property
	* @param {boolean} attribute
	* @returns {any}
	*/
	function flatGet(root, property, getter) {
		if (root != null) {
			var val = getter(root, property);
			if (typeof val !== "undefined") {
				return val;
			}

			if (shouldAutoIterate(root)) {
				// flat map
				var result = [];
				for (var component of root) {
					var componentValue = getter(component, property);
					if (componentValue) {
						result.push(componentValue);
					}
				}
				return result;
			}
		}
	}

	function resolveProperty(root, property) {
		return flatGet(root, property, (root, property) => root[property] )
	}

	function resolveAttribute(root, property) {
		return flatGet(root, property, (root, property) => root.getAttribute && root.getAttribute(property) )
	}

	/**
	 *
	 * @param {Object<string, any>} root
	 * @param {string} property
	 * @returns {string}
	 */
	function resolveStyle(root, property) {
		return flatGet(root, property, (root, property) => root.style && root.style[property] )
	}

	/**
	 *
	 * @param {Object<string, any>} root
	 * @param {string} property
	 * @returns {string}
	 */
	function resolveComputedStyle(root, property) {
		return flatGet(root, property, (root, property) => getComputedStyle(root).getPropertyValue(property) )
	}

	/**
	* @param {Element} elt
	* @param {string[]} nameSpace
	* @param {string} name
	* @param {any} value
	*/
	function assignToNamespace(elt, nameSpace, name, value) {
		let root
		if (typeof document !== "undefined" && elt === document.body) {
			root = globalScope;
		} else {
			root = getHyperscriptFeatures(elt);
		}
		while (nameSpace.length > 0) {
			var propertyName = nameSpace.shift();
			var newRoot = root[propertyName];
			if (newRoot == null) {
				newRoot = {};
				root[propertyName] = newRoot;
			}
			root = newRoot;
		}

		root[name] = value;
	}

	function getHyperTrace(ctx, thrown) {
		var trace = [];
		var root = ctx;
		while (root.meta.caller) {
			root = root.meta.caller;
		}
		if (root.meta.traceMap) {
			return root.meta.traceMap.get(thrown, trace);
		}
	}

	function registerHyperTrace(ctx, thrown) {
		var trace = [];
		var root = null;
		while (ctx != null) {
			trace.push(ctx);
			root = ctx;
			ctx = ctx.meta.caller;
		}
		if (root.meta.traceMap == null) {
			root.meta.traceMap = new Map(); // TODO - WeakMap?
		}
		if (!root.meta.traceMap.get(thrown)) {
			var traceEntry = {
				trace: trace,
				print: function (logger) {
					logger = logger || console.error;
					logger("hypertrace /// ");
					var maxLen = 0;
					for (var i = 0; i < trace.length; i++) {
						maxLen = Math.max(maxLen, trace[i].meta.feature.displayName.length);
					}
					for (var i = 0; i < trace.length; i++) {
						var traceElt = trace[i];
						logger(
							"  ->",
							traceElt.meta.feature.displayName.padEnd(maxLen + 2),
							"-",
							traceElt.meta.owner
						);
					}
				},
			};
			root.meta.traceMap.set(thrown, traceEntry);
		}
	}

	/**
	* @param {string} str
	* @returns {string}
	*/
	function escapeSelector(str) {
		return str.replace(/:/g, function (str) {
			return "\\" + str;
		});
	}

	/**
	* @param {any} value
	* @param {*} elt
	*/
	function nullCheck(value, elt) {
		if (value == null) {
			throw new Error("'" + elt.sourceFor() + "' is null");
		}
	}

	/**
	* @param {any} value
	* @returns {boolean}
	*/
	function isEmpty(value) {
		return value == undefined || value.length === 0;
	}

	/**
	* @param {any} value
	* @returns {boolean}
	*/
	function doesExist(value) {
		if(value == null){
			return false;
		}
		if (shouldAutoIterate(value)) {
			for (const elt of value) {
				return true;
			}
		}
		return false;
	}

	/**
	* @param {Node} node
	* @returns {Document|ShadowRoot}
	*/
	function getRootNode(node) {
		if (node && node instanceof Node) {
			var rv = node.getRootNode();
			if (rv instanceof Document || rv instanceof ShadowRoot) return rv;
		}
		return document;
	}

	/**
	 *
	 * @param {Element} elt
	 * @param {GrammarElement} onFeature
	 * @returns {EventQueue}
	 */
	function getEventQueueFor(elt, onFeature) {
		let internalData = getInternalData(elt);
		var eventQueuesForElt = internalData.eventQueues;
		if (eventQueuesForElt == null) {
			eventQueuesForElt = new Map();
			internalData.eventQueues = eventQueuesForElt;
		}
		var eventQueueForFeature = eventQueuesForElt.get(onFeature);
		if (eventQueueForFeature == null) {
			eventQueueForFeature = {queue:[], executing:false};
			eventQueuesForElt.set(onFeature, eventQueueForFeature);
		}
		return eventQueueForFeature;
	}

	/** @type string | null */
	// @ts-ignore
	var hyperscriptUrl = "document" in globalScope ? import.meta.url : null;

	/** @type {RuntimeObject} */
	return {
		typeCheck,
		forEach,
		implicitLoop,
		triggerEvent,
		matchesSelector,
		getScript,
		processNode,
		evaluate,
		evaluateNoPromise,
		parse,
		getScriptSelector,
		resolveSymbol,
		setSymbol,
		makeContext,
		findNext,
		unifiedEval,
		convertValue,
		unifiedExec,
		resolveProperty,
		resolveAttribute,
		resolveStyle,
		resolveComputedStyle,
		assignToNamespace,
		registerHyperTrace,
		getHyperTrace,
		getInternalData,
		getHyperscriptFeatures,
		escapeSelector,
		nullCheck,
		isEmpty,
		doesExist,
		getRootNode,
		getEventQueueFor,
		hyperscriptUrl,
		HALT,
	};
})();

//====================================================================
// Grammar
//====================================================================
{
	_parser.addLeafExpression("parenthesized", function (parser, _runtime, tokens) {
		if (tokens.matchOpToken("(")) {
			var follows = tokens.clearFollow();
			try {
				var expr = parser.requireElement("expression", tokens);
			} finally {
				tokens.restoreFollow(follows);
			}
			tokens.requireOpToken(")");
			return expr;
		}
	});

	_parser.addLeafExpression("string", function (parser, runtime, tokens) {
		var stringToken = tokens.matchTokenType("STRING");
		if (!stringToken) return;
		var rawValue = stringToken.value;
		/** @type {any[]} */
		var args;
		if (stringToken.template) {
			var innerTokens = _lexer.tokenize(rawValue, true);
			args = parser.parseStringTemplate(innerTokens);
		} else {
			args = [];
		}
		return {
			type: "string",
			token: stringToken,
			args: args,
			op: function (context) {
				var returnStr = "";
				for (var i = 1; i < arguments.length; i++) {
					var val = arguments[i];
					if (val !== undefined) {
						returnStr += val;
					}
				}
				return returnStr;
			},
			evaluate: function (context) {
				if (args.length === 0) {
					return rawValue;
				} else {
					return runtime.unifiedEval(this, context);
				}
			},
		};
	});

	_parser.addGrammarElement("nakedString", function (parser, runtime, tokens) {
		if (tokens.hasMore()) {
			var tokenArr = tokens.consumeUntilWhitespace();
			tokens.matchTokenType("WHITESPACE");
			return {
				type: "nakedString",
				tokens: tokenArr,
				evaluate: function (context) {
					return tokenArr
						.map(function (t) {
							return t.value;
						})
						.join("");
				},
			};
		}
	});

	_parser.addLeafExpression("number", function (parser, runtime, tokens) {
		var number = tokens.matchTokenType("NUMBER");
		if (!number) return;
		var numberToken = number;
		var value = parseFloat(number.value);
		return {
			type: "number",
			value: value,
			numberToken: numberToken,
			evaluate: function () {
				return value;
			},
		};
	});

	_parser.addLeafExpression("idRef", function (parser, runtime, tokens) {
		var elementId = tokens.matchTokenType("ID_REF");
		if (!elementId) return;
		// TODO - unify these two expression types
		if (elementId.template) {
			var templateValue = elementId.value.substr(2, elementId.value.length - 2);
			var innerTokens = _lexer.tokenize(templateValue);
			var innerExpression = parser.requireElement("expression", innerTokens);
			return {
				type: "idRefTemplate",
				args: [innerExpression],
				op: function (context, arg) {
					return runtime.getRootNode(context.me).getElementById(arg);
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		} else {
			const value = elementId.value.substr(1);
			return {
				type: "idRef",
				css: elementId.value,
				value: value,
				evaluate: function (context) {
					return (
						runtime.getRootNode(context.me).getElementById(value)
					);
				},
			};
		}
	});

	_parser.addLeafExpression("classRef", function (parser, runtime, tokens) {
		var classRef = tokens.matchTokenType("CLASS_REF");

		if (!classRef) return;

		// TODO - unify these two expression types
		if (classRef.template) {
			var templateValue = classRef.value.substr(2, classRef.value.length - 2);
			var innerTokens = _lexer.tokenize(templateValue);
			var innerExpression = parser.requireElement("expression", innerTokens);
			return {
				type: "classRefTemplate",
				args: [innerExpression],
				op: function (context, arg) {
					return new ElementCollection("." + arg, context.me, true)
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		} else {
			const css = classRef.value;
			return {
				type: "classRef",
				css: css,
				evaluate: function (context) {
					return new ElementCollection(css, context.me, true)
				},
			};
		}
	});

	class TemplatedQueryElementCollection extends ElementCollection {
		constructor(css, relativeToElement, templateParts) {
			super(css, relativeToElement);
			this.templateParts = templateParts;
			this.elements = templateParts.filter(elt => elt instanceof Element);
		}

		get css() {
			let rv = "", i = 0
			for (const val of this.templateParts) {
				if (val instanceof Element) {
					rv += "[data-hs-query-id='" + i++ + "']";
				} else rv += val;
			}
			return rv;
		}

		[Symbol.iterator]() {
			this.elements.forEach((el, i) => el.dataset.hsQueryId = i);
			const rv = super[Symbol.iterator]();
			this.elements.forEach(el => el.removeAttribute('data-hs-query-id'));
			return rv;
		}
	}

	_parser.addLeafExpression("queryRef", function (parser, runtime, tokens) {
		var queryStart = tokens.matchOpToken("<");
		if (!queryStart) return;
		var queryTokens = tokens.consumeUntil("/");
		tokens.requireOpToken("/");
		tokens.requireOpToken(">");
		var queryValue = queryTokens
			.map(function (t) {
				if (t.type === "STRING") {
					return '"' + t.value + '"';
				} else {
					return t.value;
				}
			})
			.join("");

		if (queryValue.indexOf("$") >= 0) {
			var template = true;
			var innerTokens = _lexer.tokenize(queryValue, true);
			var args = parser.parseStringTemplate(innerTokens);
		}

		return {
			type: "queryRef",
			css: queryValue,
			args: args,
			op: function (context, ...args) {
				if (template) {
					return new TemplatedQueryElementCollection(queryValue, context.me, args)
				} else {
					return new ElementCollection(queryValue, context.me)
				}
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addLeafExpression("attributeRef", function (parser, runtime, tokens) {
		var attributeRef = tokens.matchTokenType("ATTRIBUTE_REF");
		if (!attributeRef) return;
		var outerVal = attributeRef.value;
		if (outerVal.indexOf("[") === 0) {
			var innerValue = outerVal.substring(2, outerVal.length - 1);
		} else {
			var innerValue = outerVal.substring(1);
		}
		var css = "[" + innerValue + "]";
		var split = innerValue.split("=");
		var name = split[0];
		var value = split[1];
		if (value) {
			// strip quotes
			if (value.indexOf('"') === 0) {
				value = value.substring(1, value.length - 1);
			}
		}
		return {
			type: "attributeRef",
			name: name,
			css: css,
			value: value,
			op: function (context) {
				var target = context.beingTold || context.me;
				if (target) {
					return target.getAttribute(name);
				}
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addLeafExpression("styleRef", function (parser, runtime, tokens) {
		var styleRef = tokens.matchTokenType("STYLE_REF");
		if (!styleRef) return;
		var styleProp = styleRef.value.substr(1);
		if (styleProp.startsWith("computed-")) {
			styleProp = styleProp.substr("computed-".length);
			return {
				type: "computedStyleRef",
				name: styleProp,
				op: function (context) {
					var target = context.beingTold || context.me;
					if (target) {
						return runtime.resolveComputedStyle(target, styleProp);
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		} else {
			return {
				type: "styleRef",
				name: styleProp,
				op: function (context) {
					var target = context.beingTold || context.me;
					if (target) {
						return runtime.resolveStyle(target, styleProp);
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		}
	});

	_parser.addGrammarElement("objectKey", function (parser, runtime, tokens) {
		var token;
		if ((token = tokens.matchTokenType("STRING"))) {
			return {
				type: "objectKey",
				key: token.value,
				evaluate: function () {
					return token.value;
				},
			};
		} else if (tokens.matchOpToken("[")) {
			var expr = parser.parseElement("expression", tokens);
			tokens.requireOpToken("]");
			return {
				type: "objectKey",
				expr: expr,
				args: [expr],
				op: function (ctx, expr) {
					return expr;
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		} else {
			var key = "";
			do {
				token = tokens.matchTokenType("IDENTIFIER") || tokens.matchOpToken("-");
				if (token) key += token.value;
			} while (token);
			return {
				type: "objectKey",
				key: key,
				evaluate: function () {
					return key;
				},
			};
		}
	});

	_parser.addLeafExpression("objectLiteral", function (parser, runtime, tokens) {
		if (!tokens.matchOpToken("{")) return;
		var keyExpressions = [];
		var valueExpressions = [];
		if (!tokens.matchOpToken("}")) {
			do {
				var name = parser.requireElement("objectKey", tokens);
				tokens.requireOpToken(":");
				var value = parser.requireElement("expression", tokens);
				valueExpressions.push(value);
				keyExpressions.push(name);
			} while (tokens.matchOpToken(","));
			tokens.requireOpToken("}");
		}
		return {
			type: "objectLiteral",
			args: [keyExpressions, valueExpressions],
			op: function (context, keys, values) {
				var returnVal = {};
				for (var i = 0; i < keys.length; i++) {
					returnVal[keys[i]] = values[i];
				}
				return returnVal;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addGrammarElement("nakedNamedArgumentList", function (parser, runtime, tokens) {
		var fields = [];
		var valueExpressions = [];
		if (tokens.currentToken().type === "IDENTIFIER") {
			do {
				var name = tokens.requireTokenType("IDENTIFIER");
				tokens.requireOpToken(":");
				var value = parser.requireElement("expression", tokens);
				valueExpressions.push(value);
				fields.push({ name: name, value: value });
			} while (tokens.matchOpToken(","));
		}
		return {
			type: "namedArgumentList",
			fields: fields,
			args: [valueExpressions],
			op: function (context, values) {
				var returnVal = { _namedArgList_: true };
				for (var i = 0; i < values.length; i++) {
					var field = fields[i];
					returnVal[field.name.value] = values[i];
				}
				return returnVal;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addGrammarElement("namedArgumentList", function (parser, runtime, tokens) {
		if (!tokens.matchOpToken("(")) return;
		var elt = parser.requireElement("nakedNamedArgumentList", tokens);
		tokens.requireOpToken(")");
		return elt;
	});

	_parser.addGrammarElement("symbol", function (parser, runtime, tokens) {
		/** @scope {SymbolScope} */
		var scope = "default";
		if (tokens.matchToken("global")) {
			scope = "global";
		} else if (tokens.matchToken("element") || tokens.matchToken("module")) {
			scope = "element";
			// optional possessive
			if (tokens.matchOpToken("'")) {
				tokens.requireToken("s");
			}
		} else if (tokens.matchToken("local")) {
			scope = "local";
		}

		// TODO better look ahead here
		let eltPrefix = tokens.matchOpToken(":");
		let identifier = tokens.matchTokenType("IDENTIFIER");
		if (identifier) {
			var name = identifier.value;
			if (eltPrefix) {
				name = ":" + name;
			}
			if (scope === "default") {
				if (name.indexOf("$") === 0) {
					scope = "global";
				}
				if (name.indexOf(":") === 0) {
					scope = "element";
				}
			}
			return {
				type: "symbol",
				token: identifier,
				scope: scope,
				name: name,
				evaluate: function (context) {
					return runtime.resolveSymbol(name, context, scope);
				},
			};
		}
	});

	_parser.addGrammarElement("implicitMeTarget", function (parser, runtime, tokens) {
		return {
			type: "implicitMeTarget",
			evaluate: function (context) {
				return context.beingTold || context.me;
			},
		};
	});

	_parser.addLeafExpression("boolean", function (parser, runtime, tokens) {
		var booleanLiteral = tokens.matchToken("true") || tokens.matchToken("false");
		if (!booleanLiteral) return;
		const value = booleanLiteral.value === "true";
		return {
			type: "boolean",
			evaluate: function (context) {
				return value;
			},
		};
	});

	_parser.addLeafExpression("null", function (parser, runtime, tokens) {
		if (tokens.matchToken("null")) {
			return {
				type: "null",
				evaluate: function (context) {
					return null;
				},
			};
		}
	});

	_parser.addLeafExpression("arrayLiteral", function (parser, runtime, tokens) {
		if (!tokens.matchOpToken("[")) return;
		var values = [];
		if (!tokens.matchOpToken("]")) {
			do {
				var expr = parser.requireElement("expression", tokens);
				values.push(expr);
			} while (tokens.matchOpToken(","));
			tokens.requireOpToken("]");
		}
		return {
			type: "arrayLiteral",
			values: values,
			args: [values],
			op: function (context, values) {
				return values;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addLeafExpression("blockLiteral", function (parser, runtime, tokens) {
		if (!tokens.matchOpToken("\\")) return;
		var args = [];
		var arg1 = tokens.matchTokenType("IDENTIFIER");
		if (arg1) {
			args.push(arg1);
			while (tokens.matchOpToken(",")) {
				args.push(tokens.requireTokenType("IDENTIFIER"));
			}
		}
		// TODO compound op token
		tokens.requireOpToken("-");
		tokens.requireOpToken(">");
		var expr = parser.requireElement("expression", tokens);
		return {
			type: "blockLiteral",
			args: args,
			expr: expr,
			evaluate: function (ctx) {
				var returnFunc = function () {
					//TODO - push scope
					for (var i = 0; i < args.length; i++) {
						ctx[args[i].value] = arguments[i];
					}
					return expr.evaluate(ctx); //OK
				};
				return returnFunc;
			},
		};
	});

	_parser.addIndirectExpression("propertyAccess", function (parser, runtime, tokens, root) {
		if (!tokens.matchOpToken(".")) return;
		var prop = tokens.requireTokenType("IDENTIFIER");
		var propertyAccess = {
			type: "propertyAccess",
			root: root,
			prop: prop,
			args: [root],
			op: function (_context, rootVal) {
				var value = runtime.resolveProperty(rootVal, prop.value);
				return value;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
		return parser.parseElement("indirectExpression", tokens, propertyAccess);
	});

	_parser.addIndirectExpression("of", function (parser, runtime, tokens, root) {
		if (!tokens.matchToken("of")) return;
		var newRoot = parser.requireElement("expression", tokens);
		// find the urroot
		var childOfUrRoot = null;
		var urRoot = root;
		while (urRoot.root) {
			childOfUrRoot = urRoot;
			urRoot = urRoot.root;
		}
		if (urRoot.type !== "symbol" && urRoot.type !== "attributeRef" && urRoot.type !== "styleRef" && urRoot.type !== "computedStyleRef") {
			parser.raiseParseError(tokens, "Cannot take a property of a non-symbol: " + urRoot.type);
		}
		var attribute = urRoot.type === "attributeRef";
		var style = urRoot.type === "styleRef" || urRoot.type === "computedStyleRef";
		if (attribute || style) {
			var attributeElt = urRoot
		}
		var prop = urRoot.name;

		var propertyAccess = {
			type: "ofExpression",
			prop: urRoot.token,
			root: newRoot,
			attribute: attributeElt,
			expression: root,
			args: [newRoot],
			op: function (context, rootVal) {
				if (attribute) {
					return runtime.resolveAttribute(rootVal, prop);
				} else if (style) {
					if (urRoot.type === "computedStyleRef") {
						return runtime.resolveComputedStyle(rootVal, prop);
					} else {
						return runtime.resolveStyle(rootVal, prop);
					}
				} else {
					return runtime.resolveProperty(rootVal, prop);
				}
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};

		if (urRoot.type === "attributeRef") {
			propertyAccess.attribute = urRoot;
		}
		if (childOfUrRoot) {
			childOfUrRoot.root = propertyAccess;
			childOfUrRoot.args = [propertyAccess];
		} else {
			root = propertyAccess;
		}

		return parser.parseElement("indirectExpression", tokens, root);
	});

	_parser.addIndirectExpression("possessive", function (parser, runtime, tokens, root) {
		if (parser.possessivesDisabled) {
			return;
		}
		var apostrophe = tokens.matchOpToken("'");
		if (
			apostrophe ||
			(root.type === "symbol" &&
				(root.name === "my" || root.name === "its" || root.name === "your") &&
				(tokens.currentToken().type === "IDENTIFIER" || tokens.currentToken().type === "ATTRIBUTE_REF" || tokens.currentToken().type === "STYLE_REF"))
		) {
			if (apostrophe) {
				tokens.requireToken("s");
			}
			var attribute = parser.parseElement("attributeRef", tokens);
			if (attribute == null) {
				var style = parser.parseElement("styleRef", tokens);
				if (style == null) {
					var prop = tokens.requireTokenType("IDENTIFIER");
				}
			}
			var propertyAccess = {
				type: "possessive",
				root: root,
				attribute: attribute || style,
				prop: prop,
				args: [root],
				op: function (context, rootVal) {
					if (attribute) {
						// @ts-ignore
						var value = runtime.resolveAttribute(rootVal, attribute.name);
					} else if (style) {
						// @ts-ignore
						if (style.type === 'computedStyleRef') {
							var value = runtime.resolveComputedStyle(rootVal, style.name);
						} else {
							var value = runtime.resolveStyle(rootVal, style.name);
						}
					} else {
						var value = runtime.resolveProperty(rootVal, prop.value);
					}
					return value;
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
			return parser.parseElement("indirectExpression", tokens, propertyAccess);
		}
	});

	_parser.addIndirectExpression("inExpression", function (parser, runtime, tokens, root) {
		if (!tokens.matchToken("in")) return;
		var target = parser.requireElement("expression", tokens);
		var propertyAccess = {
			type: "inExpression",
			root: root,
			args: [root, target],
			op: function (context, rootVal, target) {
				var returnArr = [];
				if (rootVal.css) {
					runtime.implicitLoop(target, function (targetElt) {
						var results = targetElt.querySelectorAll(rootVal.css);
						for (var i = 0; i < results.length; i++) {
							returnArr.push(results[i]);
						}
					});
				} else if (rootVal instanceof Element) {
					var within = false;
					runtime.implicitLoop(target, function (targetElt) {
						if (targetElt.contains(rootVal)) {
							within = true;
						}
					});
					if(within) {
						return rootVal;
					}
				} else {
					runtime.implicitLoop(rootVal, function (rootElt) {
						runtime.implicitLoop(target, function (targetElt) {
							if (rootElt === targetElt) {
								returnArr.push(rootElt);
							}
						});
					});
				}
				if (returnArr.length > 0) {
					return returnArr;
				} else {
					return null;
				}
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
		return parser.parseElement("indirectExpression", tokens, propertyAccess);
	});

	_parser.addIndirectExpression("asExpression", function (parser, runtime, tokens, root) {
		if (!tokens.matchToken("as")) return;
		tokens.matchToken("a") || tokens.matchToken("an");
		var conversion = parser.requireElement("dotOrColonPath", tokens).evaluate(); // OK No promise
		var propertyAccess = {
			type: "asExpression",
			root: root,
			args: [root],
			op: function (context, rootVal) {
				return runtime.convertValue(rootVal, conversion);
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
		return parser.parseElement("indirectExpression", tokens, propertyAccess);
	});

	_parser.addIndirectExpression("functionCall", function (parser, runtime, tokens, root) {
		if (!tokens.matchOpToken("(")) return;
		var args = [];
		if (!tokens.matchOpToken(")")) {
			do {
				args.push(parser.requireElement("expression", tokens));
			} while (tokens.matchOpToken(","));
			tokens.requireOpToken(")");
		}

		if (root.root) {
			var functionCall = {
				type: "functionCall",
				root: root,
				argExressions: args,
				args: [root.root, args],
				op: function (context, rootRoot, args) {
					runtime.nullCheck(rootRoot, root.root);
					var func = rootRoot[root.prop.value];
					runtime.nullCheck(func, root);
					if (func.hyperfunc) {
						args.push(context);
					}
					return func.apply(rootRoot, args);
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		} else {
			var functionCall = {
				type: "functionCall",
				root: root,
				argExressions: args,
				args: [root, args],
				op: function (context, func, argVals) {
					runtime.nullCheck(func, root);
					if (func.hyperfunc) {
						argVals.push(context);
					}
					var apply = func.apply(null, argVals);
					return apply;
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		}
		return parser.parseElement("indirectExpression", tokens, functionCall);
	});

	_parser.addIndirectExpression("attributeRefAccess", function (parser, runtime, tokens, root) {
		var attribute = parser.parseElement("attributeRef", tokens);
		if (!attribute) return;
		var attributeAccess = {
			type: "attributeRefAccess",
			root: root,
			attribute: attribute,
			args: [root],
			op: function (_ctx, rootVal) {
				// @ts-ignore
				var value = runtime.resolveAttribute(rootVal, attribute.name);
				return value;
			},
			evaluate: function (context) {
				return _runtime.unifiedEval(this, context);
			},
		};
		return attributeAccess;
	});

	_parser.addIndirectExpression("arrayIndex", function (parser, runtime, tokens, root) {
		if (!tokens.matchOpToken("[")) return;
		var andBefore = false;
		var andAfter = false;
		var firstIndex = null;
		var secondIndex = null;

		if (tokens.matchOpToken("..")) {
			andBefore = true;
			firstIndex = parser.requireElement("expression", tokens);
		} else {
			firstIndex = parser.requireElement("expression", tokens);

			if (tokens.matchOpToken("..")) {
				andAfter = true;
				var current = tokens.currentToken();
				if (current.type !== "R_BRACKET") {
					secondIndex = parser.parseElement("expression", tokens);
				}
			}
		}
		tokens.requireOpToken("]");

		var arrayIndex = {
			type: "arrayIndex",
			root: root,
			firstIndex: firstIndex,
			secondIndex: secondIndex,
			args: [root, firstIndex, secondIndex],
			op: function (_ctx, root, firstIndex, secondIndex) {
				if (andBefore) {
					return root.slice(0, firstIndex + 1); // returns all items from beginning to firstIndex (inclusive)
				} else if (andAfter) {
					if (secondIndex != null) {
						return root.slice(firstIndex, secondIndex + 1); // returns all items from firstIndex to secondIndex (inclusive)
					} else {
						return root.slice(firstIndex); // returns from firstIndex to end of array
					}
				} else {
					return root[firstIndex];
				}
			},
			evaluate: function (context) {
				return _runtime.unifiedEval(this, context);
			},
		};

		return _parser.parseElement("indirectExpression", tokens, arrayIndex);
	});

	// taken from https://drafts.csswg.org/css-values-4/#relative-length
	//        and https://drafts.csswg.org/css-values-4/#absolute-length
	//        (NB: we do not support `in` dues to conflicts w/ the hyperscript grammar)
	var STRING_POSTFIXES = [
		'em', 'ex', 'cap', 'ch', 'ic', 'rem', 'lh', 'rlh', 'vw', 'vh', 'vi', 'vb', 'vmin', 'vmax',
		'cm', 'mm', 'Q', 'pc', 'pt', 'px'
	];
	_parser.addGrammarElement("postfixExpression", function (parser, runtime, tokens) {
		var root = parser.parseElement("primaryExpression", tokens);

		let stringPosfix = tokens.matchAnyToken.apply(tokens, STRING_POSTFIXES) || tokens.matchOpToken("%");
		if (stringPosfix) {
			return {
				type: "stringPostfix",
				postfix: stringPosfix.value,
				args: [root],
				op: function (context, val) {
					return "" + val + stringPosfix.value;
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		}

		var timeFactor = null;
		if (tokens.matchToken("s") || tokens.matchToken("seconds")) {
			timeFactor = 1000;
		} else if (tokens.matchToken("ms") || tokens.matchToken("milliseconds")) {
			timeFactor = 1;
		}
		if (timeFactor) {
			return {
				type: "timeExpression",
				time: root,
				factor: timeFactor,
				args: [root],
				op: function (_context, val) {
					return val * timeFactor;
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		}

		if (tokens.matchOpToken(":")) {
			var typeName = tokens.requireTokenType("IDENTIFIER");
			var nullOk = !tokens.matchOpToken("!");
			return {
				type: "typeCheck",
				typeName: typeName,
				nullOk: nullOk,
				args: [root],
				op: function (context, val) {
					var passed = runtime.typeCheck(val, typeName.value, nullOk);
					if (passed) {
						return val;
					} else {
						throw new Error("Typecheck failed!  Expected: " + typeName.value);
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		} else {
			return root;
		}
	});

	_parser.addGrammarElement("logicalNot", function (parser, runtime, tokens) {
		if (!tokens.matchToken("not")) return;
		var root = parser.requireElement("unaryExpression", tokens);
		return {
			type: "logicalNot",
			root: root,
			args: [root],
			op: function (context, val) {
				return !val;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addGrammarElement("noExpression", function (parser, runtime, tokens) {
		if (!tokens.matchToken("no")) return;
		var root = parser.requireElement("unaryExpression", tokens);
		return {
			type: "noExpression",
			root: root,
			args: [root],
			op: function (_context, val) {
				return runtime.isEmpty(val);
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addLeafExpression("some", function (parser, runtime, tokens) {
		if (!tokens.matchToken("some")) return;
		var root = parser.requireElement("expression", tokens);
		return {
			type: "noExpression",
			root: root,
			args: [root],
			op: function (_context, val) {
				return !runtime.isEmpty(val);
			},
			evaluate(context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addGrammarElement("negativeNumber", function (parser, runtime, tokens) {
		if (!tokens.matchOpToken("-")) return;
		var root = parser.requireElement("unaryExpression", tokens);
		return {
			type: "negativeNumber",
			root: root,
			args: [root],
			op: function (context, value) {
				return -1 * value;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addGrammarElement("unaryExpression", function (parser, runtime, tokens) {
		return parser.parseAnyOf(
			["logicalNot", "relativePositionalExpression", "positionalExpression", "noExpression", "negativeNumber", "postfixExpression"],
			tokens
		);
	});

	var scanForwardQuery = function(start, root, match, wrap) {
		var results = root.querySelectorAll(match);
		for (var i = 0; i < results.length; i++) {
			var elt = results[i];
			if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
				return elt;
			}
		}
		if (wrap) {
			return results[0];
		}
	}

	var scanBackwardsQuery = function(start, root, match, wrap) {
		var results = root.querySelectorAll(match);
		for (var i = results.length - 1; i >= 0; i--) {
			var elt = results[i];
			if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_FOLLOWING) {
				return elt;
			}
		}
		if (wrap) {
			return results[results.length - 1];
		}
	}

	var scanForwardArray = function(start, array, match, wrap) {
		var matches = [];
		_runtime.forEach(array, function(elt){
			if (elt.matches(match) || elt === start) {
				matches.push(elt);
			}
		})
		for (var i = 0; i < matches.length - 1; i++) {
			var elt = matches[i];
			if (elt === start) {
				return matches[i + 1];
			}
		}
		if (wrap) {
			var first = matches[0];
			if (first && first.matches(match)) {
				return first;
			}
		}
	}

	var scanBackwardsArray = function(start, array, match, wrap) {
		return scanForwardArray(start, Array.from(array).reverse(), match, wrap);
	}

	_parser.addGrammarElement("relativePositionalExpression", function (parser, runtime, tokens) {
		var op = tokens.matchAnyToken("next", "previous");
		if (!op) return;
		if (op.value === "next") {
			var forwardSearch = true;
		}

		var thing = parser.parseElement("expression", tokens);

		if (tokens.matchToken("from")) {
			tokens.pushFollow("in");
			try {
				var from = parser.requireElement("expression", tokens);
			} finally {
				tokens.popFollow();
			}
		} else {
			var from = parser.requireElement("implicitMeTarget", tokens);
		}

		var inSearch = false;
		var withinElt;
		if (tokens.matchToken("in")) {
			inSearch = true;
			var inElt = parser.requireElement("expression", tokens);
		} else if (tokens.matchToken("within")) {
			withinElt = parser.requireElement("expression", tokens);
		} else {
			withinElt = document.body;
		}

		var wrapping = false;
		if (tokens.matchToken("with")) {
			tokens.requireToken("wrapping")
			wrapping = true;
		}

		return {
			type: "relativePositionalExpression",
			from: from,
			forwardSearch: forwardSearch,
			inSearch: inSearch,
			wrapping: wrapping,
			inElt: inElt,
			withinElt: withinElt,
			operator: op.value,
			args: [thing, from, inElt, withinElt],
			op: function (context, thing, from, inElt, withinElt) {

				var css = thing.css;
				if (css == null) {
					throw "Expected a CSS value";
				}

				if(inSearch) {
					if (inElt) {
						if (forwardSearch) {
							return scanForwardArray(from, inElt, css, wrapping);
						} else {
							return scanBackwardsArray(from, inElt, css, wrapping);
						}
					}
				} else {
					if (withinElt) {
						if (forwardSearch) {
							return scanForwardQuery(from, withinElt, css, wrapping);
						} else {
							return scanBackwardsQuery(from, withinElt, css, wrapping);
						}
					}
				}
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		}

	});

	_parser.addGrammarElement("positionalExpression", function (parser, runtime, tokens) {
		var op = tokens.matchAnyToken("first", "last", "random");
		if (!op) return;
		tokens.matchAnyToken("in", "from", "of");
		var rhs = parser.requireElement("unaryExpression", tokens);
		const operator = op.value;
		return {
			type: "positionalExpression",
			rhs: rhs,
			operator: op.value,
			args: [rhs],
			op: function (context, rhsVal) {
				if (rhsVal && !Array.isArray(rhsVal)) {
					if (rhsVal.children) {
						rhsVal = rhsVal.children;
					} else {
						rhsVal = Array.from(rhsVal);
					}
				}
				if (rhsVal) {
					if (operator === "first") {
						return rhsVal[0];
					} else if (operator === "last") {
						return rhsVal[rhsVal.length - 1];
					} else if (operator === "random") {
						return rhsVal[Math.floor(Math.random() * rhsVal.length)];
					}
				}
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			},
		};
	});

	_parser.addGrammarElement("mathOperator", function (parser, runtime, tokens) {
		var expr = parser.parseElement("unaryExpression", tokens);
		var mathOp,
			initialMathOp = null;
		mathOp = tokens.matchAnyOpToken("+", "-", "*", "/", "%");
		while (mathOp) {
			initialMathOp = initialMathOp || mathOp;
			var operator = mathOp.value;
			if (initialMathOp.value !== operator) {
				parser.raiseParseError(tokens, "You must parenthesize math operations with different operators");
			}
			var rhs = parser.parseElement("unaryExpression", tokens);
			expr = {
				type: "mathOperator",
				lhs: expr,
				rhs: rhs,
				operator: operator,
				args: [expr, rhs],
				op: function (context, lhsVal, rhsVal) {
					if (operator === "+") {
						return lhsVal + rhsVal;
					} else if (operator === "-") {
						return lhsVal - rhsVal;
					} else if (operator === "*") {
						return lhsVal * rhsVal;
					} else if (operator === "/") {
						return lhsVal / rhsVal;
					} else if (operator === "%") {
						return lhsVal % rhsVal;
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
			mathOp = tokens.matchAnyOpToken("+", "-", "*", "/", "%");
		}
		return expr;
	});

	_parser.addGrammarElement("mathExpression", function (parser, runtime, tokens) {
		return parser.parseAnyOf(["mathOperator", "unaryExpression"], tokens);
	});

	function sloppyContains(src, container, value){
		if (container['contains']) {
			return container.contains(value);
		} else if (container['includes']) {
			return container.includes(value);
		} else {
			throw Error("The value of " + src.sourceFor() + " does not have a contains or includes method on it");
		}
	}
	function sloppyMatches(src, target, toMatch){
		if (target['match']) {
			return !!target.match(toMatch);
		} else if (target['matches']) {
			return target.matches(toMatch);
		} else {
			throw Error("The value of " + src.sourceFor() + " does not have a match or matches method on it");
		}
	}

	_parser.addGrammarElement("comparisonOperator", function (parser, runtime, tokens) {
		var expr = parser.parseElement("mathExpression", tokens);
		var comparisonToken = tokens.matchAnyOpToken("<", ">", "<=", ">=", "==", "===", "!=", "!==");
		var operator = comparisonToken ? comparisonToken.value : null;
		var hasRightValue = true; // By default, most comparisons require two values, but there are some exceptions.
		var typeCheck = false;

		if (operator == null) {
			if (tokens.matchToken("is") || tokens.matchToken("am")) {
				if (tokens.matchToken("not")) {
					if (tokens.matchToken("in")) {
						operator = "not in";
					} else if (tokens.matchToken("a")) {
						operator = "not a";
						typeCheck = true;
					} else if (tokens.matchToken("empty")) {
						operator = "not empty";
						hasRightValue = false;
					} else {
						operator = "!=";
					}
				} else if (tokens.matchToken("in")) {
					operator = "in";
				} else if (tokens.matchToken("a")) {
					operator = "a";
					typeCheck = true;
				} else if (tokens.matchToken("empty")) {
					operator = "empty";
					hasRightValue = false;
				} else if (tokens.matchToken("less")) {
					tokens.requireToken("than");
					if (tokens.matchToken("or")) {
						tokens.requireToken("equal");
						tokens.requireToken("to");
						operator = "<=";
					} else {
						operator = "<";
					}
				} else if (tokens.matchToken("greater")) {
					tokens.requireToken("than");
					if (tokens.matchToken("or")) {
						tokens.requireToken("equal");
						tokens.requireToken("to");
						operator = ">=";
					} else {
						operator = ">";
					}
				} else {
					operator = "==";
				}
			} else if (tokens.matchToken("exist") || tokens.matchToken("exists")) {
				operator = "exist";
				hasRightValue = false;
			} else if (tokens.matchToken("matches") || tokens.matchToken("match")) {
				operator = "match";
			} else if (tokens.matchToken("contains") || tokens.matchToken("contain")) {
				operator = "contain";
			} else if (tokens.matchToken("includes") || tokens.matchToken("include")) {
				operator = "include";
			} else if (tokens.matchToken("do") || tokens.matchToken("does")) {
				tokens.requireToken("not");
				if (tokens.matchToken("matches") || tokens.matchToken("match")) {
					operator = "not match";
				} else if (tokens.matchToken("contains") || tokens.matchToken("contain")) {
					operator = "not contain";
				} else if (tokens.matchToken("exist") || tokens.matchToken("exist")) {
					operator = "not exist";
					hasRightValue = false;
				} else if (tokens.matchToken("include")) {
					operator = "not include";
				} else {
					parser.raiseParseError(tokens, "Expected matches or contains");
				}
			}
		}

		if (operator) {
			// Do not allow chained comparisons, which is dumb
			if (typeCheck) {
				var typeName = tokens.requireTokenType("IDENTIFIER");
				var nullOk = !tokens.matchOpToken("!");
			} else if (hasRightValue) {
				var rhs = parser.requireElement("mathExpression", tokens);
				if (operator === "match" || operator === "not match") {
					rhs = rhs.css ? rhs.css : rhs;
				}
			}
			var lhs = expr;
			expr = {
				type: "comparisonOperator",
				operator: operator,
				typeName: typeName,
				nullOk: nullOk,
				lhs: expr,
				rhs: rhs,
				args: [expr, rhs],
				op: function (context, lhsVal, rhsVal) {
					if (operator === "==") {
						return lhsVal == rhsVal;
					} else if (operator === "!=") {
						return lhsVal != rhsVal;
					}
					if (operator === "match") {
						return lhsVal != null && sloppyMatches(lhs, lhsVal, rhsVal);
					}
					if (operator === "not match") {
						return lhsVal == null || !sloppyMatches(lhs, lhsVal, rhsVal);
					}
					if (operator === "in") {
						return rhsVal != null && sloppyContains(rhs, rhsVal, lhsVal);
					}
					if (operator === "not in") {
						return rhsVal == null || !sloppyContains(rhs, rhsVal, lhsVal);
					}
					if (operator === "contain") {
						return lhsVal != null && sloppyContains(lhs, lhsVal, rhsVal);
					}
					if (operator === "not contain") {
						return lhsVal == null || !sloppyContains(lhs, lhsVal, rhsVal);
					}
					if (operator === "include") {
						return lhsVal != null && sloppyContains(lhs, lhsVal, rhsVal);
					}
					if (operator === "not include") {
						return lhsVal == null || !sloppyContains(lhs, lhsVal, rhsVal);
					}
					if (operator === "===") {
						return lhsVal === rhsVal;
					} else if (operator === "!==") {
						return lhsVal !== rhsVal;
					} else if (operator === "<") {
						return lhsVal < rhsVal;
					} else if (operator === ">") {
						return lhsVal > rhsVal;
					} else if (operator === "<=") {
						return lhsVal <= rhsVal;
					} else if (operator === ">=") {
						return lhsVal >= rhsVal;
					} else if (operator === "empty") {
						return runtime.isEmpty(lhsVal);
					} else if (operator === "not empty") {
						return !runtime.isEmpty(lhsVal);
					} else if (operator === "exist") {
						return runtime.doesExist(lhsVal);
					} else if (operator === "not exist") {
						return !runtime.doesExist(lhsVal);
					} else if (operator === "a") {
						return runtime.typeCheck(lhsVal, typeName.value, nullOk);
					} else if (operator === "not a") {
						return !runtime.typeCheck(lhsVal, typeName.value, nullOk);
					} else {
						throw "Unknown comparison : " + operator;
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
		}
		return expr;
	});

	_parser.addGrammarElement("comparisonExpression", function (parser, runtime, tokens) {
		return parser.parseAnyOf(["comparisonOperator", "mathExpression"], tokens);
	});

	_parser.addGrammarElement("logicalOperator", function (parser, runtime, tokens) {
		var expr = parser.parseElement("comparisonExpression", tokens);
		var logicalOp,
			initialLogicalOp = null;
		logicalOp = tokens.matchToken("and") || tokens.matchToken("or");
		while (logicalOp) {
			initialLogicalOp = initialLogicalOp || logicalOp;
			if (initialLogicalOp.value !== logicalOp.value) {
				parser.raiseParseError(tokens, "You must parenthesize logical operations with different operators");
			}
			var rhs = parser.requireElement("comparisonExpression", tokens);
			const operator = logicalOp.value;
			expr = {
				type: "logicalOperator",
				operator: operator,
				lhs: expr,
				rhs: rhs,
				args: [expr, rhs],
				op: function (context, lhsVal, rhsVal) {
					if (operator === "and") {
						return lhsVal && rhsVal;
					} else {
						return lhsVal || rhsVal;
					}
				},
				evaluate: function (context) {
					return runtime.unifiedEval(this, context);
				},
			};
			logicalOp = tokens.matchToken("and") || tokens.matchToken("or");
		}
		return expr;
	});

	_parser.addGrammarElement("logicalExpression", function (parser, runtime, tokens) {
		return parser.parseAnyOf(["logicalOperator", "mathExpression"], tokens);
	});

	_parser.addGrammarElement("asyncExpression", function (parser, runtime, tokens) {
		if (tokens.matchToken("async")) {
			var value = parser.requireElement("logicalExpression", tokens);
			var expr = {
				type: "asyncExpression",
				value: value,
				evaluate: function (context) {
					return {
						asyncWrapper: true,
						value: this.value.evaluate(context), //OK
					};
				},
			};
			return expr;
		} else {
			return parser.parseElement("logicalExpression", tokens);
		}
	});

	_parser.addGrammarElement("expression", function (parser, runtime, tokens) {
		tokens.matchToken("the"); // optional the
		return parser.parseElement("asyncExpression", tokens);
	});

	_parser.addGrammarElement("assignableExpression", function (parser, runtime, tokens) {
		tokens.matchToken("the"); // optional the

		// TODO obviously we need to generalize this as a left hand side / targetable concept
		var expr = parser.parseElement("primaryExpression", tokens);
		if (expr && (
			expr.type === "symbol" ||
			expr.type === "ofExpression" ||
			expr.type === "propertyAccess" ||
			expr.type === "attributeRefAccess" ||
			expr.type === "attributeRef" ||
			expr.type === "styleRef" ||
			expr.type === "possessive")
		) {
			return expr;
		} else {
			_parser.raiseParseError(
				tokens,
				"A target expression must be writable.  The expression type '" + (expr && expr.type) + "' is not."
			);
		}
		return expr;
	});

	_parser.addGrammarElement("hyperscript", function (parser, runtime, tokens) {
		var features = [];

		if (tokens.hasMore()) {
			while (parser.featureStart(tokens.currentToken()) || tokens.currentToken().value === "(") {
				var feature = parser.requireElement("feature", tokens);
				features.push(feature);
				tokens.matchToken("end"); // optional end
			}
		}
		return {
			type: "hyperscript",
			features: features,
			apply: function (target, source, args) {
				// no op
				for (const feature of features) {
					feature.install(target, source, args);
				}
			},
		};
	});

	var parseEventArgs = function (tokens) {
		var args = [];
		// handle argument list (look ahead 3)
		if (
			tokens.token(0).value === "(" &&
			(tokens.token(1).value === ")" || tokens.token(2).value === "," || tokens.token(2).value === ")")
		) {
			tokens.matchOpToken("(");
			do {
				args.push(tokens.requireTokenType("IDENTIFIER"));
			} while (tokens.matchOpToken(","));
			tokens.requireOpToken(")");
		}
		return args;
	};

	_parser.addFeature("on", function (parser, runtime, tokens) {
		if (!tokens.matchToken("on")) return;
		var every = false;
		if (tokens.matchToken("every")) {
			every = true;
		}
		var events = [];
		var displayName = null;
		do {
			var on = parser.requireElement("eventName", tokens, "Expected event name");

			var eventName = on.evaluate(); // OK No Promise

			if (displayName) {
				displayName = displayName + " or " + eventName;
			} else {
				displayName = "on " + eventName;
			}
			var args = parseEventArgs(tokens);

			var filter = null;
			if (tokens.matchOpToken("[")) {
				filter = parser.requireElement("expression", tokens);
				tokens.requireOpToken("]");
			}

			if (tokens.currentToken().type === "NUMBER") {
				var startCountToken = tokens.consumeToken();
				var startCount = parseInt(startCountToken.value);
				if (tokens.matchToken("to")) {
					var endCountToken = tokens.consumeToken();
					var endCount = parseInt(endCountToken.value);
				} else if (tokens.matchToken("and")) {
					var unbounded = true;
					tokens.requireToken("on");
				}
			}

			if (eventName === "intersection") {
				var intersectionSpec = {};
				if (tokens.matchToken("with")) {
					intersectionSpec["with"] = parser.requireElement("expression", tokens).evaluate();
				}
				if (tokens.matchToken("having")) {
					do {
						if (tokens.matchToken("margin")) {
							intersectionSpec["rootMargin"] = parser.requireElement("stringLike", tokens).evaluate();
						} else if (tokens.matchToken("threshold")) {
							intersectionSpec["threshold"] = parser.requireElement("expression", tokens).evaluate();
						} else {
							parser.raiseParseError(tokens, "Unknown intersection config specification");
						}
					} while (tokens.matchToken("and"));
				}
			} else if (eventName === "mutation") {
				var mutationSpec = {};
				if (tokens.matchToken("of")) {
					do {
						if (tokens.matchToken("anything")) {
							mutationSpec["attributes"] = true;
							mutationSpec["subtree"] = true;
							mutationSpec["characterData"] = true;
							mutationSpec["childList"] = true;
						} else if (tokens.matchToken("childList")) {
							mutationSpec["childList"] = true;
						} else if (tokens.matchToken("attributes")) {
							mutationSpec["attributes"] = true;
							mutationSpec["attributeOldValue"] = true;
						} else if (tokens.matchToken("subtree")) {
							mutationSpec["subtree"] = true;
						} else if (tokens.matchToken("characterData")) {
							mutationSpec["characterData"] = true;
							mutationSpec["characterDataOldValue"] = true;
						} else if (tokens.currentToken().type === "ATTRIBUTE_REF") {
							var attribute = tokens.consumeToken();
							if (mutationSpec["attributeFilter"] == null) {
								mutationSpec["attributeFilter"] = [];
							}
							if (attribute.value.indexOf("@") == 0) {
								mutationSpec["attributeFilter"].push(attribute.value.substring(1));
							} else {
								parser.raiseParseError(
									tokens,
									"Only shorthand attribute references are allowed here"
								);
							}
						} else {
							parser.raiseParseError(tokens, "Unknown mutation config specification");
						}
					} while (tokens.matchToken("or"));
				} else {
					mutationSpec["attributes"] = true;
					mutationSpec["characterData"] = true;
					mutationSpec["childList"] = true;
				}
			}

			var from = null;
			var elsewhere = false;
			if (tokens.matchToken("from")) {
				if (tokens.matchToken("elsewhere")) {
					elsewhere = true;
				} else {
					from = parser.parseElement("expression", tokens);
					if (!from) {
						parser.raiseParseError(tokens, 'Expected either target value or "elsewhere".');
					}
				}
			}
			// support both "elsewhere" and "from elsewhere"
			if (from === null && elsewhere === false && tokens.matchToken("elsewhere")) {
				elsewhere = true;
			}

			if (tokens.matchToken("in")) {
				var inExpr = parser.parseAnyOf(["idRef", "queryRef", "classRef"], tokens);
			}

			if (tokens.matchToken("debounced")) {
				tokens.requireToken("at");
				var timeExpr = parser.requireElement("expression", tokens);
				// @ts-ignore
				var debounceTime = timeExpr.evaluate({}); // OK No promise TODO make a literal time expr
			} else if (tokens.matchToken("throttled")) {
				tokens.requireToken("at");
				var timeExpr = parser.requireElement("expression", tokens);
				// @ts-ignore
				var throttleTime = timeExpr.evaluate({}); // OK No promise TODO make a literal time expr
			}

			events.push({
				execCount: 0,
				every: every,
				on: eventName,
				args: args,
				filter: filter,
				from: from,
				inExpr: inExpr,
				elsewhere: elsewhere,
				startCount: startCount,
				endCount: endCount,
				unbounded: unbounded,
				debounceTime: debounceTime,
				throttleTime: throttleTime,
				mutationSpec: mutationSpec,
				intersectionSpec: intersectionSpec,
				debounced: undefined,
				lastExec: undefined,
			});
		} while (tokens.matchToken("or"));

		var queueLast = true;
		if (!every) {
			if (tokens.matchToken("queue")) {
				if (tokens.matchToken("all")) {
					var queueAll = true;
					var queueLast = false;
				} else if (tokens.matchToken("first")) {
					var queueFirst = true;
				} else if (tokens.matchToken("none")) {
					var queueNone = true;
				} else {
					tokens.requireToken("last");
				}
			}
		}

		var start = parser.requireElement("commandList", tokens);
		parser.ensureTerminated(start);

		if (tokens.matchToken("catch")) {
			var errorSymbol = tokens.requireTokenType("IDENTIFIER").value;
			var errorHandler = parser.requireElement("commandList", tokens);
			parser.ensureTerminated(errorHandler);
		}

		if (tokens.matchToken("finally")) {
			var finallyHandler = parser.requireElement("commandList", tokens);
			parser.ensureTerminated(finallyHandler);
		}

		var onFeature = {
			displayName: displayName,
			events: events,
			start: start,
			every: every,
			execCount: 0,
			errorHandler: errorHandler,
			errorSymbol: errorSymbol,
			execute: function (/** @type {Context} */ ctx) {
				let eventQueueInfo = runtime.getEventQueueFor(ctx.me, onFeature);
				if (eventQueueInfo.executing && every === false) {
					if (queueNone || (queueFirst && eventQueueInfo.queue.length > 0)) {
						return;
					}
					if (queueLast) {
						eventQueueInfo.queue.length = 0;
					}
					eventQueueInfo.queue.push(ctx);
					return;
				}
				onFeature.execCount++;
				eventQueueInfo.executing = true;
				ctx.meta.onHalt = function () {
					eventQueueInfo.executing = false;
					var queued = eventQueueInfo.queue.shift();
					if (queued) {
						setTimeout(function () {
							onFeature.execute(queued);
						}, 1);
					}
				};
				ctx.meta.reject = function (err) {
					console.error(err.message ? err.message : err);
					var hypertrace = runtime.getHyperTrace(ctx, err);
					if (hypertrace) {
						hypertrace.print();
					}
					runtime.triggerEvent(ctx.me, "exception", {
						error: err,
					});
				};
				start.execute(ctx);
			},
			install: function (elt, source) {
				for (const eventSpec of onFeature.events) {
					var targets;
					if (eventSpec.elsewhere) {
						targets = [document];
					} else if (eventSpec.from) {
						targets = eventSpec.from.evaluate(runtime.makeContext(elt, onFeature, elt, null));
					} else {
						targets = [elt];
					}
					runtime.implicitLoop(targets, function (target) {
						// OK NO PROMISE

						var eventName = eventSpec.on;
						if (eventSpec.mutationSpec) {
							eventName = "hyperscript:mutation";
							const observer = new MutationObserver(function (mutationList, observer) {
								if (!onFeature.executing) {
									_runtime.triggerEvent(target, eventName, {
										mutationList: mutationList,
										observer: observer,
									});
								}
							});
							observer.observe(target, eventSpec.mutationSpec);
						}

						if (eventSpec.intersectionSpec) {
							eventName = "hyperscript:insersection";
							const observer = new IntersectionObserver(function (entries) {
								for (const entry of entries) {
									var detail = {
										observer: observer,
									};
									detail = mergeObjects(detail, entry);
									detail["intersecting"] = entry.isIntersecting;
									_runtime.triggerEvent(target, eventName, detail);
								}
							}, eventSpec.intersectionSpec);
							observer.observe(target);
						}

						var addEventListener = target.addEventListener || target.on;
						addEventListener.call(target, eventName, function listener(evt) {
							// OK NO PROMISE
							if (typeof Node !== 'undefined' && elt instanceof Node && target !== elt && !elt.isConnected) {
								target.removeEventListener(eventName, listener);
								return;
							}

							var ctx = runtime.makeContext(elt, onFeature, elt, evt);
							if (eventSpec.elsewhere && elt.contains(evt.target)) {
								return;
							}
							if (eventSpec.from) {
								ctx.result = target;
							}

							// establish context
							for (const arg of eventSpec.args) {
								let eventValue = ctx.event[arg.value];
								if (eventValue !== undefined) {
									ctx[arg.value] = eventValue;
								} else if ('detail' in ctx.event) {
									ctx[arg.value] = ctx.event['detail'][arg.value];
								}
							}

							// install error handler if any
							ctx.meta.errorHandler = errorHandler;
							ctx.meta.errorSymbol = errorSymbol;
							ctx.meta.finallyHandler = finallyHandler;

							// apply filter
							if (eventSpec.filter) {
								var initialCtx = ctx.meta.context;
								ctx.meta.context = ctx.event;
								try {
									var value = eventSpec.filter.evaluate(ctx); //OK NO PROMISE
									if (value) {
										// match the javascript semantics for if statements
									} else {
										return;
									}
								} finally {
									ctx.meta.context = initialCtx;
								}
							}

							if (eventSpec.inExpr) {
								var inElement = evt.target;
								while (true) {
									if (inElement.matches && inElement.matches(eventSpec.inExpr.css)) {
										ctx.result = inElement;
										break;
									} else {
										inElement = inElement.parentElement;
										if (inElement == null) {
											return; // no match found
										}
									}
								}
							}

							// verify counts
							eventSpec.execCount++;
							if (eventSpec.startCount) {
								if (eventSpec.endCount) {
									if (
										eventSpec.execCount < eventSpec.startCount ||
										eventSpec.execCount > eventSpec.endCount
									) {
										return;
									}
								} else if (eventSpec.unbounded) {
									if (eventSpec.execCount < eventSpec.startCount) {
										return;
									}
								} else if (eventSpec.execCount !== eventSpec.startCount) {
									return;
								}
							}

							//debounce
							if (eventSpec.debounceTime) {
								if (eventSpec.debounced) {
									clearTimeout(eventSpec.debounced);
								}
								eventSpec.debounced = setTimeout(function () {
									onFeature.execute(ctx);
								}, eventSpec.debounceTime);
								return;
							}

							// throttle
							if (eventSpec.throttleTime) {
								if (
									eventSpec.lastExec &&
									Date.now() < eventSpec.lastExec + eventSpec.throttleTime
								) {
									return;
								} else {
									eventSpec.lastExec = Date.now();
								}
							}

							// apply execute
							onFeature.execute(ctx);
						});
					});
				}
			},
		};
		parser.setParent(start, onFeature);
		return onFeature;
	});

	_parser.addFeature("def", function (parser, runtime, tokens) {
		if (!tokens.matchToken("def")) return;
		var functionName = parser.requireElement("dotOrColonPath", tokens);
		var nameVal = functionName.evaluate(); // OK
		var nameSpace = nameVal.split(".");
		var funcName = nameSpace.pop();

		var args = [];
		if (tokens.matchOpToken("(")) {
			if (tokens.matchOpToken(")")) {
				// emtpy args list
			} else {
				do {
					args.push(tokens.requireTokenType("IDENTIFIER"));
				} while (tokens.matchOpToken(","));
				tokens.requireOpToken(")");
			}
		}

		var start = parser.requireElement("commandList", tokens);

		if (tokens.matchToken("catch")) {
			var errorSymbol = tokens.requireTokenType("IDENTIFIER").value;
			var errorHandler = parser.parseElement("commandList", tokens);
		}

		if (tokens.matchToken("finally")) {
			var finallyHandler = parser.requireElement("commandList", tokens);
			parser.ensureTerminated(finallyHandler);
		}

		var functionFeature = {
			displayName:
				funcName +
				"(" +
				args
					.map(function (arg) {
						return arg.value;
					})
					.join(", ") +
				")",
			name: funcName,
			args: args,
			start: start,
			errorHandler: errorHandler,
			errorSymbol: errorSymbol,
			finallyHandler: finallyHandler,
			install: function (target, source) {
				var func = function () {
					// null, worker
					var ctx = runtime.makeContext(source, functionFeature, target, null);

					// install error handler if any
					ctx.meta.errorHandler = errorHandler;
					ctx.meta.errorSymbol = errorSymbol;
					ctx.meta.finallyHandler = finallyHandler;

					for (var i = 0; i < args.length; i++) {
						var name = args[i];
						var argumentVal = arguments[i];
						if (name) {
							ctx[name.value] = argumentVal;
						}
					}
					ctx.meta.caller = arguments[args.length];
					if (ctx.meta.caller) {
						ctx.meta.callingCommand = ctx.meta.caller.meta.command;
					}
					var resolve,
						reject = null;
					var promise = new Promise(function (theResolve, theReject) {
						resolve = theResolve;
						reject = theReject;
					});
					start.execute(ctx);
					if (ctx.meta.returned) {
						return ctx.meta.returnValue;
					} else {
						ctx.meta.resolve = resolve;
						ctx.meta.reject = reject;
						return promise;
					}
				};
				func.hyperfunc = true;
				func.hypername = nameVal;
				runtime.assignToNamespace(target, nameSpace, funcName, func);
			},
		};

		parser.ensureTerminated(start);

		// terminate error handler if any
		if (errorHandler) {
			parser.ensureTerminated(errorHandler);
		}

		parser.setParent(start, functionFeature);
		return functionFeature;
	});

	_parser.addFeature("set", function (parser, runtime, tokens) {
		let setCmd = parser.parseElement("setCommand", tokens);
		if (setCmd) {
			if (setCmd.target.scope !== "element") {
				parser.raiseParseError(tokens, "variables declared at the feature level must be element scoped.");
			}
			let setFeature = {
				start: setCmd,
				install: function (target, source) {
					setCmd && setCmd.execute(runtime.makeContext(target, setFeature, target, null));
				},
			};
			parser.ensureTerminated(setCmd);
			return setFeature;
		}
	});

	_parser.addFeature("init", function (parser, runtime, tokens) {
		if (!tokens.matchToken("init")) return;

		var start = parser.requireElement("commandList", tokens);
		var initFeature = {
			start: start,
			install: function (target, source) {
				setTimeout(function () {
					start && start.execute(runtime.makeContext(target, initFeature, target, null));
				}, 0);
			},
		};

		// terminate body
		parser.ensureTerminated(start);
		parser.setParent(start, initFeature);
		return initFeature;
	});

	_parser.addFeature("worker", function (parser, runtime, tokens) {
		if (tokens.matchToken("worker")) {
			parser.raiseParseError(
				tokens,
				"In order to use the 'worker' feature, include " +
					"the _hyperscript worker plugin. See " +
					"https://hyperscript.org/features/worker/ for " +
					"more info."
			);
		}
	});

	_parser.addFeature("behavior", function (parser, runtime, tokens) {
		if (!tokens.matchToken("behavior")) return;
		var path = parser.requireElement("dotOrColonPath", tokens).evaluate();
		var nameSpace = path.split(".");
		var name = nameSpace.pop();

		var formalParams = [];
		if (tokens.matchOpToken("(") && !tokens.matchOpToken(")")) {
			do {
				formalParams.push(tokens.requireTokenType("IDENTIFIER").value);
			} while (tokens.matchOpToken(","));
			tokens.requireOpToken(")");
		}
		var hs = parser.requireElement("hyperscript", tokens);
		for (var i = 0; i < hs.features.length; i++) {
			var feature = hs.features[i];
			feature.behavior = path;
		}

		return {
			install: function (target, source) {
				runtime.assignToNamespace(
					globalScope.document && globalScope.document.body,
					nameSpace,
					name,
					function (target, source, innerArgs) {
						var internalData = runtime.getInternalData(target);
						var elementScope = getOrInitObject(internalData, path + "Scope");
						for (var i = 0; i < formalParams.length; i++) {
							elementScope[formalParams[i]] = innerArgs[formalParams[i]];
						}
						hs.apply(target, source);
					}
				);
			},
		};
	});

	_parser.addFeature("install", function (parser, runtime, tokens) {
		if (!tokens.matchToken("install")) return;
		var behaviorPath = parser.requireElement("dotOrColonPath", tokens).evaluate();
		var behaviorNamespace = behaviorPath.split(".");
		var args = parser.parseElement("namedArgumentList", tokens);

		var installFeature;
		return (installFeature = {
			install: function (target, source) {
				runtime.unifiedEval(
					{
						args: [args],
						op: function (ctx, args) {
							var behavior = globalScope;
							for (var i = 0; i < behaviorNamespace.length; i++) {
								behavior = behavior[behaviorNamespace[i]];
								if (typeof behavior !== "object" && typeof behavior !== "function")
									throw new Error("No such behavior defined as " + behaviorPath);
							}

							if (!(behavior instanceof Function))
								throw new Error(behaviorPath + " is not a behavior");

							behavior(target, source, args);
						},
					},
					runtime.makeContext(target, installFeature, target)
				);
			},
		});
	});

	_parser.addGrammarElement("jsBody", function (parser, runtime, tokens) {
		var jsSourceStart = tokens.currentToken().start;
		var jsLastToken = tokens.currentToken();

		var funcNames = [];
		var funcName = "";
		var expectFunctionDeclaration = false;
		while (tokens.hasMore()) {
			jsLastToken = tokens.consumeToken();
			var peek = tokens.token(0, true);
			if (peek.type === "IDENTIFIER" && peek.value === "end") {
				break;
			}
			if (expectFunctionDeclaration) {
				if (jsLastToken.type === "IDENTIFIER" || jsLastToken.type === "NUMBER") {
					funcName += jsLastToken.value;
				} else {
					if (funcName !== "") funcNames.push(funcName);
					funcName = "";
					expectFunctionDeclaration = false;
				}
			} else if (jsLastToken.type === "IDENTIFIER" && jsLastToken.value === "function") {
				expectFunctionDeclaration = true;
			}
		}
		var jsSourceEnd = jsLastToken.end + 1;

		return {
			type: "jsBody",
			exposedFunctionNames: funcNames,
			jsSource: tokens.source.substring(jsSourceStart, jsSourceEnd),
		};
	});

	_parser.addFeature("js", function (parser, runtime, tokens) {
		if (!tokens.matchToken("js")) return;
		var jsBody = parser.requireElement("jsBody", tokens);

		var jsSource =
			jsBody.jsSource +
			"\nreturn { " +
			jsBody.exposedFunctionNames
				.map(function (name) {
					return name + ":" + name;
				})
				.join(",") +
			" } ";
		var func = new Function(jsSource);

		return {
			jsSource: jsSource,
			function: func,
			exposedFunctionNames: jsBody.exposedFunctionNames,
			install: function () {
				mergeObjects(globalScope, func());
			},
		};
	});

	_parser.addCommand("js", function (parser, runtime, tokens) {
		if (!tokens.matchToken("js")) return;
		// Parse inputs
		var inputs = [];
		if (tokens.matchOpToken("(")) {
			if (tokens.matchOpToken(")")) {
				// empty input list
			} else {
				do {
					var inp = tokens.requireTokenType("IDENTIFIER");
					inputs.push(inp.value);
				} while (tokens.matchOpToken(","));
				tokens.requireOpToken(")");
			}
		}

		var jsBody = parser.requireElement("jsBody", tokens);
		tokens.matchToken("end");

		var func = varargConstructor(Function, inputs.concat([jsBody.jsSource]));

		var command = {
			jsSource: jsBody.jsSource,
			function: func,
			inputs: inputs,
			op: function (context) {
				var args = [];
				inputs.forEach(function (input) {
					args.push(runtime.resolveSymbol(input, context, 'default'));
				});
				var result = func.apply(globalScope, args);
				if (result && typeof result.then === "function") {
					return new Promise(function (resolve) {
						result.then(function (actualResult) {
							context.result = actualResult;
							resolve(runtime.findNext(this, context));
						});
					});
				} else {
					context.result = result;
					return runtime.findNext(this, context);
				}
			},
		};
		return command;
	});

	_parser.addCommand("async", function (parser, runtime, tokens) {
		if (!tokens.matchToken("async")) return;
		if (tokens.matchToken("do")) {
			var body = parser.requireElement("commandList", tokens);

			// Append halt
			var end = body;
			while (end.next) end = end.next;
			end.next = runtime.HALT;

			tokens.requireToken("end");
		} else {
			var body = parser.requireElement("command", tokens);
		}
		var command = {
			body: body,
			op: function (context) {
				setTimeout(function () {
					body.execute(context);
				});
				return runtime.findNext(this, context);
			},
		};
		parser.setParent(body, command);
		return command;
	});

	_parser.addCommand("tell", function (parser, runtime, tokens) {
		var startToken = tokens.currentToken();
		if (!tokens.matchToken("tell")) return;
		var value = parser.requireElement("expression", tokens);
		var body = parser.requireElement("commandList", tokens);
		if (tokens.hasMore() && !parser.featureStart(tokens.currentToken())) {
			tokens.requireToken("end");
		}
		var slot = "tell_" + startToken.start;
		var tellCmd = {
			value: value,
			body: body,
			args: [value],
			resolveNext: function (context) {
				var iterator = context.meta.iterators[slot];
				if (iterator.index < iterator.value.length) {
					context.beingTold = iterator.value[iterator.index++];
					return body;
				} else {
					// restore original me
					context.beingTold = iterator.originalBeingTold;
					if (this.next) {
						return this.next;
					} else {
						return runtime.findNext(this.parent, context);
					}
				}
			},
			op: function (context, value) {
				if (value == null) {
					value = [];
				} else if (!(Array.isArray(value) || value instanceof NodeList)) {
					value = [value];
				}
				context.meta.iterators[slot] = {
					originalBeingTold: context.beingTold,
					index: 0,
					value: value,
				};
				return this.resolveNext(context);
			},
		};
		parser.setParent(body, tellCmd);
		return tellCmd;
	});

	_parser.addCommand("wait", function (parser, runtime, tokens) {
		if (!tokens.matchToken("wait")) return;
		var command;

		// wait on event
		if (tokens.matchToken("for")) {
			tokens.matchToken("a"); // optional "a"
			var events = [];
			do {
				var lookahead = tokens.token(0);
				if (lookahead.type === 'NUMBER' || lookahead.type === 'L_PAREN') {
					events.push({
						time: parser.requireElement('expression', tokens).evaluate() // TODO: do we want to allow async here?
					})
				} else {
					events.push({
						name: _parser.requireElement("dotOrColonPath", tokens, "Expected event name").evaluate(),
						args: parseEventArgs(tokens),
					});
				}
			} while (tokens.matchToken("or"));

			if (tokens.matchToken("from")) {
				var on = parser.requireElement("expression", tokens);
			}

			// wait on event
			command = {
				event: events,
				on: on,
				args: [on],
				op: function (context, on) {
					var target = on ? on : context.me;
					if (!(target instanceof EventTarget))
						throw new Error("Not a valid event target: " + this.on.sourceFor());
					return new Promise((resolve) => {
						var resolved = false;
						for (const eventInfo of events) {
							var listener = (event) => {
								context.result = event;
								if (eventInfo.args) {
									for (const arg of eventInfo.args) {
										context[arg.value] =
											event[arg.value] || (event.detail ? event.detail[arg.value] : null);
									}
								}
								if (!resolved) {
									resolved = true;
									resolve(runtime.findNext(this, context));
								}
							};
							if (eventInfo.name){
								target.addEventListener(eventInfo.name, listener, {once: true});
							} else if (eventInfo.time != null) {
								setTimeout(listener, eventInfo.time, eventInfo.time)
							}
						}
					});
				},
			};
			return command;
		} else {
			var time;
			if (tokens.matchToken("a")) {
				tokens.requireToken("tick");
				time = 0;
			} else {
				time = _parser.requireElement("expression", tokens);
			}

			command = {
				type: "waitCmd",
				time: time,
				args: [time],
				op: function (context, timeValue) {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve(runtime.findNext(this, context));
						}, timeValue);
					});
				},
				execute: function (context) {
					return runtime.unifiedExec(this, context);
				},
			};
			return command;
		}
	});

	// TODO  - colon path needs to eventually become part of ruby-style symbols
	_parser.addGrammarElement("dotOrColonPath", function (parser, runtime, tokens) {
		var root = tokens.matchTokenType("IDENTIFIER");
		if (root) {
			var path = [root.value];

			var separator = tokens.matchOpToken(".") || tokens.matchOpToken(":");
			if (separator) {
				do {
					path.push(tokens.requireTokenType("IDENTIFIER", "NUMBER").value);
				} while (tokens.matchOpToken(separator.value));
			}

			return {
				type: "dotOrColonPath",
				path: path,
				evaluate: function () {
					return path.join(separator ? separator.value : "");
				},
			};
		}
	});


	_parser.addGrammarElement("eventName", function (parser, runtime, tokens) {
		var token;
		if ((token = tokens.matchTokenType("STRING"))) {
			return {
				evaluate: function() {
					return token.value;
				},
			};
		}

		return parser.parseElement("dotOrColonPath", tokens);
	});

	function parseSendCmd(cmdType, parser, runtime, tokens) {
		var eventName = parser.requireElement("eventName", tokens);

		var details = parser.parseElement("namedArgumentList", tokens);
		if ((cmdType === "send" && tokens.matchToken("to")) ||
			(cmdType === "trigger" && tokens.matchToken("on"))) {
			var toExpr = parser.requireElement("expression", tokens);
		} else {
			var toExpr = parser.requireElement("implicitMeTarget", tokens);
		}

		var sendCmd = {
			eventName: eventName,
			details: details,
			to: toExpr,
			args: [toExpr, eventName, details],
			op: function (context, to, eventName, details) {
				runtime.nullCheck(to, toExpr);
				runtime.forEach(to, function (target) {
					runtime.triggerEvent(target, eventName, details, context.me);
				});
				return runtime.findNext(sendCmd, context);
			},
		};
		return sendCmd;
	}

	_parser.addCommand("trigger", function (parser, runtime, tokens) {
		if (tokens.matchToken("trigger")) {
			return parseSendCmd("trigger", parser, runtime, tokens);
		}
	});

	_parser.addCommand("send", function (parser, runtime, tokens) {
		if (tokens.matchToken("send")) {
			return parseSendCmd("send", parser, runtime, tokens);
		}
	});

	var parseReturnFunction = function (parser, runtime, tokens, returnAValue) {
		if (returnAValue) {
			if (parser.commandBoundary(tokens.currentToken())) {
				parser.raiseParseError(tokens, "'return' commands must return a value.  If you do not wish to return a value, use 'exit' instead.");
			} else {
				var value = parser.requireElement("expression", tokens);
			}
		}

		var returnCmd = {
			value: value,
			args: [value],
			op: function (context, value) {
				var resolve = context.meta.resolve;
				context.meta.returned = true;
				context.meta.returnValue = value;
				if (resolve) {
					if (value) {
						resolve(value);
					} else {
						resolve();
					}
				}
				return runtime.HALT;
			},
		};
		return returnCmd;
	};

	_parser.addCommand("return", function (parser, runtime, tokens) {
		if (tokens.matchToken("return")) {
			return parseReturnFunction(parser, runtime, tokens, true);
		}
	});

	_parser.addCommand("exit", function (parser, runtime, tokens) {
		if (tokens.matchToken("exit")) {
			return parseReturnFunction(parser, runtime, tokens, false);
		}
	});

	_parser.addCommand("halt", function (parser, runtime, tokens) {
		if (tokens.matchToken("halt")) {
			if (tokens.matchToken("the")) {
				tokens.requireToken("event");
				// optional possessive
				if (tokens.matchOpToken("'")) {
					tokens.requireToken("s");
				}
				var keepExecuting = true;
			}
			if (tokens.matchToken("bubbling")) {
				var bubbling = true;
			} else if (tokens.matchToken("default")) {
				var haltDefault = true;
			}
			var exit = parseReturnFunction(parser, runtime, tokens, false);

			var haltCmd = {
				keepExecuting: true,
				bubbling: bubbling,
				haltDefault: haltDefault,
				exit: exit,
				op: function (ctx) {
					if (ctx.event) {
						if (bubbling) {
							ctx.event.stopPropagation();
						} else if (haltDefault) {
							ctx.event.preventDefault();
						} else {
							ctx.event.stopPropagation();
							ctx.event.preventDefault();
						}
						if (keepExecuting) {
							return runtime.findNext(this, ctx);
						} else {
							return exit;
						}
					}
				},
			};
			return haltCmd;
		}
	});

	_parser.addCommand("log", function (parser, runtime, tokens) {
		if (!tokens.matchToken("log")) return;
		var exprs = [parser.parseElement("expression", tokens)];
		while (tokens.matchOpToken(",")) {
			exprs.push(parser.requireElement("expression", tokens));
		}
		if (tokens.matchToken("with")) {
			var withExpr = parser.requireElement("expression", tokens);
		}
		var logCmd = {
			exprs: exprs,
			withExpr: withExpr,
			args: [withExpr, exprs],
			op: function (ctx, withExpr, values) {
				if (withExpr) {
					withExpr.apply(null, values);
				} else {
					console.log.apply(null, values);
				}
				return runtime.findNext(this, ctx);
			},
		};
		return logCmd;
	});

	_parser.addCommand("throw", function (parser, runtime, tokens) {
		if (!tokens.matchToken("throw")) return;
		var expr = parser.requireElement("expression", tokens);
		var throwCmd = {
			expr: expr,
			args: [expr],
			op: function (ctx, expr) {
				runtime.registerHyperTrace(ctx, expr);
				throw expr;
			},
		};
		return throwCmd;
	});

	var parseCallOrGet = function (parser, runtime, tokens) {
		var expr = parser.requireElement("expression", tokens);
		var callCmd = {
			expr: expr,
			args: [expr],
			op: function (context, result) {
				context.result = result;
				return runtime.findNext(callCmd, context);
			},
		};
		return callCmd;
	};
	_parser.addCommand("call", function (parser, runtime, tokens) {
		if (!tokens.matchToken("call")) return;
		var call = parseCallOrGet(parser, runtime, tokens);
		if (call.expr && call.expr.type !== "functionCall") {
			parser.raiseParseError(tokens, "Must be a function invocation");
		}
		return call;
	});
	_parser.addCommand("get", function (parser, runtime, tokens) {
		if (tokens.matchToken("get")) {
			return parseCallOrGet(parser, runtime, tokens);
		}
	});

	_parser.addCommand("make", function (parser, runtime, tokens) {
		if (!tokens.matchToken("make")) return;
		tokens.matchToken("a") || tokens.matchToken("an");

		var expr = parser.requireElement("expression", tokens);

		var args = [];
		if (expr.type !== "queryRef" && tokens.matchToken("from")) {
			do {
				args.push(parser.requireElement("expression", tokens));
			} while (tokens.matchOpToken(","));
		}

		if (tokens.matchToken("called")) {
			var name = tokens.requireTokenType("IDENTIFIER").value;
		}

		var command;
		if (expr.type === "queryRef") {
			command = {
				op: function (ctx) {
					var match,
						tagname = "div",
						id,
						classes = [];
					var re = /(?:(^|#|\.)([^#\. ]+))/g;
					while ((match = re.exec(expr.css))) {
						if (match[1] === "") tagname = match[2].trim();
						else if (match[1] === "#") id = match[2].trim();
						else classes.push(match[2].trim());
					}

					var result = document.createElement(tagname);
					if (id !== undefined) result.id = id;
					for (var i = 0; i < classes.length; i++) {
						var cls = classes[i];
						result.classList.add(cls)
					}

					ctx.result = result;
					if (name) ctx[name] = result;

					return runtime.findNext(this, ctx);
				},
			};
			return command;
		} else {
			command = {
				args: [expr, args],
				op: function (ctx, expr, args) {
					ctx.result = varargConstructor(expr, args);
					if (name) ctx[name] = ctx.result;

					return runtime.findNext(this, ctx);
				},
			};
			return command;
		}
	});

	_parser.addGrammarElement("pseudoCommand", function (parser, runtime, tokens) {

		let lookAhead = tokens.token(1);
		if (!(lookAhead && lookAhead.op && (lookAhead.value === '.' || lookAhead.value === "("))) {
			return null;
		}

		var expr = parser.requireElement("primaryExpression", tokens);

		var rootRoot = expr.root;
		var root = expr;
		while (rootRoot.root != null) {
			root = root.root;
			rootRoot = rootRoot.root;
		}

		if (expr.type !== "functionCall") {
			parser.raiseParseError(tokens, "Pseudo-commands must be function calls");
		}

		if (root.type === "functionCall" && root.root.root == null) {
			if (tokens.matchAnyToken("the", "to", "on", "with", "into", "from", "at")) {
				var realRoot = parser.requireElement("expression", tokens);
			} else if (tokens.matchToken("me")) {
				var realRoot = parser.requireElement("implicitMeTarget", tokens);
			}
		}

		/** @type {GrammarElement} */

		if(realRoot){
			var pseudoCommand = {
				type: "pseudoCommand",
				root: realRoot,
				argExressions: root.argExressions,
				args: [realRoot, root.argExressions],
				op: function (context, rootRoot, args) {
					runtime.nullCheck(rootRoot, realRoot);
					var func = rootRoot[root.root.name];
					runtime.nullCheck(func, root);
					if (func.hyperfunc) {
						args.push(context);
					}
					context.result = func.apply(rootRoot, args);
					return runtime.findNext(pseudoCommand, context);
				},
				execute: function (context) {
					return runtime.unifiedExec(this, context);
				},
			}
		} else {
			var pseudoCommand = {
				type: "pseudoCommand",
				expr: expr,
				args: [expr],
				op: function (context, result) {
					context.result = result;
					return runtime.findNext(pseudoCommand, context);
				},
				execute: function (context) {
					return runtime.unifiedExec(this, context);
				},
			};
		}

		return pseudoCommand;
	});

	/**
	* @param {ParserObject} parser
	* @param {RuntimeObject} runtime
	* @param {TokensObject} tokens
	* @param {*} target
	* @param {*} value
	* @returns
	*/
	var makeSetter = function (parser, runtime, tokens, target, value) {

		var symbolWrite = target.type === "symbol";
		var attributeWrite = target.type === "attributeRef";
		var styleWrite = target.type === "styleRef";

		if (!(attributeWrite || styleWrite || symbolWrite) && target.root == null) {
			parser.raiseParseError(tokens, "Can only put directly into symbols, not references");
		}

		var rootElt = null;
		var prop = null;
		if (symbolWrite) {
			// rootElt is null
		} else if (attributeWrite || styleWrite) {
			rootElt = parser.requireElement("implicitMeTarget", tokens);
			var attribute = target;
		} else {
			prop = target.prop ? target.prop.value : null;
			var attribute = target.attribute;
			rootElt = target.root;
		}

		/** @type {GrammarElement} */
		var setCmd = {
			target: target,
			symbolWrite: symbolWrite,
			value: value,
			args: [rootElt, value],
			op: function (context, root, valueToSet) {
				if (symbolWrite) {
					runtime.setSymbol(target.name, context, target.scope, valueToSet);
				} else {
					runtime.nullCheck(root, rootElt);
					runtime.implicitLoop(root, function (elt) {
						if (attribute) {
							if (attribute.type === "attributeRef") {
								if (valueToSet == null) {
									elt.removeAttribute(attribute.name);
								} else {
									elt.setAttribute(attribute.name, valueToSet);
								}
							} else {
								elt.style[attribute.name] = valueToSet;
							}
						} else {
							elt[prop] = valueToSet;
						}
					});
				}
				return runtime.findNext(this, context);
			},
		};
		return setCmd;
	};

	_parser.addCommand("default", function (parser, runtime, tokens) {
		if (!tokens.matchToken("default")) return;
		var target = parser.requireElement("assignableExpression", tokens);
		tokens.requireToken("to");

		var value = parser.requireElement("expression", tokens);

		/** @type {GrammarElement} */
		var setter = makeSetter(parser, runtime, tokens, target, value);
		var defaultCmd = {
			target: target,
			value: value,
			setter: setter,
			args: [target],
			op: function (context, target) {
				if (target) {
					return runtime.findNext(this, context);
				} else {
					return setter;
				}
			},
		};
		setter.parent = defaultCmd;
		return defaultCmd;
	});

	_parser.addCommand("set", function (parser, runtime, tokens) {
		if (!tokens.matchToken("set")) return;
		if (tokens.currentToken().type === "L_BRACE") {
			var obj = parser.requireElement("objectLiteral", tokens);
			tokens.requireToken("on");
			var target = parser.requireElement("expression", tokens);

			var command = {
				objectLiteral: obj,
				target: target,
				args: [obj, target],
				op: function (ctx, obj, target) {
					mergeObjects(target, obj);
					return runtime.findNext(this, ctx);
				},
			};
			return command;
		}

		try {
			tokens.pushFollow("to");
			var target = parser.requireElement("assignableExpression", tokens);
		} finally {
			tokens.popFollow();
		}
		tokens.requireToken("to");
		var value = parser.requireElement("expression", tokens);
		return makeSetter(parser, runtime, tokens, target, value);
	});

	_parser.addCommand("if", function (parser, runtime, tokens) {
		if (!tokens.matchToken("if")) return;
		var expr = parser.requireElement("expression", tokens);
		tokens.matchToken("then"); // optional 'then'
		var trueBranch = parser.parseElement("commandList", tokens);
		if (tokens.matchToken("else") || tokens.matchToken("otherwise")) {
			var falseBranch = parser.parseElement("commandList", tokens);
		}
		if (tokens.hasMore()) {
			tokens.requireToken("end");
		}

		/** @type {GrammarElement} */
		var ifCmd = {
			expr: expr,
			trueBranch: trueBranch,
			falseBranch: falseBranch,
			args: [expr],
			op: function (context, exprValue) {
				if (exprValue) {
					return trueBranch;
				} else if (falseBranch) {
					return falseBranch;
				} else {
					return runtime.findNext(this, context);
				}
			},
		};
		parser.setParent(trueBranch, ifCmd);
		parser.setParent(falseBranch, ifCmd);
		return ifCmd;
	});

	var parseRepeatExpression = function (parser, tokens, runtime, startedWithForToken) {
		var innerStartToken = tokens.currentToken();
		var identifier;
		if (tokens.matchToken("for") || startedWithForToken) {
			var identifierToken = tokens.requireTokenType("IDENTIFIER");
			identifier = identifierToken.value;
			tokens.requireToken("in");
			var expression = parser.requireElement("expression", tokens);
		} else if (tokens.matchToken("in")) {
			identifier = "it";
			var expression = parser.requireElement("expression", tokens);
		} else if (tokens.matchToken("while")) {
			var whileExpr = parser.requireElement("expression", tokens);
		} else if (tokens.matchToken("until")) {
			var isUntil = true;
			if (tokens.matchToken("event")) {
				var evt = _parser.requireElement("dotOrColonPath", tokens, "Expected event name");
				if (tokens.matchToken("from")) {
					var on = parser.requireElement("expression", tokens);
				}
			} else {
				var whileExpr = parser.requireElement("expression", tokens);
			}
		} else {
			if (!parser.commandBoundary(tokens.currentToken()) &&
			    tokens.currentToken().value !== 'forever') {
				var times = parser.requireElement("expression", tokens);
				tokens.requireToken("times");
			} else {
				tokens.matchToken("forever"); // consume optional forever
				var forever = true;
			}
		}

		if (tokens.matchToken("index")) {
			var identifierToken = tokens.requireTokenType("IDENTIFIER");
			var indexIdentifier = identifierToken.value;
		}

		var loop = parser.parseElement("commandList", tokens);
		if (loop && evt) {
			// if this is an event based loop, wait a tick at the end of the loop so that
			// events have a chance to trigger in the loop condition o_O)))
			var last = loop;
			while (last.next) {
				last = last.next;
			}
			var waitATick = {
				type: "waitATick",
				op: function () {
					return new Promise(function (resolve) {
						setTimeout(function () {
							resolve(runtime.findNext(waitATick));
						}, 0);
					});
				},
			};
			last.next = waitATick;
		}
		if (tokens.hasMore()) {
			tokens.requireToken("end");
		}

		if (identifier == null) {
			identifier = "_implicit_repeat_" + innerStartToken.start;
			var slot = identifier;
		} else {
			var slot = identifier + "_" + innerStartToken.start;
		}

		var repeatCmd = {
			identifier: identifier,
			indexIdentifier: indexIdentifier,
			slot: slot,
			expression: expression,
			forever: forever,
			times: times,
			until: isUntil,
			event: evt,
			on: on,
			whileExpr: whileExpr,
			resolveNext: function () {
				return this;
			},
			loop: loop,
			args: [whileExpr, times],
			op: function (context, whileValue, times) {
				var iteratorInfo = context.meta.iterators[slot];
				var keepLooping = false;
				var loopVal = null;
				if (this.forever) {
					keepLooping = true;
				} else if (this.until) {
					if (evt) {
						keepLooping = context.meta.iterators[slot].eventFired === false;
					} else {
						keepLooping = whileValue !== true;
					}
				} else if (whileExpr) {
					keepLooping = whileValue;
				} else if (times) {
					keepLooping = iteratorInfo.index < times;
				} else {
					var nextValFromIterator = iteratorInfo.iterator.next();
					keepLooping = !nextValFromIterator.done;
					loopVal = nextValFromIterator.value;
				}

				if (keepLooping) {
					if (iteratorInfo.value) {
						context.result = context[identifier] = loopVal;
					} else {
						context.result = iteratorInfo.index;
					}
					if (indexIdentifier) {
						context[indexIdentifier] = iteratorInfo.index;
					}
					iteratorInfo.index++;
					return loop;
				} else {
					context.meta.iterators[slot] = null;
					return runtime.findNext(this.parent, context);
				}
			},
		};
		parser.setParent(loop, repeatCmd);
		var repeatInit = {
			name: "repeatInit",
			args: [expression, evt, on],
			op: function (context, value, event, on) {
				var iteratorInfo = {
					index: 0,
					value: value,
					eventFired: false,
				};
				context.meta.iterators[slot] = iteratorInfo;
				if (value && value[Symbol.iterator]) {
					iteratorInfo.iterator = value[Symbol.iterator]();
				}
				if (evt) {
					var target = on || context.me;
					target.addEventListener(
						event,
						function (e) {
							context.meta.iterators[slot].eventFired = true;
						},
						{ once: true }
					);
				}
				return repeatCmd; // continue to loop
			},
			execute: function (context) {
				return runtime.unifiedExec(this, context);
			},
		};
		parser.setParent(repeatCmd, repeatInit);
		return repeatInit;
	};

	_parser.addCommand("repeat", function (parser, runtime, tokens) {
		if (tokens.matchToken("repeat")) {
			return parseRepeatExpression(parser, tokens, runtime, false);
		}
	});

	_parser.addCommand("for", function (parser, runtime, tokens) {
		if (tokens.matchToken("for")) {
			return parseRepeatExpression(parser, tokens, runtime, true);
		}
	});

  _parser.addCommand("continue", function (parser, runtime, tokens) {

    if (!tokens.matchToken("continue")) return;

    var command = {
      op: function (context) {

        // scan for the closest repeat statement
        for (var parent = this.parent ; true ; parent = parent.parent) {

          if (parent == undefined) {
            parser.raiseParseError(tokens, "Command `continue` cannot be used outside of a `repeat` loop.")
          }
          if (parent.loop != undefined) {
            return parent.resolveNext(context)
          }
        }
      }
    };
    return command;
  });

  _parser.addCommand("break", function (parser, runtime, tokens) {

    if (!tokens.matchToken("break")) return;

    var command = {
      op: function (context) {

        // scan for the closest repeat statement
        for (var parent = this.parent ; true ; parent = parent.parent) {

          if (parent == undefined) {
            parser.raiseParseError(tokens, "Command `continue` cannot be used outside of a `repeat` loop.")
          }
          if (parent.loop != undefined) {
			  console.log(parent);
			  return runtime.findNext(parent.parent, context);
          }
        }
      }
    };
    return command;
  });

	_parser.addGrammarElement("stringLike", function (parser, runtime, tokens) {
		return _parser.parseAnyOf(["string", "nakedString"], tokens);
	});

	_parser.addCommand("append", function (parser, runtime, tokens) {
		if (!tokens.matchToken("append")) return;
		var targetExpr = null;

		var value = parser.requireElement("expression", tokens);

		var implicitResultSymbol = {
			type: "symbol",
			evaluate: function (context) {
				return runtime.resolveSymbol("result", context);
			},
		};

		if (tokens.matchToken("to")) {
			targetExpr = parser.requireElement("expression", tokens);
		} else {
			targetExpr = implicitResultSymbol;
		}

		var setter = null;
		if (targetExpr.type === "symbol" || targetExpr.type === "attributeRef" || targetExpr.root != null) {
			setter = makeSetter(parser, runtime, tokens, targetExpr, implicitResultSymbol);
		}

		var command = {
			value: value,
			target: targetExpr,
			args: [targetExpr, value],
			op: function (context, target, value) {
				if (Array.isArray(target)) {
					target.push(value);
					return runtime.findNext(this, context);
				} else if (target instanceof Element) {
					target.innerHTML += value;
					return runtime.findNext(this, context);
				} else if(setter) {
					context.result = (target || "") + value;
					return setter;
				} else {
					throw Error("Unable to append a value!")
				}
			},
			execute: function (context) {
				return runtime.unifiedExec(this, context/*, value, target*/);
			},
		};

		if (setter != null) {
			setter.parent = command;
		}

		return command;
	});

	_parser.addCommand("increment", function (parser, runtime, tokens) {
		if (!tokens.matchToken("increment")) return;
		var amount;

		// This is optional.  Defaults to "result"
		var target = parser.parseElement("assignableExpression", tokens);

		// This is optional. Defaults to 1.
		if (tokens.matchToken("by")) {
			amount = parser.requireElement("expression", tokens);
		}

		var implicitIncrementOp = {
			type: "implicitIncrementOp",
			target: target,
			args: [target, amount],
			op: function (context, targetValue, amount) {
				targetValue = targetValue ? parseFloat(targetValue) : 0;
				amount = amount ? parseFloat(amount) : 1;
				var newValue = targetValue + amount;
				context.result = newValue;
				return newValue;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			}
		};

		return makeSetter(parser, runtime, tokens, target, implicitIncrementOp);
	});

	_parser.addCommand("decrement", function (parser, runtime, tokens) {
		if (!tokens.matchToken("decrement")) return;
		var amount;

		// This is optional.  Defaults to "result"
		var target = parser.parseElement("assignableExpression", tokens);

		// This is optional. Defaults to 1.
		if (tokens.matchToken("by")) {
			amount = parser.requireElement("expression", tokens);
		}

		var implicitDecrementOp = {
			type: "implicitDecrementOp",
			target: target,
			args: [target, amount],
			op: function (context, targetValue, amount) {
				targetValue = targetValue ? parseFloat(targetValue) : 0;
				amount = amount ? parseFloat(amount) : 1;
				var newValue = targetValue - amount;
				context.result = newValue;
				return newValue;
			},
			evaluate: function (context) {
				return runtime.unifiedEval(this, context);
			}
		};

		return makeSetter(parser, runtime, tokens, target, implicitDecrementOp);
	});

	function parseConversionInfo(tokens, parser) {
		var type = "text";
		var conversion;
		tokens.matchToken("a") || tokens.matchToken("an");
		if (tokens.matchToken("json") || tokens.matchToken("Object")) {
			type = "json";
		} else if (tokens.matchToken("response")) {
			type = "response";
		} else if (tokens.matchToken("html")) {
			type = "html";
		} else if (tokens.matchToken("text")) {
			// default, ignore
		} else {
			conversion = parser.requireElement("dotOrColonPath", tokens).evaluate();
		}
		return {type, conversion};
	}

	_parser.addCommand("fetch", function (parser, runtime, tokens) {
		if (!tokens.matchToken("fetch")) return;
		var url = parser.requireElement("stringLike", tokens);

		if (tokens.matchToken("as")) {
			var conversionInfo = parseConversionInfo(tokens, parser);
		}

		if (tokens.matchToken("with") && tokens.currentToken().value !== "{") {
			var args = parser.parseElement("nakedNamedArgumentList", tokens);
		} else {
			var args = parser.parseElement("objectLiteral", tokens);
		}

		if (conversionInfo == null && tokens.matchToken("as")) {
			conversionInfo = parseConversionInfo(tokens, parser);
		}

		var type = conversionInfo ? conversionInfo.type : "text";
		var conversion = conversionInfo ? conversionInfo.conversion : null

		/** @type {GrammarElement} */
		var fetchCmd = {
			url: url,
			argExpressions: args,
			args: [url, args],
			op: function (context, url, args) {
				var detail = args || {};
				detail["sender"] = context.me;
				detail["headers"] = detail["headers"] || {}
				var abortController = new AbortController();
				let abortListener = context.me.addEventListener('fetch:abort', function(){
					abortController.abort();
				}, {once: true});
				detail['signal'] = abortController.signal;
				runtime.triggerEvent(context.me, "hyperscript:beforeFetch", detail);
				runtime.triggerEvent(context.me, "fetch:beforeRequest", detail);
				args = detail;
				var finished = false;
				if (args.timeout) {
					setTimeout(function () {
						if (!finished) {
							abortController.abort();
						}
					}, args.timeout);
				}
				return fetch(url, args)
					.then(function (resp) {
						let resultDetails = {response:resp};
						runtime.triggerEvent(context.me, "fetch:afterResponse", resultDetails);
						resp = resultDetails.response;

						if (type === "response") {
							context.result = resp;
							runtime.triggerEvent(context.me, "fetch:afterRequest", {result:resp});
							finished = true;
							return runtime.findNext(fetchCmd, context);
						}
						if (type === "json") {
							return resp.json().then(function (result) {
								context.result = result;
								runtime.triggerEvent(context.me, "fetch:afterRequest", {result});
								finished = true;
								return runtime.findNext(fetchCmd, context);
							});
						}
						return resp.text().then(function (result) {
							if (conversion) result = runtime.convertValue(result, conversion);

							if (type === "html") result = runtime.convertValue(result, "Fragment");

							context.result = result;
							runtime.triggerEvent(context.me, "fetch:afterRequest", {result});
							finished = true;
							return runtime.findNext(fetchCmd, context);
						});
					})
					.catch(function (reason) {
						runtime.triggerEvent(context.me, "fetch:error", {
							reason: reason,
						});
						throw reason;
					}).finally(function(){
						context.me.removeEventListener('fetch:abort', abortListener);
					});
			},
		};
		return fetchCmd;
	});
}

//====================================================================
// Initialization
//====================================================================
function ready(fn) {
	if (document.readyState !== "loading") {
		setTimeout(fn);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

function getMetaConfig() {
	/** @type {HTMLMetaElement} */
	var element = document.querySelector('meta[name="htmx-config"]');
	if (element) {
		return parseJSON(element.content);
	} else {
		return null;
	}
}

function mergeMetaConfig() {
	var metaConfig = getMetaConfig();
	if (metaConfig) {
		_hyperscript.config = mergeObjects(_hyperscript.config, metaConfig);
	}
}

if ("document" in globalScope) {
	/** @type {HTMLScriptElement[]} */
	var scripts = Array.from(document.querySelectorAll("script[type='text/hyperscript'][src]"))
	Promise.all(
		scripts.map(function (script) {
			return fetch(script.src)
				.then(function (res) {
					return res.text();
				})
				.then(function (code) {
					return _runtime.evaluate(code);
				});
		})
	).then(function () {
		ready(function () {
			mergeMetaConfig();
			_runtime.processNode(document.documentElement);
			document.addEventListener("htmx:load", function (/** @type {CustomEvent} */ evt) {
				_runtime.processNode(evt.detail.elt);
			});
		});
	});
}

//====================================================================
// API
//====================================================================
/** @type {HyperscriptObject} */
export default _hyperscript = mergeObjects(
	function (str, ctx) {
		return _runtime.evaluate(str, ctx); //OK
	},
	{
		internals: {
			lexer: _lexer,
			parser: _parser,
			runtime: _runtime,
		},
		ElementCollection: ElementCollection,
		addFeature: function (keyword, definition) {
			_parser.addFeature(keyword, definition);
		},
		addCommand: function (keyword, definition) {
			_parser.addCommand(keyword, definition);
		},
		addLeafExpression: function (name, definition) {
			_parser.addLeafExpression(name, definition);
		},
		addIndirectExpression: function (name, definition) {
			_parser.addIndirectExpression(name, definition);
		},
		evaluate: _runtime.evaluate.bind(_runtime),
		parse: _runtime.parse.bind(_runtime),
		processNode: _runtime.processNode.bind(_runtime),
		config: {
			attributes: "_, script, data-script",
			defaultTransition: "all 500ms ease-in",
			disableSelector: "[disable-scripting], [data-disable-scripting]",
			conversions: CONVERSIONS,
		},
	}
);
