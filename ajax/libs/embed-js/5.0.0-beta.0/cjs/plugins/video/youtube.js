"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Fetch details of a particular youtube video
 * @param id
 * @param gAuthKey
 * @returns {Promise.<*>}
 */
var fetchDetails = function () {
	var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id, gAuthKey) {
		var res, data;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return (0, _fetch2.default)("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + gAuthKey + "&part=snippet,statistics");

					case 3:
						res = _context.sent;
						_context.next = 6;
						return res.json();

					case 6:
						data = _context.sent;
						return _context.abrupt("return", data.items[0]);

					case 10:
						_context.prev = 10;
						_context.t0 = _context["catch"](0);
						return _context.abrupt("return", {});

					case 13:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 10]]);
	}));

	return function fetchDetails(_x, _x2) {
		return _ref2.apply(this, arguments);
	};
}();

/**
 * Function executed when a content is rendered on the client site.
 * @param input
 * @param clickClass
 * @param onVideoShow
 * @param height
 */


var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _isDom = require("is-dom");

var _isDom2 = _interopRequireDefault(_isDom);

var _youtubeRegex = require("youtube-regex");

var _youtubeRegex2 = _interopRequireDefault(_youtubeRegex);

var _fetch = require("../../utils/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _withDetailsTemplate = require("../../utils/with-details-template");

var _withDetailsTemplate2 = _interopRequireDefault(_withDetailsTemplate);

var _withoutDetailTemplate = require("../../utils/without-detail-template");

var _withoutDetailTemplate2 = _interopRequireDefault(_withoutDetailTemplate);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = 'youtube';
var baseUrl = 'https://www.youtube.com/';

/**
 * Decorate data into a simpler structure
 * @param data
 * @returns {{title, thumbnail, rawDescription, views: *, likes: *, description: *, url: string, id, host: string}}
 */
function formatData(_ref) {
	var snippet = _ref.snippet,
	    id = _ref.id;

	return {
		title: snippet.title,
		thumbnail: snippet.thumbnails.medium.url,
		description: snippet.description,
		url: baseUrl + "watch?v=" + id,
		embedUrl: baseUrl + "embed/" + id
	};
}function onLoad(_ref3, _ref4) {
	var input = _ref3.input;
	var clickClass = _ref4.clickClass,
	    onVideoShow = _ref4.onVideoShow,
	    height = _ref4.height;

	if (!(0, _isDom2.default)(input)) {
		throw new Error("input should be a DOM Element.");
	}
	var classes = document.getElementsByClassName(clickClass);
	for (var i = 0; i < classes.length; i++) {
		classes[i].onclick = function () {
			var url = this.getAttribute("data-url");
			onVideoShow(url);
			url += "?autoplay=1";
			this.parentNode.innerHTML = (0, _withoutDetailTemplate2.default)(url, height, name);
		};
	}
}

function _process(args, options, _ref5) {
	var gAuthKey = _ref5.gAuthKey,
	    details = _ref5.details;

	return details && fetchDetails(args[1], gAuthKey);
}

function youtube(opts) {
	var defaultOptions = {
		name: name,
		regex: (0, _youtubeRegex2.default)(),
		gAuthKey: "",
		details: true,
		height: 300,
		clickClass: "ejs-video-thumb",
		onVideoShow: function onVideoShow() {},
		_onLoadInternal: function _onLoadInternal(options, pluginOptions) {
			onLoad(options, pluginOptions);
		},
		onLoad: function onLoad() {},
		template: function () {
			var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args, options, _ref6, data) {
				var details = _ref6.details,
				    height = _ref6.height,
				    clickClass = _ref6.clickClass;
				var embedUrl;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								embedUrl = baseUrl + "embed/" + args[1];
								return _context2.abrupt("return", details ? (0, _withDetailsTemplate2.default)(formatData(data), clickClass) : (0, _withoutDetailTemplate2.default)(embedUrl, height, name));

							case 2:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function template(_x3, _x4, _x5, _x6) {
				return _ref7.apply(this, arguments);
			}

			return template;
		}()
	};

	if (!opts.gAuthKey) {
		throw new Error("You need to pass google auth key.");
	}

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts, {
		_process: _process
	});
	return (0, _base2.default)(pluginOptions);
}

youtube.id = name;

exports.default = youtube;