"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (_ref, thumbClassName) {
	var url = _ref.url,
	    title = _ref.title,
	    embedUrl = _ref.embedUrl,
	    description = _ref.description,
	    thumbnail = _ref.thumbnail;

	return "<div class=\"ejs-preview ejs-embed\"><div class=\"ejs-thumb " + thumbClassName + "\" data-url=\"" + embedUrl + "\" style=\"background-image:url(" + thumbnail + ")\"><span>&#9658;</span></div><div class=\"ejs-info\"><h4 class=\"ejs-title\"><a href=\"" + url + "\">" + title + "</a></h4><div class=\"ejs-desc\">" + (0, _justTruncate2.default)(description, 150) + "</div></div></div>";
};

var _justTruncate = require("just-truncate");

var _justTruncate2 = _interopRequireDefault(_justTruncate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }