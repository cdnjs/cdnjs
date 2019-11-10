"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = url;

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _htmlLinkify = require("html-linkify");

var _htmlLinkify2 = _interopRequireDefault(_htmlLinkify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = "url";

function url(opts) {
	var defaultOptions = {
		attributes: {},

		// setting this to true will mess up characters like "
		escape: false
	};

	var _extend = (0, _justExtend2.default)({}, defaultOptions, opts),
	    attributes = _extend.attributes,
	    escape = _extend.escape;

	return {
		transform: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt("return", (0, _justExtend2.default)({}, options, {
									result: (0, _htmlLinkify2.default)(options.result, { attributes: attributes, escape: escape })
								}));

							case 1:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function transform(_x) {
				return _ref.apply(this, arguments);
			}

			return transform;
		}()
	};
}

url.id = name;