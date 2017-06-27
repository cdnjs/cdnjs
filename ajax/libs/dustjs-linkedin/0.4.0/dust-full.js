//
// Dust - Asynchronous Templating v0.4.0
// http://akdubya.github.com/dustjs
//
// Copyright (c) 2010, Aleksander Williams
// Released under the MIT License.
//

var dust = {};

(function(dust) {

dust.cache = {};

dust.register = function(name, tmpl) {
  if (!name) return;
  dust.cache[name] = tmpl;
};

dust.render = function(name, context, callback) {
  var chunk = new Stub(callback).head;
  dust.load(name, chunk, Context.wrap(context)).end();
};

dust.stream = function(name, context) {
  var stream = new Stream();
  dust.nextTick(function() {
    dust.load(name, stream.head, Context.wrap(context)).end();
  });
  return stream;
};

dust.renderSource = function(source, context, callback) {
  return dust.compileFn(source)(context, callback);
};

dust.compileFn = function(source, name) {
  var tmpl = dust.loadSource(dust.compile(source, name));
  return function(context, callback) {
    var master = callback ? new Stub(callback) : new Stream();
    dust.nextTick(function() {
      tmpl(master.head, Context.wrap(context)).end();
    });
    return master;
  }
};

dust.load = function(name, chunk, context) {
  var tmpl = dust.cache[name];
  if (tmpl) {
    return tmpl(chunk, context);
  } else {
    if (dust.onLoad) {
      return chunk.map(function(chunk) {
        dust.onLoad(name, function(err, src) {
          if (err) return chunk.setError(err);
          if (!dust.cache[name]) dust.loadSource(dust.compile(src, name));
          dust.cache[name](chunk, context).end();
        });
      });
    }
    return chunk.setError(new Error("Template Not Found: " + name));
  }
};

dust.loadSource = function(source, path) {
  return eval(source);
};

if (Array.isArray) {
  dust.isArray = Array.isArray;
} else {
  dust.isArray = function(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
  };
}

dust.nextTick = function(callback) {
  setTimeout(callback, 0);
}

dust.isEmpty = function(value) {
  if (dust.isArray(value) && !value.length) return true;
  if (value === 0) return false;
  return (!value);
};

dust.filter = function(string, auto, filters) {
  if (filters) {
    for (var i=0, len=filters.length; i<len; i++) {
      var name = filters[i];
      if (name === "s") {
        auto = null;
      } else {
        string = dust.filters[name](string);
      }
    }
  }
  if (auto) {
    string = dust.filters[auto](string);
  }
  return string;
};

dust.filters = {
  h: function(value) { return dust.escapeHtml(value); },
  j: function(value) { return dust.escapeJs(value); },
  u: encodeURI,
  uc: encodeURIComponent
}

function Context(stack, global, blocks) {
  this.stack  = stack;
  this.global = global;
  this.blocks = blocks;
}

dust.makeBase = function(global) {
  return new Context(new Stack(), global);
}

Context.wrap = function(context) {
  if (context instanceof Context) {
    return context;
  }
  return new Context(new Stack(context));
}

Context.prototype.get = function(key) {
  var ctx = this.stack, value;

  while(ctx) {
    if (ctx.isObject) {
      value = ctx.head[key];
      if (!(value === undefined)) {
        return value;
      }
    }
    ctx = ctx.tail;
  }
  return this.global ? this.global[key] : undefined;
};

Context.prototype.getPath = function(cur, down) {
  var ctx = this.stack,
      len = down.length;

  if (cur && len === 0) return ctx.head;
  if (!ctx.isObject) return undefined;
  ctx = ctx.head;
  var i = 0;
  while(ctx && i < len) {
    ctx = ctx[down[i]];
    i++;
  }
  return ctx;
};

Context.prototype.push = function(head, idx, len) {
  if( head ){
   // loop index for a block section
   head['$idx'] = idx;
   // loop size for a block section
   head['$len'] = len;
  }
  return new Context(new Stack(head, this.stack, idx, len), this.global, this.blocks);
};

Context.prototype.rebase = function(head) {
  return new Context(new Stack(head), this.global, this.blocks);
};

Context.prototype.current = function() {
  return this.stack.head;
};

Context.prototype.getBlock = function(key) {
  var blocks = this.blocks;

  if (!blocks) return;
  var len = blocks.length, fn;
  while (len--) {
    fn = blocks[len][key];
    if (fn) return fn;
  }
}

Context.prototype.shiftBlocks = function(locals) {
  var blocks = this.blocks;

  if (locals) {
    if (!blocks) {
      newBlocks = [locals];
    } else {
      newBlocks = blocks.concat([locals]);
    }
    return new Context(this.stack, this.global, newBlocks);
  }
  return this;
}

function Stack(head, tail, idx, len) {
  this.tail = tail;
  this.isObject = !dust.isArray(head) && head && typeof head === "object";
  this.head = head;
  this.index = idx;
  this.of = len;
}

function Stub(callback) {
  this.head = new Chunk(this);
  this.callback = callback;
  this.out = '';
}

Stub.prototype.flush = function() {
  var chunk = this.head;

  while (chunk) {
    if (chunk.flushable) {
      this.out += chunk.data;
    } else if (chunk.error) {
      this.callback(chunk.error);
      this.flush = function() {};
      return;
    } else {
      return;
    }
    chunk = chunk.next;
    this.head = chunk;
  }
  this.callback(null, this.out);
}

function Stream() {
  this.head = new Chunk(this);
}

Stream.prototype.flush = function() {
  var chunk = this.head;

  while(chunk) {
    if (chunk.flushable) {
      this.emit('data', chunk.data);
    } else if (chunk.error) {
      this.emit('error', chunk.error);
      this.flush = function() {};
      return;
    } else {
      return;
    }
    chunk = chunk.next;
    this.head = chunk;
  }
  this.emit('end');
}

Stream.prototype.emit = function(type, data) {
  var events = this.events;

  if (events && events[type]) {
    events[type](data);
  }
}

Stream.prototype.on = function(type, callback) {
  if (!this.events) {
    this.events = {};
  }
  this.events[type] = callback;
  return this;
}

function Chunk(root, next, taps) {
  this.root = root;
  this.next = next;
  this.data = '';
  this.flushable = false;
  this.taps = taps;
}

Chunk.prototype.write = function(data) {
  var taps  = this.taps;

  if (taps) {
    data = taps.go(data);
  }
  this.data += data;
  return this;
}

Chunk.prototype.end = function(data) {
  if (data) {
    this.write(data);
  }
  this.flushable = true;
  this.root.flush();
  return this;
}

Chunk.prototype.map = function(callback) {
  var cursor = new Chunk(this.root, this.next, this.taps),
      branch = new Chunk(this.root, cursor, this.taps);

  this.next = branch;
  this.flushable = true;
  callback(branch);
  return cursor;
}

Chunk.prototype.tap = function(tap) {
  var taps = this.taps;

  if (taps) {
    this.taps = taps.push(tap);
  } else {
    this.taps = new Tap(tap);
  }
  return this;
}

Chunk.prototype.untap = function() {
  this.taps = this.taps.tail;
  return this;
}

Chunk.prototype.render = function(body, context) {
  return body(this, context);
}

Chunk.prototype.reference = function(elem, context, auto, filters) {
  if (typeof elem === "function") {
    elem = elem(this, context, null, {auto: auto, filters: filters});
    if (elem instanceof Chunk) {
      return elem;
    }
  }
  if (!dust.isEmpty(elem)) {
    return this.write(dust.filter(elem, auto, filters));
  } else {
    return this;
  }
};

Chunk.prototype.section = function(elem, context, bodies, params) {
  if (typeof elem === "function") {
    elem = elem(this, context, bodies, params);
    if (elem instanceof Chunk) {
      return elem;
    }
  }

  var body = bodies.block,
      skip = bodies['else'];

  if (params) {
    context = context.push(params);
  }

  if (dust.isArray(elem)) {
    if (body) {
      var len = elem.length, chunk = this;
      for (var i=0; i<len; i++) {
        chunk = body(chunk, context.push(elem[i], i, len));
      }
      return chunk;
    }
  } else if (elem === true) {
    if (body) return body(this, context);
  } else if (elem || elem === 0) {
    if (body) return body(this, context.push(elem));
  } else if (skip) {
    return skip(this, context);
  }
  return this;
};

Chunk.prototype.exists = function(elem, context, bodies) {
  var body = bodies.block,
      skip = bodies['else'];

  if (!dust.isEmpty(elem)) {
    if (body) return body(this, context);
  } else if (skip) {
    return skip(this, context);
  }
  return this;
}

Chunk.prototype.notexists = function(elem, context, bodies) {
  var body = bodies.block,
      skip = bodies['else'];

  if (dust.isEmpty(elem)) {
    if (body) return body(this, context);
  } else if (skip) {
    return skip(this, context);
  }
  return this;
}

Chunk.prototype.block = function(elem, context, bodies) {
  var body = bodies.block;

  if (elem) {
    body = elem;
  }

  if (body) {
    return body(this, context);
  }
  return this;
};

Chunk.prototype.partial = function(elem, context, params) {
  var ctx = context.stack, tempHead = ctx.head;
  if (params){
    //put the params context second to match what section does. {.} matches the current context without parameters
    //remove head
    context = context.rebase(ctx.tail);
    //put params on
    context = context.push(params);
    //reattach the head
    context = context.push(tempHead);
  }
  if (typeof elem === "function") {
    return this.capture(elem, context, function(name, chunk) {
      dust.load(name, chunk, context).end();
    });
  }
  return dust.load(elem, this, context);
};

Chunk.prototype.helper = function(name, context, bodies, params) {
  return dust.helpers[name](this, context, bodies, params);
};

Chunk.prototype.capture = function(body, context, callback) {
  return this.map(function(chunk) {
    var stub = new Stub(function(err, out) {
      if (err) {
        chunk.setError(err);
      } else {
        callback(out, chunk);
      }
    });
    body(stub.head, context).end();
  });
};

Chunk.prototype.setError = function(err) {
  this.error = err;
  this.root.flush();
  return this;
};

function Tap(head, tail) {
  this.head = head;
  this.tail = tail;
}

Tap.prototype.push = function(tap) {
  return new Tap(tap, this);
};

Tap.prototype.go = function(value) {
  var tap = this;

  while(tap) {
    value = tap.head(value);
    tap = tap.tail;
  }
  return value;
};

var HCHARS = new RegExp(/[&<>\"]/),
    AMP    = /&/g,
    LT     = /</g,
    GT     = />/g,
    QUOT   = /\"/g;

dust.escapeHtml = function(s) {
  if (typeof s === "string") {
    if (!HCHARS.test(s)) {
      return s;
    }
    return s.replace(AMP,'&amp;').replace(LT,'&lt;').replace(GT,'&gt;').replace(QUOT,'&quot;');
  }
  return s;
};

var BS = /\\/g,
    CR = /\r/g,
    LS = /\u2028/g,
    PS = /\u2029/g,
    NL = /\n/g,
    LF = /\f/g,
    SQ = /'/g,
    DQ = /"/g,
    TB = /\t/g;

dust.escapeJs = function(s) {
  if (typeof s === "string") {
    return s
      .replace(BS, '\\\\')
      .replace(DQ, '\\"')
      .replace(SQ, "\\'")
      .replace(CR, '\\r')
      .replace(LS, '\\u2028')
      .replace(PS, '\\u2029')
      .replace(NL, '\\n')
      .replace(LF, '\\f')
      .replace(TB, "\\t");
  }
  return s;
};

})(dust);

if (typeof exports !== "undefined") {
  dust.helpers = require("./dust-helpers").helpers;
  if (typeof process !== "undefined" && typeof window === "undefined") {
      require('./server')(dust);
  }
  module.exports = dust;
}
(function(dust){
  
var helpers = {
  
  sep: function(chunk, context, bodies) {
    if (context.stack.index === context.stack.of - 1) {
      return chunk;
    }
    return bodies.block(chunk, context);
  },

  idx: function(chunk, context, bodies) {
    return bodies.block(chunk, context.push(context.stack.index));
  },
  
  "if": function( chunk, context, bodies, params ){
    var cond = ( params.cond );
    
    if( params && params.cond ){
      // resolve dust references in the expression
      if( typeof cond === "function" ){
        cond = '';
        chunk.tap( function( data ){
          cond += data;
          return '';
        } ).render( params.cond, context ).untap();
        if( cond === '' ){
          cond = false;
        }
      }
      // eval expressions with no dust references
      if( eval( cond ) ){
       return chunk.render( bodies.block, context );
      } 
      if( bodies['else'] ){
       return chunk.render( bodies['else'], context );
      }
    } 
    // no condition
    else {
      if( window.console ){
        window.console.log( "No expression given!" );
      }
    }
    return chunk;
  }
};

dust.helpers = helpers;

})(typeof exports !== 'undefined' ? exports : window.dust);(function(dust) {

dust.compile = function(source, name) {
  try {
    var ast = filterAST(dust.parse(source));
    return compile(ast, name);
  }
  catch(err)
  {
    if(!err.line || !err.column) throw err;    
    throw new SyntaxError(err.message + " At line : " + err.line + ", column : " + err.column);
  }
};

function filterAST(ast) {
  var context = {};
  return dust.filterNode(context, ast);
}

dust.filterNode = function(context, node) {
  return dust.optimizers[node[0]](context, node);
}

dust.optimizers = {
  body:      compactBuffers,
  buffer:    noop,
  special:   convertSpecial,
  format:    nullify,        // TODO: convert format
  reference: visit,
  "#":       visit,
  "?":       visit,
  "^":       visit,
  "<":       visit,
  "+":       visit,
  "@":       visit,
  "%":       visit,
  partial:   visit,
  context:   visit,
  params:    visit,
  bodies:    visit,
  param:     visit,
  filters:   noop,
  key:       noop,
  path:      noop,
  literal:   noop,
  comment:   nullify
}

dust.pragmas = {
  esc: function(compiler, context, bodies, params) {
    var old = compiler.auto;
    if (!context) context = 'h';
    compiler.auto = (context === 's') ? '' : context;
    var out = compileParts(compiler, bodies.block);
    compiler.auto = old;
    return out;
  }
}

function visit(context, node) {
  var out = [node[0]];
  for (var i=1, len=node.length; i<len; i++) {
    var res = dust.filterNode(context, node[i]);
    if (res) out.push(res);
  }
  return out;
}

// Compacts consecutive buffer nodes into a single node
function compactBuffers(context, node) {
  var out = [node[0]], memo;
  for (var i=1, len=node.length; i<len; i++) {
    var res = dust.filterNode(context, node[i]);
    if (res) {
      if (res[0] === 'buffer') {
        if (memo) {
          memo[1] += res[1];
        } else {
          memo = res;
          out.push(res);
        }
      } else {
        memo = null;
        out.push(res);
      }
    }
  }
  return out;
}

var specialChars = {
  "s": " ",
  "n": "\n",
  "r": "\r",
  "lb": "{",
  "rb": "}"
};

function convertSpecial(context, node) { return ['buffer', specialChars[node[1]]] }
function noop(context, node) { return node }
function nullify(){}

function compile(ast, name) {
  var context = {
    name: name,
    bodies: [],
    blocks: {},
    index: 0,
    auto: "h"
  }

  return "(function(){dust.register("
    + (name ? "\"" + name + "\"" : "null") + ","
    + dust.compileNode(context, ast)
    + ");"
    + compileBlocks(context)
    + compileBodies(context)
    + "return body_0;"
    + "})();";
}

function compileBlocks(context) {
  var out = [],
      blocks = context.blocks;

  for (var name in blocks) {
    out.push(name + ":" + blocks[name]);
  }
  if (out.length) {
    context.blocks = "ctx=ctx.shiftBlocks(blocks);";
    return "var blocks={" + out.join(',') + "};";
  }
  return context.blocks = "";
}

function compileBodies(context) {
  var out = [],
      bodies = context.bodies,
      blx = context.blocks;

  for (var i=0, len=bodies.length; i<len; i++) {
    out[i] = "function body_" + i + "(chk,ctx){"
      + blx + "return chk" + bodies[i] + ";}";
  }
  return out.join('');
}

function compileParts(context, body) {
  var parts = '';
  for (var i=1, len=body.length; i<len; i++) {
    parts += dust.compileNode(context, body[i]);
  }
  return parts;
}

dust.compileNode = function(context, node) {
  return dust.nodes[node[0]](context, node);
}

dust.nodes = {
  body: function(context, node) {
    var id = context.index++, name = "body_" + id;
    context.bodies[id] = compileParts(context, node);
    return name;
  },

  buffer: function(context, node) {
    return ".write(" + escape(node[1]) + ")";
  },

  format: function(context, node) {
    return ".write(" + escape(node[1] + node[2]) + ")";
  },

  reference: function(context, node) {
    return ".reference(" + dust.compileNode(context, node[1])
      + ",ctx," + dust.compileNode(context, node[2]) + ")";
  },

  "#": function(context, node) {
    return compileSection(context, node, "section");
  },

  "?": function(context, node) {
    return compileSection(context, node, "exists");
  },

  "^": function(context, node) {
    return compileSection(context, node, "notexists");
  },

  "<": function(context, node) {
    var bodies = node[4];
    for (var i=1, len=bodies.length; i<len; i++) {
      var param = bodies[i],
          type = param[1][1];
      if (type === "block") {
        context.blocks[node[1].text] = dust.compileNode(context, param[2]);
        return '';
      }
    }
    return '';
  },

  "+": function(context, node) {
    return ".block(ctx.getBlock("
      + escape(node[1].text)
      + ")," + dust.compileNode(context, node[2]) + ","
      + dust.compileNode(context, node[4]) + ","
      + dust.compileNode(context, node[3])
      + ")";
  },

  "@": function(context, node) {
    return ".helper("
      + escape(node[1].text)
      + "," + dust.compileNode(context, node[2]) + ","
      + dust.compileNode(context, node[4]) + ","
      + dust.compileNode(context, node[3])
      + ")";
  },

  "%": function(context, node) {
    // TODO: Move these hacks into pragma precompiler
    var name = node[1][1];
    if (!dust.pragmas[name]) return '';

    var rawBodies = node[4];
    var bodies = {};
    for (var i=1, len=rawBodies.length; i<len; i++) {
      var b = rawBodies[i];
      bodies[b[1][1]] = b[2];
    }

    var rawParams = node[3];
    var params = {};
    for (var i=1, len=rawParams.length; i<len; i++) {
      var p = rawParams[i];
      params[p[1][1]] = p[2][1];
    }

    var ctx = node[2][1] ? node[2][1].text : null;

    return dust.pragmas[name](context, ctx, bodies, params);
  },

  partial: function(context, node) {
    return ".partial("
      + dust.compileNode(context, node[1])
      + "," + dust.compileNode(context, node[2])
      + "," + dust.compileNode(context, node[3]) + ")";
  },

  context: function(context, node) {
    if (node[1]) {
      return "ctx.rebase(" + dust.compileNode(context, node[1]) + ")";
    }
    return "ctx";
  },

  params: function(context, node) {
    var out = [];
    for (var i=1, len=node.length; i<len; i++) {
      out.push(dust.compileNode(context, node[i]));
    }
    if (out.length) {
      return "{" + out.join(',') + "}";
    }
    return "null";
  },

  bodies: function(context, node) {
    var out = [];
    for (var i=1, len=node.length; i<len; i++) {
      out.push(dust.compileNode(context, node[i]));
    }
    return "{" + out.join(',') + "}";
  },

  param: function(context, node) {
    return dust.compileNode(context, node[1]) + ":" + dust.compileNode(context, node[2]);
  },

  filters: function(context, node) {
    var list = [];
    for (var i=1, len=node.length; i<len; i++) {
      var filter = node[i];
      list.push("\"" + filter + "\"");
    }
    return "\"" + context.auto + "\""
      + (list.length ? ",[" + list.join(',') + "]" : '');
  },

  key: function(context, node) {
    return "ctx.get(\"" + node[1] + "\")";
  },

  path: function(context, node) {
    var current = node[1],
        keys = node[2],
        list = [];

    for (var i=0,len=keys.length; i<len; i++) {
      list.push("\"" + keys[i] + "\"");
    }
    return "ctx.getPath(" + current + ",[" + list.join(',') + "])";
  },

  literal: function(context, node) {
    return escape(node[1]);
  }
}

function compileSection(context, node, cmd) {
  return "." + cmd + "("
    + dust.compileNode(context, node[1])
    + "," + dust.compileNode(context, node[2]) + ","
    + dust.compileNode(context, node[4]) + ","
    + dust.compileNode(context, node[3])
    + ")";
}

var escape = (typeof JSON === "undefined")
  ? function(str) { return "\"" + dust.escapeJs(str) + "\"" }
  : JSON.stringify;

})(typeof exports !== 'undefined' ? exports : window.dust);
(function(dust){

var parser = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
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
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "body": parse_body,
        "part": parse_part,
        "section": parse_section,
        "sec_tag_start": parse_sec_tag_start,
        "end_tag": parse_end_tag,
        "context": parse_context,
        "params": parse_params,
        "bodies": parse_bodies,
        "reference": parse_reference,
        "partial": parse_partial,
        "filters": parse_filters,
        "special": parse_special,
        "identifier": parse_identifier,
        "path": parse_path,
        "key": parse_key,
        "inline": parse_inline,
        "inline_part": parse_inline_part,
        "buffer": parse_buffer,
        "literal": parse_literal,
        "esc": parse_esc,
        "comment": parse_comment,
        "tag": parse_tag,
        "ld": parse_ld,
        "rd": parse_rd,
        "eol": parse_eol,
        "ws": parse_ws
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "body";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      var cache = {};
      
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
      
      function parse_body() {
        var cacheKey = "body@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1;
        var pos0;
        
        pos0 = pos;
        result0 = [];
        result1 = parse_part();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_part();
        }
        if (result0 !== null) {
          result0 = (function(offset, p) { return ["body"].concat(p) })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_part() {
        var cacheKey = "part@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        
        result0 = parse_comment();
        if (result0 === null) {
          result0 = parse_section();
          if (result0 === null) {
            result0 = parse_partial();
            if (result0 === null) {
              result0 = parse_special();
              if (result0 === null) {
                result0 = parse_reference();
                if (result0 === null) {
                  result0 = parse_buffer();
                }
              }
            }
          }
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_section() {
        var cacheKey = "section@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_sec_tag_start();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_ws();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_ws();
          }
          if (result1 !== null) {
            result2 = parse_rd();
            if (result2 !== null) {
              result3 = parse_body();
              if (result3 !== null) {
                result4 = parse_bodies();
                if (result4 !== null) {
                  result5 = parse_end_tag();
                  if (result5 !== null) {
                    result6 = (function(offset, t, b, e, n) { return t[1].text === n.text;})(pos, result0, result3, result4, result5) ? "" : null;
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, t, b, e, n) { e.push(["param", ["literal", "block"], b]); t.push(e); return t })(pos0, result0[0], result0[3], result0[4], result0[5]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          result0 = parse_sec_tag_start();
          if (result0 !== null) {
            if (input.charCodeAt(pos) === 47) {
              result1 = "/";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"/\"");
              }
            }
            if (result1 !== null) {
              result2 = parse_rd();
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = (function(offset, t) { t.push(["bodies"]); return t })(pos0, result0[0]);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("section");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_sec_tag_start() {
        var cacheKey = "sec_tag_start@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ld();
        if (result0 !== null) {
          if (/^[#?^<+@%]/.test(input.charAt(pos))) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[#?^<+@%]");
            }
          }
          if (result1 !== null) {
            result2 = parse_identifier();
            if (result2 !== null) {
              result3 = parse_context();
              if (result3 !== null) {
                result4 = parse_params();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, t, n, c, p) { return [t, n, c, p] })(pos0, result0[1], result0[2], result0[3], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_end_tag() {
        var cacheKey = "end_tag@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ld();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 47) {
            result1 = "/";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_identifier();
            if (result2 !== null) {
              result3 = parse_rd();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, n) { return n })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("end tag");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_context() {
        var cacheKey = "context@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        pos2 = pos;
        if (input.charCodeAt(pos) === 58) {
          result0 = ":";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\":\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_identifier();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos2;
          }
        } else {
          result0 = null;
          pos = pos2;
        }
        if (result0 !== null) {
          result0 = (function(offset, n) {return n})(pos1, result0[1]);
        }
        if (result0 === null) {
          pos = pos1;
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result0 = (function(offset, n) { return n ? ["context", n] : ["context"] })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_params() {
        var cacheKey = "params@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = pos;
        result0 = [];
        pos1 = pos;
        pos2 = pos;
        result1 = parse_ws();
        if (result1 !== null) {
          result2 = parse_key();
          if (result2 !== null) {
            if (input.charCodeAt(pos) === 61) {
              result3 = "=";
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("\"=\"");
              }
            }
            if (result3 !== null) {
              result4 = parse_identifier();
              if (result4 === null) {
                result4 = parse_inline();
              }
              if (result4 !== null) {
                result1 = [result1, result2, result3, result4];
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
        } else {
          result1 = null;
          pos = pos2;
        }
        if (result1 !== null) {
          result1 = (function(offset, k, v) {return ["param", ["literal", k], v]})(pos1, result1[1], result1[3]);
        }
        if (result1 === null) {
          pos = pos1;
        }
        while (result1 !== null) {
          result0.push(result1);
          pos1 = pos;
          pos2 = pos;
          result1 = parse_ws();
          if (result1 !== null) {
            result2 = parse_key();
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 61) {
                result3 = "=";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              if (result3 !== null) {
                result4 = parse_identifier();
                if (result4 === null) {
                  result4 = parse_inline();
                }
                if (result4 !== null) {
                  result1 = [result1, result2, result3, result4];
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          if (result1 !== null) {
            result1 = (function(offset, k, v) {return ["param", ["literal", k], v]})(pos1, result1[1], result1[3]);
          }
          if (result1 === null) {
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, p) { return ["params"].concat(p) })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("params");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_bodies() {
        var cacheKey = "bodies@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = pos;
        result0 = [];
        pos1 = pos;
        pos2 = pos;
        result1 = parse_ld();
        if (result1 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result2 = ":";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result2 !== null) {
            result3 = parse_key();
            if (result3 !== null) {
              result4 = parse_rd();
              if (result4 !== null) {
                result5 = parse_body();
                if (result5 !== null) {
                  result1 = [result1, result2, result3, result4, result5];
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
        } else {
          result1 = null;
          pos = pos2;
        }
        if (result1 !== null) {
          result1 = (function(offset, k, v) {return ["param", ["literal", k], v]})(pos1, result1[2], result1[4]);
        }
        if (result1 === null) {
          pos = pos1;
        }
        while (result1 !== null) {
          result0.push(result1);
          pos1 = pos;
          pos2 = pos;
          result1 = parse_ld();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 58) {
              result2 = ":";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\":\"");
              }
            }
            if (result2 !== null) {
              result3 = parse_key();
              if (result3 !== null) {
                result4 = parse_rd();
                if (result4 !== null) {
                  result5 = parse_body();
                  if (result5 !== null) {
                    result1 = [result1, result2, result3, result4, result5];
                  } else {
                    result1 = null;
                    pos = pos2;
                  }
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          if (result1 !== null) {
            result1 = (function(offset, k, v) {return ["param", ["literal", k], v]})(pos1, result1[2], result1[4]);
          }
          if (result1 === null) {
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, p) { return ["bodies"].concat(p) })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("bodies");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_reference() {
        var cacheKey = "reference@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ld();
        if (result0 !== null) {
          result1 = parse_identifier();
          if (result1 !== null) {
            result2 = parse_filters();
            if (result2 !== null) {
              result3 = parse_rd();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, n, f) { return ["reference", n, f] })(pos0, result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("reference");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_partial() {
        var cacheKey = "partial@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ld();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 62) {
            result1 = ">";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\">\"");
            }
          }
          if (result1 !== null) {
            pos2 = pos;
            result2 = parse_key();
            if (result2 !== null) {
              result2 = (function(offset, k) {return ["literal", k]})(pos2, result2);
            }
            if (result2 === null) {
              pos = pos2;
            }
            if (result2 === null) {
              result2 = parse_inline();
            }
            if (result2 !== null) {
              result3 = parse_context();
              if (result3 !== null) {
                result4 = parse_params();
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 47) {
                    result5 = "/";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"/\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse_rd();
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, n, c, p) { return ["partial", n, c, p] })(pos0, result0[2], result0[3], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("partial");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_filters() {
        var cacheKey = "filters@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = pos;
        result0 = [];
        pos1 = pos;
        pos2 = pos;
        if (input.charCodeAt(pos) === 124) {
          result1 = "|";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"|\"");
          }
        }
        if (result1 !== null) {
          result2 = parse_key();
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = pos2;
          }
        } else {
          result1 = null;
          pos = pos2;
        }
        if (result1 !== null) {
          result1 = (function(offset, n) {return n})(pos1, result1[1]);
        }
        if (result1 === null) {
          pos = pos1;
        }
        while (result1 !== null) {
          result0.push(result1);
          pos1 = pos;
          pos2 = pos;
          if (input.charCodeAt(pos) === 124) {
            result1 = "|";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"|\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_key();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          if (result1 !== null) {
            result1 = (function(offset, n) {return n})(pos1, result1[1]);
          }
          if (result1 === null) {
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, f) { return ["filters"].concat(f) })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("filters");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_special() {
        var cacheKey = "special@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ld();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 126) {
            result1 = "~";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"~\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_key();
            if (result2 !== null) {
              result3 = parse_rd();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return ["special", k] })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("special");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_identifier() {
        var cacheKey = "identifier@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        var pos0;
        
        reportFailures++;
        pos0 = pos;
        result0 = parse_path();
        if (result0 !== null) {
          result0 = (function(offset, p) { return wrap(["path"].concat(p), cacheKey) })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          result0 = parse_key();
          if (result0 !== null) {
            result0 = (function(offset, k) { return wrap(["key", k], cacheKey) })(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("identifier");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_path() {
        var cacheKey = "path@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3;
        var pos0, pos1, pos2, pos3;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_key();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          pos2 = pos;
          pos3 = pos;
          if (input.charCodeAt(pos) === 46) {
            result2 = ".";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result2 !== null) {
            result3 = parse_key();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos3;
            }
          } else {
            result2 = null;
            pos = pos3;
          }
          if (result2 !== null) {
            result2 = (function(offset, k) {return k})(pos2, result2[1]);
          }
          if (result2 === null) {
            pos = pos2;
          }
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              pos2 = pos;
              pos3 = pos;
              if (input.charCodeAt(pos) === 46) {
                result2 = ".";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\".\"");
                }
              }
              if (result2 !== null) {
                result3 = parse_key();
                if (result3 !== null) {
                  result2 = [result2, result3];
                } else {
                  result2 = null;
                  pos = pos3;
                }
              } else {
                result2 = null;
                pos = pos3;
              }
              if (result2 !== null) {
                result2 = (function(offset, k) {return k})(pos2, result2[1]);
              }
              if (result2 === null) {
                pos = pos2;
              }
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, k, d) {
            if (k) { d.unshift(k); return [false, d]; }
            return [true, d];
          })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          if (input.charCodeAt(pos) === 46) {
            result0 = ".";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result0 !== null) {
            result0 = (function(offset) { return [true, []] })(pos0);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("path");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_key() {
        var cacheKey = "key@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (/^[a-zA-Z_$]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z_$]");
          }
        }
        if (result0 !== null) {
          result1 = [];
          if (/^[0-9a-zA-Z_$]/.test(input.charAt(pos))) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[0-9a-zA-Z_$]");
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            if (/^[0-9a-zA-Z_$]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9a-zA-Z_$]");
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, h, t) { return h + t.join('') })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("key");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_inline() {
        var cacheKey = "inline@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 34) {
          result0 = "\"";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\"\"");
          }
        }
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 34) {
            result1 = "\"";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\"\"");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) { return ["literal", ""] })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 34) {
            result0 = "\"";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\"\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_literal();
            if (result1 !== null) {
              if (input.charCodeAt(pos) === 34) {
                result2 = "\"";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\\"\"");
                }
              }
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = (function(offset, l) { return ["literal", l] })(pos0, result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 34) {
              result0 = "\"";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\"\"");
              }
            }
            if (result0 !== null) {
              result2 = parse_inline_part();
              if (result2 !== null) {
                result1 = [];
                while (result2 !== null) {
                  result1.push(result2);
                  result2 = parse_inline_part();
                }
              } else {
                result1 = null;
              }
              if (result1 !== null) {
                if (input.charCodeAt(pos) === 34) {
                  result2 = "\"";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\\"\"");
                  }
                }
                if (result2 !== null) {
                  result0 = [result0, result1, result2];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = (function(offset, p) { return ["body"].concat(p) })(pos0, result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("inline");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_inline_part() {
        var cacheKey = "inline_part@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        var pos0;
        
        result0 = parse_special();
        if (result0 === null) {
          result0 = parse_reference();
          if (result0 === null) {
            pos0 = pos;
            result0 = parse_literal();
            if (result0 !== null) {
              result0 = (function(offset, l) { return ["buffer", l] })(pos0, result0);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_buffer() {
        var cacheKey = "buffer@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2, pos3;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_eol();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_ws();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_ws();
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, e, w) { return ["format", e, w.join('')] })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          pos2 = pos;
          pos3 = pos;
          reportFailures++;
          result1 = parse_tag();
          reportFailures--;
          if (result1 === null) {
            result1 = "";
          } else {
            result1 = null;
            pos = pos3;
          }
          if (result1 !== null) {
            pos3 = pos;
            reportFailures++;
            result2 = parse_eol();
            reportFailures--;
            if (result2 === null) {
              result2 = "";
            } else {
              result2 = null;
              pos = pos3;
            }
            if (result2 !== null) {
              pos3 = pos;
              reportFailures++;
              result3 = parse_comment();
              reportFailures--;
              if (result3 === null) {
                result3 = "";
              } else {
                result3 = null;
                pos = pos3;
              }
              if (result3 !== null) {
                if (input.length > pos) {
                  result4 = input.charAt(pos);
                  pos++;
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("any character");
                  }
                }
                if (result4 !== null) {
                  result1 = [result1, result2, result3, result4];
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          if (result1 !== null) {
            result1 = (function(offset, c) {return c})(pos1, result1[3]);
          }
          if (result1 === null) {
            pos = pos1;
          }
          if (result1 !== null) {
            result0 = [];
            while (result1 !== null) {
              result0.push(result1);
              pos1 = pos;
              pos2 = pos;
              pos3 = pos;
              reportFailures++;
              result1 = parse_tag();
              reportFailures--;
              if (result1 === null) {
                result1 = "";
              } else {
                result1 = null;
                pos = pos3;
              }
              if (result1 !== null) {
                pos3 = pos;
                reportFailures++;
                result2 = parse_eol();
                reportFailures--;
                if (result2 === null) {
                  result2 = "";
                } else {
                  result2 = null;
                  pos = pos3;
                }
                if (result2 !== null) {
                  pos3 = pos;
                  reportFailures++;
                  result3 = parse_comment();
                  reportFailures--;
                  if (result3 === null) {
                    result3 = "";
                  } else {
                    result3 = null;
                    pos = pos3;
                  }
                  if (result3 !== null) {
                    if (input.length > pos) {
                      result4 = input.charAt(pos);
                      pos++;
                    } else {
                      result4 = null;
                      if (reportFailures === 0) {
                        matchFailed("any character");
                      }
                    }
                    if (result4 !== null) {
                      result1 = [result1, result2, result3, result4];
                    } else {
                      result1 = null;
                      pos = pos2;
                    }
                  } else {
                    result1 = null;
                    pos = pos2;
                  }
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
              if (result1 !== null) {
                result1 = (function(offset, c) {return c})(pos1, result1[3]);
              }
              if (result1 === null) {
                pos = pos1;
              }
            }
          } else {
            result0 = null;
          }
          if (result0 !== null) {
            result0 = (function(offset, b) { return ["buffer", b.join('')] })(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("buffer");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_literal() {
        var cacheKey = "literal@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3;
        var pos0, pos1, pos2, pos3;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        pos2 = pos;
        pos3 = pos;
        reportFailures++;
        result1 = parse_tag();
        reportFailures--;
        if (result1 === null) {
          result1 = "";
        } else {
          result1 = null;
          pos = pos3;
        }
        if (result1 !== null) {
          pos3 = pos;
          reportFailures++;
          result2 = parse_eol();
          reportFailures--;
          if (result2 === null) {
            result2 = "";
          } else {
            result2 = null;
            pos = pos3;
          }
          if (result2 !== null) {
            result3 = parse_esc();
            if (result3 === null) {
              if (/^[^"]/.test(input.charAt(pos))) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[^\"]");
                }
              }
            }
            if (result3 !== null) {
              result1 = [result1, result2, result3];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
        } else {
          result1 = null;
          pos = pos2;
        }
        if (result1 !== null) {
          result1 = (function(offset, c) {return c})(pos1, result1[2]);
        }
        if (result1 === null) {
          pos = pos1;
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            pos1 = pos;
            pos2 = pos;
            pos3 = pos;
            reportFailures++;
            result1 = parse_tag();
            reportFailures--;
            if (result1 === null) {
              result1 = "";
            } else {
              result1 = null;
              pos = pos3;
            }
            if (result1 !== null) {
              pos3 = pos;
              reportFailures++;
              result2 = parse_eol();
              reportFailures--;
              if (result2 === null) {
                result2 = "";
              } else {
                result2 = null;
                pos = pos3;
              }
              if (result2 !== null) {
                result3 = parse_esc();
                if (result3 === null) {
                  if (/^[^"]/.test(input.charAt(pos))) {
                    result3 = input.charAt(pos);
                    pos++;
                  } else {
                    result3 = null;
                    if (reportFailures === 0) {
                      matchFailed("[^\"]");
                    }
                  }
                }
                if (result3 !== null) {
                  result1 = [result1, result2, result3];
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
            if (result1 !== null) {
              result1 = (function(offset, c) {return c})(pos1, result1[2]);
            }
            if (result1 === null) {
              pos = pos1;
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, b) { return b.join('') })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("literal");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_esc() {
        var cacheKey = "esc@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 2) === "\\\"") {
          result0 = "\\\"";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\\\\\"\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) { return '"' })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_comment() {
        var cacheKey = "comment@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3;
        var pos0, pos1, pos2, pos3, pos4;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 2) === "{!") {
          result0 = "{!";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{!\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          pos3 = pos;
          pos4 = pos;
          reportFailures++;
          if (input.substr(pos, 2) === "!}") {
            result2 = "!}";
            pos += 2;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"!}\"");
            }
          }
          reportFailures--;
          if (result2 === null) {
            result2 = "";
          } else {
            result2 = null;
            pos = pos4;
          }
          if (result2 !== null) {
            if (input.length > pos) {
              result3 = input.charAt(pos);
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("any character");
              }
            }
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos3;
            }
          } else {
            result2 = null;
            pos = pos3;
          }
          if (result2 !== null) {
            result2 = (function(offset, c) {return c})(pos2, result2[1]);
          }
          if (result2 === null) {
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            pos3 = pos;
            pos4 = pos;
            reportFailures++;
            if (input.substr(pos, 2) === "!}") {
              result2 = "!}";
              pos += 2;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"!}\"");
              }
            }
            reportFailures--;
            if (result2 === null) {
              result2 = "";
            } else {
              result2 = null;
              pos = pos4;
            }
            if (result2 !== null) {
              if (input.length > pos) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos3;
              }
            } else {
              result2 = null;
              pos = pos3;
            }
            if (result2 !== null) {
              result2 = (function(offset, c) {return c})(pos2, result2[1]);
            }
            if (result2 === null) {
              pos = pos2;
            }
          }
          if (result1 !== null) {
            if (input.substr(pos, 2) === "!}") {
              result2 = "!}";
              pos += 2;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"!}\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, c) { return ["comment", c.join('')] })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("comment");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_tag() {
        var cacheKey = "tag@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        result0 = parse_ld();
        if (result0 !== null) {
          if (/^[#?^><+%:@\/~%]/.test(input.charAt(pos))) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[#?^><+%:@\\/~%]");
            }
          }
          if (result1 !== null) {
            pos1 = pos;
            pos2 = pos;
            reportFailures++;
            result3 = parse_rd();
            reportFailures--;
            if (result3 === null) {
              result3 = "";
            } else {
              result3 = null;
              pos = pos2;
            }
            if (result3 !== null) {
              pos2 = pos;
              reportFailures++;
              result4 = parse_eol();
              reportFailures--;
              if (result4 === null) {
                result4 = "";
              } else {
                result4 = null;
                pos = pos2;
              }
              if (result4 !== null) {
                if (input.length > pos) {
                  result5 = input.charAt(pos);
                  pos++;
                } else {
                  result5 = null;
                  if (reportFailures === 0) {
                    matchFailed("any character");
                  }
                }
                if (result5 !== null) {
                  result3 = [result3, result4, result5];
                } else {
                  result3 = null;
                  pos = pos1;
                }
              } else {
                result3 = null;
                pos = pos1;
              }
            } else {
              result3 = null;
              pos = pos1;
            }
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                pos1 = pos;
                pos2 = pos;
                reportFailures++;
                result3 = parse_rd();
                reportFailures--;
                if (result3 === null) {
                  result3 = "";
                } else {
                  result3 = null;
                  pos = pos2;
                }
                if (result3 !== null) {
                  pos2 = pos;
                  reportFailures++;
                  result4 = parse_eol();
                  reportFailures--;
                  if (result4 === null) {
                    result4 = "";
                  } else {
                    result4 = null;
                    pos = pos2;
                  }
                  if (result4 !== null) {
                    if (input.length > pos) {
                      result5 = input.charAt(pos);
                      pos++;
                    } else {
                      result5 = null;
                      if (reportFailures === 0) {
                        matchFailed("any character");
                      }
                    }
                    if (result5 !== null) {
                      result3 = [result3, result4, result5];
                    } else {
                      result3 = null;
                      pos = pos1;
                    }
                  } else {
                    result3 = null;
                    pos = pos1;
                  }
                } else {
                  result3 = null;
                  pos = pos1;
                }
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              result3 = parse_rd();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        if (result0 === null) {
          result0 = parse_reference();
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_ld() {
        var cacheKey = "ld@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        
        if (input.charCodeAt(pos) === 123) {
          result0 = "{";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{\"");
          }
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_rd() {
        var cacheKey = "rd@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        
        if (input.charCodeAt(pos) === 125) {
          result0 = "}";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"}\"");
          }
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_eol() {
        var cacheKey = "eol@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        
        if (input.charCodeAt(pos) === 10) {
          result0 = "\n";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\n\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 2) === "\r\n") {
            result0 = "\r\n";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\r\\n\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 13) {
              result0 = "\r";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\r\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 8232) {
                result0 = "\u2028";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\u2028\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 8233) {
                  result0 = "\u2029";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\u2029\"");
                  }
                }
              }
            }
          }
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_ws() {
        var cacheKey = "ws@" + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var result0;
        
        if (/^[\t\x0B\f \xA0\uFEFF]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\t\\x0B\\f \\xA0\\uFEFF]");
          }
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
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
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
        function wrap(node, ck) {
          node['text'] = input.substring(ck.split('@')[1], pos);
          return node;
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
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new parser.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
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
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();

dust.parse = parser.parse;

})(typeof exports !== 'undefined' ? exports : window.dust);