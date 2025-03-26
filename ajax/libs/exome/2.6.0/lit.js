"use strict";
var i = Object.defineProperty;
var l = Object.getOwnPropertyDescriptor;
var u = Object.getOwnPropertyNames;
var p = Object.prototype.hasOwnProperty;
var a = (t, e) => {
  for (var s in e)
    i(t, s, { get: e[s], enumerable: !0 });
}, b = (t, e, s, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of u(e))
      !p.call(t, o) && o !== s && i(t, o, { get: () => e[o], enumerable: !(n = l(e, o)) || n.enumerable });
  return t;
};
var d = (t) => b(i({}, "__esModule", { value: !0 }), t);

// src/lit.ts
var h = {};
a(h, {
  StoreController: () => r
});
module.exports = d(h);
var c = require("exome"), r = class {
  constructor(e, s) {
    this.host = e;
    this.store = s;
    e.addController(this);
  }
  hostConnected() {
    this.unsubscribe = (0, c.subscribe)(this.store, () => {
      this.host.requestUpdate();
    });
  }
  hostDisconnected() {
    var e;
    (e = this.unsubscribe) == null || e.call(this);
  }
};
