"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = facebook;

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _withoutDetailTemplate = require("../utils/without-detail-template");

var _withoutDetailTemplate2 = _interopRequireDefault(_withoutDetailTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "facebook";

function facebook(opts) {
	var defaultOptions = {
		name: name,
		regex: /(https?:\/\/)?www\.facebook\.com\/(?:(videos|posts)\.php\?v=\d+|.*?\/(videos|posts)\/\d+\/?)/gi,
		height: 225,
		template: function template(args, options, _ref) {
			var height = _ref.height;

			var url = args[0];
			var type = url.indexOf("/videos/") < 0 ? "post" : "video";
			return (0, _withoutDetailTemplate2.default)("https://www.facebook.com/plugins/" + type + ".php?href=" + url, height, name);
		}
	};

	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);
	return (0, _base2.default)(pluginOptions);
}

facebook.id = name;