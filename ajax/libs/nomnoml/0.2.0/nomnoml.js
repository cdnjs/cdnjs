(function (factoryFn) {
  if (typeof define === 'function' && define.amd)
  	define(['lodash', 'dagre'], factoryFn);
  else if (typeof module === 'object' && module.exports)
  	module.exports = factoryFn(require('lodash'), require('dagre'));
  else this.nomnoml = factoryFn(_, dagre);
})(function (_, dagre) {
  var skanaar = skanaar || {}
skanaar.Canvas = function (canvas, callbacks){
	var ctx = canvas.getContext('2d');
	var mousePos = { x: 0, y: 0 }
	var twopi = 2*3.1416

	function mouseEventToPos(event){
		var e = canvas
		return {
			x: event.clientX - e.getBoundingClientRect().left - e.clientLeft + e.scrollLeft,
			y: event.clientY - e.getBoundingClientRect().top - e.clientTop + e.scrollTop
		}
	}

	if (callbacks) {
		canvas.addEventListener('mousedown', function (event){
			if (callbacks.mousedown) callbacks.mousedown(mouseEventToPos(event))
		})

		canvas.addEventListener('mouseup', function (event){
			if (callbacks.mouseup) callbacks.mouseup(mouseEventToPos(event))
		})

		canvas.addEventListener('mousemove', function (event){
			mousePos = mouseEventToPos(event)
			if (callbacks.mousemove) callbacks.mousemove(mouseEventToPos(event))
		})
	}

	var chainable = {
		stroke: function (){
			ctx.stroke()
			return chainable
		},
		fill: function (){
			ctx.fill()
			return chainable
		},
		fillAndStroke: function (){
			ctx.fill()
			ctx.stroke()
			return chainable
		}
	}

	function color255(r, g, b, a){
		var optionalAlpha = a === undefined ? 1 : a
		var comps = [Math.floor(r), Math.floor(g), Math.floor(b), optionalAlpha]
		return 'rgba('+ comps.join() +')'
	}

	function tracePath(path, offset, s){
		s = s === undefined ? 1 : s
		offset = offset || {x:0, y:0}
		ctx.beginPath()
		ctx.moveTo(offset.x + s*path[0].x, offset.y + s*path[0].y)
		for(var i=1, len=path.length; i<len; i++)
			ctx.lineTo(offset.x + s*path[i].x, offset.y + s*path[i].y)
		return chainable
	}

	return {
		mousePos: function (){ return mousePos },
		width: function (){ return canvas.width },
		height: function (){ return canvas.height },
		ctx: ctx,
		background: function (r, g, b){
			ctx.fillStyle = color255(r, g, b)
			ctx.fillRect (0, 0, canvas.width, canvas.height)
		},
		clear: function (){
			ctx.clearRect(0, 0, canvas.width, canvas.height)
		},
		circle: function (x, y, r){
			ctx.beginPath()
			if (arguments.length === 2)
				ctx.arc(x.x, x.y, y, 0, twopi)
			else
				ctx.arc(x, y, r, 0, twopi)
			return chainable
		},
		ellipse: function (center, rx, ry, start, stop){
			if (start === undefined) start = 0
			if (stop === undefined) stop = twopi
			ctx.beginPath()
			ctx.save()
			ctx.translate(center.x, center.y)
			ctx.scale(1, ry/rx)
			ctx.arc(0, 0, rx/2, start, stop)
			ctx.restore()
			return chainable
		},
		arc: function (x, y, r, start, stop){
			ctx.beginPath()
			ctx.moveTo(x,y)
			ctx.arc(x, y, r, start, stop)
			return chainable
		},
		roundRect: function (x, y, w, h, r){
			ctx.beginPath()
			ctx.moveTo(x+r, y)
			ctx.arcTo(x+w, y, x+w, y+r, r)
			ctx.lineTo(x+w, y+h-r)
			ctx.arcTo(x+w, y+h, x+w-r, y+h, r)
			ctx.lineTo(x+r, y+h)
			ctx.arcTo(x, y+h, x, y+h-r, r)
			ctx.lineTo(x, y+r)
			ctx.arcTo(x, y, x+r, y, r)
			ctx.closePath()
			return chainable
		},
		rect: function (x, y, w, h){
			ctx.beginPath()
			ctx.moveTo(x, y)
			ctx.lineTo(x+w, y)
			ctx.lineTo(x+w, y+h)
			ctx.lineTo(x, y+h)
			ctx.closePath()
			return chainable
		},
		path: tracePath,
		circuit: function (path, offset, s){
			tracePath(path, offset, s)
			ctx.closePath()
			return chainable
		},
		colorNorm: function (r, g, b, a){
			return color255(255*r, 255*g, 255*b, a)
		},
		color255: color255,
		colorObjHSL: function (hue, sat, lit){
			function component(v){
				var x = Math.cos(6.283*v)/2 + 0.5
				return lit*(1-sat + sat*x*x)
			}
			return {
				r: component(hue),
				g: component(hue-1/3),
				b: component(hue+1/3)
			}
		},
		radialGradient: function (x, y, r1, r2, colors){
			var grad = ctx.createRadialGradient(x, y, r1, x, y, r2)
			for(var key in colors)
				if (colors.hasOwnProperty(key))
					grad.addColorStop(key, colors[key])
			return grad
		},
		font:        function (f){ ctx.font = f },
		fillStyle:   function (s){ ctx.fillStyle = s },
		strokeStyle: function (s){ ctx.strokeStyle = s },
		textAlign:   function (a){ ctx.textAlign = a },

		lineCap: function (cap){ ctx.lineCap = cap },
		lineJoin: function (join){ ctx.lineJoin = join },
		lineWidth: function (w){ ctx.lineWidth = w },
		
		arcTo:       function (){ return ctx.arcTo.apply(      ctx, arguments) },
		beginPath:   function (){ return ctx.beginPath.apply(  ctx, arguments) },
		fillText:    function (){ return ctx.fillText.apply(   ctx, arguments) },
		lineTo:      function (){ return ctx.lineTo.apply(     ctx, arguments) },
		measureText: function (){ return ctx.measureText.apply(ctx, arguments) },
		moveTo:      function (){ return ctx.moveTo.apply(     ctx, arguments) },
		restore:     function (){ return ctx.restore.apply(    ctx, arguments) },
		save:        function (){ return ctx.save.apply(       ctx, arguments) },
		scale:       function (){ return ctx.scale.apply(      ctx, arguments) },
		setLineDash: function (){ return ctx.setLineDash.apply(ctx, arguments) },
		stroke:      function (){ return ctx.stroke.apply(     ctx, arguments) },
		translate:   function (){ return ctx.translate.apply(  ctx, arguments) }
	}
};
;
var skanaar = skanaar || {}

skanaar.sum = function sum(list, plucker){
    var transform = {
        'undefined': _.identity,
        'string': function (obj){ return obj[plucker] },
        'number': function (obj){ return obj[plucker] },
        'function': plucker
    }[typeof plucker]
    for(var i=0, summation=0, len=list.length; i<len; i++)
        summation += transform(list[i])
    return summation
}

skanaar.hasSubstring = function hasSubstring(haystack, needle){
    if (needle === '') return true
    if (!haystack) return false
    return haystack.indexOf(needle) !== -1
}

skanaar.format = function format(template /* variadic params */){
    var parts = Array.prototype.slice.call(arguments, 1)
    return _.flatten(_.zip(template.split('#'), parts)).join('')
};
var skanaar = skanaar || {};
skanaar.vector = {
    dist: function (a,b){ return skanaar.vector.mag(skanaar.vector.diff(a,b)) },
    add: function (a,b){ return { x: a.x + b.x, y: a.y + b.y } },
    diff: function (a,b){ return { x: a.x - b.x, y: a.y - b.y } },
    mult: function (v,factor){ return { x: factor*v.x, y: factor*v.y } },
    mag: function (v){ return Math.sqrt(v.x*v.x + v.y*v.y) },
    normalize: function (v){ return skanaar.vector.mult(v, 1/skanaar.vector.mag(v)) },
    rot: function (a){ return { x: a.y, y: -a.x } }
};
;
var skanaar = skanaar || {}
skanaar.Svg = function (globalStyle){
	var initialState = { x: 0, y: 0, stroke: 'none', fill: 'none', textAlign: 'left' }
	var states = [initialState]
	var elements = []

	function Element(name, attr, content) {
		attr.style = attr.style || ''
		return {
			name: name,
			attr: attr,
			content: content || undefined,
			stroke: function (){
				this.attr.style += 'stroke:'+lastDefined('stroke')+';fill:none;';
				return this
			},
			fill: function (){
				this.attr.style += 'stroke:none; fill:'+lastDefined('fill')+';';
				return this
			},
			fillAndStroke: function (){
				this.attr.style += 'stroke:'+lastDefined('stroke')+';fill:'+lastDefined('fill')+';';
				return this
			}
		}
	}

	function State(dx, dy){
		return { x: dx, y: dy, stroke: null, fill: null, textAlign: null }
	}

	function trans(coord, axis){
		states.forEach(function (t){ coord += t[axis] })
		return coord
	}
	function tX(coord){ return Math.round(10*trans(coord, 'x'))/10 }
	function tY(coord){ return Math.round(10*trans(coord, 'y'))/10 }
	function lastDefined(property){
		for(var i=states.length-1; i>=0; i--)
			if (states[i][property])
				return states[i][property]
		return undefined
	}

	function last(list){ return list[list.length-1] }

	function tracePath(path, offset, s){
		s = s === undefined ? 1 : s
		offset = offset || {x:0, y:0}
		var d = path.map(function (e, i){
			return (i ? 'L' : 'M') + tX(offset.x + s*e.x) + ' ' + tY(offset.y + s*e.y)
		}).join(' ')
		return newElement('path', { d: d })
	}

	function newElement(type, attr, content) {
		var element = Element(type, attr, content)
		elements.push(element)
		return element
	}

	return {
		width: function (){ return elements.width },
		height: function (){ return elements.height },
		background: function (/*r, g, b*/){},
		clear: function (){},
		circle: function (x, y, r){
			var attr = (arguments.length === 2) ?
					{r: y, cx: tX(x.x), cy: tY(x.y)} :
					{r: r, cx: tX(x),   cy: tY(y)}
			var element = Element('circle', attr)
			elements.push(element)
			return element
		},
		ellipse: function (center, w, h /*, start, stop*/){
			return newElement('ellipse',
				{ cx: tX(center.x), cy: tY(center.y), rx: w/2, ry: h/2 })
		},
		arc: function (x, y, r /*, start, stop*/){
			return newElement('ellipse',
				{ cx: tX(x), cy: tY(y), rx: r, ry: r })
		},
		roundRect: function (x, y, w, h, r){
			return newElement('rect',
				{ x: tX(x), y: tY(y), rx: r, ry: r, height: h, width: w })
		},
		rect: function (x, y, w, h){
			return newElement('rect',
				{ x: tX(x), y: tY(y), height: h, width: w })
		},
		path: tracePath,
		circuit: function (path, offset, s){
			var element = tracePath(path, offset, s)
			element.attr.d += ' Z'
			return element
		},
		font: function (font){
			last(states).font = font;
		},
		strokeStyle: function (stroke){
			last(states).stroke = stroke
		},
		fillStyle: function (fill){
			last(states).fill = fill
		},
		arcTo: function (x1, y1, x2, y2){
			last(elements).attr.d += ('L'+tX(x1)+' '+tY(y1)+' L'+tX(x2)+' '+tY(y2)+' ')
		},
		beginPath: function (){
			return newElement('path', {d:''})
		},
		fillText: function (text, x, y){
			if (lastDefined('textAlign') === 'center')
				x -= this.measureText(text).width/2
			return newElement('text', { x: tX(x), y: tY(y) }, text)
		},
		lineCap: function (cap){ globalStyle += ';stroke-linecap:'+cap },
		lineJoin: function (join){ globalStyle += ';stroke-linejoin:'+join },
		lineTo: function (x, y){
			last(elements).attr.d += ('L' + tX(x) + ' ' + tY(y) + ' ')
		},
		lineWidth: function (w){ globalStyle += ';stroke-width:'+w},
		measureText: function (s){
			return {
				width: skanaar.sum(s, function (c){
					if (c === 'M' || c === 'W') { return 14 }
					return c.charCodeAt(0) < 200 ? 9.5 : 16
				})
			}
		},
		moveTo: function (x, y){
			last(elements).attr.d += ('M' + tX(x) + ' ' + tY(y) + ' ')
		},
		restore: function (){
			states.pop()
		},
		save: function (){
			states.push(State(0, 0))
		},
		scale: function (){},
		setLineDash: function (){},
		stroke: function (){
			last(elements).stroke()
		},
		textAlign: function (a){
			last(states).textAlign = a
		},
		translate: function (dx, dy){
			last(states).x += dx
			last(states).y += dy
		},
    serialize: function (_attributes){
      var attrs = _attributes || {};
      attrs.version = attrs.version || '1.1';
      attrs.baseProfile = attrs.baseProfile || 'full';
      attrs.width = attrs.width || '100%';
      attrs.height = attrs.height || '100%';
      attrs.xmlns = attrs.xmlns || 'http://www.w3.org/2000/svg';
      attrs['xmlns:xlink'] = attrs['xmlns:xlink'] || 'http://www.w3.org/1999/xlink';
      attrs['xmlns:ev']  = attrs['xmlns:ev'] || 'http://www.w3.org/2001/xml-events';
      attrs.style = attrs.style || lastDefined('font') + ';' + globalStyle;

      function toAttr(obj){
        function toKeyValue(key){ return key + '="' + obj[key] + '"' }
        return Object.keys(obj).map(toKeyValue).join(' ')
      }
      function toHtml(e){
        return '<'+e.name+' '+toAttr(e.attr)+'>'+(e.content || '')+'</'+e.name+'>'

      }
      var innerSvg = elements.map(toHtml).join('\n')
      return toHtml(Element('svg', attrs, innerSvg))
    }
	}
};
;
/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var nomnomlCoreParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"compartment":4,"EOF":5,"slot":6,"IDENT":7,"class":8,"association":9,"SEP":10,"parts":11,"|":12,"[":13,"]":14,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"IDENT",10:"SEP",12:"|",13:"[",14:"]"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[4,1],[4,3],[11,1],[11,3],[11,2],[9,3],[8,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */
/**/) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1] 
break;
case 2:this.$ = $$[$0].trim().replace(/\\(\[|\]|\|)/g, '$'+'1');
break;
case 3:this.$ = $$[$0];
break;
case 4:this.$ = $$[$0];
break;
case 5:this.$ = [$$[$0]];
break;
case 6:this.$ = $$[$0-2].concat($$[$0]);
break;
case 7:this.$ = [$$[$0]];
break;
case 8:this.$ = $$[$0-2].concat([$$[$0]]);
break;
case 9:this.$ = $$[$0-1].concat([[]]);
break;
case 10:
           var t = $$[$0-1].trim().replace(/\\(\[|\]|\|)/g, '$'+'1').match('^(.*?)([<:o+]*-/?-*[:o+>]*)(.*)$');
           this.$ = {assoc:t[2], start:$$[$0-2], end:$$[$0], startLabel:t[1].trim(), endLabel:t[3].trim()};
  
break;
case 11:
           var type = 'CLASS';
           var id = $$[$0-1][0][0];
           var typeMatch = $$[$0-1][0][0].match('<([a-z]*)>(.*)');
           if (typeMatch) {
               type = typeMatch[1].toUpperCase();
               id = typeMatch[2].trim();
           }
           $$[$0-1][0][0] = id;
           this.$ = {type:type, id:id, parts:$$[$0-1]};
  
break;
}
},
table: [{3:1,4:2,6:3,7:[1,4],8:5,9:6,13:[1,7]},{1:[3]},{5:[1,8],10:[1,9]},{5:[2,5],10:[2,5],12:[2,5],14:[2,5]},{5:[2,2],10:[2,2],12:[2,2],14:[2,2]},{5:[2,3],7:[1,10],10:[2,3],12:[2,3],14:[2,3]},{5:[2,4],10:[2,4],12:[2,4],14:[2,4]},{4:12,6:3,7:[1,4],8:5,9:6,11:11,13:[1,7]},{1:[2,1]},{6:13,7:[1,4],8:5,9:6,13:[1,7]},{8:14,13:[1,7]},{12:[1,16],14:[1,15]},{10:[1,9],12:[2,7],14:[2,7]},{5:[2,6],10:[2,6],12:[2,6],14:[2,6]},{5:[2,10],10:[2,10],12:[2,10],14:[2,10]},{5:[2,11],7:[2,11],10:[2,11],12:[2,11],14:[2,11]},{4:17,6:3,7:[1,4],8:5,9:6,12:[2,9],13:[1,7],14:[2,9]},{10:[1,9],12:[2,8],14:[2,8]}],
defaultActions: {8:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START
/**/) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 12
break;
case 1:return 7
break;
case 2:return 13
break;
case 3:return 14
break;
case 4:return 10
break;
case 5:return 5
break;
case 6:return 'INVALID'
break;
}
},
rules: [/^(?:\s*\|\s*)/,/^(?:(\\(\[|\]|\|)|[^\]\[|;\n])+)/,/^(?:\[)/,/^(?:\s*\])/,/^(?:[ ]*(;|\n)+[ ]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = nomnomlCoreParser;
exports.Parser = nomnomlCoreParser.Parser;
exports.parse = function () { return nomnomlCoreParser.parse.apply(nomnomlCoreParser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
};
var nomnoml = nomnoml || {}

nomnoml.parse = function (source){
	function onlyCompilables(line){
		var ok = line[0] !== '#' && line.substring(0,2) !== '//'
		return ok ? line : ''
	}
	var isDirective = function (line){ return line.text[0] === '#' }
	var lines = source.split('\n').map(function (s, i){
		return {text: s.trim(), index: i }
	})
	var pureDirectives = _.filter(lines, isDirective)
	var directives = _.object(pureDirectives.map(function (line){
		try {
			var tokens =  line.text.substring(1).split(':')
			return [tokens[0].trim(), tokens[1].trim()]
		}
		catch (e) {
			throw new Error('line ' + (line.index + 1))
		}
	}))
	var pureDiagramCode = _.map(_.pluck(lines, 'text'), onlyCompilables).join('\n').trim()
	var ast = nomnoml.transformParseIntoSyntaxTree(nomnoml.intermediateParse(pureDiagramCode))
	ast.directives = directives
	return ast
}

nomnoml.intermediateParse = function (source){
	return nomnomlCoreParser.parse(source)
}

nomnoml.transformParseIntoSyntaxTree = function (entity){

	var relationId = 0

	function transformCompartment(parts){
		var lines = []
		var rawClassifiers = []
		var relations = []
		_.each(parts, function (p){
			if (typeof p === 'string')
				lines.push(p)
			if (p.assoc){ // is a relation
				rawClassifiers.push(p.start)
				rawClassifiers.push(p.end)
				relations.push({
                    id: relationId++,
                    assoc: p.assoc,
                    start: p.start.parts[0][0],
                    end: p.end.parts[0][0],
                    startLabel: p.startLabel,
                    endLabel: p.endLabel
                })
            }
			if (p.parts){ // is a classifier
				rawClassifiers.push(p)
            }
		})
		var allClassifiers = _.map(rawClassifiers, transformItem)
		var noDuplicates = _.map(_.groupBy(allClassifiers, 'name'), function (cList){
			return _.max(cList, function (c){ return c.compartments.length })
		})

		return nomnoml.Compartment(lines, noDuplicates, relations)
	}

	function transformItem(entity){
		if (typeof entity === 'string')
			return entity
		if (_.isArray(entity))
			return transformCompartment(entity)
		if (entity.parts){
			var compartments = _.map(entity.parts, transformCompartment)
			return nomnoml.Classifier(entity.type, entity.id, compartments)
		}
		return undefined
	}

	return transformItem(entity)
};
var nomnoml = nomnoml || {}

nomnoml.styles = {
  ABSTRACT: { center: 1, bold: 0, underline: 0, italic: 1, dashed: 0, empty: 0, hull: 'auto', visual: 'class' },
  ACTOR:    { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'actor' },
  CHOICE:   { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'rhomb' },
  CLASS:    { center: 1, bold: 1, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'class' },
  DATABASE: { center: 1, bold: 1, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'database' },
  END:      { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 1, hull: 'icon', visual: 'end' },
  FRAME:    { center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'frame' },
  HIDDEN:   { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 1, hull: 'empty', visual: 'hidden' },
  INPUT:    { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'input' },
  INSTANCE: { center: 1, bold: 0, underline: 1, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'class' },
  LABEL:    { center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'none' },
  NOTE:     { center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'note' },
  PACKAGE:  { center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'package' },
  RECEIVER: { center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'receiver' },
  REFERENCE:{ center: 1, bold: 0, underline: 0, italic: 0, dashed: 1, empty: 0, hull: 'auto', visual: 'class' },
  SENDER:   { center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'sender' },
  START:    { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 1, hull: 'icon', visual: 'start' },
  STATE:    { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'roundrect' },
  TRANSCEIVER:{ center: 0, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'transceiver' },
  USECASE:  { center: 1, bold: 0, underline: 0, italic: 0, dashed: 0, empty: 0, hull: 'auto', visual: 'ellipse' },
}

nomnoml.visualizers = {
  actor : function (node, x, y, padding, config, g) {
    var a = padding/2
    var yp = y + a/2
    var actorCenter = {x: node.x, y: yp-a}
    g.circle(actorCenter, a).fillAndStroke()
    g.path([ {x: node.x,   y: yp}, {x: node.x,   y: yp+2*a} ]).stroke()
    g.path([ {x: node.x-a, y: yp+a}, {x: node.x+a, y: yp+a} ]).stroke()
    g.path([ {x: node.x-a, y: yp+a+padding},
             {x: node.x , y: yp+padding},
             {x: node.x+a, y: yp+a+padding} ]).stroke()
  },
  class : function (node, x, y, padding, config, g) {
    g.rect(x, y, node.width, node.height).fillAndStroke()
  },
  database : function (node, x, y, padding, config, g) {
    var cy = y-padding/2
    var pi = 3.1416
    g.rect(x, y, node.width, node.height).fill()
    g.path([{x: x, y: cy}, {x: x, y: cy+node.height}]).stroke()
    g.path([
      {x: x+node.width, y: cy},
      {x: x+node.width, y: cy+node.height}]).stroke()
    g.ellipse({x: node.x, y: cy}, node.width, padding*1.5).fillAndStroke()
    g.ellipse({x: node.x, y: cy+node.height}, node.width, padding*1.5, 0, pi)
    .fillAndStroke()
  },
  ellipse : function (node, x, y, padding, config, g) {
    g.ellipse({x: node.x, y: node.y}, node.width, node.height).fillAndStroke()
  },
  end : function (node, x, y, padding, config, g) {
    g.circle(node.x, y+node.height/2, node.height/3).fillAndStroke()
    g.fillStyle(config.stroke)
    g.circle(node.x, y+node.height/2, node.height/3-padding/2).fill()
  },
  frame : function (node, x, y, padding, config, g) {
    g.rect(x, y, node.width, node.height).fillAndStroke()
  },
  hidden : function (node, x, y, padding, config, g) {
  },
  input : function (node, x, y, padding, config, g) {
    g.circuit([
      {x:x+padding, y:y},
      {x:x+node.width, y:y},
      {x:x+node.width-padding, y:y+node.height},
      {x:x, y:y+node.height}
    ]).fillAndStroke()
  },
  none : function (node, x, y, padding, config, g) {
  },
  note : function (node, x, y, padding, config, g) {
    g.circuit([
      {x: x, y: y},
      {x: x+node.width-padding, y: y},
      {x: x+node.width, y: y+padding},
      {x: x+node.width, y: y+node.height},
      {x: x, y: y+node.height},
      {x: x, y: y}
    ]).fillAndStroke()
    g.path([
      {x: x+node.width-padding, y: y},
      {x: x+node.width-padding, y: y+padding},
      {x: x+node.width, y: y+padding}
    ]).stroke()
  },
  package : function (node, x, y, padding, config, g) {
    var headHeight = node.compartments[0].height
    g.rect(x, y+headHeight, node.width, node.height-headHeight).fillAndStroke()
    var w = g.measureText(node.name).width + 2*padding
    g.circuit([
      {x:x, y:y+headHeight},
      {x:x, y:y},
      {x:x+w, y:y},
      {x:x+w, y:y+headHeight}
    ]).fillAndStroke()
  },
  receiver : function (node, x, y, padding, config, g) {
      g.circuit([
        {x: x-padding, y: y},
        {x: x+node.width, y: y},
        {x: x+node.width, y: y+node.height},
        {x: x-padding, y: y+node.height},
        {x: x, y: y+node.height/2},
      ]).fillAndStroke()
  },
  rhomb : function (node, x, y, padding, config, g) {
    g.circuit([
      {x:node.x, y:y - padding},
      {x:x+node.width + padding, y:node.y},
      {x:node.x, y:y+node.height + padding},
      {x:x - padding, y:node.y}
    ]).fillAndStroke()
  },
  roundrect : function (node, x, y, padding, config, g) {
    var r = Math.min(padding*2*config.leading, node.height/2)
    g.roundRect(x, y, node.width, node.height, r).fillAndStroke()
  },
  sender : function (node, x, y, padding, config, g) {
      g.circuit([
        {x: x, y: y},
        {x: x+node.width-padding, y: y},
        {x: x+node.width, y: y+node.height/2},
        {x: x+node.width-padding, y: y+node.height},
        {x: x, y: y+node.height}
      ]).fillAndStroke()
  },
  start : function (node, x, y, padding, config, g) {
    g.fillStyle(config.stroke)
    g.circle(node.x, y+node.height/2, node.height/2.5).fill()
  },
  transceiver : function (node, x, y, padding, config, g) {
      g.circuit([
        {x: x-padding, y: y},
        {x: x+node.width, y: y},
        {x: x+node.width+padding, y: y+node.height/2},
        {x: x+node.width, y: y+node.height},
        {x: x-padding, y: y+node.height},
        {x: x, y: y+node.height/2}
      ]).fillAndStroke()
  },
};
var nomnoml = nomnoml || {}

nomnoml.Classifier = function (type, name, compartments){
	return {
        type: type,
        name: name,
        compartments: compartments
    }
}
nomnoml.Compartment = function (lines, nodes, relations){
	return {
        lines: lines,
        nodes: nodes,
        relations: relations
    }
}

nomnoml.layout = function (measurer, config, ast){
	function runDagre(input){
		return dagre.layout()
					.rankSep(config.spacing)
					.nodeSep(config.spacing)
					.edgeSep(config.spacing)
					.rankDir(config.direction)
					.run(input)
	}
	function measureLines(lines, fontWeight){
		if (!lines.length)
			return { width: 0, height: config.padding }
		measurer.setFont(config, fontWeight)
		return {
			width: Math.round(_.max(_.map(lines, measurer.textWidth)) + 2*config.padding),
			height: Math.round(measurer.textHeight() * lines.length + 2*config.padding)
		}
	}
	function layoutCompartment(c, compartmentIndex){
		var textSize = measureLines(c.lines, compartmentIndex ? 'normal' : 'bold')
		c.width = textSize.width
		c.height = textSize.height

		if (!c.nodes.length && !c.relations.length)
			return

		_.each(c.nodes, layoutClassifier)

		var g = new dagre.Digraph()
		_.each(c.nodes, function (e){
			g.addNode(e.name, { width: e.width, height: e.height })
		})
		_.each(c.relations, function (r){
			g.addEdge(r.id, r.start, r.end)
		})
		var dLayout = runDagre(g)

		var rels = _.indexBy(c.relations, 'id')
		var nodes = _.indexBy(c.nodes, 'name')
		function toPoint(o){ return {x:o.x, y:o.y} }
		dLayout.eachNode(function(u, value) {
			nodes[u].x = value.x
			nodes[u].y = value.y
		})
		dLayout.eachEdge(function(e, u, v, value) {
			var start = nodes[u], end = nodes[v]
			rels[e].path = _.map(_.flatten([start, value.points, end]), toPoint)
		})
		var graph = dLayout.graph()
		var graphHeight = graph.height ? graph.height + 2*config.gutter : 0
		var graphWidth = graph.width ? graph.width + 2*config.gutter : 0

		c.width = Math.max(textSize.width, graphWidth) + 2*config.padding
		c.height = textSize.height + graphHeight + config.padding
	}
	function layoutClassifier(clas){
		var style = config.styles[clas.type] || nomnoml.styles.CLASS
		if (style.hull == 'icon'){
			clas.width = config.fontSize * 2.5
			clas.height = config.fontSize * 2.5
			return
		}
		if (style.hull === 'empty'){
			clas.width = 0
			clas.height = 0
			return
		}
		var oldDir = config.direction;
		config.direction = style.direction || config.direction;
		_.each(clas.compartments, layoutCompartment)
		clas.width = _.max(_.pluck(clas.compartments, 'width'))
		clas.height = skanaar.sum(clas.compartments, 'height')
		clas.x = clas.width/2
		clas.y = clas.height/2
		_.each(clas.compartments, function(co){ co.width = clas.width })
		config.direction = oldDir;
	}
	layoutCompartment(ast)
	return ast
}
;
var nomnoml = nomnoml || {}

nomnoml.render = function (graphics, config, compartment, setFont){

	var padding = config.padding
	var g = graphics
	var vm = skanaar.vector

	function renderCompartment(compartment, style, level){
		g.save()
		g.translate(padding, padding)
		g.fillStyle(config.stroke)
		_.each(compartment.lines, function (text, i){
			g.textAlign(style.center ? 'center' : 'left')
			var x = style.center ? compartment.width/2 - padding : 0
			var y = (0.5+(i+0.5)*config.leading)*config.fontSize
			if (text){
				g.fillText(text, x, y)
			}
			if (style.underline){
				var w = g.measureText(text).width
				y += Math.round(config.fontSize * 0.2)+0.5
				g.path([{x:x-w/2, y:y}, {x:x+w/2, y:y}]).stroke()
				g.lineWidth = config.lineWidth
			}
		})
		g.translate(config.gutter, config.gutter)
		_.each(compartment.relations, function (r){ renderRelation(r, compartment) })
		_.each(compartment.nodes, function (n){ renderNode(n, level) })
		g.restore()
	}

	function renderNode(node, level){
		var x = Math.round(node.x-node.width/2)
		var y = Math.round(node.y-node.height/2)
		var style = config.styles[node.type] || nomnoml.styles.CLASS

		g.fillStyle(style.fill || config.fill[level] || _.last(config.fill))
		if (style.dashed){
			var dash = Math.max(4, 2*config.lineWidth)
			g.setLineDash([dash, dash])
		}
		var drawNode = nomnoml.visualizers[style.visual] || nomnoml.visualizers.class
		drawNode(node, x, y, padding, config, g)
		g.setLineDash([])

		var yDivider = (style.visual === 'actor' ? y + padding*3/4 : y)
		_.each(node.compartments, function (part, i){
			var s = i > 0 ? {} : style; // only style node title
			if (s.empty) return
			g.save()
			g.translate(x, yDivider)
			setFont(config, s.bold ? 'bold' : 'normal', s.italic)
			renderCompartment(part, s, level+1)
			g.restore()
			if (i+1 === node.compartments.length) return
			yDivider += part.height
			if (style.visual === 'frame' && i === 0){
				var w = g.measureText(node.name).width+part.height/2+padding
				g.path([
					{x:x, y:yDivider},
					{x:x+w-part.height/2, y:yDivider},
					{x:x+w, y:yDivider-part.height/2},
					{x:x+w, y:yDivider-part.height}
					]).stroke()
			} else
				g.path([{x:x, y:yDivider}, {x:x+node.width, y:yDivider}]).stroke()
		})
	}

	function strokePath(p){
		if (config.edges === 'rounded'){
			var radius = config.spacing * config.bendSize
			g.beginPath()
			g.moveTo(p[0].x, p[0].y)

			for (var i = 1; i < p.length-1; i++){
				g.arcTo(p[i].x, p[i].y, p[i+1].x, p[i+1].y, radius)
			}
			g.lineTo(_.last(p).x, _.last(p).y)
			g.stroke()
		}
		else
			g.path(p).stroke()
	}

	var empty = false, filled = true, diamond = true

    function renderLabel(text, refPoint, quadrant){
		if (text) {
			var fontSize = config.fontSize
			var lines = text.split("`")
			var area = {
				width : _.max(_.map(lines, function(l){ return g.measureText(l).width })),
				height : fontSize*lines.length
			}
			var origin = {
				x: (quadrant === 1) || (quadrant === 4) ? refPoint.x + padding : refPoint.x - area.width - padding,
				y: (quadrant === 3) || (quadrant === 4) ? refPoint.y + padding : refPoint.y - area.height - padding
			}
			_.each(lines, function(l, i){ g.fillText(l, origin.x, origin.y + fontSize*(i+1)) })
		}
	}

	// find basic quadrant using relative position of endpoint and block rectangle
	function findLabelQuadrant(point, rect, def) {
		if (point.x < rect.x && point.y < rect.y-rect.height/2) return 1;
		if (point.y > rect.y && point.x > rect.x+rect.width/2) return 1;
		
		if (point.x > rect.x && point.y < rect.y-rect.height/2) return 2;
		if (point.y > rect.y && point.x < rect.x-rect.width/2) return 2;

		if (point.x > rect.x && point.y > rect.y+rect.height/2) return 3;
		if (point.y < rect.y && point.x < rect.x-rect.width/2) return 3;

		if (point.x < rect.x && point.y > rect.y+rect.height/2) return 4;
		if (point.y < rect.y && point.x > rect.x+rect.width/2) return 4;

		return def;
	}

	// Flip basic label quadrant if needed, to avoid crossing a bent relationship line
	function adjustLabelQuadrant(quadrant, point, opposite) {
		if ((opposite.x == point.x) || (opposite.y == point.y)) return quadrant;
		var flipHorizontally = [4, 3, 2, 1]
		var flipVertically = [2, 1, 4, 3]
		var oppositeQuadrant = (opposite.y < point.y) ?
							((opposite.x < point.x) ? 2 : 1) :
							((opposite.x < point.x) ? 3 : 4);
		// if an opposite relation end is in the same quadrant as a label, we need to flip the label
		if (oppositeQuadrant === quadrant) {
			if (config.direction === "LR") return flipHorizontally[quadrant-1];
			if (config.direction === "TD") return flipVertically[quadrant-1];
		}
		return quadrant; 	
	}

	function renderRelation(r, compartment){
		var startNode = _.findWhere(compartment.nodes, {name:r.start})
		var endNode = _.findWhere(compartment.nodes, {name:r.end})
		var start = rectIntersection(r.path[1], _.first(r.path), startNode)
		var end = rectIntersection(r.path[r.path.length-2], _.last(r.path), endNode)

		var path = _.flatten([start, _.tail(_.initial(r.path)), end])
		var fontSize = config.fontSize

		g.fillStyle(config.stroke)
		setFont(config, 'normal')

		renderLabel(r.startLabel, start, adjustLabelQuadrant(findLabelQuadrant(start, startNode, 4), start, end))
		renderLabel(r.endLabel, end, adjustLabelQuadrant(findLabelQuadrant(end, endNode, 2), end, start))

		if (r.assoc !== '-/-'){
			if (g.setLineDash && skanaar.hasSubstring(r.assoc, '--')){
				var dash = Math.max(4, 2*config.lineWidth)
				g.setLineDash([dash, dash])
				strokePath(path)
				g.setLineDash([])
			}
			else
				strokePath(path)
		}

		function drawArrowEnd(id, path, end){
			if (id === '>' || id === '<')
				drawArrow(path, filled, end)
			else if (id === ':>' || id === '<:')
				drawArrow(path, empty, end)
			else if (id === '+')
				drawArrow(path, filled, end, diamond)
			else if (id === 'o')
				drawArrow(path, empty, end, diamond)
		}

		var tokens = r.assoc.split('-')
		drawArrowEnd(_.last(tokens), path, end)
		drawArrowEnd(_.first(tokens), path.reverse(), start)
	}

	function rectIntersection(p1, p2, rect) {
		if (rect.width || rect.height) {
			var xBound = rect.width/2 + config.edgeMargin;
			var yBound = rect.height/2 + config.edgeMargin;
			var delta = vm.diff(p1, p2);
			var t;
			if (delta.x && delta.y) {
				t = Math.min(Math.abs(xBound/delta.x), Math.abs(yBound/delta.y));
			} else {
				t = Math.abs(delta.x ? xBound/delta.x : yBound/delta.y);
			}
			return vm.add(p2, vm.mult(delta, t));
		}
		return p2;
	}

	function drawArrow(path, isOpen, arrowPoint, diamond){
		var size = (config.spacing - 2*config.edgeMargin) * config.arrowSize / 30
		var v = vm.diff(path[path.length-2], _.last(path))
		var nv = vm.normalize(v)
		function getArrowBase(s){ return vm.add(arrowPoint, vm.mult(nv, s*size)) }
		var arrowBase = getArrowBase(diamond ? 7 : 10)
		var t = vm.rot(nv)
		var arrowButt = (diamond) ? getArrowBase(14)
				: (isOpen && !config.fillArrows) ? getArrowBase(5) : arrowBase
		var arrow = [
			vm.add(arrowBase, vm.mult(t, 4*size)),
			arrowButt,
			vm.add(arrowBase, vm.mult(t, -4*size)),
			arrowPoint
		]
		g.fillStyle(isOpen ? config.stroke : config.fill[0])
		g.circuit(arrow).fillAndStroke()
	}

	function snapToPixels(){
		if (config.lineWidth % 2 === 1)
			g.translate(0.5, 0.5)
	}

	g.clear()
	setFont(config, 'bold')
	g.save()
	g.lineWidth(config.lineWidth)
	g.lineJoin('round')
	g.lineCap('round')
	g.strokeStyle(config.stroke)
	g.scale(config.zoom, config.zoom)
	snapToPixels()
	renderCompartment(compartment, {}, 0)
	g.restore()
}
;
var nomnoml = nomnoml || {};

(function () {
	'use strict';

	function getConfig(d) {
		var userStyles = {}
		_.each(d, function (styleDef, key){
			if (key[0] != '.') return
			userStyles[key.substring(1).toUpperCase()] = {
				center: _.contains(styleDef, 'center'),
				bold: _.contains(styleDef, 'bold'),
				underline: _.contains(styleDef, 'underline'),
				italic: _.contains(styleDef, 'italic'),
				dashed: _.contains(styleDef, 'dashed'),
				empty: _.contains(styleDef, 'empty'),
				fill: _.last(styleDef.match('fill=([^ ]*)')),
				visual: _.last(styleDef.match('visual=([^ ]*)')) || 'class',
				direction: { down: 'TB', right: 'LR' }[_.last(styleDef.match('direction=([^ ]*)'))] || 'TB'
			}
		})
		return {
			arrowSize: +d.arrowSize || 1,
			bendSize: +d.bendSize || 0.3,
			direction: { down: 'TB', right: 'LR' }[d.direction] || 'TB',
			gutter: +d.gutter || 5,
			edgeMargin: (+d.edgeMargin) || 0,
			edges: { hard: 'hard', rounded: 'rounded' }[d.edges] || 'rounded',
			fill: (d.fill || '#eee8d5;#fdf6e3;#eee8d5;#fdf6e3').split(';'),
			fillArrows: d.fillArrows === 'true',
			font: d.font || 'Calibri',
			fontSize: (+d.fontSize) || 12,
			leading: (+d.leading) || 1.25,
			lineWidth: (+d.lineWidth) || 3,
			padding: (+d.padding) || 8,
			spacing: (+d.spacing) || 40,
			stroke: d.stroke || '#33322E',
			title: d.title || 'nomnoml',
			zoom: +d.zoom || 1,
			styles: _.extend({}, nomnoml.styles, userStyles)
		};
	}

	function fitCanvasSize(canvas, rect, zoom) {
		canvas.width = rect.width * zoom;
		canvas.height = rect.height * zoom;
	}

	function setFont(config, isBold, isItalic, graphics) {
		var style = (isBold === 'bold' ? 'bold' : '')
		if (isItalic) style = 'italic ' + style
		var defaultFont = 'Helvetica, sans-serif'
		var font = skanaar.format('# #pt #, #', style, config.fontSize, config.font, defaultFont)
		graphics.font(font)
	}

	function parseAndRender(code, graphics, canvas, scale) {
		var ast = nomnoml.parse(code);
		var config = getConfig(ast.directives);
		var measurer = {
			setFont: function (a, b, c) { setFont(a, b, c, graphics); },
			textWidth: function (s) { return graphics.measureText(s).width },
			textHeight: function () { return config.leading * config.fontSize }
		};
		var layout = nomnoml.layout(measurer, config, ast);
		fitCanvasSize(canvas, layout, config.zoom * scale);
		config.zoom *= scale;
		nomnoml.render(graphics, config, layout, measurer.setFont);
		return { config: config };
	}

	nomnoml.draw = function (canvas, code, scale) {
		return parseAndRender(code, skanaar.Canvas(canvas), canvas, scale || 1)
	};

	nomnoml.renderSvg = function (code) {
		var ast = nomnoml.parse(code)
		var config = getConfig(ast.directives)
		var skCanvas = skanaar.Svg('')
		function setFont(config, isBold, isItalic) {
			var style = (isBold === 'bold' ? 'bold' : '')
			if (isItalic) style = 'italic ' + style
			var defFont = 'Helvetica, sans-serif'
			var template = 'font-weight:#; font-size:#pt; font-family:\'#\', #'
			var font = skanaar.format(template, style, config.fontSize, config.font, defFont)
			skCanvas.font(font)
		}
		var measurer = {
			setFont: function (a, b, c) { setFont(a, b, c, skCanvas); },
			textWidth: function (s) { return skCanvas.measureText(s).width },
			textHeight: function () { return config.leading * config.fontSize }
		};
		var layout = nomnoml.layout(measurer, config, ast)
		nomnoml.render(skCanvas, config, layout, measurer.setFont)
		return skCanvas.serialize({
		  width: layout.width,
		  height: layout.height
		})
	};
})();
;
  return nomnoml;
});