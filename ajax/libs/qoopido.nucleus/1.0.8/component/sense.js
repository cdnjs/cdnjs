/*! /component/sense 1.0.8 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(t){"use strict";function e(t,e){function i(i){var c=t.prototype.constructor.call(this),r=e(i);return n[c.uuid]=r,r.addListener(function(){c.emit(r.matches===!0?"match":"unmatch")}),c}var n={};return i.prototype={get matches(){var t=n[this.uuid];return t?t.matches:void 0}},t.extend(i)}provide(["../emitter",t.matchMedia||"../polyfill/window/matchmedia"],e)}(this);
//# sourceMappingURL=sense.js.map
