"use strict";
var a = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var s = Object.getOwnPropertyNames;
var g = Object.prototype.hasOwnProperty;
var D = (r, t) => {
  for (var o in t)
    a(r, o, { get: t[o], enumerable: !0 });
}, I = (r, t, o, i) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let e of s(t))
      !g.call(r, e) && e !== o && a(r, e, { get: () => t[e], enumerable: !(i = m(t, e)) || i.enumerable });
  return r;
};
var d = (r) => I(a({}, "__esModule", { value: !0 }), r);

// src/ghost.ts
var f = {};
D(f, {
  GhostExome: () => n
});
module.exports = d(f);
var c = require("exome");

// src/create-id.ts
var p = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/ghost.ts
var x, n = class {
  constructor() {
    this[x] = this.constructor.name + "-" + p();
  }
};
x = c.exomeId;
