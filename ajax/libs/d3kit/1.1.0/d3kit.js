// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/amdWeb.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['d3'], factory);
  } else if (typeof exports === 'object') {
    // Support CommonJS
    // EDIT: List all dependencies in CommonJS style
    module.exports = factory(require('d3'));
  } else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    root.d3Kit = factory(root.d3);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (d3) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------


var modules_helper;
modules_helper = function () {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------
  var module = function () {
    /**
     * Example usage:
     * selection.call(d3Kit.helper.bindMouseEventsToDispatcher, dispatch, 'bar')
     *
     * @param  {[type]} dispatch [description]
     * @param  {[type]} prefix   [description]
     * @return {[type]}          [description]
     */
    function bindMouseEventsToDispatcher(selection, dispatch, prefix) {
      return selection.on('click', dispatch[prefix + 'Click']).on('mouseover', dispatch[prefix + 'MouseOver']).on('mousemove', dispatch[prefix + 'MouseMove']).on('mouseout', dispatch[prefix + 'MouseOut']);
    }
    function removeAllChildren(selection, noTransition) {
      if (noTransition) {
        return selection.selectAll('*').remove();
      } else {
        return selection.selectAll('*').transition().style('opacity', 0).remove();
      }
    }
    // Returns true if it is a DOM element
    // From http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    function isElement(o) {
      return typeof HTMLElement === 'object' ? o instanceof HTMLElement : //DOM2
      o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
    }
    var isNaN = Number.isNaN ? Number.isNaN : window.isNaN;
    // Check whether s is element if not then do the querySelector
    function $(s) {
      return isElement(s) ? s : document.querySelector(s);
    }
    // To get a proper array from a NodeList that matches the CSS selector
    function $$(s) {
      return Array.isArray(s) ? s : [].slice.call(document.querySelectorAll(s));
    }
    //---------------------------------------------------
    // From http://youmightnotneedjquery.com/
    //---------------------------------------------------
    function deepExtend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj)
          continue;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            if (isObject(value) && !Array.isArray(value) && !isFunction(value)) {
              out[key] = deepExtend(out[key], value);
            } else
              out[key] = value;
          }
        }
      }
      return out;
    }
    function extend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
          continue;
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key))
            out[key] = arguments[i][key];
        }
      }
      return out;
    }
    function on(element, type, listener) {
      if (element.addEventListener) {
        element.addEventListener(type, listener, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, listener);
      }
    }
    function off(element, type, listener) {
      element.removeEventListener(type, listener, false);
    }
    //---------------------------------------------------
    // Modified from lodash
    //---------------------------------------------------
    /**
     * Returns a function, that, as long as it continues to be invoked,
     * will not be triggered.
     * The function will be called after it stops being called for
     * "wait" milliseconds.
     * The output function can be called with .now() to execute immediately
     * For example:
     * doSomething(params); // will debounce
     * doSomething.now(params); // will execute immediately
     *
     * @param  Function func      function to be debounced
     * @param  Number   wait      wait time until it will be executed
     * @param  Boolean  immediate If "immediate" is passed, trigger the function on the
     * leading edge, instead of the trailing.
     * @return Function           debounced function
     */
    function debounce(func, wait, immediate) {
      var timeout;
      var outputFn = function () {
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate)
            func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
          func.apply(context, args);
        // return caller for chaining
        return context;
      };
      // so we know this function is debounced
      outputFn.isDebounced = true;
      // and provide a way to call the original function immediately
      outputFn.now = function () {
        clearTimeout(timeout);
        return func.apply(this, arguments);
      };
      return outputFn;
    }
    //---------------------------------------------------
    // From lodash
    //---------------------------------------------------
    /** Used to determine if values are of the language type Object */
    var objectTypes = {
      'boolean': false,
      'function': true,
      'object': true,
      'number': false,
      'string': false,
      'undefined': false
    };
    function isObject(value) {
      // check if the value is the ECMAScript language type of Object
      // http://es5.github.io/#x8
      // and avoid a V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      return !!(value && objectTypes[typeof value]);
    }
    /** `Object#toString` result shortcuts */
    var numberClass = '[object Number]';
    /** Used for native method references */
    var objectProto = Object.prototype;
    /** Used to resolve the internal [[Class]] of values */
    var toString = objectProto.toString;
    /**
     * Checks if `value` is a number.
     *
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(8.4 * 5);
     * // => true
     */
    function isNumber(value) {
      return typeof value == 'number' || value && typeof value == 'object' && toString.call(value) == numberClass || false;
    }
    function isFunction(functionToCheck) {
      var getType = {};
      return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    //---------------------------------------------------
    // From underscore.string
    //---------------------------------------------------
    /* jshint ignore:start */
    var nativeTrim = String.prototype.trim;
    function escapeRegExp(str) {
      if (str == null)
        return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
    var defaultToWhiteSpace = function (characters) {
      if (characters == null)
        return '\\s';
      else if (characters.source)
        return characters.source;
      else
        return '[' + escapeRegExp(characters) + ']';
    };
    function trim(str, characters) {
      if (str == null)
        return '';
      if (!characters && nativeTrim)
        return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
    }
    function dasherize(str) {
      return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    }
    /* jshint ignore:end */
    return {
      $: $,
      $$: $$,
      dasherize: dasherize,
      debounce: debounce,
      deepExtend: deepExtend,
      extend: extend,
      isElement: isElement,
      isFunction: isFunction,
      isNaN: isNaN,
      isNumber: isNumber,
      isObject: isObject,
      on: on,
      off: off,
      trim: trim,
      removeAllChildren: removeAllChildren,
      bindMouseEventsToDispatcher: bindMouseEventsToDispatcher
    };
  }();
  // return module
  return module;  //---------------------------------------------------
                  // END code for this module
                  //---------------------------------------------------
}();
var modules_layerOrganizer;
modules_layerOrganizer = function (helper) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------
  //
  // EXAMPLE USAGE:
  //
  // var layers = new d3LayerOrganizer(vis);
  // layers.create([
  //   {'axis': ['bar', 'mark']},
  //   'glass',
  //   'label'
  // ]);
  //
  // Then access the layers via
  // layers.get('axis'),
  // layers.get('axis.bar'),
  // layers.get('axis.mark'),
  // layers.get('glass'),
  // layers.get('label')
  //
  return function (mainContainer, tag) {
    var layers = {};
    tag = tag || 'g';
    function createLayerFromName(container, layerName, prefix) {
      var id = prefix ? prefix + '.' + layerName : layerName;
      if (layers.hasOwnProperty(id)) {
        throw 'invalid or duplicate layer id: ' + id;
      }
      var layer = container.append(tag).classed(helper.dasherize(layerName) + '-layer', true);
      layers[id] = layer;
      return layer;
    }
    function createLayerFromInfo(container, layerInfo, prefix) {
      if (Array.isArray(layerInfo)) {
        return layerInfo.map(function (info) {
          createLayerFromInfo(container, info, prefix);
        });
      } else if (helper.isObject(layerInfo)) {
        var parentKey = Object.keys(layerInfo)[0];
        var parentLayer = createLayerFromName(container, parentKey, prefix);
        createLayerFromInfo(parentLayer, layerInfo[parentKey], prefix ? prefix + '.' + parentKey : parentKey);
        return parentLayer;
      } else {
        return createLayerFromName(container, layerInfo, prefix);
      }
    }
    function createLayer(layerInfo) {
      return createLayerFromInfo(mainContainer, layerInfo);
    }
    function create(layerNames) {
      if (Array.isArray(layerNames)) {
        return layerNames.map(createLayer);
      } else {
        return createLayer(layerNames);
      }
    }
    function get(layerName) {
      return layers[layerName];
    }
    function has(layerName) {
      return !!layers[layerName];
    }
    return {
      create: create,
      get: get,
      has: has
    };
  };  //---------------------------------------------------
      // END code for this module
      //---------------------------------------------------
}(modules_helper);
var modules_skeleton;
modules_skeleton = function (d3, LayerOrganizer, helper) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------
  // Constants
  var DEFAULT_OPTIONS = {
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    },
    offset: [
      0.5,
      0.5
    ],
    initialWidth: 720,
    initialHeight: 500
  };
  var BASE_EVENTS = [
    'data',
    'options',
    'resize'
  ];
  // Core Skeleton
  function Skeleton(chartNode, customOptions, customEvents) {
    var skeleton = {};
    chartNode = helper.$(chartNode);
    var _data = null;
    var _options = helper.deepExtend({}, DEFAULT_OPTIONS, customOptions);
    var _totalWidth = 0;
    var _totalHeight = 0;
    var _innerWidth = 0;
    var _innerHeight = 0;
    var _autoResizeDetection = 'window';
    // either 'window' or 'dom';
    var _autoResizeMode = false;
    var _autoResizeFn = null;
    var _autoResizeToAspectRatio = false;
    // add svg element
    var _svg = d3.select(chartNode).append('svg');
    var _vis = _svg.append('g');
    updateOffset();
    var _layers = new LayerOrganizer(_vis);
    // setup event dispatcher
    var _customEvents = customEvents ? customEvents.concat(BASE_EVENTS) : BASE_EVENTS;
    var _dispatch = d3.dispatch.apply(d3, _customEvents);
    // set default dimension
    dimension([
      _options.initialWidth,
      _options.initialHeight
    ]);
    function data(newValue, doNotDispatch) {
      // getter
      if (arguments.length === 0) {
        return _data;
      }
      // setter
      _data = newValue;
      // dispatch
      if (!doNotDispatch) {
        _dispatch.data(newValue);
      }
      return skeleton;
    }
    function options(newValue, doNotDispatch) {
      // getter
      if (arguments.length === 0) {
        return _options;
      }
      // setter
      _options = helper.deepExtend(_options, newValue);
      if (newValue) {
        if (newValue.margin) {
          updateMargin(doNotDispatch);
        } else if (newValue.offset) {
          // When the margin is changed,
          // updateOffset() is already called within updateMargin()
          // so "else if" is used here instead of "if".
          // This will call updateOffset() manually
          // only when margin is not changed and offset is changed.
          updateOffset();
        }
      }
      // dispatch
      if (!doNotDispatch) {
        _dispatch.options(newValue);
      }
      return skeleton;
    }
    function updateOffset() {
      _vis.attr('transform', 'translate(' + (_options.margin.left + _options.offset[0]) + ',' + (_options.margin.top + _options.offset[1]) + ')');
    }
    function updateMargin(doNotDispatch) {
      updateOffset();
      _innerWidth = _totalWidth - _options.margin.left - _options.margin.right;
      _innerHeight = _totalHeight - _options.margin.top - _options.margin.bottom;
      if (!doNotDispatch) {
        _dispatch.resize([
          _totalWidth,
          _totalHeight,
          _innerWidth,
          _innerHeight
        ]);
      }
    }
    function margin(newValue, doNotDispatch) {
      // getter
      if (arguments.length === 0) {
        return _options.margin;
      }
      // setter
      _options.margin = helper.extend(_options.margin, newValue);
      updateMargin(doNotDispatch);
      return skeleton;
    }
    function offset(newValue) {
      // getter
      if (arguments.length === 0) {
        return _options.offset;
      }
      // setter
      _options.offset = newValue;
      updateOffset();
      return skeleton;
    }
    function width(newValue, doNotDispatch) {
      // getter
      if (arguments.length === 0 || newValue === null || newValue === undefined) {
        return _totalWidth;
      }
      // setter
      if (helper.isNumber(newValue)) {
        _totalWidth = +newValue;
      } else if (newValue.trim().toLowerCase() == 'auto') {
        _totalWidth = chartNode.clientWidth;
      } else {
        _totalWidth = +(newValue + '').replace(/px/gi, '').trim();
      }
      if (helper.isNaN(_totalWidth)) {
        throw Error('invalid width: ' + _totalWidth);
      }
      // round to integer
      _totalWidth = Math.floor(_totalWidth);
      _innerWidth = _totalWidth - _options.margin.left - _options.margin.right;
      _svg.attr('width', _totalWidth);
      // dispatch
      if (!doNotDispatch) {
        _dispatch.resize([
          _totalWidth,
          _totalHeight,
          _innerWidth,
          _innerHeight
        ]);
      }
      return skeleton;
    }
    function height(newValue, doNotDispatch) {
      // getter
      if (arguments.length === 0 || newValue === null || newValue === undefined) {
        return _totalHeight;
      }
      // setter
      if (helper.isNumber(newValue)) {
        _totalHeight = +newValue;
      } else if (newValue.trim().toLowerCase() == 'auto') {
        _totalHeight = chartNode.clientHeight;
      } else {
        _totalHeight = +(newValue + '').replace(/px/gi, '').trim();
      }
      if (helper.isNaN(_totalHeight)) {
        throw Error('invalid height: ' + _totalHeight);
      }
      // round to integer
      _totalHeight = Math.floor(_totalHeight);
      _innerHeight = _totalHeight - _options.margin.top - _options.margin.bottom;
      _svg.attr('height', _totalHeight);
      // dispatch
      if (!doNotDispatch) {
        _dispatch.resize([
          _totalWidth,
          _totalHeight,
          _innerWidth,
          _innerHeight
        ]);
      }
      return skeleton;
    }
    function dimension(values, doNotDispatch) {
      if (arguments.length === 0) {
        return [
          _totalWidth,
          _totalHeight
        ];
      }
      width(values[0], true);
      height(values[1], doNotDispatch);
      return skeleton;
    }
    function autoResize(newMode) {
      if (arguments.length === 0) {
        return _autoResizeMode;
      } else if (_autoResizeMode != newMode) {
        return setupAutoResize(newMode, _autoResizeDetection);
      }
      return skeleton;
    }
    function autoResizeDetection(newDetection) {
      if (arguments.length === 0) {
        return _autoResizeDetection;
      } else if (_autoResizeDetection != newDetection) {
        return setupAutoResize(_autoResizeMode, newDetection);
      }
      return skeleton;
    }
    function autoResizeToAspectRatio(ratio) {
      if (arguments.length === 0) {
        return _autoResizeToAspectRatio;
      }
      if (ratio === null || ratio === undefined || ratio === '' || ratio === false || (ratio + '').toLowerCase() === 'false') {
        _autoResizeToAspectRatio = false;
      } else if (!helper.isNumber(ratio)) {
        _autoResizeToAspectRatio = false;
      } else if (+ratio === 0) {
        _autoResizeToAspectRatio = false;
      } else {
        _autoResizeToAspectRatio = +ratio;
      }
      return skeleton;
    }
    function clearAutoResizeListener() {
      if (_autoResizeFn) {
        switch (_autoResizeDetection) {
        case 'dom':
          helper.off(chartNode, 'resize', _autoResizeFn);
          break;
        default:
        case 'window':
          helper.off(window, 'resize', _autoResizeFn);
          break;
        }
      }
      _autoResizeFn = null;
      return skeleton;
    }
    function setAutoResizeListener(fn) {
      if (fn) {
        switch (_autoResizeDetection) {
        case 'dom':
          helper.on(chartNode, 'resize', fn);
          break;
        default:
        case 'window':
          helper.on(window, 'resize', fn);
          break;
        }
      }
      _autoResizeFn = fn;
      return skeleton;
    }
    function setupAutoResize(newMode, newDetection) {
      newMode = newMode && (newMode + '').toLowerCase() == 'false' ? false : newMode;
      newDetection = newDetection || _autoResizeDetection;
      // check if there is change in listener
      if (newMode != _autoResizeMode) {
        clearAutoResizeListener();
        _autoResizeMode = newMode;
        _autoResizeDetection = newDetection;
        if (newMode) {
          _autoResizeFn = helper.debounce(function () {
            if (_autoResizeToAspectRatio) {
              resizeToFitContainer(_autoResizeMode, true);
              resizeToAspectRatio(_autoResizeToAspectRatio);
            } else {
              resizeToFitContainer(_autoResizeMode);
            }
          }, 100);
          setAutoResizeListener(_autoResizeFn);
        }
      }  // change detection mode only
      else if (newDetection != _autoResizeDetection) {
        var oldAutoResizeFn = _autoResizeFn;
        clearAutoResizeListener();
        _autoResizeDetection = newDetection;
        setAutoResizeListener(oldAutoResizeFn);
      }
      if (_autoResizeFn)
        _autoResizeFn();
      return skeleton;
    }
    function getCustomEventNames() {
      return Object.keys(_dispatch).filter(function (d) {
        return BASE_EVENTS.indexOf(d) < 0;
      });
    }
    function mixin(mixer) {
      var self = skeleton;
      if (helper.isObject(mixer)) {
        Object.keys(mixer).forEach(function (key) {
          self[key] = mixer[key];
        });
      }
      return self;
    }
    // This function is only syntactic sugar
    function resizeToFitContainer(mode, doNotDispatch) {
      switch (mode) {
      case 'all':
      case 'full':
      case 'both':
        dimension([
          'auto',
          'auto'
        ], doNotDispatch);
        break;
      case 'height':
        height('auto', doNotDispatch);
        break;
      default:
      case 'width':
        width('auto', doNotDispatch);
        break;
      }
      return skeleton;
    }
    function resizeToAspectRatio(ratio, doNotDispatch) {
      var w = _totalWidth;
      var h = _totalHeight;
      if (!helper.isNumber(ratio))
        throw 'Invalid ratio: must be a Number';
      ratio = +ratio;
      // no need to resize if already at ratio
      if ((w / h).toFixed(4) == ratio.toFixed(4))
        return skeleton;
      var estimatedH = Math.floor(w / ratio);
      if (estimatedH > h) {
        width(Math.floor(h * ratio), doNotDispatch);
      } else {
        height(estimatedH, doNotDispatch);
      }
      return skeleton;
    }
    function hasData() {
      return _data !== null && _data !== undefined;
    }
    function hasNonZeroArea() {
      return _innerWidth > 0 && _innerHeight > 0;
    }
    // define public fields and functions
    helper.extend(skeleton, {
      // getter only
      getCustomEventNames: getCustomEventNames,
      getDispatcher: function () {
        return _dispatch;
      },
      getInnerWidth: function () {
        return _innerWidth;
      },
      getInnerHeight: function () {
        return _innerHeight;
      },
      getLayerOrganizer: function () {
        return _layers;
      },
      getRootG: function () {
        return _vis;
      },
      getSvg: function () {
        return _svg;
      },
      // getter & setter
      data: data,
      options: options,
      margin: margin,
      offset: offset,
      width: width,
      height: height,
      dimension: dimension,
      autoResize: autoResize,
      autoResizeDetection: autoResizeDetection,
      autoResizeToAspectRatio: autoResizeToAspectRatio,
      // functions
      hasData: hasData,
      hasNonZeroArea: hasNonZeroArea,
      mixin: mixin,
      resizeToFitContainer: resizeToFitContainer,
      resizeToAspectRatio: resizeToAspectRatio
    });
    // bind events
    d3.rebind(skeleton, _dispatch, 'on');
    return skeleton;
  }
  // return module
  return Skeleton;  //---------------------------------------------------
                    // END code for this module
                    //---------------------------------------------------
}(d3, modules_layerOrganizer, modules_helper);
var modules_factory;
modules_factory = function (Skeleton, helper) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------
  var module = function () {
    /**
     * Return a constructor for your custom chart type
     * @param  Object        defaultOptions default options for your chart
     * @param  Array[String] customEvents   list of custom events this chart will dispatch
     * @param  Function      constructor    constructor function function(skeleton){...}
     * @return Function                     function(chartNode, options) that return your chart
     */
    function createChart(defaultOptions, customEvents, constructor) {
      var newChartClass = function (chartNode, options) {
        var skeleton = new Skeleton(chartNode, helper.deepExtend({}, defaultOptions, options), customEvents);
        if (constructor)
          constructor(skeleton);
        return skeleton;
      };
      customEvents = customEvents ? customEvents : [];
      /**
       * Return supported custom events for this chart class.
       * This is a static method for class, not instance method.
       * @return Array[String] names of custom events
       */
      newChartClass.getCustomEvents = function () {
        return customEvents;
      };
      return newChartClass;
    }
    return { createChart: createChart };
  }();
  // return module
  return module;  //---------------------------------------------------
                  // END code for this module
                  //---------------------------------------------------
}(modules_skeleton, modules_helper);
var modules_chartlet;
modules_chartlet = function (d3, helper) {
  function NOOP(selection, done) {
    done();
  }
  function Chartlet(enter, update, exit, customEvents) {
    update = update || NOOP;
    exit = exit || NOOP;
    customEvents = customEvents || [];
    var _propertyCache = {};
    var _dispatch = d3.dispatch.apply(d3, [
      'enterDone',
      'updateDone',
      'exitDone'
    ].concat(customEvents));
    // getter and setter of chartlet properties
    function property(name, value) {
      // if functioning as a setter, set property in cache
      if (arguments.length > 1) {
        _propertyCache[name] = d3.functor(value);
        return this;
      }
      // functioning as a getter, return property accessor
      return d3.functor(_propertyCache[name]);
    }
    function getPropertyValue(name, d, i) {
      return property(name)(d, i);
    }
    function _wrapAction(action, doneHookName) {
      return function (selection) {
        action(selection, helper.debounce(function (d, i) {
          var doneHook = _dispatch[doneHookName];
          if (doneHook) {
            doneHook(selection);
          }
        }), 5);
      };
    }
    function inheritPropertyFrom(chartlet, from, to) {
      _propertyCache[to || from] = function (d, i) {
        return chartlet.property(from)(d, i);
      };
      return this;
    }
    function inheritPropertiesFrom(chartlet, froms, tos) {
      froms.forEach(function (from, i) {
        inheritPropertyFrom(chartlet, from, tos && i < tos.length ? tos[i] : undefined);
      });
      return this;
    }
    function publishEventsTo(foreignDispatcher) {
      customEvents.forEach(function (event) {
        _dispatch.on(event, foreignDispatcher[event]);
      });
      return this;
    }
    function getCustomEventNames() {
      return customEvents;
    }
    // exports
    var exports = {
      // for use by child chartlet
      getDispatcher: function () {
        return _dispatch;
      },
      getPropertyValue: getPropertyValue,
      inheritPropertyFrom: inheritPropertyFrom,
      inheritPropertiesFrom: inheritPropertiesFrom,
      publishEventsTo: publishEventsTo,
      getCustomEventNames: getCustomEventNames,
      property: property,
      enter: _wrapAction(enter, 'enterDone'),
      update: _wrapAction(update, 'updateDone'),
      exit: _wrapAction(exit, 'exitDone')
    };
    // bind events to exports
    d3.rebind(exports, _dispatch, 'on');
    // return exports
    return exports;
  }
  // return module
  return Chartlet;
}(d3, modules_helper);
var d3kit;
d3kit = function (factory, helper, Skeleton, LayerOrganizer, Chartlet) {
  return {
    factory: factory,
    helper: helper,
    Skeleton: Skeleton,
    LayerOrganizer: LayerOrganizer,
    Chartlet: Chartlet
  };
}(modules_factory, modules_helper, modules_skeleton, modules_layerOrganizer, modules_chartlet);


  return d3kit;

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));
