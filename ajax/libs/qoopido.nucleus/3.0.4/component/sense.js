!function(t){"use strict";function e(t,e){function i(i){var c=t.call(this),r=e(i);return n[c.uuid]=r,r.addListener(function(){c.emit(r.matches===!0?"match":"unmatch")}),c}var n={};return i.prototype={get matches(){var t=n[this.uuid];if(t)return t.matches}},i.extends(t)}provide(["../emitter",t.matchMedia||"../polyfill/window/matchmedia"],e)}(this);
//# sourceMappingURL=sense.js.map
