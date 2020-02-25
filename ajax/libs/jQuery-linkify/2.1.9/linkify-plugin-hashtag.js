'use strict';

;(function (linkify) {
	var plugin = function () {
		'use strict';

		/**
  	Quick Hashtag parser plugin for linkify
  */

		function hashtag(linkify) {
			var TT = linkify.scanner.TOKENS; // Text tokens
			var MultiToken = linkify.parser.TOKENS.Base; // Base Multi token class
			var S_START = linkify.parser.start;

			function HASHTAG(value) {
				this.v = value;
			}

			linkify.inherits(MultiToken, HASHTAG, {
				type: 'hashtag',
				isLink: true
			});

			var S_HASH = S_START.jump(TT.POUND);
			var S_HASHTAG = new linkify.parser.State(HASHTAG);

			S_HASH.on(TT.DOMAIN, S_HASHTAG);
			S_HASH.on(TT.TLD, S_HASHTAG);
			S_HASH.on(TT.LOCALHOST, S_HASHTAG);
		}

		return hashtag;
	}();

	plugin(linkify);
})(linkify);