(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else {
    var a = factory();
    for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
  }
})(window, (function() {
  return function() {
    "use strict";
    var __webpack_require__ = {};
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
      __webpack_require__.o = function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
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
    var __webpack_exports__ = {};
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      loadExternalBounceInteraction: function() {
        return loadExternalBounceInteraction;
      }
    });
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
    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    function mix(comp1, comp2, weight1, weight2) {
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
    function getRangeValue(value) {
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
    function getValue(options) {
      const random = options.random, {enable: enable, minimumValue: minimumValue} = typeof random === "boolean" ? {
        enable: random,
        minimumValue: 0
      } : random;
      return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
    }
    function getDistances(pointA, pointB) {
      const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
      return {
        dx: dx,
        dy: dy,
        distance: Math.sqrt(dx * dx + dy * dy)
      };
    }
    function getDistance(pointA, pointB) {
      return getDistances(pointA, pointB).distance;
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
    function collisionVelocity(v1, v2, m1, m2) {
      return Vector_Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
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
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined
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
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined
      };
      return calcExactPositionOrRandomFromSize({
        size: data.size,
        position: position
      });
    }
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
        factor: Vector_Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
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
    class Range {
      constructor(x, y) {
        this.position = {
          x: x,
          y: y
        };
      }
    }
    class Circle extends Range {
      constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
      }
      contains(point) {
        return getDistance(point, this.position) <= this.radius;
      }
      intersects(range) {
        const rect = range, circle = range, pos1 = this.position, pos2 = range.position, xDist = Math.abs(pos2.x - pos1.x), yDist = Math.abs(pos2.y - pos1.y), r = this.radius;
        if (circle.radius !== undefined) {
          const rSum = r + circle.radius, dist = Math.sqrt(xDist * xDist + yDist + yDist);
          return rSum > dist;
        } else if (rect.size !== undefined) {
          const w = rect.size.width, h = rect.size.height, edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
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
    class Constants {}
    Constants.generatedAttribute = "generated";
    Constants.randomColorValue = "random";
    Constants.midColorValue = "mid";
    Constants.touchEndEvent = "touchend";
    Constants.mouseDownEvent = "mousedown";
    Constants.mouseUpEvent = "mouseup";
    Constants.mouseMoveEvent = "mousemove";
    Constants.touchStartEvent = "touchstart";
    Constants.touchMoveEvent = "touchmove";
    Constants.mouseLeaveEvent = "mouseleave";
    Constants.mouseOutEvent = "mouseout";
    Constants.touchCancelEvent = "touchcancel";
    Constants.resizeEvent = "resize";
    Constants.visibilityChangeEvent = "visibilitychange";
    Constants.noPolygonDataLoaded = "No polygon data loaded.";
    Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
    class ExternalInteractorBase {
      constructor(container) {
        this.container = container;
        this.type = 0;
      }
    }
    class Rectangle extends Range {
      constructor(x, y, width, height) {
        super(x, y);
        this.size = {
          height: height,
          width: width
        };
      }
      contains(point) {
        const w = this.size.width, h = this.size.height, pos = this.position;
        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
      }
      intersects(range) {
        const rect = range, circle = range, w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position;
        if (circle.radius !== undefined) {
          return circle.intersects(this);
        }
        if (!rect.size) {
          return false;
        }
        const size2 = rect.size, w2 = size2.width, h2 = size2.height;
        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
      }
    }
    class Bouncer extends ExternalInteractorBase {
      constructor(container) {
        super(container);
      }
      isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv;
        return mouse.position && events.onHover.enable && isInArray("bounce", events.onHover.mode) || isDivModeEnabled("bounce", divs);
      }
      async interact() {
        const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && isInArray("bounce", hoverMode)) {
          this.processMouseBounce();
        } else {
          divModeExecute("bounce", divs, ((selector, div) => this.singleSelectorBounce(selector, div)));
        }
      }
      reset() {}
      processMouseBounce() {
        const container = this.container, pxRatio = container.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
        if (mousePos) {
          this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
        }
      }
      singleSelectorBounce(selector, div) {
        const container = this.container, query = document.querySelectorAll(selector);
        if (!query.length) {
          return;
        }
        query.forEach((item => {
          const elem = item, pxRatio = container.retina.pixelRatio, pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
          }, radius = elem.offsetWidth / 2 * pxRatio, tolerance = 10 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
          this.processBounce(pos, radius, area);
        }));
      }
      processBounce(position, radius, area) {
        const query = this.container.particles.quadTree.query(area);
        for (const particle of query) {
          if (area instanceof Circle) {
            circleBounce(circleBounceDataFromParticle(particle), {
              position: position,
              radius: radius,
              mass: radius ** 2 * Math.PI / 2,
              velocity: Vector_Vector.origin,
              factor: Vector_Vector.origin
            });
          } else if (area instanceof Rectangle) {
            rectBounce(particle, calculateBounds(position, radius));
          }
        }
      }
    }
    async function loadExternalBounceInteraction(engine) {
      await engine.addInteractor("externalBounce", (container => new Bouncer(container)));
    }
    return __webpack_exports__;
  }();
}));