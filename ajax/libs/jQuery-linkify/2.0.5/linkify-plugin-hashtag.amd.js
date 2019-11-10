define('linkify/plugins/hashtag', ['module', 'exports'], function (module, exports) {
	'use strict';

	try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; }
	exports['default'] = hashtag;
	/**
 	Quick Hashtag parser plugin for linkify
 */
	function hashtag(linkify) {
		var TT = linkify.scanner.TOKENS,
		    // Text tokens
		MT = linkify.parser.TOKENS,
		    // Multi tokens
		MultiToken = MT.Base,
		    S_START = linkify.parser.start,
		    S_HASH = void 0,
		    S_HASHTAG = void 0;

		function HASHTAG(value) {
			this.v = value;
		}

		linkify.inherits(MultiToken, HASHTAG, {
			type: 'hashtag',
			isLink: true
		});

		S_HASH = new linkify.parser.State();
		S_HASHTAG = new linkify.parser.State(HASHTAG);

		S_START.on(TT.POUND, S_HASH);
		S_HASH.on(TT.DOMAIN, S_HASHTAG);
		S_HASH.on(TT.TLD, S_HASHTAG);
	}
	module.exports = exports['default'];
});
require(['linkify', 'linkify/plugins/hashtag'], function (linkify, hashtag) {
	hashtag(linkify);
});