(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('./util');

var dl = {
  load:      require('./import/load'),
  read:      require('./import/read'),
  type:      require('./import/type'),
  bins:      require('./bins/bins'),
  $bin:      require('./bins/histogram').$bin,
  groupby:   require('./aggregate/groupby'),
  histogram: require('./bins/histogram').histogram,
  summary:   require('./summary'),
  template:  require('./template'),
  timeunits: require('./time-units')
};

util.extend(dl, util);
util.extend(dl, require('./generate'));
util.extend(dl, require('./stats'));
util.extend(dl, require('./import/readers'));

module.exports = dl;
},{"./aggregate/groupby":6,"./bins/bins":8,"./bins/histogram":9,"./generate":10,"./import/load":17,"./import/read":18,"./import/readers":19,"./import/type":20,"./stats":21,"./summary":22,"./template":23,"./time-units":24,"./util":25}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
var util = require('../util'),
    Measures = require('./measures'),
    Collector = require('./collector');

function Aggregator() {
  this._cells = {};
  this._aggr = [];
  this._stream = false;
}

var Flags = Aggregator.Flags = {
  ADD_CELL: 1,
  MOD_CELL: 2
};

var proto = Aggregator.prototype;

// Parameters

proto.stream = function(v) {
  if (v == null) return this._stream;
  this._stream = !!v;
  this._aggr = [];
  return this;
};

// Input: array of objects of the form
// {name: string, get: function}
proto.groupby = function(dims) {
  this._dims = util.array(dims).map(function(d, i) {
    d = util.isString(d) ? {name: d, get: util.$(d)}
      : util.isFunction(d) ? {name: util.name(d) || d.name || ('_' + i), get: d}
      : (d.name && util.isFunction(d.get)) ? d : null;
    if (d == null) throw 'Invalid groupby argument: ' + d;
    return d;
  });
  return this;
};

// Input: array of objects of the form
// {name: string, ops: [string, ...]}
proto.summarize = function(fields) {
  fields = summarize_args(fields);
  var aggr = (this._aggr = []),
      m, f, i, j, op, as;

  for (i=0; i<fields.length; ++i) {
    for (j=0, m=[], f=fields[i]; j<f.ops.length; ++j) {
      op = f.ops[j];
      as = (f.as && f.as[j]) || (op + (f.name==='*' ? '' : '_'+f.name));
      m.push(Measures[op](as));
    }
    aggr.push({
      name: f.name,
      measures: Measures.create(
        m,
        this._stream, // streaming remove flag
        f.get || util.$(f.name), // input tuple getter
        this._assign) // output tuple setter
    });
  }
  return this;
};

// Convenience method to summarize by count
proto.count = function() {
  return this.summarize({'*':'count'});
};

// Override to perform custom tuple value assignment
proto._assign = function(object, name, value) {
  object[name] = value;
};

proto.accessors = function(fields) {
  var aggr = this._aggr, i, n, f;
  for (i=0, n=aggr.length; i<n; ++i) {
    if ((f = fields[aggr[i].name])) {
      aggr[i].measures.prototype.get = util.$(f);
    }
  }
  return this;
};

function summarize_args(fields) {
  if (util.isArray(fields)) { return fields; }
  if (fields == null) { return []; }
  var a = [], name, ops;
  for (name in fields) {
    ops = util.array(fields[name]);
    a.push({name: name, ops: ops});
  }
  return a;
}

// Cell Management

proto.clear = function() {
  return (this._cells = {}, this);
};

proto._keys = function(x) {
  var d = this._dims,
      n = d.length,
      k = Array(n), i;
  for (i=0; i<n; ++i) { k[i] = d[i].get(x); }
  return {key: util.keystr(k), keys: k};
};

proto._cell = function(x) {
  var k = this._keys(x);
  return this._cells[k.key] || (this._cells[k.key] = this._newcell(x, k));
};

proto._newcell = function(x, k) {
  var cell = {
    num:   0,
    tuple: this._newtuple(x, k),
    flag:  Flags.ADD_CELL,
    aggs:  {}
  };

  var aggr = this._aggr, i;
  for (i=0; i<aggr.length; ++i) {
    cell.aggs[aggr[i].name] = new aggr[i].measures(cell, cell.tuple);
  }
  if (cell.collect) {
    cell.data = new Collector();
  }

  return cell;
};

proto._newtuple = function(x) {
  var dims = this._dims,
      t = {}, i, n;
  for(i=0, n=dims.length; i<n; ++i) {
    t[dims[i].name] = dims[i].get(x);
  }
  return this._ingest(t);
};

// Override to perform custom tuple ingestion
proto._ingest = util.identity;

// Process Tuples

proto.add = function(x) {
  var cell = this._cell(x),
      aggr = this._aggr, i;

  cell.num += 1;
  if (cell.collect) cell.data.add(x);
  for (i=0; i<aggr.length; ++i) {
    cell.aggs[aggr[i].name].add(x);
  }
  cell.flag |= Flags.MOD_CELL;
};

proto.rem = function(x) {
  var cell = this._cell(x),
      aggr = this._aggr, i;

  cell.num -= 1;
  if (cell.collect) cell.data.rem(x);
  for (i=0; i<aggr.length; ++i) {
    cell.aggs[aggr[i].name].rem(x);
  }
  cell.flag |= Flags.MOD_CELL;
};

proto.result = function() {
  var results = [],
      aggr = this._aggr,
      cell, i, k;

  for (k in this._cells) {
    cell = this._cells[k];
    if (cell.num > 0) {
      for (i=0; i<aggr.length; ++i) {
        cell.aggs[aggr[i].name].set();
      }
      results.push(cell.tuple);
    }
    cell.flag = 0;
  }

  return results;
};

proto.execute = function(input) {
  return this.clear().insert(input).result();
};

proto.insert = function(input) {
  for (var i=0; i<input.length; ++i) {
    this.add(input[i]);
  }
  return this;
};

proto.remove = function(input) {
  if (!this._stream) {
    throw 'Aggregator not configured for streaming removes.' +
      ' Call stream(true) prior to calling summarize.';
  }
  for (var i=0; i<input.length; ++i) {
    this.rem(input[i]);
  }
  return this;
};

module.exports = Aggregator;
},{"../util":25,"./collector":5,"./measures":7}],5:[function(require,module,exports){
var stats = require('../stats');

var REM = '$!_rem_!#';

function Collector() {
  this._add = [];
  this._rem = [];
}

var proto = Collector.prototype;

proto.add = function(v) {
  this._add.push(v);
};

proto.rem = function(v) {
  this._rem.push(v);
};

proto.values = function() {
  if (this._rem.length === 0) return this._add;
  var a = this._add,
      r = this._rem,
      x = Array(a.length - r.length),
      i, j, n;

  for (i=0, n=r.length; i<n; ++i) {
    r[i][REM] = 1;
  }
  for (i=0, j=0, n=a.length; i<n; ++i) {
    if (!a[i][REM]) { x[j++] = a[i]; }
  }
  for (i=0, n=r.length; i<n; ++i) {
    delete r[i][REM];
  }
  
  this._rem = [];
  this._f = null;
  return (this._add = x);
};

// memoizing statistics methods

proto.extent = function(get) {
  if (this._f !== get || !this._ext) {
    var v = this.values(),
        i = stats.extent.index(v, get);
    this._ext = [v[i[0]], v[i[1]]];
    this._f = get;    
  }
  return this._ext;
};
proto.min = function(f) { return this.extent(f)[0]; };
proto.max = function(f) { return this.extent(f)[1]; };

proto.quartile = function(get) {
  if (this._f !== get || !this._q) {
    this._q = stats.quartile(this.values(), get);
    this._f = get;    
  }
  return this._q;
};
proto.q1 = function(f) { return this.quartile(f)[0]; };
proto.q2 = function(f) { return this.quartile(f)[1]; };
proto.q3 = function(f) { return this.quartile(f)[2]; };

module.exports = Collector;
},{"../stats":21}],6:[function(require,module,exports){
var util = require('../util');
var Aggregator = require('./aggregator');

module.exports = function() {
  // flatten arguments into a single array
  var args = Array.prototype.reduce.call(arguments, function(a, x) {
    return a.concat(util.array(x));
  }, []);
  // create and return an aggregator
  return new Aggregator()
    .groupby(args)
    .summarize({'*':'data'});
};

},{"../util":25,"./aggregator":4}],7:[function(require,module,exports){
var util = require('../util');

var types = {
  'count': measure({
    name: 'count',
    set:  'cell.num'
  }),
  'missing': measure({
    name: 'missing',
    set:  'this.missing'
  }),
  'valid': measure({
    name: 'valid',
    set:  'this.valid'
  }),
  'data': measure({
    name: 'data',
    init: 'cell.collect = true;',
    set:  'cell.data.values()', idx: -1
  }),
  'sum': measure({
    name: 'sum',
    init: 'this.sum = 0;',
    add:  'this.sum += v;',
    rem:  'this.sum -= v;',
    set:  'this.sum'
  }),
  'mean': measure({
    name: 'mean',
    init: 'this.mean = 0;',
    add:  'var d = v - this.mean; this.mean += d / this.valid;',
    rem:  'var d = v - this.mean; this.mean -= d / this.valid;',
    set:  'this.mean'
  }),
  'avg': measure({
    name: 'avg',
    set:  'this.mean',
    req:  ['mean'], idx: 1
  }),
  'var': measure({
    name: 'var',
    init: 'this.dev = 0;',
    add:  'this.dev += d * (v - this.mean);',
    rem:  'this.dev -= d * (v - this.mean);',
    set:  'this.dev / (this.valid-1)',
    req:  ['mean'], idx: 1
  }),
  'varp': measure({
    name: 'varp',
    set:  'this.dev / this.valid',
    req:  ['var'], idx: 2
  }),
  'stdev': measure({
    name: 'stdev',
    set:  'Math.sqrt(this.dev / (this.valid-1))',
    req:  ['var'], idx: 2
  }),
  'stdevp': measure({
    name: 'stdevp',
    set:  'Math.sqrt(this.dev / this.valid)',
    req:  ['var'], idx: 2
  }),
  'median': measure({
    name: 'median',
    set:  'cell.data.q2(this.get)',
    req:  ['data'], idx: 3
  }),
  'q1': measure({
    name: 'q1',
    set:  'cell.data.q1(this.get)',
    req:  ['data'], idx: 3
  }),
  'q3': measure({
    name: 'q3',
    set:  'cell.data.q3(this.get)',
    req:  ['data'], idx: 3
  }),
  'distinct': measure({
    name: 'distinct',
    set:  'this.distinct(cell.data.values(), this.get)',
    req:  ['data'], idx: 3
  }),
  'argmin': measure({
    name: 'argmin',
    add:  'if (v < this.min) this.argmin = t;',
    rem:  'this.argmin = null;',
    set:  'this.argmin || cell.data.min(this.get)',
    req:  ['min'], str: ['data'], idx: 3
  }),
  'argmax': measure({
    name: 'argmax',
    add:  'if (v > this.max) this.argmax = t;',
    rem:  'this.argmax = null;',
    set:  'this.argmax || cell.data.max(this.get)',
    req:  ['max'], str: ['data'], idx: 3
  }),
  'min': measure({
    name: 'min',
    init: 'this.min = +Infinity;',
    add:  'if (v < this.min) this.min = v;',
    rem:  'this.min = NaN;',
    set:  'this.min = (isNaN(this.min) ? this.get(cell.data.min(this.get)) : this.min)',
    str:  ['data'], idx: 4
  }),
  'max': measure({
    name: 'max',
    init: 'this.max = -Infinity;',
    add:  'if (v > this.max) this.max = v;',
    rem:  'this.max = null;',
    set:  'this.max = (isNaN(this.max) ? this.get(cell.data.max(this.get)) : this.max)',
    str:  ['data'], idx: 4
  }),
  'modeskew': measure({
    name: 'modeskew',
    set:  'this.dev===0 ? 0 : (this.mean - cell.data.q2(this.get)) / Math.sqrt(this.dev/(this.valid-1))',
    req:  ['mean', 'stdev', 'median'], idx: 5
  })
};

function measure(base) {
  return function(out) {
    var m = util.extend({init:'', add:'', rem:'', idx:0}, base);
    m.out = out || base.name;
    return m;
  };
}

function resolve(agg, stream) {
  function collect(m, a) {
    function helper(r) { if (!m[r]) collect(m, m[r] = types[r]()); }
    if (a.req) a.req.forEach(helper);
    if (stream && a.str) a.str.forEach(helper);
    return m;
  }
  var map = agg.reduce(
    collect,
    agg.reduce(function(m, a) { return (m[a.name] = a, m); }, {})
  );
  return util.vals(map).sort(function(a, b) { return a.idx - b.idx; });
}

function create(agg, stream, accessor, mutator) {
  var all = resolve(agg, stream),
      ctr = 'this.cell = cell; this.tuple = t; this.valid = 0; this.missing = 0;',
      add = 'if (v==null) this.missing++; if (!this.isValid(v)) return; this.valid++;',
      rem = 'if (v==null) this.missing--; if (!this.isValid(v)) return; this.valid--;',
      set = 'var t = this.tuple; var cell = this.cell;';

  all.forEach(function(a) {
    if (a.idx < 0) {
      ctr = a.init + ctr;
      add = a.add + add;
      rem = a.rem + rem;
    } else {
      ctr += a.init;
      add += a.add;
      rem += a.rem;
    }
  });
  agg.slice()
    .sort(function(a, b) { return a.idx - b.idx; })
    .forEach(function(a) {
      set += 'this.assign(t,\''+a.out+'\','+a.set+');';
    });
  set += 'return t;';

  /* jshint evil: true */
  ctr = Function('cell', 't', ctr);
  ctr.prototype.assign = mutator;
  ctr.prototype.add = Function('t', 'var v = this.get(t);' + add);
  ctr.prototype.rem = Function('t', 'var v = this.get(t);' + rem);
  ctr.prototype.set = Function(set);
  ctr.prototype.get = accessor;
  ctr.prototype.mod = mod;
  ctr.prototype.distinct = require('../stats').count.distinct;
  ctr.prototype.isValid = util.isValid;
  return ctr;
}

function mod(v_new, v_old) {
  if (v_old === undefined || v_old === v_new) return;
  this.rem(v_old);
  this.add(v_new);
}

types.create = create;
module.exports = types;
},{"../stats":21,"../util":25}],8:[function(require,module,exports){
var util = require('../util');
var units = require('../time-units');
var EPSILON = 1e-15;

function bins(opt) {
  opt = opt || {};

  // determine range
  var maxb = opt.maxbins || 15,
      base = opt.base || 10,
      logb = Math.log(base),
      div = opt.div || [5, 2],      
      min = opt.min,
      max = opt.max,
      span = max - min,
      step, level, minstep, precision, v, i, eps;

  if (opt.step) {
    // if step size is explicitly given, use that
    step = opt.step;
  } else if (opt.steps) {
    // if provided, limit choice to acceptable step sizes
    step = opt.steps[Math.min(
      opt.steps.length - 1,
      bisect(opt.steps, span/maxb, 0, opt.steps.length)
    )];
  } else {
    // else use span to determine step size
    level = Math.ceil(Math.log(maxb) / logb);
    minstep = opt.minstep || 0;
    step = Math.max(
      minstep,
      Math.pow(base, Math.round(Math.log(span) / logb) - level)
    );
    
    // increase step size if too many bins
    do { step *= base; } while (Math.ceil(span/step) > maxb);

    // decrease step size if allowed
    for (i=0; i<div.length; ++i) {
      v = step / div[i];
      if (v >= minstep && span / v <= maxb) step = v;
    }
  }

  // update precision, min and max
  v = Math.log(step);
  precision = v >= 0 ? 0 : ~~(-v / logb) + 1;
  eps = Math.pow(base, -precision - 1);
  min = Math.min(min, Math.floor(min / step + eps) * step);
  max = Math.ceil(max / step) * step;

  return {
    start: min,
    stop:  max,
    step:  step,
    unit:  {precision: precision},
    value: value,
    index: index
  };
}

function bisect(a, x, lo, hi) {
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (util.cmp(a[mid], x) < 0) { lo = mid + 1; }
    else { hi = mid; }
  }
  return lo;
}

function value(v) {
  return this.step * Math.floor(v / this.step + EPSILON);
}

function index(v) {
  return Math.floor((v - this.start) / this.step + EPSILON);
}

function date_value(v) {
  return this.unit.date(value.call(this, v));
}

function date_index(v) {
  return index.call(this, this.unit.unit(v));
}

bins.date = function(opt) {
  opt = opt || {};

  // find time step, then bin
  var dmin = opt.min,
      dmax = opt.max,
      maxb = opt.maxbins || 20,
      minb = opt.minbins || 4,
      span = (+dmax) - (+dmin),
      unit = opt.unit ? units[opt.unit] : units.find(span, minb, maxb),
      spec = bins({
        min:     unit.min != null ? unit.min : unit.unit(dmin),
        max:     unit.max != null ? unit.max : unit.unit(dmax),
        maxbins: maxb,
        minstep: unit.minstep,
        steps:   unit.step
      });

  spec.unit = unit;
  spec.index = date_index;
  if (!opt.raw) spec.value = date_value;
  return spec;
};

module.exports = bins;

},{"../time-units":24,"../util":25}],9:[function(require,module,exports){
var stats = require('../stats');
var type = require('../import/type');
var util = require('../util');
var gen = require('../generate');
var bins = require('./bins');

var qtype = {
  'integer': 1,
  'number': 1,
  'date': 1
};

function $bin(values, f, opt) {
  opt = options(values, f, opt);
  var b = spec(opt);
  return !b ? (opt.accessor || util.identity) :
    util.$func('bin', b.unit.unit ?
      function(x) { return b.value(b.unit.unit(x)); } :
      function(x) { return b.value(x); }
    )(opt.accessor);
}

function histogram(values, f, opt) {
  opt = options(values, f, opt);
  var b = spec(opt);
  return b ?
    numerical(values, opt.accessor, b) :
    categorical(values, opt.accessor, opt && opt.sort);
}

function spec(opt) {
  var t = opt.type, b = null;
  if (t == null || qtype[t]) {
    if (t === 'integer' && opt.minstep == null) opt.minstep = 1;
    b = (t === 'date') ? bins.date(opt) : bins(opt);
  }
  return b;
}

function options() {
  var a = arguments,
      i = 0,
      values = util.isArray(a[i]) ? a[i++] : null,
      f = util.isFunction(a[i]) || util.isString(a[i]) ? util.$(a[i++]) : null,
      opt = util.extend({}, a[i]);
  
  if (values) {
    opt.type = opt.type || type(values, f);
    if (qtype[opt.type]) {
      var ext = stats.extent(values, f);
      opt = util.extend({min: ext[0], max: ext[1]}, opt);
    }
  }
  if (f) { opt.accessor = f; }
  return opt;
}

function numerical(values, f, b) {
  var h = gen.range(b.start, b.stop + b.step/2, b.step)
    .map(function(v) { return {value: b.value(v), count: 0}; });

  for (var i=0, v, j; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      j = b.index(v);
      if (j < 0 || j >= h.length || !isFinite(j)) continue;
      h[j].count += 1;
    }
  }
  h.bins = b;
  return h;
}

function categorical(values, f, sort) {
  var u = stats.unique(values, f), c = u.counts;
  return u.map(function(k) { return {value: k, count: c[k]}; })
    .sort(util.comparator(sort ? '-count' : '+value'));
}

module.exports = {
  $bin: $bin,
  histogram: histogram
};
},{"../generate":10,"../import/type":20,"../stats":21,"../util":25,"./bins":8}],10:[function(require,module,exports){
var gen = module.exports = {};

gen.repeat = function(val, n) {
  var a = Array(n), i;
  for (i=0; i<n; ++i) a[i] = val;
  return a;
};

gen.zeros = function(n) {
  return gen.repeat(0, n);
};

gen.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step == Infinity) throw new Error('Infinite range');
  var range = [], i = -1, j;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
  else while ((j = start + step * ++i) < stop) range.push(j);
  return range;
};

gen.random = {};

gen.random.uniform = function(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  var d = max - min;
  var f = function() {
    return min + d * Math.random();
  };
  f.samples = function(n) { return gen.zeros(n).map(f); };
  return f;
};

gen.random.integer = function(a, b) {
  if (b === undefined) {
    b = a;
    a = 0;
  }
  var d = b - a;
  var f = function() {
    return a + Math.floor(d * Math.random());
  };
  f.samples = function(n) { return gen.zeros(n).map(f); };
  return f;
};

gen.random.normal = function(mean, stdev) {
  mean = mean || 0;
  stdev = stdev || 1;
  var next;
  var f = function() {
    var x = 0, y = 0, rds, c;
    if (next !== undefined) {
      x = next;
      next = undefined;
      return x;
    }
    do {
      x = Math.random()*2-1;
      y = Math.random()*2-1;
      rds = x*x + y*y;
    } while (rds === 0 || rds > 1);
    c = Math.sqrt(-2*Math.log(rds)/rds); // Box-Muller transform
    next = mean + y*c*stdev;
    return mean + x*c*stdev;
  };
  f.samples = function(n) { return gen.zeros(n).map(f); };
  return f;
};
},{}],11:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

module.exports = function(data) {
  var d = d3.csv.parse(data ? data.toString() : data);
  return d;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],12:[function(require,module,exports){
module.exports = {
  json: require('./json'),
  csv: require('./csv'),
  tsv: require('./tsv'),
  topojson: require('./topojson'),
  treejson: require('./treejson')
};
},{"./csv":11,"./json":13,"./topojson":14,"./treejson":15,"./tsv":16}],13:[function(require,module,exports){
var util = require('../../util');

module.exports = function(data, format) {
  var d = util.isObject(data) && !util.isBuffer(data) ?
    data : JSON.parse(data);
  if (format && format.property) {
    d = util.accessor(format.property)(d);
  }
  return d;
};

},{"../../util":25}],14:[function(require,module,exports){
(function (global){
var json = require('./json');
var topojson = (typeof window !== "undefined" ? window.topojson : typeof global !== "undefined" ? global.topojson : null);

module.exports = function(data, format) {
  if (topojson == null) { throw Error('TopoJSON library not loaded.'); }

  var t = json(data, format), obj;

  if (format && format.feature) {
    if ((obj = t.objects[format.feature])) {
      return topojson.feature(t, obj).features;
    } else {
      throw Error('Invalid TopoJSON object: '+format.feature);
    }
  } else if (format && format.mesh) {
    if ((obj = t.objects[format.mesh])) {
      return [topojson.mesh(t, t.objects[format.mesh])];
    } else {
      throw Error('Invalid TopoJSON object: ' + format.mesh);
    }
  } else {
    throw Error('Missing TopoJSON feature or mesh parameter.');
  }

  return [];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./json":13}],15:[function(require,module,exports){
var json = require('./json');

module.exports = function(data, format) {
  data = json(data, format);
  return toTable(data, (format && format.children));
};

function toTable(root, childrenField) {
  childrenField = childrenField || 'children';
  var table = [];
  
  function visit(node) {
    table.push(node);
    var children = node[childrenField];
    if (children) {
      for (var i=0; i<children.length; ++i) {
        visit(children[i], node);
      }
    }
  }
  
  visit(root, null);
  return (table.root = root, table);
}
},{"./json":13}],16:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

module.exports = function(data) {
  var d = d3.tsv.parse(data ? data.toString() : data);
  return d;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],17:[function(require,module,exports){
var util = require('../util');

// Matches absolute URLs with optional protocol
//   https://...    file://...    //...
var protocol_re = /^([A-Za-z]+:)?\/\//;

// Special treatment in node.js for the file: protocol
var fileProtocol = 'file://';

// Validate and cleanup URL to ensure that it is allowed to be accessed
// Returns cleaned up URL, or false if access is not allowed
function sanitizeUrl(opt) {
  var url = opt.url;
  if (!url && opt.file) { return fileProtocol + opt.file; }

  // In case this is a relative url (has no host), prepend opt.baseURL
  if (opt.baseURL && !protocol_re.test(url)) {
    if (!util.startsWith(url, '/') && opt.baseURL[opt.baseURL.length-1] !== '/') {
      url = '/' + url; // Ensure that there is a slash between the baseURL (e.g. hostname) and url
    }
    url = opt.baseURL + url;
  }
  // relative protocol, starts with '//'
  if (util.isNode && util.startsWith(url, '//')) {
    url = (opt.defaultProtocol || 'http') + ':' + url;
  }
  // If opt.domainWhiteList is set, only allows url, whose hostname
  // * Is the same as the origin (window.location.hostname)
  // * Equals one of the values in the whitelist
  // * Is a proper subdomain of one of the values in the whitelist
  if (opt.domainWhiteList) {
    var domain, origin;
    if (util.isNode) {
      // relative protocol is broken: https://github.com/defunctzombie/node-url/issues/5
      var parts = require('url').parse(url);
      domain = parts.hostname;
      origin = null;
    } else {
      var a = document.createElement('a');
      a.href = url;
      // From http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
      // IE doesn't populate all link properties when setting .href with a relative URL,
      // however .href will return an absolute URL which then can be used on itself
      // to populate these additional fields.
      if (a.host === '') {
        a.href = a.href;
      }
      domain = a.hostname.toLowerCase();
      origin = window.location.hostname;
    }

    if (origin !== domain) {
      var whiteListed = opt.domainWhiteList.some(function(d) {
        var idx = domain.length - d.length;
        return d === domain ||
          (idx > 1 && domain[idx-1] === '.' && domain.lastIndexOf(d) === idx);
      });
      if (!whiteListed) {
        throw 'URL is not whitelisted: ' + url;
      }
    }
  }
  return url;
}

function load(opt, callback) {
  var error = callback || function(e) { throw e; }, url;

  try {
    url = load.sanitizeUrl(opt); // enable override
  } catch (err) {
    error(err);
    return;
  }

  if (!url) {
    error('Invalid URL: ' + url);
  } else if (!util.isNode) {
    // in browser, use xhr
    return xhr(url, callback);
  } else if (util.startsWith(url, fileProtocol)) {
    // in node.js, if url starts with 'file://', strip it and load from file
    return file(url.slice(fileProtocol.length), callback);
  } else if (url.indexOf('://') < 0) { // TODO better protocol check?
    // if node.js, if no protocol assume file
    return file(url, callback);
  } else {
    // for regular URLs in node.js
    return http(url, callback);
  }
}

function xhrHasResponse(request) {
  var type = request.responseType;
  return type && type !== 'text' ?
    request.response : // null on error
    request.responseText; // '' on error
}

function xhr(url, callback) {
  var async = !!callback;
  var request = new XMLHttpRequest();
  // If IE does not support CORS, use XDomainRequest (copied from d3.xhr)
  if (this.XDomainRequest &&
      !('withCredentials' in request) &&
      /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();

  function respond() {
    var status = request.status;
    if (!status && xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
      callback(null, request.responseText);
    } else {
      callback(request, null);
    }
  }

  if (async) {
    if ('onload' in request) {
      request.onload = request.onerror = respond;
    } else {
      request.onreadystatechange = function() {
        if (request.readyState > 3) respond();
      };
    }
  }
  
  request.open('GET', url, async);
  request.send();
  
  if (!async && xhrHasResponse(request)) {
    return request.responseText;
  }
}

function file(filename, callback) {
  var fs = require('fs');
  if (!callback) {
    return fs.readFileSync(filename, 'utf8');
  }
  require('fs').readFile(filename, callback);
}

function http(url, callback) {
  if (!callback) {
    return require('sync-request')('GET', url).getBody();
  }
  require('request')(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      callback(null, body);
    } else {
      callback(error, null);
    }
  });
}

load.sanitizeUrl = sanitizeUrl;

module.exports = load;

},{"../util":25,"fs":2,"request":2,"sync-request":2,"url":2}],18:[function(require,module,exports){
var util = require('../util');
var type = require('./type');
var formats = require('./formats');

function read(data, format) {
  var type = (format && format.type) || 'json';
  data = formats[type](data, format);
  if (format && format.parse) parse(data, format.parse);
  return data;
}

function parse(data, types) {
  var cols, parsers, d, i, j, clen, len = data.length;

  types = (types==='auto') ? type.inferAll(data) : util.duplicate(types);
  cols = util.keys(types);
  parsers = cols.map(function(c) { return type.parsers[types[c]]; });

  for (i=0, clen=cols.length; i<len; ++i) {
    d = data[i];
    for (j=0; j<clen; ++j) {
      d[cols[j]] = parsers[j](d[cols[j]]);
    }
  }
  type.annotation(data, types);
}

read.formats = formats;
module.exports = read;

},{"../util":25,"./formats":12,"./type":20}],19:[function(require,module,exports){
var util = require('../util');
var load = require('./load');
var read = require('./read');

module.exports = util
  .keys(read.formats)
  .reduce(function(out, type) {
    out[type] = function(opt, format, callback) {
      // process arguments
      if (util.isString(opt)) { opt = {url: opt}; }
      if (arguments.length === 2 && util.isFunction(format)) {
        callback = format;
        format = undefined;
      }

      // set up read format
      format = util.extend({parse: 'auto'}, format);
      format.type = type;

      // load data
      var data = load(opt, callback ? function(error, data) {
        if (error) callback(error, null);
        try {
          // data loaded, now parse it (async)
          data = read(data, format);
        } catch (e) {
          callback(e, null);
        }
        callback(null, data);
      } : undefined);
      
      // data loaded, now parse it (sync)
      if (data) return read(data, format);
    };
    return out;
  }, {});

},{"../util":25,"./load":17,"./read":18}],20:[function(require,module,exports){
var util = require('../util');

var TYPES = '__types__';

var PARSERS = {
  boolean: util.boolean,
  integer: util.number,
  number:  util.number,
  date:    util.date,
  string:  util.identity
};

var TESTS = {
  boolean: function(x) { return x==='true' || x==='false' || util.isBoolean(x); },
  integer: function(x) { return TESTS.number(x) && (x=+x) === ~~x; },
  number: function(x) { return !isNaN(+x) && !util.isDate(x); },
  date: function(x) { return !isNaN(Date.parse(x)); }
};

function annotation(data, types) {
  if (!types) return data && data[TYPES] || null;
  data[TYPES] = types;
}

function type(values, f) {
  var v, i, n;

  // if data array has type annotations, use them
  if (values[TYPES]) {
    v = f(values[TYPES]);
    if (util.isString(v)) return v;
  }

  for (i=0, n=values.length; !util.isValid(v) && i<n; ++i) {
    v = f ? f(values[i]) : values[i];
  }

  return util.isDate(v) ? 'date' :
    util.isNumber(v)    ? 'number' :
    util.isBoolean(v)   ? 'boolean' :
    util.isString(v)    ? 'string' : null;
}

function typeAll(data, fields) {
  if (!data.length) return;
  fields = fields || util.keys(data[0]);
  return fields.reduce(function(types, f) {
    return (types[f] = type(data, util.$(f)), types);
  }, {});
}

function infer(values, f) {
  var i, j, v;

  // types to test for, in precedence order
  var types = ['boolean', 'integer', 'number', 'date'];

  for (i=0; i<values.length; ++i) {
    // get next value to test
    v = f ? f(values[i]) : values[i];
    // test value against remaining types
    for (j=0; j<types.length; ++j) {
      if (util.isValid(v) && !TESTS[types[j]](v)) {
        types.splice(j, 1);
        j -= 1;
      }
    }
    // if no types left, return 'string'
    if (types.length === 0) return 'string';
  }

  return types[0];
}

function inferAll(data, fields) {
  fields = fields || util.keys(data[0]);
  return fields.reduce(function(types, f) {
    var type = infer(data, util.$(f));
    if (PARSERS[type]) types[f] = type;
    return types;
  }, {});
}

type.annotation = annotation;
type.all = typeAll;
type.infer = infer;
type.inferAll = inferAll;
type.parsers = PARSERS;
module.exports = type;
},{"../util":25}],21:[function(require,module,exports){
var util = require('./util');
var gen = require('./generate');
var stats = {};

// Collect unique values and associated counts.
// Output: an array of unique values, in observed order
// The array includes an additional 'counts' property,
// which is a hash from unique values to occurrence counts.
stats.unique = function(values, f, results) {
  f = util.$(f);
  results = results || [];
  var u = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) {
      u[v] += 1;
    } else {
      u[v] = 1;
      results.push(v);
    }
  }
  results.counts = u;
  return results;
};

// Return the length of the input array.
stats.count = function(values) {
  return values && values.length || 0;
};

// Count the number of non-null, non-undefined, non-NaN values.
stats.count.valid = function(values, f) {
  f = util.$(f);
  var v, i, n, valid = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) valid += 1;
  }
  return valid;
};

// Count the number of null or undefined values.
stats.count.missing = function(values, f) {
  f = util.$(f);
  var v, i, n, count = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v == null) count += 1;
  }
  return count;
};

// Count the number of distinct values.
// Null, undefined and NaN are each considered distinct values.
stats.count.distinct = function(values, f) {
  f = util.$(f);
  var u = {}, v, i, n, count = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) continue;
    u[v] = 1;
    count += 1;
  }
  return count;
};

// Compute the median of an array of numbers.
stats.median = function(values, f) {
  if (f) values = values.map(util.$(f));
  values = values.filter(util.isValid).sort(util.cmp);
  return stats.quantile(values, 0.5);
};

// Computes the quartile boundaries of an array of numbers.
stats.quartile = function(values, f) {
  if (f) values = values.map(util.$(f));
  values = values.filter(util.isValid).sort(util.cmp);
  var q = stats.quantile;
  return [q(values, 0.25), q(values, 0.50), q(values, 0.75)];
};

// Compute the quantile of a sorted array of numbers.
// Adapted from the D3.js implementation.
stats.quantile = function(values, f, p) {
  if (p === undefined) { p = f; f = util.identity; }
  f = util.$(f);
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = +f(values[h - 1]),
      e = H - h;
  return e ? v + e * (f(values[h]) - v) : v;
};

// Compute the sum of an array of numbers.
stats.sum = function(values, f) {
  f = util.$(f);
  for (var sum=0, i=0, n=values.length, v; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) sum += v;
  }
  return sum;
};

// Compute the mean (average) of an array of numbers.
stats.mean = function(values, f) {
  f = util.$(f);
  var mean = 0, delta, i, n, c, v;
  for (i=0, c=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      delta = v - mean;
      mean = mean + delta / (++c);
    }
  }
  return mean;
};

// Compute the sample variance of an array of numbers.
stats.variance = function(values, f) {
  f = util.$(f);
  if (!util.isArray(values) || values.length===0) return 0;
  var mean = 0, M2 = 0, delta, i, c, v;
  for (i=0, c=0; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      delta = v - mean;
      mean = mean + delta / (++c);
      M2 = M2 + delta * (v - mean);
    }
  }
  M2 = M2 / (c - 1);
  return M2;
};

// Compute the sample standard deviation of an array of numbers.
stats.stdev = function(values, f) {
  return Math.sqrt(stats.variance(values, f));
};

// Compute the Pearson mode skewness ((median-mean)/stdev) of an array of numbers.
stats.modeskew = function(values, f) {
  var avg = stats.mean(values, f),
      med = stats.median(values, f),
      std = stats.stdev(values, f);
  return std === 0 ? 0 : (avg - med) / std;
};

// Find the minimum and maximum of an array of values.
stats.extent = function(values, f) {
  f = util.$(f);
  var a, b, v, i, n = values.length;
  for (i=0; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) { a = b = v; break; }
  }
  for (; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v < a) a = v;
      if (v > b) b = v;
    }
  }
  return [a, b];
};

// Find the integer indices of the minimum and maximum values.
stats.extent.index = function(values, f) {
  f = util.$(f);
  var a, b, x, y, v, i, n = values.length;
  for (i=0; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) { a = b = v; x = y = i; break; }
  }
  for (; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v < a) { a = v; x = i; }
      if (v > b) { b = v; y = i; }
    }
  }
  return [x, y];
};

// Compute the dot product of two arrays of numbers.
stats.dot = function(values, a, b) {
  var sum = 0, i, v;
  if (!b) {
    if (values.length !== a.length) {
      throw Error('Array lengths must match.');
    }
    for (i=0; i<values.length; ++i) {
      v = values[i] * a[i];
      if (!Number.isNaN(v)) sum += v;
    }
  } else {
    a = util.$(a);
    b = util.$(b);
    for (i=0; i<values.length; ++i) {
      v = a(values[i]) * b(values[i]);
      if (!Number.isNaN(v)) sum += v;
    }
  }
  return sum;
};

// Compute ascending rank scores for an array of values.
// Ties are assigned their collective mean rank.
stats.rank = function(values, f) {
  f = util.$(f) || util.identity;
  var a = values.map(function(v, i) {
      return {idx: i, val: f(v)};
    })
    .sort(util.comparator('val'));

  var n = values.length,
      r = Array(n),
      tie = -1, p = {}, i, v, mu;

  for (i=0; i<n; ++i) {
    v = a[i].val;
    if (tie < 0 && p === v) {
      tie = i - 1;
    } else if (tie > -1 && p !== v) {
      mu = 1 + (i-1 + tie) / 2;
      for (; tie<i; ++tie) r[a[tie].idx] = mu;
      tie = -1;
    }
    r[a[i].idx] = i + 1;
    p = v;
  }

  if (tie > -1) {
    mu = 1 + (n-1 + tie) / 2;
    for (; tie<n; ++tie) r[a[tie].idx] = mu;
  }

  return r;
};

// Compute the sample Pearson product-moment correlation of two arrays of numbers.
stats.cor = function(values, a, b) {
  var fn = b;
  b = fn ? values.map(util.$(b)) : a;
  a = fn ? values.map(util.$(a)) : values;

  var dot = stats.dot(a, b),
      mua = stats.mean(a),
      mub = stats.mean(b),
      sda = stats.stdev(a),
      sdb = stats.stdev(b),
      n = values.length;

  return (dot - n*mua*mub) / ((n-1) * sda * sdb);
};

// Compute the Spearman rank correlation of two arrays of values.
stats.cor.rank = function(values, a, b) {
  var ra = b ? stats.rank(values, util.$(a)) : stats.rank(values),
      rb = b ? stats.rank(values, util.$(b)) : stats.rank(a),
      n = values.length, i, s, d;

  for (i=0, s=0; i<n; ++i) {
    d = ra[i] - rb[i];
    s += d * d;
  }

  return 1 - 6*s / (n * (n*n-1));
};

// Compute the distance correlation of two arrays of numbers.
// http://en.wikipedia.org/wiki/Distance_correlation
stats.cor.dist = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a;

  var A = stats.dist.mat(X),
      B = stats.dist.mat(Y),
      n = A.length,
      i, aa, bb, ab;

  for (i=0, aa=0, bb=0, ab=0; i<n; ++i) {
    aa += A[i]*A[i];
    bb += B[i]*B[i];
    ab += A[i]*B[i];
  }

  return Math.sqrt(ab / Math.sqrt(aa*bb));
};

// Compute the vector distance between two arrays of numbers.
// Default is Euclidean (exp=2) distance, configurable via exp argument.
stats.dist = function(values, a, b, exp) {
  var f = util.isFunction(b) || util.isString(b),
      X = values,
      Y = f ? values : a,
      e = f ? exp : b,
      L2 = e === 2 || e == null,
      n = values.length, s = 0, d, i;
  if (f) {
    a = util.$(a);
    b = util.$(b);
  }
  for (i=0; i<n; ++i) {
    d = f ? (a(X[i])-b(Y[i])) : (X[i]-Y[i]);
    s += L2 ? d*d : Math.pow(Math.abs(d), e);
  }
  return L2 ? Math.sqrt(s) : Math.pow(s, 1/e);
};

// Construct a mean-centered distance matrix for an array of numbers.
stats.dist.mat = function(X) {
  var n = X.length,
      m = n*n,
      A = Array(m),
      R = gen.zeros(n),
      M = 0, v, i, j;

  for (i=0; i<n; ++i) {
    A[i*n+i] = 0;
    for (j=i+1; j<n; ++j) {
      A[i*n+j] = (v = Math.abs(X[i] - X[j]));
      A[j*n+i] = v;
      R[i] += v;
      R[j] += v;
    }
  }

  for (i=0; i<n; ++i) {
    M += R[i];
    R[i] /= n;
  }
  M /= m;

  for (i=0; i<n; ++i) {
    for (j=i; j<n; ++j) {
      A[i*n+j] += M - R[i] - R[j];
      A[j*n+i] = A[i*n+j];
    }
  }

  return A;
};

// Compute the Shannon entropy (log base 2) of an array of counts.
stats.entropy = function(counts, f) {
  f = util.$(f);
  var i, p, s = 0, H = 0, n = counts.length;
  for (i=0; i<n; ++i) {
    s += (f ? f(counts[i]) : counts[i]);
  }
  if (s === 0) return 0;
  for (i=0; i<n; ++i) {
    p = (f ? f(counts[i]) : counts[i]) / s;
    if (p) H += p * Math.log(p);
  }
  return -H / Math.LN2;
};

// Compute the mutual information between two discrete variables.
// Returns an array of the form [MI, MI_distance] 
// MI_distance is defined as 1 - I(a,b) / H(a,b).
// http://en.wikipedia.org/wiki/Mutual_information
stats.mutual = function(values, a, b, counts) {
  var x = counts ? values.map(util.$(a)) : values,
      y = counts ? values.map(util.$(b)) : a,
      z = counts ? values.map(util.$(counts)) : b;

  var px = {},
      py = {},
      n = z.length,
      s = 0, I = 0, H = 0, p, t, i;

  for (i=0; i<n; ++i) {
    px[x[i]] = 0;
    py[y[i]] = 0;
  }

  for (i=0; i<n; ++i) {
    px[x[i]] += z[i];
    py[y[i]] += z[i];
    s += z[i];
  }

  t = 1 / (s * Math.LN2);
  for (i=0; i<n; ++i) {
    if (z[i] === 0) continue;
    p = (s * z[i]) / (px[x[i]] * py[y[i]]);
    I += z[i] * t * Math.log(p);
    H += z[i] * t * Math.log(z[i]/s);
  }

  return [I, 1 + I/H];
};

// Compute the mutual information between two discrete variables.
stats.mutual.info = function(values, a, b, counts) {
  return stats.mutual(values, a, b, counts)[0];
};

// Compute the mutual information distance between two discrete variables.
// MI_distance is defined as 1 - I(a,b) / H(a,b).
stats.mutual.dist = function(values, a, b, counts) {
  return stats.mutual(values, a, b, counts)[1];
};

// Compute a profile of summary statistics for a variable.
stats.profile = function(values, f) {
  var mean = 0,
      valid = 0,
      missing = 0,
      distinct = 0,
      min = null,
      max = null,
      M2 = 0,
      vals = [],
      u = {}, delta, sd, i, v, x;

  // compute summary stats
  for (i=0; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];

    // update unique values
    u[v] = (v in u) ? u[v] + 1 : (distinct += 1, 1);

    if (v == null) {
      ++missing;
    } else if (util.isValid(v)) {
      // update stats
      x = (typeof v === 'string') ? v.length : v;
      if (min===null || x < min) min = x;
      if (max===null || x > max) max = x;
      delta = x - mean;
      mean = mean + delta / (++valid);
      M2 = M2 + delta * (x - mean);
      vals.push(x);
    }
  }
  M2 = M2 / (valid - 1);
  sd = Math.sqrt(M2);

  // sort values for median and iqr
  vals.sort(util.cmp);

  return {
    unique:   u,
    count:    values.length,
    valid:    valid,
    missing:  missing,
    distinct: distinct,
    min:      min,
    max:      max,
    mean:     mean,
    stdev:    sd,
    median:   (v = stats.quantile(vals, 0.5)),
    q1:       stats.quantile(vals, 0.25),
    q3:       stats.quantile(vals, 0.75),
    modeskew: sd === 0 ? 0 : (mean - v) / sd
  };
};

module.exports = stats;
},{"./generate":10,"./util":25}],22:[function(require,module,exports){
var util = require('./util');
var stats = require('./stats');

// Compute profiles for all variables in a data set.
module.exports = function(data, fields) {
  if (data == null || data.length === 0) return null;
  fields = fields || util.keys(data[0]);

  var profiles = fields.map(function(f) {
    var p = stats.profile(data, util.accessor(f));
    return (p.field = f, p);
  });
  
  profiles.toString = printSummary;
  return profiles;
};

function printSummary() {
  var profiles = this;
  var str = [];
  profiles.forEach(function(p) {
    str.push('----- Field: \'' + p.field + '\' -----');
    if (typeof p.min === 'string' || p.distinct < 10) {
      str.push(printCategoricalProfile(p));
    } else {
      str.push(printQuantitativeProfile(p));
    }
    str.push('');
  });
  return str.join('\n');
}

function printQuantitativeProfile(p) {
  return [
    'valid:    ' + p.valid,
    'missing:  ' + p.missing,
    'distinct: ' + p.distinct,
    'min:      ' + p.min,
    'max:      ' + p.max,
    'median:   ' + p.median,
    'mean:     ' + p.mean,
    'stdev:    ' + p.stdev,
    'modeskew: ' + p.modeskew
  ].join('\n');
}

function printCategoricalProfile(p) {
  var list = [
    'valid:    ' + p.valid,
    'missing:  ' + p.missing,
    'distinct: ' + p.distinct,
    'top values: '
  ];
  var u = p.unique;
  var top = util.keys(u)
    .sort(function(a,b) { return u[b] - u[a]; })
    .slice(0, 6)
    .map(function(v) { return ' \'' + v + '\' (' + u[v] + ')'; });
  return list.concat(top).join('\n');
}
},{"./stats":21,"./util":25}],23:[function(require,module,exports){
(function (global){
var util = require('./util');
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

var context = {
  formats:    [],
  format_map: {},
  truncate:   util.truncate
};

function template(text) {
  var src = source(text, 'd');
  src = 'var __t; return ' + src + ';';

  try {
    /* jshint evil: true */
    return (new Function('d', src)).bind(context);
  } catch (e) {
    e.source = src;
    throw e;
  }
}

module.exports = template;

// clear cache of format objects
// can *break* prior template functions, so invoke with care
template.clearFormatCache = function() {
  context.formats = [];
  context.format_map = {};
};

function source(text, variable) {
  variable = variable || 'obj';
  var index = 0;
  var src = '\'';
  var regex = template_re;

  // Compile the template source, escaping string literals appropriately.
  text.replace(regex, function(match, interpolate, offset) {
    src += text
      .slice(index, offset)
      .replace(template_escaper, template_escapeChar);
    index = offset + match.length;

    if (interpolate) {
      src += '\'\n+((__t=(' +
        template_var(interpolate, variable) +
        '))==null?\'\':__t)+\n\'';
    }

    // Adobe VMs need the match returned to produce the correct offest.
    return match;
  });
  return src + '\'';
}

function template_var(text, variable) {
  var filters = text.split('|');
  var prop = filters.shift().trim();
  var stringCast = true;
  
  function strcall(fn) {
    fn = fn || '';
    if (stringCast) {
      stringCast = false;
      src = 'String(' + src + ')' + fn;
    } else {
      src += fn;
    }
    return src;
  }
  
  var src = util.field(prop).map(util.str).join('][');
  src = variable + '[' + src + ']';
  
  for (var i=0; i<filters.length; ++i) {
    var f = filters[i], args = null, pidx, a, b;

    if ((pidx=f.indexOf(':')) > 0) {
      f = f.slice(0, pidx);
      args = filters[i].slice(pidx+1).split(',')
        .map(function(s) { return s.trim(); });
    }
    f = f.trim();

    switch (f) {
      case 'length':
        strcall('.length');
        break;
      case 'lower':
        strcall('.toLowerCase()');
        break;
      case 'upper':
        strcall('.toUpperCase()');
        break;
      case 'lower-locale':
        strcall('.toLocaleLowerCase()');
        break;
      case 'upper-locale':
        strcall('.toLocaleUpperCase()');
        break;
      case 'trim':
        strcall('.trim()');
        break;
      case 'left':
        a = util.number(args[0]);
        strcall('.slice(0,' + a + ')');
        break;
      case 'right':
        a = util.number(args[0]);
        strcall('.slice(-' + a +')');
        break;
      case 'mid':
        a = util.number(args[0]);
        b = a + util.number(args[1]);
        strcall('.slice(+'+a+','+b+')');
        break;
      case 'slice':
        a = util.number(args[0]);
        strcall('.slice('+ a +
          (args.length > 1 ? ',' + util.number(args[1]) : '') +
          ')');
        break;
      case 'truncate':
        a = util.number(args[0]);
        b = args[1];
        b = (b!=='left' && b!=='middle' && b!=='center') ? 'right' : b;
        src = 'this.truncate(' + strcall() + ',' + a + ',\'' + b + '\')';
        break;
      case 'number':
        a = template_format(args[0], d3.format);
        stringCast = false;
        src = 'this.formats['+a+']('+src+')';
        break;
      case 'time':
        a = template_format(args[0], d3.time.format);
        stringCast = false;
        src = 'this.formats['+a+']('+src+')';
        break;
      default:
        throw Error('Unrecognized template filter: ' + f);
    }
  }

  return src;
}

var template_re = /\{\{(.+?)\}\}|$/g;

// Certain characters need to be escaped so that they can be put into a
// string literal.
var template_escapes = {
  '\'':     '\'',
  '\\':     '\\',
  '\r':     'r',
  '\n':     'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var template_escaper = /\\|'|\r|\n|\u2028|\u2029/g;

function template_escapeChar(match) {
  return '\\' + template_escapes[match];
}

function template_format(pattern, fmt) {
  if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
      (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
    pattern = pattern.slice(1, -1);
  } else {
    throw Error('Format pattern must be quoted: ' + pattern);
  }
  if (!context.format_map[pattern]) {
    var f = fmt(pattern);
    var i = context.formats.length;
    context.formats.push(f);
    context.format_map[pattern] = i;
  }
  return context.format_map[pattern];
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./util":25}],24:[function(require,module,exports){
var STEPS = [
  [31536e6, 5],  // 1-year
  [7776e6, 4],   // 3-month
  [2592e6, 4],   // 1-month
  [12096e5, 3],  // 2-week
  [6048e5, 3],   // 1-week
  [1728e5, 3],   // 2-day
  [864e5, 3],    // 1-day
  [432e5, 2],    // 12-hour
  [216e5, 2],    // 6-hour
  [108e5, 2],    // 3-hour
  [36e5, 2],     // 1-hour
  [18e5, 1],     // 30-minute
  [9e5, 1],      // 15-minute
  [3e5, 1],      // 5-minute
  [6e4, 1],      // 1-minute
  [3e4, 0],      // 30-second
  [15e3, 0],     // 15-second
  [5e3, 0],      // 5-second
  [1e3, 0]       // 1-second
];

function isNumber(d) { return typeof d === 'number'; }

var entries = [
  {
    type: 'second',
    minstep: 1,
    format: '%Y %b %-d %H:%M:%S.%L',
    date: function(d) {
      return new Date(d * 1e3);
    },
    unit: function(d) {
      return (+d / 1e3);
    }
  },
  {
    type: 'minute',
    minstep: 1,
    format: '%Y %b %-d %H:%M',
    date: function(d) {
      return new Date(d * 6e4);
    },
    unit: function(d) {
      return ~~(+d / 6e4);
    }
  },
  {
    type: 'hour',
    minstep: 1,
    format: '%Y %b %-d %H:00',
    date: function(d) {
      return new Date(d * 36e5);
    },
    unit: function(d) {
      return ~~(+d / 36e5);
    }
  },
  {
    type: 'day',
    minstep: 1,
    step: [1, 7],
    format: '%Y %b %-d',
    date: function(d) {
      return new Date(d * 864e5);
    },
    unit: function(d) {
      return ~~(+d / 864e5);
    }
  },
  {
    type: 'month',
    minstep: 1,
    step: [1, 3, 6],
    format: '%b %Y',
    date: function(d) {
      return new Date(Date.UTC(~~(d / 12), d % 12, 1));
    },
    unit: function(d) {
      if (isNumber(d)) d = new Date(d);
      return 12 * d.getUTCFullYear() + d.getUTCMonth();
    }
  },
  {
    type: 'year',
    minstep: 1,
    format: '%Y',
    date: function(d) {
      return new Date(Date.UTC(d, 0, 1));
    },
    unit: function(d) {
      return (isNumber(d) ? new Date(d) : d).getUTCFullYear();
    }
  }
];

var minuteOfHour = {
  type: 'minuteOfHour',
  min: 0,
  max: 59,
  minstep: 1,
  format: '%M',
  date: function(d) {
    return new Date(Date.UTC(1970, 0, 1, 0, d));
  },
  unit: function(d) {
    return (isNumber(d) ? new Date(d) : d).getUTCMinutes();
  }
};

var hourOfDay = {
  type: 'hourOfDay',
  min: 0,
  max: 23,
  minstep: 1,
  format: '%H',
  date: function(d) {
    return new Date(Date.UTC(1970, 0, 1, d));
  },
  unit: function(d) {
    return (isNumber(d) ? new Date(d) : d).getUTCHours();
  }
};

var dayOfWeek = {
  type: 'dayOfWeek',
  min: 0,
  max: 6,
  step: [1],
  format: '%a',
  date: function(d) {
    return new Date(Date.UTC(1970, 0, 4 + d));
  },
  unit: function(d) {
    return (isNumber(d) ? new Date(d) : d).getUTCDay();
  }
};

var dayOfMonth = {
  type: 'dayOfMonth',
  min: 1,
  max: 31,
  step: [1],
  format: '%-d',
  date: function(d) {
    return new Date(Date.UTC(1970, 0, d));
  },
  unit: function(d) {
    return (isNumber(d) ? new Date(d) : d).getUTCDate();
  }
};

var monthOfYear = {
  type: 'monthOfYear',
  min: 0,
  max: 11,
  step: [1],
  format: '%b',
  date: function(d) {
    return new Date(Date.UTC(1970, d % 12, 1));
  },
  unit: function(d) {
    return (isNumber(d) ? new Date(d) : d).getUTCMonth();
  }
};

var units = {
  'second':       entries[0],
  'minute':       entries[1],
  'hour':         entries[2],
  'day':          entries[3],
  'month':        entries[4],
  'year':         entries[5],
  'minuteOfHour': minuteOfHour,
  'hourOfDay':    hourOfDay,
  'dayOfWeek':    dayOfWeek,
  'dayOfMonth':   dayOfMonth,
  'monthOfYear':  monthOfYear,
  'timesteps':    entries
};

units.find = function(span, minb, maxb) {
  var i, len, bins, step = STEPS[0];

  for (i = 1, len = STEPS.length; i < len; ++i) {
    step = STEPS[i];
    if (span > step[0]) {
      bins = span / step[0];
      if (bins > maxb) {
        return entries[STEPS[i - 1][1]];
      }
      if (bins >= minb) {
        return entries[step[1]];
      }
    }
  }
  return entries[STEPS[STEPS.length - 1][1]];
};

module.exports = units;

},{}],25:[function(require,module,exports){
(function (process){
var Buffer = require('buffer').Buffer;
var units = require('./time-units');
var u = module.exports = {};

// where are we?

u.isNode = typeof process !== 'undefined' &&
           typeof process.stderr !== 'undefined';

// utility functions

var FNAME = '__name__';

u.namedfunc = function(name, f) { return (f[FNAME] = name, f); };

u.name = function(f) { return f==null ? null : f[FNAME]; };

u.identity = function(x) { return x; };

u.true = u.namedfunc('true', function() { return true; });

u.false = u.namedfunc('false', function() { return false; });

u.duplicate = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

u.equal = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

u.extend = function(obj) {
  for (var x, name, i=1, len=arguments.length; i<len; ++i) {
    x = arguments[i];
    for (name in x) { obj[name] = x[name]; }
  }
  return obj;
};

u.length = function(x) {
  return x.length !== null ? x.length : 0;
};

u.keys = function(x) {
  var keys = [], k;
  for (k in x) keys.push(k);
  return keys;
};

u.vals = function(x) {
  var vals = [], k;
  for (k in x) vals.push(x[k]);
  return vals;
};

u.toMap = function(list) {
  return list.reduce(function(obj, x) {
    return (obj[x] = 1, obj);
  }, {});
};

u.keystr = function(values) {
  // use to ensure consistent key generation across modules
  var n = values.length;
  if (!n) return '';
  for (var s=String(values[0]), i=1; i<n; ++i) {
    s += '|' + String(values[i]);
  }
  return s;
};

// type checking functions

var toString = Object.prototype.toString;

u.isObject = function(obj) {
  return obj === Object(obj);
};

u.isFunction = function(obj) {
  return toString.call(obj) === '[object Function]';
};

u.isString = function(obj) {
  return typeof value === 'string' || toString.call(obj) === '[object String]';
};

u.isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

u.isNumber = function(obj) {
  return typeof obj === 'number' || toString.call(obj) === '[object Number]';
};

u.isBoolean = function(obj) {
  return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
};

u.isDate = function(obj) {
  return toString.call(obj) === '[object Date]';
};

u.isValid = function(obj) {
  return obj != null && !Number.isNaN(obj);
};

u.isBuffer = (Buffer && Buffer.isBuffer) || u.false;

// type coercion functions

u.number = function(s) { return s == null ? null : +s; };

u.boolean = function(s) { return s == null ? null : s==='false' ? false : !!s; };

u.date = function(s) { return s == null ? null : Date.parse(s); };

u.array = function(x) { return x != null ? (u.isArray(x) ? x : [x]) : []; };

u.str = function(x) {
  return u.isArray(x) ? '[' + x.map(u.str) + ']'
    : u.isObject(x) ? JSON.stringify(x)
    : u.isString(x) ? ('\''+util_escape_str(x)+'\'') : x;
};

var escape_str_re = /(^|[^\\])'/g;

function util_escape_str(x) {
  return x.replace(escape_str_re, '$1\\\'');
}

// data access functions

u.field = function(f) {
  return String(f).split('\\.')
    .map(function(d) { return d.split('.'); })
    .reduce(function(a, b) {
      if (a.length) { a[a.length-1] += '.' + b.shift(); }
      a.push.apply(a, b);
      return a;
    }, []);
};

u.accessor = function(f) {
  var s;
  return f==null || u.isFunction(f) ? f :
    u.namedfunc(f, (s = u.field(f)).length > 1 ?
      function(x) { return s.reduce(function(x,f) { return x[f]; }, x); } :
      function(x) { return x[f]; }
    );
};

u.$ = u.accessor;

u.mutator = function(f) {
  var s;
  return u.isString(f) && (s=u.field(f)).length > 1 ?
    function(x, v) {
      for (var i=0; i<s.length-1; ++i) x = x[s[i]];
      x[s[i]] = v;
    } :
    function(x, v) { x[f] = v; };
};

u.$func = function(name, op) {
  return function(f) {
    f = u.$(f) || u.identity;
    var n = name + (u.name(f) ? '_'+u.name(f) : '');
    return u.namedfunc(n, function(d) { return op(f(d)); });
  };
};

u.$length = u.$func('length', u.length);
u.$year   = u.$func('year', units.year.unit);
u.$month  = u.$func('month', units.monthOfYear.unit);
u.$date   = u.$func('date', units.dayOfMonth.unit);
u.$day    = u.$func('day', units.dayOfWeek.unit);
u.$hour   = u.$func('hour', units.hourOfDay.unit);
u.$minute = u.$func('minute', units.minuteOfHour.unit);


// comparison / sorting functions

u.comparator = function(sort) {
  var sign = [];
  if (sort === undefined) sort = [];
  sort = u.array(sort).map(function(f) {
    var s = 1;
    if      (f[0] === '-') { s = -1; f = f.slice(1); }
    else if (f[0] === '+') { s = +1; f = f.slice(1); }
    sign.push(s);
    return u.accessor(f);
  });
  return function(a,b) {
    var i, n, f, x, y;
    for (i=0, n=sort.length; i<n; ++i) {
      f = sort[i]; x = f(a); y = f(b);
      if (x < y) return -1 * sign[i];
      if (x > y) return sign[i];
    }
    return 0;
  };
};

u.cmp = function(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else if (a >= b) {
    return 0;
  } else if (a === null && b === null) {
    return 0;
  } else if (a === null) {
    return -1;
  } else if (b === null) {
    return 1;
  }
  return NaN;
};

u.numcmp = function(a, b) { return a - b; };

u.stablesort = function(array, sortBy, keyFn) {
  var indices = array.reduce(function(idx, v, i) {
    return (idx[keyFn(v)] = i, idx);
  }, {});

  array.sort(function(a, b) {
    var sa = sortBy(a),
        sb = sortBy(b);
    return sa < sb ? -1 : sa > sb ? 1
         : (indices[keyFn(a)] - indices[keyFn(b)]);
  });

  return array;
};


// string functions

// ES6 compatibility per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
// We could have used the polyfill code, but lets wait until ES6 becomes a standard first
u.startsWith = String.prototype.startsWith ?
  function(string, searchString) {
    return string.startsWith(searchString);
  } :
  function(string, searchString) {
    return string.lastIndexOf(searchString, 0) === 0;
  };

u.truncate = function(s, length, pos, word, ellipsis) {
  var len = s.length;
  if (len <= length) return s;
  ellipsis = ellipsis !== undefined ? String(ellipsis) : '…';
  var l = Math.max(0, length - ellipsis.length);

  switch (pos) {
    case 'left':
      return ellipsis + (word ? truncateOnWord(s,l,1) : s.slice(len-l));
    case 'middle':
    case 'center':
      var l1 = Math.ceil(l/2), l2 = Math.floor(l/2);
      return (word ? truncateOnWord(s,l1) : s.slice(0,l1)) +
        ellipsis + (word ? truncateOnWord(s,l2,1) : s.slice(len-l2));
    default:
      return (word ? truncateOnWord(s,l) : s.slice(0,l)) + ellipsis;
  }
};

function truncateOnWord(s, len, rev) {
  var cnt = 0, tok = s.split(truncate_word_re);
  if (rev) {
    s = (tok = tok.reverse())
      .filter(function(w) { cnt += w.length; return cnt <= len; })
      .reverse();
  } else {
    s = tok.filter(function(w) { cnt += w.length; return cnt <= len; });
  }
  return s.length ? s.join('').trim() : tok[0].slice(0, len);
}

var truncate_word_re = /([\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF])/;

}).call(this,require('_process'))

},{"./time-units":24,"_process":3,"buffer":2}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyYy9hZ2dyZWdhdGUvYWdncmVnYXRvci5qcyIsInNyYy9hZ2dyZWdhdGUvY29sbGVjdG9yLmpzIiwic3JjL2FnZ3JlZ2F0ZS9ncm91cGJ5LmpzIiwic3JjL2FnZ3JlZ2F0ZS9tZWFzdXJlcy5qcyIsInNyYy9iaW5zL2JpbnMuanMiLCJzcmMvYmlucy9oaXN0b2dyYW0uanMiLCJzcmMvZ2VuZXJhdGUuanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvY3N2LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2luZGV4LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdG9wb2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdHJlZWpzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdHN2LmpzIiwic3JjL2ltcG9ydC9sb2FkLmpzIiwic3JjL2ltcG9ydC9yZWFkLmpzIiwic3JjL2ltcG9ydC9yZWFkZXJzLmpzIiwic3JjL2ltcG9ydC90eXBlLmpzIiwic3JjL3N0YXRzLmpzIiwic3JjL3N1bW1hcnkuanMiLCJzcmMvdGVtcGxhdGUuanMiLCJzcmMvdGltZS11bml0cy5qcyIsInNyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBkbCA9IHtcbiAgbG9hZDogICAgICByZXF1aXJlKCcuL2ltcG9ydC9sb2FkJyksXG4gIHJlYWQ6ICAgICAgcmVxdWlyZSgnLi9pbXBvcnQvcmVhZCcpLFxuICB0eXBlOiAgICAgIHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKSxcbiAgYmluczogICAgICByZXF1aXJlKCcuL2JpbnMvYmlucycpLFxuICAkYmluOiAgICAgIHJlcXVpcmUoJy4vYmlucy9oaXN0b2dyYW0nKS4kYmluLFxuICBncm91cGJ5OiAgIHJlcXVpcmUoJy4vYWdncmVnYXRlL2dyb3VwYnknKSxcbiAgaGlzdG9ncmFtOiByZXF1aXJlKCcuL2JpbnMvaGlzdG9ncmFtJykuaGlzdG9ncmFtLFxuICBzdW1tYXJ5OiAgIHJlcXVpcmUoJy4vc3VtbWFyeScpLFxuICB0ZW1wbGF0ZTogIHJlcXVpcmUoJy4vdGVtcGxhdGUnKSxcbiAgdGltZXVuaXRzOiByZXF1aXJlKCcuL3RpbWUtdW5pdHMnKVxufTtcblxudXRpbC5leHRlbmQoZGwsIHV0aWwpO1xudXRpbC5leHRlbmQoZGwsIHJlcXVpcmUoJy4vZ2VuZXJhdGUnKSk7XG51dGlsLmV4dGVuZChkbCwgcmVxdWlyZSgnLi9zdGF0cycpKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL2ltcG9ydC9yZWFkZXJzJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRsOyIsbnVsbCwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50UXVldWU7XG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtpXSgpO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbn1cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgcXVldWUucHVzaChmdW4pO1xuICAgIGlmICghZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIE1lYXN1cmVzID0gcmVxdWlyZSgnLi9tZWFzdXJlcycpLFxuICAgIENvbGxlY3RvciA9IHJlcXVpcmUoJy4vY29sbGVjdG9yJyk7XG5cbmZ1bmN0aW9uIEFnZ3JlZ2F0b3IoKSB7XG4gIHRoaXMuX2NlbGxzID0ge307XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgdGhpcy5fc3RyZWFtID0gZmFsc2U7XG59XG5cbnZhciBGbGFncyA9IEFnZ3JlZ2F0b3IuRmxhZ3MgPSB7XG4gIEFERF9DRUxMOiAxLFxuICBNT0RfQ0VMTDogMlxufTtcblxudmFyIHByb3RvID0gQWdncmVnYXRvci5wcm90b3R5cGU7XG5cbi8vIFBhcmFtZXRlcnNcblxucHJvdG8uc3RyZWFtID0gZnVuY3Rpb24odikge1xuICBpZiAodiA9PSBudWxsKSByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICB0aGlzLl9zdHJlYW0gPSAhIXY7XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBJbnB1dDogYXJyYXkgb2Ygb2JqZWN0cyBvZiB0aGUgZm9ybVxuLy8ge25hbWU6IHN0cmluZywgZ2V0OiBmdW5jdGlvbn1cbnByb3RvLmdyb3VwYnkgPSBmdW5jdGlvbihkaW1zKSB7XG4gIHRoaXMuX2RpbXMgPSB1dGlsLmFycmF5KGRpbXMpLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgZCA9IHV0aWwuaXNTdHJpbmcoZCkgPyB7bmFtZTogZCwgZ2V0OiB1dGlsLiQoZCl9XG4gICAgICA6IHV0aWwuaXNGdW5jdGlvbihkKSA/IHtuYW1lOiB1dGlsLm5hbWUoZCkgfHwgZC5uYW1lIHx8ICgnXycgKyBpKSwgZ2V0OiBkfVxuICAgICAgOiAoZC5uYW1lICYmIHV0aWwuaXNGdW5jdGlvbihkLmdldCkpID8gZCA6IG51bGw7XG4gICAgaWYgKGQgPT0gbnVsbCkgdGhyb3cgJ0ludmFsaWQgZ3JvdXBieSBhcmd1bWVudDogJyArIGQ7XG4gICAgcmV0dXJuIGQ7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIElucHV0OiBhcnJheSBvZiBvYmplY3RzIG9mIHRoZSBmb3JtXG4vLyB7bmFtZTogc3RyaW5nLCBvcHM6IFtzdHJpbmcsIC4uLl19XG5wcm90by5zdW1tYXJpemUgPSBmdW5jdGlvbihmaWVsZHMpIHtcbiAgZmllbGRzID0gc3VtbWFyaXplX2FyZ3MoZmllbGRzKTtcbiAgdmFyIGFnZ3IgPSAodGhpcy5fYWdnciA9IFtdKSxcbiAgICAgIG0sIGYsIGksIGosIG9wLCBhcztcblxuICBmb3IgKGk9MDsgaTxmaWVsZHMubGVuZ3RoOyArK2kpIHtcbiAgICBmb3IgKGo9MCwgbT1bXSwgZj1maWVsZHNbaV07IGo8Zi5vcHMubGVuZ3RoOyArK2opIHtcbiAgICAgIG9wID0gZi5vcHNbal07XG4gICAgICBhcyA9IChmLmFzICYmIGYuYXNbal0pIHx8IChvcCArIChmLm5hbWU9PT0nKicgPyAnJyA6ICdfJytmLm5hbWUpKTtcbiAgICAgIG0ucHVzaChNZWFzdXJlc1tvcF0oYXMpKTtcbiAgICB9XG4gICAgYWdnci5wdXNoKHtcbiAgICAgIG5hbWU6IGYubmFtZSxcbiAgICAgIG1lYXN1cmVzOiBNZWFzdXJlcy5jcmVhdGUoXG4gICAgICAgIG0sXG4gICAgICAgIHRoaXMuX3N0cmVhbSwgLy8gc3RyZWFtaW5nIHJlbW92ZSBmbGFnXG4gICAgICAgIGYuZ2V0IHx8IHV0aWwuJChmLm5hbWUpLCAvLyBpbnB1dCB0dXBsZSBnZXR0ZXJcbiAgICAgICAgdGhpcy5fYXNzaWduKSAvLyBvdXRwdXQgdHVwbGUgc2V0dGVyXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBDb252ZW5pZW5jZSBtZXRob2QgdG8gc3VtbWFyaXplIGJ5IGNvdW50XG5wcm90by5jb3VudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdW1tYXJpemUoeycqJzonY291bnQnfSk7XG59O1xuXG4vLyBPdmVycmlkZSB0byBwZXJmb3JtIGN1c3RvbSB0dXBsZSB2YWx1ZSBhc3NpZ25tZW50XG5wcm90by5fYXNzaWduID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn07XG5cbnByb3RvLmFjY2Vzc29ycyA9IGZ1bmN0aW9uKGZpZWxkcykge1xuICB2YXIgYWdnciA9IHRoaXMuX2FnZ3IsIGksIG4sIGY7XG4gIGZvciAoaT0wLCBuPWFnZ3IubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIGlmICgoZiA9IGZpZWxkc1thZ2dyW2ldLm5hbWVdKSkge1xuICAgICAgYWdncltpXS5tZWFzdXJlcy5wcm90b3R5cGUuZ2V0ID0gdXRpbC4kKGYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHN1bW1hcml6ZV9hcmdzKGZpZWxkcykge1xuICBpZiAodXRpbC5pc0FycmF5KGZpZWxkcykpIHsgcmV0dXJuIGZpZWxkczsgfVxuICBpZiAoZmllbGRzID09IG51bGwpIHsgcmV0dXJuIFtdOyB9XG4gIHZhciBhID0gW10sIG5hbWUsIG9wcztcbiAgZm9yIChuYW1lIGluIGZpZWxkcykge1xuICAgIG9wcyA9IHV0aWwuYXJyYXkoZmllbGRzW25hbWVdKTtcbiAgICBhLnB1c2goe25hbWU6IG5hbWUsIG9wczogb3BzfSk7XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbi8vIENlbGwgTWFuYWdlbWVudFxuXG5wcm90by5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuX2NlbGxzID0ge30sIHRoaXMpO1xufTtcblxucHJvdG8uX2tleXMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBkID0gdGhpcy5fZGltcyxcbiAgICAgIG4gPSBkLmxlbmd0aCxcbiAgICAgIGsgPSBBcnJheShuKSwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7IGtbaV0gPSBkW2ldLmdldCh4KTsgfVxuICByZXR1cm4ge2tleTogdXRpbC5rZXlzdHIoayksIGtleXM6IGt9O1xufTtcblxucHJvdG8uX2NlbGwgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrID0gdGhpcy5fa2V5cyh4KTtcbiAgcmV0dXJuIHRoaXMuX2NlbGxzW2sua2V5XSB8fCAodGhpcy5fY2VsbHNbay5rZXldID0gdGhpcy5fbmV3Y2VsbCh4LCBrKSk7XG59O1xuXG5wcm90by5fbmV3Y2VsbCA9IGZ1bmN0aW9uKHgsIGspIHtcbiAgdmFyIGNlbGwgPSB7XG4gICAgbnVtOiAgIDAsXG4gICAgdHVwbGU6IHRoaXMuX25ld3R1cGxlKHgsIGspLFxuICAgIGZsYWc6ICBGbGFncy5BRERfQ0VMTCxcbiAgICBhZ2dzOiAge31cbiAgfTtcblxuICB2YXIgYWdnciA9IHRoaXMuX2FnZ3IsIGk7XG4gIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXSA9IG5ldyBhZ2dyW2ldLm1lYXN1cmVzKGNlbGwsIGNlbGwudHVwbGUpO1xuICB9XG4gIGlmIChjZWxsLmNvbGxlY3QpIHtcbiAgICBjZWxsLmRhdGEgPSBuZXcgQ29sbGVjdG9yKCk7XG4gIH1cblxuICByZXR1cm4gY2VsbDtcbn07XG5cbnByb3RvLl9uZXd0dXBsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGRpbXMgPSB0aGlzLl9kaW1zLFxuICAgICAgdCA9IHt9LCBpLCBuO1xuICBmb3IoaT0wLCBuPWRpbXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHRbZGltc1tpXS5uYW1lXSA9IGRpbXNbaV0uZ2V0KHgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9pbmdlc3QodCk7XG59O1xuXG4vLyBPdmVycmlkZSB0byBwZXJmb3JtIGN1c3RvbSB0dXBsZSBpbmdlc3Rpb25cbnByb3RvLl9pbmdlc3QgPSB1dGlsLmlkZW50aXR5O1xuXG4vLyBQcm9jZXNzIFR1cGxlc1xuXG5wcm90by5hZGQgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBjZWxsID0gdGhpcy5fY2VsbCh4KSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuXG4gIGNlbGwubnVtICs9IDE7XG4gIGlmIChjZWxsLmNvbGxlY3QpIGNlbGwuZGF0YS5hZGQoeCk7XG4gIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5hZGQoeCk7XG4gIH1cbiAgY2VsbC5mbGFnIHw9IEZsYWdzLk1PRF9DRUxMO1xufTtcblxucHJvdG8ucmVtID0gZnVuY3Rpb24oeCkge1xuICB2YXIgY2VsbCA9IHRoaXMuX2NlbGwoeCksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBjZWxsLm51bSAtPSAxO1xuICBpZiAoY2VsbC5jb2xsZWN0KSBjZWxsLmRhdGEucmVtKHgpO1xuICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0ucmVtKHgpO1xuICB9XG4gIGNlbGwuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbn07XG5cbnByb3RvLnJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0cyA9IFtdLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsXG4gICAgICBjZWxsLCBpLCBrO1xuXG4gIGZvciAoayBpbiB0aGlzLl9jZWxscykge1xuICAgIGNlbGwgPSB0aGlzLl9jZWxsc1trXTtcbiAgICBpZiAoY2VsbC5udW0gPiAwKSB7XG4gICAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLnNldCgpO1xuICAgICAgfVxuICAgICAgcmVzdWx0cy5wdXNoKGNlbGwudHVwbGUpO1xuICAgIH1cbiAgICBjZWxsLmZsYWcgPSAwO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5wcm90by5leGVjdXRlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgcmV0dXJuIHRoaXMuY2xlYXIoKS5pbnNlcnQoaW5wdXQpLnJlc3VsdCgpO1xufTtcblxucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgZm9yICh2YXIgaT0wOyBpPGlucHV0Lmxlbmd0aDsgKytpKSB7XG4gICAgdGhpcy5hZGQoaW5wdXRbaV0pO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgaWYgKCF0aGlzLl9zdHJlYW0pIHtcbiAgICB0aHJvdyAnQWdncmVnYXRvciBub3QgY29uZmlndXJlZCBmb3Igc3RyZWFtaW5nIHJlbW92ZXMuJyArXG4gICAgICAnIENhbGwgc3RyZWFtKHRydWUpIHByaW9yIHRvIGNhbGxpbmcgc3VtbWFyaXplLic7XG4gIH1cbiAgZm9yICh2YXIgaT0wOyBpPGlucHV0Lmxlbmd0aDsgKytpKSB7XG4gICAgdGhpcy5yZW0oaW5wdXRbaV0pO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2dyZWdhdG9yOyIsInZhciBzdGF0cyA9IHJlcXVpcmUoJy4uL3N0YXRzJyk7XG5cbnZhciBSRU0gPSAnJCFfcmVtXyEjJztcblxuZnVuY3Rpb24gQ29sbGVjdG9yKCkge1xuICB0aGlzLl9hZGQgPSBbXTtcbiAgdGhpcy5fcmVtID0gW107XG59XG5cbnZhciBwcm90byA9IENvbGxlY3Rvci5wcm90b3R5cGU7XG5cbnByb3RvLmFkZCA9IGZ1bmN0aW9uKHYpIHtcbiAgdGhpcy5fYWRkLnB1c2godik7XG59O1xuXG5wcm90by5yZW0gPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuX3JlbS5wdXNoKHYpO1xufTtcblxucHJvdG8udmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9yZW0ubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5fYWRkO1xuICB2YXIgYSA9IHRoaXMuX2FkZCxcbiAgICAgIHIgPSB0aGlzLl9yZW0sXG4gICAgICB4ID0gQXJyYXkoYS5sZW5ndGggLSByLmxlbmd0aCksXG4gICAgICBpLCBqLCBuO1xuXG4gIGZvciAoaT0wLCBuPXIubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHJbaV1bUkVNXSA9IDE7XG4gIH1cbiAgZm9yIChpPTAsIGo9MCwgbj1hLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBpZiAoIWFbaV1bUkVNXSkgeyB4W2orK10gPSBhW2ldOyB9XG4gIH1cbiAgZm9yIChpPTAsIG49ci5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgZGVsZXRlIHJbaV1bUkVNXTtcbiAgfVxuICBcbiAgdGhpcy5fcmVtID0gW107XG4gIHRoaXMuX2YgPSBudWxsO1xuICByZXR1cm4gKHRoaXMuX2FkZCA9IHgpO1xufTtcblxuLy8gbWVtb2l6aW5nIHN0YXRpc3RpY3MgbWV0aG9kc1xuXG5wcm90by5leHRlbnQgPSBmdW5jdGlvbihnZXQpIHtcbiAgaWYgKHRoaXMuX2YgIT09IGdldCB8fCAhdGhpcy5fZXh0KSB7XG4gICAgdmFyIHYgPSB0aGlzLnZhbHVlcygpLFxuICAgICAgICBpID0gc3RhdHMuZXh0ZW50LmluZGV4KHYsIGdldCk7XG4gICAgdGhpcy5fZXh0ID0gW3ZbaVswXV0sIHZbaVsxXV1dO1xuICAgIHRoaXMuX2YgPSBnZXQ7ICAgIFxuICB9XG4gIHJldHVybiB0aGlzLl9leHQ7XG59O1xucHJvdG8ubWluID0gZnVuY3Rpb24oZikgeyByZXR1cm4gdGhpcy5leHRlbnQoZilbMF07IH07XG5wcm90by5tYXggPSBmdW5jdGlvbihmKSB7IHJldHVybiB0aGlzLmV4dGVudChmKVsxXTsgfTtcblxucHJvdG8ucXVhcnRpbGUgPSBmdW5jdGlvbihnZXQpIHtcbiAgaWYgKHRoaXMuX2YgIT09IGdldCB8fCAhdGhpcy5fcSkge1xuICAgIHRoaXMuX3EgPSBzdGF0cy5xdWFydGlsZSh0aGlzLnZhbHVlcygpLCBnZXQpO1xuICAgIHRoaXMuX2YgPSBnZXQ7ICAgIFxuICB9XG4gIHJldHVybiB0aGlzLl9xO1xufTtcbnByb3RvLnExID0gZnVuY3Rpb24oZikgeyByZXR1cm4gdGhpcy5xdWFydGlsZShmKVswXTsgfTtcbnByb3RvLnEyID0gZnVuY3Rpb24oZikgeyByZXR1cm4gdGhpcy5xdWFydGlsZShmKVsxXTsgfTtcbnByb3RvLnEzID0gZnVuY3Rpb24oZikgeyByZXR1cm4gdGhpcy5xdWFydGlsZShmKVsyXTsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0b3I7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgQWdncmVnYXRvciA9IHJlcXVpcmUoJy4vYWdncmVnYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBmbGF0dGVuIGFyZ3VtZW50cyBpbnRvIGEgc2luZ2xlIGFycmF5XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24oYSwgeCkge1xuICAgIHJldHVybiBhLmNvbmNhdCh1dGlsLmFycmF5KHgpKTtcbiAgfSwgW10pO1xuICAvLyBjcmVhdGUgYW5kIHJldHVybiBhbiBhZ2dyZWdhdG9yXG4gIHJldHVybiBuZXcgQWdncmVnYXRvcigpXG4gICAgLmdyb3VwYnkoYXJncylcbiAgICAuc3VtbWFyaXplKHsnKic6J2RhdGEnfSk7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciB0eXBlcyA9IHtcbiAgJ2NvdW50JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2NvdW50JyxcbiAgICBzZXQ6ICAnY2VsbC5udW0nXG4gIH0pLFxuICAnbWlzc2luZyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtaXNzaW5nJyxcbiAgICBzZXQ6ICAndGhpcy5taXNzaW5nJ1xuICB9KSxcbiAgJ3ZhbGlkJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhbGlkJyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCdcbiAgfSksXG4gICdkYXRhJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2RhdGEnLFxuICAgIGluaXQ6ICdjZWxsLmNvbGxlY3QgPSB0cnVlOycsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS52YWx1ZXMoKScsIGlkeDogLTFcbiAgfSksXG4gICdzdW0nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3VtJyxcbiAgICBpbml0OiAndGhpcy5zdW0gPSAwOycsXG4gICAgYWRkOiAgJ3RoaXMuc3VtICs9IHY7JyxcbiAgICByZW06ICAndGhpcy5zdW0gLT0gdjsnLFxuICAgIHNldDogICd0aGlzLnN1bSdcbiAgfSksXG4gICdtZWFuJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21lYW4nLFxuICAgIGluaXQ6ICd0aGlzLm1lYW4gPSAwOycsXG4gICAgYWRkOiAgJ3ZhciBkID0gdiAtIHRoaXMubWVhbjsgdGhpcy5tZWFuICs9IGQgLyB0aGlzLnZhbGlkOycsXG4gICAgcmVtOiAgJ3ZhciBkID0gdiAtIHRoaXMubWVhbjsgdGhpcy5tZWFuIC09IGQgLyB0aGlzLnZhbGlkOycsXG4gICAgc2V0OiAgJ3RoaXMubWVhbidcbiAgfSksXG4gICdhdmcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXZnJyxcbiAgICBzZXQ6ICAndGhpcy5tZWFuJyxcbiAgICByZXE6ICBbJ21lYW4nXSwgaWR4OiAxXG4gIH0pLFxuICAndmFyJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcicsXG4gICAgaW5pdDogJ3RoaXMuZGV2ID0gMDsnLFxuICAgIGFkZDogICd0aGlzLmRldiArPSBkICogKHYgLSB0aGlzLm1lYW4pOycsXG4gICAgcmVtOiAgJ3RoaXMuZGV2IC09IGQgKiAodiAtIHRoaXMubWVhbik7JyxcbiAgICBzZXQ6ICAndGhpcy5kZXYgLyAodGhpcy52YWxpZC0xKScsXG4gICAgcmVxOiAgWydtZWFuJ10sIGlkeDogMVxuICB9KSxcbiAgJ3ZhcnAnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAndmFycCcsXG4gICAgc2V0OiAgJ3RoaXMuZGV2IC8gdGhpcy52YWxpZCcsXG4gICAgcmVxOiAgWyd2YXInXSwgaWR4OiAyXG4gIH0pLFxuICAnc3RkZXYnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3RkZXYnLFxuICAgIHNldDogICdNYXRoLnNxcnQodGhpcy5kZXYgLyAodGhpcy52YWxpZC0xKSknLFxuICAgIHJlcTogIFsndmFyJ10sIGlkeDogMlxuICB9KSxcbiAgJ3N0ZGV2cCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdzdGRldnAnLFxuICAgIHNldDogICdNYXRoLnNxcnQodGhpcy5kZXYgLyB0aGlzLnZhbGlkKScsXG4gICAgcmVxOiAgWyd2YXInXSwgaWR4OiAyXG4gIH0pLFxuICAnbWVkaWFuJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21lZGlhbicsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMih0aGlzLmdldCknLFxuICAgIHJlcTogIFsnZGF0YSddLCBpZHg6IDNcbiAgfSksXG4gICdxMSc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdxMScsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMSh0aGlzLmdldCknLFxuICAgIHJlcTogIFsnZGF0YSddLCBpZHg6IDNcbiAgfSksXG4gICdxMyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdxMycsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMyh0aGlzLmdldCknLFxuICAgIHJlcTogIFsnZGF0YSddLCBpZHg6IDNcbiAgfSksXG4gICdkaXN0aW5jdCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdkaXN0aW5jdCcsXG4gICAgc2V0OiAgJ3RoaXMuZGlzdGluY3QoY2VsbC5kYXRhLnZhbHVlcygpLCB0aGlzLmdldCknLFxuICAgIHJlcTogIFsnZGF0YSddLCBpZHg6IDNcbiAgfSksXG4gICdhcmdtaW4nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXJnbWluJyxcbiAgICBhZGQ6ICAnaWYgKHYgPCB0aGlzLm1pbikgdGhpcy5hcmdtaW4gPSB0OycsXG4gICAgcmVtOiAgJ3RoaXMuYXJnbWluID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21pbiB8fCBjZWxsLmRhdGEubWluKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWydtaW4nXSwgc3RyOiBbJ2RhdGEnXSwgaWR4OiAzXG4gIH0pLFxuICAnYXJnbWF4JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2FyZ21heCcsXG4gICAgYWRkOiAgJ2lmICh2ID4gdGhpcy5tYXgpIHRoaXMuYXJnbWF4ID0gdDsnLFxuICAgIHJlbTogICd0aGlzLmFyZ21heCA9IG51bGw7JyxcbiAgICBzZXQ6ICAndGhpcy5hcmdtYXggfHwgY2VsbC5kYXRhLm1heCh0aGlzLmdldCknLFxuICAgIHJlcTogIFsnbWF4J10sIHN0cjogWydkYXRhJ10sIGlkeDogM1xuICB9KSxcbiAgJ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtaW4nLFxuICAgIGluaXQ6ICd0aGlzLm1pbiA9ICtJbmZpbml0eTsnLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLm1pbiA9IHY7JyxcbiAgICByZW06ICAndGhpcy5taW4gPSBOYU47JyxcbiAgICBzZXQ6ICAndGhpcy5taW4gPSAoaXNOYU4odGhpcy5taW4pID8gdGhpcy5nZXQoY2VsbC5kYXRhLm1pbih0aGlzLmdldCkpIDogdGhpcy5taW4pJyxcbiAgICBzdHI6ICBbJ2RhdGEnXSwgaWR4OiA0XG4gIH0pLFxuICAnbWF4JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21heCcsXG4gICAgaW5pdDogJ3RoaXMubWF4ID0gLUluZmluaXR5OycsXG4gICAgYWRkOiAgJ2lmICh2ID4gdGhpcy5tYXgpIHRoaXMubWF4ID0gdjsnLFxuICAgIHJlbTogICd0aGlzLm1heCA9IG51bGw7JyxcbiAgICBzZXQ6ICAndGhpcy5tYXggPSAoaXNOYU4odGhpcy5tYXgpID8gdGhpcy5nZXQoY2VsbC5kYXRhLm1heCh0aGlzLmdldCkpIDogdGhpcy5tYXgpJyxcbiAgICBzdHI6ICBbJ2RhdGEnXSwgaWR4OiA0XG4gIH0pLFxuICAnbW9kZXNrZXcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbW9kZXNrZXcnLFxuICAgIHNldDogICd0aGlzLmRldj09PTAgPyAwIDogKHRoaXMubWVhbiAtIGNlbGwuZGF0YS5xMih0aGlzLmdldCkpIC8gTWF0aC5zcXJ0KHRoaXMuZGV2Lyh0aGlzLnZhbGlkLTEpKScsXG4gICAgcmVxOiAgWydtZWFuJywgJ3N0ZGV2JywgJ21lZGlhbiddLCBpZHg6IDVcbiAgfSlcbn07XG5cbmZ1bmN0aW9uIG1lYXN1cmUoYmFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob3V0KSB7XG4gICAgdmFyIG0gPSB1dGlsLmV4dGVuZCh7aW5pdDonJywgYWRkOicnLCByZW06JycsIGlkeDowfSwgYmFzZSk7XG4gICAgbS5vdXQgPSBvdXQgfHwgYmFzZS5uYW1lO1xuICAgIHJldHVybiBtO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKGFnZywgc3RyZWFtKSB7XG4gIGZ1bmN0aW9uIGNvbGxlY3QobSwgYSkge1xuICAgIGZ1bmN0aW9uIGhlbHBlcihyKSB7IGlmICghbVtyXSkgY29sbGVjdChtLCBtW3JdID0gdHlwZXNbcl0oKSk7IH1cbiAgICBpZiAoYS5yZXEpIGEucmVxLmZvckVhY2goaGVscGVyKTtcbiAgICBpZiAoc3RyZWFtICYmIGEuc3RyKSBhLnN0ci5mb3JFYWNoKGhlbHBlcik7XG4gICAgcmV0dXJuIG07XG4gIH1cbiAgdmFyIG1hcCA9IGFnZy5yZWR1Y2UoXG4gICAgY29sbGVjdCxcbiAgICBhZ2cucmVkdWNlKGZ1bmN0aW9uKG0sIGEpIHsgcmV0dXJuIChtW2EubmFtZV0gPSBhLCBtKTsgfSwge30pXG4gICk7XG4gIHJldHVybiB1dGlsLnZhbHMobWFwKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEuaWR4IC0gYi5pZHg7IH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoYWdnLCBzdHJlYW0sIGFjY2Vzc29yLCBtdXRhdG9yKSB7XG4gIHZhciBhbGwgPSByZXNvbHZlKGFnZywgc3RyZWFtKSxcbiAgICAgIGN0ciA9ICd0aGlzLmNlbGwgPSBjZWxsOyB0aGlzLnR1cGxlID0gdDsgdGhpcy52YWxpZCA9IDA7IHRoaXMubWlzc2luZyA9IDA7JyxcbiAgICAgIGFkZCA9ICdpZiAodj09bnVsbCkgdGhpcy5taXNzaW5nKys7IGlmICghdGhpcy5pc1ZhbGlkKHYpKSByZXR1cm47IHRoaXMudmFsaWQrKzsnLFxuICAgICAgcmVtID0gJ2lmICh2PT1udWxsKSB0aGlzLm1pc3NpbmctLTsgaWYgKCF0aGlzLmlzVmFsaWQodikpIHJldHVybjsgdGhpcy52YWxpZC0tOycsXG4gICAgICBzZXQgPSAndmFyIHQgPSB0aGlzLnR1cGxlOyB2YXIgY2VsbCA9IHRoaXMuY2VsbDsnO1xuXG4gIGFsbC5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICBpZiAoYS5pZHggPCAwKSB7XG4gICAgICBjdHIgPSBhLmluaXQgKyBjdHI7XG4gICAgICBhZGQgPSBhLmFkZCArIGFkZDtcbiAgICAgIHJlbSA9IGEucmVtICsgcmVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHIgKz0gYS5pbml0O1xuICAgICAgYWRkICs9IGEuYWRkO1xuICAgICAgcmVtICs9IGEucmVtO1xuICAgIH1cbiAgfSk7XG4gIGFnZy5zbGljZSgpXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5pZHggLSBiLmlkeDsgfSlcbiAgICAuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgICBzZXQgKz0gJ3RoaXMuYXNzaWduKHQsXFwnJythLm91dCsnXFwnLCcrYS5zZXQrJyk7JztcbiAgICB9KTtcbiAgc2V0ICs9ICdyZXR1cm4gdDsnO1xuXG4gIC8qIGpzaGludCBldmlsOiB0cnVlICovXG4gIGN0ciA9IEZ1bmN0aW9uKCdjZWxsJywgJ3QnLCBjdHIpO1xuICBjdHIucHJvdG90eXBlLmFzc2lnbiA9IG11dGF0b3I7XG4gIGN0ci5wcm90b3R5cGUuYWRkID0gRnVuY3Rpb24oJ3QnLCAndmFyIHYgPSB0aGlzLmdldCh0KTsnICsgYWRkKTtcbiAgY3RyLnByb3RvdHlwZS5yZW0gPSBGdW5jdGlvbigndCcsICd2YXIgdiA9IHRoaXMuZ2V0KHQpOycgKyByZW0pO1xuICBjdHIucHJvdG90eXBlLnNldCA9IEZ1bmN0aW9uKHNldCk7XG4gIGN0ci5wcm90b3R5cGUuZ2V0ID0gYWNjZXNzb3I7XG4gIGN0ci5wcm90b3R5cGUubW9kID0gbW9kO1xuICBjdHIucHJvdG90eXBlLmRpc3RpbmN0ID0gcmVxdWlyZSgnLi4vc3RhdHMnKS5jb3VudC5kaXN0aW5jdDtcbiAgY3RyLnByb3RvdHlwZS5pc1ZhbGlkID0gdXRpbC5pc1ZhbGlkO1xuICByZXR1cm4gY3RyO1xufVxuXG5mdW5jdGlvbiBtb2Qodl9uZXcsIHZfb2xkKSB7XG4gIGlmICh2X29sZCA9PT0gdW5kZWZpbmVkIHx8IHZfb2xkID09PSB2X25ldykgcmV0dXJuO1xuICB0aGlzLnJlbSh2X29sZCk7XG4gIHRoaXMuYWRkKHZfbmV3KTtcbn1cblxudHlwZXMuY3JlYXRlID0gY3JlYXRlO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlczsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciB1bml0cyA9IHJlcXVpcmUoJy4uL3RpbWUtdW5pdHMnKTtcbnZhciBFUFNJTE9OID0gMWUtMTU7XG5cbmZ1bmN0aW9uIGJpbnMob3B0KSB7XG4gIG9wdCA9IG9wdCB8fCB7fTtcblxuICAvLyBkZXRlcm1pbmUgcmFuZ2VcbiAgdmFyIG1heGIgPSBvcHQubWF4YmlucyB8fCAxNSxcbiAgICAgIGJhc2UgPSBvcHQuYmFzZSB8fCAxMCxcbiAgICAgIGxvZ2IgPSBNYXRoLmxvZyhiYXNlKSxcbiAgICAgIGRpdiA9IG9wdC5kaXYgfHwgWzUsIDJdLCAgICAgIFxuICAgICAgbWluID0gb3B0Lm1pbixcbiAgICAgIG1heCA9IG9wdC5tYXgsXG4gICAgICBzcGFuID0gbWF4IC0gbWluLFxuICAgICAgc3RlcCwgbGV2ZWwsIG1pbnN0ZXAsIHByZWNpc2lvbiwgdiwgaSwgZXBzO1xuXG4gIGlmIChvcHQuc3RlcCkge1xuICAgIC8vIGlmIHN0ZXAgc2l6ZSBpcyBleHBsaWNpdGx5IGdpdmVuLCB1c2UgdGhhdFxuICAgIHN0ZXAgPSBvcHQuc3RlcDtcbiAgfSBlbHNlIGlmIChvcHQuc3RlcHMpIHtcbiAgICAvLyBpZiBwcm92aWRlZCwgbGltaXQgY2hvaWNlIHRvIGFjY2VwdGFibGUgc3RlcCBzaXplc1xuICAgIHN0ZXAgPSBvcHQuc3RlcHNbTWF0aC5taW4oXG4gICAgICBvcHQuc3RlcHMubGVuZ3RoIC0gMSxcbiAgICAgIGJpc2VjdChvcHQuc3RlcHMsIHNwYW4vbWF4YiwgMCwgb3B0LnN0ZXBzLmxlbmd0aClcbiAgICApXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlbHNlIHVzZSBzcGFuIHRvIGRldGVybWluZSBzdGVwIHNpemVcbiAgICBsZXZlbCA9IE1hdGguY2VpbChNYXRoLmxvZyhtYXhiKSAvIGxvZ2IpO1xuICAgIG1pbnN0ZXAgPSBvcHQubWluc3RlcCB8fCAwO1xuICAgIHN0ZXAgPSBNYXRoLm1heChcbiAgICAgIG1pbnN0ZXAsXG4gICAgICBNYXRoLnBvdyhiYXNlLCBNYXRoLnJvdW5kKE1hdGgubG9nKHNwYW4pIC8gbG9nYikgLSBsZXZlbClcbiAgICApO1xuICAgIFxuICAgIC8vIGluY3JlYXNlIHN0ZXAgc2l6ZSBpZiB0b28gbWFueSBiaW5zXG4gICAgZG8geyBzdGVwICo9IGJhc2U7IH0gd2hpbGUgKE1hdGguY2VpbChzcGFuL3N0ZXApID4gbWF4Yik7XG5cbiAgICAvLyBkZWNyZWFzZSBzdGVwIHNpemUgaWYgYWxsb3dlZFxuICAgIGZvciAoaT0wOyBpPGRpdi5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHN0ZXAgLyBkaXZbaV07XG4gICAgICBpZiAodiA+PSBtaW5zdGVwICYmIHNwYW4gLyB2IDw9IG1heGIpIHN0ZXAgPSB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSBwcmVjaXNpb24sIG1pbiBhbmQgbWF4XG4gIHYgPSBNYXRoLmxvZyhzdGVwKTtcbiAgcHJlY2lzaW9uID0gdiA+PSAwID8gMCA6IH5+KC12IC8gbG9nYikgKyAxO1xuICBlcHMgPSBNYXRoLnBvdyhiYXNlLCAtcHJlY2lzaW9uIC0gMSk7XG4gIG1pbiA9IE1hdGgubWluKG1pbiwgTWF0aC5mbG9vcihtaW4gLyBzdGVwICsgZXBzKSAqIHN0ZXApO1xuICBtYXggPSBNYXRoLmNlaWwobWF4IC8gc3RlcCkgKiBzdGVwO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG1pbixcbiAgICBzdG9wOiAgbWF4LFxuICAgIHN0ZXA6ICBzdGVwLFxuICAgIHVuaXQ6ICB7cHJlY2lzaW9uOiBwcmVjaXNpb259LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmlzZWN0KGEsIHgsIGxvLCBoaSkge1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmICh1dGlsLmNtcChhW21pZF0sIHgpIDwgMCkgeyBsbyA9IG1pZCArIDE7IH1cbiAgICBlbHNlIHsgaGkgPSBtaWQ7IH1cbiAgfVxuICByZXR1cm4gbG87XG59XG5cbmZ1bmN0aW9uIHZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMuc3RlcCAqIE1hdGguZmxvb3IodiAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBpbmRleCh2KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCh2IC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV92YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnVuaXQuZGF0ZSh2YWx1ZS5jYWxsKHRoaXMsIHYpKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV9pbmRleCh2KSB7XG4gIHJldHVybiBpbmRleC5jYWxsKHRoaXMsIHRoaXMudW5pdC51bml0KHYpKTtcbn1cblxuYmlucy5kYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIG9wdCA9IG9wdCB8fCB7fTtcblxuICAvLyBmaW5kIHRpbWUgc3RlcCwgdGhlbiBiaW5cbiAgdmFyIGRtaW4gPSBvcHQubWluLFxuICAgICAgZG1heCA9IG9wdC5tYXgsXG4gICAgICBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMjAsXG4gICAgICBtaW5iID0gb3B0Lm1pbmJpbnMgfHwgNCxcbiAgICAgIHNwYW4gPSAoK2RtYXgpIC0gKCtkbWluKSxcbiAgICAgIHVuaXQgPSBvcHQudW5pdCA/IHVuaXRzW29wdC51bml0XSA6IHVuaXRzLmZpbmQoc3BhbiwgbWluYiwgbWF4YiksXG4gICAgICBzcGVjID0gYmlucyh7XG4gICAgICAgIG1pbjogICAgIHVuaXQubWluICE9IG51bGwgPyB1bml0Lm1pbiA6IHVuaXQudW5pdChkbWluKSxcbiAgICAgICAgbWF4OiAgICAgdW5pdC5tYXggIT0gbnVsbCA/IHVuaXQubWF4IDogdW5pdC51bml0KGRtYXgpLFxuICAgICAgICBtYXhiaW5zOiBtYXhiLFxuICAgICAgICBtaW5zdGVwOiB1bml0Lm1pbnN0ZXAsXG4gICAgICAgIHN0ZXBzOiAgIHVuaXQuc3RlcFxuICAgICAgfSk7XG5cbiAgc3BlYy51bml0ID0gdW5pdDtcbiAgc3BlYy5pbmRleCA9IGRhdGVfaW5kZXg7XG4gIGlmICghb3B0LnJhdykgc3BlYy52YWx1ZSA9IGRhdGVfdmFsdWU7XG4gIHJldHVybiBzcGVjO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5zO1xuIiwidmFyIHN0YXRzID0gcmVxdWlyZSgnLi4vc3RhdHMnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi4vaW1wb3J0L3R5cGUnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIGdlbiA9IHJlcXVpcmUoJy4uL2dlbmVyYXRlJyk7XG52YXIgYmlucyA9IHJlcXVpcmUoJy4vYmlucycpO1xuXG52YXIgcXR5cGUgPSB7XG4gICdpbnRlZ2VyJzogMSxcbiAgJ251bWJlcic6IDEsXG4gICdkYXRlJzogMVxufTtcblxuZnVuY3Rpb24gJGJpbih2YWx1ZXMsIGYsIG9wdCkge1xuICBvcHQgPSBvcHRpb25zKHZhbHVlcywgZiwgb3B0KTtcbiAgdmFyIGIgPSBzcGVjKG9wdCk7XG4gIHJldHVybiAhYiA/IChvcHQuYWNjZXNzb3IgfHwgdXRpbC5pZGVudGl0eSkgOlxuICAgIHV0aWwuJGZ1bmMoJ2JpbicsIGIudW5pdC51bml0ID9cbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIGIudmFsdWUoYi51bml0LnVuaXQoeCkpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIGIudmFsdWUoeCk7IH1cbiAgICApKG9wdC5hY2Nlc3Nvcik7XG59XG5cbmZ1bmN0aW9uIGhpc3RvZ3JhbSh2YWx1ZXMsIGYsIG9wdCkge1xuICBvcHQgPSBvcHRpb25zKHZhbHVlcywgZiwgb3B0KTtcbiAgdmFyIGIgPSBzcGVjKG9wdCk7XG4gIHJldHVybiBiID9cbiAgICBudW1lcmljYWwodmFsdWVzLCBvcHQuYWNjZXNzb3IsIGIpIDpcbiAgICBjYXRlZ29yaWNhbCh2YWx1ZXMsIG9wdC5hY2Nlc3Nvciwgb3B0ICYmIG9wdC5zb3J0KTtcbn1cblxuZnVuY3Rpb24gc3BlYyhvcHQpIHtcbiAgdmFyIHQgPSBvcHQudHlwZSwgYiA9IG51bGw7XG4gIGlmICh0ID09IG51bGwgfHwgcXR5cGVbdF0pIHtcbiAgICBpZiAodCA9PT0gJ2ludGVnZXInICYmIG9wdC5taW5zdGVwID09IG51bGwpIG9wdC5taW5zdGVwID0gMTtcbiAgICBiID0gKHQgPT09ICdkYXRlJykgPyBiaW5zLmRhdGUob3B0KSA6IGJpbnMob3B0KTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuZnVuY3Rpb24gb3B0aW9ucygpIHtcbiAgdmFyIGEgPSBhcmd1bWVudHMsXG4gICAgICBpID0gMCxcbiAgICAgIHZhbHVlcyA9IHV0aWwuaXNBcnJheShhW2ldKSA/IGFbaSsrXSA6IG51bGwsXG4gICAgICBmID0gdXRpbC5pc0Z1bmN0aW9uKGFbaV0pIHx8IHV0aWwuaXNTdHJpbmcoYVtpXSkgPyB1dGlsLiQoYVtpKytdKSA6IG51bGwsXG4gICAgICBvcHQgPSB1dGlsLmV4dGVuZCh7fSwgYVtpXSk7XG4gIFxuICBpZiAodmFsdWVzKSB7XG4gICAgb3B0LnR5cGUgPSBvcHQudHlwZSB8fCB0eXBlKHZhbHVlcywgZik7XG4gICAgaWYgKHF0eXBlW29wdC50eXBlXSkge1xuICAgICAgdmFyIGV4dCA9IHN0YXRzLmV4dGVudCh2YWx1ZXMsIGYpO1xuICAgICAgb3B0ID0gdXRpbC5leHRlbmQoe21pbjogZXh0WzBdLCBtYXg6IGV4dFsxXX0sIG9wdCk7XG4gICAgfVxuICB9XG4gIGlmIChmKSB7IG9wdC5hY2Nlc3NvciA9IGY7IH1cbiAgcmV0dXJuIG9wdDtcbn1cblxuZnVuY3Rpb24gbnVtZXJpY2FsKHZhbHVlcywgZiwgYikge1xuICB2YXIgaCA9IGdlbi5yYW5nZShiLnN0YXJ0LCBiLnN0b3AgKyBiLnN0ZXAvMiwgYi5zdGVwKVxuICAgIC5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4ge3ZhbHVlOiBiLnZhbHVlKHYpLCBjb3VudDogMH07IH0pO1xuXG4gIGZvciAodmFyIGk9MCwgdiwgajsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBqID0gYi5pbmRleCh2KTtcbiAgICAgIGlmIChqIDwgMCB8fCBqID49IGgubGVuZ3RoIHx8ICFpc0Zpbml0ZShqKSkgY29udGludWU7XG4gICAgICBoW2pdLmNvdW50ICs9IDE7XG4gICAgfVxuICB9XG4gIGguYmlucyA9IGI7XG4gIHJldHVybiBoO1xufVxuXG5mdW5jdGlvbiBjYXRlZ29yaWNhbCh2YWx1ZXMsIGYsIHNvcnQpIHtcbiAgdmFyIHUgPSBzdGF0cy51bmlxdWUodmFsdWVzLCBmKSwgYyA9IHUuY291bnRzO1xuICByZXR1cm4gdS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4ge3ZhbHVlOiBrLCBjb3VudDogY1trXX07IH0pXG4gICAgLnNvcnQodXRpbC5jb21wYXJhdG9yKHNvcnQgPyAnLWNvdW50JyA6ICcrdmFsdWUnKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAkYmluOiAkYmluLFxuICBoaXN0b2dyYW06IGhpc3RvZ3JhbVxufTsiLCJ2YXIgZ2VuID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuZ2VuLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbCwgbikge1xuICB2YXIgYSA9IEFycmF5KG4pLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIGFbaV0gPSB2YWw7XG4gIHJldHVybiBhO1xufTtcblxuZ2VuLnplcm9zID0gZnVuY3Rpb24obikge1xuICByZXR1cm4gZ2VuLnJlcGVhdCgwLCBuKTtcbn07XG5cbmdlbi5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgIHN0ZXAgPSAxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoKHN0b3AgLSBzdGFydCkgLyBzdGVwID09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIHJhbmdlJyk7XG4gIHZhciByYW5nZSA9IFtdLCBpID0gLTEsIGo7XG4gIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIGVsc2Ugd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA8IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIHJldHVybiByYW5nZTtcbn07XG5cbmdlbi5yYW5kb20gPSB7fTtcblxuZ2VuLnJhbmRvbS51bmlmb3JtID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1pbiArIGQgKiBNYXRoLnJhbmRvbSgpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7IHJldHVybiBnZW4uemVyb3MobikubWFwKGYpOyB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIGIgPSBhO1xuICAgIGEgPSAwO1xuICB9XG4gIHZhciBkID0gYiAtIGE7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKGQgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikgeyByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTsgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLm5vcm1hbCA9IGZ1bmN0aW9uKG1lYW4sIHN0ZGV2KSB7XG4gIG1lYW4gPSBtZWFuIHx8IDA7XG4gIHN0ZGV2ID0gc3RkZXYgfHwgMTtcbiAgdmFyIG5leHQ7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHggPSAwLCB5ID0gMCwgcmRzLCBjO1xuICAgIGlmIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHggPSBuZXh0O1xuICAgICAgbmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBkbyB7XG4gICAgICB4ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICB5ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICByZHMgPSB4KnggKyB5Knk7XG4gICAgfSB3aGlsZSAocmRzID09PSAwIHx8IHJkcyA+IDEpO1xuICAgIGMgPSBNYXRoLnNxcnQoLTIqTWF0aC5sb2cocmRzKS9yZHMpOyAvLyBCb3gtTXVsbGVyIHRyYW5zZm9ybVxuICAgIG5leHQgPSBtZWFuICsgeSpjKnN0ZGV2O1xuICAgIHJldHVybiBtZWFuICsgeCpjKnN0ZGV2O1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7IHJldHVybiBnZW4uemVyb3MobikubWFwKGYpOyB9O1xuICByZXR1cm4gZjtcbn07IiwidmFyIGQzID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuZDMgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLmQzIDogbnVsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICB2YXIgZCA9IGQzLmNzdi5wYXJzZShkYXRhID8gZGF0YS50b1N0cmluZygpIDogZGF0YSk7XG4gIHJldHVybiBkO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBqc29uOiByZXF1aXJlKCcuL2pzb24nKSxcbiAgY3N2OiByZXF1aXJlKCcuL2NzdicpLFxuICB0c3Y6IHJlcXVpcmUoJy4vdHN2JyksXG4gIHRvcG9qc29uOiByZXF1aXJlKCcuL3RvcG9qc29uJyksXG4gIHRyZWVqc29uOiByZXF1aXJlKCcuL3RyZWVqc29uJylcbn07IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciBkID0gdXRpbC5pc09iamVjdChkYXRhKSAmJiAhdXRpbC5pc0J1ZmZlcihkYXRhKSA/XG4gICAgZGF0YSA6IEpTT04ucGFyc2UoZGF0YSk7XG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LnByb3BlcnR5KSB7XG4gICAgZCA9IHV0aWwuYWNjZXNzb3IoZm9ybWF0LnByb3BlcnR5KShkKTtcbiAgfVxuICByZXR1cm4gZDtcbn07XG4iLCJ2YXIganNvbiA9IHJlcXVpcmUoJy4vanNvbicpO1xudmFyIHRvcG9qc29uID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cudG9wb2pzb24gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLnRvcG9qc29uIDogbnVsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIGlmICh0b3BvanNvbiA9PSBudWxsKSB7IHRocm93IEVycm9yKCdUb3BvSlNPTiBsaWJyYXJ5IG5vdCBsb2FkZWQuJyk7IH1cblxuICB2YXIgdCA9IGpzb24oZGF0YSwgZm9ybWF0KSwgb2JqO1xuXG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LmZlYXR1cmUpIHtcbiAgICBpZiAoKG9iaiA9IHQub2JqZWN0c1tmb3JtYXQuZmVhdHVyZV0pKSB7XG4gICAgICByZXR1cm4gdG9wb2pzb24uZmVhdHVyZSh0LCBvYmopLmZlYXR1cmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBUb3BvSlNPTiBvYmplY3Q6ICcrZm9ybWF0LmZlYXR1cmUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChmb3JtYXQgJiYgZm9ybWF0Lm1lc2gpIHtcbiAgICBpZiAoKG9iaiA9IHQub2JqZWN0c1tmb3JtYXQubWVzaF0pKSB7XG4gICAgICByZXR1cm4gW3RvcG9qc29uLm1lc2godCwgdC5vYmplY3RzW2Zvcm1hdC5tZXNoXSldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBUb3BvSlNPTiBvYmplY3Q6ICcgKyBmb3JtYXQubWVzaCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdNaXNzaW5nIFRvcG9KU09OIGZlYXR1cmUgb3IgbWVzaCBwYXJhbWV0ZXIuJyk7XG4gIH1cblxuICByZXR1cm4gW107XG59O1xuIiwidmFyIGpzb24gPSByZXF1aXJlKCcuL2pzb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBmb3JtYXQpIHtcbiAgZGF0YSA9IGpzb24oZGF0YSwgZm9ybWF0KTtcbiAgcmV0dXJuIHRvVGFibGUoZGF0YSwgKGZvcm1hdCAmJiBmb3JtYXQuY2hpbGRyZW4pKTtcbn07XG5cbmZ1bmN0aW9uIHRvVGFibGUocm9vdCwgY2hpbGRyZW5GaWVsZCkge1xuICBjaGlsZHJlbkZpZWxkID0gY2hpbGRyZW5GaWVsZCB8fCAnY2hpbGRyZW4nO1xuICB2YXIgdGFibGUgPSBbXTtcbiAgXG4gIGZ1bmN0aW9uIHZpc2l0KG5vZGUpIHtcbiAgICB0YWJsZS5wdXNoKG5vZGUpO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGVbY2hpbGRyZW5GaWVsZF07XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8Y2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmlzaXQoY2hpbGRyZW5baV0sIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgdmlzaXQocm9vdCwgbnVsbCk7XG4gIHJldHVybiAodGFibGUucm9vdCA9IHJvb3QsIHRhYmxlKTtcbn0iLCJ2YXIgZDMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5kMyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuZDMgOiBudWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHZhciBkID0gZDMudHN2LnBhcnNlKGRhdGEgPyBkYXRhLnRvU3RyaW5nKCkgOiBkYXRhKTtcbiAgcmV0dXJuIGQ7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbi8vIE1hdGNoZXMgYWJzb2x1dGUgVVJMcyB3aXRoIG9wdGlvbmFsIHByb3RvY29sXG4vLyAgIGh0dHBzOi8vLi4uICAgIGZpbGU6Ly8uLi4gICAgLy8uLi5cbnZhciBwcm90b2NvbF9yZSA9IC9eKFtBLVphLXpdKzopP1xcL1xcLy87XG5cbi8vIFNwZWNpYWwgdHJlYXRtZW50IGluIG5vZGUuanMgZm9yIHRoZSBmaWxlOiBwcm90b2NvbFxudmFyIGZpbGVQcm90b2NvbCA9ICdmaWxlOi8vJztcblxuLy8gVmFsaWRhdGUgYW5kIGNsZWFudXAgVVJMIHRvIGVuc3VyZSB0aGF0IGl0IGlzIGFsbG93ZWQgdG8gYmUgYWNjZXNzZWRcbi8vIFJldHVybnMgY2xlYW5lZCB1cCBVUkwsIG9yIGZhbHNlIGlmIGFjY2VzcyBpcyBub3QgYWxsb3dlZFxuZnVuY3Rpb24gc2FuaXRpemVVcmwob3B0KSB7XG4gIHZhciB1cmwgPSBvcHQudXJsO1xuICBpZiAoIXVybCAmJiBvcHQuZmlsZSkgeyByZXR1cm4gZmlsZVByb3RvY29sICsgb3B0LmZpbGU7IH1cblxuICAvLyBJbiBjYXNlIHRoaXMgaXMgYSByZWxhdGl2ZSB1cmwgKGhhcyBubyBob3N0KSwgcHJlcGVuZCBvcHQuYmFzZVVSTFxuICBpZiAob3B0LmJhc2VVUkwgJiYgIXByb3RvY29sX3JlLnRlc3QodXJsKSkge1xuICAgIGlmICghdXRpbC5zdGFydHNXaXRoKHVybCwgJy8nKSAmJiBvcHQuYmFzZVVSTFtvcHQuYmFzZVVSTC5sZW5ndGgtMV0gIT09ICcvJykge1xuICAgICAgdXJsID0gJy8nICsgdXJsOyAvLyBFbnN1cmUgdGhhdCB0aGVyZSBpcyBhIHNsYXNoIGJldHdlZW4gdGhlIGJhc2VVUkwgKGUuZy4gaG9zdG5hbWUpIGFuZCB1cmxcbiAgICB9XG4gICAgdXJsID0gb3B0LmJhc2VVUkwgKyB1cmw7XG4gIH1cbiAgLy8gcmVsYXRpdmUgcHJvdG9jb2wsIHN0YXJ0cyB3aXRoICcvLydcbiAgaWYgKHV0aWwuaXNOb2RlICYmIHV0aWwuc3RhcnRzV2l0aCh1cmwsICcvLycpKSB7XG4gICAgdXJsID0gKG9wdC5kZWZhdWx0UHJvdG9jb2wgfHwgJ2h0dHAnKSArICc6JyArIHVybDtcbiAgfVxuICAvLyBJZiBvcHQuZG9tYWluV2hpdGVMaXN0IGlzIHNldCwgb25seSBhbGxvd3MgdXJsLCB3aG9zZSBob3N0bmFtZVxuICAvLyAqIElzIHRoZSBzYW1lIGFzIHRoZSBvcmlnaW4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSlcbiAgLy8gKiBFcXVhbHMgb25lIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHdoaXRlbGlzdFxuICAvLyAqIElzIGEgcHJvcGVyIHN1YmRvbWFpbiBvZiBvbmUgb2YgdGhlIHZhbHVlcyBpbiB0aGUgd2hpdGVsaXN0XG4gIGlmIChvcHQuZG9tYWluV2hpdGVMaXN0KSB7XG4gICAgdmFyIGRvbWFpbiwgb3JpZ2luO1xuICAgIGlmICh1dGlsLmlzTm9kZSkge1xuICAgICAgLy8gcmVsYXRpdmUgcHJvdG9jb2wgaXMgYnJva2VuOiBodHRwczovL2dpdGh1Yi5jb20vZGVmdW5jdHpvbWJpZS9ub2RlLXVybC9pc3N1ZXMvNVxuICAgICAgdmFyIHBhcnRzID0gcmVxdWlyZSgndXJsJykucGFyc2UodXJsKTtcbiAgICAgIGRvbWFpbiA9IHBhcnRzLmhvc3RuYW1lO1xuICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICAvLyBGcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzM2NTEzL2hvdy1kby1pLXBhcnNlLWEtdXJsLWludG8taG9zdG5hbWUtYW5kLXBhdGgtaW4tamF2YXNjcmlwdFxuICAgICAgLy8gSUUgZG9lc24ndCBwb3B1bGF0ZSBhbGwgbGluayBwcm9wZXJ0aWVzIHdoZW4gc2V0dGluZyAuaHJlZiB3aXRoIGEgcmVsYXRpdmUgVVJMLFxuICAgICAgLy8gaG93ZXZlciAuaHJlZiB3aWxsIHJldHVybiBhbiBhYnNvbHV0ZSBVUkwgd2hpY2ggdGhlbiBjYW4gYmUgdXNlZCBvbiBpdHNlbGZcbiAgICAgIC8vIHRvIHBvcHVsYXRlIHRoZXNlIGFkZGl0aW9uYWwgZmllbGRzLlxuICAgICAgaWYgKGEuaG9zdCA9PT0gJycpIHtcbiAgICAgICAgYS5ocmVmID0gYS5ocmVmO1xuICAgICAgfVxuICAgICAgZG9tYWluID0gYS5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgb3JpZ2luID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIH1cblxuICAgIGlmIChvcmlnaW4gIT09IGRvbWFpbikge1xuICAgICAgdmFyIHdoaXRlTGlzdGVkID0gb3B0LmRvbWFpbldoaXRlTGlzdC5zb21lKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIGlkeCA9IGRvbWFpbi5sZW5ndGggLSBkLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGQgPT09IGRvbWFpbiB8fFxuICAgICAgICAgIChpZHggPiAxICYmIGRvbWFpbltpZHgtMV0gPT09ICcuJyAmJiBkb21haW4ubGFzdEluZGV4T2YoZCkgPT09IGlkeCk7XG4gICAgICB9KTtcbiAgICAgIGlmICghd2hpdGVMaXN0ZWQpIHtcbiAgICAgICAgdGhyb3cgJ1VSTCBpcyBub3Qgd2hpdGVsaXN0ZWQ6ICcgKyB1cmw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbmZ1bmN0aW9uIGxvYWQob3B0LCBjYWxsYmFjaykge1xuICB2YXIgZXJyb3IgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlKSB7IHRocm93IGU7IH0sIHVybDtcblxuICB0cnkge1xuICAgIHVybCA9IGxvYWQuc2FuaXRpemVVcmwob3B0KTsgLy8gZW5hYmxlIG92ZXJyaWRlXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVycm9yKGVycik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICBlcnJvcignSW52YWxpZCBVUkw6ICcgKyB1cmwpO1xuICB9IGVsc2UgaWYgKCF1dGlsLmlzTm9kZSkge1xuICAgIC8vIGluIGJyb3dzZXIsIHVzZSB4aHJcbiAgICByZXR1cm4geGhyKHVybCwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHV0aWwuc3RhcnRzV2l0aCh1cmwsIGZpbGVQcm90b2NvbCkpIHtcbiAgICAvLyBpbiBub2RlLmpzLCBpZiB1cmwgc3RhcnRzIHdpdGggJ2ZpbGU6Ly8nLCBzdHJpcCBpdCBhbmQgbG9hZCBmcm9tIGZpbGVcbiAgICByZXR1cm4gZmlsZSh1cmwuc2xpY2UoZmlsZVByb3RvY29sLmxlbmd0aCksIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmICh1cmwuaW5kZXhPZignOi8vJykgPCAwKSB7IC8vIFRPRE8gYmV0dGVyIHByb3RvY29sIGNoZWNrP1xuICAgIC8vIGlmIG5vZGUuanMsIGlmIG5vIHByb3RvY29sIGFzc3VtZSBmaWxlXG4gICAgcmV0dXJuIGZpbGUodXJsLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgLy8gZm9yIHJlZ3VsYXIgVVJMcyBpbiBub2RlLmpzXG4gICAgcmV0dXJuIGh0dHAodXJsLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24geGhySGFzUmVzcG9uc2UocmVxdWVzdCkge1xuICB2YXIgdHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuICByZXR1cm4gdHlwZSAmJiB0eXBlICE9PSAndGV4dCcgP1xuICAgIHJlcXVlc3QucmVzcG9uc2UgOiAvLyBudWxsIG9uIGVycm9yXG4gICAgcmVxdWVzdC5yZXNwb25zZVRleHQ7IC8vICcnIG9uIGVycm9yXG59XG5cbmZ1bmN0aW9uIHhocih1cmwsIGNhbGxiYWNrKSB7XG4gIHZhciBhc3luYyA9ICEhY2FsbGJhY2s7XG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIC8vIElmIElFIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgdXNlIFhEb21haW5SZXF1ZXN0IChjb3BpZWQgZnJvbSBkMy54aHIpXG4gIGlmICh0aGlzLlhEb21haW5SZXF1ZXN0ICYmXG4gICAgICAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAvXihodHRwKHMpPzopP1xcL1xcLy8udGVzdCh1cmwpKSByZXF1ZXN0ID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uZCgpIHtcbiAgICB2YXIgc3RhdHVzID0gcmVxdWVzdC5zdGF0dXM7XG4gICAgaWYgKCFzdGF0dXMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkgfHwgc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVxdWVzdCwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFzeW5jKSB7XG4gICAgaWYgKCdvbmxvYWQnIGluIHJlcXVlc3QpIHtcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gcmVxdWVzdC5vbmVycm9yID0gcmVzcG9uZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA+IDMpIHJlc3BvbmQoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIFxuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgYXN5bmMpO1xuICByZXF1ZXN0LnNlbmQoKTtcbiAgXG4gIGlmICghYXN5bmMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkpIHtcbiAgICByZXR1cm4gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmlsZShmaWxlbmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4Jyk7XG4gIH1cbiAgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZShmaWxlbmFtZSwgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBodHRwKHVybCwgY2FsbGJhY2spIHtcbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiByZXF1aXJlKCdzeW5jLXJlcXVlc3QnKSgnR0VUJywgdXJsKS5nZXRCb2R5KCk7XG4gIH1cbiAgcmVxdWlyZSgncmVxdWVzdCcpKHVybCwgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgfVxuICB9KTtcbn1cblxubG9hZC5zYW5pdGl6ZVVybCA9IHNhbml0aXplVXJsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWQ7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5mdW5jdGlvbiByZWFkKGRhdGEsIGZvcm1hdCkge1xuICB2YXIgdHlwZSA9IChmb3JtYXQgJiYgZm9ybWF0LnR5cGUpIHx8ICdqc29uJztcbiAgZGF0YSA9IGZvcm1hdHNbdHlwZV0oZGF0YSwgZm9ybWF0KTtcbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQucGFyc2UpIHBhcnNlKGRhdGEsIGZvcm1hdC5wYXJzZSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBwYXJzZShkYXRhLCB0eXBlcykge1xuICB2YXIgY29scywgcGFyc2VycywgZCwgaSwgaiwgY2xlbiwgbGVuID0gZGF0YS5sZW5ndGg7XG5cbiAgdHlwZXMgPSAodHlwZXM9PT0nYXV0bycpID8gdHlwZS5pbmZlckFsbChkYXRhKSA6IHV0aWwuZHVwbGljYXRlKHR5cGVzKTtcbiAgY29scyA9IHV0aWwua2V5cyh0eXBlcyk7XG4gIHBhcnNlcnMgPSBjb2xzLm1hcChmdW5jdGlvbihjKSB7IHJldHVybiB0eXBlLnBhcnNlcnNbdHlwZXNbY11dOyB9KTtcblxuICBmb3IgKGk9MCwgY2xlbj1jb2xzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIGQgPSBkYXRhW2ldO1xuICAgIGZvciAoaj0wOyBqPGNsZW47ICsraikge1xuICAgICAgZFtjb2xzW2pdXSA9IHBhcnNlcnNbal0oZFtjb2xzW2pdXSk7XG4gICAgfVxuICB9XG4gIHR5cGUuYW5ub3RhdGlvbihkYXRhLCB0eXBlcyk7XG59XG5cbnJlYWQuZm9ybWF0cyA9IGZvcm1hdHM7XG5tb2R1bGUuZXhwb3J0cyA9IHJlYWQ7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBsb2FkID0gcmVxdWlyZSgnLi9sb2FkJyk7XG52YXIgcmVhZCA9IHJlcXVpcmUoJy4vcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxcbiAgLmtleXMocmVhZC5mb3JtYXRzKVxuICAucmVkdWNlKGZ1bmN0aW9uKG91dCwgdHlwZSkge1xuICAgIG91dFt0eXBlXSA9IGZ1bmN0aW9uKG9wdCwgZm9ybWF0LCBjYWxsYmFjaykge1xuICAgICAgLy8gcHJvY2VzcyBhcmd1bWVudHNcbiAgICAgIGlmICh1dGlsLmlzU3RyaW5nKG9wdCkpIHsgb3B0ID0ge3VybDogb3B0fTsgfVxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdXRpbC5pc0Z1bmN0aW9uKGZvcm1hdCkpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBmb3JtYXQ7XG4gICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHVwIHJlYWQgZm9ybWF0XG4gICAgICBmb3JtYXQgPSB1dGlsLmV4dGVuZCh7cGFyc2U6ICdhdXRvJ30sIGZvcm1hdCk7XG4gICAgICBmb3JtYXQudHlwZSA9IHR5cGU7XG5cbiAgICAgIC8vIGxvYWQgZGF0YVxuICAgICAgdmFyIGRhdGEgPSBsb2FkKG9wdCwgY2FsbGJhY2sgPyBmdW5jdGlvbihlcnJvciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyb3IpIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBkYXRhIGxvYWRlZCwgbm93IHBhcnNlIGl0IChhc3luYylcbiAgICAgICAgICBkYXRhID0gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICB9IDogdW5kZWZpbmVkKTtcbiAgICAgIFxuICAgICAgLy8gZGF0YSBsb2FkZWQsIG5vdyBwYXJzZSBpdCAoc3luYylcbiAgICAgIGlmIChkYXRhKSByZXR1cm4gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgIH07XG4gICAgcmV0dXJuIG91dDtcbiAgfSwge30pO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciBUWVBFUyA9ICdfX3R5cGVzX18nO1xuXG52YXIgUEFSU0VSUyA9IHtcbiAgYm9vbGVhbjogdXRpbC5ib29sZWFuLFxuICBpbnRlZ2VyOiB1dGlsLm51bWJlcixcbiAgbnVtYmVyOiAgdXRpbC5udW1iZXIsXG4gIGRhdGU6ICAgIHV0aWwuZGF0ZSxcbiAgc3RyaW5nOiAgdXRpbC5pZGVudGl0eVxufTtcblxudmFyIFRFU1RTID0ge1xuICBib29sZWFuOiBmdW5jdGlvbih4KSB7IHJldHVybiB4PT09J3RydWUnIHx8IHg9PT0nZmFsc2UnIHx8IHV0aWwuaXNCb29sZWFuKHgpOyB9LFxuICBpbnRlZ2VyOiBmdW5jdGlvbih4KSB7IHJldHVybiBURVNUUy5udW1iZXIoeCkgJiYgKHg9K3gpID09PSB+fng7IH0sXG4gIG51bWJlcjogZnVuY3Rpb24oeCkgeyByZXR1cm4gIWlzTmFOKCt4KSAmJiAhdXRpbC5pc0RhdGUoeCk7IH0sXG4gIGRhdGU6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKHgpKTsgfVxufTtcblxuZnVuY3Rpb24gYW5ub3RhdGlvbihkYXRhLCB0eXBlcykge1xuICBpZiAoIXR5cGVzKSByZXR1cm4gZGF0YSAmJiBkYXRhW1RZUEVTXSB8fCBudWxsO1xuICBkYXRhW1RZUEVTXSA9IHR5cGVzO1xufVxuXG5mdW5jdGlvbiB0eXBlKHZhbHVlcywgZikge1xuICB2YXIgdiwgaSwgbjtcblxuICAvLyBpZiBkYXRhIGFycmF5IGhhcyB0eXBlIGFubm90YXRpb25zLCB1c2UgdGhlbVxuICBpZiAodmFsdWVzW1RZUEVTXSkge1xuICAgIHYgPSBmKHZhbHVlc1tUWVBFU10pO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHYpKSByZXR1cm4gdjtcbiAgfVxuXG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7ICF1dGlsLmlzVmFsaWQodikgJiYgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgfVxuXG4gIHJldHVybiB1dGlsLmlzRGF0ZSh2KSA/ICdkYXRlJyA6XG4gICAgdXRpbC5pc051bWJlcih2KSAgICA/ICdudW1iZXInIDpcbiAgICB1dGlsLmlzQm9vbGVhbih2KSAgID8gJ2Jvb2xlYW4nIDpcbiAgICB1dGlsLmlzU3RyaW5nKHYpICAgID8gJ3N0cmluZycgOiBudWxsO1xufVxuXG5mdW5jdGlvbiB0eXBlQWxsKGRhdGEsIGZpZWxkcykge1xuICBpZiAoIWRhdGEubGVuZ3RoKSByZXR1cm47XG4gIGZpZWxkcyA9IGZpZWxkcyB8fCB1dGlsLmtleXMoZGF0YVswXSk7XG4gIHJldHVybiBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uKHR5cGVzLCBmKSB7XG4gICAgcmV0dXJuICh0eXBlc1tmXSA9IHR5cGUoZGF0YSwgdXRpbC4kKGYpKSwgdHlwZXMpO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGluZmVyKHZhbHVlcywgZikge1xuICB2YXIgaSwgaiwgdjtcblxuICAvLyB0eXBlcyB0byB0ZXN0IGZvciwgaW4gcHJlY2VkZW5jZSBvcmRlclxuICB2YXIgdHlwZXMgPSBbJ2Jvb2xlYW4nLCAnaW50ZWdlcicsICdudW1iZXInLCAnZGF0ZSddO1xuXG4gIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIC8vIGdldCBuZXh0IHZhbHVlIHRvIHRlc3RcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICAvLyB0ZXN0IHZhbHVlIGFnYWluc3QgcmVtYWluaW5nIHR5cGVzXG4gICAgZm9yIChqPTA7IGo8dHlwZXMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmICh1dGlsLmlzVmFsaWQodikgJiYgIVRFU1RTW3R5cGVzW2pdXSh2KSkge1xuICAgICAgICB0eXBlcy5zcGxpY2UoaiwgMSk7XG4gICAgICAgIGogLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgbm8gdHlwZXMgbGVmdCwgcmV0dXJuICdzdHJpbmcnXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICdzdHJpbmcnO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpbmZlckFsbChkYXRhLCBmaWVsZHMpIHtcbiAgZmllbGRzID0gZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKTtcbiAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24odHlwZXMsIGYpIHtcbiAgICB2YXIgdHlwZSA9IGluZmVyKGRhdGEsIHV0aWwuJChmKSk7XG4gICAgaWYgKFBBUlNFUlNbdHlwZV0pIHR5cGVzW2ZdID0gdHlwZTtcbiAgICByZXR1cm4gdHlwZXM7XG4gIH0sIHt9KTtcbn1cblxudHlwZS5hbm5vdGF0aW9uID0gYW5ub3RhdGlvbjtcbnR5cGUuYWxsID0gdHlwZUFsbDtcbnR5cGUuaW5mZXIgPSBpbmZlcjtcbnR5cGUuaW5mZXJBbGwgPSBpbmZlckFsbDtcbnR5cGUucGFyc2VycyA9IFBBUlNFUlM7XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGU7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBnZW4gPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgc3RhdHMgPSB7fTtcblxuLy8gQ29sbGVjdCB1bmlxdWUgdmFsdWVzIGFuZCBhc3NvY2lhdGVkIGNvdW50cy5cbi8vIE91dHB1dDogYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlcywgaW4gb2JzZXJ2ZWQgb3JkZXJcbi8vIFRoZSBhcnJheSBpbmNsdWRlcyBhbiBhZGRpdGlvbmFsICdjb3VudHMnIHByb3BlcnR5LFxuLy8gd2hpY2ggaXMgYSBoYXNoIGZyb20gdW5pcXVlIHZhbHVlcyB0byBvY2N1cnJlbmNlIGNvdW50cy5cbnN0YXRzLnVuaXF1ZSA9IGZ1bmN0aW9uKHZhbHVlcywgZiwgcmVzdWx0cykge1xuICBmID0gdXRpbC4kKGYpO1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSB7XG4gICAgICB1W3ZdICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVbdl0gPSAxO1xuICAgICAgcmVzdWx0cy5wdXNoKHYpO1xuICAgIH1cbiAgfVxuICByZXN1bHRzLmNvdW50cyA9IHU7XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGlucHV0IGFycmF5Llxuc3RhdHMuY291bnQgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoIHx8IDA7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIG5vbi1udWxsLCBub24tdW5kZWZpbmVkLCBub24tTmFOIHZhbHVlcy5cbnN0YXRzLmNvdW50LnZhbGlkID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuLCB2YWxpZCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgdmFsaWQgKz0gMTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlcy5cbnN0YXRzLmNvdW50Lm1pc3NpbmcgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHYsIGksIG4sIGNvdW50ID0gMDtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiA9PSBudWxsKSBjb3VudCArPSAxO1xuICB9XG4gIHJldHVybiBjb3VudDtcbn07XG5cbi8vIENvdW50IHRoZSBudW1iZXIgb2YgZGlzdGluY3QgdmFsdWVzLlxuLy8gTnVsbCwgdW5kZWZpbmVkIGFuZCBOYU4gYXJlIGVhY2ggY29uc2lkZXJlZCBkaXN0aW5jdCB2YWx1ZXMuXG5zdGF0cy5jb3VudC5kaXN0aW5jdCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuLCBjb3VudCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgaW4gdSkgY29udGludWU7XG4gICAgdVt2XSA9IDE7XG4gICAgY291bnQgKz0gMTtcbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtZWRpYW4gb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLm1lZGlhbiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBpZiAoZikgdmFsdWVzID0gdmFsdWVzLm1hcCh1dGlsLiQoZikpO1xuICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKHV0aWwuaXNWYWxpZCkuc29ydCh1dGlsLmNtcCk7XG4gIHJldHVybiBzdGF0cy5xdWFudGlsZSh2YWx1ZXMsIDAuNSk7XG59O1xuXG4vLyBDb21wdXRlcyB0aGUgcXVhcnRpbGUgYm91bmRhcmllcyBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMucXVhcnRpbGUgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgaWYgKGYpIHZhbHVlcyA9IHZhbHVlcy5tYXAodXRpbC4kKGYpKTtcbiAgdmFsdWVzID0gdmFsdWVzLmZpbHRlcih1dGlsLmlzVmFsaWQpLnNvcnQodXRpbC5jbXApO1xuICB2YXIgcSA9IHN0YXRzLnF1YW50aWxlO1xuICByZXR1cm4gW3EodmFsdWVzLCAwLjI1KSwgcSh2YWx1ZXMsIDAuNTApLCBxKHZhbHVlcywgMC43NSldO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgcXVhbnRpbGUgb2YgYSBzb3J0ZWQgYXJyYXkgb2YgbnVtYmVycy5cbi8vIEFkYXB0ZWQgZnJvbSB0aGUgRDMuanMgaW1wbGVtZW50YXRpb24uXG5zdGF0cy5xdWFudGlsZSA9IGZ1bmN0aW9uKHZhbHVlcywgZiwgcCkge1xuICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7IHAgPSBmOyBmID0gdXRpbC5pZGVudGl0eTsgfVxuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgSCA9ICh2YWx1ZXMubGVuZ3RoIC0gMSkgKiBwICsgMSxcbiAgICAgIGggPSBNYXRoLmZsb29yKEgpLFxuICAgICAgdiA9ICtmKHZhbHVlc1toIC0gMV0pLFxuICAgICAgZSA9IEggLSBoO1xuICByZXR1cm4gZSA/IHYgKyBlICogKGYodmFsdWVzW2hdKSAtIHYpIDogdjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHN1bSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMuc3VtID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIGZvciAodmFyIHN1bT0wLCBpPTAsIG49dmFsdWVzLmxlbmd0aCwgdjsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSBzdW0gKz0gdjtcbiAgfVxuICByZXR1cm4gc3VtO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbWVhbiAoYXZlcmFnZSkgb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLm1lYW4gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIG1lYW4gPSAwLCBkZWx0YSwgaSwgbiwgYywgdjtcbiAgZm9yIChpPTAsIGM9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGRlbHRhID0gdiAtIG1lYW47XG4gICAgICBtZWFuID0gbWVhbiArIGRlbHRhIC8gKCsrYyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtZWFuO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc2FtcGxlIHZhcmlhbmNlIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy52YXJpYW5jZSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICBpZiAoIXV0aWwuaXNBcnJheSh2YWx1ZXMpIHx8IHZhbHVlcy5sZW5ndGg9PT0wKSByZXR1cm4gMDtcbiAgdmFyIG1lYW4gPSAwLCBNMiA9IDAsIGRlbHRhLCBpLCBjLCB2O1xuICBmb3IgKGk9MCwgYz0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGRlbHRhID0gdiAtIG1lYW47XG4gICAgICBtZWFuID0gbWVhbiArIGRlbHRhIC8gKCsrYyk7XG4gICAgICBNMiA9IE0yICsgZGVsdGEgKiAodiAtIG1lYW4pO1xuICAgIH1cbiAgfVxuICBNMiA9IE0yIC8gKGMgLSAxKTtcbiAgcmV0dXJuIE0yO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc2FtcGxlIHN0YW5kYXJkIGRldmlhdGlvbiBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMuc3RkZXYgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgcmV0dXJuIE1hdGguc3FydChzdGF0cy52YXJpYW5jZSh2YWx1ZXMsIGYpKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIFBlYXJzb24gbW9kZSBza2V3bmVzcyAoKG1lZGlhbi1tZWFuKS9zdGRldikgb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLm1vZGVza2V3ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHZhciBhdmcgPSBzdGF0cy5tZWFuKHZhbHVlcywgZiksXG4gICAgICBtZWQgPSBzdGF0cy5tZWRpYW4odmFsdWVzLCBmKSxcbiAgICAgIHN0ZCA9IHN0YXRzLnN0ZGV2KHZhbHVlcywgZik7XG4gIHJldHVybiBzdGQgPT09IDAgPyAwIDogKGF2ZyAtIG1lZCkgLyBzdGQ7XG59O1xuXG4vLyBGaW5kIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIG9mIGFuIGFycmF5IG9mIHZhbHVlcy5cbnN0YXRzLmV4dGVudCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgYSwgYiwgdiwgaSwgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHsgYSA9IGIgPSB2OyBicmVhazsgfVxuICB9XG4gIGZvciAoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGlmICh2IDwgYSkgYSA9IHY7XG4gICAgICBpZiAodiA+IGIpIGIgPSB2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gW2EsIGJdO1xufTtcblxuLy8gRmluZCB0aGUgaW50ZWdlciBpbmRpY2VzIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cbnN0YXRzLmV4dGVudC5pbmRleCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgYSwgYiwgeCwgeSwgdiwgaSwgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHsgYSA9IGIgPSB2OyB4ID0geSA9IGk7IGJyZWFrOyB9XG4gIH1cbiAgZm9yICg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaWYgKHYgPCBhKSB7IGEgPSB2OyB4ID0gaTsgfVxuICAgICAgaWYgKHYgPiBiKSB7IGIgPSB2OyB5ID0gaTsgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3gsIHldO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuc3RhdHMuZG90ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBzdW0gPSAwLCBpLCB2O1xuICBpZiAoIWIpIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCAhPT0gYS5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKCdBcnJheSBsZW5ndGhzIG11c3QgbWF0Y2guJyk7XG4gICAgfVxuICAgIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHZhbHVlc1tpXSAqIGFbaV07XG4gICAgICBpZiAoIU51bWJlci5pc05hTih2KSkgc3VtICs9IHY7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGEgPSB1dGlsLiQoYSk7XG4gICAgYiA9IHV0aWwuJChiKTtcbiAgICBmb3IgKGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBhKHZhbHVlc1tpXSkgKiBiKHZhbHVlc1tpXSk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTih2KSkgc3VtICs9IHY7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBDb21wdXRlIGFzY2VuZGluZyByYW5rIHNjb3JlcyBmb3IgYW4gYXJyYXkgb2YgdmFsdWVzLlxuLy8gVGllcyBhcmUgYXNzaWduZWQgdGhlaXIgY29sbGVjdGl2ZSBtZWFuIHJhbmsuXG5zdGF0cy5yYW5rID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZikgfHwgdXRpbC5pZGVudGl0eTtcbiAgdmFyIGEgPSB2YWx1ZXMubWFwKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgIHJldHVybiB7aWR4OiBpLCB2YWw6IGYodil9O1xuICAgIH0pXG4gICAgLnNvcnQodXRpbC5jb21wYXJhdG9yKCd2YWwnKSk7XG5cbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgciA9IEFycmF5KG4pLFxuICAgICAgdGllID0gLTEsIHAgPSB7fSwgaSwgdiwgbXU7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgdiA9IGFbaV0udmFsO1xuICAgIGlmICh0aWUgPCAwICYmIHAgPT09IHYpIHtcbiAgICAgIHRpZSA9IGkgLSAxO1xuICAgIH0gZWxzZSBpZiAodGllID4gLTEgJiYgcCAhPT0gdikge1xuICAgICAgbXUgPSAxICsgKGktMSArIHRpZSkgLyAyO1xuICAgICAgZm9yICg7IHRpZTxpOyArK3RpZSkgclthW3RpZV0uaWR4XSA9IG11O1xuICAgICAgdGllID0gLTE7XG4gICAgfVxuICAgIHJbYVtpXS5pZHhdID0gaSArIDE7XG4gICAgcCA9IHY7XG4gIH1cblxuICBpZiAodGllID4gLTEpIHtcbiAgICBtdSA9IDEgKyAobi0xICsgdGllKSAvIDI7XG4gICAgZm9yICg7IHRpZTxuOyArK3RpZSkgclthW3RpZV0uaWR4XSA9IG11O1xuICB9XG5cbiAgcmV0dXJuIHI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgUGVhcnNvbiBwcm9kdWN0LW1vbWVudCBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG5zdGF0cy5jb3IgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIGZuID0gYjtcbiAgYiA9IGZuID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYTtcbiAgYSA9IGZuID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzO1xuXG4gIHZhciBkb3QgPSBzdGF0cy5kb3QoYSwgYiksXG4gICAgICBtdWEgPSBzdGF0cy5tZWFuKGEpLFxuICAgICAgbXViID0gc3RhdHMubWVhbihiKSxcbiAgICAgIHNkYSA9IHN0YXRzLnN0ZGV2KGEpLFxuICAgICAgc2RiID0gc3RhdHMuc3RkZXYoYiksXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aDtcblxuICByZXR1cm4gKGRvdCAtIG4qbXVhKm11YikgLyAoKG4tMSkgKiBzZGEgKiBzZGIpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgU3BlYXJtYW4gcmFuayBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIHZhbHVlcy5cbnN0YXRzLmNvci5yYW5rID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciByYSA9IGIgPyBzdGF0cy5yYW5rKHZhbHVlcywgdXRpbC4kKGEpKSA6IHN0YXRzLnJhbmsodmFsdWVzKSxcbiAgICAgIHJiID0gYiA/IHN0YXRzLnJhbmsodmFsdWVzLCB1dGlsLiQoYikpIDogc3RhdHMucmFuayhhKSxcbiAgICAgIG4gPSB2YWx1ZXMubGVuZ3RoLCBpLCBzLCBkO1xuXG4gIGZvciAoaT0wLCBzPTA7IGk8bjsgKytpKSB7XG4gICAgZCA9IHJhW2ldIC0gcmJbaV07XG4gICAgcyArPSBkICogZDtcbiAgfVxuXG4gIHJldHVybiAxIC0gNipzIC8gKG4gKiAobipuLTEpKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIGRpc3RhbmNlIGNvcnJlbGF0aW9uIG9mIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlzdGFuY2VfY29ycmVsYXRpb25cbnN0YXRzLmNvci5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBYID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGEpKSA6IHZhbHVlcyxcbiAgICAgIFkgPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYTtcblxuICB2YXIgQSA9IHN0YXRzLmRpc3QubWF0KFgpLFxuICAgICAgQiA9IHN0YXRzLmRpc3QubWF0KFkpLFxuICAgICAgbiA9IEEubGVuZ3RoLFxuICAgICAgaSwgYWEsIGJiLCBhYjtcblxuICBmb3IgKGk9MCwgYWE9MCwgYmI9MCwgYWI9MDsgaTxuOyArK2kpIHtcbiAgICBhYSArPSBBW2ldKkFbaV07XG4gICAgYmIgKz0gQltpXSpCW2ldO1xuICAgIGFiICs9IEFbaV0qQltpXTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQoYWIgLyBNYXRoLnNxcnQoYWEqYmIpKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHZlY3RvciBkaXN0YW5jZSBiZXR3ZWVuIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbi8vIERlZmF1bHQgaXMgRXVjbGlkZWFuIChleHA9MikgZGlzdGFuY2UsIGNvbmZpZ3VyYWJsZSB2aWEgZXhwIGFyZ3VtZW50Llxuc3RhdHMuZGlzdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgZXhwKSB7XG4gIHZhciBmID0gdXRpbC5pc0Z1bmN0aW9uKGIpIHx8IHV0aWwuaXNTdHJpbmcoYiksXG4gICAgICBYID0gdmFsdWVzLFxuICAgICAgWSA9IGYgPyB2YWx1ZXMgOiBhLFxuICAgICAgZSA9IGYgPyBleHAgOiBiLFxuICAgICAgTDIgPSBlID09PSAyIHx8IGUgPT0gbnVsbCxcbiAgICAgIG4gPSB2YWx1ZXMubGVuZ3RoLCBzID0gMCwgZCwgaTtcbiAgaWYgKGYpIHtcbiAgICBhID0gdXRpbC4kKGEpO1xuICAgIGIgPSB1dGlsLiQoYik7XG4gIH1cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgZCA9IGYgPyAoYShYW2ldKS1iKFlbaV0pKSA6IChYW2ldLVlbaV0pO1xuICAgIHMgKz0gTDIgPyBkKmQgOiBNYXRoLnBvdyhNYXRoLmFicyhkKSwgZSk7XG4gIH1cbiAgcmV0dXJuIEwyID8gTWF0aC5zcXJ0KHMpIDogTWF0aC5wb3cocywgMS9lKTtcbn07XG5cbi8vIENvbnN0cnVjdCBhIG1lYW4tY2VudGVyZWQgZGlzdGFuY2UgbWF0cml4IGZvciBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMuZGlzdC5tYXQgPSBmdW5jdGlvbihYKSB7XG4gIHZhciBuID0gWC5sZW5ndGgsXG4gICAgICBtID0gbipuLFxuICAgICAgQSA9IEFycmF5KG0pLFxuICAgICAgUiA9IGdlbi56ZXJvcyhuKSxcbiAgICAgIE0gPSAwLCB2LCBpLCBqO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIEFbaSpuK2ldID0gMDtcbiAgICBmb3IgKGo9aSsxOyBqPG47ICsraikge1xuICAgICAgQVtpKm4ral0gPSAodiA9IE1hdGguYWJzKFhbaV0gLSBYW2pdKSk7XG4gICAgICBBW2oqbitpXSA9IHY7XG4gICAgICBSW2ldICs9IHY7XG4gICAgICBSW2pdICs9IHY7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgTSArPSBSW2ldO1xuICAgIFJbaV0gLz0gbjtcbiAgfVxuICBNIC89IG07XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgZm9yIChqPWk7IGo8bjsgKytqKSB7XG4gICAgICBBW2kqbitqXSArPSBNIC0gUltpXSAtIFJbal07XG4gICAgICBBW2oqbitpXSA9IEFbaSpuK2pdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBBO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgU2hhbm5vbiBlbnRyb3B5IChsb2cgYmFzZSAyKSBvZiBhbiBhcnJheSBvZiBjb3VudHMuXG5zdGF0cy5lbnRyb3B5ID0gZnVuY3Rpb24oY291bnRzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBpLCBwLCBzID0gMCwgSCA9IDAsIG4gPSBjb3VudHMubGVuZ3RoO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBzICs9IChmID8gZihjb3VudHNbaV0pIDogY291bnRzW2ldKTtcbiAgfVxuICBpZiAocyA9PT0gMCkgcmV0dXJuIDA7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHAgPSAoZiA/IGYoY291bnRzW2ldKSA6IGNvdW50c1tpXSkgLyBzO1xuICAgIGlmIChwKSBIICs9IHAgKiBNYXRoLmxvZyhwKTtcbiAgfVxuICByZXR1cm4gLUggLyBNYXRoLkxOMjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG4vLyBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBmb3JtIFtNSSwgTUlfZGlzdGFuY2VdIFxuLy8gTUlfZGlzdGFuY2UgaXMgZGVmaW5lZCBhcyAxIC0gSShhLGIpIC8gSChhLGIpLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NdXR1YWxfaW5mb3JtYXRpb25cbnN0YXRzLm11dHVhbCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHZhciB4ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgeSA9IGNvdW50cyA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICB6ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoY291bnRzKSkgOiBiO1xuXG4gIHZhciBweCA9IHt9LFxuICAgICAgcHkgPSB7fSxcbiAgICAgIG4gPSB6Lmxlbmd0aCxcbiAgICAgIHMgPSAwLCBJID0gMCwgSCA9IDAsIHAsIHQsIGk7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcHhbeFtpXV0gPSAwO1xuICAgIHB5W3lbaV1dID0gMDtcbiAgfVxuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHB4W3hbaV1dICs9IHpbaV07XG4gICAgcHlbeVtpXV0gKz0geltpXTtcbiAgICBzICs9IHpbaV07XG4gIH1cblxuICB0ID0gMSAvIChzICogTWF0aC5MTjIpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBpZiAoeltpXSA9PT0gMCkgY29udGludWU7XG4gICAgcCA9IChzICogeltpXSkgLyAocHhbeFtpXV0gKiBweVt5W2ldXSk7XG4gICAgSSArPSB6W2ldICogdCAqIE1hdGgubG9nKHApO1xuICAgIEggKz0geltpXSAqIHQgKiBNYXRoLmxvZyh6W2ldL3MpO1xuICB9XG5cbiAgcmV0dXJuIFtJLCAxICsgSS9IXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG5zdGF0cy5tdXR1YWwuaW5mbyA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHJldHVybiBzdGF0cy5tdXR1YWwodmFsdWVzLCBhLCBiLCBjb3VudHMpWzBdO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGRpc3RhbmNlIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbi8vIE1JX2Rpc3RhbmNlIGlzIGRlZmluZWQgYXMgMSAtIEkoYSxiKSAvIEgoYSxiKS5cbnN0YXRzLm11dHVhbC5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBjb3VudHMpIHtcbiAgcmV0dXJuIHN0YXRzLm11dHVhbCh2YWx1ZXMsIGEsIGIsIGNvdW50cylbMV07XG59O1xuXG4vLyBDb21wdXRlIGEgcHJvZmlsZSBvZiBzdW1tYXJ5IHN0YXRpc3RpY3MgZm9yIGEgdmFyaWFibGUuXG5zdGF0cy5wcm9maWxlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHZhciBtZWFuID0gMCxcbiAgICAgIHZhbGlkID0gMCxcbiAgICAgIG1pc3NpbmcgPSAwLFxuICAgICAgZGlzdGluY3QgPSAwLFxuICAgICAgbWluID0gbnVsbCxcbiAgICAgIG1heCA9IG51bGwsXG4gICAgICBNMiA9IDAsXG4gICAgICB2YWxzID0gW10sXG4gICAgICB1ID0ge30sIGRlbHRhLCBzZCwgaSwgdiwgeDtcblxuICAvLyBjb21wdXRlIHN1bW1hcnkgc3RhdHNcbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG5cbiAgICAvLyB1cGRhdGUgdW5pcXVlIHZhbHVlc1xuICAgIHVbdl0gPSAodiBpbiB1KSA/IHVbdl0gKyAxIDogKGRpc3RpbmN0ICs9IDEsIDEpO1xuXG4gICAgaWYgKHYgPT0gbnVsbCkge1xuICAgICAgKyttaXNzaW5nO1xuICAgIH0gZWxzZSBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICAvLyB1cGRhdGUgc3RhdHNcbiAgICAgIHggPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSA/IHYubGVuZ3RoIDogdjtcbiAgICAgIGlmIChtaW49PT1udWxsIHx8IHggPCBtaW4pIG1pbiA9IHg7XG4gICAgICBpZiAobWF4PT09bnVsbCB8fCB4ID4gbWF4KSBtYXggPSB4O1xuICAgICAgZGVsdGEgPSB4IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKyt2YWxpZCk7XG4gICAgICBNMiA9IE0yICsgZGVsdGEgKiAoeCAtIG1lYW4pO1xuICAgICAgdmFscy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICBNMiA9IE0yIC8gKHZhbGlkIC0gMSk7XG4gIHNkID0gTWF0aC5zcXJ0KE0yKTtcblxuICAvLyBzb3J0IHZhbHVlcyBmb3IgbWVkaWFuIGFuZCBpcXJcbiAgdmFscy5zb3J0KHV0aWwuY21wKTtcblxuICByZXR1cm4ge1xuICAgIHVuaXF1ZTogICB1LFxuICAgIGNvdW50OiAgICB2YWx1ZXMubGVuZ3RoLFxuICAgIHZhbGlkOiAgICB2YWxpZCxcbiAgICBtaXNzaW5nOiAgbWlzc2luZyxcbiAgICBkaXN0aW5jdDogZGlzdGluY3QsXG4gICAgbWluOiAgICAgIG1pbixcbiAgICBtYXg6ICAgICAgbWF4LFxuICAgIG1lYW46ICAgICBtZWFuLFxuICAgIHN0ZGV2OiAgICBzZCxcbiAgICBtZWRpYW46ICAgKHYgPSBzdGF0cy5xdWFudGlsZSh2YWxzLCAwLjUpKSxcbiAgICBxMTogICAgICAgc3RhdHMucXVhbnRpbGUodmFscywgMC4yNSksXG4gICAgcTM6ICAgICAgIHN0YXRzLnF1YW50aWxlKHZhbHMsIDAuNzUpLFxuICAgIG1vZGVza2V3OiBzZCA9PT0gMCA/IDAgOiAobWVhbiAtIHYpIC8gc2RcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdHM7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBzdGF0cyA9IHJlcXVpcmUoJy4vc3RhdHMnKTtcblxuLy8gQ29tcHV0ZSBwcm9maWxlcyBmb3IgYWxsIHZhcmlhYmxlcyBpbiBhIGRhdGEgc2V0LlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBmaWVsZHMpIHtcbiAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIGZpZWxkcyA9IGZpZWxkcyB8fCB1dGlsLmtleXMoZGF0YVswXSk7XG5cbiAgdmFyIHByb2ZpbGVzID0gZmllbGRzLm1hcChmdW5jdGlvbihmKSB7XG4gICAgdmFyIHAgPSBzdGF0cy5wcm9maWxlKGRhdGEsIHV0aWwuYWNjZXNzb3IoZikpO1xuICAgIHJldHVybiAocC5maWVsZCA9IGYsIHApO1xuICB9KTtcbiAgXG4gIHByb2ZpbGVzLnRvU3RyaW5nID0gcHJpbnRTdW1tYXJ5O1xuICByZXR1cm4gcHJvZmlsZXM7XG59O1xuXG5mdW5jdGlvbiBwcmludFN1bW1hcnkoKSB7XG4gIHZhciBwcm9maWxlcyA9IHRoaXM7XG4gIHZhciBzdHIgPSBbXTtcbiAgcHJvZmlsZXMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgc3RyLnB1c2goJy0tLS0tIEZpZWxkOiBcXCcnICsgcC5maWVsZCArICdcXCcgLS0tLS0nKTtcbiAgICBpZiAodHlwZW9mIHAubWluID09PSAnc3RyaW5nJyB8fCBwLmRpc3RpbmN0IDwgMTApIHtcbiAgICAgIHN0ci5wdXNoKHByaW50Q2F0ZWdvcmljYWxQcm9maWxlKHApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyLnB1c2gocHJpbnRRdWFudGl0YXRpdmVQcm9maWxlKHApKTtcbiAgICB9XG4gICAgc3RyLnB1c2goJycpO1xuICB9KTtcbiAgcmV0dXJuIHN0ci5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRRdWFudGl0YXRpdmVQcm9maWxlKHApIHtcbiAgcmV0dXJuIFtcbiAgICAndmFsaWQ6ICAgICcgKyBwLnZhbGlkLFxuICAgICdtaXNzaW5nOiAgJyArIHAubWlzc2luZyxcbiAgICAnZGlzdGluY3Q6ICcgKyBwLmRpc3RpbmN0LFxuICAgICdtaW46ICAgICAgJyArIHAubWluLFxuICAgICdtYXg6ICAgICAgJyArIHAubWF4LFxuICAgICdtZWRpYW46ICAgJyArIHAubWVkaWFuLFxuICAgICdtZWFuOiAgICAgJyArIHAubWVhbixcbiAgICAnc3RkZXY6ICAgICcgKyBwLnN0ZGV2LFxuICAgICdtb2Rlc2tldzogJyArIHAubW9kZXNrZXdcbiAgXS5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRDYXRlZ29yaWNhbFByb2ZpbGUocCkge1xuICB2YXIgbGlzdCA9IFtcbiAgICAndmFsaWQ6ICAgICcgKyBwLnZhbGlkLFxuICAgICdtaXNzaW5nOiAgJyArIHAubWlzc2luZyxcbiAgICAnZGlzdGluY3Q6ICcgKyBwLmRpc3RpbmN0LFxuICAgICd0b3AgdmFsdWVzOiAnXG4gIF07XG4gIHZhciB1ID0gcC51bmlxdWU7XG4gIHZhciB0b3AgPSB1dGlsLmtleXModSlcbiAgICAuc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIHVbYl0gLSB1W2FdOyB9KVxuICAgIC5zbGljZSgwLCA2KVxuICAgIC5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gJyBcXCcnICsgdiArICdcXCcgKCcgKyB1W3ZdICsgJyknOyB9KTtcbiAgcmV0dXJuIGxpc3QuY29uY2F0KHRvcCkuam9pbignXFxuJyk7XG59IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBkMyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmQzIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5kMyA6IG51bGwpO1xuXG52YXIgY29udGV4dCA9IHtcbiAgZm9ybWF0czogICAgW10sXG4gIGZvcm1hdF9tYXA6IHt9LFxuICB0cnVuY2F0ZTogICB1dGlsLnRydW5jYXRlXG59O1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZSh0ZXh0KSB7XG4gIHZhciBzcmMgPSBzb3VyY2UodGV4dCwgJ2QnKTtcbiAgc3JjID0gJ3ZhciBfX3Q7IHJldHVybiAnICsgc3JjICsgJzsnO1xuXG4gIHRyeSB7XG4gICAgLyoganNoaW50IGV2aWw6IHRydWUgKi9cbiAgICByZXR1cm4gKG5ldyBGdW5jdGlvbignZCcsIHNyYykpLmJpbmQoY29udGV4dCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLnNvdXJjZSA9IHNyYztcbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cbi8vIGNsZWFyIGNhY2hlIG9mIGZvcm1hdCBvYmplY3RzXG4vLyBjYW4gKmJyZWFrKiBwcmlvciB0ZW1wbGF0ZSBmdW5jdGlvbnMsIHNvIGludm9rZSB3aXRoIGNhcmVcbnRlbXBsYXRlLmNsZWFyRm9ybWF0Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgY29udGV4dC5mb3JtYXRzID0gW107XG4gIGNvbnRleHQuZm9ybWF0X21hcCA9IHt9O1xufTtcblxuZnVuY3Rpb24gc291cmNlKHRleHQsIHZhcmlhYmxlKSB7XG4gIHZhcmlhYmxlID0gdmFyaWFibGUgfHwgJ29iaic7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBzcmMgPSAnXFwnJztcbiAgdmFyIHJlZ2V4ID0gdGVtcGxhdGVfcmU7XG5cbiAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgdGV4dC5yZXBsYWNlKHJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaW50ZXJwb2xhdGUsIG9mZnNldCkge1xuICAgIHNyYyArPSB0ZXh0XG4gICAgICAuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgIC5yZXBsYWNlKHRlbXBsYXRlX2VzY2FwZXIsIHRlbXBsYXRlX2VzY2FwZUNoYXIpO1xuICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICBzcmMgKz0gJ1xcJ1xcbisoKF9fdD0oJyArXG4gICAgICAgIHRlbXBsYXRlX3ZhcihpbnRlcnBvbGF0ZSwgdmFyaWFibGUpICtcbiAgICAgICAgJykpPT1udWxsP1xcJ1xcJzpfX3QpK1xcblxcJyc7XG4gICAgfVxuXG4gICAgLy8gQWRvYmUgVk1zIG5lZWQgdGhlIG1hdGNoIHJldHVybmVkIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3Qgb2ZmZXN0LlxuICAgIHJldHVybiBtYXRjaDtcbiAgfSk7XG4gIHJldHVybiBzcmMgKyAnXFwnJztcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGVfdmFyKHRleHQsIHZhcmlhYmxlKSB7XG4gIHZhciBmaWx0ZXJzID0gdGV4dC5zcGxpdCgnfCcpO1xuICB2YXIgcHJvcCA9IGZpbHRlcnMuc2hpZnQoKS50cmltKCk7XG4gIHZhciBzdHJpbmdDYXN0ID0gdHJ1ZTtcbiAgXG4gIGZ1bmN0aW9uIHN0cmNhbGwoZm4pIHtcbiAgICBmbiA9IGZuIHx8ICcnO1xuICAgIGlmIChzdHJpbmdDYXN0KSB7XG4gICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICBzcmMgPSAnU3RyaW5nKCcgKyBzcmMgKyAnKScgKyBmbjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3JjICs9IGZuO1xuICAgIH1cbiAgICByZXR1cm4gc3JjO1xuICB9XG4gIFxuICB2YXIgc3JjID0gdXRpbC5maWVsZChwcm9wKS5tYXAodXRpbC5zdHIpLmpvaW4oJ11bJyk7XG4gIHNyYyA9IHZhcmlhYmxlICsgJ1snICsgc3JjICsgJ10nO1xuICBcbiAgZm9yICh2YXIgaT0wOyBpPGZpbHRlcnMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZiA9IGZpbHRlcnNbaV0sIGFyZ3MgPSBudWxsLCBwaWR4LCBhLCBiO1xuXG4gICAgaWYgKChwaWR4PWYuaW5kZXhPZignOicpKSA+IDApIHtcbiAgICAgIGYgPSBmLnNsaWNlKDAsIHBpZHgpO1xuICAgICAgYXJncyA9IGZpbHRlcnNbaV0uc2xpY2UocGlkeCsxKS5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH0pO1xuICAgIH1cbiAgICBmID0gZi50cmltKCk7XG5cbiAgICBzd2l0Y2ggKGYpIHtcbiAgICAgIGNhc2UgJ2xlbmd0aCc6XG4gICAgICAgIHN0cmNhbGwoJy5sZW5ndGgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsb3dlcic6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXInOlxuICAgICAgICBzdHJjYWxsKCcudG9VcHBlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xvd2VyLWxvY2FsZSc6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvY2FsZUxvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXItbG9jYWxlJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvTG9jYWxlVXBwZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmltJzpcbiAgICAgICAgc3RyY2FsbCgnLnRyaW0oKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgwLCcgKyBhICsgJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKC0nICsgYSArJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaWQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhICsgdXRpbC5udW1iZXIoYXJnc1sxXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgrJythKycsJytiKycpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2xpY2UnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgnKyBhICtcbiAgICAgICAgICAoYXJncy5sZW5ndGggPiAxID8gJywnICsgdXRpbC5udW1iZXIoYXJnc1sxXSkgOiAnJykgK1xuICAgICAgICAgICcpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJ1bmNhdGUnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhcmdzWzFdO1xuICAgICAgICBiID0gKGIhPT0nbGVmdCcgJiYgYiE9PSdtaWRkbGUnICYmIGIhPT0nY2VudGVyJykgPyAncmlnaHQnIDogYjtcbiAgICAgICAgc3JjID0gJ3RoaXMudHJ1bmNhdGUoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGEgPSB0ZW1wbGF0ZV9mb3JtYXQoYXJnc1swXSwgZDMuZm9ybWF0KTtcbiAgICAgICAgc3RyaW5nQ2FzdCA9IGZhbHNlO1xuICAgICAgICBzcmMgPSAndGhpcy5mb3JtYXRzWycrYSsnXSgnK3NyYysnKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGEgPSB0ZW1wbGF0ZV9mb3JtYXQoYXJnc1swXSwgZDMudGltZS5mb3JtYXQpO1xuICAgICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICAgIHNyYyA9ICd0aGlzLmZvcm1hdHNbJythKyddKCcrc3JjKycpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIHRlbXBsYXRlIGZpbHRlcjogJyArIGYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzcmM7XG59XG5cbnZhciB0ZW1wbGF0ZV9yZSA9IC9cXHtcXHsoLis/KVxcfVxcfXwkL2c7XG5cbi8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4vLyBzdHJpbmcgbGl0ZXJhbC5cbnZhciB0ZW1wbGF0ZV9lc2NhcGVzID0ge1xuICAnXFwnJzogICAgICdcXCcnLFxuICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICdcXHInOiAgICAgJ3InLFxuICAnXFxuJzogICAgICduJyxcbiAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAnXFx1MjAyOSc6ICd1MjAyOSdcbn07XG5cbnZhciB0ZW1wbGF0ZV9lc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZV9lc2NhcGVDaGFyKG1hdGNoKSB7XG4gIHJldHVybiAnXFxcXCcgKyB0ZW1wbGF0ZV9lc2NhcGVzW21hdGNoXTtcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGVfZm9ybWF0KHBhdHRlcm4sIGZtdCkge1xuICBpZiAoKHBhdHRlcm5bMF0gPT09ICdcXCcnICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcXCcnKSB8fFxuICAgICAgKHBhdHRlcm5bMF0gPT09ICdcIicgICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcIicpKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc2xpY2UoMSwgLTEpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdGb3JtYXQgcGF0dGVybiBtdXN0IGJlIHF1b3RlZDogJyArIHBhdHRlcm4pO1xuICB9XG4gIGlmICghY29udGV4dC5mb3JtYXRfbWFwW3BhdHRlcm5dKSB7XG4gICAgdmFyIGYgPSBmbXQocGF0dGVybik7XG4gICAgdmFyIGkgPSBjb250ZXh0LmZvcm1hdHMubGVuZ3RoO1xuICAgIGNvbnRleHQuZm9ybWF0cy5wdXNoKGYpO1xuICAgIGNvbnRleHQuZm9ybWF0X21hcFtwYXR0ZXJuXSA9IGk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQuZm9ybWF0X21hcFtwYXR0ZXJuXTtcbn1cbiIsInZhciBTVEVQUyA9IFtcbiAgWzMxNTM2ZTYsIDVdLCAgLy8gMS15ZWFyXG4gIFs3Nzc2ZTYsIDRdLCAgIC8vIDMtbW9udGhcbiAgWzI1OTJlNiwgNF0sICAgLy8gMS1tb250aFxuICBbMTIwOTZlNSwgM10sICAvLyAyLXdlZWtcbiAgWzYwNDhlNSwgM10sICAgLy8gMS13ZWVrXG4gIFsxNzI4ZTUsIDNdLCAgIC8vIDItZGF5XG4gIFs4NjRlNSwgM10sICAgIC8vIDEtZGF5XG4gIFs0MzJlNSwgMl0sICAgIC8vIDEyLWhvdXJcbiAgWzIxNmU1LCAyXSwgICAgLy8gNi1ob3VyXG4gIFsxMDhlNSwgMl0sICAgIC8vIDMtaG91clxuICBbMzZlNSwgMl0sICAgICAvLyAxLWhvdXJcbiAgWzE4ZTUsIDFdLCAgICAgLy8gMzAtbWludXRlXG4gIFs5ZTUsIDFdLCAgICAgIC8vIDE1LW1pbnV0ZVxuICBbM2U1LCAxXSwgICAgICAvLyA1LW1pbnV0ZVxuICBbNmU0LCAxXSwgICAgICAvLyAxLW1pbnV0ZVxuICBbM2U0LCAwXSwgICAgICAvLyAzMC1zZWNvbmRcbiAgWzE1ZTMsIDBdLCAgICAgLy8gMTUtc2Vjb25kXG4gIFs1ZTMsIDBdLCAgICAgIC8vIDUtc2Vjb25kXG4gIFsxZTMsIDBdICAgICAgIC8vIDEtc2Vjb25kXG5dO1xuXG5mdW5jdGlvbiBpc051bWJlcihkKSB7IHJldHVybiB0eXBlb2YgZCA9PT0gJ251bWJlcic7IH1cblxudmFyIGVudHJpZXMgPSBbXG4gIHtcbiAgICB0eXBlOiAnc2Vjb25kJyxcbiAgICBtaW5zdGVwOiAxLFxuICAgIGZvcm1hdDogJyVZICViICUtZCAlSDolTTolUy4lTCcsXG4gICAgZGF0ZTogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGQgKiAxZTMpO1xuICAgIH0sXG4gICAgdW5pdDogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuICgrZCAvIDFlMyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgdHlwZTogJ21pbnV0ZScsXG4gICAgbWluc3RlcDogMSxcbiAgICBmb3JtYXQ6ICclWSAlYiAlLWQgJUg6JU0nLFxuICAgIGRhdGU6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkICogNmU0KTtcbiAgICB9LFxuICAgIHVuaXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB+figrZCAvIDZlNCk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2hvdXInLFxuICAgIG1pbnN0ZXA6IDEsXG4gICAgZm9ybWF0OiAnJVkgJWIgJS1kICVIOjAwJyxcbiAgICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoZCAqIDM2ZTUpO1xuICAgIH0sXG4gICAgdW5pdDogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIH5+KCtkIC8gMzZlNSk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2RheScsXG4gICAgbWluc3RlcDogMSxcbiAgICBzdGVwOiBbMSwgN10sXG4gICAgZm9ybWF0OiAnJVkgJWIgJS1kJyxcbiAgICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoZCAqIDg2NGU1KTtcbiAgICB9LFxuICAgIHVuaXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB+figrZCAvIDg2NGU1KTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnbW9udGgnLFxuICAgIG1pbnN0ZXA6IDEsXG4gICAgc3RlcDogWzEsIDMsIDZdLFxuICAgIGZvcm1hdDogJyViICVZJyxcbiAgICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMofn4oZCAvIDEyKSwgZCAlIDEyLCAxKSk7XG4gICAgfSxcbiAgICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgICBpZiAoaXNOdW1iZXIoZCkpIGQgPSBuZXcgRGF0ZShkKTtcbiAgICAgIHJldHVybiAxMiAqIGQuZ2V0VVRDRnVsbFllYXIoKSArIGQuZ2V0VVRDTW9udGgoKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0eXBlOiAneWVhcicsXG4gICAgbWluc3RlcDogMSxcbiAgICBmb3JtYXQ6ICclWScsXG4gICAgZGF0ZTogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKGQsIDAsIDEpKTtcbiAgICB9LFxuICAgIHVuaXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiAoaXNOdW1iZXIoZCkgPyBuZXcgRGF0ZShkKSA6IGQpLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgfVxuICB9XG5dO1xuXG52YXIgbWludXRlT2ZIb3VyID0ge1xuICB0eXBlOiAnbWludXRlT2ZIb3VyJyxcbiAgbWluOiAwLFxuICBtYXg6IDU5LFxuICBtaW5zdGVwOiAxLFxuICBmb3JtYXQ6ICclTScsXG4gIGRhdGU6IGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDTWludXRlcygpO1xuICB9XG59O1xuXG52YXIgaG91ck9mRGF5ID0ge1xuICB0eXBlOiAnaG91ck9mRGF5JyxcbiAgbWluOiAwLFxuICBtYXg6IDIzLFxuICBtaW5zdGVwOiAxLFxuICBmb3JtYXQ6ICclSCcsXG4gIGRhdGU6IGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDSG91cnMoKTtcbiAgfVxufTtcblxudmFyIGRheU9mV2VlayA9IHtcbiAgdHlwZTogJ2RheU9mV2VlaycsXG4gIG1pbjogMCxcbiAgbWF4OiA2LFxuICBzdGVwOiBbMV0sXG4gIGZvcm1hdDogJyVhJyxcbiAgZGF0ZTogZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCA0ICsgZCkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDRGF5KCk7XG4gIH1cbn07XG5cbnZhciBkYXlPZk1vbnRoID0ge1xuICB0eXBlOiAnZGF5T2ZNb250aCcsXG4gIG1pbjogMSxcbiAgbWF4OiAzMSxcbiAgc3RlcDogWzFdLFxuICBmb3JtYXQ6ICclLWQnLFxuICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIGQpKTtcbiAgfSxcbiAgdW5pdDogZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoaXNOdW1iZXIoZCkgPyBuZXcgRGF0ZShkKSA6IGQpLmdldFVUQ0RhdGUoKTtcbiAgfVxufTtcblxudmFyIG1vbnRoT2ZZZWFyID0ge1xuICB0eXBlOiAnbW9udGhPZlllYXInLFxuICBtaW46IDAsXG4gIG1heDogMTEsXG4gIHN0ZXA6IFsxXSxcbiAgZm9ybWF0OiAnJWInLFxuICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIGQgJSAxMiwgMSkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDTW9udGgoKTtcbiAgfVxufTtcblxudmFyIHVuaXRzID0ge1xuICAnc2Vjb25kJzogICAgICAgZW50cmllc1swXSxcbiAgJ21pbnV0ZSc6ICAgICAgIGVudHJpZXNbMV0sXG4gICdob3VyJzogICAgICAgICBlbnRyaWVzWzJdLFxuICAnZGF5JzogICAgICAgICAgZW50cmllc1szXSxcbiAgJ21vbnRoJzogICAgICAgIGVudHJpZXNbNF0sXG4gICd5ZWFyJzogICAgICAgICBlbnRyaWVzWzVdLFxuICAnbWludXRlT2ZIb3VyJzogbWludXRlT2ZIb3VyLFxuICAnaG91ck9mRGF5JzogICAgaG91ck9mRGF5LFxuICAnZGF5T2ZXZWVrJzogICAgZGF5T2ZXZWVrLFxuICAnZGF5T2ZNb250aCc6ICAgZGF5T2ZNb250aCxcbiAgJ21vbnRoT2ZZZWFyJzogIG1vbnRoT2ZZZWFyLFxuICAndGltZXN0ZXBzJzogICAgZW50cmllc1xufTtcblxudW5pdHMuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIGksIGxlbiwgYmlucywgc3RlcCA9IFNURVBTWzBdO1xuXG4gIGZvciAoaSA9IDEsIGxlbiA9IFNURVBTLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiBlbnRyaWVzW1NURVBTW2kgLSAxXVsxXV07XG4gICAgICB9XG4gICAgICBpZiAoYmlucyA+PSBtaW5iKSB7XG4gICAgICAgIHJldHVybiBlbnRyaWVzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZW50cmllc1tTVEVQU1tTVEVQUy5sZW5ndGggLSAxXVsxXV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXRzO1xuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbnZhciB1bml0cyA9IHJlcXVpcmUoJy4vdGltZS11bml0cycpO1xudmFyIHUgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyB3aGVyZSBhcmUgd2U/XG5cbnUuaXNOb2RlID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgIHR5cGVvZiBwcm9jZXNzLnN0ZGVyciAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciBGTkFNRSA9ICdfX25hbWVfXyc7XG5cbnUubmFtZWRmdW5jID0gZnVuY3Rpb24obmFtZSwgZikgeyByZXR1cm4gKGZbRk5BTUVdID0gbmFtZSwgZik7IH07XG5cbnUubmFtZSA9IGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY9PW51bGwgPyBudWxsIDogZltGTkFNRV07IH07XG5cbnUuaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4OyB9O1xuXG51LnRydWUgPSB1Lm5hbWVkZnVuYygndHJ1ZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbnUuZmFsc2UgPSB1Lm5hbWVkZnVuYygnZmFsc2UnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxudS5kdXBsaWNhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuXG51LmVxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpO1xufTtcblxudS5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgeCwgbmFtZSwgaT0xLCBsZW49YXJndW1lbnRzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHggPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChuYW1lIGluIHgpIHsgb2JqW25hbWVdID0geFtuYW1lXTsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG51Lmxlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHgubGVuZ3RoICE9PSBudWxsID8geC5sZW5ndGggOiAwO1xufTtcblxudS5rZXlzID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5cyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkga2V5cy5wdXNoKGspO1xuICByZXR1cm4ga2V5cztcbn07XG5cbnUudmFscyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHZhbHMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIHZhbHMucHVzaCh4W2tdKTtcbiAgcmV0dXJuIHZhbHM7XG59O1xuXG51LnRvTWFwID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7XG4gICAgcmV0dXJuIChvYmpbeF0gPSAxLCBvYmopO1xuICB9LCB7fSk7XG59O1xuXG51LmtleXN0ciA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAvLyB1c2UgdG8gZW5zdXJlIGNvbnNpc3RlbnQga2V5IGdlbmVyYXRpb24gYWNyb3NzIG1vZHVsZXNcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBpZiAoIW4pIHJldHVybiAnJztcbiAgZm9yICh2YXIgcz1TdHJpbmcodmFsdWVzWzBdKSwgaT0xOyBpPG47ICsraSkge1xuICAgIHMgKz0gJ3wnICsgU3RyaW5nKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG4vLyB0eXBlIGNoZWNraW5nIGZ1bmN0aW9uc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG51LmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufTtcblxudS5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG51LmlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG51LmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudS5pc051bWJlciA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBOdW1iZXJdJztcbn07XG5cbnUuaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufTtcblxudS5pc0RhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcblxudS5pc1ZhbGlkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAhTnVtYmVyLmlzTmFOKG9iaik7XG59O1xuXG51LmlzQnVmZmVyID0gKEJ1ZmZlciAmJiBCdWZmZXIuaXNCdWZmZXIpIHx8IHUuZmFsc2U7XG5cbi8vIHR5cGUgY29lcmNpb24gZnVuY3Rpb25zXG5cbnUubnVtYmVyID0gZnVuY3Rpb24ocykgeyByZXR1cm4gcyA9PSBudWxsID8gbnVsbCA6ICtzOyB9O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7IHJldHVybiBzID09IG51bGwgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhczsgfTtcblxudS5kYXRlID0gZnVuY3Rpb24ocykgeyByZXR1cm4gcyA9PSBudWxsID8gbnVsbCA6IERhdGUucGFyc2Uocyk7IH07XG5cbnUuYXJyYXkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4ICE9IG51bGwgPyAodS5pc0FycmF5KHgpID8geCA6IFt4XSkgOiBbXTsgfTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgPyBKU09OLnN0cmluZ2lmeSh4KVxuICAgIDogdS5pc1N0cmluZyh4KSA/ICgnXFwnJyt1dGlsX2VzY2FwZV9zdHIoeCkrJ1xcJycpIDogeDtcbn07XG5cbnZhciBlc2NhcGVfc3RyX3JlID0gLyhefFteXFxcXF0pJy9nO1xuXG5mdW5jdGlvbiB1dGlsX2VzY2FwZV9zdHIoeCkge1xuICByZXR1cm4geC5yZXBsYWNlKGVzY2FwZV9zdHJfcmUsICckMVxcXFxcXCcnKTtcbn1cblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnUuZmllbGQgPSBmdW5jdGlvbihmKSB7XG4gIHJldHVybiBTdHJpbmcoZikuc3BsaXQoJ1xcXFwuJylcbiAgICAubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc3BsaXQoJy4nKTsgfSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLmxlbmd0aCkgeyBhW2EubGVuZ3RoLTFdICs9ICcuJyArIGIuc2hpZnQoKTsgfVxuICAgICAgYS5wdXNoLmFwcGx5KGEsIGIpO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwgW10pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiBmPT1udWxsIHx8IHUuaXNGdW5jdGlvbihmKSA/IGYgOlxuICAgIHUubmFtZWRmdW5jKGYsIChzID0gdS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBzLnJlZHVjZShmdW5jdGlvbih4LGYpIHsgcmV0dXJuIHhbZl07IH0sIHgpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHhbZl07IH1cbiAgICApO1xufTtcblxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxudS4kZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIG9wKSB7XG4gIHJldHVybiBmdW5jdGlvbihmKSB7XG4gICAgZiA9IHUuJChmKSB8fCB1LmlkZW50aXR5O1xuICAgIHZhciBuID0gbmFtZSArICh1Lm5hbWUoZikgPyAnXycrdS5uYW1lKGYpIDogJycpO1xuICAgIHJldHVybiB1Lm5hbWVkZnVuYyhuLCBmdW5jdGlvbihkKSB7IHJldHVybiBvcChmKGQpKTsgfSk7XG4gIH07XG59O1xuXG51LiRsZW5ndGggPSB1LiRmdW5jKCdsZW5ndGgnLCB1Lmxlbmd0aCk7XG51LiR5ZWFyICAgPSB1LiRmdW5jKCd5ZWFyJywgdW5pdHMueWVhci51bml0KTtcbnUuJG1vbnRoICA9IHUuJGZ1bmMoJ21vbnRoJywgdW5pdHMubW9udGhPZlllYXIudW5pdCk7XG51LiRkYXRlICAgPSB1LiRmdW5jKCdkYXRlJywgdW5pdHMuZGF5T2ZNb250aC51bml0KTtcbnUuJGRheSAgICA9IHUuJGZ1bmMoJ2RheScsIHVuaXRzLmRheU9mV2Vlay51bml0KTtcbnUuJGhvdXIgICA9IHUuJGZ1bmMoJ2hvdXInLCB1bml0cy5ob3VyT2ZEYXkudW5pdCk7XG51LiRtaW51dGUgPSB1LiRmdW5jKCdtaW51dGUnLCB1bml0cy5taW51dGVPZkhvdXIudW5pdCk7XG5cblxuLy8gY29tcGFyaXNvbiAvIHNvcnRpbmcgZnVuY3Rpb25zXG5cbnUuY29tcGFyYXRvciA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgdmFyIHNpZ24gPSBbXTtcbiAgaWYgKHNvcnQgPT09IHVuZGVmaW5lZCkgc29ydCA9IFtdO1xuICBzb3J0ID0gdS5hcnJheShzb3J0KS5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBzID0gMTtcbiAgICBpZiAgICAgIChmWzBdID09PSAnLScpIHsgcyA9IC0xOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIGVsc2UgaWYgKGZbMF0gPT09ICcrJykgeyBzID0gKzE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgc2lnbi5wdXNoKHMpO1xuICAgIHJldHVybiB1LmFjY2Vzc29yKGYpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsYikge1xuICAgIHZhciBpLCBuLCBmLCB4LCB5O1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07IHggPSBmKGEpOyB5ID0gZihiKTtcbiAgICAgIGlmICh4IDwgeSkgcmV0dXJuIC0xICogc2lnbltpXTtcbiAgICAgIGlmICh4ID4geSkgcmV0dXJuIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChhID4gYikge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGEgPj0gYikge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwgJiYgYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiBOYU47XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxuLy8gRVM2IGNvbXBhdGliaWxpdHkgcGVyIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9zdGFydHNXaXRoI1BvbHlmaWxsXG4vLyBXZSBjb3VsZCBoYXZlIHVzZWQgdGhlIHBvbHlmaWxsIGNvZGUsIGJ1dCBsZXRzIHdhaXQgdW50aWwgRVM2IGJlY29tZXMgYSBzdGFuZGFyZCBmaXJzdFxudS5zdGFydHNXaXRoID0gU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID9cbiAgZnVuY3Rpb24oc3RyaW5nLCBzZWFyY2hTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nKTtcbiAgfSA6XG4gIGZ1bmN0aW9uKHN0cmluZywgc2VhcmNoU3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sYXN0SW5kZXhPZihzZWFyY2hTdHJpbmcsIDApID09PSAwO1xuICB9O1xuXG51LnRydW5jYXRlID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHdvcmQsIGVsbGlwc2lzKSB7XG4gIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgaWYgKGxlbiA8PSBsZW5ndGgpIHJldHVybiBzO1xuICBlbGxpcHNpcyA9IGVsbGlwc2lzICE9PSB1bmRlZmluZWQgPyBTdHJpbmcoZWxsaXBzaXMpIDogJ+KApic7XG4gIHZhciBsID0gTWF0aC5tYXgoMCwgbGVuZ3RoIC0gZWxsaXBzaXMubGVuZ3RoKTtcblxuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwsMSkgOiBzLnNsaWNlKGxlbi1sKSk7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdmFyIGwxID0gTWF0aC5jZWlsKGwvMiksIGwyID0gTWF0aC5mbG9vcihsLzIpO1xuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMSkgOiBzLnNsaWNlKDAsbDEpKSArXG4gICAgICAgIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwyLDEpIDogcy5zbGljZShsZW4tbDIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsKSA6IHMuc2xpY2UoMCxsKSkgKyBlbGxpcHNpcztcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJ1bmNhdGVPbldvcmQocywgbGVuLCByZXYpIHtcbiAgdmFyIGNudCA9IDAsIHRvayA9IHMuc3BsaXQodHJ1bmNhdGVfd29yZF9yZSk7XG4gIGlmIChyZXYpIHtcbiAgICBzID0gKHRvayA9IHRvay5yZXZlcnNlKCkpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSlcbiAgICAgIC5yZXZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcyA9IHRvay5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KTtcbiAgfVxuICByZXR1cm4gcy5sZW5ndGggPyBzLmpvaW4oJycpLnRyaW0oKSA6IHRva1swXS5zbGljZSgwLCBsZW4pO1xufVxuXG52YXIgdHJ1bmNhdGVfd29yZF9yZSA9IC8oW1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUyMDI4XFx1MjAyOVxcdTMwMDBcXHVGRUZGXSkvO1xuIl19
