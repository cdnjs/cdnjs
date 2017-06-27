
this.StringScanner = (function() {
  var StringScanner;
  StringScanner = (function() {
    function StringScanner(str) {
      this.str = str != null ? str : '';
      this.str = '' + this.str;
      this.pos = 0;
      this.lastMatch = {
        reset: function() {
          this.str = null;
          this.captures = [];
          return this;
        }
      }.reset();
      this;
    }
    StringScanner.prototype.bol = function() {
      return this.pos <= 0 || (this.str[this.pos - 1] === "\n");
    };
    StringScanner.prototype.captures = function() {
      return this.lastMatch.captures;
    };
    StringScanner.prototype.check = function(pattern) {
      var matches;
      if (this.str.substr(this.pos).search(pattern) !== 0) {
        this.lastMatch.reset();
        return null;
      }
      matches = this.str.substr(this.pos).match(pattern);
      this.lastMatch.str = matches[0];
      this.lastMatch.captures = matches.slice(1);
      return this.lastMatch.str;
    };
    StringScanner.prototype.checkUntil = function(pattern) {
      var matches, patternPos;
      patternPos = this.str.substr(this.pos).search(pattern);
      if (patternPos < 0) {
        this.lastMatch.reset();
        return null;
      }
      matches = this.str.substr(this.pos + patternPos).match(pattern);
      this.lastMatch.captures = matches.slice(1);
      return this.lastMatch.str = this.str.substr(this.pos, patternPos) + matches[0];
    };
    StringScanner.prototype.clone = function() {
      var clone, prop, value, _ref;
      clone = new this.constructor(this.str);
      clone.pos = this.pos;
      clone.lastMatch = {};
      _ref = this.lastMatch;
      for (prop in _ref) {
        value = _ref[prop];
        clone.lastMatch[prop] = value;
      }
      return clone;
    };
    StringScanner.prototype.concat = function(str) {
      this.str += str;
      return this;
    };
    StringScanner.prototype.eos = function() {
      return this.pos === this.str.length;
    };
    StringScanner.prototype.exists = function(pattern) {
      var matches, patternPos;
      patternPos = this.str.substr(this.pos).search(pattern);
      if (patternPos < 0) {
        this.lastMatch.reset();
        return null;
      }
      matches = this.str.substr(this.pos + patternPos).match(pattern);
      this.lastMatch.str = matches[0];
      this.lastMatch.captures = matches.slice(1);
      return patternPos;
    };
    StringScanner.prototype.getch = function() {
      return this.scan(/./);
    };
    StringScanner.prototype.match = function() {
      return this.lastMatch.str;
    };
    StringScanner.prototype.matches = function(pattern) {
      this.check(pattern);
      return this.matchSize();
    };
    StringScanner.prototype.matched = function() {
      return this.lastMatch.str != null;
    };
    StringScanner.prototype.matchSize = function() {
      if (this.matched()) {
        return this.match().length;
      } else {
        return null;
      }
    };
    StringScanner.prototype.peek = function(len) {
      return this.str.substr(this.pos, len);
    };
    StringScanner.prototype.pointer = function() {
      return this.pos;
    };
    StringScanner.prototype.setPointer = function(pos) {
      pos = +pos;
      if (pos < 0) {
        pos = 0;
      }
      if (pos > this.str.length) {
        pos = this.str.length;
      }
      return this.pos = pos;
    };
    StringScanner.prototype.reset = function() {
      this.lastMatch.reset();
      this.pos = 0;
      return this;
    };
    StringScanner.prototype.rest = function() {
      return this.str.substr(this.pos);
    };
    StringScanner.prototype.scan = function(pattern) {
      var chk;
      chk = this.check(pattern);
      if (chk != null) {
        this.pos += chk.length;
      }
      return chk;
    };
    StringScanner.prototype.scanUntil = function(pattern) {
      var chk;
      chk = this.checkUntil(pattern);
      if (chk != null) {
        this.pos += chk.length;
      }
      return chk;
    };
    StringScanner.prototype.skip = function(pattern) {
      this.scan(pattern);
      return this.matchSize();
    };
    StringScanner.prototype.skipUntil = function(pattern) {
      this.scanUntil(pattern);
      return this.matchSize();
    };
    StringScanner.prototype.string = function() {
      return this.str;
    };
    StringScanner.prototype.terminate = function() {
      this.pos = this.str.length;
      this.lastMatch.reset();
      return this;
    };
    StringScanner.prototype.toString = function() {
      return "#<StringScanner " + (this.eos() ? 'fin' : "" + this.pos + "/" + this.str.length + " @ " + (this.str.length > 8 ? "" + (this.str.substr(0, 5)) + "..." : this.str)) + ">";
    };
    return StringScanner;
  })();
  StringScanner.prototype.beginningOfLine = StringScanner.prototype.bol;
  StringScanner.prototype.clear = StringScanner.prototype.terminate;
  StringScanner.prototype.dup = StringScanner.prototype.clone;
  StringScanner.prototype.endOfString = StringScanner.prototype.eos;
  StringScanner.prototype.exist = StringScanner.prototype.exists;
  StringScanner.prototype.getChar = StringScanner.prototype.getch;
  StringScanner.prototype.position = StringScanner.prototype.pointer;
  StringScanner.StringScanner = StringScanner;
  //module.exports = StringScanner;
  return StringScanner;
}).call(this);




// lib/handlebars/base.js

/*jshint eqnull:true*/
this.Handlebars = {};

(function(Handlebars) {

Handlebars.VERSION = "1.0.rc.2";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});

}(this.Handlebars));
;
// lib/handlebars/compiler/parser.js
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"simpleInverse":6,"statements":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"OPEN_PARTIAL":24,"partialName":25,"params":26,"hash":27,"DATA":28,"param":29,"STRING":30,"INTEGER":31,"BOOLEAN":32,"hashSegments":33,"hashSegment":34,"ID":35,"EQUALS":36,"PARTIAL_NAME":37,"pathSegments":38,"SEP":39,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",28:"DATA",30:"STRING",31:"INTEGER",32:"BOOLEAN",35:"ID",36:"EQUALS",37:"PARTIAL_NAME",39:"SEP"},
productions_: [0,[3,2],[4,2],[4,3],[4,2],[4,1],[4,1],[4,0],[7,1],[7,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[6,2],[17,3],[17,2],[17,2],[17,1],[17,1],[26,2],[26,1],[29,1],[29,1],[29,1],[29,1],[29,1],[27,1],[33,2],[33,1],[34,3],[34,3],[34,3],[34,3],[34,3],[25,1],[21,1],[38,3],[38,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.ProgramNode([], $$[$0]); 
break;
case 3: this.$ = new yy.ProgramNode($$[$0-2], $$[$0]); 
break;
case 4: this.$ = new yy.ProgramNode($$[$0-1], []); 
break;
case 5: this.$ = new yy.ProgramNode($$[$0]); 
break;
case 6: this.$ = new yy.ProgramNode([], []); 
break;
case 7: this.$ = new yy.ProgramNode([]); 
break;
case 8: this.$ = [$$[$0]]; 
break;
case 9: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 10: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]); 
break;
case 11: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]); 
break;
case 12: this.$ = $$[$0]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = new yy.ContentNode($$[$0]); 
break;
case 15: this.$ = new yy.CommentNode($$[$0]); 
break;
case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 18: this.$ = $$[$0-1]; 
break;
case 19: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 20: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true); 
break;
case 21: this.$ = new yy.PartialNode($$[$0-1]); 
break;
case 22: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1]); 
break;
case 23: 
break;
case 24: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]; 
break;
case 25: this.$ = [[$$[$0-1]].concat($$[$0]), null]; 
break;
case 26: this.$ = [[$$[$0-1]], $$[$0]]; 
break;
case 27: this.$ = [[$$[$0]], null]; 
break;
case 28: this.$ = [[new yy.DataNode($$[$0])], null]; 
break;
case 29: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 30: this.$ = [$$[$0]]; 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = new yy.StringNode($$[$0]); 
break;
case 33: this.$ = new yy.IntegerNode($$[$0]); 
break;
case 34: this.$ = new yy.BooleanNode($$[$0]); 
break;
case 35: this.$ = new yy.DataNode($$[$0]); 
break;
case 36: this.$ = new yy.HashNode($$[$0]); 
break;
case 37: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 38: this.$ = [$$[$0]]; 
break;
case 39: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 40: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]; 
break;
case 41: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]; 
break;
case 42: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]; 
break;
case 43: this.$ = [$$[$0-2], new yy.DataNode($$[$0])]; 
break;
case 44: this.$ = new yy.PartialNameNode($$[$0]); 
break;
case 45: this.$ = new yy.IdNode($$[$0]); 
break;
case 46: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 47: this.$ = [$$[$0]]; 
break;
}
},
table: [{3:1,4:2,5:[2,7],6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],22:[1,14],23:[1,15],24:[1,16]},{1:[3]},{5:[1,17]},{5:[2,6],7:18,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,6],22:[1,14],23:[1,15],24:[1,16]},{5:[2,5],6:20,8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,5],22:[1,14],23:[1,15],24:[1,16]},{17:23,18:[1,22],21:24,28:[1,25],35:[1,27],38:26},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{4:28,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],24:[1,16]},{4:29,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],24:[1,16]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{17:30,21:24,28:[1,25],35:[1,27],38:26},{17:31,21:24,28:[1,25],35:[1,27],38:26},{17:32,21:24,28:[1,25],35:[1,27],38:26},{25:33,37:[1,34]},{1:[2,1]},{5:[2,2],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,2],22:[1,14],23:[1,15],24:[1,16]},{17:23,21:24,28:[1,25],35:[1,27],38:26},{5:[2,4],7:35,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,4],22:[1,14],23:[1,15],24:[1,16]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,23],14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],24:[2,23]},{18:[1,36]},{18:[2,27],21:41,26:37,27:38,28:[1,45],29:39,30:[1,42],31:[1,43],32:[1,44],33:40,34:46,35:[1,47],38:26},{18:[2,28]},{18:[2,45],28:[2,45],30:[2,45],31:[2,45],32:[2,45],35:[2,45],39:[1,48]},{18:[2,47],28:[2,47],30:[2,47],31:[2,47],32:[2,47],35:[2,47],39:[2,47]},{10:49,20:[1,50]},{10:51,20:[1,50]},{18:[1,52]},{18:[1,53]},{18:[1,54]},{18:[1,55],21:56,35:[1,27],38:26},{18:[2,44],35:[2,44]},{5:[2,3],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,3],22:[1,14],23:[1,15],24:[1,16]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{18:[2,25],21:41,27:57,28:[1,45],29:58,30:[1,42],31:[1,43],32:[1,44],33:40,34:46,35:[1,47],38:26},{18:[2,26]},{18:[2,30],28:[2,30],30:[2,30],31:[2,30],32:[2,30],35:[2,30]},{18:[2,36],34:59,35:[1,60]},{18:[2,31],28:[2,31],30:[2,31],31:[2,31],32:[2,31],35:[2,31]},{18:[2,32],28:[2,32],30:[2,32],31:[2,32],32:[2,32],35:[2,32]},{18:[2,33],28:[2,33],30:[2,33],31:[2,33],32:[2,33],35:[2,33]},{18:[2,34],28:[2,34],30:[2,34],31:[2,34],32:[2,34],35:[2,34]},{18:[2,35],28:[2,35],30:[2,35],31:[2,35],32:[2,35],35:[2,35]},{18:[2,38],35:[2,38]},{18:[2,47],28:[2,47],30:[2,47],31:[2,47],32:[2,47],35:[2,47],36:[1,61],39:[2,47]},{35:[1,62]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{21:63,35:[1,27],38:26},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],24:[2,21]},{18:[1,64]},{18:[2,24]},{18:[2,29],28:[2,29],30:[2,29],31:[2,29],32:[2,29],35:[2,29]},{18:[2,37],35:[2,37]},{36:[1,61]},{21:65,28:[1,69],30:[1,66],31:[1,67],32:[1,68],35:[1,27],38:26},{18:[2,46],28:[2,46],30:[2,46],31:[2,46],32:[2,46],35:[2,46],39:[2,46]},{18:[1,70]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],24:[2,22]},{18:[2,39],35:[2,39]},{18:[2,40],35:[2,40]},{18:[2,41],35:[2,41]},{18:[2,42],35:[2,42]},{18:[2,43],35:[2,43]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]}],
defaultActions: {17:[2,1],25:[2,28],38:[2,26],57:[2,24]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
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
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
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
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
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
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
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
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                   if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                   if(yy_.yytext) return 14;
                                 
break;
case 1: return 14; 
break;
case 2:
                                   if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1);
                                   return 14;
                                 
break;
case 3: yy_.yytext = yy_.yytext.substr(0, yy_.yyleng-4); this.popState(); return 15; 
break;
case 4: this.begin("par"); return 24; 
break;
case 5: return 16; 
break;
case 6: return 20; 
break;
case 7: return 19; 
break;
case 8: return 19; 
break;
case 9: return 23; 
break;
case 10: return 23; 
break;
case 11: this.popState(); this.begin('com'); 
break;
case 12: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15; 
break;
case 13: return 22; 
break;
case 14: return 36; 
break;
case 15: return 35; 
break;
case 16: return 35; 
break;
case 17: return 39; 
break;
case 18: /*ignore whitespace*/ 
break;
case 19: this.popState(); return 18; 
break;
case 20: this.popState(); return 18; 
break;
case 21: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 30; 
break;
case 22: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\'/g,"'"); return 30; 
break;
case 23: yy_.yytext = yy_.yytext.substr(1); return 28; 
break;
case 24: return 32; 
break;
case 25: return 32; 
break;
case 26: return 31; 
break;
case 27: return 35; 
break;
case 28: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 35; 
break;
case 29: return 'INVALID'; 
break;
case 30: /*ignore whitespace*/ 
break;
case 31: this.popState(); return 37; 
break;
case 32: return 5; 
break;
}
};
lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[} ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@[a-zA-Z]+)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:[0-9]+(?=[}\s]))/,/^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:\s+)/,/^(?:[a-zA-Z0-9_$-/]+)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,32],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"par":{"rules":[30,31],"inclusive":false},"INITIAL":{"rules":[0,1,32],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();;
// lib/handlebars/compiler/base.js
Handlebars.Parser = handlebars;

Handlebars.parse = function(string) {
  Handlebars.Parser.yy = Handlebars.AST;
  return Handlebars.Parser.parse(string);
};

Handlebars.print = function(ast) {
  return new Handlebars.PrintVisitor().accept(ast);
};;
// lib/handlebars/compiler/ast.js
(function() {

  Handlebars.AST = {};

  Handlebars.AST.ProgramNode = function(statements, inverse) {
    this.type = "program";
    this.statements = statements;
    if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
  };

  Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
    this.type = "mustache";
    this.escaped = !unescaped;
    this.hash = hash;

    var id = this.id = rawParams[0];
    var params = this.params = rawParams.slice(1);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    var eligibleHelper = this.eligibleHelper = id.isSimple;

    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    this.isHelper = eligibleHelper && (params.length || hash);

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
  };

  Handlebars.AST.PartialNode = function(partialName, context) {
    this.type         = "partial";
    this.partialName  = partialName;
    this.context      = context;
  };

  var verifyMatch = function(open, close) {
    if(open.original !== close.original) {
      throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
    }
  };

  Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
    verifyMatch(mustache.id, close);
    this.type = "block";
    this.mustache = mustache;
    this.program  = program;
    this.inverse  = inverse;

    if (this.inverse && !this.program) {
      this.isInverse = true;
    }
  };

  Handlebars.AST.ContentNode = function(string) {
    this.type = "content";
    this.string = string;
  };

  Handlebars.AST.HashNode = function(pairs) {
    this.type = "hash";
    this.pairs = pairs;
  };

  Handlebars.AST.IdNode = function(parts) {
    this.type = "ID";
    this.original = parts.join(".");

    var dig = [], depth = 0;

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i];

      if(part === "..") { depth++; }
      else if(part === "." || part === "this") { this.isScoped = true; }
      else { dig.push(part); }
    }

    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

    this.stringModeValue = this.string;
  };

  Handlebars.AST.PartialNameNode = function(name) {
    this.type = "PARTIAL_NAME";
    this.name = name;
  };

  Handlebars.AST.DataNode = function(id) {
    this.type = "DATA";
    this.id = id;
  };

  Handlebars.AST.StringNode = function(string) {
    this.type = "STRING";
    this.string = string;
    this.stringModeValue = string;
  };

  Handlebars.AST.IntegerNode = function(integer) {
    this.type = "INTEGER";
    this.integer = integer;
    this.stringModeValue = Number(integer);
  };

  Handlebars.AST.BooleanNode = function(bool) {
    this.type = "BOOLEAN";
    this.bool = bool;
    this.stringModeValue = bool === "true";
  };

  Handlebars.AST.CommentNode = function(comment) {
    this.type = "comment";
    this.comment = comment;
  };

})();;
// lib/handlebars/utils.js

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (!value && value !== 0) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/compiler/compiler.js

/*jshint eqnull:true*/
Handlebars.Compiler = function() {};
Handlebars.JavaScriptCompiler = function() {};

(function(Compiler, JavaScriptCompiler) {
  // the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, out = [], params, param;

      for (var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if (opcode.opcode === 'DECLARE') {
          out.push("DECLARE " + opcode.name + "=" + opcode.value);
        } else {
          params = [];
          for (var j=0; j<opcode.args.length; j++) {
            param = opcode.args[j];
            if (typeof param === "string") {
              param = "\"" + param.replace("\n", "\\n") + "\"";
            }
            params.push(param);
          }
          out.push(opcode.opcode + " " + params.join(" "));
        }
      }

      return out.join("\n");
    },

    guid: 0,

    compile: function(program, options) {
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.program(program);
    },

    accept: function(node) {
      return this[node.type](node);
    },

    program: function(program) {
      var statements = program.statements, statement;
      this.opcodes = [];

      for(var i=0, l=statements.length; i<l; i++) {
        statement = statements[i];
        this[statement.type](statement);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var type = this.classifyMustache(mustache);

      if (type === "helper") {
        this.helperMustache(mustache, program, inverse);
      } else if (type === "simple") {
        this.simpleMustache(mustache);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('pushHash');
        this.opcode('blockValue');
      } else {
        this.ambiguousMustache(mustache, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('pushHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('pushHash');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        if (this.options.stringParams) {
          this.opcode('pushStringParam', val.stringModeValue, val.type);
        } else {
          this.accept(val);
        }

        this.opcode('assignToHash', pair[0]);
      }
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', partialName.name);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      var options = this.options;
      var type = this.classifyMustache(mustache);

      if (type === "simple") {
        this.simpleMustache(mustache);
      } else if (type === "helper") {
        this.helperMustache(mustache);
      } else {
        this.ambiguousMustache(mustache);
      }

      if(mustache.escaped && !options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousMustache: function(mustache, program, inverse) {
      var id = mustache.id, name = id.parts[0];

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.opcode('invokeAmbiguous', name);
    },

    simpleMustache: function(mustache, program, inverse) {
      var id = mustache.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperMustache: function(mustache, program, inverse) {
      var params = this.setupFullMustacheParams(mustache, program, inverse),
          name = mustache.id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.knownHelpersOnly) {
        throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
      } else {
        this.opcode('invokeHelper', params.length, name);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts[0]);
      }

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      this.opcode('lookupData', data.id);
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('pushLiteral', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
    },

    declare: function(name, value) {
      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
    },

    addDepth: function(depth) {
      if(isNaN(depth)) { throw new Error("EWOT"); }
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifyMustache: function(mustache) {
      var isHelper   = mustache.isHelper;
      var isEligible = mustache.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      if (isEligible && !isHelper) {
        var name = mustache.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.stringModeValue, param.type);
        } else {
          this[param.type](param);
        }
      }
    },

    setupMustacheParams: function(mustache) {
      var params = mustache.params;
      this.pushParams(params);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('pushHash');
      }

      return params;
    },

    // this will replace setupMustacheParams when we're done
    setupFullMustacheParams: function(mustache, program, inverse) {
      var params = mustache.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('pushHash');
      }

      return params;
    }
  };

  var Literal = function(value) {
    this.value = value;
  };

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name, type) {
      if (/^[0-9]+$/.test(name)) {
        return parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        return parent + "." + name;
      }
      else {
        return parent + "['" + name + "']";
      }
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return "buffer += " + string + ";";
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        aliases: { }
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.registers = { list: [] };
      this.compileStack = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(l=opcodes.length; this.i<l; this.i++) {
        opcode = opcodes[this.i];

        if(opcode.opcode === 'DECLARE') {
          this[opcode.name] = opcode.value;
        } else {
          this[opcode.opcode].apply(this, opcode.args);
        }
      }

      return this.createFunctionContext(asObject);
    },

    nextOpcode: function() {
      var opcodes = this.environment.opcodes, opcode = opcodes[this.i + 1];
      return opcodes[this.i + 1];
    },

    eat: function(opcode) {
      this.i = this.i + 1;
    },

    preamble: function() {
      var out = [];

      if (!this.isChild) {
        var namespace = this.namespace;
        var copies = "helpers = helpers || " + namespace + ".helpers;";
        if (this.environment.usePartial) { copies = copies + " partials = partials || " + namespace + ".partials;"; }
        if (this.options.data) { copies = copies + " data = data || {};"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars.concat(this.registers.list);

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        var aliases = [];
        for (var alias in this.context.aliases) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.source.push("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      if (asObject) {
        params.push(this.source.join("\n  "));

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + this.source.join("\n  ") + '}';
        Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
        return functionSource;
      }
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      this.replaceStack(function(current) {
        params.splice(1, 0, current);
        return "blockHelperMissing.call(" + params.join(", ") + ")";
      });
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      var current = this.topStack();
      params.splice(1, 0, current);

      this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      this.source.push(this.appendToBuffer(this.quotedString(content)));
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      var local = this.popStack();
      this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.source.push("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      var opcode = this.nextOpcode(), extra = "";
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      if(opcode && opcode.opcode === 'appendContent') {
        extra = " + " + this.quotedString(opcode.args[0]);
        this.eat(opcode);
      }

      this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + extra));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(name) {
      this.pushStack(this.nameLookup('depth' + this.lastContext, name, 'context'));
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral('depth' + this.lastContext);
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.context.aliases.functionType = '"function"';

      this.replaceStack(function(current) {
        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
      });
    },

    // [lookup]
    //
    // On stack, before: value, ...
    // On stack, after: value[name], ...
    //
    // Replace the value on the stack with the result of looking
    // up `name` on `value`
    lookup: function(name) {
      this.replaceStack(function(current) {
        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
      });
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data[id], ...
    //
    // Push the result of looking up `id` on the current data
    lookupData: function(id) {
      this.pushStack(this.nameLookup('data', id, 'data'));
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushStackLiteral('depth' + this.lastContext);

      this.pushString(type);

      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    },

    pushHash: function() {
      this.push('{}');

      if (this.options.stringParams) {
        this.register('hashTypes', '{}');
      }
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.pushStack(expr);
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name) {
      this.context.aliases.helperMissing = 'helpers.helperMissing';

      var helper = this.lastHelper = this.setupHelper(paramSize, name);
      this.register('foundHelper', helper.name);

      this.pushStack("foundHelper ? foundHelper.call(" +
        helper.callParams + ") " + ": helperMissing.call(" +
        helper.helperMissingParams + ")");
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.pushStack(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name) {
      this.context.aliases.functionType = '"function"';

      this.pushStackLiteral('{}');
      var helper = this.setupHelper(0, name);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
      this.register('foundHelper', helperName);

      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
      var nextStack = this.nextStack();

      this.source.push('if (foundHelper) { ' + nextStack + ' = foundHelper.call(' + helper.callParams + '); }');
      this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.apply(depth0) : ' + nextStack + '; }');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.context.aliases.self = "this";
      this.pushStack("self.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, hash, ...
    // On stack, after: hash, ...
    //
    // Pops a value and hash off the stack, assigns `hash[key] = value`
    // and pushes the hash back onto the stack.
    assignToHash: function(key) {
      var value = this.popStack();

      if (this.options.stringParams) {
        var type = this.popStack();
        this.popStack();
        this.source.push("hashTypes['" + key + "'] = " + type + ";");
      }

      var hash = this.topStack();

      this.source.push(hash + "['" + key + "'] = " + value + ";");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        var index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
      }
    },

    programExpression: function(guid) {
      this.context.aliases.self = "this";

      if(guid == null) {
        return "self.noop";
      }

      var child = this.environment.children[guid],
          depths = child.depths.list, depth;

      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      if(depths.length === 0) {
        return "self.program(" + programParams.join(", ") + ")";
      } else {
        programParams.shift();
        return "self.programWithDepth(" + programParams.join(", ") + ")";
      }
    },

    register: function(name, val) {
      this.useRegister(name);
      this.source.push(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      this.compileStack.push(new Literal(item));
      return item;
    },

    pushStack: function(item) {
      var stack = this.incrStack();
      this.source.push(stack + " = " + item + ";");
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var stack = this.topStack(),
          item = callback.call(this, stack);

      // Prevent modification of the context depth variable. Through replaceStack
      if (/^depth/.test(stack)) {
        stack = this.nextStack();
      }

      this.source.push(stack + " = " + item + ";");
      return stack;
    },

    nextStack: function(skipCompileStack) {
      var name = this.incrStack();
      this.compileStack.push(name);
      return name;
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return "stack" + this.stackSlot;
    },

    popStack: function() {
      var item = this.compileStack.pop();

      if (item instanceof Literal) {
        return item.value;
      } else {
        this.stackSlot--;
        return item;
      }
    },

    topStack: function() {
      var item = this.compileStack[this.compileStack.length - 1];

      if (item instanceof Literal) {
        return item.value;
      } else {
        return item;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r') + '"';
    },

    setupHelper: function(paramSize, name) {
      var params = [];
      this.setupParams(paramSize, params);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        name: foundHelper,
        callParams: ["depth0"].concat(params).join(", "),
        helperMissingParams: ["depth0", this.quotedString(name)].concat(params).join(", ")
      };
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(paramSize, params) {
      var options = [], contexts = [], types = [], param, inverse, program;

      options.push("hash:" + this.popStack());

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          this.context.aliases.self = "this";
          program = "self.noop";
        }

        if (!inverse) {
         this.context.aliases.self = "this";
          inverse = "self.noop";
        }

        options.push("inverse:" + inverse);
        options.push("fn:" + program);
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          types.push(this.popStack());
          contexts.push(this.popStack());
        }
      }

      if (this.options.stringParams) {
        options.push("contexts:[" + contexts.join(",") + "]");
        options.push("types:[" + types.join(",") + "]");
        options.push("hashTypes:hashTypes");
      }

      if(this.options.data) {
        options.push("data:data");
      }

      params.push("{" + options.join(",") + "}");
      return params.join(", ");
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
      return true;
    }
    return false;
  };

})(Handlebars.Compiler, Handlebars.JavaScriptCompiler);

Handlebars.precompile = function(string, options) {
  if (typeof string !== 'string') {
    throw new Handlebars.Exception("You must pass a string to Handlebars.compile. You passed " + string);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var ast = Handlebars.parse(string);
  var environment = new Handlebars.Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function(string, options) {
  if (typeof string !== 'string') {
    throw new Handlebars.Exception("You must pass a string to Handlebars.compile. You passed " + string);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var compiled;
  function compile() {
    var ast = Handlebars.parse(string);
    var environment = new Handlebars.Compiler().compile(ast, options);
    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
    return Handlebars.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};
;
// lib/handlebars/runtime.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;

// lib/emblem.js
var Emblem;

this.Emblem = {};

Emblem = this.Emblem;

// exports = Emblem;

// 

// 

// 

// 

// 
;
// lib/parser.js

// 
// 

Emblem.Parser = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successful,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input) {
      var parseFunctions = {
        "content": parse_content
      };
      
      var options = arguments.length > 1 ? arguments[1] : {},
          startRule;
      
      if (options.startRule !== undefined) {
        startRule = options.startRule;
        
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Can't start parsing from rule " + quote(startRule) + ".");
        }
      } else {
        startRule = "content";
      }
      
      var pos = 0;
      var reportedPos = 0;
      var cachedReportedPos = 0;
      var cachedReportedPosDetails = { line: 1, column: 1, seenCR: false };
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function computeReportedPosDetails() {
        function advanceCachedReportedPos() {
          var ch;
          
          for (; cachedReportedPos < reportedPos; cachedReportedPos++) {
            ch = input.charAt(cachedReportedPos);
            if (ch === "\n") {
              if (!cachedReportedPosDetails.seenCR) { cachedReportedPosDetails.line++; }
              cachedReportedPosDetails.column = 1;
              cachedReportedPosDetails.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              cachedReportedPosDetails.line++;
              cachedReportedPosDetails.column = 1;
              cachedReportedPosDetails.seenCR = true;
            } else {
              cachedReportedPosDetails.column++;
              cachedReportedPosDetails.seenCR = false;
            }
          }
        }
        
        if (cachedReportedPos !== reportedPos) {
          if (cachedReportedPos > reportedPos) {
            cachedReportedPos = 0;
            cachedReportedPosDetails = { line: 1, column: 1, seenCR: false };
          }
          advanceCachedReportedPos();
        }
        
        return cachedReportedPosDetails;
      }
      
      function text() {
        return input.substring(reportedPos, pos);
      }
      
      function offset() {
        return reportedPos;
      }
      
      function line() {
        return computeReportedPosDetails().line;
      }
      
      function column() {
        return computeReportedPosDetails().column;
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_content() {
        var r0, r1, r2;
        
        r1 = pos;
        r0 = [];
        r2 = parse_statement();
        while (r2 !== null) {
          r0.push(r2);
          r2 = parse_statement();
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(statements) {
          // Coalesce all adjacent ContentNodes into one.
        
          var compressedStatements = [];
          var buffer = [];
        
          for(var i = 0; i < statements.length; ++i) {
            var nodes = statements[i];
        
            for(var j = 0; j < nodes.length; ++j) {
              var node = nodes[j]
              if(node.type === "content") {
                if(node.string) {
                  // Ignore empty strings (comments).
                  buffer.push(node.string);
                }
                continue;
              } 
        
              // Flush content if present.
              if(buffer.length) {
                compressedStatements.push(new Handlebars.AST.ContentNode(buffer.join('')));
                buffer = [];
              }
              compressedStatements.push(node);
            }
          }
        
          if(buffer.length) { 
            compressedStatements.push(new Handlebars.AST.ContentNode(buffer.join(''))); 
          }
        
          return compressedStatements;
        })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_invertibleContent() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_content();
        if (r3 !== null) {
          r5 = pos;
          r6 = pos;
          r7 = parse_DEDENT();
          if (r7 !== null) {
            if (input.substr(pos, 4) === "else") {
              r8 = "else";
              pos += 4;
            } else {
              r8 = null;
              if (reportFailures === 0) {
                matchFailed("\"else\"");
              }
            }
            if (r8 !== null) {
              r9 = parse__();
              if (r9 !== null) {
                r10 = parse_TERM();
                if (r10 !== null) {
                  r11 = parse_INDENT();
                  if (r11 !== null) {
                    r12 = parse_content();
                    if (r12 !== null) {
                      r4 = [r7, r8, r9, r10, r11, r12];
                    } else {
                      r4 = null;
                      pos = r6;
                    }
                  } else {
                    r4 = null;
                    pos = r6;
                  }
                } else {
                  r4 = null;
                  pos = r6;
                }
              } else {
                r4 = null;
                pos = r6;
              }
            } else {
              r4 = null;
              pos = r6;
            }
          } else {
            r4 = null;
            pos = r6;
          }
          if (r4 !== null) {
            reportedPos = r5;
            r4 = (function(c) {return c;})(r12);
          }
          if (r4 === null) {
            pos = r5;
          }
          r4 = r4 !== null ? r4 : "";
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(c, i) { 
          return new Handlebars.AST.ProgramNode(c, i || []);
        })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_statement() {
        var r0;
        
        r0 = parse_comment();
        if (r0 === null) {
          r0 = parse_htmlElement();
          if (r0 === null) {
            r0 = parse_textLine();
            if (r0 === null) {
              r0 = parse_mustache();
            }
          }
        }
        return r0;
      }
      
      function parse_htmlElement() {
        var r0;
        
        r0 = parse_htmlElementMaybeBlock();
        if (r0 === null) {
          r0 = parse_htmlElementWithInlineContent();
        }
        return r0;
      }
      
      function parse_mustache() {
        var r0, r1;
        
        r1 = pos;
        r0 = parse_explicitMustache();
        if (r0 === null) {
          r0 = parse_lineStartingMustache();
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(m) { 
          return [m]; 
        })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_comment() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 47) {
          r3 = "/";
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\"/\"");
          }
        }
        if (r3 !== null) {
          r4 = parse_lineContent();
          if (r4 !== null) {
            r5 = parse_TERM();
            if (r5 !== null) {
              r7 = pos;
              r8 = parse_INDENT();
              if (r8 !== null) {
                r11 = pos;
                r12 = parse_lineContent();
                if (r12 !== null) {
                  r13 = parse_TERM();
                  if (r13 !== null) {
                    r10 = [r12, r13];
                  } else {
                    r10 = null;
                    pos = r11;
                  }
                } else {
                  r10 = null;
                  pos = r11;
                }
                if (r10 !== null) {
                  r9 = [];
                  while (r10 !== null) {
                    r9.push(r10);
                    r11 = pos;
                    r12 = parse_lineContent();
                    if (r12 !== null) {
                      r13 = parse_TERM();
                      if (r13 !== null) {
                        r10 = [r12, r13];
                      } else {
                        r10 = null;
                        pos = r11;
                      }
                    } else {
                      r10 = null;
                      pos = r11;
                    }
                  }
                } else {
                  r9 = null;
                }
                if (r9 !== null) {
                  r10 = parse_DEDENT();
                  if (r10 !== null) {
                    r6 = [r8, r9, r10];
                  } else {
                    r6 = null;
                    pos = r7;
                  }
                } else {
                  r6 = null;
                  pos = r7;
                }
              } else {
                r6 = null;
                pos = r7;
              }
              r6 = r6 !== null ? r6 : "";
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function() { return []; })();
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_lineStartingMustache() {
        var r0;
        
        r0 = parse_capitalizedLineStarterMustache();
        if (r0 === null) {
          r0 = parse_mustacheMaybeBlock();
        }
        return r0;
      }
      
      function parse_capitalizedLineStarterMustache() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        r4 = pos;
        reportFailures++;
        if (/^[A-Z]/.test(input.charAt(pos))) {
          r3 = input.charAt(pos);
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("[A-Z]");
          }
        }
        reportFailures--;
        if (r3 !== null) {
          r3 = "";
          pos = r4;
        } else {
          r3 = null;
        }
        if (r3 !== null) {
          r4 = parse_mustacheMaybeBlock();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(ret) {
          // TODO make this configurable
          var defaultCapitalizedHelper = 'view';
        
          if(ret.mustache) {
            // Block. Modify inner MustacheNode and return.
            ret.mustache = unshiftParam(ret.mustache, defaultCapitalizedHelper);
            return ret;
          } else {
            // ret is the MustacheNode
            return unshiftParam(ret, defaultCapitalizedHelper);
          }
        })(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_htmlElementMaybeBlock() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_htmlTagAndOptionalAttributes();
        if (r3 !== null) {
          r4 = parse__();
          if (r4 !== null) {
            r5 = parse_TERM();
            if (r5 !== null) {
              r7 = pos;
              r8 = parse_INDENT();
              if (r8 !== null) {
                r9 = parse_content();
                if (r9 !== null) {
                  r10 = parse_DEDENT();
                  if (r10 !== null) {
                    r6 = [r8, r9, r10];
                  } else {
                    r6 = null;
                    pos = r7;
                  }
                } else {
                  r6 = null;
                  pos = r7;
                }
              } else {
                r6 = null;
                pos = r7;
              }
              r6 = r6 !== null ? r6 : "";
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(h, c) { 
          var ret = h[0];
          if(c) {
            ret = ret.concat(c[1]);
          }
          ret.push(h[1]);
        
          return ret;
        })(r3, r6);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_htmlElementWithInlineContent() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_htmlTagAndOptionalAttributes();
        if (r3 !== null) {
          if (input.charCodeAt(pos) === 32) {
            r4 = " ";
            pos++;
          } else {
            r4 = null;
            if (reportFailures === 0) {
              matchFailed("\" \"");
            }
          }
          if (r4 !== null) {
            r5 = parse_htmlInlineContent();
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(h, c) { 
          var ret = h[0];
          if(c) {
            ret = ret.concat(c);
          }
          ret.push(h[1]);
        
          return ret;
        })(r3, r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_mustacheMaybeBlock() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_inMustache();
        if (r3 !== null) {
          r4 = parse__();
          if (r4 !== null) {
            r5 = parse_TERM();
            if (r5 !== null) {
              r7 = pos;
              r8 = parse_INDENT();
              if (r8 !== null) {
                r9 = parse_invertibleContent();
                if (r9 !== null) {
                  r10 = parse_DEDENT();
                  if (r10 !== null) {
                    r6 = [r8, r9, r10];
                  } else {
                    r6 = null;
                    pos = r7;
                  }
                } else {
                  r6 = null;
                  pos = r7;
                }
              } else {
                r6 = null;
                pos = r7;
              }
              r6 = r6 !== null ? r6 : "";
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(mustacheNode, block) { 
          if(!block) return mustacheNode;
          var programNode = block[1];
          return new Handlebars.AST.BlockNode(mustacheNode, programNode, programNode.inverse, mustacheNode.id);
        })(r3, r6);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_explicitMustache() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_equalSign();
        if (r3 !== null) {
          r4 = parse_mustacheMaybeBlock();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(e, ret) {
          var mustache = ret.mustache || ret;
          mustache.escaped = e;
          return ret;
        })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_inMustache() {
        var r0, r1, r2, r3, r4, r5, r6;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_pathIdNode();
        if (r3 !== null) {
          r4 = parse_trailingModifier();
          r4 = r4 !== null ? r4 : "";
          if (r4 !== null) {
            r5 = [];
            r6 = parse_inMustacheParam();
            while (r6 !== null) {
              r5.push(r6);
              r6 = parse_inMustacheParam();
            }
            if (r5 !== null) {
              r6 = parse_hash();
              r6 = r6 !== null ? r6 : "";
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(path, tm, params, hash) { 
          params.unshift(path);
        
          var mustacheNode = new Handlebars.AST.MustacheNode(params, hash); 
        
          if(tm == '!') {
            return unshiftParam(mustacheNode, 'unbound');
          } else if(tm == '?') {
            return unshiftParam(mustacheNode, 'if');
          } else if(tm == '^') {
            return unshiftParam(mustacheNode, 'unless');
          }
        
          return  mustacheNode;
        })(r3, r4, r5, r6);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_modifiedParam() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_param();
        if (r3 !== null) {
          r4 = parse_trailingModifier();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(p, m) { 
          var ret = new String(p);
          ret.trailingModifier = m;
          return ret;
        })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_inMustacheParam() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        r3 = parse__();
        if (r3 !== null) {
          r4 = parse_param();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(p) { return p; })(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_trailingModifier() {
        var r0;
        
        if (/^[!?*\^]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[!?*\\^]");
          }
        }
        return r0;
      }
      
      function parse_hash() {
        var r0, r1, r2;
        
        r1 = pos;
        r2 = parse_hashSegment();
        if (r2 !== null) {
          r0 = [];
          while (r2 !== null) {
            r0.push(r2);
            r2 = parse_hashSegment();
          }
        } else {
          r0 = null;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(h) { return new Handlebars.AST.HashNode(h); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_pathIdent() {
        var r0, r1, r2, r3, r4, r5;
        
        if (input.substr(pos, 2) === "..") {
          r0 = "..";
          pos += 2;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"..\"");
          }
        }
        if (r0 === null) {
          if (input.charCodeAt(pos) === 46) {
            r0 = ".";
            pos++;
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (r0 === null) {
            r1 = pos;
            r2 = pos;
            if (/^[a-zA-Z0-9_$\-]/.test(input.charAt(pos))) {
              r4 = input.charAt(pos);
              pos++;
            } else {
              r4 = null;
              if (reportFailures === 0) {
                matchFailed("[a-zA-Z0-9_$\\-]");
              }
            }
            if (r4 !== null) {
              r3 = [];
              while (r4 !== null) {
                r3.push(r4);
                if (/^[a-zA-Z0-9_$\-]/.test(input.charAt(pos))) {
                  r4 = input.charAt(pos);
                  pos++;
                } else {
                  r4 = null;
                  if (reportFailures === 0) {
                    matchFailed("[a-zA-Z0-9_$\\-]");
                  }
                }
              }
            } else {
              r3 = null;
            }
            if (r3 !== null) {
              r5 = pos;
              reportFailures++;
              if (input.charCodeAt(pos) === 61) {
                r4 = "=";
                pos++;
              } else {
                r4 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              reportFailures--;
              if (r4 === null) {
                r4 = "";
              } else {
                r4 = null;
                pos = r5;
              }
              if (r4 !== null) {
                r0 = [r3, r4];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
            if (r0 !== null) {
              reportedPos = r1;
              r0 = (function(s) { return s.join(''); })(r3);
            }
            if (r0 === null) {
              pos = r1;
            }
          }
        }
        return r0;
      }
      
      function parse_hashSegment() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8;
        
        r1 = pos;
        r2 = pos;
        r3 = parse__();
        if (r3 !== null) {
          r5 = pos;
          r6 = parse_ident();
          if (r6 !== null) {
            if (input.charCodeAt(pos) === 61) {
              r7 = "=";
              pos++;
            } else {
              r7 = null;
              if (reportFailures === 0) {
                matchFailed("\"=\"");
              }
            }
            if (r7 !== null) {
              r8 = parse_pathIdNode();
              if (r8 !== null) {
                r4 = [r6, r7, r8];
              } else {
                r4 = null;
                pos = r5;
              }
            } else {
              r4 = null;
              pos = r5;
            }
          } else {
            r4 = null;
            pos = r5;
          }
          if (r4 === null) {
            r5 = pos;
            r6 = parse_ident();
            if (r6 !== null) {
              if (input.charCodeAt(pos) === 61) {
                r7 = "=";
                pos++;
              } else {
                r7 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              if (r7 !== null) {
                r8 = parse_stringNode();
                if (r8 !== null) {
                  r4 = [r6, r7, r8];
                } else {
                  r4 = null;
                  pos = r5;
                }
              } else {
                r4 = null;
                pos = r5;
              }
            } else {
              r4 = null;
              pos = r5;
            }
            if (r4 === null) {
              r5 = pos;
              r6 = parse_ident();
              if (r6 !== null) {
                if (input.charCodeAt(pos) === 61) {
                  r7 = "=";
                  pos++;
                } else {
                  r7 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"=\"");
                  }
                }
                if (r7 !== null) {
                  r8 = parse_integerNode();
                  if (r8 !== null) {
                    r4 = [r6, r7, r8];
                  } else {
                    r4 = null;
                    pos = r5;
                  }
                } else {
                  r4 = null;
                  pos = r5;
                }
              } else {
                r4 = null;
                pos = r5;
              }
              if (r4 === null) {
                r5 = pos;
                r6 = parse_ident();
                if (r6 !== null) {
                  if (input.charCodeAt(pos) === 61) {
                    r7 = "=";
                    pos++;
                  } else {
                    r7 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"=\"");
                    }
                  }
                  if (r7 !== null) {
                    r8 = parse_booleanNode();
                    if (r8 !== null) {
                      r4 = [r6, r7, r8];
                    } else {
                      r4 = null;
                      pos = r5;
                    }
                  } else {
                    r4 = null;
                    pos = r5;
                  }
                } else {
                  r4 = null;
                  pos = r5;
                }
              }
            }
          }
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(h) { return [h[0], h[2]]; })(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_param() {
        var r0;
        
        r0 = parse_pathIdNode();
        if (r0 === null) {
          r0 = parse_stringNode();
          if (r0 === null) {
            r0 = parse_integerNode();
            if (r0 === null) {
              r0 = parse_booleanNode();
            }
          }
        }
        return r0;
      }
      
      function parse_path() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_pathIdent();
        if (r3 !== null) {
          r4 = [];
          r6 = pos;
          r7 = pos;
          r8 = parse_seperator();
          if (r8 !== null) {
            r9 = parse_pathIdent();
            if (r9 !== null) {
              r5 = [r8, r9];
            } else {
              r5 = null;
              pos = r7;
            }
          } else {
            r5 = null;
            pos = r7;
          }
          if (r5 !== null) {
            reportedPos = r6;
            r5 = (function(p) { return p; })(r9);
          }
          if (r5 === null) {
            pos = r6;
          }
          while (r5 !== null) {
            r4.push(r5);
            r6 = pos;
            r7 = pos;
            r8 = parse_seperator();
            if (r8 !== null) {
              r9 = parse_pathIdent();
              if (r9 !== null) {
                r5 = [r8, r9];
              } else {
                r5 = null;
                pos = r7;
              }
            } else {
              r5 = null;
              pos = r7;
            }
            if (r5 !== null) {
              reportedPos = r6;
              r5 = (function(p) { return p; })(r9);
            }
            if (r5 === null) {
              pos = r6;
            }
          }
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(first, tail) {
          var ret = [first];
          for(var i = 0; i < tail.length; ++i) {
            //ret = ret.concat(tail[i]);
            ret.push(tail[i]);
          }
          return ret;
        })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_seperator() {
        var r0;
        
        if (/^[\/.]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\/.]");
          }
        }
        return r0;
      }
      
      function parse_pathIdNode() {
        var r0, r1;
        
        r1 = pos;
        r0 = parse_path();
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(v) { return new Handlebars.AST.IdNode(v); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_stringNode() {
        var r0, r1;
        
        r1 = pos;
        r0 = parse_string();
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(v) { return new Handlebars.AST.StringNode(v); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_integerNode() {
        var r0, r1;
        
        r1 = pos;
        r0 = parse_integer();
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(v) { return new Handlebars.AST.IntegerNode(v); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_booleanNode() {
        var r0, r1;
        
        r1 = pos;
        r0 = parse_boolean();
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(v) { return new Handlebars.AST.BooleanNode(v); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_boolean() {
        var r0;
        
        if (input.substr(pos, 4) === "true") {
          r0 = "true";
          pos += 4;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"true\"");
          }
        }
        if (r0 === null) {
          if (input.substr(pos, 5) === "false") {
            r0 = "false";
            pos += 5;
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("\"false\"");
            }
          }
        }
        return r0;
      }
      
      function parse_integer() {
        var r0, r1, r2;
        
        r1 = pos;
        if (/^[0-9]/.test(input.charAt(pos))) {
          r2 = input.charAt(pos);
          pos++;
        } else {
          r2 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9]");
          }
        }
        if (r2 !== null) {
          r0 = [];
          while (r2 !== null) {
            r0.push(r2);
            if (/^[0-9]/.test(input.charAt(pos))) {
              r2 = input.charAt(pos);
              pos++;
            } else {
              r2 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9]");
              }
            }
          }
        } else {
          r0 = null;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(s) { return parseInt(s.join('')); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_string() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 34) {
          r3 = "\"";
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\"\"");
          }
        }
        if (r3 !== null) {
          r4 = parse_hashDoubleQuoteStringValue();
          if (r4 !== null) {
            if (input.charCodeAt(pos) === 34) {
              r5 = "\"";
              pos++;
            } else {
              r5 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\"\"");
              }
            }
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 === null) {
          r2 = pos;
          if (input.charCodeAt(pos) === 39) {
            r3 = "'";
            pos++;
          } else {
            r3 = null;
            if (reportFailures === 0) {
              matchFailed("\"'\"");
            }
          }
          if (r3 !== null) {
            r4 = parse_hashSingleQuoteStringValue();
            if (r4 !== null) {
              if (input.charCodeAt(pos) === 39) {
                r5 = "'";
                pos++;
              } else {
                r5 = null;
                if (reportFailures === 0) {
                  matchFailed("\"'\"");
                }
              }
              if (r5 !== null) {
                r0 = [r3, r4, r5];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(p) { return p[1]; })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_hashDoubleQuoteStringValue() {
        var r0, r1, r2;
        
        r1 = pos;
        r0 = [];
        if (/^[^"}]/.test(input.charAt(pos))) {
          r2 = input.charAt(pos);
          pos++;
        } else {
          r2 = null;
          if (reportFailures === 0) {
            matchFailed("[^\"}]");
          }
        }
        while (r2 !== null) {
          r0.push(r2);
          if (/^[^"}]/.test(input.charAt(pos))) {
            r2 = input.charAt(pos);
            pos++;
          } else {
            r2 = null;
            if (reportFailures === 0) {
              matchFailed("[^\"}]");
            }
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(s) { return s.join(''); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_hashSingleQuoteStringValue() {
        var r0, r1, r2;
        
        r1 = pos;
        r0 = [];
        if (/^[^'}]/.test(input.charAt(pos))) {
          r2 = input.charAt(pos);
          pos++;
        } else {
          r2 = null;
          if (reportFailures === 0) {
            matchFailed("[^'}]");
          }
        }
        while (r2 !== null) {
          r0.push(r2);
          if (/^[^'}]/.test(input.charAt(pos))) {
            r2 = input.charAt(pos);
            pos++;
          } else {
            r2 = null;
            if (reportFailures === 0) {
              matchFailed("[^'}]");
            }
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(s) { return s.join(''); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_alpha() {
        var r0;
        
        if (/^[A-Za-z]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[A-Za-z]");
          }
        }
        return r0;
      }
      
      function parse_htmlInlineContent() {
        var r0, r1;
        
        r1 = pos;
        r0 = parse_explicitMustache();
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(m) { return [m]; })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        if (r0 === null) {
          r0 = parse_textNodes();
        }
        return r0;
      }
      
      function parse_textLine() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 124) {
          r3 = "|";
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\"|\"");
          }
        }
        if (r3 !== null) {
          if (input.charCodeAt(pos) === 32) {
            r4 = " ";
            pos++;
          } else {
            r4 = null;
            if (reportFailures === 0) {
              matchFailed("\" \"");
            }
          }
          r4 = r4 !== null ? r4 : "";
          if (r4 !== null) {
            r5 = parse_textNodes();
            if (r5 !== null) {
              r6 = [];
              r8 = pos;
              r9 = pos;
              r10 = parse_INDENT();
              if (r10 !== null) {
                r11 = parse_textNodes();
                if (r11 !== null) {
                  r12 = parse_DEDENT();
                  if (r12 !== null) {
                    r7 = [r10, r11, r12];
                  } else {
                    r7 = null;
                    pos = r9;
                  }
                } else {
                  r7 = null;
                  pos = r9;
                }
              } else {
                r7 = null;
                pos = r9;
              }
              if (r7 !== null) {
                reportedPos = r8;
                r7 = (function(t) { return t; })(r11);
              }
              if (r7 === null) {
                pos = r8;
              }
              while (r7 !== null) {
                r6.push(r7);
                r8 = pos;
                r9 = pos;
                r10 = parse_INDENT();
                if (r10 !== null) {
                  r11 = parse_textNodes();
                  if (r11 !== null) {
                    r12 = parse_DEDENT();
                    if (r12 !== null) {
                      r7 = [r10, r11, r12];
                    } else {
                      r7 = null;
                      pos = r9;
                    }
                  } else {
                    r7 = null;
                    pos = r9;
                  }
                } else {
                  r7 = null;
                  pos = r9;
                }
                if (r7 !== null) {
                  reportedPos = r8;
                  r7 = (function(t) { return t; })(r11);
                }
                if (r7 === null) {
                  pos = r8;
                }
              }
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(nodes, indentedNodes) { 
          for(var i = 0; i < indentedNodes.length; ++i) {
            nodes = nodes.concat(indentedNodes[i]);
          }
          return nodes; 
        })(r5, r6);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_textNodes() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_preMustacheText();
        r3 = r3 !== null ? r3 : "";
        if (r3 !== null) {
          r4 = [];
          r6 = pos;
          r7 = parse_rawMustache();
          if (r7 !== null) {
            r8 = parse_preMustacheText();
            r8 = r8 !== null ? r8 : "";
            if (r8 !== null) {
              r5 = [r7, r8];
            } else {
              r5 = null;
              pos = r6;
            }
          } else {
            r5 = null;
            pos = r6;
          }
          while (r5 !== null) {
            r4.push(r5);
            r6 = pos;
            r7 = parse_rawMustache();
            if (r7 !== null) {
              r8 = parse_preMustacheText();
              r8 = r8 !== null ? r8 : "";
              if (r8 !== null) {
                r5 = [r7, r8];
              } else {
                r5 = null;
                pos = r6;
              }
            } else {
              r5 = null;
              pos = r6;
            }
          }
          if (r4 !== null) {
            r5 = parse_TERM();
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(first, tail) {
          var ret = [];
          if(first) { ret.push(first); } 
          for(var i = 0; i < tail.length; ++i) {
            var t = tail[i];
            ret.push(t[0]);
            if(t[1]) { ret.push(t[1]); }
          }
          return ret;
        })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_rawMustache() {
        var r0;
        
        r0 = parse_rawMustacheUnescaped();
        if (r0 === null) {
          r0 = parse_rawMustacheEscaped();
        }
        return r0;
      }
      
      function parse_rawMustacheSingle() {
        var r0, r1, r2, r3, r4, r5, r6, r7;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_singleOpen();
        if (r3 !== null) {
          r4 = parse__();
          if (r4 !== null) {
            r5 = parse_inMustache();
            if (r5 !== null) {
              r6 = parse__();
              if (r6 !== null) {
                r7 = parse_singleClose();
                if (r7 !== null) {
                  r0 = [r3, r4, r5, r6, r7];
                } else {
                  r0 = null;
                  pos = r2;
                }
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(m) { m.escaped = true; return m; })(r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_rawMustacheEscaped() {
        var r0, r1, r2, r3, r4, r5, r6, r7;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_doubleOpen();
        if (r3 !== null) {
          r4 = parse__();
          if (r4 !== null) {
            r5 = parse_inMustache();
            if (r5 !== null) {
              r6 = parse__();
              if (r6 !== null) {
                r7 = parse_doubleClose();
                if (r7 !== null) {
                  r0 = [r3, r4, r5, r6, r7];
                } else {
                  r0 = null;
                  pos = r2;
                }
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(m) { m.escaped = true; return m; })(r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_rawMustacheUnescaped() {
        var r0, r1, r2, r3, r4, r5, r6, r7;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_tripleOpen();
        if (r3 !== null) {
          r4 = parse__();
          if (r4 !== null) {
            r5 = parse_inMustache();
            if (r5 !== null) {
              r6 = parse__();
              if (r6 !== null) {
                r7 = parse_tripleClose();
                if (r7 !== null) {
                  r0 = [r3, r4, r5, r6, r7];
                } else {
                  r0 = null;
                  pos = r2;
                }
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(m) { m.escaped = false; return m; })(r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_preMustacheText() {
        var r0, r1, r2;
        
        r1 = pos;
        if (/^[^{\uEFFF]/.test(input.charAt(pos))) {
          r2 = input.charAt(pos);
          pos++;
        } else {
          r2 = null;
          if (reportFailures === 0) {
            matchFailed("[^{\\uEFFF]");
          }
        }
        if (r2 !== null) {
          r0 = [];
          while (r2 !== null) {
            r0.push(r2);
            if (/^[^{\uEFFF]/.test(input.charAt(pos))) {
              r2 = input.charAt(pos);
              pos++;
            } else {
              r2 = null;
              if (reportFailures === 0) {
                matchFailed("[^{\\uEFFF]");
              }
            }
          }
        } else {
          r0 = null;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(a) { return new Handlebars.AST.ContentNode(a.join('')); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_inTagMustache() {
        var r0;
        
        r0 = parse_rawMustacheSingle();
        if (r0 === null) {
          r0 = parse_rawMustacheUnescaped();
          if (r0 === null) {
            r0 = parse_rawMustacheEscaped();
          }
        }
        return r0;
      }
      
      function parse_singleOpen() {
        var r0;
        
        if (input.charCodeAt(pos) === 123) {
          r0 = "{";
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{\"");
          }
        }
        return r0;
      }
      
      function parse_doubleOpen() {
        var r0;
        
        if (input.substr(pos, 2) === "{{") {
          r0 = "{{";
          pos += 2;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{{\"");
          }
        }
        return r0;
      }
      
      function parse_tripleOpen() {
        var r0;
        
        if (input.substr(pos, 3) === "{{{") {
          r0 = "{{{";
          pos += 3;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{{{\"");
          }
        }
        return r0;
      }
      
      function parse_singleClose() {
        var r0;
        
        if (input.charCodeAt(pos) === 125) {
          r0 = "}";
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"}\"");
          }
        }
        return r0;
      }
      
      function parse_doubleClose() {
        var r0;
        
        if (input.substr(pos, 2) === "}}") {
          r0 = "}}";
          pos += 2;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"}}\"");
          }
        }
        return r0;
      }
      
      function parse_tripleClose() {
        var r0;
        
        if (input.substr(pos, 3) === "}}}") {
          r0 = "}}}";
          pos += 3;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"}}}\"");
          }
        }
        return r0;
      }
      
      function parse_equalSign() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        if (input.substr(pos, 2) === "==") {
          r3 = "==";
          pos += 2;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\"==\"");
          }
        }
        if (r3 !== null) {
          if (input.charCodeAt(pos) === 32) {
            r4 = " ";
            pos++;
          } else {
            r4 = null;
            if (reportFailures === 0) {
              matchFailed("\" \"");
            }
          }
          r4 = r4 !== null ? r4 : "";
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function() { return false; })();
        }
        if (r0 === null) {
          pos = r1;
        }
        if (r0 === null) {
          r1 = pos;
          r2 = pos;
          if (input.charCodeAt(pos) === 61) {
            r3 = "=";
            pos++;
          } else {
            r3 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (r3 !== null) {
            if (input.charCodeAt(pos) === 32) {
              r4 = " ";
              pos++;
            } else {
              r4 = null;
              if (reportFailures === 0) {
                matchFailed("\" \"");
              }
            }
            r4 = r4 !== null ? r4 : "";
            if (r4 !== null) {
              r0 = [r3, r4];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
          if (r0 !== null) {
            reportedPos = r1;
            r0 = (function() { return true; })();
          }
          if (r0 === null) {
            pos = r1;
          }
        }
        return r0;
      }
      
      function parse_htmlTagAndOptionalAttributes() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8;
        
        r1 = pos;
        r2 = pos;
        r3 = pos;
        r4 = parse_htmlTagName();
        if (r4 !== null) {
          r5 = parse_shorthandAttributes();
          r5 = r5 !== null ? r5 : "";
          if (r5 !== null) {
            r6 = [];
            r7 = parse_inTagMustache();
            while (r7 !== null) {
              r6.push(r7);
              r7 = parse_inTagMustache();
            }
            if (r6 !== null) {
              r7 = [];
              r8 = parse_fullAttribute();
              while (r8 !== null) {
                r7.push(r8);
                r8 = parse_fullAttribute();
              }
              if (r7 !== null) {
                r0 = [r4, r5, r6, r7];
              } else {
                r0 = null;
                pos = r3;
              }
            } else {
              r0 = null;
              pos = r3;
            }
          } else {
            r0 = null;
            pos = r3;
          }
        } else {
          r0 = null;
          pos = r3;
        }
        if (r0 !== null) {
          reportedPos = r2;
          r0 = (function(h, s, m, f) { return [h, s, m, f]; })(r4, r5, r6, r7);
        }
        if (r0 === null) {
          pos = r2;
        }
        if (r0 === null) {
          r2 = pos;
          r3 = pos;
          r4 = parse_shorthandAttributes();
          if (r4 !== null) {
            r5 = [];
            r6 = parse_inTagMustache();
            while (r6 !== null) {
              r5.push(r6);
              r6 = parse_inTagMustache();
            }
            if (r5 !== null) {
              r6 = [];
              r7 = parse_fullAttribute();
              while (r7 !== null) {
                r6.push(r7);
                r7 = parse_fullAttribute();
              }
              if (r6 !== null) {
                r0 = [r4, r5, r6];
              } else {
                r0 = null;
                pos = r3;
              }
            } else {
              r0 = null;
              pos = r3;
            }
          } else {
            r0 = null;
            pos = r3;
          }
          if (r0 !== null) {
            reportedPos = r2;
            r0 = (function(s, m, f) { return [null, s, m, f] })(r4, r5, r6);
          }
          if (r0 === null) {
            pos = r2;
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(h) {
          var tagName = h[0] || 'div',
              shorthandAttributes = h[1] || [],
              inTagMustaches = h[2],
              fullAttributes = h[3],
              id = shorthandAttributes[0],
              classes = shorthandAttributes[1];
        
          var tagOpenContent = [];
          tagOpenContent.push(new Handlebars.AST.ContentNode('<' + tagName));
        
          if(id) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' id="' + id + '"'));
          }
        
          if(classes && classes.length) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' class="' + classes.join(' ') + '"'));
          }
        
          // Pad in tag mustaches with spaces.
          for(var i = 0; i < inTagMustaches.length; ++i) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' '));
            tagOpenContent.push(inTagMustaches[i]);
          }
        
          for(var i = 0; i < fullAttributes.length; ++i) {
            tagOpenContent = tagOpenContent.concat(fullAttributes[i]);
          }
          tagOpenContent.push(new Handlebars.AST.ContentNode('>'));
        
          return [tagOpenContent, new Handlebars.AST.ContentNode('</' + tagName + '>')];
        })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_shorthandAttributes() {
        var r0;
        
        r0 = parse_attributesAtLeastID();
        if (r0 === null) {
          r0 = parse_attributesAtLeastClass();
        }
        return r0;
      }
      
      function parse_attributesAtLeastID() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_idShorthand();
        if (r3 !== null) {
          r4 = [];
          r5 = parse_classShorthand();
          while (r5 !== null) {
            r4.push(r5);
            r5 = parse_classShorthand();
          }
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(id, classes) { return [id, classes]; })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_attributesAtLeastClass() {
        var r0, r1, r2;
        
        r1 = pos;
        r2 = parse_classShorthand();
        if (r2 !== null) {
          r0 = [];
          while (r2 !== null) {
            r0.push(r2);
            r2 = parse_classShorthand();
          }
        } else {
          r0 = null;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(classes) { return [null, classes]; })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_fullAttribute() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 32) {
          r4 = " ";
          pos++;
        } else {
          r4 = null;
          if (reportFailures === 0) {
            matchFailed("\" \"");
          }
        }
        if (r4 !== null) {
          r3 = [];
          while (r4 !== null) {
            r3.push(r4);
            if (input.charCodeAt(pos) === 32) {
              r4 = " ";
              pos++;
            } else {
              r4 = null;
              if (reportFailures === 0) {
                matchFailed("\" \"");
              }
            }
          }
        } else {
          r3 = null;
        }
        if (r3 !== null) {
          r4 = parse_actionAttribute();
          if (r4 === null) {
            r4 = parse_boundAttribute();
            if (r4 === null) {
              r4 = parse_normalAttribute();
            }
          }
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(a) {
          return [new Handlebars.AST.ContentNode(' '), a]; 
        })(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_boundAttributeValueText() {
        var r0, r1, r2;
        
        r1 = pos;
        if (/^[A-Za-z.:0-9]/.test(input.charAt(pos))) {
          r2 = input.charAt(pos);
          pos++;
        } else {
          r2 = null;
          if (reportFailures === 0) {
            matchFailed("[A-Za-z.:0-9]");
          }
        }
        if (r2 !== null) {
          r0 = [];
          while (r2 !== null) {
            r0.push(r2);
            if (/^[A-Za-z.:0-9]/.test(input.charAt(pos))) {
              r2 = input.charAt(pos);
              pos++;
            } else {
              r2 = null;
              if (reportFailures === 0) {
                matchFailed("[A-Za-z.:0-9]");
              }
            }
          }
        } else {
          r0 = null;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(s) { return s.join(''); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_actionValue() {
        var r0, r1;
        
        r0 = parse_quotedActionValue();
        if (r0 === null) {
          r1 = pos;
          r0 = parse_pathIdNode();
          if (r0 !== null) {
            reportedPos = r1;
            r0 = (function(id) { return new Handlebars.AST.MustacheNode([id]); })(r0);
          }
          if (r0 === null) {
            pos = r1;
          }
        }
        return r0;
      }
      
      function parse_quotedActionValue() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 34) {
          r3 = "\"";
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\"\"");
          }
        }
        if (r3 !== null) {
          r4 = parse_inMustache();
          if (r4 !== null) {
            if (input.charCodeAt(pos) === 34) {
              r5 = "\"";
              pos++;
            } else {
              r5 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\"\"");
              }
            }
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 === null) {
          r2 = pos;
          if (input.charCodeAt(pos) === 39) {
            r3 = "'";
            pos++;
          } else {
            r3 = null;
            if (reportFailures === 0) {
              matchFailed("\"'\"");
            }
          }
          if (r3 !== null) {
            r4 = parse_inMustache();
            if (r4 !== null) {
              if (input.charCodeAt(pos) === 39) {
                r5 = "'";
                pos++;
              } else {
                r5 = null;
                if (reportFailures === 0) {
                  matchFailed("\"'\"");
                }
              }
              if (r5 !== null) {
                r0 = [r3, r4, r5];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(p) { return p[1]; })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_actionAttribute() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_knownEvent();
        if (r3 !== null) {
          if (input.charCodeAt(pos) === 61) {
            r4 = "=";
            pos++;
          } else {
            r4 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (r4 !== null) {
            r5 = parse_actionValue();
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(event, mustacheNode) {
          // Unshift the action helper and augment the hash
          return unshiftParam(mustacheNode, 'action', [['on', new Handlebars.AST.StringNode(event)]]);
        })(r3, r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_boundAttribute() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_ident();
        if (r3 !== null) {
          if (input.charCodeAt(pos) === 61) {
            r4 = "=";
            pos++;
          } else {
            r4 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (r4 !== null) {
            r5 = parse_boundAttributeValueText();
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(key, value) { 
          var hashNode = new Handlebars.AST.HashNode([[key, new Handlebars.AST.StringNode(value)]]);
          var params = [new Handlebars.AST.IdNode(['bindAttr'])];
        
          return new Handlebars.AST.MustacheNode(params, hashNode);
        })(r3, r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_normalAttribute() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_ident();
        if (r3 !== null) {
          if (input.charCodeAt(pos) === 61) {
            r4 = "=";
            pos++;
          } else {
            r4 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (r4 !== null) {
            r5 = parse_string();
            if (r5 !== null) {
              r0 = [r3, r4, r5];
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(key, value) { 
          var s = key + '=' + '"' + value + '"';
          return new Handlebars.AST.ContentNode(s);
        })(r3, r5);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_attributeName() {
        var r0, r1, r2;
        
        r1 = pos;
        r0 = [];
        r2 = parse_attributeChar();
        while (r2 !== null) {
          r0.push(r2);
          r2 = parse_attributeChar();
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(a) { return a.join(''); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_attributeValue() {
        var r0;
        
        r0 = parse_string();
        if (r0 === null) {
          r0 = parse_param();
        }
        return r0;
      }
      
      function parse_attributeChar() {
        var r0;
        
        r0 = parse_alpha();
        if (r0 === null) {
          if (/^[0-9]/.test(input.charAt(pos))) {
            r0 = input.charAt(pos);
            pos++;
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("[0-9]");
            }
          }
          if (r0 === null) {
            if (input.charCodeAt(pos) === 95) {
              r0 = "_";
              pos++;
            } else {
              r0 = null;
              if (reportFailures === 0) {
                matchFailed("\"_\"");
              }
            }
            if (r0 === null) {
              if (input.charCodeAt(pos) === 45) {
                r0 = "-";
                pos++;
              } else {
                r0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
            }
          }
        }
        return r0;
      }
      
      function parse_idShorthand() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 35) {
          r3 = "#";
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\"#\"");
          }
        }
        if (r3 !== null) {
          r4 = parse_ident();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(t) { return t;})(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_classShorthand() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        if (input.charCodeAt(pos) === 46) {
          r3 = ".";
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("\".\"");
          }
        }
        if (r3 !== null) {
          r4 = parse_ident();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(c) { return c; })(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_ident() {
        var r0, r1, r2, r3, r4, r5;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_nmstart();
        if (r3 !== null) {
          r4 = [];
          r5 = parse_nmchar();
          while (r5 !== null) {
            r4.push(r5);
            r5 = parse_nmchar();
          }
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(nmstart, nmchars) { return nmstart + nmchars.join(""); })(r3, r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_nmchar() {
        var r0;
        
        if (/^[_a-zA-Z0-9\-]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[_a-zA-Z0-9\\-]");
          }
        }
        if (r0 === null) {
          r0 = parse_nonascii();
        }
        return r0;
      }
      
      function parse_nmstart() {
        var r0;
        
        if (/^[_a-zA-Z]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[_a-zA-Z]");
          }
        }
        if (r0 === null) {
          r0 = parse_nonascii();
        }
        return r0;
      }
      
      function parse_nonascii() {
        var r0;
        
        if (/^[\x80-\xFF]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\x80-\\xFF]");
          }
        }
        return r0;
      }
      
      function parse_htmlTagName() {
        var r0;
        
        reportFailures++;
        if (input.substr(pos, 10) === "figcaption") {
          r0 = "figcaption";
          pos += 10;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"figcaption\"");
          }
        }
        if (r0 === null) {
          if (input.substr(pos, 10) === "blockquote") {
            r0 = "blockquote";
            pos += 10;
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("\"blockquote\"");
            }
          }
          if (r0 === null) {
            if (input.substr(pos, 9) === "plaintext") {
              r0 = "plaintext";
              pos += 9;
            } else {
              r0 = null;
              if (reportFailures === 0) {
                matchFailed("\"plaintext\"");
              }
            }
            if (r0 === null) {
              if (input.substr(pos, 8) === "textarea") {
                r0 = "textarea";
                pos += 8;
              } else {
                r0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"textarea\"");
                }
              }
              if (r0 === null) {
                if (input.substr(pos, 8) === "progress") {
                  r0 = "progress";
                  pos += 8;
                } else {
                  r0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"progress\"");
                  }
                }
                if (r0 === null) {
                  if (input.substr(pos, 8) === "optgroup") {
                    r0 = "optgroup";
                    pos += 8;
                  } else {
                    r0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"optgroup\"");
                    }
                  }
                  if (r0 === null) {
                    if (input.substr(pos, 8) === "noscript") {
                      r0 = "noscript";
                      pos += 8;
                    } else {
                      r0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"noscript\"");
                      }
                    }
                    if (r0 === null) {
                      if (input.substr(pos, 8) === "noframes") {
                        r0 = "noframes";
                        pos += 8;
                      } else {
                        r0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"noframes\"");
                        }
                      }
                      if (r0 === null) {
                        if (input.substr(pos, 8) === "frameset") {
                          r0 = "frameset";
                          pos += 8;
                        } else {
                          r0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"frameset\"");
                          }
                        }
                        if (r0 === null) {
                          if (input.substr(pos, 8) === "fieldset") {
                            r0 = "fieldset";
                            pos += 8;
                          } else {
                            r0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"fieldset\"");
                            }
                          }
                          if (r0 === null) {
                            if (input.substr(pos, 8) === "datalist") {
                              r0 = "datalist";
                              pos += 8;
                            } else {
                              r0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"datalist\"");
                              }
                            }
                            if (r0 === null) {
                              if (input.substr(pos, 8) === "colgroup") {
                                r0 = "colgroup";
                                pos += 8;
                              } else {
                                r0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"colgroup\"");
                                }
                              }
                              if (r0 === null) {
                                if (input.substr(pos, 8) === "basefont") {
                                  r0 = "basefont";
                                  pos += 8;
                                } else {
                                  r0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"basefont\"");
                                  }
                                }
                                if (r0 === null) {
                                  if (input.substr(pos, 7) === "summary") {
                                    r0 = "summary";
                                    pos += 7;
                                  } else {
                                    r0 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"summary\"");
                                    }
                                  }
                                  if (r0 === null) {
                                    if (input.substr(pos, 7) === "section") {
                                      r0 = "section";
                                      pos += 7;
                                    } else {
                                      r0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\"section\"");
                                      }
                                    }
                                    if (r0 === null) {
                                      if (input.substr(pos, 7) === "marquee") {
                                        r0 = "marquee";
                                        pos += 7;
                                      } else {
                                        r0 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"marquee\"");
                                        }
                                      }
                                      if (r0 === null) {
                                        if (input.substr(pos, 7) === "listing") {
                                          r0 = "listing";
                                          pos += 7;
                                        } else {
                                          r0 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"listing\"");
                                          }
                                        }
                                        if (r0 === null) {
                                          if (input.substr(pos, 7) === "isindex") {
                                            r0 = "isindex";
                                            pos += 7;
                                          } else {
                                            r0 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\"isindex\"");
                                            }
                                          }
                                          if (r0 === null) {
                                            if (input.substr(pos, 7) === "details") {
                                              r0 = "details";
                                              pos += 7;
                                            } else {
                                              r0 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"details\"");
                                              }
                                            }
                                            if (r0 === null) {
                                              if (input.substr(pos, 7) === "command") {
                                                r0 = "command";
                                                pos += 7;
                                              } else {
                                                r0 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\"command\"");
                                                }
                                              }
                                              if (r0 === null) {
                                                if (input.substr(pos, 7) === "caption") {
                                                  r0 = "caption";
                                                  pos += 7;
                                                } else {
                                                  r0 = null;
                                                  if (reportFailures === 0) {
                                                    matchFailed("\"caption\"");
                                                  }
                                                }
                                                if (r0 === null) {
                                                  if (input.substr(pos, 7) === "bgsound") {
                                                    r0 = "bgsound";
                                                    pos += 7;
                                                  } else {
                                                    r0 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"bgsound\"");
                                                    }
                                                  }
                                                  if (r0 === null) {
                                                    if (input.substr(pos, 7) === "article") {
                                                      r0 = "article";
                                                      pos += 7;
                                                    } else {
                                                      r0 = null;
                                                      if (reportFailures === 0) {
                                                        matchFailed("\"article\"");
                                                      }
                                                    }
                                                    if (r0 === null) {
                                                      if (input.substr(pos, 7) === "address") {
                                                        r0 = "address";
                                                        pos += 7;
                                                      } else {
                                                        r0 = null;
                                                        if (reportFailures === 0) {
                                                          matchFailed("\"address\"");
                                                        }
                                                      }
                                                      if (r0 === null) {
                                                        if (input.substr(pos, 7) === "acronym") {
                                                          r0 = "acronym";
                                                          pos += 7;
                                                        } else {
                                                          r0 = null;
                                                          if (reportFailures === 0) {
                                                            matchFailed("\"acronym\"");
                                                          }
                                                        }
                                                        if (r0 === null) {
                                                          if (input.substr(pos, 6) === "strong") {
                                                            r0 = "strong";
                                                            pos += 6;
                                                          } else {
                                                            r0 = null;
                                                            if (reportFailures === 0) {
                                                              matchFailed("\"strong\"");
                                                            }
                                                          }
                                                          if (r0 === null) {
                                                            if (input.substr(pos, 6) === "strike") {
                                                              r0 = "strike";
                                                              pos += 6;
                                                            } else {
                                                              r0 = null;
                                                              if (reportFailures === 0) {
                                                                matchFailed("\"strike\"");
                                                              }
                                                            }
                                                            if (r0 === null) {
                                                              if (input.substr(pos, 6) === "spacer") {
                                                                r0 = "spacer";
                                                                pos += 6;
                                                              } else {
                                                                r0 = null;
                                                                if (reportFailures === 0) {
                                                                  matchFailed("\"spacer\"");
                                                                }
                                                              }
                                                              if (r0 === null) {
                                                                if (input.substr(pos, 6) === "source") {
                                                                  r0 = "source";
                                                                  pos += 6;
                                                                } else {
                                                                  r0 = null;
                                                                  if (reportFailures === 0) {
                                                                    matchFailed("\"source\"");
                                                                  }
                                                                }
                                                                if (r0 === null) {
                                                                  if (input.substr(pos, 6) === "select") {
                                                                    r0 = "select";
                                                                    pos += 6;
                                                                  } else {
                                                                    r0 = null;
                                                                    if (reportFailures === 0) {
                                                                      matchFailed("\"select\"");
                                                                    }
                                                                  }
                                                                  if (r0 === null) {
                                                                    if (input.substr(pos, 6) === "script") {
                                                                      r0 = "script";
                                                                      pos += 6;
                                                                    } else {
                                                                      r0 = null;
                                                                      if (reportFailures === 0) {
                                                                        matchFailed("\"script\"");
                                                                      }
                                                                    }
                                                                    if (r0 === null) {
                                                                      if (input.substr(pos, 6) === "output") {
                                                                        r0 = "output";
                                                                        pos += 6;
                                                                      } else {
                                                                        r0 = null;
                                                                        if (reportFailures === 0) {
                                                                          matchFailed("\"output\"");
                                                                        }
                                                                      }
                                                                      if (r0 === null) {
                                                                        if (input.substr(pos, 6) === "option") {
                                                                          r0 = "option";
                                                                          pos += 6;
                                                                        } else {
                                                                          r0 = null;
                                                                          if (reportFailures === 0) {
                                                                            matchFailed("\"option\"");
                                                                          }
                                                                        }
                                                                        if (r0 === null) {
                                                                          if (input.substr(pos, 6) === "object") {
                                                                            r0 = "object";
                                                                            pos += 6;
                                                                          } else {
                                                                            r0 = null;
                                                                            if (reportFailures === 0) {
                                                                              matchFailed("\"object\"");
                                                                            }
                                                                          }
                                                                          if (r0 === null) {
                                                                            if (input.substr(pos, 6) === "legend") {
                                                                              r0 = "legend";
                                                                              pos += 6;
                                                                            } else {
                                                                              r0 = null;
                                                                              if (reportFailures === 0) {
                                                                                matchFailed("\"legend\"");
                                                                              }
                                                                            }
                                                                            if (r0 === null) {
                                                                              if (input.substr(pos, 6) === "keygen") {
                                                                                r0 = "keygen";
                                                                                pos += 6;
                                                                              } else {
                                                                                r0 = null;
                                                                                if (reportFailures === 0) {
                                                                                  matchFailed("\"keygen\"");
                                                                                }
                                                                              }
                                                                              if (r0 === null) {
                                                                                if (input.substr(pos, 6) === "iframe") {
                                                                                  r0 = "iframe";
                                                                                  pos += 6;
                                                                                } else {
                                                                                  r0 = null;
                                                                                  if (reportFailures === 0) {
                                                                                    matchFailed("\"iframe\"");
                                                                                  }
                                                                                }
                                                                                if (r0 === null) {
                                                                                  if (input.substr(pos, 6) === "hgroup") {
                                                                                    r0 = "hgroup";
                                                                                    pos += 6;
                                                                                  } else {
                                                                                    r0 = null;
                                                                                    if (reportFailures === 0) {
                                                                                      matchFailed("\"hgroup\"");
                                                                                    }
                                                                                  }
                                                                                  if (r0 === null) {
                                                                                    if (input.substr(pos, 6) === "header") {
                                                                                      r0 = "header";
                                                                                      pos += 6;
                                                                                    } else {
                                                                                      r0 = null;
                                                                                      if (reportFailures === 0) {
                                                                                        matchFailed("\"header\"");
                                                                                      }
                                                                                    }
                                                                                    if (r0 === null) {
                                                                                      if (input.substr(pos, 6) === "footer") {
                                                                                        r0 = "footer";
                                                                                        pos += 6;
                                                                                      } else {
                                                                                        r0 = null;
                                                                                        if (reportFailures === 0) {
                                                                                          matchFailed("\"footer\"");
                                                                                        }
                                                                                      }
                                                                                      if (r0 === null) {
                                                                                        if (input.substr(pos, 6) === "figure") {
                                                                                          r0 = "figure";
                                                                                          pos += 6;
                                                                                        } else {
                                                                                          r0 = null;
                                                                                          if (reportFailures === 0) {
                                                                                            matchFailed("\"figure\"");
                                                                                          }
                                                                                        }
                                                                                        if (r0 === null) {
                                                                                          if (input.substr(pos, 6) === "center") {
                                                                                            r0 = "center";
                                                                                            pos += 6;
                                                                                          } else {
                                                                                            r0 = null;
                                                                                            if (reportFailures === 0) {
                                                                                              matchFailed("\"center\"");
                                                                                            }
                                                                                          }
                                                                                          if (r0 === null) {
                                                                                            if (input.substr(pos, 6) === "canvas") {
                                                                                              r0 = "canvas";
                                                                                              pos += 6;
                                                                                            } else {
                                                                                              r0 = null;
                                                                                              if (reportFailures === 0) {
                                                                                                matchFailed("\"canvas\"");
                                                                                              }
                                                                                            }
                                                                                            if (r0 === null) {
                                                                                              if (input.substr(pos, 6) === "button") {
                                                                                                r0 = "button";
                                                                                                pos += 6;
                                                                                              } else {
                                                                                                r0 = null;
                                                                                                if (reportFailures === 0) {
                                                                                                  matchFailed("\"button\"");
                                                                                                }
                                                                                              }
                                                                                              if (r0 === null) {
                                                                                                if (input.substr(pos, 6) === "applet") {
                                                                                                  r0 = "applet";
                                                                                                  pos += 6;
                                                                                                } else {
                                                                                                  r0 = null;
                                                                                                  if (reportFailures === 0) {
                                                                                                    matchFailed("\"applet\"");
                                                                                                  }
                                                                                                }
                                                                                                if (r0 === null) {
                                                                                                  if (input.substr(pos, 5) === "video") {
                                                                                                    r0 = "video";
                                                                                                    pos += 5;
                                                                                                  } else {
                                                                                                    r0 = null;
                                                                                                    if (reportFailures === 0) {
                                                                                                      matchFailed("\"video\"");
                                                                                                    }
                                                                                                  }
                                                                                                  if (r0 === null) {
                                                                                                    if (input.substr(pos, 5) === "track") {
                                                                                                      r0 = "track";
                                                                                                      pos += 5;
                                                                                                    } else {
                                                                                                      r0 = null;
                                                                                                      if (reportFailures === 0) {
                                                                                                        matchFailed("\"track\"");
                                                                                                      }
                                                                                                    }
                                                                                                    if (r0 === null) {
                                                                                                      if (input.substr(pos, 5) === "title") {
                                                                                                        r0 = "title";
                                                                                                        pos += 5;
                                                                                                      } else {
                                                                                                        r0 = null;
                                                                                                        if (reportFailures === 0) {
                                                                                                          matchFailed("\"title\"");
                                                                                                        }
                                                                                                      }
                                                                                                      if (r0 === null) {
                                                                                                        if (input.substr(pos, 5) === "thead") {
                                                                                                          r0 = "thead";
                                                                                                          pos += 5;
                                                                                                        } else {
                                                                                                          r0 = null;
                                                                                                          if (reportFailures === 0) {
                                                                                                            matchFailed("\"thead\"");
                                                                                                          }
                                                                                                        }
                                                                                                        if (r0 === null) {
                                                                                                          if (input.substr(pos, 5) === "tfoot") {
                                                                                                            r0 = "tfoot";
                                                                                                            pos += 5;
                                                                                                          } else {
                                                                                                            r0 = null;
                                                                                                            if (reportFailures === 0) {
                                                                                                              matchFailed("\"tfoot\"");
                                                                                                            }
                                                                                                          }
                                                                                                          if (r0 === null) {
                                                                                                            if (input.substr(pos, 5) === "tbody") {
                                                                                                              r0 = "tbody";
                                                                                                              pos += 5;
                                                                                                            } else {
                                                                                                              r0 = null;
                                                                                                              if (reportFailures === 0) {
                                                                                                                matchFailed("\"tbody\"");
                                                                                                              }
                                                                                                            }
                                                                                                            if (r0 === null) {
                                                                                                              if (input.substr(pos, 5) === "table") {
                                                                                                                r0 = "table";
                                                                                                                pos += 5;
                                                                                                              } else {
                                                                                                                r0 = null;
                                                                                                                if (reportFailures === 0) {
                                                                                                                  matchFailed("\"table\"");
                                                                                                                }
                                                                                                              }
                                                                                                              if (r0 === null) {
                                                                                                                if (input.substr(pos, 5) === "style") {
                                                                                                                  r0 = "style";
                                                                                                                  pos += 5;
                                                                                                                } else {
                                                                                                                  r0 = null;
                                                                                                                  if (reportFailures === 0) {
                                                                                                                    matchFailed("\"style\"");
                                                                                                                  }
                                                                                                                }
                                                                                                                if (r0 === null) {
                                                                                                                  if (input.substr(pos, 5) === "small") {
                                                                                                                    r0 = "small";
                                                                                                                    pos += 5;
                                                                                                                  } else {
                                                                                                                    r0 = null;
                                                                                                                    if (reportFailures === 0) {
                                                                                                                      matchFailed("\"small\"");
                                                                                                                    }
                                                                                                                  }
                                                                                                                  if (r0 === null) {
                                                                                                                    if (input.substr(pos, 5) === "param") {
                                                                                                                      r0 = "param";
                                                                                                                      pos += 5;
                                                                                                                    } else {
                                                                                                                      r0 = null;
                                                                                                                      if (reportFailures === 0) {
                                                                                                                        matchFailed("\"param\"");
                                                                                                                      }
                                                                                                                    }
                                                                                                                    if (r0 === null) {
                                                                                                                      if (input.substr(pos, 5) === "meter") {
                                                                                                                        r0 = "meter";
                                                                                                                        pos += 5;
                                                                                                                      } else {
                                                                                                                        r0 = null;
                                                                                                                        if (reportFailures === 0) {
                                                                                                                          matchFailed("\"meter\"");
                                                                                                                        }
                                                                                                                      }
                                                                                                                      if (r0 === null) {
                                                                                                                        if (input.substr(pos, 5) === "label") {
                                                                                                                          r0 = "label";
                                                                                                                          pos += 5;
                                                                                                                        } else {
                                                                                                                          r0 = null;
                                                                                                                          if (reportFailures === 0) {
                                                                                                                            matchFailed("\"label\"");
                                                                                                                          }
                                                                                                                        }
                                                                                                                        if (r0 === null) {
                                                                                                                          if (input.substr(pos, 5) === "input") {
                                                                                                                            r0 = "input";
                                                                                                                            pos += 5;
                                                                                                                          } else {
                                                                                                                            r0 = null;
                                                                                                                            if (reportFailures === 0) {
                                                                                                                              matchFailed("\"input\"");
                                                                                                                            }
                                                                                                                          }
                                                                                                                          if (r0 === null) {
                                                                                                                            if (input.substr(pos, 5) === "frame") {
                                                                                                                              r0 = "frame";
                                                                                                                              pos += 5;
                                                                                                                            } else {
                                                                                                                              r0 = null;
                                                                                                                              if (reportFailures === 0) {
                                                                                                                                matchFailed("\"frame\"");
                                                                                                                              }
                                                                                                                            }
                                                                                                                            if (r0 === null) {
                                                                                                                              if (input.substr(pos, 5) === "embed") {
                                                                                                                                r0 = "embed";
                                                                                                                                pos += 5;
                                                                                                                              } else {
                                                                                                                                r0 = null;
                                                                                                                                if (reportFailures === 0) {
                                                                                                                                  matchFailed("\"embed\"");
                                                                                                                                }
                                                                                                                              }
                                                                                                                              if (r0 === null) {
                                                                                                                                if (input.substr(pos, 5) === "blink") {
                                                                                                                                  r0 = "blink";
                                                                                                                                  pos += 5;
                                                                                                                                } else {
                                                                                                                                  r0 = null;
                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                    matchFailed("\"blink\"");
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                if (r0 === null) {
                                                                                                                                  if (input.substr(pos, 5) === "audio") {
                                                                                                                                    r0 = "audio";
                                                                                                                                    pos += 5;
                                                                                                                                  } else {
                                                                                                                                    r0 = null;
                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                      matchFailed("\"audio\"");
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                  if (r0 === null) {
                                                                                                                                    if (input.substr(pos, 5) === "aside") {
                                                                                                                                      r0 = "aside";
                                                                                                                                      pos += 5;
                                                                                                                                    } else {
                                                                                                                                      r0 = null;
                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                        matchFailed("\"aside\"");
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                    if (r0 === null) {
                                                                                                                                      if (input.substr(pos, 4) === "time") {
                                                                                                                                        r0 = "time";
                                                                                                                                        pos += 4;
                                                                                                                                      } else {
                                                                                                                                        r0 = null;
                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                          matchFailed("\"time\"");
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                      if (r0 === null) {
                                                                                                                                        if (input.substr(pos, 4) === "span") {
                                                                                                                                          r0 = "span";
                                                                                                                                          pos += 4;
                                                                                                                                        } else {
                                                                                                                                          r0 = null;
                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                            matchFailed("\"span\"");
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                        if (r0 === null) {
                                                                                                                                          if (input.substr(pos, 4) === "samp") {
                                                                                                                                            r0 = "samp";
                                                                                                                                            pos += 4;
                                                                                                                                          } else {
                                                                                                                                            r0 = null;
                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                              matchFailed("\"samp\"");
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                          if (r0 === null) {
                                                                                                                                            if (input.substr(pos, 4) === "ruby") {
                                                                                                                                              r0 = "ruby";
                                                                                                                                              pos += 4;
                                                                                                                                            } else {
                                                                                                                                              r0 = null;
                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                matchFailed("\"ruby\"");
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                            if (r0 === null) {
                                                                                                                                              if (input.substr(pos, 4) === "nobr") {
                                                                                                                                                r0 = "nobr";
                                                                                                                                                pos += 4;
                                                                                                                                              } else {
                                                                                                                                                r0 = null;
                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                  matchFailed("\"nobr\"");
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                              if (r0 === null) {
                                                                                                                                                if (input.substr(pos, 4) === "meta") {
                                                                                                                                                  r0 = "meta";
                                                                                                                                                  pos += 4;
                                                                                                                                                } else {
                                                                                                                                                  r0 = null;
                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                    matchFailed("\"meta\"");
                                                                                                                                                  }
                                                                                                                                                }
                                                                                                                                                if (r0 === null) {
                                                                                                                                                  if (input.substr(pos, 4) === "menu") {
                                                                                                                                                    r0 = "menu";
                                                                                                                                                    pos += 4;
                                                                                                                                                  } else {
                                                                                                                                                    r0 = null;
                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                      matchFailed("\"menu\"");
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                  if (r0 === null) {
                                                                                                                                                    if (input.substr(pos, 4) === "mark") {
                                                                                                                                                      r0 = "mark";
                                                                                                                                                      pos += 4;
                                                                                                                                                    } else {
                                                                                                                                                      r0 = null;
                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                        matchFailed("\"mark\"");
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                    if (r0 === null) {
                                                                                                                                                      if (input.substr(pos, 4) === "main") {
                                                                                                                                                        r0 = "main";
                                                                                                                                                        pos += 4;
                                                                                                                                                      } else {
                                                                                                                                                        r0 = null;
                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                          matchFailed("\"main\"");
                                                                                                                                                        }
                                                                                                                                                      }
                                                                                                                                                      if (r0 === null) {
                                                                                                                                                        if (input.substr(pos, 4) === "link") {
                                                                                                                                                          r0 = "link";
                                                                                                                                                          pos += 4;
                                                                                                                                                        } else {
                                                                                                                                                          r0 = null;
                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                            matchFailed("\"link\"");
                                                                                                                                                          }
                                                                                                                                                        }
                                                                                                                                                        if (r0 === null) {
                                                                                                                                                          if (input.substr(pos, 4) === "html") {
                                                                                                                                                            r0 = "html";
                                                                                                                                                            pos += 4;
                                                                                                                                                          } else {
                                                                                                                                                            r0 = null;
                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                              matchFailed("\"html\"");
                                                                                                                                                            }
                                                                                                                                                          }
                                                                                                                                                          if (r0 === null) {
                                                                                                                                                            if (input.substr(pos, 4) === "head") {
                                                                                                                                                              r0 = "head";
                                                                                                                                                              pos += 4;
                                                                                                                                                            } else {
                                                                                                                                                              r0 = null;
                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                matchFailed("\"head\"");
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                            if (r0 === null) {
                                                                                                                                                              if (input.substr(pos, 4) === "form") {
                                                                                                                                                                r0 = "form";
                                                                                                                                                                pos += 4;
                                                                                                                                                              } else {
                                                                                                                                                                r0 = null;
                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                  matchFailed("\"form\"");
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                if (input.substr(pos, 4) === "font") {
                                                                                                                                                                  r0 = "font";
                                                                                                                                                                  pos += 4;
                                                                                                                                                                } else {
                                                                                                                                                                  r0 = null;
                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                    matchFailed("\"font\"");
                                                                                                                                                                  }
                                                                                                                                                                }
                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                  if (input.substr(pos, 4) === "data") {
                                                                                                                                                                    r0 = "data";
                                                                                                                                                                    pos += 4;
                                                                                                                                                                  } else {
                                                                                                                                                                    r0 = null;
                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                      matchFailed("\"data\"");
                                                                                                                                                                    }
                                                                                                                                                                  }
                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                    if (input.substr(pos, 4) === "code") {
                                                                                                                                                                      r0 = "code";
                                                                                                                                                                      pos += 4;
                                                                                                                                                                    } else {
                                                                                                                                                                      r0 = null;
                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                        matchFailed("\"code\"");
                                                                                                                                                                      }
                                                                                                                                                                    }
                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                      if (input.substr(pos, 4) === "cite") {
                                                                                                                                                                        r0 = "cite";
                                                                                                                                                                        pos += 4;
                                                                                                                                                                      } else {
                                                                                                                                                                        r0 = null;
                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                          matchFailed("\"cite\"");
                                                                                                                                                                        }
                                                                                                                                                                      }
                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                        if (input.substr(pos, 4) === "body") {
                                                                                                                                                                          r0 = "body";
                                                                                                                                                                          pos += 4;
                                                                                                                                                                        } else {
                                                                                                                                                                          r0 = null;
                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                            matchFailed("\"body\"");
                                                                                                                                                                          }
                                                                                                                                                                        }
                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                          if (input.substr(pos, 4) === "base") {
                                                                                                                                                                            r0 = "base";
                                                                                                                                                                            pos += 4;
                                                                                                                                                                          } else {
                                                                                                                                                                            r0 = null;
                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                              matchFailed("\"base\"");
                                                                                                                                                                            }
                                                                                                                                                                          }
                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                            if (input.substr(pos, 4) === "area") {
                                                                                                                                                                              r0 = "area";
                                                                                                                                                                              pos += 4;
                                                                                                                                                                            } else {
                                                                                                                                                                              r0 = null;
                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                matchFailed("\"area\"");
                                                                                                                                                                              }
                                                                                                                                                                            }
                                                                                                                                                                            if (r0 === null) {
                                                                                                                                                                              if (input.substr(pos, 4) === "abbr") {
                                                                                                                                                                                r0 = "abbr";
                                                                                                                                                                                pos += 4;
                                                                                                                                                                              } else {
                                                                                                                                                                                r0 = null;
                                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                                  matchFailed("\"abbr\"");
                                                                                                                                                                                }
                                                                                                                                                                              }
                                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                                if (input.substr(pos, 3) === "xmp") {
                                                                                                                                                                                  r0 = "xmp";
                                                                                                                                                                                  pos += 3;
                                                                                                                                                                                } else {
                                                                                                                                                                                  r0 = null;
                                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                                    matchFailed("\"xmp\"");
                                                                                                                                                                                  }
                                                                                                                                                                                }
                                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                                  if (input.substr(pos, 3) === "wbr") {
                                                                                                                                                                                    r0 = "wbr";
                                                                                                                                                                                    pos += 3;
                                                                                                                                                                                  } else {
                                                                                                                                                                                    r0 = null;
                                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                                      matchFailed("\"wbr\"");
                                                                                                                                                                                    }
                                                                                                                                                                                  }
                                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                                    if (input.substr(pos, 3) === "var") {
                                                                                                                                                                                      r0 = "var";
                                                                                                                                                                                      pos += 3;
                                                                                                                                                                                    } else {
                                                                                                                                                                                      r0 = null;
                                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                                        matchFailed("\"var\"");
                                                                                                                                                                                      }
                                                                                                                                                                                    }
                                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                                      if (input.substr(pos, 3) === "sup") {
                                                                                                                                                                                        r0 = "sup";
                                                                                                                                                                                        pos += 3;
                                                                                                                                                                                      } else {
                                                                                                                                                                                        r0 = null;
                                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                                          matchFailed("\"sup\"");
                                                                                                                                                                                        }
                                                                                                                                                                                      }
                                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                                        if (input.substr(pos, 3) === "sub") {
                                                                                                                                                                                          r0 = "sub";
                                                                                                                                                                                          pos += 3;
                                                                                                                                                                                        } else {
                                                                                                                                                                                          r0 = null;
                                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                                            matchFailed("\"sub\"");
                                                                                                                                                                                          }
                                                                                                                                                                                        }
                                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                                          if (input.substr(pos, 3) === "pre") {
                                                                                                                                                                                            r0 = "pre";
                                                                                                                                                                                            pos += 3;
                                                                                                                                                                                          } else {
                                                                                                                                                                                            r0 = null;
                                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                                              matchFailed("\"pre\"");
                                                                                                                                                                                            }
                                                                                                                                                                                          }
                                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                                            if (input.substr(pos, 3) === "nav") {
                                                                                                                                                                                              r0 = "nav";
                                                                                                                                                                                              pos += 3;
                                                                                                                                                                                            } else {
                                                                                                                                                                                              r0 = null;
                                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                                matchFailed("\"nav\"");
                                                                                                                                                                                              }
                                                                                                                                                                                            }
                                                                                                                                                                                            if (r0 === null) {
                                                                                                                                                                                              if (input.substr(pos, 3) === "map") {
                                                                                                                                                                                                r0 = "map";
                                                                                                                                                                                                pos += 3;
                                                                                                                                                                                              } else {
                                                                                                                                                                                                r0 = null;
                                                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                                                  matchFailed("\"map\"");
                                                                                                                                                                                                }
                                                                                                                                                                                              }
                                                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                                                if (input.substr(pos, 3) === "kbd") {
                                                                                                                                                                                                  r0 = "kbd";
                                                                                                                                                                                                  pos += 3;
                                                                                                                                                                                                } else {
                                                                                                                                                                                                  r0 = null;
                                                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                                                    matchFailed("\"kbd\"");
                                                                                                                                                                                                  }
                                                                                                                                                                                                }
                                                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                                                  if (input.substr(pos, 3) === "ins") {
                                                                                                                                                                                                    r0 = "ins";
                                                                                                                                                                                                    pos += 3;
                                                                                                                                                                                                  } else {
                                                                                                                                                                                                    r0 = null;
                                                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                                                      matchFailed("\"ins\"");
                                                                                                                                                                                                    }
                                                                                                                                                                                                  }
                                                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                                                    if (input.substr(pos, 3) === "img") {
                                                                                                                                                                                                      r0 = "img";
                                                                                                                                                                                                      pos += 3;
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                      r0 = null;
                                                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                                                        matchFailed("\"img\"");
                                                                                                                                                                                                      }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                                                      if (input.substr(pos, 3) === "div") {
                                                                                                                                                                                                        r0 = "div";
                                                                                                                                                                                                        pos += 3;
                                                                                                                                                                                                      } else {
                                                                                                                                                                                                        r0 = null;
                                                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                                                          matchFailed("\"div\"");
                                                                                                                                                                                                        }
                                                                                                                                                                                                      }
                                                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                                                        if (input.substr(pos, 3) === "dir") {
                                                                                                                                                                                                          r0 = "dir";
                                                                                                                                                                                                          pos += 3;
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                          r0 = null;
                                                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                                                            matchFailed("\"dir\"");
                                                                                                                                                                                                          }
                                                                                                                                                                                                        }
                                                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                                                          if (input.substr(pos, 3) === "dfn") {
                                                                                                                                                                                                            r0 = "dfn";
                                                                                                                                                                                                            pos += 3;
                                                                                                                                                                                                          } else {
                                                                                                                                                                                                            r0 = null;
                                                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                                                              matchFailed("\"dfn\"");
                                                                                                                                                                                                            }
                                                                                                                                                                                                          }
                                                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                                                            if (input.substr(pos, 3) === "del") {
                                                                                                                                                                                                              r0 = "del";
                                                                                                                                                                                                              pos += 3;
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                              r0 = null;
                                                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                                                matchFailed("\"del\"");
                                                                                                                                                                                                              }
                                                                                                                                                                                                            }
                                                                                                                                                                                                            if (r0 === null) {
                                                                                                                                                                                                              if (input.substr(pos, 3) === "col") {
                                                                                                                                                                                                                r0 = "col";
                                                                                                                                                                                                                pos += 3;
                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                r0 = null;
                                                                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                                                                  matchFailed("\"col\"");
                                                                                                                                                                                                                }
                                                                                                                                                                                                              }
                                                                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                                                                if (input.substr(pos, 3) === "big") {
                                                                                                                                                                                                                  r0 = "big";
                                                                                                                                                                                                                  pos += 3;
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                  r0 = null;
                                                                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                                                                    matchFailed("\"big\"");
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                }
                                                                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                                                                  if (input.substr(pos, 3) === "bdo") {
                                                                                                                                                                                                                    r0 = "bdo";
                                                                                                                                                                                                                    pos += 3;
                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                    r0 = null;
                                                                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                                                                      matchFailed("\"bdo\"");
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                                                                    if (input.substr(pos, 3) === "bdi") {
                                                                                                                                                                                                                      r0 = "bdi";
                                                                                                                                                                                                                      pos += 3;
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                      r0 = null;
                                                                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                                                                        matchFailed("\"bdi\"");
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                                                                      if (input.substr(pos, 2) === "ul") {
                                                                                                                                                                                                                        r0 = "ul";
                                                                                                                                                                                                                        pos += 2;
                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                        r0 = null;
                                                                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                                                                          matchFailed("\"ul\"");
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                                                                        if (input.substr(pos, 2) === "tt") {
                                                                                                                                                                                                                          r0 = "tt";
                                                                                                                                                                                                                          pos += 2;
                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                          r0 = null;
                                                                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                                                                            matchFailed("\"tt\"");
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                                                                          if (input.substr(pos, 2) === "tr") {
                                                                                                                                                                                                                            r0 = "tr";
                                                                                                                                                                                                                            pos += 2;
                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                            r0 = null;
                                                                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                                                                              matchFailed("\"tr\"");
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                                                                            if (input.substr(pos, 2) === "th") {
                                                                                                                                                                                                                              r0 = "th";
                                                                                                                                                                                                                              pos += 2;
                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                              r0 = null;
                                                                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                                                                matchFailed("\"th\"");
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            if (r0 === null) {
                                                                                                                                                                                                                              if (input.substr(pos, 2) === "td") {
                                                                                                                                                                                                                                r0 = "td";
                                                                                                                                                                                                                                pos += 2;
                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                r0 = null;
                                                                                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                                                                                  matchFailed("\"td\"");
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                                                                                if (input.substr(pos, 2) === "rt") {
                                                                                                                                                                                                                                  r0 = "rt";
                                                                                                                                                                                                                                  pos += 2;
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                  r0 = null;
                                                                                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                                                                                    matchFailed("\"rt\"");
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                                                                                  if (input.substr(pos, 2) === "rp") {
                                                                                                                                                                                                                                    r0 = "rp";
                                                                                                                                                                                                                                    pos += 2;
                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                    r0 = null;
                                                                                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                                                                                      matchFailed("\"rp\"");
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                                                                                    if (input.substr(pos, 2) === "ol") {
                                                                                                                                                                                                                                      r0 = "ol";
                                                                                                                                                                                                                                      pos += 2;
                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                      r0 = null;
                                                                                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                                                                                        matchFailed("\"ol\"");
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                                                                                      if (input.substr(pos, 2) === "li") {
                                                                                                                                                                                                                                        r0 = "li";
                                                                                                                                                                                                                                        pos += 2;
                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                        r0 = null;
                                                                                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                                                                                          matchFailed("\"li\"");
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                                                                                        if (input.substr(pos, 2) === "hr") {
                                                                                                                                                                                                                                          r0 = "hr";
                                                                                                                                                                                                                                          pos += 2;
                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                          r0 = null;
                                                                                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                                                                                            matchFailed("\"hr\"");
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                                                                                          if (input.substr(pos, 2) === "h6") {
                                                                                                                                                                                                                                            r0 = "h6";
                                                                                                                                                                                                                                            pos += 2;
                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                            r0 = null;
                                                                                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                                                                                              matchFailed("\"h6\"");
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                                                                                            if (input.substr(pos, 2) === "h5") {
                                                                                                                                                                                                                                              r0 = "h5";
                                                                                                                                                                                                                                              pos += 2;
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                              r0 = null;
                                                                                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                                                                                matchFailed("\"h5\"");
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            if (r0 === null) {
                                                                                                                                                                                                                                              if (input.substr(pos, 2) === "h4") {
                                                                                                                                                                                                                                                r0 = "h4";
                                                                                                                                                                                                                                                pos += 2;
                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                r0 = null;
                                                                                                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                                                                                                  matchFailed("\"h4\"");
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                                                                                                if (input.substr(pos, 2) === "h3") {
                                                                                                                                                                                                                                                  r0 = "h3";
                                                                                                                                                                                                                                                  pos += 2;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                  r0 = null;
                                                                                                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                                                                                                    matchFailed("\"h3\"");
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                                                                                                  if (input.substr(pos, 2) === "h2") {
                                                                                                                                                                                                                                                    r0 = "h2";
                                                                                                                                                                                                                                                    pos += 2;
                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                    r0 = null;
                                                                                                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                                                                                                      matchFailed("\"h2\"");
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                                                                                                    if (input.substr(pos, 2) === "h1") {
                                                                                                                                                                                                                                                      r0 = "h1";
                                                                                                                                                                                                                                                      pos += 2;
                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                      r0 = null;
                                                                                                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                                                                                                        matchFailed("\"h1\"");
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                                                                                                      if (input.substr(pos, 2) === "em") {
                                                                                                                                                                                                                                                        r0 = "em";
                                                                                                                                                                                                                                                        pos += 2;
                                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                                        r0 = null;
                                                                                                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                                                                                                          matchFailed("\"em\"");
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                                                                                                        if (input.substr(pos, 2) === "dt") {
                                                                                                                                                                                                                                                          r0 = "dt";
                                                                                                                                                                                                                                                          pos += 2;
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                          r0 = null;
                                                                                                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                                                                                                            matchFailed("\"dt\"");
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                                                                                                          if (input.substr(pos, 2) === "dl") {
                                                                                                                                                                                                                                                            r0 = "dl";
                                                                                                                                                                                                                                                            pos += 2;
                                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                                            r0 = null;
                                                                                                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                                                                                                              matchFailed("\"dl\"");
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                                                                                                            if (input.substr(pos, 2) === "dd") {
                                                                                                                                                                                                                                                              r0 = "dd";
                                                                                                                                                                                                                                                              pos += 2;
                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                              r0 = null;
                                                                                                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                                                                                                matchFailed("\"dd\"");
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            if (r0 === null) {
                                                                                                                                                                                                                                                              if (input.substr(pos, 2) === "br") {
                                                                                                                                                                                                                                                                r0 = "br";
                                                                                                                                                                                                                                                                pos += 2;
                                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                                r0 = null;
                                                                                                                                                                                                                                                                if (reportFailures === 0) {
                                                                                                                                                                                                                                                                  matchFailed("\"br\"");
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              if (r0 === null) {
                                                                                                                                                                                                                                                                if (input.charCodeAt(pos) === 117) {
                                                                                                                                                                                                                                                                  r0 = "u";
                                                                                                                                                                                                                                                                  pos++;
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                  r0 = null;
                                                                                                                                                                                                                                                                  if (reportFailures === 0) {
                                                                                                                                                                                                                                                                    matchFailed("\"u\"");
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                if (r0 === null) {
                                                                                                                                                                                                                                                                  if (input.charCodeAt(pos) === 115) {
                                                                                                                                                                                                                                                                    r0 = "s";
                                                                                                                                                                                                                                                                    pos++;
                                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                                    r0 = null;
                                                                                                                                                                                                                                                                    if (reportFailures === 0) {
                                                                                                                                                                                                                                                                      matchFailed("\"s\"");
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                  if (r0 === null) {
                                                                                                                                                                                                                                                                    if (input.charCodeAt(pos) === 113) {
                                                                                                                                                                                                                                                                      r0 = "q";
                                                                                                                                                                                                                                                                      pos++;
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                      r0 = null;
                                                                                                                                                                                                                                                                      if (reportFailures === 0) {
                                                                                                                                                                                                                                                                        matchFailed("\"q\"");
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                    if (r0 === null) {
                                                                                                                                                                                                                                                                      if (input.charCodeAt(pos) === 112) {
                                                                                                                                                                                                                                                                        r0 = "p";
                                                                                                                                                                                                                                                                        pos++;
                                                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                                                        r0 = null;
                                                                                                                                                                                                                                                                        if (reportFailures === 0) {
                                                                                                                                                                                                                                                                          matchFailed("\"p\"");
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      if (r0 === null) {
                                                                                                                                                                                                                                                                        if (input.charCodeAt(pos) === 105) {
                                                                                                                                                                                                                                                                          r0 = "i";
                                                                                                                                                                                                                                                                          pos++;
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                          r0 = null;
                                                                                                                                                                                                                                                                          if (reportFailures === 0) {
                                                                                                                                                                                                                                                                            matchFailed("\"i\"");
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        if (r0 === null) {
                                                                                                                                                                                                                                                                          if (input.charCodeAt(pos) === 98) {
                                                                                                                                                                                                                                                                            r0 = "b";
                                                                                                                                                                                                                                                                            pos++;
                                                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                                                            r0 = null;
                                                                                                                                                                                                                                                                            if (reportFailures === 0) {
                                                                                                                                                                                                                                                                              matchFailed("\"b\"");
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                          if (r0 === null) {
                                                                                                                                                                                                                                                                            if (input.charCodeAt(pos) === 97) {
                                                                                                                                                                                                                                                                              r0 = "a";
                                                                                                                                                                                                                                                                              pos++;
                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                              r0 = null;
                                                                                                                                                                                                                                                                              if (reportFailures === 0) {
                                                                                                                                                                                                                                                                                matchFailed("\"a\"");
                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                }
                                                                                                                                                                                                              }
                                                                                                                                                                                                            }
                                                                                                                                                                                                          }
                                                                                                                                                                                                        }
                                                                                                                                                                                                      }
                                                                                                                                                                                                    }
                                                                                                                                                                                                  }
                                                                                                                                                                                                }
                                                                                                                                                                                              }
                                                                                                                                                                                            }
                                                                                                                                                                                          }
                                                                                                                                                                                        }
                                                                                                                                                                                      }
                                                                                                                                                                                    }
                                                                                                                                                                                  }
                                                                                                                                                                                }
                                                                                                                                                                              }
                                                                                                                                                                            }
                                                                                                                                                                          }
                                                                                                                                                                        }
                                                                                                                                                                      }
                                                                                                                                                                    }
                                                                                                                                                                  }
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                          }
                                                                                                                                                        }
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("a valid HTML tag name");
        }
        return r0;
      }
      
      function parse_knownEvent() {
        var r0;
        
        reportFailures++;
        if (input.substr(pos, 10) === "touchStart") {
          r0 = "touchStart";
          pos += 10;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"touchStart\"");
          }
        }
        if (r0 === null) {
          if (input.substr(pos, 9) === "touchMove") {
            r0 = "touchMove";
            pos += 9;
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("\"touchMove\"");
            }
          }
          if (r0 === null) {
            if (input.substr(pos, 8) === "touchEnd") {
              r0 = "touchEnd";
              pos += 8;
            } else {
              r0 = null;
              if (reportFailures === 0) {
                matchFailed("\"touchEnd\"");
              }
            }
            if (r0 === null) {
              if (input.substr(pos, 11) === "touchCancel") {
                r0 = "touchCancel";
                pos += 11;
              } else {
                r0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"touchCancel\"");
                }
              }
              if (r0 === null) {
                if (input.substr(pos, 7) === "keyDown") {
                  r0 = "keyDown";
                  pos += 7;
                } else {
                  r0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"keyDown\"");
                  }
                }
                if (r0 === null) {
                  if (input.substr(pos, 5) === "keyUp") {
                    r0 = "keyUp";
                    pos += 5;
                  } else {
                    r0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"keyUp\"");
                    }
                  }
                  if (r0 === null) {
                    if (input.substr(pos, 8) === "keyPress") {
                      r0 = "keyPress";
                      pos += 8;
                    } else {
                      r0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"keyPress\"");
                      }
                    }
                    if (r0 === null) {
                      if (input.substr(pos, 9) === "mouseDown") {
                        r0 = "mouseDown";
                        pos += 9;
                      } else {
                        r0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"mouseDown\"");
                        }
                      }
                      if (r0 === null) {
                        if (input.substr(pos, 7) === "mouseUp") {
                          r0 = "mouseUp";
                          pos += 7;
                        } else {
                          r0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"mouseUp\"");
                          }
                        }
                        if (r0 === null) {
                          if (input.substr(pos, 11) === "contextMenu") {
                            r0 = "contextMenu";
                            pos += 11;
                          } else {
                            r0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"contextMenu\"");
                            }
                          }
                          if (r0 === null) {
                            if (input.substr(pos, 5) === "click") {
                              r0 = "click";
                              pos += 5;
                            } else {
                              r0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"click\"");
                              }
                            }
                            if (r0 === null) {
                              if (input.substr(pos, 11) === "doubleClick") {
                                r0 = "doubleClick";
                                pos += 11;
                              } else {
                                r0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"doubleClick\"");
                                }
                              }
                              if (r0 === null) {
                                if (input.substr(pos, 9) === "mouseMove") {
                                  r0 = "mouseMove";
                                  pos += 9;
                                } else {
                                  r0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"mouseMove\"");
                                  }
                                }
                                if (r0 === null) {
                                  if (input.substr(pos, 7) === "focusIn") {
                                    r0 = "focusIn";
                                    pos += 7;
                                  } else {
                                    r0 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"focusIn\"");
                                    }
                                  }
                                  if (r0 === null) {
                                    if (input.substr(pos, 8) === "focusOut") {
                                      r0 = "focusOut";
                                      pos += 8;
                                    } else {
                                      r0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\"focusOut\"");
                                      }
                                    }
                                    if (r0 === null) {
                                      if (input.substr(pos, 10) === "mouseEnter") {
                                        r0 = "mouseEnter";
                                        pos += 10;
                                      } else {
                                        r0 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"mouseEnter\"");
                                        }
                                      }
                                      if (r0 === null) {
                                        if (input.substr(pos, 10) === "mouseLeave") {
                                          r0 = "mouseLeave";
                                          pos += 10;
                                        } else {
                                          r0 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"mouseLeave\"");
                                          }
                                        }
                                        if (r0 === null) {
                                          if (input.substr(pos, 6) === "submit") {
                                            r0 = "submit";
                                            pos += 6;
                                          } else {
                                            r0 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\"submit\"");
                                            }
                                          }
                                          if (r0 === null) {
                                            if (input.substr(pos, 5) === "input") {
                                              r0 = "input";
                                              pos += 5;
                                            } else {
                                              r0 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"input\"");
                                              }
                                            }
                                            if (r0 === null) {
                                              if (input.substr(pos, 6) === "change") {
                                                r0 = "change";
                                                pos += 6;
                                              } else {
                                                r0 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\"change\"");
                                                }
                                              }
                                              if (r0 === null) {
                                                if (input.substr(pos, 9) === "dragStart") {
                                                  r0 = "dragStart";
                                                  pos += 9;
                                                } else {
                                                  r0 = null;
                                                  if (reportFailures === 0) {
                                                    matchFailed("\"dragStart\"");
                                                  }
                                                }
                                                if (r0 === null) {
                                                  if (input.substr(pos, 4) === "drag") {
                                                    r0 = "drag";
                                                    pos += 4;
                                                  } else {
                                                    r0 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"drag\"");
                                                    }
                                                  }
                                                  if (r0 === null) {
                                                    if (input.substr(pos, 9) === "dragEnter") {
                                                      r0 = "dragEnter";
                                                      pos += 9;
                                                    } else {
                                                      r0 = null;
                                                      if (reportFailures === 0) {
                                                        matchFailed("\"dragEnter\"");
                                                      }
                                                    }
                                                    if (r0 === null) {
                                                      if (input.substr(pos, 9) === "dragLeave") {
                                                        r0 = "dragLeave";
                                                        pos += 9;
                                                      } else {
                                                        r0 = null;
                                                        if (reportFailures === 0) {
                                                          matchFailed("\"dragLeave\"");
                                                        }
                                                      }
                                                      if (r0 === null) {
                                                        if (input.substr(pos, 8) === "dragOver") {
                                                          r0 = "dragOver";
                                                          pos += 8;
                                                        } else {
                                                          r0 = null;
                                                          if (reportFailures === 0) {
                                                            matchFailed("\"dragOver\"");
                                                          }
                                                        }
                                                        if (r0 === null) {
                                                          if (input.substr(pos, 4) === "drop") {
                                                            r0 = "drop";
                                                            pos += 4;
                                                          } else {
                                                            r0 = null;
                                                            if (reportFailures === 0) {
                                                              matchFailed("\"drop\"");
                                                            }
                                                          }
                                                          if (r0 === null) {
                                                            if (input.substr(pos, 7) === "dragEnd") {
                                                              r0 = "dragEnd";
                                                              pos += 7;
                                                            } else {
                                                              r0 = null;
                                                              if (reportFailures === 0) {
                                                                matchFailed("\"dragEnd\"");
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("a JS event");
        }
        return r0;
      }
      
      function parse_INDENT() {
        var r0, r1;
        
        reportFailures++;
        r1 = pos;
        if (input.charCodeAt(pos) === 61423) {
          r0 = "\uEFEF";
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\uEFEF\"");
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function() { return ''; })();
        }
        if (r0 === null) {
          pos = r1;
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("INDENT");
        }
        return r0;
      }
      
      function parse_DEDENT() {
        var r0, r1;
        
        reportFailures++;
        r1 = pos;
        if (input.charCodeAt(pos) === 61438) {
          r0 = "\uEFFE";
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\uEFFE\"");
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function() { return ''; })();
        }
        if (r0 === null) {
          pos = r1;
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("DEDENT");
        }
        return r0;
      }
      
      function parse_TERM() {
        var r0, r1;
        
        reportFailures++;
        r1 = pos;
        if (input.charCodeAt(pos) === 61439) {
          r0 = "\uEFFF";
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\uEFFF\"");
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function() { return ''; })();
        }
        if (r0 === null) {
          pos = r1;
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("TERM");
        }
        return r0;
      }
      
      function parse___() {
        var r0, r1;
        
        reportFailures++;
        r1 = parse_whitespace();
        if (r1 !== null) {
          r0 = [];
          while (r1 !== null) {
            r0.push(r1);
            r1 = parse_whitespace();
          }
        } else {
          r0 = null;
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("required whitespace");
        }
        return r0;
      }
      
      function parse__() {
        var r0, r1;
        
        reportFailures++;
        r0 = [];
        r1 = parse_whitespace();
        while (r1 !== null) {
          r0.push(r1);
          r1 = parse_whitespace();
        }
        reportFailures--;
        if (reportFailures === 0 && r0 === null) {
          matchFailed("whitespace");
        }
        return r0;
      }
      
      function parse_whitespace() {
        var r0;
        
        if (/^[ \t\n\r]/.test(input.charAt(pos))) {
          r0 = input.charAt(pos);
          pos++;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t\\n\\r]");
          }
        }
        return r0;
      }
      
      function parse_lineContent() {
        var r0, r1, r2;
        
        r1 = pos;
        r0 = [];
        if (/^[^\uEFFF\uEFFE\uEFEF]/.test(input.charAt(pos))) {
          r2 = input.charAt(pos);
          pos++;
        } else {
          r2 = null;
          if (reportFailures === 0) {
            matchFailed("[^\\uEFFF\\uEFFE\\uEFEF]");
          }
        }
        while (r2 !== null) {
          r0.push(r2);
          if (/^[^\uEFFF\uEFFE\uEFEF]/.test(input.charAt(pos))) {
            r2 = input.charAt(pos);
            pos++;
          } else {
            r2 = null;
            if (reportFailures === 0) {
              matchFailed("[^\\uEFFF\\uEFFE\\uEFEF]");
            }
          }
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(a) { return a.join(''); })(r0);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      
        // Returns a new MustacheNode with a new preceding param (id).
        function unshiftParam(mustacheNode, helperName, newHashPairs) {
      
          var hash = mustacheNode.hash;
      
          // Merge hash.
          if(newHashPairs) {
            hash = hash || new Handlebars.AST.HashNode([]);
      
            for(var i = 0; i < newHashPairs.length; ++i) {
              hash.pairs.push(newHashPairs[i]);
            }
          }
      
          var params = [mustacheNode.id].concat(mustacheNode.params);
          params.unshift(new Handlebars.AST.IdNode([helperName]));
          return new Handlebars.AST.MustacheNode(params, hash, !mustacheNode.escaped);
        }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        reportedPos = Math.max(pos, rightmostFailuresPos);
        var found = reportedPos < input.length ? input.charAt(reportedPos) : null;
        var reportedPosDetails = computeReportedPosDetails();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          reportedPos,
          reportedPosDetails.line,
          reportedPosDetails.column
        );
      }
      
      return result;
    }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  subclass(result.SyntaxError, Error);
  
  return result;
})();

// exports = Emblem.Parser;
;
// lib/compiler.js
var Emblem, Handlebars,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

// 

// 

Emblem.parse = function(string) {
  var processed;
  processed = Emblem.Preprocessor.processSync(string);
  return new Handlebars.AST.ProgramNode(Emblem.Parser.parse(processed), []);
};

Emblem.precompileRaw = function(string, options) {
  var ast, environment;
  if (options == null) {
    options = {};
  }
  if (typeof string !== 'string') {
    throw new Handlebars.Exception("You must pass a string to Emblem.precompile. You passed " + string);
  }
  if (__indexOf.call(options, 'data') < 0) {
    options.data = true;
  }
  ast = Emblem.parse(string);
  environment = new Handlebars.Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Emblem.compileRaw = function(string, options) {
  var compile, compiled;
  if (options == null) {
    options = {};
  }
  if (typeof string !== 'string') {
    throw new Handlebars.Exception("You must pass a string to Emblem.compile. You passed " + string);
  }
  if (__indexOf.call(options, 'data') < 0) {
    options.data = true;
  }
  compiled = null;
  compile = function() {
    var ast, environment, templateSpec;
    ast = Emblem.parse(string);
    environment = new Handlebars.Compiler().compile(ast, options);
    templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, void 0, true);
    return Handlebars.template(templateSpec);
  };
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};

Emblem.precompile = Emblem.precompileRaw;

Emblem.compile = Emblem.compileRaw;

Emblem.precompileEmber = function(string) {
  var ast, environment, options;
  ast = Emblem.parse(string);
  options = {
    knownHelpers: {
      action: true,
      unbound: true,
      bindAttr: true,
      template: true,
      view: true,
      _triageMustache: true
    },
    data: true,
    stringParams: true
  };
  environment = new Ember.Handlebars.Compiler().compile(ast, options);
  return new Ember.Handlebars.JavaScriptCompiler().compile(environment, options, void 0, true);
};

Emblem.compileEmber = function(string) {
  var ast, environment, options, templateSpec;
  ast = Emblem.parse(string);
  options = {
    data: true,
    stringParams: true
  };
  environment = new Ember.Handlebars.Compiler().compile(ast, options);
  templateSpec = new Ember.Handlebars.JavaScriptCompiler().compile(environment, options, void 0, true);
  return Ember.Handlebars.template(templateSpec);
};
;
// lib/preprocessor.js
var Emblem, Preprocessor, StringScanner;

// 

// 

Emblem.Preprocessor = Preprocessor = (function() {
  var DEDENT, INDENT, TERM, anyWhitespaceAndNewlinesTouchingEOF, any_whitespaceFollowedByNewlines_, processInput, ws;

  ws = '\\t\\x0B\\f \\xA0\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000\\uFEFF';

  INDENT = '\uEFEF';

  DEDENT = '\uEFFE';

  TERM = '\uEFFF';

  anyWhitespaceAndNewlinesTouchingEOF = RegExp("[" + ws + "\\n]*$");

  any_whitespaceFollowedByNewlines_ = RegExp("(?:[" + ws + "]*\\n)+");

  function Preprocessor() {
    this.base = this.indent = null;
    this.context = [];
    this.context.peek = function() {
      if (this.length) {
        return this[this.length - 1];
      } else {
        return null;
      }
    };
    this.context.err = function(c) {
      throw new Error("Unexpected " + c);
    };
    this.output = '';
    this.context.observe = function(c) {
      var top;
      top = this.peek();
      switch (c) {
        case INDENT:
          this.push(c);
          break;
        case DEDENT:
          if (top !== INDENT) {
            this.err(c);
          }
          this.pop();
          break;
        case '\n':
          if (top !== '/') {
            this.err(c);
          }
          this.pop();
          break;
        case '/':
          this.push(c);
          break;
        case 'end-\\':
          if (top !== '\\') {
            this.err(c);
          }
          this.pop();
          break;
        default:
          throw new Error("undefined token observed: " + c);
      }
      return this;
    };
    this.ss = new StringScanner('');
  }

  Preprocessor.prototype.p = function(s) {
    if (s) {
      this.output += s;
    }
    return s;
  };

  Preprocessor.prototype.scan = function(r) {
    return this.p(this.ss.scan(r));
  };

  Preprocessor.prototype.discard = function(r) {
    return this.ss.scan(r);
  };

  processInput = function(isEnd) {
    return function(data) {
      var b, c, delta, level, lines, message, newLevel, tok;
      if (!isEnd) {
        this.ss.concat(data);
        this.discard(any_whitespaceFollowedByNewlines_);
      }
      while (!this.ss.eos()) {
        switch (this.context.peek()) {
          case null:
          case INDENT:
            if (this.ss.bol() || this.discard(any_whitespaceFollowedByNewlines_)) {
              if (this.base != null) {
                if ((this.discard(this.base)) == null) {
                  throw new Error("inconsistent base indentation");
                }
              } else {
                b = this.discard(RegExp("[" + ws + "]*"));
                this.base = RegExp("" + b);
              }
              if (this.indent != null) {
                level = ((function() {
                  var _i, _len, _ref, _results;
                  _ref = this.context;
                  _results = [];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    c = _ref[_i];
                    if (c === INDENT) {
                      _results.push(0);
                    }
                  }
                  return _results;
                }).call(this)).length;
                if (this.ss.check(RegExp("(?:" + this.indent + "){" + (level + 1) + "}[^" + ws + "#]"))) {
                  this.discard(RegExp("(?:" + this.indent + "){" + (level + 1) + "}"));
                  this.context.observe(INDENT);
                  this.p(INDENT);
                } else if (level > 0 && this.ss.check(RegExp("(?:" + this.indent + "){0," + (level - 1) + "}[^" + ws + "]"))) {
                  newLevel = 0;
                  while (this.discard(RegExp("" + this.indent))) {
                    ++newLevel;
                  }
                  delta = level - newLevel;
                  while (delta--) {
                    this.context.observe(DEDENT);
                    this.p("" + DEDENT);
                  }
                } else if (this.ss.check(RegExp("(?:" + this.indent + "){" + level + "}[^" + ws + "]"))) {
                  this.discard(RegExp("(?:" + this.indent + "){" + level + "}"));
                } else {
                  lines = this.ss.str.substr(0, this.ss.pos).split(/\n/) || [''];
                  message = "Syntax error on line " + lines.length + ": invalid indentation";
                  throw new Error("" + message);
                }
              } else {
                if (this.indent = this.discard(RegExp("[" + ws + "]+"))) {
                  this.context.observe(INDENT);
                  this.p(INDENT);
                }
              }
            }
            /*
                      # Search for context-introducing 
                      tok = switch @context.peek()
                        when '['
                          # safe things, but not closing bracket
                          @scan /[^\n'"\\\/#`[({\]]+/
                          @scan /\]/
                        when '('
                          # safe things, but not closing paren
                          @scan /[^\n'"\\\/#`[({)]+/
                          @scan /\)/
                        when '#{', '{'
                          # safe things, but not closing brace
                          @scan /[^\n'"\\\/#`[({}]+/
                          @scan /\}/
                        else
                          # scan safe characters (anything that doesn't *introduce* context)
                          @scan /[^\n'"\\\/#`[({]+/
                          null
                      if tok
                        @context.observe tok
                        continue
            */

            this.scan(/[^\n\\]+/);
            if (tok = this.discard(/\//)) {
              this.context.observe(tok);
            }
            if (this.discard(/\n/)) {
              this.p("" + TERM);
            }
            this.discard(any_whitespaceFollowedByNewlines_);
            break;
          case '/':
            if (this.discard(/.*\n/)) {
              this.context.observe('\n');
            }
            break;
          case '\\':
            if (this.scan(/[\s\S]/)) {
              this.context.observe('end-\\');
            }
        }
      }
      if (isEnd) {
        this.scan(anyWhitespaceAndNewlinesTouchingEOF);
        while (this.context.length && INDENT === this.context.peek()) {
          this.context.observe(DEDENT);
          this.p("" + DEDENT);
        }
        if (this.context.length) {
          throw new Error('Unclosed ' + (this.context.peek()) + ' at EOF');
        }
      }
    };
  };

  Preprocessor.prototype.processData = processInput(false);

  Preprocessor.prototype.processEnd = processInput(true);

  Preprocessor.processSync = function(input) {
    var pre;
    input += "\n";
    pre = new Preprocessor;
    pre.processData(input);
    pre.processEnd();
    return pre.output;
  };

  return Preprocessor;

})();
;
// lib/emberties.js
var ENV, Emblem, _base;

// 

Emblem.bootstrap = function(ctx) {
  if (ctx == null) {
    ctx = Ember.$(document);
  }
  Emblem.precompile = Emblem.precompileEmber;
  Emblem.compile = Emblem.compileEmber;
  return Ember.$('script[type="text/x-emblem"]', ctx).each(function() {
    var script, templateName;
    script = Ember.$(this);
    templateName = script.attr('data-template-name') || script.attr('id') || 'application';
    Ember.TEMPLATES[templateName] = Emblem.compile(script.html());
    return script.remove();
  });
};

this.ENV || (this.ENV = {});

ENV = this.ENV;

ENV.EMBER_LOAD_HOOKS || (ENV.EMBER_LOAD_HOOKS = {});

(_base = ENV.EMBER_LOAD_HOOKS).application || (_base.application = []);

ENV.EMBER_LOAD_HOOKS.application.push(function() {
  return Emblem.bootstrap();
});
;
