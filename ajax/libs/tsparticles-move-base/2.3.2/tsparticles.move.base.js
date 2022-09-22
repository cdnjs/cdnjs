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
})(this, function(__WEBPACK_EXTERNAL_MODULE__961__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ (function(module) {

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
  "loadBaseMover": function() { return /* binding */ loadBaseMover; }
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Utils.js

function applyDistance(particle) {
  const initialPosition = particle.initialPosition,
        {
    dx,
    dy
  } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(initialPosition, particle.position),
        dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy),
        hDistance = particle.retina.maxDistance.horizontal,
        vDistance = particle.retina.maxDistance.vertical;

  if (!hDistance && !vDistance) {
    return;
  }

  if ((hDistance && dxFixed >= hDistance || vDistance && dyFixed >= vDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;

    if (hDistance) {
      particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
    }

    if (vDistance) {
      particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position,
          vel = particle.velocity;

    if (hDistance && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
      vel.x *= -(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)();
    }

    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)();
    }
  }
}
function spin(particle, moveSpeed) {
  const container = particle.container;

  if (!particle.spin) {
    return;
  }

  const updateFunc = {
    x: particle.spin.direction === "clockwise"
    /* RotateDirection.clockwise */
    ? Math.cos : Math.sin,
    y: particle.spin.direction === "clockwise"
    /* RotateDirection.clockwise */
    ? Math.sin : Math.cos
  };
  particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
  particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
  particle.spin.radius += particle.spin.acceleration;
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);

  if (particle.spin.radius > maxCanvasSize / 2) {
    particle.spin.radius = maxCanvasSize / 2;
    particle.spin.acceleration *= -1;
  } else if (particle.spin.radius < 0) {
    particle.spin.radius = 0;
    particle.spin.acceleration *= -1;
  }

  particle.spin.angle += moveSpeed / 100 * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
  var _a;

  const particlesOptions = particle.options;
  const pathOptions = particlesOptions.move.path;
  const pathEnabled = pathOptions.enable;

  if (!pathEnabled) {
    return;
  }

  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }

  const path = (_a = particle.pathGenerator) === null || _a === void 0 ? void 0 : _a.generate(particle);

  if (path) {
    particle.velocity.addTo(path);
  }

  if (pathOptions.clamp) {
    particle.velocity.x = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(particle.velocity.x, -1, 1);
    particle.velocity.y = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(particle.velocity.y, -1, 1);
  }

  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : 1;
}
;// CONCATENATED MODULE: ./dist/browser/BaseMover.js


class BaseMover {
  init(particle) {
    var _a;

    const container = particle.container,
          options = particle.options,
          gravityOptions = options.move.gravity,
          spinOptions = options.move.spin;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };

    if (spinOptions.enable) {
      const spinPos = (_a = spinOptions.position) !== null && _a !== void 0 ? _a : {
        x: 50,
        y: 50
      };
      const spinCenter = {
        x: spinPos.x / 100 * container.canvas.size.width,
        y: spinPos.y / 100 * container.canvas.size.height
      };
      const pos = particle.getPosition();
      const distance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos, spinCenter);
      const spinAcceleration = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(spinOptions.acceleration);
      particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
      particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= 0 ? "clockwise"
        /* RotateDirection.clockwise */
        : "counter-clockwise"
        /* RotateDirection.counterClockwise */
        ,
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration
      };
    }
  }

  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }

  move(particle, delta) {
    var _a, _b, _c;

    var _d, _e;

    const particleOptions = particle.options,
          moveOptions = particleOptions.move;

    if (!moveOptions.enable) {
      return;
    }

    const container = particle.container,
          slowFactor = getProximitySpeedFactor(particle),
          baseSpeed = ((_a = (_d = particle.retina).moveSpeed) !== null && _a !== void 0 ? _a : _d.moveSpeed = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(moveOptions.speed) * container.retina.pixelRatio) * container.retina.reduceFactor,
          moveDrift = (_b = (_e = particle.retina).moveDrift) !== null && _b !== void 0 ? _b : _e.moveDrift = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(particle.options.move.drift) * container.retina.pixelRatio,
          maxSize = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(particleOptions.size.value) * container.retina.pixelRatio,
          sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
          speedFactor = sizeFactor * slowFactor * (delta.factor || 1),
          diffFactor = 2,
          moveSpeed = baseSpeed * speedFactor / diffFactor;

    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      applyPath(particle, delta);
      const gravityOptions = particle.gravity,
            gravityFactor = (gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && gravityOptions.inverse ? -1 : 1;

      if ((gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && moveSpeed) {
        particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
      }

      if (moveDrift && moveSpeed) {
        particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
      }

      const decay = particle.moveDecay;

      if (decay != 1) {
        particle.velocity.multTo(decay);
      }

      const velocity = particle.velocity.mult(moveSpeed),
            maxSpeed = (_c = particle.retina.maxSpeed) !== null && _c !== void 0 ? _c : container.retina.maxSpeed;

      if ((gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
        velocity.y = gravityFactor * maxSpeed;

        if (moveSpeed) {
          particle.velocity.y = velocity.y / moveSpeed;
        }
      }

      const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;

      if (zVelocityFactor != 1) {
        velocity.multTo(zVelocityFactor);
      }

      particle.position.addTo(velocity);

      if (moveOptions.vibrate) {
        particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
        particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
      }
    }

    applyDistance(particle);
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadBaseMover(engine) {
  engine.addMover("base", () => new BaseMover());
}
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});