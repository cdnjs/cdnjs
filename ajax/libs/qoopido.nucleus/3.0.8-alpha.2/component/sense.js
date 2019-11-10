!function(t){"use strict";provide(["../emitter",t.matchMedia||"../polyfill/window/matchmedia"],function(t,e){var i={};function n(n){var a=t.call(this),r=e(n);return i[a.uuid]=r,r.addListener(function(){a.emit(!0===r.matches?"match":"unmatch")}),a}return n.prototype={get matches(){var t=i[this.uuid];if(t)return t.matches}},n.extends(t)})}(this);
//# sourceMappingURL=sense.js.map
