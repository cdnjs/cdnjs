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
  loadInfectionPlugin: () => (/* binding */ loadInfectionPlugin)
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
    this._nextInfectionStage = particle => {
      const infectionOptions = this._container.actualOptions.infection,
        {
          infection
        } = particle;
      if (!infectionOptions || !infection) {
        return;
      }
      const stagesCount = infectionOptions.stages.length;
      if (stagesCount <= 0 || infection.stage === undefined) {
        return;
      }
      infection.time = 0;
      if (stagesCount <= ++infection.stage) {
        if (infectionOptions.cure) {
          delete infection.stage;
          delete infection.time;
          return;
        } else {
          infection.stage = 0;
          infection.time = 0;
        }
      }
    };
    this._container = container;
  }
  startInfection(particle, stage) {
    const infectionOptions = this._container.actualOptions.infection,
      {
        infection
      } = particle;
    if (!infectionOptions || !infection) {
      return;
    }
    const stages = infectionOptions.stages,
      stagesCount = stages.length;
    if (stage > stagesCount || stage < 0) {
      return;
    }
    infection.delay = 0;
    infection.delayStage = stage;
  }
  updateInfection(particle, delta) {
    const infectionOptions = this._container.actualOptions.infection,
      {
        infection
      } = particle;
    if (!infectionOptions || !infection) {
      return;
    }
    const stages = infectionOptions.stages,
      stagesCount = stages.length;
    if (infection.delay !== undefined && infection.delayStage !== undefined) {
      const stage = infection.delayStage;
      if (stage > stagesCount || stage < 0) {
        return;
      }
      if (infection.delay >= infectionOptions.delay * 1000) {
        infection.stage = stage;
        infection.time = 0;
        delete infection.delay;
        delete infection.delayStage;
      } else {
        infection.delay += delta;
      }
    } else {
      delete infection.delay;
      delete infection.delayStage;
    }
    if (infection.stage !== undefined && infection.time !== undefined) {
      const infectionStage = stages[infection.stage];
      if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
        if (infection.time > infectionStage.duration * 1000) {
          this._nextInfectionStage(particle);
        } else {
          infection.time += delta;
        }
      } else {
        infection.time += delta;
      }
    } else {
      delete infection.stage;
      delete infection.time;
    }
  }
  updateInfectionStage(particle, stage) {
    const options = this._container.actualOptions,
      {
        infection
      } = particle;
    if (!options.infection || !infection) {
      return;
    }
    const stagesCount = options.infection.stages.length;
    if (stage > stagesCount || stage < 0 || infection.stage !== undefined && infection.stage > stage) {
      return;
    }
    infection.stage = stage;
    infection.time = 0;
  }
}
;// CONCATENATED MODULE: ./dist/browser/InfectionInstance.js


class InfectionInstance {
  constructor(container) {
    this._container = container;
    this._container.infecter = new Infecter(this._container);
  }
  particleFillColor(particle) {
    const options = this._container.actualOptions;
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
    const options = this._container.actualOptions;
    if (!options.infection) {
      return;
    }
    for (let i = 0; i < options.infection.infections; i++) {
      const notInfected = this._container.particles.filter(p => {
        const infP = p;
        if (!infP.infection) {
          infP.infection = {};
        }
        return infP.infection.stage === undefined;
      });
      const infected = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(notInfected);
      this._container.infecter?.startInfection(infected, 0);
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
    const infecter = this.container.infecter;
    if (!infecter) {
      return;
    }
    infecter.updateInfection(p1, delta.value);
    if (p1.infection?.stage === undefined) {
      return;
    }
    const container = this.container,
      options = container.actualOptions,
      infectionOptions = options.infection;
    if (!infectionOptions?.enable || infectionOptions.stages.length < 1) {
      return;
    }
    const infectionStage1 = infectionOptions.stages[p1.infection.stage],
      pxRatio = container.retina.pixelRatio,
      radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio,
      pos = p1.getPosition(),
      infectedStage1 = infectionStage1.infectedStage ?? p1.infection.stage,
      query = container.particles.quadTree.queryCircle(pos, radius),
      infections = infectionStage1.rate,
      neighbors = query.length;
    for (const p2 of query) {
      const infP2 = p2;
      if (infP2 === p1 || infP2.destroyed || infP2.spawning || !(infP2.infection?.stage === undefined || infP2.infection.stage !== p1.infection.stage) || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() >= infections / neighbors) {
        continue;
      }
      if (infP2.infection?.stage === undefined) {
        infecter.startInfection(infP2, infectedStage1);
      } else if (infP2.infection.stage < p1.infection.stage) {
        infecter.updateInfectionStage(infP2, infectedStage1);
      } else if (infP2.infection.stage > p1.infection.stage) {
        const infectionStage2 = infectionOptions.stages[infP2.infection.stage];
        const infectedStage2 = infectionStage2?.infectedStage ?? infP2.infection.stage;
        infecter.updateInfectionStage(p1, infectedStage2);
      }
    }
  }
  isEnabled() {
    return this.container.actualOptions?.infection?.enable ?? false;
  }
  reset() {}
}
;// CONCATENATED MODULE: ./dist/browser/index.js



class InfectionPlugin {
  constructor() {
    this.id = "infection";
  }
  getPlugin(container) {
    return new InfectionInstance(container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let infectionOptions = options.infection;
    if (infectionOptions?.load === undefined) {
      options.infection = infectionOptions = new Infection();
    }
    infectionOptions.load(source?.infection);
  }
  needsPlugin(options) {
    return options?.infection?.enable ?? false;
  }
}
async function loadInfectionPlugin(engine, refresh = true) {
  const plugin = new InfectionPlugin();
  await engine.addPlugin(plugin, refresh);
  await engine.addInteractor("particlesInfection", container => new ParticlesInfecter(container), refresh);
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});