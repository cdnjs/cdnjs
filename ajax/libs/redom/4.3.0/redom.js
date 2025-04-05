(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.redom = {}));
})(this, (function (exports) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return p;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: true
            } : {
              done: false,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = true,
      u = false;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = true, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (undefined !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
    }
  }

  function createElement(query, ns) {
    var _parse = parse(query),
      tag = _parse.tag,
      id = _parse.id,
      className = _parse.className;
    var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    if (id) {
      element.id = id;
    }
    if (className) {
      if (ns) {
        element.setAttribute("class", className);
      } else {
        element.className = className;
      }
    }
    return element;
  }
  function parse(query) {
    var chunks = query.split(/([.#])/);
    var className = "";
    var id = "";
    for (var i = 1; i < chunks.length; i += 2) {
      switch (chunks[i]) {
        case ".":
          className += " ".concat(chunks[i + 1]);
          break;
        case "#":
          id = chunks[i + 1];
      }
    }
    return {
      className: className.trim(),
      tag: chunks[0] || "div",
      id: id
    };
  }

  function html(query) {
    var element;
    var type = _typeof(query);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (type === "string") {
      element = createElement(query);
    } else if (type === "function") {
      var Query = query;
      element = _construct(Query, args);
    } else {
      throw new Error("At least one argument required");
    }
    parseArgumentsInternal(getEl(element), args, true);
    return element;
  }
  var el = html;
  var h = html;
  html.extend = function extendHtml() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return html.bind.apply(html, [this].concat(args));
  };

  function unmount(parent, _child) {
    var child = _child;
    var parentEl = getEl(parent);
    var childEl = getEl(child);
    if (child === childEl && childEl.__redom_view) {
      // try to look up the view if not provided
      child = childEl.__redom_view;
    }
    if (childEl.parentNode) {
      doUnmount(child, childEl, parentEl);
      parentEl.removeChild(childEl);
    }
    return child;
  }
  function doUnmount(child, childEl, parentEl) {
    var hooks = childEl.__redom_lifecycle;
    if (hooksAreEmpty(hooks)) {
      childEl.__redom_lifecycle = {};
      return;
    }
    var traverse = parentEl;
    if (childEl.__redom_mounted) {
      trigger(childEl, "onunmount");
    }
    while (traverse) {
      var parentHooks = traverse.__redom_lifecycle || {};
      for (var hook in hooks) {
        if (parentHooks[hook]) {
          parentHooks[hook] -= hooks[hook];
        }
      }
      if (hooksAreEmpty(parentHooks)) {
        traverse.__redom_lifecycle = null;
      }
      traverse = traverse.parentNode;
    }
  }
  function hooksAreEmpty(hooks) {
    if (hooks == null) {
      return true;
    }
    for (var key in hooks) {
      if (hooks[key]) {
        return false;
      }
    }
    return true;
  }

  var hookNames = ["onmount", "onremount", "onunmount"];
  var shadowRootAvailable = typeof window !== "undefined" && "ShadowRoot" in window;
  function mount(parent, _child, before, replace) {
    var child = _child;
    var parentEl = getEl(parent);
    var childEl = getEl(child);
    if (child === childEl && childEl.__redom_view) {
      // try to look up the view if not provided
      child = childEl.__redom_view;
    }
    if (child !== childEl) {
      childEl.__redom_view = child;
    }
    var wasMounted = childEl.__redom_mounted;
    var oldParent = childEl.parentNode;
    if (wasMounted && oldParent !== parentEl) {
      doUnmount(child, childEl, oldParent);
    }
    if (before != null) {
      if (replace) {
        var beforeEl = getEl(before);
        if (beforeEl.__redom_mounted) {
          trigger(beforeEl, "onunmount");
        }
        parentEl.replaceChild(childEl, beforeEl);
      } else {
        parentEl.insertBefore(childEl, getEl(before));
      }
    } else {
      parentEl.appendChild(childEl);
    }
    doMount(child, childEl, parentEl, oldParent);
    return child;
  }
  function trigger(el, eventName) {
    var _view$eventName;
    if (eventName === "onmount" || eventName === "onremount") {
      el.__redom_mounted = true;
    } else if (eventName === "onunmount") {
      el.__redom_mounted = false;
    }
    var hooks = el.__redom_lifecycle;
    if (!hooks) {
      return;
    }
    var view = el.__redom_view;
    var hookCount = 0;
    view === null || view === undefined || (_view$eventName = view[eventName]) === null || _view$eventName === undefined || _view$eventName.call(view);
    for (var hook in hooks) {
      if (hook) {
        hookCount++;
      }
    }
    if (hookCount) {
      var traverse = el.firstChild;
      while (traverse) {
        var next = traverse.nextSibling;
        trigger(traverse, eventName);
        traverse = next;
      }
    }
  }
  function doMount(child, childEl, parentEl, oldParent) {
    var _traverse;
    if (!childEl.__redom_lifecycle) {
      childEl.__redom_lifecycle = {};
    }
    var hooks = childEl.__redom_lifecycle;
    var remount = parentEl === oldParent;
    var hooksFound = false;
    var _iterator = _createForOfIteratorHelper(hookNames),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var hookName = _step.value;
        if (!remount) {
          // if already mounted, skip this phase
          if (child !== childEl) {
            // only Views can have lifecycle events
            if (hookName in child) {
              hooks[hookName] = (hooks[hookName] || 0) + 1;
            }
          }
        }
        if (hooks[hookName]) {
          hooksFound = true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (!hooksFound) {
      childEl.__redom_lifecycle = {};
      return;
    }
    var traverse = parentEl;
    var triggered = false;
    if (remount || (_traverse = traverse) !== null && _traverse !== undefined && _traverse.__redom_mounted) {
      trigger(childEl, remount ? "onremount" : "onmount");
      triggered = true;
    }
    while (traverse) {
      var parent = traverse.parentNode;
      if (!traverse.__redom_lifecycle) {
        traverse.__redom_lifecycle = {};
      }
      var parentHooks = traverse.__redom_lifecycle;
      for (var hook in hooks) {
        parentHooks[hook] = (parentHooks[hook] || 0) + hooks[hook];
      }
      if (triggered) {
        break;
      }
      if (traverse.nodeType === Node.DOCUMENT_NODE || shadowRootAvailable && traverse instanceof ShadowRoot || parent !== null && parent !== undefined && parent.__redom_mounted) {
        trigger(traverse, remount ? "onremount" : "onmount");
        triggered = true;
      }
      traverse = parent;
    }
  }

  function setStyle(view, arg1, arg2) {
    var el = getEl(view);
    if (_typeof(arg1) === "object") {
      for (var key in arg1) {
        setStyleValue(el, key, arg1[key]);
      }
    } else {
      setStyleValue(el, arg1, arg2);
    }
  }
  function setStyleValue(el, key, value) {
    el.style[key] = value == null ? "" : value;
  }

  var xlinkns = "http://www.w3.org/1999/xlink";
  function setAttr(view, arg1, arg2) {
    setAttrInternal(view, arg1, arg2);
  }
  function setAttrInternal(view, arg1, arg2, initial) {
    var el = getEl(view);
    var isObj = _typeof(arg1) === "object";
    if (isObj) {
      for (var key in arg1) {
        setAttrInternal(el, key, arg1[key], initial);
      }
    } else {
      var isSVG = el instanceof SVGElement;
      var isFunc = typeof arg2 === "function";
      if (arg1 === "style" && _typeof(arg2) === "object") {
        setStyle(el, arg2);
      } else if (isSVG && isFunc) {
        el[arg1] = arg2;
      } else if (arg1 === "dataset") {
        setData(el, arg2);
      } else if (!isSVG && (arg1 in el || isFunc) && arg1 !== "list") {
        el[arg1] = arg2;
      } else {
        if (isSVG && arg1 === "xlink") {
          setXlink(el, arg2);
          return;
        }
        if (initial && arg1 === "class") {
          setClassName(el, arg2);
          return;
        }
        if (arg2 == null) {
          el.removeAttribute(arg1);
        } else {
          el.setAttribute(arg1, arg2);
        }
      }
    }
  }
  function setClassName(el, additionToClassName) {
    if (additionToClassName == null) {
      el.removeAttribute("class");
    } else if (el.classList) {
      el.classList.add(additionToClassName);
    } else if (_typeof(el.className) === "object" && el.className && el.className.baseVal) {
      el.className.baseVal = "".concat(el.className.baseVal, " ").concat(additionToClassName).trim();
    } else {
      el.className = "".concat(el.className, " ").concat(additionToClassName).trim();
    }
  }
  function setXlink(el, arg1, arg2) {
    if (_typeof(arg1) === "object") {
      for (var key in arg1) {
        setXlink(el, key, arg1[key]);
      }
    } else {
      if (arg2 != null) {
        el.setAttributeNS(xlinkns, arg1, arg2);
      } else {
        el.removeAttributeNS(xlinkns, arg1, arg2);
      }
    }
  }
  function setData(el, arg1, arg2) {
    if (_typeof(arg1) === "object") {
      for (var key in arg1) {
        setData(el, key, arg1[key]);
      }
    } else {
      if (arg2 != null) {
        el.dataset[arg1] = arg2;
      } else {
        delete el.dataset[arg1];
      }
    }
  }

  function text(str) {
    return document.createTextNode(str != null ? str : "");
  }

  function parseArgumentsInternal(element, args, initial) {
    var _iterator = _createForOfIteratorHelper(args),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var arg = _step.value;
        if (arg !== 0 && !arg) {
          continue;
        }
        var type = _typeof(arg);
        if (type === "function") {
          arg(element);
        } else if (type === "string" || type === "number") {
          element.appendChild(text(arg));
        } else if (isNode(getEl(arg))) {
          mount(element, arg);
        } else if (arg.length) {
          parseArgumentsInternal(element, arg, initial);
        } else if (type === "object") {
          setAttrInternal(element, arg, null, initial);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function ensureEl(parent) {
    return typeof parent === "string" ? html(parent) : getEl(parent);
  }
  function getEl(parent) {
    return parent.nodeType && parent || !parent.el && parent || getEl(parent.el);
  }
  function isNode(arg) {
    return arg === null || arg === undefined ? undefined : arg.nodeType;
  }

  function dispatch(child, data) {
    var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "redom";
    var childEl = getEl(child);
    var event = new CustomEvent(eventName, {
      bubbles: true,
      detail: data
    });
    childEl.dispatchEvent(event);
  }

  function setChildren(parent) {
    var parentEl = getEl(parent);
    for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }
    var current = traverse(parent, children, parentEl.firstChild);
    while (current) {
      var next = current.nextSibling;
      unmount(parent, current);
      current = next;
    }
  }
  function traverse(parent, children, _current) {
    var current = _current;
    var childEls = Array(children.length);
    for (var i = 0; i < children.length; i++) {
      childEls[i] = children[i] && getEl(children[i]);
    }
    for (var _i = 0; _i < children.length; _i++) {
      var child = children[_i];
      if (!child) {
        continue;
      }
      var childEl = childEls[_i];
      if (childEl === current) {
        current = current.nextSibling;
        continue;
      }
      if (isNode(childEl)) {
        var _current2;
        var next = (_current2 = current) === null || _current2 === undefined ? undefined : _current2.nextSibling;
        var exists = child.__redom_index != null;
        var replace = exists && next === childEls[_i + 1];
        mount(parent, child, current, replace);
        if (replace) {
          current = next;
        }
        continue;
      }
      if (child.length != null) {
        current = traverse(parent, child, current);
      }
    }
    return current;
  }

  function listPool(View, key, initData) {
    return new ListPool(View, key, initData);
  }
  var ListPool = /*#__PURE__*/function () {
    function ListPool(View, key, initData) {
      _classCallCheck(this, ListPool);
      this.View = View;
      this.initData = initData;
      this.oldLookup = {};
      this.lookup = {};
      this.oldViews = [];
      this.views = [];
      if (key != null) {
        this.key = typeof key === "function" ? key : propKey(key);
      }
    }
    return _createClass(ListPool, [{
      key: "update",
      value: function update(data, context) {
        var View = this.View,
          key = this.key,
          initData = this.initData;
        var keySet = key != null;
        var oldLookup = this.lookup;
        var newLookup = {};
        var newViews = Array(data.length);
        var oldViews = this.views;
        for (var i = 0; i < data.length; i++) {
          var _view$update, _view;
          var item = data[i];
          var view = undefined;
          if (keySet) {
            var id = key(item);
            view = oldLookup[id] || new View(initData, item, i, data);
            newLookup[id] = view;
            view.__redom_id = id;
          } else {
            view = oldViews[i] || new View(initData, item, i, data);
          }
          (_view$update = (_view = view).update) === null || _view$update === undefined || _view$update.call(_view, item, i, data, context);
          var el = getEl(view.el);
          el.__redom_view = view;
          newViews[i] = view;
        }
        this.oldViews = oldViews;
        this.views = newViews;
        this.oldLookup = oldLookup;
        this.lookup = newLookup;
      }
    }]);
  }();
  function propKey(key) {
    return function proppedKey(item) {
      return item[key];
    };
  }

  function list(parent, View, key, initData) {
    return new List(parent, View, key, initData);
  }
  var List = /*#__PURE__*/function () {
    function List(parent, View, key, initData) {
      _classCallCheck(this, List);
      this.View = View;
      this.initData = initData;
      this.views = [];
      this.pool = new ListPool(View, key, initData);
      this.el = ensureEl(parent);
      this.keySet = key != null;
    }
    return _createClass(List, [{
      key: "update",
      value: function update(data, context) {
        var keySet = this.keySet;
        var oldViews = this.views;
        this.pool.update(data || [], context);
        var _this$pool = this.pool,
          views = _this$pool.views,
          lookup = _this$pool.lookup;
        if (keySet) {
          for (var i = 0; i < oldViews.length; i++) {
            var oldView = oldViews[i];
            var id = oldView.__redom_id;
            if (lookup[id] == null) {
              oldView.__redom_index = null;
              unmount(this, oldView);
            }
          }
        }
        for (var _i = 0; _i < views.length; _i++) {
          var view = views[_i];
          view.__redom_index = _i;
        }
        setChildren(this, views);
        if (keySet) {
          this.lookup = lookup;
        }
        this.views = views;
      }
    }]);
  }();
  List.extend = function extendList(parent, View, key, initData) {
    return List.bind(List, parent, View, key, initData);
  };
  list.extend = List.extend;

  function place(View, initData) {
    return new Place(View, initData);
  }
  var Place = /*#__PURE__*/function () {
    function Place(View, initData) {
      _classCallCheck(this, Place);
      this.el = text("");
      this.visible = false;
      this.view = null;
      this._placeholder = this.el;
      if (View instanceof Node) {
        this._el = View;
      } else if (View.el instanceof Node) {
        this._el = View;
        this.view = View;
      } else {
        this._View = View;
      }
      this._initData = initData;
    }
    return _createClass(Place, [{
      key: "update",
      value: function update(visible, data) {
        var placeholder = this._placeholder;
        var parentNode = this.el.parentNode;
        if (visible) {
          var _this$view, _this$view$update;
          if (!this.visible) {
            if (this._el) {
              mount(parentNode, this._el, placeholder);
              unmount(parentNode, placeholder);
              this.el = getEl(this._el);
              this.visible = visible;
            } else {
              var View = this._View;
              var view = new View(this._initData);
              this.el = getEl(view);
              this.view = view;
              mount(parentNode, view, placeholder);
              unmount(parentNode, placeholder);
            }
          }
          (_this$view = this.view) === null || _this$view === undefined || (_this$view$update = _this$view.update) === null || _this$view$update === undefined || _this$view$update.call(_this$view, data);
        } else {
          if (this.visible) {
            if (this._el) {
              mount(parentNode, placeholder, this._el);
              unmount(parentNode, this._el);
              this.el = placeholder;
              this.visible = visible;
              return;
            }
            mount(parentNode, placeholder, this.view);
            unmount(parentNode, this.view);
            this.el = placeholder;
            this.view = null;
          }
        }
        this.visible = visible;
      }
    }]);
  }();

  function ref(ctx, key, value) {
    ctx[key] = value;
    return value;
  }

  function router(parent, views, initData) {
    return new Router(parent, views, initData);
  }
  var Router = /*#__PURE__*/function () {
    function Router(parent, views, initData) {
      _classCallCheck(this, Router);
      this.el = ensureEl(parent);
      this.views = views;
      this.Views = views; // backwards compatibility
      this.initData = initData;
    }
    return _createClass(Router, [{
      key: "update",
      value: function update(route, data) {
        var _this$view, _this$view$update;
        if (route !== this.route) {
          var views = this.views;
          var View = views[route];
          this.route = route;
          if (View && (View instanceof Node || View.el instanceof Node)) {
            this.view = View;
          } else {
            this.view = View && new View(this.initData, data);
          }
          setChildren(this.el, [this.view]);
        }
        (_this$view = this.view) === null || _this$view === undefined || (_this$view$update = _this$view.update) === null || _this$view$update === undefined || _this$view$update.call(_this$view, data, route);
      }
    }]);
  }();

  var ns = "http://www.w3.org/2000/svg";
  function svg(query) {
    var element;
    var type = _typeof(query);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (type === "string") {
      element = createElement(query, ns);
    } else if (type === "function") {
      var Query = query;
      element = _construct(Query, args);
    } else {
      throw new Error("At least one argument required");
    }
    parseArgumentsInternal(getEl(element), args, true);
    return element;
  }
  var s = svg;
  svg.extend = function extendSvg() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return svg.bind.apply(svg, [this].concat(args));
  };
  svg.ns = ns;

  function viewFactory(views, key) {
    if (!views || _typeof(views) !== "object") {
      throw new Error("views must be an object");
    }
    if (!key || typeof key !== "string") {
      throw new Error("key must be a string");
    }
    return function factoryView(initData, item, i, data) {
      var viewKey = item[key];
      var View = views[viewKey];
      if (View) {
        return new View(initData, item, i, data);
      }
      throw new Error("view ".concat(viewKey, " not found"));
    };
  }

  exports.List = List;
  exports.ListPool = ListPool;
  exports.Place = Place;
  exports.Router = Router;
  exports.dispatch = dispatch;
  exports.el = el;
  exports.h = h;
  exports.html = html;
  exports.list = list;
  exports.listPool = listPool;
  exports.mount = mount;
  exports.place = place;
  exports.ref = ref;
  exports.router = router;
  exports.s = s;
  exports.setAttr = setAttr;
  exports.setChildren = setChildren;
  exports.setData = setData;
  exports.setStyle = setStyle;
  exports.setXlink = setXlink;
  exports.svg = svg;
  exports.text = text;
  exports.unmount = unmount;
  exports.viewFactory = viewFactory;

}));
