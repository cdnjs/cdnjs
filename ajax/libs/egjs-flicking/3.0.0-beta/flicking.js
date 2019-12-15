/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking JavaScript library
@egjs/flicking project is licensed under the MIT license

https://github.com/naver/egjs-flicking
@version 3.0.0-dev
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
      return val >= min && val < max;
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

    var DEFAULT_OPTIONS = {
      classPrefix: "eg-flick",
      deceleration: 0.0006,
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
      adaptive: false,
      zIndex: 2000,
      bound: false,
      overflow: false,
      hanger: "50%",
      anchor: "50%"
    };
    var MOVING_STATE = {
      IDLE: "IDLE",
      HOLDING: "HOLDING",
      DRAGGING: "DRAGGING",
      MOVING: "MOVING",
      DISABLED: "DISABLED"
    };
    var DEFAULT_STATE = {
      options: DEFAULT_OPTIONS,
      currentPanelIndex: DEFAULT_OPTIONS.defaultIndex,
      movingDirection: undefined,
      movingState: MOVING_STATE.IDLE,
      moveStartTriggered: false,
      lastHoldingDelta: 0
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
    var DIRECTION = {
      PREV: "PREV",
      NEXT: "NEXT"
    };
    var TRANSFORM = checkTranslateSupport();

    var Panel =
    /*#__PURE__*/
    function () {
      function Panel(element, index, viewport, options) {
        this.element = element;
        this.viewport = viewport;
        this.state = {
          index: index,
          horizontal: options.horizontal,
          position: 0,
          anchorExpression: options.anchorExpression,
          relativeAnchorPosition: 0,
          size: 0,
          clonedPanels: [],
          isClone: false,
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

      __proto.update = function (updateFunction) {
        var state = this.state; // Call original's update function if current panel is cloned one

        if (state.isClone) {
          this.original.update(updateFunction);
          return;
        } // Call update function for all elements including cloned ones


        [this.element].concat(state.clonedPanels.map(function (panel) {
          return panel.element;
        })).forEach(updateFunction);
      };

      __proto.resize = function () {
        var state = this.state; // Removed cached bbox, as we're resizing

        state.cachedBbox = null;
        var bbox = this.getBbox();
        state.size = state.horizontal ? bbox.width : bbox.height;
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

      __proto.clone = function () {
        var state = this.state;
        var viewport = this.viewport;
        var cloneElement = this.element.cloneNode(true);
        var clonedPanel = new Panel(cloneElement, state.index, viewport, {
          anchorExpression: state.anchorExpression,
          horizontal: state.horizontal
        });
        clonedPanel.original = this;
        clonedPanel.state.isClone = true; // Can't calc size as it didn't appended to other element yet
        // So manually set size for it

        clonedPanel.state.size = state.size;
        viewport.appendPanelElement(cloneElement);
        state.clonedPanels.push(clonedPanel);
        return clonedPanel;
      };

      __proto.toReadonlyVersion = function () {
        var state = this.state;
        var originalPanel = this;
        return {
          element: this.element,
          index: state.index,
          position: state.position,
          anchorPosition: state.position + state.relativeAnchorPosition,
          size: state.size,
          focus: function (duration) {
            var viewport = originalPanel.viewport;
            var flicking = viewport.flicking;
            var hangerPosition = viewport.getCameraPosition() + viewport.getHangerPosition();
            var anchorPosition = state.position + state.relativeAnchorPosition;

            if (hangerPosition === anchorPosition) {
              return;
            }

            var direction = hangerPosition > anchorPosition ? DIRECTION.PREV : DIRECTION.NEXT;
            var changeCanceled = flicking.trigger(EVENTS.CHANGE, {
              index: this.index,
              panel: this,
              direction: direction,
              prevIndex: viewport.getIndex(),
              prevPanel: viewport.getCurrentPanel().toReadonlyVersion(),
              isTrusted: false
            });

            if (changeCanceled) {
              return;
            }

            originalPanel.viewport.moveTo(this, null, duration);

            if (duration != null && duration <= 0) {
              flicking.trigger(EVENTS.MOVE_END, {
                direction: direction,
                isTrusted: false
              });
            }
          },
          update: this.update.bind(this),
          prev: function () {
            var originalPrevPanel = originalPanel.prevPanel;

            if (originalPrevPanel == null) {
              return null;
            }

            var prevPanel = originalPrevPanel.toReadonlyVersion();

            if (this.position < prevPanel.position) {
              var newPosition = prevPanel.position;
              var scrollArea = originalPanel.viewport.getScrollArea();
              var scrollAreaSize = scrollArea.next - scrollArea.prev;

              do {
                newPosition -= scrollAreaSize;
              } while (this.position < newPosition);

              return merge({}, prevPanel, {
                position: newPosition,
                anchorPosition: newPosition + originalPrevPanel.state.relativeAnchorPosition
              });
            }

            return prevPanel;
          },
          next: function () {
            var originalNextPanel = originalPanel.nextPanel;

            if (originalNextPanel == null) {
              return null;
            }

            var nextPanel = originalNextPanel.toReadonlyVersion();

            if (this.position > nextPanel.position) {
              var newPosition = nextPanel.position;
              var scrollArea = originalPanel.viewport.getScrollArea();
              var scrollAreaSize = scrollArea.next - scrollArea.prev;

              do {
                newPosition += scrollAreaSize;
              } while (this.position > newPosition);

              return merge({}, nextPanel, {
                position: newPosition,
                anchorPosition: newPosition + originalNextPanel.state.relativeAnchorPosition
              });
            }

            return nextPanel;
          }
        };
      };

      return Panel;
    }();

    var Viewport =
    /*#__PURE__*/
    function () {
      function Viewport(viewportElement, cameraElement, options) {
        this.viewportElement = viewportElement;
        this.cameraElement = cameraElement;
        this.state = {
          index: options.defaultIndex,
          size: -1,
          position: 0,
          hangerPosition: 0,
          scrollArea: {
            prev: -1,
            next: -1
          },
          translate: TRANSFORM,
          options: options
        };
        this.build();
      }

      var __proto = Viewport.prototype;

      __proto.moveTo = function (panel, axesEvent, duration) {
        if (duration === void 0) {
          duration = this.state.options.duration;
        }

        var state = this.state;
        var targetPos = panel.anchorPosition - state.hangerPosition;
        targetPos = this.canSetBoundMode() ? clamp(targetPos, state.scrollArea.prev, state.scrollArea.next) : targetPos;
        state.index = panel.index;
        axesEvent ? axesEvent.setTo({
          flick: targetPos
        }, duration) : this.axes.setTo({
          flick: targetPos
        }, duration);
      };

      __proto.moveCamera = function (pos) {
        var state = this.state;
        pos = Math.round(pos);
        var transform = state.translate.name;
        var moveVector = state.options.horizontal ? [-pos, 0] : [0, -pos];
        var moveCoord = moveVector.map(function (coord) {
          return coord + "px";
        }).join(", ");
        this.cameraElement.style[transform] = state.translate.has3d ? "translate3d(" + moveCoord + ", 0px)" : "translate(" + moveCoord + ")"; // Update position

        state.position = pos;
      };

      __proto.resize = function () {
        var bbox = this.viewportElement.getBoundingClientRect();
        var state = this.state;
        var options = state.options;
        var panels = this.panels;
        panels.forEach(function (panel) {
          return panel.resize();
        });
        this.adjustSize();
        state.size = state.options.horizontal ? bbox.width : bbox.height;
        state.hangerPosition = parseArithmeticExpression(options.hanger, state.size); // Set viewport scrollable area

        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var hangerPos = state.hangerPosition; // TODO: Consider circular case

        if (this.canSetBoundMode()) {
          state.scrollArea = {
            prev: firstPanel.getPosition(),
            next: lastPanel.getPosition() + lastPanel.getSize() - state.size
          };
        } else {
          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - hangerPos,
            next: lastPanel.getAnchorPosition() - hangerPos
          };
        }
      }; // Find nearest anchor from current hanger position
      // FIXME: exclude "undefined"


      __proto.findNearestPanel = function () {
        var state = this.state;
        var scrollArea = state.scrollArea;
        var currentHangerPosition = state.position + state.hangerPosition;

        if (this.isOutOfBound()) {
          return state.position < scrollArea.prev ? this.panels[0] : this.panels[this.panels.length - 1];
        }

        for (var _i = 0, _a = this.panels.concat(this.clonedPanels); _i < _a.length; _i++) {
          var panel = _a[_i];
          var panelPosition = panel.getPosition();
          var panelSize = panel.getSize(); // TODO: apply "gap" option

          if (isBetween(currentHangerPosition, panelPosition, panelPosition + panelSize)) {
            return panel;
          }
        }
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
        var options = state.options;
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

      __proto.adjustSize = function () {
        var options = this.state.options;
        var horizontal = options.horizontal;
        var sizeToApply;

        if (options.adaptive) {
          var currentPanel = this.getCurrentPanel();
          var bbox = currentPanel.getBbox();
          sizeToApply = horizontal ? bbox.height : bbox.width;
        } else {
          // Find minimum height of panels to maximum panel size
          var maximumPanelSize = this.panels.reduce(function (maximum, panel) {
            var bbox = panel.getBbox();
            return Math.max(maximum, horizontal ? bbox.height : bbox.width);
          }, 0);
          sizeToApply = maximumPanelSize;
        }

        var viewportStyle = this.viewportElement.style;

        if (horizontal) {
          viewportStyle.height = sizeToApply + "px";
          viewportStyle.minHeight = "100%";
        } else {
          viewportStyle.width = sizeToApply + "px";
          viewportStyle.minWidth = "100%";
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

      __proto.getPanelCount = function () {
        return this.panels.length;
      };

      __proto.getPanel = function (index) {
        if (!isBetween(index, 0, this.panels.length)) {
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
          index = state.options.circular ? this.panels.length - 1 : -1;
        }

        return index;
      };

      __proto.getNextIndex = function () {
        var state = this.state;
        var index = state.index + 1;

        if (index >= this.panels.length) {
          index = state.options.circular ? 0 : -1;
        }

        return index;
      };

      __proto.getSize = function () {
        return this.state.size;
      };

      __proto.getScrollArea = function () {
        return this.state.scrollArea;
      };

      __proto.getHangerPosition = function () {
        return this.state.hangerPosition;
      };

      __proto.getCameraPosition = function () {
        return this.state.position;
      };

      __proto.connectAxesHandler = function (handler) {
        var horizontal = this.state.options.horizontal;
        return this.axes.on(handler).connect(horizontal ? ["flick", ""] : ["", "flick"], this.panInput);
      };

      __proto.appendPanelElement = function (element) {
        this.cameraElement.appendChild(element);
      };

      __proto.build = function () {
        this.applyCSSValue();
        this.placePanels();
        this.resize(); // Clone panels in circular mode

        if (this.state.options.circular) {
          this.clonePanels();
          this.replacePanels();
        }

        this.chainPanels();
        this.setAxesInstance();
        this.moveToDefaultPanel();
      };

      __proto.applyCSSValue = function () {
        var state = this.state;
        var options = state.options;
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

      __proto.placePanels = function () {
        var _this = this;

        var options = this.state.options; // Panel elements were attached to camera element by Flicking class

        var panelElements = this.cameraElement.children;

        if (!panelElements || !panelElements.length) {
          throw new Error("There're no panel elements.");
        } // Initialize panels


        this.panels = toArray(panelElements).map(function (el, idx) {
          return new Panel(el, idx, _this, {
            horizontal: options.horizontal,
            classPrefix: options.classPrefix,
            anchorExpression: options.anchor
          });
        });
        this.clonedPanels = []; // Update panel position && fit to wrapper

        var nextPanelPos = 0;
        this.panels.forEach(function (panel) {
          var panelPos = nextPanelPos;
          var panelSize = panel.getSize();
          panel.setPosition(panelPos);
          nextPanelPos += panelSize;
        });
      };

      __proto.clonePanels = function () {
        var state = this.state;
        var panels = this.panels;
        var clonedPanels = this.clonedPanels;
        var viewportSize = state.size;
        var lastPanel = panels[panels.length - 1];
        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize(); // Update viewport scrollable area
        // Maximum scroll extends to first clone sequence's first panel

        state.scrollArea = {
          prev: state.scrollArea.prev,
          next: sumOriginalPanelSize + panels[0].getRelativeAnchorPosition() - state.hangerPosition
        };
        var scrollArea = state.scrollArea;
        var visibleAreaSize = scrollArea.next + viewportSize - scrollArea.prev; // For each panels, clone itself while panel's last position is below viewport size

        var totalPanelSize = sumOriginalPanelSize;

        var _loop_1 = function () {
          var cloneBasePos = totalPanelSize; // Iterate original panels, clone or set toggle position

          panels.forEach(function (origPanel) {
            var clonedPanelPos = cloneBasePos + origPanel.getPosition(); // Clone panels

            var clonedPanel = origPanel.clone();
            clonedPanel.setPosition(clonedPanelPos);
            clonedPanels.push(clonedPanel);
          }); // Update base position to clone

          totalPanelSize += sumOriginalPanelSize;
        };

        do {
          _loop_1();
        } while (totalPanelSize <= visibleAreaSize);
      };

      __proto.replacePanels = function () {
        var state = this.state;
        var panels = this.panels;
        var clonedPanels = this.clonedPanels;
        var scrollArea = state.scrollArea;
        var maximumVisiblePosition = scrollArea.next + state.size;
        var lastReplacePosition = panels[0].getPosition(); // reverse() pollutes original array

        for (var _i = 0, _a = clonedPanels.concat().reverse(); _i < _a.length; _i++) {
          var panel = _a[_i];
          var panelPosition = panel.getPosition();
          var replacePosition = lastReplacePosition - panel.getSize();

          if (panelPosition <= maximumVisiblePosition) {
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

        if (this.state.options.circular) {
          var firstPanel = allPanels[0];
          var lastPanel = allPanels[allPanels.length - 1];
          firstPanel.setPrevPanel(lastPanel);
          lastPanel.setNextPanel(firstPanel);
        }
      };

      __proto.setAxesInstance = function () {
        var state = this.state;
        var options = state.options;
        var scrollArea = state.scrollArea;
        var viewportSize = state.size;
        var horizontal = options.horizontal;
        var bounce = options.bounce;
        var parsedBounce = bounce;

        if (isArray(bounce)) {
          parsedBounce = bounce.map(function (val) {
            return parseArithmeticExpression(val, viewportSize, DEFAULT_OPTIONS.bounce);
          });
        } else {
          var parsedVal = parseArithmeticExpression(bounce, viewportSize, DEFAULT_OPTIONS.bounce);
          parsedBounce = [parsedVal, parsedVal];
        }

        this.axes = new Axes({
          flick: {
            range: [scrollArea.prev, scrollArea.next],
            circular: options.circular,
            bounce: parsedBounce
          }
        }, {
          easing: options.panelEffect,
          deceleration: options.deceleration,
          interruptable: true
        });
        this.panInput = new Axes.PanInput(this.viewportElement, {
          inputType: options.inputType,
          thresholdAngle: options.thresholdAngle,
          scale: horizontal ? [-1, 0] : [0, -1]
        });
      };

      __proto.moveToDefaultPanel = function () {
        var state = this.state;
        var defaultIndex = clamp(state.options.defaultIndex, 0, this.panels.length - 1);
        var defaultPanel = this.panels[defaultIndex];
        var defaultPosition = this.findShortestPositionToPanel(defaultPanel);
        state.index = defaultIndex;
        this.moveCamera(defaultPosition);
        this.axes.setTo({
          flick: defaultPosition
        }, 0);
      };

      __proto.isOutOfBound = function () {
        var state = this.state;
        var scrollArea = state.scrollArea;
        return !state.options.circular && (state.position < scrollArea.prev || state.position > scrollArea.next);
      };

      __proto.canSetBoundMode = function () {
        var state = this.state;
        var options = state.options;
        var panels = this.panels;
        var lastPanel = panels[panels.length - 1];
        var summedPanelSize = lastPanel.getPosition() + lastPanel.getSize();
        return options.bound && !options.circular && summedPanelSize >= state.size;
      };

      return Viewport;
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

        var _this = _super.call(this) || this; // Set flicking wrapper user provided


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
        var viewport = this.viewport;
        var panel = viewport.getCurrentPanel().getPrevPanel();

        if (panel) {
          this.moveToPanelProgramatic(panel, duration);
        }

        return this;
      };
      /**
       * Move to the next panel. If `horizontal=true`is right panel. If `horizontal=false`is lower panel.
       * @ko 다음 패널로 이동한다. `horizontal=true`이면 우측 패널. `horizontal=false`이면 하측 패널.
       * @param [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
       * @return An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.next = function (duration) {
        var viewport = this.viewport;
        var panel = viewport.getCurrentPanel().getNextPanel();

        if (panel) {
          this.moveToPanelProgramatic(panel, duration);
        }

        return this;
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
          this.moveToPanelProgramatic(panel, duration);
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
       * Returns the selected panel instance
       * @ko 현재 선택된 패널의 인스턴스를 반환한다.
       * @return Selected panel instance.<ko>선택된 패널 인스턴스</ko>
       */


      __proto.getCurrentPanel = function () {
        return this.viewport.getCurrentPanel().toReadonlyVersion();
      };
      /**
       * Returns the panel instance of given index
       * @ko 주어진 인덱스에 해당하는 패널의 인스턴스를 반환한다.
       * @return Panel instance of given index, `null` if it doesn't exists.<ko>주어진 인덱스에 해당하는 패널의 인스턴스, 해당 패널이 존재하지 않을 시 `null`.
       */


      __proto.getPanel = function (index) {
        var panel = this.viewport.getPanel(index);
        return panel ? panel.toReadonlyVersion() : null;
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
        return this.state.movingState !== MOVING_STATE.IDLE;
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
       * Return the reference element and all its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
       * @ko 기준 요소와 그 하위 패널들을 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
       * @example
       * const flick = new eg.Flicking("#flick");
       * flick.destroy();
       * console.log(flick.moveTo); // null
       */


      __proto.destroy = function () {
        this.off();
        this.viewport.destroy(); //  resources

        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.trigger = function (eventName, params) {
        if (params === void 0) {
          params = {};
        }

        var state = this.state;
        var holding = state.movingState === MOVING_STATE.HOLDING || state.movingState === MOVING_STATE.DRAGGING;
        var currentPanel = this.viewport.getCurrentPanel();

        if (params.direction) {
          state.movingDirection = params.direction;
        } // TODO: Refactor this into command pattern


        if (eventName === EVENTS.MOVE_END) {
          state.moveStartTriggered = false;

          if (state.options.adaptive) {
            this.viewport.adjustSize();
          }
        } // Return whether it's canceled, as it's more clear


        return !_super.prototype.trigger.call(this, eventName, merge({
          type: eventName,
          index: currentPanel.getIndex(),
          panel: currentPanel.toReadonlyVersion(),
          holding: holding
        }, params));
      };

      __proto.build = function (options) {
        this.setInitialState(options);
        this.initViewport();
        this.listenInput();
      };

      __proto.setInitialState = function (options) {
        // Set default state values and override it
        var state = merge({}, DEFAULT_STATE); // Override default options

        state.options = merge({}, DEFAULT_OPTIONS, options);
        this.state = state;
      };

      __proto.initViewport = function () {
        var wrapper = this.wrapper;
        var options = this.state.options;
        var children = wrapper.children;

        if (!children || !children.length) {
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
        var viewport = this.viewport;
        viewport.flicking = this;
        options.defaultIndex = clamp(options.defaultIndex, 0, viewport.getPanelCount() - 1);
      };

      __proto.listenInput = function () {
        // Connect Axes instance with PanInput
        this.viewport.connectAxesHandler({
          hold: this.onAxesHold.bind(this),
          change: this.onAxesChange.bind(this),
          release: this.onAxesRelease.bind(this),
          animationEnd: this.onAxesAnimationEnd.bind(this),
          finish: this.onAxesFinish.bind(this)
        });
      };

      __proto.stopMoving = function () {
        var state = this.state;
        state.panelMovingTo = undefined;
        state.movingState = MOVING_STATE.IDLE;
        state.movingDirection = undefined;
        state.lastHoldingDelta = 0;
      };

      __proto.onAxesHold = function (e) {
        var state = this.state;

        if (state.movingState === MOVING_STATE.DISABLED) {
          return;
        }

        var holdStartCanceled = this.trigger(EVENTS.HOLD_START, {
          axesEvent: e,
          holding: true,
          isTrusted: true
        });

        if (holdStartCanceled) {
          state.movingState = MOVING_STATE.DISABLED;
          return;
        }

        state.movingState = state.movingState !== MOVING_STATE.MOVING ? MOVING_STATE.HOLDING : MOVING_STATE.DRAGGING;
        state.movingDirection = undefined;
        state.lastHoldingDelta = 0;
      };

      __proto.onAxesChange = function (e) {
        var state = this.state;
        var viewport = this.viewport;
        var pos = e.pos.flick;
        var delta = !e.inputEvent ? 0 : state.options.horizontal ? e.inputEvent.deltaX : e.inputEvent.deltaY;

        if (state.movingState === MOVING_STATE.DISABLED || !e.delta.flick) {
          return;
        }

        var currentDirection = delta < state.lastHoldingDelta ? DIRECTION.NEXT : DIRECTION.PREV; // On first move event

        if (!state.moveStartTriggered) {
          state.moveStartTriggered = true;
          var moveStartCanceled = this.trigger(EVENTS.MOVE_START, {
            axesEvent: e,
            direction: state.movingState === MOVING_STATE.HOLDING ? currentDirection : state.movingDirection,
            isTrusted: e.isTrusted
          });

          if (moveStartCanceled) {
            this.stopMoving();
            state.movingState = MOVING_STATE.DISABLED;
            return;
          }

          state.movingState = state.movingState === MOVING_STATE.HOLDING ? MOVING_STATE.DRAGGING : state.movingState;
        }

        if (state.movingState === MOVING_STATE.DRAGGING) {
          state.movingDirection = currentDirection;
          state.lastHoldingDelta = delta;
        }

        var previousPosition = this.viewport.getCameraPosition();
        viewport.moveCamera(pos);
        var moveCanceled = this.trigger(EVENTS.MOVE, {
          axesEvent: e,
          direction: state.movingDirection,
          isTrusted: e.isTrusted
        });

        if (moveCanceled) {
          viewport.moveCamera(previousPosition);
          this.stopMoving();
          state.movingState = MOVING_STATE.DISABLED;
          return;
        }
      };

      __proto.onAxesRelease = function (e) {
        var state = this.state;
        var options = state.options;
        var viewport = this.viewport;

        if (state.movingState === MOVING_STATE.DISABLED) {
          return;
        }

        var delta = options.horizontal ? e.inputEvent.deltaX : e.inputEvent.deltaY;
        var isNext = delta < 0;
        var swipeDistance = Math.abs(delta);
        var swipeAngle = e.inputEvent.deltaX ? Math.abs(180 * Math.atan(e.inputEvent.deltaY / e.inputEvent.deltaX) / Math.PI) : 90;
        var currentPanel = viewport.getCurrentPanel();
        var wasDragging = state.movingState === MOVING_STATE.DRAGGING;
        var overThreshold = swipeDistance >= options.threshold && (options.horizontal ? swipeAngle <= options.thresholdAngle : swipeAngle > options.thresholdAngle); // Trigger hold end event

        state.movingState = MOVING_STATE.MOVING;
        this.trigger(EVENTS.HOLD_END, {
          axesEvent: e,
          holding: false,
          direction: state.movingDirection,
          isTrusted: true
        });

        if (!overThreshold) {
          if (!wasDragging) {
            var cameraPosition = viewport.getCameraPosition(); // Static click

            var clickedElement = e.inputEvent.srcEvent.target;
            var clickedPanel = viewport.findPanelOf(clickedElement);

            if (clickedPanel) {
              var panelPosition = clickedPanel.getPosition();
              var direction = panelPosition > cameraPosition ? DIRECTION.NEXT : panelPosition < cameraPosition ? DIRECTION.PREV : undefined;
              state.movingState = MOVING_STATE.IDLE;
              this.trigger(EVENTS.SELECT, {
                axesEvent: e,
                direction: direction,
                isTrusted: true,
                selectedIndex: clickedPanel.getIndex(),
                selectedPanel: clickedPanel.toReadonlyVersion()
              });
            } else {
              e.setTo({
                flick: cameraPosition
              }, 0);
              this.stopMoving();
            }

            return;
          } else if (state.panelMovingTo) {
            // Update position to move & anchor index
            this.viewport.moveTo(state.panelMovingTo.toReadonlyVersion(), e);
            return;
          }
        }

        var minimumDistanceToChange = isNext ? currentPanel.getSize() - currentPanel.getRelativeAnchorPosition() : currentPanel.getRelativeAnchorPosition();
        minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);
        var hangerPosition = viewport.getCameraPosition() + viewport.getHangerPosition();
        var panelToMove = currentPanel;

        if (overThreshold) {
          // Minimum distance needed to change panel
          // If over this threshold,

          /*
           * | Prev |    Next    |
           * |------|------------|
           * [      |<-Anchor    ] <- Panel
           */
          if (swipeDistance <= minimumDistanceToChange) {
            var adjacentPanel = isNext ? currentPanel.getNextPanel() : currentPanel.getPrevPanel();

            if (options.circular) {
              var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
              var lapped = Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

              if (lapped) {
                adjacentPanel = isNext ? firstClonedPanel.getNextPanel() : firstClonedPanel.getPrevPanel();
              }
            }

            panelToMove = adjacentPanel != null ? adjacentPanel : currentPanel;
          } else {
            panelToMove = viewport.findNearestPanel();
          }
        } else {
          // Restore case
          if (options.circular) {
            var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
            var lapped = Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

            if (!isNext && lapped) {
              panelToMove = firstClonedPanel;
            }
          }
        }

        var eventType = overThreshold ? EVENTS.CHANGE : EVENTS.RESTORE;

        if (overThreshold && !options.circular && panelToMove === currentPanel) {
          eventType = EVENTS.RESTORE;
        } // Trigger change or restore event


        var changeOrRestoreCanceled = this.trigger(eventType, {
          index: panelToMove.getIndex(),
          panel: panelToMove.toReadonlyVersion(),
          prevIndex: eventType === EVENTS.CHANGE ? currentPanel.getIndex() : undefined,
          prevPanel: eventType === EVENTS.CHANGE ? currentPanel.toReadonlyVersion() : undefined,
          axesEvent: e,
          direction: state.movingDirection,
          isTrusted: true
        });

        if (changeOrRestoreCanceled) {
          this.stopMoving();
          state.movingState = MOVING_STATE.DISABLED;
          return;
        } // Update position to move & anchor index


        state.panelMovingTo = panelToMove;
        this.viewport.moveTo(panelToMove.toReadonlyVersion(), e);
      };

      __proto.onAxesAnimationEnd = function (e) {
        var state = this.state;

        if (state.movingState === MOVING_STATE.DISABLED) {
          return;
        }

        this.trigger(EVENTS.MOVE_END, {
          axesEvent: e,
          direction: state.movingDirection,
          isTrusted: e.isTrusted
        });
      };

      __proto.onAxesFinish = function (e) {
        this.stopMoving();
      };

      __proto.moveToPanelProgramatic = function (panel, duration) {
        if (duration === void 0) {
          duration = this.state.options.duration;
        }

        var state = this.state;
        var viewport = this.viewport;
        var currentIndex = viewport.getIndex();
        var canMove = panel && state.movingState === MOVING_STATE.IDLE && panel.getIndex() !== currentIndex;

        if (!canMove) {
          return;
        }

        var estimatedPosition = viewport.findShortestPositionToPanel(panel);
        var currentPosition = viewport.getCameraPosition();
        var direction = estimatedPosition > currentPosition ? DIRECTION.NEXT : estimatedPosition < currentPosition ? DIRECTION.PREV : undefined;
        this.state.movingState = MOVING_STATE.MOVING;
        this.state.movingDirection = direction;
        var changeCanceled = this.trigger(EVENTS.CHANGE, {
          index: panel.getIndex(),
          panel: panel.toReadonlyVersion(),
          prevIndex: viewport.getIndex(),
          prevPanel: viewport.getCurrentPanel().toReadonlyVersion(),
          direction: direction,
          isTrusted: false
        });

        if (changeCanceled) {
          return;
        }

        var nearestPanel = viewport.findNearestIdenticalPanel(panel);
        this.viewport.moveTo(nearestPanel.toReadonlyVersion(), null, duration); // Move end event can't be triggered automatically when duration is 0
        // as Axes won't trigger animationEnd or finish event

        if (duration <= 0) {
          this.trigger(EVENTS.MOVE_END, {
            direction: direction,
            isTrusted: false
          });
          this.stopMoving();
        }
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @example
       * eg.Flicking.VERSION;  // ex) 3.0.0
       * @memberof eg.Flicking
       */


      Flicking.VERSION = "3.0.0-dev";
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
