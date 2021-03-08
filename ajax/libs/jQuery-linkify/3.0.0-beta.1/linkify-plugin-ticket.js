(function (exports, linkify) {
	'use strict';

	/**
		Ticket number detector
		TODO: Add cross-repo style tickets? e.g., SoapBox/linkifyjs#42
		Is that even feasible?
	*/

	var ticket = function ticket(_ref) {
	  var scanner = _ref.scanner,
	      parser = _ref.parser,
	      utils = _ref.utils;
	  var _scanner$tokens = scanner.tokens,
	      POUND = _scanner$tokens.POUND,
	      NUM = _scanner$tokens.NUM;
	  var START_STATE = parser.start;
	  var Ticket = utils.createTokenClass('ticket', {
	    isLink: true
	  });
	  var HASH_STATE = START_STATE.tt(POUND);
	  HASH_STATE.tt(NUM, Ticket);
	};
	linkify.registerPlugin('ticket', ticket);

	exports.ticket = ticket;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}, linkify));
