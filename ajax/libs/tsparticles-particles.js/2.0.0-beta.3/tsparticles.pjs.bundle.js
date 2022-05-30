/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.0-beta.3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4153:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ initPjs)
/* harmony export */ });
const initPjs = main => {
  const particlesJS = (tagId, options) => {
    return main.load(tagId, options);
  };

  particlesJS.load = (tagId, pathConfigJson, callback) => {
    main.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(undefined);
    });
  };

  particlesJS.setOnClickHandler = callback => {
    main.setOnClickHandler(callback);
  };

  const pJSDom = main.dom();
  return {
    particlesJS,
    pJSDom
  };
};



/***/ }),

/***/ 1646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Canvas = void 0;

const Utils_1 = __webpack_require__(6617);

const Utils_2 = __webpack_require__(6617);

class Canvas {
  constructor(container) {
    this.container = container;
    this.size = {
      height: 0,
      width: 0
    };
    this.context = null;
    this.generatedCanvas = false;
  }

  init() {
    this.resize();
    this.initStyle();
    this.initCover();
    this.initTrail();
    this.initBackground();
    this.paint();
  }

  loadCanvas(canvas, generatedCanvas) {
    var _a;

    if (!canvas.className) {
      canvas.className = Utils_1.canvasClass;
    }

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    this.generatedCanvas = generatedCanvas !== null && generatedCanvas !== void 0 ? generatedCanvas : this.generatedCanvas;
    this.element = canvas;
    this.originalStyle = (0, Utils_1.deepExtend)({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this.context = this.element.getContext("2d");
    this.container.retina.init();
    this.initBackground();
  }

  destroy() {
    var _a;

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    this.draw(ctx => {
      (0, Utils_2.clear)(ctx, this.size);
    });
  }

  paint() {
    const options = this.container.actualOptions;
    this.draw(ctx => {
      if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
        (0, Utils_2.clear)(ctx, this.size);
        this.paintBase((0, Utils_1.getStyleFromRgb)(this.coverColor, this.coverColor.a));
      } else {
        this.paintBase();
      }
    });
  }

  clear() {
    const options = this.container.actualOptions;
    const trail = options.particles.move.trail;

    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
      this.paintBase((0, Utils_1.getStyleFromRgb)(this.trailFillColor, 1 / trail.length));
    } else {
      this.draw(ctx => {
        (0, Utils_2.clear)(ctx, this.size);
      });
    }
  }

  windowResize() {
    if (!this.element) {
      return;
    }

    const container = this.container;
    this.resize();
    const needsRefresh = container.updateActualOptions();
    container.particles.setDensity();

    for (const [, plugin] of container.plugins) {
      if (plugin.resize !== undefined) {
        plugin.resize();
      }
    }

    if (needsRefresh) {
      container.refresh();
    }
  }

  resize() {
    if (!this.element) {
      return;
    }

    const container = this.container;
    const pxRatio = container.retina.pixelRatio;
    const size = container.canvas.size;
    const oldSize = {
      width: size.width,
      height: size.height
    };
    size.width = this.element.offsetWidth * pxRatio;
    size.height = this.element.offsetHeight * pxRatio;
    this.element.width = size.width;
    this.element.height = size.height;

    if (this.container.started) {
      this.resizeFactor = {
        width: size.width / oldSize.width,
        height: size.height / oldSize.height
      };
    }
  }

  drawConnectLine(p1, p2) {
    this.draw(ctx => {
      var _a;

      const lineStyle = this.lineStyle(p1, p2);

      if (!lineStyle) {
        return;
      }

      const pos1 = p1.getPosition();
      const pos2 = p2.getPosition();
      (0, Utils_1.drawConnectLine)(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
    });
  }

  drawGrabLine(particle, lineColor, opacity, mousePos) {
    const container = this.container;
    this.draw(ctx => {
      var _a;

      const beginPos = particle.getPosition();
      (0, Utils_1.drawGrabLine)(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
    });
  }

  drawParticle(particle, delta) {
    var _a, _b, _c, _d, _e, _f;

    if (particle.spawning || particle.destroyed) {
      return;
    }

    const pfColor = particle.getFillColor();
    const psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;

    if (!pfColor && !psColor) {
      return;
    }

    let [fColor, sColor] = this.getPluginParticleColors(particle);
    const pOptions = particle.options;
    const twinkle = pOptions.twinkle.particles;
    const twinkling = twinkle.enable && Math.random() < twinkle.frequency;

    if (!fColor || !sColor) {
      const twinkleRgb = (0, Utils_1.colorToHsl)(twinkle.color);

      if (!fColor) {
        fColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : pfColor ? pfColor : undefined;
      }

      if (!sColor) {
        sColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : psColor ? psColor : undefined;
      }
    }

    const options = this.container.actualOptions;
    const zIndexOptions = particle.options.zIndex;
    const zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate;
    const radius = particle.getRadius();
    const opacity = twinkling ? twinkle.opacity : (_d = (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1;
    const strokeOpacity = (_f = (_e = particle.stroke) === null || _e === void 0 ? void 0 : _e.opacity) !== null && _f !== void 0 ? _f : opacity;
    const zOpacity = opacity * zOpacityFactor;
    const fillColorValue = fColor ? (0, Utils_1.getStyleFromHsl)(fColor, zOpacity) : undefined;

    if (!fillColorValue && !sColor) {
      return;
    }

    this.draw(ctx => {
      const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate;
      const zStrokeOpacity = strokeOpacity * zOpacityFactor;
      const strokeColorValue = sColor ? (0, Utils_1.getStyleFromHsl)(sColor, zStrokeOpacity) : fillColorValue;

      if (radius <= 0) {
        return;
      }

      const container = this.container;

      for (const updater of container.particles.updaters) {
        if (updater.beforeDraw) {
          updater.beforeDraw(particle);
        }
      }

      (0, Utils_1.drawParticle)(this.container, ctx, particle, delta, fillColorValue, strokeColorValue, options.backgroundMask.enable, options.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow, particle.gradient);

      for (const updater of container.particles.updaters) {
        if (updater.afterDraw) {
          updater.afterDraw(particle);
        }
      }
    });
  }

  drawPlugin(plugin, delta) {
    this.draw(ctx => {
      (0, Utils_1.drawPlugin)(ctx, plugin, delta);
    });
  }

  drawParticlePlugin(plugin, particle, delta) {
    this.draw(ctx => {
      (0, Utils_1.drawParticlePlugin)(ctx, plugin, particle, delta);
    });
  }

  initBackground() {
    const options = this.container.actualOptions;
    const background = options.background;
    const element = this.element;
    const elementStyle = element === null || element === void 0 ? void 0 : element.style;

    if (!elementStyle) {
      return;
    }

    if (background.color) {
      const color = (0, Utils_1.colorToRgb)(background.color);
      elementStyle.backgroundColor = color ? (0, Utils_1.getStyleFromRgb)(color, background.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }

    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }

  draw(cb) {
    if (!this.context) {
      return;
    }

    return cb(this.context);
  }

  initCover() {
    const options = this.container.actualOptions;
    const cover = options.backgroundMask.cover;
    const color = cover.color;
    const coverRgb = (0, Utils_1.colorToRgb)(color);

    if (coverRgb) {
      this.coverColor = {
        r: coverRgb.r,
        g: coverRgb.g,
        b: coverRgb.b,
        a: cover.opacity
      };
    }
  }

  initTrail() {
    const options = this.container.actualOptions;
    const trail = options.particles.move.trail;
    const fillColor = (0, Utils_1.colorToRgb)(trail.fillColor);

    if (fillColor) {
      const trail = options.particles.move.trail;
      this.trailFillColor = {
        r: fillColor.r,
        g: fillColor.g,
        b: fillColor.b,
        a: 1 / trail.length
      };
    }
  }

  getPluginParticleColors(particle) {
    let fColor;
    let sColor;

    for (const [, plugin] of this.container.plugins) {
      if (!fColor && plugin.particleFillColor) {
        fColor = (0, Utils_1.colorToHsl)(plugin.particleFillColor(particle));
      }

      if (!sColor && plugin.particleStrokeColor) {
        sColor = (0, Utils_1.colorToHsl)(plugin.particleStrokeColor(particle));
      }

      if (fColor && sColor) {
        break;
      }
    }

    return [fColor, sColor];
  }

  initStyle() {
    const element = this.element,
          options = this.container.actualOptions;

    if (!element) {
      return;
    }

    const originalStyle = this.originalStyle;

    if (options.fullScreen.enable) {
      this.originalStyle = (0, Utils_1.deepExtend)({}, element.style);
      element.style.position = "fixed";
      element.style.zIndex = options.fullScreen.zIndex.toString(10);
      element.style.top = "0";
      element.style.left = "0";
      element.style.width = "100%";
      element.style.height = "100%";
    } else if (originalStyle) {
      element.style.position = originalStyle.position;
      element.style.zIndex = originalStyle.zIndex;
      element.style.top = originalStyle.top;
      element.style.left = originalStyle.left;
      element.style.width = originalStyle.width;
      element.style.height = originalStyle.height;
    }
  }

  paintBase(baseColor) {
    this.draw(ctx => {
      (0, Utils_1.paintBase)(ctx, this.size, baseColor);
    });
  }

  lineStyle(p1, p2) {
    return this.draw(ctx => {
      const options = this.container.actualOptions;
      const connectOptions = options.interactivity.modes.connect;
      return (0, Utils_1.gradient)(ctx, p1, p2, connectOptions.links.opacity);
    });
  }

}

exports.Canvas = Canvas;

/***/ }),

/***/ 3515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Container = void 0;

const Canvas_1 = __webpack_require__(1646);

const Particles_1 = __webpack_require__(626);

const Retina_1 = __webpack_require__(7320);

const FrameManager_1 = __webpack_require__(266);

const Options_1 = __webpack_require__(4075);

const Utils_1 = __webpack_require__(6617);

const Enums_1 = __webpack_require__(8678);

const Loader_1 = __webpack_require__(9662);

class Container {
  constructor(id, sourceOptions, ...presets) {
    this.id = id;
    this.fpsLimit = 60;
    this.duration = 0;
    this.lifeTime = 0;
    this.firstStart = true;
    this.started = false;
    this.destroyed = false;
    this.paused = true;
    this.lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina_1.Retina(this);
    this.canvas = new Canvas_1.Canvas(this);
    this.particles = new Particles_1.Particles(this);
    this.drawer = new FrameManager_1.FrameManager(this);
    this.presets = presets;
    this.pathGenerator = {
      generate: p => {
        const v = p.velocity.copy();
        v.angle += v.length * Math.PI / 180;
        return v;
      },
      init: () => {},
      update: () => {}
    };
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.bubble = {};
    this.repulse = {
      particles: []
    };
    this.attract = {
      particles: []
    };
    this.plugins = new Map();
    this.drawers = new Map();
    this.density = 1;
    this._options = new Options_1.Options();
    this.actualOptions = new Options_1.Options();
    this.eventListeners = new Utils_1.EventListeners(this);

    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(entries => this.intersectionManager(entries));
    }

    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerBuilt, {
      container: this
    });
  }

  get options() {
    return this._options;
  }

  get sourceOptions() {
    return this._sourceOptions;
  }

  play(force) {
    const needsUpdate = this.paused || force;

    if (this.firstStart && !this.actualOptions.autoPlay) {
      this.firstStart = false;
      return;
    }

    if (this.paused) {
      this.paused = false;
    }

    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }

    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerPlay, {
      container: this
    });
    this.draw(needsUpdate || false);
  }

  pause() {
    if (this.drawAnimationFrame !== undefined) {
      (0, Utils_1.cancelAnimation)()(this.drawAnimationFrame);
      delete this.drawAnimationFrame;
    }

    if (this.paused) {
      return;
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.pause) {
        plugin.pause();
      }
    }

    if (!this.pageHidden) {
      this.paused = true;
    }

    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerPaused, {
      container: this
    });
  }

  draw(force) {
    let refreshTime = force;
    this.drawAnimationFrame = (0, Utils_1.animate)()(timestamp => {
      if (refreshTime) {
        this.lastFrameTime = undefined;
        refreshTime = false;
      }

      this.drawer.nextFrame(timestamp);
    });
  }

  getAnimationStatus() {
    return !this.paused && !this.pageHidden;
  }

  setNoise(noiseOrGenerator, init, update) {
    this.setPath(noiseOrGenerator, init, update);
  }

  setPath(pathOrGenerator, init, update) {
    if (!pathOrGenerator) {
      return;
    }

    if (typeof pathOrGenerator === "function") {
      this.pathGenerator.generate = pathOrGenerator;

      if (init) {
        this.pathGenerator.init = init;
      }

      if (update) {
        this.pathGenerator.update = update;
      }
    } else {
      if (pathOrGenerator.generate) {
        this.pathGenerator.generate = pathOrGenerator.generate;
      }

      if (pathOrGenerator.init) {
        this.pathGenerator.init = pathOrGenerator.init;
      }

      if (pathOrGenerator.update) {
        this.pathGenerator.update = pathOrGenerator.update;
      }
    }
  }

  destroy() {
    this.stop();
    this.canvas.destroy();

    for (const [, drawer] of this.drawers) {
      if (drawer.destroy) {
        drawer.destroy(this);
      }
    }

    for (const key of this.drawers.keys()) {
      this.drawers.delete(key);
    }

    this.destroyed = true;
    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerDestroyed, {
      container: this
    });
  }

  exportImg(callback) {
    this.exportImage(callback);
  }

  exportImage(callback, type, quality) {
    var _a;

    return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
  }

  exportConfiguration() {
    return JSON.stringify(this.actualOptions, undefined, 2);
  }

  refresh() {
    this.stop();
    return this.start();
  }

  reset() {
    this._options = new Options_1.Options();
    return this.refresh();
  }

  stop() {
    if (!this.started) {
      return;
    }

    this.firstStart = true;
    this.started = false;
    this.eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.clear();

    if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
      this.intersectionObserver.observe(this.interactivity.element);
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.stop) {
        plugin.stop();
      }
    }

    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }

    this.particles.linksColors = new Map();
    delete this.particles.grabLineColor;
    delete this.particles.linksColor;
    this._sourceOptions = this._options;
    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerStopped, {
      container: this
    });
  }

  async loadTheme(name) {
    this.currentTheme = name;
    await this.refresh();
  }

  async start() {
    if (this.started) {
      return;
    }

    await this.init();
    this.started = true;
    this.eventListeners.addListeners();

    if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
      this.intersectionObserver.observe(this.interactivity.element);
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.startAsync !== undefined) {
        await plugin.startAsync();
      } else if (plugin.start !== undefined) {
        plugin.start();
      }
    }

    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerStarted, {
      container: this
    });
    this.play();
  }

  addClickHandler(callback) {
    const el = this.interactivity.element;

    if (!el) {
      return;
    }

    const clickOrTouchHandler = (e, pos, radius) => {
      if (this.destroyed) {
        return;
      }

      const pxRatio = this.retina.pixelRatio,
            posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      },
            particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    };

    const clickHandler = e => {
      if (this.destroyed) {
        return;
      }

      const mouseEvent = e;
      const pos = {
        x: mouseEvent.offsetX || mouseEvent.clientX,
        y: mouseEvent.offsetY || mouseEvent.clientY
      };
      clickOrTouchHandler(e, pos, 1);
    };

    const touchStartHandler = () => {
      if (this.destroyed) {
        return;
      }

      touched = true;
      touchMoved = false;
    };

    const touchMoveHandler = () => {
      if (this.destroyed) {
        return;
      }

      touchMoved = true;
    };

    const touchEndHandler = e => {
      var _a, _b, _c;

      if (this.destroyed) {
        return;
      }

      if (touched && !touchMoved) {
        const touchEvent = e;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];

        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];

          if (!lastTouch) {
            return;
          }
        }

        const canvasRect = (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const pos = {
          x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
          y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0)
        };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }

      touched = false;
      touchMoved = false;
    };

    const touchCancelHandler = () => {
      if (this.destroyed) {
        return;
      }

      touched = false;
      touchMoved = false;
    };

    let touched = false;
    let touchMoved = false;
    el.addEventListener("click", clickHandler);
    el.addEventListener("touchstart", touchStartHandler);
    el.addEventListener("touchmove", touchMoveHandler);
    el.addEventListener("touchend", touchEndHandler);
    el.addEventListener("touchcancel", touchCancelHandler);
  }

  handleClickMode(mode) {
    this.particles.handleClickMode(mode);

    for (const [, plugin] of this.plugins) {
      if (plugin.handleClickMode) {
        plugin.handleClickMode(mode);
      }
    }
  }

  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this.currentTheme);

    if (this.responsiveMaxWidth != newMaxWidth) {
      this.responsiveMaxWidth = newMaxWidth;
      return true;
    }

    return false;
  }

  async init() {
    this._options = new Options_1.Options();

    for (const preset of this.presets) {
      this._options.load(Utils_1.Plugins.getPreset(preset));
    }

    const shapes = Utils_1.Plugins.getSupportedShapes();

    for (const type of shapes) {
      const drawer = Utils_1.Plugins.getShapeDrawer(type);

      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }

    this._options.load(this._initialSourceOptions);

    this._options.load(this._sourceOptions);

    this.actualOptions = new Options_1.Options();
    this.actualOptions.load(this._options);
    this.retina.init();
    this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    this.zLayers = this.actualOptions.zLayers;
    this.duration = (0, Utils_1.getRangeValue)(this.actualOptions.duration);
    this.lifeTime = 0;
    this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 60;
    const availablePlugins = Utils_1.Plugins.getAvailablePlugins(this);

    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }

    for (const [, drawer] of this.drawers) {
      if (drawer.init) {
        await drawer.init(this);
      }
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.init) {
        plugin.init(this.actualOptions);
      } else if (plugin.initAsync !== undefined) {
        await plugin.initAsync(this.actualOptions);
      }
    }

    const pathOptions = this.actualOptions.particles.move.path;

    if (pathOptions.generator) {
      const customGenerator = Utils_1.Plugins.getPathGenerator(pathOptions.generator);

      if (customGenerator) {
        if (customGenerator.init) {
          this.pathGenerator.init = customGenerator.init;
        }

        if (customGenerator.generate) {
          this.pathGenerator.generate = customGenerator.generate;
        }

        if (customGenerator.update) {
          this.pathGenerator.update = customGenerator.update;
        }
      }
    }

    Loader_1.Loader.dispatchEvent(Enums_1.EventType.containerInit, {
      container: this
    });
    this.particles.init();
    this.particles.setDensity();

    for (const [, plugin] of this.plugins) {
      if (plugin.particlesSetup !== undefined) {
        plugin.particlesSetup();
      }
    }

    Loader_1.Loader.dispatchEvent(Enums_1.EventType.particlesSetup, {
      container: this
    });
  }

  intersectionManager(entries) {
    if (!this.actualOptions.pauseOnOutsideViewport) {
      return;
    }

    for (const entry of entries) {
      if (entry.target !== this.interactivity.element) {
        continue;
      }

      if (entry.isIntersecting) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

}

exports.Container = Container;

/***/ }),

/***/ 7981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ExternalInteractorBase = void 0;

const Enums_1 = __webpack_require__(8678);

class ExternalInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = Enums_1.InteractorType.External;
  }

}

exports.ExternalInteractorBase = ExternalInteractorBase;

/***/ }),

/***/ 266:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FrameManager = void 0;

class FrameManager {
  constructor(container) {
    this.container = container;
  }

  nextFrame(timestamp) {
    var _a;

    try {
      const container = this.container;

      if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
        container.draw(false);
        return;
      }

      (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : container.lastFrameTime = timestamp;
      const deltaValue = timestamp - container.lastFrameTime;
      const delta = {
        value: deltaValue,
        factor: 60 * deltaValue / 1000
      };
      container.lifeTime += delta.value;
      container.lastFrameTime = timestamp;

      if (deltaValue > 1000) {
        container.draw(false);
        return;
      }

      container.particles.draw(delta);

      if (container.duration > 0 && container.lifeTime > container.duration) {
        container.destroy();
        return;
      }

      if (container.getAnimationStatus()) {
        container.draw(false);
      }
    } catch (e) {
      console.error("tsParticles error in animation loop", e);
    }
  }

}

exports.FrameManager = FrameManager;

/***/ }),

/***/ 8262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InteractionManager = void 0;

const Utils_1 = __webpack_require__(6617);

const Enums_1 = __webpack_require__(8678);

class InteractionManager {
  constructor(container) {
    this.container = container;
    this.externalInteractors = [];
    this.particleInteractors = [];
    this.init();
  }

  init() {
    const interactors = Utils_1.Plugins.getInteractors(this.container, true);

    for (const interactor of interactors) {
      switch (interactor.type) {
        case Enums_1.InteractorType.External:
          this.externalInteractors.push(interactor);
          break;

        case Enums_1.InteractorType.Particles:
          this.particleInteractors.push(interactor);
          break;
      }
    }
  }

  externalInteract(delta) {
    for (const interactor of this.externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.interact(delta);
      }
    }
  }

  particlesInteract(particle, delta) {
    for (const interactor of this.externalInteractors) {
      interactor.reset(particle);
    }

    for (const interactor of this.particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.interact(particle, delta);
      }
    }
  }

  handleClickMode(mode) {
    for (const interactor of this.externalInteractors) {
      if (interactor.handleClickMode) {
        interactor.handleClickMode(mode);
      }
    }
  }

}

exports.InteractionManager = InteractionManager;

/***/ }),

/***/ 3530:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6670:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 9722:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7156:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 5142:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7814:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7711:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7971:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 8850:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 1640:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 4766:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7475:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3092:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 8402:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 8729:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3988:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6724:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 1010:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3572:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3742:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7238:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 9047:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6792:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 5212:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7584:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3669:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3230:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6882:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 8348:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3536:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3843:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 5573:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6831:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 1643:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 9238:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(3530), exports);

__exportStar(__webpack_require__(6670), exports);

__exportStar(__webpack_require__(9722), exports);

__exportStar(__webpack_require__(7156), exports);

__exportStar(__webpack_require__(5142), exports);

__exportStar(__webpack_require__(7814), exports);

__exportStar(__webpack_require__(7711), exports);

__exportStar(__webpack_require__(7971), exports);

__exportStar(__webpack_require__(8850), exports);

__exportStar(__webpack_require__(1640), exports);

__exportStar(__webpack_require__(4766), exports);

__exportStar(__webpack_require__(7475), exports);

__exportStar(__webpack_require__(3092), exports);

__exportStar(__webpack_require__(8402), exports);

__exportStar(__webpack_require__(8729), exports);

__exportStar(__webpack_require__(3988), exports);

__exportStar(__webpack_require__(6724), exports);

__exportStar(__webpack_require__(1010), exports);

__exportStar(__webpack_require__(3572), exports);

__exportStar(__webpack_require__(3742), exports);

__exportStar(__webpack_require__(7238), exports);

__exportStar(__webpack_require__(9047), exports);

__exportStar(__webpack_require__(6792), exports);

__exportStar(__webpack_require__(5212), exports);

__exportStar(__webpack_require__(7584), exports);

__exportStar(__webpack_require__(3669), exports);

__exportStar(__webpack_require__(3230), exports);

__exportStar(__webpack_require__(6882), exports);

__exportStar(__webpack_require__(8348), exports);

__exportStar(__webpack_require__(3536), exports);

__exportStar(__webpack_require__(3843), exports);

__exportStar(__webpack_require__(5573), exports);

__exportStar(__webpack_require__(6831), exports);

__exportStar(__webpack_require__(1643), exports);

/***/ }),

/***/ 9662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Loader = void 0;

const Container_1 = __webpack_require__(3515);

const Utils_1 = __webpack_require__(6617);

const EventDispatcher_1 = __webpack_require__(7917);

const tsParticlesDom = [];
const eventDispatcher = new EventDispatcher_1.EventDispatcher();

function fetchError(statusCode) {
  console.error(`Error tsParticles - fetch status: ${statusCode}`);
  console.error("Error tsParticles - File config not found");
}

class Loader {
  static dom() {
    return tsParticlesDom;
  }

  static domItem(index) {
    const dom = Loader.dom();
    const item = dom[index];

    if (item && !item.destroyed) {
      return item;
    }

    dom.splice(index, 1);
  }

  static async loadOptions(params) {
    var _a, _b, _c;

    const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 10000)}`;
    const {
      options,
      index
    } = params;
    let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);

    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = tagId;
      (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
    }

    const currentOptions = options instanceof Array ? (0, Utils_1.itemFromArray)(options, index) : options;
    const dom = Loader.dom();
    const oldIndex = dom.findIndex(v => v.id === tagId);

    if (oldIndex >= 0) {
      const old = Loader.domItem(oldIndex);

      if (old && !old.destroyed) {
        old.destroy();
        dom.splice(oldIndex, 1);
      }
    }

    let canvasEl;
    let generatedCanvas;

    if (domContainer.tagName.toLowerCase() === "canvas") {
      canvasEl = domContainer;
      generatedCanvas = false;
    } else {
      const existingCanvases = domContainer.getElementsByTagName("canvas");

      if (existingCanvases.length) {
        canvasEl = existingCanvases[0];

        if (!canvasEl.className) {
          canvasEl.className = Utils_1.canvasClass;
        }

        generatedCanvas = false;
      } else {
        generatedCanvas = true;
        canvasEl = document.createElement("canvas");
        canvasEl.className = Utils_1.canvasClass;
        canvasEl.style.width = "100%";
        canvasEl.style.height = "100%";
        domContainer.appendChild(canvasEl);
      }
    }

    const newItem = new Container_1.Container(tagId, currentOptions);

    if (oldIndex >= 0) {
      dom.splice(oldIndex, 0, newItem);
    } else {
      dom.push(newItem);
    }

    newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
    await newItem.start();
    return newItem;
  }

  static async loadRemoteOptions(params) {
    const {
      url: jsonUrl,
      index
    } = params;
    const url = jsonUrl instanceof Array ? (0, Utils_1.itemFromArray)(jsonUrl, index) : jsonUrl;

    if (!url) {
      return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      fetchError(response.status);
      return;
    }

    const data = await response.json();
    return await Loader.loadOptions({
      tagId: params.tagId,
      element: params.element,
      index,
      options: data
    });
  }

  static load(tagId, options, index) {
    const params = {
      index
    };

    if (typeof tagId === "string") {
      params.tagId = tagId;
    } else {
      params.options = tagId;
    }

    if (typeof options === "number") {
      params.index = options !== null && options !== void 0 ? options : params.index;
    } else {
      params.options = options !== null && options !== void 0 ? options : params.options;
    }

    return this.loadOptions(params);
  }

  static async set(id, domContainer, options, index) {
    const params = {
      index
    };

    if (typeof id === "string") {
      params.tagId = id;
    } else {
      params.element = id;
    }

    if (domContainer instanceof HTMLElement) {
      params.element = domContainer;
    } else {
      params.options = domContainer;
    }

    if (typeof options === "number") {
      params.index = options;
    } else {
      params.options = options !== null && options !== void 0 ? options : params.options;
    }

    return this.loadOptions(params);
  }

  static async loadJSON(tagId, jsonUrl, index) {
    let url, id;

    if (typeof jsonUrl === "number" || jsonUrl === undefined) {
      url = tagId;
    } else {
      id = tagId;
      url = jsonUrl;
    }

    return await Loader.loadRemoteOptions({
      tagId: id,
      url,
      index
    });
  }

  static async setJSON(id, domContainer, jsonUrl, index) {
    let url, newId, newIndex, element;

    if (id instanceof HTMLElement) {
      element = id;
      url = domContainer;
      newIndex = jsonUrl;
    } else {
      newId = id;
      element = domContainer;
      url = jsonUrl;
      newIndex = index;
    }

    return await Loader.loadRemoteOptions({
      tagId: newId,
      url,
      index: newIndex,
      element
    });
  }

  static setOnClickHandler(callback) {
    const dom = Loader.dom();

    if (dom.length === 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }

    for (const domItem of dom) {
      domItem.addClickHandler(callback);
    }
  }

  static addEventListener(type, listener) {
    eventDispatcher.addEventListener(type, listener);
  }

  static removeEventListener(type, listener) {
    eventDispatcher.removeEventListener(type, listener);
  }

  static dispatchEvent(type, args) {
    eventDispatcher.dispatchEvent(type, args);
  }

}

exports.Loader = Loader;

/***/ }),

/***/ 847:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Particle = void 0;

const ParticlesOptions_1 = __webpack_require__(5640);

const Shape_1 = __webpack_require__(3444);

const Enums_1 = __webpack_require__(8678);

const Utils_1 = __webpack_require__(6617);

const Vector_1 = __webpack_require__(4068);

const Vector3d_1 = __webpack_require__(1838);

const fixOutMode = data => {
  if ((0, Utils_1.isInArray)(data.outMode, data.checkModes) || (0, Utils_1.isInArray)(data.outMode, data.checkModes)) {
    if (data.coord > data.maxCoord - data.radius * 2) {
      data.setCb(-data.radius);
    } else if (data.coord < data.radius * 2) {
      data.setCb(data.radius);
    }
  }
};

class Particle {
  constructor(id, container, position, overrideOptions, group) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;

    this.id = id;
    this.container = container;
    this.group = group;
    this.fill = true;
    this.close = true;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.splitCount = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = Enums_1.ParticleOutType.normal;
    const pxRatio = container.retina.pixelRatio;
    const mainOptions = container.actualOptions;
    const particlesOptions = new ParticlesOptions_1.ParticlesOptions();
    particlesOptions.load(mainOptions.particles);
    const shapeType = particlesOptions.shape.type;
    const reduceDuplicates = particlesOptions.reduceDuplicates;
    this.shape = shapeType instanceof Array ? (0, Utils_1.itemFromArray)(shapeType, this.id, reduceDuplicates) : shapeType;

    if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
      if (overrideOptions.shape.type) {
        const overrideShapeType = overrideOptions.shape.type;
        this.shape = overrideShapeType instanceof Array ? (0, Utils_1.itemFromArray)(overrideShapeType, this.id, reduceDuplicates) : overrideShapeType;
      }

      const shapeOptions = new Shape_1.Shape();
      shapeOptions.load(overrideOptions.shape);

      if (this.shape) {
        this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
      }
    } else {
      this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
    }

    if (overrideOptions !== undefined) {
      particlesOptions.load(overrideOptions);
    }

    if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== undefined) {
      particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
    }

    this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
    this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
    this.options = particlesOptions;
    this.pathDelay = (0, Utils_1.getValue)(this.options.move.path.delay) * 1000;
    const zIndexValue = (0, Utils_1.getRangeValue)(this.options.zIndex.value);
    container.retina.initParticle(this);
    const sizeOptions = this.options.size,
          sizeRange = sizeOptions.value;
    this.size = {
      enable: sizeOptions.animation.enable,
      value: (0, Utils_1.getValue)(sizeOptions) * container.retina.pixelRatio,
      max: (0, Utils_1.getRangeMax)(sizeRange) * pxRatio,
      min: (0, Utils_1.getRangeMin)(sizeRange) * pxRatio,
      loops: 0,
      maxLoops: sizeOptions.animation.count
    };
    const sizeAnimation = sizeOptions.animation;

    if (sizeAnimation.enable) {
      this.size.status = Enums_1.AnimationStatus.increasing;

      switch (sizeAnimation.startValue) {
        case Enums_1.StartValueType.min:
          this.size.value = this.size.min;
          this.size.status = Enums_1.AnimationStatus.increasing;
          break;

        case Enums_1.StartValueType.random:
          this.size.value = (0, Utils_1.randomInRange)(this.size) * pxRatio;
          this.size.status = Math.random() >= 0.5 ? Enums_1.AnimationStatus.increasing : Enums_1.AnimationStatus.decreasing;
          break;

        case Enums_1.StartValueType.max:
        default:
          this.size.value = this.size.max;
          this.size.status = Enums_1.AnimationStatus.decreasing;
          break;
      }

      this.size.velocity = ((_g = this.retina.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;

      if (!sizeAnimation.sync) {
        this.size.velocity *= Math.random();
      }
    }

    this.bubble = {
      inRange: false
    };
    this.position = this.calcPosition(container, position, (0, Utils_1.clamp)(zIndexValue, 0, container.zLayers));
    this.initialPosition = this.position.copy();
    const canvasSize = container.canvas.size;
    this.moveCenter = {
      x: canvasSize.width * this.options.move.center.x / 100,
      y: canvasSize.height * this.options.move.center.y / 100,
      radius: this.options.move.center.radius
    };
    this.direction = (0, Utils_1.getParticleDirectionAngle)(this.options.move.direction, this.position, this.moveCenter);

    switch (this.options.move.direction) {
      case Enums_1.MoveDirection.inside:
        this.outType = Enums_1.ParticleOutType.inside;
        break;

      case Enums_1.MoveDirection.outside:
        this.outType = Enums_1.ParticleOutType.outside;
        break;
    }

    this.initialVelocity = this.calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = 1 - (0, Utils_1.getRangeValue)(this.options.move.decay);
    this.offset = Vector_1.Vector.origin;
    const particles = container.particles;
    particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
    particles.lastZIndex = this.position.z;
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let drawer = container.drawers.get(this.shape);

    if (!drawer) {
      drawer = Utils_1.Plugins.getShapeDrawer(this.shape);

      if (drawer) {
        container.drawers.set(this.shape, drawer);
      }
    }

    if (drawer === null || drawer === void 0 ? void 0 : drawer.loadShape) {
      drawer === null || drawer === void 0 ? void 0 : drawer.loadShape(this);
    }

    const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;

    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }

    this.life = this.loadLife();
    this.spawning = this.life.delay > 0;

    if (this.options.move.spin.enable) {
      const spinPos = (_h = this.options.move.spin.position) !== null && _h !== void 0 ? _h : {
        x: 50,
        y: 50
      };
      const spinCenter = {
        x: spinPos.x / 100 * container.canvas.size.width,
        y: spinPos.y / 100 * container.canvas.size.height
      };
      const pos = this.getPosition();
      const distance = (0, Utils_1.getDistance)(pos, spinCenter);
      this.spin = {
        center: spinCenter,
        direction: this.velocity.x >= 0 ? Enums_1.RotateDirection.clockwise : Enums_1.RotateDirection.counterClockwise,
        angle: this.velocity.angle,
        radius: distance,
        acceleration: (_j = this.retina.spinAcceleration) !== null && _j !== void 0 ? _j : (0, Utils_1.getRangeValue)(this.options.move.spin.acceleration)
      };
    }

    this.shadowColor = (0, Utils_1.colorToRgb)(this.options.shadow.color);

    for (const updater of container.particles.updaters) {
      if (updater.init) {
        updater.init(this);
      }
    }

    if (drawer && drawer.particleInit) {
      drawer.particleInit(container, this);
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.particleCreated) {
        plugin.particleCreated(this);
      }
    }
  }

  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }

  isInsideCanvas() {
    const radius = this.getRadius();
    const canvasSize = this.container.canvas.size;
    return this.position.x >= -radius && this.position.y >= -radius && this.position.y <= canvasSize.height + radius && this.position.x <= canvasSize.width + radius;
  }

  draw(delta) {
    const container = this.container;

    for (const [, plugin] of container.plugins) {
      container.canvas.drawParticlePlugin(plugin, this, delta);
    }

    container.canvas.drawParticle(this, delta);
  }

  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }

  getRadius() {
    var _a;

    return (_a = this.bubble.radius) !== null && _a !== void 0 ? _a : this.size.value;
  }

  getMass() {
    return this.getRadius() ** 2 * Math.PI / 2;
  }

  getFillColor() {
    var _a, _b, _c;

    const color = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : (0, Utils_1.getHslFromAnimation)(this.color);

    if (color && this.roll && (this.backColor || this.roll.alter)) {
      const rolled = Math.floor(((_c = (_b = this.roll) === null || _b === void 0 ? void 0 : _b.angle) !== null && _c !== void 0 ? _c : 0) / (Math.PI / 2)) % 2;

      if (rolled) {
        if (this.backColor) {
          return this.backColor;
        }

        if (this.roll.alter) {
          return (0, Utils_1.alterHsl)(color, this.roll.alter.type, this.roll.alter.value);
        }
      }
    }

    return color;
  }

  getStrokeColor() {
    var _a, _b;

    return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : (0, Utils_1.getHslFromAnimation)(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
  }

  destroy(override) {
    this.destroyed = true;
    this.bubble.inRange = false;

    if (this.unbreakable) {
      return;
    }

    this.destroyed = true;
    this.bubble.inRange = false;

    for (const [, plugin] of this.container.plugins) {
      if (plugin.particleDestroyed) {
        plugin.particleDestroyed(this, override);
      }
    }

    if (override) {
      return;
    }

    const destroyOptions = this.options.destroy;

    if (destroyOptions.mode === Enums_1.DestroyMode.split) {
      this.split();
    }
  }

  reset() {
    if (this.opacity) {
      this.opacity.loops = 0;
    }

    this.size.loops = 0;
  }

  split() {
    const splitOptions = this.options.destroy.split;

    if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
      return;
    }

    const rate = (0, Utils_1.getRangeValue)(splitOptions.rate.value);

    for (let i = 0; i < rate; i++) {
      this.container.particles.addSplitParticle(this);
    }
  }

  calcPosition(container, position, zIndex, tryCount = 0) {
    var _a, _b, _c, _d, _e, _f;

    for (const [, plugin] of container.plugins) {
      const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

      if (pluginPos !== undefined) {
        return Vector3d_1.Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
      }
    }

    const canvasSize = container.canvas.size;
    const pos = Vector3d_1.Vector3d.create((_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width, (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height, zIndex);
    const radius = this.getRadius();

    const outModes = this.options.move.outModes,
          fixHorizontal = outMode => {
      fixOutMode({
        outMode,
        checkModes: [Enums_1.OutMode.bounce, Enums_1.OutMode.bounceHorizontal],
        coord: pos.x,
        maxCoord: container.canvas.size.width,
        setCb: value => pos.x += value,
        radius
      });
    },
          fixVertical = outMode => {
      fixOutMode({
        outMode,
        checkModes: [Enums_1.OutMode.bounce, Enums_1.OutMode.bounceVertical],
        coord: pos.y,
        maxCoord: container.canvas.size.height,
        setCb: value => pos.y += value,
        radius
      });
    };

    fixHorizontal((_c = outModes.left) !== null && _c !== void 0 ? _c : outModes.default);
    fixHorizontal((_d = outModes.right) !== null && _d !== void 0 ? _d : outModes.default);
    fixVertical((_e = outModes.top) !== null && _e !== void 0 ? _e : outModes.default);
    fixVertical((_f = outModes.bottom) !== null && _f !== void 0 ? _f : outModes.default);

    if (this.checkOverlap(pos, tryCount)) {
      return this.calcPosition(container, undefined, zIndex, tryCount + 1);
    }

    return pos;
  }

  checkOverlap(pos, tryCount = 0) {
    const collisionsOptions = this.options.collisions;
    const radius = this.getRadius();

    if (!collisionsOptions.enable) {
      return false;
    }

    const overlapOptions = collisionsOptions.overlap;

    if (overlapOptions.enable) {
      return false;
    }

    const retries = overlapOptions.retries;

    if (retries >= 0 && tryCount > retries) {
      throw new Error("Particle is overlapping and can't be placed");
    }

    let overlaps = false;

    for (const particle of this.container.particles.array) {
      if ((0, Utils_1.getDistance)(pos, particle.position) < radius + particle.getRadius()) {
        overlaps = true;
        break;
      }
    }

    return overlaps;
  }

  calculateVelocity() {
    const baseVelocity = (0, Utils_1.getParticleBaseVelocity)(this.direction);
    const res = baseVelocity.copy();
    const moveOptions = this.options.move;

    if (moveOptions.direction === Enums_1.MoveDirection.inside || moveOptions.direction === Enums_1.MoveDirection.outside) {
      return res;
    }

    const rad = Math.PI / 180 * moveOptions.angle.value;
    const radOffset = Math.PI / 180 * moveOptions.angle.offset;
    const range = {
      left: radOffset - rad / 2,
      right: radOffset + rad / 2
    };

    if (!moveOptions.straight) {
      res.angle += (0, Utils_1.randomInRange)((0, Utils_1.setRangeValue)(range.left, range.right));
    }

    if (moveOptions.random && typeof moveOptions.speed === "number") {
      res.length *= Math.random();
    }

    return res;
  }

  loadShapeData(shapeOptions, reduceDuplicates) {
    const shapeData = shapeOptions.options[this.shape];

    if (shapeData) {
      return (0, Utils_1.deepExtend)({}, shapeData instanceof Array ? (0, Utils_1.itemFromArray)(shapeData, this.id, reduceDuplicates) : shapeData);
    }
  }

  loadLife() {
    const container = this.container;
    const particlesOptions = this.options;
    const lifeOptions = particlesOptions.life;
    const life = {
      delay: container.retina.reduceFactor ? (0, Utils_1.getRangeValue)(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1000 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? (0, Utils_1.getRangeValue)(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1000 : 0,
      time: 0,
      count: particlesOptions.life.count
    };

    if (life.duration <= 0) {
      life.duration = -1;
    }

    if (life.count <= 0) {
      life.count = -1;
    }

    return life;
  }

}

exports.Particle = Particle;

/***/ }),

/***/ 2682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Mover = void 0;

const Utils_1 = __webpack_require__(6617);

const Enums_1 = __webpack_require__(8678);

function applyDistance(particle) {
  const initialPosition = particle.initialPosition;
  const {
    dx,
    dy
  } = (0, Utils_1.getDistances)(initialPosition, particle.position);
  const dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy);
  const hDistance = particle.retina.maxDistance.horizontal;
  const vDistance = particle.retina.maxDistance.vertical;

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
      vel.x *= -Math.random();
    }

    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -Math.random();
    }
  }
}

class Mover {
  constructor(container) {
    this.container = container;
  }

  move(particle, delta) {
    if (particle.destroyed) {
      return;
    }

    this.moveParticle(particle, delta);
    this.moveParallax(particle);
  }

  moveParticle(particle, delta) {
    var _a, _b, _c;

    var _d, _e;

    const particleOptions = particle.options;
    const moveOptions = particleOptions.move;

    if (!moveOptions.enable) {
      return;
    }

    const container = this.container,
          slowFactor = this.getProximitySpeedFactor(particle),
          baseSpeed = ((_a = (_d = particle.retina).moveSpeed) !== null && _a !== void 0 ? _a : _d.moveSpeed = (0, Utils_1.getRangeValue)(moveOptions.speed) * container.retina.pixelRatio) * container.retina.reduceFactor,
          moveDrift = (_b = (_e = particle.retina).moveDrift) !== null && _b !== void 0 ? _b : _e.moveDrift = (0, Utils_1.getRangeValue)(particle.options.move.drift) * container.retina.pixelRatio,
          maxSize = (0, Utils_1.getRangeMax)(particleOptions.size.value) * container.retina.pixelRatio,
          sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
          diffFactor = 2,
          speedFactor = sizeFactor * slowFactor * (delta.factor || 1) / diffFactor,
          moveSpeed = baseSpeed * speedFactor;
    this.applyPath(particle, delta);
    const gravityOptions = moveOptions.gravity;
    const gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;

    if (gravityOptions.enable && moveSpeed) {
      particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
    }

    if (moveDrift && moveSpeed) {
      particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
    }

    const decay = particle.moveDecay;

    if (decay != 1) {
      particle.velocity.multTo(decay);
    }

    const velocity = particle.velocity.mult(moveSpeed);
    const maxSpeed = (_c = particle.retina.maxSpeed) !== null && _c !== void 0 ? _c : container.retina.maxSpeed;

    if (gravityOptions.enable && gravityOptions.maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
      velocity.y = gravityFactor * maxSpeed;

      if (moveSpeed) {
        particle.velocity.y = velocity.y / moveSpeed;
      }
    }

    const zIndexOptions = particle.options.zIndex,
          zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;

    if (moveOptions.spin.enable) {
      this.spin(particle, moveSpeed);
    } else {
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

  spin(particle, moveSpeed) {
    const container = this.container;

    if (!particle.spin) {
      return;
    }

    const updateFunc = {
      x: particle.spin.direction === Enums_1.RotateDirection.clockwise ? Math.cos : Math.sin,
      y: particle.spin.direction === Enums_1.RotateDirection.clockwise ? Math.sin : Math.cos
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

  applyPath(particle, delta) {
    const particlesOptions = particle.options;
    const pathOptions = particlesOptions.move.path;
    const pathEnabled = pathOptions.enable;

    if (!pathEnabled) {
      return;
    }

    const container = this.container;

    if (particle.lastPathTime <= particle.pathDelay) {
      particle.lastPathTime += delta.value;
      return;
    }

    const path = container.pathGenerator.generate(particle);
    particle.velocity.addTo(path);

    if (pathOptions.clamp) {
      particle.velocity.x = (0, Utils_1.clamp)(particle.velocity.x, -1, 1);
      particle.velocity.y = (0, Utils_1.clamp)(particle.velocity.y, -1, 1);
    }

    particle.lastPathTime -= particle.pathDelay;
  }

  moveParallax(particle) {
    const container = this.container;
    const options = container.actualOptions;

    if ((0, Utils_1.isSsr)() || !options.interactivity.events.onHover.parallax.enable) {
      return;
    }

    const parallaxForce = options.interactivity.events.onHover.parallax.force;
    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const canvasCenter = {
      x: container.canvas.size.width / 2,
      y: container.canvas.size.height / 2
    };
    const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;
    const factor = particle.getRadius() / parallaxForce;
    const tmp = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    };
    particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth;
    particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth;
  }

  getProximitySpeedFactor(particle) {
    const container = this.container;
    const options = container.actualOptions;
    const active = (0, Utils_1.isInArray)(Enums_1.HoverMode.slow, options.interactivity.events.onHover.mode);

    if (!active) {
      return 1;
    }

    const mousePos = this.container.interactivity.mouse.position;

    if (!mousePos) {
      return 1;
    }

    const particlePos = particle.getPosition();
    const dist = (0, Utils_1.getDistance)(mousePos, particlePos);
    const radius = container.retina.slowModeRadius;

    if (dist > radius) {
      return 1;
    }

    const proximityFactor = dist / radius || 0;
    const slowFactor = options.interactivity.modes.slow.factor;
    return proximityFactor / slowFactor;
  }

}

exports.Mover = Mover;

/***/ }),

/***/ 4068:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Vector = void 0;

class Vector {
  constructor(x, y) {
    let defX, defY;

    if (y === undefined) {
      if (typeof x === "number") {
        throw new Error("tsParticles - Vector not initialized correctly");
      }

      const coords = x;
      [defX, defY] = [coords.x, coords.y];
    } else {
      [defX, defY] = [x, y];
    }

    this.x = defX;
    this.y = defY;
  }

  static clone(source) {
    return Vector.create(source.x, source.y);
  }

  static create(x, y) {
    return new Vector(x, y);
  }

  static get origin() {
    return Vector.create(0, 0);
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  set angle(angle) {
    this.updateFromAngle(angle, this.length);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set length(length) {
    this.updateFromAngle(this.angle, length);
  }

  add(v) {
    return Vector.create(this.x + v.x, this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    return Vector.create(this.x - v.x, this.y - v.y);
  }

  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    return Vector.create(this.x * n, this.y * n);
  }

  multTo(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    return Vector.create(this.x / n, this.y / n);
  }

  divTo(n) {
    this.x /= n;
    this.y /= n;
  }

  distanceTo(v) {
    return this.sub(v).length;
  }

  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }

  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }

  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }

  copy() {
    return Vector.clone(this);
  }

  setTo(velocity) {
    this.x = velocity.x;
    this.y = velocity.y;
  }

  rotate(angle) {
    return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }

  updateFromAngle(angle, length) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

}

exports.Vector = Vector;

/***/ }),

/***/ 1838:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Vector3d = void 0;

const Vector_1 = __webpack_require__(4068);

class Vector3d extends Vector_1.Vector {
  constructor(x, y, z) {
    super(x, y);
    this.z = z === undefined ? x.z : z;
  }

  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }

  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }

  add(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
  }

  addTo(v) {
    super.addTo(v);

    if (v instanceof Vector3d) {
      this.z += v.z;
    }
  }

  sub(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
  }

  subFrom(v) {
    super.subFrom(v);

    if (v instanceof Vector3d) {
      this.z -= v.z;
    }
  }

  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }

  multTo(n) {
    super.multTo(n);
    this.z *= n;
  }

  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }

  divTo(n) {
    super.divTo(n);
    this.z /= n;
  }

  copy() {
    return Vector3d.clone(this);
  }

  setTo(v) {
    super.setTo(v);

    if (v instanceof Vector3d) {
      this.z = v.z;
    }
  }

}

exports.Vector3d = Vector3d;

/***/ }),

/***/ 626:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Particles = void 0;

const Particle_1 = __webpack_require__(847);

const Utils_1 = __webpack_require__(6617);

const InteractionManager_1 = __webpack_require__(8262);

const ParticlesOptions_1 = __webpack_require__(5640);

const Mover_1 = __webpack_require__(2682);

const Enums_1 = __webpack_require__(8678);

const Loader_1 = __webpack_require__(9662);

class Particles {
  constructor(container) {
    this.container = container;
    this.nextId = 0;
    this.array = [];
    this.zArray = [];
    this.mover = new Mover_1.Mover(container);
    this.limit = 0;
    this.needsSort = false;
    this.lastZIndex = 0;
    this.freqs = {
      links: new Map(),
      triangles: new Map()
    };
    this.interactionManager = new InteractionManager_1.InteractionManager(container);
    const canvasSize = this.container.canvas.size;
    this.linksColors = new Map();
    this.quadTree = new Utils_1.QuadTree(new Utils_1.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.updaters = Utils_1.Plugins.getUpdaters(container, true);
  }

  get count() {
    return this.array.length;
  }

  init() {
    var _a;

    const container = this.container;
    const options = container.actualOptions;
    this.lastZIndex = 0;
    this.needsSort = false;
    this.freqs.links = new Map();
    this.freqs.triangles = new Map();
    let handled = false;
    this.updaters = Utils_1.Plugins.getUpdaters(container, true);
    this.interactionManager.init();

    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== undefined) {
        handled = plugin.particlesInitialization();
      }

      if (handled) {
        break;
      }
    }

    this.addManualParticles();

    if (!handled) {
      for (const group in options.particles.groups) {
        const groupOptions = options.particles.groups[group];

        for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options.particles.number.value; i++, j++) {
          this.addParticle(undefined, groupOptions, group);
        }
      }

      for (let i = this.count; i < options.particles.number.value; i++) {
        this.addParticle();
      }
    }

    container.pathGenerator.init(container);
  }

  redraw() {
    this.clear();
    this.init();
    this.draw({
      value: 0,
      factor: 0
    });
  }

  removeAt(index, quantity = 1, group, override) {
    if (!(index >= 0 && index <= this.count)) {
      return;
    }

    let deleted = 0;

    for (let i = index; deleted < quantity && i < this.count; i++) {
      const particle = this.array[i];

      if (!particle || particle.group !== group) {
        continue;
      }

      particle.destroy(override);
      this.array.splice(i--, 1);
      const zIdx = this.zArray.indexOf(particle);
      this.zArray.splice(zIdx, 1);
      deleted++;
      Loader_1.Loader.dispatchEvent(Enums_1.EventType.particleRemoved, {
        container: this.container,
        data: {
          particle
        }
      });
    }
  }

  remove(particle, group, override) {
    this.removeAt(this.array.indexOf(particle), undefined, group, override);
  }

  update(delta) {
    const container = this.container;
    const particlesToDelete = [];
    container.pathGenerator.update();

    for (const [, plugin] of container.plugins) {
      if (plugin.update !== undefined) {
        plugin.update(delta);
      }
    }

    for (const particle of this.array) {
      const resizeFactor = container.canvas.resizeFactor;

      if (resizeFactor) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
      }

      particle.bubble.inRange = false;

      for (const [, plugin] of this.container.plugins) {
        if (particle.destroyed) {
          break;
        }

        if (plugin.particleUpdate) {
          plugin.particleUpdate(particle, delta);
        }
      }

      this.mover.move(particle, delta);

      if (particle.destroyed) {
        particlesToDelete.push(particle);
        continue;
      }

      this.quadTree.insert(new Utils_1.Point(particle.getPosition(), particle));
    }

    for (const particle of particlesToDelete) {
      this.remove(particle);
    }

    this.interactionManager.externalInteract(delta);

    for (const particle of container.particles.array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }

      if (!particle.destroyed && !particle.spawning) {
        this.interactionManager.particlesInteract(particle, delta);
      }
    }

    delete container.canvas.resizeFactor;
  }

  draw(delta) {
    const container = this.container;
    container.canvas.clear();
    const canvasSize = this.container.canvas.size;
    this.quadTree = new Utils_1.QuadTree(new Utils_1.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.update(delta);

    if (this.needsSort) {
      this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
      this.needsSort = false;
    }

    for (const [, plugin] of container.plugins) {
      container.canvas.drawPlugin(plugin, delta);
    }

    for (const p of this.zArray) {
      p.draw(delta);
    }
  }

  clear() {
    this.array = [];
    this.zArray = [];
  }

  push(nb, mouse, overrideOptions, group) {
    this.pushing = true;

    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
    }

    this.pushing = false;
  }

  addParticle(position, overrideOptions, group) {
    const container = this.container;
    const options = container.actualOptions;
    const limit = options.particles.number.limit * container.density;

    if (limit > 0) {
      const countToRemove = this.count + 1 - limit;

      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }

    return this.pushParticle(position, overrideOptions, group);
  }

  addSplitParticle(parent) {
    const splitOptions = parent.options.destroy.split;
    const options = new ParticlesOptions_1.ParticlesOptions();
    options.load(parent.options);
    const factor = (0, Utils_1.getRangeValue)(splitOptions.factor.value);
    options.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });

    if (typeof options.size.value === "number") {
      options.size.value /= factor;
    } else {
      options.size.value.min /= factor;
      options.size.value.max /= factor;
    }

    options.load(splitOptions.particles);
    const offset = splitOptions.sizeOffset ? (0, Utils_1.setRangeValue)(-parent.size.value, parent.size.value) : 0;
    const position = {
      x: parent.position.x + (0, Utils_1.randomInRange)(offset),
      y: parent.position.y + (0, Utils_1.randomInRange)(offset)
    };
    return this.pushParticle(position, options, parent.group, particle => {
      if (particle.size.value < 0.5) {
        return false;
      }

      particle.velocity.length = (0, Utils_1.randomInRange)((0, Utils_1.setRangeValue)(parent.velocity.length, particle.velocity.length));
      particle.splitCount = parent.splitCount + 1;
      particle.unbreakable = true;
      setTimeout(() => {
        particle.unbreakable = false;
      }, 500);
      return true;
    });
  }

  removeQuantity(quantity, group) {
    this.removeAt(0, quantity, group);
  }

  getLinkFrequency(p1, p2) {
    const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;
    let res = this.freqs.links.get(key);

    if (res === undefined) {
      res = Math.random();
      this.freqs.links.set(key, res);
    }

    return res;
  }

  getTriangleFrequency(p1, p2, p3) {
    let [id1, id2, id3] = [p1.id, p2.id, p3.id];

    if (id1 > id2) {
      [id2, id1] = [id1, id2];
    }

    if (id2 > id3) {
      [id3, id2] = [id2, id3];
    }

    if (id1 > id3) {
      [id3, id1] = [id1, id3];
    }

    const key = `${id1}_${id2}_${id3}`;
    let res = this.freqs.triangles.get(key);

    if (res === undefined) {
      res = Math.random();
      this.freqs.triangles.set(key, res);
    }

    return res;
  }

  addManualParticles() {
    const container = this.container;
    const options = container.actualOptions;

    for (const particle of options.manualParticles) {
      const pos = particle.position ? {
        x: particle.position.x * container.canvas.size.width / 100,
        y: particle.position.y * container.canvas.size.height / 100
      } : undefined;
      this.addParticle(pos, particle.options);
    }
  }

  setDensity() {
    const options = this.container.actualOptions;

    for (const group in options.particles.groups) {
      this.applyDensity(options.particles.groups[group], 0, group);
    }

    this.applyDensity(options.particles, options.manualParticles.length);
  }

  handleClickMode(mode) {
    this.interactionManager.handleClickMode(mode);
  }

  applyDensity(options, manualCount, group) {
    var _a;

    if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
      return;
    }

    const numberOptions = options.number;
    const densityFactor = this.initDensityFactor(numberOptions.density);
    const optParticlesNumber = numberOptions.value;
    const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
    const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount;
    const particlesCount = Math.min(this.count, this.array.filter(t => t.group === group).length);
    this.limit = numberOptions.limit * densityFactor;

    if (particlesCount < particlesNumber) {
      this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
    } else if (particlesCount > particlesNumber) {
      this.removeQuantity(particlesCount - particlesNumber, group);
    }
  }

  initDensityFactor(densityOptions) {
    const container = this.container;

    if (!container.canvas.element || !densityOptions.enable) {
      return 1;
    }

    const canvas = container.canvas.element;
    const pxRatio = container.retina.pixelRatio;
    return canvas.width * canvas.height / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
  }

  pushParticle(position, overrideOptions, group, initializer) {
    try {
      const particle = new Particle_1.Particle(this.nextId, this.container, position, overrideOptions, group);
      let canAdd = true;

      if (initializer) {
        canAdd = initializer(particle);
      }

      if (!canAdd) {
        return;
      }

      this.array.push(particle);
      this.zArray.push(particle);
      this.nextId++;
      Loader_1.Loader.dispatchEvent(Enums_1.EventType.particleAdded, {
        container: this.container,
        data: {
          particle
        }
      });
      return particle;
    } catch (e) {
      console.warn(`error adding particle: ${e}`);
      return;
    }
  }

}

exports.Particles = Particles;

/***/ }),

/***/ 660:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticlesInteractorBase = void 0;

const Enums_1 = __webpack_require__(8678);

class ParticlesInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = Enums_1.InteractorType.Particles;
  }

}

exports.ParticlesInteractorBase = ParticlesInteractorBase;

/***/ }),

/***/ 7320:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Retina = void 0;

const Utils_1 = __webpack_require__(6617);

class Retina {
  constructor(container) {
    this.container = container;
  }

  init() {
    const container = this.container;
    const options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || (0, Utils_1.isSsr)() ? 1 : window.devicePixelRatio;
    const motionOptions = this.container.actualOptions.motion;

    if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
      if ((0, Utils_1.isSsr)() || typeof matchMedia === "undefined" || !matchMedia) {
        this.reduceFactor = 1;
      } else {
        const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");

        if (mediaQuery) {
          this.handleMotionChange(mediaQuery);

          const handleChange = () => {
            this.handleMotionChange(mediaQuery);
            container.refresh().catch(() => {});
          };

          if (mediaQuery.addEventListener !== undefined) {
            mediaQuery.addEventListener("change", handleChange);
          } else if (mediaQuery.addListener !== undefined) {
            mediaQuery.addListener(handleChange);
          }
        }
      }
    } else {
      this.reduceFactor = 1;
    }

    const ratio = this.pixelRatio;

    if (container.canvas.element) {
      const element = container.canvas.element;
      container.canvas.size.width = element.offsetWidth * ratio;
      container.canvas.size.height = element.offsetHeight * ratio;
    }

    const particles = options.particles;
    this.attractDistance = particles.move.attract.distance * ratio;
    this.linksDistance = particles.links.distance * ratio;
    this.linksWidth = particles.links.width * ratio;
    this.sizeAnimationSpeed = particles.size.animation.speed * ratio;
    this.maxSpeed = particles.move.gravity.maxSpeed * ratio;

    if (particles.orbit.radius !== undefined) {
      this.orbitRadius = particles.orbit.radius * this.container.retina.pixelRatio;
    }

    const modes = options.interactivity.modes;
    this.connectModeDistance = modes.connect.distance * ratio;
    this.connectModeRadius = modes.connect.radius * ratio;
    this.grabModeDistance = modes.grab.distance * ratio;
    this.repulseModeDistance = modes.repulse.distance * ratio;
    this.bounceModeDistance = modes.bounce.distance * ratio;
    this.attractModeDistance = modes.attract.distance * ratio;
    this.slowModeRadius = modes.slow.radius * ratio;
    this.bubbleModeDistance = modes.bubble.distance * ratio;

    if (modes.bubble.size) {
      this.bubbleModeSize = modes.bubble.size * ratio;
    }
  }

  initParticle(particle) {
    const options = particle.options;
    const ratio = this.pixelRatio;
    const moveDistance = options.move.distance;
    const props = particle.retina;
    props.attractDistance = options.move.attract.distance * ratio;
    props.linksDistance = options.links.distance * ratio;
    props.linksWidth = options.links.width * ratio;
    props.moveDrift = (0, Utils_1.getRangeValue)(options.move.drift) * ratio;
    props.moveSpeed = (0, Utils_1.getRangeValue)(options.move.speed) * ratio;
    props.sizeAnimationSpeed = options.size.animation.speed * ratio;

    if (particle.spin) {
      props.spinAcceleration = (0, Utils_1.getRangeValue)(options.move.spin.acceleration) * ratio;
    }

    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
    maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
    props.maxSpeed = options.move.gravity.maxSpeed * ratio;
  }

  handleMotionChange(mediaQuery) {
    const options = this.container.actualOptions;

    if (mediaQuery.matches) {
      const motion = options.motion;
      this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
    } else {
      this.reduceFactor = 1;
    }
  }

}

exports.Retina = Retina;

/***/ }),

/***/ 3289:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnimationStatus = void 0;
var AnimationStatus;

(function (AnimationStatus) {
  AnimationStatus[AnimationStatus["increasing"] = 0] = "increasing";
  AnimationStatus[AnimationStatus["decreasing"] = 1] = "decreasing";
})(AnimationStatus = exports.AnimationStatus || (exports.AnimationStatus = {}));

/***/ }),

/***/ 2984:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MoveDirection = void 0;
var MoveDirection;

(function (MoveDirection) {
  MoveDirection["bottom"] = "bottom";
  MoveDirection["bottomLeft"] = "bottom-left";
  MoveDirection["bottomRight"] = "bottom-right";
  MoveDirection["left"] = "left";
  MoveDirection["none"] = "none";
  MoveDirection["right"] = "right";
  MoveDirection["top"] = "top";
  MoveDirection["topLeft"] = "top-left";
  MoveDirection["topRight"] = "top-right";
  MoveDirection["outside"] = "outside";
  MoveDirection["inside"] = "inside";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));

/***/ }),

/***/ 2245:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OutModeDirection = void 0;
var OutModeDirection;

(function (OutModeDirection) {
  OutModeDirection["bottom"] = "bottom";
  OutModeDirection["left"] = "left";
  OutModeDirection["right"] = "right";
  OutModeDirection["top"] = "top";
})(OutModeDirection = exports.OutModeDirection || (exports.OutModeDirection = {}));

/***/ }),

/***/ 196:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RotateDirection = void 0;
var RotateDirection;

(function (RotateDirection) {
  RotateDirection["clockwise"] = "clockwise";
  RotateDirection["counterClockwise"] = "counter-clockwise";
  RotateDirection["random"] = "random";
})(RotateDirection = exports.RotateDirection || (exports.RotateDirection = {}));

/***/ }),

/***/ 4087:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TiltDirection = void 0;
var TiltDirection;

(function (TiltDirection) {
  TiltDirection["clockwise"] = "clockwise";
  TiltDirection["counterClockwise"] = "counter-clockwise";
  TiltDirection["random"] = "random";
})(TiltDirection = exports.TiltDirection || (exports.TiltDirection = {}));

/***/ }),

/***/ 6464:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(2984), exports);

__exportStar(__webpack_require__(196), exports);

__exportStar(__webpack_require__(2245), exports);

__exportStar(__webpack_require__(4087), exports);

/***/ }),

/***/ 5820:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InteractivityDetect = void 0;
var InteractivityDetect;

(function (InteractivityDetect) {
  InteractivityDetect["canvas"] = "canvas";
  InteractivityDetect["parent"] = "parent";
  InteractivityDetect["window"] = "window";
})(InteractivityDetect = exports.InteractivityDetect || (exports.InteractivityDetect = {}));

/***/ }),

/***/ 578:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ClickMode = void 0;
var ClickMode;

(function (ClickMode) {
  ClickMode["attract"] = "attract";
  ClickMode["bubble"] = "bubble";
  ClickMode["push"] = "push";
  ClickMode["remove"] = "remove";
  ClickMode["repulse"] = "repulse";
  ClickMode["pause"] = "pause";
  ClickMode["trail"] = "trail";
})(ClickMode = exports.ClickMode || (exports.ClickMode = {}));

/***/ }),

/***/ 9055:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CollisionMode = void 0;
var CollisionMode;

(function (CollisionMode) {
  CollisionMode["absorb"] = "absorb";
  CollisionMode["bounce"] = "bounce";
  CollisionMode["destroy"] = "destroy";
})(CollisionMode = exports.CollisionMode || (exports.CollisionMode = {}));

/***/ }),

/***/ 6095:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DestroyMode = void 0;
var DestroyMode;

(function (DestroyMode) {
  DestroyMode["none"] = "none";
  DestroyMode["split"] = "split";
})(DestroyMode = exports.DestroyMode || (exports.DestroyMode = {}));

/***/ }),

/***/ 469:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DivMode = void 0;
var DivMode;

(function (DivMode) {
  DivMode["bounce"] = "bounce";
  DivMode["bubble"] = "bubble";
  DivMode["repulse"] = "repulse";
})(DivMode = exports.DivMode || (exports.DivMode = {}));

/***/ }),

/***/ 503:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HoverMode = void 0;
var HoverMode;

(function (HoverMode) {
  HoverMode["attract"] = "attract";
  HoverMode["bounce"] = "bounce";
  HoverMode["bubble"] = "bubble";
  HoverMode["connect"] = "connect";
  HoverMode["grab"] = "grab";
  HoverMode["light"] = "light";
  HoverMode["repulse"] = "repulse";
  HoverMode["slow"] = "slow";
  HoverMode["trail"] = "trail";
})(HoverMode = exports.HoverMode || (exports.HoverMode = {}));

/***/ }),

/***/ 4642:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OutMode = void 0;
var OutMode;

(function (OutMode) {
  OutMode["bounce"] = "bounce";
  OutMode["bounceHorizontal"] = "bounce-horizontal";
  OutMode["bounceVertical"] = "bounce-vertical";
  OutMode["none"] = "none";
  OutMode["out"] = "out";
  OutMode["destroy"] = "destroy";
  OutMode["split"] = "split";
})(OutMode = exports.OutMode || (exports.OutMode = {}));

/***/ }),

/***/ 857:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ResponsiveMode = void 0;
var ResponsiveMode;

(function (ResponsiveMode) {
  ResponsiveMode["screen"] = "screen";
  ResponsiveMode["canvas"] = "canvas";
})(ResponsiveMode = exports.ResponsiveMode || (exports.ResponsiveMode = {}));

/***/ }),

/***/ 6674:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RollMode = void 0;
var RollMode;

(function (RollMode) {
  RollMode["both"] = "both";
  RollMode["horizontal"] = "horizontal";
  RollMode["vertical"] = "vertical";
})(RollMode = exports.RollMode || (exports.RollMode = {}));

/***/ }),

/***/ 7403:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SizeMode = void 0;
var SizeMode;

(function (SizeMode) {
  SizeMode["precise"] = "precise";
  SizeMode["percent"] = "percent";
})(SizeMode = exports.SizeMode || (exports.SizeMode = {}));

/***/ }),

/***/ 5305:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ThemeMode = void 0;
var ThemeMode;

(function (ThemeMode) {
  ThemeMode["any"] = "any";
  ThemeMode["dark"] = "dark";
  ThemeMode["light"] = "light";
})(ThemeMode = exports.ThemeMode || (exports.ThemeMode = {}));

/***/ }),

/***/ 5826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(578), exports);

__exportStar(__webpack_require__(6095), exports);

__exportStar(__webpack_require__(469), exports);

__exportStar(__webpack_require__(503), exports);

__exportStar(__webpack_require__(9055), exports);

__exportStar(__webpack_require__(4642), exports);

__exportStar(__webpack_require__(6674), exports);

__exportStar(__webpack_require__(7403), exports);

__exportStar(__webpack_require__(5305), exports);

__exportStar(__webpack_require__(857), exports);

/***/ }),

/***/ 399:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AlterType = void 0;
var AlterType;

(function (AlterType) {
  AlterType["darken"] = "darken";
  AlterType["enlighten"] = "enlighten";
})(AlterType = exports.AlterType || (exports.AlterType = {}));

/***/ }),

/***/ 8834:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DestroyType = void 0;
var DestroyType;

(function (DestroyType) {
  DestroyType["none"] = "none";
  DestroyType["max"] = "max";
  DestroyType["min"] = "min";
})(DestroyType = exports.DestroyType || (exports.DestroyType = {}));

/***/ }),

/***/ 8282:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DivType = void 0;
var DivType;

(function (DivType) {
  DivType["circle"] = "circle";
  DivType["rectangle"] = "rectangle";
})(DivType = exports.DivType || (exports.DivType = {}));

/***/ }),

/***/ 7990:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EasingType = void 0;
var EasingType;

(function (EasingType) {
  EasingType["easeOutBack"] = "ease-out-back";
  EasingType["easeOutCirc"] = "ease-out-circ";
  EasingType["easeOutCubic"] = "ease-out-cubic";
  EasingType["easeOutQuad"] = "ease-out-quad";
  EasingType["easeOutQuart"] = "ease-out-quart";
  EasingType["easeOutQuint"] = "ease-out-quint";
  EasingType["easeOutExpo"] = "ease-out-expo";
  EasingType["easeOutSine"] = "ease-out-sine";
})(EasingType = exports.EasingType || (exports.EasingType = {}));

/***/ }),

/***/ 231:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventType = void 0;
var EventType;

(function (EventType) {
  EventType["containerInit"] = "containerInit";
  EventType["particlesSetup"] = "particlesSetup";
  EventType["containerStarted"] = "containerStarted";
  EventType["containerStopped"] = "containerStopped";
  EventType["containerDestroyed"] = "containerDestroyed";
  EventType["containerPaused"] = "containerPaused";
  EventType["containerPlay"] = "containerPlay";
  EventType["containerBuilt"] = "containerBuilt";
  EventType["particleAdded"] = "particleAdded";
  EventType["particleRemoved"] = "particleRemoved";
})(EventType = exports.EventType || (exports.EventType = {}));

/***/ }),

/***/ 7251:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GradientType = void 0;
var GradientType;

(function (GradientType) {
  GradientType["linear"] = "linear";
  GradientType["radial"] = "radial";
  GradientType["random"] = "random";
})(GradientType = exports.GradientType || (exports.GradientType = {}));

/***/ }),

/***/ 2075:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InteractorType = void 0;
var InteractorType;

(function (InteractorType) {
  InteractorType[InteractorType["External"] = 0] = "External";
  InteractorType[InteractorType["Particles"] = 1] = "Particles";
})(InteractorType = exports.InteractorType || (exports.InteractorType = {}));

/***/ }),

/***/ 4401:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OrbitType = void 0;
var OrbitType;

(function (OrbitType) {
  OrbitType["front"] = "front";
  OrbitType["back"] = "back";
})(OrbitType = exports.OrbitType || (exports.OrbitType = {}));

/***/ }),

/***/ 1087:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticleOutType = void 0;
var ParticleOutType;

(function (ParticleOutType) {
  ParticleOutType["normal"] = "normal";
  ParticleOutType["inside"] = "inside";
  ParticleOutType["outside"] = "outside";
})(ParticleOutType = exports.ParticleOutType || (exports.ParticleOutType = {}));

/***/ }),

/***/ 4591:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ShapeType = void 0;
var ShapeType;

(function (ShapeType) {
  ShapeType["char"] = "char";
  ShapeType["character"] = "character";
  ShapeType["circle"] = "circle";
  ShapeType["edge"] = "edge";
  ShapeType["image"] = "image";
  ShapeType["images"] = "images";
  ShapeType["line"] = "line";
  ShapeType["polygon"] = "polygon";
  ShapeType["square"] = "square";
  ShapeType["star"] = "star";
  ShapeType["triangle"] = "triangle";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));

/***/ }),

/***/ 1359:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StartValueType = void 0;
var StartValueType;

(function (StartValueType) {
  StartValueType["max"] = "max";
  StartValueType["min"] = "min";
  StartValueType["random"] = "random";
})(StartValueType = exports.StartValueType || (exports.StartValueType = {}));

/***/ }),

/***/ 3623:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(399), exports);

__exportStar(__webpack_require__(8834), exports);

__exportStar(__webpack_require__(231), exports);

__exportStar(__webpack_require__(7251), exports);

__exportStar(__webpack_require__(2075), exports);

__exportStar(__webpack_require__(4591), exports);

__exportStar(__webpack_require__(1359), exports);

__exportStar(__webpack_require__(8282), exports);

__exportStar(__webpack_require__(7990), exports);

__exportStar(__webpack_require__(4401), exports);

__exportStar(__webpack_require__(1087), exports);

/***/ }),

/***/ 8678:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(6464), exports);

__exportStar(__webpack_require__(5826), exports);

__exportStar(__webpack_require__(3289), exports);

__exportStar(__webpack_require__(3623), exports);

__exportStar(__webpack_require__(5820), exports);

/***/ }),

/***/ 9952:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnimatableColor = void 0;

const OptionsColor_1 = __webpack_require__(9239);

const HslAnimation_1 = __webpack_require__(4098);

class AnimatableColor extends OptionsColor_1.OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation_1.HslAnimation();
  }

  static create(source, data) {
    const color = new AnimatableColor();
    color.load(source);

    if (data !== undefined) {
      if (typeof data === "string" || data instanceof Array) {
        color.load({
          value: data
        });
      } else {
        color.load(data);
      }
    }

    return color;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    const colorAnimation = data.animation;

    if (colorAnimation !== undefined) {
      if (colorAnimation.enable !== undefined) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }

}

exports.AnimatableColor = AnimatableColor;

/***/ }),

/***/ 9159:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GradientColorOpacityAnimation = exports.GradientAngleAnimation = exports.AnimatableGradientColor = exports.GradientColorOpacity = exports.GradientAngle = exports.AnimatableGradient = void 0;

const Enums_1 = __webpack_require__(8678);

const AnimatableColor_1 = __webpack_require__(9952);

const Utils_1 = __webpack_require__(6617);

class AnimatableGradient {
  constructor() {
    this.angle = new GradientAngle();
    this.colors = [];
    this.type = Enums_1.GradientType.random;
  }

  load(data) {
    if (!data) {
      return;
    }

    this.angle.load(data.angle);

    if (data.colors !== undefined) {
      this.colors = data.colors.map(s => {
        const tmp = new AnimatableGradientColor();
        tmp.load(s);
        return tmp;
      });
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

}

exports.AnimatableGradient = AnimatableGradient;

class GradientAngle {
  constructor() {
    this.value = 0;
    this.animation = new GradientAngleAnimation();
    this.direction = Enums_1.RotateDirection.clockwise;
  }

  load(data) {
    if (!data) {
      return;
    }

    this.animation.load(data.animation);

    if (data.value !== undefined) {
      this.value = data.value;
    }

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
  }

}

exports.GradientAngle = GradientAngle;

class GradientColorOpacity {
  constructor() {
    this.value = 0;
    this.animation = new GradientColorOpacityAnimation();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.animation.load(data.animation);

    if (data.value !== undefined) {
      this.value = (0, Utils_1.setRangeValue)(data.value);
    }
  }

}

exports.GradientColorOpacity = GradientColorOpacity;

class AnimatableGradientColor {
  constructor() {
    this.stop = 0;
    this.value = new AnimatableColor_1.AnimatableColor();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.stop !== undefined) {
      this.stop = data.stop;
    }

    this.value = AnimatableColor_1.AnimatableColor.create(this.value, data.value);

    if (data.opacity !== undefined) {
      this.opacity = new GradientColorOpacity();

      if (typeof data.opacity === "number") {
        this.opacity.value = data.opacity;
      } else {
        this.opacity.load(data.opacity);
      }
    }
  }

}

exports.AnimatableGradientColor = AnimatableGradientColor;

class GradientAngleAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.GradientAngleAnimation = GradientAngleAnimation;

class GradientColorOpacityAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.sync = false;
    this.startValue = Enums_1.StartValueType.random;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
  }

}

exports.GradientColorOpacityAnimation = GradientColorOpacityAnimation;

/***/ }),

/***/ 8032:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AnimationOptions = void 0;

class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.AnimationOptions = AnimationOptions;

/***/ }),

/***/ 9298:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Background = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class Background {
  constructor() {
    this.color = new OptionsColor_1.OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
    }

    if (data.image !== undefined) {
      this.image = data.image;
    }

    if (data.position !== undefined) {
      this.position = data.position;
    }

    if (data.repeat !== undefined) {
      this.repeat = data.repeat;
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}

exports.Background = Background;

/***/ }),

/***/ 5281:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BackgroundMask = void 0;

const BackgroundMaskCover_1 = __webpack_require__(3354);

class BackgroundMask {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover_1.BackgroundMaskCover();
    this.enable = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.composite !== undefined) {
      this.composite = data.composite;
    }

    if (data.cover !== undefined) {
      const cover = data.cover;
      const color = typeof data.cover === "string" ? {
        color: data.cover
      } : data.cover;
      this.cover.load(cover.color !== undefined ? cover : {
        color: color
      });
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}

exports.BackgroundMask = BackgroundMask;

/***/ }),

/***/ 3354:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BackgroundMaskCover = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class BackgroundMaskCover {
  constructor() {
    this.color = new OptionsColor_1.OptionsColor();
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}

exports.BackgroundMaskCover = BackgroundMaskCover;

/***/ }),

/***/ 8198:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ColorAnimation = void 0;

const Utils_1 = __webpack_require__(6617);

class ColorAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.offset = 0;
    this.speed = 1;
    this.sync = true;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.offset !== undefined) {
      this.offset = (0, Utils_1.setRangeValue)(data.offset);
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.ColorAnimation = ColorAnimation;

/***/ }),

/***/ 2904:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FullScreen = void 0;

class FullScreen {
  constructor() {
    this.enable = true;
    this.zIndex = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.zIndex !== undefined) {
      this.zIndex = data.zIndex;
    }
  }

}

exports.FullScreen = FullScreen;

/***/ }),

/***/ 4098:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HslAnimation = void 0;

const ColorAnimation_1 = __webpack_require__(8198);

class HslAnimation {
  constructor() {
    this.h = new ColorAnimation_1.ColorAnimation();
    this.s = new ColorAnimation_1.ColorAnimation();
    this.l = new ColorAnimation_1.ColorAnimation();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }

}

exports.HslAnimation = HslAnimation;

/***/ }),

/***/ 1332:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ClickEvent = void 0;

class ClickEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
  }

}

exports.ClickEvent = ClickEvent;

/***/ }),

/***/ 1500:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DivEvent = void 0;

const Enums_1 = __webpack_require__(8678);

class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = Enums_1.DivType.circle;
  }

  get elementId() {
    return this.ids;
  }

  set elementId(value) {
    this.ids = value;
  }

  get el() {
    return this.elementId;
  }

  set el(value) {
    this.elementId = value;
  }

  get ids() {
    return this.selectors instanceof Array ? this.selectors.map(t => t.replace("#", "")) : this.selectors.replace("#", "");
  }

  set ids(value) {
    this.selectors = value instanceof Array ? value.map(t => `#${t}`) : `#${value}`;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;

    if (ids !== undefined) {
      this.ids = ids;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

}

exports.DivEvent = DivEvent;

/***/ }),

/***/ 7366:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Events = void 0;

const ClickEvent_1 = __webpack_require__(1332);

const DivEvent_1 = __webpack_require__(1500);

const HoverEvent_1 = __webpack_require__(2072);

class Events {
  constructor() {
    this.onClick = new ClickEvent_1.ClickEvent();
    this.onDiv = new DivEvent_1.DivEvent();
    this.onHover = new HoverEvent_1.HoverEvent();
    this.resize = true;
  }

  get onclick() {
    return this.onClick;
  }

  set onclick(value) {
    this.onClick = value;
  }

  get ondiv() {
    return this.onDiv;
  }

  set ondiv(value) {
    this.onDiv = value;
  }

  get onhover() {
    return this.onHover;
  }

  set onhover(value) {
    this.onHover = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
    const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;

    if (onDiv !== undefined) {
      if (onDiv instanceof Array) {
        this.onDiv = onDiv.map(div => {
          const tmp = new DivEvent_1.DivEvent();
          tmp.load(div);
          return tmp;
        });
      } else {
        this.onDiv = new DivEvent_1.DivEvent();
        this.onDiv.load(onDiv);
      }
    }

    this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);

    if (data.resize !== undefined) {
      this.resize = data.resize;
    }
  }

}

exports.Events = Events;

/***/ }),

/***/ 2072:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HoverEvent = void 0;

const Parallax_1 = __webpack_require__(4581);

class HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax_1.Parallax();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.parallax.load(data.parallax);
  }

}

exports.HoverEvent = HoverEvent;

/***/ }),

/***/ 4581:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Parallax = void 0;

class Parallax {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.force !== undefined) {
      this.force = data.force;
    }

    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
  }

}

exports.Parallax = Parallax;

/***/ }),

/***/ 6004:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Interactivity = void 0;

const Enums_1 = __webpack_require__(8678);

const Events_1 = __webpack_require__(7366);

const Modes_1 = __webpack_require__(22);

class Interactivity {
  constructor() {
    this.detectsOn = Enums_1.InteractivityDetect.window;
    this.events = new Events_1.Events();
    this.modes = new Modes_1.Modes();
  }

  get detect_on() {
    return this.detectsOn;
  }

  set detect_on(value) {
    this.detectsOn = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;

    if (detectsOn !== undefined) {
      this.detectsOn = detectsOn;
    }

    this.events.load(data.events);
    this.modes.load(data.modes);

    if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
      if (this.events.onHover.mode instanceof Array) {
        if (this.events.onHover.mode.indexOf(Enums_1.HoverMode.slow) < 0) {
          this.events.onHover.mode.push(Enums_1.HoverMode.slow);
        }
      } else if (this.events.onHover.mode !== Enums_1.HoverMode.slow) {
        this.events.onHover.mode = [this.events.onHover.mode, Enums_1.HoverMode.slow];
      }
    }
  }

}

exports.Interactivity = Interactivity;

/***/ }),

/***/ 8311:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Attract = void 0;

const Enums_1 = __webpack_require__(8678);

class Attract {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = Enums_1.EasingType.easeOutQuad;
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.easing !== undefined) {
      this.easing = data.easing;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }

}

exports.Attract = Attract;

/***/ }),

/***/ 8910:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Bounce = void 0;

class Bounce {
  constructor() {
    this.distance = 200;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }

}

exports.Bounce = Bounce;

/***/ }),

/***/ 6488:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Bubble = void 0;

const BubbleDiv_1 = __webpack_require__(5397);

const BubbleBase_1 = __webpack_require__(3561);

class Bubble extends BubbleBase_1.BubbleBase {
  load(data) {
    super.load(data);

    if (!(data !== undefined && data.divs !== undefined)) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new BubbleDiv_1.BubbleDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new BubbleDiv_1.BubbleDiv();
      }

      this.divs.load(data.divs);
    }
  }

}

exports.Bubble = Bubble;

/***/ }),

/***/ 3561:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BubbleBase = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class BubbleBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.mix !== undefined) {
      this.mix = data.mix;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.color !== undefined) {
      if (data.color instanceof Array) {
        this.color = data.color.map(s => OptionsColor_1.OptionsColor.create(undefined, s));
      } else {
        if (this.color instanceof Array) {
          this.color = new OptionsColor_1.OptionsColor();
        }

        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
      }
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }
  }

}

exports.BubbleBase = BubbleBase;

/***/ }),

/***/ 5397:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BubbleDiv = void 0;

const BubbleBase_1 = __webpack_require__(3561);

class BubbleDiv extends BubbleBase_1.BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }

  get ids() {
    return this.selectors instanceof Array ? this.selectors.map(t => t.replace("#", "")) : this.selectors.replace("#", "");
  }

  set ids(value) {
    this.selectors = value instanceof Array ? value.map(t => `#${t}`) : `#${value}`;
  }

  load(data) {
    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.ids !== undefined) {
      this.ids = data.ids;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }

}

exports.BubbleDiv = BubbleDiv;

/***/ }),

/***/ 9162:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Connect = void 0;

const ConnectLinks_1 = __webpack_require__(9157);

class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks_1.ConnectLinks();
    this.radius = 60;
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}

exports.Connect = Connect;

/***/ }),

/***/ 9157:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ConnectLinks = void 0;

class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
  }

  load(data) {
    if (!(data !== undefined && data.opacity !== undefined)) {
      return;
    }

    this.opacity = data.opacity;
  }

}

exports.ConnectLinks = ConnectLinks;

/***/ }),

/***/ 9030:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Grab = void 0;

const GrabLinks_1 = __webpack_require__(4000);

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks_1.GrabLinks();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
  }

}

exports.Grab = Grab;

/***/ }),

/***/ 4000:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GrabLinks = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class GrabLinks {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
    }

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}

exports.GrabLinks = GrabLinks;

/***/ }),

/***/ 2873:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Light = void 0;

const LightArea_1 = __webpack_require__(4306);

const LightShadow_1 = __webpack_require__(1016);

class Light {
  constructor() {
    this.area = new LightArea_1.LightArea();
    this.shadow = new LightShadow_1.LightShadow();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }

}

exports.Light = Light;

/***/ }),

/***/ 4306:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LightArea = void 0;

const LightGradient_1 = __webpack_require__(2940);

class LightArea {
  constructor() {
    this.gradient = new LightGradient_1.LightGradient();
    this.radius = 1000;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.gradient.load(data.gradient);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}

exports.LightArea = LightArea;

/***/ }),

/***/ 2940:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LightGradient = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class LightGradient {
  constructor() {
    this.start = new OptionsColor_1.OptionsColor();
    this.stop = new OptionsColor_1.OptionsColor();
    this.start.value = "#ffffff";
    this.stop.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.start = OptionsColor_1.OptionsColor.create(this.start, data.start);
    this.stop = OptionsColor_1.OptionsColor.create(this.stop, data.stop);
  }

}

exports.LightGradient = LightGradient;

/***/ }),

/***/ 1016:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LightShadow = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class LightShadow {
  constructor() {
    this.color = new OptionsColor_1.OptionsColor();
    this.color.value = "#000000";
    this.length = 2000;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);

    if (data.length !== undefined) {
      this.length = data.length;
    }
  }

}

exports.LightShadow = LightShadow;

/***/ }),

/***/ 22:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Modes = void 0;

const Bubble_1 = __webpack_require__(6488);

const Connect_1 = __webpack_require__(9162);

const Grab_1 = __webpack_require__(9030);

const Remove_1 = __webpack_require__(851);

const Push_1 = __webpack_require__(7268);

const Repulse_1 = __webpack_require__(410);

const Slow_1 = __webpack_require__(8916);

const Trail_1 = __webpack_require__(9426);

const Attract_1 = __webpack_require__(8311);

const Light_1 = __webpack_require__(2873);

const Bounce_1 = __webpack_require__(8910);

class Modes {
  constructor() {
    this.attract = new Attract_1.Attract();
    this.bounce = new Bounce_1.Bounce();
    this.bubble = new Bubble_1.Bubble();
    this.connect = new Connect_1.Connect();
    this.grab = new Grab_1.Grab();
    this.light = new Light_1.Light();
    this.push = new Push_1.Push();
    this.remove = new Remove_1.Remove();
    this.repulse = new Repulse_1.Repulse();
    this.slow = new Slow_1.Slow();
    this.trail = new Trail_1.Trail();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.attract.load(data.attract);
    this.bubble.load(data.bubble);
    this.connect.load(data.connect);
    this.grab.load(data.grab);
    this.light.load(data.light);
    this.push.load(data.push);
    this.remove.load(data.remove);
    this.repulse.load(data.repulse);
    this.slow.load(data.slow);
    this.trail.load(data.trail);
  }

}

exports.Modes = Modes;

/***/ }),

/***/ 7268:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Push = void 0;

class Push {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }

  get particles_nb() {
    return this.quantity;
  }

  set particles_nb(value) {
    this.quantity = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.default !== undefined) {
      this.default = data.default;
    }

    if (data.groups !== undefined) {
      this.groups = data.groups.map(t => t);
    }

    if (!this.groups.length) {
      this.default = true;
    }

    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;

    if (quantity !== undefined) {
      this.quantity = quantity;
    }
  }

}

exports.Push = Push;

/***/ }),

/***/ 851:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Remove = void 0;

class Remove {
  constructor() {
    this.quantity = 2;
  }

  get particles_nb() {
    return this.quantity;
  }

  set particles_nb(value) {
    this.quantity = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;

    if (quantity !== undefined) {
      this.quantity = quantity;
    }
  }

}

exports.Remove = Remove;

/***/ }),

/***/ 410:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Repulse = void 0;

const RepulseDiv_1 = __webpack_require__(5414);

const RepulseBase_1 = __webpack_require__(5948);

class Repulse extends RepulseBase_1.RepulseBase {
  load(data) {
    super.load(data);

    if ((data === null || data === void 0 ? void 0 : data.divs) === undefined) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new RepulseDiv_1.RepulseDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new RepulseDiv_1.RepulseDiv();
      }

      this.divs.load(data.divs);
    }
  }

}

exports.Repulse = Repulse;

/***/ }),

/***/ 5948:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RepulseBase = void 0;

const Enums_1 = __webpack_require__(8678);

class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = Enums_1.EasingType.easeOutQuad;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.easing !== undefined) {
      this.easing = data.easing;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }
  }

}

exports.RepulseBase = RepulseBase;

/***/ }),

/***/ 5414:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RepulseDiv = void 0;

const RepulseBase_1 = __webpack_require__(5948);

class RepulseDiv extends RepulseBase_1.RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }

  get ids() {
    if (this.selectors instanceof Array) {
      return this.selectors.map(t => t.replace("#", ""));
    } else {
      return this.selectors.replace("#", "");
    }
  }

  set ids(value) {
    if (value instanceof Array) {
      this.selectors = value.map(() => `#${value}`);
    } else {
      this.selectors = `#${value}`;
    }
  }

  load(data) {
    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.ids !== undefined) {
      this.ids = data.ids;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }

}

exports.RepulseDiv = RepulseDiv;

/***/ }),

/***/ 8916:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Slow = void 0;

class Slow {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }

  get active() {
    return false;
  }

  set active(_value) {}

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}

exports.Slow = Slow;

/***/ }),

/***/ 9426:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Trail = void 0;

const Utils_1 = __webpack_require__(6617);

class Trail {
  constructor() {
    this.delay = 1;
    this.pauseOnStop = false;
    this.quantity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.quantity !== undefined) {
      this.quantity = data.quantity;
    }

    if (data.particles !== undefined) {
      this.particles = (0, Utils_1.deepExtend)({}, data.particles);
    }

    if (data.pauseOnStop !== undefined) {
      this.pauseOnStop = data.pauseOnStop;
    }
  }

}

exports.Trail = Trail;

/***/ }),

/***/ 8852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ManualParticle = void 0;

const Utils_1 = __webpack_require__(6617);

class ManualParticle {
  load(data) {
    var _a, _b;

    if (!data) {
      return;
    }

    if (data.position !== undefined) {
      this.position = {
        x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
        y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50
      };
    }

    if (data.options !== undefined) {
      this.options = (0, Utils_1.deepExtend)({}, data.options);
    }
  }

}

exports.ManualParticle = ManualParticle;

/***/ }),

/***/ 8058:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Motion = void 0;

const MotionReduce_1 = __webpack_require__(2648);

class Motion {
  constructor() {
    this.disable = false;
    this.reduce = new MotionReduce_1.MotionReduce();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.disable !== undefined) {
      this.disable = data.disable;
    }

    this.reduce.load(data.reduce);
  }

}

exports.Motion = Motion;

/***/ }),

/***/ 2648:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MotionReduce = void 0;

class MotionReduce {
  constructor() {
    this.factor = 4;
    this.value = true;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}

exports.MotionReduce = MotionReduce;

/***/ }),

/***/ 4075:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Options_instances, _Options_findDefaultTheme;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Options = void 0;

const Interactivity_1 = __webpack_require__(6004);

const ParticlesOptions_1 = __webpack_require__(5640);

const BackgroundMask_1 = __webpack_require__(5281);

const Background_1 = __webpack_require__(9298);

const Utils_1 = __webpack_require__(6617);

const Theme_1 = __webpack_require__(2951);

const Enums_1 = __webpack_require__(8678);

const FullScreen_1 = __webpack_require__(2904);

const Motion_1 = __webpack_require__(8058);

const ManualParticle_1 = __webpack_require__(8852);

const Responsive_1 = __webpack_require__(3673);

class Options {
  constructor() {
    _Options_instances.add(this);

    this.autoPlay = true;
    this.background = new Background_1.Background();
    this.backgroundMask = new BackgroundMask_1.BackgroundMask();
    this.fullScreen = new FullScreen_1.FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 60;
    this.interactivity = new Interactivity_1.Interactivity();
    this.manualParticles = [];
    this.motion = new Motion_1.Motion();
    this.particles = new ParticlesOptions_1.ParticlesOptions();
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.themes = [];
    this.zLayers = 100;
  }

  get fps_limit() {
    return this.fpsLimit;
  }

  set fps_limit(value) {
    this.fpsLimit = value;
  }

  get retina_detect() {
    return this.detectRetina;
  }

  set retina_detect(value) {
    this.detectRetina = value;
  }

  get backgroundMode() {
    return this.fullScreen;
  }

  set backgroundMode(value) {
    this.fullScreen.load(value);
  }

  load(data) {
    var _a, _b, _c, _d, _e;

    if (data === undefined) {
      return;
    }

    if (data.preset !== undefined) {
      if (data.preset instanceof Array) {
        for (const preset of data.preset) {
          this.importPreset(preset);
        }
      } else {
        this.importPreset(data.preset);
      }
    }

    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }

    const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;

    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;

    if (fpsLimit !== undefined) {
      this.fpsLimit = fpsLimit;
    }

    if (data.pauseOnBlur !== undefined) {
      this.pauseOnBlur = data.pauseOnBlur;
    }

    if (data.pauseOnOutsideViewport !== undefined) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }

    if (data.zLayers !== undefined) {
      this.zLayers = data.zLayers;
    }

    this.background.load(data.background);
    const fullScreen = (_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode;

    if (typeof fullScreen === "boolean") {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }

    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);

    if (data.manualParticles !== undefined) {
      this.manualParticles = data.manualParticles.map(t => {
        const tmp = new ManualParticle_1.ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }

    this.motion.load(data.motion);
    this.particles.load(data.particles);
    Utils_1.Plugins.loadOptions(this, data);

    if (data.responsive !== undefined) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive_1.Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }

    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);

    if (data.themes !== undefined) {
      for (const theme of data.themes) {
        const optTheme = new Theme_1.Theme();
        optTheme.load(theme);
        this.themes.push(optTheme);
      }
    }

    this.defaultDarkTheme = (_d = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, Enums_1.ThemeMode.dark)) === null || _d === void 0 ? void 0 : _d.name;
    this.defaultLightTheme = (_e = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, Enums_1.ThemeMode.light)) === null || _e === void 0 ? void 0 : _e.name;
  }

  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find(theme => theme.name === name);

      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"),
            clientDarkMode = mediaMatch && mediaMatch.matches,
            defaultTheme = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? Enums_1.ThemeMode.dark : Enums_1.ThemeMode.light);

      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }

  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find(t => t.mode === Enums_1.ResponsiveMode.screen && screen ? t.maxWidth * pxRatio > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
    return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
  }

  importPreset(preset) {
    this.load(Utils_1.Plugins.getPreset(preset));
  }

}

exports.Options = Options;
_Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
  var _a;

  return (_a = this.themes.find(theme => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find(theme => theme.default.value && theme.default.mode === Enums_1.ThemeMode.any);
};

/***/ }),

/***/ 9239:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionsColor = void 0;

class OptionsColor {
  constructor() {
    this.value = "#fff";
  }

  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);

    if (data !== undefined) {
      if (typeof data === "string" || data instanceof Array) {
        color.load({
          value: data
        });
      } else {
        color.load(data);
      }
    }

    return color;
  }

  load(data) {
    if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
      return;
    }

    this.value = data.value;
  }

}

exports.OptionsColor = OptionsColor;

/***/ }),

/***/ 9018:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Bounce = void 0;

const BounceFactor_1 = __webpack_require__(3610);

class Bounce {
  constructor() {
    this.horizontal = new BounceFactor_1.BounceFactor();
    this.vertical = new BounceFactor_1.BounceFactor();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }

}

exports.Bounce = Bounce;

/***/ }),

/***/ 3610:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BounceFactor = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class BounceFactor extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }

}

exports.BounceFactor = BounceFactor;

/***/ }),

/***/ 1895:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Collisions = void 0;

const Enums_1 = __webpack_require__(8678);

const Bounce_1 = __webpack_require__(9018);

const CollisionsOverlap_1 = __webpack_require__(464);

class Collisions {
  constructor() {
    this.bounce = new Bounce_1.Bounce();
    this.enable = false;
    this.mode = Enums_1.CollisionMode.bounce;
    this.overlap = new CollisionsOverlap_1.CollisionsOverlap();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.bounce.load(data.bounce);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.overlap.load(data.overlap);
  }

}

exports.Collisions = Collisions;

/***/ }),

/***/ 464:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CollisionsOverlap = void 0;

class CollisionsOverlap {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.retries !== undefined) {
      this.retries = data.retries;
    }
  }

}

exports.CollisionsOverlap = CollisionsOverlap;

/***/ }),

/***/ 2583:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Destroy = void 0;

const Enums_1 = __webpack_require__(8678);

const Split_1 = __webpack_require__(8182);

class Destroy {
  constructor() {
    this.mode = Enums_1.DestroyMode.none;
    this.split = new Split_1.Split();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.split.load(data.split);
  }

}

exports.Destroy = Destroy;

/***/ }),

/***/ 8182:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Split = void 0;

const SplitFactor_1 = __webpack_require__(8704);

const SplitRate_1 = __webpack_require__(8019);

const Utils_1 = __webpack_require__(6617);

class Split {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor_1.SplitFactor();
    this.rate = new SplitRate_1.SplitRate();
    this.sizeOffset = true;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.factor.load(data.factor);
    this.rate.load(data.rate);

    if (data.particles !== undefined) {
      this.particles = (0, Utils_1.deepExtend)({}, data.particles);
    }

    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }
  }

}

exports.Split = Split;

/***/ }),

/***/ 8704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SplitFactor = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class SplitFactor extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }

}

exports.SplitFactor = SplitFactor;

/***/ }),

/***/ 8019:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SplitRate = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class SplitRate extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.value = {
      min: 4,
      max: 9
    };
  }

}

exports.SplitRate = SplitRate;

/***/ }),

/***/ 6502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Life = void 0;

const LifeDelay_1 = __webpack_require__(4659);

const LifeDuration_1 = __webpack_require__(2578);

class Life {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay_1.LifeDelay();
    this.duration = new LifeDuration_1.LifeDuration();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }

}

exports.Life = Life;

/***/ }),

/***/ 4659:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LifeDelay = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class LifeDelay extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.LifeDelay = LifeDelay;

/***/ }),

/***/ 2578:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LifeDuration = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class LifeDuration extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.0001;
    this.sync = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.LifeDuration = LifeDuration;

/***/ }),

/***/ 2102:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Links = void 0;

const LinksShadow_1 = __webpack_require__(5372);

const LinksTriangle_1 = __webpack_require__(3797);

const OptionsColor_1 = __webpack_require__(9239);

class Links {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor_1.OptionsColor();
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow_1.LinksShadow();
    this.triangles = new LinksTriangle_1.LinksTriangle();
    this.width = 1;
    this.warp = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.id !== undefined) {
      this.id = data.id;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }

}

exports.Links = Links;

/***/ }),

/***/ 5372:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LinksShadow = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class LinksShadow {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor_1.OptionsColor();
    this.enable = false;
    this.color.value = "#00ff00";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blur !== undefined) {
      this.blur = data.blur;
    }

    this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}

exports.LinksShadow = LinksShadow;

/***/ }),

/***/ 3797:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LinksTriangle = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class LinksTriangle {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}

exports.LinksTriangle = LinksTriangle;

/***/ }),

/***/ 9769:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Attract = void 0;

class Attract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
    };
  }

  get rotateX() {
    return this.rotate.x;
  }

  set rotateX(value) {
    this.rotate.x = value;
  }

  get rotateY() {
    return this.rotate.y;
  }

  set rotateY(value) {
    this.rotate.y = value;
  }

  load(data) {
    var _a, _b, _c, _d;

    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;

    if (rotateX !== undefined) {
      this.rotate.x = rotateX;
    }

    const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;

    if (rotateY !== undefined) {
      this.rotate.y = rotateY;
    }
  }

}

exports.Attract = Attract;

/***/ }),

/***/ 6050:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Move = void 0;

const Attract_1 = __webpack_require__(9769);

const Enums_1 = __webpack_require__(8678);

const Trail_1 = __webpack_require__(1266);

const Path_1 = __webpack_require__(8110);

const MoveAngle_1 = __webpack_require__(1190);

const MoveGravity_1 = __webpack_require__(4655);

const OutModes_1 = __webpack_require__(8399);

const Utils_1 = __webpack_require__(6617);

const Spin_1 = __webpack_require__(871);

class Move {
  constructor() {
    this.angle = new MoveAngle_1.MoveAngle();
    this.attract = new Attract_1.Attract();
    this.center = {
      x: 50,
      y: 50,
      radius: 0
    };
    this.decay = 0;
    this.distance = {};
    this.direction = Enums_1.MoveDirection.none;
    this.drift = 0;
    this.enable = false;
    this.gravity = new MoveGravity_1.MoveGravity();
    this.path = new Path_1.Path();
    this.outModes = new OutModes_1.OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin_1.Spin();
    this.straight = false;
    this.trail = new Trail_1.Trail();
    this.vibrate = false;
    this.warp = false;
  }

  get collisions() {
    return false;
  }

  set collisions(value) {}

  get bounce() {
    return this.collisions;
  }

  set bounce(value) {
    this.collisions = value;
  }

  get out_mode() {
    return this.outMode;
  }

  set out_mode(value) {
    this.outMode = value;
  }

  get outMode() {
    return this.outModes.default;
  }

  set outMode(value) {
    this.outModes.default = value;
  }

  get noise() {
    return this.path;
  }

  set noise(value) {
    this.path = value;
  }

  load(data) {
    var _a, _b, _c, _d, _e, _f;

    if (data === undefined) {
      return;
    }

    if (data.angle !== undefined) {
      if (typeof data.angle === "number") {
        this.angle.value = data.angle;
      } else {
        this.angle.load(data.angle);
      }
    }

    this.attract.load(data.attract);

    if (((_a = data.center) === null || _a === void 0 ? void 0 : _a.x) !== undefined) {
      this.center.x = data.center.x;
    }

    if (((_b = data.center) === null || _b === void 0 ? void 0 : _b.y) !== undefined) {
      this.center.y = data.center.y;
    }

    if (((_c = data.center) === null || _c === void 0 ? void 0 : _c.radius) !== undefined) {
      this.center.radius = data.center.radius;
    }

    if (data.decay !== undefined) {
      this.decay = data.decay;
    }

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.distance !== undefined) {
      this.distance = typeof data.distance === "number" ? {
        horizontal: data.distance,
        vertical: data.distance
      } : (0, Utils_1.deepExtend)({}, data.distance);
    }

    if (data.drift !== undefined) {
      this.drift = (0, Utils_1.setRangeValue)(data.drift);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.gravity.load(data.gravity);
    const outMode = (_d = data.outMode) !== null && _d !== void 0 ? _d : data.out_mode;

    if (data.outModes || outMode) {
      if (typeof data.outModes === "string" || !data.outModes && outMode) {
        this.outModes.load({
          default: (_e = data.outModes) !== null && _e !== void 0 ? _e : outMode
        });
      } else {
        this.outModes.load(data.outModes);
      }
    }

    this.path.load((_f = data.path) !== null && _f !== void 0 ? _f : data.noise);

    if (data.random !== undefined) {
      this.random = data.random;
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }

    if (data.speed !== undefined) {
      this.speed = (0, Utils_1.setRangeValue)(data.speed);
    }

    this.spin.load(data.spin);

    if (data.straight !== undefined) {
      this.straight = data.straight;
    }

    this.trail.load(data.trail);

    if (data.vibrate !== undefined) {
      this.vibrate = data.vibrate;
    }

    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }

}

exports.Move = Move;

/***/ }),

/***/ 1190:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MoveAngle = void 0;

class MoveAngle {
  constructor() {
    this.offset = 0;
    this.value = 90;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.offset !== undefined) {
      this.offset = data.offset;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}

exports.MoveAngle = MoveAngle;

/***/ }),

/***/ 4655:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MoveGravity = void 0;

class MoveGravity {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.acceleration !== undefined) {
      this.acceleration = data.acceleration;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.inverse !== undefined) {
      this.inverse = data.inverse;
    }

    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }
  }

}

exports.MoveGravity = MoveGravity;

/***/ }),

/***/ 8399:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OutModes = void 0;

const Modes_1 = __webpack_require__(5826);

class OutModes {
  constructor() {
    this.default = Modes_1.OutMode.out;
  }

  load(data) {
    var _a, _b, _c, _d;

    if (!data) {
      return;
    }

    if (data.default !== undefined) {
      this.default = data.default;
    }

    this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
    this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
    this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
    this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
  }

}

exports.OutModes = OutModes;

/***/ }),

/***/ 8110:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Path = void 0;

const PathDelay_1 = __webpack_require__(2633);

const Utils_1 = __webpack_require__(6617);

class Path {
  constructor() {
    this.clamp = true;
    this.delay = new PathDelay_1.PathDelay();
    this.enable = false;
    this.options = {};
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.clamp !== undefined) {
      this.clamp = data.clamp;
    }

    this.delay.load(data.delay);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.generator = data.generator;

    if (data.options) {
      this.options = (0, Utils_1.deepExtend)(this.options, data.options);
    }
  }

}

exports.Path = Path;

/***/ }),

/***/ 2633:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PathDelay = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class PathDelay extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
  }

}

exports.PathDelay = PathDelay;

/***/ }),

/***/ 871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Spin = void 0;

const Utils_1 = __webpack_require__(6617);

class Spin {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.acceleration !== undefined) {
      this.acceleration = (0, Utils_1.setRangeValue)(data.acceleration);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.position = data.position ? (0, Utils_1.deepExtend)({}, data.position) : undefined;
  }

}

exports.Spin = Spin;

/***/ }),

/***/ 1266:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Trail = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class Trail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fillColor = new OptionsColor_1.OptionsColor();
    this.fillColor.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.fillColor = OptionsColor_1.OptionsColor.create(this.fillColor, data.fillColor);

    if (data.length !== undefined) {
      this.length = data.length;
    }
  }

}

exports.Trail = Trail;

/***/ }),

/***/ 9353:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Density = void 0;

class Density {
  constructor() {
    this.enable = false;
    this.area = 800;
    this.factor = 1000;
  }

  get value_area() {
    return this.area;
  }

  set value_area(value) {
    this.area = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;

    if (area !== undefined) {
      this.area = area;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
  }

}

exports.Density = Density;

/***/ }),

/***/ 4893:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticlesNumber = void 0;

const Density_1 = __webpack_require__(9353);

class ParticlesNumber {
  constructor() {
    this.density = new Density_1.Density();
    this.limit = 0;
    this.value = 100;
  }

  get max() {
    return this.limit;
  }

  set max(value) {
    this.limit = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    this.density.load(data.density);
    const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;

    if (limit !== undefined) {
      this.limit = limit;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}

exports.ParticlesNumber = ParticlesNumber;

/***/ }),

/***/ 3442:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Opacity = void 0;

const OpacityAnimation_1 = __webpack_require__(2460);

const ValueWithRandom_1 = __webpack_require__(5572);

const Utils_1 = __webpack_require__(6617);

class Opacity extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation_1.OpacityAnimation();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }

  get anim() {
    return this.animation;
  }

  set anim(value) {
    this.animation = value;
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    super.load(data);
    const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;

    if (animation !== undefined) {
      this.animation.load(animation);
      this.value = (0, Utils_1.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
    }
  }

}

exports.Opacity = Opacity;

/***/ }),

/***/ 2460:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OpacityAnimation = void 0;

const Enums_1 = __webpack_require__(8678);

const AnimationOptions_1 = __webpack_require__(8032);

class OpacityAnimation extends AnimationOptions_1.AnimationOptions {
  constructor() {
    super();
    this.destroy = Enums_1.DestroyType.none;
    this.enable = false;
    this.speed = 2;
    this.startValue = Enums_1.StartValueType.random;
    this.sync = false;
  }

  get opacity_min() {
    return this.minimumValue;
  }

  set opacity_min(value) {
    this.minimumValue = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    super.load(data);

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.OpacityAnimation = OpacityAnimation;

/***/ }),

/***/ 3457:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Orbit = void 0;

const OrbitRotation_1 = __webpack_require__(7950);

const OptionsColor_1 = __webpack_require__(9239);

const AnimationOptions_1 = __webpack_require__(8032);

class Orbit {
  constructor() {
    this.animation = new AnimationOptions_1.AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation_1.OrbitRotation();
    this.width = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.animation.load(data.animation);
    this.rotation.load(data.rotation);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
    }
  }

}

exports.Orbit = Orbit;

/***/ }),

/***/ 7950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OrbitRotation = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class OrbitRotation extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.value = 45;
    this.random.enable = false;
    this.random.minimumValue = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    super.load(data);
  }

}

exports.OrbitRotation = OrbitRotation;

/***/ }),

/***/ 5640:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticlesOptions = void 0;

const Links_1 = __webpack_require__(2102);

const Move_1 = __webpack_require__(6050);

const ParticlesNumber_1 = __webpack_require__(4893);

const Opacity_1 = __webpack_require__(3442);

const Shape_1 = __webpack_require__(3444);

const Size_1 = __webpack_require__(6934);

const Rotate_1 = __webpack_require__(299);

const Shadow_1 = __webpack_require__(1218);

const Stroke_1 = __webpack_require__(4326);

const Collisions_1 = __webpack_require__(1895);

const Twinkle_1 = __webpack_require__(1117);

const AnimatableColor_1 = __webpack_require__(9952);

const Life_1 = __webpack_require__(6502);

const Bounce_1 = __webpack_require__(9018);

const Destroy_1 = __webpack_require__(2583);

const Wobble_1 = __webpack_require__(7464);

const Tilt_1 = __webpack_require__(9320);

const Roll_1 = __webpack_require__(3889);

const ZIndex_1 = __webpack_require__(6097);

const Utils_1 = __webpack_require__(6617);

const Orbit_1 = __webpack_require__(3457);

const Repulse_1 = __webpack_require__(803);

const AnimatableGradient_1 = __webpack_require__(9159);

class ParticlesOptions {
  constructor() {
    this.bounce = new Bounce_1.Bounce();
    this.collisions = new Collisions_1.Collisions();
    this.color = new AnimatableColor_1.AnimatableColor();
    this.destroy = new Destroy_1.Destroy();
    this.gradient = [];
    this.groups = {};
    this.life = new Life_1.Life();
    this.links = new Links_1.Links();
    this.move = new Move_1.Move();
    this.number = new ParticlesNumber_1.ParticlesNumber();
    this.opacity = new Opacity_1.Opacity();
    this.orbit = new Orbit_1.Orbit();
    this.reduceDuplicates = false;
    this.repulse = new Repulse_1.Repulse();
    this.roll = new Roll_1.Roll();
    this.rotate = new Rotate_1.Rotate();
    this.shadow = new Shadow_1.Shadow();
    this.shape = new Shape_1.Shape();
    this.size = new Size_1.Size();
    this.stroke = new Stroke_1.Stroke();
    this.tilt = new Tilt_1.Tilt();
    this.twinkle = new Twinkle_1.Twinkle();
    this.wobble = new Wobble_1.Wobble();
    this.zIndex = new ZIndex_1.ZIndex();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h;

    if (data === undefined) {
      return;
    }

    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor_1.AnimatableColor.create(this.color, data.color));
    this.destroy.load(data.destroy);
    this.life.load(data.life);
    const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;

    if (links !== undefined) {
      this.links.load(links);
    }

    if (data.groups !== undefined) {
      for (const group in data.groups) {
        const item = data.groups[group];

        if (item !== undefined) {
          this.groups[group] = (0, Utils_1.deepExtend)((_c = this.groups[group]) !== null && _c !== void 0 ? _c : {}, item);
        }
      }
    }

    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.orbit.load(data.orbit);

    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }

    this.repulse.load(data.repulse);
    this.roll.load(data.roll);
    this.rotate.load(data.rotate);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.tilt.load(data.tilt);
    this.twinkle.load(data.twinkle);
    this.wobble.load(data.wobble);
    this.zIndex.load(data.zIndex);
    const collisions = (_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.collisions) !== null && _e !== void 0 ? _e : (_f = data.move) === null || _f === void 0 ? void 0 : _f.bounce;

    if (collisions !== undefined) {
      this.collisions.enable = collisions;
    }

    this.collisions.load(data.collisions);
    const strokeToLoad = (_g = data.stroke) !== null && _g !== void 0 ? _g : (_h = data.shape) === null || _h === void 0 ? void 0 : _h.stroke;

    if (strokeToLoad) {
      if (strokeToLoad instanceof Array) {
        this.stroke = strokeToLoad.map(s => {
          const tmp = new Stroke_1.Stroke();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.stroke instanceof Array) {
          this.stroke = new Stroke_1.Stroke();
        }

        this.stroke.load(strokeToLoad);
      }
    }

    const gradientToLoad = data.gradient;

    if (gradientToLoad) {
      if (gradientToLoad instanceof Array) {
        this.gradient = gradientToLoad.map(s => {
          const tmp = new AnimatableGradient_1.AnimatableGradient();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.gradient instanceof Array) {
          this.gradient = new AnimatableGradient_1.AnimatableGradient();
        }

        this.gradient.load(gradientToLoad);
      }
    }
  }

}

exports.ParticlesOptions = ParticlesOptions;

/***/ }),

/***/ 803:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Repulse = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class Repulse extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.enabled = false;
    this.distance = 1;
    this.duration = 1;
    this.factor = 1;
    this.speed = 1;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    if (data.enabled !== undefined) {
      this.enabled = data.enabled;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }

}

exports.Repulse = Repulse;

/***/ }),

/***/ 3889:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Roll = void 0;

const OptionsColor_1 = __webpack_require__(9239);

const RollLight_1 = __webpack_require__(2880);

const Utils_1 = __webpack_require__(6617);

const Enums_1 = __webpack_require__(8678);

class Roll {
  constructor() {
    this.darken = new RollLight_1.RollLight();
    this.enable = false;
    this.enlighten = new RollLight_1.RollLight();
    this.mode = Enums_1.RollMode.vertical;
    this.speed = 25;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.backColor !== undefined) {
      this.backColor = OptionsColor_1.OptionsColor.create(this.backColor, data.backColor);
    }

    this.darken.load(data.darken);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.enlighten.load(data.enlighten);

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.speed !== undefined) {
      this.speed = (0, Utils_1.setRangeValue)(data.speed);
    }
  }

}

exports.Roll = Roll;

/***/ }),

/***/ 2880:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RollLight = void 0;

class RollLight {
  constructor() {
    this.enable = false;
    this.value = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}

exports.RollLight = RollLight;

/***/ }),

/***/ 299:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Rotate = void 0;

const RotateAnimation_1 = __webpack_require__(9795);

const Enums_1 = __webpack_require__(8678);

const ValueWithRandom_1 = __webpack_require__(5572);

class Rotate extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation_1.RotateAnimation();
    this.direction = Enums_1.RotateDirection.clockwise;
    this.path = false;
    this.value = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    this.animation.load(data.animation);

    if (data.path !== undefined) {
      this.path = data.path;
    }
  }

}

exports.Rotate = Rotate;

/***/ }),

/***/ 9795:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RotateAnimation = void 0;

class RotateAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.RotateAnimation = RotateAnimation;

/***/ }),

/***/ 1218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Shadow = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor_1.OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blur !== undefined) {
      this.blur = data.blur;
    }

    this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.offset === undefined) {
      return;
    }

    if (data.offset.x !== undefined) {
      this.offset.x = data.offset.x;
    }

    if (data.offset.y !== undefined) {
      this.offset.y = data.offset.y;
    }
  }

}

exports.Shadow = Shadow;

/***/ }),

/***/ 3444:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Shape = void 0;

const Enums_1 = __webpack_require__(8678);

const Utils_1 = __webpack_require__(6617);

class Shape {
  constructor() {
    this.options = {};
    this.type = Enums_1.ShapeType.circle;
  }

  get image() {
    var _a;

    return (_a = this.options[Enums_1.ShapeType.image]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.images];
  }

  set image(value) {
    this.options[Enums_1.ShapeType.image] = value;
    this.options[Enums_1.ShapeType.images] = value;
  }

  get custom() {
    return this.options;
  }

  set custom(value) {
    this.options = value;
  }

  get images() {
    return this.image;
  }

  set images(value) {
    this.image = value;
  }

  get stroke() {
    return [];
  }

  set stroke(_value) {}

  get character() {
    var _a;

    return (_a = this.options[Enums_1.ShapeType.character]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.char];
  }

  set character(value) {
    this.options[Enums_1.ShapeType.character] = value;
    this.options[Enums_1.ShapeType.char] = value;
  }

  get polygon() {
    var _a;

    return (_a = this.options[Enums_1.ShapeType.polygon]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.star];
  }

  set polygon(value) {
    this.options[Enums_1.ShapeType.polygon] = value;
    this.options[Enums_1.ShapeType.star] = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;

    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];

        if (item !== undefined) {
          this.options[shape] = (0, Utils_1.deepExtend)((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
        }
      }
    }

    this.loadShape(data.character, Enums_1.ShapeType.character, Enums_1.ShapeType.char, true);
    this.loadShape(data.polygon, Enums_1.ShapeType.polygon, Enums_1.ShapeType.star, false);
    this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, Enums_1.ShapeType.image, Enums_1.ShapeType.images, true);

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

  loadShape(item, mainKey, altKey, altOverride) {
    var _a, _b, _c, _d;

    if (item === undefined) {
      return;
    }

    if (item instanceof Array) {
      if (!(this.options[mainKey] instanceof Array)) {
        this.options[mainKey] = [];

        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = [];
        }
      }

      this.options[mainKey] = (0, Utils_1.deepExtend)((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);

      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = (0, Utils_1.deepExtend)((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
      }
    } else {
      if (this.options[mainKey] instanceof Array) {
        this.options[mainKey] = {};

        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = {};
        }
      }

      this.options[mainKey] = (0, Utils_1.deepExtend)((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);

      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = (0, Utils_1.deepExtend)((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
      }
    }
  }

}

exports.Shape = Shape;

/***/ }),

/***/ 6934:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Size = void 0;

const SizeAnimation_1 = __webpack_require__(2499);

const ValueWithRandom_1 = __webpack_require__(5572);

const Utils_1 = __webpack_require__(6617);

class Size extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation_1.SizeAnimation();
    this.random.minimumValue = 1;
    this.value = 3;
  }

  get anim() {
    return this.animation;
  }

  set anim(value) {
    this.animation = value;
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    super.load(data);
    const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;

    if (animation !== undefined) {
      this.animation.load(animation);
      this.value = (0, Utils_1.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
    }
  }

}

exports.Size = Size;

/***/ }),

/***/ 2499:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SizeAnimation = void 0;

const Enums_1 = __webpack_require__(8678);

const AnimationOptions_1 = __webpack_require__(8032);

class SizeAnimation extends AnimationOptions_1.AnimationOptions {
  constructor() {
    super();
    this.destroy = Enums_1.DestroyType.none;
    this.enable = false;
    this.speed = 5;
    this.startValue = Enums_1.StartValueType.random;
    this.sync = false;
  }

  get size_min() {
    return this.minimumValue;
  }

  set size_min(value) {
    this.minimumValue = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    super.load(data);

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.SizeAnimation = SizeAnimation;

/***/ }),

/***/ 4326:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Stroke = void 0;

const AnimatableColor_1 = __webpack_require__(9952);

class Stroke {
  constructor() {
    this.width = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = AnimatableColor_1.AnimatableColor.create(this.color, data.color);
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}

exports.Stroke = Stroke;

/***/ }),

/***/ 9320:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Tilt = void 0;

const TiltAnimation_1 = __webpack_require__(1890);

const Enums_1 = __webpack_require__(8678);

const ValueWithRandom_1 = __webpack_require__(5572);

class Tilt extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.animation = new TiltAnimation_1.TiltAnimation();
    this.direction = Enums_1.TiltDirection.clockwise;
    this.enable = false;
    this.value = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);
    this.animation.load(data.animation);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}

exports.Tilt = Tilt;

/***/ }),

/***/ 1890:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TiltAnimation = void 0;

class TiltAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}

exports.TiltAnimation = TiltAnimation;

/***/ }),

/***/ 1117:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Twinkle = void 0;

const TwinkleValues_1 = __webpack_require__(7340);

class Twinkle {
  constructor() {
    this.lines = new TwinkleValues_1.TwinkleValues();
    this.particles = new TwinkleValues_1.TwinkleValues();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }

}

exports.Twinkle = Twinkle;

/***/ }),

/***/ 7340:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TwinkleValues = void 0;

const OptionsColor_1 = __webpack_require__(9239);

class TwinkleValues {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}

exports.TwinkleValues = TwinkleValues;

/***/ }),

/***/ 7464:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Wobble = void 0;

const Utils_1 = __webpack_require__(6617);

class Wobble {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = 50;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = (0, Utils_1.setRangeValue)(data.distance);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = (0, Utils_1.setRangeValue)(data.speed);
    }
  }

}

exports.Wobble = Wobble;

/***/ }),

/***/ 6097:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ZIndex = void 0;

const ValueWithRandom_1 = __webpack_require__(5572);

class ZIndex extends ValueWithRandom_1.ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    if (data.opacityRate !== undefined) {
      this.opacityRate = data.opacityRate;
    }

    if (data.sizeRate !== undefined) {
      this.sizeRate = data.sizeRate;
    }

    if (data.velocityRate !== undefined) {
      this.velocityRate = data.velocityRate;
    }
  }

}

exports.ZIndex = ZIndex;

/***/ }),

/***/ 8987:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Random = void 0;

class Random {
  constructor() {
    this.enable = false;
    this.minimumValue = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
  }

}

exports.Random = Random;

/***/ }),

/***/ 3673:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Responsive = void 0;

const Utils_1 = __webpack_require__(6617);

const Enums_1 = __webpack_require__(8678);

class Responsive {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = Enums_1.ResponsiveMode.canvas;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.maxWidth !== undefined) {
      this.maxWidth = data.maxWidth;
    }

    if (data.mode !== undefined) {
      if (data.mode === Enums_1.ResponsiveMode.screen) {
        this.mode = Enums_1.ResponsiveMode.screen;
      } else {
        this.mode = Enums_1.ResponsiveMode.canvas;
      }
    }

    if (data.options !== undefined) {
      this.options = (0, Utils_1.deepExtend)({}, data.options);
    }
  }

}

exports.Responsive = Responsive;

/***/ }),

/***/ 2951:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Theme = void 0;

const Utils_1 = __webpack_require__(6617);

const ThemeDefault_1 = __webpack_require__(8530);

class Theme {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault_1.ThemeDefault();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.name !== undefined) {
      this.name = data.name;
    }

    this.default.load(data.default);

    if (data.options !== undefined) {
      this.options = (0, Utils_1.deepExtend)({}, data.options);
    }
  }

}

exports.Theme = Theme;

/***/ }),

/***/ 8530:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ThemeDefault = void 0;

const Enums_1 = __webpack_require__(8678);

class ThemeDefault {
  constructor() {
    this.auto = false;
    this.mode = Enums_1.ThemeMode.any;
    this.value = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.auto !== undefined) {
      this.auto = data.auto;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}

exports.ThemeDefault = ThemeDefault;

/***/ }),

/***/ 5572:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ValueWithRandom = void 0;

const Random_1 = __webpack_require__(8987);

const Utils_1 = __webpack_require__(6617);

class ValueWithRandom {
  constructor() {
    this.random = new Random_1.Random();
    this.value = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (typeof data.random === "boolean") {
      this.random.enable = data.random;
    } else {
      this.random.load(data.random);
    }

    if (data.value !== undefined) {
      this.value = (0, Utils_1.setRangeValue)(data.value, this.random.enable ? this.random.minimumValue : undefined);
    }
  }

}

exports.ValueWithRandom = ValueWithRandom;

/***/ }),

/***/ 3105:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3741:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 427:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 7810:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 3292:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 750:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6538:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 1685:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 2954:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(3105), exports);

__exportStar(__webpack_require__(3741), exports);

__exportStar(__webpack_require__(7810), exports);

__exportStar(__webpack_require__(3292), exports);

__exportStar(__webpack_require__(750), exports);

__exportStar(__webpack_require__(6538), exports);

__exportStar(__webpack_require__(1685), exports);

__exportStar(__webpack_require__(427), exports);

/***/ }),

/***/ 5766:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.alterHsl = exports.drawEllipse = exports.drawParticlePlugin = exports.drawPlugin = exports.drawShapeAfterEffect = exports.drawShape = exports.drawParticle = exports.drawGrabLine = exports.gradient = exports.drawConnectLine = exports.clear = exports.paintBase = exports.drawTriangle = exports.drawLine = void 0;

const ColorUtils_1 = __webpack_require__(1642);

const Enums_1 = __webpack_require__(8678);

function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}

exports.drawLine = drawLine;

function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}

exports.drawTriangle = drawTriangle;

function paintBase(context, dimension, baseColor) {
  context.save();
  context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
  context.restore();
}

exports.paintBase = paintBase;

function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}

exports.clear = clear;

function drawConnectLine(context, width, lineStyle, begin, end) {
  context.save();
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
  context.restore();
}

exports.drawConnectLine = drawConnectLine;

function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
  const color1 = p1.getFillColor();
  const color2 = p2.getFillColor();

  if (!color1 || !color2) {
    return;
  }

  const sourcePos = p1.getPosition();
  const destPos = p2.getPosition();
  const midRgb = (0, ColorUtils_1.colorMix)(color1, color2, p1.getRadius(), p2.getRadius());
  const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, (0, ColorUtils_1.getStyleFromHsl)(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, (0, ColorUtils_1.getStyleFromRgb)(midRgb, opacity));
  grad.addColorStop(1, (0, ColorUtils_1.getStyleFromHsl)(color2, opacity));
  return grad;
}

exports.gradient = gradient;

function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  context.save();
  drawLine(context, begin, end);
  context.strokeStyle = (0, ColorUtils_1.getStyleFromRgb)(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
  context.restore();
}

exports.drawGrabLine = drawGrabLine;

function drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow, gradient) {
  var _a, _b, _c, _d, _e, _f;

  const pos = particle.getPosition();
  const tiltOptions = particle.options.tilt;
  const rollOptions = particle.options.roll;
  context.save();

  if (tiltOptions.enable || rollOptions.enable) {
    const roll = rollOptions.enable && particle.roll;
    const tilt = tiltOptions.enable && particle.tilt;
    const rollHorizontal = roll && (rollOptions.mode === Enums_1.RollMode.horizontal || rollOptions.mode === Enums_1.RollMode.both);
    const rollVertical = roll && (rollOptions.mode === Enums_1.RollMode.vertical || rollOptions.mode === Enums_1.RollMode.both);
    context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  context.beginPath();
  const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);

  if (angle !== 0) {
    context.rotate(angle);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  const shadowColor = particle.shadowColor;

  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = (0, ColorUtils_1.getStyleFromRgb)(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }

  if (gradient) {
    const gradientAngle = gradient.angle.value;
    const fillGradient = gradient.type === Enums_1.GradientType.radial ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);

    for (const color of gradient.colors) {
      fillGradient.addColorStop(color.stop, (0, ColorUtils_1.getStyleFromHsl)({
        h: color.value.h.value,
        s: color.value.s.value,
        l: color.value.l.value
      }, (_d = (_c = color.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : opacity));
    }

    context.fillStyle = fillGradient;
  } else {
    if (fillColorValue) {
      context.fillStyle = fillColorValue;
    }
  }

  const stroke = particle.stroke;
  context.lineWidth = (_e = particle.strokeWidth) !== null && _e !== void 0 ? _e : 0;

  if (strokeColorValue) {
    context.strokeStyle = strokeColorValue;
  }

  drawShape(container, context, particle, radius, opacity, delta);

  if (((_f = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _f !== void 0 ? _f : 0) > 0) {
    context.stroke();
  }

  if (particle.close) {
    context.closePath();
  }

  if (particle.fill) {
    context.fill();
  }

  context.restore();
  context.save();

  if (tiltOptions.enable && particle.tilt) {
    context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  if (angle !== 0) {
    context.rotate(angle);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.restore();
}

exports.drawParticle = drawParticle;

function drawShape(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }

  const drawer = container.drawers.get(particle.shape);

  if (!drawer) {
    return;
  }

  drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

exports.drawShape = drawShape;

function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }

  const drawer = container.drawers.get(particle.shape);

  if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
    return;
  }

  drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

exports.drawShapeAfterEffect = drawShapeAfterEffect;

function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }

  context.save();
  plugin.draw(context, delta);
  context.restore();
}

exports.drawPlugin = drawPlugin;

function drawParticlePlugin(context, plugin, particle, delta) {
  if (plugin.drawParticle !== undefined) {
    context.save();
    plugin.drawParticle(context, particle, delta);
    context.restore();
  }
}

exports.drawParticlePlugin = drawParticlePlugin;

function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
  const pos = particle.getPosition();

  if (fillColorValue) {
    context.strokeStyle = (0, ColorUtils_1.getStyleFromHsl)(fillColorValue, opacity);
  }

  if (width === 0) {
    return;
  }

  context.lineWidth = width;
  const rotationRadian = rotation * Math.PI / 180;
  context.beginPath();
  context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
  context.stroke();
}

exports.drawEllipse = drawEllipse;

function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === Enums_1.AlterType.darken ? -1 : 1) * value
  };
}

exports.alterHsl = alterHsl;

/***/ }),

/***/ 4410:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Circle = void 0;

const Range_1 = __webpack_require__(5607);

const NumberUtils_1 = __webpack_require__(5415);

class Circle extends Range_1.Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }

  contains(point) {
    return (0, NumberUtils_1.getDistance)(point, this.position) <= this.radius;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const pos1 = this.position;
    const pos2 = range.position;
    const xDist = Math.abs(pos2.x - pos1.x);
    const yDist = Math.abs(pos2.y - pos1.y);
    const r = this.radius;

    if (circle.radius !== undefined) {
      const rSum = r + circle.radius;
      const dist = Math.sqrt(xDist * xDist + yDist + yDist);
      return rSum > dist;
    } else if (rect.size !== undefined) {
      const w = rect.size.width;
      const h = rect.size.height;
      const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

      if (xDist > r + w || yDist > r + h) {
        return false;
      }

      if (xDist <= w || yDist <= h) {
        return true;
      }

      return edges <= r * r;
    }

    return false;
  }

}

exports.Circle = Circle;

/***/ }),

/***/ 4119:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CircleWarp = void 0;

const Rectangle_1 = __webpack_require__(5898);

const Circle_1 = __webpack_require__(4410);

class CircleWarp extends Circle_1.Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      height: canvasSize.height,
      width: canvasSize.width
    };
  }

  contains(point) {
    if (super.contains(point)) {
      return true;
    }

    const posNE = {
      x: point.x - this.canvasSize.width,
      y: point.y
    };

    if (super.contains(posNE)) {
      return true;
    }

    const posSE = {
      x: point.x - this.canvasSize.width,
      y: point.y - this.canvasSize.height
    };

    if (super.contains(posSE)) {
      return true;
    }

    const posSW = {
      x: point.x,
      y: point.y - this.canvasSize.height
    };
    return super.contains(posSW);
  }

  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }

    const rect = range;
    const circle = range;
    const newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };

    if (circle.radius !== undefined) {
      const biggerCircle = new Circle_1.Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== undefined) {
      const rectSW = new Rectangle_1.Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }

    return false;
  }

}

exports.CircleWarp = CircleWarp;

/***/ }),

/***/ 1642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getHslAnimationFromHsl = exports.getHslFromAnimation = exports.getLinkRandomColor = exports.getLinkColor = exports.colorMix = exports.getStyleFromHsv = exports.getStyleFromHsl = exports.getStyleFromRgb = exports.getRandomRgbColor = exports.rgbaToHsva = exports.rgbToHsv = exports.hsvaToRgba = exports.hsvToRgb = exports.hsvaToHsla = exports.hsvToHsl = exports.hslaToHsva = exports.hslToHsv = exports.hslaToRgba = exports.hslToRgb = exports.stringToRgb = exports.stringToAlpha = exports.rgbToHsl = exports.colorToHsl = exports.colorToRgb = void 0;

const Utils_1 = __webpack_require__(772);

const Constants_1 = __webpack_require__(9726);

const NumberUtils_1 = __webpack_require__(5415);

const Enums_1 = __webpack_require__(8678);

function hue2rgb(p, q, t) {
  let tCalc = t;

  if (tCalc < 0) {
    tCalc += 1;
  }

  if (tCalc > 1) {
    tCalc -= 1;
  }

  if (tCalc < 1 / 6) {
    return p + (q - p) * 6 * tCalc;
  }

  if (tCalc < 1 / 2) {
    return q;
  }

  if (tCalc < 2 / 3) {
    return p + (q - p) * (2 / 3 - tCalc) * 6;
  }

  return p;
}

function stringToRgba(input) {
  if (input.startsWith("rgb")) {
    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : undefined;
  } else if (input.startsWith("hsl")) {
    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : undefined;
  } else if (input.startsWith("hsv")) {
    const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hsvaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      s: parseInt(result[2], 10),
      v: parseInt(result[3], 10)
    }) : undefined;
  } else {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== undefined ? a + a : "");
    });
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const result = regex.exec(hexFixed);
    return result ? {
      a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
      b: parseInt(result[3], 16),
      g: parseInt(result[2], 16),
      r: parseInt(result[1], 16)
    } : undefined;
  }
}

function colorToRgb(input, index, useIndex = true) {
  var _a, _b, _c;

  if (input === undefined) {
    return;
  }

  const color = typeof input === "string" ? {
    value: input
  } : input;
  let res;

  if (typeof color.value === "string") {
    if (color.value === Constants_1.randomColorValue) {
      res = getRandomRgbColor();
    } else {
      res = stringToRgb(color.value);
    }
  } else {
    if (color.value instanceof Array) {
      const colorSelected = (0, Utils_1.itemFromArray)(color.value, index, useIndex);
      res = colorToRgb({
        value: colorSelected
      });
    } else {
      const colorValue = color.value;
      const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

      if (rgbColor.r !== undefined) {
        res = rgbColor;
      } else {
        const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;

        if (hslColor.h !== undefined && hslColor.l !== undefined) {
          res = hslToRgb(hslColor);
        } else {
          const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;

          if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
            res = hsvToRgb(hsvColor);
          }
        }
      }
    }
  }

  return res;
}

exports.colorToRgb = colorToRgb;

function colorToHsl(color, index, useIndex = true) {
  const rgb = colorToRgb(color, index, useIndex);
  return rgb !== undefined ? rgbToHsl(rgb) : undefined;
}

exports.colorToHsl = colorToHsl;

function rgbToHsl(color) {
  const r1 = color.r / 255;
  const g1 = color.g / 255;
  const b1 = color.b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const res = {
    h: 0,
    l: (max + min) / 2,
    s: 0
  };

  if (max != min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min);
  }

  res.l *= 100;
  res.s *= 100;
  res.h *= 60;

  if (res.h < 0) {
    res.h += 360;
  }

  return res;
}

exports.rgbToHsl = rgbToHsl;

function stringToAlpha(input) {
  var _a;

  return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}

exports.stringToAlpha = stringToAlpha;

function stringToRgb(input) {
  return stringToRgba(input);
}

exports.stringToRgb = stringToRgb;

function hslToRgb(hsl) {
  const result = {
    b: 0,
    g: 0,
    r: 0
  };
  const hslPercent = {
    h: hsl.h / 360,
    l: hsl.l / 100,
    s: hsl.s / 100
  };

  if (hslPercent.s === 0) {
    result.b = hslPercent.l;
    result.g = hslPercent.l;
    result.r = hslPercent.l;
  } else {
    const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
    const p = 2 * hslPercent.l - q;
    result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
    result.g = hue2rgb(p, q, hslPercent.h);
    result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
  }

  result.r = Math.floor(result.r * 255);
  result.g = Math.floor(result.g * 255);
  result.b = Math.floor(result.b * 255);
  return result;
}

exports.hslToRgb = hslToRgb;

function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}

exports.hslaToRgba = hslaToRgba;

function hslToHsv(hsl) {
  const l = hsl.l / 100,
        sl = hsl.s / 100;
  const v = l + sl * Math.min(l, 1 - l),
        sv = !v ? 0 : 2 * (1 - l / v);
  return {
    h: hsl.h,
    s: sv * 100,
    v: v * 100
  };
}

exports.hslToHsv = hslToHsv;

function hslaToHsva(hsla) {
  const hsvResult = hslToHsv(hsla);
  return {
    a: hsla.a,
    h: hsvResult.h,
    s: hsvResult.s,
    v: hsvResult.v
  };
}

exports.hslaToHsva = hslaToHsva;

function hsvToHsl(hsv) {
  const v = hsv.v / 100,
        sv = hsv.s / 100;
  const l = v * (1 - sv / 2),
        sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h: hsv.h,
    l: l * 100,
    s: sl * 100
  };
}

exports.hsvToHsl = hsvToHsl;

function hsvaToHsla(hsva) {
  const hslResult = hsvToHsl(hsva);
  return {
    a: hsva.a,
    h: hslResult.h,
    l: hslResult.l,
    s: hslResult.s
  };
}

exports.hsvaToHsla = hsvaToHsla;

function hsvToRgb(hsv) {
  const result = {
    b: 0,
    g: 0,
    r: 0
  };
  const hsvPercent = {
    h: hsv.h / 60,
    s: hsv.s / 100,
    v: hsv.v / 100
  };
  const c = hsvPercent.v * hsvPercent.s,
        x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
  let tempRgb;

  if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
    tempRgb = {
      r: c,
      g: x,
      b: 0
    };
  } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
    tempRgb = {
      r: x,
      g: c,
      b: 0
    };
  } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
    tempRgb = {
      r: 0,
      g: c,
      b: x
    };
  } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
    tempRgb = {
      r: 0,
      g: x,
      b: c
    };
  } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
    tempRgb = {
      r: x,
      g: 0,
      b: c
    };
  } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
    tempRgb = {
      r: c,
      g: 0,
      b: x
    };
  }

  if (tempRgb) {
    const m = hsvPercent.v - c;
    result.r = Math.floor((tempRgb.r + m) * 255);
    result.g = Math.floor((tempRgb.g + m) * 255);
    result.b = Math.floor((tempRgb.b + m) * 255);
  }

  return result;
}

exports.hsvToRgb = hsvToRgb;

function hsvaToRgba(hsva) {
  const rgbResult = hsvToRgb(hsva);
  return {
    a: hsva.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}

exports.hsvaToRgba = hsvaToRgba;

function rgbToHsv(rgb) {
  const rgbPercent = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  },
        xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        v = xMax,
        c = xMax - xMin;
  let h = 0;

  if (v === rgbPercent.r) {
    h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
  } else if (v === rgbPercent.g) {
    h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
  } else if (v === rgbPercent.b) {
    h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
  }

  const s = !v ? 0 : c / v;
  return {
    h,
    s: s * 100,
    v: v * 100
  };
}

exports.rgbToHsv = rgbToHsv;

function rgbaToHsva(rgba) {
  const hsvResult = rgbToHsv(rgba);
  return {
    a: rgba.a,
    h: hsvResult.h,
    s: hsvResult.s,
    v: hsvResult.v
  };
}

exports.rgbaToHsva = rgbaToHsva;

function getRandomRgbColor(min) {
  const fixedMin = min !== null && min !== void 0 ? min : 0;
  return {
    b: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
    g: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
    r: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256)))
  };
}

exports.getRandomRgbColor = getRandomRgbColor;

function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}

exports.getStyleFromRgb = getStyleFromRgb;

function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}

exports.getStyleFromHsl = getStyleFromHsl;

function getStyleFromHsv(color, opacity) {
  return getStyleFromHsl(hsvToHsl(color), opacity);
}

exports.getStyleFromHsv = getStyleFromHsv;

function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1;
  let rgb2 = color2;

  if (rgb1.r === undefined) {
    rgb1 = hslToRgb(color1);
  }

  if (rgb2.r === undefined) {
    rgb2 = hslToRgb(color2);
  }

  return {
    b: (0, NumberUtils_1.mix)(rgb1.b, rgb2.b, size1, size2),
    g: (0, NumberUtils_1.mix)(rgb1.g, rgb2.g, size1, size2),
    r: (0, NumberUtils_1.mix)(rgb1.r, rgb2.r, size1, size2)
  };
}

exports.colorMix = colorMix;

function getLinkColor(p1, p2, linkColor) {
  var _a, _b;

  if (linkColor === Constants_1.randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === "mid") {
    const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor();
    const destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();

    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;

      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}

exports.getLinkColor = getLinkColor;

function getLinkRandomColor(optColor, blink, consent) {
  const color = typeof optColor === "string" ? optColor : optColor.value;

  if (color === Constants_1.randomColorValue) {
    if (consent) {
      return colorToRgb({
        value: color
      });
    } else if (blink) {
      return Constants_1.randomColorValue;
    } else {
      return Constants_1.midColorValue;
    }
  } else {
    return colorToRgb({
      value: color
    });
  }
}

exports.getLinkRandomColor = getLinkRandomColor;

function getHslFromAnimation(animation) {
  return animation !== undefined ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : undefined;
}

exports.getHslFromAnimation = getHslFromAnimation;

function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };

  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }

  return resColor;
}

exports.getHslAnimationFromHsl = getHslAnimationFromHsl;

function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;

  if (colorValue.enable) {
    colorValue.velocity = colorAnimation.speed / 100 * reduceFactor;

    if (colorAnimation.sync) {
      return;
    }

    colorValue.status = Enums_1.AnimationStatus.increasing;
    colorValue.velocity *= Math.random();

    if (colorValue.value) {
      colorValue.value *= Math.random();
    }
  } else {
    colorValue.velocity = 0;
  }
}

/***/ }),

/***/ 9726:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.noPolygonFound = exports.noPolygonDataLoaded = exports.visibilityChangeEvent = exports.resizeEvent = exports.touchCancelEvent = exports.mouseOutEvent = exports.mouseLeaveEvent = exports.touchMoveEvent = exports.touchStartEvent = exports.mouseMoveEvent = exports.mouseUpEvent = exports.mouseDownEvent = exports.touchEndEvent = exports.midColorValue = exports.randomColorValue = exports.canvasClass = void 0;
exports.canvasClass = "tsparticles-canvas-el";
exports.randomColorValue = "random";
exports.midColorValue = "mid";
exports.touchEndEvent = "touchend";
exports.mouseDownEvent = "mousedown";
exports.mouseUpEvent = "mouseup";
exports.mouseMoveEvent = "mousemove";
exports.touchStartEvent = "touchstart";
exports.touchMoveEvent = "touchmove";
exports.mouseLeaveEvent = "mouseleave";
exports.mouseOutEvent = "mouseout";
exports.touchCancelEvent = "touchcancel";
exports.resizeEvent = "resize";
exports.visibilityChangeEvent = "visibilitychange";
exports.noPolygonDataLoaded = "No polygon data loaded.";
exports.noPolygonFound = "No polygon found, you need to specify SVG url in config.";

/***/ }),

/***/ 7917:
/***/ (function(__unused_webpack_module, exports) {



var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _EventDispatcher_listeners;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventDispatcher = void 0;

class EventDispatcher {
  constructor() {
    _EventDispatcher_listeners.set(this, void 0);

    __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
  }

  addEventListener(type, listener) {
    var _a;

    this.removeEventListener(type, listener);

    if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").set(type, []);
    }

    (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
  }

  removeEventListener(type, listener) {
    const arr = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);

    if (!arr) {
      return;
    }

    const length = arr.length,
          idx = arr.indexOf(listener);

    if (idx < 0) {
      return;
    }

    if (length === 1) {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
    } else {
      arr.splice(idx, 1);
    }
  }

  removeAllEventListeners(type) {
    if (!type) {
      __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
    } else {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
    }
  }

  dispatchEvent(type, args) {
    var _a;

    (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.forEach(handler => handler(args));
  }

  hasEventListener(type) {
    return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
  }

}

exports.EventDispatcher = EventDispatcher;
_EventDispatcher_listeners = new WeakMap();

/***/ }),

/***/ 7515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventListeners = void 0;

const Enums_1 = __webpack_require__(8678);

const Constants_1 = __webpack_require__(9726);

const Utils_1 = __webpack_require__(772);

function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = {
      passive: true
    };

    if (typeof options === "boolean") {
      addOptions.capture = options;
    } else if (options !== undefined) {
      addOptions = options;
    }

    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}

class EventListeners {
  constructor(container) {
    this.container = container;
    this.canPush = true;

    this.mouseMoveHandler = e => this.mouseTouchMove(e);

    this.touchStartHandler = e => this.mouseTouchMove(e);

    this.touchMoveHandler = e => this.mouseTouchMove(e);

    this.touchEndHandler = () => this.mouseTouchFinish();

    this.mouseLeaveHandler = () => this.mouseTouchFinish();

    this.touchCancelHandler = () => this.mouseTouchFinish();

    this.touchEndClickHandler = e => this.mouseTouchClick(e);

    this.mouseUpHandler = e => this.mouseTouchClick(e);

    this.mouseDownHandler = () => this.mouseDown();

    this.visibilityChangeHandler = () => this.handleVisibilityChange();

    this.themeChangeHandler = e => this.handleThemeChange(e);

    this.oldThemeChangeHandler = e => this.handleThemeChange(e);

    this.resizeHandler = () => this.handleWindowResize();
  }

  addListeners() {
    this.manageListeners(true);
  }

  removeListeners() {
    this.manageListeners(false);
  }

  manageListeners(add) {
    var _a;

    const container = this.container;
    const options = container.actualOptions;
    const detectType = options.interactivity.detectsOn;
    let mouseLeaveTmpEvent = Constants_1.mouseLeaveEvent;

    if (detectType === Enums_1.InteractivityDetect.window) {
      container.interactivity.element = window;
      mouseLeaveTmpEvent = Constants_1.mouseOutEvent;
    } else if (detectType === Enums_1.InteractivityDetect.parent && container.canvas.element) {
      const canvasEl = container.canvas.element;
      container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
    } else {
      container.interactivity.element = container.canvas.element;
    }

    const mediaMatch = !(0, Utils_1.isSsr)() && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");

    if (mediaMatch) {
      if (mediaMatch.addEventListener !== undefined) {
        manageListener(mediaMatch, "change", this.themeChangeHandler, add);
      } else if (mediaMatch.addListener !== undefined) {
        if (add) {
          mediaMatch.addListener(this.oldThemeChangeHandler);
        } else {
          mediaMatch.removeListener(this.oldThemeChangeHandler);
        }
      }
    }

    const interactivityEl = container.interactivity.element;

    if (!interactivityEl) {
      return;
    }

    const html = interactivityEl;

    if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
      manageListener(interactivityEl, Constants_1.mouseMoveEvent, this.mouseMoveHandler, add);
      manageListener(interactivityEl, Constants_1.touchStartEvent, this.touchStartHandler, add);
      manageListener(interactivityEl, Constants_1.touchMoveEvent, this.touchMoveHandler, add);

      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, Constants_1.touchEndEvent, this.touchEndHandler, add);
      } else {
        manageListener(interactivityEl, Constants_1.touchEndEvent, this.touchEndClickHandler, add);
        manageListener(interactivityEl, Constants_1.mouseUpEvent, this.mouseUpHandler, add);
        manageListener(interactivityEl, Constants_1.mouseDownEvent, this.mouseDownHandler, add);
      }

      manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);
      manageListener(interactivityEl, Constants_1.touchCancelEvent, this.touchCancelHandler, add);
    }

    if (container.canvas.element) {
      container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
    }

    if (options.interactivity.events.resize) {
      if (typeof ResizeObserver !== "undefined") {
        if (this.resizeObserver && !add) {
          if (container.canvas.element) {
            this.resizeObserver.unobserve(container.canvas.element);
          }

          this.resizeObserver.disconnect();
          delete this.resizeObserver;
        } else if (!this.resizeObserver && add && container.canvas.element) {
          this.resizeObserver = new ResizeObserver(entries => {
            const entry = entries.find(e => e.target === container.canvas.element);

            if (!entry) {
              return;
            }

            this.handleWindowResize();
          });
          this.resizeObserver.observe(container.canvas.element);
        }
      } else {
        manageListener(window, Constants_1.resizeEvent, this.resizeHandler, add);
      }
    }

    if (document) {
      manageListener(document, Constants_1.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
    }
  }

  handleWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      delete this.resizeTimeout;
    }

    this.resizeTimeout = setTimeout(() => {
      var _a;

      return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }, 500);
  }

  handleVisibilityChange() {
    const container = this.container;
    const options = container.actualOptions;
    this.mouseTouchFinish();

    if (!options.pauseOnBlur) {
      return;
    }

    if (document === null || document === void 0 ? void 0 : document.hidden) {
      container.pageHidden = true;
      container.pause();
    } else {
      container.pageHidden = false;

      if (container.getAnimationStatus()) {
        container.play(true);
      } else {
        container.draw(true);
      }
    }
  }

  mouseDown() {
    const interactivity = this.container.interactivity;

    if (interactivity) {
      const mouse = interactivity.mouse;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    }
  }

  mouseTouchMove(e) {
    var _a, _b, _c, _d, _e, _f, _g;

    const container = this.container;
    const options = container.actualOptions;

    if (((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element) === undefined) {
      return;
    }

    container.interactivity.mouse.inside = true;
    let pos;
    const canvas = container.canvas.element;

    if (e.type.startsWith("mouse")) {
      this.canPush = true;
      const mouseEvent = e;

      if (container.interactivity.element === window) {
        if (canvas) {
          const clientRect = canvas.getBoundingClientRect();
          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top
          };
        }
      } else if (options.interactivity.detectsOn === Enums_1.InteractivityDetect.parent) {
        const source = mouseEvent.target;
        const target = mouseEvent.currentTarget;
        const canvasEl = container.canvas.element;

        if (source && target && canvasEl) {
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
            y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
          };
        } else {
          pos = {
            x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
            y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY
          };
        }
      } else {
        if (mouseEvent.target === container.canvas.element) {
          pos = {
            x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
            y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY
          };
        }
      }
    } else {
      this.canPush = e.type !== "touchmove";
      const touchEvent = e;
      const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
      const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
      pos = {
        x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
        y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0)
      };
    }

    const pxRatio = container.retina.pixelRatio;

    if (pos) {
      pos.x *= pxRatio;
      pos.y *= pxRatio;
    }

    container.interactivity.mouse.position = pos;
    container.interactivity.status = Constants_1.mouseMoveEvent;
  }

  mouseTouchFinish() {
    const interactivity = this.container.interactivity;

    if (interactivity === undefined) {
      return;
    }

    const mouse = interactivity.mouse;
    delete mouse.position;
    delete mouse.clickPosition;
    delete mouse.downPosition;
    interactivity.status = Constants_1.mouseLeaveEvent;
    mouse.inside = false;
    mouse.clicking = false;
  }

  mouseTouchClick(e) {
    const container = this.container;
    const options = container.actualOptions;
    const mouse = container.interactivity.mouse;
    mouse.inside = true;
    let handled = false;
    const mousePosition = mouse.position;

    if (mousePosition === undefined || !options.interactivity.events.onClick.enable) {
      return;
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.clickPositionValid !== undefined) {
        handled = plugin.clickPositionValid(mousePosition);

        if (handled) {
          break;
        }
      }
    }

    if (!handled) {
      this.doMouseTouchClick(e);
    }

    mouse.clicking = false;
  }

  doMouseTouchClick(e) {
    const container = this.container;
    const options = container.actualOptions;

    if (this.canPush) {
      const mousePos = container.interactivity.mouse.position;

      if (mousePos) {
        container.interactivity.mouse.clickPosition = {
          x: mousePos.x,
          y: mousePos.y
        };
      } else {
        return;
      }

      container.interactivity.mouse.clickTime = new Date().getTime();
      const onClick = options.interactivity.events.onClick;

      if (onClick.mode instanceof Array) {
        for (const mode of onClick.mode) {
          this.handleClickMode(mode);
        }
      } else {
        this.handleClickMode(onClick.mode);
      }
    }

    if (e.type === "touchend") {
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }

  handleThemeChange(e) {
    const mediaEvent = e;
    const themeName = mediaEvent.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme;
    const theme = this.container.options.themes.find(theme => theme.name === themeName);

    if (theme && theme.default.auto) {
      this.container.loadTheme(themeName);
    }
  }

  handleClickMode(mode) {
    this.container.handleClickMode(mode);
  }

}

exports.EventListeners = EventListeners;

/***/ }),

/***/ 5415:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.calcEasing = exports.collisionVelocity = exports.getParticleBaseVelocity = exports.getParticleDirectionAngle = exports.getDistance = exports.getDistances = exports.getValue = exports.setRangeValue = exports.getRangeMax = exports.getRangeMin = exports.getRangeValue = exports.randomInRange = exports.mix = exports.clamp = void 0;

const Enums_1 = __webpack_require__(8678);

const Vector_1 = __webpack_require__(4068);

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

exports.clamp = clamp;

function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}

exports.mix = mix;

function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);

  if (max === min) {
    min = 0;
  }

  return Math.random() * (max - min) + min;
}

exports.randomInRange = randomInRange;

function getRangeValue(value) {
  return typeof value === "number" ? value : randomInRange(value);
}

exports.getRangeValue = getRangeValue;

function getRangeMin(value) {
  return typeof value === "number" ? value : value.min;
}

exports.getRangeMin = getRangeMin;

function getRangeMax(value) {
  return typeof value === "number" ? value : value.max;
}

exports.getRangeMax = getRangeMax;

function setRangeValue(source, value) {
  if (source === value || value === undefined && typeof source === "number") {
    return source;
  }

  const min = getRangeMin(source),
        max = getRangeMax(source);
  return value !== undefined ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}

exports.setRangeValue = setRangeValue;

function getValue(options) {
  const random = options.random;
  const {
    enable,
    minimumValue
  } = typeof random === "boolean" ? {
    enable: random,
    minimumValue: 0
  } : random;
  return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}

exports.getValue = getValue;

function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx * dx + dy * dy)
  };
}

exports.getDistances = getDistances;

function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}

exports.getDistance = getDistance;

function getParticleDirectionAngle(direction, position, center) {
  if (typeof direction === "number") {
    return direction * Math.PI / 180;
  } else {
    switch (direction) {
      case Enums_1.MoveDirection.top:
        return -Math.PI / 2;

      case Enums_1.MoveDirection.topRight:
        return -Math.PI / 4;

      case Enums_1.MoveDirection.right:
        return 0;

      case Enums_1.MoveDirection.bottomRight:
        return Math.PI / 4;

      case Enums_1.MoveDirection.bottom:
        return Math.PI / 2;

      case Enums_1.MoveDirection.bottomLeft:
        return 3 * Math.PI / 4;

      case Enums_1.MoveDirection.left:
        return Math.PI;

      case Enums_1.MoveDirection.topLeft:
        return -3 * Math.PI / 4;

      case Enums_1.MoveDirection.inside:
        return Math.atan2(center.y - position.y, center.x - position.x);

      case Enums_1.MoveDirection.outside:
        return Math.atan2(position.y - center.y, position.x - center.x);

      case Enums_1.MoveDirection.none:
      default:
        return Math.random() * Math.PI * 2;
    }
  }
}

exports.getParticleDirectionAngle = getParticleDirectionAngle;

function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector_1.Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}

exports.getParticleBaseVelocity = getParticleBaseVelocity;

function collisionVelocity(v1, v2, m1, m2) {
  return Vector_1.Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}

exports.collisionVelocity = collisionVelocity;

function calcEasing(value, type) {
  switch (type) {
    case Enums_1.EasingType.easeOutQuad:
      return 1 - (1 - value) ** 2;

    case Enums_1.EasingType.easeOutCubic:
      return 1 - (1 - value) ** 3;

    case Enums_1.EasingType.easeOutQuart:
      return 1 - (1 - value) ** 4;

    case Enums_1.EasingType.easeOutQuint:
      return 1 - (1 - value) ** 5;

    case Enums_1.EasingType.easeOutExpo:
      return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);

    case Enums_1.EasingType.easeOutSine:
      return Math.sin(value * Math.PI / 2);

    case Enums_1.EasingType.easeOutBack:
      {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
      }

    case Enums_1.EasingType.easeOutCirc:
      return Math.sqrt(1 - Math.pow(value - 1, 2));

    default:
      return value;
  }
}

exports.calcEasing = calcEasing;

/***/ }),

/***/ 1791:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Plugins = void 0;
const plugins = [];
const interactorsInitializers = new Map();
const updatersInitializers = new Map();
const interactors = new Map();
const updaters = new Map();
const presets = new Map();
const drawers = new Map();
const pathGenerators = new Map();

class Plugins {
  static getPlugin(plugin) {
    return plugins.find(t => t.id === plugin);
  }

  static addPlugin(plugin) {
    if (!Plugins.getPlugin(plugin.id)) {
      plugins.push(plugin);
    }
  }

  static getAvailablePlugins(container) {
    const res = new Map();

    for (const plugin of plugins) {
      if (!plugin.needsPlugin(container.actualOptions)) {
        continue;
      }

      res.set(plugin.id, plugin.getPlugin(container));
    }

    return res;
  }

  static loadOptions(options, sourceOptions) {
    for (const plugin of plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }

  static getPreset(preset) {
    return presets.get(preset);
  }

  static addPreset(presetKey, options, override = false) {
    if (override || !Plugins.getPreset(presetKey)) {
      presets.set(presetKey, options);
    }
  }

  static addShapeDrawer(type, drawer) {
    if (!Plugins.getShapeDrawer(type)) {
      drawers.set(type, drawer);
    }
  }

  static getShapeDrawer(type) {
    return drawers.get(type);
  }

  static getSupportedShapes() {
    return drawers.keys();
  }

  static getPathGenerator(type) {
    return pathGenerators.get(type);
  }

  static addPathGenerator(type, pathGenerator) {
    if (!Plugins.getPathGenerator(type)) {
      pathGenerators.set(type, pathGenerator);
    }
  }

  static getInteractors(container, force = false) {
    let res = interactors.get(container);

    if (!res || force) {
      res = [...interactorsInitializers.values()].map(t => t(container));
      interactors.set(container, res);
    }

    return res;
  }

  static addInteractor(name, initInteractor) {
    interactorsInitializers.set(name, initInteractor);
  }

  static getUpdaters(container, force = false) {
    let res = updaters.get(container);

    if (!res || force) {
      res = [...updatersInitializers.values()].map(t => t(container));
      updaters.set(container, res);
    }

    return res;
  }

  static addParticleUpdater(name, initUpdater) {
    updatersInitializers.set(name, initUpdater);
  }

}

exports.Plugins = Plugins;

/***/ }),

/***/ 974:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Point = void 0;

class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }

}

exports.Point = Point;

/***/ }),

/***/ 1593:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.QuadTree = void 0;

const Rectangle_1 = __webpack_require__(5898);

const Circle_1 = __webpack_require__(4410);

const CircleWarp_1 = __webpack_require__(4119);

const NumberUtils_1 = __webpack_require__(5415);

class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const x = this.rectangle.position.x;
    const y = this.rectangle.position.y;
    const w = this.rectangle.size.width;
    const h = this.rectangle.size.height;
    const capacity = this.capacity;
    this.northEast = new QuadTree(new Rectangle_1.Rectangle(x, y, w / 2, h / 2), capacity);
    this.northWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this.southEast = new QuadTree(new Rectangle_1.Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this.southWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this.divided = true;
  }

  insert(point) {
    var _a, _b, _c, _d, _e;

    if (!this.rectangle.contains(point.position)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (_e = ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
  }

  queryCircle(position, radius) {
    return this.query(new Circle_1.Circle(position.x, position.y, radius));
  }

  queryCircleWarp(position, radius, containerOrSize) {
    const container = containerOrSize;
    const size = containerOrSize;
    return this.query(new CircleWarp_1.CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
  }

  queryRectangle(position, size) {
    return this.query(new Rectangle_1.Rectangle(position.x, position.y, size.width, size.height));
  }

  query(range, found) {
    var _a, _b, _c, _d;

    const res = found !== null && found !== void 0 ? found : [];

    if (!range.intersects(this.rectangle)) {
      return [];
    } else {
      for (const p of this.points) {
        if (!range.contains(p.position) && (0, NumberUtils_1.getDistance)(range.position, p.position) > p.particle.getRadius()) {
          continue;
        }

        res.push(p.particle);
      }

      if (this.divided) {
        (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
        (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
        (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
        (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
      }
    }

    return res;
  }

}

exports.QuadTree = QuadTree;

/***/ }),

/***/ 5607:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Range = void 0;

class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }

}

exports.Range = Range;

/***/ }),

/***/ 5898:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Rectangle = void 0;

const Range_1 = __webpack_require__(5607);

class Rectangle extends Range_1.Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }

  contains(point) {
    const w = this.size.width;
    const h = this.size.height;
    const pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const w = this.size.width;
    const h = this.size.height;
    const pos1 = this.position;
    const pos2 = range.position;

    if (circle.radius !== undefined) {
      return circle.intersects(this);
    } else if (rect.size !== undefined) {
      const size2 = rect.size;
      const w2 = size2.width;
      const h2 = size2.height;
      return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }

    return false;
  }

}

exports.Rectangle = Rectangle;

/***/ }),

/***/ 772:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.rectBounce = exports.circleBounce = exports.circleBounceDataFromParticle = exports.divMode = exports.singleDivModeExecute = exports.divModeExecute = exports.isDivModeEnabled = exports.deepExtend = exports.calculateBounds = exports.areBoundsInside = exports.isPointInside = exports.itemFromArray = exports.arrayRandomIndex = exports.loadFont = exports.isInArray = exports.cancelAnimation = exports.animate = exports.isSsr = void 0;

const Enums_1 = __webpack_require__(8678);

const NumberUtils_1 = __webpack_require__(5415);

const Vector_1 = __webpack_require__(4068);

function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
  const res = {
    bounced: false
  };

  if (pOtherSide.min >= rectOtherSide.min && pOtherSide.min <= rectOtherSide.max && pOtherSide.max >= rectOtherSide.min && pOtherSide.max <= rectOtherSide.max) {
    if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
      res.velocity = velocity * -factor;
      res.bounced = true;
    }
  }

  return res;
}

function checkSelector(element, selectors) {
  if (selectors instanceof Array) {
    for (const selector of selectors) {
      if (element.matches(selector)) {
        return true;
      }
    }

    return false;
  } else {
    return element.matches(selectors);
  }
}

function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}

exports.isSsr = isSsr;

function animate() {
  return isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
}

exports.animate = animate;

function cancelAnimation() {
  return isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
}

exports.cancelAnimation = cancelAnimation;

function isInArray(value, array) {
  return value === array || array instanceof Array && array.indexOf(value) > -1;
}

exports.isInArray = isInArray;

async function loadFont(character) {
  var _a, _b;

  try {
    await document.fonts.load(`${(_a = character.weight) !== null && _a !== void 0 ? _a : "400"} 36px '${(_b = character.font) !== null && _b !== void 0 ? _b : "Verdana"}'`);
  } catch (_c) {}
}

exports.loadFont = loadFont;

function arrayRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

exports.arrayRandomIndex = arrayRandomIndex;

function itemFromArray(array, index, useIndex = true) {
  const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
  return array[fixedIndex];
}

exports.itemFromArray = itemFromArray;

function isPointInside(point, size, offset, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
}

exports.isPointInside = isPointInside;

function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;

  if (!direction || direction === Enums_1.OutModeDirection.bottom) {
    inside = bounds.top < size.height + offset.x;
  }

  if (inside && (!direction || direction === Enums_1.OutModeDirection.left)) {
    inside = bounds.right > offset.x;
  }

  if (inside && (!direction || direction === Enums_1.OutModeDirection.right)) {
    inside = bounds.left < size.width + offset.y;
  }

  if (inside && (!direction || direction === Enums_1.OutModeDirection.top)) {
    inside = bounds.bottom > offset.y;
  }

  return inside;
}

exports.areBoundsInside = areBoundsInside;

function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}

exports.calculateBounds = calculateBounds;

function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === undefined || source === null) {
      continue;
    }

    if (typeof source !== "object") {
      destination = source;
      continue;
    }

    const sourceIsArray = Array.isArray(source);

    if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
      destination = {};
    }

    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }

      const sourceDict = source;
      const value = sourceDict[key];
      const isObject = typeof value === "object";
      const destDict = destination;
      destDict[key] = isObject && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }

  return destination;
}

exports.deepExtend = deepExtend;

function isDivModeEnabled(mode, divs) {
  return divs instanceof Array ? !!divs.find(t => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}

exports.isDivModeEnabled = isDivModeEnabled;

function divModeExecute(mode, divs, callback) {
  if (divs instanceof Array) {
    for (const div of divs) {
      const divMode = div.mode;
      const divEnabled = div.enable;

      if (divEnabled && isInArray(mode, divMode)) {
        singleDivModeExecute(div, callback);
      }
    }
  } else {
    const divMode = divs.mode;
    const divEnabled = divs.enable;

    if (divEnabled && isInArray(mode, divMode)) {
      singleDivModeExecute(divs, callback);
    }
  }
}

exports.divModeExecute = divModeExecute;

function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;

  if (selectors instanceof Array) {
    for (const selector of selectors) {
      callback(selector, div);
    }
  } else {
    callback(selectors, div);
  }
}

exports.singleDivModeExecute = singleDivModeExecute;

function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }

  if (divs instanceof Array) {
    return divs.find(d => checkSelector(element, d.selectors));
  } else if (checkSelector(element, divs.selectors)) {
    return divs;
  }
}

exports.divMode = divMode;

function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector_1.Vector.create((0, NumberUtils_1.getValue)(p.options.bounce.horizontal), (0, NumberUtils_1.getValue)(p.options.bounce.vertical))
  };
}

exports.circleBounceDataFromParticle = circleBounceDataFromParticle;

function circleBounce(p1, p2) {
  const {
    x: xVelocityDiff,
    y: yVelocityDiff
  } = p1.velocity.sub(p2.velocity);
  const [pos1, pos2] = [p1.position, p2.position];
  const {
    dx: xDist,
    dy: yDist
  } = (0, NumberUtils_1.getDistances)(pos2, pos1);

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(yDist, xDist);
    const m1 = p1.mass;
    const m2 = p2.mass;
    const u1 = p1.velocity.rotate(angle);
    const u2 = p2.velocity.rotate(angle);
    const v1 = (0, NumberUtils_1.collisionVelocity)(u1, u2, m1, m2);
    const v2 = (0, NumberUtils_1.collisionVelocity)(u2, u1, m1, m2);
    const vFinal1 = v1.rotate(-angle);
    const vFinal2 = v2.rotate(-angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
  }
}

exports.circleBounce = circleBounce;

function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition();
  const size = particle.getRadius();
  const bounds = calculateBounds(pPos, size);
  const resH = rectSideBounce({
    min: bounds.left,
    max: bounds.right
  }, {
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, particle.velocity.x, (0, NumberUtils_1.getValue)(particle.options.bounce.horizontal));

  if (resH.bounced) {
    if (resH.velocity !== undefined) {
      particle.velocity.x = resH.velocity;
    }

    if (resH.position !== undefined) {
      particle.position.x = resH.position;
    }
  }

  const resV = rectSideBounce({
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: bounds.left,
    max: bounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, particle.velocity.y, (0, NumberUtils_1.getValue)(particle.options.bounce.vertical));

  if (resV.bounced) {
    if (resV.velocity !== undefined) {
      particle.velocity.y = resV.velocity;
    }

    if (resV.position !== undefined) {
      particle.position.y = resV.position;
    }
  }
}

exports.rectBounce = rectBounce;

/***/ }),

/***/ 6617:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(5766), exports);

__exportStar(__webpack_require__(4410), exports);

__exportStar(__webpack_require__(4119), exports);

__exportStar(__webpack_require__(1642), exports);

__exportStar(__webpack_require__(9726), exports);

__exportStar(__webpack_require__(7515), exports);

__exportStar(__webpack_require__(5415), exports);

__exportStar(__webpack_require__(1791), exports);

__exportStar(__webpack_require__(974), exports);

__exportStar(__webpack_require__(1593), exports);

__exportStar(__webpack_require__(5607), exports);

__exportStar(__webpack_require__(5898), exports);

__exportStar(__webpack_require__(772), exports);

/***/ }),

/***/ 9685:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.tsParticles = void 0;

const main_1 = __webpack_require__(1036);

const tsParticles = new main_1.Main();
exports.tsParticles = tsParticles;
tsParticles.init();

__exportStar(__webpack_require__(4068), exports);

__exportStar(__webpack_require__(8678), exports);

__exportStar(__webpack_require__(6617), exports);

__exportStar(__webpack_require__(2954), exports);

__exportStar(__webpack_require__(9238), exports);

__exportStar(__webpack_require__(7981), exports);

__exportStar(__webpack_require__(660), exports);

/***/ }),

/***/ 1036:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Main_initialized;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Main = void 0;

const Utils_1 = __webpack_require__(6617);

const Loader_1 = __webpack_require__(9662);

class Main {
  constructor() {
    _Main_initialized.set(this, void 0);

    __classPrivateFieldSet(this, _Main_initialized, false, "f");
  }

  init() {
    if (!__classPrivateFieldGet(this, _Main_initialized, "f")) {
      __classPrivateFieldSet(this, _Main_initialized, true, "f");
    }
  }

  async loadFromArray(tagId, options, index) {
    return Loader_1.Loader.load(tagId, options, index);
  }

  async load(tagId, options) {
    return Loader_1.Loader.load(tagId, options);
  }

  async set(id, element, options) {
    return Loader_1.Loader.set(id, element, options);
  }

  async loadJSON(tagId, pathConfigJson, index) {
    return Loader_1.Loader.loadJSON(tagId, pathConfigJson, index);
  }

  async setJSON(id, element, pathConfigJson, index) {
    return Loader_1.Loader.setJSON(id, element, pathConfigJson, index);
  }

  setOnClickHandler(callback) {
    Loader_1.Loader.setOnClickHandler(callback);
  }

  dom() {
    return Loader_1.Loader.dom();
  }

  domItem(index) {
    return Loader_1.Loader.domItem(index);
  }

  async refresh() {
    for (const instance of this.dom()) {
      await instance.refresh();
    }
  }

  async addShape(shape, drawer, init, afterEffect, destroy) {
    let customDrawer;

    if (typeof drawer === "function") {
      customDrawer = {
        afterEffect: afterEffect,
        destroy: destroy,
        draw: drawer,
        init: init
      };
    } else {
      customDrawer = drawer;
    }

    Utils_1.Plugins.addShapeDrawer(shape, customDrawer);
    await this.refresh();
  }

  async addPreset(preset, options, override = false) {
    Utils_1.Plugins.addPreset(preset, options, override);
    await this.refresh();
  }

  async addPlugin(plugin) {
    Utils_1.Plugins.addPlugin(plugin);
    await this.refresh();
  }

  async addPathGenerator(name, generator) {
    Utils_1.Plugins.addPathGenerator(name, generator);
    await this.refresh();
  }

  async addInteractor(name, interactorInitializer) {
    Utils_1.Plugins.addInteractor(name, interactorInitializer);
    await this.refresh();
  }

  async addParticleUpdater(name, updaterInitializer) {
    Utils_1.Plugins.addParticleUpdater(name, updaterInitializer);
    await this.refresh();
  }

  addEventListener(type, listener) {
    Loader_1.Loader.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    Loader_1.Loader.removeEventListener(type, listener);
  }

  dispatchEvent(type, args) {
    Loader_1.Loader.dispatchEvent(type, args);
  }

}

exports.Main = Main;
_Main_initialized = new WeakMap();

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "particlesJS": () => (/* binding */ particlesJS),
/* harmony export */   "pJSDom": () => (/* binding */ pJSDom)
/* harmony export */ });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9685);
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4153);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__) if(["default","particlesJS","pJSDom"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


const {
  particlesJS,
  pJSDom
} = (0,___WEBPACK_IMPORTED_MODULE_1__/* .initPjs */ .g)(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.tsParticles);


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});