define('linkify/plugins/hashtag', ['module', 'exports'], function (module, exports) {
	'use strict';

	try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; }
	exports['default'] = hashtag;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

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

		var HASHTAG = function (_MultiToken) {
			_inherits(HASHTAG, _MultiToken);

			function HASHTAG(value) {
				_classCallCheck(this, HASHTAG);

				var _this = _possibleConstructorReturn(this, _MultiToken.call(this, value));

				_this.type = 'hashtag';
				_this.isLink = true;
				return _this;
			}

			return HASHTAG;
		}(MultiToken);

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