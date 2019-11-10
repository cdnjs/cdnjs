"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _dom = require("../utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (opts) {
	var defaultOptions = {
		_replaceAnyways: false,
		_ignoreAnchorCheck: false,
		_ignoreInlineCheck: false,
		onLoad: function onLoad() {}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);

	var _onLoadInternal = pluginOptions._onLoadInternal,
	    _onLoad = pluginOptions.onLoad,
	    regex = pluginOptions.regex,
	    template = pluginOptions.template;


	if (!regex) {
		throw new Error("regex not passed.");
	}
	if (!template) {
		throw new Error("template not passed.");
	}

	return {
		transform: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.t0 = _justExtend2.default;
								_context.t1 = {};
								_context.t2 = options;
								_context.next = 5;
								return (0, _dom.insert)(options, pluginOptions);

							case 5:
								_context.t3 = _context.sent;
								return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2, _context.t3));

							case 7:
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
		}(),
		onLoad: function onLoad(options) {
			if (_onLoadInternal) {
				_onLoadInternal(options, pluginOptions);
			}
			if (_onLoad) {
				_onLoad(options, pluginOptions);
			}
		}
	};
};