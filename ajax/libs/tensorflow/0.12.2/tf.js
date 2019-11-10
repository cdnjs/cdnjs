// @tensorflow/tfjs Copyright 2018 Google
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.tf = global.tf || {})));
}(this, (function (exports) { 'use strict';

  /**
   * @license
   * Copyright 2018 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   */
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
  };function __extends(e, t) {
    function n() {
      this.constructor = e;
    }extendStatics(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
  }var __assign = Object.assign || function (e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);return e;
  };function __decorate(e, t, n, r) {
    var o,
        a = arguments.length,
        i = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, n, r);else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i);return a > 3 && i && Object.defineProperty(t, n, i), i;
  }function __awaiter(e, t, n, r) {
    return new (n || (n = Promise))(function (o, a) {
      function i(e) {
        try {
          u(r.next(e));
        } catch (e) {
          a(e);
        }
      }function s(e) {
        try {
          u(r.throw(e));
        } catch (e) {
          a(e);
        }
      }function u(e) {
        e.done ? o(e.value) : new n(function (t) {
          t(e.value);
        }).then(i, s);
      }u((r = r.apply(e, t || [])).next());
    });
  }function __generator(e, t) {
    var n,
        r,
        o,
        a,
        i = { label: 0, sent: function () {
        if (1 & o[0]) throw o[1];return o[1];
      }, trys: [], ops: [] };return a = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {
      return this;
    }), a;function s(a) {
      return function (s) {
        return function (a) {
          if (n) throw new TypeError("Generator is already executing.");for (; i;) try {
            if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {case 0:case 1:
                o = a;break;case 4:
                return i.label++, { value: a[1], done: !1 };case 5:
                i.label++, r = a[1], a = [0];continue;case 7:
                a = i.ops.pop(), i.trys.pop();continue;default:
                if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) {
                  i = 0;continue;
                }if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                  i.label = a[1];break;
                }if (6 === a[0] && i.label < o[1]) {
                  i.label = o[1], o = a;break;
                }if (o && i.label < o[2]) {
                  i.label = o[2], i.ops.push(a);break;
                }o[2] && i.ops.pop(), i.trys.pop();continue;}a = t.call(e, i);
          } catch (e) {
            a = [6, e], r = 0;
          } finally {
            n = o = 0;
          }if (5 & a[0]) throw a[1];return { value: a[0] ? a[1] : void 0, done: !0 };
        }([a, s]);
      };
    }
  }function isMobile() {
    var e = navigator.userAgent || navigator.vendor || window.opera;return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
    );
  }function doc(e) {
    return function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    };
  }function shuffle(e) {
    for (var t = e.length, n = 0, r = 0; t > 0;) r = Math.random() * t | 0, n = e[--t], e[t] = e[r], e[r] = n;
  }function clamp(e, t, n) {
    return Math.max(e, Math.min(t, n));
  }function randUniform(e, t) {
    return Math.random() * (t - e) + e;
  }function distSquared(e, t) {
    for (var n = 0, r = 0; r < e.length; r++) {
      var o = Number(e[r]) - Number(t[r]);n += o * o;
    }return n;
  }function assert(e, t) {
    if (!e) throw new Error("string" == typeof t ? t : t());
  }function assertShapesMatch(e, t, n) {
    void 0 === n && (n = ""), assert(arraysEqual(e, t), n + " Shapes " + e + " and " + t + " must match");
  }function assertNonNull(e) {
    assert(null != e, "The input to the tensor constructor must be a non-null value.");
  }function flatten(e, t) {
    if (void 0 === t && (t = []), Array.isArray(e)) for (var n = 0; n < e.length; ++n) flatten(e[n], t);else t.push(e);return t;
  }function inferShape(e) {
    var t = e;if (isTypedArray(e)) return [e.length];if (!Array.isArray(e)) return [];for (var n = []; t instanceof Array;) n.push(t.length), t = t[0];return e instanceof Array && deepAssertShapeConsistency(e, n, []), n;
  }function deepAssertShapeConsistency(e, t, n) {
    if (n = n || [], e instanceof Array) {
      assert(t.length > 0, function () {
        return "Element arr[" + n.join("][") + "] should be a primitive, but is an array of " + e.length + " elements";
      }), assert(e.length === t[0], function () {
        return "Element arr[" + n.join("][") + "] should have " + t[0] + " elements, but has " + e.length + " elements";
      });for (var r = t.slice(1), o = 0; o < e.length; ++o) deepAssertShapeConsistency(e[o], r, n.concat(o));
    } else assert(0 === t.length, function () {
      return "Element arr[" + n.join("][") + "] is a primitive, but should be an array of " + t[0] + " elements";
    });
  }function sizeFromShape(e) {
    if (0 === e.length) return 1;for (var t = e[0], n = 1; n < e.length; n++) t *= e[n];return t;
  }function isScalarShape(e) {
    return 0 === e.length;
  }function arraysEqual(e, t) {
    if (e.length !== t.length) return !1;for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;return !0;
  }function isInt(e) {
    return e % 1 == 0;
  }function tanh(e) {
    if (null != Math.tanh) return Math.tanh(e);if (e === 1 / 0) return 1;if (e === -1 / 0) return -1;var t = Math.exp(2 * e);return (t - 1) / (t + 1);
  }function sizeToSquarishShape(e) {
    for (var t = Math.floor(Math.sqrt(e)); t > 1; --t) if (e % t == 0) return [t, e / t];return [1, e];
  }function createShuffledIndices(e) {
    for (var t = new Uint32Array(e), n = 0; n < e; ++n) t[n] = n;return shuffle(t), t;
  }function rightPad(e, t) {
    return t <= e.length ? e : e + " ".repeat(t - e.length);
  }function repeatedTry(e, t, n) {
    return void 0 === t && (t = function (e) {
      return 0;
    }), new Promise(function (r, o) {
      var a = 0,
          i = function () {
        if (e()) r();else {
          var s = t(++a);null != n && a >= n ? o() : setTimeout(i, s);
        }
      };i();
    });
  }function getQueryParams(e) {
    var t = {};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g, function (e) {
      for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];return decodeParam(t, n[0], n[1]), n.join("=");
    }), t;
  }function decodeParam(e, t, n) {
    e[decodeURIComponent(t)] = decodeURIComponent(n || "");
  }function inferFromImplicitShape(e, t) {
    for (var n = 1, r = -1, o = 0; o < e.length; ++o) if (e[o] > 0) n *= e[o];else if (-1 === e[o]) {
      if (-1 !== r) throw Error("Shapes can only have 1 implicit size. Found - 1 at dim " + r + " and dim " + o);r = o;
    } else if (e[o] <= 0) throw Error("Shapes can not be <= 0. Found " + e[o] + " at dim " + o);if (-1 === r) {
      if (t > 0 && t !== n) throw Error("Size(" + t + ") must match the product of shape " + e);return e;
    }if (t % n != 0) throw Error("The implicit shape can't be a fractional number. Got " + t + " / " + n);var a = e.slice();return a[r] = t / n, a;
  }function squeezeShape(e, t) {
    for (var n = [], r = [], o = 0, a = 0; a < e.length; ++a) {
      if (null != t) {
        if (t[o] === a && e[a] > 1) throw new Error("Can't squeeze axis " + a + " since its dim '" + e[a] + "' is not 1");(null == t[o] || t[o] > a) && 1 === e[a] && (n.push(e[a]), r.push(a)), t[o] <= a && o++;
      }e[a] > 1 && (n.push(e[a]), r.push(a));
    }return { newShape: n, keptDims: r };
  }function getTypedArrayFromDType(e, t) {
    var n = null;if (null == e || "float32" === e) n = new Float32Array(t);else if ("int32" === e) n = new Int32Array(t);else {
      if ("bool" !== e) throw new Error("Unknown data type " + e);n = new Uint8Array(t);
    }return n;
  }function checkForNaN(e, t, n) {
    if ("float32" === t) for (var r = 0; r < e.length; r++) if (isNaN(e[r])) throw Error("The result of the '" + n + "' has NaNs.");
  }function hasEncodingLoss(e, t) {
    return "float32" !== t && ("int32" !== t || "float32" === e) && ("bool" !== t || "bool" !== e);
  }function copyTypedArray(e, t) {
    if (null == t || "float32" === t) return new Float32Array(e);if ("int32" === t) return new Int32Array(e);if ("bool" === t) {
      for (var n = new Uint8Array(e.length), r = 0; r < n.length; ++r) 0 !== Math.round(e[r]) && (n[r] = 1);return n;
    }throw new Error("Unknown data type " + t);
  }function isTypedArray(e) {
    return e instanceof Float32Array || e instanceof Int32Array || e instanceof Uint8Array;
  }function bytesPerElement(e) {
    if ("float32" === e || "int32" === e) return 4;if ("bool" === e) return 1;throw new Error("Unknown dtype " + e);
  }function isFunction(e) {
    return !!(e && e.constructor && e.call && e.apply);
  }function nearestDivisor(e, t) {
    for (var n = t; n < e; ++n) if (e % n == 0) return n;return e;
  }function computeStrides(e) {
    var t = e.length;if (t < 2) return [];var n = new Array(t - 1);n[t - 2] = e[t - 1];for (var r = t - 3; r >= 0; --r) n[r] = n[r + 1] * e[r + 1];return n;
  }function toTypedArray(e, t) {
    return noConversionNeeded(e, t) ? e : (Array.isArray(e) && (e = flatten(e)), copyTypedArray(e, t));
  }function noConversionNeeded(e, t) {
    return e instanceof Float32Array && "float32" === t || e instanceof Int32Array && "int32" === t || e instanceof Uint8Array && "bool" === t;
  }function makeOnesTypedArray(e, t) {
    for (var n = makeZerosTypedArray(e, t), r = 0; r < n.length; r++) n[r] = 1;return n;
  }function makeZerosTypedArray(e, t) {
    if (null == t || "float32" === t) return new Float32Array(e);if ("int32" === t) return new Int32Array(e);if ("bool" === t) return new Uint8Array(e);throw new Error("Unknown data type " + t);
  }function now() {
    if ("undefined" != typeof performance) return performance.now();if ("undefined" != typeof process) {
      var e = process.hrtime();return 1e3 * e[0] + e[1] / 1e6;
    }throw new Error("Can not measure time in this environment. You should run tf.js in the browser or in Node.js");
  }var util = Object.freeze({ shuffle: shuffle, clamp: clamp, randUniform: randUniform, distSquared: distSquared, assert: assert, assertShapesMatch: assertShapesMatch, assertNonNull: assertNonNull, flatten: flatten, inferShape: inferShape, sizeFromShape: sizeFromShape, isScalarShape: isScalarShape, arraysEqual: arraysEqual, isInt: isInt, tanh: tanh, sizeToSquarishShape: sizeToSquarishShape, createShuffledIndices: createShuffledIndices, rightPad: rightPad, repeatedTry: repeatedTry, getQueryParams: getQueryParams, inferFromImplicitShape: inferFromImplicitShape, squeezeShape: squeezeShape, getTypedArrayFromDType: getTypedArrayFromDType, checkForNaN: checkForNaN, hasEncodingLoss: hasEncodingLoss, copyTypedArray: copyTypedArray, isTypedArray: isTypedArray, bytesPerElement: bytesPerElement, isFunction: isFunction, nearestDivisor: nearestDivisor, computeStrides: computeStrides, toTypedArray: toTypedArray, makeOnesTypedArray: makeOnesTypedArray, makeZerosTypedArray: makeZerosTypedArray, now: now }),
      Profiler = function () {
    function e(e, t) {
      this.backendTimer = e, this.logger = t, null == t && (this.logger = new Logger());
    }return e.prototype.profileKernel = function (e, t) {
      var n,
          r = this,
          o = this.backendTimer.time(function () {
        n = t();
      }),
          a = n.dataSync();return checkForNaN(a, n.dtype, e), o.then(function (t) {
        r.logger.logKernelProfile(e, n, a, t.kernelMs);
      }), n;
    }, e;
  }(),
      Logger = function () {
    function e() {}return e.prototype.logKernelProfile = function (e, t, n, r) {
      var o = rightPad(r + "ms", 9),
          a = rightPad(e, 25),
          i = t.rank,
          s = t.size,
          u = rightPad(t.shape.toString(), 14);console.log("%c" + a + "\t%c" + o + "\t%c" + i + "D " + u + "\t%c" + s, "font-weight:bold", "color:red", "color:blue", "color: orange");
    }, e;
  }();function getFilteredNodesXToY(e, t, n) {
    for (var r = {}, o = {}, a = 0; a < t.length; a++) r[t[a].id] = !0;for (a = 0; a < e.length; a++) {
      var i = (g = e[a]).inputs;for (var s in i) {
        for (var u = i[s], l = !1, c = 0; c < t.length; c++) if (r[u.id]) {
          r[g.output.id] = !0, l = !0, o[g.id] = !0;break;
        }if (l) break;
      }
    }var d = {};d[n.id] = !0;var p = {};for (a = e.length - 1; a >= 0; a--) {
      i = (g = e[a]).inputs;var h = [];h.push(g.output);for (c = 0; c < h.length; c++) if (d[h[c].id]) {
        for (var s in i) d[i[s].id] = !0, p[g.id] = !0;break;
      }
    }var f = [];for (a = 0; a < e.length; a++) {
      var g;if (o[(g = e[a]).id] && p[g.id]) {
        var m = {};for (var s in g.inputs) {
          var v = g.inputs[s];r[v.id] && (m[s] = v);
        }var y = Object.assign({}, g);y.inputs = m, y.output = g.output, f.push(y);
      }
    }return f;
  }function backpropagateGradients(e, t) {
    for (var n = t.length - 1; n >= 0; n--) {
      var r = t[n],
          o = e[r.output.id];if (null == r.gradient) throw new Error("Cannot compute gradient: gradient function not found for " + r.name + ".");var a = r.gradient(o);for (var i in r.inputs) {
        if (!(i in a)) throw new Error("Cannot backprop through input " + i + ". Available gradients found: " + Object.keys(a) + ".");var s = a[i](),
            u = r.inputs[i];if (!arraysEqual(s.shape, u.shape)) throw new Error("Error in gradient for op " + r.name + ". The gradient of input '" + i + "' has shape '" + s.shape + "', which does not match the shape of the input '" + u.shape + "'");if (null == e[u.id]) e[u.id] = s;else {
          var l = e[u.id];e[u.id] = l.add(s), l.dispose();
        }
      }
    }
  }var FORMAT_LIMIT_NUM_VALS = 20,
      FORMAT_NUM_FIRST_LAST_VALS = 3,
      FORMAT_NUM_SIG_DIGITS = 7;function tensorToString(e, t, n, r) {
    var o = computeStrides(t),
        a = computeMaxSizePerColumn(e, t, o),
        i = t.length,
        s = subTensorToString(e, t, o, a),
        u = ["Tensor"];return r && (u.push("  dtype: " + n), u.push("  rank: " + i), u.push("  shape: [" + t + "]"), u.push("  values:")), u.push(s.map(function (e) {
      return "    " + e;
    }).join("\n")), u.join("\n");
  }function computeMaxSizePerColumn(e, t, n) {
    var r = sizeFromShape(t),
        o = n[n.length - 1],
        a = new Array(o).fill(0);if (t.length > 1) for (var i = 0; i < r / o; i++) for (var s = i * o, u = 0; u < o; u++) a[u] = Math.max(a[u], valToString(e[s + u], 0).length);return a;
  }function valToString(e, t) {
    return rightPad(parseFloat(e.toFixed(FORMAT_NUM_SIG_DIGITS)).toString(), t);
  }function subTensorToString(e, t, n, r, o) {
    void 0 === o && (o = !0);var a = t[0],
        i = t.length;if (0 === i) return [e[0].toString()];if (1 === i) {
      if (a > FORMAT_LIMIT_NUM_VALS) {
        var s = Array.from(e.subarray(0, FORMAT_NUM_FIRST_LAST_VALS)),
            u = Array.from(e.subarray(a - FORMAT_NUM_FIRST_LAST_VALS, a));return ["[" + s.map(function (e, t) {
          return valToString(e, r[t]);
        }).join(", ") + ", ..., " + u.map(function (e, t) {
          return valToString(e, r[a - FORMAT_NUM_FIRST_LAST_VALS + t]);
        }).join(", ") + "]"];
      }return ["[" + Array.from(e).map(function (e, t) {
        return valToString(e, r[t]);
      }).join(", ") + "]"];
    }var l = t.slice(1),
        c = n.slice(1),
        d = n[0],
        p = [];if (a > FORMAT_LIMIT_NUM_VALS) {
      for (var h = 0; h < FORMAT_NUM_FIRST_LAST_VALS; h++) {
        var f = (g = h * d) + d;p.push.apply(p, subTensorToString(e.subarray(g, f), l, c, r, !1));
      }p.push("...");for (h = a - FORMAT_NUM_FIRST_LAST_VALS; h < a; h++) {
        f = (g = h * d) + d;p.push.apply(p, subTensorToString(e.subarray(g, f), l, c, r, h === a - 1));
      }
    } else for (h = 0; h < a; h++) {
      var g;f = (g = h * d) + d;p.push.apply(p, subTensorToString(e.subarray(g, f), l, c, r, h === a - 1));
    }var m = 2 === i ? "," : "";p[0] = "[" + p[0] + m;for (h = 1; h < p.length - 1; h++) p[h] = " " + p[h] + m;var v = ",\n";for (h = 2; h < i; h++) v += "\n";return p[p.length - 1] = " " + p[p.length - 1] + "]" + (o ? "" : v), p;
  }var TensorBuffer = function () {
    function e(e, t, n) {
      if (this.dtype = t, null != n) {
        var r = n.length,
            o = sizeFromShape(e);assert(r === o, "Length of values '" + r + "' does not match the size inferred by the shape '" + o + "'");
      }this.shape = e.slice(), this.values = n || getTypedArrayFromDType(t, sizeFromShape(e)), this.strides = computeStrides(e), this.size = sizeFromShape(e);
    }return e.prototype.set = function (e) {
      for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];0 === t.length && (t = [0]), assert(t.length === this.rank, "The number of provided coordinates (" + t.length + ") must match the rank (" + this.rank + ")");var r = this.locToIndex(t);this.values[r] = e;
    }, e.prototype.get = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];0 === e.length && (e = [0]);for (var n = e[e.length - 1], r = 0; r < e.length - 1; ++r) n += this.strides[r] * e[r];return this.values[n];
    }, e.prototype.locToIndex = function (e) {
      if (0 === this.rank) return 0;if (1 === this.rank) return e[0];for (var t = e[e.length - 1], n = 0; n < e.length - 1; ++n) t += this.strides[n] * e[n];return t;
    }, e.prototype.indexToLoc = function (e) {
      if (0 === this.rank) return [];if (1 === this.rank) return [e];for (var t = new Array(this.shape.length), n = 0; n < t.length - 1; ++n) t[n] = Math.floor(e / this.strides[n]), e -= t[n] * this.strides[n];return t[t.length - 1] = e, t;
    }, Object.defineProperty(e.prototype, "rank", { get: function () {
        return this.shape.length;
      }, enumerable: !0, configurable: !0 }), e.prototype.toTensor = function () {
      return Tensor.make(this.shape, { values: this.values }, this.dtype);
    }, __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e.prototype, "set", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e.prototype, "get", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e.prototype, "toTensor", null), e = __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e);
  }(),
      trackerFn = null,
      opHandler = null;function setTensorTracker(e) {
    trackerFn = e;
  }function setOpHandler(e) {
    opHandler = e;
  }var Tensor = function () {
    function e(e, n, r, o) {
      this.isDisposedInternal = !1, this.size = sizeFromShape(e), null != r && assert(this.size === r.length, "Constructing tensor of shape (" + this.size + ") should match the length of values (" + r.length + ")"), this.shape = e.slice(), this.dtype = n || "float32", this.strides = computeStrides(e), this.dataId = null != o ? o : {}, this.id = t.nextId++, this.rankType = this.rank < 5 ? this.rank.toString() : "higher", trackerFn().registerTensor(this), null != r && trackerFn().write(this.dataId, r);
    }var t;return t = e, e.make = function (e, n, r) {
      return new t(e, r, n.values, n.dataId);
    }, e.prototype.flatten = function () {
      return this.throwIfDisposed(), this.as1D();
    }, e.prototype.asScalar = function () {
      return this.throwIfDisposed(), assert(1 === this.size, "The array must have only 1 element."), this.reshape([]);
    }, e.prototype.as1D = function () {
      return this.throwIfDisposed(), this.reshape([this.size]);
    }, e.prototype.as2D = function (e, t) {
      return this.throwIfDisposed(), this.reshape([e, t]);
    }, e.prototype.as3D = function (e, t, n) {
      return this.throwIfDisposed(), this.reshape([e, t, n]);
    }, e.prototype.as4D = function (e, t, n, r) {
      return this.throwIfDisposed(), this.reshape([e, t, n, r]);
    }, e.prototype.asType = function (e) {
      return this.throwIfDisposed(), opHandler.cast(this, e);
    }, Object.defineProperty(e.prototype, "rank", { get: function () {
        return this.shape.length;
      }, enumerable: !0, configurable: !0 }), e.prototype.get = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];assert(e.length === this.rank, "Number of coordinates in get() must match the rank of the tensor"), this.throwIfDisposed(), 0 === e.length && (e = [0]);for (var n = e[e.length - 1], r = 0; r < e.length - 1; ++r) n += this.strides[r] * e[r];return this.dataSync()[n];
    }, e.prototype.buffer = function () {
      return opHandler.buffer(this.shape, this.dtype, this.dataSync());
    }, e.prototype.data = function () {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (e) {
          return this.throwIfDisposed(), [2, trackerFn().read(this.dataId)];
        });
      });
    }, e.prototype.dataSync = function () {
      return this.throwIfDisposed(), trackerFn().readSync(this.dataId);
    }, e.prototype.dispose = function () {
      this.isDisposed || (trackerFn().disposeTensor(this), this.isDisposedInternal = !0);
    }, Object.defineProperty(e.prototype, "isDisposed", { get: function () {
        return this.isDisposedInternal;
      }, enumerable: !0, configurable: !0 }), e.prototype.throwIfDisposed = function () {
      if (this.isDisposed) throw new Error("Tensor is disposed.");
    }, e.prototype.toFloat = function () {
      return this.asType("float32");
    }, e.prototype.toInt = function () {
      return this.asType("int32");
    }, e.prototype.toBool = function () {
      return this.asType("bool");
    }, e.prototype.print = function (e) {
      return void 0 === e && (e = !1), opHandler.print(this, e);
    }, e.prototype.reshape = function (e) {
      return this.throwIfDisposed(), opHandler.reshape(this, e);
    }, e.prototype.reshapeAs = function (e) {
      return this.throwIfDisposed(), this.reshape(e.shape);
    }, e.prototype.expandDims = function (e) {
      return void 0 === e && (e = 0), opHandler.expandDims(this, e);
    }, e.prototype.cumsum = function (e, t, n) {
      return void 0 === e && (e = 0), void 0 === t && (t = !1), void 0 === n && (n = !1), opHandler.cumsum(this, e, t, n);
    }, e.prototype.squeeze = function (e) {
      return this.throwIfDisposed(), opHandler.squeeze(this, e);
    }, e.prototype.clone = function () {
      return this.throwIfDisposed(), opHandler.clone(this);
    }, e.prototype.toString = function (e) {
      return void 0 === e && (e = !1), tensorToString(this.dataSync(), this.shape, this.dtype, e);
    }, e.prototype.tile = function (e) {
      return this.throwIfDisposed(), opHandler.tile(this, e);
    }, e.prototype.gather = function (e, t) {
      return void 0 === t && (t = 0), this.throwIfDisposed(), opHandler.gather(this, e, t);
    }, e.prototype.matMul = function (e, t, n) {
      return void 0 === t && (t = !1), void 0 === n && (n = !1), this.throwIfDisposed(), opHandler.matMul(this, e, t, n);
    }, e.prototype.dot = function (e) {
      return this.throwIfDisposed(), opHandler.dot(this, e);
    }, e.prototype.norm = function (e, t, n) {
      return void 0 === e && (e = "euclidean"), void 0 === t && (t = null), void 0 === n && (n = !1), this.throwIfDisposed(), opHandler.norm(this, e, t, n);
    }, e.prototype.slice = function (e, t) {
      return this.throwIfDisposed(), opHandler.slice(this, e, t);
    }, e.prototype.reverse = function (e) {
      return this.throwIfDisposed(), opHandler.reverse(this, e);
    }, e.prototype.concat = function (e, t) {
      return void 0 === t && (t = 0), this.throwIfDisposed(), opHandler.concat([this, e], t);
    }, e.prototype.stack = function (e, t) {
      return void 0 === t && (t = 0), opHandler.stack([this, e], t);
    }, e.prototype.unstack = function (e, t) {
      return void 0 === t && (t = 0), opHandler.unstack(this, t);
    }, e.prototype.pad = function (e, t) {
      return void 0 === t && (t = 0), opHandler.pad(this, e, t);
    }, e.prototype.batchNormalization = function (e, t, n, r, o) {
      return void 0 === n && (n = .001), this.throwIfDisposed(), opHandler.batchNormalization(this, e, t, n, r, o);
    }, e.prototype.all = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.all(this, e, t);
    }, e.prototype.any = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.any(this, e, t);
    }, e.prototype.logSumExp = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.logSumExp(this, e, t);
    }, e.prototype.sum = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.sum(this, e, t);
    }, e.prototype.mean = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.mean(this, e, t);
    }, e.prototype.min = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.min(this, e, t);
    }, e.prototype.max = function (e, t) {
      return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.max(this, e, t);
    }, e.prototype.argMin = function (e) {
      return void 0 === e && (e = null), this.throwIfDisposed(), opHandler.argMin(this, e);
    }, e.prototype.argMax = function (e) {
      return void 0 === e && (e = null), this.throwIfDisposed(), opHandler.argMax(this, e);
    }, e.prototype.cast = function (e) {
      return this.throwIfDisposed(), opHandler.cast(this, e);
    }, e.prototype.add = function (e) {
      return this.throwIfDisposed(), opHandler.add(this, e);
    }, e.prototype.addStrict = function (e) {
      return this.throwIfDisposed(), opHandler.addStrict(this, e);
    }, e.prototype.sub = function (e) {
      return this.throwIfDisposed(), opHandler.sub(this, e);
    }, e.prototype.subStrict = function (e) {
      return this.throwIfDisposed(), opHandler.subStrict(this, e);
    }, e.prototype.pow = function (e) {
      return this.throwIfDisposed(), opHandler.pow(this, e);
    }, e.prototype.powStrict = function (e) {
      return this.throwIfDisposed(), opHandler.powStrict(this, e);
    }, e.prototype.mul = function (e) {
      return this.throwIfDisposed(), opHandler.mul(this, e);
    }, e.prototype.mulStrict = function (e) {
      return this.throwIfDisposed(), opHandler.mulStrict(this, e);
    }, e.prototype.div = function (e) {
      return this.throwIfDisposed(), opHandler.div(this, e);
    }, e.prototype.floorDiv = function (e) {
      return this.throwIfDisposed(), opHandler.floorDiv(this, e);
    }, e.prototype.divStrict = function (e) {
      return this.throwIfDisposed(), opHandler.divStrict(this, e);
    }, e.prototype.minimum = function (e) {
      return this.throwIfDisposed(), opHandler.minimum(this, e);
    }, e.prototype.minimumStrict = function (e) {
      return this.throwIfDisposed(), opHandler.minimumStrict(this, e);
    }, e.prototype.maximum = function (e) {
      return this.throwIfDisposed(), opHandler.maximum(this, e);
    }, e.prototype.maximumStrict = function (e) {
      return this.throwIfDisposed(), opHandler.maximumStrict(this, e);
    }, e.prototype.mod = function (e) {
      return this.throwIfDisposed(), opHandler.mod(this, e);
    }, e.prototype.modStrict = function (e) {
      return this.throwIfDisposed(), opHandler.modStrict(this, e);
    }, e.prototype.squaredDifference = function (e) {
      return this.throwIfDisposed(), opHandler.squaredDifference(this, e);
    }, e.prototype.squaredDifferenceStrict = function (e) {
      return this.throwIfDisposed(), opHandler.squaredDifferenceStrict(this, e);
    }, e.prototype.transpose = function (e) {
      return this.throwIfDisposed(), opHandler.transpose(this, e);
    }, e.prototype.notEqual = function (e) {
      return this.throwIfDisposed(), opHandler.notEqual(this, e);
    }, e.prototype.notEqualStrict = function (e) {
      return this.throwIfDisposed(), opHandler.notEqualStrict(this, e);
    }, e.prototype.less = function (e) {
      return this.throwIfDisposed(), opHandler.less(this, e);
    }, e.prototype.lessStrict = function (e) {
      return this.throwIfDisposed(), opHandler.lessStrict(this, e);
    }, e.prototype.equal = function (e) {
      return this.throwIfDisposed(), opHandler.equal(this, e);
    }, e.prototype.equalStrict = function (e) {
      return this.throwIfDisposed(), opHandler.equalStrict(this, e);
    }, e.prototype.lessEqual = function (e) {
      return this.throwIfDisposed(), opHandler.lessEqual(this, e);
    }, e.prototype.lessEqualStrict = function (e) {
      return this.throwIfDisposed(), opHandler.lessEqualStrict(this, e);
    }, e.prototype.greater = function (e) {
      return this.throwIfDisposed(), opHandler.greater(this, e);
    }, e.prototype.greaterStrict = function (e) {
      return this.throwIfDisposed(), opHandler.greaterStrict(this, e);
    }, e.prototype.greaterEqual = function (e) {
      return this.throwIfDisposed(), opHandler.greaterEqual(this, e);
    }, e.prototype.greaterEqualStrict = function (e) {
      return this.throwIfDisposed(), opHandler.greaterEqualStrict(this, e);
    }, e.prototype.logicalAnd = function (e) {
      return this.throwIfDisposed(), opHandler.logicalAnd(this, e);
    }, e.prototype.logicalOr = function (e) {
      return this.throwIfDisposed(), opHandler.logicalOr(this, e);
    }, e.prototype.logicalNot = function () {
      return this.throwIfDisposed(), opHandler.logicalNot(this);
    }, e.prototype.logicalXor = function (e) {
      return this.throwIfDisposed(), opHandler.logicalXor(this, e);
    }, e.prototype.where = function (e, t) {
      return this.throwIfDisposed(), opHandler.where(e, this, t);
    }, e.prototype.neg = function () {
      return this.throwIfDisposed(), opHandler.neg(this);
    }, e.prototype.ceil = function () {
      return this.throwIfDisposed(), opHandler.ceil(this);
    }, e.prototype.floor = function () {
      return this.throwIfDisposed(), opHandler.floor(this);
    }, e.prototype.sign = function () {
      return this.throwIfDisposed(), opHandler.sign(this);
    }, e.prototype.exp = function () {
      return this.throwIfDisposed(), opHandler.exp(this);
    }, e.prototype.expm1 = function () {
      return this.throwIfDisposed(), opHandler.expm1(this);
    }, e.prototype.log = function () {
      return this.throwIfDisposed(), opHandler.log(this);
    }, e.prototype.log1p = function () {
      return this.throwIfDisposed(), opHandler.log1p(this);
    }, e.prototype.sqrt = function () {
      return this.throwIfDisposed(), opHandler.sqrt(this);
    }, e.prototype.rsqrt = function () {
      return this.throwIfDisposed(), opHandler.rsqrt(this);
    }, e.prototype.square = function () {
      return this.throwIfDisposed(), opHandler.square(this);
    }, e.prototype.reciprocal = function () {
      return this.throwIfDisposed(), opHandler.reciprocal(this);
    }, e.prototype.abs = function () {
      return this.throwIfDisposed(), opHandler.abs(this);
    }, e.prototype.clipByValue = function (e, t) {
      return this.throwIfDisposed(), opHandler.clipByValue(this, e, t);
    }, e.prototype.relu = function () {
      return this.throwIfDisposed(), opHandler.relu(this);
    }, e.prototype.elu = function () {
      return this.throwIfDisposed(), opHandler.elu(this);
    }, e.prototype.selu = function () {
      return this.throwIfDisposed(), opHandler.selu(this);
    }, e.prototype.leakyRelu = function (e) {
      return void 0 === e && (e = .2), this.throwIfDisposed(), opHandler.leakyRelu(this, e);
    }, e.prototype.prelu = function (e) {
      return this.throwIfDisposed(), opHandler.prelu(this, e);
    }, e.prototype.sigmoid = function () {
      return this.throwIfDisposed(), opHandler.sigmoid(this);
    }, e.prototype.logSigmoid = function () {
      return this.throwIfDisposed(), opHandler.logSigmoid(this);
    }, e.prototype.softplus = function () {
      return this.throwIfDisposed(), opHandler.softplus(this);
    }, e.prototype.sin = function () {
      return this.throwIfDisposed(), opHandler.sin(this);
    }, e.prototype.cos = function () {
      return this.throwIfDisposed(), opHandler.cos(this);
    }, e.prototype.tan = function () {
      return this.throwIfDisposed(), opHandler.tan(this);
    }, e.prototype.asin = function () {
      return this.throwIfDisposed(), opHandler.asin(this);
    }, e.prototype.acos = function () {
      return this.throwIfDisposed(), opHandler.acos(this);
    }, e.prototype.atan = function () {
      return this.throwIfDisposed(), opHandler.atan(this);
    }, e.prototype.sinh = function () {
      return this.throwIfDisposed(), opHandler.sinh(this);
    }, e.prototype.cosh = function () {
      return this.throwIfDisposed(), opHandler.cosh(this);
    }, e.prototype.tanh = function () {
      return this.throwIfDisposed(), opHandler.tanh(this);
    }, e.prototype.asinh = function () {
      return this.throwIfDisposed(), opHandler.asinh(this);
    }, e.prototype.acosh = function () {
      return this.throwIfDisposed(), opHandler.acosh(this);
    }, e.prototype.atanh = function () {
      return this.throwIfDisposed(), opHandler.atanh(this);
    }, e.prototype.erf = function () {
      return this.throwIfDisposed(), opHandler.erf(this);
    }, e.prototype.round = function () {
      return this.throwIfDisposed(), opHandler.round(this);
    }, e.prototype.step = function (e) {
      return void 0 === e && (e = 0), this.throwIfDisposed(), opHandler.step(this, e);
    }, e.prototype.softmax = function (e) {
      return void 0 === e && (e = -1), this.throwIfDisposed(), opHandler.softmax(this, e);
    }, e.prototype.resizeBilinear = function (e, t) {
      return void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.image.resizeBilinear(this, e, t);
    }, e.prototype.resizeNearestNeighbor = function (e, t) {
      return void 0 === t && (t = !1), this.throwIfDisposed(), opHandler.image.resizeNearestNeighbor(this, e, t);
    }, e.prototype.conv1d = function (e, t, n, r, o, a) {
      return void 0 === r && (r = "NWC"), void 0 === o && (o = 1), this.throwIfDisposed(), opHandler.conv1d(this, e, t, n, r, o, a);
    }, e.prototype.conv2d = function (e, t, n, r, o, a) {
      return void 0 === r && (r = "NHWC"), void 0 === o && (o = [1, 1]), this.throwIfDisposed(), opHandler.conv2d(this, e, t, n, r, o, a);
    }, e.prototype.conv2dTranspose = function (e, t, n, r, o) {
      return this.throwIfDisposed(), opHandler.conv2dTranspose(this, e, t, n, r, o);
    }, e.prototype.depthwiseConv2D = function (e, t, n, r, o, a) {
      return void 0 === r && (r = "NHWC"), void 0 === o && (o = [1, 1]), this.throwIfDisposed(), opHandler.depthwiseConv2d(this, e, t, n, r, o, a);
    }, e.prototype.avgPool = function (e, t, n, r) {
      return this.throwIfDisposed(), opHandler.avgPool(this, e, t, n, r);
    }, e.prototype.maxPool = function (e, t, n, r) {
      return this.throwIfDisposed(), opHandler.maxPool(this, e, t, n, r);
    }, e.prototype.localResponseNormalization = function (e, t, n, r) {
      return void 0 === e && (e = 5), void 0 === t && (t = 1), void 0 === n && (n = 1), void 0 === r && (r = .5), opHandler.localResponseNormalization(this, e, t, n, r);
    }, e.prototype.variable = function (e, t, n) {
      return void 0 === e && (e = !0), this.throwIfDisposed(), Variable.variable(this, e, t, n);
    }, e.prototype.unsortedSegmentSum = function (e, t) {
      return this.throwIfDisposed(), opHandler.unsortedSegmentSum(this, e, t);
    }, e.nextId = 0, __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "flatten", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "asScalar", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "as1D", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "as2D", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "as3D", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "as4D", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "asType", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "buffer", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "data", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "dataSync", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "dispose", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "toFloat", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "toInt", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "toBool", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "print", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "reshape", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "reshapeAs", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "expandDims", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "cumsum", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "squeeze", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "clone", null), __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e.prototype, "toString", null), e = t = __decorate([doc({ heading: "Tensors", subheading: "Classes" })], e);
  }();Object.defineProperty(Tensor, Symbol.hasInstance, { value: function (e) {
      return null != e.shape && null != e.dtype;
    } });var Variable = function (e) {
    function t(t, r, o) {
      void 0 === r && (r = !0);var a = e.call(this, t.shape, t.dtype, null, t.dataId) || this;a.trainable = r, a.name = o, null == a.name && (a.name = n.nextVarId.toString(), n.nextVarId++);try {
        trackerFn().registerVariable(a);
      } catch (e) {
        throw trackerFn().disposeTensor(a), e;
      }return a;
    }var n;return __extends(t, e), n = t, t.variable = function (e, t, r, o) {
      return void 0 === t && (t = !0), null != o && o !== e.dtype && (e = e.asType(o)), new n(e, t, r);
    }, t.prototype.assign = function (e) {
      if (e.dtype !== this.dtype) throw new Error("dtype of the new value (" + e.dtype + ") and previous value (" + this.dtype + ") must match");if (!arraysEqual(e.shape, this.shape)) throw new Error("shape of the new value (" + e.shape + ") and previous value (" + this.shape + ") must match");trackerFn().disposeTensor(this), this.dataId = e.dataId, trackerFn().registerTensor(this);
    }, t.nextVarId = 0, __decorate([doc({ heading: "Tensors", subheading: "Classes" })], t.prototype, "assign", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], t, "variable", null), t = n = __decorate([doc({ heading: "Tensors", subheading: "Classes" })], t);
  }(Tensor);Object.defineProperty(Variable, Symbol.hasInstance, { value: function (e) {
      return e instanceof Tensor && null != e.assign && e.assign instanceof Function;
    } });var variable = Variable.variable;function assertTypesMatch(e, t) {
    assert(e.dtype === t.dtype, " The dtypes of the first(" + e.dtype + ") and second(" + t.dtype + ") input must match");
  }function convertToTensor(e, t, n, r) {
    if (void 0 === r && (r = "float32"), r = r || "float32", e instanceof Tensor) return e;if (!isTypedArray(e) && !Array.isArray(e) && "number" != typeof e && "boolean" != typeof e) throw new Error("Argument '" + t + "' passed to '" + n + "' must be a Tensor or TensorLike, but got " + e.constructor.name);var o = inferShape(e);return isTypedArray(e) || Array.isArray(e) || (e = [e]), Tensor.make(o, { values: toTypedArray(e, r) }, r);
  }function convertToTensorArray(e, t, n) {
    if (!Array.isArray(e)) throw new Error("Argument " + t + " passed to " + n + " must be a `Tensor[]` or `TensorLike[]`");return e.map(function (e, r) {
      return convertToTensor(e, t + "[" + r + "]", n);
    });
  }function isTensorInList(e, t) {
    for (var n = 0; n < t.length; n++) if (t[n].id === e.id) return !0;return !1;
  }function getTensorsInContainer(e) {
    var t = [];return walkTensorContainer(e, t, new Set()), t;
  }function walkTensorContainer(e, t, n) {
    if (null != e) if (e instanceof Tensor) t.push(e);else if (isIterable(e)) {
      var r = e;for (var o in r) {
        var a = r[o];n.has(a) || (n.add(a), walkTensorContainer(a, t, n));
      }
    }
  }function isIterable(e) {
    return Array.isArray(e) || "object" == typeof e;
  }var Type,
      Engine = function () {
    function e(e, t, n) {
      this.backend = e, this.safeMode = t, this.debugMode = n, this.registeredVariables = {}, this.refCounter = new WeakMap(), this.nextTapeNodeId = 0, this.numBytes = 0, this.numTensors = 0, this.numDataBuffers = 0, this.gradientScopeCount = 0, this.customGradientDepth = 0, this.keepTensors = new Set(), this.activeScope = { track: [], name: "default scope" }, this.scopeStack = [this.activeScope], this.profiler = new Profiler(e);
    }return e.prototype.tidy = function (e, t, n) {
      var r = this;void 0 === n && (n = !1);var o,
          a = null;if (null == t) {
        if ("function" != typeof e) throw new Error("Please provide a function to tidy()");t = e;
      } else {
        if ("string" != typeof e && !(e instanceof String)) throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if ("function" != typeof t) throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");a = e;
      }return this.scopedRun(function () {
        return r.startScope(a, n);
      }, function () {
        return r.endScope(o, n);
      }, function () {
        return (o = t()) instanceof Promise && console.error("Cannot return a Promise inside of tidy."), o;
      });
    }, e.prototype.scopedRun = function (e, t, n) {
      e();try {
        var r = n();return t(), r;
      } catch (e) {
        throw t(), e;
      }
    }, e.prototype.runKernel = function (e, t, n) {
      var r,
          o = this,
          a = [],
          i = function (e) {
        return a.push(e), e;
      },
          s = this.activeScope.name;if (this.scopedRun(function () {
        return o.customGradientDepth++;
      }, function () {
        return o.customGradientDepth--;
      }, function () {
        r = o.debugMode() ? o.profiler.profileKernel(s, function () {
          return e(o.backend, i);
        }) : e(o.backend, i);
      }), this.shouldRecord()) {
        var u = { id: this.nextTapeNodeId++, name: s, inputs: t, output: r };null != n && (u.gradient = function (e) {
          return n(e, a);
        }), this.activeTape.push(u);
      }return r;
    }, e.prototype.registerTensor = function (e) {
      var t = this.refCounter.has(e.dataId) ? this.refCounter.get(e.dataId) : 0;this.numTensors++, 0 === t && (this.numDataBuffers++, this.numBytes += sizeFromShape(e.shape) * bytesPerElement(e.dtype), this.backend.register(e.dataId, e.shape, e.dtype)), this.refCounter.set(e.dataId, t + 1), e instanceof Variable || this.track(e);
    }, e.prototype.registerVariable = function (e) {
      if (null != this.registeredVariables[e.name]) throw new Error("Variable with name " + e.name + " was already registered");this.registeredVariables[e.name] = e;
    }, e.prototype.disposeTensor = function (e) {
      if (this.refCounter.has(e.dataId)) {
        this.keepTensors.has(e.id) && this.keepTensors.delete(e.id), this.numTensors--;var t = this.refCounter.get(e.dataId);t <= 1 ? (this.refCounter.delete(e.dataId), this.backend.disposeData(e.dataId), this.numDataBuffers--, this.numBytes -= sizeFromShape(e.shape) * bytesPerElement(e.dtype)) : this.refCounter.set(e.dataId, t - 1);
      }
    }, e.prototype.disposeVariables = function () {
      for (var e in this.registeredVariables) {
        var t = this.registeredVariables[e];this.disposeTensor(t), delete this.registeredVariables[e];
      }
    }, e.prototype.memory = function () {
      var e = this.backend.memory();return e.numTensors = this.numTensors, e.numDataBuffers = this.numDataBuffers, e.numBytes = this.numBytes, e;
    }, e.prototype.shouldRecord = function () {
      return null != this.activeTape && 0 === this.customGradientDepth;
    }, e.prototype.addTapeNode = function (e, t, n) {
      var r = {};e.forEach(function (e, t) {
        r[t] = e;
      });var o = { id: this.nextTapeNodeId++, name: this.activeScope.name, inputs: r, output: t, gradient: function (e) {
          var t = {};return n(e).forEach(function (e, n) {
            t[n] = function () {
              return e;
            };
          }), t;
        } };this.activeTape.push(o);
    }, e.prototype.keep = function (e) {
      if (1 === this.scopeStack.length && this.safeMode) throw new Error("Safe mode is ON. Enclose all tensor operations inside tf.tidy(): tf.tidy(() => {...}) to avoid memory leaks.");return this.keepTensors.add(e.id), e;
    }, e.prototype.startScope = function (e, t) {
      void 0 === t && (t = !1), t && 0 === this.gradientScopeCount && (this.activeTape = []), t && this.gradientScopeCount++;var n = { track: [], name: "unnamed scope" };e && (n.name = e), this.scopeStack.push(n), this.activeScope = n;
    }, e.prototype.endScope = function (e, t) {
      var n = this;void 0 === t && (t = !1), t && (this.gradientScopeCount--, 0 === this.gradientScopeCount && (this.activeTape = null));var r = new Set(this.keepTensors),
          o = getTensorsInContainer(e);o.forEach(function (e) {
        return r.add(e.id);
      });for (var a = 0; a < this.activeScope.track.length; a++) {
        var i = this.activeScope.track[a];r.has(i.id) || (null != this.activeTape ? o.push(i) : i.dispose());
      }var s = this.scopeStack.pop();this.activeScope = 0 === this.scopeStack.length ? { track: [], name: "default scope" } : this.scopeStack[this.scopeStack.length - 1], o.forEach(function (e) {
        !n.keepTensors.has(e.id) && isTensorInList(e, s.track) && n.track(e);
      });
    }, e.prototype.gradients = function (e, t, n, r) {
      var o = this;return void 0 === r && (r = !1), assert(t.length > 0, "gradients() received an empty list of xs."), this.tidy("gradients", function () {
        var a = e();assert(a instanceof Tensor, "The result y returned by f() must be a tensor.");var i = getFilteredNodesXToY(o.activeTape, t, a);if (!r && 0 === i.length && t.length > 0) throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");var s = {};return s[a.id] = null == n ? ones(a.shape) : n, backpropagateGradients(s, i), { value: a, grads: t.map(function (e) {
            return s[e.id];
          }) };
      }, !0);
    }, e.prototype.customGrad = function (e) {
      var t = this;return assert(isFunction(e), "The f passed in customGrad(f) must be a function."), function () {
        for (var n, r, o = [], a = 0; a < arguments.length; a++) o[a] = arguments[a];if (assert(o.every(function (e) {
          return e instanceof Tensor;
        }), "The args passed in customGrad(f)(x1, x2,...) must all be tensors"), t.scopedRun(function () {
          return t.customGradientDepth++;
        }, function () {
          return t.customGradientDepth--;
        }, function () {
          r = t.tidy(e.name, function () {
            var t = e.apply(void 0, o),
                r = t.value,
                a = t.gradFunc;return assert(r instanceof Tensor, "The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"), assert(isFunction(a), "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."), n = a, r;
          }, !0);
        }), t.shouldRecord()) {
          t.addTapeNode(o, r, function (e) {
            var t = n(e),
                r = Array.isArray(t) ? t : [t];return assert(r.length === o.length, "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."), assert(r.every(function (e) {
              return e instanceof Tensor;
            }), "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."), r;
          });
        }return r;
      };
    }, e.prototype.write = function (e, t) {
      this.backend.write(e, t);
    }, e.prototype.readSync = function (e) {
      return this.backend.readSync(e);
    }, e.prototype.read = function (e) {
      return this.backend.read(e);
    }, e.prototype.fromPixels = function (e, t) {
      return this.backend.fromPixels(e, t);
    }, e.prototype.time = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n;return __generator(this, function (r) {
          switch (r.label) {case 0:
              return t = now(), [4, this.backend.time(e)];case 1:
              return (n = r.sent()).wallMs = now() - t, [2, n];}
        });
      });
    }, e.prototype.track = function (e) {
      if (1 === this.scopeStack.length && this.safeMode) throw new Error("Safe mode is ON. Enclose all tensor operations inside tf.tidy(): tf.tidy(() => {op();...}); to avoid memory leaks.");return this.activeScope.track.push(e), e;
    }, e;
  }();function ones(e) {
    var t = makeOnesTypedArray(sizeFromShape(e), "float32");return Tensor.make(e, { values: t });
  }!function (e) {
    e[e.NUMBER = 0] = "NUMBER", e[e.BOOLEAN = 1] = "BOOLEAN", e[e.STRING = 2] = "STRING";
  }(Type || (Type = {}));var URL_PROPERTIES = [{ name: "DEBUG", type: Type.BOOLEAN }, { name: "IS_BROWSER", type: Type.BOOLEAN }, { name: "WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION", type: Type.NUMBER }, { name: "WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE", type: Type.BOOLEAN }, { name: "WEBGL_VERSION", type: Type.NUMBER }, { name: "WEBGL_RENDER_FLOAT32_ENABLED", type: Type.BOOLEAN }, { name: "WEBGL_DOWNLOAD_FLOAT_ENABLED", type: Type.BOOLEAN }, { name: "WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED", type: Type.BOOLEAN }, { name: "BACKEND", type: Type.STRING }];function isWebGLVersionEnabled(e, t) {
    var n;try {
      n = getWebGLRenderingContext(e, t);
    } catch (e) {
      return !1;
    }return null != n && (loseContext(n), !0);
  }function getWebGLDisjointQueryTimerVersion(e, t) {
    if (0 === e) return 0;var n,
        r = getWebGLRenderingContext(e, t);return n = hasExtension(r, "EXT_disjoint_timer_query_webgl2") && 2 === e ? 2 : hasExtension(r, "EXT_disjoint_timer_query") ? 1 : 0, null != r && loseContext(r), n;
  }function isRenderToFloatTextureEnabled(e, t) {
    if (0 === e) return !1;var n = getWebGLRenderingContext(e, t);if (1 === e) {
      if (!hasExtension(n, "OES_texture_float")) return !1;
    } else if (!hasExtension(n, "EXT_color_buffer_float")) return !1;createFloatTextureAndBindToFramebuffer(n, e);var r = n.checkFramebufferStatus(n.FRAMEBUFFER) === n.FRAMEBUFFER_COMPLETE;return loseContext(n), r;
  }function isDownloadFloatTextureEnabled(e, t) {
    if (0 === e) return !1;var n = getWebGLRenderingContext(e, t);if (1 === e) {
      if (!hasExtension(n, "OES_texture_float")) return !1;
    } else if (!hasExtension(n, "EXT_color_buffer_float")) return !1;createFloatTextureAndBindToFramebuffer(n, e), n.readPixels(0, 0, 1, 1, n.RGBA, n.FLOAT, new Float32Array(4));var r = n.getError() === n.NO_ERROR;return loseContext(n), r;
  }function isWebGLGetBufferSubDataAsyncExtensionEnabled(e, t) {
    if (e > 0) return !1;if (2 !== e) return !1;var n = getWebGLRenderingContext(e, t),
        r = hasExtension(n, "WEBGL_get_buffer_sub_data_async");return loseContext(n), r;
  }function isChrome() {
    return "undefined" != typeof navigator && null != navigator && null != navigator.userAgent && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }var TENSORFLOWJS_FLAGS_PREFIX = "tfjsflags";function getFeaturesFromURL() {
    var e = {};if ("undefined" == typeof window || void 0 === window.location) return e;var t = getQueryParams(window.location.search);if (TENSORFLOWJS_FLAGS_PREFIX in t) {
      var n = {};t[TENSORFLOWJS_FLAGS_PREFIX].split(",").forEach(function (e) {
        var t = e.split(":"),
            r = t[0],
            o = t[1];n[r] = o;
      }), URL_PROPERTIES.forEach(function (t) {
        t.name in n && (console.log("Setting feature override from URL " + t.name + ": " + n[t.name]), t.type === Type.NUMBER ? e[t.name] = +n[t.name] : t.type === Type.BOOLEAN ? e[t.name] = "true" === n[t.name] : t.type === Type.STRING ? e[t.name] = n[t.name] : console.warn("Unknown URL param: " + t.name + "."));
      });
    }return e;
  }function hasExtension(e, t) {
    return null != e.getExtension(t);
  }function getWebGLRenderingContext(e, t) {
    if (0 === e || !t) throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var n = document.createElement("canvas");return 1 === e ? n.getContext("webgl") || n.getContext("experimental-webgl") : n.getContext("webgl2");
  }function loseContext(e) {
    if (null != e) {
      var t = e.getExtension("WEBGL_lose_context");if (null == t) throw new Error("Extension WEBGL_lose_context not supported on this browser.");t.loseContext();
    }
  }function createFloatTextureAndBindToFramebuffer(e, t) {
    var n = e.createFramebuffer(),
        r = e.createTexture();e.bindTexture(e.TEXTURE_2D, r);var o = 2 === t ? e.RGBA32F : e.RGBA;e.texImage2D(e.TEXTURE_2D, 0, o, 1, 1, 0, e.RGBA, e.FLOAT, null), e.bindFramebuffer(e.FRAMEBUFFER, n), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, r, 0);
  }var TEST_EPSILON_FLOAT32_ENABLED = .001,
      TEST_EPSILON_FLOAT32_DISABLED = .1,
      Environment = function () {
    function e(e) {
      this.features = {}, this.registry = {}, null != e && (this.features = e), this.get("DEBUG") && console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.");
    }return e.setBackend = function (e, t) {
      if (void 0 === t && (t = !1), !(e in ENV.registry)) throw new Error("Backend type '" + e + "' not found in registry");ENV.initBackend(e, t);
    }, e.getBackend = function () {
      return ENV.initDefaultBackend(), ENV.currentBackend;
    }, e.disposeVariables = function () {
      ENV.engine.disposeVariables();
    }, e.memory = function () {
      return ENV.engine.memory();
    }, e.tidy = function (e, t, n) {
      return void 0 === n && (n = !1), ENV.engine.tidy(e, t, n);
    }, e.dispose = function (e) {
      getTensorsInContainer(e).forEach(function (e) {
        return e.dispose();
      });
    }, e.keep = function (e) {
      return ENV.engine.keep(e);
    }, e.time = function (e) {
      return ENV.engine.time(e);
    }, e.prototype.get = function (e) {
      return e in this.features ? this.features[e] : (this.features[e] = this.evaluateFeature(e), this.features[e]);
    }, e.prototype.getFeatures = function () {
      return this.features;
    }, e.prototype.set = function (e, t) {
      this.features[e] = t;
    }, e.prototype.getBestBackendType = function () {
      var e = this;if (0 === Object.keys(this.registry).length) throw new Error("No backend found in registry.");return Object.keys(this.registry).map(function (t) {
        return { name: t, entry: e.registry[t] };
      }).sort(function (e, t) {
        return t.entry.priority - e.entry.priority;
      })[0].name;
    }, e.prototype.evaluateFeature = function (e) {
      if ("DEBUG" === e) return !1;if ("IS_BROWSER" === e) return "undefined" != typeof window;if ("IS_NODE" === e) return "undefined" != typeof process && void 0 !== process.versions.node;if ("IS_CHROME" === e) return isChrome();if ("IS_TEST" === e) return !1;if ("BACKEND" === e) return this.getBestBackendType();if ("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION" === e) {
        var t = this.get("WEBGL_VERSION");return 0 === t ? 0 : getWebGLDisjointQueryTimerVersion(t, this.get("IS_BROWSER"));
      }if ("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE" === e) return this.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 && !isMobile();if ("HAS_WEBGL" === e) return this.get("WEBGL_VERSION") > 0;if ("WEBGL_VERSION" === e) return isWebGLVersionEnabled(2, this.get("IS_BROWSER")) ? 2 : isWebGLVersionEnabled(1, this.get("IS_BROWSER")) ? 1 : 0;if ("WEBGL_RENDER_FLOAT32_ENABLED" === e) return isRenderToFloatTextureEnabled(this.get("WEBGL_VERSION"), this.get("IS_BROWSER"));if ("WEBGL_DOWNLOAD_FLOAT_ENABLED" === e) return isDownloadFloatTextureEnabled(this.get("WEBGL_VERSION"), this.get("IS_BROWSER"));if ("WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED" === e) return isWebGLGetBufferSubDataAsyncExtensionEnabled(this.get("WEBGL_VERSION"), this.get("IS_BROWSER"));if ("TEST_EPSILON" === e) return this.get("WEBGL_RENDER_FLOAT32_ENABLED") ? TEST_EPSILON_FLOAT32_ENABLED : TEST_EPSILON_FLOAT32_DISABLED;throw new Error("Unknown feature " + e + ".");
    }, e.prototype.setFeatures = function (e) {
      this.features = Object.assign({}, e);
    }, e.prototype.reset = function () {
      this.features = getFeaturesFromURL(), null != this.globalEngine && (this.globalEngine = null);
    }, e.prototype.initBackend = function (e, t) {
      var n = this;void 0 === t && (t = !1), this.currentBackend = e;var r = this.findBackend(e);this.globalEngine = new Engine(r, t, function () {
        return n.get("DEBUG");
      });
    }, e.prototype.findBackend = function (e) {
      return e in this.registry ? this.registry[e].backend : null;
    }, e.prototype.registerBackend = function (e, t, n, r) {
      var o = this;if (void 0 === n && (n = 1), e in this.registry) return console.warn(e + " backend was already registered. Reusing existing backend"), null != r && r(function () {
        return o.engine;
      }), !1;try {
        var a = t();return this.registry[e] = { backend: a, priority: n }, !0;
      } catch (t) {
        return console.warn("Registration of backend " + e + " failed"), console.warn(t.stack || t.message), !1;
      }
    }, e.prototype.removeBackend = function (e) {
      if (!(e in this.registry)) throw new Error(e + " backend not found in registry");this.registry[e].backend.dispose(), delete this.registry[e];
    }, Object.defineProperty(e.prototype, "engine", { get: function () {
        return this.initDefaultBackend(), this.globalEngine;
      }, enumerable: !0, configurable: !0 }), e.prototype.initDefaultBackend = function () {
      null == this.globalEngine && this.initBackend(this.get("BACKEND"), !1);
    }, __decorate([doc({ heading: "Environment" })], e, "setBackend", null), __decorate([doc({ heading: "Environment" })], e, "getBackend", null), __decorate([doc({ heading: "Environment" })], e, "disposeVariables", null), __decorate([doc({ heading: "Performance", subheading: "Memory" })], e, "memory", null), __decorate([doc({ heading: "Performance", subheading: "Memory" })], e, "tidy", null), __decorate([doc({ heading: "Performance", subheading: "Memory" })], e, "dispose", null), __decorate([doc({ heading: "Performance", subheading: "Memory" })], e, "keep", null), __decorate([doc({ heading: "Performance", subheading: "Timing" })], e, "time", null), e;
  }();function getGlobalNamespace() {
    var e;if ("undefined" != typeof window) e = window;else {
      if ("undefined" == typeof process) throw new Error("Could not find a global object");e = process;
    }return e;
  }function getOrMakeEnvironment() {
    var e = getGlobalNamespace();return null == e.ENV && (e.ENV = new Environment(getFeaturesFromURL()), setTensorTracker(function () {
      return e.ENV.engine;
    })), e.ENV;
  }var ENV = getOrMakeEnvironment(),
      environment = Object.freeze({ Environment: Environment, ENV: ENV });function axesAreInnerMostDims(e, t) {
    for (var n = 0; n < e.length; ++n) if (e[e.length - n - 1] !== t - 1 - n) return !1;return !0;
  }function combineLocations(e, t, n) {
    for (var r = e.length + t.length, o = [], a = 0, i = 0, s = 0; s < r; s++) -1 === n.indexOf(s) ? o.push(e[a++]) : o.push(t[i++]);return o;
  }function computeOutAndReduceShapes(e, t) {
    for (var n = [], r = e.length, o = 0; o < r; o++) -1 === t.indexOf(o) && n.push(e[o]);return [n, t.map(function (t) {
      return e[t];
    })];
  }function expandShapeToKeepDim(e, t) {
    return combineLocations(e, t.map(function (e) {
      return 1;
    }), t);
  }function parseAxisParam(e, t) {
    var n = t.length;return assert((e = null == e ? t.map(function (e, t) {
      return t;
    }) : [].concat(e)).every(function (e) {
      return e >= -n && e < n;
    }), "All values in axis param must be in range [-" + n + ", " + n + ") but got axis " + e), assert(e.every(function (e) {
      return isInt(e);
    }), "All values in axis param must be integers but got axis " + e), e.map(function (e) {
      return e < 0 ? n + e : e;
    });
  }function assertAxesAreInnerMostDims(e, t, n) {
    assert(axesAreInnerMostDims(t, n), e + " supports only inner-most axes for now. Got axes " + t + " and rank-" + n + " input.");
  }function getAxesPermutation(e, t) {
    if (axesAreInnerMostDims(e, t)) return null;for (var n = [], r = 0; r < t; ++r) -1 === e.indexOf(r) && n.push(r);return e.forEach(function (e) {
      return n.push(e);
    }), n;
  }function getUndoAxesPermutation(e) {
    return e.map(function (e, t) {
      return [t, e];
    }).sort(function (e, t) {
      return e[1] - t[1];
    }).map(function (e) {
      return e[0];
    });
  }function getInnerMostAxes(e, t) {
    for (var n = [], r = t - e; r < t; ++r) n.push(r);return n;
  }function assertParams(e, t, n) {
    var r = e.length,
        o = t.length;assert(e.length === t.length, "Error in concat" + r + "D: rank of x1 (" + r + ") and x2 (" + o + ") must be the same."), assert(n >= 0 && n < r, "Error in concat" + r + "D: axis must be between 0 and " + (r - 1) + ".");for (var a = 0; a < r; a++) assert(a === n || e[a] === t[a], "Error in concat" + r + "D: Shape (" + e + ") does not match (" + t + ") along the non-concatenated axis " + a + ".");
  }function computeOutShape(e, t, n) {
    assert(e.length === t.length, "x1 and x2 should have the same rank.");var r = e.slice();return r[n] += t[n], r;
  }function computeGradientSliceShapes(e, t) {
    return { aBegin: [0, 0], aSize: e, bBegin: [0, e[1]], bSize: t };
  }function op(e) {
    return function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];ENV.engine.startScope(e.name);try {
        var r = e.apply(void 0, t);return r instanceof Promise && console.error("Cannot return a Promise inside of tidy."), ENV.engine.endScope(r), r;
      } catch (e) {
        throw ENV.engine.endScope(null), e;
      }
    };
  }var ConcatOps = function () {
    function e() {}return e.concat1d = function (t) {
      return e.concat(t, 0);
    }, e.concat2d = function (t, n) {
      return e.concat(t, n);
    }, e.concat3d = function (t, n) {
      return e.concat(t, n);
    }, e.concat4d = function (t, n) {
      return e.concat(t, n);
    }, e.concat = function (e, t) {
      void 0 === t && (t = 0), assert(e.length >= 1, "Pass at least one tensor to concat");var n = convertToTensorArray(e, "tensors", "concat"),
          r = n[0];if (1 === n.length) return r;for (var o = parseAxisParam(t, r.shape), a = 1; a < n.length; ++a) r = concat2Tensors(r, n[a], o[0]);return r;
    }, __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "concat", null), e;
  }();function concat2Tensors(e, t, n) {
    assertParams(e.shape, t.shape, n);var r = computeOutShape(e.shape, t.shape, n),
        o = e.as2D(-1, sizeFromShape(e.shape.slice(n))),
        a = t.as2D(-1, sizeFromShape(t.shape.slice(n))),
        i = computeGradientSliceShapes(o.shape, a.shape),
        s = i.aBegin,
        u = i.aSize,
        l = i.bBegin,
        c = i.bSize;return ENV.engine.runKernel(function (e) {
      return e.concat(o, a);
    }, { a: o, b: a }, function (e) {
      return { a: function () {
          return e.slice(s, u);
        }, b: function () {
          return e.slice(l, c);
        } };
    }).reshape(r);
  }var concat = op(ConcatOps.concat),
      concat1d = op(ConcatOps.concat1d),
      concat2d = op(ConcatOps.concat2d),
      concat3d = op(ConcatOps.concat3d),
      concat4d = op(ConcatOps.concat4d);
  function createCommonjsModule(e, t) {
    return e(t = { exports: {} }, t.exports), t.exports;
  }var alea = createCommonjsModule(function (e) {
    !function (e, t, n) {
      function r(e, t) {
        return t.c = e.c, t.s0 = e.s0, t.s1 = e.s1, t.s2 = e.s2, t;
      }function o(e, t) {
        var n = new function (e) {
          var t,
              n = this,
              r = (t = 4022871197, function (e) {
            e = e.toString();for (var n = 0; n < e.length; n++) {
              var r = .02519603282416938 * (t += e.charCodeAt(n));r -= t = r >>> 0, t = (r *= t) >>> 0, t += 4294967296 * (r -= t);
            }return 2.3283064365386963e-10 * (t >>> 0);
          });n.next = function () {
            var e = 2091639 * n.s0 + 2.3283064365386963e-10 * n.c;return n.s0 = n.s1, n.s1 = n.s2, n.s2 = e - (n.c = 0 | e);
          }, n.c = 1, n.s0 = r(" "), n.s1 = r(" "), n.s2 = r(" "), n.s0 -= r(e), n.s0 < 0 && (n.s0 += 1), n.s1 -= r(e), n.s1 < 0 && (n.s1 += 1), n.s2 -= r(e), n.s2 < 0 && (n.s2 += 1), r = null;
        }(e),
            o = t && t.state,
            a = n.next;return a.int32 = function () {
          return 4294967296 * n.next() | 0;
        }, a.double = function () {
          return a() + 1.1102230246251565e-16 * (2097152 * a() | 0);
        }, a.quick = a, o && ("object" == typeof o && r(o, n), a.state = function () {
          return r(n, {});
        }), a;
      }t && t.exports ? t.exports = o : n && n.amd ? n(function () {
        return o;
      }) : this.alea = o;
    }(0, e, !1);
  }),
      xor128 = createCommonjsModule(function (e) {
    !function (e, t, n) {
      function r(e, t) {
        return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t;
      }function o(e, t) {
        var n = new function (e) {
          var t = this,
              n = "";t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.next = function () {
            var e = t.x ^ t.x << 11;return t.x = t.y, t.y = t.z, t.z = t.w, t.w ^= t.w >>> 19 ^ e ^ e >>> 8;
          }, e === (0 | e) ? t.x = e : n += e;for (var r = 0; r < n.length + 64; r++) t.x ^= 0 | n.charCodeAt(r), t.next();
        }(e),
            o = t && t.state,
            a = function () {
          return (n.next() >>> 0) / 4294967296;
        };return a.double = function () {
          do {
            var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
          } while (0 === e);return e;
        }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && r(o, n), a.state = function () {
          return r(n, {});
        }), a;
      }t && t.exports ? t.exports = o : n && n.amd ? n(function () {
        return o;
      }) : this.xor128 = o;
    }(0, e, !1);
  }),
      xorwow = createCommonjsModule(function (e) {
    !function (e, t, n) {
      function r(e, t) {
        return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t.v = e.v, t.d = e.d, t;
      }function o(e, t) {
        var n = new function (e) {
          var t = this,
              n = "";t.next = function () {
            var e = t.x ^ t.x >>> 2;return t.x = t.y, t.y = t.z, t.z = t.w, t.w = t.v, (t.d = t.d + 362437 | 0) + (t.v = t.v ^ t.v << 4 ^ e ^ e << 1) | 0;
          }, t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.v = 0, e === (0 | e) ? t.x = e : n += e;for (var r = 0; r < n.length + 64; r++) t.x ^= 0 | n.charCodeAt(r), r == n.length && (t.d = t.x << 10 ^ t.x >>> 4), t.next();
        }(e),
            o = t && t.state,
            a = function () {
          return (n.next() >>> 0) / 4294967296;
        };return a.double = function () {
          do {
            var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
          } while (0 === e);return e;
        }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && r(o, n), a.state = function () {
          return r(n, {});
        }), a;
      }t && t.exports ? t.exports = o : n && n.amd ? n(function () {
        return o;
      }) : this.xorwow = o;
    }(0, e, !1);
  }),
      xorshift7 = createCommonjsModule(function (e) {
    !function (e, t, n) {
      function r(e, t) {
        return t.x = e.x.slice(), t.i = e.i, t;
      }function o(e, t) {
        null == e && (e = +new Date());var n = new function (e) {
          var t = this;t.next = function () {
            var e,
                n,
                r = t.x,
                o = t.i;return e = r[o], n = (e ^= e >>> 7) ^ e << 24, n ^= (e = r[o + 1 & 7]) ^ e >>> 10, n ^= (e = r[o + 3 & 7]) ^ e >>> 3, n ^= (e = r[o + 4 & 7]) ^ e << 7, e = r[o + 7 & 7], n ^= (e ^= e << 13) ^ e << 9, r[o] = n, t.i = o + 1 & 7, n;
          }, function (e, t) {
            var n,
                r = [];if (t === (0 | t)) r[0] = t;else for (t = "" + t, n = 0; n < t.length; ++n) r[7 & n] = r[7 & n] << 15 ^ t.charCodeAt(n) + r[n + 1 & 7] << 13;for (; r.length < 8;) r.push(0);for (n = 0; n < 8 && 0 === r[n]; ++n);for (8 == n ? r[7] = -1 : r[n], e.x = r, e.i = 0, n = 256; n > 0; --n) e.next();
          }(t, e);
        }(e),
            o = t && t.state,
            a = function () {
          return (n.next() >>> 0) / 4294967296;
        };return a.double = function () {
          do {
            var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
          } while (0 === e);return e;
        }, a.int32 = n.next, a.quick = a, o && (o.x && r(o, n), a.state = function () {
          return r(n, {});
        }), a;
      }t && t.exports ? t.exports = o : n && n.amd ? n(function () {
        return o;
      }) : this.xorshift7 = o;
    }(0, e, !1);
  }),
      xor4096 = createCommonjsModule(function (e) {
    !function (e, t, n) {
      function r(e, t) {
        return t.i = e.i, t.w = e.w, t.X = e.X.slice(), t;
      }function o(e, t) {
        null == e && (e = +new Date());var n = new function (e) {
          var t = this;t.next = function () {
            var e,
                n,
                r = t.w,
                o = t.X,
                a = t.i;return t.w = r = r + 1640531527 | 0, n = o[a + 34 & 127], e = o[a = a + 1 & 127], n ^= n << 13, e ^= e << 17, n ^= n >>> 15, e ^= e >>> 12, n = o[a] = n ^ e, t.i = a, n + (r ^ r >>> 16) | 0;
          }, function (e, t) {
            var n,
                r,
                o,
                a,
                i,
                s = [],
                u = 128;for (t === (0 | t) ? (r = t, t = null) : (t += "\0", r = 0, u = Math.max(u, t.length)), o = 0, a = -32; a < u; ++a) t && (r ^= t.charCodeAt((a + 32) % t.length)), 0 === a && (i = r), r ^= r << 10, r ^= r >>> 15, r ^= r << 4, r ^= r >>> 13, a >= 0 && (i = i + 1640531527 | 0, o = 0 == (n = s[127 & a] ^= r + i) ? o + 1 : 0);for (o >= 128 && (s[127 & (t && t.length || 0)] = -1), o = 127, a = 512; a > 0; --a) r = s[o + 34 & 127], n = s[o = o + 1 & 127], r ^= r << 13, n ^= n << 17, r ^= r >>> 15, n ^= n >>> 12, s[o] = r ^ n;e.w = i, e.X = s, e.i = o;
          }(t, e);
        }(e),
            o = t && t.state,
            a = function () {
          return (n.next() >>> 0) / 4294967296;
        };return a.double = function () {
          do {
            var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
          } while (0 === e);return e;
        }, a.int32 = n.next, a.quick = a, o && (o.X && r(o, n), a.state = function () {
          return r(n, {});
        }), a;
      }t && t.exports ? t.exports = o : n && n.amd ? n(function () {
        return o;
      }) : this.xor4096 = o;
    }(0, e, !1);
  }),
      tychei = createCommonjsModule(function (e) {
    !function (e, t, n) {
      function r(e, t) {
        return t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t;
      }function o(e, t) {
        var n = new function (e) {
          var t = this,
              n = "";t.next = function () {
            var e = t.b,
                n = t.c,
                r = t.d,
                o = t.a;return e = e << 25 ^ e >>> 7 ^ n, n = n - r | 0, r = r << 24 ^ r >>> 8 ^ o, o = o - e | 0, t.b = e = e << 20 ^ e >>> 12 ^ n, t.c = n = n - r | 0, t.d = r << 16 ^ n >>> 16 ^ o, t.a = o - e | 0;
          }, t.a = 0, t.b = 0, t.c = -1640531527, t.d = 1367130551, e === Math.floor(e) ? (t.a = e / 4294967296 | 0, t.b = 0 | e) : n += e;for (var r = 0; r < n.length + 20; r++) t.b ^= 0 | n.charCodeAt(r), t.next();
        }(e),
            o = t && t.state,
            a = function () {
          return (n.next() >>> 0) / 4294967296;
        };return a.double = function () {
          do {
            var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
          } while (0 === e);return e;
        }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && r(o, n), a.state = function () {
          return r(n, {});
        }), a;
      }t && t.exports ? t.exports = o : n && n.amd ? n(function () {
        return o;
      }) : this.tychei = o;
    }(0, e, !1);
  }),
      seedrandom = createCommonjsModule(function (e) {
    !function (t, n) {
      var r,
          o = this,
          a = 256,
          i = 6,
          s = "random",
          u = n.pow(a, i),
          l = n.pow(2, 52),
          c = 2 * l,
          d = a - 1;function p(e, p, m) {
        var v = [],
            y = f(function e(t, n) {
          var r,
              o = [],
              a = typeof t;if (n && "object" == a) for (r in t) try {
            o.push(e(t[r], n - 1));
          } catch (e) {}return o.length ? o : "string" == a ? t : t + "\0";
        }((p = 1 == p ? { entropy: !0 } : p || {}).entropy ? [e, g(t)] : null == e ? function () {
          try {
            var e;return r && (e = r.randomBytes) ? e = e(a) : (e = new Uint8Array(a), (o.crypto || o.msCrypto).getRandomValues(e)), g(e);
          } catch (e) {
            var n = o.navigator,
                i = n && n.plugins;return [+new Date(), o, i, o.screen, g(t)];
          }
        }() : e, 3), v),
            x = new function (e) {
          var t,
              n = e.length,
              r = this,
              o = 0,
              i = r.i = r.j = 0,
              s = r.S = [];n || (e = [n++]);for (; o < a;) s[o] = o++;for (o = 0; o < a; o++) s[o] = s[i = d & i + e[o % n] + (t = s[o])], s[i] = t;(r.g = function (e) {
            for (var t, n = 0, o = r.i, i = r.j, s = r.S; e--;) t = s[o = d & o + 1], n = n * a + s[d & (s[o] = s[i = d & i + t]) + (s[i] = t)];return r.i = o, r.j = i, n;
          })(a);
        }(v),
            T = function () {
          for (var e = x.g(i), t = u, n = 0; e < l;) e = (e + n) * a, t *= a, n = x.g(1);for (; e >= c;) e /= 2, t /= 2, n >>>= 1;return (e + n) / t;
        };return T.int32 = function () {
          return 0 | x.g(4);
        }, T.quick = function () {
          return x.g(4) / 4294967296;
        }, T.double = T, f(g(x.S), t), (p.pass || m || function (e, t, r, o) {
          return o && (o.S && h(o, x), e.state = function () {
            return h(x, {});
          }), r ? (n[s] = e, t) : e;
        })(T, y, "global" in p ? p.global : this == n, p.state);
      }function h(e, t) {
        return t.i = e.i, t.j = e.j, t.S = e.S.slice(), t;
      }function f(e, t) {
        for (var n, r = e + "", o = 0; o < r.length;) t[d & o] = d & (n ^= 19 * t[d & o]) + r.charCodeAt(o++);return g(t);
      }function g(e) {
        return String.fromCharCode.apply(0, e);
      }if (n["seed" + s] = p, f(n.random(), t), e.exports) {
        e.exports = p;try {
          r = require("crypto");
        } catch (e) {}
      }
    }([], Math);
  });seedrandom.alea = alea, seedrandom.xor128 = xor128, seedrandom.xorwow = xorwow, seedrandom.xorshift7 = xorshift7, seedrandom.xor4096 = xor4096, seedrandom.tychei = tychei;var seedrandom$1 = seedrandom,
      seedrandom_1 = seedrandom$1.alea,
      MPRandGauss = function () {
    function e(e, t, n, r, o) {
      this.mean = e, this.stdDev = t, this.dtype = n, this.nextVal = NaN, this.truncated = r, this.truncated && (this.upper = this.mean + 2 * this.stdDev, this.lower = this.mean - 2 * this.stdDev);var a = o || Math.random();this.random = seedrandom_1(a.toString());
    }return e.prototype.nextValue = function () {
      if (!isNaN(this.nextVal)) {
        var e = this.nextVal;return this.nextVal = NaN, e;
      }for (var t, n, r = !1; !r;) {
        var o = void 0,
            a = void 0,
            i = void 0;do {
          i = (o = 2 * this.random() - 1) * o + (a = 2 * this.random() - 1) * a;
        } while (i >= 1 || 0 === i);var s = Math.sqrt(-2 * Math.log(i) / i);t = this.mean + this.stdDev * o * s, n = this.mean + this.stdDev * a * s, this.truncated && !this.isValidTruncated(t) || (r = !0);
      }return this.truncated && !this.isValidTruncated(n) || (this.nextVal = this.convertValue(n)), this.convertValue(t);
    }, e.prototype.convertValue = function (e) {
      return null == this.dtype || "float32" === this.dtype ? e : Math.round(e);
    }, e.prototype.isValidTruncated = function (e) {
      return e <= this.upper && e >= this.lower;
    }, e;
  }(),
      TensorOps = function () {
    function e() {}return e.tensor = function (e, t, n) {
      if (void 0 === n && (n = "float32"), !isTypedArray(e) && !Array.isArray(e) && "number" != typeof e && "boolean" != typeof e) throw new Error("values passed to tensor(values) must be an array of numbers or booleans, or a TypedArray");var r = inferShape(e);return null != t && 1 !== r.length && assertShapesMatch(t, r, "Error creating a new Tensor. Inferred shape (" + r + ") does not match the provided shape (" + t + "). "), isTypedArray(e) || Array.isArray(e) || (e = [e]), t = t || r, Tensor.make(t, { values: toTypedArray(e, n) }, n);
    }, e.scalar = function (t, n) {
      if (void 0 === n && (n = "float32"), isTypedArray(t) || Array.isArray(t)) throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean)");return e.tensor(t, [], n);
    }, e.tensor1d = function (t, n) {
      void 0 === n && (n = "float32"), assertNonNull(t);var r = inferShape(t);if (1 !== r.length) throw new Error("tensor1d() requires values to be a flat/TypedArray");return e.tensor(t, r, n);
    }, e.tensor2d = function (t, n, r) {
      if (void 0 === r && (r = "float32"), assertNonNull(t), null != n && 2 !== n.length) throw new Error("tensor2d() requires shape to have two numbers");var o = inferShape(t);if (2 !== o.length && 1 !== o.length) throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if (1 === o.length && null == n) throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return n = n || o, e.tensor(t, n, r);
    }, e.tensor3d = function (t, n, r) {
      if (void 0 === r && (r = "float32"), assertNonNull(t), null != n && 3 !== n.length) throw new Error("tensor3d() requires shape to have three numbers");var o = inferShape(t);if (3 !== o.length && 1 !== o.length) throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if (1 === o.length && null == n) throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return n = n || o, e.tensor(t, n, r);
    }, e.tensor4d = function (t, n, r) {
      if (void 0 === r && (r = "float32"), assertNonNull(t), null != n && 4 !== n.length) throw new Error("tensor4d() requires shape to have four numbers");var o = inferShape(t);if (4 !== o.length && 1 !== o.length) throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if (1 === o.length && null == n) throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return n = n || o, e.tensor(t, n, r);
    }, e.tensor5d = function (t, n, r) {
      if (void 0 === r && (r = "float32"), assertNonNull(t), null != n && 5 !== n.length) throw new Error("tensor5d() requires shape to have five numbers");var o = inferShape(t);if (5 !== o.length && 1 !== o.length) throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if (1 === o.length && null == n) throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return n = n || o, e.tensor(t, n, r);
    }, e.tensor6d = function (t, n, r) {
      if (void 0 === r && (r = "float32"), assertNonNull(t), null != n && 6 !== n.length) throw new Error("tensor6d() requires shape to have six numbers");var o = inferShape(t);if (6 !== o.length && 1 !== o.length) throw new Error("tensor6d() requires values to be number[][][][] or flat/TypedArray");if (1 === o.length && null == n) throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return n = n || o, e.tensor(t, n, r);
    }, e.ones = function (e, t) {
      void 0 === t && (t = "float32");var n = makeOnesTypedArray(sizeFromShape(e), t);return Tensor.make(e, { values: n }, t);
    }, e.zeros = function (e, t) {
      void 0 === t && (t = "float32");var n = makeZerosTypedArray(sizeFromShape(e), t);return Tensor.make(e, { values: n }, t);
    }, e.fill = function (e, t, n) {
      void 0 === n && (n = "float32");var r = getTypedArrayFromDType(n, sizeFromShape(e));return r.fill(t), Tensor.make(e, { values: r }, n);
    }, e.onesLike = function (t) {
      var n = convertToTensor(t, "x", "onesLike");return e.ones(n.shape, n.dtype);
    }, e.zerosLike = function (t) {
      var n = convertToTensor(t, "x", "zerosLike");return e.zeros(n.shape, n.dtype);
    }, e.linspace = function (t, n, r) {
      if (0 === r) throw new Error("Cannot request zero samples");var o = (n - t) / (r - 1),
          a = makeZerosTypedArray(r, "float32");a[0] = t;for (var i = 1; i < a.length; i++) a[i] = a[i - 1] + o;return e.tensor1d(a, "float32");
    }, e.range = function (t, n, r, o) {
      if (void 0 === r && (r = 1), void 0 === o && (o = "float32"), 0 === r) throw new Error("Cannot have a step of zero");if (t === n || t < n && r < 0 || n < t && r > 1) return e.zeros([0], o);var a = makeZerosTypedArray(Math.abs(Math.ceil((n - t) / r)), o);n < t && 1 === r && (r = -1), a[0] = t;for (var i = 1; i < a.length; i++) a[i] = a[i - 1] + r;return e.tensor1d(a, o);
    }, __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "scalar", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor1d", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor2d", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor3d", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor4d", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor5d", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "tensor6d", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "ones", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "zeros", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "fill", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "onesLike", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "zerosLike", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "linspace", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "range", null), e;
  }(),
      fill = TensorOps.fill,
      linspace = TensorOps.linspace,
      ones$1 = TensorOps.ones,
      range = TensorOps.range,
      scalar = TensorOps.scalar,
      tensor = TensorOps.tensor,
      tensor1d = TensorOps.tensor1d,
      tensor2d = TensorOps.tensor2d,
      tensor3d = TensorOps.tensor3d,
      tensor4d = TensorOps.tensor4d,
      tensor5d = TensorOps.tensor5d,
      tensor6d = TensorOps.tensor6d,
      zeros = TensorOps.zeros,
      onesLike = op(TensorOps.onesLike),
      zerosLike = op(TensorOps.zerosLike),
      ArrayOps = function () {
    function e() {}return e.clone = function (e) {
      var t = convertToTensor(e, "x", "clone");return ENV.engine.runKernel(function (e) {
        return Tensor.make(t.shape, { dataId: t.dataId }, t.dtype);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.toFloat();
          } };
      });
    }, e.eye = function (t, n, r, o) {
      void 0 === o && (o = "float32"), null == n && (n = t);for (var a = e.buffer([t, n], o), i = t <= n ? t : n, s = 0; s < i; ++s) a.set(1, s, s);var u = a.toTensor().as2D(t, n);if (null == r) return u;if (1 === r.length) return e.tile(e.expandDims(u, 0), [r[0], 1, 1]);if (2 === r.length) return e.tile(e.expandDims(e.expandDims(u, 0), 0), [r[0], r[1], 1, 1]);if (3 === r.length) return e.tile(e.expandDims(e.expandDims(e.expandDims(u, 0), 0), 0), [r[0], r[1], r[2], 1, 1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received " + r.length + "D.");
    }, e.randomNormal = function (t, n, r, o, a) {
      if (void 0 === n && (n = 0), void 0 === r && (r = 1), null != o && "bool" === o) throw new Error("Unsupported data type " + o);for (var i = new MPRandGauss(n, r, o, !1, a), s = e.buffer(t, o), u = 0; u < s.values.length; u++) s.values[u] = i.nextValue();return s.toTensor();
    }, e.truncatedNormal = function (t, n, r, o, a) {
      if (void 0 === n && (n = 0), void 0 === r && (r = 1), null != o && "bool" === o) throw new Error("Unsupported data type " + o);for (var i = new MPRandGauss(n, r, o, !0, a), s = e.buffer(t, o), u = 0; u < s.values.length; u++) s.values[u] = i.nextValue();return s.toTensor();
    }, e.randomUniform = function (t, n, r, o) {
      void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === o && (o = "float32");for (var a = e.buffer(t, o), i = 0; i < a.values.length; i++) a.values[i] = randUniform(n, r);return a.toTensor();
    }, e.rand = function (e, t, n) {
      var r = sizeFromShape(e),
          o = null;if (null == n || "float32" === n) o = new Float32Array(r);else if ("int32" === n) o = new Int32Array(r);else {
        if ("bool" !== n) throw new Error("Unknown data type " + n);o = new Uint8Array(r);
      }for (var a = 0; a < r; a++) o[a] = t();return Tensor.make(e, { values: o }, n);
    }, e.multinomial = function (e, t, n, r) {
      void 0 === r && (r = !1);var o = convertToTensor(e, "logits", "multinomial"),
          a = o.size,
          i = o.rank;if (a < 2) throw new Error("Error in multinomial: you need at least 2 outcomes, but got " + a + ".");if (i > 2) throw new Error("Rank of probabilities must be 1 or 2, but is " + i);n = n || Math.random();var s = 1 === i ? o.as2D(1, -1) : o,
          u = ENV.engine.runKernel(function (e) {
        return e.multinomial(s, r, t, n);
      }, { logits2D: s });return 1 === i ? u.as1D() : u;
    }, e.oneHot = function (e, t, n, r) {
      void 0 === n && (n = 1), void 0 === r && (r = 0);var o = convertToTensor(e, "indices", "oneHot", "int32");if (assert("int32" === o.dtype, "Indices must be of dtype `int32`"), t < 2) throw new Error("Error in oneHot: depth must be >=2, but it is " + t);return ENV.engine.runKernel(function (e) {
        return e.oneHot(o, t, n, r);
      }, { $indices: o });
    }, e.fromPixels = function (e, t) {
      if (void 0 === t && (t = 3), t > 4) throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");return ENV.engine.fromPixels(e, t);
    }, e.toPixels = function (e, t) {
      return __awaiter(this, void 0, void 0, function () {
        var n, r, o, a, i, s, u, l, c, d, p, h, f, g, m, v, y, x, T, b;return __generator(this, function (S) {
          switch (S.label) {case 0:
              if (2 !== (n = convertToTensor(e, "img", "toPixels", "int32")).rank && 3 !== n.rank) throw new Error("toPixels only supports rank 2 or 3 tensors, got rank " + n.rank + ".");if (r = n.shape.slice(0, 2), o = r[0], a = r[1], (i = 2 === n.rank ? 1 : n.shape[2]) > 4 || 2 === i) throw new Error("toPixels only supports depth of size 1, 3 or 4 but got " + i);return s = n.min(), u = n.max(), [4, s.data()];case 1:
              return l = S.sent()[0], [4, u.data()];case 2:
              if (c = S.sent()[0], s.dispose(), u.dispose(), "float32" === n.dtype) {
                if (l < 0 || c > 1) throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range [" + l + " - " + c + "].");
              } else {
                if ("int32" !== n.dtype) throw new Error("Unsupported type for toPixels: " + n.dtype + ". Please use float32 or int32 tensors.");if (l < 0 || c > 255) throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range [" + l + " - " + c + "].");
              }return [4, n.data()];case 3:
              for (d = S.sent(), p = "float32" === n.dtype ? 255 : 1, h = new Uint8ClampedArray(a * o * 4), f = 0; f < o * a; ++f) g = void 0, m = void 0, v = void 0, y = void 0, 1 === i ? (g = d[f] * p, m = d[f] * p, v = d[f] * p, y = 255) : 3 === i ? (g = d[3 * f] * p, m = d[3 * f + 1] * p, v = d[3 * f + 2] * p, y = 255) : 4 === i && (g = d[4 * f] * p, m = d[4 * f + 1] * p, v = d[4 * f + 2] * p, y = d[4 * f + 3] * p), h[(x = 4 * f) + 0] = Math.round(g), h[x + 1] = Math.round(m), h[x + 2] = Math.round(v), h[x + 3] = Math.round(y);return null != t && (t.width = a, t.height = o, T = t.getContext("2d"), b = new ImageData(h, a, o), T.putImageData(b, 0, 0)), n !== e && n.dispose(), [2, h];}
        });
      });
    }, e.reshape = function (e, t) {
      var n = convertToTensor(e, "x", "reshape");t = inferFromImplicitShape(t, n.size), assert(n.size === sizeFromShape(t), "new shape and old shape must have the same number of elements.");return ENV.engine.runKernel(function (e) {
        return e.reshape(n, t);
      }, { $x: n }, function (e) {
        return { $x: function () {
            return e.reshape(n.shape);
          } };
      });
    }, e.squeeze = function (t, n) {
      var r = convertToTensor(t, "x", "squeeze");return e.reshape(r, squeezeShape(r.shape, n).newShape);
    }, e.cast = function (e, t) {
      var n = convertToTensor(e, "x", "cast");return ENV.engine.runKernel(function (e) {
        return e.cast(n, t);
      }, { $x: n }, function (e) {
        return { $x: function () {
            return e.clone();
          } };
      });
    }, e.tile = function (e, t) {
      var n = convertToTensor(e, "x", "tile");assert(n.rank === t.length, "Error in transpose: rank of input " + n.rank + " must match length of reps " + t + ".");return ENV.engine.runKernel(function (e) {
        return e.tile(n, t);
      }, { $x: n }, function (e) {
        return { $x: function () {
            var r = zerosLike(n);if (1 === n.rank) for (var o = 0; o < t[0]; ++o) r = r.add(e.slice([o * n.shape[0]], [n.shape[0]]));else if (2 === n.rank) for (o = 0; o < t[0]; ++o) for (var a = 0; a < t[1]; ++a) r = r.add(e.slice([o * n.shape[0], a * n.shape[1]], [n.shape[0], n.shape[1]]));else if (3 === n.rank) for (o = 0; o < t[0]; ++o) for (a = 0; a < t[1]; ++a) for (var i = 0; i < t[2]; ++i) r = r.add(e.slice([o * n.shape[0], a * n.shape[1], i * n.shape[2]], [n.shape[0], n.shape[1], n.shape[2]]));else {
              if (4 !== n.rank) throw new Error("Gradient for tile operation is not implemented for rank-" + n.rank + " tensors yet.");for (o = 0; o < t[0]; ++o) for (a = 0; a < t[1]; ++a) for (i = 0; i < t[2]; ++i) for (var s = 0; s < t[3]; ++s) r = r.add(e.slice([o * n.shape[0], a * n.shape[1], i * n.shape[2], s * n.shape[3]], [n.shape[0], n.shape[1], n.shape[2], n.shape[3]]));
            }return r;
          } };
      });
    }, e.pad1d = function (t, n, r) {
      return void 0 === r && (r = 0), assert(2 === n.length, "Invalid number of paddings. Must be length of 2."), e.pad(t, [n], r);
    }, e.pad2d = function (t, n, r) {
      return void 0 === r && (r = 0), assert(2 === n.length && 2 === n[0].length && 2 === n[1].length, "Invalid number of paddings. Must be length of 2 each."), e.pad(t, n, r);
    }, e.pad3d = function (t, n, r) {
      return void 0 === r && (r = 0), assert(3 === n.length && 2 === n[0].length && 2 === n[1].length && 2 === n[2].length, "Invalid number of paddings. Must be length of 2 each."), e.pad(t, n, r);
    }, e.pad4d = function (t, n, r) {
      return void 0 === r && (r = 0), assert(4 === n.length && 2 === n[0].length && 2 === n[1].length && 2 === n[2].length && 2 === n[3].length, "Invalid number of paddings. Must be length of 2 each."), e.pad(t, n, r);
    }, e.pad = function (e, t, n) {
      void 0 === n && (n = 0);var r = convertToTensor(e, "x", "pad");if (0 === r.rank) throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var o = t.map(function (e) {
        return e[0];
      });return ENV.engine.runKernel(function (e) {
        return e.pad(r, t, n);
      }, { $x: r }, function (e) {
        return { $x: function () {
            return e.slice(o, r.shape);
          } };
      });
    }, e.stack = function (e, t) {
      void 0 === t && (t = 0);var n = convertToTensorArray(e, "tensors", "stack");if (assert(n.length >= 1, "Pass at least one tensor to tf.stack"), 1 === n.length) return n[0].expandDims(t);var r = n[0].rank,
          o = n[0].shape,
          a = n[0].dtype;assert(t <= r, "Axis must be <= rank of the tensor"), n.forEach(function (e) {
        assertShapesMatch(o, e.shape, "All tensors passed to stack must have matching shapes");
      }), n.forEach(function (e) {
        assert(a === e.dtype, "All tensors passed to stack must have matching dtypes");
      });var i = n.map(function (e) {
        return e.expandDims(t);
      });return concat(i, t);
    }, e.unstack = function (e, t) {
      void 0 === t && (t = 0);for (var n, r = convertToTensor(e, "x", "unstack"), o = r.shape[t], a = Array(r.rank - 1).fill(0), i = 0, s = 0; s < r.rank; s++) s !== t && (a[i] = r.shape[s], i++);n = Array(o).fill(1);var u = Array(r.rank).fill(0),
          l = r.shape.slice();return n.map(function (e) {
        l[t] = e;var n = r.slice(u, l);return u[t] += e, n.reshape(a);
      });
    }, e.split = function (e, t, n) {
      void 0 === n && (n = 0);var r,
          o = convertToTensor(e, "x", "split");n = parseAxisParam(n, o.shape)[0], "number" == typeof t ? (assert(o.shape[n] % t == 0, "Number of splits must evenly divide the axis."), r = Array(t).fill(o.shape[n] / t)) : (assert(o.shape[n] === t.reduce(function (e, t) {
        return e + t;
      }), "The sum of sizes must match the size of the axis dimension."), r = t);var a = Array(o.rank).fill(0),
          i = o.shape.slice();return r.map(function (e) {
        i[n] = e;var t = o.slice(a, i);return a[n] += e, t;
      });
    }, e.cumsum = function (e, t, n, r) {
      void 0 === t && (t = 0), void 0 === n && (n = !1), void 0 === r && (r = !1);var o = convertToTensor(e, "x", "cumsum"),
          a = getAxesPermutation([t |= 0], o.rank),
          i = o;null != a && (i = o.transpose(a));var s = getInnerMostAxes(1, o.rank)[0],
          u = ENV.engine.runKernel(function (e) {
        return e.cumsum(i, s, n, r);
      }, { permutedX: i }, function (e) {
        return { permutedX: function () {
            return e.cumsum(t, n, !r);
          } };
      });return null != a && (u = u.transpose(a)), u;
    }, e.expandDims = function (t, n) {
      void 0 === n && (n = 0);var r = convertToTensor(t, "x", "expandDims");assert(n <= r.rank, "Axis must be <= rank of the tensor");var o = r.shape.slice();return n < 0 && (assert(-(r.rank + 1) <= n, "Axis must be in the interval [" + -(r.rank + 1) + ", " + r.rank + "]"), n = r.rank + n + 1), o.splice(n, 0, 1), e.reshape(r, o);
    }, e.buffer = function (e, t, n) {
      return void 0 === t && (t = "float32"), new TensorBuffer(e, t, n);
    }, e.print = function (e, t) {
      void 0 === t && (t = !1), console.log(e.toString(t));
    }, __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "clone", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "eye", null), __decorate([doc({ heading: "Tensors", subheading: "Random" })], e, "randomNormal", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "truncatedNormal", null), __decorate([doc({ heading: "Tensors", subheading: "Random" })], e, "randomUniform", null), __decorate([doc({ heading: "Tensors", subheading: "Random" })], e, "multinomial", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "oneHot", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "fromPixels", null), __decorate([doc({ heading: "Visualization" })], e, "toPixels", null), __decorate([doc({ heading: "Tensors", subheading: "Transformations" })], e, "reshape", null), __decorate([doc({ heading: "Tensors", subheading: "Transformations" })], e, "squeeze", null), __decorate([doc({ heading: "Tensors", subheading: "Transformations" })], e, "cast", null), __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "tile", null), __decorate([doc({ heading: "Tensors", subheading: "Transformations" })], e, "pad", null), __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "stack", null), __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "unstack", null), __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "split", null), __decorate([doc({ heading: "Operations", subheading: "Scan" })], e, "cumsum", null), __decorate([doc({ heading: "Tensors", subheading: "Transformations" })], e, "expandDims", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "buffer", null), __decorate([doc({ heading: "Tensors", subheading: "Creation" })], e, "print", null), e;
  }(),
      buffer = ArrayOps.buffer,
      toPixels = ArrayOps.toPixels,
      cast = op(ArrayOps.cast),
      clone = op(ArrayOps.clone),
      cumsum = op(ArrayOps.cumsum),
      expandDims = op(ArrayOps.expandDims),
      eye = op(ArrayOps.eye),
      fromPixels = op(ArrayOps.fromPixels),
      multinomial = op(ArrayOps.multinomial),
      oneHot = op(ArrayOps.oneHot),
      pad = op(ArrayOps.pad),
      pad1d = op(ArrayOps.pad1d),
      pad2d = op(ArrayOps.pad2d),
      pad3d = op(ArrayOps.pad3d),
      pad4d = op(ArrayOps.pad4d),
      print = op(ArrayOps.print),
      rand = op(ArrayOps.rand),
      randomNormal = op(ArrayOps.randomNormal),
      randomUniform = op(ArrayOps.randomUniform),
      reshape = op(ArrayOps.reshape),
      split = op(ArrayOps.split),
      squeeze = op(ArrayOps.squeeze),
      stack = op(ArrayOps.stack),
      tile = op(ArrayOps.tile),
      truncatedNormal = op(ArrayOps.truncatedNormal),
      unstack = op(ArrayOps.unstack);function getBroadcastDims(e, t) {
    for (var n = e.length, r = [], o = 0; o < n; o++) {
      var a = n - 1 - o,
          i = e[a] || 1;(t[t.length - 1 - o] || 1) > 1 && 1 === i && r.unshift(a);
    }return r;
  }function getReductionAxes(e, t) {
    for (var n = [], r = 0; r < t.length; r++) {
      var o = e[e.length - r - 1],
          a = t.length - r - 1,
          i = t[a];(null == o || 1 === o && i > 1) && n.unshift(a);
    }return n;
  }function broadcastDimsAreOuter(e) {
    for (var t = 0; t < e.length; t++) if (e[t] !== t) return !1;return !0;
  }function assertAndGetBroadcastShape(e, t) {
    for (var n = [], r = "Operands could not be broadcast together with shapes " + e + " and " + t + ".", o = Math.max(e.length, t.length), a = 0; a < o; a++) {
      var i = e[e.length - a - 1] || 1,
          s = t[t.length - a - 1] || 1;if (i > 1 && s > 1 && i !== s) throw Error(r);n.unshift(Math.max(i, s));
    }return n;
  }var UnaryOps = function () {
    function e() {}return e.neg = function (e) {
      var t = convertToTensor(e, "x", "neg");return ENV.engine.runKernel(function (e) {
        return e.neg(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.neg();
          } };
      });
    }, e.ceil = function (e) {
      var t = convertToTensor(e, "x", "ceil");return ENV.engine.runKernel(function (e) {
        return e.ceil(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return zerosLike(e);
          } };
      });
    }, e.floor = function (e) {
      var t = convertToTensor(e, "x", "floor");return ENV.engine.runKernel(function (e) {
        return e.floor(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return zerosLike(e);
          } };
      });
    }, e.sign = function (e) {
      var t = convertToTensor(e, "x", "sign");return ENV.engine.runKernel(function (e) {
        return e.sign(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return zerosLike(e);
          } };
      });
    }, e.round = function (e) {
      var t = convertToTensor(e, "x", "round");return ENV.engine.runKernel(function (e) {
        return e.round(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return zerosLike(e);
          } };
      });
    }, e.exp = function (e) {
      var t = convertToTensor(e, "x", "exp");return ENV.engine.runKernel(function (e, n) {
        return n(e.exp(t));
      }, { $x: t }, function (e, t) {
        var n = t[0];return { $x: function () {
            return e.mulStrict(n);
          } };
      });
    }, e.expm1 = function (e) {
      var t = convertToTensor(e, "x", "expm1");return ENV.engine.runKernel(function (e) {
        return e.expm1(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.mulStrict(t.exp());
          } };
      });
    }, e.log = function (e) {
      var t = convertToTensor(e, "x", "log");return ENV.engine.runKernel(function (e) {
        return e.log(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.toFloat());
          } };
      });
    }, e.log1p = function (e) {
      var t = convertToTensor(e, "x", "log1p");return ENV.engine.runKernel(function (e) {
        return e.log1p(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.add(scalar(1)));
          } };
      });
    }, e.sqrt = function (e) {
      var t = convertToTensor(e, "x", "sqrt");return ENV.engine.runKernel(function (e) {
        return e.sqrt(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.toFloat().sqrt().mul(scalar(2)));
          } };
      });
    }, e.rsqrt = function (e) {
      var t = convertToTensor(e, "x", "rsqrt");return ENV.engine.runKernel(function (e) {
        return e.rsqrt(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.pow(scalar(1.5)).mul(scalar(2))).neg();
          } };
      });
    }, e.square = function (e) {
      var t = convertToTensor(e, "x", "square");return ENV.engine.runKernel(function (e) {
        return e.square(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.mulStrict(t.toFloat().mul(scalar(2)));
          } };
      });
    }, e.reciprocal = function (e) {
      var t = convertToTensor(e, "x", "reciprocal");return ENV.engine.runKernel(function (e) {
        return e.reciprocal(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.square().neg());
          } };
      });
    }, e.abs = function (e) {
      var t = convertToTensor(e, "x", "abs");return ENV.engine.runKernel(function (e) {
        return e.abs(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.mulStrict(t.toFloat().step(-1));
          } };
      });
    }, e.clipByValue = function (e, t, n) {
      var r = convertToTensor(e, "x", "clipByValue");assert(t <= n, "Error in clip: min (" + t + ") must be less than or equal to max (" + n + ").");return ENV.engine.runKernel(function (e) {
        return e.clip(r, t, n);
      }, { $x: r }, function (e) {
        return { $x: function () {
            return e.where(r.greaterEqual(scalar(t)).logicalAnd(r.lessEqual(scalar(n))), zerosLike(e));
          } };
      });
    }, e.sigmoid = function (e) {
      var t = convertToTensor(e, "x", "sigmoid");return ENV.engine.runKernel(function (e, n) {
        return n(e.sigmoid(t));
      }, { $x: t }, function (e, t) {
        var n = t[0];return { $x: function () {
            return e.mulStrict(n.mul(scalar(1).sub(n)));
          } };
      });
    }, e.logSigmoid = function (e) {
      var t = convertToTensor(e, "x", "logSigmoid");return ENV.engine.runKernel(function (e) {
        return e.softplus(t.neg()).neg();
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.mulStrict(t.neg().sigmoid());
          } };
      });
    }, e.softplus = function (e) {
      var t = convertToTensor(e, "x", "softplus");return ENV.engine.runKernel(function (e) {
        return e.softplus(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.mulStrict(t.sigmoid());
          } };
      });
    }, e.sin = function (e) {
      var t = convertToTensor(e, "x", "sin");return ENV.engine.runKernel(function (e) {
        return e.sin(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return t.toFloat().cos().mulStrict(e);
          } };
      });
    }, e.cos = function (e) {
      var t = convertToTensor(e, "x", "cos");return ENV.engine.runKernel(function (e) {
        return e.cos(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return t.toFloat().sin().neg().mulStrict(e);
          } };
      });
    }, e.tan = function (e) {
      var t = convertToTensor(e, "x", "tan");return ENV.engine.runKernel(function (e) {
        return e.tan(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.cos().square());
          } };
      });
    }, e.asin = function (e) {
      var t = convertToTensor(e, "x", "asin");return ENV.engine.runKernel(function (e) {
        return e.asin(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(scalar(1).sub(t.toFloat().square()).sqrt());
          } };
      });
    }, e.acos = function (e) {
      var t = convertToTensor(e, "x", "acos");return ENV.engine.runKernel(function (e) {
        return e.acos(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(scalar(1).sub(t.toFloat().square()).sqrt()).neg();
          } };
      });
    }, e.atan = function (e) {
      var t = convertToTensor(e, "x", "atan");return ENV.engine.runKernel(function (e) {
        return e.atan(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(scalar(1).add(t.toFloat().square()));
          } };
      });
    }, e.sinh = function (e) {
      var t = convertToTensor(e, "x", "sinh");return ENV.engine.runKernel(function (e) {
        return e.sinh(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return t.toFloat().cosh().mulStrict(e);
          } };
      });
    }, e.cosh = function (e) {
      var t = convertToTensor(e, "x", "cosh");return ENV.engine.runKernel(function (e) {
        return e.cosh(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return t.toFloat().sinh().mulStrict(e);
          } };
      });
    }, e.tanh = function (e) {
      var t = convertToTensor(e, "x", "tanh");return ENV.engine.runKernel(function (e, n) {
        return n(e.tanh(t));
      }, { $x: t }, function (e, t) {
        var n = t[0];return { $x: function () {
            return scalar(1).sub(n.square()).mulStrict(e);
          } };
      });
    }, e.asinh = function (e) {
      var t = convertToTensor(e, "x", "asinh");return ENV.engine.runKernel(function (e) {
        return e.asinh(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(scalar(1).add(t.toFloat().square()).sqrt());
          } };
      });
    }, e.acosh = function (e) {
      var t = convertToTensor(e, "x", "acosh");return ENV.engine.runKernel(function (e) {
        return e.acosh(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(t.toFloat().square().sub(scalar(1)).sqrt());
          } };
      });
    }, e.atanh = function (e) {
      var t = convertToTensor(e, "x", "atanh");return ENV.engine.runKernel(function (e) {
        return e.atanh(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.divStrict(scalar(1).sub(t.toFloat().square()));
          } };
      });
    }, e.erf = function (e) {
      var t = convertToTensor(e, "x", "erf");assert("int32" === t.dtype || "float32" === t.dtype, "Input dtype must be `int32` or `float32`."), "int32" === t.dtype && (t = t.toFloat());return ENV.engine.runKernel(function (e) {
        return e.erf(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            return e.mulStrict(scalar(2 / Math.sqrt(Math.PI)).mul(t.square().neg().exp()));
          } };
      });
    }, e.step = function (e, t) {
      void 0 === t && (t = 0);var n = convertToTensor(e, "x", "step");return ENV.engine.runKernel(function (e) {
        return e.step(n, t);
      }, { $x: n }, function (e) {
        return { $x: function () {
            return zerosLike(e);
          } };
      });
    }, __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "neg", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "ceil", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "floor", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "sign", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "round", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "exp", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "expm1", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "log", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "log1p", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "sqrt", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "rsqrt", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "square", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "reciprocal", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "abs", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "clipByValue", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "sigmoid", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "logSigmoid", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "softplus", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "sin", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "cos", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "tan", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "asin", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "acos", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "atan", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "sinh", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "cosh", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "tanh", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "asinh", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "acosh", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "atanh", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "erf", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "step", null), e;
  }(),
      abs = op(UnaryOps.abs),
      acos = op(UnaryOps.acos),
      acosh = op(UnaryOps.acosh),
      asin = op(UnaryOps.asin),
      asinh = op(UnaryOps.asinh),
      atan = op(UnaryOps.atan),
      atanh = op(UnaryOps.atanh),
      ceil = op(UnaryOps.ceil),
      clipByValue = op(UnaryOps.clipByValue),
      cos = op(UnaryOps.cos),
      cosh = op(UnaryOps.cosh),
      erf = op(UnaryOps.erf),
      exp = op(UnaryOps.exp),
      expm1 = op(UnaryOps.expm1),
      floor = op(UnaryOps.floor),
      log = op(UnaryOps.log),
      log1p = op(UnaryOps.log1p),
      logSigmoid = op(UnaryOps.logSigmoid),
      neg = op(UnaryOps.neg),
      reciprocal = op(UnaryOps.reciprocal),
      round = op(UnaryOps.round),
      rsqrt = op(UnaryOps.rsqrt),
      sigmoid = op(UnaryOps.sigmoid),
      sign = op(UnaryOps.sign),
      sin = op(UnaryOps.sin),
      sinh = op(UnaryOps.sinh),
      softplus = op(UnaryOps.softplus),
      sqrt = op(UnaryOps.sqrt),
      square = op(UnaryOps.square),
      step = op(UnaryOps.step),
      tan = op(UnaryOps.tan),
      tanh$1 = op(UnaryOps.tanh),
      BatchNormOps = function () {
    function e() {}return e.batchNormalization2d = function (t, n, r, o, a, i) {
      void 0 === o && (o = .001);var s,
          u,
          l = convertToTensor(t, "x", "batchNormalization"),
          c = convertToTensor(n, "mean", "batchNormalization"),
          d = convertToTensor(r, "variance", "batchNormalization");return null != a && (s = convertToTensor(a, "scale", "batchNormalization")), null != i && (u = convertToTensor(i, "offset", "batchNormalization")), assert(2 === l.rank, "Error in batchNormalization3D: x must be rank 3 but got rank " + l.rank + "."), assert(2 === c.rank || 1 === c.rank, "Error in batchNormalization2D: mean must be rank 2 or rank 1 but got rank " + c.rank + "."), assert(2 === d.rank || 1 === d.rank, "Error in batchNormalization2D: variance must be rank 2 or rank 1 but got rank " + d.rank + "."), null != s && assert(2 === s.rank || 1 === s.rank, "Error in batchNormalization2D: scale must be rank 2 or rank 1 but got rank " + s.rank + "."), null != u && assert(2 === u.rank || 1 === u.rank, "Error in batchNormalization2D: offset must be rank 2 or rank 1 but got rank " + u.rank + "."), e.batchNormalization(l, c, d, o, s, u);
    }, e.batchNormalization3d = function (t, n, r, o, a, i) {
      void 0 === o && (o = .001);var s,
          u,
          l = convertToTensor(t, "x", "batchNormalization"),
          c = convertToTensor(n, "mean", "batchNormalization"),
          d = convertToTensor(r, "variance", "batchNormalization");return null != a && (s = convertToTensor(a, "scale", "batchNormalization")), null != i && (u = convertToTensor(i, "offset", "batchNormalization")), assert(3 === l.rank, "Error in batchNormalization3D: x must be rank 3 but got rank " + l.rank + "."), assert(3 === c.rank || 1 === c.rank, "Error in batchNormalization3D: mean must be rank 3 or rank 1 but got rank " + c.rank + "."), assert(3 === d.rank || 1 === d.rank, "Error in batchNormalization3D: variance must be rank 3 or rank 1 but got rank " + d.rank + "."), null != s && assert(3 === s.rank || 1 === s.rank, "Error in batchNormalization3D: scale must be rank 3 or rank 1 but got rank " + s.rank + "."), null != u && assert(3 === u.rank || 1 === u.rank, "Error in batchNormalization3D: offset must be rank 3 or rank 1 but got rank " + u.rank + "."), e.batchNormalization(l, c, d, o, s, u);
    }, e.batchNormalization4d = function (t, n, r, o, a, i) {
      void 0 === o && (o = .001);var s,
          u,
          l = convertToTensor(t, "x", "batchNormalization"),
          c = convertToTensor(n, "mean", "batchNormalization"),
          d = convertToTensor(r, "variance", "batchNormalization");return null != a && (s = convertToTensor(a, "scale", "batchNormalization")), null != i && (u = convertToTensor(i, "offset", "batchNormalization")), assert(4 === l.rank, "Error in batchNormalization4D: x must be rank 4 but got rank " + l.rank + "."), assert(4 === c.rank || 1 === c.rank, "Error in batchNormalization4D: mean must be rank 4 or rank 1 but got rank " + c.rank + "."), assert(4 === d.rank || 1 === d.rank, "Error in batchNormalization4D: variance must be rank 4 or rank 1 but got rank " + d.rank + "."), null != s && assert(4 === s.rank || 1 === s.rank, "Error in batchNormalization4D: scale must be rank 4 or rank 1 but got rank " + s.rank + "."), null != u && assert(4 === u.rank || 1 === u.rank, "Error in batchNormalization4D: offset must be rank 4 or rank 1 but got rank " + u.rank + "."), e.batchNormalization(l, c, d, o, s, u);
    }, e.batchNormalization = function (e, t, n, r, o, a) {
      void 0 === r && (r = .001);var i,
          s,
          u,
          l = convertToTensor(e, "x", "batchNormalization"),
          c = convertToTensor(t, "mean", "batchNormalization"),
          d = convertToTensor(n, "variance", "batchNormalization");null != o && (i = convertToTensor(o, "scale", "batchNormalization")), null != a && (s = convertToTensor(a, "offset", "batchNormalization")), assert(c.rank === d.rank, "Batch normalization gradient requires mean and variance to have equal ranks."), assert(null == s || c.rank === s.rank, "Batch normalization gradient requires mean and offset to have equal ranks."), assert(null == i || c.rank === i.rank, "Batch normalization gradient requires mean and scale to have equal ranks."), u = 0 === l.rank || 1 === l.rank ? l.as4D(1, 1, 1, l.size) : 2 === l.rank ? l.as4D(1, 1, l.shape[0], l.shape[1]) : 3 === l.rank ? l.as4D(1, l.shape[0], l.shape[1], l.shape[2]) : l;return ENV.engine.runKernel(function (e) {
        return e.batchNormalization(u, batchnormReshape4D(c), batchnormReshape4D(d), r, batchnormReshape4D(i), batchnormReshape4D(s));
      }, { $x: l, $mean: c, $variance: d, $scale: i, $offset: s }, function (e) {
        var t = null == i ? scalar(1) : i,
            n = getReductionAxes(c.shape, u.shape),
            o = [];if (1 === c.rank) {
          for (var a = 0; a < u.shape.length - 1; ++a) o.push(u.shape[a]);o.push(1);
        }var s = l.sub(c),
            p = e.mul(t),
            h = rsqrt(d.add(scalar(r))),
            f = h.mul(h).mul(h).mul(scalar(-.5));return { $x: function () {
            return 1 === c.rank ? e.mul(tile(h.as4D(1, 1, 1, c.shape[0]), o)).mul(t).reshape(l.shape) : e.mul(h).mul(t).reshape(l.shape);
          }, $mean: function () {
            var e = h.mul(scalar(-1)).mul(p);return 1 === c.rank && (e = e.sum(n)), e.reshape(c.shape);
          }, $variance: function () {
            var e = f.mul(s).mul(p);return 1 === c.rank && (e = e.sum(n)), e.reshape(c.shape);
          }, $scale: function () {
            var t = s.mul(h),
                r = e.mul(t);return 1 === c.rank && (r = r.sum(n)), r.reshape(c.shape);
          }, $offset: function () {
            var t = e;return 1 === c.rank && (t = t.sum(n)), t.reshape(c.shape);
          } };
      }).reshape(l.shape);
    }, __decorate([doc({ heading: "Operations", subheading: "Normalization" })], e, "batchNormalization", null), e;
  }();function batchnormReshape4D(e) {
    return null == e ? null : 0 === e.rank ? e.as1D() : 1 === e.rank ? e : 2 === e.rank ? e.as4D(1, 1, e.shape[0], e.shape[1]) : 3 === e.rank ? e.as4D(1, e.shape[0], e.shape[1], e.shape[2]) : e;
  }var batchNormalization2d = op(BatchNormOps.batchNormalization2d),
      batchNormalization3d = op(BatchNormOps.batchNormalization3d),
      batchNormalization4d = op(BatchNormOps.batchNormalization4d),
      batchNormalization = op(BatchNormOps.batchNormalization);function computePool2DInfo(e, t, n, r, o, a) {
    void 0 === a && (a = "channelsLast");var i,
        s = parseTupleParam(t),
        u = s[0],
        l = s[1];if ("channelsLast" === a) i = [u, l, e[3], e[3]];else {
      if ("channelsFirst" !== a) throw new Error("Unknown dataFormat " + a);i = [u, l, e[1], e[1]];
    }return computeConv2DInfo(e, i, n, 1, r, o, !1, a);
  }function computeConv2DInfo(e, t, n, r, o, a, i, s) {
    void 0 === i && (i = !1), void 0 === s && (s = "channelsLast");var u = [-1, -1, -1, -1],
        l = u[0],
        c = u[1],
        d = u[2],
        p = u[3];if ("channelsLast" === s) l = e[0], c = e[1], d = e[2], p = e[3];else {
      if ("channelsFirst" !== s) throw new Error("Unknown dataFormat " + s);l = e[0], p = e[1], c = e[2], d = e[3];
    }var h,
        f = t[0],
        g = t[1],
        m = t[3],
        v = parseTupleParam(n),
        y = v[0],
        x = v[1],
        T = parseTupleParam(r),
        b = T[0],
        S = T[1],
        E = getPadAndOutInfo(o, c, d, y, x, getEffectiveFilterSize(f, b), getEffectiveFilterSize(g, S), a),
        w = E.padInfo,
        A = E.outHeight,
        R = E.outWidth,
        C = i ? m * p : m;return "channelsFirst" === s ? h = [l, C, A, R] : "channelsLast" === s && (h = [l, A, R, C]), { batchSize: l, dataFormat: s, inHeight: c, inWidth: d, inChannels: p, outHeight: A, outWidth: R, outChannels: C, padInfo: w, strideHeight: y, strideWidth: x, filterHeight: f, filterWidth: g, dilationHeight: b, dilationWidth: S, inShape: e, outShape: h, filterShape: t };
  }function computeOutputShape3D(e, t, n, r, o, a) {
    null == o && (o = computeDefaultPad(e, t, r));var i = e[0],
        s = e[1],
        u = conditionalRound((i - t + 2 * o) / r + 1, a);assert(isInt(u), "The output # of rows (" + u + ") must be an integer. Change the stride and/or zero pad parameters");var l = conditionalRound((s - t + 2 * o) / r + 1, a);return assert(isInt(l), "The output # of columns (" + l + ") must be an integer. Change the stride and/or zero pad parameters"), [u, l, n];
  }function computeDefaultPad(e, t, n, r) {
    void 0 === r && (r = 1);var o = getEffectiveFilterSize(t, r);return Math.floor((e[0] * (n - 1) - n + o) / 2);
  }function parseTupleParam(e) {
    return "number" == typeof e ? [e, e] : e;
  }function getEffectiveFilterSize(e, t) {
    return t <= 1 ? e : e + (e - 1) * (t - 1);
  }function getPadAndOutInfo(e, t, n, r, o, a, i, s) {
    var u, l, c;if ("number" == typeof e) {
      u = { top: e, bottom: e, left: e, right: e, type: 0 === e ? "VALID" : "NUMBER" };var d = computeOutputShape3D([t, n, 1], a, 1, r, e, s);l = d[0], c = d[1];
    } else if ("same" === e) {
      var p = ((l = Math.ceil(t / r)) - 1) * r + a - t,
          h = ((c = Math.ceil(n / o)) - 1) * o + i - n,
          f = Math.floor(p / 2),
          g = p - f,
          m = Math.floor(h / 2);u = { top: f, bottom: g, left: m, right: h - m, type: "SAME" };
    } else {
      if ("valid" !== e) throw Error("Unknown padding parameter: " + e);u = { top: 0, bottom: 0, left: 0, right: 0, type: "VALID" }, l = Math.ceil((t - a + 1) / r), c = Math.ceil((n - i + 1) / o);
    }return { padInfo: u, outHeight: l, outWidth: c };
  }function conditionalRound(e, t) {
    if (!t) return e;switch (t) {case "round":
        return Math.round(e);case "ceil":
        return Math.ceil(e);case "floor":
        return Math.floor(e);default:
        throw new Error("Unknown roundingMode " + t);}
  }var ConvOps = function () {
    function e() {}return e.conv1d = function (t, n, r, o, a, i, s) {
      void 0 === a && (a = "NWC"), void 0 === i && (i = 1);var u = convertToTensor(t, "x", "conv1d"),
          l = convertToTensor(n, "filter", "conv1d"),
          c = u,
          d = !1;2 === u.rank && (d = !0, c = u.as3D(1, u.shape[0], u.shape[1])), assert(3 === c.rank, "Error in conv1d: input must be rank 3, but got rank " + c.rank + "."), assert(3 === l.rank, "Error in conv1d: filter must be rank 3, but got rank " + l.rank + "."), null != s && assert(isInt(o), "Error in conv1d: pad must be an integer when using, dimRoundingMode " + s + " but got pad " + o + "."), assert(c.shape[2] === l.shape[1], "Error in conv1d: depth of input (" + c.shape[2] + ") must match input depth for filter " + l.shape[1] + "."), assert(eitherStridesOrDilationsAreOne(r, i), "Error in conv1D: Either stride or dilation must be 1. Got stride " + r + " and dilation '" + i + "'"), assert("NWC" === a, "Error in conv1d: got dataFormat of " + a + " but only NWC is currently supported.");var p = l.as4D(1, l.shape[0], l.shape[1], l.shape[2]),
          h = c.as4D(c.shape[0], 1, c.shape[1], c.shape[2]),
          f = [1, r],
          g = [1, i],
          m = e.conv2d(h, p, f, o, "NHWC", g, s);return d ? m.as2D(m.shape[2], m.shape[3]) : m.as3D(m.shape[0], m.shape[2], m.shape[3]);
    }, e.conv2d = function (t, n, r, o, a, i, s) {
      void 0 === a && (a = "NHWC"), void 0 === i && (i = [1, 1]);var u = convertToTensor(t, "x", "conv2d"),
          l = convertToTensor(n, "filter", "conv2d"),
          c = u,
          d = !1;3 === u.rank && (d = !0, c = u.as4D(1, u.shape[0], u.shape[1], u.shape[2])), assert(4 === c.rank, "Error in conv2d: input must be rank 4, but got rank " + c.rank + "."), assert(4 === l.rank, "Error in conv2d: filter must be rank 4, but got rank " + l.rank + "."), null != s && assert(isInt(o), "Error in conv2d: pad must be an integer when using, dimRoundingMode " + s + " but got pad " + o + "."), assert(c.shape[3] === l.shape[2], "Error in conv2d: depth of input (" + c.shape[3] + ") must match input depth for filter " + l.shape[2] + "."), assert(eitherStridesOrDilationsAreOne(r, i), "Error in conv2D: Either strides or dilations must be 1. Got strides " + r + " and dilations '" + i + "'"), assert("NHWC" === a, "Error in conv2d: got dataFormat of " + a + " but only NHWC is currently supported.");var p = computeConv2DInfo(c.shape, l.shape, r, i, o, s),
          h = ENV.engine.runKernel(function (e) {
        return e.conv2d(c, l, p);
      }, { x: c, $filter: l }, function (t) {
        return assert(tupleValuesAreOne(i), "Error in gradient of conv2D: dilation rates greater than 1 are notyet supported in gradients. Got dilations '" + i + "'"), { x: function () {
            return e.conv2dDerInput(c.shape, t, l, r, o);
          }, $filter: function () {
            return e.conv2dDerFilter(c, t, l.shape, r, o);
          } };
      });return d ? h.as3D(h.shape[1], h.shape[2], h.shape[3]) : h;
    }, e.conv2dDerInput = function (e, t, n, r, o, a) {
      assert(e.length === t.rank, "Length of inShape (" + e.length + ") and rank of dy (" + t.rank + ") must match");var i = e,
          s = t,
          u = !1;3 === t.rank && (u = !0, s = t.as4D(1, t.shape[0], t.shape[1], t.shape[2]), i = [1, e[0], e[1], e[2]]);var l = i[3],
          c = s.shape[3];assert(4 === i.length, "Error in conv2dDerInput: inShape must be length 4, but got length " + i.length + "."), assert(4 === s.rank, "Error in conv2dDerInput: dy must be rank 4, but got rank " + s.rank), assert(4 === n.rank, "Error in conv2dDerInput: filter must be rank 4, but got rank " + n.rank), assert(l === n.shape[2], "Error in conv2dDerInput: depth of input (" + l + ") must match input depth for filter " + n.shape[2] + "."), assert(c === n.shape[3], "Error in conv2dDerInput: depth of output (" + c + ") must match output depth for filter " + n.shape[3] + "."), null != a && assert(isInt(o), "Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode " + a + " but got pad " + o + ".");var d = computeConv2DInfo(i, n.shape, r, 1, o, a),
          p = ENV.engine.runKernel(function (e) {
        return e.conv2dDerInput(s, n, d);
      }, { dy4D: s });return u ? p.as3D(p.shape[1], p.shape[2], p.shape[3]) : p;
    }, e.conv2dDerFilter = function (e, t, n, r, o, a) {
      var i = e;3 === e.rank && (i = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));var s = t;3 === s.rank && (s = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), assert(4 === i.rank, "Error in conv2dDerFilter: input must be rank 4, but got shape " + i.shape + "."), assert(4 === s.rank, "Error in conv2dDerFilter: dy must be rank 4, but got shape " + s.shape + "."), assert(4 === n.length, "Error in conv2dDerFilter: filterShape must be length 4, but got " + n + "."), assert(i.shape[3] === n[2], "Error in conv2dDerFilter: depth of input " + i.shape[3] + ") must match input depth in filter (" + n[2] + "."), assert(s.shape[3] === n[3], "Error in conv2dDerFilter: depth of dy (" + s.shape[3] + ") must match output depth for filter (" + n[3] + ")."), null != a && assert(isInt(o), "Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode " + a + " but got pad " + o + ".");var u = computeConv2DInfo(i.shape, n, r, 1, o, a);return ENV.engine.runKernel(function (e) {
        return e.conv2dDerFilter(i, s, u);
      }, { x4D: i, dy4D: s });
    }, e.conv2dTranspose = function (t, n, r, o, a, i) {
      var s = convertToTensor(t, "x", "conv2dTranspose"),
          u = convertToTensor(n, "filter", "conv2dTranspose");return e.conv2dDerInput(r, s, u, o, a, i);
    }, e.depthwiseConv2d = function (e, t, n, r, o, a, i) {
      void 0 === o && (o = "NHWC"), void 0 === a && (a = [1, 1]);var s = convertToTensor(e, "x", "depthwiseConv2d"),
          u = convertToTensor(t, "filter", "depthwiseConv2d"),
          l = s,
          c = !1;3 === s.rank && (c = !0, l = s.as4D(1, s.shape[0], s.shape[1], s.shape[2])), assert(4 === l.rank, "Error in depthwiseConv2d: input must be rank 4, but got rank " + l.rank + "."), assert(4 === u.rank, "Error in depthwiseConv2d: filter must be rank 4, but got rank " + u.rank + "."), assert(l.shape[3] === u.shape[2], "Error in depthwiseConv2d: number of input channels (" + l.shape[3] + ") must match the inChannels dimension in filter " + u.shape[2] + "."), null == a && (a = [1, 1]), assert(eitherStridesOrDilationsAreOne(n, a), "Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides " + n + " and dilations '" + a + "'"), null != i && assert(isInt(r), "Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode " + i + " but got pad " + r + ".");var d = computeConv2DInfo(l.shape, u.shape, n, a, r, i, !0),
          p = ENV.engine.runKernel(function (e) {
        return e.depthwiseConv2D(l, u, d);
      }, { x: l, $filter: u }, function (e) {
        return assert(tupleValuesAreOne(a), "Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '" + a + "'"), { x: function () {
            return depthwiseConv2dDerInput(l.shape, e, u, d);
          }, $filter: function () {
            return depthwiseConv2dDerFilter(l, e, u.shape, d);
          } };
      });return c ? p.as3D(p.shape[1], p.shape[2], p.shape[3]) : p;
    }, e.separableConv2d = function (t, n, r, o, a, i, s) {
      void 0 === i && (i = [1, 1]), void 0 === s && (s = "NHWC");var u = convertToTensor(t, "x", "separableConv2d"),
          l = convertToTensor(n, "depthwiseFilter", "separableConv2d"),
          c = convertToTensor(r, "pointwiseFilter", "separableConv2d"),
          d = u,
          p = !1;if (3 === u.rank && (p = !0, d = u.as4D(1, u.shape[0], u.shape[1], u.shape[2])), "NCHW" === s) throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");assert(4 === d.rank, "Error in separableConv2d: input must be rank 4, but got rank " + d.rank + "."), assert(4 === l.rank, "Error in separableConv2d: depthwise filter must be rank 4, but got rank " + l.rank + "."), assert(4 === c.rank, "Error in separableConv2d: pointwise filter must be rank 4, but got rank " + l.rank + "."), assert(1 === c.shape[0], "Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got " + c.shape[0] + "."), assert(1 === c.shape[1], "Error in separableConv2d: the second dimension of pointwise filter  must be 1, but got " + c.shape[1] + ".");var h = l.shape[2],
          f = l.shape[3];assert(c.shape[2] === h * f, "Error in separableConv2d: the third dimension of pointwise filter must be " + h * f + ", but got " + c.shape[2] + ".");var g = e.depthwiseConv2d(d, l, o, a, s, i),
          m = e.conv2d(g, c, 1, "valid", s);return p ? m.as3D(m.shape[1], m.shape[2], m.shape[3]) : m;
    }, __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "conv1d", null), __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "conv2d", null), __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "conv2dTranspose", null), __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "depthwiseConv2d", null), __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "separableConv2d", null), e;
  }();function parseTupleParam$1(e) {
    return "number" == typeof e ? [e, e] : e;
  }function tupleValuesAreOne(e) {
    var t = parseTupleParam$1(e),
        n = t[0],
        r = t[1];return 1 === n && 1 === r;
  }function eitherStridesOrDilationsAreOne(e, t) {
    return tupleValuesAreOne(e) || tupleValuesAreOne(t);
  }function depthwiseConv2dDerInput(e, t, n, r) {
    var o = t,
        a = !1;3 === t.rank && (a = !0, o = t.as4D(1, t.shape[0], t.shape[1], t.shape[2]));var i = ENV.engine.runKernel(function (e) {
      return e.depthwiseConv2DDerInput(o, n, r);
    }, { dy4D: o });return a ? i.as3D(i.shape[1], i.shape[2], i.shape[3]) : i;
  }function depthwiseConv2dDerFilter(e, t, n, r) {
    var o = e;3 === e.rank && (o = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));var a = t;return 3 === a.rank && (a = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), ENV.engine.runKernel(function (e) {
      return e.depthwiseConv2DDerFilter(o, a, r);
    }, { x4D: o, dy4D: a });
  }var conv1d = op(ConvOps.conv1d),
      conv2d = op(ConvOps.conv2d),
      depthwiseConv2d = op(ConvOps.depthwiseConv2d),
      separableConv2d = op(ConvOps.separableConv2d),
      conv2dTranspose = op(ConvOps.conv2dTranspose),
      MatmulOps = function () {
    function e() {}return e.matMul = function (e, t, n, r) {
      void 0 === n && (n = !1), void 0 === r && (r = !1);var o = convertToTensor(e, "a", "matMul"),
          a = convertToTensor(t, "b", "matMul"),
          i = n ? o.shape[0] : o.shape[1],
          s = r ? a.shape[1] : a.shape[0];assert(2 === o.rank && 2 === a.rank, "Error in matMul: inputs must be rank 2, got ranks " + o.rank + " and " + a.rank + "."), assert(i === s, "Error in matMul: inner shapes (" + i + ") and (" + s + ") of Tensors with shapes " + o.shape + " and " + a.shape + " and transposeA=" + n + " and transposeB=" + r + " must match.");return ENV.engine.runKernel(function (e) {
        return e.matMul(o, a, n, r);
      }, { $a: o, $b: a }, function (e) {
        return n || r ? !n && r ? { $a: function () {
            return e.matMul(a.toFloat(), !1, !1);
          }, $b: function () {
            return e.matMul(o.toFloat(), !0, !1);
          } } : n && !r ? { $a: function () {
            return a.toFloat().matMul(e, !1, !0);
          }, $b: function () {
            return o.toFloat().matMul(e, !1, !1);
          } } : { $a: function () {
            return a.toFloat().matMul(e, !0, !0);
          }, $b: function () {
            return e.matMul(o.toFloat(), !0, !0);
          } } : { $a: function () {
            return e.matMul(a.toFloat(), !1, !0);
          }, $b: function () {
            return o.toFloat().matMul(e, !0, !1);
          } };
      });
    }, e.outerProduct = function (e, t) {
      var n = convertToTensor(e, "v1", "outerProduct"),
          r = convertToTensor(t, "v2", "outerProduct");return assert(1 === n.rank && 1 === r.rank, "Error in outerProduct: inputs must be rank 1, but got ranks " + n.rank + " and " + r.rank + "."), n.as2D(-1, 1).matMul(r.as2D(1, -1));
    }, e.dot = function (e, t) {
      var n = convertToTensor(e, "t1", "dot"),
          r = convertToTensor(t, "t2", "dot");assert(!(1 !== n.rank && 2 !== n.rank || 1 !== r.rank && 2 !== r.rank), "Error in dot: inputs must all be rank 1 or 2, but got ranks " + n.rank + " and " + r.rank + ".");var o = 1 === n.rank ? n.size : n.shape[1],
          a = 1 === r.rank ? r.size : r.shape[0];return assert(o === a, "Error in dot: inner dimensions of inputs must match, but got " + o + " and " + a + "."), 1 === n.rank && 1 === r.rank ? n.as2D(1, -1).matMul(r.as2D(-1, 1)).asScalar() : 1 === n.rank && 2 === r.rank ? n.as2D(1, -1).matMul(r.as2D(r.shape[0], r.shape[1])).as1D() : 2 === n.rank && 1 === r.rank ? n.matMul(r.as2D(-1, 1)).as1D() : n.matMul(r.as2D(r.shape[0], r.shape[1]));
    }, __decorate([doc({ heading: "Operations", subheading: "Matrices" })], e, "matMul", null), __decorate([doc({ heading: "Operations", subheading: "Matrices" })], e, "outerProduct", null), __decorate([doc({ heading: "Operations", subheading: "Matrices" })], e, "dot", null), e;
  }(),
      matMul = op(MatmulOps.matMul),
      dot = op(MatmulOps.dot),
      outerProduct = op(MatmulOps.outerProduct),
      ReverseOps = function () {
    function e() {}return e.reverse1d = function (t) {
      var n = convertToTensor(t, "x", "reverse");return assert(1 === n.rank, "Error in reverse1D: x must be rank 1 but got\n             rank " + n.rank + "."), e.reverse(n, 0);
    }, e.reverse2d = function (t, n) {
      var r = convertToTensor(t, "x", "reverse");return assert(2 === r.rank, "Error in reverse2D: x must be rank 2 but got\n             rank " + r.rank + "."), e.reverse(r, n);
    }, e.reverse3d = function (t, n) {
      var r = convertToTensor(t, "x", "reverse");return assert(3 === r.rank, "Error in reverse3D: x must be rank 3 but got\n             rank " + r.rank + "."), e.reverse(r, n);
    }, e.reverse4d = function (t, n) {
      var r = convertToTensor(t, "x", "reverse");return assert(4 === r.rank, "Error in reverse4D: x must be rank 4 but got\n             rank " + r.rank + "."), e.reverse(r, n);
    }, e.reverse = function (e, t) {
      var n = convertToTensor(e, "x", "reverse");if (0 === n.rank) return n.clone();var r = parseAxisParam(t, n.shape);return ENV.engine.runKernel(function (e) {
        return e.reverse(n, r);
      }, { $x: n }, function (e) {
        return { $x: function () {
            return e.reverse(r);
          } };
      }).reshapeAs(n);
    }, __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "reverse", null), e;
  }(),
      reverse = op(ReverseOps.reverse),
      reverse1d = op(ReverseOps.reverse1d),
      reverse2d = op(ReverseOps.reverse2d),
      reverse3d = op(ReverseOps.reverse3d),
      reverse4d = op(ReverseOps.reverse4d),
      PoolOps = function () {
    function e() {}return e.maxPool = function (e, t, n, r, o) {
      var a = convertToTensor(e, "x", "maxPool"),
          i = a,
          s = !1;3 === a.rank && (s = !0, i = a.as4D(1, a.shape[0], a.shape[1], a.shape[2])), assert(4 === i.rank, "Error in maxPool: input must be rank 4 but got rank " + i.rank + "."), null != o && assert(isInt(r), "Error in maxPool: pad must be an integer when using, dimRoundingMode " + o + " but got pad " + r + ".");var u = computePool2DInfo(i.shape, t, n, r, o),
          l = ENV.engine.runKernel(function (e, t) {
        return t(e.maxPool(i, u));
      }, { x: i }, function (e, o) {
        var a = o[0];return { x: function () {
            return maxPoolBackprop(e, i, a, t, n, r);
          } };
      });return s ? l.as3D(l.shape[1], l.shape[2], l.shape[3]) : l;
    }, e.avgPool = function (e, t, n, r, o) {
      var a = convertToTensor(e, "x", "avgPool");assert("float32" === a.dtype, "The input dtype to avgPool must be float32");var i = a,
          s = !1;3 === a.rank && (s = !0, i = a.as4D(1, a.shape[0], a.shape[1], a.shape[2])), assert(4 === i.rank, "Error in avgPool: x must be rank 4 but got rank " + i.rank + "."), null != o && assert(isInt(r), "Error in avgPool: pad must be an integer when using, dimRoundingMode " + o + " but got pad " + r + ".");var u = computePool2DInfo(i.shape, t, n, r),
          l = ENV.engine.runKernel(function (e) {
        return e.avgPool(i, u);
      }, { x: i }, function (e) {
        return { x: function () {
            return avgPoolBackprop(e, i, t, n, r);
          } };
      });return l = l.cast(a.dtype), s ? l.as3D(l.shape[1], l.shape[2], l.shape[3]) : l;
    }, __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "maxPool", null), __decorate([doc({ heading: "Operations", subheading: "Convolution" })], e, "avgPool", null), e;
  }();function maxPoolBackprop(e, t, n, r, o, a, i) {
    var s = convertToTensor(e, "dy", "maxPoolBackprop"),
        u = convertToTensor(t, "input", "maxPoolBackprop"),
        l = convertToTensor(n, "output", "maxPoolBackprop");assert(u.rank === s.rank, "Rank of input (" + u.rank + ") does not match rank of dy (" + s.rank + ")"), assert(4 === s.rank, "Error in maxPoolBackprop: dy must be rank 4 but got rank " + s.rank + "."), assert(4 === u.rank, "Error in maxPoolBackprop: input must be rank 4 but got rank " + u.rank + "."), null != i && assert(isInt(a), "Error in maxPoolBackprop: pad must be an integer when using, dimRoundingMode " + i + " but got pad " + a + ".");var c = computePool2DInfo(u.shape, r, o, a, i);return ENV.engine.runKernel(function (e) {
      return e.maxPoolBackprop(s, u, l, c);
    }, { $dy: s, $input: u });
  }function avgPoolBackprop(e, t, n, r, o) {
    var a = convertToTensor(e, "dy", "avgPoolBackprop"),
        i = convertToTensor(t, "input", "avgPoolBackprop");assert(i.rank === a.rank, "Rank of input (" + i.rank + ") does not match rank of dy (" + a.rank + ")");var s = i,
        u = a,
        l = !1;3 === i.rank && (l = !0, s = i.as4D(1, i.shape[0], i.shape[1], i.shape[2]), u = a.as4D(1, a.shape[0], a.shape[1], a.shape[2])), assert(4 === u.rank, "Error in avgPoolBackprop: dy must be rank 4 but got rank " + u.rank + "."), assert(4 === s.rank, "Error in avgPoolBackprop: input must be rank 4 but got rank " + s.rank + ".");var c = computePool2DInfo(s.shape, n, r, o),
        d = ENV.engine.runKernel(function (e) {
      return e.avgPoolBackprop(u, s, c);
    }, { dy4D: u, input4D: s });return l ? d.as3D(d.shape[1], d.shape[2], d.shape[3]) : d;
  }var maxPool = op(PoolOps.maxPool),
      avgPool = op(PoolOps.avgPool);function assertParamsValid(e, t, n) {
    assert(e.rank === t.length, "Error in slice" + e.rank + "D: Length of begin " + t + " must match the rank of the array (" + e.rank + ")."), assert(e.rank === n.length, "Error in slice" + e.rank + "D: Length of size " + n + " must match the rank of the array (" + e.rank + ").");for (var r = 0; r < e.rank; ++r) assert(t[r] + n[r] <= e.shape[r], "Error in slice" + e.rank + "D: begin[" + r + "] + size[" + r + "] (" + (t[r] + n[r]) + ") would overflow input.shape[" + r + "] (" + e.shape[r] + ")");
  }function getStridedSlicedInfo(e, t, n, r, o, a) {
    void 0 === o && (o = 0), void 0 === a && (a = 0);for (var i = [], s = [], u = 0; u < e.length; u++) i[u] = startForAxis(o, t, r, e, u), s[u] = stopForAxis(a, n, r, e, u);var l = new Array(e.length).fill(0);return l = l.map(function (e, t) {
      for (var n = 0, o = i[t]; !(r[t] > 0 ? o >= s[t] : o <= s[t]); o += r[t]) n += 1;return n;
    }), [i, l];
  }function startForAxis(e, t, n, r, o) {
    var a = t[o];e & 1 << o && (a = n[o] > 0 ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER);var i = r[o];return a < 0 && (a += i), a = clamp(0, a, i - 1);
  }function stopForAxis(e, t, n, r, o) {
    var a = t[o];e & 1 << o && (a = n[o] > 0 ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER);var i = r[o];return a < 0 && (a += i), a = n[o] > 0 ? clamp(0, a, i) : clamp(-1, a, i - 1);
  }var SliceOps = function () {
    function e() {}return e.slice1d = function (t, n, r) {
      var o = convertToTensor(t, "x", "slice1d");return assert(1 === o.rank, "slice1d expects a rank-1 tensor, but got a rank-" + o.rank + " tensor"), e.slice(o, [n], [r]);
    }, e.slice2d = function (t, n, r) {
      var o = convertToTensor(t, "x", "slice2d");return assert(2 === o.rank, "slice1d expects a rank-2 tensor, but got a rank-" + o.rank + " tensor"), e.slice(o, n, r);
    }, e.slice3d = function (t, n, r) {
      var o = convertToTensor(t, "x", "slice3d");return assert(3 === o.rank, "slice1d expects a rank-3 tensor, but got a rank-" + o.rank + " tensor"), e.slice(o, n, r);
    }, e.slice4d = function (t, n, r) {
      var o = convertToTensor(t, "x", "slice4d");return assert(4 === o.rank, "slice1d expects a rank-4 tensor, but got a rank-" + o.rank + " tensor"), e.slice(o, n, r);
    }, e.slice = function (e, t, n) {
      var r,
          o,
          a = convertToTensor(e, "x", "slice");if (0 === a.rank) throw new Error("Slicing scalar is not possible");r = "number" == typeof t ? [t].concat(new Array(a.rank - 1).fill(0)) : t.length < a.rank ? t.concat(new Array(a.rank - t.length).fill(0)) : t, o = (o = null == n ? new Array(a.rank).fill(-1) : "number" == typeof n ? [n].concat(new Array(a.rank - 1).fill(-1)) : n.length < a.rank ? n.concat(new Array(a.rank - n.length).fill(-1)) : n).map(function (e, t) {
        return e >= 0 ? e : (assert(-1 === e, "Bad value in size"), a.shape[t] - r[t]);
      }), assertParamsValid(a, r, o);var i = a.shape;return ENV.engine.runKernel(function (e) {
        return e.slice(a, r, o);
      }, { $x: a }, function (e) {
        for (var t = [], n = 0; n < e.rank; n++) t.push([r[n], i[n] - r[n] - o[n]]);return { $x: function () {
            return e.pad(t);
          } };
      });
    }, __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "slice", null), e;
  }(),
      slice = op(SliceOps.slice),
      slice1d = op(SliceOps.slice1d),
      slice2d = op(SliceOps.slice2d),
      slice3d = op(SliceOps.slice3d),
      slice4d = op(SliceOps.slice4d),
      Gradients = function () {
    function e() {}return e.gradScope = function (e, t) {
      return ENV.engine.tidy(e, t, !0);
    }, e.grad = function (e) {
      return assert(isFunction(e), "The f passed in grad(f) must be a function"), function (t, n) {
        return assert(t instanceof Tensor, "The x passed in grad(f)(x) must be a tensor"), assert(null == n || n instanceof Tensor, "The dy passed in grad(f)(x, dy) must be a tensor"), ENV.engine.tidy(function () {
          var r = ENV.engine.gradients(function () {
            return e(t);
          }, [t], n),
              o = r.value,
              a = r.grads;return null != n && assertShapesMatch(o.shape, n.shape, "The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"), checkGrads(a), a[0];
        });
      };
    }, e.grads = function (e) {
      return assert(isFunction(e), "The f passed in grads(f) must be a function"), function (t, n) {
        return assert(Array.isArray(t) && t.every(function (e) {
          return e instanceof Tensor;
        }), "The args passed in grads(f)(args) must be an array of tensors"), assert(null == n || n instanceof Tensor, "The dy passed in grads(f)(args, dy) must be a tensor"), ENV.engine.tidy(function () {
          var r = ENV.engine.gradients(function () {
            return e.apply(void 0, t);
          }, t, n),
              o = r.value,
              a = r.grads;return null != n && assertShapesMatch(o.shape, n.shape, "The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"), checkGrads(a), a;
        });
      };
    }, e.valueAndGrad = function (e) {
      return assert(isFunction(e), "The f passed in valueAndGrad(f) must be a function"), function (t, n) {
        assert(t instanceof Tensor, "The x passed in valueAndGrad(f)(x) must be a tensor"), assert(null == n || n instanceof Tensor, "The dy passed in valueAndGrad(f)(x, dy) must be a tensor");var r = ENV.engine.gradients(function () {
          return e(t);
        }, [t], n),
            o = r.grads,
            a = r.value;return checkGrads(o), { grad: o[0], value: a };
      };
    }, e.valueAndGrads = function (e) {
      return assert(isFunction(e), "The f passed in valueAndGrads(f) must be a function"), function (t, n) {
        assert(Array.isArray(t) && t.every(function (e) {
          return e instanceof Tensor;
        }), "The args passed in valueAndGrads(f)(args) must be array of tensors"), assert(null == n || n instanceof Tensor, "The dy passed in valueAndGrads(f)(args, dy) must be a tensor");var r = ENV.engine.gradients(function () {
          return e.apply(void 0, t);
        }, t, n);return null != n && assertShapesMatch(r.value.shape, n.shape, "The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"), checkGrads(r.grads), r;
      };
    }, e.variableGrads = function (e, t) {
      if (assert(isFunction(e), "The f passed in variableGrads(f) must be a function"), assert(null == t || Array.isArray(t) && t.every(function (e) {
        return e instanceof Variable;
      }), "The varList passed in variableGrads(f, varList) must be an array of variables"), null == t) for (var n in t = [], ENV.engine.registeredVariables) t.push(ENV.engine.registeredVariables[n]);var r = t.length;assert((t = t.filter(function (e) {
        return e.trainable;
      })).length > 0, "variableGrads() expects at least one of the input variables to be trainable, but none of the " + r + " variables is trainable.");var o = ENV.engine.gradients(e, t, null, !0),
          a = o.value,
          i = o.grads;assert(i.some(function (e) {
        return null != e;
      }), "Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."), assert(0 === a.rank, "The f passed in variableGrads(f) must return a scalar, but it returned a rank-" + a.rank + " tensor");var s = {};return t.forEach(function (e, t) {
        null != i[t] && (s[e.name] = i[t]);
      }), { value: a, grads: s };
    }, e.customGrad = function (e) {
      return ENV.engine.customGrad(e);
    }, __decorate([doc({ heading: "Training", subheading: "Gradients" })], e, "grad", null), __decorate([doc({ heading: "Training", subheading: "Gradients" })], e, "grads", null), __decorate([doc({ heading: "Training", subheading: "Gradients" })], e, "valueAndGrad", null), __decorate([doc({ heading: "Training", subheading: "Gradients" })], e, "valueAndGrads", null), __decorate([doc({ heading: "Training", subheading: "Gradients" })], e, "variableGrads", null), __decorate([doc({ heading: "Training", subheading: "Gradients" })], e, "customGrad", null), e;
  }();function checkGrads(e) {
    if (e.filter(function (e) {
      return null == e;
    }).length > 0) throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.");
  }var DType,
      UpcastInt32AndMap,
      UpcastBoolAndMap,
      UpcastFloat32AndMap,
      tidy = Environment.tidy,
      keep = Environment.keep,
      dispose = Environment.dispose,
      time = Environment.time,
      grad = Gradients.grad,
      valueAndGrad = Gradients.valueAndGrad,
      grads = Gradients.grads,
      valueAndGrads = Gradients.valueAndGrads,
      variableGrads = Gradients.variableGrads,
      customGrad = Gradients.customGrad,
      ReductionOps = function () {
    function e() {}return e.logSumExp = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "logSumExp"),
          o = parseAxisParam(t, r.shape),
          a = r.max(o, !0),
          i = r.sub(a).exp().sum(o).log(),
          s = a.reshape(i.shape).add(i);if (n) {
        var u = expandShapeToKeepDim(s.shape, o);return s.reshape(u);
      }return s;
    }, e.sum = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "sum");"bool" === r.dtype && (r = r.toInt());var o = parseAxisParam(t, r.shape);return customGrad(function (e) {
        var t = getAxesPermutation(o, e.rank),
            r = o,
            a = e;null != t && (a = e.transpose(t), r = getInnerMostAxes(r.length, e.rank));var i = ENV.engine.runKernel(function (e) {
          return e.sum(a, r);
        }, { permutedX: a });if (n) {
          var s = expandShapeToKeepDim(i.shape, o);i = i.reshape(s);
        }return { value: i, gradFunc: function (t) {
            var n = e.shape.slice();return o.forEach(function (e) {
              n[e] = 1;
            }), t.reshape(n).mul(ones$1(e.shape, "float32"));
          } };
      })(r);
    }, e.mean = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "mean"),
          o = parseAxisParam(t, r.shape),
          a = sizeFromShape(computeOutAndReduceShapes(r.shape, o)[1]);return customGrad(function (e) {
        var r = scalar(a);return { value: (r.dtype === e.dtype ? e : e.cast(r.dtype)).div(r).sum(t, n), gradFunc: function (t) {
            var n = e.shape.slice();return o.forEach(function (e) {
              n[e] = 1;
            }), t.reshape(n).mul(ones$1(e.shape, "float32")).div(r);
          } };
      })(r);
    }, e.min = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "min"),
          o = parseAxisParam(t, r.shape),
          a = o,
          i = getAxesPermutation(a, r.rank);null != i && (r = r.transpose(i), a = getInnerMostAxes(a.length, r.rank));var s = ENV.engine.runKernel(function (e) {
        return e.min(r, a);
      }, { $x: r });if (n) {
        var u = expandShapeToKeepDim(s.shape, o);return s.reshape(u);
      }return s;
    }, e.max = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "max"),
          o = parseAxisParam(t, r.shape),
          a = o,
          i = getAxesPermutation(a, r.rank);null != i && (r = r.transpose(i), a = getInnerMostAxes(a.length, r.rank));var s = ENV.engine.runKernel(function (e) {
        return e.max(r, a);
      }, { $x: r });if (n) {
        var u = expandShapeToKeepDim(s.shape, o);return s.reshape(u);
      }return s;
    }, e.argMin = function (e, t) {
      void 0 === t && (t = 0);var n = convertToTensor(e, "x", "argMin");null == t && (t = 0);var r = parseAxisParam(t, n.shape),
          o = getAxesPermutation(r, n.rank);return null != o && (n = n.transpose(o), r = getInnerMostAxes(r.length, n.rank)), ENV.engine.runKernel(function (e) {
        return e.argMin(n, r[0]);
      }, { $x: n });
    }, e.argMax = function (e, t) {
      void 0 === t && (t = 0);var n = convertToTensor(e, "x", "argMax");null == t && (t = 0);var r = parseAxisParam(t, n.shape),
          o = getAxesPermutation(r, n.rank);return null != o && (n = n.transpose(o), r = getInnerMostAxes(r.length, n.rank)), ENV.engine.runKernel(function (e) {
        return e.argMax(n, r[0]);
      }, { $x: n });
    }, e.all = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "all", "bool");assert("bool" === r.dtype, "Error Tensor must be of type bool. Got: " + r.dtype);var o = parseAxisParam(t, r.shape),
          a = o,
          i = getAxesPermutation(a, r.rank);null != i && (r = r.transpose(i), a = getInnerMostAxes(a.length, r.rank));var s = ENV.engine.runKernel(function (e) {
        return e.all(r, a);
      }, { $x: r });if (n) {
        var u = expandShapeToKeepDim(s.shape, o);return s.reshape(u);
      }return s;
    }, e.any = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = convertToTensor(e, "x", "any", "bool");assert("bool" === r.dtype, "Error Tensor must be of type bool. Got: " + r.dtype);var o = parseAxisParam(t, r.shape),
          a = o,
          i = getAxesPermutation(a, r.rank);null != i && (r = r.transpose(i), a = getInnerMostAxes(a.length, r.rank));var s = ENV.engine.runKernel(function (e) {
        return e.any(r, a);
      }, { $x: r });if (n) {
        var u = expandShapeToKeepDim(s.shape, o);return s.reshape(u);
      }return s;
    }, e.moments = function (e, t, n) {
      void 0 === t && (t = null), void 0 === n && (n = !1);var r = parseAxisParam(t, (e = convertToTensor(e, "x", "moments")).shape),
          o = e.mean(r, n),
          a = o.shape;return n || (a = expandShapeToKeepDim(o.shape, r)), { mean: o, variance: e.toFloat().sub(o.reshape(a)).square().mean(r, n) };
    }, __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "logSumExp", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "sum", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "mean", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "min", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "max", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "argMin", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "argMax", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "all", null), __decorate([doc({ heading: "Operations", subheading: "Reduction" })], e, "any", null), __decorate([doc({ heading: "Operations", subheading: "Normalization" })], e, "moments", null), e;
  }(),
      all = op(ReductionOps.all),
      any = op(ReductionOps.any),
      argMax = op(ReductionOps.argMax),
      argMin = op(ReductionOps.argMin),
      logSumExp = op(ReductionOps.logSumExp),
      max = op(ReductionOps.max),
      mean = op(ReductionOps.mean),
      min = op(ReductionOps.min),
      moments = op(ReductionOps.moments),
      sum = op(ReductionOps.sum),
      CompareOps = function () {
    function e() {}return e.notEqual = function (e, t) {
      var n = convertToTensor(e, "a", "notEqual"),
          r = convertToTensor(t, "b", "notEqual");return assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.notEqual(n, r);
      }, { $a: n, $b: r });
    }, e.notEqualStrict = function (e, t) {
      var n = convertToTensor(e, "a", "notEqualStrict"),
          r = convertToTensor(t, "b", "notEqualStrict");return assertShapesMatch(n.shape, r.shape, "Error in notEqualStrict: "), n.notEqual(r);
    }, e.less = function (e, t) {
      var n = convertToTensor(e, "a", "less"),
          r = convertToTensor(t, "b", "less");return assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.less(n, r);
      }, { $a: n, $b: r });
    }, e.lessStrict = function (e, t) {
      var n = convertToTensor(e, "a", "lessStrict"),
          r = convertToTensor(t, "b", "lessStrict");return assertShapesMatch(n.shape, r.shape, "Error in lessStrict: "), n.less(r);
    }, e.equal = function (e, t) {
      var n = convertToTensor(e, "a", "equal"),
          r = convertToTensor(t, "b", "equal");return assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.equal(n, r);
      }, { $a: n, $b: r });
    }, e.equalStrict = function (e, t) {
      var n = convertToTensor(e, "a", "equalStrict"),
          r = convertToTensor(t, "b", "equalStrict");return assertShapesMatch(n.shape, r.shape, "Error in equalStrict: "), n.equal(r);
    }, e.lessEqual = function (e, t) {
      var n = convertToTensor(e, "a", "lessEqual"),
          r = convertToTensor(t, "b", "lessEqual");return assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.lessEqual(n, r);
      }, { $a: n, $b: r });
    }, e.lessEqualStrict = function (e, t) {
      var n = convertToTensor(e, "a", "lessEqualStrict"),
          r = convertToTensor(t, "b", "lessEqualStrict");return assertShapesMatch(n.shape, r.shape, "Error in lessEqualStrict: "), n.lessEqual(r);
    }, e.greater = function (e, t) {
      var n = convertToTensor(e, "a", "greater"),
          r = convertToTensor(t, "b", "greater");return assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.greater(n, r);
      }, { $a: n, $b: r });
    }, e.greaterStrict = function (e, t) {
      var n = convertToTensor(e, "a", "greaterStrict"),
          r = convertToTensor(t, "b", "greaterStrict");return assertShapesMatch(n.shape, r.shape, "Error in greaterStrict: "), n.greater(r);
    }, e.greaterEqual = function (e, t) {
      var n = convertToTensor(e, "a", "greaterEqual"),
          r = convertToTensor(t, "b", "greaterEqual");return assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.greaterEqual(n, r);
      }, { $a: n, $b: r });
    }, e.greaterEqualStrict = function (e, t) {
      var n = convertToTensor(e, "a", "greaterEqualStrict"),
          r = convertToTensor(t, "b", "greaterEqualStrict");return assertShapesMatch(n.shape, r.shape, "Error in greaterEqualStrict: "), n.greaterEqual(r);
    }, __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "notEqual", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "less", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "equal", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "lessEqual", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "greater", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "greaterEqual", null), e;
  }(),
      equal = op(CompareOps.equal),
      equalStrict = op(CompareOps.equalStrict),
      greater = op(CompareOps.greater),
      greaterEqual = op(CompareOps.greaterEqual),
      greaterEqualStrict = op(CompareOps.greaterEqualStrict),
      greaterStrict = op(CompareOps.greaterStrict),
      less = op(CompareOps.less),
      lessEqual = op(CompareOps.lessEqual),
      lessEqualStrict = op(CompareOps.lessEqualStrict),
      lessStrict = op(CompareOps.lessStrict),
      notEqual = op(CompareOps.notEqual),
      notEqualStrict = op(CompareOps.notEqualStrict);!function (e) {
    e.float32 = "float32", e.int32 = "int32", e.bool = "bool";
  }(DType || (DType = {})), function (e) {
    e.R0 = "R0", e.R1 = "R1", e.R2 = "R2", e.R3 = "R3", e.R4 = "R4", e.R5 = "R5", e.R6 = "R6";
  }(exports.Rank || (exports.Rank = {})), function (e) {
    e.float32 = "float32", e.int32 = "int32", e.bool = "int32";
  }(UpcastInt32AndMap || (UpcastInt32AndMap = {})), function (e) {
    e.float32 = "float32", e.int32 = "int32", e.bool = "bool";
  }(UpcastBoolAndMap || (UpcastBoolAndMap = {})), function (e) {
    e.float32 = "float32", e.int32 = "float32", e.bool = "float32";
  }(UpcastFloat32AndMap || (UpcastFloat32AndMap = {}));var upcastTypeMap = { float32: UpcastFloat32AndMap, int32: UpcastInt32AndMap, bool: UpcastBoolAndMap };function upcastType(e, t) {
    return upcastTypeMap[e][t];
  }function sumOutType(e) {
    return upcastType(e, "int32");
  }var BinaryOps = function () {
    function e() {}return e.add = function (e, t) {
      var n = convertToTensor(e, "a", "add"),
          r = convertToTensor(t, "b", "add");assertTypesMatch(n, r);var o = assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.add(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            var t = e,
                r = getReductionAxes(n.shape, o);return r.length > 0 && (t = t.sum(r)), t.reshape(n.shape);
          }, $b: function () {
            var t = e,
                n = getReductionAxes(r.shape, o);return n.length > 0 && (t = t.sum(n)), t.reshape(r.shape);
          } };
      });
    }, e.addStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in addStrict: "), e.add(t);
    }, e.sub = function (e, t) {
      var n = convertToTensor(e, "a", "sub"),
          r = convertToTensor(t, "b", "sub");assertTypesMatch(n, r);var o = assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.subtract(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            var t = e,
                r = getReductionAxes(n.shape, o);return r.length > 0 && (t = t.sum(r)), t.reshape(n.shape);
          }, $b: function () {
            var t = e,
                n = getReductionAxes(r.shape, o);return n.length > 0 && (t = t.sum(n)), t.neg().reshape(r.shape);
          } };
      });
    }, e.subStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in subStrict: "), e.sub(t);
    }, e.pow = function (e, t) {
      var n = convertToTensor(e, "base", "pow"),
          r = convertToTensor(t, "exp", "pow"),
          o = assertAndGetBroadcastShape(n.shape, r.shape);e = n.cast(upcastType(n.dtype, r.dtype)), t = r.cast(upcastType(n.dtype, r.dtype));return ENV.engine.runKernel(function (e, t) {
        return t(e.pow(n, r));
      }, { $base: n, $exp: r }, function (e, t) {
        var a = t[0];return { $base: function () {
            var t = e.mul(r.toFloat().mul(a.div(n))),
                i = getReductionAxes(n.shape, o);return i.length > 0 && (t = t.sum(i)), t.reshape(n.shape);
          }, $exp: function () {
            var t = e.mul(a.mul(n.log()).toFloat()),
                i = getReductionAxes(r.shape, o);return i.length > 0 && (t = t.sum(i)), t.reshape(r.shape);
          } };
      });
    }, e.powStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in powStrict: "), e.pow(t);
    }, e.mul = function (e, t) {
      var n = convertToTensor(e, "a", "mul"),
          r = convertToTensor(t, "b", "mul");assertTypesMatch(n, r);var o = assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.multiply(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            var t = e.mul(r.toFloat()),
                a = getReductionAxes(n.shape, o);return a.length > 0 ? t.sum(a).reshape(n.shape) : t;
          }, $b: function () {
            var t = e.mul(n.toFloat()),
                a = getReductionAxes(r.shape, o);return a.length > 0 ? t.sum(a).reshape(r.shape) : t;
          } };
      });
    }, e.mulStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in multiplyStrict: "), e.mul(t);
    }, e.div = function (t, n) {
      var r,
          o = convertToTensor(t, "a", "div"),
          a = convertToTensor(n, "b", "div");if (assertTypesMatch(o, a), "int32" === o.dtype && "int32" === a.dtype) return e.floorDiv(o, a);r = function (e) {
        return e.realDivide(o, a);
      };var i = assertAndGetBroadcastShape(o.shape, a.shape);return ENV.engine.runKernel(r, { $a: o, $b: a }, function (e) {
        return { $a: function () {
            var t = e.div(a.toFloat()),
                n = getReductionAxes(o.shape, i);return n.length > 0 ? t.sum(n).reshape(o.shape) : t;
          }, $b: function () {
            var t = e.mul(o.toFloat()),
                n = getReductionAxes(a.shape, i);n.length > 0 && (t = t.sum(n).reshape(a.shape));var r = a.square();return t.div(r.toFloat()).neg();
          } };
      });
    }, e.floorDiv = function (e, t) {
      var n = convertToTensor(e, "a", "floorDiv"),
          r = convertToTensor(t, "b", "floorDiv");assertTypesMatch(n, r);var o = assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.floorDiv(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            var t = e.div(r.toFloat()),
                a = getReductionAxes(n.shape, o);return a.length > 0 ? t.sum(a).reshape(n.shape) : t;
          }, $b: function () {
            var t = e.mul(n.toFloat()),
                a = getReductionAxes(r.shape, o);a.length > 0 && (t = t.sum(a).reshape(r.shape));var i = r.square();return t.div(i.toFloat()).neg();
          } };
      });
    }, e.divStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in divideStrict: "), e.div(t);
    }, e.mod = function (e, t) {
      var n = convertToTensor(e, "a", "mod"),
          r = convertToTensor(t, "b", "mod");assertTypesMatch(n, r);var o = assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.mod(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            var t = getReductionAxes(n.shape, o);return t.length > 0 ? e.sum(t).reshape(n.shape) : e;
          }, $b: function () {
            var t = e.mul(n.div(r).floor().neg()),
                a = getReductionAxes(r.shape, o);return a.length > 0 ? t.sum(a).reshape(r.shape) : t;
          } };
      });
    }, e.modStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in modStrict: "), e.mod(t);
    }, e.minimum = function (e, t) {
      var n = convertToTensor(e, "a", "minimum"),
          r = convertToTensor(t, "b", "minimum");assertTypesMatch(n, r), "bool" === n.dtype && (n = n.toInt()), "bool" === r.dtype && (r = r.toInt()), assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.minimum(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            return e.mul(n.lessEqual(r).toFloat());
          }, $b: function () {
            return e.mul(n.greater(r).toFloat());
          } };
      });
    }, e.minimumStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in minimumStrict: "), e.minimum(t);
    }, e.maximum = function (e, t) {
      var n = convertToTensor(e, "a", "maximum"),
          r = convertToTensor(t, "b", "maximum");assertTypesMatch(n, r), "bool" === n.dtype && (n = n.toInt()), "bool" === r.dtype && (r = r.toInt()), assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.maximum(n, r);
      }, { $a: n, $b: r }, function (e) {
        return { $a: function () {
            return e.mul(n.greaterEqual(r).toFloat());
          }, $b: function () {
            return e.mul(n.less(r).toFloat());
          } };
      });
    }, e.maximumStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in minimumStrict: "), e.maximum(t);
    }, e.squaredDifference = function (e, t) {
      var n = convertToTensor(e, "a", "squaredDifference"),
          r = convertToTensor(t, "b", "squaredDifference");assertTypesMatch(n, r), assertAndGetBroadcastShape(n.shape, r.shape);return ENV.engine.runKernel(function (e) {
        return e.squaredDifference(n, r);
      }, { $a: n, $b: r }, function (e) {
        var t = scalar(2);return { $a: function () {
            return e.mul(n.sub(r).mul(t));
          }, $b: function () {
            return e.mul(r.sub(n).mul(t));
          } };
      });
    }, e.squaredDifferenceStrict = function (e, t) {
      return assertShapesMatch(e.shape, t.shape, "Error in squaredDifferenceStrict: "), e.squaredDifference(t);
    }, e.atan2 = function (t, n) {
      var r = convertToTensor(t, "a", "atan2"),
          o = convertToTensor(n, "b", "atan2");assertTypesMatch(r, o);var a = assertAndGetBroadcastShape(r.shape, o.shape);return ENV.engine.runKernel(function (e) {
        return e.atan2(r, o);
      }, { $a: r, $b: o }, function (t) {
        return { $a: function () {
            var n = e.add(r.square(), o.square()),
                i = t.mul(o.div(n)),
                s = getReductionAxes(r.shape, a);return s.length > 0 && (i = i.sum(s)), i.reshape(r.shape);
          }, $b: function () {
            var n = e.add(r.square(), o.square()),
                i = neg(t.mul(r.div(n))),
                s = getReductionAxes(o.shape, a);return s.length > 0 && (i = i.sum(s)), i.reshape(o.shape);
          } };
      });
    }, __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "add", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "sub", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "pow", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "mul", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "div", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "floorDiv", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "mod", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "minimum", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "maximum", null), __decorate([doc({ heading: "Operations", subheading: "Arithmetic" })], e, "squaredDifference", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "atan2", null), e;
  }(),
      add = op(BinaryOps.add),
      addStrict = op(BinaryOps.addStrict),
      atan2 = op(BinaryOps.atan2),
      div = op(BinaryOps.div),
      divStrict = op(BinaryOps.divStrict),
      floorDiv = op(BinaryOps.floorDiv),
      maximum = op(BinaryOps.maximum),
      maximumStrict = op(BinaryOps.maximumStrict),
      minimum = op(BinaryOps.minimum),
      minimumStrict = op(BinaryOps.minimumStrict),
      mod = op(BinaryOps.mod),
      modStrict = op(BinaryOps.modStrict),
      mul = op(BinaryOps.mul),
      mulStrict = op(BinaryOps.mulStrict),
      pow = op(BinaryOps.pow),
      powStrict = op(BinaryOps.powStrict),
      squaredDifference = op(BinaryOps.squaredDifference),
      squaredDifferenceStrict = op(BinaryOps.squaredDifferenceStrict),
      sub = op(BinaryOps.sub),
      subStrict = op(BinaryOps.subStrict),
      SigmoidCrossEntropyOps = function () {
    function e() {}return e.sigmoidCrossEntropyWithLogits = function (e, t) {
      var n = convertToTensor(e, "labels", "sigmoidCrossEntropyWithLogits"),
          r = convertToTensor(t, "logits", "sigmoidCrossEntropyWithLogits");assertShapesMatch(n.shape, r.shape, "Error in sigmoidCrossEntropyWithLogits: ");var o = r.relu(),
          a = r.mul(n),
          i = r.abs().neg().exp().log1p();return o.sub(a).add(i);
    }, __decorate([doc({ heading: "Operations", subheading: "Cross Entropy" })], e, "sigmoidCrossEntropyWithLogits", null), e;
  }(),
      sigmoidCrossEntropyWithLogits = op(SigmoidCrossEntropyOps.sigmoidCrossEntropyWithLogits),
      LogicalOps = function () {
    function e() {}return e.logicalNot = function (e) {
      var t = convertToTensor(e, "x", "logicalNot", "bool");return assert("bool" === t.dtype, "Error Array must be of type bool."), ENV.engine.runKernel(function (e) {
        return e.logicalNot(t);
      }, { $x: t });
    }, e.logicalAnd = function (e, t) {
      var n = convertToTensor(e, "a", "logicalAnd", "bool"),
          r = convertToTensor(t, "b", "logicalAnd", "bool");return assert("bool" === n.dtype && "bool" === r.dtype, "Error Array must be of type bool."), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.logicalAnd(n, r);
      }, { $a: n, $b: r });
    }, e.logicalOr = function (e, t) {
      var n = convertToTensor(e, "a", "logicalOr", "bool"),
          r = convertToTensor(t, "b", "logicalOr", "bool");return assert("bool" === n.dtype && "bool" === r.dtype, "Error Array must be of type bool."), assertAndGetBroadcastShape(n.shape, r.shape), ENV.engine.runKernel(function (e) {
        return e.logicalOr(n, r);
      }, { $a: n, $b: r });
    }, e.logicalXor = function (t, n) {
      var r = convertToTensor(t, "a", "logicalXor", "bool"),
          o = convertToTensor(n, "b", "logicalXor", "bool");return assert("bool" === r.dtype && "bool" === o.dtype, "Error Array must be of type bool."), assertAndGetBroadcastShape(r.shape, o.shape), e.logicalOr(t, n).logicalAnd(e.logicalAnd(t, n).logicalNot());
    }, e.where = function (e, t, n) {
      var r = convertToTensor(t, "a", "where"),
          o = convertToTensor(n, "b", "where"),
          a = convertToTensor(e, "condition", "where", "bool");assert("bool" === a.dtype, "Error Condition must be of type bool."), assertShapesMatch(r.shape, o.shape, "Error in where: "), 1 === a.rank ? assert(a.shape[0] === r.shape[0], "The first dimension of `a` must match the size of `condition`.") : assertShapesMatch(a.shape, o.shape, "Error in where: ");var i = upcastType(r.dtype, o.dtype);return ENV.engine.runKernel(function (e) {
        return e.where(a, r, o, i);
      }, { $condition: a, $a: r, $b: o }, function (e) {
        return { $condition: function () {
            return zerosLike(a);
          }, $a: function () {
            return e.mul(a.cast(r.dtype));
          }, $b: function () {
            return e.mul(a.logicalNot().cast(o.dtype));
          } };
      });
    }, __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "logicalNot", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "logicalAnd", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "logicalOr", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "logicalXor", null), __decorate([doc({ heading: "Operations", subheading: "Logical" })], e, "where", null), e;
  }(),
      logicalAnd = op(LogicalOps.logicalAnd),
      logicalNot = op(LogicalOps.logicalNot),
      logicalOr = op(LogicalOps.logicalOr),
      logicalXor = op(LogicalOps.logicalXor),
      where = op(LogicalOps.where),
      SELU_SCALEALPHA = 1.7580993408473768,
      SELU_SCALE = 1.0507009873554805,
      ReluOps = function () {
    function e() {}return e.relu = function (e) {
      var t = convertToTensor(e, "x", "relu");if ("bool" === t.dtype) return t.toInt();return ENV.engine.runKernel(function (e) {
        return e.relu(t);
      }, { $x: t }, function (e) {
        var n = t.step();return { $x: function () {
            return e.mulStrict(n.toFloat());
          } };
      });
    }, e.elu = function (e) {
      var t = convertToTensor(e, "x", "elu");return ENV.engine.runKernel(function (e, n) {
        return n(e.elu(t));
      }, { $x: t }, function (e, t) {
        var n = t[0];return { $x: function () {
            return ENV.engine.runKernel(function (t) {
              return t.eluDer(e, n);
            }, { dy: e, y: n });
          } };
      });
    }, e.selu = function (e) {
      var t = convertToTensor(e, "x", "selu");return ENV.engine.runKernel(function (e) {
        return e.selu(t);
      }, { $x: t }, function (e) {
        return { $x: function () {
            var n = t.greater(scalar(0)),
                r = scalar(SELU_SCALEALPHA),
                o = scalar(SELU_SCALE),
                a = e.mul(o),
                i = e.mul(r).mul(t.toFloat().exp());return where(n, a, i);
          } };
      });
    }, e.leakyRelu = function (e, t) {
      void 0 === t && (t = .2);var n = convertToTensor(e, "x", "leakyRelu");return maximum(scalar(t).mul(n), n);
    }, e.prelu = function (e, t) {
      var n = convertToTensor(e, "x", "prelu"),
          r = convertToTensor(t, "alpha", "prelu"),
          o = scalar(0);return maximum(o, n).add(r.mul(minimum(o, n)));
    }, __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "relu", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "elu", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "selu", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "leakyRelu", null), __decorate([doc({ heading: "Operations", subheading: "Basic math" })], e, "prelu", null), e;
  }(),
      elu = op(ReluOps.elu),
      leakyRelu = op(ReluOps.leakyRelu),
      prelu = op(ReluOps.prelu),
      relu = op(ReluOps.relu),
      selu = op(ReluOps.selu),
      TransposeOps = function () {
    function e() {}return e.transpose = function (e, t) {
      var n = convertToTensor(e, "x", "transpose");if (null == t && (t = n.shape.map(function (e, t) {
        return t;
      }).reverse()), assert(n.rank === t.length, "Error in transpose: rank of input " + n.rank + " must match length of perm " + t + "."), t.forEach(function (e) {
        assert(e >= 0 && e < n.rank, "All entries in 'perm' must be between 0 and " + (n.rank - 1) + " but got " + t);
      }), n.rank <= 1) return n.clone();return ENV.engine.runKernel(function (e) {
        return e.transpose(n, t);
      }, { $x: n }, function (e) {
        var n = getUndoAxesPermutation(t);return { $x: function () {
            return e.transpose(n);
          } };
      });
    }, __decorate([doc({ heading: "Operations", subheading: "Matrices" })], e, "transpose", null), e;
  }(),
      transpose = op(TransposeOps.transpose),
      SoftmaxOps = function () {
    function e() {}return e.softmax = function (e, t) {
      void 0 === t && (t = -1);var n = convertToTensor(e, "logits", "softmax");if (-1 === t && (t = n.rank - 1), t !== n.rank - 1) throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank " + n.rank + " and dim was " + t);return Gradients.customGrad(function (e) {
        var n = e.logSumExp([t], !0),
            r = e.toFloat().sub(n).exp();return { value: r, gradFunc: function (e) {
            var n = e.mul(r);return n.sub(n.sum([t], !0).mul(r));
          } };
      })(n);
    }, __decorate([doc({ heading: "Operations", subheading: "Normalization" })], e, "softmax", null), e;
  }(),
      softmax = op(SoftmaxOps.softmax),
      LRNOps = function () {
    function e() {}return e.localResponseNormalization = function (e, t, n, r, o) {
      void 0 === t && (t = 5), void 0 === n && (n = 1), void 0 === r && (r = 1), void 0 === o && (o = .5);var a = convertToTensor(e, "x", "localResponseNormalization");assert(4 === a.rank || 3 === a.rank, "Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank " + a.rank + "."), assert(isInt(t), "Error in localResponseNormalization: depthRadius must be an integer\n                     but got depthRadius " + t + ".");var i = a,
          s = !1;3 === a.rank && (s = !0, i = a.as4D(1, a.shape[0], a.shape[1], a.shape[2]));var u = ENV.engine.runKernel(function (e) {
        return e.localResponseNormalization4D(i, t, n, r, o);
      }, { x4D: i });return s ? u.as3D(u.shape[1], u.shape[2], u.shape[3]) : u;
    }, __decorate([doc({ heading: "Operations", subheading: "Normalization" })], e, "localResponseNormalization", null), e;
  }(),
      localResponseNormalization = op(LRNOps.localResponseNormalization),
      NormOps = function () {
    function e() {}return e.norm = function (e, t, n, r) {
      void 0 === t && (t = "euclidean"), void 0 === n && (n = null), void 0 === r && (r = !1);var o = normImpl(e = convertToTensor(e, "x", "norm"), t, n),
          a = o.shape;if (r) {
        var i = parseAxisParam(n, e.shape);a = expandShapeToKeepDim(o.shape, i);
      }return o.reshape(a);
    }, __decorate([doc({ heading: "Operations", subheading: "Matrices" })], e, "norm", null), e;
  }();function normImpl(e, t, n) {
    if (void 0 === n && (n = null), 0 === e.rank) return e.abs();if (1 !== e.rank && null === n) return normImpl(e.reshape([-1]), t, n);if (1 === e.rank || "number" == typeof n || n instanceof Array && 1 === n.length) {
      if (1 === t) return e.abs().sum(n);if (t === 1 / 0) return e.abs().max(n);if (t === -1 / 0) return e.abs().min(n);if ("euclidean" === t || 2 === t) return e.abs().pow(scalar(2, "int32")).sum(n).sqrt();throw new Error("Error in norm: invalid ord value: " + t);
    }if (n instanceof Array && 2 === n.length) {
      if (1 === t) return e.abs().sum(n[0]).max(n[1] - 1);if (t === 1 / 0) return e.abs().sum(n[1]).max(n[0]);if (t === -1 / 0) return e.abs().sum(n[1]).min(n[0]);if ("fro" === t || "euclidean" === t) return e.square().sum(n).sqrt();throw new Error("Error in norm: invalid ord value: " + t);
    }throw new Error("Error in norm: invalid axis: " + n);
  }var norm = op(NormOps.norm),
      SegmentOps = function () {
    function e() {}return e.unsortedSegmentSum = function (e, t, n) {
      var r = convertToTensor(e, "x", "unsortedSegmentSum"),
          o = convertToTensor(t, "segmentIds", "unsortedSegmentSum", "int32");assert("int32" === o.dtype, "segmentIds must be of dtype `int32`"), assert(isInt(n), "numSegments must be of dtype int");return ENV.engine.runKernel(function (e) {
        return e.unsortedSegmentSum(r, o, n);
      }, { $x: r }, function (e) {
        return { $x: function () {
            return gatherDropNegatives(e, o);
          } };
      });
    }, e.gather = function (t, n, r) {
      void 0 === r && (r = 0);var o = convertToTensor(t, "x", "gather"),
          a = convertToTensor(n, "indices", "gather", "int32");assert("int32" === a.dtype, "Indices must be of dtype `int32`"), r = parseAxisParam(r, o.shape)[0];return ENV.engine.runKernel(function (e) {
        return e.gather(o, a, r);
      }, { $x: o }, function (t) {
        return { $x: function () {
            if (0 === r) return e.unsortedSegmentSum(t, a, o.shape[r]);var n = o.shape,
                i = a.size,
                s = n.slice(0, r),
                u = s.length,
                l = n.slice(r, n.length).slice(1),
                c = l.length,
                d = arrayRange(0, u),
                p = arrayRange(u + 1, u + 1 + c),
                h = arrayConcat([s, [i], l]),
                f = t.reshape(h),
                g = a.reshape([i]),
                m = arrayConcat([[u], d, p]),
                v = f.transpose(m),
                y = e.unsortedSegmentSum(v, g, o.shape[r]),
                x = getUndoAxesPermutation(m);return y = y.transpose(x);
          } };
      });
    }, __decorate([doc({ heading: "Operations", subheading: "Segment" })], e, "unsortedSegmentSum", null), __decorate([doc({ heading: "Tensors", subheading: "Slicing and Joining" })], e, "gather", null), e;
  }();function arrayRange(e, t) {
    for (var n = [], r = e; r < t; ++r) n.push(r);return n;
  }function arrayConcat(e) {
    for (var t = [], n = 0; n < e.length; ++n) for (var r = 0; r < e[n].length; ++r) t.push(e[n][r]);return t;
  }function gatherDropNegatives(e, t) {
    for (var n = maximum(t, zerosLike(t)), r = SegmentOps.gather(e, n), o = greaterEqual(t, scalar(0, "int32")), a = r.rank - o.rank, i = 0; i < a; ++i) o = expandDims(o, i + 1);o = logicalAnd(o, ones$1(r.shape, "bool"));var s = zerosLike(r);return where(o, r, s);
  }var gather = op(SegmentOps.gather),
      unsortedSegmentSum = op(SegmentOps.unsortedSegmentSum),
      LSTMOps = function () {
    function e() {}return e.multiRNNCell = function (e, t, n, r) {
      for (var o = convertToTensor(t, "data", "multiRNNCell"), a = convertToTensorArray(n, "c", "multiRNNCell"), i = convertToTensorArray(r, "h", "multiRNNCell"), s = o, u = [], l = 0; l < e.length; l++) {
        var c = e[l](s, a[l], i[l]);u.push(c[0]), u.push(c[1]), s = c[1];
      }var d = [],
          p = [];for (l = 0; l < u.length; l += 2) d.push(u[l]), p.push(u[l + 1]);return [d, p];
    }, e.basicLSTMCell = function (e, t, n, r, o, a) {
      var i = convertToTensor(e, "forgetBias", "basicLSTMCell"),
          s = convertToTensor(t, "lstmKernel", "basicLSTMCell"),
          u = convertToTensor(n, "lstmBias", "basicLSTMCell"),
          l = convertToTensor(r, "data", "basicLSTMCell"),
          c = convertToTensor(o, "c", "basicLSTMCell"),
          d = convertToTensor(a, "h", "basicLSTMCell"),
          p = l.concat(d, 1).matMul(s).add(u),
          h = p.shape[0],
          f = p.shape[1] / 4,
          g = [h, f],
          m = p.slice([0, 0], g),
          v = p.slice([0, f], g),
          y = p.slice([0, 2 * f], g),
          x = p.slice([0, 3 * f], g),
          T = m.sigmoid().mulStrict(v.tanh()).addStrict(c.mulStrict(i.add(y).sigmoid()));return [T, T.tanh().mulStrict(x.sigmoid())];
    }, __decorate([doc({ heading: "Operations", subheading: "RNN" })], e, "multiRNNCell", null), __decorate([doc({ heading: "Operations", subheading: "RNN" })], e, "basicLSTMCell", null), e;
  }(),
      basicLSTMCell = op(LSTMOps.basicLSTMCell),
      multiRNNCell = op(LSTMOps.multiRNNCell),
      MovingAverageOps = function () {
    function e() {}return e.movingAverage = function (e, t, n, r, o) {
      void 0 === o && (o = !0);var a = convertToTensor(e, "v", "movingAverage"),
          i = convertToTensor(t, "x", "movingAverage"),
          s = convertToTensor(n, "decay", "movingAverage");assertTypesMatch(a, i), assert(arraysEqual(a.shape, i.shape), "Shape mismatch in v and x");var u = scalar(1),
          l = u.sub(s),
          c = i.sub(a).mul(l);if (o) {
        assert(null != r, "When using zeroDebias: true, step is required.");var d = convertToTensor(r, "step", "movingAverage");c = c.div(u.sub(pow(s, d)));
      }return a.add(c);
    }, __decorate([doc({ heading: "Operations", subheading: "Moving Average" })], e, "movingAverage", null), e;
  }(),
      movingAverage = op(MovingAverageOps.movingAverage),
      StridedSliceOps = function () {
    function e() {}return e.stridedSlice = function (e, t, n, r, o, a) {
      void 0 === o && (o = 0), void 0 === a && (a = 0);var i = convertToTensor(e, "x", "stridedSlice");return ENV.engine.runKernel(function (e) {
        return e.stridedSlice(i, t, n, r, o, a);
      }, { $x: i });
    }, __decorate([doc({ heading: "Operations", subheading: "Slicing and Joining" })], e, "stridedSlice", null), e;
  }(),
      stridedSlice = op(StridedSliceOps.stridedSlice);!function (e) {
    e[e.NONE = 0] = "NONE", e[e.MEAN = 1] = "MEAN", e[e.SUM = 2] = "SUM", e[e.SUM_BY_NONZERO_WEIGHTS = 3] = "SUM_BY_NONZERO_WEIGHTS";
  }(exports.Reduction || (exports.Reduction = {}));var LossOps = function () {
    function e() {}return e.computeWeightedLoss = function (e, t, n) {
      void 0 === n && (n = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var r = convertToTensor(e, "losses", "computeWeightedLoss"),
          o = null;null != t && (o = convertToTensor(t, "weights", "computeWeightedLoss"));var a = null == o ? r : r.mul(o);if (n === exports.Reduction.NONE) return a;if (n === exports.Reduction.SUM) return a.sum();if (n === exports.Reduction.MEAN) return null == o ? a.mean() : a.sum().div(o.sum());if (n === exports.Reduction.SUM_BY_NONZERO_WEIGHTS) {
        if (null == o) return a.sum().div(scalar(r.size));var i = o.mul(ones$1(r.shape)).notEqual(scalar(0)).sum().toFloat();return a.sum().div(i);
      }throw Error("Unknown reduction: " + n);
    }, e.absoluteDifference = function (t, n, r, o) {
      void 0 === o && (o = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var a = convertToTensor(t, "labels", "absoluteDifference"),
          i = convertToTensor(n, "predictions", "absoluteDifference"),
          s = null;null != r && (s = convertToTensor(r, "weights", "absoluteDifference")), assertShapesMatch(a.shape, i.shape, "Error in absoluteDifference: ");var u = a.sub(i).abs();return e.computeWeightedLoss(u, s, o);
    }, e.meanSquaredError = function (t, n, r, o) {
      void 0 === o && (o = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var a = convertToTensor(t, "labels", "meanSquaredError"),
          i = convertToTensor(n, "predictions", "meanSquaredError"),
          s = null;null != r && (s = convertToTensor(r, "weights", "meanSquaredError")), assertShapesMatch(a.shape, i.shape, "Error in meanSquaredError: ");var u = a.squaredDifference(i);return e.computeWeightedLoss(u, s, o);
    }, e.cosineDistance = function (t, n, r, o, a) {
      void 0 === a && (a = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var i = convertToTensor(t, "labels", "cosineDistance"),
          s = convertToTensor(n, "predictions", "cosineDistance"),
          u = null;null != o && (u = convertToTensor(o, "weights", "cosineDistance")), assertShapesMatch(i.shape, s.shape, "Error in cosineDistance: ");var l = scalar(1).sub(i.mul(s).sum(r, !0));return e.computeWeightedLoss(l, u, a);
    }, e.hingeLoss = function (t, n, r, o) {
      void 0 === o && (o = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var a = convertToTensor(t, "labels", "hingeLoss"),
          i = convertToTensor(n, "predictions", "hingeLoss"),
          s = null;null != r && (s = convertToTensor(r, "weights", "hingeLoss")), assertShapesMatch(a.shape, i.shape, "Error in hingeLoss: ");var u = scalar(1);a = scalar(2).mul(a).sub(u);var l = u.sub(a.mul(i)).relu();return e.computeWeightedLoss(l, s, o);
    }, e.logLoss = function (t, n, r, o, a) {
      void 0 === o && (o = 1e-7), void 0 === a && (a = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var i = convertToTensor(t, "labels", "logLoss"),
          s = convertToTensor(n, "predictions", "logLoss"),
          u = null;null != r && (u = convertToTensor(r, "weights", "logLoss")), assertShapesMatch(i.shape, s.shape, "Error in logLoss: ");var l = scalar(1),
          c = scalar(o),
          d = i.mul(s.add(c).log()).neg().sub(l.sub(i).mul(l.sub(s).add(c).log()));return e.computeWeightedLoss(d, u, a);
    }, e.huberLoss = function (t, n, r, o, a) {
      void 0 === o && (o = 1), void 0 === a && (a = exports.Reduction.SUM_BY_NONZERO_WEIGHTS);var i = convertToTensor(t, "labels", "huberLoss"),
          s = convertToTensor(n, "predictions", "huberLoss"),
          u = null;null != r && (u = convertToTensor(r, "weights", "huberLoss")), assertShapesMatch(i.shape, s.shape, "Error in huberLoss: ");var l = scalar(o),
          c = s.sub(i).abs(),
          d = minimum(c, l),
          p = c.sub(d),
          h = scalar(.5).mul(d.square()).add(l.mul(p));return e.computeWeightedLoss(h, u, a);
    }, e.softmaxCrossEntropy = function (e, t, n) {
      void 0 === n && (n = -1);var r = convertToTensor(e, "labels", "softmaxCrossEntropy"),
          o = convertToTensor(t, "logits", "softmaxCrossEntropy");if (assertShapesMatch(r.shape, o.shape, "Error in softmaxCrossEntropy: "), -1 === n && (n = o.rank - 1), n !== o.rank - 1) throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank " + o.rank + " and dim was " + n);return customGrad(function (e, t) {
        var r = t.softmax(n);return { value: scalar(1e-5).add(r).log().mul(e).neg().sum([n]), gradFunc: function (t) {
            var o = expandShapeToKeepDim(t.shape, [n]);return [t.reshape(o).mul(e.toFloat().sub(r)), t.reshape(o).mul(r.sub(e.toFloat()))];
          } };
      })(r, o);
    }, __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "computeWeightedLoss", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "absoluteDifference", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "meanSquaredError", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "cosineDistance", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "hingeLoss", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "logLoss", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "huberLoss", null), __decorate([doc({ heading: "Training", subheading: "Losses", namespace: "losses" })], e, "softmaxCrossEntropy", null), e;
  }(),
      absoluteDifference = op(LossOps.absoluteDifference),
      computeWeightedLoss = op(LossOps.computeWeightedLoss),
      cosineDistance = op(LossOps.cosineDistance),
      hingeLoss = op(LossOps.hingeLoss),
      huberLoss = op(LossOps.huberLoss),
      logLoss = op(LossOps.logLoss),
      meanSquaredError = op(LossOps.meanSquaredError),
      softmaxCrossEntropy = op(LossOps.softmaxCrossEntropy),
      loss_ops = Object.freeze({ get Reduction() {
      return exports.Reduction;
    }, absoluteDifference: absoluteDifference, computeWeightedLoss: computeWeightedLoss, cosineDistance: cosineDistance, hingeLoss: hingeLoss, huberLoss: huberLoss, logLoss: logLoss, meanSquaredError: meanSquaredError, softmaxCrossEntropy: softmaxCrossEntropy }),
      LinalgOps = function () {
    function e() {}return e.gramSchmidt = function (e) {
      var t;if (Array.isArray(e)) {
        t = !1, assert(null != e && e.length > 0, "Gram-Schmidt process: input must not be null, undefined, or empty");for (var n = e[0].shape[0], r = 1; r < e.length; ++r) assert(e[r].shape[0] === n, "Gram-Schmidt: Non-unique lengths found in the input vectors: (" + e[r].shape[0] + " vs. " + n + ")");
      } else t = !0, e = split(e, e.shape[0], 0).map(function (e) {
        return squeeze(e, [0]);
      });assert(e.length <= e[0].shape[0], "Gram-Schmidt: Number of vectors (" + e.length + ") exceeds number of dimensions (" + e[0].shape[0] + ").");var o = [],
          a = e,
          i = function (e) {
        o.push(ENV.engine.tidy(function () {
          var t = a[e];if (e > 0) for (var n = 0; n < e; ++n) {
            var r = sum(o[n].mulStrict(t)).mul(o[n]);t = t.sub(r);
          }return t.div(norm(t, "euclidean"));
        }));
      };for (r = 0; r < e.length; ++r) i(r);return t ? stack(o, 0) : o;
    }, e.qr = function (e, t) {
      if (void 0 === t && (t = !1), e.rank < 2) throw new Error("qr() requires input tensor to have a rank >= 2, but got rank " + e.rank);if (2 === e.rank) return qr2d(e, t);var n = e.shape.slice(0, e.shape.length - 2).reduce(function (e, t) {
        return e * t;
      }),
          r = [],
          o = [];return unstack(e.reshape([n, e.shape[e.shape.length - 2], e.shape[e.shape.length - 1]]), 0).forEach(function (e) {
        var n = qr2d(e, t),
            a = n[0],
            i = n[1];r.push(a), o.push(i);
      }), [stack(r, 0).reshape(e.shape), stack(o, 0).reshape(e.shape)];
    }, __decorate([doc({ heading: "Operations", subheading: "Linear Algebra" })], e, "gramSchmidt", null), __decorate([doc({ heading: "Operations", subheading: "Linear Algebra" })], e, "qr", null), e;
  }();function qr2d(e, t) {
    return void 0 === t && (t = !1), ENV.engine.tidy(function () {
      if (2 !== e.shape.length) throw new Error("qr2d() requires a 2D Tensor, but got a " + e.shape.length + "D Tensor.");for (var n = e.shape[0], r = e.shape[1], o = eye(n), a = e.clone(), i = tensor2d([[1]], [1, 1]), s = i.clone(), u = n >= r ? r : n, l = function (e) {
        var t,
            u = a,
            l = s,
            c = o;t = ENV.engine.tidy(function () {
          var t = a.slice([e, e], [n - e, 1]),
              u = t.norm(),
              l = a.slice([e, e], [1, 1]),
              c = l.sign().neg(),
              d = l.sub(c.mul(u)),
              p = t.div(d);s = 1 === p.shape[0] ? i.clone() : i.concat(p.slice([1, 0], [p.shape[0] - 1, p.shape[1]]), 0);var h = c.matMul(d).div(u).neg(),
              f = a.slice([e, 0], [n - e, r]),
              g = h.mul(s);a = 0 === e ? f.sub(g.matMul(s.transpose().matMul(f))) : a.slice([0, 0], [e, r]).concat(f.sub(g.matMul(s.transpose().matMul(f))), 0);var m = o.slice([0, e], [n, o.shape[1] - e]);return o = 0 === e ? m.sub(m.matMul(s).matMul(g.transpose())) : o.slice([0, 0], [n, e]).concat(m.sub(m.matMul(s).matMul(g.transpose())), 1), [s, a, o];
        }), s = t[0], a = t[1], o = t[2], dispose([u, l, c]);
      }, c = 0; c < u; ++c) l(c);return !t && n > r && (o = o.slice([0, 0], [n, r]), a = a.slice([0, 0], [r, r])), [o, a];
    });
  }var gramSchmidt = op(LinalgOps.gramSchmidt),
      qr = op(LinalgOps.qr),
      linalg_ops = Object.freeze({ gramSchmidt: gramSchmidt, qr: qr }),
      ImageOps = function () {
    function e() {}return e.resizeBilinear = function (e, t, n) {
      void 0 === n && (n = !1);var r = convertToTensor(e, "images", "resizeBilinear");assert(3 === r.rank || 4 === r.rank, "Error in resizeBilinear: x must be rank 3 or 4, but got rank " + r.rank + "."), assert(2 === t.length, "Error in resizeBilinear: new shape must 2D, but got shape " + t + ".");var o = r,
          a = !1;3 === r.rank && (a = !0, o = r.as4D(1, r.shape[0], r.shape[1], r.shape[2]));var i = t[0],
          s = t[1],
          u = ENV.engine.runKernel(function (e, t) {
        return e.resizeBilinear(o, i, s, n);
      }, { batchImages: o }, function (e, t) {
        return { batchImages: function () {
            return ENV.engine.runKernel(function (t) {
              return t.resizeBilinearBackprop(e, o, n);
            }, {});
          } };
      });return a ? u.as3D(u.shape[1], u.shape[2], u.shape[3]) : u;
    }, e.resizeNearestNeighbor = function (e, t, n) {
      void 0 === n && (n = !1);var r = convertToTensor(e, "images", "resizeNearestNeighbor");assert(3 === r.rank || 4 === r.rank, "Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank " + r.rank + "."), assert(2 === t.length, "Error in resizeNearestNeighbor: new shape must 2D, but got shape " + t + "."), assert("float32" === r.dtype || "int32" === r.dtype, "`images` must have `int32` or `float32` as dtype");var o = r,
          a = !1;3 === r.rank && (a = !0, o = r.as4D(1, r.shape[0], r.shape[1], r.shape[2]));var i = t[0],
          s = t[1],
          u = ENV.engine.runKernel(function (e, t) {
        return e.resizeNearestNeighbor(o, i, s, n);
      }, { batchImages: o }, function (e, t) {
        return { batchImages: function () {
            return ENV.engine.runKernel(function (t) {
              return t.resizeNearestNeighborBackprop(e, o, n);
            }, {});
          } };
      });return a ? u.as3D(u.shape[1], u.shape[2], u.shape[3]) : u;
    }, __decorate([doc({ heading: "Operations", subheading: "Images", namespace: "image" })], e, "resizeBilinear", null), __decorate([doc({ heading: "Operations", subheading: "Images", namespace: "image" })], e, "resizeNearestNeighbor", null), e;
  }(),
      resizeBilinear = op(ImageOps.resizeBilinear),
      resizeNearestNeighbor = op(ImageOps.resizeNearestNeighbor),
      image_ops = Object.freeze({ resizeBilinear: resizeBilinear, resizeNearestNeighbor: resizeNearestNeighbor }),
      ops = Object.freeze({ image: image_ops, linalg: linalg_ops, losses: loss_ops, op: op, batchNormalization2d: batchNormalization2d, batchNormalization3d: batchNormalization3d, batchNormalization4d: batchNormalization4d, batchNormalization: batchNormalization, concat: concat, concat1d: concat1d, concat2d: concat2d, concat3d: concat3d, concat4d: concat4d, conv1d: conv1d, conv2d: conv2d, depthwiseConv2d: depthwiseConv2d, separableConv2d: separableConv2d, conv2dTranspose: conv2dTranspose, matMul: matMul, dot: dot, outerProduct: outerProduct, reverse: reverse, reverse1d: reverse1d, reverse2d: reverse2d, reverse3d: reverse3d, reverse4d: reverse4d, maxPool: maxPool, avgPool: avgPool, slice: slice, slice1d: slice1d, slice2d: slice2d, slice3d: slice3d, slice4d: slice4d, abs: abs, acos: acos, acosh: acosh, asin: asin, asinh: asinh, atan: atan, atanh: atanh, ceil: ceil, clipByValue: clipByValue, cos: cos, cosh: cosh, erf: erf, exp: exp, expm1: expm1, floor: floor, log: log, log1p: log1p, logSigmoid: logSigmoid, neg: neg, reciprocal: reciprocal, round: round, rsqrt: rsqrt, sigmoid: sigmoid, sign: sign, sin: sin, sinh: sinh, softplus: softplus, sqrt: sqrt, square: square, step: step, tan: tan, tanh: tanh$1, all: all, any: any, argMax: argMax, argMin: argMin, logSumExp: logSumExp, max: max, mean: mean, min: min, moments: moments, sum: sum, equal: equal, equalStrict: equalStrict, greater: greater, greaterEqual: greaterEqual, greaterEqualStrict: greaterEqualStrict, greaterStrict: greaterStrict, less: less, lessEqual: lessEqual, lessEqualStrict: lessEqualStrict, lessStrict: lessStrict, notEqual: notEqual, notEqualStrict: notEqualStrict, add: add, addStrict: addStrict, atan2: atan2, div: div, divStrict: divStrict, floorDiv: floorDiv, maximum: maximum, maximumStrict: maximumStrict, minimum: minimum, minimumStrict: minimumStrict, mod: mod, modStrict: modStrict, mul: mul, mulStrict: mulStrict, pow: pow, powStrict: powStrict, squaredDifference: squaredDifference, squaredDifferenceStrict: squaredDifferenceStrict, sub: sub, subStrict: subStrict, sigmoidCrossEntropyWithLogits: sigmoidCrossEntropyWithLogits, elu: elu, leakyRelu: leakyRelu, prelu: prelu, relu: relu, selu: selu, logicalAnd: logicalAnd, logicalNot: logicalNot, logicalOr: logicalOr, logicalXor: logicalXor, where: where, buffer: buffer, toPixels: toPixels, cast: cast, clone: clone, cumsum: cumsum, expandDims: expandDims, eye: eye, fromPixels: fromPixels, multinomial: multinomial, oneHot: oneHot, pad: pad, pad1d: pad1d, pad2d: pad2d, pad3d: pad3d, pad4d: pad4d, print: print, rand: rand, randomNormal: randomNormal, randomUniform: randomUniform, reshape: reshape, split: split, squeeze: squeeze, stack: stack, tile: tile, truncatedNormal: truncatedNormal, unstack: unstack, fill: fill, linspace: linspace, ones: ones$1, range: range, scalar: scalar, tensor: tensor, tensor1d: tensor1d, tensor2d: tensor2d, tensor3d: tensor3d, tensor4d: tensor4d, tensor5d: tensor5d, tensor6d: tensor6d, zeros: zeros, onesLike: onesLike, zerosLike: zerosLike, transpose: transpose, softmax: softmax, localResponseNormalization: localResponseNormalization, norm: norm, gather: gather, unsortedSegmentSum: unsortedSegmentSum, basicLSTMCell: basicLSTMCell, multiRNNCell: multiRNNCell, movingAverage: movingAverage, stridedSlice: stridedSlice }),
      PARALLELIZE_THRESHOLD = 30;function computeOptimalWindowSize(e) {
    return e <= PARALLELIZE_THRESHOLD ? e : nearestDivisor(e, Math.floor(Math.sqrt(e)));
  }function segOpComputeOptimalWindowSize(e, t) {
    var n,
        r = !1;for (e <= PARALLELIZE_THRESHOLD ? (n = e, r = !0) : n = nearestDivisor(e, Math.floor(Math.sqrt(e))); !r;) {
      if (n > t || n === e) {
        r = !0;break;
      }n = nearestDivisor(e, n + 1);
    }return n;
  }function computeOutShape$1(e, t, n) {
    for (var r = [], o = e.length, a = 0; a < o; a++) a !== t ? r.push(e[a]) : r.push(n);return r;
  }function castTensor(e, t, n) {
    if (!hasEncodingLoss(e.dtype, t)) return Tensor.make(e.shape, { dataId: e.dataId }, t);if ("int32" === t) return n.int(e);if ("bool" === t) return n.notEqual(e, scalar(0, e.dtype));throw new Error("Error in Cast: unknown dtype argument (" + t + ")");
  }function reshapeTensor(e, t) {
    return Tensor.make(t, { dataId: e.dataId }, e.dtype);
  }var ArgMinMaxProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["A"];var r = e.windowSize,
          o = e.batchSize,
          a = e.inSize,
          i = Math.ceil(a / r);n || this.variableNames.push("bestIndicesA"), this.outputShape = [o, i];var s = "max" === t ? ">" : "<",
          u = n ? "inOffset + i;" : "round(getBestIndicesA(batch, inOffset + i));";this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + r + ";\n\n        int bestIndex = 0;\n        float bestValue = getA(batch, inOffset);\n\n        for (int i = 0; i < " + r + "; i++) {\n          int inIdx = " + u + ";\n          float candidate = getA(batch, inIdx);\n          if (candidate " + s + " bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    ";
    };
  }(),
      AvgPool2DBackpropProgram = function () {
    return function (e) {
      this.variableNames = ["dy"], this.outputShape = e.inShape;var t = e.filterHeight,
          n = e.filterWidth,
          r = e.strideHeight,
          o = e.strideWidth,
          a = t - 1 - e.padInfo.top,
          i = n - 1 - e.padInfo.left,
          s = 1 / (t * n);this.userCode = "\n      const ivec2 pads = ivec2(" + a + ", " + i + ");\n      const float avgMultiplier = float(" + s + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + r + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + n + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + o + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n\n            dotProd += dyValue * avgMultiplier;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      BatchNormProgram = function () {
    return function (e, t, n, r, o, a) {
      this.outputShape = [], this.supportsBroadcasting = !0, this.variableNames = ["x", "mean", "variance"], assertAndGetBroadcastShape(e, t), assertAndGetBroadcastShape(e, n);var i = "0.0";null != r && (assertAndGetBroadcastShape(e, r), this.variableNames.push("offset"), i = "getOffsetAtOutCoords()");var s = "1.0";null != o && (assertAndGetBroadcastShape(e, o), this.variableNames.push("scale"), s = "getScaleAtOutCoords()"), this.outputShape = e, this.userCode = "\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = " + i + ";\n        float scale = " + s + ";\n        float inv = scale * inversesqrt(variance + float(" + a + "));\n        setOutput((x - mean) * inv + offset);\n      }\n    ";
    };
  }(),
      CHECK_NAN_SNIPPET = "\n  if (isNaN(a)) return a;\n  if (isNaN(b)) return b;\n",
      ADD = "return a + b;",
      SUB = "return a - b;",
      MUL = "return a * b;",
      DIV = "if (a == b) return 1.0;\n  return a / b;",
      INT_DIV = "\n  float resultSign = sign(a) * sign(b);\n  int ia = round(a);\n  int ib = round(b);\n  int result = ia / ib;\n  int amodb = ia - ib * result;\n\n  if (resultSign < 0.0 && amodb != 0) {\n    result -= 1;\n  }\n  return float(result);\n",
      POW = "\nif(a < 0.0 && floor(b) < b){\n  return NAN;\n}\nreturn (round(mod(b, 2.0)) == 0 || round(mod(b, 2.0)) == 2) ?\n    pow(abs(a), b) : sign(a) * pow(abs(a), b);\n",
      SQUARED_DIFFERENCE = "return (a - b) * (a - b);",
      EQUAL = "return float(a == b);",
      NOT_EQUAL = "return float(a != b);",
      LESS = "return float(a < b);",
      LESS_EQUAL = "return float(a <= b);",
      GREATER = "return float(a > b);",
      GREATER_EQUAL = "return float(a >= b);",
      LOGICAL_AND = "return float(a >= 1.0 && b >= 1.0);",
      LOGICAL_OR = "return float(a >= 1.0 || b >= 1.0);",
      MAX = CHECK_NAN_SNIPPET + "\n  return max(a, b);\n",
      MIN = CHECK_NAN_SNIPPET + "\n  return min(a, b);\n",
      MOD = "if (b == 0.0) return NAN;\n  return mod(a, b);",
      ATAN2 = CHECK_NAN_SNIPPET + "\n  return atan(a, b);\n",
      ELU_DER = "return (b >= 1.0) ? a : a * (b + 1.0);",
      BinaryOpProgram = function () {
    function e(e, t, n) {
      this.variableNames = ["A", "B"], this.supportsBroadcasting = !0, this.outputShape = assertAndGetBroadcastShape(t, n), this.userCode = "\n      uniform float NAN;\n      float binaryOperation(float a, float b) {\n        " + e + "\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    ";
    }return e.prototype.getCustomSetupFunc = function () {
      var e = this;return function (t, n) {
        null == e.startLoc && (e.startLoc = t.getUniformLocationNoThrow(n, "NAN"), null == e.startLoc) || t.gl.uniform1f(e.startLoc, NaN);
      };
    }, e;
  }(),
      ClipProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["A"], this.outputShape = e;var r = t.toFixed(20),
          o = n.toFixed(20);this.userCode = "\n      void main() {\n        float value = getAAtOutCoords();\n        if (isNaN(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, " + r + ", " + o + "));\n      }\n    ";
    };
  }(),
      ConcatProgram = function () {
    return function (e, t) {
      this.variableNames = ["A", "B"], this.outputShape = [], this.outputShape = computeOutShape(e, t, 1), this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int yR = coords.x;\n        int yC = coords.y;\n\n        float value = 0.0;\n        if (yC < " + e[1] + ") {\n          value = getA(yR, yC);\n        } else {\n          yC -= " + e[1] + ";\n          value = getB(yR, yC);\n        }\n\n        setOutput(value);\n      }\n    ";
    };
  }(),
      Conv2DDerFilterProgram = function () {
    return function (e) {
      this.variableNames = ["x", "dy"], this.outputShape = e.filterShape;var t = e.strideHeight,
          n = e.strideWidth,
          r = e.padInfo.top,
          o = e.padInfo.left;this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < " + e.batchSize + "; b++) {\n          for (int yR = 0; yR < " + e.outHeight + "; yR++) {\n            int xR = wR + yR * " + t + " - " + r + ";\n\n            if (xR < 0 || xR >= " + e.inHeight + ") {\n              continue;\n            }\n\n            for (int yC = 0; yC < " + e.outWidth + "; yC++) {\n              int xC = wC + yC * " + n + " - " + o + ";\n\n              if (xC < 0 || xC >= " + e.inWidth + ") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      Conv2DDerInputProgram = function () {
    return function (e) {
      this.variableNames = ["dy", "W"], this.outputShape = e.inShape;var t = e.filterHeight,
          n = e.filterWidth,
          r = e.strideHeight,
          o = e.strideWidth,
          a = t - 1 - e.padInfo.top,
          i = n - 1 - e.padInfo.left;this.userCode = "\n      const ivec2 pads = ivec2(" + a + ", " + i + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + r + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + t + " - 1 - wR;\n\n          for (int wC = 0; wC < " + n + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + o + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + n + " - 1 - wC;\n\n            for (int d2 = 0; d2 < " + e.outChannels + "; d2++) {\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, d2);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      DepthwiseConv2DDerFilterProgram = function () {
    return function (e) {
      this.variableNames = ["x", "dy"], this.outputShape = e.filterShape;var t = e.strideHeight,
          n = e.strideWidth,
          r = e.padInfo.top,
          o = e.padInfo.left,
          a = e.outChannels / e.inChannels;this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int dm = coords.w;\n        int d2 = d1 * " + a + " + dm;\n\n        float dotProd = 0.0;\n\n        // TODO: Vec4 over the batch size\n        for (int b = 0; b < " + e.batchSize + "; b++) {\n          for (int yR = 0; yR < " + e.outHeight + "; yR++) {\n            int xR = wR + yR * " + t + " - " + r + ";\n\n            if (xR < 0 || xR >= " + e.inHeight + ") {\n              continue;\n            }\n\n            for (int yC = 0; yC < " + e.outWidth + "; yC++) {\n              int xC = wC + yC * " + n + " - " + o + ";\n\n              if (xC < 0 || xC >= " + e.inWidth + ") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      DepthwiseConv2DDerInputProgram = function () {
    return function (e) {
      this.variableNames = ["dy", "W"], this.outputShape = e.inShape;var t = e.filterHeight,
          n = e.filterWidth,
          r = e.strideHeight,
          o = e.strideWidth,
          a = t - 1 - e.padInfo.top,
          i = n - 1 - e.padInfo.left,
          s = e.outChannels / e.inChannels;this.userCode = "\n      const ivec2 pads = ivec2(" + a + ", " + i + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        float dotProd = 0.0;\n\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + r + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + t + " - 1 - wR;\n\n          for (int wC = 0; wC < " + n + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + o + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + n + " - 1 - wC;\n\n            // TODO: Vec4 over the channelMul\n            for (int dm = 0; dm < " + s + "; dm++) {\n              int d2 = d1 * " + s + " + dm;\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, dm);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      Conv2DProgram = function () {
    return function (e) {
      this.variableNames = ["x", "W"], this.outputShape = e.outShape;var t = e.padInfo.top,
          n = e.padInfo.left,
          r = e.strideHeight,
          o = e.strideWidth,
          a = e.dilationHeight,
          i = e.dilationWidth,
          s = e.filterHeight,
          u = e.filterWidth,
          l = 4 * Math.floor(e.inChannels / 4),
          c = e.inChannels % 4;this.userCode = "\n      const ivec2 strides = ivec2(" + r + ", " + o + ");\n      const ivec2 pads = ivec2(" + t + ", " + n + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d2 = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + s + "; wR++) {\n          int xR = xRCorner + wR * " + a + ";\n\n          if (xR < 0 || xR >= " + e.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + u + "; wC++) {\n            int xC = xCCorner + wC * " + i + ";\n\n            if (xC < 0 || xC >= " + e.inWidth + ") {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < " + l + "; d1 += 4) {\n              vec4 xValues = vec4(\n                getX(batch, xR, xC, d1),\n                getX(batch, xR, xC, d1 + 1),\n                getX(batch, xR, xC, d1 + 2),\n                getX(batch, xR, xC, d1 + 3)\n              );\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              dotProd += dot(xValues, wValues);\n            }\n\n            if (" + (1 === c) + ") {\n              dotProd +=\n                getX(batch, xR, xC, " + l + ") *\n                getW(wR, wC, " + l + ", d2);\n            } else if (" + (2 === c) + ") {\n              vec2 xValues = vec2(\n                getX(batch, xR, xC, " + l + "),\n                getX(batch, xR, xC, " + l + " + 1)\n              );\n              vec2 wValues = vec2(\n                getW(wR, wC, " + l + ", d2),\n                getW(wR, wC, " + l + " + 1, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            } else if (" + (3 === c) + ") {\n              vec3 xValues = vec3(\n                getX(batch, xR, xC, " + l + "),\n                getX(batch, xR, xC, " + l + " + 1),\n                getX(batch, xR, xC, " + l + " + 2)\n              );\n              vec3 wValues = vec3(\n                getW(wR, wC, " + l + ", d2),\n                getW(wR, wC, " + l + " + 1, d2),\n                getW(wR, wC, " + l + " + 2, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      DepthwiseConv2DProgram = function () {
    return function (e) {
      this.variableNames = ["x", "W"], this.outputShape = e.outShape;var t = e.inHeight,
          n = e.inWidth,
          r = e.padInfo.top,
          o = e.padInfo.left,
          a = e.strideHeight,
          i = e.strideWidth,
          s = e.dilationHeight,
          u = e.dilationWidth,
          l = e.filterHeight,
          c = e.filterWidth,
          d = e.outChannels / e.inChannels;this.userCode = "\n      const ivec2 strides = ivec2(" + a + ", " + i + ");\n      const ivec2 pads = ivec2(" + r + ", " + o + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / " + d + ";\n        int q = d2 - d1 * " + d + ";\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TODO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < " + l + "; wR++) {\n          int xR = xRCorner + wR * " + s + ";\n\n          if (xR < 0 || xR >= " + t + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + c + "; wC++) {\n            int xC = xCCorner + wC * " + u + ";\n\n            if (xC < 0 || xC >= " + n + ") {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }();function makeShader(e, t, n, r) {
    var o = e.map(function (e) {
      var t = sizeFromShape(e.shapeInfo.logicalShape);return e.shapeInfo.isUniform ? "uniform float " + e.name + (t > 1 ? "[" + t + "]" : "") + ";" : "uniform sampler2D " + e.name + ";";
    });o = o.join("\n");var a = e.map(function (e) {
      return getInputSamplingSnippet(e, t, r);
    }).join("\n"),
        i = t.texShape,
        s = getOutputSamplingSnippet(t.logicalShape, i);return [SHADER_PREFIX, FLOAT_TEXTURE_SAMPLE_SNIPPET, FLOAT_TEXTURE_SETOUTPUT_SNIPPET, o, s, a, n].join("\n");
  }function getSamplerFromInInfo(e) {
    var t = e.shapeInfo.logicalShape;switch (t.length) {case 0:
        return getSamplerScalar(e);case 1:
        return getSampler1D(e);case 2:
        return getSampler2D(e);case 3:
        return getSampler3D(e);case 4:
        return getSampler4D(e);case 5:
        return getSampler5D(e);case 6:
        return getSampler6D(e);default:
        throw new Error(t.length + "-D input sampling is not yet supported");}
  }function getInputSamplingSnippet(e, t, n) {
    var r = getSamplerFlat(e);return r += getSamplerFromInInfo(e), (n || arraysEqual(e.shapeInfo.logicalShape, t.logicalShape)) && (r += getSamplerAtOutputCoords(e, t, n)), r;
  }function getOutputSamplingSnippet(e, t) {
    switch (e.length) {case 0:
        return getOutputScalarCoords();case 1:
        return getOutput1DCoords(e, t);case 2:
        return getOutput2DCoords(e, t);case 3:
        return getOutput3DCoords(e, t);case 4:
        return getOutput4DCoords(e, t);case 5:
        return getOutput5DCoords(e, t);case 6:
        return getOutput6DCoords(e, t);default:
        throw new Error(e.length + "-D output sampling is not yet supported");}
  }var SAMPLE_1D_SNIPPET = "\nvec2 UVfrom1D(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
      SAMPLE_2D_SNIPPET = "\nvec2 UVfrom2D(int texNumR, int texNumC, int numC, int row, int col) {\n  int index = row * numC + col;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
      SAMPLE_3D_SNIPPET = "\nvec2 UVfrom3D(int texNumR, int texNumC, int stride0,\n    int stride1, int row, int col, int depth) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
      SAMPLE_4D_SNIPPET = "\nvec2 UVfrom4D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int row, int col, int depth,\n    int depth2) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth * stride2 + depth2;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
      SAMPLE_5D_SNIPPET = "\nvec2 UVfrom5D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int stride3, int row, int col, int depth,\n    int depth2, int depth3) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 +\n              depth * stride2 + depth2 * stride3 + depth3;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
      SAMPLE_6D_SNIPPET = "\nvec2 UVfrom6D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int stride3, int stride4,\n    int row, int col, int depth, int depth2, int depth3, int depth4) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth * stride2 + depth2 *\n    stride3 + depth3 * stride4 + depth4;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
      FLOAT_TEXTURE_SAMPLE_SNIPPET = "\n  float sampleTexture(sampler2D textureSampler, vec2 uv) {\n    return texture2D(textureSampler, uv).r;\n  }\n",
      FLOAT_TEXTURE_SETOUTPUT_SNIPPET = "\n  void setOutput(float val) {\n    gl_FragColor = vec4(val, 0, 0, 0);\n  }\n",
      SHADER_PREFIX = "\n  precision highp float;\n  precision highp int;\n  varying vec2 resultUV;\n  const vec2 halfCR = vec2(0.5, 0.5);\n\n  struct ivec5\n  {\n    int x;\n    int y;\n    int z;\n    int w;\n    int u;\n  };\n\n  struct ivec6\n  {\n    int x;\n    int y;\n    int z;\n    int w;\n    int u;\n    int v;\n  };\n\n  bool isNaN(float val) {\n    return (val < 0.0 || 0.0 < val || val == 0.0) ? false : true;\n  }\n\n  bool hasNaN(vec4 values) {\n    vec4 v1 = values * values;\n    vec4 v2 = values * values;\n    return any(notEqual(v1, v2));\n  }\n\n  float getNaN(vec4 values) {\n    return dot(vec4(1), values);\n  }\n\n  int round(float value) {\n    return int(floor(value + 0.5));\n  }\n\n  int imod(int x, int y) {\n    return x - y * (x / y);\n  }\n\n  //Based on the work of Dave Hoskins\n  //https://www.shadertoy.com/view/4djSRW\n  #define HASHSCALE1 443.8975\n  float random(float seed){\n    vec2 p = resultUV * seed;\n    vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n    p3 += dot(p3, p3.yzx + 19.19);\n    return fract((p3.x + p3.y) * p3.z);\n  }\n\n  " + SAMPLE_1D_SNIPPET + "\n  " + SAMPLE_2D_SNIPPET + "\n  " + SAMPLE_3D_SNIPPET + "\n  " + SAMPLE_4D_SNIPPET + "\n  " + SAMPLE_5D_SNIPPET + "\n  " + SAMPLE_6D_SNIPPET + "\n";function getOutputScalarCoords() {
    return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";
  }function getOutput1DCoords(e, t) {
    return 1 === t[0] ? "\n      int getOutputCoords() {\n        return int(resultUV.x * " + t[1] + ".0);\n      }\n    " : 1 === t[1] ? "\n      int getOutputCoords() {\n        return int(resultUV.y * " + t[0] + ".0);\n      }\n    " : "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + t[0] + ", " + t[1] + "));\n      return resTexRC.x * " + t[1] + " + resTexRC.y;\n    }\n  ";
  }function getOutput3DCoords(e, t) {
    var n = e[1] * e[2],
        r = e[2];return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n      int r = index / " + n + ";\n      index -= r * " + n + ";\n      int c = index / " + r + ";\n      int d = index - c * " + r + ";\n      return ivec3(r, c, d);\n    }\n  ";
  }function getOutput4DCoords(e, t) {
    var n = e[3],
        r = e[2] * n,
        o = e[1] * r;return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n\n      int r = index / " + o + ";\n      index -= r * " + o + ";\n\n      int c = index / " + r + ";\n      index -= c * " + r + ";\n\n      int d = index / " + n + ";\n      int d2 = index - d * " + n + ";\n\n      return ivec4(r, c, d, d2);\n    }\n  ";
  }function getOutput5DCoords(e, t) {
    var n = e[4],
        r = e[3] * n,
        o = e[2] * r,
        a = e[1] * o;return "\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2(" + t[0] + ",\n                             " + t[1] + "));\n\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n\n      int r = index / " + a + ";\n      index -= r * " + a + ";\n\n      int c = index / " + o + ";\n      index -= c * " + o + ";\n\n      int d = index / " + r + ";\n      index -= d * " + r + ";\n\n      int d2 = index  / " + n + ";\n      int d3 = index - d2 * " + n + ";\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  ";
  }function getOutput6DCoords(e, t) {
    var n = e[5],
        r = e[4] * n,
        o = e[3] * r,
        a = e[2] * o,
        i = e[1] * a;return "\n    ivec6 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n\n      int r = index / " + i + ";\n      index -= r * " + i + ";\n\n      int c = index / " + a + ";\n      index -= c * " + a + ";\n\n      int d = index / " + o + ";\n      index -= d * " + o + ";\n\n      int d2 = index / " + r + ";\n      index -= d2 * " + r + ";\n\n      int d3 = index / " + n + ";\n      int d4 = index - d3 * " + n + ";\n\n      ivec6 result = ivec6(r, c, d, d2, d3, d4);\n      return result;\n    }\n  ";
  }function getOutput2DCoords(e, t) {
    return arraysEqual(e, t) ? "\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(" + t[0] + ", " + t[1] + "));\n      }\n    " : 1 === e[1] ? "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + t[0] + ", " + t[1] + "));\n        int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    " : 1 === e[0] ? "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + t[0] + ", " + t[1] + "));\n        int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n        return ivec2(0, index);\n      }\n    " : "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n      int r = index / " + e[1] + ";\n      int c = index - r * " + e[1] + ";\n      return ivec2(r, c);\n    }\n  ";
  }function getSamplerScalar(e) {
    var t = e.name,
        n = "get" + t.charAt(0).toUpperCase() + t.slice(1);return e.shapeInfo.isUniform ? "float " + n + "() {return " + t + ";}" : "\n    float " + n + "() {\n      return sampleTexture(" + t + ", halfCR);\n    }\n  ";
  }function getSampler1D(e) {
    var t = e.name,
        n = "get" + t.charAt(0).toUpperCase() + t.slice(1);return "\n    float " + n + "(int index) {\n      return " + n + "Flat(index);\n    }\n  ";
  }function getSampler2D(e) {
    var t = e.shapeInfo.logicalShape,
        n = e.name,
        r = "get" + n.charAt(0).toUpperCase() + n.slice(1),
        o = e.shapeInfo.texShape;if (null != o && arraysEqual(t, o)) {
      var a = o[0];return "\n    float " + r + "(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(" + o[1] + ".0, " + a + ".0);\n      return sampleTexture(" + n + ", uv);\n    }\n  ";
    }var i = squeezeShape(t),
        s = i.newShape,
        u = i.keptDims,
        l = s;if (l.length < t.length) {
      return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, l)) + "\n      float " + r + "(int row, int col) {\n        return " + r + "(" + getSqueezedParams(["row", "col"], u) + ");\n      }\n    ";
    }if (e.shapeInfo.isUniform) return "\n      float " + r + "(int row, int col) {\n        int index = row * " + t[1] + " + col;\n        return " + r + "Flat(index);\n      }\n    ";var c = o[0],
        d = o[1];return 1 === d ? "\n    float " + r + "(int row, int col) {\n      int index = row * " + t[1] + " + col;\n      vec2 uv = vec2(0.5, (float(index) + 0.5) / " + c + ".0);\n      return sampleTexture(" + n + ", uv);\n    }\n  " : 1 === c ? "\n    float " + r + "(int row, int col) {\n      int index = row * " + t[1] + " + col;\n      vec2 uv = vec2((float(index) + 0.5) / " + d + ".0, 0.5);\n      return sampleTexture(" + n + ", uv);\n    }\n  " : "\n  float " + r + "(int row, int col) {\n    vec2 uv = UVfrom2D(" + c + ", " + d + ", " + t[1] + ", row, col);\n    return sampleTexture(" + n + ", uv);\n  }\n";
  }function getSampler3D(e) {
    var t = e.shapeInfo.logicalShape,
        n = e.name,
        r = "get" + n.charAt(0).toUpperCase() + n.slice(1),
        o = t[1] * t[2],
        a = t[2],
        i = squeezeShape(t),
        s = i.newShape,
        u = i.keptDims,
        l = s;if (l.length < t.length) {
      return "\n        " + getSamplerFromInInfo(squeezeInputInfo(e, l)) + "\n        float " + r + "(int row, int col, int depth) {\n          return " + r + "(" + getSqueezedParams(["row", "col", "depth"], u) + ");\n        }\n      ";
    }if (e.shapeInfo.isUniform) return "\n      float " + r + "(int row, int col, int depth) {\n        int index = row * " + o + " + col * " + a + " + depth;\n        return " + r + "Flat(index);\n      }\n    ";var c = e.shapeInfo.texShape,
        d = c[0],
        p = c[1];return p === o ? "\n        float " + r + "(int row, int col, int depth) {\n          int texR = row;\n          int texC = col * " + a + " + depth;\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(" + p + ".0, " + d + ".0);\n          return sampleTexture(" + n + ", uv);\n        }\n      " : p === a ? "\n    float " + r + "(int row, int col, int depth) {\n      int texR = row * " + t[1] + " + col;\n      int texC = depth;\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + p + ".0, " + d + ".0);\n      return sampleTexture(" + n + ", uv);\n    }\n  " : "\n      float " + r + "(int row, int col, int depth) {\n        vec2 uv = UVfrom3D(\n            " + d + ", " + p + ", " + o + ", " + a + ", row, col, depth);\n        return sampleTexture(" + n + ", uv);\n      }\n  ";
  }function getSampler4D(e) {
    var t = e.shapeInfo.logicalShape,
        n = e.name,
        r = "get" + n.charAt(0).toUpperCase() + n.slice(1),
        o = t[3],
        a = t[2] * o,
        i = t[1] * a,
        s = squeezeShape(t),
        u = s.newShape,
        l = s.keptDims;if (u.length < t.length) {
      return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, u)) + "\n      float " + r + "(int row, int col, int depth, int depth2) {\n        return " + r + "(" + getSqueezedParams(["row", "col", "depth", "depth2"], l) + ");\n      }\n    ";
    }if (e.shapeInfo.isUniform) return "\n      float " + r + "(int row, int col, int depth, int depth2) {\n        int index = row * " + i + " + col * " + a + " +\n            depth * " + o + " + depth2;\n        return " + r + "Flat(index);\n      }\n    ";var c = e.shapeInfo.texShape,
        d = c[0],
        p = c[1];return p === i ? "\n      float " + r + "(int row, int col, int depth, int depth2) {\n        int texR = row;\n        int texC = col * " + a + " + depth * " + o + " + depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + p + ".0, " + d + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : p === o ? "\n      float " + r + "(int row, int col, int depth, int depth2) {\n        int texR = row * " + t[1] * t[2] + " + col * " + t[2] + " + depth;\n        int texC = depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + p + ".0, " + d + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : "\n    float " + r + "(int row, int col, int depth, int depth2) {\n      vec2 uv = UVfrom4D(" + d + ", " + p + ", " + i + ", " + a + ",\n          " + o + ", row, col, depth, depth2);\n      return sampleTexture(" + n + ", uv);\n    }\n  ";
  }function getSampler5D(e) {
    var t = e.shapeInfo.logicalShape,
        n = e.name,
        r = "get" + n.charAt(0).toUpperCase() + n.slice(1),
        o = t[4],
        a = t[3] * o,
        i = t[2] * a,
        s = t[1] * i,
        u = squeezeShape(t),
        l = u.newShape,
        c = u.keptDims;if (l.length < t.length) {
      return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, l)) + "\n      float " + r + "(int row, int col, int depth, int depth2, int depth3) {\n        return " + r + "(" + getSqueezedParams(["row", "col", "depth", "depth2", "depth3"], c) + ");\n      }\n    ";
    }if (e.shapeInfo.isUniform) return "\n      float " + r + "(int row, int col, int depth, int depth2, int depth3) {\n        int index = row * " + s + " + col * " + i + " +\n            depth * " + a + " + depth2 * " + o + " + depth3;\n        return " + r + "Flat(index);\n      }\n    ";var d = e.shapeInfo.texShape,
        p = d[0],
        h = d[1];return h === s ? "\n      float " + r + "(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        int texC = col * " + i + " + depth * " + a + " +\n                   depth2 * " + o + " + depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + h + ".0, " + p + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : h === o ? "\n      float " + r + "(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row * " + t[1] * t[2] + " + col * " + t[2] + " +\n                   depth * " + t[3] + " + depth2;\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + h + ".0, " + p + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : "\n    float " + r + "(int row, int col, int depth, int depth2, int depth3) {\n      vec2 uv = UVfrom5D(" + p + ", " + h + ", " + s + ", " + i + ",\n          " + a + ", " + o + ", row, col, depth, depth2, depth3);\n      return sampleTexture(" + n + ", uv);\n    }\n  ";
  }function getSampler6D(e) {
    var t = e.shapeInfo.logicalShape,
        n = e.name,
        r = "get" + n.charAt(0).toUpperCase() + n.slice(1),
        o = t[5],
        a = t[4] * o,
        i = t[3] * a,
        s = t[2] * i,
        u = t[1] * s,
        l = squeezeShape(t),
        c = l.newShape,
        d = l.keptDims;if (c.length < t.length) {
      return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, c)) + "\n      float " + r + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return " + r + "(" + getSqueezedParams(["row", "col", "depth", "depth2", "depth3", "depth4"], d) + ");\n      }\n    ";
    }if (e.shapeInfo.isUniform) return "\n      float " + r + "(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = row * " + u + " + col * " + s + " +\n            depth * " + i + " + depth2 * " + a + " + depth3 * " + a + "\n            + depth4\n        return " + r + "Flat(index);\n      }\n    ";var p = e.shapeInfo.texShape,
        h = p[0],
        f = p[1];return f === u ? "\n      float " + r + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        int texC = col * " + s + " + depth * " + i + " + depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + f + ".0, " + h + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : f === o ? "\n      float " + r + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row * " + t[1] * t[2] + " + col * " + t[2] + " + depth;\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + f + ".0, " + h + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : "\n    float " + r + "(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      vec2 uv = UVfrom6D(" + h + ", " + f + ", " + u + ", " + s + ",\n          " + i + ", " + a + ", " + o + "\n          ,row, col, depth, depth2, depth3, depth4);\n      return sampleTexture(" + n + ", uv);\n    }\n  ";
  }function getSamplerFlat(e) {
    var t = e.name,
        n = "get" + t.charAt(0).toUpperCase() + t.slice(1) + "Flat",
        r = sizeFromShape(e.shapeInfo.logicalShape);if (e.shapeInfo.isUniform) return 1 === r ? "float " + n + "(int index) {return " + t + ";}" : "\n      float " + n + "(int index) {\n        for (int i = 0; i < " + r + "; i++) {\n          if (i == index) {\n            return " + t + "[i];\n          }\n        }\n      }\n    ";var o = e.shapeInfo.texShape,
        a = o[0],
        i = o[1];return 1 === i && 1 === a ? "\n      float " + n + "(int index) {\n        return sampleTexture(" + t + ", halfCR);\n      }\n    " : 1 === i ? "\n      float " + n + "(int index) {\n        vec2 uv = vec2(0.5, (float(index) + 0.5) / " + a + ".0);\n        return sampleTexture(" + t + ", uv);\n      }\n    " : 1 === a ? "\n      float " + n + "(int index) {\n        vec2 uv = vec2((float(index) + 0.5) / " + i + ".0, 0.5);\n        return sampleTexture(" + t + ", uv);\n      }\n    " : "\n    float " + n + "(int index) {\n      vec2 uv = UVfrom1D(" + a + ", " + i + ", index);\n      return sampleTexture(" + t + ", uv);\n    }\n  ";
  }function getBroadcastOutputCoordsSampler(e, t, n, r) {
    var o = e.shapeInfo.logicalShape.length,
        a = t.logicalShape.length,
        i = "int";2 === a ? i = "ivec2" : 3 === a ? i = "ivec3" : 4 === a && (i = "ivec4");var s = getBroadcastDims(e.shapeInfo.logicalShape, t.logicalShape),
        u = a - o;return "\n    float " + r + "() {\n      " + i + " coords = getOutputCoords();\n      " + (0 === o ? "" : a < 2 && s.length >= 1 ? "coords = 0;" : s.map(function (e) {
      return "coords[" + (e + u) + "] = 0;";
    }).join("\n")) + "\n      return get" + n + "(" + (a < 2 && o > 0 ? "coords" : e.shapeInfo.logicalShape.map(function (e, t) {
      return "coords[" + (t + u) + "]";
    }).join(", ")) + ");\n    }\n  ";
  }function getSamplerAtOutputCoords(e, t, n) {
    var r = e.name,
        o = r.charAt(0).toUpperCase() + r.slice(1),
        a = "get" + o + "AtOutCoords",
        i = getBroadcastDims(e.shapeInfo.logicalShape, t.logicalShape),
        s = e.shapeInfo.logicalShape.length,
        u = t.logicalShape.length,
        l = n && (u > s || i.length > 0),
        c = broadcastDimsAreOuter(i),
        d = e.shapeInfo.isUniform;if (l && !c) return getBroadcastOutputCoordsSampler(e, t, o, a);var p = sizeFromShape(e.shapeInfo.logicalShape),
        h = "";l && c && (h = "\n        int mainPart = index / " + p + ";\n        index -= mainPart * " + p + ";\n      ");var f = t.texShape;if (d) return 1 === p ? "float " + a + "() {return " + r + ";}" : "\n      float " + a + "() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                              vec2(" + f[0] + ", " + f[1] + "));\n        int index = resTexRC.x * " + f[1] + " + resTexRC.y;\n        " + h + "\n        return get" + o + "Flat(index);\n      }\n    ";var g = e.shapeInfo.texShape;return arraysEqual(g, f) ? "\n      float " + a + "() {\n        return sampleTexture(" + r + ", resultUV);\n      }\n    " : "\n    float " + a + "() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + f[0] + ", " + f[1] + "));\n      int index = resTexRC.x * " + f[1] + " + resTexRC.y;\n      " + h + "\n      int texR = index / " + g[1] + ";\n      int texC = index - texR * " + g[1] + ";\n      vec2 uv = (vec2(texC, texR) + halfCR) /\n                 vec2(" + g[1] + ".0, " + g[0] + ".0);\n\n      return sampleTexture(" + r + ", uv);\n    }\n  ";
  }function getCoordsDataType(e) {
    if (e <= 1) return "int";if (2 === e) return "ivec2";if (3 === e) return "ivec3";if (4 === e) return "ivec4";if (5 === e) return "ivec5";if (6 === e) return "ivec6";throw Error("GPU for rank " + e + " is not yet supported");
  }function squeezeInputInfo(e, t) {
    var n = JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape = t, n;
  }function getSqueezedParams(e, t) {
    return t.map(function (t) {
      return e[t];
    }).join(", ");
  }var CumSumProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["x"], this.outputShape = e;var r = e.length,
          o = e[e.length - 1],
          a = n ? "<" : ">";this.userCode = "\n      int getIndex(int i) {\n        " + (n ? "return " + o + " -i - 1;" : "return i;") + "\n      }\n\n      void main() {\n        " + getCoordsDataType(r) + " coords = getOutputCoords();\n        int end = " + getFinalCoord(r, "coords") + ";\n        float val = 0.0;\n        for (int i = " + o + " - 1; i >= 0; i -= 1) {\n          int idx = getIndex(i);\n          if (idx " + a + " end) {\n            continue;\n          }\n          if (idx == end && " + t + ") {\n            continue;\n          }\n          " + getFinalCoord(r, "coords") + " = idx;\n          val += getX(" + getCoords(r, "coords") + ");\n        }\n        setOutput(val);\n      }\n    ";
    };
  }();function getCoords(e, t) {
    if (1 === e) return "" + t;if (2 === e) return t + ".x, " + t + ".y";if (3 === e) return t + ".x, " + t + ".y, " + t + ".z";if (4 === e) return t + ".x, " + t + ".y, " + t + ".z, " + t + ".w";throw Error("Cumulative sum for rank " + e + " is not yet supported");
  }function getFinalCoord(e, t) {
    if (1 === e) return "" + t;if (2 === e) return t + ".y";if (3 === e) return t + ".z";if (4 === e) return t + ".w";throw Error("Cumulative sum for rank " + e + " is not yet supported");
  }var TextureUsage,
      PhysicalTextureType,
      EncodeFloatProgram = function () {
    return function (e) {
      this.variableNames = ["A"], this.outputShape = e, this.userCode = "\n      const float FLOAT_MAX = 1.70141184e38;\n      const float FLOAT_MIN = 1.17549435e-38;\n\n      lowp vec4 encode_float(highp float v) {\n        if (isNaN(v)) {\n          return vec4(255, 255, 255, 255);\n        }\n\n        highp float av = abs(v);\n\n        if(av < FLOAT_MIN) {\n          return vec4(0.0, 0.0, 0.0, 0.0);\n        } else if(v > FLOAT_MAX) {\n          return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;\n        } else if(v < -FLOAT_MAX) {\n          return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;\n        }\n\n        highp vec4 c = vec4(0,0,0,0);\n\n        highp float e = floor(log2(av));\n        highp float m = exp2(fract(log2(av))) - 1.0;\n\n        c[2] = floor(128.0 * m);\n        m -= c[2] / 128.0;\n        c[1] = floor(32768.0 * m);\n        m -= c[1] / 32768.0;\n        c[0] = floor(8388608.0 * m);\n\n        highp float ebias = e + 127.0;\n        c[3] = floor(ebias / 2.0);\n        ebias -= c[3] * 2.0;\n        c[2] += floor(ebias) * 128.0;\n\n        c[3] += 128.0 * step(0.0, -v);\n\n        return c / 255.0;\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        gl_FragColor = encode_float(x);\n      }\n    ";
    };
  }(),
      FromPixelsProgram = function () {
    return function (e) {
      this.variableNames = ["A"];var t = e[0],
          n = e[1];this.outputShape = e, this.userCode = "\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + n + ".0, " + t + ".0);\n\n        vec4 values = texture2D(A, uv);\n        float value;\n        if (depth == 0) {\n          value = values.r;\n        } else if (depth == 1) {\n          value = values.g;\n        } else if (depth == 2) {\n          value = values.b;\n        } else if (depth == 3) {\n          value = values.a;\n        }\n\n        setOutput(floor(value * 255.0 + 0.5));\n      }\n    ";
    };
  }(),
      GatherProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["A", "indices"];var r = e.slice();r[n] = t, this.outputShape = r, this.rank = r.length;var o = getCoordsDataType(this.rank),
          a = getSourceCoords(e, n);this.userCode = "\n      void main() {\n        " + o + " resRC = getOutputCoords();\n        setOutput(getA(" + a + "));\n      }\n    ";
    };
  }();function getSourceCoords(e, t) {
    var n = e.length;if (n > 4) throw Error("Gather for rank " + n + " is not yet supported");if (1 === n) return "int(getIndices(resRC))";for (var r = ["resRC.x", "resRC.y", "resRC.z", "resRC.w"], o = [], a = 0; a < e.length; a++) a === t ? o.push("int(getIndices(" + r[a] + "))") : o.push("" + r[a]);return o.join();
  }function getUnpackedMatrixTextureShapeWidthHeight(e, t) {
    return [t, e];
  }function getUnpackedArraySizeFromMatrixSize(e, t) {
    return e * t;
  }function getMatrixSizeFromUnpackedArraySize(e, t) {
    if (e % t != 0) throw new Error("unpackedSize (" + e + ") must be a multiple of " + t);return e / t;
  }function encodeMatrixToUnpackedArray(e, t, n) {
    var r = getUnpackedArraySizeFromMatrixSize(e.length, n);if (t.length < r) throw new Error("unpackedArray length (" + t.length + ") must be >= " + r);for (var o = 0, a = 0; a < e.length; ++a) t[o] = e[a], o += n;
  }function decodeMatrixFromUnpackedArray(e, t, n) {
    var r = getMatrixSizeFromUnpackedArraySize(e.length, n);if (t.length < r) throw new Error("matrix length (" + t.length + ") must be >= " + r);for (var o = 0, a = 0; a < e.length; a += n) t[o++] = e[a];
  }function getPackedMatrixTextureShapeWidthHeight(e, t) {
    return [Math.ceil(t / 2), Math.ceil(e / 2)];
  }function getPackedRGBAArraySizeFromMatrixShape(e, t) {
    var n = getPackedMatrixTextureShapeWidthHeight(e, t);return n[0] * n[1] * 4;
  }function encodeMatrixToPackedRGBA(e, t, n, r) {
    var o = getPackedRGBAArraySizeFromMatrixShape(t, n);if (r.length < o) throw new Error("packedRGBA length (" + r.length + ") must be >= " + o);for (var a = getPackedMatrixTextureShapeWidthHeight(t, n), i = a[0], s = a[1], u = n % 2 == 1, l = t % 2 == 1, c = Math.floor(n / 2), d = Math.floor(t / 2), p = u ? 4 : 0, h = n, f = 0, g = 0; g < d; ++g) {
      for (var m = 2 * g * n, v = 0; v < c; ++v) {
        var y = m + 2 * v;r[f] = e[y], r[f + 1] = e[y + 1], r[f + 2] = e[y + h], r[f + 3] = e[y + h + 1], f += 4;
      }f += p;
    }if (u) {
      y = n - 1, f = 4 * (i - 1);var x = 2 * n;for (p = 4 * i, g = 0; g < d; ++g) r[f] = e[y], r[f + 2] = e[y + n], y += x, f += p;
    }if (l) for (y = (t - 1) * n, f = (s - 1) * i * 4, v = 0; v < c; ++v) r[f++] = e[y++], r[f++] = e[y++], f += 2;return u && l && (r[r.length - 4] = e[e.length - 1]), r;
  }function decodeMatrixFromPackedRGBA(e, t, n, r) {
    var o = t * n;if (o < r.length) throw new Error("matrix length (" + r.length + ") must be >= " + o);for (var a = n % 2 == 1, i = t % 2 == 1, s = Math.floor(n / 2), u = Math.floor(t / 2), l = getPackedMatrixTextureShapeWidthHeight(t, n), c = l[0], d = l[1], p = a ? 4 : 0, h = n + (a ? 1 : 0), f = 0, g = 0, m = n, v = 0; v < u; ++v) {
      for (var y = 0; y < s; ++y) r[g++] = e[f++], r[g++] = e[f++], r[m++] = e[f++], r[m++] = e[f++];f += p, g += h, m += h;
    }if (a) {
      f = 4 * (c - 1);var x = n - 1;for (p = 4 * c, h = 2 * n, v = 0; v < u; ++v) r[x] = e[f], r[x + n] = e[f + 2], f += p, x += h;
    }if (i) for (f = (d - 1) * c * 4, x = (t - 1) * n, y = 0; y < s; ++y) r[x++] = e[f++], r[x++] = e[f++], f += 2;return a && i && (r[r.length - 1] = e[e.length - 4]), r;
  }!function (e) {
    e[e.RENDER = 0] = "RENDER", e[e.UPLOAD = 1] = "UPLOAD", e[e.PIXELS = 2] = "PIXELS", e[e.DOWNLOAD = 3] = "DOWNLOAD";
  }(TextureUsage || (TextureUsage = {})), function (e) {
    e[e.FLOAT16 = 0] = "FLOAT16", e[e.FLOAT32 = 1] = "FLOAT32", e[e.UNSIGNED_BYTE = 2] = "UNSIGNED_BYTE";
  }(PhysicalTextureType || (PhysicalTextureType = {}));var MAX_TEXTURE_SIZE = null;function createWebGLRenderingContext(e) {
    var t = document.createElement("canvas");return t.width = 1, t.height = 1, createWebGLRenderingContextFromCanvas(t, e);
  }function createWebGLRenderingContextFromCanvas(e, t) {
    var n,
        r = ENV.get("WEBGL_VERSION");if (2 === r ? n = e.getContext("webgl2", t) : 1 === r && (n = e.getContext("webgl", t) || e.getContext("experimental-webgl", t)), 0 === r || null == n) throw new Error("This browser does not support WebGL.");return n;
  }function callAndCheck(e, t) {
    var n = t();return checkWebGLError(e), n;
  }var webGLDebugErrorCheckingEnabled = !1;function enableDebugWebGLErrorChecking(e) {
    webGLDebugErrorCheckingEnabled = e;
  }function checkWebGLError(e) {
    if (webGLDebugErrorCheckingEnabled) {
      var t = e.getError();if (t !== e.NO_ERROR) throw new Error("WebGL Error: " + getWebGLErrorMessage(e, t));
    }
  }function getWebGLErrorMessage(e, t) {
    switch (t) {case e.NO_ERROR:
        return "NO_ERROR";case e.INVALID_ENUM:
        return "INVALID_ENUM";case e.INVALID_VALUE:
        return "INVALID_VALUE";case e.INVALID_OPERATION:
        return "INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:
        return "INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:
        return "OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:
        return "CONTEXT_LOST_WEBGL";default:
        return "Unknown error code " + t;}
  }function getExtensionOrThrow(e, t) {
    return throwIfNull(e, function () {
      return e.getExtension(t);
    }, 'Extension "' + t + '" not supported on this browser.');
  }function createVertexShader(e, t) {
    var n = throwIfNull(e, function () {
      return e.createShader(e.VERTEX_SHADER);
    }, "Unable to create vertex WebGLShader.");if (callAndCheck(e, function () {
      return e.shaderSource(n, t);
    }), callAndCheck(e, function () {
      return e.compileShader(n);
    }), !1 === e.getShaderParameter(n, e.COMPILE_STATUS)) throw console.log(e.getShaderInfoLog(n)), new Error("Failed to compile vertex shader.");return n;
  }function createFragmentShader(e, t) {
    var n = throwIfNull(e, function () {
      return e.createShader(e.FRAGMENT_SHADER);
    }, "Unable to create fragment WebGLShader.");if (callAndCheck(e, function () {
      return e.shaderSource(n, t);
    }), callAndCheck(e, function () {
      return e.compileShader(n);
    }), !1 === e.getShaderParameter(n, e.COMPILE_STATUS)) throw logShaderSourceAndInfoLog(t, e.getShaderInfoLog(n)), new Error("Failed to compile fragment shader.");return n;
  }var lineNumberRegex = /ERROR: [0-9]+:([0-9]+):/g;function logShaderSourceAndInfoLog(e, t) {
    var n = lineNumberRegex.exec(t);if (null == n) return console.log("Couldn't parse line number in error: " + t), void console.log(e);for (var r = +n[1], o = e.split("\n"), a = o.length.toString().length + 2, i = o.map(function (e, t) {
      return rightPad((t + 1).toString(), a) + e;
    }), s = 0, u = 0; u < i.length; u++) s = Math.max(i[u].length, s);var l = i.slice(0, r - 1),
        c = i.slice(r - 1, r),
        d = i.slice(r);console.log(l.join("\n")), console.log(t.split("\n")[0]), console.log("%c " + rightPad(c[0], s), "border:1px solid red; background-color:#e3d2d2; color:#a61717"), console.log(d.join("\n"));
  }function createProgram(e) {
    return throwIfNull(e, function () {
      return e.createProgram();
    }, "Unable to create WebGLProgram.");
  }function linkProgram(e, t) {
    if (callAndCheck(e, function () {
      return e.linkProgram(t);
    }), !1 === e.getProgramParameter(t, e.LINK_STATUS)) throw console.log(e.getProgramInfoLog(t)), new Error("Failed to link vertex and fragment shaders.");
  }function validateProgram(e, t) {
    if (callAndCheck(e, function () {
      return e.validateProgram(t);
    }), !1 === e.getProgramParameter(t, e.VALIDATE_STATUS)) throw console.log(e.getProgramInfoLog(t)), new Error("Shader program validation failed.");
  }function createStaticVertexBuffer(e, t) {
    var n = throwIfNull(e, function () {
      return e.createBuffer();
    }, "Unable to create WebGLBuffer");return callAndCheck(e, function () {
      return e.bindBuffer(e.ARRAY_BUFFER, n);
    }), callAndCheck(e, function () {
      return e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW);
    }), n;
  }function createStaticIndexBuffer(e, t) {
    var n = throwIfNull(e, function () {
      return e.createBuffer();
    }, "Unable to create WebGLBuffer");return callAndCheck(e, function () {
      return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, n);
    }), callAndCheck(e, function () {
      return e.bufferData(e.ELEMENT_ARRAY_BUFFER, t, e.STATIC_DRAW);
    }), n;
  }function queryMaxTextureSize(e) {
    return null != MAX_TEXTURE_SIZE ? MAX_TEXTURE_SIZE : MAX_TEXTURE_SIZE = callAndCheck(e, function () {
      return e.getParameter(e.MAX_TEXTURE_SIZE);
    });
  }function getNumChannels() {
    return 2 === ENV.get("WEBGL_VERSION") ? 1 : 4;
  }function createTexture(e) {
    return throwIfNull(e, function () {
      return e.createTexture();
    }, "Unable to create WebGLTexture.");
  }function validateTextureSize(e, t, n) {
    var r = queryMaxTextureSize(e);if (t <= 0 || n <= 0) {
      var o = "[" + t + "x" + n + "]";throw new Error("Requested texture size " + o + " is invalid.");
    }if (t > r || n > r) {
      o = "[" + t + "x" + n + "]";throw new Error("Requested texture size " + o + " greater than WebGL maximum on this browser / GPU " + ("[" + r + "x" + r + "]") + ".");
    }
  }function createFramebuffer(e) {
    return throwIfNull(e, function () {
      return e.createFramebuffer();
    }, "Unable to create WebGLFramebuffer.");
  }function bindVertexBufferToProgramAttribute(e, t, n, r, o, a, i) {
    var s = e.getAttribLocation(t, n);return -1 !== s && (callAndCheck(e, function () {
      return e.bindBuffer(e.ARRAY_BUFFER, r);
    }), callAndCheck(e, function () {
      return e.vertexAttribPointer(s, o, e.FLOAT, !1, a, i);
    }), callAndCheck(e, function () {
      return e.enableVertexAttribArray(s);
    }), !0);
  }function bindTextureUnit(e, t, n) {
    validateTextureUnit(e, n), callAndCheck(e, function () {
      return e.activeTexture(e.TEXTURE0 + n);
    }), callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, t);
    });
  }function unbindTextureUnit(e, t) {
    validateTextureUnit(e, t), callAndCheck(e, function () {
      return e.activeTexture(e.TEXTURE0 + t);
    }), callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, null);
    });
  }function getProgramUniformLocationOrThrow(e, t, n) {
    return throwIfNull(e, function () {
      return e.getUniformLocation(t, n);
    }, 'uniform "' + n + '" not present in program.');
  }function getProgramUniformLocation(e, t, n) {
    return e.getUniformLocation(t, n);
  }function bindTextureToProgramUniformSampler(e, t, n, r, o) {
    callAndCheck(e, function () {
      return bindTextureUnit(e, n, o);
    }), callAndCheck(e, function () {
      return e.uniform1i(r, o);
    });
  }function bindCanvasToFramebuffer(e) {
    callAndCheck(e, function () {
      return e.bindFramebuffer(e.FRAMEBUFFER, null);
    }), callAndCheck(e, function () {
      return e.viewport(0, 0, e.canvas.width, e.canvas.height);
    }), callAndCheck(e, function () {
      return e.scissor(0, 0, e.canvas.width, e.canvas.height);
    });
  }function bindColorTextureToFramebuffer(e, t, n) {
    callAndCheck(e, function () {
      return e.bindFramebuffer(e.FRAMEBUFFER, n);
    }), callAndCheck(e, function () {
      return e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
    });
  }function unbindColorTextureFromFramebuffer(e, t) {
    callAndCheck(e, function () {
      return e.bindFramebuffer(e.FRAMEBUFFER, t);
    }), callAndCheck(e, function () {
      return e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, null, 0);
    });
  }function validateFramebuffer(e) {
    var t = e.checkFramebufferStatus(e.FRAMEBUFFER);if (t !== e.FRAMEBUFFER_COMPLETE) throw new Error("Error binding framebuffer: " + getFramebufferErrorMessage(e, t));
  }function getFramebufferErrorMessage(e, t) {
    switch (t) {case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
        return "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        return "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
        return "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:
        return "FRAMEBUFFER_UNSUPPORTED";default:
        return "unknown error " + t;}
  }function throwIfNull(e, t, n) {
    var r = callAndCheck(e, function () {
      return t();
    });if (null == r) throw new Error(n);return r;
  }function validateTextureUnit(e, t) {
    var n = e.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1,
        r = t + e.TEXTURE0;if (r < e.TEXTURE0 || r > n) throw new Error("textureUnit must be in " + ("[gl.TEXTURE0, gl.TEXTURE" + n + "]") + ".");
  }function getTextureShapeFromLogicalShape(e, t) {
    2 !== t.length && (t = squeezeShape(t).newShape);var n = queryMaxTextureSize(e),
        r = sizeFromShape(t);return t.length <= 1 && r <= n ? [r, 1] : 2 === t.length && t[0] <= n && t[1] <= n ? t : 3 === t.length && t[0] <= n && t[1] * t[2] <= n ? [t[0], t[1] * t[2]] : 4 === t.length && t[0] <= n && t[1] * t[2] * t[3] <= n ? [t[0], t[1] * t[2] * t[3]] : sizeToSquarishShape(r);
  }var webgl_util = Object.freeze({ createWebGLRenderingContext: createWebGLRenderingContext, createWebGLRenderingContextFromCanvas: createWebGLRenderingContextFromCanvas, callAndCheck: callAndCheck, enableDebugWebGLErrorChecking: enableDebugWebGLErrorChecking, checkWebGLError: checkWebGLError, getWebGLErrorMessage: getWebGLErrorMessage, getExtensionOrThrow: getExtensionOrThrow, createVertexShader: createVertexShader, createFragmentShader: createFragmentShader, createProgram: createProgram, linkProgram: linkProgram, validateProgram: validateProgram, createStaticVertexBuffer: createStaticVertexBuffer, createStaticIndexBuffer: createStaticIndexBuffer, queryMaxTextureSize: queryMaxTextureSize, getNumChannels: getNumChannels, createTexture: createTexture, validateTextureSize: validateTextureSize, createFramebuffer: createFramebuffer, bindVertexBufferToProgramAttribute: bindVertexBufferToProgramAttribute, bindTextureUnit: bindTextureUnit, unbindTextureUnit: unbindTextureUnit, getProgramUniformLocationOrThrow: getProgramUniformLocationOrThrow, getProgramUniformLocation: getProgramUniformLocation, bindTextureToProgramUniformSampler: bindTextureToProgramUniformSampler, bindCanvasToFramebuffer: bindCanvasToFramebuffer, bindColorTextureToFramebuffer: bindColorTextureToFramebuffer, unbindColorTextureFromFramebuffer: unbindColorTextureFromFramebuffer, validateFramebuffer: validateFramebuffer, getFramebufferErrorMessage: getFramebufferErrorMessage, getTextureShapeFromLogicalShape: getTextureShapeFromLogicalShape });function getWebGLContextAttributes() {
    return { alpha: !1, antialias: !1, premultipliedAlpha: !1, preserveDrawingBuffer: !1, depth: !1, stencil: !1, failIfMajorPerformanceCaveat: !0 };
  }function createWebGLContext(e) {
    var t,
        n = getWebGLContextAttributes();return callAndCheck(t = null != e ? createWebGLRenderingContextFromCanvas(e, n) : createWebGLRenderingContext(n), function () {
      return t.disable(t.DEPTH_TEST);
    }), callAndCheck(t, function () {
      return t.disable(t.STENCIL_TEST);
    }), callAndCheck(t, function () {
      return t.disable(t.BLEND);
    }), callAndCheck(t, function () {
      return t.disable(t.DITHER);
    }), callAndCheck(t, function () {
      return t.disable(t.POLYGON_OFFSET_FILL);
    }), callAndCheck(t, function () {
      return t.disable(t.SAMPLE_COVERAGE);
    }), callAndCheck(t, function () {
      return t.enable(t.SCISSOR_TEST);
    }), callAndCheck(t, function () {
      return t.enable(t.CULL_FACE);
    }), callAndCheck(t, function () {
      return t.cullFace(t.BACK);
    }), t;
  }function createVertexShader$1(e) {
    return createVertexShader(e, "\n    precision highp float;\n    attribute vec3 clipSpacePos;\n    attribute vec2 uv;\n    varying vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }");
  }function createVertexBuffer(e) {
    return createStaticVertexBuffer(e, new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]));
  }function createIndexBuffer(e) {
    return createStaticIndexBuffer(e, new Uint16Array([0, 1, 2, 2, 1, 3]));
  }function getTextureConfig(e, t) {
    var n,
        r,
        o,
        a,
        i,
        s,
        u,
        l = e;return 2 === ENV.get("WEBGL_VERSION") ? (n = l.R32F, r = l.R16F, o = l.RGBA32F, a = l.RED, i = 4, s = 1, u = l.HALF_FLOAT) : (n = e.RGBA, r = e.RGBA, o = l.RGBA, a = e.RGBA, i = 4, s = 4, u = null != t ? t.HALF_FLOAT_OES : null), { internalFormatFloat: n, internalFormatHalfFloat: r, internalFormatPackedFloat: o, textureFormatFloat: a, downloadTextureFormat: e.RGBA, downloadUnpackNumChannels: i, defaultNumChannels: s, textureTypeHalfFloat: u };
  }function createAndConfigureTexture(e, t, n, r, o, a) {
    validateTextureSize(e, t, n);var i = createTexture(e),
        s = e.TEXTURE_2D;return callAndCheck(e, function () {
      return e.bindTexture(s, i);
    }), callAndCheck(e, function () {
      return e.texParameteri(s, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
    }), callAndCheck(e, function () {
      return e.texParameteri(s, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    }), callAndCheck(e, function () {
      return e.texParameteri(s, e.TEXTURE_MIN_FILTER, e.NEAREST);
    }), callAndCheck(e, function () {
      return e.texParameteri(s, e.TEXTURE_MAG_FILTER, e.NEAREST);
    }), callAndCheck(e, function () {
      return e.texImage2D(s, 0, r, t, n, 0, o, a, null);
    }), callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, null);
    }), i;
  }function createFloat32MatrixTexture(e, t, n, r) {
    var o = getUnpackedMatrixTextureShapeWidthHeight(t, n);return createAndConfigureTexture(e, o[0], o[1], r.internalFormatFloat, r.textureFormatFloat, e.FLOAT);
  }function createFloat16MatrixTexture(e, t, n, r) {
    var o = getUnpackedMatrixTextureShapeWidthHeight(t, n);return createAndConfigureTexture(e, o[0], o[1], r.internalFormatFloat, r.textureFormatFloat, r.textureTypeHalfFloat);
  }function createUnsignedBytesMatrixTexture(e, t, n, r) {
    var o = getUnpackedMatrixTextureShapeWidthHeight(t, n);return createAndConfigureTexture(e, o[0], o[1], e.RGBA, e.RGBA, e.UNSIGNED_BYTE);
  }function createPackedMatrixTexture(e, t, n, r) {
    var o = getPackedMatrixTextureShapeWidthHeight(t, n);return createAndConfigureTexture(e, o[0], o[1], r.internalFormatPackedFloat, e.RGBA, e.FLOAT);
  }function bindVertexProgramAttributeStreams(e, t, n) {
    return callAndCheck(e, function () {
      return e.bindBuffer(e.ARRAY_BUFFER, n);
    }), bindVertexBufferToProgramAttribute(e, t, "clipSpacePos", n, 3, 20, 0) && bindVertexBufferToProgramAttribute(e, t, "uv", n, 2, 20, 12);
  }function uploadPixelDataToTexture(e, t, n) {
    callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, t);
    }), callAndCheck(e, function () {
      return e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n);
    }), callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, null);
    });
  }function uploadDataToTexture(e, t, n, r, o, a) {
    validateTextureSize(e, n, r), callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, t);
    }), callAndCheck(e, function () {
      return e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, n, r, a, e.FLOAT, o);
    }), callAndCheck(e, function () {
      return e.bindTexture(e.TEXTURE_2D, null);
    });
  }function uploadMatrixToTexture(e, t, n, r, o, a, i) {
    var s,
        u = getUnpackedMatrixTextureShapeWidthHeight(n, r),
        l = u[0],
        c = u[1];1 === i.defaultNumChannels ? s = o : encodeMatrixToUnpackedArray(o, s = new Float32Array(getUnpackedArraySizeFromMatrixSize(o.length, a)), a), uploadDataToTexture(e, t, l, c, s, i.textureFormatFloat);
  }function uploadMatrixToPackedTexture(e, t, n, r, o, a) {
    var i = getPackedMatrixTextureShapeWidthHeight(n, r),
        s = i[0],
        u = i[1],
        l = new Float32Array(getPackedRGBAArraySizeFromMatrixShape(n, r));encodeMatrixToPackedRGBA(o, n, r, l), uploadDataToTexture(e, t, s, u, l, e.RGBA);
  }function downloadMatrixFromOutputTextureAsync(e, t, n, r, o) {
    return __awaiter(this, void 0, void 0, function () {
      var a, i, s, u, l;return __generator(this, function (c) {
        switch (c.label) {case 0:
            return a = e, i = new Float32Array(getUnpackedArraySizeFromMatrixSize(n * r, o.downloadUnpackNumChannels)), s = i instanceof Float32Array ? 4 * i.length : i, u = e.createBuffer(), callAndCheck(e, function () {
              return e.bindBuffer(a.PIXEL_PACK_BUFFER, u);
            }), callAndCheck(e, function () {
              return e.bufferData(a.PIXEL_PACK_BUFFER, s, e.STATIC_DRAW);
            }), callAndCheck(e, function () {
              return a.readPixels(0, 0, r, n, e.RGBA, e.FLOAT, 0);
            }), [4, t.getBufferSubDataAsync(a.PIXEL_PACK_BUFFER, 0, i)];case 1:
            return c.sent(), l = new Float32Array(n * r), decodeMatrixFromUnpackedArray(i, l, o.downloadUnpackNumChannels), [2, l];}
      });
    });
  }function downloadFloat32MatrixFromOutputTexture(e, t, n, r) {
    var o = getUnpackedMatrixTextureShapeWidthHeight(t, n),
        a = o[0],
        i = o[1],
        s = new Float32Array(getUnpackedArraySizeFromMatrixSize(t * n, r.downloadUnpackNumChannels));callAndCheck(e, function () {
      return e.readPixels(0, 0, a, i, r.downloadTextureFormat, e.FLOAT, s);
    });var u = new Float32Array(t * n);return decodeMatrixFromUnpackedArray(s, u, r.downloadUnpackNumChannels), u;
  }function downloadByteEncodedFloatMatrixFromOutputTexture(e, t, n, r) {
    var o = getUnpackedMatrixTextureShapeWidthHeight(t, n),
        a = o[0],
        i = o[1],
        s = new Uint8Array(getUnpackedArraySizeFromMatrixSize(t * n, 4));return callAndCheck(e, function () {
      return e.readPixels(0, 0, a, i, r.downloadTextureFormat, e.UNSIGNED_BYTE, s);
    }), new Float32Array(s.buffer);
  }function downloadMatrixFromPackedOutputTexture(e, t, n, r) {
    var o = getPackedMatrixTextureShapeWidthHeight(t, n),
        a = o[0],
        i = o[1],
        s = new Float32Array(getPackedRGBAArraySizeFromMatrixShape(t, n));callAndCheck(e, function () {
      return e.readPixels(0, 0, a, i, e.RGBA, e.FLOAT, s);
    });var u = new Float32Array(t * n);return decodeMatrixFromPackedRGBA(s, t, n, u);
  }var gpgpu_util = Object.freeze({ getWebGLContextAttributes: getWebGLContextAttributes, createWebGLContext: createWebGLContext, createVertexShader: createVertexShader$1, createVertexBuffer: createVertexBuffer, createIndexBuffer: createIndexBuffer, getTextureConfig: getTextureConfig, createFloat32MatrixTexture: createFloat32MatrixTexture, createFloat16MatrixTexture: createFloat16MatrixTexture, createUnsignedBytesMatrixTexture: createUnsignedBytesMatrixTexture, createPackedMatrixTexture: createPackedMatrixTexture, bindVertexProgramAttributeStreams: bindVertexProgramAttributeStreams, uploadPixelDataToTexture: uploadPixelDataToTexture, uploadMatrixToTexture: uploadMatrixToTexture, uploadMatrixToPackedTexture: uploadMatrixToPackedTexture, downloadMatrixFromOutputTextureAsync: downloadMatrixFromOutputTextureAsync, downloadFloat32MatrixFromOutputTexture: downloadFloat32MatrixFromOutputTexture, downloadByteEncodedFloatMatrixFromOutputTexture: downloadByteEncodedFloatMatrixFromOutputTexture, downloadMatrixFromPackedOutputTexture: downloadMatrixFromPackedOutputTexture }),
      GPGPUContext = function () {
    function e(e) {
      this.outputTexture = null, this.program = null, this.disposed = !1, this.autoDebugValidate = !1, this.vertexAttrsAreBound = !1, this.itemsToPoll = [], this.gl = null != e ? e : createWebGLContext(), 1 === ENV.get("WEBGL_VERSION") ? (this.textureFloatExtension = getExtensionOrThrow(this.gl, "OES_texture_float"), this.colorBufferFloatExtension = this.gl.getExtension("WEBGL_color_buffer_float"), ENV.get("WEBGL_RENDER_FLOAT32_ENABLED") || (this.textureHalfFloatExtension = getExtensionOrThrow(this.gl, "OES_texture_half_float"), this.colorBufferHalfFloatExtension = this.gl.getExtension("EXT_color_buffer_half_float"))) : this.colorBufferFloatExtension = getExtensionOrThrow(this.gl, "EXT_color_buffer_float"), this.loseContextExtension = getExtensionOrThrow(this.gl, "WEBGL_lose_context"), ENV.get("WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED") && (this.getBufferSubDataAsyncExtension = this.gl.getExtension("WEBGL_get_buffer_sub_data_async")), this.vertexBuffer = createVertexBuffer(this.gl), this.indexBuffer = createIndexBuffer(this.gl), this.framebuffer = createFramebuffer(this.gl), this.textureConfig = getTextureConfig(this.gl, this.textureHalfFloatExtension);
    }return e.prototype.dispose = function () {
      var e = this;if (!this.disposed) {
        null != this.program && console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."), null != this.outputTexture && console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var t = this.gl;callAndCheck(t, function () {
          return t.finish();
        }), callAndCheck(t, function () {
          return t.bindFramebuffer(t.FRAMEBUFFER, null);
        }), callAndCheck(t, function () {
          return t.deleteFramebuffer(e.framebuffer);
        }), callAndCheck(t, function () {
          return t.bindBuffer(t.ARRAY_BUFFER, null);
        }), callAndCheck(t, function () {
          return t.deleteBuffer(e.vertexBuffer);
        }), callAndCheck(t, function () {
          return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
        }), callAndCheck(t, function () {
          return t.deleteBuffer(e.indexBuffer);
        }), this.loseContextExtension.loseContext(), this.disposed = !0;
      }
    }, e.prototype.enableAutomaticDebugValidation = function (e) {
      this.autoDebugValidate = e, enableDebugWebGLErrorChecking(e);
    }, e.prototype.createFloat32MatrixTexture = function (e, t) {
      return this.throwIfDisposed(), createFloat32MatrixTexture(this.gl, e, t, this.textureConfig);
    }, e.prototype.createFloat16MatrixTexture = function (e, t) {
      return this.throwIfDisposed(), createFloat16MatrixTexture(this.gl, e, t, this.textureConfig);
    }, e.prototype.createUnsignedBytesMatrixTexture = function (e, t) {
      return this.throwIfDisposed(), createUnsignedBytesMatrixTexture(this.gl, e, t, this.textureConfig);
    }, e.prototype.uploadPixelDataToTexture = function (e, t) {
      this.throwIfDisposed(), uploadPixelDataToTexture(this.gl, e, t);
    }, e.prototype.createPackedMatrixTexture = function (e, t) {
      return this.throwIfDisposed(), createPackedMatrixTexture(this.gl, e, t, this.textureConfig);
    }, e.prototype.deleteMatrixTexture = function (e) {
      var t = this;this.throwIfDisposed(), this.outputTexture === e && (unbindColorTextureFromFramebuffer(this.gl, this.framebuffer), this.outputTexture = null), callAndCheck(this.gl, function () {
        return t.gl.deleteTexture(e);
      });
    }, e.prototype.uploadMatrixToTexture = function (e, t, n, r) {
      this.throwIfDisposed();var o = getNumChannels();return uploadMatrixToTexture(this.gl, e, t, n, r, o, this.textureConfig);
    }, e.prototype.uploadMatrixToPackedTexture = function (e, t, n, r) {
      return this.throwIfDisposed(), uploadMatrixToPackedTexture(this.gl, e, t, n, r, this.textureConfig);
    }, e.prototype.downloadFloat32MatrixFromOutputTexture = function (e, t, n) {
      var r = this;return this.downloadMatrixDriver(e, function () {
        return downloadFloat32MatrixFromOutputTexture(r.gl, t, n, r.textureConfig);
      });
    }, e.prototype.downloadByteEncodedFloatMatrixFromOutputTexture = function (e, t, n) {
      var r = this;return this.downloadMatrixDriver(e, function () {
        return downloadByteEncodedFloatMatrixFromOutputTexture(r.gl, t, n, r.textureConfig);
      });
    }, e.prototype.downloadMatrixFromTextureAsync = function (e, t, n) {
      return __awaiter(this, void 0, void 0, function () {
        var r = this;return __generator(this, function (o) {
          if (null == this.getBufferSubDataAsyncExtension) throw new Error("Cannot download matrix from output texture asynchronously, WEBGL_get_buffer_sub_data_async is not enabled.");return [2, this.downloadMatrixDriverAsync(e, function () {
            return downloadMatrixFromOutputTextureAsync(r.gl, r.getBufferSubDataAsyncExtension, t, n, r.textureConfig);
          })];
        });
      });
    }, e.prototype.downloadMatrixFromPackedTexture = function (e, t, n) {
      var r = this;return this.downloadMatrixDriver(e, function () {
        return downloadMatrixFromPackedOutputTexture(r.gl, t, n, r.textureConfig);
      });
    }, e.prototype.createProgram = function (e) {
      this.throwIfDisposed();var t = this.gl,
          n = createFragmentShader(t, e),
          r = createVertexShader$1(t),
          o = createProgram(t);return callAndCheck(t, function () {
        return t.attachShader(o, r);
      }), callAndCheck(t, function () {
        return t.attachShader(o, n);
      }), linkProgram(t, o), this.autoDebugValidate && validateProgram(t, o), this.vertexAttrsAreBound || (this.setProgram(o), this.vertexAttrsAreBound = bindVertexProgramAttributeStreams(t, this.program, this.vertexBuffer)), o;
    }, e.prototype.deleteProgram = function (e) {
      var t = this;this.throwIfDisposed(), e === this.program && (this.program = null), null != e && callAndCheck(this.gl, function () {
        return t.gl.deleteProgram(e);
      });
    }, e.prototype.setProgram = function (e) {
      var t = this;this.throwIfDisposed(), this.program = e, null != this.program && this.autoDebugValidate && validateProgram(this.gl, this.program), callAndCheck(this.gl, function () {
        return t.gl.useProgram(e);
      });
    }, e.prototype.getUniformLocation = function (e, t, n) {
      return void 0 === n && (n = !0), this.throwIfDisposed(), n ? getProgramUniformLocationOrThrow(this.gl, e, t) : getProgramUniformLocation(this.gl, e, t);
    }, e.prototype.getAttributeLocation = function (e, t) {
      var n = this;return this.throwIfDisposed(), callAndCheck(this.gl, function () {
        return n.gl.getAttribLocation(e, t);
      });
    }, e.prototype.getUniformLocationNoThrow = function (e, t) {
      return this.throwIfDisposed(), this.gl.getUniformLocation(e, t);
    }, e.prototype.setInputMatrixTexture = function (e, t, n) {
      this.throwIfDisposed(), this.throwIfNoProgram(), bindTextureToProgramUniformSampler(this.gl, this.program, e, t, n);
    }, e.prototype.setOutputMatrixTexture = function (e, t, n) {
      this.setOutputMatrixTextureDriver(e, n, t);
    }, e.prototype.setOutputPackedMatrixTexture = function (e, t, n) {
      this.throwIfDisposed();var r = getPackedMatrixTextureShapeWidthHeight(t, n),
          o = r[0],
          a = r[1];this.setOutputMatrixTextureDriver(e, o, a);
    }, e.prototype.setOutputMatrixWriteRegion = function (e, t, n, r) {
      this.setOutputMatrixWriteRegionDriver(n, e, r, t);
    }, e.prototype.setOutputPackedMatrixWriteRegion = function (e, t, n, r) {
      throw new Error("setOutputPackedMatrixWriteRegion not implemented.");
    }, e.prototype.debugValidate = function () {
      null != this.program && validateProgram(this.gl, this.program), validateFramebuffer(this.gl);
    }, e.prototype.executeProgram = function () {
      this.throwIfDisposed(), this.throwIfNoProgram();var e = this.gl;this.autoDebugValidate && this.debugValidate(), callAndCheck(e, function () {
        return e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0);
      });
    }, e.prototype.blockUntilAllProgramsCompleted = function () {
      var e = this;this.throwIfDisposed(), callAndCheck(this.gl, function () {
        return e.gl.finish();
      });
    }, e.prototype.getQueryTimerExtension = function () {
      return null == this.disjointQueryTimerExtension && (this.disjointQueryTimerExtension = getExtensionOrThrow(this.gl, 2 === ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") ? "EXT_disjoint_timer_query_webgl2" : "EXT_disjoint_timer_query")), this.disjointQueryTimerExtension;
    }, e.prototype.getQueryTimerExtensionWebGL2 = function () {
      return this.getQueryTimerExtension();
    }, e.prototype.getQueryTimerExtensionWebGL1 = function () {
      return this.getQueryTimerExtension();
    }, e.prototype.runQuery = function (e) {
      var t = this.beginQuery();return e(), this.endQuery(), this.pollQueryTime(t);
    }, e.prototype.beginQuery = function () {
      if (2 === ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")) {
        var e = this.gl,
            t = this.getQueryTimerExtensionWebGL2(),
            n = e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT, n), n;
      }var r = this.getQueryTimerExtensionWebGL1(),
          o = r.createQueryEXT();return r.beginQueryEXT(r.TIME_ELAPSED_EXT, o), o;
    }, e.prototype.endQuery = function () {
      if (2 !== ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")) {
        var e = this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT);
      } else {
        var t = this.gl,
            n = this.getQueryTimerExtensionWebGL2();t.endQuery(n.TIME_ELAPSED_EXT);
      }
    }, e.prototype.isQueryAvailable = function (e, t) {
      if (0 === t) return !0;if (2 === t) {
        var n = this.gl,
            r = this.getQueryTimerExtensionWebGL2(),
            o = n.getQueryParameter(e, n.QUERY_RESULT_AVAILABLE);return null == this.disjoint && (this.disjoint = this.gl.getParameter(r.GPU_DISJOINT_EXT)), o && !this.disjoint;
      }o = (r = this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(e, r.QUERY_RESULT_AVAILABLE_EXT);return null == this.disjoint && (this.disjoint = this.gl.getParameter(r.GPU_DISJOINT_EXT)), o && !this.disjoint;
    }, e.prototype.pollQueryTime = function (e) {
      var t = this;return new Promise(function (n) {
        var r = ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION");t.addItemToPoll(function () {
          return t.isQueryAvailable(e, r);
        }, function () {
          return n(t.getQueryTime(e, r));
        });
      });
    }, e.prototype.pollItems = function () {
      for (var e = binSearchLastTrue(this.itemsToPoll.map(function (e) {
        return e.isDoneFn;
      })), t = 0; t <= e; ++t) {
        (0, this.itemsToPoll[t].resolveFn)();
      }this.itemsToPoll = this.itemsToPoll.slice(e + 1);
    }, e.prototype.addItemToPoll = function (e, t) {
      var n = this;this.itemsToPoll.push({ isDoneFn: e, resolveFn: t }), this.itemsToPoll.length > 1 || repeatedTry(function () {
        return n.pollItems(), 0 === n.itemsToPoll.length;
      });
    }, e.prototype.getQueryTime = function (e, t) {
      if (0 === t) return null;if (2 === t) {
        var n = this.gl;return n.getQueryParameter(e, n.QUERY_RESULT) / 1e6;
      }var r = this.getQueryTimerExtensionWebGL1();return r.getQueryObjectEXT(e, r.QUERY_RESULT_EXT) / 1e6;
    }, e.prototype.downloadMatrixDriverSetup = function (e) {
      this.throwIfDisposed(), bindColorTextureToFramebuffer(this.gl, e, this.framebuffer), this.autoDebugValidate && validateFramebuffer(this.gl);
    }, e.prototype.downloadMatrixDriverTeardown = function () {
      null != this.outputTexture ? (bindColorTextureToFramebuffer(this.gl, this.outputTexture, this.framebuffer), this.autoDebugValidate && validateFramebuffer(this.gl)) : unbindColorTextureFromFramebuffer(this.gl, this.framebuffer);
    }, e.prototype.downloadMatrixDriver = function (e, t) {
      this.downloadMatrixDriverSetup(e);var n = t();return this.downloadMatrixDriverTeardown(), n;
    }, e.prototype.downloadMatrixDriverAsync = function (e, t) {
      return __awaiter(this, void 0, void 0, function () {
        var n;return __generator(this, function (r) {
          switch (r.label) {case 0:
              return this.downloadMatrixDriverSetup(e), [4, t()];case 1:
              return n = r.sent(), this.downloadMatrixDriverTeardown(), [2, n];}
        });
      });
    }, e.prototype.setOutputMatrixTextureDriver = function (e, t, n) {
      this.throwIfDisposed();var r = this.gl;bindColorTextureToFramebuffer(r, e, this.framebuffer), this.autoDebugValidate && validateFramebuffer(r), this.outputTexture = e, callAndCheck(r, function () {
        return r.viewport(0, 0, t, n);
      }), callAndCheck(r, function () {
        return r.scissor(0, 0, t, n);
      });
    }, e.prototype.setOutputMatrixWriteRegionDriver = function (e, t, n, r) {
      var o = this;this.throwIfDisposed(), callAndCheck(this.gl, function () {
        return o.gl.scissor(e, t, n, r);
      });
    }, e.prototype.throwIfDisposed = function () {
      if (this.disposed) throw new Error("Attempted to use disposed GPGPUContext.");
    }, e.prototype.throwIfNoProgram = function () {
      if (null == this.program) throw new Error("No GPU program is currently set.");
    }, e;
  }();function binSearchLastTrue(e) {
    for (var t = 0, n = e.length - 1, r = -1; t <= n;) {
      var o = t + n >> 1;e[o]() ? (r = o, t = o + 1) : n = o - 1;
    }return r;
  }function compileProgram(e, t, n, r) {
    for (var o = t.userCode, a = n.map(function (e, n) {
      var r = { logicalShape: e.tensor.shape, texShape: e.isUniform ? null : e.texData.texShape, isUniform: e.isUniform };return { name: t.variableNames[n], shapeInfo: r };
    }), i = a.map(function (e) {
      return e.shapeInfo;
    }), s = { logicalShape: r.tensor.shape, texShape: r.texData.texShape, isUniform: !1 }, u = makeShader(a, s, o, !0 === t.supportsBroadcasting), l = e.createProgram(u), c = {}, d = 0; d < t.variableNames.length; d++) {
      var p = t.variableNames[d];c[p] = e.getUniformLocation(l, p, !1);
    }return { program: t, source: u, webGLProgram: l, uniformLocations: c, gpgpu: e, inShapeInfos: i, outShapeInfo: s };
  }function validateBinaryAndProgram(e, t) {
    if (e.length !== t.length) throw Error("Binary was compiled with " + e.length + " inputs, but was executed with " + t.length + " inputs");e.forEach(function (e, n) {
      var r = e.logicalShape,
          o = t[n],
          a = o.tensor.shape;if (!arraysEqual(r, a)) throw Error("Binary was compiled with different shapes than the current args. Shapes " + r + " and " + a + " must match");if (!e.isUniform || !o.isUniform) {
        var i = e.texShape,
            s = o.isUniform ? null : o.texData.texShape;if (!arraysEqual(i, s)) throw Error("Binary was compiled with different texture shapes than the current args. Shape " + i + " and " + s + " must match");
      }
    });
  }function runProgram(e, t, n, r) {
    validateBinaryAndProgram(e.inShapeInfos, t), validateBinaryAndProgram([e.outShapeInfo], [n]);var o = n.texData.texture,
        a = n.texData.texShape,
        i = e.gpgpu;i.setOutputMatrixTexture(o, a[0], a[1]), i.setProgram(e.webGLProgram), t.forEach(function (t, n) {
      var r = e.program.variableNames[n],
          o = e.uniformLocations[r];if (null != o) {
        if (t.isUniform) {
          if (1 === t.tensor.size) i.gl.uniform1f(o, t.tensor.dataSync()[0]);else {
            var a = t.tensor.dataSync();a instanceof Float32Array || (a = new Float32Array(a)), i.gl.uniform1fv(o, a);
          }return;
        }var s = t.texData.texture;i.setInputMatrixTexture(s, o, n);
      }
    }), null != r && r(i, e.webGLProgram), i.executeProgram();
  }function makeShaderKey(e, t, n) {
    var r = "";t.concat(n).forEach(function (e) {
      r += e.tensor.shape + "_" + (e.isUniform ? "uniform" : e.texData.texShape);
    });var o = e.userCode,
        a = (!0 === e.supportsBroadcasting).toString(),
        i = e.constructor.name;return i += "_" + a + "_" + r + "_" + o;
  }var WhereProgram = function () {
    return function (e, t, n) {
      var r, o;if (this.variableNames = ["c", "a", "b"], this.outputShape = t, n > 4) throw Error("Where for rank " + n + " is not yet supported");if (1 === n) o = "resRC", r = "resRC";else {
        for (var a = ["resRC.x", "resRC.y", "resRC.z", "resRC.w"], i = [], s = [], u = 0; u < t.length; u++) s.push("" + a[u]), u < e && i.push("" + a[u]);r = i.join(), o = s.join();
      }var l = getCoordsDataType(n);this.userCode = "\n      void main() {\n        " + l + " resRC = getOutputCoords();\n        float cVal = getC(" + r + ");\n        if (cVal >= 1.0) {\n          setOutput(getA(" + o + "));\n        } else {\n          setOutput(getB(" + o + "));\n        }\n      }\n    ";
    };
  }(),
      LRNProgram = function () {
    return function (e, t, n, r, o) {
      this.variableNames = ["x"], this.outputShape = [];var a,
          i = t,
          s = e[3] - 1;this.outputShape = e;var u = "float(" + n + ") + float(" + r + ") * sum";a = .5 === o ? "inversesqrt(" + u + ")" : 1 === o ? "1.0/(" + u + ")" : "exp(log(" + u + ") * float(-" + o + "));", this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n        int d = coords[3];\n        float x = getX(b, r, c, d);\n        float sum = 0.0;\n        for (int j = -" + i + "; j <= " + i + "; j++) {\n          int idx = d + j;\n          if (idx >= 0 && idx <=  " + s + ") {\n            float z = getX(b, r, c, idx);\n            sum += z * z;\n          }\n        }\n        float val = x * " + a + ";\n        setOutput(val);\n      }\n    ";
    };
  }(),
      MaxPool2DBackpropProgram = function () {
    return function (e) {
      this.variableNames = ["dy", "maxPos"], this.outputShape = e.inShape;var t = e.filterHeight,
          n = e.filterWidth,
          r = e.strideHeight,
          o = e.strideWidth,
          a = t - 1 - e.padInfo.top,
          i = n - 1 - e.padInfo.left,
          s = t * n - 1;this.userCode = "\n      const ivec2 pads = ivec2(" + a + ", " + i + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + r + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + n + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + o + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n            int maxPosValue = " + s + " - int(getMaxPos(b, idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * " + n + " + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    };
  }(),
      MatMulProgram = function () {
    return function (e, t, n, r) {
      void 0 === n && (n = !1), void 0 === r && (r = !1), this.variableNames = ["matrixA", "matrixB"];var o = n ? e[1] : e[0],
          a = r ? t[0] : t[1],
          i = n ? e[0] : e[1];this.outputShape = [o, a];var s = function (e, t) {
        return n ? t + " + " + e + ", aRow" : "aRow, " + t + " + " + e;
      },
          u = function (e, t) {
        return r ? "bCol, " + t + " + " + e : t + " + " + e + ", bCol";
      },
          l = 4 * Math.floor(i / 4),
          c = i % 4;this.userCode = " float dotARowBCol(int aRow, int bCol) {\n      float result = 0.0;\n      for (int i = 0; i < " + l + "; i += 4) {\n        vec4 a = vec4(\n          getMatrixA(" + s(0, "i") + "),\n          getMatrixA(" + s(1, "i") + "),\n          getMatrixA(" + s(2, "i") + "),\n          getMatrixA(" + s(3, "i") + ")\n        );\n        vec4 b = vec4(\n          getMatrixB(" + u(0, "i") + "),\n          getMatrixB(" + u(1, "i") + "),\n          getMatrixB(" + u(2, "i") + "),\n          getMatrixB(" + u(3, "i") + ")\n        );\n\n        result += dot(a, b);\n      }\n\n      if (" + (1 === c) + ") {\n        result += getMatrixA(" + s(0, l) + ") *\n          getMatrixB(" + u(0, l) + ");\n      } else if (" + (2 === c) + ") {\n        vec2 a = vec2(\n          getMatrixA(" + s(0, l) + "),\n          getMatrixA(" + s(1, l) + ")\n        );\n        vec2 b = vec2(\n          getMatrixB(" + u(0, l) + "),\n          getMatrixB(" + u(1, l) + ")\n        );\n        result += dot(a, b);\n      } else if (" + (3 === c) + ") {\n        vec3 a = vec3(\n          getMatrixA(" + s(0, l) + "),\n          getMatrixA(" + s(1, l) + "),\n          getMatrixA(" + s(2, l) + ")\n        );\n        vec3 b = vec3(\n          getMatrixB(" + u(0, l) + "),\n          getMatrixB(" + u(1, l) + "),\n          getMatrixB(" + u(2, l) + ")\n        );\n        result += dot(a, b);\n      }\n\n      return result;\n    }\n\n    void main() {\n      ivec2 resRC = getOutputCoords();\n      setOutput(dotARowBCol(resRC.x, resRC.y));\n    }\n    ";
    };
  }(),
      MultinomialProgram = function () {
    function e(e, t, n) {
      this.variableNames = ["probs"], this.outputShape = [e, n], this.userCode = "\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < " + (t - 1) + "; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float(" + (t - 1) + "));\n      }\n    ";
    }return e.prototype.getCustomSetupFunc = function (e) {
      var t = this;return function (n, r) {
        null == t.seedLoc && (t.seedLoc = n.getUniformLocation(r, "seed")), n.gl.uniform1f(t.seedLoc, e);
      };
    }, e;
  }(),
      OneHotProgram = function () {
    return function (e, t, n, r) {
      this.variableNames = ["indices"], this.outputShape = [e, t], this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float(" + r + "), float(" + n + "),\n                      float(index == coords.y)));\n      }\n    ";
    };
  }(),
      PadProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["x"], this.outputShape = t.map(function (t, n) {
        return t[0] + e[n] + t[1];
      });var r = e.length,
          o = getCoordsDataType(r),
          a = t.map(function (e) {
        return e[0];
      }).join(","),
          i = t.map(function (t, n) {
        return t[0] + e[n];
      }).join(","),
          s = ["coords[0]", "coords[1]", "coords[2]", "coords[3]"].slice(0, r);this.userCode = 1 !== r ? "\n      " + o + " start = " + o + "(" + a + ");\n      " + o + " end = " + o + "(" + i + ");\n\n      void main() {\n        " + o + " outC = getOutputCoords();\n        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {\n          setOutput(float(" + n + "));\n        } else {\n          " + o + " coords = outC - start;\n          setOutput(getX(" + s + "));\n        }\n      }\n    " : "\n        int start = " + a + ";\n        int end = " + i + ";\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start || outC >= end) {\n            setOutput(float(" + n + "));\n          } else {\n            setOutput(getX(outC - start));\n          }\n        }\n      ";
    };
  }(),
      Pool2DProgram = function () {
    return function (e, t, n) {
      if (this.variableNames = ["x"], "avg" === t && n) throw new Error("Cannot compute positions for average pool.");var r = e.filterHeight,
          o = e.filterWidth,
          a = e.strideHeight,
          i = e.strideWidth,
          s = e.padInfo.top,
          u = e.padInfo.left;this.outputShape = e.outShape;var l = "avg" === t,
          c = "0.0";if (l || (c = "-1.0 / 0.0"), n) this.userCode = "\n        const ivec2 strides = ivec2(" + a + ", " + i + ");\n        const ivec2 pads = ivec2(" + s + ", " + u + ");\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < " + r + "; wR++) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= " + e.inHeight + ") {\n              continue;\n            }\n\n            for (int wC = 0; wC < " + o + "; wC++) {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= " + e.inWidth + ") {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value >= currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = wR * " + o + " + wC;\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";else {
        var d = t + "(" + t + "(" + t + "(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";"avg" === t && (d = "avgValue / count");var p = 4 * Math.floor(o / 4),
            h = o % 4,
            f = "\n      if (" + l + ") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    ";this.userCode = "\n      const ivec2 strides = ivec2(" + a + ", " + i + ");\n      const ivec2 pads = ivec2(" + s + ", " + u + ");\n      const float initializationValue = " + c + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= " + e.inWidth + ") {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(" + c + ");\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wR = 0; wR < " + r + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + e.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + p + "; wC += 4) {\n            int xC = xCCorner + wC;\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              getValue(batch, xR, xC + 2, d),\n              getValue(batch, xR, xC + 3, d)\n            );\n\n            " + f + "\n          }\n\n          int xC = xCCorner + " + p + ";\n          if (" + (1 === h) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n\n            " + f + "\n          } else if (" + (2 === h) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              initializationValue,\n              initializationValue\n            );\n\n            " + f + "\n          } else if (" + (3 === h) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              getValue(batch, xR, xC + 2, d),\n              initializationValue\n            );\n\n            " + f + "\n          }\n        }\n        setOutput(" + d + ");\n      }\n    ";
      }
    };
  }(),
      ReduceProgram = function () {
    return function (e, t) {
      this.variableNames = ["x"];var n = e.windowSize,
          r = e.batchSize,
          o = e.inSize,
          a = Math.ceil(o / n);this.outputShape = [r, a];var i = "0.0",
          s = "";"min" === t ? (i = "1.0 / 0.0", s = "min") : "max" === t && (i = "-1.0 / 0.0", s = "max");var u = t + "(" + t + "(" + t + "(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";"sum" === t ? u = "sumValue" : "all" === t ? u = "allValue" : "any" === t && (u = "anyValue");var l = 4 * Math.floor(n / 4),
          c = n % 4,
          d = "\n      if (" + ("sum" === t) + ") {\n        sumValue += dot(values, ones);\n      } else {\n        minMaxValue = " + s + "(values, minMaxValue);\n      }\n    ",
          p = "vec4";"all" === t ? (i = "1.0", d = "\n        bool reducedAllValue = all(values);\n        float floatedReducedAllValue = float(reducedAllValue);\n        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);\n      ", p = "bvec4") : "any" === t && (i = "0.0", d = "\n        bool reducedAnyValue = any(values);\n        float floatedReducedAnyValue = float(reducedAnyValue);\n        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);\n      ", p = "bvec4");var h = "";o % n > 0 && (h = "\n        if (inIdx < 0 || inIdx >= " + o + ") {\n          return initializationValue;\n        }\n      "), this.userCode = "\n      const float initializationValue = " + i + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        " + h + "\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + n + ";\n\n        vec4 minMaxValue = vec4(" + i + ");\n        float sumValue = 0.0;\n        float allValue = 1.0;\n        float anyValue = 0.0;\n\n        for (int i = 0; i < " + l + "; i += 4) {\n          int inIdx = inOffset + i;\n          " + p + " values = " + p + "(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          " + d + "\n        }\n\n        int inIdx = inOffset + " + l + ";\n        if (" + (1 === c) + ") {\n          " + p + " values = " + p + "(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          " + d + "\n        } else if (" + (2 === c) + ") {\n          " + p + " values = " + p + "(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          " + d + "\n        } else if (" + (3 === c) + ") {\n          " + p + " values = " + p + "(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          " + d + "\n        }\n        setOutput(" + u + ");\n      }\n    ";
    };
  }(),
      ResizeBilinearBackpropProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["dy"], this.outputShape = [], this.outputShape = t.shape;var r = t.shape,
          o = r[1],
          a = r[2],
          i = e.shape,
          s = i[1],
          u = i[2],
          l = [n && s > 1 ? o - 1 : o, n && u > 1 ? a - 1 : a],
          c = [n && s > 1 ? s - 1 : s, n && u > 1 ? u - 1 : u],
          d = l[0] / c[0],
          p = l[1] / c[1],
          h = 1 / d,
          f = 1 / p,
          g = 2 * Math.ceil(h) + 2,
          m = 2 * Math.ceil(f) + 2;this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(" + d + ");\n        const float widthScale = float(" + p + ");\n\n        const float invHeightScale = float(" + h + ");\n        const float invWidthScale = float(" + f + ");\n\n        const int winHeight = int(" + g + ");\n        const int winWidth = int(" + m + ");\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(startRLerp - float(winHeight / 2));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(startCLerp - float(winWidth / 2));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= " + s + ") {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= " + u + ") {\n              continue;\n            }\n\n            float dxR = float(dyR) * heightScale;\n            int topDxRIndex = int(floor(dxR));\n            int bottomDxRIndex = int(min(ceil(dxR), " + (o - 1) + ".0));\n            float dxRLerp = dxR - float(topDxRIndex);\n            float inverseDxRLerp = 1.0 - dxRLerp;\n\n            float dxC = float(dyC) * widthScale;\n            int leftDxCIndex = int(floor(dxC));\n            int rightDxCIndex = int(min(ceil(dxC), " + (a - 1) + ".0));\n            float dxCLerp = dxC - float(leftDxCIndex);\n            float inverseDxCLerp = 1.0 - dxCLerp;\n\n            if (r == topDxRIndex && c == leftDxCIndex) {\n              // topLeft\n              accumulator +=\n                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;\n            }\n\n            if (r == topDxRIndex && c == rightDxCIndex) {\n              // topRight\n              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == leftDxCIndex) {\n              // bottomLeft\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == rightDxCIndex) {\n              // bottomRight\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    ";
    };
  }(),
      ResizeBilinearProgram = function () {
    return function (e, t, n, r) {
      this.variableNames = ["A"], this.outputShape = [];var o = e[0],
          a = e[1],
          i = e[2],
          s = e[3];this.outputShape = [o, t, n, s];var u = [r && t > 1 ? a - 1 : a, r && n > 1 ? i - 1 : i],
          l = [r && t > 1 ? t - 1 : t, r && n > 1 ? n - 1 : n];this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + u[0] / l[0] + ",\n          " + u[1] / l[1] + ");\n      const vec2 inputShapeRC = vec2(" + a + ".0, " + i + ".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    ";
    };
  }(),
      ResizeNearestNeigborBackpropProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["dy"], this.outputShape = [], this.outputShape = t.shape;var r = t.shape,
          o = r[1],
          a = r[2],
          i = e.shape,
          s = i[1],
          u = i[2],
          l = [n && s > 1 ? o - 1 : o, n && u > 1 ? a - 1 : a],
          c = [n && s > 1 ? s - 1 : s, n && u > 1 ? u - 1 : u],
          d = l[0] / c[0],
          p = l[1] / c[1],
          h = 1 / d,
          f = 1 / p,
          g = 2 * Math.ceil(h) + 2,
          m = 2 * Math.ceil(f) + 2;this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(" + d + ");\n        const float widthScale = float(" + p + ");\n\n        const float invHeightScale = float(" + h + ");\n        const float invWidthScale = float(" + f + ");\n\n        const int winHeight = int(" + g + ");\n        const int winWidth = int(" + m + ");\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(floor(startRLerp - float(winHeight / 2)));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(floor(startCLerp - float(winWidth / 2)));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= " + s + ") {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= " + u + ") {\n              continue;\n            }\n\n            float sourceFracRow =\n              float(" + l[0] + ") *\n                (float(dyR) / float(" + c[0] + "));\n\n            float sourceFracCol =\n                float(" + l[1] + ") *\n                  (float(dyC) / float(" + c[1] + "));\n\n            int sourceNearestRow = int(min(\n                float(int(" + o + ") - 1),\n                " + n + " ? float(round(sourceFracRow)) :\n                                  float(floor(sourceFracRow))));\n\n            int sourceNearestCol = int(min(\n                float(int(" + a + ") - 1),\n                " + n + " ? float(round(sourceFracCol)) :\n                                  float(floor(sourceFracCol))));\n\n            if (r == sourceNearestRow && c == sourceNearestCol) {\n              accumulator += getDy(b, dyR, dyC, d);\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    ";
    };
  }(),
      ResizeNearestNeighborProgram = function () {
    return function (e, t, n, r) {
      this.variableNames = ["A"], this.outputShape = [];var o = e[0],
          a = e[1],
          i = e[2],
          s = e[3];this.outputShape = [o, t, n, s];var u = [r && t > 1 ? a - 1 : a, r && n > 1 ? i - 1 : i],
          l = [r && t > 1 ? t - 1 : t, r && n > 1 ? n - 1 : n],
          c = r ? "0.5" : "0.0";this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + u[0] / l[0] + ",\n          " + u[1] / l[1] + ");\n      const vec2 inputShapeRC = vec2(" + a + ".0, " + i + ".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec2 sourceNearestRC = ivec2(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + " + c + ")));\n\n        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);\n\n        setOutput(newValue);\n      }\n    ";
    };
  }(),
      ReverseProgram = function () {
    return function (e, t) {
      this.variableNames = ["x"];var n = e.length;if (n > 4) throw new Error("WebGL backend: Reverse of rank-" + n + " tensor is not yet supported");if (this.outputShape = e, 1 !== n) {
        var r = e.map(function (n, r) {
          return function (n) {
            return -1 !== t.indexOf(n) && 1 !== e[n] ? e[n] + " - coords[" + n + "] - 1" : "coords[" + n + "]";
          }(r);
        }).join(","),
            o = getCoordsDataType(n);this.userCode = "\n      void main() {\n        " + o + " coords = getOutputCoords();\n        setOutput(getX(" + r + "));\n      }\n    ";
      } else this.userCode = "\n        void main() {\n          int coord = getOutputCoords();\n          setOutput(getX(" + e[0] + " - coord - 1));\n        }\n      ";
    };
  }(),
      SegmentOpProgram = function () {
    return function (e, t) {
      this.variableNames = ["x", "segmentIds"];var n = e.windowSize,
          r = e.batchSize,
          o = e.inSize,
          a = e.numSegments,
          i = a * Math.ceil(o / n);this.outputShape = [r, i];var s = 4 * Math.floor(n / 4),
          u = n % 4,
          l = "\n        sumValue += dot(values, filter);\n    ",
          c = "";o % n > 0 && (c = "\n        if (inIdx < 0 || inIdx >= " + o + ") {\n          return initializationValue;\n        }\n      ");var d = "";o % n > 0 && (d = "\n        if (inIdx < 0 || inIdx >= " + o + ") {\n          return -1.0;\n        }\n      "), this.userCode = "\n      const float initializationValue = 0.0;\n\n      float getValue(int batch, int inIdx) {\n        " + c + "\n        return getX(batch, inIdx);\n      }\n\n      float getSegmentIdAtIndex(int inIdx) {\n        " + d + "\n        return getSegmentIds(inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = int(floor(float(outIdx) / float(\n          " + a + ")) * float(" + n + "));\n        int currentSeg = int(mod(float(outIdx), float(" + a + ")));\n\n        float sumValue = 0.0;\n\n        for (int i = 0; i < " + s + "; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          vec4 filter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0\n          );\n\n          " + l + "\n        }\n\n        int inIdx = inOffset + " + s + ";\n        if (" + (1 === u) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));\n\n          vec4 filter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            0,\n            0,\n            0\n          );\n\n          " + l + "\n        } else if (" + (2 === u) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          vec4 filter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n              0,\n              0\n          );\n\n          " + l + "\n        } else if (" + (3 === u) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          vec4 filter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            0\n          );\n\n          " + l + "\n        }\n        setOutput(sumValue);\n      }\n    ";
    };
  }(),
      SliceProgram = function () {
    function e(e) {
      this.variableNames = ["source"], this.outputShape = e, this.rank = e.length;var t = getCoordsDataType(this.rank),
          n = getCoords$1(this.rank);this.userCode = "\n      uniform " + t + " start;\n\n      void main() {\n        " + t + " sourceLoc = start + getOutputCoords();\n        setOutput(getSource(" + n + "));\n      }\n    ";
    }return e.prototype.getCustomSetupFunc = function (e) {
      var t = this;if (e.length !== this.rank) throw Error("The rank (" + this.rank + ") of the program must match the length of start (" + e.length + ")");return function (n, r) {
        if (null != t.startLoc || (t.startLoc = n.getUniformLocationNoThrow(r, "start"), null != t.startLoc)) if (1 === t.rank) n.gl.uniform1i(t.startLoc, e[0]);else if (2 === t.rank) n.gl.uniform2i(t.startLoc, e[0], e[1]);else if (3 === t.rank) n.gl.uniform3i(t.startLoc, e[0], e[1], e[2]);else {
          if (4 !== t.rank) throw Error("Slicing for rank " + t.rank + " is not yet supported");n.gl.uniform4i(t.startLoc, e[0], e[1], e[2], e[3]);
        }
      };
    }, e;
  }();function getCoords$1(e) {
    if (1 === e) return "sourceLoc";if (2 === e) return "sourceLoc.x, sourceLoc.y";if (3 === e) return "sourceLoc.x, sourceLoc.y, sourceLoc.z";if (4 === e) return "sourceLoc.x, sourceLoc.y, sourceLoc.z, sourceLoc.w";throw Error("Slicing for rank " + e + " is not yet supported");
  }var StridedSliceProgram = function () {
    return function (e, t, n) {
      this.variableNames = ["x"], this.outputShape = n, this.rank = n.length;var r = getCoordsDataType(this.rank),
          o = "";o = 1 === this.rank ? "coords * strides + begin" : n.map(function (e, t) {
        return "coords[" + t + "] * strides[" + t + "] + begin[" + t + "]";
      }).join(","), this.userCode = "\n      " + r + " begin = " + r + "(" + e + ");\n      " + r + " strides = " + r + "(" + t + ");\n\n      void main() {\n        " + r + " coords = getOutputCoords();\n        setOutput(getX(" + o + "));\n      }\n    ";
    };
  }(),
      TextureManager = function () {
    function e(e) {
      this.gpgpu = e, this.numUsedTextures = 0, this.numFreeTextures = 0, this.freeTextures = {}, this.logEnabled = !1, this.usedTextures = {};
    }return e.prototype.acquireTexture = function (e, t) {
      var n,
          r = getPhysicalFromLogicalTextureType(t),
          o = getKeyFromTextureShape(e, r);if (o in this.freeTextures || (this.freeTextures[o] = []), o in this.usedTextures || (this.usedTextures[o] = []), this.freeTextures[o].length > 0) {
        this.numFreeTextures--, this.numUsedTextures++, this.log();var a = this.freeTextures[o].shift();return this.usedTextures[o].push(a), a;
      }return this.numUsedTextures++, this.log(), r === PhysicalTextureType.FLOAT32 ? n = this.gpgpu.createFloat32MatrixTexture(e[0], e[1]) : r === PhysicalTextureType.FLOAT16 ? n = this.gpgpu.createFloat16MatrixTexture(e[0], e[1]) : r === PhysicalTextureType.UNSIGNED_BYTE && (n = this.gpgpu.createUnsignedBytesMatrixTexture(e[0], e[1])), this.usedTextures[o].push(n), n;
    }, e.prototype.releaseTexture = function (e, t, n) {
      var r = getKeyFromTextureShape(t, getPhysicalFromLogicalTextureType(n));r in this.freeTextures || (this.freeTextures[r] = []), this.freeTextures[r].push(e), this.numFreeTextures++, this.numUsedTextures--;var o = this.usedTextures[r],
          a = o.indexOf(e);if (a < 0) throw new Error("Cannot release a texture that was never provided by this texture manager");o.splice(a, 1), this.log();
    }, e.prototype.log = function () {
      if (this.logEnabled) {
        var e = this.numFreeTextures + this.numUsedTextures;console.log("Free/Used", this.numFreeTextures + " / " + this.numUsedTextures, "(" + e + ")");
      }
    }, e.prototype.getNumUsedTextures = function () {
      return this.numUsedTextures;
    }, e.prototype.getNumFreeTextures = function () {
      return this.numFreeTextures;
    }, e.prototype.dispose = function () {
      var e = this;if (null != this.freeTextures) {
        for (var t in this.freeTextures) this.freeTextures[t].forEach(function (t) {
          e.gpgpu.deleteMatrixTexture(t);
        });for (var t in this.usedTextures) this.usedTextures[t].forEach(function (t) {
          e.gpgpu.deleteMatrixTexture(t);
        });this.freeTextures = null, this.usedTextures = null, this.numUsedTextures = 0, this.numFreeTextures = 0;
      }
    }, e;
  }();function getPhysicalFromLogicalTextureType(e) {
    if (e === TextureUsage.DOWNLOAD || e === TextureUsage.PIXELS) return PhysicalTextureType.UNSIGNED_BYTE;if (e === TextureUsage.UPLOAD) return PhysicalTextureType.FLOAT32;if (e === TextureUsage.RENDER) return ENV.get("WEBGL_RENDER_FLOAT32_ENABLED") ? PhysicalTextureType.FLOAT32 : PhysicalTextureType.FLOAT16;throw new Error("Unknown logical texture type " + e);
  }function getKeyFromTextureShape(e, t) {
    return e[0] + "_" + e[1] + "_" + t;
  }var TileProgram = function () {
    return function (e, t) {
      this.variableNames = ["A"];for (var n = new Array(e.length), r = 0; r < n.length; r++) n[r] = e[r] * t[r];this.outputShape = n, this.rank = n.length;var o = getCoordsDataType(this.rank),
          a = getSourceCoords$1(e);this.userCode = "\n      void main() {\n        " + o + " resRC = getOutputCoords();\n        setOutput(getA(" + a + "));\n      }\n    ";
    };
  }();function getSourceCoords$1(e) {
    var t = e.length;if (t > 5) throw Error("Tile for rank " + t + " is not yet supported");if (1 === t) return "imod(resRC, " + e[0] + ")";for (var n = ["resRC.x", "resRC.y", "resRC.z", "resRC.w", "resRC.u"], r = [], o = 0; o < e.length; o++) r.push("imod(" + n[o] + ", " + e[o] + ")");return r.join();
  }var TransposeProgram = function () {
    return function (e, t) {
      this.variableNames = ["A"];for (var n = new Array(e.length), r = 0; r < n.length; r++) n[r] = e[t[r]];this.outputShape = n, this.rank = n.length;var o = getCoordsDataType(this.rank),
          a = getSwitchedCoords(t);this.userCode = "\n    void main() {\n      " + o + " resRC = getOutputCoords();\n      setOutput(getA(" + a + "));\n    }\n    ";
    };
  }();function getSwitchedCoords(e) {
    var t = e.length;if (t > 6) throw Error("Transpose for rank " + t + " is not yet supported");for (var n = ["resRC.x", "resRC.y", "resRC.z", "resRC.w", "resRC.u", "resRC.v"], r = new Array(t), o = 0; o < e.length; o++) r[e[o]] = n[o];return r.join();
  }var ERF_P = .3275911,
      ERF_A1 = .254829592,
      ERF_A2 = -.284496736,
      ERF_A3 = 1.421413741,
      ERF_A4 = -1.453152027,
      ERF_A5 = 1.061405429,
      UnaryOpProgram = function () {
    function e(e, t) {
      this.variableNames = ["A"], this.outputShape = e, this.userCode = "\n      uniform float NAN;\n      float unaryOperation(float x) {\n        " + t + "\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    ";
    }return e.prototype.getCustomSetupFunc = function () {
      var e = this;return function (t, n) {
        null == e.startLoc && (e.startLoc = t.getUniformLocationNoThrow(n, "NAN"), null == e.startLoc) || t.gl.uniform1f(e.startLoc, NaN);
      };
    }, e;
  }(),
      CHECK_NAN_SNIPPET$1 = "if (isNaN(x)) return x;",
      ABS = "return abs(x);",
      RELU = CHECK_NAN_SNIPPET$1 + "\n  return (x < 0.0) ? 0.0 : x;\n",
      ELU = "return (x >= 0.0) ? x : (exp(x) - 1.0);",
      SELU = "\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = " + SELU_SCALEALPHA + ";\n  float scale = " + SELU_SCALE + ";\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n";function STEP(e) {
    return void 0 === e && (e = 0), CHECK_NAN_SNIPPET$1 + "\n    return x > 0.0 ? 1.0 : float(" + e + ");\n  ";
  }var NEG = "return -x;",
      CEIL = "return ceil(x);",
      FLOOR = "return floor(x);",
      SIGN = "\n  if (isNaN(x)) { return 0.0; }\n  return sign(x);\n",
      ROUND = "\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n",
      EXP = "return exp(x);",
      EXPM1 = "return exp(x) - 1.0;",
      LOG = "if (x < 0.0) return NAN;\n  return log(x);",
      LOG1P = "return log(1.0 + x);",
      SQRT = "return sqrt(x);",
      RSQRT = "return inversesqrt(x);",
      SIGMOID = "return 1.0 / (1.0 + exp(-1.0 * x));",
      SOFTPLUS = "\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n",
      SIN = CHECK_NAN_SNIPPET$1 + "\n  return sin(x);\n",
      COS = CHECK_NAN_SNIPPET$1 + "\n  return cos(x);\n",
      TAN = "return tan(x);",
      ASIN = "return asin(x);",
      ACOS = "return acos(x);",
      ATAN = CHECK_NAN_SNIPPET$1 + "\n  return atan(x);\n",
      SINH = "\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n",
      COSH = "\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n",
      TANH = "\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n",
      ASINH = "return log(x + sqrt(x * x + 1.0));",
      ACOSH = CHECK_NAN_SNIPPET$1 + "\n  if (x < 1.0) return NAN;\n  return log(x + sqrt(x * x - 1.0));",
      ATANH = CHECK_NAN_SNIPPET$1 + "\n  if ((x < -1.0) || (x > 1.0)) return NAN;\n  return (log(1.0 + x) - log(1.0 - x)) / 2.0;",
      ERF = '\n  // Error function is calculated approximately with elementary function.\n  // See "Handbook of Mathematical Functions with Formulas,\n  // Graphs, and Mathematical Tables", Abramowitz and Stegun.\n  float p = ' + ERF_P + ";\n  float a1 = " + ERF_A1 + ";\n  float a2 = " + ERF_A2 + ";\n  float a3 = " + ERF_A3 + ";\n  float a4 = " + ERF_A4 + ";\n  float a5 = " + ERF_A5 + ";\n\n  float t = 1.0 / (1.0 + p * x);\n  return 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x);\n",
      SQUARE = "return x * x;",
      RECIPROCAL = "return 1.0 / x;",
      LOGICAL_NOT = "return float(!(x >= 1.0));",
      TO_INT = "return float(int(x));",
      BEFORE_PAGING_CONSTANT = 300,
      SIZE_UPLOAD_UNIFORM = 32,
      MathBackendWebGL = function () {
    function e(e, t) {
      if (void 0 === t && (t = !0), this.gpgpu = e, this.delayedStorage = t, this.texData = new WeakMap(), this.pendingRead = new WeakMap(), this.pendingDisposal = new WeakSet(), this.lruDataGPU = [], this.numBytesInGPU = 0, this.uploadWaitMs = 0, this.downloadWaitMs = 0, this.binaryCache = {}, this.disposed = !1, ENV.get("WEBGL_VERSION") < 1) throw new Error("WebGL is not supported on this device");ENV.get("IS_BROWSER") && (this.canvas = document.createElement("canvas")), null == e ? (this.gpgpu = new GPGPUContext(createWebGLContext(this.canvas)), this.gpgpuCreatedLocally = !0) : this.gpgpuCreatedLocally = !1, this.NUM_BYTES_BEFORE_PAGING = window.screen.height * window.screen.width * window.devicePixelRatio * BEFORE_PAGING_CONSTANT, this.textureManager = new TextureManager(this.gpgpu);
    }return e.prototype.register = function (e, t, n) {
      if (this.texData.has(e)) throw new Error("Data buffer is already registered");this.texData.set(e, { shape: t, dtype: n, values: null, texture: null, texShape: null, usage: TextureUsage.RENDER });
    }, e.prototype.fromPixels = function (e, t) {
      if (null == e) throw new Error("pixels passed to tf.fromPixels() can not be null");var n = [e.height, e.width],
          r = [e.height, e.width, t];if (!(e instanceof HTMLVideoElement || e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof ImageData)) throw new Error("pixels passed to tf.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement or ImageData, but was " + e.constructor.name);if (e instanceof HTMLVideoElement) {
        if (null == this.fromPixelsCanvas) {
          if (!ENV.get("IS_BROWSER")) throw new Error("Can't read pixels from HTMLImageElement outside the browser.");if ("complete" !== document.readyState) throw new Error("The DOM is not ready yet. Please call tf.fromPixels() once the DOM is ready. One way to do that is to add an event listener for `DOMContentLoaded` on the document object");this.fromPixelsCanvas = document.createElement("canvas");
        }this.fromPixelsCanvas.width = e.width, this.fromPixelsCanvas.height = e.height, this.fromPixelsCanvas.getContext("2d").drawImage(e, 0, 0, e.width, e.height), e = this.fromPixelsCanvas;
      }var o = Tensor.make(n, {}, "int32");this.texData.get(o.dataId).usage = TextureUsage.PIXELS, this.gpgpu.uploadPixelDataToTexture(this.getTexture(o.dataId), e);var a = new FromPixelsProgram(r),
          i = this.compileAndRun(a, [o]);return o.dispose(), i;
    }, e.prototype.write = function (e, t) {
      if (null == t) throw new Error("MathBackendWebGL.write(): values can not be null");this.throwIfNoData(e);var n = this.texData.get(e),
          r = n.texture,
          o = n.texShape,
          a = n.usage;null != r && (this.releaseTexture(e, r, o, a), n.texture = null, n.texShape = null), n.usage = TextureUsage.UPLOAD, n.values = t, this.delayedStorage || this.uploadToGPU(e);
    }, e.prototype.readSync = function (e) {
      this.throwIfNoData(e);var t = this.texData.get(e),
          n = t.shape,
          r = t.texture,
          o = t.values,
          a = t.texShape,
          i = t.dtype;if (null != o) return this.cacheOnCPU(e), o;var s,
          u,
          l = null != this.activeTimers;if (l && (s = performance.now()), ENV.get("WEBGL_DOWNLOAD_FLOAT_ENABLED")) u = this.gpgpu.downloadFloat32MatrixFromOutputTexture(r, a[0], a[1]);else {
        var c = Tensor.make(n, {});this.texData.get(c.dataId).usage = TextureUsage.DOWNLOAD;var d = Tensor.make(n, { dataId: e }, i),
            p = new EncodeFloatProgram(n);this.compileAndRun(p, [d], c, null, !1);var h = this.texData.get(c.dataId);u = this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(h.texture, h.texShape[0], h.texShape[1]), d.dispose(), c.dispose();
      }return l && (this.downloadWaitMs += performance.now() - s), this.cacheOnCPU(e, u), t.values;
    }, e.prototype.read = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n, r, o, a, i, s, u;return __generator(this, function (l) {
          switch (l.label) {case 0:
              return this.pendingRead.has(e) ? (t = this.pendingRead.get(e), [2, new Promise(function (e) {
                return t.push(e);
              })]) : (this.throwIfNoData(e), n = this.texData.get(e), r = n.texture, o = n.values, a = n.texShape, null != o ? (this.cacheOnCPU(e), [2, o]) : ENV.get("WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED") ? [4, this.gpgpu.downloadMatrixFromTextureAsync(r, a[0], a[1])] : [3, 2]);case 1:
              return i = l.sent(), this.cacheOnCPU(e, i), [2, n.values];case 2:
              return 0 === ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") ? [2, this.readSync(e)] : (this.pendingRead.set(e, []), [4, this.gpgpu.runQuery(function () {})]);case 3:
              return l.sent(), s = this.pendingRead.get(e), this.pendingRead.delete(e), u = this.readSync(e), s.forEach(function (e) {
                return e(u);
              }), this.pendingDisposal.has(e) && (this.pendingDisposal.delete(e), this.disposeData(e)), [2, u];}
        });
      });
    }, e.prototype.time = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n, r, o, a, i;return __generator(this, function (s) {
          switch (s.label) {case 0:
              return t = this.activeTimers, n = [], r = !1, null == this.programTimersStack ? (this.programTimersStack = n, r = !0) : this.activeTimers.push(n), this.activeTimers = n, e(), o = flatten(this.activeTimers), this.activeTimers = t, r && (this.programTimersStack = null), [4, Promise.all(o).then(function (e) {
                var t = 0;return e.forEach(function (e) {
                  return t += e;
                }), t;
              })];case 1:
              return a = s.sent(), i = { uploadWaitMs: this.uploadWaitMs, downloadWaitMs: this.downloadWaitMs, kernelMs: a, wallMs: null }, this.uploadWaitMs = 0, this.downloadWaitMs = 0, [2, i];}
        });
      });
    }, e.prototype.memory = function () {
      return { unreliable: !1, numBytesInGPU: this.numBytesInGPU };
    }, e.prototype.startTimer = function () {
      return ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 ? this.gpgpu.beginQuery() : { startMs: performance.now(), endMs: null };
    }, e.prototype.endTimer = function (e) {
      return ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 ? (this.gpgpu.endQuery(), e) : (e.endMs = performance.now(), e);
    }, e.prototype.getQueryTime = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t;return __generator(this, function (n) {
          return ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 ? [2, this.gpgpu.pollQueryTime(e)] : [2, (t = e).endMs - t.startMs];
        });
      });
    }, e.prototype.disposeData = function (e) {
      if (!this.pendingDisposal.has(e)) if (this.pendingRead.has(e)) this.pendingDisposal.add(e);else if (this.texData.has(e)) {
        var t = this.texData.get(e),
            n = t.texture,
            r = t.texShape,
            o = t.usage;null != n && this.releaseTexture(e, n, r, o), this.texData.delete(e);
      }
    }, e.prototype.getTexture = function (e) {
      return this.uploadToGPU(e), this.texData.get(e).texture;
    }, e.prototype.getGPGPUContext = function () {
      return this.gpgpu;
    }, e.prototype.getCanvas = function () {
      return this.canvas;
    }, e.prototype.slice = function (e, t, n) {
      var r = new SliceProgram(n),
          o = r.getCustomSetupFunc(t);return this.compileAndRun(r, [e], null, o);
    }, e.prototype.stridedSlice = function (e, t, n, r, o, a) {
      var i = getStridedSlicedInfo(e.shape, t, n, r, o, a),
          s = i[0],
          u = i[1];if (u.some(function (e) {
        return 0 === e;
      })) return tensor([], u);var l = new StridedSliceProgram(s, r, u);return this.compileAndRun(l, [e]);
    }, e.prototype.reverse = function (e, t) {
      var n = new ReverseProgram(e.shape, t);return this.compileAndRun(n, [e]);
    }, e.prototype.concat = function (e, t) {
      var n = new ConcatProgram(e.shape, t.shape);return this.compileAndRun(n, [e, t]);
    }, e.prototype.neg = function (e) {
      var t = new UnaryOpProgram(e.shape, NEG);return this.compileAndRun(t, [e]);
    }, e.prototype.matMul = function (e, t, n, r) {
      var o = new MatMulProgram(e.shape, t.shape, n, r);return this.compileAndRun(o, [e, t]);
    }, e.prototype.multiply = function (e, t) {
      var n = new BinaryOpProgram(MUL, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, upcastType(e.dtype, t.dtype));return this.compileAndRun(n, [e, t], r);
    }, e.prototype.batchNormalization = function (e, t, n, r, o, a) {
      var i = [e, t, n],
          s = null;null != a && (s = a.shape, i.push(a));var u = null;null != o && (u = o.shape, i.push(o));var l = new BatchNormProgram(e.shape, t.shape, n.shape, s, u, r);return this.compileAndRun(l, i);
    }, e.prototype.localResponseNormalization4D = function (e, t, n, r, o) {
      var a = new LRNProgram(e.shape, t, n, r, o);return this.compileAndRun(a, [e]);
    }, e.prototype.tile = function (e, t) {
      var n = new TileProgram(e.shape, t);return this.compileAndRun(n, [e]);
    }, e.prototype.pad = function (e, t, n) {
      var r = new PadProgram(e.shape, t, n);return this.compileAndRun(r, [e]);
    }, e.prototype.transpose = function (e, t) {
      var n = new TransposeProgram(e.shape, t);return this.compileAndRun(n, [e]);
    }, e.prototype.gather = function (e, t, n) {
      var r = new GatherProgram(e.shape, t.size, n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.reduce = function (e, t, n) {
      var r = e.shape[0],
          o = e.shape[1],
          a = computeOptimalWindowSize(o),
          i = new ReduceProgram({ windowSize: a, inSize: o, batchSize: r }, t),
          s = i.outputShape,
          u = s[0],
          l = s[1],
          c = this.makeOutputArray([u, l], n);return this.compileAndRun(i, [e], c), 1 === c.shape[1] ? c : this.reduce(c, t, n);
    }, e.prototype.argReduce = function (e, t, n) {
      void 0 === n && (n = null);var r = e.shape[0],
          o = e.shape[1];null != n && (r = n.shape[0], o = n.shape[1]);var a = computeOptimalWindowSize(o),
          i = new ArgMinMaxProgram({ windowSize: a, inSize: o, batchSize: r }, t, null == n),
          s = i.outputShape,
          u = s[0],
          l = s[1],
          c = this.makeOutputArray([u, l], "int32"),
          d = [e];return null != n && d.push(n), this.compileAndRun(i, d, c), 1 === c.shape[1] ? c : this.argReduce(e, t, c);
    }, e.prototype.sum = function (e, t) {
      assertAxesAreInnerMostDims("sum", t, e.rank);var n = computeOutAndReduceShapes(e.shape, t),
          r = n[0],
          o = sizeFromShape(n[1]),
          a = e.as2D(-1, o),
          i = sumOutType(e.dtype);return this.reduce(a, "sum", i).reshape(r);
    }, e.prototype.unsortedSegmentSum = function (e, t, n) {
      var r = 0,
          o = getAxesPermutation([r], e.rank),
          a = e;null != o && (a = e.transpose(o), r = getInnerMostAxes(1, e.rank)[0]);var i = computeOutShape$1(a.shape, r, n),
          s = sizeFromShape([a.shape[r]]),
          u = a.as2D(-1, s),
          l = sumOutType(e.dtype),
          c = this.segOpCompute(u, "unsortedSegmentSum", t, l, n).reshape(i);return null != o && (c = c.transpose(getUndoAxesPermutation(o))), c;
    }, e.prototype.segOpCompute = function (e, t, n, r, o) {
      var a = e.shape[0],
          i = e.shape[1],
          s = segOpComputeOptimalWindowSize(i, o),
          u = new SegmentOpProgram({ windowSize: s, inSize: i, batchSize: a, numSegments: o }, t),
          l = u.outputShape,
          c = l[0],
          d = l[1],
          p = this.makeOutputArray([c, d], r);return this.compileAndRun(u, [e, n], p), p.shape[1] === o ? p : (n = range(0, o).tile([i / s]), this.segOpCompute(p, t, n, r, o));
    }, e.prototype.argMin = function (e, t) {
      var n = [t];assertAxesAreInnerMostDims("argMin", n, e.rank);var r = computeOutAndReduceShapes(e.shape, n),
          o = r[0],
          a = sizeFromShape(r[1]),
          i = e.as2D(-1, a);return this.argReduce(i, "min").reshape(o);
    }, e.prototype.argMax = function (e, t) {
      var n = [t];assertAxesAreInnerMostDims("argMax", n, e.rank);var r = computeOutAndReduceShapes(e.shape, n),
          o = r[0],
          a = sizeFromShape(r[1]),
          i = e.as2D(-1, a);return this.argReduce(i, "max").reshape(o);
    }, e.prototype.cumsum = function (e, t, n, r) {
      if (t !== e.rank - 1) throw new Error("WebGL cumsum shader expects an inner-most axis=" + (e.rank - 1) + " but got axis=" + t);var o = new CumSumProgram(e.shape, n, r);return this.compileAndRun(o, [e]);
    }, e.prototype.equal = function (e, t) {
      var n = new BinaryOpProgram(EQUAL, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.notEqual = function (e, t) {
      var n = new BinaryOpProgram(NOT_EQUAL, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.less = function (e, t) {
      var n = new BinaryOpProgram(LESS, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.lessEqual = function (e, t) {
      var n = new BinaryOpProgram(LESS_EQUAL, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.greater = function (e, t) {
      var n = new BinaryOpProgram(GREATER, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.greaterEqual = function (e, t) {
      var n = new BinaryOpProgram(GREATER_EQUAL, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.logicalNot = function (e) {
      var t = new UnaryOpProgram(e.shape, LOGICAL_NOT);return this.compileAndRun(t, [e]);
    }, e.prototype.logicalAnd = function (e, t) {
      var n = new BinaryOpProgram(LOGICAL_AND, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.logicalOr = function (e, t) {
      var n = new BinaryOpProgram(LOGICAL_OR, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "bool");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.where = function (e, t, n, r) {
      var o = new WhereProgram(e.rank, t.shape, t.rank),
          a = this.makeOutputArray(o.outputShape, r);return this.compileAndRun(o, [e, t, n], a);
    }, e.prototype.topKValues = function (e, t) {
      throw new Error("topKValues GPU not yet implemented!");
    }, e.prototype.topKIndices = function (e, t) {
      throw new Error("topKIndices GPU not yet implemented!");
    }, e.prototype.min = function (e, t) {
      assertAxesAreInnerMostDims("min", t, e.rank);var n = computeOutAndReduceShapes(e.shape, t),
          r = n[0],
          o = sizeFromShape(n[1]),
          a = e.as2D(-1, o);return this.reduce(a, "min", a.dtype).reshape(r);
    }, e.prototype.minimum = function (e, t) {
      var n = new BinaryOpProgram(MIN, e.shape, t.shape);return this.compileAndRun(n, [e, t]);
    }, e.prototype.mod = function (e, t) {
      var n = new BinaryOpProgram(MOD, e.shape, t.shape),
          r = n.getCustomSetupFunc();return this.compileAndRun(n, [e, t], null, r);
    }, e.prototype.max = function (e, t) {
      assertAxesAreInnerMostDims("max", t, e.rank);var n = computeOutAndReduceShapes(e.shape, t),
          r = n[0],
          o = sizeFromShape(n[1]),
          a = e.as2D(-1, o);return this.reduce(a, "max", a.dtype).reshape(r);
    }, e.prototype.maximum = function (e, t) {
      var n = new BinaryOpProgram(MAX, e.shape, t.shape);return this.compileAndRun(n, [e, t]);
    }, e.prototype.all = function (e, t) {
      assertAxesAreInnerMostDims("all", t, e.rank);var n = computeOutAndReduceShapes(e.shape, t),
          r = n[0],
          o = sizeFromShape(n[1]),
          a = e.as2D(-1, o);return this.reduce(a, "all", a.dtype).reshape(r);
    }, e.prototype.any = function (e, t) {
      assertAxesAreInnerMostDims("any", t, e.rank);var n = computeOutAndReduceShapes(e.shape, t),
          r = n[0],
          o = sizeFromShape(n[1]),
          a = e.as2D(-1, o);return this.reduce(a, "any", a.dtype).reshape(r);
    }, e.prototype.squaredDifference = function (e, t) {
      var n = new BinaryOpProgram(SQUARED_DIFFERENCE, e.shape, t.shape);return this.compileAndRun(n, [e, t]);
    }, e.prototype.realDivide = function (e, t) {
      var n = new BinaryOpProgram(DIV, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "float32");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.floorDiv = function (e, t) {
      var n = new BinaryOpProgram(INT_DIV, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, "int32");return this.compileAndRun(n, [e, t], r);
    }, e.prototype.add = function (e, t) {
      var n = new BinaryOpProgram(ADD, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, upcastType(e.dtype, t.dtype));return this.compileAndRun(n, [e, t], r);
    }, e.prototype.subtract = function (e, t) {
      var n = new BinaryOpProgram(SUB, e.shape, t.shape),
          r = this.makeOutputArray(n.outputShape, upcastType(e.dtype, t.dtype));return this.compileAndRun(n, [e, t], r);
    }, e.prototype.pow = function (e, t) {
      var n = new BinaryOpProgram(POW, e.shape, t.shape),
          r = n.getCustomSetupFunc(),
          o = this.makeOutputArray(n.outputShape, upcastType(e.dtype, t.dtype));return this.compileAndRun(n, [e, t], o, r);
    }, e.prototype.ceil = function (e) {
      var t = new UnaryOpProgram(e.shape, CEIL);return this.compileAndRun(t, [e]);
    }, e.prototype.floor = function (e) {
      var t = new UnaryOpProgram(e.shape, FLOOR);return this.compileAndRun(t, [e]);
    }, e.prototype.sign = function (e) {
      var t = new UnaryOpProgram(e.shape, SIGN);return this.compileAndRun(t, [e]);
    }, e.prototype.round = function (e) {
      var t = new UnaryOpProgram(e.shape, ROUND);return this.compileAndRun(t, [e]);
    }, e.prototype.exp = function (e) {
      var t = new UnaryOpProgram(e.shape, EXP);return this.compileAndRun(t, [e]);
    }, e.prototype.expm1 = function (e) {
      var t = new UnaryOpProgram(e.shape, EXPM1);return this.compileAndRun(t, [e]);
    }, e.prototype.log = function (e) {
      var t = new UnaryOpProgram(e.shape, LOG),
          n = t.getCustomSetupFunc();return this.compileAndRun(t, [e], null, n);
    }, e.prototype.log1p = function (e) {
      var t = new UnaryOpProgram(e.shape, LOG1P);return this.compileAndRun(t, [e]);
    }, e.prototype.sqrt = function (e) {
      var t = new UnaryOpProgram(e.shape, SQRT);return this.compileAndRun(t, [e]);
    }, e.prototype.rsqrt = function (e) {
      var t = new UnaryOpProgram(e.shape, RSQRT);return this.compileAndRun(t, [e]);
    }, e.prototype.square = function (e) {
      var t = new UnaryOpProgram(e.shape, SQUARE);return this.compileAndRun(t, [e]);
    }, e.prototype.reciprocal = function (e) {
      var t = new UnaryOpProgram(e.shape, RECIPROCAL);return this.compileAndRun(t, [e]);
    }, e.prototype.relu = function (e) {
      var t = new UnaryOpProgram(e.shape, RELU);return this.compileAndRun(t, [e]);
    }, e.prototype.elu = function (e) {
      var t = new UnaryOpProgram(e.shape, ELU);return this.compileAndRun(t, [e]);
    }, e.prototype.eluDer = function (e, t) {
      var n = new BinaryOpProgram(ELU_DER, e.shape, t.shape);return this.compileAndRun(n, [e, t]);
    }, e.prototype.selu = function (e) {
      var t = new UnaryOpProgram(e.shape, SELU);return this.compileAndRun(t, [e]);
    }, e.prototype.int = function (e) {
      var t = new UnaryOpProgram(e.shape, TO_INT),
          n = this.makeOutputArray(t.outputShape, "int32");return this.compileAndRun(t, [e], n);
    }, e.prototype.clip = function (e, t, n) {
      var r = new ClipProgram(e.shape, t, n);return this.compileAndRun(r, [e]);
    }, e.prototype.abs = function (e) {
      var t = new UnaryOpProgram(e.shape, ABS);return this.compileAndRun(t, [e]);
    }, e.prototype.sigmoid = function (e) {
      var t = new UnaryOpProgram(e.shape, SIGMOID);return this.compileAndRun(t, [e]);
    }, e.prototype.softplus = function (e) {
      var t = new UnaryOpProgram(e.shape, SOFTPLUS);return this.compileAndRun(t, [e]);
    }, e.prototype.sin = function (e) {
      var t = new UnaryOpProgram(e.shape, SIN);return this.compileAndRun(t, [e]);
    }, e.prototype.cos = function (e) {
      var t = new UnaryOpProgram(e.shape, COS);return this.compileAndRun(t, [e]);
    }, e.prototype.tan = function (e) {
      var t = new UnaryOpProgram(e.shape, TAN);return this.compileAndRun(t, [e]);
    }, e.prototype.asin = function (e) {
      var t = new UnaryOpProgram(e.shape, ASIN);return this.compileAndRun(t, [e]);
    }, e.prototype.acos = function (e) {
      var t = new UnaryOpProgram(e.shape, ACOS);return this.compileAndRun(t, [e]);
    }, e.prototype.atan = function (e) {
      var t = new UnaryOpProgram(e.shape, ATAN);return this.compileAndRun(t, [e]);
    }, e.prototype.atan2 = function (e, t) {
      var n = new BinaryOpProgram(ATAN2, e.shape, t.shape);return this.compileAndRun(n, [e, t]);
    }, e.prototype.sinh = function (e) {
      var t = new UnaryOpProgram(e.shape, SINH);return this.compileAndRun(t, [e]);
    }, e.prototype.cosh = function (e) {
      var t = new UnaryOpProgram(e.shape, COSH);return this.compileAndRun(t, [e]);
    }, e.prototype.tanh = function (e) {
      var t = new UnaryOpProgram(e.shape, TANH);return this.compileAndRun(t, [e]);
    }, e.prototype.asinh = function (e) {
      var t = new UnaryOpProgram(e.shape, ASINH);return this.compileAndRun(t, [e]);
    }, e.prototype.acosh = function (e) {
      var t = new UnaryOpProgram(e.shape, ACOSH),
          n = t.getCustomSetupFunc();return this.compileAndRun(t, [e], null, n);
    }, e.prototype.atanh = function (e) {
      var t = new UnaryOpProgram(e.shape, ATANH),
          n = t.getCustomSetupFunc();return this.compileAndRun(t, [e], null, n);
    }, e.prototype.erf = function (e) {
      var t = new UnaryOpProgram(e.shape, ERF);return this.compileAndRun(t, [e]);
    }, e.prototype.step = function (e, t) {
      var n = new UnaryOpProgram(e.shape, STEP(t));return this.compileAndRun(n, [e]);
    }, e.prototype.conv2d = function (e, t, n) {
      var r = new Conv2DProgram(n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.conv2dDerInput = function (e, t, n) {
      var r = new Conv2DDerInputProgram(n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.conv2dDerFilter = function (e, t, n) {
      var r = new Conv2DDerFilterProgram(n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.depthwiseConv2D = function (e, t, n) {
      var r = new DepthwiseConv2DProgram(n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.depthwiseConv2DDerInput = function (e, t, n) {
      var r = new DepthwiseConv2DDerInputProgram(n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.depthwiseConv2DDerFilter = function (e, t, n) {
      var r = new DepthwiseConv2DDerFilterProgram(n);return this.compileAndRun(r, [e, t]);
    }, e.prototype.maxPool = function (e, t) {
      var n = new Pool2DProgram(t, "max", !1),
          r = this.makeOutputArray(n.outputShape, e.dtype);return this.compileAndRun(n, [e], r);
    }, e.prototype.avgPool = function (e, t) {
      var n = new Pool2DProgram(t, "avg", !1),
          r = this.makeOutputArray(n.outputShape, "float32");return this.compileAndRun(n, [e], r);
    }, e.prototype.maxPoolBackprop = function (e, t, n, r) {
      var o = new Pool2DProgram(r, "max", !0),
          a = this.compileAndRun(o, [t]),
          i = new MaxPool2DBackpropProgram(r),
          s = this.makeOutputArray(i.outputShape, t.dtype),
          u = this.compileAndRun(i, [e, a], s);return a.dispose(), u;
    }, e.prototype.avgPoolBackprop = function (e, t, n) {
      var r = new AvgPool2DBackpropProgram(n),
          o = this.makeOutputArray(r.outputShape, t.dtype);return this.compileAndRun(r, [e], o);
    }, e.prototype.cast = function (e, t) {
      return castTensor(e, t, this);
    }, e.prototype.reshape = function (e, t) {
      return reshapeTensor(e, t);
    }, e.prototype.resizeBilinear = function (e, t, n, r) {
      var o = new ResizeBilinearProgram(e.shape, t, n, r);return this.compileAndRun(o, [e]);
    }, e.prototype.resizeBilinearBackprop = function (e, t, n) {
      var r = new ResizeBilinearBackpropProgram(e, t, n);return this.compileAndRun(r, [e]);
    }, e.prototype.resizeNearestNeighbor = function (e, t, n, r) {
      var o = new ResizeNearestNeighborProgram(e.shape, t, n, r);return this.compileAndRun(o, [e]);
    }, e.prototype.resizeNearestNeighborBackprop = function (e, t, n) {
      var r = new ResizeNearestNeigborBackpropProgram(e, t, n);return this.compileAndRun(r, [e]);
    }, e.prototype.multinomial = function (e, t, n, r) {
      var o = t ? e : softmax(e),
          a = o.shape[0],
          i = o.shape[1],
          s = new MultinomialProgram(a, i, n),
          u = this.makeOutputArray(s.outputShape, "int32"),
          l = s.getCustomSetupFunc(r);return this.compileAndRun(s, [o], u, l);
    }, e.prototype.oneHot = function (e, t, n, r) {
      var o = new OneHotProgram(e.size, t, n, r);return this.compileAndRun(o, [e]);
    }, e.prototype.makeOutputArray = function (e, t) {
      return Tensor.make(e, {}, t);
    }, e.prototype.compileAndRun = function (e, t, n, r, o) {
      var a = this;void 0 === o && (o = !0), null == n && (n = this.makeOutputArray(e.outputShape, t[0].dtype));var i = t.map(function (e) {
        var t = a.texData.get(e.dataId);return null == t.texture && e.size <= SIZE_UPLOAD_UNIFORM ? { tensor: e, texData: null, isUniform: !0 } : (a.uploadToGPU(e.dataId), { tensor: e, texData: t, isUniform: !1 });
      });this.uploadToGPU(n.dataId);var s,
          u = { tensor: n, texData: this.texData.get(n.dataId), isUniform: !1 },
          l = makeShaderKey(e, i, u),
          c = this.getAndSaveBinary(l, function () {
        return compileProgram(a.gpgpu, e, i, u);
      }),
          d = null != this.activeTimers;if (d && (s = this.startTimer()), runProgram(c, i, u, r), o && this.numBytesInGPU > this.NUM_BYTES_BEFORE_PAGING) for (var p = this.numBytesInGPU - this.NUM_BYTES_BEFORE_PAGING; p > 0 && this.lruDataGPU.length > 0;) {
        var h = this.lruDataGPU.shift(),
            f = this.texData.get(h),
            g = f.shape,
            m = f.dtype;p -= this.computeBytes(g, m), this.read(h);
      }return d && (s = this.endTimer(s), this.activeTimers.push(this.getQueryTime(s))), n;
    }, e.prototype.getAndSaveBinary = function (e, t) {
      return e in this.binaryCache || (this.binaryCache[e] = t()), this.binaryCache[e];
    }, e.prototype.getTextureManager = function () {
      return this.textureManager;
    }, e.prototype.dispose = function () {
      if (!this.disposed) {
        for (var e in this.binaryCache) this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram);this.textureManager.dispose(), this.canvas.remove(), null != this.fromPixelsCanvas && this.fromPixelsCanvas.remove(), this.gpgpuCreatedLocally && this.gpgpu.dispose(), this.disposed = !0;
      }
    }, e.prototype.throwIfNoData = function (e) {
      if (!this.texData.has(e)) throw new Error("WebGL backend: No data found for this tensor. Did you change your backend in the middle of the program? New backends can't use Tensors created with previous backends");
    }, e.prototype.uploadToGPU = function (e) {
      this.throwIfNoData(e);var t = this.texData.get(e),
          n = t.shape,
          r = t.values,
          o = t.texture,
          a = t.dtype,
          i = t.usage;if (null == o) {
        var s,
            u = null != this.activeTimers;u && (s = performance.now());var l = getTextureShapeFromLogicalShape(this.gpgpu.gl, n);t.texShape = l;var c = this.acquireTexture(e, l, i);t.texture = c, null != r && (this.gpgpu.uploadMatrixToTexture(c, l[0], l[1], typedArrayToFloat32(r, a)), t.values = null, u && (this.uploadWaitMs += performance.now() - s));
      } else {
        this.lruDataGPU.indexOf(e) >= 0 && (this.lruDataGPU.splice(this.lruDataGPU.indexOf(e), 1), this.lruDataGPU.push(e));
      }
    }, e.prototype.cacheOnCPU = function (e, t) {
      var n = this.delayedStorage,
          r = this.texData.get(e),
          o = r.texture,
          a = r.texShape,
          i = r.dtype,
          s = r.usage;n && null != o && (this.releaseTexture(e, o, a, s), r.texture = null, r.texShape = null), null != t && (r.values = float32ToTypedArray(t, i));
    }, e.prototype.releaseTexture = function (e, t, n, r) {
      var o = this.texData.get(e),
          a = o.shape,
          i = o.dtype,
          s = this.lruDataGPU.indexOf(e);s >= 0 && this.lruDataGPU.splice(s, 1), this.numBytesInGPU -= this.computeBytes(a, i), this.textureManager.releaseTexture(t, n, r);
    }, e.prototype.acquireTexture = function (e, t, n) {
      var r = this.texData.get(e),
          o = r.shape,
          a = r.dtype;return this.lruDataGPU.push(e), this.numBytesInGPU += this.computeBytes(o, a), this.textureManager.acquireTexture(t, n);
    }, e.prototype.computeBytes = function (e, t) {
      return sizeFromShape(e) * bytesPerElement(t);
    }, e;
  }();function float32ToTypedArray(e, t) {
    if ("float32" === t) return e;if ("int32" === t || "bool" === t) {
      for (var n = "int32" === t ? new Int32Array(e.length) : new Uint8Array(e.length), r = 0; r < n.length; ++r) n[r] = Math.round(e[r]);return n;
    }throw new Error("Unknown dtype " + t);
  }function typedArrayToFloat32(e, t) {
    return e instanceof Float32Array ? e : new Float32Array(e);
  }ENV.get("IS_BROWSER") && ENV.registerBackend("webgl", function () {
    return new MathBackendWebGL();
  }, 2, setTensorTracker);var MathBackendCPU = function () {
    function e() {
      this.data = new WeakMap(), this.firstUse = !0, ENV.get("IS_BROWSER") && (this.canvas = document.createElement("canvas"));
    }return e.prototype.register = function (e, t, n) {
      if (this.firstUse && (this.firstUse = !1, ENV.get("IS_NODE") && !ENV.get("IS_TEST") && console.warn("\n============================\nHi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.\n============================\n")), this.data.has(e)) throw new Error("Data buffer is already registered");this.data.set(e, null);
    }, e.prototype.write = function (e, t) {
      if (null == t) throw new Error("MathBackendCPU.write(): values can not be null");this.throwIfNoData(e), this.data.set(e, t);
    }, e.prototype.fromPixels = function (e, t) {
      if (null == e) throw new Error("pixels passed to tf.fromPixels() can not be null");var n, r;if (ENV.get("IS_NODE") && null == e.getContext) throw new Error("When running in node, pixels must be an HTMLCanvasElement like the one returned by the `canvas` npm package");if (null != e.getContext) n = e.getContext("2d").getImageData(0, 0, e.width, e.height).data;else if (e instanceof ImageData) n = e.data;else {
        if (!(e instanceof HTMLImageElement || e instanceof HTMLVideoElement)) throw new Error("pixels passed to tf.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement or ImageData, but was " + e.constructor.name);if (null == this.canvas) throw new Error("Can't read pixels from HTMLImageElement outside the browser.");this.canvas.width = e.width, this.canvas.height = e.height, this.canvas.getContext("2d").drawImage(e, 0, 0, e.width, e.height), n = this.canvas.getContext("2d").getImageData(0, 0, e.width, e.height).data;
      }if (4 === t) r = new Int32Array(n);else {
        var o = e.width * e.height;r = new Int32Array(o * t);for (var a = 0; a < o; a++) for (var i = 0; i < t; ++i) r[a * t + i] = n[4 * a + i];
      }var s = [e.height, e.width, t];return tensor3d(r, s, "int32");
    }, e.prototype.read = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (t) {
          return [2, this.readSync(e)];
        });
      });
    }, e.prototype.readSync = function (e) {
      return this.throwIfNoData(e), this.data.get(e);
    }, e.prototype.disposeData = function (e) {
      this.data.has(e) && this.data.delete(e);
    }, e.prototype.time = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t;return __generator(this, function (n) {
          return t = now(), e(), [2, { kernelMs: now() - t }];
        });
      });
    }, e.prototype.memory = function () {
      return { unreliable: !0 };
    }, e.prototype.throwIfNoData = function (e) {
      if (!this.data.has(e)) throw new Error("CPU backend: No data found for this tensor. Did you change your backend in the middle of the program? New backends can't use Tensors created with previous backends");
    }, e.prototype.slice = function (e, t, n) {
      for (var r = buffer(n, e.dtype), o = 0; o < r.size; ++o) {
        var a = r.indexToLoc(o),
            i = a.map(function (e, n) {
          return e + t[n];
        });r.set.apply(r, [e.get.apply(e, i)].concat(a));
      }return r.toTensor();
    }, e.prototype.stridedSlice = function (e, t, n, r, o, a) {
      var i = getStridedSlicedInfo(e.shape, t, n, r, o, a),
          s = i[0],
          u = i[1];if (u.some(function (e) {
        return 0 === e;
      })) return tensor([], u);for (var l = buffer(u, e.dtype), c = 0; c < l.size; c++) {
        for (var d = l.indexToLoc(c), p = new Array(d.length), h = 0; h < p.length; h++) p[h] = d[h] * r[h] + s[h];l.set.apply(l, [e.get.apply(e, p)].concat(d));
      }return l.toTensor();
    }, e.prototype.reverse = function (e, t) {
      for (var n = buffer(e.shape, e.dtype), r = e.buffer(), o = function (o) {
        var a = n.indexToLoc(o),
            i = a.slice();t.forEach(function (t) {
          return i[t] = e.shape[t] - 1 - i[t];
        }), n.set.apply(n, [r.get.apply(r, i)].concat(a));
      }, a = 0; a < n.size; a++) o(a);return n.toTensor();
    }, e.prototype.concat = function (e, t) {
      var n = computeOutShape(e.shape, t.shape, 1),
          r = buffer(n, e.dtype);if (1 === e.shape[0] && 1 === t.shape[0]) {
        var o = e.dataSync(),
            a = t.dataSync(),
            i = r.values;return i.set(o, 0), i.set(a, e.size), r.toTensor();
      }for (var s = 0; s < n[0]; ++s) {
        for (var u = 0; u < e.shape[1]; ++u) r.set(e.get(s, u), s, u);for (u = 0; u < t.shape[1]; ++u) r.set(t.get(s, u), s, u + e.shape[1]);
      }return r.toTensor();
    }, e.prototype.neg = function (e) {
      return this.multiply(scalar(-1), e);
    }, e.prototype.add = function (e, t) {
      return this.broadcastedBinaryOp(e, t, upcastType(e.dtype, t.dtype), function (e, t) {
        return e + t;
      });
    }, e.prototype.subtract = function (e, t) {
      return this.broadcastedBinaryOp(e, t, upcastType(e.dtype, t.dtype), function (e, t) {
        return e - t;
      });
    }, e.prototype.pow = function (e, t) {
      return this.broadcastedBinaryOp(e, t, e.dtype, function (e, t) {
        return Math.pow(e, t);
      });
    }, e.prototype.matMul = function (e, t, n, r) {
      for (var o = n ? e.shape[0] : e.shape[1], a = n ? e.shape[1] : e.shape[0], i = r ? t.shape[0] : t.shape[1], s = e.dataSync(), u = t.dataSync(), l = n ? [1, e.strides[0]] : [e.strides[0], 1], c = l[0], d = l[1], p = r ? [t.strides[0], 1] : [1, t.strides[0]], h = p[0], f = p[1], g = a * c, m = i * h, v = new Float32Array(a * i), y = 0, x = 0; x < g; x += c) for (var T = 0; T < m; T += h) {
        for (var b = x, S = T, E = 0, w = 0; w < o; ++w) E += s[b] * u[S], b += d, S += f;v[y++] = E;
      }return tensor2d(v, [a, i]);
    }, e.prototype.multiply = function (e, t) {
      return this.broadcastedBinaryOp(e, t, upcastType(e.dtype, t.dtype), function (e, t) {
        return e * t;
      });
    }, e.prototype.realDivide = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "float32", function (e, t) {
        return e / t;
      });
    }, e.prototype.floorDiv = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "int32", function (e, t) {
        return Math.floor(e / t);
      });
    }, e.prototype.sum = function (e, t) {
      assertAxesAreInnerMostDims("sum", t, e.rank);for (var n = computeOutAndReduceShapes(e.shape, t), r = n[0], o = n[1], a = upcastType(e.dtype, "int32"), i = zeros(r, a), s = sizeFromShape(o), u = i.dataSync(), l = e.dataSync(), c = 0; c < u.length; ++c) {
        for (var d = c * s, p = 0, h = 0; h < s; ++h) p += l[d + h];u[c] = p;
      }return i;
    }, e.prototype.unsortedSegmentSum = function (e, t, n) {
      for (var r = [], o = e.rank - t.rank, a = 0; a < o; ++a) t = t.expandDims(a + 1);for (a = 0; a < n; ++a) {
        var i = scalar(a, "int32"),
            s = equal(i, t).asType("float32").mul(e).sum(0);r.push(s);
      }return stack(r);
    }, e.prototype.argMin = function (e, t) {
      var n = [t];assertAxesAreInnerMostDims("argMin", n, e.rank);for (var r = computeOutAndReduceShapes(e.shape, n), o = r[0], a = r[1], i = zeros(o, "int32"), s = sizeFromShape(a), u = i.dataSync(), l = e.dataSync(), c = 0; c < u.length; ++c) {
        for (var d = c * s, p = l[d], h = 0, f = 0; f < s; ++f) {
          var g = l[d + f];g < p && (p = g, h = f);
        }u[c] = h;
      }return i;
    }, e.prototype.argMax = function (e, t) {
      var n = [t];assertAxesAreInnerMostDims("argMax", n, e.rank);for (var r = computeOutAndReduceShapes(e.shape, n), o = r[0], a = r[1], i = zeros(o, "int32"), s = sizeFromShape(a), u = i.dataSync(), l = e.dataSync(), c = 0; c < u.length; ++c) {
        for (var d = c * s, p = l[d], h = 0, f = 0; f < s; ++f) {
          var g = l[d + f];g > p && (p = g, h = f);
        }u[c] = h;
      }return i;
    }, e.prototype.cumsum = function (e, t, n, r) {
      if (t !== e.rank - 1) throw new Error("backend.cumsum in CPU expects an inner-most axis=" + (e.rank - 1) + " but got axis=" + t);for (var o = upcastType(e.dtype, "int32"), a = zeros(e.shape, o), i = a.dataSync(), s = e.dataSync(), u = e.shape[e.rank - 1], l = r ? function (e, t) {
        return e + u - t - 1;
      } : function (e, t) {
        return e + t;
      }, c = 0; c < s.length; c += u) for (var d = 0; d < u; d++) {
        var p = l(c, d);if (0 === d) i[p] = n ? 0 : s[p];else {
          var h = l(c, d - 1);i[p] = n ? s[h] + i[h] : s[p] + i[h];
        }
      }return a;
    }, e.prototype.equal = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e === t ? 1 : 0;
      });
    }, e.prototype.notEqual = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e !== t ? 1 : 0;
      });
    }, e.prototype.less = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e < t ? 1 : 0;
      });
    }, e.prototype.lessEqual = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e <= t ? 1 : 0;
      });
    }, e.prototype.greater = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e > t ? 1 : 0;
      });
    }, e.prototype.greaterEqual = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e >= t ? 1 : 0;
      });
    }, e.prototype.logicalNot = function (e) {
      for (var t = e.dataSync(), n = new Int32Array(t.length), r = 0; r < t.length; ++r) n[r] = t[r] ? 0 : 1;return Tensor.make(e.shape, { values: n }, "bool");
    }, e.prototype.logicalAnd = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e && t;
      });
    }, e.prototype.logicalOr = function (e, t) {
      return this.broadcastedBinaryOp(e, t, "bool", function (e, t) {
        return e || t;
      });
    }, e.prototype.where = function (e, t, n, r) {
      for (var o = e.dataSync(), a = t.dataSync(), i = n.dataSync(), s = zeros(t.shape, r), u = s.dataSync(), l = 0, c = 0 === e.rank || e.rank > 1 || 1 === t.rank ? 1 : t.shape[1], d = 0; d < o.length; d++) for (var p = 0; p < c; p++) 1 === o[d] ? u[l++] = a[d] : u[l++] = i[d];return s;
    }, e.prototype.topKValues = function (e, t) {
      return this.topK(e, t).values;
    }, e.prototype.topKIndices = function (e, t) {
      return this.topK(e, t).indices;
    }, e.prototype.topK = function (e, t) {
      for (var n = e.dataSync(), r = [], o = 0; o < n.length; o++) r.push({ value: n[o], index: o });r.sort(function (e, t) {
        return t.value - e.value;
      });var a = getTypedArrayFromDType(e.dtype, t),
          i = new Int32Array(t);for (o = 0; o < t; o++) a[o] = r[o].value, i[o] = r[o].index;return { values: tensor1d(a, e.dtype), indices: tensor1d(i, "int32") };
    }, e.prototype.min = function (e, t) {
      assertAxesAreInnerMostDims("min", t, e.rank);for (var n = computeOutAndReduceShapes(e.shape, t), r = n[0], o = n[1], a = zeros(r, e.dtype), i = sizeFromShape(o), s = a.dataSync(), u = e.dataSync(), l = 0; l < s.length; ++l) {
        for (var c = l * i, d = u[c], p = 0; p < i; ++p) {
          var h = u[c + p];h < d && (d = h);
        }s[l] = d;
      }return a;
    }, e.prototype.minimum = function (e, t) {
      return this.broadcastedBinaryOp(e, t, e.dtype, function (e, t) {
        return Math.min(e, t);
      });
    }, e.prototype.mod = function (e, t) {
      return this.broadcastedBinaryOp(e, t, e.dtype, function (e, t) {
        var n = e % t;return e < 0 && t < 0 || e >= 0 && t >= 0 ? n : (n + t) % t;
      });
    }, e.prototype.max = function (e, t) {
      assertAxesAreInnerMostDims("max", t, e.rank);for (var n = computeOutAndReduceShapes(e.shape, t), r = n[0], o = n[1], a = zeros(r, e.dtype), i = sizeFromShape(o), s = a.dataSync(), u = e.dataSync(), l = 0; l < s.length; ++l) {
        for (var c = l * i, d = u[c], p = 0; p < i; ++p) {
          var h = u[c + p];h > d && (d = h);
        }s[l] = d;
      }return a;
    }, e.prototype.maximum = function (e, t) {
      return this.broadcastedBinaryOp(e, t, e.dtype, function (e, t) {
        return Math.max(e, t);
      });
    }, e.prototype.all = function (e, t) {
      assertAxesAreInnerMostDims("all", t, e.rank);for (var n = computeOutAndReduceShapes(e.shape, t), r = n[0], o = n[1], a = zeros(r, e.dtype), i = sizeFromShape(o), s = a.dataSync(), u = e.dataSync(), l = 0; l < s.length; ++l) {
        for (var c = l * i, d = u[c], p = 0; p < i; ++p) {
          var h = u[c + p];d = d && h;
        }s[l] = d;
      }return a;
    }, e.prototype.any = function (e, t) {
      assertAxesAreInnerMostDims("any", t, e.rank);for (var n = computeOutAndReduceShapes(e.shape, t), r = n[0], o = n[1], a = zeros(r, e.dtype), i = sizeFromShape(o), s = a.dataSync(), u = e.dataSync(), l = 0; l < s.length; ++l) {
        for (var c = l * i, d = u[c], p = 0; p < i; ++p) {
          var h = u[c + p];d = d || h;
        }s[l] = d;
      }return a;
    }, e.prototype.squaredDifference = function (e, t) {
      return this.broadcastedBinaryOp(e, t, e.dtype, function (e, t) {
        var n = e - t;return n * n;
      });
    }, e.prototype.ceil = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) n[r] = Math.ceil(t[r]);return Tensor.make(e.shape, { values: n });
    }, e.prototype.floor = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) n[r] = Math.floor(t[r]);return Tensor.make(e.shape, { values: n });
    }, e.prototype.sign = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) t[r] < 0 ? n[r] = -1 : t[r] > 0 ? n[r] = 1 : n[r] = 0;return Tensor.make(e.shape, { values: n });
    }, e.prototype.round = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) {
        var o = Math.floor(t[r]);t[r] - o < .5 ? n[r] = Math.floor(t[r]) : t[r] - o > .5 ? n[r] = Math.ceil(t[r]) : n[r] = o % 2 == 0 ? o : o + 1;
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.exp = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) n[r] = Math.exp(t[r]);return Tensor.make(e.shape, { values: n });
    }, e.prototype.expm1 = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) n[r] = Math.expm1(t[r]);return Tensor.make(e.shape, { values: n });
    }, e.prototype.log = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) {
        var o = t[r];n[r] = Math.log(o);
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.log1p = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) {
        var o = t[r];n[r] = Math.log1p(o);
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.sqrt = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) {
        var o = t[r];n[r] = Math.sqrt(o);
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.rsqrt = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) {
        var o = t[r];n[r] = 1 / Math.sqrt(o);
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.square = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) {
        var o = t[r];n[r] = o * o;
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.reciprocal = function (e) {
      for (var t = e.dataSync(), n = new Float32Array(t.length), r = 0; r < t.length; ++r) n[r] = 1 / t[r];return Tensor.make(e.shape, { values: n });
    }, e.prototype.relu = function (e) {
      for (var t = zeros(e.shape, e.dtype), n = t.dataSync(), r = e.dataSync(), o = 0; o < r.length; ++o) n[o] = Math.max(0, r[o]);return t;
    }, e.prototype.elu = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) {
        var o = n[r];t[r] = o >= 0 ? o : Math.exp(o) - 1;
      }return Tensor.make(e.shape, { values: t });
    }, e.prototype.eluDer = function (e, t) {
      for (var n = new Float32Array(t.size), r = t.dataSync(), o = e.dataSync(), a = 0; a < r.length; ++a) {
        var i = r[a];n[a] = i >= 1 ? o[a] : o[a] * (i + 1);
      }return Tensor.make(t.shape, { values: n });
    }, e.prototype.selu = function (e) {
      for (var t = SELU_SCALEALPHA, n = SELU_SCALE, r = new Float32Array(e.size), o = e.dataSync(), a = 0; a < o.length; ++a) {
        var i = o[a];r[a] = i >= 0 ? n * i : t * (Math.exp(i) - 1);
      }return Tensor.make(e.shape, { values: r });
    }, e.prototype.clip = function (e, t, n) {
      for (var r = new Float32Array(e.size), o = e.dataSync(), a = 0; a < o.length; ++a) r[a] = Math.min(n, Math.max(t, o[a]));return Tensor.make(e.shape, { values: r });
    }, e.prototype.abs = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.abs(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.int = function (e) {
      for (var t = new Int32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = n[r];return Tensor.make(e.shape, { values: t }, "int32");
    }, e.prototype.sigmoid = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = 1 / (1 + Math.exp(-n[r]));return Tensor.make(e.shape, { values: t });
    }, e.prototype.softplus = function (e) {
      for (var t = Math.log(1.1920928955078125e-7) + 2, n = new Float32Array(e.size), r = e.dataSync(), o = 0; o < r.length; ++o) {
        var a = r[o] > -t,
            i = r[o] < t,
            s = Math.exp(r[o]),
            u = void 0;u = i ? s : a ? r[o] : Math.log(1 + s), n[o] = u;
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.sin = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.sin(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.cos = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.cos(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.tan = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.tan(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.asin = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.asin(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.acos = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.acos(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.atan = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.atan(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.atan2 = function (e, t) {
      return this.broadcastedBinaryOp(e, t, e.dtype, function (e, t) {
        return Math.atan2(e, t);
      });
    }, e.prototype.sinh = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.sinh(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.cosh = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.cosh(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.tanh = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = tanh(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.asinh = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.asinh(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.acosh = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.acosh(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.atanh = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = 0; r < n.length; ++r) t[r] = Math.atanh(n[r]);return Tensor.make(e.shape, { values: t });
    }, e.prototype.erf = function (e) {
      for (var t = new Float32Array(e.size), n = e.dataSync(), r = ERF_P, o = ERF_A1, a = ERF_A2, i = ERF_A3, s = ERF_A4, u = ERF_A5, l = 0; l < n.length; ++l) {
        var c = n[l],
            d = 1 / (1 + r * c);t[l] = 1 - ((((u * d + s) * d + i) * d + a) * d + o) * d * Math.exp(-c * c);
      }return Tensor.make(e.shape, { values: t });
    }, e.prototype.step = function (e, t) {
      void 0 === t && (t = 0);for (var n = new Float32Array(e.size), r = e.dataSync(), o = 0; o < r.length; ++o) {
        var a = r[o];isNaN(a) ? n[o] = NaN : n[o] = a > 0 ? 1 : t;
      }return Tensor.make(e.shape, { values: n });
    }, e.prototype.conv2d = function (e, t, n) {
      for (var r = n.filterHeight, o = n.filterWidth, a = n.dilationHeight, i = n.dilationWidth, s = n.padInfo.left, u = n.padInfo.top, l = buffer(n.outShape, e.dtype), c = 0; c < n.batchSize; ++c) for (var d = 0; d < n.outChannels; ++d) for (var p = 0; p < n.outHeight; ++p) for (var h = p * n.strideHeight - s, f = 0; f < n.outWidth; ++f) {
        for (var g = f * n.strideWidth - u, m = 0, v = 0; v < r; v++) {
          var y = h + v * a;if (!(y < 0 || y >= n.inHeight)) for (var x = 0; x < o; x++) {
            var T = g + x * i;if (!(T < 0 || T >= n.inWidth)) for (var b = 0; b < n.inChannels; ++b) {
              m += e.get(c, y, T, b) * t.get(v, x, b, d);
            }
          }
        }l.set(m, c, p, f, d);
      }return l.toTensor();
    }, e.prototype.conv2dDerInput = function (e, t, n) {
      for (var r = buffer(n.inShape, "float32"), o = r.values, a = r.strides, i = a[0], s = a[1], u = a[2], l = e.dataSync(), c = e.strides, d = c[0], p = c[1], h = c[2], f = t.dataSync(), g = t.strides, m = g[0], v = g[1], y = g[2], x = n.batchSize, T = n.filterHeight, b = n.filterWidth, S = n.inChannels, E = n.inHeight, w = n.inWidth, A = n.outChannels, R = n.outHeight, C = n.outWidth, _ = n.strideHeight, O = n.strideWidth, N = T - 1 - n.padInfo.top, I = b - 1 - n.padInfo.left, k = 0; k < x; ++k) for (var M = 0; M < S; ++M) for (var D = 0; D < E; ++D) for (var P = D - N, F = Math.max(0, Math.ceil(P / _)), L = Math.min(R, (T + P) / _), B = 0; B < w; ++B) {
        for (var U = B - I, z = Math.max(0, Math.ceil(U / O)), V = Math.min(C, (b + U) / O), G = 0, H = F; H < L; ++H) for (var W = H * _ - P, q = z; q < V; ++q) for (var $ = d * k + p * H + h * q, X = m * (T - 1 - W) + v * (b - 1 - (q * O - U)) + y * M, j = 0; j < A; ++j) {
          G += l[$ + j] * f[X + j];
        }o[i * k + s * D + u * B + M] = G;
      }return r.toTensor();
    }, e.prototype.conv2dDerFilter = function (e, t, n) {
      for (var r = n.strideHeight, o = n.strideWidth, a = n.filterHeight, i = n.filterWidth, s = buffer(n.filterShape, "float32"), u = n.padInfo.left, l = n.padInfo.top, c = 0; c < a; ++c) for (var d = Math.max(0, Math.ceil((l - c) / r)), p = Math.min(n.outHeight, (n.inHeight + l - c) / r), h = 0; h < i; ++h) for (var f = Math.max(0, Math.ceil((u - h) / o)), g = Math.min(n.outWidth, (n.inWidth + u - h) / o), m = 0; m < n.inChannels; ++m) for (var v = 0; v < n.outChannels; ++v) {
        for (var y = 0, x = 0; x < n.batchSize; ++x) for (var T = d; T < p; ++T) for (var b = c + T * r - l, S = f; S < g; ++S) {
          var E = h + S * o - u;y += e.get(x, b, E, m) * t.get(x, T, S, v);
        }s.set(y, c, h, m, v);
      }return s.toTensor();
    }, e.prototype.depthwiseConv2D = function (e, t, n) {
      for (var r = n.filterHeight, o = n.filterWidth, a = n.dilationHeight, i = n.dilationWidth, s = n.padInfo.left, u = n.padInfo.top, l = n.outChannels / n.inChannels, c = buffer(n.outShape, e.dtype), d = 0; d < n.batchSize; ++d) for (var p = 0; p < n.inChannels; ++p) for (var h = 0; h < n.outHeight; ++h) for (var f = h * n.strideHeight - s, g = 0; g < n.outWidth; ++g) for (var m = g * n.strideWidth - u, v = 0; v < l; ++v) {
        for (var y = 0, x = 0; x < r; ++x) {
          var T = f + x * a;if (!(T < 0 || T >= n.inHeight)) for (var b = 0; b < o; ++b) {
            var S = m + b * i;if (!(S < 0 || S >= n.inWidth)) y += e.get(d, T, S, p) * t.get(x, b, p, v);
          }
        }c.set(y, d, h, g, p * l + v);
      }return c.toTensor();
    }, e.prototype.depthwiseConv2DDerInput = function (e, t, n) {
      for (var r = buffer(n.inShape, "float32"), o = r.values, a = r.strides, i = a[0], s = a[1], u = a[2], l = e.dataSync(), c = e.strides, d = c[0], p = c[1], h = c[2], f = t.dataSync(), g = t.strides, m = g[0], v = g[1], y = g[2], x = n.batchSize, T = n.filterHeight, b = n.filterWidth, S = n.inChannels, E = n.inHeight, w = n.inWidth, A = n.outChannels, R = n.outHeight, C = n.outWidth, _ = n.strideHeight, O = n.strideWidth, N = T - 1 - n.padInfo.top, I = b - 1 - n.padInfo.left, k = A / S, M = 0; M < x; ++M) for (var D = 0; D < S; ++D) for (var P = 0; P < E; ++P) for (var F = P - N, L = Math.max(0, Math.ceil(F / _)), B = Math.min(R, (T + F) / _), U = 0; U < w; ++U) {
        for (var z = U - I, V = Math.max(0, Math.ceil(z / O)), G = Math.min(C, (b + z) / O), H = 0, W = L; W < B; ++W) for (var q = W * _ - F, $ = V; $ < G; ++$) for (var X = d * M + p * W + h * $, j = m * (T - 1 - q) + v * (b - 1 - ($ * O - z)) + y * D, K = 0; K < k; ++K) {
          H += l[X + (D * k + K)] * f[j + K];
        }o[i * M + s * P + u * U + D] = H;
      }return r.toTensor();
    }, e.prototype.depthwiseConv2DDerFilter = function (e, t, n) {
      for (var r = n.strideHeight, o = n.strideWidth, a = n.filterHeight, i = n.filterWidth, s = buffer(n.filterShape, "float32"), u = n.padInfo.left, l = n.padInfo.top, c = n.outChannels / n.inChannels, d = 0; d < a; ++d) for (var p = Math.max(0, Math.ceil((l - d) / r)), h = Math.min(n.outHeight, (n.inHeight + l - d) / r), f = 0; f < i; ++f) for (var g = Math.max(0, Math.ceil((u - f) / o)), m = Math.min(n.outWidth, (n.inWidth + u - f) / o), v = 0; v < n.outChannels; ++v) {
        for (var y = Math.trunc(v / c), x = v % c, T = 0, b = 0; b < n.batchSize; ++b) for (var S = p; S < h; ++S) for (var E = d + S * r - l, w = g; w < m; ++w) {
          var A = f + w * o - u;T += e.get(b, E, A, y) * t.get(b, S, w, v);
        }s.set(T, d, f, y, x);
      }return s.toTensor();
    }, e.prototype.tile = function (e, t) {
      for (var n = new Array(e.rank), r = 0; r < n.length; r++) n[r] = e.shape[r] * t[r];var o = buffer(n, e.dtype),
          a = e.buffer();for (r = 0; r < o.values.length; ++r) {
        for (var i = o.indexToLoc(r), s = new Array(e.rank), u = 0; u < s.length; u++) s[u] = i[u] % e.shape[u];var l = a.locToIndex(s);o.values[r] = a.values[l];
      }return o.toTensor();
    }, e.prototype.pad = function (e, t, n) {
      var r = t.map(function (t, n) {
        return t[0] + e.shape[n] + t[1];
      }),
          o = t.map(function (e) {
        return e[0];
      }),
          a = e.buffer(),
          i = buffer(r, e.dtype);0 !== n && i.values.fill(n);for (var s = 0; s < e.size; s++) {
        var u = a.indexToLoc(s),
            l = u.map(function (e, t) {
          return e + o[t];
        });i.set.apply(i, [e.get.apply(e, u)].concat(l));
      }return i.toTensor();
    }, e.prototype.transpose = function (e, t) {
      for (var n = new Array(e.rank), r = 0; r < n.length; r++) n[r] = e.shape[t[r]];var o = e.dataSync(),
          a = buffer(n, e.dtype),
          i = e.buffer();for (r = 0; r < e.size; ++r) {
        for (var s = i.indexToLoc(r), u = new Array(s.length), l = 0; l < u.length; l++) u[l] = s[t[l]];var c = a.locToIndex(u);a.values[c] = o[r];
      }return a.toTensor();
    }, e.prototype.gather = function (e, t, n) {
      var r = e.shape.slice(),
          o = t.dataSync();r[n] = o.length;for (var a = buffer(r, e.dtype), i = e.buffer(), s = 0; s < a.size; ++s) {
        var u = a.indexToLoc(s),
            l = u.slice();l[n] = o[u[n]];var c = i.locToIndex(l);a.values[s] = i.values[c];
      }return a.toTensor();
    }, e.prototype.pool = function (e, t, n) {
      for (var r = t.strideHeight, o = t.strideWidth, a = t.filterHeight, i = t.filterWidth, s = buffer(t.outShape, "float32"), u = t.padInfo.top, l = t.padInfo.left, c = 0; c < t.batchSize; ++c) for (var d = 0; d < t.inChannels; ++d) for (var p = 0; p < t.outHeight; ++p) for (var h = p * r - u, f = Math.max(0, h), g = Math.min(t.inHeight, a + h), m = 0; m < t.outWidth; ++m) {
        for (var v = m * o - l, y = Math.max(0, v), x = Math.min(t.inWidth, i + v), T = "max" === n ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, b = 0, S = 0, E = f; E < g; ++E) {
          for (var w = y; w < x; ++w) {
            var A = e.get(c, E, w, d);"max" === n && A > T ? T = A : "avg" === n && (b += A, S++);
          }if (isNaN(T)) break;
        }s.set("avg" === n ? b / S : T, c, p, m, d);
      }return s.toTensor();
    }, e.prototype.maxPool = function (e, t) {
      return this.pool(e, t, "max");
    }, e.prototype.maxPoolPositions = function (e, t) {
      for (var n = buffer(t.outShape, "int32"), r = t.strideHeight, o = t.strideWidth, a = t.filterHeight, i = t.filterWidth, s = t.padInfo.top, u = t.padInfo.left, l = 0; l < t.batchSize; ++l) for (var c = 0; c < t.inChannels; ++c) for (var d = 0; d < t.outHeight; ++d) for (var p = d * r - s, h = Math.max(0, p), f = Math.min(t.inHeight, a + p), g = 0; g < t.outWidth; ++g) {
        for (var m = g * o - u, v = Math.max(0, m), y = Math.min(t.inWidth, i + m), x = Number.NEGATIVE_INFINITY, T = -1, b = h; b < f; ++b) for (var S = b - p, E = v; E < y; ++E) {
          var w = E - m,
              A = e.get(l, b, E, c);A > x && (x = A, T = S * i + w);
        }n.set(T, l, d, g, c);
      }return n.toTensor();
    }, e.prototype.maxPoolBackprop = function (e, t, n, r) {
      for (var o = this.maxPoolPositions(t, r), a = r.strideHeight, i = r.strideWidth, s = r.filterHeight, u = r.filterWidth, l = u - 1 - r.padInfo.left, c = s - 1 - r.padInfo.top, d = buffer(t.shape, "float32"), p = 0; p < r.batchSize; ++p) for (var h = 0; h < r.inChannels; ++h) for (var f = 0; f < r.inHeight; ++f) for (var g = 0; g < r.inWidth; ++g) {
        for (var m = f - c, v = g - l, y = 0, x = 0; x < s; ++x) {
          var T = (m + x) / a;if (!(T < 0 || T >= r.outHeight || Math.floor(T) !== T)) for (var b = 0; b < u; ++b) {
            var S = (v + b) / i;if (!(S < 0 || S >= r.outWidth || Math.floor(S) !== S)) {
              var E = s * u - 1 - o.get(p, T, S, h) === x * u + b ? 1 : 0;if (0 !== E) y += e.get(p, T, S, h) * E;
            }
          }
        }d.set(y, p, f, g, h);
      }return d.toTensor();
    }, e.prototype.avgPoolBackprop = function (e, t, n) {
      for (var r = n.strideHeight, o = n.strideWidth, a = n.filterHeight, i = n.filterWidth, s = i - 1 - n.padInfo.left, u = a - 1 - n.padInfo.top, l = buffer(t.shape, "float32"), c = 1 / (a * i), d = 0; d < n.batchSize; ++d) for (var p = 0; p < n.inChannels; ++p) for (var h = 0; h < n.inHeight; ++h) for (var f = 0; f < n.inWidth; ++f) {
        for (var g = h - u, m = f - s, v = 0, y = 0; y < a; ++y) {
          var x = (g + y) / r;if (!(x < 0 || x >= n.outHeight || Math.floor(x) !== x)) for (var T = 0; T < i; ++T) {
            var b = (m + T) / o;if (!(b < 0 || b >= n.outWidth || Math.floor(b) !== b)) v += e.get(d, x, b, p);
          }
        }l.set(v * c, d, h, f, p);
      }return l.toTensor();
    }, e.prototype.cast = function (e, t) {
      return castTensor(e, t, this);
    }, e.prototype.reshape = function (e, t) {
      return reshapeTensor(e, t);
    }, e.prototype.avgPool = function (e, t) {
      return this.pool(e, t, "avg").toFloat();
    }, e.prototype.resizeBilinear = function (e, t, n, r) {
      for (var o = e.shape, a = o[0], i = o[1], s = o[2], u = o[3], l = buffer([a, t, n, u], e.dtype), c = [r && t > 1 ? i - 1 : i, r && n > 1 ? s - 1 : s], d = [r && t > 1 ? t - 1 : t, r && n > 1 ? n - 1 : n], p = 0; p < a; p++) for (var h = 0; h < t; h++) for (var f = 0; f < n; f++) for (var g = 0; g < u; g++) {
        var m = c[0] * h / d[0],
            v = c[1] * f / d[1],
            y = Math.floor(m),
            x = Math.min(i - 1, Math.ceil(m)),
            T = Math.floor(v),
            b = Math.min(s - 1, Math.ceil(v)),
            S = e.get(p, y, T, g),
            E = e.get(p, x, T, g),
            w = v - T,
            A = S + (e.get(p, y, b, g) - S) * w,
            R = A + (E + (e.get(p, x, b, g) - E) * w - A) * (m - y);l.set(R, p, h, f, g);
      }return l.toTensor();
    }, e.prototype.resizeBilinearBackprop = function (e, t, n) {
      for (var r = t.shape, o = r[0], a = r[1], i = r[2], s = r[3], u = e.shape, l = u[1], c = u[2], d = buffer([o, a, i, s], t.dtype), p = [n && l > 1 ? a - 1 : a, n && c > 1 ? i - 1 : i], h = [n && l > 1 ? l - 1 : l, n && c > 1 ? c - 1 : c], f = p[0] / h[0], g = p[1] / h[1], m = 0; m < o; m++) for (var v = 0; v < l; v++) for (var y = v * f, x = Math.floor(y), T = Math.min(Math.ceil(y), a - 1), b = y - x, S = 1 - b, E = 0; E < c; E++) for (var w = E * g, A = Math.floor(w), R = Math.min(Math.ceil(w), i - 1), C = w - A, _ = 1 - C, O = 0; O < s; O++) {
        var N = e.get(m, v, E, O),
            I = d.get(m, x, A, O);I += N * S * _, d.set(I, m, x, A, O);var k = d.get(m, x, R, O);k += N * S * C, d.set(k, m, x, R, O);var M = d.get(m, T, A, O);M += N * b * _, d.set(M, m, T, A, O);var D = d.get(m, T, R, O);D += N * b * C, d.set(D, m, T, R, O);
      }return d.toTensor();
    }, e.prototype.resizeNearestNeighbor = function (e, t, n, r) {
      for (var o = e.shape, a = o[0], i = o[1], s = o[2], u = o[3], l = buffer([a, t, n, u], e.dtype), c = [r && t > 1 ? i - 1 : i, r && n > 1 ? s - 1 : s], d = [r && t > 1 ? t - 1 : t, r && n > 1 ? n - 1 : n], p = 0; p < a; p++) for (var h = 0; h < t; h++) for (var f = 0; f < n; f++) for (var g = 0; g < u; g++) {
        var m = c[0] * h / d[0],
            v = c[1] * f / d[1],
            y = Math.min(i - 1, r ? Math.round(m) : Math.floor(m)),
            x = Math.min(s - 1, r ? Math.round(v) : Math.floor(v)),
            T = e.get(p, y, x, g);l.set(T, p, h, f, g);
      }return l.toTensor();
    }, e.prototype.resizeNearestNeighborBackprop = function (e, t, n) {
      for (var r = t.shape, o = r[0], a = r[1], i = r[2], s = r[3], u = e.shape, l = u[1], c = u[2], d = buffer([o, a, i, s], t.dtype), p = [n && l > 1 ? a - 1 : a, n && c > 1 ? i - 1 : i], h = [n && l > 1 ? l - 1 : l, n && c > 1 ? c - 1 : c], f = 1 / (p[0] / h[0]), g = 1 / (p[1] / h[1]), m = 2 * Math.ceil(f) + 2, v = 2 * Math.ceil(g) + 2, y = 0; y < o; y++) for (var x = 0; x < a; x++) for (var T = 0; T < i; T++) for (var b = Math.floor(x * f), S = Math.floor(b - m / 2), E = Math.floor(T * g), w = Math.floor(E - v / 2), A = 0; A < s; A++) {
        for (var R = 0, C = 0; C < m; C++) {
          var _ = C + S;if (!(_ < 0 || _ >= l)) for (var O = 0; O < v; O++) {
            var N = O + w;if (!(N < 0 || N >= c)) {
              var I = p[0] * (_ / h[0]),
                  k = p[1] * (N / h[1]),
                  M = Math.min(a - 1, n ? Math.round(I) : Math.floor(I)),
                  D = Math.min(i - 1, n ? Math.round(k) : Math.floor(k));x === M && T === D && (R += e.get(y, _, N, A));
            }
          }
        }d.set(R, y, x, T, A);
      }return d.toTensor();
    }, e.prototype.batchNormalization = function (e, t, n, r, o, a) {
      for (var i = e.dataSync(), s = t.dataSync(), u = n.dataSync(), l = o ? o.dataSync() : new Float32Array([1]), c = a ? a.dataSync() : new Float32Array([0]), d = new Float32Array(i.length), p = 0; p < i.length; p++) d[p] = c[p % c.length] + (i[p] - s[p % s.length]) * l[p % l.length] / Math.sqrt(u[p % u.length] + r);return tensor4d(d, e.shape);
    }, e.prototype.localResponseNormalization4D = function (e, t, n, r, o) {
      var a = buffer(e.shape, "float32"),
          i = t,
          s = a.shape[3] - 1;function u(t, n, r, o) {
        for (var a = 0, u = Math.max(0, o - i); u <= Math.min(o + i, s); u++) {
          var l = e.get(t, n, r, u);a += l * l;
        }return a;
      }for (var l = 0; l < a.shape[0]; l++) for (var c = 0; c <= a.shape[1]; c++) for (var d = 0; d < a.shape[2]; d++) for (var p = 0; p < a.shape[3]; p++) {
        var h = u(l, c, d, p),
            f = e.get(l, c, d, p) * Math.pow(n + r * h, -o);a.set(f, l, c, d, p);
      }return a.toTensor();
    }, e.prototype.multinomial = function (e, t, n, r) {
      for (var o = t ? e : softmax(e), a = o.shape[0], i = o.shape[1], s = zeros([a, n], "int32"), u = s.dataSync(), l = o.dataSync(), c = 0; c < a; ++c) {
        var d = c * i,
            p = new Float32Array(i - 1);p[0] = l[d];for (var h = 1; h < p.length; ++h) p[h] = p[h - 1] + l[d + h];for (var f = seedrandom_1(r.toString()), g = c * n, m = 0; m < n; ++m) {
          var v = f();u[g + m] = p.length;for (var y = 0; y < p.length; y++) if (v < p[y]) {
            u[g + m] = y;break;
          }
        }
      }return s;
    }, e.prototype.oneHot = function (e, t, n, r) {
      var o = new Float32Array(e.size * t);o.fill(r);for (var a = 0; a < e.size; ++a) e.get(a) >= 0 && e.get(a) < t && (o[a * t + e.get(a)] = n);return tensor2d(o, [e.size, t], "int32");
    }, e.prototype.broadcastedBinaryOp = function (e, t, n, r) {
      for (var o = assertAndGetBroadcastShape(e.shape, t.shape), a = buffer(o, n), i = e.dataSync(), s = t.dataSync(), u = getBroadcastDims(e.shape, o), l = getBroadcastDims(t.shape, o), c = e.buffer(), d = t.buffer(), p = function (n) {
        var o = a.indexToLoc(n),
            p = o.slice(-e.rank);u.forEach(function (e) {
          return p[e] = 0;
        });var h = c.locToIndex(p),
            f = o.slice(-t.rank);l.forEach(function (e) {
          return f[e] = 0;
        });var g = d.locToIndex(f);a.values[n] = r(i[h], s[g]);
      }, h = 0; h < a.values.length; ++h) p(h);return a.toTensor();
    }, e.prototype.dispose = function () {}, e;
  }();ENV.registerBackend("cpu", function () {
    return new MathBackendCPU();
  }, 1, setTensorTracker);var delayCallback = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : setImmediate,
      BrowserUtil = function () {
    function e() {}return e.nextFrame = function () {
      return new Promise(function (e) {
        return delayCallback(function () {
          return e();
        });
      });
    }, __decorate([doc({ heading: "Performance", subheading: "Timing" })], e, "nextFrame", null), e;
  }(),
      DTYPE_VALUE_SIZE_MAP = { float32: 4, int32: 4, uint16: 2, uint8: 1, bool: 1 };function encodeWeights(e) {
    return __awaiter(this, void 0, void 0, function () {
      var t, n, r, o;return __generator(this, function (a) {
        switch (a.label) {case 0:
            for (r in t = [], n = [], e) {
              if ("float32" !== (o = e[r]).dtype && "int32" !== o.dtype && "bool" !== o.dtype) throw new Error("Unsupported dtype in weight '" + r + "': " + o.dtype);t.push({ name: r, shape: o.shape, dtype: o.dtype }), n.push(o.data());
            }return [4, Promise.all(n)];case 1:
            return [2, { data: concatenateTypedArrays(a.sent()), specs: t }];}
      });
    });
  }function decodeWeights(e, t) {
    for (var n = {}, r = 0, o = 0, a = t; o < a.length; o++) {
      var i = a[o],
          s = i.name,
          u = i.dtype,
          l = i.shape;if (null != i.quantization) throw new Error("decodeWeights does not support quantization yet, but encountered weight '" + s + " with quantization.'");var c = sizeFromShape(l),
          d = void 0;if ("float32" === u) d = tensor(new Float32Array(e, r, c), l, "float32");else if ("int32" === u) d = tensor(new Int32Array(e, r, c), l, "int32");else {
        if ("bool" !== u) throw new Error("Unsupported dtype in weight '" + s + "': " + u);d = tensor(new Uint8Array(e, r, c), l, "bool");
      }n[s] = d, r += c * DTYPE_VALUE_SIZE_MAP[u];
    }return n;
  }function concatenateTypedArrays(e) {
    if (null === e) throw new Error("Invalid input value: " + JSON.stringify(e));var t = 0;e.forEach(function (e) {
      if (e instanceof Float32Array || e instanceof Int32Array) t += e.buffer.byteLength;else {
        if (!(e instanceof Uint8Array)) throw new Error("Unsupported TypedArray subtype: " + e.constructor.name);t += e.buffer.byteLength;
      }
    });var n = new Uint8Array(t),
        r = 0;return e.forEach(function (e) {
      n.set(new Uint8Array(e.buffer), r), r += e.buffer.byteLength;
    }), n.buffer;
  }var useNodeBuffer = "undefined" != typeof Buffer && ("undefined" == typeof Blob || "undefined" == typeof atob || "undefined" == typeof btoa);function stringByteLength(e) {
    return useNodeBuffer ? Buffer.byteLength(e) : new Blob([e]).size;
  }function arrayBufferToBase64String(e) {
    return useNodeBuffer ? Buffer.from(e).toString("base64") : btoa(String.fromCharCode.apply(null, new Uint8Array(e)));
  }function base64StringToArrayBuffer(e) {
    if (useNodeBuffer) {
      var t = Buffer.from(e, "base64");return t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
    }for (var n = atob(e), r = new Uint8Array(n.length), o = 0; o < n.length; ++o) r.set([n.charCodeAt(o)], o);return r.buffer;
  }function concatenateArrayBuffers(e) {
    var t = 0;e.forEach(function (e) {
      t += e.byteLength;
    });var n = new Uint8Array(t),
        r = 0;return e.forEach(function (e) {
      n.set(new Uint8Array(e), r), r += e.byteLength;
    }), n.buffer;
  }function basename(e) {
    for (e = e.trim(); e.endsWith("/");) e = e.slice(0, e.length - 1);var t = e.split("/");return t[t.length - 1];
  }function getModelArtifactsInfoForJSON(e) {
    if (e.modelTopology instanceof ArrayBuffer) throw new Error("Expected JSON model topology, received ArrayBuffer.");return { dateSaved: new Date(), modelTopologyType: "JSON", modelTopologyBytes: null == e.modelTopology ? 0 : stringByteLength(JSON.stringify(e.modelTopology)), weightSpecsBytes: null == e.weightSpecs ? 0 : stringByteLength(JSON.stringify(e.weightSpecs)), weightDataBytes: null == e.weightData ? 0 : e.weightData.byteLength };
  }var IORouterRegistry = function () {
    function e() {
      this.saveRouters = [], this.loadRouters = [];
    }return e.getInstance = function () {
      return null == e.instance && (e.instance = new e()), e.instance;
    }, e.registerSaveRouter = function (t) {
      e.getInstance().saveRouters.push(t);
    }, e.registerLoadRouter = function (t) {
      e.getInstance().loadRouters.push(t);
    }, e.getSaveHandlers = function (t) {
      return e.getHandlers(t, "save");
    }, e.getLoadHandlers = function (t) {
      return e.getHandlers(t, "load");
    }, e.getHandlers = function (e, t) {
      var n = [];return ("load" === t ? this.getInstance().loadRouters : this.getInstance().saveRouters).forEach(function (t) {
        var r = t(e);null !== r && n.push(r);
      }), n;
    }, e;
  }(),
      URL_SCHEME_SUFFIX = "://",
      ModelStoreManagerRegistry = function () {
    function e() {
      this.managers = {};
    }return e.getInstance = function () {
      return null == e.instance && (e.instance = new e()), e.instance;
    }, e.registerManager = function (t, n) {
      assert(null != t, "scheme must not be undefined or null."), t.endsWith(URL_SCHEME_SUFFIX) && (t = t.slice(0, t.indexOf(URL_SCHEME_SUFFIX))), assert(t.length > 0, "scheme must not be an empty string.");var r = e.getInstance();assert(null == r.managers[t], "A model store manager is already registered for scheme '" + t + "'."), r.managers[t] = n;
    }, e.getManager = function (e) {
      var t = this.getInstance().managers[e];if (null == t) throw new Error("Cannot find model manager for scheme '" + e + "'");return t;
    }, e.getSchemes = function () {
      return Object.keys(this.getInstance().managers);
    }, e;
  }();function parseURL(e) {
    if (-1 === e.indexOf(URL_SCHEME_SUFFIX)) throw new Error("The url string provided does not contain a scheme. Supported schemes are: " + ModelStoreManagerRegistry.getSchemes().join(","));return { scheme: e.split(URL_SCHEME_SUFFIX)[0], path: e.split(URL_SCHEME_SUFFIX)[1] };
  }function cloneModelInternal(e, t, n) {
    return void 0 === n && (n = !1), __awaiter(this, void 0, void 0, function () {
      var r, o, a, i, s, u, l, c, d;return __generator(this, function (p) {
        switch (p.label) {case 0:
            return assert(e !== t, "Old path and new path are the same: '" + e + "'"), assert((r = IORouterRegistry.getLoadHandlers(e)).length > 0, "Copying failed because no load handler is found for source URL " + e + "."), assert(r.length < 2, "Copying failed because more than one (" + r.length + ") load handlers for source URL " + e + "."), o = r[0], assert((a = IORouterRegistry.getSaveHandlers(t)).length > 0, "Copying failed because no save handler is found for destination URL " + t + "."), assert(a.length < 2, "Copying failed because more than one (" + r.length + ") save handlers for destination URL " + t + "."), i = a[0], s = parseURL(e).scheme, u = parseURL(e).path, l = s === parseURL(e).scheme, [4, o.load()];case 1:
            return c = p.sent(), n && l ? [4, ModelStoreManagerRegistry.getManager(s).removeModel(u)] : [3, 3];case 2:
            p.sent(), p.label = 3;case 3:
            return [4, i.save(c)];case 4:
            return d = p.sent(), !n || l ? [3, 6] : [4, ModelStoreManagerRegistry.getManager(s).removeModel(u)];case 5:
            p.sent(), p.label = 6;case 6:
            return [2, d.modelArtifactsInfo];}
      });
    });
  }var ModelManagement = function () {
    function e() {}return e.listModels = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e, t, n, r, o, a, i;return __generator(this, function (s) {
          switch (s.label) {case 0:
              e = ModelStoreManagerRegistry.getSchemes(), t = {}, n = 0, r = e, s.label = 1;case 1:
              return n < r.length ? (o = r[n], [4, ModelStoreManagerRegistry.getManager(o).listModels()]) : [3, 4];case 2:
              for (i in a = s.sent()) t[o + URL_SCHEME_SUFFIX + i] = a[i];s.label = 3;case 3:
              return n++, [3, 1];case 4:
              return [2, t];}
        });
      });
    }, e.removeModel = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t;return __generator(this, function (n) {
          switch (n.label) {case 0:
              return t = parseURL(e), [4, ModelStoreManagerRegistry.getManager(t.scheme).removeModel(t.path)];case 1:
              return [2, n.sent()];}
        });
      });
    }, e.copyModel = function (e, t) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (n) {
          switch (n.label) {case 0:
              return [4, cloneModelInternal(e, t, !1)];case 1:
              return [2, n.sent()];}
        });
      });
    }, e.moveModel = function (e, t) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (n) {
          switch (n.label) {case 0:
              return [4, cloneModelInternal(e, t, !0)];case 1:
              return [2, n.sent()];}
        });
      });
    }, __decorate([doc({ heading: "Models", subheading: "Management", namespace: "io" })], e, "listModels", null), __decorate([doc({ heading: "Models", subheading: "Management", namespace: "io" })], e, "removeModel", null), __decorate([doc({ heading: "Models", subheading: "Management", namespace: "io" })], e, "copyModel", null), __decorate([doc({ heading: "Models", subheading: "Management", namespace: "io" })], e, "moveModel", null), e;
  }(),
      DATABASE_NAME = "tensorflowjs",
      DATABASE_VERSION = 1,
      MODEL_STORE_NAME = "models_store",
      INFO_STORE_NAME = "model_info_store";function getIndexedDBFactory() {
    if (!ENV.get("IS_BROWSER")) throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var e = window,
        t = e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB || e.shimIndexedDB;if (null == t) throw new Error("The current browser does not appear to support IndexedDB.");return t;
  }function setUpDatabase(e) {
    var t = e.result;t.createObjectStore(MODEL_STORE_NAME, { keyPath: "modelPath" }), t.createObjectStore(INFO_STORE_NAME, { keyPath: "modelPath" });
  }var BrowserIndexedDB = function () {
    function e(e) {
      if (this.indexedDB = getIndexedDBFactory(), null == e || !e) throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath = e;
    }return e.prototype.save = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (t) {
          if (e.modelTopology instanceof ArrayBuffer) throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return [2, this.databaseAction(this.modelPath, e)];
        });
      });
    }, e.prototype.load = function () {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (e) {
          return [2, this.databaseAction(this.modelPath)];
        });
      });
    }, e.prototype.databaseAction = function (e, t) {
      var n = this;return new Promise(function (e, r) {
        var o = n.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);o.onupgradeneeded = function () {
          return setUpDatabase(o);
        }, o.onsuccess = function () {
          var a = o.result;if (null == t) {
            var i = a.transaction(MODEL_STORE_NAME, "readonly"),
                s = i.objectStore(MODEL_STORE_NAME).get(n.modelPath);s.onsuccess = function () {
              if (null == s.result) return a.close(), r(new Error("Cannot find model with path '" + n.modelPath + "' in IndexedDB."));e(s.result.modelArtifacts);
            }, s.onerror = function (e) {
              return a.close(), r(s.error);
            }, i.oncomplete = function () {
              return a.close();
            };
          } else {
            var u,
                l = getModelArtifactsInfoForJSON(t),
                c = a.transaction(INFO_STORE_NAME, "readwrite"),
                d = c.objectStore(INFO_STORE_NAME),
                p = d.put({ modelPath: n.modelPath, modelArtifactsInfo: l });p.onsuccess = function () {
              var o = (u = a.transaction(MODEL_STORE_NAME, "readwrite")).objectStore(MODEL_STORE_NAME).put({ modelPath: n.modelPath, modelArtifacts: t, modelArtifactsInfo: l });o.onsuccess = function () {
                return e({ modelArtifactsInfo: l });
              }, o.onerror = function (e) {
                var t = (d = c.objectStore(INFO_STORE_NAME)).delete(n.modelPath);t.onsuccess = function () {
                  return a.close(), r(o.error);
                }, t.onerror = function (e) {
                  return a.close(), r(o.error);
                };
              };
            }, p.onerror = function (e) {
              return a.close(), r(p.error);
            }, c.oncomplete = function () {
              null == u ? a.close() : u.oncomplete = function () {
                return a.close();
              };
            };
          }
        }, o.onerror = function (e) {
          return r(o.error);
        };
      });
    }, e.URL_SCHEME = "indexeddb://", e;
  }(),
      indexedDBRouter = function (e) {
    return ENV.get("IS_BROWSER") && e.startsWith(BrowserIndexedDB.URL_SCHEME) ? browserIndexedDB(e.slice(BrowserIndexedDB.URL_SCHEME.length)) : null;
  };function browserIndexedDB(e) {
    return new BrowserIndexedDB(e);
  }function maybeStripScheme(e) {
    return e.startsWith(BrowserIndexedDB.URL_SCHEME) ? e.slice(BrowserIndexedDB.URL_SCHEME.length) : e;
  }IORouterRegistry.registerSaveRouter(indexedDBRouter), IORouterRegistry.registerLoadRouter(indexedDBRouter);var BrowserIndexedDBManager = function () {
    function e() {
      this.indexedDB = getIndexedDBFactory();
    }return e.prototype.listModels = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e = this;return __generator(this, function (t) {
          return [2, new Promise(function (t, n) {
            var r = e.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);r.onupgradeneeded = function () {
              return setUpDatabase(r);
            }, r.onsuccess = function () {
              var e = r.result,
                  o = e.transaction(INFO_STORE_NAME, "readonly"),
                  a = o.objectStore(INFO_STORE_NAME).getAll();a.onsuccess = function () {
                for (var e = {}, n = 0, r = a.result; n < r.length; n++) {
                  var o = r[n];e[o.modelPath] = o.modelArtifactsInfo;
                }t(e);
              }, a.onerror = function (t) {
                return e.close(), n(a.error);
              }, o.oncomplete = function () {
                return e.close();
              };
            }, r.onerror = function (e) {
              return n(r.error);
            };
          })];
        });
      });
    }, e.prototype.removeModel = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t = this;return __generator(this, function (n) {
          return e = maybeStripScheme(e), [2, new Promise(function (n, r) {
            var o = t.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);o.onupgradeneeded = function () {
              return setUpDatabase(o);
            }, o.onsuccess = function () {
              var t,
                  a = o.result,
                  i = a.transaction(INFO_STORE_NAME, "readwrite"),
                  s = i.objectStore(INFO_STORE_NAME),
                  u = s.get(e);u.onsuccess = function () {
                if (null == u.result) return a.close(), r(new Error("Cannot find model with path '" + e + "' in IndexedDB."));var o = s.delete(e),
                    i = function () {
                  var o = (t = a.transaction(MODEL_STORE_NAME, "readwrite")).objectStore(MODEL_STORE_NAME).delete(e);o.onsuccess = function () {
                    return n(u.result.modelArtifactsInfo);
                  }, o.onerror = function (e) {
                    return r(u.error);
                  };
                };o.onsuccess = i, o.onerror = function (e) {
                  return i(), a.close(), r(u.error);
                };
              }, u.onerror = function (e) {
                return a.close(), r(u.error);
              }, i.oncomplete = function () {
                null == t ? a.close() : t.oncomplete = function () {
                  return a.close();
                };
              };
            }, o.onerror = function (e) {
              return r(o.error);
            };
          })];
        });
      });
    }, e;
  }();if (ENV.get("IS_BROWSER")) try {
    ModelStoreManagerRegistry.registerManager(BrowserIndexedDB.URL_SCHEME, new BrowserIndexedDBManager());
  } catch (e) {}var PATH_SEPARATOR = "/",
      PATH_PREFIX = "tensorflowjs_models",
      INFO_SUFFIX = "info",
      MODEL_TOPOLOGY_SUFFIX = "model_topology",
      WEIGHT_SPECS_SUFFIX = "weight_specs",
      WEIGHT_DATA_SUFFIX = "weight_data";function getModelKeys(e) {
    return { info: [PATH_PREFIX, e, INFO_SUFFIX].join(PATH_SEPARATOR), topology: [PATH_PREFIX, e, MODEL_TOPOLOGY_SUFFIX].join(PATH_SEPARATOR), weightSpecs: [PATH_PREFIX, e, WEIGHT_SPECS_SUFFIX].join(PATH_SEPARATOR), weightData: [PATH_PREFIX, e, WEIGHT_DATA_SUFFIX].join(PATH_SEPARATOR) };
  }function getModelPathFromKey(e) {
    var t = e.split(PATH_SEPARATOR);if (t.length < 3) throw new Error("Invalid key format: " + e);return t.slice(1, t.length - 1).join(PATH_SEPARATOR);
  }function maybeStripScheme$1(e) {
    return e.startsWith(BrowserLocalStorage.URL_SCHEME) ? e.slice(BrowserLocalStorage.URL_SCHEME.length) : e;
  }var BrowserLocalStorage = function () {
    function e(e) {
      if (!ENV.get("IS_BROWSER") || void 0 === window.localStorage) throw new Error("The current environment does not support local storage.");if (this.LS = window.localStorage, null == e || !e) throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath = e, this.keys = getModelKeys(this.modelPath);
    }return e.prototype.save = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n, r, o;return __generator(this, function (a) {
          if (e.modelTopology instanceof ArrayBuffer) throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");t = JSON.stringify(e.modelTopology), n = JSON.stringify(e.weightSpecs), r = getModelArtifactsInfoForJSON(e);try {
            return this.LS.setItem(this.keys.info, JSON.stringify(r)), this.LS.setItem(this.keys.topology, t), this.LS.setItem(this.keys.weightSpecs, n), this.LS.setItem(this.keys.weightData, arrayBufferToBase64String(e.weightData)), [2, { modelArtifactsInfo: r }];
          } catch (e) {
            for (o in this.keys) this.LS.removeItem(this.keys[o]);throw new Error("Failed to save model '" + this.modelPath + "' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=" + r.modelTopologyBytes + ", weightSpecsBytes=" + r.weightSpecsBytes + ", weightDataBytes=" + r.weightDataBytes + ".");
          }return [2];
        });
      });
    }, e.prototype.load = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e, t, n, r, o;return __generator(this, function (a) {
          if (null == (e = JSON.parse(this.LS.getItem(this.keys.info)))) throw new Error("In local storage, there is no model with name '" + this.modelPath + "'");if ("JSON" !== e.modelTopologyType) throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if (t = {}, null == (n = JSON.parse(this.LS.getItem(this.keys.topology)))) throw new Error("In local storage, the topology of model '" + this.modelPath + "' is missing.");if (t.modelTopology = n, null == (r = JSON.parse(this.LS.getItem(this.keys.weightSpecs)))) throw new Error("In local storage, the weight specs of model '" + this.modelPath + "' are missing.");if (t.weightSpecs = r, null == (o = this.LS.getItem(this.keys.weightData))) throw new Error("In local storage, the binary weight values of model '" + this.modelPath + "' are missing.");return t.weightData = base64StringToArrayBuffer(o), [2, t];
        });
      });
    }, e.URL_SCHEME = "localstorage://", e;
  }(),
      localStorageRouter = function (e) {
    return ENV.get("IS_BROWSER") && e.startsWith(BrowserLocalStorage.URL_SCHEME) ? browserLocalStorage(e.slice(BrowserLocalStorage.URL_SCHEME.length)) : null;
  };function browserLocalStorage(e) {
    return new BrowserLocalStorage(e);
  }IORouterRegistry.registerSaveRouter(localStorageRouter), IORouterRegistry.registerLoadRouter(localStorageRouter);var BrowserLocalStorageManager = function () {
    function e() {
      assert(ENV.get("IS_BROWSER"), "Current environment is not a web browser"), assert(void 0 !== window.localStorage, "Current browser does not appear to support localStorage"), this.LS = window.localStorage;
    }return e.prototype.listModels = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e, t, n, r, o, a;return __generator(this, function (i) {
          for (e = {}, t = PATH_PREFIX + PATH_SEPARATOR, n = PATH_SEPARATOR + INFO_SUFFIX, r = 0; r < this.LS.length; ++r) (o = this.LS.key(r)).startsWith(t) && o.endsWith(n) && (a = getModelPathFromKey(o), e[a] = JSON.parse(this.LS.getItem(o)));return [2, e];
        });
      });
    }, e.prototype.removeModel = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n;return __generator(this, function (r) {
          if (e = maybeStripScheme$1(e), t = getModelKeys(e), null == this.LS.getItem(t.info)) throw new Error("Cannot find model at path '" + e + "'");return n = JSON.parse(this.LS.getItem(t.info)), this.LS.removeItem(t.info), this.LS.removeItem(t.topology), this.LS.removeItem(t.weightSpecs), this.LS.removeItem(t.weightData), [2, n];
        });
      });
    }, e;
  }();if (ENV.get("IS_BROWSER")) try {
    ModelStoreManagerRegistry.registerManager(BrowserLocalStorage.URL_SCHEME, new BrowserLocalStorageManager());
  } catch (e) {}var DEFAULT_FILE_NAME_PREFIX = "model",
      DEFAULT_JSON_EXTENSION_NAME = ".json",
      DEFAULT_WEIGHT_DATA_EXTENSION_NAME = ".weights.bin",
      BrowserDownloads = function () {
    function e(t) {
      if (!ENV.get("IS_BROWSER")) throw new Error("triggerDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(e.URL_SCHEME) && (t = t.slice(e.URL_SCHEME.length)), null != t && 0 !== t.length || (t = DEFAULT_FILE_NAME_PREFIX), this.modelTopologyFileName = t + DEFAULT_JSON_EXTENSION_NAME, this.weightDataFileName = t + DEFAULT_WEIGHT_DATA_EXTENSION_NAME;
    }return e.prototype.save = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n, r, o, a, i;return __generator(this, function (s) {
          if (t = window.URL.createObjectURL(new Blob([e.weightData], { type: "application/octet-stream" })), e.modelTopology instanceof ArrayBuffer) throw new Error("DownloadTrigger.save() does not support saving model topology in binary formats yet.");return n = [{ paths: ["./" + this.weightDataFileName], weights: e.weightSpecs }], r = { modelTopology: e.modelTopology, weightsManifest: n }, o = window.URL.createObjectURL(new Blob([JSON.stringify(r)], { type: "application/json" })), (a = null == this.jsonAnchor ? document.createElement("a") : this.jsonAnchor).download = this.modelTopologyFileName, a.href = o, a.click(), null != e.weightData && ((i = null == this.weightDataAnchor ? document.createElement("a") : this.weightDataAnchor).download = this.weightDataFileName, i.href = t, i.click()), [2, { modelArtifactsInfo: getModelArtifactsInfoForJSON(e) }];
        });
      });
    }, e.URL_SCHEME = "downloads://", e;
  }(),
      BrowserFiles = function () {
    function e(e) {
      if (null == e || e.length < 1) throw new Error("When calling browserFiles, at least 1 file is required, but received " + e);this.files = e;
    }return e.prototype.load = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e,
            t,
            n = this;return __generator(this, function (r) {
          return e = this.files[0], t = this.files.slice(1), [2, new Promise(function (r, o) {
            var a = new FileReader();a.onload = function (a) {
              var i = JSON.parse(a.target.result),
                  s = i.modelTopology;if (null != s) {
                0 === t.length && r({ modelTopology: s });var u = i.weightsManifest;if (null != u) {
                  var l;try {
                    l = n.checkManifestAndWeightFiles(u, t);
                  } catch (e) {
                    return void o(e);
                  }var c = [],
                      d = [],
                      p = [];u.forEach(function (e) {
                    e.paths.forEach(function (e) {
                      d.push(e), p.push(null);
                    }), c.push.apply(c, e.weights);
                  }), u.forEach(function (e) {
                    e.paths.forEach(function (e) {
                      var t = new FileReader();t.onload = function (t) {
                        var n = t.target.result,
                            o = d.indexOf(e);p[o] = n, -1 === p.indexOf(null) && r({ modelTopology: s, weightSpecs: c, weightData: concatenateArrayBuffers(p) });
                      }, t.onerror = function (t) {
                        o("Failed to weights data from file of path '" + e + "'.");
                      }, t.readAsArrayBuffer(l[e]);
                    });
                  });
                } else o(new Error("weightManifest field is missing from file " + e.name));
              } else o(new Error("modelTopology field is missing from file " + e.name));
            }, a.onerror = function (t) {
              o("Failed to read model topology and weights manifest JSON from file '" + e.name + "'. BrowserFiles supports loading Keras-style tf.Model artifacts only.");
            }, a.readAsText(e);
          })];
        });
      });
    }, e.prototype.checkManifestAndWeightFiles = function (e, t) {
      for (var n = [], r = t.map(function (e) {
        return basename(e.name);
      }), o = {}, a = 0, i = e; a < i.length; a++) {
        i[a].paths.forEach(function (e) {
          var a = basename(e);if (-1 !== n.indexOf(a)) throw new Error("Duplicate file basename found in weights manifest: '" + a + "'");if (n.push(a), -1 === r.indexOf(a)) throw new Error("Weight file with basename '" + a + "' is not provided.");o[e] = t[r.indexOf(a)];
        });
      }if (n.length !== t.length) throw new Error("Mismatch in the number of files in weights manifest (" + n.length + ") and the number of weight files provided (" + t.length + ").");return o;
    }, e;
  }(),
      browserDownloadsRouter = function (e) {
    return ENV.get("IS_BROWSER") && e.startsWith(BrowserDownloads.URL_SCHEME) ? browserDownloads(e.slice(BrowserDownloads.URL_SCHEME.length)) : null;
  };function browserDownloads(e) {
    return void 0 === e && (e = "model"), new BrowserDownloads(e);
  }function browserFiles(e) {
    return new BrowserFiles(e);
  }function loadWeightsAsArrayBuffer(e, t) {
    return __awaiter(this, void 0, void 0, function () {
      var n, r;return __generator(this, function (o) {
        switch (o.label) {case 0:
            return n = e.map(function (e) {
              return fetch(e, t);
            }), [4, Promise.all(n)];case 1:
            return r = o.sent(), [4, Promise.all(r.map(function (e) {
              return e.arrayBuffer();
            }))];case 2:
            return [2, o.sent()];}
      });
    });
  }function loadWeights(e, t, n, r) {
    return void 0 === t && (t = ""), __awaiter(this, void 0, void 0, function () {
      var o, a, i, s, u, l, c, d, p, h;return __generator(this, function (f) {
        switch (f.label) {case 0:
            if (o = e.map(function () {
              return !1;
            }), a = {}, i = null != n ? n.map(function () {
              return !1;
            }) : [], s = [], e.forEach(function (e, t) {
              var r = 0;e.weights.forEach(function (e) {
                var u = "quantization" in e ? e.quantization.dtype : e.dtype,
                    l = DTYPE_VALUE_SIZE_MAP[u] * sizeFromShape(e.shape),
                    c = function () {
                  o[t] = !0, null == a[t] && (a[t] = []), a[t].push({ manifestEntry: e, groupOffset: r, sizeBytes: l });
                };null != n ? n.forEach(function (t, n) {
                  t === e.name && (c(), i[n] = !0);
                }) : c(), s.push(e.name), r += l;
              });
            }), !i.every(function (e) {
              return e;
            })) throw u = n.filter(function (e, t) {
              return !i[t];
            }), new Error("Could not find weights in manifest with names: " + u.join(", ") + ". \nManifest JSON has weights with names: " + s.join(", ") + ".");return l = o.reduce(function (e, t, n) {
              return t && e.push(n), e;
            }, []), c = [], l.forEach(function (n) {
              e[n].paths.forEach(function (e) {
                var n = t + (t.endsWith("/") ? "" : "/") + e;c.push(n);
              });
            }), [4, loadWeightsAsArrayBuffer(c, r)];case 1:
            return d = f.sent(), p = {}, h = 0, l.forEach(function (t) {
              for (var n = e[t].paths.length, r = 0, o = 0; o < n; o++) r += d[h + o].byteLength;for (var i = new ArrayBuffer(r), s = new Uint8Array(i), u = 0, l = 0; l < n; l++) {
                var c = new Uint8Array(d[h + l]);s.set(c, u), u += c.byteLength;
              }a[t].forEach(function (e) {
                var t,
                    n = i.slice(e.groupOffset, e.groupOffset + e.sizeBytes),
                    r = e.manifestEntry.dtype;if ("quantization" in e.manifestEntry) {
                  var o = e.manifestEntry.quantization;if ("uint8" !== o.dtype && "uint16" !== o.dtype) throw new Error("Weight " + e.manifestEntry.name + " has unknown quantization dtype " + o.dtype + ".");var a = "uint8" === o.dtype ? new Uint8Array(n) : new Uint16Array(n);if ("float32" === r) t = Float32Array.from(a, function (e) {
                    return e * o.scale + o.min;
                  });else {
                    if ("int32" !== r) throw new Error("Weight " + e.manifestEntry.name + " has a dtype not supported by quantization: " + r);t = Int32Array.from(a, function (e) {
                      return Math.round(e * o.scale + o.min);
                    });
                  }
                } else if ("float32" === r) t = new Float32Array(n);else {
                  if ("int32" !== r) throw new Error("Weight " + e.manifestEntry.name + " has unknown dtype " + r + ".");t = new Int32Array(n);
                }var s = e.manifestEntry.name;if (null != p[s]) throw new Error("Duplicate weight with name " + s + ". Please make sure weights names are unique in the manifest JSON.");p[s] = tensor(t, e.manifestEntry.shape, e.manifestEntry.dtype);
              }), h += n;
            }), [2, p];}
      });
    });
  }IORouterRegistry.registerSaveRouter(browserDownloadsRouter);var BrowserHTTPRequest = function () {
    function e(e, t) {
      if (this.DEFAULT_METHOD = "POST", !ENV.get("IS_BROWSER")) throw new Error("browserHTTPRequest is not supported outside the web browser.");if (assert(null != e && e.length > 0, "URL path for browserHTTPRequest must not be null, undefined or empty."), this.path = e, null != t && null != t.body) throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit = t || {};
    }return e.prototype.save = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        var t, n, r, o;return __generator(this, function (a) {
          switch (a.label) {case 0:
              if (e.modelTopology instanceof ArrayBuffer) throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return (t = Object.assign({ method: this.DEFAULT_METHOD }, this.requestInit)).body = new FormData(), n = [{ paths: ["./model.weights.bin"], weights: e.weightSpecs }], r = { modelTopology: e.modelTopology, weightsManifest: n }, t.body.append("model.json", new Blob([JSON.stringify(r)], { type: "application/json" }), "model.json"), null != e.weightData && t.body.append("model.weights.bin", new Blob([e.weightData], { type: "application/octet-stream" }), "model.weights.bin"), [4, fetch(this.path, t)];case 1:
              if (200 === (o = a.sent()).status) return [2, { modelArtifactsInfo: getModelArtifactsInfoForJSON(e), responses: [o] }];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status " + o.status + ".");}
        });
      });
    }, e.prototype.load = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e, t, n, r, o, a, i, s, u, l, c, d;return __generator(this, function (p) {
          switch (p.label) {case 0:
              return [4, fetch(this.path, this.requestInit)];case 1:
              return [4, p.sent().json()];case 2:
              if (e = p.sent(), t = e.modelTopology, n = e.weightsManifest, null == t && null == n) throw new Error("The JSON from HTTP path " + this.path + " contains neither model topology or manifest for weights.");if (null == n) return [3, 4];for (a = e.weightsManifest, r = [], i = 0, s = a; i < s.length; i++) u = s[i], r.push.apply(r, u.weights);return (l = this.path.substring(0, this.path.lastIndexOf("/"))).endsWith("/") || (l += "/"), c = [], a.forEach(function (e) {
                e.paths.forEach(function (e) {
                  c.push(l + e);
                });
              }), d = concatenateArrayBuffers, [4, loadWeightsAsArrayBuffer(c, this.requestInit)];case 3:
              o = d.apply(void 0, [p.sent()]), p.label = 4;case 4:
              return [2, { modelTopology: t, weightSpecs: r, weightData: o }];}
        });
      });
    }, e.URL_SCHEMES = ["http://", "https://"], e;
  }(),
      httpRequestRouter = function (e) {
    if (ENV.get("IS_BROWSER")) {
      for (var t = 0, n = BrowserHTTPRequest.URL_SCHEMES; t < n.length; t++) {
        var r = n[t];if (e.startsWith(r)) return browserHTTPRequest(e);
      }return null;
    }return null;
  };function browserHTTPRequest(e, t) {
    return new BrowserHTTPRequest(e, t);
  }IORouterRegistry.registerSaveRouter(httpRequestRouter), IORouterRegistry.registerLoadRouter(httpRequestRouter);var PassthroughLoader = function () {
    function e(e, t, n) {
      this.modelTopology = e, this.weightSpecs = t, this.weightData = n;
    }return e.prototype.load = function () {
      return __awaiter(this, void 0, void 0, function () {
        var e;return __generator(this, function (t) {
          return e = {}, null != this.modelTopology && (e = __assign({ modelTopology: this.modelTopology }, e)), null != this.weightSpecs && this.weightSpecs.length > 0 && (e = __assign({ weightSpecs: this.weightSpecs }, e)), null != this.weightData && this.weightData.byteLength > 0 && (e = __assign({ weightData: this.weightData }, e)), [2, e];
        });
      });
    }, e;
  }(),
      PassthroughSaver = function () {
    function e(e) {
      this.saveHandler = e;
    }return e.prototype.save = function (e) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (t) {
          return [2, this.saveHandler(e)];
        });
      });
    }, e;
  }();function fromMemory(e, t, n) {
    return new PassthroughLoader(e, t, n);
  }function withSaveHandler(e) {
    return new PassthroughSaver(e);
  }var registerSaveRouter = IORouterRegistry.registerSaveRouter,
      registerLoadRouter = IORouterRegistry.registerLoadRouter,
      getSaveHandlers = IORouterRegistry.getSaveHandlers,
      getLoadHandlers = IORouterRegistry.getLoadHandlers,
      copyModel = ModelManagement.copyModel,
      listModels = ModelManagement.listModels,
      moveModel = ModelManagement.moveModel,
      removeModel = ModelManagement.removeModel,
      io = Object.freeze({ browserFiles: browserFiles, browserHTTPRequest: browserHTTPRequest, concatenateArrayBuffers: concatenateArrayBuffers, copyModel: copyModel, decodeWeights: decodeWeights, encodeWeights: encodeWeights, fromMemory: fromMemory, getLoadHandlers: getLoadHandlers, getModelArtifactsInfoForJSON: getModelArtifactsInfoForJSON, getSaveHandlers: getSaveHandlers, listModels: listModels, loadWeights: loadWeights, moveModel: moveModel, registerLoadRouter: registerLoadRouter, registerSaveRouter: registerSaveRouter, removeModel: removeModel, withSaveHandler: withSaveHandler }),
      Serializable = function () {
    function e() {}return e.prototype.getClassName = function () {
      return this.constructor.className;
    }, e.fromConfig = function (e, t) {
      return new e(t);
    }, e;
  }(),
      SerializationMap = function () {
    function e() {
      this.classNameMap = {};
    }return e.getMap = function () {
      return null == e.instance && (e.instance = new e()), e.instance;
    }, e.register = function (t) {
      e.getMap().classNameMap[t.className] = [t, t.fromConfig];
    }, e;
  }(),
      serialization = Object.freeze({ Serializable: Serializable, SerializationMap: SerializationMap }),
      WEBGL_ENVS = { HAS_WEBGL: !0 },
      NODE_ENVS = { IS_NODE: !0 },
      CHROME_ENVS = { IS_CHROME: !0 },
      BROWSER_ENVS = { IS_BROWSER: !0 },
      CPU_ENVS = { HAS_WEBGL: !1 },
      ALL_ENVS = {};function expectArraysClose(e, t, n) {
    if (null == n && (n = ENV.get("TEST_EPSILON")), e instanceof Tensor || t instanceof Tensor) {
      if (e instanceof Tensor && t instanceof Tensor) {
        if (e.dtype !== t.dtype) throw new Error("Arrays are of different type actual: " + e.dtype + " vs expected: " + t.dtype + ".");if (!arraysEqual(e.shape, t.shape)) throw new Error("Arrays are of different shape actual: " + e.shape + " vs expected: " + t.shape + ".");
      }
    } else {
      var r = e.constructor.name,
          o = t.constructor.name;if (r !== o) throw new Error("Arrays are of different type actual: " + r + " vs expected: " + o);
    }var a, i;if (a = e instanceof Tensor ? e.dataSync() : e, i = t instanceof Tensor ? t.dataSync() : t, a.length !== i.length) throw new Error("Arrays have different lengths actual: " + a.length + " vs expected: " + i.length + ".\nActual:   " + a + ".\nExpected: " + i + ".");for (var s = 0; s < i.length; ++s) {
      var u = a[s],
          l = i[s];if (!areClose(u, Number(l), n)) throw new Error("Arrays differ: actual[" + s + "] = " + u + ", expected[" + s + "] = " + l + ".\nActual:   " + a + ".\nExpected: " + i + ".");
    }
  }function expectPromiseToFail(e, t) {
    e().then(function () {
      return t.fail();
    }, function () {
      return t();
    });
  }function expectArraysEqual(e, t) {
    return expectArraysClose(e, t, 0);
  }function expectNumbersClose(e, t, n) {
    if (null == n && (n = ENV.get("TEST_EPSILON")), !areClose(e, t, n)) throw new Error("Numbers differ: actual === " + e + ", expected === " + t);
  }function areClose(e, t, n) {
    return !(!isNaN(e) || !isNaN(t)) || !(isNaN(e) || isNaN(t) || Math.abs(e - t) > n);
  }function expectValuesInRange(e, t, n) {
    var r;r = e instanceof Tensor ? e.dataSync() : e;for (var o = 0; o < r.length; o++) if (r[o] < t || r[o] > n) throw new Error("Value out of range:" + r[o] + " low: " + t + ", high: " + n);
  }function expectArrayBuffersEqual(e, t) {
    expect(new Float32Array(e)).toEqual(new Float32Array(t));
  }var test_util = Object.freeze({ WEBGL_ENVS: WEBGL_ENVS, NODE_ENVS: NODE_ENVS, CHROME_ENVS: CHROME_ENVS, BROWSER_ENVS: BROWSER_ENVS, CPU_ENVS: CPU_ENVS, ALL_ENVS: ALL_ENVS, expectArraysClose: expectArraysClose, expectPromiseToFail: expectPromiseToFail, expectArraysEqual: expectArraysEqual, expectNumbersClose: expectNumbersClose, expectValuesInRange: expectValuesInRange, expectArrayBuffersEqual: expectArrayBuffersEqual }),
      version = "0.12.4",
      webgl = Object.freeze({ gpgpu_util: gpgpu_util, webgl_util: webgl_util, MathBackendWebGL: MathBackendWebGL, GPGPUContext: GPGPUContext }),
      Optimizer = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends(t, e), t.prototype.minimize = function (e, t, n) {
      void 0 === t && (t = !1);var r = this.computeGradients(e, n),
          o = r.value,
          a = r.grads;return this.applyGradients(a), Object.keys(a).forEach(function (e) {
        return a[e].dispose();
      }), t ? o : (o.dispose(), null);
    }, t.prototype.computeGradients = function (e, t) {
      return variableGrads(e, t);
    }, __decorate([doc({ heading: "Training", subheading: "Optimizers" })], t.prototype, "minimize", null), t = __decorate([doc({ heading: "Training", subheading: "Classes", namespace: "train" })], t);
  }(Serializable),
      DEFAULT_FLOAT32_EPSILON = 1e-8,
      DEFAULT_FLOAT16_EPSILON = 1e-4;function getOptimizerDefaultEpsilonValue() {
    return ENV.get("WEBGL_RENDER_FLOAT32_ENABLED") ? DEFAULT_FLOAT32_EPSILON : DEFAULT_FLOAT16_EPSILON;
  }var AdadeltaOptimizer = function (e) {
    function t(t, n, r) {
      void 0 === r && (r = null);var o = e.call(this) || this;return o.learningRate = t, o.rho = n, o.epsilon = r, o.accumulatedGrads = {}, o.accumulatedUpdates = {}, o.c = keep(scalar(-t)), o.rhoScalar = keep(scalar(n)), o.oneMinusRho = keep(scalar(1 - n)), null === r && (r = getOptimizerDefaultEpsilonValue()), o.epsilonScalar = keep(scalar(r)), o;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this,
          n = function (n) {
        var o = ENV.engine.registeredVariables[n];if (null == r.accumulatedGrads[n]) {
          tidy(function () {
            t.accumulatedGrads[n] = zerosLike(o).variable(!1);
          });
        }if (null == r.accumulatedUpdates[n]) {
          tidy(function () {
            t.accumulatedUpdates[n] = zerosLike(o).variable(!1);
          });
        }var a = e[n],
            i = r.accumulatedGrads[n],
            s = r.accumulatedUpdates[n];tidy(function () {
          var e = t.rhoScalar.mul(i).add(t.oneMinusRho.mul(a.square())),
              r = s.add(t.epsilonScalar).sqrt().div(i.add(t.epsilonScalar).sqrt()).mul(a),
              u = t.rhoScalar.mul(s).add(t.oneMinusRho.mul(r.square()));t.accumulatedGrads[n].assign(e), t.accumulatedUpdates[n].assign(u);var l = t.c.mul(r).add(o);o.assign(l);
        });
      },
          r = this;for (var o in e) n(o);
    }, t.prototype.dispose = function () {
      var e = this;this.c.dispose(), this.epsilonScalar.dispose(), this.rhoScalar.dispose(), this.oneMinusRho.dispose(), null != this.accumulatedUpdates && (Object.keys(this.accumulatedUpdates).forEach(function (t) {
        return e.accumulatedUpdates[t].dispose();
      }), Object.keys(this.accumulatedGrads).forEach(function (t) {
        return e.accumulatedGrads[t].dispose();
      }));
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate, rho: this.rho, epsilon: this.epsilon };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate, t.rho, t.epsilon);
    }, t.className = "AdadeltaOptimizer", t;
  }(Optimizer);SerializationMap.register(AdadeltaOptimizer);var AdagradOptimizer = function (e) {
    function t(t, n) {
      void 0 === n && (n = .1);var r = e.call(this) || this;r.learningRate = t, r.initialAccumulatorValue = n, r.accumulatedGrads = {}, r.c = keep(scalar(-t));var o = getOptimizerDefaultEpsilonValue();return r.epsilon = keep(scalar(o)), r;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this,
          n = function (n) {
        var o = ENV.engine.registeredVariables[n];if (null == r.accumulatedGrads[n]) {
          tidy(function () {
            t.accumulatedGrads[n] = fill(o.shape, t.initialAccumulatorValue).variable(!1);
          });
        }var a = e[n],
            i = r.accumulatedGrads[n];tidy(function () {
          var e = i.add(a.square());t.accumulatedGrads[n].assign(e);var r = t.c.mul(a.div(e.add(t.epsilon).sqrt())).add(o);o.assign(r);
        });
      },
          r = this;for (var o in e) n(o);
    }, t.prototype.dispose = function () {
      var e = this;this.epsilon.dispose(), this.c.dispose(), null != this.accumulatedGrads && Object.keys(this.accumulatedGrads).forEach(function (t) {
        return e.accumulatedGrads[t].dispose();
      });
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate, initialAccumulatorValue: this.initialAccumulatorValue };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate, t.initialAccumulatorValue);
    }, t.className = "AdagradOptimizer", t;
  }(Optimizer);SerializationMap.register(AdagradOptimizer);var AdamOptimizer = function (e) {
    function t(t, n, r, o) {
      void 0 === o && (o = null);var a = e.call(this) || this;return a.learningRate = t, a.beta1 = n, a.beta2 = r, a.epsilon = o, a.accumulatedFirstMoment = {}, a.accumulatedSecondMoment = {}, a.c = keep(scalar(-t)), a.beta1Scalar = keep(scalar(n)), a.beta2Scalar = keep(scalar(r)), tidy(function () {
        a.accBeta1 = scalar(n).variable(), a.accBeta2 = scalar(r).variable();
      }), a.oneMinusBeta1 = keep(scalar(1 - n)), a.oneMinusBeta2 = keep(scalar(1 - r)), a.one = keep(scalar(1)), null === o && (o = getOptimizerDefaultEpsilonValue()), a.epsScalar = keep(scalar(o)), a;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this;tidy(function () {
        var n = t.one.sub(t.accBeta1),
            r = t.one.sub(t.accBeta2);for (var o in e) {
          var a = ENV.engine.registeredVariables[o];if (null == t.accumulatedFirstMoment[o]) {
            var i = !1;t.accumulatedFirstMoment[o] = zerosLike(a).variable(i);
          }if (null == t.accumulatedSecondMoment[o]) {
            i = !1;t.accumulatedSecondMoment[o] = zerosLike(a).variable(i);
          }var s = e[o],
              u = t.accumulatedFirstMoment[o],
              l = t.accumulatedSecondMoment[o],
              c = t.beta1Scalar.mul(u).add(t.oneMinusBeta1.mul(s)),
              d = t.beta2Scalar.mul(l).add(t.oneMinusBeta2.mul(s.square())),
              p = c.div(n),
              h = d.div(r);t.accumulatedFirstMoment[o].assign(c), t.accumulatedSecondMoment[o].assign(d);var f = t.c.mul(p.div(t.epsScalar.add(h.sqrt()))).add(a);a.assign(f);
        }t.accBeta1.assign(t.accBeta1.mul(t.beta1Scalar)), t.accBeta2.assign(t.accBeta2.mul(t.beta2Scalar));
      });
    }, t.prototype.dispose = function () {
      var e = this;this.c.dispose(), this.epsScalar.dispose(), this.beta1Scalar.dispose(), this.beta2Scalar.dispose(), this.accBeta1.dispose(), this.accBeta2.dispose(), this.oneMinusBeta1.dispose(), this.oneMinusBeta2.dispose(), this.one.dispose(), null != this.accumulatedFirstMoment && Object.keys(this.accumulatedFirstMoment).forEach(function (t) {
        return e.accumulatedFirstMoment[t].dispose();
      }), null != this.accumulatedSecondMoment && Object.keys(this.accumulatedSecondMoment).forEach(function (t) {
        return e.accumulatedSecondMoment[t].dispose();
      });
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate, beta1: this.beta1, beta2: this.beta2, epsilon: this.epsilon };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate, t.beta1, t.beta2, t.epsilon);
    }, t.className = "AdamOptimizer", t;
  }(Optimizer);SerializationMap.register(AdamOptimizer);var AdamaxOptimizer = function (e) {
    function t(t, n, r, o, a) {
      void 0 === o && (o = null), void 0 === a && (a = 0);var i = e.call(this) || this;return i.learningRate = t, i.beta1 = n, i.beta2 = r, i.epsilon = o, i.decay = a, i.accumulatedFirstMoment = {}, i.accumulatedWeightedInfNorm = {}, i.c = keep(scalar(-t)), i.beta1Scalar = keep(scalar(n)), i.beta2Scalar = keep(scalar(r)), i.decayScalar = keep(scalar(a)), tidy(function () {
        i.iteration = scalar(0).variable(), i.accBeta1 = scalar(n).variable();
      }), i.oneMinusBeta1 = keep(scalar(1 - n)), i.one = keep(scalar(1)), null === o && (o = getOptimizerDefaultEpsilonValue()), i.epsScalar = keep(scalar(o)), i;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this;tidy(function () {
        var n = t.one.sub(t.accBeta1),
            r = t.c.div(t.one.add(t.decayScalar.mul(t.iteration)));for (var o in e) {
          var a = ENV.engine.registeredVariables[o];if (null == t.accumulatedFirstMoment[o]) {
            var i = !1;t.accumulatedFirstMoment[o] = zerosLike(a).variable(i);
          }if (null == t.accumulatedWeightedInfNorm[o]) {
            i = !1;t.accumulatedWeightedInfNorm[o] = zerosLike(a).variable(i);
          }var s = e[o],
              u = t.accumulatedFirstMoment[o],
              l = t.accumulatedWeightedInfNorm[o],
              c = t.beta1Scalar.mul(u).add(t.oneMinusBeta1.mul(s)),
              d = t.beta2Scalar.mul(l),
              p = s.abs(),
              h = d.maximum(p);t.accumulatedFirstMoment[o].assign(c), t.accumulatedWeightedInfNorm[o].assign(h);var f = r.div(n).mul(c.div(t.epsScalar.add(h))).add(a);a.assign(f);
        }t.iteration.assign(t.iteration.add(t.one)), t.accBeta1.assign(t.accBeta1.mul(t.beta1Scalar));
      });
    }, t.prototype.dispose = function () {
      var e = this;this.c.dispose(), this.epsScalar.dispose(), this.accBeta1.dispose(), this.beta1Scalar.dispose(), this.beta2Scalar.dispose(), this.oneMinusBeta1.dispose(), this.decayScalar.dispose(), this.iteration.dispose(), this.one.dispose(), null != this.accumulatedFirstMoment && Object.keys(this.accumulatedFirstMoment).forEach(function (t) {
        return e.accumulatedFirstMoment[t].dispose();
      }), null != this.accumulatedWeightedInfNorm && Object.keys(this.accumulatedWeightedInfNorm).forEach(function (t) {
        return e.accumulatedWeightedInfNorm[t].dispose();
      });
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate, beta1: this.beta1, beta2: this.beta2, epsilon: this.epsilon, decay: this.decay };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate, t.beta1, t.beta2, t.epsilon, t.decay);
    }, t.className = "AdamaxOptimizer", t;
  }(Optimizer);SerializationMap.register(AdamaxOptimizer);var SGDOptimizer = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.learningRate = t, n.setLearningRate(t), n;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this;Object.keys(e).forEach(function (n) {
        var r = e[n],
            o = ENV.engine.registeredVariables[n];tidy(function () {
          var e = t.c.mul(r).add(o);o.assign(e);
        });
      });
    }, t.prototype.setLearningRate = function (e) {
      this.learningRate = e, null != this.c && this.c.dispose(), this.c = keep(scalar(-e));
    }, t.prototype.dispose = function () {
      this.c.dispose();
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate);
    }, t.className = "SGDOptimizer", t;
  }(Optimizer);SerializationMap.register(SGDOptimizer);var MomentumOptimizer = function (e) {
    function t(t, n, r) {
      void 0 === r && (r = !1);var o = e.call(this, t) || this;return o.learningRate = t, o.momentum = n, o.useNesterov = r, o.m = scalar(o.momentum), o.accumulations = {}, o;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this,
          n = function (n) {
        var o = ENV.engine.registeredVariables[n];if (null == r.accumulations[n]) {
          tidy(function () {
            t.accumulations[n] = zerosLike(o).variable(!1);
          });
        }var a = r.accumulations[n],
            i = e[n];tidy(function () {
          var e,
              r = t.m.mul(a).add(i);e = t.useNesterov ? t.c.mul(i.add(r.mul(t.m))).add(o) : t.c.mul(r).add(o), t.accumulations[n].assign(r), o.assign(e);
        });
      },
          r = this;for (var o in e) n(o);
    }, t.prototype.dispose = function () {
      if (e.prototype.dispose.call(this), this.m.dispose(), null != this.accumulations) for (var t in this.accumulations) this.accumulations[t].dispose();
    }, t.prototype.setMomentum = function (e) {
      this.momentum = e;
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate, momentum: this.momentum, useNesterov: this.useNesterov };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate, t.momentum, t.useNesterov);
    }, t.className = "MomentumOptimizer", t;
  }(SGDOptimizer);SerializationMap.register(MomentumOptimizer);var RMSPropOptimizer = function (e) {
    function t(t, n, r, o, a) {
      void 0 === n && (n = .9), void 0 === r && (r = 0), void 0 === o && (o = null), void 0 === a && (a = !1);var i = e.call(this) || this;return i.learningRate = t, i.decay = n, i.momentum = r, i.epsilon = o, i.accumulatedMeanSquares = {}, i.accumulatedMeanGrads = {}, i.accumulatedMoments = {}, i.c = keep(scalar(t)), i.decayScalar = keep(scalar(n)), i.momentumScalar = keep(scalar(r)), i.oneMinusDecay = keep(scalar(1 - n)), i.centered = a, null === o && (o = getOptimizerDefaultEpsilonValue()), i.epsilonScalar = keep(scalar(o)), i;
    }return __extends(t, e), t.prototype.applyGradients = function (e) {
      var t = this,
          n = function (n) {
        var o = ENV.engine.registeredVariables[n];if (null == r.accumulatedMeanSquares[n]) {
          tidy(function () {
            t.accumulatedMeanSquares[n] = zerosLike(o).variable(!1);
          });
        }if (null == r.accumulatedMeanGrads[n] && r.centered) {
          tidy(function () {
            t.accumulatedMeanGrads[n] = zerosLike(o).variable(!1);
          });
        }if (null == r.accumulatedMoments[n]) {
          tidy(function () {
            t.accumulatedMoments[n] = zerosLike(o).variable(!1);
          });
        }var a = r.accumulatedMeanSquares[n],
            i = r.accumulatedMeanGrads[n],
            s = r.accumulatedMoments[n],
            u = e[n];tidy(function () {
          var e = t.decayScalar.mul(a).add(t.oneMinusDecay.mul(u.square()));if (t.centered) {
            var r = t.decayScalar.mul(i).add(t.oneMinusDecay.mul(u)),
                l = t.momentumScalar.mul(s).add(t.c.mul(u).div(e.sub(r.square().add(t.epsilonScalar)).sqrt()));t.accumulatedMeanSquares[n].assign(e), t.accumulatedMeanGrads[n].assign(r), t.accumulatedMoments[n].assign(l);var c = o.sub(l);o.assign(c);
          } else {
            var d = t.decayScalar.mul(a).add(t.oneMinusDecay.mul(u.square()));l = t.momentumScalar.mul(s).add(t.c.mul(u).div(d.add(t.epsilonScalar).sqrt()));t.accumulatedMeanSquares[n].assign(d), t.accumulatedMoments[n].assign(l);c = o.sub(l);o.assign(c);
          }
        });
      },
          r = this;for (var o in e) n(o);
    }, t.prototype.dispose = function () {
      var e = this;this.c.dispose(), this.epsilonScalar.dispose(), this.decayScalar.dispose(), this.momentumScalar.dispose(), this.oneMinusDecay.dispose(), null != this.accumulatedMeanSquares && Object.keys(this.accumulatedMeanSquares).forEach(function (t) {
        return e.accumulatedMeanSquares[t].dispose();
      }), null != this.accumulatedMeanGrads && this.centered && Object.keys(this.accumulatedMeanGrads).forEach(function (t) {
        return e.accumulatedMeanGrads[t].dispose();
      }), null != this.accumulatedMoments && Object.keys(this.accumulatedMoments).forEach(function (t) {
        return e.accumulatedMoments[t].dispose();
      });
    }, t.prototype.getConfig = function () {
      return { learningRate: this.learningRate, decay: this.decay, momentum: this.momentum, epsilon: this.epsilon, centered: this.centered };
    }, t.fromConfig = function (e, t) {
      return new e(t.learningRate, t.decay, t.momentum, t.epsilon, t.centered);
    }, t.className = "RMSPropOptimizer", t;
  }(Optimizer);SerializationMap.register(RMSPropOptimizer);var OptimizerConstructors = function () {
    function e() {}return e.sgd = function (e) {
      return new SGDOptimizer(e);
    }, e.momentum = function (e, t, n) {
      return void 0 === n && (n = !1), new MomentumOptimizer(e, t, n);
    }, e.rmsprop = function (e, t, n, r, o) {
      return void 0 === t && (t = .9), void 0 === n && (n = 0), void 0 === r && (r = null), void 0 === o && (o = !1), new RMSPropOptimizer(e, t, n, r, o);
    }, e.adam = function (e, t, n, r) {
      return void 0 === e && (e = .001), void 0 === t && (t = .9), void 0 === n && (n = .999), void 0 === r && (r = null), new AdamOptimizer(e, t, n, r);
    }, e.adadelta = function (e, t, n) {
      return void 0 === e && (e = .001), void 0 === t && (t = .95), void 0 === n && (n = null), new AdadeltaOptimizer(e, t, n);
    }, e.adamax = function (e, t, n, r, o) {
      return void 0 === e && (e = .002), void 0 === t && (t = .9), void 0 === n && (n = .999), void 0 === r && (r = null), void 0 === o && (o = 0), new AdamaxOptimizer(e, t, n, r, o);
    }, e.adagrad = function (e, t) {
      return void 0 === t && (t = .1), new AdagradOptimizer(e, t);
    }, __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "sgd", null), __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "momentum", null), __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "rmsprop", null), __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "adam", null), __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "adadelta", null), __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "adamax", null), __decorate([doc({ heading: "Training", subheading: "Optimizers", namespace: "train" })], e, "adagrad", null), e;
  }(),
      train = { sgd: OptimizerConstructors.sgd, momentum: OptimizerConstructors.momentum, adadelta: OptimizerConstructors.adadelta, adagrad: OptimizerConstructors.adagrad, rmsprop: OptimizerConstructors.rmsprop, adamax: OptimizerConstructors.adamax, adam: OptimizerConstructors.adam },
      setBackend = Environment.setBackend,
      getBackend = Environment.getBackend,
      disposeVariables = Environment.disposeVariables,
      memory = Environment.memory,
      nextFrame = BrowserUtil.nextFrame;setOpHandler(ops);

  /**
   * @license
   * Copyright 2018 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   */
  var extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
  };function __extends$1(e, t) {
    function n() {
      this.constructor = e;
    }extendStatics$1(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
  }var __assign$1 = Object.assign || function (e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);return e;
  };function __decorate$1(e, t, n, r) {
    var i,
        a = arguments.length,
        o = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, r);else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (o = (a < 3 ? i(o) : a > 3 ? i(t, n, o) : i(t, n)) || o);return a > 3 && o && Object.defineProperty(t, n, o), o;
  }function __awaiter$1(e, t, n, r) {
    return new (n || (n = Promise))(function (i, a) {
      function o(e) {
        try {
          l(r.next(e));
        } catch (e) {
          a(e);
        }
      }function s(e) {
        try {
          l(r.throw(e));
        } catch (e) {
          a(e);
        }
      }function l(e) {
        e.done ? i(e.value) : new n(function (t) {
          t(e.value);
        }).then(o, s);
      }l((r = r.apply(e, t || [])).next());
    });
  }function __generator$1(e, t) {
    var n,
        r,
        i,
        a,
        o = { label: 0, sent: function () {
        if (1 & i[0]) throw i[1];return i[1];
      }, trys: [], ops: [] };return a = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {
      return this;
    }), a;function s(a) {
      return function (s) {
        return function (a) {
          if (n) throw new TypeError("Generator is already executing.");for (; o;) try {
            if (n = 1, r && (i = r[2 & a[0] ? "return" : a[0] ? "throw" : "next"]) && !(i = i.call(r, a[1])).done) return i;switch (r = 0, i && (a = [0, i.value]), a[0]) {case 0:case 1:
                i = a;break;case 4:
                return o.label++, { value: a[1], done: !1 };case 5:
                o.label++, r = a[1], a = [0];continue;case 7:
                a = o.ops.pop(), o.trys.pop();continue;default:
                if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === a[0] || 2 === a[0])) {
                  o = 0;continue;
                }if (3 === a[0] && (!i || a[1] > i[0] && a[1] < i[3])) {
                  o.label = a[1];break;
                }if (6 === a[0] && o.label < i[1]) {
                  o.label = i[1], i = a;break;
                }if (i && o.label < i[2]) {
                  o.label = i[2], o.ops.push(a);break;
                }i[2] && o.ops.pop(), o.trys.pop();continue;}a = t.call(e, o);
          } catch (e) {
            a = [6, e], r = 0;
          } finally {
            n = i = 0;
          }if (5 & a[0]) throw a[1];return { value: a[0] ? a[1] : void 0, done: !0 };
        }([a, s]);
      };
    }
  }var _epsilon = 1e-7;function epsilon() {
    return _epsilon;
  }function imageDataFormat() {
    return "channelsLast";
  }var _nextUniqueTensorId = 0;function getNextUniqueTensorId() {
    return _nextUniqueTensorId++;
  }var _uidPrefixes = {};function getUid(e) {
    return void 0 === e && (e = ""), e in _uidPrefixes || (_uidPrefixes[e] = 0), _uidPrefixes[e] += 1, e + _uidPrefixes[e].toString();
  }var scalarCache = { float32: {}, int32: {} },
      DEFAULT_DTYPE = "float32";function getScalar(e, t) {
    return void 0 === t && (t = DEFAULT_DTYPE), null == scalarCache[t][e] && (scalarCache[t][e] = scalar(e, t), keep(scalarCache[t][e])), scalarCache[t][e];
  }var AttributeError = function (e) {
    function t(n) {
      var r = e.call(this, n) || this;return Object.setPrototypeOf(r, t.prototype), r;
    }return __extends$1(t, e), t;
  }(Error),
      RuntimeError = function (e) {
    function t(n) {
      var r = e.call(this, n) || this;return Object.setPrototypeOf(r, t.prototype), r;
    }return __extends$1(t, e), t;
  }(Error),
      ValueError = function (e) {
    function t(n) {
      var r = e.call(this, n) || this;return Object.setPrototypeOf(r, t.prototype), r;
    }return __extends$1(t, e), t;
  }(Error),
      NotImplementedError = function (e) {
    function t(n) {
      var r = e.call(this, n) || this;return Object.setPrototypeOf(r, t.prototype), r;
    }return __extends$1(t, e), t;
  }(Error),
      AssertionError = function (e) {
    function t(n) {
      var r = e.call(this, n) || this;return Object.setPrototypeOf(r, t.prototype), r;
    }return __extends$1(t, e), t;
  }(Error),
      IndexError = function (e) {
    function t(n) {
      var r = e.call(this, n) || this;return Object.setPrototypeOf(r, t.prototype), r;
    }return __extends$1(t, e), t;
  }(Error);function pyListRepeat(e, t) {
    if (Array.isArray(e)) {
      for (var n = [], r = 0; r < t; r++) n = n.concat(e);return n;
    }return (n = new Array(t)).fill(e), n;
  }function assert$1(e, t) {
    if (!e) throw new AssertionError(t);
  }function count(e, t) {
    for (var n = 0, r = 0, i = e; r < i.length; r++) {
      i[r] === t && n++;
    }return n;
  }function singletonOrArray(e) {
    return 1 === e.length ? e[0] : e;
  }function toList(e) {
    return Array.isArray(e) ? e : [e];
  }function toSnakeCase(e) {
    var t = e.replace(/(.)([A-Z][a-z0-9]+)/g, "$1_$2").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();return "_" !== t[0] ? t : "private" + t;
  }function toCamelCase(e) {
    return e.length <= 1 ? e : -1 === e.indexOf("_") ? e : e.replace(/[_]+(\w|$)/g, function (e, t) {
      return t.toUpperCase();
    });
  }var _GLOBAL_CUSTOM_OBJECTS = {};function serializeKerasObject(e) {
    return null === e || void 0 === e ? null : { className: e.getClassName(), config: e.getConfig() };
  }function deserializeKerasObject(e, t, n, r) {
    if (void 0 === t && (t = {}), void 0 === n && (n = {}), void 0 === r && (r = "object"), "string" == typeof e) {
      var i = e,
          a = void 0;if (i in n) a = n[i];else if (i in _GLOBAL_CUSTOM_OBJECTS) a = _GLOBAL_CUSTOM_OBJECTS[i];else if (null == (a = t[i])) throw new ValueError("Unknown " + r + ": " + e);return a;
    }var o = e;if (null == o.className || null == o.config) throw new ValueError(r + ": Improper config format: " + JSON.stringify(o) + ".\n'className' and 'config' must set.");var s = o.className,
        l = void 0,
        u = void 0;if (s in n ? (l = (S = n.get(s))[0], u = S[1]) : s in _GLOBAL_CUSTOM_OBJECTS ? (l = (I = _GLOBAL_CUSTOM_OBJECTS.className)[0], u = I[1]) : s in t && (l = (_ = t[s])[0], u = _[1]), null == l) throw new ValueError("Unknown " + r + ": " + s);if (null != u) {
      for (var c = {}, p = 0, h = Object.keys(_GLOBAL_CUSTOM_OBJECTS); p < h.length; p++) {
        c[v = h[p]] = _GLOBAL_CUSTOM_OBJECTS[v];
      }for (var d = 0, g = Object.keys(n); d < g.length; d++) {
        c[v = g[d]] = n[v];
      }o.config.customObjects = c;for (var f = __assign$1({}, _GLOBAL_CUSTOM_OBJECTS), m = 0, y = Object.keys(n); m < y.length; m++) {
        var v = y[m];_GLOBAL_CUSTOM_OBJECTS[v] = n[v];
      }var b = u(l, o.config);return _GLOBAL_CUSTOM_OBJECTS = __assign$1({}, f), b;
    }f = __assign$1({}, _GLOBAL_CUSTOM_OBJECTS);for (var z = 0, w = Object.keys(n); z < w.length; z++) {
      v = w[z];_GLOBAL_CUSTOM_OBJECTS[v] = n[v];
    }var S, I, _;b = new l(o.config);return _GLOBAL_CUSTOM_OBJECTS = __assign$1({}, f), b;
  }function numberCompare(e, t) {
    return e < t ? -1 : e > t ? 1 : 0;
  }function reverseNumberCompare(e, t) {
    return -1 * numberCompare(e, t);
  }function stringToDType(e) {
    switch (e) {case "float32":
        return "float32";default:
        throw new ValueError("Invalid dtype: " + e);}
  }function unique(e) {
    if (null == e) return e;for (var t = [], n = 0, r = e; n < r.length; n++) {
      var i = r[n];-1 === t.indexOf(i) && t.push(i);
    }return t;
  }function isObjectEmpty(e) {
    if (null == e) throw new ValueError("Invalid value in obj: " + JSON.stringify(e));for (var t in e) if (e.hasOwnProperty(t)) return !1;return !0;
  }function checkStringTypeUnionValue(e, t, n) {
    if (null != n && e.indexOf(n) < 0) throw new ValueError(n + " is not a valid " + t + ".  Valid values are " + e + " or null/undefined.");
  }function checkArrayTypeAndLength(e, t, n, r) {
    return void 0 === n && (n = 0), void 0 === r && (r = 1 / 0), assert$1(n >= 0), assert$1(r >= n), Array.isArray(e) && e.length >= n && e.length <= r && e.every(function (e) {
      return typeof e === t;
    });
  }function calcL2Norms(e, t) {
    return tidy(function () {
      return sqrt(sum(mulStrict(e, e), t, !0));
    });
  }var Constraint = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.getConfig = function () {
      return {};
    }, t = __decorate$1([doc({ heading: "Constraints", subheading: "Classes", namespace: "constraints" })], t);
  }(serialization.Serializable),
      MaxNorm = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.defaultMaxValue = 2, n.defaultAxis = 0, n.maxValue = null != t.maxValue ? t.maxValue : n.defaultMaxValue, n.axis = null != t.axis ? t.axis : n.defaultAxis, n;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      var t = this;return tidy(function () {
        var n = calcL2Norms(e, t.axis),
            r = clipByValue(n, 0, t.maxValue);return mul(e, div(r, add(getScalar(epsilon()), n)));
      });
    }, t.prototype.getConfig = function () {
      return { maxValue: this.maxValue, axis: this.axis };
    }, t.className = "MaxNorm", t;
  }(Constraint);serialization.SerializationMap.register(MaxNorm);var UnitNorm = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.defaultAxis = 0, n.axis = null != t.axis ? t.axis : n.defaultAxis, n;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      var t = this;return tidy(function () {
        return div(e, add(getScalar(epsilon()), calcL2Norms(e, t.axis)));
      });
    }, t.prototype.getConfig = function () {
      return { axis: this.axis };
    }, t.className = "UnitNorm", t;
  }(Constraint);serialization.SerializationMap.register(UnitNorm);var NonNeg = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return relu(e);
    }, t.className = "NonNeg", t;
  }(Constraint);serialization.SerializationMap.register(NonNeg);var MinMaxNorm = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.defaultMinValue = 0, n.defaultMaxValue = 1, n.defaultRate = 1, n.defaultAxis = 0, n.minValue = null != t.minValue ? t.minValue : n.defaultMinValue, n.maxValue = null != t.maxValue ? t.maxValue : n.defaultMaxValue, n.rate = null != t.rate ? t.rate : n.defaultRate, n.axis = null != t.axis ? t.axis : n.defaultAxis, n;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      var t = this;return tidy(function () {
        var n = calcL2Norms(e, t.axis),
            r = add(mul(getScalar(t.rate), clipByValue(n, t.minValue, t.maxValue)), mul(getScalar(1 - t.rate), n));return mul(e, div(r, add(getScalar(epsilon()), n)));
      });
    }, t.prototype.getConfig = function () {
      return { minValue: this.minValue, maxValue: this.maxValue, rate: this.rate, axis: this.axis };
    }, t.className = "MinMaxNorm", t;
  }(Constraint);serialization.SerializationMap.register(MinMaxNorm);var CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP = { maxNorm: "MaxNorm", minMaxNorm: "MinMaxNorm", nonNeg: "NonNeg", unitNorm: "UnitNorm" };function serializeConstraint(e) {
    return serializeKerasObject(e);
  }function deserializeConstraint(e, t) {
    return void 0 === t && (t = {}), deserializeKerasObject(e, serialization.SerializationMap.getMap().classNameMap, t, "constraint");
  }function getConstraint(e) {
    return null == e ? null : "string" == typeof e ? deserializeConstraint({ className: e in CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP ? CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP[e] : e, config: {} }) : e instanceof Constraint ? e : deserializeConstraint(e);
  }var nameMap = new Map(),
      VALID_DATA_FORMAT_VALUES = ["channelsFirst", "channelsLast"];function checkDataFormat(e) {
    checkStringTypeUnionValue(VALID_DATA_FORMAT_VALUES, "DataFormat", e);
  }var VALID_PADDING_MODE_VALUES = ["valid", "same", "causal"];function checkPaddingMode(e) {
    checkStringTypeUnionValue(VALID_PADDING_MODE_VALUES, "PaddingMode", e);
  }var VALID_POOL_MODE_VALUES = ["max", "avg"];function checkPoolMode(e) {
    checkStringTypeUnionValue(VALID_POOL_MODE_VALUES, "PoolMode", e);
  }var _nameScopeStack = [],
      _nameScopeDivider = "/";function nameScope(e, t) {
    _nameScopeStack.push(e);try {
      var n = t();return _nameScopeStack.pop(), n;
    } catch (e) {
      throw _nameScopeStack.pop(), e;
    }
  }function currentNameScopePrefix() {
    return 0 === _nameScopeStack.length ? "" : _nameScopeStack.join(_nameScopeDivider) + _nameScopeDivider;
  }function getScopedTensorName(e) {
    if (!isValidTensorName(e)) throw new Error("Not a valid tensor name: '" + e + "'");return currentNameScopePrefix() + e;
  }function getUniqueTensorName(e) {
    if (!isValidTensorName(e)) throw new Error("Not a valid tensor name: '" + e + "'");nameMap.has(e) || nameMap.set(e, 0);var t = nameMap.get(e);if (nameMap.set(e, nameMap.get(e) + 1), t > 0) {
      var n = e + "_" + t;return nameMap.set(n, 1), n;
    }return e;
  }var tensorNameRegex = new RegExp(/^[A-Za-z][A-Za-z0-9\._\/]*$/);function isValidTensorName(e) {
    return !!e.match(tensorNameRegex);
  }function deserialize(e, t) {
    return void 0 === t && (t = {}), deserializeKerasObject(e, serialization.SerializationMap.getMap().classNameMap, t, "layer");
  }function isArrayItemInputOrOutputName(e, t, n) {
    return ("inboundNodes" === e || "outputLayers" === e || "inputLayers" === e) && 0 === t && "string" == typeof n;
  }function convertPythonicToTs(e, t) {
    if (null === e) return null;if ("string" == typeof e) return toCamelCase(e);if ("number" == typeof e || "boolean" == typeof e) return e;if (e instanceof Array) {
      for (var n = [], r = e.length, i = 0; i < r; ++i) {
        var a = e[i];isArrayItemInputOrOutputName(t, i, a) ? n.push(a) : n.push(convertPythonicToTs(a, t));
      }return n;
    }for (var o = {}, s = 0, l = Object.keys(e); s < l.length; s++) {
      var u = l[s],
          c = e[u];if ("name" === u && "string" == typeof c) o[u] = c;else {
        var p = toCamelCase(u);o[p] = convertPythonicToTs(c, p);
      }
    }return o;
  }function convertTsToPythonic(e, t) {
    if (null === e || void 0 === e) return null;if ("string" == typeof e) return toSnakeCase(e);if ("number" == typeof e || "boolean" == typeof e) return e;if (e instanceof Array) {
      for (var n = [], r = e.length, i = 0; i < r; ++i) {
        var a = e[i];isArrayItemInputOrOutputName(t, i, a) ? n.push(a) : n.push(convertTsToPythonic(a, t));
      }return n;
    }for (var o = {}, s = 0, l = Object.keys(e); s < l.length; s++) {
      var u = l[s],
          c = e[u],
          p = toSnakeCase(u);o[p] = "name" !== u && "className" !== u || "string" != typeof c ? convertTsToPythonic(c, u) : c;
    }return o;
  }function isArrayOfShapes(e) {
    return Array.isArray(e) && Array.isArray(e[0]);
  }function normalizeShapeList(e) {
    return 0 === e.length ? [] : Array.isArray(e[0]) ? e : [e];
  }function getExactlyOneTensor(e) {
    var t;if (Array.isArray(e)) {
      if (1 !== e.length) throw new ValueError("Expected Tensor length to be 1; got " + e.length);t = e[0];
    } else t = e;return t;
  }function getExactlyOneShape(e) {
    if (Array.isArray(e) && Array.isArray(e[0])) {
      if (1 === e.length) return (e = e)[0];throw new ValueError("Expected exactly 1 Shape; got " + e.length);
    }return e;
  }function countParamsInWeights(e) {
    for (var t = 0, n = 0, r = e; n < r.length; n++) {
      var i = r[n];0 === i.shape.length ? t += 1 : t += i.shape.reduce(function (e, t) {
        return e * t;
      });
    }return t;
  }var DEFAULT_VARIABLE_NAME_PREFIX = "Variable",
      LayerVariable = function () {
    function e(e, t, n, r, i) {
      void 0 === t && (t = "float32"), void 0 === n && (n = DEFAULT_VARIABLE_NAME_PREFIX), void 0 === r && (r = !0), void 0 === i && (i = null), this.dtype = null == t ? "float32" : t, this.shape = e.shape, this.id = getNextUniqueTensorId(), n = null == n ? DEFAULT_VARIABLE_NAME_PREFIX : n, this.originalName = getScopedTensorName(n), this.name = getUniqueTensorName(this.originalName), this.trainable = r, this.constraint = i, this.val = variable(e, this.trainable, this.name, this.dtype);
    }return e.prototype.read = function () {
      return this.val;
    }, e.prototype.write = function (e) {
      return checkShapesMatch(this.val, e), this.val.assign(e), null != this.constraint && this.val.assign(this.constraint.apply(this.val)), this;
    }, e;
  }();function checkShapesMatch(e, t) {
    if (e.shape.toString() !== t.shape.toString()) throw new Error("Shape mismatch: " + JSON.stringify(e.shape) + " vs. " + JSON.stringify(t.shape));
  }function batchGetValue(e) {
    return e.map(function (e) {
      return e.read();
    });
  }function batchSetValue(e) {
    e.map(function (e) {
      e[0].write(e[1]);
    });
  }var version$1 = "0.7.0",
      InputSpec = function () {
    return function (e) {
      this.dtype = e.dtype, this.shape = e.shape, null != e.shape ? this.ndim = e.shape.length : this.ndim = e.ndim, this.maxNDim = e.maxNDim, this.minNDim = e.minNDim, this.axes = e.axes || {};
    };
  }(),
      SymbolicTensor = function () {
    function e(e, t, n, r, i, a, o) {
      this.dtype = e, this.shape = t, this.sourceLayer = n, this.inputs = r, this.callArgs = i, this.outputTensorIndex = o, this.id = getNextUniqueTensorId(), null != a && (this.originalName = getScopedTensorName(a), this.name = getUniqueTensorName(this.originalName)), this.rank = t.length;
    }return e = __decorate$1([doc({ heading: "Models", subheading: "Classes" })], e);
  }(),
      _nextNodeID = 0,
      Node = function () {
    function e(e, t) {
      this.callArgs = t, this.id = _nextNodeID++, this.outboundLayer = e.outboundLayer, this.inboundLayers = e.inboundLayers, this.nodeIndices = e.nodeIndices, this.tensorIndices = e.tensorIndices, this.inputTensors = e.inputTensors, this.outputTensors = e.outputTensors, this.inputMasks = e.inputMasks, this.outputMasks = e.outputMasks, this.inputShapes = e.inputShapes, this.outputShapes = e.outputShapes;for (var n = 0, r = e.inboundLayers; n < r.length; n++) {
        var i = r[n];null != i && i.outboundNodes.push(this);
      }e.outboundLayer.inboundNodes.push(this);
    }return e.prototype.getConfig = function () {
      for (var e = [], t = 0, n = this.inboundLayers; t < n.length; t++) {
        var r = n[t];null != r ? e.push(r.name) : e.push(null);
      }return { outboundLayer: this.outboundLayer ? this.outboundLayer.name : null, inboundLayers: e, nodeIndices: this.nodeIndices, tensorIndices: this.tensorIndices };
    }, e;
  }(),
      _nextLayerID = 0,
      Layer = function (e) {
    function t(t) {
      var n = e.call(this) || this;n._callHook = null, n._addedWeightNames = [], n._stateful = !1, n.id = _nextLayerID++, n.activityRegularizer = null, n.inputSpec = null, n.supportsMasking = !1, n._trainableWeights = [], n._nonTrainableWeights = [], n._losses = [], n._updates = [], n._built = !1, n.inboundNodes = [], n.outboundNodes = [];var r = t.name;if (!r) {
        var i = n.getClassName();r = toSnakeCase(i) + "_" + getUid(i);
      }if (n.name = r, n.trainable = null == t.trainable || t.trainable, n.updatable = null == t.updatable || t.updatable, null != t.inputShape || null != t.batchInputShape) {
        var a = void 0;if (null != t.batchInputShape) a = t.batchInputShape;else if (null != t.inputShape) {
          var o = null;null != t.batchSize && (o = t.batchSize), a = [o].concat(t.inputShape);
        }n.batchInputShape = a;var s = t.dtype;null == s && (s = t.inputDType), null == s && (s = "float32"), n.dtype = s;
      }return null != t.weights ? n.initialWeights = t.weights : n.initialWeights = null, n;
    }return __extends$1(t, e), t.nodeKey = function (e, t) {
      return e.name + "_ib-" + t.toString();
    }, t.prototype.getNodeAtIndex = function (e, t) {
      if (0 === this.inboundNodes.length) throw new RuntimeError("The layer has never been called and thus has no defined " + t + ".");if (this.inboundNodes.length <= e) throw new ValueError("Asked to get " + t + " at node " + e + ", but the layer has only " + this.inboundNodes.length + " inbound nodes.");return this.inboundNodes[e];
    }, t.prototype.getInputAt = function (e) {
      return singletonOrArray(this.getNodeAtIndex(e, "input").inputTensors);
    }, t.prototype.getOutputAt = function (e) {
      return singletonOrArray(this.getNodeAtIndex(e, "output").outputTensors);
    }, Object.defineProperty(t.prototype, "input", { get: function () {
        if (this.inboundNodes.length > 1) throw new AttributeError("Layer " + this.name + ' has multiple inbound nodes, hence the notion of "layer input" is ill-defined. Use `getInputAt(nodeIndex)` instead.');if (0 === this.inboundNodes.length) throw new AttributeError("Layer " + this.name + " is not connected, no input to return.");return singletonOrArray(this.getNodeAtIndex(0, "input").inputTensors);
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "output", { get: function () {
        if (0 === this.inboundNodes.length) throw new AttributeError("Layer " + this.name + " has no inbound nodes.");if (this.inboundNodes.length > 1) throw new AttributeError("Layer " + this.name + ' has multiple inbound nodes, hence the notion of "layer output" is ill-defined. Use `getOutputAt(nodeIndex)` instead.');return singletonOrArray(this.getNodeAtIndex(0, "output").outputTensors);
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "losses", { get: function () {
        return this._losses;
      }, enumerable: !0, configurable: !0 }), t.prototype.calculateLosses = function () {
      return this.losses.map(function (e) {
        return e();
      });
    }, Object.defineProperty(t.prototype, "updates", { get: function () {
        return this._updates;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "built", { get: function () {
        return this._built;
      }, set: function (e) {
        this._built = e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "trainableWeights", { get: function () {
        return this.trainable ? this._trainableWeights : [];
      }, set: function (e) {
        this._trainableWeights = e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "nonTrainableWeights", { get: function () {
        return this.trainable ? this._nonTrainableWeights : this._trainableWeights.concat(this._nonTrainableWeights);
      }, set: function (e) {
        this._nonTrainableWeights = e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "weights", { get: function () {
        return this.trainableWeights.concat(this.nonTrainableWeights);
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "stateful", { get: function () {
        return this._stateful;
      }, enumerable: !0, configurable: !0 }), t.prototype.assertInputCompatibility = function (e) {
      if (e = toList(e), null != this.inputSpec && 0 !== this.inputSpec.length) {
        var t = toList(this.inputSpec);if (e.length !== t.length) throw new ValueError("Layer " + this.name + " expects " + t.length + " inputs, but it received " + e.length + " input tensors. Input received: " + e);for (var n = 0; n < e.length; n++) {
          var r = e[n],
              i = t[n];if (null != i) {
            var a = r.rank;if (null != i.ndim && a !== i.ndim) throw new ValueError("Input " + n + " is incompatible with layer " + this.name + ": expected ndim=" + i.ndim + ", found ndim=" + a);if (null != i.maxNDim && a > i.maxNDim) throw new ValueError("Input " + n + " is incompatible with layer " + this.name + ": expected max_ndim=" + i.maxNDim + ", found ndim=" + a);if (null != i.minNDim && a < i.minNDim) throw new ValueError("Input " + n + " is incompatible with layer " + this.name + ": expected min_ndim=" + i.minNDim + ", found ndim=" + a + ".");if (null != i.dtype && r.dtype !== i.dtype) throw new ValueError("Input " + n + " is incompatible with layer " + this.name + " : expected dtype=" + i.dtype + ", found dtype=" + r.dtype + ".");if (i.axes) {
              var o = r.shape;for (var s in i.axes) {
                var l = Number(s),
                    u = i.axes[s],
                    c = l >= 0 ? o[l] : o[o.length + l];if (null != u && -1 === [u, null].indexOf(c)) throw new ValueError("Input " + n + " is incompatible with layer " + this.name + ": expected axis " + l + " of input shape to have value " + u + " but got shape " + o + ".");
              }
            }if (null != i.shape) for (var p = 0; p < i.shape.length; ++p) {
              var h = i.shape[p],
                  d = r.shape[p];if (null != h && null != d && h !== d) throw new ValueError("Input " + n + " is incompatible with layer " + this.name + ": expected shape=" + i.shape + ", found shape=${xShape}.");
            }
          }
        }
      }
    }, t.prototype.call = function (e, t) {
      return e;
    }, t.prototype.invokeCallHook = function (e, t) {
      null != this._callHook && this._callHook(e, t);
    }, t.prototype.setCallHook = function (e) {
      this._callHook = e;
    }, t.prototype.clearCallHook = function () {
      this._callHook = null;
    }, t.prototype.apply = function (e, t) {
      var n = this;t = t || {};for (var r = toList(e), i = !0, a = 0, o = r; a < o.length; a++) {
        if (!(o[a] instanceof SymbolicTensor)) {
          i = !1;break;
        }
      }for (var s = !0, l = 0, u = r; l < u.length; l++) {
        if (u[l] instanceof SymbolicTensor) {
          s = !1;break;
        }
      }if (i === s) throw new ValueError("Arguments to apply() must be all SymbolicTensors or all Tensors");return nameScope(this.name, function () {
        if (!n.built) {
          n.assertInputCompatibility(e);for (var i = [], a = 0, o = toList(e); a < o.length; a++) {
            var l = o[a];i.push(l.shape);
          }n.build(singletonOrArray(i)), n.built = !0, n.initialWeights && n.setWeights(n.initialWeights);
        }if (n.assertInputCompatibility(e), s) {
          for (var u = [], c = 0, p = toList(f = n.call(e, t)); c < p.length; c++) {
            var h = p[c];-1 !== r.indexOf(h) && (h = h.clone()), u.push(h);
          }if (f = singletonOrArray(u), null != n.activityRegularizer) throw new NotImplementedError("Layer invocation in the presence of activity regularizer(s) is not supported yet.");return f;
        }var d = collectInputShape(e),
            g = n.computeOutputShape(d),
            f = void 0,
            m = guessOutputDType(e);if (f = null != g && g.length > 0 && Array.isArray(g[0]) ? g.map(function (r, i) {
          return new SymbolicTensor(m, r, n, toList(e), t, n.name, i);
        }) : new SymbolicTensor(m, g, n, toList(e), t, n.name), n.addInboundNode(e, f, null, null, d, g, t), null != n.activityRegularizer) throw new NotImplementedError("Layer invocation in the presence of activity regularizer(s) is not supported yet.");return f;
      });
    }, Object.defineProperty(t.prototype, "outputShape", { get: function () {
        if (null == this.inboundNodes || 0 === this.inboundNodes.length) throw new AttributeError("The layer " + this.name + " has never been called and thus has no defined output shape.");for (var e = [], t = 0, n = this.inboundNodes; t < n.length; t++) {
          var r = n[t],
              i = JSON.stringify(r.outputShapes);-1 === e.indexOf(i) && e.push(i);
        }if (1 === e.length) {
          var a = this.inboundNodes[0].outputShapes;return Array.isArray(a) && Array.isArray(a[0]) && 1 === a.length ? a[0] : a;
        }throw new AttributeError("The layer " + this.name + ' has multiple inbound nodes with different output shapes. Hence the notion of "outut shape" is ill-defined for the layer.');
      }, enumerable: !0, configurable: !0 }), t.prototype.countParams = function () {
      if (!this.built) throw new RuntimeError("You tried to call countParams() on " + this.name + ", but the layer is not built yet. Build it first by calling build(batchInputShape).");return countParamsInWeights(this.weights);
    }, t.prototype.build = function (e) {
      this.built = !0;
    }, t.prototype.getWeights = function (e) {
      return void 0 === e && (e = !1), batchGetValue(e ? this.trainableWeights : this.weights);
    }, t.prototype.setWeights = function (e) {
      var t = this;tidy(function () {
        var n = t.weights;if (n.length !== e.length) throw new ValueError('You called setWeights(weights) on layer "' + t.name + '" with a weight list of length ' + e.length + ", but the layer was expecting " + n.length + " weights. Provided weights: " + e + "...");if (0 !== n.length) {
          for (var r = [], i = batchGetValue(n), a = 0; a < i.length; ++a) {
            var o = i[a],
                s = n[a],
                l = e[a];if (!util.arraysEqual(o.shape, l.shape)) throw new ValueError("Layer weight shape " + o.shape + " not compatible with provided weight shape " + l.shape);r.push([s, l]);
          }batchSetValue(r);
        }
      });
    }, t.prototype.addWeight = function (e, t, n, r, i, a, o) {
      if (-1 !== this._addedWeightNames.indexOf(e)) throw new ValueError("Duplicate weight name " + e + " for layer " + this.name);this._addedWeightNames.push(e), null == n && (n = "float32");var s = new LayerVariable(r.apply(t, n), n, e, a, o);return null != i && this.addLoss(function () {
        return i.apply(s.read());
      }), null == a && (a = !0), a ? this._trainableWeights.push(s) : this._nonTrainableWeights.push(s), s;
    }, t.prototype.addLoss = function (e) {
      var t;null == e || Array.isArray(e) && 0 === e.length || (e = toList(e), void 0 !== this._losses && null !== this._losses && (t = this.losses).push.apply(t, e));
    }, t.prototype.computeOutputShape = function (e) {
      return e;
    }, t.prototype.computeMask = function (e, t) {
      var n = this;if (!this.supportsMasking) {
        if (null != t) {
          if (!Array.isArray(t)) throw new TypeError("Layer " + this.name + " does not support masking,but was passed an inputMask.");t.forEach(function (e) {
            if (null != e) throw new TypeError("Layer " + n.name + " does not support masking,but was passed an inputMask.");
          });
        }return null;
      }return t;
    }, t.prototype.addInboundNode = function (e, t, n, r, i, a, o) {
      void 0 === o && (o = null);var s = toList(e);t = toList(t), n = toList(n), r = toList(r), i = normalizeShapeList(i), a = normalizeShapeList(a);for (var l = [], u = [], c = [], p = 0, h = s; p < h.length; p++) {
        var d = h[p];l.push(d.sourceLayer), u.push(d.nodeIndex), c.push(d.tensorIndex);
      }new Node({ outboundLayer: this, inboundLayers: l, nodeIndices: u, tensorIndices: c, inputTensors: s, outputTensors: t, inputMasks: n, outputMasks: r, inputShapes: i, outputShapes: a }, o);for (var g = 0; g < t.length; g++) t[g].sourceLayer = this, t[g].nodeIndex = this.inboundNodes.length - 1, t[g].tensorIndex = g;
    }, t.prototype.getConfig = function () {
      var e = { name: this.name, trainable: this.trainable };return null != this.batchInputShape && (e.batchInputShape = this.batchInputShape), null != this.dtype && (e.dtype = this.dtype), e;
    }, __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t.prototype, "apply", null), t = __decorate$1([doc({ heading: "Layers", subheading: "Classes", namespace: "layers" })], t);
  }(serialization.Serializable);function collectInputShape(e) {
    for (var t = [], n = 0, r = e = toList(e); n < r.length; n++) {
      var i = r[n];t.push(i.shape);
    }return singletonOrArray(t);
  }function guessOutputDType(e) {
    return "float32";
  }var InputLayer = function (e) {
    function t(t) {
      var n = e.call(this, { dtype: t.dtype, name: null != t.name ? t.name : getUid("input").toString() }) || this;if (null == t.batchSize && (t.batchSize = null), null == t.sparse && (t.sparse = !1), n.trainable = !1, n.built = !0, n.sparse = t.sparse, null != t.inputShape && null != t.batchInputShape) throw new ValueError("Only provide the inputShape OR batchInputShape argument to inputLayer, not both at the same time.");var r = t.batchInputShape;if (null == r) {
        if (null == t.inputShape) throw new ValueError("An InputLayer should be passed either a `batchInputShape` or an `inputShape`.");r = [t.batchSize].concat(t.inputShape);
      } else if (null != t.batchSize) throw new ValueError("Cannot specify batchSize if batchInputShape isspecified when creating an InputLayer.");var i = t.dtype || "float32";n.batchInputShape = r, n.dtype = i, n.inputSpec = [{ shape: r }];var a = new SymbolicTensor(n.dtype, n.batchInputShape, n, [], {}, n.name);return a.nodeIndex = 0, a.tensorIndex = 0, new Node({ outboundLayer: n, inboundLayers: [], nodeIndices: [], tensorIndices: [], inputTensors: [a], outputTensors: [a], inputMasks: [null], outputMasks: [null], inputShapes: [r], outputShapes: [r] }), n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      throw new ValueError("Cannot pass any input to an InputLayer's apply() method. InputLayer name: " + this.name);
    }, t.prototype.getConfig = function () {
      return { batchInputShape: this.batchInputShape, dtype: this.dtype, sparse: this.sparse, name: this.name };
    }, t.className = "InputLayer", t;
  }(Layer);function Input(e) {
    if (null == e.batchShape && null == e.shape) throw new Error("Please provide to Input either a `shape` or a `batchShape` argument. Note that `shape` does not include the batch dimension.");if (null != e.batchShape && null != e.shape) throw new ValueError("Please provide either a `shape` or `batchShape` argument to Input, but not both.");var t = e.batchShape;null != e.shape && null == t && (t = [null].concat(e.shape));var n = e.dtype;return null == n && (n = "float32"), new InputLayer({ batchInputShape: t, name: e.name, dtype: n, sparse: e.sparse }).inboundNodes[0].outputTensors[0];
  }serialization.SerializationMap.register(InputLayer);var Container = function (e) {
    function t(n) {
      var r = e.call(this, {}) || this;if (r.containerNodes = new Set(), r.name = n.name, null == r.name) {
        var i = r.getClassName().toLowerCase();r.name = getUid(i);
      }if (r.supportsMasking = !1, r.trainable = !0, r.updatable = !0, Array.isArray(n.inputs) ? r.inputs = n.inputs.slice() : r.inputs = [n.inputs], Array.isArray(n.outputs) ? r.outputs = n.outputs.slice() : r.outputs = [n.outputs], unique(r.inputs).length !== r.inputs.length) throw new ValueError("The list of inputs passed to the model is redundant. All inputs should only appear once. Found: " + r.inputs.map(function (e) {
        return e.name;
      }));unique(r.outputs).length !== r.outputs.length && console.warn("The list of outputs passed to the model is redundant. All outputs should only appear once. Found: " + r.outputs.map(function (e) {
        return e.name;
      })), r.inputLayers = [], r.inputLayersNodeIndices = [], r.inputLayersTensorIndices = [], r.outputLayers = [], r.outputLayersNodeIndices = [], r.outputLayersTensorIndices = [], r.layers = [];for (var a = 0, o = r.outputs; a < o.length; a++) {
        var s = (N = o[a]).sourceLayer,
            l = N.nodeIndex,
            u = N.tensorIndex;r.outputLayers.push(s), r.outputLayersNodeIndices.push(l), r.outputLayersTensorIndices.push(u);
      }for (var c = 0, p = r.inputs; c < p.length; c++) {
        s = (N = p[c]).sourceLayer, l = N.nodeIndex, u = N.tensorIndex;assert$1(0 === l, "input layer has >1 nodes"), assert$1(0 === u, "input layer has >1 tensors"), r.inputLayers.push(s), r.inputLayersNodeIndices.push(l), r.inputLayersTensorIndices.push(u);
      }r.inputNames = [], r.outputNames = [], r.feedInputShapes = [], r.feedInputNames = [], r.feedOutputNames = [];for (var h = 0; h < r.inputLayers.length; h++) {
        if (!((s = r.inputLayers[h]) instanceof InputLayer)) throw new TypeError("Input layers to a Model must be InputLayer objects. Received inputs: " + n.inputs + ". Input " + h + " (0-based) originates from layer type " + s.getClassName() + ".");r.inputNames.push(s.name), r.feedInputShapes.push(s.batchInputShape), r.feedInputNames.push(s.name);
      }for (var d = 0, g = r.outputLayers; d < g.length; d++) {
        s = g[d];r.outputNames.push(s.name);
      }r.internalInputShapes = r.inputs.map(function (e) {
        return e.shape;
      }), r.internalOutputShapes = r.outputs.map(function (e) {
        return e.shape;
      });for (var f = {}, m = {}, y = {}, v = {}, b = {}, z = [], w = function (e, n, i, a, o, s) {
        null != a && null != o && null != s || (a = e.sourceLayer, o = e.nodeIndex, s = e.tensorIndex);var l = a.inboundNodes[o];if (-1 !== i.indexOf(l)) throw new RuntimeError("The tensor " + e.name + ' at layer "' + a.name + '" is part of a cycle.');if (-1 === n.indexOf(l)) {
          r.containerNodes.add(t.nodeKey(a, o)), (a.id in b) || (b[a.id] = Object.keys(b).length), -1 === i.indexOf(l) && i.push(l);for (var u = l.inboundLayers.length, c = 0; c < u; c++) {
            var p = l.inputTensors[c],
                h = l.inboundLayers[c],
                d = l.nodeIndices[c],
                g = l.tensorIndices[c];w(p, n, i, h, d, g);
          }for (n.push(l); i.indexOf(l) >= 0;) i.splice(i.indexOf(l), 1);z.push(l);
        }
      }, S = [], I = [], _ = 0, A = r.outputs; _ < A.length; _++) {
        var N = A[_];w(N, S, I);
      }for (var E = 0, L = z.slice().reverse(); E < L.length; E++) {
        m[(H = L[E]).id] = H, H.id in f || (f[H.id] = 0);var C = f[H.id],
            k = null == y[H.outboundLayer.id] ? 0 : y[H.outboundLayer.id];C = Math.max(C, k), y[H.outboundLayer.id] = C, v[H.outboundLayer.id] = H.outboundLayer, f[H.id] = C;for (h = 0; h < H.inboundLayers.length; h++) {
          var x = H.inboundLayers[h],
              T = (l = H.nodeIndices[h], x.inboundNodes[l]),
              R = null == f[T.id] ? 0 : f[T.id];f[T.id] = Math.max(C + 1, R), m[T.id] = T;
        }
      }var D = {};for (var O in f) {
        (C = f[O]) in D || (D[C] = []), D[C].push(m[O]);
      }var M = {};for (var F in y) {
        (C = y[F]) in M || (M[C] = []), M[C].push(v[F]);
      }var P = Object.keys(M).map(function (e) {
        return parseInt(e, 10);
      }).sort(reverseNumberCompare);r.layers = [];for (var V = 0, B = P; V < B.length; V++) {
        var U = M[C = B[V]];U.sort(function (e, t) {
          var n = b[e.id],
              r = b[t.id];return n < r ? -1 : n > r ? 1 : 0;
        });for (var W = 0, j = U; W < j.length; W++) {
          s = j[W];r.layers.push(s);
        }
      }r.layersByDepth = M, P = Object.keys(D).map(function (e) {
        return parseInt(e, 10);
      }).sort(reverseNumberCompare);for (var q = r.inputs.slice(), G = [], $ = 0, Z = P; $ < Z.length; $++) for (var J = 0, K = D[C = Z[$]]; J < K.length; J++) {
        var H;if (null != (s = (H = K[J]).outboundLayer)) {
          for (var Y = 0, X = H.inputTensors; Y < X.length; Y++) {
            N = X[Y];if (-1 === q.indexOf(N)) throw new RuntimeError("Graph disconnected: cannot obtain value for tensor " + N + ' at layer "' + s.name + '". The following previous layers were accessed without issue: ' + G);
          }for (var Q = 0, ee = H.outputTensors; Q < ee.length; Q++) {
            N = ee[Q];q.push(N);
          }G.push(s.name);
        }
      }r.nodesByDepth = D;for (var te = r.layers.map(function (e) {
        return e.name;
      }), ne = function (e) {
        var t = te.filter(function (t) {
          return t === e;
        }).length;if (1 !== t) throw new RuntimeError('The name "' + e + '" is used ' + t + " times in the model. All layer names should be unique. Layer names: " + JSON.stringify(te));
      }, re = 0, ie = te; re < ie.length; re++) {
        ne(ie[re]);
      }return r.outboundNodes = [], r.inboundNodes = [], new Node({ outboundLayer: r, inboundLayers: [], nodeIndices: [], tensorIndices: [], inputTensors: r.inputs, outputTensors: r.outputs, inputMasks: r.inputs.map(function (e) {
          return null;
        }), outputMasks: r.outputs.map(function (e) {
          return null;
        }), inputShapes: r.inputs.map(function (e) {
          return e.shape;
        }), outputShapes: r.outputs.map(function (e) {
          return e.shape;
        }) }), r.built = !0, r;
    }return __extends$1(t, e), Object.defineProperty(t.prototype, "trainableWeights", { get: function () {
        if (this._trainableWeights.length > 0) throw new ValueError("Container instance unexpectedly contains _trainableWeights.The trainable weights of a Container are a union of the trainable weights of its consituent Layers. Its own _trainableWeights must remain an empty Array.");if (!this.trainable) return [];for (var e = [], t = 0, n = this.layers; t < n.length; t++) {
          var r = n[t];e = e.concat(r.trainableWeights);
        }return e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "nonTrainableWeights", { get: function () {
        for (var e = [], t = 0, n = this.layers; t < n.length; t++) {
          var r = n[t];e.push.apply(e, r.nonTrainableWeights);
        }if (!this.trainable) {
          for (var i = [], a = 0, o = this.layers; a < o.length; a++) {
            r = o[a];i.push.apply(i, r.trainableWeights);
          }return i.concat(e);
        }return e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "weights", { get: function () {
        return this.trainableWeights.concat(this.nonTrainableWeights);
      }, enumerable: !0, configurable: !0 }), t.prototype.loadWeights = function (e, t, n) {
      void 0 === t && (t = !1), void 0 === n && (n = !1), n ? loadWeightsFromNamedTensorMap(e, this.layers) : loadWeightsFromJson(e, this.layers, t);
    }, t.prototype.updatedConfig = function () {
      var e = this.getConfig();return { className: this.getClassName(), config: e, kerasVersion: "tfjs-layers " + version$1, backend: "TensorFlow.js" };
    }, t.prototype.toJSON = function (e, t) {
      void 0 === t && (t = !0);var n = convertTsToPythonic(this.updatedConfig());return t ? JSON.stringify(n) : n;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var r;return e = toList(e), r = "mask" in t ? toList(t.mask) : pyListRepeat(null, e.length), n.runInternalGraph(e, r)[0];
      });
    }, t.prototype.computeMask = function (e, t) {
      var n = this;return tidy(function () {
        var r;return e = toList(e), r = null == t ? pyListRepeat(null, e.length) : toList(t), n.runInternalGraph(e, r)[1];
      });
    }, t.prototype.computeOutputShape = function (e) {
      var t = normalizeShapeList(e);if (t.length !== this.inputLayers.length) throw new ValueError("Invalid inputShape argument " + e + ": model has " + this.inputLayers.length + " tensor inputs.");for (var n = {}, r = 0; r < t.length; r++) {
        var i = this.inputLayers[r],
            a = t[r];n[I = i.name + "_0_0"] = a;
      }var o = Object.keys(this.nodesByDepth).map(function (e) {
        return parseInt(e, 10);
      }).sort(reverseNumberCompare);if (o.length > 1) for (var s = 0, l = o; s < l.length; s++) for (var u = l[s], c = 0, p = this.nodesByDepth[u]; c < p.length; c++) {
        var h = p[c];i = h.outboundLayer;if (-1 === this.inputLayers.map(function (e) {
          return e.id;
        }).indexOf(i.id)) {
          for (var d = [], g = 0; g < h.inboundLayers.length; g++) {
            var f = h.inboundLayers[g],
                m = h.nodeIndices[g],
                y = h.tensorIndices[g],
                v = n[I = f.name + "_" + m + "_" + y];d.push(v);
          }var b = normalizeShapeList(i.computeOutputShape(singletonOrArray(d))),
              z = i.inboundNodes.indexOf(h);for (g = 0; g < b.length; g++) {
            n[I = i.name + "_" + z + "_" + g] = b[g];
          }
        }
      }var w = [],
          S = [];for (r = 0; r < this.outputLayers.length; r++) {
        i = this.outputLayers[r], z = this.outputLayersNodeIndices[r], y = this.outputLayersTensorIndices[r];var I = i.name + "_" + z + "_" + y;S.push(I);
      }for (r = 0; r < S.length; r++) {
        var _ = S[r];assert$1(_ in n), w.push(n[_]);
      }return singletonOrArray(w);
    }, t.prototype.runInternalGraph = function (e, t) {
      null == t && (t = pyListRepeat(null, e.length));for (var n = {}, r = 0; r < this.inputs.length; ++r) {
        var i = this.inputs[r],
            a = e[r],
            o = t[r];n[i.id] = [a, o];
      }for (var s = 0, l = Object.keys(this.nodesByDepth).map(function (e) {
        return parseInt(e, 10);
      }).sort(reverseNumberCompare); s < l.length; s++) for (var u = l[s], c = 0, p = this.nodesByDepth[u]; c < p.length; c++) {
        for (var h = p[c], d = h.outboundLayer, g = h.inputTensors, f = h.outputTensors, m = new Array(), y = 0, v = g; y < v.length; y++) {
          (i = v[y]).id in n && m.push(n[i.id]);
        }if (m.length === g.length) {
          var b = {},
              z = void 0,
              w = void 0,
              S = void 0,
              I = void 0;if (null != h.callArgs && (b = h.callArgs), 1 === m.length) {
            var _ = m[0],
                A = _[0],
                N = _[1];null == b.mask && (b.mask = N), S = toList(d.call(A, b)), I = toList(d.computeMask(A, N)), z = [A], w = [N];
          } else z = m.map(function (e) {
            return e[0];
          }), w = m.map(function (e) {
            return e[1];
          }), null == b.mask && (b.mask = w), S = toList(d.call(z, b)), I = toList(d.computeMask(z, w));if (d.activityRegularizer) throw new NotImplementedError("Model invocation with concrete Tensor value(s) in the presence of activity regularizer(s) is not supported yet.");for (r = 0; r < f.length; ++r) {
            i = f[r], a = S[r], o = I[r];n[i.id] = [a, o];
          }
        }
      }for (var E = [], L = [], C = [], k = 0, x = this.outputs; k < x.length; k++) {
        assert$1((i = x[k]).id in n, "Could not compute output " + i.name + " : " + i.id);var T = n[i.id],
            R = T[0];o = T[1];C.push(R.shape), E.push(R), L.push(o);
      }return [E, L, C];
    }, t.prototype.buildNodeConversionMap = function (e) {
      for (var n, r = {}, i = 0, a = this.layers; i < a.length; i++) {
        var o = a[i];n = o instanceof t ? 1 : 0;for (var s = 0; s < o.inboundNodes.length; s++) {
          var l = t.nodeKey(o, s);l in this.containerNodes && (r[l] = n, n += 1);
        }
      }return r;
    }, t.prototype.getLayer = function (e, t) {
      if (null != t) {
        if (this.layers.length <= t) throw new ValueError("Was asked to retrieve layer at index " + t + ", but model only has " + this.layers.length + " layer(s).");return this.layers[t];
      }if (null == e) throw new ValueError("Provide either a layer name or layer index");for (var n = 0, r = this.layers; n < r.length; n++) {
        var i = r[n];if (i.name === e) return i;
      }throw new ValueError("No such layer: " + e);
    }, t.prototype.calculateLosses = function () {
      var e = this;return tidy(function () {
        for (var n = [], r = 0, i = e.layers; r < i.length; r++) for (var a = i[r], o = 0; o < a.inboundNodes.length; ++o) {
          var s = t.nodeKey(a, o);e.containerNodes.has(s) && n.push.apply(n, a.calculateLosses());
        }return n;
      });
    }, t.prototype.getConfig = function () {
      for (var e = { name: this.name }, n = this.buildNodeConversionMap(this.layers), r = [], i = 0, a = this.layers; i < a.length; i++) {
        for (var o = (b = a[i]).getClassName(), s = b.getConfig(), l = [], u = 0; u < b.inboundNodes.length; u++) {
          var c = b.inboundNodes[u],
              p = t.nodeKey(b, u),
              h = {};if (this.containerNodes.has(p)) {
            if (c.callArgs) -1 === JSON.stringify(c.callArgs).indexOf("undefined") ? h = c.callArgs : (console.warn("Layer " + b.name + " was passed non-serializable keyword arguments: " + c.callArgs + ". They will not be included in the serialized model (and thus will be missing at deserialization time)."), h = {});if (c.inboundLayers.length > 0) {
              for (var d = [], g = 0; g < c.inboundLayers.length; g++) {
                var f = c.inboundLayers[g],
                    m = c.nodeIndices[g],
                    y = c.tensorIndices[g];null !== (w = n[t.nodeKey(f, m)]) && void 0 !== w || (w = 0), d.push([f.name, w, y, h]);
              }l.push(d);
            }
          }
        }r.push({ name: b.name, className: o, config: s, inboundNodes: l });
      }e.layers = r;var v = [];for (g = 0; g < this.inputLayers.length; g++) {
        var b = this.inputLayers[g];m = this.inputLayersNodeIndices[g], p = t.nodeKey(b, m);if (this.containerNodes.has(p)) {
          null !== (w = n[p]) && void 0 !== w || (w = 0);y = this.inputLayersTensorIndices[g];v.push([b.name, w, y]);
        }
      }e.inputLayers = v;var z = [];for (g = 0; g < this.outputLayers.length; g++) {
        b = this.outputLayers[g], m = this.outputLayersNodeIndices[g], p = t.nodeKey(b, m);if (this.containerNodes.has(p)) {
          var w;null !== (w = n[p]) && void 0 !== w || (w = 0);y = this.outputLayersTensorIndices[g];z.push([b.name, w, y]);
        }
      }return e.outputLayers = z, e;
    }, t.fromConfig = function (e, t) {
      var n = {},
          r = {};function i(e, t) {
        e.name in r ? r[e.name].push(t) : r[e.name] = [t];
      }function a(e, t) {
        for (var r, a = [], o = 0, s = t; o < s.length; o++) {
          var l = s[o],
              u = l[0],
              c = l[1],
              p = l[2];if (3 === l.length) r = {};else {
            if (4 !== l.length) throw new ValueError("Improperly formatted model config for layer " + JSON.stringify(e) + ": " + JSON.stringify(l));r = l[3];
          }if (!(u in n)) return void i(e, t);var h = n[u];if (h.inboundNodes.length <= c) return void i(e, t);var d = h.inboundNodes[c];a.push(d.outputTensors[p]);
        }a.length > 0 && e.apply(singletonOrArray(a), r);
      }function o(e) {
        var r = e.name,
            a = deserialize(e, null != t.customObjects ? t.customObjects : {});n[r] = a;for (var o = 0, s = e.inboundNodes; o < s.length; o++) {
          var l = s[o];if (!(l instanceof Array)) throw new ValueError("Corrupted configuration, expected array for nodeData: " + l);i(a, l);
        }
      }for (var s = t.name, l = t.layers, u = 0, c = l; u < c.length; u++) {
        o(d = c[u]);
      }for (; !isObjectEmpty(r);) for (var p = 0, h = l; p < h.length; p++) {
        var d = h[p];if ((N = n[d.name]).name in r) {
          for (var g = 0, f = r[N.name]; g < f.length; g++) {
            a(N, f[g]);
          }delete r[N.name];
        }
      }for (var m = [], y = [], v = 0, b = t.inputLayers; v < b.length; v++) {
        var z = (d = b[v])[0],
            w = d[1],
            S = d[2];assert$1(z in n);var I = (N = n[z]).inboundNodes[w].outputTensors;m.push(I[S]);
      }for (var _ = 0, A = t.outputLayers; _ < A.length; _++) {
        z = (d = A[_])[0], w = d[1], S = d[2];assert$1(z in n);var N;I = (N = n[z]).inboundNodes[w].outputTensors;y.push(I[S]);
      }return new e({ inputs: m, outputs: y, name: s });
    }, Object.defineProperty(t.prototype, "stateful", { get: function () {
        if (this._stateful) throw new ValueError("Container instance unexpectedly has _stateful = true. The statefulness of a Container is determined by the Layers it contains. Its _stateful property must remain the default false.");for (var e = 0, t = this.layers; e < t.length; e++) {
          if (t[e].stateful) return !0;
        }return !1;
      }, enumerable: !0, configurable: !0 }), __decorate$1([doc({ heading: "Layers", subheading: "Classes", namespace: "layers", subclasses: ["Model"] })], t.prototype, "getLayer", null), t;
  }(Layer);function getSourceInputs(e, t, n) {
    if ((null == t || null != n && n > 0) && (t = e.sourceLayer, n = e.nodeIndex), 0 === t.inboundNodes.length) return [e];var r = t.inboundNodes[n];if (0 === r.inboundLayers.length) return r.inputTensors;for (var i = [], a = 0; a < r.inboundLayers.length; a++) for (var o = 0, s = getSourceInputs(r.inputTensors[a], r.inboundLayers[a], r.nodeIndices[a]); o < s.length; o++) {
      var l = s[o];-1 === i.indexOf(l) && i.push(l);
    }return i;
  }function loadTensor(e, t, n) {
    var r = stringToDType(e);return Tensor.make(t, { values: 0 === t.length ? n : util.flatten(n) }, r);
  }function preprocessWeightsForLoading(e, t, n, r) {
    if (!n.startsWith("2.")) throw new ValueError("Unsupported Keras version in weights being loaded: " + n);return t;
  }function loadWeightsFromNamedTensorMap(e, t) {
    for (var n = {}, r = 0, i = 0, a = t; i < a.length; i++) for (var o = 0, s = a[i].weights; o < s.length; o++) {
      var l = s[o];if (null != n[l.originalName]) throw new ValueError("Duplicate weight name: " + l.originalName);n[l.originalName] = l, r++;
    }var u = [];for (var c in e) u.push([n[c], e[c]]), delete n[c];var p = [];for (var h in n) p.push(h);if (p.length > 0) throw new ValueError(p.length + " of " + r + " weights are not set: " + p);batchSetValue(u);
  }function loadWeightsFromJson(e, t, n) {
    void 0 === n && (n = !1);for (var r = e.keras_version, i = e.backend, a = t.map(function (e) {
      return e.name;
    }), o = {}, s = 0, l = t; s < l.length; s++) {
      null != (b = l[s]).name && (null == o[b.name] && (o[b.name] = []), o[b.name].push(b));
    }for (var u = e.weights, c = [], p = 0; p < a.length; ++p) {
      var h = a[p],
          d = u[h];null == d && (d = []);for (var g = [], f = 0; f < d.length; ++f) {
        var m = d[f];g.push(new LayerVariable(loadTensor(m.dtype, m.shape, m.value)));
      }for (var y = 0, v = o[h]; y < v.length; y++) {
        var b,
            z = (b = v[y]).weights;if ((g = preprocessWeightsForLoading(b, g, r, i)).length !== z.length) {
          if (!n) throw new ValueError("Layer #" + p + ' (named "' + b.name + '") expects ' + z.length + " weight(s), but the saved weights have " + g.length + " element(s).");console.warn("Skipping loading of weights of layer " + b.name + " due to mismatch in number of weights: (" + g.length + " vs " + z.length + ").");
        }for (var w = 0; w < g.length; ++w) !n || util.arraysEqual(z[w].shape, g[w].shape) ? c.push([z[w], g[w].read()]) : console.warn("Skipping loading of weights for layer " + b.name + " due to mismatch in shape (" + z[w].shape + " vs " + g[w].shape + ")");
      }
    }batchSetValue(c);
  }function isInteger(e) {
    return e === parseInt(e.toString(), 10);
  }function arrayProd(e, t, n) {
    null == t && (t = 0), null == n && (n = e.length);for (var r = 1, i = t; i < n; ++i) r *= e[i];return r;
  }function toArray1D(e) {
    return e = Array.isArray(e) ? new Float32Array(e) : e, tensor1d(e);
  }function min$1(e) {
    return min(toArray1D(e)).dataSync()[0];
  }function max$1(e) {
    return max(toArray1D(e)).dataSync()[0];
  }function range$1(e, t) {
    if (t < e) throw new ValueError("end (" + t + ") < begin (" + e + ") is forbidden.");for (var n = [], r = e; r < t; ++r) n.push(r);return n;
  }function cast$1(e, t) {
    return e.asType(t);
  }function expandDims$1(e, t) {
    void 0 === t && (t = -1);var n = e.shape.slice();return t < 0 && (t = n.length + t + 1), n.splice(t, 0, 1), e.reshape(n);
  }function repeat(e, t) {
    return tidy(function () {
      if (2 !== e.shape.length) throw new ValueError("repeat() expects a rank-2 tensor, but received a rank-" + e.shape.length + " tensor.");return tile$1(expandDims$1(e, 1), [1, t, 1]);
    });
  }function flatten$1(e) {
    var t = [arrayProd(e.shape)];return e.reshape(t);
  }function batchFlatten(e) {
    if (e.rank <= 1) throw new ValueError("batchFlatten requires a minimum rank of 2. Got rank: " + e.rank + ".");var t = [e.shape[0], arrayProd(e.shape, 1)];return e.reshape(t);
  }function sliceAlongFirstAxis(e, t, n) {
    return tidy(function () {
      switch (e.rank) {case 1:
          return slice1d(e, t, n);case 2:
          return slice2d(e, [t, 0], [n, e.shape[1]]);case 3:
          return slice3d(e, [t, 0, 0], [n, e.shape[1], e.shape[2]]);case 4:
          return slice4d(e, [t, 0, 0, 0], [n, e.shape[1], e.shape[2], e.shape[3]]);default:
          throw new ValueError("sliceAlongFirstAxis() received an unsupported tensor rank: " + e.rank);}
    });
  }function sliceAlongLastAxis(e, t, n) {
    return tidy(function () {
      switch (e.rank) {case 1:
          return slice1d(e, t, n);case 2:
          return slice2d(e, [0, t], [e.shape[0], n]);case 3:
          return slice3d(e, [0, 0, t], [e.shape[0], e.shape[1], n]);case 4:
          return slice4d(e, [0, 0, 0, t], [e.shape[0], e.shape[1], e.shape[2], n]);default:
          throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " + e.rank);}
    });
  }function sliceAlongAxis(e, t, n, r) {
    return tidy(function () {
      switch (e.rank) {case 1:
          return slice1d(e, t, n);case 2:
          switch (r) {case 1:
              return sliceAlongFirstAxis(e, t, n);case 2:
              return sliceAlongLastAxis(e, t, n);default:
              throw new ValueError("The axis is not within the rank of the tensor " + r);}case 3:
          switch (r) {case 1:
              return sliceAlongFirstAxis(e, t, n);case 2:
              return slice3d(e, [0, t, 0], [e.shape[0], n, e.shape[2]]);case 3:
              return sliceAlongLastAxis(e, t, n);default:
              throw new ValueError("The axis is not within the rank of the tensor " + r);}case 4:
          switch (r) {case 1:
              return sliceAlongFirstAxis(e, t, n);case 2:
              return slice4d(e, [0, t, 0, 0], [e.shape[0], n, e.shape[2], e.shape[3]]);case 3:
              return slice4d(e, [0, 0, t, 0], [e.shape[0], e.shape[1], n, e.shape[3]]);case 4:
              return sliceAlongLastAxis(e, t, n);default:
              throw new ValueError("The axis is not within the rank of the tensor " + r);}default:
          throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " + e.rank);}
    });
  }function concatenate(e, t) {
    var n;return void 0 === t && (t = -1), t < 0 && (t = 0 !== (n = e[0].rank) ? n : 0), t === e[0].rank && (t = -1), concat(e, t);
  }function concatAlongFirstAxis(e, t) {
    switch (e.rank) {case 1:
        return concat1d([e, t]);case 2:
        return concat2d([e, t], 0);case 3:
        return concat3d([e, t], 0);case 4:
        return concat4d([e, t], 0);default:
        throw new ValueError("concatAlongFirstAxis() received an unsupported tensor rank: " + e.rank);}
  }function tile$1(e, t) {
    if (Array.isArray(t) || (t = [t]), e.rank !== t.length) throw new ValueError("The length of input n (" + t.length + ") does not match the number of dimensions in input x (" + e.rank + ")");return tile(e, t);
  }function randomNormal$1(e, t, n, r, i) {
    return void 0 === t && (t = 0), void 0 === n && (n = 1), randomNormal(e, t, n, r, i);
  }function dot$1(e, t) {
    if (2 !== t.rank) throw new NotImplementedError("dot support for y other than rank 2 is not yet implemented: y shape = " + t.shape);if (2 === e.rank) return matMul(e, t);if (3 === e.rank) {
      var n = e.shape[0],
          r = e.shape[1],
          i = e.shape[2];return e = e.reshape([n * r, i]), matMul(e, t).reshape([n, r, t.shape[1]]);
    }throw new NotImplementedError("dot support for x of rank " + e.rank + " is not yet implemented: x shape = " + e.shape);
  }function gather$1(e, t, n) {
    return tidy(function () {
      return t = Array.isArray(t) ? tensor1d(t, "int32") : t.toInt(), gather(e, t, n);
    });
  }function square$1(e) {
    return mulStrict(e, e);
  }function biasAdd(e, t, n) {
    return tidy(function () {
      if (null == n && (n = imageDataFormat()), checkDataFormat(n), 1 !== t.rank && t.rank !== e.rank) throw new ValueError("Unexpected bias dimensions: " + t.rank + "; expected it to be 1 or " + e.rank);var r,
          i = t.shape;if (5 === e.rank) "channelsFirst" === n ? r = 1 === i.length ? e.add(t.reshape([1, i[0], 1, 1, 1])) : e.add(t.reshape([1, i[3], i[0], i[1], i[2]])) : "channelsLast" === n && (r = 1 === i.length ? e.add(t.reshape([1, 1, 1, 1, i[0]])) : e.add(t.reshape([1].concat(i))));else if (4 === e.rank) "channelsFirst" === n ? r = 1 === i.length ? e.add(t.reshape([1, i[0], 1, 1])) : e.add(t.reshape([1, i[2], i[0], i[1]])) : "channelsLast" === n && (r = 1 === i.length ? e.add(t.reshape([1, 1, 1, i[0]])) : e.add(t.reshape([1].concat(i))));else if (3 === e.rank) "channelsFirst" === n ? r = 1 === i.length ? e.add(t.reshape([1, i[0], 1])) : e.add(t.reshape([1, i[1], i[0]])) : "channelsLast" === n && (r = 1 === i.length ? e.add(t.reshape([1, 1, i[0]])) : e.add(t.reshape([1].concat(i))));else {
        if (!(e.rank < 3)) throw new ValueError("Unsupported input rank by biasAdd: " + e.rank);r = e.add(t);
      }return r;
    });
  }function elu$1(e, t) {
    if (void 0 === t && (t = 1), 1 !== t) throw new NotImplementedError("Support for alpha values other than 1 (" + t + ") is not implemented yet.");return elu(e);
  }function softsign(e) {
    return tidy(function () {
      return div(e, add(getScalar(1), abs(e)));
    });
  }function dropout(e, t, n, r) {
    return tidy(function () {
      if (null != n && !util.arraysEqual(e.shape, n)) throw new NotImplementedError("Non-default noise shape is not implemented yet: " + JSON.stringify(n));if (null != r) throw new NotImplementedError("seed is not implemented for dropout yet.");var i = step(add(neg(t), randomUniform(e.shape, 0, 1, "float32")));return i = mul(div(getScalar(1), sub(getScalar(1), t)), i), mul(e, i);
    });
  }function hardSigmoid(e) {
    return tidy(function () {
      var t = add(getScalar(.5), mul(getScalar(.2), e));return clipByValue(t, 0, 1);
    });
  }function inTrainPhase(e, t, n) {
    return void 0 === n && (n = !1), n ? e() : t();
  }function resolveScalarsInLogs(e) {
    return __awaiter$1(this, void 0, void 0, function () {
      var t, n, r, i, a, o, s, l;return __generator$1(this, function (u) {
        switch (u.label) {case 0:
            if (null == e) return [2];for (i in t = [], n = [], r = [], e) "number" != typeof (a = e[i]) && (o = a, t.push(o.data()), n.push(i), r.push(o));return [4, Promise.all(t)];case 1:
            for (s = u.sent(), l = 0; l < s.length; ++l) e[n[l]] = s[l][0];return dispose(r), [2];}
      });
    });
  }function disposeTensorsInLogs(e) {
    if (null != e) for (var t in e) {
      var n = e[t];"number" != typeof n && n.dispose();
    }
  }var BaseCallback = function () {
    function e() {
      this.validationData = null;
    }return e.prototype.setParams = function (e) {
      this.params = e;
    }, e.prototype.onEpochBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return [2];
        });
      });
    }, e.prototype.onEpochEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return [2];
        });
      });
    }, e.prototype.onBatchBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return [2];
        });
      });
    }, e.prototype.onBatchEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return [2];
        });
      });
    }, e.prototype.onTrainBegin = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return [2];
        });
      });
    }, e.prototype.onTrainEnd = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return [2];
        });
      });
    }, e.prototype.setModel = function (e) {}, e;
  }(),
      CallbackList = function () {
    function e(e, t) {
      void 0 === t && (t = 10), null == e && (e = []), this.callbacks = e, this.queueLength = t;
    }return e.prototype.append = function (e) {
      this.callbacks.push(e);
    }, e.prototype.setParams = function (e) {
      for (var t = 0, n = this.callbacks; t < n.length; t++) {
        n[t].setParams(e);
      }
    }, e.prototype.setModel = function (e) {
      for (var t = 0, n = this.callbacks; t < n.length; t++) {
        n[t].setModel(e);
      }
    }, e.prototype.onEpochBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var n, r;return __generator$1(this, function (i) {
          switch (i.label) {case 0:
              null == t && (t = {}), n = 0, r = this.callbacks, i.label = 1;case 1:
              return n < r.length ? [4, r[n].onEpochBegin(e, t)] : [3, 4];case 2:
              i.sent(), i.label = 3;case 3:
              return n++, [3, 1];case 4:
              return [2];}
        });
      });
    }, e.prototype.onEpochEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var n, r;return __generator$1(this, function (i) {
          switch (i.label) {case 0:
              null == t && (t = {}), n = 0, r = this.callbacks, i.label = 1;case 1:
              return n < r.length ? [4, r[n].onEpochEnd(e, t)] : [3, 4];case 2:
              i.sent(), i.label = 3;case 3:
              return n++, [3, 1];case 4:
              return [2];}
        });
      });
    }, e.prototype.onBatchBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var n, r;return __generator$1(this, function (i) {
          switch (i.label) {case 0:
              null == t && (t = {}), n = 0, r = this.callbacks, i.label = 1;case 1:
              return n < r.length ? [4, r[n].onBatchBegin(e, t)] : [3, 4];case 2:
              i.sent(), i.label = 3;case 3:
              return n++, [3, 1];case 4:
              return [2];}
        });
      });
    }, e.prototype.onBatchEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var n, r;return __generator$1(this, function (i) {
          switch (i.label) {case 0:
              null == t && (t = {}), n = 0, r = this.callbacks, i.label = 1;case 1:
              return n < r.length ? [4, r[n].onBatchEnd(e, t)] : [3, 4];case 2:
              i.sent(), i.label = 3;case 3:
              return n++, [3, 1];case 4:
              return [2];}
        });
      });
    }, e.prototype.onTrainBegin = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        var t, n;return __generator$1(this, function (r) {
          switch (r.label) {case 0:
              null == e && (e = {}), t = 0, n = this.callbacks, r.label = 1;case 1:
              return t < n.length ? [4, n[t].onTrainBegin(e)] : [3, 4];case 2:
              r.sent(), r.label = 3;case 3:
              return t++, [3, 1];case 4:
              return [2];}
        });
      });
    }, e.prototype.onTrainEnd = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        var t, n;return __generator$1(this, function (r) {
          switch (r.label) {case 0:
              null == e && (e = {}), t = 0, n = this.callbacks, r.label = 1;case 1:
              return t < n.length ? [4, n[t].onTrainEnd(e)] : [3, 4];case 2:
              r.sent(), r.label = 3;case 3:
              return t++, [3, 1];case 4:
              return [2];}
        });
      });
    }, e;
  }(),
      BaseLogger = function (e) {
    function t() {
      return e.call(this) || this;
    }return __extends$1(t, e), t.prototype.onEpochBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return this.seen = 0, this.totals = {}, [2];
        });
      });
    }, t.prototype.onBatchEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var e,
            n,
            r,
            i,
            a = this;return __generator$1(this, function (o) {
          for (i in null == t && (t = {}), e = null == t.size ? 0 : t.size, this.seen += e, n = function (n) {
            var i = t[n];if ("number" == typeof i) r.totals.hasOwnProperty(n) || (r.totals[n] = 0), r.totals[n] = r.totals[n] + i * e;else {
              var o = void 0;n in r.totals ? o = r.totals[n] : r.totals[n] = getScalar(0), r.totals[n] = tidy(function () {
                return add(a.totals[n], mul(i, getScalar(e)));
              }), null != o && o.dispose();
            }
          }, r = this, t) n(i);return [2];
        });
      });
    }, t.prototype.onEpochEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var e,
            n,
            r,
            i,
            a,
            o = this;return __generator$1(this, function (s) {
          if (null != t) for (e = function (e) {
            if (null == n.totals[e]) return "continue";"number" == typeof n.totals[e] ? t[e] = n.totals[e] / n.seen : tidy(function () {
              t[e] = mul(div(getScalar(1), getScalar(o.seen)), o.totals[e]), o.totals[e].dispose(), keep(t[e]);
            });
          }, n = this, r = 0, i = this.params.metrics; r < i.length; r++) a = i[r], e(a);return [2];
        });
      });
    }, t;
  }(BaseCallback),
      History = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.onTrainBegin = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          return this.epoch = [], this.history = {}, [2];
        });
      });
    }, t.prototype.onEpochEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var n;return __generator$1(this, function (r) {
          for (n in null == t && (t = {}), this.epoch.push(e), t) null == this.history[n] && (this.history[n] = []), this.history[n].push(t[n]);return [2];
        });
      });
    }, t.prototype.syncData = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e, t, n, r, i, a, o, s, l;return __generator$1(this, function (u) {
          switch (u.label) {case 0:
              for (r in e = [], t = [], n = [], this.history) for (i = this.history[r], a = 0; a < i.length; ++a) "number" != typeof i[a] && (o = i[a], e.push(o.data()), t.push(r), n.push(a));return [4, Promise.all(e)];case 1:
              for (s = u.sent(), l = 0; l < s.length; ++l) this.history[t[l]][n[l]].dispose(), this.history[t[l]][n[l]] = s[l][0];return [2];}
        });
      });
    }, t;
  }(BaseCallback),
      CustomCallback = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.trainBegin = t.onTrainBegin, n.trainEnd = t.onTrainEnd, n.epochBegin = t.onEpochBegin, n.epochEnd = t.onEpochEnd, n.batchBegin = t.onBatchBegin, n.batchEnd = t.onBatchEnd, n;
    }return __extends$1(t, e), t.prototype.onEpochBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (n) {
          switch (n.label) {case 0:
              return null == this.epochBegin ? [3, 3] : [4, resolveScalarsInLogs(t)];case 1:
              return n.sent(), [4, this.epochBegin(e, t)];case 2:
              n.sent(), n.label = 3;case 3:
              return [2];}
        });
      });
    }, t.prototype.onEpochEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (n) {
          switch (n.label) {case 0:
              return null == this.epochEnd ? [3, 3] : [4, resolveScalarsInLogs(t)];case 1:
              return n.sent(), [4, this.epochEnd(e, t)];case 2:
              n.sent(), n.label = 3;case 3:
              return [2];}
        });
      });
    }, t.prototype.onBatchBegin = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (n) {
          switch (n.label) {case 0:
              return null == this.batchBegin ? [3, 3] : [4, resolveScalarsInLogs(t)];case 1:
              return n.sent(), [4, this.batchBegin(e, t)];case 2:
              n.sent(), n.label = 3;case 3:
              return [2];}
        });
      });
    }, t.prototype.onBatchEnd = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (n) {
          switch (n.label) {case 0:
              return null == this.batchEnd ? [3, 3] : [4, resolveScalarsInLogs(t)];case 1:
              return n.sent(), [4, this.batchEnd(e, t)];case 2:
              n.sent(), n.label = 3;case 3:
              return [2];}
        });
      });
    }, t.prototype.onTrainBegin = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (t) {
          switch (t.label) {case 0:
              return null == this.trainBegin ? [3, 3] : [4, resolveScalarsInLogs(e)];case 1:
              return t.sent(), [4, this.trainBegin(e)];case 2:
              t.sent(), t.label = 3;case 3:
              return [2];}
        });
      });
    }, t.prototype.onTrainEnd = function (e) {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (t) {
          switch (t.label) {case 0:
              return null == this.trainEnd ? [3, 3] : [4, resolveScalarsInLogs(e)];case 1:
              return t.sent(), [4, this.trainEnd(e)];case 2:
              t.sent(), t.label = 3;case 3:
              return [2];}
        });
      });
    }, t;
  }(BaseCallback);function standardizeCallbacks(e) {
    return null == e ? null : e instanceof BaseCallback ? [e] : Array.isArray(e) && e[0] instanceof BaseCallback ? e : toList(e).map(function (e) {
      return new CustomCallback(e);
    });
  }function l2Normalize(e, t) {
    return tidy(function () {
      var n = sum(square$1(e), t, !0),
          r = mul(scalar(epsilon()), onesLike(e)),
          i = sqrt(maximum(n, r));return div(e, i);
    });
  }function meanSquaredError$1(e, t) {
    return tidy(function () {
      return mean(square$1(sub(t, e)), -1);
    });
  }function meanAbsoluteError(e, t) {
    return tidy(function () {
      return mean(abs(sub(t, e)), -1);
    });
  }function meanAbsolutePercentageError(e, t) {
    return tidy(function () {
      var n = sub(e, t),
          r = clipByValue(abs(e), epsilon(), Number.MAX_VALUE),
          i = abs(div(n, r));return mul(getScalar(100), mean(i, -1));
    });
  }function meanSquaredLogarithmicError(e, t) {
    return tidy(function () {
      var n = getScalar(1),
          r = clipByValue(t, epsilon(), Number.MAX_VALUE),
          i = log(add(n, r)),
          a = clipByValue(e, epsilon(), Number.MAX_VALUE),
          o = log(add(n, a));return mean(square$1(sub(i, o)), -1);
    });
  }function squaredHinge(e, t) {
    return tidy(function () {
      var n = getScalar(0),
          r = getScalar(1),
          i = maximum(n, sub(r, mul(e, t)));return mean(square$1(i), -1);
    });
  }function hinge(e, t) {
    return tidy(function () {
      var n = getScalar(0),
          r = getScalar(1),
          i = maximum(n, sub(r, mul(e, t)));return mean(i, -1);
    });
  }function categoricalHinge(e, t) {
    return tidy(function () {
      var n = getScalar(0),
          r = getScalar(1),
          i = sum(mul(e, t), -1),
          a = max(mul(sub(r, e), t), -1);return maximum(n, add(r, sub(a, i)));
    });
  }function logcosh(e, t) {
    return tidy(function () {
      var n = getScalar(Math.log(2)),
          r = sub(t, e),
          i = sub(add(r, softplus(mul(getScalar(-2), r))), n);return mean(i, -1);
    });
  }function categoricalCrossentropy(e, t, n) {
    return void 0 === n && (n = !1), tidy(function () {
      if (n) t = softmax(t);else {
        var r = sum(t, t.shape.length - 1, !0);t = div(t, r);
      }return t = clipByValue(t, epsilon(), 1 - epsilon()), neg(sum(mul(e.toFloat(), log(t)), t.shape.length - 1));
    });
  }function sparseCategoricalCrossentropy(e, t, n) {
    return void 0 === n && (n = !1), tidy(function () {
      var r = floor(flatten$1(e)).toInt(),
          i = t.shape;return categoricalCrossentropy(oneHot(r, i[i.length - 1]).reshape(i), t, n);
    });
  }function sigmoidCrossEntropyWithLogits$1(e, t) {
    return tidy(function () {
      var n = maximum(t, zerosLike(t)),
          r = mul(t, e),
          i = log(add(getScalar(1), exp(neg(abs(t)))));return add(sub(n, r), i);
    });
  }function binaryCrossentropy(e, t) {
    return tidy(function () {
      var n;return n = clipByValue(t, epsilon(), 1 - epsilon()), n = log(div(n, sub(onesLike(n), n))), mean(sigmoidCrossEntropyWithLogits$1(e, n), -1);
    });
  }function kullbackLeiblerDivergence(e, t) {
    return tidy(function () {
      var n = clipByValue(e, epsilon(), 1),
          r = clipByValue(t, epsilon(), 1);return sum(mul(e, log(div(n, r))), -1);
    });
  }function poisson(e, t) {
    return tidy(function () {
      var n = log(add(getScalar(epsilon()), t));return mean(sub(t, mul(e, n)), -1);
    });
  }function cosineProximity(e, t) {
    return tidy(function () {
      var n = l2Normalize(e, -1),
          r = l2Normalize(t, -1),
          i = mul(n, r);return neg(sum(i, -1));
    });
  }function get(e) {
    var t = { meanSquaredError: meanSquaredError$1, meanAbsoluteError: meanAbsoluteError, meanAbsolutePercentageError: meanAbsolutePercentageError, meanSquaredLogarithmicError: meanSquaredLogarithmicError, squaredHinge: squaredHinge, hinge: hinge, categoricalHinge: categoricalHinge, logcosh: logcosh, categoricalCrossentropy: categoricalCrossentropy, sparseCategoricalCrossentropy: sparseCategoricalCrossentropy, binaryCrossentropy: binaryCrossentropy, kullbackLeiblerDivergence: kullbackLeiblerDivergence, poisson: poisson, cosineProximity: cosineProximity };if ("string" == typeof e) {
      if (e in t) return t[e];throw new ValueError("Unknown loss " + e);
    }return e;
  }function binaryAccuracy(e, t) {
    return tidy(function () {
      var n = mul(getScalar(.5), onesLike(t)),
          r = cast$1(greater(t, n), e.dtype);return mean(equal(e, r), -1);
    });
  }function categoricalAccuracy(e, t) {
    return tidy(function () {
      return cast$1(equal(argMax(e, -1), argMax(t, -1)), "float32");
    });
  }function binaryCrossentropy$1(e, t) {
    return binaryCrossentropy(e, t);
  }function sparseCategoricalAccuracy(e, t) {
    throw new NotImplementedError();
  }var mse$1 = meanSquaredError$1,
      MSE$1 = meanSquaredError$1,
      mae$1 = meanAbsoluteError,
      MAE$1 = meanAbsoluteError,
      mape$1 = meanAbsolutePercentageError,
      MAPE$1 = meanAbsolutePercentageError,
      categoricalCrossentropy$1 = categoricalCrossentropy,
      cosine$1 = cosineProximity,
      sparseCategoricalCrossentropy$1 = sparseCategoricalCrossentropy;function get$1(e) {
    var t = { binaryAccuracy: binaryAccuracy, categoricalAccuracy: categoricalAccuracy, categoricalCrossentropy: categoricalCrossentropy$1, sparseCategoricalCrossentropy: sparseCategoricalCrossentropy$1, mse: mse$1, MSE: MSE$1, mae: mae$1, MAE: MAE$1, mape: mape$1, MAPE: MAPE$1, cosine: cosine$1 };if ("string" == typeof e && e in t) return t[e];if ("string" != typeof e && null != e) return e;throw new ValueError("Unknown metric " + e);
  }function getOptimizer(e) {
    var t = { Adagrad: function () {
        return train.adagrad(.01);
      }, Adadelta: function () {
        return train.adadelta(1, .95, epsilon());
      }, Adam: function () {
        return train.adam(.001, .9, .999, epsilon());
      }, Adamax: function () {
        return train.adamax(.002, .9, .999, epsilon(), 0);
      }, RMSProp: function () {
        return train.rmsprop(.001, .9, 0, epsilon());
      }, SGD: function () {
        return train.sgd(.01);
      } };if (t.adagrad = t.Adagrad, t.adadelta = t.Adadelta, t.adam = t.Adam, t.adamax = t.Adamax, t.rmsprop = t.RMSProp, t.sgd = t.SGD, e in t) return t[e]();throw new ValueError("Unknown Optimizer " + e);
  }function printSummary(e, t, n, r) {
    void 0 === r && (r = console.log);var i,
        a = isModelSequentialLike(e),
        o = ["Layer (type)", "Output shape", "Param #"];if (a ? (t = t || 65, n = n || [.45, .85, 1]) : (t = t || 98, n = n || [.33, .55, .67, 1]), n[n.length - 1] <= 1 && (n = n.map(function (e) {
      return Math.floor(t * e);
    })), !a) for (var s in o.push("Receives inputs"), i = [], e.nodesByDepth) i.push.apply(i, e.nodesByDepth[s]);r("_".repeat(t)), printRow(o, n, r), r("=".repeat(t));for (var l, u = e.layers, c = 0; c < u.length; ++c) a ? printLayerSummary(u[c], n, r) : printLayerSummaryWithConnections(u[c], n, i, r), r((c === u.length - 1 ? "=" : "_").repeat(t));e.checkTrainableWeightsConsistency(), l = null != e.collectedTrainableWeights ? countParamsInWeights(e.collectedTrainableWeights) : countParamsInWeights(e.trainableWeights);var p = countParamsInWeights(e.nonTrainableWeights);r("Total params: " + (l + p)), r("Trainable params: " + l), r("Non-trainable params: " + p), r("_".repeat(t));
  }function isModelSequentialLike(e) {
    var t = !0,
        n = [],
        r = [];for (var i in e.nodesByDepth) n.push(e.nodesByDepth[i]);for (var a = 0, o = n; a < o.length; a++) {
      var s = o[a];if (s.length > 1 || 1 === s.length && s[0].inboundLayers.length > 1) {
        t = !1;break;
      }r.push.apply(r, s);
    }if (t) for (var l = 0, u = e.layers; l < u.length; l++) {
      for (var c = !1, p = 0, h = u[l].inboundNodes; p < h.length; p++) {
        var d = h[p];if (-1 !== r.indexOf(d)) {
          if (c) {
            t = !1;break;
          }c = !0;
        }
      }if (!t) break;
    }return t;
  }function printRow(e, t, n) {
    void 0 === n && (n = console.log);for (var r = "", i = 0; i < e.length; ++i) i > 0 && (r = r.slice(0, r.length - 1) + " "), r = (r += e[i]).slice(0, t[i]), r += " ".repeat(t[i] - r.length);n(r);
  }function printLayerSummary(e, t, n) {
    var r;try {
      r = JSON.stringify(e.outputShape);
    } catch (e) {
      r = "multiple";
    }printRow([e.name + " (" + e.getClassName() + ")", r, e.countParams().toString()], t, n);
  }function printLayerSummaryWithConnections(e, t, n, r) {
    var i;try {
      i = JSON.stringify(e.outputShape);
    } catch (e) {
      i = "multiple";
    }for (var a = [], o = 0, s = e.inboundNodes; o < s.length; o++) {
      var l = s[o];if (!(null != n && n.length > 0 && -1 === n.indexOf(l))) for (var u = 0; u < l.inboundLayers.length; ++u) {
        var c = l.inboundLayers[u].name,
            p = l.nodeIndices[u],
            h = l.tensorIndices[u];a.push(c + "[" + p + "][" + h + "]");
      }
    }var d = e.name,
        g = e.getClassName(),
        f = 0 === a.length ? "" : a[0];printRow([d + " (" + g + ")", i, e.countParams().toString(), f], t, r);for (u = 1; u < a.length; ++u) printRow(["", "", "", a[u]], t, r);
  }function assertFeedCompatibility(e, t) {
    if (null != e.dtype && e.dtype !== t.dtype) throw new ValueError("The dtype of the feed (" + t.dtype + ") is incompatible with that of the key '" + e.name + "' (" + e.dtype + ").");if (null != e.shape) {
      if (e.shape.length !== t.shape.length) throw new ValueError("The rank of feed (" + t.shape.length + ") does not match the rank of the key (" + e.shape.length + ").");for (var n = 0; n < e.shape.length; ++n) if (null != e.shape[n] && e.shape[n] !== t.shape[n]) throw new ValueError("The " + n + "-th dimension of the feed (" + t.shape[n] + ") is incompatible with that of the key (" + e.shape[n] + ").");
    }
  }var ModelLoggingVerbosity,
      FeedDict = function () {
    function e(t) {
      if (this.id2Value = {}, t instanceof e) for (var n in t.id2Value) this.id2Value[n] = t.id2Value[n];else {
        if (null == t) return;for (var r = 0, i = t; r < i.length; r++) {
          var a = i[r];this.add(a.key, a.value);
        }
      }
    }return e.prototype.add = function (e, t) {
      if (assertFeedCompatibility(e, t), null != this.id2Value[e.id]) throw new ValueError("Duplicate key: name=" + e.name + ", id=" + e.id);return this.id2Value[e.id] = t, this;
    }, e.prototype.addFeed = function (e) {
      this.add(e.key, e.value);
    }, e.prototype.hasKey = function (e) {
      return null != this.id2Value[e.id];
    }, e.prototype.getValue = function (e) {
      if (null == this.id2Value[e.id]) throw new ValueError("Nonexistent key: " + JSON.stringify(e));return this.id2Value[e.id];
    }, e;
  }();function execute(e, t, n) {
    for (var r = Array.isArray(e), i = r ? e : [e], a = [], o = new FeedDict(t), s = 0, l = i; s < l.length; s++) {
      var u = l[s];a.push(executeInternal(u, o, n));
    }return r ? a : a[0];
  }function executeInternal(e, t, n) {
    if (t.hasKey(e)) return t.getValue(e);if (e.sourceLayer instanceof InputLayer) throw new ValueError("Missing a feed value for SymbolicTensor from InputLayer '" + InputLayer.name + "'");for (var r = [], i = 0, a = e.inputs; i < a.length; i++) {
      var o = executeInternal(a[i], t, n);r.push(o);
    }var s = e.sourceLayer.apply(r, n);Array.isArray(s) || (s = [s]);for (var l = getNodeOutputs(e), u = Array.isArray(l) ? l : [l], c = 0; c < u.length; ++c) t.add(u[c], s[c]);return 1 === s.length ? s[0] : s[e.outputTensorIndex];
  }function getNodeOutputs(e) {
    var t;if (1 === e.sourceLayer.inboundNodes.length) t = e.sourceLayer.output;else {
      for (var n = null, r = 0; r < e.sourceLayer.inboundNodes.length; ++r) for (var i = 0, a = e.sourceLayer.inboundNodes[r].outputTensors; i < a.length; i++) {
        if (a[i].id === e.id) {
          n = r;break;
        }
      }t = e.sourceLayer.getOutputAt(n);
    }return t;
  }function isDataTensor(e) {
    return e instanceof Tensor;
  }function isDataArray(e) {
    return Array.isArray(e);
  }function isDataDict(e) {
    return !isDataTensor(e) && !isDataArray(e);
  }function standardizeInputData(e, t, n, r, i) {
    if (void 0 === r && (r = !0), void 0 === i && (i = ""), null == t || 0 === t.length) {
      if (null != e) {
        var a = !1;if (isDataArray(e) && e.length > 0) a = !0;else if (isDataDict(e)) {
          for (var o in e) if (e.hasOwnProperty(o)) {
            a = !0;break;
          }
        } else a = !0;if (a) throw new ValueError("Error when checking model " + i + " expected no data, but got " + e);
      }return [];
    }if (null == e) return t.map(function (e) {
      return null;
    });var s;if (isDataDict(e)) {
      e = e, s = [];for (var l = 0, u = t; l < u.length; l++) {
        var c = u[l];if (null == e[c]) throw new ValueError('No data provided for "' + c + '". Need data for each key in: ' + t);s.push(e[c]);
      }
    } else if (isDataArray(e)) {
      if ((e = e).length !== t.length) throw new ValueError("Error when checking model " + i + ": the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see " + t.length + " Tensor(s), but instead got the following list of Tensor(s): " + e);s = e;
    } else {
      if (e = e, t.length > 1) throw new ValueError("The model " + i + " expects " + t.length + " Tensor(s), but only received one Tensor. Found: Tensor with shape " + e.shape);s = [e];
    }for (var p = 0; p < t.length; ++p) {
      1 === (h = s[p]).shape.length && (s[p] = expandDims$1(h, 1));
    }if (null != n) for (p = 0; p < t.length; ++p) if (null != n[p]) {
      var h;if ((h = s[p]).shape.length !== n[p].length) throw new ValueError("Error when checking " + i + ": expected " + t[p] + " to have " + n[p].length + " dimension(s). but got array with shape " + h.shape);for (var d = 0; d < n[p].length; ++d) if (0 !== d || r) {
        var g = h.shape[d],
            f = n[p][d];if (null != f && f >= 0 && g !== f) throw new ValueError("Error when checking " + i + ": expected " + t[p] + " to have shape [" + n[p] + "], but got array with shape [" + h.shape + "].");
      }
    }return s;
  }function checkArrayLengths(e, t, n) {
    var r = unique(e.map(function (e) {
      return e.shape[0];
    }));r.sort();var i = unique(t.map(function (e) {
      return e.shape[0];
    }));if (i.sort(), r.length > 1) throw new ValueError("All input Tensors (x) should have the same number of samples. Got array shapes: " + JSON.stringify(e.map(function (e) {
      return e.shape;
    })));if (i.length > 1) throw new ValueError("All target Tensors (y) should have the same number of samples. Got array shapes: " + JSON.stringify(t.map(function (e) {
      return e.shape;
    })));if (r.length > 0 && i.length > 0 && !util.arraysEqual(r, i)) throw new ValueError("Input Tensors should have the same number of samples as target Tensors. Found " + r[0] + " input sample(s) and " + i[0] + " target sample(s).");
  }function checkLossAndTargetCompatibility(e, t, n) {
    for (var r = [meanSquaredError$1, binaryCrossentropy, categoricalCrossentropy], i = 0; i < e.length; ++i) {
      var a = e[i],
          o = t[i],
          s = n[i];if (null != o) {
        if (o === categoricalCrossentropy && 1 === a.shape[a.shape.length - 1]) throw new ValueError("You are passing a target array of shape " + a.shape + " while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].");if (-1 !== r.indexOf(o)) for (var l = a.shape.slice(1), u = s.slice(1), c = 0; c < l.length; ++c) {
          var p = l[c],
              h = u[c];if (null != h && p !== h) throw new ValueError("A target Tensor with shape " + a.shape + " was passed for an output of shape " + s + ", while using a loss function that expects targets to have the same shape as the output.");
        }
      }
    }
  }function makeBatches(e, t) {
    for (var n = [], r = 0, i = null; r < e;) (i = r + t) >= e && (i = e), n.push([r, i]), r = i;return n;
  }function sliceArrays(e, t, n) {
    return null == e ? [null] : Array.isArray(e) ? e.map(function (e) {
      return sliceAlongFirstAxis(e, t, n - t);
    }) : sliceAlongFirstAxis(e, t, n - t);
  }function sliceArraysByIndices(e, t) {
    return tidy(function () {
      return null == e ? null : Array.isArray(e) ? e.map(function (e) {
        return sliceArraysByIndices(e, t);
      }) : gather$1(e, "int32" === t.dtype ? t : t.toInt());
    });
  }function checkInputData(e, t, n, r, i) {
    var a;if (void 0 === r && (r = !0), void 0 === i && (i = ""), Array.isArray(e)) {
      if (e.length !== t.length) throw new ValueError("Error when checking model " + i + ": the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see " + t.length + " Tensor(s), but instead got " + e.length + " Tensors(s).");a = e;
    } else {
      if (t.length > 1) throw new ValueError("The model expects " + t.length + " " + i + " Tensors, but only received one Tensor. Found: array with shape " + JSON.stringify(e.shape) + ".");a = [e];
    }if (null != n) for (var o = 0; o < t.length; ++o) if (null != n[o]) {
      var s = a[o];if (s.shape.length !== n[o].length) throw new ValueError("Error when checking " + i + ": expected " + t[o] + " to have " + n[o].length + " dimension(s), but got array with shape " + JSON.stringify(s.shape));for (var l = 0; l < n[o].length; ++l) if (0 !== l || r) {
        var u = s.shape[l],
            c = n[o][l];if (null != c && c !== u) throw new ValueError("Error when checking " + i + ": expected " + t[o] + " to have shape " + JSON.stringify(n[o]) + " but got array with shape " + JSON.stringify(s.shape) + ".");
      }
    }
  }function collectMetrics(e, t) {
    if (null == e || Array.isArray(e) && 0 === e.length) return t.map(function (e) {
      return [];
    });if (Array.isArray(e)) return t.map(function (t) {
      return e;
    });if (null != e) {
      for (var n = [], r = 0, i = t; r < i.length; r++) {
        var a = i[r],
            o = e.hasOwnProperty(a) ? e[a] : [];Array.isArray(o) || (o = [o]), n.push(o);
      }return n;
    }throw new TypeError("Type of metrics argument not understood. Expected an Array or Object, found: " + e);
  }!function (e) {
    e[e.SILENT = 0] = "SILENT", e[e.VERBOSE = 1] = "VERBOSE";
  }(ModelLoggingVerbosity || (ModelLoggingVerbosity = {}));var Model = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.summary = function (e, t, n) {
      if (void 0 === n && (n = console.log), !this.built) throw new ValueError("This model has never been called, thus its weights have not been created yet. So no summary can be displayed. Build the model first (e.g., by calling it on some test data).");printSummary(this, e, t, n);
    }, t.prototype.compile = function (e) {
      var t = this;if (null == e.loss && (e.loss = []), this.loss = e.loss, "string" == typeof e.optimizer) this.optimizer = getOptimizer(e.optimizer);else {
        if (!(e.optimizer instanceof Optimizer)) throw new ValueError("User-defined optimizer must be an instance of tf.Optimizer.");this.optimizer = e.optimizer;
      }var n = [];if (Array.isArray(e.loss) || "string" == typeof e.loss || "function" == typeof e.loss) {
        if (Array.isArray(e.loss)) {
          if (e.loss.length !== this.outputs.length) throw new ValueError("When passing an Array as loss, it should have one entry per model output. The model has " + this.outputs.length + " output(s), but you passed loss=" + e.loss + ".");var r = e.loss;n = r.map(function (e) {
            return get(e);
          });
        } else {
          var i = get(e.loss);this.outputs.map(function (e) {
            n.push(i);
          });
        }
      } else {
        for (var a in e.loss = e.loss, e.loss) if (-1 === this.outputNames.indexOf(a)) throw new ValueError('Unknown entry in loss dictionary: "' + a + '". Only expect the following keys: ' + this.outputNames);for (var o in this.outputNames) null == e.loss[o] && console.warn('Output "' + o + '" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ' + o + " during training"), n.push(get(e.loss[o]));
      }this.lossFunctions = n, this.feedOutputNames = [], this.feedOutputShapes = [], this.feedLossFns = [];for (var s = 0; s < this.outputs.length; ++s) {
        var l = this.internalOutputShapes[s],
            u = this.outputNames[s];this.feedOutputNames.push(u), this.feedOutputShapes.push(l), this.feedLossFns.push(this.lossFunctions[s]);
      }var c = [];this.metrics = e.metrics, this.metricsNames = ["loss"], this.metricsTensors = [], nameScope("loss", function () {
        for (var e = 0; e < t.outputs.length; ++e) if (-1 === c.indexOf(e)) {
          var n = t.lossFunctions[e];t.outputs.length > 1 && (t.metricsTensors.push([n, e]), t.metricsNames.push(t.outputNames[e] + "_loss"));
        }
      });var p = collectMetrics(e.metrics, this.outputNames);nameScope("metric", function () {
        for (var e = function (e) {
          if (-1 !== c.indexOf(e)) return "continue";!function (n) {
            for (var r, i, a, o = function (n) {
              if (-1 !== ["accuracy", "acc", "crossentropy", "ce"].indexOf(n)) {
                var o = t.internalOutputShapes[e];1 === o[o.length - 1] || t.lossFunctions[e] === binaryCrossentropy ? -1 !== ["accuracy", "acc"].indexOf(n) ? i = binaryAccuracy : -1 !== ["crossentropy", "ce"].indexOf(n) && (i = binaryCrossentropy$1) : t.lossFunctions[e] === sparseCategoricalCrossentropy ? -1 !== ["accuracy", "acc"].indexOf(n) ? i = sparseCategoricalAccuracy : -1 !== ["crossentropy", "ce"].indexOf(n) && (i = sparseCategoricalCrossentropy$1) : -1 !== ["accuracy", "acc"].indexOf(n) ? i = categoricalAccuracy : -1 !== ["crossentropy", "ce"].indexOf(n) && (i = categoricalCrossentropy$1);var s = void 0;-1 !== ["accuracy", "acc"].indexOf(n) ? s = "acc" : -1 !== ["crossentropy", "ce"].indexOf(n) && (s = "ce"), a = i, r = "" + s;
              } else {
                var l = get$1(n);a = l, r = "" + n;
              }var u;nameScope(r, function () {
                u = a;
              }), function (e, n, r) {
                t.outputNames.length > 1 && (n = t.outputNames[e] + "_" + n), t.metricsNames.push(n), t.metricsTensors.push([r, e]);
              }(e, r, u);
            }, s = 0, l = n; s < l.length; s++) o(l[s]);
          }(p[e]);
        }, n = 0; n < t.outputs.length; ++n) e(n);
      }), this.collectedTrainableWeights = this.trainableWeights;
    }, t.prototype.checkTrainableWeightsConsistency = function () {
      null != this.collectedTrainableWeights && this.trainableWeights.length !== this.collectedTrainableWeights.length && console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?");
    }, t.prototype.evaluate = function (e, t, n) {
      void 0 === n && (n = {});var r = null == n.batchSize ? 32 : n.batchSize,
          i = this.standardizeUserData(e, t, !0, r),
          a = i[0].concat(i[1]);this.makeTestFunction();var o = this.testFunction;return singletonOrArray(this.testLoop(o, a, r, n.verbose, n.steps));
    }, t.prototype.checkNumSamples = function (e, t, n, r) {
      var i;if (void 0 === r && (r = "steps"), null != n) {
        if (i = null, null != t) throw new ValueError("If " + r + " is set, batchSize must be null or undefined.Got batchSize = " + t);
      } else {
        if (null == e) throw new ValueError("Either the input data should have a defined shape, or " + r + " shoud be specified.");i = Array.isArray(e) ? e[0].shape[0] : e.shape[0];
      }return i;
    }, t.prototype.execute = function (e, t) {
      if (Array.isArray(t) && 0 === t.length) throw new ValueError("`outputs` is an empty Array, which is not allowed.");var n = Array.isArray(t),
          r = n ? t : [t],
          i = this.retrieveSymbolicTensors(r),
          a = new FeedDict();if (e instanceof Tensor && (e = [e]), Array.isArray(e)) {
        if (e.length !== this.inputs.length) throw new ValueError("The number of inputs provided (" + e.length + ") does not match the number of inputs of this model (" + this.inputs.length + ").");for (var o = 0; o < this.inputs.length; ++o) a.add(this.inputs[o], e[o]);
      } else for (var s = 0, l = this.inputs; s < l.length; s++) {
        var u = l[s],
            c = e[u.name];if (null == c) throw new ValueError("No value is provided for the model's input " + u.name);a.add(u, c);
      }var p = execute(i, a);return n ? p : p[0];
    }, t.prototype.retrieveSymbolicTensors = function (e) {
      for (var t = pyListRepeat(null, e.length), n = e.length, r = 0, i = this.layers; r < i.length; r++) {
        for (var a = i[r], o = Array.isArray(a.output) ? a.output : [a.output], s = o.map(function (e) {
          return e.name;
        }), l = 0; l < e.length; ++l) {
          var u = s.indexOf(e[l]);if (-1 !== u && (t[l] = o[u], n--), 0 === n) break;
        }if (0 === n) break;
      }if (n > 0) {
        var c = [];throw t.forEach(function (t, n) {
          null == t && c.push(e[n]);
        }), new ValueError("Cannot find SymbolicTensors for output name(s): " + JSON.stringify(c));
      }return t;
    }, t.prototype.predictLoop = function (e, t, n) {
      var r = this;return void 0 === t && (t = 32), void 0 === n && (n = !1), tidy(function () {
        var i = r.checkNumSamples(e);if (n) throw new NotImplementedError("Verbose predictLoop() is not implemented yet.");for (var a = makeBatches(i, t), o = [], s = function (t) {
          var n = tidy(function () {
            var n = a[t][0],
                i = a[t][1],
                o = sliceArrays(e, n, i),
                s = [];if (Array.isArray(o)) for (var l = 0; l < o.length; ++l) s.push({ key: r.inputs[l], value: o[l] });else s.push({ key: r.inputs[0], value: o });var u = new FeedDict(s);return execute(r.outputs, u);
          });if (0 === t) for (var i = 0, s = n; i < s.length; i++) {
            var l = s[i];o.push(l);
          } else for (var u = 0; u < n.length; ++u) o[u] = concatAlongFirstAxis(o[u], n[u]);
        }, l = 0; l < a.length; ++l) s(l);return singletonOrArray(o);
      });
    }, t.prototype.predict = function (e, t) {
      void 0 === t && (t = {}), checkInputData(e, this.inputNames, this.feedInputShapes, !1);var n = null == t.batchSize ? 32 : t.batchSize;return this.predictLoop(e, n);
    }, t.prototype.predictOnBatch = function (e) {
      return checkInputData(e, this.inputNames, this.feedInputShapes, !0), this.predictLoop(e, e.shape[0]);
    }, t.prototype.standardizeUserData = function (e, t, n, r) {
      if (void 0 === n && (n = !0), null == this.optimizer) throw new RuntimeError("You must compile a model before training/testing. Use Model.compile(modelCompileConfig).");for (var i = [], a = 0; a < this.feedOutputShapes.length; ++a) {
        var o = this.feedOutputShapes[a];this.feedLossFns[a] === sparseCategoricalCrossentropy ? i.push(o.slice(0, o.length - 1).concat([1])) : i.push(o);
      }if (checkArrayLengths(e = standardizeInputData(e, this.feedInputNames, this.feedInputShapes, !1, "input"), t = standardizeInputData(t, this.feedOutputNames, i, !1, "target"), null), checkLossAndTargetCompatibility(t, this.feedLossFns, this.feedOutputShapes), this.stateful && null != r && r > 0 && e[0].shape[0] % r != 0) throw new ValueError("In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size " + r + ". Found: " + e[0].shape[0] + " sample(s).");return [e, t, null];
    }, t.prototype.fitLoop = function (e, t, n, r, i, a, o, s, l, u, c, p, h, d) {
      return void 0 === p && (p = 0), __awaiter$1(this, void 0, void 0, function () {
        var g,
            f,
            m,
            y,
            v,
            b,
            z,
            w = this;return __generator$1(this, function (S) {
          switch (S.label) {case 0:
              if (null == r && (r = 32), null == i && (i = 1), null == u && (u = !0), null == p && (p = 0), g = !1, null != s && null != l && (g = !0), null != d && (g = !0, null == h)) throw new ValueError("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");if (null != (f = this.checkNumSamples(t, r, h, "steps_per_epoch")) && (m = range$1(0, f)), this.history = new History(), o = (o = null == o ? [new BaseLogger()] : [new BaseLogger()].concat(o)).concat([this.history]), a > 0) throw new NotImplementedError("Verbose mode is not implemented yet.");return (y = new CallbackList(o)).setModel(this), y.setParams({ epochs: i, steps: h, verbose: a, doValidation: g, metrics: c }), [4, y.onTrainBegin()];case 1:
              S.sent(), this.stopTraining = !1, v = function (i) {
                var a, o, c, p, d;return __generator$1(this, function (v) {
                  switch (v.label) {case 0:
                      return [4, y.onEpochBegin(i)];case 1:
                      if (v.sent(), a = {}, null == h) return [3, 2];throw new NotImplementedError("stepsPerEpoch mode is not implemented yet.");case 2:
                      if ("batch" === u) throw new NotImplementedError("batch shuffling is not implemneted yet");u && util.shuffle(m), o = tensor1d(m), c = makeBatches(f, r), p = function (i) {
                        var u;return __generator$1(this, function (p) {
                          switch (p.label) {case 0:
                              return u = {}, [4, y.onBatchBegin(i, u)];case 1:
                              return p.sent(), tidy(function () {
                                var p = c[i][0],
                                    h = c[i][1],
                                    d = sliceAlongFirstAxis(o, p, h - p);u.batch = i, u.size = h - p;for (var f = sliceArraysByIndices(t, d), m = e(f), y = 0; y < n.length; ++y) {
                                  var v = n[y],
                                      b = m[y];u[v] = b, keep(b);
                                }if (i === c.length - 1 && g) {
                                  var z = w.testLoop(s, l, r);for (y = 0; y < n.length; ++y) {
                                    v = n[y], b = z[y];keep(b), a["val_" + v] = b;
                                  }
                                }
                              }), [4, y.onBatchEnd(i, u)];case 2:
                              return p.sent(), disposeTensorsInLogs(u), b.stopTraining ? [2, "break"] : [2];}
                        });
                      }, d = 0, v.label = 3;case 3:
                      return d < c.length ? [5, p(d)] : [3, 6];case 4:
                      if ("break" === v.sent()) return [3, 6];v.label = 5;case 5:
                      return ++d, [3, 3];case 6:
                      o.dispose(), v.label = 7;case 7:
                      return [4, y.onEpochEnd(i, a)];case 8:
                      return v.sent(), b.stopTraining ? [2, "break"] : [2];}
                });
              }, b = this, z = p, S.label = 2;case 2:
              return z < i ? [5, v(z)] : [3, 5];case 3:
              if ("break" === S.sent()) return [3, 5];S.label = 4;case 4:
              return ++z, [3, 2];case 5:
              return [4, y.onTrainEnd()];case 6:
              return S.sent(), [4, this.history.syncData()];case 7:
              return S.sent(), [2, this.history];}
        });
      });
    }, t.prototype.testLoop = function (e, t, n, r, i) {
      var a = this;return void 0 === r && (r = 0), tidy(function () {
        var o = a.checkNumSamples(t, n, i, "steps"),
            s = [];if (1 === r) throw new NotImplementedError("Verbose mode is not implemented yet.");if (null != i) throw new NotImplementedError("steps mode in testLoop() is not implemented yet");for (var l = makeBatches(o, n), u = tensor1d(range$1(0, o)), c = 0; c < l.length; ++c) {
          var p = l[c][0],
              h = l[c][1],
              d = sliceAlongFirstAxis(u, p, h - p),
              g = sliceArraysByIndices(t, d),
              f = e(g);if (0 === c) for (var m = 0; m < f.length; ++m) s.push(getScalar(0));for (m = 0; m < f.length; ++m) {
            var y = f[m];s[m] = add(s[m], mul(getScalar(h - p), y));
          }
        }for (m = 0; m < s.length; ++m) s[m] = div(s[m], getScalar(o));return s;
      });
    }, t.prototype.getDedupedMetricsNames = function () {
      for (var e = this.metricsNames, t = [], n = 0; n < e.length; ++n) {
        var r = e[n],
            i = r;if (count(e, r) > 1) i += "_" + count(e.slice(0, n), r);t.push(i);
      }return t;
    }, t.prototype.makeTestFunction = function () {
      var e = this;this.testFunction = function (t) {
        return tidy(function () {
          for (var n, r = [], i = t.slice(0, e.inputs.length), a = t.slice(e.inputs.length, e.inputs.length + e.outputs.length), o = [], s = 0; s < e.inputs.length; ++s) o.push({ key: e.inputs[s], value: i[s] });var l = new FeedDict(o),
              u = execute(e.outputs, l);for (s = 0; s < e.lossFunctions.length; ++s) {
            var c = e.lossFunctions[s],
                p = mean(c(a[s], u[s]));n = 0 === s ? p : add(n, p), r.push(n);
          }for (s = 0; s < e.metricsTensors.length; ++s) {
            var h = e.metricsTensors[s][0],
                d = e.metricsTensors[s][1],
                g = mean(h(a[d], u[d]));r.push(g);
          }return r;
        });
      };
    }, t.prototype.fit = function (e, t, n) {
      return void 0 === n && (n = {}), __awaiter$1(this, void 0, void 0, function () {
        var r,
            i,
            a,
            o,
            s,
            l,
            u,
            c,
            p,
            h,
            d,
            g,
            f,
            m,
            y,
            v,
            b,
            z,
            w,
            S = this;return __generator$1(this, function (I) {
          switch (I.label) {case 0:
              if (r = null == n.batchSize ? 32 : n.batchSize, i = this.standardizeUserData(e, t, !1, r), a = i[0], o = i[1], s = !1, p = !1, null != n.validationData && n.validationData.length > 0) {
                if (s = !0, 2 !== n.validationData.length) throw 3 === n.validationData.length ? new NotImplementedError("validationData including sample weights is not supported yet.") : new ValueError("When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; " + n.validationData + " is invalid.");l = n.validationData[0], u = n.validationData[1], h = this.standardizeUserData(l, u, !0, r), l = h[0], u = h[1], c = l.concat(u);
              } else null != n.validationSplit && n.validationSplit > 0 && n.validationSplit < 1 ? (s = !0, d = Math.floor(a[0].shape[0] * (1 - n.validationSplit)), g = a[0].shape[0], l = sliceArrays(a, d, g), a = sliceArrays(a, 0, d), u = sliceArrays(o, d, g), o = sliceArrays(o, 0, d), p = !0, c = l.concat(u)) : null != n.validationSteps && (s = !0);return f = a.concat(o), this.checkTrainableWeightsConsistency(), m = function (e) {
                var t = e.slice(0, S.inputs.length),
                    n = e.slice(S.inputs.length, S.inputs.length + S.outputs.length),
                    r = [],
                    i = S.collectedTrainableWeights.map(function (e) {
                  return e.read();
                });return [S.optimizer.minimize(function () {
                  for (var e = [], i = 0; i < S.inputs.length; ++i) e.push({ key: S.inputs[i], value: t[i] });var a,
                      o = new FeedDict(e),
                      s = execute(S.outputs, o, { training: !0 });for (i = 0; i < S.lossFunctions.length; ++i) {
                    var l = (0, S.lossFunctions[i])(n[i], s[i]);mean(l), a = 0 === i ? l : add(a, l);
                  }for (i = 0; i < S.metricsTensors.length; ++i) {
                    var u = S.metricsTensors[i][0],
                        c = S.metricsTensors[i][1],
                        p = mean(u(n[c], s[c]));keep(p), r.push(p);
                  }return a = mean(a), S.calculateLosses().forEach(function (e) {
                    a = add(a, e);
                  }), a;
                }, !0, i)].concat(r);
              }, y = this.getDedupedMetricsNames(), s ? (this.makeTestFunction(), v = this.testFunction, b = y.slice().concat(y.map(function (e) {
                return "val_" + e;
              }))) : (v = null, c = [], b = y.slice()), z = standardizeCallbacks(n.callbacks), [4, this.fitLoop(m, f, y, r, n.epochs, n.verbose, z, v, c, n.shuffle, b, null, null, null)];case 1:
              return w = I.sent(), p && (c.forEach(function (e) {
                return e.dispose();
              }), a.forEach(function (e) {
                return e.dispose();
              }), o.forEach(function (e) {
                return e.dispose();
              })), [2, w];}
        });
      });
    }, t.prototype.getNamedWeights = function (e) {
      for (var t = {}, n = null != e && e.trainableOnly, r = n ? this.trainableWeights : this.weights, i = this.getWeights(n), a = 0; a < r.length; ++a) n && !r[a].trainable || (t[r[a].originalName] = i[a]);return t;
    }, t.prototype.save = function (e, t) {
      return __awaiter$1(this, void 0, void 0, function () {
        var n, r, i, a, o;return __generator$1(this, function (s) {
          switch (s.label) {case 0:
              if ("string" == typeof e) {
                if (0 === (n = io.getSaveHandlers(e)).length) throw new ValueError("Cannot find any save handlers for URL '" + e + "'");if (n.length > 1) throw new ValueError("Found more than one (" + n.length + ") save handlers for URL '" + e + "'");e = n[0];
              }if (null == e.save) throw new ValueError("Model.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return [4, io.encodeWeights(this.getNamedWeights(t))];case 1:
              return r = s.sent(), i = !1, a = null, o = this.toJSON(a, i), [2, e.save({ modelTopology: o, weightData: r.data, weightSpecs: r.specs })];}
        });
      });
    }, t.className = "Model", __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t.prototype, "summary", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [0] })], t.prototype, "compile", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [2] })], t.prototype, "evaluate", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [1] })], t.prototype, "predict", null), __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t.prototype, "predictOnBatch", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [2] })], t.prototype, "fit", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [1] })], t.prototype, "save", null), t = __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t);
  }(Container);serialization.SerializationMap.register(Model);var VALID_FAN_MODE_VALUES = ["fanIn", "fanOut", "fanAvg"];function checkFanMode(e) {
    checkStringTypeUnionValue(VALID_FAN_MODE_VALUES, "FanMode", e);
  }var VALID_DISTRIBUTION_VALUES = ["normal", "uniform"];function checkDistribution(e) {
    checkStringTypeUnionValue(VALID_DISTRIBUTION_VALUES, "Distribution", e);
  }var Initializer = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.fromConfigUsesCustomObjects = function () {
      return !1;
    }, t.prototype.getConfig = function () {
      return {};
    }, t = __decorate$1([doc({ heading: "Initializers", subheading: "Classes", namespace: "initializers" })], t);
  }(serialization.Serializable),
      Zeros = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      return zeros(e, t);
    }, t.className = "Zeros", t;
  }(Initializer);serialization.SerializationMap.register(Zeros);var Ones = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      return ones$1(e, t);
    }, t.className = "Ones", t;
  }(Initializer);serialization.SerializationMap.register(Ones);var Constant = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.value = t.value, n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      var n = this;return tidy(function () {
        return mul(scalar(n.value), ones$1(e, t));
      });
    }, t.prototype.getConfig = function () {
      return { value: this.value };
    }, t.className = "Constant", t;
  }(Initializer);serialization.SerializationMap.register(Constant);var RandomUniform = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.DEFAULT_MINVAL = -.05, n.DEFAULT_MAXVAL = .05, n.minval = t.minval || n.DEFAULT_MINVAL, n.maxval = t.maxval || n.DEFAULT_MAXVAL, n.seed = t.seed, n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      return randomUniform(e, this.minval, this.maxval, t);
    }, t.prototype.getConfig = function () {
      return { minval: this.minval, maxval: this.maxval, seed: this.seed };
    }, t.className = "RandomUniform", t;
  }(Initializer);serialization.SerializationMap.register(RandomUniform);var RandomNormal = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.DEFAULT_MEAN = 0, n.DEFAULT_STDDEV = .05, n.mean = t.mean || n.DEFAULT_MEAN, n.stddev = t.stddev || n.DEFAULT_STDDEV, n.seed = t.seed, n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      if ("bool" === t) throw new NotImplementedError("randomNormal does not support dType bool.");return randomNormal$1(e, this.mean, this.stddev, t, this.seed);
    }, t.prototype.getConfig = function () {
      return { mean: this.mean, stddev: this.stddev, seed: this.seed };
    }, t.className = "RandomNormal", t;
  }(Initializer);serialization.SerializationMap.register(RandomNormal);var TruncatedNormal = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.DEFAULT_MEAN = 0, n.DEFAULT_STDDEV = .05, n.mean = t.mean || n.DEFAULT_MEAN, n.stddev = t.stddev || n.DEFAULT_STDDEV, n.seed = t.seed, n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      if ("bool" === t) throw new NotImplementedError("truncatedNormal does not support dType bool.");return truncatedNormal(e, this.mean, this.stddev, t, this.seed);
    }, t.prototype.getConfig = function () {
      return { mean: this.mean, stddev: this.stddev, seed: this.seed };
    }, t.className = "TruncatedNormal", t;
  }(Initializer);serialization.SerializationMap.register(TruncatedNormal);var Identity = function (e) {
    function t(t) {
      var n = e.call(this) || this;return n.gain = null != t.gain ? scalar(t.gain) : getScalar(1), n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      var n = this;return tidy(function () {
        if (2 !== e.length || e[0] !== e[1]) throw new ValueError("Identity matrix initializer can only be used for 2D square matrices.");return mul(n.gain, eye(e[0]));
      });
    }, t.prototype.getConfig = function () {
      return { gain: this.gain.get() };
    }, t.className = "Identity", t;
  }(Initializer);function computeFans(e, t) {
    var n, r;if (void 0 === t && (t = "channelsLast"), checkDataFormat(t), 2 === e.length) n = e[0], r = e[1];else if (-1 !== [3, 4, 5].indexOf(e.length)) {
      if ("channelsFirst" === t) {
        var i = arrayProd(e, 2);n = e[1] * i, r = e[0] * i;
      } else if ("channelsLast" === t) {
        i = arrayProd(e, 0, e.length - 2);n = e[e.length - 2] * i, r = e[e.length - 1] * i;
      }
    } else {
      var a = arrayProd(e);n = Math.sqrt(a), r = Math.sqrt(a);
    }return [n, r];
  }serialization.SerializationMap.register(Identity);var VarianceScaling = function (e) {
    function t(t) {
      var n = e.call(this) || this;if (t.scale < 0) throw new ValueError("scale must be a positive float. Got: " + t.scale);return n.scale = null == t.scale ? 1 : t.scale, n.mode = t.mode, checkFanMode(n.mode), n.distribution = t.distribution, checkDistribution(n.distribution), n.seed = t.seed, n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      var n = computeFans(e),
          r = n[0],
          i = n[1],
          a = this.scale;if ("fanIn" === this.mode ? a /= Math.max(1, r) : "fanOut" === this.mode ? a /= Math.max(1, i) : a /= Math.max(1, (r + i) / 2), "normal" === this.distribution) {
        var o = Math.sqrt(a);if ("bool" === t) throw new NotImplementedError(this.getClassName() + " does not support dType bool.");return truncatedNormal(e, 0, o, t, this.seed);
      }var s = Math.sqrt(3 * a);return randomUniform(e, -s, s, t);
    }, t.prototype.getConfig = function () {
      return { scale: this.scale, mode: this.mode, distribution: this.distribution, seed: this.seed };
    }, t.className = "VarianceScaling", t;
  }(Initializer);serialization.SerializationMap.register(VarianceScaling);var GlorotUniform = function (e) {
    function t(t) {
      return e.call(this, { scale: 1, mode: "fanAvg", distribution: "uniform", seed: null == t ? null : t.seed }) || this;
    }return __extends$1(t, e), t.prototype.getClassName = function () {
      return VarianceScaling.className;
    }, t;
  }(VarianceScaling),
      GlorotNormal = function (e) {
    function t(t) {
      return e.call(this, { scale: 1, mode: "fanAvg", distribution: "normal", seed: null == t ? null : t.seed }) || this;
    }return __extends$1(t, e), t.prototype.getClassName = function () {
      return VarianceScaling.className;
    }, t;
  }(VarianceScaling),
      HeNormal = function (e) {
    function t(t) {
      return e.call(this, { scale: 2, mode: "fanIn", distribution: "normal", seed: null == t ? null : t.seed }) || this;
    }return __extends$1(t, e), t.prototype.getClassName = function () {
      return VarianceScaling.className;
    }, t;
  }(VarianceScaling),
      LeCunNormal = function (e) {
    function t(t) {
      return e.call(this, { scale: 1, mode: "fanIn", distribution: "normal", seed: null == t ? null : t.seed }) || this;
    }return __extends$1(t, e), t.prototype.getClassName = function () {
      return VarianceScaling.className;
    }, t;
  }(VarianceScaling),
      Orthogonal = function (e) {
    function t(t) {
      var n = e.call(this) || this;if (n.DEFAULT_GAIN = 1, n.gain = null == t.gain ? n.DEFAULT_GAIN : t.gain, n.seed = t.seed, null != n.seed) throw new NotImplementedError("Random seed is not implemented for Orthogonal Initializer yet.");return n;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      var n = this;return tidy(function () {
        if (2 !== e.length) throw new NotImplementedError("The Orthogonal Initializer does not support non-2D shapes yet.");e[0] * e[1] > 2e3 && console.warn("Orthogonal initializer is being called on a matrix with more than 2000 (" + e[0] * e[1] + ") elements: Slowness may result.");var t = randomNormal$1(e[0] > e[1] ? [e[1], e[0]] : e, 0, 1, "float32"),
            r = linalg_ops.gramSchmidt(t);return e[0] > e[1] && (r = r.transpose()), mul(getScalar(n.gain), r);
      });
    }, t.prototype.getConfig = function () {
      return { gain: this.gain, seed: this.seed };
    }, t.className = "Orthogonal", t;
  }(Initializer);serialization.SerializationMap.register(Orthogonal);var INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = { constant: "Constant", glorotNormal: "GlorotNormal", glorotUniform: "GlorotUniform", heNormal: "HeNormal", identity: "Identity", leCunNormal: "LeCunNormal", ones: "Ones", orthogonal: "Orthogonal", randomNormal: "RandomNormal", randomUniform: "RandomUniform", truncatedNormal: "TruncatedNormal", varianceScaling: "VarianceScaling", zeros: "Zeros" };function deserializeInitializer(e, t) {
    return void 0 === t && (t = {}), deserializeKerasObject(e, serialization.SerializationMap.getMap().classNameMap, t, "initializer");
  }function serializeInitializer(e) {
    return serializeKerasObject(e);
  }function getInitializer(e) {
    if ("string" == typeof e) {
      var t = e in INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ? INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[e] : e;return "GlorotUniform" === t ? new GlorotUniform() : "GlorotNormal" === t ? new GlorotNormal() : "HeNormal" === t ? new HeNormal() : "LeCunNormal" === t ? new LeCunNormal() : deserializeInitializer({ className: t, config: {} });
    }return e instanceof Initializer ? e : deserializeInitializer(e);
  }var Activation = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.getConfig = function () {
      return {};
    }, t;
  }(serialization.Serializable),
      Elu = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      return void 0 === t && (t = 1), elu$1(e, t);
    }, t.className = "elu", t;
  }(Activation);serialization.SerializationMap.register(Elu);var Selu = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return selu(e);
    }, t.className = "selu", t;
  }(Activation);serialization.SerializationMap.register(Selu);var Relu = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return relu(e);
    }, t.className = "relu", t;
  }(Activation);serialization.SerializationMap.register(Relu);var Relu6 = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return tidy(function () {
        return minimum(getScalar(6), relu(e));
      });
    }, t.className = "relu6", t;
  }(Activation);serialization.SerializationMap.register(Relu6);var Linear = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return e;
    }, t.className = "linear", t;
  }(Activation);serialization.SerializationMap.register(Linear);var Sigmoid = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return sigmoid(e);
    }, t.className = "sigmoid", t;
  }(Activation);serialization.SerializationMap.register(Sigmoid);var HardSigmoid = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return hardSigmoid(e);
    }, t.className = "hardSigmoid", t;
  }(Activation);serialization.SerializationMap.register(HardSigmoid);var Softplus = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return softplus(e);
    }, t.className = "softplus", t;
  }(Activation);serialization.SerializationMap.register(Softplus);var Softsign = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return softsign(e);
    }, t.className = "softsign", t;
  }(Activation);serialization.SerializationMap.register(Softsign);var Tanh = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      return tanh$1(e);
    }, t.className = "tanh", t;
  }(Activation);serialization.SerializationMap.register(Tanh);var Softmax = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.apply = function (e, t) {
      return void 0 === t && (t = -1), softmax(e, t);
    }, t.className = "softmax", t;
  }(Activation);function serializeActivation(e) {
    return e.getClassName();
  }function deserializeActivation(e, t) {
    return void 0 === t && (t = {}), deserializeKerasObject(e, serialization.SerializationMap.getMap().classNameMap, t, "activation");
  }function getActivation(e) {
    return null == e ? deserializeActivation({ className: "linear", config: {} }) : "string" == typeof e ? deserializeActivation({ className: e, config: {} }) : e instanceof Activation ? e : deserializeActivation(e);
  }serialization.SerializationMap.register(Softmax);var LeakyReLU = function (e) {
    function t(t) {
      var n = e.call(this, null == t ? {} : t) || this;return n.DEFAULT_ALPHA = .3, null == t && (t = {}), n.alpha = null == t.alpha ? n.DEFAULT_ALPHA : t.alpha, n;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = getExactlyOneTensor(e);return leakyRelu(n, this.alpha);
    }, t.prototype.computeOutputShape = function (e) {
      return e;
    }, t.prototype.getConfig = function () {
      var t = { alpha: this.alpha },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "LeakyReLU", t;
  }(Layer);serialization.SerializationMap.register(LeakyReLU);var ELU$1 = function (e) {
    function t(t) {
      var n = e.call(this, null == t ? {} : t) || this;if (n.DEFAULT_ALPHA = 1, null == t && (t = {}), null != t.alpha && t.alpha !== n.DEFAULT_ALPHA) throw new NotImplementedError("Non-default alpha value (" + t.alpha + ") is not supported by the ELU layer yet.");return n.alpha = null == t.alpha ? n.DEFAULT_ALPHA : t.alpha, n;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = getExactlyOneTensor(e);return elu(n);
    }, t.prototype.computeOutputShape = function (e) {
      return e;
    }, t.prototype.getConfig = function () {
      var t = { alpha: this.alpha },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "ELU", t;
  }(Layer);serialization.SerializationMap.register(ELU$1);var ThresholdedReLU = function (e) {
    function t(t) {
      var n = e.call(this, null == t ? {} : t) || this;return n.DEFAULT_THETA = 1, null == t && (t = {}), n.theta = null == t.theta ? n.DEFAULT_THETA : t.theta, n.thetaTensor = getScalar(n.theta), n;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = getExactlyOneTensor(e);return n.mul(cast$1(n.greater(this.thetaTensor), "float32"));
    }, t.prototype.computeOutputShape = function (e) {
      return e;
    }, t.prototype.getConfig = function () {
      var t = { theta: this.theta },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "ThresholdedReLU", t;
  }(Layer);serialization.SerializationMap.register(ThresholdedReLU);var Softmax$1 = function (e) {
    function t(t) {
      var n = e.call(this, null == t ? {} : t) || this;return n.DEFAULT_AXIS = 1, null == t && (t = {}), n.softmax = new Softmax().apply, n.axis = null == t.axis ? n.DEFAULT_AXIS : t.axis, n;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = getExactlyOneTensor(e);return this.softmax(n, this.axis);
    }, t.prototype.computeOutputShape = function (e) {
      return e;
    }, t.prototype.getConfig = function () {
      var t = { axis: this.axis },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Softmax", t;
  }(Layer);serialization.SerializationMap.register(Softmax$1);var Regularizer = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t;
  }(serialization.Serializable),
      L1L2 = function (e) {
    function t(t) {
      var n = e.call(this) || this,
          r = null == t || null == t.l1 ? .01 : t.l1,
          i = null == t || null == t.l2 ? .01 : t.l2;return n.hasL1 = 0 !== r, n.hasL2 = 0 !== i, n.l1 = getScalar(r), n.l2 = getScalar(i), n;
    }return __extends$1(t, e), t.prototype.apply = function (e) {
      var t = this;return tidy(function () {
        var n = zeros([1]);return t.hasL1 && (n = add(n, sum(mul(t.l1, abs(e))))), t.hasL2 && (n = add(n, sum(mul(t.l2, square$1(e))))), n.asScalar();
      });
    }, t.prototype.getConfig = function () {
      return { l1: this.l1.dataSync()[0], l2: this.l2.dataSync()[0] };
    }, t.fromConfig = function (e, t) {
      return new e({ l1: t.l1, l2: t.l2 });
    }, t.className = "L1L2", t = __decorate$1([doc({ heading: "Regularizers", namespace: "regularizers" })], t);
  }(Regularizer);function l1(e) {
    return new L1L2({ l1: null != e ? e.l1 : null, l2: 0 });
  }function l2(e) {
    return new L1L2({ l2: null != e ? e.l2 : null, l1: 0 });
  }serialization.SerializationMap.register(L1L2);var REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = { l1l2: "L1L2" };function serializeRegularizer(e) {
    return serializeKerasObject(e);
  }function deserializeRegularizer(e, t) {
    return void 0 === t && (t = {}), deserializeKerasObject(e, serialization.SerializationMap.getMap().classNameMap, t, "regularizer");
  }function getRegularizer(e) {
    return null == e ? null : "string" == typeof e ? deserializeRegularizer({ className: e in REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ? REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[e] : e, config: {} }) : e instanceof Regularizer ? e : deserializeRegularizer(e);
  }function normalizeArray(e, t, n) {
    if ("number" == typeof e) return pyListRepeat(e, t);if (e.length !== t) throw new ValueError("The " + n + " argument must be a tuple of " + t + " integers. Received: " + e.length + " elements.");for (var r = 0; r < t; ++r) {
      var i = e[r];if (!isInteger(i)) throw new ValueError("The " + n + " argument must be a tuple of " + t + " integers. Received: " + JSON.stringify(e) + " including a non-integer number " + i);
    }return e;
  }function convOutputLength(e, t, n, r, i) {
    return void 0 === i && (i = 1), null == e ? e : (a = "same" === n ? e : e - (t + (t - 1) * (i - 1)) + 1, Math.floor((a + r - 1) / r));var a;
  }function deconvLength(e, t, n, r) {
    if (null == e) return null;if ("valid" === r) e = e * t + max$1([n - t, 0]);else {
      if ("same" !== r) throw new ValueError("Unsupport padding mode: " + r + ".");e *= t;
    }return e;
  }function preprocessConv2DInput(e, t) {
    return tidy(function () {
      return checkDataFormat(t), "channelsFirst" === t ? transpose(e, [0, 2, 3, 1]) : e;
    });
  }function conv1dWithBias(e, t, n, r, i, a, o) {
    return void 0 === r && (r = 1), void 0 === i && (i = "valid"), void 0 === o && (o = 1), tidy(function () {
      if (null == a && (a = imageDataFormat()), checkDataFormat(a), 3 !== e.shape.length) throw new ValueError("The input of a conv1dWithBias operation should be 3, but is " + e.shape.length + " instead.");if (3 !== t.shape.length) throw new ValueError("The kernel for a conv1dWithBias operation should be 3, but is " + t.shape.length + " instead");if (null != n && 1 !== n.shape.length) throw new ValueError("The bias for a conv1dWithBias operation should be 1, but is " + t.shape.length + " instead");if ("channelsFirst" === a && (e = transpose(e, [0, 2, 1])), "causal" === i) throw new NotImplementedError("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");var s = conv1d(e, t, r, "same" === i ? "same" : "valid", "NWC", o);return null != n && (s = biasAdd(s, n)), s;
    });
  }function conv2dWithBias(e, t, n, r, i, a, o) {
    return void 0 === r && (r = [1, 1]), void 0 === i && (i = "valid"), tidy(function () {
      if (null == a && (a = imageDataFormat()), checkDataFormat(a), 3 !== e.rank && 4 !== e.rank) throw new ValueError("conv2dWithBias expects input to be of rank 3 or 4, but received " + e.rank + ".");if (3 !== t.rank && 4 !== t.rank) throw new ValueError("conv2dWithBias expects kernel to be of rank 3 or 4, but received " + e.rank + ".");var s = preprocessConv2DInput(e, a);if ("causal" === i) throw new NotImplementedError("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");return s = conv2d(s, t, r, "same" === i ? "same" : "valid", "NHWC", o), null != n && (s = biasAdd(s, n)), "channelsFirst" === a && (s = transpose(s, [0, 3, 1, 2])), s;
    });
  }var BaseConv = function (e) {
    function t(n, r) {
      var i = e.call(this, r) || this;if (i.bias = null, i.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", i.DEFAULT_BIAS_INITIALIZER = "zeros", t.verifyConfig(r), i.rank = n, 1 !== i.rank && 2 !== i.rank) throw new NotImplementedError("Convolution layer for rank other than 1 or 2 (" + i.rank + ") is not implemented yet.");if (i.kernelSize = normalizeArray(r.kernelSize, n, "kernelSize"), i.strides = normalizeArray(null == r.strides ? 1 : r.strides, n, "strides"), i.padding = null == r.padding ? "valid" : r.padding, checkPaddingMode(i.padding), i.dataFormat = null == r.dataFormat ? "channelsLast" : r.dataFormat, checkDataFormat(i.dataFormat), i.activation = getActivation(r.activation), i.useBias = null == r.useBias || r.useBias, i.biasInitializer = getInitializer(r.biasInitializer || i.DEFAULT_BIAS_INITIALIZER), i.biasConstraint = getConstraint(r.biasConstraint), i.biasRegularizer = getRegularizer(r.biasRegularizer), i.activityRegularizer = getRegularizer(r.activityRegularizer), i.dilationRate = normalizeArray(null == r.dilationRate ? 1 : r.dilationRate, n, "dilationRate"), 1 === i.rank && Array.isArray(i.dilationRate) && 1 !== i.dilationRate.length) throw new ValueError("dilationRate must be a number or an array of a single number for 1D convolution, but received " + JSON.stringify(i.dilationRate));if (2 === i.rank) if ("number" == typeof i.dilationRate) i.dilationRate = [i.dilationRate, i.dilationRate];else if (2 !== i.dilationRate.length) throw new ValueError("dilationRate must be a number or array of two numbers for 2D convolution, but received " + JSON.stringify(i.dilationRate));return i;
    }return __extends$1(t, e), t.verifyConfig = function (e) {
      if (assert$1("kernelSize" in e, "required key 'kernelSize' not in config"), "number" != typeof e.kernelSize && !checkArrayTypeAndLength(e.kernelSize, "number", 1, 2)) throw new ValueError("BaseConv expects config.kernelSize to be number or number[] with length 1 or 2, but received " + JSON.stringify(e.kernelSize) + ".");
    }, t;
  }(Layer),
      Conv = function (e) {
    function t(n, r) {
      var i = e.call(this, n, r) || this;return i.kernel = null, t.verifyConfig(r), i.filters = r.filters, i.kernelInitializer = getInitializer(r.kernelInitializer || i.DEFAULT_KERNEL_INITIALIZER), i.kernelConstraint = getConstraint(r.kernelConstraint), i.kernelRegularizer = getRegularizer(r.kernelRegularizer), i;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      e = getExactlyOneShape(e);var t = "channelsFirst" === this.dataFormat ? 1 : e.length - 1;if (null == e[t]) throw new ValueError("The channel dimension of the input should be defined. Found " + e[t]);var n,
          r = e[t],
          i = this.kernelSize.concat([r, this.filters]);this.kernel = this.addWeight("kernel", i, null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.useBias && (this.bias = this.addWeight("bias", [this.filters], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint)), this.inputSpec = [{ ndim: this.rank + 2, axes: (n = {}, n[t] = r, n) }], this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t;e = getExactlyOneTensor(e);var r = null == n.bias ? null : n.bias.read();if (1 === n.rank) t = conv1dWithBias(e, n.kernel.read(), r, n.strides[0], n.padding, n.dataFormat, n.dilationRate[0]);else if (2 === n.rank) t = conv2dWithBias(e, n.kernel.read(), r, n.strides, n.padding, n.dataFormat, n.dilationRate);else if (3 === n.rank) throw new NotImplementedError("3D convolution is not implemented yet.");return null != n.activation && (t = n.activation.apply(t)), t;
      });
    }, t.prototype.computeOutputShape = function (e) {
      e = getExactlyOneShape(e);for (var t = [], n = "channelsLast" === this.dataFormat ? e.slice(1, e.length - 1) : e.slice(2), r = 0; r < n.length; ++r) {
        var i = convOutputLength(n[r], this.kernelSize[r], this.padding, this.strides[r], "number" == typeof this.dilationRate ? this.dilationRate : this.dilationRate[r]);t.push(i);
      }var a = [e[0]];return "channelsLast" === this.dataFormat ? (a = a.concat(t)).push(this.filters) : (a.push(this.filters), a = a.concat(t)), a;
    }, t.prototype.getConfig = function () {
      var t = { rank: this.rank, filters: this.filters, kernelSize: this.kernelSize, strides: this.strides, padding: this.padding, dataFormat: this.dataFormat, dilationRate: this.dilationRate, activation: serializeActivation(this.activation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), biasInitializer: serializeInitializer(this.biasInitializer), kernelRegularizer: serializeRegularizer(this.kernelRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), biasConstraint: serializeConstraint(this.biasConstraint) },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.verifyConfig = function (e) {
      if (!("filters" in e) || "number" != typeof e.filters || e.filters < 1) throw new ValueError("Convolution layer expected config.filters to be a 'number' > 0 but got " + JSON.stringify(e.filters));
    }, t;
  }(BaseConv),
      Conv2D = function (e) {
    function t(n) {
      var r = e.call(this, 2, n) || this;return t.verifyConfig(n), r;
    }return __extends$1(t, e), t.prototype.getConfig = function () {
      var t = e.prototype.getConfig.call(this);return delete t.rank, t;
    }, t.verifyConfig = function (e) {
      if ("number" != typeof e.kernelSize && !checkArrayTypeAndLength(e.kernelSize, "number", 1, 2)) throw new ValueError("Conv2D expects config.kernelSize to be number or number[] with length 1 or 2, but received " + JSON.stringify(e.kernelSize) + ".");
    }, t.className = "Conv2D", t;
  }(Conv);serialization.SerializationMap.register(Conv2D);var Conv2DTranspose = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;if (n.inputSpec = [new InputSpec({ ndim: 4 })], "same" !== n.padding && "valid" !== n.padding) throw new ValueError("Conv2DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode " + n.padding);return n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      if (4 !== (e = getExactlyOneShape(e)).length) throw new ValueError("Input should have rank 4; Received input shape: " + JSON.stringify(e));var t = "channelsFirst" === this.dataFormat ? 1 : e.length - 1;if (null == e[t]) throw new ValueError("The channel dimension of the inputs should be defined. Found `None`.");var n,
          r = e[t],
          i = this.kernelSize.concat([this.filters, r]);this.kernel = this.addWeight("kernel", i, "float32", this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.useBias && (this.bias = this.addWeight("bias", [this.filters], "float32", this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint)), this.inputSpec = [new InputSpec({ ndim: 4, axes: (n = {}, n[t] = r, n) })], this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t = getExactlyOneTensor(e);if (4 !== t.shape.length) throw new ValueError("Conv2DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-" + t.shape.length);var r,
            i,
            a = t.shape,
            o = a[0];"channelsFirst" === n.dataFormat ? (r = 2, i = 3) : (r = 1, i = 2);var s = a[r],
            l = a[i],
            u = n.kernelSize[0],
            c = n.kernelSize[1],
            p = n.strides[0],
            h = n.strides[1],
            d = [o, deconvLength(s, p, u, n.padding), deconvLength(l, h, c, n.padding), n.filters];"channelsLast" !== n.dataFormat && (t = transpose(t, [0, 2, 3, 1]));var g = conv2dTranspose(t, n.kernel.read(), d, n.strides, n.padding);return "channelsLast" !== n.dataFormat && (g = transpose(g, [0, 3, 1, 2])), null != n.bias && (g = biasAdd(g, n.bias.read(), n.dataFormat)), null != n.activation && (g = n.activation.apply(g)), g;
      });
    }, t.prototype.computeOutputShape = function (e) {
      var t,
          n,
          r,
          i = (e = getExactlyOneShape(e)).slice();"channelsFirst" === this.dataFormat ? (t = 1, n = 2, r = 3) : (t = 3, n = 1, r = 2);var a = this.kernelSize[0],
          o = this.kernelSize[1],
          s = this.strides[0],
          l = this.strides[1];return i[t] = this.filters, i[n] = deconvLength(i[n], s, a, this.padding), i[r] = deconvLength(i[r], l, o, this.padding), i;
    }, t.prototype.getConfig = function () {
      var t = e.prototype.getConfig.call(this);return delete t.dilationRate, t;
    }, t.className = "Conv2DTranspose", t;
  }(Conv2D);serialization.SerializationMap.register(Conv2DTranspose);var SeparableConv = function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;if (r.DEFAULT_DEPTHWISE_INITIALIZER = "glorotUniform", r.DEFAULT_POINTWISE_INITIALIZER = "glorotUniform", r.depthwiseKernel = null, r.pointwiseKernel = null, null == n.filters) throw new ValueError("The `filters` configuration field is required by SeparableConv, but is unspecified.");if (null != n.kernelInitializer || null != n.kernelRegularizer || null != n.kernelConstraint) throw new ValueError("Fields kernelInitializer, kernelRegularizer and kernelConstraint are invalid for SeparableConv2D. Use depthwiseInitializer, depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, pointwiseRegularizer and pointwiseConstraint instead.");if (null != n.padding && "same" !== n.padding && "valid" !== n.padding) throw new ValueError("SeparableConv" + r.rank + "D supports only padding modes: 'same' and 'valid', but received " + JSON.stringify(n.padding));return r.depthMultiplier = null == n.depthMultiplier ? 1 : n.depthMultiplier, r.depthwiseInitializer = getInitializer(n.depthwiseInitializer || r.DEFAULT_DEPTHWISE_INITIALIZER), r.depthwiseRegularizer = getRegularizer(n.depthwiseRegularizer), r.depthwiseConstraint = getConstraint(n.depthwiseConstraint), r.pointwiseInitializer = getInitializer(n.depthwiseInitializer || r.DEFAULT_POINTWISE_INITIALIZER), r.pointwiseRegularizer = getRegularizer(n.pointwiseRegularizer), r.pointwiseConstraint = getConstraint(n.pointwiseConstraint), r;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      if ((e = getExactlyOneShape(e)).length < this.rank + 2) throw new ValueError("Inputs to SeparableConv" + this.rank + "D should have rank " + (this.rank + 2) + ", but received input shape: " + JSON.stringify(e));var t = "channelsFirst" === this.dataFormat ? 1 : e.length - 1;if (null == e[t] || e[t] < 0) throw new ValueError("The channel dimension of the inputs should be defined, but found " + JSON.stringify(e[t]));for (var n = e[t], r = this.kernelSize.concat([n, this.depthMultiplier]), i = [], a = 0; a < this.rank; ++a) i.push(1);i.push(n * this.depthMultiplier, this.filters);var o;this.depthwiseKernel = this.addWeight("depthwise_kernel", r, "float32", this.depthwiseInitializer, this.depthwiseRegularizer, !0, this.depthwiseConstraint), this.pointwiseKernel = this.addWeight("pointwise_kernel", i, "float32", this.pointwiseInitializer, this.pointwiseRegularizer, !0, this.pointwiseConstraint), this.useBias ? this.bias = this.addWeight("bias", [this.filters], "float32", this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.inputSpec = [new InputSpec({ ndim: this.rank + 2, axes: (o = {}, o[t] = n, o) })], this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t;if (e = getExactlyOneTensor(e), 1 === n.rank) throw new NotImplementedError("1D separable convolution is not implemented yet.");return 2 === n.rank && ("channelsFirst" === n.dataFormat && (e = transpose(e, [0, 2, 3, 1])), t = separableConv2d(e, n.depthwiseKernel.read(), n.pointwiseKernel.read(), n.strides, n.padding, n.dilationRate, "NHWC")), n.useBias && (t = biasAdd(t, n.bias.read(), n.dataFormat)), null != n.activation && (t = n.activation.apply(t)), "channelsFirst" === n.dataFormat && (t = transpose(t, [0, 3, 1, 2])), t;
      });
    }, t.prototype.getConfig = function () {
      var t = e.prototype.getConfig.call(this);return delete t.rank, delete t.kernelInitializer, delete t.kernelRegularizer, delete t.kernelConstraint, t.depthwiseInitializer = serializeInitializer(this.depthwiseInitializer), t.pointwiseInitializer = serializeInitializer(this.pointwiseInitializer), t.depthwiseRegularizer = serializeRegularizer(this.depthwiseRegularizer), t.pointwiseRegularizer = serializeRegularizer(this.pointwiseRegularizer), t.depthwiseConstraint = serializeConstraint(this.depthwiseConstraint), t.pointwiseConstraint = serializeConstraint(this.pointwiseConstraint), t;
    }, t.className = "SeparableConv", t;
  }(Conv),
      SeparableConv2D = function (e) {
    function t(t) {
      return e.call(this, 2, t) || this;
    }return __extends$1(t, e), t.className = "SeparableConv2D", t;
  }(SeparableConv);serialization.SerializationMap.register(SeparableConv2D);var Conv1D = function (e) {
    function t(n) {
      var r = e.call(this, 1, n) || this;return t.verifyConfig(n), r.inputSpec = [{ ndim: 3 }], r;
    }return __extends$1(t, e), t.prototype.getConfig = function () {
      var t = e.prototype.getConfig.call(this);return delete t.rank, delete t.dataFormat, t;
    }, t.verifyConfig = function (e) {
      if ("number" != typeof e.kernelSize && !checkArrayTypeAndLength(e.kernelSize, "number", 1, 1)) throw new ValueError("Conv1D expects config.kernelSize to be number or number[] with length 1, but received " + JSON.stringify(e.kernelSize) + ".");
    }, t.className = "Conv1D", t;
  }(Conv);serialization.SerializationMap.register(Conv1D);var Cropping2D = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return "number" == typeof t.cropping ? n.cropping = [[t.cropping, t.cropping], [t.cropping, t.cropping]] : "number" == typeof t.cropping[0] ? n.cropping = [[t.cropping[0], t.cropping[0]], [t.cropping[1], t.cropping[1]]] : n.cropping = t.cropping, n.dataFormat = void 0 === t.dataFormat ? "channelsLast" : t.dataFormat, n.inputSpec = [{ ndim: 4 }], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      return "channelsFirst" === this.dataFormat ? [e[0], e[1], e[2] - this.cropping[0][0] - this.cropping[0][1], e[2] - this.cropping[1][0] - this.cropping[1][1]] : [e[0], e[1] - this.cropping[0][0] - this.cropping[0][1], e[2] - this.cropping[1][0] - this.cropping[1][1], e[3]];
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        return e = getExactlyOneTensor(e), "channelsLast" === n.dataFormat ? sliceAlongAxis(sliceAlongAxis(e, n.cropping[0][0], e.shape[1] - n.cropping[0][0] - n.cropping[0][1], 2), n.cropping[1][0], e.shape[2] - n.cropping[1][1] - n.cropping[1][0], 3) : sliceAlongAxis(sliceAlongAxis(e, n.cropping[0][0], e.shape[2] - n.cropping[0][0] - n.cropping[0][1], 3), n.cropping[1][0], e.shape[3] - n.cropping[1][1] - n.cropping[1][0], 4);
      });
    }, t.prototype.getConfig = function () {
      var t = { cropping: this.cropping, dataFormat: this.dataFormat },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Cropping2D", t;
  }(Layer);serialization.SerializationMap.register(Cropping2D);var UpSampling2D = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.DEFAULT_SIZE = [2, 2], n.inputSpec = [{ ndim: 4 }], n.size = void 0 === t.size ? n.DEFAULT_SIZE : t.size, n.dataFormat = void 0 === t.dataFormat ? "channelsLast" : t.dataFormat, n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      if ("channelsFirst" === this.dataFormat) {
        var t = this.size[0] * e[2],
            n = this.size[1] * e[3];return [e[0], e[1], t, n];
      }t = this.size[0] * e[1], n = this.size[1] * e[2];return [e[0], t, n, e[3]];
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t = getExactlyOneTensor(e),
            r = t.shape;if ("channelsFirst" === n.dataFormat) {
          t = transpose(t, [0, 2, 3, 1]);var i = n.size[0] * r[2],
              a = n.size[1] * r[3],
              o = t.resizeNearestNeighbor([i, a]);return transpose(o, [0, 3, 1, 2]);
        }i = n.size[0] * r[1], a = n.size[1] * r[2];return t.resizeNearestNeighbor([i, a]);
      });
    }, t.prototype.getConfig = function () {
      var t = { size: this.size, dataFormat: this.dataFormat },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "UpSampling2D", t;
  }(Layer);function depthwiseConv2d$1(e, t, n, r, i, a) {
    return void 0 === n && (n = [1, 1]), void 0 === r && (r = "valid"), tidy(function () {
      null == i && (i = imageDataFormat()), checkDataFormat(i);var o = preprocessConv2DInput(e, i);if (4 !== e.rank) throw new ValueError("Input for depthwiseConv2d is required to be 4-D, but is instead " + e.rank + "-D");if (4 !== t.rank) throw new ValueError("depthwiseKernel is required to be 4-D, but is instead " + t.rank + "-D");return o = depthwiseConv2d(o, t, n, "same" === r ? "same" : "valid", "NHWC", a), "channelsFirst" === i && (o = transpose(o, [0, 3, 1, 2])), o;
    });
  }serialization.SerializationMap.register(UpSampling2D);var DepthwiseConv2D = function (e) {
    function t(t) {
      var n = e.call(this, 2, t) || this;return n.depthwiseKernel = null, n.depthMultiplier = null == t.depthMultiplier ? 1 : t.depthMultiplier, n.depthwiseInitializer = getInitializer(t.depthwiseInitializer || n.DEFAULT_KERNEL_INITIALIZER), n.depthwiseConstraint = getConstraint(t.depthwiseConstraint), n.depthwiseRegularizer = getRegularizer(t.depthwiseRegularizer), n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      if ((e = getExactlyOneShape(e)).length < 4) throw new ValueError("Inputs to DepthwiseConv2D should have rank 4. Received input shape: " + JSON.stringify(e) + ".");var t = "channelsFirst" === this.dataFormat ? 1 : 3;if (null == e[t] || e[t] < 0) throw new ValueError("The channel dimension of the inputs to DepthwiseConv2D should be defined, but is not (" + e[t] + ").");var n = e[t],
          r = [this.kernelSize[0], this.kernelSize[1], n, this.depthMultiplier];this.depthwiseKernel = this.addWeight("depthwise_kernel", r, null, this.depthwiseInitializer, this.depthwiseRegularizer, !0, this.depthwiseConstraint), this.useBias ? this.bias = this.addWeight("bias", [n * this.depthMultiplier], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t = depthwiseConv2d$1(e = getExactlyOneTensor(e), n.depthwiseKernel.read(), n.strides, n.padding, n.dataFormat, null);return n.useBias && (t = biasAdd(t, n.bias.read(), n.dataFormat)), null != n.activation && (t = n.activation.apply(t)), t;
      });
    }, t.prototype.computeOutputShape = function (e) {
      e = getExactlyOneShape(e);var t = "channelsFirst" === this.dataFormat ? e[2] : e[1],
          n = "channelsFirst" === this.dataFormat ? e[3] : e[2],
          r = "channelsFirst" === this.dataFormat ? e[1] * this.depthMultiplier : e[3] * this.depthMultiplier,
          i = convOutputLength(t, this.kernelSize[0], this.padding, this.strides[0]),
          a = convOutputLength(n, this.kernelSize[1], this.padding, this.strides[1]);return "channelsFirst" === this.dataFormat ? [e[0], r, i, a] : [e[0], i, a, r];
    }, t.className = "DepthwiseConv2D", t;
  }(BaseConv);serialization.SerializationMap.register(DepthwiseConv2D);var Dropout = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;if (n.rate = Math.max(Math.min(t.rate, 1), 0), n.rateScalar = getScalar(n.rate), n.noiseShape = t.noiseShape, n.seed = t.seed, null != n.seed) throw new NotImplementedError("Non-default seed is not implemented in Dropout layer yet: " + n.seed);return n.supportsMasking = !0, n;
    }return __extends$1(t, e), t.prototype.getNoiseShape = function (e) {
      if (null == this.noiseShape) return this.noiseShape;for (var t = e.shape, n = [], r = 0; r < this.noiseShape.length; ++r) n.push(null == this.noiseShape[r] ? t[r] : this.noiseShape[r]);return n;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        n.invokeCallHook(e, t);var r = getExactlyOneTensor(e);if (null != n.noiseShape && !util.arraysEqual(r.shape, n.noiseShape)) throw new NotImplementedError("Non-default noise shape is not implemented in Dropout layer yet: " + JSON.stringify(n.noiseShape));if (0 < n.rate && n.rate < 1) {
          var i = null != t.training && t.training,
              a = n.getNoiseShape(r);return inTrainPhase(function () {
            return dropout(r, n.rateScalar, a, n.seed);
          }, function () {
            return r;
          }, i);
        }return e;
      });
    }, t.prototype.getConfig = function () {
      var t = { rate: this.rate, noiseShape: this.noiseShape, seed: this.seed },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Dropout", t;
  }(Layer);serialization.SerializationMap.register(Dropout);var Dense = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;if (n.activation = null, n.useBias = !0, n.kernel = null, n.bias = null, n.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", n.DEFAULT_BIAS_INITIALIZER = "zeros", null == t.batchInputShape && null == t.inputShape && null != t.inputDim) {
        var r = null;null != t.batchSize && (r = t.batchSize), n.batchInputShape = [r, t.inputDim];
      }return n.units = t.units, n.activation = getActivation(t.activation), null != t.useBias && (n.useBias = t.useBias), n.kernelInitializer = getInitializer(t.kernelInitializer || n.DEFAULT_KERNEL_INITIALIZER), n.biasInitializer = getInitializer(t.biasInitializer || n.DEFAULT_BIAS_INITIALIZER), n.kernelConstraint = getConstraint(t.kernelConstraint), n.biasConstraint = getConstraint(t.biasConstraint), n.kernelRegularizer = getRegularizer(t.kernelRegularizer), n.biasRegularizer = getRegularizer(t.biasRegularizer), n.activityRegularizer = getRegularizer(t.activityRegularizer), n.inputSpec = [{ minNDim: 2 }], n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      var t,
          n = (e = getExactlyOneShape(e))[e.length - 1];null == this.kernel && (this.kernel = this.addWeight("kernel", [n, this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.useBias && (this.bias = this.addWeight("bias", [this.units], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint))), this.inputSpec = [{ minNDim: 2, axes: (t = {}, t[-1] = n, t) }], this.built = !0;
    }, t.prototype.computeOutputShape = function (e) {
      var t = (e = getExactlyOneShape(e)).slice();return t[t.length - 1] = this.units, t;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        n.invokeCallHook(e, t);var r = dot$1(getExactlyOneTensor(e), n.kernel.read());return null != n.bias && (r = biasAdd(r, n.bias.read())), null != n.activation && (r = n.activation.apply(r)), r;
      });
    }, t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), biasInitializer: serializeInitializer(this.biasInitializer), kernelRegularizer: serializeRegularizer(this.kernelRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), biasConstraint: serializeConstraint(this.biasConstraint) },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Dense", t;
  }(Layer);serialization.SerializationMap.register(Dense);var Flatten = function (e) {
    function t(t) {
      var n = e.call(this, t || {}) || this;return n.inputSpec = [{ minNDim: 3 }], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      for (var t = 0, n = (e = getExactlyOneShape(e)).slice(1); t < n.length; t++) {
        if (null == n[t]) throw new ValueError('The shape of the input to "Flatten" is not fully defined (got ' + e.slice(1) + '). Make sure to pass a complete "input_shape" or "batch_input_shape" argument to the first layer in your model.');
      }return [e[0], arrayProd(e, 1)];
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        return n.invokeCallHook(e, t), batchFlatten(getExactlyOneTensor(e));
      });
    }, t.className = "Flatten", t;
  }(Layer);serialization.SerializationMap.register(Flatten);var Activation$1 = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.supportsMasking = !0, n.activation = getActivation(t.activation), n;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        n.invokeCallHook(e, t);var r = getExactlyOneTensor(e);return n.activation.apply(r);
      });
    }, t.prototype.getConfig = function () {
      var t = { activation: serializeActivation(this.activation) },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Activation", t;
  }(Layer);serialization.SerializationMap.register(Activation$1);var RepeatVector = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.n = t.n, n.inputSpec = [{ ndim: 2 }], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      return [e[0], this.n, e[1]];
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        return repeat(e = getExactlyOneTensor(e), n.n);
      });
    }, t.prototype.getConfig = function () {
      var t = { n: this.n },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "RepeatVector", t;
  }(Layer);serialization.SerializationMap.register(RepeatVector);var Reshape = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;n.targetShape = t.targetShape;for (var r = 0; r < n.targetShape.length; ++r) n.isUnknown(n.targetShape[r]) && (n.targetShape[r] = null);return n;
    }return __extends$1(t, e), t.prototype.isUnknown = function (e) {
      return e < 0 || null == e;
    }, t.prototype.fixUnknownDimension = function (e, t) {
      for (var n = "Total size of new array must be unchanged.", r = t.slice(), i = 1, a = null, o = 0; o < r.length; ++o) {
        var s = r[o];if (this.isUnknown(s)) {
          if (null !== a) throw new ValueError("Can only specifiy one unknown dimension.");a = o;
        } else i *= s;
      }var l = arrayProd(e);if (null !== a) {
        if (0 === i || l % i != 0) throw new ValueError(n);r[a] = l / i;
      } else if (l !== i) throw new ValueError(n);return r;
    }, t.prototype.computeOutputShape = function (e) {
      for (var t = !1, n = 0; n < e.length; ++n) if (this.isUnknown(e[n])) {
        t = !0;break;
      }return t ? e.slice(0, 1).concat(this.targetShape) : e.slice(0, 1).concat(this.fixUnknownDimension(e.slice(1), this.targetShape));
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        n.invokeCallHook(e, t);var r = getExactlyOneTensor(e),
            i = r.shape,
            a = i.slice(0, 1).concat(n.fixUnknownDimension(i.slice(1), n.targetShape));return r.reshape(a);
      });
    }, t.prototype.getConfig = function () {
      var t = { targetShape: this.targetShape },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Reshape", t;
  }(Layer);serialization.SerializationMap.register(Reshape);var Embedding = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;if (n.embeddings = null, n.DEFAULT_EMBEDDINGS_INITIALIZER = "randomUniform", null == t.batchInputShape && null == t.inputShape) {
        var r = null;null != t.batchSize && (r = t.batchSize), null == t.inputLength ? n.batchInputShape = [r, null] : n.batchInputShape = [r].concat(toList(t.inputLength));
      }return n.inputDim = t.inputDim, n.outputDim = t.outputDim, n.embeddingsInitializer = getInitializer(t.embeddingsInitializer || n.DEFAULT_EMBEDDINGS_INITIALIZER), n.embeddingsRegularizer = getRegularizer(t.embeddingsRegularizer), n.activityRegularizer = getRegularizer(t.activityRegularizer), n.embeddingsConstraint = getConstraint(t.embeddingsConstraint), n.maskZero = t.maskZero, n.inputLength = t.inputLength, n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      this.embeddings = this.addWeight("embeddings", [this.inputDim, this.outputDim], this.dtype, this.embeddingsInitializer, this.embeddingsRegularizer, !0, this.embeddingsConstraint), this.built = !0;
    }, t.prototype.computeMask = function (e, t) {
      throw new NotImplementedError("computeMask has not been implemented for Embedding yet");
    }, t.prototype.computeOutputShape = function (e) {
      if (e = getExactlyOneShape(e), null == this.inputLength) return e.concat([this.outputDim]);var t = toList(this.inputLength);if (t.length !== e.length - 1) throw new ValueError('"inputLength" is ' + this.inputLength + ", but received input shape has shape " + e);for (var n = 0, r = 0; r < t.length; ++r) {
        var i = t[r],
            a = e[r + 1];if (null != i && null != a && i !== a) throw new ValueError('"inputLength" is ' + this.inputLength + ", but received input shape has shape " + e);null == i && (t[n] = a), n++;
      }return [e[0]].concat(t, [this.outputDim]);
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        n.invokeCallHook(e, t);var r = getExactlyOneTensor(e);return "int32" !== r.dtype && (r = cast$1(r, "int32")), gather$1(n.embeddings.read(), r.as1D()).reshape(getExactlyOneShape(n.computeOutputShape(r.shape)));
      });
    }, t.prototype.getConfig = function () {
      var t = { inputDim: this.inputDim, outputDim: this.outputDim, embeddingsInitializer: serializeInitializer(this.embeddingsInitializer), embeddingsRegularizer: serializeRegularizer(this.embeddingsRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), embeddingsConstraint: serializeConstraint(this.embeddingsConstraint), maskZero: this.maskZero, inputLength: this.inputLength },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Embedding", t;
  }(Layer);serialization.SerializationMap.register(Embedding);var Merge = function (e) {
    function t(t) {
      var n = e.call(this, t || {}) || this;return n.supportsMasking = !0, n;
    }return __extends$1(t, e), t.prototype.mergeFunction = function (e) {
      throw new NotImplementedError();
    }, t.prototype.computeElementwiseOpOutputShape = function (e, t) {
      if (null == e || null == t) return null;if (e.length < t.length) return this.computeElementwiseOpOutputShape(t, e);if (0 === t.length) return e;for (var n = e.slice(0, e.length - t.length), r = 0; r < t.length; ++r) {
        var i = e[e.length - t.length + r],
            a = t[r];if (null == i || null == a || i < 0 || a < 0) n.push(null);else if (1 === i) n.push(a);else if (1 === a) n.push(i);else {
          if (i !== a) throw new ValueError("Operands could not be broadcast together with shapes " + JSON.stringify(e) + " " + JSON.stringify(t));n.push(i);
        }
      }return n;
    }, t.prototype.build = function (e) {
      if (Array.isArray(e) && !Array.isArray(e[0]) && (e = [getExactlyOneShape(e)]), (e = e).length < 2) throw new ValueError("A merge layer should be called on an Array of at least 2 inputs. Got " + e.length + " input(s).");for (var t = [], n = 0, r = e; n < r.length; n++) {
        null != (o = r[n]) && null !== o[0] && t.push(o[0]);
      }if ((t = unique(t)).length > 1) throw new ValueError("Can not merge tensors with different batch sizes. Got tensors with shapes: " + JSON.stringify(e) + ".");for (var i = null == e[0] ? null : e[0].slice(1), a = 1; a < e.length; ++a) {
        var o = null == e[a] ? null : e[a].slice(1);i = this.computeElementwiseOpOutputShape(i, o);
      }var s = e.map(function (e) {
        return e.length;
      });-1 === e.indexOf(null) && 1 === unique(s).length ? this.reshapeRequired = !1 : this.reshapeRequired = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        if (e = e, n.reshapeRequired) {
          var t = [],
              r = e.map(function (e) {
            return e.rank;
          });if (-1 === r.indexOf(null)) {
            for (var i = max$1(r), a = 0, o = e; a < o.length; a++) {
              for (var s = (h = o[a]).rank, l = 0; l < i - s; ++l) h = expandDims$1(h, 1);t.push(h);
            }return n.mergeFunction(t);
          }for (var u = !1, c = 0, p = e; c < p.length; c++) {
            var h;if (null == (s = (h = p[c]).rank)) {
              var d = h.shape,
                  g = d[0],
                  f = d.slice(1).concat([g]),
                  m = h.reshape([g].concat(arrayProd(d.slice(1))));m = (m = transpose(m, [1, 0])).reshape(f), t.push(m), u = !0;
            } else if (s > 1) {
              var y = range$1(1, s).concat([0]);t.push(transpose(h, y)), u = !0;
            } else t.push(h);
          }var v = n.mergeFunction(t),
              b = v.rank;if (u) if (null == b) {
            var z = v.shape;f = [g = z[z.length - 1]].concat(z.slice(0, z.length - 1));v = transpose(v.reshape([-1, g]), [1, 0]).reshape(f);
          } else if (b > 1) {
            y = [b - 1].concat(range$1(0, b - 1));v = transpose(v, y);
          }return v;
        }return n.mergeFunction(e);
      });
    }, t.prototype.computeOutputShape = function (e) {
      var t;t = null == (e = e)[0] ? null : e[0].slice(1);for (var n = 1; n < e.length; ++n) {
        var r = null == e[n] ? null : e[n].slice(1);t = this.computeElementwiseOpOutputShape(t, r);
      }for (var i = [], a = 0, o = e; a < o.length; a++) {
        null != (r = o[a]) && null !== r[0] && i.push(r[0]);
      }return t = 1 === (i = unique(i)).length ? i.concat(t) : [null].concat(t);
    }, t;
  }(Layer),
      Add = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.mergeFunction = function (e) {
      return tidy(function () {
        for (var t = zeros(e[0].shape), n = 0, r = e; n < r.length; n++) {
          var i = r[n];t = add(t, i);
        }return t;
      });
    }, t.className = "Add", t;
  }(Merge);serialization.SerializationMap.register(Add);var Multiply = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.mergeFunction = function (e) {
      return tidy(function () {
        for (var t = ones$1(e[0].shape), n = 0, r = e; n < r.length; n++) {
          var i = r[n];t = mul(t, i);
        }return t;
      });
    }, t.className = "Multiply", t;
  }(Merge);serialization.SerializationMap.register(Multiply);var Average = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.mergeFunction = function (e) {
      return tidy(function () {
        for (var t = zeros(e[0].shape), n = 0, r = e; n < r.length; n++) {
          var i = r[n];t = add(t, i);
        }return mul(getScalar(1 / e.length), t);
      });
    }, t.className = "Average", t;
  }(Merge);serialization.SerializationMap.register(Average);var Maximum = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.mergeFunction = function (e) {
      return tidy(function () {
        for (var t = e[0], n = 1; n < e.length; ++n) t = maximum(t, e[n]);return t;
      });
    }, t.className = "Maximum", t;
  }(Merge);serialization.SerializationMap.register(Maximum);var Minimum = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.mergeFunction = function (e) {
      return tidy(function () {
        for (var t = e[0], n = 1; n < e.length; ++n) t = minimum(t, e[n]);return t;
      });
    }, t.className = "Minimum", t;
  }(Merge);serialization.SerializationMap.register(Minimum);var Concatenate = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.DEFAULT_AXIS = -1, null == t && (t = {}), n.axis = null == t.axis ? n.DEFAULT_AXIS : t.axis, n.supportsMasking = !0, n.reshapeRequired = !1, n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      if (!Array.isArray(e) || !Array.isArray(e[0]) || 1 === e.length) throw new ValueError("A `Concatenate` layer should be called on a list of at least 2 inputs");for (var t = !0, n = 0, r = e = e; n < r.length; n++) {
        if (null != (c = r[n])) {
          t = !1;break;
        }
      }if (!t) {
        for (var i = [], a = 0; a < e.length; ++a) {
          var o = e[a].slice();o.splice(this.axis, 1);for (var s = !1, l = 0, u = i; l < u.length; l++) {
            var c = u[l];if (util.arraysEqual(c, o)) {
              s = !0;break;
            }
          }s || i.push(o);
        }if (i.length > 1) throw new ValueError("A `Concatenate` layer requires inputs with matching shapes except for the concat axis. Got input shapes: " + JSON.stringify(e));
      }
    }, t.prototype.mergeFunction = function (e) {
      var t = this;return tidy(function () {
        return concatenate(e, t.axis);
      });
    }, t.prototype.computeOutputShape = function (e) {
      if (!Array.isArray(e) || !Array.isArray(e[0])) throw new ValueError("A `Concatenate` layer should be called on a list of inputs.");for (var t = e, n = t[0].slice(), r = this.axis < 0 ? n.length + this.axis : this.axis, i = 0, a = t.slice(1); i < a.length; i++) {
        var o = a[i];if (null == n[r] || null == o[r]) {
          n[r] = null;break;
        }n[r] += o[r];
      }return n;
    }, t.prototype.getConfig = function () {
      var t = { axis: this.axis },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "Concatenate", t;
  }(Merge);function batchNormalization$1(e, t, n, r, i, a) {
    var o;if (void 0 === a && (a = .001), 2 === e.rank) o = batchNormalization2d(e, t, n, a, i, r);else if (3 === e.rank) o = batchNormalization3d(e, t, n, a, i, r);else {
      if (4 !== e.rank) throw new NotImplementedError("batchNormalization is not implememnted for array of rank " + e.rank + " yet");o = batchNormalization4d(e, t, n, a, i, r);
    }return o;
  }function regularNormalizeBatchInTraining(e, t, n, r, i) {
    return void 0 === i && (i = .001), tidy(function () {
      var a = moments(e, r),
          o = a.mean,
          s = a.variance;return [batchNormalization$1(e, o, s, n, t, i), o, s];
    });
  }function broadcastNormalizeBatchInTraining(e, t, n, r, i) {
    return void 0 === i && (i = .001), tidy(function () {
      for (var a = moments(e, r), o = a.mean, s = a.variance, l = [], u = 0, c = range$1(0, e.rank); u < c.length; u++) {
        var p = c[u];-1 !== r.indexOf(p) ? l.push(1) : l.push(e.shape[p]);
      }var h = o.reshape(l),
          d = s.reshape(l),
          g = null == t ? null : t.reshape(l),
          f = null == n ? null : n.reshape(l);return [batchNormalization$1(e, h, d, f, g, i), o, s];
    });
  }function normalizeBatchInTraining(e, t, n, r, i) {
    return void 0 === i && (i = .001), util.arraysEqual(r.slice().sort(), range$1(0, e.rank - 1)) ? regularNormalizeBatchInTraining(e, t, n, r, i) : broadcastNormalizeBatchInTraining(e, t, n, r, i);
  }serialization.SerializationMap.register(Concatenate);var BatchNormalization = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.supportsMasking = !0, n.axis = null == t.axis ? -1 : t.axis, n.momentum = null == t.momentum ? .99 : t.momentum, n.epsilon = null == t.epsilon ? .001 : t.epsilon, n.center = null == t.center || t.center, n.scale = null == t.scale || t.scale, n.betaInitializer = getInitializer(t.betaInitializer || "zeros"), n.gammaInitializer = getInitializer(t.gammaInitializer || "ones"), n.movingMeanInitializer = getInitializer(t.movingMeanInitializer || "zeros"), n.movingVarianceInitializer = getInitializer(t.movingVarianceInitializer || "ones"), n.betaConstraint = getConstraint(t.betaConstraint), n.gammaConstraint = getConstraint(t.gammaConstraint), n.betaRegularizer = getRegularizer(t.betaRegularizer), n.gammaRegularizer = getRegularizer(t.gammaRegularizer), n.stepCount = 0, n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      e = getExactlyOneShape(e);var t = this.axis >= 0 ? this.axis : this.axis + e.length,
          n = e[t];if (null == n) throw new ValueError("Axis " + t + " of input tensor should have a defined dimension but the layer received an input with shape " + JSON.stringify(e) + ".");this.inputSpec = [new InputSpec({ ndim: e.length, axes: (r = {}, r[t] = n, r) })];var r,
          i = [n];this.scale && (this.gamma = this.addWeight("gamma", i, null, this.gammaInitializer, this.gammaRegularizer, !0, this.gammaConstraint)), this.center && (this.beta = this.addWeight("beta", i, null, this.betaInitializer, this.betaRegularizer, !0, this.betaConstraint)), this.movingMean = this.addWeight("moving_mean", i, null, this.movingMeanInitializer, null, !1), this.movingVariance = this.addWeight("moving_variance", i, null, this.movingVarianceInitializer, null, !1), this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var r = null != t.training && t.training,
            i = getExactlyOneTensor(e),
            a = i.shape,
            o = a.length,
            s = range$1(0, o),
            l = n.axis >= 0 ? n.axis : n.axis + o;s.splice(l, 1);var u = pyListRepeat(1, o);u[l] = a[l];var c = s.slice();c.sort();var p = !util.arraysEqual(c, range$1(0, o).slice(0, o - 1));if (!r) return function () {
          if (p) {
            var e = n.movingMean.read().reshape(u),
                t = n.movingVariance.read().reshape(u),
                r = n.center ? n.beta.read().reshape(u) : null,
                a = n.scale ? n.gamma.read().reshape(u) : null;return batchNormalization$1(i, e, t, r, a, n.epsilon);
          }return batchNormalization$1(i, n.movingMean.read(), n.movingVariance.read(), null == n.beta ? null : n.beta.read(), null == n.gamma ? null : n.gamma.read(), n.epsilon);
        }();var h = normalizeBatchInTraining(i, n.gamma.read(), n.beta.read(), s, n.epsilon),
            d = h[0],
            g = h[1],
            f = h[2],
            m = arrayProd(s.map(function (e) {
          return i.shape[e];
        })),
            y = f.mul(getScalar(m / (m - (1 + n.epsilon))));return function () {
          n.stepCount++;var e = movingAverage(n.movingMean.read(), g, n.momentum, n.stepCount);n.movingMean.write(e);var t = movingAverage(n.movingVariance.read(), y, n.momentum, n.stepCount);n.movingVariance.write(t);
        }(), d;
      });
    }, t.prototype.getConfig = function () {
      var t = { axis: this.axis, momentum: this.momentum, epsilon: this.epsilon, center: this.center, scale: this.scale, betaInitializer: serializeInitializer(this.betaInitializer), gammaInitializer: serializeInitializer(this.gammaInitializer), movingMeanInitializer: serializeInitializer(this.movingMeanInitializer), movingVarianceInitializer: serializeInitializer(this.movingVarianceInitializer), betaRegularizer: serializeRegularizer(this.betaRegularizer), gammaRegularizer: serializeRegularizer(this.gammaRegularizer), betaConstraint: serializeConstraint(this.betaConstraint), gammaConstraint: serializeConstraint(this.gammaConstraint) },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "BatchNormalization", t;
  }(Layer);function spatial2dPadding(e, t, n) {
    return tidy(function () {
      if (4 !== e.rank) throw new ValueError("temporalPadding expects input tensor to be 4-D, but received a " + e.rank + "-D tensor.");if (null == t && (t = [[1, 1], [1, 1]]), 2 !== t.length || 2 !== t[0].length || 2 !== t[1].length) throw new ValueError("spatial2dPadding expects `padding` to be an Array of two Arrays, each of which is an Array of two integers.");if (null == n && (n = imageDataFormat()), "channelsLast" !== n && "channelsFirst" !== n) throw new ValueError("Unknown data format: " + n + ". Supported data formats are 'channelsLast' and 'channelsFirst.");var r;return r = "channelsFirst" === n ? [[0, 0], [0, 0], t[0], t[1]] : [[0, 0], t[0], t[1], [0, 0]], pad(e, r);
    });
  }serialization.SerializationMap.register(BatchNormalization);var ZeroPadding2D = function (e) {
    function t(t) {
      var n = this;if (null == t && (t = {}), (n = e.call(this, t) || this).dataFormat = null == t.dataFormat ? imageDataFormat() : t.dataFormat, null == t.padding) n.padding = [[1, 1], [1, 1]];else if ("number" == typeof t.padding) n.padding = [[t.padding, t.padding], [t.padding, t.padding]];else {
        if (t.padding = t.padding, 2 !== t.padding.length) throw new ValueError("ZeroPadding2D expects padding to be a length-2 array, but received a length-" + t.padding.length + " array.");var r = void 0,
            i = void 0;if ("number" == typeof t.padding[0]) r = [t.padding[0], t.padding[0]], i = [t.padding[1], t.padding[1]];else {
          if (t.padding = t.padding, 2 !== t.padding[0].length) throw new ValueError("ZeroPadding2D expects height padding to be a length-2 array, but received a length-" + t.padding[0].length + " array.");if (r = t.padding[0], 2 !== t.padding[1].length) throw new ValueError("ZeroPadding2D expects width padding to be a length-2 array, but received a length-" + t.padding[1].length + " array.");i = t.padding[1];
        }n.padding = [r, i];
      }return n.inputSpec = [new InputSpec({ ndim: 4 })], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      var t, n;return e = getExactlyOneShape(e), "channelsFirst" === this.dataFormat ? (t = null != e[2] && e[2] >= 0 ? e[2] + this.padding[0][0] + this.padding[0][1] : null, n = null != e[3] && e[3] >= 0 ? e[3] + this.padding[1][0] + this.padding[1][1] : null, [e[0], e[1], t, n]) : (t = null != e[1] && e[1] >= 0 ? e[1] + this.padding[0][0] + this.padding[0][1] : null, n = null != e[2] && e[2] >= 0 ? e[2] + this.padding[1][0] + this.padding[1][1] : null, [e[0], t, n, e[3]]);
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        return spatial2dPadding(getExactlyOneTensor(e), n.padding, n.dataFormat);
      });
    }, t.prototype.getConfig = function () {
      var t = { padding: this.padding, dataFormat: this.dataFormat },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "ZeroPadding2D", t;
  }(Layer);function pool2d(e, t, n, r, i, a) {
    return tidy(function () {
      var o;checkDataFormat(i), checkPoolMode(a), checkPaddingMode(r), null == n && (n = [1, 1]), null == r && (r = "valid"), null == i && (i = imageDataFormat()), null == a && (a = "max"), e = preprocessConv2DInput(e, i);var s = "same" === r ? "same" : "valid";return o = "max" === a ? maxPool(e, t, n, s) : avgPool(e, t, n, s), "channelsFirst" === i && (o = transpose(o, [0, 3, 1, 2])), o;
    });
  }serialization.SerializationMap.register(ZeroPadding2D);var Pooling1D = function (e) {
    function t(t) {
      var n = this;if (null == t.poolSize && (t.poolSize = 2), n = e.call(this, t) || this, "number" == typeof t.poolSize) n.poolSize = [t.poolSize];else {
        if (!Array.isArray(t.poolSize) || 1 !== t.poolSize.length || "number" != typeof t.poolSize[0]) throw new ValueError("poolSize for 1D convolutional layer must be a number or an Array of a single number, but received " + JSON.stringify(t.poolSize));n.poolSize = t.poolSize;
      }if (null == t.strides) n.strides = n.poolSize;else if ("number" == typeof t.strides) n.strides = [t.strides];else {
        if (!Array.isArray(t.strides) || 1 !== t.strides.length || "number" != typeof t.strides[0]) throw new ValueError("strides for 1D convolutional layer must be a number or an Array of a single number, but received " + JSON.stringify(t.strides));n.strides = t.strides;
      }return n.padding = null == t.padding ? "valid" : t.padding, checkPaddingMode(n.padding), n.inputSpec = [new InputSpec({ ndim: 3 })], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      var t = convOutputLength((e = getExactlyOneShape(e))[1], this.poolSize[0], this.padding, this.strides[0]);return [e[0], t, e[2]];
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        n.invokeCallHook(e, t), e = expandDims$1(getExactlyOneTensor(e), 2);var r = n.poolingFunction(getExactlyOneTensor(e), [n.poolSize[0], 1], [n.strides[0], 1], n.padding, "channelsLast");return squeeze(r, [2]);
      });
    }, t.prototype.getConfig = function () {
      var t = { poolSize: this.poolSize, padding: this.padding, strides: this.strides },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t;
  }(Layer),
      MaxPooling1D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.poolingFunction = function (e, t, n, r, i) {
      return checkDataFormat(i), checkPaddingMode(r), pool2d(e, t, n, r, i, "max");
    }, t.className = "MaxPooling1D", t;
  }(Pooling1D);serialization.SerializationMap.register(MaxPooling1D);var AveragePooling1D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.poolingFunction = function (e, t, n, r, i) {
      return checkDataFormat(i), checkPaddingMode(r), pool2d(e, t, n, r, i, "avg");
    }, t.className = "AveragePooling1D", t;
  }(Pooling1D);serialization.SerializationMap.register(AveragePooling1D);var Pooling2D = function (e) {
    function t(t) {
      var n = this;if (null == t.poolSize && (t.poolSize = [2, 2]), (n = e.call(this, t) || this).poolSize = Array.isArray(t.poolSize) ? t.poolSize : [t.poolSize, t.poolSize], null == t.strides) n.strides = n.poolSize;else if (Array.isArray(t.strides)) {
        if (2 !== t.strides.length) throw new ValueError("If the strides property of a 2D pooling layer is an Array, it is expected to have a length of 2, but received length " + t.strides.length + ".");n.strides = t.strides;
      } else n.strides = [t.strides, t.strides];return n.padding = null == t.padding ? "valid" : t.padding, n.dataFormat = null == t.dataFormat ? "channelsLast" : t.dataFormat, checkDataFormat(n.dataFormat), checkPaddingMode(n.padding), n.inputSpec = [new InputSpec({ ndim: 4 })], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      e = getExactlyOneShape(e);var t = "channelsFirst" === this.dataFormat ? e[2] : e[1],
          n = "channelsFirst" === this.dataFormat ? e[3] : e[2];return t = convOutputLength(t, this.poolSize[0], this.padding, this.strides[0]), n = convOutputLength(n, this.poolSize[1], this.padding, this.strides[1]), "channelsFirst" === this.dataFormat ? [e[0], e[1], t, n] : [e[0], t, n, e[3]];
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        return n.invokeCallHook(e, t), n.poolingFunction(getExactlyOneTensor(e), n.poolSize, n.strides, n.padding, n.dataFormat);
      });
    }, t.prototype.getConfig = function () {
      var t = { poolSize: this.poolSize, padding: this.padding, strides: this.strides, dataFormat: this.dataFormat },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t;
  }(Layer),
      MaxPooling2D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.poolingFunction = function (e, t, n, r, i) {
      return checkDataFormat(i), checkPaddingMode(r), pool2d(e, t, n, r, i, "max");
    }, t.className = "MaxPooling2D", t;
  }(Pooling2D);serialization.SerializationMap.register(MaxPooling2D);var AveragePooling2D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.poolingFunction = function (e, t, n, r, i) {
      return checkDataFormat(i), checkPaddingMode(r), pool2d(e, t, n, r, i, "avg");
    }, t.className = "AveragePooling2D", t;
  }(Pooling2D);serialization.SerializationMap.register(AveragePooling2D);var GlobalPooling1D = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.inputSpec = [new InputSpec({ ndim: 3 })], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      return [e[0], e[2]];
    }, t.prototype.call = function (e, t) {
      throw new NotImplementedError();
    }, t;
  }(Layer),
      GlobalAveragePooling1D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      return tidy(function () {
        var t = getExactlyOneTensor(e);return mean(t, 1);
      });
    }, t.className = "GlobalAveragePooling1D", t;
  }(GlobalPooling1D);serialization.SerializationMap.register(GlobalAveragePooling1D);var GlobalMaxPooling1D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      return tidy(function () {
        var t = getExactlyOneTensor(e);return max(t, 1);
      });
    }, t.className = "GlobalMaxPooling1D", t;
  }(GlobalPooling1D);serialization.SerializationMap.register(GlobalMaxPooling1D);var GlobalPooling2D = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.dataFormat = null == t.dataFormat ? "channelsLast" : t.dataFormat, checkDataFormat(n.dataFormat), n.inputSpec = [new InputSpec({ ndim: 4 })], n;
    }return __extends$1(t, e), t.prototype.computeOutputShape = function (e) {
      return e = e, "channelsLast" === this.dataFormat ? [e[0], e[3]] : [e[0], e[1]];
    }, t.prototype.call = function (e, t) {
      throw new NotImplementedError();
    }, t.prototype.getConfig = function () {
      var t = { dataFormat: this.dataFormat },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t;
  }(Layer),
      GlobalAveragePooling2D = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t = getExactlyOneTensor(e);return "channelsLast" === n.dataFormat ? mean(t, [1, 2]) : mean(t, [2, 3]);
      });
    }, t.className = "GlobalAveragePooling2D", t;
  }(GlobalPooling2D);serialization.SerializationMap.register(GlobalAveragePooling2D);var GlobalMaxPooling2D = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var t = getExactlyOneTensor(e);return "channelsLast" === n.dataFormat ? max(t, [1, 2]) : max(t, [2, 3]);
      });
    }, t.className = "GlobalMaxPooling2D", t;
  }(GlobalPooling2D);function rnn(e, t, n, r, i, a, o, s) {
    void 0 === r && (r = !1), void 0 === o && (o = !1);var l = t.shape.length;if (l < 3) throw new ValueError("Input should be at least 3D, but is " + l + "D.");var u,
        c,
        p = [1, 0].concat(range$1(2, l));if (t = transpose(t, p), null != i) throw new NotImplementedError("The rnn() function of the deeplearn.js backend does not support masking yet.");if (null != a) throw new NotImplementedError("The rnn() functoin of the deeplearn.js backend does not support constants yet.");o && console.warn("Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend."), r && (t = reverse(t, 0));for (var h = n, d = t.shape[0], g = 0; g < d; ++g) {
      var f = sliceAlongFirstAxis(t, g, 1),
          m = e(f = f.reshape(f.shape.slice(1)), h);c = m[0], u = 0 === g ? c.reshape([1].concat(c.shape)) : concatAlongFirstAxis(u, c.reshape([1].concat(c.shape))), h = m[1];
    }return [c, transpose(u, [1, 0].concat(range$1(2, u.shape.length))), h];
  }serialization.SerializationMap.register(GlobalMaxPooling2D);var RNN = function (e) {
    function t(t) {
      var n,
          r = e.call(this, t) || this;if (null == t.cell) throw new ValueError("cell property is missing for the constructor of RNN.");if (null == (n = Array.isArray(t.cell) ? new StackedRNNCells({ cells: t.cell }) : t.cell).stateSize) throw new ValueError("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");return r.cell = n, r.returnSequences = null != t.returnSequences && t.returnSequences, r.returnState = null != t.returnState && t.returnState, r.goBackwards = null != t.goBackwards && t.goBackwards, r._stateful = null != t.stateful && t.stateful, r.unroll = null != t.unroll && t.unroll, r.supportsMasking = !0, r.inputSpec = [new InputSpec({ ndim: 3 })], r.stateSpec = null, r.states = null, r.numConstants = null, r;
    }return __extends$1(t, e), t.prototype.getStates = function () {
      return null == this.states ? range$1(0, Array.isArray(this.cell.stateSize) ? this.cell.stateSize.length : 1).map(function (e) {
        return null;
      }) : this.states;
    }, t.prototype.setStates = function (e) {
      this.states = e;
    }, t.prototype.computeOutputShape = function (e) {
      isArrayOfShapes(e) && (e = e[0]), e = e;var t = this.cell.stateSize;Array.isArray(t) || (t = [t]);var n,
          r = t[0];if (n = this.returnSequences ? [e[0], e[1], r] : [e[0], r], this.returnState) {
        for (var i = [], a = 0, o = t; a < o.length; a++) {
          var s = o[a];i.push([e[0], s]);
        }return [n].concat(i);
      }return n;
    }, t.prototype.computeMask = function (e, t) {
      throw new NotImplementedError("computeMask has not been implemented for RNN yet");
    }, t.prototype.build = function (e) {
      if (null != this.numConstants) throw new NotImplementedError("Constants support is not implemented in RNN yet.");isArrayOfShapes(e) && (e = e[0]), e = e;var t = this.stateful ? e[0] : null,
          n = e[e.length - 1];this.inputSpec[0] = new InputSpec({ shape: [t, null, n] });var r,
          i = [e[0]].concat(e.slice(2));if (this.cell.build(i), r = Array.isArray(this.cell.stateSize) ? this.cell.stateSize : [this.cell.stateSize], null != this.stateSpec) {
        if (!util.arraysEqual(this.stateSpec.map(function (e) {
          return e.shape[e.shape.length - 1];
        }), r)) throw new ValueError("An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=" + this.stateSpec + "; However cell.stateSize is " + this.cell.stateSize);
      } else this.stateSpec = r.map(function (e) {
        return new InputSpec({ shape: [null, e] });
      });if (this.stateful) throw new NotImplementedError("stateful RNN layer is not implemented yet");
    }, t.prototype.resetStates = function (e) {
      var t = this;tidy(function () {
        if (!t.stateful) throw new AttributeError("Cannot call resetState() on an RNN Layer that is not stateful.");var n = t.inputSpec[0].shape[0];if (null == n) throw new ValueError("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if (null == t.states) Array.isArray(t.cell.stateSize) ? t.states = t.cell.stateSize.map(function (e) {
          return zeros([n, e]);
        }) : t.states = [zeros([n, t.cell.stateSize])];else if (null == e) Array.isArray(t.cell.stateSize) ? t.states = t.cell.stateSize.map(function (e) {
          return zeros([n, e]);
        }) : t.states[0] = zeros([n, t.cell.stateSize]);else {
          if (Array.isArray(e) || (e = [e]), e.length !== t.states.length) throw new ValueError("Layer " + t.name + " expects " + t.states.length + " state(s), but it received " + e.length + " state value(s). Input received: " + e);for (var r = 0; r < t.states.length; ++r) {
            var i = e[r],
                a = Array.isArray(t.cell.stateSize) ? t.cell.stateSize[r] : t.cell.stateSize,
                o = [n, a];if (!util.arraysEqual(i.shape, o)) throw new ValueError("State " + r + " is incompatible with layer " + t.name + ": expected shape=" + o + ", received shape=" + i.shape);t.states[r] = i;
          }
        }
      });
    }, t.prototype.standardizeArgs = function (e, t, n) {
      if (Array.isArray(e)) {
        if (null != t || null != n) throw new ValueError("When inputs is an array, neither initialState or constants should be provided");null != this.numConstants && (n = e.slice(e.length - this.numConstants, e.length), e = e.slice(0, e.length - this.numConstants)), e.length > 1 && (t = e.slice(1, e.length)), e = e[0];
      }function r(e) {
        return null == e || Array.isArray(e) ? e : [e];
      }return { inputs: e, initialState: t = r(t), constants: n = r(n) };
    }, t.prototype.apply = function (t, n) {
      var r = null == n ? null : n.initialState,
          i = null == n ? null : n.constants;null == n && (n = {});var a = this.standardizeArgs(t, r, i);t = a.inputs, r = a.initialState, i = a.constants;var o = [],
          s = [];if (null != r) {
        n.initialState = r, o = o.concat(r), this.stateSpec = [];for (var l = 0, u = r; l < u.length; l++) {
          var c = u[l];this.stateSpec.push(new InputSpec({ shape: c.shape }));
        }s = s.concat(this.stateSpec);
      }if (null != i && (n.constants = i, o = o.concat(i), this.numConstants = i.length), o[0] instanceof SymbolicTensor) {
        var p = [t].concat(o),
            h = this.inputSpec.concat(s),
            d = this.inputSpec;this.inputSpec = h;var g = e.prototype.apply.call(this, p, n);return this.inputSpec = d, g;
      }return e.prototype.apply.call(this, t, n);
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        var r = null == t ? null : t.mask,
            i = null == t ? null : t.training,
            a = null == t ? null : t.initialState;if (e = getExactlyOneTensor(e), null == a) {
          if (n.stateful) throw new NotImplementedError("stateful RNN layer is not implemented yet.");a = n.getInitialState(e);
        }if (null != r) throw new NotImplementedError("Masking is not implemented for RNN yet");var o = Array.isArray(n.cell.stateSize) ? n.cell.stateSize.length : 1;if (a.length !== o) throw new ValueError("RNN Layer has " + o + " state(s) but was passed " + a.length + " initial state(s).");var s = e.shape[1];n.unroll && console.warn("Ignoring unroll = true for RNN layer, due to imperative backend.");var l = { training: i },
            u = rnn(function (e, t) {
          var r = n.cell.call([e].concat(t), l);return [r[0], r.slice(1)];
        }, e, a, n.goBackwards, null, null, n.unroll, s),
            c = u[0],
            p = u[1],
            h = u[2];if (n.stateful) throw new NotImplementedError("stateful RNN layer is not implemented yet");var d = n.returnSequences ? p : c;return n.returnState ? [d].concat(h) : d;
      });
    }, t.prototype.getInitialState = function (e) {
      var t = this;return tidy(function () {
        var n = zeros(e.shape);return n = expandDims$1(n = sum(n, [1, 2])), Array.isArray(t.cell.stateSize) ? t.cell.stateSize.map(function (e) {
          return e > 1 ? tile$1(n, [1, e]) : n;
        }) : t.cell.stateSize > 1 ? [tile$1(n, [1, t.cell.stateSize])] : [n];
      });
    }, Object.defineProperty(t.prototype, "trainableWeights", { get: function () {
        return this.trainable ? this.cell.trainableWeights : [];
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "nonTrainableWeights", { get: function () {
        return this.trainable ? this.cell.nonTrainableWeights : this.cell.weights;
      }, enumerable: !0, configurable: !0 }), t.prototype.getConfig = function () {
      var t = { returnSequences: this.returnSequences, returnState: this.returnState, goBackwards: this.goBackwards, stateful: this.stateful, unroll: this.unroll };null != this.numConstants && (t.numConstants = this.numConstants);var n = this.cell.getConfig();t.cell = { className: this.cell.getClassName(), config: n };var r = e.prototype.getConfig.call(this);return Object.assign(t, r), t;
    }, t.className = "RNN", t;
  }(Layer);serialization.SerializationMap.register(RNN);var RNNCell = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }return __extends$1(t, e), t = __decorate$1([doc({ heading: "Layers", subheading: "Classes" })], t);
  }(Layer),
      SimpleRNNCell = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.DEFAULT_ACTIVATION = "tanh", n.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", n.DEFAULT_RECURRENT_INITIALIZER = "orthogonal", n.DEFAULT_BIAS_INITIALIZER = "zeros", n.units = t.units, n.activation = getActivation(null == t.activation ? n.DEFAULT_ACTIVATION : t.activation), n.useBias = null == t.useBias || t.useBias, n.kernelInitializer = getInitializer(t.kernelInitializer || n.DEFAULT_KERNEL_INITIALIZER), n.recurrentInitializer = getInitializer(t.recurrentInitializer || n.DEFAULT_RECURRENT_INITIALIZER), n.biasInitializer = getInitializer(t.biasInitializer || n.DEFAULT_BIAS_INITIALIZER), n.kernelRegularizer = getRegularizer(t.kernelRegularizer), n.recurrentRegularizer = getRegularizer(t.recurrentRegularizer), n.biasRegularizer = getRegularizer(t.biasRegularizer), n.kernelConstraint = getConstraint(t.kernelConstraint), n.recurrentConstraint = getConstraint(t.recurrentConstraint), n.biasConstraint = getConstraint(t.biasConstraint), n.dropout = min$1([1, max$1([0, null == t.dropout ? 0 : t.dropout])]), n.recurrentDropout = min$1([1, max$1([0, null == t.recurrentDropout ? 0 : t.recurrentDropout])]), n.stateSize = n.units, n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      e = getExactlyOneShape(e), this.kernel = this.addWeight("kernel", [e[e.length - 1], this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.recurrentKernel = this.addWeight("recurrent_kernel", [this.units, this.units], null, this.recurrentInitializer, this.recurrentRegularizer, !0, this.recurrentConstraint), this.useBias ? this.bias = this.addWeight("bias", [this.units], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        if (2 !== (e = e).length) throw new ValueError("SimpleRNNCell expects 2 input Tensors, got " + e.length + ".");var t = e[1];if (e = e[0], 0 !== n.dropout || 0 !== n.recurrentDropout) throw new NotImplementedError("Dropout is not implemented for SimpleRNNCell yet");var r = dot$1(e, n.kernel.read());null != n.bias && (r = biasAdd(r, n.bias.read()));var i = add(r, dot$1(t, n.recurrentKernel.read()));return null != n.activation && (i = n.activation.apply(i)), [i, i];
      });
    }, t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), recurrentInitializer: serializeInitializer(this.recurrentInitializer), biasInitializer: serializeInitializer(this.biasInitializer), kernelRegularizer: serializeRegularizer(this.kernelRegularizer), recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), recurrentConstraint: serializeConstraint(this.recurrentConstraint), biasConstraint: serializeConstraint(this.biasConstraint), dropout: this.dropout, recurrentDropout: this.recurrentDropout },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "SimpleRNNCell", t;
  }(RNNCell);serialization.SerializationMap.register(SimpleRNNCell);var SimpleRNN = function (e) {
    function t(t) {
      return t.cell = new SimpleRNNCell(t), e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.call = function (t, n) {
      var r = this;return tidy(function () {
        var i = null == n ? null : n.mask,
            a = null == n ? null : n.training,
            o = null == n ? null : n.initialState;return e.prototype.call.call(r, t, { mask: i, training: a, initialState: o });
      });
    }, Object.defineProperty(t.prototype, "units", { get: function () {
        return this.cell.units;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "activation", { get: function () {
        return this.cell.activation;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "useBias", { get: function () {
        return this.cell.useBias;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelInitializer", { get: function () {
        return this.cell.kernelInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentInitializer", { get: function () {
        return this.cell.recurrentInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasInitializer", { get: function () {
        return this.cell.biasInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelRegularizer", { get: function () {
        return this.cell.kernelRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentRegularizer", { get: function () {
        return this.cell.recurrentRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasRegularizer", { get: function () {
        return this.cell.biasRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelConstraint", { get: function () {
        return this.cell.kernelConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentConstraint", { get: function () {
        return this.cell.recurrentConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasConstraint", { get: function () {
        return this.cell.biasConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "dropout", { get: function () {
        return this.cell.dropout;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentDropout", { get: function () {
        return this.cell.recurrentDropout;
      }, enumerable: !0, configurable: !0 }), t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), recurrentInitializer: serializeInitializer(this.recurrentInitializer), biasInitializer: serializeInitializer(this.biasInitializer), kernelRegularizer: serializeRegularizer(this.kernelRegularizer), recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), recurrentConstraint: serializeConstraint(this.recurrentConstraint), biasConstraint: serializeConstraint(this.biasConstraint), dropout: this.dropout, recurrentDropout: this.recurrentDropout },
          n = e.prototype.getConfig.call(this);return delete n.cell, Object.assign(t, n), t;
    }, t.className = "SimpleRNN", t;
  }(RNN);serialization.SerializationMap.register(SimpleRNN);var GRUCell = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.DEFAULT_ACTIVATION = "tanh", n.DEFAULT_RECURRENT_ACTIVATION = "hardSigmoid", n.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", n.DEFAULT_RECURRENT_INITIALIZER = "orthogonal", n.DEFAULT_BIAS_INITIALIZER = "zeros", n.units = t.units, n.activation = getActivation(void 0 === t.activation ? n.DEFAULT_ACTIVATION : t.activation), n.recurrentActivation = getActivation(void 0 === t.recurrentActivation ? n.DEFAULT_RECURRENT_ACTIVATION : t.recurrentActivation), n.useBias = null == t.useBias || t.useBias, n.kernelInitializer = getInitializer(t.kernelInitializer || n.DEFAULT_KERNEL_INITIALIZER), n.recurrentInitializer = getInitializer(t.recurrentInitializer || n.DEFAULT_RECURRENT_INITIALIZER), n.biasInitializer = getInitializer(t.biasInitializer || n.DEFAULT_BIAS_INITIALIZER), n.kernelRegularizer = getRegularizer(t.kernelRegularizer), n.recurrentRegularizer = getRegularizer(t.recurrentRegularizer), n.biasRegularizer = getRegularizer(t.biasRegularizer), n.kernelConstraint = getConstraint(t.kernelConstraint), n.recurrentConstraint = getConstraint(t.recurrentConstraint), n.biasConstraint = getConstraint(t.biasConstraint), n.dropout = min$1([1, max$1([0, null == t.dropout ? 0 : t.dropout])]), n.recurrentDropout = min$1([1, max$1([0, null == t.recurrentDropout ? 0 : t.recurrentDropout])]), n.implementation = t.implementation, n.stateSize = n.units, n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      var t = (e = getExactlyOneShape(e))[e.length - 1];this.kernel = this.addWeight("kernel", [t, 3 * this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.recurrentKernel = this.addWeight("recurrent_kernel", [this.units, 3 * this.units], null, this.recurrentInitializer, this.recurrentRegularizer, !0, this.recurrentConstraint), this.useBias ? this.bias = this.addWeight("bias", [3 * this.units], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        if (0 !== n.dropout || 0 !== n.recurrentDropout) throw new NotImplementedError("Dropout is not implemented for GRUCell yet");if (2 !== (e = e).length) throw new ValueError("GRUCell expects 2 input Tensors (inputs, h, c), got " + e.length + ".");var t,
            r,
            i,
            a = e[1];if (e = e[0], 1 === n.implementation) {
          var o = sliceAlongLastAxis(n.kernel.read(), 0, n.units),
              s = sliceAlongLastAxis(n.kernel.read(), n.units, n.units),
              l = sliceAlongLastAxis(n.kernel.read(), 2 * n.units, n.units),
              u = sliceAlongLastAxis(n.recurrentKernel.read(), 0, n.units),
              c = sliceAlongLastAxis(n.recurrentKernel.read(), n.units, n.units),
              p = sliceAlongLastAxis(n.recurrentKernel.read(), 2 * n.units, n.units),
              h = e,
              d = e,
              g = dot$1(e, o),
              f = dot$1(h, s),
              m = dot$1(d, l);if (n.useBias) {
            var y = sliceAlongFirstAxis(n.bias.read(), 0, n.units),
                v = sliceAlongFirstAxis(n.bias.read(), n.units, n.units),
                b = sliceAlongFirstAxis(n.bias.read(), 2 * n.units, n.units);g = biasAdd(g, y), f = biasAdd(f, v), m = biasAdd(m, b);
          }var z = a,
              w = a,
              S = a;t = n.recurrentActivation.apply(add(g, dot$1(z, u))), r = n.recurrentActivation.apply(add(f, dot$1(w, c))), i = n.activation.apply(add(m, dot$1(mul(r, S), p)));
        } else {
          var I = dot$1(e, n.kernel.read());n.useBias && (I = biasAdd(I, n.bias.read()));var _ = dot$1(a, sliceAlongLastAxis(n.recurrentKernel.read(), 0, 2 * n.units)),
              A = (g = sliceAlongLastAxis(I, 0, n.units), f = sliceAlongLastAxis(I, n.units, n.units), sliceAlongLastAxis(_, 0, n.units)),
              N = sliceAlongLastAxis(_, n.units, n.units);t = n.recurrentActivation.apply(add(g, A)), r = n.recurrentActivation.apply(add(f, N));m = sliceAlongLastAxis(I, 2 * n.units, n.units);var E = dot$1(mul(r, a), sliceAlongLastAxis(n.recurrentKernel.read(), 2 * n.units, n.units));i = n.activation.apply(add(m, E));
        }var L = add(mul(t, a), mul(add(getScalar(1), neg(t)), i));return [L, L];
      });
    }, t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), recurrentActivation: serializeActivation(this.recurrentActivation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), recurrentInitializer: serializeInitializer(this.recurrentInitializer), biasInitializer: serializeInitializer(this.biasInitializer), kernelRegularizer: serializeRegularizer(this.kernelRegularizer), recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), recurrentConstraint: serializeConstraint(this.recurrentConstraint), biasConstraint: serializeConstraint(this.biasConstraint), dropout: this.dropout, recurrentDropout: this.recurrentDropout, implementation: this.implementation },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "GRUCell", t;
  }(RNNCell);serialization.SerializationMap.register(GRUCell);var GRU = function (e) {
    function t(t) {
      return 0 === t.implementation && console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."), t.cell = new GRUCell(t), e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.call = function (t, n) {
      var r = this;return tidy(function () {
        var i = null == n ? null : n.mask,
            a = null == n ? null : n.training,
            o = null == n ? null : n.initialState;return e.prototype.call.call(r, t, { mask: i, training: a, initialState: o });
      });
    }, Object.defineProperty(t.prototype, "units", { get: function () {
        return this.cell.units;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "activation", { get: function () {
        return this.cell.activation;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentActivation", { get: function () {
        return this.cell.recurrentActivation;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "useBias", { get: function () {
        return this.cell.useBias;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelInitializer", { get: function () {
        return this.cell.kernelInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentInitializer", { get: function () {
        return this.cell.recurrentInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasInitializer", { get: function () {
        return this.cell.biasInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelRegularizer", { get: function () {
        return this.cell.kernelRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentRegularizer", { get: function () {
        return this.cell.recurrentRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasRegularizer", { get: function () {
        return this.cell.biasRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelConstraint", { get: function () {
        return this.cell.kernelConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentConstraint", { get: function () {
        return this.cell.recurrentConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasConstraint", { get: function () {
        return this.cell.biasConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "dropout", { get: function () {
        return this.cell.dropout;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentDropout", { get: function () {
        return this.cell.recurrentDropout;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "implementation", { get: function () {
        return this.cell.implementation;
      }, enumerable: !0, configurable: !0 }), t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), recurrentActivation: serializeActivation(this.recurrentActivation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), recurrentInitializer: serializeInitializer(this.recurrentInitializer), biasInitializer: serializeInitializer(this.biasInitializer), kernelRegularizer: serializeRegularizer(this.kernelRegularizer), recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), recurrentConstraint: serializeConstraint(this.recurrentConstraint), biasConstraint: serializeConstraint(this.biasConstraint), dropout: this.dropout, recurrentDropout: this.recurrentDropout, implementation: this.implementation },
          n = e.prototype.getConfig.call(this);return delete n.cell, Object.assign(t, n), t;
    }, t.fromConfig = function (e, t) {
      return 0 === t.implmentation && (t.implementation = 1), new e(t);
    }, t.className = "GRU", t;
  }(RNN);serialization.SerializationMap.register(GRU);var LSTMCell = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.DEFAULT_ACTIVATION = "tanh", n.DEFAULT_RECURRENT_ACTIVATION = "hardSigmoid", n.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", n.DEFAULT_RECURRENT_INITIALIZER = "orthogonal", n.DEFAULT_BIAS_INITIALIZER = "zeros", n.units = t.units, n.activation = getActivation(void 0 === t.activation ? n.DEFAULT_ACTIVATION : t.activation), n.recurrentActivation = getActivation(void 0 === t.recurrentActivation ? n.DEFAULT_RECURRENT_ACTIVATION : t.recurrentActivation), n.useBias = null == t.useBias || t.useBias, n.kernelInitializer = getInitializer(t.kernelInitializer || n.DEFAULT_KERNEL_INITIALIZER), n.recurrentInitializer = getInitializer(t.recurrentInitializer || n.DEFAULT_RECURRENT_INITIALIZER), n.biasInitializer = getInitializer(t.biasInitializer || n.DEFAULT_BIAS_INITIALIZER), n.unitForgetBias = t.unitForgetBias, n.kernelRegularizer = getRegularizer(t.kernelRegularizer), n.recurrentRegularizer = getRegularizer(t.recurrentRegularizer), n.biasRegularizer = getRegularizer(t.biasRegularizer), n.kernelConstraint = getConstraint(t.kernelConstraint), n.recurrentConstraint = getConstraint(t.recurrentConstraint), n.biasConstraint = getConstraint(t.biasConstraint), n.dropout = min$1([1, max$1([0, null == t.dropout ? 0 : t.dropout])]), n.recurrentDropout = min$1([1, max$1([0, null == t.recurrentDropout ? 0 : t.recurrentDropout])]), n.implementation = t.implementation, n.stateSize = [n.units, n.units], n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      var t,
          n,
          r = (e = getExactlyOneShape(e))[e.length - 1];if (this.kernel = this.addWeight("kernel", [r, 4 * this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.recurrentKernel = this.addWeight("recurrent_kernel", [this.units, 4 * this.units], null, this.recurrentInitializer, this.recurrentRegularizer, !0, this.recurrentConstraint), this.useBias) {
        if (this.unitForgetBias) {
          var i = this.biasInitializer,
              a = this.units;t = new ((n = function (e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this;
            }return __extends$1(t, e), t.prototype.apply = function (e, t) {
              var n = i.apply([a]),
                  r = new Ones().apply([a]),
                  o = i.apply([2 * a]);return concatAlongFirstAxis(concatAlongFirstAxis(n, r), o);
            }, t;
          }(Initializer)).className = "CustomInit", n)();
        } else t = this.biasInitializer;this.bias = this.addWeight("bias", [4 * this.units], null, t, this.biasRegularizer, !0, this.biasConstraint);
      } else this.bias = null;this.built = !0;
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        if (0 !== n.dropout || 0 !== n.recurrentDropout) throw new NotImplementedError("Dropout is not implemented for LSTMCell yet");if (3 !== (e = e).length) throw new ValueError("LSTMCell expects 3 input Tensors (inputs, h, c), got " + e.length + ".");var t,
            r,
            i,
            a,
            o = e[1],
            s = e[2];if (e = e[0], 1 === n.implementation) {
          var l = sliceAlongLastAxis(n.kernel.read(), 0, n.units),
              u = sliceAlongLastAxis(n.kernel.read(), n.units, n.units),
              c = sliceAlongLastAxis(n.kernel.read(), 2 * n.units, n.units),
              p = sliceAlongLastAxis(n.kernel.read(), 3 * n.units, n.units),
              h = sliceAlongLastAxis(n.recurrentKernel.read(), 0, n.units),
              d = sliceAlongLastAxis(n.recurrentKernel.read(), n.units, n.units),
              g = sliceAlongLastAxis(n.recurrentKernel.read(), 2 * n.units, n.units),
              f = sliceAlongLastAxis(n.recurrentKernel.read(), 3 * n.units, n.units),
              m = e,
              y = e,
              v = e,
              b = dot$1(e, l),
              z = dot$1(m, u),
              w = dot$1(y, c),
              S = dot$1(v, p);if (n.useBias) {
            var I = sliceAlongFirstAxis(n.bias.read(), 0, n.units),
                _ = sliceAlongFirstAxis(n.bias.read(), n.units, n.units),
                A = sliceAlongFirstAxis(n.bias.read(), 2 * n.units, n.units),
                N = sliceAlongFirstAxis(n.bias.read(), 3 * n.units, n.units);b = biasAdd(b, I), z = biasAdd(z, _), w = biasAdd(w, A), S = biasAdd(S, N);
          }var E = o,
              L = o,
              C = o,
              k = o;t = n.recurrentActivation.apply(add(b, dot$1(E, h))), r = n.recurrentActivation.apply(add(z, dot$1(L, d))), i = add(mul(r, s), mul(t, n.activation.apply(add(w, dot$1(C, g))))), a = n.recurrentActivation.apply(add(S, dot$1(k, f)));
        } else {
          var x = dot$1(e, n.kernel.read());x = add(x, dot$1(o, n.recurrentKernel.read())), n.useBias && (x = biasAdd(x, n.bias.read()));var T = sliceAlongLastAxis(x, 0, n.units),
              R = sliceAlongLastAxis(x, n.units, n.units),
              D = sliceAlongLastAxis(x, 2 * n.units, n.units),
              O = sliceAlongLastAxis(x, 3 * n.units, n.units);t = n.recurrentActivation.apply(T), r = n.recurrentActivation.apply(R), i = add(mul(r, s), mul(t, n.activation.apply(D))), a = n.recurrentActivation.apply(O);
        }var M = mul(a, n.activation.apply(i));return [M, M, i];
      });
    }, t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), recurrentActivation: serializeActivation(this.recurrentActivation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), recurrentInitializer: serializeInitializer(this.recurrentInitializer), biasInitializer: serializeInitializer(this.biasInitializer), unitForgetBias: this.unitForgetBias, kernelRegularizer: serializeRegularizer(this.kernelRegularizer), recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), recurrentConstraint: serializeConstraint(this.recurrentConstraint), biasConstraint: serializeConstraint(this.biasConstraint), dropout: this.dropout, recurrentDropout: this.recurrentDropout, implementation: this.implementation },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.className = "LSTMCell", t;
  }(RNNCell);serialization.SerializationMap.register(LSTMCell);var LSTM = function (e) {
    function t(t) {
      return 0 === t.implementation && console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."), t.cell = new LSTMCell(t), e.call(this, t) || this;
    }return __extends$1(t, e), t.prototype.call = function (t, n) {
      var r = this;return tidy(function () {
        var i = null == n ? null : n.mask,
            a = null == n ? null : n.training,
            o = null == n ? null : n.initialState;return e.prototype.call.call(r, t, { mask: i, training: a, initialState: o });
      });
    }, Object.defineProperty(t.prototype, "units", { get: function () {
        return this.cell.units;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "activation", { get: function () {
        return this.cell.activation;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentActivation", { get: function () {
        return this.cell.recurrentActivation;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "useBias", { get: function () {
        return this.cell.useBias;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelInitializer", { get: function () {
        return this.cell.kernelInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentInitializer", { get: function () {
        return this.cell.recurrentInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasInitializer", { get: function () {
        return this.cell.biasInitializer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "unitForgetBias", { get: function () {
        return this.cell.unitForgetBias;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelRegularizer", { get: function () {
        return this.cell.kernelRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentRegularizer", { get: function () {
        return this.cell.recurrentRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasRegularizer", { get: function () {
        return this.cell.biasRegularizer;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "kernelConstraint", { get: function () {
        return this.cell.kernelConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentConstraint", { get: function () {
        return this.cell.recurrentConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "biasConstraint", { get: function () {
        return this.cell.biasConstraint;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "dropout", { get: function () {
        return this.cell.dropout;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "recurrentDropout", { get: function () {
        return this.cell.recurrentDropout;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "implementation", { get: function () {
        return this.cell.implementation;
      }, enumerable: !0, configurable: !0 }), t.prototype.getConfig = function () {
      var t = { units: this.units, activation: serializeActivation(this.activation), recurrentActivation: serializeActivation(this.recurrentActivation), useBias: this.useBias, kernelInitializer: serializeInitializer(this.kernelInitializer), recurrentInitializer: serializeInitializer(this.recurrentInitializer), biasInitializer: serializeInitializer(this.biasInitializer), unitForgetBias: this.unitForgetBias, kernelRegularizer: serializeRegularizer(this.kernelRegularizer), recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer), biasRegularizer: serializeRegularizer(this.biasRegularizer), activityRegularizer: serializeRegularizer(this.activityRegularizer), kernelConstraint: serializeConstraint(this.kernelConstraint), recurrentConstraint: serializeConstraint(this.recurrentConstraint), biasConstraint: serializeConstraint(this.biasConstraint), dropout: this.dropout, recurrentDropout: this.recurrentDropout, implementation: this.implementation },
          n = e.prototype.getConfig.call(this);return delete n.cell, Object.assign(t, n), t;
    }, t.fromConfig = function (e, t) {
      return 0 === t.implmentation && (t.implementation = 1), new e(t);
    }, t.className = "LSTM", t;
  }(RNN);serialization.SerializationMap.register(LSTM);var StackedRNNCells = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.cells = t.cells, n;
    }return __extends$1(t, e), Object.defineProperty(t.prototype, "stateSize", { get: function () {
        for (var e = [], t = 0, n = this.cells.slice().reverse(); t < n.length; t++) {
          var r = n[t];Array.isArray(r.stateSize) ? e.push.apply(e, r.stateSize) : e.push(r.stateSize);
        }return e;
      }, enumerable: !0, configurable: !0 }), t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        for (var r = (e = e).slice(1), i = [], a = 0, o = n.cells.slice().reverse(); a < o.length; a++) {
          var s = o[a];Array.isArray(s.stateSize) ? i.push(r.splice(0, s.stateSize.length)) : i.push(r.splice(0, 1));
        }i.reverse();for (var l, u = [], c = 0; c < n.cells.length; ++c) {
          s = n.cells[c];r = i[c], l = 0 === c ? [e[0]].concat(r) : [l[0]].concat(r), l = s.call(l, t), u.push(l.slice(1));
        }r = [];for (var p = 0, h = u.slice().reverse(); p < h.length; p++) {
          var d = h[p];r.push.apply(r, d);
        }return [l[0]].concat(r);
      });
    }, t.prototype.build = function (e) {
      var t;isArrayOfShapes(e) && (e = e[0]), e = e;for (var n = 0, r = this.cells; n < r.length; n++) {
        var i = r[n];i.build(e), t = Array.isArray(i.stateSize) ? i.stateSize[0] : i.stateSize, e = [e[0], t];
      }this.built = !0;
    }, t.prototype.getConfig = function () {
      for (var t = [], n = 0, r = this.cells; n < r.length; n++) {
        var i = r[n];t.push({ className: this.getClassName(), config: i.getConfig() });
      }var a = { cells: t },
          o = e.prototype.getConfig.call(this);return Object.assign(a, o), a;
    }, t.fromConfig = function (e, t, n) {
      void 0 === n && (n = {});for (var r = [], i = 0, a = t.cells; i < a.length; i++) {
        var o = a[i];r.push(deserialize(o, n));
      }return new e({ cells: r });
    }, Object.defineProperty(t.prototype, "trainableWeights", { get: function () {
        if (!this.trainable) return [];for (var e = [], t = 0, n = this.cells; t < n.length; t++) {
          var r = n[t];e.push.apply(e, r.trainableWeights);
        }return e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "nonTrainableWeights", { get: function () {
        for (var e = [], t = 0, n = this.cells; t < n.length; t++) {
          var r = n[t];e.push.apply(e, r.nonTrainableWeights);
        }if (!this.trainable) {
          for (var i = [], a = 0, o = this.cells; a < o.length; a++) {
            r = o[a];i.push.apply(i, r.trainableWeights);
          }return i.concat(e);
        }return e;
      }, enumerable: !0, configurable: !0 }), t.prototype.getWeights = function () {
      for (var e = [], t = 0, n = this.cells; t < n.length; t++) {
        var r = n[t];e.push.apply(e, r.weights);
      }return batchGetValue(e);
    }, t.prototype.setWeights = function (e) {
      for (var t = [], n = 0, r = this.cells; n < r.length; n++) for (var i = r[n], a = i.weights.length, o = e.splice(a), s = 0; s < i.weights.length; ++s) t.push([i.weights[s], o[s]]);batchSetValue(t);
    }, t.className = "StackedRNNCells", t;
  }(RNNCell);serialization.SerializationMap.register(StackedRNNCells);var Wrapper = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.layer = t.layer, n;
    }return __extends$1(t, e), t.prototype.build = function (e) {
      this.built = !0;
    }, Object.defineProperty(t.prototype, "trainable", { get: function () {
        return null != this.layer && this.layer.trainable;
      }, set: function (e) {
        null != this.layer && (this.layer.trainable = e);
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "trainableWeights", { get: function () {
        return this.layer.trainableWeights;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "nonTrainableWeights", { get: function () {
        return this.layer.nonTrainableWeights;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "updates", { get: function () {
        return this.layer._updates;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "losses", { get: function () {
        return this.layer.losses;
      }, enumerable: !0, configurable: !0 }), t.prototype.getWeights = function () {
      return this.layer.getWeights();
    }, t.prototype.setWeights = function (e) {
      this.layer.setWeights(e);
    }, t.prototype.getConfig = function () {
      var t = { layer: { className: this.layer.getClassName(), config: this.layer.getConfig() } },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.fromConfig = function (e, t, n) {
      void 0 === n && (n = {});var r = deserialize(t.layer, n);delete t.layer;var i = { layer: r };return Object.assign(i, t), new e(i);
    }, t;
  }(Layer),
      TimeDistributed = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;return n.supportsMasking = !0, n;
    }return __extends$1(t, e), t.prototype.build = function (t) {
      if ((t = getExactlyOneShape(t)).length < 3) throw new ValueError("TimeDistributed layer expects an input shape >= 3D, but received input shape " + JSON.stringify(t));this.inputSpec = [{ shape: t }];var n = [t[0]].concat(t.slice(2));this.layer.built || (this.layer.build(n), this.layer.built = !0), e.prototype.build.call(this, t);
    }, t.prototype.computeOutputShape = function (e) {
      var t = [(e = getExactlyOneShape(e))[0]].concat(e.slice(2)),
          n = this.layer.computeOutputShape(t),
          r = e[1];return [n[0], r].concat(n.slice(1));
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        return rnn(function (e, r) {
          return [n.layer.call(e, t), []];
        }, e = getExactlyOneTensor(e), [], !1, null, null, !1, e.shape[1])[1];
      });
    }, t.className = "TimeDistributed", t;
  }(Wrapper);serialization.SerializationMap.register(TimeDistributed);var VALID_BIDIRECTIONAL_MERGE_MODES = ["sum", "mul", "concat", "ave"];function checkBidirectionalMergeMode(e) {
    checkStringTypeUnionValue(VALID_BIDIRECTIONAL_MERGE_MODES, "BidirectionalMergeMode", e);
  }var Bidirectional = function (e) {
    function t(t) {
      var n = e.call(this, t) || this,
          r = t.layer.getConfig();if (n.forwardLayer = deserialize({ className: t.layer.getClassName(), config: r }), r.goBackwards = !0 !== r.goBackwards, n.backwardLayer = deserialize({ className: t.layer.getClassName(), config: r }), n.forwardLayer.name = "forward_" + n.forwardLayer.name, n.backwardLayer.name = "backward_" + n.backwardLayer.name, checkBidirectionalMergeMode(t.mergeMode), n.mergeMode = t.mergeMode, t.weights) throw new NotImplementedError("weights support is not implemented for Bidirectional layer yet.");return n._stateful = t.layer.stateful, n.returnSequences = t.layer.returnSequences, n.returnState = t.layer.returnState, n.supportsMasking = !0, n._trainable = !0, n.inputSpec = t.layer.inputSpec, n;
    }return __extends$1(t, e), Object.defineProperty(t.prototype, "trainable", { get: function () {
        return this._trainable;
      }, set: function (e) {
        this._trainable = e, null != this.forwardLayer && (this.forwardLayer.trainable = e), null != this.backwardLayer && (this.backwardLayer.trainable = e);
      }, enumerable: !0, configurable: !0 }), t.prototype.getWeights = function () {
      return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights());
    }, t.prototype.setWeights = function (e) {
      var t = e.length,
          n = Math.floor(t / 2);this.forwardLayer.setWeights(e.slice(0, n)), this.backwardLayer.setWeights(e.slice(n));
    }, t.prototype.computeOutputShape = function (e) {
      var t,
          n,
          r,
          i = this.forwardLayer.computeOutputShape(e);return Array.isArray(i) && Array.isArray(i[0]) || (i = [i]), i = i, this.returnState ? (r = i.slice(1), t = i[0]) : t = i[0], t = t, "concat" === this.mergeMode ? (t[t.length - 1] *= 2, n = [t]) : n = null == this.mergeMode ? [t, t.slice()] : [t], this.returnState ? null == this.mergeMode ? n.concat(r).concat(r.slice()) : [t].concat(r).concat(r.slice()) : singletonOrArray(n);
    }, t.prototype.apply = function (t, n) {
      var r = null;if (null != n && (r = n.initialState), Array.isArray(t) && (r = t.slice(1), t = t[0]), null == r || 0 === r.length) return e.prototype.apply.call(this, t, n);throw new NotImplementedError("The support for initial states is not implemented for Bidirectional layers yet.");
    }, t.prototype.call = function (e, t) {
      var n = this;return tidy(function () {
        if (null != t.mask) throw new NotImplementedError("The support for masking is not implemented for Bidirectional layers yet.");if (null != t.initialState) throw new NotImplementedError("The support for initial states is not implemented for Bidirectional layers yet.");var r,
            i,
            a = n.forwardLayer.call(e, t),
            o = n.backwardLayer.call(e, t);return n.returnState && (Array.isArray(a) && (r = a.slice(1).concat(o.slice(1))), a = a[0], o = o[0]), n.returnSequences && (o = reverse(o, 1)), "concat" === n.mergeMode ? i = concatenate([a, o]) : "sum" === n.mergeMode ? i = add(a, o) : "ave" === n.mergeMode ? i = mul(getScalar(.5), add(a, o)) : "mul" === n.mergeMode ? i = mul(a, o) : null == n.mergeMode && (i = [a, o]), n.returnState ? null == n.mergeMode ? i.concat(r) : [i].concat(r) : i;
      });
    }, t.prototype.resetStates = function (e) {
      this.forwardLayer.resetStates(), this.backwardLayer.resetStates();
    }, t.prototype.build = function (e) {
      var t = this;nameScope(this.forwardLayer.name, function () {
        t.forwardLayer.build(e);
      }), nameScope(this.backwardLayer.name, function () {
        t.backwardLayer.build(e);
      }), this.built = !0;
    }, Object.defineProperty(t.prototype, "trainableWeights", { get: function () {
        return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights);
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "nonTrainableWeights", { get: function () {
        return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights);
      }, enumerable: !0, configurable: !0 }), t.prototype.getConfig = function () {
      var t = { mergeMode: this.mergeMode },
          n = e.prototype.getConfig.call(this);return Object.assign(t, n), t;
    }, t.fromConfig = function (e, t) {
      var n = deserialize(t.layer);if (delete t.layer, null != t.numConstants) throw new NotImplementedError("Deserialization of a Bidirectional layer with numConstants present is not supported yet.");var r = t;return r.layer = n, new e(r);
    }, t.className = "Bidirectional", t;
  }(Wrapper);function loadModelInternal(e) {
    return __awaiter$1(this, void 0, void 0, function () {
      var t;return __generator$1(this, function (n) {
        if ("string" == typeof e) {
          if (0 === (t = io.getLoadHandlers(e)).length) t.push(io.browserHTTPRequest(e));else if (t.length > 1) throw new ValueError("Found more than one (" + t.length + ") load handlers for URL '" + e + "'");e = t[0];
        }return [2, loadModelFromIOHandler(e)];
      });
    });
  }function loadModelFromIOHandler(e, t) {
    return __awaiter$1(this, void 0, void 0, function () {
      var n, r, i, a, o;return __generator$1(this, function (s) {
        switch (s.label) {case 0:
            if (null == e.load) throw new ValueError("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");return [4, e.load()];case 1:
            if (n = s.sent(), null != (r = n.modelTopology).model_config && (r = r.model_config), i = deserialize(convertPythonicToTs(r), t), null != n.weightData) {
              if (null == n.weightSpecs) throw new ValueError("Model artifacts contains weight data, but not weight specs. Therefore loading of weights cannot proceed.");a = !1, o = !0, i.loadWeights(io.decodeWeights(n.weightData, n.weightSpecs), a, o);
            }return [2, i];}
      });
    });
  }serialization.SerializationMap.register(Bidirectional);var Sequential = function (e) {
    function t(t) {
      var n = e.call(this, { inputs: [], outputs: [] }) || this;if (t = t || {}, n.trainable = !0, n._updatable = !0, n.built = !1, n.name = null != t.name ? t.name : getUid("sequential_"), null != t.layers) for (var r = 0, i = t.layers; r < i.length; r++) {
        var a = i[r];n.add(a);
      }return n;
    }return __extends$1(t, e), n = t, t.prototype.add = function (e) {
      var t,
          r = e instanceof n || e instanceof Model;if (r) {
        if (1 !== (t = e).outputs.length) throw new ValueError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");if (1 !== t.inputs.length) throw new ValueError("All layers in a Sequential model should have a single input tensor. For multi-input layers, use the functional API.");
      }if (0 === this.outputs.length) {
        if (0 === e.inboundNodes.length) {
          if (null == e.batchInputShape) throw new ValueError("The first layer in a Sequential model must get an `inputShape` or `batchInputShape` argument.");var i = Input({ batchShape: e.batchInputShape, dtype: e.dtype, name: e.name + "_input" });e.apply(i);
        }if (r) this.outputs = t.outputs, this.inputs = t.inputs;else {
          if (1 !== e.inboundNodes.length) throw new ValueError("A layer added to a Sequential model must not already be connected somewhere else. Model received layer " + e.name + " which has " + e.inboundNodes.length + " pre-existing inbound connections.");if (1 !== e.inboundNodes[0].outputTensors.length) throw new ValueError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");this.outputs = [e.inboundNodes[0].outputTensors[0]], this.inputs = getSourceInputs(this.outputs[0]);
        }this.inboundNodes = [], new Node({ outboundLayer: this, inboundLayers: [], nodeIndices: [], tensorIndices: [], inputTensors: this.inputs, outputTensors: this.outputs, inputMasks: pyListRepeat(null, this.inputs.length), outputMasks: [null], inputShapes: this.inputs.map(function (e) {
            return e.shape;
          }), outputShapes: this.outputs[0].shape });
      } else {
        var a = e.apply(this.outputs[0]);if (Array.isArray(a)) throw new TypeError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");this.outputs = [a], this.inboundNodes[0].outputTensors = this.outputs, this.inboundNodes[0].outputShapes = [this.outputs[0].shape];
      }this.layers.push(e), this.built = !1;
    }, t.prototype.pop = function () {
      if (0 === this.layers.length) throw new TypeError("There are no layers in the model.");if (this.layers.pop(), 0 === this.layers.length) this.outputs = [], this.inboundNodes = [], this.outboundNodes = [];else {
        var e = this.layers.length - 1;this.layers[e].outboundNodes = [], this.outputs = [this.layers[e].output], this.inboundNodes[0].outputTensors = this.outputs, this.inboundNodes[0].outputShapes = [this.outputs[0].shape];
      }
    }, t.prototype.call = function (e, t) {
      return null == this.model && this.build(), this.model.call(e, t);
    }, t.prototype.build = function (e) {
      if (getExactlyOneShape(e), 0 === this.inputs.length || 0 === this.outputs.length) throw new TypeError("Sequential model cannot be built: model is empty. Add some layers first.");this.model = new Model({ inputs: this.inputs, outputs: this.outputs[0], name: this.name + "_model" }), this.model.trainable = this.trainable, this.model.updatable = this.updatable, this.supportsMasking = this.model.supportsMasking, this.inputLayers = this.model.inputLayers, this.inputLayersNodeIndices = this.model.inputLayersNodeIndices, this.inputLayersTensorIndices = this.model.inputLayersTensorIndices, this.outputLayers = this.model.outputLayers, this.outputLayersNodeIndices = this.model.outputLayersNodeIndices, this.outputLayersTensorIndices = this.model.outputLayersTensorIndices, this.nodesByDepth = this.model.nodesByDepth, this.containerNodes = this.model.containerNodes, this.outputNames = this.model.outputNames, this.inputNames = this.model.inputNames, this.built = !0;
    }, t.prototype.countParams = function () {
      return this.built || this.build(), e.prototype.countParams.call(this);
    }, t.prototype.summary = function (t, n, r) {
      void 0 === r && (r = console.log), this.built || this.build(), e.prototype.summary.call(this, t, n, r);
    }, t.prototype.setWeights = function (e) {
      null == this.model && this.build(), this.model.setWeights(e);
    }, Object.defineProperty(t.prototype, "updatable", { get: function () {
        return this._updatable;
      }, set: function (e) {
        this.built && (this.model.updatable = e), this._updatable = e;
      }, enumerable: !0, configurable: !0 }), t.prototype.evaluate = function (e, t, n) {
      if (void 0 === n && (n = {}), !this.built) throw new RuntimeError("The model needs to be compiled before being used.");return this.model.evaluate(e, t, n);
    }, t.prototype.predict = function (e, t) {
      return void 0 === t && (t = {}), null == this.model && this.build(), this.model.predict(e, t);
    }, t.prototype.predictOnBatch = function (e) {
      return null == this.model && this.build(), this.model.predictOnBatch(e);
    }, t.prototype.compile = function (e) {
      this.build(), this.model.compile(e), this.optimizer = this.model.optimizer, this.loss = this.model.loss, this.metrics = this.model.metrics, this.metricsTensors = this.model.metricsTensors, this.metricsNames = this.model.metricsNames;
    }, t.prototype.fit = function (e, t, n) {
      return void 0 === n && (n = {}), __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (r) {
          if (!this.built) throw new RuntimeError("The model needs to be compiled before being used.");return [2, this.model.fit(e, t, n)];
        });
      });
    }, t.fromConfig = function (e, t) {
      var r = new e({});if (!(r instanceof n)) throw new ValueError("Sequential.fromConfig called on non-Sequential input: " + r);if (!(t instanceof Array)) throw new ValueError("Sequential.fromConfig called without an array of configs");if (null == t[0].className || "Merge" === t[0].className) throw new ValueError("Legacy serialization format not supported yet.");for (var i = 0, a = t; i < a.length; i++) {
        var o = deserialize(a[i]);r.add(o);
      }return r;
    }, t.prototype.getConfig = function () {
      for (var e = [], t = 0, n = this.layers; t < n.length; t++) {
        var r = n[t];e.push({ className: r.getClassName(), config: r.getConfig() });
      }return e;
    }, t.className = "Sequential", __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t.prototype, "add", null), __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t.prototype, "summary", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [2] })], t.prototype, "evaluate", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [1] })], t.prototype, "predict", null), __decorate$1([doc({ heading: "Models", subheading: "Classes", configParamIndices: [2] })], t.prototype, "fit", null), t = n = __decorate$1([doc({ heading: "Models", subheading: "Classes" })], t);var n;
  }(Model);serialization.SerializationMap.register(Sequential);var ModelExports = function () {
    function e() {}return e.model = function (e) {
      return new Model(e);
    }, e.sequential = function (e) {
      return new Sequential(e);
    }, e.loadModel = function (e) {
      return loadModelInternal(e);
    }, e.input = function (e) {
      return Input(e);
    }, __decorate$1([doc({ heading: "Models", subheading: "Creation", configParamIndices: [0] })], e, "model", null), __decorate$1([doc({ heading: "Models", subheading: "Creation", configParamIndices: [0] })], e, "sequential", null), __decorate$1([doc({ heading: "Models", subheading: "Loading", useDocsFrom: "loadModelInternal" })], e, "loadModel", null), __decorate$1([doc({ heading: "Models", subheading: "Inputs", useDocsFrom: "Input", configParamIndices: [0] })], e, "input", null), e;
  }(),
      LayerExports = function () {
    function e() {}return e.inputLayer = function (e) {
      return new InputLayer(e);
    }, e.elu = function (e) {
      return new ELU$1(e);
    }, e.leakyReLU = function (e) {
      return new LeakyReLU(e);
    }, e.softmax = function (e) {
      return new Softmax$1(e);
    }, e.thresholdedReLU = function (e) {
      return new ThresholdedReLU(e);
    }, e.conv1d = function (e) {
      return new Conv1D(e);
    }, e.conv2d = function (e) {
      return new Conv2D(e);
    }, e.conv2dTranspose = function (e) {
      return new Conv2DTranspose(e);
    }, e.separableConv2d = function (e) {
      return new SeparableConv2D(e);
    }, e.cropping2D = function (e) {
      return new Cropping2D(e);
    }, e.upSampling2d = function (e) {
      return new UpSampling2D(e);
    }, e.depthwiseConv2d = function (e) {
      return new DepthwiseConv2D(e);
    }, e.activation = function (e) {
      return new Activation$1(e);
    }, e.dense = function (e) {
      return new Dense(e);
    }, e.dropout = function (e) {
      return new Dropout(e);
    }, e.flatten = function (e) {
      return new Flatten(e);
    }, e.repeatVector = function (e) {
      return new RepeatVector(e);
    }, e.reshape = function (e) {
      return new Reshape(e);
    }, e.embedding = function (e) {
      return new Embedding(e);
    }, e.add = function (e) {
      return new Add(e);
    }, e.average = function (e) {
      return new Average(e);
    }, e.concatenate = function (e) {
      return new Concatenate(e);
    }, e.maximum = function (e) {
      return new Maximum(e);
    }, e.minimum = function (e) {
      return new Minimum(e);
    }, e.multiply = function (e) {
      return new Multiply(e);
    }, e.batchNormalization = function (e) {
      return new BatchNormalization(e);
    }, e.zeroPadding2d = function (e) {
      return new ZeroPadding2D(e);
    }, e.averagePooling1d = function (e) {
      return new AveragePooling1D(e);
    }, e.avgPool1d = function (t) {
      return e.averagePooling1d(t);
    }, e.avgPooling1d = function (t) {
      return e.averagePooling1d(t);
    }, e.averagePooling2d = function (e) {
      return new AveragePooling2D(e);
    }, e.avgPool2d = function (t) {
      return e.averagePooling2d(t);
    }, e.avgPooling2d = function (t) {
      return e.averagePooling2d(t);
    }, e.globalAveragePooling1d = function (e) {
      return new GlobalAveragePooling1D(e);
    }, e.globalAveragePooling2d = function (e) {
      return new GlobalAveragePooling2D(e);
    }, e.globalMaxPooling1d = function (e) {
      return new GlobalMaxPooling1D(e);
    }, e.globalMaxPooling2d = function (e) {
      return new GlobalMaxPooling2D(e);
    }, e.maxPooling1d = function (e) {
      return new MaxPooling1D(e);
    }, e.maxPooling2d = function (e) {
      return new MaxPooling2D(e);
    }, e.gru = function (e) {
      return new GRU(e);
    }, e.gruCell = function (e) {
      return new GRUCell(e);
    }, e.lstm = function (e) {
      return new LSTM(e);
    }, e.lstmCell = function (e) {
      return new LSTMCell(e);
    }, e.simpleRNN = function (e) {
      return new SimpleRNN(e);
    }, e.simpleRNNCell = function (e) {
      return new SimpleRNNCell(e);
    }, e.rnn = function (e) {
      return new RNN(e);
    }, e.stackedRNNCells = function (e) {
      return new StackedRNNCells(e);
    }, e.bidirectional = function (e) {
      return new Bidirectional(e);
    }, e.timeDistributed = function (e) {
      return new TimeDistributed(e);
    }, e.Layer = Layer, e.RNN = RNN, e.RNNCell = RNNCell, e.input = ModelExports.input, __decorate$1([doc({ heading: "Layers", subheading: "Inputs", namespace: "layers", useDocsFrom: "InputLayer", configParamIndices: [0] })], e, "inputLayer", null), __decorate$1([doc({ heading: "Layers", subheading: "Advanced Activation", namespace: "layers", useDocsFrom: "ELU", configParamIndices: [0] })], e, "elu", null), __decorate$1([doc({ heading: "Layers", subheading: "Advanced Activation", namespace: "layers", useDocsFrom: "LeakyReLU", configParamIndices: [0] })], e, "leakyReLU", null), __decorate$1([doc({ heading: "Layers", subheading: "Advanced Activation", namespace: "layers", useDocsFrom: "Softmax", configParamIndices: [0] })], e, "softmax", null), __decorate$1([doc({ heading: "Layers", subheading: "Advanced Activation", namespace: "layers", useDocsFrom: "ThresholdedReLU", configParamIndices: [0] })], e, "thresholdedReLU", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "Conv1D", configParamIndices: [0] })], e, "conv1d", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "Conv2D", configParamIndices: [0] })], e, "conv2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "Conv2DTranspose", configParamIndices: [0] })], e, "conv2dTranspose", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "SeparableConv2D", configParamIndices: [0] })], e, "separableConv2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "Cropping2D", configParamIndices: [0] })], e, "cropping2D", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "UpSampling2D", configParamIndices: [0] })], e, "upSampling2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Convolutional", namespace: "layers", useDocsFrom: "DepthwiseConv2D", configParamIndices: [0] })], e, "depthwiseConv2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "Activation", configParamIndices: [0] })], e, "activation", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "Dense", configParamIndices: [0] })], e, "dense", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "Dropout", configParamIndices: [0] })], e, "dropout", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "Flatten", configParamIndices: [0] })], e, "flatten", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "RepeatVector", configParamIndices: [0] })], e, "repeatVector", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "Reshape", configParamIndices: [0] })], e, "reshape", null), __decorate$1([doc({ heading: "Layers", subheading: "Basic", namespace: "layers", useDocsFrom: "Embedding", configParamIndices: [0] })], e, "embedding", null), __decorate$1([doc({ heading: "Layers", subheading: "Merge", namespace: "layers", useDocsFrom: "Add", configParamIndices: [0] })], e, "add", null), __decorate$1([doc({ heading: "Layers", subheading: "Merge", namespace: "layers", useDocsFrom: "Average", configParamIndices: [0] })], e, "average", null), __decorate$1([doc({ heading: "Layers", subheading: "Merge", namespace: "layers", useDocsFrom: "Concatenate", configParamIndices: [0] })], e, "concatenate", null), __decorate$1([doc({ heading: "Layers", subheading: "Merge", namespace: "layers", useDocsFrom: "Maximum", configParamIndices: [0] })], e, "maximum", null), __decorate$1([doc({ heading: "Layers", subheading: "Merge", namespace: "layers", useDocsFrom: "Minimum", configParamIndices: [0] })], e, "minimum", null), __decorate$1([doc({ heading: "Layers", subheading: "Merge", namespace: "layers", useDocsFrom: "Multiply", configParamIndices: [0] })], e, "multiply", null), __decorate$1([doc({ heading: "Layers", subheading: "Normalization", namespace: "layers", useDocsFrom: "BatchNormalization", configParamIndices: [0] })], e, "batchNormalization", null), __decorate$1([doc({ heading: "Layers", subheading: "Padding", namespace: "layers", useDocsFrom: "ZeroPadding2D", configParamIndices: [0] })], e, "zeroPadding2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "AveragePooling1D", configParamIndices: [0] })], e, "averagePooling1d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "AveragePooling2D", configParamIndices: [0] })], e, "averagePooling2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "GlobalAveragePooling1D", configParamIndices: [0] })], e, "globalAveragePooling1d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "GlobalAveragePooling2D", configParamIndices: [0] })], e, "globalAveragePooling2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "GlobalMaxPooling1D", configParamIndices: [0] })], e, "globalMaxPooling1d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "GlobalMaxPooling2D", configParamIndices: [0] })], e, "globalMaxPooling2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "MaxPooling1D", configParamIndices: [0] })], e, "maxPooling1d", null), __decorate$1([doc({ heading: "Layers", subheading: "Pooling", namespace: "layers", useDocsFrom: "MaxPooling2D", configParamIndices: [0] })], e, "maxPooling2d", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "GRU", configParamIndices: [0] })], e, "gru", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "GRUCell", configParamIndices: [0] })], e, "gruCell", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "LSTM", configParamIndices: [0] })], e, "lstm", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "LSTMCell", configParamIndices: [0] })], e, "lstmCell", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "SimpleRNN", configParamIndices: [0] })], e, "simpleRNN", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "SimpleRNNCell", configParamIndices: [0] })], e, "simpleRNNCell", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "RNN", configParamIndices: [0] })], e, "rnn", null), __decorate$1([doc({ heading: "Layers", subheading: "Recurrent", namespace: "layers", useDocsFrom: "RNN", configParamIndices: [0] })], e, "stackedRNNCells", null), __decorate$1([doc({ heading: "Layers", subheading: "Wrapper", namespace: "layers", useDocsFrom: "Bidirectional", configParamIndices: [0] })], e, "bidirectional", null), __decorate$1([doc({ heading: "Layers", subheading: "Wrapper", namespace: "layers", useDocsFrom: "TimeDistributed", configParamIndices: [0] })], e, "timeDistributed", null), e;
  }(),
      ConstraintExports = function () {
    function e() {}return e.maxNorm = function (e) {
      return new MaxNorm(e);
    }, e.unitNorm = function (e) {
      return new UnitNorm(e);
    }, e.nonNeg = function () {
      return new NonNeg();
    }, e.minMaxNorm = function (e) {
      return new MinMaxNorm(e);
    }, __decorate$1([doc({ heading: "Constraints", namespace: "constraints", useDocsFrom: "MaxNorm", configParamIndices: [0] })], e, "maxNorm", null), __decorate$1([doc({ heading: "Constraints", namespace: "constraints", useDocsFrom: "UnitNorm", configParamIndices: [0] })], e, "unitNorm", null), __decorate$1([doc({ heading: "Constraints", namespace: "constraints", useDocsFrom: "NonNeg" })], e, "nonNeg", null), __decorate$1([doc({ heading: "Constraints", namespace: "constraints", useDocsFrom: "MinMaxNormConfig", configParamIndices: [0] })], e, "minMaxNorm", null), e;
  }(),
      InitializerExports = function () {
    function e() {}return e.zeros = function () {
      return new Zeros();
    }, e.ones = function () {
      return new Ones();
    }, e.constant = function (e) {
      return new Constant(e);
    }, e.randomUniform = function (e) {
      return new RandomUniform(e);
    }, e.randomNormal = function (e) {
      return new RandomNormal(e);
    }, e.truncatedNormal = function (e) {
      return new TruncatedNormal(e);
    }, e.identity = function (e) {
      return new Identity(e);
    }, e.varianceScaling = function (e) {
      return new VarianceScaling(e);
    }, e.glorotUniform = function (e) {
      return new GlorotUniform(e);
    }, e.glorotNormal = function (e) {
      return new GlorotNormal(e);
    }, e.heNormal = function (e) {
      return new HeNormal(e);
    }, e.leCunNormal = function (e) {
      return new LeCunNormal(e);
    }, e.orthogonal = function (e) {
      return new Orthogonal(e);
    }, __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "Zeros" })], e, "zeros", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "Ones" })], e, "ones", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "Constant", configParamIndices: [0] })], e, "constant", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "RandomUniform", configParamIndices: [0] })], e, "randomUniform", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "RandomNormal", configParamIndices: [0] })], e, "randomNormal", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "TruncatedNormal", configParamIndices: [0] })], e, "truncatedNormal", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "Identity", configParamIndices: [0] })], e, "identity", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "VarianceScaling", configParamIndices: [0] })], e, "varianceScaling", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "GlorotUniform", configParamIndices: [0] })], e, "glorotUniform", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "GlorotNormal", configParamIndices: [0] })], e, "glorotNormal", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "HeNormal", configParamIndices: [0] })], e, "heNormal", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "LeCunNormal", configParamIndices: [0] })], e, "leCunNormal", null), __decorate$1([doc({ heading: "Initializers", namespace: "initializers", useDocsFrom: "Orthogonal", configParamIndices: [0] })], e, "orthogonal", null), e;
  }(),
      MetricExports = function () {
    function e() {}return e.binaryAccuracy = function (e, t) {
      return binaryAccuracy(e, t);
    }, e.binaryCrossentropy = function (e, t) {
      return binaryCrossentropy$1(e, t);
    }, e.categoricalAccuracy = function (e, t) {
      return categoricalAccuracy(e, t);
    }, e.categoricalCrossentropy = function (e, t) {
      return categoricalCrossentropy(e, t);
    }, e.cosineProximity = function (e, t) {
      return cosineProximity(e, t);
    }, e.prototype.meanAbsoluteError = function (e, t) {
      return meanAbsoluteError(e, t);
    }, e.prototype.meanAbsolutePercentageError = function (e, t) {
      return meanAbsolutePercentageError(e, t);
    }, e.prototype.MAPE = function (e, t) {
      return meanAbsolutePercentageError(e, t);
    }, e.prototype.mape = function (e, t) {
      return meanAbsolutePercentageError(e, t);
    }, e.meanSquaredError = function (e, t) {
      return meanSquaredError$1(e, t);
    }, e.MSE = function (e, t) {
      return meanSquaredError$1(e, t);
    }, e.mse = function (e, t) {
      return meanSquaredError$1(e, t);
    }, __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "meanAbsoluteError" })], e.prototype, "meanAbsoluteError", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "meanAbsolutePercentageError" })], e.prototype, "meanAbsolutePercentageError", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "binaryAccuracy" })], e, "binaryAccuracy", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "binaryCrossentropy" })], e, "binaryCrossentropy", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "categoricalAccuracy" })], e, "categoricalAccuracy", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "categoricalCrossentropy" })], e, "categoricalCrossentropy", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "cosineProximity" })], e, "cosineProximity", null), __decorate$1([doc({ heading: "Metrics", namespace: "metrics", useDocsFrom: "meanSquaredError" })], e, "meanSquaredError", null), e;
  }(),
      RegularizerExports = function () {
    function e() {}return e.l1l2 = function (e) {
      return new L1L2(e);
    }, e.l1 = function (e) {
      return l1(e);
    }, e.l2 = function (e) {
      return l2(e);
    }, __decorate$1([doc({ heading: "Regularizers", namespace: "regularizers", useDocsFrom: "L1L2", configParamIndices: [0] })], e, "l1l2", null), __decorate$1([doc({ heading: "Regularizers", namespace: "regularizers", useDocsFrom: "L1L2", configParamIndices: [0] })], e, "l1", null), __decorate$1([doc({ heading: "Regularizers", namespace: "regularizers", useDocsFrom: "L1L2", configParamIndices: [0] })], e, "l2", null), e;
  }(),
      Callback = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;return t.model = null, t;
    }return __extends$1(t, e), t.prototype.setModel = function (e) {
      if (!(e instanceof Model)) throw new Error("model must be a Model, not some other Container");this.model = e;
    }, t;
  }(BaseCallback),
      model = ModelExports.model,
      sequential = ModelExports.sequential,
      loadModel = ModelExports.loadModel,
      input = ModelExports.input,
      layers = LayerExports,
      constraints = ConstraintExports,
      initializers = InitializerExports,
      metrics = MetricExports,
      regularizers = RegularizerExports;

  /**
   * @license
   * Copyright 2018 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   */
  var __assign$2 = Object.assign || function (e) {
    for (var t, a = 1, r = arguments.length; a < r; a++) for (var n in t = arguments[a]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);return e;
  };function __awaiter$2(e, t, a, r) {
    return new (a || (a = Promise))(function (n, o) {
      function i(e) {
        try {
          p(r.next(e));
        } catch (e) {
          o(e);
        }
      }function s(e) {
        try {
          p(r.throw(e));
        } catch (e) {
          o(e);
        }
      }function p(e) {
        e.done ? n(e.value) : new a(function (t) {
          t(e.value);
        }).then(i, s);
      }p((r = r.apply(e, t || [])).next());
    });
  }function __generator$2(e, t) {
    var a,
        r,
        n,
        o,
        i = { label: 0, sent: function () {
        if (1 & n[0]) throw n[1];return n[1];
      }, trys: [], ops: [] };return o = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
      return this;
    }), o;function s(o) {
      return function (s) {
        return function (o) {
          if (a) throw new TypeError("Generator is already executing.");for (; i;) try {
            if (a = 1, r && (n = r[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(n = n.call(r, o[1])).done) return n;switch (r = 0, n && (o = [0, n.value]), o[0]) {case 0:case 1:
                n = o;break;case 4:
                return i.label++, { value: o[1], done: !1 };case 5:
                i.label++, r = o[1], o = [0];continue;case 7:
                o = i.ops.pop(), i.trys.pop();continue;default:
                if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                  i = 0;continue;
                }if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                  i.label = o[1];break;
                }if (6 === o[0] && i.label < n[1]) {
                  i.label = n[1], n = o;break;
                }if (n && i.label < n[2]) {
                  i.label = n[2], i.ops.push(o);break;
                }n[2] && i.ops.pop(), i.trys.pop();continue;}o = t.call(e, i);
          } catch (e) {
            o = [6, e], r = 0;
          } finally {
            a = n = 0;
          }if (5 & o[0]) throw o[1];return { value: o[0] ? o[1] : void 0, done: !0 };
        }([o, s]);
      };
    }
  }var commonjsGlobal$1 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function createCommonjsModule$1(e, t) {
    return e(t = { exports: {} }, t.exports), t.exports;
  }var punycode = createCommonjsModule$1(function (e, t) {
    !function (a) {
      var r = t && !t.nodeType && t,
          n = e && !e.nodeType && e,
          o = "object" == typeof commonjsGlobal$1 && commonjsGlobal$1;o.global !== o && o.window !== o && o.self !== o || (a = o);var i,
          s,
          p = 2147483647,
          u = 36,
          l = 1,
          m = 26,
          d = 38,
          f = 700,
          c = 72,
          h = 128,
          y = "-",
          g = /^xn--/,
          N = /[^\x20-\x7E]/,
          P = /[\x2E\u3002\uFF0E\uFF61]/g,
          b = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
          x = u - l,
          v = Math.floor,
          O = String.fromCharCode;function I(e) {
        throw RangeError(b[e]);
      }function w(e, t) {
        for (var a = e.length, r = []; a--;) r[a] = t(e[a]);return r;
      }function V(e, t) {
        var a = e.split("@"),
            r = "";return a.length > 1 && (r = a[0] + "@", e = a[1]), r + w((e = e.replace(P, ".")).split("."), t).join(".");
      }function k(e) {
        for (var t, a, r = [], n = 0, o = e.length; n < o;) (t = e.charCodeAt(n++)) >= 55296 && t <= 56319 && n < o ? 56320 == (64512 & (a = e.charCodeAt(n++))) ? r.push(((1023 & t) << 10) + (1023 & a) + 65536) : (r.push(t), n--) : r.push(t);return r;
      }function $(e) {
        return w(e, function (e) {
          var t = "";return e > 65535 && (t += O((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += O(e);
        }).join("");
      }function _(e, t) {
        return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
      }function T(e, t, a) {
        var r = 0;for (e = a ? v(e / f) : e >> 1, e += v(e / t); e > x * m >> 1; r += u) e = v(e / x);return v(r + (x + 1) * e / (e + d));
      }function S(e) {
        var t,
            a,
            r,
            n,
            o,
            i,
            s,
            d,
            f,
            g,
            N,
            P = [],
            b = e.length,
            x = 0,
            O = h,
            w = c;for ((a = e.lastIndexOf(y)) < 0 && (a = 0), r = 0; r < a; ++r) e.charCodeAt(r) >= 128 && I("not-basic"), P.push(e.charCodeAt(r));for (n = a > 0 ? a + 1 : 0; n < b;) {
          for (o = x, i = 1, s = u; n >= b && I("invalid-input"), ((d = (N = e.charCodeAt(n++)) - 48 < 10 ? N - 22 : N - 65 < 26 ? N - 65 : N - 97 < 26 ? N - 97 : u) >= u || d > v((p - x) / i)) && I("overflow"), x += d * i, !(d < (f = s <= w ? l : s >= w + m ? m : s - w)); s += u) i > v(p / (g = u - f)) && I("overflow"), i *= g;w = T(x - o, t = P.length + 1, 0 == o), v(x / t) > p - O && I("overflow"), O += v(x / t), x %= t, P.splice(x++, 0, O);
        }return $(P);
      }function A(e) {
        var t,
            a,
            r,
            n,
            o,
            i,
            s,
            d,
            f,
            g,
            N,
            P,
            b,
            x,
            w,
            V = [];for (P = (e = k(e)).length, t = h, a = 0, o = c, i = 0; i < P; ++i) (N = e[i]) < 128 && V.push(O(N));for (r = n = V.length, n && V.push(y); r < P;) {
          for (s = p, i = 0; i < P; ++i) (N = e[i]) >= t && N < s && (s = N);for (s - t > v((p - a) / (b = r + 1)) && I("overflow"), a += (s - t) * b, t = s, i = 0; i < P; ++i) if ((N = e[i]) < t && ++a > p && I("overflow"), N == t) {
            for (d = a, f = u; !(d < (g = f <= o ? l : f >= o + m ? m : f - o)); f += u) w = d - g, x = u - g, V.push(O(_(g + w % x, 0))), d = v(w / x);V.push(O(_(d, 0))), o = T(a, b, r == n), a = 0, ++r;
          }++a, ++t;
        }return V.join("");
      }if (i = { version: "1.3.2", ucs2: { decode: k, encode: $ }, decode: S, encode: A, toASCII: function (e) {
          return V(e, function (e) {
            return N.test(e) ? "xn--" + A(e) : e;
          });
        }, toUnicode: function (e) {
          return V(e, function (e) {
            return g.test(e) ? S(e.slice(4).toLowerCase()) : e;
          });
        } }, r && n) {
        if (e.exports == r) n.exports = i;else for (s in i) i.hasOwnProperty(s) && (r[s] = i[s]);
      } else a.punycode = i;
    }(commonjsGlobal$1);
  }),
      util$1 = { isString: function (e) {
      return "string" == typeof e;
    }, isObject: function (e) {
      return "object" == typeof e && null !== e;
    }, isNull: function (e) {
      return null === e;
    }, isNullOrUndefined: function (e) {
      return null == e;
    } };function hasOwnProperty(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }var decode = function (e, t, a, r) {
    t = t || "&", a = a || "=";var n = {};if ("string" != typeof e || 0 === e.length) return n;var o = /\+/g;e = e.split(t);var i = 1e3;r && "number" == typeof r.maxKeys && (i = r.maxKeys);var s = e.length;i > 0 && s > i && (s = i);for (var p = 0; p < s; ++p) {
      var u,
          l,
          m,
          d,
          f = e[p].replace(o, "%20"),
          c = f.indexOf(a);c >= 0 ? (u = f.substr(0, c), l = f.substr(c + 1)) : (u = f, l = ""), m = decodeURIComponent(u), d = decodeURIComponent(l), hasOwnProperty(n, m) ? Array.isArray(n[m]) ? n[m].push(d) : n[m] = [n[m], d] : n[m] = d;
    }return n;
  },
      stringifyPrimitive = function (e) {
    switch (typeof e) {case "string":
        return e;case "boolean":
        return e ? "true" : "false";case "number":
        return isFinite(e) ? e : "";default:
        return "";}
  },
      encode = function (e, t, a, r) {
    return t = t || "&", a = a || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map(function (r) {
      var n = encodeURIComponent(stringifyPrimitive(r)) + a;return Array.isArray(e[r]) ? e[r].map(function (e) {
        return n + encodeURIComponent(stringifyPrimitive(e));
      }).join(t) : n + encodeURIComponent(stringifyPrimitive(e[r]));
    }).join(t) : r ? encodeURIComponent(stringifyPrimitive(r)) + a + encodeURIComponent(stringifyPrimitive(e)) : "";
  },
      querystring = createCommonjsModule$1(function (e, t) {
    t.decode = t.parse = decode, t.encode = t.stringify = encode;
  }),
      querystring_1 = querystring.decode,
      querystring_2 = querystring.parse,
      querystring_3 = querystring.encode,
      querystring_4 = querystring.stringify,
      parse = urlParse,
      format = urlFormat;function Url() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,
      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
      delims = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
      unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims),
      autoEscape = ["'"].concat(unwise),
      nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape),
      hostEndingChars = ["/", "?", "#"],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      unsafeProtocol = { javascript: !0, "javascript:": !0 },
      hostlessProtocol = { javascript: !0, "javascript:": !0 },
      slashedProtocol = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 };function urlParse(e, t, a) {
    if (e && util$1.isObject(e) && e instanceof Url) return e;var r = new Url();return r.parse(e, t, a), r;
  }function urlFormat(e) {
    return util$1.isString(e) && (e = urlParse(e)), e instanceof Url ? e.format() : Url.prototype.format.call(e);
  }Url.prototype.parse = function (e, t, a) {
    if (!util$1.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);var r = e.indexOf("?"),
        n = -1 !== r && r < e.indexOf("#") ? "?" : "#",
        o = e.split(n);o[0] = o[0].replace(/\\/g, "/");var i = e = o.join(n);if (i = i.trim(), !a && 1 === e.split("#").length) {
      var s = simplePathPattern.exec(i);if (s) return this.path = i, this.href = i, this.pathname = s[1], s[2] ? (this.search = s[2], this.query = t ? querystring.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
    }var p = protocolPattern.exec(i);if (p) {
      var u = (p = p[0]).toLowerCase();this.protocol = u, i = i.substr(p.length);
    }if (a || p || i.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var l = "//" === i.substr(0, 2);!l || p && hostlessProtocol[p] || (i = i.substr(2), this.slashes = !0);
    }if (!hostlessProtocol[p] && (l || p && !slashedProtocol[p])) {
      for (var m, d, f = -1, c = 0; c < hostEndingChars.length; c++) {
        -1 !== (h = i.indexOf(hostEndingChars[c])) && (-1 === f || h < f) && (f = h);
      }-1 !== (d = -1 === f ? i.lastIndexOf("@") : i.lastIndexOf("@", f)) && (m = i.slice(0, d), i = i.slice(d + 1), this.auth = decodeURIComponent(m)), f = -1;for (c = 0; c < nonHostChars.length; c++) {
        var h;-1 !== (h = i.indexOf(nonHostChars[c])) && (-1 === f || h < f) && (f = h);
      }-1 === f && (f = i.length), this.host = i.slice(0, f), i = i.slice(f), this.parseHost(), this.hostname = this.hostname || "";var y = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!y) for (var g = this.hostname.split(/\./), N = (c = 0, g.length); c < N; c++) {
        var P = g[c];if (P && !P.match(hostnamePartPattern)) {
          for (var b = "", x = 0, v = P.length; x < v; x++) P.charCodeAt(x) > 127 ? b += "x" : b += P[x];if (!b.match(hostnamePartPattern)) {
            var O = g.slice(0, c),
                I = g.slice(c + 1),
                w = P.match(hostnamePartStart);w && (O.push(w[1]), I.unshift(w[2])), I.length && (i = "/" + I.join(".") + i), this.hostname = O.join(".");break;
          }
        }
      }this.hostname.length > hostnameMaxLen ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), y || (this.hostname = punycode.toASCII(this.hostname));var V = this.port ? ":" + this.port : "",
          k = this.hostname || "";this.host = k + V, this.href += this.host, y && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== i[0] && (i = "/" + i));
    }if (!unsafeProtocol[u]) for (c = 0, N = autoEscape.length; c < N; c++) {
      var $ = autoEscape[c];if (-1 !== i.indexOf($)) {
        var _ = encodeURIComponent($);_ === $ && (_ = escape($)), i = i.split($).join(_);
      }
    }var T = i.indexOf("#");-1 !== T && (this.hash = i.substr(T), i = i.slice(0, T));var S = i.indexOf("?");if (-1 !== S ? (this.search = i.substr(S), this.query = i.substr(S + 1), t && (this.query = querystring.parse(this.query)), i = i.slice(0, S)) : t && (this.search = "", this.query = {}), i && (this.pathname = i), slashedProtocol[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      V = this.pathname || "";var A = this.search || "";this.path = V + A;
    }return this.href = this.format(), this;
  }, Url.prototype.format = function () {
    var e = this.auth || "";e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");var t = this.protocol || "",
        a = this.pathname || "",
        r = this.hash || "",
        n = !1,
        o = "";this.host ? n = e + this.host : this.hostname && (n = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && util$1.isObject(this.query) && Object.keys(this.query).length && (o = querystring.stringify(this.query));var i = this.search || o && "?" + o || "";return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || slashedProtocol[t]) && !1 !== n ? (n = "//" + (n || ""), a && "/" !== a.charAt(0) && (a = "/" + a)) : n || (n = ""), r && "#" !== r.charAt(0) && (r = "#" + r), i && "?" !== i.charAt(0) && (i = "?" + i), t + n + (a = a.replace(/[?#]/g, function (e) {
      return encodeURIComponent(e);
    })) + (i = i.replace("#", "%23")) + r;
  }, Url.prototype.resolve = function (e) {
    return this.resolveObject(urlParse(e, !1, !0)).format();
  }, Url.prototype.resolveObject = function (e) {
    if (util$1.isString(e)) {
      var t = new Url();t.parse(e, !1, !0), e = t;
    }for (var a = new Url(), r = Object.keys(this), n = 0; n < r.length; n++) {
      var o = r[n];a[o] = this[o];
    }if (a.hash = e.hash, "" === e.href) return a.href = a.format(), a;if (e.slashes && !e.protocol) {
      for (var i = Object.keys(e), s = 0; s < i.length; s++) {
        var p = i[s];"protocol" !== p && (a[p] = e[p]);
      }return slashedProtocol[a.protocol] && a.hostname && !a.pathname && (a.path = a.pathname = "/"), a.href = a.format(), a;
    }if (e.protocol && e.protocol !== a.protocol) {
      if (!slashedProtocol[e.protocol]) {
        for (var u = Object.keys(e), l = 0; l < u.length; l++) {
          var m = u[l];a[m] = e[m];
        }return a.href = a.format(), a;
      }if (a.protocol = e.protocol, e.host || hostlessProtocol[e.protocol]) a.pathname = e.pathname;else {
        for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()););e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), a.pathname = d.join("/");
      }if (a.search = e.search, a.query = e.query, a.host = e.host || "", a.auth = e.auth, a.hostname = e.hostname || e.host, a.port = e.port, a.pathname || a.search) {
        var f = a.pathname || "",
            c = a.search || "";a.path = f + c;
      }return a.slashes = a.slashes || e.slashes, a.href = a.format(), a;
    }var h = a.pathname && "/" === a.pathname.charAt(0),
        y = e.host || e.pathname && "/" === e.pathname.charAt(0),
        g = y || h || a.host && e.pathname,
        N = g,
        P = a.pathname && a.pathname.split("/") || [],
        b = (d = e.pathname && e.pathname.split("/") || [], a.protocol && !slashedProtocol[a.protocol]);if (b && (a.hostname = "", a.port = null, a.host && ("" === P[0] ? P[0] = a.host : P.unshift(a.host)), a.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = null), g = g && ("" === d[0] || "" === P[0])), y) a.host = e.host || "" === e.host ? e.host : a.host, a.hostname = e.hostname || "" === e.hostname ? e.hostname : a.hostname, a.search = e.search, a.query = e.query, P = d;else if (d.length) P || (P = []), P.pop(), P = P.concat(d), a.search = e.search, a.query = e.query;else if (!util$1.isNullOrUndefined(e.search)) {
      if (b) a.hostname = a.host = P.shift(), (w = !!(a.host && a.host.indexOf("@") > 0) && a.host.split("@")) && (a.auth = w.shift(), a.host = a.hostname = w.shift());return a.search = e.search, a.query = e.query, util$1.isNull(a.pathname) && util$1.isNull(a.search) || (a.path = (a.pathname ? a.pathname : "") + (a.search ? a.search : "")), a.href = a.format(), a;
    }if (!P.length) return a.pathname = null, a.search ? a.path = "/" + a.search : a.path = null, a.href = a.format(), a;for (var x = P.slice(-1)[0], v = (a.host || e.host || P.length > 1) && ("." === x || ".." === x) || "" === x, O = 0, I = P.length; I >= 0; I--) "." === (x = P[I]) ? P.splice(I, 1) : ".." === x ? (P.splice(I, 1), O++) : O && (P.splice(I, 1), O--);if (!g && !N) for (; O--; O) P.unshift("..");!g || "" === P[0] || P[0] && "/" === P[0].charAt(0) || P.unshift(""), v && "/" !== P.join("/").substr(-1) && P.push("");var w,
        V = "" === P[0] || P[0] && "/" === P[0].charAt(0);b && (a.hostname = a.host = V ? "" : P.length ? P.shift() : "", (w = !!(a.host && a.host.indexOf("@") > 0) && a.host.split("@")) && (a.auth = w.shift(), a.host = a.hostname = w.shift()));return (g = g || a.host && P.length) && !V && P.unshift(""), P.length ? a.pathname = P.join("/") : (a.pathname = null, a.path = null), util$1.isNull(a.pathname) && util$1.isNull(a.search) || (a.path = (a.pathname ? a.pathname : "") + (a.search ? a.search : "")), a.auth = e.auth || a.auth, a.slashes = a.slashes || e.slashes, a.href = a.format(), a;
  }, Url.prototype.parseHost = function () {
    var e = this.host,
        t = portPattern.exec(e);t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
  };var aspromise = asPromise;function asPromise(e, t) {
    for (var a = new Array(arguments.length - 1), r = 0, n = 2, o = !0; n < arguments.length;) a[r++] = arguments[n++];return new Promise(function (n, i) {
      a[r] = function (e) {
        if (o) if (o = !1, e) i(e);else {
          for (var t = new Array(arguments.length - 1), a = 0; a < t.length;) t[a++] = arguments[a];n.apply(null, t);
        }
      };try {
        e.apply(t || null, a);
      } catch (e) {
        o && (o = !1, i(e));
      }
    });
  }var base64_1 = createCommonjsModule$1(function (e, t) {
    var a = t;a.length = function (e) {
      var t = e.length;if (!t) return 0;for (var a = 0; --t % 4 > 1 && "=" === e.charAt(t);) ++a;return Math.ceil(3 * e.length) / 4 - a;
    };for (var r = new Array(64), n = new Array(123), o = 0; o < 64;) n[r[o] = o < 26 ? o + 65 : o < 52 ? o + 71 : o < 62 ? o - 4 : o - 59 | 43] = o++;a.encode = function (e, t, a) {
      for (var n, o = null, i = [], s = 0, p = 0; t < a;) {
        var u = e[t++];switch (p) {case 0:
            i[s++] = r[u >> 2], n = (3 & u) << 4, p = 1;break;case 1:
            i[s++] = r[n | u >> 4], n = (15 & u) << 2, p = 2;break;case 2:
            i[s++] = r[n | u >> 6], i[s++] = r[63 & u], p = 0;}s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), s = 0);
      }return p && (i[s++] = r[n], i[s++] = 61, 1 === p && (i[s++] = 61)), o ? (s && o.push(String.fromCharCode.apply(String, i.slice(0, s))), o.join("")) : String.fromCharCode.apply(String, i.slice(0, s));
    };a.decode = function (e, t, a) {
      for (var r, o = a, i = 0, s = 0; s < e.length;) {
        var p = e.charCodeAt(s++);if (61 === p && i > 1) break;if (void 0 === (p = n[p])) throw Error("invalid encoding");switch (i) {case 0:
            r = p, i = 1;break;case 1:
            t[a++] = r << 2 | (48 & p) >> 4, r = p, i = 2;break;case 2:
            t[a++] = (15 & r) << 4 | (60 & p) >> 2, r = p, i = 3;break;case 3:
            t[a++] = (3 & r) << 6 | p, i = 0;}
      }if (1 === i) throw Error("invalid encoding");return a - o;
    }, a.test = function (e) {
      return (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)
      );
    };
  }),
      eventemitter = EventEmitter;function EventEmitter() {
    this._listeners = {};
  }EventEmitter.prototype.on = function (e, t, a) {
    return (this._listeners[e] || (this._listeners[e] = [])).push({ fn: t, ctx: a || this }), this;
  }, EventEmitter.prototype.off = function (e, t) {
    if (void 0 === e) this._listeners = {};else if (void 0 === t) this._listeners[e] = [];else for (var a = this._listeners[e], r = 0; r < a.length;) a[r].fn === t ? a.splice(r, 1) : ++r;return this;
  }, EventEmitter.prototype.emit = function (e) {
    var t = this._listeners[e];if (t) {
      for (var a = [], r = 1; r < arguments.length;) a.push(arguments[r++]);for (r = 0; r < t.length;) t[r].fn.apply(t[r++].ctx, a);
    }return this;
  };var float_1 = factory(factory);function factory(e) {
    return "undefined" != typeof Float32Array ? function () {
      var t = new Float32Array([-0]),
          a = new Uint8Array(t.buffer),
          r = 128 === a[3];function n(e, r, n) {
        t[0] = e, r[n] = a[0], r[n + 1] = a[1], r[n + 2] = a[2], r[n + 3] = a[3];
      }function o(e, r, n) {
        t[0] = e, r[n] = a[3], r[n + 1] = a[2], r[n + 2] = a[1], r[n + 3] = a[0];
      }function i(e, r) {
        return a[0] = e[r], a[1] = e[r + 1], a[2] = e[r + 2], a[3] = e[r + 3], t[0];
      }function s(e, r) {
        return a[3] = e[r], a[2] = e[r + 1], a[1] = e[r + 2], a[0] = e[r + 3], t[0];
      }e.writeFloatLE = r ? n : o, e.writeFloatBE = r ? o : n, e.readFloatLE = r ? i : s, e.readFloatBE = r ? s : i;
    }() : function () {
      function t(e, t, a, r) {
        var n = t < 0 ? 1 : 0;if (n && (t = -t), 0 === t) e(1 / t > 0 ? 0 : 2147483648, a, r);else if (isNaN(t)) e(2143289344, a, r);else if (t > 3.4028234663852886e38) e((n << 31 | 2139095040) >>> 0, a, r);else if (t < 1.1754943508222875e-38) e((n << 31 | Math.round(t / 1.401298464324817e-45)) >>> 0, a, r);else {
          var o = Math.floor(Math.log(t) / Math.LN2);e((n << 31 | o + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -o) * 8388608)) >>> 0, a, r);
        }
      }function a(e, t, a) {
        var r = e(t, a),
            n = 2 * (r >> 31) + 1,
            o = r >>> 23 & 255,
            i = 8388607 & r;return 255 === o ? i ? NaN : n * (1 / 0) : 0 === o ? 1.401298464324817e-45 * n * i : n * Math.pow(2, o - 150) * (i + 8388608);
      }e.writeFloatLE = t.bind(null, writeUintLE), e.writeFloatBE = t.bind(null, writeUintBE), e.readFloatLE = a.bind(null, readUintLE), e.readFloatBE = a.bind(null, readUintBE);
    }(), "undefined" != typeof Float64Array ? function () {
      var t = new Float64Array([-0]),
          a = new Uint8Array(t.buffer),
          r = 128 === a[7];function n(e, r, n) {
        t[0] = e, r[n] = a[0], r[n + 1] = a[1], r[n + 2] = a[2], r[n + 3] = a[3], r[n + 4] = a[4], r[n + 5] = a[5], r[n + 6] = a[6], r[n + 7] = a[7];
      }function o(e, r, n) {
        t[0] = e, r[n] = a[7], r[n + 1] = a[6], r[n + 2] = a[5], r[n + 3] = a[4], r[n + 4] = a[3], r[n + 5] = a[2], r[n + 6] = a[1], r[n + 7] = a[0];
      }function i(e, r) {
        return a[0] = e[r], a[1] = e[r + 1], a[2] = e[r + 2], a[3] = e[r + 3], a[4] = e[r + 4], a[5] = e[r + 5], a[6] = e[r + 6], a[7] = e[r + 7], t[0];
      }function s(e, r) {
        return a[7] = e[r], a[6] = e[r + 1], a[5] = e[r + 2], a[4] = e[r + 3], a[3] = e[r + 4], a[2] = e[r + 5], a[1] = e[r + 6], a[0] = e[r + 7], t[0];
      }e.writeDoubleLE = r ? n : o, e.writeDoubleBE = r ? o : n, e.readDoubleLE = r ? i : s, e.readDoubleBE = r ? s : i;
    }() : function () {
      function t(e, t, a, r, n, o) {
        var i = r < 0 ? 1 : 0;if (i && (r = -r), 0 === r) e(0, n, o + t), e(1 / r > 0 ? 0 : 2147483648, n, o + a);else if (isNaN(r)) e(0, n, o + t), e(2146959360, n, o + a);else if (r > 1.7976931348623157e308) e(0, n, o + t), e((i << 31 | 2146435072) >>> 0, n, o + a);else {
          var s;if (r < 2.2250738585072014e-308) e((s = r / 5e-324) >>> 0, n, o + t), e((i << 31 | s / 4294967296) >>> 0, n, o + a);else {
            var p = Math.floor(Math.log(r) / Math.LN2);1024 === p && (p = 1023), e(4503599627370496 * (s = r * Math.pow(2, -p)) >>> 0, n, o + t), e((i << 31 | p + 1023 << 20 | 1048576 * s & 1048575) >>> 0, n, o + a);
          }
        }
      }function a(e, t, a, r, n) {
        var o = e(r, n + t),
            i = e(r, n + a),
            s = 2 * (i >> 31) + 1,
            p = i >>> 20 & 2047,
            u = 4294967296 * (1048575 & i) + o;return 2047 === p ? u ? NaN : s * (1 / 0) : 0 === p ? 5e-324 * s * u : s * Math.pow(2, p - 1075) * (u + 4503599627370496);
      }e.writeDoubleLE = t.bind(null, writeUintLE, 0, 4), e.writeDoubleBE = t.bind(null, writeUintBE, 4, 0), e.readDoubleLE = a.bind(null, readUintLE, 0, 4), e.readDoubleBE = a.bind(null, readUintBE, 4, 0);
    }(), e;
  }function writeUintLE(e, t, a) {
    t[a] = 255 & e, t[a + 1] = e >>> 8 & 255, t[a + 2] = e >>> 16 & 255, t[a + 3] = e >>> 24;
  }function writeUintBE(e, t, a) {
    t[a] = e >>> 24, t[a + 1] = e >>> 16 & 255, t[a + 2] = e >>> 8 & 255, t[a + 3] = 255 & e;
  }function readUintLE(e, t) {
    return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
  }function readUintBE(e, t) {
    return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
  }var inquire_1 = inquire;function inquire(moduleName) {
    try {
      var mod$$1 = eval("quire".replace(/^/, "re"))(moduleName);if (mod$$1 && (mod$$1.length || Object.keys(mod$$1).length)) return mod$$1;
    } catch (e) {}return null;
  }var utf8_1 = createCommonjsModule$1(function (e, t) {
    var a = t;a.length = function (e) {
      for (var t = 0, a = 0, r = 0; r < e.length; ++r) (a = e.charCodeAt(r)) < 128 ? t += 1 : a < 2048 ? t += 2 : 55296 == (64512 & a) && 56320 == (64512 & e.charCodeAt(r + 1)) ? (++r, t += 4) : t += 3;return t;
    }, a.read = function (e, t, a) {
      if (a - t < 1) return "";for (var r, n = null, o = [], i = 0; t < a;) (r = e[t++]) < 128 ? o[i++] = r : r > 191 && r < 224 ? o[i++] = (31 & r) << 6 | 63 & e[t++] : r > 239 && r < 365 ? (r = ((7 & r) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536, o[i++] = 55296 + (r >> 10), o[i++] = 56320 + (1023 & r)) : o[i++] = (15 & r) << 12 | (63 & e[t++]) << 6 | 63 & e[t++], i > 8191 && ((n || (n = [])).push(String.fromCharCode.apply(String, o)), i = 0);return n ? (i && n.push(String.fromCharCode.apply(String, o.slice(0, i))), n.join("")) : String.fromCharCode.apply(String, o.slice(0, i));
    }, a.write = function (e, t, a) {
      for (var r, n, o = a, i = 0; i < e.length; ++i) (r = e.charCodeAt(i)) < 128 ? t[a++] = r : r < 2048 ? (t[a++] = r >> 6 | 192, t[a++] = 63 & r | 128) : 55296 == (64512 & r) && 56320 == (64512 & (n = e.charCodeAt(i + 1))) ? (r = 65536 + ((1023 & r) << 10) + (1023 & n), ++i, t[a++] = r >> 18 | 240, t[a++] = r >> 12 & 63 | 128, t[a++] = r >> 6 & 63 | 128, t[a++] = 63 & r | 128) : (t[a++] = r >> 12 | 224, t[a++] = r >> 6 & 63 | 128, t[a++] = 63 & r | 128);return a - o;
    };
  }),
      pool_1 = pool;function pool(e, t, a) {
    var r = a || 8192,
        n = r >>> 1,
        o = null,
        i = r;return function (a) {
      if (a < 1 || a > n) return e(a);i + a > r && (o = e(r), i = 0);var s = t.call(o, i, i += a);return 7 & i && (i = 1 + (7 | i)), s;
    };
  }var longbits = LongBits;function LongBits(e, t) {
    this.lo = e >>> 0, this.hi = t >>> 0;
  }var zero = LongBits.zero = new LongBits(0, 0);zero.toNumber = function () {
    return 0;
  }, zero.zzEncode = zero.zzDecode = function () {
    return this;
  }, zero.length = function () {
    return 1;
  };var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";LongBits.fromNumber = function (e) {
    if (0 === e) return zero;var t = e < 0;t && (e = -e);var a = e >>> 0,
        r = (e - a) / 4294967296 >>> 0;return t && (r = ~r >>> 0, a = ~a >>> 0, ++a > 4294967295 && (a = 0, ++r > 4294967295 && (r = 0))), new LongBits(a, r);
  }, LongBits.from = function (e) {
    if ("number" == typeof e) return LongBits.fromNumber(e);if (minimal.isString(e)) {
      if (!minimal.Long) return LongBits.fromNumber(parseInt(e, 10));e = minimal.Long.fromString(e);
    }return e.low || e.high ? new LongBits(e.low >>> 0, e.high >>> 0) : zero;
  }, LongBits.prototype.toNumber = function (e) {
    if (!e && this.hi >>> 31) {
      var t = 1 + ~this.lo >>> 0,
          a = ~this.hi >>> 0;return t || (a = a + 1 >>> 0), -(t + 4294967296 * a);
    }return this.lo + 4294967296 * this.hi;
  }, LongBits.prototype.toLong = function (e) {
    return minimal.Long ? new minimal.Long(0 | this.lo, 0 | this.hi, Boolean(e)) : { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(e) };
  };var charCodeAt = String.prototype.charCodeAt;LongBits.fromHash = function (e) {
    return e === zeroHash ? zero : new LongBits((charCodeAt.call(e, 0) | charCodeAt.call(e, 1) << 8 | charCodeAt.call(e, 2) << 16 | charCodeAt.call(e, 3) << 24) >>> 0, (charCodeAt.call(e, 4) | charCodeAt.call(e, 5) << 8 | charCodeAt.call(e, 6) << 16 | charCodeAt.call(e, 7) << 24) >>> 0);
  }, LongBits.prototype.toHash = function () {
    return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
  }, LongBits.prototype.zzEncode = function () {
    var e = this.hi >> 31;return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this;
  }, LongBits.prototype.zzDecode = function () {
    var e = -(1 & this.lo);return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this;
  }, LongBits.prototype.length = function () {
    var e = this.lo,
        t = (this.lo >>> 28 | this.hi << 4) >>> 0,
        a = this.hi >>> 24;return 0 === a ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : a < 128 ? 9 : 10;
  };var minimal = createCommonjsModule$1(function (e, t) {
    var a = t;function r(e, t, a) {
      for (var r = Object.keys(t), n = 0; n < r.length; ++n) void 0 !== e[r[n]] && a || (e[r[n]] = t[r[n]]);return e;
    }function n(e) {
      function t(e, a) {
        if (!(this instanceof t)) return new t(e, a);Object.defineProperty(this, "message", { get: function () {
            return e;
          } }), Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", { value: new Error().stack || "" }), a && r(this, a);
      }return (t.prototype = Object.create(Error.prototype)).constructor = t, Object.defineProperty(t.prototype, "name", { get: function () {
          return e;
        } }), t.prototype.toString = function () {
        return this.name + ": " + this.message;
      }, t;
    }a.asPromise = aspromise, a.base64 = base64_1, a.EventEmitter = eventemitter, a.float = float_1, a.inquire = inquire_1, a.utf8 = utf8_1, a.pool = pool_1, a.LongBits = longbits, a.emptyArray = Object.freeze ? Object.freeze([]) : [], a.emptyObject = Object.freeze ? Object.freeze({}) : {}, a.isNode = Boolean(commonjsGlobal$1.process && commonjsGlobal$1.process.versions && commonjsGlobal$1.process.versions.node), a.isInteger = Number.isInteger || function (e) {
      return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
    }, a.isString = function (e) {
      return "string" == typeof e || e instanceof String;
    }, a.isObject = function (e) {
      return e && "object" == typeof e;
    }, a.isset = a.isSet = function (e, t) {
      var a = e[t];return !(null == a || !e.hasOwnProperty(t)) && ("object" != typeof a || (Array.isArray(a) ? a.length : Object.keys(a).length) > 0);
    }, a.Buffer = function () {
      try {
        var e = a.inquire("buffer").Buffer;return e.prototype.utf8Write ? e : null;
      } catch (e) {
        return null;
      }
    }(), a._Buffer_from = null, a._Buffer_allocUnsafe = null, a.newBuffer = function (e) {
      return "number" == typeof e ? a.Buffer ? a._Buffer_allocUnsafe(e) : new a.Array(e) : a.Buffer ? a._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e);
    }, a.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, a.Long = commonjsGlobal$1.dcodeIO && commonjsGlobal$1.dcodeIO.Long || a.inquire("long"), a.key2Re = /^true|false|0|1$/, a.key32Re = /^-?(?:0|[1-9][0-9]*)$/, a.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, a.longToHash = function (e) {
      return e ? a.LongBits.from(e).toHash() : a.LongBits.zeroHash;
    }, a.longFromHash = function (e, t) {
      var r = a.LongBits.fromHash(e);return a.Long ? a.Long.fromBits(r.lo, r.hi, t) : r.toNumber(Boolean(t));
    }, a.merge = r, a.lcFirst = function (e) {
      return e.charAt(0).toLowerCase() + e.substring(1);
    }, a.newError = n, a.ProtocolError = n("ProtocolError"), a.oneOfGetter = function (e) {
      for (var t = {}, a = 0; a < e.length; ++a) t[e[a]] = 1;return function () {
        for (var e = Object.keys(this), a = e.length - 1; a > -1; --a) if (1 === t[e[a]] && void 0 !== this[e[a]] && null !== this[e[a]]) return e[a];
      };
    }, a.oneOfSetter = function (e) {
      return function (t) {
        for (var a = 0; a < e.length; ++a) e[a] !== t && delete this[e[a]];
      };
    }, a.toJSONOptions = { longs: String, enums: String, bytes: String, json: !0 }, a._configure = function () {
      var e = a.Buffer;e ? (a._Buffer_from = e.from !== Uint8Array.from && e.from || function (t, a) {
        return new e(t, a);
      }, a._Buffer_allocUnsafe = e.allocUnsafe || function (t) {
        return new e(t);
      }) : a._Buffer_from = a._Buffer_allocUnsafe = null;
    };
  }),
      writer = Writer,
      BufferWriter,
      LongBits$1 = minimal.LongBits,
      base64 = minimal.base64,
      utf8 = minimal.utf8;function Op(e, t, a) {
    this.fn = e, this.len = t, this.next = void 0, this.val = a;
  }function noop() {}function State(e) {
    this.head = e.head, this.tail = e.tail, this.len = e.len, this.next = e.states;
  }function Writer() {
    this.len = 0, this.head = new Op(noop, 0, 0), this.tail = this.head, this.states = null;
  }function writeByte(e, t, a) {
    t[a] = 255 & e;
  }function writeVarint32(e, t, a) {
    for (; e > 127;) t[a++] = 127 & e | 128, e >>>= 7;t[a] = e;
  }function VarintOp(e, t) {
    this.len = e, this.next = void 0, this.val = t;
  }function writeVarint64(e, t, a) {
    for (; e.hi;) t[a++] = 127 & e.lo | 128, e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0, e.hi >>>= 7;for (; e.lo > 127;) t[a++] = 127 & e.lo | 128, e.lo = e.lo >>> 7;t[a++] = e.lo;
  }function writeFixed32(e, t, a) {
    t[a] = 255 & e, t[a + 1] = e >>> 8 & 255, t[a + 2] = e >>> 16 & 255, t[a + 3] = e >>> 24;
  }Writer.create = minimal.Buffer ? function () {
    return (Writer.create = function () {
      return new BufferWriter();
    })();
  } : function () {
    return new Writer();
  }, Writer.alloc = function (e) {
    return new minimal.Array(e);
  }, minimal.Array !== Array && (Writer.alloc = minimal.pool(Writer.alloc, minimal.Array.prototype.subarray)), Writer.prototype._push = function (e, t, a) {
    return this.tail = this.tail.next = new Op(e, t, a), this.len += t, this;
  }, VarintOp.prototype = Object.create(Op.prototype), VarintOp.prototype.fn = writeVarint32, Writer.prototype.uint32 = function (e) {
    return this.len += (this.tail = this.tail.next = new VarintOp((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this;
  }, Writer.prototype.int32 = function (e) {
    return e < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(e)) : this.uint32(e);
  }, Writer.prototype.sint32 = function (e) {
    return this.uint32((e << 1 ^ e >> 31) >>> 0);
  }, Writer.prototype.uint64 = function (e) {
    var t = LongBits$1.from(e);return this._push(writeVarint64, t.length(), t);
  }, Writer.prototype.int64 = Writer.prototype.uint64, Writer.prototype.sint64 = function (e) {
    var t = LongBits$1.from(e).zzEncode();return this._push(writeVarint64, t.length(), t);
  }, Writer.prototype.bool = function (e) {
    return this._push(writeByte, 1, e ? 1 : 0);
  }, Writer.prototype.fixed32 = function (e) {
    return this._push(writeFixed32, 4, e >>> 0);
  }, Writer.prototype.sfixed32 = Writer.prototype.fixed32, Writer.prototype.fixed64 = function (e) {
    var t = LongBits$1.from(e);return this._push(writeFixed32, 4, t.lo)._push(writeFixed32, 4, t.hi);
  }, Writer.prototype.sfixed64 = Writer.prototype.fixed64, Writer.prototype.float = function (e) {
    return this._push(minimal.float.writeFloatLE, 4, e);
  }, Writer.prototype.double = function (e) {
    return this._push(minimal.float.writeDoubleLE, 8, e);
  };var writeBytes = minimal.Array.prototype.set ? function (e, t, a) {
    t.set(e, a);
  } : function (e, t, a) {
    for (var r = 0; r < e.length; ++r) t[a + r] = e[r];
  };Writer.prototype.bytes = function (e) {
    var t = e.length >>> 0;if (!t) return this._push(writeByte, 1, 0);if (minimal.isString(e)) {
      var a = Writer.alloc(t = base64.length(e));base64.decode(e, a, 0), e = a;
    }return this.uint32(t)._push(writeBytes, t, e);
  }, Writer.prototype.string = function (e) {
    var t = utf8.length(e);return t ? this.uint32(t)._push(utf8.write, t, e) : this._push(writeByte, 1, 0);
  }, Writer.prototype.fork = function () {
    return this.states = new State(this), this.head = this.tail = new Op(noop, 0, 0), this.len = 0, this;
  }, Writer.prototype.reset = function () {
    return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new Op(noop, 0, 0), this.len = 0), this;
  }, Writer.prototype.ldelim = function () {
    var e = this.head,
        t = this.tail,
        a = this.len;return this.reset().uint32(a), a && (this.tail.next = e.next, this.tail = t, this.len += a), this;
  }, Writer.prototype.finish = function () {
    for (var e = this.head.next, t = this.constructor.alloc(this.len), a = 0; e;) e.fn(e.val, t, a), a += e.len, e = e.next;return t;
  }, Writer._configure = function (e) {
    BufferWriter = e;
  };var writer_buffer = BufferWriter$1;(BufferWriter$1.prototype = Object.create(writer.prototype)).constructor = BufferWriter$1;var Buffer$1 = minimal.Buffer;function BufferWriter$1() {
    writer.call(this);
  }BufferWriter$1.alloc = function (e) {
    return (BufferWriter$1.alloc = minimal._Buffer_allocUnsafe)(e);
  };var writeBytesBuffer = Buffer$1 && Buffer$1.prototype instanceof Uint8Array && "set" === Buffer$1.prototype.set.name ? function (e, t, a) {
    t.set(e, a);
  } : function (e, t, a) {
    if (e.copy) e.copy(t, a, 0, e.length);else for (var r = 0; r < e.length;) t[a++] = e[r++];
  };function writeStringBuffer(e, t, a) {
    e.length < 40 ? minimal.utf8.write(e, t, a) : t.utf8Write(e, a);
  }BufferWriter$1.prototype.bytes = function (e) {
    minimal.isString(e) && (e = minimal._Buffer_from(e, "base64"));var t = e.length >>> 0;return this.uint32(t), t && this._push(writeBytesBuffer, t, e), this;
  }, BufferWriter$1.prototype.string = function (e) {
    var t = Buffer$1.byteLength(e);return this.uint32(t), t && this._push(writeStringBuffer, t, e), this;
  };var reader = Reader,
      BufferReader,
      LongBits$2 = minimal.LongBits,
      utf8$1 = minimal.utf8;function indexOutOfRange(e, t) {
    return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len);
  }function Reader(e) {
    this.buf = e, this.pos = 0, this.len = e.length;
  }var create_array = "undefined" != typeof Uint8Array ? function (e) {
    if (e instanceof Uint8Array || Array.isArray(e)) return new Reader(e);throw Error("illegal buffer");
  } : function (e) {
    if (Array.isArray(e)) return new Reader(e);throw Error("illegal buffer");
  };function readLongVarint() {
    var e = new LongBits$2(0, 0),
        t = 0;if (!(this.len - this.pos > 4)) {
      for (; t < 3; ++t) {
        if (this.pos >= this.len) throw indexOutOfRange(this);if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;
      }return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0, e;
    }for (; t < 4; ++t) if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0, e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return e;if (t = 0, this.len - this.pos > 4) {
      for (; t < 5; ++t) if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e;
    } else for (; t < 5; ++t) {
      if (this.pos >= this.len) throw indexOutOfRange(this);if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e;
    }throw Error("invalid varint encoding");
  }function readFixed32_end(e, t) {
    return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
  }function readFixed64() {
    if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);return new LongBits$2(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
  }Reader.create = minimal.Buffer ? function (e) {
    return (Reader.create = function (e) {
      return minimal.Buffer.isBuffer(e) ? new BufferReader(e) : create_array(e);
    })(e);
  } : create_array, Reader.prototype._slice = minimal.Array.prototype.subarray || minimal.Array.prototype.slice, Reader.prototype.uint32 = function () {
    var e = 4294967295;return function () {
      if (e = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return e;if (e = (e | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return e;if (e = (e | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return e;if (e = (e | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return e;if (e = (e | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return e;if ((this.pos += 5) > this.len) throw this.pos = this.len, indexOutOfRange(this, 10);return e;
    };
  }(), Reader.prototype.int32 = function () {
    return 0 | this.uint32();
  }, Reader.prototype.sint32 = function () {
    var e = this.uint32();return e >>> 1 ^ -(1 & e) | 0;
  }, Reader.prototype.bool = function () {
    return 0 !== this.uint32();
  }, Reader.prototype.fixed32 = function () {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);return readFixed32_end(this.buf, this.pos += 4);
  }, Reader.prototype.sfixed32 = function () {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);return 0 | readFixed32_end(this.buf, this.pos += 4);
  }, Reader.prototype.float = function () {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);var e = minimal.float.readFloatLE(this.buf, this.pos);return this.pos += 4, e;
  }, Reader.prototype.double = function () {
    if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);var e = minimal.float.readDoubleLE(this.buf, this.pos);return this.pos += 8, e;
  }, Reader.prototype.bytes = function () {
    var e = this.uint32(),
        t = this.pos,
        a = this.pos + e;if (a > this.len) throw indexOutOfRange(this, e);return this.pos += e, Array.isArray(this.buf) ? this.buf.slice(t, a) : t === a ? new this.buf.constructor(0) : this._slice.call(this.buf, t, a);
  }, Reader.prototype.string = function () {
    var e = this.bytes();return utf8$1.read(e, 0, e.length);
  }, Reader.prototype.skip = function (e) {
    if ("number" == typeof e) {
      if (this.pos + e > this.len) throw indexOutOfRange(this, e);this.pos += e;
    } else do {
      if (this.pos >= this.len) throw indexOutOfRange(this);
    } while (128 & this.buf[this.pos++]);return this;
  }, Reader.prototype.skipType = function (e) {
    switch (e) {case 0:
        this.skip();break;case 1:
        this.skip(8);break;case 2:
        this.skip(this.uint32());break;case 3:
        for (;;) {
          if (4 == (e = 7 & this.uint32())) break;this.skipType(e);
        }break;case 5:
        this.skip(4);break;default:
        throw Error("invalid wire type " + e + " at offset " + this.pos);}return this;
  }, Reader._configure = function (e) {
    BufferReader = e;var t = minimal.Long ? "toLong" : "toNumber";minimal.merge(Reader.prototype, { int64: function () {
        return readLongVarint.call(this)[t](!1);
      }, uint64: function () {
        return readLongVarint.call(this)[t](!0);
      }, sint64: function () {
        return readLongVarint.call(this).zzDecode()[t](!1);
      }, fixed64: function () {
        return readFixed64.call(this)[t](!0);
      }, sfixed64: function () {
        return readFixed64.call(this)[t](!1);
      } });
  };var reader_buffer = BufferReader$1;function BufferReader$1(e) {
    reader.call(this, e);
  }(BufferReader$1.prototype = Object.create(reader.prototype)).constructor = BufferReader$1, minimal.Buffer && (BufferReader$1.prototype._slice = minimal.Buffer.prototype.slice), BufferReader$1.prototype.string = function () {
    var e = this.uint32();return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len));
  };var service = Service;function Service(e, t, a) {
    if ("function" != typeof e) throw TypeError("rpcImpl must be a function");minimal.EventEmitter.call(this), this.rpcImpl = e, this.requestDelimited = Boolean(t), this.responseDelimited = Boolean(a);
  }(Service.prototype = Object.create(minimal.EventEmitter.prototype)).constructor = Service, Service.prototype.rpcCall = function e(t, a, r, n, o) {
    if (!n) throw TypeError("request must be specified");var i = this;if (!o) return minimal.asPromise(e, i, t, a, r, n);if (i.rpcImpl) try {
      return i.rpcImpl(t, a[i.requestDelimited ? "encodeDelimited" : "encode"](n).finish(), function (e, a) {
        if (e) return i.emit("error", e, t), o(e);if (null !== a) {
          if (!(a instanceof r)) try {
            a = r[i.responseDelimited ? "decodeDelimited" : "decode"](a);
          } catch (e) {
            return i.emit("error", e, t), o(e);
          }return i.emit("data", a, t), o(null, a);
        }i.end(!0);
      });
    } catch (e) {
      return i.emit("error", e, t), void setTimeout(function () {
        o(e);
      }, 0);
    } else setTimeout(function () {
      o(Error("already ended"));
    }, 0);
  }, Service.prototype.end = function (e) {
    return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
  };var rpc_1 = createCommonjsModule$1(function (e, t) {
    t.Service = service;
  }),
      roots = {},
      indexMinimal = createCommonjsModule$1(function (e, t) {
    var a = t;function r() {
      a.Reader._configure(a.BufferReader), a.util._configure();
    }a.build = "minimal", a.Writer = writer, a.BufferWriter = writer_buffer, a.Reader = reader, a.BufferReader = reader_buffer, a.util = minimal, a.rpc = rpc_1, a.roots = roots, a.configure = r, a.Writer._configure(a.BufferWriter), r();
  }),
      minimal$1 = indexMinimal,
      minimal_1 = minimal$1.roots,
      minimal_2 = minimal$1.Reader,
      minimal_3 = minimal$1.util,
      $Reader = minimal$1.Reader,
      $util = minimal$1.util,
      $root = minimal$1.roots.default || (minimal$1.roots.default = {});$root.tensorflow = function () {
    var e,
        t,
        a = {};return a.Any = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.typeUrl = "", e.prototype.value = $util.newBuffer([]), e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.Any(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.typeUrl = e.string();break;case 2:
              r.value = e.bytes();break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.DataType = (e = {}, (t = Object.create(e))[e[0] = "DT_INVALID"] = 0, t[e[1] = "DT_FLOAT"] = 1, t[e[2] = "DT_DOUBLE"] = 2, t[e[3] = "DT_INT32"] = 3, t[e[4] = "DT_UINT8"] = 4, t[e[5] = "DT_INT16"] = 5, t[e[6] = "DT_INT8"] = 6, t[e[7] = "DT_STRING"] = 7, t[e[8] = "DT_COMPLEX64"] = 8, t[e[9] = "DT_INT64"] = 9, t[e[10] = "DT_BOOL"] = 10, t[e[11] = "DT_QINT8"] = 11, t[e[12] = "DT_QUINT8"] = 12, t[e[13] = "DT_QINT32"] = 13, t[e[14] = "DT_BFLOAT16"] = 14, t[e[101] = "DT_FLOAT_REF"] = 101, t[e[102] = "DT_DOUBLE_REF"] = 102, t[e[103] = "DT_INT32_REF"] = 103, t[e[104] = "DT_UINT8_REF"] = 104, t[e[105] = "DT_INT16_REF"] = 105, t[e[106] = "DT_INT8_REF"] = 106, t[e[107] = "DT_STRING_REF"] = 107, t[e[108] = "DT_COMPLEX64_REF"] = 108, t[e[109] = "DT_INT64_REF"] = 109, t[e[110] = "DT_BOOL_REF"] = 110, t[e[111] = "DT_QINT8_REF"] = 111, t[e[112] = "DT_QUINT8_REF"] = 112, t[e[113] = "DT_QINT32_REF"] = 113, t[e[114] = "DT_BFLOAT16_REF"] = 114, t), a.TensorShape = function () {
      function e(e) {
        if (this.dim = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.dim = $util.emptyArray, e.prototype.unknownRank = !1, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.TensorShape(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 2:
              r.dim && r.dim.length || (r.dim = []), r.dim.push($root.tensorflow.TensorShape.Dim.decode(e, e.uint32()));break;case 3:
              r.unknownRank = e.bool();break;default:
              e.skipType(7 & n);}
        }return r;
      }, e.Dim = function () {
        function e(e) {
          if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.size = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.name = "", e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.TensorShape.Dim(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.size = e.int64();break;case 2:
                r.name = e.string();break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e;
    }(), a.Tensor = function () {
      function e(e) {
        if (this.floatVal = [], this.doubleVal = [], this.intVal = [], this.stringVal = [], this.scomplexVal = [], this.int64Val = [], this.boolVal = [], this.uint32Val = [], this.uint64Val = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.dtype = 0, e.prototype.tensorShape = null, e.prototype.versionNumber = 0, e.prototype.tensorContent = $util.newBuffer([]), e.prototype.floatVal = $util.emptyArray, e.prototype.doubleVal = $util.emptyArray, e.prototype.intVal = $util.emptyArray, e.prototype.stringVal = $util.emptyArray, e.prototype.scomplexVal = $util.emptyArray, e.prototype.int64Val = $util.emptyArray, e.prototype.boolVal = $util.emptyArray, e.prototype.uint32Val = $util.emptyArray, e.prototype.uint64Val = $util.emptyArray, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.Tensor(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.dtype = e.int32();break;case 2:
              r.tensorShape = $root.tensorflow.TensorShape.decode(e, e.uint32());break;case 3:
              r.versionNumber = e.int32();break;case 4:
              r.tensorContent = e.bytes();break;case 5:
              if (r.floatVal && r.floatVal.length || (r.floatVal = []), 2 == (7 & n)) for (var o = e.uint32() + e.pos; e.pos < o;) r.floatVal.push(e.float());else r.floatVal.push(e.float());break;case 6:
              if (r.doubleVal && r.doubleVal.length || (r.doubleVal = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.doubleVal.push(e.double());else r.doubleVal.push(e.double());break;case 7:
              if (r.intVal && r.intVal.length || (r.intVal = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.intVal.push(e.int32());else r.intVal.push(e.int32());break;case 8:
              r.stringVal && r.stringVal.length || (r.stringVal = []), r.stringVal.push(e.bytes());break;case 9:
              if (r.scomplexVal && r.scomplexVal.length || (r.scomplexVal = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.scomplexVal.push(e.float());else r.scomplexVal.push(e.float());break;case 10:
              if (r.int64Val && r.int64Val.length || (r.int64Val = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.int64Val.push(e.int64());else r.int64Val.push(e.int64());break;case 11:
              if (r.boolVal && r.boolVal.length || (r.boolVal = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.boolVal.push(e.bool());else r.boolVal.push(e.bool());break;case 16:
              if (r.uint32Val && r.uint32Val.length || (r.uint32Val = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.uint32Val.push(e.uint32());else r.uint32Val.push(e.uint32());break;case 17:
              if (r.uint64Val && r.uint64Val.length || (r.uint64Val = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.uint64Val.push(e.uint64());else r.uint64Val.push(e.uint64());break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.AttrValue = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }var t;return e.prototype.list = null, e.prototype.s = $util.newBuffer([]), e.prototype.i = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.f = 0, e.prototype.b = !1, e.prototype.type = 0, e.prototype.shape = null, e.prototype.tensor = null, e.prototype.placeholder = "", e.prototype.func = null, Object.defineProperty(e.prototype, "value", { get: $util.oneOfGetter(t = ["list", "s", "i", "f", "b", "type", "shape", "tensor", "placeholder", "func"]), set: $util.oneOfSetter(t) }), e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.AttrValue(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.list = $root.tensorflow.AttrValue.ListValue.decode(e, e.uint32());break;case 2:
              r.s = e.bytes();break;case 3:
              r.i = e.int64();break;case 4:
              r.f = e.float();break;case 5:
              r.b = e.bool();break;case 6:
              r.type = e.int32();break;case 7:
              r.shape = $root.tensorflow.TensorShape.decode(e, e.uint32());break;case 8:
              r.tensor = $root.tensorflow.Tensor.decode(e, e.uint32());break;case 9:
              r.placeholder = e.string();break;case 10:
              r.func = $root.tensorflow.NameAttrList.decode(e, e.uint32());break;default:
              e.skipType(7 & n);}
        }return r;
      }, e.ListValue = function () {
        function e(e) {
          if (this.s = [], this.i = [], this.f = [], this.b = [], this.type = [], this.shape = [], this.tensor = [], this.func = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.s = $util.emptyArray, e.prototype.i = $util.emptyArray, e.prototype.f = $util.emptyArray, e.prototype.b = $util.emptyArray, e.prototype.type = $util.emptyArray, e.prototype.shape = $util.emptyArray, e.prototype.tensor = $util.emptyArray, e.prototype.func = $util.emptyArray, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.AttrValue.ListValue(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 2:
                r.s && r.s.length || (r.s = []), r.s.push(e.bytes());break;case 3:
                if (r.i && r.i.length || (r.i = []), 2 == (7 & n)) for (var o = e.uint32() + e.pos; e.pos < o;) r.i.push(e.int64());else r.i.push(e.int64());break;case 4:
                if (r.f && r.f.length || (r.f = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.f.push(e.float());else r.f.push(e.float());break;case 5:
                if (r.b && r.b.length || (r.b = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.b.push(e.bool());else r.b.push(e.bool());break;case 6:
                if (r.type && r.type.length || (r.type = []), 2 == (7 & n)) for (o = e.uint32() + e.pos; e.pos < o;) r.type.push(e.int32());else r.type.push(e.int32());break;case 7:
                r.shape && r.shape.length || (r.shape = []), r.shape.push($root.tensorflow.TensorShape.decode(e, e.uint32()));break;case 8:
                r.tensor && r.tensor.length || (r.tensor = []), r.tensor.push($root.tensorflow.Tensor.decode(e, e.uint32()));break;case 9:
                r.func && r.func.length || (r.func = []), r.func.push($root.tensorflow.NameAttrList.decode(e, e.uint32()));break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e;
    }(), a.NameAttrList = function () {
      function e(e) {
        if (this.attr = {}, e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.name = "", e.prototype.attr = $util.emptyObject, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a, r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.NameAttrList(); e.pos < r;) {
          var o = e.uint32();switch (o >>> 3) {case 1:
              n.name = e.string();break;case 2:
              e.skip().pos++, n.attr === $util.emptyObject && (n.attr = {}), a = e.string(), e.pos++, n.attr[a] = $root.tensorflow.AttrValue.decode(e, e.uint32());break;default:
              e.skipType(7 & o);}
        }return n;
      }, e;
    }(), a.NodeDef = function () {
      function e(e) {
        if (this.input = [], this.attr = {}, e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.name = "", e.prototype.op = "", e.prototype.input = $util.emptyArray, e.prototype.device = "", e.prototype.attr = $util.emptyObject, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a, r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.NodeDef(); e.pos < r;) {
          var o = e.uint32();switch (o >>> 3) {case 1:
              n.name = e.string();break;case 2:
              n.op = e.string();break;case 3:
              n.input && n.input.length || (n.input = []), n.input.push(e.string());break;case 4:
              n.device = e.string();break;case 5:
              e.skip().pos++, n.attr === $util.emptyObject && (n.attr = {}), a = e.string(), e.pos++, n.attr[a] = $root.tensorflow.AttrValue.decode(e, e.uint32());break;default:
              e.skipType(7 & o);}
        }return n;
      }, e;
    }(), a.VersionDef = function () {
      function e(e) {
        if (this.badConsumers = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.producer = 0, e.prototype.minConsumer = 0, e.prototype.badConsumers = $util.emptyArray, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.VersionDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.producer = e.int32();break;case 2:
              r.minConsumer = e.int32();break;case 3:
              if (r.badConsumers && r.badConsumers.length || (r.badConsumers = []), 2 == (7 & n)) for (var o = e.uint32() + e.pos; e.pos < o;) r.badConsumers.push(e.int32());else r.badConsumers.push(e.int32());break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.GraphDef = function () {
      function e(e) {
        if (this.node = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.node = $util.emptyArray, e.prototype.versions = null, e.prototype.library = null, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.GraphDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.node && r.node.length || (r.node = []), r.node.push($root.tensorflow.NodeDef.decode(e, e.uint32()));break;case 4:
              r.versions = $root.tensorflow.VersionDef.decode(e, e.uint32());break;case 2:
              r.library = $root.tensorflow.FunctionDefLibrary.decode(e, e.uint32());break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.CollectionDef = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }var t;return e.prototype.nodeList = null, e.prototype.bytesList = null, e.prototype.int64List = null, e.prototype.floatList = null, e.prototype.anyList = null, Object.defineProperty(e.prototype, "kind", { get: $util.oneOfGetter(t = ["nodeList", "bytesList", "int64List", "floatList", "anyList"]), set: $util.oneOfSetter(t) }), e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.CollectionDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.nodeList = $root.tensorflow.CollectionDef.NodeList.decode(e, e.uint32());break;case 2:
              r.bytesList = $root.tensorflow.CollectionDef.BytesList.decode(e, e.uint32());break;case 3:
              r.int64List = $root.tensorflow.CollectionDef.Int64List.decode(e, e.uint32());break;case 4:
              r.floatList = $root.tensorflow.CollectionDef.FloatList.decode(e, e.uint32());break;case 5:
              r.anyList = $root.tensorflow.CollectionDef.AnyList.decode(e, e.uint32());break;default:
              e.skipType(7 & n);}
        }return r;
      }, e.NodeList = function () {
        function e(e) {
          if (this.value = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.value = $util.emptyArray, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.CollectionDef.NodeList(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.value && r.value.length || (r.value = []), r.value.push(e.string());break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e.BytesList = function () {
        function e(e) {
          if (this.value = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.value = $util.emptyArray, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.CollectionDef.BytesList(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.value && r.value.length || (r.value = []), r.value.push(e.bytes());break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e.Int64List = function () {
        function e(e) {
          if (this.value = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.value = $util.emptyArray, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.CollectionDef.Int64List(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                if (r.value && r.value.length || (r.value = []), 2 == (7 & n)) for (var o = e.uint32() + e.pos; e.pos < o;) r.value.push(e.int64());else r.value.push(e.int64());break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e.FloatList = function () {
        function e(e) {
          if (this.value = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.value = $util.emptyArray, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.CollectionDef.FloatList(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                if (r.value && r.value.length || (r.value = []), 2 == (7 & n)) for (var o = e.uint32() + e.pos; e.pos < o;) r.value.push(e.float());else r.value.push(e.float());break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e.AnyList = function () {
        function e(e) {
          if (this.value = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.value = $util.emptyArray, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.CollectionDef.AnyList(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.value && r.value.length || (r.value = []), r.value.push($root.tensorflow.Any.decode(e, e.uint32()));break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e;
    }(), a.SaverDef = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }var t, a;return e.prototype.filenameTensorName = "", e.prototype.saveTensorName = "", e.prototype.restoreOpName = "", e.prototype.maxToKeep = 0, e.prototype.sharded = !1, e.prototype.keepCheckpointEveryNHours = 0, e.prototype.version = 0, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.SaverDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.filenameTensorName = e.string();break;case 2:
              r.saveTensorName = e.string();break;case 3:
              r.restoreOpName = e.string();break;case 4:
              r.maxToKeep = e.int32();break;case 5:
              r.sharded = e.bool();break;case 6:
              r.keepCheckpointEveryNHours = e.float();break;case 7:
              r.version = e.int32();break;default:
              e.skipType(7 & n);}
        }return r;
      }, e.CheckpointFormatVersion = (t = {}, (a = Object.create(t))[t[0] = "LEGACY"] = 0, a[t[1] = "V1"] = 1, a[t[2] = "V2"] = 2, a), e;
    }(), a.TensorInfo = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }var t;return e.prototype.name = "", e.prototype.cooSparse = null, e.prototype.dtype = 0, e.prototype.tensorShape = null, Object.defineProperty(e.prototype, "encoding", { get: $util.oneOfGetter(t = ["name", "cooSparse"]), set: $util.oneOfSetter(t) }), e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.TensorInfo(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.name = e.string();break;case 4:
              r.cooSparse = $root.tensorflow.TensorInfo.CooSparse.decode(e, e.uint32());break;case 2:
              r.dtype = e.int32();break;case 3:
              r.tensorShape = $root.tensorflow.TensorShape.decode(e, e.uint32());break;default:
              e.skipType(7 & n);}
        }return r;
      }, e.CooSparse = function () {
        function e(e) {
          if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.valuesTensorName = "", e.prototype.indicesTensorName = "", e.prototype.denseShapeTensorName = "", e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.TensorInfo.CooSparse(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.valuesTensorName = e.string();break;case 2:
                r.indicesTensorName = e.string();break;case 3:
                r.denseShapeTensorName = e.string();break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e;
    }(), a.SignatureDef = function () {
      function e(e) {
        if (this.inputs = {}, this.outputs = {}, e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.inputs = $util.emptyObject, e.prototype.outputs = $util.emptyObject, e.prototype.methodName = "", e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a, r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.SignatureDef(); e.pos < r;) {
          var o = e.uint32();switch (o >>> 3) {case 1:
              e.skip().pos++, n.inputs === $util.emptyObject && (n.inputs = {}), a = e.string(), e.pos++, n.inputs[a] = $root.tensorflow.TensorInfo.decode(e, e.uint32());break;case 2:
              e.skip().pos++, n.outputs === $util.emptyObject && (n.outputs = {}), a = e.string(), e.pos++, n.outputs[a] = $root.tensorflow.TensorInfo.decode(e, e.uint32());break;case 3:
              n.methodName = e.string();break;default:
              e.skipType(7 & o);}
        }return n;
      }, e;
    }(), a.AssetFileDef = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.tensorInfo = null, e.prototype.filename = "", e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.AssetFileDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.tensorInfo = $root.tensorflow.TensorInfo.decode(e, e.uint32());break;case 2:
              r.filename = e.string();break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.OpDef = function () {
      function e(e) {
        if (this.inputArg = [], this.outputArg = [], this.attr = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.name = "", e.prototype.inputArg = $util.emptyArray, e.prototype.outputArg = $util.emptyArray, e.prototype.attr = $util.emptyArray, e.prototype.deprecation = null, e.prototype.summary = "", e.prototype.description = "", e.prototype.isCommutative = !1, e.prototype.isAggregate = !1, e.prototype.isStateful = !1, e.prototype.allowsUninitializedInput = !1, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.OpDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.name = e.string();break;case 2:
              r.inputArg && r.inputArg.length || (r.inputArg = []), r.inputArg.push($root.tensorflow.OpDef.ArgDef.decode(e, e.uint32()));break;case 3:
              r.outputArg && r.outputArg.length || (r.outputArg = []), r.outputArg.push($root.tensorflow.OpDef.ArgDef.decode(e, e.uint32()));break;case 4:
              r.attr && r.attr.length || (r.attr = []), r.attr.push($root.tensorflow.OpDef.AttrDef.decode(e, e.uint32()));break;case 8:
              r.deprecation = $root.tensorflow.OpDef.OpDeprecation.decode(e, e.uint32());break;case 5:
              r.summary = e.string();break;case 6:
              r.description = e.string();break;case 18:
              r.isCommutative = e.bool();break;case 16:
              r.isAggregate = e.bool();break;case 17:
              r.isStateful = e.bool();break;case 19:
              r.allowsUninitializedInput = e.bool();break;default:
              e.skipType(7 & n);}
        }return r;
      }, e.ArgDef = function () {
        function e(e) {
          if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.name = "", e.prototype.description = "", e.prototype.type = 0, e.prototype.typeAttr = "", e.prototype.numberAttr = "", e.prototype.typeListAttr = "", e.prototype.isRef = !1, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.OpDef.ArgDef(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.name = e.string();break;case 2:
                r.description = e.string();break;case 3:
                r.type = e.int32();break;case 4:
                r.typeAttr = e.string();break;case 5:
                r.numberAttr = e.string();break;case 6:
                r.typeListAttr = e.string();break;case 16:
                r.isRef = e.bool();break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e.AttrDef = function () {
        function e(e) {
          if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.name = "", e.prototype.type = "", e.prototype.defaultValue = null, e.prototype.description = "", e.prototype.hasMinimum = !1, e.prototype.minimum = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.allowedValues = null, e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.OpDef.AttrDef(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.name = e.string();break;case 2:
                r.type = e.string();break;case 3:
                r.defaultValue = $root.tensorflow.AttrValue.decode(e, e.uint32());break;case 4:
                r.description = e.string();break;case 5:
                r.hasMinimum = e.bool();break;case 6:
                r.minimum = e.int64();break;case 7:
                r.allowedValues = $root.tensorflow.AttrValue.decode(e, e.uint32());break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e.OpDeprecation = function () {
        function e(e) {
          if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.version = 0, e.prototype.explanation = "", e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.OpDef.OpDeprecation(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.version = e.int32();break;case 2:
                r.explanation = e.string();break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e;
    }(), a.OpList = function () {
      function e(e) {
        if (this.op = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.op = $util.emptyArray, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.OpList(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.op && r.op.length || (r.op = []), r.op.push($root.tensorflow.OpDef.decode(e, e.uint32()));break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.MetaGraphDef = function () {
      function e(e) {
        if (this.collectionDef = {}, this.signatureDef = {}, this.assetFileDef = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.metaInfoDef = null, e.prototype.graphDef = null, e.prototype.saverDef = null, e.prototype.collectionDef = $util.emptyObject, e.prototype.signatureDef = $util.emptyObject, e.prototype.assetFileDef = $util.emptyArray, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a, r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.MetaGraphDef(); e.pos < r;) {
          var o = e.uint32();switch (o >>> 3) {case 1:
              n.metaInfoDef = $root.tensorflow.MetaGraphDef.MetaInfoDef.decode(e, e.uint32());break;case 2:
              n.graphDef = $root.tensorflow.GraphDef.decode(e, e.uint32());break;case 3:
              n.saverDef = $root.tensorflow.SaverDef.decode(e, e.uint32());break;case 4:
              e.skip().pos++, n.collectionDef === $util.emptyObject && (n.collectionDef = {}), a = e.string(), e.pos++, n.collectionDef[a] = $root.tensorflow.CollectionDef.decode(e, e.uint32());break;case 5:
              e.skip().pos++, n.signatureDef === $util.emptyObject && (n.signatureDef = {}), a = e.string(), e.pos++, n.signatureDef[a] = $root.tensorflow.SignatureDef.decode(e, e.uint32());break;case 6:
              n.assetFileDef && n.assetFileDef.length || (n.assetFileDef = []), n.assetFileDef.push($root.tensorflow.AssetFileDef.decode(e, e.uint32()));break;default:
              e.skipType(7 & o);}
        }return n;
      }, e.MetaInfoDef = function () {
        function e(e) {
          if (this.tags = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
        }return e.prototype.metaGraphVersion = "", e.prototype.strippedOpList = null, e.prototype.anyInfo = null, e.prototype.tags = $util.emptyArray, e.prototype.tensorflowVersion = "", e.prototype.tensorflowGitVersion = "", e.decode = function (e, t) {
          e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.MetaGraphDef.MetaInfoDef(); e.pos < a;) {
            var n = e.uint32();switch (n >>> 3) {case 1:
                r.metaGraphVersion = e.string();break;case 2:
                r.strippedOpList = $root.tensorflow.OpList.decode(e, e.uint32());break;case 3:
                r.anyInfo = $root.tensorflow.Any.decode(e, e.uint32());break;case 4:
                r.tags && r.tags.length || (r.tags = []), r.tags.push(e.string());break;case 5:
                r.tensorflowVersion = e.string();break;case 6:
                r.tensorflowGitVersion = e.string();break;default:
                e.skipType(7 & n);}
          }return r;
        }, e;
      }(), e;
    }(), a.SavedModel = function () {
      function e(e) {
        if (this.metaGraphs = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.savedModelSchemaVersion = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.metaGraphs = $util.emptyArray, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.SavedModel(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.savedModelSchemaVersion = e.int64();break;case 2:
              r.metaGraphs && r.metaGraphs.length || (r.metaGraphs = []), r.metaGraphs.push($root.tensorflow.MetaGraphDef.decode(e, e.uint32()));break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.FunctionDefLibrary = function () {
      function e(e) {
        if (this.function = [], this.gradient = [], e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.function = $util.emptyArray, e.prototype.gradient = $util.emptyArray, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.FunctionDefLibrary(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.function && r.function.length || (r.function = []), r.function.push($root.tensorflow.FunctionDef.decode(e, e.uint32()));break;case 2:
              r.gradient && r.gradient.length || (r.gradient = []), r.gradient.push($root.tensorflow.GradientDef.decode(e, e.uint32()));break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a.FunctionDef = function () {
      function e(e) {
        if (this.attr = {}, this.nodeDef = [], this.ret = {}, e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.signature = null, e.prototype.attr = $util.emptyObject, e.prototype.nodeDef = $util.emptyArray, e.prototype.ret = $util.emptyObject, e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a, r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.FunctionDef(); e.pos < r;) {
          var o = e.uint32();switch (o >>> 3) {case 1:
              n.signature = $root.tensorflow.OpDef.decode(e, e.uint32());break;case 5:
              e.skip().pos++, n.attr === $util.emptyObject && (n.attr = {}), a = e.string(), e.pos++, n.attr[a] = $root.tensorflow.AttrValue.decode(e, e.uint32());break;case 3:
              n.nodeDef && n.nodeDef.length || (n.nodeDef = []), n.nodeDef.push($root.tensorflow.NodeDef.decode(e, e.uint32()));break;case 4:
              e.skip().pos++, n.ret === $util.emptyObject && (n.ret = {}), a = e.string(), e.pos++, n.ret[a] = e.string();break;default:
              e.skipType(7 & o);}
        }return n;
      }, e;
    }(), a.GradientDef = function () {
      function e(e) {
        if (e) for (var t = Object.keys(e), a = 0; a < t.length; ++a) null != e[t[a]] && (this[t[a]] = e[t[a]]);
      }return e.prototype.functionName = "", e.prototype.gradientFunc = "", e.decode = function (e, t) {
        e instanceof $Reader || (e = $Reader.create(e));for (var a = void 0 === t ? e.len : e.pos + t, r = new $root.tensorflow.GradientDef(); e.pos < a;) {
          var n = e.uint32();switch (n >>> 3) {case 1:
              r.functionName = e.string();break;case 2:
              r.gradientFunc = e.string();break;default:
              e.skipType(7 & n);}
        }return r;
      }, e;
    }(), a;
  }();var compiled_api = $root,
      compiled_api_1 = compiled_api.tensorflow;function getParamValue(e, t, a, r) {
    var n = t.params[e];if (n && void 0 !== n.inputIndex) {
      if ("tensor" === n.type) return getTensor(t.inputNames[n.inputIndex], a, r);if ("tensors" === n.type) return (0 === n.inputIndex ? 0 === n.inputParamLength ? t.inputNames : t.inputNames.slice(n.inputIndex, -n.inputParamLength) : t.inputNames.splice(n.inputIndex)).map(function (e) {
        return getTensor(e, a, r);
      });var o = Array.prototype.slice.call(getTensor(t.inputNames.slice(n.inputIndex)[0], a, r).dataSync());return "number" === n.type ? o[0] : o;
    }return n && n.value;
  }function getTensor(e, t, a) {
    var r = parseNodeName(e),
        n = r[0],
        o = r[1],
        i = a.currentContextIds.find(function (e) {
      return !!t[getNodeNameWithContextId(n, e)];
    });return void 0 !== i ? t[getNodeNameWithContextId(n, i)][o] : void 0;
  }function getNodeNameAndIndex(e, t) {
    var a = parseNodeName(e),
        r = a[0],
        n = a[1];return [getNodeNameWithContextId(r, t && t.currentContextId), n];
  }function getNodeNameWithContextId(e, t) {
    return t ? e + "-" + t : e;
  }function parseNodeName(e) {
    var t = e.lastIndexOf(":");return -1 === t ? [e, 0] : [e.substring(0, t), Number(e.substring(t + 1))];
  }function split$1(e, t) {
    for (var a = [], r = 0; r < e.length; r += t) a.push(e.slice(r, r + t));return a;
  }var arithmetic = [{ tfOpName: "Add", dlOpName: "add", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "BiasAdd", dlOpName: "add", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Sub", dlOpName: "sub", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "RealDiv", dlOpName: "div", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Div", dlOpName: "div", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "FloorDiv", dlOpName: "floorDiv", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Mul", dlOpName: "mul", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Maximum", dlOpName: "maximum", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }] }, { tfOpName: "Minimum", dlOpName: "minimum", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }] }, { tfOpName: "Pow", dlOpName: "pow", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "SquaredDifference", dlOpName: "squaredDifference", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Mod", dlOpName: "mod", category: "arithmetic", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }],
      arithmetic$1 = Object.freeze({ default: arithmetic }),
      basic_math = [{ tfOpName: "Abs", dlOpName: "abs", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Acos", dlOpName: "acos", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Asin", dlOpName: "asin", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "atan", dlOpName: "atan", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Ceil", dlOpName: "ceil", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "ClipByValue", dlOpName: "clipByValue", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "clip_value_min", dlParamName: "clipValueMin", type: "number" }, { tfParamName: "clip_value_max", dlParamName: "clipValueMax", type: "number" }] }, { tfOpName: "Cos", dlOpName: "cos", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Cosh", dlOpName: "cosh", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Elu", dlOpName: "elu", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Exp", dlOpName: "exp", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Floor", dlOpName: "floor", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Log", dlOpName: "log", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Neg", dlOpName: "neg", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Relu", dlOpName: "relu", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Relu6", dlOpName: "clipByValue", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }, { dlParamName: "clipValueMin", type: "number", defaultValue: 0 }, { dlParamName: "clipValueMax", type: "number", defaultValue: 6 }] }, { tfOpName: "Selu", dlOpName: "selu", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Sigmoid", dlOpName: "sigmoid", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Sin", dlOpName: "sin", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Sinh", dlOpName: "sinh", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Sqrt", dlOpName: "sqrt", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Rsqrt", dlOpName: "rsqrt", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Square", dlOpName: "square", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Tan", dlOpName: "tan", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Tanh", dlOpName: "tanh", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Sign", dlOpName: "sign", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Round", dlOpName: "round", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Expm1", dlOpName: "expm1", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Log1p", dlOpName: "log1p", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Reciprocal", dlOpName: "reciprocal", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Reciprocal", dlOpName: "reciprocal", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Softplus", dlOpName: "softplus", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Asinh", dlOpName: "asinh", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Acosh", dlOpName: "acosh", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Atanh", dlOpName: "atanh", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Erf", dlOpName: "erf", category: "basic_math", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }],
      basicMath = Object.freeze({ default: basic_math }),
      control = [{ tfOpName: "LoopCond", dlOpName: "loopCond", category: "control", params: [{ tfInputIndex: 0, dlParamName: "pred", type: "tensor" }] }, { tfOpName: "Switch", dlOpName: "switch", category: "control", params: [{ tfInputIndex: 0, dlParamName: "data", type: "tensor" }, { tfInputIndex: 1, dlParamName: "pred", type: "tensor" }] }, { tfOpName: "Merge", dlOpName: "merge", category: "control", params: [{ tfInputIndex: 0, tfInputParamLength: 0, dlParamName: "tensors", type: "tensors" }] }, { tfOpName: "Enter", dlOpName: "enter", category: "control", params: [{ tfInputIndex: 0, dlParamName: "tensor", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }, { tfParamName: "frame_name", dlParamName: "frameName", type: "string" }, { tfParamName: "is_constant", dlParamName: "isConstant", type: "bool" }] }, { tfOpName: "Exit", dlOpName: "exit", category: "control", params: [{ tfInputIndex: 0, dlParamName: "tensor", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "NextIteration", dlOpName: "nextIteration", category: "control", params: [{ tfInputIndex: 0, dlParamName: "tensor", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }],
      control$1 = Object.freeze({ default: control }),
      convolution = [{ tfOpName: "AvgPool", dlOpName: "avgPool", category: "convolution", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "strides", dlParamName: "strides", type: "number[]" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", notSupported: !0 }, { tfParamName: "ksize", dlParamName: "kernelSize", type: "number[]" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "MaxPool", dlOpName: "maxPool", category: "convolution", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "strides", dlParamName: "strides", type: "number[]" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", notSupported: !0 }, { tfParamName: "ksize", dlParamName: "kernelSize", type: "number[]" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Conv1D", dlOpName: "conv1d", category: "convolution", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "filter", type: "tensor" }, { tfParamName: "stride", dlParamName: "stride", type: "number" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", defaultValue: "NWC" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }, { tfParamName: "dilation", dlParamName: "dilation", type: "number", defaultValue: 1 }] }, { tfOpName: "Conv2D", dlOpName: "conv2d", category: "convolution", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "filter", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }, { tfParamName: "strides", dlParamName: "strides", type: "number[]" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "useCudnnOnGpu", dlParamName: "useCudnnOnGpu", type: "bool" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", defaultValue: "NHWC" }, { tfParamName: "dilations", dlParamName: "dilations", type: "number[]" }] }, { tfOpName: "Conv2DBackpropInput", dlOpName: "conv2dTranspose", category: "convolution", params: [{ tfInputIndex: 2, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "filter", type: "tensor" }, { tfInputIndex: 0, dlParamName: "outputShape", type: "number[]" }, { tfParamName: "strides", dlParamName: "strides", type: "number[]" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", notSupported: !0 }] }, { tfOpName: "DepthwiseConv2d", dlOpName: "depthwiseConv2d", category: "convolution", params: [{ tfInputIndex: 0, dlParamName: "input", type: "tensor" }, { tfInputIndex: 1, dlParamName: "filter", type: "tensor" }, { tfParamName: "strides", dlParamName: "strides", type: "number[]" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", defaultValue: "NHWC" }, { tfParamName: "dilations", dlParamName: "dilations", type: "number[]" }] }, { tfOpName: "DepthwiseConv2dNative", dlOpName: "depthwiseConv2d", category: "convolution", params: [{ tfInputIndex: 0, dlParamName: "input", type: "tensor" }, { tfInputIndex: 1, dlParamName: "filter", type: "tensor" }, { tfParamName: "strides", dlParamName: "strides", type: "number[]" }, { tfParamName: "padding", dlParamName: "pad", type: "string" }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", defaultValue: "NHWC" }, { tfParamName: "dilations", dlParamName: "dilations", type: "number[]" }] }],
      convolution$1 = Object.freeze({ default: convolution }),
      creation = [{ tfOpName: "Fill", dlOpName: "fill", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "shape", type: "number[]" }, { tfInputIndex: 1, dlParamName: "value", type: "number" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "LinSpace", dlOpName: "linspace", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "start", type: "number" }, { tfInputIndex: 1, dlParamName: "stop", type: "number" }, { tfInputIndex: 2, dlParamName: "num", type: "number" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "OneHot", dlOpName: "oneHot", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "indices", type: "tensor" }, { tfInputIndex: 1, dlParamName: "depth", type: "number" }, { tfInputIndex: 2, dlParamName: "onValue", type: "number", defaultValue: 1 }, { tfInputIndex: 3, dlParamName: "offValue", type: "number", defaultValue: 0 }, { tfParamName: "axis", dlParamName: "axis", type: "number", notSupported: !0 }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Ones", dlOpName: "ones", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "shape", type: "number[]" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "OnesLike", dlOpName: "onesLike", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "dtype", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "RandomUniform", dlOpName: "randomUniform", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "shape", type: "number[]" }, { tfParamName: "minval", dlParamName: "minval", type: "number", defaultValue: 0 }, { tfParamName: "maxval", dlParamName: "maxval", type: "number", defaultValue: 1 }, { tfParamName: "dtype", dlParamName: "dtype", type: "dtype" }, { tfParamName: "seed", dlParamName: "seed", type: "number", defaultValue: 0 }, { tfParamName: "seed2", dlParamName: "seed2", type: "number", defaultValue: 0, notSupported: !0 }, { tfParamName: "T", dlParamName: "T", type: "number", notSupported: !0 }] }, { tfOpName: "Range", dlOpName: "range", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "start", type: "number" }, { tfInputIndex: 1, dlParamName: "stop", type: "number" }, { tfInputIndex: 2, dlParamName: "step", type: "number", defaultValue: 0 }, { tfParamName: "Tidx", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "truncatedNormal", dlOpName: "truncatedNormal", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "shape", type: "number[]" }, { tfParamName: "means", dlParamName: "mean", type: "number", defaultValue: 0 }, { tfParamName: "stddev", dlParamName: "stdDev", type: "number", defaultValue: 1 }, { tfParamName: "seed", dlParamName: "seed", type: "number" }, { tfParamName: "seed2", dlParamName: "seed2", type: "number", defaultValue: 0, notSupported: !0 }, { tfParamName: "dtype", dlParamName: "dtype", type: "dtype" }, { tfParamName: "T", dlParamName: "T", type: "number", notSupported: !0 }] }, { tfOpName: "Zeros", dlOpName: "zeros", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "shape", type: "number[]" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "ZerosLike", dlOpName: "zerosLike", category: "creation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype" }] }],
      creation$1 = Object.freeze({ default: creation }),
      graph = [{ tfOpName: "PlaceholderWithDefault", dlOpName: "placeholder", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "default", type: "tensor" }, { tfParamName: "shape", dlParamName: "shape", type: "shape" }, { tfParamName: "dtype", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "Placeholder", dlOpName: "placeholder", category: "graph", params: [{ tfParamName: "shape", dlParamName: "shape", type: "shape" }, { tfParamName: "dtype", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "Const", dlOpName: "const", category: "graph" }, { tfOpName: "Identity", dlOpName: "identity", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }, { tfOpName: "Snapshot", dlOpName: "snapshot", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }, { tfOpName: "Rank", dlOpName: "rank", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }, { tfOpName: "Size", dlOpName: "size", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }, { tfOpName: "Shape", dlOpName: "shape", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }, { tfOpName: "Print", dlOpName: "print", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, tfInputParamLength: 1, dlParamName: "data", type: "tensors" }, { tfParamName: "message", dlParamName: "message", type: "string" }, { tfParamName: "first_n", dlParamName: "firstN", type: "number", notSupprted: !0 }, { tfParamName: "summarize", dlParamName: "summarize", type: "number", defaultValue: 3 }] }, { tfOpName: "NoOp", dlOpName: "noop", category: "graph", params: [] }, { tfOpName: "StopGradient", dlOpName: "stopGradient", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }, { tfOpName: "FakeQuantWithMinMaxVars", dlOpName: "fakeQuantWithMinMaxVars", category: "graph", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "min", dlParamName: "min", type: "number" }, { tfParamName: "max", dlParamName: "max", type: "number" }] }],
      graph$1 = Object.freeze({ default: graph }),
      image$1 = [{ tfOpName: "ResizeBilinear", dlOpName: "resizeBilinear", category: "image", params: [{ tfInputIndex: 0, dlParamName: "images", type: "tensor" }, { tfInputIndex: 1, dlParamName: "size", type: "number[]" }, { tfParamName: "align_corners", dlParamName: "alignCorners", type: "bool" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "ResizeNearestNeighbor", dlOpName: "resizeNearestNeighbor", category: "image", params: [{ tfInputIndex: 0, dlParamName: "images", type: "tensor" }, { tfInputIndex: 1, dlParamName: "size", type: "number[]" }, { tfParamName: "align_corners", dlParamName: "alignCorners", type: "bool" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }],
      image$2 = Object.freeze({ default: image$1 }),
      logical = [{ tfOpName: "Equal", dlOpName: "equal", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "NotEqual", dlOpName: "notEqual", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Greater", dlOpName: "greater", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "GreaterEqual", dlOpName: "greaterEqual", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Less", dlOpName: "less", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "LessEqual", dlOpName: "lessEqual", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "LogicalAnd", dlOpName: "logicalAnd", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "LogicalNot", dlOpName: "logicalNot", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "LogicalOr", dlOpName: "logicalOr", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Select", dlOpName: "where", category: "logical", params: [{ tfInputIndex: 0, dlParamName: "condition", type: "tensor" }, { tfInputIndex: 1, dlParamName: "a", type: "tensor" }, { tfInputIndex: 2, dlParamName: "b", type: "tensor" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }],
      logical$1 = Object.freeze({ default: logical }),
      matrices = [{ tfOpName: "MatMul", dlOpName: "matMul", category: "matrices", params: [{ tfInputIndex: 0, dlParamName: "a", type: "tensor" }, { tfInputIndex: 1, dlParamName: "b", type: "tensor" }, { tfParamName: "transpose_a", dlParamName: "transposeA", type: "bool", defaultValue: !1 }, { tfParamName: "transpose_b", dlParamName: "transposeB", type: "bool", defaultValue: !1 }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }, { tfOpName: "Transpose", dlOpName: "transpose", category: "matrices", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "perm", dlParamName: "perm", type: "number[]" }, { tfParamName: "T", dlParamName: "dtype", type: "dtype", notSupported: !0 }] }],
      matrices$1 = Object.freeze({ default: matrices }),
      normalization = [{ tfOpName: "FusedBatchNorm", dlOpName: "batchNormalization", category: "normalization", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "scale", type: "tensor" }, { tfInputIndex: 2, dlParamName: "offset", type: "tensor" }, { tfInputIndex: 3, dlParamName: "mean", type: "tensor" }, { tfInputIndex: 4, dlParamName: "variance", type: "tensor" }, { tfParamName: "epsilon", dlParamName: "epsilon", type: "number", defaultValue: .001 }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", notSupported: !0 }] }, { tfOpName: "FusedBatchNormV2", dlOpName: "batchNormalization", category: "normalization", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "scale", type: "tensor" }, { tfInputIndex: 2, dlParamName: "offset", type: "tensor" }, { tfInputIndex: 3, dlParamName: "mean", type: "tensor" }, { tfInputIndex: 4, dlParamName: "variance", type: "tensor" }, { tfParamName: "epsilon", dlParamName: "epsilon", type: "number", defaultValue: .001 }, { tfParamName: "data_format", dlParamName: "dataFormat", type: "string", notSupported: !0 }] }, { tfOpName: "LRN", dlOpName: "localResponseNormalization", category: "normalization", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "depth_radius", dlParamName: "radius", type: "number", defaultValue: 5 }, { tfParamName: "bias", dlParamName: "bias", type: "number", defaultValue: 1 }, { tfParamName: "alpha", dlParamName: "alpha", type: "number", defaultValue: 1 }, { tfParamName: "beta", dlParamName: "beta", type: "number", defaultValue: .5 }] }, { tfOpName: "Softmax", dlOpName: "softmax", category: "normalization", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }] }],
      normalization$1 = Object.freeze({ default: normalization }),
      reduction = [{ tfOpName: "Max", dlOpName: "max", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number[]" }, { tfParamName: "keep_dims", dlParamName: "keepDims", type: "bool" }] }, { tfOpName: "Mean", dlOpName: "mean", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number[]" }, { tfParamName: "keep_dims", dlParamName: "keepDims", type: "bool" }] }, { tfOpName: "Min", dlOpName: "min", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number[]" }, { tfParamName: "keep_dims", dlParamName: "keepDims", type: "bool" }] }, { tfOpName: "Sum", dlOpName: "sum", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number[]" }, { tfParamName: "keep_dims", dlParamName: "keepDims", type: "bool" }] }, { tfOpName: "All", dlOpName: "all", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number[]" }, { tfParamName: "keep_dims", dlParamName: "keepDims", type: "bool" }] }, { tfOpName: "Any", dlOpName: "any", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number[]" }, { tfParamName: "keep_dims", dlParamName: "keepDims", type: "bool" }] }, { tfOpName: "ArgMax", dlOpName: "argMax", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number" }] }, { tfOpName: "ArgMin", dlOpName: "argMin", category: "reduction", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number" }] }],
      reduction$1 = Object.freeze({ default: reduction }),
      slice_join = [{ tfOpName: "ConcatV2", dlOpName: "concat", category: "slice_join", params: [{ tfInputIndex: 0, tfInputParamLength: 1, dlParamName: "tensors", type: "tensors" }, { tfInputIndex: -1, dlParamName: "axis", type: "number" }] }, { tfOpName: "Concat", dlOpName: "concat", category: "slice_join", params: [{ tfInputIndex: 1, tfInputParamLength: 1, dlParamName: "tensors", type: "tensors" }, { tfInputIndex: 0, dlParamName: "axis", type: "number" }] }, { tfOpName: "GatherV2", dlOpName: "gather", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "indices", type: "tensor" }, { tfParamName: "axis", dlParamName: "axis", type: "number", defaultValue: 0 }] }, { tfOpName: "Gather", dlOpName: "gather", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "indices", type: "tensor" }, { tfParamName: "axis", dlParamName: "axis", type: "number", defaultValue: 0 }, { tfParamName: "validate_indices", dlParamName: "validateIndices", type: "bool", notSupported: !0 }] }, { tfOpName: "Reverse", dlOpName: "reverse", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number" }] }, { tfOpName: "ReverseV2", dlOpName: "reverse", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "axis", type: "number" }] }, { tfOpName: "Slice", dlOpName: "slice", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "begin", type: "number[]" }, { tfInputIndex: 2, dlParamName: "size", type: "number[]" }] }, { tfOpName: "StridedSlice", dlOpName: "stridedSlice", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "begin", type: "number[]" }, { tfInputIndex: 2, dlParamName: "end", type: "number[]" }, { tfInputIndex: 3, dlParamName: "strides", type: "number[]" }, { tfParamName: "begin_mask", dlParamName: "beginMask", type: "number", defaultValue: 0 }, { tfParamName: "end_mask", dlParamName: "endMask", type: "number", defaultValue: 0 }] }, { tfOpName: "Pack", dlOpName: "stack", category: "slice_join", params: [{ tfInputIndex: 0, tfInputParamLength: 0, dlParamName: "tensors", type: "tensors" }, { tfParamName: "axis", dlParamName: "axis", type: "number", defaultValue: 0 }] }, { tfOpName: "Unpack", dlOpName: "unstack", category: "slice_join", params: [{ tfInputIndex: 0, tfInputParamLength: 0, dlParamName: "tensor", type: "tensor" }, { tfParamName: "axis", dlParamName: "axis", type: "number", defaultValue: 0 }, { tfParamName: "num", dlParamName: "num", type: "number", defaultValue: 0, notSupported: !0 }] }, { tfOpName: "Tile", dlOpName: "tile", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "reps", type: "number[]" }] }, { tfOpName: "Split", dlOpName: "split", category: "slice_join", params: [{ tfInputIndex: 0, dlParamName: "axis", type: "number", defaultValue: 0 }, { tfInputIndex: 1, dlParamName: "x", type: "tensor" }, { tfParamName: "num_split", dlParamName: "numOrSizeSplits", type: "number", defaultValue: 1 }] }],
      sliceJoin = Object.freeze({ default: slice_join }),
      transformation = [{ tfOpName: "Cast", dlOpName: "cast", category: "transformation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "SrcT", dlParamName: "sdtype", type: "dtype", notSupported: !0 }, { tfParamName: "DstT", dlParamName: "dtype", type: "dtype" }] }, { tfOpName: "ExpandDims", dlOpName: "expandDims", category: "transformation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, tfParamNameDeprecated: "dim", dlParamName: "axis", type: "number" }] }, { tfOpName: "Pad", dlOpName: "pad", category: "transformation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "padding", type: "number[]" }, { tfParamName: "constant_value", dlParamName: "constantValue", type: "number", defaultValue: 0 }] }, { tfOpName: "PadV2", dlOpName: "pad", category: "transformation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "padding", type: "number[]" }, { tfInputIndex: 2, dlParamName: "constantValue", type: "number", defaultValue: 0 }] }, { tfOpName: "Reshape", dlOpName: "reshape", category: "transformation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfInputIndex: 1, dlParamName: "shape", type: "number[]" }] }, { tfOpName: "Squeeze", dlOpName: "squeeze", category: "transformation", params: [{ tfInputIndex: 0, dlParamName: "x", type: "tensor" }, { tfParamName: "axis", tfParamNameDeprecated: "squeeze_dims", dlParamName: "axis", type: "number[]" }] }],
      transformation$1 = Object.freeze({ default: transformation }),
      CONTROL_FLOW_OPS = ["Switch", "Merge", "Enter", "Exit", "NextIteration"],
      OperationMapper = function () {
    function e() {
      var e = [arithmetic$1, basicMath, control$1, convolution$1, creation$1, logical$1, image$2, graph$1, matrices$1, normalization$1, reduction$1, sliceJoin, transformation$1],
          t = [].concat.apply([], e.map(function (e) {
        return e.default ? e.default : e;
      }));this.opMappers = t.reduce(function (e, t) {
        return e[t.tfOpName] = t, e;
      }, {});
    }return Object.defineProperty(e, "Instance", { get: function () {
        return this._instance || (this._instance = new this());
      }, enumerable: !0, configurable: !0 }), e.prototype.isControlFlow = function (e) {
      return CONTROL_FLOW_OPS.some(function (t) {
        return t === e.op;
      });
    }, e.prototype.transformGraph = function (e) {
      var t = this,
          a = !1,
          r = [],
          n = e.node.reduce(function (e, n) {
        return e[n.name] = t.mapNode(n), t.isControlFlow(n) && (a = !0), "Placeholder" === n.op && r.push(e[n.name]), e;
      }, {}),
          o = [],
          i = [];return Object.keys(n).forEach(function (e) {
        var t = n[e];t.inputNames.forEach(function (e) {
          var a = getNodeNameAndIndex(e)[0];t.inputs.push(n[a]), n[a].children.push(t);
        }), 0 === t.inputs.length && o.push(t);
      }), Object.keys(n).forEach(function (e) {
        var t = n[e];0 === t.children.length && i.push(t);
      }), { nodes: n, inputs: o, outputs: i, placeholders: r, withControlFlow: a };
    }, e.prototype.mapNode = function (e) {
      var t = this,
          a = this.opMappers[e.op];if (void 0 === a) throw new Error("Tensorflow Op is not supported: " + e.op);var r = { name: e.name, op: a.dlOpName, category: a.category, inputNames: (e.input || []).map(function (e) {
          return e.startsWith("^") ? e.substr(1) : e;
        }), inputs: [], children: [], params: {} };return a.params && (r.params = a.params.reduce(function (a, r) {
        var n = r.tfInputIndex,
            o = r.tfInputParamLength,
            i = r.type,
            s = void 0;if (void 0 === n) switch (r.type) {case "string":
            void 0 === (s = t.getStringParam(e.attr, r.tfParamName, r.defaultValue)) && r.tfParamNameDeprecated && (s = t.getStringParam(e.attr, r.tfParamNameDeprecated, r.defaultValue));break;case "number":
            void 0 === (s = t.getNumberParam(e.attr, r.tfParamName, r.defaultValue)) && r.tfParamNameDeprecated && (s = t.getNumberParam(e.attr, r.tfParamNameDeprecated, r.defaultValue));break;case "number[]":
            void 0 === (s = t.getNumericArrayParam(e.attr, r.tfParamName, r.defaultValue)) && r.tfParamNameDeprecated && (s = t.getNumericArrayParam(e.attr, r.tfParamNameDeprecated, r.defaultValue));break;case "bool":
            void 0 === (s = t.getBoolParam(e.attr, r.tfParamName, r.defaultValue)) && r.tfParamNameDeprecated && (s = t.getBoolParam(e.attr, r.tfParamNameDeprecated, r.defaultValue));break;case "shape":
            void 0 === (s = t.getTensorShapeParam(e.attr, r.tfParamName, r.defaultValue)) && r.tfParamNameDeprecated && (s = t.getTensorShapeParam(e.attr, r.tfParamNameDeprecated, r.defaultValue));break;case "dtype":
            void 0 === (s = t.getDtypeParam(e.attr, r.tfParamName, r.defaultValue)) && r.tfParamNameDeprecated && (s = t.getDtypeParam(e.attr, r.tfParamNameDeprecated, r.defaultValue));break;case "tensor":case "tensors":
            break;default:
            throw new Error("Unsupported param type: " + r.type + " for op: " + e.op);}return a[r.dlParamName] = { value: s, inputIndex: n, type: i, inputParamLength: o }, a;
      }, {})), r;
    }, e.prototype.getStringParam = function (e, t, a, r) {
      void 0 === r && (r = !1);var n = e[t];if (void 0 !== n) {
        var o = String.fromCharCode.apply(null, n.s);return r ? o : o.toLowerCase();
      }return a;
    }, e.prototype.getBoolParam = function (e, t, a) {
      var r = e[t];return r ? r.b : a;
    }, e.prototype.getNumberParam = function (e, t, a) {
      var r = e[t],
          n = r ? void 0 !== r.f ? r.f : r.i : a;return "number" == typeof n ? n : n.toInt();
    }, e.prototype.getDtypeParam = function (e, t, a) {
      var r = e[t];if (r && r.type) switch (r.type) {case compiled_api_1.DataType.DT_FLOAT:
          return "float32";case compiled_api_1.DataType.DT_INT32:
          return "int32";case compiled_api_1.DataType.DT_BOOL:
          return "bool";default:
          return a;}return a;
    }, e.prototype.getTensorShapeParam = function (e, t, a) {
      var r = e[t];return r && r.shape ? r.shape.dim.map(function (e) {
        return e.size;
      }) : a;
    }, e.prototype.getNumericArrayParam = function (e, t, a) {
      var r = e[t];return r ? (r.list.f && r.list.f.length ? r.list.f : r.list.i).map(function (e) {
        return "number" == typeof e ? e : e.toInt();
      }) : a;
    }, e;
  }(),
      executeOp = function (e, t, a) {
    switch (e.op) {case "add":
        return [add(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "mod":
        return [mod(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "mul":
        return [mul(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "div":
        return [div(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "floorDiv":
        return [floorDiv(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "sub":
        return [sub(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "minimum":
        return [minimum(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "maximum":
        return [maximum(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "pow":
        return [pow(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "squaredDifference":
        return [squaredDifference(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$1 = function (e, t, a) {
    switch (e.op) {case "abs":
        return [abs(getParamValue("x", e, t, a))];case "acos":
        return [acos(getParamValue("x", e, t, a))];case "acosh":
        return [acosh(getParamValue("x", e, t, a))];case "asin":
        return [asin(getParamValue("x", e, t, a))];case "asinh":
        return [asinh(getParamValue("x", e, t, a))];case "atan":
        return [atan(getParamValue("x", e, t, a))];case "atanh":
        return [atanh(getParamValue("x", e, t, a))];case "ceil":
        return [ceil(getParamValue("x", e, t, a))];case "cos":
        return [cos(getParamValue("x", e, t, a))];case "cosh":
        return [cosh(getParamValue("x", e, t, a))];case "elu":
        return [elu(getParamValue("x", e, t, a))];case "erf":
        return [erf(getParamValue("x", e, t, a))];case "exp":
        return [exp(getParamValue("x", e, t, a))];case "expm1":
        return [expm1(getParamValue("x", e, t, a))];case "floor":
        return [floor(getParamValue("x", e, t, a))];case "log":
        return [log(getParamValue("x", e, t, a))];case "log1p":
        return [log1p(getParamValue("x", e, t, a))];case "neg":
        return [neg(getParamValue("x", e, t, a))];case "reciprocal":
        return [reciprocal(getParamValue("x", e, t, a))];case "relu":
        return [relu(getParamValue("x", e, t, a))];case "round":
        return [round(getParamValue("x", e, t, a))];case "selu":
        return [selu(getParamValue("x", e, t, a))];case "sigmoid":
        return [sigmoid(getParamValue("x", e, t, a))];case "sin":
        return [sin(getParamValue("x", e, t, a))];case "sign":
        return [sign(getParamValue("x", e, t, a))];case "sinh":
        return [sinh(getParamValue("x", e, t, a))];case "softplus":
        return [softplus(getParamValue("x", e, t, a))];case "sqrt":
        return [sqrt(getParamValue("x", e, t, a))];case "square":
        return [square(getParamValue("x", e, t, a))];case "tanh":
        return [tanh$1(getParamValue("x", e, t, a))];case "tan":
        return [tan(getParamValue("x", e, t, a))];case "clipByValue":
        return [clipByValue(getParamValue("x", e, t, a), getParamValue("clipValueMin", e, t, a), getParamValue("clipValueMax", e, t, a))];case "rsqrt":
        return [div(scalar(1, "float32"), sqrt(getTensor(e.inputNames[0], t, a)))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  };function executeOp$2(e, t, a) {
    return __awaiter$2(this, void 0, void 0, function () {
      var r, n, o, i, s, p, u;return __generator$2(this, function (l) {
        switch (l.label) {case 0:
            switch (e.op) {case "loopCond":
                return [3, 1];case "switch":
                return [3, 2];case "merge":
                return [3, 4];case "enter":
                return [3, 5];case "exit":
                return [3, 6];case "nextIteration":
                return [3, 7];}return [3, 8];case 1:
            return [2, [getParamValue("pred", e, t, a)]];case 2:
            return r = getParamValue("pred", e, t, a), n = getParamValue("data", e, t, a), [4, r.data()];case 3:
            return [2, l.sent()[0] ? [void 0, n] : [n, void 0]];case 4:
            return [2, (o = e.inputNames.find(function (e) {
              return void 0 !== getTensor(e, t, a);
            })) ? [getTensor(o, t, a)] : void 0];case 5:
            return i = getParamValue("frameName", e, t, a), s = getParamValue("tensor", e, t, a), a.enterFrame(i), [2, [s]];case 6:
            return p = getParamValue("tensor", e, t, a), a.exitFrame(), [2, [p]];case 7:
            return u = getParamValue("tensor", e, t, a), a.nextIteration(), [2, [u]];case 8:
            throw TypeError("Node type " + e.op + " is not implemented");}
      });
    });
  }var executeOp$3 = function (e, t, a) {
    switch (e.op) {case "conv1d":
        var r = getParamValue("stride", e, t, a),
            n = getParamValue("pad", e, t, a),
            o = getParamValue("dataFormat", e, t, a).toUpperCase(),
            i = getParamValue("dilation", e, t, a);return [conv1d(getParamValue("x", e, t, a), getParamValue("filter", e, t, a), r, n, o, i)];case "conv2d":
        r = getParamValue("strides", e, t, a), n = getParamValue("pad", e, t, a), o = getParamValue("dataFormat", e, t, a).toUpperCase();var s = getParamValue("dilations", e, t, a);return [conv2d(getParamValue("x", e, t, a), getParamValue("filter", e, t, a), [r[1], r[2]], n, o, [s[0], s[1]])];case "conv2dTranspose":
        var p = getParamValue("outputShape", e, t, a);r = getParamValue("strides", e, t, a), n = getParamValue("pad", e, t, a);return [conv2dTranspose(getParamValue("x", e, t, a), getParamValue("filter", e, t, a), p, [r[1], r[2]], n)];case "depthwiseConv2d":
        r = getParamValue("strides", e, t, a), n = getParamValue("pad", e, t, a), s = getParamValue("dilations", e, t, a), o = getParamValue("dataFormat", e, t, a).toUpperCase();return [depthwiseConv2d(getParamValue("input", e, t, a), getParamValue("filter", e, t, a), [r[1], r[2]], n, o, [s[0], s[1]])];case "avgPool":
        r = getParamValue("strides", e, t, a), n = getParamValue("pad", e, t, a);var u = getParamValue("kernelSize", e, t, a);return [avgPool(getParamValue("x", e, t, a), [u[1], u[2]], [r[1], r[2]], n)];case "maxPool":
        r = getParamValue("strides", e, t, a), n = getParamValue("pad", e, t, a), u = getParamValue("kernelSize", e, t, a);return [maxPool(getParamValue("x", e, t, a), [u[1], u[2]], [r[1], r[2]], n)];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$4 = function (e, t, a) {
    switch (e.op) {case "fill":
        var r = getParamValue("shape", e, t, a),
            n = getParamValue("value", e, t, a);return [fill(r, n)];case "linspace":
        var o = getParamValue("start", e, t, a),
            i = getParamValue("stop", e, t, a),
            s = getParamValue("num", e, t, a);return [linspace(o, i, s)];case "oneHot":
        var p = getParamValue("indices", e, t, a),
            u = getParamValue("depth", e, t, a),
            l = getParamValue("onValue", e, t, a),
            m = getParamValue("offValue", e, t, a);return [oneHot(p, u, l, m)];case "ones":
        return [ones$1(getParamValue("shape", e, t, a), getParamValue("dtype", e, t, a))];case "onesLike":
        return [onesLike(getParamValue("x", e, t, a))];case "randomUniform":
        return [randomUniform(getParamValue("shape", e, t, a), getParamValue("minval", e, t, a), getParamValue("maxval", e, t, a), getParamValue("dtype", e, t, a))];case "range":
        o = getParamValue("start", e, t, a);var d = getParamValue("stop", e, t, a),
            f = getParamValue("step", e, t, a);return [range(o, d, f, getParamValue("dtype", e, t, a))];case "truncatedNormal":
        r = getParamValue("shape", e, t, a);var c = getParamValue("mean", e, t, a),
            h = getParamValue("stdDev", e, t, a),
            y = getParamValue("seed", e, t, a);return [truncatedNormal(r, c, h, getParamValue("dtype", e, t, a), y)];case "zeros":
        return [zeros(getParamValue("shape", e, t, a), getParamValue("dtype", e, t, a))];case "zerosLike":
        return [zerosLike(getParamValue("x", e, t, a))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$5 = function (e, t, a) {
    switch (e.op) {case "const":
        return t[e.name];case "placeholder":
        var r = getParamValue("default", e, t, a);return [getTensor(e.name, t, a) || r];case "identity":case "stopGradient":case "fakeQuantWithMinMaxVars":
        return [getParamValue("x", e, t, a)];case "snapshot":
        return [getParamValue("x", e, t, a).clone()];case "shape":
        return [tensor1d(getParamValue("x", e, t, a).shape, "int32")];case "size":
        return [scalar(getParamValue("x", e, t, a).size, "int32")];case "rank":
        return [scalar(getParamValue("x", e, t, a).rank, "int32")];case "noop":
        return [];case "print":
        var n = getParamValue("x", e, t, a),
            o = getParamValue("data", e, t, a),
            i = getParamValue("message", e, t, a),
            s = getParamValue("summarize", e, t, a);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."), console.log(i);for (var p = 0; p < o.length; p++) console.log(Array.prototype.slice.call(o[0].dataSync()).slice(0, s));return [n];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$6 = function (e, t, a) {
    switch (e.op) {case "resizeBilinear":
        var r = getParamValue("images", e, t, a),
            n = getParamValue("size", e, t, a),
            o = getParamValue("alignCorners", e, t, a);return [image_ops.resizeBilinear(r, [n[0], n[1]], o)];case "resizeNearestNeighbor":
        r = getParamValue("images", e, t, a), n = getParamValue("size", e, t, a), o = getParamValue("alignCorners", e, t, a);return [image_ops.resizeNearestNeighbor(r, [n[0], n[1]], o)];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$7 = function (e, t, a) {
    switch (e.op) {case "equal":
        return [equal(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "notEqual":
        return [notEqual(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "greater":
        return [greater(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "greaterEqual":
        return [greaterEqual(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "less":
        return [less(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "lessEqual":
        return [lessEqual(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "logicalAnd":
        return [logicalAnd(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "logicalNot":
        return [logicalNot(getParamValue("a", e, t, a))];case "logicalOr":
        return [logicalOr(getParamValue("a", e, t, a), getParamValue("b", e, t, a))];case "where":
        return [where(getParamValue("condition", e, t, a), getParamValue("a", e, t, a), getParamValue("b", e, t, a))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$8 = function (e, t, a) {
    switch (e.op) {case "matMul":
        return [matMul(getParamValue("a", e, t, a), getParamValue("b", e, t, a), getParamValue("transposeA", e, t, a), getParamValue("transposeB", e, t, a))];case "transpose":
        return [transpose(getParamValue("x", e, t, a), getParamValue("perm", e, t, a))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$9 = function (e, t, a) {
    switch (e.op) {case "batchNormalization":
        return [batchNormalization(getParamValue("x", e, t, a), getParamValue("mean", e, t, a), getParamValue("variance", e, t, a), getParamValue("epsilon", e, t, a), getParamValue("scale", e, t, a), getParamValue("offset", e, t, a))];case "localResponseNormalization":
        return [localResponseNormalization(getParamValue("x", e, t, a), getParamValue("radius", e, t, a), getParamValue("bias", e, t, a), getParamValue("alpha", e, t, a), getParamValue("beta", e, t, a))];case "softmax":
        return [softmax(getParamValue("x", e, t, a))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$10 = function (e, t, a) {
    switch (e.op) {case "max":
        var r = getParamValue("axis", e, t, a),
            n = getParamValue("keepDims", e, t, a);return [max(getParamValue("x", e, t, a), r, n)];case "mean":
        r = getParamValue("axis", e, t, a), n = getParamValue("keepDims", e, t, a);return [mean(getParamValue("x", e, t, a), r, n)];case "min":
        r = getParamValue("axis", e, t, a), n = getParamValue("keepDims", e, t, a);return [min(getParamValue("x", e, t, a), r, n)];case "sum":
        r = getParamValue("axis", e, t, a), n = getParamValue("keepDims", e, t, a);return [sum(getParamValue("x", e, t, a), r, n)];case "all":
        r = getParamValue("axis", e, t, a), n = getParamValue("keepDims", e, t, a);return [all(getParamValue("x", e, t, a), r, n)];case "any":
        r = getParamValue("axis", e, t, a), n = getParamValue("keepDims", e, t, a);return [any(getParamValue("x", e, t, a), r, n)];case "argMax":
        r = getParamValue("axis", e, t, a);return [argMax(getParamValue("x", e, t, a), r)];case "argMin":
        r = getParamValue("axis", e, t, a);return [argMin(getParamValue("x", e, t, a), r)];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$11 = function (e, t, a) {
    switch (e.op) {case "concat":
        var r = getParamValue("axis", e, t, a),
            n = getParamValue("tensors", e, t, a);return [concat(n, r)];case "gather":
        r = getParamValue("axis", e, t, a);var o = getParamValue("x", e, t, a),
            i = getParamValue("indices", e, t, a);return [gather(o, i, r)];case "reverse":
        r = getParamValue("axis", e, t, a), o = getParamValue("x", e, t, a);return [reverse(o, r)];case "slice":
        var s = getParamValue("begin", e, t, a),
            p = getParamValue("size", e, t, a);return [slice(getParamValue("x", e, t, a), s, p)];case "stridedSlice":
        s = getParamValue("begin", e, t, a);var u = getParamValue("end", e, t, a),
            l = getParamValue("strides", e, t, a),
            m = getParamValue("beginMask", e, t, a),
            d = getParamValue("endMask", e, t, a);return [stridedSlice(getParamValue("x", e, t, a), s, u, l, m, d)];case "stack":
        return tidy(function () {
          var r = getParamValue("axis", e, t, a),
              n = getParamValue("tensors", e, t, a),
              o = n[0].shape,
              i = n[0].squeeze().shape,
              s = n.map(function (e) {
            var t = util.arraysEqual(e.shape, o);if (!t && !util.arraysEqual(e.squeeze().shape, i)) throw new Error("the input tensors shape does not match");return t ? e : e.reshape(o);
          });return [stack(s, r)];
        });case "unstack":
        return tidy(function () {
          var r = getParamValue("axis", e, t, a),
              n = getParamValue("tensor", e, t, a);return unstack(n, r);
        });case "tile":
        var f = getParamValue("reps", e, t, a);return [tile(getParamValue("x", e, t, a), f)];case "split":
        r = getParamValue("axis", e, t, a);var c = getParamValue("numOrSizeSplits", e, t, a);return split(getParamValue("x", e, t, a), c, r);default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  },
      executeOp$12 = function (e, t, a) {
    switch (e.op) {case "cast":
        return [cast(getParamValue("x", e, t, a), getParamValue("dtype", e, t, a))];case "expandDims":
        var r = e.params.axis.value;return [expandDims(getParamValue("x", e, t, a), r)];case "squeeze":
        r = e.params.axis.value;return [squeeze(getParamValue("x", e, t, a), r)];case "reshape":
        return [reshape(getParamValue("x", e, t, a), getParamValue("shape", e, t, a))];case "pad":
        return [pad(getParamValue("x", e, t, a), split$1(getParamValue("padding", e, t, a), 2), getParamValue("constantValue", e, t, a))];default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  };function executeOp$13(e, t, a) {
    switch (e.category) {case "arithmetic":
        return executeOp(e, t, a);case "basic_math":
        return executeOp$1(e, t, a);case "control":
        return executeOp$2(e, t, a);case "convolution":
        return executeOp$3(e, t, a);case "creation":
        return executeOp$4(e, t, a);case "image":
        return executeOp$6(e, t, a);case "graph":
        return executeOp$5(e, t, a);case "logical":
        return executeOp$7(e, t, a);case "matrices":
        return executeOp$8(e, t, a);case "normalization":
        return executeOp$9(e, t, a);case "reduction":
        return executeOp$10(e, t, a);case "slice_join":
        return executeOp$11(e, t, a);case "transformation":
        return executeOp$12(e, t, a);default:
        throw TypeError("Node type " + e.op + " is not implemented");}
  }var ExecutionContext = function () {
    function e(e) {
      this.weightMap = e, this.rootContext = { id: 0, frameName: "", iterationId: 0 }, this.contexts = [this.rootContext], this.lastId = 0, this.generateCurrentContextIds();
    }return e.prototype.newFrame = function (e, t) {
      return { id: e, frameName: t, iterationId: 0 };
    }, Object.defineProperty(e.prototype, "currentContext", { get: function () {
        return this.contexts;
      }, set: function (e) {
        this.contexts !== e && (this.contexts = e, this.generateCurrentContextIds());
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "currentContextId", { get: function () {
        return this._currentContextIds[0];
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "currentContextIds", { get: function () {
        return this._currentContextIds;
      }, enumerable: !0, configurable: !0 }), e.prototype.generateCurrentContextIds = function () {
      for (var e = [], t = 0; t < this.contexts.length - 1; t++) {
        var a = this.contexts.slice(0, this.contexts.length - t);e.push(this.contextIdforContexts(a));
      }e.push(""), this._currentContextIds = e;
    }, e.prototype.contextIdforContexts = function (e) {
      return e ? e.map(function (e) {
        return 0 === e.id && 0 === e.iterationId ? "" : e.frameName + "-" + e.iterationId;
      }).join("/") : "";
    }, e.prototype.enterFrame = function (e) {
      this.contexts && (this.lastId++, this.contexts = this.contexts.slice(), this.contexts.push(this.newFrame(this.lastId, e)), this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)));
    }, e.prototype.exitFrame = function () {
      if (!(this.contexts && this.contexts.length > 1)) throw new Error("Cannot exit frame, the context is empty");this.contexts = this.contexts.slice(), this.contexts.splice(-1), this.currentContextIds.shift();
    }, e.prototype.nextIteration = function () {
      if (!(this.contexts && this.contexts.length > 0)) throw new Error("Cannot increase frame iteration, the context is empty");this.contexts = this.contexts.slice(), this.lastId++;var e = Object.assign({}, this.contexts[this.contexts.length - 1]);e.iterationId += 1, e.id = this.lastId, this.contexts.splice(-1, 1, e), this._currentContextIds.splice(0, 1, this.contextIdforContexts(this.contexts));
    }, e.prototype.getWeight = function (e) {
      return this.weightMap[e];
    }, e;
  }(),
      GraphExecutor = function () {
    function e(e) {
      this.graph = e, this.compiledOrder = [], this._weightMap = {}, this.placeholders = e.placeholders, this._outputs = e.outputs, this.compile();
    }return Object.defineProperty(e.prototype, "weightMap", { get: function () {
        return this._weightMap;
      }, set: function (e) {
        var t = Object.keys(e).map(function (t) {
          return e[t].map(function (e) {
            return e.id;
          });
        });this.weightIds = [].concat.apply([], t), this._weightMap = e;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "inputs", { get: function () {
        return this.placeholders.map(function (e) {
          return { name: e.name, shape: e.params.shape ? e.params.shape.value : void 0, dtype: e.params.dtype ? e.params.dtype.value : void 0 };
        });
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "outputs", { get: function () {
        return this._outputs.map(function (e) {
          return { name: e.name, shape: e.params.shape ? e.params.shape.value : void 0, dtype: e.params.dtype ? e.params.dtype.value : void 0 };
        });
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "inputNodes", { get: function () {
        return this.placeholders.map(function (e) {
          return e.name;
        });
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "outputNodes", { get: function () {
        return this.outputs.map(function (e) {
          return e.name;
        });
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "isControlFlowModel", { get: function () {
        return this.graph.withControlFlow;
      }, enumerable: !0, configurable: !0 }), e.prototype.compile = function () {
      if (!this.graph.withControlFlow) for (var e = this.graph.inputs.slice(), t = {}; e.length > 0;) {
        var a = e.pop();t[a.name] = !0, this.compiledOrder.push(a), a.children.forEach(function (a) {
          !t[a.name] && a.inputNames.every(function (e) {
            var a = getNodeNameAndIndex(e)[0];return t[a];
          }) && e.push(a);
        });
      }
    }, e.prototype.execute = function (e, t) {
      var a = this;return this.checkInput(e), this.checkInputShapeAndType(e), tidy(function () {
        var r = new ExecutionContext(a._weightMap),
            n = a.compiledOrder.reduce(function (e, t) {
          return e[t.name] = executeOp$13(t, e, r), e;
        }, __assign$2({}, a.weightMap, e));return a.findOutputs(n, r, t);
      });
    }, e.prototype.executeAsync = function (e, t) {
      return __awaiter$2(this, void 0, void 0, function () {
        var a,
            r,
            n,
            o,
            i,
            s,
            p = this;return __generator$2(this, function (u) {
          switch (u.label) {case 0:
              return this.checkInput(e), this.checkInputShapeAndType(e), a = new ExecutionContext(this._weightMap), [4, this.executeWithControlFlow(e, a)];case 1:
              return r = u.sent(), n = this.findOutputs(r, a, t), o = Object.keys(n).map(function (e) {
                return n[e].id;
              }), i = Object.keys(e).map(function (t) {
                return e[t].map(function (e) {
                  return e.id;
                });
              }), s = [].concat.apply([], i), Object.keys(r).forEach(function (e) {
                r[e].forEach(function (e) {
                  e && -1 === o.indexOf(e.id) && -1 === s.indexOf(e.id) && -1 === p.weightIds.indexOf(e.id) && e.dispose();
                });
              }), [2, n];}
        });
      });
    }, e.prototype.executeWithControlFlow = function (e, t) {
      return __awaiter$2(this, void 0, void 0, function () {
        var a, r, n, o, i, s, p, u;return __generator$2(this, function (l) {
          switch (l.label) {case 0:
              a = this.graph.inputs.map(function (e) {
                return { node: e, contexts: t.currentContext };
              }), r = __assign$2({}, this.weightMap, e), n = {}, l.label = 1;case 1:
              return a.length > 0 ? (o = a.pop(), t.currentContext = o.contexts, i = executeOp$13(o.node, r, t), s = getNodeNameAndIndex(o.node.name, t)[0], p = r, u = s, [4, i]) : [3, 3];case 2:
              return p[u] = l.sent(), o.node.children.forEach(function (e) {
                var o = getNodeNameAndIndex(e.name, t)[0];n[o] || ("merge" === e.op ? e.inputNames.some(function (e) {
                  return !!getTensor(e, r, t);
                }) && (n[o] = !0, a.push({ contexts: t.currentContext, node: e })) : e.inputNames.every(function (e) {
                  return !!getTensor(e, r, t);
                }) && (n[o] = !0, a.push({ contexts: t.currentContext, node: e })));
              }), [3, 1];case 3:
              return [2, r];}
        });
      });
    }, e.prototype.findOutputs = function (e, t, a) {
      return !a || a instanceof Array || (a = [a]), (a || this.graph.outputs.map(function (e) {
        return e.name;
      })).reduce(function (a, r) {
        return a[r] = getTensor(r, e, t), a;
      }, {});
    }, e.prototype.dispose = function () {
      var e = this;Object.keys(this.weightMap).forEach(function (t) {
        return e.weightMap[t].forEach(function (e) {
          return e.dispose();
        });
      });
    }, e.prototype.checkInputShapeAndType = function (e) {
      this.placeholders.forEach(function (t) {
        var a = e[t.name][0];if (t.params.shape && t.params.shape.value) {
          var r = t.params.shape.value,
              n = r.length === a.shape.length && a.shape.every(function (e, t) {
            return -1 === r[t] || r[t] === e;
          });util.assert(n, "The shape of dict['" + t.name + "'] provided in model.execute(dict) must be [" + r + "], but was [" + a.shape + "]");
        }t.params.dtype && t.params.dtype.value && util.assert(a.dtype === t.params.dtype.value, "The dtype of dict['" + t.name + "'] provided in model.execute(dict) must be " + t.params.dtype.value + ", but was " + a.dtype);
      });
    }, e.prototype.checkInput = function (e) {
      var t = this,
          a = Object.keys(e),
          r = [],
          n = [];if (this.inputNodes.forEach(function (e) {
        -1 === a.indexOf(e) && r.push(e);
      }), a.forEach(function (e) {
        -1 === t.inputNodes.indexOf(e) && n.push(e);
      }), r.length > 0) throw new Error("The dict provided in model.execute(dict) has the keys [" + a + "], but is missing the required keys: [" + r + "].");if (n.length > 0) throw new Error("The dict provided in model.execute(dict) has unused keys: [" + n + "]. Please provide only the following keys: [" + this.inputNodes + "].");
    }, e;
  }(),
      FrozenModel = function () {
    function e(e, t, a) {
      this.modelUrl = e, this.weightManifestUrl = t, this.requestOption = a, this.version = "n/a", this.pathPrefix = this.getPathPrefix();
    }return Object.defineProperty(e.prototype, "modelVersion", { get: function () {
        return this.version;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "inputNodes", { get: function () {
        return this.executor.inputNodes;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "outputNodes", { get: function () {
        return this.executor.outputNodes;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "inputs", { get: function () {
        return this.executor.inputs;
      }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "outputs", { get: function () {
        return this.executor.outputs;
      }, enumerable: !0, configurable: !0 }), e.prototype.getPathPrefix = function () {
      var e = parse(this.weightManifestUrl),
          t = e.pathname.split("/");return t.splice(-1), e.pathname = t.join("/"), format(e) + "/";
    }, e.prototype.loadRemoteProtoFile = function () {
      return __awaiter$2(this, void 0, void 0, function () {
        var e, t, a, r, n;return __generator$2(this, function (o) {
          switch (o.label) {case 0:
              return o.trys.push([0, 3,, 4]), [4, fetch(this.modelUrl, this.requestOption)];case 1:
              return e = o.sent(), a = (t = compiled_api_1.GraphDef).decode, r = Uint8Array.bind, [4, e.arrayBuffer()];case 2:
              return [2, a.apply(t, [new (r.apply(Uint8Array, [void 0, o.sent()]))()])];case 3:
              throw n = o.sent(), new Error(this.modelUrl + " not found. " + n);case 4:
              return [2];}
        });
      });
    }, e.prototype.loadWeightManifest = function () {
      return __awaiter$2(this, void 0, void 0, function () {
        var e, t, a;return __generator$2(this, function (r) {
          switch (r.label) {case 0:
              return r.trys.push([0, 3,, 4]), [4, fetch(this.weightManifestUrl, this.requestOption)];case 1:
              return e = r.sent(), t = this, [4, e.clone().json()];case 2:
              return t.weightManifest = r.sent(), [3, 4];case 3:
              throw a = r.sent(), new Error(this.weightManifestUrl + " not found. " + a);case 4:
              return [2];}
        });
      });
    }, e.prototype.load = function () {
      return __awaiter$2(this, void 0, void 0, function () {
        var e, t, a, r;return __generator$2(this, function (n) {
          switch (n.label) {case 0:
              return e = this.loadRemoteProtoFile(), t = this.loadWeightManifest(), [4, Promise.all([e, t])];case 1:
              return a = n.sent()[0], this.version = a.versions.producer + "." + a.versions.minConsumer, [4, io.loadWeights(this.weightManifest, this.pathPrefix, void 0, this.requestOption)];case 2:
              return r = n.sent(), this.executor = new GraphExecutor(OperationMapper.Instance.transformGraph(a)), this.executor.weightMap = this.convertTensorMapToTensorsMap(r), [2, !0];}
        });
      });
    }, e.prototype.predict = function (e, t) {
      return this.execute(e, this.outputNodes);
    }, e.prototype.constructTensorMap = function (e) {
      var t = e instanceof Tensor ? [e] : e;if (t.length !== this.inputNodes.length) throw new Error("Input tensor count mismatch,the frozen model has " + this.inputNodes.length + " placeholders, while there are " + t.length + " input tensors.");return this.inputNodes.reduce(function (e, a, r) {
        return e[a] = t[r], e;
      }, {});
    }, e.prototype.execute = function (e, t) {
      if (t = t || this.outputNodes, (e instanceof Tensor || Array.isArray(e)) && (e = this.constructTensorMap(e)), this.executor.isControlFlowModel) throw new Error("The model contains control flow ops, please use executeAsync method");var a = this.executor.execute(this.convertTensorMapToTensorsMap(e), t),
          r = Object.keys(a);return Array.isArray(t) && t.length > 1 ? t.map(function (e) {
        return a[e];
      }) : a[r[0]];
    }, e.prototype.executeAsync = function (e, t) {
      return __awaiter$2(this, void 0, void 0, function () {
        var a, r;return __generator$2(this, function (n) {
          switch (n.label) {case 0:
              if (!this.executor.isControlFlowModel) throw new Error("The model does not contain control flow ops, please use execute method for better performance.");return t = t || this.outputNodes, (e instanceof Tensor || Array.isArray(e)) && (e = this.constructTensorMap(e)), [4, this.executor.executeAsync(this.convertTensorMapToTensorsMap(e), t)];case 1:
              return a = n.sent(), r = Object.keys(a), [2, Array.isArray(t) && t.length > 1 ? t.map(function (e) {
                return a[e];
              }) : a[r[0]]];}
        });
      });
    }, e.prototype.convertTensorMapToTensorsMap = function (e) {
      return Object.keys(e).reduce(function (t, a) {
        return t[a] = [e[a]], t;
      }, {});
    }, e.prototype.dispose = function () {
      this.executor.dispose();
    }, e;
  }();function loadFrozenModel(e, t, a) {
    return __awaiter$2(this, void 0, void 0, function () {
      var r;return __generator$2(this, function (n) {
        switch (n.label) {case 0:
            return [4, (r = new FrozenModel(e, t, a)).load()];case 1:
            return n.sent(), [2, r];}
      });
    });
  }var version$2 = "0.5.1";

  var version$3 = '0.12.2';

  var version$4 = {
      'tfjs-core': version,
      'tfjs-layers': version$1,
      'tfjs-converter': version$2,
      'tfjs': version$3
  };

  exports.version = version$4;
  exports.setBackend = setBackend;
  exports.getBackend = getBackend;
  exports.disposeVariables = disposeVariables;
  exports.memory = memory;
  exports.version_core = version;
  exports.nextFrame = nextFrame;
  exports.environment = environment;
  exports.io = io;
  exports.serialization = serialization;
  exports.test_util = test_util;
  exports.util = util;
  exports.webgl = webgl;
  exports.AdadeltaOptimizer = AdadeltaOptimizer;
  exports.AdagradOptimizer = AdagradOptimizer;
  exports.AdamOptimizer = AdamOptimizer;
  exports.AdamaxOptimizer = AdamaxOptimizer;
  exports.MomentumOptimizer = MomentumOptimizer;
  exports.Optimizer = Optimizer;
  exports.RMSPropOptimizer = RMSPropOptimizer;
  exports.SGDOptimizer = SGDOptimizer;
  exports.Tensor = Tensor;
  exports.TensorBuffer = TensorBuffer;
  exports.variable = variable;
  exports.Variable = Variable;
  exports.ENV = ENV;
  exports.Environment = Environment;
  exports.doc = doc;
  exports.image = image_ops;
  exports.linalg = linalg_ops;
  exports.losses = loss_ops;
  exports.op = op;
  exports.batchNormalization2d = batchNormalization2d;
  exports.batchNormalization3d = batchNormalization3d;
  exports.batchNormalization4d = batchNormalization4d;
  exports.batchNormalization = batchNormalization;
  exports.concat = concat;
  exports.concat1d = concat1d;
  exports.concat2d = concat2d;
  exports.concat3d = concat3d;
  exports.concat4d = concat4d;
  exports.conv1d = conv1d;
  exports.conv2d = conv2d;
  exports.depthwiseConv2d = depthwiseConv2d;
  exports.separableConv2d = separableConv2d;
  exports.conv2dTranspose = conv2dTranspose;
  exports.matMul = matMul;
  exports.dot = dot;
  exports.outerProduct = outerProduct;
  exports.reverse = reverse;
  exports.reverse1d = reverse1d;
  exports.reverse2d = reverse2d;
  exports.reverse3d = reverse3d;
  exports.reverse4d = reverse4d;
  exports.maxPool = maxPool;
  exports.avgPool = avgPool;
  exports.slice = slice;
  exports.slice1d = slice1d;
  exports.slice2d = slice2d;
  exports.slice3d = slice3d;
  exports.slice4d = slice4d;
  exports.abs = abs;
  exports.acos = acos;
  exports.acosh = acosh;
  exports.asin = asin;
  exports.asinh = asinh;
  exports.atan = atan;
  exports.atanh = atanh;
  exports.ceil = ceil;
  exports.clipByValue = clipByValue;
  exports.cos = cos;
  exports.cosh = cosh;
  exports.erf = erf;
  exports.exp = exp;
  exports.expm1 = expm1;
  exports.floor = floor;
  exports.log = log;
  exports.log1p = log1p;
  exports.logSigmoid = logSigmoid;
  exports.neg = neg;
  exports.reciprocal = reciprocal;
  exports.round = round;
  exports.rsqrt = rsqrt;
  exports.sigmoid = sigmoid;
  exports.sign = sign;
  exports.sin = sin;
  exports.sinh = sinh;
  exports.softplus = softplus;
  exports.sqrt = sqrt;
  exports.square = square;
  exports.step = step;
  exports.tan = tan;
  exports.tanh = tanh$1;
  exports.all = all;
  exports.any = any;
  exports.argMax = argMax;
  exports.argMin = argMin;
  exports.logSumExp = logSumExp;
  exports.max = max;
  exports.mean = mean;
  exports.min = min;
  exports.moments = moments;
  exports.sum = sum;
  exports.equal = equal;
  exports.equalStrict = equalStrict;
  exports.greater = greater;
  exports.greaterEqual = greaterEqual;
  exports.greaterEqualStrict = greaterEqualStrict;
  exports.greaterStrict = greaterStrict;
  exports.less = less;
  exports.lessEqual = lessEqual;
  exports.lessEqualStrict = lessEqualStrict;
  exports.lessStrict = lessStrict;
  exports.notEqual = notEqual;
  exports.notEqualStrict = notEqualStrict;
  exports.add = add;
  exports.addStrict = addStrict;
  exports.atan2 = atan2;
  exports.div = div;
  exports.divStrict = divStrict;
  exports.floorDiv = floorDiv;
  exports.maximum = maximum;
  exports.maximumStrict = maximumStrict;
  exports.minimum = minimum;
  exports.minimumStrict = minimumStrict;
  exports.mod = mod;
  exports.modStrict = modStrict;
  exports.mul = mul;
  exports.mulStrict = mulStrict;
  exports.pow = pow;
  exports.powStrict = powStrict;
  exports.squaredDifference = squaredDifference;
  exports.squaredDifferenceStrict = squaredDifferenceStrict;
  exports.sub = sub;
  exports.subStrict = subStrict;
  exports.sigmoidCrossEntropyWithLogits = sigmoidCrossEntropyWithLogits;
  exports.elu = elu;
  exports.leakyRelu = leakyRelu;
  exports.prelu = prelu;
  exports.relu = relu;
  exports.selu = selu;
  exports.logicalAnd = logicalAnd;
  exports.logicalNot = logicalNot;
  exports.logicalOr = logicalOr;
  exports.logicalXor = logicalXor;
  exports.where = where;
  exports.buffer = buffer;
  exports.toPixels = toPixels;
  exports.cast = cast;
  exports.clone = clone;
  exports.cumsum = cumsum;
  exports.expandDims = expandDims;
  exports.eye = eye;
  exports.fromPixels = fromPixels;
  exports.multinomial = multinomial;
  exports.oneHot = oneHot;
  exports.pad = pad;
  exports.pad1d = pad1d;
  exports.pad2d = pad2d;
  exports.pad3d = pad3d;
  exports.pad4d = pad4d;
  exports.print = print;
  exports.rand = rand;
  exports.randomNormal = randomNormal;
  exports.randomUniform = randomUniform;
  exports.reshape = reshape;
  exports.split = split;
  exports.squeeze = squeeze;
  exports.stack = stack;
  exports.tile = tile;
  exports.truncatedNormal = truncatedNormal;
  exports.unstack = unstack;
  exports.fill = fill;
  exports.linspace = linspace;
  exports.ones = ones$1;
  exports.range = range;
  exports.scalar = scalar;
  exports.tensor = tensor;
  exports.tensor1d = tensor1d;
  exports.tensor2d = tensor2d;
  exports.tensor3d = tensor3d;
  exports.tensor4d = tensor4d;
  exports.tensor5d = tensor5d;
  exports.tensor6d = tensor6d;
  exports.zeros = zeros;
  exports.onesLike = onesLike;
  exports.zerosLike = zerosLike;
  exports.transpose = transpose;
  exports.softmax = softmax;
  exports.localResponseNormalization = localResponseNormalization;
  exports.norm = norm;
  exports.gather = gather;
  exports.unsortedSegmentSum = unsortedSegmentSum;
  exports.basicLSTMCell = basicLSTMCell;
  exports.multiRNNCell = multiRNNCell;
  exports.movingAverage = movingAverage;
  exports.stridedSlice = stridedSlice;
  exports.train = train;
  exports.tidy = tidy;
  exports.keep = keep;
  exports.dispose = dispose;
  exports.time = time;
  exports.grad = grad;
  exports.valueAndGrad = valueAndGrad;
  exports.grads = grads;
  exports.valueAndGrads = valueAndGrads;
  exports.variableGrads = variableGrads;
  exports.customGrad = customGrad;
  exports.model = model;
  exports.sequential = sequential;
  exports.loadModel = loadModel;
  exports.input = input;
  exports.layers = layers;
  exports.constraints = constraints;
  exports.initializers = initializers;
  exports.metrics = metrics;
  exports.regularizers = regularizers;
  exports.CallbackList = CallbackList;
  exports.CustomCallback = CustomCallback;
  exports.Callback = Callback;
  exports.SymbolicTensor = SymbolicTensor;
  exports.Model = Model;
  exports.RNN = RNN;
  exports.Sequential = Sequential;
  exports.version_layers = version$1;
  exports.FrozenModel = FrozenModel;
  exports.loadFrozenModel = loadFrozenModel;
  exports.version_converter = version$2;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tf.js.map
