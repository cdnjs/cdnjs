"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Fetch the html content from the API
 * @param url
 * @param args
 * @param omitScript
 * @param maxWidth
 * @param hideMedia
 * @param hideThread
 * @param align
 * @param lang
 * @param theme
 * @param linkColor
 * @param widgetType
 * @returns {Promise.<*>}
 */
var _process = function () {
	var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args, options, _ref) {
		var omitScript = _ref.omitScript,
		    maxWidth = _ref.maxWidth,
		    hideMedia = _ref.hideMedia,
		    hideThread = _ref.hideThread,
		    align = _ref.align,
		    lang = _ref.lang,
		    theme = _ref.theme,
		    linkColor = _ref.linkColor,
		    widgetType = _ref.widgetType;
		var params, apiUrl, res;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						params = {
							url: args[0],
							omitScript: omitScript,
							maxWidth: maxWidth,
							hideMedia: hideMedia,
							hideThread: hideThread,
							align: align,
							lang: lang,
							theme: theme,
							linkColor: linkColor,
							widgetType: widgetType
						};
						_context.prev = 1;
						apiUrl = "https://api.twitter.com/1/statuses/oembed.json?" + (0, _getQuery2.default)(params);
						_context.next = 5;
						return (0, _jsonp2.default)(apiUrl);

					case 5:
						res = _context.sent;
						_context.next = 8;
						return res.json();

					case 8:
						return _context.abrupt("return", _context.sent);

					case 11:
						_context.prev = 11;
						_context.t0 = _context["catch"](1);
						return _context.abrupt("return", {
							html: ""
						});

					case 14:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[1, 11]]);
	}));

	return function _process(_x, _x2, _x3) {
		return _ref2.apply(this, arguments);
	};
}();

exports.default = twitter;

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _jsonp = require("../utils/jsonp");

var _jsonp2 = _interopRequireDefault(_jsonp);

var _isDom = require("is-dom");

var _isDom2 = _interopRequireDefault(_isDom);

var _isServer = require("is-server");

var _isServer2 = _interopRequireDefault(_isServer);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _getQuery = require("../utils/getQuery");

var _getQuery2 = _interopRequireDefault(_getQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// in umd build this resolves to unfetch


var name = "twitter";

function renderTweet(_ref3, _ref4) {
	var input = _ref3.input,
	    _services = _ref3._services;
	var twttr = _ref4.twttr,
	    onLoad = _ref4.onLoad;

	if (!(0, _isDom2.default)(input)) {
		throw new Error("input should be a DOM element to embed tweet.");
	}
	if (_services.indexOf("twitter") >= 0) {
		twttr.widgets.load(input);
		twttr.events.bind("loaded", onLoad);
	}
}

function twitter(opts) {
	var defaultOptions = {
		name: name,
		// Regex that matches the string and sends to the template method.
		regex: /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi,

		// The maximum width of a rendered Tweet in whole pixels.
		// This value must be between 220 and 550 inclusive. A supplied
		// value under or over the allowed range will be returned as the
		// minimum or maximum supported width respectively; the reset width
		// value will be reflected in the returned width property. Note that
		// Twitter does not support the oEmbed maxheight parameter. Tweets
		// are fundamentally text, and are therefore of unpredictable height
		// that cannot be scaled like an image or video. Relatedly, the
		// oEmbed response will not provide a value for height. Implementations
		// that need consistent heights for Tweets should refer to the hide_thread
		// and hide_media parameters below.
		maxWidth: 550,

		// When set to true , t, or 1 links in a Tweet are not expanded to photo,
		// video, or link previews
		hideMedia: false,

		// When set to true , t, or 1 a collapsed version of the previous Tweet
		// in a conversation thread will not be displayed when the requested Tweet
		// is in reply to another Tweet
		hideThread: false,

		// Specifies whether the embedded Tweet should be floated left,
		// right, or center in the page relative to the parent element.
		// Valid values are left, right, center, and none
		align: "none",

		// Request returned HTML and a rendered Tweet in the specified Twitter
		// language supported by embedded Tweets. https://dev.twitter.com/web/overview/languages
		lang: "en",

		// When set to dark, the Tweet is displayed with light text over a dark background
		theme: "light",

		// Adjust the color of Tweet text links with a hexadecimal color value
		linkColor: "#355acee",

		// Set to video to return a Twitter Video embed for the given Tweet
		widgetType: "",

		/**
   * It accepts the matching url and returns the html
   * content that replaces or appends to the URL based
   * on options. This can return a asynchronous response.
   * @param args
   * @param options
   * @param pluginOptions
   * @param html
   * @returns {Promise.<*>}
   */
		template: function template(args, options, pluginOptions, _ref5) {
			var html = _ref5.html;

			return html;
		},


		// If you want to load the twitter widget script with the tweet itself
		// turn this option to false. Else you have to load it externally.
		omitScript: true,

		// The twitter object loaded from widgets.js. By default it takes twttr
		// from window object.
		twttr: !(0, _isServer2.default)() ? window.twttr : null,

		// This is for internal use only. Executes when
		// the tweet has been loaded
		// and rendered on the client side
		_onLoadInternal: function _onLoadInternal(options, pluginOptions) {
			renderTweet(options, pluginOptions);
		},


		// executed when the tweet has been loaded
		// and rendered on the client side
		onLoad: function onLoad() {}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts, {
		_process: _process
	});
	return (0, _base2.default)(pluginOptions);
}

twitter.id = name;