this.primevue = this.primevue || {};
this.primevue.themes = (function (exports, actions, config, helpers, service, utils) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var config__default = /*#__PURE__*/_interopDefaultLegacy(config);
	var service__default = /*#__PURE__*/_interopDefaultLegacy(service);



	Object.defineProperty(exports, 'default', {
		enumerable: true,
		get: function () { return config__default["default"]; }
	});
	Object.defineProperty(exports, 'ThemeService', {
		enumerable: true,
		get: function () { return service__default["default"]; }
	});
	Object.keys(actions).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return actions[k]; }
		});
	});
	Object.keys(helpers).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return helpers[k]; }
		});
	});
	Object.keys(utils).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return utils[k]; }
		});
	});

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, primevue.themes.actions, primevue.themes.config, primevue.themes.helpers, primevue.themes.service, primevue.themes.utils);
