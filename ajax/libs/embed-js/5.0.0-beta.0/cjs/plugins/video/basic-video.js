'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = basicVideo;

var _justExtend = require('just-extend');

var _justExtend2 = _interopRequireDefault(_justExtend);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'basicVideo';

function basicVideo(opts) {
	var defaultOptions = {
		name: name,
		regex: /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi,
		template: function template(args) {
			return '<video src="' + args[0] + '" controls class="ejs-video"></video>';
		}
	};
	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);
	return (0, _base2.default)(pluginOptions);
}

basicVideo.id = name;