(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.frzr = {});
})(this, function (exports) {
  'use strict';

  function Emitter() {
    var self = this;
    var isEmitter = self instanceof Emitter;

    if (!isEmitter) {
      return new Emitter();
    }

    self.listeners = {};

    return self;
  }

  var emitterProto = Emitter.prototype;

  emitterProto.on = on;
  emitterProto.off = off;
  emitterProto.trigger = trigger;

  function on(name, cb, ctx) {
    var self = this;
    var listeners = self.listeners[name] || (self.listeners[name] = []);

    listeners.push({
      cb: cb,
      ctx: ctx
    });

    return self;
  }

  function trigger(name) {
    var self = this;
    var args = slice(arguments, 1);
    var listeners = self.listeners[name];

    if (!listeners) {
      return self;
    }
    each(listeners, function (listener) {
      listener.cb.apply(listener.ctx || self, args);
    });

    return self;
  }

  function off(name, cb) {
    var self = this;
    var listeners;
    if (cb) {
      listeners = self.listeners[name];

      if (!listeners) {
        return self;
      }
      self.listeners = filter(listeners, function (listener) {
        return listener.cb === cb;
      });
      return self;
    }
    if (name) {
      delete listeners[name];
      return self;
    }
    self.listeners = {};
    return self;
  }

  exports.Emitter = Emitter;

  function View(type) {
    var self = this;
    var isView = self instanceof View;

    if (!isView) {
      return new View(type);
    }

    View['super'].call(this);

    self.data = {};
    self.$el = document.createElement(type || 'div');
  }

  inherit(View, Emitter);

  var viewProto = View.prototype;

  viewProto.mount = lib_view__mount;
  viewProto.unmount = unmount;
  viewProto.text = text;
  viewProto.html = html;
  viewProto.addClass = addClass;
  viewProto.removeClass = removeClass;
  viewProto.reset = lib_view__reset;
  viewProto.destroy = destroy;

  View.extend = lib_view__extend;

  function lib_view__mount(root) {
    var self = this;
    self.root = root;

    if (root instanceof View) {
      root = root.$el;
    }

    root.appendChild(self.$el);

    return self;
  }

  function unmount() {
    var self = this;
    var root = self.root;
    if (!root) {
      return;
    }
    if (root instanceof View) {
      root = root.$el;
    }
    root.removeChild(self.$el);

    return self;
  }

  function text(text) {
    var self = this;

    self.$el.textContent = text;

    return self;
  }

  function html(html) {
    var self = this;

    self.$el.innerHTML = html;

    return self;
  }

  function addClass(className) {
    var self = this;

    self.$el.classList.add(className);

    return self;
  }

  function removeClass(className) {
    var self = this;

    self.$el.classList.remove(className);

    return self;
  }

  function lib_view__reset(data) {
    var self = this;
    self.trigger('update', self, data, self.data);
    self.data = data;

    return self;
  }

  function destroy() {
    var self = this;
    self.trigger('destroy', self);
    self.off();
    self.unmount();

    return self;
  }

  function lib_view__extend(extendedType) {
    var emitter = new Emitter();
    var classes = [];
    var classLookup = {};
    var params = {};

    function ExtendedView(type) {
      var view = new View(type || extendedType);

      view.listeners = emitter.listeners;

      each(classes, function (className) {
        view.addClass(className);
      });

      if (params.root) {
        view.mount(params.root);
      }

      view.trigger('init', view);

      return view;
    }
    ExtendedView.mount = function mount(root) {
      params.root = root;

      return ExtendedView;
    };
    ExtendedView.unmount = function mount(_root) {
      delete params.root;

      return ExtendedView;
    };
    ExtendedView.addClass = function addClass(className) {
      if (classLookup[className]) {
        return ExtendedView;
      }
      classes.push(className);
      classLookup[className] = true;

      return ExtendedView;
    };
    ExtendedView.removeClass = function addClass(className) {
      if (classLookup[className]) {
        classes = filter(classes, function (_className) {
          return _className !== className;
        });
        delete classLookup[className];
      }

      return ExtendedView;
    };
    ExtendedView.on = function on(name, cb, ctx) {
      emitter.on(name, cb, ctx);
      return ExtendedView;
    };
    ExtendedView.off = function off(name, cb, ctx) {
      emitter.off(name, cb, ctx);
      return ExtendedView;
    };

    return ExtendedView;
  }

  exports.View = View;

  function ViewList(view, idAttribute) {
    var self = this;
    var isViewList = self instanceof ViewList;

    if (!isViewList) {
      return new ViewList(view, idAttribute);
    }
    self.idAttribute = idAttribute;
    self.View = view || View;
    self.views = [];
    self.lookup = {};

    return self;
  }

  inherit(ViewList, Emitter);

  var ViewListProto = ViewList.prototype;

  ViewListProto.mount = viewlist__mount;
  ViewListProto.reset = viewlist__reset;

  ViewList.extend = viewlist__extend;

  function viewlist__mount(root) {
    var self = this;

    root = root || self.root;

    if (!root) {
      return;
    }

    if (root instanceof View) {
      root = root.$el;
    }

    // Update items
    var traverse = root.firstChild;

    each(self.views, function (view, i) {
      if (traverse === view.$el) {
        traverse = traverse.nextSibling;
        return;
      }
      if (traverse) {
        root.insertBefore(view.$el, traverse);
      } else {
        root.appendChild(view.$el);
      }
    });
    var next;
    while (traverse) {
      next = traverse.nextSibling;
      root.removeChild(traverse);
      traverse = next;
    }
    self.root = root;
    return self;
  }

  function viewlist__reset(items) {
    var self = this;
    var idAttribute = self.idAttribute;

    var views;

    if (idAttribute == null) {
      views = reduce(items, new Array(items.length), function (init, item, i) {
        var view = self.views[i];

        if (!view) {
          view = new self.View();
        }
        view.reset(item);
        init[i] = view;

        return init;
      });
      self.views = views;
      self.mount();
      return self;
    }

    var lookup = {};

    views = reduce(items, [], function (init, item, i) {
      var id = item[idAttribute];
      var currentView = self.lookup[id];
      if (!currentView) {
        currentView = new self.View();
      }
      currentView.reset(item);
      init[i] = lookup[id] = currentView;
      return init;
    });

    each(self.views, function (view, i) {
      var id = view[idAttribute];

      if (!lookup[id]) {
        view.destroy();
        delete lookup[id];
      }
    });

    self.views = views;
    self.lookup = lookup;

    self.mount();

    return self;
  }

  function viewlist__extend(extendedIdAttribute, extendedView) {
    var emitter = new Emitter();
    var params = {};

    function ExtendedViewList(idAttribute, view) {
      var ViewList = new ViewList(idAttribute || extendedIdAttribute, view || extendedView);
      ViewList.listeners = emitter.listeners;

      if (params.root) {
        ViewList.mount(params.root);
      }

      return ViewList;
    }

    ExtendedViewList.mount = function (root) {
      params.root = root;

      return ExtendedViewList;
    };

    ExtendedViewList.unmount = function () {
      delete params.root;

      return ExtendedViewList;
    };

    ExtendedViewList.on = function (name, cb, ctx) {
      emitter.on(name, cb, ctx);

      return ExtendedViewList;
    };

    return ExtendedViewList;
  }

  exports.ViewList = ViewList;

  function each(array, iterator) {
    for (var i = 0, len = array.length; i < len; i++) {
      iterator(array[i], i);
    }
  }

  function filter(array, iterator) {
    var results = [];

    each(array, function (item, i) {
      if (iterator(item, i)) {
        results.push(item);
      }
    });

    return results;
  }

  function slice(array, start, end) {
    var len = array.length;

    if (start == null) {
      start = 0;
    }

    if (end == null) {
      end = len;
    }

    if (start < 0) {
      start = len + start;
    }

    if (end < 0) {
      end = len + end;
    }

    len = end - start;

    var results = new Array(len);

    for (var i = 0; i < len; i++) {
      results[i] = array[start + i];
    }
    return results;
  }

  function map(array, iterator) {
    var len = array.length;
    var results = new Array(len);

    for (var i = 0; i < len; i++) {
      results[i] = iterator(array[i], i);
    }

    return results;
  }

  function timesMap(len, iterator) {
    var results = new Array(len);

    for (var i = 0; i < len; i++) {
      results[i] = iterator(i);
    }

    return results;
  }

  function reduce(array, init, iterator) {
    each(array, function (item, i) {
      init = iterator(init, item, i);
    });
    return init;
  }

  exports.each = each;
  exports.filter = filter;
  exports.map = map;
  exports.slice = slice;
  exports.timesMap = timesMap;
  exports.reduce = reduce;

  function inherit(target, superClass) {
    var prototype = superClass && superClass.prototype || null;

    target['super'] = superClass;

    target.prototype = Object.create(prototype, {
      constructor: {
        configurable: true,
        value: target,
        writable: true
      }
    });

    return target.prototype;
  }

  exports.inherit = inherit;

  function forIn(object, iterator) {
    var key;

    for (key in object) {
      iterator(object[key], key);
    }
  }

  exports.forIn = forIn;
});
