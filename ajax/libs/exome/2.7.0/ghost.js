"use strict";
var a = Object.defineProperty;
var s = Object.getOwnPropertyDescriptor;
var g = Object.getOwnPropertyNames;
var D = Object.prototype.hasOwnProperty;
var I = (r, t) => {
  for (var o in t)
    a(r, o, { get: t[o], enumerable: !0 });
}, d = (r, t, o, i) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let e of g(t))
      !D.call(r, e) && e !== o && a(r, e, { get: () => t[e], enumerable: !(i = s(t, e)) || i.enumerable });
  return r;
};
var f = (r) => d(a({}, "__esModule", { value: !0 }), r);

// src/ghost.ts
var x = {};
I(x, {
  GhostExome: () => n
});
module.exports = f(x);
var m = require("exome");

// src/create-id.ts
var p = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/ghost.ts
var c;
c = m.exomeId;
var n = class {
  constructor() {
    this[c] = this.constructor.name + "-" + p();
  }
};
