(function() {
  var __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  (function(root, factory) {
    if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
      return define(factory);
    } else if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
      return module.exports = factory();
    } else {
      return root.Transparency = factory();
    }
  })(this, function() {
    var $, ELEMENT_NODE, Instance, TEXT_NODE, VOID_ELEMENTS, attr, clone, cloneNode, consoleLogger, data, empty, expando, exports, getElementsAndChildNodes, getText, html5Clone, indexOf, isArray, isBoolean, isDate, isDomElement, isPlainValue, isVoidElement, log, matcher, matchingElements, nullLogger, prepareContext, register, render, renderDirectives, setHtml, setSelected, setText, toString;
    register = function($) {
      return $ != null ? $.fn.render = function(models, directives, config) {
        var context, _i, _len;
        for (_i = 0, _len = this.length; _i < _len; _i++) {
          context = this[_i];
          render(context, models, directives, config);
        }
        return this;
      } : void 0;
    };
    $ = this.jQuery || this.Zepto;
    register($);
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
    render = function(context, models, directives, config) {
      var children, contextData, e, element, index, instance, key, model, nodeName, parent, sibling, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
      log = (config != null ? config.debug : void 0) && (typeof console !== "undefined" && console !== null) ? consoleLogger : nullLogger;
      log("Context:", context, "Models:", models, "Directives:", directives, "Config:", config);
      if (!context) {
        return;
      }
      models || (models = []);
      directives || (directives = {});
      if (!isArray(models)) {
        models = [models];
      }
      parent = context.parentNode;
      if (parent) {
        sibling = context.nextSibling;
        parent.removeChild(context);
      }
      prepareContext(context, models);
      contextData = data(context);
      for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
        model = models[index];
        children = [];
        instance = contextData.instances[index];
        log("Model:", model, "Template instance for the model:", instance);
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
            render(element, model[key], directives[key], config);
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
    prepareContext = function(context, models) {
      var contextData, instance, n, _i, _len, _ref, _results;
      contextData = data(context);
      if (!contextData.template) {
        contextData.template = cloneNode(context);
        contextData.instanceCache = [];
        contextData.instances = [new Instance(context)];
      }
      log("Template", contextData.template);
      while (models.length > contextData.instances.length) {
        instance = contextData.instanceCache.pop() || new Instance(cloneNode(contextData.template));
        _ref = instance.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          context.appendChild(n);
        }
        contextData.instances.push(instance);
      }
      _results = [];
      while (models.length < contextData.instances.length) {
        contextData.instanceCache.push(instance = contextData.instances.pop());
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = instance.childNodes;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            n = _ref1[_j];
            _results1.push(n.parentNode.removeChild(n));
          }
          return _results1;
        })());
      }
      return _results;
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
    getElementsAndChildNodes = function(template, elements, childNodes) {
      var child, _results;
      child = template.firstChild;
      _results = [];
      while (child) {
        if (childNodes != null) {
          childNodes.push(child);
        }
        if (child.nodeType === ELEMENT_NODE) {
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
      var elementData, _base, _base1, _base2, _base3;
      elementData = data(element);
      elementData.originalAttributes || (elementData.originalAttributes = {});
      if (element.nodeName.toLowerCase() === 'select' && attribute === 'selected') {
        if ((value != null) && typeof value !== 'string') {
          value = value.toString();
        }
        if (value != null) {
          setSelected(element, value);
        }
      } else {
        switch (attribute) {
          case 'text':
            if (!isVoidElement(element)) {
              if ((value != null) && typeof value !== 'string') {
                value = value.toString();
              }
              (_base = elementData.originalAttributes)['text'] || (_base['text'] = getText(element));
              if (value != null) {
                setText(element, value);
              }
            }
            break;
          case 'html':
            if ((value != null) && typeof value !== 'string') {
              value = value.toString();
            }
            (_base1 = elementData.originalAttributes)['html'] || (_base1['html'] = element.innerHTML);
            if (value != null) {
              setHtml(element, value);
            }
            break;
          case 'class':
            (_base2 = elementData.originalAttributes)['class'] || (_base2['class'] = element.className);
            if (value != null) {
              element.className = value;
            }
            break;
          default:
            (_base3 = elementData.originalAttributes)[attribute] || (_base3[attribute] = element.getAttribute(attribute));
            if (value != null) {
              element.setAttribute(attribute, value.toString());
              element[attribute] = value;
            }
        }
      }
      if (value != null) {
        return value;
      } else {
        return elementData.originalAttributes[attribute];
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
          if (exports.matcher(e, key)) {
            _results.push(e);
          }
        }
        return _results;
      })());
      log("Matching elements for '" + key + "':", elements);
      return elements;
    };
    matcher = function(element, key) {
      return element.id === key || indexOf(element.className.split(' '), key) > -1 || element.name === key || element.getAttribute('data-bind') === key;
    };
    clone = function(node) {
      return $(node).clone()[0];
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
      cloned = clone(node);
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
    return exports = {
      render: render,
      register: register,
      matcher: matcher,
      clone: clone
    };
  });

}).call(this);
