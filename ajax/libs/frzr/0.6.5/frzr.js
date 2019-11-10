'use strict';

var frzr = (function () {
  'use strict';

  // This is just a very basic inheritable Observable class, like node.js's but with jQuery's API style

  function Observable() {
    this.listeners = {};
  }

  Observable.prototype.on = function (name, cb, ctx, once) {
    this.listeners[name] || (this.listeners[name] = []);
    this.listeners[name].push({
      once: once || false,
      cb: cb,
      ctx: ctx
    });
  };

  Observable.prototype.one = function (name, cb, ctx) {
    this.on(name, cb, ctx, true);
  };

  Observable.prototype.off = function (name, cb, ctx) {
    if (typeof name === 'undefined') {
      this.listeners = {};
      return;
    }
    if (typeof cb === 'undefined') {
      this.listeners[name] = [];
      return;
    }
    var listeners = this.listeners[name];
    if (!listeners) {
      return;
    }
    for (var i = 0, len = listeners.length; i < len; i++) {
      if (ctx) {
        if (listeners[i].ctx === ctx) {
          listeners.splice(i--, 1);
          len--;
        }
        continue;
      }
      if (listeners[i].cb === cb) {
        listeners.splice(i--, 1);
        len--;
      }
    }
  };

  Observable.prototype.trigger = function (name) {
    var listeners = this.listeners[name];
    var len = arguments.length - 1;
    var args = new Array(len);

    // V8 optimization
    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments

    for (var i = 0; i < len; i++) {
      args[i] = arguments[i + 1];
    }

    if (!listeners) {
      return;
    }

    var listener;

    for (i = 0; i < listeners.length; i++) {
      listener = listeners[i];
      listener.cb.apply(listener.ctx || this, args);
      if (listener.once) {
        listeners.splice(i--, 1);
        len--;
      }
    }
  };

  function each(array, iterator) {
    var len = array.length;

    for (var i = 0; i < len; i++) {
      iterator(array[i], i, len);
    }
  }

  function filter(array, iterator) {
    var results = [];
    var len = array.length;
    var item;

    for (var i = 0; i < len; i++) {
      item = array[i];
      iterator(item, i, len) && results.push(item);
    }

    return results;
  }

  function shuffle(array) {
    if (!array || !array.length) {
      return array;
    }

    var rnd, temp;

    for (var i = array.length - 1; i > 0; i--) {
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }

    return array;
  }

  function map(array, iterator) {
    var len = array.length;
    var results = new Array(len);

    for (var i = 0; i < len; i++) {
      results[i] = iterator(array[i], i, len);
    }

    return results;
  }

  function inherits(targetClass, superClass) {
    targetClass['super'] = superClass;
    targetClass.prototype = Object.create(superClass.prototype, {
      constructor: {
        configurable: true,
        value: targetClass,
        writable: true
      }
    });
  }

  var pow = Math.pow;

  var ease = { linear: linear, quadIn: quadIn, quadOut: quadOut, quadInOut: quadInOut, cubicIn: cubicIn, cubicOut: cubicOut, cubicInOut: cubicInOut, quartIn: quartIn, quartOut: quartOut, quartInOut: quartInOut, quintIn: quintIn, quintOut: quintOut, quintInOut: quintInOut, bounceIn: bounceIn, bounceOut: bounceOut, bounceInOut: bounceInOut };

  function linear(t) {
    return t;
  }

  function quadIn(t) {
    return pow(t, 2);
  }

  function quadOut(t) {
    return 1 - quadIn(1 - t);
  }

  function quadInOut(t) {
    if (t < 0.5) {
      return quadIn(t * 2) / 2;
    }
    return 1 - quadIn((1 - t) * 2) / 2;
  }

  function cubicIn(t) {
    return pow(t, 3);
  }

  function cubicOut(t) {
    return 1 - cubicIn(1 - t);
  }

  function cubicInOut(t) {
    if (t < 0.5) {
      return cubicIn(t * 2) / 2;
    }
    return 1 - cubicIn((1 - t) * 2) / 2;
  }

  function quartIn(t) {
    return pow(t, 4);
  }

  function quartOut(t) {
    return 1 - quartIn(1 - t);
  }

  function quartInOut(t) {
    if (t < 0.5) {
      return quartIn(t * 2) / 2;
    }
    return 1 - quartIn((1 - t) * 2) / 2;
  }

  function quintIn(t) {
    return pow(t, 5);
  }

  function quintOut(t) {
    return 1 - quintOut(1 - t);
  }

  function quintInOut(t) {
    if (t < 0.5) {
      return quintIn(t * 2) / 2;
    }
    return 1 - quintIn((1 - t) * 2) / 2;
  }

  function bounceOut(t) {
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

  function bounceIn(t) {
    return 1 - bounceOut(1 - t);
  }

  function bounceInOut(t) {
    if (t < 0.5) {
      return bounceIn(t * 2) / 2;
    }
    return 1 - bounceIn((1 - t) * 2) / 2;
  }

  var requestAnimationFrame = window.requestAnimationFrame || function (cb) {
    setTimeout(cb, 1000 / 60);
  };

  var ticking;
  var animations = [];

  function Animation(_ref) {
    var _ref$delay = _ref.delay;
    var delay = _ref$delay === undefined ? 0 : _ref$delay;
    var _ref$duration = _ref.duration;
    var duration = _ref$duration === undefined ? 0 : _ref$duration;
    var easing = _ref.easing;
    var start = _ref.start;
    var progress = _ref.progress;
    var end = _ref.end;

    Animation['super'].call(this);

    var now = Date.now();

    // calculate animation start/end times
    this.startTime = now + delay;
    this.endTime = this.startTime + duration;
    this.easing = ease[easing] || ease['quadOut'];

    this.started = false;

    start && this.on('start', start);
    progress && this.on('progress', progress);
    end && this.on('end', end);

    // add animation
    animations.push(this);

    if (!ticking) {
      // start ticking
      ticking = true;
      requestAnimationFrame(tick);
    }
  }

  inherits(Animation, Observable);

  Animation.prototype.destroy = function () {
    for (var i = 0; i < animations.length; i++) {
      if (animations[i] === this) {
        animations.splice(i, 1);
        return;
      }
    }
  };

  function tick() {
    var now = Date.now();

    if (!animations.length) {
      // stop ticking
      ticking = false;
      return;
    }

    for (var i = 0, animation; i < animations.length; i++) {
      animation = animations[i];
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
    requestAnimationFrame(tick, true);
  }

  var d = document;

  function element(type, attrs) {
    // Just a simple helper for creating DOM elements
    var $el = d.createElement(type);

    if (typeof attrs !== 'undefined') {
      for (var attr in attrs) {
        $el.setAttribute(attr, attrs[attr]);
      }
    }

    return $el;
  }

  function SVGelement(type, attrs) {
    // Just a simple helper for creating SVG DOM elements
    var $el = d.createElementNS('http://www.w3.org/2000/svg', type);

    if (typeof attrs !== 'undefined') {
      for (var attr in attrs) {
        $el.setAttribute(attrs, attrs[attr]);
      }
    }

    return $el;
  }

  var ticking$1 = [];
  // very simple polyfill for requestAnimationFrame

  var renderer = new Observable();

  function batchAnimationFrame(cb) {
    // batchAnimationFrame collects multiple requestAnimationFrame calls to a single call
    if (!ticking$1.length) {
      // render cycle starts
      renderer.trigger('render');
      requestAnimationFrame(tick$1);
    }
    ticking$1.push(cb);
  }

  function tick$1() {
    var cbs = ticking$1.splice(0, ticking$1.length);
    for (var i = 0, len = cbs.length; i < len; i++) {
      cbs[i]();
    }
    if (ticking$1.length === 0) {
      // render cycle ends
      renderer.trigger('rendered');
      return;
    }
    tick$1();
  }

  var style = document.createElement('p').style;
  var memoized = {};

  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
      return memoized[param];
    }

    if (typeof style[param] !== 'undefined') {
      memoized[param] = param;
      return param;
    }

    var camelCase = param[0].toUpperCase() + param.slice(1);
    var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
    var test;

    for (var i = 0, len = prefixes.length; i < len; i++) {
      test = prefixes[i] + camelCase;
      if (typeof style[test] !== 'undefined') {
        memoized[param] = test;
        return test;
      }
    }
  }

  var d$1 = document;
  var body = document.body;
  var has3d;

  function translate(a, b, c) {
    typeof has3d !== 'undefined' || (has3d = check3d());

    c = c || 0;

    if (has3d) {
      return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
      return 'translate(' + a + ', ' + b + ')';
    }
  }

  function check3d() {
    // I admit, this line is stealed from the great Velocity.js!
    // http://julian.com/research/velocity/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
      return false;
    }

    var transform = prefix('transform');
    var $p = d$1.createElement('p');

    body.appendChild($p);
    $p.style[transform] = 'translate3d(1px,1px,1px)';

    has3d = $p.style[transform];
    has3d = has3d != null && has3d.length && has3d !== 'none';

    body.removeChild($p);

    return has3d;
  }

  function View(options) {
    var self = this;
    var isView = self instanceof View;

    if (!isView) {
      return new View(options);
    }
    var svg = options && options.svg || false;

    View['super'].call(self); // init Observable

    self.$el = svg ? SVGelement(options.el || 'svg') : element(options.el || 'div');
    self.$root = null;
    self.parent = null;

    self.data = {};

    self._attrs = {};
    self._class = {};
    self._style = {};
    self._text = '';

    options && self.opt(options, null, true);
    self.trigger('init', self);
    options.data && self.set(options.data);
    self.trigger('inited', self);
  }

  inherits(View, Observable);

  View.extend = function (superOptions) {
    return function ExtendedView(options) {
      if (!options) {
        return new View(superOptions);
      }
      var currentOptions = {};

      for (var key in superOptions) {
        currentOptions[key] = superOptions[key];
      }
      for (key in options) {
        currentOptions[key] = options[key];
      }
      return new View(currentOptions);
    };
  };

  View.prototype.mount = function (target) {
    var self = this;

    if (self.parent) {
      // If already have parent, remove parent listeners first
      self.parent.off('mount', onParentMount, self);
      self.parent.off('mounted', onParentMounted, self);
    }

    if (self.$root) {
      self.trigger('unmount');
      self.trigger('unmounted');
    }

    if (target instanceof View) {
      self.parent = target;
      self.$root = target.$el;
    } else {
      self.$root = target;
    }

    batchAnimationFrame(function () {
      if (self.parent) {
        self.parent.on('mount', onParentMount, self);
        self.parent.on('mounted', onParentMounted, self);
      }
      self.trigger('mount');
      self.$root.appendChild(self.$el);
      self.trigger('mounted');
    });
  };

  function onParentMount() {
    this.trigger('parentmount');
  }

  function onParentMounted() {
    this.trigger('parentmounted');
  }

  View.prototype.unmount = function () {
    var self = this;
    var $el = self.$el;

    if (!self.$root) {
      return;
    }

    if (self.parent) {
      self.parent.off('mount', onParentMount, self);
      self.parent.off('mounted', onParentMounted, self);
    }

    batchAnimationFrame(function () {
      self.trigger('unmount');
      self.$root.removeChild($el);
      self.$root = null;
      self.parent = null;
      self.trigger('unmounted');
    });
  };

  View.prototype.destroy = function () {
    var self = this;

    self.trigger('destroy');
    self.off();
    self.unmount();
    self.trigger('destroyed');
  };

  View.prototype.mountBefore = function (target, before) {
    var self = this;
    var $el = self.$el;

    self.$root = target;

    batchAnimationFrame(function () {
      target.insertBefore($el, before);
    });
  };

  View.prototype.set = function (key, value) {
    var self = this;
    var data = {};

    if (typeof key === 'string') {
      data[key] = value;
    } else if (key != null) {
      data = key;
    }

    batchAnimationFrame(function () {
      self.trigger('render');
    });
    self.trigger('update', data);

    for (key in data) {
      self.data[key] = data[key];
    }

    self.trigger('updated');
    batchAnimationFrame(function () {
      self.trigger('rendered');
    });
  };

  View.prototype.opt = function (key, value, skipData) {
    var self = this;
    var options = {};

    if (typeof key === 'undefined') {
      return;
    }

    if (typeof key === 'string') {
      options[key] = value;
    } else if (key != null) {
      options = key;
    }

    for (key in options) {
      if (key === 'attr') {
        self.attr(options.attr);
      } else if (key === 'href') {
        self.attr({
          href: options.href
        });
      } else if (key === 'id') {
        self.attr({
          id: options.id
        });
      } else if (key === 'data') {
        if (!skipData) {
          self.set(options.data);
        }
      } else if (key === 'style') {
        if (typeof options.style === 'string') {
          self.attr({
            style: options.style
          });
          continue;
        }
        self.style(options.style);
      } else if (key === 'class') {
        if (typeof options['class'] === 'string') {
          self.attr({
            'class': options['class']
          });
          continue;
        }
        self['class'](options['class']);
      } else if (key === 'text') {
        self.text(options.text);
      } else if (key === 'listen') {
        self.listen(options.listen);
      } else if (key === 'init') {
        self.on('init', options.init);
      } else if (key === 'update') {
        self.on('update', options.update);
      } else if (key === 'mount') {
        self.on('mount', options.mount);
      } else if (key === 'mounted') {
        self.on('mounted', options.mounted);
      } else if (key === 'unmount') {
        self.on('unmount', options.unmount);
      } else if (key === 'unmounted') {
        self.on('unmounted', options.unmounted);
      } else if (key === 'destroy') {
        self.on('destroy', options.destroy);
      } else if (key === 'parent') {
        self.mount(options.parent);
      } else if (key === '$root') {
        self.mount(options.$root);
      } else {
        self[key] = options[key];
      }
    }
  };

  View.prototype.text = function (text) {
    var self = this;
    var $el = self.$el;

    if (text !== self._text) {
      self._text = text;

      batchAnimationFrame(function () {
        if (text === self._text) {
          $el.textContent = text;
        }
      });
    }
  };

  View.prototype.listen = function (key, value) {
    var self = this;
    var $el = self.$el;
    var listeners = {};
    if (typeof key === 'string') {
      listeners[key] = value;
    } else if (key != null) {
      listeners = key;
    }

    for (key in listeners) {
      value = listeners[key];
      addListener(key, value);
    }
    function addListener(key, value) {
      self.on(key, value);
      $el.addEventListener(key, function (e) {
        self.trigger(key, e);
      });
    }
  };

  View.prototype['class'] = function (key, value) {
    var self = this;
    var $el = self.$el;
    var classes = {};

    if (typeof key === 'string') {
      classes[key] = value;
    } else if (key != null) {
      classes = key;
    }

    for (key in classes) {
      value = classes[key];
      if (self._class[key] !== value) {
        self._class[key] = value;
        setClass(key, value);
      }
    }

    function setClass(key, value) {
      batchAnimationFrame(function () {
        if (self._class[key] === value) {
          if (value) {
            $el.classList.add(key);
          } else {
            $el.classList.remove(key);
          }
        }
      });
    }
  };

  View.prototype.style = function (key, value) {
    var self = this;
    var $el = self.$el;
    var style = {};
    if (typeof key === 'string') {
      style[key] = value;
    } else if (key != null) {
      style = key;
    }

    for (key in style) {
      value = style[key];
      if (self._style[key] !== value) {
        self._style[key] = value;
        setStyle(key, value);
      }
    }

    function setStyle(key, value) {
      batchAnimationFrame(function () {
        if (self._style[key] === style[key]) {
          $el.style[key] = value;
        }
      });
    }
  };

  View.prototype.attr = function (key, value) {
    var self = this;
    var $el = self.$el;
    var currentAttrs = self._attrs;
    var attrs = {};
    var attr;

    if (typeof key === 'string') {
      attrs[key] = value;
    } else if (key != null) {
      attrs = key;
    }

    for (attr in attrs) {
      value = attrs[attr];
      if (value !== currentAttrs[attr]) {
        self._attrs[attr] = value;

        if (value === self._attrs[attr]) {
          setAttr(attr, value);
        }
      }
    }

    function setAttr(attr, value) {
      batchAnimationFrame(function () {
        if (value === self._attrs[attr]) {
          if (value === false || value == null) {
            $el.removeAttribute(attr);
            return;
          }
          $el.setAttribute(attr, value);

          if (attr === 'autofocus') {
            if (value) {
              $el.focus();
              self.on('mounted', onAutofocus);
              self.on('parentmounted', onAutofocus, self);
            } else {
              self.off('mounted', onAutofocus);
              self.off('parentmounted', onAutofocus, self);
            }
          }
        }
      });
    }
  };

  function onAutofocus() {
    this.$el.focus();
  }

  function Views(ChildView, options) {
    var isViews = this instanceof Views;
    if (!isViews) {
      return new Views(ChildView, options);
    }
    this.view = new View(options);
    this.views = [];
    this.lookup = {};
    this.ChildView = ChildView || View;
  }

  inherits(Views, Observable);

  Views.prototype.mount = function (target) {
    this.view.mount(target);
  };

  Views.prototype.mountBefore = function (target, before) {
    this.view.mountBefore(target, before);
  };

  Views.prototype.unmount = function () {
    this.view.unmount();
  };

  Views.prototype.reset = function (data, key) {
    var self = this;
    var ChildView = self.ChildView;

    var views = new Array(data.length);
    var lookup = {};
    var currentLookup = self.lookup;

    each(data, function (item, i) {
      var id_or_i = key ? item[key] : i;
      var view = currentLookup[id_or_i];

      if (!view) {
        view = new ChildView({ parent: self.view });
      }
      lookup[id_or_i] = view;
      view.set(item);
      views[i] = view;
    });
    for (var id in currentLookup) {
      if (!lookup[id]) {
        currentLookup[id].destroy();
      }
    }
    self.views = views;
    self.lookup = lookup;
    self.reorder();
  };

  Views.prototype.reorder = function () {
    var self = this;
    var $root = self.view.$el;

    batchAnimationFrame(function () {
      var traverse = $root.firstChild;

      each(self.views, function (view, i) {
        if (traverse === view.$el) {
          traverse = traverse.nextSibling;
          return;
        }
        if (traverse) {
          view.$root = $root;
          $root.insertBefore(view.$el, traverse);
        } else {
          view.$root = $root;
          $root.appendChild(view.$el);
        }
      });
      var next;
      while (traverse) {
        next = traverse.nextSibling;
        $root.removeChild(traverse);
        traverse = next;
      }
    });
  };

  var bundle = {
    Animation: Animation,
    batchAnimationFrame: batchAnimationFrame,
    each: each,
    element: element,
    filter: filter,
    inherits: inherits,
    map: map,
    shuffle: shuffle,
    prefix: prefix,
    renderer: renderer,
    translate: translate,
    Observable: Observable,
    SVGelement: SVGelement,
    View: View,
    Views: Views
  };

  return bundle;
})();
