"use strict";
var n = Object.defineProperty;
var a = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var E = Object.prototype.hasOwnProperty;
var T = (o, e) => {
  for (var m in e)
    n(o, m, { get: e[m], enumerable: !0 });
}, f = (o, e, m, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of p(e))
      !E.call(o, r) && r !== m && n(o, r, { get: () => e[r], enumerable: !(t = a(e, r)) || t.enumerable });
  return o;
};
var i = (o) => f(n({}, "__esModule", { value: !0 }), o);

// src/rxjs.ts
var s = {};
T(s, {
  observableFromExome: () => l
});
module.exports = i(s);
var x = require("exome"), b = require("rxjs");
function l(o) {
  return new b.Observable((e) => {
    (0, x.subscribe)(o, (m) => e.next(m)), e.next(o);
  });
}
