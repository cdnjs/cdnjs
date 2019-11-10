'use strict';

function each (array, iterator) {
  for (var i = 0; i < array.length; i++) {
    iterator(array[i], i);
  }
}

function shuffle (array) {
  if (!array || !array.length) {
    return array;
  }

  for (var i = array.length - 1; i > 0; i--) {
    var rnd = Math.random() * i | 0;
    var temp = array[i];

    array[i] = array[rnd];
    array[rnd] = temp;
  }

  return array;
}

function inherits (Class, SuperClass) {
  Class.prototype = Object.create(SuperClass.prototype, {
    constructor: {
      value: Class
    }
  });
}

function define (target, properties) {
  for (var propertyName in properties) {
    Object.defineProperty(target, propertyName, {
      value: properties[propertyName]
    });
  }
}

function extend (target, properties) {
  for (var propertyName in properties) {
    target[propertyName] = properties[propertyName];
  }
  return target;
}

function extendable (Class) {
  Class.extend = function extend (options) {
    function ExtendedClass (data) {
      Class.call(this, options, data);
    }

    inherits(ExtendedClass, Class);

    return ExtendedClass;
  };
}

function Observable (options) {
  Object.defineProperty(this, 'listeners', {
    enumerable: false,
    value: {},
    writable: true
  });

  for (var key in options) {
    this[key] = options[key];
  }
}

define(Observable.prototype, {
  on: function (eventName, handler) {
    if (typeof this.listeners[eventName] === 'undefined') {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push({ handler: handler, one: false });

    return this;
  },
  one: function (eventName, handler) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];

    this.listeners[eventName].push({ handler: handler, one: true });

    return this;
  },
  trigger: function (eventName) {
    var listeners = this.listeners[eventName];

    if (!listeners) {
      return this;
    }

    var args = new Array(arguments.length - 1);

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    for (i = 0; i < listeners.length; i++) {
      listeners[i].handler.apply(this, args);

      if (listeners[i].one) {
        listeners.splice(i--, 1);
      }
    }

    return this;
  },
  off: function (name, handler) {
    if (typeof name === 'undefined') {
      this.listeners = {};
    } else if (typeof handler === 'undefined') {
      this.listeners[name] = [];
    } else {
      var listeners = this.listeners[name];

      if (!listeners) {
        return this;
      }

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].handler === handler) {
          listeners.splice(i--, 1);
        }
      }
    }
    return this;
  }
});

function observable (options) {
  return new Observable(options);
}

var style = (typeof document !== 'undefined') ? (document.createElement('p').style) : {};
var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
var memoized = {};

function prefix (propertyName) {
  if (typeof memoized[propertyName] !== 'undefined') {
    return memoized[propertyName];
  }

  if (typeof style[propertyName] !== 'undefined') {
    memoized[propertyName] = propertyName;
    return propertyName;
  }

  var camelCase = propertyName[0].toUpperCase() + propertyName.slice(1);

  for (var i = 0, len = prefixes.length; i < len; i++) {
    var test = prefixes[i] + camelCase;

    if (typeof style[test] !== 'undefined') {
      memoized[propertyName] = test;

      return test;
    }
  }
}

function el (tagName, attributes) {
  attributes = attributes || {};
  if (attributes.svg) {
    var element =  document.createElementNS("http://www.w3.org/2000/svg", "svg")
  } else {
    var element = document.createElement(tagName || 'div');
  }

  for (var key in attributes) {
    if (key === 'text') {
      element.textContent = attributes.text;
    } else if (key === 'svg') {
      continue;
    } else if (key === 'style') {
      var styles = attributes.style.split(';');
      for (var i = 0; i < styles.length; i++) {
        var styleParts = styles[i].split(':');
        if (styleParts.length > 1) {
          element.style[styleParts[0].trim()] = styleParts[1].trim();
        }
      }
    } else if (key === 'html') {
      element.innerHTML = attributes[key];
    } else {
      element[key] = attributes[key];
    }
  }
  return element;
}

var EVENT = 'init inited mount mounted unmount unmounted sort sorted update updated destroy'.split(' ').reduce(function (obj, name) {
  obj[name] = name;
  return obj;
}, {});

function View (options, data) {
  Observable.call(this);

  options = options || {};

  this.el = null;
  this.eventListeners = [];
  this.listeners = {};

  for (var key in options) {
    if (EVENT[key]) {
      this.on(key, options[key]);
    } else if (key === 'text') {
        this.el = document.createTextNode(options.text || '');
    } else if (key === 'el') {
      if (typeof options.el === 'string') {
        this.el = document.createElement(options.el);
      } else if (options.el instanceof Array) {
        this.el = el(options.el[0], options.el[1]);
      } else {
        this.el = options.el;
      }
    } else {
      this[key] = options[key];
    }
  }

  this.trigger(EVENT.init, data);
  if (!this.el) {
    this.el = document.createElement('div');
  }
  this.el.view = this;
  this.trigger(EVENT.inited, data);
}

inherits(View, Observable);

define(View.prototype, {
  setAttr: function (attributeName, value) {
    if (this.el[attributeName] !== value) {
      this.el[attributeName] = value;
    }

    return this;
  },
  setClass: function (className, value) {
    if (this.el.classList.contains(className) !== value) {
      if (value) {
        this.el.classList.add(className);
      } else {
        this.el.classList.remove(className);
      }
    }

    return this;
  },
  setStyle: function (propertyName, value) {
    if (this.el.style[propertyName] !== value) {
      this.el.style[propertyName] = value;
    }

    return this;
  },
  setText: function (text) {
    if (this.el.textContent !== text) {
      this.el.textContent = text;
    }

    return this;
  },
  setHTML: function (html) {
    if (this.el.innerHTML !== html) {
      this.el.innerHTML = html;
    }

    return this;
  },
  addListener: function (listenerName, handler, useCapture) {
    var view = this;
    var listener = {
      name: listenerName,
      handler: handler,
      proxy: function (e) {
        handler.call(view, e);
      }
    };
    if (!this.eventListeners) this.eventListeners = [];

    this.eventListeners.push(listener);
    this.el.addEventListener(listenerName, listener.proxy, useCapture);

    return this;
  },
  removeListener: function (listenerName, handler) {
    var listeners = this.eventListeners;
    if (!listeners) {
      return this;
    }
    if (typeof listenerName === 'undefined') {
      for (var i = 0; i < listeners.length; i++) {
        this.el.removeEventListener(listeners[i].proxy);
      }
      this.listeners = [];
    } else if (typeof handler === 'undefined') {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].name === listenerName) {
          listeners.splice(i--, 1);
        }
      }
    } else {
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        if (listener.name === listenerName && handler === listener.handler) {
          listeners.splice(i--, 1);
        }
      }
    }

    return this;
  },
  addChild: function (child) {
    if (child.views) {
      child.parent = this;
      return this.setChildren(child.views);
    }
    var sorting = false;
    if (child.parent) {
      sorting = true;
      child.trigger(EVENT.sort);
    } else {
      child.trigger(EVENT.mount);
    }

    this.el.appendChild(child.el);
    child.parent = this;

    if (sorting) {
      child.trigger(EVENT.sorted);
    } else {
      child.trigger(EVENT.mounted);
    }

    return this;
  },
  addBefore: function (child, before) {
    var sorting = false;

    if (child.parent) {
      sorting = true;
      child.trigger(EVENT.sort);
    } else {
      child.trigger(EVENT.mount);
    }

    this.el.insertBefore(child.el, before.el || before);
    child.parent = this;

    if (sorting) {
      child.trigger(EVENT.sorted);
    } else {
      child.trigger(EVENT.mounted);
    }

    return this;
  },
  addAfter: function (child, after) {
    var afterEl = after.el || after;
    var nextAfterEl = afterEl.nextSibling;

    if (nextAfterEl) {
      this.addBefore(child, nextAfterEl);
    } else {
      this.addChild(child);
    }
  },
  setChildren: function (views) {
    if (views.views) {
      views.parent = this;
      return this.setChildren(views.views);
    }
    var traverse = this.el.firstChild;

    for (var i = 0; i < views.length; i++) {
      var view = views[i];

      if (traverse === view.el) {
        traverse = traverse.nextSibling;
        continue;
      }
      if (traverse) {
        this.addBefore(view, traverse);
      } else {
        this.addChild(view);
      }
    }
    while (traverse) {
      var next = traverse.nextSibling;

      if (traverse.view) {
        traverse.view.parent.removeChild(traverse.view);
      } else {
        this.el.removeChild(traverse);
      }

      traverse = next;
    }

    return this;
  },
  removeChild: function (child) {
    if (!child.parent) {
      return this;
    }
    child.trigger(EVENT.unmount);

    this.el.removeChild(child.el);
    child.parent = null;

    child.trigger(EVENT.unmounted);

    return this;
  },
  update: function (data) {
    this.trigger(EVENT.update, data);
  },
  destroy: function () {
    this.trigger(EVENT.destroy);
    if (this.parent) this.parent.removeChild(this);

    var traverse = this.el.firstChild;

    while (traverse) {
      if (traverse.view) {
        traverse.view.destroy();
      } else {
        this.el.removeChild(traverse);
      }
      traverse = this.el.firstChild;
    }
    this.off();
    this.removeListener();
  }
});

extendable(View);

function view (options, data) {
  return new View(options, data);
}

view.extend = function extend (options) {
  return function extendedView (data) {
    return new View(options, data);
  };
};

function ClassList (el) {
  var classNames = (this.className && this.className.split(' ')) || [];

  for (var i = 0; i < classNames.length; i++) {
    this.push(classNames[i]);
  }
  this._updateClassName = function () {
    el.className = this.join(' ');
  }
}

ClassList.prototype = [];

ClassList.prototype.add = function (className) {
  if (!this.contains(className)) {
    this.push(className);
    this._updateClassName();
  }
}

ClassList.prototype.contains = function (className) {
  var found = false;

  for (var i = 0; i < this.length; i++) {
    if (this[i] === className) {
      found = true;
      break;
    }
  }
}

ClassList.prototype.remove = function (className) {
  for (var i = 0; i < this.length; i++) {
    if (classNames[i] === className) {
      this.splice(i, 1);
      this._updateClassName();
    }
  }
}

function HTMLElement (options) {
  this.childNodes = [];
  this.style = {};

  for (var key in options) {
    this[key] = options[key];
  }
}

HTMLElement.prototype.render = function () {
  var attributes = [];
  var hasChildren = false;
  var content = '';

  for (var key in this) {
    if (!this.hasOwnProperty(key)) {
      continue;
    }
    if (key === 'childNodes') {
      if (this.childNodes.length) {
        hasChildren = true;
      }
    } else if (key === 'innerHTML') {
      content = this.innerHTML;
    } else if (key === 'style') {
      var styles = '';
      for (var styleName in this.style) {
        styles += styleName + ':' + this.style[styleName] + ';';
      }
      if (styles && styles.length) {
        attributes.push('style="' + styles + '"');
      }
    } else if (key === 'textContent') {
      content = this.textContent;
    } else if (key !== 'view' && key !== 'tagName' && key !== 'parentNode') {
      attributes.push(key + '="' + this[key] + '"');
    }
  }

  if (hasChildren) {
    if (attributes.length) {
      return '<' + this.tagName + ' ' + attributes.join('') + '>' + this.childNodes.map(childRenderer).join('') + '</' + this.tagName + '>'
    } else {
      return '<' + this.tagName + '>' + this.childNodes.map(childRenderer).join('') + '</' + this.tagName + '>'
    }
  } else if (content) {
    return '<' + this.tagName + '>' + content + '</' + this.tagName + '>';
  } else {
    return '<' + this.tagName + '>';
  }
}

HTMLElement.prototype.addEventListener = function () {}
HTMLElement.prototype.removeEventListener = function () {}

HTMLElement.prototype.appendChild = function (child) {
  child.parentNode = this;
  for (var i = 0; i < this.childNodes.length; i++) {
    if (this.childNodes[i] === child) {
      this.childNodes.splice(i, 1);
    }
  }
  this.childNodes.push(child);
}

HTMLElement.prototype.insertBefore = function (child, before) {
  child.parentNode = this;
  for (var i = 0; i < this.childNodes.length; i++) {
    if (this.childNodes[i] === before) {
      this.childNodes.splice(i++, 0, child);
    } else if (this.childNodes[i] === child) {
      this.childNodes.splice(i, 1);
    }
  }
}

HTMLElement.prototype.removeChild = function (child) {
  child.parentNode = null;
  for (var i = 0; i < this.childNodes.length; i++) {
    if (this.childNodes[i] === child) {
      this.childNodes.splice(i, 1);
    }
  }
}

Object.defineProperties(HTMLElement.prototype, {
  classList: {
    get: function () {
      return new ClassList(this);
    }
  },
  firstChild: {
    get: function () {
      return this.childNodes[0];
    }
  },
  nextSibling: {
    get: function () {
      var siblings = this.parentNode.childNodes;

      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] === this) {
          return siblings[i + 1];
        }
      }
    }
  }
});

function childRenderer (child) {
  return child.render();
}

var ease = {
  linear: linear,
  quadIn: quadIn,
  quadOut: quadOut,
  quadInOut: quadInOut,
  cubicIn: cubicIn,
  cubicOut: cubicOut,
  cubicInOut: cubicInOut,
  quartIn: quartIn,
  quartOut: quartOut,
  quartInOut: quartInOut,
  quintIn: quintIn,
  quintOut: quintOut,
  quintInOut: quintInOut,
  bounceIn: bounceIn,
  bounceOut: bounceOut,
  bounceInOut: bounceInOut
};

function linear (t) {
  return t;
}

function quadIn (t) {
  return Math.pow(t, 2);
}

function quadOut (t) {
  return 1 - quadIn(1 - t);
}

function quadInOut (t) {
  if (t < 0.5) {
    return quadIn(t * 2) / 2;
  }
  return 1 - quadIn((1 - t) * 2) / 2;
}

function cubicIn (t) {
  return Math.pow(t, 3);
}

function cubicOut (t) {
  return 1 - cubicIn(1 - t);
}

function cubicInOut (t) {
  if (t < 0.5) {
    return cubicIn(t * 2) / 2;
  }
  return 1 - cubicIn((1 - t) * 2) / 2;
}

function quartIn (t) {
  return Math.pow(t, 4);
}

function quartOut (t) {
  return 1 - quartIn(1 - t);
}

function quartInOut (t) {
  if (t < 0.5) {
    return quartIn(t * 2) / 2;
  }
  return 1 - quartIn((1 - t) * 2) / 2;
}

function quintIn (t) {
  return Math.pow(t, 5);
}

function quintOut (t) {
  return 1 - quintOut(1 - t);
}

function quintInOut (t) {
  if (t < 0.5) {
    return quintIn(t * 2) / 2;
  }
  return 1 - quintIn((1 - t) * 2) / 2;
}

function bounceOut (t) {
  var s = 7.5625;
  var p = 2.75;

  if (t < 1 / p) {
    return s * t * t;
  }
  if (t < 2 / p) {
    t -= 1.5 / p;
    return s * t * t + 0.75;
  }
  if (t < 2.5 / p) {
    t -= 2.25 / p;
    return s * t * t + 0.9375;
  }
  t -= 2.625 / p;
  return s * t * t + 0.984375;
}

function bounceIn (t) {
  return 1 - bounceOut(1 - t);
}

function bounceInOut (t) {
  if (t < 0.5) {
    return bounceIn(t * 2) / 2;
  }
  return 1 - bounceIn((1 - t) * 2) / 2;
}

var EVENTS = 'init inited mount mounted unmount unmounted sort sorted update updated destroy'.split(' ').reduce(function (obj, key) {
  obj[key] = true;
  return obj;
}, {});

function ViewList (options) {
  Observable.call(this);

  this.lookup = {};
  this.views = [];

  for (var key in options) {
    if (EVENTS[key]) {
      this.on(key, options[key]);
    } else {
      this[key] = options[key];
    }
  }
}

inherits(ViewList, Observable);

define(ViewList.prototype, {
  update: function (data) {
    var viewList = this;
    var views = new Array(data.length);
    var lookup = {};
    var currentViews = this.views;
    var currentLookup = this.lookup;
    var key = this.key;

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var id = key && item[key];
      var ViewClass = this.View || View;
      var view = (key ? currentLookup[id] : currentViews[i]) || new ViewClass();

      for (var j = 0; j < EVENTS.length; j++) {
        var name = EVENTS[j];
        view.on(name, function (data) {
          viewList.trigger(name, view, data);
        });
      }

      if (key) lookup[id] = view;

      views[i] = view;
      view.update(item);
    }
    if (key) {
      for (var id in currentLookup) {
        if (!lookup[id]) {
          currentLookup[id].destroy();
        }
      }
    } else {
      for (var i = views.length; i < currentViews.length; i++) {
        currentViews[i].destroy();
      }
    }
    this.views = views;
    this.lookup = lookup;
    if (this.parent) this.parent.setChildren(views);
  },
  destroy: function () {
    this.update([]);
    this.off();
  }
});

extendable(ViewList);

function viewList (options) {
  return new ViewList(options);
}

viewList.extend = function extend (options) {
  return function extendedViewList (data) {
    return new ViewList(options, data);
  };
};

var hasRequestAnimationFrame = typeof requestAnimationFrame !== 'undefined';

function raf (callback) {
  if (hasRequestAnimationFrame) {
    return requestAnimationFrame(callback);
  } else {
    return setTimeout(callback, 1000 / 60);
  }
}

raf.cancel = function cancel (id) {
  if (hasRequestAnimationFrame) {
    cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
};

var requestedAnimationFrames = [];
var ticking$1;

function baf (callback) {
  requestedAnimationFrames.push(callback);
  if (ticking$1) return;

  ticking$1 = raf(function () {
    ticking$1 = false;
    var animationFrames = requestedAnimationFrames.splice(0, requestedAnimationFrames.length);

    for (var i = 0; i < animationFrames.length; i++) {
      animationFrames[i]();
    }
  });
}

baf.cancel = function cancel (cb) {
  for (var i = 0; i < requestedAnimationFrames.length; i++) {
    if (requestedAnimationFrames[i] === cb) {
      requestedAnimationFrames.splice(i--, 1);
    }
  }
};

var animations = [];
var ticking;

function Animation (options) {
  Observable.call(this);

  var delay = options.delay || 0;
  var duration = options.duration || 0;
  var easing = options.easing || 'quadOut';
  var init = options.init;
  var start = options.start;
  var progress = options.progress;
  var end = options.end;

  var now = Date.now();

  this.startTime = now + delay;
  this.endTime = this.startTime + duration;
  this.easing = ease[easing];
  this.started = false;

  if (init) this.on('init', init);
  if (start) this.on('start', start);
  if (progress) this.on('progress', progress);
  if (end) this.on('end', end);

  // add animation
  animations.push(this);

  this.trigger('init');

  if (!ticking) {
    // start ticking
    ticking = true;
    baf(tick);
  }
}

inherits(Animation, Observable);

define(Animation.prototype, {
  destroy: function () {
    for (var i = 0; i < animations.length; i++) {
      if (animations[i] === this) {
        animations.splice(i, 1);
        return;
      }
    }
  }
});

function animation (options) {
  return new Animation(options);
}

function tick () {
  var now = Date.now();

  if (!animations.length) {
    // stop ticking
    ticking = false;
    return;
  }

  for (var i = 0; i < animations.length; i++) {
    var animation = animations[i];

    if (now < animation.startTime) {
      // animation not yet started..
      continue;
    }
    if (!animation.started) {
      // animation starts
      animation.started = true;
      animation.trigger('start');
    }
    // animation progress
    var t = (now - animation.startTime) / (animation.endTime - animation.startTime);
    if (t > 1) {
      t = 1;
    }
    animation.trigger('progress', animation.easing(t), t);
    if (now > animation.endTime) {
      // animation ended
      animation.trigger('end');
      animations.splice(i--, 1);
      continue;
    }
  }
  baf(tick);
}

var has3d;

function translate (x, y, z) {
  if (typeof has3d === 'undefined') {
    has3d = check3d();
  }

  if (has3d || z) {
    return 'translate3d(' + (x || 0) + ', ' + (y || 0) + ', ' + (z || 0) + ')';
  } else {
    return 'translate(' + (x || 0) + ', ' + (y || 0) + ')';
  }
}

function check3d () {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isMobile) {
    return false;
  }

  var transform = prefix('transform');
  var $p = document.createElement('p');

  document.body.appendChild($p);
  $p.style[transform] = 'translate3d(1px,1px,1px)';
  has3d = $p.style[transform];

  if (typeof has3d !== 'undefined' && has3d !== null && has3d.length && has3d !== 'none') {
    has3d = true;
  } else {
    has3d = false;
  }

  document.body.removeChild($p);

  return has3d;
}

global.document = {
  createElement (tagName) {
    return new HTMLElement({
      tagName: tagName
    });
  }
};

global.window = {}

global.navigator = {
  userAgent: ''
}

var server = true;
View.prototype.render = function () {
  return this.el.render();
}

exports.server = server;
exports.ease = ease;
exports.el = el;
exports.prefix = prefix;
exports.view = view;
exports.View = View;
exports.viewList = viewList;
exports.ViewList = ViewList;
exports.animation = animation;
exports.Animation = Animation;
exports.observable = observable;
exports.Observable = Observable;
exports.define = define;
exports.each = each;
exports.extend = extend;
exports.extendable = extendable;
exports.inherits = inherits;
exports.shuffle = shuffle;
exports.translate = translate;
exports.baf = baf;
exports.raf = raf;