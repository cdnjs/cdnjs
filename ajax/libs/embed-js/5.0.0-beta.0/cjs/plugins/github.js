"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _process = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
		var _args, user, repo, res;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_args = _slicedToArray(args, 3), user = _args[1], repo = _args[2];
						_context.prev = 1;
						_context.next = 4;
						return (0, _fetch2.default)("https://api.github.com/repos/" + user + "/" + repo);

					case 4:
						res = _context.sent;
						return _context.abrupt("return", res.json());

					case 8:
						_context.prev = 8;
						_context.t0 = _context["catch"](1);
						return _context.abrupt("return", {});

					case 11:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[1, 8]]);
	}));

	return function _process(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = github;

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _fetch = require("../utils/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _withDetailsTemplate = require("../utils/with-details-template");

var _withDetailsTemplate2 = _interopRequireDefault(_withDetailsTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = 'github';

function github(opts) {
	var defaultOptions = {
		name: name,
		regex: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+[^\.])/gi,

		template: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args, options, pluginOptions, _ref2) {
				var owner = _ref2.owner,
				    description = _ref2.description,
				    html_url = _ref2.html_url,
				    full_name = _ref2.full_name;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt("return", (0, _withDetailsTemplate2.default)({
									thumbnail: owner.avatar_url,
									url: html_url,
									description: description,
									title: full_name
								}));

							case 1:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function template(_x2, _x3, _x4, _x5) {
				return _ref3.apply(this, arguments);
			}

			return template;
		}()
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts, {
		_process: _process
	});
	return (0, _base2.default)(pluginOptions);
}

github.id = name;