var __slice = [].slice;

(function() {
  var Adapter, isArrayOrNodeList;

  Element.addMethods({
    addTip: function(element, content, title, options) {
      return new Opentip(element, content, title, options);
    }
  });
  isArrayOrNodeList = function(element) {
    if ((element instanceof Array) || ((element != null) && typeof element.length === 'number' && typeof element.item === 'function' && typeof element.nextNode === 'function' && typeof element.reset === 'function')) {
      return true;
    }
    return false;
  };
  Adapter = (function() {
    function Adapter() {}

    Adapter.prototype.name = "prototype";

    Adapter.prototype.domReady = function(callback) {
      if (document.loaded) {
        return callback();
      } else {
        return $(document).observe("dom:loaded", callback);
      }
    };

    Adapter.prototype.create = function(html) {
      return new Element('div').update(html).childElements();
    };

    Adapter.prototype.wrap = function(element) {
      if (isArrayOrNodeList(element)) {
        if (element.length > 1) {
          throw new Error("Multiple elements provided.");
        }
        element = this.unwrap(element);
      } else if (typeof element === "string") {
        element = $$(element)[0];
      }
      return $(element);
    };

    Adapter.prototype.unwrap = function(element) {
      if (isArrayOrNodeList(element)) {
        return element[0];
      } else {
        return element;
      }
    };

    Adapter.prototype.tagName = function(element) {
      return this.unwrap(element).tagName;
    };

    Adapter.prototype.attr = function() {
      var args, element, _ref;

      element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (args.length === 1) {
        return this.wrap(element).readAttribute(args[0]);
      } else {
        return (_ref = this.wrap(element)).writeAttribute.apply(_ref, args);
      }
    };

    Adapter.prototype.data = function(element, name, value) {
      var arg;

      this.wrap(element);
      if (arguments.length > 2) {
        return element.store(name, value);
      } else {
        arg = element.readAttribute("data-" + (name.underscore().dasherize()));
        if (arg != null) {
          return arg;
        }
        return element.retrieve(name);
      }
    };

    Adapter.prototype.find = function(element, selector) {
      return this.wrap(element).select(selector)[0];
    };

    Adapter.prototype.findAll = function(element, selector) {
      return this.wrap(element).select(selector);
    };

    Adapter.prototype.update = function(element, content, escape) {
      return this.wrap(element).update(escape ? content.escapeHTML() : content);
    };

    Adapter.prototype.append = function(element, child) {
      return this.wrap(element).insert(this.wrap(child));
    };

    Adapter.prototype.remove = function(element) {
      return this.wrap(element).remove();
    };

    Adapter.prototype.addClass = function(element, className) {
      return this.wrap(element).addClassName(className);
    };

    Adapter.prototype.removeClass = function(element, className) {
      return this.wrap(element).removeClassName(className);
    };

    Adapter.prototype.css = function(element, properties) {
      return this.wrap(element).setStyle(properties);
    };

    Adapter.prototype.dimensions = function(element) {
      return this.wrap(element).getDimensions();
    };

    Adapter.prototype.scrollOffset = function() {
      var offsets;

      offsets = document.viewport.getScrollOffsets();
      return [offsets.left, offsets.top];
    };

    Adapter.prototype.viewportDimensions = function() {
      return document.viewport.getDimensions();
    };

    Adapter.prototype.mousePosition = function(e) {
      if (e == null) {
        return null;
      }
      return {
        x: Event.pointerX(e),
        y: Event.pointerY(e)
      };
    };

    Adapter.prototype.offset = function(element) {
      var offset;

      offset = this.wrap(element).cumulativeOffset();
      return {
        left: offset.left,
        top: offset.top
      };
    };

    Adapter.prototype.observe = function(element, eventName, observer) {
      return Event.observe(this.wrap(element), eventName, observer);
    };

    Adapter.prototype.stopObserving = function(element, eventName, observer) {
      return Event.stopObserving(this.wrap(element), eventName, observer);
    };

    Adapter.prototype.ajax = function(options) {
      var _ref, _ref1;

      if (options.url == null) {
        throw new Error("No url provided");
      }
      return new Ajax.Request(options.url, {
        method: (_ref = (_ref1 = options.method) != null ? _ref1.toUpperCase() : void 0) != null ? _ref : "GET",
        onSuccess: function(response) {
          return typeof options.onSuccess === "function" ? options.onSuccess(response.responseText) : void 0;
        },
        onFailure: function(response) {
          return typeof options.onError === "function" ? options.onError("Server responded with status " + response.status) : void 0;
        },
        onComplete: function() {
          return typeof options.onComplete === "function" ? options.onComplete() : void 0;
        }
      });
    };

    Adapter.prototype.clone = function(object) {
      return Object.clone(object);
    };

    Adapter.prototype.extend = function() {
      var source, sources, target, _i, _len;

      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = sources.length; _i < _len; _i++) {
        source = sources[_i];
        Object.extend(target, source);
      }
      return target;
    };

    return Adapter;

  })();
  return Opentip.addAdapter(new Adapter);
})();
