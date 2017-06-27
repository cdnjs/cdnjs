/*!
 * Origami.js 0.3.1
 * https://origamijs.com/
 *
 * Copyright Raphael Amorim 2016
 * Released under the GPL-4.0 license
 *
 * Date: 2016-01-26T14:05Z
 */

(function( window ) {

/**
 * Config object: Maintain internal state
 * Later exposed as Origami.config
 * `config` initialized at top of scope
 */

var config = {
  // Current Paper
  kami: null,

  // Document Styles
  documentStyles: [],

  // Virtual Styles
  virtualStyles: {},

  // All contexts saved
  contexts: [],

  // Flag to loadingData
  loadingData: false,

  // All settings
  settings: {
    inc: 0,
    sum: 0,
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
  }
};

var Origami = {};

// Globals
Origami.kami = config.kami;
Origami.contexts = config.contexts;
Origami.settings = config.settings;
Origami.defaults = Origami.settings.defaults;

// Global Styles
Origami.documentStyles = config.documentStyles;
Origami.virtualStyles = config.virtualStyles;

// Shortcut access to current context
var kami = Origami.kami;

Origami.warning = function warning(message){
    if (console && console.warn)
        console.warn(message);
};

Origami.error = function error(message){
    throw new Error("Origami Error: " + message);
};

Origami.logging = function logging(message){
    if (console && console.log)
        console.log(message);
};

Origami.init = function(el) {
    kami = null;
    Origami._createKami(el);
    defineDocumentStyles(Origami);
    return this;
}

Origami.styles = function() {
    var selectors = arguments;
    if (!selectors.length)
        return this;

    for (var i = 0; i < selectors.length; i++) {
        var style = Origami._getStyleRuleValue(selectors[i]);
        Origami.virtualStyles[selectors[i]] = style;
    } 
    return this;
}

Origami._getStyleRuleValue = function(selector) {
    var styleRules = (Origami.documentStyles[0] || []);
    for (var j = 0; j < styleRules.length; j++) {
        if (styleRules[j].selectorText && styleRules[j].selectorText.toLowerCase() === selector) {
            return styleRules[j].style;
        }
    }
}

Origami._createKami = function(el) {
    if (el.canvas) {
        el = el.canvas;
    } else {
        el = document.querySelector(el);
    }

    if (!el)
        this.error('Please use a valid selector or canvas context');

    var existentContext = exists(el, config.contexts);
    if (existentContext) {
        kami = existentContext;
        return;
    }

    if (!el.getContext)
        this.error('Please verify if it\'s a valid canvas element');

    var context = el.getContext('2d'),
        current = {
            element: el,
            flip: false,
            frame: null,
            ctx: (context || false),
            width: (el.width || null),
            height: (el.height || null),
        };

    Origami.contexts.push(current);
    kami = current;
}
// Check if element exists in a Array of NodeItems
function exists(el, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].element.isEqualNode(el))
            return arr[i];
    }
    return false;
}

// Read arguments and apply rules
function argumentsByRules(argsArray, rules) {
    var params = ['x', 'y', 'width', 'height'],
        args = new Object();

    if (rules) 
        params = rules;
    
    for (var i = 0; i < argsArray.length; i++) {
        if (typeof(argsArray[i]) === "object")
            args["style"] = argsArray[i];
        else
            if (params.length)
                args[params.shift()] = argsArray[i];
    }

    if (args.style && args.style.border) {
        args.style.border = args.style.border.split(' ');
        args.style.border[0] = args.style.border[0].replace(/[^0-9]/g, '');
    }

    return args;
}

// Define Style Tree
function defineDocumentStyles(origami) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var mysheet = document.styleSheets[i],
            myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
        origami.documentStyles.push(myrules);
    }
}

function Arc() {
  var args = argumentsByRules(
      ([].slice.call(arguments) || []), 
      ['x', 'y', 'r', 'sAngle', 'eAngle']
    ),
    style = (args.style || {}),
    def = Origami.defaults.arc;

  kami.ctx.beginPath();
  kami.ctx.arc(args.x, args.y, (args.r || def.radius), (args.sAngle || 0), (args.eAngle || 2 * Math.PI));
  kami.ctx.fillStyle = (style.background || style.bg) ? (style.background || style.bg) : def.background;
  kami.ctx.fill();
  kami.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  kami.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  kami.ctx.stroke();
  kami.ctx.closePath();
  
  return this;
}
function ImageShape(image, x, y, width, height, sx, sy, sw, sh) {
  if (!image)
    return this;

  if (typeof(image) === 'string') {
    var img = new Image();
    img.src = image;
    image = img;
  }

  image.addEventListener('load', function() {
    width = (width || image.naturalWidth);
    height = (height || image.naturalHeight);
    
    kami.ctx.save();

    if (kami.flip) {
      if (kami.flip === 'horizontal') {
        kami.ctx.scale(-1, 1);
        width = width * -1;
      }
      if (kami.flip === 'vertical') {
        kami.ctx.scale(1, -1);
        height = height * -1;
      }
    }

    console.log('loaded');

    kami.ctx.beginPath();
    kami.ctx.drawImage(image, Math.floor((x || 0)), Math.floor((y || 0)), width, height);
    kami.ctx.closePath();
    kami.ctx.restore();
    return this;
  }, false);

  // Hack til VirtualCanvas development start
  var timeOut = 3*1000,
      start = new Date().getTime();

  while (new Date().getTime()-start < timeOut) {
    if (image.complete || image.naturalWidth)
      break;
    console.log(1)
  }

  console.log(2);
  return this;
}
function Line(pointA, pointB, style) {
  var def = Origami.defaults.line;
  if (style.border) {
    style.border = style.border.split(' ');
    style.border[0] = style.border[0].replace(/[^0-9]/g, '');
  }

  kami.ctx.beginPath();
  kami.ctx.moveTo((pointA.x || 0), (pointA.y || 0));
  kami.ctx.lineTo((pointB.x || 0), (pointB.y || 0));

  kami.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  kami.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  kami.ctx.stroke();
  kami.ctx.closePath();
  
  return this;
}
function Polygon() {
  var originalArgs = arguments;
  var args = argumentsByRules([].slice.call(originalArgs) || []),
    points = [],
    style = args.style,
    def = Origami.defaults.polygon;

  for (var i = 0; i < originalArgs.length; i++) {
    if (originalArgs[i].x && originalArgs[i].y)
      points.push(originalArgs[i]);
  }

  kami.ctx.beginPath();
  kami.ctx.fillStyle = (style.background) ? style.background : def.background;
  kami.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  kami.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  
  for (var p = 0; p < points.length; p++) {
    if (p)
      kami.ctx.lineTo(points[p].x, points[p].y);
    else
      kami.ctx.moveTo(points[p].x, points[p].y);
  }
  
  kami.ctx.stroke();
  kami.ctx.fill();
  kami.ctx.closePath();
  
  return this;
}
function Rect() {
  var args = argumentsByRules(([].slice.call(arguments) || [])),
    style = (args.style || {}),
    def = Origami.defaults.rect;

  kami.ctx.beginPath();
  kami.ctx.fillStyle = (style.background) ? style.background : def.background;
  kami.ctx.fillRect(args.x, args.y, args.width, (args.height || args.width));

  kami.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  kami.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  kami.ctx.strokeRect(args.x, args.y, args.width, (args.height || args.width));
  kami.ctx.closePath();
  
  return this;
}
function Sprite(x, y, config) {
  if (!config || !config.src)
    return this;

  var self = this,
    image = new Image(),
    frames = (config.frames || 0),
    loop = (config.loop || true),
    speed = (config.speed || 10);

  image.src = config.src;

  image.addEventListener('load', function() {
    var width = image.naturalWidth,
      height = image.naturalHeight,
      dw = width / frames;

    // sprite properties
    var sprite = {
      image: image,
      posX: 0,
      posY: 0,
      frame: frames,
      loop: loop,
      width: dw,
      height: height,
      dx: x,
      speed: speed,
      dy: y,
      totalWidth: width,
      anim: null
    };

    drawSprite(sprite);
  }, false);
  return this;
}

function drawSprite(sprite) {
  if (sprite.posX === sprite.totalWidth) {
    if (sprite.loop === false) {
      window.cancelAnimationFrame(sprite.anim);
      return;
    }
    sprite.posX = 0;
  }

  kami.ctx.clearRect(sprite.dx, sprite.dy, sprite.width, sprite.height);

  kami.ctx.beginPath();
  kami.ctx.drawImage(sprite.image, sprite.posX, sprite.posY,
    sprite.width, sprite.height, sprite.dx, sprite.dy,
    sprite.width, sprite.height);
  kami.ctx.closePath();

  sprite.posX = sprite.posX + sprite.width;

  setTimeout(function() {
    sprite.anim = window.requestAnimationFrame(drawSprite.bind(this, sprite));
  }, sprite.speed);
}
function TextShape(text, x, y, style) {
  if (!style)
    style = {};

  var def = Origami.defaults.text;
  if (style.border) {
    style.border = style.border.split(' ');
    style.border[0] = style.border[0].replace(/[^0-9]/g, '');
  }

  kami.ctx.beginPath();
  kami.ctx.lineWidth = (style.border) ? style.border[0] : def.lineWidth;
  kami.ctx.strokeStyle = (style.border) ? style.border[1] : def.strokeStyle;
  kami.ctx.font = (style.font || def.font);
  kami.ctx.fillStyle = (style.color || def.color);
  kami.ctx.textAlign = (style.align || def.align);
  kami.ctx.fillText(text, x, y);
  kami.ctx.strokeText(text, x, y);
  kami.ctx.fill();
  kami.ctx.stroke();
  kami.ctx.closePath();
  
  return this;
}
function Shape(style) {
    var style = Origami.virtualStyles[style];
    if (!style)
        return this;
    
    // TODO: Dont draw in all canvas
    var data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + kami.width + 'px" height="' + kami.height + 'px">' +
        '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' +
            '<div style="' + style.cssText + '"></div>' +
        '</div></foreignObject>' +
        '</svg>';

    var DOMURL = window.URL || window.webkitURL || window,
        img = new Image(),
        svg = new Blob([data], {
            type: 'image/svg+xml;charset=utf-8'
        });

    var url = DOMURL.createObjectURL(svg);
    img.src = url;

    img.addEventListener('load', function() {
        kami.ctx.beginPath();
        kami.ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        kami.ctx.closePath();
    });

    return this;
}
// Index.js

Origami.arc     = Arc.bind(Origami);
Origami.polygon = Polygon.bind(Origami);
Origami.line    = Line.bind(Origami);
Origami.rect    = Rect.bind(Origami);
Origami.text    = TextShape.bind(Origami);
Origami.image   = ImageShape.bind(Origami);
Origami.sprite  = Sprite.bind(Origami);
Origami.shape   = Shape.bind(Origami);

Origami.translate = function(x, y) {
  if (x === undefined || x === null) {
    x = 'reset';
  }

  if (typeof(x) === 'string') {
    if (x === 'center') {
      x = kami.width / 2;
      y = kami.height / 2;
    }
    if (x === 'reset') {
      x = -kami.width / 2;
      y = -kami.height / 2;
    }
  }

  console.log(x, y);
  kami.ctx.translate(x, y);
  return this;
}

Origami.canvasBackground = function(color) {
  kami.element.style.backgroundColor = color;
  return this;
}

Origami._getContexts = function() {
  return Origami.contexts;
}

Origami.restore = function() {
  kami.ctx.restore();
  return this;
}

Origami.save = function() {
  kami.ctx.save();
  return this;
}

Origami.globalComposite = function(param) {
  kami.ctx.globalCompositeOperation = param;
  return this;
}

Origami.rotate = function(degrees) {
  kami.ctx.rotate(degrees);
  return this;
}

Origami.stop = function() {
  window.cancelAnimationFrame(kami.frame);
  kami.frame = false;
  return this;
}

Origami.nextFrame = function(fn) {
  // kami.frame = window.requestAnimationFrame(fn);
  return this;
}

Origami.repeat = function(times, fn) {
  var repeatSets = JSON.parse(JSON.stringify(this.settings));
  for (var i = 1; i < times; i++) {
    repeatSets.inc = (this.settings.inc * i);
    fn.call(this, repeatSets);
  }
  return this;
}

Origami.setInc = function(value) {
  if (value) settings.inc = value;
  return this;
}

Origami.getContext = function() {
  return kami.ctx;
}

Origami.scale = function(width, height) {
  kami.ctx.scale(width, height);
  return this;
}

Origami.flip = function(type) {
  kami.flip = 'horizontal';
  if (type && typeof(type) === 'string')
    kami.flip = type;
  return this;
}

Origami.flipEnd = function() {
  kami.flip = false;
  return this;
}

Origami.clear = function() {
  kami.ctx.clearRect(0, 0, kami.width, kami.height);
  return this;
}

Origami.on = function(ev, fn) {
  kami.element.addEventListener(ev, fn);
  return this;
}
// For consistency with CommonJS environments' exports
if ( typeof module !== "undefined" && module && module.exports ){
    module.exports = Origami.init.bind(this);
}

// For CommonJS with exports, but without module.exports, like Rhino
if ( typeof exports !== "undefined" && exports ) {
    exports.origami = Origami.init.bind(this);
}

// For browser, export only select globals
if (typeof window === "object") {
    window.origami = Origami.init.bind(Origami);
}
// Get a reference to the global object
}( (function() {
    return this;
})() ));
