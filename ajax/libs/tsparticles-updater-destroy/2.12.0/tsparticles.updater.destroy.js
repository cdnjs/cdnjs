/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.12.0
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
  loadDestroyUpdater: () => (/* binding */ loadDestroyUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/DestroyBounds.js

class DestroyBounds {
  load(data) {
    if (!data) {
      return;
    }
    if (data.bottom !== undefined) {
      this.bottom = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.bottom);
    }
    if (data.left !== undefined) {
      this.left = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.left);
    }
    if (data.right !== undefined) {
      this.right = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.right);
    }
    if (data.top !== undefined) {
      this.top = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.top);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SplitFactor.js

class SplitFactor extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/SplitRate.js

class SplitRate extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ValueWithRandom {
  constructor() {
    super();
    this.value = {
      min: 4,
      max: 9
    };
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Split.js



class Split {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
    this.sizeOffset = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    }
    if (data.count !== undefined) {
      this.count = data.count;
    }
    this.factor.load(data.factor);
    this.rate.load(data.rate);
    this.particles = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(data.particles, particles => {
      return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, particles);
    });
    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }
    if (data.colorOffset) {
      this.colorOffset = this.colorOffset ?? {};
      if (data.colorOffset.h !== undefined) {
        this.colorOffset.h = data.colorOffset.h;
      }
      if (data.colorOffset.s !== undefined) {
        this.colorOffset.s = data.colorOffset.s;
      }
      if (data.colorOffset.l !== undefined) {
        this.colorOffset.l = data.colorOffset.l;
      }
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Destroy.js


class Destroy {
  constructor() {
    this.bounds = new DestroyBounds();
    this.mode = "none";
    this.split = new Split();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mode) {
      this.mode = data.mode;
    }
    if (data.bounds) {
      this.bounds.load(data.bounds);
    }
    this.split.load(data.split);
  }
}
;// CONCATENATED MODULE: ./dist/browser/Utils.js

function addSplitParticle(engine, container, parent, splitParticlesOptions) {
  const destroyOptions = parent.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split,
    options = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.loadParticlesOptions)(engine, container, parent.options),
    factor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getValue)(splitOptions.factor),
    parentColor = parent.getFillColor();
  if (splitOptions.color) {
    options.color.load(splitOptions.color);
  } else if (splitOptions.colorOffset && parentColor) {
    options.color.load({
      value: {
        hsl: {
          h: parentColor.h + (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(splitOptions.colorOffset.h ?? 0),
          s: parentColor.s + (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(splitOptions.colorOffset.s ?? 0),
          l: parentColor.l + (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(splitOptions.colorOffset.l ?? 0)
        }
      }
    });
  } else {
    options.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });
  }
  options.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: "precise"
    }
  });
  if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isNumber)(options.size.value)) {
    options.size.value /= factor;
  } else {
    options.size.value.min /= factor;
    options.size.value.max /= factor;
  }
  options.load(splitParticlesOptions);
  const offset = splitOptions.sizeOffset ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(-parent.size.value, parent.size.value) : 0,
    position = {
      x: parent.position.x + (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(offset),
      y: parent.position.y + (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(offset)
    };
  return container.particles.addParticle(position, options, parent.group, particle => {
    if (particle.size.value < 0.5) {
      return false;
    }
    particle.velocity.length = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(parent.velocity.length, particle.velocity.length));
    particle.splitCount = (parent.splitCount ?? 0) + 1;
    particle.unbreakable = true;
    setTimeout(() => {
      particle.unbreakable = false;
    }, 500);
    return true;
  });
}
function split(engine, container, particle) {
  const destroyOptions = particle.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split;
  if (splitOptions.count >= 0 && (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)) {
    return;
  }
  const rate = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getValue)(splitOptions.rate),
    particlesSplitOptions = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(splitOptions.particles);
  for (let i = 0; i < rate; i++) {
    addSplitParticle(engine, container, particle, particlesSplitOptions);
  }
}
;// CONCATENATED MODULE: ./dist/browser/DestroyUpdater.js



class DestroyUpdater {
  constructor(engine, container) {
    this.engine = engine;
    this.container = container;
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      destroyOptions = particlesOptions.destroy;
    if (!destroyOptions) {
      return;
    }
    particle.splitCount = 0;
    const destroyBoundsOptions = destroyOptions.bounds;
    if (!particle.destroyBounds) {
      particle.destroyBounds = {};
    }
    const {
        bottom,
        left,
        right,
        top
      } = destroyBoundsOptions,
      {
        destroyBounds
      } = particle,
      canvasSize = container.canvas.size;
    if (bottom) {
      destroyBounds.bottom = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(bottom) * canvasSize.height / 100;
    }
    if (left) {
      destroyBounds.left = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(left) * canvasSize.width / 100;
    }
    if (right) {
      destroyBounds.right = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(right) * canvasSize.width / 100;
    }
    if (top) {
      destroyBounds.top = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(top) * canvasSize.height / 100;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.destroy) {
      options.destroy = new Destroy();
    }
    for (const source of sources) {
      options.destroy.load(source?.destroy);
    }
  }
  particleDestroyed(particle, override) {
    if (override) {
      return;
    }
    const destroyOptions = particle.options.destroy;
    if (destroyOptions && destroyOptions.mode === "split") {
      split(this.engine, this.container, particle);
    }
  }
  update(particle) {
    if (!this.isEnabled(particle)) {
      return;
    }
    const position = particle.getPosition(),
      bounds = particle.destroyBounds;
    if (!bounds) {
      return;
    }
    if (bounds.bottom !== undefined && position.y >= bounds.bottom || bounds.left !== undefined && position.x <= bounds.left || bounds.right !== undefined && position.x >= bounds.right || bounds.top !== undefined && position.y <= bounds.top) {
      particle.destroy();
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadDestroyUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("destroy", container => new DestroyUpdater(engine, container), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});