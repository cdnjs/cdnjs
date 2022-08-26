/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.2.4
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
  "loadOutModesUpdater": () => (/* binding */ loadOutModesUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Utils.js

function bounceHorizontal(data) {
  if (data.outMode !== "bounce"
  /* OutMode.bounce */
  && data.outMode !== "bounce-horizontal"
  /* OutMode.bounceHorizontal */
  && data.outMode !== "bounceHorizontal" && data.outMode !== "split"
  /* OutMode.split */
  ) {
    return;
  }

  if (data.bounds.right < 0) {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width) {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }

  const velocity = data.particle.velocity.x;
  let bounced = false;

  if (data.direction === "right"
  /* OutModeDirection.right */
  && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === "left"
  /* OutModeDirection.left */
  && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getValue)(data.particle.options.bounce.horizontal);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }

  if (!bounced) {
    return;
  }

  const minPos = data.offset.x + data.size;

  if (data.bounds.right >= data.canvasSize.width) {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0) {
    data.particle.position.x = minPos;
  }

  if (data.outMode === "split"
  /* OutMode.split */
  ) {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode !== "bounce"
  /* OutMode.bounce */
  && data.outMode !== "bounce-vertical"
  /* OutMode.bounceVertical */
  && data.outMode !== "bounceVertical" && data.outMode !== "split"
  /* OutMode.split */
  ) {
    return;
  }

  if (data.bounds.bottom < 0) {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height) {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }

  const velocity = data.particle.velocity.y;
  let bounced = false;

  if (data.direction === "bottom"
  /* OutModeDirection.bottom */
  && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === "top"
  /* OutModeDirection.top */
  && data.bounds.top <= 0 && velocity < 0) {
    const newVelocity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getValue)(data.particle.options.bounce.vertical);
    data.particle.velocity.y *= -newVelocity;
    bounced = true;
  }

  if (!bounced) {
    return;
  }

  const minPos = data.offset.y + data.size;

  if (data.bounds.bottom >= data.canvasSize.height) {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.bounds.top <= 0) {
    data.particle.position.y = minPos;
  }

  if (data.outMode === "split"
  /* OutMode.split */
  ) {
    data.particle.destroy();
  }
}
;// CONCATENATED MODULE: ./dist/browser/BounceOutMode.js


class BounceOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["bounce"
    /* OutMode.bounce */
    , "bounce-vertical"
    /* OutMode.bounceVertical */
    , "bounce-horizontal"
    /* OutMode.bounceHorizontal */
    , "bounceVertical", "bounceHorizontal", "split"
    /* OutMode.split */
    ];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;
    let handled = false;

    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== undefined) {
        handled = plugin.particleBounce(particle, delta, direction);
      }

      if (handled) {
        break;
      }
    }

    if (handled) {
      return;
    }

    const pos = particle.getPosition(),
          offset = particle.offset,
          size = particle.getRadius(),
          bounds = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calculateBounds)(pos, size),
          canvasSize = container.canvas.size;
    bounceHorizontal({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
    bounceVertical({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/DestroyOutMode.js

class DestroyOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["destroy"
    /* OutMode.destroy */
    ];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;

    switch (particle.outType) {
      case "normal"
      /* ParticleOutType.normal */
      :
      case "outside"
      /* ParticleOutType.outside */
      :
        if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(particle.position, container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin, particle.getRadius(), direction)) {
          return;
        }

        break;

      case "inside"
      /* ParticleOutType.inside */
      :
        {
          const {
            dx,
            dy
          } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(particle.position, particle.moveCenter);
          const {
            x: vx,
            y: vy
          } = particle.velocity;

          if (vx < 0 && dx > particle.moveCenter.radius || vy < 0 && dy > particle.moveCenter.radius || vx >= 0 && dx < -particle.moveCenter.radius || vy >= 0 && dy < -particle.moveCenter.radius) {
            return;
          }

          break;
        }
    }

    container.particles.remove(particle, undefined, true);
  }

}
;// CONCATENATED MODULE: ./dist/browser/NoneOutMode.js

class NoneOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["none"
    /* OutMode.none */
    ];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    if (particle.options.move.distance.horizontal && (direction === "left"
    /* OutModeDirection.left */
    || direction === "right"
    /* OutModeDirection.right */
    ) || particle.options.move.distance.vertical && (direction === "top"
    /* OutModeDirection.top */
    || direction === "bottom"
    /* OutModeDirection.bottom */
    )) {
      return;
    }

    const gravityOptions = particle.options.move.gravity,
          container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();

    if (!gravityOptions.enable) {
      if (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < 0 && particle.position.y >= -pRadius || particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < 0 && particle.position.x >= -pRadius) {
        return;
      }

      if (!(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(particle.position, container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;

      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === "bottom"
      /* OutModeDirection.bottom */
      || gravityOptions.inverse && position.y < -pRadius && direction === "top"
      /* OutModeDirection.top */
      ) {
        container.particles.remove(particle);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/OutOutMode.js

class OutOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["out"
    /* OutMode.out */
    ];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;

    switch (particle.outType) {
      case "inside"
      /* ParticleOutType.inside */
      :
        {
          const {
            x: vx,
            y: vy
          } = particle.velocity;
          const circVec = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin;
          circVec.length = particle.moveCenter.radius;
          circVec.angle = particle.velocity.angle + Math.PI;
          circVec.addTo(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(particle.moveCenter));
          const {
            dx,
            dy
          } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(particle.position, circVec);

          if (vx <= 0 && dx >= 0 || vy <= 0 && dy >= 0 || vx >= 0 && dx <= 0 || vy >= 0 && dy <= 0) {
            return;
          }

          particle.position.x = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
            min: 0,
            max: container.canvas.size.width
          }));
          particle.position.y = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
            min: 0,
            max: container.canvas.size.height
          }));
          const {
            dx: newDx,
            dy: newDy
          } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(particle.position, particle.moveCenter);
          particle.direction = Math.atan2(-newDy, -newDx);
          particle.velocity.angle = particle.direction;
          break;
        }

      default:
        {
          if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isPointInside)(particle.position, container.canvas.size, external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin, particle.getRadius(), direction)) {
            return;
          }

          switch (particle.outType) {
            case "outside"
            /* ParticleOutType.outside */
            :
              {
                particle.position.x = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
                  min: -particle.moveCenter.radius,
                  max: particle.moveCenter.radius
                })) + particle.moveCenter.x;
                particle.position.y = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
                  min: -particle.moveCenter.radius,
                  max: particle.moveCenter.radius
                })) + particle.moveCenter.y;
                const {
                  dx,
                  dy
                } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(particle.position, particle.moveCenter);

                if (particle.moveCenter.radius) {
                  particle.direction = Math.atan2(dy, dx);
                  particle.velocity.angle = particle.direction;
                }

                break;
              }

            case "normal"
            /* ParticleOutType.normal */
            :
              {
                const wrap = particle.options.move.warp,
                      canvasSize = container.canvas.size,
                      newPos = {
                  bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                  left: -particle.getRadius() - particle.offset.x,
                  right: canvasSize.width + particle.getRadius() + particle.offset.x,
                  top: -particle.getRadius() - particle.offset.y
                },
                      sizeValue = particle.getRadius(),
                      nextBounds = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calculateBounds)(particle.position, sizeValue);

                if (direction === "right"
                /* OutModeDirection.right */
                && nextBounds.left > canvasSize.width + particle.offset.x) {
                  particle.position.x = newPos.left;
                  particle.initialPosition.x = particle.position.x;

                  if (!wrap) {
                    particle.position.y = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                } else if (direction === "left"
                /* OutModeDirection.left */
                && nextBounds.right < -particle.offset.x) {
                  particle.position.x = newPos.right;
                  particle.initialPosition.x = particle.position.x;

                  if (!wrap) {
                    particle.position.y = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                }

                if (direction === "bottom"
                /* OutModeDirection.bottom */
                && nextBounds.top > canvasSize.height + particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }

                  particle.position.y = newPos.top;
                  particle.initialPosition.y = particle.position.y;
                } else if (direction === "top"
                /* OutModeDirection.top */
                && nextBounds.bottom < -particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }

                  particle.position.y = newPos.bottom;
                  particle.initialPosition.y = particle.position.y;
                }

                break;
              }
          }

          break;
        }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/OutOfCanvasUpdater.js




class OutOfCanvasUpdater {
  constructor(container) {
    this.container = container;
    this.updaters = [new BounceOutMode(container), new DestroyOutMode(container), new OutOutMode(container), new NoneOutMode(container)];
  }

  init() {// nothing
  }

  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }

  update(particle, delta) {
    var _a, _b, _c, _d;

    const outModes = particle.options.move.outModes;
    this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, "bottom"
    /* OutModeDirection.bottom */
    );
    this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, "left"
    /* OutModeDirection.left */
    );
    this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, "right"
    /* OutModeDirection.right */
    );
    this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, "top"
    /* OutModeDirection.top */
    );
  }

  updateOutMode(particle, delta, outMode, direction) {
    for (const updater of this.updaters) {
      updater.update(particle, direction, delta, outMode);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadOutModesUpdater(engine) {
  await engine.addParticleUpdater("outModes", container => new OutOfCanvasUpdater(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});