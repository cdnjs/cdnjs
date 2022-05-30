/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.0-beta.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__2818__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4068:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Vector = void 0;

class Vector {
  constructor(x, y) {
    let defX, defY;

    if (y === undefined) {
      if (typeof x === "number") {
        throw new Error("tsParticles - Vector not initialized correctly");
      }

      const coords = x;
      [defX, defY] = [coords.x, coords.y];
    } else {
      [defX, defY] = [x, y];
    }

    this.x = defX;
    this.y = defY;
  }

  static clone(source) {
    return Vector.create(source.x, source.y);
  }

  static create(x, y) {
    return new Vector(x, y);
  }

  static get origin() {
    return Vector.create(0, 0);
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  set angle(angle) {
    this.updateFromAngle(angle, this.length);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set length(length) {
    this.updateFromAngle(this.angle, length);
  }

  add(v) {
    return Vector.create(this.x + v.x, this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    return Vector.create(this.x - v.x, this.y - v.y);
  }

  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    return Vector.create(this.x * n, this.y * n);
  }

  multTo(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    return Vector.create(this.x / n, this.y / n);
  }

  divTo(n) {
    this.x /= n;
    this.y /= n;
  }

  distanceTo(v) {
    return this.sub(v).length;
  }

  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }

  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }

  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }

  copy() {
    return Vector.clone(this);
  }

  setTo(velocity) {
    this.x = velocity.x;
    this.y = velocity.y;
  }

  rotate(angle) {
    return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }

  updateFromAngle(angle, length) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

}

exports.Vector = Vector;

/***/ }),

/***/ 3289:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnimationStatus = void 0;
var AnimationStatus;

(function (AnimationStatus) {
  AnimationStatus[AnimationStatus["increasing"] = 0] = "increasing";
  AnimationStatus[AnimationStatus["decreasing"] = 1] = "decreasing";
})(AnimationStatus = exports.AnimationStatus || (exports.AnimationStatus = {}));

/***/ }),

/***/ 2984:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MoveDirection = void 0;
var MoveDirection;

(function (MoveDirection) {
  MoveDirection["bottom"] = "bottom";
  MoveDirection["bottomLeft"] = "bottom-left";
  MoveDirection["bottomRight"] = "bottom-right";
  MoveDirection["left"] = "left";
  MoveDirection["none"] = "none";
  MoveDirection["right"] = "right";
  MoveDirection["top"] = "top";
  MoveDirection["topLeft"] = "top-left";
  MoveDirection["topRight"] = "top-right";
  MoveDirection["outside"] = "outside";
  MoveDirection["inside"] = "inside";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));

/***/ }),

/***/ 2245:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OutModeDirection = void 0;
var OutModeDirection;

(function (OutModeDirection) {
  OutModeDirection["bottom"] = "bottom";
  OutModeDirection["left"] = "left";
  OutModeDirection["right"] = "right";
  OutModeDirection["top"] = "top";
})(OutModeDirection = exports.OutModeDirection || (exports.OutModeDirection = {}));

/***/ }),

/***/ 196:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RotateDirection = void 0;
var RotateDirection;

(function (RotateDirection) {
  RotateDirection["clockwise"] = "clockwise";
  RotateDirection["counterClockwise"] = "counter-clockwise";
  RotateDirection["random"] = "random";
})(RotateDirection = exports.RotateDirection || (exports.RotateDirection = {}));

/***/ }),

/***/ 4087:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TiltDirection = void 0;
var TiltDirection;

(function (TiltDirection) {
  TiltDirection["clockwise"] = "clockwise";
  TiltDirection["counterClockwise"] = "counter-clockwise";
  TiltDirection["random"] = "random";
})(TiltDirection = exports.TiltDirection || (exports.TiltDirection = {}));

/***/ }),

/***/ 6464:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(2984), exports);

__exportStar(__webpack_require__(196), exports);

__exportStar(__webpack_require__(2245), exports);

__exportStar(__webpack_require__(4087), exports);

/***/ }),

/***/ 5820:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InteractivityDetect = void 0;
var InteractivityDetect;

(function (InteractivityDetect) {
  InteractivityDetect["canvas"] = "canvas";
  InteractivityDetect["parent"] = "parent";
  InteractivityDetect["window"] = "window";
})(InteractivityDetect = exports.InteractivityDetect || (exports.InteractivityDetect = {}));

/***/ }),

/***/ 578:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ClickMode = void 0;
var ClickMode;

(function (ClickMode) {
  ClickMode["attract"] = "attract";
  ClickMode["bubble"] = "bubble";
  ClickMode["push"] = "push";
  ClickMode["remove"] = "remove";
  ClickMode["repulse"] = "repulse";
  ClickMode["pause"] = "pause";
  ClickMode["trail"] = "trail";
})(ClickMode = exports.ClickMode || (exports.ClickMode = {}));

/***/ }),

/***/ 9055:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CollisionMode = void 0;
var CollisionMode;

(function (CollisionMode) {
  CollisionMode["absorb"] = "absorb";
  CollisionMode["bounce"] = "bounce";
  CollisionMode["destroy"] = "destroy";
})(CollisionMode = exports.CollisionMode || (exports.CollisionMode = {}));

/***/ }),

/***/ 6095:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DestroyMode = void 0;
var DestroyMode;

(function (DestroyMode) {
  DestroyMode["none"] = "none";
  DestroyMode["split"] = "split";
})(DestroyMode = exports.DestroyMode || (exports.DestroyMode = {}));

/***/ }),

/***/ 469:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DivMode = void 0;
var DivMode;

(function (DivMode) {
  DivMode["bounce"] = "bounce";
  DivMode["bubble"] = "bubble";
  DivMode["repulse"] = "repulse";
})(DivMode = exports.DivMode || (exports.DivMode = {}));

/***/ }),

/***/ 503:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HoverMode = void 0;
var HoverMode;

(function (HoverMode) {
  HoverMode["attract"] = "attract";
  HoverMode["bounce"] = "bounce";
  HoverMode["bubble"] = "bubble";
  HoverMode["connect"] = "connect";
  HoverMode["grab"] = "grab";
  HoverMode["light"] = "light";
  HoverMode["repulse"] = "repulse";
  HoverMode["slow"] = "slow";
  HoverMode["trail"] = "trail";
})(HoverMode = exports.HoverMode || (exports.HoverMode = {}));

/***/ }),

/***/ 4642:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OutMode = void 0;
var OutMode;

(function (OutMode) {
  OutMode["bounce"] = "bounce";
  OutMode["bounceHorizontal"] = "bounce-horizontal";
  OutMode["bounceVertical"] = "bounce-vertical";
  OutMode["none"] = "none";
  OutMode["out"] = "out";
  OutMode["destroy"] = "destroy";
  OutMode["split"] = "split";
})(OutMode = exports.OutMode || (exports.OutMode = {}));

/***/ }),

/***/ 857:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ResponsiveMode = void 0;
var ResponsiveMode;

(function (ResponsiveMode) {
  ResponsiveMode["screen"] = "screen";
  ResponsiveMode["canvas"] = "canvas";
})(ResponsiveMode = exports.ResponsiveMode || (exports.ResponsiveMode = {}));

/***/ }),

/***/ 6674:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RollMode = void 0;
var RollMode;

(function (RollMode) {
  RollMode["both"] = "both";
  RollMode["horizontal"] = "horizontal";
  RollMode["vertical"] = "vertical";
})(RollMode = exports.RollMode || (exports.RollMode = {}));

/***/ }),

/***/ 7403:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SizeMode = void 0;
var SizeMode;

(function (SizeMode) {
  SizeMode["precise"] = "precise";
  SizeMode["percent"] = "percent";
})(SizeMode = exports.SizeMode || (exports.SizeMode = {}));

/***/ }),

/***/ 5305:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ThemeMode = void 0;
var ThemeMode;

(function (ThemeMode) {
  ThemeMode["any"] = "any";
  ThemeMode["dark"] = "dark";
  ThemeMode["light"] = "light";
})(ThemeMode = exports.ThemeMode || (exports.ThemeMode = {}));

/***/ }),

/***/ 5826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(578), exports);

__exportStar(__webpack_require__(6095), exports);

__exportStar(__webpack_require__(469), exports);

__exportStar(__webpack_require__(503), exports);

__exportStar(__webpack_require__(9055), exports);

__exportStar(__webpack_require__(4642), exports);

__exportStar(__webpack_require__(6674), exports);

__exportStar(__webpack_require__(7403), exports);

__exportStar(__webpack_require__(5305), exports);

__exportStar(__webpack_require__(857), exports);

/***/ }),

/***/ 399:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AlterType = void 0;
var AlterType;

(function (AlterType) {
  AlterType["darken"] = "darken";
  AlterType["enlighten"] = "enlighten";
})(AlterType = exports.AlterType || (exports.AlterType = {}));

/***/ }),

/***/ 8834:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DestroyType = void 0;
var DestroyType;

(function (DestroyType) {
  DestroyType["none"] = "none";
  DestroyType["max"] = "max";
  DestroyType["min"] = "min";
})(DestroyType = exports.DestroyType || (exports.DestroyType = {}));

/***/ }),

/***/ 8282:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DivType = void 0;
var DivType;

(function (DivType) {
  DivType["circle"] = "circle";
  DivType["rectangle"] = "rectangle";
})(DivType = exports.DivType || (exports.DivType = {}));

/***/ }),

/***/ 7990:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EasingType = void 0;
var EasingType;

(function (EasingType) {
  EasingType["easeOutBack"] = "ease-out-back";
  EasingType["easeOutCirc"] = "ease-out-circ";
  EasingType["easeOutCubic"] = "ease-out-cubic";
  EasingType["easeOutQuad"] = "ease-out-quad";
  EasingType["easeOutQuart"] = "ease-out-quart";
  EasingType["easeOutQuint"] = "ease-out-quint";
  EasingType["easeOutExpo"] = "ease-out-expo";
  EasingType["easeOutSine"] = "ease-out-sine";
})(EasingType = exports.EasingType || (exports.EasingType = {}));

/***/ }),

/***/ 231:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventType = void 0;
var EventType;

(function (EventType) {
  EventType["containerInit"] = "containerInit";
  EventType["particlesSetup"] = "particlesSetup";
  EventType["containerStarted"] = "containerStarted";
  EventType["containerStopped"] = "containerStopped";
  EventType["containerDestroyed"] = "containerDestroyed";
  EventType["containerPaused"] = "containerPaused";
  EventType["containerPlay"] = "containerPlay";
  EventType["containerBuilt"] = "containerBuilt";
  EventType["particleAdded"] = "particleAdded";
  EventType["particleRemoved"] = "particleRemoved";
})(EventType = exports.EventType || (exports.EventType = {}));

/***/ }),

/***/ 7251:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GradientType = void 0;
var GradientType;

(function (GradientType) {
  GradientType["linear"] = "linear";
  GradientType["radial"] = "radial";
  GradientType["random"] = "random";
})(GradientType = exports.GradientType || (exports.GradientType = {}));

/***/ }),

/***/ 2075:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InteractorType = void 0;
var InteractorType;

(function (InteractorType) {
  InteractorType[InteractorType["External"] = 0] = "External";
  InteractorType[InteractorType["Particles"] = 1] = "Particles";
})(InteractorType = exports.InteractorType || (exports.InteractorType = {}));

/***/ }),

/***/ 4401:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OrbitType = void 0;
var OrbitType;

(function (OrbitType) {
  OrbitType["front"] = "front";
  OrbitType["back"] = "back";
})(OrbitType = exports.OrbitType || (exports.OrbitType = {}));

/***/ }),

/***/ 1087:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticleOutType = void 0;
var ParticleOutType;

(function (ParticleOutType) {
  ParticleOutType["normal"] = "normal";
  ParticleOutType["inside"] = "inside";
  ParticleOutType["outside"] = "outside";
})(ParticleOutType = exports.ParticleOutType || (exports.ParticleOutType = {}));

/***/ }),

/***/ 4591:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ShapeType = void 0;
var ShapeType;

(function (ShapeType) {
  ShapeType["char"] = "char";
  ShapeType["character"] = "character";
  ShapeType["circle"] = "circle";
  ShapeType["edge"] = "edge";
  ShapeType["image"] = "image";
  ShapeType["images"] = "images";
  ShapeType["line"] = "line";
  ShapeType["polygon"] = "polygon";
  ShapeType["square"] = "square";
  ShapeType["star"] = "star";
  ShapeType["triangle"] = "triangle";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));

/***/ }),

/***/ 1359:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StartValueType = void 0;
var StartValueType;

(function (StartValueType) {
  StartValueType["max"] = "max";
  StartValueType["min"] = "min";
  StartValueType["random"] = "random";
})(StartValueType = exports.StartValueType || (exports.StartValueType = {}));

/***/ }),

/***/ 3623:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(399), exports);

__exportStar(__webpack_require__(8834), exports);

__exportStar(__webpack_require__(231), exports);

__exportStar(__webpack_require__(7251), exports);

__exportStar(__webpack_require__(2075), exports);

__exportStar(__webpack_require__(4591), exports);

__exportStar(__webpack_require__(1359), exports);

__exportStar(__webpack_require__(8282), exports);

__exportStar(__webpack_require__(7990), exports);

__exportStar(__webpack_require__(4401), exports);

__exportStar(__webpack_require__(1087), exports);

/***/ }),

/***/ 8678:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(6464), exports);

__exportStar(__webpack_require__(5826), exports);

__exportStar(__webpack_require__(3289), exports);

__exportStar(__webpack_require__(3623), exports);

__exportStar(__webpack_require__(5820), exports);

/***/ }),

/***/ 9952:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.R = void 0;

const OptionsColor_1 = __webpack_require__(9239);

const HslAnimation_1 = __webpack_require__(4098);

class AnimatableColor extends OptionsColor_1.OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation_1.HslAnimation();
  }

  static create(source, data) {
    const color = new AnimatableColor();
    color.load(source);

    if (data !== undefined) {
      if (typeof data === "string" || data instanceof Array) {
        color.load({
          value: data
        });
      } else {
        color.load(data);
      }
    }

    return color;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    const colorAnimation = data.animation;

    if (colorAnimation !== undefined) {
      if (colorAnimation.enable !== undefined) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }

}

exports.R = AnimatableColor;

/***/ }),

/***/ 8198:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ColorAnimation = void 0;

const Utils_1 = __webpack_require__(6617);

class ColorAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.offset = 0;
    this.speed = 1;
    this.sync = true;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.offset !== undefined) {
      this.offset = (0, Utils_1.setRangeValue)(data.offset);
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.ColorAnimation = ColorAnimation;

/***/ }),

/***/ 4098:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HslAnimation = void 0;

const ColorAnimation_1 = __webpack_require__(8198);

class HslAnimation {
  constructor() {
    this.h = new ColorAnimation_1.ColorAnimation();
    this.s = new ColorAnimation_1.ColorAnimation();
    this.l = new ColorAnimation_1.ColorAnimation();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }

}

exports.HslAnimation = HslAnimation;

/***/ }),

/***/ 9239:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionsColor = void 0;

class OptionsColor {
  constructor() {
    this.value = "#fff";
  }

  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);

    if (data !== undefined) {
      if (typeof data === "string" || data instanceof Array) {
        color.load({
          value: data
        });
      } else {
        color.load(data);
      }
    }

    return color;
  }

  load(data) {
    if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
      return;
    }

    this.value = data.value;
  }

}

exports.OptionsColor = OptionsColor;

/***/ }),

/***/ 5766:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.alterHsl = exports.drawEllipse = exports.drawParticlePlugin = exports.drawPlugin = exports.drawShapeAfterEffect = exports.drawShape = exports.drawParticle = exports.drawGrabLine = exports.gradient = exports.drawConnectLine = exports.clear = exports.paintBase = exports.drawTriangle = exports.drawLine = void 0;

const ColorUtils_1 = __webpack_require__(1642);

const Enums_1 = __webpack_require__(8678);

function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}

exports.drawLine = drawLine;

function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}

exports.drawTriangle = drawTriangle;

function paintBase(context, dimension, baseColor) {
  context.save();
  context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
  context.restore();
}

exports.paintBase = paintBase;

function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}

exports.clear = clear;

function drawConnectLine(context, width, lineStyle, begin, end) {
  context.save();
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
  context.restore();
}

exports.drawConnectLine = drawConnectLine;

function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
  const color1 = p1.getFillColor();
  const color2 = p2.getFillColor();

  if (!color1 || !color2) {
    return;
  }

  const sourcePos = p1.getPosition();
  const destPos = p2.getPosition();
  const midRgb = (0, ColorUtils_1.colorMix)(color1, color2, p1.getRadius(), p2.getRadius());
  const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, (0, ColorUtils_1.getStyleFromHsl)(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, (0, ColorUtils_1.getStyleFromRgb)(midRgb, opacity));
  grad.addColorStop(1, (0, ColorUtils_1.getStyleFromHsl)(color2, opacity));
  return grad;
}

exports.gradient = gradient;

function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  context.save();
  drawLine(context, begin, end);
  context.strokeStyle = (0, ColorUtils_1.getStyleFromRgb)(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
  context.restore();
}

exports.drawGrabLine = drawGrabLine;

function drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow, gradient) {
  var _a, _b, _c, _d, _e, _f;

  const pos = particle.getPosition();
  const tiltOptions = particle.options.tilt;
  const rollOptions = particle.options.roll;
  context.save();

  if (tiltOptions.enable || rollOptions.enable) {
    const roll = rollOptions.enable && particle.roll;
    const tilt = tiltOptions.enable && particle.tilt;
    const rollHorizontal = roll && (rollOptions.mode === Enums_1.RollMode.horizontal || rollOptions.mode === Enums_1.RollMode.both);
    const rollVertical = roll && (rollOptions.mode === Enums_1.RollMode.vertical || rollOptions.mode === Enums_1.RollMode.both);
    context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  context.beginPath();
  const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);

  if (angle !== 0) {
    context.rotate(angle);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  const shadowColor = particle.shadowColor;

  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = (0, ColorUtils_1.getStyleFromRgb)(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }

  if (gradient) {
    const gradientAngle = gradient.angle.value;
    const fillGradient = gradient.type === Enums_1.GradientType.radial ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);

    for (const color of gradient.colors) {
      fillGradient.addColorStop(color.stop, (0, ColorUtils_1.getStyleFromHsl)({
        h: color.value.h.value,
        s: color.value.s.value,
        l: color.value.l.value
      }, (_d = (_c = color.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : opacity));
    }

    context.fillStyle = fillGradient;
  } else {
    if (fillColorValue) {
      context.fillStyle = fillColorValue;
    }
  }

  const stroke = particle.stroke;
  context.lineWidth = (_e = particle.strokeWidth) !== null && _e !== void 0 ? _e : 0;

  if (strokeColorValue) {
    context.strokeStyle = strokeColorValue;
  }

  drawShape(container, context, particle, radius, opacity, delta);

  if (((_f = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _f !== void 0 ? _f : 0) > 0) {
    context.stroke();
  }

  if (particle.close) {
    context.closePath();
  }

  if (particle.fill) {
    context.fill();
  }

  context.restore();
  context.save();

  if (tiltOptions.enable && particle.tilt) {
    context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  if (angle !== 0) {
    context.rotate(angle);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.restore();
}

exports.drawParticle = drawParticle;

function drawShape(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }

  const drawer = container.drawers.get(particle.shape);

  if (!drawer) {
    return;
  }

  drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

exports.drawShape = drawShape;

function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }

  const drawer = container.drawers.get(particle.shape);

  if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
    return;
  }

  drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

exports.drawShapeAfterEffect = drawShapeAfterEffect;

function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }

  context.save();
  plugin.draw(context, delta);
  context.restore();
}

exports.drawPlugin = drawPlugin;

function drawParticlePlugin(context, plugin, particle, delta) {
  if (plugin.drawParticle !== undefined) {
    context.save();
    plugin.drawParticle(context, particle, delta);
    context.restore();
  }
}

exports.drawParticlePlugin = drawParticlePlugin;

function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
  const pos = particle.getPosition();

  if (fillColorValue) {
    context.strokeStyle = (0, ColorUtils_1.getStyleFromHsl)(fillColorValue, opacity);
  }

  if (width === 0) {
    return;
  }

  context.lineWidth = width;
  const rotationRadian = rotation * Math.PI / 180;
  context.beginPath();
  context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
  context.stroke();
}

exports.drawEllipse = drawEllipse;

function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === Enums_1.AlterType.darken ? -1 : 1) * value
  };
}

exports.alterHsl = alterHsl;

/***/ }),

/***/ 4410:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Circle = void 0;

const Range_1 = __webpack_require__(5607);

const NumberUtils_1 = __webpack_require__(5415);

class Circle extends Range_1.Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }

  contains(point) {
    return (0, NumberUtils_1.getDistance)(point, this.position) <= this.radius;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const pos1 = this.position;
    const pos2 = range.position;
    const xDist = Math.abs(pos2.x - pos1.x);
    const yDist = Math.abs(pos2.y - pos1.y);
    const r = this.radius;

    if (circle.radius !== undefined) {
      const rSum = r + circle.radius;
      const dist = Math.sqrt(xDist * xDist + yDist + yDist);
      return rSum > dist;
    } else if (rect.size !== undefined) {
      const w = rect.size.width;
      const h = rect.size.height;
      const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

      if (xDist > r + w || yDist > r + h) {
        return false;
      }

      if (xDist <= w || yDist <= h) {
        return true;
      }

      return edges <= r * r;
    }

    return false;
  }

}

exports.Circle = Circle;

/***/ }),

/***/ 4119:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CircleWarp = void 0;

const Rectangle_1 = __webpack_require__(5898);

const Circle_1 = __webpack_require__(4410);

class CircleWarp extends Circle_1.Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      height: canvasSize.height,
      width: canvasSize.width
    };
  }

  contains(point) {
    if (super.contains(point)) {
      return true;
    }

    const posNE = {
      x: point.x - this.canvasSize.width,
      y: point.y
    };

    if (super.contains(posNE)) {
      return true;
    }

    const posSE = {
      x: point.x - this.canvasSize.width,
      y: point.y - this.canvasSize.height
    };

    if (super.contains(posSE)) {
      return true;
    }

    const posSW = {
      x: point.x,
      y: point.y - this.canvasSize.height
    };
    return super.contains(posSW);
  }

  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }

    const rect = range;
    const circle = range;
    const newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };

    if (circle.radius !== undefined) {
      const biggerCircle = new Circle_1.Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== undefined) {
      const rectSW = new Rectangle_1.Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }

    return false;
  }

}

exports.CircleWarp = CircleWarp;

/***/ }),

/***/ 1642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getHslAnimationFromHsl = exports.getHslFromAnimation = exports.getLinkRandomColor = exports.getLinkColor = exports.colorMix = exports.getStyleFromHsv = exports.getStyleFromHsl = exports.getStyleFromRgb = exports.getRandomRgbColor = exports.rgbaToHsva = exports.rgbToHsv = exports.hsvaToRgba = exports.hsvToRgb = exports.hsvaToHsla = exports.hsvToHsl = exports.hslaToHsva = exports.hslToHsv = exports.hslaToRgba = exports.hslToRgb = exports.stringToRgb = exports.stringToAlpha = exports.rgbToHsl = exports.colorToHsl = exports.colorToRgb = void 0;

const Utils_1 = __webpack_require__(772);

const Constants_1 = __webpack_require__(9726);

const NumberUtils_1 = __webpack_require__(5415);

const Enums_1 = __webpack_require__(8678);

function hue2rgb(p, q, t) {
  let tCalc = t;

  if (tCalc < 0) {
    tCalc += 1;
  }

  if (tCalc > 1) {
    tCalc -= 1;
  }

  if (tCalc < 1 / 6) {
    return p + (q - p) * 6 * tCalc;
  }

  if (tCalc < 1 / 2) {
    return q;
  }

  if (tCalc < 2 / 3) {
    return p + (q - p) * (2 / 3 - tCalc) * 6;
  }

  return p;
}

function stringToRgba(input) {
  if (input.startsWith("rgb")) {
    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : undefined;
  } else if (input.startsWith("hsl")) {
    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : undefined;
  } else if (input.startsWith("hsv")) {
    const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hsvaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      s: parseInt(result[2], 10),
      v: parseInt(result[3], 10)
    }) : undefined;
  } else {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== undefined ? a + a : "");
    });
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const result = regex.exec(hexFixed);
    return result ? {
      a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
      b: parseInt(result[3], 16),
      g: parseInt(result[2], 16),
      r: parseInt(result[1], 16)
    } : undefined;
  }
}

function colorToRgb(input, index, useIndex = true) {
  var _a, _b, _c;

  if (input === undefined) {
    return;
  }

  const color = typeof input === "string" ? {
    value: input
  } : input;
  let res;

  if (typeof color.value === "string") {
    if (color.value === Constants_1.randomColorValue) {
      res = getRandomRgbColor();
    } else {
      res = stringToRgb(color.value);
    }
  } else {
    if (color.value instanceof Array) {
      const colorSelected = (0, Utils_1.itemFromArray)(color.value, index, useIndex);
      res = colorToRgb({
        value: colorSelected
      });
    } else {
      const colorValue = color.value;
      const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

      if (rgbColor.r !== undefined) {
        res = rgbColor;
      } else {
        const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;

        if (hslColor.h !== undefined && hslColor.l !== undefined) {
          res = hslToRgb(hslColor);
        } else {
          const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;

          if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
            res = hsvToRgb(hsvColor);
          }
        }
      }
    }
  }

  return res;
}

exports.colorToRgb = colorToRgb;

function colorToHsl(color, index, useIndex = true) {
  const rgb = colorToRgb(color, index, useIndex);
  return rgb !== undefined ? rgbToHsl(rgb) : undefined;
}

exports.colorToHsl = colorToHsl;

function rgbToHsl(color) {
  const r1 = color.r / 255;
  const g1 = color.g / 255;
  const b1 = color.b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const res = {
    h: 0,
    l: (max + min) / 2,
    s: 0
  };

  if (max != min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min);
  }

  res.l *= 100;
  res.s *= 100;
  res.h *= 60;

  if (res.h < 0) {
    res.h += 360;
  }

  return res;
}

exports.rgbToHsl = rgbToHsl;

function stringToAlpha(input) {
  var _a;

  return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}

exports.stringToAlpha = stringToAlpha;

function stringToRgb(input) {
  return stringToRgba(input);
}

exports.stringToRgb = stringToRgb;

function hslToRgb(hsl) {
  const result = {
    b: 0,
    g: 0,
    r: 0
  };
  const hslPercent = {
    h: hsl.h / 360,
    l: hsl.l / 100,
    s: hsl.s / 100
  };

  if (hslPercent.s === 0) {
    result.b = hslPercent.l;
    result.g = hslPercent.l;
    result.r = hslPercent.l;
  } else {
    const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
    const p = 2 * hslPercent.l - q;
    result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
    result.g = hue2rgb(p, q, hslPercent.h);
    result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
  }

  result.r = Math.floor(result.r * 255);
  result.g = Math.floor(result.g * 255);
  result.b = Math.floor(result.b * 255);
  return result;
}

exports.hslToRgb = hslToRgb;

function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}

exports.hslaToRgba = hslaToRgba;

function hslToHsv(hsl) {
  const l = hsl.l / 100,
        sl = hsl.s / 100;
  const v = l + sl * Math.min(l, 1 - l),
        sv = !v ? 0 : 2 * (1 - l / v);
  return {
    h: hsl.h,
    s: sv * 100,
    v: v * 100
  };
}

exports.hslToHsv = hslToHsv;

function hslaToHsva(hsla) {
  const hsvResult = hslToHsv(hsla);
  return {
    a: hsla.a,
    h: hsvResult.h,
    s: hsvResult.s,
    v: hsvResult.v
  };
}

exports.hslaToHsva = hslaToHsva;

function hsvToHsl(hsv) {
  const v = hsv.v / 100,
        sv = hsv.s / 100;
  const l = v * (1 - sv / 2),
        sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h: hsv.h,
    l: l * 100,
    s: sl * 100
  };
}

exports.hsvToHsl = hsvToHsl;

function hsvaToHsla(hsva) {
  const hslResult = hsvToHsl(hsva);
  return {
    a: hsva.a,
    h: hslResult.h,
    l: hslResult.l,
    s: hslResult.s
  };
}

exports.hsvaToHsla = hsvaToHsla;

function hsvToRgb(hsv) {
  const result = {
    b: 0,
    g: 0,
    r: 0
  };
  const hsvPercent = {
    h: hsv.h / 60,
    s: hsv.s / 100,
    v: hsv.v / 100
  };
  const c = hsvPercent.v * hsvPercent.s,
        x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
  let tempRgb;

  if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
    tempRgb = {
      r: c,
      g: x,
      b: 0
    };
  } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
    tempRgb = {
      r: x,
      g: c,
      b: 0
    };
  } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
    tempRgb = {
      r: 0,
      g: c,
      b: x
    };
  } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
    tempRgb = {
      r: 0,
      g: x,
      b: c
    };
  } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
    tempRgb = {
      r: x,
      g: 0,
      b: c
    };
  } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
    tempRgb = {
      r: c,
      g: 0,
      b: x
    };
  }

  if (tempRgb) {
    const m = hsvPercent.v - c;
    result.r = Math.floor((tempRgb.r + m) * 255);
    result.g = Math.floor((tempRgb.g + m) * 255);
    result.b = Math.floor((tempRgb.b + m) * 255);
  }

  return result;
}

exports.hsvToRgb = hsvToRgb;

function hsvaToRgba(hsva) {
  const rgbResult = hsvToRgb(hsva);
  return {
    a: hsva.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}

exports.hsvaToRgba = hsvaToRgba;

function rgbToHsv(rgb) {
  const rgbPercent = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  },
        xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        v = xMax,
        c = xMax - xMin;
  let h = 0;

  if (v === rgbPercent.r) {
    h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
  } else if (v === rgbPercent.g) {
    h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
  } else if (v === rgbPercent.b) {
    h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
  }

  const s = !v ? 0 : c / v;
  return {
    h,
    s: s * 100,
    v: v * 100
  };
}

exports.rgbToHsv = rgbToHsv;

function rgbaToHsva(rgba) {
  const hsvResult = rgbToHsv(rgba);
  return {
    a: rgba.a,
    h: hsvResult.h,
    s: hsvResult.s,
    v: hsvResult.v
  };
}

exports.rgbaToHsva = rgbaToHsva;

function getRandomRgbColor(min) {
  const fixedMin = min !== null && min !== void 0 ? min : 0;
  return {
    b: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
    g: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
    r: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256)))
  };
}

exports.getRandomRgbColor = getRandomRgbColor;

function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}

exports.getStyleFromRgb = getStyleFromRgb;

function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}

exports.getStyleFromHsl = getStyleFromHsl;

function getStyleFromHsv(color, opacity) {
  return getStyleFromHsl(hsvToHsl(color), opacity);
}

exports.getStyleFromHsv = getStyleFromHsv;

function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1;
  let rgb2 = color2;

  if (rgb1.r === undefined) {
    rgb1 = hslToRgb(color1);
  }

  if (rgb2.r === undefined) {
    rgb2 = hslToRgb(color2);
  }

  return {
    b: (0, NumberUtils_1.mix)(rgb1.b, rgb2.b, size1, size2),
    g: (0, NumberUtils_1.mix)(rgb1.g, rgb2.g, size1, size2),
    r: (0, NumberUtils_1.mix)(rgb1.r, rgb2.r, size1, size2)
  };
}

exports.colorMix = colorMix;

function getLinkColor(p1, p2, linkColor) {
  var _a, _b;

  if (linkColor === Constants_1.randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === "mid") {
    const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor();
    const destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();

    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;

      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}

exports.getLinkColor = getLinkColor;

function getLinkRandomColor(optColor, blink, consent) {
  const color = typeof optColor === "string" ? optColor : optColor.value;

  if (color === Constants_1.randomColorValue) {
    if (consent) {
      return colorToRgb({
        value: color
      });
    } else if (blink) {
      return Constants_1.randomColorValue;
    } else {
      return Constants_1.midColorValue;
    }
  } else {
    return colorToRgb({
      value: color
    });
  }
}

exports.getLinkRandomColor = getLinkRandomColor;

function getHslFromAnimation(animation) {
  return animation !== undefined ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : undefined;
}

exports.getHslFromAnimation = getHslFromAnimation;

function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };

  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }

  return resColor;
}

exports.getHslAnimationFromHsl = getHslAnimationFromHsl;

function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;

  if (colorValue.enable) {
    colorValue.velocity = colorAnimation.speed / 100 * reduceFactor;

    if (colorAnimation.sync) {
      return;
    }

    colorValue.status = Enums_1.AnimationStatus.increasing;
    colorValue.velocity *= Math.random();

    if (colorValue.value) {
      colorValue.value *= Math.random();
    }
  } else {
    colorValue.velocity = 0;
  }
}

/***/ }),

/***/ 9726:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.noPolygonFound = exports.noPolygonDataLoaded = exports.visibilityChangeEvent = exports.resizeEvent = exports.touchCancelEvent = exports.mouseOutEvent = exports.mouseLeaveEvent = exports.touchMoveEvent = exports.touchStartEvent = exports.mouseMoveEvent = exports.mouseUpEvent = exports.mouseDownEvent = exports.touchEndEvent = exports.midColorValue = exports.randomColorValue = exports.canvasClass = void 0;
exports.canvasClass = "tsparticles-canvas-el";
exports.randomColorValue = "random";
exports.midColorValue = "mid";
exports.touchEndEvent = "touchend";
exports.mouseDownEvent = "mousedown";
exports.mouseUpEvent = "mouseup";
exports.mouseMoveEvent = "mousemove";
exports.touchStartEvent = "touchstart";
exports.touchMoveEvent = "touchmove";
exports.mouseLeaveEvent = "mouseleave";
exports.mouseOutEvent = "mouseout";
exports.touchCancelEvent = "touchcancel";
exports.resizeEvent = "resize";
exports.visibilityChangeEvent = "visibilitychange";
exports.noPolygonDataLoaded = "No polygon data loaded.";
exports.noPolygonFound = "No polygon found, you need to specify SVG url in config.";

/***/ }),

/***/ 7515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventListeners = void 0;

const Enums_1 = __webpack_require__(8678);

const Constants_1 = __webpack_require__(9726);

const Utils_1 = __webpack_require__(772);

function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = {
      passive: true
    };

    if (typeof options === "boolean") {
      addOptions.capture = options;
    } else if (options !== undefined) {
      addOptions = options;
    }

    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}

class EventListeners {
  constructor(container) {
    this.container = container;
    this.canPush = true;

    this.mouseMoveHandler = e => this.mouseTouchMove(e);

    this.touchStartHandler = e => this.mouseTouchMove(e);

    this.touchMoveHandler = e => this.mouseTouchMove(e);

    this.touchEndHandler = () => this.mouseTouchFinish();

    this.mouseLeaveHandler = () => this.mouseTouchFinish();

    this.touchCancelHandler = () => this.mouseTouchFinish();

    this.touchEndClickHandler = e => this.mouseTouchClick(e);

    this.mouseUpHandler = e => this.mouseTouchClick(e);

    this.mouseDownHandler = () => this.mouseDown();

    this.visibilityChangeHandler = () => this.handleVisibilityChange();

    this.themeChangeHandler = e => this.handleThemeChange(e);

    this.oldThemeChangeHandler = e => this.handleThemeChange(e);

    this.resizeHandler = () => this.handleWindowResize();
  }

  addListeners() {
    this.manageListeners(true);
  }

  removeListeners() {
    this.manageListeners(false);
  }

  manageListeners(add) {
    var _a;

    const container = this.container;
    const options = container.actualOptions;
    const detectType = options.interactivity.detectsOn;
    let mouseLeaveTmpEvent = Constants_1.mouseLeaveEvent;

    if (detectType === Enums_1.InteractivityDetect.window) {
      container.interactivity.element = window;
      mouseLeaveTmpEvent = Constants_1.mouseOutEvent;
    } else if (detectType === Enums_1.InteractivityDetect.parent && container.canvas.element) {
      const canvasEl = container.canvas.element;
      container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
    } else {
      container.interactivity.element = container.canvas.element;
    }

    const mediaMatch = !(0, Utils_1.isSsr)() && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");

    if (mediaMatch) {
      if (mediaMatch.addEventListener !== undefined) {
        manageListener(mediaMatch, "change", this.themeChangeHandler, add);
      } else if (mediaMatch.addListener !== undefined) {
        if (add) {
          mediaMatch.addListener(this.oldThemeChangeHandler);
        } else {
          mediaMatch.removeListener(this.oldThemeChangeHandler);
        }
      }
    }

    const interactivityEl = container.interactivity.element;

    if (!interactivityEl) {
      return;
    }

    const html = interactivityEl;

    if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
      manageListener(interactivityEl, Constants_1.mouseMoveEvent, this.mouseMoveHandler, add);
      manageListener(interactivityEl, Constants_1.touchStartEvent, this.touchStartHandler, add);
      manageListener(interactivityEl, Constants_1.touchMoveEvent, this.touchMoveHandler, add);

      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, Constants_1.touchEndEvent, this.touchEndHandler, add);
      } else {
        manageListener(interactivityEl, Constants_1.touchEndEvent, this.touchEndClickHandler, add);
        manageListener(interactivityEl, Constants_1.mouseUpEvent, this.mouseUpHandler, add);
        manageListener(interactivityEl, Constants_1.mouseDownEvent, this.mouseDownHandler, add);
      }

      manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);
      manageListener(interactivityEl, Constants_1.touchCancelEvent, this.touchCancelHandler, add);
    }

    if (container.canvas.element) {
      container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
    }

    if (options.interactivity.events.resize) {
      if (typeof ResizeObserver !== "undefined") {
        if (this.resizeObserver && !add) {
          if (container.canvas.element) {
            this.resizeObserver.unobserve(container.canvas.element);
          }

          this.resizeObserver.disconnect();
          delete this.resizeObserver;
        } else if (!this.resizeObserver && add && container.canvas.element) {
          this.resizeObserver = new ResizeObserver(entries => {
            const entry = entries.find(e => e.target === container.canvas.element);

            if (!entry) {
              return;
            }

            this.handleWindowResize();
          });
          this.resizeObserver.observe(container.canvas.element);
        }
      } else {
        manageListener(window, Constants_1.resizeEvent, this.resizeHandler, add);
      }
    }

    if (document) {
      manageListener(document, Constants_1.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
    }
  }

  handleWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      delete this.resizeTimeout;
    }

    this.resizeTimeout = setTimeout(() => {
      var _a;

      return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }, 500);
  }

  handleVisibilityChange() {
    const container = this.container;
    const options = container.actualOptions;
    this.mouseTouchFinish();

    if (!options.pauseOnBlur) {
      return;
    }

    if (document === null || document === void 0 ? void 0 : document.hidden) {
      container.pageHidden = true;
      container.pause();
    } else {
      container.pageHidden = false;

      if (container.getAnimationStatus()) {
        container.play(true);
      } else {
        container.draw(true);
      }
    }
  }

  mouseDown() {
    const interactivity = this.container.interactivity;

    if (interactivity) {
      const mouse = interactivity.mouse;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    }
  }

  mouseTouchMove(e) {
    var _a, _b, _c, _d, _e, _f, _g;

    const container = this.container;
    const options = container.actualOptions;

    if (((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element) === undefined) {
      return;
    }

    container.interactivity.mouse.inside = true;
    let pos;
    const canvas = container.canvas.element;

    if (e.type.startsWith("mouse")) {
      this.canPush = true;
      const mouseEvent = e;

      if (container.interactivity.element === window) {
        if (canvas) {
          const clientRect = canvas.getBoundingClientRect();
          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top
          };
        }
      } else if (options.interactivity.detectsOn === Enums_1.InteractivityDetect.parent) {
        const source = mouseEvent.target;
        const target = mouseEvent.currentTarget;
        const canvasEl = container.canvas.element;

        if (source && target && canvasEl) {
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
            y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
          };
        } else {
          pos = {
            x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
            y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY
          };
        }
      } else {
        if (mouseEvent.target === container.canvas.element) {
          pos = {
            x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
            y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY
          };
        }
      }
    } else {
      this.canPush = e.type !== "touchmove";
      const touchEvent = e;
      const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
      const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
      pos = {
        x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
        y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0)
      };
    }

    const pxRatio = container.retina.pixelRatio;

    if (pos) {
      pos.x *= pxRatio;
      pos.y *= pxRatio;
    }

    container.interactivity.mouse.position = pos;
    container.interactivity.status = Constants_1.mouseMoveEvent;
  }

  mouseTouchFinish() {
    const interactivity = this.container.interactivity;

    if (interactivity === undefined) {
      return;
    }

    const mouse = interactivity.mouse;
    delete mouse.position;
    delete mouse.clickPosition;
    delete mouse.downPosition;
    interactivity.status = Constants_1.mouseLeaveEvent;
    mouse.inside = false;
    mouse.clicking = false;
  }

  mouseTouchClick(e) {
    const container = this.container;
    const options = container.actualOptions;
    const mouse = container.interactivity.mouse;
    mouse.inside = true;
    let handled = false;
    const mousePosition = mouse.position;

    if (mousePosition === undefined || !options.interactivity.events.onClick.enable) {
      return;
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.clickPositionValid !== undefined) {
        handled = plugin.clickPositionValid(mousePosition);

        if (handled) {
          break;
        }
      }
    }

    if (!handled) {
      this.doMouseTouchClick(e);
    }

    mouse.clicking = false;
  }

  doMouseTouchClick(e) {
    const container = this.container;
    const options = container.actualOptions;

    if (this.canPush) {
      const mousePos = container.interactivity.mouse.position;

      if (mousePos) {
        container.interactivity.mouse.clickPosition = {
          x: mousePos.x,
          y: mousePos.y
        };
      } else {
        return;
      }

      container.interactivity.mouse.clickTime = new Date().getTime();
      const onClick = options.interactivity.events.onClick;

      if (onClick.mode instanceof Array) {
        for (const mode of onClick.mode) {
          this.handleClickMode(mode);
        }
      } else {
        this.handleClickMode(onClick.mode);
      }
    }

    if (e.type === "touchend") {
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }

  handleThemeChange(e) {
    const mediaEvent = e;
    const themeName = mediaEvent.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme;
    const theme = this.container.options.themes.find(theme => theme.name === themeName);

    if (theme && theme.default.auto) {
      this.container.loadTheme(themeName);
    }
  }

  handleClickMode(mode) {
    this.container.handleClickMode(mode);
  }

}

exports.EventListeners = EventListeners;

/***/ }),

/***/ 5415:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.calcEasing = exports.collisionVelocity = exports.getParticleBaseVelocity = exports.getParticleDirectionAngle = exports.getDistance = exports.getDistances = exports.getValue = exports.setRangeValue = exports.getRangeMax = exports.getRangeMin = exports.getRangeValue = exports.randomInRange = exports.mix = exports.clamp = void 0;

const Enums_1 = __webpack_require__(8678);

const Vector_1 = __webpack_require__(4068);

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

exports.clamp = clamp;

function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}

exports.mix = mix;

function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);

  if (max === min) {
    min = 0;
  }

  return Math.random() * (max - min) + min;
}

exports.randomInRange = randomInRange;

function getRangeValue(value) {
  return typeof value === "number" ? value : randomInRange(value);
}

exports.getRangeValue = getRangeValue;

function getRangeMin(value) {
  return typeof value === "number" ? value : value.min;
}

exports.getRangeMin = getRangeMin;

function getRangeMax(value) {
  return typeof value === "number" ? value : value.max;
}

exports.getRangeMax = getRangeMax;

function setRangeValue(source, value) {
  if (source === value || value === undefined && typeof source === "number") {
    return source;
  }

  const min = getRangeMin(source),
        max = getRangeMax(source);
  return value !== undefined ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}

exports.setRangeValue = setRangeValue;

function getValue(options) {
  const random = options.random;
  const {
    enable,
    minimumValue
  } = typeof random === "boolean" ? {
    enable: random,
    minimumValue: 0
  } : random;
  return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}

exports.getValue = getValue;

function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx * dx + dy * dy)
  };
}

exports.getDistances = getDistances;

function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}

exports.getDistance = getDistance;

function getParticleDirectionAngle(direction, position, center) {
  if (typeof direction === "number") {
    return direction * Math.PI / 180;
  } else {
    switch (direction) {
      case Enums_1.MoveDirection.top:
        return -Math.PI / 2;

      case Enums_1.MoveDirection.topRight:
        return -Math.PI / 4;

      case Enums_1.MoveDirection.right:
        return 0;

      case Enums_1.MoveDirection.bottomRight:
        return Math.PI / 4;

      case Enums_1.MoveDirection.bottom:
        return Math.PI / 2;

      case Enums_1.MoveDirection.bottomLeft:
        return 3 * Math.PI / 4;

      case Enums_1.MoveDirection.left:
        return Math.PI;

      case Enums_1.MoveDirection.topLeft:
        return -3 * Math.PI / 4;

      case Enums_1.MoveDirection.inside:
        return Math.atan2(center.y - position.y, center.x - position.x);

      case Enums_1.MoveDirection.outside:
        return Math.atan2(position.y - center.y, position.x - center.x);

      case Enums_1.MoveDirection.none:
      default:
        return Math.random() * Math.PI * 2;
    }
  }
}

exports.getParticleDirectionAngle = getParticleDirectionAngle;

function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector_1.Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}

exports.getParticleBaseVelocity = getParticleBaseVelocity;

function collisionVelocity(v1, v2, m1, m2) {
  return Vector_1.Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}

exports.collisionVelocity = collisionVelocity;

function calcEasing(value, type) {
  switch (type) {
    case Enums_1.EasingType.easeOutQuad:
      return 1 - (1 - value) ** 2;

    case Enums_1.EasingType.easeOutCubic:
      return 1 - (1 - value) ** 3;

    case Enums_1.EasingType.easeOutQuart:
      return 1 - (1 - value) ** 4;

    case Enums_1.EasingType.easeOutQuint:
      return 1 - (1 - value) ** 5;

    case Enums_1.EasingType.easeOutExpo:
      return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);

    case Enums_1.EasingType.easeOutSine:
      return Math.sin(value * Math.PI / 2);

    case Enums_1.EasingType.easeOutBack:
      {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
      }

    case Enums_1.EasingType.easeOutCirc:
      return Math.sqrt(1 - Math.pow(value - 1, 2));

    default:
      return value;
  }
}

exports.calcEasing = calcEasing;

/***/ }),

/***/ 1791:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Plugins = void 0;
const plugins = [];
const interactorsInitializers = new Map();
const updatersInitializers = new Map();
const interactors = new Map();
const updaters = new Map();
const presets = new Map();
const drawers = new Map();
const pathGenerators = new Map();

class Plugins {
  static getPlugin(plugin) {
    return plugins.find(t => t.id === plugin);
  }

  static addPlugin(plugin) {
    if (!Plugins.getPlugin(plugin.id)) {
      plugins.push(plugin);
    }
  }

  static getAvailablePlugins(container) {
    const res = new Map();

    for (const plugin of plugins) {
      if (!plugin.needsPlugin(container.actualOptions)) {
        continue;
      }

      res.set(plugin.id, plugin.getPlugin(container));
    }

    return res;
  }

  static loadOptions(options, sourceOptions) {
    for (const plugin of plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }

  static getPreset(preset) {
    return presets.get(preset);
  }

  static addPreset(presetKey, options, override = false) {
    if (override || !Plugins.getPreset(presetKey)) {
      presets.set(presetKey, options);
    }
  }

  static addShapeDrawer(type, drawer) {
    if (!Plugins.getShapeDrawer(type)) {
      drawers.set(type, drawer);
    }
  }

  static getShapeDrawer(type) {
    return drawers.get(type);
  }

  static getSupportedShapes() {
    return drawers.keys();
  }

  static getPathGenerator(type) {
    return pathGenerators.get(type);
  }

  static addPathGenerator(type, pathGenerator) {
    if (!Plugins.getPathGenerator(type)) {
      pathGenerators.set(type, pathGenerator);
    }
  }

  static getInteractors(container, force = false) {
    let res = interactors.get(container);

    if (!res || force) {
      res = [...interactorsInitializers.values()].map(t => t(container));
      interactors.set(container, res);
    }

    return res;
  }

  static addInteractor(name, initInteractor) {
    interactorsInitializers.set(name, initInteractor);
  }

  static getUpdaters(container, force = false) {
    let res = updaters.get(container);

    if (!res || force) {
      res = [...updatersInitializers.values()].map(t => t(container));
      updaters.set(container, res);
    }

    return res;
  }

  static addParticleUpdater(name, initUpdater) {
    updatersInitializers.set(name, initUpdater);
  }

}

exports.Plugins = Plugins;

/***/ }),

/***/ 974:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Point = void 0;

class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }

}

exports.Point = Point;

/***/ }),

/***/ 1593:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.QuadTree = void 0;

const Rectangle_1 = __webpack_require__(5898);

const Circle_1 = __webpack_require__(4410);

const CircleWarp_1 = __webpack_require__(4119);

const NumberUtils_1 = __webpack_require__(5415);

class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const x = this.rectangle.position.x;
    const y = this.rectangle.position.y;
    const w = this.rectangle.size.width;
    const h = this.rectangle.size.height;
    const capacity = this.capacity;
    this.northEast = new QuadTree(new Rectangle_1.Rectangle(x, y, w / 2, h / 2), capacity);
    this.northWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this.southEast = new QuadTree(new Rectangle_1.Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this.southWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this.divided = true;
  }

  insert(point) {
    var _a, _b, _c, _d, _e;

    if (!this.rectangle.contains(point.position)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (_e = ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
  }

  queryCircle(position, radius) {
    return this.query(new Circle_1.Circle(position.x, position.y, radius));
  }

  queryCircleWarp(position, radius, containerOrSize) {
    const container = containerOrSize;
    const size = containerOrSize;
    return this.query(new CircleWarp_1.CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
  }

  queryRectangle(position, size) {
    return this.query(new Rectangle_1.Rectangle(position.x, position.y, size.width, size.height));
  }

  query(range, found) {
    var _a, _b, _c, _d;

    const res = found !== null && found !== void 0 ? found : [];

    if (!range.intersects(this.rectangle)) {
      return [];
    } else {
      for (const p of this.points) {
        if (!range.contains(p.position) && (0, NumberUtils_1.getDistance)(range.position, p.position) > p.particle.getRadius()) {
          continue;
        }

        res.push(p.particle);
      }

      if (this.divided) {
        (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
        (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
        (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
        (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
      }
    }

    return res;
  }

}

exports.QuadTree = QuadTree;

/***/ }),

/***/ 5607:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Range = void 0;

class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }

}

exports.Range = Range;

/***/ }),

/***/ 5898:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Rectangle = void 0;

const Range_1 = __webpack_require__(5607);

class Rectangle extends Range_1.Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }

  contains(point) {
    const w = this.size.width;
    const h = this.size.height;
    const pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const w = this.size.width;
    const h = this.size.height;
    const pos1 = this.position;
    const pos2 = range.position;

    if (circle.radius !== undefined) {
      return circle.intersects(this);
    } else if (rect.size !== undefined) {
      const size2 = rect.size;
      const w2 = size2.width;
      const h2 = size2.height;
      return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }

    return false;
  }

}

exports.Rectangle = Rectangle;

/***/ }),

/***/ 772:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.rectBounce = exports.circleBounce = exports.circleBounceDataFromParticle = exports.divMode = exports.singleDivModeExecute = exports.divModeExecute = exports.isDivModeEnabled = exports.deepExtend = exports.calculateBounds = exports.areBoundsInside = exports.isPointInside = exports.itemFromArray = exports.arrayRandomIndex = exports.loadFont = exports.isInArray = exports.cancelAnimation = exports.animate = exports.isSsr = void 0;

const Enums_1 = __webpack_require__(8678);

const NumberUtils_1 = __webpack_require__(5415);

const Vector_1 = __webpack_require__(4068);

function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
  const res = {
    bounced: false
  };

  if (pOtherSide.min >= rectOtherSide.min && pOtherSide.min <= rectOtherSide.max && pOtherSide.max >= rectOtherSide.min && pOtherSide.max <= rectOtherSide.max) {
    if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
      res.velocity = velocity * -factor;
      res.bounced = true;
    }
  }

  return res;
}

function checkSelector(element, selectors) {
  if (selectors instanceof Array) {
    for (const selector of selectors) {
      if (element.matches(selector)) {
        return true;
      }
    }

    return false;
  } else {
    return element.matches(selectors);
  }
}

function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}

exports.isSsr = isSsr;

function animate() {
  return isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
}

exports.animate = animate;

function cancelAnimation() {
  return isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
}

exports.cancelAnimation = cancelAnimation;

function isInArray(value, array) {
  return value === array || array instanceof Array && array.indexOf(value) > -1;
}

exports.isInArray = isInArray;

async function loadFont(character) {
  var _a, _b;

  try {
    await document.fonts.load(`${(_a = character.weight) !== null && _a !== void 0 ? _a : "400"} 36px '${(_b = character.font) !== null && _b !== void 0 ? _b : "Verdana"}'`);
  } catch (_c) {}
}

exports.loadFont = loadFont;

function arrayRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

exports.arrayRandomIndex = arrayRandomIndex;

function itemFromArray(array, index, useIndex = true) {
  const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
  return array[fixedIndex];
}

exports.itemFromArray = itemFromArray;

function isPointInside(point, size, offset, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
}

exports.isPointInside = isPointInside;

function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;

  if (!direction || direction === Enums_1.OutModeDirection.bottom) {
    inside = bounds.top < size.height + offset.x;
  }

  if (inside && (!direction || direction === Enums_1.OutModeDirection.left)) {
    inside = bounds.right > offset.x;
  }

  if (inside && (!direction || direction === Enums_1.OutModeDirection.right)) {
    inside = bounds.left < size.width + offset.y;
  }

  if (inside && (!direction || direction === Enums_1.OutModeDirection.top)) {
    inside = bounds.bottom > offset.y;
  }

  return inside;
}

exports.areBoundsInside = areBoundsInside;

function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}

exports.calculateBounds = calculateBounds;

function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === undefined || source === null) {
      continue;
    }

    if (typeof source !== "object") {
      destination = source;
      continue;
    }

    const sourceIsArray = Array.isArray(source);

    if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
      destination = {};
    }

    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }

      const sourceDict = source;
      const value = sourceDict[key];
      const isObject = typeof value === "object";
      const destDict = destination;
      destDict[key] = isObject && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }

  return destination;
}

exports.deepExtend = deepExtend;

function isDivModeEnabled(mode, divs) {
  return divs instanceof Array ? !!divs.find(t => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}

exports.isDivModeEnabled = isDivModeEnabled;

function divModeExecute(mode, divs, callback) {
  if (divs instanceof Array) {
    for (const div of divs) {
      const divMode = div.mode;
      const divEnabled = div.enable;

      if (divEnabled && isInArray(mode, divMode)) {
        singleDivModeExecute(div, callback);
      }
    }
  } else {
    const divMode = divs.mode;
    const divEnabled = divs.enable;

    if (divEnabled && isInArray(mode, divMode)) {
      singleDivModeExecute(divs, callback);
    }
  }
}

exports.divModeExecute = divModeExecute;

function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;

  if (selectors instanceof Array) {
    for (const selector of selectors) {
      callback(selector, div);
    }
  } else {
    callback(selectors, div);
  }
}

exports.singleDivModeExecute = singleDivModeExecute;

function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }

  if (divs instanceof Array) {
    return divs.find(d => checkSelector(element, d.selectors));
  } else if (checkSelector(element, divs.selectors)) {
    return divs;
  }
}

exports.divMode = divMode;

function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector_1.Vector.create((0, NumberUtils_1.getValue)(p.options.bounce.horizontal), (0, NumberUtils_1.getValue)(p.options.bounce.vertical))
  };
}

exports.circleBounceDataFromParticle = circleBounceDataFromParticle;

function circleBounce(p1, p2) {
  const {
    x: xVelocityDiff,
    y: yVelocityDiff
  } = p1.velocity.sub(p2.velocity);
  const [pos1, pos2] = [p1.position, p2.position];
  const {
    dx: xDist,
    dy: yDist
  } = (0, NumberUtils_1.getDistances)(pos2, pos1);

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(yDist, xDist);
    const m1 = p1.mass;
    const m2 = p2.mass;
    const u1 = p1.velocity.rotate(angle);
    const u2 = p2.velocity.rotate(angle);
    const v1 = (0, NumberUtils_1.collisionVelocity)(u1, u2, m1, m2);
    const v2 = (0, NumberUtils_1.collisionVelocity)(u2, u1, m1, m2);
    const vFinal1 = v1.rotate(-angle);
    const vFinal2 = v2.rotate(-angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
  }
}

exports.circleBounce = circleBounce;

function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition();
  const size = particle.getRadius();
  const bounds = calculateBounds(pPos, size);
  const resH = rectSideBounce({
    min: bounds.left,
    max: bounds.right
  }, {
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, particle.velocity.x, (0, NumberUtils_1.getValue)(particle.options.bounce.horizontal));

  if (resH.bounced) {
    if (resH.velocity !== undefined) {
      particle.velocity.x = resH.velocity;
    }

    if (resH.position !== undefined) {
      particle.position.x = resH.position;
    }
  }

  const resV = rectSideBounce({
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: bounds.left,
    max: bounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, particle.velocity.y, (0, NumberUtils_1.getValue)(particle.options.bounce.vertical));

  if (resV.bounced) {
    if (resV.velocity !== undefined) {
      particle.velocity.y = resV.velocity;
    }

    if (resV.position !== undefined) {
      particle.position.y = resV.position;
    }
  }
}

exports.rectBounce = rectBounce;

/***/ }),

/***/ 6617:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(5766), exports);

__exportStar(__webpack_require__(4410), exports);

__exportStar(__webpack_require__(4119), exports);

__exportStar(__webpack_require__(1642), exports);

__exportStar(__webpack_require__(9726), exports);

__exportStar(__webpack_require__(7515), exports);

__exportStar(__webpack_require__(5415), exports);

__exportStar(__webpack_require__(1791), exports);

__exportStar(__webpack_require__(974), exports);

__exportStar(__webpack_require__(1593), exports);

__exportStar(__webpack_require__(5607), exports);

__exportStar(__webpack_require__(5898), exports);

__exportStar(__webpack_require__(772), exports);

/***/ }),

/***/ 2818:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__2818__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadEmittersPlugin": () => (/* binding */ loadEmittersPlugin)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(2818);
;// CONCATENATED MODULE: ./dist/Options/Classes/EmitterSize.js

class EmitterSize {
  constructor() {
    this.mode = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.SizeMode.percent;
    this.height = 0;
    this.width = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.height !== undefined) {
      this.height = data.height;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }
  }

}
;// CONCATENATED MODULE: ./dist/ShapeManager.js
const shapes = new Map();
class ShapeManager {
  static addShape(name, drawer) {
    if (!ShapeManager.getShape(name)) {
      shapes.set(name, drawer);
    }
  }

  static getShape(name) {
    return shapes.get(name);
  }

  static getSupportedShapes() {
    return shapes.keys();
  }

}
;// CONCATENATED MODULE: ./dist/EmitterInstance.js
var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _EmitterInstance_firstSpawn, _EmitterInstance_startParticlesAdded;




class EmitterInstance {
  constructor(emitters, container, emitterOptions, position) {
    var _a, _b, _c, _d, _e, _f;

    var _g;

    this.emitters = emitters;
    this.container = container;

    _EmitterInstance_firstSpawn.set(this, void 0);

    _EmitterInstance_startParticlesAdded.set(this, void 0);

    this.currentDuration = 0;
    this.currentEmitDelay = 0;
    this.currentSpawnDelay = 0;
    this.initialPosition = position;
    this.emitterOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, emitterOptions);
    this.spawnDelay = ((_a = this.emitterOptions.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000 / this.container.retina.reduceFactor;
    this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
    this.name = emitterOptions.name;
    this.shape = ShapeManager.getShape(emitterOptions.shape);
    this.fill = emitterOptions.fill;

    __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, !this.emitterOptions.life.wait, "f");

    __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, false, "f");

    let particlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, this.emitterOptions.particles);
    particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : particlesOptions = {};
    (_c = particlesOptions.move) !== null && _c !== void 0 ? _c : particlesOptions.move = {};
    (_d = (_g = particlesOptions.move).direction) !== null && _d !== void 0 ? _d : _g.direction = this.emitterOptions.direction;

    if (this.emitterOptions.spawnColor !== undefined) {
      this.spawnColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToHsl)(this.emitterOptions.spawnColor);
    }

    this.paused = !this.emitterOptions.autoPlay;
    this.particlesOptions = particlesOptions;
    this.size = (_e = this.emitterOptions.size) !== null && _e !== void 0 ? _e : (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.SizeMode.percent,
        width: 0
      });
      return size;
    })();
    this.lifeCount = (_f = this.emitterOptions.life.count) !== null && _f !== void 0 ? _f : -1;
    this.immortal = this.lifeCount <= 0;
    external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.dispatchEvent("emitterCreated", {
      container,
      data: {
        emitter: this
      }
    });
    this.play();
  }

  externalPlay() {
    this.paused = false;
    this.play();
  }

  externalPause() {
    this.paused = true;
    this.pause();
  }

  play() {
    var _a;

    if (this.paused) {
      return;
    }

    if (this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count) && (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f") || this.currentSpawnDelay >= ((_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0))) {
      if (this.emitDelay === undefined) {
        const delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.emitterOptions.rate.delay);
        this.emitDelay = 1000 * delay / this.container.retina.reduceFactor;
      }

      if (this.lifeCount > 0 || this.immortal) {
        this.prepareToDie();
      }
    }
  }

  pause() {
    if (this.paused) {
      return;
    }

    delete this.emitDelay;
  }

  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(initialPosition, this.container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin) ? initialPosition : this.calcPosition();
  }

  update(delta) {
    var _a, _b, _c;

    if (this.paused) {
      return;
    }

    if (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f")) {
      __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, false, "f");

      this.currentSpawnDelay = (_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0;
      this.currentEmitDelay = (_b = this.emitDelay) !== null && _b !== void 0 ? _b : 0;
    }

    if (!__classPrivateFieldGet(this, _EmitterInstance_startParticlesAdded, "f")) {
      __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, true, "f");

      this.emitParticles(this.emitterOptions.startCount);
    }

    if (this.duration !== undefined) {
      this.currentDuration += delta.value;

      if (this.currentDuration >= this.duration) {
        this.pause();

        if (this.spawnDelay !== undefined) {
          delete this.spawnDelay;
        }

        if (!this.immortal) {
          this.lifeCount--;
        }

        if (this.lifeCount > 0 || this.immortal) {
          this.position = this.calcPosition();
          this.spawnDelay = ((_c = this.emitterOptions.life.delay) !== null && _c !== void 0 ? _c : 0) * 1000 / this.container.retina.reduceFactor;
        } else {
          this.destroy();
        }

        this.currentDuration -= this.duration;
        delete this.duration;
      }
    }

    if (this.spawnDelay !== undefined) {
      this.currentSpawnDelay += delta.value;

      if (this.currentSpawnDelay >= this.spawnDelay) {
        external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.dispatchEvent("emitterPlay", {
          container: this.container
        });
        this.play();
        this.currentSpawnDelay -= this.currentSpawnDelay;
        delete this.spawnDelay;
      }
    }

    if (this.emitDelay !== undefined) {
      this.currentEmitDelay += delta.value;

      if (this.currentEmitDelay >= this.emitDelay) {
        this.emit();
        this.currentEmitDelay -= this.emitDelay;
      }
    }
  }

  prepareToDie() {
    var _a;

    if (this.paused) {
      return;
    }

    const duration = (_a = this.emitterOptions.life) === null || _a === void 0 ? void 0 : _a.duration;

    if (this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal) && duration !== undefined && duration > 0) {
      this.duration = duration * 1000;
    }
  }

  destroy() {
    this.emitters.removeEmitter(this);
    external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.dispatchEvent("emitterDestroyed", {
      container: this.container,
      data: {
        emitter: this
      }
    });
  }

  calcPosition() {
    var _a, _b;

    const container = this.container;
    const percentPosition = this.emitterOptions.position;
    return {
      x: ((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100 * container.canvas.size.width,
      y: ((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100 * container.canvas.size.height
    };
  }

  emit() {
    if (this.paused) {
      return;
    }

    const quantity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.emitterOptions.rate.quantity);
    this.emitParticles(quantity);
  }

  emitParticles(quantity) {
    var _a, _b, _c;

    const container = this.container;
    const position = this.position;
    const offset = {
      x: this.size.mode === external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.SizeMode.percent ? container.canvas.size.width * this.size.width / 100 : this.size.width,
      y: this.size.mode === external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.SizeMode.percent ? container.canvas.size.height * this.size.height / 100 : this.size.height
    };

    for (let i = 0; i < quantity; i++) {
      const particlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, this.particlesOptions);

      if (this.spawnColor) {
        const colorAnimation = (_a = this.emitterOptions.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;

        if (colorAnimation) {
          const hueAnimation = colorAnimation;

          if (hueAnimation.enable) {
            this.spawnColor.h = this.setColorAnimation(hueAnimation, this.spawnColor.h, 360);
          } else {
            const hslAnimation = colorAnimation;
            this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
            this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
            this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
          }
        }

        if (!particlesOptions.color) {
          particlesOptions.color = {
            value: this.spawnColor
          };
        } else {
          particlesOptions.color.value = this.spawnColor;
        }
      }

      const pPosition = (_c = (_b = this.shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, offset, this.fill)) !== null && _c !== void 0 ? _c : position;
      container.particles.addParticle(pPosition, particlesOptions);
    }
  }

  setColorAnimation(animation, initValue, maxValue) {
    var _a;

    const container = this.container;

    if (!animation.enable) {
      return initValue;
    }

    const colorOffset = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(animation.offset);
    const delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.emitterOptions.rate.delay);
    const emitFactor = 1000 * delay / container.retina.reduceFactor;
    const colorSpeed = (_a = animation.speed) !== null && _a !== void 0 ? _a : 0;
    return (initValue + colorSpeed * container.fpsLimit / emitFactor + colorOffset * 3.6) % maxValue;
  }

}
_EmitterInstance_firstSpawn = new WeakMap(), _EmitterInstance_startParticlesAdded = new WeakMap();
;// CONCATENATED MODULE: ./dist/Options/Classes/EmitterRate.js

class EmitterRate {
  constructor() {
    this.quantity = 1;
    this.delay = 0.1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.quantity !== undefined) {
      this.quantity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.quantity);
    }

    if (data.delay !== undefined) {
      this.delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.delay);
    }
  }

}
;// CONCATENATED MODULE: ./dist/Options/Classes/EmitterLife.js
class EmitterLife {
  constructor() {
    this.wait = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.wait !== undefined) {
      this.wait = data.wait;
    }
  }

}
// EXTERNAL MODULE: ../../engine/dist/Options/Classes/AnimatableColor.js
var AnimatableColor = __webpack_require__(9952);
;// CONCATENATED MODULE: ./dist/Enums/EmitterClickMode.js
var EmitterClickMode;

(function (EmitterClickMode) {
  EmitterClickMode["emitter"] = "emitter";
})(EmitterClickMode || (EmitterClickMode = {}));
;// CONCATENATED MODULE: ./dist/Enums/EmitterShapeType.js
var EmitterShapeType;

(function (EmitterShapeType) {
  EmitterShapeType["circle"] = "circle";
  EmitterShapeType["square"] = "square";
})(EmitterShapeType || (EmitterShapeType = {}));
;// CONCATENATED MODULE: ./dist/Enums/index.js


;// CONCATENATED MODULE: ./dist/Options/Classes/Emitter.js






class Emitter {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = EmitterShapeType.square;
    this.startCount = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }

    if (data.size !== undefined) {
      if (this.size === undefined) {
        this.size = new EmitterSize();
      }

      this.size.load(data.size);
    }

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.fill !== undefined) {
      this.fill = data.fill;
    }

    this.life.load(data.life);
    this.name = data.name;

    if (data.particles !== undefined) {
      this.particles = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, data.particles);
    }

    this.rate.load(data.rate);

    if (data.shape !== undefined) {
      this.shape = data.shape;
    }

    if (data.position !== undefined) {
      this.position = {
        x: data.position.x,
        y: data.position.y
      };
    }

    if (data.spawnColor !== undefined) {
      if (this.spawnColor === undefined) {
        this.spawnColor = new AnimatableColor/* AnimatableColor */.R();
      }

      this.spawnColor.load(data.spawnColor);
    }

    if (data.startCount !== undefined) {
      this.startCount = data.startCount;
    }
  }

}
;// CONCATENATED MODULE: ./dist/Emitters.js




class Emitters {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = [];
    const overridableContainer = container;

    overridableContainer.getEmitter = idxOrName => idxOrName === undefined || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find(t => t.name === idxOrName);

    overridableContainer.addEmitter = (options, position) => this.addEmitter(options, position);

    overridableContainer.playEmitter = idxOrName => {
      const emitter = overridableContainer.getEmitter(idxOrName);

      if (emitter) {
        emitter.externalPlay();
      }
    };

    overridableContainer.pauseEmitter = idxOrName => {
      const emitter = overridableContainer.getEmitter(idxOrName);

      if (emitter) {
        emitter.externalPause();
      }
    };
  }

  init(options) {
    var _a, _b;

    if (!options) {
      return;
    }

    if (options.emitters) {
      if (options.emitters instanceof Array) {
        this.emitters = options.emitters.map(s => {
          const tmp = new Emitter();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.emitters instanceof Array) {
          this.emitters = new Emitter();
        }

        this.emitters.load(options.emitters);
      }
    }

    const interactivityEmitters = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;

    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        this.interactivityEmitters = interactivityEmitters.map(s => {
          const tmp = new Emitter();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.interactivityEmitters instanceof Array) {
          this.interactivityEmitters = new Emitter();
        }

        this.interactivityEmitters.load(interactivityEmitters);
      }
    }

    if (this.emitters instanceof Array) {
      for (const emitterOptions of this.emitters) {
        this.addEmitter(emitterOptions);
      }
    } else {
      this.addEmitter(this.emitters);
    }
  }

  play() {
    for (const emitter of this.array) {
      emitter.play();
    }
  }

  pause() {
    for (const emitter of this.array) {
      emitter.pause();
    }
  }

  stop() {
    this.array = [];
  }

  update(delta) {
    for (const emitter of this.array) {
      emitter.update(delta);
    }
  }

  handleClickMode(mode) {
    const container = this.container;
    const emitterOptions = this.emitters;
    const modeEmitters = this.interactivityEmitters;

    if (mode === EmitterClickMode.emitter) {
      let emitterModeOptions;

      if (modeEmitters instanceof Array) {
        if (modeEmitters.length > 0) {
          emitterModeOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(modeEmitters);
        }
      } else {
        emitterModeOptions = modeEmitters;
      }

      const emittersOptions = emitterModeOptions !== null && emitterModeOptions !== void 0 ? emitterModeOptions : emitterOptions instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(emitterOptions) : emitterOptions;
      const ePosition = container.interactivity.mouse.clickPosition;
      this.addEmitter((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, emittersOptions), ePosition);
    }
  }

  resize() {
    for (const emitter of this.array) {
      emitter.resize();
    }
  }

  addEmitter(options, position) {
    const emitter = new EmitterInstance(this, this.container, options, position);
    this.array.push(emitter);
    return emitter;
  }

  removeEmitter(emitter) {
    const index = this.array.indexOf(emitter);

    if (index >= 0) {
      this.array.splice(index, 1);
    }
  }

}
;// CONCATENATED MODULE: ./dist/Shapes/Circle/CircleShape.js
class CircleShape {
  randomPosition(position, offset, fill) {
    const generateTheta = (x, y) => {
      const u = Math.random() / 4.0;
      const theta = Math.atan(y / x * Math.tan(2 * Math.PI * u));
      const v = Math.random();

      if (v < 0.25) {
        return theta;
      } else if (v < 0.5) {
        return Math.PI - theta;
      } else if (v < 0.75) {
        return Math.PI + theta;
      } else {
        return -theta;
      }
    };

    const radius = (x, y, theta) => x * y / Math.sqrt(Math.pow(y * Math.cos(theta), 2) + Math.pow(x * Math.sin(theta), 2));

    const [a, b] = [offset.x / 2, offset.y / 2];
    const randomTheta = generateTheta(a, b),
          maxRadius = radius(a, b, randomTheta),
          randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;
    return {
      x: position.x + randomRadius * Math.cos(randomTheta),
      y: position.y + randomRadius * Math.sin(randomTheta)
    };
  }

}
;// CONCATENATED MODULE: ./dist/Shapes/Square/SquareShape.js
function randomSquareCoordinate(position, offset) {
  return position + offset * (Math.random() - 0.5);
}

class SquareShape {
  randomPosition(position, offset, fill) {
    if (fill) {
      return {
        x: randomSquareCoordinate(position.x, offset.x),
        y: randomSquareCoordinate(position.y, offset.y)
      };
    } else {
      const halfW = offset.x / 2,
            halfH = offset.y / 2,
            side = Math.floor(Math.random() * 4),
            v = (Math.random() - 0.5) * 2;

      switch (side) {
        case 0:
          return {
            x: position.x + v * halfW,
            y: position.y - halfH
          };

        case 1:
          return {
            x: position.x - halfW,
            y: position.y + v * halfH
          };

        case 2:
          return {
            x: position.x + v * halfW,
            y: position.y + halfH
          };

        case 3:
        default:
          return {
            x: position.x + halfW,
            y: position.y + v * halfH
          };
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/index.js
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};









class EmittersPlugin {
  constructor() {
    this.id = "emitters";
  }

  getPlugin(container) {
    return new Emitters(container);
  }

  needsPlugin(options) {
    var _a, _b, _c;

    if (options === undefined) {
      return false;
    }

    const emitters = options.emitters;
    return emitters instanceof Array && !!emitters.length || emitters !== undefined || !!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)(EmitterClickMode.emitter, options.interactivity.events.onClick.mode);
  }

  loadOptions(options, source) {
    var _a, _b;

    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    const optionsCast = options;

    if (source === null || source === void 0 ? void 0 : source.emitters) {
      if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
        optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map(s => {
          const tmp = new Emitter();
          tmp.load(s);
          return tmp;
        });
      } else {
        let emitterOptions = optionsCast.emitters;

        if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
          optionsCast.emitters = emitterOptions = new Emitter();
        }

        emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
      }
    }

    const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;

    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        optionsCast.interactivity.modes.emitters = interactivityEmitters.map(s => {
          const tmp = new Emitter();
          tmp.load(s);
          return tmp;
        });
      } else {
        let emitterOptions = optionsCast.interactivity.modes.emitters;

        if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
          optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter();
        }

        emitterOptions.load(interactivityEmitters);
      }
    }
  }

}

function loadEmittersPlugin(tsParticles) {
  return __awaiter(this, void 0, void 0, function* () {
    const plugin = new EmittersPlugin();
    yield tsParticles.addPlugin(plugin);

    if (!tsParticles.addEmitterShape) {
      tsParticles.addEmitterShape = (name, shape) => {
        ShapeManager.addShape(name, shape);
      };
    }

    tsParticles.addEmitterShape(EmitterShapeType.circle, new CircleShape());
    tsParticles.addEmitterShape(EmitterShapeType.square, new SquareShape());
  });
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});