/**
 * Vuikit 0.8.10
 * (c) 2018 Miljan Aleksic
 * @license MIT
**/

/* Substantial part of the code is adapted from UIkit,
  Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vuikit = factory());
}(this, (function () { 'use strict';

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
var hyphenateRe = /([a-z\d])([A-Z])/g;
function hyphenate (str) {
  return str
    .replace(hyphenateRe, '$1-$2')
    .toLowerCase()
}
function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}
function ucfirst (str) {
  return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : ''
}
var strPrototype = String.prototype;
var startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0 };
function startsWith (str, search) {
  return startsWithFn.call(str, search)
}
var endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search };
function endsWith (str, search) {
  return endsWithFn.call(str, search)
}
var includesFn = function (search) { return ~this.indexOf(search) };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;
function includes (obj, search) {
  return obj && (isString(obj) ? includesStr : includesArray).call(obj, search)
}
var isArray = Array.isArray;
function isFunction (obj) {
  return typeof obj === 'function'
}
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
function isPlainObject (obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}
function isWindow (obj) {
  return isObject(obj) && obj === obj.window
}
function isDocument (obj) {
  return isObject(obj) && obj.nodeType === 9
}
function isJQuery (obj) {
  return isObject(obj) && !!obj.jquery
}
function isNode (element) {
  return typeof Node !== 'undefined' && element instanceof Node || isObject(element) && element.nodeType === 1
}
function isNodeCollection (element) {
  return typeof NodeList !== 'undefined' && element instanceof NodeList ||
    typeof HTMLCollection !== 'undefined' && element instanceof HTMLCollection
}
function isString (value) {
  return typeof value === 'string'
}
function isNumber (value) {
  return typeof value === 'number'
}
function isNumeric (value) {
  return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value))
}
function isUndefined (value) {
  return value === void 0
}
function toFloat (value) {
  return parseFloat(value) || 0
}
function toNode (element) {
  return isNode(element) || isWindow(element) || isDocument(element)
    ? element
    : isNodeCollection(element) || isJQuery(element)
      ? element[0]
      : isArray(element)
        ? toNode(element[0])
        : null
}
var arrayProto = Array.prototype;
function toNodes (element) {
  return isNode(element)
    ? [element]
    : isNodeCollection(element)
      ? arrayProto.slice.call(element)
      : isArray(element)
        ? element.map(toNode).filter(Boolean)
        : isJQuery(element)
          ? element.toArray()
          : []
}
var assign = Object.assign || function (target) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  target = Object(target);
  for (var i = 0; i < args.length; i++) {
    var source = args[i];
    if (source !== null) {
      for (var key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }
  return target
};
function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}
function clamp (number, min, max) {
  if ( min === void 0 ) min = 0;
  if ( max === void 0 ) max = 1;
  return Math.min(Math.max(number, min), max)
}
function noop () {}
function intersectRect (r1, r2) {
  return r1.left <= r2.right &&
        r2.left <= r1.right &&
        r1.top <= r2.bottom &&
        r2.top <= r1.bottom
}

function attr (element, name, value) {
  if (isObject(name)) {
    for (var key in name) {
      attr(element, key, name[key]);
    }
    return
  }
  if (isUndefined(value)) {
    element = toNode(element);
    return element && element.getAttribute(name)
  } else {
    toNodes(element).forEach(function (element) {
      if (isFunction(value)) {
        value = value.call(element, attr(element, name));
      }
      if (value === null) {
        removeAttr(element, name);
      } else {
        element.setAttribute(name, value);
      }
    });
  }
}
function hasAttr (element, name) {
  return toNodes(element).some(function (element) { return element.hasAttribute(name); })
}
function removeAttr (element, name) {
  element = toNodes(element);
  name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
    ); }
  );
}
function filterAttr (element, attribute, pattern, replacement) {
  attr(element, attribute, function (value) { return value ? value.replace(pattern, replacement) : value; });
}
function data (element, attribute) {
  for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
    if (hasAttr(element, attrs[i])) {
      return attr(element, attrs[i])
    }
  }
}

function query (selector, context) {
  return toNode(selector) || find(selector, isContextSelector(selector) ? context : document)
}
function find (selector, context) {
  return toNode(_query(selector, context, 'querySelector'))
}
function findAll (selector, context) {
  return toNodes(_query(selector, context, 'querySelectorAll'))
}
function _query (selector, context, queryFn) {
  if ( context === void 0 ) context = document;
  if (!selector || !isString(selector)) {
    return null
  }
  selector = selector.replace(contextSanitizeRe, '$1 *');
  var removes;
  if (isContextSelector(selector)) {
    removes = [];
    selector = selector.split(',').map(function (selector, i) {
      var ctx = context;
      selector = selector.trim();
      if (selector[0] === '!') {
        var selectors = selector.substr(1).trim().split(' ');
        ctx = closest(context.parentNode, selectors[0]);
        selector = selectors.slice(1).join(' ');
      }
      if (!ctx) {
        return null
      }
      if (!ctx.id) {
        ctx.id = "uk-" + (Date.now()) + i;
        removes.push(function () { return removeAttr(ctx, 'id'); });
      }
      return ("#" + (escape(ctx.id)) + " " + selector)
    }).filter(Boolean).join(',');
    context = document;
  }
  try {
    return context[queryFn](selector)
  } catch (e) {
    return null
  } finally {
    removes && removes.forEach(function (remove) { return remove(); });
  }
}
var contextSelectorRe = /(^|,)\s*[!>+~]/;
var contextSanitizeRe = /([!>+~])(?=\s+[!>+~]|\s*$)/g;
function isContextSelector (selector) {
  return isString(selector) && selector.match(contextSelectorRe)
}
function matches (element, selector) {
  var elProto = window.Element.prototype;
  var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;
  return toNodes(element).some(function (element) { return matchesFn.call(element, selector); })
}
function closest (element, selector) {
  var elProto = window.Element.prototype;
  var closestFn = elProto.closest || function (selector) {
    var ancestor = this;
    do {
      if (matches(ancestor, selector)) {
        return ancestor
      }
      ancestor = ancestor.parentNode;
    } while (ancestor && ancestor.nodeType === 1)
  };
  if (startsWith(selector, '>')) {
    selector = selector.slice(1);
  }
  return isNode(element)
    ? element.parentNode && closestFn.call(element, selector)
    : toNodes(element).map(function (element) { return element.parentNode && closestFn.call(element, selector); }).filter(Boolean)
}
function escape (css) {
  var escapeFn = window.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) { return ("\\" + match); }) };
  return isString(css) ? escapeFn.call(null, css) : ''
}

function isVisible (element) {
  return toNodes(element).some(function (element) { return element.offsetHeight || element.getBoundingClientRect().height; })
}
function filter (element, selector) {
  return toNodes(element).filter(function (element) { return matches(element, selector); })
}
function within (element, selector) {
  return !isString(selector)
    ? element === selector || (isDocument(selector)
      ? selector.documentElement
      : toNode(selector)).contains(toNode(element))
    : matches(element, selector) || closest(element, selector)
}

function on () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var ref = getArgs(args);
  var target = ref[0];
  var type = ref[1];
  var selector = ref[2];
  var listener = ref[3];
  var useCapture = ref[4];
  target = toEventTarget(target);
  if (selector) {
    listener = delegate(target, selector, listener);
  }
  if (listener.length > 1) {
    listener = detail(listener);
  }
  type.split(' ').forEach(function (type) { return target && target.addEventListener(type, listener, useCapture); });
  return function () { return off(target, type, listener, useCapture); }
}
function off (target, type, listener, useCapture) {
  if ( useCapture === void 0 ) useCapture = false;
  target = toEventTarget(target);
  target && type.split(' ').forEach(function (type) { return target.removeEventListener(type, listener, useCapture); });
}
function once () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var ref = getArgs(args);
  var element = ref[0];
  var type = ref[1];
  var selector = ref[2];
  var listener = ref[3];
  var useCapture = ref[4];
  var condition = ref[5];
  var off = on(element, type, selector, function (e) {
    var result = !condition || condition(e);
    if (result) {
      off();
      listener(e, result);
    }
  }, useCapture);
  return off
}
function trigger (target, event, detail) {
  return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
    , true)
}
function createEvent (e, bubbles, cancelable, detail) {
  if ( bubbles === void 0 ) bubbles = true;
  if ( cancelable === void 0 ) cancelable = false;
  if (isString(e)) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(e, bubbles, cancelable, detail);
    e = event;
  }
  return e
}
function getArgs (args) {
  if (isString(args[0])) {
    args[0] = find(args[0]);
  }
  if (isFunction(args[2])) {
    args.splice(2, 0, false);
  }
  return args
}
function delegate (element, selector, listener) {
  var this$1 = this;
  return function (e) {
    var target = e.target;
    var current = selector[0] === '>'
      ? findAll(selector, element).reverse().filter(function (element) { return within(target, element); })[0]
      : closest(target, selector);
    if (current) {
      e.delegate = element;
      e.current = current;
      listener.call(this$1, e);
    }
  }
}
function detail (listener) {
  return function (e) { return isArray(e.detail) ? listener.apply(listener, [e].concat(e.detail)) : listener(e); }
}
function isEventTarget (target) {
  return typeof window !== 'undefined' && 'EventTarget' in window
    ? target instanceof window.EventTarget
    : target && 'addEventListener' in target
}
function toEventTarget (target) {
  return isEventTarget(target) ? target : toNode(target)
}
function toEventTargets (target) {
  return isEventTarget(target)
    ? [target]
    : isArray(target)
      ? target.map(toEventTarget).filter(Boolean)
      : toNodes(target)
}

var doc = typeof document !== 'undefined' && document;
function isReady () {
  return doc && (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll)
}
function ready (fn) {
  if (!doc) {
    return
  }
  if (isReady()) {
    fn();
    return
  }
  var handle = function () {
    unbind1();
    unbind2();
    fn();
  };
  var unbind1 = on(document, 'DOMContentLoaded', handle);
  var unbind2 = on(window, 'load', handle);
}
function append (parent, element) {
  parent = toNode(parent);
  return insertNodes(element, function (element) { return parent.appendChild(element); })
}
function before (ref, element) {
  ref = toNode(ref);
  return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); })
}
function after (ref, element) {
  ref = toNode(ref);
  return insertNodes(element, function (element) { return ref.nextSibling
    ? before(ref.nextSibling, element)
    : append(ref.parentNode, element); }
  )
}
function insertNodes (element, fn) {
  element = isString(element) ? fragment(element) : element;
  return element
    ? 'length' in element
      ? toNodes(element).map(fn)
      : fn(element)
    : null
}
function remove (element) {
  toNodes(element).map(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
}
var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
function fragment (html) {
  var matches = singleTagRE.exec(html);
  if (matches) {
    return document.createElement(matches[1])
  }
  var container = document.createElement('div');
  if (fragmentRE.test(html)) {
    container.insertAdjacentHTML('beforeend', html.trim());
  } else {
    container.textContent = html;
  }
  return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild
}

function addClass (element) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  apply$1(element, args, 'add');
}
function removeClass (element) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  apply$1(element, args, 'remove');
}
function removeClasses (element, cls) {
  filterAttr(element, 'class', new RegExp(("(^|\\s)" + cls + "(?!\\S)"), 'g'), '');
}
function replaceClass (element) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  args[0] && removeClass(element, args[0]);
  args[1] && addClass(element, args[1]);
}
function hasClass (element, cls) {
  return toNodes(element).some(function (element) { return element.classList.contains(cls); })
}
function toggleClass (element) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  if (!args.length) {
    return
  }
  args = getArgs$1(args);
  var force = !isString(args[args.length - 1]) ? args.pop() : [];
  args = args.filter(Boolean);
  toNodes(element).forEach(function (ref) {
    var classList = ref.classList;
    for (var i = 0; i < args.length; i++) {
      supports.Force
        ? classList.toggle.apply(classList, [args[i]].concat(force))
        : (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
    }
  });
}
function apply$1 (element, args, fn) {
  args = getArgs$1(args).filter(Boolean);
  args.length && toNodes(element).forEach(function (ref) {
    var classList = ref.classList;
    supports.Multiple
      ? classList[fn].apply(classList, args)
      : args.forEach(function (cls) { return classList[fn](cls); });
  });
}
function getArgs$1 (args) {
  return args.reduce(function (args, arg) { return args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg); }
    , [])
}
var supports = {};
(function () {
  if (typeof document !== 'undefined' && document.createElement('_').classList) {
    var list = document.createElement('_').classList;
    list.add('a', 'b');
    list.toggle('c', false);
    supports.Multiple = list.contains('b');
    supports.Force = !list.contains('c');
    list = null;
  }
})();

var cssNumber = {
  'animation-iteration-count': true,
  'column-count': true,
  'fill-opacity': true,
  'flex-grow': true,
  'flex-shrink': true,
  'font-weight': true,
  'line-height': true,
  'opacity': true,
  'order': true,
  'orphans': true,
  'widows': true,
  'z-index': true,
  'zoom': true
};
function css (element, property, value) {
  return toNodes(element).map(function (element) {
    if (isString(property)) {
      property = propName(property);
      if (isUndefined(value)) {
        return getStyle(element, property)
      } else if (!value && value !== 0) {
        element.style.removeProperty(property);
      } else {
        element.style[property] = isNumeric(value) && !cssNumber[property] ? (value + "px") : value;
      }
    } else if (isArray(property)) {
      var styles = getStyles(element);
      return property.reduce(function (props, property) {
        props[property] = styles[propName(property)];
        return props
      }, {})
    } else if (isObject(property)) {
      each(property, function (value, property) { return css(element, property, value); });
    }
    return element
  })[0]
}
function getStyles (element, pseudoElt) {
  element = toNode(element);
  return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt)
}
function getStyle (element, property, pseudoElt) {
  return getStyles(element, pseudoElt)[property]
}
var vars = {};
function getCssVar (name) {
  if (!(name in vars)) {
    var element = append(document.documentElement, document.createElement('div'));
    addClass(element, ("var-" + name));
    try {
      vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
      vars[name] = JSON.parse(vars[name]);
    } catch (e) {}
    document.documentElement.removeChild(element);
  }
  return vars[name]
}
var cssProps = {};
function propName (name) {
  var ret = cssProps[name];
  if (!ret) {
    ret = cssProps[name] = vendorPropName(name) || name;
  }
  return ret
}
var cssPrefixes = ['webkit', 'moz', 'ms'];
function vendorPropName (name) {
  var ref = document.createElement('_');
  var style = ref.style;
  name = hyphenate(name);
  if (name in style) {
    return name
  }
  var i = cssPrefixes.length, prefixedName;
  while (i--) {
    prefixedName = "-" + (cssPrefixes[i]) + "-" + name;
    if (prefixedName in style) {
      return prefixedName
    }
  }
}

function toMedia (value) {
  if (isString(value)) {
    if (value[0] === '@') {
      var name = "media-" + (value.substr(1));
      value = toFloat(getCssVar(name));
    } else if (isNaN(value)) {
      return value
    }
  }
  return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false
}
function get (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? _get(obj, path)
    : undefined;
  return result === undefined
    ? defVal
    : result
}
function _get (obj, path) {
  return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, obj)
}
function range (start, stop, step) {
  if ( step === void 0 ) step = 1;
  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }
  return Array.from(new Array(Math.floor((stop - start) / step)), function (x, i) { return start + (i * step); })
}

function findParent (instance) {
  return findParents(instance).pop()
}
function findParents (instance) {
  var parents = [];
  var name = instance.$options.name;
  var parent = instance.$parent;
  while (parent) {
    if (parent.$options.name === name) {
      parents.unshift(parent);
    }
    parent = parent.$parent;
  }
  return parents
}
function apply$2 (instance, fn) {
  if (!instance || !instance._isVue) {
    return
  }
  fn(instance);
  instance.$children.forEach(function (child) { return apply$2(child, fn); });
}
function filterOutTextNodes (nodes) {
  return nodes.filter(function (n) { return n.tag || isAsyncPlaceholder(n); })
}
function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}
function mergeData () {
  var arguments$1 = arguments;
  for(var e,a,s={},t=arguments.length;t--;){ for(var r=0,c=Object.keys(arguments[t]);r<c.length;r++){ switch(e=c[r]){case"class":case"style":case"directives":Array.isArray(s[e])||(s[e]=[]), s[e]=s[e].concat(arguments$1[t][e]);break;case"staticClass":if(!arguments$1[t][e]){ break; }void 0===s[e]&&(s[e]=""), s[e]&&(s[e]+=" "), s[e]+=arguments$1[t][e].trim();break;case"on":case"nativeOn":s[e]||(s[e]={});for(var o=0,n=Object.keys(arguments[t][e]);o<n.length;o++){ a=n[o], s[e][a]?s[e][a]=[].concat(s[e][a],arguments$1[t][e][a]):s[e][a]=arguments$1[t][e][a]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":s[e]||(s[e]={}), s[e]=__assign({},arguments$1[t][e],s[e]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:s[e]||(s[e]=arguments$1[t][e]);} } }return s}var __assign=Object.assign||function(e){
  var arguments$1 = arguments;
for(var a,s=1,t=arguments.length;s<t;s++){a=arguments$1[s];for(var r in a){ Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]); }}return e
};

var ElementBreadcrumb = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h('ul', mergeData(data, {
      class: 'uk-breadcrumb'
    }), children)
  }
}

var ElementBreadcrumbItem = {
  functional: true,
  props: {
    href: String,
    target: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var disabled = props.disabled;
    var href = props.href;
    var target = props.target;
    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled
      }
    }), [
      (isUndefined(href) || disabled)
        ? h('span', children)
        : h('a', { attrs: { href: href, target: target } }, children)
    ])
  }
}

var breadcrumb = {
  name: 'VkBreadcrumb',
  functional: true,
  props: ElementBreadcrumb.props,
  render: ElementBreadcrumb.render
}

var breadcrumb_Item = {
  name: 'VkBreadcrumbItem',
  functional: true,
  props: ElementBreadcrumbItem.props,
  render: ElementBreadcrumbItem.render
}

var props = {
  active: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    validator: function (val) { return !val || /^(small|large)$/.test(val); }
  },
  type: {
    type: String,
    validator: function (val) { return !val || /^(primary|secondary|danger|text|link)$/.test(val); }
  }
};
var def = function (ref) {
  var obj;
  var type = ref.type;
  var active = ref.active;
  var size = ref.size;
  return ({
  class: ['uk-button', ("uk-button-" + (type || 'default')), ( obj = {
    'uk-active': active
  }, obj[("uk-button-" + size)] = size, obj)]
});
};

var ElementButton = {
  functional: true,
  props: assign({}, props, {
    htmlType: {
      type: String,
      default: 'button'
    }
  }),
  render: function render (h, ref) {
    var props$$1 = ref.props;
    var data = ref.data;
    var children = ref.children;
    var htmlType = props$$1.htmlType;
    return h('button', mergeData(data, def(props$$1), {
      attrs: {
        type: htmlType
      }
    }), children)
  }
}

var ElementButtonLink = {
  functional: true,
  props: props,
  render: function render (h, ref) {
    var props$$1 = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h('a', mergeData(data, def(props$$1)), children)
  }
}

var ElementButtonGroup = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-button-group'
    }), children)
  }
}

var button = {
  name: 'VkButton',
  functional: true,
  props: ElementButton.props,
  render: ElementButton.render
}

var buttonLink = {
  name: 'VkButtonLink',
  functional: true,
  props: ElementButtonLink.props,
  render: ElementButtonLink.render
}

var buttonGroup = {
  name: 'VkButtonGroup',
  functional: true,
  props: ElementButtonGroup.props,
  render: ElementButtonGroup.render
}

var ElementCard = {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: function (val) { return /^(default|primary|secondary|blank)$/.test(val); }
    },
    padding: {
      type: String,
      validator: function (val) { return !val || /^(small|large)$/.test(val); }
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var data = ref.data;
    var slots = ref.slots;
    var type = props.type;
    var padding = props.padding;
    var hover = props.hover;
    var _slots = slots();
    var body = _slots.body;
    if (!body || !body.length) {
      _slots.body = _slots.default;
      delete _slots.default;
    }
    return h('div', mergeData(data, {
      class: ['uk-card', ( obj = {
        'uk-card-hover': hover
      }, obj[("uk-card-" + type)] = type, obj[("uk-card-" + padding)] = padding, obj)]
    }), [
      _slots.default && _slots.default,
      _slots['media-top'] && h('div', { class: 'uk-card-media-top' }, _slots['media-top']),
      _slots.badge && h('div', { class: 'uk-card-badge' }, _slots.badge),
      _slots.header && h('div', { class: 'uk-card-header' }, _slots.header),
      _slots['media'] && h('div', { class: 'uk-card-media' }, _slots['media']),
      _slots.body && h('div', { class: 'uk-card-body' }, _slots.body),
      _slots.footer && h('div', { class: 'uk-card-footer' }, _slots.footer),
      _slots['media-bottom'] && h('div', { class: 'uk-card-media-bottom' }, _slots['media-bottom'])
    ])
  }
}

var ElementCardTitle = {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'h3'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h(props.tag, mergeData(data, {
      class: 'uk-card-title'
    }), children)
  }
}

var card = {
  name: 'VkCard',
  functional: true,
  props: ElementCard.props,
  render: ElementCard.render
}

var card_Title = {
  name: 'VkCardTitle',
  functional: true,
  props: ElementCardTitle.props,
  render: ElementCardTitle.render
}

var VkRoot = {
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () {
      vnode.context.$root.$el.appendChild(el);
    });
  }
}

function noop$1 () {}
var warn = noop$1;
var tip = noop$1;
{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };
  warn = function (msg, vm) {
    if (hasConsole) {
      console.error("[Vuikit warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };
  tip = function (msg, vm) {
    if (hasConsole) {
      console.warn("[Vuikit tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };
  var formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;
    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }
    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };
  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };
  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

var dirs = {
  width: ['x', 'left', 'right'],
  height: ['y', 'top', 'bottom']
};
function positionAt (element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {
  elAttach = getPos(elAttach);
  targetAttach = getPos(targetAttach);
  var flipped = {element: elAttach, target: targetAttach};
  if (!element || !target) {
    return flipped
  }
  var dim = getDimensions(element);
  var targetDim = getDimensions(target);
  var position = targetDim;
  moveTo(position, elAttach, dim, -1);
  moveTo(position, targetAttach, targetDim, 1);
  elOffset = getOffsets(elOffset, dim.width, dim.height);
  targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);
  elOffset['x'] += targetOffset['x'];
  elOffset['y'] += targetOffset['y'];
  position.left += elOffset['x'];
  position.top += elOffset['y'];
  boundary = getDimensions(boundary || window$1(element));
  if (flip) {
    each(dirs, function (ref, prop) {
      var dir = ref[0];
      var align = ref[1];
      var alignFlip = ref[2];
      if (!(flip === true || includes(flip, dir))) {
        return
      }
      var elemOffset = elAttach[dir] === align
        ? -dim[prop]
        : elAttach[dir] === alignFlip
          ? dim[prop]
          : 0;
      var targetOffset = targetAttach[dir] === align
        ? targetDim[prop]
        : targetAttach[dir] === alignFlip
          ? -targetDim[prop]
          : 0;
      if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
        var centerOffset = dim[prop] / 2;
        var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;
        elAttach[dir] === 'center' && (
          apply(centerOffset, centerTargetOffset) ||
                    apply(-centerOffset, -centerTargetOffset)
        ) || apply(elemOffset, targetOffset);
      }
      function apply (elemOffset, targetOffset) {
        var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;
        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
          position[align] = newVal;
          ['element', 'target'].forEach(function (el) {
            flipped[el][dir] = !elemOffset
              ? flipped[el][dir]
              : flipped[el][dir] === dirs[prop][1]
                ? dirs[prop][2]
                : dirs[prop][1];
          });
          return true
        }
      }
    });
  }
  offset(element, position);
  return flipped
}
function offset (element, coordinates) {
  element = toNode(element);
  if (coordinates) {
    var currentOffset = offset(element);
    var pos = css(element, 'position');
    ['left', 'top'].forEach(function (prop) {
      if (prop in coordinates) {
        var value = css(element, prop);
        element.style[prop] = ((coordinates[prop] - currentOffset[prop]) +
                toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value)) + "px";
      }
    });
    return
  }
  return getDimensions(element)
}
function getDimensions (element) {
  element = toNode(element);
  var ref = window$1(element);
  var top = ref.pageYOffset;
  var left = ref.pageXOffset;
  if (isWindow(element)) {
    var height = element.innerHeight;
    var width = element.innerWidth;
    return {
      top: top,
      left: left,
      height: height,
      width: width,
      bottom: top + height,
      right: left + width
    }
  }
  var display = false;
  if (!isVisible(element)) {
    display = element.style.display;
    element.style.display = 'block';
  }
  var rect = element.getBoundingClientRect();
  if (display !== false) {
    element.style.display = display;
  }
  return {
    height: rect.height,
    width: rect.width,
    top: rect.top + top,
    left: rect.left + left,
    bottom: rect.bottom + top,
    right: rect.right + left
  }
}
function position (element) {
  element = toNode(element);
  var parent = offsetParent(element);
  var parentOffset = parent === docEl(element) ? {top: 0, left: 0} : offset(parent);
  var ref = ['top', 'left'].reduce(function (props, prop) {
    var propName$$1 = ucfirst(prop);
    props[prop] -= parentOffset[prop] +
            (toFloat(css(element, ("margin" + propName$$1))) || 0) +
            (toFloat(css(parent, ("border" + propName$$1 + "Width"))) || 0);
    return props
  }, offset(element));
  var top = ref.top;
  var left = ref.left;
  return {top: top, left: left}
}
function offsetParent (element) {
  var parent = toNode(element).offsetParent;
  while (parent && css(parent, 'position') === 'static') {
    parent = parent.offsetParent;
  }
  return parent || docEl(element)
}
var height = dimension('height');
var width = dimension('width');
function dimension (prop) {
  var propName$$1 = ucfirst(prop);
  return function (element, value) {
    element = toNode(element);
    if (isUndefined(value)) {
      if (isWindow(element)) {
        return element[("inner" + propName$$1)]
      }
      if (isDocument(element)) {
        var doc = element.documentElement;
        return Math.max(doc[("offset" + propName$$1)], doc[("scroll" + propName$$1)])
      }
      value = css(element, prop);
      value = value === 'auto' ? element[("offset" + propName$$1)] : toFloat(value) || 0;
      return getContentSize(prop, element, value)
    } else {
      css(element, prop, !value && value !== 0
        ? ''
        : getContentSize(prop, element, value) + 'px'
      );
    }
  }
}
function getContentSize (prop, element, value) {
  return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value -
        toFloat(css(element, ("padding" + prop))) -
        toFloat(css(element, ("border" + prop + "Width"))); }
    , value) : value
}
function moveTo (position, attach, dim, factor) {
  each(dirs, function (ref, prop) {
    var dir = ref[0];
    var align = ref[1];
    var alignFlip = ref[2];
    if (attach[dir] === alignFlip) {
      position[align] += dim[prop] * factor;
    } else if (attach[dir] === 'center') {
      position[align] += dim[prop] * factor / 2;
    }
  });
}
function getPos (pos) {
  var x = /left|center|right/;
  var y = /top|center|bottom/;
  pos = (pos || '').split(' ');
  if (pos.length === 1) {
    pos = x.test(pos[0])
      ? pos.concat(['center'])
      : y.test(pos[0])
        ? ['center'].concat(pos)
        : ['center', 'center'];
  }
  return {
    x: x.test(pos[0]) ? pos[0] : 'center',
    y: y.test(pos[1]) ? pos[1] : 'center'
  }
}
function getOffsets (offsets, width, height) {
  var ref = (offsets || '').split(' ');
  var x = ref[0];
  var y = ref[1];
  return {
    x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
    y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
  }
}
function flipPosition (pos) {
  switch (pos) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    default:
      return pos
  }
}
function isInView (element, top, left) {
  if ( top === void 0 ) top = 0;
  if ( left === void 0 ) left = 0;
  element = toNode(element);
  var win = window$1(element);
  return intersectRect(element.getBoundingClientRect(), {
    top: top,
    left: left,
    bottom: top + height(win),
    right: left + width(win)
  })
}
function window$1 (element) {
  return isWindow(element) ? element : document$1(element).defaultView
}
function document$1 (element) {
  return toNode(element).ownerDocument
}
function docEl (element) {
  return document$1(element).documentElement
}

var BEFORE_POSITION = 'v-vk-position:before';
var AFTER_POSITION = 'v-vk-position:after';

var Directive = {
  inserted: function inserted (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);
    if (ctx) {
      position$1(ctx);
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);
    if (ctx) {
      position$1(ctx);
    }
  }
}
function position$1 (ctx) {
  var el = ctx.el;
  var props = ctx.props;
  var vnode = ctx.vnode;
  var target = props.target;
  var position$$1 = props.position;
  var offset$$1 = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;
  var mainClass = props.mainClass;
  if ("development" !== 'production' && !position$$1.match(/^((top|bottom)-(left|center|right))|((left|right)-(top|center|bottom))$/)) {
    warn(("v-position -> '" + position$$1 + "' -> no valid position"), vnode);
  }
  if ("development" !== 'production' && (!target || !target.tagName)) {
    warn("v-position -> no valid target", vnode);
  }
  var ref = position$$1.split('-');
  var dir = ref[0];
  var align = ref[1];
  trigger(el, BEFORE_POSITION);
  var classesRx = new RegExp((mainClass + "-(top|bottom|left|right)(-[a-z]+)?"));
  el.className = el.className.replace(classesRx, '');
  css(el, { top: '', left: '' });
  var axis = getPositionAxis(position$$1);
  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));
  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);
  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
    : (" " + (dir === 'top' ? -1 * offset$$1 : offset$$1));
  var targetOffset = null;
  var ref$1 = positionAt(
    el,
    target,
    elAttach,
    targetAttach,
    elOffset,
    targetOffset,
    flip,
    boundary
  ).target;
  var x = ref$1.x;
  var y = ref$1.y;
  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;
  toggleClass(el, (mainClass + "-" + dir + "-" + align), offset$$1 === false);
  trigger(el, AFTER_POSITION);
}
function getOptions (ctx) {
  var vnode = ctx.vnode;
  var ref = ctx.binding;
  var value = ref.value;
  if ("development" !== 'production' && (isUndefined(value) || !isObject(value))) {
    warn('v-position -> configuration is missing or is not an Object', vnode.context);
  }
  var options = assign({
    target: null,
    position: 'top-center',
    boundary: window,
    flip: true,
    offset: false,
    mainClass: ''
  }, value);
  return options
}
function getContext (el, binding, vnode) {
  var ctx = { el: el, binding: binding, vnode: vnode };
  ctx.props = getOptions(ctx);
  if (!ctx.props) {
    binding.def.unbind(el, binding);
    return
  }
  return ctx
}
function getPositionAxis (position$$1) {
  var ref = position$$1.split('-');
  var dir = ref[0];
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}

var EventsMixin = {
  methods: {
    on: function on$1 () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      this._vk_events_off.push(on.apply(void 0, args));
    },
    off: function off$1 () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      off.apply(void 0, args);
    }
  },
  created: function created () {
    this._vk_events_off = [];
  },
  beforeDestroy: function beforeDestroy () {
    this._vk_events_off.forEach(function (off$$1) { return off$$1(); });
  }
}

function $ (selector, context) {
  return !isString(selector)
    ? toNode(selector)
    : isHtml(selector)
      ? toNode(fragment(selector))
      : find(selector, context)
}
function $$ (selector, context) {
  return !isString(selector)
    ? toNodes(selector)
    : isHtml(selector)
      ? toNodes(fragment(selector))
      : findAll(selector, context)
}
function isHtml (str) {
  return str[0] === '<' || str.match(/^\s*</)
}

function MouseTracker () {}
MouseTracker.prototype = {
  positions: [],
  position: null,
  init: function init () {
    var this$1 = this;
    this.positions = [];
    this.position = null;
    var ticking = false;
    this.unbind = on(document, 'mousemove', function (e) {
      if (ticking) {
        return
      }
      setTimeout(function () {
        var time = Date.now();
        var ref = this$1.positions;
        var length = ref.length;
        if (length && (time - this$1.positions[length - 1].time > 100)) {
          this$1.positions.splice(0, length);
        }
        this$1.positions.push({time: time, x: e.pageX, y: e.pageY});
        if (this$1.positions.length > 5) {
          this$1.positions.shift();
        }
        ticking = false;
      }, 5);
      ticking = true;
    });
  },
  cancel: function cancel () {
    if (this.unbind) {
      this.unbind();
    }
  },
  movesTo: function movesTo (target) {
    if (this.positions.length < 2) {
      return false
    }
    var p = offset(target);
    var position$$1 = this.positions[this.positions.length - 1];
    var ref = this.positions;
    var prevPos = ref[0];
    if (p.left <= position$$1.x && position$$1.x <= p.right && p.top <= position$$1.y && position$$1.y <= p.bottom) {
      return false
    }
    var points = [
      [{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
      [{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
    ];
    if (p.right <= position$$1.x) {
    } else if (p.left >= position$$1.x) {
      points[0].reverse();
      points[1].reverse();
    } else if (p.bottom <= position$$1.y) {
      points[0].reverse();
    } else if (p.top >= position$$1.y) {
      points[1].reverse();
    }
    return !!points.reduce(function (result, point) {
      return result + (slope(prevPos, point[0]) < slope(position$$1, point[0]) && slope(prevPos, point[1]) > slope(position$$1, point[1]))
    }, 0)
  }
};
function slope (a, b) {
  return (b.y - a.y) / (b.x - a.x)
}

var doc$1 = typeof document !== 'undefined' && document;
var win$1 = typeof window !== 'undefined' && window;
var nav = typeof navigator !== 'undefined' && navigator;
var isRtl = doc$1 && attr(document.documentElement, 'dir') === 'rtl';
var hasTouchEvents = win$1 && 'ontouchstart' in window;
var hasPointerEvents = win$1 && window.PointerEvent;
var hasTouch = hasTouchEvents ||
  (win$1 && window.DocumentTouch) && (doc$1 && document instanceof window.DocumentTouch) ||
  nav && navigator.maxTouchPoints;
var pointerDown = !hasTouch ? 'mousedown' : ("mousedown " + (hasTouchEvents ? 'touchstart' : 'pointerdown'));
var pointerMove = !hasTouch ? 'mousemove' : ("mousemove " + (hasTouchEvents ? 'touchmove' : 'pointermove'));
var pointerUp = !hasTouch ? 'mouseup' : ("mouseup " + (hasTouchEvents ? 'touchend' : 'pointerup'));
var pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter';
var pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave';

var props$1 = {
  target: {},
  boundary: {},
  boundaryAlign: {
    type: Boolean,
    default: false
  },
  flip: {
    type: [String, Boolean],
    default: true
  },
  position: {
    type: String,
    default: ("bottom-" + (isRtl ? 'right' : 'left')),
    validator: function (pos) { return /^(top|bottom)-(left|right|center|justify)$/.test(pos) ||
      /^(left|right)-(top|bottom|center|justify)$/.test(pos); }
  },
  offset: {
    type: [Boolean, Number],
    default: false
  },
  animation: {
    type: String,
    default: 'fade'
  },
  duration: {
    type: Number,
    default: 200
  },
  mode: {
    type: String,
    default: 'click hover'
  },
  delayShow: {
    type: Number,
    default: 0
  },
  delayHide: {
    type: Number,
    default: 800
  },
  mainClass: {
    type: String,
    default: 'uk-drop'
  }
}

var ElementDrop = {
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;
    var show = props.show;
    return h('div', mergeData(data, {
      class: {
        'uk-open': show
      },
      style: {
        display: show ? 'block' : null
      }
    }), children)
  }
}

var win$2 = typeof window !== 'undefined' && window;
var Promise = win$2 && 'Promise' in window ? window.Promise : PromiseFn;
var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;
var async = win$2 && 'setImmediate' in window ? setImmediate : setTimeout;
function PromiseFn (executor) {
  this.state = PENDING;
  this.value = undefined;
  this.deferred = [];
  var promise = this;
  try {
    executor(
      function (x) {
        promise.resolve(x);
      },
      function (r) {
        promise.reject(r);
      }
    );
  } catch (e) {
    promise.reject(e);
  }
}
PromiseFn.reject = function (r) {
  return new PromiseFn(function (resolve, reject) {
    reject(r);
  })
};
PromiseFn.resolve = function (x) {
  return new PromiseFn(function (resolve, reject) {
    resolve(x);
  })
};
PromiseFn.all = function all (iterable) {
  return new PromiseFn(function (resolve, reject) {
    var result = [];
    var count = 0;
    if (iterable.length === 0) {
      resolve(result);
    }
    function resolver (i) {
      return function (x) {
        result[i] = x;
        count += 1;
        if (count === iterable.length) {
          resolve(result);
        }
      }
    }
    for (var i = 0; i < iterable.length; i += 1) {
      PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
    }
  })
};
PromiseFn.race = function race (iterable) {
  return new PromiseFn(function (resolve, reject) {
    for (var i = 0; i < iterable.length; i += 1) {
      PromiseFn.resolve(iterable[i]).then(resolve, reject);
    }
  })
};
var p = PromiseFn.prototype;
p.resolve = function resolve (x) {
  var promise = this;
  if (promise.state === PENDING) {
    if (x === promise) {
      throw new TypeError('Promise settled with itself.')
    }
    var called = false;
    try {
      var then = x && x.then;
      if (x !== null && isObject(x) && isFunction(then)) {
        then.call(
          x,
          function (x) {
            if (!called) {
              promise.resolve(x);
            }
            called = true;
          },
          function (r) {
            if (!called) {
              promise.reject(r);
            }
            called = true;
          }
        );
        return
      }
    } catch (e) {
      if (!called) {
        promise.reject(e);
      }
      return
    }
    promise.state = RESOLVED;
    promise.value = x;
    promise.notify();
  }
};
p.reject = function reject (reason) {
  var promise = this;
  if (promise.state === PENDING) {
    if (reason === promise) {
      throw new TypeError('Promise settled with itself.')
    }
    promise.state = REJECTED;
    promise.value = reason;
    promise.notify();
  }
};
p.notify = function notify () {
  var this$1 = this;
  async(function () {
    if (this$1.state !== PENDING) {
      while (this$1.deferred.length) {
        var ref = this$1.deferred.shift();
        var onResolved = ref[0];
        var onRejected = ref[1];
        var resolve = ref[2];
        var reject = ref[3];
        try {
          if (this$1.state === RESOLVED) {
            if (isFunction(onResolved)) {
              resolve(onResolved.call(undefined, this$1.value));
            } else {
              resolve(this$1.value);
            }
          } else if (this$1.state === REJECTED) {
            if (isFunction(onRejected)) {
              resolve(onRejected.call(undefined, this$1.value));
            } else {
              reject(this$1.value);
            }
          }
        } catch (e) {
          reject(e);
        }
      }
    }
  });
};
p.then = function then (onResolved, onRejected) {
  var this$1 = this;
  return new PromiseFn(function (resolve, reject) {
    this$1.deferred.push([onResolved, onRejected, resolve, reject]);
    this$1.notify();
  })
};
p.catch = function (onRejected) {
  return this.then(undefined, onRejected)
};

function transition (element, props, duration, timing) {
  if ( duration === void 0 ) duration = 400;
  if ( timing === void 0 ) timing = 'linear';
  return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {
      for (var name in props) {
        var value = css(element, name);
        if (value === '') {
          css(element, name, value);
        }
      }
      var timer = setTimeout(function () { return trigger(element, 'transitionend'); }, duration);
      once(element, 'transitionend transitioncanceled', function (ref) {
        var type = ref.type;
        clearTimeout(timer);
        removeClass(element, 'uk-transition');
        css(element, {
          'transition-property': '',
          'transition-duration': '',
          'transition-timing-function': ''
        });
        type === 'transitioncanceled' ? reject() : resolve();
      }, false, function (ref) {
        var target = ref.target;
        return element === target;
      });
      addClass(element, 'uk-transition');
      css(element, assign({
        'transition-property': Object.keys(props).map(propName).join(','),
        'transition-duration': (duration + "ms"),
        'transition-timing-function': timing
      }, props));
    }); }
  ))
}
var Transition = {
  start: transition,
  stop: function stop (element) {
    trigger(element, 'transitionend');
    return Promise.resolve()
  },
  cancel: function cancel (element) {
    trigger(element, 'transitioncanceled');
  },
  inProgress: function inProgress (element) {
    return hasClass(element, 'uk-transition')
  }
};
var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';
function animate (element, animation, duration, origin, out) {
  var arguments$1 = arguments;
  if ( duration === void 0 ) duration = 200;
  return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {
      if (hasClass(element, clsCancelAnimation)) {
        requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(void 0, arguments$1).then(resolve, reject); }
          ); }
        );
        return
      }
      var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');
      if (startsWith(animation, animationPrefix)) {
        if (origin) {
          cls += " uk-transform-origin-" + origin;
        }
        if (out) {
          cls += " " + animationPrefix + "reverse";
        }
      }
      reset();
      once(element, 'animationend animationcancel', function (ref) {
        var type = ref.type;
        var hasReset = false;
        if (type === 'animationcancel') {
          reject();
          reset();
        } else {
          resolve();
          Promise.resolve().then(function () {
            hasReset = true;
            reset();
          });
        }
        requestAnimationFrame(function () {
          if (!hasReset) {
            addClass(element, clsCancelAnimation);
            requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
          }
        });
      }, false, function (ref) {
        var target = ref.target;
        return element === target;
      });
      css(element, 'animationDuration', (duration + "ms"));
      addClass(element, cls);
      function reset () {
        css(element, 'animationDuration', '');
        removeClasses(element, (animationPrefix + "\\S*"));
      }
    }); }
  ))
}
var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
var Animation = {
  in: function in$1 (element, animation, duration, origin) {
    return animate(element, animation, duration, origin, false)
  },
  out: function out (element, animation, duration, origin) {
    return animate(element, animation, duration, origin, true)
  },
  inProgress: function inProgress$1 (element) {
    return inProgress.test(attr(element, 'class'))
  },
  cancel: function cancel (element) {
    trigger(element, 'animationcancel');
  }
};

var Transition$1 = {
  name: 'VkTransition',
  functional: true,
  props: {
    name: {
      type: [String, Array],
      required: true
    },
    duration: {
      type: Number
    },
    mode: {
      type: String,
      default: 'out-in'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var name = props.name;
    var duration = props.duration;
    var ref$1 = isString(name) ? [name, name] : name;
    var animationIn = ref$1[0];
    var animationOut = ref$1[1];
    var def = {
      props: {
        css: false,
        mode: props.mode
      },
      on: {
        enter: function enter (el, done) {
          animationIn
            ? Animation.in(el, ("uk-animation-" + animationIn), duration).then(done)
            : done();
        },
        leave: function leave (el, done) {
          animationOut
            ? Animation.out(el, ("uk-animation-" + animationOut), duration).then(done)
            : done();
        }
      }
    };
    return h('transition', def, children)
  }
}

var render = {
  mounted: function mounted () {
    this.$refs.target = this.queryElement(this.target) || this.$el.previousElementSibling;
    this.$refs.boundary = this.queryElement(this.boundary) || window;
    this.$forceUpdate();
  },
  render: function render (h) {
    var this$1 = this;
    var obj, obj$1;
    var ref = this;
    var position$$1 = ref.position;
    var ref$1 = this.$refs;
    var boundary = ref$1.boundary;
    var target = ref$1.target;
    var ref$2 = position$$1.split('-');
    var align = ref$2[1];
    var ref$3 = this;
    var boundaryAlign = ref$3.boundaryAlign;
    var animation = ref$3.animation;
    var duration = ref$3.duration;
    var mainClass = ref$3.mainClass;
    var flip = ref$3.flip;
    var offset$$1 = ref$3.offset;
    if (!target || !boundary) { return }
    position$$1 = position$$1.replace('justify', 'center');
    target = boundaryAlign ? boundary : target;
    var def = {
      on: ( obj = {}, obj[BEFORE_POSITION] = function (e) {
          var ref = this$1;
          var $el = ref.$el;
          var alignTo = offset(target);
          var boundaryOffset = offset(boundary);
          css($el, { width: '', height: '' });
          removeClass($el, (mainClass + "-stack"));
          if (align === 'justify') {
            var prop = getAxis(position$$1) === 'y' ? 'width' : 'height';
            css($el, prop, alignTo[prop]);
          } else if ($el.offsetWidth > Math.max(boundaryOffset.right - alignTo.left, alignTo.right - boundaryOffset.left)) {
            addClass($el, (mainClass + "-stack"));
          }
        }, obj),
      props: {
        show: this.shown
      },
      class: [mainClass, ( obj$1 = {}, obj$1[(mainClass + "-boundary")] = this.boundaryAlign, obj$1)],
      directives: [
        {
          name: 'show',
          value: this.shown
        },
        {
          name: 'vk-position',
          value: {
            flip: flip,
            offset: offset$$1,
            target: target,
            boundary: boundary,
            position: position$$1,
            mainClass: mainClass
          }
        }
      ]
    };
    return h(Transition$1, {
      props: {
        name: [animation],
        duration: duration
      }
    }, [
      h(ElementDrop, def, this.$slots.default)
    ])
  }
}
function getAxis (position$$1) {
  var ref = position$$1.split('-');
  var dir = ref[0];
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}

var SHOW = 'show';
var HIDE = 'hide';

var touch = {}, clickTimeout, swipeTimeout, tapTimeout, clicked;
function swipeDirection (ref) {
  var x1 = ref.x1;
  var x2 = ref.x2;
  var y1 = ref.y1;
  var y2 = ref.y2;
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}
function cancelAll () {
  clickTimeout && clearTimeout(clickTimeout);
  swipeTimeout && clearTimeout(swipeTimeout);
  tapTimeout && clearTimeout(tapTimeout);
  clickTimeout = swipeTimeout = tapTimeout = null;
  touch = {};
}
ready(function () {
  on(document, 'click', function () { return clicked = true; }, true);
  on(document, pointerDown, function (e) {
    var target = e.target;
    var ref = getPos$1(e);
    var x = ref.x;
    var y = ref.y;
    var now = Date.now();
    var type = getType(e.type);
    if (touch.type && touch.type !== type) {
      return
    }
    touch.el = 'tagName' in target ? target : target.parentNode;
    clickTimeout && clearTimeout(clickTimeout);
    touch.x1 = x;
    touch.y1 = y;
    if (touch.last && now - touch.last <= 250) {
      touch = {};
    }
    touch.type = type;
    touch.last = now;
    clicked = e.button > 0;
  });
  on(document, pointerMove, function (e) {
    if (e.defaultPrevented) {
      return
    }
    var ref = getPos$1(e);
    var x = ref.x;
    var y = ref.y;
    touch.x2 = x;
    touch.y2 = y;
  });
  on(document, pointerUp, function (ref) {
    var type = ref.type;
    var target = ref.target;
    if (touch.type !== getType(type)) {
      return
    }
    if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {
      swipeTimeout = setTimeout(function () {
        if (touch.el) {
          trigger(touch.el, 'swipe');
          trigger(touch.el, ("swipe" + (swipeDirection(touch))));
        }
        touch = {};
      });
    } else if ('last' in touch) {
      tapTimeout = setTimeout(function () { return trigger(touch.el, 'tap'); });
      if (touch.el && type !== 'mouseup' && within(target, touch.el)) {
        clickTimeout = setTimeout(function () {
          clickTimeout = null;
          if (touch.el && !clicked) {
            trigger(touch.el, 'click');
          }
          touch = {};
        }, 350);
      }
    } else {
      touch = {};
    }
  });
  on(document, 'touchcancel', cancelAll);
  on(window, 'scroll', cancelAll);
});
var touching = false;
if (typeof document !== 'undefined') {
  on(document, 'touchstart', function () { return touching = true; }, true);
  on(document, 'click', function () { touching = false; });
  on(document, 'touchcancel', function () { return touching = false; }, true);
}
function isTouch (e) {
  return touching || e.pointerType === 'touch'
}
function getPos$1 (e) {
  var touches = e.touches;
  var changedTouches = e.changedTouches;
  var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
  var x = ref.pageX;
  var y = ref.pageY;
  return {x: x, y: y}
}
function getType (type) {
  return type.slice(0, 5)
}

var active;
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  on(window, 'resize', function (ref) {
    var defaultPrevented = ref.defaultPrevented;
    var justified = active && /justify/.test(active.position);
    if (!defaultPrevented && justified) {
      active.$forceUpdate();
    }
  });
  on(document.documentElement, 'click', function (ref) {
    var target = ref.target;
    var defaultPrevented = ref.defaultPrevented;
    if (defaultPrevented || !active) {
      return
    }
    var clickedInside = function (drop) { return within(target, drop.$el); };
    var clickedTarget = function (drop) { return within(target, drop.$refs.target); };
    while (active && !clickedInside(active) && !clickedTarget(active)) {
      var parent = findParent(active);
      active._hide();
      active = parent;
    }
  });
}
var toggle = {
  data: function () { return ({
    shown: false
  }); },
  methods: {
    show: function show () {
      this.clearTimers();
      this.showTimer = setTimeout(this._show, this.delayShow);
    },
    _show: function _show () {
      while (active && !this.isChildOf(active) && !this.isParentOf(active)) {
        var parent = findParent(active);
        active._hide();
        active = parent;
      }
      this.shown = true;
      this.tracker.init();
      active = this;
      this.$emit(SHOW);
    },
    hide: function hide () {
      var hoverIdle = 200;
      this.clearTimers();
      this.isDelaying = this.tracker.movesTo(this.$el);
      if (this.isDelaying) {
        this.hideTimer = setTimeout(this.hide, hoverIdle);
      } else {
        this.hideTimer = setTimeout(this._hide, this.delayHide);
      }
    },
    _hide: function _hide () {
      this.shown = false;
      this.tracker.cancel();
      if (active === this) {
        var parent = findParent(active);
        active = parent || null;
      }
      this.$emit(HIDE);
    },
    clearTimers: function clearTimers () {
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      this.showTimer = null;
      this.hideTimer = null;
    },
    toggle: function toggle () {
      this.shown ? this._hide() : this.show();
    }
  },
  mounted: function mounted () {
    var this$1 = this;
    var ref = this;
    var on$$1 = ref.on;
    var show = ref.show;
    var hide = ref.hide;
    var toggle = ref.toggle;
    var mode = ref.mode;
    var clearTimers = ref.clearTimers;
    this.$nextTick(function () {
      if (/click/.test(mode) || hasTouch) {
        on$$1(this$1.$refs.target, 'click', toggle);
      }
      if (/hover/.test(mode)) {
        on$$1(this$1.$refs.target, pointerEnter, function (e) {
          if (isTouch(e)) {
            return
          }
          e.preventDefault();
          show();
        });
        on$$1(this$1.$refs.target, pointerLeave, function (e) {
          if (isTouch(e)) {
            return
          }
          e.preventDefault();
          hide();
        });
        on$$1(this$1.$el, pointerLeave, hide);
        on$$1(this$1.$el, pointerEnter, clearTimers);
      }
    });
  }
}

var Drop = {
  name: 'VkDrop',
  mixins: [render, toggle, EventsMixin],
  directives: {
    VkRoot: VkRoot,
    VkPosition: Directive
  },
  props: props$1,
  methods: {
    isParentOf: function isParentOf (instance) {
      var parents = findParents(instance);
      return includes(parents, this)
    },
    isChildOf: function isChildOf (instance) {
      var parents = findParents(this);
      return includes(parents, instance)
    },
    queryElement: function queryElement (el) {
      return isNode(el)
        ? el
        : isString(el)
          ? (get(this.$vnode.context.$refs, el) || $(el, this.$el))
          : el
    }
  },
  created: function created () {
    this.tracker = new MouseTracker();
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}

var Dropdown = {
  name: 'VkDropdown',
  extends: Drop,
  props: {
    mainClass: {
      default: 'uk-dropdown'
    }
  }
}

var ElementGrid = {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    divided: {
      type: Boolean,
      default: false
    },
    matched: {
      type: Boolean,
      default: false
    },
    gutter: {
      type: String,
      validator: function (val) { return !val || /^(small|medium|large|collapse)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var tag = props.tag;
    var gutter = props.gutter;
    var divided = props.divided;
    var matched = props.matched;
    return h(tag, mergeData(data, {
      class: ['uk-grid', ( obj = {
        'uk-grid-match': matched,
        'uk-grid-divider': divided
      }, obj[("uk-grid-" + gutter)] = gutter, obj)]
    }), children)
  }
}

var NAMESPACE = '__vkMargin';
var VkMargin = {
  bind: function bind$$1 (el, binding, vnode) {
    el[NAMESPACE] = {};
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update(el, { binding: binding, vnode: vnode }); }
    );
    el[NAMESPACE].unbind = on(window, 'resize', function () { return update(el, { binding: binding, vnode: vnode }); }
    );
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update(el, { binding: binding, vnode: vnode }); }
    );
  },
  unbind: function unbind (el) {
    if (!el[NAMESPACE]) {
      return
    }
    el[NAMESPACE].unbind();
    delete el[NAMESPACE];
  }
}
function update (el, ctx) {
  var opts = getOptions$1(ctx);
  var items = el.children;
  if (!items.length || !isVisible(el)) {
    return
  }
  var data = getRows(items);
  data.rows.forEach(function (row, i) { return row.forEach(function (el, j) {
      toggleClass(el, opts.margin, i !== 0);
      toggleClass(el, opts.firstColumn, j === 0);
    }); }
  );
  opts.onUpdate(el, data);
}
function getOptions$1 (ctx) {
  var ref = ctx.binding;
  var value = ref.value;
  if ("development" !== 'production' && value && !isObject(value)) {
    warn('v-vk-magin -> Object expected as configuration', ctx.vnode.context);
  }
  var options = assign({
    onUpdate: noop,
    margin: 'uk-margin-small-top',
    firstColumn: 'uk-first-column'
  }, value);
  return options
}
function getRows (items) {
  var data = {};
  var rows = [[]];
  data.stacks = true;
  for (var i = 0; i < items.length; i++) {
    var el = items[i];
    var dim = el.getBoundingClientRect();
    if (!dim.height) {
      continue
    }
    for (var j = rows.length - 1; j >= 0; j--) {
      var row = rows[j];
      if (!row[0]) {
        row.push(el);
        break
      }
      var leftDim = row[0].getBoundingClientRect();
      if (dim.top >= Math.floor(leftDim.bottom)) {
        rows.push([el]);
        break
      }
      if (Math.floor(dim.bottom) > leftDim.top) {
        data.stacks = false;
        if (dim.left < leftDim.left && !isRtl) {
          row.unshift(el);
          break
        }
        row.push(el);
        break
      }
      if (j === 0) {
        rows.unshift([el]);
        break
      }
    }
  }
  data.rows = rows;
  return data
}

var Grid = {
  name: 'VkGrid',
  directives: { VkMargin: VkMargin },
  props: assign({}, ElementGrid.props, {
    margin: {
      type: String,
      default: 'uk-grid-margin'
    },
    firstColumn: {
      type: String,
      default: 'uk-first-column'
    }
  }),
  render: function render (h) {
    var clsStack = 'uk-grid-stack';
    var ref = this;
    var margin = ref.margin;
    var firstColumn = ref.firstColumn;
    return h(ElementGrid, {
      props: this.$props,
      directives: [{
        name: 'vk-margin',
        value: {
          margin: margin,
          firstColumn: firstColumn,
          onUpdate: function (el, ref) {
            var stacks = ref.stacks;
            toggleClass(el, clsStack, stacks);
          }
        }
      }]
    }, this.$slots.default)
  }
}

var core = {
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    ratio: {
      type: [Number, String],
      default: 1
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var icon = props.icon;
    var ratio = props.ratio;
    var ref$1 = data.attrs || {};
    var width = ref$1.width;
    var height = ref$1.height;
    var viewBox = ref$1.viewBox;
    var Icon = h(("vk-icons-" + icon), {
      attrs: { width: width, height: height, viewBox: viewBox }
    });
    if (ratio !== 1) {
      Icon.data.attrs.width *= ratio;
      Icon.data.attrs.height *= ratio;
      Icon.data.attrs.ratio = ratio;
    }
    return Icon
  }
}

var ElementIcon = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('span', mergeData(data, {
      class: 'uk-icon'
    }), children);
}
}

var ElementIconLink = {
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var reset = props.reset;
    return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': reset
      }]
    }), children)
  }
}

var ElementIconButton = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('a', mergeData(data, {
      class: 'uk-icon uk-icon-button'
    }), children)
  }
}

var ElementIconImage = {
  functional: true,
  props: {
    src: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var src = props.src;
    return h('span', mergeData(data, {
      class: 'uk-icon uk-icon-image',
      style: {
        'background-image': ("url(" + src + ")")
      }
    }))
  }
}

var icon = {
  name: 'VkIcon',
  functional: true,
  props: core.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementIcon, data, [
      h(core, mergeData(data, { props: props }))
    ])
  }
}

var iconLink = {
  name: 'VkIconLink',
  functional: true,
  props: assign({}, core.props, ElementIconLink.props),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var def = mergeData(data, { props: props });
    return h(ElementIconLink, def, [ h(core, def) ])
  }
}

var iconButton = {
  name: 'VkIconButton',
  functional: true,
  props: core.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementIconButton, data, [
      h(core, mergeData(data, { props: props }))
    ])
  }
}

var iconImage = {
  name: 'VkIconImage',
  functional: true,
  props: ElementIconImage.props,
  render: ElementIconImage.render
}

var ElementIconnav = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('ul', mergeData(data, {
      class: 'uk-iconnav'
    }), children)
  }
}

var ElementIconnavVertical = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('ul', mergeData(data, {
      class: 'uk-iconnav uk-iconnav-vertical'
    }), children)
  }
}

var ElementIconnavItem = {
  functional: true,
  props: {
    href: String,
    target: String,
    active: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var active = props.active;
    var href = props.href;
    var target = props.target;
    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h(ElementIconLink, {
        attrs: { href: href, target: target }
      }, children)
    ])
  }
}

var iconnav = {
  name: 'VkIconnav',
  functional: true,
  render: ElementIconnav.render
}

var iconnavVertical = {
  name: 'VkIconnavVertical',
  functional: true,
  render: ElementIconnavVertical.render
}

var iconnav_Item = {
  name: 'VkIconnavItem',
  functional: true,
  props: assign({
    icon: {
      type: String,
      required: true
    }
  }, ElementIconnavItem.props),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementIconnavItem, mergeData(data, { props: props }), [
      h(("vk-icons-" + (props.icon)))
    ])
  }
}

var ElementLabel = {
  functional: true,
  props: {
    type: {
      type: String,
      validator: function (val) { return !val || /^(success|warning|danger)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var obj;
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var type = props.type;
    return h('span', mergeData(data, {
      class: ['uk-label', ( obj = {}, obj[("uk-label-" + type)] = type, obj)]
    }), children)
  }
}

var label = {
  name: 'VkLabel',
  functional: true,
  props: ElementLabel.props,
  render: ElementLabel.render
}

var SHOWN = 'shown';
var HIDDEN = 'hidden';
var TOGGLE = 'update:show';
var KEYUP = 'keyup';

var doc$2 = typeof document !== 'undefined' && document.documentElement;
var active$1;
var activeModals;
var Transition$2 = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var modal = ref.parent;
    var def = {
      props: {
        css: false,
        appear: true
      },
      on: {
        beforeEnter: function beforeEnter () {
          addClass(doc$2, 'uk-modal-page');
        },
        enter: function enter (el, done) {
          var prev = active$1 !== modal && active$1;
          if (prev && !modal.stack) {
            prev.hide();
            once(prev.$el, 'transitionend', function () { return doEnter(el, done); }, false, function (e) { return e.target === prev.$el; });
            return
          }
          setTimeout(function () { return doEnter(el, done); }, 0);
        },
        afterEnter: function afterEnter (el) {
          activeModals++;
          active$1 = modal;
          active$1.$emit(SHOWN);
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
        },
        leave: function leave (el, done) {
          once(el, 'transitionend', done, false, function (e) { return e.target === el; });
        },
        afterLeave: function afterLeave (el) {
          activeModals--;
          if (!activeModals) {
            removeClass(doc$2, 'uk-modal-page');
          }
          if (active$1 === modal) {
            active$1 = null;
          }
          modal.$emit(HIDDEN);
        }
      }
    };
    function doEnter (el, done) {
      modal.$root.$el.appendChild(el);
      el.offsetWidth;
      once(el, 'transitionend', done, false, function (e) { return e.target === el; });
      addClass(el, 'uk-open');
    }
    return h('transition', def, children)
  }
}
on(doc$2, 'click', function (e) {
  if (!active$1) {
    return
  }
  var clickedOut = e.target === active$1.$el;
  if (clickedOut && !active$1.stuck) {
    active$1.$emit(TOGGLE, false);
  }
});
on(doc$2, 'keyup', function (e) {
  active$1 && active$1.$emit(KEYUP, e);
});

var doc$3 = typeof document !== 'undefined' && document.documentElement;
var core$1 = {
  mixins: [EventsMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide: function hide () {
      this.$emit(TOGGLE, false);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (!activeModals) {
      removeClass(doc$3, 'uk-modal-page');
    }
  }
}

var VkModalOverflowAuto = {
  bind: function bind (el, binding) {
    el.vkModalOverflowAutoOff = on(window, 'resize', function () { return update$1(el, binding); });
    addClass(el, 'uk-overflow-auto');
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update$1(el, binding); });
  },
  componentUpdated: function componentUpdated (el, binding) {
    update$1(el, binding);
  },
  unbind: function unbind (el) {
    el.vkModalOverflowAutoOff();
  }
}
function update$1 (el, binding) {
  var modal = closest(el, '.uk-modal');
  var panel = closest(el, '.uk-modal-dialog');
  if (!panel || !modal) {
    return
  }
  var current = css(el, 'maxHeight');
  css(el, 'maxHeight', 150);
  css(el, 'maxHeight', Math.max(150, 150 + height(modal) - panel.offsetHeight));
  if (current !== css(el, 'maxHeight')) {
    update$1(el, binding);
  }
}

var ElementModal = {
  functional: true,
  props: {
    expand: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;
    var expand = props.expand;
    return h('div', mergeData(data, {
      class: ['uk-modal', {
        'uk-modal-container': expand
      }],
      style: {
        display: 'block'
      }
    }), children)
  }
}

var ElementModalFull = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;
    return h('div', mergeData(data, {
      class: 'uk-modal uk-modal-full',
      style: {
        display: 'block'
      }
    }), children)
  }
}

var IconClose = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var width = props.width || 14;
    var height = props.height || 14;
    var viewBox = props.viewBox || '0 0 14 14';
    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
      }
    })
  }
}

var IconCloseLarge = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.4" d="M1 1l18 18M19 1L1 19"/>'
      }
    })
  }
}

var ElementModalClose = {
  functional: true,
  props: {
    large: {
      type: Boolean,
      default: false
    },
    outside: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var obj;
    var data = ref.data;
    var props = ref.props;
    var large = props.large;
    var outside = props.outside;
    var def = {
      class: ['uk-close uk-icon', ( obj = {
        'uk-close-large': large
      }, obj["uk-modal-close-outside"] = outside, obj["uk-modal-close-default"] = !outside, obj)],
      attrs: {
        type: 'button'
      }
    };
    return h('button', mergeData(data, def), [
      h(large ? IconCloseLarge : IconClose)
    ])
  }
}

var ElementModalFullClose = {
  functional: true,
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var large = props.large;
    var def = {
      class: ['uk-close uk-icon uk-modal-close-full', {
        'uk-close-large': large
      }],
      attrs: {
        type: 'button'
      }
    };
    return h('button', mergeData(data, def), [
      h(large ? IconCloseLarge : IconClose)
    ])
  }
}

var ElementModalTitle = {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'h2'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var tag = props.tag;
    return h(tag, mergeData(data, {
      class: 'uk-modal-title'
    }), children)
  }
}

var ElementModalBody = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-modal-body'
    }), children)
  }
}

var ElementModalDialog = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-modal-dialog'
    }), children)
  }
}

var ElementModalFooter = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-modal-footer'
    }), children)
  }
}

var ElementModalHeader = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-modal-header'
    }), children)
  }
}

var modal = {
  name: 'VkModal',
  extends: core$1,
  directives: {
    VkModalOverflowAuto: VkModalOverflowAuto
  },
  props: {
    stuck: {
      type: Boolean,
      default: false
    },
    overflowAuto: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    stack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    widthClasses: function widthClasses () {
      return this.size
        ? this.size.split(' ').map(function (size) { return ("uk-width-" + size); })
        : ''
    }
  },
  render: function render (h) {
    var this$1 = this;
    var def = {
      class: {
        'uk-flex uk-flex-top': this.center
      },
      style: {
        display: this.center ? 'flex' : 'block'
      },
      props: {
        expand: this.size === 'container'
      },
      directives: [{
        name: 'show',
        value: this.show
      }],
      on: {
      }
    };
    Object.keys(this.$slots).forEach(function (slot) { return each(this$1.$slots[slot], function (node) {
      if (node.fnOptions && node.fnOptions.name === 'VkModalClose') {
        assign(node.data, {
          on: assign({ click: function (e) { return this$1.$emit(TOGGLE, false); } }, node.data.on || {})
        });
      }
    }); });
    var modal = h(ElementModal, def, [
      h(ElementModalDialog, {
        class: [this.widthClasses, {
          'uk-margin-auto-vertical': this.center
        }]
      }, [
        this.$slots.dialog && this.$slots.dialog,
        this.$slots.header && h(ElementModalHeader, this.$slots.header),
        this.$slots.default && h(ElementModalBody, {
          directives: this.overflowAuto
            ? [{ name: 'vk-modal-overflow-auto' }]
            : []
        }, this.$slots.default),
        this.$slots.footer && h(ElementModalFooter, this.$slots.footer)
      ])
    ]);
    return h(Transition$2, [ modal ])
  }
}

var NAMESPACE$1 = '__vkHeightViewport';
var VkHeightViewport = {
  bind: function bind$$1 (el, binding, vnode) {
    el[NAMESPACE$1] = {};
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update$2(el, { binding: binding, vnode: vnode }); }
    );
    el[NAMESPACE$1].unbind = on(window, 'resize', function () { return update$2(el, { binding: binding, vnode: vnode }); }
    );
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update$2(el, { binding: binding, vnode: vnode }); }
    );
  },
  unbind: function unbind (el) {
    if (!el[NAMESPACE$1]) {
      return
    }
    el[NAMESPACE$1].unbind();
    delete el[NAMESPACE$1];
  }
}
function getOptions$2 (ctx) {
  var ref = ctx.binding;
  var value = ref.value;
  var modifiers = ref.modifiers;
  if ("development" !== 'production' && value && !isObject(value)) {
    warn('v-vk-height-viewport -> Object expected as configuration', ctx.vnode.context);
  }
  var options = assign({
    minHeight: 0,
    expand: false,
    offsetTop: false,
    offsetBottom: false
  }, modifiers, value);
  return options
}
function update$2 (el, ctx) {
  var opts = getOptions$2(ctx);
  css(el, 'boxSizing', 'border-box');
  var viewport = height(window);
  var minHeight;
  var offsetTop = 0;
  if (opts.expand) {
    css(el, {height: '', minHeight: ''});
    var diff = viewport - offsetHeight(document.documentElement);
    if (diff > 0) {
      minHeight = offsetHeight(el) + diff;
    }
  } else {
    var ref = offset(el);
    var top = ref.top;
    if (top < viewport / 2 && opts.offsetTop) {
      offsetTop += top;
    }
    if (opts.offsetBottom === true) {
      offsetTop += offsetHeight(el.nextElementSibling);
    } else if (isNumeric(opts.offsetBottom)) {
      offsetTop += (viewport / 100) * opts.offsetBottom;
    } else if (opts.offsetBottom && endsWith(opts.offsetBottom, 'px')) {
      offsetTop += toFloat(opts.offsetBottom);
    } else if (isString(opts.offsetBottom)) {
      offsetTop += offsetHeight(query(opts.offsetBottom, el));
    }
    minHeight = offsetTop ? ("calc(100vh - " + offsetTop + "px)") : '100vh';
  }
  if (!minHeight) {
    return
  }
  css(el, { height: '', minHeight: minHeight });
  var elHeight = el.offsetHeight;
  if (opts.minHeight && opts.minHeight > elHeight) {
    css(el, 'minHeight', opts.minHeight);
  }
  if (viewport - offsetTop >= elHeight) {
    css(el, 'height', minHeight);
  }
}
function offsetHeight (el) {
  return el && (el.offsetHeight || 0)
}

var modalFull = {
  name: 'VkModalFull',
  extends: core$1,
  directives: {
    VkHeightViewport: VkHeightViewport
  },
  render: function render (h) {
    var this$1 = this;
    var def = {
      props: {
        expand: 'full'
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    };
    Object.keys(this.$slots).forEach(function (slot) { return each(this$1.$slots[slot], function (node) {
      if (node.fnOptions && node.fnOptions.name === 'VkModalFullClose') {
        assign(node.data, {
          on: assign({ click: function (e) { return this$1.$emit(TOGGLE, false); } }, node.data.on || {})
        });
      }
    }); });
    var modal = h(ElementModalFull, def, [
      h(ElementModalDialog, {
        directives: [{
          name: 'vk-height-viewport'
        }]
      }, this.$slots.default)
    ]);
    return h(Transition$2, [ modal ])
  }
}

var modal_Close = {
  name: 'VkModalClose',
  functional: true,
  props: ElementModalClose.props,
  render: ElementModalClose.render
}

var modalFull_Close = {
  name: 'VkModalFullClose',
  functional: true,
  props: ElementModalFullClose.props,
  render: ElementModalFullClose.render
}

var modal_Title = {
  name: 'VkModalTitle',
  functional: true,
  props: ElementModalTitle.props,
  render: ElementModalTitle.render
}

var ElementNav = {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: function (val) { return /^(default|primary|blank)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var center = props.center;
    var type = props.type;
    return h('ul', mergeData(data, {
      class: ['uk-nav', ( obj = {
        'uk-nav-center': center
      }, obj[("uk-nav-" + type)] = type, obj)]
    }), children)
  }
}

var ElementNavDropdown = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('ul', mergeData(data, {
      class: 'uk-nav uk-dropdown-nav'
    }), children)
  }
}

var ElementNavItem = {
  functional: true,
  props: {
    icon: {},
    href: String,
    target: String,
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var icon$$1 = props.icon;
    var title = props.title;
    var href = props.href;
    var target = props.target;
    var content = title;
    if (icon$$1) {
      content = [
        h(ElementIcon, {
          class: 'uk-margin-small-right'
        }, [ icon$$1 ]),
        h('span', {
          class: 'uk-text-middle'
        }, title)
      ];
    }
    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href: href, target: target }
      }, content)
    ])
  }
}

var ElementNavItemDivider = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    return h('li', mergeData(data, {
      class: 'uk-nav-divider'
    }))
  }
}

var ElementNavItemHeader = {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h('li', mergeData(data, {
      class: 'uk-nav-header'
    }), props.title)
  }
}

var ElementNavItemParent = {
  functional: true,
  props: {
    href: String,
    target: String,
    title: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var title = props.title;
    var href = props.href;
    var target = props.target;
    return h('li', mergeData(data, {
      class: 'uk-parent'
    }), [
      h('a', {
        attrs: { href: href, target: target }
      }, [ title ]),
      h('ul', {
        class: 'uk-nav-sub'
      }, children)
    ])
  }
}

var nav$1 = {
  name: 'VkNav',
  functional: true,
  props: ElementNav.props,
  render: ElementNav.render
}

var navDropdown = {
  name: 'VkNavDropdown',
  functional: true,
  render: ElementNavDropdown.render
}

var nav_Item = {
  name: 'VkNavItem',
  functional: true,
  props: assign({}, ElementNavItem.props, {
    icon: {
      type: String
    }
  }),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    props.icon = props.icon && h(("vk-icons-" + (props.icon)));
    return h(ElementNavItem, mergeData(data, { props: props }))
  }
}

var nav_ItemDivider = {
  name: 'VkNavItemDivider',
  functional: true,
  render: ElementNavItemDivider.render
}

var nav_ItemHeader = {
  name: 'VkNavItemHeader',
  functional: true,
  props: ElementNavItemHeader.props,
  render: ElementNavItemHeader.render
}

var nav_ItemParent = {
  name: 'VkNavItemParent',
  functional: true,
  props: ElementNavItemParent.props,
  render: ElementNavItemParent.render
}

var ElementNavbarNavigation = {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: function (val) { return /^(left|center(-left|-right)?|right)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var align = props.align;
    var wrapContent = /center-(left|right)/.test(align);
    return h('div', mergeData(data, {
      class: ("uk-navbar-" + align)
    }), [
      wrapContent
        ? h('div', children)
        : children
    ])
  }
}

function renderSlots (h, slots) {
  return [
    (slots.left || slots.default) && h(ElementNavbarNavigation, [
      slots.left, slots.default
    ]),
    (slots.center || slots['center-left'] || slots['center-right']) && h(ElementNavbarNavigation, {
      props: { align: 'center' }
    }, [
      slots['center-left'] && h(ElementNavbarNavigation, {
        props: { align: 'center-left' }
      }, slots['center-left']),
      slots.center && slots.center,
      slots['center-right'] && h(ElementNavbarNavigation, {
        props: { align: 'center-right' }
      }, slots['center-right'])
    ]),
    slots.right && h(ElementNavbarNavigation, {
      props: { align: 'right' }
    }, slots.right)
  ]
}

var ElementNavbar = {
  functional: true,
  props: {
    container: {
      type: Boolean,
      default: true
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var slots = ref.slots;
    var container = props.container;
    var transparent = props.transparent;
    return h('nav', mergeData(data, {
      class: ['uk-navbar', {
        'uk-navbar-container': container && !transparent,
        'uk-navbar-transparent': transparent
      }]
    }), renderSlots(h, slots()))
  }
}

var ElementNavbarFull = {
  functional: true,
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var slots = ref.slots;
    var expanded = props.expanded;
    var transparent = props.transparent;
    return h('nav', mergeData(data, {
      class: ['uk-navbar-container', {
        'uk-navbar-transparent': transparent
      }]
    }), [
      h('div', {
        class: ['uk-container', {
          'uk-container-expand': expanded
        }]
      }, [
        h('div', {
          class: 'uk-navbar'
        }, renderSlots(h, slots()))
      ])
    ])
  }
}

var ElementNavbarDropbar = {
  functional: true,
  props: {
    slide: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var slide = props.slide;
    return h('div', mergeData(data, {
      class: ['uk-navbar-dropbar', {
        'uk-navbar-dropbar-slide': slide
      }]
    }))
  }
}

var ElementNavbarItem = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-navbar-item'
    }), children)
  }
}

var ElementNavbarLogo = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('span', mergeData(data, {
      class: 'uk-navbar-item uk-logo'
    }), children)
  }
}

var IconToggle = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path d="M0 9h20v2H0zM0 3h20v2H0zM0 15h20v2H0z"/>'
      }
    })
  }
}

var ElementNavbarToggle = {
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var icon$$1 = props.icon;
    var title = props.title;
    var Icon = icon$$1 && h(ElementIcon, {
      class: 'uk-navbar-toggle-icon'
    }, [ h(IconToggle) ]);
    return h('a', mergeData(data, {
      class: 'uk-navbar-toggle'
    }), [
      Icon,
      title && h('span', {
        class: 'uk-margin-small-left'
      }, title)
    ])
  }
}

var ElementNavbarNav = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('ul', mergeData(data, {
      class: 'uk-navbar-nav'
    }), children)
  }
}

var ElementNavbarNavItem = {
  functional: true,
  props: {
    icon: {},
    href: String,
    target: String,
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var active = props.active;
    var title = props.title;
    var subtitle = props.subtitle;
    var icon$$1 = props.icon;
    var href = props.href;
    var target = props.target;
    var Icon = icon$$1 && h(ElementIcon, {
      class: 'uk-margin-small-right'
    }, [ icon$$1 ]);
    var Subtitle = subtitle && h('div', [ title, h('div', {
      class: 'uk-navbar-subtitle'
    }, subtitle) ]);
    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href: href, target: target }
      }, [
        Icon,
        Subtitle || title
      ]),
      children
    ])
  }
}

var ElementNavbarNavDropdownNav = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('ul', mergeData(data, {
      class: 'uk-nav uk-navbar-dropdown-nav'
    }), children)
  }
}

var navbar = {
  name: 'VkNavbar',
  functional: true,
  props: ElementNavbar.props,
  render: ElementNavbar.render
}

var navbarFull = {
  name: 'VkNavbarFull',
  functional: true,
  props: ElementNavbarFull.props,
  render: ElementNavbarFull.render
}

var SHOW$1 = SHOW;
var HIDE$1 = HIDE;
var navbarDropbar = {
  name: 'VkNavbarDropbar',
  props: {
    mode: {
      type: String,
      default: 'slide',
      validator: function (val) { return /^(slide|push)$/.test(val); }
    },
    duration: {
      type: Number,
      default: 200
    }
  },
  methods: {
    transitionDropbar: function transitionDropbar (dropdownEl) {
      var el = dropdownEl;
      var marginTop = toFloat(css(el, 'margin-top'));
      var marginBottom = toFloat(css(el, 'margin-bottom'));
      var height$$1 = el.offsetHeight + marginTop + marginBottom;
      this.transitionTo(height$$1, el);
    },
    transitionTo: function transitionTo (newHeight, el) {
      var dropbar = this.$refs.dropbar;
      var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;
      el = oldHeight < newHeight && el;
      css(el, { height: oldHeight, overflow: 'hidden' });
      height(dropbar, oldHeight);
      Transition.cancel([el, dropbar]);
      return Transition
        .start([el, dropbar], { height: newHeight }, this.duration)
        .catch(noop)
        .finally(function () { return css(el, { height: '', overflow: '' }); })
    }
  },
  mounted: function mounted () {
    var this$1 = this;
    var dropdowns = get(this, '$children', [])
      .filter(function (child) { return /NavbarNavDropdown/.test(child.$options.name); })
      .map(function (c) { return c.$children[0]; });
    dropdowns.forEach(function (drop) {
      drop.$vnode.data.class['uk-navbar-dropdown-dropbar'] = true;
      drop.$on(SHOW$1, function () {
        this$1.$nextTick(function () {
          this$1.transitionDropbar(drop.$el);
        });
      });
      drop.$on(HIDE$1, function () {
        this$1.$nextTick(function () {
          var thereAreActiveDrops = active && within(active.$el, this$1.$el);
          if (!thereAreActiveDrops) {
            this$1.transitionDropbar(drop.$el);
          }
        });
      });
    });
  },
  render: function render (h) {
    return h('div', {
      class: 'uk-position-relative'
    }, [
      this.$slots.default,
      h(ElementNavbarDropbar, {
        ref: 'dropbar',
        props: {
          slide: this.mode === 'slide'
        }
      })
    ])
  }
}

var navbar_Item = {
  name: 'VkNavbarItem',
  functional: true,
  render: ElementNavbarItem.render
}

var navbar_Logo = {
  name: 'VkNavbarLogo',
  functional: true,
  render: ElementNavbarLogo.render
}

var navbar_Toggle = {
  name: 'VkNavbarToggle',
  functional: true,
  props: ElementNavbarToggle.props,
  render: ElementNavbarToggle.render
}

var navbar_Nav = {
  name: 'VkNavbarNav',
  functional: true,
  render: ElementNavbarNav.render
}

var navbar_Nav_Item = {
  name: 'VkNavbarNavItem',
  functional: true,
  props: assign({}, ElementNavbarNavItem.props, {
    icon: {
      type: String
    }
  }),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    props.icon = props.icon && h(("vk-icons-" + (props.icon)));
    return h(ElementNavbarNavItem, mergeData(data, { props: props }))
  }
}

var SHOW$2 = SHOW;
var navbar_Nav_Dropdown = {
  name: 'VkNavbarNavDropdown',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    justified: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: isRtl ? 'right' : 'left',
      validator: function (val) { return /^(left|center|right)$/.test(val); }
    },
    navbarAligned: {
      type: Boolean,
      default: false
    },
    mode: Drop.props.mode,
    offset: Drop.props.offset,
    animation: Drop.props.animation,
    duration: Drop.props.duration,
    delayShow: Drop.props.delayShow,
    delayHide: Drop.props.delayHide
  },
  computed: {
    navbar: function navbar () {
      return query('!.uk-navbar', this.$el)
    },
    dropbar: function dropbar () {
      return /NavbarDropbar/.test(get(this, '$parent.$options.name', ''))
        ? this.$parent
        : false
    }
  },
  mounted: function mounted () {
    var ref = this;
    var mode = ref.mode;
    var ref$1 = this.$refs.drop;
    var on = ref$1.on;
    var toggle = ref$1.toggle;
    var show = ref$1.show;
    var hide = ref$1.hide;
    var target = this.$refs.drop.$refs.target;
    if (/click/.test(mode) || hasTouch) {
      on(target, 'click', toggle);
    }
    if (/hover/.test(mode)) {
      on(target, pointerEnter, function (e) {
        if (isTouch(e)) {
          return
        }
        e.preventDefault();
        show();
      });
      on(this.dropbar ? this.dropbar.$el : target, pointerLeave, function (e) {
        if (isTouch(e)) {
          return
        }
        e.preventDefault();
        hide();
      });
    }
  },
  render: function render (h) {
    var this$1 = this;
    var obj, obj$1, obj$2;
    var ref = this;
    var title = ref.title;
    var justified = ref.justified;
    var mode = ref.mode;
    var align = ref.align;
    var navbarAligned = ref.navbarAligned;
    var subtitle = ref.subtitle;
    var defaultSlots = this.$slots.default || [];
    var childrenNodes = defaultSlots.filter(function (n) { return n.tag; });
    var colCount = childrenNodes.length;
    var Subtitle = subtitle && h('div', [ title, h('div', {
      class: 'uk-navbar-subtitle'
    }, subtitle) ]);
    return h('li', [
      h('a', [Subtitle || title]),
      h(Drop, {
        on: ( obj = {}, obj[SHOW$2] = function (e) {
            this$1.$forceUpdate();
          }, obj),
        nativeOn: ( obj$1 = {}, obj$1[pointerEnter] = function (e) {
            this$1.$refs.drop.clearTimers();
            if (/hover/.test(mode)) {
              this$1.$refs.drop.show();
            }
          }, obj$1[pointerLeave] = function (e) {
            if (!this$1.dropbar && /hover/.test(mode)) {
              this$1.$refs.drop.hide();
            }
          }, obj$1),
        ref: 'drop',
        class: ( obj$2 = {
          'uk-navbar-dropdown-dropbar': Boolean(this.dropbar),
          'uk-navbar-dropdown-boundary': justified || navbarAligned
        }, obj$2[("uk-navbar-dropdown-width-" + colCount)] = colCount > 1 && !justified, obj$2),
        props: assign({}, this.$props, {
          mode: '',
          position: justified
            ? 'bottom-justify'
            : ("bottom-" + align),
          mainClass: 'uk-navbar-dropdown',
          flip: justified ? 'x' : undefined,
          boundary: '!nav',
          boundaryAlign: justified || navbarAligned
        })
      }, [
        colCount >= 2
          ? h(Grid, {
            class: [
              'uk-navbar-dropdown-grid',
              ("uk-child-width-1-" + colCount + (colCount > 2 ? '@m' : ''))
            ]
          }, childrenNodes.map(function (child) { return h('div', [ child ]); }
          ))
          : defaultSlots
      ])
    ])
  }
}

var navbar_Nav_Dropdown_Nav = {
  name: 'VkNavbarNavDropdownNav',
  functional: true,
  render: ElementNavbarNavDropdownNav.render
}

var NAMESPACE$2 = '__vkNotification';
var MessageDirective = {
  inserted: function inserted (el, binding, vnode) {
    el[NAMESPACE$2] = {};
    var close = function () { return doClose(el, vnode); };
    var opts = el[NAMESPACE$2].options = binding.value;
    if (opts.timeout) {
      el[NAMESPACE$2].timer = setTimeout(close, opts.timeout);
    }
    on(el, 'click', close);
    on(el, pointerEnter, function () {
      if (el[NAMESPACE$2].timer) {
        clearTimeout(el[NAMESPACE$2].timer);
      }
    });
    on(el, pointerLeave, function () {
      if (opts.timeout) {
        el[NAMESPACE$2].timer = setTimeout(close, opts.timeout);
      }
    });
  },
  unbind: function unbind (el) {
    if (!el[NAMESPACE$2]) {
      return
    }
    clearTimeout(el[NAMESPACE$2].timer);
    delete el[NAMESPACE$2];
  }
}
function doClose (el, vnode) {
  clearTimeout(el[NAMESPACE$2].timer);
  trigger(el, 'close');
}

var MessageTransition = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var parent = ref.parent;
    var def = {
      props: {
        css: false,
        appear: true,
        tag: 'div'
      },
      on: {
        enter: function enter (el, done) {
          var marginBottom = toFloat(css(el, 'marginBottom'));
          css(el, { opacity: 0, marginTop: -el.offsetHeight, marginBottom: 0 });
          Transition.start(el, {
            opacity: 1,
            marginTop: 0,
            marginBottom: marginBottom
          }).then(done);
        },
        leave: function leave (el, done) {
          Transition.start(el, {
            opacity: 0,
            marginTop: -el.offsetHeight,
            marginBottom: 0
          }).then(done);
        }
      }
    };
    return h('transition-group', mergeData(data, def), children)
  }
}

var ElementNotification = {
  functional: true,
  props: {
    position: {
      type: String,
      default: 'top-center',
      validator: function (val) { return /^(top|bottom)-(left|center|right)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var position = props.position;
    return h('div', mergeData(data, {
      class: [
        'uk-notification',
        ("uk-notification-" + position)
      ]
    }), children)
  }
}

var ElementNotificationClose = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    return h(ElementIconLink, mergeData(data, {
      class: 'uk-notification-close uk-close'
    }), [
      h(IconClose)
    ])
  }
}

var ElementNotificationMessage = {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: function (val) { return !val || /^(primary|success|warning|danger)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var status = props.status;
    return h('div', mergeData(data, {
      class: ['uk-notification-message', ( obj = {}, obj[("uk-notification-message-" + status)] = status, obj)]
    }), children)
  }
}

var isNotProd = "development" !== 'production';
var notification = {
  name: 'VkNotification',
  directives: {
    MessageDirective: MessageDirective
  },
  props: assign({}, ElementNotification.props, {
    timeout: {
      type: Number,
      default: 5000
    },
    messages: {
      type: Array,
      default: function () { return []; },
      validator: function (val) {
        if (!val.every(function (m) { return isObject(m) || isString(m); })) {
          isNotProd && warn('vk-notification -> each message is expected as Object or String');
          return false
        }
        return true
      }
    },
    status: ElementNotificationMessage.props.status
  }),
  computed: {
    $messages: function $messages () {
      var this$1 = this;
      var messages = this.messages.map(function (val) {
        var msg = isString(val) ? { message: val } : val;
        return assign({ status: this$1.status, timeout: this$1.timeout }, msg)
      });
      messages = this.removeDuplicates(messages);
      return messages
    }
  },
  methods: {
    triggerRemove: function triggerRemove (msg) {
      var this$1 = this;
      this.closeQueue = this.closeQueue || [];
      this.closeQueue.push(msg);
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        var queue = [].concat( this$1.closeQueue );
        var messages = [].concat( this$1.$messages );
        this$1.closeQueue = [];
        queue.forEach(function (msg) {
          var index = messages.indexOf(messages.filter(function (m) { return m === msg; })[0]);
          messages.splice(index, 1);
        });
        this$1.$emit('update:messages', messages);
      });
    },
    removeDuplicates: function removeDuplicates (values) {
      var this$1 = this;
      var messages = [];
      var isDuplicated = function (msg) { return messages.filter(function (m) {
        return this$1.getMessageId(m) === this$1.getMessageId(msg)
      }).length; };
      for (var i = 0; i < values.length; i++) {
        if (isDuplicated(values[i])) {
          isNotProd && tip('vk-notification -> duplicate messages are filtered out, consider adding a unique `key` to those.');
          continue
        }
        messages.push(values[i]);
      }
      return messages
    },
    getMessageId: function getMessageId (msg) {
      var validKeys = ['message', 'status', 'key', 'timeout'];
      return Object.keys(msg)
        .filter(function (k) { return validKeys.filter(function (k) { return k; })[0]; })
        .map(function (k) { return msg[k]; })
        .join(':')
    }
  },
  render: function render (h) {
    var this$1 = this;
    var ref = this;
    var position = ref.position;
    var MessageSlot = get(this, '$scopedSlots.default', function (msg) { return msg.message; });
    return h(ElementNotification, {
      props: { position: position }
    }, [
      h(MessageTransition, [
        this.$messages.map(function (msg, index) { return h(ElementNotificationMessage, {
            key: this$1.getMessageId(msg),
            props: msg,
            directives: [{
              name: 'message-directive',
              value: msg
            }],
            on: {
              close: function () { return this$1.triggerRemove(msg); }
            }
          }, [
            MessageSlot(msg),
            h(ElementNotificationClose)
          ]); }
        )
      ])
    ])
  }
}

var SHOWN$1 = 'shown';
var HIDDEN$1 = 'hidden';
var TOGGLE$1 = 'update:show';
var KEYUP$1 = 'keyup';

var active$2;
var scrollbarWidth;
var win$3 = typeof window !== 'undefined' && window;
var body = typeof document !== 'undefined' && document.body;
var doc$4 = typeof document !== 'undefined' && document.documentElement;
var scroll;
var getScrollbarWidth = function () { return width(win$3) - doc$4.offsetWidth; };
var events = {
  beforeEnter: function (el) {
    var ref = el.__vkOffcanvas;
    var $refs = ref.$refs;
    var $props = ref.$props;
    scrollbarWidth = getScrollbarWidth();
    scroll = scroll || { x: win$3.pageXOffset, y: win$3.pageYOffset };
    addClass(doc$4, 'uk-offcanvas-page');
    addClass(body, 'uk-offcanvas-container');
    if ($props.flipped) {
      addClass($refs.bar, 'uk-offcanvas-bar-flip');
      addClass($refs.content.parentNode, 'uk-offcanvas-flip');
    }
    if ($props.overlay) {
      addClass(body, 'uk-offcanvas-overlay');
    }
    height(el);
  },
  afterEnter: function afterEnter (el) {
    var ref = el.__vkOffcanvas;
    var $refs = ref.$refs;
    var $props = ref.$props;
    if ($props.overlay) {
      width($refs.content, width(win$3) - scrollbarWidth);
      height($refs.content, height(win$3));
      if (scroll) {
        $refs.content.scrollTop = scroll.y;
      }
    }
    active$2 = el.__vkOffcanvas;
    active$2.$emit(SHOWN$1);
  },
  afterLeave: function afterLeave (el) {
    var ref = el.__vkOffcanvas;
    var $refs = ref.$refs;
    var $props = ref.$props;
    if (!$props.overlay) {
      scroll = { x: win$3.pageXOffset, y: win$3.pageYOffset };
    } else if (!scroll) {
      var ref$1 = $refs.content;
      var x = ref$1.scrollLeft;
      var y = ref$1.scrollTop;
      scroll = { x: x, y: y };
    }
    removeClass($refs.bar, 'uk-offcanvas-bar-flip');
    removeClass($refs.content.parentNode, 'uk-offcanvas-flip');
    removeClass(doc$4, 'uk-offcanvas-page');
    removeClass(body, 'uk-offcanvas-container');
    removeClass(body, 'uk-offcanvas-overlay');
    body.scrollTop = scroll.y;
    css(body, 'overflowY', '');
    css(doc$4, 'overflowY', '');
    width($refs.content, '');
    height($refs.content, '');
    win$3.scrollTo(scroll.x, scroll.y);
    scroll = null;
    if (active$2 === el.__vkOffcanvas) {
      active$2 = null;
    }
    el.__vkOffcanvas.$emit(HIDDEN$1);
  }
};
on(doc$4, 'click', function (e) {
  if (!active$2) {
    return
  }
  var $refs = active$2.$refs;
  var $props = active$2.$props;
  var clickedOut = !$refs.bar.contains(e.target);
  if (clickedOut && !$props.stuck) {
    active$2.$emit(TOGGLE$1, false);
  }
});
on(doc$4, 'keyup', function (e) {
  active$2 && active$2.$emit(KEYUP$1, e);
});

var ElementOffcanvas = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-offcanvas',
      style: {
        display: 'block'
      }
    }), children)
  }
}

var ElementOffcanvasContent = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-offcanvas-content'
    }), children)
  }
}

var ElementOffcanvasBar = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    return h('div', mergeData(data, {
      class: 'uk-offcanvas-bar'
    }), children)
  }
}

var ElementOffcanvasClose = {
  functional: true,
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var large = props.large;
    var def = {
      class: ['uk-offcanvas-close uk-close uk-icon', {
        'uk-close-large': large
      }],
      attrs: {
        type: 'button'
      }
    };
    return h('button', mergeData(data, def), [
      h(large ? IconCloseLarge : IconClose)
    ])
  }
}

var TransitionNone = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        enter: function (el, done) { return done(); },
        leave: function (el, done) { return done(); },
        beforeEnter: function beforeEnter (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          var $props = ref.$props;
          events.beforeEnter(el);
          css(doc$4, 'overflowY', scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          );
          addClass(el, 'uk-open');
          addClass($refs.bar, 'uk-offcanvas-none');
        },
        afterEnter: function afterEnter (el) {
          events.afterEnter(el);
        },
        afterLeave: function afterLeave (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          removeClass(el, 'uk-open');
          removeClass($refs.bar, 'uk-offcanvas-none');
          events.afterLeave(el);
        }
      }
    };
    return h('transition', mergeData(def, data), children)
  }
}

var TransitionPush = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          var $props = ref.$props;
          events.beforeEnter(el);
          css(doc$4, 'overflowY', $props.flipped && scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          );
          addClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        },
        enter: function enter (el, done) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          height(el);
          addClass(el, 'uk-open');
          addClass($refs.content, 'uk-offcanvas-content-animation');
          once(el, 'transitionend', done, false, function (e) { return e.target === $refs.bar; });
        },
        afterEnter: function afterEnter (el) {
          events.afterEnter(el);
        },
        beforeLeave: function beforeLeave (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          removeClass(el, 'uk-open');
          removeClass($refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          var bar = $refs.bar;
          once(el, 'transitionend', done, false, function (e) { return e.target === bar; });
        },
        afterLeave: function afterLeave (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          removeClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
          events.afterLeave(el);
        }
      }
    };
    return h('transition', mergeData(def, data), children)
  }
}

var TransitionSlide = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          var $props = ref.$props;
          events.beforeEnter(el);
          css(doc$4, 'overflowY', scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          );
          addClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        },
        enter: function enter (el, done) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          height(el);
          addClass(el, 'uk-open');
          once(el, 'transitionend', done, false, function (e) { return e.target === $refs.bar; });
        },
        afterEnter: function afterEnter (el) {
          events.afterEnter(el);
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
        },
        leave: function leave (el, done) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          once(el, 'transitionend', done, false, function (e) { return e.target === $refs.bar; });
        },
        afterLeave: function afterLeave (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          removeClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
          events.afterLeave(el);
        }
      }
    };
    return h('transition', mergeData(def, data), children)
  }
}

var TransitionReveal = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          var $props = ref.$props;
          events.beforeEnter(el);
          width($refs.content, width(win$3) - scrollbarWidth);
          css(doc$4, 'overflowY', $props.flipped && scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          );
        },
        enter: function enter (el, done) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          height(el);
          addClass(el, 'uk-open');
          addClass($refs.content, 'uk-offcanvas-content-animation');
          once(el, 'transitionend', done, false, function (e) { return e.target === $refs.reveal; });
        },
        afterEnter: function afterEnter (el) {
          events.afterEnter(el);
        },
        beforeLeave: function beforeLeave (el) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          removeClass(el, 'uk-open');
          removeClass($refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          var ref = el.__vkOffcanvas;
          var $refs = ref.$refs;
          once(el, 'transitionend', done, false, function (e) { return e.target === $refs.reveal; });
        },
        afterLeave: function afterLeave (el) {
          events.afterLeave(el);
        }
      }
    };
    return h('transition', mergeData(def, data), children)
  }
}

var Transitions = {
  none: TransitionNone,
  push: TransitionPush,
  slide: TransitionSlide,
  reveal: TransitionReveal
};
var offcanvas = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flipped: {
      type: Boolean,
      default: false
    },
    stuck: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'slide',
      validator: function (val) { return /^(none|slide|push|reveal)$/.test(val); }
    }
  },
  mounted: function mounted () {
    this.$refs.content = query('.uk-offcanvas-content');
    this.$refs.bar = this.$el.querySelector('.uk-offcanvas-bar');
    if ("development" !== 'production' && !this.$refs.content) {
      warn('Offcanvas content element not detected -> make sure to wrap the offcanvas content with `vk-offcanvas-content` component or a custom `.uk-offcanvas-content` node.', this);
    }
    this.$el.__vkOffcanvas = this;
  },
  beforeDestroy: function beforeDestroy () {
    if (this.show) {
      events.afterLeave(this.$el);
    }
  },
  render: function render (h) {
    var nodes = this.$slots.default || [];
    var customBar = findBar(nodes);
    var bar = customBar || h(ElementOffcanvasBar, nodes);
    var content = h(ElementOffcanvas, {
      key: this.mode,
      class: {
        'uk-offcanvas-overlay': this.overlay
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }, [
      this.mode === 'reveal'
        ? h('div', {
          class: 'uk-offcanvas-reveal',
          ref: 'reveal'
        }, [ bar ])
        : bar
    ]);
    return h(Transitions[this.mode], [ content ])
  }
}
function findBar (nodes) {
  return nodes
    .filter(function (n) { return n.tag && n.data && /offcanvas-bar/.test(getNodeClass(n)); })[0]
}
function getNodeClass (node) {
  return (node.data.class || []).concat( [node.data.staticClass]).join(' ')
}

var offcanvasContent = {
  name: 'VkOffcanvasContent',
  functional: true,
  render: ElementOffcanvasContent.render
}

var offcanvas_Bar = {
  name: 'VkOffcanvasBar',
  functional: true,
  render: ElementOffcanvasBar.render
}

var offcanvas_Close = {
  name: 'VkOffcanvasClose',
  functional: true,
  props: ElementOffcanvasClose.props,
  render: ElementOffcanvasClose.render
}

var ElementPagination = {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: function (val) { return /^(left|center|right)$/.test(val); }
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var align = props.align;
    return h('ul', mergeData(data, {
      class: ['uk-pagination', ( obj = {}, obj[("uk-flex-" + align)] = align !== 'left', obj)]
    }), children)
  }
}

var ElementPaginationPage = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Number],
      default: ''
    }
  },
  render: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var title = props.title;
    return h('li', {
      class: {
        'uk-active': active
      }
    }, [
      active
        ? h('span', title)
        : h('a', { on: data.on }, title)
    ])
  }
}

var Icon = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 7;
    var height = props.height || 12;
    var viewBox = props.viewBox || '0 0 7 12';
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-pagination-next ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
      }
    })
  }
}

var ElementPaginationPageNext = {
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    expanded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var listeners = ref.listeners;
    var title = props.title;
    var expanded = props.expanded;
    var disabled = props.disabled;
    delete data.on;
    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled,
        'uk-margin-auto-left': expanded
      }
    }), [
      h('a', { on: listeners }, [
        title,
        h(ElementIcon, {
          class: ['uk-pagination-prev', {
            'uk-margin-small-left': title
          }]
        }, [ h(Icon) ])
      ])
    ])
  }
}

var Icon$1 = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 7;
    var height = props.height || 12;
    var viewBox = props.viewBox || '0 0 7 12';
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-pagination-prev ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    })
  }
}

var ElementPaginationPagePrev = {
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    expanded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var listeners = ref.listeners;
    var title = props.title;
    var expanded = props.expanded;
    var disabled = props.disabled;
    delete data.on;
    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled,
        'uk-margin-auto-right': expanded
      }
    }), [
      h('a', { on: listeners }, [
        h(ElementIcon, {
          class: ['uk-pagination-prev', {
            'uk-margin-small-right': title
          }]
        }, [ h(Icon$1) ]),
        title
      ])
    ])
  }
}

function Matrix (ref) {
  if ( ref === void 0 ) ref = {};
  var total = ref.total; if ( total === void 0 ) total = 200;
  var page = ref.page; if ( page === void 0 ) page = 1;
  var perPage = ref.perPage; if ( perPage === void 0 ) perPage = 10;
  var range$$1 = ref.range; if ( range$$1 === void 0 ) range$$1 = 3;
  var matrix = [];
  var totalPages = Math.ceil(total / perPage);
  if (totalPages < 2) {
    return [1]
  }
  var mainPages = getMainPages({ page: page, range: range$$1, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  var prePages = range(1, (first <= 3) ? first : 2);
  var postPages = range(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  );
  var nextPage = 1
  ;[].concat(prePages, mainPages, postPages).forEach(function (p) {
    if (p === nextPage) {
      matrix.push(p);
      nextPage++;
    } else {
      matrix.push('...');
      matrix.push(p);
      nextPage = p + 1;
    }
  });
  return matrix
}
var getMainPages = function (ref) {
  var page = ref.page;
  var range$$1 = ref.range;
  var totalPages = ref.totalPages;
  var start = page - range$$1;
  var end = page + range$$1;
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - (range$$1 * 2);
    start = start < 1 ? 1 : start;
  }
  if (start <= 1) {
    start = 1;
    end = Math.min((range$$1 * 2) + 1, totalPages);
  }
  return range(start, end + 1)
};

var pagination = {
  name: 'Pagination',
  directives: { VkMargin: VkMargin },
  props: assign({}, ElementPagination.props, {
    page: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    range: {
      type: Number,
      default: 3
    }
  }),
  computed: {
    prevPage: function prevPage () {
      return this.page - 1
    },
    nextPage: function nextPage () {
      return this.page + 1
    },
    pages: function pages () {
      return Matrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage: function lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  methods: {
    update: function update (page) {
      this.$emit('update:page', page);
    }
  },
  render: function render (h) {
    var this$1 = this;
    var nodes = (this.$slots.default || []).filter(function (node) { return node.tag; });
    return h(ElementPagination, {
      props: this.$props,
      directives: [{
        name: 'vk-margin'
      }]
    }, nodes.map(function (node) {
      if (!node.fnOptions) {
        "development" !== 'production' &&
          warn(("vk-pagination -> " + (node.tag) + " component is not functional"), this$1);
        return
      }
      return node.data.rerender
        ? h(node.fnOptions, mergeData(node.data, {
          rerendering: true
        }))
        : node
    }))
  }
}

var pagination_Pages = {
  functional: true,
  render: function (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;
    if (!data.rerendering) {
      return h('li', {
        rerender: true
      })
    }
    var currentPage = parent.page;
    return parent.pages.map(function (page) {
      var isPage = isNumber(page);
      return isPage
        ? h(ElementPaginationPage, {
          props: {
            title: page,
            active: currentPage === page
          },
          on: {
            click: function (e) { return parent.$emit('update:page', page); }
          }
        })
        : h('li', [ h('span', '...') ])
    })
  }
}

var pagination_PageFirst = {
  functional: true,
  props: ElementPaginationPagePrev.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;
    var title = props.title;
    var expanded = props.expanded;
    if (!data.rerendering) {
      return h('li', mergeData(data, {
        rerender: true,
        props: props
      }))
    }
    return h(ElementPaginationPagePrev, {
      props: {
        title: title,
        expanded: expanded,
        disabled: parent.prevPage < 1
      },
      on: {
        click: function (e) { return parent.update(1); }
      }
    })
  }
}

var pagination_PagePrev = {
  functional: true,
  props: ElementPaginationPagePrev.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;
    var title = props.title;
    var expanded = props.expanded;
    if (!data.rerendering) {
      return h('li', mergeData(data, {
        rerender: true,
        props: props
      }))
    }
    return h(ElementPaginationPagePrev, {
      props: {
        title: title,
        expanded: expanded,
        disabled: parent.prevPage < 1
      },
      on: {
        click: function (e) { return parent.update(parent.prevPage); }
      }
    })
  }
}

var pagination_PageNext = {
  functional: true,
  props: ElementPaginationPageNext.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;
    var title = props.title;
    var expanded = props.expanded;
    if (!data.rerendering) {
      return h('li', mergeData(data, {
        rerender: true,
        props: props
      }))
    }
    return h(ElementPaginationPageNext, {
      props: {
        title: title,
        expanded: expanded,
        disabled: parent.nextPage > parent.lastPage
      },
      on: {
        click: function (e) { return parent.update(parent.nextPage); }
      }
    })
  }
}

var pagination_PageLast = {
  functional: true,
  props: ElementPaginationPageNext.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;
    var title = props.title;
    var expanded = props.expanded;
    if (!data.rerendering) {
      return h('li', mergeData(data, {
        rerender: true,
        props: props
      }))
    }
    return h(ElementPaginationPageNext, {
      props: {
        title: title,
        expanded: expanded,
        disabled: parent.nextPage > parent.lastPage
      },
      on: {
        click: function (e) { return parent.update(parent.lastPage); }
      }
    })
  }
}

var fastdom = {
  reads: [],
  writes: [],
  read: function read (task) {
    this.reads.push(task);
    scheduleFlush();
    return task
  },
  write: function write (task) {
    this.writes.push(task);
    scheduleFlush();
    return task
  },
  clear: function clear (task) {
    return remove$1(this.reads, task) || remove$1(this.writes, task)
  },
  flush: function flush () {
    runTasks(this.reads);
    runTasks(this.writes.splice(0, this.writes.length));
    this.scheduled = false;
    if (this.reads.length || this.writes.length) {
      scheduleFlush();
    }
  }
};
function scheduleFlush () {
  if (!fastdom.scheduled) {
    fastdom.scheduled = true;
    requestAnimationFrame(fastdom.flush.bind(fastdom));
  }
}
function runTasks (tasks) {
  var task;
  while ((task = tasks.shift())) {
    task();
  }
}
function remove$1 (array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1)
}

var DATA = '_vk_fastdom_data';
var FRAMES = '_vk_fastdom_frames';
var scroll$1 = 0;
var instances = [];
if (typeof window !== 'undefined') {
  on(window, 'load resize', function () { return instances.forEach(function (i) { return i.fastdomUpdate(); }); }
  );
  on(window, 'scroll', function (e) {
    e.dir = scroll$1 <= window.pageYOffset ? 'down' : 'up';
    e.scrollY = scroll$1 = window.pageYOffset;
    instances.forEach(function (inst) { return inst.fastdomUpdate(e); });
  });
}
var MixinFastdom = {
  methods: {
    fastdomUpdate: function fastdomUpdate (e, parents) {
      if ( parents === void 0 ) parents = false;
      e = createEvent(e || 'update');
      var instance = this;
      if (parents) {
        do {
          if (instance._fastdom_ready) {
            instance._fastdomUpdate(e);
          }
          instance = instance.$parent();
        } while (instance)
      } else {
        apply$2(instance, function (instance) {
          if (instance._fastdom_ready) {
            instance._fastdomUpdate(e);
          }
        });
      }
    },
    _fastdomUpdate: function _fastdomUpdate (e) {
      var this$1 = this;
      e = createEvent(e || 'update');
      var type = e.type;
      var updates = this.$options.fastdom;
      var ref = this[FRAMES];
      var reads = ref.reads;
      var writes = ref.writes;
      if (!updates) {
        return
      }
      updates.forEach(function (ref, i) {
        var read = ref.read;
        var write = ref.write;
        var events = ref.events;
        if (type !== 'update' && !includes(events, type)) {
          return
        }
        if (read && !includes(fastdom.reads, reads[i])) {
          reads[i] = fastdom.read(function () {
            var result = read.call(this$1, this$1[DATA], e);
            if (result === false && write) {
              fastdom.clear(writes[i]);
              delete writes[i];
            } else if (isPlainObject(result)) {
              assign(this$1[DATA], result);
            }
            delete reads[i];
          });
        }
        if (write && !includes(fastdom.writes, writes[i])) {
          writes[i] = fastdom.write(function () {
            write.call(this$1, this$1[DATA], e);
            delete writes[i];
          });
        }
      });
    }
  },
  created: function created () {
    this[DATA] = {};
    this[FRAMES] = { reads: {}, writes: {} };
    instances.push(this);
  },
  mounted: function mounted () {
    var this$1 = this;
    this._fastdom_ready || ready(function () {
      var hook = this$1.$options.domReady;
      hook && hook.call(this$1);
      this$1._fastdom_ready = true;
      this$1._fastdomUpdate();
    });
    this._fastdomUpdate();
  },
  beforeDestroy: function beforeDestroy () {
    var this$1 = this;
    var index$$1 = instances.indexOf(instances.filter(function (inst) { return inst === this$1; })[0]);
    instances.splice(index$$1, 1);
  }
}

var scrollspy = {
  name: 'VkScrollspy',
  abstract: true,
  mixins: [EventsMixin, MixinFastdom],
  props: {
    cls: {
      type: Array,
      default: function () { return []; }
    },
    target: {
      default: false
    },
    hidden: {
      type: Boolean,
      default: true
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetLeft: {
      type: Number,
      default: 0
    },
    repeat: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  classMapping: {
    inViewClass: 'uk-scrollspy-inview'
  },
  computed: {
    elements: function elements () {
      return this.target ? $$(this.target, this.$el) : [ this.$el ]
    }
  },
  fastdom: [
    {
      write: function write () {
        var ref = this.$options.classMapping;
        var inViewClass = ref.inViewClass;
        if (this.hidden) {
          css(filter(this.elements, (":not(." + inViewClass + ")")), 'visibility', 'hidden');
        }
      }
    },
    {
      read: function read (els) {
        var this$1 = this;
        this.elements.forEach(function (el, i) {
          var elData = els[i];
          if (!elData || elData.el !== el) {
            var cls = data(el, 'vk-scrollspy-class');
            elData = {el: el, toggles: cls && cls.split(',') || this$1.cls};
          }
          elData.show = isInView(el, this$1.offsetTop, this$1.offsetLeft);
          els[i] = elData;
        });
      },
      write: function write (els) {
        var this$1 = this;
        var ref = this.$options.classMapping;
        var inViewClass = ref.inViewClass;
        var index = this.elements.length === 1 ? 1 : 0;
        this.elements.forEach(function (el, i) {
          var elData = els[i];
          var cls = elData.toggles[i] || elData.toggles[0];
          if (elData.show && !elData.inview && !elData.timer) {
            var show = function () {
              css(el, 'visibility', '');
              addClass(el, inViewClass);
              toggleClass(el, cls);
              trigger(el, 'inview');
              this$1.fastdomUpdate();
              elData.inview = true;
              delete elData.timer;
            };
            if (this$1.delay && index) {
              elData.timer = setTimeout(show, this$1.delay * index);
            } else {
              show();
            }
            index++;
          } else if (!elData.show && elData.inview && this$1.repeat) {
            if (elData.timer) {
              clearTimeout(elData.timer);
              delete elData.timer;
            }
            css(el, 'visibility', this$1.hidden ? 'hidden' : '');
            removeClass(el, inViewClass);
            toggleClass(el, cls);
            trigger(el, 'outview');
            this$1.fastdomUpdate();
            elData.inview = false;
          }
        });
      },
      events: ['scroll', 'load', 'resize']
    }
  ],
  render: function render (h) {
    var children = this.$slots.default;
    if (!children) {
      return
    }
    children = filterOutTextNodes(children);
    if (!children.length) {
      return
    }
    if ("development" !== 'production' && children.length > 1) {
      warn('vk-scrollspy can only be used on a single element', this.$parent);
    }
    return children[0]
  }
}

var scrollspyNav = {
  name: 'VkScrollspyNav',
  abstract: true,
  mixins: [EventsMixin, MixinFastdom],
  props: {
    cls: {
      type: String,
      default: 'uk-active'
    },
    closest: {
      type: String,
      default: ''
    },
    overflow: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setComputed: function setComputed () {
      this.links = $$('a[href^="#"]', this.$el).filter(function (el) { return el.hash; });
      this.elements = this.closest ? closest(this.links, this.closest) : this.links;
      this.targets = $$(this.links.map(function (el) { return el.hash; }).join(','));
    }
  },
  fastdom: [
    {
      read: function read (data) {
        var this$1 = this;
        var scroll = window.pageYOffset + this.offset + 1;
        var max = height(document) - height(window) + this.offset;
        data.active = false;
        this.targets.every(function (el, i) {
          var ref = offset(el);
          var top = ref.top;
          var last = i + 1 === this$1.targets.length;
          if (!this$1.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
            return false
          }
          if (!last && offset(this$1.targets[i + 1]).top <= scroll) {
            return true
          }
          if (scroll >= max) {
            for (var j = this$1.targets.length - 1; j > i; j--) {
              if (isInView(this$1.targets[j])) {
                el = this$1.targets[j];
                break
              }
            }
          }
          return !(data.active = $(filter(this$1.links, ("[href=\"#" + (el.id) + "\"]"))))
        });
      },
      write: function write (ref) {
        var active = ref.active;
        this.links.forEach(function (el) { return el.blur(); });
        removeClass(this.elements, this.cls);
        if (active) {
          trigger(this.$el, 'active', [active, addClass(this.closest ? closest(active, this.closest) : active, this.cls)]);
        }
      },
      events: ['scroll', 'load', 'resize']
    }
  ],
  mounted: function mounted () {
    this.setComputed();
  },
  updated: function updated () {
    var this$1 = this;
    this.$nextTick(function () {
      this$1.setComputed();
      this$1.fastdomUpdate();
    });
  },
  render: function render (h) {
    var children = this.$slots.default;
    if (!children) {
      return
    }
    children = filterOutTextNodes(children);
    if (!children.length) {
      return
    }
    if ("development" !== 'production' && children.length > 1) {
      warn('vk-scrollspy can only be used on a single element', this.$parent);
    }
    return children[0]
  }
}

var ElementSkeleton = {
  functional: true,
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Boolean, Number],
      default: false
    },
    height: {
      type: [Boolean, Number],
      default: false
    }
  },
  render: function (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var animated = props.animated;
    var width = props.width;
    var height = props.height;
    return h('div', mergeData({
      class: {
        'vk-skeleton--animated': animated
      },
      style: {
        width: (width + "px"),
        height: (height + "px")
      }
    }, data), [
      h('div', {
        class: 'vk-skeleton-content'
      })
    ])
  }
}

var ElementSkeletonImage = {
  functional: true,
  props: assign({}, ElementSkeleton.props, {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 120
    }
  }),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementSkeleton, mergeData(data, {
      class: 'vk-skeleton-image',
      props: props
    }))
  }
}

var ElementSkeletonText = {
  functional: true,
  props: ElementSkeleton.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementSkeleton, mergeData(data, {
      class: 'vk-skeleton-text',
      props: props
    }))
  }
}

var ElementSkeletonTitle = {
  functional: true,
  props: ElementSkeleton.props,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementSkeleton, mergeData(data, {
      class: 'vk-skeleton-title',
      props: props
    }))
  }
}

var skeletonImage = {
  name: 'VkSkeletonImage',
  functional: true,
  props: ElementSkeletonImage.props,
  render: ElementSkeletonImage.render
}

var skeletonText = {
  name: 'VkSkeletonText',
  functional: true,
  props: ElementSkeletonText.props,
  render: ElementSkeletonText.render
}

var skeletonTitle = {
  name: 'VkSkeletonTitle',
  functional: true,
  props: ElementSkeletonTitle.props,
  render: ElementSkeletonTitle.render
}

var Icon$2 = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 30;
    var height = props.height || 30;
    var viewBox = props.viewBox || '0 0 30 30';
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
      }
    })
  }
}

var ElementSpinner = {
  functional: true,
  props: {
    ratio: {
      type: [String, Number]
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    return h('div', mergeData(data, {
      class: ['uk-icon', 'uk-spinner']
    }), [
      h(Icon$2, { props: props })
    ])
  }
}

var spinner = {
  name: 'VkSpinner',
  functional: true,
  props: ElementSpinner.props,
  render: ElementSpinner.render
}

var ACTIVE = 'active';
var INACTIVE = 'inactive';

var sticky = {
  name: 'VkSticky',
  abstract: true,
  mixins: [EventsMixin, MixinFastdom],
  props: {
    top: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: [Boolean, String],
      default: false
    },
    offset: {
      type: Number,
      default: 0
    },
    widthElement: {
      default: false
    },
    animation: {
      type: String,
      default: ''
    },
    showOnUp: {
      type: Boolean,
      default: false
    },
    media: {
      type: [Number, String]
    },
    selTarget: {
      type: String
    },
    target: {
      type: [Number, Boolean],
      default: false
    }
  },
  classMapping: {
    clsFixed: 'uk-sticky-fixed',
    clsBelow: 'uk-sticky-below',
    clsActive: 'uk-active',
    clsInactive: ''
  },
  data: function () { return ({
    isActive: false
  }); },
  computed: {
    outerHeight: function outerHeight () {
      return (this.isActive ? this.$refs.placeholder : this.$el).offsetHeight
    },
    $selTarget: function $selTarget () {
      return this.selTarget
        ? $(this.selTarget, this.$el)
        : this.$el
    }
  },
  fastdom: [
    {
      write: function write () {
        var ref = this.$refs;
        var placeholder = ref.placeholder;
        var widthElement = ref.widthElement;
        var outerHeight = (this.isActive ? placeholder : this.$el).offsetHeight;
        css(placeholder, assign(
          {height: css(this.$el, 'position') !== 'absolute' ? outerHeight : ''},
          css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
        ));
        if (!within(placeholder, document)) {
          after(this.$el, placeholder);
          attr(placeholder, 'hidden', '');
        }
        attr(widthElement, 'hidden', null);
        this.width = widthElement.offsetWidth;
        attr(widthElement, 'hidden', this.isActive ? null : '');
        this.topOffset = offset(this.isActive ? placeholder : this.$el).top;
        this.bottomOffset = this.topOffset + outerHeight;
        var bottom = parseProp('bottom', this);
        this.stickAt = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
        this.stickUntil = bottom && bottom - outerHeight;
        this.inactive = this.media && !window.matchMedia(toMedia(this.media)).matches;
        if (this.isActive) {
          this.update();
        }
      },
      events: ['load', 'resize']
    },
    {
      read: function read (_, ref) {
        var scrollY = ref.scrollY; if ( scrollY === void 0 ) scrollY = window.pageYOffset;
        this.scroll = scrollY;
        return {
          scroll: scrollY,
          visible: isVisible(this.$el)
        }
      },
      write: function write (ref, ref$1) {
        var this$1 = this;
        var visible = ref.visible;
        var scroll = ref.scroll;
        if ( ref$1 === void 0 ) ref$1 = {};
        var dir = ref$1.dir;
        if (scroll < 0 || !visible || this.disabled || this.showOnUp && !dir) {
          return
        }
        if (this.inactive ||
          scroll < this.stickAt ||
          this.showOnUp && (scroll <= this.stickAt || dir === 'down' || dir === 'up' && !this.isActive && scroll <= this.bottomOffset)
        ) {
          if (!this.isActive) {
            return
          }
          this.isActive = false;
          if (this.animation && scroll > this.topOffset) {
            Animation.cancel(this.$el);
            Animation.out(this.$el, ("uk-animation-" + (this.animation))).then(function () { return this$1.hide(); }, noop);
          } else {
            this.hide();
          }
        } else if (this.isActive) {
          this.update();
        } else if (this.animation) {
          Animation.cancel(this.$el);
          this.show();
          Animation.in(this.$el, ("uk-animation-" + (this.animation))).catch(noop);
        } else {
          this.show();
        }
      },
      events: ['scroll']
    }
  ],
  methods: {
    show: function show () {
      this.isActive = true;
      this.update();
      attr(this.$refs.placeholder, 'hidden', null);
    },
    hide: function hide () {
      var ref = this.$options.classMapping;
      var clsFixed = ref.clsFixed;
      var clsBelow = ref.clsBelow;
      var clsActive = ref.clsActive;
      if (!this.isActive || hasClass(this.$selTarget, clsActive)) {
        this.$emit(INACTIVE);
      }
      removeClass(this.$el, clsFixed, clsBelow);
      css(this.$el, { position: '', top: '', width: '' });
      attr(this.$refs.placeholder, 'hidden', '');
    },
    update: function update () {
      var ref = this.$options.classMapping;
      var clsFixed = ref.clsFixed;
      var clsBelow = ref.clsBelow;
      var clsActive = ref.clsActive;
      var active = this.stickAt !== 0 || this.scroll > this.stickAt;
      var top = Math.max(0, this.offset);
      if (this.stickUntil && this.scroll > this.stickUntil - this.offset) {
        top = this.stickUntil - this.scroll;
      }
      css(this.$el, {
        position: 'fixed',
        top: (top + "px"),
        width: this.width
      });
      if (hasClass(this.$selTarget, clsActive)) {
        if (!active) {
          this.$emit(INACTIVE);
        }
      } else if (active) {
        this.$emit(ACTIVE);
      }
      toggleClass(this.$el, clsBelow, this.scroll > this.bottomOffset);
      addClass(this.$el, clsFixed);
    }
  },
  created: function created () {
    var this$1 = this;
    var ref = this.$options.classMapping;
    var clsActive = ref.clsActive;
    var clsInactive = ref.clsInactive;
    this.$on(ACTIVE, function () { return replaceClass(this$1.$selTarget, clsInactive, clsActive); });
    this.$on(INACTIVE, function () { return replaceClass(this$1.$selTarget, clsActive, clsInactive); });
  },
  mounted: function mounted () {
    addClass(this.$el, 'uk-sticky');
    this.$refs.placeholder = $('<div class="uk-sticky-placeholder"></div>');
    this.$refs.widthElement = (this.widthElement && query(this.widthElement)) || this.$refs.placeholder;
    if (!this.isActive) {
      this.hide();
    }
  },
  domReady: function domReady () {
    var this$1 = this;
    if (!(this.target && location.hash && window.pageYOffset > 0)) {
      return
    }
    var target = $(location.hash);
    if (target) {
      fastdom.read(function () {
        var ref = offset(target);
        var top = ref.top;
        var elTop = offset(this$1.$el).top;
        var elHeight = this$1.$el.offsetHeight;
        if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
          window.scrollTo(0, top - elHeight - this$1.target - this$1.offset);
        }
      });
    }
  },
  beforeDestroy: function beforeDestroy () {
    var ref = this.$options.classMapping;
    var clsInactive = ref.clsInactive;
    if (this.isActive) {
      this.isActive = false;
      this.hide();
      removeClass(this.$selTarget, clsInactive);
    }
    remove(this.$refs.placeholder);
    this.$refs.placeholder = null;
    this.$refs.widthElement = null;
  },
  render: function render (h) {
    var children = this.$slots.default;
    if (!children) {
      return
    }
    children = filterOutTextNodes(children);
    if (!children.length) {
      return
    }
    if ("development" !== 'production' && children.length > 1) {
      warn('vk-sticky can only be used on a single element', this.$parent);
    }
    return children[0]
  }
}
function parseProp (prop, ref) {
  var $props = ref.$props;
  var $el = ref.$el;
  var propOffset = ref[(prop + "Offset")];
  var value = $props[prop];
  value = isString(value) && value === ''
    ? true
    : value;
  if (!value) {
    return
  }
  if (isNumeric(value)) {
    return propOffset + toFloat(value)
  } else if (isString(value) && /^-?\d+vh$/.test(value)) {
    return height(window) * toFloat(value) / 100
  } else {
    var el = value === true ? $el.parentNode : query(value, $el);
    if (el) {
      return offset(el).top + el.offsetHeight
    }
  }
}

var ElementSubnav = {
  functional: true,
  props: {
    divided: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var divided = props.divided;
    var pill = props.pill;
    return h('ul', mergeData(data, {
      class: ['uk-subnav', {
        'uk-subnav-divider': divided,
        'uk-subnav-pill': pill
      }]
    }), children)
  }
}

var ElementSubnavItem = {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var listeners = ref.listeners;
    var title = props.title;
    var active = props.active;
    var disabled = props.disabled;
    delete data.on;
    return h('li', mergeData(data, {
      class: {
        'uk-active': active && !disabled,
        'uk-disabled': disabled
      }
    }), [ disabled
      ? h('span', title)
      : h('a', { on: listeners }, title)
    ])
  }
}

var ElementSubnavItemDropdown = {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var disabled = props.disabled;
    var title = props.title;
    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled
      }
    }), [
      disabled
        ? h('span', title)
        : children
    ])
  }
}

var subnav = {
  name: 'VkSubnav',
  props: assign({}, ElementSubnav.props, {
    activeItem: {}
  }),
  data: function (vm) { return ({
    state: {
      activeItem: vm.activeItem || filterItems(vm).shift().data.key || 0
    }
  }); },
  computed: {
    items: function items () {
      return (this.$slots.default || []).filter(function (n) { return n.tag; })
    }
  },
  watch: {
    activeItem: function activeItem (val) {
      this.state.activeItem = val;
    }
  },
  methods: {
    triggerUpdate: function triggerUpdate (val) {
      this.state.activeItem = val;
      this.$emit('update:activeItem', val);
    }
  },
  render: function render (h) {
    var this$1 = this;
    return h(ElementSubnav, {
      props: this.$props
    }, filterItems(this).map(function (node, index) {
      if ("development" !== 'production' && !node.fnOptions) {
        warn('vk-subvnav -> components must be functional', this$1);
      }
      var key = get(node, 'data.key', index);
      return node.data.rerender
        ? h(node.fnOptions, mergeData({}, node.data, {
          key: key,
          rerendering: true,
          props: {
            active: JSON.stringify(key) === JSON.stringify(this$1.state.activeItem)
          }
        }), node.children)
        : node
    }))
  }
}
function filterItems (vm) {
  return vm.$slots.default.filter(function (n) { return n.tag; })
}

var subnav_Item = {
  name: 'VkSubnavItem',
  functional: true,
  props: ElementSubnavItem.props,
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var parent = ref.parent;
    if (data.rerendering) {
      delete data.class;
    }
    return h(ElementSubnavItem, mergeData(data, { props: props }, {
      rerender: true,
      on: {
        click: function (e) {
          e.preventDefault();
          parent.triggerUpdate(data.key);
        }
      }
    }))
  }
}

var IconTriangeDown = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="5 7 15 7 10 12" />'
      }
    })
  }
}

var subnav_ItemDropdown = {
  name: 'VkSubnavItemDropdown',
  functional: true,
  props: assign({}, ElementSubnavItemDropdown.props, Dropdown.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var title = props.title;
    return h(ElementSubnavItemDropdown, { props: props }, [
      h('a', {
        class: ['uk-icon']
      }, [
        title + ' ',
        h(IconTriangeDown)
      ]),
      h(Dropdown, {
        props: props
      }, [
        children
      ])
    ])
  }
}

var MixinSort = {
  props: {
    sortedBy: {
      type: Object
    }
  }
}

var ROW_ID = '__vkTable_rowId';
var ROW_LEVEL = '__vkTable_rowLevel';
var ROW_CHILDREN_COUNT = '__vkTable_rowChildrenCount';
var ROW_CLICK_PREVENTED = '__vkTable_rowClickPrevented';
var ON_CLICK_ROW = 'click-row';
var UPDATE_SORTEDBY = 'update:sortedBy';
var UPDATE_EXPANDEDROWS = 'update:expandedRows';
var UPDATE_SELECTEDROWS = 'update:selectedRows';

var MixinSelect = {
  props: {
    selectedRows: {
      type: Array,
      default: function () { return []; }
    },
    rowSelectable: {
      type: Boolean,
      default: false
    },
    rowsSelectable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectRow: function selectRow (row) {
      var id = row[ROW_ID];
      if (this.rowSelectable) {
        this.updateRowSelection([id]);
        return
      }
      var selectedRows = [].concat( this.selectedRows );
      selectedRows.push(id);
      this.updateRowSelection(selectedRows);
    },
    unselectRow: function unselectRow (row) {
      var id = row[ROW_ID];
      var index = this.selectedRows.indexOf(id);
      var selectedRows = [].concat( this.selectedRows );
      selectedRows.splice(index, 1);
      this.updateRowSelection(selectedRows);
    },
    toggleRowSelection: function toggleRowSelection (row) {
      this.isRowSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row);
    },
    toggleRowsSelection: function toggleRowsSelection () {
      var selectedRows = [];
      if (!this.allRowsSelected) {
        selectedRows = this.rows.map(function (row) { return row[ROW_ID]; });
      }
      this.updateRowSelection(selectedRows);
    },
    isRowSelected: function isRowSelected (row) {
      return Boolean(this.selectedRows
        .filter(function (id) { return JSON.stringify(id) === JSON.stringify(row[ROW_ID]); }).length)
    },
    updateRowSelection: function updateRowSelection (selectedRows) {
      this.$emit(UPDATE_SELECTEDROWS, selectedRows);
    }
  },
  computed: {
    allRowsSelected: function allRowsSelected () {
      if (this.selectedRows && this.selectedRows.length < this.rows.length) {
        return false
      }
      var selected = this.rows.filter(this.isRowSelected);
      return selected.length === this.rows.length
    }
  },
  created: function created () {
    if (this.rowsSelectable || this.rowSelectable) {
      this.$on(ON_CLICK_ROW, this.toggleRowSelection);
    }
  }
}

var ElementTable = {
  functional: true,
  props: {
    divided: {
      type: Boolean,
      default: true
    },
    narrowed: {
      type: Boolean,
      default: false
    },
    cellMiddle: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    return h('table', mergeData(data, {
      class: ['uk-table', {
        'uk-table-small': props.narrowed,
        'uk-table-hover': props.hoverable,
        'uk-table-middle': props.cellMiddle,
        'uk-table-divider': props.divided,
        'uk-table-striped': props.striped,
        'uk-table-justify': props.justified,
        'uk-table-responsive': props.responsive
      }]
    }), children)
  }
}

var ElementTableTd = {
  functional: true,
  props: {
    cellMiddle: {
      type: Boolean,
      default: false
    },
    shrinked: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    linked: {
      type: Boolean,
      default: false
    },
    truncated: {
      type: Boolean,
      default: false
    },
    unwrapped: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var obj;
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var cellMiddle = props.cellMiddle;
    var shrinked = props.shrinked;
    var expanded = props.expanded;
    var width = props.width;
    var linked = props.linked;
    var truncated = props.truncated;
    var unwrapped = props.unwrapped;
    return h('td', mergeData(data, {
      class: ( obj = {
        'uk-table-link': linked,
        'uk-table-middle': cellMiddle,
        'uk-table-shrink': shrinked,
        'uk-table-expand': expanded,
        'uk-text-nowrap': unwrapped,
        'uk-text-truncate': truncated
      }, obj[("uk-width-" + width)] = width, obj)
    }), children)
  }
}

var ElementTableTr = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var active = props.active;
    return h('tr', mergeData(data, {
      class: {
        'uk-active': active
      }
    }), children)
  }
}

var ElementTableTh = {
  functional: true,
  props: {
    shrinked: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var shrinked = props.shrinked;
    var expanded = props.expanded;
    return h('th', mergeData(data, {
      class: {
        'uk-table-shrink': shrinked,
        'uk-table-expand': expanded
      }
    }), children)
  }
}

var ElementTableThSort = {
  functional: true,
  props: assign({}, ElementTableTh.props, {
    order: {
      type: String
    }
  }),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var order = props.order;
    return h(ElementTableTh, mergeData(data, {
      class: 'vk-table-column-sort uk-visible-hover-inline'
    }), [
      h('div', {
        class: 'uk-text-nowrap uk-position-relative'
      }, [
        children,
        h('span', mergeData(data, {
          class: ['vk-table-column-sort__arrow uk-position-absolute', {
            'uk-invisible': !order,
            'vk-table-column-sort__arrow--rotated': !order || order === 'asc'
          }]
        }))
      ])
    ])
  }
}

var Row = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var parent = ref.parent;
    var $row = data.$row;
    return h(ElementTableTr, {
      props: {
        active: parent.isRowSelected($row)
      },
      class: resolveClass(parent.rowClass, $row),
      on: {
        click: function (e) {
          var isPrevented = e[ROW_CLICK_PREVENTED];
          var isIgnoredTag = /^(A|BUTTON)$/.test(e.target.tagName);
          if (isPrevented || isIgnoredTag) {
            return
          }
          parent.$emit(ON_CLICK_ROW, $row);
        }
      }
    }, children)
  }
};
function Render (h, ref) {
  var rows = ref.rows;
  var props = ref.props;
  var columns = ref.columns;
  var table = ref.table;
  columns = columns.filter(function (node) {
    var isValid = node.fnOptions && node.fnOptions.headRender && node.fnOptions.cellRender;
    if ("development" !== 'production' && !isValid) {
      warn('vk-table -> some of the columns were filtered out because they were missing a head or cell render.');
    }
    return isValid
  });
  var isHeadless = !columns.some(
    function (node) { return node.children || get(node, 'data.props.title') || get(node, 'data.props.head'); }
  );
  return h(ElementTable, { props: props }, [
    isHeadless || h('thead', [
      h(ElementTableTr, columns.map(function (node) {
        var fnOptions = node.fnOptions;
        delete node.data.class;
        return h({
          functional: true,
          render: fnOptions.headRender
        }, node.data)
      }))
    ]),
    h('tbody', rows.map(function ($row, index) {
      return h(Row, { $row: $row },
        columns.map(function (node) {
          var ref = node.data;
          var props = ref.props;
          var slots = ref.slots;
          var scopedSlots = ref.scopedSlots;
          var fnOptions = node.fnOptions;
          if ("development" !== 'production' && !fnOptions) {
            warn('vk-table -> column must be a functional component', table);
          }
          if ("development" !== 'production' && !fnOptions.cellRender) {
            warn('vk-table -> column definition is missing cellRender', table);
          }
          return h({
            functional: true,
            render: fnOptions.cellRender
          }, { $row: $row, props: props, slots: slots, scopedSlots: scopedSlots })
        })
      )
    }))
  ])
}
function resolveClass (rowClass, row) {
  return isFunction(rowClass)
    ? rowClass(row)
    : rowClass
}

var Table = {
  name: 'VkTable',
  mixins: [ MixinSelect, MixinSort ],
  inheritAttrs: false,
  props: assign({}, ElementTable.props, {
    data: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowClass: {
      type: Function
    }
  }),
  computed: {
    rows: function rows () {
      var this$1 = this;
      return this.data.map(function (_row, index) {
        var row = assign({}, _row);
        row[ROW_ID] = row[this$1.rowKey] || index;
        return row
      })
    }
  },
  render: function render (h) {
    var columns = get(this, '$slots.default', []).filter(function (n) { return n.tag; });
    return Render(h, {
      columns: columns,
      table: this,
      rows: this.rows,
      props: this.$props
    })
  }
}

var tableTree = {
  name: 'VkTableTree',
  extends: Table,
  props: {
    expandedRows: {
      type: Array,
      default: function () { return []; }
    },
    childrenKey: {
      type: String,
      default: 'children'
    }
  },
  computed: {
    rows: function rows () {
      var this$1 = this;
      var rows = [];
      var flatten = function (data, parent) {
        if ( parent === void 0 ) parent = {};
        var idCount = 0;
        data.forEach(function (_row) {
          var row = assign({}, _row);
          var children = row[this$1.childrenKey];
          var hasChildren = children && children.length;
          row[ROW_LEVEL] = parent[ROW_LEVEL] !== undefined
            ? parent[ROW_LEVEL] + 1
            : 0;
          row[ROW_ID] = row[this$1.rowKey]
            ? row[this$1.rowKey]
            : row[ROW_LEVEL] === 0
              ? ("" + (idCount++))
              : ((parent[ROW_ID]) + "_" + (idCount++));
          rows.push(row);
          if (hasChildren && this$1.isExpanded(row)) {
            flatten(children, row);
          }
          if (hasChildren) {
            row[ROW_CHILDREN_COUNT] = children.length;
            delete row[this$1.childrenKey];
          }
        });
      };
      flatten(this.data);
      return rows
    },
    thereAreSubLevels: function thereAreSubLevels () {
      return this.rows.some(function (row) { return row[ROW_CHILDREN_COUNT]; })
    }
  },
  methods: {
    isExpanded: function isExpanded (row) {
      return Boolean(this.expandedRows
        .filter(function (id) { return JSON.stringify(id) === JSON.stringify(row[ROW_ID]); }).length)
    },
    toggleExpand: function toggleExpand (row) {
      var id = row[ROW_ID];
      var expandedRows = [].concat( this.expandedRows );
      var index = expandedRows.indexOf(id);
      var isExpanded = index !== -1;
      isExpanded
        ? expandedRows.splice(index, 1)
        : expandedRows.push(id);
      this.$emit(UPDATE_EXPANDEDROWS, expandedRows);
    }
  },
  render: function render (h) {
    var columns = (this.$slots.default || []).filter(function (n) { return n.tag; });
    return Render(h, {
      columns: columns,
      table: this,
      rows: this.rows,
      props: this.$props
    })
  }
}

function RenderCell (h, ctx, defaultContent) {
  var props = ctx.props;
  var data = ctx.data;
  var $row = data.$row;
  var cell = props.cell;
  var cellClass = props.cellClass;
  var cellValue = get($row, cell);
  var isEmpty = !isUndefined(cell) && isUndefined(cellValue);
  var scope = getCellScope(ctx);
  var slots = getCellSlots(ctx);
  var slot = isEmpty && slots.empty
    ? slots.empty
    : slots.default || defaultContent;
  return h(ElementTableTd, {
    props: props,
    class: cellClass
  }, [
    slot(scope)
  ])
}
function getCellScope (ref) {
  var data = ref.data;
  var props = ref.props;
  var parent = ref.parent;
  var $row = data.$row;
  var cell = props.cell;
  var cellValue = get($row, cell);
  var selected = parent.isRowSelected($row);
  var allSelected = parent.allRowsSelected;
  return { cell: cellValue, row: $row, selected: selected, allSelected: allSelected }
}
function getCellSlots (ref) {
  var data = ref.data;
  var defaultSlot = get(data, 'slots.default')
    ? function () { return get(data, 'slots.default'); }
    : get(data, 'scopedSlots.default');
  var emptySlot = get(data, 'slots.empty')
    ? function () { return get(data, 'slots.empty'); }
    : get(data, 'scopedSlots.empty');
  return {
    default: defaultSlot,
    empty: emptySlot
  }
}

var Column = {
  name: 'VkTableColumn',
  functional: true,
  props: assign({}, ElementTableTh.props, ElementTableTd.props, {
    cell: String,
    title: String,
    cellClass: String
  }),
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var slots = ref.slots;
    data.slots = slots();
    return h('div', mergeData({}, data, { props: props }))
  },
  headRender: function headRender (h, ref) {
    var data = ref.data;
    var props = ref.props;
    return h(ElementTableTh, mergeData({}, data, {
      props: props,
      class: 'vk-table-column'
    }), props.title)
  },
  cellRender: function cellRender (h, ctx) {
    return RenderCell(h, ctx, function (ref) {
      var cell = ref.cell;
      return cell;
    })
  }
}

var table_ColumnSort = {
  name: 'VkTableColumnSort',
  functional: true,
  props: assign({}, Column.props, ElementTableThSort, {
    cell: {
      type: String,
      required: true
    }
  }),
  render: Column.render,
  cellRender: Column.cellRender,
  headRender: function headRender (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var title = props.title;
    if ("development" !== 'production' && !parent.sortedBy) {
      warn("vk-table-column-sort -> the table 'sortedBy' prop is required when using this column.", parent);
    }
    return h(ElementTableThSort, mergeData(data, {
      props: assign({
        order: get(parent, ("sortedBy." + (props.cell)))
      }, props),
      on: {
        click: function (e) {
          var sortedBy = getNewSortOrder(parent.sortedBy, props.cell, e.shiftKey);
          parent.$emit(UPDATE_SORTEDBY, sortedBy);
        }
      }
    }), title || children)
  }
}
function getNewSortOrder (currentSort, by, multi) {
  var sort = {};
  var order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc';
  sort[by] = order;
  return multi
    ? assign({}, currentSort, sort)
    : sort
}

var ElementCheckbox = {
  functional: true,
  props: ['checked'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var listeners = ref.listeners;
    var def = {
      staticClass: 'uk-checkbox',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        change: function (e) {
          e.target.checked = props.checked;
        }
      }
    };
    return h('input', mergeData(data, def))
  }
}

var table_ColumnSelect = {
  name: 'VkTableColumnSelect',
  functional: true,
  props: assign({}, ElementTableTh.props, {
    cellClass: {
      type: String
    },
    headless: {
      type: Boolean,
      default: false
    },
    shrinked: {
      type: Boolean,
      default: true
    }
  }),
  render: Column.render,
  headRender: function headRender (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;
    var content = props.headless || h('span', {
      class: 'uk-form uk-text-center'
    }, [
      h(ElementCheckbox, {
        props: {
          checked: parent.allRowsSelected
        },
        on: {
          click: function (e) { return parent.toggleRowsSelection(); }
        }
      })
    ]);
    return h(ElementTableTh, mergeData(data, {
      props: { shrinked: true },
      class: 'vk-table-column-select'
    }), [ content ])
  },
  cellRender: function cellRender (h, ctx) {
    var parent = ctx.parent;
    return RenderCell(h, ctx, function (ref) {
      var row = ref.row;
      var selected = ref.selected;
      return h('span', {
      class: 'uk-form uk-text-center'
    }, [
      h(ElementCheckbox, {
        props: { checked: selected },
        on: {
          click: function (e) { return parent.toggleRowSelection(row); }
        }
      })
    ]);
    })
  }
}

var TreeArrow = {
  functional: true,
  props: ['rotated'],
  render: function (h, ref) {
    var listeners = ref.listeners;
    var props = ref.props;
    return h('span', {
      on: listeners,
      class: ['vk-table-column-tree__arrow', {
        'vk-table-column-tree__arrow--rotated': props.rotated
      }]
    })
  }
};
var TreeIndent = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('span', { class: 'vk-table-column-tree__indent' }, children)
  }
};
var table_ColumnTree = {
  name: 'VkTableTreeColumn',
  functional: true,
  props: assign({}, Column.props),
  render: Column.render,
  headRender: Column.headRender,
  cellRender: function cellRender (h, ctx) {
    var parent = ctx.parent;
    return RenderCell(h, ctx, function (ref) {
      var row = ref.row;
      var cell = ref.cell;
      return [
      Array(row[ROW_LEVEL]).fill(h(TreeIndent)),
      parent.thereAreSubLevels && h(TreeIndent, [
        row[ROW_CHILDREN_COUNT] && h(TreeArrow, {
          props: {
            rotated: parent.isExpanded(row)
          },
          on: {
            click: function (e) {
              e[ROW_CLICK_PREVENTED] = true;
              parent.toggleExpand(row);
            }
          }
        })
      ]),
      h('span', cell)
    ];
    })
  }
}

var TAB_ID = '__vkTabs_id';

var isNotProd$1 = "development" !== 'production';
var core$2 = {
  props: {
    activeTab: {},
    animation: {
      type: String,
      default: ''
    },
    keepAlive: {
      type: Boolean,
      default: false
    }
  },
  data: function (vm) { return ({
    state: {
      activeTab: vm.activeTab || filterTabs(vm).shift().data.key || 0
    }
  }); },
  watch: {
    activeTab: function activeTab (val) {
      this.state.activeTab = val;
    }
  },
  computed: {
    activeTabContent: {
      get: function get$$1 () {
        var this$1 = this;
        return filterTabs(this)
          .filter(function (node) { return this$1.isActive(node.data[TAB_ID]); })[0]
      },
      cache: false
    }
  },
  methods: {
    getTabs: function getTabs () {
      var this$1 = this;
      return filterTabs(this)
        .filter(function (node, index) {
          if (!node.componentOptions) {
            isNotProd$1 && warn(("vk-tabs -> failed to process '" + (node.tag) + "', seems is not a stateful component"), this$1);
            return false
          }
          node.key = get(node, 'data.key', index);
          node.data[TAB_ID] = node.key;
          return true
        })
    },
    setActiveTab: function setActiveTab (id) {
      this.state.activeTab = id;
      this.$emit('update:activeTab', id);
    },
    isActive: function isActive (id) {
      return JSON.stringify(this.state.activeTab) === JSON.stringify(id)
    }
  }
}
function filterTabs (vm) {
  return vm.$slots.default.filter(function (n) { return n.tag; })
}

var ElementTabs = {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: function (val) { return !val || /^(left|right|center|justify)$/.test(val); }
    },
    flipped: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
    var obj;
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;
    var align = props.align;
    var flipped = props.flipped;
    return h('ul', mergeData(data, {
      class: ['uk-tab', ( obj = {
        'uk-tab-bottom': flipped,
        'uk-child-width-expand': align === 'justify'
      }, obj[("uk-flex-" + align)] = /^(right|center)$/.test(align), obj)]
    }), children)
  }
}

var ElementTabsVertical = {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: function (val) { return !val || /^(left|right)$/.test(val); }
    }
  },
  render: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var align = props.align;
    return h('ul', mergeData(data, {
      class: ['uk-tab', ("uk-tab-" + align)]
    }), children)
  }
}

var ElementTabsItem = {
  functional: true,
  props: {
    icon: {},
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var listeners = ref.listeners;
    var children = ref.children;
    var active = props.active;
    var disabled = props.disabled;
    var title = props.title;
    var icon$$1 = props.icon;
    delete data.on;
    return h('li', mergeData(data, {
      class: {
        'uk-active': active && !disabled,
        'uk-disabled': disabled
      }
    }), [
      h('a', { on: listeners }, [
        title,
        icon$$1 && h(ElementIcon, {
          class: 'uk-margin-small-left'
        }, [ icon$$1 ])
      ]),
      children
    ])
  }
}

var tabs = {
  name: 'VkTabs',
  extends: core$2,
  mixins: [EventsMixin],
  props: ElementTabs.props,
  render: function render (h) {
    var this$1 = this;
    var ref = this;
    var flipped = ref.flipped;
    var animation = ref.animation;
    var keepAlive = ref.keepAlive;
    var $props = ref.$props;
    var Tabs = this.getTabs();
    Tabs = Tabs.map(function (node, index) {
      var obj;
      var Tab = {
        functional: true,
        render: node.componentOptions.Ctor.options.tabRender
      };
      return h(Tab, ( obj = {}, obj[TAB_ID] = node.data[TAB_ID], obj.props = assign({}, node.componentOptions.propsData, {
          active: this$1.isActive(node.data[TAB_ID])
        }), obj))
    });
    return h('div', {
      class: {
        'uk-flex uk-flex-column-reverse': flipped
      }
    }, [
      h(ElementTabs, { props: $props }, Tabs),
      h('div', {
        class: { 'uk-margin': flipped }
      }, [
        h(Transition$1, {
          props: { name: animation }
        }, [
          keepAlive
            ? h('keep-alive', [ this.activeTabContent ])
            : this.activeTabContent
        ])
      ])
    ])
  }
}

var tabsVertical = {
  name: 'VkTabsVertical',
  extends: core$2,
  props: ElementTabsVertical.props,
  render: function render (h) {
    var this$1 = this;
    var ref = this;
    var align = ref.align;
    var animation = ref.animation;
    var keepAlive = ref.keepAlive;
    var $props = ref.$props;
    var Tabs = this.getTabs().map(function (node, index) {
      var obj;
      var Tab = {
        functional: true,
        render: node.componentOptions.Ctor.options.tabRender
      };
      return h(Tab, ( obj = {}, obj[TAB_ID] = node.data[TAB_ID], obj.props = assign({}, node.componentOptions.propsData, {
          active: this$1.isActive(node.data[TAB_ID])
        }), obj))
    });
    return h('div', {
      class: ['uk-grid', {
        'uk-flex uk-flex-row-reverse': align === 'right'
      }]
    }, [
      h('div', { class: 'uk-width-auto' }, [
        h(ElementTabsVertical, { props: $props }, Tabs)
      ]),
      h('div', { class: 'uk-width-expand' }, [
        h(Transition$1, {
          props: { name: animation }
        }, [
          keepAlive
            ? h('keep-alive', [ this.activeTabContent ])
            : this.activeTabContent
        ])
      ])
    ])
  }
}

var tabs_Item = {
  name: 'VkTabsItem',
  props: assign({}, ElementTabsItem.props, {
    icon: {
      type: String
    }
  }),
  render: function render (h) {
    return h('div', this.$slots.default)
  },
  tabRender: function tabRender (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    props.icon = props.icon && h(("vk-icons-" + (props.icon)));
    return h(ElementTabsItem, mergeData(data, {
      props: props,
      on: {
        click: function (e) {
          e.preventDefault();
          parent.setActiveTab(data[TAB_ID]);
        }
      }
    }), children)
  }
}



var components = /*#__PURE__*/Object.freeze({
Breadcrumb: breadcrumb,
BreadcrumbItem: breadcrumb_Item,
Button: button,
ButtonLink: buttonLink,
ButtonGroup: buttonGroup,
Card: card,
CardTitle: card_Title,
Drop: Drop,
Dropdown: Dropdown,
Grid: Grid,
Icon: icon,
IconLink: iconLink,
IconButton: iconButton,
IconImage: iconImage,
Iconnav: iconnav,
IconnavVertical: iconnavVertical,
IconnavItem: iconnav_Item,
Label: label,
Modal: modal,
ModalFull: modalFull,
ModalClose: modal_Close,
ModalFullClose: modalFull_Close,
ModalTitle: modal_Title,
Nav: nav$1,
NavDropdown: navDropdown,
NavItem: nav_Item,
NavItemDivider: nav_ItemDivider,
NavItemHeader: nav_ItemHeader,
NavItemParent: nav_ItemParent,
Navbar: navbar,
NavbarFull: navbarFull,
NavbarDropbar: navbarDropbar,
NavbarItem: navbar_Item,
NavbarLogo: navbar_Logo,
NavbarToggle: navbar_Toggle,
NavbarNav: navbar_Nav,
NavbarNavItem: navbar_Nav_Item,
NavbarNavDropdown: navbar_Nav_Dropdown,
NavbarNavDropdownNav: navbar_Nav_Dropdown_Nav,
Notification: notification,
Offcanvas: offcanvas,
OffcanvasContent: offcanvasContent,
OffcanvasBar: offcanvas_Bar,
OffcanvasClose: offcanvas_Close,
Pagination: pagination,
PaginationPages: pagination_Pages,
PaginationPageFirst: pagination_PageFirst,
PaginationPagePrev: pagination_PagePrev,
PaginationPageNext: pagination_PageNext,
PaginationPageLast: pagination_PageLast,
Scrollspy: scrollspy,
ScrollspyNav: scrollspyNav,
SkeletonImage: skeletonImage,
SkeletonText: skeletonText,
SkeletonTitle: skeletonTitle,
Spinner: spinner,
Sticky: sticky,
Subnav: subnav,
SubnavItem: subnav_Item,
SubnavItemDropdown: subnav_ItemDropdown,
Table: Table,
TableTree: tableTree,
TableColumn: Column,
TableColumnSort: table_ColumnSort,
TableColumnSelect: table_ColumnSelect,
TableColumnTree: table_ColumnTree,
Tabs: tabs,
TabsVertical: tabsVertical,
TabsItem: tabs_Item
});

var NAMESPACE$3 = '__vkScroll';
var index$1 = {
  bind: function bind$$1 (el, binding, vnode) {
    el[NAMESPACE$3] = {};
  },
  inserted: function inserted (el, binding, vnode) {
    el[NAMESPACE$3].options = getOptions$3({ binding: binding, vnode: vnode });
    el[NAMESPACE$3].unbind = on(el, 'click', function (e) {
      var opts = el[NAMESPACE$3].options;
      var isAnchor = e.target.nodeName === 'A';
      if (!isAnchor || (e.defaultPrevented && !opts.force)) {
        return
      }
      if (e.target === el || matches$1(el, e.target, opts.target)) {
        e.preventDefault();
        scrollTo(el, e.target, escape(e.target.hash).substr(1), opts);
      }
    });
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    el[NAMESPACE$3].options = getOptions$3({ binding: binding, vnode: vnode });
  },
  unbind: function unbind (el) {
    if (!el[NAMESPACE$3]) {
      return
    }
    el[NAMESPACE$3].unbind();
    delete el[NAMESPACE$3];
  }
}
function scrollTo (el, fromEl, toEl, options) {
  toEl = (toEl && $(toEl)) || document.body;
  var docHeight = height(document);
  var winHeight = height(window);
  var target = offset(toEl).top - options.offset;
  if (target + winHeight > docHeight) {
    target = docHeight - winHeight;
  }
  if (!trigger(el, 'beforeScroll', { from: fromEl, to: toEl })) {
    return
  }
  var start = Date.now();
  var startY = window.pageYOffset;
  var step = function () {
    var currentY = startY + (target - startY) * ease(
      clamp((Date.now() - start) / options.duration)
    );
    window.scrollTo(window.pageXOffset, currentY);
    if (currentY !== target) {
      requestAnimationFrame(step);
    } else {
      trigger(el, 'afterScroll', { from: fromEl, to: toEl });
    }
  };
  step();
}
function ease (k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}
function getOptions$3 (ctx) {
  var ref = ctx.binding;
  var value = ref.value;
  var modifiers = ref.modifiers;
  if (isString(value)) {
    value = { target: value };
  }
  return assign({
    offset: 0,
    target: 'a',
    force: false,
    duration: 1000
  }, modifiers, value)
}
function matches$1 (el, target, selector) {
  var matches$$1 = $$(("" + selector), el);
  var i = matches$$1.length;
  while (--i >= 0 && matches$$1[i] !== target) {}
  return i > -1
}

var NAMESPACE$4 = '__vkTooltip';
var index$2 = {
  bind: function bind$$1 (el, binding, vnode) {
    el[NAMESPACE$4] = {
      vnode: vnode,
      state: null,
      options: getOptions$4({ binding: binding })
    };
    if (hasAttr(el, 'title')) {
      el[NAMESPACE$4].attrTitle = attr(el, 'title');
      attr(el, { title: '' });
    }
    el[NAMESPACE$4].title = el[NAMESPACE$4].options.title || el[NAMESPACE$4].attrTitle;
  },
  inserted: function inserted (el, binding, vnode) {
    bindEvents(el);
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    el[NAMESPACE$4].options = getOptions$4({ binding: binding });
    el[NAMESPACE$4].title = el[NAMESPACE$4].options.title || el[NAMESPACE$4].attrTitle;
  },
  unbind: function unbind (el, binding, vnode) {
    if (!el[NAMESPACE$4]) {
      return
    }
    _hide(el);
    attr(el, { title: el[NAMESPACE$4].attrTitle || null });
    el[NAMESPACE$4].unbindEvents();
    delete el[NAMESPACE$4];
  }
}
function bindEvents (el) {
  var events = [
    on(el, ("focus " + pointerEnter + " " + pointerDown), function (e) {
      if (e.type !== pointerDown || !isTouch(e)) {
        show(el);
      }
    }),
    on(el, 'blur', function (e) { return hide(el); }),
    on(el, pointerLeave, function (e) {
      if (!isTouch(e)) {
        hide(el);
      }
    })
  ];
  el[NAMESPACE$4].unbindEvents = function () { return events.forEach(function (unbind) { return unbind(); }); };
}
function toggleIn (el) {
  var ref = el[NAMESPACE$4].options;
  var cls = ref.cls;
  var position$$1 = ref.position;
  var animation = ref.animation;
  var duration = ref.duration;
  if (!trigger(el, 'beforeShow')) {
    return Promise.reject()
  }
  var origin = el[NAMESPACE$4].origin = getOrigin(position$$1);
  var tooltip = el[NAMESPACE$4].tooltip = createTooltip(el);
  positionTooltip(el);
  addClass(tooltip, cls);
  el[NAMESPACE$4].hideTimer = setInterval(function () {
    if (!isVisible(el)) {
      hide(el);
    }
  }, 150);
  el[NAMESPACE$4].state = 'in';
  trigger(el, 'show');
  return Animation
    .in(tooltip, ("uk-animation-" + (animation[0])), duration, origin)
    .then(function () {
      el[NAMESPACE$4].state = 'active';
      trigger(el, 'shown');
    })
    .catch(function () {})
}
function toggleOut (el) {
  var ref = el[NAMESPACE$4];
  var tooltip = ref.tooltip;
  var ref$1 = el[NAMESPACE$4].options;
  var animation = ref$1.animation;
  var duration = ref$1.duration;
  if (!trigger(el, 'beforeHide')) {
    return Promise.reject()
  }
  Animation.cancel(tooltip);
  el[NAMESPACE$4].state = 'out';
  trigger(el, 'hide');
  if (!animation[1]) {
    return Promise.resolve().then(function () { return _hide(el); })
  }
  return Animation
    .out(tooltip, ("uk-animation-" + (animation[1])), duration, origin)
    .then(function () { return _hide(el); })
    .catch(function () {})
}
function show (el) {
  var ref = el[NAMESPACE$4].options;
  var delay = ref.delay;
  var ref$1 = el[NAMESPACE$4];
  var state = ref$1.state;
  var title = ref$1.title;
  if (!title || state === 'active' || el[NAMESPACE$4].showTimer) {
    return
  }
  if (state === 'out') {
    Animation.cancel(el);
    _hide(el);
  }
  el[NAMESPACE$4].showTimer = setTimeout(function () { return toggleIn(el); }, delay);
}
function hide (el) {
  if (!el[NAMESPACE$4]) {
    return
  }
  var ref = el[NAMESPACE$4];
  var state = ref.state;
  clearAllTimers(el);
  if (state === 'out' || (matches(el, 'input') && isFocused(el))) {
    return
  }
  toggleOut(el);
}
function _hide (el) {
  if (!el[NAMESPACE$4]) {
    return
  }
  var ref = el[NAMESPACE$4];
  var tooltip = ref.tooltip;
  var ref$1 = el[NAMESPACE$4].options;
  var cls = ref$1.cls;
  attr(el, 'aria-expanded', false);
  removeClass(tooltip, cls);
  tooltip && remove(tooltip);
  el[NAMESPACE$4].state = null;
  el[NAMESPACE$4].tooltip = null;
  trigger(el, 'hidden');
}
function clearAllTimers (el) {
  clearTimeout(el[NAMESPACE$4].showTimer);
  clearTimeout(el[NAMESPACE$4].hideTimer);
  el[NAMESPACE$4].showTimer = null;
  el[NAMESPACE$4].hideTimer = null;
}
function positionTooltip (el) {
  var target = el;
  var ref = el[NAMESPACE$4];
  var tooltip = ref.tooltip;
  var ref$1 = el[NAMESPACE$4].options;
  var clsPos = ref$1.clsPos;
  var position$$1 = ref$1.position;
  var ref$2 = el[NAMESPACE$4].options;
  var offset$$1 = ref$2.offset;
  var node;
  var ref$3 = position$$1.split('-');
  var dir = ref$3[0];
  var align = ref$3[1]; if ( align === void 0 ) align = 'center';
  removeClasses(tooltip, (clsPos + "-(top|bottom|left|right)(-[a-z]+)?"));
  css(tooltip, { top: '', left: '' });
  var axis = getAxis$1(position$$1);
  offset$$1 = isNumeric(offset$$1)
    ? offset$$1
    : (node = $(offset$$1))
      ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
      : 0;
  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));
  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);
  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
    : ("" + (dir === 'top' ? -1 * offset$$1 : offset$$1));
  var targetOffset = null;
  var ref$4 = positionAt(
    tooltip,
    target,
    elAttach,
    targetAttach,
    elOffset,
    targetOffset,
    true
  ).target;
  var x = ref$4.x;
  var y = ref$4.y;
  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;
  toggleClass(tooltip, (clsPos + "-" + dir + "-" + align), el[NAMESPACE$4].options.offset === false);
  return {
    dir: dir,
    align: align
  }
}
function getOptions$4 (ctx) {
  var ref = ctx.binding;
  var value = ref.value;
  var modifiers = ref.modifiers;
  if (isString(value)) {
    value = { title: value };
  }
  if (Object.keys(modifiers).length) {
    var firstKey = Object.keys(modifiers)[0];
    modifiers = { position: firstKey };
  }
  var options = assign({
    delay: 0,
    title: '',
    offset: false,
    duration: 100,
    position: 'top',
    container: true,
    cls: 'uk-active',
    clsPos: 'uk-tooltip',
    animation: 'scale-up'
  }, modifiers, value);
  options.position = hyphenate(options.position);
  options.animation = options.animation.split(' ');
  {
    var pos = options.position;
    if (!(/^(top|bottom)-(left|right)$/.test(pos) || /^(top|bottom|left|right)$/.test(pos))) {
      warn(("v-vk-tooltip -> '" + pos + "' is not a valid position value"), ctx.vnode);
    }
  }
  return options
}
function getAxis$1 (position$$1) {
  var ref = position$$1.split('-');
  var dir = ref[0];
  return dir === 'top' || dir === 'bottom' ? 'y' : 'x'
}
function getContainer (el) {
  var ref = el[NAMESPACE$4];
  var vnode = ref.vnode;
  var ref$1 = el[NAMESPACE$4].options;
  var container = ref$1.container;
  return (container === true && vnode.context.$root.$el) || (container && $(container))
}
function createTooltip (el) {
  var ref = el[NAMESPACE$4];
  var title = ref.title;
  var ref$1 = el[NAMESPACE$4].options;
  var clsPos = ref$1.clsPos;
  return append(getContainer(el), ("<div class=\"" + clsPos + "\" aria-hidden>\n    <div class=\"" + clsPos + "-inner\">" + title + "</div>\n  </div>"))
}
function getOrigin (position$$1) {
  var dir = position$$1[0];
  var align = position$$1[1];
  return getAxis$1(position$$1) === 'y'
    ? ((flipPosition(dir)) + "-" + align)
    : (align + "-" + (flipPosition(dir)))
}
function isFocused (el) {
  return el === document.activeElement
}

var NAMESPACE$5 = '__vkHeightMatch';
var index$3 = {
  bind: function bind$$1 (el, binding, vnode) {
    el[NAMESPACE$5] = {};
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update$3(el, { binding: binding, vnode: vnode }); }
    );
    el[NAMESPACE$5].unbind = on(window, 'resize', function () { return update$3(el, { binding: binding, vnode: vnode }); }
    );
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update$3(el, { binding: binding, vnode: vnode }); }
    );
  },
  unbind: function unbind (el) {
    if (!el[NAMESPACE$5]) {
      return
    }
    el[NAMESPACE$5].unbind();
    delete el[NAMESPACE$5];
  }
}
function update$3 (el, ctx) {
  var opts = getOptions$5(ctx);
  var elements = $$(opts.target, el);
  css(elements, 'minHeight', '');
  var rows = getRows$1(elements, opts.row);
  rows.forEach(function (els) {
    var ref = match(els);
    var height = ref.height;
    var elements = ref.elements;
    css(elements, 'minHeight', height);
  });
}
function getOptions$5 (ctx) {
  var ref = ctx.binding;
  var value = ref.value;
  if (isString(value)) {
    value = { target: value };
  }
  return assign({
    target: '> *',
    row: true
  }, value)
}
function getRows$1 (elements, row) {
  if (!row) {
    return [ elements ]
  }
  var lastOffset = false;
  return elements.reduce(function (rows, el) {
    if (lastOffset !== el.offsetTop) {
      rows.push([el]);
    } else {
      rows[rows.length - 1].push(el);
    }
    lastOffset = el.offsetTop;
    return rows
  }, [])
}
function match (elements) {
  if (elements.length < 2) {
    return {}
  }
  var max = 0;
  var heights = [];
  elements.forEach(function (el) {
    var style;
    var hidden;
    if (!isVisible(el)) {
      style = attr(el, 'style');
      hidden = attr(el, 'hidden');
      attr(el, {
        style: ((style || '') + ";display:block !important;"),
        hidden: null
      });
    }
    max = Math.max(max, el.offsetHeight);
    heights.push(el.offsetHeight);
    if (!isUndefined(style)) {
      attr(el, {style: style, hidden: hidden});
    }
  });
  elements = elements.filter(function (el, i) { return heights[i] < max; });
  return { height: max, elements: elements }
}



var directives = /*#__PURE__*/Object.freeze({
Margin: VkMargin,
Scroll: index$1,
Tooltip: index$2,
HeightMatch: index$3,
HeightViewport: VkHeightViewport
});

var Vuikit = {
  components: components,
  directives: directives,
  install: function install (Vue) {
    each(components, function (def, name) {
      Vue.component(("Vk" + name), def);
    });
    each(directives, function (def, name) {
      Vue.directive(("Vk" + name), def);
    });
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit);
}

return Vuikit;

})));
