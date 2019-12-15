/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking JavaScript library
@egjs/flicking project is licensed under the MIT license

https://github.com/naver/egjs-flicking
@version 3.0.0-beta2
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@egjs/component'), require('@egjs/axes')) :
    typeof define === 'function' && define.amd ? define(['@egjs/component', '@egjs/axes'], factory) :
    (global = global || self, (global.eg = global.eg || {}, global.eg.Flicking = factory(global.eg.Component, global.eg.Axes)));
}(this, function (Component, Axes) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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
    } // Check whether browser supports transform: translate3d
    // https://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support

    var checkTranslateSupport = function () {
      var transforms = {
        webkitTransform: "-webkit-transform",
        msTransform: "-ms-transform",
        MozTransform: "-moz-transform",
        OTransform: "-o-transform",
        transform: "transform"
      };
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
    }; // Get class list of element as string array

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        if (element.className.indexOf(className) < 0) {
          element.className = (element.className + " " + className).replace(/\s{2,}/g, " ");
        }
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

      if (pos > center) {
        // 0 ~ 1
        return max - center ? (pos - center) / (max - center) : (pos - min) / (max - min);
      } else if (pos < center) {
        // -1 ~ 0
        return center - min ? (pos - center) / (center - min) : (pos - min) / (max - min);
      }

      return 0;
    }

    var DEFAULT_OPTIONS = {
      classPrefix: "eg-flick",
      deceleration: 0.0075,
      horizontal: true,
      circular: false,
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
      snap: 1
    };
    var DEFAULT_VIEWPORT_CSS = {
      position: "relative",
      zIndex: DEFAULT_OPTIONS.zIndex,
      width: "100%",
      height: "100%",
      willChange: "transform",
      overflow: "hidden"
    };
    var DEFAULT_CAMERA_CSS = {
      width: "100%",
      height: "100%"
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
      SELECT: "select"
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
    var TRANSFORM = checkTranslateSupport();

    var Panel =
    /*#__PURE__*/
    function () {
      function Panel(element, index, options) {
        this.element = element;
        this.state = {
          index: index,
          horizontal: options.horizontal,
          position: 0,
          anchorExpression: options.anchorExpression,
          relativeAnchorPosition: 0,
          size: 0,
          clonedPanels: [],
          isClone: false,
          cloneIndex: -1,
          originalStyle: {
            className: element.getAttribute("class") || null,
            style: element.getAttribute("style") || null
          },
          cachedBbox: null
        };

        if (options.classPrefix) {
          addClass(element, options.classPrefix + "-panel");
        } // Update size info after applying panel css


        applyCSS(this.element, DEFAULT_PANEL_CSS);
        this.resize();
      }

      var __proto = Panel.prototype;

      __proto.resize = function () {
        var state = this.state; // Removed cached bbox, as we're resizing

        state.cachedBbox = null;
        var bbox = this.getBbox();
        state.size = state.horizontal ? bbox.width : bbox.height;

        if (!state.isClone) {
          state.clonedPanels.forEach(function (panel) {
            return panel.resize();
          });
        }
      };

      __proto.destroy = function () {
        var el = this.element;
        var originalStyle = this.state.originalStyle;
        originalStyle.className ? el.setAttribute("class", originalStyle.className) : el.removeAttribute("class");
        originalStyle.style ? el.setAttribute("style", originalStyle.style) : el.removeAttribute("style"); // release resources

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

      __proto.getPrevPanel = function () {
        return this.prevPanel;
      };

      __proto.getNextPanel = function () {
        return this.nextPanel;
      };

      __proto.getBbox = function () {
        var state = this.state;

        if (!state.cachedBbox) {
          state.cachedBbox = this.element.getBoundingClientRect();
        }

        return state.cachedBbox;
      };

      __proto.isClone = function () {
        return this.state.isClone;
      };

      __proto.getCloneIndex = function () {
        return this.state.cloneIndex;
      };

      __proto.getClonedPanels = function () {
        return this.state.clonedPanels;
      };

      __proto.getIdenticalPanels = function () {
        var state = this.state;
        return state.isClone ? this.original.getIdenticalPanels() : [this].concat(state.clonedPanels);
      };

      __proto.setPosition = function (pos) {
        var state = this.state;
        var elementStyle = this.element.style;
        state.position = pos;
        state.horizontal ? elementStyle.left = pos + "px" : elementStyle.top = pos + "px";
        state.relativeAnchorPosition = parseArithmeticExpression(state.anchorExpression, state.size);
      };

      __proto.setPrevPanel = function (panel) {
        this.prevPanel = panel;
      };

      __proto.setNextPanel = function (panel) {
        this.nextPanel = panel;
      };

      __proto.clone = function (cloneIndex) {
        var state = this.state;
        var cloneElement = this.element.cloneNode(true);
        var clonedPanel = new Panel(cloneElement, state.index, {
          anchorExpression: state.anchorExpression,
          horizontal: state.horizontal
        });
        clonedPanel.original = this;
        clonedPanel.state.isClone = true;
        clonedPanel.state.cloneIndex = cloneIndex; // Can't calc size as it didn't appended to other element yet
        // So manually set size for it

        clonedPanel.state.size = state.size;
        state.clonedPanels.push(clonedPanel);
        return clonedPanel;
      };

      __proto.removeClonedPanelsAfter = function (start) {
        var removedPanels = this.state.clonedPanels.splice(start);

        for (var _i = 0, removedPanels_1 = removedPanels; _i < removedPanels_1.length; _i++) {
          var panel = removedPanels_1[_i];
          var element = panel.getElement();
          element.parentNode.removeChild(element);
        }
      };

      return Panel;
    }();

    var Viewport =
    /*#__PURE__*/
    function () {
      function Viewport(viewportElement, cameraElement, options) {
        this.clonedPanels = [];
        this.viewportElement = viewportElement;
        this.cameraElement = cameraElement;
        this.state = {
          index: options.defaultIndex,
          size: 0,
          position: 0,
          hangerPosition: 0,
          scrollArea: {
            prev: 0,
            next: 0
          },
          translate: TRANSFORM
        };
        this.options = options;
        this.build();
      }

      var __proto = Viewport.prototype;

      __proto.moveTo = function (panel, axesEvent, duration) {
        if (duration === void 0) {
          duration = this.options.duration;
        }

        var state = this.state;
        var targetPos = panel.anchorPosition - state.hangerPosition;
        targetPos = this.canSetBoundMode() ? clamp(targetPos, state.scrollArea.prev, state.scrollArea.next) : targetPos;
        state.index = panel.index;
        axesEvent && axesEvent.setTo ? axesEvent.setTo({
          flick: targetPos
        }, duration) : this.axes.setTo({
          flick: targetPos
        }, duration);
      };

      __proto.moveCamera = function (pos) {
        var state = this.state;
        var transform = state.translate.name;
        var moveVector = this.options.horizontal ? [-pos, 0] : [0, -pos];
        var moveCoord = moveVector.map(function (coord) {
          return Math.round(coord) + "px";
        }).join(", ");
        this.cameraElement.style[transform] = state.translate.has3d ? "translate3d(" + moveCoord + ", 0px)" : "translate(" + moveCoord + ")"; // Update position

        state.position = pos;
      };

      __proto.resize = function () {
        this.updateSize();
        this.updateOriginalPanelPositions();
        this.updateAdaptiveSize();
        this.updateScrollArea(); // Clone panels in circular mode

        if (this.options.circular) {
          this.clonePanels();
          this.relocatePanels();
        }

        this.chainPanels();
        this.updateCameraPosition();
      }; // Find nearest anchor from current hanger position


      __proto.findNearestPanel = function () {
        var state = this.state;
        var panels = this.panels;
        var clonedPanels = this.clonedPanels;
        var scrollArea = state.scrollArea;
        var currentHangerPosition = state.position + state.hangerPosition;

        if (this.isOutOfBound()) {
          return state.position < scrollArea.prev ? panels[0] : panels[panels.length - 1];
        }

        var allPanels = panels.concat(clonedPanels);
        var minimumDistance = Infinity;
        var nearestPanel;

        for (var _i = 0, allPanels_1 = allPanels; _i < allPanels_1.length; _i++) {
          var panel = allPanels_1[_i];
          var prevPosition = panel.getPosition();
          var nextPosition = prevPosition + panel.getSize(); // Use shortest distance from panel's range

          var distance = isBetween(currentHangerPosition, prevPosition, nextPosition) ? 0 : Math.min(Math.abs(prevPosition - currentHangerPosition), Math.abs(nextPosition - currentHangerPosition));

          if (distance > minimumDistance) {
            break;
          }

          minimumDistance = distance;
          nearestPanel = panel;
        }

        return nearestPanel;
      };

      __proto.findPanelOf = function (element) {
        for (var _i = 0, _a = this.panels.concat(this.clonedPanels); _i < _a.length; _i++) {
          var panel = _a[_i];
          var panelElement = panel.getElement();

          if (panelElement.contains(element)) {
            return panel;
          }
        }
      };

      __proto.findNearestIdenticalPanel = function (panel) {
        var state = this.state;
        var nearest = panel;
        var shortestDistance = Infinity;
        var hangerPosition = state.position + state.hangerPosition;
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
        var distance = Math.abs(state.position + state.hangerPosition - anchorPosition);
        var scrollAreaSize = state.scrollArea.next - state.scrollArea.prev;

        if (!options.circular) {
          var position = anchorPosition - state.hangerPosition;
          return this.canSetBoundMode() ? clamp(position, state.scrollArea.prev, state.scrollArea.next) : position;
        } else {
          // If going out of viewport border is more efficient way of moving, choose that position
          return distance <= scrollAreaSize - distance ? anchorPosition - state.hangerPosition : anchorPosition > state.position + state.hangerPosition // PREV TO NEXT
          ? anchorPosition - state.hangerPosition - scrollAreaSize // NEXT TO PREV
          : anchorPosition - state.hangerPosition + scrollAreaSize;
        }
      };

      __proto.enable = function () {
        this.panInput.enable();
      };

      __proto.disable = function () {
        this.panInput.disable();
      };

      __proto.updateAdaptiveSize = function () {
        var options = this.options;
        var horizontal = options.horizontal;
        var sizeToApply;

        if (options.adaptive) {
          var currentPanel = this.getCurrentPanel();
          var panelBbox = currentPanel.getBbox();
          sizeToApply = horizontal ? panelBbox.height : panelBbox.width;
        } else {
          // Find minimum height of panels to maximum panel size
          var maximumPanelSize = this.panels.reduce(function (maximum, panel) {
            var panelBbox = panel.getBbox();
            return Math.max(maximum, horizontal ? panelBbox.height : panelBbox.width);
          }, 0);
          sizeToApply = maximumPanelSize;
        }

        var viewportStyle = this.viewportElement.style;

        if (horizontal) {
          viewportStyle.height = sizeToApply + "px";
          viewportStyle.minHeight = "100%";
          viewportStyle.width = "100%";
        } else {
          viewportStyle.width = sizeToApply + "px";
          viewportStyle.minWidth = "100%";
          viewportStyle.height = "100%";
        }
      };

      __proto.destroy = function () {
        var viewportElement = this.viewportElement;
        var wrapper = viewportElement.parentElement;
        wrapper.removeChild(viewportElement);
        this.axes.destroy();
        this.panInput.destroy();
        this.panels.forEach(function (panel) {
          wrapper.appendChild(panel.getElement());
          panel.destroy();
        }); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.restore = function (status) {
        var panels = status.panels;
        var cameraElement = this.cameraElement; // Replace all panels inside camera element

        cameraElement.innerHTML = panels.map(function (panel) {
          return panel.html;
        }).join("");
        this.viewportElement.appendChild(cameraElement); // Resotre index & resize

        this.state.index = status.index;
        this.moveCamera(status.position);
        this.panels = [];
        this.clonedPanels = [];
        this.createPanels();
        this.resize();
      };

      __proto.getPanelCount = function () {
        return this.panels.length;
      };

      __proto.getPanel = function (index) {
        if (!isBetween(index, 0, this.panels.length - 1)) {
          return null;
        }

        return this.panels[index];
      };

      __proto.getCurrentPanel = function () {
        return this.panels[this.state.index];
      };

      __proto.getIndex = function () {
        return this.state.index;
      };

      __proto.getPrevIndex = function () {
        var state = this.state;
        var index = state.index - 1;

        if (index < 0) {
          index = this.options.circular ? this.panels.length - 1 : -1;
        }

        return index;
      };

      __proto.getNextIndex = function () {
        var state = this.state;
        var index = state.index + 1;

        if (index >= this.panels.length) {
          index = this.options.circular ? 0 : -1;
        }

        return index;
      };

      __proto.getSize = function () {
        return this.state.size;
      };

      __proto.getScrollArea = function () {
        return this.state.scrollArea;
      };

      __proto.getScrollAreaSize = function () {
        var scrollArea = this.state.scrollArea;
        return scrollArea.next - scrollArea.prev;
      };

      __proto.getHangerPosition = function () {
        return this.state.hangerPosition;
      };

      __proto.getCameraPosition = function () {
        return this.state.position;
      };

      __proto.getAllPanels = function (includeClone) {
        var panels = this.panels;
        return includeClone ? panels.concat(this.clonedPanels) : panels;
      };

      __proto.connectAxesHandler = function (handler) {
        var axes = this.axes;
        this.axesHandlers = handler;
        axes.on(handler);
        this.resume();
      };

      __proto.pause = function () {
        this.axes.off();
      };

      __proto.resume = function () {
        this.axes.on(this.axesHandlers);
      };

      __proto.build = function () {
        this.applyCSSValue();
        this.setAxesInstance();
        this.createPanels();
        this.resize();
        this.moveToDefaultPanel();
      };

      __proto.applyCSSValue = function () {
        var options = this.options;
        var viewportElement = this.viewportElement;
        var cameraElement = this.cameraElement;
        var classPrefix = options.classPrefix; // Set default css values for each element

        viewportElement.className = classPrefix + "-viewport";
        cameraElement.className = classPrefix + "-camera";
        applyCSS(viewportElement, DEFAULT_VIEWPORT_CSS);
        applyCSS(cameraElement, DEFAULT_CAMERA_CSS);

        if (options.zIndex) {
          viewportElement.style.zIndex = "" + options.zIndex;
        }

        if (options.overflow) {
          viewportElement.style.overflow = "visible";
        }
      };

      __proto.setAxesInstance = function () {
        var state = this.state;
        var options = this.options;
        var scrollArea = state.scrollArea;
        var horizontal = options.horizontal;
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
        this.panInput = this.makeNewPanInput();
        this.axes.connect(horizontal ? ["flick", ""] : ["", "flick"], this.panInput);
      };

      __proto.createPanels = function () {
        var state = this.state;
        var options = this.options; // Panel elements were attached to camera element by Flicking class

        var panelElements = this.cameraElement.children;

        if (!panelElements || !panelElements.length) {
          throw new Error("There're no panel elements.");
        } // Initialize panels


        this.panels = toArray(panelElements).map(function (el, idx) {
          return new Panel(el, idx, {
            horizontal: options.horizontal,
            classPrefix: options.classPrefix,
            anchorExpression: options.anchor
          });
        }); // Clamp default index

        state.index = clamp(state.index, 0, this.panels.length - 1);
      };

      __proto.clonePanels = function () {
        var _this = this;

        var state = this.state;
        var panels = this.panels;
        var clonedPanels = this.clonedPanels;
        var viewportSize = state.size;
        var lastPanel = panels[panels.length - 1];
        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() + this.options.gap;
        var visibleAreaSize = viewportSize + panels[0].getRelativeAnchorPosition(); // For each panels, clone itself while last panel's position + size is below viewport size

        var lastClonedPanel = clonedPanels[clonedPanels.length - 1];
        var cloneCount = Math.ceil(visibleAreaSize / sumOriginalPanelSize);
        var prevCloneCount = lastClonedPanel ? lastClonedPanel.getCloneIndex() + 1 : 0;

        if (cloneCount > prevCloneCount) {
          var _loop_1 = function (cloneIndex) {
            panels.forEach(function (origPanel) {
              var clonedPanel = origPanel.clone(cloneIndex);

              _this.appendPanelElement(clonedPanel.getElement());

              clonedPanels.push(clonedPanel);
            });
          }; // should clone more


          for (var cloneIndex = prevCloneCount; cloneIndex < cloneCount; cloneIndex++) {
            _loop_1(cloneIndex);
          }
        } else if (cloneCount < prevCloneCount) {
          // should remove some
          panels.forEach(function (panel) {
            panel.removeClonedPanelsAfter(cloneCount);
          });
          this.clonedPanels.splice(cloneCount * panels.length);
        }
      };

      __proto.relocatePanels = function () {
        var state = this.state;
        var options = this.options;
        var panels = this.panels;
        var clonedPanels = this.clonedPanels;
        var scrollArea = state.scrollArea;
        var maximumNextVisiblePosition = scrollArea.next + state.size;
        var minimumPrevVisiblePosition = scrollArea.prev;
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];

        if (!firstPanel) {
          return;
        }

        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() + options.gap; // Locate all cloned panels linearly first

        for (var _i = 0, clonedPanels_1 = clonedPanels; _i < clonedPanels_1.length; _i++) {
          var panel = clonedPanels_1[_i];
          var origPanel = panel.getIdenticalPanels()[0];
          var cloneIndex = panel.getCloneIndex();
          var cloneBasePos = sumOriginalPanelSize * (cloneIndex + 1);
          var clonedPanelPos = cloneBasePos + origPanel.getPosition();
          panel.setPosition(clonedPanelPos);
        }

        var lastReplacePosition = firstPanel.getPosition(); // reverse() pollutes original array, so copy it with concat()

        for (var _a = 0, _b = clonedPanels.concat().reverse(); _a < _b.length; _a++) {
          var panel = _b[_a];
          var panelPosition = panel.getPosition();
          var panelSize = panel.getSize();
          var replacePosition = lastReplacePosition - panelSize - options.gap;

          if (panelPosition <= maximumNextVisiblePosition) {
            // It's visible in current scrollArea
            break;
          }

          panel.setPosition(replacePosition);
          lastReplacePosition = replacePosition;
        }
      };

      __proto.chainPanels = function () {
        var allPanels = this.panels.concat(this.clonedPanels);
        allPanels.forEach(function (panel, idx) {
          var prevPanel = idx > 0 ? allPanels[idx - 1] : null;
          var nextPanel = idx < allPanels.length - 1 ? allPanels[idx + 1] : null;
          panel.setPrevPanel(prevPanel);
          panel.setNextPanel(nextPanel);
        });

        if (this.options.circular) {
          var firstPanel = allPanels[0];
          var lastPanel = allPanels[allPanels.length - 1];
          firstPanel.setPrevPanel(lastPanel);
          lastPanel.setNextPanel(firstPanel);
        }
      };

      __proto.moveToDefaultPanel = function () {
        var state = this.state;
        var defaultIndex = clamp(this.options.defaultIndex, 0, this.panels.length - 1);
        var defaultPanel = this.panels[defaultIndex];
        var defaultPosition = defaultPanel.getAnchorPosition() - state.hangerPosition;
        defaultPosition = this.canSetBoundMode() ? clamp(defaultPosition, state.scrollArea.prev, state.scrollArea.next) : defaultPosition;
        state.index = defaultIndex;
        this.moveCamera(defaultPosition);
        this.axes.setTo({
          flick: defaultPosition
        }, 0);
      };

      __proto.isOutOfBound = function () {
        var state = this.state;
        var scrollArea = state.scrollArea;
        return !this.options.circular && (state.position < scrollArea.prev || state.position > scrollArea.next);
      };

      __proto.canSetBoundMode = function () {
        var state = this.state;
        var options = this.options;
        var panels = this.panels;
        var lastPanel = panels[panels.length - 1];
        var summedPanelSize = lastPanel.getPosition() + lastPanel.getSize();
        return options.bound && !options.circular && summedPanelSize >= state.size;
      };

      __proto.updateSize = function () {
        var state = this.state;
        var options = this.options;
        var viewportElement = this.viewportElement;

        if (!options.horizontal) {
          // Don't preserve previous width for adaptive resizing
          viewportElement.style.width = "";
          viewportElement.style.minWidth = "";
        }

        var bbox = viewportElement.getBoundingClientRect(); // update size & hanger position

        state.size = options.horizontal ? bbox.width : bbox.height;
        state.hangerPosition = parseArithmeticExpression(options.hanger, state.size);
      };

      __proto.updateOriginalPanelPositions = function () {
        var gap = this.options.gap;
        var panels = this.panels; // Update panel position && fit to wrapper

        var nextPanelPos = 0;
        panels.forEach(function (panel) {
          panel.resize();
          var panelPos = nextPanelPos;
          var panelSize = panel.getSize();
          panel.setPosition(panelPos);
          nextPanelPos += panelSize + gap;
        });
      };

      __proto.updateScrollArea = function () {
        var state = this.state;
        var panels = this.panels;
        var options = this.options;
        var axes = this.axes; // Set viewport scrollable area

        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var hangerPos = state.hangerPosition;

        if (this.canSetBoundMode()) {
          state.scrollArea = {
            prev: firstPanel.getPosition(),
            next: lastPanel.getPosition() + lastPanel.getSize() - state.size
          };
        } else if (options.circular) {
          var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() + options.gap; // Maximum scroll extends to first clone sequence's first panel

          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - hangerPos,
            next: sumOriginalPanelSize + firstPanel.getRelativeAnchorPosition() - hangerPos
          };
        } else {
          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - hangerPos,
            next: lastPanel.getAnchorPosition() - hangerPos
          };
        }

        var viewportSize = state.size;
        var bounce = options.bounce;
        var parsedBounce = bounce;

        if (isArray(bounce)) {
          parsedBounce = bounce.map(function (val) {
            return parseArithmeticExpression(val, viewportSize, DEFAULT_OPTIONS.bounce);
          });
        } else {
          var parsedVal = parseArithmeticExpression(bounce, viewportSize, DEFAULT_OPTIONS.bounce);
          parsedBounce = [parsedVal, parsedVal];
        } // Update axes range and bounce


        axes.axis.flick.range = [state.scrollArea.prev, state.scrollArea.next];
        axes.axis.flick.bounce = parsedBounce;
      };

      __proto.updateCameraPosition = function () {
        var state = this.state;
        var panels = this.panels;
        var axes = this.axes;
        var newPosition = panels[state.index].getAnchorPosition() - state.hangerPosition;

        if (this.canSetBoundMode()) {
          newPosition = clamp(newPosition, state.scrollArea.prev, state.scrollArea.next);
        }

        this.moveCamera(newPosition); // Pause & resume axes to prevent axes's "change" event triggered

        this.pause();
        axes.setTo({
          flick: newPosition
        }, 0);
        this.resume();
      };

      __proto.makeNewPanInput = function () {
        var options = this.options;
        return new Axes.PanInput(this.viewportElement, {
          inputType: options.inputType,
          thresholdAngle: options.thresholdAngle,
          scale: options.horizontal ? [-1, 0] : [0, -1]
        });
      };

      __proto.appendPanelElement = function (element) {
        this.cameraElement.appendChild(element);
      };

      return Viewport;
    }();

    var State =
    /*#__PURE__*/
    function () {
      function State() {
        this.delta = 0;
        this.direction = null;
        this.targetPanel = null;
      }

      var __proto = State.prototype;

      __proto.onEnter = function (prevState) {
        this.delta = prevState.delta;
        this.direction = prevState.direction;
        this.targetPanel = prevState.targetPanel;
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
      };

      __proto.onHold = function (e, _a) {
        var triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo;
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
          // Which means at least one move event should be included between holdStart and holdEnd
          e.setTo({
            flick: viewport.getCameraPosition()
          }, 0);
          transitTo(STATE_TYPE.IDLE);
          return;
        } // Can't be handle select event here,
        // As "finish" axes event happens


        this.releaseEvent = e;
      };

      __proto.onFinish = function (e, _a) {
        var viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo,
            castToReadonlyPanel = _a.castToReadonlyPanel; // Should transite to IDLE state before select event
        // As user expects hold is already finished

        transitTo(STATE_TYPE.IDLE);

        if (!this.releaseEvent) {
          return;
        } // Handle release event here
        // To prevent finish event called twice


        var releaseEvent = this.releaseEvent; // Static click

        var clickedElement = releaseEvent.inputEvent.srcEvent.target;
        var clickedPanel = viewport.findPanelOf(clickedElement);
        var cameraPosition = viewport.getCameraPosition();

        if (clickedPanel) {
          var clickedPanelPosition = clickedPanel.getPosition();
          var direction = clickedPanelPosition > cameraPosition ? DIRECTION.NEXT : clickedPanelPosition < cameraPosition ? DIRECTION.PREV : null; // Don't provide axes event, to use axes instance instead

          triggerEvent(EVENTS.SELECT, null, true, {
            direction: direction,
            selectedIndex: clickedPanel.getIndex(),
            selectedPanel: castToReadonlyPanel(clickedPanel)
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

      __proto.onEnter = function (prevState) {
        _super.prototype.onEnter.call(this, prevState);

        this.delta = 0;
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

      __proto.onRelease = function (e, context) {
        var flicking = context.flicking,
            viewport = context.viewport,
            triggerEvent = context.triggerEvent,
            moveToPanel = context.moveToPanel,
            castToReadonlyPanel = context.castToReadonlyPanel,
            transitTo = context.transitTo,
            stopCamera = context.stopCamera;
        var delta = this.delta;
        var options = flicking.options;
        var isNext = delta > 0;
        var swipeDistance = Math.abs(delta);
        var swipeAngle = e.inputEvent.deltaX ? Math.abs(180 * Math.atan(e.inputEvent.deltaY / e.inputEvent.deltaX) / Math.PI) : 90;
        var overThreshold = swipeDistance >= options.threshold && (options.horizontal ? swipeAngle <= options.thresholdAngle : swipeAngle > options.thresholdAngle);
        triggerEvent(EVENTS.HOLD_END, e, true);

        if (!overThreshold && this.targetPanel) {
          // Interrupted while animating
          viewport.moveTo(this.targetPanel, e);
          transitTo(STATE_TYPE.ANIMATING);
          return;
        }

        var currentPanel = viewport.getCurrentPanel();
        var hangerPosition = viewport.getCameraPosition() + viewport.getHangerPosition();
        var halfGap = options.gap / 2; // Minimum distance needed to decide prev/next panel as nearest

        /*
        * |  Prev  |     Next     |
        * |--------|--------------|
        * [][      |<-Anchor    ][] <- Panel + Gap
        */

        var minimumDistanceToChange = isNext ? currentPanel.getSize() - currentPanel.getRelativeAnchorPosition() + halfGap : currentPanel.getRelativeAnchorPosition() + halfGap;
        minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);
        var flick = Math.abs(e.delta.flick);
        var snap = options.snap;
        var durationOption = options.duration;
        var duration;
        var panelToMove = castToReadonlyPanel(currentPanel);

        if (overThreshold) {
          var count = 0;

          if (minimumDistanceToChange <= flick) {
            var position = panelToMove.position;

            while (Math.abs(panelToMove.position - position) < flick && count < snap) {
              var nextPanel = isNext ? panelToMove.next() : panelToMove.prev();

              if (!nextPanel) {
                break;
              }

              panelToMove = nextPanel;
              ++count;
            }

            count > 1 && (duration = Math.min(durationOption * count, Math.max(e.duration, durationOption)));
          }

          if (count <= 1) {
            if (swipeDistance <= minimumDistanceToChange) {
              var adjacentPanel = isNext ? currentPanel.getNextPanel() : currentPanel.getPrevPanel();

              if (options.circular) {
                var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
                var lapped = Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

                if (lapped) {
                  adjacentPanel = isNext ? firstClonedPanel.getNextPanel() : firstClonedPanel.getPrevPanel();
                }
              }

              panelToMove = castToReadonlyPanel(adjacentPanel != null ? adjacentPanel : currentPanel);
            } else {
              panelToMove = castToReadonlyPanel(viewport.findNearestPanel());
            }
          }
        } else if (options.circular) {
          // Restore case
          var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
          var lapped = Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

          if (!isNext && lapped) {
            panelToMove = castToReadonlyPanel(firstClonedPanel);
          }
        }

        var eventType = !overThreshold || !options.circular && panelToMove.position === currentPanel.getPosition() ? EVENTS.RESTORE : EVENTS.CHANGE;
        moveToPanel(panelToMove, eventType, e, duration).onSuccess(function () {
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
        var triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo;
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
        triggerEvent(EVENTS.MOVE_END, e, isTrusted);

        if (flicking.options.adaptive) {
          viewport.updateAdaptiveSize();
        }

        transitTo(STATE_TYPE.IDLE);
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

      __proto.onRelease = function (e, _a) {
        var transitTo = _a.transitTo; // This is needed when stopped hold start event

        if (e.delta.flick === 0) {
          transitTo(STATE_TYPE.IDLE);
        }
      };

      return DisabledState;
    }(State);

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
     * @memberof eg
     * @extends eg.Component
     * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
     * @requires {@link https://github.com/naver/egjs-component|eg.Component}
     * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
     * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
     * @throws {Error} An Error occur when given base element doesn't exist or it hasn't proper DOM structure to be initialized. <ko>주어진 기본 요소가 존재하지 않거나 초기화 할 적절한 DOM 구조가없는 경우 오류가 발생한다.</ko>
     */

    var Flicking =
    /*#__PURE__*/
    function (_super) {
      __extends(Flicking, _super);
      /**
       * @param element A base element for the eg.Flicking module. When specifying a value as a `string` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `string`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
       * @param options The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
       * @param {string} [options.classPrefix="eg-flick"] A prefix for class names of the panels, viewport and camera.<ko>패널들과 뷰포트, 카메라 클래스 이름의 접두사.</ko>
       * @param {number} [options.deceleration=0.0006] Deceleration value for panel movement animation where acceleration is manually enabled by user. Higher value means shorter running time.<ko>사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
       * @param {boolean} [options.horizontal=true] Direction of panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true: 가로방향, false: 세로방향)</ko>
       * @param {boolean} [options.circular=false] Enables circular mode, which connects first/last panel for infinite scrolling<ko>순환 모드를 활성화한다. 순환 모드에서는 양 끝의 패널이 서로 연결되여 무한 스크롤이 가능하다.</ko>
       * @param {number} [options.threshold=40] Movement threshold to destination panel(unit: pixel). A panel element must be dragged beyond the threshold to move to the destination panel.<ko>목적 패널로의 이동 임계값 (단위: 픽셀). 패널 요소를 임계값 이상으로 끌어다 놓아야만이 목적 패널로 이동한다.</ko>
       * @param {number} [options.duration=100] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @param {function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] The easing function to apply to a panel moving animation. The default function is easeOutCubic.<ko>패널 이동 애니메이션에 적용할 `easing`함수. 기본값은 `easeOutCubic`이다.</ko>
       * @param {number} [options.defaultIndex=0] Index of panel to set as default when initializing the module. A zero-based integer.<ko>모듈 초기화시 지정할 디폴트 패널의 인덱스로, 0부터 시작하는 정수.</ko>
       * @param {string[]} [options.inputType=["touch,"mouse"]] Types of input devices. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput Reference})<br>- "touch": A touch input device.<br>- "mouse": A mouse.<ko>입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput 참고})<br>- "touch": 터치 입력 장치.<br>- "mouse": 마우스.</ko>
       * @param {number} [options.thresholdAngle=45] The threshold value that determines whether user input is horizontal or vertical. (0 ~ 90)<ko>사용자의 입력이 가로 방향인지 세로 방향인지 판단하는 기준 각도 (0 ~ 90)</ko>
       * @param {number|string|number[]|string[]} [options.bounce=[10,10]] The size value of the bounce area. Only can be enabled when `circular=false`<ko>바운스 영역의 크기값. `circular=false`인 경우에만 사용할 수 있다.</ko>
       * @param {Boolean} [options.adaptive=false] Whether the height(horizontal)/width(vertical) of the viewport element reflects the height/width value of the panel after completing the movement.<ko>목적 패널로 이동한 후 그 패널의 높이(horizontal)/너비(vertical)값을 뷰포트 요소의 높이/너비값에 반영할지 여부.</ko>
       * @param {number} [options.zIndex=2000] z-index value for viewport element<ko>뷰포트 요소의 z-index 값</ko>
       * @param {boolean} [options.bound=false] Prevents view going out of first/last panel. Only can be enabled when `circular=false`.<ko>뷰가 첫번째와 마지막 패널 밖으로 나가는 것을 막아준다. `circular=false`인 경우에만 사용할 수 있다.</ko>
       * @param {boolean} [options.overflow=false] Disables CSS property `overflow: hidden` in viewport if `true`.<ko>`true`로 설정시 뷰포트에 `overflow: hidden` 속성을 해제한다.</ko>
       * @param {string} [options.hanger="50%"] Position of hanger in viewport, which hangs panel anchors.<br>Should be provided in px or % value of viewport size.<br>You can combinate those values with plus/minus sign<br>ex) "50", "100px", "0%", "25% + 100px"<ko>뷰포트 내부의 행어의 위치. 패널의 앵커들이 뷰포트 내에서 멈추는 지점에 해당한다.<br>px값이나, 뷰포트의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {string} [options.anchor="50%"] Position of anchor in panels, which can be hanged by viewport hanger.<br>Should be provided in px or % value of panel size.<br>You can combinate those values with plus/minus sign<br>ex) "50", "100px", "0%", "25% + 100px"<ko>패널 내부의 앵커의 위치. 뷰포트의 행어와 연계하여 패널이 화면 내에서 멈추는 지점을 설정할 수 있다.<br>px값이나, 패널의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       */


      function Flicking(element, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.plugins = [];

        _this.triggerEvent = function (eventName, axesEvent, isTrusted, params) {
          if (params === void 0) {
            params = {};
          }

          var viewport = _this.viewport;

          var state = _this.stateMachine.getState();

          var currentPanel = viewport.getCurrentPanel();

          var _a = viewport.getScrollArea(),
              prev = _a.prev,
              next = _a.next;

          var pos = viewport.getCameraPosition();
          var progress = getProgress(pos, [prev, prev, next]);

          if (_this.options.circular) {
            progress %= 1;
          }

          var canceled = !_super.prototype.trigger.call(_this, eventName, merge({
            type: eventName,
            index: currentPanel.getIndex(),
            panel: _this.castToReadonlyPanel(currentPanel),
            direction: state.direction,
            holding: state.holding,
            progress: progress,
            axesEvent: axesEvent,
            isTrusted: isTrusted
          }, params));
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

          var state = _this.stateMachine.getState();

          var options = _this.options;
          var pos = axesEvent.pos.flick;

          if (axesEvent.isTrusted && state.holding) {
            var inputOffset = options.horizontal ? axesEvent.inputEvent.offsetX : axesEvent.inputEvent.offsetY;
            var isNext = inputOffset < 0;
            var prevPos = viewport.getCameraPosition();
            var cameraChange = pos - prevPos;
            var looped = isNext === pos < prevPos;

            if (options.circular && looped) {
              // Reached at max/min range of axes
              var scrollAreaSize = viewport.getScrollAreaSize();
              cameraChange = -Math.sign(cameraChange) * (scrollAreaSize - Math.abs(cameraChange));
            }

            var currentDirection = cameraChange === 0 ? state.direction : cameraChange > 0 ? DIRECTION.NEXT : DIRECTION.PREV;
            state.delta += cameraChange;
            state.direction = currentDirection;
          }

          var previousPosition = viewport.getCameraPosition();
          viewport.moveCamera(pos);
          return _this.triggerEvent(EVENTS.MOVE, axesEvent, axesEvent.isTrusted).onStopped(function () {
            // Undo camera movement
            viewport.moveCamera(previousPosition);
          });
        };

        _this.stopCamera = function (axesEvent) {
          var viewport = _this.viewport;

          if (axesEvent && axesEvent.setTo) {
            axesEvent.setTo({
              flick: viewport.getCameraPosition()
            }, 0);
          }

          _this.stateMachine.transitTo(STATE_TYPE.IDLE);
        };

        _this.moveToPanel = function (panel, eventType, axesEvent, duration) {
          if (duration === void 0) {
            duration = _this.options.duration;
          }

          var viewport = _this.viewport;
          var stateMachine = _this.stateMachine;
          var currentPanel = viewport.getCurrentPanel();
          var estimatedPosition = panel.anchorPosition - viewport.getHangerPosition();
          var currentPosition = viewport.getCameraPosition();
          var isTrusted = axesEvent !== null;
          var direction = estimatedPosition > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;
          var eventResult;

          if (eventType === EVENTS.CHANGE) {
            eventResult = _this.triggerEvent(EVENTS.CHANGE, axesEvent, isTrusted, {
              index: panel.index,
              panel: panel,
              direction: direction,
              prevIndex: currentPanel.getIndex(),
              prevPanel: _this.castToReadonlyPanel(currentPanel)
            });
          } else {
            eventResult = _this.triggerEvent(EVENTS.RESTORE, axesEvent, isTrusted);
          }

          eventResult.onSuccess(function () {
            var state = stateMachine.getState();
            state.targetPanel = panel;
            state.direction = direction;
            viewport.moveTo(panel, axesEvent, duration);
          }); // Move end event can't be triggered automatically when duration is 0
          // as Axes won't trigger animationEnd or finish event
          // so manually trigger finish event

          if (duration <= 0) {
            stateMachine.fire(AXES_EVENTS.FINISH, null, _this.eventContext);
          }

          return eventResult;
        };

        _this.castToReadonlyPanel = function (panel, position) {
          if (position === void 0) {
            position = panel.getPosition();
          }

          var flicking = _this;
          var isCircular = _this.options.circular;
          var viewport = _this.viewport;
          var size = panel.getSize();
          var relativeAnchorPosition = panel.getRelativeAnchorPosition();
          var cameraPosition = viewport.getCameraPosition();
          var realtiveHangerPosition = viewport.getHangerPosition();
          var cameraDist = cameraPosition + realtiveHangerPosition;

          var nearestPanel = _this.viewport.findNearestPanel();

          var isNext = nearestPanel.getPosition() >= cameraDist || !nearestPanel.getNextPanel();
          var prevPanel = (isNext ? nearestPanel.getPrevPanel() : nearestPanel) || nearestPanel;
          var nextPanel = (isNext ? nearestPanel : nearestPanel.getNextPanel()) || nearestPanel;
          var scrollSize = viewport.getScrollAreaSize();
          var prevAnchorPosition = prevPanel.getAnchorPosition();
          var nextAnchorPosition = nextPanel.getAnchorPosition();

          if (prevAnchorPosition > nextAnchorPosition) {
            // last to first or first to last
            if (cameraDist > prevAnchorPosition) {
              nextAnchorPosition += scrollSize;
            } else {
              prevAnchorPosition -= scrollSize;
            }
          }

          var range = [prevAnchorPosition, prevAnchorPosition, nextAnchorPosition];
          var outsetRange = [-size, realtiveHangerPosition - relativeAnchorPosition, viewport.getSize()]; // single

          var panelCount = _this.getPanelCount();

          var prevCloneIndex = prevPanel.getCloneIndex();
          var relativeIndex = (isCircular ? Math.floor(position / scrollSize) * panelCount : 0) + panel.getIndex();
          var progress = relativeIndex - getProgress(cameraDist, range) - (prevPanel.getIndex() + (prevCloneIndex + 1) * panelCount); // outset

          var relativePanelPosition = position - cameraPosition;
          var outsetProgress = getProgress(relativePanelPosition, outsetRange);
          return {
            element: panel.getElement(),
            index: panel.getIndex(),
            position: position,
            progress: progress,
            outsetProgress: outsetProgress,
            anchorPosition: position + panel.getRelativeAnchorPosition(),
            size: panel.getSize(),
            focus: function (duration) {
              var hangerPosition = viewport.getCameraPosition() + viewport.getHangerPosition();
              var anchorPosition = panel.getAnchorPosition();

              if (hangerPosition === anchorPosition) {
                return;
              }

              flicking.moveToPanel(this, EVENTS.CHANGE, null, duration);
            },
            update: function (updateFunction) {
              panel.getIdenticalPanels().forEach(function (eachPanel) {
                return updateFunction(eachPanel.getElement());
              });
            },
            prev: function () {
              var originalPrevPanel = panel.getPrevPanel();

              if (originalPrevPanel == null) {
                return null;
              }

              var scrollAreaSize = viewport.getScrollAreaSize();
              var newPosition = originalPrevPanel.getPosition();

              while (position < newPosition) {
                newPosition -= scrollAreaSize;
              }

              return flicking.castToReadonlyPanel(originalPrevPanel, newPosition);
            },
            next: function () {
              var originalNextPanel = panel.getNextPanel();

              if (originalNextPanel == null) {
                return null;
              }

              var scrollAreaSize = viewport.getScrollAreaSize();
              var newPosition = originalNextPanel.getPosition();

              while (position > newPosition) {
                newPosition += scrollAreaSize;
              }

              return flicking.castToReadonlyPanel(originalNextPanel, newPosition);
            }
          };
        }; // Set flicking wrapper user provided


        var wrapper;

        if (typeof element === "string") {
          wrapper = document.querySelector(element);

          if (!wrapper) {
            throw new Error("Base element doesn't exist.");
          }
        } else if (element.nodeName && element.nodeType === 1) {
          wrapper = element;
        } else {
          throw new Error("Element should be provided in string or HTMLElement.");
        }

        _this.wrapper = wrapper;

        _this.build(options);

        return _this;
      }
      /**
       * Move to the previous panel. If `horizontal=true`is left panel. If `horizontal=false`is upper panel.
       * @ko 이전 패널로 이동한다. `horizontal=true`이면 좌측 패널. `horizontal=false`이면 상측 패널.
       * @param [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      var __proto = Flicking.prototype;

      __proto.prev = function (duration) {
        return this.moveTo(this.viewport.getPrevIndex(), duration);
      };
      /**
       * Move to the next panel. If `horizontal=true`is right panel. If `horizontal=false`is lower panel.
       * @ko 다음 패널로 이동한다. `horizontal=true`이면 우측 패널. `horizontal=false`이면 하측 패널.
       * @param [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.next = function (duration) {
        return this.moveTo(this.viewport.getNextIndex(), duration);
      };
      /**
       * Moves to the panel in the order specified in `index`. If `index` is equal to selected panel's index, no action is taken.
       * @ko `index`에 지정한 순서의 패널로 이동한다. `index`값이 현재 선택된 패널의 인덱스와 동일하다면, 아무 동작도 하지 않는다.
       * @param index The index number of the panel to be moved.<ko>이동할 패널의 인덱스 번호.</ko>
       * @param duration [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.moveTo = function (index, duration) {
        var viewport = this.viewport;
        var panel = viewport.getPanel(index);

        if (panel) {
          var state = this.stateMachine.getState();
          var currentIndex = viewport.getIndex();
          var canMove = state.type === STATE_TYPE.IDLE && panel.getIndex() !== currentIndex;

          if (!canMove) {
            return this;
          }

          var nearestPanel = this.castToReadonlyPanel(viewport.findNearestIdenticalPanel(panel));
          this.moveToPanel(nearestPanel, EVENTS.CHANGE, null, duration);
        }

        return this;
      };
      /**
       * Returns the index number of the selected panel.
       * @ko 현재 선택된 패널의 인덱스 번호를 반환한다.
       * @return Zero-based index number of the current panel element.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
       */


      __proto.getIndex = function () {
        return this.viewport.getIndex();
      };
      /**
       * Returns the index number of the previous panel.
       * @ko 현재 선택된 패널의 이전 패널의 인덱스 번호를 반환한다.
       * @return Zero-based index number of the previous panel.<br>When `circular` option is `false`, return -1 if selected panel is first panel.<ko>이전 패널 요소의 인덱스 번호. 0부터 시작하는 정수.<br>`circular`옵션이 `false`일 때 현재 선택된 패널이 첫번째 패널이라면 `-1`을 반환한다.</ko>
       */


      __proto.getPrevIndex = function () {
        return this.viewport.getPrevIndex();
      };
      /**
       * Returns the index number of the next panel.
       * @ko 현재 선택된 패널의 다음 패널의 인덱스 번호를 반환한다.
       * @return Zero-based index number of the next panel.<br>When `circular` option is `false`, return -1 if selected panel is last panel.<ko>다음 패널 요소의 인덱스 번호. 0부터 시작하는 정수.<br>`circular`옵션이 `false`일 때 현재 선택된 패널이 마지막 패널이라면 `-1`을 반환한다.</ko>
       */


      __proto.getNextIndex = function () {
        return this.viewport.getNextIndex();
      };
      /**
       * Returns the selected panel object
       * @ko 현재 선택된 패널의 오브젝트를 반환한다.
       * @return Selected panel object.<ko>선택된 패널 오브젝트</ko>
       */


      __proto.getCurrentPanel = function () {
        return this.castToReadonlyPanel(this.viewport.getCurrentPanel());
      };
      /**
       * Returns the panel object of given index
       * @ko 주어진 인덱스에 해당하는 패널의 오브젝트를 반환한다.
       * @return panel object of given index, `null` if it doesn't exists.<ko>주어진 인덱스에 해당하는 패널의 오브젝트, 해당 패널이 존재하지 않을 시 `null`.</ko>
       */


      __proto.getPanel = function (index) {
        var panel = this.viewport.getPanel(index);
        return panel ? this.castToReadonlyPanel(panel) : null;
      };
      /**
       * Returns all panel objects in flicking.
       * @ko 플리킹 안에 있는 모든 패널 오브젝트들을 반환한다.
       * @param - Check whether to include clone or not <ko>복사본을 포함할 건지 안 할 건지 확인한다</ko>
       * @return All panel objects <ko>플리킹 안에 있는 모든 패널 오브젝트들</ko>
       */


      __proto.getAllPanels = function (includeClone) {
        var _this = this;

        return this.viewport.getAllPanels(includeClone).map(function (panel) {
          return _this.castToReadonlyPanel(panel);
        });
      };
      /**
       * Returns the panel objects shown in the flicking area.
       * @ko 플리킹 영역에서 보여지는 패널 오브젝트들을 반환한다.
       * @return The panel objects shown in the flicking area. <ko>플리킹 영역에서 보여지는 패널 오브젝트들</ko>
       */


      __proto.getVisiblePanels = function () {
        return this.getAllPanels(true).filter(function (_a) {
          var outsetProgress = _a.outsetProgress;
          return outsetProgress > -1 && outsetProgress < 1;
        });
      };
      /**
       * Returns the total length of original panels
       * @ko 원본 패널의 개수를 반환한다.
       * @return Length of original panels.<ko>원본 패널의 개수</ko>
       */


      __proto.getPanelCount = function () {
        return this.viewport.getPanelCount();
      };
      /**
       * Checks whether the animated panel is playing.
       * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
       * @return Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
       */


      __proto.isPlaying = function () {
        return this.stateMachine.getState().playing;
      };
      /**
       * The input from the input device is not blocked so that the panel can be moved by the input device.
       * @ko 막았던 입력 장치로부터의 입력을 푼다.
       * @return  An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.enableInput = function () {
        this.viewport.enable();
        return this;
      };
      /**
       * The input from the input device is blocked so that the panel is not moved by the input device.
       * @ko 패널이 입력 장치에 의해 움직이지 않도록 입력 장치로부터의 입력을 막는다.
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.disableInput = function () {
        this.viewport.disable();
        return this;
      };
      /**
       * Get current flicking status. If the returned value is specified as a [setStatus()]{@link eg.Flicking#setStatus} method argument, it can be returned to its value status.
       * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메서드 인자로 지정하면 그 값 상태로 되돌릴 수 있다.
       * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function () {
        var panels = this.viewport.getAllPanels().map(function (panel) {
          return {
            html: panel.getElement().outerHTML,
            index: panel.getIndex()
          };
        });
        return {
          index: this.getIndex(),
          panels: panels,
          position: this.viewport.getCameraPosition()
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
       * Add plugins that can have different effects on Flicking
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가한다.
       * @param - The plugin(s) to add <ko>추가할 플러그인(들)</ko>
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.addPlugins = function (plugins) {
        var _this = this;

        var newPlugins = [].concat(plugins);
        newPlugins.forEach(function (plugin) {
          plugin.init(_this);
        });
        this.plugins = this.plugins.concat(newPlugins);
        return this;
      };
      /**
       * Remove plugins from Flicking
       * @ko 플리킹으로부터 플러그인들을 제거한다.
       * @param - The plugin(s) to remove <ko>제거 플러그인(들)</ko>
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.removePlugins = function (plugins) {
        var _this = this;

        var currentPlugins = this.plugins;
        var removedPlugins = [].concat(plugins);
        removedPlugins.forEach(function (plugin) {
          var index = currentPlugins.indexOf(plugin);
          index > -1 && currentPlugins.splice(index, 1);
          plugin.destroy(_this);
        });
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


      __proto.destroy = function () {
        var _this = this;

        this.off();
        this.viewport.destroy();
        this.plugins.forEach(function (plugin) {
          plugin.destroy(_this);
        }); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };
      /**
       * The horizontal or vertical length of the panel is updated according to the base element. If `horizontal=true` is horizontal. If `horizontal=false` is vertical.
       * @ko 패널의 가로 혹은 세로 길이를 기준요소에 맞춰 갱신한다. `horizontal=true`이면 가로, `horizontal=false`이면 세로.
       * @return An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.resize = function () {
        this.viewport.resize();
        return this;
      };

      __proto.build = function (options) {
        this.setInitialState(options);
        this.initViewport();
        this.listenInput();
        this.listenResize();
      };

      __proto.setInitialState = function (options) {
        // Override default options
        this.options = merge({}, DEFAULT_OPTIONS, options); // Set internal state machine

        this.stateMachine = new StateMachine();
      };

      __proto.initViewport = function () {
        var wrapper = this.wrapper;
        var options = this.options;
        var children = wrapper.children;

        if (!children || !children.length) {
          // FIXME: INFINITE FLICKING 구현시 삭제할 것
          throw new Error("Given base element doesn't have proper DOM structure to be initialized.");
        }

        var cameraElement = document.createElement("div"); // Make all panels to be a child of camera element
        // wrapper <- viewport <- camera <- panels[1...n]

        var firstChild = wrapper.firstChild;

        while (firstChild) {
          cameraElement.appendChild(firstChild);
          firstChild = wrapper.firstChild;
        } // Clipping area for camera element


        var viewportElement = document.createElement("div");
        viewportElement.appendChild(cameraElement); // Add viewport element to wrapper

        wrapper.appendChild(viewportElement); // Make viewport instance with panel container element

        this.viewport = new Viewport(viewportElement, cameraElement, options);
      };

      __proto.listenInput = function () {
        var flicking = this;
        var stateMachine = flicking.stateMachine; // Set event context

        flicking.eventContext = {
          flicking: flicking,
          viewport: flicking.viewport,
          transitTo: stateMachine.transitTo,
          triggerEvent: flicking.triggerEvent,
          moveCamera: flicking.moveCamera,
          stopCamera: flicking.stopCamera,
          moveToPanel: flicking.moveToPanel,
          castToReadonlyPanel: flicking.castToReadonlyPanel
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

        if (this.options.autoResize) {
          window.addEventListener("resize", function () {
            _this.resize();
          });
        }
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @example
       * eg.Flicking.VERSION;  // ex) 3.0.0
       * @memberof eg.Flicking
       */


      Flicking.VERSION = "3.0.0-beta2";
      /**
       * Direction constant - "PREV" or "NEXT"
       * @ko 방향 상수 - "PREV" 또는 "NEXT"
       * @example
       * eg.Flicking.DIRECTION.PREV; // "PREV"
       * eg.Flicking.DIRECTION.NEXT; // "NEXT"
       */

      Flicking.DIRECTION = DIRECTION;
      /**
       * Event types
       * @ko 이벤트 이름 문자열들을 담은 객체
       */

      Flicking.EVENTS = EVENTS;
      return Flicking;
    }(Component);

    return Flicking;

}));
//# sourceMappingURL=flicking.js.map
