'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = highlight;

var _justExtend = require('just-extend');

var _justExtend2 = _interopRequireDefault(_justExtend);

var _isServer = require('is-server');

var _isServer2 = _interopRequireDefault(_isServer);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'highlight';

function highlight(opts) {
	var defaultOptions = {
		name: name,
		regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
		prismjs: (0, _isServer2.default)() ? require('prismjs') : window.Prism,
		template: function template(args, options, _ref) {
			var prismjs = _ref.prismjs;

			var language = args[2];
			var code = args[3];
			var className = 'language-' + (language || 'markup');
			return '<pre class="' + className + '"><code class="' + className + '">' + prismjs.highlight(code, prismjs.languages[language || 'markup']) + '</code></pre>';
		}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts, {
		_replaceAnyways: true,
		_ignoreAnchorCheck: true,
		_ignoreInlineCheck: true
	});
	return (0, _base2.default)(pluginOptions);
}

highlight.id = name;