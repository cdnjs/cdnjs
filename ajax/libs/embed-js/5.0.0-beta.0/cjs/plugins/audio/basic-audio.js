"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'basicAudio';

function basicAudio(opts) {
	var defaultOptions = {
		name: name,
		regex: /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi,
		template: function template(args) {
			return "<audio src=\"" + args[1] + "\" controls class=\"ejs-audio\"></audio>";
		}
	};
	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);
	return (0, _base2.default)(pluginOptions);
}

basicAudio.id = name;
exports.default = basicAudio;