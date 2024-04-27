"use strict";
var r = Object.defineProperty;
var l = Object.getOwnPropertyDescriptor;
var u = Object.getOwnPropertyNames;
var a = Object.prototype.hasOwnProperty;
var b = (t, e) => {
  for (var s in e)
    r(t, s, { get: e[s], enumerable: !0 });
}, d = (t, e, s, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of u(e))
      !a.call(t, o) && o !== s && r(t, o, { get: () => e[o], enumerable: !(n = l(e, o)) || n.enumerable });
  return t;
};
var h = (t) => d(r({}, "__esModule", { value: !0 }), t);

// src/lit.ts
var m = {};
b(m, {
  StoreController: () => i
});
module.exports = h(m);
var c = require("exome"), i = class {
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
