(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.JsVectorMap = factory());
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

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   * This class was designed to handle one single element
   * since we don't need to select more than one element in this plugin
   */

  var JsVMapDOMHandler = /*#__PURE__*/function () {
    function JsVMapDOMHandler(selector) {
      if (selector instanceof Element) {
        this.selector = selector;
        return this;
      }

      this.selector = document.querySelector(selector);
      return this;
    }

    var _proto = JsVMapDOMHandler.prototype;

    _proto.on = function on(event, callback) {
      this.selector.addEventListener(event, callback);
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

    return JsVMapDOMHandler;
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
    createEl: function createEl(type, classes, text, html) {
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
    $: function $(selector) {
      return new JsVMapDOMHandler(selector);
    },
    hyphenate: function hyphenate(string) {
      return string.replace(/[\w]([A-Z])/g, function (m) {
        return m[0] + "-" + m[1];
      }).toLowerCase();
    },
    isFunc: function isFunc(fn) {
      return typeof fn === 'function';
    },
    isObject: function isObject(obj) {
      return typeof obj === 'object';
    },
    isStr: function isStr(str) {
      return typeof str === 'string';
    },
    isArr: function isArr(array) {
      return Array.isArray(array);
    },
    merge: function merge(target, source) {
      return deepmerge(target, source);
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
     * Markers options
     */
    markersSelectable: false,
    markersSelectableOne: false,
    markerStyle: {
      // Marker style
      initial: {
        r: 7,
        fill: 'black',
        fillOpacity: 1,
        stroke: '#FFF',
        strokeWidth: 5,
        strokeOpacity: .65
      },
      hover: {
        fill: '#3cc0ff',
        stroke: '#5cc0ff',
        cursor: 'pointer',
        strokeWidth: 2
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
        fontWeight: 'bold',
        cursor: 'default',
        fill: 'black'
      },
      hover: {
        cursor: 'pointer'
      }
    },

    /**
     * Region style
     */
    regionsSelectable: false,
    regionsSelectableOne: false,
    regionStyle: {
      // Region style
      initial: {
        fill: '#e3eaef',
        fillOpacity: 1,
        stroke: 'none',
        strokeWidth: 0,
        strokeOpacity: 1
      },
      hover: {
        fillOpacity: .7,
        cursor: 'pointer'
      },
      selected: {
        fill: '#000'
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
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var SVGElement = /*#__PURE__*/function () {
    function SVGElement(name, config) {
      this.name = name;
      this.properties = {};
      this.node = this.createElement(name);
      if (config) this.set(config);
    }

    var _proto = SVGElement.prototype;

    _proto.createElement = function createElement(tagName) {
      return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    };

    _proto.addClass = function addClass(className) {
      this.node.setAttribute('class', className);
    };

    _proto.getElementCtr = function getElementCtr(ctr) {
      return SVG + ctr;
    };

    _proto.getBBox = function getBBox() {
      return this.node.getBBox();
    };

    _proto.set = function set(property, value) {
      if (Util.isObject(property)) {
        for (var key in property) {
          this.properties[key] = property[key];
          this.applyAttr(key, property[key]);
        }
      } else {
        this.properties[property] = value;
        this.applyAttr(property, value);
      }
    };

    _proto.get = function get(property) {
      return this.properties[property];
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

      _this = _SVGElement.call(this, name, config) || this;
      _this.style = style || {};
      _this.style.current = _this.style.current || {};
      _this.isHovered = false;
      _this.isSelected = false;

      _this.updateStyle();

      return _this;
    }

    var _proto = SVGShapeElement.prototype;

    _proto.setStyle = function setStyle(property, value) {
      var styles = {};

      if (Util.isObject(property)) {
        styles = property;
      } else {
        styles[property] = value;
      }

      Object.assign(this.style.current, styles);
      this.updateStyle();
    };

    _proto.updateStyle = function updateStyle() {
      var attrs = {};
      this.mergeStyles(attrs, this.style.initial);
      this.mergeStyles(attrs, this.style.current);

      if (this.isHovered) {
        this.mergeStyles(attrs, this.style.hover);
      }

      if (this.isSelected) {
        this.mergeStyles(attrs, this.style.selected);

        if (this.isHovered) {
          this.mergeStyles(attrs, this.style.selectedHover);
        }
      }

      this.set(attrs);
    };

    _proto.mergeStyles = function mergeStyles(styles, newStyles) {
      newStyles = newStyles || {};

      for (var key in newStyles) {
        if (newStyles[key] === null) {
          delete styles[key];
        } else {
          styles[key] = newStyles[key];
        }
      }
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

    _proto.applyAttr = function applyAttr(attr, v) {
      attr === 'text' ? this.node.textContent = v : _SVGShapeElement.prototype.applyAttr.call(this, attr, v);
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

      if (attr == 'image') {
        if (Util.isObject(value)) {
          imageUrl = value.url;
          this.offset = value.offset;
        } else {
          imageUrl = value;
          this.offset = [0, 0];
        }

        this.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageUrl);
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
        _SVGShapeElement.prototype.applyAttr.apply(this, arguments);
      }
    };

    _proto.setStyle = function setStyle() {
      _SVGShapeElement.prototype.setStyle.apply(this, arguments);
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

      // Create svg element for holding the whole map
      _this = _SVGElement.call(this, 'svg') || this;
      _this.container = container; // Create the defs element

      _this.defsElement = new SVGElement('defs'); // Append the defs element to the this.node (SVG tag)

      _this.node.appendChild(_this.defsElement.node); // Create group element which will hold the paths (regions)


      _this.rootElement = new SVGElement('g'); // Append the group to this.node (SVG tag)

      _this.node.appendChild(_this.rootElement.node); // Append this.node (SVG tag) to the container


      _this.container.append(_this.node);

      return _this;
    }

    var _proto = SVGCanvasElement.prototype;

    _proto.setSize = function setSize(width, height) {
      this.node.setAttribute('width', width);
      this.node.setAttribute('height', height);
    };

    _proto.applyTransformParams = function applyTransformParams(scale, transX, transY) {
      this.rootElement.node.setAttribute('transform', "scale(" + scale + ") translate(" + transX + ", " + transY + ")");
    };

    _proto.createPath = function createPath(config, style, group) {
      var el = new SVGShapeElement('path', config, style);
      el.node.setAttribute('fill-rule', 'evenodd');
      this.add(el, group);
      return el;
    };

    _proto.createCircle = function createCircle(config, style, group) {
      var el = new SVGShapeElement('circle', config, style);
      this.add(el, group);
      return el;
    };

    _proto.createImage = function createImage(config, style, group) {
      var el = new SVGImageElement(config, style); // extends SVGShapeElement

      this.add(el, group);
      return el;
    };

    _proto.createText = function createText(config, style, group) {
      var el = new SVGTextElement(config, style); // extends SVGShapeElement

      this.add(el, group);
      return el;
    };

    _proto.createGroup = function createGroup(parentGroup) {
      var el = new SVGElement('g');

      if (parentGroup) {
        parentGroup.node.appendChild(el.node);
      } else {
        this.node.appendChild(el.node);
      }

      el.canvas = this;
      return el;
    } // Add some element to a spcific group or the root element if the group isn't given
    ;

    _proto.add = function add(element, group) {
      group = group || this.rootElement;
      group.node.appendChild(element.node);
      element.canvas = this;
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
        event.preventDefault();
        deltaY = (event.deltaY || -event.wheelDelta || event.detail) >> 10 || 1;
        deltaY = deltaY * 75;

        var rect = _this.container.selector.getBoundingClientRect(),
            offsetX = event.pageX - rect.left - window.pageXOffset,
            offsetY = event.pageY - rect.top - window.pageYOffset,
            zoomStep = Math.pow(1 + map.params.zoomOnScrollSpeed / 1000, -1.5 * deltaY);

        map.tooltip.hide();
        map.setScale(map.scale * zoomStep, offsetX, offsetY);
        event.preventDefault();
      });
    }
  }

  function handleZoomButtons() {
    var _this = this;

    var map = this,
        zoomin = Util.createEl('div', 'jsvmap-zoom-btn jsvmap-zoomin', '&#43;', true),
        zoomout = Util.createEl('div', 'jsvmap-zoom-btn jsvmap-zoomout', '&#x2212', true);
    this.container.append(zoomin).append(zoomout);
    zoomin.addEventListener('click', function () {
      _this.setScale(map.scale * map.params.zoomStep, map.width / 2, map.height / 2, false, map.params.zoomAnimate);
    });
    zoomout.addEventListener('click', function () {
      _this.setScale(map.scale / map.params.zoomStep, map.width / 2, map.height / 2, false, map.params.zoomAnimate);
    });
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition ( Abstract )
   * ------------------------------------------------------------------------
   */

  var MapObject = /*#__PURE__*/function () {
    function MapObject() {}

    var _proto = MapObject.prototype;

    // Assert this class won't be instantiated

    /* constructor() {
      if (this.constructor === MapObject) {
        throw new TypeError('Abstract class "MapObject" cannot be instantiated directly.'); 
      }
    } */
    _proto.getLabelText = function getLabelText(key) {
      var label = this.config.label;

      if (label) {
        if (Util.isFunc(label.render)) {
          return label.render(key);
        } else {
          return key;
        }
      }
    };

    _proto.getLabelOffsets = function getLabelOffsets(key) {
      var label = this.config.label;

      if (label) {
        if (Util.isFunc(label.offsets)) {
          return label.offsets(key);
        } // If offsets are an array of offsets example: [ [0, 25], [10, 15] ]


        if (Util.isObject(label.offsets)) {
          return this.config.label.offsets[key];
        }
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

    _proto.hoverStatus = function hoverStatus(status) {
      this.shape.isHovered = status;
      this.shape.updateStyle();
      this.isHovered = status;

      if (this.label) {
        this.label.isHovered = status;
        this.label.updateStyle();
      }
    };

    _proto.select = function select() {
      this._selectStatus(true);
    };

    _proto.deselect = function deselect() {
      this._selectStatus(false);
    } // Private
    ;

    _proto._selectStatus = function _selectStatus(status) {
      this.shape.isSelected = status;
      this.shape.updateStyle();
      this.isSelected = status;

      if (this.label) {
        this.label.isSelected = status;
        this.label.updateStyle();
      }
    };

    return MapObject;
  }();

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Region = /*#__PURE__*/function (_MapObject) {
    _inheritsLoose(Region, _MapObject);

    function Region(_ref) {
      var _this;

      var map = _ref.map,
          code = _ref.code,
          path = _ref.path,
          style = _ref.style,
          label = _ref.label,
          labelStyle = _ref.labelStyle,
          labelsGroup = _ref.labelsGroup;
      _this = _MapObject.call(this) || this;
      _this.config = arguments[0];
      _this.canvas = map.canvas;
      _this.map = map;
      _this.shape = _this.canvas.createPath({
        'data-code': code,
        d: path
      }, style, _this.canvas.rootElement);

      _this.shape.addClass('jsvmap-region jsvmap-element');

      var bbox = _this.shape.getBBox(),
          text = _this.getLabelText(code); // If label is passed and render function returns something 


      if (label && text) {
        var offsets = _this.getLabelOffsets(code);

        _this.labelX = bbox.x + bbox.width / 2 + offsets[0];
        _this.labelY = bbox.y + bbox.height / 2 + offsets[1]; // SVGTextElement class:: name, properties, node, style, isHovered, isSelected, canvas

        _this.label = _this.canvas.createText({
          text: text,
          "text-anchor": 'middle',
          "alignment-baseline": 'central',
          "data-code": code,
          x: _this.labelX,
          y: _this.labelY
        }, labelStyle, labelsGroup);

        _this.label.addClass('jsvmap-region jsvmap-element');
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
  }(MapObject);

  function createRegions() {
    var code, region;
    this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.createGroup();

    for (code in this.mapData.paths) {
      region = new Region({
        map: this,
        code: code,
        path: this.mapData.paths[code].path,
        style: Object.assign({}, this.params.regionStyle),
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

  var Marker = /*#__PURE__*/function (_MapObject) {
    _inheritsLoose(Marker, _MapObject);

    function Marker(_ref) {
      var _this;

      var index = _ref.index,
          style = _ref.style,
          label = _ref.label,
          labelsGroup = _ref.labelsGroup,
          cx = _ref.cx,
          cy = _ref.cy,
          map = _ref.map,
          isRecentlyCreated = _ref.isRecentlyCreated;
      _this = _MapObject.call(this) || this;
      var labelText;
      _this.map = map;
      _this.config = arguments[0];
      _this.isImage = !!style.initial.image;

      _this.createShape();

      if (isRecentlyCreated && label.render && isRecentlyCreated.label) {
        labelText = isRecentlyCreated.label;
      } else {
        labelText = _MapObject.prototype.getLabelText.call(_assertThisInitialized(_this), index);
      }

      if (label && labelText) {
        _this.offsets = isRecentlyCreated && label.render && isRecentlyCreated.offset ? isRecentlyCreated.offset : _MapObject.prototype.getLabelOffsets.call(_assertThisInitialized(_this), index);
        _this.labelX = cx / map.scale - map.transX;
        _this.labelY = cy / map.scale - map.transY;
        _this.label = map.canvas.createText({
          text: labelText,
          'data-index': index,
          dy: "0.6ex",
          x: _this.labelX,
          y: _this.labelY
        }, map.params.markerLabelStyle, labelsGroup);

        _this.label.addClass('jsvmap-marker jsvmap-element');

        if (isRecentlyCreated) {
          _this.updateLabelPosition();
        }
      }

      return _this;
    }

    var _proto = Marker.prototype;

    _proto.createShape = function createShape() {
      if (this.shape) {
        this.shape.remove();
      }

      this.shape = this.config.map.canvas[this.isImage ? 'createImage' : 'createCircle']({
        "data-index": this.config.index,
        cx: this.config.cx,
        cy: this.config.cy
      }, this.config.style, this.config.group);
      this.shape.addClass('jsvmap-marker jsvmap-element'); // If the marker is an image..

      if (this.isImage) {
        this.updateLabelPosition();
      }
    };

    _proto.updateLabelPosition = function updateLabelPosition() {
      if (this.label) {
        this.label.set({
          x: this.labelX * this.map.scale + this.offsets[0] + this.map.transX * this.map.scale + 5 + (this.isImage ? (this.shape.width || 0) / 2 : this.shape.properties.r),
          y: this.labelY * this.map.scale + this.map.transY * this.map.scale + this.offsets[1]
        });
      }
    } // This will be called only when making serie marker
    ;

    _proto.setStyle = function setStyle(property, value) {
      _MapObject.prototype.setStyle.call(this, property, value); // this will be called only if there is a serie marker with r attribute


      if (property === 'r') {
        this.updateLabelPosition();
      }

      var isImage = !!this.shape.get('image');

      if (isImage != this.isImage) {
        // this.isImage = isImage
        this.config.style = Object.assign({}, this.shape.style); // this.config.style = Object.assign({}, this.shape.style)

        this.createShape();
      }
    };

    return Marker;
  }(MapObject);

  function createMarkers(markers, isRecentlyCreated) {
    var marker, point;
    /* , markers = { ...markers } */
    // Create groups for holding markers and markers labels
    // we check if markersGroup is existed or not becuase we may add markers after the map has loaded
    // so we will append the futured markers to this group as well.

    this.markersGroup = this.markersGroup || this.canvas.createGroup();
    this.markerLabelsGroup = this.markerLabelsGroup || this.canvas.createGroup();

    for (var index in markers) {
      point = this.getMarkerPosition(markers[index]);

      if (point !== false) {
        marker = new Marker({
          index: index,
          map: this,
          // Merge the markerStyle object with the marker config style
          style: Util.merge(this.params.markerStyle, {
            initial: markers[index].style || {}
          }),
          label: this.params.labels && this.params.labels.markers,
          labelsGroup: this.markerLabelsGroup,
          cx: point.x,
          cy: point.y,
          group: this.markersGroup,
          // @todo: this may be a little bit complicated :(
          // When adding a new marker by submitting some button and labels key is existed and has render function
          // the render function may returns something like that: return markers[index].name;
          // it will throw an error and the label won't be shown: this was made to show the label
          // an example for this problem will be in examples directory (addmarkers.html)
          isRecentlyCreated: isRecentlyCreated ? markers[index] : false
        }); // Check for marker duplication
        // this is useful when for example: a user clicks a button for creating marker two times
        // so it will remove the old one and the new one will take its place.

        if (this.markers[index]) {
          this.removeMarkers([index]);
        }

        this.markers[index] = {
          element: marker,
          config: markers[index]
        };
      }
    }
  }

  function createTooltip() {
    var _this = this;

    var map = this,
        tooltip = Util.createEl('div', 'jsvmap-tooltip');
    this.tooltip = Util.$(document.body.appendChild(tooltip));
    this.container.on('mousemove', function (event) {
      if (map.tooltip.selector.style.display === 'block') {
        var left = event.pageX - 10 - map.tooltip.width() + 'px',
            top = event.pageY - 10 - map.tooltip.height() + 'px';

        if (left < 5) {
          left = event.pageX + 15;
        }

        if (left < 5) {
          top = event.pageY + 15;
        }

        _this.tooltip.css({
          left: left,
          top: top
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
    function Legend(params) {
      this.params = params || {};
      this.map = this.params.map;
      this.series = this.params.series;
      this.body = Util.createEl('div', 'jsvmap-legend');

      if (this.params.cssClass) {
        this.body.setAttribute('class', this.params.cssClass);
      }

      if (params.vertical) {
        this.map.legendVertical.appendChild(this.body);
      } else {
        this.map.legendHorizontal.appendChild(this.body);
      }

      this.render();
    }

    var _proto = Legend.prototype;

    _proto.render = function render() {
      var ticks = this.series.scale.getTicks(),
          inner = Util.createEl('div', 'jsvmap-legend-inner'),
          tick,
          sample,
          label;
      this.body.innderHTML = '';

      if (this.params.title) {
        var legendTitle = Util.createEl('div', 'jsvmap-legend-title', this.params.title);
        this.body.appendChild(legendTitle);
      }

      this.body.appendChild(inner);

      for (var i = 0; i < ticks.length; i++) {
        tick = Util.createEl('div', 'jsvmap-legend-tick');
        sample = Util.createEl('div', 'jsvmap-legend-tick-sample');

        switch (this.series.legendConfig.attribute) {
          case 'fill':
            if (Util.isImageUrl(ticks[i].value)) {
              sample.style.background = 'url(' + ticks[i].value + ')';
            } else {
              sample.style.background = ticks[i].value;
            }

            break;

          case 'stroke':
            sample.style.background = ticks[i].value;
            break;

          case 'image':
            sample.style.background = 'url(' + (Util.isObject(ticks[i].value) ? ticks[i].value.url : ticks[i].value) + ') no-repeat center center';
            sample.style.backgroundSize = 'cover';
            break;
        }

        tick.appendChild(sample);
        label = ticks[i].label;

        if (this.params.labelRender) {
          label = this.params.labelRender(label);
        }

        var tickText = Util.createEl('div', 'jsvmap-legend-tick-text', label);
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
      this.scale = scale;
    }

    var _proto = OrdinalScale.prototype;

    _proto.getValue = function getValue(value) {
      return this.scale[value];
    };

    _proto.getTicks = function getTicks() {
      var ticks = [];

      for (var key in this.scale) {
        ticks.push({
          label: key,
          value: this.scale[key]
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

  var DataSeries = /*#__PURE__*/function () {
    function DataSeries(legendConfig, elements, map) {
      if (legendConfig === void 0) {
        legendConfig = {};
      }

      this.map = map;
      this.elements = elements; // Markers or regions

      this.legendConfig = legendConfig;
      this.legendConfig.attribute = legendConfig.attribute || 'fill';
      this.values = legendConfig.values || {};

      if (legendConfig.attributes) {
        this.setAttributes(legendConfig.attributes);
      }

      if (Util.isObject(legendConfig.scale)) {
        this.scale = new OrdinalScale(legendConfig.scale);
      }
      /* else {
        // @todo I may support this scale in the future (Array.isArray(legendConfig.scale))
        throw new Error("Scale of type array doesn't supported yet.")
      }  */


      this.parseValues(this.values);

      if (this.legendConfig.legend) {
        this.legend = new Legend(Object.assign({
          map: this.map,
          series: this
        }, this.legendConfig.legend));
      }
    }

    var _proto = DataSeries.prototype;

    _proto.parseValues = function parseValues(values) {
      var attrs = {};

      for (var key in values) {
        if (values[key]) {
          attrs[key] = this.scale.getValue(values[key]);
        }
      }

      this.setAttributes(attrs);
      Object.assign(this.values, values);
    };

    _proto.setAttributes = function setAttributes(attrs) {
      for (var key in attrs) {
        if (this.elements[key]) {
          this.elements[key].element.setStyle(this.legendConfig.attribute, attrs[key]);
        }
      }
    };

    _proto.clear = function clear() {
      var key,
          attrs = {};

      for (key in this.values) {
        if (this.elements[key]) {
          attrs[key] = this.elements[key].element.shape.style.initial[this.legendConfig.attribute];
        }
      }

      this.setAttributes(attrs);
      this.values = {};
    };

    return DataSeries;
  }();

  function createSeries() {
    var i, key;
    this.series = {
      markers: [],
      regions: []
    };

    for (key in this.params.series) {
      for (i = 0; i < this.params.series[key].length; i++) {
        this.series[key][i] = new DataSeries(this.params.series[key][i], this[key], this);
      }
    }
  }

  function parseEvent(map, selector, isTooltip) {
    var el = Util.$(selector),
        elClassList = el.attr('class'),
        type = elClassList.indexOf('jsvmap-region') === -1 ? 'marker' : 'region',
        code = type === 'region' ? el.attr('data-code') : el.attr('data-index'),
        event = type + ':select'; // Init tooltip event

    if (isTooltip) {
      event = type + '.tooltip:show';
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
    var map = this; // When the mouse is over the region/marker
    // When the mouse is out the region/marker

    this.container.delegate('.jsvmap-element', 'mouseover mouseout', function (event) {
      var data = parseEvent(map, this, true),
          showTooltip = map.params.showTooltip;

      if (event.type === 'mouseover') {
        var defaultPrevented = event.defaultPrevented;

        if (!defaultPrevented) {
          data.element.hoverStatus(true);
        }

        if (showTooltip && !defaultPrevented) {
          map.tooltip.text(data.tooltipText);
          map.tooltip.show();
          map.tooltipHeight = map.tooltip.height();
          map.tooltipWidth = map.tooltip.width();
          map.emit(data.event, [map.tooltip, data.code]);
        }
      } else {
        data.element.hoverStatus(false);

        if (showTooltip) {
          map.tooltip.hide();
        }
      }
    }); // When the click is released

    this.container.delegate('.jsvmap-element', 'mouseup', function (event) {
      var data = parseEvent(map, this);

      if (data.type === 'region' && map.params.regionsSelectable || data.type === 'marker' && map.params.markersSelectable) {
        if (!event.defaultPrevented) {
          var el = data.element; // If regions/markers:SelectableOne option is passed, remove all selected regions/markers

          if (map.params[data.type + 'sSelectableOne']) {
            // Clear all selected regions/markers
            map.clearSelected(data.type + 's');
          }

          data.element.isSelected ? el.deselect() : el.select();
          map.emit(data.event, [data.code, data.element.isSelected, map.getSelected(data.type + 's')]);
        }
      }
    });
  }

  function setFocus(config) {
    var _this = this;

    var bbox, codes;
    config = config || {};

    if (config.region && Util.isStr(config.region)) {
      codes = [config.region];
    } else if (config.regions && Util.isArr(config.regions)) {
      codes = config.regions;
    }

    if (codes) {
      codes.forEach(function (code) {
        // Check if the region code is valid.
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
    }
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

    this.repositionLabels();
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
    } else {
      return false;
    }
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

  function getMarkerPosition(_ref) {
    var coords = _ref.coords;

    if (Map.maps[this.params.map].projection) {
      return this.coordsToPoint.apply(this, coords);
    } else {
      return {
        x: coords[0] * this.scale + this.transX * this.scale,
        y: coords[1] * this.scale + this.transY * this.scale
      };
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

    if (labels) {
      // Regions labels
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
  }



  var MapPrototypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    handleContainerEvents: handleContainerEvents,
    handleZoomButtons: handleZoomButtons,
    createRegions: createRegions,
    createMarkers: createMarkers,
    createTooltip: createTooltip,
    createSeries: createSeries,
    handleElementEvents: handleElementEvents,
    setFocus: setFocus,
    bindContainerTouchEvents: bindContainerTouchEvents,
    applyTransform: applyTransform,
    resize: resize,
    updateSize: updateSize,
    coordsToPoint: coordsToPoint,
    setScale: setScale,
    getMarkerPosition: getMarkerPosition,
    repositionMarkers: repositionMarkers,
    repositionLabels: repositionLabels
  });

  var Events = {
    onViewportChange: 'viewport:changed',
    onRegionSelected: 'region:select',
    onMarkerSelected: 'marker:select',
    onRegionTooltipShow: 'region.tooltip:show',
    onMarkerTooltipShow: 'marker.tooltip:show',
    onLoaded: 'map:loaded'
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
      this.params = Util.merge(Map.defaults, options); // Throw an error if the given map name doesn't match
      // the map that was set in map file

      if (!Map.maps[this.params.map]) {
        throw new Error('Attempt to use map which was not loaded: ' + options.map);
      }

      this.mapData = Map.maps[this.params.map];
      this.regionsData = {};
      this.regionsColors = {};
      this.markers = {};
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
      this.regions = {}; // `document` is already ready, just initialise now

      if (window.document.readyState !== 'loading') {
        this.init(options.selector);
      } else {
        // Wait until `document` is ready
        window.addEventListener('DOMContentLoaded', this.init.bind(this, options.selector));
      }
    } // Initialize the map


    var _proto = Map.prototype;

    _proto.init = function init(selector) {
      // @TODO: We can get the selector from params `this.params.selector` but unfortunately
      // when passing a DOM element to jsVectorMap constructor, the DOM element doesn't get merged
      // with defaults during merging the options so we need to get the selector directly from the options.
      this.container = Util.$(selector).attr('class', 'jsvmap-container');
      this.canvas = new SVGCanvasElement(this.container, this.width, this.height); // Set the map's background color

      this.setBackgroundColor(this.params.backgroundColor); // Handle the container

      this.handleContainerEvents(); // Create regions/markers, then handle events for both

      this.createRegions(); // Update size

      this.updateSize(); // Create markers

      this.createMarkers(this.params.markers || {}); // Create toolip

      if (this.params.showTooltip) {
        this.createTooltip();
      } // Create zoom buttons if zoomButtons is set to true


      if (this.params.zoomButtons) {
        this.handleZoomButtons();
      } // Set selected regions if passed


      if (this.params.selectedRegions) {
        this.setSelected('regions', this.params.selectedRegions);
      } // Set selected regions if passed


      if (this.params.selectedMarkers) {
        this.setSelected('markers', this.params.selectedMarkers);
      } // Set focus on a spcific region


      if (this.params.focusOn) {
        this.setFocus(this.params.focusOn);
      } // Bind touch events if true


      if (this.params.bindTouchEvents) {
        if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
          this.bindContainerTouchEvents();
        }
      } // Handle regions/markers events


      this.handleElementEvents(); // Position labels

      this.repositionLabels(); // Handle legends

      this.container.append(this.legendHorizontal = Util.createEl('div', 'jsvmap-series-container jsvmap-series-h')).append(this.legendVertical = Util.createEl('div', 'jsvmap-series-container jsvmap-series-v')); // Create series if passed

      if (this.params.series) {
        this.createSeries();
      } // Fire loaded event


      this.emit('map:loaded', [this]);
    } // Public
    ;

    _proto.emit = function emit(eventValue, args) {
      for (var event in Events) {
        if (Events[event] === eventValue && Util.isFunc(this.params[event])) {
          this.params[event].apply(this, args);
        }
      }
    };

    _proto.setBackgroundColor = function setBackgroundColor(color) {
      this.container.css({
        backgroundColor: color
      });
    };

    _proto.getInsetForPoint = function getInsetForPoint(x, y) {
      var index,
          bbox,
          insets = Map.maps[this.params.map].insets;

      for (index = 0; index < insets.length; index++) {
        bbox = insets[index].bbox;

        if (x > bbox[0].x && x < bbox[1].x && y > bbox[0].y && y < bbox[1].y) {
          return insets[index];
        }
      }
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
        _this[type][i].element.deselect();
      });
    };

    _proto.setSelected = function setSelected(type, keys) {
      var _this2 = this;

      keys.forEach(function (key) {
        if (_this2[type][key]) {
          _this2[type][key].element.select();
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
        _this3.regions[code].element.deselect();
      });
    } // Markers methods
    ;

    _proto.getSelectedMarkers = function getSelectedMarkers() {
      return this.getSelected('markers');
    };

    _proto.clearSelectedMarkers = function clearSelectedMarkers() {
      var _this4 = this;

      this.getSelected('markers').forEach(function (index) {
        _this4.markers[index].element.deselect();
      });
    };

    _proto.addMarker = function addMarker(code, config) {
      var _this$createMarkers;

      this.createMarkers((_this$createMarkers = {}, _this$createMarkers[code] = config, _this$createMarkers), true);
    };

    _proto.removeMarkers = function removeMarkers(markers) {
      var _this5 = this;

      markers.forEach(function (index) {
        // Remove the element from the DOM
        _this5.markers[index].element.remove(); // Remove the element from markers object


        delete _this5.markers[index];
      });
    } // Reset map
    ;

    _proto.reset = function reset() {
      for (var key in this.series) {
        for (var i = 0; i < this.series[key].length; i++) {
          this.series[key][i].clear();
        }
      }

      this.scale = this.baseScale;
      this.transX = this.baseTransX;
      this.transY = this.baseTransY;
      this.clearSelectedMarkers();
      this.clearSelectedRegions();
      this.applyTransform();
    };

    return Map;
  }();

  Map.maps = {};
  Map.defaults = Defaults;
  Object.assign(Map.prototype, MapPrototypes);

  /**
   * JsVectorMap
   * Copyrights (c) Mustafa Omar https://github.com/themustafaomar
   * Released under the MIT License.
   */
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var JsVectorMap = /*#__PURE__*/function () {
    function JsVectorMap(options) {
      if (options === void 0) {
        options = {};
      }

      if (!options.selector) {
        throw new Error('Selector is not given.');
      }

      return new Map(options);
    } // Public


    var _proto = JsVectorMap.prototype;

    _proto.addMap = function addMap(name, map) {
      Map.maps[name] = map;
    };

    return JsVectorMap;
  }();

  var JsVectorMap$1 = window.jsVectorMap = window.JsVectorMap = JsVectorMap;

  return JsVectorMap$1;

})));
