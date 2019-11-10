"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = basicImage;

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'media';

var image = ['gif', 'jpg', 'jpeg', 'tiff', 'png', 'svg', 'webp'];
var video = ['ogv', 'webm', 'mp4'];
var audio = ['wav', 'mp3', 'ogg'];

function basicImage(opts) {
	var defaultOptions = {
		name: name,
		regex: new RegExp("(?:https?)://\\S*\\.(?:" + image.concat(video, audio).join('|') + ")", 'gi'),
		template: function template(args) {
			var url = args[0];
			var ext = url.split('.').slice(-1)[0];
			if (image.indexOf(ext) >= 0) {
				return "<img class=\"ejs-embed\" src=\"" + url + "\"/>";
			} else if (video.indexOf(ext) >= 0) {
				return "<video src=\"" + url + "\" controls class=\"ejs-video\"></video>";
			} else if (audio.indexOf(ext) >= 0) {
				return "<audio src=\"" + url + "\" controls class=\"ejs-audio\"></audio>";
			}
		}
	};
	var pluginOptions = (0, _justExtend2.default)({}, defaultOptions, opts);
	return (0, _base2.default)(pluginOptions);
}

basicImage.id = name;