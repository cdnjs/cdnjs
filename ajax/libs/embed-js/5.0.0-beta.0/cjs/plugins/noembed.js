"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Fetches the data from the noembed API
 * @param args
 * @returns {Promise.<*>}
 */
var _process = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
		var url, res;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						url = args[0];
						_context.prev = 1;
						_context.next = 4;
						return (0, _fetch2.default)("https://noembed.com/embed?url=" + url);

					case 4:
						res = _context.sent;
						_context.next = 7;
						return res.json();

					case 7:
						return _context.abrupt("return", _context.sent);

					case 10:
						_context.prev = 10;
						_context.t0 = _context["catch"](1);
						return _context.abrupt("return", {
							html: url
						});

					case 13:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[1, 10]]);
	}));

	return function _process(_x) {
		return _ref.apply(this, arguments);
	};
}();

var _fetch = require("../utils/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _isServer = require("is-server");

var _isServer2 = _interopRequireDefault(_isServer);

var _isDom = require("is-dom");

var _isDom2 = _interopRequireDefault(_isDom);

var _noembedRegex = require("../utils/noembed-regex");

var _noembedRegex2 = _interopRequireDefault(_noembedRegex);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = "noEmbed";

function noEmbed() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var defaultOptions = {
		name: name,
		// Regex to be used to identify noembed supported services.
		// By default it takes from noembed-regex.js
		regex: null,

		// In case you want to exclude a few services, you can do it here.
		// It accepts an array of service names in lowercase.
		exclude: [],

		twttr: !(0, _isServer2.default)() ? window.twttr : null,

		onLoad: function onLoad() {},
		template: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args, options, pluginOptions, _ref2) {
				var html = _ref2.html;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt("return", "<div class=\"ejs-embed\">" + html + "</div>");

							case 1:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function template(_x3, _x4, _x5, _x6) {
				return _ref3.apply(this, arguments);
			}

			return template;
		}(),
		_onLoadInternal: function _onLoadInternal(_ref4, _ref5) {
			var input = _ref4.input,
			    result = _ref4.result;
			var twttr = _ref5.twttr,
			    onLoad = _ref5.onLoad;

			if ((0, _noembedRegex.isServicePresent)('twitter', result) && twttr && (0, _isDom2.default)(input)) {
				twttr.widgets.load(input);
				twttr.events.bind("loaded", onLoad);
			}
		}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts, {
		_process: _process
	});

	if (!opts.regex) {
		pluginOptions.regex = (0, _noembedRegex2.default)(pluginOptions.exclude);
	}

	return (0, _base2.default)(pluginOptions);
}

noEmbed.id = name;

exports.default = noEmbed;