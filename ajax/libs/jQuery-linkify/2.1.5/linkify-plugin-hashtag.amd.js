define('linkify/plugins/hashtag', ['module', 'exports'], function (module, exports) {
	'use strict';

	try { try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
	exports['default'] = hashtag;
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
	module.exports = exports['default'];
});
require(['linkify', 'linkify/plugins/hashtag'], function (linkify, hashtag) {
	hashtag(linkify);
});