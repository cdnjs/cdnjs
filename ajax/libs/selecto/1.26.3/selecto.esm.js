/*
Copyright (c) 2020 Daybrush
name: selecto
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/selecto.git
version: 1.26.3
*/
import EventEmitter from '@scena/event-emitter';
import Gesto from 'gesto';
import { Properties } from 'framework-utils';
import { getDocument, hasClass, addClass, calculateBoundSize, getDist, getWindow, isObject, isString, isNode, removeEvent, isFunction, addEvent, isArray, camelize, splitUnit, between } from '@daybrush/utils';
import { diff } from '@egjs/children-differ';
import DragScroll from '@scena/dragscroll';
import KeyController, { getCombi } from 'keycon';
import { fitPoints, getOverlapPoints, isInside, getAreaSize } from 'overlap-area';
import { createMatrix, getDistElementMatrix, calculateMatrixDist } from 'css-to-mat';
import styled from 'css-styled';

/******************************************************************************
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
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function getClient(e) {
  if ("touches" in e) {
    var touch = e.touches[0] || e.changedTouches[0];
    return {
      clientX: touch.clientX,
      clientY: touch.clientY
    };
  } else {
    return {
      clientX: e.clientX,
      clientY: e.clientY
    };
  }
}
function filterDuplicated(arr) {
  if (typeof Map === "undefined") {
    return arr.filter(function (value, index) {
      return arr.indexOf(value) === index;
    });
  }

  var map = new Map();
  return arr.filter(function (value) {
    if (map.has(value)) {
      return false;
    }

    map.set(value, true);
    return true;
  });
}
function elementFromPoint(baseNode, clientX, clientY) {
  var doc = getDocument(baseNode);
  return doc.elementFromPoint && doc.elementFromPoint(clientX, clientY) || null;
}
function createElement(jsx, prevTarget, container) {
  var tag = jsx.tag,
      children = jsx.children,
      attributes = jsx.attributes,
      className = jsx.className,
      style = jsx.style;
  var el = prevTarget || getDocument(container).createElement(tag);

  for (var name in attributes) {
    el.setAttribute(name, attributes[name]);
  }

  var elChildren = el.children;
  children.forEach(function (child, i) {
    createElement(child, elChildren[i], el);
  });

  if (className) {
    className.split(/\s+/g).forEach(function (name) {
      if (name && !hasClass(el, name)) {
        addClass(el, name);
      }
    });
  }

  if (style) {
    var elStyle = el.style;

    for (var name in style) {
      elStyle[name] = style[name];
    }
  }

  if (!prevTarget && container) {
    container.appendChild(el);
  }

  return el;
}
function h(tag, attrs) {
  var children = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    children[_i - 2] = arguments[_i];
  }

  var _a = attrs || {},
      _b = _a.className,
      className = _b === void 0 ? "" : _b,
      _c = _a.style,
      style = _c === void 0 ? {} : _c,
      attributes = __rest(_a, ["className", "style"]);

  return {
    tag: tag,
    className: className,
    style: style,
    attributes: attributes,
    children: children
  };
}
function diffValue(prev, cur, func) {
  if (prev !== cur) {
    func(prev, cur);
  }
}
function getRect(e, ratio, boundArea) {
  var _a;

  if (boundArea === void 0) {
    boundArea = e.data.boundArea;
  }

  var _b = e.distX,
      distX = _b === void 0 ? 0 : _b,
      _c = e.distY,
      distY = _c === void 0 ? 0 : _c;
  var _d = e.data,
      startX = _d.startX,
      startY = _d.startY;

  if (ratio > 0) {
    var nextHeight = Math.sqrt((distX * distX + distY * distY) / (1 + ratio * ratio));
    var nextWidth = ratio * nextHeight;
    distX = (distX >= 0 ? 1 : -1) * nextWidth;
    distY = (distY >= 0 ? 1 : -1) * nextHeight;
  }

  var width = Math.abs(distX);
  var height = Math.abs(distY);
  var maxWidth = distX < 0 ? startX - boundArea.left : boundArea.right - startX;
  var maxHeight = distY < 0 ? startY - boundArea.top : boundArea.bottom - startY;
  _a = calculateBoundSize([width, height], [0, 0], [maxWidth, maxHeight], !!ratio), width = _a[0], height = _a[1];
  distX = (distX >= 0 ? 1 : -1) * width;
  distY = (distY >= 0 ? 1 : -1) * height;
  var tx = Math.min(0, distX);
  var ty = Math.min(0, distY);
  var left = startX + tx;
  var top = startY + ty;
  return {
    left: left,
    top: top,
    right: left + width,
    bottom: top + height,
    width: width,
    height: height
  };
}
function getDefaultElementRect(el) {
  var rect = el.getBoundingClientRect();
  var left = rect.left,
      top = rect.top,
      width = rect.width,
      height = rect.height;
  return {
    pos1: [left, top],
    pos2: [left + width, top],
    pos3: [left, top + height],
    pos4: [left + width, top + height]
  };
}
function passTargets(beforeTargets, afterTargets, continueSelectWithoutDeselect) {
  var _a = diff(beforeTargets, afterTargets),
      list = _a.list,
      prevList = _a.prevList,
      added = _a.added,
      removed = _a.removed,
      maintained = _a.maintained;

  return __spreadArray(__spreadArray(__spreadArray([], added.map(function (index) {
    return list[index];
  }), true), removed.map(function (index) {
    return prevList[index];
  }), true), continueSelectWithoutDeselect ? maintained.map(function (_a) {
    var nextIndex = _a[1];
    return list[nextIndex];
  }) : [], true);
}
function getLineSize(points) {
  var size = 0;
  var length = points.length;

  for (var i = 1; i < length; ++i) {
    size = Math.max(getDist(points[i], points[i - 1]), size);
  }

  return size;
}

var injector = styled("\n:host {\n    position: fixed;\n    display: none;\n    border: 1px solid #4af;\n    background: rgba(68, 170, 255, 0.5);\n    pointer-events: none;\n    will-change: transform;\n    z-index: 100;\n}\n");
/**
 * @memberof Selecto
 */

var CLASS_NAME = "selecto-selection ".concat(injector.className);
var PROPERTIES = ["className", "boundContainer", "selectableTargets", "selectByClick", "selectFromInside", "continueSelect", "continueSelectWithoutDeselect", "toggleContinueSelect", "toggleContinueSelectWithoutDeselect", "keyContainer", "hitRate", "scrollOptions", "checkInput", "preventDefault", "ratio", "getElementRect", "preventDragFromInside", "rootContainer", "dragCondition", "clickBySelectEnd", "checkOverflow", "innerScrollOptions"];
/**
 * @memberof Selecto
 */

var OPTIONS = __spreadArray([// ignore target, container,
"dragContainer", "cspNonce", "preventClickEventOnDrag", "preventClickEventOnDragStart", "preventRightClick"], PROPERTIES, true);
var OPTION_TYPES = {
  className: String,
  boundContainer: null,
  portalContainer: null,
  container: null,
  dragContainer: null,
  selectableTargets: Array,
  selectByClick: Boolean,
  selectFromInside: Boolean,
  continueSelect: Boolean,
  toggleContinueSelect: Array,
  toggleContinueSelectWithoutDeselect: Array,
  keyContainer: null,
  hitRate: Number,
  scrollOptions: Object,
  checkInput: Boolean,
  preventDefault: Boolean,
  cspNonce: String,
  ratio: Number,
  getElementRect: Function,
  preventDragFromInside: Boolean,
  rootContainer: Object,
  dragCondition: Function,
  clickBySelectEnd: Boolean,
  continueSelectWithoutDeselect: Boolean,
  preventClickEventOnDragStart: Boolean,
  preventClickEventOnDrag: Boolean,
  checkOverflow: Boolean,
  innerScrollOptions: Object
};
/**
 * @memberof Selecto
 */

var EVENTS = ["dragStart", "drag", "dragEnd", "selectStart", "select", "selectEnd", "keydown", "keyup", "scroll", "innerScroll"];
/**
 * @memberof Selecto
 */

var METHODS = ["clickTarget", "getSelectableElements", "setSelectedTargets", "getElementPoints", "getSelectedTargets", "findSelectableTargets", "triggerDragStart", "checkScroll", "selectTargetsByPoints", "setSelectedTargetsByPoints"];

/**
 * Selecto.js is a component that allows you to select elements in the drag area using the mouse or touch.
 * @sort 1
 * @extends EventEmitter
 */

var Selecto =
/*#__PURE__*/
function (_super) {
  __extends(Selecto, _super);
  /**
   *
   */


  function Selecto(options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.selectedTargets = [];
    _this.dragScroll = new DragScroll();

    _this._onDragStart = function (e, clickedTarget) {
      var data = e.data,
          clientX = e.clientX,
          clientY = e.clientY,
          inputEvent = e.inputEvent;
      var _a = _this.options,
          selectFromInside = _a.selectFromInside,
          selectByClick = _a.selectByClick,
          rootContainer = _a.rootContainer,
          boundContainer = _a.boundContainer,
          _b = _a.preventDragFromInside,
          preventDragFromInside = _b === void 0 ? true : _b,
          clickBySelectEnd = _a.clickBySelectEnd,
          dragCondition = _a.dragCondition;

      if (dragCondition && !dragCondition(e)) {
        e.stop();
        return;
      }

      data.data = {};
      var win = getWindow(_this.container);
      data.innerWidth = win.innerWidth;
      data.innerHeight = win.innerHeight;

      _this.findSelectableTargets(data);

      data.startSelectedTargets = _this.selectedTargets;
      data.scaleMatrix = createMatrix();
      data.containerX = 0;
      data.containerY = 0;
      var container = _this.container;
      var boundArea = {
        left: -Infinity,
        top: -Infinity,
        right: Infinity,
        bottom: Infinity
      };

      if (rootContainer) {
        var containerRect = _this.container.getBoundingClientRect();

        data.containerX = containerRect.left;
        data.containerY = containerRect.top;
        data.scaleMatrix = getDistElementMatrix(_this.container, rootContainer);
      }

      if (boundContainer) {
        var boundInfo = isObject(boundContainer) && "element" in boundContainer ? __assign({
          left: true,
          top: true,
          bottom: true,
          right: true
        }, boundContainer) : {
          element: boundContainer,
          left: true,
          top: true,
          bottom: true,
          right: true
        };
        var boundElement = boundInfo.element;
        var rectElement = void 0;

        if (boundElement) {
          if (isString(boundElement)) {
            rectElement = getDocument(container).querySelector(boundElement);
          } else if (boundElement === true) {
            rectElement = _this.container;
          } else {
            rectElement = boundElement;
          }

          var rect = rectElement.getBoundingClientRect();

          if (boundInfo.left) {
            boundArea.left = rect.left;
          }

          if (boundInfo.top) {
            boundArea.top = rect.top;
          }

          if (boundInfo.right) {
            boundArea.right = rect.right;
          }

          if (boundInfo.bottom) {
            boundArea.bottom = rect.bottom;
          }
        }
      }

      data.boundArea = boundArea;
      var hitRect = {
        left: clientX,
        top: clientY,
        right: clientX,
        bottom: clientY,
        width: 0,
        height: 0
      };
      var firstPassedTargets = []; // allow click on select

      var allowClickBySelectEnd = selectByClick && !clickBySelectEnd;
      var hasInsideTargets = false;

      if (!selectFromInside || allowClickBySelectEnd) {
        var pointTarget = _this._findElement(clickedTarget || inputEvent.target, // elementFromPoint(clientX, clientY),
        data.selectableTargets);

        hasInsideTargets = !!pointTarget;

        if (allowClickBySelectEnd) {
          firstPassedTargets = pointTarget ? [pointTarget] : [];
        }
      }

      var isPreventSelect = !selectFromInside && hasInsideTargets; // prevent drag from inside when selectByClick is false

      if (isPreventSelect && !selectByClick) {
        e.stop();
        return false;
      }

      var type = inputEvent.type;
      var isTrusted = type === "mousedown" || type === "touchstart";
      /**
       * When the drag starts (triggers on mousedown or touchstart), the dragStart event is called.
       * Call the stop () function if you have a specific element or don't want to raise a select
       * @memberof Selecto
       * @event dragStart
       * @param {OnDragStart} - Parameters for the dragStart event
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto({
       *   container: document.body,
       *   selectByClick: true,
       *   selectFromInside: false,
       * });
       *
       * selecto.on("dragStart", e => {
       *   if (e.inputEvent.target.tagName === "SPAN") {
       *     e.stop();
       *   }
       * }).on("select", e => {
       *   e.added.forEach(el => {
       *     el.classList.add("selected");
       *   });
       *   e.removed.forEach(el => {
       *     el.classList.remove("selected");
       *   });
       * });
       */

      var result = !e.isClick && isTrusted ? _this.emit("dragStart", __assign(__assign({}, e), {
        data: data.data
      })) : true;

      if (!result) {
        e.stop();
        return false;
      }

      if (_this.continueSelect) {
        firstPassedTargets = passTargets(_this.selectedTargets, firstPassedTargets, _this.continueSelectWithoutDeselect);
        data.startPassedTargets = _this.selectedTargets;
      } else {
        data.startPassedTargets = [];
      }

      _this._select(firstPassedTargets, hitRect, e, true, isPreventSelect && selectByClick && !clickBySelectEnd && preventDragFromInside);

      data.startX = clientX;
      data.startY = clientY;
      data.selectFlag = false;
      data.preventDragFromInside = false;

      if (inputEvent.target) {
        var offsetPos = calculateMatrixDist(data.scaleMatrix, [clientX - data.containerX, clientY - data.containerY]);
        _this.target.style.cssText += "position: ".concat(rootContainer ? "absolute" : "fixed", ";") + "left:0px;top:0px;" + "transform: translate(".concat(offsetPos[0], "px, ").concat(offsetPos[1], "px)");
      }

      if (isPreventSelect && selectByClick && !clickBySelectEnd) {
        inputEvent.preventDefault(); // prevent drag from inside when selectByClick is true and force call `selectEnd`

        if (preventDragFromInside) {
          _this._selectEnd(data.startSelectedTargets, data.startPassedTargets, hitRect, e, true);

          data.preventDragFromInside = true;
        }
      } else {
        data.selectFlag = true; // why?
        // if (type === "touchstart") {
        //     inputEvent.preventDefault();
        // }

        var _c = _this.options,
            scrollOptions = _c.scrollOptions,
            innerScrollOptions = _c.innerScrollOptions;
        var isInnerScroll = false;

        if (innerScrollOptions) {
          var inputEvent_1 = e.inputEvent;
          var target = inputEvent_1.target;
          var innerScrollElement = null;
          var parentElement = target;

          while (parentElement && parentElement !== getDocument(container).body) {
            var overflow = getComputedStyle(parentElement).overflow !== "visible";

            if (overflow) {
              innerScrollElement = parentElement;
              break;
            }

            parentElement = parentElement.parentElement;
          }

          if (innerScrollElement) {
            data.innerScrollOptions = __assign({
              container: innerScrollElement,
              checkScrollEvent: true
            }, innerScrollOptions === true ? {} : innerScrollOptions);

            _this.dragScroll.dragStart(e, data.innerScrollOptions);

            isInnerScroll = true;
          }
        }

        if (!isInnerScroll && scrollOptions && scrollOptions.container) {
          _this.dragScroll.dragStart(e, scrollOptions);
        }

        if (isPreventSelect && selectByClick && clickBySelectEnd) {
          data.selectFlag = false;
          e.preventDrag();
        }
      }

      return true;
    };

    _this._onDrag = function (e) {
      if (e.data.selectFlag) {
        var scrollOptions = _this.scrollOptions;
        var innerScrollOptions = e.data.innerScrollOptions;
        var hasScrollOptions = innerScrollOptions || (scrollOptions === null || scrollOptions === void 0 ? void 0 : scrollOptions.container); // If it is a scrolling position, pass drag

        if (hasScrollOptions && !e.isScroll && _this.dragScroll.drag(e, innerScrollOptions || scrollOptions)) {
          return;
        }
      }

      _this._checkSelected(e);
    };

    _this._onDragEnd = function (e) {
      var data = e.data,
          inputEvent = e.inputEvent;
      var rect = getRect(e, _this.options.ratio);
      var selectFlag = data.selectFlag;
      var container = _this.container;
      /**
       * When the drag ends (triggers on mouseup or touchend after drag), the dragEnd event is called.
       * @memberof Selecto
       * @event dragEnd
       * @param {OnDragEnd} - Parameters for the dragEnd event
       */

      if (inputEvent) {
        _this.emit("dragEnd", __assign(__assign({
          isDouble: !!e.isDouble,
          isClick: !!e.isClick,
          isDrag: false,
          isSelect: selectFlag
        }, e), {
          data: data.data,
          rect: rect
        }));
      }

      _this.target.style.cssText += "display: none;";

      if (selectFlag) {
        data.selectFlag = false;

        _this.dragScroll.dragEnd();
      } else if (_this.selectByClick && _this.clickBySelectEnd) {
        // only clickBySelectEnd
        var pointTarget = _this._findElement((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.target) || elementFromPoint(container, e.clientX, e.clientY), data.selectableTargets);

        _this._select(pointTarget ? [pointTarget] : [], rect, e);
      }

      if (!data.preventDragFromInside) {
        _this._selectEnd(data.startSelectedTargets, data.startPassedTargets, rect, e);
      }
    };

    _this._onKeyDown = function (e) {
      var options = _this.options;
      var isKeyDown = false;

      if (!_this._keydownContinueSelect) {
        var result = _this._sameCombiKey(e, options.toggleContinueSelect);

        _this._keydownContinueSelect = result;
        isKeyDown || (isKeyDown = result);
      }

      if (!_this._keydownContinueSelectWithoutDeselection) {
        var result = _this._sameCombiKey(e, options.toggleContinueSelectWithoutDeselect);

        _this._keydownContinueSelectWithoutDeselection = result;
        isKeyDown || (isKeyDown = result);
      }

      if (!isKeyDown) {
        return;
      }
      /**
       * When you keydown the key you specified in toggleContinueSelect, the keydown event is called.
       * @memberof Selecto
       * @event keydown
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto({
       *   container: document.body,
       *   toggleContinueSelect: "shift";
       *   keyContainer: window,
       * });
       *
       * selecto.on("keydown", () => {
       *   document.querySelector(".button").classList.add("selected");
       * }).on("keyup", () => {
       *   document.querySelector(".button").classList.remove("selected");
       * }).on("select", e => {
       *   e.added.forEach(el => {
       *     el.classList.add("selected");
       *   });
       *   e.removed.forEach(el => {
       *     el.classList.remove("selected");
       *   });
       * });
       */


      _this.emit("keydown", {
        keydownContinueSelect: _this._keydownContinueSelect,
        keydownContinueSelectWithoutDeselection: _this._keydownContinueSelectWithoutDeselection
      });
    };

    _this._onKeyUp = function (e) {
      var options = _this.options;
      var isKeyUp = false;

      if (_this._keydownContinueSelect) {
        var result = _this._sameCombiKey(e, options.toggleContinueSelect, true);

        _this._keydownContinueSelect = !result;
        isKeyUp || (isKeyUp = result);
      }

      if (_this._keydownContinueSelectWithoutDeselection) {
        var result = _this._sameCombiKey(e, options.toggleContinueSelectWithoutDeselect, true);

        _this._keydownContinueSelectWithoutDeselection = !result;
        isKeyUp || (isKeyUp = result);
      }

      if (!isKeyUp) {
        return;
      }
      /**
       * When you keyup the key you specified in toggleContinueSelect, the keyup event is called.
       * @memberof Selecto
       * @event keyup
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto({
       *   container: document.body,
       *   toggleContinueSelect: "shift";
       *   keyContainer: window,
       * });
       *
       * selecto.on("keydown", () => {
       *   document.querySelector(".button").classList.add("selected");
       * }).on("keyup", () => {
       *   document.querySelector(".button").classList.remove("selected");
       * }).on("select", e => {
       *   e.added.forEach(el => {
       *     el.classList.add("selected");
       *   });
       *   e.removed.forEach(el => {
       *     el.classList.remove("selected");
       *   });
       * });
       */


      _this.emit("keyup", {
        keydownContinueSelect: _this._keydownContinueSelect,
        keydownContinueSelectWithoutDeselection: _this._keydownContinueSelectWithoutDeselection
      });
    };

    _this._onBlur = function () {
      if (_this._keydownContinueSelect || _this._keydownContinueSelectWithoutDeselection) {
        _this._keydownContinueSelect = false;
        _this._keydownContinueSelectWithoutDeselection = false;

        _this.emit("keyup", {
          keydownContinueSelect: _this._keydownContinueSelect,
          keydownContinueSelectWithoutDeselection: _this._keydownContinueSelectWithoutDeselection
        });
      }
    };

    _this._onDocumentSelectStart = function (e) {
      var doc = getDocument(_this.container);

      if (!_this.gesto.isFlag()) {
        return;
      }

      var dragContainer = _this.dragContainer;

      if (dragContainer === getWindow(_this.container)) {
        dragContainer = doc.documentElement;
      }

      var containers = isNode(dragContainer) ? [dragContainer] : [].slice.call(dragContainer);
      var target = e.target;
      containers.some(function (container) {
        if (container === target || container.contains(target)) {
          e.preventDefault();
          return true;
        }
      });
    };

    _this.target = options.portalContainer;
    var container = options.container;
    _this.options = __assign({
      className: "",
      portalContainer: null,
      container: null,
      dragContainer: null,
      selectableTargets: [],
      selectByClick: true,
      selectFromInside: true,
      clickBySelectEnd: false,
      hitRate: 100,
      continueSelect: false,
      continueSelectWithoutDeselect: false,
      toggleContinueSelect: null,
      toggleContinueSelectWithoutDeselect: null,
      keyContainer: null,
      scrollOptions: null,
      checkInput: false,
      preventDefault: false,
      boundContainer: false,
      preventDragFromInside: true,
      dragCondition: null,
      rootContainer: null,
      checkOverflow: false,
      innerScrollOptions: false,
      getElementRect: getDefaultElementRect,
      cspNonce: "",
      ratio: 0
    }, options);
    var portalContainer = _this.options.portalContainer;

    if (portalContainer) {
      container = portalContainer.parentElement;
    }

    _this.container = container || document.body;

    _this.initElement();

    _this.initDragScroll();

    _this.setKeyController();

    return _this;
  }
  /**
   * You can set the currently selected targets.
   * selectByClick, continueSelect, and continueSelectWithoutDeselect are not applied.
   */


  var __proto = Selecto.prototype;

  __proto.setSelectedTargets = function (selectedTargets) {
    var beforeSelected = this.selectedTargets;

    var _a = diff(beforeSelected, selectedTargets),
        added = _a.added,
        removed = _a.removed,
        prevList = _a.prevList,
        list = _a.list;

    this.selectedTargets = selectedTargets;
    return {
      added: added.map(function (index) {
        return list[index];
      }),
      removed: removed.map(function (index) {
        return prevList[index];
      }),
      beforeSelected: beforeSelected,
      selected: selectedTargets
    };
  };
  /**
   * You can set the currently selected targets by points
   * selectByClick, continueSelect, and continueSelectWithoutDeselect are not applied.
   */


  __proto.setSelectedTargetsByPoints = function (point1, point2) {
    var left = Math.min(point1[0], point2[0]);
    var top = Math.min(point1[1], point2[1]);
    var right = Math.max(point1[0], point2[0]);
    var bottom = Math.max(point1[1], point2[1]);
    var rect = {
      left: left,
      top: top,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top
    };
    var data = {
      ignoreClick: true
    };
    this.findSelectableTargets(data);
    var selectedElements = this.hitTest(rect, data, true, null);
    var result = this.setSelectedTargets(selectedElements);
    return __assign(__assign({}, result), {
      rect: rect
    });
  };
  /**
   * Select target by virtual drag from startPoint to endPoint.
   * The target of inputEvent is null.
   */


  __proto.selectTargetsByPoints = function (startPoint, endPoint) {
    var mousedown = new MouseEvent("mousedown", {
      clientX: startPoint[0],
      clientY: startPoint[1],
      cancelable: true,
      bubbles: true
    });
    var mousemove = new MouseEvent("mousemove", {
      clientX: endPoint[0],
      clientY: endPoint[1],
      cancelable: true,
      bubbles: true
    });
    var mouseup = new MouseEvent("mousemove", {
      clientX: endPoint[0],
      clientY: endPoint[1],
      cancelable: true,
      bubbles: true
    });
    var gesto = this.gesto;
    var result = gesto.onDragStart(mousedown);

    if (result !== false) {
      gesto.onDrag(mousemove);
      gesto.onDragEnd(mouseup);
    }
  };
  /**
   * You can get the currently selected targets.
   */


  __proto.getSelectedTargets = function () {
    return this.selectedTargets;
  };
  /**
   * `OnDragStart` is triggered by an external event.
   * @param - external event
   * @example
   * import Selecto from "selecto";
   *
   * const selecto = new Selecto();
   *
   * window.addEventListener("mousedown", e => {
   *   selecto.triggerDragStart(e);
   * });
   */


  __proto.triggerDragStart = function (e) {
    this.gesto.triggerDragStart(e);
    return this;
  };
  /**
   * Destroy elements, properties, and events.
   */


  __proto.destroy = function () {
    var _a;

    this.off();
    this.keycon && this.keycon.destroy();
    this.gesto.unset();
    this.injectResult.destroy();
    this.dragScroll.dragEnd();
    removeEvent(document, "selectstart", this._onDocumentSelectStart);

    if (!this.options.portalContainer) {
      (_a = this.target.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.target);
    }

    this.keycon = null;
    this.gesto = null;
    this.injectResult = null;
    this.target = null;
    this.container = null;
    this.options = null;
  };

  __proto.getElementPoints = function (target) {
    var getElementRect = this.getElementRect || getDefaultElementRect;
    var info = getElementRect(target);
    var points = [info.pos1, info.pos2, info.pos4, info.pos3];

    if (getElementRect !== getDefaultElementRect) {
      var rect = target.getBoundingClientRect();
      return fitPoints(points, rect);
    }

    return points;
  };
  /**
   * Get all elements set in `selectableTargets`.
   */


  __proto.getSelectableElements = function () {
    var container = this.container;
    var selectableElements = [];
    this.options.selectableTargets.forEach(function (target) {
      if (isFunction(target)) {
        var result = target();

        if (result) {
          selectableElements.push.apply(selectableElements, [].slice.call(result));
        }
      } else if (isNode(target)) {
        selectableElements.push(target);
      } else if (isObject(target)) {
        selectableElements.push(target.value || target.current);
      } else {
        var elements = [].slice.call(getDocument(container).querySelectorAll(target));
        selectableElements.push.apply(selectableElements, elements);
      }
    });
    return selectableElements;
  };
  /**
   * If scroll occurs during dragging, you can manually call this method to check the position again.
   */


  __proto.checkScroll = function () {
    if (!this.gesto.isFlag()) {
      return;
    }

    var scrollOptions = this.scrollOptions;
    var innerScrollOptions = this.gesto.getEventData().innerScrollOptions;
    var hasScrollOptions = innerScrollOptions || (scrollOptions === null || scrollOptions === void 0 ? void 0 : scrollOptions.container); // If it is a scrolling position, pass drag

    if (hasScrollOptions) {
      this.dragScroll.checkScroll(__assign({
        inputEvent: this.gesto.getCurrentEvent()
      }, innerScrollOptions || scrollOptions));
    }
  };
  /**
   * Find for selectableTargets again during drag event
   * You can update selectable targets during an event.
   */


  __proto.findSelectableTargets = function (data) {
    var _this = this;

    if (data === void 0) {
      data = this.gesto.getEventData();
    }

    var selectableTargets = this.getSelectableElements();
    var selectablePoints = selectableTargets.map(function (target) {
      return _this.getElementPoints(target);
    });
    data.selectableTargets = selectableTargets;
    data.selectablePoints = selectablePoints;
    data.selectableParentMap = null;
    var options = this.options;
    var hasIndexesMap = options.checkOverflow || options.innerScrollOptions;
    var doc = getDocument(this.container);

    if (hasIndexesMap) {
      var parentMap_1 = new Map();
      data.selectableInnerScrollParentMap = parentMap_1;
      data.selectableInnerScrollPathsList = selectableTargets.map(function (target, index) {
        var parentElement = target.parentElement;
        var parents = [];
        var paths = [];

        var _loop_1 = function () {
          var info = parentMap_1.get(parentElement);

          if (!info) {
            var overflow = getComputedStyle(parentElement).overflow !== "visible";

            if (overflow) {
              var rect = getDefaultElementRect(parentElement);
              info = {
                parentElement: parentElement,
                indexes: [],
                points: [rect.pos1, rect.pos2, rect.pos4, rect.pos3],
                paths: __spreadArray([], paths, true)
              };
              parents.push(parentElement);
              parents.forEach(function (prevParentElement) {
                parentMap_1.set(prevParentElement, info);
              });
              parents = [];
            }
          }

          if (info) {
            parentElement = info.parentElement;
            parentMap_1.get(parentElement).indexes.push(index);
            paths.push(parentElement);
          } else {
            parents.push(parentElement);
          }

          parentElement = parentElement.parentElement;
        };

        while (parentElement && parentElement !== doc.body) {
          _loop_1();
        }

        return paths;
      });
    }

    if (!options.checkOverflow) {
      data.selectableInners = selectableTargets.map(function () {
        return true;
      });
    }

    this._refreshGroups(data);

    return selectableTargets;
  };
  /**
   * External click or mouse events can be applied to the selecto.
   * @params - Extenal click or mouse event
   * @params - Specify the clicked target directly.
   */


  __proto.clickTarget = function (e, clickedTarget) {
    var _a = getClient(e),
        clientX = _a.clientX,
        clientY = _a.clientY;

    var dragEvent = {
      data: {
        selectFlag: false
      },
      clientX: clientX,
      clientY: clientY,
      inputEvent: e,
      isClick: true,
      isTrusted: false,
      stop: function () {
        return false;
      }
    };

    if (this._onDragStart(dragEvent, clickedTarget)) {
      this._onDragEnd(dragEvent);
    }

    return this;
  };

  __proto.setKeyController = function () {
    var _a = this.options,
        keyContainer = _a.keyContainer,
        toggleContinueSelect = _a.toggleContinueSelect,
        toggleContinueSelectWithoutDeselect = _a.toggleContinueSelectWithoutDeselect;

    if (this.keycon) {
      this.keycon.destroy();
      this.keycon = null;
    }

    if (toggleContinueSelect || toggleContinueSelectWithoutDeselect) {
      this.keycon = new KeyController(keyContainer || getWindow(this.container));
      this.keycon.keydown(this._onKeyDown).keyup(this._onKeyUp).on("blur", this._onBlur);
    }
  };

  __proto.setClassName = function (nextClassName) {
    this.options.className = nextClassName;
    this.target.setAttribute("class", "".concat(CLASS_NAME, " ").concat(nextClassName || ""));
  };

  __proto.setKeyEvent = function () {
    var _a = this.options,
        toggleContinueSelect = _a.toggleContinueSelect,
        toggleContinueSelectWithoutDeselect = _a.toggleContinueSelectWithoutDeselect;

    if (!toggleContinueSelect && !toggleContinueSelectWithoutDeselect || this.keycon) {
      return;
    }

    this.setKeyController();
  }; // with getter, setter property


  __proto.setKeyContainer = function (keyContainer) {
    var _this = this;

    var options = this.options;
    diffValue(options.keyContainer, keyContainer, function () {
      options.keyContainer = keyContainer;

      _this.setKeyController();
    });
  };

  __proto.getContinueSelect = function () {
    var _a = this.options,
        continueSelect = _a.continueSelect,
        toggleContinueSelect = _a.toggleContinueSelect;

    if (!toggleContinueSelect || !this._keydownContinueSelect) {
      return continueSelect;
    }

    return !continueSelect;
  };

  __proto.getContinueSelectWithoutDeselect = function () {
    var _a = this.options,
        continueSelectWithoutDeselect = _a.continueSelectWithoutDeselect,
        toggleContinueSelectWithoutDeselect = _a.toggleContinueSelectWithoutDeselect;

    if (!toggleContinueSelectWithoutDeselect || !this._keydownContinueSelectWithoutDeselection) {
      return continueSelectWithoutDeselect;
    }

    return !continueSelectWithoutDeselect;
  };

  __proto.setToggleContinueSelect = function (toggleContinueSelect) {
    var _this = this;

    var options = this.options;
    diffValue(options.toggleContinueSelect, toggleContinueSelect, function () {
      options.toggleContinueSelect = toggleContinueSelect;

      _this.setKeyEvent();
    });
  };

  __proto.setToggleContinueSelectWithoutDeselect = function (toggleContinueSelectWithoutDeselect) {
    var _this = this;

    var options = this.options;
    diffValue(options.toggleContinueSelectWithoutDeselect, toggleContinueSelectWithoutDeselect, function () {
      options.toggleContinueSelectWithoutDeselect = toggleContinueSelectWithoutDeselect;

      _this.setKeyEvent();
    });
  };

  __proto.setPreventDefault = function (value) {
    this.gesto.options.preventDefault = value;
  };

  __proto.setCheckInput = function (value) {
    this.gesto.options.checkInput = value;
  };

  __proto.initElement = function () {
    var _a = this.options,
        dragContainer = _a.dragContainer,
        checkInput = _a.checkInput,
        preventDefault = _a.preventDefault,
        preventClickEventOnDragStart = _a.preventClickEventOnDragStart,
        preventClickEventOnDrag = _a.preventClickEventOnDrag,
        preventClickEventByCondition = _a.preventClickEventByCondition,
        _b = _a.preventRightClick,
        preventRightClick = _b === void 0 ? true : _b,
        className = _a.className;
    var container = this.container;
    this.target = createElement(h("div", {
      className: "".concat(CLASS_NAME, " ").concat(className || "")
    }), this.target, container);
    var target = this.target;
    this.dragContainer = typeof dragContainer === "string" ? [].slice.call(getDocument(container).querySelectorAll(dragContainer)) : dragContainer || this.target.parentNode;
    this.gesto = new Gesto(this.dragContainer, {
      checkWindowBlur: true,
      container: getWindow(container),
      checkInput: checkInput,
      preventDefault: preventDefault,
      preventClickEventOnDragStart: preventClickEventOnDragStart,
      preventClickEventOnDrag: preventClickEventOnDrag,
      preventClickEventByCondition: preventClickEventByCondition,
      preventRightClick: preventRightClick
    }).on({
      dragStart: this._onDragStart,
      drag: this._onDrag,
      dragEnd: this._onDragEnd
    });
    addEvent(document, "selectstart", this._onDocumentSelectStart);
    this.injectResult = injector.inject(target, {
      nonce: this.options.cspNonce
    });
  };

  __proto.hitTest = function (selectRect, data, isDrag, gestoEvent) {
    var _a = this.options,
        hitRate = _a.hitRate,
        selectByClick = _a.selectByClick;
    var left = selectRect.left,
        top = selectRect.top,
        right = selectRect.right,
        bottom = selectRect.bottom;
    var innerGroups = data.innerGroups;
    var innerWidth = data.innerWidth;
    var innerHeight = data.innerHeight;
    var clientX = gestoEvent === null || gestoEvent === void 0 ? void 0 : gestoEvent.clientX;
    var clientY = gestoEvent === null || gestoEvent === void 0 ? void 0 : gestoEvent.clientY;
    var ignoreClick = data.ignoreClick;
    var rectPoints = [[left, top], [right, top], [right, bottom], [left, bottom]];

    var isHit = function (points, el) {
      var hitRateValue = typeof hitRate === "function" ? splitUnit("".concat(hitRate(el))) : splitUnit("".concat(hitRate));
      var inArea = ignoreClick ? false : isInside([clientX, clientY], points);

      if (!isDrag && selectByClick && inArea) {
        return true;
      }

      var overlapPoints = getOverlapPoints(rectPoints, points);

      if (!overlapPoints.length) {
        return false;
      }

      var overlapSize = getAreaSize(overlapPoints); // Line

      var targetSize = 0;

      if (overlapSize === 0 && getAreaSize(points) === 0) {
        targetSize = getLineSize(points);
        overlapSize = getLineSize(overlapPoints);
      } else {
        targetSize = getAreaSize(points);
      }

      if (hitRateValue.unit === "px") {
        return overlapSize >= hitRateValue.value;
      } else {
        var rate = between(Math.round(overlapSize / targetSize * 100), 0, 100);
        return rate >= Math.min(100, hitRateValue.value);
      }
    };

    var selectableTargets = data.selectableTargets;
    var selectablePoints = data.selectablePoints;
    var selectableInners = data.selectableInners;

    if (!innerGroups) {
      return selectableTargets.filter(function (_, i) {
        if (!selectableInners[i]) {
          return false;
        }

        return isHit(selectablePoints[i], selectableTargets[i]);
      });
    }

    var selectedTargets = [];
    var minX = Math.floor(left / innerWidth);
    var maxX = Math.floor(right / innerWidth);
    var minY = Math.floor(top / innerHeight);
    var maxY = Math.floor(bottom / innerHeight);

    for (var x = minX; x <= maxX; ++x) {
      var yGroups = innerGroups[x];

      if (!yGroups) {
        continue;
      }

      for (var y = minY; y <= maxY; ++y) {
        var group = yGroups[y];

        if (!group) {
          continue;
        }

        group.forEach(function (index) {
          var points = selectablePoints[index];
          var inner = selectableInners[index];
          var target = selectableTargets[index];

          if (inner && isHit(points, target)) {
            selectedTargets.push(target);
          }
        });
      }
    }

    return filterDuplicated(selectedTargets);
  };

  __proto.initDragScroll = function () {
    var _this = this;

    this.dragScroll.on("scrollDrag", function (_a) {
      var next = _a.next;
      next(_this.gesto.getCurrentEvent());
    }).on("scroll", function (_a) {
      var container = _a.container,
          direction = _a.direction;

      var innerScrollOptions = _this.gesto.getEventData().innerScrollOptions;

      if (innerScrollOptions) {
        _this.emit("innerScroll", {
          container: container,
          direction: direction
        });
      } else {
        _this.emit("scroll", {
          container: container,
          direction: direction
        });
      }
    }).on("move", function (_a) {
      var offsetX = _a.offsetX,
          offsetY = _a.offsetY,
          inputEvent = _a.inputEvent;
      var gesto = _this.gesto;

      if (!gesto || !gesto.isFlag()) {
        return;
      }

      var data = _this.gesto.getEventData();

      var boundArea = data.boundArea;
      data.startX -= offsetX;
      data.startY -= offsetY;

      var innerScrollOptions = _this.gesto.getEventData().innerScrollOptions;

      var container = innerScrollOptions === null || innerScrollOptions === void 0 ? void 0 : innerScrollOptions.container;
      var isMoveInnerScroll = false;

      if (container) {
        var parentMap_2 = data.selectableInnerScrollParentMap;
        var parentInfo = parentMap_2.get(container);

        if (parentInfo) {
          parentInfo.paths.forEach(function (scrollContainer) {
            var containerInfo = parentMap_2.get(scrollContainer);
            containerInfo.points.forEach(function (pos) {
              pos[0] -= offsetX;
              pos[1] -= offsetY;
            });
          });
          parentInfo.indexes.forEach(function (index) {
            data.selectablePoints[index].forEach(function (pos) {
              pos[0] -= offsetX;
              pos[1] -= offsetY;
            });
          });
          isMoveInnerScroll = true;
        }
      }

      if (!isMoveInnerScroll) {
        data.selectablePoints.forEach(function (points) {
          points.forEach(function (pos) {
            pos[0] -= offsetX;
            pos[1] -= offsetY;
          });
        });
      }

      _this._refreshGroups(data);

      boundArea.left -= offsetX;
      boundArea.right -= offsetX;
      boundArea.top -= offsetY;
      boundArea.bottom -= offsetY;

      _this.gesto.scrollBy(offsetX, offsetY, inputEvent.inputEvent);

      _this._checkSelected(_this.gesto.getCurrentEvent());
    });
  };

  __proto._select = function (selectedTargets, rect, e, isStart, isDragStartEnd) {
    if (isDragStartEnd === void 0) {
      isDragStartEnd = false;
    }

    var inputEvent = e.inputEvent;
    var data = e.data;
    var result = this.setSelectedTargets(selectedTargets);

    var _a = diff(data.startSelectedTargets, selectedTargets),
        added = _a.added,
        removed = _a.removed,
        prevList = _a.prevList,
        list = _a.list;

    var startResult = {
      startSelected: prevList,
      startAdded: added.map(function (i) {
        return list[i];
      }),
      startRemoved: removed.map(function (i) {
        return prevList[i];
      })
    };

    if (isStart) {
      /**
       * When the select(drag) starts, the selectStart event is called.
       * @memberof Selecto
       * @event selectStart
       * @param {Selecto.OnSelect} - Parameters for the selectStart event
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto({
       *   container: document.body,
       *   selectByClick: true,
       *   selectFromInside: false,
       * });
       *
       * selecto.on("selectStart", e => {
       *   e.added.forEach(el => {
       *     el.classList.add("selected");
       *   });
       *   e.removed.forEach(el => {
       *     el.classList.remove("selected");
       *   });
       * }).on("selectEnd", e => {
       *   e.afterAdded.forEach(el => {
       *     el.classList.add("selected");
       *   });
       *   e.afterRemoved.forEach(el => {
       *     el.classList.remove("selected");
       *   });
       * });
       */
      this.emit("selectStart", __assign(__assign(__assign({}, result), startResult), {
        rect: rect,
        inputEvent: inputEvent,
        data: data.data,
        isTrusted: e.isTrusted,
        isDragStartEnd: isDragStartEnd
      }));
    }

    if (result.added.length || result.removed.length) {
      /**
       * When the select in real time, the select event is called.
       * @memberof Selecto
       * @event select
       * @param {Selecto.OnSelect} - Parameters for the select event
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto({
       *   container: document.body,
       *   selectByClick: true,
       *   selectFromInside: false,
       * });
       *
       * selecto.on("select", e => {
       *   e.added.forEach(el => {
       *     el.classList.add("selected");
       *   });
       *   e.removed.forEach(el => {
       *     el.classList.remove("selected");
       *   });
       * });
       */
      this.emit("select", __assign(__assign(__assign({}, result), startResult), {
        rect: rect,
        inputEvent: inputEvent,
        data: data.data,
        isTrusted: e.isTrusted,
        isDragStartEnd: isDragStartEnd
      }));
    }
  };

  __proto._selectEnd = function (startSelectedTargets, startPassedTargets, rect, e, isDragStartEnd) {
    if (isDragStartEnd === void 0) {
      isDragStartEnd = false;
    }

    var inputEvent = e.inputEvent,
        isDouble = e.isDouble,
        data = e.data;
    var type = inputEvent && inputEvent.type;
    var isDragStart = type === "mousedown" || type === "touchstart";

    var _a = diff(startSelectedTargets, this.selectedTargets),
        added = _a.added,
        removed = _a.removed,
        prevList = _a.prevList,
        list = _a.list;

    var _b = diff(startPassedTargets, this.selectedTargets),
        afterAdded = _b.added,
        afterRemoved = _b.removed,
        afterPrevList = _b.prevList,
        afterList = _b.list;
    /**
     * When the select(dragEnd or click) ends, the selectEnd event is called.
     * @memberof Selecto
     * @event selectEnd
     * @param {Selecto.OnSelectEnd} - Parameters for the selectEnd event
     * @example
     * import Selecto from "selecto";
     *
     * const selecto = new Selecto({
     *   container: document.body,
     *   selectByClick: true,
     *   selectFromInside: false,
     * });
     *
     * selecto.on("selectStart", e => {
     *   e.added.forEach(el => {
     *     el.classList.add("selected");
     *   });
     *   e.removed.forEach(el => {
     *     el.classList.remove("selected");
     *   });
     * }).on("selectEnd", e => {
     *   e.afterAdded.forEach(el => {
     *     el.classList.add("selected");
     *   });
     *   e.afterRemoved.forEach(el => {
     *     el.classList.remove("selected");
     *   });
     * });
     */


    this.emit("selectEnd", {
      startSelected: startSelectedTargets,
      beforeSelected: startPassedTargets,
      selected: this.selectedTargets,
      added: added.map(function (index) {
        return list[index];
      }),
      removed: removed.map(function (index) {
        return prevList[index];
      }),
      afterAdded: afterAdded.map(function (index) {
        return afterList[index];
      }),
      afterRemoved: afterRemoved.map(function (index) {
        return afterPrevList[index];
      }),
      isDragStart: isDragStart && isDragStartEnd,
      isDragStartEnd: isDragStart && isDragStartEnd,
      isClick: !!e.isClick,
      isDouble: !!isDouble,
      rect: rect,
      inputEvent: inputEvent,
      data: data.data,
      isTrusted: e.isTrusted
    });
  };

  __proto._checkSelected = function (e, rect) {
    if (rect === void 0) {
      rect = getRect(e, this.options.ratio);
    }

    var data = e.data;
    var top = rect.top,
        left = rect.left,
        width = rect.width,
        height = rect.height;
    var selectFlag = data.selectFlag;
    var containerX = data.containerX,
        containerY = data.containerY,
        scaleMatrix = data.scaleMatrix;
    var offsetPos = calculateMatrixDist(scaleMatrix, [left - containerX, top - containerY]);
    var offsetSize = calculateMatrixDist(scaleMatrix, [width, height]);
    var selectedTargets = [];

    if (selectFlag) {
      this.target.style.cssText += "display: block;" + "left:0px;top:0px;" + "transform: translate(".concat(offsetPos[0], "px, ").concat(offsetPos[1], "px);") + "width:".concat(offsetSize[0], "px;height:").concat(offsetSize[1], "px;");
      var passedTargets = this.hitTest(rect, data, true, e);
      selectedTargets = passTargets(data.startPassedTargets, passedTargets, this.continueSelect && this.continueSelectWithoutDeselect);
    }
    /**
     * When the drag, the drag event is called.
     * Call the stop () function if you have a specific element or don't want to raise a select
     * @memberof Selecto
     * @event drag
     * @param {OnDrag} - Parameters for the drag event
     * @example
     * import Selecto from "selecto";
     *
     * const selecto = new Selecto({
     *   container: document.body,
     *   selectByClick: true,
     *   selectFromInside: false,
     * });
     *
     * selecto.on("drag", e => {
     *   e.stop();
     * }).on("select", e => {
     *   e.added.forEach(el => {
     *     el.classList.add("selected");
     *   });
     *   e.removed.forEach(el => {
     *     el.classList.remove("selected");
     *   });
     * });
     */


    var result = this.emit("drag", __assign(__assign({}, e), {
      data: data.data,
      isSelect: selectFlag,
      rect: rect
    }));

    if (result === false) {
      this.target.style.cssText += "display: none;";
      e.stop();
      return;
    }

    if (selectFlag) {
      this._select(selectedTargets, rect, e);
    }
  };

  __proto._sameCombiKey = function (e, keys, isKeyup) {
    if (!keys) {
      return false;
    }

    var combi = getCombi(e.inputEvent, e.key);
    var nextKeys = [].concat(keys);
    var toggleKeys = isArray(nextKeys[0]) ? nextKeys : [nextKeys];

    if (isKeyup) {
      var singleKey_1 = e.key;
      return toggleKeys.some(function (keys) {
        return keys.some(function (key) {
          return key === singleKey_1;
        });
      });
    }

    return toggleKeys.some(function (keys) {
      return keys.every(function (key) {
        return combi.indexOf(key) > -1;
      });
    });
  };

  __proto._findElement = function (clickedTarget, selectableTargets) {
    var pointTarget = clickedTarget;

    while (pointTarget) {
      if (selectableTargets.indexOf(pointTarget) > -1) {
        break;
      }

      pointTarget = pointTarget.parentElement;
    }

    return pointTarget;
  };

  __proto._refreshGroups = function (data) {
    var _a;

    var innerWidth = data.innerWidth;
    var innerHeight = data.innerHeight;
    var selectablePoints = data.selectablePoints;

    if (this.options.checkOverflow) {
      var innerScrollContainer_1 = (_a = this.gesto.getEventData().innerScrollOptions) === null || _a === void 0 ? void 0 : _a.container;
      var parentMap_3 = data.selectableInnerScrollParentMap;
      var innerScrollPathsList = data.selectableInnerScrollPathsList;
      data.selectableInners = innerScrollPathsList.map(function (innerScrollPaths, i) {
        var isAlwaysTrue = false;
        return innerScrollPaths.every(function (target) {
          if (isAlwaysTrue) {
            return true;
          }

          if (target === innerScrollContainer_1) {
            isAlwaysTrue = true;
            return true;
          }

          var rect = parentMap_3.get(target);

          if (rect) {
            var points1 = selectablePoints[i];
            var points2 = rect.points;
            var overlapPoints = getOverlapPoints(points1, points2);

            if (!overlapPoints.length) {
              return false;
            }
          }

          return true;
        });
      });
    }

    if (!innerWidth || !innerHeight) {
      data.innerGroups = null;
    } else {
      var selectablePoints_1 = data.selectablePoints;
      var groups_1 = {};
      selectablePoints_1.forEach(function (points, i) {
        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;
        points.forEach(function (pos) {
          var x = Math.floor(pos[0] / innerWidth);
          var y = Math.floor(pos[1] / innerHeight);
          minX = Math.min(x, minX);
          maxX = Math.max(x, maxX);
          minY = Math.min(y, minY);
          maxY = Math.max(y, maxY);
        });

        for (var x = minX; x <= maxX; ++x) {
          for (var y = minY; y <= maxY; ++y) {
            groups_1[x] = groups_1[x] || {};
            groups_1[x][y] = groups_1[x][y] || [];
            groups_1[x][y].push(i);
          }
        }
      });
      data.innerGroups = groups_1;
    }
  };

  Selecto = __decorate([Properties(PROPERTIES, function (prototype, property) {
    var attributes = {
      enumerable: true,
      configurable: true,
      get: function () {
        return this.options[property];
      }
    };
    var getter = camelize("get ".concat(property));

    if (prototype[getter]) {
      attributes.get = function () {
        return this[getter]();
      };
    } else {
      attributes.get = function () {
        return this.options[property];
      };
    }

    var setter = camelize("set ".concat(property));

    if (prototype[setter]) {
      attributes.set = function (value) {
        this[setter](value);
      };
    } else {
      attributes.set = function (value) {
        this.options[property] = value;
      };
    }

    Object.defineProperty(prototype, property, attributes);
  })], Selecto);
  return Selecto;
}(EventEmitter);

var Selecto$1 =
/*#__PURE__*/
function (_super) {
  __extends(Selecto, _super);

  function Selecto() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Selecto;
}(Selecto);

export default Selecto$1;
export { CLASS_NAME, EVENTS, METHODS, OPTIONS, OPTION_TYPES, PROPERTIES };
//# sourceMappingURL=selecto.esm.js.map
