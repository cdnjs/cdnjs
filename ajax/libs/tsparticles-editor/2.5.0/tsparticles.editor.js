/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.5.0
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
})(this, (__WEBPACK_EXTERNAL_MODULE__807__, __WEBPACK_EXTERNAL_MODULE__818__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 807:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__807__;

/***/ }),

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
  "showEditor": () => (/* binding */ showEditor)
});

// EXTERNAL MODULE: external {"commonjs":"object-gui","commonjs2":"object-gui","amd":"object-gui","root":"window"}
var external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_ = __webpack_require__(807);
;// CONCATENATED MODULE: ./dist/browser/Utils.js
const changeHandler = async (container, callback) => {
  if (callback) {
    callback(container);
  }
  await container.refresh();
};
const editorChangedEvent = "editorChanged";

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/EditorBase.js


class EditorBase {
  constructor(particles) {
    this.particles = particles;
  }
  notifyEditorChanged() {
    external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.dispatchEvent(editorChangedEvent, {
      container: this.particles()
    });
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
    const options = this.options().cover;
    const coverColor = options.color;
    const coverGroup = this.group.addGroup("cover", "Cover");
    coverGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, coverColor.value, false).change(async value => {
      if (typeof value === "string") {
        coverColor.value = value;
      }
      await this.particles().refresh();
    });
    coverGroup.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
  }
  addProperties() {
    this.group.addProperty("composite", "Composite", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
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
      await this.particles().refresh();
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
    const options = this.options().color;
    this.group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, options.value, false).change(async value => {
      const options = this.options().color;
      if (typeof value === "string") {
        options.value = value;
      }
      this.notifyEditorChanged();
    });
  }
  addProperties() {
    this.group.addProperty("image", "Image", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    this.group.addProperty("position", "Position", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("repeat", "Repeat", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("size", "Size", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await this.particles().refresh();
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
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("zIndex", "zIndex", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    this.group.addProperty("cure", "Cure", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("delay", "Delay", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("infections", "Infections", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addStage(parent, stages, index) {
    const stageGroup = parent.addGroup(index().toString(10), `Stage ${index}`, true, stages);
    const stage = stageGroup.data;
    stageGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, stage().color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof stage().color === "string") {
          stage().color = value;
        } else {
          stage().color = {
            value
          };
        }
      }
      await this.particles().refresh();
    });
    stageGroup.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    stageGroup.addProperty("infectedStage", "Infected Stage", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    stageGroup.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    stageGroup.addProperty("rate", "Rate", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addStages() {
    const options = this.options();
    const stagesGroup = this.group.addGroup("stages", "Stages");
    if (options && !options.stages) {
      options.stages = [];
    }
    if (options) {
      for (let i = 0; i < options.stages.length; i++) {
        this.addStage(stagesGroup, () => options.stages, () => i + 1);
      }
    }
    stagesGroup.addButton("addStage", "Add Stage", false).click(async () => {
      this.addStage(stagesGroup, () => this.options().stages, () => this.options().stages.length);
      await this.particles().refresh();
    });
  }
}
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
  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(0, 0, this.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(this.color, this.opacity);
    context.fill();
  }
  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(initialPosition, this.container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin) ? initialPosition : this.calcPosition();
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
        particle.absorberOrbit.angle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * Math.PI * 2;
      }
      if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
        const minSize = Math.min(canvasSize.width, canvasSize.height);
        particle.absorberOrbit.length = minSize * (1 + ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 0.2 - 0.1));
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
  addAbsorber(options, position) {
    const absorber = new AbsorberInstance(this, this.container, options, position);
    this.array.push(absorber);
    return absorber;
  }
  draw(context) {
    for (const absorber of this.array) {
      absorber.draw(context);
    }
  }
  handleClickMode(mode) {
    const absorberOptions = this.absorbers,
      modeAbsorbers = this.interactivityAbsorbers;
    if (mode === "absorber") {
      const absorbersModeOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(modeAbsorbers),
        absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(absorberOptions),
        aPosition = this.container.interactivity.mouse.clickPosition;
      this.addAbsorber(absorbersOptions, aPosition);
    }
  }
  async init() {
    this.absorbers = this.container.actualOptions.absorbers;
    this.interactivityAbsorbers = this.container.actualOptions.interactivity.modes.absorbers;
    (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(this.absorbers, absorber => {
      this.addAbsorber(absorber);
    });
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
;// CONCATENATED MODULE: ../plugins/absorbers/dist/esm/index.js



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
    if (source === null || source === void 0 ? void 0 : source.absorbers) {
      options.absorbers = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(source.absorbers, absorber => {
        const tmp = new Absorber();
        tmp.load(absorber);
        return tmp;
      });
    }
    options.interactivity.modes.absorbers = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)((_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers, absorber => {
      const tmp = new Absorber();
      tmp.load(absorber);
      return tmp;
    });
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
}
async function loadAbsorbersPlugin(engine) {
  const plugin = new AbsorbersPlugin();
  await engine.addPlugin(plugin);
}


;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Shapes/Circle/CircleShape.js

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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/EmitterInstance.js



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
        mode: "percent",
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
      width: this.size.mode === "percent" ? container.canvas.size.width * this.size.width / 100 : this.size.width,
      height: this.size.mode === "percent" ? container.canvas.size.height * this.size.height / 100 : this.size.height
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Emitters.js



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
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(emittersOptions, emitter => {
        this.addEmitter(emitter, ePosition);
      });
    }
  }
  async init() {
    this.emitters = this.container.actualOptions.emitters;
    this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/ShapeManager.js
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
;// CONCATENATED MODULE: ../plugins/emitters/dist/esm/Shapes/Square/SquareShape.js

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
    if (source === null || source === void 0 ? void 0 : source.emitters) {
      options.emitters = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(source.emitters, emitter => {
        const tmp = new Emitter();
        tmp.load(emitter);
        return tmp;
      });
    }
    const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        options.interactivity.modes.emitters = {
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
            options.interactivity.modes.emitters = {
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
            options.interactivity.modes.emitters = {
              random: {
                count: (_e = emitterMode.random.count) !== null && _e !== void 0 ? _e : 1,
                enable: (_f = emitterMode.random.enable) !== null && _f !== void 0 ? _f : false
              },
              value: tmp
            };
          }
        } else {
          const emitterOptions = options.interactivity.modes.emitters = {
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
    return emitters instanceof Array && !!emitters.length || emitters !== undefined || !!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("emitter", options.interactivity.events.onClick.mode);
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
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    const modeSelectInput = this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "attract"
    }, {
      value: "bubble"
    }, {
      value: "pause"
    }, {
      value: "push"
    }, {
      value: "remove"
    }, {
      value: "repulse"
    }, {
      value: "trail"
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
    if (this.options() instanceof Array) {
      this.group.addButton("addDiv", "Add Div", false).click(async () => {
        const arr = this.options();
        const divGroup = this.group.addGroup(arr.length.toString(10), `Div ${arr.length + 1}`, true, this.options);
        this.addDiv(divGroup);
        await this.particles().refresh();
      });
    }
  }
  addDiv(group) {
    const options = group.data;
    if (options().selectors instanceof Array) {
      const selectorsGroup = group.addGroup("selectors", "Selectors");
      selectorsGroup.addButton("addSelector", "Add Selector", false).click(async () => {
        const arr = options().selectors;
        selectorsGroup.addProperty(arr.length.toString(10), `Selector ${arr.length + 1}`, external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
          await this.particles().refresh();
        });
        await this.particles().refresh();
      });
    } else {
      group.addProperty("selectors", "Selectors", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
        await this.particles().refresh();
      });
    }
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "bounce"
    }, {
      value: "bubble"
    }, {
      value: "repulse"
    }]);
    group.addProperty("type", "Type", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "circle"
    }, {
      value: "rectangle"
    }]);
  }
  addDivs() {
    const options = this.options;
    if (options() instanceof Array) {
      for (let i = 0; i < options.length; i++) {
        const group = this.group.addGroup(i.toString(10), `Div_${i + 1}`, true, options);
        this.addDiv(group);
      }
    } else {
      this.addDiv(this.group);
    }
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
    const parallax = this.group.addGroup("parallax", "Parallax");
    parallax.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    parallax.addProperty("force", "Force", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    parallax.addProperty("smooth", "Smooth", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "attract"
    }, {
      value: "bubble"
    }, {
      value: "connect"
    }, {
      value: "grab"
    }, {
      value: "light"
    }, {
      value: "repulse"
    }, {
      value: "slow"
    }, {
      value: "trail"
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
    this.group.addProperty("resize", "Resize", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
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
  addFactor(name, title) {
    const group = this.group.addGroup(name, title),
      randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addFactors() {
    this.addFactor("horizontal", "Horizontal");
    this.addFactor("vertical", "Vertical");
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
    const group = parentGroup.addGroup(name, title);
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addOverlap() {
    const group = this.group.addGroup("overlap", "Overlap");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("retries", "Retries", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "absorb"
    }, {
      value: "bounce"
    }, {
      value: "destroy"
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
    const group = this.group.addGroup("animation", "Animation");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color).change(async () => {
      await this.particles().refresh();
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
  addProperties() {
    const group = this.group;
    group.addProperty("mode", "Mode", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      this.particles().refresh();
    }).addItems([{
      value: "none"
    }, {
      value: "split"
    }]);
  }
  addSplit() {
    const group = this.group.addGroup("split", "Split");
    const factorGroup = group.addGroup("factor", "Factor");
    const randomFactorGroup = factorGroup.addGroup("random", "Random");
    randomFactorGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomFactorGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    factorGroup.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    const rateGroup = group.addGroup("rate", "Rate");
    const randomRateGroup = rateGroup.addGroup("random", "Random");
    randomRateGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomRateGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    rateGroup.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("count", "Count", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
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
    const group = this.group.addGroup("delay", "Delay");
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomGroup.addProperty("minimumValue", "MinimumValue", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addDuration() {
    const group = this.group.addGroup("duration", "Duration");
    const randomGroup = group.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomGroup.addProperty("minimumValue", "MinimumValue", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("count", "Count", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
  addProperties() {
    var _a;
    const optionsFunc = () => this.options();
    const options = optionsFunc();
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    this.group.addProperty("blink", "Blink", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color.value = value;
        }
        await this.particles().refresh();
      }
    });
    this.group.addProperty("consent", "Consent", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("frequency", "Frequency", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).min(0).max(1).step(0.01).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("id", "Id", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    this.group.addProperty("warp", "Warp", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("width", "Width", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addShadow() {
    var _a;
    const group = this.group.addGroup("shadow", "Shadow");
    const optionsFunc = group.data;
    const options = optionsFunc();
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("blur", "Blur", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
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
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addTriangles() {
    var _a;
    const group = this.group.addGroup("triangles", "Triangles");
    const optionsFunc = () => this.options().triangles;
    const options = optionsFunc();
    const color = typeof (options === null || options === void 0 ? void 0 : options.color) === "string" ? options.color : (_a = options === null || options === void 0 ? void 0 : options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
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
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("frequency", "Frequency", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).min(0).max(1).step(0.01).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
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
    const group = this.group.addGroup("angle", "Angle");
    group.addProperty("offset", "Offset", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addAttract() {
    const group = this.group.addGroup("attract", "Attract");
    const rotateGroup = group.addGroup("rotate", "Rotate", false);
    rotateGroup.addProperty("x", "X", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    rotateGroup.addProperty("y", "Y", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addDistance() {
    const group = this.group.addGroup("distance", "Distance");
    group.addProperty("horizontal", "Horizontal", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("vertical", "Vertical", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addGravity() {
    const group = this.group.addGroup("gravity", "Gravity");
    group.addProperty("acceleration", "Acceleration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("maxSpeed", "Max Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addOutModes() {
    const group = this.group.addGroup("outModes", "Out Modes");
    const outModesValues = [{
      value: "bounce"
    }, {
      value: "destroy"
    }, {
      value: "none"
    }, {
      value: "split"
    }, {
      value: "out"
    }];
    group.addProperty("bottom", "Bottom", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems(outModesValues);
    group.addProperty("default", "Default", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems(outModesValues);
    group.addProperty("left", "Left", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems(outModesValues);
    group.addProperty("right", "Right", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems(outModesValues);
    group.addProperty("top", "Top", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems(outModesValues);
  }
  addPath() {
    const group = this.group.addGroup("path", "Path");
    const delayGroup = group.addGroup("delay", "Delay");
    delayGroup.addProperty("value", "value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    const randomGroup = delayGroup.addGroup("random", "Random");
    randomGroup.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    randomGroup.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("clamp", "Clamp", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("generator", "Generator", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.string).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    const group = this.group;
    group.addProperty("direction", "Direction", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "bottom"
    }, {
      value: "bottom-left"
    }, {
      value: "bottom-right"
    }, {
      value: "left"
    }, {
      value: "none"
    }, {
      value: "right"
    }, {
      value: "top"
    }, {
      value: "top-left"
    }, {
      value: "top-right"
    }]);
    group.addProperty("drift", "Drift", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("random", "Random", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("size", "Size", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("straight", "Straight", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("vibrate", "Vibrate", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("warp", "Warp", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addTrail() {
    var _a;
    const group = this.group.addGroup("trail", "Trail");
    const optionsFunc = group.data;
    const options = optionsFunc();
    const color = typeof options.fillColor === "string" ? options.fillColor : (_a = options.fillColor) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("fillColor", "Fill Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
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
      await this.particles().refresh();
    });
    group.addProperty("length", "Length", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    const group = this.group.addGroup("density", "Density");
    group.addProperty("area", "Area", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("limit", "Limit", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("max", "Max", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    const group = this.group.addGroup("animation", "Animation");
    group.addProperty("destroy", "Destroy", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "max"
    }, {
      value: "min"
    }, {
      value: "none"
    }]);
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).min(0).max(0).step(0.01);
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01);
    group.addProperty("startValue", "Start Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "max"
    }, {
      value: "min"
    }, {
      value: "random"
    }]);
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).min(0).max(1).step(0.01);
  }
  addRandom() {
    const group = this.group.addGroup("random", "Random");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
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
    const group = this.group.addGroup("darken", "Darken");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addEnlighten() {
    const group = this.group.addGroup("enlighten", "Enlighten");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    var _a;
    const optionsFunc = this.options,
      options = optionsFunc(),
      color = typeof options.backColor === "string" ? options.backColor : options.backColor instanceof Array ? options.backColor[0] : (_a = options.backColor) === null || _a === void 0 ? void 0 : _a.value;
    this.group.addProperty("backColor", "Back Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
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
      await this.particles().refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("direction", "Direction", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "clockwise"
    }, {
      value: "counter-clockwise"
    }, {
      value: "random"
    }]);
    this.group.addProperty("path", "Path", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("random", "Random", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    const group = this.group.addGroup("offset", "Offset");
    group.addProperty("x", "X", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("y", "Y", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    var _a;
    const optionsFunc = () => this.options();
    const options = optionsFunc();
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    this.group.addProperty("blur", "Blur", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color.value = value;
        }
      }
      await this.particles().refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
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
    const selectType = this.group.addProperty("type", "Type", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    });
    for (const key of this.particles().drawers.keys()) {
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
    const group = this.group.addGroup("animation", "Animation");
    group.addProperty("destroy", "Destroy", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "max"
    }, {
      value: "min"
    }, {
      value: "none"
    }]);
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("startValue", "Start Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "max"
    }, {
      value: "min"
    }, {
      value: "random"
    }]);
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addRandom() {
    const group = this.group.addGroup("random", "Random");
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("minimumValue", "Minimum Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    if (this.options() instanceof Array) {
      for (let i = 0; i < this.options.length; i++) {
        const group = this.group.addGroup(i.toString(10), `Stroke_${i + 1}`, true, this.options);
        this.addStroke(group);
      }
    } else {
      this.addStroke(this.group);
    }
  }
  addStroke(group) {
    const optionsFunc = group.data;
    const options = optionsFunc();
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
    colorOptions.addToGroup(group, optionsFunc);
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("width", "Width", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("sync", "Sync", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addProperties() {
    this.group.addProperty("direction", "Direction", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "clockwise"
    }, {
      value: "counterClockwise"
    }, {
      value: "random"
    }]);
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("random", "Random", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    const optionsFunc = () => group.data();
    const options = optionsFunc();
    const color = typeof options.color === "string" ? options.color : (_a = options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color = {
            value
          };
        }
      }
      await this.particles().refresh();
    });
    group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("frequency", "Frequency", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
    this.group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("enable", "Enable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/Particles/ParticlesOptionsEditor.js




















class ParticlesOptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
  }
  addParticlesToGroup(parent, customName, parentData) {
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
  addToGroup(parent, options) {
    this.addParticlesToGroup(parent, undefined, options);
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
  addProperties() {
    this.group.addProperty("reduceDuplicates", "Reduce Duplicates", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
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
    const group = this.group.addGroup("attract", "Attract");
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("easing", "Easing", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "ease-out-back"
    }, {
      value: "ease-out-circ"
    }, {
      value: "ease-out-cubic"
    }, {
      value: "ease-out-expo"
    }, {
      value: "ease-out-quad"
    }, {
      value: "ease-out-quint"
    }, {
      value: "ease-out-sine"
    }]);
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("maxSpeed", "Max Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addBubble() {
    var _a;
    const optionsFunc = () => this.options().bubble;
    const options = optionsFunc();
    const group = this.group.addGroup("bubble", "Bubble");
    const color = typeof (options === null || options === void 0 ? void 0 : options.color) === "string" ? options === null || options === void 0 ? void 0 : options.color : (options === null || options === void 0 ? void 0 : options.color) instanceof Array ? undefined : (_a = options === null || options === void 0 ? void 0 : options.color) === null || _a === void 0 ? void 0 : _a.value;
    group.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
      if (!options) {
        return;
      }
      if (typeof value === "string") {
        if (typeof options.color === "string") {
          options.color = value;
        } else {
          options.color = {
            value
          };
        }
      }
      await this.particles().refresh();
    });
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("size", "Size", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addConnect() {
    const group = this.group.addGroup("connect", "Connect");
    const connectLinksGroup = group.addGroup("links", "Links");
    connectLinksGroup.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addGrab() {
    var _a;
    const optionsFunc = () => this.options().grab;
    const options = optionsFunc();
    const group = this.group.addGroup("grab", "Grab");
    const grabLinksGroup = group.addGroup("links", "Links");
    const links = options === null || options === void 0 ? void 0 : options.links;
    const color = typeof (links === null || links === void 0 ? void 0 : links.color) === "string" ? links === null || links === void 0 ? void 0 : links.color : (_a = links === null || links === void 0 ? void 0 : links.color) === null || _a === void 0 ? void 0 : _a.value;
    grabLinksGroup.addProperty("blink", "Blink", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    grabLinksGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, color, false).change(async value => {
      const options = optionsFunc();
      if (!options) {
        return;
      }
      if (typeof value === "string") {
        if (typeof options.links.color === "string") {
          options.links.color = value;
        } else {
          options.links.color = {
            value
          };
        }
        await this.particles().refresh();
      }
    });
    grabLinksGroup.addProperty("consent", "Consent", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    grabLinksGroup.addProperty("opacity", "Opacity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(0.01).min(0).max(1);
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addLight() {
    var _a, _b, _c;
    const optionsFunc = () => this.options().light;
    const options = optionsFunc();
    const group = this.group.addGroup("light", "Light");
    const areaGroup = group.addGroup("area", "Light");
    const gradientGroup = areaGroup.addGroup("gradient", "Gradient");
    const startColor = typeof (options === null || options === void 0 ? void 0 : options.area.gradient.start) === "string" ? options === null || options === void 0 ? void 0 : options.area.gradient.start : (_a = options === null || options === void 0 ? void 0 : options.area.gradient.start) === null || _a === void 0 ? void 0 : _a.value;
    gradientGroup.addProperty("start", "Start", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, startColor, false).change(async value => {
      const options = optionsFunc();
      if (!options) {
        return;
      }
      if (typeof value === "string") {
        if (typeof options.area.gradient.start === "string") {
          options.area.gradient.start = value;
        } else {
          options.area.gradient.start = {
            value
          };
        }
      }
      await this.particles().refresh();
    });
    const stopColor = typeof (options === null || options === void 0 ? void 0 : options.area.gradient.stop) === "string" ? options === null || options === void 0 ? void 0 : options.area.gradient.stop : (_b = options === null || options === void 0 ? void 0 : options.area.gradient.stop) === null || _b === void 0 ? void 0 : _b.value;
    gradientGroup.addProperty("stop", "Stop", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, stopColor, false).change(async value => {
      const options = optionsFunc();
      if (!options) {
        return;
      }
      if (typeof value === "string") {
        if (typeof options.area.gradient.stop === "string") {
          options.area.gradient.stop = value;
        } else {
          options.area.gradient.stop = {
            value
          };
        }
      }
      await this.particles().refresh();
    });
    areaGroup.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    const shadowGroup = group.addGroup("shadow", "Shadow");
    const shadowColor = typeof (options === null || options === void 0 ? void 0 : options.shadow.color) === "string" ? options === null || options === void 0 ? void 0 : options.shadow.color : (_c = options === null || options === void 0 ? void 0 : options.shadow.color) === null || _c === void 0 ? void 0 : _c.value;
    shadowGroup.addProperty("color", "Color", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.color, shadowColor, false).change(async value => {
      const options = optionsFunc();
      if (!options) {
        return;
      }
      if (typeof value === "string") {
        if (typeof options.shadow.color === "string") {
          options.shadow.color = value;
        } else {
          options.shadow.color = {
            value
          };
        }
      }
      await this.particles().refresh();
    });
    shadowGroup.addProperty("length", "Length", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addPush() {
    const group = this.group.addGroup("push", "Push");
    group.addProperty("quantity", "Quantity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addRemove() {
    const group = this.group.addGroup("remove", "Remove");
    group.addProperty("quantity", "Quantity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addRepulse() {
    const group = this.group.addGroup("repulse", "Repulse");
    group.addProperty("distance", "Distance", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("duration", "Duration", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("easing", "Easing", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "ease-out-back"
    }, {
      value: "ease-out-circ"
    }, {
      value: "ease-out-cubic"
    }, {
      value: "ease-out-expo"
    }, {
      value: "ease-out-quad"
    }, {
      value: "ease-out-quint"
    }, {
      value: "ease-out-sine"
    }]);
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("maxSpeed", "Max Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("speed", "Speed", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addSlow() {
    const group = this.group.addGroup("slow", "Slow");
    group.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("radius", "Radius", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
  }
  addTrail() {
    const group = this.group.addGroup("trail", "Trail");
    const options = () => this.options().trail;
    const particlesEditor = new ParticlesOptionsEditor(this.particles);
    particlesEditor.addParticlesToGroup(group, "particles", options);
    group.addProperty("delay", "Delay", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("pauseOnStop", "Pause on Stop", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    group.addProperty("quantity", "Quantity", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
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
  addEvents() {
    const options = new EventsOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }
  addModes() {
    const options = new ModesOptionsEditor(this.particles);
    options.addToGroup(this.group);
  }
  addProperties() {
    this.group.addProperty("detectsOn", "Detects On", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.select).change(async () => {
      await this.particles().refresh();
    }).addItems([{
      value: "canvas"
    }, {
      value: "parent"
    }, {
      value: "window"
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
  addProperties() {
    this.group.addProperty("disable", "Disable", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
  addReduce() {
    const coverGroup = this.group.addGroup("reduce", "Reduce");
    coverGroup.addProperty("factor", "Factor", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    }).step(1);
    coverGroup.addProperty("value", "Value", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/Sections/Options/OptionsEditor.js











class OptionsEditor extends EditorBase {
  constructor(particles) {
    super(particles);
    external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.addEventListener(editorChangedEvent, async () => {
      await particles().refresh();
      this.options = () => particles().options;
    });
  }
  addToGroup(parent) {
    this.group = parent.addGroup("options", "Options", true);
    this.options = () => this.group.data();
    this.addBackground();
    this.addBackgroundMask();
    this.addFullScreen();
    this.addInfection();
    this.addInteractivity();
    this.addMotion();
    this.addParticles();
    this.addProperties();
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
  addProperties() {
    this.group.addProperty("autoPlay", "Auto Play", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("detectRetina", "Detect Retina", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("fpsLimit", "FPS Limit", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.number).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("pauseOnBlur", "Pause on Blur", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
    this.group.addProperty("pauseOnOutsideViewport", "Pause on Outside Viewport", external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.EditorType.boolean).change(async () => {
      await this.particles().refresh();
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/ParticlesEditor.js


class ParticlesEditor extends external_commonjs_object_gui_commonjs2_object_gui_amd_object_gui_root_window_.Editor {
  constructor(particles) {
    super(particles.id, "tsParticles", () => particles);
    this.particles = particles;
  }
  addPreset(text, file) {
    if (!this._presets) {
      return;
    }
    this._presets.addItem(file, text);
  }
  customize() {
    super.customize();
    this.addOptions();
    this.addButtons();
    this.addPresets();
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
      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: false,
        view: window,
        detail: 0,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: null
      });
      a.dispatchEvent(evt);
    });
  }
  addOptions() {
    const options = new OptionsEditor(this.data);
    options.addToGroup(this);
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
      } catch (_a) {}
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

function showEditor(container) {
  return new ParticlesEditor(container);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});