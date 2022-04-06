(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else {
    var a = factory();
    for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
  }
})(window, (function() {
  return function() {
    "use strict";
    var __webpack_modules__ = {};
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = __webpack_module_cache__[moduleId] = {
        exports: {}
      };
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    __webpack_require__.m = __webpack_modules__;
    !function() {
      var deferred = [];
      __webpack_require__.O = function(result, chunkIds, fn, priority) {
        if (chunkIds) {
          priority = priority || 0;
          for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
          deferred[i] = [ chunkIds, fn, priority ];
          return;
        }
        var notFulfilled = Infinity;
        for (var i = 0; i < deferred.length; i++) {
          var chunkIds = deferred[i][0];
          var fn = deferred[i][1];
          var priority = deferred[i][2];
          var fulfilled = true;
          for (var j = 0; j < chunkIds.length; j++) {
            if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((function(key) {
              return __webpack_require__.O[key](chunkIds[j]);
            }))) {
              chunkIds.splice(j--, 1);
            } else {
              fulfilled = false;
              if (priority < notFulfilled) notFulfilled = priority;
            }
          }
          if (fulfilled) {
            deferred.splice(i--, 1);
            var r = fn();
            if (r !== undefined) result = r;
          }
        }
        return result;
      };
    }();
    !function() {
      __webpack_require__.F = {};
      __webpack_require__.E = function(chunkId) {
        Object.keys(__webpack_require__.F).map((function(key) {
          __webpack_require__.F[key](chunkId);
        }));
      };
    }();
    !function() {
      var getProto = Object.getPrototypeOf ? function(obj) {
        return Object.getPrototypeOf(obj);
      } : function(obj) {
        return obj.__proto__;
      };
      var leafPrototypes;
      __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = this(value);
        if (mode & 8) return value;
        if (typeof value === "object" && value) {
          if (mode & 4 && value.__esModule) return value;
          if (mode & 16 && typeof value.then === "function") return value;
        }
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        var def = {};
        leafPrototypes = leafPrototypes || [ null, getProto({}), getProto([]), getProto(getProto) ];
        for (var current = mode & 2 && value; typeof current == "object" && !~leafPrototypes.indexOf(current); current = getProto(current)) {
          Object.getOwnPropertyNames(current).forEach((function(key) {
            def[key] = function() {
              return value[key];
            };
          }));
        }
        def["default"] = function() {
          return value;
        };
        __webpack_require__.d(ns, def);
        return ns;
      };
    }();
    !function() {
      __webpack_require__.d = function(exports, definition) {
        for (var key in definition) {
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key]
            });
          }
        }
      };
    }();
    !function() {
      __webpack_require__.f = {};
      __webpack_require__.e = function(chunkId) {
        return Promise.all(Object.keys(__webpack_require__.f).reduce((function(promises, key) {
          __webpack_require__.f[key](chunkId, promises);
          return promises;
        }), []));
      };
    }();
    !function() {
      __webpack_require__.u = function(chunkId) {
        return "" + "tsparticles.pathseg.min" + ".js";
      };
    }();
    !function() {
      __webpack_require__.g = function() {
        if (typeof globalThis === "object") return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if (typeof window === "object") return window;
        }
      }();
    }();
    !function() {
      __webpack_require__.o = function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      };
    }();
    !function() {
      var inProgress = {};
      var dataWebpackPrefix = "tsparticles:";
      __webpack_require__.l = function(url, done, key, chunkId) {
        if (inProgress[url]) {
          inProgress[url].push(done);
          return;
        }
        var script, needAttach;
        if (key !== undefined) {
          var scripts = document.getElementsByTagName("script");
          for (var i = 0; i < scripts.length; i++) {
            var s = scripts[i];
            if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
              script = s;
              break;
            }
          }
        }
        if (!script) {
          needAttach = true;
          script = document.createElement("script");
          script.charset = "utf-8";
          script.timeout = 120;
          if (__webpack_require__.nc) {
            script.setAttribute("nonce", __webpack_require__.nc);
          }
          script.setAttribute("data-webpack", dataWebpackPrefix + key);
          script.src = url;
        }
        inProgress[url] = [ done ];
        var onScriptComplete = function(prev, event) {
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var doneFns = inProgress[url];
          delete inProgress[url];
          script.parentNode && script.parentNode.removeChild(script);
          doneFns && doneFns.forEach((function(fn) {
            return fn(event);
          }));
          if (prev) return prev(event);
        };
        var timeout = setTimeout(onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script
        }), 12e4);
        script.onerror = onScriptComplete.bind(null, script.onerror);
        script.onload = onScriptComplete.bind(null, script.onload);
        needAttach && document.head.appendChild(script);
      };
    }();
    !function() {
      __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
          });
        }
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
      };
    }();
    !function() {
      var scriptUrl;
      if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
      var document = __webpack_require__.g.document;
      if (!scriptUrl && document) {
        if (document.currentScript) scriptUrl = document.currentScript.src;
        if (!scriptUrl) {
          var scripts = document.getElementsByTagName("script");
          if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
        }
      }
      if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
      scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
      __webpack_require__.p = scriptUrl;
    }();
    !function() {
      var installedChunks = {
        143: 0,
        475: 0
      };
      __webpack_require__.f.j = function(chunkId, promises) {
        var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
        if (installedChunkData !== 0) {
          if (installedChunkData) {
            promises.push(installedChunkData[2]);
          } else {
            if (true) {
              var promise = new Promise((function(resolve, reject) {
                installedChunkData = installedChunks[chunkId] = [ resolve, reject ];
              }));
              promises.push(installedChunkData[2] = promise);
              var url = __webpack_require__.p + __webpack_require__.u(chunkId);
              var error = new Error;
              var loadingEnded = function(event) {
                if (__webpack_require__.o(installedChunks, chunkId)) {
                  installedChunkData = installedChunks[chunkId];
                  if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
                  if (installedChunkData) {
                    var errorType = event && (event.type === "load" ? "missing" : event.type);
                    var realSrc = event && event.target && event.target.src;
                    error.message = "Loading chunk " + chunkId + " failed.\n(" + errorType + ": " + realSrc + ")";
                    error.name = "ChunkLoadError";
                    error.type = errorType;
                    error.request = realSrc;
                    installedChunkData[1](error);
                  }
                }
              };
              __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
            } else installedChunks[chunkId] = 0;
          }
        }
      };
      __webpack_require__.F.j = function(chunkId) {
        if ((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
          installedChunks[chunkId] = null;
          var link = document.createElement("link");
          if (__webpack_require__.nc) {
            link.setAttribute("nonce", __webpack_require__.nc);
          }
          link.rel = "prefetch";
          link.as = "script";
          link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
          document.head.appendChild(link);
        }
      };
      __webpack_require__.O.j = function(chunkId) {
        return installedChunks[chunkId] === 0;
      };
      var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
        var chunkIds = data[0];
        var moreModules = data[1];
        var runtime = data[2];
        var moduleId, chunkId, i = 0;
        if (chunkIds.some((function(id) {
          return installedChunks[id] !== 0;
        }))) {
          for (moduleId in moreModules) {
            if (__webpack_require__.o(moreModules, moduleId)) {
              __webpack_require__.m[moduleId] = moreModules[moduleId];
            }
          }
          if (runtime) var result = runtime(__webpack_require__);
        }
        if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
        for (;i < chunkIds.length; i++) {
          chunkId = chunkIds[i];
          if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
            installedChunks[chunkId][0]();
          }
          installedChunks[chunkId] = 0;
        }
        return __webpack_require__.O(result);
      };
      var chunkLoadingGlobal = window["webpackChunktsparticles"] = window["webpackChunktsparticles"] || [];
      chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
      chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    }();
    !function() {
      __webpack_require__.O(0, [ 143 ], (function() {
        __webpack_require__.E(404);
      }), 5);
    }();
    var __webpack_exports__ = {};
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      loadPolygonMaskPlugin: function() {
        return loadPolygonMaskPlugin;
      }
    });
    class OptionsColor {
      constructor() {
        this.value = "#fff";
      }
      static create(source, data) {
        const color = new OptionsColor;
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
    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    function NumberUtils_mix(comp1, comp2, weight1, weight2) {
      return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }
    function randomInRange(r) {
      const max = getRangeMax(r);
      let min = getRangeMin(r);
      if (max === min) {
        min = 0;
      }
      return Math.random() * (max - min) + min;
    }
    function NumberUtils_getRangeValue(value) {
      return typeof value === "number" ? value : randomInRange(value);
    }
    function getRangeMin(value) {
      return typeof value === "number" ? value : value.min;
    }
    function getRangeMax(value) {
      return typeof value === "number" ? value : value.max;
    }
    function setRangeValue(source, value) {
      if (source === value || value === undefined && typeof source === "number") {
        return source;
      }
      const min = getRangeMin(source), max = getRangeMax(source);
      return value !== undefined ? {
        min: Math.min(min, value),
        max: Math.max(max, value)
      } : setRangeValue(min, max);
    }
    function NumberUtils_getValue(options) {
      const random = options.random, {enable: enable, minimumValue: minimumValue} = typeof random === "boolean" ? {
        enable: random,
        minimumValue: 0
      } : random;
      return enable ? NumberUtils_getRangeValue(setRangeValue(options.value, minimumValue)) : NumberUtils_getRangeValue(options.value);
    }
    function NumberUtils_getDistances(pointA, pointB) {
      const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
      return {
        dx: dx,
        dy: dy,
        distance: Math.sqrt(dx * dx + dy * dy)
      };
    }
    function getDistance(pointA, pointB) {
      return NumberUtils_getDistances(pointA, pointB).distance;
    }
    function getParticleDirectionAngle(direction) {
      if (typeof direction === "number") {
        return direction * Math.PI / 180;
      } else {
        switch (direction) {
         case "top":
          return -Math.PI / 2;

         case "top-right":
          return -Math.PI / 4;

         case "right":
          return 0;

         case "bottom-right":
          return Math.PI / 4;

         case "bottom":
          return Math.PI / 2;

         case "bottom-left":
          return 3 * Math.PI / 4;

         case "left":
          return Math.PI;

         case "top-left":
          return -3 * Math.PI / 4;

         case "none":
         default:
          return Math.random() * Math.PI * 2;
        }
      }
    }
    function getParticleBaseVelocity(direction) {
      const baseVelocity = Vector.origin;
      baseVelocity.length = 1;
      baseVelocity.angle = direction;
      return baseVelocity;
    }
    function NumberUtils_collisionVelocity(v1, v2, m1, m2) {
      return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
    }
    function calcEasing(value, type) {
      switch (type) {
       case "ease-out-quad":
        return 1 - (1 - value) ** 2;

       case "ease-out-cubic":
        return 1 - (1 - value) ** 3;

       case "ease-out-quart":
        return 1 - (1 - value) ** 4;

       case "ease-out-quint":
        return 1 - (1 - value) ** 5;

       case "ease-out-expo":
        return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);

       case "ease-out-sine":
        return Math.sin(value * Math.PI / 2);

       case "ease-out-back":
        {
          const c1 = 1.70158, c3 = c1 + 1;
          return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }

       case "ease-out-circ":
        return Math.sqrt(1 - Math.pow(value - 1, 2));

       default:
        return value;
      }
    }
    function calcPositionFromSize(data) {
      var _a, _b;
      return ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? {
        x: data.position.x * data.size.width / 100,
        y: data.position.y * data.size.height / 100
      } : undefined;
    }
    function calcPositionOrRandomFromSize(data) {
      var _a, _b, _c, _d;
      return {
        x: ((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * 100) * data.size.width / 100,
        y: ((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * 100) * data.size.height / 100
      };
    }
    function calcPositionOrRandomFromSizeRanged(data) {
      var _a, _b;
      const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? NumberUtils_getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? NumberUtils_getRangeValue(data.position.y) : undefined
      };
      return calcPositionOrRandomFromSize({
        size: data.size,
        position: position
      });
    }
    function calcExactPositionOrRandomFromSize(data) {
      var _a, _b, _c, _d;
      return {
        x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * data.size.width,
        y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * data.size.height
      };
    }
    function calcExactPositionOrRandomFromSizeRanged(data) {
      var _a, _b;
      const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? NumberUtils_getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? NumberUtils_getRangeValue(data.position.y) : undefined
      };
      return calcExactPositionOrRandomFromSize({
        size: data.size,
        position: position
      });
    }
    class Constants_Constants {}
    Constants_Constants.generatedAttribute = "generated";
    Constants_Constants.randomColorValue = "random";
    Constants_Constants.midColorValue = "mid";
    Constants_Constants.touchEndEvent = "touchend";
    Constants_Constants.mouseDownEvent = "mousedown";
    Constants_Constants.mouseUpEvent = "mouseup";
    Constants_Constants.mouseMoveEvent = "mousemove";
    Constants_Constants.touchStartEvent = "touchstart";
    Constants_Constants.touchMoveEvent = "touchmove";
    Constants_Constants.mouseLeaveEvent = "mouseleave";
    Constants_Constants.mouseOutEvent = "mouseout";
    Constants_Constants.touchCancelEvent = "touchcancel";
    Constants_Constants.resizeEvent = "resize";
    Constants_Constants.visibilityChangeEvent = "visibilitychange";
    Constants_Constants.noPolygonDataLoaded = "No polygon data loaded.";
    Constants_Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
    function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
      const res = {
        bounced: false
      };
      if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
        return res;
      }
      if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
        res.velocity = velocity * -factor;
        res.bounced = true;
      }
      return res;
    }
    function checkSelector(element, selectors) {
      if (!(selectors instanceof Array)) {
        return element.matches(selectors);
      }
      for (const selector of selectors) {
        if (element.matches(selector)) {
          return true;
        }
      }
      return false;
    }
    function isSsr() {
      return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
    }
    function animate() {
      return isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
    }
    function cancelAnimation() {
      return isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
    }
    function isInArray(value, array) {
      return value === array || array instanceof Array && array.indexOf(value) > -1;
    }
    async function loadFont(character) {
      var _a, _b;
      try {
        await document.fonts.load(`${(_a = character.weight) !== null && _a !== void 0 ? _a : "400"} 36px '${(_b = character.font) !== null && _b !== void 0 ? _b : "Verdana"}'`);
      } catch (_c) {}
    }
    function arrayRandomIndex(array) {
      return Math.floor(Math.random() * array.length);
    }
    function itemFromArray(array, index, useIndex = true) {
      const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
      return array[fixedIndex];
    }
    function isPointInside(point, size, radius, direction) {
      return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, direction);
    }
    function areBoundsInside(bounds, size, direction) {
      let inside = true;
      if (!direction || direction === "bottom") {
        inside = bounds.top < size.height;
      }
      if (inside && (!direction || direction === "left")) {
        inside = bounds.right > 0;
      }
      if (inside && (!direction || direction === "right")) {
        inside = bounds.left < size.width;
      }
      if (inside && (!direction || direction === "top")) {
        inside = bounds.bottom > 0;
      }
      return inside;
    }
    function calculateBounds(point, radius) {
      return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius
      };
    }
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
          const sourceDict = source, value = sourceDict[key], isObject = typeof value === "object", destDict = destination;
          destDict[key] = isObject && Array.isArray(value) ? value.map((v => deepExtend(destDict[key], v))) : deepExtend(destDict[key], value);
        }
      }
      return destination;
    }
    function isDivModeEnabled(mode, divs) {
      return divs instanceof Array ? !!divs.find((t => t.enable && isInArray(mode, t.mode))) : isInArray(mode, divs.mode);
    }
    function divModeExecute(mode, divs, callback) {
      if (divs instanceof Array) {
        for (const div of divs) {
          const divMode = div.mode, divEnabled = div.enable;
          if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(div, callback);
          }
        }
      } else {
        const divMode = divs.mode, divEnabled = divs.enable;
        if (divEnabled && isInArray(mode, divMode)) {
          singleDivModeExecute(divs, callback);
        }
      }
    }
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
    function divMode(divs, element) {
      if (!element || !divs) {
        return;
      }
      if (divs instanceof Array) {
        return divs.find((d => checkSelector(element, d.selectors)));
      } else if (checkSelector(element, divs.selectors)) {
        return divs;
      }
    }
    function circleBounceDataFromParticle(p) {
      return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
      };
    }
    function circleBounce(p1, p2) {
      const {x: xVelocityDiff, y: yVelocityDiff} = p1.velocity.sub(p2.velocity), [pos1, pos2] = [ p1.position, p2.position ], {dx: xDist, dy: yDist} = getDistances(pos2, pos1);
      if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
        return;
      }
      const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
      p1.velocity.x = vFinal1.x * p1.factor.x;
      p1.velocity.y = vFinal1.y * p1.factor.y;
      p2.velocity.x = vFinal2.x * p2.factor.x;
      p2.velocity.y = vFinal2.y * p2.factor.y;
    }
    function rectBounce(particle, divBounds) {
      const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size);
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
      }, particle.velocity.x, getValue(particle.options.bounce.horizontal));
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
      }, particle.velocity.y, getValue(particle.options.bounce.vertical));
      if (resV.bounced) {
        if (resV.velocity !== undefined) {
          particle.velocity.y = resV.velocity;
        }
        if (resV.position !== undefined) {
          particle.position.y = resV.position;
        }
      }
    }
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
        const hexFixed = input.replace(shorthandRegex, ((_m, r, g, b, a) => r + r + g + g + b + b + (a !== undefined ? a + a : "")));
        const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
        const result = regex.exec(hexFixed);
        return result ? {
          a: result[4] !== undefined ? parseInt(result[4], 16) / 255 : 1,
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
        res = color.value === Constants_Constants.randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
      } else {
        if (color.value instanceof Array) {
          const colorSelected = itemFromArray(color.value, index, useIndex);
          res = colorToRgb({
            value: colorSelected
          });
        } else {
          const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
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
    function colorToHsl(color, index, useIndex = true) {
      const rgb = colorToRgb(color, index, useIndex);
      return rgb !== undefined ? rgbToHsl(rgb) : undefined;
    }
    function rgbToHsl(color) {
      const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255;
      const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
      const res = {
        h: 0,
        l: (max + min) / 2,
        s: 0
      };
      if (max !== min) {
        res.s = res.l < .5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2 + (b1 - r1) / (max - min) : 4 + (r1 - g1) / (max - min);
      }
      res.l *= 100;
      res.s *= 100;
      res.h *= 60;
      if (res.h < 0) {
        res.h += 360;
      }
      return res;
    }
    function stringToAlpha(input) {
      var _a;
      return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
    }
    function stringToRgb(input) {
      return stringToRgba(input);
    }
    function hslToRgb(hsl) {
      const result = {
        b: 0,
        g: 0,
        r: 0
      }, hslPercent = {
        h: hsl.h / 360,
        l: hsl.l / 100,
        s: hsl.s / 100
      };
      if (hslPercent.s === 0) {
        result.b = hslPercent.l;
        result.g = hslPercent.l;
        result.r = hslPercent.l;
      } else {
        const q = hslPercent.l < .5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s, p = 2 * hslPercent.l - q;
        result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
        result.g = hue2rgb(p, q, hslPercent.h);
        result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
      }
      result.r = Math.floor(result.r * 255);
      result.g = Math.floor(result.g * 255);
      result.b = Math.floor(result.b * 255);
      return result;
    }
    function hslaToRgba(hsla) {
      const rgbResult = hslToRgb(hsla);
      return {
        a: hsla.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r
      };
    }
    function hslToHsv(hsl) {
      const l = hsl.l / 100, sl = hsl.s / 100, v = l + sl * Math.min(l, 1 - l), sv = !v ? 0 : 2 * (1 - l / v);
      return {
        h: hsl.h,
        s: sv * 100,
        v: v * 100
      };
    }
    function hslaToHsva(hsla) {
      const hsvResult = hslToHsv(hsla);
      return {
        a: hsla.a,
        h: hsvResult.h,
        s: hsvResult.s,
        v: hsvResult.v
      };
    }
    function hsvToHsl(hsv) {
      const v = hsv.v / 100, sv = hsv.s / 100, l = v * (1 - sv / 2), sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
      return {
        h: hsv.h,
        l: l * 100,
        s: sl * 100
      };
    }
    function hsvaToHsla(hsva) {
      const hslResult = hsvToHsl(hsva);
      return {
        a: hsva.a,
        h: hslResult.h,
        l: hslResult.l,
        s: hslResult.s
      };
    }
    function hsvToRgb(hsv) {
      const result = {
        b: 0,
        g: 0,
        r: 0
      }, hsvPercent = {
        h: hsv.h / 60,
        s: hsv.s / 100,
        v: hsv.v / 100
      };
      const c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
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
    function hsvaToRgba(hsva) {
      const rgbResult = hsvToRgb(hsva);
      return {
        a: hsva.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r
      };
    }
    function rgbToHsv(rgb) {
      const rgbPercent = {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255
      }, xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b), xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b), v = xMax, c = xMax - xMin;
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
        h: h,
        s: s * 100,
        v: v * 100
      };
    }
    function rgbaToHsva(rgba) {
      const hsvResult = rgbToHsv(rgba);
      return {
        a: rgba.a,
        h: hsvResult.h,
        s: hsvResult.s,
        v: hsvResult.v
      };
    }
    function getRandomRgbColor(min) {
      const fixedMin = min !== null && min !== void 0 ? min : 0;
      return {
        b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
        g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
        r: Math.floor(randomInRange(setRangeValue(fixedMin, 256)))
      };
    }
    function getStyleFromRgb(color, opacity) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    function getStyleFromHsl(color, opacity) {
      return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    function getStyleFromHsv(color, opacity) {
      return getStyleFromHsl(hsvToHsl(color), opacity);
    }
    function colorMix(color1, color2, size1, size2) {
      let rgb1 = color1, rgb2 = color2;
      if (rgb1.r === undefined) {
        rgb1 = hslToRgb(color1);
      }
      if (rgb2.r === undefined) {
        rgb2 = hslToRgb(color2);
      }
      return {
        b: mix(rgb1.b, rgb2.b, size1, size2),
        g: mix(rgb1.g, rgb2.g, size1, size2),
        r: mix(rgb1.r, rgb2.r, size1, size2)
      };
    }
    function getLinkColor(p1, p2, linkColor) {
      var _a, _b;
      if (linkColor === Constants.randomColorValue) {
        return getRandomRgbColor();
      } else if (linkColor === "mid") {
        const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor(), destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
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
    function getLinkRandomColor(optColor, blink, consent) {
      const color = typeof optColor === "string" ? optColor : optColor.value;
      if (color === Constants.randomColorValue) {
        if (consent) {
          return colorToRgb({
            value: color
          });
        } else if (blink) {
          return Constants.randomColorValue;
        } else {
          return Constants.midColorValue;
        }
      } else {
        return colorToRgb({
          value: color
        });
      }
    }
    function getHslFromAnimation(animation) {
      return animation !== undefined ? {
        h: animation.h.value,
        s: animation.s.value,
        l: animation.l.value
      } : undefined;
    }
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
    function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
      colorValue.enable = colorAnimation.enable;
      if (colorValue.enable) {
        colorValue.velocity = getRangeValue(colorAnimation.speed) / 100 * reduceFactor;
        if (colorAnimation.sync) {
          return;
        }
        colorValue.status = 0;
        colorValue.velocity *= Math.random();
        if (colorValue.value) {
          colorValue.value *= Math.random();
        }
      } else {
        colorValue.velocity = 0;
      }
    }
    class PolygonMaskDrawStroke {
      constructor() {
        this.color = new OptionsColor;
        this.width = .5;
        this.opacity = 1;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (typeof this.color.value === "string") {
          this.opacity = (_a = stringToAlpha(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
        if (data.width !== undefined) {
          this.width = data.width;
        }
      }
    }
    class PolygonMaskDraw {
      constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke;
      }
      get lineWidth() {
        return this.stroke.width;
      }
      set lineWidth(value) {
        this.stroke.width = value;
      }
      get lineColor() {
        return this.stroke.color;
      }
      set lineColor(value) {
        this.stroke.color = OptionsColor.create(this.stroke.color, value);
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        const stroke = (_a = data.stroke) !== null && _a !== void 0 ? _a : {
          color: data.lineColor,
          width: data.lineWidth
        };
        this.stroke.load(stroke);
      }
    }
    class PolygonMaskInline {
      constructor() {
        this.arrangement = "one-per-point";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.arrangement !== undefined) {
          this.arrangement = data.arrangement;
        }
      }
    }
    class PolygonMaskLocalSvg {
      constructor() {
        this.path = [];
        this.size = {
          height: 0,
          width: 0
        };
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.path !== undefined) {
          this.path = data.path;
        }
        if (data.size !== undefined) {
          if (data.size.width !== undefined) {
            this.size.width = data.size.width;
          }
          if (data.size.height !== undefined) {
            this.size.height = data.size.height;
          }
        }
      }
    }
    class PolygonMaskMove {
      constructor() {
        this.radius = 10;
        this.type = "path";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.radius !== undefined) {
          this.radius = data.radius;
        }
        if (data.type !== undefined) {
          this.type = data.type;
        }
      }
    }
    class PolygonMask {
      constructor() {
        this.draw = new PolygonMaskDraw;
        this.enable = false;
        this.inline = new PolygonMaskInline;
        this.move = new PolygonMaskMove;
        this.scale = 1;
        this.type = "none";
      }
      get inlineArrangement() {
        return this.inline.arrangement;
      }
      set inlineArrangement(value) {
        this.inline.arrangement = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        this.draw.load(data.draw);
        const inline = (_a = data.inline) !== null && _a !== void 0 ? _a : {
          arrangement: data.inlineArrangement
        };
        if (inline !== undefined) {
          this.inline.load(inline);
        }
        this.move.load(data.move);
        if (data.scale !== undefined) {
          this.scale = data.scale;
        }
        if (data.type !== undefined) {
          this.type = data.type;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        } else {
          this.enable = this.type !== "none";
        }
        if (data.url !== undefined) {
          this.url = data.url;
        }
        if (data.data !== undefined) {
          if (typeof data.data === "string") {
            this.data = data.data;
          } else {
            this.data = new PolygonMaskLocalSvg;
            this.data.load(data.data);
          }
        }
        if (data.position !== undefined) {
          this.position = deepExtend({}, data.position);
        }
      }
    }
    class Vector_Vector {
      constructor(xOrCoords, y) {
        if (typeof xOrCoords !== "number" && xOrCoords) {
          this.x = xOrCoords.x;
          this.y = xOrCoords.y;
        } else if (xOrCoords !== undefined && y !== undefined) {
          this.x = xOrCoords;
          this.y = y;
        } else {
          throw new Error("tsParticles - Vector not initialized correctly");
        }
      }
      static clone(source) {
        return Vector_Vector.create(source.x, source.y);
      }
      static create(x, y) {
        return new Vector_Vector(x, y);
      }
      static get origin() {
        return Vector_Vector.create(0, 0);
      }
      get angle() {
        return Math.atan2(this.y, this.x);
      }
      set angle(angle) {
        this.updateFromAngle(angle, this.length);
      }
      get length() {
        return Math.sqrt(this.getLengthSq());
      }
      set length(length) {
        this.updateFromAngle(this.angle, length);
      }
      add(v) {
        return Vector_Vector.create(this.x + v.x, this.y + v.y);
      }
      addTo(v) {
        this.x += v.x;
        this.y += v.y;
      }
      sub(v) {
        return Vector_Vector.create(this.x - v.x, this.y - v.y);
      }
      subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
      }
      mult(n) {
        return Vector_Vector.create(this.x * n, this.y * n);
      }
      multTo(n) {
        this.x *= n;
        this.y *= n;
      }
      div(n) {
        return Vector_Vector.create(this.x / n, this.y / n);
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
        return Vector_Vector.clone(this);
      }
      setTo(v) {
        this.x = v.x;
        this.y = v.y;
      }
      rotate(angle) {
        return Vector_Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
      }
      updateFromAngle(angle, length) {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
      }
    }
    function drawPolygonMask(context, rawData, stroke) {
      const color = colorToRgb(stroke.color);
      if (!color) {
        return;
      }
      context.beginPath();
      context.moveTo(rawData[0].x, rawData[0].y);
      for (const item of rawData) {
        context.lineTo(item.x, item.y);
      }
      context.closePath();
      context.strokeStyle = getStyleFromRgb(color);
      context.lineWidth = stroke.width;
      context.stroke();
    }
    function drawPolygonMaskPath(context, path, stroke, position) {
      context.translate(position.x, position.y);
      const color = colorToRgb(stroke.color);
      if (!color) {
        return;
      }
      context.strokeStyle = getStyleFromRgb(color, stroke.opacity);
      context.lineWidth = stroke.width;
      context.stroke(path);
    }
    function parsePaths(paths, scale, offset) {
      var _a;
      const res = [];
      for (const path of paths) {
        const segments = path.element.pathSegList, len = (_a = segments === null || segments === void 0 ? void 0 : segments.numberOfItems) !== null && _a !== void 0 ? _a : 0, p = {
          x: 0,
          y: 0
        };
        for (let i = 0; i < len; i++) {
          const segment = segments === null || segments === void 0 ? void 0 : segments.getItem(i);
          const svgPathSeg = window.SVGPathSeg;
          switch (segment === null || segment === void 0 ? void 0 : segment.pathSegType) {
           case svgPathSeg.PATHSEG_MOVETO_ABS:
           case svgPathSeg.PATHSEG_LINETO_ABS:
           case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
           case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
           case svgPathSeg.PATHSEG_ARC_ABS:
           case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
           case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
            {
              const absSeg = segment;
              p.x = absSeg.x;
              p.y = absSeg.y;
              break;
            }

           case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
            p.x = segment.x;
            break;

           case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
            p.y = segment.y;
            break;

           case svgPathSeg.PATHSEG_LINETO_REL:
           case svgPathSeg.PATHSEG_MOVETO_REL:
           case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
           case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
           case svgPathSeg.PATHSEG_ARC_REL:
           case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
           case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
            {
              const relSeg = segment;
              p.x += relSeg.x;
              p.y += relSeg.y;
              break;
            }

           case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
            p.x += segment.x;
            break;

           case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
            p.y += segment.y;
            break;

           case svgPathSeg.PATHSEG_UNKNOWN:
           case svgPathSeg.PATHSEG_CLOSEPATH:
            continue;
          }
          res.push({
            x: p.x * scale + offset.x,
            y: p.y * scale + offset.y
          });
        }
      }
      return res;
    }
    function calcClosestPtOnSegment(s1, s2, pos) {
      const {dx: dx, dy: dy} = NumberUtils_getDistances(pos, s1), {dx: dxx, dy: dyy} = NumberUtils_getDistances(s2, s1), t = (dx * dxx + dy * dyy) / (dxx ** 2 + dyy ** 2), res = {
        x: s1.x + dxx * t,
        y: s1.x + dyy * t,
        isOnSegment: t >= 0 && t <= 1
      };
      if (t < 0) {
        res.x = s1.x;
        res.y = s1.y;
      } else if (t > 1) {
        res.x = s2.x;
        res.y = s2.y;
      }
      return res;
    }
    function segmentBounce(start, stop, velocity) {
      const {dx: dx, dy: dy} = NumberUtils_getDistances(start, stop), wallAngle = Math.atan2(dy, dx), wallNormal = Vector_Vector.create(Math.sin(wallAngle), -Math.cos(wallAngle)), d = 2 * (velocity.x * wallNormal.x + velocity.y * wallNormal.y);
      wallNormal.multTo(d);
      velocity.subFrom(wallNormal);
    }
    class PolygonMaskInstance {
      constructor(container) {
        this.container = container;
        this.dimension = {
          height: 0,
          width: 0
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new PolygonMask;
        this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
      }
      async initAsync(options) {
        this.options.load(options === null || options === void 0 ? void 0 : options.polygon);
        const polygonMaskOptions = this.options;
        this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;
        if (polygonMaskOptions.enable) {
          await this.initRawData();
        }
      }
      resize() {
        const container = this.container, options = this.options;
        if (!(options.enable && options.type !== "none")) {
          return;
        }
        if (this.redrawTimeout) {
          clearTimeout(this.redrawTimeout);
        }
        this.redrawTimeout = window.setTimeout((async () => {
          await this.initRawData(true);
          await container.particles.redraw();
        }), 250);
      }
      stop() {
        delete this.raw;
        delete this.paths;
      }
      particlesInitialization() {
        const options = this.options;
        if (options.enable && options.type === "inline" && (options.inline.arrangement === "one-per-point" || options.inline.arrangement === "per-point")) {
          this.drawPoints();
          return true;
        }
        return false;
      }
      particlePosition(position) {
        var _a, _b;
        const options = this.options;
        if (!(options.enable && ((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0)) {
          return;
        }
        return deepExtend({}, position ? position : this.randomPoint());
      }
      particleBounce(particle, delta, direction) {
        return this.polygonBounce(particle, delta, direction);
      }
      clickPositionValid(position) {
        const options = this.options;
        return options.enable && options.type !== "none" && options.type !== "inline" && this.checkInsidePolygon(position);
      }
      draw(context) {
        var _a;
        if (!((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
          return;
        }
        const options = this.options, polygonDraw = options.draw;
        if (!options.enable || !polygonDraw.enable) {
          return;
        }
        const rawData = this.raw;
        for (const path of this.paths) {
          const path2d = path.path2d, path2dSupported = this.path2DSupported;
          if (!context) {
            continue;
          }
          if (path2dSupported && path2d && this.offset) {
            drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
          } else if (rawData) {
            drawPolygonMask(context, rawData, polygonDraw.stroke);
          }
        }
      }
      polygonBounce(particle, _delta, direction) {
        const options = this.options;
        if (!this.raw || !options.enable || direction !== "top") {
          return false;
        }
        if (options.type === "inside" || options.type === "outside") {
          let closest, dx, dy;
          const pos = particle.getPosition(), radius = particle.getRadius();
          for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
            const pi = this.raw[i], pj = this.raw[j];
            closest = calcClosestPtOnSegment(pi, pj, pos);
            const dist = NumberUtils_getDistances(pos, closest);
            [dx, dy] = [ dist.dx, dist.dy ];
            if (dist.distance < radius) {
              segmentBounce(pi, pj, particle.velocity);
              return true;
            }
          }
          if (closest && dx !== undefined && dy !== undefined && !this.checkInsidePolygon(pos)) {
            const factor = {
              x: 1,
              y: 1
            };
            if (particle.position.x >= closest.x) {
              factor.x = -1;
            }
            if (particle.position.y >= closest.y) {
              factor.y = -1;
            }
            particle.position.x = closest.x + radius * 2 * factor.x;
            particle.position.y = closest.y + radius * 2 * factor.y;
            particle.velocity.mult(-1);
            return true;
          }
        } else if (options.type === "inline" && particle.initialPosition) {
          const dist = getDistance(particle.initialPosition, particle.getPosition());
          if (dist > this.polygonMaskMoveRadius) {
            particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
            particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
            return true;
          }
        }
        return false;
      }
      checkInsidePolygon(position) {
        var _a, _b;
        const container = this.container, options = this.options;
        if (!options.enable || options.type === "none" || options.type === "inline") {
          return true;
        }
        if (!this.raw) {
          throw new Error(Constants_Constants.noPolygonFound);
        }
        const canvasSize = container.canvas.size, x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width, y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height;
        let inside = false;
        for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
          const pi = this.raw[i], pj = this.raw[j], intersect = pi.y > y !== pj.y > y && x < (pj.x - pi.x) * (y - pi.y) / (pj.y - pi.y) + pi.x;
          if (intersect) {
            inside = !inside;
          }
        }
        return options.type === "inside" ? inside : options.type === "outside" ? !inside : false;
      }
      parseSvgPath(xml, force) {
        var _a, _b, _c;
        const forceDownload = force !== null && force !== void 0 ? force : false;
        if (this.paths !== undefined && !forceDownload) {
          return this.raw;
        }
        const container = this.container, options = this.options, parser = new DOMParser, doc = parser.parseFromString(xml, "image/svg+xml"), svg = doc.getElementsByTagName("svg")[0];
        let svgPaths = svg.getElementsByTagName("path");
        if (!svgPaths.length) {
          svgPaths = doc.getElementsByTagName("path");
        }
        this.paths = [];
        for (let i = 0; i < svgPaths.length; i++) {
          const path = svgPaths.item(i);
          if (path) {
            this.paths.push({
              element: path,
              length: path.getTotalLength()
            });
          }
        }
        const pxRatio = container.retina.pixelRatio, scale = options.scale / pxRatio;
        this.dimension.width = parseFloat((_a = svg.getAttribute("width")) !== null && _a !== void 0 ? _a : "0") * scale;
        this.dimension.height = parseFloat((_b = svg.getAttribute("height")) !== null && _b !== void 0 ? _b : "0") * scale;
        const position = (_c = options.position) !== null && _c !== void 0 ? _c : {
          x: 50,
          y: 50
        };
        this.offset = {
          x: container.canvas.size.width * position.x / (100 * pxRatio) - this.dimension.width / 2,
          y: container.canvas.size.height * position.y / (100 * pxRatio) - this.dimension.height / 2
        };
        return parsePaths(this.paths, scale, this.offset);
      }
      async downloadSvgPath(svgUrl, force) {
        const options = this.options, url = svgUrl || options.url, forceDownload = force !== null && force !== void 0 ? force : false;
        if (!url || this.paths !== undefined && !forceDownload) {
          return this.raw;
        }
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error("tsParticles Error - Error occurred during polygon mask download");
        }
        return this.parseSvgPath(await req.text(), force);
      }
      drawPoints() {
        if (!this.raw) {
          return;
        }
        for (const item of this.raw) {
          this.container.particles.addParticle({
            x: item.x,
            y: item.y
          });
        }
      }
      randomPoint() {
        const container = this.container, options = this.options;
        let position;
        if (options.type === "inline") {
          switch (options.inline.arrangement) {
           case "random-point":
            position = this.getRandomPoint();
            break;

           case "random-length":
            position = this.getRandomPointByLength();
            break;

           case "equidistant":
            position = this.getEquidistantPointByIndex(container.particles.count);
            break;

           case "one-per-point":
           case "per-point":
           default:
            position = this.getPointByIndex(container.particles.count);
          }
        } else {
          position = {
            x: Math.random() * container.canvas.size.width,
            y: Math.random() * container.canvas.size.height
          };
        }
        if (this.checkInsidePolygon(position)) {
          return position;
        } else {
          return this.randomPoint();
        }
      }
      getRandomPoint() {
        if (!this.raw || !this.raw.length) {
          throw new Error(Constants_Constants.noPolygonDataLoaded);
        }
        const coords = itemFromArray(this.raw);
        return {
          x: coords.x,
          y: coords.y
        };
      }
      getRandomPointByLength() {
        var _a, _b, _c;
        const options = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
          throw new Error(Constants_Constants.noPolygonDataLoaded);
        }
        const path = itemFromArray(this.paths), distance = Math.floor(Math.random() * path.length) + 1, point = path.element.getPointAtLength(distance);
        return {
          x: point.x * options.scale + (((_b = this.offset) === null || _b === void 0 ? void 0 : _b.x) || 0),
          y: point.y * options.scale + (((_c = this.offset) === null || _c === void 0 ? void 0 : _c.y) || 0)
        };
      }
      getEquidistantPointByIndex(index) {
        var _a, _b, _c, _d, _e, _f, _g;
        const options = this.container.actualOptions, polygonMaskOptions = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) throw new Error(Constants_Constants.noPolygonDataLoaded);
        let offset = 0, point;
        const totalLength = this.paths.reduce(((tot, path) => tot + path.length), 0), distance = totalLength / options.particles.number.value;
        for (const path of this.paths) {
          const pathDistance = distance * index - offset;
          if (pathDistance <= path.length) {
            point = path.element.getPointAtLength(pathDistance);
            break;
          } else {
            offset += path.length;
          }
        }
        return {
          x: ((_b = point === null || point === void 0 ? void 0 : point.x) !== null && _b !== void 0 ? _b : 0) * polygonMaskOptions.scale + ((_d = (_c = this.offset) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0),
          y: ((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) * polygonMaskOptions.scale + ((_g = (_f = this.offset) === null || _f === void 0 ? void 0 : _f.y) !== null && _g !== void 0 ? _g : 0)
        };
      }
      getPointByIndex(index) {
        if (!this.raw || !this.raw.length) {
          throw new Error(Constants_Constants.noPolygonDataLoaded);
        }
        const coords = this.raw[index % this.raw.length];
        return {
          x: coords.x,
          y: coords.y
        };
      }
      createPath2D() {
        var _a, _b;
        const options = this.options;
        if (!this.path2DSupported || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
          return;
        }
        for (const path of this.paths) {
          const pathData = (_b = path.element) === null || _b === void 0 ? void 0 : _b.getAttribute("d");
          if (pathData) {
            const path2d = new Path2D(pathData), matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(), finalPath = new Path2D, transform = matrix.scale(options.scale);
            if (finalPath.addPath) {
              finalPath.addPath(path2d, transform);
              path.path2d = finalPath;
            } else {
              delete path.path2d;
            }
          } else {
            delete path.path2d;
          }
          if (path.path2d || !this.raw) {
            continue;
          }
          path.path2d = new Path2D;
          path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
          this.raw.forEach(((pos, i) => {
            var _a;
            if (i > 0) {
              (_a = path.path2d) === null || _a === void 0 ? void 0 : _a.lineTo(pos.x, pos.y);
            }
          }));
          path.path2d.closePath();
        }
      }
      async initRawData(force) {
        const options = this.options;
        if (options.url) {
          this.raw = await this.downloadSvgPath(options.url, force);
        } else if (options.data) {
          const data = options.data;
          let svg;
          if (typeof data !== "string") {
            const path = data.path instanceof Array ? data.path.map((t => `<path d="${t}" />`)).join("") : `<path d="${data.path}" />`;
            const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
            svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
          } else {
            svg = data;
          }
          this.raw = this.parseSvgPath(svg, force);
        }
        this.createPath2D();
      }
    }
    class PolygonMaskPlugin {
      constructor() {
        this.id = "polygonMask";
      }
      getPlugin(container) {
        return new PolygonMaskInstance(container);
      }
      needsPlugin(options) {
        var _a, _b, _c;
        return (_b = (_a = options === null || options === void 0 ? void 0 : options.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : ((_c = options === null || options === void 0 ? void 0 : options.polygon) === null || _c === void 0 ? void 0 : _c.type) !== undefined && options.polygon.type !== "none";
      }
      loadOptions(options, source) {
        if (!this.needsPlugin(source)) {
          return;
        }
        const optionsCast = options;
        let polygonOptions = optionsCast.polygon;
        if ((polygonOptions === null || polygonOptions === void 0 ? void 0 : polygonOptions.load) === undefined) {
          optionsCast.polygon = polygonOptions = new PolygonMask;
        }
        polygonOptions.load(source === null || source === void 0 ? void 0 : source.polygon);
      }
    }
    async function loadPolygonMaskPlugin(engine) {
      if (!isSsr() && !("SVGPathSeg" in window)) {
        await __webpack_require__.e(404).then(__webpack_require__.t.bind(__webpack_require__, 167, 23));
      }
      const plugin = new PolygonMaskPlugin;
      await engine.addPlugin(plugin);
    }
    __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
    return __webpack_exports__;
  }();
}));