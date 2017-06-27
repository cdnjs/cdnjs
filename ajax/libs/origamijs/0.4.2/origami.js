/*!
 * Origami.js 0.4.1
 * https://origamijs.com/
 *
 * Copyright Raphael Amorim 2016
 * Released under the GPL-4.0 license
 *
 * Date: 2016-02-06T22:24Z
 */

(function( window ) {

/**
 * Config object: Maintain internal state
 * Later exposed as Origami.config
 * `config` initialized at top of scope
 */

var Origami = {
  // Current Paper
  paper: null
};

var config = {
  // Document Styles
  documentStyles: [],

  // Virtual Styles
  virtualStyles: {},

  // All contexts saved
  contexts: [],

  // Origami Shapes Defaults
  defaults: {
    arc: {
      background: 'rgba(0, 0, 0, 0)',
      strokeStyle: 'rgba(0, 0, 0, 0)',
      lineWidth: null,
    },
    rect: {
      background: 'rgba(0, 0, 0, 0)',
      strokeStyle: 'rgba(0, 0, 0, 0)',
      lineWidth: null,
    },
    polygon: {
      background: 'rgba(0, 0, 0, 0)',
      strokeStyle: 'rgba(0, 0, 0, 0)',
      lineWidth: null,
    },
    line: {
      strokeStyle: 'rgba(0, 0, 0, 0)',
      lineWidth: null,
    },
    text: {
      font: '14px Helvetica',
      strokeStyle: 'rgba(0, 0, 0, 0)',
      color: '#000',
      lineWidth: null,
    }
  }
};

var prefix = "[origami.js]";

Origami.warning = function warning(message, obj){
    if (console && console.warn)
        console.warn(prefix, message, obj);
};

Origami.error = function error(message){
    throw new Error(prefix.concat(' ' + message));
};
Origami.init = function(el) {
  if (el.canvas) {
    el = el.canvas;
  } else {
    el = document.querySelector(el);
  }

  if (!el)
    this.error('Please use a valid selector or canvas context');

  var existentContext = exists(el, config.contexts);
  if (existentContext) {
    this.paper = existentContext;
    return this;
  }

  if (!el.getContext)
    this.error('Please verify if it\'s a valid canvas element');

  var context = el.getContext('2d');
  var current = {
    element: el,
    queue: [],
    index: config.contexts.length,
    flip: false,
    frame: null,
    ctx: context,
    width: el.width,
    height: el.height,
  };

  config.contexts.push(current);
  this.paper = current;
  return this;
}

Origami.styles = function() {
  if (!this.documentStyles)
    defineDocumentStyles(Origami);

  var selectors = arguments;
  if (!selectors.length)
    return this;

  for (var i = 0; i < selectors.length; i++) {
    var style = styleRuleValueFrom(selectors[i], (this.documentStyles[0] || []));
    Origami.virtualStyles[selectors[i]] = style;
  }
  return this;
}

Origami.getPaper = function() {
  return this.paper;
}

Origami.canvasCtx = function() {
  return this.paper.ctx;
}

Origami.getContexts = function() {
  return config.contexts;
}

Origami.cleanContexts = function() {
  config.contexts = [];
}

Origami.draw = function(delay) {
  var self = this;
  var abs = new Screen(self.paper),
    queueList = self.paper.queue;

  setTimeout(function() {
    for (var i = 0; i < queueList.length; i++) {
      if (queueList[i].loaded === false || queueList[i].failed) {
        Origami.warning('couldn\'t able to load:', queueList[i].params)
      }
      abs[queueList[i].assign](queueList[i].params);
    }
    self.paper.queue = [];
  }, delay);

  return self;
}

Origami.load = function(fn) {
  var mOrigami = clone(this);
  mOrigami.paper = this.paper;
  var loadInterval = setInterval(function() {
    var dataLoad = mOrigami.paper.queue.filter(function(item) {
      return (item.loaded === false && !item.failed);
    });

    // When already loaded
    if (!dataLoad.length) {
      clearInterval(loadInterval);
      fn.bind(mOrigami, mOrigami)();
    }
  }, 200);
}

function Queue(assign, params, loaded) {
  this.paper.queue.push({
    assign: assign,
    params: params,
    loaded: loaded
  });
}

var queue = Queue.bind(Origami);
// Utilities.js

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Check if element exists in a Array of NodeItems
 * @private
 * @param {NodeItem} current nodeItem to check
 * @param {Array} array of NodeItems
 * @returns {NodeItem} NodeItem exitent in array
 */
function exists(el, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].element.isEqualNode(el))
      return arr[i];
  }
  return false;
}

/**
 * Filter arguments by rules
 * @private
 * @param {Array} methods arguments
 * @param {Object} rules to apply
 * @returns {Object} arguments filtered
 */
function argsByRules(argsArray, rules) {
  var params = ['x', 'y', 'width', 'height'],
    args = {};

  if (rules)
    params = rules;

  for (var i = 0; i < argsArray.length; i++) {
    if (typeof(argsArray[i]) === "object")
      args["style"] = argsArray[i];
    else
    if (params.length)
      args[params.shift()] = argsArray[i];
  }

  if (!args.style) {
    args.style = {};
  }

  if (args.style.border) {
    args.style.border = args.style.border.split(' ');
    args.style.border[0] = args.style.border[0].replace(/[^0-9]/g, '');
  }

  return args;
}

/**
 * Return all documentStyles to a especified origami context
 * @private
 * @returns undefined
 */
function defineDocumentStyles() {
  for (var i = 0; i < document.styleSheets.length; i++) {
    var mysheet = document.styleSheets[i],
      myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
    config.documentStyles.push(myrules);
  }
}

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
function extend(a, b, undefOnly) {
  for (var prop in b) {
    if (hasOwn.call(b, prop)) {

      // Avoid "Member not found" error in IE8 caused by messing with window.constructor
      // This block runs on every environment, so `global` is being used instead of `window`
      // to avoid errors on node.
      if (prop !== "constructor" || a !== global) {
        if (b[prop] === undefined) {
          delete a[prop];
        } else if (!(undefOnly && typeof a[prop] !== "undefined")) {
          a[prop] = b[prop];
        }
      }
    }
  }
  return a;
}

/**
 * Get Style Rule from a specified element
 * @private
 * @param {String} selector from element
 * @param {Array} Document Style Rules
 * @returns {Object} Merged values of defaults and options
 */
function styleRuleValueFrom(selector, documentStyleRules) {
  for (var j = 0; j < documentStyleRules.length; j++) {
    if (documentStyleRules[j].selectorText && documentStyleRules[j].selectorText.toLowerCase() === selector) {
      return documentStyleRules[j].style;
    }
  }
}

/**
 * Clone a object
 * @private
 * @param {Object} object
 * @returns {Object} cloned object
 */
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
function Screen(currentContext) {
  this.paper = currentContext;
}

Screen.prototype.translate = function(params) {
  this.paper.ctx.translate(params.x, params.y)
}

Screen.prototype.background = function(params) {
  this.paper.element.style.backgroundColor = params.color;
}

Screen.prototype.restore = function() {
  this.paper.ctx.restore();
}

Screen.prototype.save = function() {
  this.paper.ctx.save();
}

Screen.prototype.composition = function(params) {
  this.paper.ctx.globalCompositeOperation = params.globalComposite;
}

Screen.prototype.rotate = function(params) {
  this.paper.ctx.rotate(params.degrees);
}

Screen.prototype.stop = function() {
  window.cancelAnimationFrame(this.paper.frame);
  this.paper.frame = false;
}

Screen.prototype.nextFrame = function(params) {
  this.paper.frame = window.requestAnimationFrame(params.fn);
}

Screen.prototype.scale = function(params) {
  this.paper.ctx.scale(params.width, params.height);
}

Screen.prototype.flip = function() {
  this.paper.flip = 'horizontal';
  if (type && typeof(type) === 'string')
    this.paper.flip = type;
}

Screen.prototype.flipEnd = function() {
  this.paper.flip = false;
}

Screen.prototype.clear = function(){
  this.paper.ctx.clearRect(0, 0, this.paper.width, this.paper.height);
}

Screen.prototype.on = function(params) {
  this.paper.element.addEventListener(params.ev, params.fn);
}
function ArcShape(params) {
  var args = params.args,
    style = args.style,
    def = config.defaults.arc;

  this.paper.ctx.beginPath();
  this.paper.ctx.arc(args.x, args.y, (args.r || def.radius), (args.sAngle || 0), (args.eAngle || 2 * Math.PI));
  this.paper.ctx.fillStyle = (style.background || style.bg) ? (style.background || style.bg) : def.background;
  this.paper.ctx.fill();
  this.paper.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  this.paper.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  this.paper.ctx.stroke();
  this.paper.ctx.closePath();
}

Screen.prototype.arc = ArcShape;

Origami.arc = function() {
  var args = [].slice.call(arguments);
  args = argsByRules(args, ['x', 'y', 'r', 'sAngle', 'eAngle']);

  queue('arc', {
    args: args
  });
  return this;
};

function ImageShape(params) {
  var image = params.image,
    x = params.x,
    y = params.y,
    width = params.width,
    height = params.height;

    this.paper.ctx.save();
    if (this.paper.flip) {
      if (this.paper.flip === 'horizontal') {
        this.paper.ctx.scale(-1, 1);
        width = width * -1;
      }
      if (this.paper.flip === 'vertical') {
        this.paper.ctx.scale(1, -1);
        height = height * -1;
      }
    }

    this.paper.ctx.beginPath();
    this.paper.ctx.drawImage(image, Math.floor((x || 0)), Math.floor((y || 0)), width, height);
    this.paper.ctx.closePath();
    this.paper.ctx.restore();
}

Screen.prototype.image = ImageShape;

Origami.image = function(image, x, y, width, height) {
  var self = this;
  if (!image)
    return this;

  if (typeof(image) === 'string') {
    var img = new Image();
    img.src = image;
    image = img;
  }

  var item = {
    image: image,
    x: x,
    y: y,
    width: width,
    height: height
  };

  if (image.complete) {
    item.width = width || image.naturalWidth;
    item.height = height || image.naturalHeight;

    queue('image', item);
    return self;
  }

  queue('image', item, false);
  var reference = (self.paper.queue.length - 1),
    currentQueue = config.contexts[this.paper.index].queue[reference];

  image.addEventListener('load', function() {
    if (!currentQueue)
      return false;
    currentQueue.params.width = (item.width || image.naturalWidth);
    currentQueue.params.height = (item.height || image.naturalHeight);
    currentQueue.loaded = true;
  });

  image.addEventListener('error', function() {
    if (!currentQueue)
      return false;
    currentQueue.failed = true;
  })

  return self;
};
function LineShape(params) {
  var def = config.defaults.line,
      style = params.style,
      pointA = params.pointA,
      pointB = params.pointB;

  this.paper.ctx.beginPath();
  this.paper.ctx.moveTo((pointA.x || 0), (pointA.y || 0));
  this.paper.ctx.lineTo((pointB.x || 0), (pointB.y || 0));

  this.paper.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  this.paper.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  this.paper.ctx.stroke();
  this.paper.ctx.closePath();
}

Screen.prototype.line = LineShape;

Origami.line = function(pointA, pointB, style) {
  if (!style)
    style = {};

  if (style.border) {
    style.border = style.border.split(' ');
    style.border[0] = style.border[0].replace(/[^0-9]/g, '');
  }

  queue('line', {
    pointA: pointA,
    pointB: pointB,
    style: style
  });
  return this;
};

function PolygonShape(params) {
  var args = params.args,
    style = params.style,
    def = config.defaults.polygon;

  this.paper.ctx.beginPath();
  this.paper.ctx.fillStyle = (style.background) ? style.background : def.background;
  this.paper.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  this.paper.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;

  for (var p = 0; p < args.length; p++) {
    if (!args[p].x)
      continue;

    if (p)
      this.paper.ctx.lineTo(args[p].x, args[p].y);
    else
      this.paper.ctx.moveTo(args[p].x, args[p].y);
  }

  this.paper.ctx.stroke();
  this.paper.ctx.fill();
  this.paper.ctx.closePath();
}

Screen.prototype.polygon = PolygonShape;

Origami.polygon = function() {
  var args = [].slice.call(arguments),
    settedArgs = argsByRules(args);

  queue('polygon', {
    style: settedArgs.style,
    args: args
  });
  return this;
};
function RectShape(params) {
  var def = config.defaults.rect,
    style = params.style,
    args = params.args;

  paper.ctx.beginPath();
  paper.ctx.fillStyle = (style.background) ? style.background : def.background;
  paper.ctx.fillRect(args.x, args.y, args.width, (args.height || args.width));

  paper.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  paper.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  paper.ctx.strokeRect(args.x, args.y, args.width, (args.height || args.width));
  paper.ctx.closePath();
}

Screen.prototype.rect = RectShape;

Origami.rect = function() {
  var args = [].slice.call(arguments);
  args = argsByRules(args);

  queue('rect', {
    style: args.style,
    args: args
  });
  return this;
};
function SpriteShape(params) {
  var properties = params.properties,
    dw = params.width / properties.frames;

  drawSprite.call(this, {
    image: params.image,
    posX: 0,
    posY: 0,
    frame: properties.frames,
    loop: properties.loop,
    width: dw,
    widthTotal: params.width,
    height: params.height,
    dx: params.x,
    dy: params.y,
    speed: properties.speed,
    animation: null
  });
}

function drawSprite(sprite) {
  var self = this;

  if (sprite.posX === sprite.widthTotal) {
    if (sprite.loop === false) {
      window.cancelAnimationFrame(sprite.animation);
      return;
    }
    sprite.posX = 0;
  }

  self.paper.ctx.clearRect(sprite.dx, sprite.dy, sprite.width, sprite.height);

  self.paper.ctx.beginPath();
  self.paper.ctx.drawImage(sprite.image, sprite.posX, sprite.posY,
    sprite.width, sprite.height, sprite.dx, sprite.dy,
    sprite.width, sprite.height);
  self.paper.ctx.closePath();

  sprite.posX = sprite.posX + sprite.width;

  setTimeout(function() {
    sprite.animation = window.requestAnimationFrame(drawSprite.bind(self, sprite));
  }, sprite.speed);
}

Screen.prototype.sprite = SpriteShape;

Origami.sprite = function(x, y, properties) {
  var self = this;

  if (!properties || !properties.src)
    return this;

  var image = new Image(),
    frames = (properties.frames || 0),
    loop = (properties.loop || true),
    speed = (properties.speed || 10);

  image.src = properties.src;

  var item = {
    x: x,
    y: y,
    image: image,
    properties: properties,
    width: 0,
    height: 0
  };

  if (image.complete) {
    item.width = image.naturalWidth;
    item.height = image.naturalHeight;
    queue('sprite', item);
    return self;
  }

  queue('sprite', item, false);
  var reference = (self.paper.queue.length - 1),
    currentQueue = config.contexts[this.paper.index].queue[reference];

  image.addEventListener('load', function() {
    if (!currentQueue)
      return false;
    currentQueue.params.width = image.naturalWidth;
    currentQueue.params.height = image.naturalHeight;
    currentQueue.loaded = true;
  });

  image.addEventListener('error', function() {
    if (!currentQueue)
      return false;
    currentQueue.failed = true;
  })

  return this;
};

function TextShape(params) {
  var def = config.defaults.text,
    text = params.text,
    x = params.x,
    y = params.y,
    style = params.style;

  if (!style)
    style = {};

  if (style.border) {
    style.border = style.border.split(' ');
    style.border[0] = style.border[0].replace(/[^0-9]/g, '');
  }

  this.paper.ctx.beginPath();
  this.paper.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  this.paper.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  this.paper.ctx.font = (style.font || def.font);
  this.paper.ctx.fillStyle = (style.color || def.color);
  this.paper.ctx.textAlign = (style.align || def.align);
  this.paper.ctx.fillText(text, x, y);
  this.paper.ctx.strokeText(text, x, y);
  this.paper.ctx.fill();
  this.paper.ctx.stroke();
  this.paper.ctx.closePath();
}

Screen.prototype.text = TextShape;

Origami.text = function(text, x, y, style) {
  queue('text', {
    text: text,
    x: x,
    y: y,
    style: style
  });
  return this;
};
// Resource.js

Origami.background = function(color) {
  queue('background', {
    color: color
  });
  return this;
}

Origami.restore = function() {
  queue('restore');
  return this;
}

Origami.save = function() {
  queue('save');
  return this;
}

Origami.composition = function(globalComposite) {
  queue('composition', {
    globalComposite: globalComposite
  })
  return this;
}

Origami.translate = function(x, y) {
  if (x === undefined || x === null) {
    x = 'reset';
  }

  if (typeof(x) === 'string') {
    if (x === 'center') {
      x = context.width / 2;
      y = context.height / 2;
    }
    if (x === 'reset') {
      x = -context.width / 2;
      y = -context.height / 2;
    }
  }

  queue('translate', {
    x: x,
    y: y
  });
  return this;
}

Origami.rotate = function(degrees) {
  if (typeof(degrees) === 'undefined')
    degrees = 'slow';

  if (typeof(degrees) === 'string') {
    // Slow
    if (degrees === 'slow')
      degrees = ((2*Math.PI)/60)*new Date().getSeconds() +
        ((2*Math.PI)/60000)*new Date().getMilliseconds();

    // Normal
    else if (degrees === 'normal')
      degrees = ((2*Math.PI)/30)*new Date().getSeconds() +
        ((2*Math.PI)/30000)*new Date().getMilliseconds();

    // Fast
    else if (degrees === 'fast')
      degrees = ((2*Math.PI)/6)*new Date().getSeconds() +
        ((2*Math.PI)/6000)*new Date().getMilliseconds();
  }

  queue('rotate', {
    degrees: degrees
  })
  return this;
}

Origami.stop = function() {
  queue('stop')
  return this;
}

Origami.nextFrame = function(fn) {
  queue('nextFrame', {
    fn: fn
  })
  return this;
}

Origami.scale = function(width, height) {
  queue('scale', {
    width: width,
    height: height
  })
  return this;
}

Origami.flip = function(type) {
  queue('flip', {
    type: type
  })
  return this;
}

Origami.flipEnd = function() {
  queue('flipEnd')
  return this;
}

Origami.clear = function() {
  queue('clear')
  return this;
}

Origami.on = function(ev, fn) {
  queue('on', {
    ev: ev,
    fn: fn
  })
  return this;
}

// For consistency with CommonJS environments' exports
if ( typeof module !== "undefined" && module && module.exports ){
    module.exports = extend(Origami.init.bind(this), Origami);
}

// For CommonJS with exports, but without module.exports, like Rhino
if ( typeof exports !== "undefined" && exports ) {
    exports.origami = extend(Origami.init.bind(this), Origami);
}

// For browser, export only select globals
if (typeof window === "object") {
    window.origami = extend(Origami.init.bind(Origami), Origami);
}
// Get a reference to the global object
}( (function() {
    return this;
})() ));
