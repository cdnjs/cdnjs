'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@fullcalendar/core');
var interactionPlugin = require('@fullcalendar/interaction');
var dayGridPlugin = require('@fullcalendar/daygrid');
var timeGridPlugin = require('@fullcalendar/timegrid');
var listPlugin = require('@fullcalendar/list');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var interactionPlugin__default = /*#__PURE__*/_interopDefaultLegacy(interactionPlugin);
var dayGridPlugin__default = /*#__PURE__*/_interopDefaultLegacy(dayGridPlugin);
var timeGridPlugin__default = /*#__PURE__*/_interopDefaultLegacy(timeGridPlugin);
var listPlugin__default = /*#__PURE__*/_interopDefaultLegacy(listPlugin);

core.globalPlugins.push(interactionPlugin__default["default"], dayGridPlugin__default["default"], timeGridPlugin__default["default"], listPlugin__default["default"]);

Object.keys(core).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return core[k]; }
	});
});
Object.keys(interactionPlugin).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return interactionPlugin[k]; }
	});
});
