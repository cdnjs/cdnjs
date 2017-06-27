if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/io-queue/io-queue.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/io-queue/io-queue.js",
    code: []
};
_yuitest_coverage["/build/io-queue/io-queue.js"].code=["YUI.add('io-queue', function(Y) {","","/**","Extends IO to implement Queue for synchronous","transaction processing.","@module io","@submodule io-queue","@for IO","**/","var io = Y.io._map['io:0'] || new Y.IO();","","Y.mix(Y.IO.prototype, {","   /**","    * Array of transactions queued for processing","    *","    * @property _q","    * @private","    * @static","    * @type {Object}","    */","    _q: new Y.Queue(),","    _qActiveId: null,","    _qInit: false,","   /**","    * Property to determine whether the queue is set to","    * 1 (active) or 0 (inactive).  When inactive, transactions","    * will be stored in the queue until the queue is set to active.","    *","    * @property _qState","    * @private","    * @static","    * @type {Number}","    */","    _qState: 1,","","   /**","    * Method Process the first transaction from the","    * queue in FIFO order.","    *","    * @method _qShift","    * @private","    * @static","    */","    _qShift: function() {","        var io = this,","            o = io._q.next();","","        io._qActiveId = o.id;","        io._qState = 0;","        io.send(o.uri, o.cfg, o.id);","    },","","   /**","    * Method for queueing a transaction before the request is sent to the","    * resource, to ensure sequential processing.","    *","    * @method queue","    * @static","    * @return {Object}","    */","    queue: function(uri, c) {","        var io = this,","            o = { uri: uri, cfg:c, id: this._id++ };","","        if(!io._qInit) {","            Y.on('io:complete', function(id, o) { io._qNext(id); }, io);","            io._qInit = true;","        }","","        io._q.add(o);","        if (io._qState === 1) {","            io._qShift();","        }","","        return o;","    },","","    _qNext: function(id) {","        var io = this;","        io._qState = 1;","        if (io._qActiveId === id && io._q.size() > 0) {","            io._qShift();","        }","    },","","   /**","    * Method for promoting a transaction to the top of the queue.","    *","    * @method promote","    * @static","    */","    qPromote: function(o) {","        this._q.promote(o);","    },","","   /**","    * Method for removing a specific, pending transaction from","    * the queue.","    *","    * @method remove","    * @private","    * @static","    */","    qRemove: function(o) {","        this._q.remove(o);","    },","","    qStart: function() {","        var io = this;","        io._qState = 1;","","        if (io._q.size() > 0) {","            io._qShift();","        }","    },","","   /**","    * Method for setting queue processing to inactive.","    * Transaction requests to YUI.io.queue() will be stored in the queue, but","    * not processed until the queue is reset to \"active\".","    *","    * @method _stop","    * @private","    * @static","    */","    qStop: function() {","        this._qState = 0;","    },","","   /**","    * Method to query the current size of the queue.","    *","    * @method _size","    * @private","    * @static","    * @return {Number}","    */","    qSize: function() {","        return this._q.size();","    }","","}, true);","","function _queue(u, c) {","    return io.queue.apply(io, [u, c]);","}","","_queue.start = function () { io.qStart(); };","_queue.stop = function () { io.qStop(); };","_queue.promote = function (o) { io.qPromote(o); };","_queue.remove = function (o) { io.qRemove(o); };","_queue.size = function () { io.qSize(); };","Y.io.queue = _queue;","","","}, '@VERSION@' ,{requires:['io-base','queue-promote']});"];
_yuitest_coverage["/build/io-queue/io-queue.js"].lines = {"1":0,"10":0,"12":0,"45":0,"48":0,"49":0,"50":0,"62":0,"65":0,"66":0,"67":0,"70":0,"71":0,"72":0,"75":0,"79":0,"80":0,"81":0,"82":0,"93":0,"105":0,"109":0,"110":0,"112":0,"113":0,"127":0,"139":0,"144":0,"145":0,"148":0,"149":0,"150":0,"151":0,"152":0,"153":0};
_yuitest_coverage["/build/io-queue/io-queue.js"].functions = {"_qShift:44":0,"(anonymous 2):66":0,"queue:61":0,"_qNext:78":0,"qPromote:92":0,"qRemove:104":0,"qStart:108":0,"qStop:126":0,"qSize:138":0,"_queue:144":0,"start:148":0,"stop:149":0,"promote:150":0,"remove:151":0,"size:152":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/io-queue/io-queue.js"].coveredLines = 35;
_yuitest_coverage["/build/io-queue/io-queue.js"].coveredFunctions = 16;
_yuitest_coverline("/build/io-queue/io-queue.js", 1);
YUI.add('io-queue', function(Y) {

/**
Extends IO to implement Queue for synchronous
transaction processing.
@module io
@submodule io-queue
@for IO
**/
_yuitest_coverfunc("/build/io-queue/io-queue.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/io-queue/io-queue.js", 10);
var io = Y.io._map['io:0'] || new Y.IO();

_yuitest_coverline("/build/io-queue/io-queue.js", 12);
Y.mix(Y.IO.prototype, {
   /**
    * Array of transactions queued for processing
    *
    * @property _q
    * @private
    * @static
    * @type {Object}
    */
    _q: new Y.Queue(),
    _qActiveId: null,
    _qInit: false,
   /**
    * Property to determine whether the queue is set to
    * 1 (active) or 0 (inactive).  When inactive, transactions
    * will be stored in the queue until the queue is set to active.
    *
    * @property _qState
    * @private
    * @static
    * @type {Number}
    */
    _qState: 1,

   /**
    * Method Process the first transaction from the
    * queue in FIFO order.
    *
    * @method _qShift
    * @private
    * @static
    */
    _qShift: function() {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "_qShift", 44);
_yuitest_coverline("/build/io-queue/io-queue.js", 45);
var io = this,
            o = io._q.next();

        _yuitest_coverline("/build/io-queue/io-queue.js", 48);
io._qActiveId = o.id;
        _yuitest_coverline("/build/io-queue/io-queue.js", 49);
io._qState = 0;
        _yuitest_coverline("/build/io-queue/io-queue.js", 50);
io.send(o.uri, o.cfg, o.id);
    },

   /**
    * Method for queueing a transaction before the request is sent to the
    * resource, to ensure sequential processing.
    *
    * @method queue
    * @static
    * @return {Object}
    */
    queue: function(uri, c) {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "queue", 61);
_yuitest_coverline("/build/io-queue/io-queue.js", 62);
var io = this,
            o = { uri: uri, cfg:c, id: this._id++ };

        _yuitest_coverline("/build/io-queue/io-queue.js", 65);
if(!io._qInit) {
            _yuitest_coverline("/build/io-queue/io-queue.js", 66);
Y.on('io:complete', function(id, o) { _yuitest_coverfunc("/build/io-queue/io-queue.js", "(anonymous 2)", 66);
io._qNext(id); }, io);
            _yuitest_coverline("/build/io-queue/io-queue.js", 67);
io._qInit = true;
        }

        _yuitest_coverline("/build/io-queue/io-queue.js", 70);
io._q.add(o);
        _yuitest_coverline("/build/io-queue/io-queue.js", 71);
if (io._qState === 1) {
            _yuitest_coverline("/build/io-queue/io-queue.js", 72);
io._qShift();
        }

        _yuitest_coverline("/build/io-queue/io-queue.js", 75);
return o;
    },

    _qNext: function(id) {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "_qNext", 78);
_yuitest_coverline("/build/io-queue/io-queue.js", 79);
var io = this;
        _yuitest_coverline("/build/io-queue/io-queue.js", 80);
io._qState = 1;
        _yuitest_coverline("/build/io-queue/io-queue.js", 81);
if (io._qActiveId === id && io._q.size() > 0) {
            _yuitest_coverline("/build/io-queue/io-queue.js", 82);
io._qShift();
        }
    },

   /**
    * Method for promoting a transaction to the top of the queue.
    *
    * @method promote
    * @static
    */
    qPromote: function(o) {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "qPromote", 92);
_yuitest_coverline("/build/io-queue/io-queue.js", 93);
this._q.promote(o);
    },

   /**
    * Method for removing a specific, pending transaction from
    * the queue.
    *
    * @method remove
    * @private
    * @static
    */
    qRemove: function(o) {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "qRemove", 104);
_yuitest_coverline("/build/io-queue/io-queue.js", 105);
this._q.remove(o);
    },

    qStart: function() {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "qStart", 108);
_yuitest_coverline("/build/io-queue/io-queue.js", 109);
var io = this;
        _yuitest_coverline("/build/io-queue/io-queue.js", 110);
io._qState = 1;

        _yuitest_coverline("/build/io-queue/io-queue.js", 112);
if (io._q.size() > 0) {
            _yuitest_coverline("/build/io-queue/io-queue.js", 113);
io._qShift();
        }
    },

   /**
    * Method for setting queue processing to inactive.
    * Transaction requests to YUI.io.queue() will be stored in the queue, but
    * not processed until the queue is reset to "active".
    *
    * @method _stop
    * @private
    * @static
    */
    qStop: function() {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "qStop", 126);
_yuitest_coverline("/build/io-queue/io-queue.js", 127);
this._qState = 0;
    },

   /**
    * Method to query the current size of the queue.
    *
    * @method _size
    * @private
    * @static
    * @return {Number}
    */
    qSize: function() {
        _yuitest_coverfunc("/build/io-queue/io-queue.js", "qSize", 138);
_yuitest_coverline("/build/io-queue/io-queue.js", 139);
return this._q.size();
    }

}, true);

_yuitest_coverline("/build/io-queue/io-queue.js", 144);
function _queue(u, c) {
    _yuitest_coverfunc("/build/io-queue/io-queue.js", "_queue", 144);
_yuitest_coverline("/build/io-queue/io-queue.js", 145);
return io.queue.apply(io, [u, c]);
}

_yuitest_coverline("/build/io-queue/io-queue.js", 148);
_queue.start = function () { _yuitest_coverfunc("/build/io-queue/io-queue.js", "start", 148);
io.qStart(); };
_yuitest_coverline("/build/io-queue/io-queue.js", 149);
_queue.stop = function () { _yuitest_coverfunc("/build/io-queue/io-queue.js", "stop", 149);
io.qStop(); };
_yuitest_coverline("/build/io-queue/io-queue.js", 150);
_queue.promote = function (o) { _yuitest_coverfunc("/build/io-queue/io-queue.js", "promote", 150);
io.qPromote(o); };
_yuitest_coverline("/build/io-queue/io-queue.js", 151);
_queue.remove = function (o) { _yuitest_coverfunc("/build/io-queue/io-queue.js", "remove", 151);
io.qRemove(o); };
_yuitest_coverline("/build/io-queue/io-queue.js", 152);
_queue.size = function () { _yuitest_coverfunc("/build/io-queue/io-queue.js", "size", 152);
io.qSize(); };
_yuitest_coverline("/build/io-queue/io-queue.js", 153);
Y.io.queue = _queue;


}, '@VERSION@' ,{requires:['io-base','queue-promote']});
