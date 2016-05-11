'use strict';

var frzr = (function () {
  'use strict';

  function element(type, attrs) {
    // Just a simple helper for creating DOM elements
    var $el = document.createElement(type);

    if (typeof attrs !== 'undefined') {
      for (var attr in attrs) {
        $el.setAttribute(attr, attrs[attr]);
      }
    }

    return $el;
  }

  function SVGelement(type, attrs) {
    // Just a simple helper for creating SVG DOM elements
    var $el = document.createElementNS('http://www.w3.org/2000/svg', type);

    if (typeof attrs !== 'undefined') {
      for (var attr in attrs) {
        $el.setAttribute(attrs, attrs[attr]);
      }
    }

    return $el;
  }

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

  var ticking = [];
  // very simple polyfill for requestAnimationFrame
  var requestAnimationFrame = window.requestAnimationFrame || function (cb) {
    setTimeout(cb, 1000 / 60);
  };

  var renderer = new Observable();

  function batchAnimationFrame(cb) {
    // batchAnimationFrame collects multiple requestAnimationFrame calls to a single call
    if (!ticking.length) {
      // render cycle starts
      renderer.trigger('render');
      requestAnimationFrame(tick);
    }
    ticking.push(cb);
  }

  function tick() {
    var cbs = ticking.splice(0, ticking.length);
    for (var i = 0, len = cbs.length; i < len; i++) {
      cbs[i]();
    }
    if (ticking.length === 0) {
      // render cycle ends
      renderer.trigger('rendered');
      return;
    }
    tick();
  }

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

  function View(options) {
    var self = this;
    var isView = self instanceof View;

    if (!isView) {
      return new View(options);
    }
    var svg = options && options.svg || false;
    var data = options.data;
    options.data = null;

    View['super'].call(self); // init Observable

    self.$el = svg ? SVGelement(options.el || 'svg') : element(options.el || 'div');
    self.$root = null;
    self.parent = null;

    self._attrs = {};
    self._class = {};
    self._data = {};
    self._style = {};
    self._text = '';

    options && self.opt(options);
    self.trigger('init', self);
    data && self.set(data);
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

    for (var key in data) {
      self._data[key] = data[key];
    }

    self.trigger('updated');
    batchAnimationFrame(function () {
      self.trigger('rendered');
    });
  };

  View.prototype.opt = function (key, value) {
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
      if (key === 'attrs') {
        self.attr(options.attrs);
      } else if (key === 'attr') {
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
        self.set(options.data);
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
        self.addListeners(options.listen);
      } else if (key === 'init') {
        self.on('init', options.init);
      } else if (key === 'update') {
        self.on('update', options.update);
      } else if (key === 'parent') {
        self.mount(options.parent);
      } else if (key === '$root') {
        self.mount(options.$root);
      } else {
        self[key] = options[key];
      }
    }
  };

  View.prototype.textContent = function (key, value) {
    console.error('DEPRECATED! Please use .text instead..');
    this.text(key, value);
  };

  View.prototype.setOptions = function (key, value) {
    console.error('DEPRECATED! Please use .opt instead..');
    this.opt(key, value);
  };

  View.prototype.setAttributes = function (key, value) {
    console.error('DEPRECATED! Please use .attr instead..');
    this.attr(key, value);
  };

  View.prototype.setClass = function (key, value) {
    console.error('DEPRECATED! Please use .class instead..');
    this['class'](key, value);
  };

  View.prototype.setStyle = function (key, value) {
    console.error('DEPRECATED! Please use .style instead..');
    this.style(key, value);
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
    batchAnimationFrame: batchAnimationFrame,
    each: each,
    element: element,
    filter: filter,
    inherits: inherits,
    map: map,
    shuffle: shuffle,
    renderer: renderer,
    Observable: Observable,
    SVGelement: SVGelement,
    View: View,
    Views: Views
  };

  return bundle;
})();
