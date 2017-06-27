// flowchart, v1.0.0
// Copyright (c)2013 Adriano Raiano (adrai).
// Distributed under MIT license
// http://adrai.github.io/js-flowchart/
(function (root, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();

  } else if (typeof define === 'function' && define.amd) {

    define([], factory);

  } 
}(this, function () {

  // add indexOf to non ECMA-262 standard compliant browsers
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }
  
  // add lastIndexOf to non ECMA-262 standard compliant browsers
  if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = len;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) {
          n = 0;
        } else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
      for (; k >= 0; k--) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  var root = this
    , flowchart = {};

  // defaults
  var o = {
    'line-width': 3,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 14,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black'
  };
  function _defaults(options, defaultOptions) {
      if (!options || typeof options === 'function') {
          return defaultOptions;
      }
      
      var merged = {};
      for (var attrname in defaultOptions) { merged[attrname] = defaultOptions[attrname]; }
      for (attrname in options) { if (options[attrname]) merged[attrname] = options[attrname]; }
      return merged;  
  }
  
  function _inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
  
  // move dependent functions to a container so that
  // they can be overriden easier in no jquery environment (node.js)
  var f = {
    defaults: _defaults,
    inherits: _inherits
  };
  function drawPath(chart, location, points) {
    var path = 'M{0},{1}';
    for (var i = 2, len = 2 * points.length + 2; i < len; i+=2) {
      path += ' L{' + i + '},{' + (i + 1) + '}';
    }
    var pathValues = [location.x, location.y];
    for (var j = 0, len = points.length; j < len; j++) {
      pathValues.push(points[j].x);
      pathValues.push(points[j].y);
    }
    var symbol = chart.paper.path(path, pathValues);
    symbol.attr('stroke', chart.options['element-color']);
    symbol.attr('stroke-width', chart.options['line-width']);
    return symbol;
  }
  
  function drawLine(chart, from, to, text) {
    if (Object.prototype.toString.call(to) !== '[object Array]') {
      to = [to];
    }
  
    var path = 'M{0},{1}';
    for (var i = 2, len = 2 * to.length + 2; i < len; i+=2) {
      path += ' L{' + i + '},{' + (i + 1) + '}';
    }
    var pathValues = [from.x, from.y];
    for (var j = 0, len = to.length; j < len; j++) {
      pathValues.push(to[j].x);
      pathValues.push(to[j].y);
    }
  
    var line = chart.paper.path(path, pathValues);
    line.attr({
      stroke: chart.options['line-color'],
      'stroke-width': chart.options['line-width'],
      'arrow-end': 'block'
    });
  
    if (text) {
      var textPath = chart.paper.text(0, 0, text);
  
      var isHorizontal = false;
      var firstTo = to[0];
  
      if (from.y === firstTo.y) {
        isHorizontal = true;
      }
  
      var x = 0;
      if (from.x > firstTo.x) {
        x = from.x - (from.x - firstTo.x)/2;
      } else {
        x = firstTo.x - (firstTo.x - from.x)/2;
      }
  
      var y = 0;
      if (from.y > firstTo.y) {
        y = from.y - (from.y - firstTo.y)/2;
      } else {
        y = firstTo.y - (firstTo.y - from.y)/2;
      }
  
      if (isHorizontal) {
        x -= textPath.getBBox().width/2;
        y -= chart.options['text-margin'];
      } else {
        x += chart.options['text-margin'];
        y -= textPath.getBBox().height/2;
      }
  
      textPath.attr({
        'text-anchor': 'start',
        'font-size': chart.options['font-size'],
        stroke: chart.options['font-color'],
        x: x,
        y: y
      });
  
      return line;
    }
  }
  function FlowChart(container, options) {
    options = options || {};
    
    this.paper = new Raphael(container);
  
    this.options = f.defaults(options, o);
  
    this.symbols = [];
    this.start = null;
  }
  
  FlowChart.prototype.handle = function(symbol) {
    if (this.symbols.indexOf(symbol) >= -1) {
      this.symbols.push(symbol);
    }
  
    var flowChart = this;
  
    if (symbol instanceof(Condition)) {
      symbol.yes = function(nextSymbol) {
        symbol.yes_symbol = nextSymbol;
        if(symbol.no_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
      symbol.no = function(nextSymbol) {
        symbol.no_symbol = nextSymbol;
        if(symbol.yes_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
    } else {
      symbol.then = function(nextSymbol) {
        symbol.next = nextSymbol;
        symbol.pathOk = true;
        return flowChart.handle(nextSymbol);
      };
    }
  
    return symbol;
  };
  
  FlowChart.prototype.startWith = function(symbol) {
    this.start = symbol;
    return this.handle(symbol);                    
  };
  
  FlowChart.prototype.render = function() {
    var maxWidth = 0,
        i = 0,
        len = 0,
        maxX = 0,
        maxY = 0;
  
    for (i = 0, len = this.symbols.length; i < len; i++) {
      var symbol = this.symbols[i];
      if (symbol.width > maxWidth) {
        maxWidth = symbol.width;
      }
    }
  
    for (i = 0, len = this.symbols.length; i < len; i++) {
      var symbol = this.symbols[i];
      symbol.shiftX((maxWidth - symbol.width)/2);
    }
  
    for (i = 0, len = this.symbols.length; i < len; i++) {
      var symbol = this.symbols[i];
      symbol.render();
    }
  
    for (i = 0, len = this.symbols.length; i < len; i++) {
      var symbol = this.symbols[i];
      symbol.renderLines();
    }
  
    maxX = this.maxXFromLine;
  
    for (i = 0, len = this.symbols.length; i < len; i++) {
      var symbol = this.symbols[i];
      var x = symbol.getX() + symbol.width;
      var y = symbol.getY() + symbol.height;
      if (x > maxX) {
        maxX = x;
      }
      if (y > maxY) {
        maxY = y;
      }
    }
  
    this.paper.setSize(maxX + this.options['line-width'], maxY + this.options['line-width']);
  };
  
  FlowChart.prototype.clean = function() {
    if (this.paper) {
      var paperDom = this.paper.canvas;
      paperDom.parentNode.removeChild(paperDom);
    }
  };
  function Symbol(chart, options, symbol) {
    this.chart = chart;
    this.group = this.chart.paper.set();
    
    this.text = this.chart.paper.text(0, 0, options.text);
    this.text.attr({
      'text-anchor': 'start',
      'font-size': this.chart.options['font-size'],
      'x': this.chart.options['text-margin'],
      stroke: chart.options['font-color']
    });
    this.group.push(this.text);
  
    if (symbol) {
      symbol.attr({
        stroke: this.chart.options['element-color'],
        'stroke-width': this.chart.options['line-width'],
        width: this.text.getBBox().width + 2 * this.chart.options['text-margin'],
        height: this.text.getBBox().height + 2 * this.chart.options['text-margin']
      });
  
      this.group.push(symbol);
  
      this.text.attr({
        'y': symbol.getBBox().height/2
      });
  
      this.initialize();
    }
  }
  
  Symbol.prototype.initialize = function() {
    this.group.transform('t' + this.chart.options['line-width'] + ',' + this.chart.options['line-width']);
  
    this.width = this.group.getBBox().width;
    this.height = this.group.getBBox().height;
  };
  
  Symbol.prototype.getCenter = function() {
    return {x: this.getX() + this.width/2,
            y: this.getY() + this.height/2};
  };
  
  Symbol.prototype.getX = function() {
    return this.group.getBBox().x;
  };
  
  Symbol.prototype.getY = function() {
    return this.group.getBBox().y;
  };
  
  Symbol.prototype.shiftX = function(x) {
    this.group.transform('t' + (this.getX() + x) + ',' + this.getY());
  };
  
  Symbol.prototype.setX = function(x) {
    this.group.transform('t' + x + ',' + this.getY());
  };
  
  Symbol.prototype.shiftY = function(y) {
    this.group.transform('t' + this.getX() + ',' + (this.getY() + y));
  };
  
  Symbol.prototype.setY = function(y) {
    this.group.transform('t' + this.getX() + ',' + y);
  };
  
  Symbol.prototype.getTop = function() {
    var y = this.getY();
    var x = this.getX() + this.width/2;
    return {x: x, y: y};
  };
  
  Symbol.prototype.getBottom = function() {
    var y = this.getY() + this.height;
    var x = this.getX() + this.width/2;
    return {x: x, y: y};
  };
  
  Symbol.prototype.getLeft = function() {
    var y = this.getY() + this.group.getBBox().height/2;
    var x = this.getX();
    return {x: x, y: y};
  };
  
  Symbol.prototype.getRight = function() {
    var y = this.getY() + this.group.getBBox().height/2;
    var x = this.getX() + this.group.getBBox().width;
    return {x: x, y: y};
  };
  
  Symbol.prototype.render = function() {
    if (this.next) {
      var bottomPoint = this.getBottom();
      var topPoint = this.next.getTop();
  
      if (!this.next.isPositioned) {
        this.next.shiftY(this.getY() + this.height + this.chart.options['line-length']);
        this.next.setX(bottomPoint.x - this.next.width/2);
        this.next.isPositioned = true;
      }
    }
  };
  
  Symbol.prototype.renderLines = function() {
    if (this.next) {
      this.drawLineTo(this.next);
    }
  };
  
  Symbol.prototype.drawLineTo = function(symbol, text, origin) {
    var x = this.getCenter().x,
        y = this.getCenter().y,
        top = this.getTop(),
        right = this.getRight(),
        bottom = this.getBottom(),
        left = this.getLeft();
  
    var symbolX = symbol.getCenter().x,
        symbolY = symbol.getCenter().y,
        symbolTop = symbol.getTop(),
        symbolRight = symbol.getRight(),
        symbolBottom = symbol.getBottom(),
        symbolLeft = symbol.getLeft();
  
    var isOnSameColumn = x === symbolX,
        isOnSameLine = y === symbolY,
        isUnder = y < symbolY,
        isUpper = y > symbolY,
        isLeft = x > symbolX,
        isRight = x < symbolX;
  
    var maxX = 0;
  
    if ((!origin || origin === 'bottom') && isOnSameColumn && isUnder) {
      drawLine(this.chart, bottom, symbolTop, text);
      this.bottomStart = true
      symbol.topEnd = true;
      maxX = bottom.x;
    } else if ((!origin || origin === 'right') && isOnSameLine && isRight) {
      drawLine(this.chart, right, symbolLeft, text);
      this.rightStart = true
      symbol.leftEnd = true;
      maxX = symbolLeft.x;
    } else if ((!origin || origin === 'left') && isOnSameLine && isLeft) {
      drawLine(this.chart, left, symbolRight, text);
      this.leftStart = true
      symbol.rightEnd = true;
      maxX = symbolRight.x;
    } else if ((!origin || origin === 'right') && isOnSameColumn && isUpper) {
      drawLine(this.chart, right, [
        {x: right.x + this.chart.options['line-length']/2, y: right.y},
        {x: right.x + this.chart.options['line-length']/2, y: symbolRight.y},
        {x: symbolRight.x, y: symbolRight.y}
      ], text);
      this.rightStart = true
      symbol.rightEnd = true;
      maxX = right.x + this.chart.options['line-length']/2;
    } else if ((!origin || origin === 'bottom') && isLeft) {
      if (this.leftEnd && isUpper) {
        drawLine(this.chart, bottom, [
          {x: bottom.x, y: bottom.y + this.chart.options['line-length']/2},
          {x: bottom.x + (bottom.x - symbolTop.x)/2, y: bottom.y + this.chart.options['line-length']/2},
          {x: bottom.x + (bottom.x - symbolTop.x)/2, y: symbolTop.y - this.chart.options['line-length']/2},
          {x: symbolTop.x, y: symbolTop.y - this.chart.options['line-length']/2},
          {x: symbolTop.x, y: symbolTop.y}
        ], text);
      } else {
        drawLine(this.chart, bottom, [
          {x: bottom.x, y: symbolTop.y - this.chart.options['line-length']/2},
          {x: symbolTop.x, y: symbolTop.y - this.chart.options['line-length']/2},
          {x: symbolTop.x, y: symbolTop.y}
        ], text);
      }
      this.bottomStart = true
      symbol.topEnd = true;
      maxX = bottom.x + (bottom.x - symbolTop.x)/2;
    } else if ((!origin || origin === 'bottom') && isRight) {
      drawLine(this.chart, bottom, [
        {x: bottom.x, y: bottom.y + this.chart.options['line-length']/2},
        {x: bottom.x + (bottom.x - symbolTop.x)/2, y: bottom.y + this.chart.options['line-length']/2},
        {x: bottom.x + (bottom.x - symbolTop.x)/2, y: symbolTop.y - this.chart.options['line-length']/2},
        {x: symbolTop.x, y: symbolTop.y - this.chart.options['line-length']/2},
        {x: symbolTop.x, y: symbolTop.y}
      ], text);
      this.bottomStart = true
      symbol.topEnd = true;
      maxX = bottom.x + (bottom.x - symbolTop.x)/2;
    } else if ((origin && origin === 'right') && isLeft) {
      drawLine(this.chart, right, [
        {x: right.x + this.chart.options['line-length']/2, y: right.y},
        {x: right.x + this.chart.options['line-length']/2, y: symbolTop.y - this.chart.options['line-length']/2},
        {x: symbolTop.x, y: symbolTop.y - this.chart.options['line-length']/2},
        {x: symbolTop.x, y: symbolTop.y}
      ], text);
      this.rightStart = true
      symbol.topEnd = true;
      maxX = right.x + this.chart.options['line-length']/2;
    } else if ((origin && origin === 'right') && isRight) {
      drawLine(this.chart, right, [
        {x: right.x + (right.x - symbolTop.x)/2, y: right.y},
        {x: right.x + (right.x - symbolTop.x)/2, y: symbolTop.y - this.chart.options['line-length']/2},
        {x: symbolTop.x, y: symbolTop.y - this.chart.options['line-length']/2},
        {x: symbolTop.x, y: symbolTop.y}
      ], text);
      this.rightStart = true
      symbol.topEnd = true;
      maxX = right.x + (right.x - symbolTop.x)/2;
    }
  
    if (!this.chart.maxXFromLine || (this.chart.maxXFromLine && maxX > this.chart.maxXFromLine)) {
      this.chart.maxXFromLine = maxX;
    }
  };
  function Start(chart, text) {
    var symbol = chart.paper.rect(0, 0, 0, 0, 20);
    Symbol.call(this, chart, { text: text || 'Start' }, symbol);
  }
  f.inherits(Start, Symbol);
  function End(chart, text) {
    var symbol = chart.paper.rect(0, 0, 0, 0, 20);
    Symbol.call(this, chart, { text: text || 'End' }, symbol);
  }
  f.inherits(End, Symbol);
  function Operation(chart, text) {
    var symbol = chart.paper.rect(0, 0, 0, 0);
    Symbol.call(this, chart, { text: text }, symbol);
  }
  f.inherits(Operation, Symbol);
  function Subroutine(chart, text) {
    var symbol = chart.paper.rect(0, 0, 0, 0);
    Symbol.call(this, chart, { text: text }, symbol);
  
    symbol.attr({
      width: this.text.getBBox().width + 4 * chart.options['text-margin']
    });
  
    this.text.attr({
      'x': 2 * chart.options['text-margin']
    });
  
    var innerWrap = chart.paper.rect(0, 0, 0, 0);
    innerWrap.attr({
      x: chart.options['text-margin'],
      stroke: chart.options['element-color'],
      'stroke-width': chart.options['line-width'],
      width: this.text.getBBox().width + 2 * chart.options['text-margin'],
      height: this.text.getBBox().height + 2 * chart.options['text-margin']
    });
    this.group.push(innerWrap);
  
    this.initialize();
  }
  f.inherits(Subroutine, Symbol);
  function InputOutput(chart, text) {
    Symbol.call(this, chart, { text: text });
  
    this.text.attr({
      x: chart.options['text-margin'] * 3
    });
  
    var width = this.text.getBBox().width + 4 * chart.options['text-margin'];
    var height = this.text.getBBox().height + 2 * chart.options['text-margin'];
    var startX = chart.options['text-margin'];
    var startY = height/2;
  
    var start = {x: startX, y: startY};
    var points = [
      {x: startX - chart.options['text-margin'], y: height},
      {x: startX - chart.options['text-margin'] + width, y: height},
      {x: startX - chart.options['text-margin'] + width + 2 * chart.options['text-margin'], y: 0},
      {x: startX - chart.options['text-margin'] + 2 * chart.options['text-margin'], y: 0},
      {x: startX, y: startY}
    ];
  
    var symbol = drawPath(chart, start, points);
  
    symbol.attr({
      stroke: chart.options['element-color'],
      'stroke-width': chart.options['line-width']
    });
  
    this.text.attr({
      y: symbol.getBBox().height/2
    });
  
    this.group.push(symbol);
  
    this.initialize();
  }
  f.inherits(InputOutput, Symbol);
  
  InputOutput.prototype.getLeft = function() {
    var y = this.getY() + this.group.getBBox().height/2;
    var x = this.getX() + this.chart.options['text-margin'];
    return {x: x, y: y};
  };
  
  InputOutput.prototype.getRight = function() {
    var y = this.getY() + this.group.getBBox().height/2;
    var x = this.getX() + this.group.getBBox().width - this.chart.options['text-margin'];
    return {x: x, y: y};
  };
  function Condition(chart, text) {
    Symbol.call(this, chart, { text: text });
  
    this.text.attr({
      x: chart.options['text-margin'] * 2
    });
  
    var width = this.text.getBBox().width + 3 * chart.options['text-margin'];
    width += width/2;
    var height = this.text.getBBox().height + 2 * chart.options['text-margin'];
    height += height/2;
    var startX = width/4;;
    var startY = height/4;
  
    this.text.attr({
      x: startX + chart.options['text-margin']/2
    });
  
    var start = {x: startX, y: startY};
    var points = [
      {x: startX - width/4, y: startY + height/4},
      {x: startX - width/4 + width/2, y: startY + height/4 + height/2},
      {x: startX - width/4 + width, y: startY + height/4},
      {x: startX - width/4 + width/2, y: startY + height/4 - height/2},
      {x: startX - width/4, y: startY + height/4}
    ];
  
    var symbol = drawPath(chart, start, points);
  
    symbol.attr({
      stroke: chart.options['element-color'],
      'stroke-width': chart.options['line-width']
    });
  
    this.text.attr({
      y: symbol.getBBox().height/2
    });
  
    this.group.push(symbol);
  
    this.initialize();
  }
  f.inherits(Condition, Symbol);
  
  Condition.prototype.render = function() {
    if (this.yes_symbol) {
      var bottomPoint = this.getBottom();
      var topPoint = this.yes_symbol.getTop();
  
      if (!this.yes_symbol.isPositioned) {
        this.yes_symbol.shiftY(this.getY() + this.height + this.chart.options['line-length']);
        this.yes_symbol.setX(bottomPoint.x - this.yes_symbol.width/2);
        this.yes_symbol.isPositioned = true;
      }
    }
  
    if (this.no_symbol) {
      var rightPoint = this.getRight();
      var leftPoint = this.no_symbol.getLeft();
  
      if (!this.no_symbol.isPositioned) {
        this.no_symbol.setY(rightPoint.y - this.no_symbol.height/2);
        this.no_symbol.shiftX(this.group.getBBox().x + this.width + this.chart.options['line-length']);
        this.no_symbol.isPositioned = true;
      }
    }
  };
  
  Condition.prototype.renderLines = function() {
    if (this.yes_symbol) {
      this.drawLineTo(this.yes_symbol, 'yes');
    }
  
    if (this.no_symbol) {
      this.drawLineTo(this.no_symbol, 'no', 'right');
    }
  };
  function parse(input) {
  	input = input || '';
  	input = input.trim();
  
  	var chart = {
  		symbols: {},
  		start: null,
  		drawSVG: function(container, options) {
  			if (this.diagram) {
  				this.diagram.clean();
  			}
  
  			var diagram = new FlowChart(container, options);
  			this.diagram = diagram;
  			var dispSymbols = {};
  
  			function getDisplaySymbol(s) {
  				if (dispSymbols[s.key]) {
  					return dispSymbols[s.key];
  				}
  
  				switch (s.symbolType) {
  					case 'start':
  						dispSymbols[s.key] = new Start(diagram, s.txt);
  						break;
  					case 'end':
  						dispSymbols[s.key] = new End(diagram, s.txt);
  						break;
  					case 'operation':
  						dispSymbols[s.key] = new Operation(diagram, s.txt);
  						break;
  					case 'inputoutput':
  						dispSymbols[s.key] = new InputOutput(diagram, s.txt);
  						break;
  					case 'subroutine':
  						dispSymbols[s.key] = new Subroutine(diagram, s.txt);
  						break;
  					case 'condition':
  						dispSymbols[s.key] = new Condition(diagram, s.txt);
  						break;
  					default:
  						return new Error('Wrong symbol type!');
  				}
  
  				return dispSymbols[s.key];
  			}
  
  			var self = this;
  
  			(function constructChart(s, prevDisp, prev) {
  				var dispSymb = getDisplaySymbol(s);
  
  				if (self.start === s) {
  					diagram.startWith(dispSymb);
  				} else if (prevDisp && prev && !prevDisp.pathOk) {
  					if (prevDisp instanceof(Condition)) {
  						if (prev.yes === s) {
  							prevDisp.yes(dispSymb);
  						} else if (prev.no === s) {
  							prevDisp.no(dispSymb);
  						}
  					} else {
  						prevDisp.then(dispSymb);
  					}
  				}
  
  				if (dispSymb.pathOk) {
  					return dispSymb;
  				}
  
  				if (dispSymb instanceof(Condition)) {
  					if (s.yes) {
  						constructChart(s.yes, dispSymb, s);
  					}
  					if (s.no) {
  						constructChart(s.no, dispSymb, s);
  					}
  	  		} else if (s.next) {
  	  			constructChart(s.next, dispSymb, s);
  	  		}
  
  	  		return dispSymb;
  			})(this.start);
  
  			diagram.render();
  		},
  		clean: function() {
  			this.diagram.clean();
  		}
  	};
  
  	var lines = input.split('\n');
  	for (var l = 1, len = lines.length; l < len;) {
  		var currentLine = lines[l];
  
  		if (currentLine.indexOf(':') < 0 && currentLine.indexOf('(') < 0 && currentLine.indexOf(')') < 0 && currentLine.indexOf('->') < 0 && currentLine.indexOf('=>') < 0) {
  			lines[l - 1] += '\n' + currentLine;
  			lines.splice(l, 1);
  			len--;
  		} else {
  			l++
  		}
  	}
  
  	function getSymbol(s) {
  		var startIndex = s.indexOf('(') + 1;
  		var endIndex = s.indexOf(')');
  		if (startIndex >= 0 && endIndex >= 0) {
  			return chart.symbols[s.substring(0, startIndex - 1)];
  		}
  		return chart.symbols[s];
  	}
  
  	function getNextPath(s) {
  		var next = 'next';
  		var startIndex = s.indexOf('(') + 1;
  		var endIndex = s.indexOf(')');
  		if (startIndex >= 0 && endIndex >= 0) {
  			next = flowSymb.substring(startIndex, endIndex);
  		}
  		return next;
  	}
  
  	while(lines.length > 0) {
  		var line = lines.splice(0, 1)[0];
  
  		if (line.indexOf('=>') >= 0) {
  			// definition
  			var parts = line.split('=>');
  			var symbol = {
  				key: parts[0],
  				symbolType: parts[1],
  				txt: null
  			};
  
  			if (symbol.symbolType.indexOf(': ') >= 0) {
  				var sub = symbol.symbolType.split(': ');
  				symbol.symbolType = sub[0];
  				symbol.txt = sub[1]
  			}
  
  			chart.symbols[symbol.key] = symbol;
  
  		} else if(line.indexOf('->') >= 0) {
  			// flow
  			var flowSymbols = line.split('->');
  			for (var i = 0, len = flowSymbols.length; i < len; i++) {
  				var flowSymb = flowSymbols[i];
  
  				var realSymb = getSymbol(flowSymb);
  				var next = getNextPath(flowSymb);
  
  				if (!chart.start) {
  					chart.start = realSymb;
  				}
  
  				if (i + 1 < len) {
  					var nextSymb = flowSymbols[i + 1];
  					realSymb[next] = getSymbol(nextSymb);
  				}
  			}
  
  		}
  
  	}
  
   	return chart;
  }
  // public api interface
  flowchart.parse = parse;
  
  return flowchart; 

}));