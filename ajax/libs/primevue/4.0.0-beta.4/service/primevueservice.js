this.primevue = this.primevue || {};
this.primevue.service = (function (exports, utils) {
	'use strict';

	var PrimeVueService = utils.EventBus();

	exports["default"] = PrimeVueService;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, primevue.utils);
