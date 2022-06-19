/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.1.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("object-gui"), require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["object-gui", "tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("object-gui"), require("tsparticles-engine")) : factory(root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__807__, __WEBPACK_EXTERNAL_MODULE__818__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 807:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__807__;

/***/ }),

/***/ 818:
/***/ (function(module) {

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "showEditor": function() { return /* binding */ showEditor; }
});

// EXTERNAL MODULE: external {"commonjs":"object-gui","commonjs2":"object-gui","amd":"object-gui","root":"window"}
var external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_ = __webpack_require__(807);
;// CONCATENATED MODULE: ./dist/browser/EditorBase.js
class EditorBase {
  constructor(particles) {
    this.particles = particles;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/BackgroundMask/BackgroundMaskOptionsEditor.js


class BackgroundMaskOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("backgroundMask", "Background Mask");
    this.options = this.group.data;
    this.addCover();
    this.addProperties();
  }

  addCover() {
    const particles = this.particles;
    const options = this.options.cover;
    const coverColor = options.color;
    const coverGroup = this.group.addGroup("cover", "Cover");
    coverGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, coverColor.value, false).change(async value => {
      if (typeof value === "string") {
        coverColor.value = value;
      }

      await particles.refresh();
    });
    coverGroup.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("composite", "Composite", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "source-over"
    }, {
      value: "source-in"
    }, {
      value: "source-out"
    }, {
      value: "source-atop"
    }, {
      value: "destination-over"
    }, {
      value: "destination-in"
    }, {
      value: "destination-out"
    }, {
      value: "destination-atop"
    }, {
      value: "lighter"
    }, {
      value: "copy"
    }, {
      value: "xor"
    }, {
      value: "multiply"
    }, {
      value: "screen"
    }, {
      value: "overlay"
    }, {
      value: "darken"
    }, {
      value: "lighten"
    }, {
      value: "color-dodge"
    }, {
      value: "color-burn"
    }, {
      value: "hard-light"
    }, {
      value: "soft-light"
    }, {
      value: "difference"
    }, {
      value: "exclusion"
    }, {
      value: "hue"
    }, {
      value: "saturation"
    }, {
      value: "color"
    }, {
      value: "luminosity"
    }]);
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Background/BackgroundOptionsEditor.js


class BackgroundOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("background", "Background");
    this.options = this.group.data;
    this.addColor();
    this.addProperties();
  }

  addColor() {
    const particles = this.particles;
    const options = this.options.color;
    this.group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, options.value, false).change(async value => {
      if (typeof value === "string") {
        options.value = value;
      }

      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("image", "Image", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    this.group.addProperty("position", "Position", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("repeat", "Repeat", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("size", "Size", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/FullScreen/FullScreenOptionsEditor.js


class FullScreenOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("fullScreen", "Full Screen");
    this.options = this.group.data;
    this.addProperties();
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("zIndex", "zIndex", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Infection/InfectionOptionsEditor.js


class InfectionOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("infection", "Infection");
    this.options = this.group.data;
    this.addStages();
    this.addProperties();
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("cure", "Cure", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("delay", "Delay", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("infections", "Infections", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addStages() {
    const particles = this.particles;
    const options = this.options;
    const stagesGroup = this.group.addGroup("stages", "Stages");

    for (let i = 0; i < options.stages.length; i++) {
      this.addStage(stagesGroup, options.stages, i + 1);
    }

    stagesGroup.addButton("addStage", "Add Stage", false).click(async () => {
      this.addStage(stagesGroup, options.stages, options.stages.length);
      await particles.refresh();
    });
  }

  addStage(parent, stages, index) {
    const particles = this.particles;
    const stageGroup = parent.addGroup(index.toString(10), `Stage ${index}`, true, stages);
    const stage = stageGroup.data;
    stageGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, stage.color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof stage.color === "string") {
          stage.color = value;
        } else {
          stage.color = {
            value
          };
        }
      }

      await particles.refresh();
    });
    stageGroup.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    stageGroup.addProperty("infectedStage", "Infected Stage", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    stageGroup.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    stageGroup.addProperty("rate", "Rate", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/Options/Classes/AbsorberSizeLimit.js
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
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/Options/Classes/AbsorberSize.js


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
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/Options/Classes/Absorber.js


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
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/AbsorberInstance.js


class AbsorberInstance {
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

  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(initialPosition, this.container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin) ? initialPosition : this.calcPosition();
  }

  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(0, 0, this.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(this.color, this.opacity);
    context.fill();
  }

  calcPosition() {
    const exactPosition = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calcPositionOrRandomFromSizeRanged)({
      size: this.container.canvas.size,
      position: this.options.position
    });
    return external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(exactPosition.x, exactPosition.y);
  }

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
        particle.absorberOrbitDirection = particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise";
      }

      const orbitRadius = particle.absorberOrbit.length,
            orbitAngle = particle.absorberOrbit.angle,
            orbitDirection = particle.absorberOrbitDirection;
      particle.velocity.setTo(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin);
      const updateFunc = {
        x: orbitDirection === "clockwise" ? Math.cos : Math.sin,
        y: orbitDirection === "clockwise" ? Math.sin : Math.cos
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
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/Absorbers.js



class Absorbers {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.absorbers = [];
    this.interactivityAbsorbers = [];

    container.getAbsorber = idxOrName => idxOrName === undefined || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find(t => t.name === idxOrName);

    container.addAbsorber = (options, position) => this.addAbsorber(options, position);
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

  draw(context) {
    for (const absorber of this.array) {
      context.save();
      absorber.draw(context);
      context.restore();
    }
  }

  stop() {
    this.array = [];
  }

  resize() {
    for (const absorber of this.array) {
      absorber.resize();
    }
  }

  handleClickMode(mode) {
    const absorberOptions = this.absorbers,
          modeAbsorbers = this.interactivityAbsorbers;

    if (mode === "absorber") {
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

  addAbsorber(options, position) {
    const absorber = new AbsorberInstance(this, this.container, options, position);
    this.array.push(absorber);
    return absorber;
  }

  removeAbsorber(absorber) {
    const index = this.array.indexOf(absorber);

    if (index >= 0) {
      this.array.splice(index, 1);
    }
  }

}
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/index.js




class AbsorbersPlugin {
  constructor() {
    this.id = "absorbers";
  }

  getPlugin(container) {
    return new Absorbers(container);
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
    } else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("absorber", options.interactivity.events.onClick.mode)) {
      return true;
    }

    return false;
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

}

async function loadAbsorbersPlugin(engine) {
  const plugin = new AbsorbersPlugin();
  await engine.addPlugin(plugin);
}



;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Shapes/Circle/CircleShape.js
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Options/Classes/EmitterLife.js
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Options/Classes/EmitterRate.js

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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Options/Classes/EmitterSize.js
class EmitterSize {
  constructor() {
    this.mode = "percent";
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Options/Classes/Emitter.js




class Emitter {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = "square";
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
      if (data.particles instanceof Array) {
        this.particles = data.particles.map(s => {
          return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, s);
        });
      } else {
        this.particles = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, data.particles);
      }
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/EmitterInstance.js
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
      this.spawnColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(this.options.spawnColor);
    }

    this.paused = !this.options.autoPlay;
    this.particlesOptions = particlesOptions;
    this.size = (_f = this.options.size) !== null && _f !== void 0 ? _f : (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: "percent",
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
      width: this.size.mode === "percent" ? container.canvas.size.width * this.size.width / 100 : this.size.width,
      height: this.size.mode === "percent" ? container.canvas.size.height * this.size.height / 100 : this.size.height
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
          size = this.getSize(),
          singleParticlesOptions = this.particlesOptions instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(this.particlesOptions) : this.particlesOptions;

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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Emitters.js
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




class Emitters {
  constructor(engine, container) {
    this.container = container;

    _Emitters_engine.set(this, void 0);

    Emitters_classPrivateFieldSet(this, _Emitters_engine, engine, "f");

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

  init(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;

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

    if (mode === "emitter") {
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

      if (emittersOptions instanceof Array) {
        for (const emitterOptions of emittersOptions) {
          this.addEmitter(emitterOptions, ePosition);
        }
      } else {
        this.addEmitter((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, emittersOptions), ePosition);
      }
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/ShapeManager.js
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Shapes/Square/SquareShape.js
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/index.js
var esm_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var esm_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _EmittersPlugin_engine;








class EmittersPlugin {
  constructor(engine) {
    _EmittersPlugin_engine.set(this, void 0);

    esm_classPrivateFieldSet(this, _EmittersPlugin_engine, engine, "f");

    this.id = "emitters";
  }

  getPlugin(container) {
    return new Emitters(esm_classPrivateFieldGet(this, _EmittersPlugin_engine, "f"), container);
  }

  needsPlugin(options) {
    var _a, _b, _c;

    if (!options) {
      return false;
    }

    const emitters = options.emitters;
    return emitters instanceof Array && !!emitters.length || emitters !== undefined || !!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("emitter", options.interactivity.events.onClick.mode);
  }

  loadOptions(options, source) {
    var _a, _b, _c, _d, _e, _f;

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
  engine.addEmitterShape("circle", new CircleShape());
  engine.addEmitterShape("square", new SquareShape());
}





;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Interactivity/Events/ClickEventsOptionsEditor.js




class ClickEventsOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("onClick", "Click Events");
    this.options = this.group.data;
    this.addProperties();
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    const modeSelectInput = this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "attract"
      /* ClickMode.attract */

    }, {
      value: "bubble"
      /* ClickMode.bubble */

    }, {
      value: "pause"
      /* ClickMode.pause */

    }, {
      value: "push"
      /* ClickMode.push */

    }, {
      value: "remove"
      /* ClickMode.remove */

    }, {
      value: "repulse"
      /* ClickMode.repulse */

    }, {
      value: "trail"
      /* ClickMode.trail */

    }]);

    if (typeof loadAbsorbersPlugin !== "undefined") {
      const absorbersGroup = "Absorbers";
      modeSelectInput.addItemGroup(absorbersGroup);
      modeSelectInput.addItem("absorber", undefined, absorbersGroup);
    }

    if (typeof loadEmittersPlugin !== "undefined") {
      const emittersGroup = "Emitters";
      modeSelectInput.addItemGroup(emittersGroup);
      modeSelectInput.addItem("emitter", undefined, emittersGroup);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Interactivity/Events/DivsEventsOptionsEditor.js


class DivsEventsOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("onDiv", "Divs Events");
    this.options = this.group.data;
    this.addDivs();

    if (this.options instanceof Array) {
      this.group.addButton("addDiv", "Add Div", false).click(async () => {
        const arr = this.options;
        const divGroup = this.group.addGroup(arr.length.toString(10), `Div ${arr.length + 1}`, true, this.options);
        this.addDiv(divGroup);
        await this.particles.refresh();
      });
    }
  }

  addDivs() {
    const options = this.options;

    if (options instanceof Array) {
      for (let i = 0; i < options.length; i++) {
        const group = this.group.addGroup(i.toString(10), `Div_${i + 1}`, true, options);
        this.addDiv(group);
      }
    } else {
      this.addDiv(this.group);
    }
  }

  addDiv(group) {
    const particles = this.particles;
    const options = group.data;

    if (options.selectors instanceof Array) {
      const selectorsGroup = group.addGroup("selectors", "Selectors");
      selectorsGroup.addButton("addSelector", "Add Selector", false).click(async () => {
        const arr = options.selectors;
        selectorsGroup.addProperty(arr.length.toString(10), `Selector ${arr.length + 1}`, external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
          await particles.refresh();
        });
        await this.particles.refresh();
      });
    } else {
      group.addProperty("selectors", "Selectors", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
        await particles.refresh();
      });
    }

    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "bounce"
      /* DivMode.bounce */

    }, {
      value: "bubble"
      /* DivMode.bubble */

    }, {
      value: "repulse"
      /* DivMode.repulse */

    }]);
    group.addProperty("type", "Type", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "circle"
      /* DivType.circle */

    }, {
      value: "rectangle"
      /* DivType.rectangle */

    }]);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Interactivity/Events/HoverEventsOptionsEditor.js


class HoverEventsOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("onHover", "Hover Events");
    this.options = this.group.data;
    this.addParallax();
    this.addProperties();
  }

  addParallax() {
    const particles = this.particles;
    const parallax = this.group.addGroup("parallax", "Parallax");
    parallax.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    parallax.addProperty("force", "Force", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    parallax.addProperty("smooth", "Smooth", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "attract"
      /* HoverMode.attract */

    }, {
      value: "bubble"
      /* HoverMode.bubble */

    }, {
      value: "connect"
      /* HoverMode.connect */

    }, {
      value: "grab"
      /* HoverMode.grab */

    }, {
      value: "light"
      /* HoverMode.light */

    }, {
      value: "repulse"
      /* HoverMode.repulse */

    }, {
      value: "slow"
      /* HoverMode.slow */

    }, {
      value: "trail"
      /* HoverMode.trail */

    }]);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Interactivity/Events/EventsOptionsEditor.js





class EventsOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("events", "Events");
    this.options = this.group.data;
    this.addClick();
    this.addDivs();
    this.addHover();
    this.addProperties();
  }

  addClick() {
    const clickEditor = new ClickEventsOptionsEditor(this.particles);
    clickEditor.addToGroup(this.group);
  }

  addDivs() {
    const divsEditor = new DivsEventsOptionsEditor(this.particles);
    divsEditor.addToGroup(this.group);
  }

  addHover() {
    const hoverEditor = new HoverEventsOptionsEditor(this.particles);
    hoverEditor.addToGroup(this.group);
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("resize", "Resize", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Bounce/BounceOptionsEditor.js


class BounceOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("bounce", "Bounce");
    this.options = this.group.data;
    this.addFactors();
  }

  addFactors() {
    this.addFactor("horizontal", "Horizontal");
    this.addFactor("vertical", "Vertical");
  }

  addFactor(name, title) {
    const particles = this.particles;
    const group = this.group.addGroup(name, title);
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Collisions/CollisionsOptionsEditor.js


class CollisionsOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("collisions", "Collisions");
    this.options = this.group.data;
    this.addBounce();
    this.addOverlap();
    this.addProperties();
  }

  addBounce() {
    const group = this.group.addGroup("bounce", "Bounce");
    this.addBounceFactor(group, "horizontal", "Horizontal");
    this.addBounceFactor(group, "vertical", "Vertical");
  }

  addBounceFactor(parentGroup, name, title) {
    const particles = this.particles;
    const group = parentGroup.addGroup(name, title);
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addOverlap() {
    const particles = this.particles;
    const group = this.group.addGroup("overlap", "Overlap");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("retries", "Retries", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "absorb"
      /* CollisionMode.absorb */

    }, {
      value: "bounce"
      /* CollisionMode.bounce */

    }, {
      value: "destroy"
      /* CollisionMode.destroy */

    }]);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Color/ColorOptionsEditor.js


class ColorOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent, options) {
    this.group = parent.addGroup("color", "Color", true, options);
    this.options = this.group.data;
    this.addAnimation();
    this.addProperties();
  }

  addAnimation() {
    const particles = this.particles;
    const group = this.group.addGroup("animation", "Animation");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Destroy/DestroyOptionsEditor.js


class DestroyOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("destroy", "Destroy");
    this.options = this.group.data;
    this.addSplit();
    this.addProperties();
  }

  addSplit() {
    const group = this.group.addGroup("split", "Split");
    const particles = this.particles;
    const factorGroup = group.addGroup("factor", "Factor");
    const randomFactorGroup = factorGroup.addGroup("random", "Random");
    randomFactorGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomFactorGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    factorGroup.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    const rateGroup = group.addGroup("rate", "Rate");
    const randomRateGroup = rateGroup.addGroup("random", "Random");
    randomRateGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomRateGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    rateGroup.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("count", "Count", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      particles.refresh();
    });
  }

  addProperties() {
    const group = this.group;
    const particles = this.particles;
    group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      particles.refresh();
    }).addItems([{
      value: "none"
      /* DestroyMode.none */

    }, {
      value: "split"
      /* DestroyMode.split */

    }]);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Life/LifeOptionsEditor.js


class LifeOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent, options) {
    this.group = parent.addGroup("life", "Life", true, options);
    this.options = this.group.data;
    this.addDelay();
    this.addDuration();
    this.addProperties();
  }

  addDelay() {
    const particles = this.particles;
    const group = this.group.addGroup("delay", "Delay");
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomGroup.addProperty("minimumValue", "MinimumValue", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addDuration() {
    const particles = this.particles;
    const group = this.group.addGroup("duration", "Duration");
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomGroup.addProperty("minimumValue", "MinimumValue", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("count", "Count", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Links/LinksOptionsEditor.js


class LinksOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("links", "Links");
    this.options = this.group.data;
    this.addShadow();
    this.addTriangles();
    this.addProperties();
  }

  addShadow() {
    var _a;

    const particles = this.particles;
    const group = this.group.addGroup("shadow", "Shadow");
    const options = group.data;
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("blur", "Blur", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          if (options.color === undefined) {
            options.color = {
              value: value
            };
          } else {
            options.color.value = value;
          }
        }
      }

      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addTriangles() {
    var _a;

    const particles = this.particles;
    const group = this.group.addGroup("triangles", "Triangles");
    const options = this.options.triangles;
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          if (options.color === undefined) {
            options.color = {
              value: value
            };
          } else {
            options.color.value = value;
          }
        }
      }

      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("frequency", "Frequency", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).min(0).max(1).step(0.01).change(async () => {
      await particles.refresh();
    });
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
  }

  addProperties() {
    var _a;

    const particles = this.particles;
    const options = this.options;
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    this.group.addProperty("blink", "Blink", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color.value = value;
        }

        await particles.refresh();
      }
    });
    this.group.addProperty("consent", "Consent", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("frequency", "Frequency", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).min(0).max(1).step(0.01).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("id", "Id", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    this.group.addProperty("warp", "Warp", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("width", "Width", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Move/MoveOptionsEditor.js


class MoveOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("move", "Move");
    this.options = this.group.data;
    this.addAngle();
    this.addAttract();
    this.addDistance();
    this.addGravity();
    this.addOutModes();
    this.addPath();
    this.addTrail();
    this.addProperties();
  }

  addAngle() {
    const particles = this.particles;
    const group = this.group.addGroup("angle", "Angle");
    group.addProperty("offset", "Offset", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addAttract() {
    const particles = this.particles;
    const group = this.group.addGroup("attract", "Attract");
    const rotateGroup = group.addGroup("rotate", "Rotate", false);
    rotateGroup.addProperty("x", "X", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    rotateGroup.addProperty("y", "Y", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addDistance() {
    const particles = this.particles;
    const group = this.group.addGroup("distance", "Distance");
    group.addProperty("horizontal", "Horizontal", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("vertical", "Vertical", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addGravity() {
    const particles = this.particles;
    const group = this.group.addGroup("gravity", "Gravity");
    group.addProperty("acceleration", "Acceleration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("maxSpeed", "Max Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addOutModes() {
    const particles = this.particles;
    const group = this.group.addGroup("outModes", "Out Modes");
    const outModesValues = [{
      value: "bounce"
      /* OutMode.bounce */

    }, {
      value: "destroy"
      /* OutMode.destroy */

    }, {
      value: "none"
      /* OutMode.none */

    }, {
      value: "split"
      /* OutMode.split */

    }, {
      value: "out"
      /* OutMode.out */

    }];
    group.addProperty("bottom", "Bottom", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems(outModesValues);
    group.addProperty("default", "Default", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems(outModesValues);
    group.addProperty("left", "Left", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems(outModesValues);
    group.addProperty("right", "Right", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems(outModesValues);
    group.addProperty("top", "Top", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems(outModesValues);
  }

  addPath() {
    const particles = this.particles;
    const group = this.group.addGroup("path", "Path");
    const delayGroup = group.addGroup("delay", "Delay");
    delayGroup.addProperty("value", "value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    const randomGroup = delayGroup.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    randomGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("clamp", "Clamp", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("generator", "Generator", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await particles.refresh();
    });
  }

  addTrail() {
    var _a;

    const particles = this.particles;
    const group = this.group.addGroup("trail", "Trail");
    const options = group.data;
    const color = typeof options.fillColor === "string" ? options.fillColor : (_a = options.fillColor) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("fillColor", "Fill Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.fillColor === "string") {
          options.fillColor = value;
        } else {
          if (options.fillColor === undefined) {
            options.fillColor = {
              value: value
            };
          } else {
            options.fillColor.value = value;
          }
        }
      }

      await particles.refresh();
    });
    group.addProperty("length", "Length", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    const group = this.group;
    group.addProperty("direction", "Direction", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "bottom"
      /* MoveDirection.bottom */

    }, {
      value: "bottom-left"
      /* MoveDirection.bottomLeft */

    }, {
      value: "bottom-right"
      /* MoveDirection.bottomRight */

    }, {
      value: "left"
      /* MoveDirection.left */

    }, {
      value: "none"
      /* MoveDirection.none */

    }, {
      value: "right"
      /* MoveDirection.right */

    }, {
      value: "top"
      /* MoveDirection.top */

    }, {
      value: "top-left"
      /* MoveDirection.topLeft */

    }, {
      value: "top-right"
      /* MoveDirection.topRight */

    }]);
    group.addProperty("drift", "Drift", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("random", "Random", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("size", "Size", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("straight", "Straight", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("vibrate", "Vibrate", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("warp", "Warp", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Number/NumberOptionsEditor.js


class NumberOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("number", "Number");
    this.options = this.group.data;
    this.addDensity();
    this.addProperties();
  }

  addDensity() {
    const particles = this.particles;
    const group = this.group.addGroup("density", "Density");
    group.addProperty("area", "Area", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("limit", "Limit", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("max", "Max", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Opacity/OpacityOptionsEditor.js


class OpacityOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent, options) {
    this.group = parent.addGroup("opacity", "Opacity", true, options);
    this.options = this.group.data;
    this.addAnimation();
    this.addRandom();
    this.addProperties();
  }

  addAnimation() {
    const particles = this.particles;
    const group = this.group.addGroup("animation", "Animation");
    group.addProperty("destroy", "Destroy", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "max"
      /* DestroyType.max */

    }, {
      value: "min"
      /* DestroyType.min */

    }, {
      value: "none"
      /* DestroyType.none */

    }]);
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).min(0).max(0).step(0.01);
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01);
    group.addProperty("startValue", "Start Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "max"
      /* StartValueType.max */

    }, {
      value: "min"
      /* StartValueType.min */

    }, {
      value: "random"
      /* StartValueType.random */

    }]);
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addRandom() {
    const particles = this.particles;
    const group = this.group.addGroup("random", "Random");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).min(0).max(1).step(0.01);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Roll/RollOptionsEditor.js


class RollOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("roll", "Roll");
    this.options = this.group.data;
    this.addDarken();
    this.addEnlighten();
    this.addProperties();
  }

  addDarken() {
    const particles = this.particles;
    const group = this.group.addGroup("darken", "Darken");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addEnlighten() {
    const particles = this.particles;
    const group = this.group.addGroup("enlighten", "Enlighten");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    var _a;

    const particles = this.particles,
          options = this.options,
          color = typeof options.backColor === "string" ? options.backColor : options.backColor instanceof Array ? options.backColor[0] : (_a = options.backColor) === null || _a === void 0 ? void 0 : _a.value;
    this.group.addProperty("backColor", "Back Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.backColor === "string") {
          options.backColor = value;
        } else {
          if (options.backColor === undefined) {
            options.backColor = {
              value: value
            };
          } else {
            if (options.backColor instanceof Array) {
              options.backColor = {
                value: value
              };
            } else {
              options.backColor.value = value;
            }
          }
        }
      }

      await particles.refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Rotate/RotateOptionsEditor.js


class RotateOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("rotate", "Rotate");
    this.options = this.group.data;
    this.addAnimation();
    this.addProperties();
  }

  addAnimation() {
    const group = this.group.addGroup("animation", "Animation");
    const particles = this.particles;
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("direction", "Direction", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "clockwise"
      /* RotateDirection.clockwise */

    }, {
      value: "counter-clockwise"
      /* RotateDirection.counterClockwise */

    }, {
      value: "random"
      /* RotateDirection.random */

    }]);
    this.group.addProperty("path", "Path", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("random", "Random", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Shadow/ShadowOptionsEditor.js


class ShadowOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("shadow", "Shadow");
    this.options = this.group.data;
    this.addOffset();
    this.addProperties();
  }

  addOffset() {
    const particles = this.particles;
    const group = this.group.addGroup("offset", "Offset");
    group.addProperty("x", "X", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("y", "Y", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    var _a;

    const particles = this.particles;
    const options = this.options;
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    this.group.addProperty("blur", "Blur", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color.value = value;
        }
      }

      await particles.refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Shape/ShapeOptionsEditor.js


class ShapeOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("shape", "Shape");
    this.options = this.group.data;
    this.addProperties();
  }

  addProperties() {
    const particles = this.particles;
    const selectType = this.group.addProperty("type", "Type", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    });

    for (const key of particles.drawers.keys()) {
      selectType.addItem(key);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Size/SizeOptionsEditor.js


class SizeOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("size", "Size");
    this.options = this.group.data;
    this.addAnimation();
    this.addRandom();
    this.addProperties();
  }

  addAnimation() {
    const particles = this.particles;
    const group = this.group.addGroup("animation", "Animation");
    group.addProperty("destroy", "Destroy", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "max"
      /* DestroyType.max */

    }, {
      value: "min"
      /* DestroyType.min */

    }, {
      value: "none"
      /* DestroyType.none */

    }]);
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("startValue", "Start Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "max"
      /* StartValueType.max */

    }, {
      value: "min"
      /* StartValueType.min */

    }, {
      value: "random"
      /* StartValueType.random */

    }]);
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addRandom() {
    const group = this.group.addGroup("random", "Random");
    const particles = this.particles;
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Stroke/StrokeOptionsEditor.js



class StrokeOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("stroke", "Stroke");
    this.options = this.group.data;

    if (this.options instanceof Array) {
      for (let i = 0; i < this.options.length; i++) {
        const group = this.group.addGroup(i.toString(10), `Stroke_${i + 1}`, true, this.options);
        this.addStroke(group);
      }
    } else {
      this.addStroke(this.group);
    }
  }

  addStroke(group) {
    const particles = this.particles;
    const options = group.data;

    if (options.color === undefined) {
      options.color = {
        value: "",
        animation: {
          count: 0,
          enable: false,
          offset: {
            max: 0,
            min: 0
          },
          speed: 0,
          decay: 0,
          sync: false
        }
      };
    }

    const colorOptions = new ColorOptionsEditor(this.particles);
    colorOptions.addToGroup(group, options);
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("width", "Width", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Tilt/TiltOptionsEditor.js


class TiltOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("tilt", "Tilt");
    this.options = this.group.data;
    this.addAnimation();
    this.addProperties();
  }

  addAnimation() {
    const group = this.group.addGroup("animation", "Animation");
    const particles = this.particles;
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("direction", "Direction", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "clockwise"
    }, {
      value: "counterClockwise"
    }, {
      value: "random"
    }]);
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("random", "Random", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Twinkle/TwinkleOptionsEditor.js


class TwinkleOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent, options) {
    this.group = parent.addGroup("twinkle", "Twinkle", true, options);
    this.options = this.group.data;
    this.addTwinkle();
  }

  addTwinkle() {
    this.addTwinkleValues(this.group.addGroup("lines", "Lines"));
    this.addTwinkleValues(this.group.addGroup("particles", "Particles"));
  }

  addTwinkleValues(group) {
    var _a;

    const particles = this.particles;
    const options = group.data;
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color = {
            value
          };
        }
      }

      await particles.refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("frequency", "Frequency", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/Wobble/WobbleOptionsEditor.js


class WobbleOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("wobble", "Wobble");
    this.options = this.group.data;
    this.addProperties();
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/ParticlesOptionsEditor.js




















class ParticlesOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent, customName, parentData) {
    this.group = parent.addGroup(customName !== null && customName !== void 0 ? customName : "particles", "Particles", true, parentData);
    this.options = this.group.data;
    this.addBounce();
    this.addCollisions();
    this.addColor();
    this.addDestroy();
    this.addLife();
    this.addLinks();
    this.addMove();
    this.addNumber();
    this.addOpacity();
    this.addRoll();
    this.addRotate();
    this.addShadow();
    this.addShape();
    this.addSize();
    this.addStroke();
    this.addTilt();
    this.addTwinkle();
    this.addWobble();
    this.addProperties();
  }

  addBounce() {
    const options = new BounceOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addCollisions() {
    const options = new CollisionsOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addColor() {
    const options = new ColorOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addDestroy() {
    const options = new DestroyOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addLife() {
    const options = new LifeOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addLinks() {
    const options = new LinksOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addMove() {
    const options = new MoveOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addNumber() {
    const options = new NumberOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addOpacity() {
    const options = new OpacityOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addRoll() {
    const options = new RollOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addRotate() {
    const options = new RotateOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addShadow() {
    const options = new ShadowOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addShape() {
    const options = new ShapeOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addSize() {
    const options = new SizeOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addStroke() {
    const options = new StrokeOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addTilt() {
    const options = new TiltOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addTwinkle() {
    const options = new TwinkleOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addWobble() {
    const options = new WobbleOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("reduceDuplicates", "Reduce Duplicates", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Interactivity/Modes/ModesOptionsEditor.js



class ModesOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("modes", "Modes");
    this.options = this.group.data;
    this.addAttract();
    this.addBubble();
    this.addConnect();
    this.addGrab();
    this.addLight();
    this.addPush();
    this.addRemove();
    this.addRepulse();
    this.addSlow();
    this.addTrail();
  }

  addAttract() {
    const particles = this.particles;
    const group = this.group.addGroup("attract", "Attract");
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("easing", "Easing", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "ease-out-back"
      /* EasingType.easeOutBack */

    }, {
      value: "ease-out-circ"
      /* EasingType.easeOutCirc */

    }, {
      value: "ease-out-cubic"
      /* EasingType.easeOutCubic */

    }, {
      value: "ease-out-expo"
      /* EasingType.easeOutExpo */

    }, {
      value: "ease-out-quad"
      /* EasingType.easeOutQuad */

    }, {
      value: "ease-out-quint"
      /* EasingType.easeOutQuint */

    }, {
      value: "ease-out-sine"
      /* EasingType.easeOutSine */

    }]);
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("maxSpeed", "Max Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addBubble() {
    var _a;

    const particles = this.particles;
    const options = this.options.bubble;
    const group = this.group.addGroup("bubble", "Bubble");
    const color = typeof options.color === "string" ? options.color : options.color instanceof Array ? undefined : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color = {
            value
          };
        }
      }

      await particles.refresh();
    });
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("size", "Size", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addConnect() {
    const particles = this.particles;
    const group = this.group.addGroup("connect", "Connect");
    const connectLinksGroup = group.addGroup("links", "Links");
    connectLinksGroup.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addGrab() {
    var _a;

    const particles = this.particles;
    const options = this.options.grab;
    const group = this.group.addGroup("grab", "Grab");
    const grabLinksGroup = group.addGroup("links", "Links");
    const links = options.links;
    const color = typeof links.color === "string" ? links.color : (_a = links.color) === null || _a === void 0 ? void 0 : _a.value;
    grabLinksGroup.addProperty("blink", "Blink", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    grabLinksGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.links.color === "string") {
          options.links.color = value;
        } else {
          options.links.color = {
            value
          };
        }

        await particles.refresh();
      }
    });
    grabLinksGroup.addProperty("consent", "Consent", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    grabLinksGroup.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addLight() {
    var _a, _b, _c;

    const particles = this.particles;
    const options = this.options.light;
    const group = this.group.addGroup("light", "Light");
    const areaGroup = group.addGroup("area", "Light");
    const gradientGroup = areaGroup.addGroup("gradient", "Gradient");
    const startColor = typeof options.area.gradient.start === "string" ? options.area.gradient.start : (_a = options.area.gradient.start) === null || _a === void 0 ? void 0 : _a.value;
    gradientGroup.addProperty("start", "Start", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, startColor, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.area.gradient.start === "string") {
          options.area.gradient.start = value;
        } else {
          options.area.gradient.start = {
            value
          };
        }
      }

      await particles.refresh();
    });
    const stopColor = typeof options.area.gradient.stop === "string" ? options.area.gradient.stop : (_b = options.area.gradient.stop) === null || _b === void 0 ? void 0 : _b.value;
    gradientGroup.addProperty("stop", "Stop", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, stopColor, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.area.gradient.stop === "string") {
          options.area.gradient.stop = value;
        } else {
          options.area.gradient.stop = {
            value
          };
        }
      }

      await particles.refresh();
    });
    areaGroup.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    const shadowGroup = group.addGroup("shadow", "Shadow");
    const shadowColor = typeof options.shadow.color === "string" ? options.shadow.color : (_c = options.shadow.color) === null || _c === void 0 ? void 0 : _c.value;
    shadowGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, shadowColor, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.shadow.color === "string") {
          options.shadow.color = value;
        } else {
          options.shadow.color = {
            value
          };
        }
      }

      await particles.refresh();
    });
    shadowGroup.addProperty("length", "Length", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addPush() {
    const particles = this.particles;
    const group = this.group.addGroup("push", "Push");
    group.addProperty("quantity", "Quantity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addRemove() {
    const particles = this.particles;
    const group = this.group.addGroup("remove", "Remove");
    group.addProperty("quantity", "Quantity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addRepulse() {
    const particles = this.particles;
    const group = this.group.addGroup("repulse", "Repulse");
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("easing", "Easing", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "ease-out-back"
      /* EasingType.easeOutBack */

    }, {
      value: "ease-out-circ"
      /* EasingType.easeOutCirc */

    }, {
      value: "ease-out-cubic"
      /* EasingType.easeOutCubic */

    }, {
      value: "ease-out-expo"
      /* EasingType.easeOutExpo */

    }, {
      value: "ease-out-quad"
      /* EasingType.easeOutQuad */

    }, {
      value: "ease-out-quint"
      /* EasingType.easeOutQuint */

    }, {
      value: "ease-out-sine"
      /* EasingType.easeOutSine */

    }]);
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("maxSpeed", "Max Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addSlow() {
    const particles = this.particles;
    const group = this.group.addGroup("slow", "Slow");
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

  addTrail() {
    const particles = this.particles;
    const group = this.group.addGroup("trail", "Trail");
    const options = this.options.trail;
    const particlesEditor = new ParticlesOptionsEditor(particles);
    particlesEditor.addToGroup(group, "particles", options);
    group.addProperty("delay", "Delay", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    group.addProperty("pauseOnStop", "Pause on Stop", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    group.addProperty("quantity", "Quantity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Interactivity/InteractivityOptionsEditor.js




class InteractivityOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("interactivity", "Interactivity");
    this.options = this.group.data;
    this.addEvents();
    this.addModes();
    this.addProperties();
  }

  addModes() {
    const options = new ModesOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addEvents() {
    const options = new EventsOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("detectsOn", "Detects On", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await particles.refresh();
    }).addItems([{
      value: "canvas"
      /* InteractivityDetect.canvas */

    }, {
      value: "parent"
      /* InteractivityDetect.parent */

    }, {
      value: "window"
      /* InteractivityDetect.window */

    }]);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Motion/MotionOptionsEditor.js


class MotionOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("motion", "Motion");
    this.options = this.group.data;
    this.addReduce();
    this.addProperties();
  }

  addReduce() {
    const particles = this.particles;
    const coverGroup = this.group.addGroup("reduce", "Reduce");
    coverGroup.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    }).step(1);
    coverGroup.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("disable", "Disable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/OptionsEditor.js









class OptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }

  addToGroup(parent) {
    this.group = parent.addGroup("options", "Options", true);
    this.options = this.group.data;
    this.addBackground();
    this.addBackgroundMask();
    this.addFullScreen();
    this.addInfection();
    this.addInteractivity();
    this.addMotion();
    this.addParticles();
    this.addProperties();
  }

  addProperties() {
    const particles = this.particles;
    this.group.addProperty("autoPlay", "Auto Play", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("detectRetina", "Detect Retina", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("fpsLimit", "FPS Limit", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("pauseOnBlur", "Pause on Blur", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
    this.group.addProperty("pauseOnOutsideViewport", "Pause on Outside Viewport", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await particles.refresh();
    });
  }

  addBackground() {
    const options = new BackgroundOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addBackgroundMask() {
    const options = new BackgroundMaskOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addFullScreen() {
    const options = new FullScreenOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addInfection() {
    const options = new InfectionOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addInteractivity() {
    const options = new InteractivityOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addMotion() {
    const options = new MotionOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

  addParticles() {
    const options = new ParticlesOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }

}
;// CONCATENATED MODULE: ./dist/browser/ParticlesEditor.js


class ParticlesEditor extends external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.Editor {
  constructor(particles) {
    super(particles.id, "tsParticles", particles);
    this.particles = particles;
  }

  customize() {
    super.customize();
    this.addOptions();
    this.addButtons();
    this.addPresets();
  }

  addPreset(text, file) {
    if (!this._presets) {
      return;
    }

    this._presets.addItem(file, text);
  }

  addOptions() {
    const options = new OptionsEditor(this.data);
    options.addToGroup(this);
  }

  addButtons() {
    this.addButton("play", "Play");
    this.addButton("pause", "Pause");
    this.addButton("refresh", "Refresh");
    this.addButton("start", "Start");
    this.addButton("stop", "Stop");
    this.addButton("exportConfig", "Export", false).click(() => {
      const json = this.particles.exportConfiguration();
      const contentType = "application/json";
      const blob = new Blob([json], {
        type: contentType
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "particles.json";
      a.href = url;
      a.dataset.downloadUrl = [contentType, a.download, a.href].join(":");
      const e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    });
  }

  addPresets() {
    this._presets = this.addProperty("preset", "Preset", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select, "", false);

    this._presets.change(async value => {
      try {
        const res = await fetch(value);

        if (!res.ok) {
          return;
        }

        await this.particles.reset();
        this.particles.options.load(await res.json());
        await this.particles.refresh();
      } catch (_a) {// ignore
      }
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

function showEditor(container) {
  return new ParticlesEditor(container);
}
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});