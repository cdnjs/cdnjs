(function (exports, linkifyjs) {
	'use strict';

	/**
		Ticket number detector
	*/

	var ticket = function ticket(_ref) {
	  var scanner = _ref.scanner,
	      parser = _ref.parser,
	      utils = _ref.utils;
	  // TODO: Add cross-repo style tickets? e.g., Hypercontext/linkifyjs#42
	  // Is that even feasible?
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
	linkifyjs.registerPlugin('ticket', ticket);

	exports.ticket = ticket;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, linkify);
