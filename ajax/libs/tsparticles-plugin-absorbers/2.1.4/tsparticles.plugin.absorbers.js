/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.1.4
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
  "loadAbsorbersPlugin": () => (/* binding */ loadAbsorbersPlugin)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AbsorberSizeLimit.js
class AbsorberSizeLimit {
  constructor() {
    this.radius = 0;
    this.mass = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.mass !== undefined) {
      this.mass = data.mass;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AbsorberSize.js


class AbsorberSize extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ValueWithRandom {
  constructor() {
    super();
    this.density = 5;
    this.value = 50;
    this.limit = new AbsorberSizeLimit();
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.density !== undefined) {
      this.density = data.density;
    }

    if (typeof data.limit === "number") {
      this.limit.radius = data.limit;
    } else {
      this.limit.load(data.limit);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Absorber.js


/**
 * [[include:Options/Plugins/Absorbers.md]]
 * @category Absorbers Plugin
 */

class Absorber {
  constructor() {
    this.color = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.color.value = "#000000";
    this.draggable = false;
    this.opacity = 1;
    this.destroy = true;
    this.orbits = false;
    this.size = new AbsorberSize();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    }

    if (data.draggable !== undefined) {
      this.draggable = data.draggable;
    }

    this.name = data.name;

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
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

    if (data.size !== undefined) {
      this.size.load(data.size);
    }

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }

    if (data.orbits !== undefined) {
      this.orbits = data.orbits;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/AbsorberInstance.js


/**
 * @category Absorbers Plugin
 */

class AbsorberInstance {
  /**
   * The absorber constructor, initializes the absorber based on the given options and position
   * @param absorbers the Absorbers collection manager that will contain this absorber
   * @param container the Container engine using the absorber plugin, containing the particles that will interact with this Absorber
   * @param options the Absorber source options
   * @param position the Absorber optional position, if not given, it will be searched in options, and if not available also there, a random one will be used
   */
  constructor(absorbers, container, options, position) {
    var _a, _b, _c;

    this.absorbers = absorbers;
    this.container = container;
    this.initialPosition = position ? external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(position.x, position.y) : undefined;

    if (options instanceof Absorber) {
      this.options = options;
    } else {
      this.options = new Absorber();
      this.options.load(options);
    }

    this.dragging = false;
    this.name = this.options.name;
    this.opacity = this.options.opacity;
    this.size = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(this.options.size.value) * container.retina.pixelRatio;
    this.mass = this.size * this.options.size.density * container.retina.reduceFactor;
    const limit = this.options.size.limit;
    this.limit = {
      radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
      mass: limit.mass
    };
    this.color = (_a = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToRgb)(this.options.color)) !== null && _a !== void 0 ? _a : {
      b: 0,
      g: 0,
      r: 0
    };
    this.position = (_c = (_b = this.initialPosition) === null || _b === void 0 ? void 0 : _b.copy()) !== null && _c !== void 0 ? _c : this.calcPosition();
  }
  /**
   * Absorber attraction interaction, attract the particle to the absorber
   * @param particle the particle to attract to the absorber
   */


  attract(particle) {
    const container = this.container,
          options = this.options;

    if (options.draggable) {
      const mouse = container.interactivity.mouse;

      if (mouse.clicking && mouse.downPosition) {
        const mouseDist = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(this.position, mouse.downPosition);

        if (mouseDist <= this.size) {
          this.dragging = true;
        }
      } else {
        this.dragging = false;
      }

      if (this.dragging && mouse.position) {
        this.position.x = mouse.position.x;
        this.position.y = mouse.position.y;
      }
    }

    const pos = particle.getPosition(),
          {
      dx,
      dy,
      distance
    } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(this.position, pos),
          v = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(dx, dy);
    v.length = this.mass / Math.pow(distance, 2) * container.retina.reduceFactor;

    if (distance < this.size + particle.getRadius()) {
      const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;

      if (this.size > particle.getRadius() && distance < this.size - particle.getRadius() || particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0) {
        if (options.destroy) {
          particle.destroy();
        } else {
          particle.needsNewPosition = true;
          this.updateParticlePosition(particle, v);
        }
      } else {
        if (options.destroy) {
          particle.size.value -= sizeFactor;
        }

        this.updateParticlePosition(particle, v);
      }

      if (this.limit.radius <= 0 || this.size < this.limit.radius) {
        this.size += sizeFactor;
      }

      if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
        this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
      }
    } else {
      this.updateParticlePosition(particle, v);
    }
  }
  /**
   * The draw method, for drawing the absorber in the canvas
   * @param context the canvas 2d context used for drawing
   */


  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(0, 0, this.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(this.color, this.opacity);
    context.fill();
  }
  /**
   * The resize method, for fixing the Absorber position
   */


  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(initialPosition, this.container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin) ? initialPosition : this.calcPosition();
  }
  /**
   * This method calculate the absorber position, using the provided options and position
   * @private
   */


  calcPosition() {
    const exactPosition = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calcPositionOrRandomFromSizeRanged)({
      size: this.container.canvas.size,
      position: this.options.position
    });
    return external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(exactPosition.x, exactPosition.y);
  }
  /**
   * Updates the particle position, if the particle needs a new position
   * @param particle the particle to update
   * @param v the vector used for calculating the distance between the Absorber and the particle
   * @private
   */


  updateParticlePosition(particle, v) {
    var _a;

    if (particle.destroyed) {
      return;
    }

    const container = this.container,
          canvasSize = container.canvas.size;

    if (particle.needsNewPosition) {
      const newPosition = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calcPositionOrRandomFromSize)({
        size: canvasSize
      });
      particle.position.setTo(newPosition);
      particle.velocity.setTo(particle.initialVelocity);
      particle.absorberOrbit = undefined;
      particle.needsNewPosition = false;
    }

    if (this.options.orbits) {
      if (particle.absorberOrbit === undefined) {
        particle.absorberOrbit = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(0, 0);
        particle.absorberOrbit.length = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(particle.getPosition(), this.position);
        particle.absorberOrbit.angle = Math.random() * Math.PI * 2;
      }

      if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
        const minSize = Math.min(canvasSize.width, canvasSize.height);
        particle.absorberOrbit.length = minSize * (1 + (Math.random() * 0.2 - 0.1));
      }

      if (particle.absorberOrbitDirection === undefined) {
        particle.absorberOrbitDirection = particle.velocity.x >= 0 ? "clockwise"
        /* RotateDirection.clockwise */
        : "counter-clockwise"
        /* RotateDirection.counterClockwise */
        ;
      }

      const orbitRadius = particle.absorberOrbit.length,
            orbitAngle = particle.absorberOrbit.angle,
            orbitDirection = particle.absorberOrbitDirection;
      particle.velocity.setTo(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin);
      const updateFunc = {
        x: orbitDirection === "clockwise"
        /* RotateDirection.clockwise */
        ? Math.cos : Math.sin,
        y: orbitDirection === "clockwise"
        /* RotateDirection.clockwise */
        ? Math.sin : Math.cos
      };
      particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
      particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
      particle.absorberOrbit.length -= v.length;
      particle.absorberOrbit.angle += ((_a = particle.retina.moveSpeed) !== null && _a !== void 0 ? _a : 0) * container.retina.pixelRatio / 100 * container.retina.reduceFactor;
    } else {
      const addV = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin;
      addV.length = v.length;
      addV.angle = v.angle;
      particle.velocity.addTo(addV);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Absorbers.js



/**
 * @category Absorbers Plugin
 */

class Absorbers {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.absorbers = [];
    this.interactivityAbsorbers = [];

    container.getAbsorber = idxOrName => idxOrName === undefined || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find(t => t.name === idxOrName);

    container.addAbsorber = (options, position) => this.addAbsorber(options, position);
  }

  addAbsorber(options, position) {
    const absorber = new AbsorberInstance(this, this.container, options, position);
    this.array.push(absorber);
    return absorber;
  }

  draw(context) {
    for (const absorber of this.array) {
      context.save();
      absorber.draw(context);
      context.restore();
    }
  }

  handleClickMode(mode) {
    const absorberOptions = this.absorbers,
          modeAbsorbers = this.interactivityAbsorbers;

    if (mode === "absorber"
    /* AbsorberClickMode.absorber */
    ) {
      let absorbersModeOptions;

      if (modeAbsorbers instanceof Array) {
        if (modeAbsorbers.length > 0) {
          absorbersModeOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(modeAbsorbers);
        }
      } else {
        absorbersModeOptions = modeAbsorbers;
      }

      const absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : absorberOptions instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(absorberOptions) : absorberOptions,
            aPosition = this.container.interactivity.mouse.clickPosition;
      this.addAbsorber(absorbersOptions, aPosition);
    }
  }

  init(options) {
    var _a, _b;

    if (!options) {
      return;
    }

    if (options.absorbers) {
      if (options.absorbers instanceof Array) {
        this.absorbers = options.absorbers.map(s => {
          const tmp = new Absorber();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.absorbers instanceof Array) {
          this.absorbers = new Absorber();
        }

        this.absorbers.load(options.absorbers);
      }
    }

    const interactivityAbsorbers = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;

    if (interactivityAbsorbers) {
      if (interactivityAbsorbers instanceof Array) {
        this.interactivityAbsorbers = interactivityAbsorbers.map(s => {
          const tmp = new Absorber();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.interactivityAbsorbers instanceof Array) {
          this.interactivityAbsorbers = new Absorber();
        }

        this.interactivityAbsorbers.load(interactivityAbsorbers);
      }
    }

    if (this.absorbers instanceof Array) {
      for (const absorberOptions of this.absorbers) {
        this.addAbsorber(absorberOptions);
      }
    } else {
      this.addAbsorber(this.absorbers);
    }
  }

  particleUpdate(particle) {
    for (const absorber of this.array) {
      absorber.attract(particle);

      if (particle.destroyed) {
        break;
      }
    }
  }

  removeAbsorber(absorber) {
    const index = this.array.indexOf(absorber);

    if (index >= 0) {
      this.array.splice(index, 1);
    }
  }

  resize() {
    for (const absorber of this.array) {
      absorber.resize();
    }
  }

  stop() {
    this.array = [];
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js



/**
 * @category Absorbers Plugin
 */

class AbsorbersPlugin {
  constructor() {
    this.id = "absorbers";
  }

  getPlugin(container) {
    return new Absorbers(container);
  }

  loadOptions(options, source) {
    var _a, _b;

    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    const optionsCast = options;

    if (source === null || source === void 0 ? void 0 : source.absorbers) {
      if ((source === null || source === void 0 ? void 0 : source.absorbers) instanceof Array) {
        optionsCast.absorbers = source === null || source === void 0 ? void 0 : source.absorbers.map(s => {
          const tmp = new Absorber();
          tmp.load(s);
          return tmp;
        });
      } else {
        let absorberOptions = optionsCast.absorbers;

        if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === undefined) {
          optionsCast.absorbers = absorberOptions = new Absorber();
        }

        absorberOptions.load(source === null || source === void 0 ? void 0 : source.absorbers);
      }
    }

    const interactivityAbsorbers = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;

    if (interactivityAbsorbers) {
      if (interactivityAbsorbers instanceof Array) {
        optionsCast.interactivity.modes.absorbers = interactivityAbsorbers.map(s => {
          const tmp = new Absorber();
          tmp.load(s);
          return tmp;
        });
      } else {
        let absorberOptions = optionsCast.interactivity.modes.absorbers;

        if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === undefined) {
          optionsCast.interactivity.modes.absorbers = absorberOptions = new Absorber();
        }

        absorberOptions.load(interactivityAbsorbers);
      }
    }
  }

  needsPlugin(options) {
    var _a, _b, _c;

    if (!options) {
      return false;
    }

    const absorbers = options.absorbers;

    if (absorbers instanceof Array) {
      return !!absorbers.length;
    } else if (absorbers) {
      return true;
    } else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("absorber"
    /* AbsorberClickMode.absorber */
    , options.interactivity.events.onClick.mode)) {
      return true;
    }

    return false;
  }

}

async function loadAbsorbersPlugin(engine) {
  const plugin = new AbsorbersPlugin();
  await engine.addPlugin(plugin);
}



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});