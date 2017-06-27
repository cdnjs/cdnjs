;(function () {
'use strict';

(function (exports) {
	'use strict';

	function inherits(parent, child) {
		var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		var extended = Object.create(parent.prototype);
		for (var p in props) {
			extended[p] = props[p];
		}
		extended.constructor = child;
		child.prototype = extended;
		return child;
	}

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

	function createTokenClass() {
		return function (value) {
			if (value) {
				this.v = value;
			}
		};
	}

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

	var TextToken = createTokenClass();

	TextToken.prototype = {
		toString: function toString() {
			return this.v + '';
		}
	};

	function inheritsToken(value) {
		var props = value ? { v: value } : {};
		return inherits(TextToken, createTokenClass(), props);
	}

	/**
 	A valid domain token
 	@class DOMAIN
 	@extends TextToken
 */
	var DOMAIN = inheritsToken();

	/**
 	@class AT
 	@extends TextToken
 */
	var AT = inheritsToken('@');

	/**
 	Represents a single colon `:` character
 		@class COLON
 	@extends TextToken
 */
	var COLON$1 = inheritsToken(':');

	/**
 	@class DOT
 	@extends TextToken
 */
	var DOT = inheritsToken('.');

	/**
 	A character class that can surround the URL, but which the URL cannot begin
 	or end with. Does not include certain English punctuation like parentheses.
 		@class PUNCTUATION
 	@extends TextToken
 */
	var PUNCTUATION = inheritsToken();

	/**
 	The word localhost (by itself)
 	@class LOCALHOST
 	@extends TextToken
 */
	var LOCALHOST = inheritsToken();

	/**
 	Newline token
 	@class TNL
 	@extends TextToken
 */
	var TNL = inheritsToken('\n');

	/**
 	@class NUM
 	@extends TextToken
 */
	var NUM = inheritsToken();

	/**
 	@class PLUS
 	@extends TextToken
 */
	var PLUS = inheritsToken('+');

	/**
 	@class POUND
 	@extends TextToken
 */
	var POUND = inheritsToken('#');

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
	var PROTOCOL = inheritsToken();

	/**
 	@class QUERY
 	@extends TextToken
 */
	var QUERY = inheritsToken('?');

	/**
 	@class SLASH
 	@extends TextToken
 */
	var SLASH = inheritsToken('/');

	/**
 	One ore more non-whitespace symbol.
 	@class SYM
 	@extends TextToken
 */
	var SYM = inheritsToken();

	/**
 	@class TLD
 	@extends TextToken
 */
	var TLD = inheritsToken();

	/**
 	Represents a string of consecutive whitespace characters
 		@class WS
 	@extends TextToken
 */
	var WS = inheritsToken();

	/**
 	Opening/closing bracket classes
 */

	var OPENBRACE = inheritsToken('{');
	var OPENBRACKET = inheritsToken('[');
	var OPENPAREN = inheritsToken('(');
	var CLOSEBRACE = inheritsToken('}');
	var CLOSEBRACKET = inheritsToken(']');
	var CLOSEPAREN = inheritsToken(')');

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
	var MultiToken = createTokenClass();

	MultiToken.prototype = {
		/**
  	String representing the type for this token
  	@property type
  	@default 'TOKEN'
  */
		type: 'token',

		/**
  	Is this multitoken a link?
  	@property isLink
  	@default false
  */
		isLink: false,

		/**
  	Return the string this token represents.
  	@method toString
  	@return {String}
  */
		toString: function toString() {
			var result = [];
			for (var i = 0; i < this.v.length; i++) {
				result.push(this.v[i].toString());
			}
			return result.join('');
		},


		/**
  	What should the value for this token be in the `href` HTML attribute?
  	Returns the `.toString` value by default.
  		@method toHref
  	@return {String}
  */
		toHref: function toHref() {
			return this.toString();
		},


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
		toObject: function toObject() {
			var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];

			return {
				type: this.type,
				value: this.toString(),
				href: this.toHref(protocol)
			};
		}
	};

	/**
 	Represents a list of tokens making up a valid email address
 	@class EMAIL
 	@extends MultiToken
 */
	var EMAIL = inherits(MultiToken, createTokenClass(), {
		type: 'email',
		isLink: true,
		toHref: function toHref() {
			return 'mailto:' + this.toString();
		}
	});

	/**
 	Represents some plain text
 	@class TEXT
 	@extends MultiToken
 */
	var TEXT = inherits(MultiToken, createTokenClass(), { type: 'text' });

	/**
 	Multi-linebreak token - represents a line break
 	@class MNL
 	@extends MultiToken
 */
	var MNL = inherits(MultiToken, createTokenClass(), { type: 'nl' });

	/**
 	Represents a list of tokens making up a valid URL
 	@class URL
 	@extends MultiToken
 */
	var URL = inherits(MultiToken, createTokenClass(), {
		type: 'url',
		isLink: true,

		/**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@method href
  	@param {String} protocol
  	@return {String}
  */
		toHref: function toHref() {
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
		},
		hasProtocol: function hasProtocol() {
			return this.v[0] instanceof PROTOCOL;
		}
	});

	var MULTI_TOKENS = {
		Base: MultiToken,
		EMAIL: EMAIL,
		NL: MNL,
		TEXT: TEXT,
		URL: URL
	};

	function createStateClass() {
		return function (tClass) {
			this.j = [];
			this.T = tClass || null;
		};
	}

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
	var BaseState = createStateClass();
	BaseState.prototype = {
		/**
  	@method constructor
  	@param {Class} tClass Pass in the kind of token to emit if there are
  		no jumps after this state and the state is accepting.
  */

		/**
  	On the given symbol(s), this machine should go to the given state
  		@method on
  	@param {Array|Mixed} symbol
  	@param {BaseState} state Note that the type of this state should be the
  		same as the current instance (i.e., don't pass in a different
  		subclass)
  */

		on: function on(symbol, state) {
			if (symbol instanceof Array) {
				for (var i = 0; i < symbol.length; i++) {
					this.j.push([symbol[i], state]);
				}
				return this;
			}
			this.j.push([symbol, state]);
			return this;
		},


		/**
  	Given the next item, returns next state for that item
  	@method next
  	@param {Mixed} item Should be an instance of the symbols handled by
  		this particular machine.
  	@return {State} state Returns false if no jumps are available
  */
		next: function next(item) {

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
		},


		/**
  	Does this state accept?
  	`true` only of `this.T` exists
  		@method accepts
  	@return {Boolean}
  */
		accepts: function accepts() {
			return !!this.T;
		},


		/**
  	Determine whether a given item "symbolizes" the symbol, where symbol is
  	a class of items handled by this state machine.
  		This method should be overriden in extended classes.
  		@method test
  	@param {Mixed} item Does this item match the given symbol?
  	@param {Mixed} symbol
  	@return {Boolean}
  */
		test: function test(item, symbol) {
			return item === symbol;
		},


		/**
  	Emit the token for this State (just return it in this case)
  	If this emits a token, this instance is an accepting state
  	@method emit
  	@return {Class} T
  */
		emit: function emit() {
			return this.T;
		}
	};

	/**
 	State machine for string-based input
 		@class CharacterState
 	@extends BaseState
 */
	var CharacterState = inherits(BaseState, createStateClass(), {
		/**
  	Does the given character match the given character or regular
  	expression?
  		@method test
  	@param {String} char
  	@param {String|RegExp} charOrRegExp
  	@return {Boolean}
  */

		test: function test(character, charOrRegExp) {
			return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
		}
	});

	/**
 	State machine for input in the form of TextTokens
 		@class TokenState
 	@extends BaseState
 */
	var State = inherits(BaseState, createStateClass(), {

		/**
  	Is the given token an instance of the given token class?
  		@method test
  	@param {TextToken} token
  	@param {Class} tokenClass
  	@return {Boolean}
  */

		test: function test(token, tokenClass) {
			return token instanceof tokenClass;
		}
	});

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

	var tlds = 'aaa|aarp|abb|abbott|abogado|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|af|afl|ag|agency|ai|aig|airforce|airtel|al|alibaba|alipay|allfinanz|alsace|am|amica|amsterdam|an|analytics|android|ao|apartments|app|apple|aq|aquarelle|ar|aramco|archi|army|arpa|arte|as|asia|associates|at|attorney|au|auction|audi|audio|author|auto|autos|avianca|aw|ax|axa|az|azure|ba|baidu|band|bank|bar|barcelona|barclaycard|barclays|bargains|bauhaus|bayern|bb|bbc|bbva|bcg|bcn|bd|be|beats|beer|bentley|berlin|best|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bom|bond|boo|book|boots|bosch|bostik|bot|boutique|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|camera|camp|cancerresearch|canon|capetown|capital|car|caravan|cards|care|career|careers|cars|cartier|casa|cash|casino|cat|catering|cba|cbn|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chloe|christmas|chrome|church|ci|cipriani|circle|cisco|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|date|dating|datsun|day|dclk|de|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs|dog|doha|domains|download|drive|dubai|durban|dvag|dz|earth|eat|ec|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epson|equipment|er|erni|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|fage|fail|fairwinds|faith|family|fan|fans|farm|fashion|fast|feedback|ferrero|fi|film|final|finance|financial|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|florist|flowers|flsmidth|fly|fm|fo|foo|football|ford|forex|forsale|forum|foundation|fox|fr|fresenius|frl|frogans|frontier|fund|furniture|futbol|fyi|ga|gal|gallery|gallup|game|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|gold|goldpoint|golf|goo|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|group|gs|gt|gu|gucci|guge|guide|guitars|guru|gw|gy|hamburg|hangout|haus|hdfcbank|health|healthcare|help|helsinki|here|hermes|hiphop|hitachi|hiv|hk|hm|hn|hockey|holdings|holiday|homedepot|homes|honda|horse|host|hosting|hoteles|hotmail|house|how|hr|hsbc|ht|hu|hyundai|ibm|icbc|ice|icu|id|ie|ifm|iinet|il|im|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|international|investments|io|ipiranga|iq|ir|irish|is|iselect|ist|istanbul|it|itau|iwc|jaguar|java|jcb|je|jetzt|jewelry|jlc|jll|jm|jmp|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kitchen|kiwi|km|kn|koeln|komatsu|kp|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|lamborghini|lamer|lancaster|land|landrover|lanxess|lasalle|lat|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|legal|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|limited|limo|lincoln|linde|link|live|living|lixil|lk|loan|loans|local|locus|lol|london|lotte|lotto|love|lr|ls|lt|ltd|ltda|lu|lupin|luxe|luxury|lv|ly|ma|madrid|maif|maison|makeup|man|management|mango|market|marketing|markets|marriott|mba|mc|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|mg|mh|miami|microsoft|mil|mini|mk|ml|mm|mma|mn|mo|mobi|mobily|moda|moe|moi|mom|monash|money|montblanc|mormon|mortgage|moscow|motorcycles|mov|movie|movistar|mp|mq|mr|ms|mt|mtn|mtpc|mtr|mu|museum|mutuelle|mv|mw|mx|my|mz|na|nadex|nagoya|name|natura|navy|nc|ne|nec|net|netbank|network|neustar|new|news|nexus|nf|ng|ngo|nhk|ni|nico|nikon|ninja|nissan|nl|no|nokia|norton|nowruz|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|office|okinawa|om|omega|one|ong|onl|online|ooo|oracle|orange|org|organic|origins|osaka|otsuka|ovh|pa|page|pamperedchef|panerai|paris|pars|partners|parts|party|passagens|pe|pet|pf|pg|ph|pharmacy|philips|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|promo|properties|property|protection|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|racing|re|read|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|ricoh|rio|rip|ro|rocher|rocks|rodeo|room|rs|rsvp|ru|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|saxo|sb|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scor|scot|sd|se|seat|security|seek|select|sener|services|seven|sew|sex|sexy|sfr|sg|sh|sharp|shell|shia|shiksha|shoes|show|shriram|si|singles|site|sj|sk|ski|skin|sky|skype|sl|sm|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|st|stada|star|starhub|statefarm|statoil|stc|stcgroup|stockholm|storage|store|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|taobao|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|team|tech|technology|tel|telecity|telefonica|temasek|tennis|tf|tg|th|thd|theater|theatre|tickets|tienda|tiffany|tips|tires|tirol|tj|tk|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tp|tr|trade|trading|training|travel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubs|ug|uk|unicom|university|uno|uol|us|uy|uz|va|vacations|vana|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|viking|villas|vin|vip|virgin|vision|vista|vistaprint|viva|vlaanderen|vn|vodka|volkswagen|vote|voting|voto|voyage|vu|vuelos|wales|walter|wang|wanggou|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|wme|wolterskluwer|work|works|world|ws|wtc|wtf|xbox|xerox|xin|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|youtube|yt|za|zara|zero|zip|zm|zone|zuerich|zw'.split('|'); // macro, see gulpfile.js

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
	exports.inherits = inherits;
	exports.options = options;
	exports.parser = parser;
	exports.scanner = scanner;
	exports.test = test;
	exports.tokenize = tokenize;
})(window.linkify = window.linkify || {});
})();