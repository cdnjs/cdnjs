'use strict';

;(function (linkify) {
	var plugin = function () {
		'use strict';

		/**
  	Ticket number detector
  	TODO: Add cross-repo style tickets? e.g., SoapBox/linkifyjs#42
  	Is that even feasible?
  */

		function ticket(linkify) {
			var TT = linkify.scanner.TOKENS; // Base Multi token class
			var MultiToken = linkify.parser.TOKENS.Base;
			var S_START = linkify.parser.start;

			function TICKET(value) {
				this.v = value;
			}

			linkify.inherits(MultiToken, TICKET, {
				type: 'ticket',
				isLink: true
			});

			var S_HASH = S_START.jump(TT.POUND);
			var S_TICKET = new linkify.parser.State(TICKET);

			S_HASH.on(TT.NUM, S_TICKET);
		}

		return ticket;
	}();
	plugin(linkify);
})(linkify);