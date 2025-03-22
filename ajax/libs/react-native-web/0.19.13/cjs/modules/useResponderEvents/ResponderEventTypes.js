"use strict";

exports.__esModule = true;
exports.TOUCH_START = exports.TOUCH_MOVE = exports.TOUCH_END = exports.TOUCH_CANCEL = exports.SELECTION_CHANGE = exports.SELECT = exports.SCROLL = exports.MOUSE_UP = exports.MOUSE_MOVE = exports.MOUSE_DOWN = exports.MOUSE_CANCEL = exports.FOCUS_OUT = exports.CONTEXT_MENU = exports.BLUR = void 0;
exports.isCancelish = isCancelish;
exports.isEndish = isEndish;
exports.isMoveish = isMoveish;
exports.isScroll = isScroll;
exports.isSelectionChange = isSelectionChange;
exports.isStartish = isStartish;
/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var BLUR = exports.BLUR = 'blur';
var CONTEXT_MENU = exports.CONTEXT_MENU = 'contextmenu';
var FOCUS_OUT = exports.FOCUS_OUT = 'focusout';
var MOUSE_DOWN = exports.MOUSE_DOWN = 'mousedown';
var MOUSE_MOVE = exports.MOUSE_MOVE = 'mousemove';
var MOUSE_UP = exports.MOUSE_UP = 'mouseup';
var MOUSE_CANCEL = exports.MOUSE_CANCEL = 'dragstart';
var TOUCH_START = exports.TOUCH_START = 'touchstart';
var TOUCH_MOVE = exports.TOUCH_MOVE = 'touchmove';
var TOUCH_END = exports.TOUCH_END = 'touchend';
var TOUCH_CANCEL = exports.TOUCH_CANCEL = 'touchcancel';
var SCROLL = exports.SCROLL = 'scroll';
var SELECT = exports.SELECT = 'select';
var SELECTION_CHANGE = exports.SELECTION_CHANGE = 'selectionchange';
function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}
function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}
function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}
function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}
function isScroll(eventType) {
  return eventType === SCROLL;
}
function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
}