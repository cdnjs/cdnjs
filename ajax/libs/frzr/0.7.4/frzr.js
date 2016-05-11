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
     * @param  {String}   name Listener name
     * @param  {Function} callback   Listener callback
     * @return {Observable}
     */

    Observable.prototype.on = function on(name, callback) {
      if (!this.listeners[name]) this.listeners[name] = [];

      this.listeners[name].push({ callback: callback, one: false });

      return this;
    };
    /**
     * Add listener by name, which triggers only one
     * @param  {String}   name Listener name
     * @param  {Function} callback   Listener callback
     * @return {Observable}
     */

    Observable.prototype.one = function one(name, callback) {
      if (!this.listeners[name]) this.listeners[name] = [];

      this.listeners[name].push({ callback: callback, one: true });

      return this;
    };
    /**
     * Triggers listeners by name
     * @param  {String} name    [description]
     * @param  {*} [...args] [description]
     * @return {Observable}
     */

    Observable.prototype.trigger = function trigger(name) {
      var listeners = this.listeners[name];

      if (!listeners) {
        return this;
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].callback.apply(this, args);

        if (listeners[i].one) {
          listeners.splice(i--, 1);
        }
      }

      return this;
    };
    /**
     * Remove all listeners, or by name, or by name & callback
     * @param  {String}   [name]     Listener name
     * @param  {Function} [callback] Listener callback
     * @return {Observable}
     */

    Observable.prototype.off = function off(name, callback) {
      if (typeof name === 'undefined') {
        this.listeners = {};
      } else if (typeof callback === 'undefined') {
        this.listeners[name] = [];
      } else {
        var listeners = this.listeners[name];

        if (!listeners) {
          return this;
        }

        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i].callback === callback) {
            listeners.splice(i--, 1);
          }
        }
      }

      return this;
    };

    return Observable;
  })();

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
    Class.extend = function _extend(options) {
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
     * @param {String} name   Attribute name
     * @param {*|null} value Attribute value or null to remove
     * @return {View}
     */

    View.prototype.setAttr = function setAttr(name, value) {
      if (!this.attrs) this.attrs = {};

      if (this.attrs[name] === value) {
        return this;
      }
      if (value || value === '') {
        this.el.setAttribute(name, value);
        this.attrs[name] = value;
      } else {
        this.el.removeAttribute(name);
        this.attrs[name] = null;
      }

      return this;
    };
    /**
     * Sets/removes View element class (only if changed)
     * @param {String} key   Class name
     * @param {Boolean} value true / false
     * @return {View}
     */

    View.prototype.setClass = function setClass(key, value) {
      if (!this.classes) this.classes = {};

      if (this.classes[key] === value) {
        return this;
      }
      if (value) {
        this.el.classList.add(key);
      } else {
        this.el.classList.remove(key);
      }
      this.classes[key] = value;

      return this;
    };
    /**
     * Sets/removes View element style (only if changed)
     * @param {String} key   Style name
     * @param {*|null} value Style value or null to remove
     * @return {View}
     */

    View.prototype.setStyle = function setStyle(key, value) {
      if (!this.styles) this.styles = {};

      if (this.styles[key] === value) {
        return this;
      }
      this.el.style[key] = value;
      this.styles[key] = value;

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
     * @param {[type]}   name       Listener name
     * @param {Function} callback         Listener callback
     * @param {Boolean}   useCapture Use capture or not
     * @return {View}
     */

    View.prototype.addListener = function addListener(name, callback, useCapture) {
      var _this2 = this;

      var listener = {
        name: name,
        callback: callback,
        proxy: function proxy() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          callback.apply(_this2, args);
        }
      };
      if (!this.eventListeners) this.eventListeners = [];

      this.eventListeners.push(listener);
      this.el.addEventListener(name, listener.proxy, useCapture);

      return this;
    };
    /**
     * Removes all proxy event listeners from View, or by name, or by name and callback
     * @param  {String}   [name] Listener name
     * @param  {Function} [callback]   Listener callback
     * @return {View}
     */

    View.prototype.removeListener = function removeListener(name, callback) {
      var listeners = this.eventListeners;
      if (!listeners) {
        return this;
      }
      if (typeof name === 'undefined') {
        for (var i = 0; i < listeners.length; i++) {
          this.el.removeEventListener(listeners[i].proxy);
        }
        this.listeners = [];
      } else if (typeof callback === 'undefined') {
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i].name === name) {
            listeners.splice(i--, 1);
          }
        }
      } else {
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          if (listener.name === name && callback === listener.callback) {
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

      if (views[0].views) {
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
      if (this.parent) this.parent.removeChild(this);
      this.trigger(EVENT.destroy);
      this.setChildren([]);
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

    return ViewList;
  })(Observable);

  extendable(ViewList);

  exports.el = el;
  exports.View = View;
  exports.ViewList = ViewList;
  exports.Observable = Observable;
  exports.each = each;
  exports.extendable = extendable;
  exports.shuffle = shuffle;

}));