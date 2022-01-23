(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jsVectorMap = factory());
}(this, (function () { 'use strict';

  // Matches polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  } // Object.assign polyfill
  // https://gist.github.com/spiralx/68cf40d7010d829340cb


  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function value(target) {

        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);

        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];

          if (nextSource === undefined || nextSource === null) {
            continue;
          }

          nextSource = Object(nextSource);
          var keysArray = Object.keys(Object(nextSource));

          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }

        return to;
      }
    });
  }

  var eventRegistry = {};
  var eventUid = 1;
  /**
   * ------------------------------------------------------------------------
   * Event Handler
   * ------------------------------------------------------------------------
   */

  var EventHandler = {
    on: function on(element, event, handler, options) {
      if (options === void 0) {
        options = {};
      }

      var uid = "jvm:" + event + "::" + eventUid++;
      eventRegistry[uid] = {
        selector: element,
        handler: handler
      };
      handler._uid = uid;
      element.addEventListener(event, handler, options);
    },
    off: function off(element, event, handler) {
      var eventType = event.split(':')[1];
      element.removeEventListener(eventType, handler); // Remove reference

      delete eventRegistry[handler._uid];
    },
    getEventRegistry: function getEventRegistry() {
      return eventRegistry;
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   * This class was designed to handle one single element
   * since we don't need to select more than one element in this plugin
   */

  var DomHandler = /*#__PURE__*/function () {
    function DomHandler(selector) {
      if (selector instanceof Element) {
        this.selector = selector;
        return this;
      }

      this.selector = document.querySelector(selector);
      return this;
    }

    var _proto = DomHandler.prototype;

    _proto.on = function on(event, handler, options) {
      if (options === void 0) {
        options = {};
      }

      EventHandler.on(this.selector, event, handler, options);
      return this;
    };

    _proto.delegate = function delegate(selector, events, callback) {
      events = events.split(" ");

      for (var event in events) {
        this.on(events[event], function (e) {
          var target = e.target;
          if (target.matches(selector)) callback.call(target, e);
        });
      }
    };

    _proto.css = function css(properties) {
      for (var property in properties) {
        this.selector.style[property] = properties[property];
      }

      return this;
    };

    _proto.text = function text(string) {
      if (!string) {
        return this.selector.textContent;
      }

      this.selector.textContent = string;
      return this;
    };

    _proto.attr = function attr(_attr, value) {
      if (_attr && value) {
        this.selector.setAttribute(_attr, value);
        return this;
      }

      return this.selector.getAttribute(_attr);
    };

    _proto.addClass = function addClass(className) {
      if (this.selector.classList) {
        this.selector.classList.add(className);
        return this;
      } // Support IE9


      if (this.selector.className.split(" ").indexOf(className) == -1) {
        this.selector.className += " " + className;
      }

      return this;
    };

    _proto.append = function append(node) {
      this.selector.appendChild(node);
      return this;
    };

    _proto.show = function show() {
      this.css({
        display: 'block'
      });
    };

    _proto.hide = function hide() {
      this.css({
        display: 'none'
      });
    };

    _proto.height = function height() {
      return this.selector.offsetHeight;
    };

    _proto.width = function width() {
      return this.selector.offsetWidth;
    };

    return DomHandler;
  }();

  /**
   * By https://github.com/TehShrike/deepmerge
   */

  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };

  function isNonNullObject(value) {
    return !!value && typeof value === 'object';
  }

  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
  } // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
  }

  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function (element) {
      return cloneUnlessOtherwiseSpecified(element, options);
    });
  }

  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge;
    }

    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge;
  }

  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
      return target.propertyIsEnumerable(symbol);
    }) : [];
  }

  function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
  }

  function propertyIsOnObject(object, property) {
    try {
      return property in object;
    } catch (_) {
      return false;
    }
  } // Protects from prototype poisoning and unexpected merging up the prototype chain.


  function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
    && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
    && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
  }

  function mergeObject(target, source, options) {
    var destination = {};

    if (options.isMergeableObject(target)) {
      getKeys(target).forEach(function (key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }

    getKeys(source).forEach(function (key) {
      if (propertyIsUnsafe(target, key)) {
        return;
      }

      if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
        destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      }
    });
    return destination;
  }

  var deepmerge = function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.

    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options);
    } else {
      return mergeObject(target, source, options);
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {
    isImageUrl: function isImageUrl(url) {
      return /\.(jpg|gif|png)$/.test(url);
    },
    createElement: function createElement(type, classes, text, html) {
      if (html === void 0) {
        html = false;
      }

      var el = document.createElement(type);

      if (text) {
        el[!html ? 'textContent' : 'innerHTML'] = text;
      }

      if (classes) {
        el.className = classes;
      }

      return el;
    },
    removeElement: function removeElement(target) {
      target.parentNode.removeChild(target);
    },
    $: function $(selector) {
      return new DomHandler(selector);
    },
    hyphenate: function hyphenate(string) {
      return string.replace(/[\w]([A-Z])/g, function (m) {
        return m[0] + "-" + m[1];
      }).toLowerCase();
    },
    isFunc: function isFunc(fn) {
      return typeof fn === 'function';
    },
    isObj: function isObj(obj) {
      return typeof obj === 'object';
    },
    isStr: function isStr(str) {
      return typeof str === 'string';
    },
    isArr: function isArr(array) {
      return Array.isArray(array);
    },
    merge: function merge(target, source) {
      return Object.assign(target, source);
    },
    mergeDeeply: function mergeDeeply(target, source) {
      return deepmerge(target, source);
    },
    keys: function keys(object) {
      return Object.keys(object);
    }
  };

  var Defaults = {
    map: 'world',
    backgroundColor: 'tranparent',
    draggable: true,
    zoomButtons: true,
    zoomOnScroll: true,
    zoomOnScrollSpeed: 3,
    zoomMax: 12,
    zoomMin: 1,
    zoomAnimate: true,
    showTooltip: true,
    zoomStep: 1.5,
    bindTouchEvents: true,

    /**
     * Lines options
     */
    lineStyle: {
      stroke: '#808080',
      strokeWidth: 1,
      strokeLinecap: 'round'
    },

    /**
     * Markers options
     */
    markersSelectable: false,
    markersSelectableOne: false,
    markerStyle: {
      // Marker style
      initial: {
        r: 7,
        fill: '#374151',
        fillOpacity: 1,
        stroke: '#FFF',
        strokeWidth: 5,
        strokeOpacity: .5
      },
      hover: {
        fill: '#3cc0ff',
        cursor: 'pointer'
      },
      selected: {
        fill: 'blue'
      },
      selectedHover: {}
    },
    // Marker Label style
    markerLabelStyle: {
      initial: {
        fontFamily: 'Verdana',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'default',
        fill: '#374151'
      },
      hover: {
        cursor: 'pointer'
      },
      selected: {},
      selectedHover: {}
    },

    /**
     * Region style
     */
    regionsSelectable: false,
    regionsSelectableOne: false,
    regionStyle: {
      initial: {
        fill: '#dee2e8',
        fillOpacity: 1,
        stroke: 'none',
        strokeWidth: 0
      },
      hover: {
        fillOpacity: .7,
        cursor: 'pointer'
      },
      selected: {
        fill: '#9ca3af'
      },
      selectedHover: {}
    },
    // Region label style
    regionLabelStyle: {
      initial: {
        fontFamily: 'Verdana',
        fontSize: '12',
        fontWeight: 'bold',
        cursor: 'default',
        fill: '#35373e'
      },
      hover: {
        cursor: 'pointer'
      }
    }
  };

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var SVGElement = /*#__PURE__*/function () {
    function SVGElement(name, config) {
      this._name = name;
      this.node = this.createElement(name);

      if (config) {
        this.set(config);
      }
    } // Create new SVG element `svg`, `g`, `path`, `line`, `circle`, `image`, etc.
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris


    var _proto = SVGElement.prototype;

    _proto.createElement = function createElement(tagName) {
      return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    };

    _proto.addClass = function addClass(className) {
      this.node.setAttribute('class', className);
    };

    _proto.getBBox = function getBBox() {
      return this.node.getBBox();
    } // Apply attributes on the current node element
    ;

    _proto.set = function set(property, value) {
      if (Util.isObj(property)) {
        for (var attr in property) {
          this.applyAttr(attr, property[attr]);
        }
      } else {
        this.applyAttr(property, value);
      }
    };

    _proto.get = function get(property) {
      return this.style.initial[property];
    };

    _proto.applyAttr = function applyAttr(property, value) {
      this.node.setAttribute(Util.hyphenate(property), value);
    };

    _proto.remove = function remove() {
      this.node.parentNode.removeChild(this.node);
    };

    return SVGElement;
  }();

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var SVGShapeElement = /*#__PURE__*/function (_SVGElement) {
    _inheritsLoose(SVGShapeElement, _SVGElement);

    function SVGShapeElement(name, config, style) {
      var _this;

      if (style === void 0) {
        style = {};
      }

      _this = _SVGElement.call(this, name, config) || this;
      _this.isHovered = false;
      _this.isSelected = false;
      _this.style = style;
      _this.style.current = {};

      _this.updateStyle();

      return _this;
    }

    var _proto = SVGShapeElement.prototype;

    _proto.setStyle = function setStyle(property, value) {
      if (Util.isObj(property)) {
        Util.merge(this.style.current, property);
      } else {
        var _Util$merge;

        Util.merge(this.style.current, (_Util$merge = {}, _Util$merge[property] = value, _Util$merge));
      }

      this.updateStyle();
    };

    _proto.updateStyle = function updateStyle() {
      var attrs = {};
      Util.merge(attrs, this.style.initial);
      Util.merge(attrs, this.style.current);

      if (this.isHovered) {
        Util.merge(attrs, this.style.hover);
      }

      if (this.isSelected) {
        Util.merge(attrs, this.style.selected);

        if (this.isHovered) {
          Util.merge(attrs, this.style.selectedHover);
        }
      }

      this.set(attrs);
    };

    return SVGShapeElement;
  }(SVGElement);

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var SVGTextElement = /*#__PURE__*/function (_SVGShapeElement) {
    _inheritsLoose(SVGTextElement, _SVGShapeElement);

    function SVGTextElement(config, style) {
      return _SVGShapeElement.call(this, 'text', config, style) || this;
    }

    var _proto = SVGTextElement.prototype;

    _proto.applyAttr = function applyAttr(attr, value) {
      attr === 'text' ? this.node.textContent = value : _SVGShapeElement.prototype.applyAttr.call(this, attr, value);
    };

    return SVGTextElement;
  }(SVGShapeElement);

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var SVGImageElement = /*#__PURE__*/function (_SVGShapeElement) {
    _inheritsLoose(SVGImageElement, _SVGShapeElement);

    function SVGImageElement(config, style) {
      return _SVGShapeElement.call(this, 'image', config, style) || this;
    }

    var _proto = SVGImageElement.prototype;

    _proto.applyAttr = function applyAttr(attr, value) {
      var imageUrl;

      if (attr === 'image') {
        // This get executed when we have url in series.markers[0].scale.someScale.url
        if (Util.isObj(value)) {
          imageUrl = value.url;
          this.offset = value.offset || [0, 0];
        } else {
          imageUrl = value;
          this.offset = [0, 0];
        }

        this.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageUrl); // Set width and height then call this `applyAttr` again

        this.width = 23;
        this.height = 23;
        this.applyAttr('width', this.width);
        this.applyAttr('height', this.height);
        this.applyAttr('x', this.cx - this.width / 2 + this.offset[0]);
        this.applyAttr('y', this.cy - this.height / 2 + this.offset[1]);
      } else if (attr == 'cx') {
        this.cx = value;

        if (this.width) {
          this.applyAttr('x', value - this.width / 2 + this.offset[0]);
        }
      } else if (attr == 'cy') {
        this.cy = value;

        if (this.height) {
          this.applyAttr('y', value - this.height / 2 + this.offset[1]);
        }
      } else {
        // This time Call SVGElement
        _SVGShapeElement.prototype.applyAttr.apply(this, arguments);
      }
    };

    return SVGImageElement;
  }(SVGShapeElement);

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var SVGCanvasElement = /*#__PURE__*/function (_SVGElement) {
    _inheritsLoose(SVGCanvasElement, _SVGElement);

    function SVGCanvasElement(container) {
      var _this;

      _this = _SVGElement.call(this, 'svg') || this; // Create svg element for holding the whole map

      _this._container = container; // Create the defs element

      _this._defsElement = new SVGElement('defs'); // Create group element which will hold the paths (regions)

      _this._rootElement = new SVGElement('g', {
        id: 'jvm-regions-group'
      }); // Append the defs element to the this.node (SVG tag)

      _this.node.appendChild(_this._defsElement.node); // Append the group to this.node (SVG tag)


      _this.node.appendChild(_this._rootElement.node); // Append this.node (SVG tag) to the container


      _this._container.append(_this.node);

      return _this;
    }

    var _proto = SVGCanvasElement.prototype;

    _proto.setSize = function setSize(width, height) {
      this.node.setAttribute('width', width);
      this.node.setAttribute('height', height);
    };

    _proto.applyTransformParams = function applyTransformParams(scale, transX, transY) {
      this._rootElement.node.setAttribute('transform', "scale(" + scale + ") translate(" + transX + ", " + transY + ")");
    } // Create `path` element
    ;

    _proto.createPath = function createPath(config, style) {
      var el = new SVGShapeElement('path', config, style);
      el.node.setAttribute('fill-rule', 'evenodd');
      return this.add(el);
    } // Create `circle` element
    ;

    _proto.createCircle = function createCircle(config, style, group) {
      var el = new SVGShapeElement('circle', config, style);
      return this.add(el, group);
    } // Create `line` element
    ;

    _proto.createLine = function createLine(config, style, group) {
      var el = new SVGShapeElement('line', config, style);
      return this.add(el, group);
    } // Create `text` element
    ;

    _proto.createText = function createText(config, style, group) {
      var el = new SVGTextElement(config, style); // extends SVGShapeElement

      return this.add(el, group);
    } // Create `image` element
    ;

    _proto.createImage = function createImage(config, style, group) {
      var el = new SVGImageElement(config, style); // extends SVGShapeElement

      return this.add(el, group);
    } // Create `g` element
    ;

    _proto.createGroup = function createGroup(id) {
      var el = new SVGElement('g');
      this.node.appendChild(el.node);

      if (id) {
        el.node.id = id;
      }

      el.canvas = this;
      return el;
    } // Add some element to a spcific group or the root element if the group isn't given
    ;

    _proto.add = function add(element, group) {
      group = group || this._rootElement;
      group.node.appendChild(element.node); // element.canvas = this

      return element;
    };

    return SVGCanvasElement;
  }(SVGElement);

  function handleContainerEvents() {
    var _this = this;

    var mouseDown = false,
        oldPageX,
        oldPageY,
        map = this;

    if (this.params.draggable) {
      this.container.on('mousemove', function (e) {
        if (mouseDown) {
          map.transX -= (oldPageX - e.pageX) / map.scale;
          map.transY -= (oldPageY - e.pageY) / map.scale;
          map.applyTransform();
          oldPageX = e.pageX;
          oldPageY = e.pageY;
          _this.isBeingDragged = true;
        }

        return false;
      }).on('mousedown', function (e) {
        mouseDown = true;
        oldPageX = e.pageX;
        oldPageY = e.pageY;
        return false;
      });
      Util.$('body').on('mouseup', function () {
        mouseDown = false;
      });
    }

    if (this.params.zoomOnScroll) {
      this.container.on('wheel', function (event) {
        var deltaY = 0;
        deltaY = (event.deltaY || -event.wheelDelta || event.detail) >> 10 || 1;
        deltaY = deltaY * 75;

        var rect = _this.container.selector.getBoundingClientRect(),
            offsetX = event.pageX - rect.left - window.pageXOffset,
            offsetY = event.pageY - rect.top - window.pageYOffset,
            zoomStep = Math.pow(1 + map.params.zoomOnScrollSpeed / 1000, -1.5 * deltaY);

        if (map.tooltip) {
          map.tooltip.hide();
        }

        map.setScale(map.scale * zoomStep, offsetX, offsetY);
      }, {
        // https://www.chromestatus.com/feature/5745543795965952
        passive: true
      });
    }
  }

  function parseEvent(map, selector, isTooltip) {
    var ele = Util.$(selector),
        elClassList = ele.attr('class'),
        type = elClassList.indexOf('jvm-region') === -1 ? 'marker' : 'region',
        code = type === 'region' ? ele.attr('data-code') : ele.attr('data-index'),
        event = type + ":selected"; // Init tooltip event

    if (isTooltip) {
      event = type + ".tooltip:show";
    }

    return {
      event: event,
      type: type,
      code: code,
      element: type === 'region' ? map.regions[code].element : map.markers[code].element,
      tooltipText: type === 'region' ? map.mapData.paths[code].name || '' : map.markers[code].config.name || ''
    };
  }

  function handleElementEvents() {
    var _this = this;

    var map = this;
    this.container.delegate('.jvm-element', 'mousedown', function () {
      _this.isBeingDragged = false;
    }); // When the mouse is over the region/marker | When the mouse is out the region/marker

    this.container.delegate('.jvm-element', 'mouseover mouseout', function (event) {
      var data = parseEvent(map, this, true);
      var showTooltip = map.params.showTooltip;

      if (event.type === 'mouseover') {
        var defaultPrevented = event.defaultPrevented;

        if (!defaultPrevented) {
          data.element.hover(true);

          if (showTooltip) {
            map.tooltip.text(data.tooltipText);
            map.tooltip.show();
            map.emit(data.event, [map.tooltip, data.code]);
          }
        }
      } else {
        data.element.hover(false);

        if (showTooltip) {
          map.tooltip.hide();
        }
      }
    }); // When the click is released

    this.container.delegate('.jvm-element', 'mouseup', function (event) {
      var data = parseEvent(map, this);

      if (map.isBeingDragged || event.defaultPrevented) {
        return;
      }

      if (data.type === 'region' && map.params.regionsSelectable || data.type === 'marker' && map.params.markersSelectable) {
        var ele = data.element; // We're checking if regions/markers|SelectableOne option is presented

        if (map.params[data.type + "sSelectableOne"]) {
          map.clearSelected(data.type + "s");
        }

        if (data.element.isSelected) {
          ele.select(false);
        } else {
          ele.select(true);
        }

        map.emit(data.event, [data.code, ele.isSelected, map.getSelected(data.type + "s")]);
      }
    });
  }

  function handleZoomButtons() {
    var _this = this;

    var map = this;
    var zoomin = Util.createElement('div', 'jvm-zoom-btn jvm-zoomin', '&#43;', true);
    var zoomout = Util.createElement('div', 'jvm-zoom-btn jvm-zoomout', '&#x2212', true);
    this.container.append(zoomin).append(zoomout);
    EventHandler.on(zoomin, 'click', function () {
      _this.setScale(map.scale * map.params.zoomStep, map.width / 2, map.height / 2, false, map.params.zoomAnimate);
    });
    EventHandler.on(zoomout, 'click', function () {
      _this.setScale(map.scale / map.params.zoomStep, map.width / 2, map.height / 2, false, map.params.zoomAnimate);
    });
  }

  function bindContainerTouchEvents() {
    var map = this,
        touchStartScale,
        touchStartDistance,
        touchX,
        touchY,
        centerTouchX,
        centerTouchY,
        lastTouchesLength;

    var handleTouchEvent = function handleTouchEvent(e) {
      var touches = e.touches,
          offset,
          scale,
          transXOld,
          transYOld;

      if (e.type == 'touchstart') {
        lastTouchesLength = 0;
      }

      if (touches.length == 1) {
        if (lastTouchesLength == 1) {
          transXOld = map.transX;
          transYOld = map.transY;
          map.transX -= (touchX - touches[0].pageX) / map.scale;
          map.transY -= (touchY - touches[0].pageY) / map.scale;
          map.tooltip.hide();
          map.applyTransform();

          if (transXOld != map.transX || transYOld != map.transY) {
            e.preventDefault();
          }
        }

        touchX = touches[0].pageX;
        touchY = touches[0].pageY;
      } else if (touches.length == 2) {
        if (lastTouchesLength == 2) {
          scale = Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2)) / touchStartDistance;
          map.setScale(touchStartScale * scale, centerTouchX, centerTouchY);
          map.tooltip.hide();
          e.preventDefault();
        } else {
          var rect = map.container.selector.getBoundingClientRect();
          offset = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
          };

          if (touches[0].pageX > touches[1].pageX) {
            centerTouchX = touches[1].pageX + (touches[0].pageX - touches[1].pageX) / 2;
          } else {
            centerTouchX = touches[0].pageX + (touches[1].pageX - touches[0].pageX) / 2;
          }

          if (touches[0].pageY > touches[1].pageY) {
            centerTouchY = touches[1].pageY + (touches[0].pageY - touches[1].pageY) / 2;
          } else {
            centerTouchY = touches[0].pageY + (touches[1].pageY - touches[0].pageY) / 2;
          }

          centerTouchX -= offset.left;
          centerTouchY -= offset.top;
          touchStartScale = map.scale;
          touchStartDistance = Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
        }
      }

      lastTouchesLength = touches.length;
    };

    this.container.on('touchstart', handleTouchEvent).on('touchmove', handleTouchEvent);
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition ( Abstract )
   * ------------------------------------------------------------------------
   */

  var MapElement = /*#__PURE__*/function () {
    function MapElement() {}

    var _proto = MapElement.prototype;

    _proto.getLabelText = function getLabelText(key, label) {
      if (!label) {
        return;
      }

      if (Util.isFunc(label.render)) {
        var params = []; // Pass additional paramater (Marker config object) in case it's a Marker.

        if (this.config.marker) {
          params.push(this.config.marker);
        } // Becuase we need to add the key always at the end


        params.push(key);
        return label.render.apply(this, params);
      }

      return key;
    };

    _proto.getLabelOffsets = function getLabelOffsets(key, label) {
      if (Util.isFunc(label.offsets)) {
        return label.offsets(key);
      } // If offsets are an array of offsets e.g offsets: [ [0, 25], [10, 15] ]


      if (Util.isArr(label.offsets)) {
        return label.offsets[key];
      }

      return [0, 0];
    };

    _proto.setStyle = function setStyle(property, value) {
      this.shape.setStyle(property, value);
    };

    _proto.remove = function remove() {
      this.shape.remove();
      if (this.label) this.label.remove();
    };

    _proto.hover = function hover(state) {
      this._setStatus('isHovered', state);
    };

    _proto.select = function select(state) {
      this._setStatus('isSelected', state);
    } // Private
    ;

    _proto._setStatus = function _setStatus(property, state) {
      this.shape[property] = state;
      this.shape.updateStyle();
      this[property] = state;

      if (this.label) {
        this.label[property] = state;
        this.label.updateStyle();
      }
    };

    return MapElement;
  }();

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Region = /*#__PURE__*/function (_MapElement) {
    _inheritsLoose(Region, _MapElement);

    function Region(_ref) {
      var _this;

      var map = _ref.map,
          code = _ref.code,
          path = _ref.path,
          style = _ref.style,
          label = _ref.label,
          labelStyle = _ref.labelStyle,
          labelsGroup = _ref.labelsGroup;
      _this = _MapElement.call(this) || this;
      _this.config = arguments[0];
      _this.canvas = map.canvas;
      _this.map = map;
      _this.shape = _this.canvas.createPath({
        d: path,
        dataCode: code
      }, style);

      _this.shape.addClass('jvm-region jvm-element');

      var bbox = _this.shape.getBBox(),
          text = _this.getLabelText(code, label); // If label is passed and render function returns something 


      if (label && text) {
        var offsets = _this.getLabelOffsets(code);

        _this.labelX = bbox.x + bbox.width / 2 + offsets[0];
        _this.labelY = bbox.y + bbox.height / 2 + offsets[1];
        _this.label = _this.canvas.createText({
          text: text,
          textAnchor: 'middle',
          alignmentBaseline: 'central',
          dataCode: code,
          x: _this.labelX,
          y: _this.labelY
        }, labelStyle, labelsGroup);

        _this.label.addClass('jvm-region jvm-element');
      }

      return _this;
    }

    var _proto = Region.prototype;

    _proto.updateLabelPosition = function updateLabelPosition() {
      if (this.label) {
        this.label.set({
          x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
          y: this.labelY * this.map.scale + this.map.transY * this.map.scale
        });
      }
    };

    return Region;
  }(MapElement);

  function createRegions() {
    var code, region;
    this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.createGroup('jvm-regions-labels-group');

    for (code in this.mapData.paths) {
      region = new Region({
        map: this,
        code: code,
        path: this.mapData.paths[code].path,
        style: Util.merge({}, this.params.regionStyle),
        labelStyle: this.params.regionLabelStyle,
        labelsGroup: this.regionLabelsGroup,
        label: this.params.labels && this.params.labels.regions
      });
      this.regions[code] = {
        config: this.mapData.paths[code],
        element: region
      };
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Line = /*#__PURE__*/function (_MapElement) {
    _inheritsLoose(Line, _MapElement);

    function Line(_ref) {
      var _this;

      var index = _ref.index,
          map = _ref.map,
          style = _ref.style,
          x1 = _ref.x1,
          y1 = _ref.y1,
          x2 = _ref.x2,
          y2 = _ref.y2,
          group = _ref.group;
      _this = _MapElement.call(this) || this;
      _this.shape = map.canvas.createLine({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        dataIndex: index
      }, style, group);

      _this.shape.addClass('jvm-line');

      return _this;
    }

    return Line;
  }(MapElement);

  function createLineUid(from, to) {
    return from.toLowerCase() + ":to:" + to.toLowerCase();
  }

  function createLines(lines, markers, isRecentlyCreated) {
    var _this = this;

    if (isRecentlyCreated === void 0) {
      isRecentlyCreated = false;
    }

    var line,
        point1 = false,
        point2 = false; // Create group for holding lines
    // we're checking if `linesGroup` exists or not becuase we may add lines after the map has loaded
    // so we will append the futured lines to this group as well.

    this.linesGroup = this.linesGroup || this.canvas.createGroup('jvm-lines-group');

    for (var index in lines) {
      var lineConfig = lines[index];

      for (var mindex in markers) {
        var markerConfig = isRecentlyCreated ? markers[mindex].config : markers[mindex];

        if (markerConfig.name === lineConfig.from) {
          point1 = this.getMarkerPosition(markerConfig);
        }

        if (markerConfig.name === lineConfig.to) {
          point2 = this.getMarkerPosition(markerConfig);
        }
      }

      if (point1 !== false && point2 !== false) {
        line = new Line({
          index: index,
          map: this,
          // Merge the lineStyle object with the line config style
          style: Util.mergeDeeply({
            initial: this.params.lineStyle
          }, {
            initial: lineConfig.style || {}
          }),
          x1: point1.x,
          y1: point1.y,
          x2: point2.x,
          y2: point2.y,
          group: this.linesGroup
        }); // Prevent line duplication elements in the DOM

        if (isRecentlyCreated) {
          Object.keys(this.lines).forEach(function (key) {
            if (key === createLineUid(lines[0].from, lines[0].to)) {
              _this.lines[key].element.remove();
            }
          });
        } // Register lines with unique keys


        this.lines[createLineUid(lineConfig.from, lineConfig.to)] = {
          element: line,
          config: lineConfig
        };
      }
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Marker = /*#__PURE__*/function (_MapElement) {
    _inheritsLoose(Marker, _MapElement);

    function Marker(_ref) {
      var _this;

      var index = _ref.index,
          style = _ref.style,
          label = _ref.label,
          cx = _ref.cx,
          cy = _ref.cy,
          map = _ref.map,
          group = _ref.group;
      _this = _MapElement.call(this) || this; // Private

      _this._map = map;
      _this._isImage = !!style.initial.image; // Protected

      _this.config = arguments[0];
      _this.shape = map.canvas[_this._isImage ? 'createImage' : 'createCircle']({
        dataIndex: index,
        cx: cx,
        cy: cy
      }, _this._getStyle(), group);

      _this.shape.addClass('jvm-marker jvm-element');

      if (_this._isImage) {
        _this.updateLabelPosition();
      }

      if (label) {
        _this._createLabel(_this.config);
      }

      return _this;
    }

    var _proto = Marker.prototype;

    _proto.updateLabelPosition = function updateLabelPosition() {
      if (this.label) {
        this.label.set({
          x: this._labelX * this._map.scale + this._offsets[0] + this._map.transX * this._map.scale + 5 + (this._isImage ? (this.shape.width || 0) / 2 : this.shape.node.r.baseVal.value),
          y: this._labelY * this._map.scale + this._map.transY * this._map.scale + this._offsets[1]
        });
      }
    };

    _proto._createLabel = function _createLabel(_ref2) {
      var index = _ref2.index,
          map = _ref2.map,
          label = _ref2.label,
          labelsGroup = _ref2.labelsGroup,
          cx = _ref2.cx,
          cy = _ref2.cy,
          marker = _ref2.marker,
          isRecentlyCreated = _ref2.isRecentlyCreated;
      var labelText = this.getLabelText(index, label);
      this._labelX = cx / map.scale - map.transX;
      this._labelY = cy / map.scale - map.transY;
      this._offsets = isRecentlyCreated && marker.offsets ? marker.offsets : this.getLabelOffsets(index, label);
      this.label = map.canvas.createText({
        text: labelText,
        dataIndex: index,
        x: this._labelX,
        y: this._labelY,
        dy: "0.6ex"
      }, map.params.markerLabelStyle, labelsGroup);
      this.label.addClass('jvm-marker jvm-element');

      if (isRecentlyCreated) {
        this.updateLabelPosition();
      }
    };

    _proto._getStyle = function _getStyle() {
      var style = {};

      if (this._isImage) {
        style.initial = {
          image: this.config.style.initial.image
        };
      } else {
        style = this.config.style;
      }

      return style;
    };

    return Marker;
  }(MapElement);

  function createMarkers(markers, isRecentlyCreated) {
    var _this = this;

    if (markers === void 0) {
      markers = {};
    }

    if (isRecentlyCreated === void 0) {
      isRecentlyCreated = false;
    }

    var markerConfig, marker, point, uid; // Create groups for holding markers and markers labels
    // We're checking if `markersGroup` exists or not becuase we may add markers after the map has loaded
    // So we will append the futured markers to this group as well.

    this.markersGroup = this.markersGroup || this.canvas.createGroup('jvm-markers-group');
    this.markerLabelsGroup = this.markerLabelsGroup || this.canvas.createGroup('jvm-markers-labels-group');

    for (var index in markers) {
      markerConfig = markers[index];
      point = this.getMarkerPosition(markerConfig);
      uid = markerConfig.coords.join(':'); // We're checking if recently created marker is already existed
      // If exists we don't need to create it again, so we'll continute
      // Becuase we may have more than one marker.

      if (isRecentlyCreated) {
        if (Util.keys(this.markers).filter(function (i) {
          return _this.markers[i]._uid === uid;
        }).length) {
          continue;
        }

        index = Util.keys(this.markers).length;
      }

      if (point !== false) {
        marker = new Marker({
          index: index,
          map: this,
          // Merge the `markerStyle` object with the marker config `style` if presented.
          style: Util.mergeDeeply(this.params.markerStyle, {
            initial: markerConfig.style || {}
          }),
          label: this.params.labels && this.params.labels.markers,
          labelsGroup: this.markerLabelsGroup,
          cx: point.x,
          cy: point.y,
          group: this.markersGroup,
          marker: markerConfig,
          // @TODO: this may be a little bit complicated :(
          // When adding a new marker by `addMarker` method and labels.markers.render() key exists
          // the render function may returns something like that: return markers[name].name;
          // it will throw an error and the label won't be shown: this was created to solve showing the label
          isRecentlyCreated: isRecentlyCreated
        }); // Check for marker duplication
        // this is useful when for example: a user clicks a button for creating marker two times
        // so it will remove the old one and the new one will take its place.

        if (this.markers[index]) {
          this.removeMarkers([index]);
        }

        this.markers[index] = {
          _uid: uid,
          config: markerConfig,
          element: marker
        };
      }
    }
  }

  function createTooltip() {
    var _this = this;

    var tooltip = Util.createElement('div', 'jvm-tooltip');
    this.tooltip = Util.$(document.body.appendChild(tooltip));
    this.container.on('mousemove', function (event) {
      if (_this.tooltip.selector.style.display === 'block') {
        var container = _this.container.selector.querySelector('#jvm-regions-group').getBoundingClientRect();

        var space = 5; // Space between the cursor and tooltip element
        // Tooltip

        var _tooltip$getBoundingC = tooltip.getBoundingClientRect(),
            height = _tooltip$getBoundingC.height,
            width = _tooltip$getBoundingC.width;

        var topIsPassed = event.clientY <= container.top + height + space;
        var top = event.pageY - height - space;
        var left = event.pageX - width - space; // Ensure the tooltip will never cross outside the canvas area(map)

        if (topIsPassed) {
          // Top:
          top += height + space; // The cursor is a bit larger from left side

          left -= space * 2;
        }

        if (event.clientX < container.left + width + space) {
          // Left:
          left = event.pageX + space + 2;

          if (topIsPassed) {
            left += space * 2;
          }
        }

        _this.tooltip.css({
          top: top + "px",
          left: left + "px"
        });
      }
    });
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Legend = /*#__PURE__*/function () {
    function Legend(options) {
      if (options === void 0) {
        options = {};
      }

      this._options = options;
      this._map = this._options.map;
      this._series = this._options.series;
      this._body = Util.createElement('div', 'jvm-legend');

      if (this._options.cssClass) {
        this._body.setAttribute('class', this._options.cssClass);
      }

      if (options.vertical) {
        this._map.legendVertical.appendChild(this._body);
      } else {
        this._map.legendHorizontal.appendChild(this._body);
      }

      this.render();
    }

    var _proto = Legend.prototype;

    _proto.render = function render() {
      var ticks = this._series.scale.getTicks(),
          inner = Util.createElement('div', 'jvm-legend-inner'),
          tick,
          sample,
          label;

      this._body.innderHTML = '';

      if (this._options.title) {
        var legendTitle = Util.createElement('div', 'jvm-legend-title', this._options.title);

        this._body.appendChild(legendTitle);
      }

      this._body.appendChild(inner);

      for (var i = 0; i < ticks.length; i++) {
        tick = Util.createElement('div', 'jvm-legend-tick');
        sample = Util.createElement('div', 'jvm-legend-tick-sample');

        switch (this._series.config.attribute) {
          case 'fill':
            if (Util.isImageUrl(ticks[i].value)) {
              sample.style.background = "url(" + ticks[i].value + ")";
            } else {
              sample.style.background = ticks[i].value;
            }

            break;

          case 'stroke':
            sample.style.background = ticks[i].value;
            break;

          case 'image':
            sample.style.background = "url(" + (Util.isObj(ticks[i].value) ? ticks[i].value.url : ticks[i].value) + ") no-repeat center center";
            sample.style.backgroundSize = 'cover';
            break;
        }

        tick.appendChild(sample);
        label = ticks[i].label;

        if (this._options.labelRender) {
          label = this._options.labelRender(label);
        }

        var tickText = Util.createElement('div', 'jvm-legend-tick-text', label);
        tick.appendChild(tickText);
        inner.appendChild(tick);
      }
    };

    return Legend;
  }();

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  var OrdinalScale = /*#__PURE__*/function () {
    function OrdinalScale(scale) {
      this._scale = scale;
    }

    var _proto = OrdinalScale.prototype;

    _proto.getValue = function getValue(value) {
      return this._scale[value];
    };

    _proto.getTicks = function getTicks() {
      var ticks = [];

      for (var key in this._scale) {
        ticks.push({
          label: key,
          value: this._scale[key]
        });
      }

      return ticks;
    };

    return OrdinalScale;
  }();

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Series = /*#__PURE__*/function () {
    function Series(config, elements, map) {
      if (config === void 0) {
        config = {};
      }

      // Private
      this._map = map;
      this._elements = elements; // Could be markers or regions

      this._values = config.values || {}; // Protected

      this.config = config;
      this.config.attribute = config.attribute || 'fill'; // Set initial attributes

      if (config.attributes) {
        this.setAttributes(config.attributes);
      }

      if (Util.isObj(config.scale)) {
        this.scale = new OrdinalScale(config.scale);
      }

      if (this.config.legend) {
        this.legend = new Legend(Util.merge({
          map: this._map,
          series: this
        }, this.config.legend));
      }

      this.setValues(this._values);
    }

    var _proto = Series.prototype;

    _proto.setValues = function setValues(values) {
      var attrs = {};

      for (var key in values) {
        if (values[key]) {
          attrs[key] = this.scale.getValue(values[key]);
        }
      }

      this.setAttributes(attrs);
    };

    _proto.setAttributes = function setAttributes(attrs) {
      for (var code in attrs) {
        if (this._elements[code]) {
          this._elements[code].element.setStyle(this.config.attribute, attrs[code]);
        }
      }
    };

    _proto.clear = function clear() {
      var key,
          attrs = {};

      for (key in this._values) {
        if (this._elements[key]) {
          attrs[key] = this._elements[key].element.shape.style.initial[this.config.attribute];
        }
      }

      this.setAttributes(attrs);
      this._values = {};
    };

    return Series;
  }();

  function createSeries() {
    this.series = {
      markers: [],
      regions: []
    };

    for (var key in this.params.series) {
      for (var i = 0; i < this.params.series[key].length; i++) {
        this.series[key][i] = new Series(this.params.series[key][i], this[key], this);
      }
    }
  }

  function applyTransform() {
    var maxTransX, maxTransY, minTransX, minTransY;

    if (this.defaultWidth * this.scale <= this.width) {
      maxTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
      minTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
    } else {
      maxTransX = 0;
      minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
    }

    if (this.defaultHeight * this.scale <= this.height) {
      maxTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
      minTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
    } else {
      maxTransY = 0;
      minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
    }

    if (this.transY > maxTransY) {
      this.transY = maxTransY;
    } else if (this.transY < minTransY) {
      this.transY = minTransY;
    }

    if (this.transX > maxTransX) {
      this.transX = maxTransX;
    } else if (this.transX < minTransX) {
      this.transX = minTransX;
    }

    this.canvas.applyTransformParams(this.scale, this.transX, this.transY);

    if (this.markers) {
      this.repositionMarkers();
    }

    if (this.lines) {
      this.repositionLines();
    }

    this.repositionLabels();
  }

  function setFocus(config) {
    var _this = this;

    if (config === void 0) {
      config = {};
    }

    var bbox,
        codes = [];

    if (config.region) {
      codes.push(config.region);
    } else if (config.regions) {
      codes = config.regions;
    }

    if (codes.length) {
      codes.forEach(function (code) {
        if (_this.regions[code]) {
          var itemBbox = _this.regions[code].element.shape.getBBox();

          if (itemBbox) {
            // Handle the first loop
            if (typeof bbox == 'undefined') {
              bbox = itemBbox;
            } else {
              // get the old bbox properties plus the current
              // this kinda incrementing the old values and the new values
              bbox = {
                x: Math.min(bbox.x, itemBbox.x),
                y: Math.min(bbox.y, itemBbox.y),
                width: Math.max(bbox.x + bbox.width, itemBbox.x + itemBbox.width) - Math.min(bbox.x, itemBbox.x),
                height: Math.max(bbox.y + bbox.height, itemBbox.y + itemBbox.height) - Math.min(bbox.y, itemBbox.y)
              };
            }
          }
        }
      });
      return this.setScale(Math.min(this.width / bbox.width, this.height / bbox.height), -(bbox.x + bbox.width / 2), -(bbox.y + bbox.height / 2), true, config.animate);
    } else if (config.coords) {
      var point = this.coordsToPoint(config.coords[0], config.coords[1]);
      var x = this.transX - point.x / this.scale;
      var y = this.transY - point.y / this.scale;
      return this.setScale(config.scale * this.baseScale, x, y, true, config.animate);
    }
  }

  function resize() {
    var curBaseScale = this.baseScale;

    if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
      this.baseScale = this.height / this.defaultHeight;
      this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale);
    } else {
      this.baseScale = this.width / this.defaultWidth;
      this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale);
    }

    this.scale *= this.baseScale / curBaseScale;
    this.transX *= this.baseScale / curBaseScale;
    this.transY *= this.baseScale / curBaseScale;
  }

  function setScale(scale, anchorX, anchorY, isCentered, animate) {
    var _this = this;

    var zoomStep,
        interval,
        i = 0,
        count = Math.abs(Math.round((scale - this.scale) * 60 / Math.max(scale, this.scale))),
        scaleStart,
        scaleDiff,
        transXStart,
        transXDiff,
        transYStart,
        transYDiff,
        transX,
        transY;

    if (scale > this.params.zoomMax * this.baseScale) {
      scale = this.params.zoomMax * this.baseScale;
    } else if (scale < this.params.zoomMin * this.baseScale) {
      scale = this.params.zoomMin * this.baseScale;
    }

    if (typeof anchorX != 'undefined' && typeof anchorY != 'undefined') {
      zoomStep = scale / this.scale;

      if (isCentered) {
        transX = anchorX + this.defaultWidth * (this.width / (this.defaultWidth * scale)) / 2;
        transY = anchorY + this.defaultHeight * (this.height / (this.defaultHeight * scale)) / 2;
      } else {
        transX = this.transX - (zoomStep - 1) / scale * anchorX;
        transY = this.transY - (zoomStep - 1) / scale * anchorY;
      }
    }

    if (animate && count > 0) {
      scaleStart = this.scale;
      scaleDiff = (scale - scaleStart) / count;
      transXStart = this.transX * this.scale;
      transYStart = this.transY * this.scale;
      transXDiff = (transX * scale - transXStart) / count;
      transYDiff = (transY * scale - transYStart) / count;
      interval = setInterval(function () {
        i += 1;
        _this.scale = scaleStart + scaleDiff * i;
        _this.transX = (transXStart + transXDiff * i) / _this.scale;
        _this.transY = (transYStart + transYDiff * i) / _this.scale;

        _this.applyTransform();

        if (i == count) {
          clearInterval(interval);

          _this.emit('viewport:changed', [_this.scale, _this.transX, _this.transY]);
        }
      }, 10);
    } else {
      this.transX = transX;
      this.transY = transY;
      this.scale = scale;
      this.applyTransform();
      this.emit('viewport:changed', [this.scale, this.transX, this.transY]);
    }
  }

  function updateSize() {
    this.width = this.container.width();
    this.height = this.container.height();
    this.resize();
    this.canvas.setSize(this.width, this.height);
    this.applyTransform();
  }

  /**
   * ------------------------------------------------------------------------
   * Object
   * ------------------------------------------------------------------------
   */
  var Proj = {
    /* sgn(n){
      if (n > 0) {
        return 1;
      } else if (n < 0) {
        return -1;
      } else {
        return n;
      }
    }, */
    mill: function mill(lat, lng, c) {
      return {
        x: this.radius * (lng - c) * this.radDeg,
        y: -this.radius * Math.log(Math.tan((45 + 0.4 * lat) * this.radDeg)) / 0.8
      };
    },

    /* mill_inv(x, y, c) {
      return {
        lat: (2.5 * Math.atan(Math.exp(0.8 * y / this.radius)) - 5 * Math.PI / 8) * this.degRad,
        lng: (c * this.radDeg + x / this.radius) * this.degRad
      };
    }, */
    merc: function merc(lat, lng, c) {
      return {
        x: this.radius * (lng - c) * this.radDeg,
        y: -this.radius * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))
      };
    },

    /* merc_inv(x, y, c) {
      return {
        lat: (2 * Math.atan(Math.exp(y / this.radius)) - Math.PI / 2) * this.degRad,
        lng: (c * this.radDeg + x / this.radius) * this.degRad
      };
    }, */
    aea: function aea(lat, lng, c) {
      var fi0 = 0,
          lambda0 = c * this.radDeg,
          fi1 = 29.5 * this.radDeg,
          fi2 = 45.5 * this.radDeg,
          fi = lat * this.radDeg,
          lambda = lng * this.radDeg,
          n = (Math.sin(fi1) + Math.sin(fi2)) / 2,
          C = Math.cos(fi1) * Math.cos(fi1) + 2 * n * Math.sin(fi1),
          theta = n * (lambda - lambda0),
          ro = Math.sqrt(C - 2 * n * Math.sin(fi)) / n,
          ro0 = Math.sqrt(C - 2 * n * Math.sin(fi0)) / n;
      return {
        x: ro * Math.sin(theta) * this.radius,
        y: -(ro0 - ro * Math.cos(theta)) * this.radius
      };
    },

    /* aea_inv(xCoord, yCoord, c) {
      var x = xCoord / this.radius,
          y = yCoord / this.radius,
          fi0 = 0,
          lambda0 = c * this.radDeg,
          fi1 = 29.5 * this.radDeg,
          fi2 = 45.5 * this.radDeg,
          n = (Math.sin(fi1)+Math.sin(fi2)) / 2,
          C = Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),
          ro0 = Math.sqrt(C-2*n*Math.sin(fi0))/n,
          ro = Math.sqrt(x*x+(ro0-y)*(ro0-y)),
          theta = Math.atan( x / (ro0 - y) );
        return {
        lat: (Math.asin((C - ro * ro * n * n) / (2 * n))) * this.degRad,
        lng: (lambda0 + theta / n) * this.degRad
      };
    }, */
    lcc: function lcc(lat, lng, c) {
      var fi0 = 0,
          lambda0 = c * this.radDeg,
          lambda = lng * this.radDeg,
          fi1 = 33 * this.radDeg,
          fi2 = 45 * this.radDeg,
          fi = lat * this.radDeg,
          n = Math.log(Math.cos(fi1) * (1 / Math.cos(fi2))) / Math.log(Math.tan(Math.PI / 4 + fi2 / 2) * (1 / Math.tan(Math.PI / 4 + fi1 / 2))),
          F = Math.cos(fi1) * Math.pow(Math.tan(Math.PI / 4 + fi1 / 2), n) / n,
          ro = F * Math.pow(1 / Math.tan(Math.PI / 4 + fi / 2), n),
          ro0 = F * Math.pow(1 / Math.tan(Math.PI / 4 + fi0 / 2), n);
      return {
        x: ro * Math.sin(n * (lambda - lambda0)) * this.radius,
        y: -(ro0 - ro * Math.cos(n * (lambda - lambda0))) * this.radius
      };
    }
    /* lcc_inv(xCoord, yCoord, c) {
      var x = xCoord / this.radius,
          y = yCoord / this.radius,
          fi0 = 0,
          lambda0 = c * this.radDeg,
          fi1 = 33 * this.radDeg,
          fi2 = 45 * this.radDeg,
          n = Math.log( Math.cos(fi1) * (1 / Math.cos(fi2)) ) / Math.log( Math.tan( Math.PI / 4 + fi2 / 2) * (1 / Math.tan( Math.PI / 4 + fi1 / 2) ) ),
          F = ( Math.cos(fi1) * Math.pow( Math.tan( Math.PI / 4 + fi1 / 2 ), n ) ) / n,
          ro0 = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi0 / 2 ), n ),
          ro = this.sgn(n) * Math.sqrt(x*x+(ro0-y)*(ro0-y)),
          theta = Math.atan( x / (ro0 - y) );
        return {
        lat: (2 * Math.atan(Math.pow(F/ro, 1/n)) - Math.PI / 2) * this.degRad,
        lng: (lambda0 + theta / n) * this.degRad
      };
    } */

  };
  Proj.degRad = 180 / Math.PI;
  Proj.radDeg = Math.PI / 180;
  Proj.radius = 6381372;

  function coordsToPoint(lat, lng) {
    var point,
        proj = Map.maps[this.params.map].projection,
        centralMeridian = proj.centralMeridian,
        inset,
        bbox;
    point = Proj[proj.type](lat, lng, centralMeridian);
    inset = this.getInsetForPoint(point.x, point.y);

    if (inset) {
      bbox = inset.bbox;
      point.x = (point.x - bbox[0].x) / (bbox[1].x - bbox[0].x) * inset.width * this.scale;
      point.y = (point.y - bbox[0].y) / (bbox[1].y - bbox[0].y) * inset.height * this.scale;
      return {
        x: point.x + this.transX * this.scale + inset.left * this.scale,
        y: point.y + this.transY * this.scale + inset.top * this.scale
      };
    }

    return false;
  }

  function getInsetForPoint(x, y) {
    var index,
        bbox,
        insets = Map.maps[this.params.map].insets;

    for (index = 0; index < insets.length; index++) {
      bbox = insets[index].bbox;

      if (x > bbox[0].x && x < bbox[1].x && y > bbox[0].y && y < bbox[1].y) {
        return insets[index];
      }
    }
  }

  function getMarkerPosition(_ref) {
    var coords = _ref.coords;

    if (Map.maps[this.params.map].projection) {
      return this.coordsToPoint.apply(this, coords);
    }

    return {
      x: coords[0] * this.scale + this.transX * this.scale,
      y: coords[1] * this.scale + this.transY * this.scale
    };
  }

  function repositionLines() {
    var point1 = false,
        point2 = false;

    for (var index in this.lines) {
      for (var mindex in this.markers) {
        var marker = this.markers[mindex];

        if (marker.config.name === this.lines[index].config.from) {
          point1 = this.getMarkerPosition(marker.config);
        }

        if (marker.config.name === this.lines[index].config.to) {
          point2 = this.getMarkerPosition(marker.config);
        }
      }

      if (point1 !== false && point2 !== false) {
        this.lines[index].element.setStyle({
          x1: point1.x,
          y1: point1.y,
          x2: point2.x,
          y2: point2.y
        });
      }
    }
  }

  function repositionMarkers() {
    var point;

    for (var index in this.markers) {
      point = this.getMarkerPosition(this.markers[index].config);

      if (point !== false) {
        this.markers[index].element.setStyle({
          cx: point.x,
          cy: point.y
        });
      }
    }
  }

  function repositionLabels() {
    var labels = this.params.labels;

    if (!labels) {
      return;
    } // Regions labels


    if (labels.regions) {
      for (var key in this.regions) {
        this.regions[key].element.updateLabelPosition();
      }
    } // Markers labels


    if (labels.markers) {
      for (var _key in this.markers) {
        this.markers[_key].element.updateLabelPosition();
      }
    }
  }

  var DataVisualization = /*#__PURE__*/function () {
    function DataVisualization(_ref, map) {
      var scale = _ref.scale,
          values = _ref.values;
      // Private
      this._scale = scale;
      this._values = values;
      this._fromColor = this.hexToRgb(scale[0]);
      this._toColor = this.hexToRgb(scale[1]);
      this._map = map;
      this.setMinMaxValues(values);
      this.visualize();
    }

    var _proto = DataVisualization.prototype;

    _proto.setMinMaxValues = function setMinMaxValues(values) {
      this.min = Number.MAX_VALUE;
      this.max = 0;

      for (var value in values) {
        value = parseFloat(values[value]);

        if (value > this.max) {
          this.max = value;
        }

        if (value < this.min) {
          this.min = value;
        }
      }
    };

    _proto.visualize = function visualize() {
      var attrs = {},
          value;

      for (var regionCode in this._values) {
        value = parseFloat(this._values[regionCode]);

        if (!isNaN(value)) {
          attrs[regionCode] = this.getValue(value);
        }
      }

      this.setAttributes(attrs);
    };

    _proto.setAttributes = function setAttributes(attrs) {
      for (var code in attrs) {
        if (this._map.regions[code]) {
          this._map.regions[code].element.setStyle('fill', attrs[code]);
        }
      }
    };

    _proto.getValue = function getValue(value) {
      var hex,
          color = "#";

      for (var i = 0; i < 3; i++) {
        hex = Math.round(this._fromColor[i] + (this._toColor[i] - this._fromColor[i]) * ((value - this.min) / (this.max - this.min))).toString(16);
        color += (hex.length === 1 ? "0" : "") + hex;
      }

      return color;
    };

    _proto.hexToRgb = function hexToRgb(h) {
      var r = 0,
          g = 0,
          b = 0;

      if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
      } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      }

      return [parseInt(r), parseInt(g), parseInt(b)];
    };

    return DataVisualization;
  }();

  function visualizeData(data) {
    if (Util.isObj(data)) {
      this.dataVisualization = new DataVisualization(data, this);
    }
  }

  var MapPrototypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    handleContainerEvents: handleContainerEvents,
    handleElementEvents: handleElementEvents,
    handleZoomButtons: handleZoomButtons,
    bindContainerTouchEvents: bindContainerTouchEvents,
    createRegions: createRegions,
    createLines: createLines,
    createMarkers: createMarkers,
    createTooltip: createTooltip,
    createSeries: createSeries,
    applyTransform: applyTransform,
    setFocus: setFocus,
    resize: resize,
    setScale: setScale,
    updateSize: updateSize,
    coordsToPoint: coordsToPoint,
    getInsetForPoint: getInsetForPoint,
    getMarkerPosition: getMarkerPosition,
    repositionLines: repositionLines,
    repositionMarkers: repositionMarkers,
    repositionLabels: repositionLabels,
    visualizeData: visualizeData
  });

  var Events = {
    onViewportChange: 'viewport:changed',
    onRegionSelected: 'region:selected',
    onMarkerSelected: 'marker:selected',
    onRegionTooltipShow: 'region.tooltip:show',
    onMarkerTooltipShow: 'marker.tooltip:show',
    onLoaded: 'map:loaded',
    onDestroyed: 'map:destroyed'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Map = /*#__PURE__*/function () {
    function Map(options) {
      if (options === void 0) {
        options = {};
      }

      // Merge the given options with the default options
      this.params = Util.mergeDeeply(Map.defaults, options); // Throw an error if the given map name doesn't match
      // the map that was set in map file

      if (!Map.maps[this.params.map]) {
        throw new Error("Attempt to use map which was not loaded: " + options.map);
      }

      this.mapData = Map.maps[this.params.map];
      this.regions = {};
      this.markers = {};
      this.lines = {};
      this.defaultWidth = this.mapData.width;
      this.defaultHeight = this.mapData.height;
      this.height = 0;
      this.width = 0;
      this.scale = 1;
      this.baseScale = 1;
      this.transX = 0;
      this.transY = 0;
      this.baseTransX = 0;
      this.baseTransY = 0;
      this.isBeingDragged = false;
      this.selector = options.selector; // `document` is already ready, just initialise now

      if (window.document.readyState !== 'loading') {
        this.init(options.selector);
      } else {
        // Wait until `document` is ready
        window.addEventListener('DOMContentLoaded', this.init.bind(this, options.selector));
      }
    } // Initialize the map


    var _proto = Map.prototype;

    _proto.init = function init(selector) {
      var params = this.params; // @TODO: We can get the selector from params `this.params.selector` but unfortunately
      // when passing a DOM element to jsVectorMap constructor, the DOM element doesn't get merged
      // with defaults during merging the options so we need to get the selector directly from the options.

      this.container = Util.$(selector).addClass('jvm-container');
      this.canvas = new SVGCanvasElement(this.container, this.width, this.height); // Set the map's background color

      this.setBackgroundColor(params.backgroundColor); // Handle the container

      this.handleContainerEvents(); // Create regions

      this.createRegions(); // Update size

      this.updateSize(); // Create lines

      this.createLines(params.lines || {}, params.markers || {}); // Create markers

      this.createMarkers(params.markers); // Handle regions/markers events

      this.handleElementEvents(); // Position labels

      this.repositionLabels(); // Create toolip

      if (params.showTooltip) {
        this.createTooltip();
      } // Create zoom buttons if `zoomButtons` is set to true


      if (params.zoomButtons) {
        this.handleZoomButtons();
      } // Set selected regions if any


      if (params.selectedRegions) {
        this.setSelected('regions', params.selectedRegions);
      } // Set selected regions if any


      if (params.selectedMarkers) {
        this.setSelected('markers', params.selectedMarkers);
      } // Set focus on a spcific region


      if (params.focusOn) {
        this.setFocus(params.focusOn);
      } // Visualize data


      if (params.visualizeData) {
        this.visualizeData(params.visualizeData);
      } // Bind touch events if true


      if (params.bindTouchEvents) {
        if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
          this.bindContainerTouchEvents();
        }
      } // Create series if any


      if (params.series) {
        this.container.append(this.legendHorizontal = Util.createElement('div', 'jvm-series-container jvm-series-h')).append(this.legendVertical = Util.createElement('div', 'jvm-series-container jvm-series-v'));
        this.createSeries();
      } // Fire loaded event


      this.emit('map:loaded', [this]);
    } // Public
    ;

    _proto.emit = function emit(eventName, args) {
      for (var event in Events) {
        if (Events[event] === eventName && Util.isFunc(this.params[event])) {
          this.params[event].apply(this, args);
        }
      }
    };

    _proto.setBackgroundColor = function setBackgroundColor(color) {
      this.container.css({
        backgroundColor: color
      });
    } // Markers/Regions
    ;

    _proto.getSelected = function getSelected(type) {
      var key,
          selected = [];

      for (key in this[type]) {
        if (this[type][key].element.isSelected) {
          selected.push(key);
        }
      }

      return selected;
    };

    _proto.clearSelected = function clearSelected(type) {
      var _this = this;

      this.getSelected(type).forEach(function (i) {
        _this[type][i].element.select(false);
      });
    };

    _proto.setSelected = function setSelected(type, keys) {
      var _this2 = this;

      keys.forEach(function (key) {
        if (_this2[type][key]) {
          _this2[type][key].element.select(true);
        }
      });
    } // Region methods
    ;

    _proto.getSelectedRegions = function getSelectedRegions() {
      return this.getSelected('regions');
    };

    _proto.clearSelectedRegions = function clearSelectedRegions() {
      var _this3 = this;

      this.getSelected('regions').forEach(function (code) {
        _this3.regions[code].element.select(false);
      });
    } // Markers methods
    ;

    _proto.getSelectedMarkers = function getSelectedMarkers() {
      return this.getSelected('markers');
    };

    _proto.clearSelectedMarkers = function clearSelectedMarkers() {
      var _this4 = this;

      this.getSelected('markers').forEach(function (index) {
        _this4.markers[index].element.select(false);
      });
    } // Deprecated
    ;

    _proto.addMarker = function addMarker(config) {
      console.warn('`addMarker` method is depreacted, please use `addMarkers` instead.');
      this.createMarkers([config], true);
    };

    _proto.addMarkers = function addMarkers(config) {
      if (typeof config === 'object') {
        return this.createMarkers([config], true);
      }

      this.createMarkers(config, true);
    };

    _proto.removeMarkers = function removeMarkers(markers) {
      var _this5 = this;

      if (!markers) {
        markers = Object.keys(this.markers);
      }

      markers.forEach(function (index) {
        // Remove the element from the DOM
        _this5.markers[index].element.remove(); // Remove the element from markers object


        delete _this5.markers[index];
      });
    } // Create line
    ;

    _proto.addLine = function addLine(from, to, style) {
      if (style === void 0) {
        style = {};
      }

      this.createLines([{
        from: from,
        to: to,
        style: style
      }], this.markers, true);
    } // Reset map
    ;

    _proto.reset = function reset() {
      for (var key in this.series) {
        for (var i = 0; i < this.series[key].length; i++) {
          this.series[key][i].clear();
        }
      }

      if (this.legendHorizontal) {
        Util.removeElement(this.legendHorizontal);
        this.legendHorizontal = null;
      }

      if (this.legendVertical) {
        Util.removeElement(this.legendVertical);
        this.legendVertical = null;
      }

      this.scale = this.baseScale;
      this.transX = this.baseTransX;
      this.transY = this.baseTransY;
      this.applyTransform();
      this.clearSelectedMarkers();
      this.clearSelectedRegions();
      this.removeMarkers();
    } // Destroy the map
    ;

    _proto.destroy = function destroy(destroyInstance) {
      var _this6 = this;

      if (destroyInstance === void 0) {
        destroyInstance = true;
      }

      var eventRegistry = EventHandler.getEventRegistry();
      var tooltip = this.tooltip.selector;
      var keys = Object.keys; // Remove tooltip from the DOM

      Util.removeElement(tooltip); // Remove event registry

      keys(eventRegistry).forEach(function (event) {
        EventHandler.off(eventRegistry[event].selector, event, eventRegistry[event].handler);
      });
      this.emit('map:destroyed'); // For perfomance issues remove all possible properties

      if (destroyInstance) {
        keys(this).forEach(function (key) {
          try {
            delete _this6[key];
          } catch (e) {}
        });
      }
    };

    _proto.extend = function extend(name, callback) {
      Map.prototype[name] = callback;
    };

    _proto.getUtils = function getUtils() {
      return Util;
    };

    return Map;
  }();

  Map.maps = {};
  Map.defaults = Defaults;
  Object.assign(Map.prototype, MapPrototypes);

  /**
   * jsVectorMap
   * Copyrights (c) Mustafa Omar https://github.com/themustafaomar
   * Released under the MIT License.
   */
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var jsVectorMap = /*#__PURE__*/function () {
    function jsVectorMap(options) {
      if (options === void 0) {
        options = {};
      }

      if (!options.selector) {
        throw new Error('Selector is not given.');
      }

      return new Map(options);
    } // Public


    var _proto = jsVectorMap.prototype;

    _proto.addMap = function addMap(name, map) {
      Map.maps[name] = map;
    };

    return jsVectorMap;
  }();

  var JsVectorMap = window.jsVectorMap = jsVectorMap;

  return JsVectorMap;

})));
