"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _process = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
		var location, res, data;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						location = args[1];
						_context.next = 3;
						return (0, _fetch2.default)("http://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&sensor=false");

					case 3:
						res = _context.sent;
						_context.next = 6;
						return res.json();

					case 6:
						data = _context.sent;
						return _context.abrupt("return", data.results[0].geometry.location);

					case 8:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function _process(_x) {
		return _ref.apply(this, arguments);
	};
}();

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _fetch = require("../utils/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _withoutDetailTemplate = require("../utils/without-detail-template");

var _withoutDetailTemplate2 = _interopRequireDefault(_withoutDetailTemplate);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = "map";

function map(opts) {
	var defaultOptions = {
		name: name,
		regex: /@\((.+)\)/gi,
		mode: "place",
		height: 300,
		gAuthKey: "",

		template: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args, options, _ref2, _ref3) {
				var mode = _ref2.mode,
				    gAuthKey = _ref2.gAuthKey,
				    height = _ref2.height;
				var lat = _ref3.lat,
				    lng = _ref3.lng;
				var location, base, src;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								location = args[1];
								base = "https://www.google.com/maps/embed/v1/" + mode + "?key=" + gAuthKey;
								src = void 0;

								if (mode === "place") {
									src = base + "&q=" + location;
								} else if (mode === "streetview") {
									src = base + "&location=" + lat + "," + lng + "&heading=210&pitch=10&fov=35";
								} else if (mode === "view") {
									src = base + "&center=" + lat + "," + lng + "&zoom=18&maptype=satellite";
								}

								return _context2.abrupt("return", (0, _withoutDetailTemplate2.default)(src, height, name));

							case 5:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function template(_x2, _x3, _x4, _x5) {
				return _ref4.apply(this, arguments);
			}

			return template;
		}()
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts, {
		_process: _process,
		_ignoreAnchorCheck: true
	});
	return (0, _base2.default)(pluginOptions);
}

map.id = "map";

exports.default = map;