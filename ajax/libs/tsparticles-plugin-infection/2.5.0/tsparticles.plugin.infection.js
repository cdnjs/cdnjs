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
  "loadInfectionPlugin": () => (/* binding */ loadInfectionPlugin)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/InfectionStage.js

class InfectionStage {
  constructor() {
    this.color = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.color.value = "#ff0000";
    this.radius = 0;
    this.rate = 1;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.color !== undefined) {
      this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    }
    this.duration = data.duration;
    this.infectedStage = data.infectedStage;
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
    if (data.rate !== undefined) {
      this.rate = data.rate;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Infection.js

class Infection {
  constructor() {
    this.cure = false;
    this.delay = 0;
    this.enable = false;
    this.infections = 0;
    this.stages = [];
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.cure !== undefined) {
      this.cure = data.cure;
    }
    if (data.delay !== undefined) {
      this.delay = data.delay;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.infections !== undefined) {
      this.infections = data.infections;
    }
    if (data.stages === undefined) {
      return;
    }
    this.stages = data.stages.map(t => {
      const s = new InfectionStage();
      s.load(t);
      return s;
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/Infecter.js
class Infecter {
  constructor(container) {
    this.container = container;
  }
  startInfection(particle, stage) {
    const options = this.container.actualOptions;
    if (!options.infection || !particle.infection) {
      return;
    }
    const stages = options.infection.stages,
      stagesCount = stages.length;
    if (stage > stagesCount || stage < 0) {
      return;
    }
    particle.infection.delay = 0;
    particle.infection.delayStage = stage;
  }
  updateInfection(particle, delta) {
    const infection = this.container.actualOptions.infection;
    if (!infection || !particle.infection) {
      return;
    }
    const stages = infection.stages,
      stagesCount = stages.length;
    if (particle.infection.delay !== undefined && particle.infection.delayStage !== undefined) {
      const stage = particle.infection.delayStage;
      if (stage > stagesCount || stage < 0) {
        return;
      }
      if (particle.infection.delay >= infection.delay * 1000) {
        particle.infection.stage = stage;
        particle.infection.time = 0;
        delete particle.infection.delay;
        delete particle.infection.delayStage;
      } else {
        particle.infection.delay += delta;
      }
    } else {
      delete particle.infection.delay;
      delete particle.infection.delayStage;
    }
    if (particle.infection.stage !== undefined && particle.infection.time !== undefined) {
      const infectionStage = stages[particle.infection.stage];
      if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
        if (particle.infection.time > infectionStage.duration * 1000) {
          this.nextInfectionStage(particle);
        } else {
          particle.infection.time += delta;
        }
      } else {
        particle.infection.time += delta;
      }
    } else {
      delete particle.infection.stage;
      delete particle.infection.time;
    }
  }
  updateInfectionStage(particle, stage) {
    const options = this.container.actualOptions;
    if (!options.infection || !particle.infection) {
      return;
    }
    const stagesCount = options.infection.stages.length;
    if (stage > stagesCount || stage < 0 || particle.infection.stage !== undefined && particle.infection.stage > stage) {
      return;
    }
    particle.infection.stage = stage;
    particle.infection.time = 0;
  }
  nextInfectionStage(particle) {
    const options = this.container.actualOptions;
    if (!options.infection || !particle.infection) {
      return;
    }
    const stagesCount = options.infection.stages.length;
    if (stagesCount <= 0 || particle.infection.stage === undefined) {
      return;
    }
    particle.infection.time = 0;
    if (stagesCount <= ++particle.infection.stage) {
      if (options.infection.cure) {
        delete particle.infection.stage;
        delete particle.infection.time;
        return;
      } else {
        particle.infection.stage = 0;
        particle.infection.time = 0;
      }
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/InfectionInstance.js


class InfectionInstance {
  constructor(container) {
    this.container = container;
    this.container.infecter = new Infecter(this.container);
  }
  particleFillColor(particle) {
    const options = this.container.actualOptions;
    if (!particle.infection || !options.infection) {
      return;
    }
    const infectionStage = particle.infection.stage,
      infection = options.infection,
      infectionStages = infection.stages;
    return infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
  }
  particleStrokeColor(particle) {
    return this.particleFillColor(particle);
  }
  particlesSetup() {
    var _a;
    const options = this.container.actualOptions;
    if (!options.infection) {
      return;
    }
    for (let i = 0; i < options.infection.infections; i++) {
      const notInfected = this.container.particles.array.filter(p => {
        const infP = p;
        if (!infP.infection) {
          infP.infection = {};
        }
        return infP.infection.stage === undefined;
      });
      const infected = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(notInfected);
      (_a = this.container.infecter) === null || _a === void 0 ? void 0 : _a.startInfection(infected, 0);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/ParticlesInfecter.js

class ParticlesInfecter extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1, delta) {
    var _a, _b, _c, _d, _e;
    const infecter = this.container.infecter;
    if (!infecter) {
      return;
    }
    infecter.updateInfection(p1, delta.value);
    if (((_a = p1.infection) === null || _a === void 0 ? void 0 : _a.stage) === undefined) {
      return;
    }
    const container = this.container,
      options = container.actualOptions,
      infectionOptions = options.infection;
    if (!(infectionOptions === null || infectionOptions === void 0 ? void 0 : infectionOptions.enable) || infectionOptions.stages.length < 1) {
      return;
    }
    const infectionStage1 = infectionOptions.stages[p1.infection.stage],
      pxRatio = container.retina.pixelRatio,
      radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio,
      pos = p1.getPosition(),
      infectedStage1 = (_b = infectionStage1.infectedStage) !== null && _b !== void 0 ? _b : p1.infection.stage,
      query = container.particles.quadTree.queryCircle(pos, radius),
      infections = infectionStage1.rate,
      neighbors = query.length;
    for (const p2 of query) {
      const infP2 = p2;
      if (infP2 === p1 || infP2.destroyed || infP2.spawning || !(((_c = infP2.infection) === null || _c === void 0 ? void 0 : _c.stage) === undefined || infP2.infection.stage !== p1.infection.stage)) {
        continue;
      }
      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() < infections / neighbors) {
        if (((_d = infP2.infection) === null || _d === void 0 ? void 0 : _d.stage) === undefined) {
          infecter.startInfection(infP2, infectedStage1);
        } else if (infP2.infection.stage < p1.infection.stage) {
          infecter.updateInfectionStage(infP2, infectedStage1);
        } else if (infP2.infection.stage > p1.infection.stage) {
          const infectionStage2 = infectionOptions.stages[infP2.infection.stage];
          const infectedStage2 = (_e = infectionStage2 === null || infectionStage2 === void 0 ? void 0 : infectionStage2.infectedStage) !== null && _e !== void 0 ? _e : infP2.infection.stage;
          infecter.updateInfectionStage(p1, infectedStage2);
        }
      }
    }
  }
  isEnabled() {
    var _a, _b, _c;
    return (_c = (_b = (_a = this.container.actualOptions) === null || _a === void 0 ? void 0 : _a.infection) === null || _b === void 0 ? void 0 : _b.enable) !== null && _c !== void 0 ? _c : false;
  }
  reset() {}
}
;// CONCATENATED MODULE: ./dist/browser/index.js



class Plugin {
  constructor() {
    this.id = "infection";
  }
  getPlugin(container) {
    return new InfectionInstance(container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(source)) {
      return;
    }
    let infectionOptions = options.infection;
    if ((infectionOptions === null || infectionOptions === void 0 ? void 0 : infectionOptions.load) === undefined) {
      options.infection = infectionOptions = new Infection();
    }
    infectionOptions.load(source === null || source === void 0 ? void 0 : source.infection);
  }
  needsPlugin(options) {
    var _a, _b;
    return (_b = (_a = options === null || options === void 0 ? void 0 : options.infection) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : false;
  }
}
async function loadInfectionPlugin(engine) {
  const plugin = new Plugin();
  await engine.addPlugin(plugin);
  await engine.addInteractor("particlesInfection", container => new ParticlesInfecter(container));
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});