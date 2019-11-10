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
  print:     require('./print'),
  template:  require('./template'),
  timeunits: require('./time-units')
};

util.extend(dl, util);
util.extend(dl, require('./generate'));
util.extend(dl, require('./stats'));
util.extend(dl, require('./import/readers'));

module.exports = dl;
},{"./aggregate/groupby":6,"./bins/bins":8,"./bins/histogram":9,"./generate":10,"./import/load":16,"./import/read":17,"./import/readers":18,"./import/type":19,"./print":20,"./stats":21,"./template":22,"./time-units":23,"./util":24}],2:[function(require,module,exports){

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

// key accessor to use for streaming removes
proto.key = function(key) {
  if (key == null) return this._key;
  this._key = util.$(key);
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
  return this.clear();
};

// Input: array of objects of the form
// {name: string, ops: [string, ...]}
proto.summarize = function(fields) {
  fields = summarize_args(fields);
  this._count = true;
  var aggr = (this._aggr = []),
      m, f, i, j, op, as, get;

  for (i=0; i<fields.length; ++i) {
    for (j=0, m=[], f=fields[i]; j<f.ops.length; ++j) {
      op = f.ops[j];
      if (op !== 'count') this._count = false;
      as = (f.as && f.as[j]) || (op + (f.name==='*' ? '' : '_'+f.name));
      m.push(Measures[op](as));
    }
    get = f.get && util.$(f.get) ||
      (f.name === '*' ? util.identity : util.$(f.name));
    aggr.push({
      name: f.name,
      measures: Measures.create(
        m,
        this._stream, // streaming remove flag
        get,          // input tuple getter
        this._assign) // output tuple setter
    });
  }
  return this.clear();
};

// Convenience method to summarize by count
proto.count = function() {
  return this.summarize({'*':'count'});
};

// Override to perform custom tuple value assignment
proto._assign = function(object, name, value) {
  object[name] = value;
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

proto._cellkey = function(x) {
  var d = this._dims,
      n = d.length, i,
      k = String(d[0].get(x));
  for (i=1; i<n; ++i) {
    k += '|' + d[i].get(x);
  }
  return k;
};

proto._cell = function(x) {
  var key = this._dims.length ? this._cellkey(x) : '';
  return this._cells[key] || (this._cells[key] = this._newcell(x));
};

proto._newcell = function(x) {
  var cell = {
    num:   0,
    tuple: this._newtuple(x),
    flag:  Flags.ADD_CELL,
    aggs:  {}
  };

  var aggr = this._aggr, i;
  for (i=0; i<aggr.length; ++i) {
    cell.aggs[aggr[i].name] = new aggr[i].measures(cell, cell.tuple);
  }
  if (cell.collect) {
    cell.data = new Collector(this._key);
  }
  return cell;
};

proto._newtuple = function(x) {
  var dims = this._dims,
      t = {}, i, n;
  for (i=0, n=dims.length; i<n; ++i) {
    t[dims[i].name] = dims[i].get(x);
  }
  return this._ingest(t);
};

// Override to perform custom tuple ingestion
proto._ingest = util.identity;

// Process Tuples

proto._add = function(x) {
  var cell = this._cell(x),
      aggr = this._aggr, i;

  cell.num += 1;
  if (!this._count) { // skip if count-only
    if (cell.collect) cell.data.add(x);
    for (i=0; i<aggr.length; ++i) {
      cell.aggs[aggr[i].name].add(x);
    }
  }
  cell.flag |= Flags.MOD_CELL;
};

proto._rem = function(x) {
  var cell = this._cell(x),
      aggr = this._aggr, i;

  cell.num -= 1;
  if (!this._count) { // skip if count-only
    if (cell.collect) cell.data.rem(x);
    for (i=0; i<aggr.length; ++i) {
      cell.aggs[aggr[i].name].rem(x);
    }
  }
  cell.flag |= Flags.MOD_CELL;
};

proto._mod = function(curr, prev) {
  var cell0 = this._cell(prev),
      cell1 = this._cell(curr),
      aggr = this._aggr, i;

  if (cell0 !== cell1) {
    cell0.num -= 1;
    cell1.num += 1;
    if (cell0.collect) cell0.data.rem(prev);
    if (cell1.collect) cell1.data.add(curr);
  } else if (cell0.collect && !util.isObject(curr)) {
    cell0.data.rem(prev);
    cell0.data.add(curr);
  }

  for (i=0; i<aggr.length; ++i) {
    cell0.aggs[aggr[i].name].rem(prev);
    cell1.aggs[aggr[i].name].add(curr);
  }
  cell0.flag |= Flags.MOD_CELL;
  cell1.flag |= Flags.MOD_CELL;
};

proto.result = function() {
  var result = [],
      aggr = this._aggr,
      cell, i, k;

  for (k in this._cells) {
    cell = this._cells[k];
    if (cell.num > 0) {
      // consolidate collector values
      if (cell.collect) {
        cell.data.values();
      }
      // update tuple properties
      for (i=0; i<aggr.length; ++i) {
        cell.aggs[aggr[i].name].set();
      }
      // add output tuple
      result.push(cell.tuple);
    } else {
      delete this._cells[k];
    }
    cell.flag = 0;
  }

  this._rems = false;
  return result;
};

proto.changes = function() {
  var changes = {add:[], rem:[], mod:[]},
      aggr = this._aggr,
      cell, flag, i, k;

  for (k in this._cells) {
    cell = this._cells[k];
    flag = cell.flag;

    // consolidate collector values
    if (cell.collect) {
      cell.data.values();
    }

    // update tuple properties
    for (i=0; i<aggr.length; ++i) {
      cell.aggs[aggr[i].name].set();
    }

    // organize output tuples
    if (cell.num <= 0) {
      changes.rem.push(cell.tuple);
      delete this._cells[k];
    } else if (flag & Flags.ADD_CELL) {
      changes.add.push(cell.tuple);
    } else if (flag & Flags.MOD_CELL) {
      changes.mod.push(cell.tuple);
    }

    cell.flag = 0;
  }

  this._rems = false;
  return changes;
};

proto.execute = function(input) {
  return this.clear().insert(input).result();
};

proto.insert = function(input) {
  this._consolidate();
  for (var i=0; i<input.length; ++i) {
    this._add(input[i]);
  }
  return this;
};

proto.remove = function(input) {
  if (!this._stream) {
    throw 'Aggregator not configured for streaming removes.' +
      ' Call stream(true) prior to calling summarize.';
  }
  for (var i=0; i<input.length; ++i) {
    this._rem(input[i]);
  }
  this._rems = true;
  return this;
};

// consolidate removals
proto._consolidate = function() {
  if (!this._rems) return;
  for (var k in this._cells) {
    if (this._cells[k].collect) {
      this._cells[k].data.values();
    }
  }
  this._rems = false;
};

module.exports = Aggregator;
},{"../util":24,"./collector":5,"./measures":7}],5:[function(require,module,exports){
var util = require('../util');
var stats = require('../stats');

var REM = '__dl_rem__';

function Collector(key) {
  this._add = [];
  this._rem = [];
  this._key = key || null;
  this._last = null;
}

var proto = Collector.prototype;

proto.add = function(v) {
  this._add.push(v);
};

proto.rem = function(v) {
  this._rem.push(v);
};

proto.values = function() {
  this._get = null;
  if (this._rem.length === 0) return this._add;

  var a = this._add,
      r = this._rem,
      k = this._key,
      x = Array(a.length - r.length),
      i, j, n, m;

  if (!util.isObject(r[0])) {
    // processing raw values
    m = stats.count.map(r);
    for (i=0, j=0, n=a.length; i<n; ++i) {
      if (m[a[i]] > 0) {
        m[a[i]] -= 1;
      } else {
        x[j++] = a[i];
      }
    }
  } else if (k) {
    // has unique key field, so use that
    m = util.toMap(r, k);
    for (i=0, j=0, n=a.length; i<n; ++i) {
      if (!m.hasOwnProperty(k(a[i]))) { x[j++] = a[i]; }
    }
  } else {
    // no unique key, mark tuples directly
    for (i=0, n=r.length; i<n; ++i) {
      r[i][REM] = 1;
    }
    for (i=0, j=0, n=a.length; i<n; ++i) {
      if (!a[i][REM]) { x[j++] = a[i]; }
    }
    for (i=0, n=r.length; i<n; ++i) {
      delete r[i][REM];
    }
  }

  this._rem = [];
  return (this._add = x);
};

// memoizing statistics methods

proto.extent = function(get) {
  if (this._get !== get || !this._ext) {
    var v = this.values(),
        i = stats.extent.index(v, get);
    this._ext = [v[i[0]], v[i[1]]];
    this._get = get;    
  }
  return this._ext;
};

proto.argmin = function(get) {
  return this.extent(get)[0];
};

proto.argmax = function(get) {
  return this.extent(get)[1];
};

proto.min = function(get) {
  var m = this.extent(get)[0];
  return m ? get(m) : +Infinity;
};

proto.max = function(get) {
  var m = this.extent(get)[1];
  return m ? get(m) : -Infinity;
};

proto.quartile = function(get) {
  if (this._get !== get || !this._q) {
    this._q = stats.quartile(this.values(), get);
    this._get = get;    
  }
  return this._q;
};

proto.q1 = function(get) {
  return this.quartile(get)[0];
};

proto.q2 = function(get) {
  return this.quartile(get)[1];
};

proto.q3 = function(get) {
  return this.quartile(get)[2];
};

module.exports = Collector;

},{"../stats":21,"../util":24}],6:[function(require,module,exports){
var util = require('../util');
var Aggregator = require('./aggregator');

module.exports = function() {
  // flatten arguments into a single array
  var args = [].reduce.call(arguments, function(a, x) {
    return a.concat(util.array(x));
  }, []);
  // create and return an aggregator
  return new Aggregator()
    .groupby(args)
    .summarize({'*':'values'});
};

},{"../util":24,"./aggregator":4}],7:[function(require,module,exports){
var util = require('../util');

var types = {
  'values': measure({
    name: 'values',
    init: 'cell.collect = true;',
    set:  'cell.data.values()', idx: -1
  }),
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
    rem:  'var d = v - this.mean; this.mean -= this.valid ? d / this.valid : this.mean;',
    set:  'this.mean'
  }),
  'average': measure({
    name: 'average',
    set:  'this.mean',
    req:  ['mean'], idx: 1
  }),
  'variance': measure({
    name: 'variance',
    init: 'this.dev = 0;',
    add:  'this.dev += d * (v - this.mean);',
    rem:  'this.dev -= d * (v - this.mean);',
    set:  'this.valid > 1 ? this.dev / (this.valid-1) : 0',
    req:  ['mean'], idx: 1
  }),
  'variancep': measure({
    name: 'variancep',
    set:  'this.valid > 1 ? this.dev / this.valid : 0',
    req:  ['variance'], idx: 2
  }),
  'stdev': measure({
    name: 'stdev',
    set:  'this.valid > 1 ? Math.sqrt(this.dev / (this.valid-1)) : 0',
    req:  ['variance'], idx: 2
  }),
  'stdevp': measure({
    name: 'stdevp',
    set:  'this.valid > 1 ? Math.sqrt(this.dev / this.valid) : 0',
    req:  ['variance'], idx: 2
  }),
  'median': measure({
    name: 'median',
    set:  'cell.data.q2(this.get)',
    req:  ['values'], idx: 3
  }),
  'q1': measure({
    name: 'q1',
    set:  'cell.data.q1(this.get)',
    req:  ['values'], idx: 3
  }),
  'q3': measure({
    name: 'q3',
    set:  'cell.data.q3(this.get)',
    req:  ['values'], idx: 3
  }),
  'distinct': measure({
    name: 'distinct',
    set:  'this.distinct(cell.data.values(), this.get)',
    req:  ['values'], idx: 3
  }),
  'argmin': measure({
    name: 'argmin',
    add:  'if (v < this.min) this.argmin = t;',
    rem:  'if (v <= this.min) this.argmin = null;',
    set:  'this.argmin = this.argmin || cell.data.argmin(this.get)',
    req:  ['min'], str: ['values'], idx: 3
  }),
  'argmax': measure({
    name: 'argmax',
    add:  'if (v > this.max) this.argmax = t;',
    rem:  'if (v >= this.max) this.argmax = null;',
    set:  'this.argmax = this.argmax || cell.data.argmax(this.get)',
    req:  ['max'], str: ['values'], idx: 3
  }),
  'min': measure({
    name: 'min',
    init: 'this.min = +Infinity;',
    add:  'if (v < this.min) this.min = v;',
    rem:  'if (v <= this.min) this.min = NaN;',
    set:  'this.min = (isNaN(this.min) ? cell.data.min(this.get) : this.min)',
    str:  ['values'], idx: 4
  }),
  'max': measure({
    name: 'max',
    init: 'this.max = -Infinity;',
    add:  'if (v > this.max) this.max = v;',
    rem:  'if (v >= this.max) this.max = NaN;',
    set:  'this.max = (isNaN(this.max) ? cell.data.max(this.get) : this.max)',
    str:  ['values'], idx: 4
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
      add = 'if (v==null) this.missing++; if (!this.isValid(v)) return; ++this.valid;',
      rem = 'if (v==null) this.missing--; if (!this.isValid(v)) return; --this.valid;',
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
  ctr.prototype.distinct = require('../stats').count.distinct;
  ctr.prototype.isValid = util.isValid;
  return ctr;
}

types.create = create;
module.exports = types;
},{"../stats":21,"../util":24}],8:[function(require,module,exports){
var util = require('../util');
var units = require('../time-units');
var EPSILON = 1e-15;

function bins(opt) {
  if (!opt) { throw Error("Missing binning options."); }

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
  if (!opt) { throw Error("Missing date binning options."); }

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

},{"../time-units":23,"../util":24}],9:[function(require,module,exports){
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
  var u = stats.unique(values, f),
      c = stats.count.map(values, f);
  return u.map(function(k) { return {value: k, count: c[k]}; })
    .sort(util.comparator(sort ? '-count' : '+value'));
}

module.exports = {
  $bin: $bin,
  histogram: histogram
};
},{"../generate":10,"../import/type":19,"../stats":21,"../util":24,"./bins":8}],10:[function(require,module,exports){
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
    max = min === undefined ? 1 : min;
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
var util = require('../../util');
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

function dsv(data, format) {
  if (data) {
    var h = format.header;
    data = (h ? h.join(format.delimiter) + '\n' : '') + data;
  }
  return d3.dsv(format.delimiter).parse(data);
}

dsv.delimiter = function(delim) {
  var fmt = {delimiter: delim};
  return function(data, format) {
    return dsv(data, format ? util.extend(format, fmt) : fmt);
  };
};

module.exports = dsv;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../util":24}],12:[function(require,module,exports){
var dsv = require('./dsv');

module.exports = {
  json: require('./json'),
  topojson: require('./topojson'),
  treejson: require('./treejson'),
  dsv: dsv,
  csv: dsv.delimiter(','),
  tsv: dsv.delimiter('\t')
};
},{"./dsv":11,"./json":13,"./topojson":14,"./treejson":15}],13:[function(require,module,exports){
var util = require('../../util');

module.exports = function(data, format) {
  var d = util.isObject(data) && !util.isBuffer(data) ?
    data : JSON.parse(data);
  if (format && format.property) {
    d = util.accessor(format.property)(d);
  }
  return d;
};

},{"../../util":24}],14:[function(require,module,exports){
(function (global){
var json = require('./json');

var reader = function(data, format) {
  var topojson = reader.topojson;
  if (topojson == null) { throw Error('TopoJSON library not loaded.'); }

  var t = json(data, format), obj;

  if (format && format.feature) {
    if ((obj = t.objects[format.feature])) {
      return topojson.feature(t, obj).features;
    } else {
      throw Error('Invalid TopoJSON object: ' + format.feature);
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
};

reader.topojson = (typeof window !== "undefined" ? window.topojson : typeof global !== "undefined" ? global.topojson : null);
module.exports = reader;
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
      error = error ||
        'Load failed with response code ' + response.statusCode + '.';
      callback(error, null);
    }
  });
}

load.sanitizeUrl = sanitizeUrl;

module.exports = load;

},{"../util":24,"fs":2,"request":2,"sync-request":2,"url":2}],17:[function(require,module,exports){
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

},{"../util":24,"./formats":12,"./type":19}],18:[function(require,module,exports){
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
        if (error) { callback(error, null); return; }
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

},{"../util":24,"./load":16,"./read":17}],19:[function(require,module,exports){
var util = require('../util');

var TYPES = '__types__';

var PARSERS = {
  boolean: util.boolean,
  integer: util.number,
  number:  util.number,
  date:    util.date,
  string:  function(x) { return x==='' ? null : x; }
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
  f = util.$(f);
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
    return (types[f] = type(data, f), types);
  }, {});
}

function infer(values, f) {
  f = util.$(f);
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
    types[f] = infer(data, f);
    return types;
  }, {});
}

type.annotation = annotation;
type.all = typeAll;
type.infer = infer;
type.inferAll = inferAll;
type.parsers = PARSERS;
module.exports = type;
},{"../util":24}],20:[function(require,module,exports){
var util = require('./util');
var type = require('./import/type');
var stats = require('./stats');
var template = require('./template');

var FMT = {
  'date':    '|time:"%m/%d/%Y %H:%M:%S"',
  'number':  '|number:".4f"',
  'integer': '|number:"d"'
};

var POS = {
  'number':  'left',
  'integer': 'left'
};

module.exports.table = function(data, opt) {
  opt = util.extend({separator:' ', minwidth: 8, maxwidth: 15}, opt);
  var fields = opt.fields || util.keys(data[0]),
      types = type.all(data);

  if (opt.start || opt.limit) {
    var a = opt.start || 0,
        b = opt.limit ? a + opt.limit : data.length;
    data = data.slice(a, b);
  }

  // determine char width of fields
  var lens = fields.map(function(name) {
    var format = FMT[types[name]] || '',
        t = template('{{' + name + format + '}}'),
        l = stats.max(data, function(x) { return t(x).length; });
    l = Math.max(Math.min(name.length, opt.minwidth), l);
    return opt.maxwidth > 0 ? Math.min(l, opt.maxwidth) : l;
  });

  // print header row
  var head = fields.map(function(name, i) {
    return util.truncate(util.pad(name, lens[i], 'center'), lens[i]);
  }).join(opt.separator);

  // build template function for each row
  var tmpl = template(fields.map(function(name, i) {
    return '{{' +
      name +
      (FMT[types[name]] || '') +
      ('|pad:' + lens[i] + ',' + (POS[types[name]] || 'right')) +
      ('|truncate:' + lens[i]) +
    '}}';
  }).join(opt.separator));

  // print table
  return head + "\n" + data.map(tmpl).join('\n');
};

module.exports.summary = function(s) {
  s = s ? s.__summary__ ? s : stats.summary(s) : this;
  var str = [], i, n;
  for (i=0, n=s.length; i<n; ++i) {
    str.push('-- ' + s[i].field + ' --');
    if (s[i].type === 'string' || s[i].distinct < 10) {
      str.push(printCategoricalProfile(s[i]));
    } else {
      str.push(printQuantitativeProfile(s[i]));
    }
    str.push('');
  }
  return str.join('\n');
};

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
},{"./import/type":19,"./stats":21,"./template":22,"./util":24}],21:[function(require,module,exports){
var util = require('./util');
var type = require('./import/type');
var gen = require('./generate');
var stats = {};

// Collect unique values.
// Output: an array of unique values, in first-observed order
stats.unique = function(values, f, results) {
  f = util.$(f);
  results = results || [];
  var u = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) continue;
    u[v] = 1;
    results.push(v);
  }
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

// Construct a map from distinct values to occurrence counts.
stats.count.map = function(values, f) {
  f = util.$(f);
  var map = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    map[v] = (v in map) ? map[v] + 1 : 1;
  }
  return map;
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
  if (!util.isArray(values) || values.length < 2) return 0;
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

// Find the minimum value in an array.
stats.min = function(values, f) {
  return stats.extent(values, f)[0];
};

// Find the maximum value in an array.
stats.max = function(values, f) {
  return stats.extent(values, f)[1];
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
  var x = -1, y = -1, a, b, v, i, n = values.length;
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
      if (v === v) sum += v;
    }
  } else {
    a = util.$(a);
    b = util.$(b);
    for (i=0; i<values.length; ++i) {
      v = a(values[i]) * b(values[i]);
      if (v === v) sum += v;
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
    type:     type(values, f),
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

// Compute profiles for all variables in a data set.
stats.summary = function(data, fields) {
  fields = fields || util.keys(data[0]);
  var s = fields.map(function(f) {
    var p = stats.profile(data, util.$(f));
    return (p.field = f, p);
  });
  return (s.__summary__ = true, s);
};

module.exports = stats;
},{"./generate":10,"./import/type":19,"./util":24}],22:[function(require,module,exports){
(function (global){
var util = require('./util');
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

var context = {
  formats:    [],
  format_map: {},
  truncate:   util.truncate,
  pad:        util.pad
};

function template(text) {
  var src = source(text, 'd');
  src = 'var __t; return ' + src + ';';

  /* jshint evil: true */
  return (new Function('d', src)).bind(context);
}

template.source = source;
template.context = context;
module.exports = template;

// Clear cache of format objects.
// This can *break* prior template functions, so invoke with care!
template.clearFormatCache = function() {
  context.formats = [];
  context.format_map = {};
};

// Generate property access code for use within template source.
// object: the name of the object (variable) containing template data
// property: the property access string, verbatim from template tag
template.property = function(object, property) {
  var src = util.field(property).map(util.str).join('][');
  return object + '[' + src + ']';
};

// Generate source code for a template function.
// text: the template text
// variable: the name of the data object variable ('obj' by default)
// properties: optional hash for collecting all accessed properties
function source(text, variable, properties) {
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
        template_var(interpolate, variable, properties) +
        '))==null?\'\':__t)+\n\'';
    }

    // Adobe VMs need the match returned to produce the correct offest.
    return match;
  });
  return src + '\'';
}

function template_var(text, variable, properties) {
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

  function date() {
    return '(typeof ' + src + '==="number"?new Date('+src+'):'+src+')';
  }

  if (properties) properties[prop] = 1;
  var src = template.property(variable, prop);

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
      case 'pad':
        a = util.number(args[0]);
        b = args[1];
        b = (b!=='left' && b!=='middle' && b!=='center') ? 'right' : b;
        src = 'this.pad(' + strcall() + ',' + a + ',\'' + b + '\')';
        break;
      case 'number':
        a = template_format(args[0], d3.format);
        stringCast = false;
        src = 'this.formats['+a+']('+src+')';
        break;
      case 'time':
        a = template_format(args[0], d3.time.format);
        stringCast = false;
        src = 'this.formats['+a+']('+date()+')';
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

},{"./util":24}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
(function (process){
var buffer = require('buffer');
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
  return x != null && x.length != null ? x.length : null;
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

u.toMap = function(list, f) {
  return (f = u.$(f)) ?
    list.reduce(function(obj, x) { return (obj[f(x)] = 1, obj); }, {}) :
    list.reduce(function(obj, x) { return (obj[x] = 1, obj); }, {});
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
  return obj != null && obj === obj;
};

u.isBuffer = (buffer.Buffer && buffer.Buffer.isBuffer) || u.false;

// type coercion functions

u.number = function(s) {
  return s == null || s === '' ? null : +s;
};

u.boolean = function(s) {
  return s == null || s === '' ? null : s==='false' ? false : !!s;
};

u.date = function(s) {
  return s == null || s === '' ? null : Date.parse(s);
};

u.array = function(x) {
  return x != null ? (u.isArray(x) ? x : [x]) : [];
};

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

u.$valid  = u.$func('valid', u.isValid);
u.$length = u.$func('length', u.length);
u.$year   = u.$func('year', units.year.unit);
u.$month  = u.$func('month', units.monthOfYear.unit);
u.$date   = u.$func('date', units.dayOfMonth.unit);
u.$day    = u.$func('day', units.dayOfWeek.unit);
u.$hour   = u.$func('hour', units.hourOfDay.unit);
u.$minute = u.$func('minute', units.minuteOfHour.unit);

u.$in = function(f, values) {
  f = u.$(f);
  var map = u.isArray(values) ? u.toMap(values) : values;
  return function(d) { return !!map[f(d)]; };
};

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

u.pad = function(s, length, pos, padchar) {
  padchar = padchar || " ";
  var d = length - s.length;
  if (d <= 0) return s;
  switch (pos) {
    case 'left':
      return strrep(d, padchar) + s;
    case 'middle':
    case 'center':
      return strrep(Math.floor(d/2), padchar) +
         s + strrep(Math.ceil(d/2), padchar);
    default:
      return s + strrep(d, padchar);
  }
};

function strrep(n, str) {
  var s = "", i;
  for (i=0; i<n; ++i) s += str;
  return s;
}

u.truncate = function(s, length, pos, word, ellipsis) {
  var len = s.length;
  if (len <= length) return s;
  ellipsis = ellipsis !== undefined ? String(ellipsis) : '\u2026';
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

},{"./time-units":23,"_process":3,"buffer":2}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyYy9hZ2dyZWdhdGUvYWdncmVnYXRvci5qcyIsInNyYy9hZ2dyZWdhdGUvY29sbGVjdG9yLmpzIiwic3JjL2FnZ3JlZ2F0ZS9ncm91cGJ5LmpzIiwic3JjL2FnZ3JlZ2F0ZS9tZWFzdXJlcy5qcyIsInNyYy9iaW5zL2JpbnMuanMiLCJzcmMvYmlucy9oaXN0b2dyYW0uanMiLCJzcmMvZ2VuZXJhdGUuanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvZHN2LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2luZGV4LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdG9wb2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdHJlZWpzb24uanMiLCJzcmMvaW1wb3J0L2xvYWQuanMiLCJzcmMvaW1wb3J0L3JlYWQuanMiLCJzcmMvaW1wb3J0L3JlYWRlcnMuanMiLCJzcmMvaW1wb3J0L3R5cGUuanMiLCJzcmMvcHJpbnQuanMiLCJzcmMvc3RhdHMuanMiLCJzcmMvdGVtcGxhdGUuanMiLCJzcmMvdGltZS11bml0cy5qcyIsInNyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBkbCA9IHtcbiAgbG9hZDogICAgICByZXF1aXJlKCcuL2ltcG9ydC9sb2FkJyksXG4gIHJlYWQ6ICAgICAgcmVxdWlyZSgnLi9pbXBvcnQvcmVhZCcpLFxuICB0eXBlOiAgICAgIHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKSxcbiAgYmluczogICAgICByZXF1aXJlKCcuL2JpbnMvYmlucycpLFxuICAkYmluOiAgICAgIHJlcXVpcmUoJy4vYmlucy9oaXN0b2dyYW0nKS4kYmluLFxuICBncm91cGJ5OiAgIHJlcXVpcmUoJy4vYWdncmVnYXRlL2dyb3VwYnknKSxcbiAgaGlzdG9ncmFtOiByZXF1aXJlKCcuL2JpbnMvaGlzdG9ncmFtJykuaGlzdG9ncmFtLFxuICBwcmludDogICAgIHJlcXVpcmUoJy4vcHJpbnQnKSxcbiAgdGVtcGxhdGU6ICByZXF1aXJlKCcuL3RlbXBsYXRlJyksXG4gIHRpbWV1bml0czogcmVxdWlyZSgnLi90aW1lLXVuaXRzJylcbn07XG5cbnV0aWwuZXh0ZW5kKGRsLCB1dGlsKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL2dlbmVyYXRlJykpO1xudXRpbC5leHRlbmQoZGwsIHJlcXVpcmUoJy4vc3RhdHMnKSk7XG51dGlsLmV4dGVuZChkbCwgcmVxdWlyZSgnLi9pbXBvcnQvcmVhZGVycycpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkbDsiLG51bGwsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudFF1ZXVlO1xuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG59XG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHF1ZXVlLnB1c2goZnVuKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICBNZWFzdXJlcyA9IHJlcXVpcmUoJy4vbWVhc3VyZXMnKSxcbiAgICBDb2xsZWN0b3IgPSByZXF1aXJlKCcuL2NvbGxlY3RvcicpO1xuXG5mdW5jdGlvbiBBZ2dyZWdhdG9yKCkge1xuICB0aGlzLl9jZWxscyA9IHt9O1xuICB0aGlzLl9hZ2dyID0gW107XG4gIHRoaXMuX3N0cmVhbSA9IGZhbHNlO1xufVxuXG52YXIgRmxhZ3MgPSBBZ2dyZWdhdG9yLkZsYWdzID0ge1xuICBBRERfQ0VMTDogMSxcbiAgTU9EX0NFTEw6IDJcbn07XG5cbnZhciBwcm90byA9IEFnZ3JlZ2F0b3IucHJvdG90eXBlO1xuXG4vLyBQYXJhbWV0ZXJzXG5cbnByb3RvLnN0cmVhbSA9IGZ1bmN0aW9uKHYpIHtcbiAgaWYgKHYgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgdGhpcy5fc3RyZWFtID0gISF2O1xuICB0aGlzLl9hZ2dyID0gW107XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8ga2V5IGFjY2Vzc29yIHRvIHVzZSBmb3Igc3RyZWFtaW5nIHJlbW92ZXNcbnByb3RvLmtleSA9IGZ1bmN0aW9uKGtleSkge1xuICBpZiAoa2V5ID09IG51bGwpIHJldHVybiB0aGlzLl9rZXk7XG4gIHRoaXMuX2tleSA9IHV0aWwuJChrZXkpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIElucHV0OiBhcnJheSBvZiBvYmplY3RzIG9mIHRoZSBmb3JtXG4vLyB7bmFtZTogc3RyaW5nLCBnZXQ6IGZ1bmN0aW9ufVxucHJvdG8uZ3JvdXBieSA9IGZ1bmN0aW9uKGRpbXMpIHtcbiAgdGhpcy5fZGltcyA9IHV0aWwuYXJyYXkoZGltcykubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICBkID0gdXRpbC5pc1N0cmluZyhkKSA/IHtuYW1lOiBkLCBnZXQ6IHV0aWwuJChkKX1cbiAgICAgIDogdXRpbC5pc0Z1bmN0aW9uKGQpID8ge25hbWU6IHV0aWwubmFtZShkKSB8fCBkLm5hbWUgfHwgKCdfJyArIGkpLCBnZXQ6IGR9XG4gICAgICA6IChkLm5hbWUgJiYgdXRpbC5pc0Z1bmN0aW9uKGQuZ2V0KSkgPyBkIDogbnVsbDtcbiAgICBpZiAoZCA9PSBudWxsKSB0aHJvdyAnSW52YWxpZCBncm91cGJ5IGFyZ3VtZW50OiAnICsgZDtcbiAgICByZXR1cm4gZDtcbiAgfSk7XG4gIHJldHVybiB0aGlzLmNsZWFyKCk7XG59O1xuXG4vLyBJbnB1dDogYXJyYXkgb2Ygb2JqZWN0cyBvZiB0aGUgZm9ybVxuLy8ge25hbWU6IHN0cmluZywgb3BzOiBbc3RyaW5nLCAuLi5dfVxucHJvdG8uc3VtbWFyaXplID0gZnVuY3Rpb24oZmllbGRzKSB7XG4gIGZpZWxkcyA9IHN1bW1hcml6ZV9hcmdzKGZpZWxkcyk7XG4gIHRoaXMuX2NvdW50ID0gdHJ1ZTtcbiAgdmFyIGFnZ3IgPSAodGhpcy5fYWdnciA9IFtdKSxcbiAgICAgIG0sIGYsIGksIGosIG9wLCBhcywgZ2V0O1xuXG4gIGZvciAoaT0wOyBpPGZpZWxkcy5sZW5ndGg7ICsraSkge1xuICAgIGZvciAoaj0wLCBtPVtdLCBmPWZpZWxkc1tpXTsgajxmLm9wcy5sZW5ndGg7ICsraikge1xuICAgICAgb3AgPSBmLm9wc1tqXTtcbiAgICAgIGlmIChvcCAhPT0gJ2NvdW50JykgdGhpcy5fY291bnQgPSBmYWxzZTtcbiAgICAgIGFzID0gKGYuYXMgJiYgZi5hc1tqXSkgfHwgKG9wICsgKGYubmFtZT09PScqJyA/ICcnIDogJ18nK2YubmFtZSkpO1xuICAgICAgbS5wdXNoKE1lYXN1cmVzW29wXShhcykpO1xuICAgIH1cbiAgICBnZXQgPSBmLmdldCAmJiB1dGlsLiQoZi5nZXQpIHx8XG4gICAgICAoZi5uYW1lID09PSAnKicgPyB1dGlsLmlkZW50aXR5IDogdXRpbC4kKGYubmFtZSkpO1xuICAgIGFnZ3IucHVzaCh7XG4gICAgICBuYW1lOiBmLm5hbWUsXG4gICAgICBtZWFzdXJlczogTWVhc3VyZXMuY3JlYXRlKFxuICAgICAgICBtLFxuICAgICAgICB0aGlzLl9zdHJlYW0sIC8vIHN0cmVhbWluZyByZW1vdmUgZmxhZ1xuICAgICAgICBnZXQsICAgICAgICAgIC8vIGlucHV0IHR1cGxlIGdldHRlclxuICAgICAgICB0aGlzLl9hc3NpZ24pIC8vIG91dHB1dCB0dXBsZSBzZXR0ZXJcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5jbGVhcigpO1xufTtcblxuLy8gQ29udmVuaWVuY2UgbWV0aG9kIHRvIHN1bW1hcml6ZSBieSBjb3VudFxucHJvdG8uY291bnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3VtbWFyaXplKHsnKic6J2NvdW50J30pO1xufTtcblxuLy8gT3ZlcnJpZGUgdG8gcGVyZm9ybSBjdXN0b20gdHVwbGUgdmFsdWUgYXNzaWdubWVudFxucHJvdG8uX2Fzc2lnbiA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgb2JqZWN0W25hbWVdID0gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBzdW1tYXJpemVfYXJncyhmaWVsZHMpIHtcbiAgaWYgKHV0aWwuaXNBcnJheShmaWVsZHMpKSB7IHJldHVybiBmaWVsZHM7IH1cbiAgaWYgKGZpZWxkcyA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuICB2YXIgYSA9IFtdLCBuYW1lLCBvcHM7XG4gIGZvciAobmFtZSBpbiBmaWVsZHMpIHtcbiAgICBvcHMgPSB1dGlsLmFycmF5KGZpZWxkc1tuYW1lXSk7XG4gICAgYS5wdXNoKHtuYW1lOiBuYW1lLCBvcHM6IG9wc30pO1xuICB9XG4gIHJldHVybiBhO1xufVxuXG4vLyBDZWxsIE1hbmFnZW1lbnRcblxucHJvdG8uY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICh0aGlzLl9jZWxscyA9IHt9LCB0aGlzKTtcbn07XG5cbnByb3RvLl9jZWxsa2V5ID0gZnVuY3Rpb24oeCkge1xuICB2YXIgZCA9IHRoaXMuX2RpbXMsXG4gICAgICBuID0gZC5sZW5ndGgsIGksXG4gICAgICBrID0gU3RyaW5nKGRbMF0uZ2V0KHgpKTtcbiAgZm9yIChpPTE7IGk8bjsgKytpKSB7XG4gICAgayArPSAnfCcgKyBkW2ldLmdldCh4KTtcbiAgfVxuICByZXR1cm4gaztcbn07XG5cbnByb3RvLl9jZWxsID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5ID0gdGhpcy5fZGltcy5sZW5ndGggPyB0aGlzLl9jZWxsa2V5KHgpIDogJyc7XG4gIHJldHVybiB0aGlzLl9jZWxsc1trZXldIHx8ICh0aGlzLl9jZWxsc1trZXldID0gdGhpcy5fbmV3Y2VsbCh4KSk7XG59O1xuXG5wcm90by5fbmV3Y2VsbCA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGNlbGwgPSB7XG4gICAgbnVtOiAgIDAsXG4gICAgdHVwbGU6IHRoaXMuX25ld3R1cGxlKHgpLFxuICAgIGZsYWc6ICBGbGFncy5BRERfQ0VMTCxcbiAgICBhZ2dzOiAge31cbiAgfTtcblxuICB2YXIgYWdnciA9IHRoaXMuX2FnZ3IsIGk7XG4gIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXSA9IG5ldyBhZ2dyW2ldLm1lYXN1cmVzKGNlbGwsIGNlbGwudHVwbGUpO1xuICB9XG4gIGlmIChjZWxsLmNvbGxlY3QpIHtcbiAgICBjZWxsLmRhdGEgPSBuZXcgQ29sbGVjdG9yKHRoaXMuX2tleSk7XG4gIH1cbiAgcmV0dXJuIGNlbGw7XG59O1xuXG5wcm90by5fbmV3dHVwbGUgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBkaW1zID0gdGhpcy5fZGltcyxcbiAgICAgIHQgPSB7fSwgaSwgbjtcbiAgZm9yIChpPTAsIG49ZGltcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdFtkaW1zW2ldLm5hbWVdID0gZGltc1tpXS5nZXQoeCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2luZ2VzdCh0KTtcbn07XG5cbi8vIE92ZXJyaWRlIHRvIHBlcmZvcm0gY3VzdG9tIHR1cGxlIGluZ2VzdGlvblxucHJvdG8uX2luZ2VzdCA9IHV0aWwuaWRlbnRpdHk7XG5cbi8vIFByb2Nlc3MgVHVwbGVzXG5cbnByb3RvLl9hZGQgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBjZWxsID0gdGhpcy5fY2VsbCh4KSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuXG4gIGNlbGwubnVtICs9IDE7XG4gIGlmICghdGhpcy5fY291bnQpIHsgLy8gc2tpcCBpZiBjb3VudC1vbmx5XG4gICAgaWYgKGNlbGwuY29sbGVjdCkgY2VsbC5kYXRhLmFkZCh4KTtcbiAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5hZGQoeCk7XG4gICAgfVxuICB9XG4gIGNlbGwuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbn07XG5cbnByb3RvLl9yZW0gPSBmdW5jdGlvbih4KSB7XG4gIHZhciBjZWxsID0gdGhpcy5fY2VsbCh4KSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuXG4gIGNlbGwubnVtIC09IDE7XG4gIGlmICghdGhpcy5fY291bnQpIHsgLy8gc2tpcCBpZiBjb3VudC1vbmx5XG4gICAgaWYgKGNlbGwuY29sbGVjdCkgY2VsbC5kYXRhLnJlbSh4KTtcbiAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5yZW0oeCk7XG4gICAgfVxuICB9XG4gIGNlbGwuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbn07XG5cbnByb3RvLl9tb2QgPSBmdW5jdGlvbihjdXJyLCBwcmV2KSB7XG4gIHZhciBjZWxsMCA9IHRoaXMuX2NlbGwocHJldiksXG4gICAgICBjZWxsMSA9IHRoaXMuX2NlbGwoY3VyciksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBpZiAoY2VsbDAgIT09IGNlbGwxKSB7XG4gICAgY2VsbDAubnVtIC09IDE7XG4gICAgY2VsbDEubnVtICs9IDE7XG4gICAgaWYgKGNlbGwwLmNvbGxlY3QpIGNlbGwwLmRhdGEucmVtKHByZXYpO1xuICAgIGlmIChjZWxsMS5jb2xsZWN0KSBjZWxsMS5kYXRhLmFkZChjdXJyKTtcbiAgfSBlbHNlIGlmIChjZWxsMC5jb2xsZWN0ICYmICF1dGlsLmlzT2JqZWN0KGN1cnIpKSB7XG4gICAgY2VsbDAuZGF0YS5yZW0ocHJldik7XG4gICAgY2VsbDAuZGF0YS5hZGQoY3Vycik7XG4gIH1cblxuICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgY2VsbDAuYWdnc1thZ2dyW2ldLm5hbWVdLnJlbShwcmV2KTtcbiAgICBjZWxsMS5hZ2dzW2FnZ3JbaV0ubmFtZV0uYWRkKGN1cnIpO1xuICB9XG4gIGNlbGwwLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGNlbGwxLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG59O1xuXG5wcm90by5yZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsXG4gICAgICBjZWxsLCBpLCBrO1xuXG4gIGZvciAoayBpbiB0aGlzLl9jZWxscykge1xuICAgIGNlbGwgPSB0aGlzLl9jZWxsc1trXTtcbiAgICBpZiAoY2VsbC5udW0gPiAwKSB7XG4gICAgICAvLyBjb25zb2xpZGF0ZSBjb2xsZWN0b3IgdmFsdWVzXG4gICAgICBpZiAoY2VsbC5jb2xsZWN0KSB7XG4gICAgICAgIGNlbGwuZGF0YS52YWx1ZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIHVwZGF0ZSB0dXBsZSBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLnNldCgpO1xuICAgICAgfVxuICAgICAgLy8gYWRkIG91dHB1dCB0dXBsZVxuICAgICAgcmVzdWx0LnB1c2goY2VsbC50dXBsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jZWxsc1trXTtcbiAgICB9XG4gICAgY2VsbC5mbGFnID0gMDtcbiAgfVxuXG4gIHRoaXMuX3JlbXMgPSBmYWxzZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnByb3RvLmNoYW5nZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNoYW5nZXMgPSB7YWRkOltdLCByZW06W10sIG1vZDpbXX0sXG4gICAgICBhZ2dyID0gdGhpcy5fYWdncixcbiAgICAgIGNlbGwsIGZsYWcsIGksIGs7XG5cbiAgZm9yIChrIGluIHRoaXMuX2NlbGxzKSB7XG4gICAgY2VsbCA9IHRoaXMuX2NlbGxzW2tdO1xuICAgIGZsYWcgPSBjZWxsLmZsYWc7XG5cbiAgICAvLyBjb25zb2xpZGF0ZSBjb2xsZWN0b3IgdmFsdWVzXG4gICAgaWYgKGNlbGwuY29sbGVjdCkge1xuICAgICAgY2VsbC5kYXRhLnZhbHVlcygpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0dXBsZSBwcm9wZXJ0aWVzXG4gICAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0uc2V0KCk7XG4gICAgfVxuXG4gICAgLy8gb3JnYW5pemUgb3V0cHV0IHR1cGxlc1xuICAgIGlmIChjZWxsLm51bSA8PSAwKSB7XG4gICAgICBjaGFuZ2VzLnJlbS5wdXNoKGNlbGwudHVwbGUpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2tdO1xuICAgIH0gZWxzZSBpZiAoZmxhZyAmIEZsYWdzLkFERF9DRUxMKSB7XG4gICAgICBjaGFuZ2VzLmFkZC5wdXNoKGNlbGwudHVwbGUpO1xuICAgIH0gZWxzZSBpZiAoZmxhZyAmIEZsYWdzLk1PRF9DRUxMKSB7XG4gICAgICBjaGFuZ2VzLm1vZC5wdXNoKGNlbGwudHVwbGUpO1xuICAgIH1cblxuICAgIGNlbGwuZmxhZyA9IDA7XG4gIH1cblxuICB0aGlzLl9yZW1zID0gZmFsc2U7XG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxucHJvdG8uZXhlY3V0ZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiB0aGlzLmNsZWFyKCkuaW5zZXJ0KGlucHV0KS5yZXN1bHQoKTtcbn07XG5cbnByb3RvLmluc2VydCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHRoaXMuX2NvbnNvbGlkYXRlKCk7XG4gIGZvciAodmFyIGk9MDsgaTxpbnB1dC5sZW5ndGg7ICsraSkge1xuICAgIHRoaXMuX2FkZChpbnB1dFtpXSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbihpbnB1dCkge1xuICBpZiAoIXRoaXMuX3N0cmVhbSkge1xuICAgIHRocm93ICdBZ2dyZWdhdG9yIG5vdCBjb25maWd1cmVkIGZvciBzdHJlYW1pbmcgcmVtb3Zlcy4nICtcbiAgICAgICcgQ2FsbCBzdHJlYW0odHJ1ZSkgcHJpb3IgdG8gY2FsbGluZyBzdW1tYXJpemUuJztcbiAgfVxuICBmb3IgKHZhciBpPTA7IGk8aW5wdXQubGVuZ3RoOyArK2kpIHtcbiAgICB0aGlzLl9yZW0oaW5wdXRbaV0pO1xuICB9XG4gIHRoaXMuX3JlbXMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGNvbnNvbGlkYXRlIHJlbW92YWxzXG5wcm90by5fY29uc29saWRhdGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9yZW1zKSByZXR1cm47XG4gIGZvciAodmFyIGsgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICBpZiAodGhpcy5fY2VsbHNba10uY29sbGVjdCkge1xuICAgICAgdGhpcy5fY2VsbHNba10uZGF0YS52YWx1ZXMoKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5fcmVtcyA9IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2dyZWdhdG9yOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIHN0YXRzID0gcmVxdWlyZSgnLi4vc3RhdHMnKTtcblxudmFyIFJFTSA9ICdfX2RsX3JlbV9fJztcblxuZnVuY3Rpb24gQ29sbGVjdG9yKGtleSkge1xuICB0aGlzLl9hZGQgPSBbXTtcbiAgdGhpcy5fcmVtID0gW107XG4gIHRoaXMuX2tleSA9IGtleSB8fCBudWxsO1xuICB0aGlzLl9sYXN0ID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gQ29sbGVjdG9yLnByb3RvdHlwZTtcblxucHJvdG8uYWRkID0gZnVuY3Rpb24odikge1xuICB0aGlzLl9hZGQucHVzaCh2KTtcbn07XG5cbnByb3RvLnJlbSA9IGZ1bmN0aW9uKHYpIHtcbiAgdGhpcy5fcmVtLnB1c2godik7XG59O1xuXG5wcm90by52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fZ2V0ID0gbnVsbDtcbiAgaWYgKHRoaXMuX3JlbS5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLl9hZGQ7XG5cbiAgdmFyIGEgPSB0aGlzLl9hZGQsXG4gICAgICByID0gdGhpcy5fcmVtLFxuICAgICAgayA9IHRoaXMuX2tleSxcbiAgICAgIHggPSBBcnJheShhLmxlbmd0aCAtIHIubGVuZ3RoKSxcbiAgICAgIGksIGosIG4sIG07XG5cbiAgaWYgKCF1dGlsLmlzT2JqZWN0KHJbMF0pKSB7XG4gICAgLy8gcHJvY2Vzc2luZyByYXcgdmFsdWVzXG4gICAgbSA9IHN0YXRzLmNvdW50Lm1hcChyKTtcbiAgICBmb3IgKGk9MCwgaj0wLCBuPWEubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgaWYgKG1bYVtpXV0gPiAwKSB7XG4gICAgICAgIG1bYVtpXV0gLT0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhbaisrXSA9IGFbaV07XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGspIHtcbiAgICAvLyBoYXMgdW5pcXVlIGtleSBmaWVsZCwgc28gdXNlIHRoYXRcbiAgICBtID0gdXRpbC50b01hcChyLCBrKTtcbiAgICBmb3IgKGk9MCwgaj0wLCBuPWEubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgaWYgKCFtLmhhc093blByb3BlcnR5KGsoYVtpXSkpKSB7IHhbaisrXSA9IGFbaV07IH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gbm8gdW5pcXVlIGtleSwgbWFyayB0dXBsZXMgZGlyZWN0bHlcbiAgICBmb3IgKGk9MCwgbj1yLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIHJbaV1bUkVNXSA9IDE7XG4gICAgfVxuICAgIGZvciAoaT0wLCBqPTAsIG49YS5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBpZiAoIWFbaV1bUkVNXSkgeyB4W2orK10gPSBhW2ldOyB9XG4gICAgfVxuICAgIGZvciAoaT0wLCBuPXIubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZGVsZXRlIHJbaV1bUkVNXTtcbiAgICB9XG4gIH1cblxuICB0aGlzLl9yZW0gPSBbXTtcbiAgcmV0dXJuICh0aGlzLl9hZGQgPSB4KTtcbn07XG5cbi8vIG1lbW9pemluZyBzdGF0aXN0aWNzIG1ldGhvZHNcblxucHJvdG8uZXh0ZW50ID0gZnVuY3Rpb24oZ2V0KSB7XG4gIGlmICh0aGlzLl9nZXQgIT09IGdldCB8fCAhdGhpcy5fZXh0KSB7XG4gICAgdmFyIHYgPSB0aGlzLnZhbHVlcygpLFxuICAgICAgICBpID0gc3RhdHMuZXh0ZW50LmluZGV4KHYsIGdldCk7XG4gICAgdGhpcy5fZXh0ID0gW3ZbaVswXV0sIHZbaVsxXV1dO1xuICAgIHRoaXMuX2dldCA9IGdldDsgICAgXG4gIH1cbiAgcmV0dXJuIHRoaXMuX2V4dDtcbn07XG5cbnByb3RvLmFyZ21pbiA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5leHRlbnQoZ2V0KVswXTtcbn07XG5cbnByb3RvLmFyZ21heCA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5leHRlbnQoZ2V0KVsxXTtcbn07XG5cbnByb3RvLm1pbiA9IGZ1bmN0aW9uKGdldCkge1xuICB2YXIgbSA9IHRoaXMuZXh0ZW50KGdldClbMF07XG4gIHJldHVybiBtID8gZ2V0KG0pIDogK0luZmluaXR5O1xufTtcblxucHJvdG8ubWF4ID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHZhciBtID0gdGhpcy5leHRlbnQoZ2V0KVsxXTtcbiAgcmV0dXJuIG0gPyBnZXQobSkgOiAtSW5maW5pdHk7XG59O1xuXG5wcm90by5xdWFydGlsZSA9IGZ1bmN0aW9uKGdldCkge1xuICBpZiAodGhpcy5fZ2V0ICE9PSBnZXQgfHwgIXRoaXMuX3EpIHtcbiAgICB0aGlzLl9xID0gc3RhdHMucXVhcnRpbGUodGhpcy52YWx1ZXMoKSwgZ2V0KTtcbiAgICB0aGlzLl9nZXQgPSBnZXQ7ICAgIFxuICB9XG4gIHJldHVybiB0aGlzLl9xO1xufTtcblxucHJvdG8ucTEgPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMucXVhcnRpbGUoZ2V0KVswXTtcbn07XG5cbnByb3RvLnEyID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLnF1YXJ0aWxlKGdldClbMV07XG59O1xuXG5wcm90by5xMyA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5xdWFydGlsZShnZXQpWzJdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0b3I7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBBZ2dyZWdhdG9yID0gcmVxdWlyZSgnLi9hZ2dyZWdhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGZsYXR0ZW4gYXJndW1lbnRzIGludG8gYSBzaW5nbGUgYXJyYXlcbiAgdmFyIGFyZ3MgPSBbXS5yZWR1Y2UuY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uKGEsIHgpIHtcbiAgICByZXR1cm4gYS5jb25jYXQodXRpbC5hcnJheSh4KSk7XG4gIH0sIFtdKTtcbiAgLy8gY3JlYXRlIGFuZCByZXR1cm4gYW4gYWdncmVnYXRvclxuICByZXR1cm4gbmV3IEFnZ3JlZ2F0b3IoKVxuICAgIC5ncm91cGJ5KGFyZ3MpXG4gICAgLnN1bW1hcml6ZSh7JyonOid2YWx1ZXMnfSk7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciB0eXBlcyA9IHtcbiAgJ3ZhbHVlcyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YWx1ZXMnLFxuICAgIGluaXQ6ICdjZWxsLmNvbGxlY3QgPSB0cnVlOycsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS52YWx1ZXMoKScsIGlkeDogLTFcbiAgfSksXG4gICdjb3VudCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdjb3VudCcsXG4gICAgc2V0OiAgJ2NlbGwubnVtJ1xuICB9KSxcbiAgJ21pc3NpbmcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWlzc2luZycsXG4gICAgc2V0OiAgJ3RoaXMubWlzc2luZydcbiAgfSksXG4gICd2YWxpZCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YWxpZCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQnXG4gIH0pLFxuICAnc3VtJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3N1bScsXG4gICAgaW5pdDogJ3RoaXMuc3VtID0gMDsnLFxuICAgIGFkZDogICd0aGlzLnN1bSArPSB2OycsXG4gICAgcmVtOiAgJ3RoaXMuc3VtIC09IHY7JyxcbiAgICBzZXQ6ICAndGhpcy5zdW0nXG4gIH0pLFxuICAnbWVhbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtZWFuJyxcbiAgICBpbml0OiAndGhpcy5tZWFuID0gMDsnLFxuICAgIGFkZDogICd2YXIgZCA9IHYgLSB0aGlzLm1lYW47IHRoaXMubWVhbiArPSBkIC8gdGhpcy52YWxpZDsnLFxuICAgIHJlbTogICd2YXIgZCA9IHYgLSB0aGlzLm1lYW47IHRoaXMubWVhbiAtPSB0aGlzLnZhbGlkID8gZCAvIHRoaXMudmFsaWQgOiB0aGlzLm1lYW47JyxcbiAgICBzZXQ6ICAndGhpcy5tZWFuJ1xuICB9KSxcbiAgJ2F2ZXJhZ2UnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXZlcmFnZScsXG4gICAgc2V0OiAgJ3RoaXMubWVhbicsXG4gICAgcmVxOiAgWydtZWFuJ10sIGlkeDogMVxuICB9KSxcbiAgJ3ZhcmlhbmNlJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcmlhbmNlJyxcbiAgICBpbml0OiAndGhpcy5kZXYgPSAwOycsXG4gICAgYWRkOiAgJ3RoaXMuZGV2ICs9IGQgKiAodiAtIHRoaXMubWVhbik7JyxcbiAgICByZW06ICAndGhpcy5kZXYgLT0gZCAqICh2IC0gdGhpcy5tZWFuKTsnLFxuICAgIHNldDogICd0aGlzLnZhbGlkID4gMSA/IHRoaXMuZGV2IC8gKHRoaXMudmFsaWQtMSkgOiAwJyxcbiAgICByZXE6ICBbJ21lYW4nXSwgaWR4OiAxXG4gIH0pLFxuICAndmFyaWFuY2VwJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcmlhbmNlcCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gdGhpcy5kZXYgLyB0aGlzLnZhbGlkIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdzdGRldic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdzdGRldicsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gTWF0aC5zcXJ0KHRoaXMuZGV2IC8gKHRoaXMudmFsaWQtMSkpIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdzdGRldnAnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3RkZXZwJyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCA+IDEgPyBNYXRoLnNxcnQodGhpcy5kZXYgLyB0aGlzLnZhbGlkKSA6IDAnLFxuICAgIHJlcTogIFsndmFyaWFuY2UnXSwgaWR4OiAyXG4gIH0pLFxuICAnbWVkaWFuJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21lZGlhbicsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMih0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ3ExJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ExJyxcbiAgICBzZXQ6ICAnY2VsbC5kYXRhLnExKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAncTMnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAncTMnLFxuICAgIHNldDogICdjZWxsLmRhdGEucTModGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdkaXN0aW5jdCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdkaXN0aW5jdCcsXG4gICAgc2V0OiAgJ3RoaXMuZGlzdGluY3QoY2VsbC5kYXRhLnZhbHVlcygpLCB0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2FyZ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhcmdtaW4nLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLmFyZ21pbiA9IHQ7JyxcbiAgICByZW06ICAnaWYgKHYgPD0gdGhpcy5taW4pIHRoaXMuYXJnbWluID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21pbiA9IHRoaXMuYXJnbWluIHx8IGNlbGwuZGF0YS5hcmdtaW4odGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ21pbiddLCBzdHI6IFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2FyZ21heCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhcmdtYXgnLFxuICAgIGFkZDogICdpZiAodiA+IHRoaXMubWF4KSB0aGlzLmFyZ21heCA9IHQ7JyxcbiAgICByZW06ICAnaWYgKHYgPj0gdGhpcy5tYXgpIHRoaXMuYXJnbWF4ID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21heCA9IHRoaXMuYXJnbWF4IHx8IGNlbGwuZGF0YS5hcmdtYXgodGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ21heCddLCBzdHI6IFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtaW4nLFxuICAgIGluaXQ6ICd0aGlzLm1pbiA9ICtJbmZpbml0eTsnLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLm1pbiA9IHY7JyxcbiAgICByZW06ICAnaWYgKHYgPD0gdGhpcy5taW4pIHRoaXMubWluID0gTmFOOycsXG4gICAgc2V0OiAgJ3RoaXMubWluID0gKGlzTmFOKHRoaXMubWluKSA/IGNlbGwuZGF0YS5taW4odGhpcy5nZXQpIDogdGhpcy5taW4pJyxcbiAgICBzdHI6ICBbJ3ZhbHVlcyddLCBpZHg6IDRcbiAgfSksXG4gICdtYXgnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWF4JyxcbiAgICBpbml0OiAndGhpcy5tYXggPSAtSW5maW5pdHk7JyxcbiAgICBhZGQ6ICAnaWYgKHYgPiB0aGlzLm1heCkgdGhpcy5tYXggPSB2OycsXG4gICAgcmVtOiAgJ2lmICh2ID49IHRoaXMubWF4KSB0aGlzLm1heCA9IE5hTjsnLFxuICAgIHNldDogICd0aGlzLm1heCA9IChpc05hTih0aGlzLm1heCkgPyBjZWxsLmRhdGEubWF4KHRoaXMuZ2V0KSA6IHRoaXMubWF4KScsXG4gICAgc3RyOiAgWyd2YWx1ZXMnXSwgaWR4OiA0XG4gIH0pLFxuICAnbW9kZXNrZXcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbW9kZXNrZXcnLFxuICAgIHNldDogICd0aGlzLmRldj09PTAgPyAwIDogKHRoaXMubWVhbiAtIGNlbGwuZGF0YS5xMih0aGlzLmdldCkpIC8gTWF0aC5zcXJ0KHRoaXMuZGV2Lyh0aGlzLnZhbGlkLTEpKScsXG4gICAgcmVxOiAgWydtZWFuJywgJ3N0ZGV2JywgJ21lZGlhbiddLCBpZHg6IDVcbiAgfSlcbn07XG5cbmZ1bmN0aW9uIG1lYXN1cmUoYmFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob3V0KSB7XG4gICAgdmFyIG0gPSB1dGlsLmV4dGVuZCh7aW5pdDonJywgYWRkOicnLCByZW06JycsIGlkeDowfSwgYmFzZSk7XG4gICAgbS5vdXQgPSBvdXQgfHwgYmFzZS5uYW1lO1xuICAgIHJldHVybiBtO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKGFnZywgc3RyZWFtKSB7XG4gIGZ1bmN0aW9uIGNvbGxlY3QobSwgYSkge1xuICAgIGZ1bmN0aW9uIGhlbHBlcihyKSB7IGlmICghbVtyXSkgY29sbGVjdChtLCBtW3JdID0gdHlwZXNbcl0oKSk7IH1cbiAgICBpZiAoYS5yZXEpIGEucmVxLmZvckVhY2goaGVscGVyKTtcbiAgICBpZiAoc3RyZWFtICYmIGEuc3RyKSBhLnN0ci5mb3JFYWNoKGhlbHBlcik7XG4gICAgcmV0dXJuIG07XG4gIH1cbiAgdmFyIG1hcCA9IGFnZy5yZWR1Y2UoXG4gICAgY29sbGVjdCxcbiAgICBhZ2cucmVkdWNlKGZ1bmN0aW9uKG0sIGEpIHsgcmV0dXJuIChtW2EubmFtZV0gPSBhLCBtKTsgfSwge30pXG4gICk7XG4gIHJldHVybiB1dGlsLnZhbHMobWFwKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEuaWR4IC0gYi5pZHg7IH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoYWdnLCBzdHJlYW0sIGFjY2Vzc29yLCBtdXRhdG9yKSB7XG4gIHZhciBhbGwgPSByZXNvbHZlKGFnZywgc3RyZWFtKSxcbiAgICAgIGN0ciA9ICd0aGlzLmNlbGwgPSBjZWxsOyB0aGlzLnR1cGxlID0gdDsgdGhpcy52YWxpZCA9IDA7IHRoaXMubWlzc2luZyA9IDA7JyxcbiAgICAgIGFkZCA9ICdpZiAodj09bnVsbCkgdGhpcy5taXNzaW5nKys7IGlmICghdGhpcy5pc1ZhbGlkKHYpKSByZXR1cm47ICsrdGhpcy52YWxpZDsnLFxuICAgICAgcmVtID0gJ2lmICh2PT1udWxsKSB0aGlzLm1pc3NpbmctLTsgaWYgKCF0aGlzLmlzVmFsaWQodikpIHJldHVybjsgLS10aGlzLnZhbGlkOycsXG4gICAgICBzZXQgPSAndmFyIHQgPSB0aGlzLnR1cGxlOyB2YXIgY2VsbCA9IHRoaXMuY2VsbDsnO1xuXG4gIGFsbC5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICBpZiAoYS5pZHggPCAwKSB7XG4gICAgICBjdHIgPSBhLmluaXQgKyBjdHI7XG4gICAgICBhZGQgPSBhLmFkZCArIGFkZDtcbiAgICAgIHJlbSA9IGEucmVtICsgcmVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHIgKz0gYS5pbml0O1xuICAgICAgYWRkICs9IGEuYWRkO1xuICAgICAgcmVtICs9IGEucmVtO1xuICAgIH1cbiAgfSk7XG4gIGFnZy5zbGljZSgpXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5pZHggLSBiLmlkeDsgfSlcbiAgICAuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgICBzZXQgKz0gJ3RoaXMuYXNzaWduKHQsXFwnJythLm91dCsnXFwnLCcrYS5zZXQrJyk7JztcbiAgICB9KTtcbiAgc2V0ICs9ICdyZXR1cm4gdDsnO1xuXG4gIC8qIGpzaGludCBldmlsOiB0cnVlICovXG4gIGN0ciA9IEZ1bmN0aW9uKCdjZWxsJywgJ3QnLCBjdHIpO1xuICBjdHIucHJvdG90eXBlLmFzc2lnbiA9IG11dGF0b3I7XG4gIGN0ci5wcm90b3R5cGUuYWRkID0gRnVuY3Rpb24oJ3QnLCAndmFyIHYgPSB0aGlzLmdldCh0KTsnICsgYWRkKTtcbiAgY3RyLnByb3RvdHlwZS5yZW0gPSBGdW5jdGlvbigndCcsICd2YXIgdiA9IHRoaXMuZ2V0KHQpOycgKyByZW0pO1xuICBjdHIucHJvdG90eXBlLnNldCA9IEZ1bmN0aW9uKHNldCk7XG4gIGN0ci5wcm90b3R5cGUuZ2V0ID0gYWNjZXNzb3I7XG4gIGN0ci5wcm90b3R5cGUuZGlzdGluY3QgPSByZXF1aXJlKCcuLi9zdGF0cycpLmNvdW50LmRpc3RpbmN0O1xuICBjdHIucHJvdG90eXBlLmlzVmFsaWQgPSB1dGlsLmlzVmFsaWQ7XG4gIHJldHVybiBjdHI7XG59XG5cbnR5cGVzLmNyZWF0ZSA9IGNyZWF0ZTtcbm1vZHVsZS5leHBvcnRzID0gdHlwZXM7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgdW5pdHMgPSByZXF1aXJlKCcuLi90aW1lLXVuaXRzJyk7XG52YXIgRVBTSUxPTiA9IDFlLTE1O1xuXG5mdW5jdGlvbiBiaW5zKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGRldGVybWluZSByYW5nZVxuICB2YXIgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDE1LFxuICAgICAgYmFzZSA9IG9wdC5iYXNlIHx8IDEwLFxuICAgICAgbG9nYiA9IE1hdGgubG9nKGJhc2UpLFxuICAgICAgZGl2ID0gb3B0LmRpdiB8fCBbNSwgMl0sICAgICAgXG4gICAgICBtaW4gPSBvcHQubWluLFxuICAgICAgbWF4ID0gb3B0Lm1heCxcbiAgICAgIHNwYW4gPSBtYXggLSBtaW4sXG4gICAgICBzdGVwLCBsZXZlbCwgbWluc3RlcCwgcHJlY2lzaW9uLCB2LCBpLCBlcHM7XG5cbiAgaWYgKG9wdC5zdGVwKSB7XG4gICAgLy8gaWYgc3RlcCBzaXplIGlzIGV4cGxpY2l0bHkgZ2l2ZW4sIHVzZSB0aGF0XG4gICAgc3RlcCA9IG9wdC5zdGVwO1xuICB9IGVsc2UgaWYgKG9wdC5zdGVwcykge1xuICAgIC8vIGlmIHByb3ZpZGVkLCBsaW1pdCBjaG9pY2UgdG8gYWNjZXB0YWJsZSBzdGVwIHNpemVzXG4gICAgc3RlcCA9IG9wdC5zdGVwc1tNYXRoLm1pbihcbiAgICAgIG9wdC5zdGVwcy5sZW5ndGggLSAxLFxuICAgICAgYmlzZWN0KG9wdC5zdGVwcywgc3Bhbi9tYXhiLCAwLCBvcHQuc3RlcHMubGVuZ3RoKVxuICAgICldO1xuICB9IGVsc2Uge1xuICAgIC8vIGVsc2UgdXNlIHNwYW4gdG8gZGV0ZXJtaW5lIHN0ZXAgc2l6ZVxuICAgIGxldmVsID0gTWF0aC5jZWlsKE1hdGgubG9nKG1heGIpIC8gbG9nYik7XG4gICAgbWluc3RlcCA9IG9wdC5taW5zdGVwIHx8IDA7XG4gICAgc3RlcCA9IE1hdGgubWF4KFxuICAgICAgbWluc3RlcCxcbiAgICAgIE1hdGgucG93KGJhc2UsIE1hdGgucm91bmQoTWF0aC5sb2coc3BhbikgLyBsb2diKSAtIGxldmVsKVxuICAgICk7XG4gICAgXG4gICAgLy8gaW5jcmVhc2Ugc3RlcCBzaXplIGlmIHRvbyBtYW55IGJpbnNcbiAgICBkbyB7IHN0ZXAgKj0gYmFzZTsgfSB3aGlsZSAoTWF0aC5jZWlsKHNwYW4vc3RlcCkgPiBtYXhiKTtcblxuICAgIC8vIGRlY3JlYXNlIHN0ZXAgc2l6ZSBpZiBhbGxvd2VkXG4gICAgZm9yIChpPTA7IGk8ZGl2Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gc3RlcCAvIGRpdltpXTtcbiAgICAgIGlmICh2ID49IG1pbnN0ZXAgJiYgc3BhbiAvIHYgPD0gbWF4Yikgc3RlcCA9IHY7XG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHByZWNpc2lvbiwgbWluIGFuZCBtYXhcbiAgdiA9IE1hdGgubG9nKHN0ZXApO1xuICBwcmVjaXNpb24gPSB2ID49IDAgPyAwIDogfn4oLXYgLyBsb2diKSArIDE7XG4gIGVwcyA9IE1hdGgucG93KGJhc2UsIC1wcmVjaXNpb24gLSAxKTtcbiAgbWluID0gTWF0aC5taW4obWluLCBNYXRoLmZsb29yKG1pbiAvIHN0ZXAgKyBlcHMpICogc3RlcCk7XG4gIG1heCA9IE1hdGguY2VpbChtYXggLyBzdGVwKSAqIHN0ZXA7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogbWluLFxuICAgIHN0b3A6ICBtYXgsXG4gICAgc3RlcDogIHN0ZXAsXG4gICAgdW5pdDogIHtwcmVjaXNpb246IHByZWNpc2lvbn0sXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufVxuXG5mdW5jdGlvbiBiaXNlY3QoYSwgeCwgbG8sIGhpKSB7XG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgaWYgKHV0aWwuY21wKGFbbWlkXSwgeCkgPCAwKSB7IGxvID0gbWlkICsgMTsgfVxuICAgIGVsc2UgeyBoaSA9IG1pZDsgfVxuICB9XG4gIHJldHVybiBsbztcbn1cblxuZnVuY3Rpb24gdmFsdWUodikge1xuICByZXR1cm4gdGhpcy5zdGVwICogTWF0aC5mbG9vcih2IC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGluZGV4KHYpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoKHYgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBkYXRlX3ZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMudW5pdC5kYXRlKHZhbHVlLmNhbGwodGhpcywgdikpO1xufVxuXG5mdW5jdGlvbiBkYXRlX2luZGV4KHYpIHtcbiAgcmV0dXJuIGluZGV4LmNhbGwodGhpcywgdGhpcy51bml0LnVuaXQodikpO1xufVxuXG5iaW5zLmRhdGUgPSBmdW5jdGlvbihvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGRhdGUgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGZpbmQgdGltZSBzdGVwLCB0aGVuIGJpblxuICB2YXIgZG1pbiA9IG9wdC5taW4sXG4gICAgICBkbWF4ID0gb3B0Lm1heCxcbiAgICAgIG1heGIgPSBvcHQubWF4YmlucyB8fCAyMCxcbiAgICAgIG1pbmIgPSBvcHQubWluYmlucyB8fCA0LFxuICAgICAgc3BhbiA9ICgrZG1heCkgLSAoK2RtaW4pLFxuICAgICAgdW5pdCA9IG9wdC51bml0ID8gdW5pdHNbb3B0LnVuaXRdIDogdW5pdHMuZmluZChzcGFuLCBtaW5iLCBtYXhiKSxcbiAgICAgIHNwZWMgPSBiaW5zKHtcbiAgICAgICAgbWluOiAgICAgdW5pdC5taW4gIT0gbnVsbCA/IHVuaXQubWluIDogdW5pdC51bml0KGRtaW4pLFxuICAgICAgICBtYXg6ICAgICB1bml0Lm1heCAhPSBudWxsID8gdW5pdC5tYXggOiB1bml0LnVuaXQoZG1heCksXG4gICAgICAgIG1heGJpbnM6IG1heGIsXG4gICAgICAgIG1pbnN0ZXA6IHVuaXQubWluc3RlcCxcbiAgICAgICAgc3RlcHM6ICAgdW5pdC5zdGVwXG4gICAgICB9KTtcblxuICBzcGVjLnVuaXQgPSB1bml0O1xuICBzcGVjLmluZGV4ID0gZGF0ZV9pbmRleDtcbiAgaWYgKCFvcHQucmF3KSBzcGVjLnZhbHVlID0gZGF0ZV92YWx1ZTtcbiAgcmV0dXJuIHNwZWM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbnM7XG4iLCJ2YXIgc3RhdHMgPSByZXF1aXJlKCcuLi9zdGF0cycpO1xudmFyIHR5cGUgPSByZXF1aXJlKCcuLi9pbXBvcnQvdHlwZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgZ2VuID0gcmVxdWlyZSgnLi4vZ2VuZXJhdGUnKTtcbnZhciBiaW5zID0gcmVxdWlyZSgnLi9iaW5zJyk7XG5cbnZhciBxdHlwZSA9IHtcbiAgJ2ludGVnZXInOiAxLFxuICAnbnVtYmVyJzogMSxcbiAgJ2RhdGUnOiAxXG59O1xuXG5mdW5jdGlvbiAkYmluKHZhbHVlcywgZiwgb3B0KSB7XG4gIG9wdCA9IG9wdGlvbnModmFsdWVzLCBmLCBvcHQpO1xuICB2YXIgYiA9IHNwZWMob3B0KTtcbiAgcmV0dXJuICFiID8gKG9wdC5hY2Nlc3NvciB8fCB1dGlsLmlkZW50aXR5KSA6XG4gICAgdXRpbC4kZnVuYygnYmluJywgYi51bml0LnVuaXQgP1xuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4gYi52YWx1ZShiLnVuaXQudW5pdCh4KSk7IH0gOlxuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4gYi52YWx1ZSh4KTsgfVxuICAgICkob3B0LmFjY2Vzc29yKTtcbn1cblxuZnVuY3Rpb24gaGlzdG9ncmFtKHZhbHVlcywgZiwgb3B0KSB7XG4gIG9wdCA9IG9wdGlvbnModmFsdWVzLCBmLCBvcHQpO1xuICB2YXIgYiA9IHNwZWMob3B0KTtcbiAgcmV0dXJuIGIgP1xuICAgIG51bWVyaWNhbCh2YWx1ZXMsIG9wdC5hY2Nlc3NvciwgYikgOlxuICAgIGNhdGVnb3JpY2FsKHZhbHVlcywgb3B0LmFjY2Vzc29yLCBvcHQgJiYgb3B0LnNvcnQpO1xufVxuXG5mdW5jdGlvbiBzcGVjKG9wdCkge1xuICB2YXIgdCA9IG9wdC50eXBlLCBiID0gbnVsbDtcbiAgaWYgKHQgPT0gbnVsbCB8fCBxdHlwZVt0XSkge1xuICAgIGlmICh0ID09PSAnaW50ZWdlcicgJiYgb3B0Lm1pbnN0ZXAgPT0gbnVsbCkgb3B0Lm1pbnN0ZXAgPSAxO1xuICAgIGIgPSAodCA9PT0gJ2RhdGUnKSA/IGJpbnMuZGF0ZShvcHQpIDogYmlucyhvcHQpO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG5mdW5jdGlvbiBvcHRpb25zKCkge1xuICB2YXIgYSA9IGFyZ3VtZW50cyxcbiAgICAgIGkgPSAwLFxuICAgICAgdmFsdWVzID0gdXRpbC5pc0FycmF5KGFbaV0pID8gYVtpKytdIDogbnVsbCxcbiAgICAgIGYgPSB1dGlsLmlzRnVuY3Rpb24oYVtpXSkgfHwgdXRpbC5pc1N0cmluZyhhW2ldKSA/IHV0aWwuJChhW2krK10pIDogbnVsbCxcbiAgICAgIG9wdCA9IHV0aWwuZXh0ZW5kKHt9LCBhW2ldKTtcbiAgXG4gIGlmICh2YWx1ZXMpIHtcbiAgICBvcHQudHlwZSA9IG9wdC50eXBlIHx8IHR5cGUodmFsdWVzLCBmKTtcbiAgICBpZiAocXR5cGVbb3B0LnR5cGVdKSB7XG4gICAgICB2YXIgZXh0ID0gc3RhdHMuZXh0ZW50KHZhbHVlcywgZik7XG4gICAgICBvcHQgPSB1dGlsLmV4dGVuZCh7bWluOiBleHRbMF0sIG1heDogZXh0WzFdfSwgb3B0KTtcbiAgICB9XG4gIH1cbiAgaWYgKGYpIHsgb3B0LmFjY2Vzc29yID0gZjsgfVxuICByZXR1cm4gb3B0O1xufVxuXG5mdW5jdGlvbiBudW1lcmljYWwodmFsdWVzLCBmLCBiKSB7XG4gIHZhciBoID0gZ2VuLnJhbmdlKGIuc3RhcnQsIGIuc3RvcCArIGIuc3RlcC8yLCBiLnN0ZXApXG4gICAgLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiB7dmFsdWU6IGIudmFsdWUodiksIGNvdW50OiAwfTsgfSk7XG5cbiAgZm9yICh2YXIgaT0wLCB2LCBqOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGogPSBiLmluZGV4KHYpO1xuICAgICAgaWYgKGogPCAwIHx8IGogPj0gaC5sZW5ndGggfHwgIWlzRmluaXRlKGopKSBjb250aW51ZTtcbiAgICAgIGhbal0uY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgaC5iaW5zID0gYjtcbiAgcmV0dXJuIGg7XG59XG5cbmZ1bmN0aW9uIGNhdGVnb3JpY2FsKHZhbHVlcywgZiwgc29ydCkge1xuICB2YXIgdSA9IHN0YXRzLnVuaXF1ZSh2YWx1ZXMsIGYpLFxuICAgICAgYyA9IHN0YXRzLmNvdW50Lm1hcCh2YWx1ZXMsIGYpO1xuICByZXR1cm4gdS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4ge3ZhbHVlOiBrLCBjb3VudDogY1trXX07IH0pXG4gICAgLnNvcnQodXRpbC5jb21wYXJhdG9yKHNvcnQgPyAnLWNvdW50JyA6ICcrdmFsdWUnKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAkYmluOiAkYmluLFxuICBoaXN0b2dyYW06IGhpc3RvZ3JhbVxufTsiLCJ2YXIgZ2VuID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuZ2VuLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbCwgbikge1xuICB2YXIgYSA9IEFycmF5KG4pLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIGFbaV0gPSB2YWw7XG4gIHJldHVybiBhO1xufTtcblxuZ2VuLnplcm9zID0gZnVuY3Rpb24obikge1xuICByZXR1cm4gZ2VuLnJlcGVhdCgwLCBuKTtcbn07XG5cbmdlbi5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgIHN0ZXAgPSAxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoKHN0b3AgLSBzdGFydCkgLyBzdGVwID09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIHJhbmdlJyk7XG4gIHZhciByYW5nZSA9IFtdLCBpID0gLTEsIGo7XG4gIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIGVsc2Ugd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA8IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIHJldHVybiByYW5nZTtcbn07XG5cbmdlbi5yYW5kb20gPSB7fTtcblxuZ2VuLnJhbmRvbS51bmlmb3JtID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluID09PSB1bmRlZmluZWQgPyAxIDogbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1pbiArIGQgKiBNYXRoLnJhbmRvbSgpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7IHJldHVybiBnZW4uemVyb3MobikubWFwKGYpOyB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIGIgPSBhO1xuICAgIGEgPSAwO1xuICB9XG4gIHZhciBkID0gYiAtIGE7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKGQgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikgeyByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTsgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLm5vcm1hbCA9IGZ1bmN0aW9uKG1lYW4sIHN0ZGV2KSB7XG4gIG1lYW4gPSBtZWFuIHx8IDA7XG4gIHN0ZGV2ID0gc3RkZXYgfHwgMTtcbiAgdmFyIG5leHQ7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHggPSAwLCB5ID0gMCwgcmRzLCBjO1xuICAgIGlmIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHggPSBuZXh0O1xuICAgICAgbmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBkbyB7XG4gICAgICB4ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICB5ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICByZHMgPSB4KnggKyB5Knk7XG4gICAgfSB3aGlsZSAocmRzID09PSAwIHx8IHJkcyA+IDEpO1xuICAgIGMgPSBNYXRoLnNxcnQoLTIqTWF0aC5sb2cocmRzKS9yZHMpOyAvLyBCb3gtTXVsbGVyIHRyYW5zZm9ybVxuICAgIG5leHQgPSBtZWFuICsgeSpjKnN0ZGV2O1xuICAgIHJldHVybiBtZWFuICsgeCpjKnN0ZGV2O1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7IHJldHVybiBnZW4uemVyb3MobikubWFwKGYpOyB9O1xuICByZXR1cm4gZjtcbn07IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG52YXIgZDMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5kMyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuZDMgOiBudWxsKTtcblxuZnVuY3Rpb24gZHN2KGRhdGEsIGZvcm1hdCkge1xuICBpZiAoZGF0YSkge1xuICAgIHZhciBoID0gZm9ybWF0LmhlYWRlcjtcbiAgICBkYXRhID0gKGggPyBoLmpvaW4oZm9ybWF0LmRlbGltaXRlcikgKyAnXFxuJyA6ICcnKSArIGRhdGE7XG4gIH1cbiAgcmV0dXJuIGQzLmRzdihmb3JtYXQuZGVsaW1pdGVyKS5wYXJzZShkYXRhKTtcbn1cblxuZHN2LmRlbGltaXRlciA9IGZ1bmN0aW9uKGRlbGltKSB7XG4gIHZhciBmbXQgPSB7ZGVsaW1pdGVyOiBkZWxpbX07XG4gIHJldHVybiBmdW5jdGlvbihkYXRhLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gZHN2KGRhdGEsIGZvcm1hdCA/IHV0aWwuZXh0ZW5kKGZvcm1hdCwgZm10KSA6IGZtdCk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRzdjsiLCJ2YXIgZHN2ID0gcmVxdWlyZSgnLi9kc3YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGpzb246IHJlcXVpcmUoJy4vanNvbicpLFxuICB0b3BvanNvbjogcmVxdWlyZSgnLi90b3BvanNvbicpLFxuICB0cmVlanNvbjogcmVxdWlyZSgnLi90cmVlanNvbicpLFxuICBkc3Y6IGRzdixcbiAgY3N2OiBkc3YuZGVsaW1pdGVyKCcsJyksXG4gIHRzdjogZHN2LmRlbGltaXRlcignXFx0Jylcbn07IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciBkID0gdXRpbC5pc09iamVjdChkYXRhKSAmJiAhdXRpbC5pc0J1ZmZlcihkYXRhKSA/XG4gICAgZGF0YSA6IEpTT04ucGFyc2UoZGF0YSk7XG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LnByb3BlcnR5KSB7XG4gICAgZCA9IHV0aWwuYWNjZXNzb3IoZm9ybWF0LnByb3BlcnR5KShkKTtcbiAgfVxuICByZXR1cm4gZDtcbn07XG4iLCJ2YXIganNvbiA9IHJlcXVpcmUoJy4vanNvbicpO1xuXG52YXIgcmVhZGVyID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciB0b3BvanNvbiA9IHJlYWRlci50b3BvanNvbjtcbiAgaWYgKHRvcG9qc29uID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ1RvcG9KU09OIGxpYnJhcnkgbm90IGxvYWRlZC4nKTsgfVxuXG4gIHZhciB0ID0ganNvbihkYXRhLCBmb3JtYXQpLCBvYmo7XG5cbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQuZmVhdHVyZSkge1xuICAgIGlmICgob2JqID0gdC5vYmplY3RzW2Zvcm1hdC5mZWF0dXJlXSkpIHtcbiAgICAgIHJldHVybiB0b3BvanNvbi5mZWF0dXJlKHQsIG9iaikuZmVhdHVyZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIFRvcG9KU09OIG9iamVjdDogJyArIGZvcm1hdC5mZWF0dXJlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybWF0ICYmIGZvcm1hdC5tZXNoKSB7XG4gICAgaWYgKChvYmogPSB0Lm9iamVjdHNbZm9ybWF0Lm1lc2hdKSkge1xuICAgICAgcmV0dXJuIFt0b3BvanNvbi5tZXNoKHQsIHQub2JqZWN0c1tmb3JtYXQubWVzaF0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVG9wb0pTT04gb2JqZWN0OiAnICsgZm9ybWF0Lm1lc2gpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcignTWlzc2luZyBUb3BvSlNPTiBmZWF0dXJlIG9yIG1lc2ggcGFyYW1ldGVyLicpO1xuICB9XG59O1xuXG5yZWFkZXIudG9wb2pzb24gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy50b3BvanNvbiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwudG9wb2pzb24gOiBudWxsKTtcbm1vZHVsZS5leHBvcnRzID0gcmVhZGVyOyIsInZhciBqc29uID0gcmVxdWlyZSgnLi9qc29uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIGRhdGEgPSBqc29uKGRhdGEsIGZvcm1hdCk7XG4gIHJldHVybiB0b1RhYmxlKGRhdGEsIChmb3JtYXQgJiYgZm9ybWF0LmNoaWxkcmVuKSk7XG59O1xuXG5mdW5jdGlvbiB0b1RhYmxlKHJvb3QsIGNoaWxkcmVuRmllbGQpIHtcbiAgY2hpbGRyZW5GaWVsZCA9IGNoaWxkcmVuRmllbGQgfHwgJ2NoaWxkcmVuJztcbiAgdmFyIHRhYmxlID0gW107XG4gIFxuICBmdW5jdGlvbiB2aXNpdChub2RlKSB7XG4gICAgdGFibGUucHVzaChub2RlKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlW2NoaWxkcmVuRmllbGRdO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZpc2l0KGNoaWxkcmVuW2ldLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIHZpc2l0KHJvb3QsIG51bGwpO1xuICByZXR1cm4gKHRhYmxlLnJvb3QgPSByb290LCB0YWJsZSk7XG59IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbi8vIE1hdGNoZXMgYWJzb2x1dGUgVVJMcyB3aXRoIG9wdGlvbmFsIHByb3RvY29sXG4vLyAgIGh0dHBzOi8vLi4uICAgIGZpbGU6Ly8uLi4gICAgLy8uLi5cbnZhciBwcm90b2NvbF9yZSA9IC9eKFtBLVphLXpdKzopP1xcL1xcLy87XG5cbi8vIFNwZWNpYWwgdHJlYXRtZW50IGluIG5vZGUuanMgZm9yIHRoZSBmaWxlOiBwcm90b2NvbFxudmFyIGZpbGVQcm90b2NvbCA9ICdmaWxlOi8vJztcblxuLy8gVmFsaWRhdGUgYW5kIGNsZWFudXAgVVJMIHRvIGVuc3VyZSB0aGF0IGl0IGlzIGFsbG93ZWQgdG8gYmUgYWNjZXNzZWRcbi8vIFJldHVybnMgY2xlYW5lZCB1cCBVUkwsIG9yIGZhbHNlIGlmIGFjY2VzcyBpcyBub3QgYWxsb3dlZFxuZnVuY3Rpb24gc2FuaXRpemVVcmwob3B0KSB7XG4gIHZhciB1cmwgPSBvcHQudXJsO1xuICBpZiAoIXVybCAmJiBvcHQuZmlsZSkgeyByZXR1cm4gZmlsZVByb3RvY29sICsgb3B0LmZpbGU7IH1cblxuICAvLyBJbiBjYXNlIHRoaXMgaXMgYSByZWxhdGl2ZSB1cmwgKGhhcyBubyBob3N0KSwgcHJlcGVuZCBvcHQuYmFzZVVSTFxuICBpZiAob3B0LmJhc2VVUkwgJiYgIXByb3RvY29sX3JlLnRlc3QodXJsKSkge1xuICAgIGlmICghdXRpbC5zdGFydHNXaXRoKHVybCwgJy8nKSAmJiBvcHQuYmFzZVVSTFtvcHQuYmFzZVVSTC5sZW5ndGgtMV0gIT09ICcvJykge1xuICAgICAgdXJsID0gJy8nICsgdXJsOyAvLyBFbnN1cmUgdGhhdCB0aGVyZSBpcyBhIHNsYXNoIGJldHdlZW4gdGhlIGJhc2VVUkwgKGUuZy4gaG9zdG5hbWUpIGFuZCB1cmxcbiAgICB9XG4gICAgdXJsID0gb3B0LmJhc2VVUkwgKyB1cmw7XG4gIH1cbiAgLy8gcmVsYXRpdmUgcHJvdG9jb2wsIHN0YXJ0cyB3aXRoICcvLydcbiAgaWYgKHV0aWwuaXNOb2RlICYmIHV0aWwuc3RhcnRzV2l0aCh1cmwsICcvLycpKSB7XG4gICAgdXJsID0gKG9wdC5kZWZhdWx0UHJvdG9jb2wgfHwgJ2h0dHAnKSArICc6JyArIHVybDtcbiAgfVxuICAvLyBJZiBvcHQuZG9tYWluV2hpdGVMaXN0IGlzIHNldCwgb25seSBhbGxvd3MgdXJsLCB3aG9zZSBob3N0bmFtZVxuICAvLyAqIElzIHRoZSBzYW1lIGFzIHRoZSBvcmlnaW4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSlcbiAgLy8gKiBFcXVhbHMgb25lIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHdoaXRlbGlzdFxuICAvLyAqIElzIGEgcHJvcGVyIHN1YmRvbWFpbiBvZiBvbmUgb2YgdGhlIHZhbHVlcyBpbiB0aGUgd2hpdGVsaXN0XG4gIGlmIChvcHQuZG9tYWluV2hpdGVMaXN0KSB7XG4gICAgdmFyIGRvbWFpbiwgb3JpZ2luO1xuICAgIGlmICh1dGlsLmlzTm9kZSkge1xuICAgICAgLy8gcmVsYXRpdmUgcHJvdG9jb2wgaXMgYnJva2VuOiBodHRwczovL2dpdGh1Yi5jb20vZGVmdW5jdHpvbWJpZS9ub2RlLXVybC9pc3N1ZXMvNVxuICAgICAgdmFyIHBhcnRzID0gcmVxdWlyZSgndXJsJykucGFyc2UodXJsKTtcbiAgICAgIGRvbWFpbiA9IHBhcnRzLmhvc3RuYW1lO1xuICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICAvLyBGcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzM2NTEzL2hvdy1kby1pLXBhcnNlLWEtdXJsLWludG8taG9zdG5hbWUtYW5kLXBhdGgtaW4tamF2YXNjcmlwdFxuICAgICAgLy8gSUUgZG9lc24ndCBwb3B1bGF0ZSBhbGwgbGluayBwcm9wZXJ0aWVzIHdoZW4gc2V0dGluZyAuaHJlZiB3aXRoIGEgcmVsYXRpdmUgVVJMLFxuICAgICAgLy8gaG93ZXZlciAuaHJlZiB3aWxsIHJldHVybiBhbiBhYnNvbHV0ZSBVUkwgd2hpY2ggdGhlbiBjYW4gYmUgdXNlZCBvbiBpdHNlbGZcbiAgICAgIC8vIHRvIHBvcHVsYXRlIHRoZXNlIGFkZGl0aW9uYWwgZmllbGRzLlxuICAgICAgaWYgKGEuaG9zdCA9PT0gJycpIHtcbiAgICAgICAgYS5ocmVmID0gYS5ocmVmO1xuICAgICAgfVxuICAgICAgZG9tYWluID0gYS5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgb3JpZ2luID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIH1cblxuICAgIGlmIChvcmlnaW4gIT09IGRvbWFpbikge1xuICAgICAgdmFyIHdoaXRlTGlzdGVkID0gb3B0LmRvbWFpbldoaXRlTGlzdC5zb21lKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIGlkeCA9IGRvbWFpbi5sZW5ndGggLSBkLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGQgPT09IGRvbWFpbiB8fFxuICAgICAgICAgIChpZHggPiAxICYmIGRvbWFpbltpZHgtMV0gPT09ICcuJyAmJiBkb21haW4ubGFzdEluZGV4T2YoZCkgPT09IGlkeCk7XG4gICAgICB9KTtcbiAgICAgIGlmICghd2hpdGVMaXN0ZWQpIHtcbiAgICAgICAgdGhyb3cgJ1VSTCBpcyBub3Qgd2hpdGVsaXN0ZWQ6ICcgKyB1cmw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbmZ1bmN0aW9uIGxvYWQob3B0LCBjYWxsYmFjaykge1xuICB2YXIgZXJyb3IgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlKSB7IHRocm93IGU7IH0sIHVybDtcblxuICB0cnkge1xuICAgIHVybCA9IGxvYWQuc2FuaXRpemVVcmwob3B0KTsgLy8gZW5hYmxlIG92ZXJyaWRlXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVycm9yKGVycik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICBlcnJvcignSW52YWxpZCBVUkw6ICcgKyB1cmwpO1xuICB9IGVsc2UgaWYgKCF1dGlsLmlzTm9kZSkge1xuICAgIC8vIGluIGJyb3dzZXIsIHVzZSB4aHJcbiAgICByZXR1cm4geGhyKHVybCwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHV0aWwuc3RhcnRzV2l0aCh1cmwsIGZpbGVQcm90b2NvbCkpIHtcbiAgICAvLyBpbiBub2RlLmpzLCBpZiB1cmwgc3RhcnRzIHdpdGggJ2ZpbGU6Ly8nLCBzdHJpcCBpdCBhbmQgbG9hZCBmcm9tIGZpbGVcbiAgICByZXR1cm4gZmlsZSh1cmwuc2xpY2UoZmlsZVByb3RvY29sLmxlbmd0aCksIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmICh1cmwuaW5kZXhPZignOi8vJykgPCAwKSB7IC8vIFRPRE8gYmV0dGVyIHByb3RvY29sIGNoZWNrP1xuICAgIC8vIGlmIG5vZGUuanMsIGlmIG5vIHByb3RvY29sIGFzc3VtZSBmaWxlXG4gICAgcmV0dXJuIGZpbGUodXJsLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgLy8gZm9yIHJlZ3VsYXIgVVJMcyBpbiBub2RlLmpzXG4gICAgcmV0dXJuIGh0dHAodXJsLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24geGhySGFzUmVzcG9uc2UocmVxdWVzdCkge1xuICB2YXIgdHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuICByZXR1cm4gdHlwZSAmJiB0eXBlICE9PSAndGV4dCcgP1xuICAgIHJlcXVlc3QucmVzcG9uc2UgOiAvLyBudWxsIG9uIGVycm9yXG4gICAgcmVxdWVzdC5yZXNwb25zZVRleHQ7IC8vICcnIG9uIGVycm9yXG59XG5cbmZ1bmN0aW9uIHhocih1cmwsIGNhbGxiYWNrKSB7XG4gIHZhciBhc3luYyA9ICEhY2FsbGJhY2s7XG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIC8vIElmIElFIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgdXNlIFhEb21haW5SZXF1ZXN0IChjb3BpZWQgZnJvbSBkMy54aHIpXG4gIGlmICh0aGlzLlhEb21haW5SZXF1ZXN0ICYmXG4gICAgICAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAvXihodHRwKHMpPzopP1xcL1xcLy8udGVzdCh1cmwpKSByZXF1ZXN0ID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uZCgpIHtcbiAgICB2YXIgc3RhdHVzID0gcmVxdWVzdC5zdGF0dXM7XG4gICAgaWYgKCFzdGF0dXMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkgfHwgc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVxdWVzdCwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFzeW5jKSB7XG4gICAgaWYgKCdvbmxvYWQnIGluIHJlcXVlc3QpIHtcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gcmVxdWVzdC5vbmVycm9yID0gcmVzcG9uZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA+IDMpIHJlc3BvbmQoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIFxuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgYXN5bmMpO1xuICByZXF1ZXN0LnNlbmQoKTtcbiAgXG4gIGlmICghYXN5bmMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkpIHtcbiAgICByZXR1cm4gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmlsZShmaWxlbmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4Jyk7XG4gIH1cbiAgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZShmaWxlbmFtZSwgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBodHRwKHVybCwgY2FsbGJhY2spIHtcbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiByZXF1aXJlKCdzeW5jLXJlcXVlc3QnKSgnR0VUJywgdXJsKS5nZXRCb2R5KCk7XG4gIH1cbiAgcmVxdWlyZSgncmVxdWVzdCcpKHVybCwgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IGVycm9yIHx8XG4gICAgICAgICdMb2FkIGZhaWxlZCB3aXRoIHJlc3BvbnNlIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyAnLic7XG4gICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgfVxuICB9KTtcbn1cblxubG9hZC5zYW5pdGl6ZVVybCA9IHNhbml0aXplVXJsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWQ7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5mdW5jdGlvbiByZWFkKGRhdGEsIGZvcm1hdCkge1xuICB2YXIgdHlwZSA9IChmb3JtYXQgJiYgZm9ybWF0LnR5cGUpIHx8ICdqc29uJztcbiAgZGF0YSA9IGZvcm1hdHNbdHlwZV0oZGF0YSwgZm9ybWF0KTtcbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQucGFyc2UpIHBhcnNlKGRhdGEsIGZvcm1hdC5wYXJzZSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBwYXJzZShkYXRhLCB0eXBlcykge1xuICB2YXIgY29scywgcGFyc2VycywgZCwgaSwgaiwgY2xlbiwgbGVuID0gZGF0YS5sZW5ndGg7XG5cbiAgdHlwZXMgPSAodHlwZXM9PT0nYXV0bycpID8gdHlwZS5pbmZlckFsbChkYXRhKSA6IHV0aWwuZHVwbGljYXRlKHR5cGVzKTtcbiAgY29scyA9IHV0aWwua2V5cyh0eXBlcyk7XG4gIHBhcnNlcnMgPSBjb2xzLm1hcChmdW5jdGlvbihjKSB7IHJldHVybiB0eXBlLnBhcnNlcnNbdHlwZXNbY11dOyB9KTtcblxuICBmb3IgKGk9MCwgY2xlbj1jb2xzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIGQgPSBkYXRhW2ldO1xuICAgIGZvciAoaj0wOyBqPGNsZW47ICsraikge1xuICAgICAgZFtjb2xzW2pdXSA9IHBhcnNlcnNbal0oZFtjb2xzW2pdXSk7XG4gICAgfVxuICB9XG4gIHR5cGUuYW5ub3RhdGlvbihkYXRhLCB0eXBlcyk7XG59XG5cbnJlYWQuZm9ybWF0cyA9IGZvcm1hdHM7XG5tb2R1bGUuZXhwb3J0cyA9IHJlYWQ7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBsb2FkID0gcmVxdWlyZSgnLi9sb2FkJyk7XG52YXIgcmVhZCA9IHJlcXVpcmUoJy4vcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxcbiAgLmtleXMocmVhZC5mb3JtYXRzKVxuICAucmVkdWNlKGZ1bmN0aW9uKG91dCwgdHlwZSkge1xuICAgIG91dFt0eXBlXSA9IGZ1bmN0aW9uKG9wdCwgZm9ybWF0LCBjYWxsYmFjaykge1xuICAgICAgLy8gcHJvY2VzcyBhcmd1bWVudHNcbiAgICAgIGlmICh1dGlsLmlzU3RyaW5nKG9wdCkpIHsgb3B0ID0ge3VybDogb3B0fTsgfVxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdXRpbC5pc0Z1bmN0aW9uKGZvcm1hdCkpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBmb3JtYXQ7XG4gICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHVwIHJlYWQgZm9ybWF0XG4gICAgICBmb3JtYXQgPSB1dGlsLmV4dGVuZCh7cGFyc2U6ICdhdXRvJ30sIGZvcm1hdCk7XG4gICAgICBmb3JtYXQudHlwZSA9IHR5cGU7XG5cbiAgICAgIC8vIGxvYWQgZGF0YVxuICAgICAgdmFyIGRhdGEgPSBsb2FkKG9wdCwgY2FsbGJhY2sgPyBmdW5jdGlvbihlcnJvciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyb3IpIHsgY2FsbGJhY2soZXJyb3IsIG51bGwpOyByZXR1cm47IH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBkYXRhIGxvYWRlZCwgbm93IHBhcnNlIGl0IChhc3luYylcbiAgICAgICAgICBkYXRhID0gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICB9IDogdW5kZWZpbmVkKTtcbiAgICAgIFxuICAgICAgLy8gZGF0YSBsb2FkZWQsIG5vdyBwYXJzZSBpdCAoc3luYylcbiAgICAgIGlmIChkYXRhKSByZXR1cm4gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgIH07XG4gICAgcmV0dXJuIG91dDtcbiAgfSwge30pO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciBUWVBFUyA9ICdfX3R5cGVzX18nO1xuXG52YXIgUEFSU0VSUyA9IHtcbiAgYm9vbGVhbjogdXRpbC5ib29sZWFuLFxuICBpbnRlZ2VyOiB1dGlsLm51bWJlcixcbiAgbnVtYmVyOiAgdXRpbC5udW1iZXIsXG4gIGRhdGU6ICAgIHV0aWwuZGF0ZSxcbiAgc3RyaW5nOiAgZnVuY3Rpb24oeCkgeyByZXR1cm4geD09PScnID8gbnVsbCA6IHg7IH1cbn07XG5cbnZhciBURVNUUyA9IHtcbiAgYm9vbGVhbjogZnVuY3Rpb24oeCkgeyByZXR1cm4geD09PSd0cnVlJyB8fCB4PT09J2ZhbHNlJyB8fCB1dGlsLmlzQm9vbGVhbih4KTsgfSxcbiAgaW50ZWdlcjogZnVuY3Rpb24oeCkgeyByZXR1cm4gVEVTVFMubnVtYmVyKHgpICYmICh4PSt4KSA9PT0gfn54OyB9LFxuICBudW1iZXI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICFpc05hTigreCkgJiYgIXV0aWwuaXNEYXRlKHgpOyB9LFxuICBkYXRlOiBmdW5jdGlvbih4KSB7IHJldHVybiAhaXNOYU4oRGF0ZS5wYXJzZSh4KSk7IH1cbn07XG5cbmZ1bmN0aW9uIGFubm90YXRpb24oZGF0YSwgdHlwZXMpIHtcbiAgaWYgKCF0eXBlcykgcmV0dXJuIGRhdGEgJiYgZGF0YVtUWVBFU10gfHwgbnVsbDtcbiAgZGF0YVtUWVBFU10gPSB0eXBlcztcbn1cblxuZnVuY3Rpb24gdHlwZSh2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHYsIGksIG47XG5cbiAgLy8gaWYgZGF0YSBhcnJheSBoYXMgdHlwZSBhbm5vdGF0aW9ucywgdXNlIHRoZW1cbiAgaWYgKHZhbHVlc1tUWVBFU10pIHtcbiAgICB2ID0gZih2YWx1ZXNbVFlQRVNdKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2KSkgcmV0dXJuIHY7XG4gIH1cblxuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyAhdXRpbC5pc1ZhbGlkKHYpICYmIGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gIH1cblxuICByZXR1cm4gdXRpbC5pc0RhdGUodikgPyAnZGF0ZScgOlxuICAgIHV0aWwuaXNOdW1iZXIodikgICAgPyAnbnVtYmVyJyA6XG4gICAgdXRpbC5pc0Jvb2xlYW4odikgICA/ICdib29sZWFuJyA6XG4gICAgdXRpbC5pc1N0cmluZyh2KSAgICA/ICdzdHJpbmcnIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gdHlwZUFsbChkYXRhLCBmaWVsZHMpIHtcbiAgaWYgKCFkYXRhLmxlbmd0aCkgcmV0dXJuO1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICByZXR1cm4gZmllbGRzLnJlZHVjZShmdW5jdGlvbih0eXBlcywgZikge1xuICAgIHJldHVybiAodHlwZXNbZl0gPSB0eXBlKGRhdGEsIGYpLCB0eXBlcyk7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gaW5mZXIodmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBpLCBqLCB2O1xuXG4gIC8vIHR5cGVzIHRvIHRlc3QgZm9yLCBpbiBwcmVjZWRlbmNlIG9yZGVyXG4gIHZhciB0eXBlcyA9IFsnYm9vbGVhbicsICdpbnRlZ2VyJywgJ251bWJlcicsICdkYXRlJ107XG5cbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gZ2V0IG5leHQgdmFsdWUgdG8gdGVzdFxuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIC8vIHRlc3QgdmFsdWUgYWdhaW5zdCByZW1haW5pbmcgdHlwZXNcbiAgICBmb3IgKGo9MDsgajx0eXBlcy5sZW5ndGg7ICsraikge1xuICAgICAgaWYgKHV0aWwuaXNWYWxpZCh2KSAmJiAhVEVTVFNbdHlwZXNbal1dKHYpKSB7XG4gICAgICAgIHR5cGVzLnNwbGljZShqLCAxKTtcbiAgICAgICAgaiAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZiBubyB0eXBlcyBsZWZ0LCByZXR1cm4gJ3N0cmluZydcbiAgICBpZiAodHlwZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJ3N0cmluZyc7XG4gIH1cblxuICByZXR1cm4gdHlwZXNbMF07XG59XG5cbmZ1bmN0aW9uIGluZmVyQWxsKGRhdGEsIGZpZWxkcykge1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICByZXR1cm4gZmllbGRzLnJlZHVjZShmdW5jdGlvbih0eXBlcywgZikge1xuICAgIHR5cGVzW2ZdID0gaW5mZXIoZGF0YSwgZik7XG4gICAgcmV0dXJuIHR5cGVzO1xuICB9LCB7fSk7XG59XG5cbnR5cGUuYW5ub3RhdGlvbiA9IGFubm90YXRpb247XG50eXBlLmFsbCA9IHR5cGVBbGw7XG50eXBlLmluZmVyID0gaW5mZXI7XG50eXBlLmluZmVyQWxsID0gaW5mZXJBbGw7XG50eXBlLnBhcnNlcnMgPSBQQVJTRVJTO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgdHlwZSA9IHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKTtcbnZhciBzdGF0cyA9IHJlcXVpcmUoJy4vc3RhdHMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUnKTtcblxudmFyIEZNVCA9IHtcbiAgJ2RhdGUnOiAgICAnfHRpbWU6XCIlbS8lZC8lWSAlSDolTTolU1wiJyxcbiAgJ251bWJlcic6ICAnfG51bWJlcjpcIi40ZlwiJyxcbiAgJ2ludGVnZXInOiAnfG51bWJlcjpcImRcIidcbn07XG5cbnZhciBQT1MgPSB7XG4gICdudW1iZXInOiAgJ2xlZnQnLFxuICAnaW50ZWdlcic6ICdsZWZ0J1xufTtcblxubW9kdWxlLmV4cG9ydHMudGFibGUgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcbiAgb3B0ID0gdXRpbC5leHRlbmQoe3NlcGFyYXRvcjonICcsIG1pbndpZHRoOiA4LCBtYXh3aWR0aDogMTV9LCBvcHQpO1xuICB2YXIgZmllbGRzID0gb3B0LmZpZWxkcyB8fCB1dGlsLmtleXMoZGF0YVswXSksXG4gICAgICB0eXBlcyA9IHR5cGUuYWxsKGRhdGEpO1xuXG4gIGlmIChvcHQuc3RhcnQgfHwgb3B0LmxpbWl0KSB7XG4gICAgdmFyIGEgPSBvcHQuc3RhcnQgfHwgMCxcbiAgICAgICAgYiA9IG9wdC5saW1pdCA/IGEgKyBvcHQubGltaXQgOiBkYXRhLmxlbmd0aDtcbiAgICBkYXRhID0gZGF0YS5zbGljZShhLCBiKTtcbiAgfVxuXG4gIC8vIGRldGVybWluZSBjaGFyIHdpZHRoIG9mIGZpZWxkc1xuICB2YXIgbGVucyA9IGZpZWxkcy5tYXAoZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBmb3JtYXQgPSBGTVRbdHlwZXNbbmFtZV1dIHx8ICcnLFxuICAgICAgICB0ID0gdGVtcGxhdGUoJ3t7JyArIG5hbWUgKyBmb3JtYXQgKyAnfX0nKSxcbiAgICAgICAgbCA9IHN0YXRzLm1heChkYXRhLCBmdW5jdGlvbih4KSB7IHJldHVybiB0KHgpLmxlbmd0aDsgfSk7XG4gICAgbCA9IE1hdGgubWF4KE1hdGgubWluKG5hbWUubGVuZ3RoLCBvcHQubWlud2lkdGgpLCBsKTtcbiAgICByZXR1cm4gb3B0Lm1heHdpZHRoID4gMCA/IE1hdGgubWluKGwsIG9wdC5tYXh3aWR0aCkgOiBsO1xuICB9KTtcblxuICAvLyBwcmludCBoZWFkZXIgcm93XG4gIHZhciBoZWFkID0gZmllbGRzLm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgcmV0dXJuIHV0aWwudHJ1bmNhdGUodXRpbC5wYWQobmFtZSwgbGVuc1tpXSwgJ2NlbnRlcicpLCBsZW5zW2ldKTtcbiAgfSkuam9pbihvcHQuc2VwYXJhdG9yKTtcblxuICAvLyBidWlsZCB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgZWFjaCByb3dcbiAgdmFyIHRtcGwgPSB0ZW1wbGF0ZShmaWVsZHMubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICByZXR1cm4gJ3t7JyArXG4gICAgICBuYW1lICtcbiAgICAgIChGTVRbdHlwZXNbbmFtZV1dIHx8ICcnKSArXG4gICAgICAoJ3xwYWQ6JyArIGxlbnNbaV0gKyAnLCcgKyAoUE9TW3R5cGVzW25hbWVdXSB8fCAncmlnaHQnKSkgK1xuICAgICAgKCd8dHJ1bmNhdGU6JyArIGxlbnNbaV0pICtcbiAgICAnfX0nO1xuICB9KS5qb2luKG9wdC5zZXBhcmF0b3IpKTtcblxuICAvLyBwcmludCB0YWJsZVxuICByZXR1cm4gaGVhZCArIFwiXFxuXCIgKyBkYXRhLm1hcCh0bXBsKS5qb2luKCdcXG4nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnN1bW1hcnkgPSBmdW5jdGlvbihzKSB7XG4gIHMgPSBzID8gcy5fX3N1bW1hcnlfXyA/IHMgOiBzdGF0cy5zdW1tYXJ5KHMpIDogdGhpcztcbiAgdmFyIHN0ciA9IFtdLCBpLCBuO1xuICBmb3IgKGk9MCwgbj1zLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBzdHIucHVzaCgnLS0gJyArIHNbaV0uZmllbGQgKyAnIC0tJyk7XG4gICAgaWYgKHNbaV0udHlwZSA9PT0gJ3N0cmluZycgfHwgc1tpXS5kaXN0aW5jdCA8IDEwKSB7XG4gICAgICBzdHIucHVzaChwcmludENhdGVnb3JpY2FsUHJvZmlsZShzW2ldKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ci5wdXNoKHByaW50UXVhbnRpdGF0aXZlUHJvZmlsZShzW2ldKSk7XG4gICAgfVxuICAgIHN0ci5wdXNoKCcnKTtcbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJ1xcbicpO1xufTtcblxuZnVuY3Rpb24gcHJpbnRRdWFudGl0YXRpdmVQcm9maWxlKHApIHtcbiAgcmV0dXJuIFtcbiAgICAndmFsaWQ6ICAgICcgKyBwLnZhbGlkLFxuICAgICdtaXNzaW5nOiAgJyArIHAubWlzc2luZyxcbiAgICAnZGlzdGluY3Q6ICcgKyBwLmRpc3RpbmN0LFxuICAgICdtaW46ICAgICAgJyArIHAubWluLFxuICAgICdtYXg6ICAgICAgJyArIHAubWF4LFxuICAgICdtZWRpYW46ICAgJyArIHAubWVkaWFuLFxuICAgICdtZWFuOiAgICAgJyArIHAubWVhbixcbiAgICAnc3RkZXY6ICAgICcgKyBwLnN0ZGV2LFxuICAgICdtb2Rlc2tldzogJyArIHAubW9kZXNrZXdcbiAgXS5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRDYXRlZ29yaWNhbFByb2ZpbGUocCkge1xuICB2YXIgbGlzdCA9IFtcbiAgICAndmFsaWQ6ICAgICcgKyBwLnZhbGlkLFxuICAgICdtaXNzaW5nOiAgJyArIHAubWlzc2luZyxcbiAgICAnZGlzdGluY3Q6ICcgKyBwLmRpc3RpbmN0LFxuICAgICd0b3AgdmFsdWVzOiAnXG4gIF07XG4gIHZhciB1ID0gcC51bmlxdWU7XG4gIHZhciB0b3AgPSB1dGlsLmtleXModSlcbiAgICAuc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIHVbYl0gLSB1W2FdOyB9KVxuICAgIC5zbGljZSgwLCA2KVxuICAgIC5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gJyBcXCcnICsgdiArICdcXCcgKCcgKyB1W3ZdICsgJyknOyB9KTtcbiAgcmV0dXJuIGxpc3QuY29uY2F0KHRvcCkuam9pbignXFxuJyk7XG59IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi9pbXBvcnQvdHlwZScpO1xudmFyIGdlbiA9IHJlcXVpcmUoJy4vZ2VuZXJhdGUnKTtcbnZhciBzdGF0cyA9IHt9O1xuXG4vLyBDb2xsZWN0IHVuaXF1ZSB2YWx1ZXMuXG4vLyBPdXRwdXQ6IGFuIGFycmF5IG9mIHVuaXF1ZSB2YWx1ZXMsIGluIGZpcnN0LW9ic2VydmVkIG9yZGVyXG5zdGF0cy51bmlxdWUgPSBmdW5jdGlvbih2YWx1ZXMsIGYsIHJlc3VsdHMpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG4gIHZhciB1ID0ge30sIHYsIGksIG47XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgaW4gdSkgY29udGludWU7XG4gICAgdVt2XSA9IDE7XG4gICAgcmVzdWx0cy5wdXNoKHYpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGlucHV0IGFycmF5Llxuc3RhdHMuY291bnQgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoIHx8IDA7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIG5vbi1udWxsLCBub24tdW5kZWZpbmVkLCBub24tTmFOIHZhbHVlcy5cbnN0YXRzLmNvdW50LnZhbGlkID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuLCB2YWxpZCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgdmFsaWQgKz0gMTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlcy5cbnN0YXRzLmNvdW50Lm1pc3NpbmcgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHYsIGksIG4sIGNvdW50ID0gMDtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiA9PSBudWxsKSBjb3VudCArPSAxO1xuICB9XG4gIHJldHVybiBjb3VudDtcbn07XG5cbi8vIENvdW50IHRoZSBudW1iZXIgb2YgZGlzdGluY3QgdmFsdWVzLlxuLy8gTnVsbCwgdW5kZWZpbmVkIGFuZCBOYU4gYXJlIGVhY2ggY29uc2lkZXJlZCBkaXN0aW5jdCB2YWx1ZXMuXG5zdGF0cy5jb3VudC5kaXN0aW5jdCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuLCBjb3VudCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgaW4gdSkgY29udGludWU7XG4gICAgdVt2XSA9IDE7XG4gICAgY291bnQgKz0gMTtcbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuXG4vLyBDb25zdHJ1Y3QgYSBtYXAgZnJvbSBkaXN0aW5jdCB2YWx1ZXMgdG8gb2NjdXJyZW5jZSBjb3VudHMuXG5zdGF0cy5jb3VudC5tYXAgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIG1hcCA9IHt9LCB2LCBpLCBuO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIG1hcFt2XSA9ICh2IGluIG1hcCkgPyBtYXBbdl0gKyAxIDogMTtcbiAgfVxuICByZXR1cm4gbWFwO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbWVkaWFuIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5tZWRpYW4gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgaWYgKGYpIHZhbHVlcyA9IHZhbHVlcy5tYXAodXRpbC4kKGYpKTtcbiAgdmFsdWVzID0gdmFsdWVzLmZpbHRlcih1dGlsLmlzVmFsaWQpLnNvcnQodXRpbC5jbXApO1xuICByZXR1cm4gc3RhdHMucXVhbnRpbGUodmFsdWVzLCAwLjUpO1xufTtcblxuLy8gQ29tcHV0ZXMgdGhlIHF1YXJ0aWxlIGJvdW5kYXJpZXMgb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnF1YXJ0aWxlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGlmIChmKSB2YWx1ZXMgPSB2YWx1ZXMubWFwKHV0aWwuJChmKSk7XG4gIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIodXRpbC5pc1ZhbGlkKS5zb3J0KHV0aWwuY21wKTtcbiAgdmFyIHEgPSBzdGF0cy5xdWFudGlsZTtcbiAgcmV0dXJuIFtxKHZhbHVlcywgMC4yNSksIHEodmFsdWVzLCAwLjUwKSwgcSh2YWx1ZXMsIDAuNzUpXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHF1YW50aWxlIG9mIGEgc29ydGVkIGFycmF5IG9mIG51bWJlcnMuXG4vLyBBZGFwdGVkIGZyb20gdGhlIEQzLmpzIGltcGxlbWVudGF0aW9uLlxuc3RhdHMucXVhbnRpbGUgPSBmdW5jdGlvbih2YWx1ZXMsIGYsIHApIHtcbiAgaWYgKHAgPT09IHVuZGVmaW5lZCkgeyBwID0gZjsgZiA9IHV0aWwuaWRlbnRpdHk7IH1cbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIEggPSAodmFsdWVzLmxlbmd0aCAtIDEpICogcCArIDEsXG4gICAgICBoID0gTWF0aC5mbG9vcihIKSxcbiAgICAgIHYgPSArZih2YWx1ZXNbaCAtIDFdKSxcbiAgICAgIGUgPSBIIC0gaDtcbiAgcmV0dXJuIGUgPyB2ICsgZSAqIChmKHZhbHVlc1toXSkgLSB2KSA6IHY7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzdW0gb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnN1bSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICBmb3IgKHZhciBzdW09MCwgaT0wLCBuPXZhbHVlcy5sZW5ndGgsIHY7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgc3VtICs9IHY7XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG1lYW4gKGF2ZXJhZ2UpIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5tZWFuID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBtZWFuID0gMCwgZGVsdGEsIGksIG4sIGMsIHY7XG4gIGZvciAoaT0wLCBjPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBkZWx0YSA9IHYgLSBtZWFuO1xuICAgICAgbWVhbiA9IG1lYW4gKyBkZWx0YSAvICgrK2MpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWVhbjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHNhbXBsZSB2YXJpYW5jZSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMudmFyaWFuY2UgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgaWYgKCF1dGlsLmlzQXJyYXkodmFsdWVzKSB8fCB2YWx1ZXMubGVuZ3RoIDwgMikgcmV0dXJuIDA7XG4gIHZhciBtZWFuID0gMCwgTTIgPSAwLCBkZWx0YSwgaSwgYywgdjtcbiAgZm9yIChpPTAsIGM9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBkZWx0YSA9IHYgLSBtZWFuO1xuICAgICAgbWVhbiA9IG1lYW4gKyBkZWx0YSAvICgrK2MpO1xuICAgICAgTTIgPSBNMiArIGRlbHRhICogKHYgLSBtZWFuKTtcbiAgICB9XG4gIH1cbiAgTTIgPSBNMiAvIChjIC0gMSk7XG4gIHJldHVybiBNMjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHNhbXBsZSBzdGFuZGFyZCBkZXZpYXRpb24gb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnN0ZGV2ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoc3RhdHMudmFyaWFuY2UodmFsdWVzLCBmKSk7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBQZWFyc29uIG1vZGUgc2tld25lc3MgKChtZWRpYW4tbWVhbikvc3RkZXYpIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5tb2Rlc2tldyA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICB2YXIgYXZnID0gc3RhdHMubWVhbih2YWx1ZXMsIGYpLFxuICAgICAgbWVkID0gc3RhdHMubWVkaWFuKHZhbHVlcywgZiksXG4gICAgICBzdGQgPSBzdGF0cy5zdGRldih2YWx1ZXMsIGYpO1xuICByZXR1cm4gc3RkID09PSAwID8gMCA6IChhdmcgLSBtZWQpIC8gc3RkO1xufTtcblxuLy8gRmluZCB0aGUgbWluaW11bSB2YWx1ZSBpbiBhbiBhcnJheS5cbnN0YXRzLm1pbiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICByZXR1cm4gc3RhdHMuZXh0ZW50KHZhbHVlcywgZilbMF07XG59O1xuXG4vLyBGaW5kIHRoZSBtYXhpbXVtIHZhbHVlIGluIGFuIGFycmF5Llxuc3RhdHMubWF4ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHJldHVybiBzdGF0cy5leHRlbnQodmFsdWVzLCBmKVsxXTtcbn07XG5cbi8vIEZpbmQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gb2YgYW4gYXJyYXkgb2YgdmFsdWVzLlxuc3RhdHMuZXh0ZW50ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBhLCBiLCB2LCBpLCBuID0gdmFsdWVzLmxlbmd0aDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgeyBhID0gYiA9IHY7IGJyZWFrOyB9XG4gIH1cbiAgZm9yICg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaWYgKHYgPCBhKSBhID0gdjtcbiAgICAgIGlmICh2ID4gYikgYiA9IHY7XG4gICAgfVxuICB9XG4gIHJldHVybiBbYSwgYl07XG59O1xuXG4vLyBGaW5kIHRoZSBpbnRlZ2VyIGluZGljZXMgb2YgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLlxuc3RhdHMuZXh0ZW50LmluZGV4ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB4ID0gLTEsIHkgPSAtMSwgYSwgYiwgdiwgaSwgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHsgYSA9IGIgPSB2OyB4ID0geSA9IGk7IGJyZWFrOyB9XG4gIH1cbiAgZm9yICg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaWYgKHYgPCBhKSB7IGEgPSB2OyB4ID0gaTsgfVxuICAgICAgaWYgKHYgPiBiKSB7IGIgPSB2OyB5ID0gaTsgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3gsIHldO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuc3RhdHMuZG90ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBzdW0gPSAwLCBpLCB2O1xuICBpZiAoIWIpIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCAhPT0gYS5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKCdBcnJheSBsZW5ndGhzIG11c3QgbWF0Y2guJyk7XG4gICAgfVxuICAgIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHZhbHVlc1tpXSAqIGFbaV07XG4gICAgICBpZiAodiA9PT0gdikgc3VtICs9IHY7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGEgPSB1dGlsLiQoYSk7XG4gICAgYiA9IHV0aWwuJChiKTtcbiAgICBmb3IgKGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBhKHZhbHVlc1tpXSkgKiBiKHZhbHVlc1tpXSk7XG4gICAgICBpZiAodiA9PT0gdikgc3VtICs9IHY7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBDb21wdXRlIGFzY2VuZGluZyByYW5rIHNjb3JlcyBmb3IgYW4gYXJyYXkgb2YgdmFsdWVzLlxuLy8gVGllcyBhcmUgYXNzaWduZWQgdGhlaXIgY29sbGVjdGl2ZSBtZWFuIHJhbmsuXG5zdGF0cy5yYW5rID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZikgfHwgdXRpbC5pZGVudGl0eTtcbiAgdmFyIGEgPSB2YWx1ZXMubWFwKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgIHJldHVybiB7aWR4OiBpLCB2YWw6IGYodil9O1xuICAgIH0pXG4gICAgLnNvcnQodXRpbC5jb21wYXJhdG9yKCd2YWwnKSk7XG5cbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgciA9IEFycmF5KG4pLFxuICAgICAgdGllID0gLTEsIHAgPSB7fSwgaSwgdiwgbXU7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgdiA9IGFbaV0udmFsO1xuICAgIGlmICh0aWUgPCAwICYmIHAgPT09IHYpIHtcbiAgICAgIHRpZSA9IGkgLSAxO1xuICAgIH0gZWxzZSBpZiAodGllID4gLTEgJiYgcCAhPT0gdikge1xuICAgICAgbXUgPSAxICsgKGktMSArIHRpZSkgLyAyO1xuICAgICAgZm9yICg7IHRpZTxpOyArK3RpZSkgclthW3RpZV0uaWR4XSA9IG11O1xuICAgICAgdGllID0gLTE7XG4gICAgfVxuICAgIHJbYVtpXS5pZHhdID0gaSArIDE7XG4gICAgcCA9IHY7XG4gIH1cblxuICBpZiAodGllID4gLTEpIHtcbiAgICBtdSA9IDEgKyAobi0xICsgdGllKSAvIDI7XG4gICAgZm9yICg7IHRpZTxuOyArK3RpZSkgclthW3RpZV0uaWR4XSA9IG11O1xuICB9XG5cbiAgcmV0dXJuIHI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgUGVhcnNvbiBwcm9kdWN0LW1vbWVudCBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG5zdGF0cy5jb3IgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIGZuID0gYjtcbiAgYiA9IGZuID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYTtcbiAgYSA9IGZuID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzO1xuXG4gIHZhciBkb3QgPSBzdGF0cy5kb3QoYSwgYiksXG4gICAgICBtdWEgPSBzdGF0cy5tZWFuKGEpLFxuICAgICAgbXViID0gc3RhdHMubWVhbihiKSxcbiAgICAgIHNkYSA9IHN0YXRzLnN0ZGV2KGEpLFxuICAgICAgc2RiID0gc3RhdHMuc3RkZXYoYiksXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aDtcblxuICByZXR1cm4gKGRvdCAtIG4qbXVhKm11YikgLyAoKG4tMSkgKiBzZGEgKiBzZGIpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgU3BlYXJtYW4gcmFuayBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIHZhbHVlcy5cbnN0YXRzLmNvci5yYW5rID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciByYSA9IGIgPyBzdGF0cy5yYW5rKHZhbHVlcywgdXRpbC4kKGEpKSA6IHN0YXRzLnJhbmsodmFsdWVzKSxcbiAgICAgIHJiID0gYiA/IHN0YXRzLnJhbmsodmFsdWVzLCB1dGlsLiQoYikpIDogc3RhdHMucmFuayhhKSxcbiAgICAgIG4gPSB2YWx1ZXMubGVuZ3RoLCBpLCBzLCBkO1xuXG4gIGZvciAoaT0wLCBzPTA7IGk8bjsgKytpKSB7XG4gICAgZCA9IHJhW2ldIC0gcmJbaV07XG4gICAgcyArPSBkICogZDtcbiAgfVxuXG4gIHJldHVybiAxIC0gNipzIC8gKG4gKiAobipuLTEpKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIGRpc3RhbmNlIGNvcnJlbGF0aW9uIG9mIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlzdGFuY2VfY29ycmVsYXRpb25cbnN0YXRzLmNvci5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBYID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGEpKSA6IHZhbHVlcyxcbiAgICAgIFkgPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYTtcblxuICB2YXIgQSA9IHN0YXRzLmRpc3QubWF0KFgpLFxuICAgICAgQiA9IHN0YXRzLmRpc3QubWF0KFkpLFxuICAgICAgbiA9IEEubGVuZ3RoLFxuICAgICAgaSwgYWEsIGJiLCBhYjtcblxuICBmb3IgKGk9MCwgYWE9MCwgYmI9MCwgYWI9MDsgaTxuOyArK2kpIHtcbiAgICBhYSArPSBBW2ldKkFbaV07XG4gICAgYmIgKz0gQltpXSpCW2ldO1xuICAgIGFiICs9IEFbaV0qQltpXTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQoYWIgLyBNYXRoLnNxcnQoYWEqYmIpKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHZlY3RvciBkaXN0YW5jZSBiZXR3ZWVuIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbi8vIERlZmF1bHQgaXMgRXVjbGlkZWFuIChleHA9MikgZGlzdGFuY2UsIGNvbmZpZ3VyYWJsZSB2aWEgZXhwIGFyZ3VtZW50Llxuc3RhdHMuZGlzdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgZXhwKSB7XG4gIHZhciBmID0gdXRpbC5pc0Z1bmN0aW9uKGIpIHx8IHV0aWwuaXNTdHJpbmcoYiksXG4gICAgICBYID0gdmFsdWVzLFxuICAgICAgWSA9IGYgPyB2YWx1ZXMgOiBhLFxuICAgICAgZSA9IGYgPyBleHAgOiBiLFxuICAgICAgTDIgPSBlID09PSAyIHx8IGUgPT0gbnVsbCxcbiAgICAgIG4gPSB2YWx1ZXMubGVuZ3RoLCBzID0gMCwgZCwgaTtcbiAgaWYgKGYpIHtcbiAgICBhID0gdXRpbC4kKGEpO1xuICAgIGIgPSB1dGlsLiQoYik7XG4gIH1cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgZCA9IGYgPyAoYShYW2ldKS1iKFlbaV0pKSA6IChYW2ldLVlbaV0pO1xuICAgIHMgKz0gTDIgPyBkKmQgOiBNYXRoLnBvdyhNYXRoLmFicyhkKSwgZSk7XG4gIH1cbiAgcmV0dXJuIEwyID8gTWF0aC5zcXJ0KHMpIDogTWF0aC5wb3cocywgMS9lKTtcbn07XG5cbi8vIENvbnN0cnVjdCBhIG1lYW4tY2VudGVyZWQgZGlzdGFuY2UgbWF0cml4IGZvciBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMuZGlzdC5tYXQgPSBmdW5jdGlvbihYKSB7XG4gIHZhciBuID0gWC5sZW5ndGgsXG4gICAgICBtID0gbipuLFxuICAgICAgQSA9IEFycmF5KG0pLFxuICAgICAgUiA9IGdlbi56ZXJvcyhuKSxcbiAgICAgIE0gPSAwLCB2LCBpLCBqO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIEFbaSpuK2ldID0gMDtcbiAgICBmb3IgKGo9aSsxOyBqPG47ICsraikge1xuICAgICAgQVtpKm4ral0gPSAodiA9IE1hdGguYWJzKFhbaV0gLSBYW2pdKSk7XG4gICAgICBBW2oqbitpXSA9IHY7XG4gICAgICBSW2ldICs9IHY7XG4gICAgICBSW2pdICs9IHY7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgTSArPSBSW2ldO1xuICAgIFJbaV0gLz0gbjtcbiAgfVxuICBNIC89IG07XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgZm9yIChqPWk7IGo8bjsgKytqKSB7XG4gICAgICBBW2kqbitqXSArPSBNIC0gUltpXSAtIFJbal07XG4gICAgICBBW2oqbitpXSA9IEFbaSpuK2pdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBBO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgU2hhbm5vbiBlbnRyb3B5IChsb2cgYmFzZSAyKSBvZiBhbiBhcnJheSBvZiBjb3VudHMuXG5zdGF0cy5lbnRyb3B5ID0gZnVuY3Rpb24oY291bnRzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBpLCBwLCBzID0gMCwgSCA9IDAsIG4gPSBjb3VudHMubGVuZ3RoO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBzICs9IChmID8gZihjb3VudHNbaV0pIDogY291bnRzW2ldKTtcbiAgfVxuICBpZiAocyA9PT0gMCkgcmV0dXJuIDA7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHAgPSAoZiA/IGYoY291bnRzW2ldKSA6IGNvdW50c1tpXSkgLyBzO1xuICAgIGlmIChwKSBIICs9IHAgKiBNYXRoLmxvZyhwKTtcbiAgfVxuICByZXR1cm4gLUggLyBNYXRoLkxOMjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG4vLyBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBmb3JtIFtNSSwgTUlfZGlzdGFuY2VdIFxuLy8gTUlfZGlzdGFuY2UgaXMgZGVmaW5lZCBhcyAxIC0gSShhLGIpIC8gSChhLGIpLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NdXR1YWxfaW5mb3JtYXRpb25cbnN0YXRzLm11dHVhbCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHZhciB4ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgeSA9IGNvdW50cyA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICB6ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoY291bnRzKSkgOiBiO1xuXG4gIHZhciBweCA9IHt9LFxuICAgICAgcHkgPSB7fSxcbiAgICAgIG4gPSB6Lmxlbmd0aCxcbiAgICAgIHMgPSAwLCBJID0gMCwgSCA9IDAsIHAsIHQsIGk7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcHhbeFtpXV0gPSAwO1xuICAgIHB5W3lbaV1dID0gMDtcbiAgfVxuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHB4W3hbaV1dICs9IHpbaV07XG4gICAgcHlbeVtpXV0gKz0geltpXTtcbiAgICBzICs9IHpbaV07XG4gIH1cblxuICB0ID0gMSAvIChzICogTWF0aC5MTjIpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBpZiAoeltpXSA9PT0gMCkgY29udGludWU7XG4gICAgcCA9IChzICogeltpXSkgLyAocHhbeFtpXV0gKiBweVt5W2ldXSk7XG4gICAgSSArPSB6W2ldICogdCAqIE1hdGgubG9nKHApO1xuICAgIEggKz0geltpXSAqIHQgKiBNYXRoLmxvZyh6W2ldL3MpO1xuICB9XG5cbiAgcmV0dXJuIFtJLCAxICsgSS9IXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG5zdGF0cy5tdXR1YWwuaW5mbyA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHJldHVybiBzdGF0cy5tdXR1YWwodmFsdWVzLCBhLCBiLCBjb3VudHMpWzBdO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGRpc3RhbmNlIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbi8vIE1JX2Rpc3RhbmNlIGlzIGRlZmluZWQgYXMgMSAtIEkoYSxiKSAvIEgoYSxiKS5cbnN0YXRzLm11dHVhbC5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBjb3VudHMpIHtcbiAgcmV0dXJuIHN0YXRzLm11dHVhbCh2YWx1ZXMsIGEsIGIsIGNvdW50cylbMV07XG59O1xuXG4vLyBDb21wdXRlIGEgcHJvZmlsZSBvZiBzdW1tYXJ5IHN0YXRpc3RpY3MgZm9yIGEgdmFyaWFibGUuXG5zdGF0cy5wcm9maWxlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHZhciBtZWFuID0gMCxcbiAgICAgIHZhbGlkID0gMCxcbiAgICAgIG1pc3NpbmcgPSAwLFxuICAgICAgZGlzdGluY3QgPSAwLFxuICAgICAgbWluID0gbnVsbCxcbiAgICAgIG1heCA9IG51bGwsXG4gICAgICBNMiA9IDAsXG4gICAgICB2YWxzID0gW10sXG4gICAgICB1ID0ge30sIGRlbHRhLCBzZCwgaSwgdiwgeDtcblxuICAvLyBjb21wdXRlIHN1bW1hcnkgc3RhdHNcbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG5cbiAgICAvLyB1cGRhdGUgdW5pcXVlIHZhbHVlc1xuICAgIHVbdl0gPSAodiBpbiB1KSA/IHVbdl0gKyAxIDogKGRpc3RpbmN0ICs9IDEsIDEpO1xuXG4gICAgaWYgKHYgPT0gbnVsbCkge1xuICAgICAgKyttaXNzaW5nO1xuICAgIH0gZWxzZSBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICAvLyB1cGRhdGUgc3RhdHNcbiAgICAgIHggPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSA/IHYubGVuZ3RoIDogdjtcbiAgICAgIGlmIChtaW49PT1udWxsIHx8IHggPCBtaW4pIG1pbiA9IHg7XG4gICAgICBpZiAobWF4PT09bnVsbCB8fCB4ID4gbWF4KSBtYXggPSB4O1xuICAgICAgZGVsdGEgPSB4IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKyt2YWxpZCk7XG4gICAgICBNMiA9IE0yICsgZGVsdGEgKiAoeCAtIG1lYW4pO1xuICAgICAgdmFscy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICBNMiA9IE0yIC8gKHZhbGlkIC0gMSk7XG4gIHNkID0gTWF0aC5zcXJ0KE0yKTtcblxuICAvLyBzb3J0IHZhbHVlcyBmb3IgbWVkaWFuIGFuZCBpcXJcbiAgdmFscy5zb3J0KHV0aWwuY21wKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICAgICB0eXBlKHZhbHVlcywgZiksXG4gICAgdW5pcXVlOiAgIHUsXG4gICAgY291bnQ6ICAgIHZhbHVlcy5sZW5ndGgsXG4gICAgdmFsaWQ6ICAgIHZhbGlkLFxuICAgIG1pc3Npbmc6ICBtaXNzaW5nLFxuICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICBtaW46ICAgICAgbWluLFxuICAgIG1heDogICAgICBtYXgsXG4gICAgbWVhbjogICAgIG1lYW4sXG4gICAgc3RkZXY6ICAgIHNkLFxuICAgIG1lZGlhbjogICAodiA9IHN0YXRzLnF1YW50aWxlKHZhbHMsIDAuNSkpLFxuICAgIHExOiAgICAgICBzdGF0cy5xdWFudGlsZSh2YWxzLCAwLjI1KSxcbiAgICBxMzogICAgICAgc3RhdHMucXVhbnRpbGUodmFscywgMC43NSksXG4gICAgbW9kZXNrZXc6IHNkID09PSAwID8gMCA6IChtZWFuIC0gdikgLyBzZFxuICB9O1xufTtcblxuLy8gQ29tcHV0ZSBwcm9maWxlcyBmb3IgYWxsIHZhcmlhYmxlcyBpbiBhIGRhdGEgc2V0Llxuc3RhdHMuc3VtbWFyeSA9IGZ1bmN0aW9uKGRhdGEsIGZpZWxkcykge1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICB2YXIgcyA9IGZpZWxkcy5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBwID0gc3RhdHMucHJvZmlsZShkYXRhLCB1dGlsLiQoZikpO1xuICAgIHJldHVybiAocC5maWVsZCA9IGYsIHApO1xuICB9KTtcbiAgcmV0dXJuIChzLl9fc3VtbWFyeV9fID0gdHJ1ZSwgcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXRzOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgZDMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5kMyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuZDMgOiBudWxsKTtcblxudmFyIGNvbnRleHQgPSB7XG4gIGZvcm1hdHM6ICAgIFtdLFxuICBmb3JtYXRfbWFwOiB7fSxcbiAgdHJ1bmNhdGU6ICAgdXRpbC50cnVuY2F0ZSxcbiAgcGFkOiAgICAgICAgdXRpbC5wYWRcbn07XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRleHQpIHtcbiAgdmFyIHNyYyA9IHNvdXJjZSh0ZXh0LCAnZCcpO1xuICBzcmMgPSAndmFyIF9fdDsgcmV0dXJuICcgKyBzcmMgKyAnOyc7XG5cbiAgLyoganNoaW50IGV2aWw6IHRydWUgKi9cbiAgcmV0dXJuIChuZXcgRnVuY3Rpb24oJ2QnLCBzcmMpKS5iaW5kKGNvbnRleHQpO1xufVxuXG50ZW1wbGF0ZS5zb3VyY2UgPSBzb3VyY2U7XG50ZW1wbGF0ZS5jb250ZXh0ID0gY29udGV4dDtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cbi8vIENsZWFyIGNhY2hlIG9mIGZvcm1hdCBvYmplY3RzLlxuLy8gVGhpcyBjYW4gKmJyZWFrKiBwcmlvciB0ZW1wbGF0ZSBmdW5jdGlvbnMsIHNvIGludm9rZSB3aXRoIGNhcmUhXG50ZW1wbGF0ZS5jbGVhckZvcm1hdENhY2hlID0gZnVuY3Rpb24oKSB7XG4gIGNvbnRleHQuZm9ybWF0cyA9IFtdO1xuICBjb250ZXh0LmZvcm1hdF9tYXAgPSB7fTtcbn07XG5cbi8vIEdlbmVyYXRlIHByb3BlcnR5IGFjY2VzcyBjb2RlIGZvciB1c2Ugd2l0aGluIHRlbXBsYXRlIHNvdXJjZS5cbi8vIG9iamVjdDogdGhlIG5hbWUgb2YgdGhlIG9iamVjdCAodmFyaWFibGUpIGNvbnRhaW5pbmcgdGVtcGxhdGUgZGF0YVxuLy8gcHJvcGVydHk6IHRoZSBwcm9wZXJ0eSBhY2Nlc3Mgc3RyaW5nLCB2ZXJiYXRpbSBmcm9tIHRlbXBsYXRlIHRhZ1xudGVtcGxhdGUucHJvcGVydHkgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG4gIHZhciBzcmMgPSB1dGlsLmZpZWxkKHByb3BlcnR5KS5tYXAodXRpbC5zdHIpLmpvaW4oJ11bJyk7XG4gIHJldHVybiBvYmplY3QgKyAnWycgKyBzcmMgKyAnXSc7XG59O1xuXG4vLyBHZW5lcmF0ZSBzb3VyY2UgY29kZSBmb3IgYSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbi8vIHRleHQ6IHRoZSB0ZW1wbGF0ZSB0ZXh0XG4vLyB2YXJpYWJsZTogdGhlIG5hbWUgb2YgdGhlIGRhdGEgb2JqZWN0IHZhcmlhYmxlICgnb2JqJyBieSBkZWZhdWx0KVxuLy8gcHJvcGVydGllczogb3B0aW9uYWwgaGFzaCBmb3IgY29sbGVjdGluZyBhbGwgYWNjZXNzZWQgcHJvcGVydGllc1xuZnVuY3Rpb24gc291cmNlKHRleHQsIHZhcmlhYmxlLCBwcm9wZXJ0aWVzKSB7XG4gIHZhcmlhYmxlID0gdmFyaWFibGUgfHwgJ29iaic7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBzcmMgPSAnXFwnJztcbiAgdmFyIHJlZ2V4ID0gdGVtcGxhdGVfcmU7XG5cbiAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgdGV4dC5yZXBsYWNlKHJlZ2V4LCBmdW5jdGlvbihtYXRjaCwgaW50ZXJwb2xhdGUsIG9mZnNldCkge1xuICAgIHNyYyArPSB0ZXh0XG4gICAgICAuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgIC5yZXBsYWNlKHRlbXBsYXRlX2VzY2FwZXIsIHRlbXBsYXRlX2VzY2FwZUNoYXIpO1xuICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICBzcmMgKz0gJ1xcJ1xcbisoKF9fdD0oJyArXG4gICAgICAgIHRlbXBsYXRlX3ZhcihpbnRlcnBvbGF0ZSwgdmFyaWFibGUsIHByb3BlcnRpZXMpICtcbiAgICAgICAgJykpPT1udWxsP1xcJ1xcJzpfX3QpK1xcblxcJyc7XG4gICAgfVxuXG4gICAgLy8gQWRvYmUgVk1zIG5lZWQgdGhlIG1hdGNoIHJldHVybmVkIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3Qgb2ZmZXN0LlxuICAgIHJldHVybiBtYXRjaDtcbiAgfSk7XG4gIHJldHVybiBzcmMgKyAnXFwnJztcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGVfdmFyKHRleHQsIHZhcmlhYmxlLCBwcm9wZXJ0aWVzKSB7XG4gIHZhciBmaWx0ZXJzID0gdGV4dC5zcGxpdCgnfCcpO1xuICB2YXIgcHJvcCA9IGZpbHRlcnMuc2hpZnQoKS50cmltKCk7XG4gIHZhciBzdHJpbmdDYXN0ID0gdHJ1ZTtcblxuICBmdW5jdGlvbiBzdHJjYWxsKGZuKSB7XG4gICAgZm4gPSBmbiB8fCAnJztcbiAgICBpZiAoc3RyaW5nQ2FzdCkge1xuICAgICAgc3RyaW5nQ2FzdCA9IGZhbHNlO1xuICAgICAgc3JjID0gJ1N0cmluZygnICsgc3JjICsgJyknICsgZm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHNyYyArPSBmbjtcbiAgICB9XG4gICAgcmV0dXJuIHNyYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRhdGUoKSB7XG4gICAgcmV0dXJuICcodHlwZW9mICcgKyBzcmMgKyAnPT09XCJudW1iZXJcIj9uZXcgRGF0ZSgnK3NyYysnKTonK3NyYysnKSc7XG4gIH1cblxuICBpZiAocHJvcGVydGllcykgcHJvcGVydGllc1twcm9wXSA9IDE7XG4gIHZhciBzcmMgPSB0ZW1wbGF0ZS5wcm9wZXJ0eSh2YXJpYWJsZSwgcHJvcCk7XG5cbiAgZm9yICh2YXIgaT0wOyBpPGZpbHRlcnMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZiA9IGZpbHRlcnNbaV0sIGFyZ3MgPSBudWxsLCBwaWR4LCBhLCBiO1xuXG4gICAgaWYgKChwaWR4PWYuaW5kZXhPZignOicpKSA+IDApIHtcbiAgICAgIGYgPSBmLnNsaWNlKDAsIHBpZHgpO1xuICAgICAgYXJncyA9IGZpbHRlcnNbaV0uc2xpY2UocGlkeCsxKS5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH0pO1xuICAgIH1cbiAgICBmID0gZi50cmltKCk7XG5cbiAgICBzd2l0Y2ggKGYpIHtcbiAgICAgIGNhc2UgJ2xlbmd0aCc6XG4gICAgICAgIHN0cmNhbGwoJy5sZW5ndGgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsb3dlcic6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXInOlxuICAgICAgICBzdHJjYWxsKCcudG9VcHBlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xvd2VyLWxvY2FsZSc6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvY2FsZUxvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXItbG9jYWxlJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvTG9jYWxlVXBwZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmltJzpcbiAgICAgICAgc3RyY2FsbCgnLnRyaW0oKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgwLCcgKyBhICsgJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKC0nICsgYSArJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaWQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhICsgdXRpbC5udW1iZXIoYXJnc1sxXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgrJythKycsJytiKycpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2xpY2UnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgnKyBhICtcbiAgICAgICAgICAoYXJncy5sZW5ndGggPiAxID8gJywnICsgdXRpbC5udW1iZXIoYXJnc1sxXSkgOiAnJykgK1xuICAgICAgICAgICcpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJ1bmNhdGUnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhcmdzWzFdO1xuICAgICAgICBiID0gKGIhPT0nbGVmdCcgJiYgYiE9PSdtaWRkbGUnICYmIGIhPT0nY2VudGVyJykgPyAncmlnaHQnIDogYjtcbiAgICAgICAgc3JjID0gJ3RoaXMudHJ1bmNhdGUoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BhZCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgYiA9IGFyZ3NbMV07XG4gICAgICAgIGIgPSAoYiE9PSdsZWZ0JyAmJiBiIT09J21pZGRsZScgJiYgYiE9PSdjZW50ZXInKSA/ICdyaWdodCcgOiBiO1xuICAgICAgICBzcmMgPSAndGhpcy5wYWQoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGEgPSB0ZW1wbGF0ZV9mb3JtYXQoYXJnc1swXSwgZDMuZm9ybWF0KTtcbiAgICAgICAgc3RyaW5nQ2FzdCA9IGZhbHNlO1xuICAgICAgICBzcmMgPSAndGhpcy5mb3JtYXRzWycrYSsnXSgnK3NyYysnKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGEgPSB0ZW1wbGF0ZV9mb3JtYXQoYXJnc1swXSwgZDMudGltZS5mb3JtYXQpO1xuICAgICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICAgIHNyYyA9ICd0aGlzLmZvcm1hdHNbJythKyddKCcrZGF0ZSgpKycpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIHRlbXBsYXRlIGZpbHRlcjogJyArIGYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzcmM7XG59XG5cbnZhciB0ZW1wbGF0ZV9yZSA9IC9cXHtcXHsoLis/KVxcfVxcfXwkL2c7XG5cbi8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4vLyBzdHJpbmcgbGl0ZXJhbC5cbnZhciB0ZW1wbGF0ZV9lc2NhcGVzID0ge1xuICAnXFwnJzogICAgICdcXCcnLFxuICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICdcXHInOiAgICAgJ3InLFxuICAnXFxuJzogICAgICduJyxcbiAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAnXFx1MjAyOSc6ICd1MjAyOSdcbn07XG5cbnZhciB0ZW1wbGF0ZV9lc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZV9lc2NhcGVDaGFyKG1hdGNoKSB7XG4gIHJldHVybiAnXFxcXCcgKyB0ZW1wbGF0ZV9lc2NhcGVzW21hdGNoXTtcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGVfZm9ybWF0KHBhdHRlcm4sIGZtdCkge1xuICBpZiAoKHBhdHRlcm5bMF0gPT09ICdcXCcnICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcXCcnKSB8fFxuICAgICAgKHBhdHRlcm5bMF0gPT09ICdcIicgICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcIicpKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc2xpY2UoMSwgLTEpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdGb3JtYXQgcGF0dGVybiBtdXN0IGJlIHF1b3RlZDogJyArIHBhdHRlcm4pO1xuICB9XG4gIGlmICghY29udGV4dC5mb3JtYXRfbWFwW3BhdHRlcm5dKSB7XG4gICAgdmFyIGYgPSBmbXQocGF0dGVybik7XG4gICAgdmFyIGkgPSBjb250ZXh0LmZvcm1hdHMubGVuZ3RoO1xuICAgIGNvbnRleHQuZm9ybWF0cy5wdXNoKGYpO1xuICAgIGNvbnRleHQuZm9ybWF0X21hcFtwYXR0ZXJuXSA9IGk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQuZm9ybWF0X21hcFtwYXR0ZXJuXTtcbn1cbiIsInZhciBTVEVQUyA9IFtcbiAgWzMxNTM2ZTYsIDVdLCAgLy8gMS15ZWFyXG4gIFs3Nzc2ZTYsIDRdLCAgIC8vIDMtbW9udGhcbiAgWzI1OTJlNiwgNF0sICAgLy8gMS1tb250aFxuICBbMTIwOTZlNSwgM10sICAvLyAyLXdlZWtcbiAgWzYwNDhlNSwgM10sICAgLy8gMS13ZWVrXG4gIFsxNzI4ZTUsIDNdLCAgIC8vIDItZGF5XG4gIFs4NjRlNSwgM10sICAgIC8vIDEtZGF5XG4gIFs0MzJlNSwgMl0sICAgIC8vIDEyLWhvdXJcbiAgWzIxNmU1LCAyXSwgICAgLy8gNi1ob3VyXG4gIFsxMDhlNSwgMl0sICAgIC8vIDMtaG91clxuICBbMzZlNSwgMl0sICAgICAvLyAxLWhvdXJcbiAgWzE4ZTUsIDFdLCAgICAgLy8gMzAtbWludXRlXG4gIFs5ZTUsIDFdLCAgICAgIC8vIDE1LW1pbnV0ZVxuICBbM2U1LCAxXSwgICAgICAvLyA1LW1pbnV0ZVxuICBbNmU0LCAxXSwgICAgICAvLyAxLW1pbnV0ZVxuICBbM2U0LCAwXSwgICAgICAvLyAzMC1zZWNvbmRcbiAgWzE1ZTMsIDBdLCAgICAgLy8gMTUtc2Vjb25kXG4gIFs1ZTMsIDBdLCAgICAgIC8vIDUtc2Vjb25kXG4gIFsxZTMsIDBdICAgICAgIC8vIDEtc2Vjb25kXG5dO1xuXG5mdW5jdGlvbiBpc051bWJlcihkKSB7IHJldHVybiB0eXBlb2YgZCA9PT0gJ251bWJlcic7IH1cblxudmFyIGVudHJpZXMgPSBbXG4gIHtcbiAgICB0eXBlOiAnc2Vjb25kJyxcbiAgICBtaW5zdGVwOiAxLFxuICAgIGZvcm1hdDogJyVZICViICUtZCAlSDolTTolUy4lTCcsXG4gICAgZGF0ZTogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGQgKiAxZTMpO1xuICAgIH0sXG4gICAgdW5pdDogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuICgrZCAvIDFlMyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgdHlwZTogJ21pbnV0ZScsXG4gICAgbWluc3RlcDogMSxcbiAgICBmb3JtYXQ6ICclWSAlYiAlLWQgJUg6JU0nLFxuICAgIGRhdGU6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkICogNmU0KTtcbiAgICB9LFxuICAgIHVuaXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB+figrZCAvIDZlNCk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2hvdXInLFxuICAgIG1pbnN0ZXA6IDEsXG4gICAgZm9ybWF0OiAnJVkgJWIgJS1kICVIOjAwJyxcbiAgICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoZCAqIDM2ZTUpO1xuICAgIH0sXG4gICAgdW5pdDogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIH5+KCtkIC8gMzZlNSk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgdHlwZTogJ2RheScsXG4gICAgbWluc3RlcDogMSxcbiAgICBzdGVwOiBbMSwgN10sXG4gICAgZm9ybWF0OiAnJVkgJWIgJS1kJyxcbiAgICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoZCAqIDg2NGU1KTtcbiAgICB9LFxuICAgIHVuaXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiB+figrZCAvIDg2NGU1KTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnbW9udGgnLFxuICAgIG1pbnN0ZXA6IDEsXG4gICAgc3RlcDogWzEsIDMsIDZdLFxuICAgIGZvcm1hdDogJyViICVZJyxcbiAgICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMofn4oZCAvIDEyKSwgZCAlIDEyLCAxKSk7XG4gICAgfSxcbiAgICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgICBpZiAoaXNOdW1iZXIoZCkpIGQgPSBuZXcgRGF0ZShkKTtcbiAgICAgIHJldHVybiAxMiAqIGQuZ2V0VVRDRnVsbFllYXIoKSArIGQuZ2V0VVRDTW9udGgoKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICB0eXBlOiAneWVhcicsXG4gICAgbWluc3RlcDogMSxcbiAgICBmb3JtYXQ6ICclWScsXG4gICAgZGF0ZTogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKGQsIDAsIDEpKTtcbiAgICB9LFxuICAgIHVuaXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiAoaXNOdW1iZXIoZCkgPyBuZXcgRGF0ZShkKSA6IGQpLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgfVxuICB9XG5dO1xuXG52YXIgbWludXRlT2ZIb3VyID0ge1xuICB0eXBlOiAnbWludXRlT2ZIb3VyJyxcbiAgbWluOiAwLFxuICBtYXg6IDU5LFxuICBtaW5zdGVwOiAxLFxuICBmb3JtYXQ6ICclTScsXG4gIGRhdGU6IGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDTWludXRlcygpO1xuICB9XG59O1xuXG52YXIgaG91ck9mRGF5ID0ge1xuICB0eXBlOiAnaG91ck9mRGF5JyxcbiAgbWluOiAwLFxuICBtYXg6IDIzLFxuICBtaW5zdGVwOiAxLFxuICBmb3JtYXQ6ICclSCcsXG4gIGRhdGU6IGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDSG91cnMoKTtcbiAgfVxufTtcblxudmFyIGRheU9mV2VlayA9IHtcbiAgdHlwZTogJ2RheU9mV2VlaycsXG4gIG1pbjogMCxcbiAgbWF4OiA2LFxuICBzdGVwOiBbMV0sXG4gIGZvcm1hdDogJyVhJyxcbiAgZGF0ZTogZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCA0ICsgZCkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDRGF5KCk7XG4gIH1cbn07XG5cbnZhciBkYXlPZk1vbnRoID0ge1xuICB0eXBlOiAnZGF5T2ZNb250aCcsXG4gIG1pbjogMSxcbiAgbWF4OiAzMSxcbiAgc3RlcDogWzFdLFxuICBmb3JtYXQ6ICclLWQnLFxuICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIGQpKTtcbiAgfSxcbiAgdW5pdDogZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiAoaXNOdW1iZXIoZCkgPyBuZXcgRGF0ZShkKSA6IGQpLmdldFVUQ0RhdGUoKTtcbiAgfVxufTtcblxudmFyIG1vbnRoT2ZZZWFyID0ge1xuICB0eXBlOiAnbW9udGhPZlllYXInLFxuICBtaW46IDAsXG4gIG1heDogMTEsXG4gIHN0ZXA6IFsxXSxcbiAgZm9ybWF0OiAnJWInLFxuICBkYXRlOiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIGQgJSAxMiwgMSkpO1xuICB9LFxuICB1bml0OiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIChpc051bWJlcihkKSA/IG5ldyBEYXRlKGQpIDogZCkuZ2V0VVRDTW9udGgoKTtcbiAgfVxufTtcblxudmFyIHVuaXRzID0ge1xuICAnc2Vjb25kJzogICAgICAgZW50cmllc1swXSxcbiAgJ21pbnV0ZSc6ICAgICAgIGVudHJpZXNbMV0sXG4gICdob3VyJzogICAgICAgICBlbnRyaWVzWzJdLFxuICAnZGF5JzogICAgICAgICAgZW50cmllc1szXSxcbiAgJ21vbnRoJzogICAgICAgIGVudHJpZXNbNF0sXG4gICd5ZWFyJzogICAgICAgICBlbnRyaWVzWzVdLFxuICAnbWludXRlT2ZIb3VyJzogbWludXRlT2ZIb3VyLFxuICAnaG91ck9mRGF5JzogICAgaG91ck9mRGF5LFxuICAnZGF5T2ZXZWVrJzogICAgZGF5T2ZXZWVrLFxuICAnZGF5T2ZNb250aCc6ICAgZGF5T2ZNb250aCxcbiAgJ21vbnRoT2ZZZWFyJzogIG1vbnRoT2ZZZWFyLFxuICAndGltZXN0ZXBzJzogICAgZW50cmllc1xufTtcblxudW5pdHMuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIGksIGxlbiwgYmlucywgc3RlcCA9IFNURVBTWzBdO1xuXG4gIGZvciAoaSA9IDEsIGxlbiA9IFNURVBTLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiBlbnRyaWVzW1NURVBTW2kgLSAxXVsxXV07XG4gICAgICB9XG4gICAgICBpZiAoYmlucyA+PSBtaW5iKSB7XG4gICAgICAgIHJldHVybiBlbnRyaWVzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZW50cmllc1tTVEVQU1tTVEVQUy5sZW5ndGggLSAxXVsxXV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXRzO1xuIiwidmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpO1xudmFyIHVuaXRzID0gcmVxdWlyZSgnLi90aW1lLXVuaXRzJyk7XG52YXIgdSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIHdoZXJlIGFyZSB3ZT9cblxudS5pc05vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgdHlwZW9mIHByb2Nlc3Muc3RkZXJyICE9PSAndW5kZWZpbmVkJztcblxuLy8gdXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIEZOQU1FID0gJ19fbmFtZV9fJztcblxudS5uYW1lZGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBmKSB7IHJldHVybiAoZltGTkFNRV0gPSBuYW1lLCBmKTsgfTtcblxudS5uYW1lID0gZnVuY3Rpb24oZikgeyByZXR1cm4gZj09bnVsbCA/IG51bGwgOiBmW0ZOQU1FXTsgfTtcblxudS5pZGVudGl0eSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg7IH07XG5cbnUudHJ1ZSA9IHUubmFtZWRmdW5jKCd0cnVlJywgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9KTtcblxudS5mYWxzZSA9IHUubmFtZWRmdW5jKCdmYWxzZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuXG51LmR1cGxpY2F0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn07XG5cbnUuZXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYik7XG59O1xuXG51LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICBmb3IgKHZhciB4LCBuYW1lLCBpPTEsIGxlbj1hcmd1bWVudHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgeCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKG5hbWUgaW4geCkgeyBvYmpbbmFtZV0gPSB4W25hbWVdOyB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbnUubGVuZ3RoID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHgubGVuZ3RoICE9IG51bGwgPyB4Lmxlbmd0aCA6IG51bGw7XG59O1xuXG51LmtleXMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXlzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSBrZXlzLnB1c2goayk7XG4gIHJldHVybiBrZXlzO1xufTtcblxudS52YWxzID0gZnVuY3Rpb24oeCkge1xuICB2YXIgdmFscyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkgdmFscy5wdXNoKHhba10pO1xuICByZXR1cm4gdmFscztcbn07XG5cbnUudG9NYXAgPSBmdW5jdGlvbihsaXN0LCBmKSB7XG4gIHJldHVybiAoZiA9IHUuJChmKSkgP1xuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialtmKHgpXSA9IDEsIG9iaik7IH0sIHt9KSA6XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW3hdID0gMSwgb2JqKTsgfSwge30pO1xufTtcblxudS5rZXlzdHIgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgLy8gdXNlIHRvIGVuc3VyZSBjb25zaXN0ZW50IGtleSBnZW5lcmF0aW9uIGFjcm9zcyBtb2R1bGVzXG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgaWYgKCFuKSByZXR1cm4gJyc7XG4gIGZvciAodmFyIHM9U3RyaW5nKHZhbHVlc1swXSksIGk9MTsgaTxuOyArK2kpIHtcbiAgICBzICs9ICd8JyArIFN0cmluZyh2YWx1ZXNbaV0pO1xuICB9XG4gIHJldHVybiBzO1xufTtcblxuLy8gdHlwZSBjaGVja2luZyBmdW5jdGlvbnNcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudS5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn07XG5cbnUuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudS5pc1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnUuaXNOdW1iZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59O1xuXG51LmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn07XG5cbnUuaXNEYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbn07XG5cbnUuaXNWYWxpZCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmo7XG59O1xuXG51LmlzQnVmZmVyID0gKGJ1ZmZlci5CdWZmZXIgJiYgYnVmZmVyLkJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbnUuZGF0ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBEYXRlLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgPyBKU09OLnN0cmluZ2lmeSh4KVxuICAgIDogdS5pc1N0cmluZyh4KSA/ICgnXFwnJyt1dGlsX2VzY2FwZV9zdHIoeCkrJ1xcJycpIDogeDtcbn07XG5cbnZhciBlc2NhcGVfc3RyX3JlID0gLyhefFteXFxcXF0pJy9nO1xuXG5mdW5jdGlvbiB1dGlsX2VzY2FwZV9zdHIoeCkge1xuICByZXR1cm4geC5yZXBsYWNlKGVzY2FwZV9zdHJfcmUsICckMVxcXFxcXCcnKTtcbn1cblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnUuZmllbGQgPSBmdW5jdGlvbihmKSB7XG4gIHJldHVybiBTdHJpbmcoZikuc3BsaXQoJ1xcXFwuJylcbiAgICAubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc3BsaXQoJy4nKTsgfSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLmxlbmd0aCkgeyBhW2EubGVuZ3RoLTFdICs9ICcuJyArIGIuc2hpZnQoKTsgfVxuICAgICAgYS5wdXNoLmFwcGx5KGEsIGIpO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwgW10pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiBmPT1udWxsIHx8IHUuaXNGdW5jdGlvbihmKSA/IGYgOlxuICAgIHUubmFtZWRmdW5jKGYsIChzID0gdS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBzLnJlZHVjZShmdW5jdGlvbih4LGYpIHsgcmV0dXJuIHhbZl07IH0sIHgpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHhbZl07IH1cbiAgICApO1xufTtcblxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxudS4kZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIG9wKSB7XG4gIHJldHVybiBmdW5jdGlvbihmKSB7XG4gICAgZiA9IHUuJChmKSB8fCB1LmlkZW50aXR5O1xuICAgIHZhciBuID0gbmFtZSArICh1Lm5hbWUoZikgPyAnXycrdS5uYW1lKGYpIDogJycpO1xuICAgIHJldHVybiB1Lm5hbWVkZnVuYyhuLCBmdW5jdGlvbihkKSB7IHJldHVybiBvcChmKGQpKTsgfSk7XG4gIH07XG59O1xuXG51LiR2YWxpZCAgPSB1LiRmdW5jKCd2YWxpZCcsIHUuaXNWYWxpZCk7XG51LiRsZW5ndGggPSB1LiRmdW5jKCdsZW5ndGgnLCB1Lmxlbmd0aCk7XG51LiR5ZWFyICAgPSB1LiRmdW5jKCd5ZWFyJywgdW5pdHMueWVhci51bml0KTtcbnUuJG1vbnRoICA9IHUuJGZ1bmMoJ21vbnRoJywgdW5pdHMubW9udGhPZlllYXIudW5pdCk7XG51LiRkYXRlICAgPSB1LiRmdW5jKCdkYXRlJywgdW5pdHMuZGF5T2ZNb250aC51bml0KTtcbnUuJGRheSAgICA9IHUuJGZ1bmMoJ2RheScsIHVuaXRzLmRheU9mV2Vlay51bml0KTtcbnUuJGhvdXIgICA9IHUuJGZ1bmMoJ2hvdXInLCB1bml0cy5ob3VyT2ZEYXkudW5pdCk7XG51LiRtaW51dGUgPSB1LiRmdW5jKCdtaW51dGUnLCB1bml0cy5taW51dGVPZkhvdXIudW5pdCk7XG5cbnUuJGluID0gZnVuY3Rpb24oZiwgdmFsdWVzKSB7XG4gIGYgPSB1LiQoZik7XG4gIHZhciBtYXAgPSB1LmlzQXJyYXkodmFsdWVzKSA/IHUudG9NYXAodmFsdWVzKSA6IHZhbHVlcztcbiAgcmV0dXJuIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICEhbWFwW2YoZCldOyB9O1xufTtcblxuLy8gY29tcGFyaXNvbiAvIHNvcnRpbmcgZnVuY3Rpb25zXG5cbnUuY29tcGFyYXRvciA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgdmFyIHNpZ24gPSBbXTtcbiAgaWYgKHNvcnQgPT09IHVuZGVmaW5lZCkgc29ydCA9IFtdO1xuICBzb3J0ID0gdS5hcnJheShzb3J0KS5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBzID0gMTtcbiAgICBpZiAgICAgIChmWzBdID09PSAnLScpIHsgcyA9IC0xOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIGVsc2UgaWYgKGZbMF0gPT09ICcrJykgeyBzID0gKzE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgc2lnbi5wdXNoKHMpO1xuICAgIHJldHVybiB1LmFjY2Vzc29yKGYpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsYikge1xuICAgIHZhciBpLCBuLCBmLCB4LCB5O1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07IHggPSBmKGEpOyB5ID0gZihiKTtcbiAgICAgIGlmICh4IDwgeSkgcmV0dXJuIC0xICogc2lnbltpXTtcbiAgICAgIGlmICh4ID4geSkgcmV0dXJuIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChhID4gYikge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGEgPj0gYikge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiBOYU47XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxuLy8gRVM2IGNvbXBhdGliaWxpdHkgcGVyIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9zdGFydHNXaXRoI1BvbHlmaWxsXG4vLyBXZSBjb3VsZCBoYXZlIHVzZWQgdGhlIHBvbHlmaWxsIGNvZGUsIGJ1dCBsZXRzIHdhaXQgdW50aWwgRVM2IGJlY29tZXMgYSBzdGFuZGFyZCBmaXJzdFxudS5zdGFydHNXaXRoID0gU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID9cbiAgZnVuY3Rpb24oc3RyaW5nLCBzZWFyY2hTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nKTtcbiAgfSA6XG4gIGZ1bmN0aW9uKHN0cmluZywgc2VhcmNoU3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sYXN0SW5kZXhPZihzZWFyY2hTdHJpbmcsIDApID09PSAwO1xuICB9O1xuXG51LnBhZCA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCBwYWRjaGFyKSB7XG4gIHBhZGNoYXIgPSBwYWRjaGFyIHx8IFwiIFwiO1xuICB2YXIgZCA9IGxlbmd0aCAtIHMubGVuZ3RoO1xuICBpZiAoZCA8PSAwKSByZXR1cm4gcztcbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBzdHJyZXAoZCwgcGFkY2hhcikgKyBzO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiBzdHJyZXAoTWF0aC5mbG9vcihkLzIpLCBwYWRjaGFyKSArXG4gICAgICAgICBzICsgc3RycmVwKE1hdGguY2VpbChkLzIpLCBwYWRjaGFyKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHMgKyBzdHJyZXAoZCwgcGFkY2hhcik7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0cnJlcChuLCBzdHIpIHtcbiAgdmFyIHMgPSBcIlwiLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHMgKz0gc3RyO1xuICByZXR1cm4gcztcbn1cblxudS50cnVuY2F0ZSA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCB3b3JkLCBlbGxpcHNpcykge1xuICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gIGlmIChsZW4gPD0gbGVuZ3RoKSByZXR1cm4gcztcbiAgZWxsaXBzaXMgPSBlbGxpcHNpcyAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKGVsbGlwc2lzKSA6ICdcXHUyMDI2JztcbiAgdmFyIGwgPSBNYXRoLm1heCgwLCBsZW5ndGggLSBlbGxpcHNpcy5sZW5ndGgpO1xuXG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCwxKSA6IHMuc2xpY2UobGVuLWwpKTtcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICB2YXIgbDEgPSBNYXRoLmNlaWwobC8yKSwgbDIgPSBNYXRoLmZsb29yKGwvMik7XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwxKSA6IHMuc2xpY2UoMCxsMSkpICtcbiAgICAgICAgZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDIsMSkgOiBzLnNsaWNlKGxlbi1sMikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwpIDogcy5zbGljZSgwLGwpKSArIGVsbGlwc2lzO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZU9uV29yZChzLCBsZW4sIHJldikge1xuICB2YXIgY250ID0gMCwgdG9rID0gcy5zcGxpdCh0cnVuY2F0ZV93b3JkX3JlKTtcbiAgaWYgKHJldikge1xuICAgIHMgPSAodG9rID0gdG9rLnJldmVyc2UoKSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KVxuICAgICAgLnJldmVyc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBzID0gdG9rLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pO1xuICB9XG4gIHJldHVybiBzLmxlbmd0aCA/IHMuam9pbignJykudHJpbSgpIDogdG9rWzBdLnNsaWNlKDAsIGxlbik7XG59XG5cbnZhciB0cnVuY2F0ZV93b3JkX3JlID0gLyhbXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTIwMjhcXHUyMDI5XFx1MzAwMFxcdUZFRkZdKS87XG4iXX0=
