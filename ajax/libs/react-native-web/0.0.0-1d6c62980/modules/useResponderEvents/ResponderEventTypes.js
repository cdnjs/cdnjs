/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
export const BLUR = 'blur';
export const CONTEXT_MENU = 'contextmenu';
export const FOCUS_OUT = 'focusout';
export const MOUSE_DOWN = 'mousedown';
export const MOUSE_MOVE = 'mousemove';
export const MOUSE_UP = 'mouseup';
export const MOUSE_CANCEL = 'dragstart';
export const TOUCH_START = 'touchstart';
export const TOUCH_MOVE = 'touchmove';
export const TOUCH_END = 'touchend';
export const TOUCH_CANCEL = 'touchcancel';
export const SCROLL = 'scroll';
export const SELECT = 'select';
export const SELECTION_CHANGE = 'selectionchange';
export function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}
export function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}
export function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}
export function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}
export function isScroll(eventType) {
  return eventType === SCROLL;
}
export function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
}