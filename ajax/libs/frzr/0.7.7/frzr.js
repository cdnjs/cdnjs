(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.frzr = {}));
}(this, function (exports) { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;
  var ease = { linear: linear, quadIn: quadIn, quadOut: quadOut, quadInOut: quadInOut, cubicIn: cubicIn, cubicOut: cubicOut, cubicInOut: cubicInOut, quartIn: quartIn, quartOut: quartOut, quartInOut: quartInOut, quintIn: quintIn, quintOut: quintOut, quintInOut: quintInOut, bounceIn: bounceIn, bounceOut: bounceOut, bounceInOut: bounceInOut };

  function linear(t) {
    return t;
  }

  function quadIn(t) {
    return Math.pow(t, 2);
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
    return Math.pow(t, 3);
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
    return Math.pow(t, 4);
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
    return Math.pow(t, 5);
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

  /**
   * Faster way to iterate array
   * @param  {Array} array    source array
   * @param  {Function} iterator gets called: iterator(array[i], i)
   */
  function each(array, iterator) {
    for (var i = 0; i < array.length; i++) {
      iterator(array[i], i);
    }
  }

  /**
   * Defined check helper
   * @param  {*}  check Something to check
   * @return {Boolean}       True / false
   */
  function isDefined(check) {
    return typeof check !== 'undefined' || check !== null;
  }

  /**
   * CSS style string iteration helper
   * @param  {String} styleString     CSS style string
   * @param  {Function} handler Handler function
   */
  function eachCSS(styleString, handler) {
    var styles = styleString.split(';');

    for (var i = 0; i < styles.length; i++) {
      if (!styles[i].length) {
        continue;
      }
      var style = styles[i].split(':');
      var propertyName = style[0].trim();
      var value = style[1].trim();

      if (propertyName.length) {
        handler(propertyName, value);
      }
    }
  }

  /**
   * Fisher-Yates shuffle helper
   * @param  {Array} array Array to be shuffled
   * @return {Array}       Shuffled Array
   */
  function shuffle(array) {
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
  /**
   * Makes Class extendable by adding Class.extend
   * @param  {Class} Class source Class
   * @return {ExtendedClass}       resulted ExtendedClass
   */
  function extendable(Class) {
    Class.extend = function extend(options) {
      return (function (_Class) {
        babelHelpers.inherits(ExtendedClass, _Class);

        function ExtendedClass() {
          babelHelpers.classCallCheck(this, ExtendedClass);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return babelHelpers.possibleConstructorReturn(this, _Class.call.apply(_Class, [this, options].concat(args)));
        }

        return ExtendedClass;
      })(Class);
    };
  }

  var style = document.createElement('p').style;
  var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
  var memoized = {};

  /**
   * Prefixes style property
   * @param  {String} propertyName Style property name to prefix
   * @return {String} Returns prefixed property name
   */
  function prefix(propertyName) {
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

  /**
   * HTMLElement helper
   * @param  {String} [tagName='div'] HTMLElement tag name
   * @param  {Object} [attributes={}]   attributes/text/HTML
   * @return {HTMLElement}         Returns pure HTMLElement
   */
  function el() {
    var tagName = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
    var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _el = document.createElement(tagName);

    for (var key in attributes) {
      if (key === 'text') {
        _el.textContent = attributes[key];
      } else if (key === 'html') {
        _el.innerHTML = attributes[key];
      } else if (key === 'style') {
        eachCSS(attributes.style, function (propertyName, value) {
          var prefixedProperty = prefix(propertyName);

          _el.style[prefixedProperty] = value;
        });
      } else {
        _el.setAttribute(key, attributes[key]);
      }
    }
    return _el;
  }

  var Observable = (function () {
    /**
     * Inits listeners
     * @return {Observable}
     */

    function Observable() {
      babelHelpers.classCallCheck(this, Observable);

      /**
       * Listeners cache
       * @type {Object}
       */
      this.listeners = {};
    }
    /**
     * Add listener by name
     * @param  {String}     eventName   Event name
     * @param  {Function}   handler     Event handler
     * @return {Observable}
     */

    Observable.prototype.on = function on(eventName, handler) {
      if (typeof this.listeners[eventName] === 'undefined') {
        this.listeners[eventName] = [];
      }

      this.listeners[eventName].push({ handler: handler, one: false });

      return this;
    };
    /**
     * Add listener by name, which triggers only one
     * @param  {String}     eventName   Event name
     * @param  {Function}   handler     Event handler
     * @return {Observable}
     */

    Observable.prototype.one = function one(eventName, handler) {
      if (!this.listeners[eventName]) this.listeners[eventName] = [];

      this.listeners[eventName].push({ handler: handler, one: true });

      return this;
    };
    /**
     * Triggers listeners by name
     * @param  {String}     eventName   Event name
     * @param  {*}          [...args]   Call arguments
     * @return {Observable}
     */

    Observable.prototype.trigger = function trigger(eventName) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        return this;
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].handler.apply(this, args);

        if (listeners[i].one) {
          listeners.splice(i--, 1);
        }
      }

      return this;
    };
    /**
     * Remove all listeners, or by name, or by name & handler
     * @param  {String}     [name]      Event name
     * @param  {Function}   [handler]   Event handler
     * @return {Observable}
     */

    Observable.prototype.off = function off(name, handler) {
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
    };

    return Observable;
  })();

  var EVENT = 'init inited mount mounted unmount unmounted sort sorted update updated destroy'.split(' ').reduce(function (obj, name) {
    obj[name] = name;
    return obj;
  }, {});

  var View = (function (_Observable) {
    babelHelpers.inherits(View, _Observable);

    /**
     * @external {HTMLElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */

    /**
     * @typedef {Object} ViewOptions
     * @property {el|HTMLElement} [el=el('div')] DOM element
     * @property {Function} [init] 'init' event handler shortcut
     * @property {Function} [inited] 'inited' event handler shortcut
     * @property {Function} [mount] 'mount' event handler shortcut
     * @property {Function} [mounted] 'mounted' event handler shortcut
     * @property {Function} [sort] 'sort' event handler shortcut
     * @property {Function} [sorted] 'sorted' event handler shortcut
     * @property {Function} [update] 'update' event handler shortcut
     * @property {Function} [updated] 'updated' event handler shortcut
     * @property {Function} [destroy] 'destroy' event handler shortcut
     * @property {*} [*] Anything else you want to pass on to View
     */

    /**
     * Creates View
     * @param  {ViewOptions} [options] View options
     * @param  {*} [data]    Any data to pass on to init()
     * @return {View}
     */

    function View() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var data = arguments[1];
      babelHelpers.classCallCheck(this, View);

      /**
       * el attributes cache
       * @type {Object}
       */

      var _this = babelHelpers.possibleConstructorReturn(this, _Observable.call(this));

      _this.attrs = {};
      /**
       * el classNames cache
       * @type {Object}
       */
      _this.classes = {};
      /**
       * HTMLElement
       * @type {el|HTMLElement}
       */
      _this.el = null;
      /**
       * Proxy event listeners cache
       * @type {Array}
       */
      _this.eventListeners = [];
      /**
       * el innerHTML cache
       * @type {String}
       */
      _this.html = '';
      /**
       * Listeners cache
       * @type {Object}
       */
      _this.listeners = {};
      /**
       * el styles cache
       * @type {Object}
       */
      _this.styles = {};
      /**
       * el textContent cache
       * @type {String}
       */
      _this.text = '';

      for (var key in options) {
        if (EVENT[key]) {
          _this.on(key, options[key]);
        } else {
          _this[key] = options[key];
        }
      }

      _this.trigger(EVENT.init, data);
      if (!_this.el) _this.el = document.createElement('div');
      _this.el.view = _this;
      _this.trigger(EVENT.inited, data);
      return _this;
    }
    /**
     * Sets/removes View element attribute (only if changed)
     * @param {String} attributeName   Attribute name
     * @param {*|null} value Attribute value or null to remove
     * @return {View}
     */

    View.prototype.setAttr = function setAttr(attributeName, value) {
      if (!this.attrs) this.attrs = {};

      if (this.attrs[attributeName] === value) {
        return this;
      }
      if (value || value === '') {
        this.el.setAttribute(attributeName, value);
        this.attrs[attributeName] = value;
      } else {
        this.el.removeAttribute(attributeName);
        this.attrs[attributeName] = null;
      }

      return this;
    };
    /**
     * Sets/removes View element class (only if changed)
     * @param {String} className   Class name
     * @param {Boolean} value true / false
     * @return {View}
     */

    View.prototype.setClass = function setClass(className, value) {
      if (!this.classes) this.classes = {};

      if (this.classes[className] === value) {
        return this;
      }
      if (value) {
        this.el.classList.add(className);
      } else {
        this.el.classList.remove(className);
      }
      this.classes[className] = value;

      return this;
    };
    /**
     * Sets/removes View element style (only if changed)
     * @param {String} propertyName   Style name
     * @param {*|null} value Style value or null to remove
     * @return {View}
     */

    View.prototype.setStyle = function setStyle(propertyName, value) {
      if (!this.styles) this.styles = {};

      if (this.styles[propertyName] === value) {
        return this;
      }

      var prefixed = prefix(propertyName);

      this.el.style[prefixed] = value;
      this.styles[propertyName] = value;

      return this;
    };
    /**
     * Sets View element textContent (only if changed)
     * @param {String} text Text to be applied to textContent
     * @return {View}
     */

    View.prototype.setText = function setText(text) {
      if (this.text === text) {
        return this;
      }
      this.el.textContent = text;
      this.text = text;

      return this;
    };
    /**
     * Sets View element innerHTML (only if changed)
     * @param {String} html HTML string
     * @return {View}
     */

    View.prototype.setHTML = function setHTML(html) {
      if (this.html === html) {
        return this;
      }
      this.el.innerHTML = html;
      this.html = html;

      return this;
    };
    /**
     * Adds proxy event listener to View
     * @param {[type]}   listenerName       Listener name
     * @param {Function} handler         Listener handler
     * @param {Boolean}   useCapture Use capture or not
     * @return {View}
     */

    View.prototype.addListener = function addListener(listenerName, handler, useCapture) {
      var _this2 = this;

      var listener = {
        name: listenerName,
        handler: handler,
        proxy: function proxy() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(_this2, args);
        }
      };
      if (!this.eventListeners) this.eventListeners = [];

      this.eventListeners.push(listener);
      this.el.addEventListener(name, listener.proxy, useCapture);

      return this;
    };
    /**
     * Removes all proxy event listeners from View, or by name, or by name and handler
     * @param  {String}   [listenerName] Listener name
     * @param  {Function} [handler]   Listener handler
     * @return {View}
     */

    View.prototype.removeListener = function removeListener(listenerName, handler) {
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
    };
    /**
     * Adds child View/ViewList to View
     * @param {View|ViewList} child Child View/ViewList to be added
     * @return {View}
     */

    View.prototype.addChild = function addChild(child) {
      if (child.views) {
        child.parent = this;
        return this.setChildren.apply(this, child.views);
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
    };
    /**
     * Adds child View before another View/HTMLElement
     * @param {View} child  Child View to be added
     * @param {View|HTMLElement} before Reference View/HTMLElement
     * @return {View}
     */

    View.prototype.addBefore = function addBefore(child, before) {
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
    };
    /**
     * Replace children with Views or ViewList
     * @param {View|ViewList} ...views [description]
     * @return {View}
     */

    View.prototype.setChildren = function setChildren() {
      for (var _len2 = arguments.length, views = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        views[_key2] = arguments[_key2];
      }

      if (views.length && views[0].views) {
        views[0].parent = this;
        if (!views[0].views.length) {
          return this;
        }
        this.setChildren.apply(this, views[0].views);
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
    };
    /**
     * Remove child View / ViewList
     * @param  {View|ViewList} child Child View/ViewList to be removed
     * @return {View}
     */

    View.prototype.removeChild = function removeChild(child) {
      if (!child.parent) {
        return this;
      }
      child.trigger(EVENT.unmount);

      this.el.removeChild(child.el);
      child.parent = null;

      child.trigger(EVENT.unmounted);

      return this;
    };
    /**
     * Trigger 'update' with data
     * @param  {*} data Any data
     * @return {View}
     */

    View.prototype.update = function update(data) {
      this.trigger(EVENT.update, data);
    };
    /**
     * Destroy View (remove listeners, children, etc..)
     */

    View.prototype.destroy = function destroy() {
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
    };

    return View;
  })(Observable);

  extendable(View);

  var EVENTS = 'init inited mount mounted unmount unmounted sort sorted update updated destroy'.split(' ').reduce(function (obj, key) {
    obj[key] = true;
    return obj;
  }, {});

  var ViewList = (function (_Observable) {
    babelHelpers.inherits(ViewList, _Observable);

    /**
     * @typedef {Object} ViewListOptions
     * @property {View} [View=View] View Class to create new Views with
     * @property {Function} [init] 'init' callback shortcut
     * @property {Function} [inited] 'inited' callback shortcut
     * @property {Function} [mount] 'mount' callback shortcut
     * @property {Function} [mounted] 'mounted' callback shortcut
     * @property {Function} [sort] 'sort' callback shortcut
     * @property {Function} [sorted] 'sorted' callback shortcut
     * @property {Function} [update] 'update' callback shortcut
     * @property {Function} [updated] 'updated' callback shortcut
     * @property {Function} [destroy] 'destroy' callback shortcut
     * @property {*} [*] Anything else you want to pass on to View
     */

    /**
     * Creates list of Views to be mounted to a View
     * @param  {ViewListOptions} options ViewList options
     * @return {ViewList}
     */

    function ViewList(options) {
      babelHelpers.classCallCheck(this, ViewList);

      /**
       * Views by key, if key provided
       * @type {Object}
       */

      var _this = babelHelpers.possibleConstructorReturn(this, _Observable.call(this));

      _this.lookup = {};
      /**
       * list of Views
       * @type {Array}
       */
      _this.views = [];

      for (var key in options) {
        if (EVENTS[key]) {
          _this.on(key, options[key]);
        } else {
          _this[key] = options[key];
        }
      }
      return _this;
    }
    /**
     * Sync list of Views with data provided
     * @param {Array} data Data for syncing list of Views
     */

    ViewList.prototype.setData = function setData(data) {
      var _parent,
          _this2 = this;

      var views = new Array(data.length);
      var lookup = {};
      var currentViews = this.views;
      var currentLookup = this.lookup;
      var key = this.key;

      var _loop = function _loop(i) {
        var item = data[i];
        var id = key && item[key];
        var ViewClass = _this2.View || View;
        var view = (key ? currentLookup[id] : currentViews[i]) || new ViewClass();

        var _loop2 = function _loop2(j) {
          var name = EVENTS[j];
          view.on(name, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this2.trigger(name, [view].concat(args));
          });
        };

        for (var j = 0; j < EVENTS.length; j++) {
          _loop2(j);
        }

        if (key) lookup[id] = view;

        views[i] = view;
        view.update(item);
      };

      for (var i = 0; i < data.length; i++) {
        _loop(i);
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
      if (this.parent) (_parent = this.parent).setChildren.apply(_parent, views);
    };

    ViewList.prototype.destroy = function destroy() {
      this.setData([]);
      this.off();
    };

    return ViewList;
  })(Observable);

  extendable(ViewList);

  var hasRequestAnimationFrame = typeof window.requestAnimationFrame !== 'undefined';

  function raf(cb) {
    if (hasRequestAnimationFrame) {
      return window.requestAnimationFrame(cb);
    } else {
      return setTimeout(cb, 1000 / 60);
    }
  }

  raf.cancel = function cancel(id) {
    if (hasRequestAnimationFrame) {
      window.cancelAnimationFrame(id);
    } else {
      clearTimeout(id);
    }
  };

  var animations = [];
  var ticking = undefined;

  var Animation = (function (_Observable) {
    babelHelpers.inherits(Animation, _Observable);

    function Animation(_ref) {
      var _ref$delay = _ref.delay;
      var delay = _ref$delay === undefined ? 0 : _ref$delay;
      var _ref$duration = _ref.duration;
      var duration = _ref$duration === undefined ? 0 : _ref$duration;
      var easing = _ref.easing;
      var start = _ref.start;
      var progress = _ref.progress;
      var end = _ref.end;
      babelHelpers.classCallCheck(this, Animation);

      var _this = babelHelpers.possibleConstructorReturn(this, _Observable.call(this));

      var now = Date.now();

      // calculate animation start/end times
      _this.startTime = now + delay;
      _this.endTime = _this.startTime + duration;
      _this.easing = ease[easing] || ease.quadOut;

      _this.started = false;

      if (start) _this.on('start', start);
      if (progress) _this.on('progress', progress);
      if (end) _this.on('end', end);

      // add animation
      animations.push(_this);

      if (!ticking) {
        // start ticking
        ticking = true;
        raf(tick);
      }
      return _this;
    }

    Animation.prototype.destroy = function destroy() {
      for (var i = 0; i < animations.length; i++) {
        if (animations[i] === this) {
          animations.splice(i, 1);
          return;
        }
      }
    };

    return Animation;
  })(Observable);

  function tick() {
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
    raf(tick, true);
  }

  var has3d = undefined;

  function translate() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (typeof has3d === 'undefined') {
      has3d = check3d();
    }

    if (has3d || z) {
      return 'translate3d(' + x + ', ' + y + ', ' + z + ')';
    } else {
      return 'translate(' + x + ', ' + y + ')';
    }
  }

  function check3d() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
      return false;
    }

    var transform = prefix('transform');
    var $p = document.createElement('p');

    document.body.appendChild($p);
    $p.style[transform] = 'translate3d(1px,1px,1px)';
    has3d = $p.style[transform];

    if (isDefined(has3d) && has3d.length && has3d !== 'none') {
      has3d = true;
    } else {
      has3d = false;
    }

    document.body.removeChild($p);

    return has3d;
  }

  exports.ease = ease;
  exports.el = el;
  exports.prefix = prefix;
  exports.View = View;
  exports.ViewList = ViewList;
  exports.Animation = Animation;
  exports.Observable = Observable;
  exports.each = each;
  exports.extendable = extendable;
  exports.shuffle = shuffle;
  exports.translate = translate;
  exports.raf = raf;

}));