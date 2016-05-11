var base, base1, base2, base3;

if (window.Epoch == null) {
  window.Epoch = {};
}

if ((base = window.Epoch).Chart == null) {
  base.Chart = {};
}

if ((base1 = window.Epoch).Time == null) {
  base1.Time = {};
}

if ((base2 = window.Epoch).Util == null) {
  base2.Util = {};
}

if ((base3 = window.Epoch).Formats == null) {
  base3.Formats = {};
}

Epoch.warn = function(msg) {
  return (console.warn || console.log)("Epoch Warning: " + msg);
};

Epoch.exception = function(msg) {
  throw "Epoch Error: " + msg;
};

Epoch.TestContext = (function() {
  var VOID_METHODS;

  VOID_METHODS = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo', 'clearRect', 'clip', 'closePath', 'drawImage', 'fill', 'fillRect', 'fillText', 'moveTo', 'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save', 'scale', 'scrollPathIntoView', 'setLineDash', 'setTransform', 'stroke', 'strokeRect', 'strokeText', 'transform', 'translate', 'lineTo'];

  function TestContext() {
    var i, len, method;
    this._log = [];
    for (i = 0, len = VOID_METHODS.length; i < len; i++) {
      method = VOID_METHODS[i];
      this._makeFauxMethod(method);
    }
  }

  TestContext.prototype._makeFauxMethod = function(name) {
    return this[name] = function() {
      var arg;
      return this._log.push(name + "(" + (((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = arguments.length; i < len; i++) {
          arg = arguments[i];
          results.push(arg.toString());
        }
        return results;
      }).apply(this, arguments)).join(',')) + ")");
    };
  };

  TestContext.prototype.getImageData = function() {
    var arg;
    this._log.push("getImageData(" + (((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = arguments.length; i < len; i++) {
        arg = arguments[i];
        results.push(arg.toString());
      }
      return results;
    }).apply(this, arguments)).join(',')) + ")");
    return {
      width: 0,
      height: 0,
      resolution: 1.0,
      data: []
    };
  };

  return TestContext;

})();

var ref, typeFunction,
  hasProp = {}.hasOwnProperty;

typeFunction = function(objectName) {
  return function(v) {
    return Object.prototype.toString.call(v) === ("[object " + objectName + "]");
  };
};

Epoch.isArray = (ref = Array.isArray) != null ? ref : typeFunction('Array');

Epoch.isObject = typeFunction('Object');

Epoch.isString = typeFunction('String');

Epoch.isFunction = typeFunction('Function');

Epoch.isNumber = typeFunction('Number');

Epoch.isElement = function(v) {
  if (typeof HTMLElement !== "undefined" && HTMLElement !== null) {
    return v instanceof HTMLElement;
  } else {
    return (v != null) && Epoch.isObject(v) && v.nodeType === 1 && Epoch.isString(v.nodeName);
  }
};

Epoch.isNonEmptyArray = function(v) {
  return Epoch.isArray(v) && v.length > 0;
};

Epoch.Util.copy = function(original) {
  var copy, k, v;
  if (original == null) {
    return null;
  }
  copy = {};
  for (k in original) {
    if (!hasProp.call(original, k)) continue;
    v = original[k];
    copy[k] = v;
  }
  return copy;
};

Epoch.Util.defaults = function(options, defaults) {
  var bothAreObjects, def, k, opt, result, v;
  result = Epoch.Util.copy(options);
  for (k in defaults) {
    if (!hasProp.call(defaults, k)) continue;
    v = defaults[k];
    opt = options[k];
    def = defaults[k];
    bothAreObjects = Epoch.isObject(opt) && Epoch.isObject(def);
    if ((opt != null) && (def != null)) {
      if (bothAreObjects && !Epoch.isArray(opt)) {
        result[k] = Epoch.Util.defaults(opt, def);
      } else {
        result[k] = opt;
      }
    } else if (opt != null) {
      result[k] = opt;
    } else {
      result[k] = def;
    }
  }
  return result;
};

Epoch.Util.formatSI = function(v, fixed, fixIntegers) {
  var base, i, label, q, ref1;
  if (fixed == null) {
    fixed = 1;
  }
  if (fixIntegers == null) {
    fixIntegers = false;
  }
  if (v < 1000) {
    q = v;
    if (!((q | 0) === q && !fixIntegers)) {
      q = q.toFixed(fixed);
    }
    return q;
  }
  ref1 = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  for (i in ref1) {
    if (!hasProp.call(ref1, i)) continue;
    label = ref1[i];
    base = Math.pow(10, ((i | 0) + 1) * 3);
    if (v >= base && v < Math.pow(10, ((i | 0) + 2) * 3)) {
      q = v / base;
      if (!((q % 1) === 0 && !fixIntegers)) {
        q = q.toFixed(fixed);
      }
      return q + " " + label;
    }
  }
};

Epoch.Util.formatBytes = function(v, fixed, fix_integers) {
  var base, i, label, q, ref1;
  if (fixed == null) {
    fixed = 1;
  }
  if (fix_integers == null) {
    fix_integers = false;
  }
  if (v < 1024) {
    q = v;
    if (!((q % 1) === 0 && !fix_integers)) {
      q = q.toFixed(fixed);
    }
    return q + " B";
  }
  ref1 = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  for (i in ref1) {
    if (!hasProp.call(ref1, i)) continue;
    label = ref1[i];
    base = Math.pow(1024, (i | 0) + 1);
    if (v >= base && v < Math.pow(1024, (i | 0) + 2)) {
      q = v / base;
      if (!((q % 1) === 0 && !fix_integers)) {
        q = q.toFixed(fixed);
      }
      return q + " " + label;
    }
  }
};

Epoch.Util.dasherize = function(str) {
  return Epoch.Util.trim(str).replace("\n", '').replace(/\s+/g, '-').toLowerCase();
};

Epoch.Util.domain = function(layers, key) {
  var domain, entry, j, l, layer, len, len1, ref1, set;
  if (key == null) {
    key = 'x';
  }
  set = {};
  domain = [];
  for (j = 0, len = layers.length; j < len; j++) {
    layer = layers[j];
    ref1 = layer.values;
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      entry = ref1[l];
      if (set[entry[key]] != null) {
        continue;
      }
      domain.push(entry[key]);
      set[entry[key]] = true;
    }
  }
  return domain;
};

Epoch.Util.trim = function(string) {
  if (!Epoch.isString(string)) {
    return null;
  }
  return string.replace(/^\s+/g, '').replace(/\s+$/g, '');
};

Epoch.Util.getComputedStyle = function(element, pseudoElement) {
  if (Epoch.isFunction(window.getComputedStyle)) {
    return window.getComputedStyle(element, pseudoElement);
  } else if (element.currentStyle != null) {
    return element.currentStyle;
  }
};

Epoch.Util.toRGBA = function(color, opacity) {
  var all, b, g, parts, r, result, v;
  if ((parts = color.match(/^rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*[0-9\.]+\)/))) {
    all = parts[0], r = parts[1], g = parts[2], b = parts[3];
    result = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  } else if ((v = d3.rgb(color))) {
    result = "rgba(" + v.r + "," + v.g + "," + v.b + "," + opacity + ")";
  }
  return result;
};

Epoch.Util.getContext = function(node, type) {
  if (type == null) {
    type = '2d';
  }
  return node.getContext(type);
};

Epoch.Events = (function() {
  function Events() {
    this._events = {};
  }

  Events.prototype.on = function(name, callback) {
    var base1;
    if (callback == null) {
      return;
    }
    if ((base1 = this._events)[name] == null) {
      base1[name] = [];
    }
    return this._events[name].push(callback);
  };

  Events.prototype.onAll = function(map) {
    var callback, name, results;
    if (!Epoch.isObject(map)) {
      return;
    }
    results = [];
    for (name in map) {
      if (!hasProp.call(map, name)) continue;
      callback = map[name];
      results.push(this.on(name, callback));
    }
    return results;
  };

  Events.prototype.off = function(name, callback) {
    var i, results;
    if (!Epoch.isArray(this._events[name])) {
      return;
    }
    if (callback == null) {
      return delete this._events[name];
    }
    results = [];
    while ((i = this._events[name].indexOf(callback)) >= 0) {
      results.push(this._events[name].splice(i, 1));
    }
    return results;
  };

  Events.prototype.offAll = function(mapOrList) {
    var callback, j, len, name, results, results1;
    if (Epoch.isArray(mapOrList)) {
      results = [];
      for (j = 0, len = mapOrList.length; j < len; j++) {
        name = mapOrList[j];
        results.push(this.off(name));
      }
      return results;
    } else if (Epoch.isObject(mapOrList)) {
      results1 = [];
      for (name in mapOrList) {
        if (!hasProp.call(mapOrList, name)) continue;
        callback = mapOrList[name];
        results1.push(this.off(name, callback));
      }
      return results1;
    }
  };

  Events.prototype.trigger = function(name) {
    var args, callback, fn, i, j, len, ref1, results;
    if (this._events[name] == null) {
      return;
    }
    args = (function() {
      var j, ref1, results;
      results = [];
      for (i = j = 1, ref1 = arguments.length; 1 <= ref1 ? j < ref1 : j > ref1; i = 1 <= ref1 ? ++j : --j) {
        results.push(arguments[i]);
      }
      return results;
    }).apply(this, arguments);
    ref1 = this._events[name];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      callback = ref1[j];
      fn = null;
      if (Epoch.isString(callback)) {
        fn = this[callback];
      } else if (Epoch.isFunction(callback)) {
        fn = callback;
      }
      if (fn == null) {
        Epoch.exception("Callback for event '" + name + "' is not a function or reference to a method.");
      }
      results.push(fn.apply(this, args));
    }
    return results;
  };

  return Events;

})();

Epoch.Util.flatten = function(multiarray) {
  var array, item, j, l, len, len1, result;
  if (!Array.isArray(multiarray)) {
    throw new Error('Epoch.Util.flatten only accepts arrays');
  }
  result = [];
  for (j = 0, len = multiarray.length; j < len; j++) {
    array = multiarray[j];
    if (Array.isArray(array)) {
      for (l = 0, len1 = array.length; l < len1; l++) {
        item = array[l];
        result.push(item);
      }
    } else {
      result.push(array);
    }
  }
  return result;
};

d3.selection.prototype.width = function(value) {
  if ((value != null) && Epoch.isString(value)) {
    return this.style('width', value);
  } else if ((value != null) && Epoch.isNumber(value)) {
    return this.style('width', value + "px");
  } else {
    return +Epoch.Util.getComputedStyle(this.node(), null).width.replace('px', '');
  }
};

d3.selection.prototype.height = function(value) {
  if ((value != null) && Epoch.isString(value)) {
    return this.style('height', value);
  } else if ((value != null) && Epoch.isNumber(value)) {
    return this.style('height', value + "px");
  } else {
    return +Epoch.Util.getComputedStyle(this.node(), null).height.replace('px', '');
  }
};

var d3Seconds;

Epoch.Formats.regular = function(d) {
  return d;
};

Epoch.Formats.si = function(d) {
  return Epoch.Util.formatSI(d);
};

Epoch.Formats.percent = function(d) {
  return (d * 100).toFixed(1) + "%";
};

Epoch.Formats.seconds = function(t) {
  return d3Seconds(new Date(t * 1000));
};

d3Seconds = d3.time.format('%I:%M:%S %p');

Epoch.Formats.bytes = function(d) {
  return Epoch.Util.formatBytes(d);
};

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Base = (function(superClass) {
  var defaults, optionListeners;

  extend(Base, superClass);

  defaults = {
    width: 320,
    height: 240,
    dataFormat: null
  };

  optionListeners = {
    'option:width': 'dimensionsChanged',
    'option:height': 'dimensionsChanged',
    'layer:shown': 'layerChanged',
    'layer:hidden': 'layerChanged'
  };

  function Base(options1) {
    this.options = options1 != null ? options1 : {};
    Base.__super__.constructor.call(this);
    if (this.options.model) {
      if (this.options.model.hasData() != null) {
        this.setData(this.options.model.getData(this.options.type, this.options.dataFormat));
      } else {
        this.setData(this.options.data || []);
      }
      this.options.model.on('data:updated', (function(_this) {
        return function() {
          return _this.setDataFromModel();
        };
      })(this));
    } else {
      this.setData(this.options.data || []);
    }
    if (this.options.el != null) {
      this.el = d3.select(this.options.el);
    }
    this.width = this.options.width;
    this.height = this.options.height;
    if (this.el != null) {
      if (this.width == null) {
        this.width = this.el.width();
      }
      if (this.height == null) {
        this.height = this.el.height();
      }
    } else {
      if (this.width == null) {
        this.width = defaults.width;
      }
      if (this.height == null) {
        this.height = defaults.height;
      }
      this.el = d3.select(document.createElement('DIV')).attr('width', this.width).attr('height', this.height);
    }
    this.onAll(optionListeners);
  }

  Base.prototype._getAllOptions = function() {
    return Epoch.Util.defaults({}, this.options);
  };

  Base.prototype._getOption = function(key) {
    var parts, scope, subkey;
    parts = key.split('.');
    scope = this.options;
    while (parts.length && (scope != null)) {
      subkey = parts.shift();
      scope = scope[subkey];
    }
    return scope;
  };

  Base.prototype._setOption = function(key, value) {
    var parts, scope, subkey;
    parts = key.split('.');
    scope = this.options;
    while (parts.length) {
      subkey = parts.shift();
      if (parts.length === 0) {
        scope[subkey] = arguments[1];
        this.trigger("option:" + arguments[0]);
        return;
      }
      if (scope[subkey] == null) {
        scope[subkey] = {};
      }
      scope = scope[subkey];
    }
  };

  Base.prototype._setManyOptions = function(options, prefix) {
    var key, results, value;
    if (prefix == null) {
      prefix = '';
    }
    results = [];
    for (key in options) {
      if (!hasProp.call(options, key)) continue;
      value = options[key];
      if (Epoch.isObject(value)) {
        results.push(this._setManyOptions(value, (prefix + key) + "."));
      } else {
        results.push(this._setOption(prefix + key, value));
      }
    }
    return results;
  };

  Base.prototype.option = function() {
    if (arguments.length === 0) {
      return this._getAllOptions();
    } else if (arguments.length === 1 && Epoch.isString(arguments[0])) {
      return this._getOption(arguments[0]);
    } else if (arguments.length === 2 && Epoch.isString(arguments[0])) {
      return this._setOption(arguments[0], arguments[1]);
    } else if (arguments.length === 1 && Epoch.isObject(arguments[0])) {
      return this._setManyOptions(arguments[0]);
    }
  };

  Base.prototype.setDataFromModel = function() {
    var prepared;
    prepared = this._prepareData(this.options.model.getData(this.options.type, this.options.dataFormat));
    this.data = this._annotateLayers(prepared);
    return this.draw();
  };

  Base.prototype.setData = function(data, options) {
    var prepared;
    if (options == null) {
      options = {};
    }
    prepared = this._prepareData((this.rawData = this._formatData(data)));
    return this.data = this._annotateLayers(prepared);
  };

  Base.prototype._prepareData = function(data) {
    return data;
  };

  Base.prototype._formatData = function(data) {
    return Epoch.Data.formatData(data, this.options.type, this.options.dataFormat);
  };

  Base.prototype._annotateLayers = function(data) {
    var category, classes, i, layer, len;
    category = 1;
    for (i = 0, len = data.length; i < len; i++) {
      layer = data[i];
      classes = ['layer'];
      classes.push("category" + category);
      layer.category = category;
      layer.visible = true;
      if (layer.label != null) {
        classes.push(Epoch.Util.dasherize(layer.label));
      }
      layer.className = classes.join(' ');
      category++;
    }
    return data;
  };

  Base.prototype._findLayer = function(labelOrIndex) {
    var i, index, l, layer, len, ref;
    layer = null;
    if (Epoch.isString(labelOrIndex)) {
      ref = this.data;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        if (l.label === labelOrIndex) {
          layer = l;
          break;
        }
      }
    } else if (Epoch.isNumber(labelOrIndex)) {
      index = parseInt(labelOrIndex);
      if (!(index < 0 || index >= this.data.length)) {
        layer = this.data[index];
      }
    }
    return layer;
  };

  Base.prototype.showLayer = function(labelOrIndex) {
    var layer;
    if (!(layer = this._findLayer(labelOrIndex))) {
      return;
    }
    if (layer.visible) {
      return;
    }
    layer.visible = true;
    return this.trigger('layer:shown');
  };

  Base.prototype.hideLayer = function(labelOrIndex) {
    var layer;
    if (!(layer = this._findLayer(labelOrIndex))) {
      return;
    }
    if (!layer.visible) {
      return;
    }
    layer.visible = false;
    return this.trigger('layer:hidden');
  };

  Base.prototype.toggleLayer = function(labelOrIndex) {
    var layer;
    if (!(layer = this._findLayer(labelOrIndex))) {
      return;
    }
    layer.visible = !layer.visible;
    if (layer.visible) {
      return this.trigger('layer:shown');
    } else {
      return this.trigger('layer:hidden');
    }
  };

  Base.prototype.isLayerVisible = function(labelOrIndex) {
    var layer;
    if (!(layer = this._findLayer(labelOrIndex))) {
      return null;
    }
    return layer.visible;
  };

  Base.prototype.getVisibleLayers = function() {
    return this.data.filter(function(layer) {
      return layer.visible;
    });
  };

  Base.prototype.update = function(data, draw) {
    if (draw == null) {
      draw = true;
    }
    this.setData(data);
    if (draw) {
      return this.draw();
    }
  };

  Base.prototype.draw = function() {
    return this.trigger('draw');
  };

  Base.prototype._getScaleDomain = function(givenDomain) {
    var layers, maxFn, minFn, values;
    if (Array.isArray(givenDomain)) {
      return givenDomain;
    }
    if (Epoch.isString(givenDomain)) {
      layers = this.getVisibleLayers().filter(function(l) {
        return l.range === givenDomain;
      }).map(function(l) {
        return l.values;
      });
      if ((layers != null) && layers.length) {
        values = Epoch.Util.flatten(layers).map(function(d) {
          return d.y;
        });
        minFn = function(memo, curr) {
          if (curr < memo) {
            return curr;
          } else {
            return memo;
          }
        };
        maxFn = function(memo, curr) {
          if (curr > memo) {
            return curr;
          } else {
            return memo;
          }
        };
        return [values.reduce(minFn, values[0]), values.reduce(maxFn, values[0])];
      }
    }
    if (Array.isArray(this.options.range)) {
      return this.options.range;
    } else if (this.options.range && Array.isArray(this.options.range.left)) {
      return this.options.range.left;
    } else if (this.options.range && Array.isArray(this.options.range.right)) {
      return this.options.range.right;
    } else {
      return this.extent(function(d) {
        return d.y;
      });
    }
  };

  Base.prototype.extent = function(cmp) {
    return [
      d3.min(this.getVisibleLayers(), function(layer) {
        return d3.min(layer.values, cmp);
      }), d3.max(this.getVisibleLayers(), function(layer) {
        return d3.max(layer.values, cmp);
      })
    ];
  };

  Base.prototype.dimensionsChanged = function() {
    this.width = this.option('width') || this.width;
    this.height = this.option('height') || this.height;
    this.el.width(this.width);
    return this.el.height(this.height);
  };

  Base.prototype.layerChanged = function() {
    return this.draw();
  };

  return Base;

})(Epoch.Events);

Epoch.Chart.SVG = (function(superClass) {
  extend(SVG, superClass);

  function SVG(options1) {
    this.options = options1 != null ? options1 : {};
    SVG.__super__.constructor.call(this, this.options);
    if (this.el != null) {
      this.svg = this.el.append('svg');
    } else {
      this.svg = d3.select(document.createElement('svg'));
    }
    this.svg.attr({
      xmlns: 'http://www.w3.org/2000/svg',
      width: this.width,
      height: this.height
    });
  }

  SVG.prototype.dimensionsChanged = function() {
    SVG.__super__.dimensionsChanged.call(this);
    return this.svg.attr('width', this.width).attr('height', this.height);
  };

  return SVG;

})(Epoch.Chart.Base);

Epoch.Chart.Canvas = (function(superClass) {
  extend(Canvas, superClass);

  function Canvas(options1) {
    this.options = options1 != null ? options1 : {};
    Canvas.__super__.constructor.call(this, this.options);
    if (this.options.pixelRatio != null) {
      this.pixelRatio = this.options.pixelRatio;
    } else if (window.devicePixelRatio != null) {
      this.pixelRatio = window.devicePixelRatio;
    } else {
      this.pixelRatio = 1;
    }
    this.canvas = d3.select(document.createElement('CANVAS'));
    this.canvas.style({
      'width': this.width + "px",
      'height': this.height + "px"
    });
    this.canvas.attr({
      width: this.getWidth(),
      height: this.getHeight()
    });
    if (this.el != null) {
      this.el.node().appendChild(this.canvas.node());
    }
    this.ctx = Epoch.Util.getContext(this.canvas.node());
  }

  Canvas.prototype.getWidth = function() {
    return this.width * this.pixelRatio;
  };

  Canvas.prototype.getHeight = function() {
    return this.height * this.pixelRatio;
  };

  Canvas.prototype.clear = function() {
    return this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
  };

  Canvas.prototype.getStyles = function(selector) {
    return Epoch.QueryCSS.getStyles(selector, this.el);
  };

  Canvas.prototype.dimensionsChanged = function() {
    Canvas.__super__.dimensionsChanged.call(this);
    this.canvas.style({
      'width': this.width + "px",
      'height': this.height + "px"
    });
    return this.canvas.attr({
      width: this.getWidth(),
      height: this.getHeight()
    });
  };

  Canvas.prototype.redraw = function() {
    Epoch.QueryCSS.purge();
    return this.draw();
  };

  return Canvas;

})(Epoch.Chart.Base);

var QueryCSS;

QueryCSS = (function() {
  var CONTAINER_HASH_ATTR, PUT_EXPR, REFERENCE_CONTAINER_ID, containerCount, logging, nextContainerId, put;

  function QueryCSS() {}

  REFERENCE_CONTAINER_ID = '_canvas_css_reference';

  CONTAINER_HASH_ATTR = 'data-epoch-container-id';

  containerCount = 0;

  nextContainerId = function() {
    return "epoch-container-" + (containerCount++);
  };

  PUT_EXPR = /^([^#. ]+)?(#[^. ]+)?(\.[^# ]+)?$/;

  logging = false;

  put = function(selector) {
    var classNames, element, id, match, tag, whole;
    match = selector.match(PUT_EXPR);
    if (match == null) {
      return Epoch.error('Query CSS cannot match given selector: ' + selector);
    }
    whole = match[0], tag = match[1], id = match[2], classNames = match[3];
    tag = (tag != null ? tag : 'div').toUpperCase();
    element = document.createElement(tag);
    if (id != null) {
      element.id = id.substr(1);
    }
    if (classNames != null) {
      element.className = classNames.substr(1).replace(/\./g, ' ');
    }
    return element;
  };

  QueryCSS.log = function(b) {
    return logging = b;
  };

  QueryCSS.cache = {};

  QueryCSS.styleList = ['fill', 'stroke', 'stroke-width'];

  QueryCSS.container = null;

  QueryCSS.purge = function() {
    return QueryCSS.cache = {};
  };

  QueryCSS.getContainer = function() {
    var container;
    if (QueryCSS.container != null) {
      return QueryCSS.container;
    }
    container = document.createElement('DIV');
    container.id = REFERENCE_CONTAINER_ID;
    document.body.appendChild(container);
    return QueryCSS.container = d3.select(container);
  };

  QueryCSS.hash = function(selector, container) {
    var containerId;
    containerId = container.attr(CONTAINER_HASH_ATTR);
    if (containerId == null) {
      containerId = nextContainerId();
      container.attr(CONTAINER_HASH_ATTR, containerId);
    }
    return containerId + "__" + selector;
  };

  QueryCSS.getStyles = function(selector, container) {
    var cache, cacheKey, el, element, i, j, k, len, len1, len2, name, parent, parentNode, parents, ref, ref1, ref2, root, sel, selectorList, styles, subSelector;
    cacheKey = QueryCSS.hash(selector, container);
    cache = QueryCSS.cache[cacheKey];
    if (cache != null) {
      return cache;
    }
    parents = [];
    parentNode = container.node().parentNode;
    while ((parentNode != null) && parentNode.nodeName.toLowerCase() !== 'body') {
      parents.unshift(parentNode);
      parentNode = parentNode.parentNode;
    }
    parents.push(container.node());
    selectorList = [];
    for (i = 0, len = parents.length; i < len; i++) {
      element = parents[i];
      sel = element.nodeName.toLowerCase();
      if ((element.id != null) && element.id.length > 0) {
        sel += '#' + element.id;
      }
      if ((element.className != null) && element.className.length > 0) {
        sel += '.' + Epoch.Util.trim(element.className).replace(/\s+/g, '.');
      }
      selectorList.push(sel);
    }
    selectorList.push('svg');
    ref1 = Epoch.Util.trim(selector).split(/\s+/);
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      subSelector = ref1[j];
      selectorList.push(subSelector);
    }
    if (logging) {
      console.log(selectorList);
    }
    parent = root = put(selectorList.shift());
    while (selectorList.length) {
      el = put(selectorList.shift());
      parent.appendChild(el);
      parent = el;
    }
    if (logging) {
      console.log(root);
    }
    QueryCSS.getContainer().node().appendChild(root);
    ref = d3.select('#' + REFERENCE_CONTAINER_ID + ' ' + selector);
    styles = {};
    ref2 = QueryCSS.styleList;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      name = ref2[k];
      styles[name] = ref.style(name);
    }
    QueryCSS.cache[cacheKey] = styles;
    QueryCSS.getContainer().html('');
    return styles;
  };

  return QueryCSS;

})();

Epoch.QueryCSS = QueryCSS;

var applyLayerLabel, base,
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

if (Epoch.Data == null) {
  Epoch.Data = {};
}

if ((base = Epoch.Data).Format == null) {
  base.Format = {};
}

applyLayerLabel = function(layer, options, i, keys) {
  var autoLabels, keyLabels, label, labels, ref;
  if (keys == null) {
    keys = [];
  }
  ref = [options.labels, options.autoLabels, options.keyLabels], labels = ref[0], autoLabels = ref[1], keyLabels = ref[2];
  if ((labels != null) && Epoch.isArray(labels) && labels.length > i) {
    layer.label = labels[i];
  } else if (keyLabels && keys.length > i) {
    layer.label = keys[i];
  } else if (autoLabels) {
    label = [];
    while (i >= 0) {
      label.push(String.fromCharCode(65 + (i % 26)));
      i -= 26;
    }
    layer.label = label.join('');
  }
  return layer;
};

Epoch.Data.Format.array = (function() {
  var buildLayers, defaultOptions, format, formatBasicPlot, formatHeatmap, formatPie, formatTimePlot;
  defaultOptions = {
    x: function(d, i) {
      return i;
    },
    y: function(d, i) {
      return d;
    },
    time: function(d, i, startTime) {
      return parseInt(startTime) + parseInt(i);
    },
    type: 'area',
    autoLabels: false,
    labels: [],
    startTime: parseInt(new Date().getTime() / 1000)
  };
  buildLayers = function(data, options, mapFn) {
    var i, result, series;
    result = [];
    if (Epoch.isArray(data[0])) {
      for (i in data) {
        if (!hasProp.call(data, i)) continue;
        series = data[i];
        result.push(applyLayerLabel({
          values: series.map(mapFn)
        }, options, parseInt(i)));
      }
    } else {
      result.push(applyLayerLabel({
        values: data.map(mapFn)
      }, options, 0));
    }
    return result;
  };
  formatBasicPlot = function(data, options) {
    return buildLayers(data, options, function(d, i) {
      return {
        x: options.x(d, i),
        y: options.y(d, i)
      };
    });
  };
  formatTimePlot = function(data, options) {
    return buildLayers(data, options, function(d, i) {
      return {
        time: options.time(d, i, options.startTime),
        y: options.y(d, i)
      };
    });
  };
  formatHeatmap = function(data, options) {
    return buildLayers(data, options, function(d, i) {
      return {
        time: options.time(d, i, options.startTime),
        histogram: d
      };
    });
  };
  formatPie = function(data, options) {
    var i, result, v;
    result = [];
    for (i in data) {
      if (!hasProp.call(data, i)) continue;
      v = data[i];
      if (!Epoch.isNumber(data[0])) {
        return [];
      }
      result.push(applyLayerLabel({
        value: v
      }, options, i));
    }
    return result;
  };
  format = function(data, options) {
    var opt;
    if (data == null) {
      data = [];
    }
    if (options == null) {
      options = {};
    }
    if (!Epoch.isNonEmptyArray(data)) {
      return [];
    }
    opt = Epoch.Util.defaults(options, defaultOptions);
    if (opt.type === 'time.heatmap') {
      return formatHeatmap(data, opt);
    } else if (opt.type.match(/^time\./)) {
      return formatTimePlot(data, opt);
    } else if (opt.type === 'pie') {
      return formatPie(data, opt);
    } else {
      return formatBasicPlot(data, opt);
    }
  };
  format.entry = function(datum, options) {
    var d, data, k, layer, len, opt, ref, results;
    if (options == null) {
      options = {};
    }
    if (options.type === 'time.gauge') {
      if (datum == null) {
        return 0;
      }
      opt = Epoch.Util.defaults(options, defaultOptions);
      d = Epoch.isArray(datum) ? datum[0] : datum;
      return opt.y(d, 0);
    }
    if (datum == null) {
      return [];
    }
    if (options.startTime == null) {
      options.startTime = parseInt(new Date().getTime() / 1000);
    }
    if (Epoch.isArray(datum)) {
      data = datum.map(function(d) {
        return [d];
      });
    } else {
      data = [datum];
    }
    ref = format(data, options);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      layer = ref[k];
      results.push(layer.values[0]);
    }
    return results;
  };
  return format;
})();

Epoch.Data.Format.tuple = (function() {
  var buildLayers, defaultOptions, format;
  defaultOptions = {
    x: function(d, i) {
      return d;
    },
    y: function(d, i) {
      return d;
    },
    time: function(d, i) {
      return d;
    },
    type: 'area',
    autoLabels: false,
    labels: []
  };
  buildLayers = function(data, options, mapFn) {
    var i, result, series;
    if (!Epoch.isArray(data[0])) {
      return [];
    }
    result = [];
    if (Epoch.isArray(data[0][0])) {
      for (i in data) {
        if (!hasProp.call(data, i)) continue;
        series = data[i];
        result.push(applyLayerLabel({
          values: series.map(mapFn)
        }, options, parseInt(i)));
      }
    } else {
      result.push(applyLayerLabel({
        values: data.map(mapFn)
      }, options, 0));
    }
    return result;
  };
  format = function(data, options) {
    var opt;
    if (data == null) {
      data = [];
    }
    if (options == null) {
      options = {};
    }
    if (!Epoch.isNonEmptyArray(data)) {
      return [];
    }
    opt = Epoch.Util.defaults(options, defaultOptions);
    if (opt.type === 'pie' || opt.type === 'time.heatmap' || opt.type === 'time.gauge') {
      return [];
    } else if (opt.type.match(/^time\./)) {
      return buildLayers(data, opt, function(d, i) {
        return {
          time: opt.time(d[0], parseInt(i)),
          y: opt.y(d[1], parseInt(i))
        };
      });
    } else {
      return buildLayers(data, opt, function(d, i) {
        return {
          x: opt.x(d[0], parseInt(i)),
          y: opt.y(d[1], parseInt(i))
        };
      });
    }
  };
  format.entry = function(datum, options) {
    var data, k, layer, len, ref, results;
    if (options == null) {
      options = {};
    }
    if (datum == null) {
      return [];
    }
    if (options.startTime == null) {
      options.startTime = parseInt(new Date().getTime() / 1000);
    }
    if (Epoch.isArray(datum) && Epoch.isArray(datum[0])) {
      data = datum.map(function(d) {
        return [d];
      });
    } else {
      data = [datum];
    }
    ref = format(data, options);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      layer = ref[k];
      results.push(layer.values[0]);
    }
    return results;
  };
  return format;
})();

Epoch.Data.Format.keyvalue = (function() {
  var buildLayers, defaultOptions, format, formatBasicPlot, formatTimePlot;
  defaultOptions = {
    type: 'area',
    x: function(d, i) {
      return parseInt(i);
    },
    y: function(d, i) {
      return d;
    },
    time: function(d, i, startTime) {
      return parseInt(startTime) + parseInt(i);
    },
    labels: [],
    autoLabels: false,
    keyLabels: true,
    startTime: parseInt(new Date().getTime() / 1000)
  };
  buildLayers = function(data, keys, options, mapFn) {
    var d, i, j, key, result, values;
    result = [];
    for (j in keys) {
      if (!hasProp.call(keys, j)) continue;
      key = keys[j];
      values = [];
      for (i in data) {
        if (!hasProp.call(data, i)) continue;
        d = data[i];
        values.push(mapFn(d, key, parseInt(i)));
      }
      result.push(applyLayerLabel({
        values: values
      }, options, parseInt(j), keys));
    }
    return result;
  };
  formatBasicPlot = function(data, keys, options) {
    return buildLayers(data, keys, options, function(d, key, i) {
      var x;
      if (Epoch.isString(options.x)) {
        x = d[options.x];
      } else {
        x = options.x(d, parseInt(i));
      }
      return {
        x: x,
        y: options.y(d[key], parseInt(i))
      };
    });
  };
  formatTimePlot = function(data, keys, options, rangeName) {
    if (rangeName == null) {
      rangeName = 'y';
    }
    return buildLayers(data, keys, options, function(d, key, i) {
      var value;
      if (Epoch.isString(options.time)) {
        value = {
          time: d[options.time]
        };
      } else {
        value = {
          time: options.time(d, parseInt(i), options.startTime)
        };
      }
      value[rangeName] = options.y(d[key], parseInt(i));
      return value;
    });
  };
  format = function(data, keys, options) {
    var opt;
    if (data == null) {
      data = [];
    }
    if (keys == null) {
      keys = [];
    }
    if (options == null) {
      options = {};
    }
    if (!(Epoch.isNonEmptyArray(data) && Epoch.isNonEmptyArray(keys))) {
      return [];
    }
    opt = Epoch.Util.defaults(options, defaultOptions);
    if (opt.type === 'pie' || opt.type === 'time.gauge') {
      return [];
    } else if (opt.type === 'time.heatmap') {
      return formatTimePlot(data, keys, opt, 'histogram');
    } else if (opt.type.match(/^time\./)) {
      return formatTimePlot(data, keys, opt);
    } else {
      return formatBasicPlot(data, keys, opt);
    }
  };
  format.entry = function(datum, keys, options) {
    var k, layer, len, ref, results;
    if (keys == null) {
      keys = [];
    }
    if (options == null) {
      options = {};
    }
    if (!((datum != null) && Epoch.isNonEmptyArray(keys))) {
      return [];
    }
    if (options.startTime == null) {
      options.startTime = parseInt(new Date().getTime() / 1000);
    }
    ref = format([datum], keys, options);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      layer = ref[k];
      results.push(layer.values[0]);
    }
    return results;
  };
  return format;
})();

Epoch.data = function() {
  var args, formatFn, formatter;
  formatter = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  if ((formatFn = Epoch.Data.Format[formatter]) == null) {
    return [];
  }
  return formatFn.apply(formatFn, args);
};

Epoch.Data.formatData = function(data, type, dataFormat) {
  var a, args, k, len, opts, ref;
  if (data == null) {
    data = [];
  }
  if (!Epoch.isNonEmptyArray(data)) {
    return data;
  }
  if (Epoch.isString(dataFormat)) {
    opts = {
      type: type
    };
    return Epoch.data(dataFormat, data, opts);
  }
  if (!Epoch.isObject(dataFormat)) {
    return data;
  }
  if (!((dataFormat.name != null) && Epoch.isString(dataFormat.name))) {
    return data;
  }
  if (Epoch.Data.Format[dataFormat.name] == null) {
    return data;
  }
  args = [dataFormat.name, data];
  if ((dataFormat["arguments"] != null) && Epoch.isArray(dataFormat["arguments"])) {
    ref = dataFormat["arguments"];
    for (k = 0, len = ref.length; k < len; k++) {
      a = ref[k];
      args.push(a);
    }
  }
  if (dataFormat.options != null) {
    opts = dataFormat.options;
    if (type != null) {
      if (opts.type == null) {
        opts.type = type;
      }
    }
    args.push(opts);
  } else if (type != null) {
    args.push({
      type: type
    });
  }
  return Epoch.data.apply(Epoch.data, args);
};

Epoch.Data.formatEntry = function(datum, type, format) {
  var a, args, dataFormat, entry, k, len, opts, ref;
  if (format == null) {
    return datum;
  }
  if (Epoch.isString(format)) {
    opts = {
      type: type
    };
    return Epoch.Data.Format[format].entry(datum, opts);
  }
  if (!Epoch.isObject(format)) {
    return datum;
  }
  if (!((format.name != null) && Epoch.isString(format.name))) {
    return datum;
  }
  if (Epoch.Data.Format[format.name] == null) {
    return datum;
  }
  dataFormat = Epoch.Util.defaults(format, {});
  args = [datum];
  if ((dataFormat["arguments"] != null) && Epoch.isArray(dataFormat["arguments"])) {
    ref = dataFormat["arguments"];
    for (k = 0, len = ref.length; k < len; k++) {
      a = ref[k];
      args.push(a);
    }
  }
  if (dataFormat.options != null) {
    opts = dataFormat.options;
    opts.type = type;
    args.push(opts);
  } else if (type != null) {
    args.push({
      type: type
    });
  }
  entry = Epoch.Data.Format[dataFormat.name].entry;
  return entry.apply(entry, args);
};

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Model = (function(superClass) {
  var defaults;

  extend(Model, superClass);

  defaults = {
    dataFormat: null
  };

  function Model(options) {
    if (options == null) {
      options = {};
    }
    Model.__super__.constructor.call(this);
    options = Epoch.Util.defaults(options, defaults);
    this.dataFormat = options.dataFormat;
    this.data = options.data;
    this.loading = false;
  }

  Model.prototype.setData = function(data) {
    this.data = data;
    return this.trigger('data:updated');
  };

  Model.prototype.push = function(entry) {
    this.entry = entry;
    return this.trigger('data:push');
  };

  Model.prototype.hasData = function() {
    return this.data != null;
  };

  Model.prototype.getData = function(type, dataFormat) {
    if (dataFormat == null) {
      dataFormat = this.dataFormat;
    }
    return Epoch.Data.formatData(this.data, type, dataFormat);
  };

  Model.prototype.getNext = function(type, dataFormat) {
    if (dataFormat == null) {
      dataFormat = this.dataFormat;
    }
    return Epoch.Data.formatEntry(this.entry, type, dataFormat);
  };

  return Model;

})(Epoch.Events);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Plot = (function(superClass) {
  var defaultAxisMargins, defaults, optionListeners;

  extend(Plot, superClass);

  defaults = {
    domain: null,
    range: null,
    axes: ['left', 'bottom'],
    ticks: {
      top: 14,
      bottom: 14,
      left: 5,
      right: 5
    },
    tickFormats: {
      top: Epoch.Formats.regular,
      bottom: Epoch.Formats.regular,
      left: Epoch.Formats.si,
      right: Epoch.Formats.si
    }
  };

  defaultAxisMargins = {
    top: 25,
    right: 50,
    bottom: 25,
    left: 50
  };

  optionListeners = {
    'option:margins.top': 'marginsChanged',
    'option:margins.right': 'marginsChanged',
    'option:margins.bottom': 'marginsChanged',
    'option:margins.left': 'marginsChanged',
    'option:axes': 'axesChanged',
    'option:ticks.top': 'ticksChanged',
    'option:ticks.right': 'ticksChanged',
    'option:ticks.bottom': 'ticksChanged',
    'option:ticks.left': 'ticksChanged',
    'option:tickFormats.top': 'tickFormatsChanged',
    'option:tickFormats.right': 'tickFormatsChanged',
    'option:tickFormats.bottom': 'tickFormatsChanged',
    'option:tickFormats.left': 'tickFormatsChanged',
    'option:domain': 'domainChanged',
    'option:range': 'rangeChanged'
  };

  function Plot(options) {
    var givenMargins, i, len, pos, ref;
    this.options = options != null ? options : {};
    givenMargins = Epoch.Util.copy(this.options.margins) || {};
    Plot.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    this.margins = {};
    ref = ['top', 'right', 'bottom', 'left'];
    for (i = 0, len = ref.length; i < len; i++) {
      pos = ref[i];
      this.margins[pos] = (this.options.margins != null) && (this.options.margins[pos] != null) ? this.options.margins[pos] : this.hasAxis(pos) ? defaultAxisMargins[pos] : 6;
    }
    this.g = this.svg.append("g").attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")");
    this.onAll(optionListeners);
  }

  Plot.prototype.setTickFormat = function(axis, fn) {
    return this.options.tickFormats[axis] = fn;
  };

  Plot.prototype.hasAxis = function(axis) {
    return this.options.axes.indexOf(axis) > -1;
  };

  Plot.prototype.innerWidth = function() {
    return this.width - (this.margins.left + this.margins.right);
  };

  Plot.prototype.innerHeight = function() {
    return this.height - (this.margins.top + this.margins.bottom);
  };

  Plot.prototype.x = function() {
    var domain, ref;
    domain = (ref = this.options.domain) != null ? ref : this.extent(function(d) {
      return d.x;
    });
    return d3.scale.linear().domain(domain).range([0, this.innerWidth()]);
  };

  Plot.prototype.y = function(givenDomain) {
    return d3.scale.linear().domain(this._getScaleDomain(givenDomain)).range([this.innerHeight(), 0]);
  };

  Plot.prototype.bottomAxis = function() {
    return d3.svg.axis().scale(this.x()).orient('bottom').ticks(this.options.ticks.bottom).tickFormat(this.options.tickFormats.bottom);
  };

  Plot.prototype.topAxis = function() {
    return d3.svg.axis().scale(this.x()).orient('top').ticks(this.options.ticks.top).tickFormat(this.options.tickFormats.top);
  };

  Plot.prototype.leftAxis = function() {
    var range;
    range = this.options.range ? this.options.range.left : null;
    return d3.svg.axis().scale(this.y(range)).orient('left').ticks(this.options.ticks.left).tickFormat(this.options.tickFormats.left);
  };

  Plot.prototype.rightAxis = function() {
    var range;
    range = this.options.range ? this.options.range.right : null;
    return d3.svg.axis().scale(this.y(range)).orient('right').ticks(this.options.ticks.right).tickFormat(this.options.tickFormats.right);
  };

  Plot.prototype.draw = function() {
    if (this._axesDrawn) {
      this._redrawAxes();
    } else {
      this._drawAxes();
    }
    return Plot.__super__.draw.call(this);
  };

  Plot.prototype._redrawAxes = function() {
    if (this.hasAxis('bottom')) {
      this.g.selectAll('.x.axis.bottom').transition().duration(500).ease('linear').call(this.bottomAxis());
    }
    if (this.hasAxis('top')) {
      this.g.selectAll('.x.axis.top').transition().duration(500).ease('linear').call(this.topAxis());
    }
    if (this.hasAxis('left')) {
      this.g.selectAll('.y.axis.left').transition().duration(500).ease('linear').call(this.leftAxis());
    }
    if (this.hasAxis('right')) {
      return this.g.selectAll('.y.axis.right').transition().duration(500).ease('linear').call(this.rightAxis());
    }
  };

  Plot.prototype._drawAxes = function() {
    if (this.hasAxis('bottom')) {
      this.g.append("g").attr("class", "x axis bottom").attr("transform", "translate(0, " + (this.innerHeight()) + ")").call(this.bottomAxis());
    }
    if (this.hasAxis('top')) {
      this.g.append("g").attr('class', 'x axis top').call(this.topAxis());
    }
    if (this.hasAxis('left')) {
      this.g.append("g").attr("class", "y axis left").call(this.leftAxis());
    }
    if (this.hasAxis('right')) {
      this.g.append('g').attr('class', 'y axis right').attr('transform', "translate(" + (this.innerWidth()) + ", 0)").call(this.rightAxis());
    }
    return this._axesDrawn = true;
  };

  Plot.prototype.dimensionsChanged = function() {
    Plot.__super__.dimensionsChanged.call(this);
    this.g.selectAll('.axis').remove();
    this._axesDrawn = false;
    return this.draw();
  };

  Plot.prototype.marginsChanged = function() {
    var pos, ref, size;
    if (this.options.margins == null) {
      return;
    }
    ref = this.options.margins;
    for (pos in ref) {
      if (!hasProp.call(ref, pos)) continue;
      size = ref[pos];
      if (size == null) {
        this.margins[pos] = 6;
      } else {
        this.margins[pos] = size;
      }
    }
    this.g.transition().duration(750).attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")");
    return this.draw();
  };

  Plot.prototype.axesChanged = function() {
    var i, len, pos, ref;
    ref = ['top', 'right', 'bottom', 'left'];
    for (i = 0, len = ref.length; i < len; i++) {
      pos = ref[i];
      if ((this.options.margins != null) && (this.options.margins[pos] != null)) {
        continue;
      }
      if (this.hasAxis(pos)) {
        this.margins[pos] = defaultAxisMargins[pos];
      } else {
        this.margins[pos] = 6;
      }
    }
    this.g.transition().duration(750).attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")");
    this.g.selectAll('.axis').remove();
    this._axesDrawn = false;
    return this.draw();
  };

  Plot.prototype.ticksChanged = function() {
    return this.draw();
  };

  Plot.prototype.tickFormatsChanged = function() {
    return this.draw();
  };

  Plot.prototype.domainChanged = function() {
    return this.draw();
  };

  Plot.prototype.rangeChanged = function() {
    return this.draw();
  };

  return Plot;

})(Epoch.Chart.SVG);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Area = (function(superClass) {
  extend(Area, superClass);

  function Area(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).type == null) {
      base.type = 'area';
    }
    Area.__super__.constructor.call(this, this.options);
    this.draw();
  }

  Area.prototype.y = function() {
    var a, i, k, layer, len, ref, ref1, ref2, v;
    a = [];
    ref = this.getVisibleLayers();
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      ref1 = layer.values;
      for (k in ref1) {
        if (!hasProp.call(ref1, k)) continue;
        v = ref1[k];
        if (a[k] != null) {
          a[k] += v.y;
        }
        if (a[k] == null) {
          a[k] = v.y;
        }
      }
    }
    return d3.scale.linear().domain((ref2 = this.options.range) != null ? ref2 : [0, d3.max(a)]).range([this.height - this.margins.top - this.margins.bottom, 0]);
  };

  Area.prototype.draw = function() {
    var area, data, layer, layers, ref, stack, x, y;
    ref = [this.x(), this.y(), this.getVisibleLayers()], x = ref[0], y = ref[1], layers = ref[2];
    this.g.selectAll('.layer').remove();
    if (layers.length === 0) {
      return;
    }
    area = d3.svg.area().x(function(d) {
      return x(d.x);
    }).y0(function(d) {
      return y(d.y0);
    }).y1(function(d) {
      return y(d.y0 + d.y);
    });
    stack = d3.layout.stack().values(function(d) {
      return d.values;
    });
    data = stack(layers);
    layer = this.g.selectAll('.layer').data(layers, function(d) {
      return d.category;
    });
    layer.select('.area').attr('d', function(d) {
      return area(d.values);
    });
    layer.enter().append('g').attr('class', function(d) {
      return d.className;
    });
    layer.append('path').attr('class', 'area').attr('d', function(d) {
      return area(d.values);
    });
    return Area.__super__.draw.call(this);
  };

  return Area;

})(Epoch.Chart.Plot);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Bar = (function(superClass) {
  var defaults, horizontal_defaults, horizontal_specific, optionListeners;

  extend(Bar, superClass);

  defaults = {
    type: 'bar',
    style: 'grouped',
    orientation: 'vertical',
    padding: {
      bar: 0.08,
      group: 0.1
    },
    outerPadding: {
      bar: 0.08,
      group: 0.1
    }
  };

  horizontal_specific = {
    tickFormats: {
      top: Epoch.Formats.si,
      bottom: Epoch.Formats.si,
      left: Epoch.Formats.regular,
      right: Epoch.Formats.regular
    }
  };

  horizontal_defaults = Epoch.Util.defaults(horizontal_specific, defaults);

  optionListeners = {
    'option:orientation': 'orientationChanged',
    'option:padding': 'paddingChanged',
    'option:outerPadding': 'paddingChanged',
    'option:padding:bar': 'paddingChanged',
    'option:padding:group': 'paddingChanged',
    'option:outerPadding:bar': 'paddingChanged',
    'option:outerPadding:group': 'paddingChanged'
  };

  function Bar(options) {
    this.options = options != null ? options : {};
    if (this._isHorizontal()) {
      this.options = Epoch.Util.defaults(this.options, horizontal_defaults);
    } else {
      this.options = Epoch.Util.defaults(this.options, defaults);
    }
    Bar.__super__.constructor.call(this, this.options);
    this.onAll(optionListeners);
    this.draw();
  }

  Bar.prototype._isVertical = function() {
    return this.options.orientation === 'vertical';
  };

  Bar.prototype._isHorizontal = function() {
    return this.options.orientation === 'horizontal';
  };

  Bar.prototype.x = function() {
    var extent;
    if (this._isVertical()) {
      return d3.scale.ordinal().domain(Epoch.Util.domain(this.getVisibleLayers())).rangeRoundBands([0, this.innerWidth()], this.options.padding.group, this.options.outerPadding.group);
    } else {
      extent = this.extent(function(d) {
        return d.y;
      });
      extent[0] = Math.min(0, extent[0]);
      return d3.scale.linear().domain(extent).range([0, this.width - this.margins.left - this.margins.right]);
    }
  };

  Bar.prototype.x1 = function(x0) {
    var layer;
    return d3.scale.ordinal().domain((function() {
      var j, len, ref, results;
      ref = this.getVisibleLayers();
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        results.push(layer.category);
      }
      return results;
    }).call(this)).rangeRoundBands([0, x0.rangeBand()], this.options.padding.bar, this.options.outerPadding.bar);
  };

  Bar.prototype.y = function() {
    var extent;
    if (this._isVertical()) {
      extent = this.extent(function(d) {
        return d.y;
      });
      extent[0] = Math.min(0, extent[0]);
      return d3.scale.linear().domain(extent).range([this.height - this.margins.top - this.margins.bottom, 0]);
    } else {
      return d3.scale.ordinal().domain(Epoch.Util.domain(this.getVisibleLayers())).rangeRoundBands([0, this.innerHeight()], this.options.padding.group, this.options.outerPadding.group);
    }
  };

  Bar.prototype.y1 = function(y0) {
    var layer;
    return d3.scale.ordinal().domain((function() {
      var j, len, ref, results;
      ref = this.getVisibleLayers();
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        results.push(layer.category);
      }
      return results;
    }).call(this)).rangeRoundBands([0, y0.rangeBand()], this.options.padding.bar, this.options.outerPadding.bar);
  };

  Bar.prototype._remapData = function() {
    var className, entry, j, k, l, layer, len, len1, map, name, ref, ref1, results, v;
    map = {};
    ref = this.getVisibleLayers();
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      className = 'bar ' + layer.className.replace(/\s*layer\s*/, '');
      ref1 = layer.values;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        entry = ref1[l];
        if (map[name = entry.x] == null) {
          map[name] = [];
        }
        map[entry.x].push({
          label: layer.category,
          y: entry.y,
          className: className
        });
      }
    }
    results = [];
    for (k in map) {
      if (!hasProp.call(map, k)) continue;
      v = map[k];
      results.push({
        group: k,
        values: v
      });
    }
    return results;
  };

  Bar.prototype.draw = function() {
    if (this._isVertical()) {
      this._drawVertical();
    } else {
      this._drawHorizontal();
    }
    return Bar.__super__.draw.call(this);
  };

  Bar.prototype._drawVertical = function() {
    var data, height, layer, rects, ref, x0, x1, y;
    ref = [this.x(), this.y()], x0 = ref[0], y = ref[1];
    x1 = this.x1(x0);
    height = this.height - this.margins.top - this.margins.bottom;
    data = this._remapData();
    layer = this.g.selectAll(".layer").data(data, function(d) {
      return d.group;
    });
    layer.transition().duration(750).attr("transform", function(d) {
      return "translate(" + (x0(d.group)) + ", 0)";
    });
    layer.enter().append("g").attr('class', 'layer').attr("transform", function(d) {
      return "translate(" + (x0(d.group)) + ", 0)";
    });
    rects = layer.selectAll('rect').data(function(group) {
      return group.values;
    });
    rects.attr('class', function(d) {
      return d.className;
    });
    rects.transition().duration(600).attr('x', function(d) {
      return x1(d.label);
    }).attr('y', function(d) {
      return y(d.y);
    }).attr('width', x1.rangeBand()).attr('height', function(d) {
      return height - y(d.y);
    });
    rects.enter().append('rect').attr('class', function(d) {
      return d.className;
    }).attr('x', function(d) {
      return x1(d.label);
    }).attr('y', function(d) {
      return y(d.y);
    }).attr('width', x1.rangeBand()).attr('height', function(d) {
      return height - y(d.y);
    });
    rects.exit().transition().duration(150).style('opacity', '0').remove();
    return layer.exit().transition().duration(750).style('opacity', '0').remove();
  };

  Bar.prototype._drawHorizontal = function() {
    var data, layer, rects, ref, width, x, y0, y1;
    ref = [this.x(), this.y()], x = ref[0], y0 = ref[1];
    y1 = this.y1(y0);
    width = this.width - this.margins.left - this.margins.right;
    data = this._remapData();
    layer = this.g.selectAll(".layer").data(data, function(d) {
      return d.group;
    });
    layer.transition().duration(750).attr("transform", function(d) {
      return "translate(0, " + (y0(d.group)) + ")";
    });
    layer.enter().append("g").attr('class', 'layer').attr("transform", function(d) {
      return "translate(0, " + (y0(d.group)) + ")";
    });
    rects = layer.selectAll('rect').data(function(group) {
      return group.values;
    });
    rects.attr('class', function(d) {
      return d.className;
    });
    rects.transition().duration(600).attr('x', function(d) {
      return 0;
    }).attr('y', function(d) {
      return y1(d.label);
    }).attr('height', y1.rangeBand()).attr('width', function(d) {
      return x(d.y);
    });
    rects.enter().append('rect').attr('class', function(d) {
      return d.className;
    }).attr('x', function(d) {
      return 0;
    }).attr('y', function(d) {
      return y1(d.label);
    }).attr('height', y1.rangeBand()).attr('width', function(d) {
      return x(d.y);
    });
    rects.exit().transition().duration(150).style('opacity', '0').remove();
    return layer.exit().transition().duration(750).style('opacity', '0').remove();
  };

  Bar.prototype._getTickValues = function(numTicks, dataKey) {
    var i, step, tickValues, total;
    if (dataKey == null) {
      dataKey = 'x';
    }
    if (this.data[0] == null) {
      return [];
    }
    total = this.data[0].values.length;
    step = Math.ceil(total / numTicks) | 0;
    return tickValues = (function() {
      var j, ref, ref1, results;
      results = [];
      for (i = j = 0, ref = total, ref1 = step; ref1 > 0 ? j < ref : j > ref; i = j += ref1) {
        results.push(this.data[0].values[i].x);
      }
      return results;
    }).call(this);
  };

  Bar.prototype.bottomAxis = function() {
    var axis;
    axis = d3.svg.axis().scale(this.x()).orient('bottom').ticks(this.options.ticks.bottom).tickFormat(this.options.tickFormats.bottom);
    if (this._isVertical() && (this.options.ticks.bottom != null)) {
      axis.tickValues(this._getTickValues(this.options.ticks.bottom));
    }
    return axis;
  };

  Bar.prototype.topAxis = function() {
    var axis;
    axis = d3.svg.axis().scale(this.x()).orient('top').ticks(this.options.ticks.top).tickFormat(this.options.tickFormats.top);
    if (this._isVertical() && (this.options.ticks.top != null)) {
      axis.tickValues(this._getTickValues(this.options.ticks.top));
    }
    return axis;
  };

  Bar.prototype.leftAxis = function() {
    var axis;
    axis = d3.svg.axis().scale(this.y()).orient('left').ticks(this.options.ticks.left).tickFormat(this.options.tickFormats.left);
    if (this._isHorizontal() && (this.options.ticks.left != null)) {
      axis.tickValues(this._getTickValues(this.options.ticks.left));
    }
    return axis;
  };

  Bar.prototype.rightAxis = function() {
    var axis;
    axis = d3.svg.axis().scale(this.y()).orient('right').ticks(this.options.ticks.right).tickFormat(this.options.tickFormats.right);
    if (this._isHorizontal() && (this.options.ticks.right != null)) {
      axis.tickValues(this._getTickValues(this.options.ticks.right));
    }
    return axis;
  };

  Bar.prototype.orientationChanged = function() {
    var bottom, left, right, top;
    top = this.options.tickFormats.top;
    bottom = this.options.tickFormats.bottom;
    left = this.options.tickFormats.left;
    right = this.options.tickFormats.right;
    this.options.tickFormats.left = top;
    this.options.tickFormats.right = bottom;
    this.options.tickFormats.top = left;
    this.options.tickFormats.bottom = right;
    return this.draw();
  };

  Bar.prototype.paddingChanged = function() {
    return this.draw();
  };

  return Bar;

})(Epoch.Chart.Plot);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Histogram = (function(superClass) {
  var defaults, optionListeners;

  extend(Histogram, superClass);

  defaults = {
    type: 'histogram',
    domain: [0, 100],
    bucketRange: [0, 100],
    buckets: 10,
    cutOutliers: false
  };

  optionListeners = {
    'option:bucketRange': 'bucketRangeChanged',
    'option:buckets': 'bucketsChanged',
    'option:cutOutliers': 'cutOutliersChanged'
  };

  function Histogram(options) {
    this.options = options != null ? options : {};
    Histogram.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    this.onAll(optionListeners);
    this.draw();
  }

  Histogram.prototype._prepareData = function(data) {
    var bucketSize, buckets, i, index, j, k, l, layer, len, len1, point, prepared, preparedLayer, ref, v;
    bucketSize = (this.options.bucketRange[1] - this.options.bucketRange[0]) / this.options.buckets;
    prepared = [];
    for (j = 0, len = data.length; j < len; j++) {
      layer = data[j];
      buckets = (function() {
        var l, ref, results;
        results = [];
        for (i = l = 0, ref = this.options.buckets; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
          results.push(0);
        }
        return results;
      }).call(this);
      ref = layer.values;
      for (l = 0, len1 = ref.length; l < len1; l++) {
        point = ref[l];
        index = parseInt((point.x - this.options.bucketRange[0]) / bucketSize);
        if (this.options.cutOutliers && ((index < 0) || (index >= this.options.buckets))) {
          continue;
        }
        if (index < 0) {
          index = 0;
        } else if (index >= this.options.buckets) {
          index = this.options.buckets - 1;
        }
        buckets[index] += parseInt(point.y);
      }
      preparedLayer = {
        values: buckets.map(function(d, i) {
          return {
            x: parseInt(i) * bucketSize,
            y: d
          };
        })
      };
      for (k in layer) {
        if (!hasProp.call(layer, k)) continue;
        v = layer[k];
        if (k !== 'values') {
          preparedLayer[k] = v;
        }
      }
      prepared.push(preparedLayer);
    }
    return prepared;
  };

  Histogram.prototype.resetData = function() {
    this.setData(this.rawData);
    return this.draw();
  };

  Histogram.prototype.bucketRangeChanged = function() {
    return this.resetData();
  };

  Histogram.prototype.bucketsChanged = function() {
    return this.resetData();
  };

  Histogram.prototype.cutOutliersChanged = function() {
    return this.resetData();
  };

  return Histogram;

})(Epoch.Chart.Bar);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Line = (function(superClass) {
  extend(Line, superClass);

  function Line(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).type == null) {
      base.type = 'line';
    }
    Line.__super__.constructor.call(this, this.options);
    this.draw();
  }

  Line.prototype.line = function(layer) {
    var ref, x, y;
    ref = [this.x(), this.y(layer.range)], x = ref[0], y = ref[1];
    return d3.svg.line().x(function(d) {
      return x(d.x);
    }).y(function(d) {
      return y(d.y);
    });
  };

  Line.prototype.draw = function() {
    var layer, layers, ref, x, y;
    ref = [this.x(), this.y(), this.getVisibleLayers()], x = ref[0], y = ref[1], layers = ref[2];
    if (layers.length === 0) {
      return this.g.selectAll('.layer').remove();
    }
    layer = this.g.selectAll('.layer').data(layers, function(d) {
      return d.category;
    });
    layer.select('.line').transition().duration(500).attr('d', (function(_this) {
      return function(l) {
        return _this.line(l)(l.values);
      };
    })(this));
    layer.enter().append('g').attr('class', function(l) {
      return l.className;
    }).append('path').attr('class', 'line').attr('d', (function(_this) {
      return function(l) {
        return _this.line(l)(l.values);
      };
    })(this));
    layer.exit().transition().duration(750).style('opacity', '0').remove();
    return Line.__super__.draw.call(this);
  };

  return Line;

})(Epoch.Chart.Plot);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Pie = (function(superClass) {
  var defaults;

  extend(Pie, superClass);

  defaults = {
    type: 'pie',
    margin: 10,
    inner: 0
  };

  function Pie(options) {
    this.options = options != null ? options : {};
    Pie.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    this.pie = d3.layout.pie().sort(null).value(function(d) {
      return d.value;
    });
    this.arc = d3.svg.arc().outerRadius((function(_this) {
      return function() {
        return (Math.max(_this.width, _this.height) / 2) - _this.options.margin;
      };
    })(this)).innerRadius((function(_this) {
      return function() {
        return _this.options.inner;
      };
    })(this));
    this.g = this.svg.append('g').attr("transform", "translate(" + (this.width / 2) + ", " + (this.height / 2) + ")");
    this.on('option:margin', 'marginChanged');
    this.on('option:inner', 'innerChanged');
    this.draw();
  }

  Pie.prototype.draw = function() {
    var arcs, path, text;
    this.g.selectAll('.arc').remove();
    arcs = this.g.selectAll(".arc").data(this.pie(this.getVisibleLayers()), function(d) {
      return d.data.category;
    });
    arcs.enter().append('g').attr('class', function(d) {
      return "arc pie " + d.data.className;
    });
    arcs.select('path').attr('d', this.arc);
    arcs.select('text').attr("transform", (function(_this) {
      return function(d) {
        return "translate(" + (_this.arc.centroid(d)) + ")";
      };
    })(this)).text(function(d) {
      return d.data.label || d.data.category;
    });
    path = arcs.append("path").attr("d", this.arc).each(function(d) {
      return this._current = d;
    });
    text = arcs.append("text").attr("transform", (function(_this) {
      return function(d) {
        return "translate(" + (_this.arc.centroid(d)) + ")";
      };
    })(this)).attr("dy", ".35em").style("text-anchor", "middle").text(function(d) {
      return d.data.label || d.data.category;
    });
    return Pie.__super__.draw.call(this);
  };

  Pie.prototype.marginChanged = function() {
    return this.draw();
  };

  Pie.prototype.innerChanged = function() {
    return this.draw();
  };

  return Pie;

})(Epoch.Chart.SVG);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Chart.Scatter = (function(superClass) {
  var defaults;

  extend(Scatter, superClass);

  defaults = {
    type: 'scatter',
    radius: 3.5,
    axes: ['top', 'bottom', 'left', 'right']
  };

  function Scatter(options) {
    this.options = options != null ? options : {};
    Scatter.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    this.on('option:radius', 'radiusChanged');
    this.draw();
  }

  Scatter.prototype.draw = function() {
    var dots, layer, layers, radius, ref, x, y;
    ref = [this.x(), this.y(), this.getVisibleLayers()], x = ref[0], y = ref[1], layers = ref[2];
    radius = this.options.radius;
    if (layers.length === 0) {
      return this.g.selectAll('.layer').remove();
    }
    layer = this.g.selectAll('.layer').data(layers, function(d) {
      return d.category;
    });
    layer.enter().append('g').attr('class', function(d) {
      return d.className;
    });
    dots = layer.selectAll('.dot').data(function(l) {
      return l.values;
    });
    dots.transition().duration(500).attr("r", function(d) {
      var ref1;
      return (ref1 = d.r) != null ? ref1 : radius;
    }).attr("cx", function(d) {
      return x(d.x);
    }).attr("cy", function(d) {
      return y(d.y);
    });
    dots.enter().append('circle').attr('class', 'dot').attr("r", function(d) {
      var ref1;
      return (ref1 = d.r) != null ? ref1 : radius;
    }).attr("cx", function(d) {
      return x(d.x);
    }).attr("cy", function(d) {
      return y(d.y);
    });
    dots.exit().transition().duration(750).style('opacity', 0).remove();
    layer.exit().transition().duration(750).style('opacity', 0).remove();
    return Scatter.__super__.draw.call(this);
  };

  Scatter.prototype.radiusChanged = function() {
    return this.draw();
  };

  return Scatter;

})(Epoch.Chart.Plot);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Time.Plot = (function(superClass) {
  var defaultAxisMargins, defaults, optionListeners;

  extend(Plot, superClass);

  defaults = {
    range: null,
    fps: 24,
    historySize: 120,
    windowSize: 40,
    queueSize: 10,
    axes: ['bottom'],
    ticks: {
      time: 15,
      left: 5,
      right: 5
    },
    tickFormats: {
      top: Epoch.Formats.seconds,
      bottom: Epoch.Formats.seconds,
      left: Epoch.Formats.si,
      right: Epoch.Formats.si
    }
  };

  defaultAxisMargins = {
    top: 25,
    right: 50,
    bottom: 25,
    left: 50
  };

  optionListeners = {
    'option:margins': 'marginsChanged',
    'option:margins.top': 'marginsChanged',
    'option:margins.right': 'marginsChanged',
    'option:margins.bottom': 'marginsChanged',
    'option:margins.left': 'marginsChanged',
    'option:axes': 'axesChanged',
    'option:ticks': 'ticksChanged',
    'option:ticks.top': 'ticksChanged',
    'option:ticks.right': 'ticksChanged',
    'option:ticks.bottom': 'ticksChanged',
    'option:ticks.left': 'ticksChanged',
    'option:tickFormats': 'tickFormatsChanged',
    'option:tickFormats.top': 'tickFormatsChanged',
    'option:tickFormats.right': 'tickFormatsChanged',
    'option:tickFormats.bottom': 'tickFormatsChanged',
    'option:tickFormats.left': 'tickFormatsChanged'
  };

  function Plot(options) {
    var givenMargins, l, len, pos, ref;
    this.options = options;
    givenMargins = Epoch.Util.copy(this.options.margins) || {};
    Plot.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    if (this.options.model) {
      this.options.model.on('data:push', (function(_this) {
        return function() {
          return _this.pushFromModel();
        };
      })(this));
    }
    this._queue = [];
    this.margins = {};
    ref = ['top', 'right', 'bottom', 'left'];
    for (l = 0, len = ref.length; l < len; l++) {
      pos = ref[l];
      this.margins[pos] = (this.options.margins != null) && (this.options.margins[pos] != null) ? this.options.margins[pos] : this.hasAxis(pos) ? defaultAxisMargins[pos] : 6;
    }
    this.svg = this.el.insert('svg', ':first-child').attr('width', this.width).attr('height', this.height).style('z-index', '1000');
    if (this.el.style('position') !== 'absolute' && this.el.style('position') !== 'relative') {
      this.el.style('position', 'relative');
    }
    this.canvas.style({
      position: 'absolute',
      'z-index': '999'
    });
    this._sizeCanvas();
    this.animation = {
      interval: null,
      active: false,
      delta: (function(_this) {
        return function() {
          return -(_this.w() / _this.options.fps);
        };
      })(this),
      tickDelta: (function(_this) {
        return function() {
          return -((_this.w() / _this.pixelRatio) / _this.options.fps);
        };
      })(this),
      frame: 0,
      duration: this.options.fps
    };
    this._buildAxes();
    this.animationCallback = (function(_this) {
      return function() {
        return _this._animate();
      };
    })(this);
    this.onAll(optionListeners);
  }

  Plot.prototype._sizeCanvas = function() {
    this.canvas.attr({
      width: this.innerWidth(),
      height: this.innerHeight()
    });
    return this.canvas.style({
      width: (this.innerWidth() / this.pixelRatio) + "px",
      height: (this.innerHeight() / this.pixelRatio) + "px",
      top: this.margins.top + "px",
      left: this.margins.left + "px"
    });
  };

  Plot.prototype._buildAxes = function() {
    this.svg.selectAll('.axis').remove();
    this._prepareTimeAxes();
    return this._prepareRangeAxes();
  };

  Plot.prototype._annotateLayers = function(prepared) {
    var classes, copy, data, i, layer, start;
    data = [];
    for (i in prepared) {
      if (!hasProp.call(prepared, i)) continue;
      layer = prepared[i];
      copy = Epoch.Util.copy(layer);
      start = Math.max(0, layer.values.length - this.options.historySize);
      copy.values = layer.values.slice(start);
      classes = ['layer'];
      classes.push("category" + ((i | 0) + 1));
      if (layer.label != null) {
        classes.push(Epoch.Util.dasherize(layer.label));
      }
      copy.className = classes.join(' ');
      copy.visible = true;
      data.push(copy);
    }
    return data;
  };

  Plot.prototype._offsetX = function() {
    return 0;
  };

  Plot.prototype._prepareTimeAxes = function() {
    var axis;
    if (this.hasAxis('bottom')) {
      axis = this.bottomAxis = this.svg.append('g').attr('class', "x axis bottom canvas").attr('transform', "translate(" + (this.margins.left - 1) + ", " + (this.innerHeight() / this.pixelRatio + this.margins.top) + ")");
      axis.append('path').attr('class', 'domain').attr('d', "M0,0H" + (this.innerWidth() / this.pixelRatio + 1));
    }
    if (this.hasAxis('top')) {
      axis = this.topAxis = this.svg.append('g').attr('class', "x axis top canvas").attr('transform', "translate(" + (this.margins.left - 1) + ", " + this.margins.top + ")");
      axis.append('path').attr('class', 'domain').attr('d', "M0,0H" + (this.innerWidth() / this.pixelRatio + 1));
    }
    return this._resetInitialTimeTicks();
  };

  Plot.prototype._resetInitialTimeTicks = function() {
    var i, k, l, layer, len, ref, ref1, results, tickInterval;
    tickInterval = this.options.ticks.time;
    this._ticks = [];
    this._tickTimer = tickInterval;
    if (this.bottomAxis != null) {
      this.bottomAxis.selectAll('.tick').remove();
    }
    if (this.topAxis != null) {
      this.topAxis.selectAll('.tick').remove();
    }
    ref = this.data;
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      layer = ref[l];
      if (!Epoch.isNonEmptyArray(layer.values)) {
        continue;
      }
      ref1 = [this.options.windowSize - 1, layer.values.length - 1], i = ref1[0], k = ref1[1];
      while (i >= 0 && k >= 0) {
        this._pushTick(i, layer.values[k].time, false, true);
        i -= tickInterval;
        k -= tickInterval;
      }
      break;
    }
    return results;
  };

  Plot.prototype._prepareRangeAxes = function() {
    if (this.hasAxis('left')) {
      this.svg.append("g").attr("class", "y axis left").attr('transform', "translate(" + (this.margins.left - 1) + ", " + this.margins.top + ")").call(this.leftAxis());
    }
    if (this.hasAxis('right')) {
      return this.svg.append('g').attr('class', 'y axis right').attr('transform', "translate(" + (this.width - this.margins.right) + ", " + this.margins.top + ")").call(this.rightAxis());
    }
  };

  Plot.prototype.leftAxis = function() {
    var axis, ticks;
    ticks = this.options.ticks.left;
    axis = d3.svg.axis().scale(this.ySvgLeft()).orient('left').tickFormat(this.options.tickFormats.left);
    if (ticks === 2) {
      return axis.tickValues(this.extent(function(d) {
        return d.y;
      }));
    } else {
      return axis.ticks(ticks);
    }
  };

  Plot.prototype.rightAxis = function() {
    var axis, extent, ticks;
    extent = this.extent(function(d) {
      return d.y;
    });
    ticks = this.options.ticks.right;
    axis = d3.svg.axis().scale(this.ySvgRight()).orient('right').tickFormat(this.options.tickFormats.right);
    if (ticks === 2) {
      return axis.tickValues(this.extent(function(d) {
        return d.y;
      }));
    } else {
      return axis.ticks(ticks);
    }
  };

  Plot.prototype.hasAxis = function(name) {
    return this.options.axes.indexOf(name) > -1;
  };

  Plot.prototype.innerWidth = function() {
    return (this.width - (this.margins.left + this.margins.right)) * this.pixelRatio;
  };

  Plot.prototype.innerHeight = function() {
    return (this.height - (this.margins.top + this.margins.bottom)) * this.pixelRatio;
  };

  Plot.prototype._prepareEntry = function(entry) {
    return entry;
  };

  Plot.prototype._prepareLayers = function(layers) {
    return layers;
  };

  Plot.prototype._startTransition = function() {
    if (this.animation.active === true || this._queue.length === 0) {
      return;
    }
    this.trigger('transition:start');
    this._shift();
    this.animation.active = true;
    return this.animation.interval = setInterval(this.animationCallback, 1000 / this.options.fps);
  };

  Plot.prototype._stopTransition = function() {
    var firstTick, l, lastTick, layer, len, ref, ref1;
    if (!this.inTransition()) {
      return;
    }
    ref = this.data;
    for (l = 0, len = ref.length; l < len; l++) {
      layer = ref[l];
      if (!(layer.values.length > this.options.windowSize + 1)) {
        continue;
      }
      layer.values.shift();
    }
    ref1 = [this._ticks[0], this._ticks[this._ticks.length - 1]], firstTick = ref1[0], lastTick = ref1[1];
    if ((lastTick != null) && lastTick.enter) {
      lastTick.enter = false;
      lastTick.opacity = 1;
    }
    if ((firstTick != null) && firstTick.exit) {
      this._shiftTick();
    }
    this.animation.frame = 0;
    this.trigger('transition:end');
    if (this._queue.length > 0) {
      return this._shift();
    } else {
      this.animation.active = false;
      return clearInterval(this.animation.interval);
    }
  };

  Plot.prototype.inTransition = function() {
    return this.animation.active;
  };

  Plot.prototype.push = function(layers) {
    layers = this._prepareLayers(layers);
    if (this._queue.length > this.options.queueSize) {
      this._queue.splice(this.options.queueSize, this._queue.length - this.options.queueSize);
    }
    if (this._queue.length === this.options.queueSize) {
      return false;
    }
    this._queue.push(layers.map((function(_this) {
      return function(entry) {
        return _this._prepareEntry(entry);
      };
    })(this)));
    this.trigger('push');
    if (!this.inTransition()) {
      return this._startTransition();
    }
  };

  Plot.prototype.pushFromModel = function() {
    return this.push(this.options.model.getNext(this.options.type, this.options.dataFormat));
  };

  Plot.prototype._shift = function() {
    var entry, i, layer, ref;
    this.trigger('before:shift');
    entry = this._queue.shift();
    ref = this.data;
    for (i in ref) {
      if (!hasProp.call(ref, i)) continue;
      layer = ref[i];
      layer.values.push(entry[i]);
    }
    this._updateTicks(entry[0].time);
    this._transitionRangeAxes();
    return this.trigger('after:shift');
  };

  Plot.prototype._transitionRangeAxes = function() {
    if (this.hasAxis('left')) {
      this.svg.selectAll('.y.axis.left').transition().duration(500).ease('linear').call(this.leftAxis());
    }
    if (this.hasAxis('right')) {
      return this.svg.selectAll('.y.axis.right').transition().duration(500).ease('linear').call(this.rightAxis());
    }
  };

  Plot.prototype._animate = function() {
    if (!this.inTransition()) {
      return;
    }
    if (++this.animation.frame === this.animation.duration) {
      this._stopTransition();
    }
    this.draw(this.animation.frame * this.animation.delta());
    return this._updateTimeAxes();
  };

  Plot.prototype.y = function(givenDomain) {
    return d3.scale.linear().domain(this._getScaleDomain(givenDomain)).range([this.innerHeight(), 0]);
  };

  Plot.prototype.ySvg = function(givenDomain) {
    return d3.scale.linear().domain(this._getScaleDomain(givenDomain)).range([this.innerHeight() / this.pixelRatio, 0]);
  };

  Plot.prototype.ySvgLeft = function() {
    if (this.options.range != null) {
      return this.ySvg(this.options.range.left);
    } else {
      return this.ySvg();
    }
  };

  Plot.prototype.ySvgRight = function() {
    if (this.options.range != null) {
      return this.ySvg(this.options.range.right);
    } else {
      return this.ySvg();
    }
  };

  Plot.prototype.w = function() {
    return this.innerWidth() / this.options.windowSize;
  };

  Plot.prototype._updateTicks = function(newTime) {
    if (!(this.hasAxis('top') || this.hasAxis('bottom'))) {
      return;
    }
    if (!((++this._tickTimer) % this.options.ticks.time)) {
      this._pushTick(this.options.windowSize, newTime, true);
    }
    if (!(this._ticks.length > 0)) {
      return;
    }
    if (!(this._ticks[0].x - (this.w() / this.pixelRatio) >= 0)) {
      return this._ticks[0].exit = true;
    }
  };

  Plot.prototype._pushTick = function(bucket, time, enter, reverse) {
    var g, tick;
    if (enter == null) {
      enter = false;
    }
    if (reverse == null) {
      reverse = false;
    }
    if (!(this.hasAxis('top') || this.hasAxis('bottom'))) {
      return;
    }
    tick = {
      time: time,
      x: bucket * (this.w() / this.pixelRatio) + this._offsetX(),
      opacity: enter ? 0 : 1,
      enter: enter ? true : false,
      exit: false
    };
    if (this.hasAxis('bottom')) {
      g = this.bottomAxis.append('g').attr('class', 'tick major').attr('transform', "translate(" + (tick.x + 1) + ",0)").style('opacity', tick.opacity);
      g.append('line').attr('y2', 6);
      g.append('text').attr('text-anchor', 'middle').attr('dy', 19).text(this.options.tickFormats.bottom(tick.time));
      tick.bottomEl = g;
    }
    if (this.hasAxis('top')) {
      g = this.topAxis.append('g').attr('class', 'tick major').attr('transform', "translate(" + (tick.x + 1) + ",0)").style('opacity', tick.opacity);
      g.append('line').attr('y2', -6);
      g.append('text').attr('text-anchor', 'middle').attr('dy', -10).text(this.options.tickFormats.top(tick.time));
      tick.topEl = g;
    }
    if (reverse) {
      this._ticks.unshift(tick);
    } else {
      this._ticks.push(tick);
    }
    return tick;
  };

  Plot.prototype._shiftTick = function() {
    var tick;
    if (!(this._ticks.length > 0)) {
      return;
    }
    tick = this._ticks.shift();
    if (tick.topEl != null) {
      tick.topEl.remove();
    }
    if (tick.bottomEl != null) {
      return tick.bottomEl.remove();
    }
  };

  Plot.prototype._updateTimeAxes = function() {
    var dop, dx, l, len, ref, ref1, results, tick;
    if (!(this.hasAxis('top') || this.hasAxis('bottom'))) {
      return;
    }
    ref = [this.animation.tickDelta(), 1 / this.options.fps], dx = ref[0], dop = ref[1];
    ref1 = this._ticks;
    results = [];
    for (l = 0, len = ref1.length; l < len; l++) {
      tick = ref1[l];
      tick.x += dx;
      if (this.hasAxis('bottom')) {
        tick.bottomEl.attr('transform', "translate(" + (tick.x + 1) + ",0)");
      }
      if (this.hasAxis('top')) {
        tick.topEl.attr('transform', "translate(" + (tick.x + 1) + ",0)");
      }
      if (tick.enter) {
        tick.opacity += dop;
      } else if (tick.exit) {
        tick.opacity -= dop;
      }
      if (tick.enter || tick.exit) {
        if (this.hasAxis('bottom')) {
          tick.bottomEl.style('opacity', tick.opacity);
        }
        if (this.hasAxis('top')) {
          results.push(tick.topEl.style('opacity', tick.opacity));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Plot.prototype.draw = function(delta) {
    if (delta == null) {
      delta = 0;
    }
    return Plot.__super__.draw.call(this);
  };

  Plot.prototype.dimensionsChanged = function() {
    Plot.__super__.dimensionsChanged.call(this);
    this.svg.attr('width', this.width).attr('height', this.height);
    this._sizeCanvas();
    this._buildAxes();
    return this.draw(this.animation.frame * this.animation.delta());
  };

  Plot.prototype.axesChanged = function() {
    var l, len, pos, ref;
    ref = ['top', 'right', 'bottom', 'left'];
    for (l = 0, len = ref.length; l < len; l++) {
      pos = ref[l];
      if ((this.options.margins != null) && (this.options.margins[pos] != null)) {
        continue;
      }
      if (this.hasAxis(pos)) {
        this.margins[pos] = defaultAxisMargins[pos];
      } else {
        this.margins[pos] = 6;
      }
    }
    this._sizeCanvas();
    this._buildAxes();
    return this.draw(this.animation.frame * this.animation.delta());
  };

  Plot.prototype.ticksChanged = function() {
    this._resetInitialTimeTicks();
    this._transitionRangeAxes();
    return this.draw(this.animation.frame * this.animation.delta());
  };

  Plot.prototype.tickFormatsChanged = function() {
    this._resetInitialTimeTicks();
    this._transitionRangeAxes();
    return this.draw(this.animation.frame * this.animation.delta());
  };

  Plot.prototype.marginsChanged = function() {
    var pos, ref, size;
    if (this.options.margins == null) {
      return;
    }
    ref = this.options.margins;
    for (pos in ref) {
      if (!hasProp.call(ref, pos)) continue;
      size = ref[pos];
      if (size == null) {
        this.margins[pos] = 6;
      } else {
        this.margins[pos] = size;
      }
    }
    this._sizeCanvas();
    return this.draw(this.animation.frame * this.animation.delta());
  };

  Plot.prototype.layerChanged = function() {
    this._transitionRangeAxes();
    return Plot.__super__.layerChanged.call(this);
  };

  return Plot;

})(Epoch.Chart.Canvas);

Epoch.Time.Stack = (function(superClass) {
  extend(Stack, superClass);

  function Stack() {
    return Stack.__super__.constructor.apply(this, arguments);
  }

  Stack.prototype._stackLayers = function() {
    var i, l, layer, layers, ref, results, y0;
    if (!((layers = this.getVisibleLayers()).length > 0)) {
      return;
    }
    results = [];
    for (i = l = 0, ref = layers[0].values.length; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
      y0 = 0;
      results.push((function() {
        var len, m, results1;
        results1 = [];
        for (m = 0, len = layers.length; m < len; m++) {
          layer = layers[m];
          layer.values[i].y0 = y0;
          results1.push(y0 += layer.values[i].y);
        }
        return results1;
      })());
    }
    return results;
  };

  Stack.prototype._prepareLayers = function(layers) {
    var d, i, y0;
    y0 = 0;
    for (i in layers) {
      if (!hasProp.call(layers, i)) continue;
      d = layers[i];
      if (!this.data[i].visible) {
        continue;
      }
      d.y0 = y0;
      y0 += d.y;
    }
    return layers;
  };

  Stack.prototype.setData = function(data) {
    Stack.__super__.setData.call(this, data);
    return this._stackLayers();
  };

  Stack.prototype.extent = function() {
    var i, j, l, layers, m, max, ref, ref1, ref2, sum;
    ref = [0, this.getVisibleLayers()], max = ref[0], layers = ref[1];
    if (!layers.length) {
      return [0, 0];
    }
    for (i = l = 0, ref1 = layers[0].values.length; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
      sum = 0;
      for (j = m = 0, ref2 = layers.length; 0 <= ref2 ? m < ref2 : m > ref2; j = 0 <= ref2 ? ++m : --m) {
        sum += layers[j].values[i].y;
      }
      if (sum > max) {
        max = sum;
      }
    }
    return [0, max];
  };

  Stack.prototype.layerChanged = function() {
    var l, layers, len, ref;
    this._stackLayers();
    ref = this._queue;
    for (l = 0, len = ref.length; l < len; l++) {
      layers = ref[l];
      this._prepareLayers(layers);
    }
    return Stack.__super__.layerChanged.call(this);
  };

  return Stack;

})(Epoch.Time.Plot);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Time.Area = (function(superClass) {
  extend(Area, superClass);

  function Area(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).type == null) {
      base.type = 'time.area';
    }
    Area.__super__.constructor.call(this, this.options);
    this.draw();
  }

  Area.prototype.setStyles = function(layer) {
    var styles;
    if ((layer != null) && (layer.className != null)) {
      styles = this.getStyles("g." + (layer.className.replace(/\s/g, '.')) + " path.area");
    } else {
      styles = this.getStyles("g path.area");
    }
    this.ctx.fillStyle = styles.fill;
    if (styles.stroke != null) {
      this.ctx.strokeStyle = styles.stroke;
    }
    if (styles['stroke-width'] != null) {
      return this.ctx.lineWidth = styles['stroke-width'].replace('px', '');
    }
  };

  Area.prototype._drawAreas = function(delta) {
    var args, borderX, entry, firstX, i, j, k, l, layer, layers, ref, ref1, ref2, results, trans, w, y;
    if (delta == null) {
      delta = 0;
    }
    ref = [this.y(), this.w(), this.getVisibleLayers()], y = ref[0], w = ref[1], layers = ref[2];
    results = [];
    for (i = l = ref1 = layers.length - 1; ref1 <= 0 ? l <= 0 : l >= 0; i = ref1 <= 0 ? ++l : --l) {
      if (!(layer = layers[i])) {
        continue;
      }
      this.setStyles(layer);
      this.ctx.beginPath();
      ref2 = [this.options.windowSize, layer.values.length, this.inTransition()], j = ref2[0], k = ref2[1], trans = ref2[2];
      firstX = null;
      while ((--j >= -2) && (--k >= 0)) {
        entry = layer.values[k];
        args = [(j + 1) * w + delta, y(entry.y + entry.y0)];
        if (trans) {
          args[0] += w;
        }
        if (i === this.options.windowSize - 1) {
          this.ctx.moveTo.apply(this.ctx, args);
        } else {
          this.ctx.lineTo.apply(this.ctx, args);
        }
      }
      if (trans) {
        borderX = (j + 3) * w + delta;
      } else {
        borderX = (j + 2) * w + delta;
      }
      this.ctx.lineTo(borderX, this.innerHeight());
      this.ctx.lineTo(this.width * this.pixelRatio + w + delta, this.innerHeight());
      this.ctx.closePath();
      results.push(this.ctx.fill());
    }
    return results;
  };

  Area.prototype._drawStrokes = function(delta) {
    var args, entry, firstX, i, k, l, layer, layers, ref, ref1, ref2, results, trans, w, y;
    if (delta == null) {
      delta = 0;
    }
    ref = [this.y(), this.w(), this.getVisibleLayers()], y = ref[0], w = ref[1], layers = ref[2];
    results = [];
    for (i = l = ref1 = layers.length - 1; ref1 <= 0 ? l <= 0 : l >= 0; i = ref1 <= 0 ? ++l : --l) {
      if (!(layer = layers[i])) {
        continue;
      }
      this.setStyles(layer);
      this.ctx.beginPath();
      ref2 = [this.options.windowSize, layer.values.length, this.inTransition()], i = ref2[0], k = ref2[1], trans = ref2[2];
      firstX = null;
      while ((--i >= -2) && (--k >= 0)) {
        entry = layer.values[k];
        args = [(i + 1) * w + delta, y(entry.y + entry.y0)];
        if (trans) {
          args[0] += w;
        }
        if (i === this.options.windowSize - 1) {
          this.ctx.moveTo.apply(this.ctx, args);
        } else {
          this.ctx.lineTo.apply(this.ctx, args);
        }
      }
      results.push(this.ctx.stroke());
    }
    return results;
  };

  Area.prototype.draw = function(delta) {
    if (delta == null) {
      delta = 0;
    }
    this.clear();
    this._drawAreas(delta);
    this._drawStrokes(delta);
    return Area.__super__.draw.call(this);
  };

  return Area;

})(Epoch.Time.Stack);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Time.Bar = (function(superClass) {
  extend(Bar, superClass);

  function Bar(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).type == null) {
      base.type = 'time.bar';
    }
    Bar.__super__.constructor.call(this, this.options);
    this.draw();
  }

  Bar.prototype._offsetX = function() {
    return 0.5 * this.w() / this.pixelRatio;
  };

  Bar.prototype.setStyles = function(className) {
    var styles;
    styles = this.getStyles("rect.bar." + (className.replace(/\s/g, '.')));
    this.ctx.fillStyle = styles.fill;
    if ((styles.stroke == null) || styles.stroke === 'none') {
      this.ctx.strokeStyle = 'transparent';
    } else {
      this.ctx.strokeStyle = styles.stroke;
    }
    if (styles['stroke-width'] != null) {
      return this.ctx.lineWidth = styles['stroke-width'].replace('px', '');
    }
  };

  Bar.prototype.draw = function(delta) {
    var args, entry, ex, ey, ey0, i, iBoundry, j, k, layer, len, ref, ref1, ref2, ref3, trans, w, y;
    if (delta == null) {
      delta = 0;
    }
    this.clear();
    ref = [this.y(), this.w()], y = ref[0], w = ref[1];
    ref1 = this.getVisibleLayers();
    for (j = 0, len = ref1.length; j < len; j++) {
      layer = ref1[j];
      if (!Epoch.isNonEmptyArray(layer.values)) {
        continue;
      }
      this.setStyles(layer.className);
      ref2 = [this.options.windowSize, layer.values.length, this.inTransition()], i = ref2[0], k = ref2[1], trans = ref2[2];
      iBoundry = trans ? -1 : 0;
      while ((--i >= iBoundry) && (--k >= 0)) {
        entry = layer.values[k];
        ref3 = [i * w + delta, entry.y, entry.y0], ex = ref3[0], ey = ref3[1], ey0 = ref3[2];
        if (trans) {
          ex += w;
        }
        args = [ex + 1, y(ey + ey0), w - 2, this.innerHeight() - y(ey) + 0.5 * this.pixelRatio];
        this.ctx.fillRect.apply(this.ctx, args);
        this.ctx.strokeRect.apply(this.ctx, args);
      }
    }
    return Bar.__super__.draw.call(this);
  };

  return Bar;

})(Epoch.Time.Stack);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Time.Gauge = (function(superClass) {
  var defaults, optionListeners;

  extend(Gauge, superClass);

  defaults = {
    type: 'time.gauge',
    domain: [0, 1],
    ticks: 10,
    tickSize: 5,
    tickOffset: 5,
    fps: 34,
    format: Epoch.Formats.percent
  };

  optionListeners = {
    'option:domain': 'domainChanged',
    'option:ticks': 'ticksChanged',
    'option:tickSize': 'tickSizeChanged',
    'option:tickOffset': 'tickOffsetChanged',
    'option:format': 'formatChanged'
  };

  function Gauge(options) {
    this.options = options != null ? options : {};
    Gauge.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    this.value = this.options.value || 0;
    if (this.options.model) {
      this.options.model.on('data:push', (function(_this) {
        return function() {
          return _this.pushFromModel();
        };
      })(this));
    }
    if (this.el.style('position') !== 'absolute' && this.el.style('position') !== 'relative') {
      this.el.style('position', 'relative');
    }
    this.svg = this.el.insert('svg', ':first-child').attr('width', this.width).attr('height', this.height).attr('class', 'gauge-labels');
    this.svg.style({
      'position': 'absolute',
      'z-index': '1'
    });
    this.svg.append('g').attr('transform', "translate(" + (this.textX()) + ", " + (this.textY()) + ")").append('text').attr('class', 'value').text(this.options.format(this.value));
    this.animation = {
      interval: null,
      active: false,
      delta: 0,
      target: 0
    };
    this._animate = (function(_this) {
      return function() {
        if (Math.abs(_this.animation.target - _this.value) < Math.abs(_this.animation.delta)) {
          _this.value = _this.animation.target;
          clearInterval(_this.animation.interval);
          _this.animation.active = false;
        } else {
          _this.value += _this.animation.delta;
        }
        _this.svg.select('text.value').text(_this.options.format(_this.value));
        return _this.draw();
      };
    })(this);
    this.onAll(optionListeners);
    this.draw();
  }

  Gauge.prototype.update = function(value) {
    this.animation.target = value;
    this.animation.delta = (value - this.value) / this.options.fps;
    if (!this.animation.active) {
      this.animation.interval = setInterval(this._animate, 1000 / this.options.fps);
      return this.animation.active = true;
    }
  };

  Gauge.prototype.push = function(value) {
    return this.update(value);
  };

  Gauge.prototype.pushFromModel = function() {
    var next;
    next = this.options.model.getNext(this.options.type, this.options.dataFormat);
    return this.update(next);
  };

  Gauge.prototype.radius = function() {
    return this.getHeight() / 1.58;
  };

  Gauge.prototype.centerX = function() {
    return this.getWidth() / 2;
  };

  Gauge.prototype.centerY = function() {
    return 0.68 * this.getHeight();
  };

  Gauge.prototype.textX = function() {
    return this.width / 2;
  };

  Gauge.prototype.textY = function() {
    return 0.48 * this.height;
  };

  Gauge.prototype.getAngle = function(value) {
    var a, b, ref;
    ref = this.options.domain, a = ref[0], b = ref[1];
    return ((value - a) / (b - a)) * (Math.PI + 2 * Math.PI / 8) - Math.PI / 2 - Math.PI / 8;
  };

  Gauge.prototype.setStyles = function(selector) {
    var styles;
    styles = this.getStyles(selector);
    this.ctx.fillStyle = styles.fill;
    this.ctx.strokeStyle = styles.stroke;
    if (styles['stroke-width'] != null) {
      return this.ctx.lineWidth = styles['stroke-width'].replace('px', '');
    }
  };

  Gauge.prototype.draw = function() {
    var a, c, cx, cy, i, j, r, ref, ref1, ref2, ref3, s, t, tickOffset, tickSize, x1, x2, y1, y2;
    ref = [this.centerX(), this.centerY(), this.radius()], cx = ref[0], cy = ref[1], r = ref[2];
    ref1 = [this.options.tickOffset, this.options.tickSize], tickOffset = ref1[0], tickSize = ref1[1];
    this.clear();
    t = d3.scale.linear().domain([0, this.options.ticks]).range([-(9 / 8) * Math.PI, Math.PI / 8]);
    this.setStyles('.epoch .gauge .tick');
    this.ctx.beginPath();
    for (i = j = 0, ref2 = this.options.ticks; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
      a = t(i);
      ref3 = [Math.cos(a), Math.sin(a)], c = ref3[0], s = ref3[1];
      x1 = c * (r - tickOffset) + cx;
      y1 = s * (r - tickOffset) + cy;
      x2 = c * (r - tickOffset - tickSize) + cx;
      y2 = s * (r - tickOffset - tickSize) + cy;
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
    }
    this.ctx.stroke();
    this.setStyles('.epoch .gauge .arc.outer');
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, -(9 / 8) * Math.PI, (1 / 8) * Math.PI, false);
    this.ctx.stroke();
    this.setStyles('.epoch .gauge .arc.inner');
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r - 10, -(9 / 8) * Math.PI, (1 / 8) * Math.PI, false);
    this.ctx.stroke();
    this.drawNeedle();
    return Gauge.__super__.draw.call(this);
  };

  Gauge.prototype.drawNeedle = function() {
    var cx, cy, r, ratio, ref;
    ref = [this.centerX(), this.centerY(), this.radius()], cx = ref[0], cy = ref[1], r = ref[2];
    ratio = this.value / this.options.domain[1];
    this.setStyles('.epoch .gauge .needle');
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(this.getAngle(this.value));
    this.ctx.moveTo(4 * this.pixelRatio, 0);
    this.ctx.lineTo(-4 * this.pixelRatio, 0);
    this.ctx.lineTo(-1 * this.pixelRatio, 19 - r);
    this.ctx.lineTo(1, 19 - r);
    this.ctx.fill();
    this.setStyles('.epoch .gauge .needle-base');
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.getWidth() / 25, 0, 2 * Math.PI);
    this.ctx.fill();
    return this.ctx.restore();
  };

  Gauge.prototype.domainChanged = function() {
    return this.draw();
  };

  Gauge.prototype.ticksChanged = function() {
    return this.draw();
  };

  Gauge.prototype.tickSizeChanged = function() {
    return this.draw();
  };

  Gauge.prototype.tickOffsetChanged = function() {
    return this.draw();
  };

  Gauge.prototype.formatChanged = function() {
    return this.svg.select('text.value').text(this.options.format(this.value));
  };

  return Gauge;

})(Epoch.Chart.Canvas);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Time.Heatmap = (function(superClass) {
  var colorFunctions, defaults, optionListeners;

  extend(Heatmap, superClass);

  defaults = {
    type: 'time.heatmap',
    buckets: 10,
    bucketRange: [0, 100],
    opacity: 'linear',
    bucketPadding: 2,
    paintZeroValues: false,
    cutOutliers: false
  };

  colorFunctions = {
    root: function(value, max) {
      return Math.pow(value / max, 0.5);
    },
    linear: function(value, max) {
      return value / max;
    },
    quadratic: function(value, max) {
      return Math.pow(value / max, 2);
    },
    cubic: function(value, max) {
      return Math.pow(value / max, 3);
    },
    quartic: function(value, max) {
      return Math.pow(value / max, 4);
    },
    quintic: function(value, max) {
      return Math.pow(value / max, 5);
    }
  };

  optionListeners = {
    'option:buckets': 'bucketsChanged',
    'option:bucketRange': 'bucketRangeChanged',
    'option:opacity': 'opacityChanged',
    'option:bucketPadding': 'bucketPaddingChanged',
    'option:paintZeroValues': 'paintZeroValuesChanged',
    'option:cutOutliers': 'cutOutliersChanged'
  };

  function Heatmap(options) {
    this.options = options != null ? options : {};
    Heatmap.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, defaults));
    this._setOpacityFunction();
    this._setupPaintCanvas();
    this.onAll(optionListeners);
    this.draw();
  }

  Heatmap.prototype._setOpacityFunction = function() {
    if (Epoch.isString(this.options.opacity)) {
      this._opacityFn = colorFunctions[this.options.opacity];
      if (this._opacityFn == null) {
        return Epoch.exception("Unknown coloring function provided '" + this.options.opacity + "'");
      }
    } else if (Epoch.isFunction(this.options.opacity)) {
      return this._opacityFn = this.options.opacity;
    } else {
      return Epoch.exception("Unknown type for provided coloring function.");
    }
  };

  Heatmap.prototype.setData = function(data) {
    var k, layer, len, ref, results;
    Heatmap.__super__.setData.call(this, data);
    ref = this.data;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      layer = ref[k];
      results.push(layer.values = layer.values.map((function(_this) {
        return function(entry) {
          return _this._prepareEntry(entry);
        };
      })(this)));
    }
    return results;
  };

  Heatmap.prototype._getBuckets = function(entry) {
    var bucketSize, count, i, index, k, prepared, ref, ref1, value;
    prepared = {
      time: entry.time,
      max: 0,
      buckets: (function() {
        var k, ref, results;
        results = [];
        for (i = k = 0, ref = this.options.buckets; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
          results.push(0);
        }
        return results;
      }).call(this)
    };
    bucketSize = (this.options.bucketRange[1] - this.options.bucketRange[0]) / this.options.buckets;
    ref = entry.histogram;
    for (value in ref) {
      if (!hasProp.call(ref, value)) continue;
      count = ref[value];
      index = parseInt((value - this.options.bucketRange[0]) / bucketSize);
      if (this.options.cutOutliers && ((index < 0) || (index >= this.options.buckets))) {
        continue;
      }
      if (index < 0) {
        index = 0;
      } else if (index >= this.options.buckets) {
        index = this.options.buckets - 1;
      }
      prepared.buckets[index] += parseInt(count);
    }
    for (i = k = 0, ref1 = prepared.buckets.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      prepared.max = Math.max(prepared.max, prepared.buckets[i]);
    }
    return prepared;
  };

  Heatmap.prototype.y = function() {
    return d3.scale.linear().domain(this.options.bucketRange).range([this.innerHeight(), 0]);
  };

  Heatmap.prototype.ySvg = function() {
    return d3.scale.linear().domain(this.options.bucketRange).range([this.innerHeight() / this.pixelRatio, 0]);
  };

  Heatmap.prototype.h = function() {
    return this.innerHeight() / this.options.buckets;
  };

  Heatmap.prototype._offsetX = function() {
    return 0.5 * this.w() / this.pixelRatio;
  };

  Heatmap.prototype._setupPaintCanvas = function() {
    this.paintWidth = (this.options.windowSize + 1) * this.w();
    this.paintHeight = this.height * this.pixelRatio;
    this.paint = document.createElement('CANVAS');
    this.paint.width = this.paintWidth;
    this.paint.height = this.paintHeight;
    this.p = Epoch.Util.getContext(this.paint);
    this.redraw();
    this.on('after:shift', '_paintEntry');
    this.on('transition:end', '_shiftPaintCanvas');
    return this.on('transition:end', (function(_this) {
      return function() {
        return _this.draw(_this.animation.frame * _this.animation.delta());
      };
    })(this));
  };

  Heatmap.prototype.redraw = function() {
    var drawColumn, entryIndex;
    if (!(Epoch.isNonEmptyArray(this.data) && Epoch.isNonEmptyArray(this.data[0].values))) {
      return;
    }
    entryIndex = this.data[0].values.length;
    drawColumn = this.options.windowSize;
    if (this.inTransition()) {
      drawColumn++;
    }
    while ((--entryIndex >= 0) && (--drawColumn >= 0)) {
      this._paintEntry(entryIndex, drawColumn);
    }
    return this.draw(this.animation.frame * this.animation.delta());
  };

  Heatmap.prototype._computeColor = function(value, max, color) {
    return Epoch.Util.toRGBA(color, this._opacityFn(value, max));
  };

  Heatmap.prototype._paintEntry = function(entryIndex, drawColumn) {
    var bucket, bucketTotals, color, count, entries, entry, h, i, j, k, layer, len, len1, m, max, maxTotal, ref, ref1, ref2, results, styles, sum, w, xPos;
    if (entryIndex == null) {
      entryIndex = null;
    }
    if (drawColumn == null) {
      drawColumn = null;
    }
    ref = [this.w(), this.h()], w = ref[0], h = ref[1];
    if (entryIndex == null) {
      entryIndex = this.data[0].values.length - 1;
    }
    if (drawColumn == null) {
      drawColumn = this.options.windowSize;
    }
    entries = [];
    bucketTotals = (function() {
      var k, ref1, results;
      results = [];
      for (i = k = 0, ref1 = this.options.buckets; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        results.push(0);
      }
      return results;
    }).call(this);
    maxTotal = 0;
    ref1 = this.getVisibleLayers();
    for (k = 0, len = ref1.length; k < len; k++) {
      layer = ref1[k];
      entry = this._getBuckets(layer.values[entryIndex]);
      ref2 = entry.buckets;
      for (bucket in ref2) {
        if (!hasProp.call(ref2, bucket)) continue;
        count = ref2[bucket];
        bucketTotals[bucket] += count;
      }
      maxTotal += entry.max;
      styles = this.getStyles("." + (layer.className.split(' ').join('.')) + " rect.bucket");
      entry.color = styles.fill;
      entries.push(entry);
    }
    xPos = drawColumn * w;
    this.p.clearRect(xPos, 0, w, this.paintHeight);
    j = this.options.buckets;
    results = [];
    for (bucket in bucketTotals) {
      if (!hasProp.call(bucketTotals, bucket)) continue;
      sum = bucketTotals[bucket];
      color = this._avgLab(entries, bucket);
      max = 0;
      for (m = 0, len1 = entries.length; m < len1; m++) {
        entry = entries[m];
        max += (entry.buckets[bucket] / sum) * maxTotal;
      }
      if (sum > 0 || this.options.paintZeroValues) {
        this.p.fillStyle = this._computeColor(sum, max, color);
        this.p.fillRect(xPos, (j - 1) * h, w - this.options.bucketPadding, h - this.options.bucketPadding);
      }
      results.push(j--);
    }
    return results;
  };

  Heatmap.prototype._shiftPaintCanvas = function() {
    var data;
    data = this.p.getImageData(this.w(), 0, this.paintWidth - this.w(), this.paintHeight);
    return this.p.putImageData(data, 0, 0);
  };

  Heatmap.prototype._avgLab = function(entries, bucket) {
    var a, b, color, entry, i, k, l, len, ratio, ref, total, value;
    ref = [0, 0, 0, 0], l = ref[0], a = ref[1], b = ref[2], total = ref[3];
    for (k = 0, len = entries.length; k < len; k++) {
      entry = entries[k];
      if (entry.buckets[bucket] == null) {
        continue;
      }
      total += entry.buckets[bucket];
    }
    for (i in entries) {
      if (!hasProp.call(entries, i)) continue;
      entry = entries[i];
      if (entry.buckets[bucket] != null) {
        value = entry.buckets[bucket] | 0;
      } else {
        value = 0;
      }
      ratio = value / total;
      color = d3.lab(entry.color);
      l += ratio * color.l;
      a += ratio * color.a;
      b += ratio * color.b;
    }
    return d3.lab(l, a, b).toString();
  };

  Heatmap.prototype.draw = function(delta) {
    if (delta == null) {
      delta = 0;
    }
    this.clear();
    this.ctx.drawImage(this.paint, delta, 0);
    return Heatmap.__super__.draw.call(this);
  };

  Heatmap.prototype.bucketsChanged = function() {
    return this.redraw();
  };

  Heatmap.prototype.bucketRangeChanged = function() {
    this._transitionRangeAxes();
    return this.redraw();
  };

  Heatmap.prototype.opacityChanged = function() {
    this._setOpacityFunction();
    return this.redraw();
  };

  Heatmap.prototype.bucketPaddingChanged = function() {
    return this.redraw();
  };

  Heatmap.prototype.paintZeroValuesChanged = function() {
    return this.redraw();
  };

  Heatmap.prototype.cutOutliersChanged = function() {
    return this.redraw();
  };

  Heatmap.prototype.layerChanged = function() {
    return this.redraw();
  };

  return Heatmap;

})(Epoch.Time.Plot);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Epoch.Time.Line = (function(superClass) {
  extend(Line, superClass);

  function Line(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).type == null) {
      base.type = 'time.line';
    }
    Line.__super__.constructor.call(this, this.options);
    this.draw();
  }

  Line.prototype.setStyles = function(className) {
    var styles;
    styles = this.getStyles("g." + (className.replace(/\s/g, '.')) + " path.line");
    this.ctx.fillStyle = styles.fill;
    this.ctx.strokeStyle = styles.stroke;
    return this.ctx.lineWidth = this.pixelRatio * styles['stroke-width'].replace('px', '');
  };

  Line.prototype.draw = function(delta) {
    var args, entry, i, j, k, layer, len, ref, ref1, trans, w, y;
    if (delta == null) {
      delta = 0;
    }
    this.clear();
    w = this.w();
    ref = this.getVisibleLayers();
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      if (!Epoch.isNonEmptyArray(layer.values)) {
        continue;
      }
      this.setStyles(layer.className);
      this.ctx.beginPath();
      y = this.y(layer.range);
      ref1 = [this.options.windowSize, layer.values.length, this.inTransition()], i = ref1[0], k = ref1[1], trans = ref1[2];
      while ((--i >= -2) && (--k >= 0)) {
        entry = layer.values[k];
        args = [(i + 1) * w + delta, y(entry.y)];
        if (trans) {
          args[0] += w;
        }
        if (i === this.options.windowSize - 1) {
          this.ctx.moveTo.apply(this.ctx, args);
        } else {
          this.ctx.lineTo.apply(this.ctx, args);
        }
      }
      this.ctx.stroke();
    }
    return Line.__super__.draw.call(this);
  };

  return Line;

})(Epoch.Time.Plot);

Epoch._typeMap = {
  'area': Epoch.Chart.Area,
  'bar': Epoch.Chart.Bar,
  'line': Epoch.Chart.Line,
  'pie': Epoch.Chart.Pie,
  'scatter': Epoch.Chart.Scatter,
  'histogram': Epoch.Chart.Histogram,
  'time.area': Epoch.Time.Area,
  'time.bar': Epoch.Time.Bar,
  'time.line': Epoch.Time.Line,
  'time.gauge': Epoch.Time.Gauge,
  'time.heatmap': Epoch.Time.Heatmap
};

var jQueryModule;

jQueryModule = function($) {
  var DATA_NAME;
  DATA_NAME = 'epoch-chart';
  return $.fn.epoch = function(options) {
    var chart, klass;
    options.el = this.get(0);
    if ((chart = this.data(DATA_NAME)) == null) {
      klass = Epoch._typeMap[options.type];
      if (klass == null) {
        Epoch.exception("Unknown chart type '" + options.type + "'");
      }
      this.data(DATA_NAME, (chart = new klass(options)));
    }
    return chart;
  };
};

if (window.jQuery != null) {
  jQueryModule(jQuery);
}

var MooToolsModule;

MooToolsModule = function() {
  var DATA_NAME;
  DATA_NAME = 'epoch-chart';
  return Element.implement('epoch', function(options) {
    var chart, klass, self;
    self = $$(this);
    if ((chart = self.retrieve(DATA_NAME)[0]) == null) {
      options.el = this;
      klass = Epoch._typeMap[options.type];
      if (klass == null) {
        Epoch.exception("Unknown chart type '" + options.type + "'");
      }
      self.store(DATA_NAME, (chart = new klass(options)));
    }
    return chart;
  });
};

if (window.MooTools != null) {
  MooToolsModule();
}

var zeptoModule;

zeptoModule = function($) {
  var DATA_NAME, chartId, chartMap, next_cid;
  DATA_NAME = 'epoch-chart';
  chartMap = {};
  chartId = 0;
  next_cid = function() {
    return DATA_NAME + "-" + (++chartId);
  };
  return $.extend($.fn, {
    epoch: function(options) {
      var chart, cid, klass;
      if ((cid = this.data(DATA_NAME)) != null) {
        return chartMap[cid];
      }
      options.el = this.get(0);
      klass = Epoch._typeMap[options.type];
      if (klass == null) {
        Epoch.exception("Unknown chart type '" + options.type + "'");
      }
      this.data(DATA_NAME, (cid = next_cid()));
      chart = new klass(options);
      chartMap[cid] = chart;
      return chart;
    }
  });
};

if (window.Zepto != null) {
  zeptoModule(Zepto);
}
