/*! /component/sense 2.0.4 | http://nucleus.qoopido.com | (c) 2017 Dirk Lueth */
!function(t){"use strict";function e(t,e){function i(i){var c=t.prototype.constructor.call(this),r=e(i);return n[c.uuid]=r,r.addListener(function(){c.emit(r.matches===!0?"match":"unmatch")}),c}var n={};return i.prototype={get matches(){var t=n[this.uuid];if(t)return t.matches}},t.extend(i)}provide(["../emitter",t.matchMedia||"../polyfill/window/matchmedia"],e)}(this);
//# sourceMappingURL=sense.js.map
