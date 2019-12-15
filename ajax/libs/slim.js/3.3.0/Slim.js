'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
  try {
    var _window = window,
        _Slim = _window.Slim;

    if (!!_Slim && Symbol.slimjs && _Slim.plugins && _Slim.asap) {
      var warn = console.error || console.warn || console.log;
      return warn('Stopping script: slim.js already initialized');
    }
  } catch (err) {}

  var _$2 = Symbol.slimjs = Symbol('@SlimInternals');

  var __flags = {
    isWCSupported: 'customElements' in window && 'import' in document.createElement('link') && 'content' in document.createElement('template'),
    isIE11: !!window['MSInputMethodContext'] && !!document['documentMode'],
    isChrome: undefined,
    isEdge: undefined,
    isSafari: undefined,
    isFirefox: undefined
  };

  try {
    __flags.isChrome = /Chrome/.test(navigator.userAgent);
    __flags.isEdge = /Edge/.test(navigator.userAgent);
    __flags.isSafari = /Safari/.test(navigator.userAgent);
    __flags.isFirefox = /Firefox/.test(navigator.userAgent);

    if (__flags.isIE11 || __flags.isEdge) {
      __flags.isChrome = false;
      Object.defineProperty(Node.prototype, 'children', function () {
        return this.childNodes;
      });
    }
  } catch (err) {}

  var Internals = function Internals() {
    _classCallCheck(this, Internals);

    this.boundParent = null;
    this.repeater = {};
    this.bindings = {};
    this.inbounds = {};
    this.eventHandlers = {};
    this.rootElement = null;
    this.createdCallbackInvoked = false;
    this.sourceText = null;
    this.excluded = false;
    this.autoBoundAttributes = [];
  };

  var Slim = function (_CustomElement2) {
    _inherits(Slim, _CustomElement2);

    _createClass(Slim, null, [{
      key: 'dashToCamel',
      value: function dashToCamel(dash) {
        return dash.indexOf('-') < 0 ? dash : dash.replace(/-[a-z]/g, function (m) {
          return m[1].toUpperCase();
        });
      }
    }, {
      key: 'camelToDash',
      value: function camelToDash(camel) {
        return camel.replace(/([A-Z])/g, '-$1').toLowerCase();
      }
    }, {
      key: 'lookup',
      value: function lookup(target, expression, maybeRepeated) {
        var chain = expression.split('.');
        var o = void 0;
        if (maybeRepeated && maybeRepeated[_$2].repeater[chain[0]]) {
          o = maybeRepeated[_$2].repeater;
        } else {
          o = target;
        }
        var i = 0;
        while (o && i < chain.length) {
          o = o[chain[i++]];
        }
        return o;
      }

      // noinspection JSUnresolvedVariable

    }, {
      key: '_$',
      value: function _$(target) {
        target[_$2] = target[_$2] || new Internals();
        return target[_$2];
      }
    }, {
      key: 'polyFill',
      value: function polyFill(url) {
        if (!__flags.isWCSupported) {
          var existingScript = document.querySelector('script[data-is-slim-polyfill="true"]');
          if (!existingScript) {
            var script = document.createElement('script');
            script.setAttribute('data-is-slim-polyfill', 'true');
            script.src = url;
            document.head.appendChild(script);
          }
        }
      }
    }, {
      key: 'tag',
      value: function tag(tagName, tplOrClazz, clazz) {
        if (clazz === undefined) {
          clazz = tplOrClazz;
        } else {
          Slim.tagToTemplateDict.set(tagName, tplOrClazz);
        }
        this.classToTagDict.set(clazz, tagName);
        customElements.define(tagName, clazz);
      }
    }, {
      key: 'tagOf',
      value: function tagOf(clazz) {
        return this.classToTagDict.get(clazz);
      }

      /**
       * @deprecated
       * @param tag
       * @returns {Function} Class constructor
       */

    }, {
      key: 'classOf',
      value: function classOf(tag) {
        return customElements.get(tag);
      }
    }, {
      key: 'plugin',
      value: function plugin(phase, _plugin) {
        if (!this.plugins[phase]) {
          throw new Error('Cannot attach plugin: ' + phase + ' is not a supported phase');
        }
        this.plugins[phase].push(_plugin);
      }
    }, {
      key: 'checkCreationBlocking',
      value: function checkCreationBlocking(element) {
        if (element.attributes) {
          for (var i = 0, n = element.attributes.length; i < n; i++) {
            var attribute = element.attributes[i];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Slim[_$2].customDirectives[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;

                var _ref2 = _slicedToArray(_ref, 2);

                var test = _ref2[0];
                var directive = _ref2[1];

                var value = directive.isBlocking && test(attribute);
                if (value) {
                  return true;
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }
        return false;
      }
    }, {
      key: 'customDirective',
      value: function customDirective(testFn, fn, isBlocking) {
        if (this[_$2].customDirectives.has(testFn)) {
          throw new Error('Cannot register custom directive: ' + testFn + ' already registered');
        }
        fn.isBlocking = isBlocking;
        this[_$2].customDirectives.set(testFn, fn);
      }
    }, {
      key: 'executePlugins',
      value: function executePlugins(phase, target) {
        this.plugins[phase].forEach(function (fn) {
          fn(target);
        });
      }
    }, {
      key: 'qSelectAll',
      value: function qSelectAll(target, selector) {
        return [].concat(_toConsumableArray(target.querySelectorAll(selector)));
      }
    }, {
      key: 'unbind',
      value: function unbind(source, target) {
        var bindings = source[_$2].bindings;
        Object.keys(bindings).forEach(function (key) {
          var chain = bindings[key].chain;
          if (chain.has(target)) {
            chain.delete(target);
          }
        });
      }
    }, {
      key: 'root',
      value: function root(target) {
        return target.__isSlim && target.useShadow ? target[_$2].rootElement || target : target;
      }
    }, {
      key: 'selectRecursive',
      value: function selectRecursive(target, force) {
        var collection = [];
        var search = function search(node, force) {
          collection.push(node);
          var allow = !node.__isSlim || node.__isSlim && !node.template || node.__isSlim && node === target || force;
          if (allow) {
            var children = [].concat(_toConsumableArray(Slim.root(node).children));
            children.forEach(function (childNode) {
              search(childNode, force);
            });
          }
        };
        search(target, force);
        return collection;
      }
    }, {
      key: 'removeChild',
      value: function removeChild(target) {
        if (typeof target.remove === 'function') {
          target.remove();
        }
        if (target.parentNode) {
          target.parentNode.removeChild(target);
        }
        if (this._$(target).internetExploderClone) {
          this.removeChild(this._$(target).internetExploderClone);
        }
      }
    }, {
      key: 'moveChildren',
      value: function moveChildren(source, target) {
        while (source.firstChild) {
          target.appendChild(source.firstChild);
        }
      }
    }, {
      key: 'wrapGetterSetter',
      value: function wrapGetterSetter(element, expression) {
        var pName = expression.split('.')[0];
        var oSetter = element.__lookupSetter__(pName);
        if (oSetter && oSetter[_$2]) return pName;
        var srcValue = element[pName];

        var _$3 = this._$(element),
            bindings = _$3.bindings;

        bindings[pName] = {
          chain: new Set(),
          value: srcValue
        };
        bindings[pName].value = srcValue;
        var newSetter = function newSetter(v) {
          oSetter && oSetter.call(element, v);
          bindings[pName].value = v;
          element._executeBindings(pName);
        };
        newSetter[_$2] = true;
        element.__defineGetter__(pName, function () {
          return element[_$2].bindings[pName].value;
        });
        element.__defineSetter__(pName, newSetter);
        return pName;
      }
    }, {
      key: 'bindOwn',
      value: function bindOwn(target, expression, executor) {
        return Slim.bind(target, target, expression, executor);
      }
    }, {
      key: 'bind',
      value: function bind(source, target, expression, executor) {
        Slim._$(source);
        Slim._$(target);
        if (target[_$2].excluded) return;
        executor.source = source;
        executor.target = target;
        var pName = this.wrapGetterSetter(source, expression);
        if (!target[_$2].repeater[pName]) {
          source[_$2].bindings[pName].chain.add(target);
        }
        target[_$2].inbounds[pName] = target[_$2].inbounds[pName] || new Set();
        target[_$2].inbounds[pName].add(executor);
        return executor;
      }
    }, {
      key: 'update',
      value: function update(target) {
        for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          props[_key - 1] = arguments[_key];
        }

        if (props.length === 0) {
          return Slim.commit(target);
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var prop = _step2.value;

            Slim.commit(target, prop);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: 'commit',
      value: function commit(target, propertyName) {
        var $ = Slim._$(target);
        var props = propertyName ? [propertyName] : Object.keys($.bindings);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = props[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var prop = _step3.value;

            var inbounds = $.inbounds[prop];
            if (inbounds) {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = inbounds[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var fn = _step4.value;

                  fn();
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            }
            var bindings = $.bindings[prop];
            if (bindings) {
              var nodes = bindings.chain;
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var node = _step5.value;

                  Slim.commit(node, prop);
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      /*
        Class instance
        */

    }, {
      key: 'rxProp',
      get: function get() {
        return (/(.+[^(\((.+)\))])/
        ); // eslint-disable-line
      }
    }, {
      key: 'rxMethod',
      get: function get() {
        return (/(.+)(\((.+)\)){1}/
        ); // eslint-disable-line
      }
    }]);

    function Slim() {
      _classCallCheck(this, Slim);

      var _this = _possibleConstructorReturn(this, (Slim.__proto__ || Object.getPrototypeOf(Slim)).call(this));

      Slim._$(_this);
      _this.__isSlim = true;
      var init = function init() {
        Slim.debug('ctor', _this.localName);
        if (Slim.checkCreationBlocking(_this)) {
          return;
        }
        _this.createdCallback();
      };
      if (__flags.isSafari) {
        Slim.asap(init);
      } else init();
      return _this;
    }

    // Native DOM Api V1

    _createClass(Slim, [{
      key: 'createdCallback',
      value: function createdCallback() {
        if (this[_$2] && this[_$2].createdCallbackInvoked) return;
        this._initialize();
        this[_$2].createdCallbackInvoked = true;
        this.onBeforeCreated();
        Slim.executePlugins('create', this);
        this.render();
        this.onCreated();
      }

      // Native DOM Api V2

    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        this.onAdded();
        Slim.executePlugins('added', this);
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.onRemoved();
        Slim.executePlugins('removed', this);
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        if (newValue !== oldValue && this.autoBoundAttributes.includes[attr]) {
          var prop = Slim.dashToCamel(attr);
          this[prop] = newValue;
        }
      }
      // Slim internal API

    }, {
      key: '_executeBindings',
      value: function _executeBindings(prop) {
        Slim.debug('_executeBindings', this.localName, this);
        Slim.commit(this, prop);
      }
    }, {
      key: '_bindChildren',
      value: function _bindChildren(children) {
        Slim.debug('_bindChildren', this.localName);
        if (!children) {
          children = Slim.qSelectAll(this, '*');
        }
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var child = _step6.value;

            Slim._$(child);
            if (child[_$2].boundParent === this) continue;
            child[_$2].boundParent = child[_$2].boundParent || this;

            // todo: child.localName === 'style' && this.useShadow -> processStyleNodeInShadowMode

            scanNode(this, child);

            if (child.attributes.length) {
              var attributes = Array.from(child.attributes);
              var i = 0;
              var n = child.attributes.length;
              while (i < n) {
                var source = this;
                var attribute = attributes[i];
                if (!child[_$2].excluded) {
                  var _iteratorNormalCompletion7 = true;
                  var _didIteratorError7 = false;
                  var _iteratorError7 = undefined;

                  try {
                    for (var _iterator7 = Slim[_$2].customDirectives[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                      var _ref3 = _step7.value;

                      var _ref4 = _slicedToArray(_ref3, 2);

                      var check = _ref4[0];
                      var directive = _ref4[1];

                      var match = check(attribute);
                      if (match) {
                        directive(source, child, attribute, match);
                      }
                    }
                  } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                      }
                    } finally {
                      if (_didIteratorError7) {
                        throw _iteratorError7;
                      }
                    }
                  }
                }
                i++;
              }
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
    }, {
      key: '_resetBindings',
      value: function _resetBindings() {
        Slim.debug('_resetBindings', this.localName);
        this[_$2].bindings = {};
      }
    }, {
      key: '_render',
      value: function _render(customTemplate) {
        var _this2 = this;

        Slim.debug('_render', this.localName);
        Slim.executePlugins('beforeRender', this);
        this._resetBindings();[].concat(_toConsumableArray(this.children)).forEach(function (childNode) {
          if (childNode.localName === 'style') {
            _this2[_$2].externalStyle = document.importNode(childNode).cloneNode();
          }
        });
        Slim.root(this).innerHTML = '';
        var templateString = customTemplate || this.template;
        var template = document.createElement('template');
        template.innerHTML = templateString;
        var frag = template.content.cloneNode(true);
        var externalStyle = this[_$2].externalStyle;

        if (externalStyle) {
          frag.appendChild(this[_$2]);
        }
        var scopedChildren = Slim.qSelectAll(frag, '*');
        var doRender = function doRender() {
          (_this2[_$2].rootElement || _this2).appendChild(frag);
          _this2._bindChildren(scopedChildren);
          _this2._executeBindings();
          _this2.onRender();
          Slim.executePlugins('afterRender', _this2);
        };
        if (this.useShadow) {
          doRender();
        } else {
          Slim.asap(doRender);
        }
      }
    }, {
      key: '_initialize',
      value: function _initialize() {
        var _this3 = this;

        Slim.debug('_initialize', this.localName);
        if (this.useShadow) {
          if (typeof HTMLElement.prototype.attachShadow === 'undefined') {
            this[_$2].rootElement = this.createShadowRoot();
          } else {
            this[_$2].rootElement = this.attachShadow({ mode: 'open' });
          }
        } else {
          this[_$2].rootElement = this;
        }
        var observedAttributes = this.constructor.observedAttributes;
        if (observedAttributes) {
          observedAttributes.forEach(function (attr) {
            var pName = Slim.dashToCamel(attr);
            _this3[pName] = _this3.getAttribute(attr);
          });
        }
      }

      // Slim public / protected API

    }, {
      key: 'commit',
      value: function commit() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        Slim.commit.apply(Slim, [this].concat(args));
      }
    }, {
      key: 'update',
      value: function update() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        Slim.update.apply(Slim, [this].concat(args));
      }
    }, {
      key: 'render',
      value: function render(tpl) {
        this._render(tpl);
      }
    }, {
      key: 'onRender',
      value: function onRender() {}
    }, {
      key: 'onBeforeCreated',
      value: function onBeforeCreated() {}
    }, {
      key: 'onCreated',
      value: function onCreated() {}
    }, {
      key: 'onAdded',
      value: function onAdded() {}
    }, {
      key: 'onRemoved',
      value: function onRemoved() {}
    }, {
      key: 'find',
      value: function find(selector) {
        return this[_$2].rootElement.querySelector(selector);
      }
    }, {
      key: 'findAll',
      value: function findAll(selector) {
        return Slim.qSelectAll(this[_$2].rootElement, selector);
      }
    }, {
      key: 'callAttribute',
      value: function callAttribute(attr, data) {
        var fnName = this.getAttribute(attr);
        if (fnName) {
          return this[_$2].boundParent[fnName](data);
        }
      }
    }, {
      key: 'autoBoundAttributes',
      get: function get() {
        return [];
      }
    }, {
      key: 'useShadow',
      get: function get() {
        return false;
      }
    }, {
      key: 'template',
      get: function get() {
        return Slim.tagToTemplateDict.get(Slim.tagOf(this.constructor));
      }
    }]);

    return Slim;
  }(_CustomElement);

  Slim.classToTagDict = new Map();
  // noinspection JSAnnotator
  Slim.tagToTemplateDict = new Map();
  // noinspection JSAnnotator
  Slim.plugins = {
    create: [],
    added: [],
    beforeRender: [],
    afterRender: [],
    removed: []
  };

  Slim.debug = function () {};
  Slim.asap = window && window.requestAnimationFrame ? function (cb) {
    return window.requestAnimationFrame(cb);
  } : typeof setImmediate !== 'undefined' ? setImmediate : function (cb) {
    return setTimeout(cb, 0);
  };

  Slim[_$2] = {
    customDirectives: new Map(),
    uniqueCounter: 0,
    supportedNativeEvents: ['click', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mousedown', 'mouseup', 'dblclick', 'contextmenu', 'wheel', 'mouseleave', 'select', 'pointerlockchange', 'pointerlockerror', 'focus', 'blur', 'input', 'error', 'invalid', 'animationstart', 'animationend', 'animationiteration', 'reset', 'submit', 'resize', 'scroll', 'keydown', 'keypress', 'keyup', 'change']
  };

  Slim.customDirective(function (attr) {
    return attr.nodeName === 's:switch';
  }, function (source, target, attribute) {
    var expression = attribute.value;
    var oldValue = void 0;
    var anchor = document.createComment('switch:' + expression);
    target.appendChild(anchor);
    var children = [].concat(_toConsumableArray(target.children));
    var defaultChildren = children.filter(function (child) {
      return child.hasAttribute('s:default');
    });
    var fn = function fn() {
      var value = Slim.lookup(source, expression, target);
      if (String(value) === oldValue) return;
      var useDefault = true;
      children.forEach(function (child) {
        if (child.getAttribute('s:case') === String(value)) {
          if (child.__isSlim) {
            child.createdCallback();
          }
          anchor.parentNode.insertBefore(child, anchor);
          useDefault = false;
        } else {
          Slim.removeChild(child);
        }
      });
      if (useDefault) {
        defaultChildren.forEach(function (child) {
          if (child.__isSlim) {
            child.createdCallback();
          }
          anchor.parentNode.insertBefore(child, anchor);
        });
      } else {
        defaultChildren.forEach(function (child) {
          Slim.removeChild(child);
        });
      }
      oldValue = String(value);
    };
    Slim.bind(source, target, expression, fn);
  });

  Slim.customDirective(function (attr) {
    return (/^s:case$/.exec(attr.nodeName)
    );
  }, function () {}, true);
  Slim.customDirective(function (attr) {
    return (/^s:default$/.exec(attr.nodeName)
    );
  }, function () {}, true);

  // supported events (i.e. click, mouseover, change...)
  Slim.customDirective(function (attr) {
    return Slim[_$2].supportedNativeEvents.indexOf(attr.nodeName) >= 0;
  }, function (source, target, attribute) {
    var eventName = attribute.nodeName;
    var delegate = attribute.value;
    Slim._$(target).eventHandlers = target[_$2].eventHandlers || {};
    var allHandlers = target[_$2].eventHandlers;
    allHandlers[eventName] = allHandlers[eventName] || new WeakSet();
    var handler = function handler(e) {
      try {
        source[delegate].call(source, e); // eslint-disable-line
      } catch (err) {
        err.message = 'Could not respond to event "' + eventName + '" on ' + target.localName + ' -> "' + delegate + '" on ' + source.localName + ' ... ' + err.message;
        console.warn(err);
      }
    };
    allHandlers[eventName].add(handler);
    target.addEventListener(eventName, handler);
    handler = null;
  });

  Slim.customDirective(function (attr) {
    return attr.nodeName === 's:if';
  }, function (source, target, attribute) {
    var expression = attribute.value;
    var path = expression;
    var isNegative = false;
    if (path.charAt(0) === '!') {
      path = path.slice(1);
      isNegative = true;
    }
    var oldValue = void 0;
    var anchor = document.createComment('{$target.localName} if:' + expression);
    target.parentNode.insertBefore(anchor, target);
    var fn = function fn() {
      var value = !!Slim.lookup(source, path, target);
      if (isNegative) {
        value = !value;
      }
      if (value === oldValue) return;
      if (value) {
        if (target.__isSlim) {
          target.createdCallback();
        }
        anchor.parentNode.insertBefore(target, anchor.nextSibling);
      } else {
        Slim.removeChild(target);
      }
      oldValue = value;
    };
    Slim.bind(source, target, path, fn);
  }, true);

  var scanNode = function scanNode(source, target) {
    var textNodes = Array.from(target.childNodes).filter(function (n) {
      return n.nodeType === Node.TEXT_NODE;
    });
    var masterNode = target;
    textNodes.forEach(function (target) {
      var updatedText = '';
      var matches = target.nodeValue.match(/\{\{([^\}\}]+)+\}\}/g); // eslint-disable-line
      var aggProps = {};
      var textBinds = {};
      if (matches) {
        Slim._$(target).sourceText = target.nodeValue;
        matches.forEach(function (expression) {
          var oldValue = void 0;
          var rxM = /\{\{(.+)(\((.+)\)){1}\}\}/.exec(expression);
          if (rxM) {
            var fnName = rxM[1];
            var pNames = rxM[3].split(' ').join('').split(',');
            pNames.map(function (path) {
              return path.split('.')[0];
            }).forEach(function (p) {
              return aggProps[p] = true;
            });
            textBinds[expression] = function (target) {
              var args = pNames.map(function (path) {
                return Slim.lookup(source, path, target);
              });
              var fn = source[fnName];
              var value = fn ? fn.apply(source, args) : undefined;
              if (oldValue === value) return;
              updatedText = updatedText.split(expression).join(value || '');
            };
            return;
          }
          var rxP = /\{\{(.+[^(\((.+)\))])\}\}/.exec(expression); // eslint-disable-line
          if (rxP) {
            var path = rxP[1];
            aggProps[path] = true;
            textBinds[expression] = function (target) {
              var value = Slim.lookup(source, path, masterNode);
              if (oldValue === value) return;
              updatedText = updatedText.split(expression).join(value || '');
            };
          }
        });
        var chainExecutor = function chainExecutor() {
          updatedText = target[_$2].sourceText;
          Object.keys(textBinds).forEach(function (expression) {
            textBinds[expression](target);
          });
          target.nodeValue = updatedText;
        };
        Object.keys(aggProps).forEach(function (prop) {
          Slim.bind(source, masterNode, prop, chainExecutor);
        });
      }
    });
  };

  Slim.customDirective(function (attr) {
    return attr.nodeName === 's:id';
  }, function (source, target, attribute) {
    Slim._$(target).boundParent[attribute.value] = target;
  });

  // bind:property
  Slim.customDirective(function (attr) {
    return (/^(bind):(\S+)/.exec(attr.nodeName)
    );
  }, function (source, target, attribute, match) {
    var tAttr = match[2];
    var tProp = Slim.dashToCamel(tAttr);
    var expression = attribute.value;
    var oldValue = void 0;
    var rxM = Slim.rxMethod.exec(expression);
    if (rxM) {
      var pNames = rxM[3].split(' ').join('').split(',');
      pNames.forEach(function (pName) {
        Slim.bind(source, target, pName, function () {
          var fn = Slim.lookup(source, rxM[1], target);
          var args = pNames.map(function (prop) {
            return Slim.lookup(source, prop, target);
          });
          var value = fn.apply(source, args);
          if (oldValue === value) return;
          target[tProp] = value;
          target.setAttribute(tAttr, value);
        });
      });
      return;
    }
    var rxP = Slim.rxProp.exec(expression);
    if (rxP) {
      var prop = rxP[1];
      Slim.bind(source, target, prop, function () {
        var value = Slim.lookup(source, expression, target);
        if (oldValue === value) return;
        target.setAttribute(tAttr, value);
        target[tProp] = value;
      });
    }
  });

  Slim.customDirective(function (attr) {
    return attr.nodeName === 's:repeat';
  }, function (source, repeaterNode, attribute) {
    var path = attribute.value;
    var tProp = 'data'; // default
    if (path.indexOf(' as ') > 0) {
      var _path$split = path.split(' as ');

      var _path$split2 = _slicedToArray(_path$split, 2);

      path = _path$split2[0];
      tProp = _path$split2[1];
    }

    // initialize clones list
    var clones = [];

    // create mount point and repeat template
    var mountPoint = document.createComment(repeaterNode.localName + ' s:repeat="' + attribute.value + '"');
    var parent = repeaterNode.parentElement || Slim.root(source);
    parent.insertBefore(mountPoint, repeaterNode);
    repeaterNode.removeAttribute('s:repeat');
    var clonesTemplate = repeaterNode.outerHTML;
    repeaterNode.remove();

    // prepare for bind
    var oldDataSource = [];

    var replicate = function replicate(n, text) {
      var temp = text;
      var result = '';
      if (n < 1) return result;
      while (n > 1) {
        if (n & 1) result += temp;
        n >>= 1;
        temp += temp;
      }
      return result + temp;
    };

    // bind changes
    Slim.bind(source, mountPoint, path, function () {
      // execute bindings here
      var dataSource = Slim.lookup(source, path) || [];
      // read the diff -> list of CHANGED indicies

      var fragment = void 0;

      // when data source shrinks, dispose extra clones
      if (dataSource.length < clones.length) {
        var disposables = clones.slice(dataSource.length);
        disposables.forEach(function (node) {
          Slim.unbind(source, node);
          if (node[_$2].subTree) {
            node[_$2].subTree.forEach(function (subNode) {
              return Slim.unbind(source, subNode);
            });
          }
          node.remove();
        });
        clones.length = dataSource.length;
      }

      // build new clones if needed
      if (dataSource.length > clones.length) {
        var offset = clones.length;
        var diff = dataSource.length - clones.length;
        var html = replicate(diff, clonesTemplate); //  Array(diff).fill(clonesTemplate.innerHTML).join('');
        var range = document.createRange();
        range.setStartBefore(mountPoint);
        fragment = range.createContextualFragment(html);
        // build clone by index

        var _loop = function _loop(i) {
          var dataIndex = i + offset;
          var dataItem = dataSource[dataIndex];
          var clone = fragment.children[i];
          Slim._$(clone).repeater[tProp] = dataItem;
          var subTree = Slim.qSelectAll(clone, '*');
          subTree.forEach(function (node) {
            Slim._$(node).repeater[tProp] = dataItem;
          });
          clone[_$2].subTree = subTree;
          clones.push(clone);
        };

        for (var i = 0; i < diff; i++) {
          _loop(i);
        }
        var fragmentTree = Slim.qSelectAll(fragment, '*');
        source._bindChildren(fragmentTree);
      }

      var init = function init(target, value) {
        target[tProp] = value;
        Slim.commit(target, tProp);
      };

      dataSource.forEach(function (dataItem, i) {
        if (oldDataSource[i] !== dataItem) {
          var rootNode = clones[i];[rootNode].concat(_toConsumableArray(rootNode[_$2].subTree || Slim.qSelectAll(rootNode, '*'))).forEach(function (node) {
            node[_$2].repeater[tProp] = dataItem;
            node[_$2].repeater.__node = rootNode;
            if (node.__isSlim) {
              node.createdCallback();
              Slim.asap(function () {
                return init(node, dataItem);
              });
            } else {
              init(node, dataItem);
            }
          });
        }
      });
      oldDataSource = dataSource.concat();
      if (fragment) {
        Slim.asap(function () {
          parent.insertBefore(fragment, mountPoint);
        });
      }
    });
  }, true);

  if (window) {
    window['Slim'] = Slim;
  }
  if (typeof module !== 'undefined') {
    module.exports.Slim = Slim;
  }
})();

