/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking JavaScript library
@egjs/flicking project is licensed under the MIT license

https://github.com/naver/egjs-flicking
@version 3.0.0
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
        } else {
          elements.push(el);
        }
      });
      return elements;
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
    };
    function isString(value) {
      return typeof value === "string";
    } // Get class list of element as string array

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
    }

    var DEFAULT_MOVE_TYPE_OPTIONS = {
      snap: {
        type: "snap",
        count: 1
      },
      freeScroll: {
        type: "freeScroll"
      }
    };
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
      moveType: DEFAULT_MOVE_TYPE_OPTIONS.snap
    };
    var DEFAULT_VIEWPORT_CSS = {
      position: "relative",
      zIndex: DEFAULT_OPTIONS.zIndex,
      width: "100%",
      height: "100%",
      // willChange: "transform",
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
      NEED_PANEL: "needPanel"
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
        this.prevSibling = null;
        this.nextSibling = null;
        this.state = {
          index: index,
          position: 0,
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
        this.options = options;

        if (options.classPrefix) {
          addClass(element, options.classPrefix + "-panel");
        } // Update size info after applying panel css


        applyCSS(this.element, DEFAULT_PANEL_CSS);
      }

      var __proto = Panel.prototype;

      __proto.resize = function () {
        var state = this.state;
        var bbox = this.getBbox();
        state.size = this.options.horizontal ? bbox.width : bbox.height;
        state.relativeAnchorPosition = parseArithmeticExpression(this.options.anchor, state.size);

        if (!state.isClone) {
          state.clonedPanels.forEach(function (panel) {
            return panel.resize();
          });
        }
      };

      __proto.reset = function () {
        this.state.cachedBbox = null;
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
        var state = this.state;
        return state.isClone ? this.original.getClonedPanels() : state.clonedPanels;
      };

      __proto.getIdenticalPanels = function () {
        var state = this.state;
        return state.isClone ? this.original.getIdenticalPanels() : [this].concat(state.clonedPanels);
      };

      __proto.getOriginalPanel = function () {
        return this.state.isClone ? this.original : this;
      };

      __proto.setIndex = function (index) {
        var state = this.state;
        state.index = index;
        state.clonedPanels.forEach(function (panel) {
          return panel.state.index = index;
        });
      };

      __proto.setPosition = function (pos) {
        var state = this.state;
        var options = this.options;
        var elementStyle = this.element.style;
        state.position = pos;
        options.horizontal ? elementStyle.left = pos + "px" : elementStyle.top = pos + "px";
      };

      __proto.clone = function (cloneIndex) {
        var state = this.state;
        var cloneElement = this.element.cloneNode(true);
        var clonedPanel = new Panel(cloneElement, state.index, this.options);
        var clonedState = clonedPanel.state;
        clonedPanel.original = this;
        clonedState.isClone = true;
        clonedState.cloneIndex = cloneIndex; // Inherit some state values

        clonedState.size = state.size;
        clonedState.relativeAnchorPosition = state.relativeAnchorPosition;
        clonedState.originalStyle = state.originalStyle;
        clonedState.cachedBbox = state.cachedBbox;
        state.clonedPanels.push(clonedPanel);
        return clonedPanel;
      };

      __proto.remove = function () {
        var element = this.element;
        element.parentNode.removeChild(element);

        if (!this.state.isClone) {
          this.removeClonedPanelsAfter(0);
        }
      };

      __proto.removeClonedPanelsAfter = function (start) {
        var state = this.state;
        var removingPanels = state.clonedPanels.splice(start);
        removingPanels.forEach(function (panel) {
          panel.remove();
        });
      };

      return Panel;
    }();

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
        return this.panels.concat(this.clonedPanels());
      };

      __proto.originalPanels = function () {
        return this.panels;
      };

      __proto.clonedPanels = function () {
        return this.clones.reduce(function (allClones, clones) {
          return allClones.concat(clones);
        }, []);
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
        return this.clones.length;
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
          removingPanels.forEach(function (panel) {
            return panel.remove();
          });
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
        }
      };

      __proto.append = function (newPanels) {
        var range = this.range;

        (_a = this.panels).push.apply(_a, newPanels);

        if (newPanels.length > 0) {
          range.min = Math.max(0, range.min);
          range.max += newPanels.length;
          this.length += newPanels.length;
        }

        var _a;
      }; // Insert at index
      // Returns pushed elements from index, inserting at 'empty' position doesn't push elements behind it


      __proto.insert = function (index, newPanels) {
        var panels = this.panels;
        var range = this.range;
        var cameraElement = this.cameraElement;
        var isCircular = this.options.circular;
        var lastIndex = this.lastIndex; // Find first panel that index is greater than inserting index

        var nextSibling = this.findFirstPanelFrom(index); // if it's null, element will be inserted at last position
        // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax

        var firstPanel = this.firstPanel();
        var siblingElement = nextSibling ? nextSibling.getElement() : isCircular && firstPanel ? firstPanel.getClonedPanels()[0].getElement() : null; // Insert panels before sibling element

        var fragment = document.createDocumentFragment();
        newPanels.forEach(function (panel) {
          return fragment.appendChild(panel.getElement());
        });
        cameraElement.insertBefore(fragment, siblingElement);
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

          panels.splice.apply(panels, [index, emptyPanelCount].concat(newPanels)); // Remove panels after last index

          if (panels.length > lastIndex + 1) {
            var removedPanels = panels.splice(lastIndex + 1).filter(function (panel) {
              return Boolean(panel);
            });
            removedPanels.forEach(function (panel) {
              return panel.remove();
            });
            this.length -= removedPanels.length;
          }
        } // Update index of previous panels


        if (pushedIndex > 0) {
          panels.slice(index + newPanels.length).forEach(function (panel) {
            panel.setIndex(panel.getIndex() + pushedIndex);
          });
        }

        if (isCircular) {
          this.addNewClones(index, newPanels, newPanels.length - pushedIndex, nextSibling);
        } // Update state


        this.length += newPanels.length;
        this.updateIndex(index);
        return pushedIndex;
      };

      __proto.replace = function (index, newPanels) {
        var panels = this.panels;
        var range = this.range;
        var cameraElement = this.cameraElement;
        var isCircular = this.options.circular; // Find first panel that index is greater than inserting index

        var nextSibling = this.findFirstPanelFrom(index + newPanels.length); // if it's null, element will be inserted at last position
        // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax

        var firstPanel = this.firstPanel();
        var siblingElement = nextSibling ? nextSibling.getElement() : isCircular && firstPanel ? firstPanel.getClonedPanels()[0].getElement() : null; // Insert panels before sibling element

        var fragment = document.createDocumentFragment();
        newPanels.forEach(function (panel) {
          return fragment.appendChild(panel.getElement());
        });
        cameraElement.insertBefore(fragment, siblingElement);

        if (index > range.max) {
          // Temporarily insert null at index to use splice()
          panels[index] = null;
        }

        var replacedPanels = panels.splice.apply(panels, [index, newPanels.length].concat(newPanels));
        var wasNonEmptyCount = replacedPanels.filter(function (panel) {
          return Boolean(panel);
        }).length;
        replacedPanels.forEach(function (panel) {
          if (panel) {
            panel.remove();
          }
        }); // Suppose inserting [1, 2, 3] at 0 position when there were [empty, 1]
        // So length should be increased by 3(inserting panels) - 1(non-empty panels)

        this.length += newPanels.length - wasNonEmptyCount;
        this.updateIndex(index);

        if (isCircular) {
          this.addNewClones(index, newPanels, newPanels.length, nextSibling);
        }
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
        deletedPanels.forEach(function (panel) {
          panel.remove();
        });

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
        }

        return deletedPanels;
      };

      __proto.chainAllPanels = function () {
        var allPanels = this.allPanels().filter(function (panel) {
          return !!panel;
        });
        var allPanelsCount = allPanels.length;

        if (allPanelsCount <= 0) {
          return;
        }

        allPanels.forEach(function (panel, idx) {
          var prevPanel = idx > 0 ? allPanels[idx - 1] : null;
          var nextPanel = idx < allPanelsCount - 1 ? allPanels[idx + 1] : null;
          panel.prevSibling = prevPanel;
          panel.nextSibling = nextPanel;
        });

        if (this.options.circular) {
          var firstPanel = allPanels[0];
          var lastPanel = allPanels[allPanelsCount - 1];
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
            insertTarget_1.splice.apply(insertTarget_1, [index, deleteCount].concat(clonedPanels)); // Remove panels after last index

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
      }; // Clear both original & cloned


      __proto.clear = function () {
        this.panels.forEach(function (panel) {
          panel.remove();
          panel.removeClonedPanelsAfter(0);
        });
        this.panels = [];
        this.clones = [];
        this.length = 0;
        this.range = {
          min: -1,
          max: -1
        };
      };

      __proto.clearClone = function () {
        this.panels.forEach(function (panel) {
          panel.removeClonedPanelsAfter(0);
        });
        this.clones = [];
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
        for (var _i = 0, _a = this.panels; _i < _a.length; _i++) {
          var panel = _a[_i];

          if (panel && panel.getIndex() >= index) {
            return panel;
          }
        }
      };

      __proto.addNewClones = function (index, originalPanels, deleteCount, nextSibling) {
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
            cameraElement.insertBefore(clone.getElement(), cloneSiblingElement);
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

      return PanelManager;
    }();

    var State =
    /*#__PURE__*/
    function () {
      function State() {
        this.delta = 0;
        this.direction = null;
        this.targetPanel = null;
        this.targetOffset = 0;
        this.lastPosition = 0;
      }

      var __proto = State.prototype;

      __proto.onEnter = function (prevState) {
        this.delta = prevState.delta;
        this.direction = prevState.direction;
        this.targetPanel = prevState.targetPanel;
        this.targetOffset = prevState.targetOffset;
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
        this.targetOffset = 0;
        this.lastPosition = 0;
      };

      __proto.onHold = function (e, _a) {
        var flicking = _a.flicking,
            viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Shouldn't do any action until any panels on flicking area

        if (flicking.getPanelCount() <= 0) {
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

        var clickedElement = releaseEvent.inputEvent.srcEvent.target;
        var clickedPanel = viewport.panelManager.findPanelOf(clickedElement);
        var cameraPosition = viewport.getCameraPosition();

        if (clickedPanel) {
          var clickedPanelPosition = clickedPanel.getPosition();
          var direction = clickedPanelPosition > cameraPosition ? DIRECTION.NEXT : clickedPanelPosition < cameraPosition ? DIRECTION.PREV : null; // Don't provide axes event, to use axes instance instead

          triggerEvent(EVENTS.SELECT, null, true, {
            direction: direction,
            index: clickedPanel.getIndex(),
            panel: viewport.castToFlickingPanel(clickedPanel)
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
            transitTo = context.transitTo,
            stopCamera = context.stopCamera;
        var delta = this.delta;
        var options = flicking.options;
        var horizontal = options.horizontal;
        var defaultDuration = options.duration;
        var halfGap = options.gap / 2;
        var moveType = options.moveType;
        var isFreeScroll = moveType.type === "freeScroll";
        var snapCount = isFreeScroll ? Infinity : moveType.count;
        var inputEvent = e.inputEvent;
        var eventDelta = Math.abs(e.delta.flick);
        var velocity = horizontal ? inputEvent.velocityX : inputEvent.velocityY;
        var inputDelta = horizontal ? inputEvent.deltaX : inputEvent.deltaY;
        var isNextDirection = Math.abs(velocity) > 1 ? velocity < 0 : Math.abs(delta) > 0 ? delta > 0 : inputDelta < 0;
        var swipeDistance = Math.max(Math.abs(delta), Math.abs(inputDelta));
        var swipeAngle = inputEvent.deltaX ? Math.abs(180 * Math.atan(inputEvent.deltaY / inputEvent.deltaX) / Math.PI) : 90;
        var belowAngleThreshold = horizontal ? swipeAngle <= options.thresholdAngle : swipeAngle > options.thresholdAngle;
        var overThreshold = swipeDistance >= options.threshold && belowAngleThreshold; // Update last position to cope with Axes's animating behavior
        // Axes uses start position when animation start

        this.lastPosition = viewport.getCameraPosition();
        triggerEvent(EVENTS.HOLD_END, e, true);

        if (!overThreshold && this.targetPanel) {
          // Interrupted while animating
          viewport.moveTo(this.targetPanel, "", e, this.targetOffset);
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
        } // Minimum distance needed to decide prev/next panel as nearest

        /*
         * |  Prev  |     Next     |
         * |--------|--------------|
         * [][      |<-Anchor    ][] <- Panel + Half-Gap
         */


        var minimumDistanceToChange = isNextDirection ? currentPanel.getSize() - currentPanel.getRelativeAnchorPosition() + halfGap : currentPanel.getRelativeAnchorPosition() + halfGap;
        minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);
        var duration = defaultDuration;
        var panelToMove;
        var offset = 0;

        if (overThreshold) {
          if (snapCount > 1 && eventDelta > minimumDistanceToChange) {
            var basePanel = isFreeScroll ? nearestPanel : viewport.findNearestIdenticalPanel(currentPanel); // FreeScroll & snap

            var _a = this.findPanelWhenSnapIsOn({
              isNextDirection: isNextDirection,
              e: e,
              viewport: viewport,
              basePanel: basePanel
            }),
                panelAtDestPos = _a.panelAtDestPos,
                snapOffset = _a.snapOffset,
                indexDiff = _a.indexDiff;

            panelToMove = panelAtDestPos;
            offset = snapOffset;
            duration = clamp(e.duration, defaultDuration, defaultDuration * indexDiff);
          } else if (!isFreeScroll && !viewport.isOutOfBound() && (swipeDistance <= minimumDistanceToChange || !options.circular && nearestPanel.getIndex() === currentPanel.getIndex())) {
            panelToMove = this.findAdjacentPanel(isNextDirection, viewport);
          } else {
            panelToMove = nearestPanel;
          }
        } else {
          panelToMove = options.circular ? this.findRestorePanelInCircularMode(isNextDirection, viewport) : currentPanel;
        }

        var panelPosition = panelToMove.getPosition() + offset;
        var movingToSamePanel = panelPosition === currentPanel.getPosition();
        var eventType = !overThreshold || movingToSamePanel ? isFreeScroll ? "" : EVENTS.RESTORE : EVENTS.CHANGE;
        viewport.moveTo(panelToMove, eventType, e, offset, duration).onSuccess(function () {
          transitTo(STATE_TYPE.ANIMATING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
          stopCamera(e);
        });
      };

      __proto.findRestorePanelInCircularMode = function (isNextDirection, viewport) {
        var originalPanel = viewport.getCurrentPanel().getOriginalPanel();
        var hangerPosition = viewport.getHangerPosition();
        var firstClonedPanel = originalPanel.getIdenticalPanels()[1];
        var lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);
        var panelToMove = !isNextDirection && lapped ? firstClonedPanel : originalPanel;
        return panelToMove;
      };

      __proto.findPanelWhenSnapIsOn = function (params) {
        var isNextDirection = params.isNextDirection,
            e = params.e,
            viewport = params.viewport,
            basePanel = params.basePanel;
        var options = viewport.options;
        var scrollAreaSize = viewport.getScrollAreaSize();
        var indexRange = viewport.panelManager.getRange();
        var halfGap = options.gap / 2;
        var estimatedHangerPos = e.destPos.flick + viewport.getRelativeHangerPosition();
        var moveType = options.moveType;
        var snapCount = moveType.type === "freeScroll" ? Infinity : moveType.count;
        var panelToMove = basePanel;
        var passedPanelCount = 0;
        var cycleIndex = panelToMove.getIndex() === indexRange.min ? basePanel.getCloneIndex() + 1 : 0;

        while (passedPanelCount < snapCount) {
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
          passedPanelCount += 1; // Since panlToMove holds also cloned panels, we should use original panel's position

          var originalPanel = panelToMove.getOriginalPanel();
          var panelPosition = originalPanel.getPosition() + cycleIndex * scrollAreaSize;
          var panelSize = originalPanel.getSize(); // Current panelToMove contains destPos

          if (isNextDirection && panelPosition + panelSize + halfGap > estimatedHangerPos || !isNextDirection && panelPosition - halfGap < estimatedHangerPos) {
            break;
          }
        }

        var originalPosition = panelToMove.getOriginalPanel().getPosition();
        var offset = cycleIndex * scrollAreaSize - (panelToMove.getPosition() - originalPosition);
        return {
          panelAtDestPos: panelToMove,
          snapOffset: offset,
          indexDiff: passedPanelCount
        };
      };

      __proto.findAdjacentPanel = function (isNextDirection, viewport) {
        var options = viewport.options;
        var currentIndex = viewport.getCurrentIndex();
        var currentPanel = viewport.panelManager.get(currentIndex);
        var hangerPosition = viewport.getHangerPosition();
        var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
        var lapped = options.circular && Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition); // If lapped in circular mode, use first cloned panel as base panel

        var basePanel = lapped ? firstClonedPanel : currentPanel;
        var adjacentPanel = isNextDirection ? basePanel.nextSibling : basePanel.prevSibling;
        var panelToMove = adjacentPanel ? adjacentPanel : basePanel;
        return panelToMove;
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

      __proto.onEnter = function (e) {
        _super.prototype.onEnter.call(this, e);

        this.delta = 0;
      };

      __proto.onHold = function (e, _a) {
        var viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Update current panel as current nearest panel

        this.lastPosition = viewport.getCameraPosition();
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
        transitTo(STATE_TYPE.IDLE);
        triggerEvent(EVENTS.MOVE_END, e, isTrusted, {
          direction: this.direction
        });

        if (flicking.options.adaptive) {
          viewport.updateAdaptiveSize();
        }
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

    var Viewport =
    /*#__PURE__*/
    function () {
      function Viewport(flicking, viewportElement, cameraElement, options, triggerEvent) {
        var _this = this;

        this.stopCamera = function (axesEvent) {
          if (axesEvent && axesEvent.setTo) {
            axesEvent.setTo({
              flick: _this.state.position
            }, 0);
          }

          _this.stateMachine.transitTo(STATE_TYPE.IDLE);
        };

        this.castToFlickingPanel = function (panel, offset) {
          if (offset === void 0) {
            offset = 0;
          }

          var viewport = _this;
          var options = viewport.options;
          return {
            getElement: function () {
              return panel.getElement();
            },
            getIndex: function () {
              return panel.getIndex();
            },
            getPosition: function () {
              return panel.getPosition() + offset;
            },
            getAnchorPosition: function () {
              return this.getPosition() + panel.getRelativeAnchorPosition();
            },
            getSize: function () {
              return panel.getSize();
            },
            getProgress: function () {
              var progress = NaN; // single

              var panelCount = viewport.panelManager.getPanelCount();
              var scrollAreaSize = viewport.getScrollAreaSize();
              var relativeIndex = (options.circular ? Math.floor(this.getPosition() / scrollAreaSize) * panelCount : 0) + this.getIndex();
              progress = relativeIndex - viewport.getCurrentProgress();
              return progress;
            },
            getOutsetProgress: function () {
              var outsetProgress = NaN;
              var outsetRange = [-this.getSize(), viewport.getRelativeHangerPosition() - panel.getRelativeAnchorPosition(), viewport.getSize()];
              var relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
              outsetProgress = getProgress(relativePanelPosition, outsetRange);
              return outsetProgress;
            },
            getVisibleRatio: function () {
              var visibleRatio = 0;
              var panelSize = panel.getSize();
              var relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
              var rightRelativePanelPosition = relativePanelPosition + panelSize;
              var visibleSize = Math.min(viewport.getSize(), rightRelativePanelPosition) - Math.max(relativePanelPosition, 0);
              visibleRatio = visibleSize >= 0 ? visibleSize / panelSize : 0;
              return visibleRatio;
            },
            focus: function (duration) {
              var currentPanel = viewport.getCurrentPanel();
              var hangerPosition = viewport.getHangerPosition();
              var anchorPosition = panel.getAnchorPosition();

              if (hangerPosition === anchorPosition || !currentPanel) {
                return;
              }

              var currentPosition = currentPanel.getPosition();
              var eventType = currentPosition === this.getPosition() ? "" : EVENTS.CHANGE;
              viewport.moveTo(panel, eventType, null, offset, duration);
            },
            update: function (updateFunction) {
              panel.getIdenticalPanels().forEach(function (eachPanel) {
                return updateFunction(eachPanel.getElement());
              });
            },
            prev: function () {
              var prevSibling = panel.prevSibling;

              if (!prevSibling) {
                return null;
              }

              var currentIndex = this.getIndex();
              var prevIndex = prevSibling.getIndex();
              var hasEmptyPanelBetween = currentIndex - prevIndex > 1;
              var notYetMinPanel = options.infinite && currentIndex > 0 && prevIndex > currentIndex;

              if (hasEmptyPanelBetween || notYetMinPanel) {
                // Empty panel exists between
                return null;
              }

              var prevPanelSize = prevSibling.getSize();
              var newPosition = this.getPosition() - prevPanelSize - options.gap;
              var newOffset = newPosition - prevSibling.getPosition();
              return viewport.castToFlickingPanel(prevSibling, newOffset);
            },
            next: function () {
              var nextSibling = panel.nextSibling;
              var lastIndex = viewport.panelManager.getLastIndex();

              if (!nextSibling) {
                return null;
              }

              var currentIndex = this.getIndex();
              var nextIndex = nextSibling.getIndex();
              var hasEmptyPanelBetween = nextIndex - currentIndex > 1;
              var notYetMaxPanel = options.infinite && currentIndex < lastIndex && nextIndex < currentIndex;

              if (hasEmptyPanelBetween || notYetMaxPanel) {
                return null;
              }

              var newPosition = this.getPosition() + panel.getSize() + options.gap;
              var newOffset = newPosition - nextSibling.getPosition();
              return viewport.castToFlickingPanel(nextSibling, newOffset);
            },
            insertBefore: function (element) {
              var parsedElements = parseElement(element);
              var firstPanel = viewport.panelManager.firstPanel();
              var prevSibling = panel.prevSibling; // Finding correct inserting index
              // While it should insert removing empty spaces,
              // It also should have to be bigger than prevSibling' s index

              var targetIndex = prevSibling && firstPanel.getIndex() !== this.getIndex() ? Math.max(prevSibling.getIndex() + 1, panel.getIndex() - parsedElements.length) : Math.max(panel.getIndex() - parsedElements.length, 0);
              return viewport.insert(targetIndex, parsedElements);
            },
            insertAfter: function (element) {
              return viewport.insert(panel.getIndex() + 1, element);
            },
            remove: function () {
              return viewport.remove(panel.getIndex())[0];
            }
          };
        };

        this.flicking = flicking;
        this.viewportElement = viewportElement;
        this.cameraElement = cameraElement;
        this.triggerEvent = triggerEvent;
        this.state = {
          size: 0,
          position: 0,
          relativeHangerPosition: 0,
          scrollArea: {
            prev: 0,
            next: 0
          },
          translate: TRANSFORM,
          infiniteThreshold: 0,
          checkedIndexes: []
        };
        this.options = options;
        this.stateMachine = new StateMachine();
        this.panelManager = new PanelManager(cameraElement, options);
        this.build();
      }

      var __proto = Viewport.prototype;

      __proto.moveTo = function (panel, eventType, axesEvent, offset, duration) {
        var _this = this;

        if (offset === void 0) {
          offset = 0;
        }

        if (duration === void 0) {
          duration = this.options.duration;
        }

        var state = this.state;
        var currentState = this.stateMachine.getState();
        var freeScroll = this.options.moveType.type === "freeScroll";
        var currentPosition = state.position;
        var castedPanel = this.castToFlickingPanel(panel, offset);
        var estimatedPosition = castedPanel.getAnchorPosition() - state.relativeHangerPosition;
        estimatedPosition = this.canSetBoundMode() ? clamp(estimatedPosition, state.scrollArea.prev, state.scrollArea.next) : estimatedPosition;
        var isTrusted = axesEvent ? axesEvent.isTrusted : false;
        var direction = estimatedPosition > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;
        var eventResult;

        if (eventType === EVENTS.CHANGE) {
          eventResult = this.triggerEvent(EVENTS.CHANGE, axesEvent, isTrusted, {
            index: panel.getIndex(),
            panel: castedPanel,
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
          currentState.targetPanel = panel;
          currentState.targetOffset = offset;
          currentState.direction = estimatedPosition > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;

          if (estimatedPosition === currentPosition) {
            // no move
            _this.nearestPanel = panel;
            _this.currentPanel = panel;
          }

          if (axesEvent && axesEvent.setTo) {
            // freeScroll only occurs in release events
            axesEvent.setTo({
              flick: freeScroll ? axesEvent.destPos.flick : estimatedPosition
            }, duration);
          } else {
            _this.axes.setTo({
              flick: estimatedPosition
            }, duration);
          }
        });
        return eventResult;
      };

      __proto.moveCamera = function (pos, axesEvent) {
        var state = this.state;
        var options = this.options;
        var transform = state.translate.name; // Update position & nearestPanel

        state.position = pos;
        this.nearestPanel = this.findNearestPanel();
        var nearestPanel = this.nearestPanel;
        var originalNearestPosition = nearestPanel ? nearestPanel.getPosition() : 0;
        this.checkNeedPanel(axesEvent); // Possibly modified after need panel, if it's looped

        var modifiedNearestPosition = nearestPanel ? nearestPanel.getPosition() : 0;
        pos += modifiedNearestPosition - originalNearestPosition;
        state.position = pos;
        var moveVector = options.horizontal ? [-pos, 0] : [0, -pos];
        var moveCoord = moveVector.map(function (coord) {
          return Math.round(coord) + "px";
        }).join(", ");
        this.cameraElement.style[transform] = state.translate.has3d ? "translate3d(" + moveCoord + ", 0px)" : "translate(" + moveCoord + ")";
      };

      __proto.resize = function () {
        var panelManager = this.panelManager;
        this.updateSize();
        this.updateOriginalPanelPositions();
        this.updateAdaptiveSize();
        this.updateScrollArea(); // Clone panels in circular mode

        if (this.options.circular && panelManager.getPanelCount() > 0) {
          this.clonePanels();
          this.updateClonedPanelPositions();
        }

        panelManager.chainAllPanels();
        this.updateCameraPosition();
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

      __proto.enable = function () {
        this.panInput.enable();
      };

      __proto.disable = function () {
        this.panInput.disable();
      };

      __proto.insert = function (index, element) {
        var _this = this;

        var lastIndex = this.panelManager.getLastIndex(); // Index should not below 0

        if (index < 0 || index > lastIndex) {
          return [];
        }

        var state = this.state;
        var parsedElements = parseElement(element);
        var panels = parsedElements.map(function (el, idx) {
          return new Panel(el, index + idx, _this.options);
        }).slice(0, lastIndex - index + 1);

        if (panels.length <= 0) {
          return [];
        }

        var pushedIndex = this.panelManager.insert(index, panels);

        if (!this.currentPanel) {
          this.currentPanel = panels[0];
        } // Update checked indexes in infinite mode


        state.checkedIndexes.forEach(function (indexes, idx) {
          var min = indexes[0],
              max = indexes[1]; // Can fill part of indexes in range

          if (isBetween(index, min, max)) {
            // Remove checked index from list
            state.checkedIndexes.splice(idx, 1);
          } else if (index < min) {
            // Push checked index
            state.checkedIndexes.splice(idx, 1, [min + pushedIndex, max + pushedIndex]);
          }
        });
        this.resize();
        return panels.map(function (panel) {
          return _this.castToFlickingPanel(panel);
        });
      };

      __proto.replace = function (index, element) {
        var _this = this;

        var panelManager = this.panelManager;
        var lastIndex = panelManager.getLastIndex(); // Index should not below 0

        if (index < 0 || index > lastIndex) {
          return [];
        }

        var state = this.state;
        var parsedElements = parseElement(element);
        var panels = parsedElements.map(function (el, idx) {
          return new Panel(el, index + idx, _this.options);
        }).slice(0, lastIndex - index + 1);

        if (panels.length <= 0) {
          return [];
        }

        panelManager.replace(index, panels);
        var currentPanel = this.currentPanel;

        if (!currentPanel) {
          this.currentPanel = panels[0];
        } else if (isBetween(currentPanel.getIndex(), index, index + panels.length - 1)) {
          // Current panel is replaced
          this.currentPanel = panelManager.get(currentPanel.getIndex());
        } // Update checked indexes in infinite mode


        state.checkedIndexes.forEach(function (indexes, idx) {
          var min = indexes[0],
              max = indexes[1]; // Can fill part of indexes in range

          if (index <= max && index + panels.length > min) {
            // Remove checked index from list
            state.checkedIndexes.splice(idx, 1);
          }
        });
        this.resize();
        return panels.map(function (panel) {
          return _this.castToFlickingPanel(panel);
        });
      };

      __proto.remove = function (index, deleteCount) {
        var _this = this;

        if (deleteCount === void 0) {
          deleteCount = 1;
        } // Index should not below 0


        index = Math.max(index, 0);
        var panelManager = this.panelManager;
        var currentIndex = this.getCurrentIndex();
        var removedPanels = panelManager.remove(index, deleteCount);

        if (isBetween(currentIndex, index, index + deleteCount - 1)) {
          // Current panel is removed
          // Use panel at removing index - 1 as new current panel if it exists
          var newCurrentIndex = Math.max(index - 1, panelManager.getRange().min);
          this.currentPanel = panelManager.get(newCurrentIndex);
        }

        this.resize();
        return removedPanels.map(function (panel) {
          return _this.castToFlickingPanel(panel);
        });
      };

      __proto.updateAdaptiveSize = function () {
        var options = this.options;
        var horizontal = options.horizontal;
        var currentPanel = this.getCurrentPanel();

        if (!currentPanel) {
          return;
        }

        var sizeToApply;

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
        this.panelManager.originalPanels().forEach(function (panel) {
          wrapper.appendChild(panel.getElement());
          panel.destroy();
        }); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.restore = function (status) {
        var panels = status.panels;
        var cameraElement = this.cameraElement;
        var panelManager = this.panelManager; // Restore index

        panelManager.clear();
        cameraElement.innerHTML = status.panels.map(function (panel) {
          return panel.html;
        }).join("");
        this.createPanels();
        this.currentPanel = panelManager.get(status.index); // Reset panel index

        panelManager.originalPanels().forEach(function (panel, idx) {
          panel.setIndex(panels[idx].index);
        });
        this.resize();
        this.axes.setTo({
          flick: status.position
        }, 0);
        this.moveCamera(status.position);
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
          basePosition = prevPanel ? prevPanel.getAnchorPosition() : basePosition = nearestAnchorPos - nearestSize - gap;
        }

        var progressBetween = (hangerPosition - basePosition) / (targetPosition - basePosition);
        var startIndex = hangerIsNextToNearestPanel ? nearestIndex : prevPanel ? prevPanel.getIndex() : nearestIndex - 1;
        return startIndex + progressBetween;
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

      __proto.connectAxesHandler = function (handlers) {
        var axes = this.axes;
        this.axesHandlers = handlers;
        axes.on(handlers);
      };

      __proto.build = function () {
        this.applyCSSValue();
        this.setAxesInstance();
        this.createPanels();
        this.setDefaultPanel();
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
        this.panInput = new Axes.PanInput(this.viewportElement, {
          inputType: options.inputType,
          thresholdAngle: options.thresholdAngle,
          scale: options.horizontal ? [-1, 0] : [0, -1]
        });
        this.axes.connect(horizontal ? ["flick", ""] : ["", "flick"], this.panInput);
      };

      __proto.createPanels = function () {
        var _this = this; // Panel elements were attached to camera element by Flicking class


        var panelElements = this.cameraElement.children; // Initialize panels

        var panels = toArray(panelElements).map(function (el, idx) {
          return new Panel(el, idx, _this.options);
        });

        if (panels.length > 0) {
          this.panelManager.append(panels);
        }
      };

      __proto.setDefaultPanel = function () {
        var options = this.options;
        var panelManager = this.panelManager;
        var indexRange = this.panelManager.getRange();
        var index = clamp(options.defaultIndex, indexRange.min, indexRange.max);
        this.currentPanel = panelManager.get(index);
      };

      __proto.clonePanels = function () {
        var _this = this;

        var state = this.state;
        var panelManager = this.panelManager;
        var viewportSize = state.size;
        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel(); // There're no panels exist

        if (!firstPanel) {
          return;
        }

        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + this.options.gap;
        var visibleAreaSize = viewportSize + firstPanel.getRelativeAnchorPosition(); // For each panels, clone itself while last panel's position + size is below viewport size

        var panels = panelManager.originalPanels();
        var cloneCount = Math.ceil(visibleAreaSize / sumOriginalPanelSize);
        var prevCloneCount = panelManager.getCloneCount();

        if (cloneCount > prevCloneCount) {
          var _loop_1 = function (cloneIndex) {
            var clones = panels.map(function (origPanel) {
              var clonedPanel = origPanel.clone(cloneIndex);

              _this.cameraElement.appendChild(clonedPanel.getElement());

              return clonedPanel;
            });
            panelManager.insertClones(cloneIndex, 0, clones);
          }; // should clone more


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

      __proto.canSetBoundMode = function () {
        var state = this.state;
        var options = this.options;
        var lastPanel = this.panelManager.lastPanel();

        if (!lastPanel) {
          return false;
        }

        var summedPanelSize = lastPanel.getPosition() + lastPanel.getSize();
        return options.bound && !options.circular && summedPanelSize >= state.size;
      };

      __proto.updateSize = function () {
        var state = this.state;
        var options = this.options;
        var viewportElement = this.viewportElement;
        var panels = this.panelManager.originalPanels();

        if (!options.horizontal) {
          // Don't preserve previous width for adaptive resizing
          viewportElement.style.width = "";
          viewportElement.style.minWidth = "";
        }

        var bbox = viewportElement.getBoundingClientRect(); // Update size & hanger position

        state.size = options.horizontal ? bbox.width : bbox.height;
        state.relativeHangerPosition = parseArithmeticExpression(options.hanger, state.size);
        state.infiniteThreshold = parseArithmeticExpression(options.infiniteThreshold, state.size); // Resize all panels

        panels.forEach(function (panel) {
          panel.resize();
        });
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

        if ((currentState.holding || currentState.playing) && nearestPanel) {
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
          var currentPosition = panel.getPosition();
          var panelSize = panel.getSize();

          if (currentPosition !== newPosition) {
            panel.setPosition(newPosition);
          }

          nextPanelPos += panelSize + gap;
        });
      };

      __proto.updateClonedPanelPositions = function () {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var clonedPanels = panelManager.clonedPanels().filter(function (panel) {
          return !!panel;
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

          if (!panel) {
            continue;
          }

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
          state.scrollArea = {
            prev: firstPanel.getPosition(),
            next: lastPanel.getPosition() + lastPanel.getSize() - state.size
          };
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
        var parsedBounce = bounce;

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
      }; // Update camera position after resizing


      __proto.updateCameraPosition = function () {
        var state = this.state;
        var axes = this.axes;
        var currentPanel = this.getCurrentPanel();
        var currentState = this.stateMachine.getState();

        if (!currentPanel || currentState.holding || currentState.playing) {
          return;
        }

        var newPosition = currentPanel.getAnchorPosition() - state.relativeHangerPosition;

        if (this.canSetBoundMode()) {
          newPosition = clamp(newPosition, state.scrollArea.prev, state.scrollArea.next);
        } // Pause & resume axes to prevent axes's "change" event triggered
        // This should be done before moveCamera, as moveCamera can trigger needPanel


        this.axes.off();
        axes.setTo({
          flick: newPosition
        }, 0);
        this.axes.on(this.axesHandlers);
        this.moveCamera(newPosition);
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
            index: 0,
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
              index: checkingPanel.getIndex(),
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
            var firstIndex = firstPanel.getIndex();

            if (firstIndex > 0) {
              this.triggerNeedPanel({
                axesEvent: axesEvent,
                index: checkingPanel.getIndex(),
                siblingPanel: checkingPanel,
                direction: DIRECTION.NEXT,
                indexRange: {
                  min: 0,
                  max: firstIndex - 1,
                  length: firstIndex
                }
              });
            }
          } // Check whether insertion happened


          lastPanel = panelManager.lastPanel();
          atLastPanel = currentIndex === lastPanel.getIndex();

          if (atLastPanel || !overThreshold) {
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
              index: checkingPanel.getIndex(),
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
            var lastIndex = lastPanel.getIndex();

            if (lastIndex < maxLastIndex) {
              this.triggerNeedPanel({
                axesEvent: axesEvent,
                index: checkingPanel.getIndex(),
                siblingPanel: checkingPanel,
                direction: DIRECTION.PREV,
                indexRange: {
                  min: lastIndex + 1,
                  max: maxLastIndex,
                  length: maxLastIndex - lastIndex
                }
              });
            }
          } // Check whether insertion happened


          firstPanel = panelManager.firstPanel();
          atFirstPanel = checkingIndex === firstPanel.getIndex(); // Looped in circular mode

          if (atFirstPanel || !overThreshold) {
            break;
          }

          checkingPanel = checkingPanel.prevSibling;
        }
      };

      __proto.triggerNeedPanel = function (params) {
        var axesEvent = params.axesEvent,
            index = params.index,
            siblingPanel = params.siblingPanel,
            direction = params.direction,
            indexRange = params.indexRange;
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
        var isTrusted = axesEvent ? axesEvent.isTrusted : false;
        var panel = siblingPanel ? this.castToFlickingPanel(siblingPanel) : null;
        this.triggerEvent(EVENTS.NEED_PANEL, axesEvent, isTrusted, {
          index: index,
          panel: panel,
          direction: direction,
          range: indexRange
        });
      };

      return Viewport;
    }();

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
       * @param {string} [options.classPrefix="eg-flick"] A prefix of class name will be added for the panels, viewport and camera.<ko>패널들과 뷰포트, 카메라에 추가될 클래스 이름의 접두사.</ko>
       * @param {number} [options.deceleration=0.0075] Deceleration value for panel movement animation for animation triggered by manual user input. Higher value means shorter running time.<ko>사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
       * @param {boolean} [options.horizontal=true] Direction of panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true: 가로방향, false: 세로방향)</ko>
       * @param {boolean} [options.circular=false] Enables circular mode, which connects first/last panel for continuous scrolling<ko>순환 모드를 활성화한다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능하다.</ko>
       * @param {boolean} [options.infinite=false] Enables infinite mode, which can automatically trigger needPanel until reaching last panel's index reaches lastIndex<ko>무한 모드를 활성화한다. 무한 모드에서는 needPanel 이벤트를 자동으로 트리거한다. 해당 동작은 마지막 패널의 인덱스가 lastIndex와 일치할때까지 일어난다.</ko>
       * @param {number} [options.infiniteThreshold=0] A Threshold from viewport edge before triggering `needPanel` event in infinite mode.<ko>무한 모드에서 `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리.</ko>
       * @param {number} [options.lastIndex=Infinity] Maximum panel index that Flicking can set. Flicking won't trigger `needPanel` when event's panel index is greater than it.<br>Also, if last panel's index reached given index, you can't add more panels.<ko>Flicking이 설정 가능한 패널의 최대 인덱스. `needPanel` 이벤트에 지정된 인덱스가 최대 패널의 개수보다 같거나 커야 하는 경우에 이벤트를 트리거하지 않게 한다.<br>또한, 마지막 패널의 인덱스가 주어진 인덱스와 동일할 경우, 새로운 패널을 더 이상 추가할 수 없다.</ko>
       * @param {number} [options.threshold=40] Movement threshold to change panel(unit: pixel). It should be dragged above the threshold to change current panel.<ko>패널 변경을 위한 이동 임계값 (단위: 픽셀). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.</ko>
       * @param {number} [options.duration=100] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @param {function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] An easing function applied to the panel movement animation. Default value is `easeOutCubic`.<ko>패널 이동 애니메이션에 적용할 easing함수. 기본값은 `easeOutCubic`이다.</ko>
       * @param {number} [options.defaultIndex=0] Index of panel to set as default when initializing. A zero-based integer.<ko>초기화시 지정할 디폴트 패널의 인덱스로, 0부터 시작하는 정수.</ko>
       * @param {string[]} [options.inputType=["touch,"mouse"]] Types of input devices to enable.({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Reference})<ko>활성화할 입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 참고})</ko>
       * @param {number} [options.thresholdAngle=45] The threshold angle value(0 ~ 90).<br>If input angle from click/touched position is above or below this value in horizontal and vertical mode each, scrolling won't happen.<ko>스크롤 동작을 막기 위한 임계각(0 ~ 90).<br>클릭/터치한 지점으로부터 계산된 사용자 입력의 각도가 horizontal/vertical 모드에서 각각 크거나 작으면, 스크롤 동작이 이루어지지 않는다.</ko>
       * @param {number|string|number[]|string[]} [options.bounce=[10,10]] The size value of the bounce area. Only can be enabled when `circular=false`.<br>You can set different bounce value for prev/next direction by using array.<br>`number` for px value, and `string` for px, and % value relative to viewport size.(ex - 0, "10px", "20%")<ko>바운스 영역의 크기값. `circular=false`인 경우에만 사용할 수 있다.<br>배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정 가능하다.<br>`number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있다.(ex - 0, "10px", "20%")</ko>
       * @param {boolean} [options.autoResize=false] Whether resize() method should be called automatically after window resize event.<ko>window의 `resize` 이벤트 이후 자동으로 resize()메소드를 호출할지의 여부.</ko>
       * @param {boolean} [options.adaptive=false] Whether the height(horizontal)/width(vertical) of the viewport element reflects the height/width value of the panel after completing the movement.<ko>목적 패널로 이동한 후 그 패널의 높이(horizontal)/너비(vertical)값을 뷰포트 요소의 높이/너비값에 반영할지 여부.</ko>
       * @param {number} [options.zIndex=2000] z-index value for viewport element.<ko>뷰포트 엘리먼트의 z-index 값.</ko>
       * @param {boolean} [options.bound=false] Prevent view from going out of first/last panel. Only can be enabled when `circular=false`.<ko>뷰가 첫번째와 마지막 패널 밖으로 나가는 것을 막아준다. `circular=false`인 경우에만 사용할 수 있다.</ko>
       * @param {boolean} [options.overflow=false] Disables CSS property `overflow: hidden` in viewport if `true`.<ko>`true`로 설정시 뷰포트에 `overflow: hidden` 속성을 해제한다.</ko>
       * @param {string} [options.hanger="50%"] Reference position of hanger in viewport, which hangs panel anchors should be stopped at.<br>Should be provided in px or % value of viewport size.<br>You can combinate those values with plus/minus sign<br>ex) "50", "100px", "0%", "25% + 100px"<ko>뷰포트 내부의 행어의 위치. 패널의 앵커들이 뷰포트 내에서 멈추는 지점에 해당한다.<br>px값이나, 뷰포트의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {string} [options.anchor="50%"] Reference position of anchor in panels, which can be hanged by viewport hanger.<br>Should be provided in px or % value of panel size.<br>You can combinate those values with plus/minus sign<br>ex) "50", "100px", "0%", "25% + 100px"<ko>패널 내부의 앵커의 위치. 뷰포트의 행어와 연계하여 패널이 화면 내에서 멈추는 지점을 설정할 수 있다.<br>px값이나, 패널의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {number} [options.gap=0] Space between each panels. Should be given in number.(px).<ko>패널간에 부여할 간격의 크기를 나타내는 숫자.(px)</ko>
       * @param {eg.Flicking.MoveTypeOption} [options.moveType="snap"] Movement style by user input.(ex: snap, freeScroll)<ko>사용자 입력에 의한 이동 방식.(ex: snap, freeScroll)</ko>
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
              cameraChange = -Math.sign(cameraChange) * (scrollAreaSize - Math.abs(cameraChange));
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
        }

        _this.build();

        return _this;
      }
      /**
       * Move to the previous panel if it exists.
       * @ko 이전 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      var __proto = Flicking.prototype;

      __proto.prev = function (duration) {
        var options = this.options;
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var currentIndex = viewport.getCurrentIndex();
        var indexRange = panelManager.getRange();
        var panelCount = panelManager.getPanelCount();
        var lastIndex = panelManager.getLastIndex();
        var minimumRange = options.infinite ? 0 : indexRange.min;
        var prevIndex = currentIndex - 1;

        if (prevIndex < minimumRange) {
          prevIndex = this.options.circular && panelCount > 0 ? options.infinite ? lastIndex : indexRange.max : -1;
        }

        return this.moveTo(prevIndex, duration);
      };
      /**
       * Move to the next panel if it exists.
       * @ko 다음 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation(unit: ms).<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.next = function (duration) {
        var options = this.options;
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var currentIndex = viewport.getCurrentIndex();
        var indexRange = panelManager.getRange();
        var panelCount = panelManager.getPanelCount();
        var lastIndex = panelManager.getLastIndex();
        var maximumRange = options.infinite ? lastIndex : indexRange.max;
        var nextIndex = currentIndex + 1;

        if (nextIndex > maximumRange) {
          nextIndex = options.circular && panelCount > 0 ? options.infinite ? 0 : indexRange.min : -1;
        }

        return this.moveTo(nextIndex, duration);
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
        var offset = 0;

        if (this.options.circular) {
          var scrollAreaSize = viewport.getScrollAreaSize(); // Check all three possible locations, find the nearest position among them.

          var possiblePositions = [anchorPosition - scrollAreaSize, anchorPosition, anchorPosition + scrollAreaSize];
          var nearestPosition = possiblePositions.reduce(function (nearest, current) {
            return Math.abs(current - hangerPosition) < Math.abs(nearest - hangerPosition) ? current : nearest;
          }, Infinity);
          offset = nearestPosition - anchorPosition;
        }

        var currentIndex = this.getIndex();

        if (hangerPosition === anchorPosition + offset && currentIndex === index) {
          return this;
        }

        var eventType = panel.getIndex() === viewport.getCurrentIndex() ? "" : EVENTS.CHANGE;
        viewport.moveTo(panel, eventType, null, offset, duration);
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
       * Return current panel. `null` if no panel exists.
       * @ko 현재 패널을 반환한다. 패널이 하나도 없을 경우 `null`을 반환한다.
       * @return Current panel.<ko>현재 패널.</ko>
       */


      __proto.getCurrentPanel = function () {
        var viewport = this.viewport;
        var panel = viewport.getCurrentPanel();
        return panel ? viewport.castToFlickingPanel(panel) : null;
      };
      /**
       * Return the panel of given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 패널을 반환한다. 해당 패널이 존재하지 않을 시 `null`이다.
       * @return Panel of given index.<ko>주어진 인덱스에 해당하는 패널.</ko>
       */


      __proto.getPanel = function (index) {
        var viewport = this.viewport;
        var panel = viewport.panelManager.get(index);
        return panel ? viewport.castToFlickingPanel(panel) : null;
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
        }).map(function (panel) {
          return viewport.castToFlickingPanel(panel);
        });
      };
      /**
       * Return the panels currently shown in viewport area.
       * @ko 현재 뷰포트 영역에서 보여지고 있는 패널들을 반환한다.
       * @return Panels currently shown in viewport area.<ko>현재 뷰포트 영역에 보여지는 패널들</ko>
       */


      __proto.getVisiblePanels = function () {
        return this.getAllPanels(true).filter(function (panel) {
          var outsetProgress = panel.getOutsetProgress();
          return outsetProgress > -1 && outsetProgress < 1;
        });
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
       * Set last panel index for `infinite' mode.<br>[needPanel]{@link eg.Flicking#events:needPanel} won't be triggered anymore when last panel's index reaches it.<br>Also, you can't add more panels after it.
       * @ko `infinite` 모드에서 적용되는 패널의 최대 인덱스를 설정한다.<br>마지막 패널의 인덱스가 설정한 값에 도달할 경우 더 이상 [needPanel]{@link eg.Flicking#events:needPanel} 이벤트가 발생되지 않는다.<br>또한, 설정한 인덱스 이후로 새로운 패널을 추가할 수 없다.
       * @param - Last panel index.
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
            index: panel.getIndex()
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
        var _this = this;

        var newPlugins = [].concat(plugins);
        newPlugins.forEach(function (plugin) {
          plugin.init(_this);
        });
        this.plugins = this.plugins.concat(newPlugins);
        return this;
      };
      /**
       * Remove plugins from Flicking.
       * @ko 플리킹으로부터 플러그인들을 제거한다.
       * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.removePlugins = function (plugins) {
        var _this = this;

        var currentPlugins = this.plugins;
        var removedPlugins = [].concat(plugins);
        removedPlugins.forEach(function (plugin) {
          var index = currentPlugins.indexOf(plugin);

          if (index > -1) {
            currentPlugins.splice(index, 1);
          }

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
       * Update panels to current state.
       * @ko 패널들을 현재 상태에 맞춰 갱신한다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.resize = function () {
        var viewport = this.viewport;
        viewport.panelManager.allPanels().forEach(function (panel) {
          return panel.reset();
        });
        viewport.resize();
        return this;
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
        return viewport.insert(insertingIndex, parsedElements);
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
        return viewport.insert(viewport.panelManager.getRange().max + 1, element);
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
        return this.viewport.replace(index, element);
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

      __proto.build = function () {
        this.initViewport();
        this.listenInput();
        this.listenResize();
      };

      __proto.initViewport = function () {
        var wrapper = this.wrapper;
        var options = this.options;
        var cameraElement = document.createElement("div"); // Make all panels to be a child of camera element
        // wrapper <- viewport <- camera <- panels[1...n]

        toArray(wrapper.children).forEach(function (child) {
          cameraElement.appendChild(child);
        }); // Clipping area for camera element

        var viewportElement = document.createElement("div");
        viewportElement.appendChild(cameraElement); // Add viewport element to wrapper

        wrapper.appendChild(viewportElement); // Make viewport instance with panel container element

        this.viewport = new Viewport(this, viewportElement, cameraElement, options, this.triggerEvent);
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


      Flicking.VERSION = "3.0.0";
      /**
       * Direction constant - "PREV" or "NEXT"
       * @ko 방향 상수 - "PREV" 또는 "NEXT"
       * @example
       * eg.Flicking.DIRECTION.PREV; // "PREV"
       * eg.Flicking.DIRECTION.NEXT; // "NEXT"
       */

      Flicking.DIRECTION = DIRECTION;
      /**
       * Event type object
       * @ko 이벤트 이름 문자열들을 담은 객체
       */

      Flicking.EVENTS = EVENTS;
      return Flicking;
    }(Component);

    return Flicking;

}));
//# sourceMappingURL=flicking.js.map
