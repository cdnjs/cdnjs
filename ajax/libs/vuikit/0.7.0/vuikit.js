/**
* Vuikit 0.7.0
* (c) 2018 Miljan Aleksic
* @license MIT
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vuikit = factory());
}(this, (function () { 'use strict';

function toArray (val) {
  if (val === null || isUndefined(val)) {
    return []
  }
  return isArray(val) ? val : [val]
}

function toCapital (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toFloat (value) {
  return parseFloat(value) || 0
}

function toInteger (val) {
  return parseInt(val, 10)
}

function isArray (val) {
  return Array.isArray(val)
}

function isDocument (obj) {
  return isObject(obj) && obj.nodeType === 9
}

function isEmpty (val) {
  if (isObject(val)) {
    return Object.keys(val).length === 0
  }
  if (isString(val)) {
    return val === ''
  }
  if (isArray(val)) {
    return val.length === 0
  }
  return !val
}

function isFunction (val) {
  return toString$1(val) === '[object Function]'
}
function toString$1 (val) {
  return Object.prototype.toString.call(val)
}

function isInteger (val) {
  return Number.isInteger(val)
}

function isObject (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

function isString (val) {
  return typeof val === 'string'
}

function isUndefined (val) {
  return val === undefined
}

function isWindow (obj) {
  return isObject(obj) && obj === obj.window
}

function cloneArray (arr) {
  return arr.slice(0)
}

function debounce (fn, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) { fn.apply(context, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      fn.apply(context, args);
    }
  }
}

function each (obj, cb) {
  for (var key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}

var strPrototype = String.prototype;
var endsWithFn = strPrototype.endsWith || function (search) {
  return this.substr(-1 * search.length) === search
};
function endsWith (str, search) {
  return endsWithFn.call(str, search)
}

function get (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? get$1(obj, path)
    : undefined;
  return result === undefined
    ? defVal
    : result
}
function get$1 (obj, path) {
  return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, obj)
}

var strPrototype$1 = String.prototype;
var includesFn = function (search) { return ~this.indexOf(search) };
var includesStr = strPrototype$1.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;
function includes (obj, search) {
  return obj && (isString(obj)
    ? includesStr
    : includesArray
  ).call(obj, search)
}

function merge (host) {
  var donors = slice$1(arguments, 1);
  donors.forEach(function (donor) {
    Object.keys(donor).forEach(function (key) {
      host[key] = donor[key];
    });
  });
  return host
}
function slice$1 (arr, i) {
  return Array.prototype.slice.call(arr, i)
}

function getRange (start, stop, step) {
  if ( step === void 0 ) step = 1;
  if (typeof stop === 'undefined') {
    stop = start;
    start = 0;
  }
  return Array.from(new Array(Math.floor((stop - start) / step)), function (x, i) { return start + (i * step); })
}

var strPrototype$2 = String.prototype;
var startsWithFn = strPrototype$2.startsWith || function (search) {
  return this.lastIndexOf(search, 0) === 0
};
function startsWith (str, search) {
  return startsWithFn.call(str, search)
}

var breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-breadcrumb"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Breadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item) {
        var props = item.componentOptions.propsData;
        props.active = this$1.location === props.path;
      });
    }
  }
}

var breadcrumbItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active }},[(!_vm.disabled && !_vm.active)?_c('a',{on:{"click":function($event){$event.preventDefault();_vm.$parent.$emit('change', _vm.path);}}},[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2):_c('span',[_vm._t("default",[_vm._v(" "+_vm._s(_vm.label)+" ")])],2)])},staticRenderFns: [],
  name: 'BreadcrumbItem',
  props: {
    label: String,
    path: {
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
  }
}

function mergeData(){
var arguments$1 = arguments;
for(var e,a,s={},t=arguments.length;t--;){ for(var r=0,c=Object.keys(arguments[t]);r<c.length;r++){ switch(e=c[r]){case"class":case"style":case"directives":Array.isArray(s[e])||(s[e]=[]), s[e]=s[e].concat(arguments$1[t][e]);break;case"staticClass":if(!arguments$1[t][e]){ break; }void 0===s[e]&&(s[e]=""), s[e]&&(s[e]+=" "), s[e]+=arguments$1[t][e].trim();break;case"on":case"nativeOn":s[e]||(s[e]={});for(var o=0,n=Object.keys(arguments[t][e]);o<n.length;o++){ a=n[o], s[e][a]?s[e][a]=[].concat(s[e][a],arguments$1[t][e][a]):s[e][a]=arguments$1[t][e][a]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":s[e]||(s[e]={}), s[e]=__assign({},arguments$1[t][e],s[e]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:s[e]||(s[e]=arguments$1[t][e]);} } }return s}var __assign=Object.assign||function(e){
var arguments$1 = arguments;
for(var a,s=1,t=arguments.length;s<t;s++){a=arguments$1[s];for(var r in a){ Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]); }}return e};

var sizes = ['large', 'small'];
var styles = ['default', 'primary', 'secondary', 'danger', 'text', 'link'];
var button = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: function (style) { return styles.indexOf(style) !== -1; }
    },
    size: {
      type: String,
      validator: function (size) { return !size || sizes.indexOf(size) !== -1; }
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render: function render (h, ref) {
    var obj;
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var disabled = props.disabled;
    var type = props.type;
    var size = props.size;
    var active = props.active;
    var htmlType = props.htmlType;
    var def = {
      attrs: {
        type: htmlType,
        disabled: disabled
      },
      class: ['uk-button', ("uk-button-" + type), ( obj = {
        'uk-active': active
      }, obj[("uk-button-" + size)] = size, obj)]
    };
    return h('button', mergeData(data, def), [
      children
    ])
  }
}

function noop () {}
var warn = noop;

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

var buttonGroupCheckbox = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var listeners = ref.listeners;
    var buttons = children.filter(function (n) { return n.tag; });
    if (!validate(data, buttons)) {
      return
    }
    var groupValue = toArray(data.model.value);
    buttons.forEach(function (btn) {
      var index = buttons.indexOf(btn);
      var value = btn.data.attrs.value;
      var isActive = includes(groupValue, value);
      if (isActive) {
        btn.data.class.push('uk-active');
      }
      btn.data.on = {
        click: function () {
          if (isActive) {
            groupValue.splice(index, 1);
          } else {
            groupValue.splice(index, 0, value);
          }
          listeners.input(groupValue);
        }
      };
    });
    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
}
function validate (data, buttons) {
  if (!data.model) {
    warn('ButtonGroupCheckbox declaration is missing the v-model directive.');
    return false
  }
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupCheckbox buttons declaration is missing the 'value' prop.");
    return false
  }
  return true
}

var buttonGroupRadio = {
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var listeners = ref.listeners;
    var buttons = children.filter(function (n) { return n.tag; });
    if (!validate$1(data, buttons)) {
      return
    }
    var groupValue = data.model.value;
    buttons.forEach(function (btn) {
      var value = btn.data.attrs.value;
      if (value === groupValue) {
        btn.data.class.push('uk-active');
      }
      btn.data.on = {
        click: function () { return listeners.input(value); }
      };
    });
    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
}
function validate$1 (data, buttons) {
  if (!data.model) {
    warn('ButtonGroupRadio declaration is missing the v-model directive.');
    return false
  }
  var btnValues = buttons.map(function (btn) { return btn.data.attrs.value; });
  if (includes(btnValues, undefined)) {
    warn("Some of the ButtonGroupRadio buttons declaration is missing the 'value' prop.");
    return false
  }
  return true
}

var padding = ['small', 'large'];
var types = ['primary', 'secondary', 'blank'];
var Header = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-header' }, children);
}
};
var Body = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-body' }, children);
}
};
var Footer = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-footer' }, children);
}
};
var Badge = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-card-badge' }, children);
}
};
var card = {
  functional: true,
  props: {
    type: {
      type: String,
      validator: function (val) { return !val || includes(types, val); }
    },
    padding: {
      type: String,
      validator: function (val) { return !val || includes(padding, val); }
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var obj;
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var slots = ref.slots;
    var type = props.type;
    var padding = props.padding;
    var hover = props.hover;
    var _slots = slots();
    return h('div', mergeData(data, {
      class: ['uk-card', ( obj = {
        'uk-card-default': !includes(types, type),
        'uk-card-hover': hover
      }, obj[("uk-card-" + type)] = type, obj[("uk-card-" + padding)] = padding, obj)]
    }), [
      _slots.header && h(Header, _slots.header),
      _slots.default && h(Body, _slots.default),
      _slots.footer && h(Footer, _slots.footer),
      _slots.badge && h(Badge, _slots.badge)
    ])
  }
}

var cardTitle = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h('h3', mergeData(data, { class: 'uk-card-title' }), children)
  }
}

var boundEvents = {};
function on (el, type, listener, namespace) {
  type.split(' ')
    .forEach(function (type) { return _on(el, type, listener, namespace); });
  return function () { return off(el, type, namespace); }
}
function _on (el, type, listener, namespace) {
  var events = getEvents(namespace);
  events.push({ el: el, type: type, listener: listener });
  el.addEventListener(type, listener);
}
function off (el, type, namespace) {
  type.split(' ')
    .forEach(function (type) { return removeEvent(el, type, namespace); });
}
function one (el, type, listener, condition) {
  if ( condition === void 0 ) condition = false;
  var off = on(el, type, function (e) {
    var result = !condition || condition(e);
    if (result) {
      off();
      listener(e, result);
    }
  });
  return off
}
function offAll (namespace) {
  removeAllEvents(namespace);
}
function getEvents (namespace) {
  if ( namespace === void 0 ) namespace = 'default';
  boundEvents[namespace] = boundEvents[namespace] || [];
  return boundEvents[namespace]
}
function findEvent (el, type, namespace) {
  if ( namespace === void 0 ) namespace = 'default';
  var events = getEvents(namespace);
  return events.find(function (bound) {
    return bound.el === el && bound.type === type
  })
}
function removeEvent (el, type, namespace) {
  if ( namespace === void 0 ) namespace = 'default';
  var event = findEvent(el, type, namespace);
  if (event) {
    el.removeEventListener(type, event.listener);
    var index = boundEvents[namespace].indexOf(event);
    boundEvents[namespace].splice(index, 1);
  }
}
function removeAllEvents (namespace) {
  if ( namespace === void 0 ) namespace = 'default';
  var events = getEvents(namespace);
  if (events) {
    for (var i = 0; i < events.length; ++i) {
      var event = events[i];
      event.el.removeEventListener(event.type, event.listener);
    }
    deleteNamespace(namespace);
  }
}
function deleteNamespace (namespace) {
  if ( namespace === void 0 ) namespace = 'default';
  if (boundEvents[namespace] !== undefined) {
    delete boundEvents[namespace];
  }
}

function css (el, style, val) {
  if (isUndefined(val)) {
    return _getStyle(el, style)
  } else {
    el.style[style] = val;
  }
}
function _getStyle (el, style) {
  if (!el || !style) {
    return
  }
  return window.getComputedStyle
    ? window.getComputedStyle(el, null)[style]
    : el.currentStyle[style]
}

var dirs = {
  width: ['x', 'left', 'right'],
  height: ['y', 'top', 'bottom']
};
var height = dimension('height');
var width = dimension('width');
function positionAt (ref) {
  var element = ref.element;
  var target = ref.target;
  var elAttach = ref.elAttach;
  var targetAttach = ref.targetAttach;
  var elOffset = ref.elOffset;
  var targetOffset = ref.targetOffset;
  var flip = ref.flip;
  var boundary = ref.boundary;
  elAttach = getPos(elAttach);
  targetAttach = getPos(targetAttach);
  var flipped = { element: elAttach, target: targetAttach };
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
  boundary = getDimensions(boundary || getWindow(element));
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
        if (elAttach[dir] === 'center') {
          apply(centerOffset, centerTargetOffset) || apply(-centerOffset, -centerTargetOffset);
        } else {
          apply(elemOffset, targetOffset);
        }
      }
      function apply (elemOffset, targetOffset) {
        var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;
        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
          position[align] = newVal
          ;['element', 'target'].forEach(function (el) {
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
  if (coordinates) {
    var currentOffset = offset(element);
    var pos = css(element, 'position');['left', 'top'].forEach(function (prop) {
      if (prop in coordinates) {
        var value = css(element, prop);
        element.style[prop] = ((coordinates[prop] - currentOffset[prop]) +
          toFloat(pos === 'absolute' && value === 'auto' ? position$1(element)[prop] : value)) + "px";
      }
    });
    return
  }
  return getDimensions(element)
}
function getDimensions (element) {
  var ref = getWindow(element);
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
function position$1 (element) {
  var parent = offsetParent(element);
  var parentOffset = parent === docEl(element) ? {top: 0, left: 0} : offset(parent);
  return ['top', 'left'].reduce(function (props, prop) {
    var propName = toCapital(prop);
    props[prop] -= parentOffset[prop] +
      (toFloat(css(element, ("margin" + propName))) || 0) +
      (toFloat(css(parent, ("border" + propName + "Width"))) || 0);
    return props
  }, offset(element))
}
function offsetParent (element) {
  var parent = element.offsetParent;
  while (parent && css(parent, 'position') === 'static') {
    parent = parent.offsetParent;
  }
  return parent || docEl(element)
}
function dimension (prop) {
  var propName = toCapital(prop);
  return function (element, value) {
    if (isUndefined(value)) {
      if (isWindow(element)) {
        return element[("inner" + propName)]
      }
      if (isDocument(element)) {
        var doc = element.documentElement;
        return Math.max(doc.offsetHeight, doc.scrollHeight)
      }
      value = css(element, prop);
      value = value === 'auto' ? element[("offset" + propName)] : toFloat(value) || 0;
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
  return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(toCapital).reduce(function (value, prop) { return value -
            toFloat(css(element, ("padding" + prop))) -
            toFloat(css(element, ("border" + prop + "Width"))); }
    , value) : value
}
function getWindow (element) {
  return isWindow(element)
    ? element
    : document$1(element).defaultView
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
function getPositionAxis (position) {
  var ref = position.split('-');
  var dir = ref[0];
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}
function document$1 (element) {
  return element.ownerDocument
}
function docEl (element) {
  return document$1(element).documentElement
}
function isVisible (element) {
  return toArray(element).some(function (element) { return element.offsetHeight; })
}

var supportsMultiple;
var supportsForce;
var supportsClassList;
function hasClass (el, className) {
  return el.classList.contains(className)
}
function addClass (el, classes) {
  apply(el, classes, 'add');
}
function removeClass (el, classes) {
  apply(el, classes, 'remove');
}
function toggleClass (el, classes) {
  if (!supportsClassList || !classes) {
    return
  }
  var args = getArgs(classes);
  var force = !isString(args[args.length - 1])
    ? args.pop()
    : undefined;
  toArray(el).forEach(function (_el) {
    var classList = _el.classList;
    for (var i = 0; i < args.length; i++) {
      if (supportsForce) {
        _el.classList.toggle(args[i], force);
      } else {
        var check = !isUndefined(force)
          ? force
          : !classList.contains(args[i]);
        var action = check
          ? 'add'
          : 'remove';
        classList[action](args[i]);
      }
    }
  });
}
function apply (element, args, fn) {
  args = getArgs(args).filter(function (arg) { return arg; });
  supportsClassList && args.length && toArray(element).forEach(function (ref) {
    var classList = ref.classList;
    supportsMultiple
      ? classList[fn].apply(classList, args)
      : args.forEach(function (cls) { return classList[fn](cls); });
  });
}
function getArgs (args) {
  return toArray(args).reduce(function (args, arg) {
    args.push.apply(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : [arg]);
    return args
  }, [])
}
(function () {
  var list = document.createElement('_').classList;
  if (list) {
    list.add('a', 'b');
    list.toggle('c', false);
    supportsMultiple = list.contains('b');
    supportsForce = !list.contains('c');
    supportsClassList = true;
  }
  list = null;
})();

var uid = 'v-position';
var positions$1 = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom'
];
var Position = {
  inserted: function inserted (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);
    if (ctx) {
      position(ctx);
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    var ctx = getContext(el, binding, vnode);
    if (ctx) {
      position(ctx);
    }
  },
  unbind: function unbind (el, binding, vnode) {
    offAll(uid);
  }
}
function position (ctx) {
  var el = ctx.el;
  var props = ctx.props;
  var vnode = ctx.vnode;
  var target = props.target;
  var position = props.position;
  var offset$$1 = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;
  var classPrefix = props.classPrefix;
  if (!includes(positions$1, position)) {
    warn('Invalid v-position position', vnode);
  }
  var ref = position.split('-');
  var dir = ref[0];
  var align = ref[1];
  var classesRx = new RegExp((classPrefix + "-(top|bottom|left|right)(-[a-z]+)?"));
  el.className = el.className.replace(classesRx, '');
  css(el, { top: '', left: '' });
  var axis = getPositionAxis(position);
  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));
  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);
  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
    : (" " + (dir === 'top' ? -1 * offset$$1 : offset$$1));
  var ref$1 = positionAt({
    flip: flip,
    target: target,
    boundary: boundary,
    elAttach: elAttach,
    elOffset: elOffset,
    element: el,
    targetAttach: targetAttach,
    targetOffset: null
  }).target;
  var x = ref$1.x;
  var y = ref$1.y;
  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;
  setResizeEvent(ctx);
  if (classPrefix) {
    addClass(el, (classPrefix + "-" + dir + "-" + align));
  }
}
function getProps (ctx) {
  var vnode = ctx.vnode;
  var ref = ctx.binding;
  var value = ref.value;
  if (isUndefined(value) || !isObject(value)) {
    warn('v-position configuration is missing or is not an Object', vnode.context);
    return false
  }
  var target = value.target || null;
  var delay = get(value, 'delay', 0);
  var flip = get(value, 'flip', true);
  var classPrefix = get(value, 'classPrefix', 'v-position');
  var boundary = value.boundary || window;
  var offset$$1 = toInteger(value.offset) || 0;
  var position = value.position || 'top-center';
  if (isString(target)) {
    target = vnode.context.$refs[target];
  }
  return { target: target, delay: delay, offset: offset$$1, flip: flip, position: position, boundary: boundary, classPrefix: classPrefix }
}
function setResizeEvent (ctx) {
  off(window, 'resize', uid);
  on(window, 'resize', debounce(function () {
    position(ctx);
  }, 50), uid);
}
function getContext (el, binding, vnode) {
  var ctx = { el: el, binding: binding, vnode: vnode };
  ctx.props = getProps(ctx);
  if (!ctx.props) {
    binding.def.unbind(el, binding);
    return
  }
  return ctx
}

var isRtl = document.documentElement.getAttribute('dir') === 'rtl';

var positions = [
  'top-left',
  'top-center',
  'top-right',
  'top-justify',

  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-justify',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
];

var Drop = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    position: _vm.$position,
    boundary: _vm.$boundary,
    classPrefix: 'uk-drop'
  }),expression:"{\n    flip,\n    target: $target,\n    position: $position,\n    boundary: $boundary,\n    classPrefix: 'uk-drop'\n  }"}],class:['uk-drop', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseenter":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.triggerShow($event);},"mouseleave":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.hideOnLeave && _vm.triggerHide();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Drop',
  directives: {
    Position: Position
  },
  props: {
    // a Dom element to attach to
    target: {},
    // a Dom element as boundary
    boundary: {
      default: function () { return window; }
    },
    // a Dom element where to append the drop
    placement: {
      default: function () { return document.body; }
    },
    show: {
      type: Boolean,
      required: true
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: ("bottom-" + (isRtl ? 'right' : 'left')),
      validator: function (pos) { return includes(positions, pos); }
    },
    triggers: {
      type: String,
      default: 'hover focus'
    },
    showDelay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 100
    },
    // determines if hide should be
    // trriggered on drop mouseleave
    hideOnLeave: {
      type: Boolean,
      default: true
    },
    // determines if hide should be
    // trriggered on click outside
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    $position: function $position () {
      return this.position.replace('justify', 'center')
    },
    $dir: function $dir () {
      return this.position.split('-')[0]
    },
    $align: function $align () {
      return this.position.split('-')[1]
    },
    $style: function $style () {
      var style = {};
      var isJustified = this.$align === 'justify';

      if (!this.target || !isJustified) {
        return style
      }

      var rect = this.target.getBoundingClientRect();
      var prop = getPositionAxis(this.position) === 'y'
        ? 'width'
        : 'height';

      style[prop] = (rect[prop]) + "px";

      return style
    },
    $target: function $target () {
      return isString(this.target)
        ? get(this.$vnode.context.$refs, this.target)
        : this.target
    },
    $boundary: function $boundary () {
      return isString(this.boundary)
        ? get(this.$vnode.context.$refs, this.boundary)
        : this.boundary
    },
    $placement: function $placement () {
      return isString(this.placement)
        ? get(this.$vnode.context.$refs, this.placement)
        : this.placement
    }
  },
  watch: {
    triggers: function triggers () {
      this.removeTargetEvents(this.target);
      this.setTargetEvents(this.target);
    },
    target: function target (target$1, oldTarget) {
      this.removeTargetEvents(oldTarget);
      this.setTargetEvents();
    },
    show: function show (val) {
      var this$1 = this;

      if (val && this.triggers.match(/click/) && this.hideOnClick) {
        // trigger events when clicked outside drop
        on(window.document, 'click', function (e) {
          var clickInside = this$1.$el.contains(e.target);

          if (clickInside) {
            return
          }

          this$1.triggerHide();
        }, this._uid);
      } else {
        off(window.document, 'click', this._uid);
      }
    }
  },
  methods: {
    removeTargetEvents: function removeTargetEvents (target) {
      if (!target) {
        return
      }

      off(target, 'click mouseenter mouseleave focusin focusout', this._uid);
    },
    setTargetEvents: function setTargetEvents () {
      if (!this.$target) {
        return
      }

      if (this.triggers.match(/click/)) {
        on(this.$target, 'click', this.toggleShow, this._uid);
      }

      if (this.triggers.match(/hover/)) {
        on(this.$target, 'mouseenter', this.triggerShow, this._uid);
        on(this.$target, 'mouseleave', this.triggerHide, this._uid);
      }

      if (this.triggers.match(/focus/)) {
        on(this.$target, 'focusin', this.triggerShow, this._uid);
        on(this.$target, 'focusout', this.triggerHide, this._uid);
      }
    },
    triggerShow: function triggerShow () {
      var this$1 = this;

      clearTimeout(this.hideTimeout);

      this.showTimeout = setTimeout(function () {
        this$1.$emit('update:show', true);
      }, this.showDelay);
    },
    triggerHide: function triggerHide () {
      var this$1 = this;

      clearTimeout(this.showTimeout);

      this.hideTimeout = setTimeout(function () {
        this$1.$emit('update:show', false);
      }, this.hideDelay);
    },
    toggleShow: function toggleShow () {
      this.show
        ? this.triggerHide()
        : this.triggerShow();
    }
  },
  mounted: function mounted () {
    // placed in root to avoid being styled
    // from parent elements rules
    if (this.$placement) {
      this.$placement.appendChild(this.$el);
    }

    // set events
    this.setTargetEvents();
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}

var Dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"position",rawName:"v-position",value:({
    flip: _vm.flip,
    target: _vm.$target,
    position: _vm.$position,
    boundary: _vm.$boundary,
    classPrefix: 'uk-dropdown',
  }),expression:"{\n    flip,\n    target: $target,\n    position: $position,\n    boundary: $boundary,\n    classPrefix: 'uk-dropdown',\n  }"}],class:['uk-dropdown', { 'uk-open': _vm.show }],style:(_vm.$style),on:{"mouseenter":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.triggerShow($event);},"mouseleave":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.hideOnLeave && _vm.triggerHide();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Dropdown',
  extends: Drop
}

var dropdownNav = {
  functional: true,
  props: Dropdown.props,
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h(Dropdown, mergeData(data, { props: props }), [
      h('ul', { class: 'uk-nav uk-dropdown-nav' }, children)
    ]);
}
}

var VkIcon = {
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    viewBox: String,
    ratio: [String, Number],
    width: [String, Number],
    height: [String, Number]
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('span', mergeData(data, { class: ['uk-icon'] }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var VkIconLink = {
  functional: true,
  props: mergeData(VkIcon.props, {
    reset: {
      type: Boolean,
      default: false
    }
  }),
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var iconButton = {
  functional: true,
  props: VkIcon.props,
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      props.name
        ? h(("icon-" + (props.name)), { props: props })
        : children
    ]);
}
}

var iconnav = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      var data = ref.data;
      return h('ul', mergeData(data, { class: 'uk-iconnav' }), children);
}
}

var iconnavItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var icon = props.icon;
    return h('li', { class: { 'uk-active': active } }, [
      h(VkIconLink, mergeData(data, {
        props: { name: icon }
      }))
    ])
  }
}

var iconnavVertical = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      var data = ref.data;
      return h('ul', mergeData(data, { class: 'uk-iconnav uk-iconnav-vertical' }), children);
}
}

var obj;
var label = {
  functional: true,
  props: {
    type: {
      type: String,
      default: '',
      validator: function (val) { return !val || includes(['success', 'warning', 'danger'], val); }
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('span', mergeData(data, {
      class: ['uk-label', ( obj = {}, obj[("uk-label-" + (props.type))] = props.type, obj)]
    }), children);
}
}

var win = window;
var doc$1 = document.body;
var docEl$1 = document.documentElement;
var Observer = win.MutationObserver || win.WebKitMutationObserver;
var requestAnimationFrame = win.requestAnimationFrame || (function (fn) { return setTimeout(fn, 1000 / 60); });
var transitionend = prefix('transition', 'transition-end');
var animationstart = prefix('animation', 'animation-start');
var animationend = prefix('animation', 'animation-end');
function prefix (name, event) {
  var ucase = classify$1(name);
  var lowered = classify$1(event).toLowerCase();
  var classified = classify$1(event);
  var element = doc$1.body || docEl$1;
  var names = {};
  names[name] = lowered;
  names[("Webkit" + ucase)] = ("webkit" + classified);
  names[("Moz" + ucase)] = lowered;
  names[("o" + ucase)] = ("o" + classified + " o" + lowered);
  for (name in names) {
    if (element.style[name] !== undefined) {
      return names[name]
    }
  }
}
function classify$1 (str) {
  return str.replace(/(?:^|[-_/])(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })
}

var doc = document.documentElement;
var active;
var activeModals;
var core = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    closeOnKey: {
      type: [Number, Boolean],
      default: 27
    },
    closeOnBg: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      addClass(doc, 'uk-modal-page');
    },
    enter: function enter (el, done) {
      el.offsetWidth;
      addClass(el, 'uk-open');
      one(el, transitionend, done, function (e) { return e.target === el; });
    },
    afterEnter: function afterEnter () {
      activeModals++;
      if (active) {
        active.$emit('update:show', false);
      }
      active = this;
    },
    beforeLeave: function beforeLeave (el) {
      removeClass(el, 'uk-open');
    },
    leave: function leave (el, done) {
      one(el, transitionend, done, function (e) { return e.target === el; });
    },
    afterLeave: function afterLeave () {
      activeModals--;
      if (!activeModals) {
        removeClass(doc, 'uk-modal-page');
      }
      if (active === this) {
        active = null;
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;
    this.$root.$el.appendChild(this.$el);
    on(window, 'resize', debounce(function () {
      if (!this$1.show) {
        return
      }
      this$1.updateOverflowAuto();
    }, 30), this._uid);
    on(doc, 'keyup', function (e) {
      if (this$1.closeOnKey && e.keyCode === this$1.closeOnKey) {
        e.preventDefault();
        this$1.$emit('update:show', false);
      }
    }, this._uid);
  },
  beforeDestroy: function beforeDestroy () {
    off(doc, 'key', this._uid);
    off(window, 'resize', this._uid);
    this.$root.$el.removeChild(this.$el);
    this.afterLeave();
  }
}

var ModalTransition = {
  functional: true,
  render: function render (h, ref) {
    var modal = ref.parent;
    var children = ref.children;
    var data = ref.data;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: modal.beforeEnter,
        enter: modal.enter,
        afterEnter: modal.afterEnter,
        beforeLeave: modal.beforeLeave,
        leave: modal.leave,
        afterLeave: modal.afterLeave
      }
    };
    return h('transition', mergeData(data, def), children)
  }
}

var IconClose = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 14;
    var height = props.height || 14;
    var viewBox = props.viewBox || '0 0 14 14';
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-icon ratio-' + ratio,
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
    var ratio = props.ratio || 1;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-close-large ratio-' + ratio,
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

var ModalBtnClose = {
  functional: true,
  props: ['type'],
  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var type = props.type;
    var large = type === 'large';
    var outside = type === 'outside';
    var def = {
      class: ['uk-close', 'uk-icon', {
        'uk-modal-close-large': large,
        'uk-modal-close-outside': outside
      }],
      attrs: {
        type: 'button'
      }
    };
    return h('button', mergeData(data, def), [
      large
        ? h(IconCloseLarge)
        : h(IconClose)
    ])
  }
}

var modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('modal-transition',{on:{"enter":_vm.updateOverflowAuto}},[(_vm.show)?_c('div',{ref:"modal",class:['uk-modal', { 'uk-modal-container': _vm.container, 'uk-flex uk-flex-top': _vm.center }],style:({
      display: _vm.center
        ? ''
        : 'block'
    }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.closeOnBg && _vm.$emit('update:show', false);}}},[_c('div',{ref:"dialog",class:['uk-modal-dialog', _vm.widthClasses, { 'uk-margin-auto-vertical': _vm.center }]},[(_vm.closeBtn)?_c('modal-btn-close',{staticClass:"uk-modal-close-default",attrs:{"type":_vm.closeBtn},on:{"click":function($event){_vm.$emit('update:show', false);}}}):_vm._e(),_vm._v(" "),(_vm.$slots.header)?_c('div',{ref:"header",staticClass:"uk-modal-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_vm._t("dialog"),_vm._v(" "),(_vm.$slots.default)?_c('div',{ref:"body",class:['uk-modal-body', { 'uk-overflow-auto': _vm.overflowAuto }]},[_vm._t("default")],2):_vm._e(),_vm._v(" "),(_vm.$slots.footer)?_c('div',{ref:"footer",staticClass:"uk-modal-footer"},[_vm._t("footer")],2):_vm._e()],2)]):_vm._e()])},staticRenderFns: [],
  name: 'Modal',
  extends: core,
  components: {
    ModalBtnClose: ModalBtnClose,
    ModalTransition: ModalTransition
  },
  props: {
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: false,
      validator: function (val) { return !val || includes([true, 'outside'], val); }
    },
    // determines if the modal should auto
    // adjust the height overflow
    overflowAuto: {
      type: Boolean,
      default: false
    },
    // expands the modal dialog to the default Container width
    container: {
      type: Boolean,
      default: false
    },
    // vertically centers the modal dialog
    center: {
      type: Boolean,
      default: false
    },
    // allows setting the dialog with using the uk-width-* classes
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    widthClasses: function widthClasses () {
      return this.width
        ? this.width.split(' ').map(function (width$$1) { return ("uk-width-" + width$$1); })
        : ''
    }
  },
  methods: {
    updateOverflowAuto: function updateOverflowAuto () {
      if (!this.overflowAuto) {
        return
      }

      var modal = this.$el;
      var modalBody = this.$refs.body;
      var modalDialog = this.$refs.dialog;

      css(modalBody, 'maxHeight', '150px');
      var maxHeight = Math.max(150, 150 + height(modal) - modalDialog.offsetHeight);
      css(modalBody, 'maxHeight', (maxHeight + "px"));
    }
  }
}

var modalFull = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('modal-transition',[(_vm.show)?_c('div',{staticClass:"uk-modal uk-modal-full",staticStyle:{"display":"block"}},[_c('div',{staticClass:"uk-modal-dialog uk-flex uk-flex-center uk-flex-middle",staticStyle:{"box-sizing":"border-box","min-height":"100vh","height":"100vh"}},[(_vm.closeBtn)?_c('modal-btn-close',{staticClass:"uk-modal-close-full",attrs:{"type":_vm.closeBtn},on:{"click":function($event){_vm.$emit('update:show', false);}}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)]):_vm._e()])},staticRenderFns: [],
  name: 'ModalFull',
  extends: core,
  components: {
    ModalBtnClose: ModalBtnClose,
    ModalTransition: ModalTransition
  },
  props: {
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: true,
      validator: function (val) { return !val || includes([true, 'large'], val); }
    }
  }
}

var nav = {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var center = props.center;
    var primary = props.primary;
    return h('ul', mergeData(data, {
      class: ['uk-nav', {
        'uk-nav-center': center,
        'uk-nav-default': !primary,
        'uk-nav-primary': primary
      }]
    }), children)
  }
}

var navItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var label = props.label;
    var icon = props.icon;
    return h('li', mergeData(data, { class: { 'uk-active': active } }), [
      h('a', [
        icon && h(VkIcon, {
          class: 'uk-margin-small-right',
          props: { icon: icon }
        }),
        label
      ])
    ])
  }
}

var navItemHeader = {
  functional: true,
  props: {
    label: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    return h('li', {
      class: 'uk-nav-header'
    }, [
      props.label
    ])
  }
}

var navItemParent = {
  functional: true,
  label: {
    type: String,
    required: true
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h('li', mergeData(data, {
      class: 'uk-parent'
    }), [
      h('a', [
        props.label
      ]),
      h('ul', {
        class: 'uk-nav-sub'
      }, children)
    ])
  }
}

var navItemDivider = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    return h('li', {
      class: 'uk-nav-divider'
    })
  }
}

var LeftSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-left' }, children);
}
};
var CenterSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-center' }, children);
}
};
var RightSlot = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-right' }, children);
}
};
var navbar = {
  functional: true,
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      validator: function (val) { return includes(['expand', 'small', 'large'], val); }
    }
  },
  render: function render (h, ref) {
    var slots = ref.slots;
    var props = ref.props;
    var data = ref.data;
    var container = props.container;
    var transparent = props.transparent;
    var _slots = slots();
    var content = [
      (_slots.default || _slots.left) && h(LeftSlot, (_slots.default || _slots.left)),
      _slots.center && h(CenterSlot, _slots.center),
      _slots.right && h(RightSlot, _slots.right)
    ];
    return h('nav', mergeData(data, {
      class: ['uk-navbar-container', {
        'uk-navbar-transparent': transparent
      }]
    }), [
      h('div', {
        class: ['uk-container', {
          'uk-container-small': container === 'small',
          'uk-container-large': container === 'large',
          'uk-container-expand': container === 'expand'
        }]
      }, [
        h('div', { class: 'uk-navbar' }, content)
      ])
    ])
  }
}

var navbarItem = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    return h('div', mergeData(data, { class: 'uk-navbar-item' }), children)
  }
}

var IconToggle = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-navbar-toggle-icon ratio-' + ratio,
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

var NavbarToggleIcon = {
  functional: true,
  render: function (h) { return h('span', { class: 'uk-navbar-toggle-icon uk-icon' }, [ h(IconToggle) ]); }
};
var NavbarToggleLabel = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('span', { class: 'uk-margin-small-left' }, children);
}
};
var navbarToggle = {
  functional: true,
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;
    var label = props.label;
    return h('a', mergeData(data, { class: 'uk-navbar-toggle' }), [
      h(NavbarToggleIcon),
      label && h(NavbarToggleLabel, label)
    ])
  }
}

var navbarNav = {
  functional: true,
  render: function render (h, ref) {
    var children = ref.children;
    var data = ref.data;
    return h('ul', mergeData(data, { class: 'uk-navbar-nav' }), children)
  }
}

var Subtitle = {
  functional: true,
  render: function (h, ref) {
    var children = ref.children;
    return h('div', { class: 'uk-navbar-subtitle' }, children);
}
};
var navbarNavItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var active = props.active;
    var label = props.label;
    var subtitle = props.subtitle;
    return h('li', mergeData(data, { class: { 'uk-active': active } }), [
      h('a', [
        subtitle
          ? h('div', [ label, h(Subtitle, subtitle) ])
          : label
      ]),
      children
    ])
  }
}

var navbarNavDropdown = {
  functional: true,
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var open = props.open;
    return h('div', mergeData(data, {
      class: ['uk-navbar-dropdown', {
        'uk-open': open
      }]
    }), [
      h('ul', { class: 'uk-nav uk-navbar-dropdown-nav' }, children)
    ])
  }
}

var status = [
  'primary',
  'success',
  'warning',
  'danger'
];
var NotificationMessage = {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: function (val) { return !val || status.indexOf(val) !== -1; }
    },
    transition: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var parent = ref.parent;
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    var status = props.status;
    var def = {
      class: ['uk-notification-message']
    };
    if (status) {
      def.class.push(("uk-notification-message-" + status));
    }
    return h('div', mergeData(data, def), [
      children
    ])
  }
}

var timeouts = {};
var defaultTimeout = 4500;

var positions$2 = [
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'top-left',
  'top-center',
  'top-right'
];

var notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[ 'uk-notification', ("uk-notification-" + (this.position)) ]},_vm._l((_vm.normalizedNfcs),function(n){return _c('notification-message',{key:n.key || n.message,attrs:{"status":n.status,"timeout":n.timeout},on:{"click":function($event){_vm.remove(n);},"mouseenter":function($event){_vm.cancelTimeout(n);},"mouseleave":function($event){_vm.initTimeout(n);}}},[_vm._t("default",[_vm._v(" "+_vm._s(n.message)+" ")],{message:n.message})],2)}))},staticRenderFns: [],
  name: 'Notification',
  components: {
    NotificationMessage: NotificationMessage
  },
  props: {
    notifications: {
      type: Array,
      default: function () { return []; }
      // validator: val => {
      //   const ntfs = val.filter(isObject)
      // }
    },
    position: {
      type: String,
      default: 'top-center',
      validator: function (pos) { return positions$2.indexOf(pos) !== -1; }
    }
  },
  computed: {
    normalizedNfcs: function normalizedNfcs () {
      var this$1 = this;

      return this.notifications.map(function (n) {
        if (!isObject(n)) {
          warn('The Notification value must be an Object');
          return
        }

        this$1.initTimeout(n);

        return n
      })
    }
  },
  methods: {
    remove: function remove (n) {
      var index = this.notifications.indexOf(n);

      if (index !== -1) {
        var notifications = cloneArray(this.notifications);
        notifications.splice(index, 1);

        this.$emit('update:notifications', notifications);
      }
    },
    initTimeout: function initTimeout (n) {
      var this$1 = this;

      var timeout = n.timeout || defaultTimeout;

      if (!isInteger(timeout)) {
        warn('Notification timeout is invalid');
      }

      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);
      var timeoutShouldBeSet = timeout > 0;

      if (timeoutShouldBeSet && !timeoutIsSet) {
        var timeoutId = setTimeout(function () {
          this$1.remove(n);
          delete timeouts[id];
        }, timeout);

        timeouts[id] = timeoutId;
      }
    },
    cancelTimeout: function cancelTimeout (n) {
      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);

      if (timeoutIsSet) {
        clearTimeout(timeouts[id]);
        delete timeouts[id];
      }
    }
  },
  mounted: function mounted () {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
}

function getId (n) {
  var msg = n.message.replace(/ /g, '');
  var key = n.key || 'key';
  var timeout = n.timeout || 0;

  return (msg + "-" + key + "-" + timeout)
}

var win$2 = window;
var body = document.body;
var doc$3 = document.documentElement;
var scroll;
var active$1;
var activeCount;
var scrollbarWidth;
function common (vm) { return ({
  on: {
    beforeEnter: function beforeEnter (el) {
      scrollbarWidth = width(win$2) - doc$3.offsetWidth;
      scroll = scroll || { x: win$2.pageXOffset, y: win$2.pageYOffset };
      addClass(doc$3, 'uk-offcanvas-page');
      addClass(body, 'uk-offcanvas-container');
      if (vm.flip) {
        addClass(body, 'uk-offcanvas-flip');
        addClass(vm.$refs.bar, 'uk-offcanvas-bar-flip');
      }
      if (vm.overlay) {
        addClass(el, 'uk-offcanvas-overlay');
        addClass(body, 'uk-offcanvas-overlay');
      }
    },
    afterEnter: function afterEnter (el) {
      if (vm.overlay) {
        width(vm.$refs.content, width(win$2) - scrollbarWidth);
        height(vm.$refs.content, height(win$2));
        if (scroll) {
          vm.$refs.content.scrollTop = scroll.y;
        }
      }
      if (!activeCount) {
        setGlobalEvents();
      }
      active$1 = vm;
      activeCount++;
    },
    afterLeave: function afterLeave (el) {
      if (!vm.overlay) {
        scroll = { x: win$2.pageXOffset, y: win$2.pageYOffset };
      } else if (!scroll) {
        var ref = vm.$refs.content;
        var x = ref.scrollLeft;
        var y = ref.scrollTop;
        scroll = { x: x, y: y };
      }
      removeClass(body, 'uk-offcanvas-flip');
      removeClass(vm.$refs.bar, 'uk-offcanvas-bar-flip');
      removeClass(doc$3, 'uk-offcanvas-page');
      removeClass(body, 'uk-offcanvas-container');
      removeClass(el, 'uk-offcanvas-overlay');
      removeClass(body, 'uk-offcanvas-overlay');
      body.scrollTop = scroll.y;
      css(body, 'overflowY', '');
      css(doc$3, 'overflowY', '');
      width(vm.$refs.content, '');
      height(vm.$refs.content, '');
      win$2.scrollTo(scroll.x, scroll.y);
      scroll = null;
      activeCount--;
      if (!activeCount) {
        unsetGlobalEvents();
      }
      if (active$1 === vm) {
        active$1 = null;
      }
    }
  }
}); }
function unsetGlobalEvents () {
  offAll('vk-offcanvas');
}
function setGlobalEvents () {
  on(doc$3, 'click', function (e) {
    var clickOut = !active$1.$el.contains(e.target);
    var clickOnOverlay = e.target === active$1.$el && active$1.overlay;
    if (clickOut || clickOnOverlay) {
      active$1.hide();
    }
  }, 'vk-offcanvas');
  on(doc$3, 'keyup', function (e) {
    if (e.keyCode === 27 && active$1) {
      e.preventDefault();
      active$1.hide();
    }
  }, 'vk-offcanvas');
}

var win$1 = window;
var doc$2 = document.documentElement;
var VkOffcanvasTransitionNone = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
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
          var scrollbarWidth = width(win$1) - doc$2.offsetWidth;
          css(doc$2, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          addClass(el, 'uk-open');
          addClass(vm.$refs.bar, 'uk-offcanvas-none');
        },
        afterLeave: function afterLeave (el) {
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.bar, 'uk-offcanvas-none');
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var win$3 = window;
var doc$4 = document.documentElement;
var VkOffcanvasTransitionPush = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$3) - doc$4.offsetWidth;
          css(doc$4, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        },
        enter: function enter (el, done) {
          height(el);
          addClass(el, 'uk-open');
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation');
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          var bar = vm.$refs.bar;
          one(el, transitionend, done, function (e) { return e.target === bar; });
        },
        afterLeave: function afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push');
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var win$4 = window;
var doc$5 = document.documentElement;
var VkOffcanvasTransitionSlide = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$4) - doc$5.offsetWidth;
          css(doc$5, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        },
        enter: function enter (el, done) {
          height(el);
          addClass(el, 'uk-open');
          one(el, transitionend, done, function (e) { return e.target === vm.$refs.bar; });
        },
        beforeLeave: function beforeLeave (el) {
          removeClass(el, 'uk-open');
        },
        leave: function leave (el, done) {
          var bar = vm.$refs.bar;
          one(el, transitionend, done, function (e) { return e.target === bar; });
        },
        afterLeave: function afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide');
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var win$5 = window;
var doc$6 = document.documentElement;
var VkOffcanvasTransitionReveal = {
  functional: true,
  render: function render (h, ref) {
    var vm = ref.parent;
    var data = ref.data;
    var children = ref.children;
    var wrapper = vm.$refs.wrapper;
    var bar;
    var def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          var scrollbarWidth = width(win$5) - doc$6.offsetWidth;
          width(vm.$refs.content, width(win$5) - scrollbarWidth);
          css(doc$6, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          );
          wrapper = document.createElement('div');
          addClass(wrapper, 'uk-offcanvas-reveal');
          el.appendChild(wrapper);
          wrapper.appendChild(vm.$refs.bar);
          vm.$refs.wrapper = wrapper;
        },
        enter: function enter (el, done) {
          height(el);
          addClass(el, 'uk-open');
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation');
          one(el, transitionend, done, function (e) { return e.target === wrapper; });
        },
        beforeLeave: function beforeLeave (el) {
          bar = vm.$refs.bar;
          removeClass(el, 'uk-open');
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation');
        },
        leave: function leave (el, done) {
          one(el, transitionend, done, function (e) { return e.target === wrapper; });
        },
        afterLeave: function afterLeave (el) {
          el.appendChild(bar);
          el.removeChild(wrapper);
        }
      }
    };
    return h('transition', mergeData(data, def, common(vm)), children)
  }
}

var offcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(("vk-offcanvas-transition-" + (_vm.transition)),{tag:"component"},[(_vm.show)?_c('div',{staticClass:"uk-offcanvas",staticStyle:{"display":"block"}},[_c('div',{ref:"bar",staticClass:"uk-offcanvas-bar"},[_vm._t("default")],2)]):_vm._e()])},staticRenderFns: [],
  name: 'Offcanvas',
  components: {
    VkOffcanvasTransitionNone: VkOffcanvasTransitionNone,
    VkOffcanvasTransitionPush: VkOffcanvasTransitionPush,
    VkOffcanvasTransitionSlide: VkOffcanvasTransitionSlide,
    VkOffcanvasTransitionReveal: VkOffcanvasTransitionReveal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'slide',
      validator: function (mode) { return mode.match(/none|slide|push|reveal/); }
    }
  },
  methods: {
    hide: function hide () {
      this.$emit('update:show', false);
    }
  },
  mounted: function mounted () {
    this.$refs.content = document.body.querySelector(".uk-offcanvas-content");

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap the content with VkOffcanvasContent or a custom div.uk-offcanvas-content.', this);
      this.$destroy();
    }
  }
}

var offcanvasContent = {
  functional: true,
  render: function (h, ref) {
      var children = ref.children;
      return h('div', {
      class: 'uk-offcanvas-content'
    }, children);
}
}

var offcanvasClose = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      return h('button', {
      class: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(IconClose)
    ]);
}
}

var IconNext = {
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

var PaginationLast = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'last')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.lastPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
}

var IconPrevious = {
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
        meta: 'icon-pagination-previous ratio-' + ratio,
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

var PaginationPrev = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'prev')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.prevPage); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
}

var PaginationNext = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'next')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.nextPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
}

var PaginationFirst = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var label = props.label;
    var expand = props.expand;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'first')
    }
    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', 1); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
}

var PaginationPages = {
  functional: true,
  render: function (h, ref) {
    var parent = ref.parent;
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages')
    }
    var currentPage = parent.page;
    return parent.pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && currentPage === page;
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: function (e) {
                parent.$emit('update:page', page);
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
}

var def = { total: 200, page: 1, perPage: 10, range: 3 };
function paginationMatrix (ref) {
  if ( ref === void 0 ) ref = def;
  var total = ref.total; if ( total === void 0 ) total = def.total;
  var page = ref.page; if ( page === void 0 ) page = def.page;
  var perPage = ref.perPage; if ( perPage === void 0 ) perPage = def.perPage;
  var range$$1 = ref.range; if ( range$$1 === void 0 ) range$$1 = def.range;
  var matrix = [];
  var totalPages = Math.ceil(total / perPage);
  if (totalPages < 2) {
    return [1]
  }
  var mainPages = getMainPages({ page: page, range: range$$1, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  var prePages = getRange(1, (first <= 3) ? first : 2);
  var postPages = getRange(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  );
  var nextPage = 1;[].concat(prePages, mainPages, postPages).forEach(function (p) {
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
  return getRange(start, end + 1)
};

var partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
};

var pagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-pagination",class:{ 'uk-flex-center': _vm.align !== 'left' && _vm.align !== 'right', 'uk-flex-right': _vm.align === 'right' }},[_c('pag-parts')],1)},staticRenderFns: [],
  name: 'Pagination',
  props: {
    align: {
      type: String,
      default: 'center' // left|center|right
    },
    // the active page
    page: {
      type: Number
    },
    // items displayed on each page
    perPage: {
      type: Number
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    },
    // total amount of items
    total: {
      type: Number
    }
  },
  computed: {
    prevPage: function prevPage () {
      return this.page - 1
    },
    nextPage: function nextPage () {
      return this.page + 1
    },
    pages: function pages () {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage: function lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render: function render (h, ref) {
        var parent = ref.parent;

        var lis = [];
        parent.$parts.forEach(function (part) {
          part = parent.$createElement(part.comp, { props: part.props });

          if (isArray(part)) {
            lis = lis.concat(part);
          } else {
            lis.push(part);
          }
        });

        return lis
      }
    }
  },
  created: function created () {
    this.$parts = this.$slots.default
      .filter(function (slot) { return slot.children; })
      .map(function (slot) { return ({
        comp: partsMap[slot.children[0].text],
        props: (slot.data && slot.data.attrs) || {}
      }); });
  }
}

var IconSpinner = {
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
        meta: 'icon-spinner ratio-' + ratio,
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

var spinner = {
  functional: true,
  props: ['ratio'],
  render: function render (h, ref) {
    var props = ref.props;
    return h('div', {
      class: ['uk-icon uk-spinner']
    }, [
      h(IconSpinner, {
        props: {
          ratio: props.ratio
        }
      })
    ])
  }
}

var scroll$1 = 0;
on(window, 'scroll', function () {
  scroll$1 = window.pageYOffset;
});
function offsetTop (element) {
  return element.getBoundingClientRect().top + window.pageYOffset
}
var sticky = {
  name: 'Sticky',
  abstract: true,
  props: {
    top: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: [Number, String],
      default: 0
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
    }
  },
  data: function () { return ({
    isActive: false,
    topOffset: 0,
    outerHeight: 0,
    clsFixed: 'uk-sticky-fixed',
    clsBelow: 'uk-sticky-below',
    clsActive: 'uk-active',
    clsInactive: ''
  }); },
  render: function render (h) {
    var this$1 = this;
    var children = this.$options._renderChildren;
    if (!children) {
      return
    }
    children = children.filter(function (n) { return n.tag; });
    if (!children.length) {
      return
    }
    if ("development" !== 'production' && children.length > 1) {
      warn('<vk-sticky> can only be used on a single element.', this.$parent);
    }
    var rawChild = children[0];
    on(window, 'scroll', function () {
      this$1.offsetTop = offsetTop(this$1.$el);
      this$1.visible = isVisible$1(this$1.$el);
      this$1.onScroll();
    }, this._uid);
    return rawChild
  },
  computed: {
    stickyStartPoint: function stickyStartPoint () {
      var top = this.top;
      if (isInteger(top) && this.topOffset) {
        top = this.topOffset + parseFloat(top);
      } else if (isString(top) && top.match(/^-?\d+vh$/)) {
        top = getViewportHeightOffset(top);
      } else {
        top = this.getElementOffset(top);
      }
      return Math.max(parseFloat(top), this.topOffset) - this.offset
    },
    stickyEndPoint: function stickyEndPoint () {
      var bottom = this.bottom;
      bottom = this.getElementOffset(bottom === true
        ? this.$el.parent()
        : bottom
      );
      return bottom && bottom - this.outerHeight
    },
    inactive: function inactive () {
      return this.media && !window.matchMedia(this.media).matches
    },
    $widthElement: function $widthElement () {
      return this.widthElement || this.$el
    },
    bottomOffset: function bottomOffset () {
      return this.topOffset + this.outerHeight
    }
  },
  methods: {
    show: function show () {
      this.isActive = true;
      this.update();
      this.placeholder.removeAttribute('hidden');
    },
    hide: function hide () {
      addClass(this.$el, this.clsInactive);
      removeClass(this.$el, ((this.clsFixed) + " " + (this.clsActive) + " " + (this.clsBelow)));
      css(this.$el, 'position', '');
      css(this.$el, 'width', '');
      css(this.$el, 'top', '');
      this.placeholder.setAttribute('hidden', 'hidden');
    },
    update: function update () {
      var top = Math.max(0, this.offset);
      var active = scroll$1 > this.stickyStartPoint;
      if (this.stickyEndPoint && scroll$1 > this.stickyEndPoint - this.offset) {
        top = this.stickyEndPoint - scroll$1;
      }
      addClass(this.$el, this.clsFixed);
      css(this.$el, 'width', ((this.$widthElement.offsetWidth) + "px"));
      css(this.$el, 'position', 'fixed');
      css(this.$el, 'top', (top + "px"));
      toggleClass(this.$el, this.clsActive, active);
      toggleClass(this.$el, this.clsInactive, !active);
      toggleClass(this.$el, this.clsBelow, scroll$1 > this.bottomOffset);
    },
    onScroll: function onScroll () {
      var this$1 = this;
      var scrollNotReachedStartPoint = scroll$1 < this.stickyStartPoint;
      if (this.inactive || scrollNotReachedStartPoint) {
        if (!this.isActive) {
          return
        }
        this.isActive = false;
        if (this.animation && scroll$1 > this.topOffset) {
          Animation.cancel(this.$el).then(function () { return Animation.out(this$1.$el, this$1.animation).then(function () { return this$1.hide(); }); }
          );
        } else {
          this.hide();
        }
      } else if (this.isActive) {
        this.update();
      } else if (this.animation) {
        Animation.cancel(this.$el).then(function () {
          this$1.show();
          Animation.in(this$1.$el, this$1.animation);
        });
      } else {
        this.show();
      }
    },
    createPlaceholder: function createPlaceholder () {
      this.placeholder = document.createElement('div');
      addClass(this.placeholder, 'uk-sticky-placeholder');
      this.placeholder.setAttribute('hidden', 'hidden');
      if (!this.$el.parentNode.contains(this.placeholder)) {
        this.$el.parentNode.appendChild(this.placeholder);
      }
    },
    updatePlaceholder: function updatePlaceholder () {
      css(this.placeholder, 'height', ((this.outerHeight) + "px"));
      css(this.placeholder, 'marginTop', css(this.$el, 'marginTop'));
      css(this.placeholder, 'marginBottom', css(this.$el, 'marginBottom'));
      css(this.placeholder, 'marginLeft', css(this.$el, 'marginLeft'));
      css(this.placeholder, 'marginRight', css(this.$el, 'marginRight'));
    },
    getElementOffset: function getElementOffset (el) {
      el = isString(el)
        ? this.$vnode.context.$refs[el]
        : el;
      if (el) {
        return offsetTop(el) + el.offsetHeight
      }
    }
  },
  mounted: function mounted () {
    addClass(this.$el, 'uk-sticky');
    this.topOffset = offsetTop(this.$el);
    this.outerHeight = this.$el.offsetHeight;
    this.createPlaceholder();
    this.updatePlaceholder();
    var active = scroll$1 > this.stickyStartPoint;
    if (active) {
      this.isActive = true;
      this.update();
    } else {
      addClass(this.$el, this.clsInactive);
    }
  }
}
function isVisible$1 (el) {
  if (!el) {
    return false
  }
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible
}
function getViewportHeightOffset (height) {
  return window.innerHeight * parseFloat(height) / 100
}

var subnav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-subnav",class:{ 'uk-subnav-divider': _vm.divider, 'uk-subnav-pill': _vm.pill }},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Subnav',
  props: {
    activeItem: [String, Number],
    divider: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items: {
      get: function get () {
        return this.$slots.default.filter(function (c) { return c.componentOptions && c.componentOptions.tag === 'vk-subnav-item'; }
        )
      },
      cache: false
    }
  },
  beforeMount: function beforeMount () {
    this.updateItems();
  },
  beforeUpdate: function beforeUpdate () {
    this.updateItems();
  },
  methods: {
    updateItems: function updateItems () {
      var this$1 = this;

      this.items.forEach(function (item, index) {
        var alias = this$1.getItemAlias(item);
        var active = this$1.activeItem === alias;
        var props = item.componentOptions.propsData;
        props.active = active;
        props.alias = alias;
      });
    },
    getItemAlias: function getItemAlias (item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1
    }
  }
}

var subnavItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'uk-active': _vm.active, 'uk-disabled': _vm.disabled }},[_c('a',{on:{"click":function($event){$event.preventDefault();(!_vm.disabled && !_vm.active) && _vm.$parent.$emit('change', _vm.alias);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])},staticRenderFns: [],
  name: 'SubnavItem',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

var TabContent = {
  functional: true,
  render: function (h, ref) {
    var parent = ref.parent;
    return parent.tabs
    .filter(function (tab) { return parent.activeTab === tab.name; })
    .map(function (tab) { return tab.node; });
}
};
var core$1 = {
  components: {
    TabContent: TabContent
  },
  props: {
    activeTab: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    tabs: {
      get: function get () {
        var slots = (this.$slots.default || [])
          .filter(function (n) { return n.tag; });
        if (!slots.length) {
          warn('At least one vk-tab-item must be set', this);
        }
        return slots.map(function (node) { return ({
          node: node,
          name: node.componentOptions.propsData.name,
          label: node.componentOptions.propsData.label,
          disabled: node.componentOptions.propsData.disabled !== undefined
        }); })
      },
      cache: false
    }
  },
  methods: {
    triggerTab: function triggerTab (name) {
      this.$emit('update:activeTab', name);
    }
  },
  created: function created () {
    if (!this.activeTab && this.tabs.length) {
      this.triggerTab(this.tabs[0].node.componentOptions.propsData.name);
    }
  }
}

var UiTab = {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: '',
      validator: function (val) { return !val || includes(['right', 'center', 'justify'], val); }
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;
    var alignment = props.alignment;
    var bottom = props.bottom;
    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-bottom': bottom,
        'uk-flex-right': alignment === 'right',
        'uk-flex-center': alignment === 'center',
        'uk-child-width-expand': alignment === 'justify'
      }]
    }), children)
  }
}

var UiTabItem = {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var active = props.active;
    var disabled = props.disabled;
    var label = props.label;
    return h('li', mergeData(data, { class: {
      'uk-active': active && !disabled,
      'uk-disabled': disabled
    } }), [
      h('a', label)
    ])
  }
}

var tab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'uk-flex uk-flex-column-reverse': _vm.bottom }},[_c('ui-tab',{attrs:{"bottom":_vm.bottom,"alignment":_vm.alignment}},_vm._l((_vm.tabs),function(tab){return _c('ui-tab-item',{key:tab.name,attrs:{"active":tab.name === _vm.activeTab,"label":tab.label,"disabled":tab.disabled},on:{"click":function($event){$event.preventDefault();!tab.disabled && _vm.triggerTab(tab.name);}}})})),_vm._v(" "),_c('div',{class:{ 'uk-margin': _vm.bottom }},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)],1)},staticRenderFns: [],
  name: 'Tab',
  extends: core$1,
  components: {
    UiTab: UiTab,
    UiTabItem: UiTabItem
  },
  props: UiTab.props
}

var tabItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)},staticRenderFns: [],
  name: 'TabItem',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

var UiTab$1 = {
  functional: true,
  props: {
    alignment: {
      type: String,
      default: 'left',
      validator: function (val) { return !val || includes(['left', 'right'], val); }
    }
  },
  render: function (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;
    var alignment = props.alignment;
    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-left': alignment === 'left',
        'uk-tab-right': alignment === 'right'
      }]
    }), children)
  }
}

var tabVertical = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-grid",class:{ 'uk-flex uk-flex-row-reverse': _vm.alignment === 'right' }},[_c('div',{staticClass:"uk-width-auto"},[_c('ui-tab',{attrs:{"alignment":_vm.alignment}},_vm._l((_vm.tabs),function(tab){return _c('ui-tab-item',{key:tab.name,attrs:{"active":tab.name === _vm.activeTab,"label":tab.label,"disabled":tab.disabled},on:{"click":function($event){$event.preventDefault();!tab.disabled && _vm.triggerTab(tab.name);}}})}))],1),_vm._v(" "),_c('div',{staticClass:"uk-width-expand"},[_c('transition',{attrs:{"name":_vm.transition,"mode":"out-in"}},[_c('keep-alive',[_c('tab-content')],1)],1)],1)])},staticRenderFns: [],
  name: 'TabVertical',
  extends: core$1,
  components: {
    UiTab: UiTab$1,
    UiTabItem: UiTabItem
  },
  props: UiTab$1.props
}

var Row = {
  functional: true,
  props: ['row'],
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var table = ref.parent;
    var row = props.row;
    return h('tr', {
      class: [resolveClass(table.rowClass, row), {
        'uk-active': table.isSelected(row)
      }],
      on: {
        click: function (e) {
          var isPrevented = e._vk_row_click_prevented;
          var isIgnoredTag = e.target.tagName.match(/A|BUTTON/);
          if (isPrevented || isIgnoredTag) {
            return
          }
          table.$emit('click-row', row);
        }
      }
    }, children)
  }
}
function resolveClass (rowClass, row) {
  return isFunction(rowClass)
    ? rowClass(row)
    : rowClass
}

var Cell = {
  functional: true,
  props: ['col', 'row'],
  render: function render (h, ref) {
    var parent = ref.parent;
    var data = ref.data;
    var props = ref.props;
    var col = props.col;
    var render = get(col, 'componentOptions.Ctor.options.cellRender');
    if (!render) {
      warn('The VkTable Column is missing the cell render definition', parent);
      return
    }
    var colProps = get(col, 'componentOptions.propsData', {});
    var scopedSlots = get(col, 'data.scopedSlots', {});
    return h({
      functional: true,
      render: render
    }, {
      scopedSlots: scopedSlots,
      props: merge({}, props, colProps)
    })
  }
}

var Table$1 = {
  functional: true,
  render: function render (h, ref) {
    var slots = ref.slots;
    var props = ref.props;
    var _slots = slots();
    return h('table', {
      class: ['uk-table', {
        'uk-table-small': props.narrowed,
        'uk-table-hover': props.hoverable,
        'uk-table-divider': props.divided,
        'uk-table-striped': props.striped,
        'uk-table-justify': props.justified,
        'uk-table-middle': props.middleAligned,
        'uk-table-responsive': props.responsive
      }]
    }, [
      _slots.head && h('thead', [ h('tr', _slots.head) ]),
      _slots.body && h('tbody', _slots.body)
    ])
  },
  props: {
    narrowed: {
      type: Boolean,
      default: false
    },
    middleAligned: {
      type: Boolean,
      default: false
    },
    divided: {
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
  }
}

var MixinSelect = {
  methods: {
    select: function select (row) {
      var id = row._vk_id;
      if (this.singleSelectable) {
        this.updateSelection([id]);
        return
      }
      var selectedRows = [].concat( this.selectedRows );
      selectedRows.push(id);
      this.updateSelection(selectedRows);
    },
    unselect: function unselect (row) {
      var id = row._vk_id;
      var index = this.selectedRows.indexOf(id);
      var selectedRows = [].concat( this.selectedRows );
      selectedRows.splice(index, 1);
      this.updateSelection(selectedRows);
    },
    toggleSelection: function toggleSelection (row) {
      this.isSelected(row)
        ? this.unselect(row)
        : this.select(row);
    },
    toggleSelectionAll: function toggleSelectionAll () {
      var selectedRows = [];
      if (!this.allRowsSelected) {
        selectedRows = this.rows.map(function (row) { return row._vk_id; });
      }
      this.updateSelection(selectedRows);
    },
    isSelected: function isSelected (row) {
      return includes(this.selectedRows, row._vk_id)
    },
    updateSelection: function updateSelection (selectedRows) {
      this.$emit('update:selectedRows', selectedRows);
    }
  },
  computed: {
    allRowsSelected: function allRowsSelected () {
      if (this.selectedRows.length < this.rows.length) {
        return false
      }
      var selected = this.rows.filter(this.isSelected);
      return selected.length === this.rows.length
    }
  },
  created: function created () {
    if (this.rowSelectable) {
      this.$on('click-row', this.toggleSelection);
    }
  }
}

var Table = {
  name: 'Table',
  components: { Row: Row, Cell: Cell },
  mixins: [ MixinSelect ],
  inheritAttrs: false,
  props: merge({}, Table$1.props, {
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
    },
    // required by column-sort
    sortedBy: {
      type: Object
    },
    // required by column-select
    selectedRows: {
      type: Array,
      default: function () { return []; }
    },
    singleSelectable: {
      type: Boolean,
      default: false
    },
    rowSelectable: {
      type: Boolean,
      default: false
    }
  }),
  data: function () { return ({
    children: []
  }); },
  computed: {
    // maps the data to table rows
    rows: function rows () {
      var this$1 = this;

      return this.data.map(function (_row, index) {
        var row = merge({}, _row);

        row._vk_id = "" + (row[this$1.rowKey] || index);
        return row
      })
    },
    // returns the columns vnodes
    columns: {
      get: function get () {
        // default slots excluding spaces and comments
        var slots = (this.$slots.default || [])
          .filter(function (node) { return node.tag && !node.isComment && !node.asyncFactory; });

        return slots
      },
      cache: false
    },
    // checks if there is at least one column providing head data
    isHeadDataProvided: function isHeadDataProvided () {
      return this.columns.some(function (col) { return get(col, 'componentOptions.propsData.head'); })
    }
  },
  render: function render (h) {
    var this$1 = this;

    var renderRow = function (row, index) { return h(Row, {
      key: row._vk_id,
      props: { row: row }
    }, this$1.columns.map(function (col, i) { return h(Cell, {
      key: i,
      props: { col: col, row: row }
    }); })); };

    return h(Table$1, { props: this.$props }, [
      this.isHeadDataProvided && h('template', { slot: 'head' }, this.columns),
      h('template', { slot: 'body' }, this.rows.map(renderRow))
    ])
  },
  created: function created () {
    // required, forces rows to rerender
    // when children are available
    this.children = this.$children;
  }
}

var ColumnHead = {
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
    var def = mergeData(data, {
      class: {
        'uk-table-shrink': props.shrinked,
        'uk-table-expand': props.expanded
      }
    });
    return h('th', def, children)
  }
}

var Column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-head',{class:['vk-table-column', _vm.headClass],attrs:{"shrinked":_vm.shrinked,"expanded":_vm.expanded}},[_vm._t("head",[_vm._v(_vm._s(_vm.head))])],2)},staticRenderFns: [],
  name: 'TableColumn',
  components: {
    ColumnHead: ColumnHead
  },
  props: mergeData({}, ColumnHead.props, {
    head: {
      type: String
    },
    headClass: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }),
  cellRender: function (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var data = ref.data;

    var row = props.row;
    var cell = props.cell;
    var cellClass = props.cellClass;
    var scopedSlots = data.scopedSlots;

    var cellValue = get(row, cell);

    // support custom slots, fallback to default fn
    var cellSlot = scopedSlots.cell || (function () { return cellValue; });
    var emptySlot = scopedSlots.emptyCell || (function () { return ''; });

    return h('td', {
      class: cellClass
    }, [
      isUndefined(cellValue)
        ? emptySlot(row)
        : cellSlot(cellValue, row)
    ])
  }
}

var Arrow = {
  functional: true,
  props: {
    rotated: {
      type: Boolean,
      default: false
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h('span', mergeData(data, {
      class: ['vk-table-column-sort__arrow', {
        'vk-table-column-sort__arrow--rotated': props.rotated
      }]
    }));
}
}

var sort = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-head',{class:['vk-table-column-sort uk-visible-hover-inline', _vm.headClass],attrs:{"shrinked":_vm.shrinked,"expanded":_vm.expanded},on:{"click":_vm.emitSortEvent}},[_c('div',{staticClass:"uk-text-nowrap uk-position-relative"},[_vm._t("head",[_vm._v(_vm._s(_vm.head))]),_vm._v(" "),_c('arrow',{class:['uk-position-absolute', { 'uk-invisible': !_vm.order }],attrs:{"rotated":_vm.order === 'asc' || _vm.order === undefined}})],2)])},staticRenderFns: [],
  name: 'TableColumnSort',
  extends: Column,
  components: {
    Arrow: Arrow,
    ColumnHead: ColumnHead
  },
  computed: {
    // an attribute set on the table wrapper
    // because is to be used by all sort columns
    sortedBy: function sortedBy () {
      return this.$table.sortedBy
    },
    order: function order () {
      return this.sortedBy[this.cell]
    }
  },
  methods: {
    emitSortEvent: function emitSortEvent (e) {
      var sortedBy = getNewSortOrder(this.sortedBy, this.cell, e.shiftKey);
      this.$table.$emit('update:sortedBy', sortedBy);
    }
  },
  created: function created () {
    this.$table = this.$parent;

    if (!isObject(this.sortedBy)) {
      warn("The VkTable 'sortedBy' prop is missing or not a valid object", this.$parent);
    }
  }
}

function getNewSortOrder (currentSort, by, multi) {
  var sort = {};
  var order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc';

  sort[by] = order;

  return multi
    ? merge({}, currentSort, sort)
    : sort
}

var Checkbox = {
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

var select = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('column-head',{class:['vk-table-column-select', _vm.headClass],attrs:{"shrinked":""}},[(!_vm.$parent.singleSelectable)?_vm._t("head",[_c('span',{staticClass:"uk-form uk-text-center"},[_c('checkbox',{attrs:{"checked":_vm.$parent.allRowsSelected},on:{"click":_vm.$parent.toggleSelectionAll}})],1)]):_vm._e()],2)},staticRenderFns: [],
  name: 'TableColumnSelect',
  components: {
    Checkbox: Checkbox,
    ColumnHead: ColumnHead
  },
  props: {
    headClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  computed: {
    $table: function $table () {
      return this.$parent
    }
  },
  cellRender: function (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var parent = ref.parent;

    var row = props.row;
    var cellClass = props.cellClass;
    var scopedSlots = data.scopedSlots;

    var cellSlot = scopedSlots.cell || (function (row) { return h('span', {
        class: 'uk-form uk-text-center'
      }, [
        h(Checkbox, {
          props: {
            checked: parent.isSelected(row)
          },
          on: {
            click: function (e) { return parent.toggleSelection(row); }
          }
        })
      ]); }
    );

    return h('td', {
      class: ['uk-table-shrink', cellClass]
    }, [
      cellSlot(row)
    ])
  }
}

var main = {
  name: 'TableTree',
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

        var idCount = 1;

        data.forEach(function (_row) {
          var row = merge({}, _row);
          var children = row[this$1.childrenKey];
          var hasChildren = children && children.length;

          row._vk_level = parent._vk_level !== undefined
            ? parent._vk_level + 1
            : 0;

          row._vk_id = row[this$1.rowKey]
            ? row[this$1.rowKey]
            : row._vk_level === 0
              ? ("" + (idCount++))
              : ((parent._vk_id) + "_" + (idCount++));

          rows.push(row);

          if (hasChildren && this$1.isExpanded(row)) {
            flatten(children, row);
          }

          if (hasChildren) {
            row._vk_childrenCount = children.length;
            delete row[this$1.childrenKey];
          }
        });
      };

      flatten(this.data);

      return rows
    },
    thereAreSubLevels: function thereAreSubLevels () {
      return this.rows.some(function (row) { return row._vk_childrenCount; })
    }
  },
  methods: {
    isExpanded: function isExpanded (row) {
      return includes(this.expandedRows, row._vk_id)
    },
    toggleExpand: function toggleExpand (row) {
      var id = row._vk_id;
      var expandedRows = [].concat( this.expandedRows );
      var index = expandedRows.indexOf(id);
      var isExpanded = index !== -1;

      isExpanded
        ? expandedRows.splice(index, 1)
        : expandedRows.push(id);

      this.$emit('update:expandedRows', expandedRows);
    }
  }
}

var TreeArrow = {
  functional: true,
  props: ['rotated'],
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h('span', mergeData(data, {
      class: ['vk-table-column-tree__arrow', {
        'vk-table-column-tree__arrow--rotated': props.rotated
      }]
    }));
}
}

var TreeIndent = {
  functional: true,
  render: function (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('span', mergeData(data, { class: 'vk-table-column-tree__indent' }), children);
}
}

var column = {
  name: 'TableTreeColumn',
  extends: Column,
  cellRender: function (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var parent = ref.parent;

    var row = props.row;
    var cell = props.cell;
    var cellClass = props.cellClass;
    var scopedSlots = data.scopedSlots;

    var cellValue = get(row, cell);

    // support custom slots, fallback to default
    var cellSlot = scopedSlots.cell || (function (cellValue, row) { return [

      Array(row._vk_level).fill(h(TreeIndent)),

      parent.thereAreSubLevels && h(TreeIndent, [
        row._vk_childrenCount && h(TreeArrow, {
          props: {
            rotated: parent.isExpanded(row)
          },
          on: {
            click: function (e) {
              e._vk_row_click_prevented = true;
              parent.toggleExpand(row);
            }
          }
        })
      ]),

      h('span', cellValue)

    ]; });

    var def = {
      class: cellClass
    };

    return h('td', def, cellSlot(cellValue, row))
  }
}

var upload = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-placeholder uk-text-center",class:{ 'uk-dragover': _vm.dragged },on:{"dragenter":function($event){$event.stopPropagation();$event.preventDefault();},"dragover":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = true;},"dragleave":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragged = false;},"drop":_vm.dropped}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'Upload',
  data: function () { return ({
    dragged: false
  }); },
  methods: {
    dropped: function dropped (e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        e.stopPropagation();
        e.preventDefault();
        this.dragged = false;
        this.$emit('dropped', e.dataTransfer.files);
      }
    }
  }
}



var components = Object.freeze({
	Breadcrumb: breadcrumb,
	BreadcrumbItem: breadcrumbItem,
	Button: button,
	ButtonGroupCheckbox: buttonGroupCheckbox,
	ButtonGroupRadio: buttonGroupRadio,
	Card: card,
	CardTitle: cardTitle,
	Drop: Drop,
	Dropdown: Dropdown,
	DropdownNav: dropdownNav,
	Icon: VkIcon,
	IconLink: VkIconLink,
	IconButton: iconButton,
	Iconnav: iconnav,
	IconnavItem: iconnavItem,
	IconnavVertical: iconnavVertical,
	Label: label,
	Modal: modal,
	ModalFull: modalFull,
	Nav: nav,
	NavItem: navItem,
	NavItemHeader: navItemHeader,
	NavItemParent: navItemParent,
	NavItemDivider: navItemDivider,
	Navbar: navbar,
	NavbarItem: navbarItem,
	NavbarToggle: navbarToggle,
	NavbarNav: navbarNav,
	NavbarNavItem: navbarNavItem,
	NavbarNavDropdown: navbarNavDropdown,
	Notification: notification,
	Offcanvas: offcanvas,
	OffcanvasContent: offcanvasContent,
	OffcanvasClose: offcanvasClose,
	Pagination: pagination,
	PaginationFirst: PaginationFirst,
	PaginationLast: PaginationLast,
	PaginationPrev: PaginationPrev,
	PaginationNext: PaginationNext,
	PaginationPages: PaginationPages,
	Spinner: spinner,
	Sticky: sticky,
	Subnav: subnav,
	SubnavItem: subnavItem,
	Tab: tab,
	TabItem: tabItem,
	TabVertical: tabVertical,
	Table: Table,
	TableColumn: Column,
	TableColumnSort: sort,
	TableColumnSelect: select,
	TableTree: main,
	TableTreeColumn: column,
	Upload: upload
});

function attr (element, name, value) {
  if (isObject(name)) {
    for (var key in name) {
      attr(element, key, name[key]);
    }
    return
  }
  if (isUndefined(value)) {
    return element && element.getAttribute(name)
  } else {
    toArray(element).forEach(function (element) {
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

function removeAttr (element, name) {
  element = toArray(element);
  name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
    ); }
  );
}

var docEl$2 = document.documentElement;
var isRtl$1 = attr(docEl$2, 'dir') === 'rtl';
var id = 1;
var index = {
  bind: function bind (el, binding) {
    el.vkmarginid = id++;
    on(window, 'resize', debounce(function () {
      update(el, binding);
    }, 10, true), ("vk-margin-" + (el.vkmarginid)));
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update(el, binding); });
  },
  componentUpdated: function componentUpdated (el, binding) {
    update(el, binding);
  },
  unbind: function unbind (el) {
    off(window, 'resize', ("vk-margin-" + (el.vkmarginid)));
  }
}
function update (el, binding) {
  var options = merge({
    margin: 'uk-margin-small-top',
    firstColumn: 'uk-first-column'
  }, (binding.value || {}));
  var items = el.children;
  if (!items.length || !isVisible$2(el)) {
    return
  }
  var ref = getRows(items);
  var rows = ref.rows;
  rows.forEach(function (row, i) { return row.forEach(function (el, j) {
      removeClass(el, options.margin);
      removeClass(el, options.firstColumn)
      ;(i !== 0) && addClass(el, options.margin)
      ;(j === 0) && addClass(el, options.firstColumn);
    }); }
  );
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
        if (dim.left < leftDim.left && !isRtl$1) {
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
function isVisible$2 (el) {
  return el.offsetHeight
}

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;
var async = 'setImmediate' in window ? setImmediate : setTimeout;
var Promise = 'Promise' in window ? window.Promise : Promise$1
function Promise$1 (executor) {
  this.state = PENDING;
  this.value = undefined;
  this.deferred = [];
  var promise = this;
  try {
    executor(function (x) {
      promise.resolve(x);
    }, function (r) {
      promise.reject(r);
    });
  } catch (e) {
    promise.reject(e);
  }
}
Promise$1.reject = function (r) {
  return new Promise$1(function (resolve, reject) {
    reject(r);
  })
};
Promise$1.resolve = function (x) {
  return new Promise$1(function (resolve, reject) {
    resolve(x);
  })
};
Promise$1.all = function all (iterable) {
  return new Promise$1(function (resolve, reject) {
    var count = 0;
    var result = [];
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
      Promise$1.resolve(iterable[i]).then(resolver(i), reject);
    }
  })
};
Promise$1.race = function race (iterable) {
  return new Promise$1(function (resolve, reject) {
    for (var i = 0; i < iterable.length; i += 1) {
      Promise$1.resolve(iterable[i]).then(resolve, reject);
    }
  })
};
var p = Promise$1.prototype;
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
        then.call(x, function (x) {
          if (!called) {
            promise.resolve(x);
          }
          called = true;
        }, function (r) {
          if (!called) {
            promise.reject(r);
          }
          called = true;
        });
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
        var deferred = this$1.deferred.shift();
        var onResolved = deferred[0];
        var onRejected = deferred[1];
        var resolve = deferred[2];
        var reject = deferred[3];
        try {
          if (this$1.state === RESOLVED) {
            if (isFunction(onResolved)) {
              resolve(onResolved(this$1.value));
            } else {
              resolve(this$1.value);
            }
          } else if (this$1.state === REJECTED) {
            if (isFunction(onRejected)) {
              resolve(onRejected(this$1.value));
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
  return new Promise$1(function (resolve, reject) {
    this$1.deferred.push([onResolved, onRejected, resolve, reject]);
    this$1.notify();
  })
};
p.catch = function (onRejected) {
  return this.then(undefined, onRejected)
};

var doc$7 = document;
var win$6 = window;
function trigger (target, event, detail) {
  return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
    , true)
}
function createEvent (e, bubbles, cancelable, detail) {
  if ( bubbles === void 0 ) bubbles = true;
  if ( cancelable === void 0 ) cancelable = false;
  if (isString(e)) {
    var event = doc$7.createEvent('CustomEvent');
    event.initCustomEvent(e, bubbles, cancelable, detail);
    e = event;
  }
  return e
}
function isEventTarget (target) {
  return 'EventTarget' in win$6
    ? target instanceof EventTarget
    : 'addEventListener' in target
}
function toEventTargets (target) {
  return isEventTarget(target)
    ? [target]
    : isArray(target)
      ? target.filter(Boolean)
      : toArray(target)
}

var animationcancel = 'animationcancel';
var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';
function animate (ref) {
  var element = ref.element;
  var animation = ref.animation;
  var origin = ref.origin;
  var duration = ref.duration; if ( duration === void 0 ) duration = 200;
  var out = ref.out; if ( out === void 0 ) out = false;
  return Promise.all(toArray(element).map(animate))
  function animate (element) {
    var arguments$1 = arguments;
    return new Promise(function (resolve, reject) {
      if (hasClass(element, clsCancelAnimation)) {
        requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(null, arguments$1).then(resolve, reject); }
          ); }
        );
        return
      }
      var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');
      if (startsWith(animation, animationPrefix)) {
        if (origin) {
          cls += " " + animationPrefix + origin;
        }
        if (out) {
          cls += " " + animationPrefix + "reverse";
        }
      }
      resetAnimation(element);
      one(element, ((animationend || 'animationend') + " " + animationcancel), function (ref) {
        var type = ref.type;
        var hasReset = false;
        if (type === animationcancel) {
          reject(new Error('UIkit animation canceled'));
          resetAnimation(element);
        } else {
          resolve();
          Promise.resolve().then(function () {
            hasReset = true;
            resetAnimation(element);
          });
        }
        requestAnimationFrame(function () {
          if (!hasReset) {
            addClass(element, clsCancelAnimation);
            requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
          }
        });
      }, function (e) { return element === e.target; });
      css(element, 'animationDuration', (duration + "ms"));
      addClass(element, cls);
      if (!animationend) {
        requestAnimationFrame(function () { return Animation$1.cancel(element); });
      }
    })
  }
}
function resetAnimation (element) {
  css(element, 'animationDuration', '');
  var classesRE = new RegExp((animationPrefix + "\\S*"), 'g');
  element.className = element.className.replace(classesRE, '');
}
var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
var Animation$1 = {
  in: function in$1 (ref) {
    var element = ref.element;
    var animation = ref.animation;
    var duration = ref.duration;
    var origin = ref.origin;
    try {
      return animate({ element: element, animation: animation, duration: duration, origin: origin, out: false })
    } catch (e) {
      console.log(e);
    }
  },
  out: function out (ref) {
    var element = ref.element;
    var animation = ref.animation;
    var duration = ref.duration;
    var origin = ref.origin;
    try {
      return animate({ element: element, animation: animation, duration: duration, origin: origin, out: true })
    } catch (e) {
      console.log(e);
    }
  },
  inProgress: function inProgress$1 (element) {
    return inProgress.test(attr(element, 'class'))
  },
  cancel: function cancel (element) {
    trigger(element, animationcancel);
  }
};

var delayedShow;
var tooltip = {};
var uid$1 = 'v-tooltip';
var positions$3 = [
  'top',
  'top-left',
  'top-center',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'left',
  'left-center',
  'right',
  'right-center'
];
var index$1 = {
  inserted: function inserted (target, binding, vnode) {
    var ctx = getContext$1(target, binding, vnode);
    if (ctx) {
      setEvents(ctx);
    }
  },
  componentUpdated: function componentUpdated (target, binding, vnode) {
    var ctx = getContext$1(target, binding, vnode);
    if (ctx) {
      setEvents(ctx);
      updateVisibles(ctx);
    }
  },
  unbind: function unbind (target, binding) {
    hide();
    removeEvents(target);
  }
}
function setEvents (ctx) {
  var ref = ctx.props;
  var triggers = ref.triggers;
  removeEvents(ctx);
  if (triggers.match(/click/)) {
    on(ctx.target, 'click', function () { return toggle(ctx); }, uid$1);
  }
  if (triggers.match(/hover/)) {
    on(ctx.target, 'mouseenter', function () { return show(ctx); }, uid$1);
    on(ctx.target, 'mouseleave', function () { return hide(ctx); }, uid$1);
  }
  if (triggers.match(/focus/)) {
    on(ctx.target, 'focusin', function () { return show(ctx); }, uid$1);
    on(ctx.target, 'focusout', function () { return hide(ctx); }, uid$1);
  }
}
function removeEvents (ctx) {
  off(ctx.target, 'click mouseenter mouseleave focusin focusout', uid$1);
}
function show (ctx) {
  var props = ctx.props;
  var ref = getTooltip();
  var outer = ref.outer;
  var inner = ref.inner;
  inner.innerHTML = props.content;
  delayedShow = setTimeout(function () {
    var $root = ctx.vnode.context.$root.$el;
    $root.appendChild(outer);
    var ref = positionTooltip(ctx);
    var dir = ref.dir;
    var align = ref.align;
    Animation$1.in({
      element: outer,
      duration: props.duration,
      origin: (dir + "-" + align),
      animation: props.animationIn
    });
  }, props.delay);
}
function hide (ctx) {
  var ref = getTooltip();
  var outer = ref.outer;
  clearTimeout(delayedShow);
  removeClass(outer, 'uk-active');
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }
  tooltip = {};
}
function toggle (ctx) {
  isEmpty(tooltip)
    ? show(ctx)
    : hide(ctx);
}
function updateVisibles (ctx) {
  if (isEmpty(tooltip)) {
    return
  }
  var props = getProps$1(ctx);
  var ref = getTooltip();
  var inner = ref.inner;
  inner.innerHTML = props.content;
  positionTooltip(ctx);
}
function positionTooltip (ctx) {
  var target = ctx.target;
  var props = ctx.props;
  var ref = getTooltip();
  var tooltip = ref.outer;
  var position = props.position;
  var offset$$1 = props.offset;
  var boundary = props.boundary;
  var flip = props.flip;
  var ref$1 = position.split('-');
  var dir = ref$1[0];
  var align = ref$1[1]; if ( align === void 0 ) align = 'center';
  var classesRx = new RegExp("uk-tooltip-(top|bottom|left|right)(-[a-z]+)?");
  tooltip.className = tooltip.className.replace(classesRx, '');
  css(tooltip, { top: '', left: '' });
  var axis = getPositionAxis(position);
  var elAttach = axis === 'x'
    ? ((flipPosition(dir)) + " " + align)
    : (align + " " + (flipPosition(dir)));
  var targetAttach = axis === 'x'
    ? (dir + " " + align)
    : (align + " " + dir);
  var elOffset = axis === 'x'
    ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
    : ("" + (dir === 'top' ? -1 * offset$$1 : offset$$1));
  var ref$2 = positionAt({
    flip: flip,
    target: target,
    boundary: boundary,
    elAttach: elAttach,
    elOffset: elOffset,
    element: tooltip,
    targetAttach: targetAttach,
    targetOffset: null
  }).target;
  var x = ref$2.x;
  var y = ref$2.y;
  dir = axis === 'x' ? x : y;
  align = axis === 'x' ? y : x;
  addClass(tooltip, ("uk-tooltip-" + dir + "-" + align + " uk-active"));
  return {
    dir: dir,
    align: align
  }
}
function getProps$1 (ctx) {
  var ref = ctx.binding;
  var arg = ref.arg;
  var value = ref.value;
  var vnode = ref.vnode;
  var delay = 1;
  var offset$$1 = 0;
  var flip = true;
  var content = null;
  var duration = 100;
  var position = 'top';
  var boundary = window;
  var animation = 'scale-up';
  var triggers = 'hover focus';
  if (isObject(value)) {
    content = value.content;
    flip = get(value, 'flip', flip);
    delay = get(value, 'delay', delay);
    offset$$1 = toInteger(offset$$1) || offset$$1;
    boundary = value.boundary || boundary;
    duration = get(value, 'duration', duration);
    triggers = get(value, 'triggers', triggers);
    position = value.position || arg || position;
    animation = get(value, 'animation', animation);
  } else {
    content = value;
    position = arg || position;
  }
  if (!includes(positions$3, position)) {
    warn('Invalid v-tooltip position', vnode);
    return false
  }
  if (!content) {
    warn('Invalid v-tooltip content', vnode);
    return false
  }
  var animations = animation.split(',');
  var animationIn = prefixAnimations(animations[0]);
  return { delay: delay, offset: offset$$1, flip: flip, content: content, position: position, boundary: boundary, animationIn: animationIn, duration: duration, triggers: triggers }
}
function prefixAnimations (str) {
  if (!str.trim()) {
    return ''
  }
  return str.match(/[\w-]+/g).map(function (v) { return ("uk-animation-" + v); }).join(' ')
}
function getTooltip () {
  if (!isEmpty(tooltip)) {
    return tooltip
  }
  var outer = document.createElement('div');
  var inner = document.createElement('div');
  addClass(outer, 'uk-tooltip');
  addClass(inner, 'uk-tooltip-inner');
  outer.appendChild(inner);
  tooltip.outer = outer;
  tooltip.inner = inner;
  return tooltip
}
function getContext$1 (target, binding, vnode) {
  var ctx = { target: target, binding: binding, vnode: vnode };
  ctx.props = getProps$1(ctx);
  if (!ctx.props) {
    binding.def.unbind(target, binding);
    return
  }
  return ctx
}

var docEl$3 = document.documentElement;
var isRtl$2 = attr(docEl$3, 'dir') === 'rtl';
var id$1 = 1;
var index$2 = {
  bind: function bind (el, binding) {
    el.vkheightmatchid = id$1++;
    on(window, 'resize', debounce(function () {
      update$1(el, binding);
    }, 10, true), ("vk-height-match-" + (el.vkheightmatchid)));
  },
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () { return update$1(el, binding); });
  },
  componentUpdated: function componentUpdated (el, binding) {
    update$1(el, binding);
  },
  unbind: function unbind (el) {
    off(window, 'resize', ("vk-height-match-" + (el.vkheightmatchid)));
  }
}
function update$1 (el, binding) {
  var options = merge({
    target: ':scope > *',
    row: true
  }, (binding.value || {}));
  var elements = el.querySelectorAll(options.target);
  elements = [].slice.call(elements);
  applyHeight(elements, '');
  var rows = getRows$1(elements, options.row);
  rows.forEach(function (els) {
    var ref = match(els);
    var height = ref.height;
    var elements = ref.elements;
    applyHeight(elements, (height + "px"));
  });
}
function getRows$1 (elements, row) {
  if (!row) {
    return [ elements ]
  }
  var rows = [[]];
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var dim = el.getBoundingClientRect();
    if (!dim.height) {
      continue
    }
    for (var j = rows.length - 1; j >= 0; j--) {
      var row$1 = rows[j];
      if (!row$1[0]) {
        row$1.push(el);
        break
      }
      var leftDim = row$1[0].getBoundingClientRect();
      if (dim.top >= Math.floor(leftDim.bottom)) {
        rows.push([el]);
        break
      }
      if (Math.floor(dim.bottom) > leftDim.top) {
        if (dim.left < leftDim.left && !isRtl$2) {
          row$1.unshift(el);
          break
        }
        row$1.push(el);
        break
      }
      if (j === 0) {
        rows.unshift([el]);
        break
      }
    }
  }
  return rows
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
    if (!isVisible$3(el)) {
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
function isVisible$3 (el) {
  return el.offsetHeight
}
function applyHeight (elements, height) {
  toArray(elements).forEach(function (el) { return css(el, 'minHeight', height); });
}

function offsetTop$1 (element) {
  return element.getBoundingClientRect().top + window.pageYOffset
}
var index$3 = {
  inserted: function inserted (el, binding, vnode) {
    vnode.context.$nextTick(function () {
      update$2(el, binding.modifiers, binding.value);
    });
    on(window, 'resize', debounce(function () {
      update$2(el, binding.modifiers, binding.value);
    }, 20), 'vk-height-viewport');
  },
  unbind: function unbind (el, binding, vnode) {
    off(window, 'resize', 'vk-height-viewport');
  }
}
function update$2 (el, modifiers, value) {
  if ( value === void 0 ) value = {};
  var viewport = window.innerHeight;
  var offset = 0;
  var height;
  css(el, 'boxSizing', 'border-box');
  if (modifiers.expand) {
    css(el, 'height', '');
    css(el, 'minHeight', '');
    var diff = viewport - document.documentElement.offsetHeight;
    height = (el.offsetHeight + diff) + "px";
    css(el, 'minHeight', height);
  } else {
    var top = offsetTop$1(el);
    if (top < viewport / 2 && value.offsetTop) {
      offset += top;
    }
    if (value.offsetBottom === true) {
      offset += el.nextElementSibling.offsetHeight || 0;
    } else if (isInteger(value.offsetBottom)) {
      offset += (viewport / 100) * value.offsetBottom;
    } else if (value.offsetBottom && value.offsetBottom.substr(-2) === 'px') {
      offset += parseFloat(value.offsetBottom);
    }
    height = offset
      ? ("calc(100vh - " + offset + "px)")
      : '100vh';
    css(el, 'min-height', height);
  }
}



var directives = Object.freeze({
	Margin: index,
	Tooltip: index$1,
	HeightMatch: index$2,
	HeightViewport: index$3
});

each(components, function (def, name) {
  def.name = "Vk" + (def.name);
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
