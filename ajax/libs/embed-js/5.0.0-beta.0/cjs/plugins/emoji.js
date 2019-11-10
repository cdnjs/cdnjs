'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = emoji;

var _justExtend = require('just-extend');

var _justExtend2 = _interopRequireDefault(_justExtend);

var _regexEmoji = require('regex-emoji');

var _regexEmoji2 = _interopRequireDefault(_regexEmoji);

var _justKebabCase = require('just-kebab-case');

var _justKebabCase2 = _interopRequireDefault(_justKebabCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "emoji";

// You need emoji.css to run with this plugin. Else you need to pass the
// template suitable to your needs.
function emoji(opts) {
	var defaultOptions = {
		name: name,
		regex: (0, _regexEmoji2.default)(),
		template: function template(emojiName) {
			return '<span class="ec ec-' + (0, _justKebabCase2.default)(emojiName) + '"></span>';
		}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);
	return {
		transform: function transform(options) {
			return Promise.resolve((0, _justExtend2.default)({}, options, {
				result: options.result.replace(pluginOptions.regex, function (match, emojiName) {
					options._services.push({ name: name, match: match });
					return pluginOptions.template(emojiName, options, pluginOptions);
				})
			}));
		}
	};
}

emoji.id = name;