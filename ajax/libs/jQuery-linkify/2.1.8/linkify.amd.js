'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define('linkify', ['exports'], function (exports) {
	'use strict';

	function inherits(parent, child) {
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		var extended = Object.create(parent.prototype);
		for (var p in props) {
			extended[p] = props[p];
		}
		extended.constructor = child;
		child.prototype = extended;
		return child;
	}

	var defaults = {
		defaultProtocol: 'http',
		events: null,
		format: noop,
		formatHref: noop,
		nl2br: false,
		tagName: 'a',
		target: typeToTarget,
		validate: true,
		ignoreTags: [],
		attributes: null,
		className: 'linkified' // Deprecated value - no default class will be provided in the future
	};

	function Options(opts) {
		opts = opts || {};

		this.defaultProtocol = opts.hasOwnProperty('defaultProtocol') ? opts.defaultProtocol : defaults.defaultProtocol;
		this.events = opts.hasOwnProperty('events') ? opts.events : defaults.events;
		this.format = opts.hasOwnProperty('format') ? opts.format : defaults.format;
		this.formatHref = opts.hasOwnProperty('formatHref') ? opts.formatHref : defaults.formatHref;
		this.nl2br = opts.hasOwnProperty('nl2br') ? opts.nl2br : defaults.nl2br;
		this.tagName = opts.hasOwnProperty('tagName') ? opts.tagName : defaults.tagName;
		this.target = opts.hasOwnProperty('target') ? opts.target : defaults.target;
		this.validate = opts.hasOwnProperty('validate') ? opts.validate : defaults.validate;
		this.ignoreTags = [];

		// linkAttributes and linkClass is deprecated
		this.attributes = opts.attributes || opts.linkAttributes || defaults.attributes;
		this.className = opts.hasOwnProperty('className') ? opts.className : opts.linkClass || defaults.className;

		// Make all tags names upper case
		var ignoredTags = opts.hasOwnProperty('ignoreTags') ? opts.ignoreTags : defaults.ignoreTags;
		for (var i = 0; i < ignoredTags.length; i++) {
			this.ignoreTags.push(ignoredTags[i].toUpperCase());
		}
	}

	Options.prototype = {
		/**
   * Given the token, return all options for how it should be displayed
   */
		resolve: function resolve(token) {
			var href = token.toHref(this.defaultProtocol);
			return {
				formatted: this.get('format', token.toString(), token),
				formattedHref: this.get('formatHref', href, token),
				tagName: this.get('tagName', href, token),
				className: this.get('className', href, token),
				target: this.get('target', href, token),
				events: this.getObject('events', href, token),
				attributes: this.getObject('attributes', href, token)
			};
		},


		/**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options. By default,
   */
		check: function check(token) {
			return this.get('validate', token.toString(), token);
		},


		// Private methods

		/**
   * Resolve an option's value based on the value of the option and the given
   * params.
   * @param {String} key Name of option to use
   * @param operator will be passed to the target option if it's method
   * @param {MultiToken} token The token from linkify.tokenize
   */
		get: function get(key, operator, token) {
			var optionValue = void 0,
			    option = this[key];
			if (!option) {
				return option;
			}

			switch (typeof option === 'undefined' ? 'undefined' : _typeof(option)) {
				case 'function':
					return option(operator, token.type);
				case 'object':
					optionValue = option.hasOwnProperty(token.type) ? option[token.type] : defaults[key];
					return typeof optionValue === 'function' ? optionValue(operator, token.type) : optionValue;
			}

			return option;
		},
		getObject: function getObject(key, operator, token) {
			var option = this[key];
			return typeof option === 'function' ? option(operator, token.type) : option;
		}
	};

	/**
  * Quick indexOf replacement for checking the ignoreTags option
  */
	function contains(arr, value) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === value) {
				return true;
			}
		}
		return false;
	}

	function noop(val) {
		return val;
	}

	function typeToTarget(href, type) {
		return type === 'url' ? '_blank' : null;
	}

	var options = Object.freeze({
		defaults: defaults,
		Options: Options,
		contains: contains
	});

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
		defaultTransition: false,

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
				var jump = this.j[i];
				var symbol = jump[0]; // Next item to check for
				var state = jump[1]; // State to jump to if items match

				// compare item with symbol
				if (this.test(item, symbol)) {
					return state;
				}
			}

			// Nowhere left to jump!
			return this.defaultTransition;
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
	var TokenState = inherits(BaseState, createStateClass(), {

		/**
   * Similar to `on`, but returns the state the results in the transition from
   * the given item
   * @method jump
   * @param {Mixed} item
   * @param {Token} [token]
   * @return state
   */
		jump: function jump(token) {
			var tClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var state = this.next(new token('')); // dummy temp token
			if (state === this.defaultTransition) {
				// Make a new state!
				state = new this.constructor(tClass);
				this.on(token, state);
			} else if (tClass) {
				state.T = tClass;
			}
			return state;
		},


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

		if (i >= len) {
			return [];
		} // no new tokens were added

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
	var COLON = inheritsToken(':');

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
 	@class NL
 	@extends TextToken
 */
	var NL = inheritsToken('\n');

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
 
 	@class PROTOCOL
 	@extends TextToken
 */
	var PROTOCOL = inheritsToken();

	/**
 	Represents the start of the email URI protocol
 
 	@class MAILTO
 	@extends TextToken
 */
	var MAILTO = inheritsToken('mailto:');

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
 	@class UNDERSCORE
 	@extends TextToken
 */
	var UNDERSCORE = inheritsToken('_');

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
	var OPENANGLEBRACKET = inheritsToken('<');
	var OPENPAREN = inheritsToken('(');
	var CLOSEBRACE = inheritsToken('}');
	var CLOSEBRACKET = inheritsToken(']');
	var CLOSEANGLEBRACKET = inheritsToken('>');
	var CLOSEPAREN = inheritsToken(')');

	var AMPERSAND = inheritsToken('&');

	var text = Object.freeze({
		Base: TextToken,
		DOMAIN: DOMAIN,
		AT: AT,
		COLON: COLON,
		DOT: DOT,
		PUNCTUATION: PUNCTUATION,
		LOCALHOST: LOCALHOST,
		NL: NL,
		NUM: NUM,
		PLUS: PLUS,
		POUND: POUND,
		QUERY: QUERY,
		PROTOCOL: PROTOCOL,
		MAILTO: MAILTO,
		SLASH: SLASH,
		UNDERSCORE: UNDERSCORE,
		SYM: SYM,
		TLD: TLD,
		WS: WS,
		OPENBRACE: OPENBRACE,
		OPENBRACKET: OPENBRACKET,
		OPENANGLEBRACKET: OPENANGLEBRACKET,
		OPENPAREN: OPENPAREN,
		CLOSEBRACE: CLOSEBRACE,
		CLOSEBRACKET: CLOSEBRACKET,
		CLOSEANGLEBRACKET: CLOSEANGLEBRACKET,
		CLOSEPAREN: CLOSEPAREN,
		AMPERSAND: AMPERSAND
	});

	/**
 	The scanner provides an interface that takes a string of text as input, and
 	outputs an array of tokens instances that can be used for easy URL parsing.
 
 	@module linkify
 	@submodule scanner
 	@main scanner
 */

	var tlds = 'aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|aetna|af|afamilycompany|afl|africa|ag|agakhan|agency|ai|aig|aigo|airbus|airforce|airtel|akdn|al|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|aol|apartments|app|apple|aq|aquarelle|ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|athleta|attorney|au|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aw|aws|ax|axa|az|azure|ba|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|bbc|bbt|bbva|bcg|bcn|bd|be|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|calvinklein|cam|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|cat|catering|catholic|cba|cbn|cbre|cbs|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|ci|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|data|date|dating|datsun|day|dclk|dds|de|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dj|dk|dm|dnp|do|docs|doctor|dodge|dog|doha|domains|dot|download|drive|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dvr|dz|earth|eat|ec|eco|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epost|epson|equipment|er|ericsson|erni|es|esq|estate|esurance|et|etisalat|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fi|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|flir|florist|flowers|fly|fm|fo|foo|food|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|fr|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|ga|gal|gallery|gallo|gallup|game|games|gap|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|george|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glade|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|grocery|group|gs|gt|gu|guardian|gucci|guge|guide|guitars|guru|gw|gy|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hk|hkt|hm|hn|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|hospital|host|hosting|hot|hoteles|hotels|hotmail|house|how|hr|hsbc|ht|htc|hu|hughes|hyatt|hyundai|ibm|icbc|ice|icu|id|ie|ieee|ifm|ikano|il|im|imamat|imdb|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|intel|international|intuit|investments|io|ipiranga|iq|ir|irish|is|iselect|ismaili|ist|istanbul|it|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|je|jeep|jetzt|jewelry|jio|jlc|jll|jm|jmp|jnj|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|juniper|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kindle|kitchen|kiwi|km|kn|koeln|komatsu|kosher|kp|kpmg|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|lk|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|lr|ls|lt|ltd|ltda|lu|lundbeck|lupin|luxe|luxury|lv|ly|ma|macys|madrid|maif|maison|makeup|man|management|mango|map|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mc|mckinsey|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|merckmsd|metlife|mg|mh|miami|microsoft|mil|mini|mint|mit|mitsubishi|mk|ml|mlb|mls|mm|mma|mn|mo|mobi|mobile|mobily|moda|moe|moi|mom|monash|money|monster|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|mp|mq|mr|ms|msd|mt|mtn|mtr|mu|museum|mutual|mv|mw|mx|my|mz|na|nab|nadex|nagoya|name|nationwide|natura|navy|nba|nc|ne|nec|net|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nf|nfl|ng|ngo|nhk|ni|nico|nike|nikon|ninja|nissan|nissay|nl|no|nokia|northwesternmutual|norton|now|nowruz|nowtv|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|om|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|org|organic|origins|osaka|otsuka|ott|ovh|pa|page|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|pccw|pe|pet|pf|pfizer|pg|ph|pharmacy|phd|philips|phone|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pnc|pohl|poker|politie|porn|post|pr|pramerica|praxi|press|prime|pro|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|qvc|racing|radio|raid|re|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|ro|rocher|rocks|rodeo|rogers|room|rs|rsvp|ru|rugby|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sb|sbi|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|sd|se|search|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|sg|sh|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shop|shopping|shouji|show|showtime|shriram|si|silk|sina|singles|site|sj|sk|ski|skin|sky|skype|sl|sling|sm|smart|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|srt|st|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiftcover|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|tdk|team|tech|technology|tel|telecity|telefonica|temasek|tennis|teva|tf|tg|th|thd|theater|theatre|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tj|tjmaxx|tjx|tk|tkmaxx|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tr|trade|trading|training|travel|travelchannel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubank|ubs|uconnect|ug|uk|unicom|university|uno|uol|ups|us|uy|uz|va|vacations|vana|vanguard|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vn|vodka|volkswagen|volvo|vote|voting|voto|voyage|vu|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|ws|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3hcrj9c|xn--3oq18vl8pn36a|xn--3pxu8k|xn--42c2d9a|xn--45br5cyl|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--54b7fta0cc|xn--55qw42g|xn--55qx5d|xn--5su34j936bgsg|xn--5tzm5g|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80aqecdr1a|xn--80asehdb|xn--80aswg|xn--8y0a063a|xn--90a3ac|xn--90ae|xn--90ais|xn--9dbq2a|xn--9et52u|xn--9krt00a|xn--b4w605ferd|xn--bck1b9a5dre4c|xn--c1avg|xn--c2br7g|xn--cck2b3b|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--e1a4c|xn--eckvdtc9d|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--fzys8d69uvgm|xn--g2xx48c|xn--gckr3f0f|xn--gecrj9c|xn--gk3at1e|xn--h2breg3eve|xn--h2brj9c|xn--h2brj9c8c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--jlq61u9w7b|xn--jvr189m|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgba7c0bbn0a|xn--mgbaakc7dvf|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbai9azgqp6j|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgbca7dzdo|xn--mgberp4a5d4ar|xn--mgbgu82a|xn--mgbi4ecexp|xn--mgbpl2fh|xn--mgbt3dhd|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mix891f|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--ngbe9e0a|xn--ngbrx|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pbt977c|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--rovu88b|xn--rvc1e0am3e|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--tiq49xqyj|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--w4r85el8fhu5dnra|xn--w4rs40l|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|you|youtube|yt|yun|za|zappos|zara|zero|zip|zippo|zm|zone|zuerich|zw'.split('|'); // macro, see gulpfile.js

	var NUMBERS = '0123456789'.split('');
	var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
	var WHITESPACE = [' ', '\f', '\r', '\t', '\v', '\xA0', '\u1680', '\u180E']; // excluding line breaks

	var domainStates = []; // states that jump to DOMAIN on /[a-z0-9]/
	var makeState = function makeState(tokenClass) {
		return new CharacterState(tokenClass);
	};

	// Frequently used states
	var S_START = makeState();
	var S_NUM = makeState(NUM);
	var S_DOMAIN = makeState(DOMAIN);
	var S_DOMAIN_HYPHEN = makeState(); // domain followed by 1 or more hyphen characters
	var S_WS = makeState(WS);

	// States for special URL symbols
	S_START.on('@', makeState(AT)).on('.', makeState(DOT)).on('+', makeState(PLUS)).on('#', makeState(POUND)).on('?', makeState(QUERY)).on('/', makeState(SLASH)).on('_', makeState(UNDERSCORE)).on(':', makeState(COLON)).on('{', makeState(OPENBRACE)).on('[', makeState(OPENBRACKET)).on('<', makeState(OPENANGLEBRACKET)).on('(', makeState(OPENPAREN)).on('}', makeState(CLOSEBRACE)).on(']', makeState(CLOSEBRACKET)).on('>', makeState(CLOSEANGLEBRACKET)).on(')', makeState(CLOSEPAREN)).on('&', makeState(AMPERSAND)).on([',', ';', '!', '"', '\''], makeState(PUNCTUATION));

	// Whitespace jumps
	// Tokens of only non-newline whitespace are arbitrarily long
	S_START.on('\n', makeState(NL)).on(WHITESPACE, S_WS);

	// If any whitespace except newline, more whitespace!
	S_WS.on(WHITESPACE, S_WS);

	// Generates states for top-level domains
	// Note that this is most accurate when tlds are in alphabetical order
	for (var i = 0; i < tlds.length; i++) {
		var newStates = stateify(tlds[i], S_START, TLD, DOMAIN);
		domainStates.push.apply(domainStates, newStates);
	}

	// Collect the states generated by different protocls
	var partialProtocolFileStates = stateify('file', S_START, DOMAIN, DOMAIN);
	var partialProtocolFtpStates = stateify('ftp', S_START, DOMAIN, DOMAIN);
	var partialProtocolHttpStates = stateify('http', S_START, DOMAIN, DOMAIN);
	var partialProtocolMailtoStates = stateify('mailto', S_START, DOMAIN, DOMAIN);

	// Add the states to the array of DOMAINeric states
	domainStates.push.apply(domainStates, partialProtocolFileStates);
	domainStates.push.apply(domainStates, partialProtocolFtpStates);
	domainStates.push.apply(domainStates, partialProtocolHttpStates);
	domainStates.push.apply(domainStates, partialProtocolMailtoStates);

	// Protocol states
	var S_PROTOCOL_FILE = partialProtocolFileStates.pop();
	var S_PROTOCOL_FTP = partialProtocolFtpStates.pop();
	var S_PROTOCOL_HTTP = partialProtocolHttpStates.pop();
	var S_MAILTO = partialProtocolMailtoStates.pop();
	var S_PROTOCOL_SECURE = makeState(DOMAIN);
	var S_FULL_PROTOCOL = makeState(PROTOCOL); // Full protocol ends with COLON
	var S_FULL_MAILTO = makeState(MAILTO); // Mailto ends with COLON

	// Secure protocols (end with 's')
	S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

	S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

	domainStates.push(S_PROTOCOL_SECURE);

	// Become protocol tokens after a COLON
	S_PROTOCOL_FILE.on(':', S_FULL_PROTOCOL);
	S_PROTOCOL_SECURE.on(':', S_FULL_PROTOCOL);
	S_MAILTO.on(':', S_FULL_MAILTO);

	// Localhost
	var partialLocalhostStates = stateify('localhost', S_START, LOCALHOST, DOMAIN);
	domainStates.push.apply(domainStates, partialLocalhostStates);

	// Everything else
	// DOMAINs make more DOMAINs
	// Number and character transitions
	S_START.on(NUMBERS, S_NUM);
	S_NUM.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_NUM).on(ALPHANUM, S_DOMAIN); // number becomes DOMAIN

	S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);

	// All the generated states should have a jump to DOMAIN
	for (var _i = 0; _i < domainStates.length; _i++) {
		domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
	}

	S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_DOMAIN).on(ALPHANUM, S_DOMAIN);

	// Set default transition
	S_START.defaultTransition = makeState(SYM);

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
			var state = S_START;
			var nextState = null;
			var tokenLength = 0;
			var latestAccepting = null;
			var sinceAccepts = -1;

			while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
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

			if (sinceAccepts < 0) {
				continue;
			} // Should never happen

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
		TOKENS: text,
		run: run,
		start: start
	});

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
			for (var _i2 = 0; _i2 < this.v.length; _i2++) {
				result.push(this.v[_i2].toString());
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
			var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

			return {
				type: this.type,
				value: this.toString(),
				href: this.toHref(protocol)
			};
		}
	};

	/**
 	Represents an arbitrarily mailto email address with the prefix included
 	@class MAILTO
 	@extends MultiToken
 */
	var MAILTOEMAIL = inherits(MultiToken, createTokenClass(), {
		type: 'email',
		isLink: true
	});

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
 	@class NL
 	@extends MultiToken
 */
	var NL$1 = inherits(MultiToken, createTokenClass(), { type: 'nl' });

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
			var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

			var hasProtocol = false;
			var hasSlashSlash = false;
			var tokens = this.v;
			var result = [];
			var i = 0;

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

	var multi = Object.freeze({
		Base: MultiToken,
		MAILTOEMAIL: MAILTOEMAIL,
		EMAIL: EMAIL,
		NL: NL$1,
		TEXT: TEXT,
		URL: URL
	});

	/**
 	Not exactly parser, more like the second-stage scanner (although we can
 	theoretically hotswap the code here with a real parser in the future... but
 	for a little URL-finding utility abstract syntax trees may be a little
 	overkill).
 
 	URL format: http://en.wikipedia.org/wiki/URI_scheme
 	Email format: http://en.wikipedia.org/wiki/Email_address (links to RFC in
 	reference)
 
 	@module linkify
 	@submodule parser
 	@main parser
 */

	var makeState$1 = function makeState$1(tokenClass) {
		return new TokenState(tokenClass);
	};

	// The universal starting state.
	var S_START$1 = makeState$1();

	// Intermediate states for URLs. Note that domains that begin with a protocol
	// are treated slighly differently from those that don't.
	var S_PROTOCOL = makeState$1(); // e.g., 'http:'
	var S_MAILTO$1 = makeState$1(); // 'mailto:'
	var S_PROTOCOL_SLASH = makeState$1(); // e.g., '/', 'http:/''
	var S_PROTOCOL_SLASH_SLASH = makeState$1(); // e.g., '//', 'http://'
	var S_DOMAIN$1 = makeState$1(); // parsed string ends with a potential domain name (A)
	var S_DOMAIN_DOT = makeState$1(); // (A) domain followed by DOT
	var S_TLD = makeState$1(URL); // (A) Simplest possible URL with no query string
	var S_TLD_COLON = makeState$1(); // (A) URL followed by colon (potential port number here)
	var S_TLD_PORT = makeState$1(URL); // TLD followed by a port number
	var S_URL = makeState$1(URL); // Long URL with optional port and maybe query string
	var S_URL_NON_ACCEPTING = makeState$1(); // URL followed by some symbols (will not be part of the final URL)
	var S_URL_OPENBRACE = makeState$1(); // URL followed by {
	var S_URL_OPENBRACKET = makeState$1(); // URL followed by [
	var S_URL_OPENANGLEBRACKET = makeState$1(); // URL followed by <
	var S_URL_OPENPAREN = makeState$1(); // URL followed by (
	var S_URL_OPENBRACE_Q = makeState$1(URL); // URL followed by { and some symbols that the URL can end it
	var S_URL_OPENBRACKET_Q = makeState$1(URL); // URL followed by [ and some symbols that the URL can end it
	var S_URL_OPENANGLEBRACKET_Q = makeState$1(URL); // URL followed by < and some symbols that the URL can end it
	var S_URL_OPENPAREN_Q = makeState$1(URL); // URL followed by ( and some symbols that the URL can end it
	var S_URL_OPENBRACE_SYMS = makeState$1(); // S_URL_OPENBRACE_Q followed by some symbols it cannot end it
	var S_URL_OPENBRACKET_SYMS = makeState$1(); // S_URL_OPENBRACKET_Q followed by some symbols it cannot end it
	var S_URL_OPENANGLEBRACKET_SYMS = makeState$1(); // S_URL_OPENANGLEBRACKET_Q followed by some symbols it cannot end it
	var S_URL_OPENPAREN_SYMS = makeState$1(); // S_URL_OPENPAREN_Q followed by some symbols it cannot end it
	var S_EMAIL_DOMAIN = makeState$1(); // parsed string starts with local email info + @ with a potential domain name (C)
	var S_EMAIL_DOMAIN_DOT = makeState$1(); // (C) domain followed by DOT
	var S_EMAIL = makeState$1(EMAIL); // (C) Possible email address (could have more tlds)
	var S_EMAIL_COLON = makeState$1(); // (C) URL followed by colon (potential port number here)
	var S_EMAIL_PORT = makeState$1(EMAIL); // (C) Email address with a port
	var S_MAILTO_EMAIL = makeState$1(MAILTOEMAIL); // Email that begins with the mailto prefix (D)
	var S_MAILTO_EMAIL_NON_ACCEPTING = makeState$1(); // (D) Followed by some non-query string chars
	var S_LOCALPART = makeState$1(); // Local part of the email address
	var S_LOCALPART_AT = makeState$1(); // Local part of the email address plus @
	var S_LOCALPART_DOT = makeState$1(); // Local part of the email address plus '.' (localpart cannot end in .)
	var S_NL = makeState$1(NL$1); // single new line

	// Make path from start to protocol (with '//')
	S_START$1.on(NL, S_NL).on(PROTOCOL, S_PROTOCOL).on(MAILTO, S_MAILTO$1).on(SLASH, S_PROTOCOL_SLASH);

	S_PROTOCOL.on(SLASH, S_PROTOCOL_SLASH);
	S_PROTOCOL_SLASH.on(SLASH, S_PROTOCOL_SLASH_SLASH);

	// The very first potential domain name
	S_START$1.on(TLD, S_DOMAIN$1).on(DOMAIN, S_DOMAIN$1).on(LOCALHOST, S_TLD).on(NUM, S_DOMAIN$1);

	// Force URL for protocol followed by anything sane
	S_PROTOCOL_SLASH_SLASH.on(TLD, S_URL).on(DOMAIN, S_URL).on(NUM, S_URL).on(LOCALHOST, S_URL);

	// Account for dots and hyphens
	// hyphens are usually parts of domain names
	S_DOMAIN$1.on(DOT, S_DOMAIN_DOT);
	S_EMAIL_DOMAIN.on(DOT, S_EMAIL_DOMAIN_DOT);

	// Hyphen can jump back to a domain name

	// After the first domain and a dot, we can find either a URL or another domain
	S_DOMAIN_DOT.on(TLD, S_TLD).on(DOMAIN, S_DOMAIN$1).on(NUM, S_DOMAIN$1).on(LOCALHOST, S_DOMAIN$1);

	S_EMAIL_DOMAIN_DOT.on(TLD, S_EMAIL).on(DOMAIN, S_EMAIL_DOMAIN).on(NUM, S_EMAIL_DOMAIN).on(LOCALHOST, S_EMAIL_DOMAIN);

	// S_TLD accepts! But the URL could be longer, try to find a match greedily
	// The `run` function should be able to "rollback" to the accepting state
	S_TLD.on(DOT, S_DOMAIN_DOT);
	S_EMAIL.on(DOT, S_EMAIL_DOMAIN_DOT);

	// Become real URLs after `SLASH` or `COLON NUM SLASH`
	// Here PSS and non-PSS converge
	S_TLD.on(COLON, S_TLD_COLON).on(SLASH, S_URL);
	S_TLD_COLON.on(NUM, S_TLD_PORT);
	S_TLD_PORT.on(SLASH, S_URL);
	S_EMAIL.on(COLON, S_EMAIL_COLON);
	S_EMAIL_COLON.on(NUM, S_EMAIL_PORT);

	// Types of characters the URL can definitely end in
	var qsAccepting = [DOMAIN, AT, LOCALHOST, NUM, PLUS, POUND, PROTOCOL, SLASH, TLD, UNDERSCORE, SYM, AMPERSAND];

	// Types of tokens that can follow a URL and be part of the query string
	// but cannot be the very last characters
	// Characters that cannot appear in the URL at all should be excluded
	var qsNonAccepting = [COLON, DOT, QUERY, PUNCTUATION, CLOSEBRACE, CLOSEBRACKET, CLOSEANGLEBRACKET, CLOSEPAREN, OPENBRACE, OPENBRACKET, OPENANGLEBRACKET, OPENPAREN];

	// These states are responsible primarily for determining whether or not to
	// include the final round bracket.

	// URL, followed by an opening bracket
	S_URL.on(OPENBRACE, S_URL_OPENBRACE).on(OPENBRACKET, S_URL_OPENBRACKET).on(OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(OPENPAREN, S_URL_OPENPAREN);

	// URL with extra symbols at the end, followed by an opening bracket
	S_URL_NON_ACCEPTING.on(OPENBRACE, S_URL_OPENBRACE).on(OPENBRACKET, S_URL_OPENBRACKET).on(OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(OPENPAREN, S_URL_OPENPAREN);

	// Closing bracket component. This character WILL be included in the URL
	S_URL_OPENBRACE.on(CLOSEBRACE, S_URL);
	S_URL_OPENBRACKET.on(CLOSEBRACKET, S_URL);
	S_URL_OPENANGLEBRACKET.on(CLOSEANGLEBRACKET, S_URL);
	S_URL_OPENPAREN.on(CLOSEPAREN, S_URL);
	S_URL_OPENBRACE_Q.on(CLOSEBRACE, S_URL);
	S_URL_OPENBRACKET_Q.on(CLOSEBRACKET, S_URL);
	S_URL_OPENANGLEBRACKET_Q.on(CLOSEANGLEBRACKET, S_URL);
	S_URL_OPENPAREN_Q.on(CLOSEPAREN, S_URL);
	S_URL_OPENBRACE_SYMS.on(CLOSEBRACE, S_URL);
	S_URL_OPENBRACKET_SYMS.on(CLOSEBRACKET, S_URL);
	S_URL_OPENANGLEBRACKET_SYMS.on(CLOSEANGLEBRACKET, S_URL);
	S_URL_OPENPAREN_SYMS.on(CLOSEPAREN, S_URL);

	// URL that beings with an opening bracket, followed by a symbols.
	// Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
	// has a single opening bracket for some reason).
	S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENANGLEBRACKET.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
	S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
	S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
	S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
	S_URL_OPENANGLEBRACKET.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
	S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

	// URL that begins with an opening bracket, followed by some symbols
	S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENANGLEBRACKET_Q.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
	S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
	S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENANGLEBRACKET_Q.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
	S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);

	S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
	S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
	S_URL_OPENANGLEBRACKET_SYMS.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
	S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
	S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
	S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
	S_URL_OPENANGLEBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
	S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

	// Account for the query string
	S_URL.on(qsAccepting, S_URL);
	S_URL_NON_ACCEPTING.on(qsAccepting, S_URL);

	S_URL.on(qsNonAccepting, S_URL_NON_ACCEPTING);
	S_URL_NON_ACCEPTING.on(qsNonAccepting, S_URL_NON_ACCEPTING);

	// Email address-specific state definitions
	// Note: We are not allowing '/' in email addresses since this would interfere
	// with real URLs

	// For addresses with the mailto prefix
	// 'mailto:' followed by anything sane is a valid email
	S_MAILTO$1.on(TLD, S_MAILTO_EMAIL).on(DOMAIN, S_MAILTO_EMAIL).on(NUM, S_MAILTO_EMAIL).on(LOCALHOST, S_MAILTO_EMAIL);

	// Greedily get more potential valid email values
	S_MAILTO_EMAIL.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
	S_MAILTO_EMAIL_NON_ACCEPTING.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);

	// For addresses without the mailto prefix
	// Tokens allowed in the localpart of the email
	var localpartAccepting = [DOMAIN, NUM, PLUS, POUND, QUERY, UNDERSCORE, SYM, AMPERSAND, TLD];

	// Some of the tokens in `localpartAccepting` are already accounted for here and
	// will not be overwritten (don't worry)
	S_DOMAIN$1.on(localpartAccepting, S_LOCALPART).on(AT, S_LOCALPART_AT);
	S_TLD.on(localpartAccepting, S_LOCALPART).on(AT, S_LOCALPART_AT);
	S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART);

	// Okay we're on a localpart. Now what?
	// TODO: IP addresses and what if the email starts with numbers?
	S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(AT, S_LOCALPART_AT) // close to an email address now
	.on(DOT, S_LOCALPART_DOT);
	S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
	S_LOCALPART_AT.on(TLD, S_EMAIL_DOMAIN).on(DOMAIN, S_EMAIL_DOMAIN).on(LOCALHOST, S_EMAIL);
	// States following `@` defined above

	var run$1 = function run$1(tokens) {
		var len = tokens.length;
		var cursor = 0;
		var multis = [];
		var textTokens = [];

		while (cursor < len) {
			var state = S_START$1;
			var secondState = null;
			var nextState = null;
			var multiLength = 0;
			var latestAccepting = null;
			var sinceAccepts = -1;

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
				for (var _i3 = cursor - multiLength; _i3 < cursor; _i3++) {
					textTokens.push(tokens[_i3]);
				}
			} else {

				// Accepting state!

				// First close off the textTokens (if available)
				if (textTokens.length > 0) {
					multis.push(new TEXT(textTokens));
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
			multis.push(new TEXT(textTokens));
		}

		return multis;
	};

	var parser = Object.freeze({
		State: TokenState,
		TOKENS: multi,
		run: run$1,
		start: S_START$1
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
		var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		var tokens = tokenize(str);
		var filtered = [];

		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (token.isLink && (!type || token.type === type)) {
				filtered.push(token.toObject());
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
		var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

	try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
});