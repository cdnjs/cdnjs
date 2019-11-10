(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.xstream = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var empty = {};
function noop() { }
var emptyListener = {
    _n: noop,
    _e: noop,
    _c: noop,
};
// mutates the input
function internalizeProducer(producer) {
    producer._start =
        function _start(il) {
            il.next = il._n;
            il.error = il._e;
            il.complete = il._c;
            this.start(il);
        };
    producer._stop = producer.stop;
}
function invoke(f, args) {
    switch (args.length) {
        case 0: return f();
        case 1: return f(args[0]);
        case 2: return f(args[0], args[1]);
        case 3: return f(args[0], args[1], args[2]);
        case 4: return f(args[0], args[1], args[2], args[3]);
        case 5: return f(args[0], args[1], args[2], args[3], args[4]);
        default: return f.apply(void 0, args);
    }
}
function compose2(f1, f2) {
    return function composedFn(arg) {
        return f1(f2(arg));
    };
}
var CombineListener = (function () {
    function CombineListener(i, prod) {
        this.i = i;
        this.prod = prod;
        prod.proxies.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var prod = this.prod;
        var vals = prod.vals;
        prod.hasVal[this.i] = true;
        vals[this.i] = t;
        if (!prod.ready) {
            prod.up();
        }
        if (prod.ready) {
            try {
                prod.out._n(invoke(prod.project, vals));
            }
            catch (e) {
                prod.out._e(e);
            }
        }
    };
    CombineListener.prototype._e = function (err) {
        this.prod.out._e(err);
    };
    CombineListener.prototype._c = function () {
        var prod = this.prod;
        if (--prod.ac === 0) {
            prod.out._c();
        }
    };
    return CombineListener;
}());
var CombineProducer = (function () {
    function CombineProducer(project, streams) {
        this.project = project;
        this.streams = streams;
        this.out = emptyListener;
        this.proxies = [];
        this.ready = false;
        this.vals = new Array(streams.length);
        this.hasVal = new Array(streams.length);
        this.ac = streams.length;
    }
    CombineProducer.prototype.up = function () {
        for (var i = this.hasVal.length - 1; i >= 0; i--) {
            if (!this.hasVal[i]) {
                return;
            }
        }
        this.ready = true;
    };
    CombineProducer.prototype._start = function (out) {
        this.out = out;
        var streams = this.streams;
        for (var i = streams.length - 1; i >= 0; i--) {
            streams[i]._add(new CombineListener(i, this));
        }
    };
    CombineProducer.prototype._stop = function () {
        var streams = this.streams;
        for (var i = streams.length - 1; i >= 0; i--) {
            streams[i]._remove(this.proxies[i]);
        }
        this.out = null;
        this.ac = streams.length;
        this.proxies = [];
        this.ready = false;
        this.vals = new Array(streams.length);
        this.hasVal = new Array(streams.length);
    };
    return CombineProducer;
}());
var FromArrayProducer = (function () {
    function FromArrayProducer(a) {
        this.a = a;
    }
    FromArrayProducer.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, l = a.length; i < l; i++) {
            out._n(a[i]);
        }
        out._c();
    };
    FromArrayProducer.prototype._stop = function () {
    };
    return FromArrayProducer;
}());
var FromPromiseProducer = (function () {
    function FromPromiseProducer(p) {
        this.p = p;
        this.on = false;
    }
    FromPromiseProducer.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(null, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromiseProducer.prototype._stop = function () {
        this.on = false;
    };
    return FromPromiseProducer;
}());
var MergeProducer = (function () {
    function MergeProducer(streams) {
        this.streams = streams;
        this.out = emptyListener;
        this.ac = streams.length;
    }
    MergeProducer.prototype._start = function (out) {
        this.out = out;
        var streams = this.streams;
        for (var i = streams.length - 1; i >= 0; i--) {
            streams[i]._add(this);
        }
    };
    MergeProducer.prototype._stop = function () {
        var streams = this.streams;
        for (var i = streams.length - 1; i >= 0; i--) {
            streams[i]._remove(this);
        }
        this.out = null;
        this.ac = streams.length;
    };
    MergeProducer.prototype._n = function (t) {
        this.out._n(t);
    };
    MergeProducer.prototype._e = function (err) {
        this.out._e(err);
    };
    MergeProducer.prototype._c = function () {
        if (--this.ac === 0) {
            this.out._c();
        }
    };
    return MergeProducer;
}());
var PeriodicProducer = (function () {
    function PeriodicProducer(period) {
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    PeriodicProducer.prototype._start = function (stream) {
        var self = this;
        function intervalHandler() { stream._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    PeriodicProducer.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return PeriodicProducer;
}());
var DebugOperator = (function () {
    function DebugOperator(spy, ins) {
        if (spy === void 0) { spy = null; }
        this.spy = spy;
        this.ins = ins;
        this.out = null;
    }
    DebugOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DebugOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    DebugOperator.prototype._n = function (t) {
        if (this.spy) {
            try {
                this.spy(t);
            }
            catch (e) {
                this.out._e(e);
            }
        }
        else {
            console.log(t);
        }
        this.out._n(t);
    };
    DebugOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    DebugOperator.prototype._c = function () {
        this.out._c();
    };
    return DebugOperator;
}());
var DropOperator = (function () {
    function DropOperator(max, ins) {
        this.max = max;
        this.ins = ins;
        this.out = null;
        this.dropped = 0;
    }
    DropOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DropOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.dropped = 0;
    };
    DropOperator.prototype._n = function (t) {
        if (this.dropped++ >= this.max)
            this.out._n(t);
    };
    DropOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    DropOperator.prototype._c = function () {
        this.out._c();
    };
    return DropOperator;
}());
var OtherListener = (function () {
    function OtherListener(out, op) {
        this.out = out;
        this.op = op;
    }
    OtherListener.prototype._n = function (t) {
        this.op.end();
    };
    OtherListener.prototype._e = function (err) {
        this.out._e(err);
    };
    OtherListener.prototype._c = function () {
        this.op.end();
    };
    return OtherListener;
}());
var EndWhenOperator = (function () {
    function EndWhenOperator(o, // o = other
        ins) {
        this.o = o;
        this.ins = ins;
        this.out = null;
        this.oli = emptyListener; // oli = other listener
    }
    EndWhenOperator.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oli = new OtherListener(out, this));
        this.ins._add(this);
    };
    EndWhenOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oli);
        this.out = null;
        this.oli = null;
    };
    EndWhenOperator.prototype.end = function () {
        this.out._c();
    };
    EndWhenOperator.prototype._n = function (t) {
        this.out._n(t);
    };
    EndWhenOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenOperator.prototype._c = function () {
        this.end();
    };
    return EndWhenOperator;
}());
var FilterOperator = (function () {
    function FilterOperator(predicate, ins) {
        this.predicate = predicate;
        this.ins = ins;
        this.out = null;
    }
    FilterOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FilterOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    FilterOperator.prototype._n = function (t) {
        try {
            if (this.predicate(t))
                this.out._n(t);
        }
        catch (e) {
            this.out._e(e);
        }
    };
    FilterOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    FilterOperator.prototype._c = function () {
        this.out._c();
    };
    return FilterOperator;
}());
var FCInner = (function () {
    function FCInner(out, op) {
        this.out = out;
        this.op = op;
    }
    FCInner.prototype._n = function (t) {
        this.out._n(t);
    };
    FCInner.prototype._e = function (err) {
        this.out._e(err);
    };
    FCInner.prototype._c = function () {
        this.op.less();
    };
    return FCInner;
}());
var FlattenConcOperator = (function () {
    function FlattenConcOperator(ins) {
        this.ins = ins;
        this.active = 1; // number of outers and inners that have not yet ended
        this.out = null;
    }
    FlattenConcOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FlattenConcOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.active = 1;
        this.out = null;
    };
    FlattenConcOperator.prototype.less = function () {
        if (--this.active === 0) {
            this.out._c();
        }
    };
    FlattenConcOperator.prototype._n = function (s) {
        this.active++;
        s._add(new FCInner(this.out, this));
    };
    FlattenConcOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenConcOperator.prototype._c = function () {
        this.less();
    };
    return FlattenConcOperator;
}());
exports.FlattenConcOperator = FlattenConcOperator;
var FInner = (function () {
    function FInner(out, op) {
        this.out = out;
        this.op = op;
    }
    FInner.prototype._n = function (t) {
        this.out._n(t);
    };
    FInner.prototype._e = function (err) {
        this.out._e(err);
    };
    FInner.prototype._c = function () {
        this.op.curr = null;
        this.op.less();
    };
    return FInner;
}());
var FlattenOperator = (function () {
    function FlattenOperator(ins) {
        this.ins = ins;
        this.curr = null; // Current inner Stream
        this.inner = null; // Current inner InternalListener
        this.open = true;
        this.out = null;
    }
    FlattenOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FlattenOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.curr = null;
        this.inner = null;
        this.open = true;
        this.out = null;
    };
    FlattenOperator.prototype.cut = function () {
        var _a = this, curr = _a.curr, inner = _a.inner;
        if (curr && inner) {
            curr._remove(inner);
        }
    };
    FlattenOperator.prototype.less = function () {
        if (!this.open && !this.curr) {
            this.out._c();
        }
    };
    FlattenOperator.prototype._n = function (s) {
        this.cut();
        (this.curr = s)._add(this.inner = new FInner(this.out, this));
    };
    FlattenOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenOperator.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return FlattenOperator;
}());
exports.FlattenOperator = FlattenOperator;
var FoldOperator = (function () {
    function FoldOperator(f, seed, ins) {
        this.f = f;
        this.seed = seed;
        this.ins = ins;
        this.out = null;
        this.acc = seed;
    }
    FoldOperator.prototype._start = function (out) {
        this.out = out;
        out._n(this.acc);
        this.ins._add(this);
    };
    FoldOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.acc = this.seed;
    };
    FoldOperator.prototype._n = function (t) {
        try {
            this.out._n(this.acc = this.f(this.acc, t));
        }
        catch (e) {
            this.out._e(e);
        }
    };
    FoldOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    FoldOperator.prototype._c = function () {
        this.out._c();
    };
    return FoldOperator;
}());
var LastOperator = (function () {
    function LastOperator(ins) {
        this.ins = ins;
        this.out = null;
        this.has = false;
        this.val = empty;
    }
    LastOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    LastOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.has = false;
        this.val = empty;
    };
    LastOperator.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    LastOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    LastOperator.prototype._c = function () {
        var out = this.out;
        if (this.has) {
            out._n(this.val);
            out._c();
        }
        else {
            out._e('TODO show proper error');
        }
    };
    return LastOperator;
}());
var MFCInner = (function () {
    function MFCInner(out, op) {
        this.out = out;
        this.op = op;
    }
    MFCInner.prototype._n = function (t) {
        this.out._n(t);
    };
    MFCInner.prototype._e = function (err) {
        this.out._e(err);
    };
    MFCInner.prototype._c = function () {
        this.op.less();
    };
    return MFCInner;
}());
var MapFlattenConcOperator = (function () {
    function MapFlattenConcOperator(mapOp) {
        this.mapOp = mapOp;
        this.active = 1; // number of outers and inners that have not yet ended
        this.out = null;
    }
    MapFlattenConcOperator.prototype._start = function (out) {
        this.out = out;
        this.mapOp.ins._add(this);
    };
    MapFlattenConcOperator.prototype._stop = function () {
        this.mapOp.ins._remove(this);
        this.active = 1;
        this.out = null;
    };
    MapFlattenConcOperator.prototype.less = function () {
        if (--this.active === 0) {
            this.out._c();
        }
    };
    MapFlattenConcOperator.prototype._n = function (v) {
        this.active++;
        try {
            this.mapOp.project(v)._add(new MFCInner(this.out, this));
        }
        catch (e) {
            this.out._e(e);
        }
    };
    MapFlattenConcOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    MapFlattenConcOperator.prototype._c = function () {
        this.less();
    };
    return MapFlattenConcOperator;
}());
var MFInner = (function () {
    function MFInner(out, op) {
        this.out = out;
        this.op = op;
    }
    MFInner.prototype._n = function (t) {
        this.out._n(t);
    };
    MFInner.prototype._e = function (err) {
        this.out._e(err);
    };
    MFInner.prototype._c = function () {
        this.op.curr = null;
        this.op.less();
    };
    return MFInner;
}());
var MapFlattenOperator = (function () {
    function MapFlattenOperator(mapOp) {
        this.mapOp = mapOp;
        this.curr = null; // Current inner Stream
        this.inner = null; // Current inner InternalListener
        this.open = true;
        this.out = null;
    }
    MapFlattenOperator.prototype._start = function (out) {
        this.out = out;
        this.mapOp.ins._add(this);
    };
    MapFlattenOperator.prototype._stop = function () {
        this.mapOp.ins._remove(this);
        this.curr = null;
        this.inner = null;
        this.open = true;
        this.out = null;
    };
    MapFlattenOperator.prototype.cut = function () {
        var _a = this, curr = _a.curr, inner = _a.inner;
        if (curr && inner) {
            curr._remove(inner);
        }
    };
    MapFlattenOperator.prototype.less = function () {
        if (!this.open && !this.curr) {
            this.out._c();
        }
    };
    MapFlattenOperator.prototype._n = function (v) {
        this.cut();
        try {
            (this.curr = this.mapOp.project(v))._add(this.inner = new MFInner(this.out, this));
        }
        catch (e) {
            this.out._e(e);
        }
    };
    MapFlattenOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    MapFlattenOperator.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return MapFlattenOperator;
}());
var MapOperator = (function () {
    function MapOperator(project, ins) {
        this.project = project;
        this.ins = ins;
        this.out = null;
    }
    MapOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    MapOperator.prototype._n = function (t) {
        try {
            this.out._n(this.project(t));
        }
        catch (e) {
            this.out._e(e);
        }
    };
    MapOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    MapOperator.prototype._c = function () {
        this.out._c();
    };
    return MapOperator;
}());
var FilterMapOperator = (function (_super) {
    __extends(FilterMapOperator, _super);
    function FilterMapOperator(predicate, project, ins) {
        _super.call(this, project, ins);
        this.predicate = predicate;
    }
    FilterMapOperator.prototype._n = function (v) {
        if (this.predicate(v)) {
            _super.prototype._n.call(this, v);
        }
        ;
    };
    return FilterMapOperator;
}(MapOperator));
var MapToOperator = (function () {
    function MapToOperator(val, ins) {
        this.val = val;
        this.ins = ins;
        this.out = null;
    }
    MapToOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapToOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    MapToOperator.prototype._n = function (t) {
        this.out._n(this.val);
    };
    MapToOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    MapToOperator.prototype._c = function () {
        this.out._c();
    };
    return MapToOperator;
}());
var ReplaceErrorOperator = (function () {
    function ReplaceErrorOperator(fn, ins) {
        this.fn = fn;
        this.ins = ins;
        this.out = empty;
    }
    ReplaceErrorOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceErrorOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    ReplaceErrorOperator.prototype._n = function (t) {
        this.out._n(t);
    };
    ReplaceErrorOperator.prototype._e = function (err) {
        try {
            this.ins._remove(this);
            (this.ins = this.fn(err))._add(this);
        }
        catch (e) {
            this.out._e(e);
        }
    };
    ReplaceErrorOperator.prototype._c = function () {
        this.out._c();
    };
    return ReplaceErrorOperator;
}());
var StartWithOperator = (function () {
    function StartWithOperator(ins, value) {
        this.ins = ins;
        this.value = value;
        this.out = emptyListener;
    }
    StartWithOperator.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.value);
        this.ins._add(out);
    };
    StartWithOperator.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = null;
    };
    return StartWithOperator;
}());
var TakeOperator = (function () {
    function TakeOperator(max, ins) {
        this.max = max;
        this.ins = ins;
        this.out = null;
        this.taken = 0;
    }
    TakeOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    TakeOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.taken = 0;
    };
    TakeOperator.prototype._n = function (t) {
        var out = this.out;
        if (this.taken++ < this.max - 1) {
            out._n(t);
        }
        else {
            out._n(t);
            out._c();
            this._stop();
        }
    };
    TakeOperator.prototype._e = function (err) {
        this.out._e(err);
    };
    TakeOperator.prototype._c = function () {
        this.out._c();
    };
    return TakeOperator;
}());
var Stream = (function () {
    function Stream(producer) {
        this._stopID = empty;
        this.combine = function combine(project) {
            var streams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                streams[_i - 1] = arguments[_i];
            }
            streams.unshift(this);
            return Stream.combine.apply(Stream, [project].concat(streams));
        };
        this._prod = producer;
        this._ils = [];
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var len = a.length;
        if (len === 1) {
            a[0]._n(t);
        }
        else {
            for (var i = 0; i < len; i++) {
                a[i]._n(t);
            }
        }
    };
    Stream.prototype._e = function (err) {
        var a = this._ils;
        var len = a.length;
        if (len === 1) {
            a[0]._e(err);
        }
        else {
            for (var i = 0; i < len; i++) {
                a[i]._e(err);
            }
        }
        this._x();
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var len = a.length;
        if (len === 1) {
            a[0]._c();
        }
        else {
            for (var i = 0; i < len; i++) {
                a[i]._c();
            }
        }
        this._x();
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod)
            this._prod._stop();
        this._ils = [];
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next;
        listener._e = listener.error;
        listener._c = listener.complete;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    Stream.prototype._add = function (il) {
        var a = this._ils;
        a.push(il);
        if (a.length === 1) {
            if (this._stopID !== empty) {
                clearTimeout(this._stopID);
                this._stopID = empty;
            }
            var p = this._prod;
            if (p)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            var p_1 = this._prod;
            if (p_1 && a.length <= 0) {
                this._stopID = setTimeout(function () { return p_1._stop(); });
            }
        }
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer) {
            internalizeProducer(producer); // mutates the input
        }
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    Stream.throw = function (err) {
        return new Stream({
            _start: function (il) { il._e(err); },
            _stop: noop,
        });
    };
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    Stream.fromArray = function (array) {
        return new Stream(new FromArrayProducer(array));
    };
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromiseProducer(promise));
    };
    Stream.periodic = function (period) {
        return new Stream(new PeriodicProducer(period));
    };
    Stream.merge = function () {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i - 0] = arguments[_i];
        }
        return new Stream(new MergeProducer(streams));
    };
    /**
     * Transform each event from the input Stream through a `project` function, to
     * get a Stream that emits those transformed events.
     *
     * Marble diagram:
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        var p = this._prod;
        if (p instanceof FilterOperator) {
            return new Stream(new FilterMapOperator(p.predicate, project, p.ins));
        }
        if (p instanceof FilterMapOperator) {
            return new Stream(new FilterMapOperator(p.predicate, compose2(project, p.project), p.ins));
        }
        if (p instanceof MapOperator) {
            return new Stream(new MapOperator(compose2(project, p.project), p.ins));
        }
        return new Stream(new MapOperator(project, this));
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        return new Stream(new MapToOperator(projectedValue, this));
    };
    Stream.prototype.filter = function (predicate) {
        var p = this._prod;
        if (p instanceof MapOperator) {
            return new Stream(new FilterMapOperator(predicate, p.project, p.ins));
        }
        if (p instanceof FilterMapOperator) {
            return new Stream(new FilterMapOperator(compose2(predicate, p.predicate), p.project, p.ins));
        }
        if (p instanceof FilterOperator) {
            return new Stream(new FilterOperator(compose2(predicate, p.predicate), p.ins));
        }
        return new Stream(new FilterOperator(predicate, this));
    };
    Stream.prototype.take = function (amount) {
        return new Stream(new TakeOperator(amount, this));
    };
    Stream.prototype.drop = function (amount) {
        return new Stream(new DropOperator(amount, this));
    };
    Stream.prototype.last = function () {
        return new Stream(new LastOperator(this));
    };
    Stream.prototype.startWith = function (x) {
        return new Stream(new StartWithOperator(this, x));
    };
    Stream.prototype.endWhen = function (other) {
        return new Stream(new EndWhenOperator(other, this));
    };
    Stream.prototype.fold = function (accumulate, init) {
        return new Stream(new FoldOperator(accumulate, init, this));
    };
    Stream.prototype.replaceError = function (replace) {
        return new Stream(new ReplaceErrorOperator(replace, this));
    };
    Stream.prototype.flatten = function () {
        var p = this._prod;
        return new Stream(p instanceof MapOperator || p instanceof FilterMapOperator ?
            new MapFlattenOperator(p) :
            new FlattenOperator(this));
    };
    Stream.prototype.flattenConcurrently = function () {
        var p = this._prod;
        return new Stream(p instanceof MapOperator || p instanceof FilterMapOperator ?
            new MapFlattenConcOperator(p) :
            new FlattenConcOperator(this));
    };
    Stream.prototype.merge = function (other) {
        return Stream.merge(this, other);
    };
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    Stream.prototype.remember = function () {
        return new MemoryStream(this._prod);
    };
    Stream.prototype.imitate = function (other) {
        other._add(this);
    };
    Stream.prototype.debug = function (spy) {
        if (spy === void 0) { spy = null; }
        return new Stream(new DebugOperator(spy, this));
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    Stream.combine = function combine(project) {
        var streams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            streams[_i - 1] = arguments[_i];
        }
        return new Stream(new CombineProducer(project, streams));
    };
    return Stream;
}());
exports.Stream = Stream;
var MemoryStream = (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        _super.call(this, producer);
        this._has = false;
    }
    MemoryStream.prototype._n = function (x) {
        this._val = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (listener) {
        if (this._has) {
            listener._n(this._val);
        }
        _super.prototype._add.call(this, listener);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stream;

},{}],2:[function(require,module,exports){
"use strict";
var core_1 = require('./core');
exports.Stream = core_1.Stream;
exports.MemoryStream = core_1.MemoryStream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = core_1.Stream;

},{"./core":1}]},{},[2])(2)
});