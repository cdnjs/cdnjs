/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.6
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
  "loadParticlesLinksInteraction": () => (/* binding */ loadParticlesLinksInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Linker.js


function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  let distance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos1, pos2);

  if (!warp || distance <= optDistance) {
    return distance;
  }

  const pos2NE = {
    x: pos2.x - canvasSize.width,
    y: pos2.y
  };
  distance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos1, pos2NE);

  if (distance <= optDistance) {
    return distance;
  }

  const pos2SE = {
    x: pos2.x - canvasSize.width,
    y: pos2.y - canvasSize.height
  };
  distance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos1, pos2SE);

  if (distance <= optDistance) {
    return distance;
  }

  const pos2SW = {
    x: pos2.x,
    y: pos2.y - canvasSize.height
  };
  distance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos1, pos2SW);
  return distance;
}

class Linker extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled(particle) {
    return particle.options.links.enable;
  }

  reset() {// do nothing
  }

  async interact(p1) {
    var _a;

    p1.links = [];
    const pos1 = p1.getPosition(),
          container = this.container,
          canvasSize = container.canvas.size;

    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }

    const linkOpt1 = p1.options.links,
          optOpacity = linkOpt1.opacity,
          optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance,
          warp = linkOpt1.warp,
          range = warp ? new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(pos1.x, pos1.y, optDistance),
          query = container.particles.quadTree.query(range);

    for (const p2 of query) {
      const linkOpt2 = p2.options.links;

      if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || p1.links.map(t => t.destination).indexOf(p2) !== -1 || p2.links.map(t => t.destination).indexOf(p1) !== -1) {
        continue;
      }

      const pos2 = p2.getPosition();

      if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }

      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);

      if (distance > optDistance) {
        return;
      }
      /* draw a line between p1 and p2 */


      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this.setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }

  setColor(p1) {
    const container = this.container,
          linksOptions = p1.options.links;
    let linkColor = linksOptions.id === undefined ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);

    if (!linkColor) {
      const optColor = linksOptions.color;
      linkColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getLinkRandomColor)(optColor, linksOptions.blink, linksOptions.consent);

      if (linksOptions.id === undefined) {
        container.particles.linksColor = linkColor;
      } else {
        container.particles.linksColors.set(linksOptions.id, linkColor);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/interaction.js

async function loadInteraction(engine) {
  await engine.addInteractor("particlesLinks", container => new Linker(container));
}
;// CONCATENATED MODULE: ./dist/browser/Utils.js

function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
  // this.ctx.lineCap = "round"; /* performance issue */

  /* path */
  let drawn = false;

  if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(begin, end) <= maxDistance) {
    (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.drawLine)(context, begin, end);
    drawn = true;
  } else if (warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(begin, endNE);

    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = {
        x: 0,
        y: yi
      };
      pi2 = {
        x: canvasSize.width,
        y: yi
      };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(begin, endSW);

      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = {
          x: xi,
          y: 0
        };
        pi2 = {
          x: xi,
          y: canvasSize.height
        };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(begin, endSE);

        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = {
            x: xi,
            y: yi
          };
          pi2 = {
            x: pi1.x + canvasSize.width,
            y: pi1.y + canvasSize.height
          };
        }
      }
    }

    if (pi1 && pi2) {
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.drawLine)(context, begin, pi1);
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.drawLine)(context, end, pi2);
      drawn = true;
    }
  }

  if (!drawn) {
    return;
  }

  context.lineWidth = width;

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(colorLine, opacity);

  if (shadow.enable) {
    const shadowColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToRgb)(shadow.color);

    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(shadowColor);
    }
  }

  context.stroke();
}
function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
  // this.ctx.lineCap = "round"; /* performance issue */

  /* path */
  (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.drawTriangle)(context, pos1, pos2, pos3);

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  context.fillStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(colorTriangle, opacityTriangle);
  context.fill();
}
;// CONCATENATED MODULE: ./dist/browser/LinkInstance.js


class LinkInstance {
  constructor(container) {
    this.container = container;
  }

  particleCreated(particle) {
    const linkParticle = particle;
    linkParticle.links = [];
  }

  particleDestroyed(particle) {
    const linkParticle = particle;
    linkParticle.links = [];
  }

  drawParticle(context, particle) {
    const linkParticle = particle,
          container = this.container,
          particles = container.particles,
          pOptions = particle.options;

    if (linkParticle.links.length <= 0) {
      return;
    }

    context.save();
    const p1Links = linkParticle.links.filter(l => {
      const linkFreq = container.particles.getLinkFrequency(linkParticle, l.destination);
      return linkFreq <= pOptions.links.frequency;
    });

    for (const link of p1Links) {
      const p2 = link.destination;

      if (pOptions.links.triangles.enable) {
        const links = p1Links.map(l => l.destination),
              vertices = p2.links.filter(t => {
          const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
          return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
        });

        if (vertices.length) {
          for (const vertex of vertices) {
            const p3 = vertex.destination,
                  triangleFreq = particles.getTriangleFrequency(linkParticle, p2, p3);

            if (triangleFreq > pOptions.links.triangles.frequency) {
              continue;
            }

            this.drawLinkTriangle(linkParticle, link, vertex);
          }
        }
      }

      if (link.opacity > 0 && container.retina.linksWidth > 0) {
        this.drawLinkLine(linkParticle, link);
      }
    }

    context.restore();
  }

  drawLinkTriangle(p1, link1, link2) {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          p2 = link1.destination,
          p3 = link2.destination,
          triangleOptions = p1.options.links.triangles,
          opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;

    if (opacityTriangle <= 0) {
      return;
    }

    container.canvas.draw(ctx => {
      const pos1 = p1.getPosition();
      const pos2 = p2.getPosition();
      const pos3 = p3.getPosition();

      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos1, pos2) > container.retina.linksDistance || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos3, pos2) > container.retina.linksDistance || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos3, pos1) > container.retina.linksDistance) {
        return;
      }

      let colorTriangle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToRgb)(triangleOptions.color);

      if (!colorTriangle) {
        const linksOptions = p1.options.links,
              linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorTriangle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getLinkColor)(p1, p2, linkColor);
      }

      if (!colorTriangle) {
        return;
      }

      drawLinkTriangle(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
    });
  }

  drawLinkLine(p1, link) {
    const container = this.container,
          options = container.actualOptions,
          p2 = link.destination,
          pos1 = p1.getPosition(),
          pos2 = p2.getPosition();
    let opacity = link.opacity;
    container.canvas.draw(ctx => {
      var _a, _b;

      let colorLine;
      /*
       * particles connecting line color:
       *
       *  random: in blink mode : in every frame refresh the color would change
       *          hence resulting blinking of lines
       *  mid: in consent mode: sample particles color and get a mid level color
       *                        from those two for the connecting line color
       */

      const twinkle = p1.options.twinkle.lines;

      if (twinkle.enable) {
        const twinkleFreq = twinkle.frequency,
              twinkleRgb = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToRgb)(twinkle.color),
              twinkling = Math.random() < twinkleFreq;

        if (twinkling && twinkleRgb) {
          colorLine = twinkleRgb;
          opacity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(twinkle.opacity);
        }
      }

      if (!colorLine) {
        const linksOptions = p1.options.links,
              linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorLine = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getLinkColor)(p1, p2, linkColor);
      }

      if (!colorLine) {
        return;
      }

      const width = (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth,
            maxDistance = (_b = p1.retina.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
      drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/plugin.js


class LinksPlugin {
  constructor() {
    this.id = "links";
  }

  getPlugin(container) {
    return new LinkInstance(container);
  }

  needsPlugin() {
    return true;
  }

  loadOptions() {// do nothing
  }

}

async function loadPlugin(engine) {
  const plugin = new LinksPlugin();
  await engine.addPlugin(plugin);
}
;// CONCATENATED MODULE: ./dist/browser/index.js


async function loadParticlesLinksInteraction(engine) {
  await loadInteraction(engine);
  await loadPlugin(engine);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});