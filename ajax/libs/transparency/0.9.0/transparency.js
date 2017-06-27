(function() {
  var Context, ELEMENT_NODE, Element, Instance, TEXT_NODE, Transparency, VOID_ELEMENTS, chainable, cloneNode, consoleLogger, data, expando, getChildNodes, getElements, html5Clone, isArray, isBoolean, isDate, isDomElement, isPlainValue, log, nullLogger, toString, _getElements, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  Transparency = this.Transparency = {};

  Transparency.render = function(context, models, directives, options) {
    var log, _base;
    if (models == null) {
      models = [];
    }
    if (directives == null) {
      directives = {};
    }
    if (options == null) {
      options = {};
    }
    log = options.debug && console ? consoleLogger : nullLogger;
    log("Transparency.render:", context, models, directives, options);
    if (!context) {
      return;
    }
    if (!isArray(models)) {
      models = [models];
    }
    context = (_base = data(context)).context || (_base.context = new Context(context));
    return context.detach().render(models, directives, options).attach();
  };

  Transparency.jQueryPlugin = function(models, directives, options) {
    var context, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      context = this[_i];
      Transparency.render(context, models, directives, options);
    }
    return this;
  };

  Transparency.matcher = function(element, key) {
    return element.el.id === key || __indexOf.call(element.classNames, key) >= 0 || element.el.name === key || element.el.getAttribute('data-bind') === key;
  };

  Transparency.clone = function(node) {
    var _base;
    return typeof (_base = jQuery || Zepto) === "function" ? _base(node).clone()[0] : void 0;
  };

  chainable = function(method) {
    return function() {
      method.apply(this, arguments);
      return this;
    };
  };

  Context = (function() {

    function Context(el) {
      this.el = el;
      this.template = cloneNode(this.el);
      this.instances = [new Instance(this.el)];
      this.instanceCache = [];
    }

    Context.prototype.detach = chainable(function() {
      this.parent = this.el.parentNode;
      if (this.parent) {
        this.nextSibling = this.el.nextSibling;
        return this.parent.removeChild(this.el);
      }
    });

    Context.prototype.attach = chainable(function() {
      if (this.parent) {
        if (this.nextSibling) {
          return this.parent.insertBefore(this.el, this.nextSibling);
        } else {
          return this.parent.appendChild(this.el);
        }
      }
    });

    Context.prototype.render = chainable(function(models, directives, options) {
      var index, instance, model, _i, _len, _results;
      while (models.length < this.instances.length) {
        this.instanceCache.push(this.instances.pop().remove());
      }
      _results = [];
      for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
        model = models[index];
        if (!(instance = this.instances[index])) {
          instance = this.instanceCache.pop() || new Instance(cloneNode(this.template));
          this.instances.push(instance.appendTo(this.el));
        }
        _results.push(instance.render(model, index, directives, options));
      }
      return _results;
    });

    return Context;

  })();

  Instance = (function() {

    function Instance(template) {
      this.queryCache = {};
      this.childNodes = getChildNodes(template);
      this.elements = getElements(template);
    }

    Instance.prototype.remove = chainable(function() {
      var node, _i, _len, _ref, _results;
      _ref = this.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.parentNode.removeChild(node));
      }
      return _results;
    });

    Instance.prototype.appendTo = chainable(function(parent) {
      var node, _i, _len, _ref, _results;
      _ref = this.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(parent.appendChild(node));
      }
      return _results;
    });

    Instance.prototype.render = chainable(function(model, index, directives, options) {
      var children;
      children = [];
      return this.reset(model).renderValues(model, children).renderDirectives(model, index, directives).renderChildren(model, children, directives, options);
    });

    Instance.prototype.reset = chainable(function(model) {
      var element, _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.reset();
        _results.push(data(element.el).model = model);
      }
      return _results;
    });

    Instance.prototype.renderValues = chainable(function(model, children) {
      var element, key, value, _results;
      if (isDomElement(model) && (element = this.elements[0])) {
        return element.empty().el.appendChild(model);
      } else if (typeof model === 'object') {
        _results = [];
        for (key in model) {
          if (!__hasProp.call(model, key)) continue;
          value = model[key];
          if (value != null) {
            if (isPlainValue(value)) {
              _results.push((function() {
                var _i, _len, _ref, _results1;
                _ref = this.matchingElements(key);
                _results1 = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  element = _ref[_i];
                  if (element.nodeName === 'input') {
                    _results1.push(element.attr('value', value));
                  } else if (element.nodeName === 'select') {
                    _results1.push(element.attr('selected', value));
                  } else {
                    _results1.push(element.attr('text', value));
                  }
                }
                return _results1;
              }).call(this));
            } else if (typeof value === 'object') {
              _results.push(children.push(key));
            } else {
              _results.push(void 0);
            }
          }
        }
        return _results;
      }
    });

    Instance.prototype.renderDirectives = chainable(function(model, index, directives) {
      var attribute, attributes, directive, element, key, value, _results;
      if (!directives) {
        return this;
      }
      model = typeof model === 'object' ? model : {
        value: model
      };
      _results = [];
      for (key in directives) {
        if (!__hasProp.call(directives, key)) continue;
        attributes = directives[key];
        if (typeof attributes === 'object') {
          _results.push((function() {
            var _i, _len, _ref, _results1;
            _ref = this.matchingElements(key);
            _results1 = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              element = _ref[_i];
              _results1.push((function() {
                var _results2;
                _results2 = [];
                for (attribute in attributes) {
                  directive = attributes[attribute];
                  if (!(typeof directive === 'function')) {
                    continue;
                  }
                  value = directive.call(model, {
                    element: element.el,
                    index: index,
                    value: element.originalAttributes[attribute]
                  });
                  if (value != null) {
                    _results2.push(element.attr(attribute, value));
                  } else {
                    _results2.push(void 0);
                  }
                }
                return _results2;
              })());
            }
            return _results1;
          }).call(this));
        }
      }
      return _results;
    });

    Instance.prototype.renderChildren = chainable(function(model, children, directives, options) {
      var element, key, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        key = children[_i];
        _results.push((function() {
          var _j, _len1, _ref, _results1;
          _ref = this.matchingElements(key);
          _results1 = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            element = _ref[_j];
            _results1.push(Transparency.render(element.el, model[key], directives[key], options));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    });

    Instance.prototype.matchingElements = function(key) {
      var el, elements, _base;
      elements = (_base = this.queryCache)[key] || (_base[key] = (function() {
        var _i, _len, _ref, _results;
        _ref = this.elements;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          if (Transparency.matcher(el, key)) {
            _results.push(el);
          }
        }
        return _results;
      }).call(this));
      log("Matching elements for '" + key + "':", elements);
      return elements;
    };

    return Instance;

  })();

  getChildNodes = function(el) {
    var child, childNodes;
    childNodes = [];
    child = el.firstChild;
    while (child) {
      childNodes.push(child);
      child = child.nextSibling;
    }
    return childNodes;
  };

  getElements = function(el) {
    var elements;
    elements = [];
    _getElements(el, elements);
    return elements;
  };

  _getElements = function(template, elements) {
    var child, _results;
    child = template.firstChild;
    _results = [];
    while (child) {
      if (child.nodeType === ELEMENT_NODE) {
        elements.push(new Element(child));
        _getElements(child, elements);
      }
      _results.push(child = child.nextSibling);
    }
    return _results;
  };

  Element = (function() {

    function Element(el) {
      var _ref;
      this.el = el;
      this.childNodes = getChildNodes(this.el);
      this.nodeName = this.el.nodeName.toLowerCase();
      this.classNames = this.el.className.split(' ');
      this.isVoidElement = (_ref = this.nodeName, __indexOf.call(VOID_ELEMENTS, _ref) >= 0);
      this.originalAttributes = {};
    }

    Element.prototype.empty = function() {
      var child;
      while (child = this.el.firstChild) {
        this.el.removeChild(child);
      }
      return this;
    };

    Element.prototype.reset = function() {
      var attribute, value, _ref, _results;
      _ref = this.originalAttributes;
      _results = [];
      for (attribute in _ref) {
        value = _ref[attribute];
        _results.push(this.attr(attribute, value));
      }
      return _results;
    };

    Element.prototype.setHtml = function(html) {
      var child, _i, _len, _ref, _results;
      this.empty();
      this.el.innerHTML = html;
      _ref = this.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(this.el.appendChild(child));
      }
      return _results;
    };

    Element.prototype.setText = function(text) {
      var textNode;
      textNode = this.el.firstChild;
      if (!textNode) {
        return this.el.appendChild(this.el.ownerDocument.createTextNode(text));
      } else if (textNode.nodeType !== TEXT_NODE) {
        return this.el.insertBefore(this.el.ownerDocument.createTextNode(text), textNode);
      } else {
        return textNode.nodeValue = text;
      }
    };

    Element.prototype.getText = function() {
      var child;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = this.childNodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.nodeType === TEXT_NODE) {
            _results.push(child.nodeValue);
          }
        }
        return _results;
      }).call(this)).join('');
    };

    Element.prototype.setSelected = function(value) {
      var child, childElements, _i, _len, _results;
      value = String(value);
      childElements = getElements(this.el);
      _results = [];
      for (_i = 0, _len = childElements.length; _i < _len; _i++) {
        child = childElements[_i];
        if (child.nodeName === 'option') {
          if (child.el.value === value) {
            _results.push(child.el.selected = true);
          } else {
            _results.push(child.el.selected = false);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Element.prototype.attr = function(attribute, value) {
      var _base, _base1, _base2, _base3, _base4, _ref, _ref1, _ref2, _ref3, _ref4;
      if (this.nodeName === 'select' && attribute === 'selected') {
        return this.setSelected(value);
      } else {
        switch (attribute) {
          case 'text':
            if (!this.isVoidElement) {
              if ((_ref = (_base = this.originalAttributes)['text']) == null) {
                _base['text'] = this.getText();
              }
              return this.setText(value);
            }
            break;
          case 'html':
            if ((_ref1 = (_base1 = this.originalAttributes)['html']) == null) {
              _base1['html'] = this.el.innerHTML;
            }
            return this.setHtml(value);
          case 'class':
            if ((_ref2 = (_base2 = this.originalAttributes)['class']) == null) {
              _base2['class'] = this.el.className;
            }
            return this.el.className = value;
          default:
            this.el[attribute] = value;
            if (isBoolean(value)) {
              if ((_ref3 = (_base3 = this.originalAttributes)[attribute]) == null) {
                _base3[attribute] = this.el.getAttribute(attribute) || false;
              }
              if (value) {
                return this.el.setAttribute(attribute, attribute);
              } else {
                return this.el.removeAttribute(attribute);
              }
            } else {
              if ((_ref4 = (_base4 = this.originalAttributes)[attribute]) == null) {
                _base4[attribute] = this.el.getAttribute(attribute) || "";
              }
              return this.el.setAttribute(attribute, value.toString());
            }
        }
      }
    };

    return Element;

  })();

  ELEMENT_NODE = 1;

  TEXT_NODE = 3;

  VOID_ELEMENTS = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

  html5Clone = function() {
    return document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
  };

  cloneNode = !(typeof document !== "undefined" && document !== null) || html5Clone() ? function(node) {
    return node.cloneNode(true);
  } : function(node) {
    var cloned, element, _i, _len, _ref;
    cloned = Transparency.clone(node);
    if (cloned.nodeType === ELEMENT_NODE) {
      cloned.removeAttribute(expando);
      _ref = cloned.getElementsByTagName('*');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.removeAttribute(expando);
      }
    }
    return cloned;
  };

  expando = 'transparency';

  data = function(element) {
    return element[expando] || (element[expando] = {});
  };

  nullLogger = function() {};

  consoleLogger = function() {
    var messages;
    messages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return console.log.apply(console, messages);
  };

  log = nullLogger;

  toString = Object.prototype.toString;

  isDate = function(obj) {
    return toString.call(obj) === '[object Date]';
  };

  isDomElement = function(obj) {
    return obj.nodeType === ELEMENT_NODE;
  };

  isPlainValue = function(obj) {
    var type;
    type = typeof obj;
    return (type !== 'object' && type !== 'function') || isDate(obj);
  };

  isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  if ((_ref = jQuery || Zepto) != null) {
    _ref.fn.render = Transparency.jQueryPlugin;
  }

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define(function() {
      return Transparency;
    });
  }

}).call(this);
