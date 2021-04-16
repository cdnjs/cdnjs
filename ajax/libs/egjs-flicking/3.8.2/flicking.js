/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 3.8.2
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@egjs/component'), require('@egjs/imready'), require('@egjs/axes')) :
    typeof define === 'function' && define.amd ? define(['@egjs/component', '@egjs/imready', '@egjs/axes'], factory) :
    (global = global || self, (global.eg = global.eg || {}, global.eg.Flicking = factory(global.eg.Component, global.eg.ImReady, global.eg.Axes)));
}(this, (function (Component, ImReady, Axes) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    var MOVE_TYPE = {
      SNAP: "snap",
      FREE_SCROLL: "freeScroll"
    };
    var DEFAULT_MOVE_TYPE_OPTIONS = {
      snap: {
        type: "snap",
        count: 1
      },
      freeScroll: {
        type: "freeScroll"
      }
    };
    var isBrowser = typeof document !== "undefined";
    /**
     * Default options for creating Flicking.
     * @ko 플리킹을 만들 때 사용하는 기본 옵션들
     * @private
     * @memberof eg.Flicking
     */

    var DEFAULT_OPTIONS = {
      classPrefix: "eg-flick",
      deceleration: 0.0075,
      horizontal: true,
      circular: false,
      infinite: false,
      infiniteThreshold: 0,
      lastIndex: Infinity,
      threshold: 40,
      duration: 100,
      panelEffect: function (x) {
        return 1 - Math.pow(1 - x, 3);
      },
      defaultIndex: 0,
      inputType: ["touch", "mouse"],
      thresholdAngle: 45,
      bounce: 10,
      autoResize: false,
      adaptive: false,
      zIndex: 2000,
      bound: false,
      overflow: false,
      hanger: "50%",
      anchor: "50%",
      gap: 0,
      moveType: DEFAULT_MOVE_TYPE_OPTIONS.snap,
      useOffset: false,
      isEqualSize: false,
      isConstantSize: false,
      renderOnlyVisible: false,
      renderExternal: false,
      resizeOnContentsReady: false,
      iOSEdgeSwipeThreshold: 30,
      collectStatistics: true
    };
    var DEFAULT_VIEWPORT_CSS = {
      position: "relative",
      zIndex: DEFAULT_OPTIONS.zIndex,
      overflow: "hidden"
    };
    var DEFAULT_CAMERA_CSS = {
      width: "100%",
      height: "100%",
      willChange: "transform"
    };
    var DEFAULT_PANEL_CSS = {
      position: "absolute"
    };
    var EVENTS = {
      HOLD_START: "holdStart",
      HOLD_END: "holdEnd",
      MOVE_START: "moveStart",
      MOVE: "move",
      MOVE_END: "moveEnd",
      CHANGE: "change",
      RESTORE: "restore",
      SELECT: "select",
      NEED_PANEL: "needPanel",
      VISIBLE_CHANGE: "visibleChange",
      CONTENT_ERROR: "contentError"
    };
    var AXES_EVENTS = {
      HOLD: "hold",
      CHANGE: "change",
      RELEASE: "release",
      ANIMATION_END: "animationEnd",
      FINISH: "finish"
    };
    var STATE_TYPE = {
      IDLE: 0,
      HOLDING: 1,
      DRAGGING: 2,
      ANIMATING: 3,
      DISABLED: 4
    };
    var DIRECTION = {
      PREV: "PREV",
      NEXT: "NEXT"
    };
    var FLICKING_METHODS = {
      prev: true,
      next: true,
      moveTo: true,
      getIndex: true,
      getAllPanels: true,
      getCurrentPanel: true,
      getElement: true,
      getSize: true,
      getPanel: true,
      getPanelCount: true,
      getStatus: true,
      getVisiblePanels: true,
      enableInput: true,
      disableInput: true,
      destroy: true,
      resize: true,
      setStatus: true,
      isPlaying: true
    }; // Check whether browser supports transform: translate3d
    // https://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support

    var checkTranslateSupport = function () {
      var transforms = {
        webkitTransform: "-webkit-transform",
        msTransform: "-ms-transform",
        MozTransform: "-moz-transform",
        OTransform: "-o-transform",
        transform: "transform"
      };

      if (!isBrowser) {
        return {
          name: transforms.transform,
          has3d: true
        };
      }

      var supportedStyle = document.documentElement.style;
      var transformName = "";

      for (var prefixedTransform in transforms) {
        if (prefixedTransform in supportedStyle) {
          transformName = prefixedTransform;
        }
      }

      if (!transformName) {
        throw new Error("Browser doesn't support CSS3 2D Transforms.");
      }

      var el = document.createElement("div");
      document.documentElement.insertBefore(el, null);
      el.style[transformName] = "translate3d(1px, 1px, 1px)";
      var styleVal = window.getComputedStyle(el).getPropertyValue(transforms[transformName]);
      el.parentElement.removeChild(el);
      var transformInfo = {
        name: transformName,
        has3d: styleVal.length > 0 && styleVal !== "none"
      };

      checkTranslateSupport = function () {
        return transformInfo;
      };

      return transformInfo;
    };
    var TRANSFORM = checkTranslateSupport();

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    function merge(target) {
      var srcs = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        srcs[_i - 1] = arguments[_i];
      }

      srcs.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
          var value = source[key];
          target[key] = value;
        });
      });
      return target;
    }
    function parseElement(element) {
      if (!Array.isArray(element)) {
        element = [element];
      }

      var elements = [];
      element.forEach(function (el) {
        if (isString(el)) {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = el;
          elements.push.apply(elements, toArray(tempDiv.children));

          while (tempDiv.firstChild) {
            tempDiv.removeChild(tempDiv.firstChild);
          }
        } else {
          elements.push(el);
        }
      });
      return elements;
    }
    function isString(value) {
      return typeof value === "string";
    } // Get class list of element as string array

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        if (!hasClass(element, className)) {
          element.className = (element.className + " " + className).replace(/\s{2,}/g, " ");
        }
      }
    }
    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      } else {
        return element.className.split(" ").indexOf(className) >= 0;
      }
    }
    function applyCSS(element, cssObj) {
      Object.keys(cssObj).forEach(function (property) {
        element.style[property] = cssObj[property];
      });
    }
    function clamp(val, min, max) {
      return Math.max(Math.min(val, max), min);
    } // Min: inclusive, Max: exclusive

    function isBetween(val, min, max) {
      return val >= min && val <= max;
    }
    function toArray(iterable) {
      return [].slice.call(iterable);
    }
    function isArray(arr) {
      return arr && arr.constructor === Array;
    }
    function parseArithmeticExpression(cssValue, base, defaultVal) {
      // Set base / 2 to default value, if it's undefined
      var defaultValue = defaultVal != null ? defaultVal : base / 2;
      var cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

      if (typeof cssValue === "number") {
        return clamp(cssValue, 0, base);
      }

      var idx = 0;
      var calculatedValue = 0;
      var matchResult = cssRegex.exec(cssValue);

      while (matchResult != null) {
        var sign = matchResult[1];
        var value = matchResult[2];
        var unit = matchResult[3];
        var parsedValue = parseFloat(value);

        if (idx <= 0) {
          sign = sign || "+";
        } // Return default value for values not in good form


        if (!sign) {
          return defaultValue;
        }

        if (unit === "%") {
          parsedValue = parsedValue / 100 * base;
        }

        calculatedValue += sign === "+" ? parsedValue : -parsedValue; // Match next occurrence

        ++idx;
        matchResult = cssRegex.exec(cssValue);
      } // None-matched


      if (idx === 0) {
        return defaultValue;
      } // Clamp between 0 ~ base


      return clamp(calculatedValue, 0, base);
    }
    function getProgress(pos, range) {
      // start, anchor, end
      // -1 , 0 , 1
      var min = range[0],
          center = range[1],
          max = range[2];

      if (pos > center && max - center) {
        // 0 ~ 1
        return (pos - center) / (max - center);
      } else if (pos < center && center - min) {
        // -1 ~ 0
        return (pos - center) / (center - min);
      } else if (pos !== center && max - min) {
        return (pos - min) / (max - min);
      }

      return 0;
    }
    function findIndex(iterable, callback) {
      for (var i = 0; i < iterable.length; i += 1) {
        var element = iterable[i];

        if (element && callback(element)) {
          return i;
        }
      }

      return -1;
    } // return [0, 1, ...., max - 1]

    function counter(max) {
      var counterArray = [];

      for (var i = 0; i < max; i += 1) {
        counterArray[i] = i;
      }

      return counterArray;
    } // Circulate number between range [min, max]

    /*
     * "indexed" means min and max is not same, so if it's true "min - 1" should be max
     * While if it's false, "min - 1" should be "max - 1"
     * use `indexed: true` when it should be used for circulating integers like index
     * or `indexed: false` when it should be used for something like positions.
     */

    function circulate(value, min, max, indexed) {
      var size = indexed ? max - min + 1 : max - min;

      if (value < min) {
        var offset = indexed ? (min - value - 1) % size : (min - value) % size;
        value = max - offset;
      } else if (value > max) {
        var offset = indexed ? (value - max - 1) % size : (value - max) % size;
        value = min + offset;
      }

      return value;
    }
    function restoreStyle(element, originalStyle) {
      originalStyle.className ? element.setAttribute("class", originalStyle.className) : element.removeAttribute("class");
      originalStyle.style ? element.setAttribute("style", originalStyle.style) : element.removeAttribute("style");
    }
    /**
     * Decorator that makes the method of flicking available in the framework.
     * @ko 프레임워크에서 플리킹의 메소드를 사용할 수 있게 하는 데코레이터.
     * @memberof eg.Flicking
     * @private
     * @example
     * ```js
     * import Flicking, { withFlickingMethods } from "@egjs/flicking";
     *
     * class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
     *   &#64;withFlickingMethods
     *   private flicking: Flicking;
     * }
     * ```
     */

    function withFlickingMethods(prototype, flickingName) {
      Object.keys(FLICKING_METHODS).forEach(function (name) {
        if (prototype[name]) {
          return;
        }

        prototype[name] = function () {
          var _a;

          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          var result = (_a = this[flickingName])[name].apply(_a, args); // fix `this` type to return your own `flicking` instance to the instance using the decorator.


          if (result === this[flickingName]) {
            return this;
          } else {
            return result;
          }
        };
      });
    }
    function getBbox(element, useOffset) {
      var bbox;

      if (useOffset) {
        bbox = {
          x: 0,
          y: 0,
          width: element.offsetWidth,
          height: element.offsetHeight
        };
      } else {
        var clientRect = element.getBoundingClientRect();
        bbox = {
          x: clientRect.left,
          y: clientRect.top,
          width: clientRect.width,
          height: clientRect.height
        };
      }

      return bbox;
    }

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Panel =
    /*#__PURE__*/
    function () {
      function Panel(element, index, viewport) {
        this.viewport = viewport;
        this.prevSibling = null;
        this.nextSibling = null;
        this.clonedPanels = [];
        this.state = {
          index: index,
          position: 0,
          relativeAnchorPosition: 0,
          size: 0,
          isClone: false,
          isVirtual: false,
          cloneIndex: -1,
          originalStyle: {
            className: "",
            style: ""
          },
          cachedBbox: null
        };
        this.setElement(element);
      }

      var __proto = Panel.prototype;

      __proto.resize = function (givenBbox) {
        var state = this.state;
        var options = this.viewport.options;
        var bbox = givenBbox ? givenBbox : this.getBbox();
        this.state.cachedBbox = bbox;
        var prevSize = state.size;
        state.size = options.horizontal ? bbox.width : bbox.height;

        if (prevSize !== state.size) {
          state.relativeAnchorPosition = parseArithmeticExpression(options.anchor, state.size);
        }

        if (!state.isClone) {
          this.clonedPanels.forEach(function (panel) {
            var cloneState = panel.state;
            cloneState.size = state.size;
            cloneState.cachedBbox = state.cachedBbox;
            cloneState.relativeAnchorPosition = state.relativeAnchorPosition;
          });
        }
      };

      __proto.unCacheBbox = function () {
        this.state.cachedBbox = null;
      };

      __proto.getProgress = function () {
        var viewport = this.viewport;
        var options = viewport.options;
        var panelCount = viewport.panelManager.getPanelCount();
        var scrollAreaSize = viewport.getScrollAreaSize();
        var relativeIndex = (options.circular ? Math.floor(this.getPosition() / scrollAreaSize) * panelCount : 0) + this.getIndex();
        var progress = relativeIndex - viewport.getCurrentProgress();
        return progress;
      };

      __proto.getOutsetProgress = function () {
        var viewport = this.viewport;
        var outsetRange = [-this.getSize(), viewport.getRelativeHangerPosition() - this.getRelativeAnchorPosition(), viewport.getSize()];
        var relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
        var outsetProgress = getProgress(relativePanelPosition, outsetRange);
        return outsetProgress;
      };

      __proto.getVisibleRatio = function () {
        var viewport = this.viewport;
        var panelSize = this.getSize();
        var relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
        var rightRelativePanelPosition = relativePanelPosition + panelSize;
        var visibleSize = Math.min(viewport.getSize(), rightRelativePanelPosition) - Math.max(relativePanelPosition, 0);
        var visibleRatio = visibleSize >= 0 ? visibleSize / panelSize : 0;
        return visibleRatio;
      };

      __proto.focus = function (duration) {
        var viewport = this.viewport;
        var currentPanel = viewport.getCurrentPanel();
        var hangerPosition = viewport.getHangerPosition();
        var anchorPosition = this.getAnchorPosition();

        if (hangerPosition === anchorPosition || !currentPanel) {
          return;
        }

        var currentPosition = currentPanel.getPosition();
        var eventType = currentPosition === this.getPosition() ? "" : EVENTS.CHANGE;
        viewport.moveTo(this, viewport.findEstimatedPosition(this), eventType, null, duration);
      };

      __proto.update = function (updateFunction, shouldResize) {
        if (updateFunction === void 0) {
          updateFunction = null;
        }

        if (shouldResize === void 0) {
          shouldResize = true;
        }

        var identicalPanels = this.getIdenticalPanels();

        if (updateFunction) {
          identicalPanels.forEach(function (eachPanel) {
            updateFunction(eachPanel.getElement());
          });
        }

        if (shouldResize) {
          identicalPanels.forEach(function (eachPanel) {
            eachPanel.unCacheBbox();
          });
          this.viewport.addVisiblePanel(this);
          this.viewport.resize();
        }
      };

      __proto.prev = function () {
        var viewport = this.viewport;
        var options = viewport.options;
        var prevSibling = this.prevSibling;

        if (!prevSibling) {
          return null;
        }

        var currentIndex = this.getIndex();
        var currentPosition = this.getPosition();
        var prevPanelIndex = prevSibling.getIndex();
        var prevPanelPosition = prevSibling.getPosition();
        var prevPanelSize = prevSibling.getSize();
        var hasEmptyPanelBetween = currentIndex - prevPanelIndex > 1;
        var notYetMinPanel = options.infinite && currentIndex > 0 && prevPanelIndex > currentIndex;

        if (hasEmptyPanelBetween || notYetMinPanel) {
          // Empty panel exists between
          return null;
        }

        var newPosition = currentPosition - prevPanelSize - options.gap;
        var prevPanel = prevSibling;

        if (prevPanelPosition !== newPosition) {
          prevPanel = prevSibling.clone(prevSibling.getCloneIndex(), true);
          prevPanel.setPosition(newPosition);
        }

        return prevPanel;
      };

      __proto.next = function () {
        var viewport = this.viewport;
        var options = viewport.options;
        var nextSibling = this.nextSibling;
        var lastIndex = viewport.panelManager.getLastIndex();

        if (!nextSibling) {
          return null;
        }

        var currentIndex = this.getIndex();
        var currentPosition = this.getPosition();
        var nextPanelIndex = nextSibling.getIndex();
        var nextPanelPosition = nextSibling.getPosition();
        var hasEmptyPanelBetween = nextPanelIndex - currentIndex > 1;
        var notYetMaxPanel = options.infinite && currentIndex < lastIndex && nextPanelIndex < currentIndex;

        if (hasEmptyPanelBetween || notYetMaxPanel) {
          return null;
        }

        var newPosition = currentPosition + this.getSize() + options.gap;
        var nextPanel = nextSibling;

        if (nextPanelPosition !== newPosition) {
          nextPanel = nextSibling.clone(nextSibling.getCloneIndex(), true);
          nextPanel.setPosition(newPosition);
        }

        return nextPanel;
      };

      __proto.insertBefore = function (element) {
        var viewport = this.viewport;
        var parsedElements = parseElement(element);
        var firstPanel = viewport.panelManager.firstPanel();
        var prevSibling = this.prevSibling; // Finding correct inserting index
        // While it should insert removing empty spaces,
        // It also should have to be bigger than prevSibling' s index

        var targetIndex = prevSibling && firstPanel.getIndex() !== this.getIndex() ? Math.max(prevSibling.getIndex() + 1, this.getIndex() - parsedElements.length) : Math.max(this.getIndex() - parsedElements.length, 0);
        return viewport.insert(targetIndex, parsedElements);
      };

      __proto.insertAfter = function (element) {
        return this.viewport.insert(this.getIndex() + 1, element);
      };

      __proto.remove = function () {
        this.viewport.remove(this.getIndex());
        return this;
      };

      __proto.destroy = function (option) {
        if (!option.preserveUI) {
          var originalStyle = this.state.originalStyle;
          restoreStyle(this.element, originalStyle);
        } // release resources


        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.getElement = function () {
        return this.element;
      };

      __proto.getAnchorPosition = function () {
        return this.state.position + this.state.relativeAnchorPosition;
      };

      __proto.getRelativeAnchorPosition = function () {
        return this.state.relativeAnchorPosition;
      };

      __proto.getIndex = function () {
        return this.state.index;
      };

      __proto.getPosition = function () {
        return this.state.position;
      };

      __proto.getSize = function () {
        return this.state.size;
      };

      __proto.getBbox = function () {
        var state = this.state;
        var viewport = this.viewport;
        var element = this.element;
        var options = viewport.options;

        if (!element) {
          state.cachedBbox = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        } else if (!state.cachedBbox) {
          var wasVisible = Boolean(element.parentNode);
          var cameraElement = viewport.getCameraElement();

          if (!wasVisible) {
            cameraElement.appendChild(element);
            viewport.addVisiblePanel(this);
          }

          state.cachedBbox = getBbox(element, options.useOffset);

          if (!wasVisible && viewport.options.renderExternal) {
            cameraElement.removeChild(element);
          }
        }

        return state.cachedBbox;
      };

      __proto.isClone = function () {
        return this.state.isClone;
      };

      __proto.getOverlappedClass = function (classes) {
        var element = this.element;

        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
          var className = classes_1[_i];

          if (hasClass(element, className)) {
            return className;
          }
        }
      };

      __proto.getCloneIndex = function () {
        return this.state.cloneIndex;
      };

      __proto.getClonedPanels = function () {
        var state = this.state;
        return state.isClone ? this.original.getClonedPanels() : this.clonedPanels;
      };

      __proto.getIdenticalPanels = function () {
        var state = this.state;
        return state.isClone ? this.original.getIdenticalPanels() : __spreadArrays([this], this.clonedPanels);
      };

      __proto.getOriginalPanel = function () {
        return this.state.isClone ? this.original : this;
      };

      __proto.setIndex = function (index) {
        var state = this.state;
        state.index = index;
        this.clonedPanels.forEach(function (panel) {
          return panel.state.index = index;
        });
      };

      __proto.setPosition = function (pos) {
        this.state.position = pos;
        return this;
      };

      __proto.setPositionCSS = function (offset) {
        if (offset === void 0) {
          offset = 0;
        }

        if (!this.element) {
          return;
        }

        var state = this.state;
        var pos = state.position;
        var options = this.viewport.options;
        var elementStyle = this.element.style;
        var currentElementStyle = options.horizontal ? elementStyle.left : elementStyle.top;
        var styleToApply = pos - offset + "px";

        if (!state.isVirtual && currentElementStyle !== styleToApply) {
          options.horizontal ? elementStyle.left = styleToApply : elementStyle.top = styleToApply;
        }
      };

      __proto.clone = function (cloneIndex, isVirtual, element) {
        if (isVirtual === void 0) {
          isVirtual = false;
        }

        var state = this.state;
        var viewport = this.viewport;
        var cloneElement = element;

        if (!cloneElement && this.element) {
          cloneElement = isVirtual ? this.element : this.element.cloneNode(true);
        }

        var clonedPanel = new Panel(cloneElement, state.index, viewport);
        var clonedState = clonedPanel.state;
        clonedPanel.original = state.isClone ? this.original : this;
        clonedState.isClone = true;
        clonedState.isVirtual = isVirtual;
        clonedState.cloneIndex = cloneIndex; // Inherit some state values

        clonedState.size = state.size;
        clonedState.relativeAnchorPosition = state.relativeAnchorPosition;
        clonedState.originalStyle = state.originalStyle;
        clonedState.cachedBbox = state.cachedBbox;

        if (!isVirtual) {
          this.clonedPanels.push(clonedPanel);
        } else {
          clonedPanel.prevSibling = this.prevSibling;
          clonedPanel.nextSibling = this.nextSibling;
        }

        return clonedPanel;
      };

      __proto.removeElement = function () {
        if (!this.viewport.options.renderExternal) {
          var element = this.element;
          element.parentNode && element.parentNode.removeChild(element);
        } // Do the same thing for clones


        if (!this.state.isClone) {
          this.removeClonedPanelsAfter(0);
        }
      };

      __proto.removeClonedPanelsAfter = function (start) {
        var options = this.viewport.options;
        var removingPanels = this.clonedPanels.splice(start);

        if (!options.renderExternal) {
          removingPanels.forEach(function (panel) {
            panel.removeElement();
          });
        }
      };

      __proto.setElement = function (element) {
        if (!element) {
          return;
        }

        var currentElement = this.element;

        if (element !== currentElement) {
          var options = this.viewport.options;

          if (currentElement) {
            if (options.horizontal) {
              element.style.left = currentElement.style.left;
            } else {
              element.style.top = currentElement.style.top;
            }
          } else {
            var originalStyle = this.state.originalStyle;
            originalStyle.className = element.getAttribute("class");
            originalStyle.style = element.getAttribute("style");
          }

          this.element = element;

          if (options.classPrefix) {
            addClass(element, options.classPrefix + "-panel");
          } // Update size info after applying panel css


          applyCSS(this.element, DEFAULT_PANEL_CSS);
        }
      };

      return Panel;
    }();

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var PanelManager =
    /*#__PURE__*/
    function () {
      function PanelManager(cameraElement, options) {
        this.cameraElement = cameraElement;
        this.panels = [];
        this.clones = [];
        this.range = {
          min: -1,
          max: -1
        };
        this.length = 0;
        this.cloneCount = 0;
        this.options = options;
        this.lastIndex = options.lastIndex;
      }

      var __proto = PanelManager.prototype;

      __proto.firstPanel = function () {
        return this.panels[this.range.min];
      };

      __proto.lastPanel = function () {
        return this.panels[this.range.max];
      };

      __proto.allPanels = function () {
        return __spreadArrays(this.panels, this.clones.reduce(function (allClones, clones) {
          return __spreadArrays(allClones, clones);
        }, []));
      };

      __proto.originalPanels = function () {
        return this.panels;
      };

      __proto.clonedPanels = function () {
        return this.clones;
      };

      __proto.replacePanels = function (newPanels, newClones) {
        this.panels = newPanels;
        this.clones = newClones;
        this.range = {
          min: findIndex(newPanels, function (panel) {
            return Boolean(panel);
          }),
          max: newPanels.length - 1
        };
        this.length = newPanels.filter(function (panel) {
          return Boolean(panel);
        }).length;
      };

      __proto.has = function (index) {
        return !!this.panels[index];
      };

      __proto.get = function (index) {
        return this.panels[index];
      };

      __proto.getPanelCount = function () {
        return this.length;
      };

      __proto.getLastIndex = function () {
        return this.lastIndex;
      };

      __proto.getRange = function () {
        return this.range;
      };

      __proto.getCloneCount = function () {
        return this.cloneCount;
      };

      __proto.setLastIndex = function (lastIndex) {
        this.lastIndex = lastIndex;
        var firstPanel = this.firstPanel();
        var lastPanel = this.lastPanel();

        if (!firstPanel || !lastPanel) {
          return; // no meaning of updating range & length
        } // Remove panels above new last index


        var range = this.range;

        if (lastPanel.getIndex() > lastIndex) {
          var removingPanels = this.panels.splice(lastIndex + 1);
          this.length -= removingPanels.length;
          var firstRemovedPanel = removingPanels.filter(function (panel) {
            return !!panel;
          })[0];
          var possibleLastPanel = firstRemovedPanel.prevSibling;

          if (possibleLastPanel) {
            range.max = possibleLastPanel.getIndex();
          } else {
            range.min = -1;
            range.max = -1;
          }

          if (this.shouldRender()) {
            removingPanels.forEach(function (panel) {
              return panel.removeElement();
            });
          }
        }
      };

      __proto.setCloneCount = function (cloneCount) {
        this.cloneCount = cloneCount;
      }; // Insert at index
      // Returns pushed elements from index, inserting at 'empty' position doesn't push elements behind it


      __proto.insert = function (index, newPanels) {
        var panels = this.panels;
        var range = this.range;
        var isCircular = this.options.circular;
        var lastIndex = this.lastIndex; // Find first panel that index is greater than inserting index

        var nextSibling = this.findFirstPanelFrom(index); // if it's null, element will be inserted at last position
        // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax

        var firstPanel = this.firstPanel();
        var siblingElement = nextSibling ? nextSibling.getElement() : isCircular && firstPanel ? firstPanel.getClonedPanels()[0].getElement() : null; // Insert panels before sibling element

        this.insertNewPanels(newPanels, siblingElement);
        var pushedIndex = newPanels.length; // Like when setting index 50 while visible panels are 0, 1, 2

        if (index > range.max) {
          newPanels.forEach(function (panel, offset) {
            panels[index + offset] = panel;
          });
        } else {
          var panelsAfterIndex = panels.slice(index, index + newPanels.length); // Find empty from beginning

          var emptyPanelCount = findIndex(panelsAfterIndex, function (panel) {
            return !!panel;
          });

          if (emptyPanelCount < 0) {
            // All empty
            emptyPanelCount = panelsAfterIndex.length;
          }

          pushedIndex = newPanels.length - emptyPanelCount; // Insert removing empty panels

          panels.splice.apply(panels, __spreadArrays([index, emptyPanelCount], newPanels)); // Remove panels after last index

          if (panels.length > lastIndex + 1) {
            var removedPanels = panels.splice(lastIndex + 1).filter(function (panel) {
              return Boolean(panel);
            });
            this.length -= removedPanels.length; // Find first

            var newLastIndex = lastIndex - findIndex(this.panels.concat().reverse(), function (panel) {
              return !!panel;
            }); // Can be filled with empty after newLastIndex

            this.panels.splice(newLastIndex + 1);
            this.range.max = newLastIndex;

            if (this.shouldRender()) {
              removedPanels.forEach(function (panel) {
                return panel.removeElement();
              });
            }
          }
        } // Update index of previous panels


        if (pushedIndex > 0) {
          panels.slice(index + newPanels.length).forEach(function (panel) {
            panel.setIndex(panel.getIndex() + pushedIndex);
          });
        } // Update state


        this.length += newPanels.length;
        this.updateIndex(index);

        if (isCircular) {
          this.addNewClones(index, newPanels, newPanels.length - pushedIndex, nextSibling);
          var clones = this.clones;
          var panelCount_1 = this.panels.length;

          if (clones[0] && clones[0].length > lastIndex + 1) {
            clones.forEach(function (cloneSet) {
              cloneSet.splice(panelCount_1);
            });
          }
        }

        return pushedIndex;
      };

      __proto.replace = function (index, newPanels) {
        var panels = this.panels;
        var range = this.range;
        var options = this.options;
        var isCircular = options.circular; // Find first panel that index is greater than inserting index

        var nextSibling = this.findFirstPanelFrom(index + newPanels.length); // if it's null, element will be inserted at last position
        // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax

        var firstPanel = this.firstPanel();
        var siblingElement = nextSibling ? nextSibling.getElement() : isCircular && firstPanel ? firstPanel.getClonedPanels()[0].getElement() : null; // Insert panels before sibling element

        this.insertNewPanels(newPanels, siblingElement);

        if (index > range.max) {
          // Temporarily insert null at index to use splice()
          panels[index] = null;
        }

        var replacedPanels = panels.splice.apply(panels, __spreadArrays([index, newPanels.length], newPanels));
        var wasNonEmptyCount = replacedPanels.filter(function (panel) {
          return Boolean(panel);
        }).length; // Suppose inserting [1, 2, 3] at 0 position when there were [empty, 1]
        // So length should be increased by 3(inserting panels) - 1(non-empty panels)

        this.length += newPanels.length - wasNonEmptyCount;
        this.updateIndex(index);

        if (isCircular) {
          this.addNewClones(index, newPanels, newPanels.length, nextSibling);
        }

        if (this.shouldRender()) {
          replacedPanels.forEach(function (panel) {
            return panel && panel.removeElement();
          });
        }

        return replacedPanels;
      };

      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        var isCircular = this.options.circular;
        var panels = this.panels;
        var clones = this.clones; // Delete count should be equal or larger than 0

        deleteCount = Math.max(deleteCount, 0);
        var deletedPanels = panels.splice(index, deleteCount).filter(function (panel) {
          return !!panel;
        });

        if (this.shouldRender()) {
          deletedPanels.forEach(function (panel) {
            return panel.removeElement();
          });
        }

        if (isCircular) {
          clones.forEach(function (cloneSet) {
            cloneSet.splice(index, deleteCount);
          });
        } // Update indexes


        panels.slice(index).forEach(function (panel) {
          panel.setIndex(panel.getIndex() - deleteCount);
        }); // Check last panel is empty

        var lastIndex = panels.length - 1;

        if (!panels[lastIndex]) {
          var reversedPanels = panels.concat().reverse();
          var nonEmptyIndexFromLast = findIndex(reversedPanels, function (panel) {
            return !!panel;
          });
          lastIndex = nonEmptyIndexFromLast < 0 ? -1 // All empty
          : lastIndex - nonEmptyIndexFromLast; // Remove all empty panels from last

          panels.splice(lastIndex + 1);

          if (isCircular) {
            clones.forEach(function (cloneSet) {
              cloneSet.splice(lastIndex + 1);
            });
          }
        } // Update range & length


        this.range = {
          min: findIndex(panels, function (panel) {
            return !!panel;
          }),
          max: lastIndex
        };
        this.length -= deletedPanels.length;

        if (this.length <= 0) {
          // Reset clones
          this.clones = [];
          this.cloneCount = 0;
        }

        return deletedPanels;
      };

      __proto.chainAllPanels = function () {
        var allPanels = this.allPanels().filter(function (panel) {
          return !!panel;
        });
        var allPanelsCount = allPanels.length;

        if (allPanelsCount <= 1) {
          return;
        }

        allPanels.slice(1, allPanels.length - 1).forEach(function (panel, idx) {
          var prevPanel = allPanels[idx];
          var nextPanel = allPanels[idx + 2];
          panel.prevSibling = prevPanel;
          panel.nextSibling = nextPanel;
        });
        var firstPanel = allPanels[0];
        var lastPanel = allPanels[allPanelsCount - 1];
        firstPanel.prevSibling = null;
        firstPanel.nextSibling = allPanels[1];
        lastPanel.prevSibling = allPanels[allPanelsCount - 2];
        lastPanel.nextSibling = null;

        if (this.options.circular) {
          firstPanel.prevSibling = lastPanel;
          lastPanel.nextSibling = firstPanel;
        }
      };

      __proto.insertClones = function (cloneIndex, index, clonedPanels, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 0;
        }

        var clones = this.clones;
        var lastIndex = this.lastIndex;

        if (!clones[cloneIndex]) {
          var newClones_1 = [];
          clonedPanels.forEach(function (panel, offset) {
            newClones_1[index + offset] = panel;
          });
          clones[cloneIndex] = newClones_1;
        } else {
          var insertTarget_1 = clones[cloneIndex];

          if (index >= insertTarget_1.length) {
            clonedPanels.forEach(function (panel, offset) {
              insertTarget_1[index + offset] = panel;
            });
          } else {
            insertTarget_1.splice.apply(insertTarget_1, __spreadArrays([index, deleteCount], clonedPanels)); // Remove panels after last index

            if (clonedPanels.length > lastIndex + 1) {
              clonedPanels.splice(lastIndex + 1);
            }
          }
        }
      }; // clones are operating in set


      __proto.removeClonesAfter = function (cloneIndex) {
        var panels = this.panels;
        panels.forEach(function (panel) {
          panel.removeClonedPanelsAfter(cloneIndex);
        });
        this.clones.splice(cloneIndex);
      };

      __proto.findPanelOf = function (element) {
        var allPanels = this.allPanels();

        for (var _i = 0, allPanels_1 = allPanels; _i < allPanels_1.length; _i++) {
          var panel = allPanels_1[_i];

          if (!panel) {
            continue;
          }

          var panelElement = panel.getElement();

          if (panelElement.contains(element)) {
            return panel;
          }
        }
      };

      __proto.findFirstPanelFrom = function (index) {
        for (var _i = 0, _a = this.panels.slice(index); _i < _a.length; _i++) {
          var panel = _a[_i];

          if (panel && panel.getIndex() >= index && panel.getElement().parentNode) {
            return panel;
          }
        }
      };

      __proto.addNewClones = function (index, originalPanels, deleteCount, nextSibling) {
        var _this = this;

        var cameraElement = this.cameraElement;
        var cloneCount = this.getCloneCount();
        var lastPanel = this.lastPanel();
        var lastPanelClones = lastPanel ? lastPanel.getClonedPanels() : [];
        var nextSiblingClones = nextSibling ? nextSibling.getClonedPanels() : [];

        var _loop_1 = function (cloneIndex) {
          var cloneNextSibling = nextSiblingClones[cloneIndex];
          var lastPanelSibling = lastPanelClones[cloneIndex];
          var cloneSiblingElement = cloneNextSibling ? cloneNextSibling.getElement() : lastPanelSibling ? lastPanelSibling.getElement().nextElementSibling : null;
          var newClones = originalPanels.map(function (panel) {
            var clone = panel.clone(cloneIndex);

            if (_this.shouldRender()) {
              cameraElement.insertBefore(clone.getElement(), cloneSiblingElement);
            }

            return clone;
          });
          this_1.insertClones(cloneIndex, index, newClones, deleteCount);
        };

        var this_1 = this;

        for (var _i = 0, _a = counter(cloneCount); _i < _a.length; _i++) {
          var cloneIndex = _a[_i];

          _loop_1(cloneIndex);
        }
      };

      __proto.updateIndex = function (insertingIndex) {
        var panels = this.panels;
        var range = this.range;
        var newLastIndex = panels.length - 1;

        if (newLastIndex > range.max) {
          range.max = newLastIndex;
        }

        if (insertingIndex < range.min || range.min < 0) {
          range.min = insertingIndex;
        }
      };

      __proto.insertNewPanels = function (newPanels, siblingElement) {
        if (this.shouldRender()) {
          var fragment_1 = document.createDocumentFragment();
          newPanels.forEach(function (panel) {
            return fragment_1.appendChild(panel.getElement());
          });
          this.cameraElement.insertBefore(fragment_1, siblingElement);
        }
      };

      __proto.shouldRender = function () {
        var options = this.options;
        return !options.renderExternal && !options.renderOnlyVisible;
      };

      return PanelManager;
    }();

    var State =
    /*#__PURE__*/
    function () {
      function State() {
        this.delta = 0;
        this.direction = null;
        this.targetPanel = null;
        this.lastPosition = 0;
      }

      var __proto = State.prototype;

      __proto.onEnter = function (prevState) {
        this.delta = prevState.delta;
        this.direction = prevState.direction;
        this.targetPanel = prevState.targetPanel;
        this.lastPosition = prevState.lastPosition;
      };

      __proto.onExit = function (nextState) {// DO NOTHING
      };

      __proto.onHold = function (e, context) {// DO NOTHING
      };

      __proto.onChange = function (e, context) {// DO NOTHING
      };

      __proto.onRelease = function (e, context) {// DO NOTHING
      };

      __proto.onAnimationEnd = function (e, context) {// DO NOTHING
      };

      __proto.onFinish = function (e, context) {// DO NOTHING
      };

      return State;
    }();

    var IdleState =
    /*#__PURE__*/
    function (_super) {
      __extends(IdleState, _super);

      function IdleState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.IDLE;
        _this.holding = false;
        _this.playing = false;
        return _this;
      }

      var __proto = IdleState.prototype;

      __proto.onEnter = function () {
        this.direction = null;
        this.targetPanel = null;
        this.delta = 0;
        this.lastPosition = 0;
      };

      __proto.onHold = function (e, _a) {
        var flicking = _a.flicking,
            viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Shouldn't do any action until any panels on flicking area

        if (flicking.getPanelCount() <= 0) {
          if (viewport.options.infinite) {
            viewport.moveCamera(viewport.getCameraPosition(), e);
          }

          transitTo(STATE_TYPE.DISABLED);
          return;
        }

        this.lastPosition = viewport.getCameraPosition();
        triggerEvent(EVENTS.HOLD_START, e, true).onSuccess(function () {
          transitTo(STATE_TYPE.HOLDING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      }; // By methods call


      __proto.onChange = function (e, context) {
        var triggerEvent = context.triggerEvent,
            transitTo = context.transitTo;
        triggerEvent(EVENTS.MOVE_START, e, false).onSuccess(function () {
          // Trigger AnimatingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.ANIMATING).onChange(e, context);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      return IdleState;
    }(State);

    var HoldingState =
    /*#__PURE__*/
    function (_super) {
      __extends(HoldingState, _super);

      function HoldingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.HOLDING;
        _this.holding = true;
        _this.playing = true;
        _this.releaseEvent = null;
        return _this;
      }

      var __proto = HoldingState.prototype;

      __proto.onChange = function (e, context) {
        var flicking = context.flicking,
            triggerEvent = context.triggerEvent,
            transitTo = context.transitTo;
        var offset = flicking.options.horizontal ? e.inputEvent.offsetX : e.inputEvent.offsetY;
        this.direction = offset < 0 ? DIRECTION.NEXT : DIRECTION.PREV;
        triggerEvent(EVENTS.MOVE_START, e, true).onSuccess(function () {
          // Trigger DraggingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.DRAGGING).onChange(e, context);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onRelease = function (e, context) {
        var viewport = context.viewport,
            triggerEvent = context.triggerEvent,
            transitTo = context.transitTo;
        triggerEvent(EVENTS.HOLD_END, e, true);

        if (e.delta.flick !== 0) {
          // Sometimes "release" event on axes triggered before "change" event
          // Especially if user flicked panel fast in really short amount of time
          // if delta is not zero, that means above case happened.
          // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
          // At least one move event should be included between holdStart and holdEnd
          e.setTo({
            flick: viewport.getCameraPosition()
          }, 0);
          transitTo(STATE_TYPE.IDLE);
          return;
        }

        if (!e.inputEvent.srcEvent.cancelable) {
          // Released by scrolling
          return;
        } // Can't handle select event here,
        // As "finish" axes event happens


        this.releaseEvent = e;
      };

      __proto.onFinish = function (e, _a) {
        var viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Should transite to IDLE state before select event
        // As user expects hold is already finished

        transitTo(STATE_TYPE.IDLE);

        if (!this.releaseEvent) {
          return;
        } // Handle release event here
        // To prevent finish event called twice


        var releaseEvent = this.releaseEvent; // Static click

        var srcEvent = releaseEvent.inputEvent.srcEvent;
        var clickedElement;

        if (srcEvent.type === "touchend") {
          var touchEvent = srcEvent;
          var touch = touchEvent.changedTouches[0];
          clickedElement = document.elementFromPoint(touch.clientX, touch.clientY);
        } else {
          clickedElement = srcEvent.target;
        }

        var clickedPanel = viewport.panelManager.findPanelOf(clickedElement);
        var cameraPosition = viewport.getCameraPosition();

        if (clickedPanel) {
          var clickedPanelPosition = clickedPanel.getPosition();
          var direction = clickedPanelPosition > cameraPosition ? DIRECTION.NEXT : clickedPanelPosition < cameraPosition ? DIRECTION.PREV : null; // Don't provide axes event, to use axes instance instead

          triggerEvent(EVENTS.SELECT, releaseEvent, true, {
            direction: direction,
            index: clickedPanel.getIndex(),
            panel: clickedPanel,
            element: clickedElement
          });
        }
      };

      return HoldingState;
    }(State);

    var DraggingState =
    /*#__PURE__*/
    function (_super) {
      __extends(DraggingState, _super);

      function DraggingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.DRAGGING;
        _this.holding = true;
        _this.playing = true;
        return _this;
      }

      var __proto = DraggingState.prototype;

      __proto.onChange = function (e, _a) {
        var moveCamera = _a.moveCamera,
            transitTo = _a.transitTo;

        if (!e.delta.flick) {
          return;
        }

        moveCamera(e).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onRelease = function (e, context) {
        var flicking = context.flicking,
            viewport = context.viewport,
            triggerEvent = context.triggerEvent,
            transitTo = context.transitTo,
            stopCamera = context.stopCamera;
        var delta = this.delta;
        var absDelta = Math.abs(delta);
        var options = flicking.options;
        var horizontal = options.horizontal;
        var moveType = viewport.moveType;
        var inputEvent = e.inputEvent;
        var velocity = horizontal ? inputEvent.velocityX : inputEvent.velocityY;
        var inputDelta = horizontal ? inputEvent.deltaX : inputEvent.deltaY;
        var isNextDirection = Math.abs(velocity) > 1 ? velocity < 0 : absDelta > 0 ? delta > 0 : inputDelta < 0;
        var swipeDistance = viewport.options.bound ? Math.max(absDelta, Math.abs(inputDelta)) : absDelta;
        var swipeAngle = inputEvent.deltaX ? Math.abs(180 * Math.atan(inputEvent.deltaY / inputEvent.deltaX) / Math.PI) : 90;
        var belowAngleThreshold = horizontal ? swipeAngle <= options.thresholdAngle : swipeAngle > options.thresholdAngle;
        var overThreshold = swipeDistance >= options.threshold && belowAngleThreshold;
        var moveTypeContext = {
          viewport: viewport,
          axesEvent: e,
          state: this,
          swipeDistance: swipeDistance,
          isNextDirection: isNextDirection
        }; // Update last position to cope with Axes's animating behavior
        // Axes uses start position when animation start

        triggerEvent(EVENTS.HOLD_END, e, true);
        var targetPanel = this.targetPanel;

        if (!overThreshold && targetPanel) {
          // Interrupted while animating
          var interruptDestInfo = moveType.findPanelWhenInterrupted(moveTypeContext);
          viewport.moveTo(interruptDestInfo.panel, interruptDestInfo.destPos, interruptDestInfo.eventType, e, interruptDestInfo.duration);
          transitTo(STATE_TYPE.ANIMATING);
          return;
        }

        var currentPanel = viewport.getCurrentPanel();
        var nearestPanel = viewport.getNearestPanel();

        if (!currentPanel || !nearestPanel) {
          // There're no panels
          e.stop();
          transitTo(STATE_TYPE.IDLE);
          return;
        }

        var destInfo = overThreshold ? moveType.findTargetPanel(moveTypeContext) : moveType.findRestorePanel(moveTypeContext);
        viewport.moveTo(destInfo.panel, destInfo.destPos, destInfo.eventType, e, destInfo.duration).onSuccess(function () {
          transitTo(STATE_TYPE.ANIMATING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
          stopCamera(e);
        });
      };

      return DraggingState;
    }(State);

    var AnimatingState =
    /*#__PURE__*/
    function (_super) {
      __extends(AnimatingState, _super);

      function AnimatingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.ANIMATING;
        _this.holding = false;
        _this.playing = true;
        return _this;
      }

      var __proto = AnimatingState.prototype;

      __proto.onHold = function (e, _a) {
        var viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo;
        var options = viewport.options;
        var scrollArea = viewport.getScrollArea();
        var scrollAreaSize = viewport.getScrollAreaSize();
        var loopCount = Math.floor((this.lastPosition + this.delta - scrollArea.prev) / scrollAreaSize);
        var targetPanel = this.targetPanel;

        if (options.circular && loopCount !== 0 && targetPanel) {
          var cloneCount = viewport.panelManager.getCloneCount();
          var originalTargetPosition = targetPanel.getPosition(); // cloneIndex is from -1 to cloneCount - 1

          var newCloneIndex = circulate(targetPanel.getCloneIndex() - loopCount, -1, cloneCount - 1, true);
          var newTargetPosition = originalTargetPosition - loopCount * scrollAreaSize;
          var newTargetPanel = targetPanel.getIdenticalPanels()[newCloneIndex + 1].clone(newCloneIndex, true); // Set new target panel considering looped count

          newTargetPanel.setPosition(newTargetPosition);
          this.targetPanel = newTargetPanel;
        } // Reset last position and delta


        this.delta = 0;
        this.lastPosition = viewport.getCameraPosition(); // Update current panel as current nearest panel

        viewport.setCurrentPanel(viewport.getNearestPanel());
        triggerEvent(EVENTS.HOLD_START, e, true).onSuccess(function () {
          transitTo(STATE_TYPE.DRAGGING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onChange = function (e, _a) {
        var moveCamera = _a.moveCamera,
            transitTo = _a.transitTo;

        if (!e.delta.flick) {
          return;
        }

        moveCamera(e).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onFinish = function (e, _a) {
        var flicking = _a.flicking,
            viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo;
        var isTrusted = e && e.isTrusted;
        viewport.options.bound ? viewport.setCurrentPanel(this.targetPanel) : viewport.setCurrentPanel(viewport.getNearestPanel());

        if (flicking.options.adaptive) {
          viewport.updateAdaptiveSize();
        }

        transitTo(STATE_TYPE.IDLE);
        viewport.updateCameraPosition();
        triggerEvent(EVENTS.MOVE_END, e, isTrusted, {
          direction: this.direction
        });
      };

      return AnimatingState;
    }(State);

    var DisabledState =
    /*#__PURE__*/
    function (_super) {
      __extends(DisabledState, _super);

      function DisabledState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.DISABLED;
        _this.holding = false;
        _this.playing = true;
        return _this;
      }

      var __proto = DisabledState.prototype;

      __proto.onAnimationEnd = function (e, _a) {
        var transitTo = _a.transitTo;
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onChange = function (e, _a) {
        var viewport = _a.viewport,
            transitTo = _a.transitTo; // Can stop Axes's change event

        e.stop(); // Should update axes position as it's already changed at this moment

        viewport.updateAxesPosition(viewport.getCameraPosition());
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onRelease = function (e, _a) {
        var transitTo = _a.transitTo; // This is needed when stopped hold start event

        if (e.delta.flick === 0) {
          transitTo(STATE_TYPE.IDLE);
        }
      };

      return DisabledState;
    }(State);

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var StateMachine =
    /*#__PURE__*/
    function () {
      function StateMachine() {
        var _this = this;

        this.state = new IdleState();

        this.transitTo = function (nextStateType) {
          var currentState = _this.state;

          if (currentState.type !== nextStateType) {
            var nextState = void 0;

            switch (nextStateType) {
              case STATE_TYPE.IDLE:
                nextState = new IdleState();
                break;

              case STATE_TYPE.HOLDING:
                nextState = new HoldingState();
                break;

              case STATE_TYPE.DRAGGING:
                nextState = new DraggingState();
                break;

              case STATE_TYPE.ANIMATING:
                nextState = new AnimatingState();
                break;

              case STATE_TYPE.DISABLED:
                nextState = new DisabledState();
                break;
            }

            currentState.onExit(nextState);
            nextState.onEnter(currentState);
            _this.state = nextState;
          }

          return _this.state;
        };
      }

      var __proto = StateMachine.prototype;

      __proto.fire = function (eventType, e, context) {
        var currentState = this.state;

        switch (eventType) {
          case AXES_EVENTS.HOLD:
            currentState.onHold(e, context);
            break;

          case AXES_EVENTS.CHANGE:
            currentState.onChange(e, context);
            break;

          case AXES_EVENTS.RELEASE:
            currentState.onRelease(e, context);
            break;

          case AXES_EVENTS.ANIMATION_END:
            currentState.onAnimationEnd(e, context);
            break;

          case AXES_EVENTS.FINISH:
            currentState.onFinish(e, context);
            break;
        }
      };

      __proto.getState = function () {
        return this.state;
      };

      return StateMachine;
    }();

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var MoveType =
    /*#__PURE__*/
    function () {
      function MoveType() {}

      var __proto = MoveType.prototype;

      __proto.is = function (type) {
        return type === this.type;
      };

      __proto.findRestorePanel = function (ctx) {
        var viewport = ctx.viewport;
        var options = viewport.options;
        var panel = options.circular ? this.findRestorePanelInCircularMode(ctx) : viewport.getCurrentPanel();
        return {
          panel: panel,
          destPos: viewport.findEstimatedPosition(panel),
          duration: options.duration,
          eventType: EVENTS.RESTORE
        };
      };

      __proto.findPanelWhenInterrupted = function (ctx) {
        var state = ctx.state,
            viewport = ctx.viewport;
        var targetPanel = state.targetPanel;
        return {
          panel: targetPanel,
          destPos: viewport.findEstimatedPosition(targetPanel),
          duration: viewport.options.duration,
          eventType: ""
        };
      }; // Calculate minimum distance to "change" panel


      __proto.calcBrinkOfChange = function (ctx) {
        var viewport = ctx.viewport,
            isNextDirection = ctx.isNextDirection;
        var options = viewport.options;
        var currentPanel = viewport.getCurrentPanel();
        var halfGap = options.gap / 2;
        var relativeAnchorPosition = currentPanel.getRelativeAnchorPosition(); // Minimum distance needed to decide prev/next panel as nearest

        /*
         * |  Prev  |     Next     |
         * |--------|--------------|
         * [][      |<-Anchor    ][] <- Panel + Half-Gap
         */

        var minimumDistanceToChange = isNextDirection ? currentPanel.getSize() - relativeAnchorPosition + halfGap : relativeAnchorPosition + halfGap;
        minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);
        return minimumDistanceToChange;
      };

      __proto.findRestorePanelInCircularMode = function (ctx) {
        var viewport = ctx.viewport;
        var originalPanel = viewport.getCurrentPanel().getOriginalPanel();
        var hangerPosition = viewport.getHangerPosition();
        var firstClonedPanel = originalPanel.getIdenticalPanels()[1];
        var lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);
        return !ctx.isNextDirection && lapped ? firstClonedPanel : originalPanel;
      };

      return MoveType;
    }();

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Snap =
    /*#__PURE__*/
    function (_super) {
      __extends(Snap, _super);

      function Snap(count) {
        var _this = _super.call(this) || this;

        _this.type = MOVE_TYPE.SNAP;
        _this.count = count;
        return _this;
      }

      var __proto = Snap.prototype;

      __proto.findTargetPanel = function (ctx) {
        var viewport = ctx.viewport,
            axesEvent = ctx.axesEvent,
            swipeDistance = ctx.swipeDistance;
        var snapCount = this.count;
        var eventDelta = Math.abs(axesEvent.delta.flick);
        var currentPanel = viewport.getCurrentPanel();
        var nearestPanel = viewport.getNearestPanel();
        var minimumDistanceToChange = this.calcBrinkOfChange(ctx);
        var nearestIsCurrent = nearestPanel.getIndex() === currentPanel.getIndex(); // This can happen when bounce is 0

        var shouldMoveWhenBounceIs0 = viewport.canSetBoundMode() && nearestIsCurrent;
        var shouldMoveToAdjacent = !viewport.isOutOfBound() && (swipeDistance <= minimumDistanceToChange || shouldMoveWhenBounceIs0);

        if (snapCount > 1 && eventDelta > minimumDistanceToChange) {
          return this.findSnappedPanel(ctx);
        } else if (shouldMoveToAdjacent) {
          return this.findAdjacentPanel(ctx);
        } else {
          return {
            panel: nearestPanel,
            duration: viewport.options.duration,
            destPos: viewport.findEstimatedPosition(nearestPanel),
            // As swipeDistance holds mouse/touch position change regardless of bounce option value
            // swipDistance > minimumDistanceToChange can happen in bounce area
            // Second condition is for handling that.
            eventType: swipeDistance <= minimumDistanceToChange || viewport.isOutOfBound() && nearestIsCurrent ? EVENTS.RESTORE : EVENTS.CHANGE
          };
        }
      };

      __proto.findSnappedPanel = function (ctx) {
        var axesEvent = ctx.axesEvent,
            viewport = ctx.viewport,
            state = ctx.state,
            isNextDirection = ctx.isNextDirection;
        var eventDelta = Math.abs(axesEvent.delta.flick);
        var minimumDistanceToChange = this.calcBrinkOfChange(ctx);
        var snapCount = this.count;
        var options = viewport.options;
        var scrollAreaSize = viewport.getScrollAreaSize();
        var halfGap = options.gap / 2;
        var estimatedHangerPos = axesEvent.destPos.flick + viewport.getRelativeHangerPosition();
        var panelToMove = viewport.getNearestPanel();
        var cycleIndex = panelToMove.getCloneIndex() + 1; // 0(original) or 1(clone)

        var passedPanelCount = 0;

        while (passedPanelCount < snapCount) {
          // Since panelToMove holds also cloned panels, we should use original panel's position
          var originalPanel = panelToMove.getOriginalPanel();
          var panelPosition = originalPanel.getPosition() + cycleIndex * scrollAreaSize;
          var panelSize = originalPanel.getSize();
          var panelNextPosition = panelPosition + panelSize + halfGap;
          var panelPrevPosition = panelPosition - halfGap; // Current panelToMove contains destPos

          if (isNextDirection && panelNextPosition > estimatedHangerPos || !isNextDirection && panelPrevPosition < estimatedHangerPos) {
            break;
          }

          var siblingPanel = isNextDirection ? panelToMove.nextSibling : panelToMove.prevSibling;

          if (!siblingPanel) {
            break;
          }

          var panelIndex = panelToMove.getIndex();
          var siblingIndex = siblingPanel.getIndex();

          if (isNextDirection && siblingIndex <= panelIndex || !isNextDirection && siblingIndex >= panelIndex) {
            cycleIndex = isNextDirection ? cycleIndex + 1 : cycleIndex - 1;
          }

          panelToMove = siblingPanel;
          passedPanelCount += 1;
        }

        var originalPosition = panelToMove.getOriginalPanel().getPosition();

        if (cycleIndex !== 0) {
          panelToMove = panelToMove.clone(panelToMove.getCloneIndex(), true);
          panelToMove.setPosition(originalPosition + cycleIndex * scrollAreaSize);
        }

        var defaultDuration = viewport.options.duration;
        var duration = clamp(axesEvent.duration, defaultDuration, defaultDuration * passedPanelCount);
        return {
          panel: panelToMove,
          destPos: viewport.findEstimatedPosition(panelToMove),
          duration: duration,
          eventType: Math.max(eventDelta, state.delta) > minimumDistanceToChange ? EVENTS.CHANGE : EVENTS.RESTORE
        };
      };

      __proto.findAdjacentPanel = function (ctx) {
        var viewport = ctx.viewport,
            isNextDirection = ctx.isNextDirection;
        var options = viewport.options;
        var currentIndex = viewport.getCurrentIndex();
        var currentPanel = viewport.panelManager.get(currentIndex);
        var hangerPosition = viewport.getHangerPosition();
        var scrollArea = viewport.getScrollArea();
        var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
        var lapped = options.circular && Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition); // If lapped in circular mode, use first cloned panel as base panel

        var basePanel = lapped ? firstClonedPanel : currentPanel;
        var basePosition = basePanel.getPosition();
        var adjacentPanel = isNextDirection ? basePanel.nextSibling : basePanel.prevSibling;
        var eventType = adjacentPanel ? EVENTS.CHANGE : EVENTS.RESTORE;
        var panelToMove = adjacentPanel ? adjacentPanel : basePanel;
        var targetRelativeAnchorPosition = panelToMove.getRelativeAnchorPosition();
        var estimatedPanelPosition = options.circular ? isNextDirection ? basePosition + basePanel.getSize() + targetRelativeAnchorPosition + options.gap : basePosition - (panelToMove.getSize() - targetRelativeAnchorPosition) - options.gap : panelToMove.getAnchorPosition();
        var estimatedPosition = estimatedPanelPosition - viewport.getRelativeHangerPosition();
        var destPos = viewport.canSetBoundMode() ? clamp(estimatedPosition, scrollArea.prev, scrollArea.next) : estimatedPosition;
        return {
          panel: panelToMove,
          destPos: destPos,
          duration: options.duration,
          eventType: eventType
        };
      };

      return Snap;
    }(MoveType);

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var FreeScroll =
    /*#__PURE__*/
    function (_super) {
      __extends(FreeScroll, _super);

      function FreeScroll() {
        var _this = // Set snap count to Infinity
        _super.call(this, Infinity) || this;

        _this.type = MOVE_TYPE.FREE_SCROLL;
        return _this;
      }

      var __proto = FreeScroll.prototype;

      __proto.findTargetPanel = function (ctx) {
        var axesEvent = ctx.axesEvent,
            state = ctx.state,
            viewport = ctx.viewport;
        var destPos = axesEvent.destPos.flick;
        var minimumDistanceToChange = this.calcBrinkOfChange(ctx);
        var scrollArea = viewport.getScrollArea();
        var currentPanel = viewport.getCurrentPanel();
        var options = viewport.options;
        var delta = Math.abs(axesEvent.delta.flick + state.delta);

        if (delta > minimumDistanceToChange) {
          var destInfo = _super.prototype.findSnappedPanel.call(this, ctx);

          destInfo.duration = axesEvent.duration;
          destInfo.destPos = destPos;
          destInfo.eventType = !options.circular && destInfo.panel === currentPanel ? "" : EVENTS.CHANGE;
          return destInfo;
        } else {
          var estimatedPosition = options.circular ? circulate(destPos, scrollArea.prev, scrollArea.next, false) : destPos;
          estimatedPosition = clamp(estimatedPosition, scrollArea.prev, scrollArea.next);
          estimatedPosition += viewport.getRelativeHangerPosition();
          var estimatedPanel = viewport.findNearestPanelAt(estimatedPosition);
          return {
            panel: estimatedPanel,
            destPos: destPos,
            duration: axesEvent.duration,
            eventType: ""
          };
        }
      };

      __proto.findRestorePanel = function (ctx) {
        return this.findTargetPanel(ctx);
      };

      __proto.findPanelWhenInterrupted = function (ctx) {
        var viewport = ctx.viewport;
        return {
          panel: viewport.getNearestPanel(),
          destPos: viewport.getCameraPosition(),
          duration: 0,
          eventType: ""
        };
      };

      __proto.calcBrinkOfChange = function (ctx) {
        var viewport = ctx.viewport,
            isNextDirection = ctx.isNextDirection;
        var options = viewport.options;
        var currentPanel = viewport.getCurrentPanel();
        var halfGap = options.gap / 2;
        var lastPosition = viewport.stateMachine.getState().lastPosition;
        var currentPanelPosition = currentPanel.getPosition(); // As camera can stop anywhere in free scroll mode,
        // minimumDistanceToChange should be calculated differently.
        // Ref #191(https://github.com/naver/egjs-flicking/issues/191)

        var lastHangerPosition = lastPosition + viewport.getRelativeHangerPosition();
        var scrollAreaSize = viewport.getScrollAreaSize();
        var minimumDistanceToChange = isNextDirection ? currentPanelPosition + currentPanel.getSize() - lastHangerPosition + halfGap : lastHangerPosition - currentPanelPosition + halfGap;
        minimumDistanceToChange = Math.abs(minimumDistanceToChange % scrollAreaSize);
        return Math.min(minimumDistanceToChange, scrollAreaSize - minimumDistanceToChange);
      };

      return FreeScroll;
    }(Snap);

    var Viewport =
    /*#__PURE__*/
    function () {
      function Viewport(flicking, options, triggerEvent) {
        var _this = this;

        this.plugins = [];

        this.stopCamera = function (axesEvent) {
          if (axesEvent && axesEvent.setTo) {
            axesEvent.setTo({
              flick: _this.state.position
            }, 0);
          }

          _this.stateMachine.transitTo(STATE_TYPE.IDLE);
        };

        this.flicking = flicking;
        this.triggerEvent = triggerEvent;
        this.state = {
          size: 0,
          position: 0,
          panelMaintainRatio: 0,
          relativeHangerPosition: 0,
          positionOffset: 0,
          scrollArea: {
            prev: 0,
            next: 0
          },
          translate: TRANSFORM,
          infiniteThreshold: 0,
          checkedIndexes: [],
          isAdaptiveCached: false,
          isViewportGiven: false,
          isCameraGiven: false,
          originalViewportStyle: {
            className: null,
            style: null
          },
          originalCameraStyle: {
            className: null,
            style: null
          },
          cachedBbox: null
        };
        this.options = options;
        this.stateMachine = new StateMachine();
        this.visiblePanels = [];
        this.panelBboxes = {};
        this.build();
      }

      var __proto = Viewport.prototype;

      __proto.moveTo = function (panel, destPos, eventType, axesEvent, duration) {
        var _this = this;

        if (duration === void 0) {
          duration = this.options.duration;
        }

        var state = this.state;
        var currentState = this.stateMachine.getState();
        var currentPosition = state.position;
        var isTrusted = axesEvent ? axesEvent.isTrusted : false;
        var direction = destPos === currentPosition ? null : destPos > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;
        var eventResult;

        if (eventType === EVENTS.CHANGE) {
          eventResult = this.triggerEvent(EVENTS.CHANGE, axesEvent, isTrusted, {
            index: panel.getIndex(),
            panel: panel,
            direction: direction
          });
        } else if (eventType === EVENTS.RESTORE) {
          eventResult = this.triggerEvent(EVENTS.RESTORE, axesEvent, isTrusted);
        } else {
          eventResult = {
            onSuccess: function (callback) {
              callback();
              return this;
            },
            onStopped: function () {
              return this;
            }
          };
        }

        eventResult.onSuccess(function () {
          currentState.delta = 0;
          currentState.lastPosition = _this.getCameraPosition();
          currentState.targetPanel = panel;
          currentState.direction = destPos === currentPosition ? null : destPos > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;

          if (destPos === currentPosition) {
            // no move
            _this.nearestPanel = panel;
            _this.currentPanel = panel;
          }

          if (axesEvent && axesEvent.setTo) {
            // freeScroll only occurs in release events
            axesEvent.setTo({
              flick: destPos
            }, duration);
          } else {
            _this.axes.setTo({
              flick: destPos
            }, duration);
          }
        });
        return eventResult;
      };

      __proto.moveCamera = function (pos, axesEvent) {
        var state = this.state;
        var options = this.options;
        var transform = state.translate.name;
        var scrollArea = state.scrollArea; // Update position & nearestPanel

        if (options.circular && !isBetween(pos, scrollArea.prev, scrollArea.next)) {
          pos = circulate(pos, scrollArea.prev, scrollArea.next, false);
        }

        state.position = pos;
        this.nearestPanel = this.findNearestPanel();
        var nearestPanel = this.nearestPanel;
        var originalNearestPosition = nearestPanel ? nearestPanel.getPosition() : 0; // From 0(panel position) to 1(panel position + panel size)
        // When it's on gap area value will be (val > 1 || val < 0)

        if (nearestPanel) {
          var hangerPosition = this.getHangerPosition();
          var panelPosition = nearestPanel.getPosition();
          var panelSize = nearestPanel.getSize();
          var halfGap = options.gap / 2; // As panel's range is from panel position - half gap ~ panel pos + panel size + half gap

          state.panelMaintainRatio = (hangerPosition - panelPosition + halfGap) / (panelSize + 2 * halfGap);
        } else {
          state.panelMaintainRatio = 0;
        }

        this.checkNeedPanel(axesEvent); // Possibly modified after need panel, if it's looped

        var modifiedNearestPosition = nearestPanel ? nearestPanel.getPosition() : 0;
        pos += modifiedNearestPosition - originalNearestPosition;
        state.position = pos;
        this.updateVisiblePanels(); // Offset is needed to fix camera layer size in visible-only rendering mode

        var posOffset = options.renderOnlyVisible ? state.positionOffset : 0;
        var moveVector = options.horizontal ? [-(pos - posOffset), 0] : [0, -(pos - posOffset)];
        var moveCoord = moveVector.map(function (coord) {
          return Math.round(coord) + "px";
        }).join(", ");
        this.cameraElement.style[transform] = state.translate.has3d ? "translate3d(" + moveCoord + ", 0px)" : "translate(" + moveCoord + ")";
      };

      __proto.unCacheBbox = function () {
        var state = this.state;
        var options = this.options;
        state.cachedBbox = null;
        this.visiblePanels = [];
        var viewportElement = this.viewportElement;

        if (!options.horizontal) {
          // Don't preserve previous width for adaptive resizing
          viewportElement.style.width = "";
        } else {
          viewportElement.style.height = "";
        }

        state.isAdaptiveCached = false;
        this.panelBboxes = {};
      };

      __proto.resize = function () {
        this.updateSize();
        this.updateOriginalPanelPositions();
        this.updateAdaptiveSize();
        this.updateScrollArea();
        this.updateClonePanels();
        this.updateVisiblePanelPositions();
        this.updateCameraPosition();
        this.updatePlugins();
      }; // Find nearest anchor from current hanger position


      __proto.findNearestPanel = function () {
        var state = this.state;
        var panelManager = this.panelManager;
        var hangerPosition = this.getHangerPosition();

        if (this.isOutOfBound()) {
          var position = state.position;
          return position <= state.scrollArea.prev ? panelManager.firstPanel() : panelManager.lastPanel();
        }

        return this.findNearestPanelAt(hangerPosition);
      };

      __proto.findNearestPanelAt = function (position) {
        var panelManager = this.panelManager;
        var allPanels = panelManager.allPanels();
        var minimumDistance = Infinity;
        var nearestPanel;

        for (var _i = 0, allPanels_1 = allPanels; _i < allPanels_1.length; _i++) {
          var panel = allPanels_1[_i];

          if (!panel) {
            continue;
          }

          var prevPosition = panel.getPosition();
          var nextPosition = prevPosition + panel.getSize(); // Use shortest distance from panel's range

          var distance = isBetween(position, prevPosition, nextPosition) ? 0 : Math.min(Math.abs(prevPosition - position), Math.abs(nextPosition - position));

          if (distance > minimumDistance) {
            break;
          } else if (distance === minimumDistance) {
            var minimumAnchorDistance = Math.abs(position - nearestPanel.getAnchorPosition());
            var anchorDistance = Math.abs(position - panel.getAnchorPosition());

            if (anchorDistance > minimumAnchorDistance) {
              break;
            }
          }

          minimumDistance = distance;
          nearestPanel = panel;
        }

        return nearestPanel;
      };

      __proto.findNearestIdenticalPanel = function (panel) {
        var nearest = panel;
        var shortestDistance = Infinity;
        var hangerPosition = this.getHangerPosition();
        var identicals = panel.getIdenticalPanels();
        identicals.forEach(function (identical) {
          var anchorPosition = identical.getAnchorPosition();
          var distance = Math.abs(anchorPosition - hangerPosition);

          if (distance < shortestDistance) {
            nearest = identical;
            shortestDistance = distance;
          }
        });
        return nearest;
      }; // Find shortest camera position that distance is minimum


      __proto.findShortestPositionToPanel = function (panel) {
        var state = this.state;
        var options = this.options;
        var anchorPosition = panel.getAnchorPosition();
        var hangerPosition = this.getHangerPosition();
        var distance = Math.abs(hangerPosition - anchorPosition);
        var scrollAreaSize = state.scrollArea.next - state.scrollArea.prev;

        if (!options.circular) {
          var position = anchorPosition - state.relativeHangerPosition;
          return this.canSetBoundMode() ? clamp(position, state.scrollArea.prev, state.scrollArea.next) : position;
        } else {
          // If going out of viewport border is more efficient way of moving, choose that position
          return distance <= scrollAreaSize - distance ? anchorPosition - state.relativeHangerPosition : anchorPosition > hangerPosition // PREV TO NEXT
          ? anchorPosition - state.relativeHangerPosition - scrollAreaSize // NEXT TO PREV
          : anchorPosition - state.relativeHangerPosition + scrollAreaSize;
        }
      };

      __proto.findEstimatedPosition = function (panel) {
        var scrollArea = this.getScrollArea();
        var estimatedPosition = panel.getAnchorPosition() - this.getRelativeHangerPosition();
        estimatedPosition = this.canSetBoundMode() ? clamp(estimatedPosition, scrollArea.prev, scrollArea.next) : estimatedPosition;
        return estimatedPosition;
      };

      __proto.addVisiblePanel = function (panel) {
        if (this.getVisibleIndexOf(panel) < 0) {
          this.visiblePanels.push(panel);
        }
      };

      __proto.enable = function () {
        if (!this.panInput) {
          this.createPanInput();
        }
      };

      __proto.disable = function () {
        if (this.panInput) {
          this.panInput.destroy();
          this.panInput = null;
          this.stateMachine.transitTo(STATE_TYPE.IDLE);
        }
      };

      __proto.insert = function (index, element) {
        var _this = this;

        var lastIndex = this.panelManager.getLastIndex(); // Index should not below 0

        if (index < 0 || index > lastIndex) {
          return [];
        }

        var state = this.state;
        var options = this.options;
        var parsedElements = parseElement(element);
        var panels = parsedElements.map(function (el, idx) {
          return new Panel(el, index + idx, _this);
        }).slice(0, lastIndex - index + 1);

        if (panels.length <= 0) {
          return [];
        }

        var pushedIndex = this.panelManager.insert(index, panels); // ...then calc bbox for all panels

        this.resizePanels(panels);

        if (!this.currentPanel) {
          this.currentPanel = panels[0];
          this.nearestPanel = panels[0];
          var newCenterPanel = panels[0];
          var newPanelPosition = this.findEstimatedPosition(newCenterPanel);
          state.position = newPanelPosition;
          this.updateAxesPosition(newPanelPosition);
          state.panelMaintainRatio = (newCenterPanel.getRelativeAnchorPosition() + options.gap / 2) / (newCenterPanel.getSize() + options.gap);
        } // Update checked indexes in infinite mode


        this.updateCheckedIndexes({
          min: index,
          max: index
        });
        state.checkedIndexes.forEach(function (indexes, idx) {
          var min = indexes[0],
              max = indexes[1];

          if (index < min) {
            // Push checked index
            state.checkedIndexes.splice(idx, 1, [min + pushedIndex, max + pushedIndex]);
          }
        });
        this.resize();
        return panels;
      };

      __proto.replace = function (index, element) {
        var _this = this;

        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var lastIndex = panelManager.getLastIndex(); // Index should not below 0

        if (index < 0 || index > lastIndex) {
          return [];
        }

        var parsedElements = parseElement(element);
        var panels = parsedElements.map(function (el, idx) {
          return new Panel(el, index + idx, _this);
        }).slice(0, lastIndex - index + 1);

        if (panels.length <= 0) {
          return [];
        }

        var replacedPanels = panelManager.replace(index, panels);
        replacedPanels.forEach(function (panel) {
          var visibleIndex = _this.getVisibleIndexOf(panel);

          if (visibleIndex > -1) {
            _this.visiblePanels.splice(visibleIndex, 1);
          }
        }); // ...then calc bbox for all panels

        this.resizePanels(panels);
        var currentPanel = this.currentPanel;
        var wasEmpty = !currentPanel;

        if (wasEmpty) {
          this.currentPanel = panels[0];
          this.nearestPanel = panels[0];
          var newCenterPanel = panels[0];
          var newPanelPosition = this.findEstimatedPosition(newCenterPanel);
          state.position = newPanelPosition;
          this.updateAxesPosition(newPanelPosition);
          state.panelMaintainRatio = (newCenterPanel.getRelativeAnchorPosition() + options.gap / 2) / (newCenterPanel.getSize() + options.gap);
        } else if (isBetween(currentPanel.getIndex(), index, index + panels.length - 1)) {
          // Current panel is replaced
          this.currentPanel = panelManager.get(currentPanel.getIndex());
        } // Update checked indexes in infinite mode


        this.updateCheckedIndexes({
          min: index,
          max: index + panels.length - 1
        });
        this.resize();
        return panels;
      };

      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        var state = this.state; // Index should not below 0

        index = Math.max(index, 0);
        var panelManager = this.panelManager;
        var currentIndex = this.getCurrentIndex();
        var removedPanels = panelManager.remove(index, deleteCount);

        if (isBetween(currentIndex, index, index + deleteCount - 1)) {
          // Current panel is removed
          // Use panel at removing index - 1 as new current panel if it exists
          var newCurrentIndex = Math.max(index - 1, panelManager.getRange().min);
          this.currentPanel = panelManager.get(newCurrentIndex);
        } // Update checked indexes in infinite mode


        if (deleteCount > 0) {
          // Check whether removing index will affect checked indexes
          // Suppose index 0 is empty and removed index 1, then checked index 0 should be deleted and vice versa.
          this.updateCheckedIndexes({
            min: index - 1,
            max: index + deleteCount
          }); // Uncache visible panels to refresh panels

          this.visiblePanels = [];
        }

        if (panelManager.getPanelCount() <= 0) {
          this.currentPanel = undefined;
          this.nearestPanel = undefined;
        }

        this.resize();
        var scrollArea = state.scrollArea;

        if (state.position < scrollArea.prev || state.position > scrollArea.next) {
          var newPosition = circulate(state.position, scrollArea.prev, scrollArea.next, false);
          this.moveCamera(newPosition);
          this.updateAxesPosition(newPosition);
        }

        return removedPanels;
      };

      __proto.updateAdaptiveSize = function () {
        var state = this.state;
        var options = this.options;
        var horizontal = options.horizontal;
        var currentPanel = this.getCurrentPanel();

        if (!currentPanel) {
          return;
        }

        var shouldApplyAdaptive = options.adaptive || !state.isAdaptiveCached;
        var viewportStyle = this.viewportElement.style;

        if (shouldApplyAdaptive) {
          var sizeToApply = void 0;

          if (options.adaptive) {
            var panelBbox = currentPanel.getBbox();
            sizeToApply = horizontal ? panelBbox.height : panelBbox.width;
          } else {
            // Find minimum height of panels to maximum panel size
            var maximumPanelSize = this.panelManager.originalPanels().reduce(function (maximum, panel) {
              var panelBbox = panel.getBbox();
              return Math.max(maximum, horizontal ? panelBbox.height : panelBbox.width);
            }, 0);
            sizeToApply = maximumPanelSize;
          }

          if (!state.isAdaptiveCached) {
            var viewportBbox = this.updateBbox();
            sizeToApply = Math.max(sizeToApply, horizontal ? viewportBbox.height : viewportBbox.width);
            state.isAdaptiveCached = true;
          }

          var viewportSize = sizeToApply + "px";

          if (horizontal) {
            viewportStyle.height = viewportSize;
            state.cachedBbox.height = sizeToApply;
          } else {
            viewportStyle.width = viewportSize;
            state.cachedBbox.width = sizeToApply;
          }
        }
      }; // Update camera position after resizing


      __proto.updateCameraPosition = function () {
        var state = this.state;
        var currentPanel = this.getCurrentPanel();
        var cameraPosition = this.getCameraPosition();
        var currentState = this.stateMachine.getState();
        var isFreeScroll = this.moveType.is(MOVE_TYPE.FREE_SCROLL);
        var relativeHangerPosition = this.getRelativeHangerPosition();
        var halfGap = this.options.gap / 2;

        if (currentState.holding || currentState.playing) {
          this.updateVisiblePanels();
          return;
        }

        var newPosition;

        if (isFreeScroll) {
          var positionBounded = this.canSetBoundMode() && (cameraPosition === state.scrollArea.prev || cameraPosition === state.scrollArea.next);
          var nearestPanel = this.getNearestPanel(); // Preserve camera position if it is bound to scroll area limit

          newPosition = positionBounded || !nearestPanel ? cameraPosition : nearestPanel.getPosition() - halfGap + (nearestPanel.getSize() + 2 * halfGap) * state.panelMaintainRatio - relativeHangerPosition;
        } else {
          newPosition = currentPanel ? currentPanel.getAnchorPosition() - relativeHangerPosition : cameraPosition;
        }

        if (this.canSetBoundMode()) {
          newPosition = clamp(newPosition, state.scrollArea.prev, state.scrollArea.next);
        } // Pause & resume axes to prevent axes's "change" event triggered
        // This should be done before moveCamera, as moveCamera can trigger needPanel


        this.updateAxesPosition(newPosition);
        this.moveCamera(newPosition);
      };

      __proto.updateBbox = function () {
        var state = this.state;
        var options = this.options;
        var viewportElement = this.viewportElement;

        if (!state.cachedBbox) {
          state.cachedBbox = getBbox(viewportElement, options.useOffset);
        }

        return state.cachedBbox;
      };

      __proto.updatePlugins = function () {
        var _this = this; // update for resize


        this.plugins.forEach(function (plugin) {
          plugin.update && plugin.update(_this.flicking);
        });
      };

      __proto.destroy = function (option) {
        var _a;

        var state = this.state;
        var wrapper = this.flicking.getElement();
        var viewportElement = this.viewportElement;
        var cameraElement = this.cameraElement;
        var originalPanels = this.panelManager.originalPanels();
        this.removePlugins(this.plugins);

        if (!option.preserveUI) {
          restoreStyle(viewportElement, state.originalViewportStyle);
          restoreStyle(cameraElement, state.originalCameraStyle);

          if (!state.isCameraGiven && !this.options.renderExternal) {
            var topmostElement_1 = state.isViewportGiven ? viewportElement : wrapper;
            var deletingElement = state.isViewportGiven ? cameraElement : viewportElement;
            originalPanels.forEach(function (panel) {
              topmostElement_1.appendChild(panel.getElement());
            });
            topmostElement_1.removeChild(deletingElement);
          }
        }

        this.axes.destroy();
        (_a = this.panInput) === null || _a === void 0 ? void 0 : _a.destroy();
        originalPanels.forEach(function (panel) {
          panel.destroy(option);
        }); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.restore = function (status) {
        var panels = status.panels;
        var defaultIndex = this.options.defaultIndex;
        var cameraElement = this.cameraElement;
        var panelManager = this.panelManager; // Restore index

        cameraElement.innerHTML = panels.map(function (panel) {
          return panel.html;
        }).join(""); // Create panels first

        this.refreshPanels();
        var createdPanels = panelManager.originalPanels(); // ...then order it by its index

        var orderedPanels = [];
        panels.forEach(function (panel, idx) {
          var createdPanel = createdPanels[idx];
          createdPanel.setIndex(panel.index);
          createdPanel.setPosition(panel.position);
          orderedPanels[panel.index] = createdPanel;
        });
        panelManager.replacePanels(orderedPanels, []);
        panelManager.setCloneCount(0); // No clones at this point

        var panelCount = panelManager.getPanelCount();

        if (panelCount > 0) {
          this.currentPanel = panelManager.get(status.index) || panelManager.get(defaultIndex) || panelManager.firstPanel();
        } else {
          this.currentPanel = undefined;
        }

        this.visiblePanels = orderedPanels.filter(function (panel) {
          return Boolean(panel);
        });
        this.resize();
        this.axes.setTo({
          flick: status.position
        }, 0);
        this.moveCamera(status.position);
      };

      __proto.calcVisiblePanels = function () {
        var allPanels = this.panelManager.allPanels();

        if (this.options.renderOnlyVisible) {
          var cameraPos_1 = this.getCameraPosition();
          var viewportSize_1 = this.getSize();
          var basePanel = this.nearestPanel;

          var getNextPanel = function (panel) {
            var nextPanel = panel.nextSibling;

            if (nextPanel && nextPanel.getPosition() >= panel.getPosition()) {
              return nextPanel;
            } else {
              return null;
            }
          };

          var getPrevPanel = function (panel) {
            var prevPanel = panel.prevSibling;

            if (prevPanel && prevPanel.getPosition() <= panel.getPosition()) {
              return prevPanel;
            } else {
              return null;
            }
          };

          var isOutOfBoundNext = function (panel) {
            return panel.getPosition() >= cameraPos_1 + viewportSize_1;
          };

          var isOutOfBoundPrev = function (panel) {
            return panel.getPosition() + panel.getSize() <= cameraPos_1;
          };

          var getVisiblePanels = function (panel, getNext, isOutOfViewport) {
            var visiblePanels = [];
            var lastPanel = panel;

            while (true) {
              var nextPanel = getNext(lastPanel);

              if (!nextPanel || isOutOfViewport(nextPanel)) {
                break;
              }

              visiblePanels.push(nextPanel);
              lastPanel = nextPanel;
            }

            return visiblePanels;
          };

          var panelCount_1 = this.panelManager.getPanelCount();

          var getAbsIndex_1 = function (panel) {
            return panel.getIndex() + (panel.getCloneIndex() + 1) * panelCount_1;
          };

          var nextPanels = getVisiblePanels(basePanel, getNextPanel, isOutOfBoundNext);
          var prevPanels = getVisiblePanels(basePanel, getPrevPanel, isOutOfBoundPrev);
          return __spreadArrays([basePanel], nextPanels, prevPanels).sort(function (panel1, panel2) {
            return getAbsIndex_1(panel1) - getAbsIndex_1(panel2);
          });
        } else {
          return allPanels.filter(function (panel) {
            var outsetProgress = panel.getOutsetProgress();
            return outsetProgress > -1 && outsetProgress < 1;
          });
        }
      };

      __proto.getCurrentPanel = function () {
        return this.currentPanel;
      };

      __proto.getCurrentIndex = function () {
        var currentPanel = this.currentPanel;
        return currentPanel ? currentPanel.getIndex() : -1;
      };

      __proto.getNearestPanel = function () {
        return this.nearestPanel;
      }; // Get progress from nearest panel


      __proto.getCurrentProgress = function () {
        var currentState = this.stateMachine.getState();
        var nearestPanel = currentState.playing || currentState.holding ? this.nearestPanel : this.currentPanel;
        var panelManager = this.panelManager;

        if (!nearestPanel) {
          // There're no panels
          return NaN;
        }

        var _a = this.getScrollArea(),
            prevRange = _a.prev,
            nextRange = _a.next;

        var cameraPosition = this.getCameraPosition();
        var isOutOfBound = this.isOutOfBound();
        var prevPanel = nearestPanel.prevSibling;
        var nextPanel = nearestPanel.nextSibling;
        var hangerPosition = this.getHangerPosition();
        var nearestAnchorPos = nearestPanel.getAnchorPosition();

        if (isOutOfBound && prevPanel && nextPanel && cameraPosition < nextRange // On the basis of anchor, prevPanel is nearestPanel.
        && hangerPosition - prevPanel.getAnchorPosition() < nearestAnchorPos - hangerPosition) {
          nearestPanel = prevPanel;
          nextPanel = nearestPanel.nextSibling;
          prevPanel = nearestPanel.prevSibling;
          nearestAnchorPos = nearestPanel.getAnchorPosition();
        }

        var nearestIndex = nearestPanel.getIndex() + (nearestPanel.getCloneIndex() + 1) * panelManager.getPanelCount();
        var nearestSize = nearestPanel.getSize();

        if (isOutOfBound) {
          var relativeHangerPosition = this.getRelativeHangerPosition();

          if (nearestAnchorPos > nextRange + relativeHangerPosition) {
            // next bounce area: hangerPosition - relativeHangerPosition - nextRange
            hangerPosition = nearestAnchorPos + hangerPosition - relativeHangerPosition - nextRange;
          } else if (nearestAnchorPos < prevRange + relativeHangerPosition) {
            // prev bounce area: hangerPosition - relativeHangerPosition - prevRange
            hangerPosition = nearestAnchorPos + hangerPosition - relativeHangerPosition - prevRange;
          }
        }

        var hangerIsNextToNearestPanel = hangerPosition >= nearestAnchorPos;
        var gap = this.options.gap;
        var basePosition = nearestAnchorPos;
        var targetPosition = nearestAnchorPos;

        if (hangerIsNextToNearestPanel) {
          targetPosition = nextPanel ? nextPanel.getAnchorPosition() : nearestAnchorPos + nearestSize + gap;
        } else {
          basePosition = prevPanel ? prevPanel.getAnchorPosition() : nearestAnchorPos - nearestSize - gap;
        }

        var progressBetween = (hangerPosition - basePosition) / (targetPosition - basePosition);
        var startIndex = hangerIsNextToNearestPanel ? nearestIndex : prevPanel ? prevPanel.getIndex() : nearestIndex - 1;
        return startIndex + progressBetween;
      }; // Update axes flick position without triggering event


      __proto.updateAxesPosition = function (position) {
        var axes = this.axes;
        axes.off();
        axes.setTo({
          flick: position
        }, 0);
        axes.on(this.axesHandlers);
      };

      __proto.getSize = function () {
        return this.state.size;
      };

      __proto.getScrollArea = function () {
        return this.state.scrollArea;
      };

      __proto.isOutOfBound = function () {
        var state = this.state;
        var options = this.options;
        var scrollArea = state.scrollArea;
        return !options.circular && options.bound && (state.position <= scrollArea.prev || state.position >= scrollArea.next);
      };

      __proto.canSetBoundMode = function () {
        var options = this.options;
        return options.bound && !options.circular;
      };

      __proto.getViewportElement = function () {
        return this.viewportElement;
      };

      __proto.getCameraElement = function () {
        return this.cameraElement;
      };

      __proto.getScrollAreaSize = function () {
        var scrollArea = this.state.scrollArea;
        return scrollArea.next - scrollArea.prev;
      };

      __proto.getRelativeHangerPosition = function () {
        return this.state.relativeHangerPosition;
      };

      __proto.getHangerPosition = function () {
        return this.state.position + this.state.relativeHangerPosition;
      };

      __proto.getCameraPosition = function () {
        return this.state.position;
      };

      __proto.getPositionOffset = function () {
        return this.state.positionOffset;
      };

      __proto.getCheckedIndexes = function () {
        return this.state.checkedIndexes;
      };

      __proto.getVisiblePanels = function () {
        return this.visiblePanels;
      };

      __proto.setCurrentPanel = function (panel) {
        this.currentPanel = panel;
      };

      __proto.setLastIndex = function (index) {
        var currentPanel = this.currentPanel;
        var panelManager = this.panelManager;
        panelManager.setLastIndex(index);

        if (currentPanel && currentPanel.getIndex() > index) {
          this.currentPanel = panelManager.lastPanel();
        }

        this.resize();
      };

      __proto.setVisiblePanels = function (panels) {
        this.visiblePanels = panels;
      };

      __proto.connectAxesHandler = function (handlers) {
        var axes = this.axes;
        this.axesHandlers = handlers;
        axes.on(handlers);
      };

      __proto.addPlugins = function (plugins) {
        var _this = this;

        var newPlugins = [].concat(plugins);
        newPlugins.forEach(function (plugin) {
          plugin.init(_this.flicking);
        });
        this.plugins = this.plugins.concat(newPlugins);
        return this;
      };

      __proto.removePlugins = function (plugins) {
        var _this = this;

        var currentPlugins = this.plugins;
        var removedPlugins = [].concat(plugins);
        removedPlugins.forEach(function (plugin) {
          var index = currentPlugins.indexOf(plugin);

          if (index > -1) {
            currentPlugins.splice(index, 1);
          }

          plugin.destroy(_this.flicking);
        });
        return this;
      };

      __proto.updateCheckedIndexes = function (changedRange) {
        var state = this.state;
        var removed = 0;
        state.checkedIndexes.concat().forEach(function (indexes, idx) {
          var min = indexes[0],
              max = indexes[1]; // Can fill part of indexes in range

          if (changedRange.min <= max && changedRange.max >= min) {
            // Remove checked index from list
            state.checkedIndexes.splice(idx - removed, 1);
            removed++;
          }
        });
      };

      __proto.appendUncachedPanelElements = function (panels) {
        var _this = this;

        var options = this.options;
        var fragment = document.createDocumentFragment();

        if (options.isEqualSize) {
          var prevVisiblePanels = this.visiblePanels;
          var equalSizeClasses_1 = options.isEqualSize; // for readability

          var cached_1 = {};
          this.visiblePanels = [];
          Object.keys(this.panelBboxes).forEach(function (className) {
            cached_1[className] = true;
          });
          panels.forEach(function (panel) {
            var overlappedClass = panel.getOverlappedClass(equalSizeClasses_1);

            if (overlappedClass && !cached_1[overlappedClass]) {
              if (!options.renderExternal) {
                fragment.appendChild(panel.getElement());
              }

              _this.visiblePanels.push(panel);

              cached_1[overlappedClass] = true;
            } else if (!overlappedClass) {
              if (!options.renderExternal) {
                fragment.appendChild(panel.getElement());
              }

              _this.visiblePanels.push(panel);
            }
          });
          prevVisiblePanels.forEach(function (panel) {
            _this.addVisiblePanel(panel);
          });
        } else {
          if (!options.renderExternal) {
            panels.forEach(function (panel) {
              return fragment.appendChild(panel.getElement());
            });
          }

          this.visiblePanels = panels.filter(function (panel) {
            return Boolean(panel);
          });
        }

        if (!options.renderExternal) {
          this.cameraElement.appendChild(fragment);
        }
      };

      __proto.updateClonePanels = function () {
        var panelManager = this.panelManager; // Clone panels in circular mode

        if (this.options.circular && panelManager.getPanelCount() > 0) {
          this.clonePanels();
          this.updateClonedPanelPositions();
        }

        panelManager.chainAllPanels();
      };

      __proto.getVisibleIndexOf = function (panel) {
        return findIndex(this.visiblePanels, function (visiblePanel) {
          return visiblePanel === panel;
        });
      };

      __proto.build = function () {
        this.setElements();
        this.applyCSSValue();
        this.setMoveType();
        this.setAxesInstance();
        this.refreshPanels();
        this.setDefaultPanel();
        this.resize();
        this.moveToDefaultPanel();
      };

      __proto.setElements = function () {
        var state = this.state;
        var options = this.options;
        var wrapper = this.flicking.getElement();
        var classPrefix = options.classPrefix;
        var viewportCandidate = wrapper.children[0];
        var hasViewportElement = viewportCandidate && hasClass(viewportCandidate, classPrefix + "-viewport");
        var viewportElement = hasViewportElement ? viewportCandidate : document.createElement("div");
        var cameraCandidate = hasViewportElement ? viewportElement.children[0] : wrapper.children[0];
        var hasCameraElement = cameraCandidate && hasClass(cameraCandidate, classPrefix + "-camera");
        var cameraElement = hasCameraElement ? cameraCandidate : document.createElement("div");

        if (!hasCameraElement) {
          cameraElement.className = classPrefix + "-camera";
          var panelElements = hasViewportElement ? viewportElement.children : wrapper.children; // Make all panels to be a child of camera element
          // wrapper <- viewport <- camera <- panels[1...n]

          toArray(panelElements).forEach(function (child) {
            cameraElement.appendChild(child);
          });
        } else {
          state.originalCameraStyle = {
            className: cameraElement.getAttribute("class"),
            style: cameraElement.getAttribute("style")
          };
        }

        if (!hasViewportElement) {
          viewportElement.className = classPrefix + "-viewport"; // Add viewport element to wrapper

          wrapper.appendChild(viewportElement);
        } else {
          state.originalViewportStyle = {
            className: viewportElement.getAttribute("class"),
            style: viewportElement.getAttribute("style")
          };
        }

        if (!hasCameraElement || !hasViewportElement) {
          viewportElement.appendChild(cameraElement);
        }

        this.viewportElement = viewportElement;
        this.cameraElement = cameraElement;
        state.isViewportGiven = hasViewportElement;
        state.isCameraGiven = hasCameraElement;
      };

      __proto.applyCSSValue = function () {
        var options = this.options;
        var viewportElement = this.viewportElement;
        var cameraElement = this.cameraElement;
        var viewportStyle = this.viewportElement.style; // Set default css values for each element

        applyCSS(viewportElement, DEFAULT_VIEWPORT_CSS);
        applyCSS(cameraElement, DEFAULT_CAMERA_CSS);
        viewportElement.style.zIndex = "" + options.zIndex;

        if (options.horizontal) {
          viewportStyle.minHeight = "100%";
          viewportStyle.width = "100%";
        } else {
          viewportStyle.minWidth = "100%";
          viewportStyle.height = "100%";
        }

        if (options.overflow) {
          viewportStyle.overflow = "visible";
        }

        this.panelManager = new PanelManager(this.cameraElement, options);
      };

      __proto.setMoveType = function () {
        var moveType = this.options.moveType;

        switch (moveType.type) {
          case MOVE_TYPE.SNAP:
            this.moveType = new Snap(moveType.count);
            break;

          case MOVE_TYPE.FREE_SCROLL:
            this.moveType = new FreeScroll();
            break;

          default:
            throw new Error("moveType is not correct!");
        }
      };

      __proto.setAxesInstance = function () {
        var state = this.state;
        var options = this.options;
        var scrollArea = state.scrollArea;
        this.axes = new Axes({
          flick: {
            range: [scrollArea.prev, scrollArea.next],
            circular: options.circular,
            bounce: [0, 0]
          }
        }, {
          easing: options.panelEffect,
          deceleration: options.deceleration,
          interruptable: true
        });
        this.createPanInput();
      };

      __proto.refreshPanels = function () {
        var _this = this;

        var panelManager = this.panelManager; // Panel elements were attached to camera element by Flicking class

        var panelElements = this.cameraElement.children; // Initialize panels

        var panels = toArray(panelElements).map(function (el, idx) {
          return new Panel(el, idx, _this);
        });
        panelManager.replacePanels(panels, []);
        this.visiblePanels = panels.filter(function (panel) {
          return Boolean(panel);
        });
      };

      __proto.setDefaultPanel = function () {
        var options = this.options;
        var panelManager = this.panelManager;
        var indexRange = this.panelManager.getRange();
        var index = clamp(options.defaultIndex, indexRange.min, indexRange.max);
        this.currentPanel = panelManager.get(index);
      };

      __proto.clonePanels = function () {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var gap = options.gap;
        var viewportSize = state.size;
        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel(); // There're no panels exist

        if (!firstPanel) {
          return;
        } // For each panels, clone itself while last panel's position + size is below viewport size


        var panels = panelManager.originalPanels();
        var reversedPanels = panels.concat().reverse();
        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + gap;
        var relativeAnchorPosition = firstPanel.getRelativeAnchorPosition();
        var relativeHangerPosition = this.getRelativeHangerPosition();
        var areaPrev = (relativeHangerPosition - relativeAnchorPosition) % sumOriginalPanelSize;
        var sizeSum = 0;
        var panelAtLeftBoundary;

        for (var _i = 0, reversedPanels_1 = reversedPanels; _i < reversedPanels_1.length; _i++) {
          var panel = reversedPanels_1[_i];

          if (!panel) {
            continue;
          }

          sizeSum += panel.getSize() + gap;

          if (sizeSum >= areaPrev) {
            panelAtLeftBoundary = panel;
            break;
          }
        }

        var areaNext = (viewportSize - relativeHangerPosition + relativeAnchorPosition) % sumOriginalPanelSize;
        sizeSum = 0;
        var panelAtRightBoundary;

        for (var _a = 0, panels_1 = panels; _a < panels_1.length; _a++) {
          var panel = panels_1[_a];

          if (!panel) {
            continue;
          }

          sizeSum += panel.getSize() + gap;

          if (sizeSum >= areaNext) {
            panelAtRightBoundary = panel;
            break;
          }
        } // Need one more set of clones on prev area of original panel 0


        var needCloneOnPrev = panelAtLeftBoundary.getIndex() !== 0 && panelAtLeftBoundary.getIndex() <= panelAtRightBoundary.getIndex(); // Visible count of panel 0 on first screen

        var panel0OnFirstscreen = Math.ceil((relativeHangerPosition + firstPanel.getSize() - relativeAnchorPosition) / sumOriginalPanelSize) + Math.ceil((viewportSize - relativeHangerPosition + relativeAnchorPosition) / sumOriginalPanelSize) - 1; // duplication

        var cloneCount = panel0OnFirstscreen + (needCloneOnPrev ? 1 : 0);
        var prevCloneCount = panelManager.getCloneCount();
        panelManager.setCloneCount(cloneCount);

        if (options.renderExternal) {
          return;
        }

        if (cloneCount > prevCloneCount) {
          var _loop_1 = function (cloneIndex) {
            var _a;

            var clones = panels.map(function (origPanel) {
              return origPanel.clone(cloneIndex);
            });
            var fragment = document.createDocumentFragment();
            clones.forEach(function (panel) {
              return fragment.appendChild(panel.getElement());
            });
            this_1.cameraElement.appendChild(fragment);

            (_a = this_1.visiblePanels).push.apply(_a, clones.filter(function (clone) {
              return Boolean(clone);
            }));

            panelManager.insertClones(cloneIndex, 0, clones);
          };

          var this_1 = this; // should clone more

          for (var cloneIndex = prevCloneCount; cloneIndex < cloneCount; cloneIndex++) {
            _loop_1(cloneIndex);
          }
        } else if (cloneCount < prevCloneCount) {
          // should remove some
          panelManager.removeClonesAfter(cloneCount);
        }
      };

      __proto.moveToDefaultPanel = function () {
        var state = this.state;
        var panelManager = this.panelManager;
        var options = this.options;
        var indexRange = this.panelManager.getRange();
        var defaultIndex = clamp(options.defaultIndex, indexRange.min, indexRange.max);
        var defaultPanel = panelManager.get(defaultIndex);
        var defaultPosition = 0;

        if (defaultPanel) {
          defaultPosition = defaultPanel.getAnchorPosition() - state.relativeHangerPosition;
          defaultPosition = this.canSetBoundMode() ? clamp(defaultPosition, state.scrollArea.prev, state.scrollArea.next) : defaultPosition;
        }

        this.moveCamera(defaultPosition);
        this.axes.setTo({
          flick: defaultPosition
        }, 0);
      };

      __proto.updateSize = function () {
        var state = this.state;
        var options = this.options;
        var panels = this.panelManager.originalPanels().filter(function (panel) {
          return Boolean(panel);
        });
        var bbox = this.updateBbox();
        var prevSize = state.size; // Update size & hanger position

        state.size = options.horizontal ? bbox.width : bbox.height;

        if (prevSize !== state.size) {
          state.relativeHangerPosition = parseArithmeticExpression(options.hanger, state.size);
          state.infiniteThreshold = parseArithmeticExpression(options.infiniteThreshold, state.size);
        }

        if (panels.length <= 0) {
          return;
        }

        this.resizePanels(panels);
      };

      __proto.updateOriginalPanelPositions = function () {
        var gap = this.options.gap;
        var panelManager = this.panelManager;
        var firstPanel = panelManager.firstPanel();
        var panels = panelManager.originalPanels();

        if (!firstPanel) {
          return;
        }

        var currentPanel = this.currentPanel;
        var nearestPanel = this.nearestPanel;
        var currentState = this.stateMachine.getState();
        var scrollArea = this.state.scrollArea; // Update panel position && fit to wrapper

        var nextPanelPos = firstPanel.getPosition();
        var maintainingPanel = firstPanel;

        if (nearestPanel) {
          // We should maintain nearestPanel's position
          var looped = !isBetween(currentState.lastPosition + currentState.delta, scrollArea.prev, scrollArea.next);
          maintainingPanel = looped ? currentPanel : nearestPanel;
        } else if (firstPanel.getIndex() > 0) {
          maintainingPanel = currentPanel;
        }

        var panelsBeforeMaintainPanel = panels.slice(0, maintainingPanel.getIndex() + (maintainingPanel.getCloneIndex() + 1) * panels.length);
        var accumulatedSize = panelsBeforeMaintainPanel.reduce(function (total, panel) {
          return total + panel.getSize() + gap;
        }, 0);
        nextPanelPos = maintainingPanel.getPosition() - accumulatedSize;
        panels.forEach(function (panel) {
          var newPosition = nextPanelPos;
          var panelSize = panel.getSize();
          panel.setPosition(newPosition);
          nextPanelPos += panelSize + gap;
        });

        if (!this.options.renderOnlyVisible) {
          panels.forEach(function (panel) {
            return panel.setPositionCSS();
          });
        }
      };

      __proto.updateClonedPanelPositions = function () {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var clonedPanels = panelManager.clonedPanels().reduce(function (allClones, clones) {
          return __spreadArrays(allClones, clones);
        }, []).filter(function (panel) {
          return Boolean(panel);
        });
        var scrollArea = state.scrollArea;
        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel();

        if (!firstPanel) {
          return;
        }

        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + options.gap; // Locate all cloned panels linearly first

        for (var _i = 0, clonedPanels_1 = clonedPanels; _i < clonedPanels_1.length; _i++) {
          var panel = clonedPanels_1[_i];
          var origPanel = panel.getOriginalPanel();
          var cloneIndex = panel.getCloneIndex();
          var cloneBasePos = sumOriginalPanelSize * (cloneIndex + 1);
          var clonedPanelPos = cloneBasePos + origPanel.getPosition();
          panel.setPosition(clonedPanelPos);
        }

        var lastReplacePosition = firstPanel.getPosition(); // reverse() pollutes original array, so copy it with concat()

        for (var _a = 0, _b = clonedPanels.concat().reverse(); _a < _b.length; _a++) {
          var panel = _b[_a];
          var panelSize = panel.getSize();
          var replacePosition = lastReplacePosition - panelSize - options.gap;

          if (replacePosition + panelSize <= scrollArea.prev) {
            // Replace is not meaningful, as it won't be seen in current scroll area
            break;
          }

          panel.setPosition(replacePosition);
          lastReplacePosition = replacePosition;
        }

        if (!this.options.renderOnlyVisible) {
          clonedPanels.forEach(function (panel) {
            panel.setPositionCSS();
          });
        }
      };

      __proto.updateVisiblePanelPositions = function () {
        var _this = this;

        if (this.options.renderOnlyVisible) {
          this.visiblePanels.forEach(function (panel) {
            panel.setPositionCSS(_this.state.positionOffset);
          });
        }
      };

      __proto.updateScrollArea = function () {
        var state = this.state;
        var panelManager = this.panelManager;
        var options = this.options;
        var axes = this.axes; // Set viewport scrollable area

        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel();
        var relativeHangerPosition = state.relativeHangerPosition;

        if (!firstPanel) {
          state.scrollArea = {
            prev: 0,
            next: 0
          };
        } else if (this.canSetBoundMode()) {
          var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition();

          if (sumOriginalPanelSize >= state.size) {
            state.scrollArea = {
              prev: firstPanel.getPosition(),
              next: lastPanel.getPosition() + lastPanel.getSize() - state.size
            };
          } else {
            // Find anchor position of set of the combined panels
            var relAnchorPosOfCombined = parseArithmeticExpression(options.anchor, sumOriginalPanelSize);
            var anchorPos = firstPanel.getPosition() + clamp(relAnchorPosOfCombined, sumOriginalPanelSize - (state.size - relativeHangerPosition), relativeHangerPosition);
            state.scrollArea = {
              prev: anchorPos - relativeHangerPosition,
              next: anchorPos - relativeHangerPosition
            };
          }
        } else if (options.circular) {
          var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + options.gap; // Maximum scroll extends to first clone sequence's first panel

          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - relativeHangerPosition,
            next: sumOriginalPanelSize + firstPanel.getAnchorPosition() - relativeHangerPosition
          };
        } else {
          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - relativeHangerPosition,
            next: lastPanel.getAnchorPosition() - relativeHangerPosition
          };
        }

        var viewportSize = state.size;
        var bounce = options.bounce;
        var parsedBounce;

        if (isArray(bounce)) {
          parsedBounce = bounce.map(function (val) {
            return parseArithmeticExpression(val, viewportSize, DEFAULT_OPTIONS.bounce);
          });
        } else {
          var parsedVal = parseArithmeticExpression(bounce, viewportSize, DEFAULT_OPTIONS.bounce);
          parsedBounce = [parsedVal, parsedVal];
        } // Update axes range and bounce


        var flick = axes.axis.flick;
        flick.range = [state.scrollArea.prev, state.scrollArea.next];
        flick.bounce = parsedBounce;
      };

      __proto.checkNeedPanel = function (axesEvent) {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var currentPanel = this.currentPanel;
        var nearestPanel = this.nearestPanel;
        var currentState = this.stateMachine.getState();

        if (!options.infinite) {
          return;
        }

        var gap = options.gap;
        var infiniteThreshold = state.infiniteThreshold;
        var maxLastIndex = panelManager.getLastIndex();

        if (maxLastIndex < 0) {
          return;
        }

        if (!currentPanel || !nearestPanel) {
          // There're no panels
          this.triggerNeedPanel({
            axesEvent: axesEvent,
            siblingPanel: null,
            direction: null,
            indexRange: {
              min: 0,
              max: maxLastIndex,
              length: maxLastIndex + 1
            }
          });
          return;
        }

        var originalNearestPosition = nearestPanel.getPosition(); // Check next direction

        var checkingPanel = !currentState.holding && !currentState.playing ? currentPanel : nearestPanel;

        while (checkingPanel) {
          var currentIndex = checkingPanel.getIndex();
          var nextSibling = checkingPanel.nextSibling;
          var lastPanel = panelManager.lastPanel();
          var atLastPanel = currentIndex === lastPanel.getIndex();
          var nextIndex = !atLastPanel && nextSibling ? nextSibling.getIndex() : maxLastIndex + 1;
          var currentNearestPosition = nearestPanel.getPosition();
          var panelRight = checkingPanel.getPosition() + checkingPanel.getSize() - (currentNearestPosition - originalNearestPosition);
          var cameraNext = state.position + state.size; // There're empty panels between

          var emptyPanelExistsBetween = nextIndex - currentIndex > 1; // Expected prev panel's left position is smaller than camera position

          var overThreshold = panelRight + gap - infiniteThreshold <= cameraNext;

          if (emptyPanelExistsBetween && overThreshold) {
            this.triggerNeedPanel({
              axesEvent: axesEvent,
              siblingPanel: checkingPanel,
              direction: DIRECTION.NEXT,
              indexRange: {
                min: currentIndex + 1,
                max: nextIndex - 1,
                length: nextIndex - currentIndex - 1
              }
            });
          } // Trigger needPanel in circular & at max panel index


          if (options.circular && currentIndex === maxLastIndex && overThreshold) {
            var firstPanel = panelManager.firstPanel();
            var firstIndex = firstPanel ? firstPanel.getIndex() : -1;

            if (firstIndex > 0) {
              this.triggerNeedPanel({
                axesEvent: axesEvent,
                siblingPanel: checkingPanel,
                direction: DIRECTION.NEXT,
                indexRange: {
                  min: 0,
                  max: firstIndex - 1,
                  length: firstIndex
                }
              });
            }
          } // Check whether panels are changed


          var lastPanelAfterNeed = panelManager.lastPanel();
          var atLastPanelAfterNeed = lastPanelAfterNeed && currentIndex === lastPanelAfterNeed.getIndex();

          if (atLastPanelAfterNeed || !overThreshold) {
            break;
          }

          checkingPanel = checkingPanel.nextSibling;
        } // Check prev direction


        checkingPanel = nearestPanel;

        while (checkingPanel) {
          var cameraPrev = state.position;
          var checkingIndex = checkingPanel.getIndex();
          var prevSibling = checkingPanel.prevSibling;
          var firstPanel = panelManager.firstPanel();
          var atFirstPanel = checkingIndex === firstPanel.getIndex();
          var prevIndex = !atFirstPanel && prevSibling ? prevSibling.getIndex() : -1;
          var currentNearestPosition = nearestPanel.getPosition();
          var panelLeft = checkingPanel.getPosition() - (currentNearestPosition - originalNearestPosition); // There're empty panels between

          var emptyPanelExistsBetween = checkingIndex - prevIndex > 1; // Expected prev panel's right position is smaller than camera position

          var overThreshold = panelLeft - gap + infiniteThreshold >= cameraPrev;

          if (emptyPanelExistsBetween && overThreshold) {
            this.triggerNeedPanel({
              axesEvent: axesEvent,
              siblingPanel: checkingPanel,
              direction: DIRECTION.PREV,
              indexRange: {
                min: prevIndex + 1,
                max: checkingIndex - 1,
                length: checkingIndex - prevIndex - 1
              }
            });
          } // Trigger needPanel in circular & at panel 0


          if (options.circular && checkingIndex === 0 && overThreshold) {
            var lastPanel = panelManager.lastPanel();

            if (lastPanel && lastPanel.getIndex() < maxLastIndex) {
              var lastIndex = lastPanel.getIndex();
              this.triggerNeedPanel({
                axesEvent: axesEvent,
                siblingPanel: checkingPanel,
                direction: DIRECTION.PREV,
                indexRange: {
                  min: lastIndex + 1,
                  max: maxLastIndex,
                  length: maxLastIndex - lastIndex
                }
              });
            }
          } // Check whether panels were changed


          var firstPanelAfterNeed = panelManager.firstPanel();
          var atFirstPanelAfterNeed = firstPanelAfterNeed && checkingIndex === firstPanelAfterNeed.getIndex(); // Looped in circular mode

          if (atFirstPanelAfterNeed || !overThreshold) {
            break;
          }

          checkingPanel = checkingPanel.prevSibling;
        }
      };

      __proto.triggerNeedPanel = function (params) {
        var _this = this;

        var axesEvent = params.axesEvent,
            siblingPanel = params.siblingPanel,
            direction = params.direction,
            indexRange = params.indexRange;
        var options = this.options;
        var checkedIndexes = this.state.checkedIndexes;
        var alreadyTriggered = checkedIndexes.some(function (_a) {
          var min = _a[0],
              max = _a[1];
          return min === indexRange.min || max === indexRange.max;
        });
        var hasHandler = this.flicking.hasOn(EVENTS.NEED_PANEL);

        if (alreadyTriggered || !hasHandler) {
          return;
        } // Should done before triggering event, as we can directly add panels by event callback


        checkedIndexes.push([indexRange.min, indexRange.max]);
        var index = siblingPanel ? siblingPanel.getIndex() : 0;
        var isTrusted = axesEvent ? axesEvent.isTrusted : false;
        this.triggerEvent(EVENTS.NEED_PANEL, axesEvent, isTrusted, {
          index: index,
          panel: siblingPanel,
          direction: direction,
          range: indexRange,
          fill: function (element) {
            var panelManager = _this.panelManager;

            if (!siblingPanel) {
              return _this.insert(panelManager.getRange().max + 1, element);
            }

            var parsedElements = parseElement(element); // Slice elements to fit size equal to empty spaces

            var elements = direction === DIRECTION.NEXT ? parsedElements.slice(0, indexRange.length) : parsedElements.slice(-indexRange.length);

            if (direction === DIRECTION.NEXT) {
              if (options.circular && index === panelManager.getLastIndex()) {
                // needPanel event is triggered on last index, insert at index 0
                return _this.insert(0, elements);
              } else {
                return siblingPanel.insertAfter(elements);
              }
            } else if (direction === DIRECTION.PREV) {
              if (options.circular && index === 0) {
                // needPanel event is triggered on first index(0), insert at the last index
                return _this.insert(indexRange.max - elements.length + 1, elements);
              } else {
                return siblingPanel.insertBefore(elements);
              }
            } else {
              // direction is null when there're no panels exist
              return _this.insert(0, elements);
            }
          }
        });
      };

      __proto.updateVisiblePanels = function () {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var currentState = this.stateMachine.getState();
        var cameraElement = this.cameraElement;
        var renderExternal = options.renderExternal,
            renderOnlyVisible = options.renderOnlyVisible;

        if (!renderOnlyVisible) {
          return;
        }

        if (!this.nearestPanel) {
          this.visiblePanels = [];

          while (cameraElement.firstChild) {
            cameraElement.removeChild(cameraElement.firstChild);
          }

          return;
        }

        var prevVisiblePanels = this.visiblePanels;
        var newVisiblePanels = this.calcVisiblePanels();

        var _a = this.checkVisiblePanelChange(prevVisiblePanels, newVisiblePanels),
            addedPanels = _a.addedPanels,
            removedPanels = _a.removedPanels;

        if (addedPanels.length <= 0 && removedPanels.length <= 0) {
          // Visible panels not changed
          return;
        }

        if (currentState.holding) {
          newVisiblePanels.push.apply(newVisiblePanels, removedPanels);
        } else {
          var firstVisiblePanelPos = newVisiblePanels[0].getPosition();
          state.positionOffset = firstVisiblePanelPos;
        }

        newVisiblePanels.forEach(function (panel) {
          panel.setPositionCSS(state.positionOffset);
        });

        if (!renderExternal) {
          if (!currentState.holding) {
            removedPanels.forEach(function (panel) {
              var panelElement = panel.getElement();
              panelElement.parentNode && cameraElement.removeChild(panelElement);
            });
          }

          var fragment_1 = document.createDocumentFragment();
          addedPanels.forEach(function (panel) {
            fragment_1.appendChild(panel.getElement());
          });
          cameraElement.appendChild(fragment_1);
        }

        var firstVisiblePanel = newVisiblePanels[0];
        var lastVisiblePanel = newVisiblePanels[newVisiblePanels.length - 1];

        var getAbsIndex = function (panel) {
          return panel.getIndex() + (panel.getCloneIndex() + 1) * panelManager.getPanelCount();
        };

        var newVisibleRange = {
          min: getAbsIndex(firstVisiblePanel),
          max: getAbsIndex(lastVisiblePanel)
        };
        this.visiblePanels = newVisiblePanels;
        this.flicking.trigger(EVENTS.VISIBLE_CHANGE, {
          type: EVENTS.VISIBLE_CHANGE,
          range: newVisibleRange
        });
      };

      __proto.checkVisiblePanelChange = function (prevVisiblePanels, newVisiblePanels) {
        var prevRefCount = prevVisiblePanels.map(function () {
          return 0;
        });
        var newRefCount = newVisiblePanels.map(function () {
          return 0;
        });
        prevVisiblePanels.forEach(function (prevPanel, prevIndex) {
          newVisiblePanels.forEach(function (newPanel, newIndex) {
            if (prevPanel === newPanel) {
              prevRefCount[prevIndex]++;
              newRefCount[newIndex]++;
            }
          });
        });
        var removedPanels = prevRefCount.reduce(function (removed, count, index) {
          return count === 0 ? __spreadArrays(removed, [prevVisiblePanels[index]]) : removed;
        }, []);
        var addedPanels = newRefCount.reduce(function (added, count, index) {
          return count === 0 ? __spreadArrays(added, [newVisiblePanels[index]]) : added;
        }, []);
        return {
          removedPanels: removedPanels,
          addedPanels: addedPanels
        };
      };

      __proto.resizePanels = function (panels) {
        var options = this.options;
        var panelBboxes = this.panelBboxes;

        if (options.isEqualSize === true) {
          if (!panelBboxes.default) {
            var defaultPanel = panels[0];
            panelBboxes.default = defaultPanel.getBbox();
          }

          var defaultBbox_1 = panelBboxes.default;
          panels.forEach(function (panel) {
            panel.resize(defaultBbox_1);
          });
          return;
        } else if (options.isEqualSize) {
          var equalSizeClasses_2 = options.isEqualSize;
          panels.forEach(function (panel) {
            var overlappedClass = panel.getOverlappedClass(equalSizeClasses_2);

            if (overlappedClass) {
              panel.resize(panelBboxes[overlappedClass]);
              panelBboxes[overlappedClass] = panel.getBbox();
            } else {
              panel.resize();
            }
          });
          return;
        }

        panels.forEach(function (panel) {
          panel.resize();
        });
      };

      __proto.createPanInput = function () {
        var options = this.options;
        this.panInput = new Axes.PanInput(this.viewportElement, {
          inputType: options.inputType,
          thresholdAngle: options.thresholdAngle,
          iOSEdgeSwipeThreshold: options.iOSEdgeSwipeThreshold,
          scale: options.horizontal ? [-1, 0] : [0, -1],
          releaseOnScroll: true
        });
        this.axes.connect(options.horizontal ? ["flick", ""] : ["", "flick"], this.panInput);
      };

      return Viewport;
    }();

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @memberof eg
     * @extends eg.Component
     * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
     * @requires {@link https://github.com/naver/egjs-component|eg.Component}
     * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
     * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
     */

    var Flicking =
    /*#__PURE__*/
    function (_super) {
      __extends(Flicking, _super);
      /**
       * @param element A base element for the eg.Flicking module. When specifying a value as a `string` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `string`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
       * @param options An option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
       * @param {string} [options.classPrefix="eg-flick"] A prefix of class names will be added for the panels, viewport, and camera.<ko>패널들과 뷰포트, 카메라에 추가될 클래스 이름의 접두사.</ko>
       * @param {number} [options.deceleration=0.0075] Deceleration value for panel movement animation for animation triggered by manual user input. A higher value means a shorter running time.<ko>사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
       * @param {boolean} [options.horizontal=true] The direction of panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true: 가로방향, false: 세로방향)</ko>
       * @param {boolean} [options.circular=false] Enables circular mode, which connects first/last panel for continuous scrolling.<ko>순환 모드를 활성화한다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능하다.</ko>
       * @param {boolean} [options.infinite=false] Enables infinite mode, which can automatically trigger needPanel until reaching the last panel's index reaches the lastIndex.<ko>무한 모드를 활성화한다. 무한 모드에서는 needPanel 이벤트를 자동으로 트리거한다. 해당 동작은 마지막 패널의 인덱스가 lastIndex와 일치할때까지 일어난다.</ko>
       * @param {number} [options.infiniteThreshold=0] A Threshold from viewport edge before triggering `needPanel` event in infinite mode.<ko>무한 모드에서 `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리.</ko>
       * @param {number} [options.lastIndex=Infinity] Maximum panel index that Flicking can set. Flicking won't trigger `needPanel` when the event's panel index is greater than it.<br/>Also, if the last panel's index reached a given index, you can't add more panels.<ko>Flicking이 설정 가능한 패널의 최대 인덱스. `needPanel` 이벤트에 지정된 인덱스가 최대 패널의 개수보다 같거나 커야 하는 경우에 이벤트를 트리거하지 않게 한다.<br>또한, 마지막 패널의 인덱스가 주어진 인덱스와 동일할 경우, 새로운 패널을 더 이상 추가할 수 없다.</ko>
       * @param {number} [options.threshold=40] Movement threshold to change panel(unit: pixel). It should be dragged above the threshold to change the current panel.<ko>패널 변경을 위한 이동 임계값 (단위: 픽셀). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.</ko>
       * @param {number} [options.duration=100] Duration of the panel movement animation. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @param {function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] An easing function applied to the panel movement animation. Default value is `easeOutCubic`.<ko>패널 이동 애니메이션에 적용할 easing함수. 기본값은 `easeOutCubic`이다.</ko>
       * @param {number} [options.defaultIndex=0] Index of the panel to set as default when initializing. A zero-based integer.<ko>초기화시 지정할 디폴트 패널의 인덱스로, 0부터 시작하는 정수.</ko>
       * @param {string[]} [options.inputType=["touch,"mouse"]] Types of input devices to enable.({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Reference})<ko>활성화할 입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 참고})</ko>
       * @param {number} [options.thresholdAngle=45] The threshold angle value(0 ~ 90).<br>If the input angle from click/touched position is above or below this value in horizontal and vertical mode each, scrolling won't happen.<ko>스크롤 동작을 막기 위한 임계각(0 ~ 90).<br>클릭/터치한 지점으로부터 계산된 사용자 입력의 각도가 horizontal/vertical 모드에서 각각 크거나 작으면, 스크롤 동작이 이루어지지 않는다.</ko>
       * @param {number|string|number[]|string[]} [options.bounce=[10,10]] The size value of the bounce area. Only can be enabled when `circular=false`.<br>You can set different bounce value for prev/next direction by using array.<br>`number` for px value, and `string` for px, and % value relative to viewport size.(ex - 0, "10px", "20%")<ko>바운스 영역의 크기값. `circular=false`인 경우에만 사용할 수 있다.<br>배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정 가능하다.<br>`number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있다.(ex - 0, "10px", "20%")</ko>
       * @param {boolean} [options.autoResize=false] Whether the `resize` method should be called automatically after a window resize event.<ko>window의 `resize` 이벤트 이후 자동으로 resize()메소드를 호출할지의 여부.</ko>
       * @param {boolean} [options.adaptive=false] Whether the height(horizontal)/width(vertical) of the viewport element reflects the height/width value of the panel after completing the movement.<ko>목적 패널로 이동한 후 그 패널의 높이(horizontal)/너비(vertical)값을 뷰포트 요소의 높이/너비값에 반영할지 여부.</ko>
       * @param {number|""} [options.zIndex=2000] z-index value for viewport element.<ko>뷰포트 엘리먼트의 z-index 값.</ko>
       * @param {boolean} [options.bound=false] Prevent the view from going out of the first/last panel. Only can be enabled when `circular=false`.<ko>뷰가 첫번째와 마지막 패널 밖으로 나가는 것을 막아준다. `circular=false`인 경우에만 사용할 수 있다.</ko>
       * @param {boolean} [options.overflow=false] Disables CSS property `overflow: hidden` in viewport if `true`.<ko>`true`로 설정시 뷰포트에 `overflow: hidden` 속성을 해제한다.</ko>
       * @param {string} [options.hanger="50%"] The reference position of the hanger in the viewport, which hangs panel anchors should be stopped at.<br>It should be provided in px or % value of viewport size.<br>You can combinate those values with plus/minus sign.<br>ex) "50", "100px", "0%", "25% + 100px"<ko>뷰포트 내부의 행어의 위치. 패널의 앵커들이 뷰포트 내에서 멈추는 지점에 해당한다.<br>px값이나, 뷰포트의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {string} [options.anchor="50%"] The reference position of the anchor in panels, which can be hanged by viewport hanger.<br>It should be provided in px or % value of panel size.<br>You can combinate those values with plus/minus sign.<br>ex) "50", "100px", "0%", "25% + 100px"<ko>패널 내부의 앵커의 위치. 뷰포트의 행어와 연계하여 패널이 화면 내에서 멈추는 지점을 설정할 수 있다.<br>px값이나, 패널의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {number} [options.gap=0] Space value between panels. Should be given in number.(px)<ko>패널간에 부여할 간격의 크기를 나타내는 숫자.(px)</ko>
       * @param {eg.Flicking.MoveTypeOption} [options.moveType="snap"] Movement style by user input. (ex: snap, freeScroll)<ko>사용자 입력에 의한 이동 방식.(ex: snap, freeScroll)</ko>
       * @param {boolean} [options.useOffset=false] Whether to use `offsetWidth`/`offsetHeight` instead of `getBoundingClientRect` for panel/viewport size calculation.<br/>You can use this option to calculate the original panel size when CSS transform is applied to viewport or panel.<br/>⚠️ If panel size is not fixed integer value, there can be a 1px gap between panels.<ko>패널과 뷰포트의 크기를 계산할 때 `offsetWidth`/`offsetHeight`를 `getBoundingClientRect` 대신 사용할지 여부.<br/>패널이나 뷰포트에 CSS transform이 설정되어 있을 때 원래 패널 크기를 계산하려면 옵션을 활성화한다.<br/>⚠️ 패널의 크기가 정수로 고정되어있지 않다면 패널 사이에 1px의 공간이 생길 수 있다.</ko>
       * @param {boolean} [options.renderOnlyVisible=false] Whether to render visible panels only. This can dramatically increase performance when there're many panels.<ko>보이는 패널만 렌더링할지 여부를 설정한다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있다.</ko>
       * @param {boolean|string[]} [options.isEqualSize=false] This option indicates whether all panels have the same size(true) of first panel, or it can hold a list of class names that determines panel size.<br/>Enabling this option can increase performance while recalculating panel size.<ko>모든 패널의 크기가 동일한지(true), 혹은 패널 크기를 결정하는 패널 클래스들의 리스트.<br/>이 옵션을 설정하면 패널 크기 재설정시에 성능을 높일 수 있다.</ko>
       * @param {boolean} [options.isConstantSize=false] Whether all panels have a constant size that won't be changed after resize. Enabling this option can increase performance while recalculating panel size.<ko>모든 패널의 크기가 불변인지의 여부. 이 옵션을 'true'로 설정하면 패널 크기 재설정시에 성능을 높일 수 있다.</ko>
       * @param {boolean} [options.renderExternal=false] Whether to use external rendering. It will delegate DOM manipulation and can synchronize the rendered state by calling `sync()` method. You can use this option to use in frameworks like React, Vue, Angular, which has its states and rendering methods.<ko>외부 렌더링을 사용할 지의 여부. 이 옵션을 사용시 렌더링을 외부에 위임할 수 있고, `sync()`를 호출하여 그 상태를 동기화할 수 있다. 이 옵션을 사용하여, React, Vue, Angular 등 자체적인 상태와 렌더링 방법을 갖는 프레임워크에 대응할 수 있다.</ko>
       * @param {boolean} [options.resizeOnContentsReady=false] Whether to resize the Flicking after the image/video elements inside viewport are ready.<br/>Use this property to prevent wrong Flicking layout caused by dynamic image / video sizes.<ko>Flicking 내부의 이미지 / 비디오 엘리먼트들이 전부 로드되었을 때 Flicking의 크기를 재계산하기 위한 옵션.<br/>이미지 / 비디오 크기가 고정 크기가 아닐 경우 사용하여 레이아웃이 잘못되는 것을 방지할 수 있다.</ko>
       * @param {boolean} [options.collectStatistics=true] Whether to collect statistics on how you are using `Flicking`. These statistical data do not contain any personal information and are used only as a basis for the development of a user-friendly product.<ko>어떻게 `Flicking`을 사용하고 있는지에 대한 통계 수집 여부를 나타낸다. 이 통계자료는 개인정보를 포함하고 있지 않으며 오직 사용자 친화적인 제품으로 발전시키기 위한 근거자료로서 활용한다.</ko>
       */


      function Flicking(element, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.contentsReadyChecker = null;
        _this.isPanelChangedAtBeforeSync = false;
        /**
         * Update panels to current state.
         * @ko 패널들을 현재 상태에 맞춰 갱신한다.
         * @method
         * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
         */

        _this.resize = function () {
          var viewport = _this.viewport;
          var options = _this.options;

          var wrapper = _this.getElement();

          var allPanels = viewport.panelManager.allPanels();

          if (!options.isConstantSize) {
            allPanels.forEach(function (panel) {
              return panel.unCacheBbox();
            });
          }

          var shouldResetElements = options.renderOnlyVisible && !options.isConstantSize && options.isEqualSize !== true; // Temporarily set parent's height to prevent scroll (#333)

          var parent = wrapper.parentElement;
          var origStyle = parent.style.height;
          parent.style.height = parent.offsetHeight + "px";
          viewport.unCacheBbox(); // This should be done before adding panels, to lower performance issue

          viewport.updateBbox();

          if (shouldResetElements) {
            viewport.appendUncachedPanelElements(allPanels);
          }

          viewport.resize();
          parent.style.height = origStyle;
          return _this;
        };

        _this.triggerEvent = function (eventName, // visibleChange event has no common event definition from other events
        axesEvent, isTrusted, params) {
          if (params === void 0) {
            params = {};
          }

          var viewport = _this.viewport;
          var canceled = true; // Ignore events before viewport is initialized

          if (viewport) {
            var state = viewport.stateMachine.getState();

            var _a = viewport.getScrollArea(),
                prev = _a.prev,
                next = _a.next;

            var pos = viewport.getCameraPosition();
            var progress = getProgress(pos, [prev, prev, next]);

            if (_this.options.circular) {
              progress %= 1;
            }

            canceled = !_super.prototype.trigger.call(_this, eventName, merge({
              type: eventName,
              index: _this.getIndex(),
              panel: _this.getCurrentPanel(),
              direction: state.direction,
              holding: state.holding,
              progress: progress,
              axesEvent: axesEvent,
              isTrusted: isTrusted
            }, params));
          }

          return {
            onSuccess: function (callback) {
              if (!canceled) {
                callback();
              }

              return this;
            },
            onStopped: function (callback) {
              if (canceled) {
                callback();
              }

              return this;
            }
          };
        }; // Return result of "move" event triggered


        _this.moveCamera = function (axesEvent) {
          var viewport = _this.viewport;
          var state = viewport.stateMachine.getState();
          var options = _this.options;
          var pos = axesEvent.pos.flick;
          var previousPosition = viewport.getCameraPosition();

          if (axesEvent.isTrusted && state.holding) {
            var inputOffset = options.horizontal ? axesEvent.inputEvent.offsetX : axesEvent.inputEvent.offsetY;
            var isNextDirection = inputOffset < 0;
            var cameraChange = pos - previousPosition;
            var looped = isNextDirection === pos < previousPosition;

            if (options.circular && looped) {
              // Reached at max/min range of axes
              var scrollAreaSize = viewport.getScrollAreaSize();
              cameraChange = (cameraChange > 0 ? -1 : 1) * (scrollAreaSize - Math.abs(cameraChange));
            }

            var currentDirection = cameraChange === 0 ? state.direction : cameraChange > 0 ? DIRECTION.NEXT : DIRECTION.PREV;
            state.direction = currentDirection;
          }

          state.delta += axesEvent.delta.flick;
          viewport.moveCamera(pos, axesEvent);
          return _this.triggerEvent(EVENTS.MOVE, axesEvent, axesEvent.isTrusted).onStopped(function () {
            // Undo camera movement
            viewport.moveCamera(previousPosition, axesEvent);
          });
        }; // Set flicking wrapper user provided


        var wrapper;

        if (isString(element)) {
          wrapper = document.querySelector(element);

          if (!wrapper) {
            throw new Error("Base element doesn't exist.");
          }
        } else if (element.nodeName && element.nodeType === 1) {
          wrapper = element;
        } else {
          throw new Error("Element should be provided in string or HTMLElement.");
        }

        _this.wrapper = wrapper; // Override default options

        _this.options = merge({}, DEFAULT_OPTIONS, options); // Override moveType option

        var currentOptions = _this.options;
        var moveType = currentOptions.moveType;

        if (moveType in DEFAULT_MOVE_TYPE_OPTIONS) {
          currentOptions.moveType = DEFAULT_MOVE_TYPE_OPTIONS[moveType];
        } // Make viewport instance with panel container element


        _this.viewport = new Viewport(_this, _this.options, _this.triggerEvent);

        _this.listenInput();

        _this.listenResize();

        return _this; // if (this.options.collectStatistics) {
        //   sendEvent(
        //     "usage",
        //     "options",
        //     options,
        //   );
        // }
      }
      /**
       * Move to the previous panel if it exists.
       * @ko 이전 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      var __proto = Flicking.prototype;

      __proto.prev = function (duration) {
        var currentPanel = this.getCurrentPanel();
        var currentState = this.viewport.stateMachine.getState();

        if (currentPanel && currentState.type === STATE_TYPE.IDLE) {
          var prevPanel = currentPanel.prev();

          if (prevPanel) {
            prevPanel.focus(duration);
          }
        }

        return this;
      };
      /**
       * Move to the next panel if it exists.
       * @ko 다음 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation(unit: ms).<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.next = function (duration) {
        var currentPanel = this.getCurrentPanel();
        var currentState = this.viewport.stateMachine.getState();

        if (currentPanel && currentState.type === STATE_TYPE.IDLE) {
          var nextPanel = currentPanel.next();

          if (nextPanel) {
            nextPanel.focus(duration);
          }
        }

        return this;
      };
      /**
       * Move to the panel of given index.
       * @ko 주어진 인덱스에 해당하는 패널로 이동한다.
       * @param index The index number of the panel to move.<ko>이동할 패널의 인덱스 번호.</ko>
       * @param duration [duration=options.duration] Duration of the panel movement.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.moveTo = function (index, duration) {
        var viewport = this.viewport;
        var panel = viewport.panelManager.get(index);
        var state = viewport.stateMachine.getState();

        if (!panel || state.type !== STATE_TYPE.IDLE) {
          return this;
        }

        var anchorPosition = panel.getAnchorPosition();
        var hangerPosition = viewport.getHangerPosition();
        var targetPanel = panel;

        if (this.options.circular) {
          var scrollAreaSize = viewport.getScrollAreaSize(); // Check all three possible locations, find the nearest position among them.

          var possiblePositions = [anchorPosition - scrollAreaSize, anchorPosition, anchorPosition + scrollAreaSize];
          var nearestPosition = possiblePositions.reduce(function (nearest, current) {
            return Math.abs(current - hangerPosition) < Math.abs(nearest - hangerPosition) ? current : nearest;
          }, Infinity) - panel.getRelativeAnchorPosition();
          var identicals = panel.getIdenticalPanels();
          var offset = nearestPosition - anchorPosition;

          if (offset > 0) {
            // First cloned panel is nearest
            targetPanel = identicals[1];
          } else if (offset < 0) {
            // Last cloned panel is nearest
            targetPanel = identicals[identicals.length - 1];
          }

          targetPanel = targetPanel.clone(targetPanel.getCloneIndex(), true);
          targetPanel.setPosition(nearestPosition);
        }

        var currentIndex = this.getIndex();

        if (hangerPosition === targetPanel.getAnchorPosition() && currentIndex === index) {
          return this;
        }

        var eventType = panel.getIndex() === viewport.getCurrentIndex() ? "" : EVENTS.CHANGE;
        viewport.moveTo(targetPanel, viewport.findEstimatedPosition(targetPanel), eventType, null, duration);
        return this;
      };
      /**
       * Return index of the current panel. `-1` if no panel exists.
       * @ko 현재 패널의 인덱스 번호를 반환한다. 패널이 하나도 없을 경우 `-1`을 반환한다.
       * @return Current panel's index, zero-based integer.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
       */


      __proto.getIndex = function () {
        return this.viewport.getCurrentIndex();
      };
      /**
       * Return the wrapper element user provided in constructor.
       * @ko 사용자가 생성자에서 제공한 래퍼 엘리먼트를 반환한다.
       * @return Wrapper element user provided.<ko>사용자가 제공한 래퍼 엘리먼트.</ko>
       */


      __proto.getElement = function () {
        return this.wrapper;
      };
      /**
       * Return the viewport element's size.
       * @ko 뷰포트 엘리먼트의 크기를 반환한다.
       * @return Width if horizontal: true, height if horizontal: false
       */


      __proto.getSize = function () {
        return this.viewport.getSize();
      };
      /**
       * Return current panel. `null` if no panel exists.
       * @ko 현재 패널을 반환한다. 패널이 하나도 없을 경우 `null`을 반환한다.
       * @return Current panel.<ko>현재 패널.</ko>
       */


      __proto.getCurrentPanel = function () {
        var viewport = this.viewport;
        var panel = viewport.getCurrentPanel();
        return panel ? panel : null;
      };
      /**
       * Return the panel of given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 패널을 반환한다. 해당 패널이 존재하지 않을 시 `null`이다.
       * @return Panel of given index.<ko>주어진 인덱스에 해당하는 패널.</ko>
       */


      __proto.getPanel = function (index) {
        var viewport = this.viewport;
        var panel = viewport.panelManager.get(index);
        return panel ? panel : null;
      };
      /**
       * Return all panels.
       * @ko 모든 패널들을 반환한다.
       * @param - Should include cloned panels or not.<ko>복사된 패널들을 포함할지의 여부.</ko>
       * @return All panels.<ko>모든 패널들.</ko>
       */


      __proto.getAllPanels = function (includeClone) {
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var panels = includeClone ? panelManager.allPanels() : panelManager.originalPanels();
        return panels.filter(function (panel) {
          return !!panel;
        });
      };
      /**
       * Return the panels currently shown in viewport area.
       * @ko 현재 뷰포트 영역에서 보여지고 있는 패널들을 반환한다.
       * @return Panels currently shown in viewport area.<ko>현재 뷰포트 영역에 보여지는 패널들</ko>
       */


      __proto.getVisiblePanels = function () {
        return this.viewport.calcVisiblePanels();
      };
      /**
       * Return length of original panels.
       * @ko 원본 패널의 개수를 반환한다.
       * @return Length of original panels.<ko>원본 패널의 개수</ko>
       */


      __proto.getPanelCount = function () {
        return this.viewport.panelManager.getPanelCount();
      };
      /**
       * Return how many groups of clones are created.
       * @ko 몇 개의 클론 그룹이 생성되었는지를 반환한다.
       * @return Length of cloned panel groups.<ko>클론된 패널 그룹의 개수</ko>
       */


      __proto.getCloneCount = function () {
        return this.viewport.panelManager.getCloneCount();
      };
      /**
       * Get maximum panel index for `infinite` mode.
       * @ko `infinite` 모드에서 적용되는 추가 가능한 패널의 최대 인덱스 값을 반환한다.
       * @see {@link eg.Flicking.FlickingOptions}
       * @return Maximum index of panel that can be added.<ko>최대 추가 가능한 패널의 인덱스.</ko>
       */


      __proto.getLastIndex = function () {
        return this.viewport.panelManager.getLastIndex();
      };
      /**
       * Set maximum panel index for `infinite' mode.<br>[needPanel]{@link eg.Flicking#events:needPanel} won't be triggered anymore when last panel's index reaches it.<br>Also, you can't add more panels after it.
       * @ko `infinite` 모드에서 적용되는 패널의 최대 인덱스를 설정한다.<br>마지막 패널의 인덱스가 설정한 값에 도달할 경우 더 이상 [needPanel]{@link eg.Flicking#events:needPanel} 이벤트가 발생되지 않는다.<br>또한, 설정한 인덱스 이후로 새로운 패널을 추가할 수 없다.
       * @param - Maximum panel index.
       * @see {@link eg.Flicking.FlickingOptions}
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.setLastIndex = function (index) {
        this.viewport.setLastIndex(index);
        return this;
      };
      /**
       * Return panel movement animation.
       * @ko 현재 패널 이동 애니메이션이 진행 중인지를 반환한다.
       * @return Is animating or not.<ko>애니메이션 진행 여부.</ko>
       */


      __proto.isPlaying = function () {
        return this.viewport.stateMachine.getState().playing;
      };
      /**
       * Unblock input devices.
       * @ko 막았던 입력 장치로부터의 입력을 푼다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.enableInput = function () {
        this.viewport.enable();
        return this;
      };
      /**
       * Block input devices.
       * @ko 입력 장치로부터의 입력을 막는다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.disableInput = function () {
        this.viewport.disable();
        return this;
      };
      /**
       * Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link eg.Flicking#setStatus}.
       * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있다.
       * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function () {
        var viewport = this.viewport;
        var panels = viewport.panelManager.originalPanels().filter(function (panel) {
          return !!panel;
        }).map(function (panel) {
          return {
            html: panel.getElement().outerHTML,
            index: panel.getIndex(),
            position: panel.getPosition()
          };
        });
        return {
          index: viewport.getCurrentIndex(),
          panels: panels,
          position: viewport.getCameraPosition()
        };
      };
      /**
       * Restore to the state of the `status`.
       * @ko `status`의 상태로 복원한다.
       * @param status Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드의 반환값을 지정하면 된다.</ko>
       */


      __proto.setStatus = function (status) {
        this.viewport.restore(status);
      };
      /**
       * Add plugins that can have different effects on Flicking.
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가한다.
       * @param - The plugin(s) to add.<ko>추가할 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.addPlugins = function (plugins) {
        this.viewport.addPlugins(plugins);
        return this;
      };
      /**
       * Remove plugins from Flicking.
       * @ko 플리킹으로부터 플러그인들을 제거한다.
       * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.removePlugins = function (plugins) {
        this.viewport.removePlugins(plugins);
        return this;
      };
      /**
       * Return the reference element and all its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
       * @ko 기준 요소와 그 하위 패널들을 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
       * @example
       * const flick = new eg.Flicking("#flick");
       * flick.destroy();
       * console.log(flick.moveTo); // null
       */


      __proto.destroy = function (option) {
        var _a;

        if (option === void 0) {
          option = {};
        }

        this.off();

        if (this.options.autoResize) {
          window.removeEventListener("resize", this.resize);
        }

        this.viewport.destroy(option);
        (_a = this.contentsReadyChecker) === null || _a === void 0 ? void 0 : _a.destroy(); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };
      /**
       * Add new panels at the beginning of panels.
       * @ko 제일 앞에 새로운 패널을 추가한다.
       * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
       * @return Array of appended panels.<ko>추가된 패널들의 배열</ko>
       * @example
       * // Suppose there were no panels at initialization
       * const flicking = new eg.Flicking("#flick");
       * flicking.replace(3, document.createElement("div")); // Add new panel at index 3
       * flicking.prepend("\<div\>Panel\</div\>"); // Prepended at index 2
       * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]); // Prepended at index 0, 1
       * flicking.prepend("\<div\>Panel\</div\>"); // Prepended at index 0, pushing every panels behind it.
       */


      __proto.prepend = function (element) {
        var viewport = this.viewport;
        var parsedElements = parseElement(element);
        var insertingIndex = Math.max(viewport.panelManager.getRange().min - parsedElements.length, 0);
        var prependedPanels = viewport.insert(insertingIndex, parsedElements);
        this.checkContentsReady(prependedPanels);
        return prependedPanels;
      };
      /**
       * Add new panels at the end of panels.
       * @ko 제일 끝에 새로운 패널을 추가한다.
       * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
       * @return Array of appended panels.<ko>추가된 패널들의 배열</ko>
       * @example
       * // Suppose there were no panels at initialization
       * const flicking = new eg.Flicking("#flick");
       * flicking.append(document.createElement("div")); // Appended at index 0
       * flicking.append("\<div\>Panel\</div\>"); // Appended at index 1
       * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]); // Appended at index 2, 3
       * // Even this is possible
       * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>"); // Appended at index 4, 5
       */


      __proto.append = function (element) {
        var viewport = this.viewport;
        var appendedPanels = viewport.insert(viewport.panelManager.getRange().max + 1, element);
        this.checkContentsReady(appendedPanels);
        return appendedPanels;
      };
      /**
       * Replace existing panels with new panels from given index. If target index is empty, add new panel at target index.
       * @ko 주어진 인덱스로부터의 패널들을 새로운 패널들로 교체한다. 인덱스에 해당하는 자리가 비어있다면, 새로운 패널을 해당 자리에 집어넣는다.
       * @param index - Start index to replace new panels.<ko>새로운 패널들로 교체할 시작 인덱스</ko>
       * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
       * @return Array of created panels by replace.<ko>교체되어 새롭게 추가된 패널들의 배열</ko>
       * @example
       * // Suppose there were no panels at initialization
       * const flicking = new eg.Flicking("#flick");
       *
       * // This will add new panel at index 3,
       * // Index 0, 1, 2 is empty at this moment.
       * // [empty, empty, empty, PANEL]
       * flicking.replace(3, document.createElement("div"));
       *
       * // As index 2 was empty, this will also add new panel at index 2.
       * // [empty, empty, PANEL, PANEL]
       * flicking.replace(2, "\<div\>Panel\</div\>");
       *
       * // Index 3 was not empty, so it will replace previous one.
       * // It will also add new panels at index 4 and 5.
       * // before - [empty, empty, PANEL, PANEL]
       * // after - [empty, empty, PANEL, NEW_PANEL, NEW_PANEL, NEW_PANEL]
       * flicking.replace(3, ["\<div\>Panel\</div\>", "\<div\>Panel\</div\>", "\<div\>Panel\</div\>"])
       */


      __proto.replace = function (index, element) {
        var replacedPanels = this.viewport.replace(index, element);
        this.checkContentsReady(replacedPanels);
        return replacedPanels;
      };
      /**
       * Remove panel at target index. This will decrease index of panels behind it.
       * @ko `index`에 해당하는 자리의 패널을 제거한다. 수행시 `index` 이후의 패널들의 인덱스가 감소된다.
       * @param index - Index of panel to remove.<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] - Number of panels to remove from index.<ko>`index` 이후로 제거할 패널의 개수.</ko>
       * @return Array of removed panels<ko>제거된 패널들의 배열</ko>
       */


      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        return this.viewport.remove(index, deleteCount);
      };
      /**
       * Get indexes to render. Should be used with `renderOnlyVisible` option.
       * `beforeSync` should be called before this method for a correct result.
       * @private
       * @ko 렌더링이 필요한 인덱스들을 반환한다. `renderOnlyVisible` 옵션과 함께 사용해야 한다. 정확한 결과를 위해선 `beforeSync`를 이전에 호출해야만 합니다.
       * @param - Info object of how panel infos are changed.<ko>패널 정보들의 변경 정보를 담는 오브젝트.</ko>
       * @return Array of indexes to render.<ko>렌더링할 인덱스의 배열</ko>
       */


      __proto.getRenderingIndexes = function (diffResult) {
        var viewport = this.viewport;
        var visiblePanels = viewport.getVisiblePanels();
        var maintained = diffResult.maintained.reduce(function (values, _a) {
          var before = _a[0],
              after = _a[1];
          values[after] = before;
          return values;
        }, {});
        var panelCount = diffResult.list.length;
        var added = diffResult.added;

        var getPanelAbsIndex = function (panel) {
          return panel.getIndex() + (panel.getCloneIndex() + 1) * panelCount;
        };

        var visibleIndexes = visiblePanels.map(function (panel) {
          return getPanelAbsIndex(panel);
        }).filter(function (val) {
          return maintained[val % panelCount] != null;
        });

        var renderingPanels = __spreadArrays(visibleIndexes, added);

        var allPanels = viewport.panelManager.allPanels();
        viewport.setVisiblePanels(renderingPanels.map(function (index) {
          return allPanels[index];
        }));
        return renderingPanels;
      };
      /**
       * Synchronize info of panels instance with info given by external rendering.
       * @ko 외부 렌더링 방식에 의해 입력받은 패널의 정보와 현재 플리킹이 갖는 패널 정보를 동기화한다.
       * @private
       * @param - Info object of how panel infos are changed.<ko>패널 정보들의 변경 정보를 담는 오브젝트.</ko>
       * @param - Whether called from sync method <ko> sync 메소드로부터 호출됐는지 여부 </ko>
       */


      __proto.beforeSync = function (diffInfo) {
        var _this = this;

        var maintained = diffInfo.maintained,
            added = diffInfo.added,
            changed = diffInfo.changed,
            removed = diffInfo.removed;
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var isCircular = this.options.circular;
        var currentPanel = viewport.getCurrentPanel();
        var cloneCount = panelManager.getCloneCount();
        var prevClonedPanels = panelManager.clonedPanels(); // Update visible panels

        var newVisiblePanels = viewport.getVisiblePanels().filter(function (panel) {
          return findIndex(removed, function (index) {
            return index === panel.getIndex();
          }) < 0;
        });
        viewport.setVisiblePanels(newVisiblePanels); // Did not changed at all

        if (added.length <= 0 && removed.length <= 0 && changed.length <= 0 && cloneCount === prevClonedPanels.length) {
          return this;
        }

        var prevOriginalPanels = panelManager.originalPanels();
        var newPanels = [];
        var newClones = counter(cloneCount).map(function () {
          return [];
        });
        maintained.forEach(function (_a) {
          var beforeIdx = _a[0],
              afterIdx = _a[1];
          newPanels[afterIdx] = prevOriginalPanels[beforeIdx];
          newPanels[afterIdx].setIndex(afterIdx);
        });
        added.forEach(function (addIndex) {
          newPanels[addIndex] = new Panel(null, addIndex, _this.viewport);
        });

        if (isCircular) {
          counter(cloneCount).forEach(function (groupIndex) {
            var prevCloneGroup = prevClonedPanels[groupIndex];
            var newCloneGroup = newClones[groupIndex];
            maintained.forEach(function (_a) {
              var beforeIdx = _a[0],
                  afterIdx = _a[1];
              newCloneGroup[afterIdx] = prevCloneGroup ? prevCloneGroup[beforeIdx] : newPanels[afterIdx].clone(groupIndex, false);
              newCloneGroup[afterIdx].setIndex(afterIdx);
            });
            added.forEach(function (addIndex) {
              var newPanel = newPanels[addIndex];
              newCloneGroup[addIndex] = newPanel.clone(groupIndex, false);
            });
          });
        }

        added.forEach(function (index) {
          viewport.updateCheckedIndexes({
            min: index,
            max: index
          });
        });
        removed.forEach(function (index) {
          viewport.updateCheckedIndexes({
            min: index - 1,
            max: index + 1
          });
        });
        var checkedIndexes = viewport.getCheckedIndexes();
        checkedIndexes.forEach(function (_a, idx) {
          var min = _a[0],
              max = _a[1]; // Push checked indexes backward

          var pushedIndex = added.filter(function (index) {
            return index < min && panelManager.has(index);
          }).length - removed.filter(function (index) {
            return index < min;
          }).length;
          checkedIndexes.splice(idx, 1, [min + pushedIndex, max + pushedIndex]);
        }); // Only effective only when there are least one panel which have changed its index

        if (changed.length > 0) {
          // Removed checked index by changed ones after pushing
          maintained.forEach(function (_a) {
            var next = _a[1];
            viewport.updateCheckedIndexes({
              min: next,
              max: next
            });
          });
        }

        panelManager.replacePanels(newPanels, newClones);

        if (!currentPanel && newPanels.length > 0) {
          viewport.setCurrentPanel(newPanels[0]);
        } else if (newPanels.length <= 0) {
          viewport.setCurrentPanel(undefined);
        }

        this.isPanelChangedAtBeforeSync = true;
      };
      /**
       * Synchronize info of panels with DOM info given by external rendering.
       * @ko 외부 렌더링 방식에 의해 입력받은 DOM의 정보와 현재 플리킹이 갖는 패널 정보를 동기화 한다.
       * @private
       * @param - Info object of how panel elements are changed.<ko>패널의 DOM 요소들의 변경 정보를 담는 오브젝트.</ko>
       */


      __proto.sync = function (diffInfo) {
        var list = diffInfo.list,
            maintained = diffInfo.maintained,
            added = diffInfo.added,
            changed = diffInfo.changed,
            removed = diffInfo.removed; // Did not changed at all

        if (added.length <= 0 && removed.length <= 0 && changed.length <= 0) {
          return this;
        }

        var viewport = this.viewport;
        var _a = this.options,
            renderOnlyVisible = _a.renderOnlyVisible,
            circular = _a.circular;
        var panelManager = viewport.panelManager;

        if (!renderOnlyVisible) {
          var indexRange = panelManager.getRange();
          var beforeDiffInfo = diffInfo;

          if (circular) {
            var prevOriginalPanelCount_1 = indexRange.max;
            var originalPanelCount_1 = list.length / (panelManager.getCloneCount() + 1) >> 0;
            var originalAdded = added.filter(function (index) {
              return index < originalPanelCount_1;
            });
            var originalRemoved = removed.filter(function (index) {
              return index <= prevOriginalPanelCount_1;
            });
            var originalMaintained = maintained.filter(function (_a) {
              var beforeIdx = _a[0];
              return beforeIdx <= prevOriginalPanelCount_1;
            });
            var originalChanged = changed.filter(function (_a) {
              var beforeIdx = _a[0];
              return beforeIdx <= prevOriginalPanelCount_1;
            });
            beforeDiffInfo = {
              added: originalAdded,
              maintained: originalMaintained,
              removed: originalRemoved,
              changed: originalChanged
            };
          }

          this.beforeSync(beforeDiffInfo);
        }

        var visiblePanels = renderOnlyVisible ? viewport.getVisiblePanels() : this.getAllPanels(true);
        added.forEach(function (addedIndex) {
          var addedElement = list[addedIndex];
          var beforePanel = visiblePanels[addedIndex];
          beforePanel.setElement(addedElement); // As it can be 0

          beforePanel.unCacheBbox();
        });

        if (this.isPanelChangedAtBeforeSync) {
          // Reset visible panels
          viewport.setVisiblePanels([]);
          this.isPanelChangedAtBeforeSync = false;
        }

        viewport.resize();
        return this;
      };

      __proto.listenInput = function () {
        var flicking = this;
        var viewport = flicking.viewport;
        var stateMachine = viewport.stateMachine; // Set event context

        flicking.eventContext = {
          flicking: flicking,
          viewport: flicking.viewport,
          transitTo: stateMachine.transitTo,
          triggerEvent: flicking.triggerEvent,
          moveCamera: flicking.moveCamera,
          stopCamera: viewport.stopCamera
        };
        var handlers = {};

        var _loop_1 = function (key) {
          var eventType = AXES_EVENTS[key];

          handlers[eventType] = function (e) {
            return stateMachine.fire(eventType, e, flicking.eventContext);
          };
        };

        for (var key in AXES_EVENTS) {
          _loop_1(key);
        } // Connect Axes instance with PanInput


        flicking.viewport.connectAxesHandler(handlers);
      };

      __proto.listenResize = function () {
        var _this = this;

        var options = this.options;

        if (options.autoResize) {
          window.addEventListener("resize", this.resize);
        }

        if (options.resizeOnContentsReady) {
          var contentsReadyChecker = new ImReady();
          contentsReadyChecker.on("preReady", function () {
            _this.resize();
          });
          contentsReadyChecker.on("readyElement", function (e) {
            if (e.hasLoading && e.isPreReadyOver) {
              _this.resize();
            }
          });
          contentsReadyChecker.on("error", function (e) {
            _this.trigger(EVENTS.CONTENT_ERROR, {
              type: EVENTS.CONTENT_ERROR,
              element: e.element
            });
          });
          contentsReadyChecker.check([this.wrapper]);
          this.contentsReadyChecker = contentsReadyChecker;
        }
      };

      __proto.checkContentsReady = function (panels) {
        var _a;

        (_a = this.contentsReadyChecker) === null || _a === void 0 ? void 0 : _a.check(panels.map(function (panel) {
          return panel.getElement();
        }));
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @example
       * eg.Flicking.VERSION;  // ex) 3.0.0
       * @memberof eg.Flicking
       */


      Flicking.VERSION = "3.8.2";
      /**
       * Direction constant - "PREV" or "NEXT"
       * @ko 방향 상수 - "PREV" 또는 "NEXT"
       * @type {object}
       * @property {"PREV"} PREV - Prev direction from current hanger position.<br/>It's `left(←️)` direction when `horizontal: true`.<br/>Or, `up(↑️)` direction when `horizontal: false`.<ko>현재 행어를 기준으로 이전 방향.<br/>`horizontal: true`일 경우 `왼쪽(←️)` 방향.<br/>`horizontal: false`일 경우 `위쪽(↑️)`방향이다.</ko>
       * @property {"NEXT"} NEXT - Next direction from current hanger position.<br/>It's `right(→)` direction when `horizontal: true`.<br/>Or, `down(↓️)` direction when `horizontal: false`.<ko>현재 행어를 기준으로 다음 방향.<br/>`horizontal: true`일 경우 `오른쪽(→)` 방향.<br/>`horizontal: false`일 경우 `아래쪽(↓️)`방향이다.</ko>
       * @example
       * eg.Flicking.DIRECTION.PREV; // "PREV"
       * eg.Flicking.DIRECTION.NEXT; // "NEXT"
       */

      Flicking.DIRECTION = DIRECTION;
      /**
       * Event type object with event name strings.
       * @ko 이벤트 이름 문자열들을 담은 객체
       * @type {object}
       * @property {"holdStart"} HOLD_START - holdStart event<ko>holdStart 이벤트</ko>
       * @property {"holdEnd"} HOLD_END - holdEnd event<ko>holdEnd 이벤트</ko>
       * @property {"moveStart"} MOVE_START - moveStart event<ko>moveStart 이벤트</ko>
       * @property {"move"} MOVE - move event<ko>move 이벤트</ko>
       * @property {"moveEnd"} MOVE_END - moveEnd event<ko>moveEnd 이벤트</ko>
       * @property {"change"} CHANGE - change event<ko>change 이벤트</ko>
       * @property {"restore"} RESTORE - restore event<ko>restore 이벤트</ko>
       * @property {"select"} SELECT - select event<ko>select 이벤트</ko>
       * @property {"needPanel"} NEED_PANEL - needPanel event<ko>needPanel 이벤트</ko>
       * @example
       * eg.Flicking.EVENTS.MOVE_START; // "MOVE_START"
       */

      Flicking.EVENTS = EVENTS;
      return Flicking;
    }(Component);

    Flicking.withFlickingMethods = withFlickingMethods;
    Flicking.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    Flicking.MOVE_TYPE = MOVE_TYPE;

    return Flicking;

})));
//# sourceMappingURL=flicking.js.map
