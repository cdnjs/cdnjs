'use strict';

var vue = require('vue');

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function signPoly(value) {
  if (value < 0) return -1;
  return value > 0 ? 1 : 0;
}
const sign = Math.sign || signPoly;
function hasFlag(val, flag) {
  return (val & flag) === flag;
}
function mod(n, mod2) {
  return (n % mod2 + mod2) % mod2;
}
function bound(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
function getValueByPath(obj, path) {
  return path.split(".").reduce((o, i) => o ? o[i] : null, obj);
}
function indexOf(array, obj, fn) {
  if (!array) return -1;
  if (!fn || typeof fn !== "function") return array.indexOf(obj);
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], obj)) {
      return i;
    }
  }
  return -1;
}
const isObject = (item) => typeof item === "object" && !Array.isArray(item);
const mergeFn = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = (prop) => isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);
    const replaced = Object.getOwnPropertyNames(source).map((prop) => ({
      [prop]: isDeep(prop) ? mergeFn(target[prop], source[prop] || {}, deep) : source[prop]
    })).reduce(
      (a, b) => __spreadValues(__spreadValues({}, a), b),
      // eslint-disable-next-line no-use-before-define
      {}
    );
    return __spreadValues(__spreadValues({}, target), replaced);
  } else {
    return Object.assign(target, source);
  }
};
const merge = mergeFn;
const isMobile = {
  Android: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return typeof window !== "undefined" && (window.navigator.userAgent.match(/iPhone|iPad|iPod/i) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  },
  Opera: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
function removeElement(el) {
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
    el.parentNode.removeChild(el);
  }
}
function createAbsoluteElement(el) {
  const root = document.createElement("div");
  root.style.position = "absolute";
  root.style.left = "0px";
  root.style.top = "0px";
  root.style.width = "100%";
  const wrapper = document.createElement("div");
  root.appendChild(wrapper);
  wrapper.appendChild(el);
  document.body.appendChild(root);
  return root;
}
function isVueComponent(c) {
  return c != null && c.$ != null && c.$.vnode != null;
}
function escapeRegExpChars(value) {
  if (!value) return value;
  return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function removeDiacriticsFromString(value) {
  if (!value) return value;
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function multiColumnSort(inputArray, sortingPriority) {
  const array = JSON.parse(JSON.stringify(inputArray));
  const fieldSorter = (fields) => (a, b) => fields.map((o) => {
    const { field, order, customSort } = o;
    if (typeof customSort === "function") {
      return customSort(a, b, order !== "desc");
    } else {
      const aValue = getValueByPath(a, field);
      const bValue = getValueByPath(b, field);
      const ord = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return order === "desc" ? -ord : ord;
    }
  }).reduce((p, n) => p || n, 0);
  return array.sort(fieldSorter(sortingPriority));
}
function createNewEvent(eventName) {
  let event;
  if (typeof Event === "function") {
    event = new Event(eventName);
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, true, true);
  }
  return event;
}
function toCssWidth(width) {
  return width === void 0 ? null : isNaN(+width) ? `${width}` : width + "px";
}
function getMonthNames(locale, format = "long") {
  const dates = [];
  for (let i = 0; i < 12; i++) {
    dates.push(new Date(2e3, i, 15));
  }
  const dtf = new Intl.DateTimeFormat(locale, {
    month: format
  });
  return dates.map((d) => dtf.format(d));
}
function getWeekdayNames(locale, format = "narrow") {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const dt = new Date(2e3, 0, i + 1);
    dates[dt.getDay()] = dt;
  }
  const dtf = new Intl.DateTimeFormat(locale, { weekday: format });
  return dates.map((d) => dtf.format(d));
}
function matchWithGroups(pattern, str) {
  const matches = str.match(pattern);
  const groupNames = pattern.toString().match(/<(.+?)>/g);
  if (groupNames == null) {
    throw new RangeError("pattern must contain at least one group");
  }
  return groupNames.map((group) => {
    const groupMatches = group.match(/<(.+)>/);
    return groupMatches[1];
  }).reduce((acc, curr, index) => {
    if (matches && matches.length > index) {
      acc[curr] = matches[index + 1];
    } else {
      acc[curr] = null;
    }
    return acc;
  }, {});
}
function isWebpSupported() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onerror = () => resolve(false);
    image.onload = () => resolve(image.width === 1);
    image.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  }).catch(() => false);
}
function isCustomElement(vm) {
  return vm.$root != null && "shadowRoot" in vm.$root.$options;
}
const isDefined = (d) => d !== void 0;
const isNil = (value) => value === null || value === void 0;
function isFragment(vnode) {
  return vnode.type === vue.Fragment;
}
function isTag(vnode) {
  return vnode.type !== vue.Comment && vnode.type !== vue.Text && vnode.type !== vue.Static;
}
function getComponentFromVNode(vnode) {
  if (!vnode) {
    return void 0;
  }
  const { component } = vnode;
  if (!component) {
    return void 0;
  }
  return component.exposed && component.exposeProxy || component.proxy;
}
function copyAppContext(src, dest) {
  const { _context: srcContext } = src;
  const { _context: destContext } = dest;
  destContext.config = srcContext.config;
  destContext.mixins = srcContext.mixins;
  destContext.components = srcContext.components;
  destContext.directives = srcContext.directives;
  destContext.provides = srcContext.provides;
  destContext.optionsCache = srcContext.optionsCache;
  destContext.propsCache = srcContext.propsCache;
  destContext.emitsCache = srcContext.emitsCache;
  if ("__VUE_I18N_SYMBOL__" in src) {
    dest.__VUE_I18N_SYMBOL__ = src.__VUE_I18N_SYMBOL__;
  }
}
const translateTouchAsDragEvent = (event, options) => {
  const { type, target } = options;
  let translateX = 0;
  let translateY = 0;
  if (target != null && target !== event.target) {
    const baseRect = event.target.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    translateX = targetRect.left - baseRect.left;
    translateY = targetRect.top - baseRect.top;
  }
  const touch = event.touches[0] || event.changedTouches[0];
  return new DragEvent(type, {
    dataTransfer: new DataTransfer(),
    bubbles: true,
    screenX: touch.screenX,
    screenY: touch.screenY,
    clientX: touch.clientX + translateX,
    clientY: touch.clientY + translateY,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    altKey: event.altKey,
    metaKey: event.metaKey
  });
};

exports.bound = bound;
exports.copyAppContext = copyAppContext;
exports.createAbsoluteElement = createAbsoluteElement;
exports.createNewEvent = createNewEvent;
exports.escapeRegExpChars = escapeRegExpChars;
exports.getComponentFromVNode = getComponentFromVNode;
exports.getMonthNames = getMonthNames;
exports.getValueByPath = getValueByPath;
exports.getWeekdayNames = getWeekdayNames;
exports.hasFlag = hasFlag;
exports.indexOf = indexOf;
exports.isCustomElement = isCustomElement;
exports.isDefined = isDefined;
exports.isFragment = isFragment;
exports.isMobile = isMobile;
exports.isNil = isNil;
exports.isTag = isTag;
exports.isVueComponent = isVueComponent;
exports.isWebpSupported = isWebpSupported;
exports.matchWithGroups = matchWithGroups;
exports.merge = merge;
exports.mod = mod;
exports.multiColumnSort = multiColumnSort;
exports.removeDiacriticsFromString = removeDiacriticsFromString;
exports.removeElement = removeElement;
exports.sign = sign;
exports.toCssWidth = toCssWidth;
exports.translateTouchAsDragEvent = translateTouchAsDragEvent;
