(function (factory) {
	if (typeof define === "function" && define.amd) {
		define("inputmask.dependencyLib", ["jquery"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
}
(function ($) {
	window.dependencyLib = $;
	return $;
}));
