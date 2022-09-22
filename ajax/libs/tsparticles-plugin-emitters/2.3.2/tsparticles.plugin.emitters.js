/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.3.2
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
})(this, (__WEBPACK_EXTERNAL_MODULE__961__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__961__;

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

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Shapes/Circle/CircleShape.js

class CircleShape {
  randomPosition(position, size, fill) {
    const generateTheta = (x, y) => {
      const u = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() / 4.0,
            theta = Math.atan(y / x * Math.tan(2 * Math.PI * u)),
            v = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)();

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
          randomRadius = fill ? maxRadius * Math.sqrt((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)()) : maxRadius;

    return {
      x: position.x + randomRadius * Math.cos(randomTheta),
      y: position.y + randomRadius * Math.sin(randomTheta)
    };
  }

}
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
    /* SizeMode.percent */
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
    /* EmitterShapeType.square */
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
    this.particles = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(data.particles, particles => {
      return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, particles);
    });
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



/**
 * @category Emitters Plugin
 */

class EmitterInstance {
  constructor(engine, emitters, container, options, position) {
    var _a, _b, _c, _d, _e, _f, _g;

    var _h;

    this.emitters = emitters;
    this.container = container;
    this._engine = engine;
    this._currentDuration = 0;
    this._currentEmitDelay = 0;
    this._currentSpawnDelay = 0;
    this._initialPosition = position;

    if (options instanceof Emitter) {
      this.options = options;
    } else {
      this.options = new Emitter();
      this.options.load(options);
    }

    this._spawnDelay = ((_a = this.options.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000 / this.container.retina.reduceFactor;
    this.position = (_b = this._initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
    this.name = this.options.name;
    this._shape = (_c = this._engine.emitterShapeManager) === null || _c === void 0 ? void 0 : _c.getShape(this.options.shape);
    this.fill = this.options.fill;
    this._firstSpawn = !this.options.life.wait;
    this._startParticlesAdded = false;
    let particlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, this.options.particles);
    particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : particlesOptions = {};
    (_d = particlesOptions.move) !== null && _d !== void 0 ? _d : particlesOptions.move = {};
    (_e = (_h = particlesOptions.move).direction) !== null && _e !== void 0 ? _e : _h.direction = this.options.direction;

    if (this.options.spawnColor) {
      this.spawnColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(this.options.spawnColor);
    }

    this._paused = !this.options.autoPlay;
    this._particlesOptions = particlesOptions;
    this.size = (_f = this.options.size) !== null && _f !== void 0 ? _f : (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: "percent"
        /* SizeMode.percent */
        ,
        width: 0
      });
      return size;
    })();
    this._lifeCount = (_g = this.options.life.count) !== null && _g !== void 0 ? _g : -1;
    this._immortal = this._lifeCount <= 0;

    this._engine.dispatchEvent("emitterCreated", {
      container,
      data: {
        emitter: this
      }
    });

    this.play();
  }

  externalPause() {
    this._paused = true;
    this.pause();
  }

  externalPlay() {
    this._paused = false;
    this.play();
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
      /* SizeMode.percent */
      ? container.canvas.size.width * this.size.width / 100 : this.size.width,
      height: this.size.mode === "percent"
      /* SizeMode.percent */
      ? container.canvas.size.height * this.size.height / 100 : this.size.height
    };
  }

  pause() {
    if (this._paused) {
      return;
    }

    delete this._emitDelay;
  }

  play() {
    var _a;

    if (this._paused) {
      return;
    }

    if (!(this.container.retina.reduceFactor && (this._lifeCount > 0 || this._immortal || !this.options.life.count) && (this._firstSpawn || this._currentSpawnDelay >= ((_a = this._spawnDelay) !== null && _a !== void 0 ? _a : 0)))) {
      return;
    }

    if (this._emitDelay === undefined) {
      const delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.options.rate.delay);
      this._emitDelay = 1000 * delay / this.container.retina.reduceFactor;
    }

    if (this._lifeCount > 0 || this._immortal) {
      this.prepareToDie();
    }
  }

  resize() {
    const initialPosition = this._initialPosition;
    this.position = initialPosition && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(initialPosition, this.container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin) ? initialPosition : this.calcPosition();
  }

  update(delta) {
    var _a, _b, _c;

    if (this._paused) {
      return;
    }

    if (this._firstSpawn) {
      this._firstSpawn = false;
      this._currentSpawnDelay = (_a = this._spawnDelay) !== null && _a !== void 0 ? _a : 0;
      this._currentEmitDelay = (_b = this._emitDelay) !== null && _b !== void 0 ? _b : 0;
    }

    if (!this._startParticlesAdded) {
      this._startParticlesAdded = true;
      this.emitParticles(this.options.startCount);
    }

    if (this._duration !== undefined) {
      this._currentDuration += delta.value;

      if (this._currentDuration >= this._duration) {
        this.pause();

        if (this._spawnDelay !== undefined) {
          delete this._spawnDelay;
        }

        if (!this._immortal) {
          this._lifeCount--;
        }

        if (this._lifeCount > 0 || this._immortal) {
          this.position = this.calcPosition();
          this._spawnDelay = ((_c = this.options.life.delay) !== null && _c !== void 0 ? _c : 0) * 1000 / this.container.retina.reduceFactor;
        } else {
          this.destroy();
        }

        this._currentDuration -= this._duration;
        delete this._duration;
      }
    }

    if (this._spawnDelay !== undefined) {
      this._currentSpawnDelay += delta.value;

      if (this._currentSpawnDelay >= this._spawnDelay) {
        this._engine.dispatchEvent("emitterPlay", {
          container: this.container
        });

        this.play();
        this._currentSpawnDelay -= this._currentSpawnDelay;
        delete this._spawnDelay;
      }
    }

    if (this._emitDelay !== undefined) {
      this._currentEmitDelay += delta.value;

      if (this._currentEmitDelay >= this._emitDelay) {
        this.emit();
        this._currentEmitDelay -= this._emitDelay;
      }
    }
  }

  calcPosition() {
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calcPositionOrRandomFromSizeRanged)({
      size: this.container.canvas.size,
      position: this.options.position
    });
  }

  destroy() {
    this.emitters.removeEmitter(this);

    this._engine.dispatchEvent("emitterDestroyed", {
      container: this.container,
      data: {
        emitter: this
      }
    });
  }

  emit() {
    if (this._paused) {
      return;
    }

    const quantity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.options.rate.quantity);
    this.emitParticles(quantity);
  }

  emitParticles(quantity) {
    var _a, _b, _c;

    const position = this.getPosition(),
          size = this.getSize(),
          singleParticlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(this._particlesOptions);

    for (let i = 0; i < quantity; i++) {
      const particlesOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, singleParticlesOptions);

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

      const pPosition = (_c = (_b = this._shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, size, this.fill)) !== null && _c !== void 0 ? _c : position;
      this.container.particles.addParticle(pPosition, particlesOptions);
    }
  }

  prepareToDie() {
    var _a;

    if (this._paused) {
      return;
    }

    const duration = (_a = this.options.life) === null || _a === void 0 ? void 0 : _a.duration;

    if (this.container.retina.reduceFactor && (this._lifeCount > 0 || this._immortal) && duration !== undefined && duration > 0) {
      this._duration = duration * 1000;
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
;// CONCATENATED MODULE: ./dist/browser/Emitters.js



/**
 * @category Emitters Plugin
 */

class Emitters {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = {
      random: {
        count: 1,
        enable: false
      },
      value: []
    };

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

  addEmitter(options, position) {
    const emitterOptions = new Emitter();
    emitterOptions.load(options);
    const emitter = new EmitterInstance(this._engine, this, this.container, emitterOptions, position);
    this.array.push(emitter);
    return emitter;
  }

  handleClickMode(mode) {
    const emitterOptions = this.emitters,
          modeEmitters = this.interactivityEmitters;

    if (mode === "emitter"
    /* EmitterClickMode.emitter */
    ) {
      let emittersModeOptions;

      if (modeEmitters && modeEmitters.value instanceof Array) {
        if (modeEmitters.value.length > 0 && modeEmitters.random.enable) {
          emittersModeOptions = [];
          const usedIndexes = [];

          for (let i = 0; i < modeEmitters.random.count; i++) {
            const idx = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.arrayRandomIndex)(modeEmitters.value);

            if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
              i--;
              continue;
            }

            usedIndexes.push(idx);
            emittersModeOptions.push((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(modeEmitters.value, idx));
          }
        } else {
          emittersModeOptions = modeEmitters.value;
        }
      } else {
        emittersModeOptions = modeEmitters === null || modeEmitters === void 0 ? void 0 : modeEmitters.value;
      }

      const emittersOptions = emittersModeOptions !== null && emittersModeOptions !== void 0 ? emittersModeOptions : emitterOptions,
            ePosition = this.container.interactivity.mouse.clickPosition;
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(emittersOptions, emitter => {
        this.addEmitter(emitter, ePosition);
      });
    }
  }

  init(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;

    if (!options) {
      return;
    }

    this.emitters = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(options.emitters, emitter => {
      const tmp = new Emitter();
      tmp.load(emitter);
      return tmp;
    });
    const interactivityEmitters = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;

    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        this.interactivityEmitters = {
          random: {
            count: 1,
            enable: true
          },
          value: interactivityEmitters.map(s => {
            const tmp = new Emitter();
            tmp.load(s);
            return tmp;
          })
        };
      } else {
        const emitterMode = interactivityEmitters;

        if (emitterMode.value !== undefined) {
          if (emitterMode.value instanceof Array) {
            this.interactivityEmitters = {
              random: {
                count: (_c = this.interactivityEmitters.random.count) !== null && _c !== void 0 ? _c : 1,
                enable: (_d = this.interactivityEmitters.random.enable) !== null && _d !== void 0 ? _d : false
              },
              value: emitterMode.value.map(s => {
                const tmp = new Emitter();
                tmp.load(s);
                return tmp;
              })
            };
          } else {
            const tmp = new Emitter();
            tmp.load(emitterMode.value);
            this.interactivityEmitters = {
              random: {
                count: (_e = this.interactivityEmitters.random.count) !== null && _e !== void 0 ? _e : 1,
                enable: (_f = this.interactivityEmitters.random.enable) !== null && _f !== void 0 ? _f : false
              },
              value: tmp
            };
          }
        } else {
          const tmp = new Emitter();
          tmp.load(interactivityEmitters);
          this.interactivityEmitters = {
            random: {
              count: (_g = this.interactivityEmitters.random.count) !== null && _g !== void 0 ? _g : 1,
              enable: (_h = this.interactivityEmitters.random.enable) !== null && _h !== void 0 ? _h : false
            },
            value: tmp
          };
        }
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

  pause() {
    for (const emitter of this.array) {
      emitter.pause();
    }
  }

  play() {
    for (const emitter of this.array) {
      emitter.play();
    }
  }

  removeEmitter(emitter) {
    const index = this.array.indexOf(emitter);

    if (index >= 0) {
      this.array.splice(index, 1);
    }
  }

  resize() {
    for (const emitter of this.array) {
      emitter.resize();
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

}
;// CONCATENATED MODULE: ./dist/browser/ShapeManager.js
const shapes = new Map();
class ShapeManager {
  constructor(engine) {
    this._engine = engine;
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
;// CONCATENATED MODULE: ./dist/browser/Shapes/Square/SquareShape.js


function randomSquareCoordinate(position, offset) {
  return position + offset * ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() - 0.5);
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
            side = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 4),
            v = ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() - 0.5) * 2;

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






/**
 * @category Emitters Plugin
 */

class EmittersPlugin {
  constructor(engine) {
    this._engine = engine;
    this.id = "emitters";
  }

  getPlugin(container) {
    return new Emitters(this._engine, container);
  }

  loadOptions(options, source) {
    var _a, _b, _c, _d, _e, _f;

    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    const optionsCast = options;
    optionsCast.emitters = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(source === null || source === void 0 ? void 0 : source.emitters, emitter => {
      const tmp = new Emitter();
      tmp.load(emitter);
      return tmp;
    });
    const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;

    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        optionsCast.interactivity.modes.emitters = {
          random: {
            count: 1,
            enable: true
          },
          value: interactivityEmitters.map(s => {
            const tmp = new Emitter();
            tmp.load(s);
            return tmp;
          })
        };
      } else {
        const emitterMode = interactivityEmitters;

        if (emitterMode.value !== undefined) {
          if (emitterMode.value instanceof Array) {
            optionsCast.interactivity.modes.emitters = {
              random: {
                count: (_c = emitterMode.random.count) !== null && _c !== void 0 ? _c : 1,
                enable: (_d = emitterMode.random.enable) !== null && _d !== void 0 ? _d : false
              },
              value: emitterMode.value.map(s => {
                const tmp = new Emitter();
                tmp.load(s);
                return tmp;
              })
            };
          } else {
            const tmp = new Emitter();
            tmp.load(emitterMode.value);
            optionsCast.interactivity.modes.emitters = {
              random: {
                count: (_e = emitterMode.random.count) !== null && _e !== void 0 ? _e : 1,
                enable: (_f = emitterMode.random.enable) !== null && _f !== void 0 ? _f : false
              },
              value: tmp
            };
          }
        } else {
          const emitterOptions = optionsCast.interactivity.modes.emitters = {
            random: {
              count: 1,
              enable: false
            },
            value: new Emitter()
          };
          emitterOptions.value.load(interactivityEmitters);
        }
      }
    }
  }

  needsPlugin(options) {
    var _a, _b, _c;

    if (!options) {
      return false;
    }

    const emitters = options.emitters;
    return emitters instanceof Array && !!emitters.length || emitters !== undefined || !!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("emitter"
    /* EmitterClickMode.emitter */
    , options.interactivity.events.onClick.mode);
  }

}

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
  /* EmitterShapeType.circle */
  , new CircleShape());
  engine.addEmitterShape("square"
  /* EmitterShapeType.square */
  , new SquareShape());
}





})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});