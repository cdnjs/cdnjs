/**! Qoopido.nucleus 3.1.8 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(t){"use strict";provide(["/demand/weakmap","../emitter",t.matchMedia||"../polyfill/window/matchmedia"],(function(t,e,a){var i=new t;function n(t){var n=e.call(this),r=a(t);return i.set(n,r),r.addListener((function(){n.emit(!0===r.matches?"match":"unmatch")})),n}return n.prototype={get matches(){var t=i.get(this);if(t)return t.matches}},n.extends(e)}))}(this);
//# sourceMappingURL=sense.js.map
