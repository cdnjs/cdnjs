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
      ctx: ctx || this
    });
  };

  Observable.prototype.one = function (name, cb, ctx) {
    this.on(name, cb, ctx, true);
  };

  Observable.prototype.off = function (name, cb) {
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
    var svg = options && options.svg || false;

    View['super'].call(this); // init Observable

    this.$el = svg ? SVGelement(options.el || 'svg') : element(options.el || 'div');
    this.attrs = {};
    this['class'] = {};
    this.data = {};
    this.style = {};

    options && this.setOptions(options, true);
    this.trigger('init', this);
    options.data && this.set(options.data);
    this.trigger('inited', this);
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
    var $el = self.$el;

    self.$root = target;

    batchAnimationFrame(function () {
      self.trigger('mount');
      target.appendChild($el);
      self.trigger('mounted');
    });
  };

  View.prototype.unmount = function () {
    var self = this;
    var $el = self.$el;

    if (!self.$root) {
      return;
    }

    batchAnimationFrame(function () {
      self.trigger('unmount');
      self.$root.removeChild($el);
      self.$root = null;
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
    var $el = this.$el;

    this.$root = target;

    batchAnimationFrame(function () {
      target.insertBefore($el, before);
    });
  };

  View.prototype.set = function (data) {
    var self = this;
    batchAnimationFrame(function () {
      self.trigger('render');
    });
    self.trigger('update', data);
    for (var key in data) {
      self.data[key] = data[key];
    }
    self.trigger('updated');
    batchAnimationFrame(function () {
      self.trigger('rendered');
    });
  };

  View.prototype.setOptions = function (options, skipData) {
    if (!options) {
      return;
    }
    var key;

    for (key in options) {
      if (key === 'attrs') {
        this.setAttributes(options.attrs);
      } else if (key === 'data') {
        if (!skipData) {
          this.set(options.data);
        }
      } else if (key === 'style') {
        if (typeof options.style === 'string') {
          this.setAttributes({
            style: options.style
          });
          continue;
        }
        this.setStyle(options.style);
      } else if (key === 'class') {
        if (typeof options['class'] === 'string') {
          this.setAttributes({
            'class': options['class']
          });
          continue;
        }
        this.setClass(options['class']);
      } else if (key === 'textContent') {
        this.textContent(options.textContent);
      } else if (key === 'listen') {
        this.addListeners(options.listen);
      } else if (key === 'init') {
        this.on('init', options.init);
      } else if (key === 'update') {
        this.on('update', options.update);
      } else {
        this[key] = options[key];
      }
    }
  };

  View.prototype.textContent = function (text) {
    var self = this;
    var $el = self.$el;

    if (text !== self.text) {
      self.text = text;

      batchAnimationFrame(function () {
        if (text === self.text) {
          $el.textContent = text;
        }
      });
    }
  };

  View.prototype.addListeners = function (listeners) {
    var self = this;
    var $el = self.$el;
    var key, value;

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

  View.prototype.setClass = function (classes) {
    var self = this;
    var $el = self.$el;
    var key, value;

    for (key in classes) {
      value = classes[key];
      if (self['class'][key] !== value) {
        self['class'][key] = value;
        setClass(key, value);
      }
    }

    function setClass(key, value) {
      batchAnimationFrame(function () {
        if (self['class'][key] === value) {
          if (value) {
            $el.classList.add(key);
          } else {
            $el.classList.remove(key);
          }
        }
      });
    }
  };

  View.prototype.setStyle = function (style) {
    var self = this;
    var $el = self.$el;
    var key, value;

    for (key in style) {
      value = style[key];
      if (self.style[key] !== value) {
        self.style[key] = value;
        setStyle(key, value);
      }
    }

    function setStyle(key, value) {
      batchAnimationFrame(function () {
        if (self.style[key] === style[key]) {
          $el.style[key] = value;
        }
      });
    }
  };

  View.prototype.setAttributes = function (attrs) {
    var self = this;
    var $el = self.$el;
    var currentAttrs = self.attrs;
    var value, attr;

    for (attr in attrs) {
      value = attrs[attr];
      if (value !== currentAttrs[attr]) {
        self.attrs[attr] = value;

        if (value === self.attrs[attr]) {
          setAttribute(attr, value);
        }
      }
    }

    function setAttribute(attr, value) {
      batchAnimationFrame(function () {
        if (value === self.attrs[attr]) {
          if (!value) {
            $el.removeAttribute(attr);
            return;
          }
          $el.setAttribute(attr, value);

          if (attr === 'autofocus') {
            $el.focus();
          }
        }
      });
    }
  };

  function Views(ChildView, options) {
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
        view = new ChildView(null, { parent: self.view });
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
