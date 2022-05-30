/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.5
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
})(this, function(__WEBPACK_EXTERNAL_MODULE__818__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 947:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Infecter = void 0;

class Infecter {
  constructor(container) {
    this.container = container;
  }

  startInfection(particle, stage) {
    const options = this.container.actualOptions,
          stages = options.infection.stages,
          stagesCount = stages.length;

    if (stage > stagesCount || stage < 0) {
      return;
    }

    particle.infection.delay = 0;
    particle.infection.delayStage = stage;
  }

  updateInfectionStage(particle, stage) {
    const options = this.container.actualOptions,
          stagesCount = options.infection.stages.length;

    if (stage > stagesCount || stage < 0 || particle.infection.stage !== undefined && particle.infection.stage > stage) {
      return;
    }

    particle.infection.stage = stage;
    particle.infection.time = 0;
  }

  updateInfection(particle, delta) {
    const options = this.container.actualOptions,
          infection = options.infection,
          stages = options.infection.stages,
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

  nextInfectionStage(particle) {
    const options = this.container.actualOptions,
          stagesCount = options.infection.stages.length;

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

exports.Infecter = Infecter;

/***/ }),

/***/ 58:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InfectionInstance = void 0;

const Infecter_1 = __webpack_require__(947);

const tsparticles_engine_1 = __webpack_require__(818);

class InfectionInstance {
  constructor(container) {
    this.container = container;
    this.container.infecter = new Infecter_1.Infecter(this.container);
  }

  particlesSetup() {
    var _a;

    const options = this.container.actualOptions;

    for (let i = 0; i < options.infection.infections; i++) {
      const notInfected = this.container.particles.array.filter(p => {
        const infP = p;

        if (!infP.infection) {
          infP.infection = {};
        }

        return infP.infection.stage === undefined;
      });
      const infected = (0, tsparticles_engine_1.itemFromArray)(notInfected);
      (_a = this.container.infecter) === null || _a === void 0 ? void 0 : _a.startInfection(infected, 0);
    }
  }

  particleFillColor(particle) {
    const infParticle = particle;
    const options = this.container.actualOptions;

    if (!infParticle.infection) {
      return;
    }

    const infectionStage = infParticle.infection.stage;
    const infection = options.infection;
    const infectionStages = infection.stages;
    return infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
  }

  particleStrokeColor(particle) {
    return this.particleFillColor(particle);
  }

}

exports.InfectionInstance = InfectionInstance;

/***/ }),

/***/ 660:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Infection = void 0;

const InfectionStage_1 = __webpack_require__(376);

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
      const s = new InfectionStage_1.InfectionStage();
      s.load(t);
      return s;
    });
  }

}

exports.Infection = Infection;

/***/ }),

/***/ 376:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InfectionStage = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

class InfectionStage {
  constructor() {
    this.color = new tsparticles_engine_1.OptionsColor();
    this.color.value = "#ff0000";
    this.radius = 0;
    this.rate = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = tsparticles_engine_1.OptionsColor.create(this.color, data.color);
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

exports.InfectionStage = InfectionStage;

/***/ }),

/***/ 370:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticlesInfecter = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

class ParticlesInfecter extends tsparticles_engine_1.ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled() {
    var _a, _b;

    const infOptions = this.container.actualOptions;
    return (_b = (_a = infOptions === null || infOptions === void 0 ? void 0 : infOptions.infection) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : false;
  }

  reset() {}

  interact(p1, delta) {
    var _a, _b;

    return __awaiter(this, void 0, void 0, function* () {
      const infecter = this.container.infecter;

      if (!infecter) {
        return;
      }

      infecter.updateInfection(p1, delta.value);

      if (p1.infection.stage === undefined) {
        return;
      }

      const container = this.container;
      const options = container.actualOptions;
      const infectionOptions = options.infection;

      if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
        return;
      }

      const infectionStage1 = infectionOptions.stages[p1.infection.stage];
      const pxRatio = container.retina.pixelRatio;
      const radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio;
      const pos = p1.getPosition();
      const infectedStage1 = (_a = infectionStage1.infectedStage) !== null && _a !== void 0 ? _a : p1.infection.stage;
      const query = container.particles.quadTree.queryCircle(pos, radius);
      const infections = infectionStage1.rate;
      const neighbors = query.length;

      for (const p2 of query) {
        const infP2 = p2;

        if (infP2 === p1 || infP2.destroyed || infP2.spawning || !(infP2.infection.stage === undefined || infP2.infection.stage !== p1.infection.stage)) {
          continue;
        }

        if (Math.random() < infections / neighbors) {
          if (infP2.infection.stage === undefined) {
            infecter.startInfection(infP2, infectedStage1);
          } else if (infP2.infection.stage < p1.infection.stage) {
            infecter.updateInfectionStage(infP2, infectedStage1);
          } else if (infP2.infection.stage > p1.infection.stage) {
            const infectionStage2 = infectionOptions.stages[infP2.infection.stage];
            const infectedStage2 = (_b = infectionStage2 === null || infectionStage2 === void 0 ? void 0 : infectionStage2.infectedStage) !== null && _b !== void 0 ? _b : infP2.infection.stage;
            infecter.updateInfectionStage(p1, infectedStage2);
          }
        }
      }
    });
  }

}

exports.ParticlesInfecter = ParticlesInfecter;

/***/ }),

/***/ 153:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadInfectionPlugin = void 0;

const Infection_1 = __webpack_require__(660);

const InfectionInstance_1 = __webpack_require__(58);

const ParticlesInfecter_1 = __webpack_require__(370);

class Plugin {
  constructor() {
    this.id = "infection";
  }

  getPlugin(container) {
    return new InfectionInstance_1.InfectionInstance(container);
  }

  needsPlugin(options) {
    var _a, _b;

    return (_b = (_a = options === null || options === void 0 ? void 0 : options.infection) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : false;
  }

  loadOptions(options, source) {
    if (!this.needsPlugin(source)) {
      return;
    }

    const optionsCast = options;
    let infectionOptions = optionsCast.infection;

    if ((infectionOptions === null || infectionOptions === void 0 ? void 0 : infectionOptions.load) === undefined) {
      optionsCast.infection = infectionOptions = new Infection_1.Infection();
    }

    infectionOptions.load(source === null || source === void 0 ? void 0 : source.infection);
  }

}

function loadInfectionPlugin(engine) {
  return __awaiter(this, void 0, void 0, function* () {
    const plugin = new Plugin();
    yield engine.addPlugin(plugin);
    yield engine.addInteractor("particlesInfection", container => new ParticlesInfecter_1.ParticlesInfecter(container));
  });
}

exports.loadInfectionPlugin = loadInfectionPlugin;

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(153);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});