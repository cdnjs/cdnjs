;(function () {
'use strict';

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (exports) {
	'use strict';

	/**
  * Convert set of options into objects including all the defaults
  */

	function normalize(opts) {
		opts = opts || {};
		var newLine = opts.newLine || false; // deprecated
		var ignoreTags = opts.ignoreTags || [];

		// Make all tags names upper case
		for (var i = 0; i < ignoreTags.length; i++) {
			ignoreTags[i] = ignoreTags[i].toUpperCase();
		}

		return {
			attributes: opts.linkAttributes || null,
			defaultProtocol: opts.defaultProtocol || 'http',
			events: opts.events || null,
			format: opts.format || noop,
			validate: opts.validate || yes,
			formatHref: opts.formatHref || noop,
			newLine: opts.newLine || false, // deprecated
			nl2br: !!newLine || opts.nl2br || false,
			tagName: opts.tagName || 'a',
			target: opts.target || typeToTarget,
			linkClass: opts.linkClass || 'linkified',
			ignoreTags: ignoreTags
		};
	}

	/**
  * Resolve an option's value based on the value of the option and the given
  * params
  */
	function resolve(value) {
		for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			params[_key - 1] = arguments[_key];
		}

		return typeof value === 'function' ? value.apply(undefined, params) : value;
	}

	/**
  * Quick indexOf replacement for checking the ignoreTags option
  */
	function contains(arr, value) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == value) {
				return true;
			}
		}
		return false;
	}

	function noop(val) {
		return val;
	}

	function yes(val) {
		return true;
	}

	function typeToTarget(href, type) {
		return type === 'url' ? '_blank' : null;
	}

	var options = Object.freeze({
		normalize: normalize,
		resolve: resolve,
		contains: contains
	});

	/******************************************************************************
 	Text Tokens
 	Tokens composed of strings
 ******************************************************************************/

	/**
 	Abstract class used for manufacturing text tokens.
 	Pass in the value this token represents
 		@class TextToken
 	@abstract
 */

	var TextToken = function () {
		/**
  	@method constructor
  	@param {String} value The string of characters representing this particular Token
  */

		function TextToken(value) {
			_classCallCheck(this, TextToken);

			this.v = value;
		}

		/**
  	String representing the type for this token
  	@property type
  	@default 'TOKEN'
  */

		TextToken.prototype.toString = function toString() {
			return this.v + '';
		};

		return TextToken;
	}();

	/**
 	A valid domain token
 	@class DOMAIN
 	@extends TextToken
 */


	var DOMAIN = function (_TextToken) {
		_inherits(DOMAIN, _TextToken);

		function DOMAIN() {
			_classCallCheck(this, DOMAIN);

			return _possibleConstructorReturn(this, _TextToken.apply(this, arguments));
		}

		return DOMAIN;
	}(TextToken);

	/**
 	@class AT
 	@extends TextToken
 */


	var AT = function (_TextToken2) {
		_inherits(AT, _TextToken2);

		function AT() {
			_classCallCheck(this, AT);

			return _possibleConstructorReturn(this, _TextToken2.call(this, '@'));
		}

		return AT;
	}(TextToken);

	/**
 	Represents a single colon `:` character
 		@class COLON
 	@extends TextToken
 */


	var COLON$1 = function (_TextToken3) {
		_inherits(COLON$1, _TextToken3);

		function COLON$1() {
			_classCallCheck(this, COLON$1);

			return _possibleConstructorReturn(this, _TextToken3.call(this, ':'));
		}

		return COLON$1;
	}(TextToken);

	/**
 	@class DOT
 	@extends TextToken
 */


	var DOT = function (_TextToken4) {
		_inherits(DOT, _TextToken4);

		function DOT() {
			_classCallCheck(this, DOT);

			return _possibleConstructorReturn(this, _TextToken4.call(this, '.'));
		}

		return DOT;
	}(TextToken);

	/**
 	A character class that can surround the URL, but which the URL cannot begin
 	or end with. Does not include certain English punctuation like parentheses.
 		@class PUNCTUATION
 	@extends TextToken
 */


	var PUNCTUATION = function (_TextToken5) {
		_inherits(PUNCTUATION, _TextToken5);

		function PUNCTUATION() {
			_classCallCheck(this, PUNCTUATION);

			return _possibleConstructorReturn(this, _TextToken5.apply(this, arguments));
		}

		return PUNCTUATION;
	}(TextToken);

	/**
 	The word localhost (by itself)
 	@class LOCALHOST
 	@extends TextToken
 */


	var LOCALHOST = function (_TextToken6) {
		_inherits(LOCALHOST, _TextToken6);

		function LOCALHOST() {
			_classCallCheck(this, LOCALHOST);

			return _possibleConstructorReturn(this, _TextToken6.apply(this, arguments));
		}

		return LOCALHOST;
	}(TextToken);

	/**
 	Newline token
 	@class TNL
 	@extends TextToken
 */


	var TNL = function (_TextToken7) {
		_inherits(TNL, _TextToken7);

		function TNL() {
			_classCallCheck(this, TNL);

			return _possibleConstructorReturn(this, _TextToken7.call(this, '\n'));
		}

		return TNL;
	}(TextToken);

	/**
 	@class NUM
 	@extends TextToken
 */


	var NUM = function (_TextToken8) {
		_inherits(NUM, _TextToken8);

		function NUM() {
			_classCallCheck(this, NUM);

			return _possibleConstructorReturn(this, _TextToken8.apply(this, arguments));
		}

		return NUM;
	}(TextToken);

	/**
 	@class PLUS
 	@extends TextToken
 */


	var PLUS = function (_TextToken9) {
		_inherits(PLUS, _TextToken9);

		function PLUS() {
			_classCallCheck(this, PLUS);

			return _possibleConstructorReturn(this, _TextToken9.call(this, '+'));
		}

		return PLUS;
	}(TextToken);

	/**
 	@class POUND
 	@extends TextToken
 */


	var POUND = function (_TextToken10) {
		_inherits(POUND, _TextToken10);

		function POUND() {
			_classCallCheck(this, POUND);

			return _possibleConstructorReturn(this, _TextToken10.call(this, '#'));
		}

		return POUND;
	}(TextToken);

	/**
 	Represents a web URL protocol. Supported types include
 		* `http:`
 	* `https:`
 	* `ftp:`
 	* `ftps:`
 	* There's Another super weird one
 		@class PROTOCOL
 	@extends TextToken
 */


	var PROTOCOL = function (_TextToken11) {
		_inherits(PROTOCOL, _TextToken11);

		function PROTOCOL() {
			_classCallCheck(this, PROTOCOL);

			return _possibleConstructorReturn(this, _TextToken11.apply(this, arguments));
		}

		return PROTOCOL;
	}(TextToken);

	/**
 	@class QUERY
 	@extends TextToken
 */


	var QUERY = function (_TextToken12) {
		_inherits(QUERY, _TextToken12);

		function QUERY() {
			_classCallCheck(this, QUERY);

			return _possibleConstructorReturn(this, _TextToken12.call(this, '?'));
		}

		return QUERY;
	}(TextToken);

	/**
 	@class SLASH
 	@extends TextToken
 */


	var SLASH = function (_TextToken13) {
		_inherits(SLASH, _TextToken13);

		function SLASH() {
			_classCallCheck(this, SLASH);

			return _possibleConstructorReturn(this, _TextToken13.call(this, '/'));
		}

		return SLASH;
	}(TextToken);

	/**
 	One ore more non-whitespace symbol.
 	@class SYM
 	@extends TextToken
 */


	var SYM = function (_TextToken14) {
		_inherits(SYM, _TextToken14);

		function SYM() {
			_classCallCheck(this, SYM);

			return _possibleConstructorReturn(this, _TextToken14.apply(this, arguments));
		}

		return SYM;
	}(TextToken);

	/**
 	@class TLD
 	@extends TextToken
 */


	var TLD = function (_TextToken15) {
		_inherits(TLD, _TextToken15);

		function TLD() {
			_classCallCheck(this, TLD);

			return _possibleConstructorReturn(this, _TextToken15.apply(this, arguments));
		}

		return TLD;
	}(TextToken);

	/**
 	Represents a string of consecutive whitespace characters
 		@class WS
 	@extends TextToken
 */


	var WS = function (_TextToken16) {
		_inherits(WS, _TextToken16);

		function WS() {
			_classCallCheck(this, WS);

			return _possibleConstructorReturn(this, _TextToken16.apply(this, arguments));
		}

		return WS;
	}(TextToken);

	/**
 	Opening/closing bracket classes
 */

	var OPENBRACE = function (_TextToken17) {
		_inherits(OPENBRACE, _TextToken17);

		function OPENBRACE() {
			_classCallCheck(this, OPENBRACE);

			return _possibleConstructorReturn(this, _TextToken17.call(this, '{'));
		}

		return OPENBRACE;
	}(TextToken);

	var OPENBRACKET = function (_TextToken18) {
		_inherits(OPENBRACKET, _TextToken18);

		function OPENBRACKET() {
			_classCallCheck(this, OPENBRACKET);

			return _possibleConstructorReturn(this, _TextToken18.call(this, '['));
		}

		return OPENBRACKET;
	}(TextToken);

	var OPENPAREN = function (_TextToken19) {
		_inherits(OPENPAREN, _TextToken19);

		function OPENPAREN() {
			_classCallCheck(this, OPENPAREN);

			return _possibleConstructorReturn(this, _TextToken19.call(this, '('));
		}

		return OPENPAREN;
	}(TextToken);

	var CLOSEBRACE = function (_TextToken20) {
		_inherits(CLOSEBRACE, _TextToken20);

		function CLOSEBRACE() {
			_classCallCheck(this, CLOSEBRACE);

			return _possibleConstructorReturn(this, _TextToken20.call(this, '}'));
		}

		return CLOSEBRACE;
	}(TextToken);

	var CLOSEBRACKET = function (_TextToken21) {
		_inherits(CLOSEBRACKET, _TextToken21);

		function CLOSEBRACKET() {
			_classCallCheck(this, CLOSEBRACKET);

			return _possibleConstructorReturn(this, _TextToken21.call(this, ']'));
		}

		return CLOSEBRACKET;
	}(TextToken);

	var CLOSEPAREN = function (_TextToken22) {
		_inherits(CLOSEPAREN, _TextToken22);

		function CLOSEPAREN() {
			_classCallCheck(this, CLOSEPAREN);

			return _possibleConstructorReturn(this, _TextToken22.call(this, ')'));
		}

		return CLOSEPAREN;
	}(TextToken);

	var TEXT_TOKENS = {
		Base: TextToken,
		DOMAIN: DOMAIN,
		AT: AT,
		COLON: COLON$1,
		DOT: DOT,
		PUNCTUATION: PUNCTUATION,
		LOCALHOST: LOCALHOST,
		NL: TNL,
		NUM: NUM,
		PLUS: PLUS,
		POUND: POUND,
		QUERY: QUERY,
		PROTOCOL: PROTOCOL,
		SLASH: SLASH,
		SYM: SYM,
		TLD: TLD,
		WS: WS,
		OPENBRACE: OPENBRACE,
		OPENBRACKET: OPENBRACKET,
		OPENPAREN: OPENPAREN,
		CLOSEBRACE: CLOSEBRACE,
		CLOSEBRACKET: CLOSEBRACKET,
		CLOSEPAREN: CLOSEPAREN
	};

	/******************************************************************************
 	Multi-Tokens
 	Tokens composed of arrays of TextTokens
 ******************************************************************************/

	// Is the given token a valid domain token?
	// Should nums be included here?
	function isDomainToken(token) {
		return token instanceof DOMAIN || token instanceof TLD;
	}

	/**
 	Abstract class used for manufacturing tokens of text tokens. That is rather
 	than the value for a token being a small string of text, it's value an array
 	of text tokens.
 		Used for grouping together URLs, emails, hashtags, and other potential
 	creations.
 		@class MultiToken
 	@abstract
 */

	var MultiToken = function () {
		/**
  	@method constructor
  	@param {Array} value The array of `TextToken`s representing this
  	particular MultiToken
  */

		function MultiToken(value) {
			_classCallCheck(this, MultiToken);

			this.v = value;

			/**
   	String representing the type for this token
   	@property type
   	@default 'TOKEN'
   */
			this.type = 'token';

			/**
   	Is this multitoken a link?
   	@property isLink
   	@default false
   */
			this.isLink = false;
		}

		/**
  	Return the string this token represents.
  	@method toString
  	@return {String}
  */


		MultiToken.prototype.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.v.length; i++) {
				result.push(this.v[i].toString());
			}
			return result.join('');
		};

		/**
  	What should the value for this token be in the `href` HTML attribute?
  	Returns the `.toString` value by default.
  		@method toHref
  	@return {String}
  */


		MultiToken.prototype.toHref = function toHref() {
			return this.toString();
		};

		/**
  	Returns a hash of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {String} [protocol] `'http'` by default
  	@return {Object}
  */


		MultiToken.prototype.toObject = function toObject() {
			var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];

			return {
				type: this.type,
				value: this.toString(),
				href: this.toHref(protocol)
			};
		};

		return MultiToken;
	}();

	/**
 	Represents a list of tokens making up a valid email address
 	@class EMAIL
 	@extends MultiToken
 */


	var EMAIL = function (_MultiToken) {
		_inherits(EMAIL, _MultiToken);

		function EMAIL(value) {
			_classCallCheck(this, EMAIL);

			var _this23 = _possibleConstructorReturn(this, _MultiToken.call(this, value));

			_this23.type = 'email';
			_this23.isLink = true;
			return _this23;
		}

		EMAIL.prototype.toHref = function toHref() {
			return 'mailto:' + this.toString();
		};

		return EMAIL;
	}(MultiToken);

	/**
 	Represents some plain text
 	@class TEXT
 	@extends MultiToken
 */


	var TEXT = function (_MultiToken2) {
		_inherits(TEXT, _MultiToken2);

		function TEXT(value) {
			_classCallCheck(this, TEXT);

			var _this24 = _possibleConstructorReturn(this, _MultiToken2.call(this, value));

			_this24.type = 'text';
			return _this24;
		}

		return TEXT;
	}(MultiToken);

	/**
 	Multi-linebreak token - represents a line break
 	@class MNL
 	@extends MultiToken
 */


	var MNL = function (_MultiToken3) {
		_inherits(MNL, _MultiToken3);

		function MNL(value) {
			_classCallCheck(this, MNL);

			var _this25 = _possibleConstructorReturn(this, _MultiToken3.call(this, value));

			_this25.type = 'nl';
			return _this25;
		}

		return MNL;
	}(MultiToken);

	/**
 	Represents a list of tokens making up a valid URL
 	@class URL
 	@extends MultiToken
 */


	var URL = function (_MultiToken4) {
		_inherits(URL, _MultiToken4);

		function URL(value) {
			_classCallCheck(this, URL);

			var _this26 = _possibleConstructorReturn(this, _MultiToken4.call(this, value));

			_this26.type = 'url';
			_this26.isLink = true;
			return _this26;
		}

		/**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@method href
  	@param {String} protocol
  	@return {String}
  */


		URL.prototype.toHref = function toHref() {
			var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];

			var hasProtocol = false,
			    hasSlashSlash = false,
			    tokens = this.v,
			    result = [],
			    i = 0;

			// Make the first part of the domain lowercase
			// Lowercase protocol
			while (tokens[i] instanceof PROTOCOL) {
				hasProtocol = true;
				result.push(tokens[i].toString().toLowerCase());
				i++;
			}

			// Skip slash-slash
			while (tokens[i] instanceof SLASH) {
				hasSlashSlash = true;
				result.push(tokens[i].toString());
				i++;
			}

			// Lowercase all other characters in the domain
			while (isDomainToken(tokens[i])) {
				result.push(tokens[i].toString().toLowerCase());
				i++;
			}

			// Leave all other characters as they were written
			for (; i < tokens.length; i++) {
				result.push(tokens[i].toString());
			}

			result = result.join('');

			if (!(hasProtocol || hasSlashSlash)) {
				result = protocol + '://' + result;
			}

			return result;
		};

		URL.prototype.hasProtocol = function hasProtocol() {
			return this.v[0] instanceof PROTOCOL;
		};

		return URL;
	}(MultiToken);

	var MULTI_TOKENS = {
		Base: MultiToken,
		EMAIL: EMAIL,
		NL: MNL,
		TEXT: TEXT,
		URL: URL
	};

	/**
 	A simple state machine that can emit token classes
 		The `j` property in this class refers to state jumps. It's a
 	multidimensional array where for each element:
 		* index [0] is a symbol or class of symbols to transition to.
 	* index [1] is a State instance which matches
 		The type of symbol will depend on the target implementation for this class.
 	In Linkify, we have a two-stage scanner. Each stage uses this state machine
 	but with a slighly different (polymorphic) implementation.
 		The `T` property refers to the token class.
 		TODO: Can the `on` and `next` methods be combined?
 		@class BaseState
 */

	var BaseState = function () {

		/**
  	@method constructor
  	@param {Class} tClass Pass in the kind of token to emit if there are
  		no jumps after this state and the state is accepting.
  */

		function BaseState(tClass) {
			_classCallCheck(this, BaseState);

			this.j = [];
			this.T = tClass || null;
		}

		/**
  	On the given symbol(s), this machine should go to the given state
  		@method on
  	@param {Array|Mixed} symbol
  	@param {BaseState} state Note that the type of this state should be the
  		same as the current instance (i.e., don't pass in a different
  		subclass)
  */


		BaseState.prototype.on = function on(symbol, state) {
			if (symbol instanceof Array) {
				for (var i = 0; i < symbol.length; i++) {
					this.j.push([symbol[i], state]);
				}
				return this;
			}
			this.j.push([symbol, state]);
			return this;
		};

		/**
  	Given the next item, returns next state for that item
  	@method next
  	@param {Mixed} item Should be an instance of the symbols handled by
  		this particular machine.
  	@return {State} state Returns false if no jumps are available
  */


		BaseState.prototype.next = function next(item) {

			for (var i = 0; i < this.j.length; i++) {

				var jump = this.j[i],
				    symbol = jump[0],
				    // Next item to check for
				state = jump[1]; // State to jump to if items match

				// compare item with symbol
				if (this.test(item, symbol)) return state;
			}

			// Nowhere left to jump!
			return false;
		};

		/**
  	Does this state accept?
  	`true` only of `this.T` exists
  		@method accepts
  	@return {Boolean}
  */


		BaseState.prototype.accepts = function accepts() {
			return !!this.T;
		};

		/**
  	Determine whether a given item "symbolizes" the symbol, where symbol is
  	a class of items handled by this state machine.
  		This method should be overriden in extended classes.
  		@method test
  	@param {Mixed} item Does this item match the given symbol?
  	@param {Mixed} symbol
  	@return {Boolean}
  */


		BaseState.prototype.test = function test(item, symbol) {
			return item === symbol;
		};

		/**
  	Emit the token for this State (just return it in this case)
  	If this emits a token, this instance is an accepting state
  	@method emit
  	@return {Class} T
  */


		BaseState.prototype.emit = function emit() {
			return this.T;
		};

		return BaseState;
	}();

	/**
 	State machine for string-based input
 		@class CharacterState
 	@extends BaseState
 */


	var CharacterState = function (_BaseState) {
		_inherits(CharacterState, _BaseState);

		function CharacterState() {
			_classCallCheck(this, CharacterState);

			return _possibleConstructorReturn(this, _BaseState.apply(this, arguments));
		}

		/**
  	Does the given character match the given character or regular
  	expression?
  		@method test
  	@param {String} char
  	@param {String|RegExp} charOrRegExp
  	@return {Boolean}
  */

		CharacterState.prototype.test = function test(character, charOrRegExp) {
			return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
		};

		return CharacterState;
	}(BaseState);

	/**
 	State machine for input in the form of TextTokens
 		@class TokenState
 	@extends BaseState
 */


	var State = function (_BaseState2) {
		_inherits(State, _BaseState2);

		function State() {
			_classCallCheck(this, State);

			return _possibleConstructorReturn(this, _BaseState2.apply(this, arguments));
		}

		/**
  	Is the given token an instance of the given token class?
  		@method test
  	@param {TextToken} token
  	@param {Class} tokenClass
  	@return {Boolean}
  */

		State.prototype.test = function test(token, tokenClass) {
			return token instanceof tokenClass;
		};

		return State;
	}(BaseState);

	/**
 	Given a non-empty target string, generates states (if required) for each
 	consecutive substring of characters in str starting from the beginning of
 	the string. The final state will have a special value, as specified in
 	options. All other "in between" substrings will have a default end state.
 		This turns the state machine into a Trie-like data structure (rather than a
 	intelligently-designed DFA).
 		Note that I haven't really tried these with any strings other than
 	DOMAIN.
 		@param {String} str
 	@param {CharacterState} start State to jump from the first character
 	@param {Class} endToken Token class to emit when the given string has been
 		matched and no more jumps exist.
 	@param {Class} defaultToken "Filler token", or which token type to emit when
 		we don't have a full match
 	@return {Array} list of newly-created states
 */


	function stateify(str, start, endToken, defaultToken) {

		var i = 0,
		    len = str.length,
		    state = start,
		    newStates = [],
		    nextState = void 0;

		// Find the next state without a jump to the next character
		while (i < len && (nextState = state.next(str[i]))) {
			state = nextState;
			i++;
		}

		if (i >= len) return []; // no new tokens were added

		while (i < len - 1) {
			nextState = new CharacterState(defaultToken);
			newStates.push(nextState);
			state.on(str[i], nextState);
			state = nextState;
			i++;
		}

		nextState = new CharacterState(endToken);
		newStates.push(nextState);
		state.on(str[len - 1], nextState);

		return newStates;
	}

	var tlds = 'abogado|ac|academy|accountants|active|actor|ad|adult|ae|aero|af|ag|agency|ai|airforce|al|allfinanz|alsace|am|an|android|ao|aq|aquarelle|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|band|bar|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boo|boutique|br|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cab|cal|camera|camp|cancerresearch|capetown|capital|caravan|cards|care|career|careers|casa|cash|cat|catering|cc|cd|center|ceo|cern|cf|cg|ch|channel|cheap|christmas|chrome|church|ci|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella|cv|cw|cx|cy|cymru|cz|dad|dance|dating|day|de|deals|degree|delivery|democrat|dental|dentist|desi|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|domains|durban|dvag|dz|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|equipment|er|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|fail|farm|fashion|feedback|fi|finance|financial|firmdale|fish|fishing|fitness|fj|fk|flights|florist|flsmidth|fly|fm|fo|foo|forsale|foundation|fr|frl|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gbiz|gd|ge|gent|gf|gg|gh|gi|gift|gifts|gives|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|haus|healthcare|help|here|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|hosting|house|how|hr|ht|hu|ibm|id|ie|il|im|immo|immobilien|in|industries|info|ing|ink|institute|insure|int|international|investments|io|iq|ir|irish|is|it|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kz|la|lacaixa|land|latrobe|lawyer|lb|lc|lds|lease|legal|lgbt|li|life|lighting|limited|limo|link|lk|loans|local|london|lotto|lr|ls|lt|ltda|lu|luxe|luxury|lv|ly|ma|madrid|maison|management|mango|market|marketing|mc|md|me|media|meet|melbourne|meme|memorial|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|network|neustar|new|nexus|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|ong|onl|ooo|org|organic|otsuka|ovh|pa|paris|partners|parts|party|pe|pf|pg|ph|pharmacy|photo|photography|photos|physio|pics|pictures|pink|pizza|pk|pl|place|plumbing|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|ps|pt|pub|pw|py|qa|qpon|quebec|re|realtor|recipes|red|rehab|reise|reisen|reit|ren|rentals|repair|report|republican|rest|restaurant|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|rw|ryukyu|sa|saarland|sarl|sb|sc|sca|scb|schmidt|schule|science|scot|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|sydney|systems|sz|taipei|tatar|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|town|toys|tp|tr|trade|training|travel|trust|tt|tui|tv|tw|tz|ua|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|wang|watch|webcam|website|wed|wedding|wf|whoswho|wien|wiki|williamhill|wme|work|works|world|ws|wtc|wtf|xxx|xyz|yachts|yandex|ye|yoga|yokohama|youtube|yt|za|zip|zm|zone|zw'.split('|'); // macro, see gulpfile.js

	var REGEXP_NUM = /[0-9]/;
	var REGEXP_ALPHANUM = /[a-z0-9]/;
	var COLON = ':';
	var domainStates = [];
	var makeState = function makeState(tokenClass) {
		return new CharacterState(tokenClass);
	};
	var T_DOMAIN = TEXT_TOKENS.DOMAIN;
	var T_LOCALHOST = TEXT_TOKENS.LOCALHOST;
	var T_NUM = TEXT_TOKENS.NUM;
	var T_PROTOCOL = TEXT_TOKENS.PROTOCOL;
	var T_TLD = TEXT_TOKENS.TLD;
	var T_WS = TEXT_TOKENS.WS;
	var S_START = makeState();
	var S_NUM = makeState(T_NUM);
	var S_DOMAIN = makeState(T_DOMAIN);
	var S_DOMAIN_HYPHEN = makeState();
	var S_WS = makeState(T_WS);
	// States for special URL symbols
	S_START.on('@', makeState(TEXT_TOKENS.AT)).on('.', makeState(TEXT_TOKENS.DOT)).on('+', makeState(TEXT_TOKENS.PLUS)).on('#', makeState(TEXT_TOKENS.POUND)).on('?', makeState(TEXT_TOKENS.QUERY)).on('/', makeState(TEXT_TOKENS.SLASH)).on(COLON, makeState(TEXT_TOKENS.COLON)).on('{', makeState(TEXT_TOKENS.OPENBRACE)).on('[', makeState(TEXT_TOKENS.OPENBRACKET)).on('(', makeState(TEXT_TOKENS.OPENPAREN)).on('}', makeState(TEXT_TOKENS.CLOSEBRACE)).on(']', makeState(TEXT_TOKENS.CLOSEBRACKET)).on(')', makeState(TEXT_TOKENS.CLOSEPAREN)).on(/[,;!]/, makeState(TEXT_TOKENS.PUNCTUATION));

	// Whitespace jumps
	// Tokens of only non-newline whitespace are arbitrarily long
	S_START.on(/\n/, makeState(TEXT_TOKENS.NL)).on(/\s/, S_WS);

	// If any whitespace except newline, more whitespace!
	S_WS.on(/[^\S\n]/, S_WS);

	// Generates states for top-level domains
	// Note that this is most accurate when tlds are in alphabetical order
	for (var i = 0; i < tlds.length; i++) {
		var newStates = stateify(tlds[i], S_START, T_TLD, T_DOMAIN);
		domainStates.push.apply(domainStates, newStates);
	}

	// Collect the states generated by different protocls
	var partialProtocolFileStates = stateify('file', S_START, T_DOMAIN, T_DOMAIN);
	var partialProtocolFtpStates = stateify('ftp', S_START, T_DOMAIN, T_DOMAIN);
	var partialProtocolHttpStates = stateify('http', S_START, T_DOMAIN, T_DOMAIN);
	// Add the states to the array of DOMAINeric states
	domainStates.push.apply(domainStates, partialProtocolFileStates);
	domainStates.push.apply(domainStates, partialProtocolFtpStates);
	domainStates.push.apply(domainStates, partialProtocolHttpStates);

	var S_PROTOCOL_FILE = partialProtocolFileStates.pop();
	var S_PROTOCOL_FTP = partialProtocolFtpStates.pop();
	var S_PROTOCOL_HTTP = partialProtocolHttpStates.pop();
	var S_PROTOCOL_SECURE = makeState(T_DOMAIN);
	var S_FULL_PROTOCOL = makeState(T_PROTOCOL);
	// Full protocol ends with COLON

	// Secure protocols (end with 's')
	S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(COLON, S_FULL_PROTOCOL);

	S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(COLON, S_FULL_PROTOCOL);

	domainStates.push(S_PROTOCOL_SECURE);

	// Become protocol tokens after a COLON
	S_PROTOCOL_FILE.on(COLON, S_FULL_PROTOCOL);
	S_PROTOCOL_SECURE.on(COLON, S_FULL_PROTOCOL);

	// Localhost
	var partialLocalhostStates = stateify('localhost', S_START, T_LOCALHOST, T_DOMAIN);
	domainStates.push.apply(domainStates, partialLocalhostStates);

	// Everything else
	// DOMAINs make more DOMAINs
	// Number and character transitions
	S_START.on(REGEXP_NUM, S_NUM);
	S_NUM.on('-', S_DOMAIN_HYPHEN).on(REGEXP_NUM, S_NUM).on(REGEXP_ALPHANUM, S_DOMAIN); // number becomes DOMAIN

	S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(REGEXP_ALPHANUM, S_DOMAIN);

	// All the generated states should have a jump to DOMAIN
	for (var _i = 0; _i < domainStates.length; _i++) {
		domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(REGEXP_ALPHANUM, S_DOMAIN);
	}

	S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(REGEXP_NUM, S_DOMAIN).on(REGEXP_ALPHANUM, S_DOMAIN);

	// Any other character is considered a single symbol token
	S_START.on(/./, makeState(TEXT_TOKENS.SYM));

	/**
 	Given a string, returns an array of TOKEN instances representing the
 	composition of that string.
 		@method run
 	@param {String} str Input string to scan
 	@return {Array} Array of TOKEN instances
 */
	var run = function run(str) {

		// The state machine only looks at lowercase strings.
		// This selective `toLowerCase` is used because lowercasing the entire
		// string causes the length and character position to vary in some in some
		// non-English strings. This happens only on V8-based runtimes.
		var lowerStr = str.replace(/[A-Z]/g, function (c) {
			return c.toLowerCase();
		});
		var len = str.length;
		var tokens = []; // return value

		var cursor = 0;

		// Tokenize the string
		while (cursor < len) {

			var state = S_START,
			    secondState = null,
			    nextState = null,
			    tokenLength = 0,
			    latestAccepting = null,
			    sinceAccepts = -1;

			while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
				secondState = null;
				state = nextState;

				// Keep track of the latest accepting state
				if (state.accepts()) {
					sinceAccepts = 0;
					latestAccepting = state;
				} else if (sinceAccepts >= 0) {
					sinceAccepts++;
				}

				tokenLength++;
				cursor++;
			}

			if (sinceAccepts < 0) continue; // Should never happen

			// Roll back to the latest accepting state
			cursor -= sinceAccepts;
			tokenLength -= sinceAccepts;

			// Get the class for the new token
			var TOKEN = latestAccepting.emit(); // Current token class

			// No more jumps, just make a new token
			tokens.push(new TOKEN(str.substr(cursor - tokenLength, tokenLength)));
		}

		return tokens;
	};

	var start = S_START;

	var scanner = Object.freeze({
		State: CharacterState,
		TOKENS: TEXT_TOKENS,
		run: run,
		start: start
	});

	var makeState$1 = function makeState$1(tokenClass) {
		return new State(tokenClass);
	};

	var TT_DOMAIN = TEXT_TOKENS.DOMAIN;
	var TT_AT = TEXT_TOKENS.AT;
	var TT_COLON = TEXT_TOKENS.COLON;
	var TT_DOT = TEXT_TOKENS.DOT;
	var TT_PUNCTUATION = TEXT_TOKENS.PUNCTUATION;
	var TT_LOCALHOST = TEXT_TOKENS.LOCALHOST;
	var TT_NL = TEXT_TOKENS.NL;
	var TT_NUM = TEXT_TOKENS.NUM;
	var TT_PLUS = TEXT_TOKENS.PLUS;
	var TT_POUND = TEXT_TOKENS.POUND;
	var TT_PROTOCOL = TEXT_TOKENS.PROTOCOL;
	var TT_QUERY = TEXT_TOKENS.QUERY;
	var TT_SLASH = TEXT_TOKENS.SLASH;
	var TT_SYM = TEXT_TOKENS.SYM;
	var TT_TLD = TEXT_TOKENS.TLD;
	var TT_OPENBRACE = TEXT_TOKENS.OPENBRACE;
	var TT_OPENBRACKET = TEXT_TOKENS.OPENBRACKET;
	var TT_OPENPAREN = TEXT_TOKENS.OPENPAREN;
	var TT_CLOSEBRACE = TEXT_TOKENS.CLOSEBRACE;
	var TT_CLOSEBRACKET = TEXT_TOKENS.CLOSEBRACKET;
	var TT_CLOSEPAREN = TEXT_TOKENS.CLOSEPAREN;
	var T_EMAIL = MULTI_TOKENS.EMAIL;
	var T_NL = MULTI_TOKENS.NL;
	var T_TEXT = MULTI_TOKENS.TEXT;
	var T_URL = MULTI_TOKENS.URL;
	// The universal starting state.
	var S_START$1 = makeState$1();

	// Intermediate states for URLs. Note that domains that begin with a protocol
	// are treated slighly differently from those that don't.
	var S_PROTOCOL = makeState$1();
	var S_PROTOCOL_SLASH = makeState$1();
	var S_PROTOCOL_SLASH_SLASH = makeState$1();
	var S_DOMAIN$1 = makeState$1();
	var S_DOMAIN_DOT = makeState$1();
	var S_TLD = makeState$1(T_URL);
	var S_TLD_COLON = makeState$1();
	var S_TLD_PORT = makeState$1(T_URL);
	var S_URL = makeState$1(T_URL);
	var S_URL_SYMS = makeState$1();
	var S_URL_OPENBRACE = makeState$1();
	var S_URL_OPENBRACKET = makeState$1();
	var S_URL_OPENPAREN = makeState$1();
	var S_URL_OPENBRACE_Q = makeState$1(T_URL);
	var S_URL_OPENBRACKET_Q = makeState$1(T_URL);
	var S_URL_OPENPAREN_Q = makeState$1(T_URL);
	var S_URL_OPENBRACE_SYMS = makeState$1();
	var S_URL_OPENBRACKET_SYMS = makeState$1();
	var S_URL_OPENPAREN_SYMS = makeState$1();
	var S_EMAIL_DOMAIN = makeState$1();
	var S_EMAIL_DOMAIN_DOT = makeState$1();
	var S_EMAIL = makeState$1(T_EMAIL);
	var S_EMAIL_COLON = makeState$1();
	var S_EMAIL_PORT = makeState$1(T_EMAIL);
	var S_LOCALPART = makeState$1();
	var S_LOCALPART_AT = makeState$1();
	var S_LOCALPART_DOT = makeState$1();
	var S_NL = makeState$1(T_NL);
	// single new line

	// Make path from start to protocol (with '//')
	S_START$1.on(TT_NL, S_NL).on(TT_PROTOCOL, S_PROTOCOL).on(TT_SLASH, S_PROTOCOL_SLASH);

	S_PROTOCOL.on(TT_SLASH, S_PROTOCOL_SLASH);
	S_PROTOCOL_SLASH.on(TT_SLASH, S_PROTOCOL_SLASH_SLASH);

	// The very first potential domain name
	S_START$1.on(TT_TLD, S_DOMAIN$1).on(TT_DOMAIN, S_DOMAIN$1).on(TT_LOCALHOST, S_TLD).on(TT_NUM, S_DOMAIN$1);

	// Force URL for anything sane followed by protocol
	S_PROTOCOL_SLASH_SLASH.on(TT_TLD, S_URL).on(TT_DOMAIN, S_URL).on(TT_NUM, S_URL).on(TT_LOCALHOST, S_URL);

	// Account for dots and hyphens
	// hyphens are usually parts of domain names
	S_DOMAIN$1.on(TT_DOT, S_DOMAIN_DOT);
	S_EMAIL_DOMAIN.on(TT_DOT, S_EMAIL_DOMAIN_DOT);

	// Hyphen can jump back to a domain name

	// After the first domain and a dot, we can find either a URL or another domain
	S_DOMAIN_DOT.on(TT_TLD, S_TLD).on(TT_DOMAIN, S_DOMAIN$1).on(TT_NUM, S_DOMAIN$1).on(TT_LOCALHOST, S_DOMAIN$1);

	S_EMAIL_DOMAIN_DOT.on(TT_TLD, S_EMAIL).on(TT_DOMAIN, S_EMAIL_DOMAIN).on(TT_NUM, S_EMAIL_DOMAIN).on(TT_LOCALHOST, S_EMAIL_DOMAIN);

	// S_TLD accepts! But the URL could be longer, try to find a match greedily
	// The `run` function should be able to "rollback" to the accepting state
	S_TLD.on(TT_DOT, S_DOMAIN_DOT);
	S_EMAIL.on(TT_DOT, S_EMAIL_DOMAIN_DOT);

	// Become real URLs after `SLASH` or `COLON NUM SLASH`
	// Here PSS and non-PSS converge
	S_TLD.on(TT_COLON, S_TLD_COLON).on(TT_SLASH, S_URL);
	S_TLD_COLON.on(TT_NUM, S_TLD_PORT);
	S_TLD_PORT.on(TT_SLASH, S_URL);
	S_EMAIL.on(TT_COLON, S_EMAIL_COLON);
	S_EMAIL_COLON.on(TT_NUM, S_EMAIL_PORT);

	// Types of characters the URL can definitely end in
	var qsAccepting = [TT_DOMAIN, TT_AT, TT_LOCALHOST, TT_NUM, TT_PLUS, TT_POUND, TT_PROTOCOL, TT_SLASH, TT_TLD];

	// Types of tokens that can follow a URL and be part of the query string
	// but cannot be the very last characters
	// Characters that cannot appear in the URL at all should be excluded
	var qsNonAccepting = [TT_COLON, TT_DOT, TT_QUERY, TT_PUNCTUATION, TT_CLOSEBRACE, TT_CLOSEBRACKET, TT_CLOSEPAREN, TT_OPENBRACE, TT_OPENBRACKET, TT_OPENPAREN, TT_SYM];

	// These states are responsible primarily for determining whether or not to
	// include the final round bracket.

	// URL, followed by an opening bracket
	S_URL.on(TT_OPENBRACE, S_URL_OPENBRACE).on(TT_OPENBRACKET, S_URL_OPENBRACKET).on(TT_OPENPAREN, S_URL_OPENPAREN);

	// URL with extra symbols at the end, followed by an opening bracket
	S_URL_SYMS.on(TT_OPENBRACE, S_URL_OPENBRACE).on(TT_OPENBRACKET, S_URL_OPENBRACKET).on(TT_OPENPAREN, S_URL_OPENPAREN);

	// Closing bracket component. This character WILL be included in the URL
	S_URL_OPENBRACE.on(TT_CLOSEBRACE, S_URL);
	S_URL_OPENBRACKET.on(TT_CLOSEBRACKET, S_URL);
	S_URL_OPENPAREN.on(TT_CLOSEPAREN, S_URL);
	S_URL_OPENBRACE_Q.on(TT_CLOSEBRACE, S_URL);
	S_URL_OPENBRACKET_Q.on(TT_CLOSEBRACKET, S_URL);
	S_URL_OPENPAREN_Q.on(TT_CLOSEPAREN, S_URL);
	S_URL_OPENBRACE_SYMS.on(TT_CLOSEBRACE, S_URL);
	S_URL_OPENBRACKET_SYMS.on(TT_CLOSEBRACKET, S_URL);
	S_URL_OPENPAREN_SYMS.on(TT_CLOSEPAREN, S_URL);

	// URL that beings with an opening bracket, followed by a symbols.
	// Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
	// has a single opening bracket for some reason).
	S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
	S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
	S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
	S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

	// URL that begins with an opening bracket, followed by some symbols
	S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
	S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);

	S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
	S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
	S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
	S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

	// Account for the query string
	S_URL.on(qsAccepting, S_URL);
	S_URL_SYMS.on(qsAccepting, S_URL);

	S_URL.on(qsNonAccepting, S_URL_SYMS);
	S_URL_SYMS.on(qsNonAccepting, S_URL_SYMS);

	// Email address-specific state definitions
	// Note: We are not allowing '/' in email addresses since this would interfere
	// with real URLs

	// Tokens allowed in the localpart of the email
	var localpartAccepting = [TT_DOMAIN, TT_NUM, TT_PLUS, TT_POUND, TT_QUERY, TT_SYM, TT_TLD];

	// Some of the tokens in `localpartAccepting` are already accounted for here and
	// will not be overwritten (don't worry)
	S_DOMAIN$1.on(localpartAccepting, S_LOCALPART).on(TT_AT, S_LOCALPART_AT);
	S_TLD.on(localpartAccepting, S_LOCALPART).on(TT_AT, S_LOCALPART_AT);
	S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART);

	// Okay we're on a localpart. Now what?
	// TODO: IP addresses and what if the email starts with numbers?
	S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(TT_AT, S_LOCALPART_AT) // close to an email address now
	.on(TT_DOT, S_LOCALPART_DOT);
	S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
	S_LOCALPART_AT.on(TT_TLD, S_EMAIL_DOMAIN).on(TT_DOMAIN, S_EMAIL_DOMAIN).on(TT_LOCALHOST, S_EMAIL);
	// States following `@` defined above

	var run$1 = function run$1(tokens) {
		var len = tokens.length,
		    cursor = 0,
		    multis = [],
		    textTokens = [];

		while (cursor < len) {

			var state = S_START$1,
			    secondState = null,
			    nextState = null,
			    multiLength = 0,
			    latestAccepting = null,
			    sinceAccepts = -1;

			while (cursor < len && !(secondState = state.next(tokens[cursor]))) {
				// Starting tokens with nowhere to jump to.
				// Consider these to be just plain text
				textTokens.push(tokens[cursor++]);
			}

			while (cursor < len && (nextState = secondState || state.next(tokens[cursor]))) {

				// Get the next state
				secondState = null;
				state = nextState;

				// Keep track of the latest accepting state
				if (state.accepts()) {
					sinceAccepts = 0;
					latestAccepting = state;
				} else if (sinceAccepts >= 0) {
					sinceAccepts++;
				}

				cursor++;
				multiLength++;
			}

			if (sinceAccepts < 0) {

				// No accepting state was found, part of a regular text token
				// Add all the tokens we looked at to the text tokens array
				for (var _i2 = cursor - multiLength; _i2 < cursor; _i2++) {
					textTokens.push(tokens[_i2]);
				}
			} else {

				// Accepting state!

				// First close off the textTokens (if available)
				if (textTokens.length > 0) {
					multis.push(new T_TEXT(textTokens));
					textTokens = [];
				}

				// Roll back to the latest accepting state
				cursor -= sinceAccepts;
				multiLength -= sinceAccepts;

				// Create a new multitoken
				var MULTI = latestAccepting.emit();
				multis.push(new MULTI(tokens.slice(cursor - multiLength, cursor)));
			}
		}

		// Finally close off the textTokens (if available)
		if (textTokens.length > 0) {
			multis.push(new T_TEXT(textTokens));
		}

		return multis;
	};

	var TOKENS = MULTI_TOKENS;
	var start$1 = S_START$1;

	var parser = Object.freeze({
		State: State,
		TOKENS: TOKENS,
		run: run$1,
		start: start$1
	});

	if (!Array.isArray) {
		Array.isArray = function (arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}

	/**
 	Converts a string into tokens that represent linkable and non-linkable bits
 	@method tokenize
 	@param {String} str
 	@return {Array} tokens
 */
	var tokenize = function tokenize(str) {
		return run$1(run(str));
	};

	/**
 	Returns a list of linkable items in the given string.
 */
	var find = function find(str) {
		var type = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];


		var tokens = tokenize(str),
		    filtered = [];

		for (var _i3 = 0; _i3 < tokens.length; _i3++) {
			if (tokens[_i3].isLink && (!type || tokens[_i3].type === type)) {
				filtered.push(tokens[_i3].toObject());
			}
		}

		return filtered;
	};

	/**
 	Is the given string valid linkable text of some sort
 	Note that this does not trim the text for you.
 		Optionally pass in a second `type` param, which is the type of link to test
 	for.
 		For example,
 			test(str, 'email');
 		Will return `true` if str is a valid email.
 */
	var test = function test(str) {
		var type = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		var tokens = tokenize(str);
		return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
	};

	exports.find = find;
	exports.options = options;
	exports.parser = parser;
	exports.scanner = scanner;
	exports.test = test;
	exports.tokenize = tokenize;
})(window.linkify = window.linkify || {});
})();