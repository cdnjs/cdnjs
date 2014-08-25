/**
 * @file Represents stream that handles Salesforce record as stream data
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = require('events'),
    stream = require('stream'),
    Stream = stream.Stream,
    util   = require('util'),
    _      = require('underscore'),
    CSV    = require('./csv');

/**
 * Class for Record Stream
 *
 * @abstract
 * @class
 * @constructor
 * @extends events.EventEmitter
 */
var RecordStream = module.exports = function() {
  this.sendable = false;
  this.receivable = false;
  this.on('error', function() {
    this.sendable = false;
    this.recievable = false;
  });
  this.on('end', function() {
    this.recievable = false;
  });
};

util.inherits(RecordStream, events.EventEmitter);


/*--- Output Record Stream methods (Sendable) ---*/

/**
 * Output record into stream.
 * 
 * @param {Record} record - Record object
 */
RecordStream.prototype.send = function(record) {
  // abstract
};

/**
 * End sending records into stream. 
 */
RecordStream.prototype.end = function() {
  this.sendable = false;
};

/**
 * Destroy record stream;
 */
RecordStream.prototype.destroy = function() {
  this.reciebable = false;
  this.sendable = false;
};

/**
 * Destroy record stream after all record submission in the queue;
 */
RecordStream.prototype.destroySoon = function() {
  //
};


/*--- Input Record Stream methods (Receivable) ---*/

/*
 * Pause record fetch
 * @abstract
 */
RecordStream.prototype.pause = function() {
  // abstract
};

/**
 * Resume record fetch and query execution
 * @abstract
 */
RecordStream.prototype.resume = function() {
  // abstract
};

/**
 * Streaming pipe for record manipulation
 * Originally from Node.js's Stream#pipe 
 * https://github.com/joyent/node/blob/master/lib/stream.js
 *
 * @param {RecordStream} dest - Destination output stream for records
 * @param {Object} [options]
 * @returns {RecordStream}
 */
RecordStream.prototype.pipe = function (dest, options) {
  var source = this;

  var onRecord = function(record) {
    if (dest.send && false === dest.send(record)) { source.pause(); }
  };

  source.on('record', onRecord);

  var onDrain = function() { source.resume(); };

  dest.on('drain', onDrain);

  var didOnEnd = false;
  var onEnd = function() {
    if (didOnEnd) { return; }
    didOnEnd = true;
    dest.end();
  };

  var onClose = function() {
    if (didOnEnd) { return; }
    didOnEnd = true;
    if (typeof dest.destroy === 'function') { dest.destroy(); }
  };

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!options || options.end !== false) {
    source.on('end', onEnd);
    source.on('close', onClose);
  }

  // don't leave dangling pipes when there are errors.
  var onError = function(err) {
    cleanup();
    if (this.listeners('error').length === 0) {
      throw err; // Unhandled stream error in pipe.
    }
  };

  source.on('error', onError);
  dest.on('error', onError);

  // remove all the event listeners that were added.
  var cleanup = function() {
    source.removeListener('record', onRecord);
    dest.removeListener('drain', onDrain);

    source.removeListener('end', onEnd);
    source.removeListener('close', onClose);

    source.removeListener('error', onError);
    dest.removeListener('error', onError);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('end', cleanup);
    dest.removeListener('close', cleanup);
  };

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/**
 * Mapping incoming record from upstream, and pass to downstream
 *
 * @param {RecordMapFunction} fn - Record mapping function
 * @returns {RecordStream}
 */
RecordStream.prototype.map = function(fn) {
  return this.pipe(RecordStream.map(fn));
};

/**
 * Filtering incoming record from upstream, and pass to downstream
 *
 * @param {RecordFilterFunction} fn - Record filtering function
 * @returns {RecordStream}
 */
RecordStream.prototype.filter = function(fn) {
  return this.pipe(RecordStream.filter(fn));
};

/**
 * Create Node.js stream instance for serializing/deserialize records
 *
 * @returns {stream.Stream}
 */
RecordStream.prototype.stream = function(type) {
  type = type || 'csv';
  var recStream;
  if (type === "csv") {
    recStream = new RecordStream.CSVStream();
  }
  if (!recStream) {
    throw new Error("No stream type defined for '"+type+"'.");
  }
  if (this.receivable) {
    this.pipe(recStream);
  } else if (this.sendable) {
    recStream.pipe(this);
  }
  return recStream.stream(); // get Node.js stream instance
};

/* --------------------------------------------------- */

/**
 * @callback RecordMapFunction
 * @param {Record} record - Source record to map
 * @returns {Record}
 */

/**
 * Create a record stream which maps records and pass them to downstream
 *
 * @param {RecordMapFunction} fn - Record mapping function
 * @returns {RecordStream}
 */
RecordStream.map = function(fn) {
  var rstream = new RecordStream();
  rstream.receivable = true;
  rstream.send = function(record) {
    var rec = fn(record) || record; // if not returned record, use same record
    this.emit('record', rec);
  };
  rstream.end = function() {
    this.emit('end');
  };
  return rstream;
};

/**
 * Create mapping stream using given record template
 *
 * @param {Record} record - Mapping record object. In mapping field value, temlate notation can be used to refer field value in source record, if noeval param is not true.
 * @param {Boolean} [noeval] - Disable template evaluation in mapping record.
 * @returns {RecordStream}
 */
RecordStream.recordMapStream = function(record, noeval) {
  return RecordStream.map(function(rec) {
    var mapped = { Id: rec.Id };
    for (var prop in record) {
      mapped[prop] = noeval ? record[prop] : evalMapping(record[prop], rec);
    }
    return mapped;
  });

  function evalMapping(value, mapping) {
    if (_.isString(value)) {
      var m = /^\$\{(\w+)\}$/.exec(value);
      if (m) { return mapping[m[1]]; }
      return value.replace(/\$\{(\w+)\}/g, function($0, prop) {
        var v = mapping[prop];
        return _.isNull(v) || _.isUndefined(v) ? "" : String(v);
      });
    } else {
      return value;
    }
  }
};

/**
 * @callback RecordFilterFunction
 * @param {Record} record - Source record to filter
 * @returns {Boolean}
 */

/**
 * Create a record stream which filters records and pass them to downstream
 *
 * @param {RecordFilterFunction} fn - Record filtering function
 * @returns {RecordStream}
 */
RecordStream.filter = function(fn) {
  var rstream = new RecordStream();
  rstream.receivable = true;
  rstream.send = function(record) {
    if (fn(record)) {
      this.emit('record', record);
    }
  };
  rstream.end = function() {
    this.emit('end');
  };
  return rstream;
};


/* --------------------------------------------------- */

/**
 * CSVStream (extends RecordStream implements Receivable, Sendable)
 *
 * @protected
 * @class RecordStream.CSVStream
 * @extends RecordStream
 */
var CSVStream = RecordStream.CSVStream = function(headers) {
  var self = this;
  this.sendable = true;
  this.receivable = true;
  this.headers = headers;
  this.wroteHeaders = false;
  this._stream = new Stream();
  this._buffer = [];
  this._stream.on('data', function(data) { self._handleData(data); });
  this._stream.on('end', function(data) { self._handleEnd(data); });
};

util.inherits(CSVStream, RecordStream);

/**
 *
 * @override
 * @method RecordStream.CSVStream#send
 * @param {Record} record - Record object
 */
CSVStream.prototype.send = function(record) {
  if (!this.wroteHeaders) {
    if (!this.headers) {
      this.headers = CSV.extractHeaders([ record ]);
    }
    this._stream.emit("data", CSV.arrayToCSV(this.headers) + "\n");
    this.wroteHeaders = true;
  }
  this._stream.emit("data", CSV.recordToCSV(record, this.headers) + "\n");
};

/**
 *
 * @override
 * @method RecordStream.CSVStream#end
 * @param {Record} record - Record object
 */
CSVStream.prototype.end = function(record) {
  if (record) { this.send(record); }
  this.readable = false;
  this.sendable = false;
  this._stream.emit("end");
};

/**
 * @private
 */
CSVStream.prototype._handleData = function(data, enc) {
  this._buffer.push([ data, enc ]);
};

/**
 * @private
 */
CSVStream.prototype._handleEnd = function(data, enc) {
  var self = this;
  if (data) {
    this._buffer.push([ data, enc ]);
  }
  data = this._buffer.map(function(d) {
    return d[0].toString(d[1] || 'utf-8');
  }).join('');
  var records = CSV.parseCSV(data);
  records.forEach(function(record) {
    self.emit('record', record);
  });
  this.emit('end');
};

/**
 * Get delegating Node.js stream
 * @override
 * @method RecordStream.CSVStream#stream
 */
CSVStream.prototype.stream = function(record) {
  return this._stream;
};

