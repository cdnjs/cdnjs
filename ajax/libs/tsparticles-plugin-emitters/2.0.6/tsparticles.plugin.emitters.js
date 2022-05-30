/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.6
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
})(this, (__WEBPACK_EXTERNAL_MODULE__818__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 818:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__818__;

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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

;// CONCATENATED MODULE: ./dist/browser/Shapes/Circle/CircleShape.js
class CircleShape {
  randomPosition(position, size, fill) {
    const generateTheta = (x, y) => {
      const u = Math.random() / 4.0,
            theta = Math.atan(y / x * Math.tan(2 * Math.PI * u)),
            v = Math.random();

      if (v < 0.25) {
        return theta;
      } else if (v < 0.5) {
        return Math.PI - theta;
      } else if (v < 0.75) {
        return Math.PI + theta;
      } else {
        return -theta;
      }
    },
          radius = (x, y, theta) => x * y / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2),
          [a, b] = [size.width / 2, size.height / 2],
          randomTheta = generateTheta(a, b),
          maxRadius = radius(a, b, randomTheta),
          randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;

    return {
      x: position.x + randomRadius * Math.cos(randomTheta),
      y: position.y + randomRadius * Math.sin(randomTheta)
    };
  }

}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/EmitterLife.js
/**
 * @category Emitters Plugin
 */
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/EmitterRate.js

/**
 * @category Emitters Plugin
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/EmitterSize.js
/**
 * @category Emitters Plugin
 */
class EmitterSize {
  constructor() {
    this.mode = "percent"
    /* percent */
    ;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Emitter.js




/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */

class Emitter {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = "square"
    /* square */
    ;
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

    this.domId = data.domId;

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
      this.position = {};

      if (data.position.x !== undefined) {
        this.position.x = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.position.x);
      }

      if (data.position.y !== undefined) {
        this.position.y = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.position.y);
      }
    }

    if (data.spawnColor !== undefined) {
      if (this.spawnColor === undefined) {
        this.spawnColor = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.AnimatableColor();
      }

      this.spawnColor.load(data.spawnColor);
    }

    if (data.startCount !== undefined) {
      this.startCount = data.startCount;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/EmitterInstance.js
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

var _EmitterInstance_firstSpawn, _EmitterInstance_startParticlesAdded, _EmitterInstance_engine;




/**
 * @category Emitters Plugin
 */

class EmitterInstance {
  constructor(engine, emitters, container, options, position) {
    var _a, _b, _c, _d, _e, _f, _g;

    var _h;

    this.emitters = emitters;
    this.container = container;

    _EmitterInstance_firstSpawn.set(this, void 0);

    _EmitterInstance_startParticlesAdded.set(this, void 0);

    _EmitterInstance_engine.set(this, void 0);

    __classPrivateFieldSet(this, _EmitterInstance_engine, engine, "f");

    this.currentDuration = 0;
    this.currentEmitDelay = 0;
    this.currentSpawnDelay = 0;
    this.initialPosition = position;

    if (options instanceof Emitter) {
      this.options = options;
    } else {
      this.options = new Emitter();
      this.options.load(options);
    }

    this.spawnDelay = ((_a = this.options.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000 / this.container.retina.reduceFactor;
    this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
    this.name = this.options.name;
    this.shape = (_c = __classPrivateFieldGet(this, _EmitterInstance_engine, "f").emitterShapeManager) === null || _c === void 0 ? void 0 : _c.getShape(this.options.shape);
    this.fill = this.options.fill;

    __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, !this.options.life.wait, "f");

    __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, false, "f");

    let particlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, this.options.particles);
    particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : particlesOptions = {};
    (_d = particlesOptions.move) !== null && _d !== void 0 ? _d : particlesOptions.move = {};
    (_e = (_h = particlesOptions.move).direction) !== null && _e !== void 0 ? _e : _h.direction = this.options.direction;

    if (this.options.spawnColor) {
      this.spawnColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToHsl)(this.options.spawnColor);
    }

    this.paused = !this.options.autoPlay;
    this.particlesOptions = particlesOptions;
    this.size = (_f = this.options.size) !== null && _f !== void 0 ? _f : (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: "percent"
        /* percent */
        ,
        width: 0
      });
      return size;
    })();
    this.lifeCount = (_g = this.options.life.count) !== null && _g !== void 0 ? _g : -1;
    this.immortal = this.lifeCount <= 0;

    __classPrivateFieldGet(this, _EmitterInstance_engine, "f").dispatchEvent("emitterCreated", {
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

    if (!(this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal || !this.options.life.count) && (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f") || this.currentSpawnDelay >= ((_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0)))) {
      return;
    }

    if (this.emitDelay === undefined) {
      const delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.options.rate.delay);
      this.emitDelay = 1000 * delay / this.container.retina.reduceFactor;
    }

    if (this.lifeCount > 0 || this.immortal) {
      this.prepareToDie();
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

      this.emitParticles(this.options.startCount);
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
          this.spawnDelay = ((_c = this.options.life.delay) !== null && _c !== void 0 ? _c : 0) * 1000 / this.container.retina.reduceFactor;
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
        __classPrivateFieldGet(this, _EmitterInstance_engine, "f").dispatchEvent("emitterPlay", {
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

  getPosition() {
    if (this.options.domId) {
      const container = this.container,
            element = document.getElementById(this.options.domId);

      if (element) {
        const elRect = element.getBoundingClientRect();
        return {
          x: (elRect.x + elRect.width / 2) * container.retina.pixelRatio,
          y: (elRect.y + elRect.height / 2) * container.retina.pixelRatio
        };
      }
    }

    return this.position;
  }

  getSize() {
    const container = this.container;

    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);

      if (element) {
        const elRect = element.getBoundingClientRect();
        return {
          width: elRect.width * container.retina.pixelRatio,
          height: elRect.height * container.retina.pixelRatio
        };
      }
    }

    return {
      width: this.size.mode === "percent"
      /* percent */
      ? container.canvas.size.width * this.size.width / 100 : this.size.width,
      height: this.size.mode === "percent"
      /* percent */
      ? container.canvas.size.height * this.size.height / 100 : this.size.height
    };
  }

  prepareToDie() {
    var _a;

    if (this.paused) {
      return;
    }

    const duration = (_a = this.options.life) === null || _a === void 0 ? void 0 : _a.duration;

    if (this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal) && duration !== undefined && duration > 0) {
      this.duration = duration * 1000;
    }
  }

  destroy() {
    this.emitters.removeEmitter(this);

    __classPrivateFieldGet(this, _EmitterInstance_engine, "f").dispatchEvent("emitterDestroyed", {
      container: this.container,
      data: {
        emitter: this
      }
    });
  }

  calcPosition() {
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calcPositionOrRandomFromSizeRanged)({
      size: this.container.canvas.size,
      position: this.options.position
    });
  }

  emit() {
    if (this.paused) {
      return;
    }

    const quantity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.options.rate.quantity);
    this.emitParticles(quantity);
  }

  emitParticles(quantity) {
    var _a, _b, _c;

    const position = this.getPosition(),
          size = this.getSize();

    for (let i = 0; i < quantity; i++) {
      const particlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, this.particlesOptions);

      if (this.spawnColor) {
        const hslAnimation = (_a = this.options.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;

        if (hslAnimation) {
          this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
          this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
          this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
        }

        if (!particlesOptions.color) {
          particlesOptions.color = {
            value: this.spawnColor
          };
        } else {
          particlesOptions.color.value = this.spawnColor;
        }
      }

      if (!position) {
        return;
      }

      const pPosition = (_c = (_b = this.shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, size, this.fill)) !== null && _c !== void 0 ? _c : position;
      this.container.particles.addParticle(pPosition, particlesOptions);
    }
  }

  setColorAnimation(animation, initValue, maxValue) {
    var _a;

    const container = this.container;

    if (!animation.enable) {
      return initValue;
    }

    const colorOffset = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(animation.offset),
          delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.options.rate.delay),
          emitFactor = 1000 * delay / container.retina.reduceFactor,
          colorSpeed = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)((_a = animation.speed) !== null && _a !== void 0 ? _a : 0);
    return (initValue + colorSpeed * container.fpsLimit / emitFactor + colorOffset * 3.6) % maxValue;
  }

}
_EmitterInstance_firstSpawn = new WeakMap(), _EmitterInstance_startParticlesAdded = new WeakMap(), _EmitterInstance_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Emitters.js
var Emitters_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Emitters_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Emitters_engine;




/**
 * @category Emitters Plugin
 */

class Emitters {
  constructor(engine, container) {
    this.container = container;

    _Emitters_engine.set(this, void 0);

    Emitters_classPrivateFieldSet(this, _Emitters_engine, engine, "f");

    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = [];

    container.getEmitter = idxOrName => idxOrName === undefined || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find(t => t.name === idxOrName);

    container.addEmitter = (options, position) => this.addEmitter(options, position);

    container.removeEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);

      if (emitter) {
        this.removeEmitter(emitter);
      }
    };

    container.playEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);

      if (emitter) {
        emitter.externalPlay();
      }
    };

    container.pauseEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);

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
    const emitterOptions = this.emitters,
          modeEmitters = this.interactivityEmitters;

    if (mode === "emitter"
    /* emitter */
    ) {
      let emitterModeOptions;

      if (modeEmitters instanceof Array) {
        if (modeEmitters.length > 0) {
          emitterModeOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(modeEmitters);
        }
      } else {
        emitterModeOptions = modeEmitters;
      }

      const emittersOptions = emitterModeOptions !== null && emitterModeOptions !== void 0 ? emitterModeOptions : emitterOptions instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(emitterOptions) : emitterOptions,
            ePosition = this.container.interactivity.mouse.clickPosition;
      this.addEmitter((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, emittersOptions), ePosition);
    }
  }

  resize() {
    for (const emitter of this.array) {
      emitter.resize();
    }
  }

  addEmitter(options, position) {
    const emitterOptions = new Emitter();
    emitterOptions.load(options);
    const emitter = new EmitterInstance(Emitters_classPrivateFieldGet(this, _Emitters_engine, "f"), this, this.container, emitterOptions, position);
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
_Emitters_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/ShapeManager.js
var ShapeManager_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var _ShapeManager_engine;

const shapes = new Map();
class ShapeManager {
  constructor(engine) {
    _ShapeManager_engine.set(this, void 0);

    ShapeManager_classPrivateFieldSet(this, _ShapeManager_engine, engine, "f");
  }

  addShape(name, drawer) {
    if (!this.getShape(name)) {
      shapes.set(name, drawer);
    }
  }

  getShape(name) {
    return shapes.get(name);
  }

  getSupportedShapes() {
    return shapes.keys();
  }

}
_ShapeManager_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Shapes/Square/SquareShape.js
function randomSquareCoordinate(position, offset) {
  return position + offset * (Math.random() - 0.5);
}

class SquareShape {
  randomPosition(position, size, fill) {
    if (fill) {
      return {
        x: randomSquareCoordinate(position.x, size.width),
        y: randomSquareCoordinate(position.y, size.height)
      };
    } else {
      const halfW = size.width / 2,
            halfH = size.height / 2,
            side = Math.floor(Math.random() * 4),
            v = (Math.random() - 0.5) * 2;

      switch (side) {
        case 0:
          // top-left
          return {
            x: position.x + v * halfW,
            y: position.y - halfH
          };

        case 1:
          // top-right
          return {
            x: position.x - halfW,
            y: position.y + v * halfH
          };

        case 2:
          // bottom-right
          return {
            x: position.x + v * halfW,
            y: position.y + halfH
          };

        case 3:
        default:
          // bottom-left
          return {
            x: position.x + halfW,
            y: position.y + v * halfH
          };
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js
var browser_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var browser_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _EmittersPlugin_engine;







/**
 * @category Emitters Plugin
 */

class EmittersPlugin {
  constructor(engine) {
    _EmittersPlugin_engine.set(this, void 0);

    browser_classPrivateFieldSet(this, _EmittersPlugin_engine, engine, "f");

    this.id = "emitters";
  }

  getPlugin(container) {
    return new Emitters(browser_classPrivateFieldGet(this, _EmittersPlugin_engine, "f"), container);
  }

  needsPlugin(options) {
    var _a, _b, _c;

    if (options === undefined) {
      return false;
    }

    const emitters = options.emitters;
    return emitters instanceof Array && !!emitters.length || emitters !== undefined || !!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("emitter"
    /* emitter */
    , options.interactivity.events.onClick.mode);
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

_EmittersPlugin_engine = new WeakMap();
async function loadEmittersPlugin(engine) {
  if (!engine.emitterShapeManager) {
    engine.emitterShapeManager = new ShapeManager(engine);
  }

  if (!engine.addEmitterShape) {
    engine.addEmitterShape = (name, shape) => {
      var _a;

      (_a = engine.emitterShapeManager) === null || _a === void 0 ? void 0 : _a.addShape(name, shape);
    };
  }

  const plugin = new EmittersPlugin(engine);
  await engine.addPlugin(plugin);
  engine.addEmitterShape("circle"
  /* circle */
  , new CircleShape());
  engine.addEmitterShape("square"
  /* square */
  , new SquareShape());
}





})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});