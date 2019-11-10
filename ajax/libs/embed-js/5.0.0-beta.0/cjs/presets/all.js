"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (options) {
	var defaultOptions = {
		exclude: []
	};

	var presetOptions = (0, _justExtend2.default)({}, defaultOptions, options);

	var pluginNames = [_plugins.url, _plugins.emoji, _plugins.github, _plugins.noEmbed, _plugins.youtube, _plugins.facebook, _plugins.highlight, _plugins.media, _plugins.instagram];
	var plugins = pluginNames.map(function (plugin) {
		var id = plugin.id;

		var pluginOptions = presetOptions[id];

		if (presetOptions.exclude.indexOf(plugin.id) === -1) {
			if (id === "youtube" || id === "map") {
				return plugin((0, _justExtend2.default)({}, {
					gAuthKey: options.gAuthKey
				}, pluginOptions));
			} else if (id === "noEmbed") {
				return plugin((0, _justExtend2.default)({}, pluginOptions, {
					exclude: ["youtube"]
				}));
			}
			return plugin(pluginOptions);
		}
		return null;
	});

	return plugins.filter(function (plugin) {
		return !!plugin;
	});
};

var _plugins = require("../plugins");

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }