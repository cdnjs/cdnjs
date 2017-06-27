(function() {
  var ELEMENT_NODE, Instance, TEXT_NODE, Transparency, VOID_ELEMENTS, attr, cloneNode, consoleLogger, data, empty, expando, getElementsAndChildNodes, getText, html5Clone, indexOf, isArray, isBoolean, isDate, isDomElement, isPlainValue, isVoidElement, log, matchingElements, nullLogger, prepareContext, renderDirectives, setHtml, setSelected, setText, toString, _ref,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  Transparency = this.Transparency = {};

  Transparency.render = function(context, models, directives, options) {
    var children, e, element, index, instance, instances, key, log, model, nodeName, parent, sibling, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
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
    parent = context.parentNode;
    if (parent) {
      sibling = context.nextSibling;
      parent.removeChild(context);
    }
    prepareContext(context, models);
    instances = data(context).instances;
    for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
      model = models[index];
      children = [];
      instance = instances[index];
      _ref = instance.elements;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        e = _ref[_j];
        data(e).model = model;
      }
      if (isDomElement(model) && (element = instance.elements[0])) {
        empty(element).appendChild(model);
      } else if (typeof model === 'object') {
        for (key in model) {
          if (!__hasProp.call(model, key)) continue;
          value = model[key];
          if (value != null) {
            if (isPlainValue(value)) {
              _ref1 = matchingElements(instance, key);
              for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                element = _ref1[_k];
                nodeName = element.nodeName.toLowerCase();
                if (nodeName === 'input') {
                  attr(element, 'value', value);
                } else if (nodeName === 'select') {
                  attr(element, 'selected', value);
                } else {
                  attr(element, 'text', value);
                }
              }
            } else if (typeof value === 'object') {
              children.push(key);
            }
          }
        }
      }
      renderDirectives(instance, model, index, directives);
      for (_l = 0, _len3 = children.length; _l < _len3; _l++) {
        key = children[_l];
        _ref2 = matchingElements(instance, key);
        for (_m = 0, _len4 = _ref2.length; _m < _len4; _m++) {
          element = _ref2[_m];
          Transparency.render(element, model[key], directives[key], options);
        }
      }
    }
    if (parent) {
      if (sibling) {
        parent.insertBefore(context, sibling);
      } else {
        parent.appendChild(context);
      }
    }
    return context;
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
    return element.id === key || indexOf(element.className.split(' '), key) > -1 || element.name === key || element.getAttribute('data-bind') === key;
  };

  Transparency.clone = function(node) {
    var _base;
    return typeof (_base = jQuery || Zepto) === "function" ? _base(node).clone()[0] : void 0;
  };

  Instance = (function() {

    function Instance(template) {
      this.template = template;
      this.queryCache = {};
      this.elements = [];
      this.childNodes = [];
      getElementsAndChildNodes(this.template, this.elements, this.childNodes);
    }

    return Instance;

  })();

  prepareContext = function(context, models) {
    var attribute, contextData, element, instance, n, value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
    log("PrepareContext:", context, models);
    contextData = data(context);
    if (!contextData.template) {
      contextData.template = cloneNode(context);
      contextData.instanceCache = [];
      contextData.instances = [new Instance(context)];
    }
    while (models.length > contextData.instances.length) {
      instance = contextData.instanceCache.pop() || new Instance(cloneNode(contextData.template));
      _ref = instance.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        context.appendChild(n);
      }
      contextData.instances.push(instance);
    }
    while (models.length < contextData.instances.length) {
      contextData.instanceCache.push(instance = contextData.instances.pop());
      _ref1 = instance.childNodes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        n = _ref1[_j];
        n.parentNode.removeChild(n);
      }
    }
    _ref2 = contextData.instances;
    _results = [];
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      instance = _ref2[_k];
      _results.push((function() {
        var _l, _len3, _ref3, _results1;
        _ref3 = instance.elements;
        _results1 = [];
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          element = _ref3[_l];
          _results1.push((function() {
            var _ref4, _results2;
            _ref4 = data(element).originalAttributes;
            _results2 = [];
            for (attribute in _ref4) {
              value = _ref4[attribute];
              _results2.push(attr(element, attribute, value));
            }
            return _results2;
          })());
        }
        return _results1;
      })());
    }
    return _results;
  };

  getElementsAndChildNodes = function(template, elements, childNodes) {
    var child, _base, _results;
    child = template.firstChild;
    _results = [];
    while (child) {
      if (childNodes != null) {
        childNodes.push(child);
      }
      if (child.nodeType === ELEMENT_NODE) {
        (_base = data(child)).originalAttributes || (_base.originalAttributes = {});
        elements.push(child);
        getElementsAndChildNodes(child, elements);
      }
      _results.push(child = child.nextSibling);
    }
    return _results;
  };

  renderDirectives = function(instance, model, index, directives) {
    var attribute, attributes, directive, element, key, value, _results;
    if (!directives) {
      return;
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
          _ref = matchingElements(instance, key);
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
                  element: element,
                  index: index,
                  value: attr(element, attribute)
                });
                _results2.push(attr(element, attribute, value));
              }
              return _results2;
            })());
          }
          return _results1;
        })());
      }
    }
    return _results;
  };

  setHtml = function(element, html) {
    var child, elementData, n, _i, _len, _ref, _results;
    elementData = data(element);
    if (elementData.html === html) {
      return;
    }
    elementData.html = html;
    elementData.children || (elementData.children = (function() {
      var _i, _len, _ref, _results;
      _ref = element.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.nodeType === ELEMENT_NODE) {
          _results.push(n);
        }
      }
      return _results;
    })());
    empty(element);
    element.innerHTML = html;
    _ref = elementData.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(element.appendChild(child));
    }
    return _results;
  };

  setText = function(element, text) {
    var elementData, textNode;
    elementData = data(element);
    if (!(text != null) || elementData.text === text) {
      return;
    }
    elementData.text = text;
    textNode = element.firstChild;
    if (!textNode) {
      return element.appendChild(element.ownerDocument.createTextNode(text));
    } else if (textNode.nodeType !== TEXT_NODE) {
      return element.insertBefore(element.ownerDocument.createTextNode(text), textNode);
    } else {
      return textNode.nodeValue = text;
    }
  };

  getText = function(element) {
    var child;
    return ((function() {
      var _i, _len, _ref, _results;
      _ref = element.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType === TEXT_NODE) {
          _results.push(child.nodeValue);
        }
      }
      return _results;
    })()).join('');
  };

  setSelected = function(element, value) {
    var child, childElements, _i, _len, _results;
    value = value.toString();
    childElements = [];
    getElementsAndChildNodes(element, childElements);
    _results = [];
    for (_i = 0, _len = childElements.length; _i < _len; _i++) {
      child = childElements[_i];
      if (child.nodeName.toLowerCase() === 'option') {
        if (child.value === value) {
          _results.push(child.selected = true);
        } else {
          _results.push(child.selected = false);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  attr = function(element, attribute, value) {
    var elementData, _base, _base1, _base2, _base3, _base4, _ref, _ref1, _ref2, _ref3, _ref4;
    elementData = data(element);
    if (value == null) {
      return elementData.originalAttributes[attribute];
    }
    if (element.nodeName.toLowerCase() === 'select' && attribute === 'selected') {
      return setSelected(element, value);
    } else {
      switch (attribute) {
        case 'text':
          if (!isVoidElement(element)) {
            if ((_ref = (_base = elementData.originalAttributes)['text']) == null) {
              _base['text'] = getText(element);
            }
            return setText(element, value);
          }
          break;
        case 'html':
          if ((_ref1 = (_base1 = elementData.originalAttributes)['html']) == null) {
            _base1['html'] = element.innerHTML;
          }
          return setHtml(element, value);
        case 'class':
          if ((_ref2 = (_base2 = elementData.originalAttributes)['class']) == null) {
            _base2['class'] = element.className;
          }
          return element.className = value;
        default:
          element[attribute] = value;
          if (isBoolean(value)) {
            if ((_ref3 = (_base3 = elementData.originalAttributes)[attribute]) == null) {
              _base3[attribute] = element.getAttribute(attribute) || false;
            }
            if (value) {
              return element.setAttribute(attribute, attribute);
            } else {
              return element.removeAttribute(attribute);
            }
          } else {
            if ((_ref4 = (_base4 = elementData.originalAttributes)[attribute]) == null) {
              _base4[attribute] = element.getAttribute(attribute) || "";
            }
            return element.setAttribute(attribute, value.toString());
          }
      }
    }
  };

  matchingElements = function(instance, key) {
    var e, elements, _base;
    elements = (_base = instance.queryCache)[key] || (_base[key] = (function() {
      var _i, _len, _ref, _results;
      _ref = instance.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (Transparency.matcher(e, key)) {
          _results.push(e);
        }
      }
      return _results;
    })());
    log("Matching elements for '" + key + "':", elements);
    return elements;
  };

  empty = function(element) {
    var child;
    while (child = element.firstChild) {
      element.removeChild(child);
    }
    return element;
  };

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

  isVoidElement = function(el) {
    return indexOf(VOID_ELEMENTS, el.nodeName.toLowerCase()) > -1;
  };

  isPlainValue = function(obj) {
    return isDate(obj) || typeof obj !== 'object' && typeof obj !== 'function';
  };

  isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  indexOf = function(array, item) {
    var i, x, _i, _len;
    if (array.indexOf) {
      return array.indexOf(item);
    }
    for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
      x = array[i];
      if (x === item) {
        return i;
      }
    }
    return -1;
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
