'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = instagram;

var _justExtend = require('just-extend');

var _justExtend2 = _interopRequireDefault(_justExtend);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'instagram';

function instagram(opts) {
	var defaultOptions = {
		name: name,
		height: 440,
		regex: /((https?:\/\/)(www\.)?instagram.com\/p\/[a-zA-Z0-9_\-\=]+)(\/\?[a-zA-Z0-9_\-\=]+)?/gi,
		template: function template(args, options, _ref) {
			var width = _ref.width,
			    height = _ref.height;

			return '<iframe class="ejs-embed ejs-instagram" src="' + args[1] + '/embed" height="' + height + '"></iframe>';
		}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);
	return (0, _base2.default)(pluginOptions);
}

instagram.id = name;