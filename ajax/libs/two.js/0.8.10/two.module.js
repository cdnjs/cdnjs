/*
MIT License

Copyright (c) 2012 - 2021 @jonobr1 / http://jono.fyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/utils/path-commands.js
var Commands = {
  move: "M",
  line: "L",
  curve: "C",
  arc: "A",
  close: "Z"
};

// src/utils/math.js
var math_exports = {};
__export(math_exports, {
  HALF_PI: () => HALF_PI,
  NumArray: () => NumArray,
  TWO_PI: () => TWO_PI,
  decomposeMatrix: () => decomposeMatrix,
  getComputedMatrix: () => getComputedMatrix,
  getPoT: () => getPoT,
  lerp: () => lerp,
  mod: () => mod,
  setMatrix: () => setMatrix,
  toFixed: () => toFixed
});

// src/utils/root.js
var root;
if (typeof window !== "undefined") {
  root = window;
} else if (typeof global !== "undefined") {
  root = global;
} else if (typeof self !== "undefined") {
  root = self;
}

// src/utils/math.js
var Matrix;
var TWO_PI = Math.PI * 2;
var HALF_PI = Math.PI * 0.5;
function decomposeMatrix(matrix3, b, c, d, e, f) {
  let a;
  if (arguments.length <= 1) {
    a = matrix3.a;
    b = matrix3.b;
    c = matrix3.c;
    d = matrix3.d;
    e = matrix3.e;
    f = matrix3.f;
  } else {
    a = matrix3;
  }
  return {
    translateX: e,
    translateY: f,
    scaleX: Math.sqrt(a * a + b * b),
    scaleY: Math.sqrt(c * c + d * d),
    rotation: 180 * Math.atan2(b, a) / Math.PI
  };
}
function setMatrix(matrix3) {
  Matrix = matrix3;
}
function getComputedMatrix(object, matrix3) {
  matrix3 = matrix3 && matrix3.identity() || new Matrix();
  let parent = object;
  const matrices = [];
  while (parent && parent._matrix) {
    matrices.push(parent._matrix);
    parent = parent.parent;
  }
  matrices.reverse();
  for (let i = 0; i < matrices.length; i++) {
    const m = matrices[i];
    const e = m.elements;
    matrix3.multiply(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);
  }
  return matrix3;
}
function lerp(a, b, t) {
  return t * (b - a) + a;
}
var pots = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
function getPoT(value) {
  let i = 0;
  while (pots[i] && pots[i] < value) {
    i++;
  }
  return pots[i];
}
function mod(v, l) {
  while (v < 0) {
    v += l;
  }
  return v % l;
}
var NumArray = root.Float32Array || Array;
var floor = Math.floor;
function toFixed(v) {
  return floor(v * 1e6) / 1e6;
}

// src/utils/curves.js
var curves_exports = {};
__export(curves_exports, {
  Curve: () => Curve,
  getAnchorsFromArcData: () => getAnchorsFromArcData,
  getComponentOnCubicBezier: () => getComponentOnCubicBezier,
  getControlPoints: () => getControlPoints,
  getCurveBoundingBox: () => getCurveBoundingBox,
  getCurveFromPoints: () => getCurveFromPoints,
  getCurveLength: () => getCurveLength,
  getReflection: () => getReflection,
  integrate: () => integrate,
  subdivide: () => subdivide
});

// src/events.js
var Events = class {
  constructor() {
    __publicField(this, "_events", {});
    __publicField(this, "_bound", false);
  }
  addEventListener(name, handler) {
    const list = this._events[name] || (this._events[name] = []);
    list.push(handler);
    this._bound = true;
    return this;
  }
  on() {
    return this.addEventListener.apply(this, arguments);
  }
  bind() {
    return this.addEventListener.apply(this, arguments);
  }
  removeEventListener(name, handler) {
    if (!this._events) {
      return this;
    }
    if (!name && !handler) {
      this._events = {};
      this._bound = false;
      return this;
    }
    const names = name ? [name] : Object.keys(this._events);
    for (let i = 0, l = names.length; i < l; i++) {
      name = names[i];
      let list = this._events[name];
      if (list) {
        let events = [];
        if (handler) {
          for (let j = 0, k = list.length; j < k; j++) {
            let e = list[j];
            e = e.handler ? e.handler : e;
            if (handler !== e) {
              events.push(e);
            }
          }
        }
        this._events[name] = events;
      }
    }
    return this;
  }
  off() {
    return this.removeEventListener.apply(this, arguments);
  }
  unbind() {
    return this.removeEventListener.apply(this, arguments);
  }
  dispatchEvent(name) {
    if (!this._events) {
      return this;
    }
    const args = Array.prototype.slice.call(arguments, 1);
    const events = this._events[name];
    if (events) {
      for (let i = 0; i < events.length; i++) {
        events[i].call(this, ...args);
      }
    }
    return this;
  }
  trigger() {
    return this.dispatchEvent.apply(this, arguments);
  }
  listen(obj, name, handler) {
    const scope = this;
    if (obj) {
      e.obj = obj;
      e.name = name;
      e.handler = handler;
      obj.on(name, e);
    }
    function e() {
      handler.apply(scope, arguments);
    }
    return scope;
  }
  ignore(obj, name, handler) {
    obj.off(name, handler);
    return this;
  }
};
__publicField(Events, "Types", {
  play: "play",
  pause: "pause",
  update: "update",
  render: "render",
  resize: "resize",
  change: "change",
  remove: "remove",
  insert: "insert",
  order: "order",
  load: "load"
});
__publicField(Events, "Methods", [
  "addEventListener",
  "on",
  "removeEventListener",
  "off",
  "unbind",
  "dispatchEvent",
  "trigger",
  "listen",
  "ignore"
]);

// src/vector.js
var proto = {
  x: {
    enumerable: true,
    get: function() {
      return this._x;
    },
    set: function(v) {
      if (this._x !== v) {
        this._x = v;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  y: {
    enumerable: true,
    get: function() {
      return this._y;
    },
    set: function(v) {
      if (this._y !== v) {
        this._y = v;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  }
};
var _Vector = class extends Events {
  constructor(x = 0, y = 0) {
    super();
    __publicField(this, "_x", 0);
    __publicField(this, "_y", 0);
    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }
    this.x = x;
    this.y = y;
  }
  static add(v1, v2) {
    return new _Vector(v1.x + v2.x, v1.y + v2.y);
  }
  static sub(v1, v2) {
    return new _Vector(v1.x - v2.x, v1.y - v2.y);
  }
  static subtract(v1, v2) {
    return _Vector.sub(v1, v2);
  }
  static ratioBetween(v1, v2) {
    return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());
  }
  static angleBetween(v1, v2) {
    if (arguments.length >= 4) {
      const dx2 = arguments[0] - arguments[2];
      const dy2 = arguments[1] - arguments[3];
      return Math.atan2(dy2, dx2);
    }
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.atan2(dy, dx);
  }
  static distanceBetween(v1, v2) {
    return Math.sqrt(_Vector.distanceBetweenSquared(v1, v2));
  }
  static distanceBetweenSquared(v1, v2) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return dx * dx + dy * dy;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  clear() {
    this.x = 0;
    this.y = 0;
    return this;
  }
  clone() {
    return new _Vector(this.x, this.y);
  }
  add(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === "number") {
        this.x += x;
        this.y += x;
      } else if (x && typeof x.x === "number" && typeof x.y === "number") {
        this.x += x.x;
        this.y += x.y;
      }
    } else {
      this.x += x;
      this.y += y;
    }
    return this;
  }
  addSelf(v) {
    return this.add.apply(this, arguments);
  }
  sub(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === "number") {
        this.x -= x;
        this.y -= x;
      } else if (x && typeof x.x === "number" && typeof x.y === "number") {
        this.x -= x.x;
        this.y -= x.y;
      }
    } else {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }
  subtract() {
    return this.sub.apply(this, arguments);
  }
  subSelf(v) {
    return this.sub.apply(this, arguments);
  }
  subtractSelf(v) {
    return this.sub.apply(this, arguments);
  }
  multiply(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === "number") {
        this.x *= x;
        this.y *= x;
      } else if (x && typeof x.x === "number" && typeof x.y === "number") {
        this.x *= x.x;
        this.y *= x.y;
      }
    } else {
      this.x *= x;
      this.y *= y;
    }
    return this;
  }
  multiplySelf(v) {
    return this.multiply.apply(this, arguments);
  }
  multiplyScalar(s) {
    return this.multiply(s);
  }
  divide(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === "number") {
        this.x /= x;
        this.y /= x;
      } else if (x && typeof x.x === "number" && typeof x.y === "number") {
        this.x /= x.x;
        this.y /= x.y;
      }
    } else {
      this.x /= x;
      this.y /= y;
    }
    if (isNaN(this.x)) {
      this.x = 0;
    }
    if (isNaN(this.y)) {
      this.y = 0;
    }
    return this;
  }
  divideSelf(v) {
    return this.divide.apply(this, arguments);
  }
  divideScalar(s) {
    return this.divide(s);
  }
  negate() {
    return this.multiply(-1);
  }
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  normalize() {
    return this.divideScalar(this.length());
  }
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  distanceToSquared(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }
  setLength(l) {
    return this.normalize().multiplyScalar(l);
  }
  equals(v, eps) {
    eps = typeof eps === "undefined" ? 1e-4 : eps;
    return this.distanceTo(v) < eps;
  }
  lerp(v, t) {
    const x = (v.x - this.x) * t + this.x;
    const y = (v.y - this.y) * t + this.y;
    return this.set(x, y);
  }
  isZero(eps) {
    eps = typeof eps === "undefined" ? 1e-4 : eps;
    return this.length() < eps;
  }
  toString() {
    return this.x + ", " + this.y;
  }
  toObject() {
    return { x: this.x, y: this.y };
  }
  rotate(radians) {
    const x = this.x;
    const y = this.y;
    const cos7 = Math.cos(radians);
    const sin7 = Math.sin(radians);
    this.x = x * cos7 - y * sin7;
    this.y = x * sin7 + y * cos7;
    return this;
  }
};
var Vector = _Vector;
__publicField(Vector, "zero", new _Vector());
__publicField(Vector, "left", new _Vector(-1, 0));
__publicField(Vector, "right", new _Vector(1, 0));
__publicField(Vector, "up", new _Vector(0, -1));
__publicField(Vector, "down", new _Vector(0, 1));

// src/anchor.js
var Anchor = class extends Vector {
  constructor(x = 0, y = 0, ax = 0, ay = 0, bx = 0, by = 0, command = Commands.move) {
    super(x, y);
    __publicField(this, "controls", {
      left: new Vector(),
      right: new Vector()
    });
    __publicField(this, "_command", Commands.move);
    __publicField(this, "_relative", true);
    __publicField(this, "_rx", 0);
    __publicField(this, "_ry", 0);
    __publicField(this, "_xAxisRotation", 0);
    __publicField(this, "_largeArcFlag", 0);
    __publicField(this, "_sweepFlag", 1);
    for (let prop in proto2) {
      Object.defineProperty(this, prop, proto2[prop]);
    }
    this.command = command;
    this.relative = true;
    const broadcast = Anchor.makeBroadcast(this);
    this.controls.left.set(ax, ay).addEventListener(Events.Types.change, broadcast);
    this.controls.right.set(bx, by).addEventListener(Events.Types.change, broadcast);
  }
  static makeBroadcast(scope) {
    return broadcast;
    function broadcast() {
      if (scope._bound) {
        scope.dispatchEvent(Events.Types.change);
      }
    }
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    if (typeof v.command === "string") {
      this.command = v.command;
    }
    if (v.controls) {
      if (v.controls.left) {
        this.controls.left.copy(v.controls.left);
      }
      if (v.controls.right) {
        this.controls.right.copy(v.controls.right);
      }
    }
    if (typeof v.relative === "boolean") {
      this.relative = v.relative;
    }
    if (typeof v.rx === "number") {
      this.rx = v.rx;
    }
    if (typeof v.ry === "number") {
      this.ry = v.ry;
    }
    if (typeof v.xAxisRotation === "number") {
      this.xAxisRotation = v.xAxisRotation;
    }
    if (typeof v.largeArcFlag === "number") {
      this.largeArcFlag = v.largeArcFlag;
    }
    if (typeof v.sweepFlag === "number") {
      this.sweepFlag = v.sweepFlag;
    }
    return this;
  }
  clone() {
    return new Anchor().copy(this);
  }
  toObject() {
    return {
      x: this.x,
      y: this.y,
      command: this.command,
      relative: this.relative,
      controls: {
        left: this.controls.left.toObject(),
        right: this.controls.right.toObject()
      },
      rx: this.rx,
      ry: this.ry,
      xAxisRotation: this.xAxisRotation,
      largeArcFlag: this.largeArcFlag,
      sweepFlag: this.sweepFlag
    };
  }
  toString() {
    return JSON.stringify(this.toObject());
  }
};
var proto2 = {
  command: {
    enumerable: true,
    get: function() {
      return this._command;
    },
    set: function(command) {
      if (this._command !== command) {
        this._command = command;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  relative: {
    enumerable: true,
    get: function() {
      return this._relative;
    },
    set: function(relative) {
      if (this._relative !== !!relative) {
        this._relative = !!relative;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  rx: {
    enumerable: true,
    get: function() {
      return this._rx;
    },
    set: function(rx) {
      if (this._rx !== rx) {
        this._rx = rx;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  ry: {
    enumerable: true,
    get: function() {
      return this._ry;
    },
    set: function(ry) {
      if (this._ry !== ry) {
        this._ry = ry;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  xAxisRotation: {
    enumerable: true,
    get: function() {
      return this._xAxisRotation;
    },
    set: function(xAxisRotation) {
      if (this._xAxisRotation !== xAxisRotation) {
        this._xAxisRotation = xAxisRotation;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  largeArcFlag: {
    enumerable: true,
    get: function() {
      return this._largeArcFlag;
    },
    set: function(largeArcFlag) {
      if (this._largeArcFlag !== largeArcFlag) {
        this._largeArcFlag = largeArcFlag;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  },
  sweepFlag: {
    get: function() {
      return this._sweepFlag;
    },
    set: function(sweepFlag) {
      if (this._sweepFlag !== sweepFlag) {
        this._sweepFlag = sweepFlag;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    }
  }
};

// src/constants.js
var count = 0;
var Constants = {
  nextFrameID: null,
  Types: {
    webgl: "WebGLRenderer",
    svg: "SVGRenderer",
    canvas: "CanvasRenderer"
  },
  Version: "v0.8.10",
  PublishDate: "2022-06-09T16:09:22.888Z",
  Identifier: "two-",
  Resolution: 12,
  AutoCalculateImportedMatrices: true,
  Instances: [],
  uniqueId: function() {
    return count++;
  }
};

// src/utils/curves.js
var Curve = {
  CollinearityEpsilon: Math.pow(10, -30),
  RecursionLimit: 16,
  CuspLimit: 0,
  Tolerance: {
    distance: 0.25,
    angle: 0,
    epsilon: Number.EPSILON
  },
  abscissas: [
    [0.5773502691896257],
    [0, 0.7745966692414834],
    [0.33998104358485626, 0.8611363115940526],
    [0, 0.5384693101056831, 0.906179845938664],
    [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
    [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
    [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
    [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
    [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
    [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
    [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
    [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
    [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
    [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
    [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]
  ],
  weights: [
    [1],
    [0.8888888888888888, 0.5555555555555556],
    [0.6521451548625461, 0.34785484513745385],
    [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
    [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
    [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
    [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
    [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
    [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
    [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
    [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
    [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
    [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
    [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
    [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]
  ]
};
function getComponentOnCubicBezier(t, a, b, c, d) {
  const k = 1 - t;
  return k * k * k * a + 3 * k * k * t * b + 3 * k * t * t * c + t * t * t * d;
}
function subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
  limit = limit || Curve.RecursionLimit;
  const amount = limit + 1;
  if (Math.abs(x1 - x4) < 1e-3 && Math.abs(y1 - y4) < 1e-3) {
    return [new Anchor(x4, y4)];
  }
  const result = [];
  for (let i = 0; i < amount; i++) {
    const t = i / amount;
    const x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
    const y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
    result.push(new Anchor(x, y));
  }
  return result;
}
function getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
  if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
    const dx = x4 - x1;
    const dy = y4 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  const ax = 9 * (x2 - x3) + 3 * (x4 - x1), bx = 6 * (x1 + x3) - 12 * x2, cx = 3 * (x2 - x1), ay = 9 * (y2 - y3) + 3 * (y4 - y1), by = 6 * (y1 + y3) - 12 * y2, cy = 3 * (y2 - y1);
  function integrand(t) {
    const dx = (ax * t + bx) * t + cx, dy = (ay * t + by) * t + cy;
    return Math.sqrt(dx * dx + dy * dy);
  }
  return integrate(integrand, 0, 1, limit || Curve.RecursionLimit);
}
function getCurveBoundingBox(x1, y1, x2, y2, x3, y3, x4, y4) {
  const tvalues = [];
  const bounds = [[], []];
  let a, b, c, t, t1, t2, b2ac, sqrtb2ac;
  for (let i = 0; i < 2; ++i) {
    if (i == 0) {
      b = 6 * x1 - 12 * x2 + 6 * x3;
      a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
      c = 3 * x2 - 3 * x1;
    } else {
      b = 6 * y1 - 12 * y2 + 6 * y3;
      a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
      c = 3 * y2 - 3 * y1;
    }
    if (Math.abs(a) < 1e-12) {
      if (Math.abs(b) < 1e-12) {
        continue;
      }
      t = -c / b;
      if (0 < t && t < 1) {
        tvalues.push(t);
      }
      continue;
    }
    b2ac = b * b - 4 * c * a;
    sqrtb2ac = Math.sqrt(b2ac);
    if (b2ac < 0) {
      continue;
    }
    t1 = (-b + sqrtb2ac) / (2 * a);
    if (0 < t1 && t1 < 1) {
      tvalues.push(t1);
    }
    t2 = (-b - sqrtb2ac) / (2 * a);
    if (0 < t2 && t2 < 1) {
      tvalues.push(t2);
    }
  }
  let j = tvalues.length;
  let jlen = j;
  let mt;
  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    bounds[0][j] = mt * mt * mt * x1 + 3 * mt * mt * t * x2 + 3 * mt * t * t * x3 + t * t * t * x4;
    bounds[1][j] = mt * mt * mt * y1 + 3 * mt * mt * t * y2 + 3 * mt * t * t * y3 + t * t * t * y4;
  }
  bounds[0][jlen] = x1;
  bounds[1][jlen] = y1;
  bounds[0][jlen + 1] = x4;
  bounds[1][jlen + 1] = y4;
  bounds[0].length = bounds[1].length = jlen + 2;
  return {
    min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
    max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) }
  };
}
function integrate(f, a, b, n) {
  let x = Curve.abscissas[n - 2], w = Curve.weights[n - 2], A = 0.5 * (b - a), B = A + a, i = 0, m = n + 1 >> 1, sum = n & 1 ? w[i++] * f(B) : 0;
  while (i < m) {
    const Ax = A * x[i];
    sum += w[i++] * (f(B + Ax) + f(B - Ax));
  }
  return A * sum;
}
function getCurveFromPoints(points, closed2) {
  const l = points.length, last = l - 1;
  for (let i = 0; i < l; i++) {
    const point = points[i];
    const prev = closed2 ? mod(i - 1, l) : Math.max(i - 1, 0);
    const next = closed2 ? mod(i + 1, l) : Math.min(i + 1, last);
    const a = points[prev];
    const b = point;
    const c = points[next];
    getControlPoints(a, b, c);
    b.command = i === 0 ? Commands.move : Commands.curve;
  }
}
function getControlPoints(a, b, c) {
  const a1 = Vector.angleBetween(a, b);
  const a2 = Vector.angleBetween(c, b);
  let d1 = Vector.distanceBetween(a, b);
  let d2 = Vector.distanceBetween(c, b);
  let mid = (a1 + a2) / 2;
  if (d1 < 1e-4 || d2 < 1e-4) {
    if (typeof b.relative === "boolean" && !b.relative) {
      b.controls.left.copy(b);
      b.controls.right.copy(b);
    }
    return b;
  }
  d1 *= 0.33;
  d2 *= 0.33;
  if (a2 < a1) {
    mid += HALF_PI;
  } else {
    mid -= HALF_PI;
  }
  b.controls.left.x = Math.cos(mid) * d1;
  b.controls.left.y = Math.sin(mid) * d1;
  mid -= Math.PI;
  b.controls.right.x = Math.cos(mid) * d2;
  b.controls.right.y = Math.sin(mid) * d2;
  if (typeof b.relative === "boolean" && !b.relative) {
    b.controls.left.x += b.x;
    b.controls.left.y += b.y;
    b.controls.right.x += b.x;
    b.controls.right.y += b.y;
  }
  return b;
}
function getReflection(a, b, relative) {
  return new Vector(2 * a.x - (b.x + a.x) - (relative ? a.x : 0), 2 * a.y - (b.y + a.y) - (relative ? a.y : 0));
}
function getAnchorsFromArcData(center, xAxisRotation, rx, ry, ts, td, ccw) {
  const resolution = Constants.Resolution;
  const anchors = [];
  for (let i = 0; i < resolution; i++) {
    let pct = (i + 1) / resolution;
    if (ccw) {
      pct = 1 - pct;
    }
    const theta = pct * td + ts;
    const x = rx * Math.cos(theta);
    const y = ry * Math.sin(theta);
    const anchor2 = new Anchor(x, y);
    anchor2.command = Commands.line;
    anchors.push(anchor2);
  }
}

// src/utils/device-pixel-ratio.js
var devicePixelRatio = root.devicePixelRatio || 1;
function getBackingStoreRatio(ctx) {
  return ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
}
function getRatio(ctx) {
  return devicePixelRatio / getBackingStoreRatio(ctx);
}

// src/utils/underscore.js
var slice = Array.prototype.slice;
function isArrayLike(collection) {
  if (collection === null || collection === void 0)
    return false;
  const length = collection.length;
  return typeof length == "number" && length >= 0 && length < 4294967296;
}
var _ = {
  isNaN: function(obj) {
    return typeof obj === "number" && obj !== +obj;
  },
  isElement: function(obj) {
    return !!(obj && obj.nodeType === 1);
  },
  isObject: function(obj) {
    const type = typeof obj;
    return type === "function" || type === "object" && !!obj;
  },
  extend: function(base) {
    const sources = slice.call(arguments, 1);
    for (let i = 0; i < sources.length; i++) {
      const obj = sources[i];
      for (let k in obj) {
        base[k] = obj[k];
      }
    }
    return base;
  },
  defaults: function(base) {
    const sources = slice.call(arguments, 1);
    for (let i = 0; i < sources.length; i++) {
      const obj = sources[i];
      for (let k in obj) {
        if (base[k] === void 0) {
          base[k] = obj[k];
        }
      }
    }
    return base;
  },
  each: function(obj, iteratee, context) {
    const ctx = context || this;
    const keys = !isArrayLike(obj) && Object.keys(obj);
    const length = (keys || obj).length;
    for (let i = 0; i < length; i++) {
      const k = keys ? keys[i] : i;
      iteratee.call(ctx, obj[k], k, obj);
    }
    return obj;
  },
  performance: root.performance && root.performance.now ? root.performance : Date
};

// src/element.js
var Element = class extends Events {
  constructor() {
    super();
    __publicField(this, "_flagId", false);
    __publicField(this, "_flagClassName", false);
    __publicField(this, "_renderer", {});
    __publicField(this, "_id", "");
    __publicField(this, "_className", "");
    __publicField(this, "classList", []);
    for (let prop in proto3) {
      Object.defineProperty(this, prop, proto3[prop]);
    }
  }
  flagReset() {
    this._flagId = this._flagClassName = false;
  }
};
var proto3 = {
  renderer: {
    enumerable: false,
    get: function() {
      return this._renderer;
    }
  },
  id: {
    enumerable: true,
    get: function() {
      return this._id;
    },
    set: function(v) {
      const id = this._id;
      if (v === this._id) {
        return;
      }
      this._id = v;
      this._flagId = true;
      if (this.parent) {
        delete this.parent.children.ids[id];
        this.parent.children.ids[this._id] = this;
      }
    }
  },
  className: {
    enumerable: true,
    get: function() {
      return this._className;
    },
    set: function(v) {
      if (this._className !== v) {
        this._flagClassName = true;
        this.classList = v.split(/\s+?/);
        this._className = v;
      }
    }
  }
};

// src/matrix.js
var cos = Math.cos;
var sin = Math.sin;
var tan = Math.tan;
var array = [];
var _Matrix = class extends Events {
  constructor(a, b, c, d, e, f) {
    super();
    __publicField(this, "elements", new NumArray(9));
    __publicField(this, "manual", false);
    let elements = a;
    if (!Array.isArray(elements)) {
      elements = Array.prototype.slice.call(arguments);
    }
    this.identity();
    if (elements.length > 0) {
      this.set(elements);
    }
  }
  static Multiply(A, B, C) {
    if (B.length <= 3) {
      const e = A;
      let x, y, z;
      const a = B[0] || 0, b = B[1] || 0, c = B[2] || 0;
      x = e[0] * a + e[1] * b + e[2] * c;
      y = e[3] * a + e[4] * b + e[5] * c;
      z = e[6] * a + e[7] * b + e[8] * c;
      return { x, y, z };
    }
    const A0 = A[0], A1 = A[1], A2 = A[2];
    const A3 = A[3], A4 = A[4], A5 = A[5];
    const A6 = A[6], A7 = A[7], A8 = A[8];
    const B0 = B[0], B1 = B[1], B2 = B[2];
    const B3 = B[3], B4 = B[4], B5 = B[5];
    const B6 = B[6], B7 = B[7], B8 = B[8];
    C = C || new NumArray(9);
    C[0] = A0 * B0 + A1 * B3 + A2 * B6;
    C[1] = A0 * B1 + A1 * B4 + A2 * B7;
    C[2] = A0 * B2 + A1 * B5 + A2 * B8;
    C[3] = A3 * B0 + A4 * B3 + A5 * B6;
    C[4] = A3 * B1 + A4 * B4 + A5 * B7;
    C[5] = A3 * B2 + A4 * B5 + A5 * B8;
    C[6] = A6 * B0 + A7 * B3 + A8 * B6;
    C[7] = A6 * B1 + A7 * B4 + A8 * B7;
    C[8] = A6 * B2 + A7 * B5 + A8 * B8;
    return C;
  }
  set(a, b, c, d, e, f, g, h, i) {
    if (typeof b === "undefined") {
      const elements = a;
      a = elements[0];
      b = elements[1];
      c = elements[2];
      d = elements[3];
      e = elements[4];
      f = elements[5];
      g = elements[6];
      h = elements[7];
      i = elements[8];
    }
    this.elements[0] = a;
    this.elements[1] = b;
    this.elements[2] = c;
    this.elements[3] = d;
    this.elements[4] = e;
    this.elements[5] = f;
    this.elements[6] = g;
    this.elements[7] = h;
    this.elements[8] = i;
    return this.trigger(Events.Types.change);
  }
  copy(m) {
    this.elements[0] = m.elements[0];
    this.elements[1] = m.elements[1];
    this.elements[2] = m.elements[2];
    this.elements[3] = m.elements[3];
    this.elements[4] = m.elements[4];
    this.elements[5] = m.elements[5];
    this.elements[6] = m.elements[6];
    this.elements[7] = m.elements[7];
    this.elements[8] = m.elements[8];
    this.manual = m.manual;
    return this.trigger(Events.Types.change);
  }
  identity() {
    this.elements[0] = _Matrix.Identity[0];
    this.elements[1] = _Matrix.Identity[1];
    this.elements[2] = _Matrix.Identity[2];
    this.elements[3] = _Matrix.Identity[3];
    this.elements[4] = _Matrix.Identity[4];
    this.elements[5] = _Matrix.Identity[5];
    this.elements[6] = _Matrix.Identity[6];
    this.elements[7] = _Matrix.Identity[7];
    this.elements[8] = _Matrix.Identity[8];
    return this.trigger(Events.Types.change);
  }
  multiply(a, b, c, d, e, f, g, h, i) {
    if (typeof b === "undefined") {
      this.elements[0] *= a;
      this.elements[1] *= a;
      this.elements[2] *= a;
      this.elements[3] *= a;
      this.elements[4] *= a;
      this.elements[5] *= a;
      this.elements[6] *= a;
      this.elements[7] *= a;
      this.elements[8] *= a;
      return this.trigger(Events.Types.change);
    }
    if (typeof d === "undefined") {
      a = a || 0;
      b = b || 0;
      c = c || 0;
      e = this.elements;
      const x = e[0] * a + e[1] * b + e[2] * c;
      const y = e[3] * a + e[4] * b + e[5] * c;
      const z = e[6] * a + e[7] * b + e[8] * c;
      return { x, y, z };
    }
    const A = this.elements;
    const B = [a, b, c, d, e, f, g, h, i];
    const A0 = A[0], A1 = A[1], A2 = A[2];
    const A3 = A[3], A4 = A[4], A5 = A[5];
    const A6 = A[6], A7 = A[7], A8 = A[8];
    const B0 = B[0], B1 = B[1], B2 = B[2];
    const B3 = B[3], B4 = B[4], B5 = B[5];
    const B6 = B[6], B7 = B[7], B8 = B[8];
    this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
    this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
    this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;
    this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
    this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
    this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;
    this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
    this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
    this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;
    return this.trigger(Events.Types.change);
  }
  inverse(out) {
    const a = this.elements;
    out = out || new _Matrix();
    const a00 = a[0], a01 = a[1], a02 = a[2];
    const a10 = a[3], a11 = a[4], a12 = a[5];
    const a20 = a[6], a21 = a[7], a22 = a[8];
    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out.elements[0] = b01 * det;
    out.elements[1] = (-a22 * a01 + a02 * a21) * det;
    out.elements[2] = (a12 * a01 - a02 * a11) * det;
    out.elements[3] = b11 * det;
    out.elements[4] = (a22 * a00 - a02 * a20) * det;
    out.elements[5] = (-a12 * a00 + a02 * a10) * det;
    out.elements[6] = b21 * det;
    out.elements[7] = (-a21 * a00 + a01 * a20) * det;
    out.elements[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  scale(sx, sy) {
    const l = arguments.length;
    if (l <= 1) {
      sy = sx;
    }
    return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);
  }
  rotate(Number2) {
    const c = cos(Number2);
    const s = sin(Number2);
    return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
  }
  translate(x, y) {
    return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);
  }
  skewX(Number2) {
    const a = tan(Number2);
    return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);
  }
  skewY(Number2) {
    const a = tan(Number2);
    return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
  }
  toString(fullMatrix) {
    array.length = 0;
    this.toTransformArray(fullMatrix, array);
    return array.map(toFixed).join(" ");
  }
  toTransformArray(fullMatrix, output) {
    const elements = this.elements;
    const hasOutput = !!output;
    const a = elements[0];
    const b = elements[1];
    const c = elements[2];
    const d = elements[3];
    const e = elements[4];
    const f = elements[5];
    if (fullMatrix) {
      const g = elements[6];
      const h = elements[7];
      const i = elements[8];
      if (hasOutput) {
        output[0] = a;
        output[1] = d;
        output[2] = g;
        output[3] = b;
        output[4] = e;
        output[5] = h;
        output[6] = c;
        output[7] = f;
        output[8] = i;
        return;
      }
      return [
        a,
        d,
        g,
        b,
        e,
        h,
        c,
        f,
        i
      ];
    }
    if (hasOutput) {
      output[0] = a;
      output[1] = d;
      output[2] = b;
      output[3] = e;
      output[4] = c;
      output[5] = f;
      return;
    }
    return [
      a,
      d,
      b,
      e,
      c,
      f
    ];
  }
  toArray(fullMatrix, output) {
    const elements = this.elements;
    const hasOutput = !!output;
    const a = elements[0];
    const b = elements[1];
    const c = elements[2];
    const d = elements[3];
    const e = elements[4];
    const f = elements[5];
    if (fullMatrix) {
      const g = elements[6];
      const h = elements[7];
      const i = elements[8];
      if (hasOutput) {
        output[0] = a;
        output[1] = b;
        output[2] = c;
        output[3] = d;
        output[4] = e;
        output[5] = f;
        output[6] = g;
        output[7] = h;
        output[8] = i;
        return;
      }
      return [
        a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i
      ];
    }
    if (hasOutput) {
      output[0] = a;
      output[1] = b;
      output[2] = c;
      output[3] = d;
      output[4] = e;
      output[5] = f;
      return;
    }
    return [
      a,
      b,
      c,
      d,
      e,
      f
    ];
  }
  toObject() {
    return {
      elements: this.toArray(true),
      manual: !!this.manual
    };
  }
  clone() {
    return new _Matrix().copy(this);
  }
};
var Matrix2 = _Matrix;
__publicField(Matrix2, "Identity", [
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1
]);
setMatrix(Matrix2);

// src/shape.js
var Shape = class extends Element {
  constructor() {
    super();
    __publicField(this, "_flagMatrix", true);
    __publicField(this, "_flagScale", false);
    __publicField(this, "_matrix", null);
    __publicField(this, "_worldMatrix", null);
    __publicField(this, "_position", null);
    __publicField(this, "_rotation", 0);
    __publicField(this, "_scale", 1);
    __publicField(this, "_skewX", 0);
    __publicField(this, "_skewY", 0);
    for (let prop in proto4) {
      Object.defineProperty(this, prop, proto4[prop]);
    }
    this._renderer.flagMatrix = FlagMatrix.bind(this);
    this.isShape = true;
    this.id = Constants.Identifier + Constants.uniqueId();
    this.matrix = new Matrix2();
    this.worldMatrix = new Matrix2();
    this.position = new Vector();
    this.rotation = 0;
    this.scale = 1;
    this.skewX = 0;
    this.skewY = 0;
  }
  get renderer() {
    return this._renderer;
  }
  set renderer(v) {
    this._renderer = v;
  }
  get translation() {
    return proto4.position.get.apply(this, arguments);
  }
  set translation(v) {
    proto4.position.set.apply(this, arguments);
  }
  addTo(group) {
    group.add(this);
    return this;
  }
  remove() {
    if (!this.parent) {
      return this;
    }
    this.parent.remove(this);
    return this;
  }
  clone(parent) {
    const clone = new Shape();
    clone.position.copy(this.position);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    if (parent) {
      parent.add(clone);
    }
    return clone._update();
  }
  _update(bubbles) {
    if (!this._matrix.manual && this._flagMatrix) {
      this._matrix.identity().translate(this.position.x, this.position.y);
      if (this._scale instanceof Vector) {
        this._matrix.scale(this._scale.x, this._scale.y);
      } else {
        this._matrix.scale(this._scale);
      }
      this._matrix.rotate(this.rotation);
      this._matrix.skewX(this.skewX);
      this._matrix.skewY(this.skewY);
    }
    if (bubbles) {
      if (this.parent && this.parent._update) {
        this.parent._update();
      }
    }
    return this;
  }
  flagReset() {
    this._flagMatrix = this._flagScale = false;
    super.flagReset.call(this);
    return this;
  }
};
var proto4 = {
  position: {
    enumerable: true,
    get: function() {
      return this._position;
    },
    set: function(v) {
      if (this._position) {
        this._position.unbind(Events.Types.change, this._renderer.flagMatrix);
      }
      this._position = v;
      this._position.bind(Events.Types.change, this._renderer.flagMatrix);
      FlagMatrix.call(this);
    }
  },
  rotation: {
    enumerable: true,
    get: function() {
      return this._rotation;
    },
    set: function(v) {
      this._rotation = v;
      this._flagMatrix = true;
    }
  },
  scale: {
    enumerable: true,
    get: function() {
      return this._scale;
    },
    set: function(v) {
      if (this._scale instanceof Vector) {
        this._scale.unbind(Events.Types.change, this._renderer.flagMatrix);
      }
      this._scale = v;
      if (this._scale instanceof Vector) {
        this._scale.bind(Events.Types.change, this._renderer.flagMatrix);
      }
      this._flagMatrix = true;
      this._flagScale = true;
    }
  },
  skewX: {
    enumerable: true,
    get: function() {
      return this._skewX;
    },
    set: function(v) {
      this._skewX = v;
      this._flagMatrix = true;
    }
  },
  skewY: {
    enumerable: true,
    get: function() {
      return this._skewY;
    },
    set: function(v) {
      this._skewY = v;
      this._flagMatrix = true;
    }
  },
  matrix: {
    enumerable: true,
    get: function() {
      return this._matrix;
    },
    set: function(v) {
      this._matrix = v;
      this._flagMatrix = true;
    }
  },
  worldMatrix: {
    enumerable: true,
    get: function() {
      getComputedMatrix(this, this._worldMatrix);
      return this._worldMatrix;
    },
    set: function(v) {
      this._worldMatrix = v;
    }
  }
};
function FlagMatrix() {
  this._flagMatrix = true;
}

// src/collection.js
var Collection = class extends Array {
  constructor() {
    super();
    __publicField(this, "_events", new Events());
    if (arguments[0] && Array.isArray(arguments[0])) {
      if (arguments[0].length > 0) {
        this.push.apply(this, arguments[0]);
      }
    } else if (arguments.length > 0) {
      this.push.apply(this, arguments);
    }
  }
  get _bound() {
    return this._events._bound;
  }
  set _bound(v) {
    this._events._bound = v;
  }
  addEventListener() {
    return this._events.addEventListener.apply(this, arguments);
  }
  on() {
    return this._events.on.apply(this, arguments);
  }
  bind() {
    return this._events.bind.apply(this, arguments);
  }
  removeEventListener() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  off() {
    return this._events.off.apply(this, arguments);
  }
  unbind() {
    return this._events.unbind.apply(this, arguments);
  }
  dispatchEvent() {
    return this._events.dispatchEvent.apply(this, arguments);
  }
  trigger() {
    return this._events.trigger.apply(this, arguments);
  }
  listen() {
    return this._events.listen.apply(this, arguments);
  }
  ignore() {
    return this._events.ignore.apply(this, arguments);
  }
  pop() {
    const popped = super.pop.apply(this, arguments);
    this.trigger(Events.Types.remove, [popped]);
    return popped;
  }
  shift() {
    const shifted = super.shift.apply(this, arguments);
    this.trigger(Events.Types.remove, [shifted]);
    return shifted;
  }
  push() {
    const pushed = super.push.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return pushed;
  }
  unshift() {
    const unshifted = super.unshift.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return unshifted;
  }
  splice() {
    const spliced = super.splice.apply(this, arguments);
    this.trigger(Events.Types.remove, spliced);
    if (arguments.length > 2) {
      const inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
      this.trigger(Events.Types.insert, inserted);
      this.trigger(Events.Types.order);
    }
    return spliced;
  }
  sort() {
    super.sort.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  }
  reverse() {
    super.reverse.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  }
  indexOf() {
    return super.indexOf.apply(this, arguments);
  }
};

// src/children.js
var Children = class extends Collection {
  constructor(children) {
    children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);
    super(children);
    __publicField(this, "ids", {});
    this.attach(children);
    this.on(Events.Types.insert, this.attach);
    this.on(Events.Types.remove, this.detach);
  }
  attach(children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child && child.id) {
        this.ids[child.id] = child;
      }
    }
    return this;
  }
  detach(children) {
    for (let i = 0; i < children.length; i++) {
      delete this.ids[children[i].id];
    }
    return this;
  }
};

// src/group.js
var min = Math.min;
var max = Math.max;
var _Group = class extends Shape {
  constructor(children) {
    super();
    __publicField(this, "_flagAdditions", false);
    __publicField(this, "_flagSubtractions", false);
    __publicField(this, "_flagOrder", false);
    __publicField(this, "_flagOpacity", true);
    __publicField(this, "_flagBeginning", false);
    __publicField(this, "_flagEnding", false);
    __publicField(this, "_flagLength", false);
    __publicField(this, "_flagMask", false);
    __publicField(this, "_fill", "#fff");
    __publicField(this, "_stroke", "#000");
    __publicField(this, "_linewidth", 1);
    __publicField(this, "_opacity", 1);
    __publicField(this, "_visible", true);
    __publicField(this, "_cap", "round");
    __publicField(this, "_join", "round");
    __publicField(this, "_miter", 4);
    __publicField(this, "_closed", true);
    __publicField(this, "_curved", false);
    __publicField(this, "_automatic", true);
    __publicField(this, "_beginning", 0);
    __publicField(this, "_ending", 1);
    __publicField(this, "_length", 0);
    __publicField(this, "_mask", null);
    for (let prop in proto5) {
      Object.defineProperty(this, prop, proto5[prop]);
    }
    this._renderer.type = "group";
    this.additions = [];
    this.subtractions = [];
    this.children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);
  }
  static InsertChildren(children) {
    for (let i = 0; i < children.length; i++) {
      replaceParent.call(this, children[i], this);
    }
  }
  static RemoveChildren(children) {
    for (let i = 0; i < children.length; i++) {
      replaceParent.call(this, children[i]);
    }
  }
  static OrderChildren(children) {
    this._flagOrder = true;
  }
  clone(parent) {
    const clone = new _Group();
    const children = this.children.map(function(child) {
      return child.clone();
    });
    clone.add(children);
    clone.opacity = this.opacity;
    if (this.mask) {
      clone.mask = this.mask;
    }
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.className = this.className;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    if (parent) {
      parent.add(clone);
    }
    return clone._update();
  }
  toObject() {
    const result = {
      children: [],
      translation: this.translation.toObject(),
      rotation: this.rotation,
      scale: this.scale instanceof Vector ? this.scale.toObject() : this.scale,
      opacity: this.opacity,
      className: this.className,
      mask: this.mask ? this.mask.toObject() : null
    };
    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }
    _.each(this.children, function(child, i) {
      result.children[i] = child.toObject();
    }, this);
    return result;
  }
  corner() {
    const rect = this.getBoundingClientRect(true);
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      child.translation.x -= rect.left;
      child.translation.y -= rect.top;
    }
    if (this.mask) {
      this.mask.translation.x -= rect.left;
      this.mask.translation.y -= rect.top;
    }
    return this;
  }
  center() {
    const rect = this.getBoundingClientRect(true);
    const cx = rect.left + rect.width / 2 - this.translation.x;
    const cy = rect.top + rect.height / 2 - this.translation.y;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.isShape) {
        child.translation.x -= cx;
        child.translation.y -= cy;
      }
    }
    if (this.mask) {
      this.mask.translation.x -= cx;
      this.mask.translation.y -= cy;
    }
    return this;
  }
  getById(id) {
    let found = null;
    function search(node) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          found = search(node.children[i]);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }
    return search(this);
  }
  getByClassName(className) {
    const found = [];
    function search(node) {
      if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
        found.push(node);
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          search(child);
        }
      }
      return found;
    }
    return search(this);
  }
  getByType(type) {
    const found = [];
    function search(node) {
      if (node instanceof type) {
        found.push(node);
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          search(child);
        }
      }
      return found;
    }
    return search(this);
  }
  add(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    } else {
      objects = objects.slice();
    }
    for (let i = 0; i < objects.length; i++) {
      const child = objects[i];
      if (!(child && child.id)) {
        continue;
      }
      const index = Array.prototype.indexOf.call(this.children, child);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
      this.children.push(child);
    }
    return this;
  }
  remove(objects) {
    const l = arguments.length, grandparent = this.parent;
    if (l <= 0 && grandparent) {
      grandparent.remove(this);
      return this;
    }
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    } else {
      objects = objects.slice();
    }
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      if (!object || !this.children.ids[object.id]) {
        continue;
      }
      const index = this.children.indexOf(object);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
    }
    return this;
  }
  getBoundingClientRect(shallow) {
    let rect, matrix3, a, b, c, d, tc, lc, rc, bc;
    this._update(true);
    let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
    const regex3 = /texture|gradient/i;
    matrix3 = shallow ? this._matrix : getComputedMatrix(this);
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (!child.visible || regex3.test(child._renderer.type)) {
        continue;
      }
      rect = child.getBoundingClientRect(shallow);
      tc = typeof rect.top !== "number" || _.isNaN(rect.top) || !isFinite(rect.top);
      lc = typeof rect.left !== "number" || _.isNaN(rect.left) || !isFinite(rect.left);
      rc = typeof rect.right !== "number" || _.isNaN(rect.right) || !isFinite(rect.right);
      bc = typeof rect.bottom !== "number" || _.isNaN(rect.bottom) || !isFinite(rect.bottom);
      if (tc || lc || rc || bc) {
        continue;
      }
      top = min(rect.top, top);
      left = min(rect.left, left);
      right = max(rect.right, right);
      bottom = max(rect.bottom, bottom);
    }
    if (shallow) {
      a = matrix3.multiply(left, top, 1);
      b = matrix3.multiply(left, bottom, 1);
      c = matrix3.multiply(right, top, 1);
      d = matrix3.multiply(right, bottom, 1);
      top = min(a.y, b.y, c.y, d.y);
      left = min(a.x, b.x, c.x, d.x);
      right = max(a.x, b.x, c.x, d.x);
      bottom = max(a.y, b.y, c.y, d.y);
    }
    return {
      top,
      left,
      right,
      bottom,
      width: right - left,
      height: bottom - top
    };
  }
  noFill() {
    this.children.forEach(function(child) {
      child.noFill();
    });
    return this;
  }
  noStroke() {
    this.children.forEach(function(child) {
      child.noStroke();
    });
    return this;
  }
  subdivide() {
    const args = arguments;
    this.children.forEach(function(child) {
      child.subdivide.apply(child, args);
    });
    return this;
  }
  _update() {
    let i, l, child;
    if (this._flagBeginning || this._flagEnding) {
      const beginning = Math.min(this._beginning, this._ending);
      const ending = Math.max(this._beginning, this._ending);
      const length = this.length;
      let sum = 0;
      const bd = beginning * length;
      const ed = ending * length;
      for (i = 0; i < this.children.length; i++) {
        child = this.children[i];
        l = child.length;
        if (bd > sum + l) {
          child.beginning = 1;
          child.ending = 1;
        } else if (ed < sum) {
          child.beginning = 0;
          child.ending = 0;
        } else if (bd > sum && bd < sum + l) {
          child.beginning = (bd - sum) / l;
          child.ending = 1;
        } else if (ed > sum && ed < sum + l) {
          child.beginning = 0;
          child.ending = (ed - sum) / l;
        } else {
          child.beginning = 0;
          child.ending = 1;
        }
        sum += l;
      }
    }
    return super._update.apply(this, arguments);
  }
  flagReset() {
    if (this._flagAdditions) {
      this.additions.length = 0;
      this._flagAdditions = false;
    }
    if (this._flagSubtractions) {
      this.subtractions.length = 0;
      this._flagSubtractions = false;
    }
    this._flagOrder = this._flagMask = this._flagOpacity = this._flagBeginning = this._flagEnding = false;
    super.flagReset.call(this);
    return this;
  }
};
var Group = _Group;
__publicField(Group, "Children", Children);
__publicField(Group, "Properties", [
  "fill",
  "stroke",
  "linewidth",
  "cap",
  "join",
  "miter",
  "closed",
  "curved",
  "automatic"
]);
var proto5 = {
  visible: {
    enumerable: true,
    get: function() {
      return this._visible;
    },
    set: function(v) {
      this._flagVisible = this._visible !== v || this._flagVisible;
      this._visible = v;
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._flagOpacity = this._opacity !== v || this._flagOpacity;
      this._opacity = v;
    }
  },
  beginning: {
    enumerable: true,
    get: function() {
      return this._beginning;
    },
    set: function(v) {
      this._flagBeginning = this._beginning !== v || this._flagBeginning;
      this._beginning = v;
    }
  },
  ending: {
    enumerable: true,
    get: function() {
      return this._ending;
    },
    set: function(v) {
      this._flagEnding = this._ending !== v || this._flagEnding;
      this._ending = v;
    }
  },
  length: {
    enumerable: true,
    get: function() {
      if (this._flagLength || this._length <= 0) {
        this._length = 0;
        if (!this.children) {
          return this._length;
        }
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          this._length += child.length;
        }
      }
      return this._length;
    }
  },
  fill: {
    enumerable: true,
    get: function() {
      return this._fill;
    },
    set: function(v) {
      this._fill = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.fill = v;
      }
    }
  },
  stroke: {
    enumerable: true,
    get: function() {
      return this._stroke;
    },
    set: function(v) {
      this._stroke = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.stroke = v;
      }
    }
  },
  linewidth: {
    enumerable: true,
    get: function() {
      return this._linewidth;
    },
    set: function(v) {
      this._linewidth = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.linewidth = v;
      }
    }
  },
  join: {
    enumerable: true,
    get: function() {
      return this._join;
    },
    set: function(v) {
      this._join = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.join = v;
      }
    }
  },
  miter: {
    enumerable: true,
    get: function() {
      return this._miter;
    },
    set: function(v) {
      this._miter = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.miter = v;
      }
    }
  },
  cap: {
    enumerable: true,
    get: function() {
      return this._cap;
    },
    set: function(v) {
      this._cap = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.cap = v;
      }
    }
  },
  closed: {
    enumerable: true,
    get: function() {
      return this._closed;
    },
    set: function(v) {
      this._closed = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.closed = v;
      }
    }
  },
  curved: {
    enumerable: true,
    get: function() {
      return this._curved;
    },
    set: function(v) {
      this._curved = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.curved = v;
      }
    }
  },
  automatic: {
    enumerable: true,
    get: function() {
      return this._automatic;
    },
    set: function(v) {
      this._automatic = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.automatic = v;
      }
    }
  },
  children: {
    enumerable: true,
    get: function() {
      return this._children;
    },
    set: function(children) {
      const insertChildren = Group.InsertChildren.bind(this);
      const removeChildren = Group.RemoveChildren.bind(this);
      const orderChildren = Group.OrderChildren.bind(this);
      if (this._children) {
        this._children.unbind();
        if (this._children.length > 0) {
          removeChildren(this._children);
        }
      }
      this._children = new Children(children);
      this._children.bind(Events.Types.insert, insertChildren);
      this._children.bind(Events.Types.remove, removeChildren);
      this._children.bind(Events.Types.order, orderChildren);
      if (children.length > 0) {
        insertChildren(children);
      }
    }
  },
  mask: {
    enumerable: true,
    get: function() {
      return this._mask;
    },
    set: function(v) {
      this._mask = v;
      this._flagMask = true;
      if (_.isObject(v) && !v.clip) {
        v.clip = true;
      }
    }
  }
};
function replaceParent(child, newParent) {
  const parent = child.parent;
  let index;
  if (parent === newParent) {
    add();
    return;
  }
  if (parent && parent.children.ids[child.id]) {
    index = Array.prototype.indexOf.call(parent.children, child);
    parent.children.splice(index, 1);
    splice();
  }
  if (newParent) {
    add();
    return;
  }
  splice();
  if (parent._flagAdditions && parent.additions.length === 0) {
    parent._flagAdditions = false;
  }
  if (parent._flagSubtractions && parent.subtractions.length === 0) {
    parent._flagSubtractions = false;
  }
  delete child.parent;
  function add() {
    if (newParent.subtractions.length > 0) {
      index = Array.prototype.indexOf.call(newParent.subtractions, child);
      if (index >= 0) {
        newParent.subtractions.splice(index, 1);
      }
    }
    if (newParent.additions.length > 0) {
      index = Array.prototype.indexOf.call(newParent.additions, child);
      if (index >= 0) {
        newParent.additions.splice(index, 1);
      }
    }
    child.parent = newParent;
    newParent.additions.push(child);
    newParent._flagAdditions = true;
  }
  function splice() {
    index = Array.prototype.indexOf.call(parent.additions, child);
    if (index >= 0) {
      parent.additions.splice(index, 1);
    }
    index = Array.prototype.indexOf.call(parent.subtractions, child);
    if (index < 0) {
      parent.subtractions.push(child);
      parent._flagSubtractions = true;
    }
  }
}

// src/renderers/canvas.js
var matrix = new Matrix2();
var emptyArray = [];
var max2 = Math.max;
var min2 = Math.min;
var abs = Math.abs;
var sin2 = Math.sin;
var cos2 = Math.cos;
var acos = Math.acos;
var sqrt = Math.sqrt;
var canvas = {
  isHidden: /(undefined|none|transparent)/i,
  alignments: {
    left: "start",
    middle: "center",
    right: "end"
  },
  shim: function(elem, name) {
    elem.tagName = elem.nodeName = name || "canvas";
    elem.nodeType = 1;
    elem.getAttribute = function(prop) {
      return this[prop];
    };
    elem.setAttribute = function(prop, val) {
      this[prop] = val;
      return this;
    };
    return elem;
  },
  group: {
    renderChild: function(child) {
      canvas[child._renderer.type].render.call(child, this.ctx, true, this.clip);
    },
    render: function(ctx) {
      if (!this._visible) {
        return this;
      }
      this._update();
      const matrix3 = this._matrix.elements;
      const parent = this.parent;
      this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);
      const mask = this._mask;
      const defaultMatrix = isDefaultMatrix(matrix3);
      const shouldIsolate = !defaultMatrix || !!mask;
      if (!this._renderer.context) {
        this._renderer.context = {};
      }
      this._renderer.context.ctx = ctx;
      if (shouldIsolate) {
        ctx.save();
        if (!defaultMatrix) {
          ctx.transform(matrix3[0], matrix3[3], matrix3[1], matrix3[4], matrix3[2], matrix3[5]);
        }
      }
      if (mask) {
        canvas[mask._renderer.type].render.call(mask, ctx, true);
      }
      if (this._opacity > 0 && this._scale !== 0) {
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          canvas[child._renderer.type].render.call(child, ctx);
        }
      }
      if (shouldIsolate) {
        ctx.restore();
      }
      return this.flagReset();
    }
  },
  path: {
    render: function(ctx, forced, parentClipped) {
      let matrix3, stroke, linewidth, fill, opacity, visible, cap, join, miter, closed2, commands, length, last, prev, a, b, c, d, ux, uy, vx, vy, ar, bl, br, cl, x, y, mask, clip, defaultMatrix, isOffset, dashes, po;
      po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
      mask = this._mask;
      clip = this._clip;
      opacity = this._opacity * (po || 1);
      visible = this._visible;
      if (!forced && (!visible || clip || opacity === 0)) {
        return this;
      }
      this._update();
      matrix3 = this._matrix.elements;
      stroke = this._stroke;
      linewidth = this._linewidth;
      fill = this._fill;
      cap = this._cap;
      join = this._join;
      miter = this._miter;
      closed2 = this._closed;
      commands = this._renderer.vertices;
      length = commands.length;
      last = length - 1;
      defaultMatrix = isDefaultMatrix(matrix3);
      dashes = this.dashes;
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(matrix3[0], matrix3[3], matrix3[1], matrix3[4], matrix3[2], matrix3[5]);
      }
      if (mask) {
        canvas[mask._renderer.type].render.call(mask, ctx, true);
      }
      if (fill) {
        if (typeof fill === "string") {
          ctx.fillStyle = fill;
        } else {
          canvas[fill._renderer.type].render.call(fill, ctx, this);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === "string") {
          ctx.strokeStyle = stroke;
        } else {
          canvas[stroke._renderer.type].render.call(stroke, ctx, this);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (miter) {
          ctx.miterLimit = miter;
        }
        if (join) {
          ctx.lineJoin = join;
        }
        if (!closed2 && cap) {
          ctx.lineCap = cap;
        }
      }
      if (typeof opacity === "number") {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }
      ctx.beginPath();
      let rx, ry, xAxisRotation, largeArcFlag, sweepFlag, ax, ay;
      for (let i = 0; i < length; i++) {
        b = commands[i];
        x = b.x;
        y = b.y;
        switch (b.command) {
          case Commands.close:
            ctx.closePath();
            break;
          case Commands.arc:
            rx = b.rx;
            ry = b.ry;
            xAxisRotation = b.xAxisRotation;
            largeArcFlag = b.largeArcFlag;
            sweepFlag = b.sweepFlag;
            prev = closed2 ? mod(i - 1, length) : max2(i - 1, 0);
            a = commands[prev];
            ax = a.x;
            ay = a.y;
            canvas.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
            break;
          case Commands.curve:
            prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
            a = commands[prev];
            ar = a.controls && a.controls.right || Vector.zero;
            bl = b.controls && b.controls.left || Vector.zero;
            if (a._relative) {
              vx = ar.x + a.x;
              vy = ar.y + a.y;
            } else {
              vx = ar.x;
              vy = ar.y;
            }
            if (b._relative) {
              ux = bl.x + b.x;
              uy = bl.y + b.y;
            } else {
              ux = bl.x;
              uy = bl.y;
            }
            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);
            if (i >= last && closed2) {
              c = d;
              br = b.controls && b.controls.right || Vector.zero;
              cl = c.controls && c.controls.left || Vector.zero;
              if (b._relative) {
                vx = br.x + b.x;
                vy = br.y + b.y;
              } else {
                vx = br.x;
                vy = br.y;
              }
              if (c._relative) {
                ux = cl.x + c.x;
                uy = cl.y + c.y;
              } else {
                ux = cl.x;
                uy = cl.y;
              }
              x = c.x;
              y = c.y;
              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);
            }
            break;
          case Commands.line:
            ctx.lineTo(x, y);
            break;
          case Commands.move:
            d = b;
            ctx.moveTo(x, y);
            break;
        }
      }
      if (closed2) {
        ctx.closePath();
      }
      if (!clip && !parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }
        if (!canvas.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }
      }
      if (!defaultMatrix) {
        ctx.restore();
      }
      if (clip && !parentClipped) {
        ctx.clip();
      }
      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }
      return this.flagReset();
    }
  },
  points: {
    render: function(ctx, forced, parentClipped) {
      let me, stroke, linewidth, fill, opacity, visible, size, commands, length, b, x, y, defaultMatrix, isOffset, dashes, po;
      po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
      opacity = this._opacity * (po || 1);
      visible = this._visible;
      if (!forced && (!visible || opacity === 0)) {
        return this;
      }
      this._update();
      me = this._matrix.elements;
      stroke = this._stroke;
      linewidth = this._linewidth;
      fill = this._fill;
      commands = this._renderer.collection;
      length = commands.length;
      defaultMatrix = isDefaultMatrix(me);
      dashes = this.dashes;
      size = this._size;
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(me[0], me[3], me[1], me[4], me[2], me[5]);
      }
      if (fill) {
        if (typeof fill === "string") {
          ctx.fillStyle = fill;
        } else {
          canvas[fill._renderer.type].render.call(fill, ctx, this);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === "string") {
          ctx.strokeStyle = stroke;
        } else {
          canvas[stroke._renderer.type].render.call(stroke, ctx, this);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
      }
      if (typeof opacity === "number") {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }
      ctx.beginPath();
      let radius = size * 0.5, m;
      if (!this._sizeAttenuation) {
        getComputedMatrix(this, matrix);
        m = matrix.elements;
        m = decomposeMatrix(m[0], m[3], m[1], m[4], m[2], m[5]);
        radius /= Math.max(m.scaleX, m.scaleY);
      }
      for (let i = 0; i < length; i++) {
        b = commands[i];
        x = b.x;
        y = b.y;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, TWO_PI);
      }
      if (!parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }
        if (!canvas.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }
      }
      if (!defaultMatrix) {
        ctx.restore();
      }
      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }
      return this.flagReset();
    }
  },
  text: {
    render: function(ctx, forced, parentClipped) {
      const po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
      const opacity = this._opacity * po;
      const visible = this._visible;
      const mask = this._mask;
      const clip = this._clip;
      if (!forced && (!visible || clip || opacity === 0)) {
        return this;
      }
      this._update();
      const matrix3 = this._matrix.elements;
      const stroke = this._stroke;
      const linewidth = this._linewidth;
      const fill = this._fill;
      const decoration = this._decoration;
      const defaultMatrix = isDefaultMatrix(matrix3);
      const isOffset = fill._renderer && fill._renderer.offset && stroke._renderer && stroke._renderer.offset;
      const dashes = this.dashes;
      const alignment = canvas.alignments[this._alignment] || this._alignment;
      const baseline = this._baseline;
      let a, b, c, d, e, sx, sy, x1, y1, x2, y2;
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(matrix3[0], matrix3[3], matrix3[1], matrix3[4], matrix3[2], matrix3[5]);
      }
      if (mask) {
        canvas[mask._renderer.type].render.call(mask, ctx, true);
      }
      if (!isOffset) {
        ctx.font = [this._style, this._weight, this._size + "px/" + this._leading + "px", this._family].join(" ");
      }
      ctx.textAlign = alignment;
      ctx.textBaseline = baseline;
      if (fill) {
        if (typeof fill === "string") {
          ctx.fillStyle = fill;
        } else {
          canvas[fill._renderer.type].render.call(fill, ctx, this);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === "string") {
          ctx.strokeStyle = stroke;
        } else {
          canvas[stroke._renderer.type].render.call(stroke, ctx, this);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
      }
      if (typeof opacity === "number") {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }
      if (!clip && !parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          if (fill._renderer && fill._renderer.offset) {
            sx = fill._renderer.scale.x;
            sy = fill._renderer.scale.y;
            ctx.save();
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(sx, sy);
            a = this._size / fill._renderer.scale.y;
            b = this._leading / fill._renderer.scale.y;
            ctx.font = [
              this._style,
              this._weight,
              a + "px/",
              b + "px",
              this._family
            ].join(" ");
            c = fill._renderer.offset.x / fill._renderer.scale.x;
            d = fill._renderer.offset.y / fill._renderer.scale.y;
            ctx.fillText(this.value, c, d);
            ctx.restore();
          } else {
            ctx.fillText(this.value, 0, 0);
          }
        }
        if (!canvas.isHidden.test(stroke)) {
          if (stroke._renderer && stroke._renderer.offset) {
            sx = stroke._renderer.scale.x;
            sy = stroke._renderer.scale.y;
            ctx.save();
            ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
            ctx.scale(sx, sy);
            a = this._size / stroke._renderer.scale.y;
            b = this._leading / stroke._renderer.scale.y;
            ctx.font = [
              this._style,
              this._weight,
              a + "px/",
              b + "px",
              this._family
            ].join(" ");
            c = stroke._renderer.offset.x / stroke._renderer.scale.x;
            d = stroke._renderer.offset.y / stroke._renderer.scale.y;
            e = linewidth / stroke._renderer.scale.x;
            ctx.lineWidth = e;
            ctx.strokeText(this.value, c, d);
            ctx.restore();
          } else {
            ctx.strokeText(this.value, 0, 0);
          }
        }
      }
      if (/(underline|strikethrough)/i.test(decoration)) {
        const metrics = ctx.measureText(this.value);
        let scalar = 1;
        switch (decoration) {
          case "underline":
            y1 = metrics.actualBoundingBoxAscent;
            y2 = metrics.actualBoundingBoxAscent;
            break;
          case "strikethrough":
            y1 = 0;
            y2 = 0;
            scalar = 0.5;
            break;
        }
        switch (baseline) {
          case "top":
            y1 += this._size * scalar;
            y2 += this._size * scalar;
            break;
          case "baseline":
          case "bottom":
            y1 -= this._size * scalar;
            y2 -= this._size * scalar;
            break;
        }
        switch (alignment) {
          case "left":
          case "start":
            x1 = 0;
            x2 = metrics.width;
            break;
          case "right":
          case "end":
            x1 = -metrics.width;
            x2 = 0;
            break;
          default:
            x1 = -metrics.width / 2;
            x2 = metrics.width / 2;
        }
        ctx.lineWidth = Math.max(Math.floor(this._size / 15), 1);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      if (!defaultMatrix) {
        ctx.restore();
      }
      if (clip && !parentClipped) {
        ctx.clip();
      }
      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }
      return this.flagReset();
    }
  },
  "linear-gradient": {
    render: function(ctx, parent) {
      if (!parent) {
        return;
      }
      this._update();
      if (!this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
        let rect;
        let lx = this.left._x;
        let ly = this.left._y;
        let rx = this.right._x;
        let ry = this.right._y;
        if (/objectBoundingBox/i.test(this._units)) {
          rect = parent.getBoundingClientRect(true);
          lx = (lx - 0.5) * rect.width;
          ly = (ly - 0.5) * rect.height;
          rx = (rx - 0.5) * rect.width;
          ry = (ry - 0.5) * rect.height;
        }
        this._renderer.effect = ctx.createLinearGradient(lx, ly, rx, ry);
        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }
      }
      return this.flagReset();
    }
  },
  "radial-gradient": {
    render: function(ctx, parent) {
      if (!parent) {
        return;
      }
      this._update();
      if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
        let rect;
        let cx = this.center._x;
        let cy = this.center._y;
        let fx = this.focal._x;
        let fy = this.focal._y;
        let radius = this._radius;
        if (/objectBoundingBox/i.test(this._units)) {
          rect = parent.getBoundingClientRect(true);
          cx = cx * rect.width * 0.5;
          cy = cy * rect.height * 0.5;
          fx = fx * rect.width * 0.5;
          fy = fy * rect.height * 0.5;
          radius *= Math.min(rect.width, rect.height) * 0.5;
        }
        this._renderer.effect = ctx.createRadialGradient(cx, cy, 0, fx, fy, radius);
        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }
      }
      return this.flagReset();
    }
  },
  texture: {
    render: function(ctx) {
      this._update();
      const image = this.image;
      if (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) {
        this._renderer.effect = ctx.createPattern(this.image, this._repeat);
      }
      if (this._flagOffset || this._flagLoaded || this._flagScale) {
        if (!(this._renderer.offset instanceof Vector)) {
          this._renderer.offset = new Vector();
        }
        this._renderer.offset.x = -this._offset.x;
        this._renderer.offset.y = -this._offset.y;
        if (image) {
          this._renderer.offset.x += image.width / 2;
          this._renderer.offset.y += image.height / 2;
          if (this._scale instanceof Vector) {
            this._renderer.offset.x *= this._scale.x;
            this._renderer.offset.y *= this._scale.y;
          } else {
            this._renderer.offset.x *= this._scale;
            this._renderer.offset.y *= this._scale;
          }
        }
      }
      if (this._flagScale || this._flagLoaded) {
        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.copy(this._scale);
        } else {
          this._renderer.scale.set(this._scale, this._scale);
        }
      }
      return this.flagReset();
    }
  },
  renderSvgArcCommand: function(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y) {
    xAxisRotation = xAxisRotation * Math.PI / 180;
    rx = abs(rx);
    ry = abs(ry);
    const dx2 = (ax - x) / 2;
    const dy2 = (ay - y) / 2;
    const x1p = cos2(xAxisRotation) * dx2 + sin2(xAxisRotation) * dy2;
    const y1p = -sin2(xAxisRotation) * dx2 + cos2(xAxisRotation) * dy2;
    const x1ps = x1p * x1p;
    const y1ps = y1p * y1p;
    let rxs = rx * rx;
    let rys = ry * ry;
    const cr = x1ps / rxs + y1ps / rys;
    if (cr > 1) {
      const s = sqrt(cr);
      rx = s * rx;
      ry = s * ry;
      rxs = rx * rx;
      rys = ry * ry;
    }
    const dq = rxs * y1ps + rys * x1ps;
    const pq = (rxs * rys - dq) / dq;
    let q = sqrt(max2(0, pq));
    if (largeArcFlag === sweepFlag)
      q = -q;
    const cxp = q * rx * y1p / ry;
    const cyp = -q * ry * x1p / rx;
    const cx = cos2(xAxisRotation) * cxp - sin2(xAxisRotation) * cyp + (ax + x) / 2;
    const cy = sin2(xAxisRotation) * cxp + cos2(xAxisRotation) * cyp + (ay + y) / 2;
    const startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    const delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % TWO_PI;
    const endAngle = startAngle + delta;
    const clockwise = sweepFlag === 0;
    renderArcEstimate(ctx, cx, cy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation);
  }
};
var Renderer = class extends Events {
  constructor(params) {
    super();
    const smoothing = params.smoothing !== false;
    this.domElement = params.domElement || document.createElement("canvas");
    this.ctx = this.domElement.getContext("2d");
    this.overdraw = params.overdraw || false;
    if (typeof this.ctx.imageSmoothingEnabled !== "undefined") {
      this.ctx.imageSmoothingEnabled = smoothing;
    }
    this.scene = new Group();
    this.scene.parent = this;
  }
  setSize(width, height, ratio) {
    this.width = width;
    this.height = height;
    this.ratio = typeof ratio === "undefined" ? getRatio(this.ctx) : ratio;
    this.domElement.width = width * this.ratio;
    this.domElement.height = height * this.ratio;
    if (this.domElement.style) {
      _.extend(this.domElement.style, {
        width: width + "px",
        height: height + "px"
      });
    }
    return this.trigger(Events.Types.resize, width, height, ratio);
  }
  render() {
    const isOne = this.ratio === 1;
    if (!isOne) {
      this.ctx.save();
      this.ctx.scale(this.ratio, this.ratio);
    }
    if (!this.overdraw) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    canvas.group.render.call(this.scene, this.ctx);
    if (!isOne) {
      this.ctx.restore();
    }
    return this;
  }
};
__publicField(Renderer, "Utils", canvas);
function renderArcEstimate(ctx, ox, oy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation) {
  const delta = endAngle - startAngle;
  const epsilon = Curve.Tolerance.epsilon;
  const samePoints = Math.abs(delta) < epsilon;
  let deltaAngle = mod(delta, TWO_PI);
  if (deltaAngle < epsilon) {
    if (samePoints) {
      deltaAngle = 0;
    } else {
      deltaAngle = TWO_PI;
    }
  }
  if (clockwise === true && !samePoints) {
    if (deltaAngle === TWO_PI) {
      deltaAngle = -TWO_PI;
    } else {
      deltaAngle = deltaAngle - TWO_PI;
    }
  }
  for (let i = 0; i < Constants.Resolution; i++) {
    const t = i / (Constants.Resolution - 1);
    const angle = startAngle + t * deltaAngle;
    let x = ox + rx * Math.cos(angle);
    let y = oy + ry * Math.sin(angle);
    if (xAxisRotation !== 0) {
      const cos7 = Math.cos(xAxisRotation);
      const sin7 = Math.sin(xAxisRotation);
      const tx = x - ox;
      const ty = y - oy;
      x = tx * cos7 - ty * sin7 + ox;
      y = tx * sin7 + ty * cos7 + oy;
    }
    ctx.lineTo(x, y);
  }
}
function svgAngle(ux, uy, vx, vy) {
  const dot = ux * vx + uy * vy;
  const len = sqrt(ux * ux + uy * uy) * sqrt(vx * vx + vy * vy);
  let ang = acos(max2(-1, min2(1, dot / len)));
  if (ux * vy - uy * vx < 0) {
    ang = -ang;
  }
  return ang;
}
function isDefaultMatrix(m) {
  return m[0] == 1 && m[3] == 0 && m[1] == 0 && m[4] == 1 && m[2] == 0 && m[5] == 0;
}

// src/utils/canvas-shim.js
var CanvasShim = {
  Image: null,
  isHeadless: false,
  shim: function(canvas2, Image) {
    Renderer.Utils.shim(canvas2);
    if (typeof Image !== "undefined") {
      CanvasShim.Image = Image;
    }
    CanvasShim.isHeadless = true;
    return canvas2;
  }
};

// src/utils/dom.js
var dom = {
  hasEventListeners: typeof root.addEventListener === "function",
  bind: function(elem, event, func, bool) {
    if (this.hasEventListeners) {
      elem.addEventListener(event, func, !!bool);
    } else {
      elem.attachEvent("on" + event, func);
    }
    return dom;
  },
  unbind: function(elem, event, func, bool) {
    if (dom.hasEventListeners) {
      elem.removeEventListeners(event, func, !!bool);
    } else {
      elem.detachEvent("on" + event, func);
    }
    return dom;
  },
  getRequestAnimationFrame: function() {
    const vendors = ["ms", "moz", "webkit", "o"];
    let lastTime = 0;
    let request = root.requestAnimationFrame;
    if (!request) {
      for (let i = 0; i < vendors.length; i++) {
        request = root[vendors[i] + "RequestAnimationFrame"] || request;
      }
      request = request || fallbackRequest;
    }
    function fallbackRequest(callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = root.setTimeout(nextRequest, timeToCall);
      lastTime = currTime + timeToCall;
      function nextRequest() {
        callback(currTime + timeToCall);
      }
      return id;
    }
    return request;
  }
};
var temp = root.document ? root.document.createElement("div") : {};
temp.id = "help-two-load";
Object.defineProperty(dom, "temp", {
  enumerable: true,
  get: function() {
    if (_.isElement(temp) && !root.document.head.contains(temp)) {
      temp.style.display = "none";
      root.document.head.appendChild(temp);
    }
    return temp;
  }
});

// src/utils/error.js
var TwoError = class extends Error {
  constructor(message) {
    super();
    __publicField(this, "name", "Two.js");
    __publicField(this, "message");
    this.message = message;
  }
};

// src/registry.js
var Registry = class {
  constructor() {
    __publicField(this, "map", {});
  }
  add(id, obj) {
    this.map[id] = obj;
    return this;
  }
  remove(id) {
    delete this.map[id];
    return this;
  }
  get(id) {
    return this.map[id];
  }
  contains(id) {
    return id in this.map;
  }
};

// src/utils/shape.js
function contains(path, t) {
  if (t === 0 || t === 1) {
    return true;
  }
  const length = path._length;
  const target = length * t;
  let elapsed = 0;
  for (let i = 0; i < path._lengths.length; i++) {
    const dist = path._lengths[i];
    if (elapsed >= target) {
      return target - elapsed >= 0;
    }
    elapsed += dist;
  }
  return false;
}
function getIdByLength(path, target) {
  const total = path._length;
  if (target <= 0) {
    return 0;
  } else if (target >= total) {
    return path._lengths.length - 1;
  }
  for (let i = 0, sum = 0; i < path._lengths.length; i++) {
    if (sum + path._lengths[i] >= target) {
      target -= sum;
      return Math.max(i - 1, 0) + target / path._lengths[i];
    }
    sum += path._lengths[i];
  }
  return -1;
}
function getCurveLength2(a, b, limit) {
  let x1, x2, x3, x4, y1, y2, y3, y4;
  const right = b.controls && b.controls.right;
  const left = a.controls && a.controls.left;
  x1 = b.x;
  y1 = b.y;
  x2 = (right || b).x;
  y2 = (right || b).y;
  x3 = (left || a).x;
  y3 = (left || a).y;
  x4 = a.x;
  y4 = a.y;
  if (right && b._relative) {
    x2 += b.x;
    y2 += b.y;
  }
  if (left && a._relative) {
    x3 += a.x;
    y3 += a.y;
  }
  return getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit);
}
function getSubdivisions(a, b, limit) {
  let x1, x2, x3, x4, y1, y2, y3, y4;
  const right = b.controls && b.controls.right;
  const left = a.controls && a.controls.left;
  x1 = b.x;
  y1 = b.y;
  x2 = (right || b).x;
  y2 = (right || b).y;
  x3 = (left || a).x;
  y3 = (left || a).y;
  x4 = a.x;
  y4 = a.y;
  if (right && b._relative) {
    x2 += b.x;
    y2 += b.y;
  }
  if (left && a._relative) {
    x3 += a.x;
    y3 += a.y;
  }
  return subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);
}

// src/effects/stop.js
var _Stop = class extends Element {
  constructor(offset, color, opacity) {
    super();
    __publicField(this, "_flagOffset", true);
    __publicField(this, "_flagOpacity", true);
    __publicField(this, "_flagColor", true);
    __publicField(this, "_offset", 0);
    __publicField(this, "_opacity", 1);
    __publicField(this, "_color", "#fff");
    for (let prop in proto6) {
      Object.defineProperty(this, prop, proto6[prop]);
    }
    this._renderer.type = "stop";
    this.offset = typeof offset === "number" ? offset : _Stop.Index <= 0 ? 0 : 1;
    this.opacity = typeof opacity === "number" ? opacity : 1;
    this.color = typeof color === "string" ? color : _Stop.Index <= 0 ? "#fff" : "#000";
    _Stop.Index = (_Stop.Index + 1) % 2;
  }
  clone(parent) {
    const clone = new _Stop();
    _.each(_Stop.Properties, function(property) {
      clone[property] = this[property];
    }, this);
    if (parent && parent.stops) {
      parent.stops.push(clone);
    }
    return clone;
  }
  toObject() {
    const result = {};
    _.each(_Stop.Properties, function(k) {
      result[k] = this[k];
    }, this);
    return result;
  }
  flagReset() {
    this._flagOffset = this._flagColor = this._flagOpacity = false;
    super.flagReset.call(this);
    return this;
  }
};
var Stop = _Stop;
__publicField(Stop, "Index", 0);
__publicField(Stop, "Properties", ["offset", "opacity", "color"]);
var proto6 = {
  offset: {
    enumerable: true,
    get: function() {
      return this._offset;
    },
    set: function(v) {
      this._offset = v;
      this._flagOffset = true;
      if (this.parent) {
        this.parent._flagStops = true;
      }
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._opacity = v;
      this._flagOpacity = true;
      if (this.parent) {
        this.parent._flagStops = true;
      }
    }
  },
  color: {
    enumerable: true,
    get: function() {
      return this._color;
    },
    set: function(v) {
      this._color = v;
      this._flagColor = true;
      if (this.parent) {
        this.parent._flagStops = true;
      }
    }
  }
};

// src/effects/gradient.js
var _Gradient = class extends Element {
  constructor(stops) {
    super();
    __publicField(this, "_flagStops", false);
    __publicField(this, "_flagSpread", false);
    __publicField(this, "_flagUnits", false);
    __publicField(this, "_spread", "");
    __publicField(this, "_units", "");
    for (let prop in proto7) {
      Object.defineProperty(this, prop, proto7[prop]);
    }
    this._renderer.type = "gradient";
    this.id = Constants.Identifier + Constants.uniqueId();
    this.classList = [];
    this._renderer.flagStops = FlagStops.bind(this);
    this._renderer.bindStops = BindStops.bind(this);
    this._renderer.unbindStops = UnbindStops.bind(this);
    this.spread = "pad";
    this.units = "objectBoundingBox";
    if (stops) {
      this.stops = stops;
    }
  }
  clone(parent) {
    const stops = this.stops.map(function(s) {
      return s.clone();
    });
    const clone = new _Gradient(stops);
    _.each(_Gradient.Properties, function(k) {
      clone[k] = this[k];
    }, this);
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const result = {
      stops: this.stops.map(function(s) {
        return s.toObject();
      })
    };
    _.each(_Gradient.Properties, function(k) {
      result[k] = this[k];
    }, this);
    return result;
  }
  _update() {
    if (this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }
    return this;
  }
  flagReset() {
    this._flagSpread = this._flagUnits = this._flagStops = false;
    super.flagReset.call(this);
    return this;
  }
};
var Gradient = _Gradient;
__publicField(Gradient, "Stop", Stop);
__publicField(Gradient, "Properties", ["spread", "stops", "renderer", "units"]);
var proto7 = {
  spread: {
    enumerable: true,
    get: function() {
      return this._spread;
    },
    set: function(v) {
      this._spread = v;
      this._flagSpread = true;
    }
  },
  units: {
    enumerable: true,
    get: function() {
      return this._units;
    },
    set: function(v) {
      this._units = v;
      this._flagUnits = true;
    }
  },
  stops: {
    enumerable: true,
    get: function() {
      return this._stops;
    },
    set: function(stops) {
      const bindStops = this._renderer.bindStops;
      const unbindStops = this._renderer.unbindStops;
      if (this._stops) {
        this._stops.unbind(Events.Types.insert, bindStops).unbind(Events.Types.remove, unbindStops);
      }
      this._stops = new Collection((stops || []).slice(0));
      this._stops.bind(Events.Types.insert, bindStops).bind(Events.Types.remove, unbindStops);
      bindStops(this._stops);
    }
  }
};
function FlagStops() {
  this._flagStops = true;
}
function BindStops(items) {
  let i = items.length;
  while (i--) {
    items[i].bind(Events.Types.change, this._renderer.flagStops);
    items[i].parent = this;
  }
  this._renderer.flagStops();
}
function UnbindStops(items) {
  let i = items.length;
  while (i--) {
    items[i].unbind(Events.Types.change, this._renderer.flagStops);
    delete items[i].parent;
  }
  this._renderer.flagStops();
}

// src/effects/linear-gradient.js
var _LinearGradient = class extends Gradient {
  constructor(x1, y1, x2, y2, stops) {
    super(stops);
    __publicField(this, "_flagEndPoints", false);
    __publicField(this, "_left", null);
    __publicField(this, "_right", null);
    for (let prop in proto8) {
      Object.defineProperty(this, prop, proto8[prop]);
    }
    this._renderer.type = "linear-gradient";
    this._renderer.flagEndPoints = FlagEndPoints.bind(this);
    this.left = new Vector();
    this.right = new Vector();
    if (typeof x1 === "number") {
      this.left.x = x1;
    }
    if (typeof y1 === "number") {
      this.left.y = y1;
    }
    if (typeof x2 === "number") {
      this.right.x = x2;
    }
    if (typeof y2 === "number") {
      this.right.y = y2;
    }
  }
  clone(parent) {
    const stops = this.stops.map(function(stop) {
      return stop.clone();
    });
    const clone = new _LinearGradient(this.left._x, this.left._y, this.right._x, this.right._y, stops);
    _.each(Gradient.Properties, function(k) {
      clone[k] = this[k];
    }, this);
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const result = super.toObject.call(this);
    result.left = this.left.toObject();
    result.right = this.right.toObject();
    return result;
  }
  _update() {
    if (this._flagEndPoints || this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }
    return this;
  }
  flagReset() {
    this._flagEndPoints = false;
    super.flagReset.call(this);
    return this;
  }
};
var LinearGradient = _LinearGradient;
__publicField(LinearGradient, "Properties", ["left", "right"]);
__publicField(LinearGradient, "Stop", Stop);
var proto8 = {
  left: {
    enumerable: true,
    get: function() {
      return this._left;
    },
    set: function(v) {
      if (this._left instanceof Vector) {
        this._left.unbind(Events.Types.change, this._renderer.flagEndPoints);
      }
      this._left = v;
      this._left.bind(Events.Types.change, this._renderer.flagEndPoints);
      this._flagEndPoints = true;
    }
  },
  right: {
    enumerable: true,
    get: function() {
      return this._right;
    },
    set: function(v) {
      if (this._right instanceof Vector) {
        this._right.unbind(Events.Types.change, this._renderer.flagEndPoints);
      }
      this._right = v;
      this._right.bind(Events.Types.change, this._renderer.flagEndPoints);
      this._flagEndPoints = true;
    }
  }
};
function FlagEndPoints() {
  this._flagEndPoints = true;
}

// src/effects/radial-gradient.js
var _RadialGradient = class extends Gradient {
  constructor(cx, cy, r, stops, fx, fy) {
    super(stops);
    __publicField(this, "_flagRadius", false);
    __publicField(this, "_flagCenter", false);
    __publicField(this, "_flagFocal", false);
    __publicField(this, "_radius", 0);
    __publicField(this, "_center", null);
    __publicField(this, "_focal", null);
    for (let prop in proto9) {
      Object.defineProperty(this, prop, proto9[prop]);
    }
    this._renderer.type = "radial-gradient";
    this._renderer.flagCenter = FlagCenter.bind(this);
    this._renderer.flagFocal = FlagFocal.bind(this);
    this.center = new Vector();
    this.radius = typeof r === "number" ? r : 1;
    this.focal = new Vector();
    if (typeof cx === "number") {
      this.center.x = cx;
    }
    if (typeof cy === "number") {
      this.center.y = cy;
    }
    this.focal.copy(this.center);
    if (typeof fx === "number") {
      this.focal.x = fx;
    }
    if (typeof fy === "number") {
      this.focal.y = fy;
    }
  }
  clone(parent) {
    const stops = this.stops.map(function(stop) {
      return stop.clone();
    });
    const clone = new _RadialGradient(this.center._x, this.center._y, this._radius, stops, this.focal._x, this.focal._y);
    _.each(Gradient.Properties.concat(_RadialGradient.Properties), function(k) {
      clone[k] = this[k];
    }, this);
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const result = super.toObject.call(this);
    _.each(_RadialGradient.Properties, function(k) {
      result[k] = this[k];
    }, this);
    result.center = this.center.toObject();
    result.focal = this.focal.toObject();
    return result;
  }
  _update() {
    if (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }
    return this;
  }
  flagReset() {
    this._flagRadius = this._flagCenter = this._flagFocal = false;
    super.flagReset.call(this);
    return this;
  }
};
var RadialGradient = _RadialGradient;
__publicField(RadialGradient, "Stop", Stop);
__publicField(RadialGradient, "Properties", ["center", "radius", "focal"]);
var proto9 = {
  radius: {
    enumerable: true,
    get: function() {
      return this._radius;
    },
    set: function(v) {
      this._radius = v;
      this._flagRadius = true;
    }
  },
  center: {
    enumerable: true,
    get: function() {
      return this._center;
    },
    set: function(v) {
      if (this._center) {
        this._center.unbind(Events.Types.change, this._renderer.flagCenter);
      }
      this._center = v;
      this._center.bind(Events.Types.change, this._renderer.flagCenter);
      this._flagCenter = true;
    }
  },
  focal: {
    enumerable: true,
    get: function() {
      return this._focal;
    },
    set: function(v) {
      if (this._focal) {
        this._focal.unbind(Events.Types.change, this._renderer.flagFocal);
      }
      this._focal = v;
      this._focal.bind(Events.Types.change, this._renderer.flagFocal);
      this._flagFocal = true;
    }
  }
};
function FlagCenter() {
  this._flagCenter = true;
}
function FlagFocal() {
  this._flagFocal = true;
}

// src/effects/texture.js
var anchor;
var regex = {
  video: /\.(mp4|webm|ogg)$/i,
  image: /\.(jpe?g|png|gif|tiff|webp)$/i,
  effect: /texture|gradient/i
};
if (root.document) {
  anchor = document.createElement("a");
}
var _Texture = class extends Element {
  constructor(src, callback) {
    super();
    __publicField(this, "_flagSrc", false);
    __publicField(this, "_flagImage", false);
    __publicField(this, "_flagVideo", false);
    __publicField(this, "_flagLoaded", false);
    __publicField(this, "_flagRepeat", false);
    __publicField(this, "_flagOffset", false);
    __publicField(this, "_flagScale", false);
    __publicField(this, "_src", "");
    __publicField(this, "_image", null);
    __publicField(this, "_loaded", false);
    __publicField(this, "_repeat", "no-repeat");
    __publicField(this, "_scale", 1);
    __publicField(this, "_offset", null);
    this._renderer = {};
    for (let prop in proto10) {
      Object.defineProperty(this, prop, proto10[prop]);
    }
    this._renderer.type = "texture";
    this._renderer.flagOffset = FlagOffset.bind(this);
    this._renderer.flagScale = FlagScale.bind(this);
    this.id = Constants.Identifier + Constants.uniqueId();
    this.classList = [];
    this.loaded = false;
    this.repeat = "no-repeat";
    this.offset = new Vector();
    if (typeof callback === "function") {
      const loaded = function() {
        this.unbind(Events.Types.load, loaded);
        if (typeof callback === "function") {
          callback();
        }
      }.bind(this);
      this.bind(Events.Types.load, loaded);
    }
    if (typeof src === "string") {
      this.src = src;
    } else if (typeof src === "object") {
      const elemString = Object.prototype.toString.call(src);
      if (elemString === "[object HTMLImageElement]" || elemString === "[object HTMLCanvasElement]" || elemString === "[object HTMLVideoElement]" || elemString === "[object Image]") {
        this.image = src;
      }
    }
    this._update();
  }
  static getAbsoluteURL(path) {
    if (!anchor) {
      return path;
    }
    anchor.href = path;
    return anchor.href;
  }
  static loadHeadlessBuffer(texture, loaded) {
    texture.image.onload = loaded;
    texture.image.src = texture.src;
  }
  static getTag(image) {
    return image && image.nodeName && image.nodeName.toLowerCase() || "img";
  }
  static getImage(src) {
    const absoluteSrc = _Texture.getAbsoluteURL(src);
    if (_Texture.ImageRegistry.contains(absoluteSrc)) {
      return _Texture.ImageRegistry.get(absoluteSrc);
    }
    let image;
    if (CanvasShim.Image) {
      image = new CanvasShim.Image();
      Renderer.Utils.shim(image, "img");
    } else if (root.document) {
      if (regex.video.test(absoluteSrc)) {
        image = document.createElement("video");
      } else {
        image = document.createElement("img");
      }
    } else {
      console.warn("Two.js: no prototypical image defined for Two.Texture");
    }
    image.crossOrigin = "anonymous";
    return image;
  }
  static load(texture, callback) {
    let image = texture.image;
    let tag = _Texture.getTag(image);
    if (texture._flagImage) {
      if (/canvas/i.test(tag)) {
        _Texture.Register.canvas(texture, callback);
      } else {
        texture._src = !CanvasShim.isHeadless && image.getAttribute("two-src") || image.src;
        _Texture.Register[tag](texture, callback);
      }
    }
    if (texture._flagSrc) {
      if (!image) {
        image = _Texture.getImage(texture.src);
        texture.image = image;
      }
      tag = _Texture.getTag(image);
      _Texture.Register[tag](texture, callback);
    }
  }
  clone() {
    const clone = new _Texture(this.src);
    clone.repeat = this.repeat;
    clone.offset.copy(this.origin);
    clone.scale = this.scale;
    return clone;
  }
  toObject() {
    return {
      src: this.src,
      repeat: this.repeat,
      origin: this.origin.toObject(),
      scale: typeof this.scale === "number" ? this.scale : this.scale.toObject()
    };
  }
  _update() {
    if (this._flagSrc || this._flagImage) {
      this.trigger(Events.Types.change);
      if (this._flagSrc || this._flagImage) {
        this.loaded = false;
        _Texture.load(this, function() {
          this.loaded = true;
          this.trigger(Events.Types.change).trigger(Events.Types.load);
        }.bind(this));
      }
    }
    if (this._image && this._image.readyState >= 4) {
      this._flagVideo = true;
    }
    return this;
  }
  flagReset() {
    this._flagSrc = this._flagImage = this._flagLoaded = this._flagRepeat = this._flagVideo = this._flagScale = this._flagOffset = false;
    super.flagReset.call(this);
    return this;
  }
};
var Texture = _Texture;
__publicField(Texture, "Properties", [
  "src",
  "loaded",
  "repeat",
  "scale",
  "offset",
  "image"
]);
__publicField(Texture, "RegularExpressions", regex);
__publicField(Texture, "ImageRegistry", new Registry());
__publicField(Texture, "Register", {
  canvas: function(texture, callback) {
    texture._src = "#" + texture.id;
    _Texture.ImageRegistry.add(texture.src, texture.image);
    if (typeof callback === "function") {
      callback();
    }
  },
  img: function(texture, callback) {
    const image = texture.image;
    const loaded = function(e) {
      if (!CanvasShim.isHeadless && image.removeEventListener && typeof image.removeEventListener === "function") {
        image.removeEventListener("load", loaded, false);
        image.removeEventListener("error", error, false);
      }
      if (typeof callback === "function") {
        callback();
      }
    };
    const error = function(e) {
      if (!CanvasShim.isHeadless && typeof image.removeEventListener === "function") {
        image.removeEventListener("load", loaded, false);
        image.removeEventListener("error", error, false);
      }
      throw new TwoError("unable to load " + texture.src);
    };
    if (typeof image.width === "number" && image.width > 0 && typeof image.height === "number" && image.height > 0) {
      loaded();
    } else if (!CanvasShim.isHeadless && typeof image.addEventListener === "function") {
      image.addEventListener("load", loaded, false);
      image.addEventListener("error", error, false);
    }
    texture._src = _Texture.getAbsoluteURL(texture._src);
    if (!CanvasShim.isHeadless && image && image.getAttribute("two-src")) {
      return;
    }
    if (!CanvasShim.isHeadless) {
      image.setAttribute("two-src", texture.src);
    }
    _Texture.ImageRegistry.add(texture.src, image);
    if (CanvasShim.isHeadless) {
      _Texture.loadHeadlessBuffer(texture, loaded);
    } else {
      texture.image.src = texture.src;
    }
  },
  video: function(texture, callback) {
    if (CanvasShim.isHeadless) {
      throw new TwoError("video textures are not implemented in headless environments.");
    }
    const loaded = function(e) {
      texture.image.removeEventListener("canplaythrough", loaded, false);
      texture.image.removeEventListener("error", error, false);
      texture.image.width = texture.image.videoWidth;
      texture.image.height = texture.image.videoHeight;
      if (typeof callback === "function") {
        callback();
      }
    };
    const error = function(e) {
      texture.image.removeEventListener("canplaythrough", loaded, false);
      texture.image.removeEventListener("error", error, false);
      throw new TwoError("unable to load " + texture.src);
    };
    texture._src = _Texture.getAbsoluteURL(texture._src);
    if (!texture.image.getAttribute("two-src")) {
      texture.image.setAttribute("two-src", texture.src);
      _Texture.ImageRegistry.add(texture.src, texture.image);
    }
    if (texture.image.readyState >= 4) {
      loaded();
    } else {
      texture.image.addEventListener("canplaythrough", loaded, false);
      texture.image.addEventListener("error", error, false);
      texture.image.src = texture.src;
      texture.image.load();
    }
  }
});
var proto10 = {
  src: {
    enumerable: true,
    get: function() {
      return this._src;
    },
    set: function(v) {
      this._src = v;
      this._flagSrc = true;
    }
  },
  loaded: {
    enumerable: true,
    get: function() {
      return this._loaded;
    },
    set: function(v) {
      this._loaded = v;
      this._flagLoaded = true;
    }
  },
  repeat: {
    enumerable: true,
    get: function() {
      return this._repeat;
    },
    set: function(v) {
      this._repeat = v;
      this._flagRepeat = true;
    }
  },
  image: {
    enumerable: true,
    get: function() {
      return this._image;
    },
    set: function(image) {
      const tag = Texture.getTag(image);
      let index;
      switch (tag) {
        case "canvas":
          index = "#" + image.id;
          break;
        default:
          index = image.src;
      }
      if (Texture.ImageRegistry.contains(index)) {
        this._image = Texture.ImageRegistry.get(image.src);
      } else {
        this._image = image;
      }
      this._flagImage = true;
    }
  },
  offset: {
    enumerable: true,
    get: function() {
      return this._offset;
    },
    set: function(v) {
      if (this._offset) {
        this._offset.unbind(Events.Types.change, this._renderer.flagOffset);
      }
      this._offset = v;
      this._offset.bind(Events.Types.change, this._renderer.flagOffset);
      this._flagOffset = true;
    }
  },
  scale: {
    enumerable: true,
    get: function() {
      return this._scale;
    },
    set: function(v) {
      if (this._scale instanceof Vector) {
        this._scale.unbind(Events.Types.change, this._renderer.flagScale);
      }
      this._scale = v;
      if (this._scale instanceof Vector) {
        this._scale.bind(Events.Types.change, this._renderer.flagScale);
      }
      this._flagScale = true;
    }
  }
};
function FlagOffset() {
  this._flagOffset = true;
}
function FlagScale() {
  this._flagScale = true;
}

// src/path.js
var min3 = Math.min;
var max3 = Math.max;
var ceil = Math.ceil;
var floor2 = Math.floor;
var vector = new Vector();
var _Path = class extends Shape {
  constructor(vertices, closed2, curved, manual) {
    super();
    __publicField(this, "_flagVertices", true);
    __publicField(this, "_flagLength", true);
    __publicField(this, "_flagFill", true);
    __publicField(this, "_flagStroke", true);
    __publicField(this, "_flagLinewidth", true);
    __publicField(this, "_flagOpacity", true);
    __publicField(this, "_flagVisible", true);
    __publicField(this, "_flagCap", true);
    __publicField(this, "_flagJoin", true);
    __publicField(this, "_flagMiter", true);
    __publicField(this, "_flagMask", false);
    __publicField(this, "_flagClip", false);
    __publicField(this, "_length", 0);
    __publicField(this, "_fill", "#fff");
    __publicField(this, "_stroke", "#000");
    __publicField(this, "_linewidth", 1);
    __publicField(this, "_opacity", 1);
    __publicField(this, "_visible", true);
    __publicField(this, "_cap", "round");
    __publicField(this, "_join", "round");
    __publicField(this, "_miter", 4);
    __publicField(this, "_closed", true);
    __publicField(this, "_curved", false);
    __publicField(this, "_automatic", true);
    __publicField(this, "_beginning", 0);
    __publicField(this, "_ending", 1);
    __publicField(this, "_mask", null);
    __publicField(this, "_clip", false);
    __publicField(this, "_dashes", null);
    for (let prop in proto11) {
      Object.defineProperty(this, prop, proto11[prop]);
    }
    this._renderer.type = "path";
    this._renderer.flagVertices = FlagVertices.bind(this);
    this._renderer.bindVertices = BindVertices.bind(this);
    this._renderer.unbindVertices = UnbindVertices.bind(this);
    this._renderer.flagFill = FlagFill.bind(this);
    this._renderer.flagStroke = FlagStroke.bind(this);
    this._renderer.vertices = [];
    this._renderer.collection = [];
    this.closed = !!closed2;
    this.curved = !!curved;
    this.beginning = 0;
    this.ending = 1;
    this.fill = "#fff";
    this.stroke = "#000";
    this.linewidth = 1;
    this.opacity = 1;
    this.className = "";
    this.visible = true;
    this.cap = "butt";
    this.join = "miter";
    this.miter = 4;
    this.vertices = vertices;
    this.automatic = !manual;
    this.dashes = [];
    this.dashes.offset = 0;
  }
  clone(parent) {
    const clone = new _Path();
    for (let j = 0; j < this.vertices.length; j++) {
      clone.vertices.push(this.vertices[j].clone());
    }
    for (let i = 0; i < _Path.Properties.length; i++) {
      const k = _Path.Properties[i];
      clone[k] = this[k];
    }
    clone.className = this.className;
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    if (parent) {
      parent.add(clone);
    }
    return clone._update();
  }
  toObject() {
    const result = {
      vertices: this.vertices.map(function(v) {
        return v.toObject();
      })
    };
    _.each(_Path.Properties, function(k) {
      if (typeof this[k] !== "undefined") {
        if (this[k].toObject) {
          result[k] = this[k].toObject();
        } else {
          result[k] = this[k];
        }
      }
    }, this);
    result.className = this.className;
    result.translation = this.translation.toObject();
    result.rotation = this.rotation;
    result.scale = this.scale instanceof Vector ? this.scale.toObject() : this.scale;
    result.skewX = this.skewX;
    result.skewY = this.skewY;
    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }
    return result;
  }
  noFill() {
    this.fill = "transparent";
    return this;
  }
  noStroke() {
    this.stroke = void 0;
    return this;
  }
  corner() {
    const rect = this.getBoundingClientRect(true);
    const hw = rect.width / 2;
    const hh = rect.height / 2;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      v.x -= cx;
      v.y -= cy;
      v.x += hw;
      v.y += hh;
    }
    if (this.mask) {
      this.mask.translation.x -= cx;
      this.mask.translation.x += hw;
      this.mask.translation.y -= cy;
      this.mask.translation.y += hh;
    }
    return this;
  }
  center() {
    const rect = this.getBoundingClientRect(true);
    const cx = rect.left + rect.width / 2 - this.translation.x;
    const cy = rect.top + rect.height / 2 - this.translation.y;
    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      v.x -= cx;
      v.y -= cy;
    }
    if (this.mask) {
      this.mask.translation.x -= cx;
      this.mask.translation.y -= cy;
    }
    return this;
  }
  getBoundingClientRect(shallow) {
    let matrix3, border, l, i, v0, v1, c0x, c0y, c1x, c1y, a, b, c, d;
    let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
    this._update(true);
    matrix3 = shallow ? this._matrix : getComputedMatrix(this);
    border = (this.linewidth || 0) / 2;
    l = this._renderer.vertices.length;
    if (l <= 0) {
      return {
        width: 0,
        height: 0
      };
    }
    for (i = 0; i < l; i++) {
      v1 = this._renderer.vertices[i];
      v0 = this._renderer.vertices[(i + l - 1) % l];
      if (v0.controls && v1.controls) {
        c0x = v0.controls.right.x;
        c0y = v0.controls.right.y;
        if (v0.relative) {
          c0x += v0.x;
          c0y += v0.y;
        }
        c1x = v1.controls.left.x;
        c1y = v1.controls.left.y;
        if (v1.relative) {
          c1x += v1.x;
          c1y += v1.y;
        }
        const bb = getCurveBoundingBox(v0.x, v0.y, c0x, c0y, c1x, c1y, v1.x, v1.y);
        top = min3(bb.min.y - border, top);
        left = min3(bb.min.x - border, left);
        right = max3(bb.max.x + border, right);
        bottom = max3(bb.max.y + border, bottom);
      } else {
        if (i <= 1) {
          top = min3(v0.y - border, top);
          left = min3(v0.x - border, left);
          right = max3(v0.x + border, right);
          bottom = max3(v0.y + border, bottom);
        }
        top = min3(v1.y - border, top);
        left = min3(v1.x - border, left);
        right = max3(v1.x + border, right);
        bottom = max3(v1.y + border, bottom);
      }
    }
    a = matrix3.multiply(left, top, 1);
    b = matrix3.multiply(left, bottom, 1);
    c = matrix3.multiply(right, top, 1);
    d = matrix3.multiply(right, bottom, 1);
    top = min3(a.y, b.y, c.y, d.y);
    left = min3(a.x, b.x, c.x, d.x);
    right = max3(a.x, b.x, c.x, d.x);
    bottom = max3(a.y, b.y, c.y, d.y);
    return {
      top,
      left,
      right,
      bottom,
      width: right - left,
      height: bottom - top
    };
  }
  getPointAt(t, obj) {
    let ia, ib, result;
    let x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
    let target = this.length * Math.min(Math.max(t, 0), 1);
    const length = this.vertices.length;
    const last = length - 1;
    let a = null;
    let b = null;
    for (let i = 0, l = this._lengths.length, sum = 0; i < l; i++) {
      if (sum + this._lengths[i] >= target) {
        if (this._closed) {
          ia = mod(i, length);
          ib = mod(i - 1, length);
          if (i === 0) {
            ia = ib;
            ib = i;
          }
        } else {
          ia = i;
          ib = Math.min(Math.max(i - 1, 0), last);
        }
        a = this.vertices[ia];
        b = this.vertices[ib];
        target -= sum;
        if (this._lengths[i] !== 0) {
          t = target / this._lengths[i];
        } else {
          t = 0;
        }
        break;
      }
      sum += this._lengths[i];
    }
    if (a === null || b === null) {
      return null;
    }
    if (!a) {
      return b;
    } else if (!b) {
      return a;
    }
    right = b.controls && b.controls.right;
    left = a.controls && a.controls.left;
    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;
    if (right && b.relative) {
      x2 += b.x;
      y2 += b.y;
    }
    if (left && a.relative) {
      x3 += a.x;
      y3 += a.y;
    }
    x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
    y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
    const t1x = lerp(x1, x2, t);
    const t1y = lerp(y1, y2, t);
    const t2x = lerp(x2, x3, t);
    const t2y = lerp(y2, y3, t);
    const t3x = lerp(x3, x4, t);
    const t3y = lerp(y3, y4, t);
    const brx = lerp(t1x, t2x, t);
    const bry = lerp(t1y, t2y, t);
    const alx = lerp(t2x, t3x, t);
    const aly = lerp(t2y, t3y, t);
    if (_.isObject(obj)) {
      obj.x = x;
      obj.y = y;
      if (obj instanceof Anchor) {
        obj.controls.left.x = brx;
        obj.controls.left.y = bry;
        obj.controls.right.x = alx;
        obj.controls.right.y = aly;
        if (!(typeof obj.relative === "boolean") || obj.relative) {
          obj.controls.left.x -= x;
          obj.controls.left.y -= y;
          obj.controls.right.x -= x;
          obj.controls.right.y -= y;
        }
      }
      obj.t = t;
      return obj;
    }
    result = new Anchor(x, y, brx - x, bry - y, alx - x, aly - y, this._curved ? Commands.curve : Commands.line);
    result.t = t;
    return result;
  }
  plot() {
    if (this.curved) {
      getCurveFromPoints(this._collection, this.closed);
      return this;
    }
    for (let i = 0; i < this._collection.length; i++) {
      this._collection[i].command = i === 0 ? Commands.move : Commands.line;
    }
    return this;
  }
  subdivide(limit) {
    this._update();
    const last = this.vertices.length - 1;
    const closed2 = this._closed || this.vertices[last]._command === Commands.close;
    let b = this.vertices[last];
    let points = [], verts;
    _.each(this.vertices, function(a, i) {
      if (i <= 0 && !closed2) {
        b = a;
        return;
      }
      if (a.command === Commands.move) {
        points.push(new Anchor(b.x, b.y));
        if (i > 0) {
          points[points.length - 1].command = Commands.line;
        }
        b = a;
        return;
      }
      verts = getSubdivisions(a, b, limit);
      points = points.concat(verts);
      _.each(verts, function(v, i2) {
        if (i2 <= 0 && b.command === Commands.move) {
          v.command = Commands.move;
        } else {
          v.command = Commands.line;
        }
      });
      if (i >= last) {
        if (this._closed && this._automatic) {
          b = a;
          verts = getSubdivisions(a, b, limit);
          points = points.concat(verts);
          _.each(verts, function(v, i2) {
            if (i2 <= 0 && b.command === Commands.move) {
              v.command = Commands.move;
            } else {
              v.command = Commands.line;
            }
          });
        } else if (closed2) {
          points.push(new Anchor(a.x, a.y));
        }
        points[points.length - 1].command = closed2 ? Commands.close : Commands.line;
      }
      b = a;
    }, this);
    this._automatic = false;
    this._curved = false;
    this.vertices = points;
    return this;
  }
  _updateLength(limit, silent) {
    if (!silent) {
      this._update();
    }
    const length = this.vertices.length;
    const last = length - 1;
    const closed2 = false;
    let b = this.vertices[last];
    let sum = 0;
    if (typeof this._lengths === "undefined") {
      this._lengths = [];
    }
    _.each(this.vertices, function(a, i) {
      if (i <= 0 && !closed2 || a.command === Commands.move) {
        b = a;
        this._lengths[i] = 0;
        return;
      }
      this._lengths[i] = getCurveLength2(a, b, limit);
      sum += this._lengths[i];
      if (i >= last && closed2) {
        b = this.vertices[(i + 1) % length];
        this._lengths[i + 1] = getCurveLength2(a, b, limit);
        sum += this._lengths[i + 1];
      }
      b = a;
    }, this);
    this._length = sum;
    this._flagLength = false;
    return this;
  }
  _update() {
    if (this._flagVertices) {
      if (this._automatic) {
        this.plot();
      }
      if (this._flagLength) {
        this._updateLength(void 0, true);
      }
      const l = this._collection.length;
      const closed2 = this._closed;
      const beginning = Math.min(this._beginning, this._ending);
      const ending = Math.max(this._beginning, this._ending);
      const bid = getIdByLength(this, beginning * this._length);
      const eid = getIdByLength(this, ending * this._length);
      const low = ceil(bid);
      const high = floor2(eid);
      let left, right, prev, next, v, i;
      this._renderer.vertices.length = 0;
      for (i = 0; i < l; i++) {
        if (this._renderer.collection.length <= i) {
          this._renderer.collection.push(new Anchor());
        }
        if (i > high && !right) {
          v = this._renderer.collection[i].copy(this._collection[i]);
          this.getPointAt(ending, v);
          v.command = this._renderer.collection[i].command;
          this._renderer.vertices.push(v);
          right = v;
          prev = this._collection[i - 1];
          if (prev && prev.controls) {
            if (v.relative) {
              v.controls.right.clear();
            } else {
              v.controls.right.copy(v);
            }
            if (prev.relative) {
              this._renderer.collection[i - 1].controls.right.copy(prev.controls.right).lerp(Vector.zero, 1 - v.t);
            } else {
              this._renderer.collection[i - 1].controls.right.copy(prev.controls.right).lerp(prev, 1 - v.t);
            }
          }
        } else if (i >= low && i <= high) {
          v = this._renderer.collection[i].copy(this._collection[i]);
          this._renderer.vertices.push(v);
          if (i === high && contains(this, ending)) {
            right = v;
            if (!closed2 && right.controls) {
              if (right.relative) {
                right.controls.right.clear();
              } else {
                right.controls.right.copy(right);
              }
            }
          } else if (i === low && contains(this, beginning)) {
            left = v;
            left.command = Commands.move;
            if (!closed2 && left.controls) {
              if (left.relative) {
                left.controls.left.clear();
              } else {
                left.controls.left.copy(left);
              }
            }
          }
        }
      }
      if (low > 0 && !left) {
        i = low - 1;
        v = this._renderer.collection[i].copy(this._collection[i]);
        this.getPointAt(beginning, v);
        v.command = Commands.move;
        this._renderer.vertices.unshift(v);
        next = this._collection[i + 1];
        if (next && next.controls) {
          v.controls.left.clear();
          if (next.relative) {
            this._renderer.collection[i + 1].controls.left.copy(next.controls.left).lerp(Vector.zero, v.t);
          } else {
            vector.copy(next);
            this._renderer.collection[i + 1].controls.left.copy(next.controls.left).lerp(next, v.t);
          }
        }
      }
    }
    Shape.prototype._update.apply(this, arguments);
    return this;
  }
  flagReset() {
    this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = false;
    Shape.prototype.flagReset.call(this);
    return this;
  }
};
var Path = _Path;
__publicField(Path, "Properties", [
  "fill",
  "stroke",
  "linewidth",
  "opacity",
  "visible",
  "cap",
  "join",
  "miter",
  "closed",
  "curved",
  "automatic",
  "beginning",
  "ending"
]);
__publicField(Path, "Utils", {
  getCurveLength: getCurveLength2
});
var proto11 = {
  linewidth: {
    enumerable: true,
    get: function() {
      return this._linewidth;
    },
    set: function(v) {
      this._linewidth = v;
      this._flagLinewidth = true;
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._opacity = v;
      this._flagOpacity = true;
    }
  },
  visible: {
    enumerable: true,
    get: function() {
      return this._visible;
    },
    set: function(v) {
      this._visible = v;
      this._flagVisible = true;
    }
  },
  cap: {
    enumerable: true,
    get: function() {
      return this._cap;
    },
    set: function(v) {
      this._cap = v;
      this._flagCap = true;
    }
  },
  join: {
    enumerable: true,
    get: function() {
      return this._join;
    },
    set: function(v) {
      this._join = v;
      this._flagJoin = true;
    }
  },
  miter: {
    enumerable: true,
    get: function() {
      return this._miter;
    },
    set: function(v) {
      this._miter = v;
      this._flagMiter = true;
    }
  },
  fill: {
    enumerable: true,
    get: function() {
      return this._fill;
    },
    set: function(f) {
      if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
        this._fill.unbind(Events.Types.change, this._renderer.flagFill);
      }
      this._fill = f;
      this._flagFill = true;
      if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
        this._fill.bind(Events.Types.change, this._renderer.flagFill);
      }
    }
  },
  stroke: {
    enumerable: true,
    get: function() {
      return this._stroke;
    },
    set: function(f) {
      if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
        this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
      }
      this._stroke = f;
      this._flagStroke = true;
      if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
        this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
      }
    }
  },
  length: {
    get: function() {
      if (this._flagLength) {
        this._updateLength();
      }
      return this._length;
    }
  },
  closed: {
    enumerable: true,
    get: function() {
      return this._closed;
    },
    set: function(v) {
      this._closed = !!v;
      this._flagVertices = true;
    }
  },
  curved: {
    enumerable: true,
    get: function() {
      return this._curved;
    },
    set: function(v) {
      this._curved = !!v;
      this._flagVertices = true;
    }
  },
  automatic: {
    enumerable: true,
    get: function() {
      return this._automatic;
    },
    set: function(v) {
      if (v === this._automatic) {
        return;
      }
      this._automatic = !!v;
      const method = this._automatic ? "ignore" : "listen";
      _.each(this.vertices, function(v2) {
        v2[method]();
      });
    }
  },
  beginning: {
    enumerable: true,
    get: function() {
      return this._beginning;
    },
    set: function(v) {
      this._beginning = v;
      this._flagVertices = true;
    }
  },
  ending: {
    enumerable: true,
    get: function() {
      return this._ending;
    },
    set: function(v) {
      this._ending = v;
      this._flagVertices = true;
    }
  },
  vertices: {
    enumerable: true,
    get: function() {
      return this._collection;
    },
    set: function(vertices) {
      const bindVertices = this._renderer.bindVertices;
      const unbindVertices = this._renderer.unbindVertices;
      if (this._collection) {
        this._collection.unbind(Events.Types.insert, bindVertices).unbind(Events.Types.remove, unbindVertices);
      }
      if (vertices instanceof Collection) {
        this._collection = vertices;
      } else {
        this._collection = new Collection(vertices || []);
      }
      this._collection.bind(Events.Types.insert, bindVertices).bind(Events.Types.remove, unbindVertices);
      bindVertices(this._collection);
    }
  },
  mask: {
    enumerable: true,
    get: function() {
      return this._mask;
    },
    set: function(v) {
      this._mask = v;
      this._flagMask = true;
      if (_.isObject(v) && !v.clip) {
        v.clip = true;
      }
    }
  },
  clip: {
    enumerable: true,
    get: function() {
      return this._clip;
    },
    set: function(v) {
      this._clip = v;
      this._flagClip = true;
    }
  },
  dashes: {
    enumerable: true,
    get: function() {
      return this._dashes;
    },
    set: function(v) {
      if (typeof v.offset !== "number") {
        v.offset = this.dashes && this._dashes.offset || 0;
      }
      this._dashes = v;
    }
  }
};
function FlagVertices() {
  this._flagVertices = true;
  this._flagLength = true;
  if (this.parent) {
    this.parent._flagLength = true;
  }
}
function BindVertices(items) {
  let i = items.length;
  while (i--) {
    items[i].bind(Events.Types.change, this._renderer.flagVertices);
  }
  this._renderer.flagVertices();
}
function UnbindVertices(items) {
  let i = items.length;
  while (i--) {
    items[i].unbind(Events.Types.change, this._renderer.flagVertices);
  }
  this._renderer.flagVertices();
}
function FlagFill() {
  this._flagFill = true;
}
function FlagStroke() {
  this._flagStroke = true;
}

// src/shapes/rectangle.js
var _Rectangle = class extends Path {
  constructor(x, y, width, height) {
    const points = [
      new Anchor(),
      new Anchor(),
      new Anchor(),
      new Anchor()
    ];
    super(points, true, false, true);
    __publicField(this, "_flagWidth", 0);
    __publicField(this, "_flagHeight", 0);
    __publicField(this, "_width", 0);
    __publicField(this, "_height", 0);
    __publicField(this, "_origin", null);
    for (let prop in proto12) {
      Object.defineProperty(this, prop, proto12[prop]);
    }
    this.width = typeof width === "number" ? width : 1;
    this.height = typeof height === "number" ? height : 1;
    this.origin = new Vector();
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
    this._update();
  }
  _update() {
    if (this._flagVertices || this._flagWidth || this._flagHeight) {
      const xr = this._width / 2;
      const yr = this._height / 2;
      if (!this._closed && this.vertices.length === 4) {
        this.vertices.push(new Anchor());
      }
      this.vertices[0].set(-xr, -yr).sub(this._origin).command = Commands.move;
      this.vertices[1].set(xr, -yr).sub(this._origin).command = Commands.line;
      this.vertices[2].set(xr, yr).sub(this._origin).command = Commands.line;
      this.vertices[3].set(-xr, yr).sub(this._origin).command = Commands.line;
      if (this.vertices[4]) {
        this.vertices[4].set(-xr, -yr).sub(this._origin).command = Commands.line;
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagWidth = this._flagHeight = false;
    super.flagReset.call(this);
    return this;
  }
  clone(parent) {
    const clone = new _Rectangle(0, 0, this.width, this.height);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    object.width = this.width;
    object.height = this.height;
    object.origin = this.origin.toObject();
    return object;
  }
};
var Rectangle = _Rectangle;
__publicField(Rectangle, "Properties", ["width", "height"]);
var proto12 = {
  width: {
    enumerable: true,
    get: function() {
      return this._width;
    },
    set: function(v) {
      this._width = v;
      this._flagWidth = true;
    }
  },
  height: {
    enumerable: true,
    get: function() {
      return this._height;
    },
    set: function(v) {
      this._height = v;
      this._flagHeight = true;
    }
  },
  origin: {
    enumerable: true,
    get: function() {
      return this._origin;
    },
    set: function(v) {
      if (this._origin) {
        this._origin.unbind(Events.Types.change, this._renderer.flagVertices);
      }
      this._origin = v;
      this._origin.bind(Events.Types.change, this._renderer.flagVertices);
      this._renderer.flagVertices();
    }
  }
};

// src/effects/sprite.js
var _Sprite = class extends Rectangle {
  constructor(path, ox, oy, cols, rows, frameRate) {
    super(ox, oy, 0, 0);
    __publicField(this, "_flagTexture", false);
    __publicField(this, "_flagColumns", false);
    __publicField(this, "_flagRows", false);
    __publicField(this, "_flagFrameRate", false);
    __publicField(this, "_flagIndex", false);
    __publicField(this, "_amount", 1);
    __publicField(this, "_duration", 0);
    __publicField(this, "_startTime", 0);
    __publicField(this, "_playing", false);
    __publicField(this, "_firstFrame", 0);
    __publicField(this, "_lastFrame", 0);
    __publicField(this, "_loop", true);
    __publicField(this, "_texture", null);
    __publicField(this, "_columns", 1);
    __publicField(this, "_rows", 1);
    __publicField(this, "_frameRate", 0);
    __publicField(this, "_index", 0);
    __publicField(this, "_origin", null);
    for (let prop in proto13) {
      Object.defineProperty(this, prop, proto13[prop]);
    }
    this.noStroke();
    this.noFill();
    if (path instanceof Texture) {
      this.texture = path;
    } else if (typeof path === "string") {
      this.texture = new Texture(path);
    }
    this.origin = new Vector();
    this._update();
    if (typeof cols === "number") {
      this.columns = cols;
    }
    if (typeof rows === "number") {
      this.rows = rows;
    }
    if (typeof frameRate === "number") {
      this.frameRate = frameRate;
    }
    this.index = 0;
  }
  play(firstFrame, lastFrame, onLastFrame) {
    this._playing = true;
    this._firstFrame = 0;
    this._lastFrame = this.amount - 1;
    this._startTime = _.performance.now();
    if (typeof firstFrame === "number") {
      this._firstFrame = firstFrame;
    }
    if (typeof lastFrame === "number") {
      this._lastFrame = lastFrame;
    }
    if (typeof onLastFrame === "function") {
      this._onLastFrame = onLastFrame;
    } else {
      delete this._onLastFrame;
    }
    if (this._index !== this._firstFrame) {
      this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate;
    }
    return this;
  }
  pause() {
    this._playing = false;
    return this;
  }
  stop() {
    this._playing = false;
    this._index = 0;
    return this;
  }
  clone(parent) {
    const clone = new _Sprite(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
    if (this.playing) {
      clone.play(this._firstFrame, this._lastFrame);
      clone._loop = this._loop;
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    object.texture = this.texture.toObject();
    object.columns = this.columns;
    object.rows = this.rows;
    object.frameRate = this.frameRate;
    object.index = this.index;
    object._firstFrame = this._firstFrame;
    object._lastFrame = this._lastFrame;
    object._loop = this._loop;
    return object;
  }
  _update() {
    const effect = this._texture;
    const cols = this._columns;
    const rows = this._rows;
    let width, height, elapsed, amount, duration;
    let index, iw, ih, frames;
    if (effect) {
      if (this._flagColumns || this._flagRows) {
        this._amount = this._columns * this._rows;
      }
      if (this._flagFrameRate) {
        this._duration = 1e3 * this._amount / this._frameRate;
      }
      if (this._flagTexture) {
        this.fill = effect;
      }
      if (effect.loaded) {
        iw = effect.image.width;
        ih = effect.image.height;
        width = iw / cols;
        height = ih / rows;
        amount = this._amount;
        if (this.width !== width) {
          this.width = width;
        }
        if (this.height !== height) {
          this.height = height;
        }
        if (this._playing && this._frameRate > 0) {
          if (_.isNaN(this._lastFrame)) {
            this._lastFrame = amount - 1;
          }
          elapsed = _.performance.now() - this._startTime;
          frames = this._lastFrame + 1;
          duration = 1e3 * (frames - this._firstFrame) / this._frameRate;
          if (this._loop) {
            elapsed = elapsed % duration;
          } else {
            elapsed = Math.min(elapsed, duration);
          }
          index = lerp(this._firstFrame, frames, elapsed / duration);
          index = Math.floor(index);
          if (index !== this._index) {
            this._index = index;
            if (index >= this._lastFrame - 1 && this._onLastFrame) {
              this._onLastFrame();
            }
          }
        }
        const col = this._index % cols;
        const row = Math.floor(this._index / cols);
        const ox = -width * col + (iw - width) / 2;
        const oy = -height * row + (ih - height) / 2;
        if (ox !== effect.offset.x) {
          effect.offset.x = ox;
        }
        if (oy !== effect.offset.y) {
          effect.offset.y = oy;
        }
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = false;
    super.flagReset.call(this);
    return this;
  }
};
var Sprite = _Sprite;
__publicField(Sprite, "Properties", [
  "texture",
  "columns",
  "rows",
  "frameRate",
  "index"
]);
var proto13 = {
  texture: {
    enumerable: true,
    get: function() {
      return this._texture;
    },
    set: function(v) {
      this._texture = v;
      this._flagTexture = true;
    }
  },
  columns: {
    enumerable: true,
    get: function() {
      return this._columns;
    },
    set: function(v) {
      this._columns = v;
      this._flagColumns = true;
    }
  },
  rows: {
    enumerable: true,
    get: function() {
      return this._rows;
    },
    set: function(v) {
      this._rows = v;
      this._flagRows = true;
    }
  },
  frameRate: {
    enumerable: true,
    get: function() {
      return this._frameRate;
    },
    set: function(v) {
      this._frameRate = v;
      this._flagFrameRate = true;
    }
  },
  index: {
    enumerable: true,
    get: function() {
      return this._index;
    },
    set: function(v) {
      this._index = v;
      this._flagIndex = true;
    }
  }
};

// src/shapes/circle.js
var cos3 = Math.cos;
var sin3 = Math.sin;
var _Circle = class extends Path {
  constructor(ox, oy, r, resolution) {
    const amount = resolution ? Math.max(resolution, 2) : 4;
    const points = [];
    for (let i = 0; i < amount; i++) {
      points.push(new Anchor(0, 0, 0, 0, 0, 0));
    }
    super(points, true, true, true);
    __publicField(this, "_flagRadius", false);
    __publicField(this, "_radius", 0);
    for (let prop in proto14) {
      Object.defineProperty(this, prop, proto14[prop]);
    }
    if (typeof r === "number") {
      this.radius = r;
    }
    this._update();
    if (typeof ox === "number") {
      this.translation.x = ox;
    }
    if (typeof oy === "number") {
      this.translation.y = oy;
    }
  }
  _update() {
    if (this._flagVertices || this._flagRadius) {
      let length = this.vertices.length;
      if (!this._closed && length > 2) {
        length -= 1;
      }
      const c = 4 / 3 * Math.tan(Math.PI / (length * 2));
      const radius = this._radius;
      const rc = radius * c;
      for (let i = 0; i < this.vertices.length; i++) {
        const pct = i / length;
        const theta = pct * TWO_PI;
        const x = radius * cos3(theta);
        const y = radius * sin3(theta);
        const lx = rc * cos3(theta - HALF_PI);
        const ly = rc * sin3(theta - HALF_PI);
        const rx = rc * cos3(theta + HALF_PI);
        const ry = rc * sin3(theta + HALF_PI);
        const v = this.vertices[i];
        v.command = i === 0 ? Commands.move : Commands.curve;
        v.set(x, y);
        v.controls.left.set(lx, ly);
        v.controls.right.set(rx, ry);
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagRadius = false;
    super.flagReset.call(this);
    return this;
  }
  clone(parent) {
    const clone = new _Circle(0, 0, this.radius, this.vertices.length);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    for (let i = 0; i < _Circle.Properties.length; i++) {
      const k = _Circle.Properties[i];
      object[k] = this[k];
    }
    return object;
  }
};
var Circle = _Circle;
__publicField(Circle, "Properties", ["radius"]);
var proto14 = {
  radius: {
    enumerable: true,
    get: function() {
      return this._radius;
    },
    set: function(v) {
      this._radius = v;
      this._flagRadius = true;
    }
  }
};

// src/shapes/ellipse.js
var cos4 = Math.cos;
var sin4 = Math.sin;
var _Ellipse = class extends Path {
  constructor(x, y, rx, ry, resolution) {
    if (typeof ry !== "number" && typeof rx === "number") {
      ry = rx;
    }
    const amount = resolution ? Math.max(resolution, 2) : 4;
    const points = [];
    for (let i = 0; i < amount; i++) {
      points.push(new Anchor());
    }
    super(points, true, true, true);
    __publicField(this, "_flagWidth", false);
    __publicField(this, "_flagHeight", false);
    __publicField(this, "_width", 0);
    __publicField(this, "_height", 0);
    for (let prop in proto15) {
      Object.defineProperty(this, prop, proto15[prop]);
    }
    if (typeof rx === "number") {
      this.width = rx * 2;
    }
    if (typeof ry === "number") {
      this.height = ry * 2;
    }
    this._update();
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
  }
  _update() {
    if (this._flagVertices || this._flagWidth || this._flagHeight) {
      let length = this.vertices.length;
      if (!this._closed && length > 2) {
        length -= 1;
      }
      const c = 4 / 3 * Math.tan(Math.PI / (this.vertices.length * 2));
      const radiusX = this._width / 2;
      const radiusY = this._height / 2;
      for (let i = 0; i < this.vertices.length; i++) {
        const pct = i / length;
        const theta = pct * TWO_PI;
        const x = radiusX * cos4(theta);
        const y = radiusY * sin4(theta);
        const lx = radiusX * c * cos4(theta - HALF_PI);
        const ly = radiusY * c * sin4(theta - HALF_PI);
        const rx = radiusX * c * cos4(theta + HALF_PI);
        const ry = radiusY * c * sin4(theta + HALF_PI);
        const v = this.vertices[i];
        v.command = i === 0 ? Commands.move : Commands.curve;
        v.set(x, y);
        v.controls.left.set(lx, ly);
        v.controls.right.set(rx, ry);
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagWidth = this._flagHeight = false;
    super.flagReset.call(this);
    return this;
  }
  clone(parent) {
    const rx = this.width / 2;
    const ry = this.height / 2;
    const resolution = this.vertices.length;
    const clone = new _Ellipse(0, 0, rx, ry, resolution);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    for (let i = 0; i < _Ellipse.Properties.length; i++) {
      const k = _Ellipse.Properties[i];
      object[k] = this[k];
    }
    return object;
  }
};
var Ellipse = _Ellipse;
__publicField(Ellipse, "Properties", ["width", "height"]);
var proto15 = {
  width: {
    enumerable: true,
    get: function() {
      return this._width;
    },
    set: function(v) {
      this._width = v;
      this._flagWidth = true;
    }
  },
  height: {
    enumerable: true,
    get: function() {
      return this._height;
    },
    set: function(v) {
      this._height = v;
      this._flagHeight = true;
    }
  }
};

// src/shapes/line.js
var Line = class extends Path {
  constructor(x1, y1, x2, y2) {
    const points = [
      new Anchor(x1, y1),
      new Anchor(x2, y2)
    ];
    super(points);
    for (let prop in proto16) {
      Object.defineProperty(this, prop, proto16[prop]);
    }
    this.vertices[0].command = Commands.move;
    this.vertices[1].command = Commands.line;
    this.automatic = false;
  }
};
var proto16 = {
  left: {
    enumerable: true,
    get: function() {
      return this.vertices[0];
    },
    set: function(v) {
      if (_.isObject(v)) {
        this.vertices.splice(0, 1, v);
      } else {
        const error = new TwoError("Two.Line.x argument is not an object.");
        console.warn(error.name, error.message);
      }
    }
  },
  right: {
    enumerable: true,
    get: function() {
      return this.vertices[0];
    },
    set: function(v) {
      if (_.isObject(v)) {
        this.vertices.splice(1, 1, v);
      } else {
        const error = new TwoError("Two.Line.y argument is not an object.");
        console.warn(error.name, error.message);
      }
    }
  }
};

// src/shapes/rounded-rectangle.js
var _RoundedRectangle = class extends Path {
  constructor(x, y, width, height, radius) {
    if (typeof radius === "undefined" && typeof width === "number" && typeof height === "number") {
      radius = Math.floor(Math.min(width, height) / 12);
    }
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new Anchor(0, 0, 0, 0, 0, 0, i === 0 ? Commands.move : Commands.curve));
    }
    super(points);
    __publicField(this, "_flagWidth", false);
    __publicField(this, "_flagHeight", false);
    __publicField(this, "_flagRadius", false);
    __publicField(this, "_width", 0);
    __publicField(this, "_height", 0);
    __publicField(this, "_radius", 12);
    for (let prop in proto17) {
      Object.defineProperty(this, prop, proto17[prop]);
    }
    this.closed = true;
    this.automatic = false;
    this._renderer.flagRadius = FlagRadius.bind(this);
    if (typeof width === "number") {
      this.width = width;
    }
    if (typeof height === "number") {
      this.height = height;
    }
    if (typeof radius === "number") {
      this.radius = radius;
    }
    this._update();
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
  }
  _update() {
    if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {
      const width = this._width;
      const height = this._height;
      let rx, ry;
      if (this._radius instanceof Vector) {
        rx = this._radius.x;
        ry = this._radius.y;
      } else {
        rx = this._radius;
        ry = this._radius;
      }
      let v;
      let w = width / 2;
      let h = height / 2;
      v = this.vertices[0];
      v.x = -(w - rx);
      v.y = -h;
      v = this.vertices[1];
      v.x = w - rx;
      v.y = -h;
      v.controls.left.clear();
      v.controls.right.x = rx;
      v.controls.right.y = 0;
      v = this.vertices[2];
      v.x = w;
      v.y = -(h - ry);
      v.controls.right.clear();
      v.controls.left.clear();
      v = this.vertices[3];
      v.x = w;
      v.y = h - ry;
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = ry;
      v = this.vertices[4];
      v.x = w - rx;
      v.y = h;
      v.controls.right.clear();
      v.controls.left.clear();
      v = this.vertices[5];
      v.x = -(w - rx);
      v.y = h;
      v.controls.left.clear();
      v.controls.right.x = -rx;
      v.controls.right.y = 0;
      v = this.vertices[6];
      v.x = -w;
      v.y = h - ry;
      v.controls.left.clear();
      v.controls.right.clear();
      v = this.vertices[7];
      v.x = -w;
      v.y = -(h - ry);
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = -ry;
      v = this.vertices[8];
      v.x = -(w - rx);
      v.y = -h;
      v.controls.left.clear();
      v.controls.right.clear();
      v = this.vertices[9];
      v.copy(this.vertices[8]);
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagWidth = this._flagHeight = this._flagRadius = false;
    super.flagReset.call(this);
    return this;
  }
  clone(parent) {
    const width = this.width;
    const height = this.height;
    const radius = this.radius;
    const clone = new _RoundedRectangle(0, 0, width, height, radius);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    for (let i = 0; i < _RoundedRectangle.Properties.length; i++) {
      const k = _RoundedRectangle.Properties[i];
      object[k] = this[k];
    }
    object.radius = typeof this.radius === "number" ? this.radius : this.radius.toObject();
    return object;
  }
};
var RoundedRectangle = _RoundedRectangle;
__publicField(RoundedRectangle, "Properties", ["width", "height", "radius"]);
var proto17 = {
  width: {
    enumerable: true,
    get: function() {
      return this._width;
    },
    set: function(v) {
      this._width = v;
      this._flagWidth = true;
    }
  },
  height: {
    enumerable: true,
    get: function() {
      return this._height;
    },
    set: function(v) {
      this._height = v;
      this._flagHeight = true;
    }
  },
  radius: {
    enumerable: true,
    get: function() {
      return this._radius;
    },
    set: function(v) {
      if (this._radius instanceof Vector) {
        this._radius.unbind(Events.Types.change, this._renderer.flagRadius);
      }
      this._radius = v;
      if (this._radius instanceof Vector) {
        this._radius.bind(Events.Types.change, this._renderer.flagRadius);
      }
      this._flagRadius = true;
    }
  }
};
function FlagRadius() {
  this._flagRadius = true;
}

// src/text.js
var min4 = Math.min;
var max4 = Math.max;
var _Text = class extends Shape {
  constructor(message, x, y, styles) {
    super();
    __publicField(this, "_flagValue", true);
    __publicField(this, "_flagFamily", true);
    __publicField(this, "_flagSize", true);
    __publicField(this, "_flagLeading", true);
    __publicField(this, "_flagAlignment", true);
    __publicField(this, "_flagBaseline", true);
    __publicField(this, "_flagStyle", true);
    __publicField(this, "_flagWeight", true);
    __publicField(this, "_flagDecoration", true);
    __publicField(this, "_flagFill", true);
    __publicField(this, "_flagStroke", true);
    __publicField(this, "_flagLinewidth", true);
    __publicField(this, "_flagOpacity", true);
    __publicField(this, "_flagVisible", true);
    __publicField(this, "_flagMask", false);
    __publicField(this, "_flagClip", false);
    __publicField(this, "_value", "");
    __publicField(this, "_family", "sans-serif");
    __publicField(this, "_size", 13);
    __publicField(this, "_leading", 17);
    __publicField(this, "_alignment", "center");
    __publicField(this, "_baseline", "middle");
    __publicField(this, "_style", "normal");
    __publicField(this, "_weight", 500);
    __publicField(this, "_decoration", "none");
    __publicField(this, "_fill", "#000");
    __publicField(this, "_stroke", "transparent");
    __publicField(this, "_linewidth", 1);
    __publicField(this, "_opacity", 1);
    __publicField(this, "_visible", true);
    __publicField(this, "_mask", null);
    __publicField(this, "_clip", false);
    __publicField(this, "_dashes", null);
    for (let prop in proto18) {
      Object.defineProperty(this, prop, proto18[prop]);
    }
    this._renderer.type = "text";
    this._renderer.flagFill = FlagFill2.bind(this);
    this._renderer.flagStroke = FlagStroke2.bind(this);
    this.value = message;
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
    this.dashes = [];
    this.dashes.offset = 0;
    if (!_.isObject(styles)) {
      return this;
    }
    for (let i = 0; i < _Text.Properties.length; i++) {
      const property = _Text.Properties[i];
      if (property in styles) {
        this[property] = styles[property];
      }
    }
  }
  clone(parent) {
    const clone = new _Text(this.value);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    for (let i = 0; i < _Text.Properties.length; i++) {
      const prop = _Text.Properties[i];
      clone[prop] = this[prop];
    }
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    if (parent) {
      parent.add(clone);
    }
    return clone._update();
  }
  toObject() {
    const result = {
      translation: this.translation.toObject(),
      rotation: this.rotation,
      scale: this.scale
    };
    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }
    for (let i = 0; i < _Text.Properties.length; i++) {
      const prop = _Text.Properties[i];
      result[prop] = this[prop];
    }
    return result;
  }
  noFill() {
    this.fill = "transparent";
    return this;
  }
  noStroke() {
    this.stroke = void 0;
    this.linewidth = void 0;
    return this;
  }
  getBoundingClientRect(shallow) {
    let matrix3, a, b, c, d;
    let left, right, top, bottom;
    this._update(true);
    matrix3 = shallow ? this._matrix : getComputedMatrix(this);
    const height = this.leading;
    const width = this.value.length * this.size * _Text.Ratio;
    const border = (this._linewidth || 0) / 2;
    switch (this.alignment) {
      case "left":
        left = -border;
        right = width + border;
        break;
      case "right":
        left = -(width + border);
        right = border;
        break;
      default:
        left = -(width / 2 + border);
        right = width / 2 + border;
    }
    switch (this.baseline) {
      case "top":
        top = -border;
        bottom = height + border;
        break;
      case "bottom":
        top = -(height + border);
        bottom = border;
        break;
      default:
        top = -(height / 2 + border);
        bottom = height / 2 + border;
    }
    a = matrix3.multiply(left, top, 1);
    b = matrix3.multiply(left, bottom, 1);
    c = matrix3.multiply(right, top, 1);
    d = matrix3.multiply(right, bottom, 1);
    top = min4(a.y, b.y, c.y, d.y);
    left = min4(a.x, b.x, c.x, d.x);
    right = max4(a.x, b.x, c.x, d.x);
    bottom = max4(a.y, b.y, c.y, d.y);
    return {
      top,
      left,
      right,
      bottom,
      width: right - left,
      height: bottom - top
    };
  }
  flagReset() {
    super.flagReset.call(this);
    this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagClip = this._flagDecoration = this._flagClassName = this._flagBaseline = this._flagWeight = this._flagStyle = false;
    return this;
  }
};
var Text = _Text;
__publicField(Text, "Ratio", 0.6);
__publicField(Text, "Properties", [
  "value",
  "family",
  "size",
  "leading",
  "alignment",
  "linewidth",
  "style",
  "weight",
  "decoration",
  "baseline",
  "opacity",
  "visible",
  "fill",
  "stroke"
]);
var proto18 = {
  value: {
    enumerable: true,
    get: function() {
      return this._value;
    },
    set: function(v) {
      this._value = v;
      this._flagValue = true;
    }
  },
  family: {
    enumerable: true,
    get: function() {
      return this._family;
    },
    set: function(v) {
      this._family = v;
      this._flagFamily = true;
    }
  },
  size: {
    enumerable: true,
    get: function() {
      return this._size;
    },
    set: function(v) {
      this._size = v;
      this._flagSize = true;
    }
  },
  leading: {
    enumerable: true,
    get: function() {
      return this._leading;
    },
    set: function(v) {
      this._leading = v;
      this._flagLeading = true;
    }
  },
  alignment: {
    enumerable: true,
    get: function() {
      return this._alignment;
    },
    set: function(v) {
      this._alignment = v;
      this._flagAlignment = true;
    }
  },
  linewidth: {
    enumerable: true,
    get: function() {
      return this._linewidth;
    },
    set: function(v) {
      this._linewidth = v;
      this._flagLinewidth = true;
    }
  },
  style: {
    enumerable: true,
    get: function() {
      return this._style;
    },
    set: function(v) {
      this._style = v;
      this._flagStyle = true;
    }
  },
  weight: {
    enumerable: true,
    get: function() {
      return this._weight;
    },
    set: function(v) {
      this._weight = v;
      this._flagWeight = true;
    }
  },
  decoration: {
    enumerable: true,
    get: function() {
      return this._decoration;
    },
    set: function(v) {
      this._decoration = v;
      this._flagDecoration = true;
    }
  },
  baseline: {
    enumerable: true,
    get: function() {
      return this._baseline;
    },
    set: function(v) {
      this._baseline = v;
      this._flagBaseline = true;
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._opacity = v;
      this._flagOpacity = true;
    }
  },
  visible: {
    enumerable: true,
    get: function() {
      return this._visible;
    },
    set: function(v) {
      this._visible = v;
      this._flagVisible = true;
    }
  },
  fill: {
    enumerable: true,
    get: function() {
      return this._fill;
    },
    set: function(f) {
      if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
        this._fill.unbind(Events.Types.change, this._renderer.flagFill);
      }
      this._fill = f;
      this._flagFill = true;
      if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
        this._fill.bind(Events.Types.change, this._renderer.flagFill);
      }
    }
  },
  stroke: {
    enumerable: true,
    get: function() {
      return this._stroke;
    },
    set: function(f) {
      if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
        this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
      }
      this._stroke = f;
      this._flagStroke = true;
      if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
        this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
      }
    }
  },
  mask: {
    enumerable: true,
    get: function() {
      return this._mask;
    },
    set: function(v) {
      this._mask = v;
      this._flagMask = true;
      if (_.isObject(v) && !v.clip) {
        v.clip = true;
      }
    }
  },
  clip: {
    enumerable: true,
    get: function() {
      return this._clip;
    },
    set: function(v) {
      this._clip = v;
      this._flagClip = true;
    }
  },
  dashes: {
    enumerable: true,
    get: function() {
      return this._dashes;
    },
    set: function(v) {
      if (typeof v.offset !== "number") {
        v.offset = this.dashes && this._dashes.offset || 0;
      }
      this._dashes = v;
    }
  }
};
function FlagFill2() {
  this._flagFill = true;
}
function FlagStroke2() {
  this._flagStroke = true;
}

// src/utils/interpret-svg.js
var regex2 = {
  path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g,
  cssBackgroundImage: /url\(['"]?#([\w\d-_]*)['"]?\)/i,
  unitSuffix: /[a-zA-Z%]*/i
};
var alignments = {
  start: "left",
  middle: "center",
  end: "right"
};
var reservedAttributesToRemove = ["id", "class", "transform", "xmlns", "viewBox"];
var overwriteAttrs = ["x", "y", "width", "height", "href", "xlink:href"];
function getAlignment(anchor2) {
  return alignments[anchor2];
}
function getBaseline(node) {
  const a = node.getAttribute("dominant-baseline");
  const b = node.getAttribute("alignment-baseline");
  return a || b;
}
function getTagName(tag) {
  return tag.replace(/svg:/ig, "").toLowerCase();
}
function applyTransformsToVector(transforms, vector2) {
  vector2.x += transforms.translateX;
  vector2.y += transforms.translateY;
  vector2.x *= transforms.scaleX;
  vector2.y *= transforms.scaleY;
  if (transforms.rotation !== 0) {
    const l = vector2.length();
    vector2.x = l * Math.cos(transforms.rotation);
    vector2.y = l * Math.sin(transforms.rotation);
  }
}
function extractCSSText(text, styles) {
  if (!styles) {
    styles = {};
  }
  const commands = text.split(";");
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i].split(":");
    const name = command[0];
    const value = command[1];
    if (typeof name === "undefined" || typeof value === "undefined") {
      continue;
    }
    styles[name] = value.replace(/\s/, "");
  }
  return styles;
}
function getSvgStyles(node) {
  const styles = {};
  const attributes = getSvgAttributes(node);
  const length = Math.max(attributes.length, node.style.length);
  for (let i = 0; i < length; i++) {
    const command = node.style[i];
    const attribute = attributes[i];
    if (command) {
      styles[command] = node.style[command];
    }
    if (attribute) {
      styles[attribute] = node.getAttribute(attribute);
    }
  }
  return styles;
}
function getSvgAttributes(node) {
  const attributes = node.getAttributeNames();
  for (let i = 0; i < reservedAttributesToRemove.length; i++) {
    const keyword = reservedAttributesToRemove[i];
    const index = Array.prototype.indexOf.call(attributes, keyword);
    if (index >= 0) {
      attributes.splice(index, 1);
    }
  }
  return attributes;
}
function applySvgViewBox(node, value) {
  const elements = value.split(/[\s,]/);
  const x = -parseFloat(elements[0]);
  const y = -parseFloat(elements[1]);
  const width = parseFloat(elements[2]);
  const height = parseFloat(elements[3]);
  if (x && y) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if ("translation" in child) {
        child.translation.add(x, y);
      } else if ("x" in child) {
        child.x = x;
      } else if ("y" in child) {
        child.y = y;
      }
    }
  }
  const xExists = typeof node.x === "number";
  const yExists = typeof node.y === "number";
  const widthExists = typeof node.width === "number";
  const heightExists = typeof node.height === "number";
  if (xExists) {
    node.translation.x += node.x;
  }
  if (yExists) {
    node.translation.y += node.y;
  }
  if (widthExists || heightExists) {
    node.scale = new Vector(1, 1);
  }
  if (widthExists) {
    node.scale.x = node.width / width;
  }
  if (heightExists) {
    node.scale.y = node.height / height;
  }
  node.mask = new Rectangle(0, 0, width, height);
  node.mask.origin.set(-width / 2, -height / 2);
  return node;
}
function applySvgAttributes(node, elem, parentStyles) {
  const styles = {}, attributes = {}, extracted = {};
  let i, m, key, value, prop, attr;
  let transforms, x, y;
  let id, scene, ref, tagName;
  let ca, cb, cc, error;
  if (root.getComputedStyle) {
    const computedStyles = root.getComputedStyle(node);
    i = computedStyles.length;
    while (i--) {
      key = computedStyles[i];
      value = computedStyles[key];
      if (typeof value !== "undefined") {
        styles[key] = value;
      }
    }
  }
  for (i = 0; i < node.attributes.length; i++) {
    attr = node.attributes[i];
    if (/style/i.test(attr.nodeName)) {
      extractCSSText(attr.value, extracted);
    } else {
      attributes[attr.nodeName] = attr.value;
    }
  }
  if (typeof styles.opacity !== "undefined") {
    styles["stroke-opacity"] = styles.opacity;
    styles["fill-opacity"] = styles.opacity;
    delete styles.opacity;
  }
  if (parentStyles) {
    _.defaults(styles, parentStyles);
  }
  _.extend(styles, extracted, attributes);
  styles.visible = !(typeof styles.display === "undefined" && /none/i.test(styles.display)) || typeof styles.visibility === "undefined" && /hidden/i.test(styles.visibility);
  for (key in styles) {
    value = styles[key];
    switch (key) {
      case "gradientTransform":
        if (/none/i.test(value))
          break;
        m = node.gradientTransform && node.gradientTransform.baseVal && node.gradientTransform.baseVal.length > 0 ? node.gradientTransform.baseVal[0].matrix : node.getCTM ? node.getCTM() : null;
        if (m === null)
          break;
        transforms = decomposeMatrix(m);
        switch (elem._renderer.type) {
          case "linear-gradient":
            applyTransformsToVector(transforms, elem.left);
            applyTransformsToVector(transforms, elem.right);
            break;
          case "radial-gradient":
            elem.center.x += transforms.translateX;
            elem.center.y += transforms.translateY;
            elem.focal.x += transforms.translateX;
            elem.focal.y += transforms.translateY;
            elem.radius *= Math.max(transforms.scaleX, transforms.scaleY);
            break;
        }
        break;
      case "transform":
        if (/none/i.test(value))
          break;
        m = node.transform && node.transform.baseVal && node.transform.baseVal.length > 0 ? node.transform.baseVal[0].matrix : node.getCTM ? node.getCTM() : null;
        if (m === null)
          break;
        if (Constants.AutoCalculateImportedMatrices) {
          transforms = decomposeMatrix(m);
          elem.translation.set(transforms.translateX, transforms.translateY);
          elem.rotation = Math.PI * (transforms.rotation / 180);
          elem.scale = new Vector(transforms.scaleX, transforms.scaleY);
          x = parseFloat((styles.x + "").replace("px"));
          y = parseFloat((styles.y + "").replace("px"));
          if (x) {
            elem.translation.x = x;
          }
          if (y) {
            elem.translation.y = y;
          }
        } else {
          m = node.getCTM();
          elem._matrix.manual = true;
          elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);
        }
        break;
      case "visible":
        if (elem instanceof Group) {
          elem._visible = value;
          break;
        }
        elem.visible = value;
        break;
      case "stroke-linecap":
        if (elem instanceof Group) {
          elem._cap = value;
          break;
        }
        elem.cap = value;
        break;
      case "stroke-linejoin":
        if (elem instanceof Group) {
          elem._join = value;
          break;
        }
        elem.join = value;
        break;
      case "stroke-miterlimit":
        if (elem instanceof Group) {
          elem._miter = value;
          break;
        }
        elem.miter = value;
        break;
      case "stroke-width":
        if (elem instanceof Group) {
          elem._linewidth = parseFloat(value);
          break;
        }
        elem.linewidth = parseFloat(value);
        break;
      case "opacity":
      case "stroke-opacity":
      case "fill-opacity":
        if (elem instanceof Group) {
          elem._opacity = parseFloat(value);
          break;
        }
        elem.opacity = parseFloat(value);
        break;
      case "clip-path":
        if (regex2.cssBackgroundImage.test(value)) {
          id = value.replace(regex2.cssBackgroundImage, "$1");
          if (read.defs.current && read.defs.current.contains(id)) {
            ref = read.defs.current.get(id);
            if (ref && ref.childNodes.length > 0) {
              ref = ref.childNodes[0];
              tagName = getTagName(ref.nodeName);
              elem.mask = read[tagName].call(this, ref, {});
              switch (elem._renderer.type) {
                case "text":
                case "path":
                  elem.position.add(elem.mask.position);
                  elem.mask.position.clear();
                  break;
              }
            }
          }
        }
        break;
      case "fill":
      case "stroke":
        prop = (elem instanceof Group ? "_" : "") + key;
        if (regex2.cssBackgroundImage.test(value)) {
          id = value.replace(regex2.cssBackgroundImage, "$1");
          if (read.defs.current && read.defs.current.contains(id)) {
            ref = read.defs.current.get(id);
            if (!ref.object) {
              tagName = getTagName(ref.nodeName);
              ref.object = read[tagName].call(this, ref, {});
            }
            ref = ref.object;
          } else {
            scene = getScene(this);
            ref = scene.getById(id);
          }
          elem[prop] = ref;
        } else {
          elem[prop] = /none/i.test(value) ? "transparent" : value;
        }
        break;
      case "id":
        elem.id = value;
        break;
      case "class":
      case "className":
        elem.classList = value.split(" ");
        elem._flagClassName = true;
        break;
      case "x":
      case "y":
        ca = elem instanceof Gradient;
        cb = elem instanceof LinearGradient;
        cc = elem instanceof RadialGradient;
        if (ca || cb || cc) {
          break;
        }
        if (value.match("[a-z%]$") && !value.endsWith("px")) {
          error = new TwoError("only pixel values are supported with the " + key + " attribute.");
          console.warn(error.name, error.message);
        }
        elem.translation[key] = parseFloat(value);
        break;
      case "font-family":
        if (elem instanceof Text) {
          elem.family = value;
        }
        break;
      case "font-size":
        if (elem instanceof Text) {
          elem.size = value;
        }
        break;
      case "font-weight":
        if (elem instanceof Text) {
          elem.weight = value;
        }
        break;
      case "font-style":
        if (elem instanceof Text) {
          elem.style = value;
        }
        break;
      case "text-decoration":
        if (elem instanceof Text) {
          elem.decoration = value;
        }
        break;
      case "line-height":
        if (elem instanceof Text) {
          elem.leading = value;
        }
        break;
    }
  }
  if (Object.keys(node.dataset).length)
    elem.dataset = node.dataset;
  return styles;
}
function updateDefsCache(node, defsCache) {
  for (let i = 0, l = node.childNodes.length; i < l; i++) {
    const n = node.childNodes[i];
    if (!n.id)
      continue;
    const tagName = getTagName(node.nodeName);
    if (tagName === "#text")
      continue;
    defsCache.add(n.id, n);
  }
}
function getScene(node) {
  while (node.parent) {
    node = node.parent;
  }
  return node.scene;
}
var read = {
  svg: function(node) {
    const defs = read.defs.current = new Registry();
    const elements = node.getElementsByTagName("defs");
    for (let i = 0; i < elements.length; i++) {
      updateDefsCache(elements[i], defs);
    }
    const svg2 = read.g.call(this, node);
    const viewBox = node.getAttribute("viewBox");
    const x = node.getAttribute("x");
    const y = node.getAttribute("y");
    const width = node.getAttribute("width");
    const height = node.getAttribute("height");
    svg2.defs = defs;
    const viewBoxExists = viewBox !== null;
    const xExists = x !== null;
    const yExists = y !== null;
    const widthExists = width !== null;
    const heightExists = height !== null;
    if (xExists) {
      svg2.x = parseFloat(x.replace(regex2.unitSuffix, ""));
    }
    if (yExists) {
      svg2.y = parseFloat(y.replace(regex2.unitSuffix, ""));
    }
    if (widthExists) {
      svg2.width = parseFloat(width.replace(regex2.unitSuffix, ""));
    }
    if (heightExists) {
      svg2.height = parseFloat(height.replace(regex2.unitSuffix, ""));
    }
    if (viewBoxExists) {
      applySvgViewBox(svg2, viewBox);
    }
    delete read.defs.current;
    return svg2;
  },
  defs: function(node) {
    return null;
  },
  use: function(node, styles) {
    let error;
    const href = node.getAttribute("href") || node.getAttribute("xlink:href");
    if (!href) {
      error = new TwoError("encountered <use /> with no href.");
      console.warn(error.name, error.message);
      return null;
    }
    const id = href.slice(1);
    if (!read.defs.current.contains(id)) {
      error = new TwoError("unable to find element for reference " + href + ".");
      console.warn(error.name, error.message);
      return null;
    }
    const template = read.defs.current.get(id);
    const fullNode = template.cloneNode(true);
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      const ca = overwriteAttrs.includes(attr.nodeName);
      const cb = !fullNode.hasAttribute(attr.nodeName);
      if (ca || cb) {
        fullNode.setAttribute(attr.nodeName, attr.value);
      }
    }
    const tagName = getTagName(fullNode.nodeName);
    return read[tagName].call(this, fullNode, styles);
  },
  g: function(node, parentStyles) {
    const group = new Group();
    applySvgAttributes.call(this, node, group, parentStyles);
    this.add(group);
    const styles = getSvgStyles.call(this, node);
    for (let i = 0, l = node.childNodes.length; i < l; i++) {
      const n = node.childNodes[i];
      const tag = n.nodeName;
      if (!tag)
        return;
      const tagName = getTagName(tag);
      if (tagName in read) {
        const o = read[tagName].call(group, n, styles);
        if (!!o && !o.parent) {
          group.add(o);
        }
      }
    }
    return group;
  },
  polygon: function(node, parentStyles) {
    let points;
    if (typeof node === "string") {
      points = node;
    } else {
      points = node.getAttribute("points");
    }
    const verts = [];
    points.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function(match, p1, p2) {
      verts.push(new Anchor(parseFloat(p1), parseFloat(p2)));
    });
    const poly = new Path(verts, true).noStroke();
    poly.fill = "black";
    applySvgAttributes.call(this, node, poly, parentStyles);
    return poly;
  },
  polyline: function(node, parentStyles) {
    const poly = read.polygon.call(this, node, parentStyles);
    poly.closed = false;
    return poly;
  },
  path: function(node, parentStyles) {
    let path;
    if (typeof node === "string") {
      path = node;
    } else {
      path = node.getAttribute("d");
    }
    let points = [];
    let closed2 = false, relative = false;
    if (path) {
      let coord = new Anchor();
      let control, coords;
      let commands = path.match(/[a-df-z][^a-df-z]*/ig);
      const last = commands.length - 1;
      _.each(commands.slice(0), function(command, i) {
        const items = command.slice(1).trim().match(regex2.path);
        const type = command[0];
        const lower = type.toLowerCase();
        let bin, j, l, ct, times;
        const result = [];
        if (i === 0) {
          commands = [];
        }
        switch (lower) {
          case "h":
          case "v":
            if (items.length > 1) {
              bin = 1;
            }
            break;
          case "m":
          case "l":
          case "t":
            if (items.length > 2) {
              bin = 2;
            }
            break;
          case "s":
          case "q":
            if (items.length > 4) {
              bin = 4;
            }
            break;
          case "c":
            if (items.length > 6) {
              bin = 6;
            }
            break;
          case "a":
            if (items.length > 7) {
              bin = 7;
            }
            break;
        }
        if (bin) {
          for (j = 0, l = items.length, times = 0; j < l; j += bin) {
            ct = type;
            if (times > 0) {
              switch (type) {
                case "m":
                  ct = "l";
                  break;
                case "M":
                  ct = "L";
                  break;
              }
            }
            result.push(ct + items.slice(j, j + bin).join(" "));
            times++;
          }
          commands = Array.prototype.concat.apply(commands, result);
        } else {
          commands.push(command);
        }
      });
      _.each(commands, function(command, i) {
        let result, x, y;
        const type = command[0];
        const lower = type.toLowerCase();
        coords = command.slice(1).trim().match(regex2.path);
        relative = type === lower;
        let x1, y1, x2, y2, x3, y3, x4, y4, reflection;
        let a, b;
        let anchor2, rx, ry, xAxisRotation, largeArcFlag, sweepFlag;
        switch (lower) {
          case "z":
            if (i >= last) {
              closed2 = true;
            } else {
              x = coord.x;
              y = coord.y;
              result = new Anchor(x, y, void 0, void 0, void 0, void 0, Commands.close);
              for (let j = points.length - 1; j >= 0; j--) {
                const point = points[j];
                if (/m/i.test(point.command)) {
                  coord = point;
                  break;
                }
              }
            }
            break;
          case "m":
          case "l":
            control = void 0;
            x = parseFloat(coords[0]);
            y = parseFloat(coords[1]);
            result = new Anchor(x, y, void 0, void 0, void 0, void 0, /m/i.test(lower) ? Commands.move : Commands.line);
            if (relative) {
              result.addSelf(coord);
            }
            coord = result;
            break;
          case "h":
          case "v":
            a = /h/i.test(lower) ? "x" : "y";
            b = /x/i.test(a) ? "y" : "x";
            result = new Anchor(void 0, void 0, void 0, void 0, void 0, void 0, Commands.line);
            result[a] = parseFloat(coords[0]);
            result[b] = coord[b];
            if (relative) {
              result[a] += coord[a];
            }
            coord = result;
            break;
          case "c":
          case "s":
            x1 = coord.x;
            y1 = coord.y;
            if (!control) {
              control = new Vector();
            }
            if (/c/i.test(lower)) {
              x2 = parseFloat(coords[0]);
              y2 = parseFloat(coords[1]);
              x3 = parseFloat(coords[2]);
              y3 = parseFloat(coords[3]);
              x4 = parseFloat(coords[4]);
              y4 = parseFloat(coords[5]);
            } else {
              reflection = getReflection(coord, control, relative);
              x2 = reflection.x;
              y2 = reflection.y;
              x3 = parseFloat(coords[0]);
              y3 = parseFloat(coords[1]);
              x4 = parseFloat(coords[2]);
              y4 = parseFloat(coords[3]);
            }
            if (relative) {
              x2 += x1;
              y2 += y1;
              x3 += x1;
              y3 += y1;
              x4 += x1;
              y4 += y1;
            }
            coord.controls.right.set(x2 - coord.x, y2 - coord.y);
            result = new Anchor(x4, y4, x3 - x4, y3 - y4, void 0, void 0, Commands.curve);
            coord = result;
            control = result.controls.left;
            break;
          case "t":
          case "q":
            x1 = coord.x;
            y1 = coord.y;
            if (!control) {
              control = new Vector();
            }
            if (/q/i.test(lower)) {
              x2 = parseFloat(coords[0]);
              y2 = parseFloat(coords[1]);
              x3 = parseFloat(coords[0]);
              y3 = parseFloat(coords[1]);
              x4 = parseFloat(coords[2]);
              y4 = parseFloat(coords[3]);
            } else {
              reflection = getReflection(coord, control, relative);
              x2 = reflection.x;
              y2 = reflection.y;
              x3 = reflection.x;
              y3 = reflection.y;
              x4 = parseFloat(coords[0]);
              y4 = parseFloat(coords[1]);
            }
            if (relative) {
              x2 += x1;
              y2 += y1;
              x3 += x1;
              y3 += y1;
              x4 += x1;
              y4 += y1;
            }
            coord.controls.right.set((x2 - coord.x) * 0.33, (y2 - coord.y) * 0.33);
            result = new Anchor(x4, y4, x3 - x4, y3 - y4, void 0, void 0, Commands.curve);
            coord = result;
            control = result.controls.left;
            break;
          case "a":
            x1 = coord.x;
            y1 = coord.y;
            rx = parseFloat(coords[0]);
            ry = parseFloat(coords[1]);
            xAxisRotation = parseFloat(coords[2]);
            largeArcFlag = parseFloat(coords[3]);
            sweepFlag = parseFloat(coords[4]);
            x4 = parseFloat(coords[5]);
            y4 = parseFloat(coords[6]);
            if (relative) {
              x4 += x1;
              y4 += y1;
            }
            anchor2 = new Anchor(x4, y4);
            anchor2.command = Commands.arc;
            anchor2.rx = rx;
            anchor2.ry = ry;
            anchor2.xAxisRotation = xAxisRotation;
            anchor2.largeArcFlag = largeArcFlag;
            anchor2.sweepFlag = sweepFlag;
            result = anchor2;
            coord = anchor2;
            control = void 0;
            break;
        }
        if (result) {
          if (Array.isArray(result)) {
            points = points.concat(result);
          } else {
            points.push(result);
          }
        }
      });
    }
    path = new Path(points, closed2, void 0, true).noStroke();
    path.fill = "black";
    const rect = path.getBoundingClientRect(true);
    rect.centroid = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    _.each(path.vertices, function(v) {
      v.subSelf(rect.centroid);
    });
    applySvgAttributes.call(this, node, path, parentStyles);
    path.translation.addSelf(rect.centroid);
    return path;
  },
  circle: function(node, parentStyles) {
    const x = parseFloat(node.getAttribute("cx"));
    const y = parseFloat(node.getAttribute("cy"));
    const r = parseFloat(node.getAttribute("r"));
    const circle = new Circle(0, 0, r).noStroke();
    circle.fill = "black";
    applySvgAttributes.call(this, node, circle, parentStyles);
    circle.translation.x = x;
    circle.translation.y = y;
    return circle;
  },
  ellipse: function(node, parentStyles) {
    const x = parseFloat(node.getAttribute("cx"));
    const y = parseFloat(node.getAttribute("cy"));
    const width = parseFloat(node.getAttribute("rx"));
    const height = parseFloat(node.getAttribute("ry"));
    const ellipse = new Ellipse(0, 0, width, height).noStroke();
    ellipse.fill = "black";
    applySvgAttributes.call(this, node, ellipse, parentStyles);
    ellipse.translation.x = x;
    ellipse.translation.y = y;
    return ellipse;
  },
  rect: function(node, parentStyles) {
    const rx = parseFloat(node.getAttribute("rx"));
    const ry = parseFloat(node.getAttribute("ry"));
    if (!_.isNaN(rx) || !_.isNaN(ry)) {
      return read["rounded-rect"](node);
    }
    const width = parseFloat(node.getAttribute("width"));
    const height = parseFloat(node.getAttribute("height"));
    const w2 = width / 2;
    const h2 = height / 2;
    const rect = new Rectangle(0, 0, width, height).noStroke();
    rect.fill = "black";
    applySvgAttributes.call(this, node, rect, parentStyles);
    rect.translation.x += w2;
    rect.translation.y += h2;
    return rect;
  },
  "rounded-rect": function(node, parentStyles) {
    const rx = parseFloat(node.getAttribute("rx")) || 0;
    const ry = parseFloat(node.getAttribute("ry")) || 0;
    const width = parseFloat(node.getAttribute("width"));
    const height = parseFloat(node.getAttribute("height"));
    const w2 = width / 2;
    const h2 = height / 2;
    const radius = new Vector(rx, ry);
    const rect = new RoundedRectangle(0, 0, width, height, radius).noStroke();
    rect.fill = "black";
    applySvgAttributes.call(this, node, rect, parentStyles);
    rect.translation.x += w2;
    rect.translation.y += h2;
    return rect;
  },
  line: function(node, parentStyles) {
    const x1 = parseFloat(node.getAttribute("x1"));
    const y1 = parseFloat(node.getAttribute("y1"));
    const x2 = parseFloat(node.getAttribute("x2"));
    const y2 = parseFloat(node.getAttribute("y2"));
    const line = new Line(x1, y1, x2, y2).noFill();
    applySvgAttributes.call(this, node, line, parentStyles);
    return line;
  },
  lineargradient: function(node, parentStyles) {
    let units = node.getAttribute("gradientUnits");
    let spread = node.getAttribute("spreadMethod");
    if (!units) {
      units = "objectBoundingBox";
    }
    if (!spread) {
      spread = "pad";
    }
    let x1 = parseFloat(node.getAttribute("x1") || 0);
    let y1 = parseFloat(node.getAttribute("y1") || 0);
    let x2 = parseFloat(node.getAttribute("x2") || 0);
    let y2 = parseFloat(node.getAttribute("y2") || 0);
    const ox = (x2 + x1) / 2;
    const oy = (y2 + y1) / 2;
    if (/userSpaceOnUse/i.test(units)) {
      x1 -= ox;
      y1 -= oy;
      x2 -= ox;
      y2 -= oy;
    }
    const stops = [];
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      let offset = child.getAttribute("offset");
      if (/%/ig.test(offset)) {
        offset = parseFloat(offset.replace(/%/ig, "")) / 100;
      }
      offset = parseFloat(offset);
      let color = child.getAttribute("stop-color");
      let opacity = child.getAttribute("stop-opacity");
      let style = child.getAttribute("style");
      let matches;
      if (color === null) {
        matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
        color = matches && matches.length > 1 ? matches[1] : void 0;
      }
      if (opacity === null) {
        matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
        opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
      } else {
        opacity = parseFloat(opacity);
      }
      stops.push(new Stop(offset, color, opacity));
    }
    const gradient = new LinearGradient(x1, y1, x2, y2, stops);
    gradient.spread = spread;
    gradient.units = units;
    applySvgAttributes.call(this, node, gradient, parentStyles);
    return gradient;
  },
  radialgradient: function(node, parentStyles) {
    let units = node.getAttribute("gradientUnits");
    let spread = node.getAttribute("spreadMethod");
    if (!units) {
      units = "objectBoundingBox";
    }
    if (!spread) {
      spread = "pad";
    }
    let cx = parseFloat(node.getAttribute("cx")) || 0;
    let cy = parseFloat(node.getAttribute("cy")) || 0;
    let r = parseFloat(node.getAttribute("r"));
    let fx = parseFloat(node.getAttribute("fx"));
    let fy = parseFloat(node.getAttribute("fy"));
    if (_.isNaN(fx)) {
      fx = cx;
    }
    if (_.isNaN(fy)) {
      fy = cy;
    }
    const ox = Math.abs(cx + fx) / 2;
    const oy = Math.abs(cy + fy) / 2;
    if (/userSpaceOnUse/i.test(units)) {
      cx -= ox;
      cy -= oy;
      fx -= ox;
      fy -= oy;
    }
    const stops = [];
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      let offset = child.getAttribute("offset");
      if (/%/ig.test(offset)) {
        offset = parseFloat(offset.replace(/%/ig, "")) / 100;
      }
      offset = parseFloat(offset);
      let color = child.getAttribute("stop-color");
      let opacity = child.getAttribute("stop-opacity");
      let style = child.getAttribute("style");
      let matches;
      if (color === null) {
        matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
        color = matches && matches.length > 1 ? matches[1] : void 0;
      }
      if (opacity === null) {
        matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
        opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
      } else {
        opacity = parseFloat(opacity);
      }
      stops.push(new Stop(offset, color, opacity));
    }
    const gradient = new RadialGradient(cx, cy, r, stops, fx, fy);
    gradient.spread = spread;
    gradient.units = units;
    applySvgAttributes.call(this, node, gradient, parentStyles);
    return gradient;
  },
  text: function(node, parentStyles) {
    const alignment = getAlignment(node.getAttribute("text-anchor")) || "left";
    const baseline = getBaseline(node) || "baseline";
    const message = node.textContent;
    const text = new Text(message);
    applySvgAttributes.call(this, node, text, parentStyles);
    text.alignment = alignment;
    text.baseline = baseline;
    return text;
  },
  clippath: function(node, parentStyles) {
    if (read.defs.current && !read.defs.current.contains(node.id)) {
      read.defs.current.add(node.id, node);
    }
    return null;
  },
  image: function(node, parentStyles) {
    let error;
    const href = node.getAttribute("href") || node.getAttribute("xlink:href");
    if (!href) {
      error = new TwoError("encountered <image /> with no href.");
      console.warn(error.name, error.message);
      return null;
    }
    const x = parseFloat(node.getAttribute("x")) || 0;
    const y = parseFloat(node.getAttribute("y")) || 0;
    const width = parseFloat(node.getAttribute("width"));
    const height = parseFloat(node.getAttribute("height"));
    const sprite = new Sprite(href, x, y);
    if (!_.isNaN(width)) {
      sprite.width = width;
    }
    if (!_.isNaN(height)) {
      sprite.height = height;
    }
    applySvgAttributes.call(this, node, sprite, parentStyles);
    return sprite;
  }
};

// src/utils/xhr.js
function xhr(path, callback) {
  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", path);
  xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
      callback(xhr2.responseText);
    }
  };
  xhr2.send();
  return xhr2;
}

// src/effects/image-sequence.js
var _ImageSequence = class extends Rectangle {
  constructor(paths, ox, oy, frameRate) {
    super(ox, oy, 0, 0);
    __publicField(this, "_flagTextures", false);
    __publicField(this, "_flagFrameRate", false);
    __publicField(this, "_flagIndex", false);
    __publicField(this, "_amount", 1);
    __publicField(this, "_duration", 0);
    __publicField(this, "_index", 0);
    __publicField(this, "_startTime", 0);
    __publicField(this, "_playing", false);
    __publicField(this, "_firstFrame", 0);
    __publicField(this, "_lastFrame", 0);
    __publicField(this, "_loop", true);
    __publicField(this, "_textures", null);
    __publicField(this, "_frameRate", 0);
    __publicField(this, "_origin", null);
    for (let prop in proto19) {
      Object.defineProperty(this, prop, proto19[prop]);
    }
    this._renderer.flagTextures = FlagTextures.bind(this);
    this._renderer.bindTextures = BindTextures.bind(this);
    this._renderer.unbindTextures = UnbindTextures.bind(this);
    this.noStroke();
    this.noFill();
    if (Array.isArray(paths)) {
      this.textures = paths.map(GenerateTexture.bind(this));
    } else {
      this.textures = [GenerateTexture(paths)];
    }
    this.origin = new Vector();
    this._update();
    if (typeof frameRate === "number") {
      this.frameRate = frameRate;
    } else {
      this.frameRate = _ImageSequence.DefaultFrameRate;
    }
    this.index = 0;
  }
  play(firstFrame, lastFrame, onLastFrame) {
    this._playing = true;
    this._firstFrame = 0;
    this._lastFrame = this.amount - 1;
    this._startTime = _.performance.now();
    if (typeof firstFrame === "number") {
      this._firstFrame = firstFrame;
    }
    if (typeof lastFrame === "number") {
      this._lastFrame = lastFrame;
    }
    if (typeof onLastFrame === "function") {
      this._onLastFrame = onLastFrame;
    } else {
      delete this._onLastFrame;
    }
    if (this._index !== this._firstFrame) {
      this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate;
    }
    return this;
  }
  pause() {
    this._playing = false;
    return this;
  }
  stop() {
    this._playing = false;
    this._index = this._firstFrame;
    return this;
  }
  clone(parent) {
    const clone = new _ImageSequence(this.textures, this.translation.x, this.translation.y, this.frameRate);
    clone._loop = this._loop;
    if (this._playing) {
      clone.play();
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    object.textures = this.textures.map(function(texture) {
      return texture.toObject();
    });
    object.frameRate = this.frameRate;
    object.index = this.index;
    object._firstFrame = this._firstFrame;
    object._lastFrame = this._lastFrame;
    object._loop = this._loop;
    return object;
  }
  _update() {
    const effect = this._textures;
    let width, height, elapsed, amount, duration, texture;
    let index, frames;
    if (effect) {
      if (this._flagTextures) {
        this._amount = effect.length;
      }
      if (this._flagFrameRate) {
        this._duration = 1e3 * this._amount / this._frameRate;
      }
      if (this._playing && this._frameRate > 0) {
        amount = this._amount;
        if (_.isNaN(this._lastFrame)) {
          this._lastFrame = amount - 1;
        }
        elapsed = _.performance.now() - this._startTime;
        frames = this._lastFrame + 1;
        duration = 1e3 * (frames - this._firstFrame) / this._frameRate;
        if (this._loop) {
          elapsed = elapsed % duration;
        } else {
          elapsed = Math.min(elapsed, duration);
        }
        index = lerp(this._firstFrame, frames, elapsed / duration);
        index = Math.floor(index);
        if (index !== this._index) {
          this._index = index;
          texture = effect[this._index];
          if (texture.loaded) {
            width = texture.image.width;
            height = texture.image.height;
            if (this.width !== width) {
              this.width = width;
            }
            if (this.height !== height) {
              this.height = height;
            }
            this.fill = texture;
            if (index >= this._lastFrame - 1 && this._onLastFrame) {
              this._onLastFrame();
            }
          }
        }
      } else if (this._flagIndex || !(this.fill instanceof Texture)) {
        texture = effect[this._index];
        if (texture.loaded) {
          width = texture.image.width;
          height = texture.image.height;
          if (this.width !== width) {
            this.width = width;
          }
          if (this.height !== height) {
            this.height = height;
          }
        }
        this.fill = texture;
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagTextures = this._flagFrameRate = false;
    super.flagReset.call(this);
    return this;
  }
};
var ImageSequence = _ImageSequence;
__publicField(ImageSequence, "Properties", [
  "textures",
  "frameRate",
  "index"
]);
__publicField(ImageSequence, "DefaultFrameRate", 30);
var proto19 = {
  frameRate: {
    enumerable: true,
    get: function() {
      return this._frameRate;
    },
    set: function(v) {
      this._frameRate = v;
      this._flagFrameRate = true;
    }
  },
  index: {
    enumerable: true,
    get: function() {
      return this._index;
    },
    set: function(v) {
      this._index = v;
      this._flagIndex = true;
    }
  },
  textures: {
    enumerable: true,
    get: function() {
      return this._textures;
    },
    set: function(textures) {
      const bindTextures = this._renderer.bindTextures;
      const unbindTextures = this._renderer.unbindTextures;
      if (this._textures) {
        this._textures.unbind(Events.Types.insert, bindTextures).unbind(Events.Types.remove, unbindTextures);
      }
      this._textures = new Collection((textures || []).slice(0));
      this._textures.bind(Events.Types.insert, bindTextures).bind(Events.Types.remove, unbindTextures);
      bindTextures(this._textures);
    }
  }
};
function FlagTextures() {
  this._flagTextures = true;
}
function BindTextures(items) {
  let i = items.length;
  while (i--) {
    items[i].bind(Events.Types.change, this._renderer.flagTextures);
  }
  this._renderer.flagTextures();
}
function UnbindTextures(items) {
  let i = items.length;
  while (i--) {
    items[i].unbind(Events.Types.change, this._renderer.flagTextures);
  }
  this._renderer.flagTextures();
}
function GenerateTexture(obj) {
  if (obj instanceof Texture) {
    return obj;
  } else if (typeof obj === "string") {
    return new Texture(obj);
  }
}

// src/shapes/arc-segment.js
var _ArcSegment = class extends Path {
  constructor(x, y, ir, or, sa, ea, res) {
    const amount = res || Constants.Resolution * 3;
    const points = [];
    for (let i = 0; i < amount; i++) {
      points.push(new Anchor());
    }
    super(points, true, false, true);
    __publicField(this, "_flagStartAngle", false);
    __publicField(this, "_flagEndAngle", false);
    __publicField(this, "_flagInnerRadius", false);
    __publicField(this, "_flagOuterRadius", false);
    __publicField(this, "_startAngle", 0);
    __publicField(this, "_endAngle", TWO_PI);
    __publicField(this, "_innerRadius", 0);
    __publicField(this, "_outerRadius", 0);
    for (let prop in proto20) {
      Object.defineProperty(this, prop, proto20[prop]);
    }
    if (typeof ir === "number") {
      this.innerRadius = ir;
    }
    if (typeof or === "number") {
      this.outerRadius = or;
    }
    if (typeof sa === "number") {
      this.startAngle = sa;
    }
    if (typeof ea === "number") {
      this.endAngle = ea;
    }
    this._update();
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
  }
  _update() {
    if (this._flagVertices || this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
      const sa = this._startAngle;
      const ea = this._endAngle;
      const ir = this._innerRadius;
      const or = this._outerRadius;
      const connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
      const punctured = ir > 0;
      const vertices = this.vertices;
      let length = punctured ? vertices.length / 2 : vertices.length;
      let command, id = 0;
      let i, last, pct, v, theta, step, x, y, amp;
      if (connected) {
        length--;
      } else if (!punctured) {
        length -= 2;
      }
      for (i = 0, last = length - 1; i < length; i++) {
        pct = i / last;
        v = vertices[id];
        theta = pct * (ea - sa) + sa;
        step = (ea - sa) / length;
        x = or * Math.cos(theta);
        y = or * Math.sin(theta);
        switch (i) {
          case 0:
            command = Commands.move;
            break;
          default:
            command = Commands.curve;
        }
        v.command = command;
        v.x = x;
        v.y = y;
        v.controls.left.clear();
        v.controls.right.clear();
        if (v.command === Commands.curve) {
          amp = or * step / Math.PI;
          v.controls.left.x = amp * Math.cos(theta - HALF_PI);
          v.controls.left.y = amp * Math.sin(theta - HALF_PI);
          v.controls.right.x = amp * Math.cos(theta + HALF_PI);
          v.controls.right.y = amp * Math.sin(theta + HALF_PI);
          if (i === 1) {
            v.controls.left.multiplyScalar(2);
          }
          if (i === last) {
            v.controls.right.multiplyScalar(2);
          }
        }
        id++;
      }
      if (punctured) {
        if (connected) {
          vertices[id].command = Commands.close;
          id++;
        } else {
          length--;
          last = length - 1;
        }
        for (i = 0; i < length; i++) {
          pct = i / last;
          v = vertices[id];
          theta = (1 - pct) * (ea - sa) + sa;
          step = (ea - sa) / length;
          x = ir * Math.cos(theta);
          y = ir * Math.sin(theta);
          command = Commands.curve;
          if (i <= 0) {
            command = connected ? Commands.move : Commands.line;
          }
          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();
          if (v.command === Commands.curve) {
            amp = ir * step / Math.PI;
            v.controls.left.x = amp * Math.cos(theta + HALF_PI);
            v.controls.left.y = amp * Math.sin(theta + HALF_PI);
            v.controls.right.x = amp * Math.cos(theta - HALF_PI);
            v.controls.right.y = amp * Math.sin(theta - HALF_PI);
            if (i === 1) {
              v.controls.left.multiplyScalar(2);
            }
            if (i === last) {
              v.controls.right.multiplyScalar(2);
            }
          }
          id++;
        }
        vertices[id].copy(vertices[0]);
        vertices[id].command = Commands.line;
      } else if (!connected) {
        vertices[id].command = Commands.line;
        vertices[id].x = 0;
        vertices[id].y = 0;
        id++;
        vertices[id].copy(vertices[0]);
        vertices[id].command = Commands.line;
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    super.flagReset.call(this);
    this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = false;
    return this;
  }
  clone(parent) {
    const ir = this.innerRadius;
    const or = this.outerRadius;
    const sa = this.startAngle;
    const ea = this.endAngle;
    const resolution = this.vertices.length;
    const clone = new _ArcSegment(0, 0, ir, or, sa, ea, resolution);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    for (let i = 0; i < _ArcSegment.Properties.length; i++) {
      const k = _ArcSegment.Properties[i];
      object[k] = this[k];
    }
    return object;
  }
};
var ArcSegment = _ArcSegment;
__publicField(ArcSegment, "Properties", ["startAngle", "endAngle", "innerRadius", "outerRadius"]);
var proto20 = {
  startAngle: {
    enumerable: true,
    get: function() {
      return this._startAngle;
    },
    set: function(v) {
      this._startAngle = v;
      this._flagStartAngle = true;
    }
  },
  endAngle: {
    enumerable: true,
    get: function() {
      return this._endAngle;
    },
    set: function(v) {
      this._endAngle = v;
      this._flagEndAngle = true;
    }
  },
  innerRadius: {
    enumerable: true,
    get: function() {
      return this._innerRadius;
    },
    set: function(v) {
      this._innerRadius = v;
      this._flagInnerRadius = true;
    }
  },
  outerRadius: {
    enumerable: true,
    get: function() {
      return this._outerRadius;
    },
    set: function(v) {
      this._outerRadius = v;
      this._flagOuterRadius = true;
    }
  }
};

// src/shapes/points.js
var ceil2 = Math.ceil;
var floor3 = Math.floor;
var _Points = class extends Shape {
  constructor(vertices) {
    super();
    __publicField(this, "_flagVertices", true);
    __publicField(this, "_flagLength", true);
    __publicField(this, "_flagFill", true);
    __publicField(this, "_flagStroke", true);
    __publicField(this, "_flagLinewidth", true);
    __publicField(this, "_flagOpacity", true);
    __publicField(this, "_flagVisible", true);
    __publicField(this, "_flagSize", true);
    __publicField(this, "_flagSizeAttenuation", true);
    __publicField(this, "_length", 0);
    __publicField(this, "_fill", "#fff");
    __publicField(this, "_stroke", "#000");
    __publicField(this, "_linewidth", 1);
    __publicField(this, "_opacity", 1);
    __publicField(this, "_visible", true);
    __publicField(this, "_size", 1);
    __publicField(this, "_sizeAttenuation", false);
    __publicField(this, "_beginning", 0);
    __publicField(this, "_ending", 1);
    __publicField(this, "_dashes", null);
    __publicField(this, "noFill", Path.prototype.noFill);
    __publicField(this, "noStroke", Path.prototype.noStroke);
    __publicField(this, "corner", Path.prototype.corner);
    __publicField(this, "center", Path.prototype.center);
    __publicField(this, "getBoundingClientRect", Path.prototype.getBoundingClientRect);
    __publicField(this, "_updateLength", Path.prototype._updateLength);
    for (let prop in proto21) {
      Object.defineProperty(this, prop, proto21[prop]);
    }
    this._renderer.type = "points";
    this._renderer.flagVertices = FlagVertices.bind(this);
    this._renderer.bindVertices = BindVertices.bind(this);
    this._renderer.unbindVertices = UnbindVertices.bind(this);
    this._renderer.flagFill = FlagFill.bind(this);
    this._renderer.flagStroke = FlagStroke.bind(this);
    this._renderer.vertices = null;
    this._renderer.collection = null;
    this.sizeAttenuation = false;
    this.beginning = 0;
    this.ending = 1;
    this.fill = "#fff";
    this.stroke = "#000";
    this.className = "";
    this.visible = true;
    this.vertices = vertices;
    this.dashes = [];
    this.dashes.offset = 0;
  }
  clone(parent) {
    const clone = new _Points();
    for (let j = 0; j < this.vertices.length; j++) {
      clone.vertices.push(this.vertices[j].clone());
    }
    for (let i = 0; i < _Points.Properties.length; i++) {
      const k = _Points.Properties[i];
      clone[k] = this[k];
    }
    clone.className = this.className;
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    if (parent) {
      parent.add(clone);
    }
    return clone._update();
  }
  toObject() {
    const result = {
      vertices: this.vertices.map(function(v) {
        return v.toObject();
      })
    };
    _.each(_Points.Properties, function(k) {
      result[k] = this[k];
    }, this);
    result.className = this.className;
    result.translation = this.translation.toObject();
    result.rotation = this.rotation;
    result.scale = this.scale instanceof Vector ? this.scale.toObject() : this.scale;
    result.skewX = this.skewX;
    result.skewY = this.skewY;
    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }
    return result;
  }
  subdivide(limit) {
    this._update();
    let points = [];
    for (let i = 0; i < this.vertices.length; i++) {
      const a = this.vertices[i];
      const b = this.vertices[i - 1];
      if (!b) {
        continue;
      }
      const x1 = a.x;
      const y1 = a.y;
      const x2 = b.x;
      const y2 = b.y;
      const subdivisions = subdivide(x1, y1, x1, y1, x2, y2, x2, y2, limit);
      points = points.concat(subdivisions);
    }
    this.vertices = points;
    return this;
  }
  _update() {
    if (this._flagVertices) {
      if (this._flagLength) {
        this._updateLength(void 0, true);
      }
      const beginning = Math.min(this._beginning, this._ending);
      const ending = Math.max(this._beginning, this._ending);
      const bid = getIdByLength(this, beginning * this._length);
      const eid = getIdByLength(this, ending * this._length);
      const low = ceil2(bid);
      const high = floor3(eid);
      let j = 0, v;
      this._renderer.vertices = [];
      this._renderer.collection = [];
      for (let i = 0; i < this._collection.length; i++) {
        if (i >= low && i <= high) {
          v = this._collection[i];
          this._renderer.collection.push(v);
          this._renderer.vertices[j * 2 + 0] = v.x;
          this._renderer.vertices[j * 2 + 1] = v.y;
          j++;
        }
      }
    }
    super._update.apply(this, arguments);
    return this;
  }
  flagReset() {
    this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagSize = this._flagSizeAttenuation = false;
    super.flagReset.call(this);
    return this;
  }
};
var Points = _Points;
__publicField(Points, "Properties", [
  "fill",
  "stroke",
  "linewidth",
  "opacity",
  "visible",
  "size",
  "sizeAttenuation",
  "beginning",
  "ending"
]);
var proto21 = {
  linewidth: {
    enumerable: true,
    get: function() {
      return this._linewidth;
    },
    set: function(v) {
      this._linewidth = v;
      this._flagLinewidth = true;
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._opacity = v;
      this._flagOpacity = true;
    }
  },
  visible: {
    enumerable: true,
    get: function() {
      return this._visible;
    },
    set: function(v) {
      this._visible = v;
      this._flagVisible = true;
    }
  },
  size: {
    enumerable: true,
    get: function() {
      return this._size;
    },
    set: function(v) {
      this._size = v;
      this._flagSize = true;
    }
  },
  sizeAttenuation: {
    enumerable: true,
    get: function() {
      return this._sizeAttenuation;
    },
    set: function(v) {
      this._sizeAttenuation = v;
      this._flagSizeAttenuation = true;
    }
  },
  fill: {
    enumerable: true,
    get: function() {
      return this._fill;
    },
    set: function(f) {
      if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
        this._fill.unbind(Events.Types.change, this._renderer.flagFill);
      }
      this._fill = f;
      this._flagFill = true;
      if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
        this._fill.bind(Events.Types.change, this._renderer.flagFill);
      }
    }
  },
  stroke: {
    enumerable: true,
    get: function() {
      return this._stroke;
    },
    set: function(f) {
      if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
        this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
      }
      this._stroke = f;
      this._flagStroke = true;
      if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
        this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
      }
    }
  },
  length: {
    get: function() {
      if (this._flagLength) {
        this._updateLength();
      }
      return this._length;
    }
  },
  beginning: {
    enumerable: true,
    get: function() {
      return this._beginning;
    },
    set: function(v) {
      this._beginning = v;
      this._flagVertices = true;
    }
  },
  ending: {
    enumerable: true,
    get: function() {
      return this._ending;
    },
    set: function(v) {
      this._ending = v;
      this._flagVertices = true;
    }
  },
  vertices: {
    enumerable: true,
    get: function() {
      return this._collection;
    },
    set: function(vertices) {
      const bindVertices = this._renderer.bindVertices;
      const unbindVertices = this._renderer.unbindVertices;
      if (this._collection) {
        this._collection.unbind(Events.Types.insert, bindVertices).unbind(Events.Types.remove, unbindVertices);
      }
      if (vertices instanceof Collection) {
        this._collection = vertices;
      } else {
        this._collection = new Collection(vertices || []);
      }
      this._collection.bind(Events.Types.insert, bindVertices).bind(Events.Types.remove, unbindVertices);
      bindVertices(this._collection);
    }
  },
  dashes: {
    enumerable: true,
    get: function() {
      return this._dashes;
    },
    set: function(v) {
      if (typeof v.offset !== "number") {
        v.offset = this.dashes && this._dashes.offset || 0;
      }
      this._dashes = v;
    }
  }
};

// src/shapes/polygon.js
var cos5 = Math.cos;
var sin5 = Math.sin;
var _Polygon = class extends Path {
  constructor(x, y, radius, sides) {
    sides = Math.max(sides || 0, 3);
    super();
    __publicField(this, "_flagWidth", false);
    __publicField(this, "_flagHeight", false);
    __publicField(this, "_flagSides", false);
    __publicField(this, "_radius", 0);
    __publicField(this, "_width", 0);
    __publicField(this, "_height", 0);
    __publicField(this, "_sides", 0);
    for (let prop in proto22) {
      Object.defineProperty(this, prop, proto22[prop]);
    }
    this.closed = true;
    this.automatic = false;
    if (typeof radius === "number") {
      this.radius = radius;
    }
    if (typeof sides === "number") {
      this.sides = sides;
    }
    this._update();
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
  }
  _update() {
    if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {
      const sides = this._sides;
      const amount = sides + 1;
      let length = this.vertices.length;
      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }
      for (let i = 0; i < amount; i++) {
        const pct = (i + 0.5) / sides;
        const theta = TWO_PI * pct + Math.PI / 2;
        const x = this._width * cos5(theta) / 2;
        const y = this._height * sin5(theta) / 2;
        if (i >= length) {
          this.vertices.push(new Anchor(x, y));
        } else {
          this.vertices[i].set(x, y);
        }
        this.vertices[i].command = i === 0 ? Commands.move : Commands.line;
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagWidth = this._flagHeight = this._flagSides = false;
    super.flagReset.call(this);
    return this;
  }
  clone(parent) {
    const clone = new _Polygon(0, 0, 0, this.sides);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    clone.width = this.width;
    clone.height = this.height;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    for (let i = 0; i < _Polygon.Properties.length; i++) {
      const k = _Polygon.Properties[i];
      object[k] = this[k];
    }
    return object;
  }
};
var Polygon = _Polygon;
__publicField(Polygon, "Properties", ["width", "height", "sides"]);
var proto22 = {
  radius: {
    enumerable: true,
    get: function() {
      return this._radius;
    },
    set: function(v) {
      this._radius = v;
      this.width = v * 2;
      this.height = v * 2;
    }
  },
  width: {
    enumerable: true,
    get: function() {
      return this._width;
    },
    set: function(v) {
      this._width = v;
      this._flagWidth = true;
      this._radius = Math.max(this.width, this.height) / 2;
    }
  },
  height: {
    enumerable: true,
    get: function() {
      return this._height;
    },
    set: function(v) {
      this._height = v;
      this._flagHeight = true;
      this._radius = Math.max(this.width, this.height) / 2;
    }
  },
  sides: {
    enumerable: true,
    get: function() {
      return this._sides;
    },
    set: function(v) {
      this._sides = v;
      this._flagSides = true;
    }
  }
};

// src/shapes/star.js
var cos6 = Math.cos;
var sin6 = Math.sin;
var _Star = class extends Path {
  constructor(x, y, innerRadius, outerRadius, sides) {
    if (arguments.length <= 3) {
      outerRadius = innerRadius;
      innerRadius = outerRadius / 2;
    }
    if (typeof sides !== "number" || sides <= 0) {
      sides = 5;
    }
    super();
    __publicField(this, "_flagInnerRadius", false);
    __publicField(this, "_flagOuterRadius", false);
    __publicField(this, "_flagSides", false);
    __publicField(this, "_innerRadius", 0);
    __publicField(this, "_outerRadius", 0);
    __publicField(this, "_sides", 0);
    for (let prop in proto23) {
      Object.defineProperty(this, prop, proto23[prop]);
    }
    this.closed = true;
    this.automatic = false;
    if (typeof innerRadius === "number") {
      this.innerRadius = innerRadius;
    }
    if (typeof outerRadius === "number") {
      this.outerRadius = outerRadius;
    }
    if (typeof sides === "number") {
      this.sides = sides;
    }
    this._update();
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
  }
  _update() {
    if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
      const sides = this._sides * 2;
      const amount = sides + 1;
      let length = this.vertices.length;
      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }
      for (let i = 0; i < amount; i++) {
        const pct = (i + 0.5) / sides;
        const theta = TWO_PI * pct;
        const r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
        const x = r * cos6(theta);
        const y = r * sin6(theta);
        if (i >= length) {
          this.vertices.push(new Anchor(x, y));
        } else {
          this.vertices[i].set(x, y);
        }
        this.vertices[i].command = i === 0 ? Commands.move : Commands.line;
      }
    }
    super._update.call(this);
    return this;
  }
  flagReset() {
    this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
    super.flagReset.call(this);
    return this;
  }
  clone(parent) {
    const ir = this.innerRadius;
    const or = this.outerRadius;
    const sides = this.sides;
    const clone = new _Star(0, 0, ir, or, sides);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }
    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }
    if (parent) {
      parent.add(clone);
    }
    return clone;
  }
  toObject() {
    const object = super.toObject.call(this);
    for (let i = 0; i < _Star.Properties.length; i++) {
      const k = _Star.Properties[i];
      object[k] = this[k];
    }
    return object;
  }
};
var Star = _Star;
__publicField(Star, "Properties", ["innerRadius", "outerRadius", "sides"]);
var proto23 = {
  innerRadius: {
    enumerable: true,
    get: function() {
      return this._innerRadius;
    },
    set: function(v) {
      this._innerRadius = v;
      this._flagInnerRadius = true;
    }
  },
  outerRadius: {
    enumerable: true,
    get: function() {
      return this._outerRadius;
    },
    set: function(v) {
      this._outerRadius = v;
      this._flagOuterRadius = true;
    }
  },
  sides: {
    enumerable: true,
    get: function() {
      return this._sides;
    },
    set: function(v) {
      this._sides = v;
      this._flagSides = true;
    }
  }
};

// src/renderers/svg.js
var matrix2 = new Matrix2();
var svg = {
  version: 1.1,
  ns: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  alignments: {
    left: "start",
    center: "middle",
    right: "end"
  },
  createElement: function(name, attrs) {
    const tag = name;
    const elem = document.createElementNS(svg.ns, tag);
    if (tag === "svg") {
      attrs = _.defaults(attrs || {}, {
        version: svg.version
      });
    }
    if (attrs && Object.keys(attrs).length > 0) {
      svg.setAttributes(elem, attrs);
    }
    return elem;
  },
  setAttributes: function(elem, attrs) {
    const keys = Object.keys(attrs);
    for (let i = 0; i < keys.length; i++) {
      if (/href/.test(keys[i])) {
        elem.setAttributeNS(svg.xlink, keys[i], attrs[keys[i]]);
      } else {
        elem.setAttribute(keys[i], attrs[keys[i]]);
      }
    }
    return this;
  },
  removeAttributes: function(elem, attrs) {
    for (let key in attrs) {
      elem.removeAttribute(key);
    }
    return this;
  },
  toString: function(points, closed2) {
    let l = points.length, last = l - 1, d, string = "";
    for (let i = 0; i < l; i++) {
      const b = points[i];
      const prev = closed2 ? mod(i - 1, l) : Math.max(i - 1, 0);
      const a = points[prev];
      let command, c;
      let vx, vy, ux, uy, ar, bl, br, cl;
      let rx, ry, xAxisRotation, largeArcFlag, sweepFlag;
      let x = toFixed(b.x);
      let y = toFixed(b.y);
      switch (b.command) {
        case Commands.close:
          command = Commands.close;
          break;
        case Commands.arc:
          rx = b.rx;
          ry = b.ry;
          xAxisRotation = b.xAxisRotation;
          largeArcFlag = b.largeArcFlag;
          sweepFlag = b.sweepFlag;
          command = Commands.arc + " " + rx + " " + ry + " " + xAxisRotation + " " + largeArcFlag + " " + sweepFlag + " " + x + " " + y;
          break;
        case Commands.curve:
          ar = a.controls && a.controls.right || Vector.zero;
          bl = b.controls && b.controls.left || Vector.zero;
          if (a.relative) {
            vx = toFixed(ar.x + a.x);
            vy = toFixed(ar.y + a.y);
          } else {
            vx = toFixed(ar.x);
            vy = toFixed(ar.y);
          }
          if (b.relative) {
            ux = toFixed(bl.x + b.x);
            uy = toFixed(bl.y + b.y);
          } else {
            ux = toFixed(bl.x);
            uy = toFixed(bl.y);
          }
          command = (i === 0 ? Commands.move : Commands.curve) + " " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
          break;
        case Commands.move:
          d = b;
          command = Commands.move + " " + x + " " + y;
          break;
        default:
          command = b.command + " " + x + " " + y;
      }
      if (i >= last && closed2) {
        if (b.command === Commands.curve) {
          c = d;
          br = b.controls && b.controls.right || b;
          cl = c.controls && c.controls.left || c;
          if (b.relative) {
            vx = toFixed(br.x + b.x);
            vy = toFixed(br.y + b.y);
          } else {
            vx = toFixed(br.x);
            vy = toFixed(br.y);
          }
          if (c.relative) {
            ux = toFixed(cl.x + c.x);
            uy = toFixed(cl.y + c.y);
          } else {
            ux = toFixed(cl.x);
            uy = toFixed(cl.y);
          }
          x = toFixed(c.x);
          y = toFixed(c.y);
          command += " C " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
        }
        if (b.command !== Commands.close) {
          command += " Z";
        }
      }
      string += command + " ";
    }
    return string;
  },
  pointsToString: function(points, size) {
    let string = "";
    const r = size * 0.5;
    for (let i = 0; i < points.length; i++) {
      const x = points[i].x;
      const y = points[i].y - r;
      string += Commands.move + " " + x + " " + y + " ";
      string += "a " + r + " " + r + " 0 1 0 0.001 0 Z";
    }
    return string;
  },
  getClip: function(shape, domElement) {
    let clip = shape._renderer.clip;
    if (!clip) {
      clip = shape._renderer.clip = svg.createElement("clipPath", {
        "clip-rule": "nonzero"
      });
      domElement.defs.appendChild(clip);
    }
    return clip;
  },
  group: {
    appendChild: function(object) {
      const elem = object._renderer.elem;
      if (!elem) {
        return;
      }
      const tag = elem.nodeName;
      if (!tag || /(radial|linear)gradient/i.test(tag) || object._clip) {
        return;
      }
      this.elem.appendChild(elem);
    },
    removeChild: function(object) {
      const elem = object._renderer.elem;
      if (!elem || elem.parentNode != this.elem) {
        return;
      }
      const tag = elem.nodeName;
      if (!tag) {
        return;
      }
      if (object._clip) {
        return;
      }
      this.elem.removeChild(elem);
    },
    orderChild: function(object) {
      this.elem.appendChild(object._renderer.elem);
    },
    renderChild: function(child) {
      svg[child._renderer.type].render.call(child, this);
    },
    render: function(domElement) {
      if (!this._visible && !this._flagVisible || this._opacity === 0 && !this._flagOpacity) {
        return this;
      }
      this._update();
      if (!this._renderer.elem) {
        this._renderer.elem = svg.createElement("g", {
          id: this.id
        });
        domElement.appendChild(this._renderer.elem);
      }
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      const context = {
        domElement,
        elem: this._renderer.elem
      };
      if (flagMatrix) {
        this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
      }
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        svg[child._renderer.type].render.call(child, domElement);
      }
      if (this._flagId) {
        this._renderer.elem.setAttribute("id", this._id);
      }
      if (this._flagOpacity) {
        this._renderer.elem.setAttribute("opacity", this._opacity);
      }
      if (this._flagVisible) {
        this._renderer.elem.setAttribute("display", this._visible ? "inline" : "none");
      }
      if (this._flagClassName) {
        this._renderer.elem.setAttribute("class", this.classList.join(" "));
      }
      if (this._flagAdditions) {
        this.additions.forEach(svg.group.appendChild, context);
      }
      if (this._flagSubtractions) {
        this.subtractions.forEach(svg.group.removeChild, context);
      }
      if (this._flagOrder) {
        this.children.forEach(svg.group.orderChild, context);
      }
      if (this._flagMask) {
        if (this._mask) {
          svg[this._mask._renderer.type].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")");
        } else {
          this._renderer.elem.removeAttribute("clip-path");
        }
      }
      if (this.dataset) {
        Object.assign(this._renderer.elem.dataset, this.dataset);
      }
      return this.flagReset();
    }
  },
  path: {
    render: function(domElement) {
      if (this._opacity === 0 && !this._flagOpacity) {
        return this;
      }
      this._update();
      const changed = {};
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      if (flagMatrix) {
        changed.transform = "matrix(" + this._matrix.toString() + ")";
      }
      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagVertices) {
        const vertices = svg.toString(this._renderer.vertices, this._closed);
        changed.d = vertices;
      }
      if (this._fill && this._fill._renderer) {
        this._fill._update();
        svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
      }
      if (this._flagFill) {
        changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
      }
      if (this._stroke && this._stroke._renderer) {
        this._stroke._update();
        svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
      }
      if (this._flagStroke) {
        changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
      }
      if (this._flagLinewidth) {
        changed["stroke-width"] = this._linewidth;
      }
      if (this._flagOpacity) {
        changed["stroke-opacity"] = this._opacity;
        changed["fill-opacity"] = this._opacity;
      }
      if (this._flagClassName) {
        changed["class"] = this.classList.join(" ");
      }
      if (this._flagVisible) {
        changed.visibility = this._visible ? "visible" : "hidden";
      }
      if (this._flagCap) {
        changed["stroke-linecap"] = this._cap;
      }
      if (this._flagJoin) {
        changed["stroke-linejoin"] = this._join;
      }
      if (this._flagMiter) {
        changed["stroke-miterlimit"] = this._miter;
      }
      if (this.dashes && this.dashes.length > 0) {
        changed["stroke-dasharray"] = this.dashes.join(" ");
        changed["stroke-dashoffset"] = this.dashes.offset || 0;
      }
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement("path", changed);
        domElement.appendChild(this._renderer.elem);
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }
      if (this._flagClip) {
        const clip = svg.getClip(this, domElement);
        const elem = this._renderer.elem;
        if (this._clip) {
          elem.removeAttribute("id");
          clip.setAttribute("id", this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute("id");
          elem.setAttribute("id", this.id);
          this.parent._renderer.elem.appendChild(elem);
        }
      }
      if (this._flagMask) {
        if (this._mask) {
          svg[this._mask._renderer.type].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")");
        } else {
          this._renderer.elem.removeAttribute("clip-path");
        }
      }
      return this.flagReset();
    }
  },
  points: {
    render: function(domElement) {
      if (this._opacity === 0 && !this._flagOpacity) {
        return this;
      }
      this._update();
      const changed = {};
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      if (flagMatrix) {
        changed.transform = "matrix(" + this._matrix.toString() + ")";
      }
      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagVertices || this._flagSize || this._flagSizeAttenuation) {
        let size = this._size;
        if (!this._sizeAttenuation) {
          getComputedMatrix(this, matrix2);
          const me = matrix2.elements;
          const m = decomposeMatrix(me[0], me[3], me[1], me[4], me[2], me[5]);
          size /= Math.max(m.scaleX, m.scaleY);
        }
        const vertices = svg.pointsToString(this._renderer.collection, size);
        changed.d = vertices;
      }
      if (this._fill && this._fill._renderer) {
        this._fill._update();
        svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
      }
      if (this._flagFill) {
        changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
      }
      if (this._stroke && this._stroke._renderer) {
        this._stroke._update();
        svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
      }
      if (this._flagStroke) {
        changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
      }
      if (this._flagLinewidth) {
        changed["stroke-width"] = this._linewidth;
      }
      if (this._flagOpacity) {
        changed["stroke-opacity"] = this._opacity;
        changed["fill-opacity"] = this._opacity;
      }
      if (this._flagClassName) {
        changed["class"] = this.classList.join(" ");
      }
      if (this._flagVisible) {
        changed.visibility = this._visible ? "visible" : "hidden";
      }
      if (this.dashes && this.dashes.length > 0) {
        changed["stroke-dasharray"] = this.dashes.join(" ");
        changed["stroke-dashoffset"] = this.dashes.offset || 0;
      }
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement("path", changed);
        domElement.appendChild(this._renderer.elem);
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }
      return this.flagReset();
    }
  },
  text: {
    render: function(domElement) {
      this._update();
      const changed = {};
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      if (flagMatrix) {
        changed.transform = "matrix(" + this._matrix.toString() + ")";
      }
      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagFamily) {
        changed["font-family"] = this._family;
      }
      if (this._flagSize) {
        changed["font-size"] = this._size;
      }
      if (this._flagLeading) {
        changed["line-height"] = this._leading;
      }
      if (this._flagAlignment) {
        changed["text-anchor"] = svg.alignments[this._alignment] || this._alignment;
      }
      if (this._flagBaseline) {
        changed["alignment-baseline"] = changed["dominant-baseline"] = this._baseline;
      }
      if (this._flagStyle) {
        changed["font-style"] = this._style;
      }
      if (this._flagWeight) {
        changed["font-weight"] = this._weight;
      }
      if (this._flagDecoration) {
        changed["text-decoration"] = this._decoration;
      }
      if (this._fill && this._fill._renderer) {
        this._fill._update();
        svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
      }
      if (this._flagFill) {
        changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
      }
      if (this._stroke && this._stroke._renderer) {
        this._stroke._update();
        svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
      }
      if (this._flagStroke) {
        changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
      }
      if (this._flagLinewidth) {
        changed["stroke-width"] = this._linewidth;
      }
      if (this._flagOpacity) {
        changed.opacity = this._opacity;
      }
      if (this._flagClassName) {
        changed["class"] = this.classList.join(" ");
      }
      if (this._flagVisible) {
        changed.visibility = this._visible ? "visible" : "hidden";
      }
      if (this.dashes && this.dashes.length > 0) {
        changed["stroke-dasharray"] = this.dashes.join(" ");
        changed["stroke-dashoffset"] = this.dashes.offset || 0;
      }
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement("text", changed);
        domElement.defs.appendChild(this._renderer.elem);
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }
      if (this._flagClip) {
        const clip = svg.getClip(this, domElement);
        const elem = this._renderer.elem;
        if (this._clip) {
          elem.removeAttribute("id");
          clip.setAttribute("id", this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute("id");
          elem.setAttribute("id", this.id);
          this.parent._renderer.elem.appendChild(elem);
        }
      }
      if (this._flagMask) {
        if (this._mask) {
          svg[this._mask._renderer.type].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")");
        } else {
          this._renderer.elem.removeAttribute("clip-path");
        }
      }
      if (this._flagValue) {
        this._renderer.elem.textContent = this._value;
      }
      return this.flagReset();
    }
  },
  "linear-gradient": {
    render: function(domElement, silent) {
      if (!silent) {
        this._update();
      }
      const changed = {};
      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagEndPoints) {
        changed.x1 = this.left._x;
        changed.y1 = this.left._y;
        changed.x2 = this.right._x;
        changed.y2 = this.right._y;
      }
      if (this._flagSpread) {
        changed.spreadMethod = this._spread;
      }
      if (this._flagUnits) {
        changed.gradientUnits = this._units;
      }
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement("linearGradient", changed);
        domElement.defs.appendChild(this._renderer.elem);
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }
      if (this._flagStops) {
        const lengthChanged = this._renderer.elem.childNodes.length !== this.stops.length;
        if (lengthChanged) {
          while (this._renderer.elem.lastChild) {
            this._renderer.elem.removeChild(this._renderer.elem.lastChild);
          }
        }
        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          const attrs = {};
          if (stop._flagOffset) {
            attrs.offset = 100 * stop._offset + "%";
          }
          if (stop._flagColor) {
            attrs["stop-color"] = stop._color;
          }
          if (stop._flagOpacity) {
            attrs["stop-opacity"] = stop._opacity;
          }
          if (!stop._renderer.elem) {
            stop._renderer.elem = svg.createElement("stop", attrs);
          } else {
            svg.setAttributes(stop._renderer.elem, attrs);
          }
          if (lengthChanged) {
            this._renderer.elem.appendChild(stop._renderer.elem);
          }
          stop.flagReset();
        }
      }
      return this.flagReset();
    }
  },
  "radial-gradient": {
    render: function(domElement, silent) {
      if (!silent) {
        this._update();
      }
      const changed = {};
      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagCenter) {
        changed.cx = this.center._x;
        changed.cy = this.center._y;
      }
      if (this._flagFocal) {
        changed.fx = this.focal._x;
        changed.fy = this.focal._y;
      }
      if (this._flagRadius) {
        changed.r = this._radius;
      }
      if (this._flagSpread) {
        changed.spreadMethod = this._spread;
      }
      if (this._flagUnits) {
        changed.gradientUnits = this._units;
      }
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement("radialGradient", changed);
        domElement.defs.appendChild(this._renderer.elem);
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }
      if (this._flagStops) {
        const lengthChanged = this._renderer.elem.childNodes.length !== this.stops.length;
        if (lengthChanged) {
          while (this._renderer.elem.lastChild) {
            this._renderer.elem.removeChild(this._renderer.elem.lastChild);
          }
        }
        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          const attrs = {};
          if (stop._flagOffset) {
            attrs.offset = 100 * stop._offset + "%";
          }
          if (stop._flagColor) {
            attrs["stop-color"] = stop._color;
          }
          if (stop._flagOpacity) {
            attrs["stop-opacity"] = stop._opacity;
          }
          if (!stop._renderer.elem) {
            stop._renderer.elem = svg.createElement("stop", attrs);
          } else {
            svg.setAttributes(stop._renderer.elem, attrs);
          }
          if (lengthChanged) {
            this._renderer.elem.appendChild(stop._renderer.elem);
          }
          stop.flagReset();
        }
      }
      return this.flagReset();
    }
  },
  texture: {
    render: function(domElement, silent) {
      if (!silent) {
        this._update();
      }
      const changed = {};
      const styles = { x: 0, y: 0 };
      const image = this.image;
      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagLoaded && this.loaded) {
        switch (image.nodeName.toLowerCase()) {
          case "canvas":
            styles.href = styles["xlink:href"] = image.toDataURL("image/png");
            break;
          case "img":
          case "image":
            styles.href = styles["xlink:href"] = this.src;
            break;
        }
      }
      if (this._flagOffset || this._flagLoaded || this._flagScale) {
        changed.x = this._offset.x;
        changed.y = this._offset.y;
        if (image) {
          changed.x -= image.width / 2;
          changed.y -= image.height / 2;
          if (this._scale instanceof Vector) {
            changed.x *= this._scale.x;
            changed.y *= this._scale.y;
          } else {
            changed.x *= this._scale;
            changed.y *= this._scale;
          }
        }
        if (changed.x > 0) {
          changed.x *= -1;
        }
        if (changed.y > 0) {
          changed.y *= -1;
        }
      }
      if (this._flagScale || this._flagLoaded || this._flagRepeat) {
        changed.width = 0;
        changed.height = 0;
        if (image) {
          styles.width = changed.width = image.width;
          styles.height = changed.height = image.height;
          switch (this._repeat) {
            case "no-repeat":
              changed.width += 1;
              changed.height += 1;
              break;
          }
          if (this._scale instanceof Vector) {
            changed.width *= this._scale.x;
            changed.height *= this._scale.y;
          } else {
            changed.width *= this._scale;
            changed.height *= this._scale;
          }
        }
      }
      if (this._flagScale || this._flagLoaded) {
        if (!this._renderer.image) {
          this._renderer.image = svg.createElement("image", styles);
        } else {
          svg.setAttributes(this._renderer.image, styles);
        }
      }
      if (!this._renderer.elem) {
        changed.id = this._id;
        changed.patternUnits = "userSpaceOnUse";
        this._renderer.elem = svg.createElement("pattern", changed);
        domElement.defs.appendChild(this._renderer.elem);
      } else if (Object.keys(changed).length !== 0) {
        svg.setAttributes(this._renderer.elem, changed);
      }
      if (this._renderer.elem && this._renderer.image && !this._renderer.appended) {
        this._renderer.elem.appendChild(this._renderer.image);
        this._renderer.appended = true;
      }
      return this.flagReset();
    }
  }
};
var Renderer2 = class extends Events {
  constructor(params) {
    super();
    this.domElement = params.domElement || svg.createElement("svg");
    this.scene = new Group();
    this.scene.parent = this;
    this.defs = svg.createElement("defs");
    this.domElement.appendChild(this.defs);
    this.domElement.defs = this.defs;
    this.domElement.style.overflow = "hidden";
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    svg.setAttributes(this.domElement, {
      width,
      height
    });
    return this.trigger(Events.Types.resize, width, height);
  }
  render() {
    svg.group.render.call(this.scene, this.domElement);
    return this;
  }
};
__publicField(Renderer2, "Utils", svg);

// src/utils/shaders.js
var shaders = {
  create: function(gl, source, type) {
    const shader = gl.createShader(gl[type]);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new TwoError("unable to compile shader " + shader + ": " + error);
    }
    return shader;
  },
  types: {
    vertex: "VERTEX_SHADER",
    fragment: "FRAGMENT_SHADER"
  },
  path: {
    vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform mat3 u_matrix;
      uniform vec2 u_resolution;
      uniform vec4 u_rect;

      varying vec2 v_textureCoords;

      void main() {
        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;
        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
    fragment: `
      precision mediump float;

      uniform sampler2D u_image;
      varying vec2 v_textureCoords;

      void main() {
        vec4 texel = texture2D(u_image, v_textureCoords);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `
  },
  points: {
    vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform float u_size;
      uniform mat3 u_matrix;
      uniform vec2 u_resolution;

      varying vec2 v_textureCoords;

      void main() {
        vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_PointSize = u_size;
        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
    fragment: `
      precision mediump float;

      uniform sampler2D u_image;

      void main() {
        vec4 texel = texture2D(u_image, gl_PointCoord);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `
  }
};

// src/renderers/webgl.js
var multiplyMatrix = Matrix2.Multiply;
var identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
var transformation = new NumArray(9);
var CanvasUtils = Renderer.Utils;
var quad = new NumArray([
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1
]);
var webgl = {
  precision: 0.9,
  isHidden: /(undefined|none|transparent)/i,
  canvas: root.document ? root.document.createElement("canvas") : { getContext: function() {
  } },
  alignments: {
    left: "start",
    middle: "center",
    right: "end"
  },
  matrix: new Matrix2(),
  group: {
    removeChild: function(child, gl) {
      if (child.children) {
        for (let i = 0; i < child.children.length; i++) {
          webgl.group.removeChild(child.children[i], gl);
        }
      }
      if (child._renderer.texture) {
        gl.deleteTexture(child._renderer.texture);
        delete child._renderer.texture;
      }
      if (child._renderer.positionBuffer) {
        gl.deleteBuffer(child._renderer.positionBuffer);
        delete child._renderer.positionBuffer;
      }
    },
    render: function(gl, programs) {
      if (!this._visible) {
        return;
      }
      this._update();
      const parent = this.parent;
      const flagParentMatrix = parent._matrix && parent._matrix.manual || parent._flagMatrix;
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      if (flagParentMatrix || flagMatrix) {
        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }
        this._matrix.toTransformArray(true, transformation);
        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x;
          this._renderer.scale.y = this._scale.y;
        } else {
          this._renderer.scale.x = this._scale;
          this._renderer.scale.y = this._scale;
        }
        if (!/renderer/i.test(parent._renderer.type)) {
          this._renderer.scale.x *= parent._renderer.scale.x;
          this._renderer.scale.y *= parent._renderer.scale.y;
        }
        if (flagParentMatrix) {
          this._flagMatrix = true;
        }
      }
      if (this._mask) {
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.colorMask(false, false, false, false);
        webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);
        gl.stencilFunc(gl.EQUAL, 1, 255);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);
      }
      this._flagOpacity = parent._flagOpacity || this._flagOpacity;
      this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);
      let i;
      if (this._flagSubtractions) {
        for (i = 0; i < this.subtractions.length; i++) {
          webgl.group.removeChild(this.subtractions[i], gl);
        }
      }
      for (i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        webgl[child._renderer.type].render.call(child, gl, programs);
      }
      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }
      return this.flagReset();
    }
  },
  path: {
    updateCanvas: function(elem) {
      let prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
      let isOffset;
      const commands = elem._renderer.vertices;
      const canvas2 = this.canvas;
      const ctx = this.ctx;
      const scale = elem._renderer.scale;
      const stroke = elem._stroke;
      const linewidth = elem._linewidth;
      const fill = elem._fill;
      const opacity = elem._renderer.opacity || elem._opacity;
      const cap = elem._cap;
      const join = elem._join;
      const miter = elem._miter;
      const closed2 = elem._closed;
      const dashes = elem.dashes;
      const length = commands.length;
      const last = length - 1;
      canvas2.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
      canvas2.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);
      const centroid = elem._renderer.rect.centroid;
      const cx = centroid.x;
      const cy = centroid.y;
      ctx.clearRect(0, 0, canvas2.width, canvas2.height);
      if (fill) {
        if (typeof fill === "string") {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === "string") {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (miter) {
          ctx.miterLimit = miter;
        }
        if (join) {
          ctx.lineJoin = join;
        }
        if (!closed2 && cap) {
          ctx.lineCap = cap;
        }
      }
      if (typeof opacity === "number") {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }
      let d, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, ax, ay;
      ctx.save();
      ctx.scale(scale.x, scale.y);
      ctx.translate(cx, cy);
      ctx.beginPath();
      for (let i = 0; i < commands.length; i++) {
        const b = commands[i];
        x = b.x;
        y = b.y;
        switch (b.command) {
          case Commands.close:
            ctx.closePath();
            break;
          case Commands.arc:
            rx = b.rx;
            ry = b.ry;
            xAxisRotation = b.xAxisRotation;
            largeArcFlag = b.largeArcFlag;
            sweepFlag = b.sweepFlag;
            prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
            a = commands[prev];
            ax = a.x;
            ay = a.y;
            CanvasUtils.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
            break;
          case Commands.curve:
            prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
            a = commands[prev];
            ar = a.controls && a.controls.right || Vector.zero;
            bl = b.controls && b.controls.left || Vector.zero;
            if (a._relative) {
              vx = ar.x + a.x;
              vy = ar.y + a.y;
            } else {
              vx = ar.x;
              vy = ar.y;
            }
            if (b._relative) {
              ux = bl.x + b.x;
              uy = bl.y + b.y;
            } else {
              ux = bl.x;
              uy = bl.y;
            }
            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);
            if (i >= last && closed2) {
              c = d;
              br = b.controls && b.controls.right || Vector.zero;
              cl = c.controls && c.controls.left || Vector.zero;
              if (b._relative) {
                vx = br.x + b.x;
                vy = br.y + b.y;
              } else {
                vx = br.x;
                vy = br.y;
              }
              if (c._relative) {
                ux = cl.x + c.x;
                uy = cl.y + c.y;
              } else {
                ux = cl.x;
                uy = cl.y;
              }
              x = c.x;
              y = c.y;
              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);
            }
            break;
          case Commands.line:
            ctx.lineTo(x, y);
            break;
          case Commands.move:
            d = b;
            ctx.moveTo(x, y);
            break;
        }
      }
      if (closed2) {
        ctx.closePath();
      }
      if (!webgl.isHidden.test(fill)) {
        isOffset = fill._renderer && fill._renderer.offset;
        if (isOffset) {
          ctx.save();
          ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
          ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
        }
        ctx.fill();
        if (isOffset) {
          ctx.restore();
        }
      }
      if (!webgl.isHidden.test(stroke)) {
        isOffset = stroke._renderer && stroke._renderer.offset;
        if (isOffset) {
          ctx.save();
          ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
          ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
          ctx.lineWidth = linewidth / stroke._renderer.scale.x;
        }
        ctx.stroke();
        if (isOffset) {
          ctx.restore();
        }
      }
      ctx.restore();
    },
    getBoundingClientRect: function(vertices, border, rect) {
      let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity, width, height;
      vertices.forEach(function(v) {
        const x = v.x, y = v.y, controls = v.controls;
        let a, b, c, d, cl, cr;
        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);
        if (!v.controls) {
          return;
        }
        cl = controls.left;
        cr = controls.right;
        if (!cl || !cr) {
          return;
        }
        a = v._relative ? cl.x + x : cl.x;
        b = v._relative ? cl.y + y : cl.y;
        c = v._relative ? cr.x + x : cr.x;
        d = v._relative ? cr.y + y : cr.y;
        if (!a || !b || !c || !d) {
          return;
        }
        top = Math.min(b, d, top);
        left = Math.min(a, c, left);
        right = Math.max(a, c, right);
        bottom = Math.max(b, d, bottom);
      });
      if (typeof border === "number") {
        top -= border;
        left -= border;
        right += border;
        bottom += border;
      }
      width = right - left;
      height = bottom - top;
      rect.top = top;
      rect.left = left;
      rect.right = right;
      rect.bottom = bottom;
      rect.width = width;
      rect.height = height;
      if (!rect.centroid) {
        rect.centroid = {};
      }
      rect.centroid.x = -left;
      rect.centroid.y = -top;
    },
    render: function(gl, programs, forcedParent) {
      if (!this._visible || !this._opacity) {
        return this;
      }
      this._update();
      const parent = forcedParent || this.parent;
      const program = programs[this._renderer.type];
      const flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      const parentChanged = this._renderer.parent !== parent;
      const flagTexture = this._flagVertices || this._flagFill || this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
      if (flagParentMatrix || flagMatrix || parentChanged) {
        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }
        this._matrix.toTransformArray(true, transformation);
        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }
        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }
      if (this._mask) {
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.colorMask(false, false, false, false);
        webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);
        gl.stencilFunc(gl.EQUAL, 1, 255);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);
      }
      if (flagTexture) {
        if (!this._renderer.rect) {
          this._renderer.rect = {};
        }
        this._renderer.opacity = this._opacity * parent._renderer.opacity;
        webgl.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect);
        webgl.updateTexture.call(webgl, gl, this);
      } else {
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }
      }
      if (this._clip && !forcedParent || !this._renderer.texture) {
        return this;
      }
      if (programs.current !== program) {
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, programs.buffers.position);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.position);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
        if (!programs.resolution.flagged) {
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
        }
        programs.current = program;
      }
      if (programs.resolution.flagged) {
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
      }
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
      const rect = this._renderer.rect;
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }
      return this.flagReset();
    }
  },
  points: {
    updateCanvas: function(elem) {
      let isOffset;
      const canvas2 = this.canvas;
      const ctx = this.ctx;
      const stroke = elem._stroke;
      const linewidth = elem._linewidth;
      const fill = elem._fill;
      const opacity = elem._renderer.opacity || elem._opacity;
      const dashes = elem.dashes;
      const size = elem._size;
      let dimension = size;
      if (!webgl.isHidden.test(stroke)) {
        dimension += linewidth;
      }
      canvas2.width = getPoT(dimension);
      canvas2.height = canvas2.width;
      const aspect = dimension / canvas2.width;
      const cx = canvas2.width / 2;
      const cy = canvas2.height / 2;
      ctx.clearRect(0, 0, canvas2.width, canvas2.height);
      if (fill) {
        if (typeof fill === "string") {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === "string") {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth / aspect;
        }
      }
      if (typeof opacity === "number") {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(webgl.precision, webgl.precision);
      ctx.beginPath();
      ctx.arc(0, 0, size / aspect * 0.5, 0, TWO_PI);
      ctx.restore();
      if (closed) {
        ctx.closePath();
      }
      if (!webgl.isHidden.test(fill)) {
        isOffset = fill._renderer && fill._renderer.offset;
        if (isOffset) {
          ctx.save();
          ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
          ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
        }
        ctx.fill();
        if (isOffset) {
          ctx.restore();
        }
      }
      if (!webgl.isHidden.test(stroke)) {
        isOffset = stroke._renderer && stroke._renderer.offset;
        if (isOffset) {
          ctx.save();
          ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
          ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
          ctx.lineWidth = linewidth / stroke._renderer.scale.x;
        }
        ctx.stroke();
        if (isOffset) {
          ctx.restore();
        }
      }
    },
    render: function(gl, programs, forcedParent) {
      if (!this._visible || !this._opacity) {
        return this;
      }
      this._update();
      let size = this._size;
      const parent = forcedParent || this.parent;
      const program = programs[this._renderer.type];
      const sizeAttenuation = this._sizeAttenuation;
      const stroke = this._stroke;
      const linewidth = this._linewidth;
      const flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      const parentChanged = this._renderer.parent !== parent;
      const commands = this._renderer.vertices;
      const length = this._renderer.collection.length;
      const flagVertices = this._flagVertices;
      const flagTexture = this._flagFill || this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
      if (flagParentMatrix || flagMatrix || parentChanged) {
        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }
        this._matrix.toTransformArray(true, transformation);
        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }
        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }
      if (flagVertices) {
        const positionBuffer = this._renderer.positionBuffer;
        if (positionBuffer) {
          gl.deleteBuffer(positionBuffer);
        }
        this._renderer.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.positionBuffer);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.position);
        gl.bufferData(gl.ARRAY_BUFFER, commands, gl.STATIC_DRAW);
      }
      if (flagTexture) {
        this._renderer.opacity = this._opacity * parent._renderer.opacity;
        webgl.updateTexture.call(webgl, gl, this);
      } else {
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }
      }
      if (this._clip && !forcedParent || !this._renderer.texture) {
        return this;
      }
      if (!webgl.isHidden.test(stroke)) {
        size += linewidth;
      }
      size /= webgl.precision;
      if (sizeAttenuation) {
        size *= Math.max(this._renderer.scale.x, this._renderer.scale.y);
      }
      if (programs.current !== program) {
        gl.useProgram(program);
        if (!programs.resolution.flagged) {
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
        }
        programs.current = program;
      }
      if (programs.resolution.flagged) {
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
      }
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform1f(program.size, size * programs.resolution.ratio);
      gl.drawArrays(gl.POINTS, 0, length);
      return this.flagReset();
    }
  },
  text: {
    updateCanvas: function(elem) {
      const canvas2 = this.canvas;
      const ctx = this.ctx;
      const scale = elem._renderer.scale;
      const stroke = elem._stroke;
      const linewidth = elem._linewidth * scale;
      const fill = elem._fill;
      const opacity = elem._renderer.opacity || elem._opacity;
      const dashes = elem.dashes;
      const decoration = elem._decoration;
      canvas2.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
      canvas2.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);
      const centroid = elem._renderer.rect.centroid;
      const cx = centroid.x;
      const cy = centroid.y;
      let a, b, c, d, e, sx, sy, x1, y1, x2, y2;
      const isOffset = fill._renderer && fill._renderer.offset && stroke._renderer && stroke._renderer.offset;
      ctx.clearRect(0, 0, canvas2.width, canvas2.height);
      if (!isOffset) {
        ctx.font = [elem._style, elem._weight, elem._size + "px/" + elem._leading + "px", elem._family].join(" ");
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (fill) {
        if (typeof fill === "string") {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === "string") {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
      }
      if (typeof opacity === "number") {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }
      ctx.save();
      ctx.scale(scale.x, scale.y);
      ctx.translate(cx, cy);
      if (!webgl.isHidden.test(fill)) {
        if (fill._renderer && fill._renderer.offset) {
          sx = fill._renderer.scale.x;
          sy = fill._renderer.scale.y;
          ctx.save();
          ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
          ctx.scale(sx, sy);
          a = elem._size / fill._renderer.scale.y;
          b = elem._leading / fill._renderer.scale.y;
          ctx.font = [
            elem._style,
            elem._weight,
            a + "px/",
            b + "px",
            elem._family
          ].join(" ");
          c = fill._renderer.offset.x / fill._renderer.scale.x;
          d = fill._renderer.offset.y / fill._renderer.scale.y;
          ctx.fillText(elem.value, c, d);
          ctx.restore();
        } else {
          ctx.fillText(elem.value, 0, 0);
        }
      }
      if (!webgl.isHidden.test(stroke)) {
        if (stroke._renderer && stroke._renderer.offset) {
          sx = stroke._renderer.scale.x;
          sy = stroke._renderer.scale.y;
          ctx.save();
          ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
          ctx.scale(sx, sy);
          a = elem._size / stroke._renderer.scale.y;
          b = elem._leading / stroke._renderer.scale.y;
          ctx.font = [
            elem._style,
            elem._weight,
            a + "px/",
            b + "px",
            elem._family
          ].join(" ");
          c = stroke._renderer.offset.x / stroke._renderer.scale.x;
          d = stroke._renderer.offset.y / stroke._renderer.scale.y;
          e = linewidth / stroke._renderer.scale.x;
          ctx.lineWidth = e;
          ctx.strokeText(elem.value, c, d);
          ctx.restore();
        } else {
          ctx.strokeText(elem.value, 0, 0);
        }
      }
      if (/(underline|strikethrough)/i.test(decoration)) {
        const metrics = ctx.measureText(elem.value);
        switch (decoration) {
          case "underline":
            y1 = metrics.actualBoundingBoxAscent;
            y2 = metrics.actualBoundingBoxAscent;
            break;
          case "strikethrough":
            y1 = 0;
            y2 = 0;
            break;
        }
        x1 = -metrics.width / 2;
        x2 = metrics.width / 2;
        ctx.lineWidth = Math.max(Math.floor(elem._size / 15), 1);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();
    },
    getBoundingClientRect: function(elem, rect) {
      const ctx = webgl.ctx;
      ctx.font = [elem._style, elem._weight, elem._size + "px/" + elem._leading + "px", elem._family].join(" ");
      ctx.textAlign = "center";
      ctx.textBaseline = elem._baseline;
      let width = ctx.measureText(elem._value).width * 1.25;
      let height = Math.max(elem._size, elem._leading) * 1.25;
      if (this._linewidth && !webgl.isHidden.test(this._stroke)) {
        width += this._linewidth * 2;
        height += this._linewidth * 2;
      }
      const w = width / 2;
      const h = height / 2;
      switch (webgl.alignments[elem._alignment] || elem._alignment) {
        case webgl.alignments.left:
          rect.left = 0;
          rect.right = width;
          break;
        case webgl.alignments.right:
          rect.left = -width;
          rect.right = 0;
          break;
        default:
          rect.left = -w;
          rect.right = w;
      }
      switch (elem._baseline) {
        case "bottom":
          rect.top = -height;
          rect.bottom = 0;
          break;
        case "top":
          rect.top = 0;
          rect.bottom = height;
          break;
        default:
          rect.top = -h;
          rect.bottom = h;
      }
      rect.width = width;
      rect.height = height;
      if (!rect.centroid) {
        rect.centroid = {};
      }
      rect.centroid.x = w;
      rect.centroid.y = h;
    },
    render: function(gl, programs, forcedParent) {
      if (!this._visible || !this._opacity) {
        return this;
      }
      this._update();
      const parent = forcedParent || this.parent;
      const program = programs[this._renderer.type];
      const flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      const parentChanged = this._renderer.parent !== parent;
      const flagTexture = this._flagVertices || this._flagFill || this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
      if (flagParentMatrix || flagMatrix || parentChanged) {
        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }
        this._matrix.toTransformArray(true, transformation);
        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }
        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }
      if (this._mask) {
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.colorMask(false, false, false, false);
        webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);
        gl.stencilFunc(gl.EQUAL, 1, 255);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);
      }
      if (flagTexture) {
        if (!this._renderer.rect) {
          this._renderer.rect = {};
        }
        this._renderer.opacity = this._opacity * parent._renderer.opacity;
        webgl.text.getBoundingClientRect(this, this._renderer.rect);
        webgl.updateTexture.call(webgl, gl, this);
      } else {
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }
      }
      if (this._clip && !forcedParent || !this._renderer.texture) {
        return this;
      }
      if (programs.current !== program) {
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, programs.buffers.position);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.position);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
        if (!programs.resolution.flagged) {
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
        }
        programs.current = program;
      }
      if (programs.resolution.flagged) {
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
      }
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
      const rect = this._renderer.rect;
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }
      return this.flagReset();
    }
  },
  "linear-gradient": {
    render: function(ctx, parent) {
      if (!ctx.canvas.getContext("2d") || !parent) {
        return;
      }
      this._update();
      if (!this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
        let rect;
        let lx = this.left._x;
        let ly = this.left._y;
        let rx = this.right._x;
        let ry = this.right._y;
        if (/objectBoundingBox/i.test(this._units)) {
          rect = parent.getBoundingClientRect(true);
          lx = (lx - 0.5) * rect.width;
          ly = (ly - 0.5) * rect.height;
          rx = (rx - 0.5) * rect.width;
          ry = (ry - 0.5) * rect.height;
        }
        this._renderer.effect = ctx.createLinearGradient(lx, ly, rx, ry);
        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }
      }
      return this.flagReset();
    }
  },
  "radial-gradient": {
    render: function(ctx, parent) {
      if (!ctx.canvas.getContext("2d") || !parent) {
        return;
      }
      this._update();
      if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
        let rect;
        let cx = this.center._x;
        let cy = this.center._y;
        let fx = this.focal._x;
        let fy = this.focal._y;
        let radius = this._radius;
        if (/objectBoundingBox/i.test(this._units)) {
          rect = parent.getBoundingClientRect(true);
          cx = cx * rect.width * 0.5;
          cy = cy * rect.height * 0.5;
          fx = fx * rect.width * 0.5;
          fy = fy * rect.height * 0.5;
          radius *= Math.min(rect.width, rect.height) * 0.5;
        }
        this._renderer.effect = ctx.createRadialGradient(cx, cy, 0, fx, fy, radius);
        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }
      }
      return this.flagReset();
    }
  },
  texture: {
    render: function(ctx, elem) {
      if (!ctx.canvas.getContext("2d")) {
        return;
      }
      this._update();
      const image = this.image;
      if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) {
        this._renderer.effect = ctx.createPattern(image, this._repeat);
      } else if (!this._renderer.effect) {
        return this.flagReset();
      }
      if (this._flagOffset || this._flagLoaded || this._flagScale) {
        if (!(this._renderer.offset instanceof Vector)) {
          this._renderer.offset = new Vector();
        }
        this._renderer.offset.x = -this._offset.x;
        this._renderer.offset.y = -this._offset.y;
        if (image) {
          this._renderer.offset.x += image.width / 2;
          this._renderer.offset.y += image.height / 2;
          if (this._scale instanceof Vector) {
            this._renderer.offset.x *= this._scale.x;
            this._renderer.offset.y *= this._scale.y;
          } else {
            this._renderer.offset.x *= this._scale;
            this._renderer.offset.y *= this._scale;
          }
        }
      }
      if (this._flagScale || this._flagLoaded) {
        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.copy(this._scale);
        } else {
          this._renderer.scale.set(this._scale, this._scale);
        }
      }
      return this.flagReset();
    }
  },
  updateTexture: function(gl, elem) {
    this[elem._renderer.type].updateCanvas.call(webgl, elem);
    if (this.canvas.width <= 0 || this.canvas.height <= 0) {
      if (elem._renderer.texture) {
        gl.deleteTexture(elem._renderer.texture);
      }
      delete elem._renderer.texture;
      return;
    }
    if (!elem._renderer.texture) {
      elem._renderer.texture = gl.createTexture();
    }
    gl.bindTexture(gl.TEXTURE_2D, elem._renderer.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
  },
  program: {
    create: function(gl, shaders2) {
      let program, linked, error;
      program = gl.createProgram();
      _.each(shaders2, function(s) {
        gl.attachShader(program, s);
      });
      gl.linkProgram(program);
      linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) {
        error = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new TwoError("unable to link program: " + error);
      }
      return program;
    }
  },
  TextureRegistry: new Registry()
};
webgl.ctx = webgl.canvas.getContext("2d");
var Renderer3 = class extends Events {
  constructor(params) {
    super();
    let gl, program, vs, fs;
    this.domElement = params.domElement || document.createElement("canvas");
    if (typeof params.offscreenElement !== "undefined") {
      webgl.canvas = params.offscreenElement;
      webgl.ctx = webgl.canvas.getContext("2d");
    }
    this.scene = new Group();
    this.scene.parent = this;
    this._renderer = {
      type: "renderer",
      matrix: new NumArray(identity),
      scale: 1,
      opacity: 1
    };
    this._flagMatrix = true;
    params = _.defaults(params || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: true,
      overdraw: false
    });
    this.overdraw = params.overdraw;
    gl = this.ctx = this.domElement.getContext("webgl", params) || this.domElement.getContext("experimental-webgl", params);
    if (!this.ctx) {
      throw new TwoError("unable to create a webgl context. Try using another renderer.");
    }
    vs = shaders.create(gl, shaders.path.vertex, shaders.types.vertex);
    fs = shaders.create(gl, shaders.path.fragment, shaders.types.fragment);
    this.programs = {
      current: null,
      buffers: {
        position: gl.createBuffer()
      },
      resolution: {
        width: 0,
        height: 0,
        ratio: 1,
        flagged: false
      }
    };
    program = this.programs.path = webgl.program.create(gl, [vs, fs]);
    this.programs.text = this.programs.path;
    program.position = gl.getAttribLocation(program, "a_position");
    program.matrix = gl.getUniformLocation(program, "u_matrix");
    program.rect = gl.getUniformLocation(program, "u_rect");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.position);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    vs = shaders.create(gl, shaders.points.vertex, shaders.types.vertex);
    fs = shaders.create(gl, shaders.points.fragment, shaders.types.fragment);
    program = this.programs.points = webgl.program.create(gl, [vs, fs]);
    program.position = gl.getAttribLocation(program, "a_position");
    program.matrix = gl.getUniformLocation(program, "u_matrix");
    program.size = gl.getUniformLocation(program, "u_size");
    gl.enable(gl.BLEND);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }
  setSize(width, height, ratio) {
    let w, h;
    const ctx = this.ctx;
    this.width = width;
    this.height = height;
    this.ratio = typeof ratio === "undefined" ? getRatio(ctx) : ratio;
    this.domElement.width = width * this.ratio;
    this.domElement.height = height * this.ratio;
    if (_.isObject(this.domElement.style)) {
      _.extend(this.domElement.style, {
        width: width + "px",
        height: height + "px"
      });
    }
    this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;
    this._flagMatrix = true;
    w = width * this.ratio;
    h = height * this.ratio;
    ctx.viewport(0, 0, w, h);
    this.programs.resolution.width = w;
    this.programs.resolution.height = h;
    this.programs.resolution.ratio = this.ratio;
    this.programs.resolution.flagged = true;
    return this.trigger(Events.Types.resize, width, height, ratio);
  }
  render() {
    const gl = this.ctx;
    if (!this.overdraw) {
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    webgl.group.render.call(this.scene, gl, this.programs);
    this._flagMatrix = false;
    this.programs.resolution.flagged = true;
    return this;
  }
};
__publicField(Renderer3, "Utils", webgl);

// src/two.js
var Utils = _.extend({
  Error: TwoError,
  getRatio,
  read,
  xhr
}, _, CanvasShim, curves_exports, math_exports);
var _Two = class {
  constructor(options) {
    __publicField(this, "_events", new Events());
    __publicField(this, "type", "");
    __publicField(this, "renderer", null);
    __publicField(this, "scene", null);
    __publicField(this, "width", 0);
    __publicField(this, "height", 0);
    __publicField(this, "frameCount", 0);
    __publicField(this, "timeDelta", 0);
    __publicField(this, "playing", false);
    const params = _.defaults(options || {}, {
      fullscreen: false,
      fitted: false,
      width: 640,
      height: 480,
      type: _Two.Types.svg,
      autostart: false
    });
    _.each(params, function(v, k) {
      if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
        return;
      }
      this[k] = v;
    }, this);
    if (_.isElement(params.domElement)) {
      const tagName = params.domElement.tagName.toLowerCase();
      if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + tagName)) {
        this.type = _Two.Types[tagName];
      }
    }
    this.renderer = new _Two[this.type](this);
    this.setPlaying(params.autostart);
    this.frameCount = 0;
    if (params.fullscreen) {
      this.fit = fitToWindow.bind(this);
      this.fit.domElement = window;
      this.fit.attached = true;
      _.extend(document.body.style, {
        overflow: "hidden",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed"
      });
      _.extend(this.renderer.domElement.style, {
        display: "block",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed"
      });
      dom.bind(this.fit.domElement, "resize", this.fit);
      this.fit();
    } else if (params.fitted) {
      this.fit = fitToParent.bind(this);
      _.extend(this.renderer.domElement.style, {
        display: "block"
      });
    } else if (!_.isElement(params.domElement)) {
      this.renderer.setSize(params.width, params.height, this.ratio);
      this.width = params.width;
      this.height = params.height;
    }
    this.renderer.bind(Events.Types.resize, updateDimensions.bind(this));
    this.scene = this.renderer.scene;
    _Two.Instances.push(this);
    if (params.autostart) {
      raf.init();
    }
  }
  get _bound() {
    return this._events._bound;
  }
  set _bound(v) {
    this._events._bound = v;
  }
  addEventListener() {
    return this._events.addEventListener.apply(this, arguments);
  }
  on() {
    return this._events.addEventListener.apply(this, arguments);
  }
  bind() {
    return this._events.addEventListener.apply(this, arguments);
  }
  removeEventListener() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  off() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  unbind() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  dispatchEvent() {
    return this._events.dispatchEvent.apply(this, arguments);
  }
  trigger() {
    return this._events.dispatchEvent.apply(this, arguments);
  }
  listen() {
    return this._events.listen.apply(this, arguments);
  }
  ignore() {
    return this._events.ignore.apply(this, arguments);
  }
  appendTo(elem) {
    elem.appendChild(this.renderer.domElement);
    if (this.fit) {
      if (this.fit.domElement !== window) {
        this.fit.domElement = elem;
        this.fit.attached = false;
      }
      this.update();
    }
    return this;
  }
  play() {
    this.playing = true;
    raf.init();
    return this.trigger(Events.Types.play);
  }
  pause() {
    this.playing = false;
    return this.trigger(Events.Types.pause);
  }
  setPlaying(p) {
    this.playing = p;
  }
  release(obj) {
    let i, v, child;
    if (!_.isObject(obj)) {
      return this.release(this.scene);
    }
    if (typeof obj.unbind === "function") {
      obj.unbind();
    }
    if (obj.vertices) {
      if (typeof obj.vertices.unbind === "function") {
        obj.vertices.unbind();
      }
      for (i = 0; i < obj.vertices.length; i++) {
        v = obj.vertices[i];
        if (typeof v.unbind === "function") {
          v.unbind();
        }
        if (v.controls) {
          if (v.controls.left && typeof v.controls.left.unbind === "function") {
            v.controls.left.unbind();
          }
          if (v.controls.right && typeof v.controls.right.unbind === "function") {
            v.controls.right.unbind();
          }
        }
      }
    }
    if (obj.children) {
      for (i = 0; i < obj.children.length; i++) {
        child = obj.children[i];
        this.release(child);
      }
      if (typeof obj.children.unbind === "function") {
        obj.children.unbind();
      }
    }
    return obj;
  }
  update() {
    const animated = !!this._lastFrame;
    const now = _.performance.now();
    if (animated) {
      this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
    }
    this._lastFrame = now;
    if (this.fit && this.fit.domElement && !this.fit.attached) {
      dom.bind(this.fit.domElement, "resize", this.fit);
      this.fit.attached = true;
      this.fit();
    }
    const width = this.width;
    const height = this.height;
    const renderer = this.renderer;
    if (width !== renderer.width || height !== renderer.height) {
      renderer.setSize(width, height, this.ratio);
    }
    this.trigger(Events.Types.update, this.frameCount, this.timeDelta);
    return this.render();
  }
  render() {
    this.renderer.render();
    return this.trigger(Events.Types.render, this.frameCount++);
  }
  add(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }
    this.scene.add(objects);
    return this;
  }
  remove(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }
    this.scene.remove(objects);
    return this;
  }
  clear() {
    this.scene.remove(this.scene.children);
    return this;
  }
  makeLine(x1, y1, x2, y2) {
    const line = new Line(x1, y1, x2, y2);
    this.scene.add(line);
    return line;
  }
  makeArrow(x1, y1, x2, y2, size) {
    const headlen = typeof size === "number" ? size : 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const vertices = [
      new Anchor(x1, y1, void 0, void 0, void 0, void 0, Commands.move),
      new Anchor(x2, y2, void 0, void 0, void 0, void 0, Commands.line),
      new Anchor(x2 - headlen * Math.cos(angle - Math.PI / 4), y2 - headlen * Math.sin(angle - Math.PI / 4), void 0, void 0, void 0, void 0, Commands.line),
      new Anchor(x2, y2, void 0, void 0, void 0, void 0, Commands.move),
      new Anchor(x2 - headlen * Math.cos(angle + Math.PI / 4), y2 - headlen * Math.sin(angle + Math.PI / 4), void 0, void 0, void 0, void 0, Commands.line)
    ];
    const path = new Path(vertices, false, false, true);
    path.noFill();
    path.cap = "round";
    path.join = "round";
    this.scene.add(path);
    return path;
  }
  makeRectangle(x, y, width, height) {
    const rect = new Rectangle(x, y, width, height);
    this.scene.add(rect);
    return rect;
  }
  makeRoundedRectangle(x, y, width, height, sides) {
    const rect = new RoundedRectangle(x, y, width, height, sides);
    this.scene.add(rect);
    return rect;
  }
  makeCircle(x, y, radius, resolution) {
    const circle = new Circle(x, y, radius, resolution);
    this.scene.add(circle);
    return circle;
  }
  makeEllipse(x, y, rx, ry, resolution) {
    const ellipse = new Ellipse(x, y, rx, ry, resolution);
    this.scene.add(ellipse);
    return ellipse;
  }
  makeStar(x, y, outerRadius, innerRadius, sides) {
    const star = new Star(x, y, outerRadius, innerRadius, sides);
    this.scene.add(star);
    return star;
  }
  makeCurve(points) {
    const l = arguments.length;
    if (!Array.isArray(points)) {
      points = [];
      for (let i = 0; i < l; i += 2) {
        const x = arguments[i];
        if (typeof x !== "number") {
          break;
        }
        const y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }
    const last = arguments[l - 1];
    const curve = new Path(points, !(typeof last === "boolean" ? last : void 0), true);
    const rect = curve.getBoundingClientRect();
    curve.center().translation.set(rect.left + rect.width / 2, rect.top + rect.height / 2);
    this.scene.add(curve);
    return curve;
  }
  makePolygon(x, y, radius, sides) {
    const poly = new Polygon(x, y, radius, sides);
    this.scene.add(poly);
    return poly;
  }
  makeArcSegment(x, y, innerRadius, outerRadius, startAngle, endAngle, resolution) {
    const arcSegment = new ArcSegment(x, y, innerRadius, outerRadius, startAngle, endAngle, resolution);
    this.scene.add(arcSegment);
    return arcSegment;
  }
  makePoints(p) {
    const l = arguments.length;
    let vertices = p;
    if (!Array.isArray(p)) {
      vertices = [];
      for (let i = 0; i < l; i += 2) {
        const x = arguments[i];
        if (typeof x !== "number") {
          break;
        }
        const y = arguments[i + 1];
        vertices.push(new Vector(x, y));
      }
    }
    const points = new Points(vertices);
    this.scene.add(points);
    return points;
  }
  makePath(p) {
    const l = arguments.length;
    let points = p;
    if (!Array.isArray(p)) {
      points = [];
      for (let i = 0; i < l; i += 2) {
        const x = arguments[i];
        if (typeof x !== "number") {
          break;
        }
        const y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }
    const last = arguments[l - 1];
    const path = new Path(points, !(typeof last === "boolean" ? last : void 0));
    const rect = path.getBoundingClientRect();
    if (typeof rect.top === "number" && typeof rect.left === "number" && typeof rect.right === "number" && typeof rect.bottom === "number") {
      path.center().translation.set(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    this.scene.add(path);
    return path;
  }
  makeText(message, x, y, styles) {
    const text = new Text(message, x, y, styles);
    this.add(text);
    return text;
  }
  makeLinearGradient(x1, y1, x2, y2) {
    const stops = Array.prototype.slice.call(arguments, 4);
    const gradient = new LinearGradient(x1, y1, x2, y2, stops);
    this.add(gradient);
    return gradient;
  }
  makeRadialGradient(x1, y1, radius) {
    const stops = Array.prototype.slice.call(arguments, 3);
    const gradient = new RadialGradient(x1, y1, radius, stops);
    this.add(gradient);
    return gradient;
  }
  makeSprite(pathOrTexture, x, y, columns, rows, frameRate, autostart) {
    const sprite = new Sprite(pathOrTexture, x, y, columns, rows, frameRate);
    if (autostart) {
      sprite.play();
    }
    this.add(sprite);
    return sprite;
  }
  makeImageSequence(pathsOrTextures, x, y, frameRate, autostart) {
    const imageSequence = new ImageSequence(pathsOrTextures, x, y, frameRate);
    if (autostart) {
      imageSequence.play();
    }
    this.add(imageSequence);
    return imageSequence;
  }
  makeTexture(pathOrSource, callback) {
    const texture = new Texture(pathOrSource, callback);
    return texture;
  }
  makeGroup(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }
    const group = new Group();
    this.scene.add(group);
    group.add(objects);
    return group;
  }
  interpret(svg2, shallow, add) {
    const tag = svg2.tagName.toLowerCase();
    add = typeof add !== "undefined" ? add : true;
    if (!(tag in read)) {
      return null;
    }
    const node = read[tag].call(this, svg2);
    if (add) {
      this.add(shallow && node instanceof Group ? node.children : node);
    } else if (node.parent) {
      node.remove();
    }
    return node;
  }
  load(pathOrSVGContent, callback) {
    const group = new Group();
    let elem, i, child;
    const attach = function(data) {
      dom.temp.innerHTML = data;
      for (i = 0; i < dom.temp.children.length; i++) {
        elem = dom.temp.children[i];
        child = this.interpret(elem, false, false);
        if (child !== null) {
          group.add(child);
        }
      }
      if (typeof callback === "function") {
        const svg2 = dom.temp.children.length <= 1 ? dom.temp.children[0] : dom.temp.children;
        callback(group, svg2);
      }
    }.bind(this);
    if (/\.svg$/i.test(pathOrSVGContent)) {
      xhr(pathOrSVGContent, attach);
      return group;
    }
    attach(pathOrSVGContent);
    return group;
  }
};
var Two = _Two;
__publicField(Two, "nextFrameID", Constants.nextFrameID);
__publicField(Two, "Types", Constants.Types);
__publicField(Two, "Version", Constants.Version);
__publicField(Two, "PublishDate", Constants.PublishDate);
__publicField(Two, "Identifier", Constants.Identifier);
__publicField(Two, "Resolution", Constants.Resolution);
__publicField(Two, "AutoCalculateImportedMatrices", Constants.AutoCalculateImportedMatrices);
__publicField(Two, "Instances", Constants.Instances);
__publicField(Two, "uniqueId", Constants.uniqueId);
__publicField(Two, "Anchor", Anchor);
__publicField(Two, "Collection", Collection);
__publicField(Two, "Events", Events);
__publicField(Two, "Group", Group);
__publicField(Two, "Matrix", Matrix2);
__publicField(Two, "Path", Path);
__publicField(Two, "Registry", Registry);
__publicField(Two, "Shape", Shape);
__publicField(Two, "Text", Text);
__publicField(Two, "Vector", Vector);
__publicField(Two, "Gradient", Gradient);
__publicField(Two, "ImageSequence", ImageSequence);
__publicField(Two, "LinearGradient", LinearGradient);
__publicField(Two, "RadialGradient", RadialGradient);
__publicField(Two, "Sprite", Sprite);
__publicField(Two, "Stop", Stop);
__publicField(Two, "Texture", Texture);
__publicField(Two, "ArcSegment", ArcSegment);
__publicField(Two, "Circle", Circle);
__publicField(Two, "Ellipse", Ellipse);
__publicField(Two, "Line", Line);
__publicField(Two, "Points", Points);
__publicField(Two, "Polygon", Polygon);
__publicField(Two, "Rectangle", Rectangle);
__publicField(Two, "RoundedRectangle", RoundedRectangle);
__publicField(Two, "Star", Star);
__publicField(Two, "CanvasRenderer", Renderer);
__publicField(Two, "SVGRenderer", Renderer2);
__publicField(Two, "WebGLRenderer", Renderer3);
__publicField(Two, "Commands", Commands);
__publicField(Two, "Utils", Utils);
function fitToWindow() {
  const wr = document.body.getBoundingClientRect();
  const width = this.width = wr.width;
  const height = this.height = wr.height;
  this.renderer.setSize(width, height, this.ratio);
}
function fitToParent() {
  const parent = this.renderer.domElement.parentElement;
  if (!parent) {
    console.warn("Two.js: Attempting to fit to parent, but no parent found.");
    return;
  }
  const wr = parent.getBoundingClientRect();
  const width = this.width = wr.width;
  const height = this.height = wr.height;
  this.renderer.setSize(width, height, this.ratio);
}
function updateDimensions(width, height) {
  this.width = width;
  this.height = height;
  this.trigger(Events.Types.resize, width, height);
}
var raf = dom.getRequestAnimationFrame();
function loop() {
  for (let i = 0; i < Two.Instances.length; i++) {
    const t = Two.Instances[i];
    if (t.playing) {
      t.update();
    }
  }
  Two.nextFrameID = raf(loop);
}
raf.init = function() {
  loop();
  raf.init = function() {
  };
};
export {
  Two as default
};
