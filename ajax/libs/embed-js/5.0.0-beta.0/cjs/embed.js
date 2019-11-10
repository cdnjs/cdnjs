'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _justExtend = require('just-extend');

var _justExtend2 = _interopRequireDefault(_justExtend);

var _pWaterfall = require('p-waterfall');

var _pWaterfall2 = _interopRequireDefault(_pWaterfall);

var _isDom = require('is-dom');

var _isDom2 = _interopRequireDefault(_isDom);

var _dom = require('./utils/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import * as presets from './presets'
// import * as plugins from './plugins'

function isElementPresent(_ref) {
	var input = _ref.input,
	    target = _ref.target;

	return (0, _isDom2.default)(input) || target && (0, _isDom2.default)(target);
}

var EmbedJS = function () {
	function EmbedJS(options) {
		_classCallCheck(this, EmbedJS);

		var defaultOptions = {
			plugins: [],
			preset: null,
			inlineEmbed: true,
			replaceText: false,
			_embeds: [],
			_services: []
		};

		var input = options.input,
		    _options$plugins = options.plugins,
		    plugins = _options$plugins === undefined ? [] : _options$plugins,
		    preset = options.preset;

		if (!input) {
			throw new Error('You need to pass input element or string in the options object.');
		}

		var inputString = (0, _isDom2.default)(input) ? input.innerHTML : input;

		this.options = (0, _justExtend2.default)({}, defaultOptions, options, {
			result: inputString,
			plugins: preset ? plugins.concat(preset) : plugins,
			inputString: inputString
		});
	}

	_createClass(EmbedJS, [{
		key: 'text',
		value: function text() {
			var options = this.resetOptions();
			var transformers = options.plugins.map(function (p) {
				return p.transform;
			});
			return (0, _pWaterfall2.default)(transformers, options);
		}
	}, {
		key: 'resetOptions',
		value: function resetOptions() {
			return (0, _justExtend2.default)({}, this.options, {
				_embeds: []
			});
		}
	}, {
		key: 'load',
		value: function load() {
			var _this = this;

			this.options.plugins.forEach(function (p) {
				return p.onLoad && p.onLoad(_this.options);
			});
		}
	}, {
		key: 'render',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var _options, input, target, inlineEmbed, options, element;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_options = this.options, input = _options.input, target = _options.target, inlineEmbed = _options.inlineEmbed;

								if (isElementPresent(this.options)) {
									_context.next = 3;
									break;
								}

								throw new Error('You haven\'t passed the input as an element.');

							case 3:
								options = void 0;

								if (!((0, _isDom2.default)(input) && input.classList.contains('ejs-applied'))) {
									_context.next = 8;
									break;
								}

								options = this.options;
								_context.next = 14;
								break;

							case 8:
								_context.next = 10;
								return this.text();

							case 10:
								options = _context.sent;
								element = target || input;

								element.innerHTML = inlineEmbed ? options.result : (0, _dom.appendEmbedsAtEnd)(options);
								element.classList.add('ejs-applied');

							case 14:

								this.load();
								return _context.abrupt('return', options);

							case 16:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function render() {
				return _ref2.apply(this, arguments);
			}

			return render;
		}()
	}, {
		key: 'destroy',
		value: function destroy() {
			var _options2 = this.options,
			    inputString = _options2.inputString,
			    input = _options2.input,
			    target = _options2.target;

			if (!isElementPresent(this.options)) {
				throw new Error('You haven\'t passed the input as an element.');
			}
			var element = target || input;
			element.innerHTML = inputString;
			element.classList.remove('ejs-applied');
			return this.options;
		}
	}]);

	return EmbedJS;
}();

// EmbedJS.plugins = plugins
// EmbedJS.presets = presets


exports.default = EmbedJS;