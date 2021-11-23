/*
Copyright (c) 2020 Daybrush
name: selecto
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/selecto.git
version: 1.13.2
*/
import EventEmitter from '@scena/event-emitter';
import Gesto from 'gesto';
import { Properties } from 'framework-utils';
import { hasClass, addClass, calculateBoundSize, isObject, isString, removeEvent, addEvent, between, isArray, camelize } from '@daybrush/utils';
import { diff } from '@egjs/children-differ';
import DragScroll from '@scena/dragscroll';
import KeyController, { getCombi } from 'keycon';
import { fitPoints, isInside, getOverlapPoints, getAreaSize } from 'overlap-area';
import { createMatrix, getDistElementMatrix, calculateMatrixDist } from 'css-to-mat';
import styled from 'css-styled';

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
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
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
function createElement(jsx, prevTarget, container) {
  var tag = jsx.tag,
      children = jsx.children,
      attributes = jsx.attributes,
      className = jsx.className,
      style = jsx.style;
  var el = prevTarget || document.createElement(tag);

  for (var name in attributes) {
    el.setAttribute(name, attributes[name]);
  }

  var elChildren = el.children;
  children.forEach(function (child, i) {
    createElement(child, elChildren[i], el);
  });

  if (className) {
    className.split(" ").forEach(function (name) {
      if (!hasClass(el, name)) {
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
    boundArea = e.datas.boundArea;
  }

  var _b = e.distX,
      distX = _b === void 0 ? 0 : _b,
      _c = e.distY,
      distY = _c === void 0 ? 0 : _c;
  var _d = e.datas,
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
function passTargets(beforeTargets, afterTargets) {
  var _a = diff(beforeTargets, afterTargets),
      list = _a.list,
      prevList = _a.prevList,
      added = _a.added,
      removed = _a.removed;

  return added.map(function (index) {
    return list[index];
  }).concat(removed.map(function (index) {
    return prevList[index];
  }));
}

var injector = styled("\n:host {\n    position: fixed;\n    display: none;\n    border: 1px solid #4af;\n    background: rgba(68, 170, 255, 0.5);\n    z-index: 100;\n}\n:host {\n    position: absolute;\n}\n");
/**
 * @memberof Selecto
 */

var CLASS_NAME = "selecto-selection " + injector.className;
var PROPERTIES = ["boundContainer", "selectableTargets", "selectByClick", "selectFromInside", "continueSelect", "toggleContinueSelect", "keyContainer", "hitRate", "scrollOptions", "checkInput", "preventDefault", "ratio", "getElementRect", "preventDragFromInside", "rootContainer", "dragCondition"];
/**
 * @memberof Selecto
 */

var OPTIONS = __spreadArrays([// ignore target, container,
"dragContainer", "cspNonce"], PROPERTIES);
var OPTION_TYPES = {
  boundContainer: null,
  target: null,
  container: null,
  dragContainer: null,
  selectableTargets: Array,
  selectByClick: Boolean,
  selectFromInside: Boolean,
  continueSelect: Boolean,
  toggleContinueSelect: Array,
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
  dragCondition: Function
};
/**
 * @memberof Selecto
 */

var EVENTS = ["dragStart", "drag", "dragEnd", "selectStart", "select", "selectEnd", "keydown", "keyup", "scroll"];
/**
 * @memberof Selecto
 */

var METHODS = ["clickTarget", "getSelectableElements", "setSelectedTargets", "getElementPoints", "getSelectedTargets", "findSelectableTargets", "triggerDragStart"];

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

    _this.onDragStart = function (e, clickedTarget) {
      var datas = e.datas,
          clientX = e.clientX,
          clientY = e.clientY,
          inputEvent = e.inputEvent;
      var _a = _this.options,
          continueSelect = _a.continueSelect,
          selectFromInside = _a.selectFromInside,
          selectByClick = _a.selectByClick,
          rootContainer = _a.rootContainer,
          boundContainer = _a.boundContainer,
          _b = _a.preventDragFromInside,
          preventDragFromInside = _b === void 0 ? true : _b,
          dragCondition = _a.dragCondition;

      if (dragCondition && !dragCondition(e)) {
        e.stop();
        return;
      }

      _this.findSelectableTargets(datas);

      datas.startSelectedTargets = _this.selectedTargets;
      datas.scaleMatrix = createMatrix();
      datas.containerX = 0;
      datas.containerY = 0;
      var boundArea = {
        left: -Infinity,
        top: -Infinity,
        right: Infinity,
        bottom: Infinity
      };

      if (rootContainer) {
        var containerRect = _this.container.getBoundingClientRect();

        datas.containerX = containerRect.left;
        datas.containerY = containerRect.top;
        datas.scaleMatrix = getDistElementMatrix(_this.container, rootContainer);
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
            rectElement = document.querySelector(boundElement);
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

      datas.boundArea = boundArea;
      var hitRect = {
        left: clientX,
        top: clientY,
        right: clientX,
        bottom: clientY,
        width: 0,
        height: 0
      };
      var firstPassedTargets = [];

      if (!selectFromInside || selectByClick) {
        var pointTarget = clickedTarget || document.elementFromPoint(clientX, clientY);

        while (pointTarget) {
          if (datas.selectableTargets.indexOf(pointTarget) > -1) {
            break;
          }

          pointTarget = pointTarget.parentElement;
        }

        firstPassedTargets = pointTarget ? [pointTarget] : [];
      }

      var hasInsideTargets = firstPassedTargets.length > 0;
      var isPreventSelect = !selectFromInside && hasInsideTargets;

      if (isPreventSelect && !selectByClick) {
        e.stop();
        return false;
      }

      var type = inputEvent.type;
      var isTrusted = type === "mousedown" || type === "touchstart";
      /**
       * When the drag starts, the dragStart event is called.
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

      var result = !e.isClick && isTrusted ? _this.emit("dragStart", __assign({}, e)) : true;

      if (!result) {
        e.stop();
        return false;
      }

      if (!continueSelect) {
        datas.startPassedTargets = [];
      } else {
        firstPassedTargets = passTargets(_this.selectedTargets, firstPassedTargets);
        datas.startPassedTargets = _this.selectedTargets;
      }

      _this.select(_this.selectedTargets, firstPassedTargets, hitRect, inputEvent, true);

      datas.startX = clientX;
      datas.startY = clientY;
      datas.selectFlag = false;
      datas.preventDragFromInside = false;
      var offsetPos = calculateMatrixDist(datas.scaleMatrix, [clientX - datas.containerX, clientY - datas.containerY]);
      datas.boundsArea = _this.target.style.cssText += "position: " + (rootContainer ? "absolute" : "fixed") + ";" + "left:0px;top:0px;" + ("transform: translate(" + offsetPos[0] + "px, " + offsetPos[1] + "px)");

      if (isPreventSelect && selectByClick) {
        inputEvent.preventDefault();

        if (preventDragFromInside) {
          _this.selectEnd(datas.startSelectedTargets, datas.startPassedTargets, hitRect, e);

          datas.preventDragFromInside = true;
        }
      } else {
        datas.selectFlag = true;

        if (type === "touchstart") {
          inputEvent.preventDefault();
        }

        var scrollOptions = _this.options.scrollOptions;

        if (scrollOptions && scrollOptions.container) {
          _this.dragScroll.dragStart(e, scrollOptions);
        }
      }

      return true;
    };

    _this.onDrag = function (e) {
      if (e.datas.selectFlag) {
        var scrollOptions = _this.options.scrollOptions;

        if (scrollOptions && scrollOptions.container) {
          if (_this.dragScroll.drag(e, scrollOptions)) {
            return;
          }
        }
      }

      _this.check(e);
    };

    _this.onDragEnd = function (e) {
      var datas = e.datas,
          inputEvent = e.inputEvent;
      var rect = getRect(e, _this.options.ratio);
      var selectFlag = datas.selectFlag;

      if (inputEvent && !e.isClick) {
        _this.emit("dragEnd", __assign(__assign({
          isDouble: !!e.isDouble,
          isDrag: false,
          isSelect: selectFlag
        }, e), {
          isClick: !!e.isClick,
          rect: rect
        }));
      }

      _this.target.style.cssText += "display: none;";

      if (selectFlag) {
        datas.selectFlag = false;

        _this.dragScroll.dragEnd();
      }

      if (!datas.preventDragFromInside) {
        _this.selectEnd(datas.startSelectedTargets, datas.startPassedTargets, rect, e);
      }
    };

    _this.onKeyDown = function (e) {
      if (!_this.sameCombiKey(e)) {
        return;
      }

      _this.continueSelect = true;
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

      _this.emit("keydown", {});
    };

    _this.onKeyUp = function (e) {
      if (!_this.sameCombiKey(e, true)) {
        return;
      }

      _this.continueSelect = false;
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

      _this.emit("keyup", {});
    };

    _this.onBlur = function () {
      if (_this.toggleContinueSelect && _this.continueSelect) {
        _this.continueSelect = false;

        _this.emit("keyup", {});
      }
    };

    _this.onDocumentSelectStart = function (e) {
      if (!_this.gesto.isFlag()) {
        return;
      }

      var dragContainer = _this.dragContainer;

      if (dragContainer === window) {
        dragContainer = document.documentElement;
      }

      var containers = dragContainer instanceof Element ? [dragContainer] : [].slice.call(dragContainer);
      var target = e.target;
      containers.some(function (container) {
        if (container === target || container.contains(target)) {
          e.preventDefault();
          return true;
        }
      });
    };

    _this.target = options.target;
    _this.container = options.container || document.body;
    _this.options = __assign({
      target: null,
      container: null,
      dragContainer: null,
      selectableTargets: [],
      selectByClick: true,
      selectFromInside: true,
      hitRate: 100,
      continueSelect: false,
      toggleContinueSelect: null,
      keyContainer: null,
      scrollOptions: undefined,
      checkInput: false,
      preventDefault: false,
      boundContainer: false,
      preventDragFromInside: true,
      dragCondition: null,
      rootContainer: null,
      getElementRect: getDefaultElementRect,
      cspNonce: "",
      ratio: 0
    }, options);

    _this.initElement();

    _this.initDragScroll();

    _this.setKeyController();

    return _this;
  }
  /**
   * You can set the currently selected targets.
   *
   */


  var __proto = Selecto.prototype;

  __proto.setSelectedTargets = function (selectedTargets) {
    this.selectedTargets = selectedTargets;
    return this;
  };
  /**
   * You can get the currently selected targets.
   */


  __proto.getSelectedTargets = function () {
    return this.selectedTargets;
  };

  __proto.setKeyContainer = function (keyContainer) {
    var _this = this;

    var options = this.options;
    diffValue(options.keyContainer, keyContainer, function () {
      options.keyContainer = keyContainer;

      _this.setKeyController();
    });
  };

  __proto.setToggleContinueSelect = function (toggleContinueSelect) {
    var _this = this;

    var options = this.options;
    diffValue(options.toggleContinueSelect, toggleContinueSelect, function () {
      options.toggleContinueSelect = toggleContinueSelect;

      _this.setKeyEvent();
    });
  };

  __proto.setPreventDefault = function (value) {
    this.gesto.options.preventDefault = value;
  };

  __proto.setCheckInput = function (value) {
    this.gesto.options.checkInput = value;
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
    this.off();
    this.keycon && this.keycon.destroy();
    this.gesto.unset();
    this.injectResult.destroy();
    removeEvent(document, "selectstart", this.onDocumentSelectStart);
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
    var selectableElements = [];
    this.options.selectableTargets.forEach(function (target) {
      if (isObject(target)) {
        selectableElements.push(target);
      } else {
        var elements = [].slice.call(document.querySelectorAll(target));
        elements.forEach(function (el) {
          selectableElements.push(el);
        });
      }
    });
    return selectableElements;
  };
  /**
   * Find for selectableTargets again during drag event
   */


  __proto.findSelectableTargets = function (datas) {
    var _this = this;

    if (datas === void 0) {
      datas = this.gesto.getEventDatas();
    }

    var selectableTargets = this.getSelectableElements();
    var selectablePoints = selectableTargets.map(function (target) {
      return _this.getElementPoints(target);
    });
    datas.selectableTargets = selectableTargets;
    datas.selectablePoints = selectablePoints;
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
      datas: {
        selectFlag: false
      },
      clientX: clientX,
      clientY: clientY,
      inputEvent: e,
      isClick: true,
      stop: function () {
        return false;
      }
    };

    if (this.onDragStart(dragEvent, clickedTarget)) {
      this.onDragEnd(dragEvent);
    }

    return this;
  };

  __proto.setKeyController = function () {
    var _a = this.options,
        keyContainer = _a.keyContainer,
        toggleContinueSelect = _a.toggleContinueSelect;

    if (this.keycon) {
      this.keycon.destroy();
      this.keycon = null;
    }

    if (toggleContinueSelect) {
      this.keycon = new KeyController(keyContainer || window);
      this.keycon.keydown(this.onKeyDown).keyup(this.onKeyUp).on("blur", this.onBlur);
    }
  };

  __proto.setKeyEvent = function () {
    var toggleContinueSelect = this.options.toggleContinueSelect;

    if (!toggleContinueSelect || this.keycon) {
      return;
    }

    this.setKeyController();
  };

  __proto.initElement = function () {
    this.target = createElement(h("div", {
      className: CLASS_NAME
    }), this.target, this.container);
    var target = this.target;
    var _a = this.options,
        dragContainer = _a.dragContainer,
        checkInput = _a.checkInput,
        preventDefault = _a.preventDefault;
    this.dragContainer = typeof dragContainer === "string" ? [].slice.call(document.querySelectorAll(dragContainer)) : this.options.dragContainer || this.target.parentNode;
    this.gesto = new Gesto(this.dragContainer, {
      checkWindowBlur: true,
      container: window,
      checkInput: checkInput,
      preventDefault: preventDefault
    }).on({
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    });
    addEvent(document, "selectstart", this.onDocumentSelectStart);
    this.injectResult = injector.inject(target, {
      nonce: this.options.cspNonce
    });
  };

  __proto.hitTest = function (selectRect, clientX, clientY, targets, selectablePoints) {
    var _a = this.options,
        hitRate = _a.hitRate,
        selectByClick = _a.selectByClick;
    var left = selectRect.left,
        top = selectRect.top,
        right = selectRect.right,
        bottom = selectRect.bottom;
    var rectPoints = [[left, top], [right, top], [right, bottom], [left, bottom]];
    return targets.filter(function (_, i) {
      var points = selectablePoints[i];
      var inArea = isInside([clientX, clientY], points);

      if (selectByClick && inArea) {
        return true;
      }

      var overlapPoints = getOverlapPoints(rectPoints, points);

      if (!overlapPoints.length) {
        return false;
      }

      var overlapSize = getAreaSize(overlapPoints);
      var targetSize = getAreaSize(points);
      var rate = between(Math.round(overlapSize / targetSize * 100), 0, 100);

      if (rate >= Math.min(100, hitRate)) {
        return true;
      }

      return false;
    });
  };

  __proto.initDragScroll = function () {
    var _this = this;

    this.dragScroll.on("scroll", function (_a) {
      var container = _a.container,
          direction = _a.direction;

      _this.emit("scroll", {
        container: container,
        direction: direction
      });
    }).on("move", function (_a) {
      var offsetX = _a.offsetX,
          offsetY = _a.offsetY,
          inputEvent = _a.inputEvent;
      var datas = inputEvent.datas;
      var boundArea = datas.boundArea;
      datas.startX -= offsetX;
      datas.startY -= offsetY;
      datas.selectablePoints.forEach(function (points) {
        points.forEach(function (pos) {
          pos[0] -= offsetX;
          pos[1] -= offsetY;
        });
      });
      boundArea.left -= offsetX;
      boundArea.right -= offsetX;
      boundArea.top -= offsetY;
      boundArea.bottom -= offsetY;

      _this.gesto.scrollBy(offsetX, offsetY, inputEvent.inputEvent, false);

      inputEvent.distX += offsetX;
      inputEvent.distY += offsetY;

      _this.check(inputEvent);
    });
  };

  __proto.select = function (prevSelectedTargets, selectedTargets, rect, inputEvent, isStart) {
    var _a = diff(prevSelectedTargets, selectedTargets),
        added = _a.added,
        removed = _a.removed,
        prevList = _a.prevList,
        list = _a.list;

    this.selectedTargets = selectedTargets;

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
      this.emit("selectStart", {
        selected: selectedTargets,
        added: added.map(function (index) {
          return list[index];
        }),
        removed: removed.map(function (index) {
          return prevList[index];
        }),
        rect: rect,
        inputEvent: inputEvent
      });
    }

    if (added.length || removed.length) {
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
      this.emit("select", {
        selected: selectedTargets,
        added: added.map(function (index) {
          return list[index];
        }),
        removed: removed.map(function (index) {
          return prevList[index];
        }),
        rect: rect,
        inputEvent: inputEvent
      });
    }
  };

  __proto.selectEnd = function (startSelectedTargets, startPassedTargets, rect, e) {
    var inputEvent = e.inputEvent,
        isDouble = e.isDouble;

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

    var type = inputEvent && inputEvent.type;
    var isDragStart = type === "mousedown" || type === "touchstart";
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
      isDragStart: isDragStart,
      isClick: !!e.isClick,
      isDouble: !!isDouble,
      rect: rect,
      inputEvent: inputEvent
    });
  };

  __proto.check = function (e, rect) {
    if (rect === void 0) {
      rect = getRect(e, this.options.ratio);
    }

    var datas = e.datas,
        inputEvent = e.inputEvent;
    var top = rect.top,
        left = rect.left,
        width = rect.width,
        height = rect.height;
    var selectFlag = datas.selectFlag;
    var containerX = datas.containerX,
        containerY = datas.containerY,
        scaleMatrix = datas.scaleMatrix;
    var offsetPos = calculateMatrixDist(scaleMatrix, [left - containerX, top - containerY]);
    var offsetSize = calculateMatrixDist(scaleMatrix, [width, height]);
    var prevSelectedTargets = [];
    var selectedTargets = [];

    if (selectFlag) {
      this.target.style.cssText += "display: block;" + "left:0px;top:0px;" + ("transform: translate(" + offsetPos[0] + "px, " + offsetPos[1] + "px);") + ("width:" + offsetSize[0] + "px;height:" + offsetSize[1] + "px;");
      var passedTargets = this.hitTest(rect, datas.startX, datas.startY, datas.selectableTargets, datas.selectablePoints);
      prevSelectedTargets = this.selectedTargets;
      selectedTargets = passTargets(datas.startPassedTargets, passedTargets);
      this.selectedTargets = selectedTargets;
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
      isSelect: selectFlag,
      rect: rect
    }));

    if (result === false) {
      this.target.style.cssText += "display: none;";
      e.stop();
      return;
    }

    if (selectFlag) {
      this.select(prevSelectedTargets, selectedTargets, rect, inputEvent);
    }
  };

  __proto.sameCombiKey = function (e, isKeyup) {
    var toggleContinueSelect = [].concat(this.options.toggleContinueSelect);
    var combi = getCombi(e.inputEvent, e.key);
    var toggleKeys = isArray(toggleContinueSelect[0]) ? toggleContinueSelect : [toggleContinueSelect];

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

  Selecto = __decorate([Properties(PROPERTIES, function (prototype, property) {
    var attributes = {
      enumerable: true,
      configurable: true,
      get: function () {
        return this.options[property];
      }
    };
    var setter = camelize("set " + property);

    if (prototype[setter]) {
      attributes.set = function set(value) {
        this[setter](value);
      };
    } else {
      attributes.set = function set(value) {
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
