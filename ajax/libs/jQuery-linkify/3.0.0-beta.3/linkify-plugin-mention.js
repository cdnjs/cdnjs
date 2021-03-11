(function (exports, linkify) {
	'use strict';

	/**
		Mention parser plugin for linkify
	*/
	var mention = function mention(_ref) {
	  var scanner = _ref.scanner,
	      parser = _ref.parser,
	      utils = _ref.utils;
	  var _scanner$tokens = scanner.tokens,
	      DOMAIN = _scanner$tokens.DOMAIN,
	      LOCALHOST = _scanner$tokens.LOCALHOST,
	      TLD = _scanner$tokens.TLD,
	      NUM = _scanner$tokens.NUM,
	      SLASH = _scanner$tokens.SLASH,
	      UNDERSCORE = _scanner$tokens.UNDERSCORE,
	      DOT = _scanner$tokens.DOT,
	      AT = _scanner$tokens.AT;
	  var START_STATE = parser.start;
	  var Mention = utils.createTokenClass('mention', {
	    isLink: true,
	    toHref: function toHref() {
	      return '/' + this.toString().substr(1);
	    }
	  }); // @

	  var AT_STATE = START_STATE.tt(AT); // @
	  // @_,

	  var AT_SYMS_STATE = AT_STATE.tt(UNDERSCORE); //  @_*

	  AT_SYMS_STATE.tt(UNDERSCORE, AT_SYMS_STATE);
	  AT_SYMS_STATE.tt(DOT, AT_SYMS_STATE); // Valid mention (not made up entirely of symbols)

	  var MENTION_STATE = AT_STATE.tt(DOMAIN, Mention);
	  AT_STATE.tt(TLD, MENTION_STATE);
	  AT_STATE.tt(LOCALHOST, MENTION_STATE);
	  AT_STATE.tt(NUM, MENTION_STATE); // @[_.]* + valid mention

	  AT_SYMS_STATE.tt(DOMAIN, MENTION_STATE);
	  AT_SYMS_STATE.tt(LOCALHOST, MENTION_STATE);
	  AT_SYMS_STATE.tt(TLD, MENTION_STATE);
	  AT_SYMS_STATE.tt(NUM, MENTION_STATE); // More valid mentions

	  MENTION_STATE.tt(DOMAIN, MENTION_STATE);
	  MENTION_STATE.tt(LOCALHOST, MENTION_STATE);
	  MENTION_STATE.tt(TLD, MENTION_STATE);
	  MENTION_STATE.tt(NUM, MENTION_STATE);
	  MENTION_STATE.tt(UNDERSCORE, MENTION_STATE); // Mention with a divider

	  var MENTION_DIVIDER_STATE = MENTION_STATE.tt(SLASH);
	  MENTION_STATE.tt(SLASH, MENTION_DIVIDER_STATE);
	  MENTION_STATE.tt(DOT, MENTION_DIVIDER_STATE);
	  MENTION_STATE.tt(AT, MENTION_DIVIDER_STATE); // Mention _ trailing stash plus syms

	  var MENTION_DIVIDER_SYMS_STATE = MENTION_DIVIDER_STATE.tt(UNDERSCORE);
	  MENTION_DIVIDER_SYMS_STATE.tt(UNDERSCORE, MENTION_DIVIDER_SYMS_STATE); // Once we get a word token, mentions can start up again

	  MENTION_DIVIDER_STATE.tt(DOMAIN, MENTION_STATE);
	  MENTION_DIVIDER_STATE.tt(LOCALHOST, MENTION_STATE);
	  MENTION_DIVIDER_STATE.tt(TLD, MENTION_STATE);
	  MENTION_DIVIDER_STATE.tt(NUM, MENTION_STATE);
	  MENTION_DIVIDER_SYMS_STATE.tt(DOMAIN, MENTION_STATE);
	  MENTION_DIVIDER_SYMS_STATE.tt(LOCALHOST, MENTION_STATE);
	  MENTION_DIVIDER_SYMS_STATE.tt(TLD, MENTION_STATE);
	  MENTION_DIVIDER_SYMS_STATE.tt(NUM, MENTION_STATE);
	};
	linkify.registerPlugin('mention', mention);

	exports.mention = mention;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}, linkify));
