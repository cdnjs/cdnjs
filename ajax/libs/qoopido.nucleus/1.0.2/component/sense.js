/*! /component/sense 1.0.2 | http://nucleus.qoopido.com | (c) 2015 Dirk Lueth */
!function(t){"use strict";function e(t,e){function i(t){var i=this["super"].call(this),c=e(t);return n[i.uuid]=c,c.addListener(function(){i.emit(c.matches===!0?"match":"unmatch")}),i}var n={};return i.prototype={get matches(){var t=n[this.uuid];return t?t.matches:void 0}},t.extend(i)}provide(["../emitter",t.matchMedia||"../polyfill/window/matchmedia"],e)}(this);
//# sourceMappingURL=sense.js.map
